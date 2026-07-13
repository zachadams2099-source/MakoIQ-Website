import Link from "next/link";

export default function StubPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="eyebrow text-violet">Coming soon</p>
      <h1 className="mt-4 font-serif text-3xl font-medium text-white sm:text-4xl">{title}</h1>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
      >
        Back to home
      </Link>
    </div>
  );
}
