"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroCopy from "./HeroCopy";
import HeroStaticGraphic from "./HeroStaticGraphic";

const CinematicScene = dynamic(() => import("./CinematicScene"), {
  ssr: false,
  loading: () => null,
});

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export default function Hero3D() {
  const [capabilities, setCapabilities] = useState<{
    ready: boolean;
    canAnimate: boolean;
    isMobile: boolean;
  }>({ ready: false, canAnimate: false, isMobile: false });
  const [revealed, setRevealed] = useState(false);
  const skippedRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const canAnimate = !prefersReduced && detectWebGL();
    setCapabilities({ ready: true, canAnimate, isMobile });
    if (!canAnimate) {
      skippedRef.current = true;
      setRevealed(true);
    }
  }, []);

  const reveal = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    setRevealed(true);
  }, []);

  // Any scroll, click, or keypress during the intro jumps straight to the final state.
  useEffect(() => {
    if (!capabilities.ready || !capabilities.canAnimate || revealed) return;
    const skip = () => reveal();
    const opts = { passive: true, once: true } as const;
    window.addEventListener("scroll", skip, opts);
    window.addEventListener("click", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("touchstart", skip, opts);
    return () => {
      window.removeEventListener("scroll", skip);
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [capabilities.ready, capabilities.canAnimate, revealed, reveal]);

  // The static CSS graphic is the default backdrop: it covers SSR, the
  // pre-hydration frame, reduced-motion, and no-WebGL. The animated canvas
  // only mounts on top of it once we know it's safe to run.
  const showAnimatedScene = capabilities.ready && capabilities.canAnimate;

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink pt-16 md:pt-20">
      {!showAnimatedScene && <HeroStaticGraphic />}

      {showAnimatedScene && (
        <div className="absolute inset-0">
          <CinematicScene isMobile={capabilities.isMobile} skip={revealed} onSettled={reveal} />
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-[6%] flex justify-center sm:bottom-[8%]">
        <HeroCopy revealed={revealed} />
      </div>
    </section>
  );
}
