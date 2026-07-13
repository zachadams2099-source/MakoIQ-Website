"use client";

import { selfServePlans } from "@/lib/pricing.config";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { cn } from "@/lib/utils";

export default function PricingPreview() {
  const { openModal } = useAuthModal();

  return (
    <section id="pricing" className="bg-paper py-24 md:py-32">
      <div className="container-page">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-medium text-text sm:text-4xl">
            Start free. Your first document is on us.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {selfServePlans.map((plan) => (
            <div
              key={plan.id}
              data-pricing-card
              className={cn(
                "relative rounded-2xl border bg-card p-6 transition-all duration-150 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5",
                plan.badge === "MOST POPULAR" ? "border-purple" : "border-line"
              )}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-purple px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-wide text-white">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-serif text-lg font-medium text-text">{plan.label}</h3>
              <p className="mt-2">
                <span className="font-mono text-2xl font-semibold text-text">{plan.price}</span>
                {plan.period && <span className="font-mono text-sm text-muted">{plan.period}</span>}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{plan.bestFor}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-text/80">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openModal("signup", plan.label)}
                className="mt-5 min-h-[40px] w-full rounded-full border border-line px-4 text-xs font-semibold text-text transition-colors hover:border-purple hover:text-purple"
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-xs text-muted">
            Simple plans. Credits that go far. Purchased credits never expire.
          </p>
          <a
            href="/pricing"
            className="text-sm font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
          >
            See full pricing →
          </a>
        </div>
      </div>
    </section>
  );
}
