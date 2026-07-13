"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ScenarioId } from "@/lib/simulator.config";

type SimulatorRunContextValue = {
  lastCompletedScenario: ScenarioId | null;
  reportCompletion: (id: ScenarioId) => void;
};

const SimulatorRunContext = createContext<SimulatorRunContextValue | null>(null);

export function useSimulatorRun() {
  const ctx = useContext(SimulatorRunContext);
  if (!ctx) throw new Error("useSimulatorRun must be used within SimulatorRunProvider");
  return ctx;
}

export default function SimulatorRunProvider({ children }: { children: React.ReactNode }) {
  const [lastCompletedScenario, setLastCompletedScenario] = useState<ScenarioId | null>(null);
  const value = useMemo(
    () => ({ lastCompletedScenario, reportCompletion: setLastCompletedScenario }),
    [lastCompletedScenario]
  );
  return <SimulatorRunContext.Provider value={value}>{children}</SimulatorRunContext.Provider>;
}
