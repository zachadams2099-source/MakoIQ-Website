"use client";

import { useState } from "react";
import { scenarios } from "@/lib/simulator.config";
import { cn } from "@/lib/utils";

const scenario = scenarios.rfp;
const rows = scenario.reviewItems.slice(0, 3);
const citations = scenario.sourcePreview;

const statusLabel: Record<string, string> = {
  supported: "Supported",
  "needs-review": "Needs review",
  "missing-information": "Missing information",
  "conflicting-information": "Conflicting information",
};

const statusStyle: Record<string, string> = {
  supported: "bg-green/10 text-green",
  "needs-review": "bg-amber-50 text-amber-700",
  "missing-information": "bg-rose-50 text-rose-700",
  "conflicting-information": "bg-orange-50 text-orange-700",
};

export default function SourceConnectedReview() {
  const [active, setActive] = useState(0);
  const citation = citations[active] ?? citations[0];

  return (
    <section className="bg-card py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-medium text-text sm:text-4xl">
            Every answer stays connected to its source.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text/80">
            Review the completed work, see what supports each response, and quickly identify
            anything that still needs human judgment.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-line md:grid-cols-2">
          <div className="border-b border-line bg-paper p-5 md:border-b-0 md:border-r">
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
              {scenario.startDocument.filename}
            </p>
            <ul className="mt-3 space-y-2">
              {rows.map((row, i) => (
                <li key={row.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={cn(
                      "min-h-[44px] w-full rounded-lg border p-3 text-left transition-colors",
                      active === i ? "border-purple bg-purple/5" : "border-line bg-white hover:border-violet/30"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-text">{row.label}</p>
                      <span className={cn("shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold", statusStyle[row.status])}>
                        {statusLabel[row.status]}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-violet">{citations[i]?.filename}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-paper p-5">
            <p className="font-mono text-[10px] uppercase tracking-wide text-violet">{citation.filename}</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">{citation.location}</p>
            <div className="mt-3 rounded-md border border-dashed border-line bg-white p-4">
              <p className="font-serif text-sm italic leading-relaxed text-text/80">{citation.excerpt}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
