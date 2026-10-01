"use client";

import { useEffect, useRef, useState } from "react";

export default function AlternatingVideo({ demos, onActiveChange }: { demos: Array<{ src: string; label: string }>; onActiveChange?: (index: number) => void }) {
  const [active, setActive] = useState(0);
  const players = useRef<(HTMLVideoElement | null)[]>([]);
  const pending = useRef<number | null>(null);
  const requestId = useRef(0);

  useEffect(() => () => { requestId.current += 1; }, []);

  function switchTo(index: number) {
    const next = players.current[index];
    if (!next) return;
    const request = ++requestId.current;
    pending.current = index;
    // Keep the outgoing frame visible until the next player renders a frame.
    players.current.forEach((player, i) => {
      if (i !== active && i !== index) player?.pause();
    });
    next.currentTime = 0;

    const reveal = () => {
      if (request !== requestId.current) return;
      players.current.forEach((player, i) => { if (i !== index) player?.pause(); });
      pending.current = null;
      setActive(index);
      onActiveChange?.(index);
    };

    if (typeof next.requestVideoFrameCallback === "function") {
      next.requestVideoFrameCallback(reveal);
      void next.play().catch(() => {
        if (request === requestId.current) { pending.current = null; requestId.current += 1; }
      });
    } else {
      void next.play().then(reveal).catch(() => { if (request === requestId.current) pending.current = null; });
    }
  }

  if (!demos.length) return null;

  return (
    <figure>
      <div className="grid overflow-hidden">
        {demos.map((demo, index) => (
          <video
            key={`${index}-${demo.src}`}
            ref={(element) => { players.current[index] = element; }}
            src={demo.src}
            autoPlay={index === 0} muted playsInline preload="auto"
            aria-label={demo.label}
            aria-hidden={active !== index}
            className="w-full h-auto block"
            style={{ gridArea: "1 / 1", opacity: active === index ? 1 : 0, pointerEvents: active === index ? "auto" : "none", alignSelf: "start" }}
            onEnded={() => {
              if (active === index && pending.current === null) switchTo((index + 1) % demos.length);
            }}
          />
        ))}
      </div>
      <figcaption className="flex flex-wrap justify-center gap-3 px-3 py-3">
        {demos.map((item, index) => (
          <button
            key={`${index}-${item.src}`}
            type="button"
            aria-pressed={active === index}
            onClick={() => switchTo(index)}
            className={`text-xs py-1 border-b-2 focus-visible:outline-2 focus-visible:outline-offset-2 ${active === index ? "border-current font-semibold" : "border-transparent opacity-60"}`}
          >{item.label}</button>
        ))}
      </figcaption>
    </figure>
  );
}
