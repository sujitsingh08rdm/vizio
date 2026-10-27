"use client";

import {
  Divider,
  Form,
  Input,
  Modal,
  Button as AntButton,
  Skeleton,
  Empty,
  Pagination,
  Progress,
  message,
  Tooltip,
} from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";
import { Clock, ImageDown, Play, PlayCircle, Upload } from "lucide-react";
import "@ant-design/v5-patch-for-react-19";
import { catchError } from "@/lib/catch-error";
import httpRequest from "@/lib/http";
import axios from "axios";
import { durationCalculator, sizeCalculator } from "@/lib/calc";
import { webSocket } from "../app-layout";
import VideoPlayer from "@/components/shared/react-player";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sample = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

const Library = () => {
  const [video, setVideo] = useState({
    src: undefined,
    title: null,
    videoId: null,
  });
  const [videoForm] = Form.useForm();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [videoModal, setVideoModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const onVideoTranscoding = () => {
    mutate(`/video?page=${page}&limit=${limit}`);
  };

  useEffect(() => {
    webSocket.on("video-transcoding", onVideoTranscoding);

    return () => {
      webSocket.off("video-transcoding", onVideoTranscoding);
    };
  }, []);

  const { data, error, isLoading } = useSWR(
    `/video?page=${page}&limit=${limit}`,
    fetcher,
  );

  const handleClose = () => {
    if (progress > 0) {
      return message.info("Please Wait File Is Uploading..");
    }
    setOpen(false);
    videoForm.resetFields();

    setFile(null);
  };

  const getVideoDuration = (video: File) => {
    return new Promise((resolve, reject) => {
      const videoTag = document.createElement("video");
      const url = URL.createObjectURL(video);
      videoTag.src = url;
      videoTag.preload = "metadata";
      videoTag.load();

      videoTag.onloadedmetadata = () => {
        const duration = videoTag.duration;
        resolve(duration);
      };
    });
  };

  const uploadVideo = async (value: any) => {
    try {
      if (!file) {
        return;
      }
      const options = {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (e: any) => {
          const p = Math.floor((e.loaded * 100) / e.total);
          setProgress(p);
        },
      };
      const duration = await getVideoDuration(file);
      value.duration = duration;
      value.size = file.size;
      delete value.file;
      const { data } = await httpRequest.post("/video", value);
      const uploadUrl = data.uploadUrl;
      await axios.put(uploadUrl, file, options);

      message.success("Video Uploaded Successfully");

      setProgress(0);
      handleClose();
      mutate(`/video?page=${page}&limit=${limit}`);
    } catch (error) {
      catchError(error);
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (input.files) {
      setFile(input.files[0]);
    }
  };

  const onPaginate = (p: number, l: number) => {
    setPage(p);
    setLimit(l);
  };

  const playVideo = async (item: any) => {
    try {
      const { data } = await httpRequest.post("/video/stream", {
        path: item.path,
      });
      setVideo({ title: item.title, videoId: item._id, src: data.url });
      setVideoModal(true);
    } catch (error) {
      catchError(error);
    }
  };

  const closeVideoModal = () => {
    setVideoModal(false);
    setVideo({ src: undefined, videoId: null, title: null });
  };

  const changeThumbnail = (id: string) => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.click();

      input.onchange = () => {
        if (!input.files) {
          throw new Error("No File Uploaded");
        }
        const file = input.files[0];
        input.remove();
        const url = URL.createObjectURL(file);
        const img = new window.Image();
        img.src = url;
        img.onload = async () => {
          if (img.width !== 1280 || img.height !== 720) {
            return message.error("Image Resolution must be 1280/720");
          }
          const { data } = await httpRequest.post("video/thumbnail", {
            videoId: id,
          });

          const options = {
            headers: { "Content-Type": file.type },
            onUploadProgress: (e: any) => {
              const p = Math.floor((e.loaded * 100) / e.total);
              console.log("Image Uploaded - ", p);
            },
          };
          await axios.put(data.uploadUrl, file, options);
          message.success("Thumbnail changed!");
          mutate(`/video?page=${page}&limit=${limit}`);
        };
      };
    } catch (error) {
      catchError(error);
    }
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    return <Empty />;
  }

  // const columns = [
  //   {
  //     title: "Title",
  //     key: "title",
  //     render: (item: any) => {
  //       return <label className="capitalize">{item.title}</label>;
  //     },
  //   },
  //   {
  //     title: "Duration",
  //     key: "duration",
  //     render: (item: any) => durationCalculator(item.duration),
  //   },
  //   {
  //     title: "Size",
  //     key: "size",
  //     render: (item: any) => sizeCalculator(item.size),
  //   },
  //   {
  //     title: "Status",
  //     key: "status",
  //     render: (item: any) => <Tag className="capitalize">{item.status}</Tag>,
  //   },
  //   {
  //     title: "Date",
  //     key: "date",
  //     render: (item: any) =>
  //       moment(item.createdAt).format("DD MMM YYYY, hh:mm a"),
  //   },
  //   {
  //     key: "actions",
  //     render: (item: any) => (
  //       <div>
  //         <Button onClick={() => playVideo(item.path)}>
  //           <Play />
  //         </Button>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>
        <Upload className="w-4 h-4" />
        Upload Now
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {data.data.map((item: any, index: number) => {
          const image = item?.thumbnail?.medium || item?.thumbnail?.high;
          return (
            <Card key={index} className="pt-0">
              <div className="relative">
                <Image
                  src={
                    image
                      ? `${process.env.NEXT_PUBLIC_CDN}/${image.path}`
                      : "/images/sample.jpg"
                  }
                  width={image ? image.width : 640}
                  height={image ? image.height : 360}
                  alt={`thumbnail-${index}`}
                  className="object-fit rounded-t-xl"
                  priority
                />
                {item.status === "published" && (
                  <button
                    onClick={() => playVideo(item)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white p-4 rounded-full transition-all duration-300 ease-in-out hover:bg-black/80 hover:scale-110 active:scale-95 shadow-lg"
                  >
                    <PlayCircle className="w-12 h-12" />
                  </button>
                )}
              </div>
              <CardHeader>
                <CardTitle className="capitalize">{item.title}</CardTitle>
                <CardDescription>
                  <div className="flex justify-between text-xs mt-1">
                    <span>{sizeCalculator(item.size)}</span>
                    <span>
                      {moment(item.createdAt).format("MMM DD YYYY, hh:mm")}
                    </span>
                  </div>
                </CardDescription>
                <CardAction>
                  <Tooltip title="Change Thumbnail">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => changeThumbnail(item._id)}
                    >
                      <ImageDown className="text-gray-400" />
                    </Button>
                  </Tooltip>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <div className="flex flex-row gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">
                    {durationCalculator(item.duration)}
                  </span>
                </div>
                <div>
                  {item.status === "draft" && (
                    <Badge variant="secondary" className="capitalize">
                      {item.status}
                    </Badge>
                  )}
                  {item.status === "converting" && (
                    <Badge
                      variant="outline"
                      className="capitalize bg-amber-300"
                    >
                      {item.status}
                    </Badge>
                  )}
                  {item.status === "published" && (
                    <Badge className="capitalize">{item.status}</Badge>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* <VideoPlayer src={src} /> */}

      {/* <Table
        columns={columns}
        dataSource={data.data}
        rowKey="_id"
        pagination={false}
      /> */}
      <div className="flex justify-end">
        <Pagination
          total={data.total}
          onChange={onPaginate}
          pageSize={limit}
          current={page}
        />
      </div>
      <Modal
        open={open}
        footer={null}
        width={720}
        onCancel={handleClose}
        maskClosable={false}
      >
        <h1 className="text-lg font-medium">Video Information</h1>
        <Divider />
        <Form layout="vertical" form={videoForm} onFinish={uploadVideo}>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="Video Title" size="large" />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea placeholder="Description" size="large" rows={4} />
          </Form.Item>
          <Form.Item
            name="file"
            rules={[{ required: true }]}
            label="Choose a .mp4 file"
          >
            <Input
              type="file"
              size="large"
              accept=".mp4"
              onChange={handleFile}
            />
          </Form.Item>

          <Form.Item>
            <AntButton size="large" htmlType="submit" type="primary">
              Upload
            </AntButton>
          </Form.Item>
        </Form>
        <Progress percent={progress} />
      </Modal>
      <Modal
        onCancel={closeVideoModal}
        open={videoModal}
        footer={null}
        title={<label className="capitalize">{video.title}</label>}
        width={720}
        destroyOnHidden
      >
        {videoModal && video.src && <VideoPlayer src={video.src} autoPlay />}
      </Modal>
    </div>
  );
};

export default Library;
