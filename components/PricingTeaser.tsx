const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    features: ["20 credits", "First full run free", "Watermark-free download"],
    badge: null,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    features: ["Priority processing", "Reusable templates", "Unlimited templates"],
    badge: "Most popular",
  },
  {
    name: "Team",
    price: "$299",
    period: "/mo",
    features: ["Shared template library", "Team seats", "Admin controls"],
    badge: null,
  },
];

export default function PricingTeaser() {
  return (
    <section className="bg-card py-24 md:py-32">
      <div className="container-page">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-medium text-text sm:text-4xl">
            Start free. Your first document is on us.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              data-pricing-card
              className="relative rounded-2xl border border-line bg-paper p-7 transition-all duration-150 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-serif text-lg font-medium text-text">{plan.name}</h3>
              <p className="mt-2">
                <span className="font-mono text-3xl font-semibold text-text">{plan.price}</span>
                <span className="font-mono text-sm text-muted">{plan.period}</span>
              </p>
              <ul className="mt-5 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet" />
                    {f}
                  </li>
                ))}
              </ul>
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
