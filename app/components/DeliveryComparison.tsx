"use client";

import { useEffect, useState } from "react";

export default function DeliveryComparison({ images, paragraphs, isDark }: {
  images: Array<{ src: string; alt: string; caption: string }>;
  paragraphs?: string[];
  isDark: boolean;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || !images.every((_, index) => ready[index])) return;
    const timer = setTimeout(() => setActive((current) => (current + 1) % images.length), 5000);
    return () => clearTimeout(timer);
  }, [active, paused, ready, images]);

  return (
    <div className={`w-full my-6 ${paragraphs?.length ? "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center" : ""}`}>
      {paragraphs && (
        <div className={`space-y-6 text-sm md:text-base leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      )}
    <figure className="w-full max-w-[440px] mx-auto">
      <div className="relative aspect-[500/455] overflow-hidden rounded-xl">
        {images.map((image, index) => (
          // These matching source images must stay aligned during the crossfade.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={500}
            height={455}
            aria-hidden={active !== index}
            onLoad={() => setReady((previous) => ({ ...previous, [index]: true }))}
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 motion-reduce:transition-none"
            style={{ opacity: active === index ? 1 : 0 }}
          />
        ))}
      </div>
      <figcaption className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-4 text-xs">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`border-b-2 py-2 transition-opacity ${active === index ? "border-current font-semibold" : "border-transparent opacity-60 hover:opacity-100"}`}
          >
            {image.caption}
          </button>
        ))}
      </figcaption>
    </figure>
    </div>
  );
}
