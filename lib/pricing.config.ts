export type PlanId = "free" | "starter" | "pro" | "team" | "business";

export type Plan = {
  id: PlanId;
  label: string;
  badge?: string;
  price: string;
  period?: string;
  bestFor: string;
  features: string[];
  cta: string;
  ctaAction: "auth" | "contact";
};

export const plans: Plan[] = [
  {
    id: "free",
    label: "Free",
    badge: "FREE",
    price: "$0",
    bestFor: "Your first document is on us.",
    features: [
      "20 credits for the first run",
      "Up to 1,000 source pages",
      "Full-quality download",
      "One saved template",
      "No credit card required",
    ],
    cta: "Create free account",
    ctaAction: "auth",
  },
  {
    id: "starter",
    label: "Starter",
    price: "$29",
    period: "/month",
    bestFor: "For an individual analyst or due diligence professional.",
    features: [
      "30 credits",
      "Up to 1,500 source pages per month",
      "Clone workflow for RFPs and DDQs",
      "Full-quality output",
      "One saved template",
      "Single seat",
      "Additional credits available",
    ],
    cta: "Create free account",
    ctaAction: "auth",
  },
  {
    id: "pro",
    label: "Pro",
    badge: "MOST POPULAR",
    price: "$99",
    period: "/month",
    bestFor: "For professionals producing documents throughout the month.",
    features: [
      "75 credits",
      "Up to 3,750 source pages per month",
      "Approximately 2 to 4 finished documents",
      "Five saved templates",
      "Priority processing",
      "Unused credits roll over one month",
    ],
    cta: "Create free account",
    ctaAction: "auth",
  },
  {
    id: "team",
    label: "Team",
    price: "$299",
    period: "/month",
    bestFor: "For investment teams producing RFPs, DDQs, and reports together.",
    features: [
      "240 shared credits",
      "Up to 12,000 source pages per month",
      "Up to 10 seats",
      "Shared firm-owned template library",
      "Pooled balance",
      "Admin controls",
      "One invoice",
      "Direct support",
    ],
    cta: "Create free account",
    ctaAction: "auth",
  },
  {
    id: "business",
    label: "Business",
    price: "From $7,500",
    period: "/year",
    bestFor: "For firms that need expanded sharing, compliance controls, and support as they scale.",
    features: [
      "From 5,000 source pages per month",
      "Expanded sharing",
      "Compliance controls",
      "Audit logs",
      "Source citations",
      "Onboarding and support",
      "Access to additional XFinLabs capabilities as the firm grows",
    ],
    cta: "Talk to our team",
    ctaAction: "contact",
  },
];

export const selfServePlans = plans.filter((p) => p.id !== "business");
export const businessPlan = plans.find((p) => p.id === "business")!;

export const creditRules = {
  pagesPerCredit: 50,
  minimumCreditsPerDocument: 10,
  examples: [
    { pages: "800 to 1,500-page diligence package", credits: "16 to 30 credits" },
    { pages: "3,000-page package", credits: "approximately 60 credits" },
  ],
  notes: [
    "The credit cost is shown before the document is produced.",
    "Pages are counted when they are first added.",
    "Reusing a saved template with an existing source package uses the document minimum.",
  ],
};

export type TopUp = {
  credits: number;
  price: string;
  pagesEquivalent: string;
};

export const topUps: TopUp[] = [
  { credits: 10, price: "$25", pagesEquivalent: "up to 500 pages" },
  { credits: 25, price: "$60", pagesEquivalent: "up to 1,250 pages" },
  { credits: 50, price: "$120", pagesEquivalent: "up to 2,500 pages" },
];

export const creditsDoNotExpireNote = "Purchased credits do not expire.";
