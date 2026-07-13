"use client";

import { useState } from "react";
import { reviewFilters, type Scenario, type ReviewStatus, type SourcePreviewEntry } from "@/lib/simulator.config";
import { cn } from "@/lib/utils";

type Props = {
  scenario: Scenario;
  onSelectSource: (entry: SourcePreviewEntry) => void;
};

const statusStyle: Record<ReviewStatus, string> = {
  supported: "bg-green/10 text-green",
  "needs-review": "bg-amber-50 text-amber-700",
  "missing-information": "bg-rose-50 text-rose-700",
  "conflicting-information": "bg-orange-50 text-orange-700",
};

const statusIcon: Record<ReviewStatus, string> = {
  supported: "✓",
  "needs-review": "!",
  "missing-information": "?",
  "conflicting-information": "≠",
};

export default function DocumentAssembly({ scenario, onSelectSource }: Props) {
  const [filter, setFilter] = useState<ReviewStatus | "all">("all");

  const primarySource = scenario.sourcePreview[0];
  const items = filter === "all" ? scenario.reviewItems : scenario.reviewItems.filter((i) => i.status === filter);

  return (
    <div className="doc-settle">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-muted">{scenario.summary.outputFilename}</p>
          <p className="mt-0.5 font-serif text-lg font-medium text-text">Finished document</p>
        </div>
        <span className="rounded-full bg-green/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-green">
          Ready
        </span>
      </div>

      <div className="mt-4 rounded-lg border border-line bg-white p-4">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-violet">{scenario.sampleQuestion.number}</span>
          <p className="font-serif text-sm font-medium text-text">{scenario.sampleQuestion.text}</p>
        </div>
        <div className="mt-2 space-y-1 text-xs leading-relaxed text-text/80">
          {scenario.sampleQuestion.answerLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onSelectSource(primarySource)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-violet/30 bg-violet/5 px-3 py-1.5 font-mono text-[10px] text-violet transition-colors hover:bg-violet/10"
        >
          <span aria-hidden>◆</span> {scenario.sampleQuestion.sourceChip}
        </button>
      </div>

      {scenario.table && (
        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
            {scenario.table.caption}
            {scenario.illustrativeNote && <span className="ml-2 text-text/50">· {scenario.illustrativeNote}</span>}
          </p>
          <div className="mt-1.5 overflow-x-auto rounded-md border border-line">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-paper">
                  {scenario.table.headers.map((h) => (
                    <th key={h} className="px-2.5 py-1.5 font-mono font-medium uppercase text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scenario.table.rows.map((row, ri) => (
                  <tr key={ri} className="table-row-in border-t border-line" style={{ animationDelay: `${ri * 110}ms` }}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-2.5 py-1.5 font-mono text-text">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-5">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted">Review status</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "min-h-[32px] rounded-full border px-3 py-1 font-mono text-[10px] transition-colors",
              filter === "all" ? "border-purple bg-purple/10 text-purple" : "border-line text-muted hover:border-violet/40"
            )}
          >
            All
          </button>
          {reviewFilters.map((f) => (
            <button
              key={f.status}
              type="button"
              onClick={() => setFilter(f.status)}
              className={cn(
                "min-h-[32px] rounded-full border px-3 py-1 font-mono text-[10px] transition-colors",
                filter === f.status ? "border-purple bg-purple/10 text-purple" : "border-line text-muted hover:border-violet/40"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-2.5 rounded-md border border-line bg-white p-2.5">
              <span
                aria-hidden
                className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold", statusStyle[item.status])}
              >
                {statusIcon[item.status]}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-text">{item.label}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                  <span className="sr-only">Status: {item.status.replace("-", " ")}. </span>
                  {item.note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .doc-settle {
          animation: settle 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes settle {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .table-row-in {
          opacity: 0;
          animation: row-in 0.35s ease-out forwards;
        }
        @keyframes row-in {
          to {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .doc-settle,
          .table-row-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
