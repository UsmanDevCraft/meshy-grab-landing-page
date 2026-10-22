"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const formats = [
  {
    id: "GLB",
    label: "GLB / glTF",
    useCases: "Modern Web 3D, AR/VR, Three.js, Babylon.js, Spark AR",
    fidelity:
      "Embeds geometry, UVs, and PBR textures in a single binary payload.",
  },
  {
    id: "OBJ",
    label: "OBJ (Wavefront)",
    useCases: "Universal legacy DCC, Maya, 3ds Max, ZBrush, Cinema 4D",
    fidelity: "Pure polygon mesh with vertex normals and UV coordinates.",
  },
  {
    id: "FBX",
    label: "FBX (Autodesk)",
    useCases:
      "Unreal Engine 5, Unity, Godot game pipelines, rigging & animations",
    fidelity:
      "Complex scene hierarchy, materials, transforms, and mesh node trees.",
  },
  {
    id: "STL",
    label: "STL (Stereolithography)",
    useCases:
      "3D Slicers, FDM/SLA 3D printing (Cura, PrusaSlicer, Bambu Studio)",
    fidelity:
      "Watertight triangular surface tessellation optimized for additive manufacturing.",
  },
  {
    id: "3MF",
    label: "3MF (3D Manufacturing)",
    useCases:
      "Multi-color & multi-material 3D printing, modern production slicers",
    fidelity:
      "Next-gen compact XML container with color, texture, and unit scale preservation.",
  },
];

const popularConversions = [
  {
    from: "GLB",
    to: "OBJ",
    label: "GLB to OBJ",
    purpose: "Import web/AI assets into ZBrush or Maya",
  },
  {
    from: "FBX",
    to: "GLB",
    label: "FBX to GLB",
    purpose: "Optimize game models for browser & AR viewing",
  },
  {
    from: "OBJ",
    to: "STL",
    label: "OBJ to STL",
    purpose: "Prepare digital sculpts for 3D printing slicers",
  },
  {
    from: "GLB",
    to: "FBX",
    label: "GLB to FBX",
    purpose: "Bring models into Unreal Engine & Unity",
  },
  {
    from: "STL",
    to: "3MF",
    label: "STL to 3MF",
    purpose: "Upgrade legacy slicer mesh to modern 3MF format",
  },
  {
    from: "OBJ",
    to: "3MF",
    label: "OBJ to 3MF",
    purpose: "Direct color-aware slicing for Bambu & Prusa",
  },
];

export default function ConverterSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const widgetRef = useScrollReveal<HTMLDivElement>();

  const [sourceFormat, setSourceFormat] = useState("GLB");
  const [targetFormat, setTargetFormat] = useState("OBJ");

  const selectedSource =
    formats.find((f) => f.id === sourceFormat) || formats[0];
  const selectedTarget =
    formats.find((f) => f.id === targetFormat) || formats[1];

  return (
    <section
      id="converter"
      className="section-padding bg-bg-page border-b border-border-subtle relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div
          ref={textRef}
          className="reveal text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/10 border border-emerald-400/30 rounded-full text-xs font-bold text-emerald-400 mb-4 uppercase tracking-wider">
            Pillar 02 — Model Conversion
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] mb-5 text-text-primary">
            Universal 3D Model Format Converter
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Import supported 3D models from any source—including outside
            MeshyGrab—and convert between GLB, OBJ, FBX, STL, and 3MF formats
            with clean geometry translation.
          </p>
        </div>

        {/* Interactive Converter Simulator Widget */}
        <div
          ref={widgetRef}
          className="reveal max-w-4xl mx-auto bg-bg-card border border-border-subtle rounded-3xl p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.5)] mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-text-primary mb-1">
              Interactive 3D File Converter Matrix
            </h3>
            <p className="text-xs text-text-muted">
              Select your source file format and desired output format to review
              geometry and material translation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
            {/* Input Selection Box */}
            <div className="md:col-span-5 bg-bg-elevated/70 border border-border-subtle rounded-2xl p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-3">
                1. Source File Format (Input)
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
                {formats.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setSourceFormat(fmt.id)}
                    className={`py-2 px-1 text-center font-mono font-bold text-xs rounded-xl border transition-all ${
                      sourceFormat === fmt.id
                        ? "bg-lime text-deep-black border-lime shadow-[0_0_15px_rgba(197,249,85,0.3)]"
                        : "bg-bg-page border-border-subtle text-text-secondary hover:text-text-primary hover:border-lime/30"
                    }`}
                  >
                    {fmt.id}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-bg-page rounded-xl border border-border-subtle/60 text-xs">
                <span className="font-bold text-text-primary block mb-1">
                  {selectedSource.label}
                </span>
                <span className="text-[11px] text-text-muted leading-tight block mb-2">
                  {selectedSource.useCases}
                </span>
                <span className="text-[10px] text-lime font-mono block">
                  {selectedSource.fidelity}
                </span>
              </div>
            </div>

            {/* Transition Arrow / Direction */}
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-lime/10 border border-lime/30 text-lime flex items-center justify-center font-bold">
                <svg
                  className="w-5 h-5 rotate-90 md:rotate-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-[10px] font-mono text-text-muted mt-1 uppercase">
                Convert
              </span>
            </div>

            {/* Output Selection Box */}
            <div className="md:col-span-5 bg-bg-elevated/70 border border-border-subtle rounded-2xl p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-3">
                2. Target Format (Output)
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
                {formats.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setTargetFormat(fmt.id)}
                    className={`py-2 px-1 text-center font-mono font-bold text-xs rounded-xl border transition-all ${
                      targetFormat === fmt.id
                        ? "bg-pink text-white border-pink shadow-[0_0_15px_rgba(255,62,143,0.3)]"
                        : "bg-bg-page border-border-subtle text-text-secondary hover:text-text-primary hover:border-pink/30"
                    }`}
                  >
                    {fmt.id}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-bg-page rounded-xl border border-border-subtle/60 text-xs">
                <span className="font-bold text-text-primary block mb-1">
                  {selectedTarget.label}
                </span>
                <span className="text-[11px] text-text-muted leading-tight block mb-2">
                  {selectedTarget.useCases}
                </span>
                <span className="text-[10px] text-pink font-mono block">
                  {selectedTarget.fidelity}
                </span>
              </div>
            </div>
          </div>

          {/* Conversion Output Summary Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-bg-elevated border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-lime/10 text-lime flex items-center justify-center font-mono font-bold text-xs">
                3D
              </div>
              <div>
                <span className="text-xs font-bold text-text-primary block">
                  Pipeline: {sourceFormat} &rarr; {targetFormat} Converter
                </span>
                <span className="text-[11px] text-text-muted block">
                  Optimized for polygon preservation, UV coordinate retention,
                  and target software compatibility.
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-xs font-bold border border-emerald-400/30 whitespace-nowrap">
              Verified Pipeline
            </span>
          </div>

          {/* Accurate Engineering Notice */}
          <p className="text-[11px] text-text-muted text-center mt-5 leading-relaxed">
            * <strong>Conversion Note:</strong> Mesh geometry, polygon vertices,
            and UV layouts are preserved across supported formats. STL files
            inherently contain surface geometry without UV/texture data, making
            them ideal for 3D printing. Material channels convert between
            compatible GLB, OBJ, and FBX workflows.
          </p>
        </div>

        {/* Popular Conversion Paths Grid */}
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider block text-center mb-4">
            Popular 3D Format Conversion Pipelines:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {popularConversions.map((conv) => (
              <button
                key={conv.label}
                onClick={() => {
                  setSourceFormat(conv.from);
                  setTargetFormat(conv.to);
                }}
                className="p-3.5 bg-bg-card border border-border-subtle rounded-2xl text-left hover:border-lime/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-extrabold text-lime group-hover:text-text-primary transition-colors">
                    {conv.label}
                  </span>
                  <span className="text-[10px] text-text-muted font-mono uppercase">
                    Select &rarr;
                  </span>
                </div>
                <span className="text-[11px] text-text-secondary leading-tight block">
                  {conv.purpose}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
