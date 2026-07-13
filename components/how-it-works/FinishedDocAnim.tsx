"use client";

export default function FinishedDocAnim() {
  return (
    <div className="flex h-28 w-full flex-col items-center justify-center gap-3">
      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-line">
        <div className="progress-fill h-full rounded-full bg-violet" />
      </div>

      <div className="relative flex h-10 items-center">
        <span className="ready-chip rounded-full bg-green/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-green">
          Ready
        </span>
        <svg
          className="download-arrow ml-2 h-4 w-4 text-green"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4v12" />
          <path d="M6 12l6 6 6-6" />
          <path d="M5 21h14" />
        </svg>
      </div>

      <style jsx>{`
        .progress-fill {
          width: 0%;
          animation: fill-progress 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes fill-progress {
          0% {
            width: 0%;
          }
          60% {
            width: 100%;
          }
          100% {
            width: 100%;
          }
        }
        .ready-chip {
          opacity: 0;
          transform: scale(0.85);
          animation: chip-pop 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes chip-pop {
          0%,
          58% {
            opacity: 0;
            transform: scale(0.85);
          }
          68% {
            opacity: 1;
            transform: scale(1.04);
          }
          78%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .download-arrow {
          opacity: 0;
          animation: arrow-drop 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes arrow-drop {
          0%,
          75% {
            opacity: 0;
            transform: translateY(-4px);
          }
          85%,
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
