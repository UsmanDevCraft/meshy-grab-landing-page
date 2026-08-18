"use client";

import { useState, useEffect, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    if (video.readyState >= 3) {
      setIsVideoReady(true);
    }

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Some browsers may still require user interaction.
      }
    };

    playVideo();
  }, []);

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

              {!isVideoReady && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-xs transition-opacity duration-500">
                  <div className="h-10 w-10 rounded-full border-2 border-lime/40 border-t-lime animate-spin" />
                  <span className="text-xs text-text-muted font-medium tracking-wide">
                    Loading Preview Video...
                  </span>
                </div>
              )}

              <video
                ref={videoRef}
                autoPlay
                muted
                controls
                playsInline
                preload="auto"
                onLoadedData={() => setIsVideoReady(true)}
                onCanPlay={() => setIsVideoReady(true)}
                width={1080}
                height={675}
                src="/videos/meshy_grab_demo.mp4"
                aria-label="MeshyGrab demonstration"
                className="
                  block
                  aspect-video
                  h-auto
                  w-full
                  object-cover
                "
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
                border-lime/20
                bg-lime/5
                px-3
                py-1.5
                text-[11px]
                font-medium
                text-lime
                backdrop-blur-sm
                sm:px-3.5
                sm:text-xs
              "
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Chrome Extension for Meshy Users
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
              leading-[1.02]
              tracking-[-0.035em]
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            You generated the model.
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
              Now get the file.
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
              max-w-xl
              px-2
              text-[15px]
              leading-relaxed
              text-text-secondary
              sm:mt-6
              sm:text-base
              md:text-lg
            "
          >
            MeshyGrab is a lightweight Chrome extension that lets you preview
            and download the 3D models you&apos;ve generated in Meshy.
          </motion.p>

          {/* CTA */}

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
              gap-3
              sm:mt-8
              sm:w-auto
              sm:flex-row
            "
          >
            <Link
              href="/#pricing"
              className="btn btn-primary group w-full sm:w-auto"
            >
              Get MeshyGrab
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
              href="/#how-it-works"
              className="btn btn-secondary w-full sm:w-auto"
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Disclaimer */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.05,
            }}
            className="mt-5 text-[11px] text-text-muted sm:text-xs"
          >
            Independent third-party extension for Meshy users.
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
