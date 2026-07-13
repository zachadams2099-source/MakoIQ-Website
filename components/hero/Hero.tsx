import HeroStage from "./HeroStage";

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-ink pt-16 md:pt-20">
      <div className="container-page grid w-full grid-cols-1 items-center gap-12 py-16 md:grid-cols-[45%_55%] md:gap-8 md:py-24">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow text-violet">Institutional Work Product</p>

          <h1 className="mt-6 font-serif text-[2.5rem] font-medium leading-[1.08] text-white sm:text-[3rem] lg:text-[3.5rem]">
            Your documents in.
            <br />
            Your deliverable out.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            Drop in your source materials. Drop in the document your firm already produces.
            MakoIQ returns the finished version in your exact format, in minutes. Your first
            document is free.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-purple px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Run your first document free
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/50 hover:text-white"
            >
              Watch a 90 second run
            </a>
          </div>

          <p className="eyebrow mt-5 text-white/40">
            No credit card. Sign in with Google or Microsoft.
          </p>
        </div>

        <HeroStage />
      </div>
    </section>
  );
}
