"use client";

import { scenarios } from "@/lib/simulator.config";
import { useSimulatorRun } from "@/components/simulator/SimulatorRunContext";
import SimulatorReceipt from "@/components/simulator/SimulatorReceipt";

export default function ValueReceiptSection() {
  const { lastCompletedScenario } = useSimulatorRun();
  const scenario = scenarios[lastCompletedScenario ?? "rfp"];

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-20">
          <div data-receipt-copy>
            <h2 className="font-serif text-3xl font-medium leading-tight text-text sm:text-4xl">
              Every run shows you what it was worth.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text/80">
              When your document is ready, MakoIQ shows the time it saved and the sources behind
              it. Not a vanity metric. The same math your team would do by hand.
            </p>
          </div>

          <div data-receipt-card className="mx-auto w-full max-w-sm">
            <SimulatorReceipt scenario={scenario} />
          </div>
        </div>
      </div>
    </section>
  );
}
