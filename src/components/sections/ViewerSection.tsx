"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const supportedViewerFormats = [
  {
    name: "GLB / glTF",
    desc: "Binary glTF with embedded PBR materials & animations",
  },
  {
    name: "OBJ",
    desc: "Wavefront polygon geometry with accompanying MTL materials",
  },
  {
    name: "FBX",
    desc: "Autodesk exchange format with meshes, bones & hierarchies",
  },
  {
    name: "STL",
    desc: "Standard triangle language for rapid prototyping & 3D prints",
  },
  {
    name: "3MF",
    desc: "Modern 3D Manufacturing format with color & mesh fidelity",
  },
];

const viewerModes = [
  {
    id: "pbr",
    label: "PBR Shaded",
    desc: "Full physically based rendering with reflections & roughness",
  },
  {
    id: "wireframe",
    label: "Wireframe",
    desc: "Topology inspection, edge flow & polygon density analysis",
  },
  {
    id: "matcap",
    label: "MatCap Clay",
    desc: "Sculpt-friendly high-contrast surface curvature shading",
  },
  {
    id: "normals",
    label: "Normal Map",
    desc: "Tangent-space normal orientation & surface vector validation",
  },
];

export default function ViewerSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const previewRef = useScrollReveal<HTMLDivElement>();
  const [activeMode, setActiveMode] = useState<
    "pbr" | "wireframe" | "matcap" | "normals"
  >("pbr");
  const [isRotating, setIsRotating] = useState(true);

  return (
    <section
      id="viewer"
      className="section-padding bg-bg-elevated border-b border-border-subtle relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Description & Feature Details */}
          <div ref={textRef} className="reveal lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/30 rounded-full text-xs font-bold text-lime mb-4 uppercase tracking-wider">
              Pillar 01 — 3D Workspace
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] mb-5 text-text-primary">
              Online 3D Model Viewer &amp; Workspace
            </h2>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
              Render and inspect your 3D models directly inside MeshyGrab’s
              interactive workspace. You don&apos;t just export blindly—verify
              topology, lighting, and materials before downloading.
            </p>

            <div className="p-4 rounded-2xl bg-bg-card border border-border-subtle mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-lime mb-2 flex items-center gap-2">
                <span>📁</span> Bring Your Own 3D Files
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Bring existing 3D files from outside MeshyGrab into the online
                3D model viewer. Drag and drop any supported model to instantly
                render, rotate, and evaluate geometry without installing desktop
                software.
              </p>
            </div>

            {/* Supported Input Formats Pills */}
            <div className="space-y-2 mb-8">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                Supported Viewer Inputs:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {supportedViewerFormats.map((fmt) => (
                  <div
                    key={fmt.name}
                    className="p-2.5 bg-bg-page/70 rounded-xl border border-border-subtle flex items-start gap-2"
                  >
                    <span className="text-xs font-mono font-bold text-lime mt-0.5">
                      •
                    </span>
                    <div>
                      <span className="text-xs font-bold text-text-primary block">
                        {fmt.name}
                      </span>
                      <span className="text-[10px] text-text-muted leading-tight block">
                        {fmt.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-lime"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                100% Client-Side Preview
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-lime"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Zero Cloud Upload Required
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Model Viewer Mockup */}
          <div ref={previewRef} className="reveal lg:col-span-7">
            <div className="bg-bg-card border border-border-subtle rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_50px_rgba(197,249,85,0.08)]">
              {/* Viewer Window Toolbar */}
              <div className="px-5 py-3.5 bg-bg-page border-b border-border-subtle flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-mono text-text-muted ml-2">
                    workspace://model_preview.glb
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="text-text-muted">
                    Triangles: <strong className="text-lime">48,210</strong>
                  </span>
                  <span className="text-text-muted">
                    Draw Calls: <strong className="text-text-primary">2</strong>
                  </span>
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                      isRotating
                        ? "bg-lime/20 text-lime border-lime/40"
                        : "bg-bg-elevated text-text-muted border-border-subtle"
                    }`}
                  >
                    {isRotating ? "Auto-Rotate ON" : "Paused"}
                  </button>
                </div>
              </div>

              {/* Interactive Viewport Canvas Area */}
              <div className="relative h-[340px] sm:h-[420px] bg-gradient-to-b from-[#0e0e12] via-[#08080a] to-[#040405] flex items-center justify-center p-6 overflow-hidden">
                {/* Grid plane */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(197, 249, 85, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(197, 249, 85, 0.1) 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                    transform:
                      "perspective(500px) rotateX(60deg) translateY(100px)",
                  }}
                />

                {/* 3D Geometry Representation based on activeMode */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div
                    className={`w-48 h-48 sm:w-56 sm:h-56 rounded-3xl relative flex items-center justify-center transition-all duration-500 ${
                      isRotating ? "animate-spin" : ""
                    }`}
                    style={{ animationDuration: "16s" }}
                  >
                    {activeMode === "pbr" && (
                      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-lime/40 via-emerald-600/30 to-pink/40 border-2 border-lime/60 shadow-[0_0_60px_rgba(197,249,85,0.25)] flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_60%)]" />
                        <svg
                          className="w-24 h-24 text-lime drop-shadow-[0_0_20px_rgba(197,249,85,0.5)]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                      </div>
                    )}

                    {activeMode === "wireframe" && (
                      <div className="w-full h-full rounded-2xl border-2 border-dashed border-lime bg-lime/5 shadow-[0_0_40px_rgba(197,249,85,0.2)] flex items-center justify-center relative">
                        <div className="absolute inset-2 border border-dotted border-lime/40 rounded-xl" />
                        <div className="absolute inset-6 border border-lime/30 rounded-lg" />
                        <svg
                          className="w-24 h-24 text-lime/90 animate-pulse"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <line x1="12" y1="2" x2="12" y2="22" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <circle cx="12" cy="12" r="9" />
                          <polygon points="12 4 20 18 4 18" />
                        </svg>
                      </div>
                    )}

                    {activeMode === "matcap" && (
                      <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#63302b] via-[#a85848] to-[#f4c2b0] shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.6),0_0_50px_rgba(168,88,72,0.3)] flex items-center justify-center">
                        <span className="text-xs font-mono font-bold text-white/80 uppercase tracking-widest">
                          MatCap Red Clay
                        </span>
                      </div>
                    )}

                    {activeMode === "normals" && (
                      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#8080ff] via-[#00ffff] to-[#ff00ff] border-2 border-cyan-300 shadow-[0_0_50px_rgba(0,255,255,0.3)] flex items-center justify-center relative overflow-hidden">
                        <span className="text-xs font-mono font-bold text-deep-black bg-white/70 px-3 py-1 rounded uppercase tracking-wider">
                          Tangent Normals (XYZ)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-xs font-semibold text-text-primary block">
                      3D Model Preview Active
                    </span>
                    <span className="text-[11px] text-text-muted">
                      Mode:{" "}
                      <strong className="text-lime uppercase">
                        {activeMode}
                      </strong>{" "}
                      • Orbit, Pan &amp; Zoom enabled
                    </span>
                  </div>
                </div>

                {/* Lighting Control Widget */}
                <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-bg-card/80 backdrop-blur-md border border-border-subtle text-[10px] text-text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Key Light: 5500K</span>
                  <span className="text-text-muted">|</span>
                  <span>Shadows: Soft Raytraced</span>
                </div>

                {/* Material Inspector Pill */}
                <div className="absolute top-4 right-4 p-2 rounded-xl bg-bg-card/80 backdrop-blur-md border border-border-subtle text-[10px] font-mono text-lime flex items-center gap-1.5">
                  <span>PBR Metallic-Roughness</span>
                </div>
              </div>

              {/* Mode Selector Tabs */}
              <div className="p-4 bg-bg-page border-t border-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-2">
                {viewerModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id as typeof activeMode)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      activeMode === mode.id
                        ? "bg-lime/10 border-lime/40 text-lime shadow-[0_0_15px_rgba(197,249,85,0.12)]"
                        : "bg-bg-card border-border-subtle/80 text-text-secondary hover:text-text-primary hover:border-border-subtle"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center justify-between">
                      <span>{mode.label}</span>
                      {activeMode === mode.id && (
                        <span className="text-[10px]">●</span>
                      )}
                    </div>
                    <div className="text-[10px] text-text-muted mt-0.5 line-clamp-1">
                      {mode.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
