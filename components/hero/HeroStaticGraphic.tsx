// Pure CSS backdrop, no raster assets. Doubles as the reduced-motion /
// no-WebGL end state and as the pre-hydration backdrop before capability
// detection decides whether to mount the animated canvas.
export default function HeroStaticGraphic() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 32% 40%, rgba(139,111,240,0.22), transparent 45%), radial-gradient(circle at 68% 45%, rgba(91,46,208,0.16), transparent 40%)",
        }}
      />
      <div className="absolute left-1/2 top-[38%] h-40 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 sm:h-52">
        <div
          className="absolute left-[18%] top-1/2 h-24 w-24 -translate-y-1/2 rounded-full sm:h-32 sm:w-32"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), rgba(139,111,240,0.35) 45%, rgba(23,16,43,0.9) 78%)",
            boxShadow: "0 0 60px rgba(139,111,240,0.35), inset 0 0 30px rgba(255,255,255,0.15)",
          }}
        />
        <div className="absolute right-[28%] top-1/2 h-28 w-20 -translate-y-1/2 rounded-sm bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:h-36 sm:w-24">
          <div className="mx-3 mt-3 h-1.5 rounded-full bg-violet/60 sm:mx-4 sm:mt-4" />
          <div className="mx-3 mt-2.5 space-y-1.5 sm:mx-4">
            <div className="h-1 rounded-full bg-ink/10" />
            <div className="h-1 w-4/5 rounded-full bg-ink/10" />
            <div className="h-1 w-3/5 rounded-full bg-ink/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
