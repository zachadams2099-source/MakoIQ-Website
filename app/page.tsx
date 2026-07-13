import Header from "@/components/Header";
import Hero from "@/components/hero/Hero";
import QualifyingQuestion from "@/components/QualifyingQuestion";
import HowItWorks from "@/components/HowItWorks";
import OutputMarquee from "@/components/OutputMarquee";
import ValueReceipt from "@/components/ValueReceipt";
import PricingTeaser from "@/components/PricingTeaser";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QualifyingQuestion />
        <HowItWorks />
        <OutputMarquee />
        <ValueReceipt />
        <PricingTeaser />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
