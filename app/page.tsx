import VideoPlayer from "@/components/shared/video-player";
import React from "react";

const HomeRouter = () => {
  return (
    <div className="w-6/12">
      <VideoPlayer src="https://vizio-service.s3.ap-southeast-1.amazonaws.com/streams/tumko/tumko.m3u8" />
    </div>
  );
};

export default HomeRouter;
