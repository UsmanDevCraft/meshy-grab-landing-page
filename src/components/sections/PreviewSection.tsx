"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { checks } from "@/constants/constants";

export default function PreviewSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const visualRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="preview"
      className="section-padding bg-bg-elevated overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="reveal max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime mb-4">
              Extension Preview
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
              A clean, focused extension UI
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mt-4">
              MeshyGrab opens right alongside your Meshy workspace. Confirm your
              model preview, verify the GLB file status, and download in a
              single click.
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
          </div>

          {/* Chrome Extension Popup Mockup */}
          <div
            ref={visualRef}
            className="reveal flex justify-center order-first lg:order-last"
          >
            <div className="w-full max-w-[360px] bg-bg-card border border-border-subtle rounded-[24px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(197,249,85,0.12)]">
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-subtle bg-bg-page/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-lime text-deep-black rounded-md flex items-center justify-center font-bold text-xs">
                    M
                  </div>
                  <span className="text-sm font-bold text-text-primary">
                    MeshyGrab
                  </span>
                </div>
                <span className="text-[11px] font-medium text-text-muted px-2 py-0.5 bg-lime/10 rounded text-lime">
                  v1.0 Chrome
                </span>
              </div>

              {/* Popup content */}
              <div className="p-6">
                {/* 3D Model Preview box */}
                <div className="w-full h-44 bg-gradient-to-br from-lime/10 via-bg-page to-pink/10 border border-lime/25 rounded-2xl flex flex-col items-center justify-center gap-3 mb-5 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,249,85,0.15),transparent_70%)]" />
                  <svg
                    className="w-12 h-12 text-lime drop-shadow-[0_0_15px_rgba(197,249,85,0.4)] animate-float"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <div className="text-center z-10">
                    <span className="text-xs font-semibold text-text-primary block">
                      Generated 3D Asset
                    </span>
                    <span className="text-[10px] text-text-muted">
                      Ready for preview
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6 bg-bg-page/60 p-3.5 rounded-xl border border-border-subtle text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Format</span>
                    <span className="text-lime font-bold font-mono px-2 py-0.5 bg-lime/10 rounded">
                      .GLB
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Status</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-lime/10 rounded text-xs font-semibold text-lime">
                      <span className="w-1.5 h-1.5 bg-lime rounded-full animate-pulse" />
                      Model Available
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Entitlement</span>
                    <span className="text-text-secondary font-medium">
                      2 Free Downloads
                    </span>
                  </div>
                </div>

                {/* Download Action Button */}
                <button className="w-full py-3.5 bg-lime text-deep-black hover:bg-lime/90 transition-colors rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(197,249,85,0.2)]">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download GLB File
                </button>

                <p className="text-center mt-3 text-[11px] text-text-muted">
                  Simple workflow. No complex setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
