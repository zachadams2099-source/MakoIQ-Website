"use client";

import { selfServePlans, businessPlan, creditRules, topUps, creditsDoNotExpireNote } from "@/lib/pricing.config";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { cn } from "@/lib/utils";

export default function PricingPageClient() {
  const { openModal } = useAuthModal();

  return (
    <div className="container-page">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-violet">Pricing</p>
        <h1 className="mt-3 font-serif text-4xl font-medium text-text sm:text-5xl">
          Simple plans. Credits that go far.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-text/80">
          Start free. Every plan includes full-quality downloads and source-connected review.
          Purchased credits do not expire.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {selfServePlans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative rounded-2xl border bg-card p-6",
              plan.badge === "MOST POPULAR" ? "border-purple shadow-lg shadow-purple/10" : "border-line"
            )}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-purple px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-wide text-white">
                {plan.badge}
              </span>
            )}
            <h2 className="font-serif text-lg font-medium text-text">{plan.label}</h2>
            <p className="mt-2">
              <span className="font-mono text-3xl font-semibold text-text">{plan.price}</span>
              {plan.period && <span className="font-mono text-sm text-muted">{plan.period}</span>}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{plan.bestFor}</p>
            <ul className="mt-5 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-text/80">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => openModal("signup", plan.label)}
              className="mt-6 min-h-[44px] w-full rounded-full bg-purple px-4 text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-6xl rounded-2xl border border-line bg-ink p-8 sm:p-10">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-violet">{businessPlan.label}</p>
            <p className="mt-2 font-serif text-2xl font-medium text-white">
              {businessPlan.price}
              <span className="font-mono text-sm text-white/50">{businessPlan.period}</span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{businessPlan.bestFor}</p>
          </div>
          <a
            href="/contact"
            className="min-h-[44px] shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-all hover:brightness-95"
          >
            {businessPlan.cta}
          </a>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {businessPlan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-white/70">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="font-serif text-2xl font-medium text-text">How credits work</h2>
        <p className="mt-3 text-sm leading-relaxed text-text/80">
          Every {creditRules.pagesPerCredit} source pages equal 1 credit, with a minimum of{" "}
          {creditRules.minimumCreditsPerDocument} credits per finished document.
        </p>
        <ul className="mt-4 space-y-2">
          {creditRules.examples.map((ex) => (
            <li key={ex.pages} className="flex items-center justify-between rounded-md border border-line bg-card px-4 py-3 text-sm">
              <span className="text-text/80">A {ex.pages}</span>
              <span className="font-mono text-xs font-medium text-violet">{ex.credits}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-5 space-y-2">
          {creditRules.notes.map((note) => (
            <li key={note} className="flex items-start gap-2 text-sm text-text/70">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green" />
              {note}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <h2 className="font-serif text-2xl font-medium text-text">Additional credits</h2>
        <p className="mt-3 text-sm leading-relaxed text-text/80">
          Need more this month? Top up any time. {creditsDoNotExpireNote}
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {topUps.map((t) => (
            <div key={t.credits} className="rounded-xl border border-line bg-card p-5 text-center">
              <p className="font-mono text-2xl font-semibold text-text">{t.price}</p>
              <p className="mt-1 text-sm text-text/80">{t.credits} credits</p>
              <p className="mt-1 font-mono text-xs text-muted">{t.pagesEquivalent}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
