import type { Metadata } from "next";
import LegalPageLayout from "@/components/sections/LegalPageLayout";

export const metadata: Metadata = {
  title: "Contact | MakoIQ",
};

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact" updated="July 2026">
      <p className="text-sm leading-relaxed text-text/80">
        MakoIQ is a product of XFinLabs. For sales, support, security reports, or general
        questions, reach us at the email below and we will get back to you promptly.
      </p>

      <div className="rounded-xl border border-line bg-card p-6">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">Email</p>
        <a
          href="mailto:hello@makoiq.com"
          className="mt-1 inline-block font-serif text-xl font-medium text-purple"
        >
          hello@makoiq.com
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-card p-5">
          <p className="font-serif text-base font-medium text-text">Sales</p>
          <p className="mt-1.5 text-sm leading-relaxed text-text/70">
            Interested in Team or Business plans for your firm? Use the &ldquo;Talk to our
            team&rdquo; button on our{" "}
            <a href="/pricing" className="text-purple underline decoration-purple/30 underline-offset-4">
              pricing page
            </a>
            .
          </p>
        </div>
        <div className="rounded-xl border border-line bg-card p-5">
          <p className="font-serif text-base font-medium text-text">Support</p>
          <p className="mt-1.5 text-sm leading-relaxed text-text/70">
            Existing customers can also reach support from within the product once signed in.
          </p>
        </div>
      </div>
    </LegalPageLayout>
  );
}
