"use client";

import type { Scenario } from "@/lib/simulator.config";
import { cn } from "@/lib/utils";

export type TemplateChoice = "blank" | "past-example";

type Props = {
  scenario: Scenario;
  selected: TemplateChoice | null;
  onSelect: (choice: TemplateChoice) => void;
};

export default function TemplateSelector({ scenario, selected, onSelect }: Props) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wide text-muted">What are you starting with?</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onSelect("blank")}
          aria-pressed={selected === "blank"}
          className={cn(
            "min-h-[44px] rounded-xl border p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg",
            selected === "blank" ? "border-purple bg-purple/5" : "border-line bg-white"
          )}
        >
          <p className="font-serif text-base font-medium text-text">A blank request</p>
          <p className="mt-1 text-xs leading-relaxed text-text/70">
            Start with the RFP, DDQ, or questionnaire you were sent.
          </p>
          <div className="mt-3 space-y-1.5 rounded-md border border-line bg-paper p-2.5">
            {scenario.startDocument.blankQuestions.slice(0, 3).map((q) => (
              <div key={q.number} className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-violet">{q.number}</span>
                <span className="h-1 flex-1 rounded-full bg-text/10" />
              </div>
            ))}
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelect("past-example")}
          aria-pressed={selected === "past-example"}
          className={cn(
            "min-h-[44px] rounded-xl border p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg",
            selected === "past-example" ? "border-purple bg-purple/5" : "border-line bg-white"
          )}
        >
          <p className="font-serif text-base font-medium text-text">A past finished example</p>
          <p className="mt-1 text-xs leading-relaxed text-text/70">
            Use work your firm already produced as the structure, format, and tone for the next document.
          </p>
          <div className="mt-3 space-y-1.5 rounded-md border border-line bg-paper p-2.5">
            {scenario.pastExampleDocument.sections.slice(0, 3).map((s) => (
              <div key={s} className="flex items-center justify-between">
                <span className="text-[9px] font-medium text-text/70">{s}</span>
                <span className="h-1 w-8 rounded-full bg-green/30" />
              </div>
            ))}
          </div>
        </button>
      </div>
    </div>
  );
}
