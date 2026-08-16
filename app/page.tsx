import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/ui/TrustStrip";
import ProblemSection from "@/components/sections/ProblemSection";
import StepsSection from "@/components/sections/StepsSection";
import PreviewSection from "@/components/sections/PreviewSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PrivacySection from "@/components/sections/PrivacySection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <ProblemSection />
        <StepsSection />
        <PreviewSection />
        <FeaturesSection />
        <PrivacySection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
