"use client";

export default function TemplateOutlineAnim() {
  return (
    <div className="flex h-28 w-full items-center justify-center">
      <div className="relative h-24 w-20 rounded-sm border border-line bg-white shadow-sm">
        <svg
          className="pointer-events-none absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)]"
          viewBox="0 0 80 96"
          fill="none"
        >
          <rect
            x="1"
            y="1"
            width="78"
            height="94"
            rx="3"
            stroke="var(--violet)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            className="trace-outline"
          />
        </svg>
        <div className="absolute inset-x-2 top-2 h-2 rounded-sm bg-violet/25 section-highlight" />
        <div
          className="absolute inset-x-2 top-6 h-1.5 rounded-sm bg-text/10 section-highlight"
          style={{ animationDelay: "0.6s" }}
        />
        <div
          className="absolute inset-x-2 top-9 h-1.5 w-3/4 rounded-sm bg-text/10 section-highlight"
          style={{ animationDelay: "0.9s" }}
        />
        <div
          className="absolute inset-x-2 top-14 h-6 rounded-sm border border-dashed border-violet/30 section-highlight"
          style={{ animationDelay: "1.3s" }}
        />

        <style jsx>{`
          .trace-outline {
            stroke-dashoffset: 0;
            animation: trace 3.4s linear infinite;
          }
          @keyframes trace {
            to {
              stroke-dashoffset: -160;
            }
          }
          .section-highlight {
            opacity: 0.3;
            animation: pulse-highlight 3.4s ease-in-out infinite;
          }
          @keyframes pulse-highlight {
            0%,
            100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.9;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
