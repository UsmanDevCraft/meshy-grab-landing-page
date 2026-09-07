import type { Metadata } from "next";
import Footer from "@/components/ui/Footer";
import PlansContent from "@/components/sections/PlansContent";

export const metadata: Metadata = {
  title: "Plans & Pricing — MeshyGrab",
  description:
    "Explore MeshyGrab pricing plans. Start free with 2 downloads, or upgrade to Pro, Pro Annual, or Lifetime access for unlimited 3D model downloads.",
  openGraph: {
    title: "Plans & Pricing — MeshyGrab",
    description:
      "Explore MeshyGrab pricing plans. Start free with 2 downloads, or upgrade to Pro, Pro Annual, or Lifetime access for unlimited 3D model downloads.",
  },
};

export default function PlansPage() {
  return (
    <>
      <main id="main-content" className="min-h-screen bg-bg-page">
        <PlansContent />
      </main>
      <Footer />
    </>
  );
}
