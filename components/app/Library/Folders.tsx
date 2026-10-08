"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, Modal } from "antd";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const gradients = [
  "from-indigo-400 via-indigo-500 to-violet-500",
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-blue-400 via-indigo-500 to-purple-600",
  "from-violet-400 via-purple-500 to-fuchsia-500",
  "from-cyan-400 via-blue-500 to-indigo-600",
  "from-indigo-400 via-violet-500 to-purple-600",
  "from-purple-400 via-fuchsia-500 to-pink-500",
  "from-sky-400 via-indigo-500 to-violet-600",
  "from-blue-500 via-purple-500 to-pink-500",
  "from-indigo-600 via-blue-600 to-cyan-500",
];

const Folders = () => {
  const pathname = usePathname();
  const [folderForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const createFolder = (values: any) => {
    console.log(values);
  };
  const handleClose = () => {
    setOpen(false);
    folderForm.resetFields();
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Folder's Utility</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-8">
          <Input placeholder="Search these contents" />
          <Button onClick={() => setOpen(true)}>
            <Plus /> Add New
          </Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-8">
        {Array(9)
          .fill(0)
          .map((item: any, index: number) => {
            const gradientIndex = index % gradients.length;
            const grad = gradients[gradientIndex];
            return (
              <Link key={index} href={`${pathname}/html-tut`}>
                <Card className="shadow-none transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                  <CardHeader>
                    <i
                      className={`ri-folder-open-fill text-4xl text-transparent bg-clip-text  bg-linear-to-r ${grad}`}
                    ></i>
                    <CardAction className="text-xs text-gray-500 font-medium">
                      2 July 2071
                    </CardAction>
                  </CardHeader>
                  <CardHeader>
                    <CardTitle
                      className={`text-transparent bg-clip-text  bg-linear-to-r ${grad}`}
                    >
                      HTML tutorial
                    </CardTitle>
                    <CardDescription>22 Files</CardDescription>
                    <CardAction className="text-xs text-gray-500 font-medium">
                      472Mb
                    </CardAction>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
      </div>
      <Modal
        open={open}
        title="Create A New Folder"
        footer={null}
        onCancel={handleClose}
      >
        <Form form={folderForm} onFinish={createFolder}>
          <Form.Item name="folderName">
            <Input placeholder="Folder name ?" />
          </Form.Item>
          <Form.Item>
            <Button variant="secondary">
              <Plus /> Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Folders;
