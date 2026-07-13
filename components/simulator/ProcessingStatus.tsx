"use client";

import { useEffect, useRef, useState } from "react";
import { processingStatuses, type Scenario } from "@/lib/simulator.config";

type Props = {
  scenario: Scenario;
  onComplete: () => void;
};

const STEP_MS = 1400;

export default function ProcessingStatus({ scenario, onComplete }: Props) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [details, setDetails] = useState<string[]>([]);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    processingStatuses.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setStatusIndex(i);
          const detail = scenario.processingDetails[i];
          if (detail) setDetails((prev) => [...prev, detail]);
        }, i * STEP_MS)
      );
    });

    timers.push(
      setTimeout(() => {
        onCompleteRef.current();
      }, processingStatuses.length * STEP_MS + 400)
    );

    return () => timers.forEach(clearTimeout);
  }, [scenario]);

  const progress = ((statusIndex + 1) / processingStatuses.length) * 100;

  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-4 py-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-violet">{scenario.startDocument.filename}</p>
        <p className="mt-2 font-serif text-lg font-medium text-text">{processingStatuses[statusIndex]}…</p>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-purple transition-[width] duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="space-y-1.5">
        {details.map((d) => (
          <li key={d} className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className="h-1 w-1 rounded-full bg-green" aria-hidden />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}
