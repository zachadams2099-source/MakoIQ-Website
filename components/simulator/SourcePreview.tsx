"use client";

import type { SourcePreviewEntry } from "@/lib/simulator.config";

type Props = {
  entry: SourcePreviewEntry | null;
  onClose: () => void;
};

export default function SourcePreview({ entry, onClose }: Props) {
  if (!entry) return null;

  return (
    <div
      role="dialog"
      aria-label={`Source preview: ${entry.filename}`}
      className="absolute inset-x-0 top-0 z-20 mx-3 mt-3 flex max-h-[calc(100%-1.5rem)] flex-col overflow-y-auto rounded-xl border border-line bg-white p-5 shadow-2xl sm:inset-x-4 sm:top-4"
    >
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs uppercase tracking-wide text-violet">{entry.filename}</p>
          <p className="mt-0.5 font-mono text-[10px] text-muted">{entry.location}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close source preview"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-text"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="mt-4 rounded-md border border-dashed border-line bg-paper p-4">
        <p className="font-serif text-sm italic leading-relaxed text-text/80">{entry.excerpt}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="min-h-[40px] flex-1 rounded-full border border-line px-4 text-sm font-semibold text-text transition-colors hover:border-violet/40"
        >
          Open source
        </button>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[40px] flex-1 rounded-full bg-purple px-4 text-sm font-semibold text-white transition-all hover:brightness-110"
        >
          Back to document
        </button>
      </div>
    </div>
  );
}
