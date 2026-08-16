"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const checks = [
  "Model preview before download",
  "GLB format confirmation",
  "Download entitlement tracking",
];

export default function PreviewSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const visualRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="preview"
      className="section-padding bg-bg-elevated overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div ref={textRef} className="reveal max-w-lg">
            <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
              A clean, focused interface
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mt-4">
              MeshyGrab opens as a simple browser extension popup. See your
              model, check the format, and download — all in one place.
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

          <div
            ref={visualRef}
            className="reveal flex justify-center order-first lg:order-last"
          >
            <div className="w-full max-w-[360px] bg-bg-card border border-border-subtle rounded-[20px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(197,249,85,0.15)]">
              <div className="flex items-center gap-2 px-4 py-4 border-b border-border-subtle">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
                <span className="ml-auto text-xs font-semibold text-text-muted">
                  MeshyGrab
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center">
                    <svg
                      className="w-[18px] h-[18px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#181818"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="font-bold text-base">MeshyGrab</span>
                </div>

                <div className="w-full h-40 bg-gradient-to-br from-lime/10 to-pink/5 border border-dashed border-lime/30 rounded-xl flex flex-col items-center justify-center gap-2 mb-5">
                  <svg
                    className="w-10 h-10 text-lime opacity-70"
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
                  <span className="text-xs text-text-muted">
                    3D Model Preview
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4 text-[0.8125rem]">
                  <span className="text-text-muted">Format</span>
                  <span className="text-text-primary font-semibold">GLB</span>
                </div>

                <div className="flex justify-between items-center mb-4 text-[0.8125rem]">
                  <span className="text-text-muted">Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-lime/10 rounded-md text-xs font-semibold text-lime">
                    <span className="w-1.5 h-1.5 bg-lime rounded-full" />
                    Ready
                  </span>
                </div>

                <button className="w-full py-3 bg-lime text-deep-black rounded-xl font-bold text-sm text-center mt-4">
                  Download GLB
                </button>
                <p className="text-center mt-3 text-xs text-text-muted">
                  2 free downloads remaining
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
