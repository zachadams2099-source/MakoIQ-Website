"use client";

import { useRef } from "react";
import { sourceDocs } from "./hero-data";
import DocCard from "./DocCard";
import TemplateDoc from "./TemplateDoc";
import ReceiptCard from "./ReceiptCard";
import { useHeroTimeline } from "./useHeroTimeline";

export default function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const docRefs = useRef<(HTMLDivElement | null)[]>([]);
  const templateRef = useRef<HTMLDivElement>(null);
  const echoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const receiptRef = useRef<HTMLDivElement>(null);

  useHeroTimeline({
    stage: stageRef,
    docs: docRefs,
    template: templateRef,
    pageEcho: echoRefs,
    receipt: receiptRef,
  });

  return (
    <div
      ref={stageRef}
      className="relative mx-auto aspect-square w-full max-w-[520px] md:aspect-[4/3.4]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--violet) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative h-full w-full">
        {sourceDocs.map((doc, i) => (
          <DocCard
            key={doc.id}
            ref={(el) => {
              docRefs.current[i] = el;
            }}
            name={doc.name}
            style={{
              left: `${doc.x}%`,
              top: `${doc.y}%`,
              transform: `rotate(${doc.rotate}deg)`,
            }}
          />
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[0, 1].map((i) => (
            <div
              key={i}
              ref={(el) => {
                echoRefs.current[i] = el;
              }}
              aria-hidden
              className="absolute inset-0 rounded-lg bg-white opacity-0"
              style={{ zIndex: -1 }}
            />
          ))}
          <TemplateDoc ref={templateRef} />
          <ReceiptCard
            ref={receiptRef}
            className="absolute -bottom-8 -right-10 rotate-3 sm:-bottom-10 sm:-right-14"
          />
        </div>
      </div>
    </div>
  );
}
