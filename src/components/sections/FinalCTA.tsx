"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function FinalCTA() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden py-32 bg-bg-page border-t border-border-subtle">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial-lime animate-pulse-glow" />
      </div>

      <div className="container mx-auto max-w-3xl px-6 relative z-10">
        <div ref={ref} className="reveal text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-5">
            You made the model.
            <br />
            <span className="text-lime">Grab the file.</span>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
            Preview and download your generated Meshy models with MeshyGrab.
          </p>
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/#pricing"
              className="btn btn-primary !px-9 !py-4 !text-base shadow-[0_0_30px_rgba(197,249,85,0.25)]"
            >
              Get MeshyGrab
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-xs text-text-muted font-medium">
              2 free downloads. Pro for $0.99/month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
