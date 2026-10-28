"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { valueProps } from "@/constants/constants";

const featureIcons = [
  // Download what you generated
  <svg
    key="1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>,
  // Preview before downloading
  <svg
    key="2"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // Simple Chrome extension
  <svg
    key="3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>,
  // No manual API-token setup
  <svg
    key="4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>,
  // 2 free downloads
  <svg
    key="5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,
  // Unlimited with Pro
  <svg
    key="6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
];

const cardThemes = [
  {
    gradient: "from-indigo-500 via-purple-500 to-violet-600",
    badge: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
    hoverBorder:
      "hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_35px_rgba(99,102,241,0.2)]",
  },
  {
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    badge: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    hoverBorder:
      "hover:border-emerald-500/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_35px_rgba(16,185,129,0.2)]",
  },
  {
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    badge: "text-pink-400 bg-pink-500/10 border-pink-500/25",
    hoverBorder:
      "hover:border-pink-500/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_35px_rgba(244,63,94,0.2)]",
  },
  {
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
    hoverBorder:
      "hover:border-cyan-500/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_35px_rgba(6,182,212,0.2)]",
  },
  {
    gradient: "from-amber-400 via-orange-500 to-yellow-500",
    badge: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    hoverBorder:
      "hover:border-amber-500/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_35px_rgba(245,158,11,0.2)]",
  },
  {
    gradient: "from-lime via-emerald-400 to-teal-400",
    badge: "text-lime bg-lime/10 border-lime/25",
    hoverBorder:
      "hover:border-lime/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_35px_rgba(197,249,85,0.2)]",
  },
];

export default function FeaturesSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="features" className="section-padding bg-bg-page">
      <div className="container mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime mb-4 uppercase tracking-wider">
            Why Choose MeshyGrab
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
            Engineered for Modern 3D Creators
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            From real-time geometry inspection to neural 4K/8K PBR upscaling and
            universal file conversion, MeshyGrab powers every step of your 3D
            workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueProps.map((vp, i) => (
            <FeatureCard
              key={vp.title}
              index={i}
              title={vp.title}
              desc={vp.desc}
              icon={featureIcons[i]}
              theme={cardThemes[i % cardThemes.length]}
              delay={i * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  index,
  title,
  desc,
  icon,
  theme,
  delay,
}: {
  index: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  theme: (typeof cardThemes)[0];
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal h-full"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`h-full relative p-8 bg-bg-card border border-border-subtle rounded-[24px] transition-all duration-300 ease-out hover:-translate-y-1.5 ${theme.hoverBorder} group overflow-hidden`}
      >
        {/* Subtle ambient colored glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl pointer-events-none`}
        />

        <div className="relative z-10 flex items-center justify-between mb-6">
          {/* Vivid Gradient Icon Container */}
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shadow-lg border border-white/15 group-hover:scale-110 transition-transform duration-300`}
          >
            <div className="w-6 h-6">{icon}</div>
          </div>
          <span
            className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${theme.badge}`}
          >
            Pillar 0{index + 1}
          </span>
        </div>

        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-2.5 text-text-primary group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}
