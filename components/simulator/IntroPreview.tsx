export default function IntroPreview() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6" aria-hidden>
      <div className="intro-el intro-doc rounded-lg border border-line bg-white p-4" style={{ animationDelay: "0ms" }}>
        <div className="h-2 w-28 rounded-full bg-ink/70" />
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-text/10" />
          <div className="h-1.5 w-4/5 rounded-full bg-text/10" />
        </div>
      </div>

      <div className="flex gap-2">
        {["Firm_Overview.pdf", "Strategy_Deck.pptx", "Fee_Schedule.xlsx"].map((name, i) => (
          <div
            key={name}
            className="intro-el intro-chip flex-1 rounded-md border border-line bg-white px-2 py-1.5"
            style={{ animationDelay: `${260 + i * 140}ms` }}
          >
            <p className="truncate font-mono text-[8px] text-muted">{name}</p>
          </div>
        ))}
      </div>

      <div className="intro-el rounded-md border border-violet/30 bg-violet/5 px-3 py-2" style={{ animationDelay: "820ms" }}>
        <p className="font-mono text-[9px] text-violet">◆ Investment_Strategy_Deck.pptx · slide 14</p>
      </div>

      <style jsx>{`
        .intro-el {
          opacity: 0;
          transform: translateY(8px);
          animation: intro-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes intro-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .intro-el {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
