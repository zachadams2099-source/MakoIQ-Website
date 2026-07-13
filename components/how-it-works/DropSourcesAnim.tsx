"use client";

import { useEffect, useState } from "react";

export default function DropSourcesAnim() {
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setPages(980);
      return;
    }
    let raf: number;
    let start: number | null = null;
    const duration = 2200;
    const loop = (t: number) => {
      if (start === null) start = t;
      const elapsed = (t - start) % (duration + 900);
      const progress = Math.min(elapsed / duration, 1);
      setPages(Math.round(progress * 980));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative flex h-28 w-full items-end justify-center overflow-hidden">
      <div className="relative h-full w-20">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="anim-file absolute left-1/2 h-7 w-14 -translate-x-1/2 rounded-sm border border-violet/40 bg-white shadow-sm"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
        <div className="absolute bottom-0 left-1/2 h-2 w-20 -translate-x-1/2 rounded-sm bg-violet/20" />
      </div>
      <span className="absolute bottom-1 right-0 font-mono text-xs font-medium text-violet tabular-nums">
        {pages.toLocaleString()} pages
      </span>

      <style jsx>{`
        .anim-file {
          top: -30px;
          opacity: 0;
          animation: file-drop 3.1s ease-in infinite;
        }
        @keyframes file-drop {
          0% {
            top: -30px;
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          55% {
            top: 62px;
            opacity: 1;
          }
          65% {
            top: 62px;
            opacity: 0;
          }
          100% {
            top: 62px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
