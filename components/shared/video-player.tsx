'use client'
import React, { FC, useEffect, useRef } from 'react'
import videoJs from "video.js"
import "video.js/dist/video-js.css"
import '@videojs/themes/dist/forest/index.css'
import "videojs-hls-quality-selector"
import "videojs-hotkeys"

interface VideoPlayerInterface {
    src: string
}

const VideoPlayer: FC<VideoPlayerInterface> = ({src}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const options = {
        controls: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2],
        // muted: true
    }

    useEffect(()=>{
        if(!videoRef.current)
            return

        const player: any = videoJs(videoRef.current, options)
        player.hlsQualitySelector({
            displayCurrentQuality: true
        })

        player.hotkeys({
            volumeStep: 0.1,
            seekStep: 20
        })

        player.focus()
    }, [])

    return (
        <div className='w-full'>
            <video
                ref={videoRef}
                className='video-js vjs-default-skin vjs-theme-forest'
            >
                <source src={src} type="application/x-mpegURL" />
            </video>
        </div>
    )
}

export default VideoPlayer
