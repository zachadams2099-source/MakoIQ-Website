"use client";

import { useRef, useState } from "react";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import DocumentSimulator, { type DocumentSimulatorHandle } from "@/components/simulator/DocumentSimulator";
import VideoModal from "@/components/video/VideoModal";

export default function InteractiveHero() {
  const { openModal } = useAuthModal();
  const simulatorRef = useRef<DocumentSimulatorHandle>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-ink pt-16 md:pt-20">
      <div className="container-page grid w-full grid-cols-1 items-start gap-10 py-14 md:grid-cols-[42%_58%] md:gap-8 md:py-20">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow text-violet">Built for investment teams</p>

          <h1 className="mt-6 font-serif text-[2.25rem] font-medium leading-[1.1] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            Your documents in.
            <br />
            Your deliverable out.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            Turn RFPs, due diligence questionnaires, underwriting materials, and deal documents
            into the finished work your team already produces.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => simulatorRef.current?.activate()}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-purple px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Try a sample run
            </button>
            <button
              type="button"
              onClick={() => openModal("signup")}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/50 hover:text-white"
            >
              Use my documents
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-mono text-xs text-white/40">
              Run an investment example without creating an account. Your first document with your
              own materials is free.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-violet underline decoration-violet/30 underline-offset-4 hover:decoration-violet"
          >
            Watch a 60-second example
          </button>
        </div>

        <div id="simulator" className="relative z-10">
          <DocumentSimulator ref={simulatorRef} />
        </div>
      </div>

      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
