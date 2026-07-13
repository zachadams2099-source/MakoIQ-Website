"use client";

import { useRef } from "react";
import type { AuthMode } from "./AuthModalProvider";
import { useFocusTrap } from "@/lib/useFocusTrap";

type AuthModalProps = {
  isOpen: boolean;
  mode: AuthMode;
  plan?: string;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
};

// Integration points: wire these to real OAuth / magic-link flows when the
// authenticated application is built. The homepage never talks to a backend.
function handleContinueWithGoogle() {}
function handleContinueWithMicrosoft() {}
function handleContinueWithEmail() {}

export default function AuthModal({ isOpen, mode, plan, onClose, onModeChange }: AuthModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen, onClose);

  if (!isOpen) return null;

  const isSignup = mode === "signup";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative z-10 w-full max-w-md rounded-t-2xl bg-card p-7 shadow-2xl sm:rounded-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper hover:text-text"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <p className="eyebrow text-violet">{isSignup ? "Create account" : "Welcome back"}</p>
        <h2 id="auth-modal-title" className="mt-2 font-serif text-2xl font-medium text-text">
          {isSignup ? "Create your MakoIQ account" : "Welcome back"}
        </h2>

        {isSignup && (
          <p className="mt-2 text-sm leading-relaxed text-text/80">
            Create an account to run your first document with your own source materials.
          </p>
        )}

        {isSignup && plan && (
          <p className="mt-3 inline-block rounded-full bg-violet/10 px-3 py-1 font-mono text-xs text-violet">
            Selected plan: {plan}
          </p>
        )}

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleContinueWithMicrosoft}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-violet/50"
          >
            Continue with Microsoft
          </button>
          <button
            type="button"
            onClick={handleContinueWithGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-violet/50"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={handleContinueWithEmail}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-purple px-5 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            Continue with email
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => onModeChange("login")} className="font-semibold text-purple">
                Log in
              </button>
            </>
          ) : (
            <>
              New to MakoIQ?{" "}
              <button type="button" onClick={() => onModeChange("signup")} className="font-semibold text-purple">
                Create an account
              </button>
            </>
          )}
        </p>

        <div className="mt-6 border-t border-line pt-5 text-center">
          <p className="font-mono text-xs text-muted">Your first document is free. No credit card required.</p>
          <p className="mt-2 text-xs text-muted">
            By continuing you agree to our{" "}
            <a href="/terms" className="underline hover:text-text">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-text">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
