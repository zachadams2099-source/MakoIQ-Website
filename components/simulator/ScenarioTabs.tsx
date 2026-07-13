"use client";

import { useRef } from "react";
import { scenarioOrder, scenarios, type ScenarioId } from "@/lib/simulator.config";
import { cn } from "@/lib/utils";

type Props = {
  active: ScenarioId;
  onSelect: (id: ScenarioId) => void;
};

export default function ScenarioTabs({ active, onSelect }: Props) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (index + 1) % scenarioOrder.length : (index - 1 + scenarioOrder.length) % scenarioOrder.length;
    tabRefs.current[next]?.focus();
    onSelect(scenarioOrder[next]);
  };

  return (
    <div role="tablist" aria-label="Sample document type" className="flex gap-2 overflow-x-auto pb-1">
      {scenarioOrder.map((id, i) => (
        <button
          key={id}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          role="tab"
          aria-selected={active === id}
          tabIndex={active === id ? 0 : -1}
          data-first-focus={id === scenarioOrder[0] ? true : undefined}
          onClick={() => onSelect(id)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors",
            active === id
              ? "border-purple bg-purple/10 text-purple"
              : "border-line text-muted hover:border-violet/40 hover:text-text"
          )}
        >
          {scenarios[id].tabLabel}
        </button>
      ))}
    </div>
  );
}
