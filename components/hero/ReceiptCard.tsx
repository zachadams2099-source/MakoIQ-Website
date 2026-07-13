import { forwardRef } from "react";

const ReceiptCard = forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => {
  return (
    <div
      ref={ref}
      className={`w-[180px] rounded-md bg-white p-3.5 shadow-xl shadow-black/30 ${className ?? ""}`}
    >
      <p className="font-mono text-[8px] uppercase tracking-wider text-muted">MakoIQ Receipt</p>
      <div className="mt-2 space-y-1.5 border-t border-dashed border-line pt-2">
        <div className="flex justify-between font-mono text-[9px] text-text">
          <span className="text-muted">Source pages</span>
          <span>980</span>
        </div>
        <div className="flex justify-between border-t border-dashed border-line pt-1.5 font-mono text-[9px] text-text">
          <span className="text-muted">Finished doc</span>
          <span>34 pages</span>
        </div>
        <div className="flex justify-between border-t border-dashed border-line pt-1.5 font-mono text-[9px] font-semibold text-green">
          <span>Analyst hrs replaced</span>
          <span data-hours-value>~22 hrs</span>
        </div>
      </div>
    </div>
  );
});

ReceiptCard.displayName = "ReceiptCard";
export default ReceiptCard;
