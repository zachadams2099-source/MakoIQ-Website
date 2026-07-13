"use client";

import { useState } from "react";
import type { Scenario, SourceFile } from "@/lib/simulator.config";
import { cn } from "@/lib/utils";

type Props = {
  scenario: Scenario;
  loaded: boolean;
  loading: boolean;
  onLoad: () => void;
};

const typeColor: Record<SourceFile["type"], string> = {
  pdf: "bg-rose-50 text-rose-700",
  xlsx: "bg-green/10 text-green",
  docx: "bg-violet/10 text-violet",
  pptx: "bg-amber-50 text-amber-700",
  zip: "bg-line text-muted",
};

export default function SourceTray({ scenario, loaded, loading, onLoad }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const totalPages = scenario.sources.reduce((sum, s) => sum + s.pages, 0);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">Source files</p>
        {loaded && (
          <p className="font-mono text-xs font-medium text-violet" aria-live="polite">
            {totalPages.toLocaleString()} pages loaded
          </p>
        )}
      </div>

      {!loaded && (
        <button
          type="button"
          onClick={onLoad}
          disabled={loading}
          className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-full bg-purple px-5 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Loading sample files…" : "Load sample source files"}
        </button>
      )}

      {(loaded || loading) && (
        <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2" aria-live="polite">
          {scenario.sources.map((file, i) => (
            <li
              key={file.filename}
              className={cn(
                "source-chip rounded-md border border-line bg-white p-2.5 transition-shadow",
                loading && "source-chip-enter"
              )}
              style={loading ? { animationDelay: `${i * 90}ms` } : undefined}
            >
              <button
                type="button"
                onClick={() => loaded && setExpanded(expanded === file.filename ? null : file.filename)}
                className="flex w-full min-h-[36px] items-center gap-2 text-left"
              >
                <span className={cn("rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase", typeColor[file.type])}>
                  {file.type}
                </span>
                <span className="flex-1 truncate font-mono text-[11px] text-text">{file.filename}</span>
                <span className="font-mono text-[10px] text-muted">{file.pages}p</span>
              </button>
              {expanded === file.filename && (
                <p className="mt-1.5 border-t border-line pt-1.5 font-mono text-[10px] text-muted">
                  {file.type.toUpperCase()} · {file.pages} pages · loaded
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .source-chip-enter {
          opacity: 0;
          transform: translateY(6px);
          animation: chip-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes chip-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .source-chip-enter {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
