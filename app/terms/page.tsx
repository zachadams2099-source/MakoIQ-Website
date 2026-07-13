import type { Metadata } from "next";
import LegalPageLayout from "@/components/sections/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | MakoIQ",
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" updated="July 2026">
      <section>
        <h2 className="font-serif text-xl font-medium text-text">1. Agreement to terms</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          These Terms of Service govern access to and use of MakoIQ, a product of XFinLabs. By
          creating an account or using MakoIQ, you agree to these terms on behalf of yourself and,
          where applicable, your firm.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">2. The service</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          MakoIQ produces finished documents from the source materials and templates you provide.
          MakoIQ does not guarantee that every output is complete or free of error. You are
          responsible for reviewing and approving any document before it is used or sent.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">3. Accounts and credits</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          Plans are billed as described on our pricing page. Credits are consumed when documents
          are produced, as described in our credit policy. Purchased credits do not expire.
          Subscription credits reset or roll over according to the plan you select.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">4. Your content</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          You retain ownership of the source materials, templates, and finished documents you
          upload or produce through MakoIQ. You represent that you have the right to upload and
          process the materials you provide.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">5. Acceptable use</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          You agree not to use MakoIQ to process materials you do not have the right to use, to
          attempt to circumvent security controls, or to use the service in a way that violates
          applicable law.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">6. Termination</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          You may cancel your account at any time. We may suspend or terminate accounts that
          violate these terms.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl font-medium text-text">7. Contact</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">
          Questions about these terms can be sent through our{" "}
          <a href="/contact" className="text-purple underline decoration-purple/30 underline-offset-4">
            contact page
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
