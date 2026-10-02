"use client";

import { useState } from "react";
import type { ContentBlock } from "../../data/projects";
import AlternatingVideo from "./AlternatingVideo";

export default function VideoFeature({ block: vf, isDark }: { block: Extract<ContentBlock, { type: "video-feature" }>; isDark: boolean }) {
  const [activeDemo, setActiveDemo] = useState(0);

  const textCol = (
    <div className="flex flex-col gap-3 justify-center">
      <h3
        className={`text-sm md:text-base font-semibold ${
          isDark ? "text-white" : "text-neutral-900"
        }`}
      >
        {vf.title}
      </h3>
      <p
        className={`text-sm md:text-base leading-relaxed whitespace-pre-line ${
          isDark ? "text-neutral-300" : "text-neutral-700"
        }`}
      >
        {vf.demos?.[activeDemo]?.text ?? vf.text}
      </p>
    </div>
  );

  const videoCol = (
    <div className="flex justify-center">
      <div
        className={`w-full max-w-[320px] rounded-2xl overflow-hidden ${
          vf.demos && vf.demos.length > 1 ? "bg-transparent" : isDark ? "bg-neutral-800" : "bg-neutral-100"
        }`}
      >
        {vf.demos && vf.demos.length > 1 ? (
          <AlternatingVideo key={vf.demos.map((demo) => demo.src).join("|")} demos={vf.demos} onActiveChange={setActiveDemo} />
        ) : <video
          autoPlay
          loop
          muted
          playsInline
          poster={vf.poster}
          className="w-full h-auto block"
        >
          <source src={vf.video} type="video/mp4" />
        </video>}
      </div>
    </div>
  );

  return (
    <div
      className="w-full my-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
    >
      {vf.reverse ? (
        <>
          {textCol}
          {videoCol}
        </>
      ) : (
        <>
          {videoCol}
          {textCol}
        </>
      )}
    </div>
  );
}
