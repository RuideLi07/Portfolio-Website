"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

type ProjectVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "onEnded" | "onPlay" | "onSeeking"> & {
  loopDelayMs?: number;
};

export default function ProjectVideo({ loop, loopDelayMs = 0, src, ...props }: ProjectVideoProps) {
  const replayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const delayedLoop = loop === true && loopDelayMs > 0;

  function clearReplay() {
    if (replayTimer.current !== null) {
      clearTimeout(replayTimer.current);
      replayTimer.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (replayTimer.current !== null) {
        clearTimeout(replayTimer.current);
        replayTimer.current = null;
      }
    };
  }, [src, loop, loopDelayMs]);

  return (
    <video
      {...props}
      src={src}
      loop={loop && !delayedLoop}
      onPlay={clearReplay}
      onSeeking={clearReplay}
      onEnded={(event) => {
        clearReplay();
        if (!delayedLoop) return;

        const video = event.currentTarget;
        replayTimer.current = setTimeout(() => {
          replayTimer.current = null;
          if (!video.isConnected || !video.ended) return;
          video.currentTime = 0;
          // Browsers may decline playback when the page is in the background.
          void video.play().catch(() => {});
        }, loopDelayMs);
      }}
    >
      Your browser does not support video playback.
    </video>
  );
}
