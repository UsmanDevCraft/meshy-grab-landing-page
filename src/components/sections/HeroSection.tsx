"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import CometCard from "@/components/ui/CometCard";

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const count = 20;

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
  return (
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
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
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

              <iframe
                src="https://www.youtube.com/embed/w_U_WBp6uNo"
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
        </motion.div>

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

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.45,
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
          </motion.div>

          {/* Headline */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.58,
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
                bg-[linear-gradient(90deg,#C5F955_0%,#FF3E8F_100%)]
                bg-[length:200%_200%]
                bg-clip-text
                text-transparent
                animate-gradient-shift
              "
            >
              One Powerful Workspace.
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.72,
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
            View and render 3D models, convert files between supported formats,
            upscale PBR textures to 4K and 8K, and export models and textures
            from Meshy AI and supported community sources.
          </motion.p>

          {/* CTA Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.86,
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
          </motion.div>

          {/* Core Pillars Quick Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
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
          </motion.div>

          {/* Disclaimer */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.1,
            }}
            className="mt-6 text-[11px] text-text-muted sm:text-xs max-w-lg leading-relaxed"
          >
            Built for 3D artists, game developers, designers, 3D printing
            enthusiasts, and AI creators. Independent third-party product not
            affiliated with Meshy or Tripo3D.
          </motion.p>
        </div>
      </div>

      <motion.div
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
          delay: 1.4,
          duration: 0.7,
        }}
      >
        <motion.div
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
        </motion.div>
      </motion.div>
    </section>
  );
}
