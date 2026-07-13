export default function QualifyingQuestion() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="flex flex-col items-center justify-center gap-3 font-serif text-[1.75rem] font-medium leading-[1.2] text-text sm:text-4xl md:flex-row md:gap-6 md:text-[2.75rem]">
            <span data-qq-left className="md:text-right">
              Do you need answers from documents,
            </span>
            <span
              aria-hidden
              data-qq-divider
              className="hidden h-12 w-px shrink-0 bg-line md:block lg:h-16"
            />
            <span data-qq-right className="md:text-left">
              or do you need documents produced?
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Chat tools answer questions. MakoIQ produces the deliverable. That is the difference
            between research and finished work.
          </p>
        </div>
      </div>
    </section>
  );
}
