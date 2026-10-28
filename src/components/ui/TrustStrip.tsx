"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const items = [
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
    sub: "Real-time rendering & preview",
    gradient: "from-indigo-500 via-purple-500 to-violet-600",
    glow: "rgba(124, 92, 255, 0.4)",
    borderColor: "hover:border-purple-500/40",
  },
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
    sub: "GLB • OBJ • FBX • STL • 3MF",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    glow: "rgba(16, 185, 129, 0.4)",
    borderColor: "hover:border-emerald-500/40",
  },
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
    sub: "Albedo, Normal & Roughness",
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    glow: "rgba(244, 63, 94, 0.4)",
    borderColor: "hover:border-pink-500/40",
  },
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
    sub: "Workspace & Community assets",
    gradient: "from-amber-400 via-orange-500 to-yellow-500",
    glow: "rgba(245, 158, 11, 0.4)",
    borderColor: "hover:border-amber-500/40",
  },
];

export default function TrustStrip() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-10 border-y border-border-subtle bg-bg-card relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6">
        <div
          ref={ref}
          className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {items.map((item) => (
            <div
              key={item.label}
              className={`group relative flex items-center gap-3.5 p-4 rounded-2xl bg-bg-page/60 border border-border-subtle/80 ${item.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden`}
            >
              {/* Colored ambient glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl pointer-events-none`}
                style={{ filter: "blur(20px)" }}
              />

              <div className="relative z-10 flex items-center gap-3.5 min-w-0">
                {/* Vivid Gradient Icon Container */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg border border-white/15 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="w-5 h-5">{item.icon}</div>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-text-primary leading-snug truncate">
                    {item.label}
                  </span>
                  <span className="text-xs text-text-secondary font-medium truncate">
                    {item.sub}
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
