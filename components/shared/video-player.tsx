// "use client" tells Next.js this file runs in the browser, not on the server.
// Video.js needs browser-only things (window, document, <video>), so it can't
// be rendered on the server.
"use client";

import React, { FC, useEffect, useRef } from "react";

// The main Video.js library. We call it `videojs` to match its docs.
import videojs from "video.js";

// TypeScript-only import: describes the shape of a Video.js player object.
// Used only for typing the ref below, it adds nothing to the final bundle.
import type Player from "video.js/dist/types/player";

// Base Video.js CSS: control bar, big play button, progress bar, menus.
import "video.js/dist/video-js.css";

// The "forest" visual theme (green accent colors, rounded play button).
import "@videojs/themes/dist/forest/index.css";

// Plugin: adds a quality menu (Auto / 1080p / 720p...) to the control bar.
// It reads the list of quality levels that Video.js already exposes
// (Video.js 8 bundles the "qualityLevels" plugin, so no extra import is needed).
import "videojs-hls-quality-selector";

// Plugin: keyboard shortcuts (space = play/pause, arrows = seek, etc.).
import "videojs-hotkeys";

// Props this component accepts: just the URL of the .m3u8 playlist.
interface VideoPlayerInterface {
  src: string;
}

const VideoJSPlayer: FC<VideoPlayerInterface> = ({ src }) => {
  // A ref to a plain <div>. React gives us this real DOM node after rendering,
  // and we'll use it as the container into which we insert the <video> tag.
  const videoRef = useRef<HTMLDivElement | null>(null);

  // A ref to hold the Video.js player instance.
  // Unlike state, changing a ref does NOT re-render the component, and its
  // value survives re-renders. Perfect for storing an external object.
  const playerRef = useRef<Player | null>(null);

  // EFFECT 1: create the player (once), or update its source (when src changes).
  useEffect(() => {
    // If the container div isn't mounted yet, do nothing.
    if (!videoRef.current) return;

    // No player exists yet, so this is the first run: create one.
    if (!playerRef.current) {
      // Create the <video> element manually instead of writing it in JSX.
      // Video.js modifies and wraps this element in its own DOM. If React
      // also owned it, the two would fight (especially in Strict Mode,
      // which runs effects twice in development).
      const videoElement = document.createElement("video");

      // Classes Video.js needs for styling:
      //  - video-js: base styles
      //  - vjs-default-skin: default look
      //  - vjs-theme-forest: the forest theme imported above
      videoElement.classList.add(
        "video-js",
        "vjs-default-skin",
        "vjs-theme-forest",
      );

      // Insert the video tag into our React-managed container div.
      videoRef.current.appendChild(videoElement);

      // Create the Video.js player on that element and save it in the ref.
      // `any` is used because plugin methods (hotkeys, hlsQualitySelector)
      // aren't in Video.js's TypeScript types.
      const player: any = (playerRef.current = videojs(videoElement, {
        controls: true, // show the control bar (play, volume, progress, etc.)
        fluid: true, // scale to the container width, keeping aspect ratio
        playbackRates: [0.5, 1, 1.5, 2], // speed options in the settings menu

        // Settings for the HTML5 playback engine.
        html5: {
          vhs: {
            // VHS = Video.js HTTP Streaming, the built-in HLS engine.
            // true means: always use VHS, even in browsers (like Safari) that
            // can play HLS natively. Native playback hides the quality levels,
            // so the quality menu would show only "Auto".
            overrideNative: true,
          },
          // When overriding native playback, tell the browser not to handle
          // audio/video tracks itself, so VHS stays in control.
          nativeAudioTracks: false,
          nativeVideoTracks: false,
        },

        // The video to play.
        sources: [
          {
            src, // the .m3u8 URL from props
            // MIME type for HLS. Without it, Video.js may not recognize the
            // URL as HLS and won't route it through VHS.
            type: "application/x-mpegURL",
          },
        ],
      }));

      // Enable keyboard shortcuts.
      player.hotkeys({
        volumeStep: 0.1, // up/down arrows change volume by 10%
        seekStep: 20, // left/right arrows jump 20 seconds
      });

      // ready() runs once the player is fully initialized.
      // Plugins that touch the control bar are safest to start here.
      player.ready(() => {
        player.hlsQualitySelector({
          displayCurrentQuality: true, // show the current quality (e.g. "720p") on the button
        });
      });

      // Debug helper: once the playlist is loaded ("loadedmetadata"), print
      // the heights of all detected renditions, e.g. [720, 1080].
      // If this prints [] or "none", the problem is the playlist, not your code.
      // You can delete this block once everything works.
      player.on("loadedmetadata", () => {
        const levels = player.qualityLevels?.();
        console.log(
          "Quality levels:",
          levels
            ? Array.from({ length: levels.length }, (_, i) => levels[i].height)
            : "none",
        );
      });
    } else {
      // A player already exists, so only the src prop changed.
      // Swap the source instead of destroying and rebuilding the player.
      playerRef.current.src({
        src,
        type: "application/x-mpegURL",
      });
    }
  }, [src]); // re-run only when `src` changes

  // EFFECT 2: cleanup when the component is removed from the page.
  useEffect(() => {
    // A function returned from useEffect runs on unmount.
    return () => {
      // Check the player exists and wasn't already disposed.
      if (playerRef.current && !playerRef.current.isDisposed()) {
        // dispose() stops playback, removes event listeners and DOM nodes,
        // and frees memory. Without it, navigating between pages leaks players.
        playerRef.current.dispose();
        playerRef.current = null; // reset so a new mount can create a fresh one
      }
    };
  }, []); // empty array = run setup once on mount, cleanup once on unmount

  return (
    // Tailwind class: make the wrapper fill the available width.
    <div className="w-full">
      {/* data-vjs-player is a marker attribute Video.js recognizes for
          player containers. The <video> element is appended here by Effect 1. */}
      <div data-vjs-player ref={videoRef} />
    </div>
  );
};

// Default export so other files can do: import VideoPlayer from "./video-player"
export default VideoJSPlayer;
