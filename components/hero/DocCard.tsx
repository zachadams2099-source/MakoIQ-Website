import { forwardRef } from "react";

const DocCard = forwardRef<HTMLDivElement, { name: string; style?: React.CSSProperties }>(
  ({ name, style }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className="absolute flex w-32 flex-col gap-1.5 rounded-md border border-white/10 bg-white/[0.06] p-3 shadow-lg shadow-black/20 backdrop-blur-sm sm:w-36"
      >
        <div className="h-1.5 w-3/4 rounded-full bg-white/25" />
        <div className="h-1.5 w-full rounded-full bg-white/15" />
        <div className="h-1.5 w-5/6 rounded-full bg-white/15" />
        <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
        <p className="mt-2 truncate font-mono text-[9px] text-white/45">{name}</p>
      </div>
    );
  }
);

DocCard.displayName = "DocCard";
export default DocCard;
