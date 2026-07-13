import DropSourcesAnim from "./how-it-works/DropSourcesAnim";
import TemplateOutlineAnim from "./how-it-works/TemplateOutlineAnim";
import FinishedDocAnim from "./how-it-works/FinishedDocAnim";

const steps = [
  {
    n: "01",
    title: "Drop your sources.",
    copy: "PDFs, spreadsheets, decks, data rooms. Drop in everything relevant to the deal. Pages are counted once, never again.",
    Anim: DropSourcesAnim,
  },
  {
    n: "02",
    title: "Add your template.",
    copy: "Upload the finished document your firm already produces. MakoIQ learns its structure, format, tone, and tables. It becomes a reusable template your firm owns.",
    Anim: TemplateOutlineAnim,
  },
  {
    n: "03",
    title: "Get the finished document.",
    copy: "Minutes later, download the deliverable in your exact format. You review, you approve, you send. Every run shows its sources.",
    Anim: FinishedDocAnim,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-paper pb-24 pt-4 md:pb-32">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.n}
              data-hiw-card
              className="group rounded-2xl border border-line bg-card p-7 transition-all duration-150 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
            >
              <span className="eyebrow text-violet">{step.n}</span>
              <div className="mt-2">
                <step.Anim />
              </div>
              <h3 className="mt-4 font-serif text-xl font-medium text-text">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
