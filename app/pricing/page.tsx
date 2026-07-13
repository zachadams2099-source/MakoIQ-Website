import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing | MakoIQ",
  description:
    "Simple plans and credits for turning source materials into finished investment documents. Start free, purchased credits never expire.",
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="bg-paper pb-24 pt-32 md:pt-40">
        <PricingPageClient />
      </main>
      <Footer />
    </>
  );
}
