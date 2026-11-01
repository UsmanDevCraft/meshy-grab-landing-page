import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PlansContent from "@/components/sections/PlansContent";
import { getActiveSale } from "@/utils/saleHelpers";

export function generateMetadata(): Metadata {
  const { isActive, saleData } = getActiveSale();

  const title =
    isActive && saleData
      ? `${saleData.title}: Plans & Pricing — MeshyGrab`
      : "Plans & Pricing — MeshyGrab";

  const description =
    isActive && saleData
      ? `Explore MeshyGrab pricing plans. Limited Time ${saleData.title}: Pro Max ($2.99/mo), Pro Annual ($5.99/yr), or Lifetime ($9.99) for up to 67% OFF! Includes 3D workspace renderer, 4K/8K AI upscaler, and format converter.`
      : "Explore MeshyGrab pricing plans. Start free or upgrade to Pro, Pro Max ($3.99/mo), Pro Annual, or Lifetime ($19.99) with 3D workspace renderer, 4K/8K AI texture upscaling, universal format conversion, and multi-account access.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function PlansPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen bg-bg-page pt-16 sm:pt-20 pb-16"
      >
        <Suspense
          fallback={
            <div className="min-h-screen bg-bg-page flex items-center justify-center">
              <div className="w-10 h-10 border-3 border-lime border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <PlansContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
