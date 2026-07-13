import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({ title, updated, children }: Props) {
  return (
    <>
      <Header />
      <main className="bg-paper pb-24 pt-32 md:pt-40">
        <div className="container-page max-w-3xl">
          <p className="eyebrow text-violet">MakoIQ</p>
          <h1 className="mt-3 font-serif text-4xl font-medium text-text">{title}</h1>
          <p className="mt-2 font-mono text-xs text-muted">Last updated {updated}</p>
          <div className="prose-legal mt-10 space-y-8">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
