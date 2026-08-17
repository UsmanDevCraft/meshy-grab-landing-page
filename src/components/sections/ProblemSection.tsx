"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { problems } from "@/constants/constants";

export default function ProblemSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const visualRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="problem" className="section-padding bg-bg-elevated">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="reveal">
            <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
              You already made the model. Getting the file should not be
              complicated.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl mt-4">
              Users generate amazing 3D models in Meshy, but accessing those
              files often requires technical knowledge that should not be
              necessary.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {problems.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-3 text-[0.9375rem] text-text-secondary"
                >
                  <svg
                    className="w-[18px] h-[18px] text-pink flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div
            ref={visualRef}
            className="reveal relative h-[300px] lg:h-[400px] flex items-center justify-center order-first lg:order-last"
          >
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 max-w-[320px] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-pink" />
                <span className="text-sm font-semibold text-text-primary">
                  API Request Failed
                </span>
              </div>
              <div className="text-xs text-text-muted leading-relaxed font-mono">
                Error 401: Unauthorized
                <br />
                Missing Bearer token
                <br />
                Endpoint: /v1/models/...
                <br />
                <span className="text-lime">&rarr;</span> Requires manual setup
              </div>
            </div>
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-pink opacity-30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
