import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveHero from "@/components/hero/InteractiveHero";
import HeadToHead from "@/components/sections/HeadToHead";
import UseCaseGallery from "@/components/sections/UseCaseGallery";
import HowItWorks from "@/components/HowItWorks";
import SourceConnectedReview from "@/components/sections/SourceConnectedReview";
import ValueReceiptSection from "@/components/sections/ValueReceiptSection";
import PricingPreview from "@/components/sections/PricingPreview";
import TrustPrivacy from "@/components/sections/TrustPrivacy";
import FinalCTA from "@/components/FinalCTA";
import SimulatorRunProvider from "@/components/simulator/SimulatorRunContext";

// Below-fold scroll animation logic, split out of the initial bundle.
const ScrollReveals = dynamic(() => import("@/components/ScrollReveals"), { ssr: false });

export default function Home() {
  return (
    <SimulatorRunProvider>
      <Header />
      <main>
        <InteractiveHero />
        <HeadToHead />
        <UseCaseGallery />
        <HowItWorks />
        <SourceConnectedReview />
        <ValueReceiptSection />
        <PricingPreview />
        <TrustPrivacy />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollReveals />
    </SimulatorRunProvider>
  );
}
