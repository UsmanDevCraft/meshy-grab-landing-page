"use client";

import { useState, useEffect, useCallback } from "react";
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

const slides = [
  {
    id: "viewer",
    pillar: "Pillar 01",
    tag: "3D Workspace & Viewer",
    badge: "Interactive Viewer",
    badgeColor: "text-lime bg-lime/10 border-lime/30",
    headline: "Interactive 3D Workspace & Model Viewer",
    subtext:
      "Inspect, rotate, and render 3D models with real-time materials, lighting controls, wireframe analysis, and polygon metrics directly in your browser before exporting.",
  },
  {
    id: "converter",
    pillar: "Pillar 02",
    tag: "Universal Format Converter",
    badge: "Cross-Platform Pipeline",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    headline: "Universal 3D Model Format Converter",
    subtext:
      "Import supported 3D models from any source and convert seamlessly between GLB, OBJ, FBX, STL, and 3MF formats for game engines, DCC apps, or 3D slicers.",
  },
  {
    id: "upscaler",
    pillar: "Pillar 03",
    tag: "4K & 8K PBR Texture Upscaler",
    badge: "Neural Texture Engine",
    badgeColor: "text-pink bg-pink/10 border-pink/30",
    headline: "AI PBR Texture Upscaler to 4K & 8K",
    subtext:
      "Elevate standard 2K textures into crystal-clear 4K and 8K resolution. AI-enhanced detail sharpening preserves normal maps, roughness, metallic, and displacement.",
  },
];

export default function WorkSectionsCarousel() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Viewer State
  const [activeMode, setActiveMode] = useState<
    "pbr" | "wireframe" | "matcap" | "normals"
  >("pbr");
  const [isRotating, setIsRotating] = useState(true);

  // Converter State
  const [sourceFormat, setSourceFormat] = useState("GLB");
  const [targetFormat, setTargetFormat] = useState("OBJ");

  // Upscaler State
  const [activeResolution, setActiveResolution] = useState<"2K" | "4K" | "8K">(
    "4K",
  );
  const [activeMap, setActiveMap] = useState("albedo");

  const selectedSource =
    formats.find((f) => f.id === sourceFormat) || formats[0];
  const selectedTarget =
    formats.find((f) => f.id === targetFormat) || formats[1];
  const currentMap =
    textureMaps.find((m) => m.id === activeMap) || textureMaps[0];

  // Stop auto play whenever user interacts with anything
  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  // Notify window & sync active tool with navbar
  const handleSelectSlide = useCallback((index: number) => {
    setActiveSlide(index);
    const slideId = slides[index]?.id;
    if (typeof window !== "undefined" && slideId) {
      window.dispatchEvent(
        new CustomEvent("carousel-slide-changed", {
          detail: { slideId, index },
        }),
      );
    }
  }, []);

  // Track if carousel is currently visible on screen
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  // 3-second auto-advance timer. Stops immediately if user interacts, is off-screen, tab hidden, or prefers reduced motion.
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let timer: NodeJS.Timeout | null = null;

    const startTimer = () => {
      if (document.hidden) return;
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        setActiveSlide((prev) => {
          const next = (prev + 1) % slides.length;
          const slideId = slides[next]?.id;
          if (typeof window !== "undefined" && slideId) {
            window.dispatchEvent(
              new CustomEvent("carousel-slide-changed", {
                detail: { slideId, index: next },
              }),
            );
          }
          return next;
        });
      }, 3000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timer) clearInterval(timer);
        timer = null;
      } else {
        startTimer();
      }
    };

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAutoPlaying, isInView]);

  // Listen for anchor / external requests to switch slides
  useEffect(() => {
    const handleCustomSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId?: string }>;
      const targetId = customEvent.detail?.targetId;
      if (!targetId) return;
      const index = slides.findIndex((s) => s.id === targetId);
      if (index !== -1) {
        handleSelectSlide(index);
      }
    };

    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const index = slides.findIndex((s) => s.id === hash);
      if (index !== -1) {
        handleSelectSlide(index);
      }
    };

    window.addEventListener(
      "select-carousel-slide",
      handleCustomSwitch as EventListener,
    );
    window.addEventListener("hashchange", handleHash);

    // Initial hash check
    handleHash();

    return () => {
      window.removeEventListener(
        "select-carousel-slide",
        handleCustomSwitch as EventListener,
      );
      window.removeEventListener("hashchange", handleHash);
    };
  }, [handleSelectSlide]);

  const nextSlide = () => {
    stopAutoPlay();
    handleSelectSlide((activeSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    stopAutoPlay();
    handleSelectSlide((activeSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="work-tools"
      className="section-padding bg-bg-page border-b border-border-subtle relative overflow-hidden"
      onMouseEnter={stopAutoPlay}
    >
      {/* Invisible anchor targets for navbar navigation */}
      <div id="viewer" className="absolute -top-24 pointer-events-none" />
      <div id="converter" className="absolute -top-24 pointer-events-none" />
      <div id="upscaler" className="absolute -top-24 pointer-events-none" />

      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-radial-lime opacity-5 pointer-events-none blur-3xl" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-gradient-radial-pink opacity-5 pointer-events-none blur-3xl" />

      <div
        ref={containerRef}
        className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-lime/10 border border-lime/30 rounded-full text-xs font-bold text-lime mb-4 uppercase tracking-wider shadow-[0_0_15px_rgba(197,249,85,0.15)]">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            Core 3D Creation Workspace
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] mb-4 text-text-primary">
            All-In-One 3D Toolkit In Action
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Switch seamlessly between our real-time 3D model viewer, universal
            format converter, and AI PBR texture upscaler — all built directly
            into your browser workflow.
          </p>
        </div>

        {/* Carousel Tabs & Navigation Bar */}
        <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-2 sm:p-2.5 mb-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {slides.map((slide, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    stopAutoPlay();
                    handleSelectSlide(idx);
                  }}
                  className={`relative p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 flex items-center justify-between gap-3 ${
                    isActive
                      ? "bg-bg-card border border-lime/40 shadow-[0_0_20px_rgba(197,249,85,0.12)] text-text-primary"
                      : "bg-transparent border border-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                        isActive
                          ? "bg-lime text-deep-black shadow-[0_0_10px_rgba(197,249,85,0.4)]"
                          : "bg-white/10 text-text-muted"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="text-xs uppercase font-mono tracking-wider text-text-muted block">
                        {slide.pillar}
                      </span>
                      <span
                        className={`text-sm font-bold block transition-colors ${
                          isActive ? "text-text-primary" : "text-text-secondary"
                        }`}
                      >
                        {slide.tag}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <span className="hidden sm:inline-flex text-xs text-lime font-mono shrink-0">
                      Active ●
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Slider Controls Bar */}
          <div className="mt-3 pt-3 border-t border-border-subtle/80 flex items-center justify-between px-2 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-text-muted">
                Tool{" "}
                <strong className="text-text-primary">{activeSlide + 1}</strong>{" "}
                of{" "}
                <strong className="text-text-primary">{slides.length}</strong>
              </span>

              {/* Auto-play badge / status */}
              {isAutoPlaying ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-lime bg-lime/10 px-2 py-0.5 rounded-full border border-lime/25 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  Auto-Advance (3s)
                </span>
              ) : (
                <button
                  onClick={() => setIsAutoPlaying(true)}
                  title="Click to resume auto-advance"
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono text-text-muted hover:text-lime bg-white/[0.04] px-2 py-0.5 rounded-full border border-border-subtle transition-colors"
                >
                  <span>⏸ Paused</span>
                  <span className="text-lime font-bold">▶ Resume</span>
                </button>
              )}

              <div className="flex gap-1.5 ml-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      stopAutoPlay();
                      handleSelectSlide(i);
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeSlide === i
                        ? "w-6 bg-lime"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous Tool"
                className="p-2 rounded-xl bg-bg-card border border-border-subtle text-text-secondary hover:text-lime hover:border-lime/40 transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Tool"
                className="p-2 rounded-xl bg-bg-card border border-border-subtle text-text-secondary hover:text-lime hover:border-lime/40 transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slides Container with Touch Support */}
        <div
          className="relative bg-bg-card border border-border-subtle rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.6)]"
          onTouchStart={(e) => {
            stopAutoPlay();
            setTouchStart(e.targetTouches[0].clientX);
          }}
          onTouchEnd={(e) => {
            if (touchStart === null) return;
            const touchEnd = e.changedTouches[0].clientX;
            if (touchStart - touchEnd > 60) nextSlide();
            if (touchEnd - touchStart > 60) prevSlide();
            setTouchStart(null);
          }}
        >
          {/* ======================================================== */}
          {/* SLIDE 0: 3D MODEL VIEWER & WORKSPACE                     */}
          {/* ======================================================== */}
          {activeSlide === 0 && (
            <div className="p-6 sm:p-10 lg:p-12 animate-fadeIn transition-opacity duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Description Column */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/30 rounded-full text-xs font-bold text-lime uppercase tracking-wider">
                    Pillar 01 — 3D Workspace
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary leading-tight">
                    Online 3D Model Viewer &amp; Workspace
                  </h3>

                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Render and inspect your 3D models directly inside
                    MeshyGrab’s interactive workspace. You don&apos;t just
                    export blindly—verify topology, lighting, and materials
                    before downloading.
                  </p>

                  <div className="p-4 rounded-2xl bg-bg-elevated border border-border-subtle">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-lime mb-1.5 flex items-center gap-2">
                      <span>📁</span> Bring Your Own 3D Files
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Bring existing 3D files from outside MeshyGrab into the
                      online 3D model viewer. Drag and drop any supported model
                      to instantly render, rotate, and evaluate geometry without
                      desktop software.
                    </p>
                  </div>

                  {/* Supported Format Pills */}
                  <div>
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">
                      Supported Inputs:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {supportedViewerFormats.map((fmt) => (
                        <div
                          key={fmt.name}
                          className="px-2.5 py-1.5 bg-bg-page/80 rounded-xl border border-border-subtle text-xs flex items-center gap-1.5"
                        >
                          <span className="text-lime font-mono font-bold">
                            •
                          </span>
                          <span className="font-semibold text-text-primary truncate">
                            {fmt.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-2">
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

                {/* Right Interactive Mockup Column with Pure CSS/SVG 3D Viewport */}
                <div className="lg:col-span-7">
                  <div className="bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden shadow-2xl">
                    {/* Viewport Toolbar */}
                    <div className="px-4 py-3 bg-bg-page border-b border-border-subtle flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-xs font-mono text-text-muted ml-2">
                          workspace://rover_vehicle.glb
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] font-mono">
                        <span className="text-text-muted hidden sm:inline">
                          Triangles:{" "}
                          <strong className="text-lime">48,210</strong>
                        </span>
                        <button
                          onClick={() => {
                            stopAutoPlay();
                            setIsRotating(!isRotating);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                            isRotating
                              ? "bg-lime/20 text-lime border-lime/40"
                              : "bg-bg-card text-text-muted border-border-subtle"
                          }`}
                        >
                          {isRotating ? "Auto-Rotate ON" : "Paused"}
                        </button>
                      </div>
                    </div>

                    {/* Viewport Display Area with Pure CSS/SVG 3D Canvas */}
                    <div className="relative p-6 bg-gradient-to-b from-[#090a0f] to-[#040508] flex flex-col items-center justify-center min-h-[380px] overflow-hidden select-none">
                      {/* Grid background floor */}
                      <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(197,249,85,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197,249,85,0.15) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                          transform:
                            "perspective(500px) rotateX(60deg) translateY(40px)",
                          transformOrigin: "bottom center",
                        }}
                      />

                      {/* Viewport Gizmo (XYZ Axes in top-right) */}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center z-20 shadow-lg">
                        <svg className="w-8 h-8" viewBox="0 0 40 40">
                          {/* Center origin */}
                          <circle cx="20" cy="20" r="2.5" fill="#fff" />
                          {/* X - Red */}
                          <line
                            x1="20"
                            y1="20"
                            x2="33"
                            y2="20"
                            stroke="#f43f5e"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <text
                            x="35"
                            y="22"
                            fill="#f43f5e"
                            fontSize="7"
                            fontWeight="bold"
                          >
                            X
                          </text>
                          {/* Y - Green */}
                          <line
                            x1="20"
                            y1="20"
                            x2="20"
                            y2="7"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <text
                            x="18"
                            y="6"
                            fill="#10b981"
                            fontSize="7"
                            fontWeight="bold"
                          >
                            Y
                          </text>
                          {/* Z - Blue */}
                          <line
                            x1="20"
                            y1="20"
                            x2="11"
                            y2="29"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <text
                            x="7"
                            y="34"
                            fill="#3b82f6"
                            fontSize="7"
                            fontWeight="bold"
                          >
                            Z
                          </text>
                        </svg>
                      </div>

                      {/* Mode Indicator Badge */}
                      <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-lime flex items-center gap-2 shadow-lg z-20">
                        <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                        <span className="font-bold">
                          SHADER: {activeMode.toUpperCase()}
                        </span>
                      </div>

                      {/* 3D Model Graphic (Pure SVG Isometric Asset with Dynamic Mode Shading) */}
                      <div
                        className={`relative z-10 transition-transform duration-700 ease-out flex items-center justify-center ${
                          isRotating ? "animate-[spin_16s_linear_infinite]" : ""
                        }`}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <svg
                          className="w-56 h-56 sm:w-64 sm:h-64 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                          viewBox="0 0 200 200"
                          fill="none"
                        >
                          <defs>
                            {/* PBR Gradients */}
                            <linearGradient
                              id="pbr-top"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#4a5568" />
                              <stop offset="50%" stopColor="#718096" />
                              <stop offset="100%" stopColor="#2d3748" />
                            </linearGradient>
                            <linearGradient
                              id="pbr-left"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#1a202c" />
                              <stop offset="100%" stopColor="#2d3748" />
                            </linearGradient>
                            <linearGradient
                              id="pbr-right"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#2d3748" />
                              <stop offset="100%" stopColor="#171923" />
                            </linearGradient>
                            <linearGradient
                              id="pbr-accent"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#c5f955" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>

                            {/* MatCap Gradients */}
                            <linearGradient
                              id="matcap-top"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#e28743" />
                              <stop offset="100%" stopColor="#b3541e" />
                            </linearGradient>
                            <linearGradient
                              id="matcap-left"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#873e13" />
                              <stop offset="100%" stopColor="#54250c" />
                            </linearGradient>
                            <linearGradient
                              id="matcap-right"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#9c4918" />
                              <stop offset="100%" stopColor="#692d0b" />
                            </linearGradient>

                            {/* Normal Map Gradients (Tangent Space RGB) */}
                            <linearGradient
                              id="norm-top"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#7f7fff" />
                              <stop offset="100%" stopColor="#4f46e5" />
                            </linearGradient>
                            <linearGradient
                              id="norm-left"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#ff4687" />
                              <stop offset="100%" stopColor="#cc1b5b" />
                            </linearGradient>
                            <linearGradient
                              id="norm-right"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#00d492" />
                              <stop offset="100%" stopColor="#069669" />
                            </linearGradient>
                          </defs>

                          {/* Outer Shadow Pod */}
                          <ellipse
                            cx="100"
                            cy="172"
                            rx="60"
                            ry="14"
                            fill="rgba(0,0,0,0.5)"
                            filter="blur(6px)"
                          />

                          {/* 3D Polyhedral Rover Chassis */}
                          {activeMode === "wireframe" ? (
                            /* Wireframe Mode: Glowing Mesh Edges */
                            <g
                              stroke="#c5f955"
                              strokeWidth="1.2"
                              strokeLinejoin="round"
                              fill="rgba(197,249,85,0.04)"
                            >
                              {/* Central Hexagonal Core */}
                              <polygon points="100,35 155,65 155,125 100,155 45,125 45,65" />
                              <line x1="100" y1="35" x2="100" y2="95" />
                              <line x1="155" y1="65" x2="100" y2="95" />
                              <line x1="45" y1="65" x2="100" y2="95" />
                              <line x1="100" y1="95" x2="100" y2="155" />
                              <line x1="100" y1="95" x2="155" y2="125" />
                              <line x1="100" y1="95" x2="45" y2="125" />

                              {/* Internal Facet Subdivisions */}
                              <line
                                x1="72"
                                y1="50"
                                x2="127"
                                y2="80"
                                stroke="#00f2fe"
                                strokeWidth="0.8"
                              />
                              <line
                                x1="127"
                                y1="50"
                                x2="72"
                                y2="80"
                                stroke="#00f2fe"
                                strokeWidth="0.8"
                              />
                              <line
                                x1="100"
                                y1="95"
                                x2="100"
                                y2="65"
                                stroke="#ff3e8f"
                                strokeWidth="1.5"
                              />

                              {/* Corner Sensors & Nodes */}
                              <circle cx="100" cy="35" r="3" fill="#c5f955" />
                              <circle cx="155" cy="65" r="3" fill="#c5f955" />
                              <circle cx="155" cy="125" r="3" fill="#c5f955" />
                              <circle cx="100" cy="155" r="3" fill="#c5f955" />
                              <circle cx="45" cy="125" r="3" fill="#c5f955" />
                              <circle cx="45" cy="65" r="3" fill="#c5f955" />
                              <circle cx="100" cy="95" r="4" fill="#00f2fe" />
                            </g>
                          ) : (
                            /* Shaded Modes: PBR, MatCap, Normals */
                            <g
                              stroke="rgba(255,255,255,0.08)"
                              strokeWidth="0.8"
                            >
                              {/* Top Facet */}
                              <polygon
                                points="100,35 155,65 100,95 45,65"
                                fill={
                                  activeMode === "pbr"
                                    ? "url(#pbr-top)"
                                    : activeMode === "matcap"
                                      ? "url(#matcap-top)"
                                      : "url(#norm-top)"
                                }
                              />
                              {/* Left Facet */}
                              <polygon
                                points="45,65 100,95 100,155 45,125"
                                fill={
                                  activeMode === "pbr"
                                    ? "url(#pbr-left)"
                                    : activeMode === "matcap"
                                      ? "url(#matcap-left)"
                                      : "url(#norm-left)"
                                }
                              />
                              {/* Right Facet */}
                              <polygon
                                points="100,95 155,65 155,125 100,155"
                                fill={
                                  activeMode === "pbr"
                                    ? "url(#pbr-right)"
                                    : activeMode === "matcap"
                                      ? "url(#matcap-right)"
                                      : "url(#norm-right)"
                                }
                              />

                              {/* Tech Details / Cockpit Dome */}
                              <ellipse
                                cx="100"
                                cy="65"
                                rx="24"
                                ry="12"
                                fill={
                                  activeMode === "pbr"
                                    ? "url(#pbr-accent)"
                                    : activeMode === "matcap"
                                      ? "#fbd38d"
                                      : "#a78bfa"
                                }
                                opacity="0.9"
                              />
                              <ellipse
                                cx="100"
                                cy="63"
                                rx="16"
                                ry="6"
                                fill="#ffffff"
                                opacity="0.4"
                              />

                              {/* Thruster / Front Sensor Pod */}
                              <polygon
                                points="90,115 110,115 105,135 95,135"
                                fill={
                                  activeMode === "pbr" ? "#c5f955" : "#fed7aa"
                                }
                                opacity="0.85"
                              />
                            </g>
                          )}
                        </svg>
                      </div>

                      {/* Lighting & Inspector Status Bar */}
                      <div className="w-full flex items-center justify-between mt-6 text-[11px] text-text-muted font-mono px-3 z-20">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          Key Light: 5500K Soft PBR
                        </span>
                        <span className="text-lime font-bold">
                          FPS: 60 • 48,210 Polygons
                        </span>
                      </div>
                    </div>

                    {/* Mode Selector Tabs */}
                    <div className="p-3 bg-bg-page border-t border-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {viewerModes.map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => {
                            stopAutoPlay();
                            setActiveMode(mode.id as typeof activeMode);
                          }}
                          className={`p-2 rounded-xl text-left border transition-all ${
                            activeMode === mode.id
                              ? "bg-lime/10 border-lime/40 text-lime shadow-[0_0_12px_rgba(197,249,85,0.1)]"
                              : "bg-bg-card border-border-subtle text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          <div className="text-xs font-bold flex items-center justify-between">
                            <span>{mode.label}</span>
                            {activeMode === mode.id && (
                              <span className="text-[10px]">●</span>
                            )}
                          </div>
                          <div className="text-[10px] text-text-muted mt-0.5 truncate">
                            {mode.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SLIDE 1: UNIVERSAL FORMAT CONVERTER                      */}
          {/* ======================================================== */}
          {activeSlide === 1 && (
            <div className="p-6 sm:p-10 lg:p-12 animate-fadeIn transition-opacity duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Description Column */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/10 border border-emerald-400/30 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Pillar 02 — Model Conversion
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary leading-tight">
                    Universal 3D Model Format Converter
                  </h3>

                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Import supported 3D models from any source—including outside
                    MeshyGrab—and convert between GLB, OBJ, FBX, STL, and 3MF
                    formats with clean geometry translation.
                  </p>

                  {/* Popular Conversion Pipelines */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                      Popular Pipelines:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {popularConversions.slice(0, 4).map((conv) => (
                        <button
                          key={conv.label}
                          onClick={() => {
                            stopAutoPlay();
                            setSourceFormat(conv.from);
                            setTargetFormat(conv.to);
                          }}
                          className="p-2.5 bg-bg-elevated border border-border-subtle rounded-xl text-left hover:border-lime/30 transition-all text-xs"
                        >
                          <span className="font-mono font-bold text-lime block">
                            {conv.label}
                          </span>
                          <span className="text-[10px] text-text-muted truncate block">
                            {conv.purpose}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-bg-elevated rounded-xl border border-border-subtle text-xs text-text-secondary">
                    <strong className="text-text-primary block mb-1">
                      Clean Mesh Translation:
                    </strong>
                    Vertices, normals, and UV layouts remain intact.
                    Slicer-ready STL/3MF files are generated with manifold,
                    watertight geometry.
                  </div>
                </div>

                {/* Right Column: Pure CSS/SVG Converter UI Dashboard */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Interactive Transpiler Card */}
                  <div className="bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden shadow-2xl p-5 sm:p-6">
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-border-subtle">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                          ⚡
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-text-primary">
                            Client-Side Transpiler Engine
                          </h4>
                          <span className="text-[11px] text-text-muted">
                            Lossless vertex normal &amp; UV retention
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-full font-bold">
                        Engine: Ready
                      </span>
                    </div>

                    {/* Drag & Drop Visual Pipeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
                      {/* Input File Box */}
                      <div className="sm:col-span-5 p-4 rounded-xl bg-bg-page border border-border-subtle">
                        <span className="text-[10px] uppercase font-mono text-text-muted block mb-2 font-bold">
                          Source Model
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center text-lime font-mono font-bold text-xs shrink-0">
                            {sourceFormat}
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-text-primary block truncate">
                              rover_vehicle.{sourceFormat.toLowerCase()}
                            </span>
                            <span className="text-[10px] text-text-muted block font-mono">
                              14.8 MB • 48,210 Tris
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Animated Connector Arrow */}
                      <div className="sm:col-span-1 flex justify-center py-2 sm:py-0">
                        <div className="w-8 h-8 rounded-full bg-bg-card border border-border-subtle flex items-center justify-center text-emerald-400 shadow-md">
                          <svg
                            className="w-4 h-4 animate-pulse"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </div>

                      {/* Output File Box */}
                      <div className="sm:col-span-5 p-4 rounded-xl bg-bg-page border border-border-subtle">
                        <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-2 font-bold">
                          Converted Output
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs shrink-0">
                            {targetFormat}
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-text-primary block truncate">
                              rover_vehicle.{targetFormat.toLowerCase()}
                            </span>
                            <span className="text-[10px] text-emerald-400 block font-mono font-bold">
                              ✓ Watertight Mesh Ready
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Progress Bar Widget */}
                    <div className="mt-5 p-3.5 bg-bg-page/70 rounded-xl border border-border-subtle">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-text-secondary font-mono text-[11px] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Conversion Stream Status
                        </span>
                        <span className="font-mono font-bold text-emerald-400 text-xs">
                          100% (0.24s)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden border border-border-subtle">
                        <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-lime w-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-text-muted mt-2 font-mono">
                        <span>Geometry: Clean Manifold</span>
                        <span>Normals: Preserved Tangent</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Interactive Format Matrix Widget */}
                  <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-text-primary">
                        Live Pipeline Simulator
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-400/10 text-emerald-400 rounded-md">
                        {sourceFormat} &rarr; {targetFormat} Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Source */}
                      <div className="bg-bg-page p-3 rounded-xl border border-border-subtle">
                        <span className="text-[10px] font-mono text-text-muted uppercase block mb-2">
                          1. Source Format
                        </span>
                        <div className="flex gap-1.5 flex-wrap">
                          {formats.map((fmt) => (
                            <button
                              key={fmt.id}
                              onClick={() => {
                                stopAutoPlay();
                                setSourceFormat(fmt.id);
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors ${
                                sourceFormat === fmt.id
                                  ? "bg-lime text-deep-black border-lime"
                                  : "bg-bg-card border-border-subtle text-text-secondary hover:text-text-primary"
                              }`}
                            >
                              {fmt.id}
                            </button>
                          ))}
                        </div>
                        <span className="text-[11px] text-text-secondary mt-2 block">
                          {selectedSource.useCases}
                        </span>
                      </div>

                      {/* Target */}
                      <div className="bg-bg-page p-3 rounded-xl border border-border-subtle">
                        <span className="text-[10px] font-mono text-text-muted uppercase block mb-2">
                          2. Target Format
                        </span>
                        <div className="flex gap-1.5 flex-wrap">
                          {formats.map((fmt) => (
                            <button
                              key={fmt.id}
                              onClick={() => {
                                stopAutoPlay();
                                setTargetFormat(fmt.id);
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors ${
                                targetFormat === fmt.id
                                  ? "bg-pink text-white border-pink"
                                  : "bg-bg-card border-border-subtle text-text-secondary hover:text-text-primary"
                              }`}
                            >
                              {fmt.id}
                            </button>
                          ))}
                        </div>
                        <span className="text-[11px] text-text-secondary mt-2 block">
                          {selectedTarget.useCases}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SLIDE 2: 4K & 8K PBR TEXTURE UPSCALER                    */}
          {/* ======================================================== */}
          {activeSlide === 2 && (
            <div className="p-6 sm:p-10 lg:p-12 animate-fadeIn transition-opacity duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Description Column */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink/10 border border-pink/30 rounded-full text-xs font-bold text-pink uppercase tracking-wider">
                    Pillar 03 — Texture Enhancement
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary leading-tight">
                    AI PBR Texture Upscaler to 4K &amp; 8K
                  </h3>

                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    AI-generated 3D models typically ship with low-resolution 2K
                    texture maps that blur upon close inspection. MeshyGrab
                    introduces specialized neural texture upscaling that
                    elevates your PBR materials to crisp 4K and 8K.
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 bg-bg-elevated rounded-xl border border-border-subtle flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink/10 text-pink flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        4K
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-text-primary">
                          Production Game-Ready 4K
                        </h4>
                        <p className="text-[11px] text-text-secondary leading-snug">
                          4× pixel density recommended for Unreal Engine 5,
                          Unity, and real-time game assets.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-bg-elevated rounded-xl border border-border-subtle flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink/20 text-pink flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        8K
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-text-primary">
                          Cinematic &amp; Hero Asset 8K
                        </h4>
                        <p className="text-[11px] text-text-secondary leading-snug">
                          16× pixel density for hero characters, architectural
                          visualization, and macro renders.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-2">
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
                      Lossless PNG Maps
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

                {/* Right Column: Pure CSS/SVG Split Texture Comparison Mockup */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Split Comparison Frame */}
                  <div className="bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-5">
                    <div className="relative aspect-[16/10] max-w-[500px] mx-auto rounded-xl overflow-hidden border border-border-subtle bg-bg-page shadow-inner">
                      {/* Left: 2K Standard Texture */}
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-neutral-800 to-neutral-900 border-r border-white/20 flex flex-col items-center justify-center p-4 overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-25"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
                            backgroundSize: "16px 16px",
                            filter: "blur(1.5px)",
                          }}
                        />
                        <div className="relative z-10 text-center">
                          <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono text-text-muted border border-white/10 uppercase block mb-1">
                            2K Default
                          </span>
                          <span className="text-xs font-bold text-text-secondary block">
                            2048 × 2048
                          </span>
                          <span className="text-[10px] text-text-muted">
                            Visible blur at close-up
                          </span>
                        </div>
                      </div>

                      {/* Right: 4K / 8K Neural Enhanced Texture */}
                      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-purple-900/40 via-neutral-900 to-pink/20 flex flex-col items-center justify-center p-4 overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-40"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, #ff3e8f 1px, transparent 1px)",
                            backgroundSize: "6px 6px",
                          }}
                        />
                        <div className="relative z-10 text-center">
                          <span className="px-2.5 py-0.5 rounded bg-pink/20 text-[10px] font-mono font-bold text-pink border border-pink/40 uppercase block mb-1 shadow-[0_0_10px_rgba(255,62,143,0.3)]">
                            {activeResolution} Neural AI
                          </span>
                          <span className="text-xs font-bold text-text-primary block">
                            {activeResolution === "8K"
                              ? "8192 × 8192"
                              : "4096 × 4096"}
                          </span>
                          <span className="text-[10px] text-pink font-semibold">
                            {activeResolution === "8K"
                              ? "16× Sharp Density"
                              : "4× Sharp Density"}
                          </span>
                        </div>
                      </div>

                      {/* Center Split Divider Bar */}
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent pointer-events-none z-20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-deep-black border-2 border-white shadow-xl flex items-center justify-center text-[8px] font-bold text-white">
                          ↔
                        </div>
                      </div>

                      {/* Top status bar */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-text-muted border border-white/10">
                          Active Map:{" "}
                          <strong className="text-pink font-bold">
                            {currentMap.name}
                          </strong>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-lime border border-white/10">
                          Lossless 16-bit PNG
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive PBR Channel Switcher */}
                  <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <span className="text-xs font-bold text-text-primary">
                        PBR Material Channel Inspector
                      </span>
                      <div className="flex bg-bg-page p-1 rounded-lg border border-border-subtle text-xs font-mono font-bold">
                        {(["2K", "4K", "8K"] as const).map((res) => (
                          <button
                            key={res}
                            onClick={() => {
                              stopAutoPlay();
                              setActiveResolution(res);
                            }}
                            className={`px-2.5 py-0.5 rounded-md transition-all ${
                              activeResolution === res
                                ? "bg-pink text-white shadow-sm"
                                : "text-text-muted hover:text-text-primary"
                            }`}
                          >
                            {res}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1 mb-3">
                      {textureMaps.map((map) => (
                        <button
                          key={map.id}
                          onClick={() => {
                            stopAutoPlay();
                            setActiveMap(map.id);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                            activeMap === map.id
                              ? "bg-bg-page border-pink/40 text-text-primary shadow-sm"
                              : "bg-transparent border-transparent text-text-muted hover:text-text-secondary"
                          }`}
                        >
                          {map.name}
                        </button>
                      ))}
                    </div>

                    <div className="p-3 bg-bg-page rounded-xl border border-border-subtle text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-text-primary block">
                          {currentMap.name}
                        </span>
                        <span className="text-[11px] text-text-muted block">
                          {currentMap.desc}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-pink ml-2 shrink-0">
                        {
                          resolutions.find((r) => r.level === activeResolution)
                            ?.status
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
