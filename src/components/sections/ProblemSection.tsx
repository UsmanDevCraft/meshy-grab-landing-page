"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const frictionCards = [
  {
    num: "01",
    tag: "Asset Origin",
    title: "Raw 2K GLB",
    desc: "Acquired or generated as raw 2K GLB files with restricted options.",
    gradient: "from-indigo-500 via-purple-500 to-violet-600",
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    hoverBorder: "hover:border-indigo-500/40",
    glow: "rgba(124, 92, 255, 0.2)",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    num: "02",
    tag: "Incompatible",
    title: "Format Barriers",
    desc: "Incompatible with Unreal, Unity, Blender, or 3D printer slicers.",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    hoverBorder: "hover:border-amber-500/40",
    glow: "rgba(245, 158, 11, 0.2)",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    num: "03",
    tag: "Resolution",
    title: "Low-Res Textures",
    desc: "Textures blur and lose fidelity at 2K resolution in camera view.",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    badgeColor: "text-pink bg-pink/10 border-pink/30",
    hoverBorder: "hover:border-pink-500/40",
    glow: "rgba(244, 63, 94, 0.2)",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    num: "04",
    tag: "Fragmentation",
    title: "Tool Juggling",
    desc: "Disconnected third-party converters, scripts, and export limits.",
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    hoverBorder: "hover:border-cyan-500/40",
    glow: "rgba(6, 182, 212, 0.2)",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    num: "05",
    tag: "The Solution",
    title: "One Workspace",
    desc: "MeshyGrab solves inspection, conversion, 8K & exports in 1 app.",
    gradient: "from-lime via-emerald-400 to-teal-400",
    badgeColor: "text-lime bg-lime/15 border-lime/40",
    hoverBorder: "hover:border-lime/50",
    glow: "rgba(197, 249, 85, 0.3)",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const beforeAfterRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="problem"
      className="section-padding bg-bg-elevated border-b border-border-subtle"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div
          ref={textRef}
          className="reveal max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-pink/15 via-purple-500/15 to-lime/15 border border-pink/30 rounded-full text-xs font-semibold text-text-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
            The Problem &amp; The Solution
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight mb-6">
            Fragmented 3D Workflows Slow Creators Down.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Generating or finding a 3D asset is only the first step. Artists and
            developers waste hours juggling standalone converters, wrestling
            with low-res 2K textures, and handling restricted platform exports.
            MeshyGrab unites 3D model viewing, format conversion, 4K/8K PBR
            upscaling, and direct exports into one clean browser workspace.
          </p>
        </div>

        {/* Friction list: 5 colorful dynamic cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 mb-20">
          {frictionCards.map((card) => (
            <div
              key={card.num}
              className={`group relative p-4 bg-bg-card border border-border-subtle rounded-2xl flex flex-col items-center text-center gap-2.5 transition-all duration-300 hover:-translate-y-1.5 ${card.hoverBorder} overflow-hidden shadow-lg`}
            >
              {/* Colored ambient glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none blur-xl`}
              />

              <div className="relative z-10 flex items-center justify-between w-full px-0.5">
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${card.badgeColor}`}
                >
                  {card.tag}
                </span>
                <span className="text-xs font-mono font-bold text-text-muted">
                  {card.num}
                </span>
              </div>

              {/* Gradient Icon Badge */}
              <div
                className={`relative z-10 w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-md border border-white/15 group-hover:scale-110 transition-transform duration-300`}
              >
                {card.icon}
              </div>

              <div className="relative z-10 flex flex-col gap-1">
                <h4 className="text-sm font-bold text-text-primary leading-tight">
                  {card.title}
                </h4>
                <p className="text-xs text-text-secondary leading-snug font-medium">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BEFORE / AFTER VISUAL COMPARISON */}
        <div ref={beforeAfterRef} className="reveal max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Workflow Comparison</h3>
            <p className="text-sm text-text-muted">
              Stop juggling disjointed tools. Handle your complete 3D asset
              pipeline in MeshyGrab.
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
                Fragmented Process
              </h4>
              <div className="flex flex-col gap-3 font-mono text-xs text-text-secondary">
                <div className="p-2.5 bg-bg-page/60 rounded-lg border border-border-subtle flex items-center gap-2">
                  <span className="text-pink font-bold">1.</span> Generate or
                  find model in 2K GLB
                </div>
                <div className="text-center text-text-muted text-xs">
                  &darr;
                </div>
                <div className="p-2.5 bg-pink/10 border border-pink/30 rounded-lg text-pink flex items-center gap-2">
                  <span>2.</span> Incompatible with Unreal/Unity or 3D Slicers
                </div>
                <div className="text-center text-text-muted text-xs">
                  &darr;
                </div>
                <div className="p-2.5 bg-pink/10 border border-pink/30 rounded-lg text-pink flex items-center gap-2">
                  <span>3.</span> Textures blur at 2K resolution in camera view
                </div>
                <div className="text-center text-text-muted text-xs">
                  &darr;
                </div>
                <div className="p-2.5 bg-pink/10 border border-pink/30 rounded-lg text-pink font-semibold flex items-center gap-2">
                  <span>4.</span> Juggling 3 different tools to convert &amp;
                  export
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
                All-in-One 3D Toolkit
              </h4>
              <div className="flex flex-col gap-2.5 font-mono text-xs text-text-secondary">
                <div className="p-2 bg-bg-page/60 rounded-lg border border-border-subtle flex items-center gap-2">
                  <span className="text-lime font-bold">1.</span> Inspect in 3D
                  Workspace with real-time lighting
                </div>
                <div className="text-center text-lime text-xs">&darr;</div>
                <div className="p-2 bg-bg-page/60 rounded-lg border border-border-subtle flex items-center gap-2">
                  <span className="text-lime font-bold">2.</span> Convert
                  between GLB, OBJ, FBX, STL &amp; 3MF
                </div>
                <div className="text-center text-lime text-xs">&darr;</div>
                <div className="p-2 bg-bg-page/60 rounded-lg border border-border-subtle flex items-center gap-2">
                  <span className="text-lime font-bold">3.</span> Upscale PBR
                  textures to ultra-sharp 4K or 8K
                </div>
                <div className="text-center text-lime text-xs">&darr;</div>
                <div className="p-2.5 bg-lime/10 border border-lime/40 rounded-lg text-lime font-bold flex items-center gap-2">
                  <span>4.</span> Export clean assets &amp; PNG texture maps
                  instantly
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-text-muted mt-5">
            Designed for 3D artists, game developers, 3D printing enthusiasts,
            and indie studios.
          </p>
        </div>
      </div>
    </section>
  );
}
