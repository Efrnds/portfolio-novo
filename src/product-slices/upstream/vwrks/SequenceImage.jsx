"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import { preloadMany } from "./mediaCache";

/**
 * Stacked sequence for hover — full quality, frames stay mounted.
 */
export default function SequenceImage({
  frames = [],
  index = 0,
  alt = "",
  className = "",
  imageClassName = "w-full h-full object-cover",
  width = 1000,
  height = 1000,
  priority = false,
}) {
  const list = useMemo(
    () => frames.filter((f) => f && (typeof f === "string" ? f : f.src)),
    [frames]
  );

  const safeIndex = list.length ? index % list.length : 0;

  useEffect(() => {
    const srcs = list
      .map((frame) => (typeof frame === "string" ? frame : frame.src))
      .filter(Boolean);
    if (srcs.length) void preloadMany(srcs, { basePriority: priority ? 200 : 40 });
  }, [list, priority]);

  if (list.length === 0) {
    return <div className={className} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`.trim()}>
      {list.map((frame, i) => {
        const src = typeof frame === "string" ? frame : frame.src;
        const frameAlt =
          (typeof frame === "object" && frame.alt) || alt || `Frame ${i + 1}`;
        const isActive = i === safeIndex;

        return (
          <Image
            key={`${src}-${i}`}
            src={src}
            alt={frameAlt}
            width={width}
            height={height}
            quality={100}
            unoptimized
            priority={priority && i === 0}
            loading="eager"
            decoding="async"
            draggable={false}
            className={`${imageClassName} ${
              i === 0 ? "relative" : "absolute inset-0"
            } ${isActive ? "opacity-100" : "opacity-0"}`}
          />
        );
      })}
    </div>
  );
}
