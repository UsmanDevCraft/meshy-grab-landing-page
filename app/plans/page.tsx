import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PlansContent from "@/components/sections/PlansContent";

export const metadata: Metadata = {
  title: "Plans & Pricing — MeshyGrab",
  description:
    "Explore MeshyGrab pricing plans. Start free with 2 downloads, or upgrade to Pro, Pro Annual, or Lifetime access for unlimited 3D model downloads (GLB, OBJ, FBX, 3MF, STL & textures).",
  openGraph: {
    title: "Plans & Pricing — MeshyGrab",
    description:
      "Explore MeshyGrab pricing plans. Start free with 2 downloads, or upgrade to Pro, Pro Annual, or Lifetime access for unlimited 3D model downloads (GLB, OBJ, FBX, 3MF, STL & textures).",
  },
};

export default function PlansPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-bg-page pt-28 pb-20">
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
