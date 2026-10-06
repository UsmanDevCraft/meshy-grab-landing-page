import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PlansContent from "@/components/sections/PlansContent";

const isDiscounted = process.env.NEXT_PUBLIC_IS_DISCOUNTED_PRICES === "true";

export const metadata: Metadata = {
  title: isDiscounted
    ? "Fall Sale: Plans & Pricing — MeshyGrab"
    : "Plans & Pricing — MeshyGrab",
  description: isDiscounted
    ? "Explore MeshyGrab pricing plans. Limited Time Fall Sale: Pro Max ($2.99/mo), Pro Annual ($5.99/yr), or Lifetime ($9.99) for up to 67% OFF!"
    : "Explore MeshyGrab pricing plans. Start free or upgrade to Pro, Pro Max ($3.99/mo), Pro Annual, or Lifetime ($19.99) for unlimited 3D exports, Community model allowances, and multi-account access.",
  openGraph: {
    title: isDiscounted
      ? "Fall Sale: Plans & Pricing — MeshyGrab"
      : "Plans & Pricing — MeshyGrab",
    description: isDiscounted
      ? "Explore MeshyGrab pricing plans. Limited Time Fall Sale: Pro Max ($2.99/mo), Pro Annual ($5.99/yr), or Lifetime ($9.99) for up to 67% OFF!"
      : "Explore MeshyGrab pricing plans. Start free or upgrade to Pro, Pro Max ($3.99/mo), Pro Annual, or Lifetime ($19.99) for unlimited 3D exports, Community model allowances, and multi-account access.",
  },
};

export default function PlansPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-bg-page pt-16 sm:pt-20 pb-16">
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
