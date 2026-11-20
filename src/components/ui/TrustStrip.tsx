"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CapabilityItem {
  icon: React.ReactNode;
  label: string;
  desc1: string;
  desc2: string;
  gradient: string;
  glow: string;
  borderColor: string;
}

const capabilityItems: CapabilityItem[] = [
  // 1. Core: Interactive 3D Workspace
  {
    icon: (
      <svg
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
    label: "Interactive 3D Workspace",
    desc1: "Real-time 3D inspection & wireframe view",
    desc2: "Full lighting, camera, and mesh controls",
    gradient: "from-indigo-500 via-purple-500 to-violet-600",
    glow: "rgba(124, 92, 255, 0.4)",
    borderColor: "hover:border-purple-500/40",
  },
  // 2. Core: Universal Format Converter
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
        <polyline points="8 16 12 12 16 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
      </svg>
    ),
    label: "Universal Format Converter",
    desc1: "Cross-format conversion across GLB, OBJ & FBX",
    desc2: "Export directly to 3D-printable STL & 3MF",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    glow: "rgba(16, 185, 129, 0.4)",
    borderColor: "hover:border-emerald-500/40",
  },
  // 3. Core: 4K & 8K PBR Texture Upscaler
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m10 15 5-3-5-3v6Z" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
      </svg>
    ),
    label: "4K & 8K PBR Texture Upscaler",
    desc1: "AI-enhanced clarity up to ultra-sharp 8K",
    desc2: "Albedo, normal, and roughness map support",
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    glow: "rgba(244, 63, 94, 0.4)",
    borderColor: "hover:border-pink-500/40",
  },
  // 4. Core: Meshy & Tripo3D Exports
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m8 17 4 4 4-4" />
      </svg>
    ),
    label: "Meshy & Tripo3D Exports",
    desc1: "Streamlined bridge to AI model generators",
    desc2: "Export generated geometry with texture maps",
    gradient: "from-amber-400 via-orange-500 to-yellow-500",
    glow: "rgba(245, 158, 11, 0.4)",
    borderColor: "hover:border-amber-500/40",
  },
  // 5. Meshy AI Workspace Model Exporter
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <polyline points="12 11 12 17" />
        <polyline points="9 14 12 17 15 14" />
      </svg>
    ),
    label: "Meshy AI Workspace Exporter",
    desc1: "Direct model extraction from your workspace",
    desc2: "Quick multi-asset exports in native format",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    glow: "rgba(99, 102, 241, 0.4)",
    borderColor: "hover:border-indigo-500/40",
  },
  // 6. Meshy AI Community Discover Model Exporter
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    label: "Meshy AI Discover Exporter",
    desc1: "Download featured community 3D creations",
    desc2: "Instant access to public showcase assets",
    gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
    glow: "rgba(217, 70, 239, 0.4)",
    borderColor: "hover:border-fuchsia-500/40",
  },
  // 7. Tripo3D Studio Models Exporter
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    label: "Tripo3D Studio Models Exporter",
    desc1: "Native export support for Tripo3D assets",
    desc2: "Preserve clean topology and UV coordinates",
    gradient: "from-teal-400 via-cyan-500 to-blue-500",
    glow: "rgba(6, 182, 212, 0.4)",
    borderColor: "hover:border-cyan-500/40",
  },
  // 8. 3D Renderer
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "3D Renderer & Viewport",
    desc1: "Studio-grade real-time material rendering",
    desc2: "PBR environment lighting & shader passes",
    gradient: "from-lime via-emerald-500 to-teal-500",
    glow: "rgba(197, 249, 85, 0.4)",
    borderColor: "hover:border-lime/40",
  },
  // 9. 4K & 8K Upscaler
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3h6v6" />
        <path d="M9 21H3v-6" />
        <path d="M21 3l-7 7" />
        <path d="M3 21l7-7" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    label: "4K & 8K Super-Resolution",
    desc1: "High-fidelity texture upscaling engine",
    desc2: "Refine surface details for cinematic renders",
    gradient: "from-rose-500 via-red-500 to-amber-500",
    glow: "rgba(244, 63, 94, 0.4)",
    borderColor: "hover:border-rose-500/40",
  },
  // 10. Texture Exporter (PNG / PBR maps)
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    label: "Texture Exporter (PNG / PBR)",
    desc1: "Extract diffuse, normal, and roughness maps",
    desc2: "Export isolated or bundled lossless PNGs",
    gradient: "from-cyan-400 via-sky-500 to-indigo-500",
    glow: "rgba(56, 189, 248, 0.4)",
    borderColor: "hover:border-sky-500/40",
  },
  // 11. Multi-Account Attachment
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    label: "Multi-Account Attachment",
    desc1: "Link multiple Meshy creator accounts",
    desc2: "Manage assets in one consolidated hub",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    glow: "rgba(168, 85, 247, 0.4)",
    borderColor: "hover:border-purple-500/40",
  },
];

export default function TrustStrip() {
  const ref = useScrollReveal<HTMLDivElement>();

  // Duplicate the array to ensure continuous, seamless infinite horizontal scrolling
  const marqueeItems = [...capabilityItems, ...capabilityItems];

  return (
    <section className="py-6 sm:py-8 border-y border-border-subtle bg-bg-card relative overflow-hidden">
      {/* Ambient decorative backdrop glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-48 w-96 rounded-full bg-lime/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-48 w-96 rounded-full bg-pink/5 blur-3xl"
      />

      {/* Smooth left and right edge gradient fade masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-bg-card via-bg-card/90 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-bg-card via-bg-card/90 to-transparent z-10"
      />

      {/* Marquee viewport with ample vertical padding so lifted cards are never clipped */}
      <div
        ref={ref}
        className="reveal relative w-full overflow-hidden py-3 sm:py-4"
      >
        {/* Infinite Marquee Track: slowed down for comfortable reading, hover pauses */}
        <div className="flex w-max items-center gap-4 sm:gap-5 animate-marquee-left-slow hover:[animation-play-state:paused] motion-reduce:animate-none py-2">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className={`group relative flex items-center gap-3.5 p-4 rounded-2xl bg-bg-page/85 border border-border-subtle/90 ${item.borderColor} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl w-[320px] sm:w-[360px] md:w-[370px] flex-shrink-0 select-none overflow-hidden backdrop-blur-sm`}
            >
              {/* Colored ambient glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl pointer-events-none`}
                style={{ filter: "blur(20px)" }}
              />

              <div className="relative z-10 flex items-center gap-3.5 min-w-0 w-full">
                {/* Vivid Gradient Icon Container */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg border border-white/15 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[14.5px] sm:text-[15px] font-bold text-white tracking-tight leading-snug truncate">
                    {item.label}
                  </span>
                  <span className="text-[12.5px] text-zinc-200 font-medium leading-snug mt-0.5 truncate">
                    {item.desc1}
                  </span>
                  <span className="text-[12px] text-zinc-400 font-medium leading-snug truncate">
                    {item.desc2}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
