"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";

const pillars = [
  {
    id: "viewer",
    tag: "Online 3D Workspace",
    title: "3D Workspace & Model Viewer",
    desc: "Inspect, rotate, and render 3D models with real-time materials, lighting controls, wireframe analysis, and polygon metrics directly in your browser.",
    formats: ["GLB", "OBJ", "FBX", "STL", "3MF"],
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    badgeColor: "text-lime bg-lime/10 border-lime/30",
    href: "#viewer",
  },
  {
    id: "converter",
    tag: "Cross-Platform Pipeline",
    title: "Universal 3D Model Converter",
    desc: "Import supported 3D model files from any source and seamlessly convert between GLB, OBJ, FBX, STL, and 3MF formats for game engines, DCC apps, or 3D slicers.",
    formats: ["GLB to OBJ", "FBX to GLB", "OBJ to STL", "3MF"],
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
        <polyline points="8 16 12 12 16 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
      </svg>
    ),
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    href: "#converter",
  },
  {
    id: "upscaler",
    tag: "Neural Material Enhancement",
    title: "4K & 8K PBR Texture Upscaler",
    desc: "Transform standard 2K textures into crystal-clear 4K and 8K resolution. AI-enhanced detail sharpening preserves normal maps, roughness, metallic, and displacement.",
    formats: ["Base Color", "Normal", "Roughness", "Metallic", "Height"],
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m10 15 5-3-5-3v6Z" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
      </svg>
    ),
    badgeColor: "text-pink bg-pink/10 border-pink/30",
    href: "#upscaler",
  },
  {
    id: "meshy-export",
    tag: "Direct Meshy AI Integration",
    title: "Meshy AI Workspace Exports",
    desc: "Instantly preview and export the 3D models you generate in your Meshy workspace in all supported formats (GLB, OBJ, FBX, STL, 3MF) with zero API tokens required.",
    formats: ["Full Geometry", "Texture Maps", "Instant Download"],
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    badgeColor: "text-lime bg-lime/10 border-lime/30",
    href: "#integrations",
  },
  {
    id: "community-downloads",
    tag: "Meshy & Tripo3D",
    title: "Community Model Downloads",
    desc: "Discover and download assets from the Meshy Discover community and Tripo3D Studio, with automated format conversion ready for your creative projects.",
    formats: ["Meshy Discover", "Tripo3D Studio", "Converted Exports"],
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    href: "#integrations",
  },
  {
    id: "texture-extraction",
    tag: "Separate PNG Maps",
    title: "PBR Texture Extraction",
    desc: "Download individual PNG material channels separately from 3D meshes. Connect seamlessly into Blender shader nodes, Unreal Engine materials, or Unity URP/HDRP.",
    formats: ["Albedo", "Normal", "Roughness", "Metallic", "AO"],
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    href: "#textures",
  },
];

export default function ToolsOverviewSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="tools"
      className="section-padding bg-bg-page border-b border-border-subtle relative overflow-hidden"
    >
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-radial-lime opacity-10 pointer-events-none blur-3xl" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div ref={headerRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-lime/10 border border-lime/30 rounded-full text-xs font-bold text-lime mb-4 uppercase tracking-wider">
            Complete 3D Toolset
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight mb-4">
            Six Powerful Tools. One Seamless Platform.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            MeshyGrab unites viewing, conversion, AI texture upscaling, and
            model exports into a unified creator workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <PillarCard key={pillar.id} pillar={pillar} delay={idx * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  delay,
}: {
  pillar: (typeof pillars)[0];
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal h-full"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-full p-7 bg-bg-card border border-border-subtle rounded-3xl flex flex-col justify-between transition-all duration-300 hover:border-lime/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_25px_rgba(197,249,85,0.1)] hover:-translate-y-1.5 group">
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-bg-elevated border border-border-subtle flex items-center justify-center text-lime group-hover:bg-lime group-hover:text-deep-black transition-all duration-300 shadow-inner">
              {pillar.icon}
            </div>
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${pillar.badgeColor}`}
            >
              {pillar.tag}
            </span>
          </div>

          <h3 className="text-xl font-bold text-text-primary mb-2.5 group-hover:text-lime transition-colors">
            {pillar.title}
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed mb-5">
            {pillar.desc}
          </p>
        </div>

        <div>
          <div className="pt-4 border-t border-border-subtle/60 flex flex-wrap gap-1.5 mb-4">
            {pillar.formats.map((fmt) => (
              <span
                key={fmt}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-elevated text-text-muted border border-border-subtle/50"
              >
                {fmt}
              </span>
            ))}
          </div>

          <Link
            href={pillar.href}
            className="text-xs font-bold text-lime inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
          >
            Explore capability
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
