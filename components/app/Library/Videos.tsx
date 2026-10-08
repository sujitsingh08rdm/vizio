import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "antd";
import Image from "next/image";

const Videos = () => {
  return (
    <div className="space-y-8">
      {Array(20)
        .fill(0)
        .map((item, index) => (
          <Card key={index} className="shadow-none">
            <CardHeader className="flex">
              <Image
                src={"/images/thumb.jpg"}
                width={100}
                height={100}
                alt={`image-${index}`}
                className="object-cover rounded-lg"
              />
              <CardHeader className="flex-1">
                <CardTitle>Ch-1 Intro To HTML VIDEo</CardTitle>
                <CardDescription className="space-x-4">
                  <label>Size : 200Mb</label>
                  <label>Duration : 30 mins</label>
                </CardDescription>
                <CardAction>
                  <Tag color="green">Draft</Tag>
                </CardAction>
              </CardHeader>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
};

export default Videos;
