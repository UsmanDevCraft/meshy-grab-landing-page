import dynamic from "next/dynamic";
import { Suspense } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroShimmer from "@/components/sections/HeroShimmer";
import PaddleInitializer from "@/components/PaddleInitializer";

const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), {
  loading: () => <HeroShimmer />,
});
import TrustStrip from "@/components/ui/TrustStrip";
import ToolsOverviewSection from "@/components/sections/ToolsOverviewSection";
import ViewerSection from "@/components/sections/ViewerSection";
import ConverterSection from "@/components/sections/ConverterSection";
import UpscalerSection from "@/components/sections/UpscalerSection";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import TextureExportSection from "@/components/sections/TextureExportSection";
import ProblemSection from "@/components/sections/ProblemSection";
import StepsSection from "@/components/sections/StepsSection";
import PreviewSection from "@/components/sections/PreviewSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AudienceSection from "@/components/sections/AudienceSection";
import PrivacySection from "@/components/sections/PrivacySection";
import MoneySection from "@/components/sections/MoneySection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";
import PlansContent from "@/components/sections/PlansContent";

export default function HomePage() {
  return (
    <>
      <PaddleInitializer />
      <Navbar />
      <main id="main-content">
        {/* 1. All-in-one 3D toolkit hero */}
        <HeroSection />

        {/* Trust Badges */}
        <TrustStrip />

        {/* 2. Visual overview of the core tools */}
        <ToolsOverviewSection />

        {/* 3. 3D workspace and model viewer */}
        <ViewerSection />

        {/* 4. Universal format converter */}
        <ConverterSection />

        {/* 5. 4K/8K PBR texture upscaler */}
        <UpscalerSection />

        {/* 6 & 7. Meshy AI workspace & Discover integrations + Tripo3D Studio */}
        <IntegrationsSection />

        {/* 8. Texture extraction and PNG exports */}
        <TextureExportSection />

        {/* Workflow Comparison / Problem & Solution */}
        <ProblemSection />

        {/* 9. How it works */}
        <StepsSection />

        {/* Extension UI Preview */}
        <PreviewSection />

        {/* Core Value & Benefits */}
        <FeaturesSection />

        {/* 11. Target audiences and use cases */}
        <AudienceSection />

        {/* 10. Pricing and feature comparison */}
        <Suspense
          fallback={
            <div className="py-24 text-center text-text-muted">
              Loading plans...
            </div>
          }
        >
          <PlansContent isPlanPage={false} />
        </Suspense>

        {/* Pro Membership / Upgrade Callout */}
        <MoneySection />

        {/* Privacy & Infrastructure Transparency */}
        <PrivacySection />

        {/* 12. Frequently Asked Questions */}
        <FAQSection />

        {/* 13. Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
