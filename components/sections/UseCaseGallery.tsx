"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type UseCase = {
  title: string;
  description: string;
  outputFilename: string;
  before: string[];
  after: string[];
};

const useCases: UseCase[] = [
  {
    title: "Institutional RFP Responses",
    description: "Turn a blank RFP into a finished, source-backed response in your firm's format.",
    outputFilename: "Institutional_RFP_Final.docx",
    before: ["1.1 Firm overview", "3.4 Investment process", "5.2 Fee schedule"],
    after: ["Firm overview drafted", "Investment process drafted", "Fee schedule table populated"],
  },
  {
    title: "Investment Due Diligence Questionnaires",
    description: "Complete investment DDQs from your fund documents, policies, and prior responses.",
    outputFilename: "Investment_DDQ_Final.docx",
    before: ["1.2 Ownership structure", "4.2 Valuation process", "6.4 Cybersecurity policy"],
    after: ["Ownership structure drafted", "Valuation process drafted", "Cybersecurity policy drafted"],
  },
  {
    title: "Operational Due Diligence Questionnaires",
    description: "Produce ODDQs covering operations, controls, and infrastructure from source policies.",
    outputFilename: "Operational_DDQ_Final.docx",
    before: ["2.1 Fund administration", "3.3 Trade reconciliation", "5.1 Business continuity"],
    after: ["Fund administration drafted", "Trade reconciliation drafted", "Business continuity drafted"],
  },
  {
    title: "Underwriting and Investment Committee Memos",
    description: "Assemble IC memos from CIMs, financial models, and prior deal materials.",
    outputFilename: "Investment_Committee_Memo_Final.docx",
    before: ["Executive summary", "Historical financials", "Key risks"],
    after: ["Executive summary drafted", "Financial summary table built", "Risks and mitigants drafted"],
  },
  {
    title: "M&A Review and Deal Summaries",
    description: "Build deal summaries and review memoranda from purchase agreements and diligence files.",
    outputFilename: "Deal_Summary_Final.docx",
    before: ["Transaction overview", "Structure and terms", "Key considerations"],
    after: ["Transaction overview drafted", "Structure and terms drafted", "Key considerations drafted"],
  },
  {
    title: "Manager Research and Fund Reports",
    description: "Produce manager research and fund review reports from PPMs, LPAs, and track records.",
    outputFilename: "Manager_Research_Report_Final.docx",
    before: ["Strategy overview", "Track record analysis", "Organizational review"],
    after: ["Strategy overview drafted", "Track record analysis drafted", "Organizational review drafted"],
  },
];

export default function UseCaseGallery() {
  const [active, setActive] = useState(0);
  const current = useCases[active];

  return (
    <section id="examples" className="bg-card py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-medium text-text sm:text-4xl">
            Built for the work investment teams already do.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text/80">
            Start with the request, template, or report. Add the materials your team would
            normally review. MakoIQ produces the completed document for you to review and
            approve.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {useCases.map((useCase, i) => (
              <button
                key={useCase.title}
                type="button"
                data-usecase-card
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  "min-h-[44px] rounded-xl border p-5 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg",
                  active === i ? "border-purple bg-purple/5" : "border-line bg-paper"
                )}
              >
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-violet/10 text-violet"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <rect x="2" y="1.5" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M4.5 5h7M4.5 7.5h7M4.5 10h4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
                <p className="mt-3 font-serif text-base font-medium text-text">{useCase.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-text/70">{useCase.description}</p>
                <p className="mt-2 font-mono text-[10px] text-violet">{useCase.outputFilename}</p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-line bg-paper p-6" aria-live="polite">
            <p className="font-mono text-xs uppercase tracking-wide text-muted">{current.outputFilename}</p>
            <p className="mt-1 font-serif text-lg font-medium text-text">{current.title}</p>

            <div className="mt-5">
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted">Before</p>
              <ul className="mt-2 space-y-1.5">
                {current.before.map((line) => (
                  <li key={line} className="rounded-md border border-line bg-white px-3 py-2 text-xs text-text/60">
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted">After</p>
              <ul className="mt-2 space-y-1.5">
                {current.after.map((line) => (
                  <li
                    key={line}
                    className="flex items-center gap-2 rounded-md border border-green/20 bg-green/5 px-3 py-2 text-xs text-text"
                  >
                    <span className="text-green" aria-hidden>
                      ✓
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
