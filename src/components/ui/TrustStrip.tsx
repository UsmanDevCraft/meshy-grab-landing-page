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
  },
];

export default function TrustStrip() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-10 border-y border-border-subtle bg-bg-card">
      <div className="container mx-auto max-w-6xl px-6">
        <div
          ref={ref}
          className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-bg-page/40 border border-border-subtle/60 hover:border-lime/30 transition-colors"
            >
              <div className="w-11 h-11 bg-lime/10 text-lime border border-lime/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(197,249,85,0.1)]">
                <div className="w-5 h-5">{item.icon}</div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-primary leading-snug">
                  {item.label}
                </span>
                <span className="text-xs text-text-muted font-medium">
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
