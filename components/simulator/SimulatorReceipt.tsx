"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import type { Scenario } from "@/lib/simulator.config";

export default function SimulatorReceipt({ scenario }: { scenario: Scenario }) {
  const { summary } = scenario;

  return (
    <div className="receipt-stamp w-full max-w-sm rounded-xl border border-line bg-white p-5 shadow-sm">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
        Sample run summary · {summary.outputFilename}
      </p>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between border-t border-dashed border-line pt-2">
          <span className="text-xs text-muted">Source pages reviewed</span>
          <span className="font-mono text-xs font-medium text-text">
            <NumberTicker value={summary.sourcePagesReviewed} />
          </span>
        </div>
        {summary.questionsProcessed !== null && (
          <div className="flex items-center justify-between border-t border-dashed border-line pt-2">
            <span className="text-xs text-muted">Questions processed</span>
            <span className="font-mono text-xs font-medium text-text">
              <NumberTicker value={summary.questionsProcessed} />
            </span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-dashed border-line pt-2">
          <span className="text-xs text-muted">Finished document</span>
          <span className="font-mono text-xs font-medium text-text">
            <NumberTicker value={summary.finishedPages} suffix=" pages" />
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-line pt-2">
          <span className="text-xs text-muted">Source references</span>
          <span className="font-mono text-xs font-medium text-text">
            <NumberTicker value={summary.sourceReferences} />
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-line pt-2">
          <span className="text-xs font-medium text-green">Estimated analyst time saved</span>
          <span className="font-mono text-sm font-semibold text-green">
            up to <NumberTicker value={summary.estimatedHoursSaved} suffix=" hrs" />
          </span>
        </div>
      </div>

      <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted">
        Illustrative estimate based on sample document size, question count, and review requirements.
      </p>

      <style jsx>{`
        .receipt-stamp {
          animation: stamp-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes stamp-in {
          from {
            opacity: 0;
            transform: translateY(12px) rotate(-1.5deg) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .receipt-stamp {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
