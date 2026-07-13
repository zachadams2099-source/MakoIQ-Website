import { NumberTicker } from "./ui/number-ticker";

export default function ValueReceipt() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-20">
          <div data-receipt-copy>
            <h2 className="font-serif text-3xl font-medium leading-tight text-text sm:text-4xl">
              Every run shows you what it was worth.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              When your document is ready, MakoIQ shows the hours it replaced and what those
              hours cost. Not a vanity metric. The same math your CFO would do.
            </p>
          </div>

          <div data-receipt-card className="mx-auto w-full max-w-sm rounded-2xl border border-line bg-card p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-violet">MakoIQ Receipt</p>
              <span className="font-mono text-[10px] text-muted">#DDQ-0142</span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between border-t border-dashed border-line pt-3">
                <span className="text-sm text-muted">Source pages analyzed</span>
                <span className="font-mono text-sm font-medium text-text">
                  <NumberTicker value={980} />
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-line pt-3">
                <span className="text-sm text-muted">Finished document</span>
                <span className="font-mono text-sm font-medium text-text">
                  <NumberTicker value={34} suffix=" pages" />
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-line pt-3">
                <span className="text-sm font-medium text-green">Analyst hours replaced</span>
                <span className="font-mono text-sm font-semibold text-green">
                  ~<NumberTicker value={22} suffix=" hrs" />
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-line pt-3">
                <span className="text-sm font-medium text-green">Estimated value</span>
                <span className="font-mono text-base font-semibold text-green">
                  <NumberTicker value={1430} prefix="$" />
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-paper p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                How we count it
              </p>
              <p className="mt-2 font-mono text-xs leading-relaxed text-text/80">
                22 hrs replaced × $65/hr blended analyst rate = $1,430 in review time saved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
