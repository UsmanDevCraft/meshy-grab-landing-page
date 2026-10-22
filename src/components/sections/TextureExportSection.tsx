"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const channels = [
  {
    name: "Base Color / Albedo",
    tag: "Color Channel",
    desc: "Unlit true surface color map without baked lighting or directional shadows, ready for PBR material inputs.",
    badge: "Diffuse",
  },
  {
    name: "Tangent Normal Map",
    tag: "Surface Micro-Detail",
    desc: "RGB tangent-space normal vectors simulating intricate surface relief, bevels, cloth weaves, and sculpt details.",
    badge: "Normals",
  },
  {
    name: "Roughness & Metallic",
    tag: "Reflectance Masks",
    desc: "Precise grayscale maps that dictate mirror-sharp reflection versus rough micro-facets, as well as conductor versus dielectric properties.",
    badge: "Material",
  },
  {
    name: "Ambient Occlusion (AO)",
    tag: "Cavity Shadows",
    desc: "Pre-computed contact shadows and crevice darkening that add three-dimensional depth and volumetric weight.",
    badge: "Occlusion",
  },
];

export default function TextureExportSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const cardRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="textures"
      className="section-padding bg-bg-elevated border-b border-border-subtle relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Map Representation */}
          <div
            ref={cardRef}
            className="reveal lg:col-span-6 order-last lg:order-first"
          >
            <div className="bg-bg-card border border-border-subtle rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-subtle">
                <div>
                  <h4 className="text-base font-bold text-text-primary">
                    Separate PBR Texture Channels
                  </h4>
                  <p className="text-xs text-text-muted">
                    Exported as lossless 8-bit / 16-bit PNG files
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-lime bg-lime/10 border border-lime/30 px-2.5 py-1 rounded-full">
                  Lossless PNG
                </span>
              </div>

              {/* Grid of Texture Channel Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                {channels.map((ch) => (
                  <div
                    key={ch.name}
                    className="p-4 rounded-2xl bg-bg-page border border-border-subtle/80 hover:border-lime/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-lime uppercase tracking-wider">
                        {ch.badge}
                      </span>
                      <span className="text-[10px] text-text-muted font-mono">
                        .PNG
                      </span>
                    </div>
                    <span className="text-xs font-bold text-text-primary block mb-1">
                      {ch.name}
                    </span>
                    <p className="text-[11px] text-text-secondary leading-snug">
                      {ch.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Connected Pipeline Callout */}
              <div className="p-3.5 rounded-xl bg-lime/5 border border-lime/20 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-lime font-bold">
                  <span>⚡</span>
                  <span>Direct Integration with 4K/8K Upscaler</span>
                </div>
                <span className="text-[11px] text-text-muted font-mono">
                  One-Click Export
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div ref={textRef} className="reveal lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-xs font-bold text-cyan-400 mb-4 uppercase tracking-wider">
              Pillar 06 — Texture Extraction
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] mb-5 text-text-primary">
              PBR Texture Extraction &amp; PNG Exports
            </h2>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
              Don’t let your materials remain locked inside monolithic model
              files. MeshyGrab extracts each distinct PBR texture map into
              clean, individual PNG files for complete shader control.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-lime/10 text-lime flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">
                    Plug Directly Into DCC Shaders
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Drop individual maps straight into the Principled BSDF in
                    Blender, Autodesk Maya Arnold, or 3ds Max V-Ray without
                    manual unpacking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-lime/10 text-lime flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">
                    Game Engine Channel Packing Ready
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Prepare textures for Unreal Engine 5 (ORM packing:
                    Occlusion, Roughness, Metallic) or Unity URP/HDRP mask maps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-lime/10 text-lime flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">
                    Upscale Before Export
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Combine texture extraction with the 4K/8K PBR Texture
                    Upscaler to get ultra-high-definition material maps in
                    lossless PNG format.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="font-mono text-lime font-bold">
                8 Free Texture PNGs
              </span>
              <span>•</span>
              <span className="font-mono text-lime font-bold">
                Unlimited with Pro
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
