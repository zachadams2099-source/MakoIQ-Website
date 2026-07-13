"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import AuthModal from "./AuthModal";

export type AuthMode = "signup" | "login";

type AuthModalContextValue = {
  openModal: (mode: AuthMode, plan?: string) => void;
  closeModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}

export default function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signup");
  const [plan, setPlan] = useState<string | undefined>(undefined);

  const openModal = useCallback((nextMode: AuthMode, nextPlan?: string) => {
    setMode(nextMode);
    setPlan(nextPlan);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal isOpen={isOpen} mode={mode} plan={plan} onClose={closeModal} onModeChange={setMode} />
    </AuthModalContext.Provider>
  );
}
