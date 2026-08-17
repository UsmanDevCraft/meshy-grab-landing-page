"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const frictionSteps = [
  "1. User generates a 3D model in Meshy",
  "2. Generation succeeds and the model is ready",
  "3. User wants the resulting 3D asset file",
  "4. Download availability may be limited",
  "5. User needs a simpler way to get the model they created",
];

export default function ProblemSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const beforeAfterRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="problem" className="section-padding bg-bg-elevated">
      <div className="container mx-auto max-w-6xl px-6">
        <div
          ref={textRef}
          className="reveal max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink/10 border border-pink/20 rounded-full text-xs font-semibold text-pink mb-4">
            The Problem & Solution
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight mb-6">
            You already made the model. Getting the file shouldn&apos;t be the
            hard part.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Meshy makes it easy to generate 3D models. But once your model is
            ready, downloading the actual asset can be limited. MeshyGrab
            focuses on that final step—helping you preview and download the
            model you&apos;ve already created as a GLB file.
          </p>
        </div>

        {/* Friction list */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-20">
          {frictionSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 bg-bg-card border border-border-subtle rounded-xl text-center flex flex-col justify-center items-center gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-lime/10 text-lime text-xs font-bold flex items-center justify-center font-mono">
                0{idx + 1}
              </div>
              <p className="text-xs text-text-secondary leading-snug font-medium">
                {step.substring(3)}
              </p>
            </div>
          ))}
        </div>

        {/* BEFORE / AFTER VISUAL COMPARISON */}
        <div ref={beforeAfterRef} className="reveal max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Workflow Comparison</h3>
            <p className="text-sm text-text-muted">
              Meshy handles model generation. MeshyGrab streamlines the download
              access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* BEFORE CARD */}
            <div className="bg-bg-card border border-pink/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-pink/20 text-pink text-xs font-bold rounded-bl-xl uppercase tracking-wider">
                Without MeshyGrab
              </div>
              <h4 className="text-lg font-bold text-pink mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Current Friction
              </h4>
              <div className="flex flex-col gap-3 font-mono text-xs text-text-secondary">
                <div className="p-2.5 bg-bg-page/60 rounded-lg border border-border-subtle flex items-center gap-2">
                  <span className="text-lime">1.</span> Generate a model in
                  Meshy
                </div>
                <div className="text-center text-text-muted text-xs">
                  &darr;
                </div>
                <div className="p-2.5 bg-bg-page/60 rounded-lg border border-border-subtle flex items-center gap-2">
                  <span className="text-lime">2.</span> Model succeeds
                </div>
                <div className="text-center text-text-muted text-xs">
                  &darr;
                </div>
                <div className="p-2.5 bg-pink/10 border border-pink/30 rounded-lg text-pink flex items-center gap-2">
                  <span>3.</span> Download availability is limited
                </div>
                <div className="text-center text-text-muted text-xs">
                  &darr;
                </div>
                <div className="p-2.5 bg-pink/10 border border-pink/30 rounded-lg text-pink font-semibold flex items-center gap-2">
                  <span>4.</span> Unnecessary workflow friction
                </div>
              </div>
            </div>

            {/* AFTER CARD */}
            <div className="bg-bg-card border border-lime/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(197,249,85,0.08)]">
              <div className="absolute top-0 right-0 px-3 py-1 bg-lime/20 text-lime text-xs font-bold rounded-bl-xl uppercase tracking-wider">
                With MeshyGrab
              </div>
              <h4 className="text-lg font-bold text-lime mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Simple Workflow
              </h4>
              <div className="flex flex-col gap-2.5 font-mono text-xs text-text-secondary">
                <div className="p-2 bg-bg-page/60 rounded-lg border border-border-subtle flex items-center gap-2">
                  <span className="text-lime font-bold">1.</span> Generate a
                  model
                </div>
                <div className="text-center text-lime text-xs">&darr;</div>
                <div className="p-2 bg-bg-page/60 rounded-lg border border-border-subtle flex items-center gap-2">
                  <span className="text-lime font-bold">2.</span> Open your
                  model
                </div>
                <div className="text-center text-lime text-xs">&darr;</div>
                <div className="p-2 bg-bg-page/60 rounded-lg border border-border-subtle flex items-center gap-2">
                  <span className="text-lime font-bold">3.</span> Open MeshyGrab
                </div>
                <div className="text-center text-lime text-xs">&darr;</div>
                <div className="p-2 bg-bg-page/60 rounded-lg border border-border-subtle flex items-center gap-2">
                  <span className="text-lime font-bold">4.</span> Preview model
                </div>
                <div className="text-center text-lime text-xs">&darr;</div>
                <div className="p-2.5 bg-lime/10 border border-lime/40 rounded-lg text-lime font-bold flex items-center gap-2">
                  <span>5.</span> Download GLB instantly
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-text-muted mt-4">
            MeshyGrab does not modify model generation. It solely optimizes your
            download access.
          </p>
        </div>
      </div>
    </section>
  );
}
