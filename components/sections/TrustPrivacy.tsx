const indicators = [
  { label: "Private document processing", copy: "Your source materials and finished documents are not shared across firms." },
  { label: "Controlled access", copy: "Access to your firm's documents and templates is limited to your account and team." },
  { label: "Source-connected outputs", copy: "Every response stays linked to the source material behind it." },
  { label: "Review before download", copy: "Nothing leaves MakoIQ without your review and approval." },
  { label: "Clear activity history", copy: "Every run is recorded, so your team can see what was produced and from what." },
];

export default function TrustPrivacy() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-medium text-white sm:text-4xl">
            Your firm&apos;s work stays your firm&apos;s work.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            MakoIQ is designed for confidential investment documents, controlled access,
            source-connected review, and clear accountability.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {indicators.map((item) => (
            <div key={item.label} data-trust-card className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-violet/15 text-violet">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 1.5l5.5 2.2v3.8c0 3.5-2.3 6.4-5.5 7.3-3.2-.9-5.5-3.8-5.5-7.3V3.7L8 1.5z" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
              <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/60">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
