"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import CometCard from "@/components/ui/CometCard";
import { getMeshyGrabStats, MeshyGrabStats } from "@/lib/stats";

function formatStatCount(count: number): string {
  return `${new Intl.NumberFormat("en-US").format(count)}+`;
}

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const particles: HTMLDivElement[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");

      particle.className =
        "absolute h-[3px] w-[3px] rounded-full bg-lime opacity-0";

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      particle.style.setProperty("--dx", `${(Math.random() - 0.5) * 200}px`);

      particle.style.setProperty("--dy", `${(Math.random() - 0.5) * 200}px`);

      particle.style.animation = `particle-drift ${10 + Math.random() * 10}s ease-in-out infinite`;

      particle.style.animationDelay = `${Math.random() * 15}s`;

      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((particle) => particle.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0" />
  );
}

export default function HeroSection() {
  const [stats, setStats] = useState<MeshyGrabStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getMeshyGrabStats()
      .then((data) => {
        if (!isMounted) return;
        // Verify valid positive metrics to never display zero placeholders
        if (data.users > 0 || data.downloads > 0 || data.installations > 0) {
          setStats(data);
        } else {
          setStats(null);
        }
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setStats(null);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="get"
        className="
          relative
          min-h-screen
          w-full
          overflow-hidden
          border-b
          border-white/5
          pt-24
          pb-16
          sm:pt-28
          sm:pb-20
          md:pt-32
        "
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Rotating mesh grid */}
          <div
            className="
              absolute
              left-1/2
              top-[38%]
              h-[420px]
              w-[420px]
              -translate-x-1/2
              -translate-y-1/2
              opacity-15
              sm:h-[520px]
              sm:w-[520px]
              md:h-[600px]
              md:w-[600px]
            "
          >
            <svg
              className="h-full w-full animate-mesh-rotate"
              viewBox="0 0 400 400"
              fill="none"
            >
              <defs>
                <pattern
                  id="hero-grid"
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

              <rect width="400" height="400" fill="url(#hero-grid)" />

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

          {/* Lime glow */}
          <div
            className="
              absolute
              right-[-120px]
              top-[8%]
              h-[300px]
              w-[300px]
              bg-gradient-radial-lime
              opacity-60
              animate-pulse-glow
              sm:right-0
              sm:h-[400px]
              sm:w-[400px]
            "
          />

          {/* Pink glow */}
          <div
            className="
              absolute
              bottom-[8%]
              left-[-120px]
              h-[280px]
              w-[280px]
              bg-gradient-radial-pink
              opacity-50
              animate-pulse-glow
              sm:left-0
              sm:h-[350px]
              sm:w-[350px]
            "
            style={{ animationDelay: "2s" }}
          />

          <Particles />

          {/* Central atmospheric glow */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_50%_25%,rgba(197,249,85,0.035),transparent_42%)]
            "
          />
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            w-full
            max-w-7xl
            flex-col
            items-center
            px-4
            text-center
            sm:px-6
            md:px-8
          "
        >
          <m.div
            className="w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <CometCard
              className="mx-auto w-full max-w-[1080px]"
              rotateDepth={10}
              translateDepth={12}
              glareOpacity={0.18}
              scaleFactor={1.018}
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-black/40
                  shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                  sm:rounded-2xl
                  sm:shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                "
              >
                {/* Ambient glow behind video */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -inset-10
                    -z-10
                    bg-[radial-gradient(ellipse_at_center,rgba(197,249,85,0.14),transparent_65%)]
                    blur-3xl
                  "
                />

                {isVideoPlaying ? (
                  <iframe
                    src="https://www.youtube.com/embed/w_U_WBp6uNo?autoplay=1"
                    title="MeshyGrab demonstration"
                    width={1080}
                    height={675}
                    className="
                      block
                      aspect-video
                      h-auto
                      w-full
                      border-0
                    "
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden bg-black/60 group">
                    {/* YouTube High-Resolution Poster Facade */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/MeshyGrab_The_Ultimate_3D_Toolkit.png"
                      alt="MeshyGrab Demonstration Preview"
                      width={1080}
                      height={675}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    {/* Centered Play Button Facade */}
                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(true)}
                      aria-label="Play MeshyGrab demonstration video"
                      className="absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none"
                    >
                      <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-deep-black/80 border border-lime/40 backdrop-blur-md shadow-[0_0_40px_rgba(197,249,85,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:border-lime group-hover:shadow-[0_0_60px_rgba(197,249,85,0.6)]">
                        <div className="absolute inset-0 rounded-full bg-lime/15 animate-ping opacity-25 pointer-events-none" />
                        <svg
                          className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-lime translate-x-0.5 transition-transform duration-200 group-hover:scale-110"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                )}

                {/* Cinematic bottom fade */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-[32%]
                    bg-gradient-to-b
                    from-transparent
                    via-[#050505]/35
                    to-[#050505]
                    sm:h-[36%]
                  "
                />

                {/* Subtle vignette */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.22)_100%)]
                  "
                />
              </div>
            </CometCard>
          </m.div>

          <div
            className="
              relative
              z-10
              -mt-1
              flex
              max-w-3xl
              flex-col
              items-center
              px-1
              sm:-mt-4
              md:-mt-7
            "
          >
            {/* Badge */}
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1,
              }}
              whileHover={{
                y: -2,
                scale: 1.01,
              }}
              className="mb-5 sm:mb-6"
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-lime/30
                  bg-lime/10
                  px-3.5
                  py-1.5
                  text-[11px]
                  font-bold
                  text-lime
                  backdrop-blur-sm
                  shadow-[0_0_15px_rgba(197,249,85,0.15)]
                  sm:px-4
                  sm:text-xs
                  tracking-wide
                  uppercase
                "
              >
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                All-in-One 3D Asset Toolkit
              </div>
            </m.div>

            {/* Headline */}
            <m.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.15,
              }}
              className="
                max-w-4xl
                text-[2.6rem]
                font-extrabold
                leading-[1.04]
                tracking-[-0.035em]
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Your 3D Models.
              <br />
              <span
                className="
                  bg-[linear-gradient(135deg,#c5f955_0%,#00f2fe_25%,#a855f7_50%,#ff3e8f_75%,#fbbf24_90%,#c5f955_100%)]
                  bg-[length:300%_300%]
                  bg-clip-text
                  text-transparent
                  animate-gradient-shift
                  inline-block
                  pb-1
                "
              >
                One Powerful Workspace.
              </span>
            </m.h1>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
              }}
              className="
                mt-5
                max-w-2xl
                px-2
                text-[15px]
                leading-relaxed
                text-text-secondary
                sm:mt-6
                sm:text-base
                md:text-lg
              "
            >
              View and render 3D models, convert files between supported
              formats, upscale PBR textures to 4K and 8K, and export models and
              textures from Meshy AI and supported community sources.
            </m.p>

            {/* Community Statistics */}
            {(isLoading || stats) && (
              <m.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.25,
                }}
                className="
                  relative
                  mt-6
                  w-full
                  max-w-md
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-bg-card/75
                  p-2.5
                  backdrop-blur-md
                  shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                  sm:mt-7
                  sm:max-w-lg
                  sm:p-3.5
                "
              >
                {/* Subtle multi-accent background glow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -inset-px
                    rounded-2xl
                    bg-gradient-to-r
                    from-lime/10
                    via-[#00f2fe]/10
                    to-pink/10
                    opacity-30
                    blur-sm
                  "
                />

                <div className="relative z-10 grid grid-cols-3 divide-x divide-white/10">
                  {isLoading ? (
                    <>
                      <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-1 sm:px-4">
                        <div className="h-5 w-14 rounded-md bg-white/10 animate-pulse sm:h-7 sm:w-16" />
                        <div className="h-3 w-10 rounded bg-white/5 animate-pulse sm:w-12" />
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-1 sm:px-4">
                        <div className="h-5 w-14 rounded-md bg-white/10 animate-pulse sm:h-7 sm:w-16" />
                        <div className="h-3 w-14 rounded bg-white/5 animate-pulse sm:w-16" />
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-1 sm:px-4">
                        <div className="h-5 w-14 rounded-md bg-white/10 animate-pulse sm:h-7 sm:w-16" />
                        <div className="h-3 w-16 rounded bg-white/5 animate-pulse sm:w-18" />
                      </div>
                    </>
                  ) : stats ? (
                    <>
                      <div className="flex flex-col items-center justify-center px-2 py-0.5 sm:px-4 sm:py-1">
                        <span className="text-base font-extrabold tracking-tight text-lime sm:text-xl md:text-2xl">
                          {formatStatCount(stats.users)}
                        </span>
                        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-secondary sm:text-xs">
                          Users
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center px-2 py-0.5 sm:px-4 sm:py-1">
                        <span className="text-base font-extrabold tracking-tight text-[#00f2fe] sm:text-xl md:text-2xl">
                          {formatStatCount(stats.downloads)}
                        </span>
                        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-secondary sm:text-xs">
                          Downloads
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center px-2 py-0.5 sm:px-4 sm:py-1">
                        <span className="text-base font-extrabold tracking-tight text-pink sm:text-xl md:text-2xl">
                          {formatStatCount(stats.installations)}
                        </span>
                        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-secondary sm:text-xs">
                          Installations
                        </span>
                      </div>
                    </>
                  ) : null}
                </div>
              </m.div>
            )}

            {/* CTA Buttons */}
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3,
              }}
              className="
                mt-7
                flex
                w-full
                flex-col
                items-center
                justify-center
                gap-3
                sm:mt-8
                sm:w-auto
                sm:flex-row
                flex-wrap
              "
            >
              <Link
                href="#tools"
                className="btn btn-primary group w-full sm:w-auto font-bold shadow-[0_0_25px_rgba(197,249,85,0.3)]"
              >
                Explore MeshyGrab
                <svg
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
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

              <Link
                href="https://chromewebstore.google.com/detail/jkddfapkjenldpiacoccgheimcokhmcc?utm_source=item-share-cb"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full sm:w-auto font-bold border-lime/30 hover:border-lime"
              >
                Get the Chrome Extension
              </Link>

              <Link
                href="#features"
                className="btn btn-secondary w-full sm:w-auto text-text-secondary hover:text-text-primary"
              >
                Explore Features
              </Link>
            </m.div>

            {/* Core Pillars Quick Pills */}
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-xl"
            >
              <span className="px-3 py-1 rounded-lg bg-bg-card border border-border-subtle text-[11px] font-mono text-text-secondary">
                🎨 3D Workspace
              </span>
              <span className="px-3 py-1 rounded-lg bg-bg-card border border-border-subtle text-[11px] font-mono text-lime">
                ⚡ GLB • OBJ • FBX • STL • 3MF
              </span>
              <span className="px-3 py-1 rounded-lg bg-bg-card border border-border-subtle text-[11px] font-mono text-pink">
                ✨ 4K / 8K PBR Upscaler
              </span>
              <span className="px-3 py-1 rounded-lg bg-bg-card border border-border-subtle text-[11px] font-mono text-text-secondary">
                🌐 Meshy & Tripo3D
              </span>
            </m.div>

            {/* Disclaimer */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
              }}
              className="mt-6 text-[11px] text-text-secondary sm:text-xs max-w-lg leading-relaxed"
            >
              Built for 3D artists, game developers, designers, 3D printing
              enthusiasts, and AI creators. Independent third-party product not
              affiliated with Meshy or Tripo3D.
            </m.p>
          </div>
        </div>

        <m.div
          aria-hidden="true"
          className="
            absolute
            bottom-5
            left-1/2
            hidden
            -translate-x-1/2
            sm:block
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
        >
          <m.div
            className="
              flex
              h-8
              w-5
              items-start
              justify-center
              rounded-full
              border
              border-text-muted/30
              p-1.5
            "
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="h-1.5 w-1 rounded-full bg-text-muted/50" />
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
