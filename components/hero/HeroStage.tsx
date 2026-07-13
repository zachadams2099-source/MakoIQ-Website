import { sourceDocs } from "./hero-data";
import DocCard from "./DocCard";
import TemplateDoc from "./TemplateDoc";
import ReceiptCard from "./ReceiptCard";

const staticVisible = sourceDocs.slice(0, 6);

export default function HeroStage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] md:aspect-[4/3.4]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--violet) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative h-full w-full">
        {staticVisible.map((doc) => (
          <DocCard
            key={doc.id}
            name={doc.name}
            style={{
              left: `${doc.x}%`,
              top: `${doc.y}%`,
              transform: `rotate(${doc.rotate}deg)`,
              opacity: 0.35,
            }}
          />
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <TemplateDoc />
          <ReceiptCard className="absolute -bottom-8 -right-10 rotate-3 sm:-bottom-10 sm:-right-14" />
        </div>
      </div>
    </div>
  );
}
