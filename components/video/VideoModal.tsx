"use client";

import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/useFocusTrap";
import DocumentSimulator from "@/components/simulator/DocumentSimulator";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const VIDEO_SRC = "/makoiq-overview.mp4";

export default function VideoModal({ isOpen, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [videoAvailable, setVideoAvailable] = useState<boolean | null>(null);
  useFocusTrap(panelRef, isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    fetch(VIDEO_SRC, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setVideoAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setVideoAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="MakoIQ example video"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-ink shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {videoAvailable ? (
          <video
            controls
            autoPlay
            poster="/makoiq-overview-poster.jpg"
            className="aspect-video w-full bg-black"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            <track kind="captions" src="/makoiq-overview.vtt" srcLang="en" label="English" default />
          </video>
        ) : (
          <div className="p-4 sm:p-6">
            <p className="eyebrow mb-3 text-violet">Interactive preview</p>
            <DocumentSimulator autoStart embedLabel="Interactive preview" />
          </div>
        )}
      </div>
    </div>
  );
}
