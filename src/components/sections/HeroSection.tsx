"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "absolute w-[3px] h-[3px] bg-lime rounded-full opacity-0";
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.setProperty("--dx", `${(Math.random() - 0.5) * 200}px`);
      p.style.setProperty("--dy", `${(Math.random() - 0.5) * 200}px`);
      p.style.animation = `particle-drift ${10 + Math.random() * 10}s ease-in-out infinite`;
      p.style.animationDelay = `${Math.random() * 15}s`;
      container.appendChild(p);
      particles.push(p);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
  );
}

export default function HeroSection() {
  return (
    <section
      id="get"
      className="min-h-screen flex items-center pt-36 pb-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-15">
          <svg
            className="w-full h-full animate-mesh-rotate"
            viewBox="0 0 400 400"
            fill="none"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(197,249,85,0.15)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#grid)" />
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="rgba(255,62,143,0.1)"
              strokeWidth="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="100"
              fill="none"
              stroke="rgba(197,249,85,0.1)"
              strokeWidth="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="50"
              fill="none"
              stroke="rgba(197,249,85,0.15)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-gradient-radial-lime animate-pulse-glow" />
        <div
          className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-gradient-radial-pink animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        <Particles />
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-lime/5 border border-lime/20 rounded-full text-xs font-medium text-lime mb-6">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Chrome Extension for Meshy Users
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-5">
              You generated the model.
              <br />
              <span className="bg-gradient-lime-pink bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-shift">
                Now get the file.
              </span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-md">
              MeshyGrab is a lightweight Chrome extension that lets you preview
              and download the 3D models you&apos;ve generated in Meshy.
            </p>

            <div className="flex flex-wrap gap-4 mb-5">
              <Link href="/#pricing" className="btn btn-primary">
                Get MeshyGrab
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/#how-it-works" className="btn btn-secondary">
                See How It Works
              </Link>
            </div>

            <p className="text-xs text-text-muted">
              Independent third-party extension for Meshy users.
            </p>
          </div>

          <div className="relative flex items-center justify-center order-first lg:order-last">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              <div className="absolute top-1/2 left-1/2 w-[220px] h-[220px] md:w-[280px] md:h-[280px] border border-lime/15 rounded-full animate-mesh-rotate-fast" />
              <div className="absolute top-1/2 left-1/2 w-[260px] h-[260px] md:w-[340px] md:h-[340px] border border-pink/10 rounded-full animate-mesh-rotate-slow" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] md:w-[180px] md:h-[180px] animate-float">
                <svg
                  className="w-full h-full drop-shadow-[0_0_30px_rgba(197,249,85,0.3)]"
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <defs>
                    <linearGradient
                      id="cubeGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#C5F955" stopOpacity="0.9" />
                      <stop
                        offset="100%"
                        stopColor="#FF3E8F"
                        stopOpacity="0.6"
                      />
                    </linearGradient>
                    <linearGradient
                      id="cubeGrad2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#C5F955" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#FF3E8F"
                        stopOpacity="0.2"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M60 80 L100 60 L140 80 L140 130 L100 150 L60 130 Z"
                    fill="url(#cubeGrad2)"
                    stroke="url(#cubeGrad)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M60 80 L100 100 L140 80"
                    fill="none"
                    stroke="url(#cubeGrad)"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  <path
                    d="M100 100 L100 150"
                    fill="none"
                    stroke="url(#cubeGrad)"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  <path
                    d="M75 90 L100 80 L125 90 L125 120 L100 130 L75 120 Z"
                    fill="none"
                    stroke="url(#cubeGrad)"
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <circle cx="100" cy="60" r="3" fill="#C5F955" opacity="0.8" />
                  <circle cx="60" cy="80" r="2" fill="#C5F955" opacity="0.6" />
                  <circle cx="140" cy="80" r="2" fill="#FF3E8F" opacity="0.6" />
                  <circle
                    cx="100"
                    cy="150"
                    r="3"
                    fill="#FF3E8F"
                    opacity="0.8"
                  />
                </svg>
              </div>

              <div
                className="absolute bottom-[60px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <svg
                  className="w-6 h-6 text-lime"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                <span className="text-xs text-text-muted uppercase tracking-widest font-mono">
                  GLB FILE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
