"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { checks_privacy as checks } from "@/constants/constants";

export default function PrivacySection() {
  const visualRef = useScrollReveal<HTMLDivElement>();
  const textRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="privacy-section"
      className="section-padding bg-gradient-to-b from-bg-elevated to-bg-page"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            ref={visualRef}
            className="reveal relative h-[300px] lg:h-[400px] flex items-center justify-center order-first lg:order-none"
          >
            <div className="w-[200px] h-[200px] animate-float-slow">
              <svg
                className="w-full h-full text-lime drop-shadow-[0_0_30px_rgba(197,249,85,0.2)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>

          <div ref={textRef} className="reveal">
            <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
              Your models stay yours.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mt-4">
              We believe in being honest about what data is used and why.
              MeshyGrab is designed with privacy in mind.
            </p>
            <div className="mt-8 flex flex-col gap-3.5">
              {checks.map((c) => (
                <div
                  key={c}
                  className="flex items-start gap-3 text-[0.9375rem] text-text-secondary leading-relaxed"
                >
                  <svg
                    className="w-5 h-5 text-lime flex-shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {c}
                </div>
              ))}
            </div>
            <Link href="/privacy-policy" className="btn btn-secondary mt-8">
              Read our Privacy Policy
              <svg
                className="w-4 h-4"
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
          </div>
        </div>
      </div>
    </section>
  );
}
