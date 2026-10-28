"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const enhancedSteps = [
  {
    num: "1",
    title: "Import or Connect",
    desc: "Bring your existing 3D files into the workspace, or open MeshyGrab on Meshy AI and Tripo3D with one click.",
    gradient: "from-indigo-500 via-purple-500 to-violet-600",
    glow: "rgba(124, 92, 255, 0.4)",
    borderColor: "group-hover:border-purple-500/50",
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Inspect & Render",
    desc: "Preview models in real time with interactive lighting, wireframe mode, shader analysis, and polygon metrics.",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    glow: "rgba(16, 185, 129, 0.4)",
    borderColor: "group-hover:border-emerald-500/50",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Convert & Upscale",
    desc: "Convert formats between GLB, OBJ, FBX, STL, and 3MF, and upscale PBR textures to crisp 4K or 8K resolution.",
    gradient: "from-pink-500 via-rose-500 to-amber-500",
    glow: "rgba(244, 63, 94, 0.4)",
    borderColor: "group-hover:border-pink-500/50",
    badgeColor: "text-pink bg-pink/10 border-pink/30",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
      </svg>
    ),
  },
  {
    num: "4",
    title: "Export Clean Files",
    desc: "Download production-ready 3D geometry and crisp PNG texture maps ready for Unreal, Unity, Blender, or 3D slicers.",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    glow: "rgba(6, 182, 212, 0.4)",
    borderColor: "group-hover:border-cyan-500/50",
    badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

export default function StepsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="how-it-works"
      className="section-padding bg-bg-page relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-radial-lime opacity-5 pointer-events-none blur-3xl" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div ref={headerRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-lime/10 border border-lime/30 rounded-full text-xs font-bold text-lime mb-4 uppercase tracking-wider shadow-[0_0_15px_rgba(197,249,85,0.15)]">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight mb-4 text-text-primary">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            From raw 3D assets to production-ready GLB, OBJ, FBX, STL, 3MF and
            4K/8K textures in four streamlined steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {enhancedSteps.map((step, i) => (
            <StepCard key={step.num} step={step} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  delay,
}: {
  step: (typeof enhancedSteps)[0];
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal h-full"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`group h-full relative text-left p-6 sm:p-7 bg-bg-card border border-border-subtle rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl ${step.borderColor} overflow-hidden`}
      >
        {/* Glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl pointer-events-none`}
          style={{ boxShadow: `0 0 30px ${step.glow}` }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Header: Colored Icon & Step Counter */}
            <div className="flex items-center justify-between mb-6">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg border border-white/10 group-hover:scale-110 transition-transform duration-300`}
              >
                {step.icon}
              </div>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted">
                Step 0{step.num}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2.5 text-text-primary group-hover:text-text-primary transition-colors">
              {step.title}
            </h3>

            <p className="text-[0.9375rem] text-text-secondary leading-relaxed">
              {step.desc}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-border-subtle/50 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">
              Ready in browser
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
