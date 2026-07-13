import { Marquee } from "./ui/marquee";

const outputs = [
  "RFP Responses",
  "DDQs",
  "RFIs",
  "Investment Committee Memos",
  "Underwriting Reports",
  "Third Party Due Diligence",
  "Quarterly Letters",
  "Deal Summaries",
  "Offering Memoranda",
  "Fund Commentary",
];

const rowTwo = [...outputs].reverse();

function Chip({ label }: { label: string }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-white/80">
      {label}
    </span>
  );
}

export default function OutputMarquee() {
  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="container-page">
        <p className="eyebrow text-center text-violet">What analysts produce with MakoIQ</p>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <Marquee pauseOnHover className="[--duration:32s]">
          {outputs.map((label) => (
            <Chip key={label} label={label} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:32s]">
          {rowTwo.map((label) => (
            <Chip key={label} label={label} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
