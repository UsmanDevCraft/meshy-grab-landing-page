"use client";

import { useState } from "react";
import { useActiveSale } from "@/hooks/useActiveSale";

/**
 * HalloweenPricingDecor
 *
 * Renders an exclusive, playful Halloween animation overlay over the pricing section.
 * Includes:
 * - Intricate draped corner spider webs (top-left & top-right)
 * - An animated spider descending on a silk thread with a gentle swinging pendulum animation
 * - Interactive easter egg: hovering over the spider triggers a playful fright reaction with a mini speech bubble
 * - Floating silhouette bats gliding across the header atmosphere
 * - Eerie ambient orange/purple glow effects
 *
 * All decorative overlays use `pointer-events: none` to guarantee that pricing cards,
 * CTA buttons, and interactive toggles remain 100% accessible.
 */
export default function HalloweenPricingDecor() {
  const { isActive, saleData } = useActiveSale();
  const [spiderWiggle, setSpiderWiggle] = useState(false);

  // Strict conditional guard: Only render if a sale is active AND the active sale ID is 'halloween_2026'
  if (!isActive || saleData?.id !== "halloween_2026") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none"
    >
      <style>{`
        @keyframes spider-descend {
          0% {
            transform: translateY(-120px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes spider-swing {
          0%, 100% {
            transform: rotate(-6deg);
            transform-origin: top center;
          }
          50% {
            transform: rotate(6deg);
            transform-origin: top center;
          }
        }

        @keyframes bat-fly-left {
          0% {
            transform: translate(0, 0) scale(0.9);
            opacity: 0;
          }
          20% {
            opacity: 0.35;
          }
          50% {
            transform: translate(120px, -15px) scale(1);
            opacity: 0.45;
          }
          80% {
            opacity: 0.35;
          }
          100% {
            transform: translate(250px, -5px) scale(0.95);
            opacity: 0;
          }
        }

        @keyframes bat-fly-right {
          0% {
            transform: translate(0, 0) scale(0.85);
            opacity: 0;
          }
          25% {
            opacity: 0.35;
          }
          60% {
            transform: translate(-140px, 18px) scale(0.95);
            opacity: 0.4;
          }
          85% {
            opacity: 0.25;
          }
          100% {
            transform: translate(-280px, 5px) scale(0.9);
            opacity: 0;
          }
        }

        @keyframes bat-flap {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.65);
          }
        }

        @keyframes web-pulse {
          0%, 100% {
            opacity: 0.38;
          }
          50% {
            opacity: 0.58;
          }
        }

        .anim-spider-entrance {
          animation: spider-descend 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .anim-spider-swing {
          animation: spider-swing 4s ease-in-out infinite alternate;
          transform-origin: top center;
        }

        .anim-bat-left {
          animation: bat-fly-left 14s ease-in-out infinite;
        }

        .anim-bat-right {
          animation: bat-fly-right 18s ease-in-out 3s infinite;
        }

        .anim-bat-flap {
          animation: bat-flap 0.6s ease-in-out infinite alternate;
          transform-origin: center;
        }

        .anim-web-glow {
          animation: web-pulse 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-spider-entrance,
          .anim-spider-swing,
          .anim-bat-left,
          .anim-bat-right,
          .anim-bat-flap,
          .anim-web-glow {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Atmospheric Eerie Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Left Corner Spider Web */}
      <div className="absolute top-0 left-0 w-44 sm:w-60 h-44 sm:h-60 anim-web-glow text-orange-400/40 pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(251,146,60,0.25)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          {/* Radial Spokes */}
          <line x1="0" y1="0" x2="200" y2="0" />
          <line x1="0" y1="0" x2="190" y2="50" />
          <line x1="0" y1="0" x2="160" y2="105" />
          <line x1="0" y1="0" x2="115" y2="155" />
          <line x1="0" y1="0" x2="60" y2="185" />
          <line x1="0" y1="0" x2="0" y2="200" />

          {/* Concentric Connecting Arcs */}
          {/* Ring 1 */}
          <path d="M 30 0 Q 28 8 24 16 Q 16 24 8 28 Q 0 30 0 30" />
          {/* Ring 2 */}
          <path d="M 60 0 Q 55 16 48 32 Q 34 48 18 55 Q 0 60 0 60" />
          {/* Ring 3 */}
          <path d="M 95 0 Q 88 25 76 52 Q 54 78 28 88 Q 0 95 0 95" />
          {/* Ring 4 */}
          <path d="M 135 0 Q 125 36 108 73 Q 76 110 40 126 Q 0 135 0 135" />
          {/* Ring 5 */}
          <path d="M 175 0 Q 162 47 140 95 Q 98 142 52 163 Q 0 175 0 175" />
        </svg>
      </div>

      {/* Top Right Corner Spider Web */}
      <div className="absolute top-0 right-0 w-44 sm:w-60 h-44 sm:h-60 anim-web-glow text-purple-400/35 pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(192,132,252,0.25)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          {/* Radial Spokes (mirrored) */}
          <line x1="200" y1="0" x2="0" y2="0" />
          <line x1="200" y1="0" x2="10" y2="50" />
          <line x1="200" y1="0" x2="40" y2="105" />
          <line x1="200" y1="0" x2="85" y2="155" />
          <line x1="200" y1="0" x2="140" y2="185" />
          <line x1="200" y1="0" x2="200" y2="200" />

          {/* Concentric Connecting Arcs */}
          {/* Ring 1 */}
          <path d="M 170 0 Q 172 8 176 16 Q 184 24 192 28 Q 200 30 200 30" />
          {/* Ring 2 */}
          <path d="M 140 0 Q 145 16 152 32 Q 166 48 182 55 Q 200 60 200 60" />
          {/* Ring 3 */}
          <path d="M 105 0 Q 112 25 124 52 Q 146 78 172 88 Q 200 95 200 95" />
          {/* Ring 4 */}
          <path d="M 65 0 Q 75 36 92 73 Q 124 110 160 126 Q 200 135 200 135" />
          {/* Ring 5 */}
          <path d="M 25 0 Q 38 47 60 95 Q 102 142 148 163 Q 200 175 200 175" />
        </svg>
      </div>

      {/* Floating Ghost Bats Gliding across Top Atmosphere */}
      <div className="absolute top-6 left-1/4 anim-bat-left pointer-events-none hidden sm:block">
        <div className="anim-bat-flap">
          <svg
            className="w-7 h-5 text-orange-400/40 drop-shadow-[0_0_6px_rgba(251,146,60,0.4)]"
            viewBox="0 0 40 24"
            fill="currentColor"
          >
            <path d="M20 10 C22 6, 25 3, 30 3 C36 3, 39 8, 40 14 C36 12, 32 14, 29 17 C26 15, 23 16, 20 20 C17 16, 14 15, 11 17 C8 14, 4 12, 0 14 C1 8, 4 3, 10 3 C15 3, 18 6, 20 10 Z" />
            <circle cx="18.5" cy="11" r="0.8" fill="#ffedd5" />
            <circle cx="21.5" cy="11" r="0.8" fill="#ffedd5" />
          </svg>
        </div>
      </div>

      <div className="absolute top-12 right-1/4 anim-bat-right pointer-events-none hidden md:block">
        <div className="anim-bat-flap">
          <svg
            className="w-6 h-4 text-purple-400/35 drop-shadow-[0_0_6px_rgba(192,132,252,0.4)]"
            viewBox="0 0 40 24"
            fill="currentColor"
          >
            <path d="M20 10 C22 6, 25 3, 30 3 C36 3, 39 8, 40 14 C36 12, 32 14, 29 17 C26 15, 23 16, 20 20 C17 16, 14 15, 11 17 C8 14, 4 12, 0 14 C1 8, 4 3, 10 3 C15 3, 18 6, 20 10 Z" />
            <circle cx="18.5" cy="11" r="0.8" fill="#f5d0fe" />
            <circle cx="21.5" cy="11" r="0.8" fill="#f5d0fe" />
          </svg>
        </div>
      </div>

      {/* Hanging Silk Thread & Descending Spider */}
      {/* Positioned on the left side of the hero header so it frames the title without overlapping cards */}
      <div className="absolute top-0 left-6 sm:left-14 md:left-20 lg:left-28 z-20">
        <div className="anim-spider-entrance">
          <div className="anim-spider-swing flex flex-col items-center">
            {/* Silk Thread */}
            <div className="w-[1.5px] h-20 sm:h-28 md:h-32 bg-gradient-to-b from-white/40 via-orange-300/30 to-orange-400/50 shadow-[0_0_4px_rgba(255,255,255,0.4)]" />

            {/* Spider Body - Interactive on hover/click */}
            <div
              role="img"
              aria-label="Spooky Halloween Spider"
              onMouseEnter={() => setSpiderWiggle(true)}
              onMouseLeave={() => setSpiderWiggle(false)}
              onClick={() => setSpiderWiggle((prev) => !prev)}
              className={`relative pointer-events-auto cursor-pointer transition-transform duration-300 ${
                spiderWiggle ? "scale-125 -translate-y-1" : "hover:scale-110"
              }`}
            >
              {/* Interactive Speech Bubble */}
              {spiderWiggle && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-black/90 border border-orange-500/60 rounded-xl text-[10px] font-extrabold text-orange-400 whitespace-nowrap shadow-[0_0_12px_rgba(249,115,22,0.4)] pointer-events-none animate-bounce">
                  <span>Boo! 67% Off 🎃</span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                </div>
              )}

              {/* Spider SVG */}
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 text-[#1c1c24] drop-shadow-[0_4px_10px_rgba(249,115,22,0.35)]"
                viewBox="0 0 64 64"
                fill="currentColor"
              >
                {/* 8 Articulated Spooky Legs */}
                <g
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="text-neutral-900"
                >
                  {/* Left Legs */}
                  <path d="M 28 28 Q 16 16 8 22 Q 4 28 2 36" />
                  <path d="M 26 32 Q 12 28 6 36 Q 2 44 4 50" />
                  <path d="M 26 36 Q 14 38 8 46 Q 6 52 8 58" />
                  <path d="M 28 40 Q 18 48 14 56 Q 12 60 16 63" />

                  {/* Right Legs */}
                  <path d="M 36 28 Q 48 16 56 22 Q 60 28 62 36" />
                  <path d="M 38 32 Q 52 28 58 36 Q 62 44 60 50" />
                  <path d="M 38 36 Q 50 38 56 46 Q 58 52 56 58" />
                  <path d="M 36 40 Q 46 48 50 56 Q 52 60 48 63" />
                </g>

                {/* Abdomen & Head */}
                <ellipse
                  cx="32"
                  cy="40"
                  rx="10"
                  ry="13"
                  className="fill-neutral-950 stroke-orange-500/50"
                  strokeWidth="1.2"
                />
                <circle
                  cx="32"
                  cy="26"
                  r="7.5"
                  className="fill-neutral-900 stroke-orange-500/50"
                  strokeWidth="1.2"
                />

                {/* Spooky Glowing Spider Eyes */}
                <circle
                  cx="29"
                  cy="24"
                  r="1.7"
                  className="fill-orange-500 shadow-[0_0_6px_#f97316] animate-pulse"
                />
                <circle
                  cx="35"
                  cy="24"
                  r="1.7"
                  className="fill-orange-500 shadow-[0_0_6px_#f97316] animate-pulse"
                />
                <circle cx="27" cy="27" r="1" className="fill-orange-400" />
                <circle cx="37" cy="27" r="1" className="fill-orange-400" />

                {/* Abdomen Hourglass / Spooky Marking */}
                <path
                  d="M 30 36 L 34 36 L 31 41 L 33 41 L 30 46"
                  stroke="#f97316"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
