import type { Metadata } from "next";
import LegalPageLayout from "@/components/sections/LegalPageLayout";

export const metadata: Metadata = {
  title: "Security | MakoIQ",
};

const practices = [
  {
    title: "Private document processing",
    copy: "Your source materials and finished documents are processed within your account and are not shared across firms.",
  },
  {
    title: "Controlled access",
    copy: "Access to your firm's documents and templates is limited to authenticated members of your account.",
  },
  {
    title: "Encryption in transit",
    copy: "Data moving between your browser and MakoIQ is encrypted using industry-standard transport security.",
  },
  {
    title: "Source-connected outputs",
    copy: "Every response in a finished document stays linked to the source material behind it, so your team can verify what supports each answer.",
  },
  {
    title: "Activity history",
    copy: "Every document run is recorded, so your team can see what was produced, when, and from what source materials.",
  },
];

export default function SecurityPage() {
  return (
    <LegalPageLayout title="Security" updated="July 2026">
      <p className="text-sm leading-relaxed text-text/80">
        MakoIQ is built for confidential investment documents. Our security practices are designed
        around controlled access, source-connected review, and clear accountability. As our
        certifications program matures, this page will be updated to reflect any completed audits.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {practices.map((p) => (
          <div key={p.title} className="rounded-xl border border-line bg-card p-5">
            <p className="font-serif text-base font-medium text-text">{p.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-text/70">{p.copy}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">Reporting a concern</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          If you believe you have found a security issue, please reach out through our{" "}
          <a href="/contact" className="text-purple underline decoration-purple/30 underline-offset-4">
            contact page
          </a>{" "}
          and we will respond promptly.
        </p>
      </section>
    </LegalPageLayout>
  );
}
