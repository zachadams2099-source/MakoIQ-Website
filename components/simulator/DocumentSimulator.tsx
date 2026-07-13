"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { scenarios, type ScenarioId, type SourcePreviewEntry } from "@/lib/simulator.config";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { useSimulatorRun } from "./SimulatorRunContext";
import ScenarioTabs from "./ScenarioTabs";
import TemplateSelector, { type TemplateChoice } from "./TemplateSelector";
import SourceTray from "./SourceTray";
import ProcessingStatus from "./ProcessingStatus";
import DocumentAssembly from "./DocumentAssembly";
import SourcePreview from "./SourcePreview";
import IntroPreview from "./IntroPreview";

type Step = "template" | "sources" | "processing" | "complete";

export type DocumentSimulatorHandle = {
  activate: () => void;
};

type Props = {
  autoStart?: boolean;
  embedLabel?: string;
};

const DocumentSimulator = forwardRef<DocumentSimulatorHandle, Props>(function DocumentSimulator(
  { autoStart = false, embedLabel },
  ref
) {
  const { openModal } = useAuthModal();
  const { reportCompletion } = useSimulatorRun();
  const containerRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cancelledRef = useRef(false);

  const [scenarioId, setScenarioId] = useState<ScenarioId>("rfp");
  const [step, setStep] = useState<Step>("template");
  const [template, setTemplate] = useState<TemplateChoice | null>(null);
  const [sourcesLoading, setSourcesLoading] = useState(false);
  const [sourcesLoaded, setSourcesLoaded] = useState(false);
  const [selectedSource, setSelectedSource] = useState<SourcePreviewEntry | null>(null);
  const [showIntro, setShowIntro] = useState(!autoStart);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [showWatchSample, setShowWatchSample] = useState(false);
  const [tick, setTick] = useState(0);

  const scenario = scenarios[scenarioId];

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const after = (ms: number, fn: () => void) => {
    const id = setTimeout(() => {
      if (!cancelledRef.current) fn();
    }, ms);
    timers.current.push(id);
  };

  useEffect(() => {
    if (!showIntro) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setShowIntro(false), prefersReduced ? 0 : 1600);
    return () => clearTimeout(id);
  }, [showIntro]);

  useEffect(() => {
    if (autoStart) {
      after(700, () => runAutoplay());
    }
    // Only clear pending timers here. Do not flip cancelledRef: React Strict
    // Mode's dev-only mount/cleanup/remount cycle would run this cleanup
    // immediately and permanently stop every future timer from firing.
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Idle detection: surface "Watch the sample" if the visitor hasn't acted.
  useEffect(() => {
    if (showIntro || autoPlaying || step !== "template" || template !== null) return;
    const id = setTimeout(() => setShowWatchSample(true), 4000);
    return () => clearTimeout(id);
  }, [showIntro, autoPlaying, step, template, tick]);

  const interact = () => {
    cancelledRef.current = false;
    setShowWatchSample(false);
    setTick((t) => t + 1);
  };

  const resetFlow = () => {
    setStep("template");
    setTemplate(null);
    setSourcesLoading(false);
    setSourcesLoaded(false);
    setSelectedSource(null);
  };

  // Lets other homepage sections (e.g. the final CTA) reset this simulator without prop drilling.
  useEffect(() => {
    const onReset = () => {
      cancelledRef.current = true;
      clearTimers();
      setAutoPlaying(false);
      resetFlow();
    };
    window.addEventListener("makoiq:reset-simulator", onReset);
    return () => window.removeEventListener("makoiq:reset-simulator", onReset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectScenario = (id: ScenarioId) => {
    interact();
    setScenarioId(id);
    resetFlow();
  };

  const handleSelectTemplate = (choice: TemplateChoice) => {
    interact();
    setTemplate(choice);
    setStep("sources");
  };

  const handleLoadSources = () => {
    interact();
    setSourcesLoading(true);
    after(900, () => {
      setSourcesLoading(false);
      setSourcesLoaded(true);
    });
  };

  const handleProduce = () => {
    interact();
    setStep("processing");
  };

  const handleProcessingComplete = () => {
    setStep("complete");
    setAutoPlaying(false);
    reportCompletion(scenarioId);
  };

  const handleTryAnother = () => {
    interact();
    resetFlow();
  };

  const handleUseMyDocuments = () => openModal("signup");

  const handleReviewDocument = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const runAutoplay = () => {
    cancelledRef.current = false;
    setAutoPlaying(true);
    setShowIntro(false);
    setShowWatchSample(false);
    resetFlow();

    after(500, () => {
      setTemplate("blank");
      setStep("sources");
    });
    after(1300, () => {
      setSourcesLoading(true);
    });
    after(2200, () => {
      setSourcesLoading(false);
      setSourcesLoaded(true);
    });
    after(3200, () => {
      setStep("processing");
    });
  };

  const stopAutoplay = () => {
    cancelledRef.current = true;
    clearTimers();
    setAutoPlaying(false);
    resetFlow();
  };

  useImperativeHandle(ref, () => ({
    activate: () => {
      setShowIntro(false);
      requestAnimationFrame(() => {
        const first = containerRef.current?.querySelector<HTMLElement>("[data-first-focus]");
        first?.focus();
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    },
  }));

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-card shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between bg-ink px-5 py-3.5">
        <p className="font-mono text-xs text-white/70">MakoIQ · Sample Run</p>
        <span className="rounded-full bg-violet/20 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-violet">
          {embedLabel ?? "Interactive demo"}
        </span>
      </div>

      <div ref={containerRef} className="relative min-h-[520px] p-5 sm:p-6">
        {showIntro ? (
          <IntroPreview />
        ) : (
          <div className="flex flex-col gap-5">
            <ScenarioTabs active={scenarioId} onSelect={handleSelectScenario} />

            {step === "template" && (
              <TemplateSelector scenario={scenario} selected={template} onSelect={handleSelectTemplate} />
            )}

            {step === "sources" && (
              <SourceTray scenario={scenario} loaded={sourcesLoaded} loading={sourcesLoading} onLoad={handleLoadSources} />
            )}

            {step === "sources" && sourcesLoaded && (
              <div>
                <button
                  type="button"
                  onClick={handleProduce}
                  className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-purple px-5 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  Produce the document
                </button>
                <p className="mt-2 text-center font-mono text-[10px] text-muted">
                  Sample completes in about 10 seconds
                </p>
              </div>
            )}

            {step === "processing" && <ProcessingStatus scenario={scenario} onComplete={handleProcessingComplete} />}

            {step === "complete" && (
              <div className="flex flex-col gap-5">
                <DocumentAssembly scenario={scenario} onSelectSource={setSelectedSource} />

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleUseMyDocuments}
                    className="min-h-[44px] flex-1 rounded-full bg-purple px-4 text-sm font-semibold text-white transition-all hover:brightness-110"
                  >
                    Use my documents
                  </button>
                  <button
                    type="button"
                    onClick={handleTryAnother}
                    className="min-h-[44px] flex-1 rounded-full border border-line px-4 text-sm font-semibold text-text transition-colors hover:border-violet/40"
                  >
                    Try another example
                  </button>
                  <button
                    type="button"
                    onClick={handleReviewDocument}
                    className="min-h-[44px] flex-1 rounded-full px-4 text-sm font-semibold text-purple underline decoration-purple/30 underline-offset-4 hover:decoration-purple"
                  >
                    Review sample document
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <SourcePreview entry={selectedSource} onClose={() => setSelectedSource(null)} />

        {showWatchSample && (
          <button
            type="button"
            onClick={runAutoplay}
            className="absolute bottom-3 right-5 font-mono text-[11px] text-violet underline decoration-violet/30 underline-offset-4 hover:decoration-violet"
          >
            Watch the sample →
          </button>
        )}

        {autoPlaying && (
          <button
            type="button"
            onClick={stopAutoplay}
            className="absolute bottom-3 right-5 font-mono text-[11px] text-violet underline decoration-violet/30 underline-offset-4 hover:decoration-violet"
          >
            Take control
          </button>
        )}
      </div>
    </div>
  );
});

export default DocumentSimulator;
