import VideoPlayer from '@/components/shared/video-player'
import React from 'react'

const HomeRouter = () => {
  return (
    <div className='w-8/12'>
      <VideoPlayer 
        src="https://zivio-server.s3.ap-southeast-1.amazonaws.com/streams/dot-net.m3u8"
      />
    </div>
  )
}

export default HomeRouter
