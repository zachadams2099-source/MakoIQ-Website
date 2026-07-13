const steps = [
  {
    n: "1",
    title: "Add the document.",
    copy: "Start with a blank request, an unfinished template, or a past finished example.",
  },
  {
    n: "2",
    title: "Add the information.",
    copy: "Load the financials, policies, presentations, agreements, spreadsheets, and other materials needed to complete it.",
  },
  {
    n: "3",
    title: "Review the finished work.",
    copy: "MakoIQ produces the document in the structure your team already uses and shows the source material behind its responses.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-paper py-24 md:py-32">
      <div className="container-page">
        <h2 className="text-center font-serif text-3xl font-medium text-text sm:text-4xl">
          The workflow really is this simple.
        </h2>

        <div className="relative mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-8 hidden h-px bg-line md:block"
            style={{ marginInline: "16.66%" }}
          />
          {steps.map((step) => (
            <div key={step.n} data-hiw-card className="relative text-center md:text-left">
              <p className="relative z-10 inline-block bg-paper pr-4 font-serif text-6xl font-medium text-violet/30 md:pr-6">
                {step.n}
              </p>
              <h3 className="mt-4 font-serif text-xl font-medium text-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
