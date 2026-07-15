const rows: [string, string][] = [
  ["Answer questions about your documents", "Produces the finished deliverable"],
  ["Output: a chat response you copy and rework", "Output: your document, in your format, ready for review"],
  ["Start from a blank page every time", "Starts from the structure your firm already perfected"],
  ["You assemble, format, and structure", "Formatting, structure, and tables come out done"],
  ["Hours of prompting and pasting", "Pick the document, load the sources, review the result"],
];

export default function HeadToHead() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-page">
        <div data-htoh-intro className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-violet">The comparison</p>
          <h2 className="mt-3 font-serif text-2xl font-medium leading-tight text-text sm:text-3xl">
            Side by side, the difference is the deliverable.
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-line">
          <div className="grid grid-cols-2 bg-white">
            <div className="border-b border-r border-line px-4 py-3 sm:px-6">
              <p className="font-mono text-xs uppercase tracking-wide text-muted">General purpose AI tools</p>
            </div>
            <div className="relative border-b border-line bg-purple/[0.04] px-4 py-3 shadow-[inset_0_0_0_1px_rgba(91,46,208,0.25)] sm:px-6">
              <p className="font-mono text-xs uppercase tracking-wide text-purple">MakoIQ</p>
            </div>
          </div>

          {rows.map(([left, right], i) => (
            <div key={i} data-htoh-row className="grid grid-cols-2 bg-white">
              <div className="border-b border-r border-line px-4 py-4 text-sm text-text/70 sm:px-6">{left}</div>
              <div className="relative border-b border-line bg-purple/[0.04] px-4 py-4 text-sm font-medium text-text shadow-[inset_0_0_0_1px_rgba(91,46,208,0.15)] sm:px-6">
                {right}
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-lg font-medium text-text sm:text-xl">
          Other tools stop at the answer. MakoIQ starts where they end: the finished document.
        </p>
      </div>
    </section>
  );
}
