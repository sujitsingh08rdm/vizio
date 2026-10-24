"use client";

import {
  Divider,
  Form,
  Input,
  Modal,
  Table,
  Tag,
  Button as AntButton,
  Skeleton,
  Empty,
  Pagination,
  Progress,
  message,
} from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import "@ant-design/v5-patch-for-react-19";
import { catchError } from "@/lib/catch-error";
import httpRequest from "@/lib/http";
import axios from "axios";
import { durationCalculator, sizeCalculator } from "@/lib/calc";
import { webSocket } from "../app-layout";

const Library = () => {
  const [videoForm] = Form.useForm();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
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

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    return <Empty />;
  }

  const columns = [
    {
      title: "Title",
      key: "title",
      render: (item: any) => {
        return <label className="capitalize">{item.title}</label>;
      },
    },
    {
      title: "Duration",
      key: "duration",
      render: (item: any) => durationCalculator(item.duration),
    },
    {
      title: "Size",
      key: "size",
      render: (item: any) => sizeCalculator(item.size),
    },
    {
      title: "Status",
      key: "status",
      render: (item: any) => <Tag className="capitalize">{item.status}</Tag>,
    },
    {
      title: "Date",
      key: "date",
      render: (item: any) =>
        moment(item.createdAt).format("DD MMM YYYY, hh:mm a"),
    },
  ];

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>
        <Upload className="w-4 h-4" />
        Upload Now
      </Button>

      <Table
        columns={columns}
        dataSource={data.data}
        rowKey="_id"
        pagination={false}
      />
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
    </div>
  );
};

export default Library;
