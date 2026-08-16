import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import OpenExtensionButton from "@/components/ui/OpenExtensionButton";

export const metadata: Metadata = {
  title: "You are Pro — MeshyGrab",
  description: "Your MeshyGrab Pro subscription is active.",
};

export default function ThanksPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen flex items-center justify-center pt-24 pb-16"
      >
        <div className="container mx-auto max-w-xl px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-lime/10 border-2 border-lime/30 flex items-center justify-center animate-pulse-glow">
            <svg
              className="w-12 h-12 text-lime"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            You are officially Pro.
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-10">
            Your MeshyGrab Pro subscription is active. Unlimited downloads are
            now available for your account.
          </p>

          <div className="flex flex-col gap-3 max-w-sm mx-auto mb-10">
            <div className="flex items-center gap-3 px-4 py-3 bg-bg-card border border-border-subtle rounded-xl text-text-secondary text-[0.9375rem]">
              <svg
                className="w-5 h-5 text-lime flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Pro subscription active
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-bg-card border border-border-subtle rounded-xl text-text-secondary text-[0.9375rem]">
              <svg
                className="w-5 h-5 text-lime flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Unlimited downloads
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-bg-card border border-border-subtle rounded-xl text-text-secondary text-[0.9375rem]">
              <svg
                className="w-5 h-5 text-lime flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Ready to use MeshyGrab
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <OpenExtensionButton />
            <Link href="/" className="btn btn-secondary">
              Back to MeshyGrab
            </Link>
          </div>
        </div>
      </main>
      <Footer minimal />
    </>
  );
}
