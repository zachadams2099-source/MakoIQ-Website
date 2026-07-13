export default function QualifyingQuestion() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-page">
        <div className="relative mx-auto max-w-4xl text-center">
          <h2
            data-qq-left
            data-qq-right
            className="font-serif text-[1.75rem] font-medium leading-[1.2] text-text sm:text-4xl md:text-[2.75rem]"
          >
            Do you need answers from documents, or do you need documents produced?
          </h2>
          <div
            aria-hidden
            data-qq-divider
            className="mx-auto mt-8 h-16 w-px bg-line"
          />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Chat tools answer questions. MakoIQ produces the deliverable. That is the difference
            between research and finished work.
          </p>
        </div>
      </div>
    </section>
  );
}
