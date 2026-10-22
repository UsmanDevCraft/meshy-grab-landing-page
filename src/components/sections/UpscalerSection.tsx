"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const textureMaps = [
  {
    id: "albedo",
    name: "Base Color / Albedo",
    desc: "Diffuse surface color without lighting artifacts, upscaled to eliminate pixel blur.",
    color: "from-amber-500/20 to-orange-500/20",
    accent: "text-amber-400",
  },
  {
    id: "normal",
    name: "Normal Map (Tangent)",
    desc: "Fine geometric micro-details, bevels, and micro-creases sharpened with neural vectors.",
    color: "from-blue-600/20 via-purple-600/20 to-pink/20",
    accent: "text-blue-400",
  },
  {
    id: "roughness",
    name: "Roughness Map",
    desc: "Micro-facet reflectance detail defining smooth specular highlights vs matte finishes.",
    color: "from-zinc-500/20 to-zinc-700/20",
    accent: "text-zinc-300",
  },
  {
    id: "metallic",
    name: "Metallic Map",
    desc: "Binary dielectric vs metallic classification map preserved cleanly at 4K & 8K.",
    color: "from-lime/20 to-emerald-500/20",
    accent: "text-lime",
  },
  {
    id: "ao",
    name: "Ambient Occlusion (AO)",
    desc: "Contact shadows and crevice shading enhanced for deep rendering contrast.",
    color: "from-neutral-800/40 to-black/60",
    accent: "text-neutral-400",
  },
];

const resolutions = [
  {
    level: "2K",
    label: "2048 × 2048",
    status: "Standard Source",
    detail:
      "Default generation output. Noticeable blur on close-up camera inspection.",
  },
  {
    level: "4K",
    label: "4096 × 4096",
    status: "4× Pixel Density",
    detail:
      "Recommended for modern PC/Console games (Unreal Engine 5, Unity HDRP, Blender).",
  },
  {
    level: "8K",
    label: "8192 × 8192",
    status: "16× Pixel Density",
    detail:
      "Cinematic hero assets, VFX close-ups, 3D product renders, and print marketing.",
  },
];

export default function UpscalerSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const visualRef = useScrollReveal<HTMLDivElement>();

  const [activeResolution, setActiveResolution] = useState<"2K" | "4K" | "8K">(
    "4K",
  );
  const [activeMap, setActiveMap] = useState("albedo");

  const currentMap =
    textureMaps.find((m) => m.id === activeMap) || textureMaps[0];

  return (
    <section
      id="upscaler"
      className="section-padding bg-bg-elevated border-b border-border-subtle relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-radial-pink opacity-10 pointer-events-none blur-3xl" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Feature Narrative */}
          <div ref={textRef} className="reveal lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink/10 border border-pink/30 rounded-full text-xs font-bold text-pink mb-4 uppercase tracking-wider">
              Pillar 03 — Texture Enhancement
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] mb-5 text-text-primary">
              AI PBR Texture Upscaler to 4K &amp; 8K
            </h2>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
              AI-generated 3D models typically ship with low-resolution 2K
              texture maps that blur upon close inspection. MeshyGrab introduces
              specialized neural texture upscaling that elevates your PBR
              materials to crisp 4K and 8K.
            </p>

            <div className="space-y-3 mb-8">
              <div className="p-3.5 bg-bg-card rounded-2xl border border-border-subtle flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-pink/10 text-pink flex items-center justify-center font-bold text-xs mt-0.5">
                  4K
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">
                    Production Game-Ready 4K
                  </h4>
                  <p className="text-xs text-text-secondary leading-snug">
                    4× pixel density perfect for Unreal Engine 5, Unity, and
                    real-time game assets with zero noticeable texture
                    stretching.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-bg-card rounded-2xl border border-border-subtle flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-pink/15 text-pink flex items-center justify-center font-bold text-xs mt-0.5">
                  8K
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">
                    Cinematic &amp; Hero Asset 8K
                  </h4>
                  <p className="text-xs text-text-secondary leading-snug">
                    16× pixel density for hero characters, architectural
                    visualization, macro renders, and high-DPI product
                    showcases.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-pink"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Lossless PNG Output
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-pink"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Preserves Tangent Normals
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Resolution Inspector Widget */}
          <div ref={visualRef} className="reveal lg:col-span-7">
            <div className="bg-bg-card border border-border-subtle rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_50px_rgba(255,62,143,0.1)]">
              {/* Header */}
              <div className="px-6 py-4 bg-bg-page border-b border-border-subtle flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-primary">
                    PBR Material Inspector
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-pink/10 text-pink rounded-md">
                    Neural 4K/8K Engine
                  </span>
                </div>

                {/* Resolution selector */}
                <div className="flex bg-bg-card p-1 rounded-xl border border-border-subtle text-xs font-mono font-bold">
                  {(["2K", "4K", "8K"] as const).map((res) => (
                    <button
                      key={res}
                      onClick={() => setActiveResolution(res)}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        activeResolution === res
                          ? "bg-pink text-white shadow-[0_0_12px_rgba(255,62,143,0.4)]"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Texture Map Channel Tabs */}
              <div className="p-3 bg-bg-elevated border-b border-border-subtle flex gap-2 overflow-x-auto">
                {textureMaps.map((map) => (
                  <button
                    key={map.id}
                    onClick={() => setActiveMap(map.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                      activeMap === map.id
                        ? "bg-bg-card border-pink/40 text-text-primary shadow-sm"
                        : "bg-transparent border-transparent text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {map.name}
                  </button>
                ))}
              </div>

              {/* Interactive Visual Canvas */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-bg-page to-bg-card relative">
                <div className="aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl border border-border-subtle bg-bg-page relative overflow-hidden flex flex-col justify-between p-6">
                  {/* Visual Texture Simulation Canvas */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${currentMap.color} transition-all duration-500`}
                  />

                  {/* Resolution simulation grid */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                      activeResolution === "2K"
                        ? "opacity-60 backdrop-blur-[2px]"
                        : activeResolution === "4K"
                          ? "opacity-20"
                          : "opacity-5"
                    }`}
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                      backgroundSize:
                        activeResolution === "2K"
                          ? "18px 18px"
                          : activeResolution === "4K"
                            ? "9px 9px"
                            : "4px 4px",
                    }}
                  />

                  {/* Top Bar Details */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className={`text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-bg-card/90 border border-border-subtle ${currentMap.accent}`}
                    >
                      {currentMap.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                      {activeResolution === "2K"
                        ? "2048 × 2048 (Base)"
                        : activeResolution === "4K"
                          ? "4096 × 4096 (Upscaled)"
                          : "8192 × 8192 (Ultra HD)"}
                    </span>
                  </div>

                  {/* Center High-Detail Texture Map Emblem */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-bg-card/80 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl mb-3">
                      <span
                        className={`text-2xl sm:text-3xl font-black font-mono ${currentMap.accent}`}
                      >
                        {activeResolution}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-text-primary block">
                      {activeResolution === "2K"
                        ? "Original 2K Source Texture"
                        : activeResolution === "4K"
                          ? "AI-Enhanced 4K Sharpness"
                          : "Master 8K High-Fidelity Details"}
                    </span>
                    <span className="text-[11px] text-text-muted max-w-sm mt-1">
                      {
                        resolutions.find((r) => r.level === activeResolution)
                          ?.detail
                      }
                    </span>
                  </div>

                  {/* Bottom Bar Info */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] text-text-secondary">
                    <span>Channel: 8-bit / 16-bit PNG</span>
                    <span className="font-mono text-lime font-bold">
                      {activeResolution === "2K"
                        ? "1× Quality"
                        : activeResolution === "4K"
                          ? "4× Detail (Lossless)"
                          : "16× Detail (Maximum)"}
                    </span>
                  </div>
                </div>

                {/* Description below simulation */}
                <div className="mt-4 p-3 rounded-xl bg-bg-elevated/80 border border-border-subtle flex items-start justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-text-primary block">
                      {currentMap.name} Pipeline:
                    </strong>
                    <p className="text-text-muted mt-0.5">{currentMap.desc}</p>
                  </div>
                  <span className="text-pink font-mono font-bold text-[11px] whitespace-nowrap">
                    PNG Export
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
