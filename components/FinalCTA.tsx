"use client";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.08]">
        <div className="relative h-64 w-64">
          <div className="ghost-doc-a absolute left-4 top-2 h-20 w-16 rounded-sm border border-white/40" />
          <div className="ghost-doc-b absolute right-6 top-10 h-20 w-16 rounded-sm border border-white/40" />
          <div className="absolute bottom-4 left-1/2 h-28 w-20 -translate-x-1/2 rounded-sm border border-white/60" />
        </div>
      </div>

      <style jsx>{`
        .ghost-doc-a {
          animation: drift-a 4.8s ease-in-out infinite;
        }
        .ghost-doc-b {
          animation: drift-b 4.8s ease-in-out infinite 1.6s;
        }
        @keyframes drift-a {
          0% {
            transform: translate(0, 0) rotate(-10deg);
            opacity: 0.6;
          }
          70% {
            opacity: 0.6;
          }
          100% {
            transform: translate(14px, 10px) rotate(0deg);
            opacity: 0;
          }
        }
        @keyframes drift-b {
          0% {
            transform: translate(0, 0) rotate(8deg);
            opacity: 0.6;
          }
          70% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-14px, -8px) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="container-page relative text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-4xl font-medium leading-tight text-white sm:text-5xl">
          The next one takes minutes.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          You have produced this document a hundred times. Upload it once, and never start from a
          blank page again.
        </p>
        <a
          href="/signup"
          className="mt-9 inline-flex items-center justify-center rounded-full bg-purple px-8 py-4 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Run your first document free
        </a>
      </div>
    </section>
  );
}
