import { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/ui/TrustStrip";
import ToolsOverviewSection from "@/components/sections/ToolsOverviewSection";
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

const WorkSectionsCarousel = dynamic(
  () => import("@/components/sections/WorkSectionsCarousel"),
  { ssr: true },
);

const PlansContent = dynamic(
  () => import("@/components/sections/PlansContent"),
  { ssr: true },
);

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* 1. All-in-one 3D toolkit hero */}
        <HeroSection />

        {/* Trust Badges */}
        <TrustStrip />

        {/* 2. Visual overview of the core tools */}
        <ToolsOverviewSection />

        {/* 3, 4 & 5. Combined Core 3D Work Carousel (Viewer, Converter & Upscaler) */}
        <WorkSectionsCarousel />

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
