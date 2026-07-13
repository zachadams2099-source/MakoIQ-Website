import type { Metadata } from "next";
import LegalPageLayout from "@/components/sections/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | MakoIQ",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="July 2026">
      <section>
        <h2 className="font-serif text-xl font-medium text-text">1. What we collect</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          We collect account information such as your name, work email, and firm, along with the
          source materials, templates, and finished documents you upload or produce through
          MakoIQ, and standard usage data such as login activity and processing history.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">2. How we use it</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          We use your information to operate the service, produce your documents, maintain your
          account, and provide support. MakoIQ uses the past document you provide as the framework
          for the new one you request. Your documents and templates are not used to train models
          for other customers.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">3. How we share it</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          We do not sell your data. We share information only with service providers that help us
          operate MakoIQ, under contractual confidentiality obligations, or when required by law.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">4. Data retention</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          We retain your documents and account data for as long as your account is active. You may
          request deletion of your account and associated documents at any time.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">5. Security</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          We use industry-standard technical and organizational measures to protect your
          information. See our{" "}
          <a href="/security" className="text-purple underline decoration-purple/30 underline-offset-4">
            security page
          </a>{" "}
          for more detail.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">6. Your choices</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          You can access, update, or delete your account information at any time from within the
          product, or by reaching out through our{" "}
          <a href="/contact" className="text-purple underline decoration-purple/30 underline-offset-4">
            contact page
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
