"use client";

import { useState } from "react";
import DocumentSimulator from "@/components/simulator/DocumentSimulator";
import VideoModal from "@/components/video/VideoModal";

export default function TrySample() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="simulator" className="bg-ink py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-violet">Try it yourself</p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-white sm:text-4xl">
            Run an investment example without creating an account.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Turn RFPs, due diligence questionnaires, underwriting materials, and deal documents
            into the finished work your team already produces. Your first document with your own
            materials is free.
          </p>
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-violet underline decoration-violet/30 underline-offset-4 hover:decoration-violet"
          >
            Watch a 60-second example
          </button>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <DocumentSimulator />
        </div>
      </div>

      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
