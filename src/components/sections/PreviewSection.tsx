"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { checks } from "@/constants/constants";

export default function PreviewSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const visualRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="preview"
      className="section-padding bg-bg-elevated overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="reveal max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime mb-4">
              Extension &amp; Workspace UI
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
              Intuitive browser extension &amp; workspace
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mt-4">
              MeshyGrab works right alongside your Meshy workspace, Tripo3D
              Studio, and local files. Inspect geometry in real time, choose
              your target format (GLB, OBJ, FBX, 3MF, or STL), upscale PBR
              textures up to 8K, and export with zero friction.
            </p>
            <div className="mt-8 flex flex-col gap-3.5">
              {checks.map((c) => (
                <div
                  key={c}
                  className="flex items-start gap-3 text-[0.9375rem] text-text-secondary leading-relaxed"
                >
                  <svg
                    className="w-5 h-5 text-lime flex-shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Chrome Extension Popup Mockup with Pure CSS/SVG UI */}
          <div
            ref={visualRef}
            className="reveal flex justify-center order-first lg:order-last"
          >
            <div className="w-full max-w-[360px] bg-bg-card border border-border-subtle rounded-[24px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(197,249,85,0.12)]">
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-subtle bg-bg-page/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-lime text-deep-black rounded-md flex items-center justify-center font-bold text-xs">
                    M
                  </div>
                  <span className="text-sm font-bold text-text-primary">
                    MeshyGrab
                  </span>
                </div>
                <span className="text-[11px] font-medium text-text-muted px-2 py-0.5 bg-lime/10 rounded text-lime font-mono">
                  v3.3 Chrome
                </span>
              </div>

              {/* Popup content */}
              <div className="p-6">
                {/* Pure CSS/SVG Live 3D Model Viewport Card */}
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border-subtle relative group mb-5 shadow-lg bg-gradient-to-b from-[#090a0f] to-[#040508] flex items-center justify-center">
                  {/* Perspective grid floor */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(197,249,85,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197,249,85,0.15) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                      transform:
                        "perspective(300px) rotateX(60deg) translateY(20px)",
                      transformOrigin: "bottom center",
                    }}
                  />

                  {/* SVG Isometric 3D Model Graphic */}
                  <svg
                    className="w-28 h-28 relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <polygon
                      points="50,15 80,32 50,50 20,32"
                      fill="#718096"
                      stroke="#c5f955"
                      strokeWidth="0.8"
                    />
                    <polygon
                      points="20,32 50,50 50,82 20,64"
                      fill="#2d3748"
                      stroke="#c5f955"
                      strokeWidth="0.8"
                    />
                    <polygon
                      points="50,50 80,32 80,64 50,82"
                      fill="#1a202c"
                      stroke="#c5f955"
                      strokeWidth="0.8"
                    />
                    <circle cx="50" cy="50" r="3" fill="#c5f955" />
                    <ellipse
                      cx="50"
                      cy="33"
                      rx="12"
                      ry="6"
                      fill="#c5f955"
                      opacity="0.85"
                    />
                  </svg>

                  <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-lime border border-lime/30 shadow flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                    Live 3D Viewport
                  </div>

                  <div className="absolute bottom-2 left-3 text-[10px] font-mono text-text-muted">
                    cyber_rover.glb • 48.2k tris
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6 bg-bg-page/60 p-3.5 rounded-xl border border-border-subtle text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Formats</span>
                    <span className="text-lime font-bold font-mono text-[10px] px-2 py-0.5 bg-lime/10 rounded">
                      GLB • OBJ • FBX • STL • 3MF
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Texture Upscale</span>
                    <span className="text-pink font-bold font-mono text-[10px] px-2 py-0.5 bg-pink/10 rounded">
                      4K &amp; 8K PBR Maps
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Converter</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-400/10 rounded text-xs font-semibold text-emerald-400">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      Cross-Format Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Entitlement</span>
                    <span className="text-text-secondary font-medium">
                      2 Free Downloads • Pro Unlimited
                    </span>
                  </div>
                </div>

                {/* Download Action Button */}
                <button className="w-full py-3.5 bg-lime text-deep-black hover:bg-lime/90 transition-colors rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(197,249,85,0.2)]">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Export Model &amp; Textures
                </button>

                <p className="text-center mt-3 text-[11px] text-text-muted">
                  Client-side rendering. Zero API key configuration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
