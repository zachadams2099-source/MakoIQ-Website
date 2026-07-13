import { forwardRef } from "react";

type TemplateDocProps = {
  className?: string;
};

const TemplateDoc = forwardRef<HTMLDivElement, TemplateDocProps>(({ className }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative w-[280px] rounded-lg bg-white p-5 shadow-2xl shadow-black/40 sm:w-[340px] ${className ?? ""}`}
    >
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div>
          <div className="h-2 w-24 rounded-full bg-ink/80" />
          <div className="mt-1.5 h-1.5 w-16 rounded-full bg-muted/40" />
        </div>
        <span
          data-ready-chip
          className="rounded-full bg-green/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-green"
        >
          Ready
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <div data-fill-heading className="h-1.5 w-20 rounded-full bg-violet/50" />
          <div className="mt-2 space-y-1.5">
            <div data-fill-body className="h-1.5 w-full rounded-full bg-text/10" />
            <div data-fill-body className="h-1.5 w-11/12 rounded-full bg-text/10" />
            <div data-fill-body className="h-1.5 w-4/5 rounded-full bg-text/10" />
          </div>
        </div>

        <div className="rounded-md border border-line">
          <div className="grid grid-cols-3 gap-px bg-line">
            <div className="bg-paper px-2 py-1.5 font-mono text-[7px] uppercase text-muted">
              Metric
            </div>
            <div className="bg-paper px-2 py-1.5 font-mono text-[7px] uppercase text-muted">
              FY23
            </div>
            <div className="bg-paper px-2 py-1.5 font-mono text-[7px] uppercase text-muted">
              FY24
            </div>
            {[0, 1, 2].map((row) => (
              <div key={row} className="contents">
                <div data-fill-row className="bg-white px-2 py-1.5">
                  <div className="h-1 w-10 rounded-full bg-text/15" />
                </div>
                <div data-fill-row className="bg-white px-2 py-1.5">
                  <div className="h-1 w-6 rounded-full bg-text/15" />
                </div>
                <div data-fill-row className="bg-white px-2 py-1.5">
                  <div className="h-1 w-6 rounded-full bg-text/15" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-end gap-1 pt-1">
          {[40, 65, 50, 80, 60, 90].map((h, i) => (
            <div
              key={i}
              data-fill-bar
              style={{ height: `${h * 0.35}px` }}
              className="w-full rounded-t-sm bg-violet/40"
            />
          ))}
        </div>

        <div className="space-y-1.5 pt-1">
          <div data-fill-final className="h-1.5 w-full rounded-full bg-text/10" />
          <div data-fill-final className="h-1.5 w-3/4 rounded-full bg-text/10" />
          <span
            data-cursor
            className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-purple"
          />
        </div>
      </div>
    </div>
  );
});

TemplateDoc.displayName = "TemplateDoc";
export default TemplateDoc;
