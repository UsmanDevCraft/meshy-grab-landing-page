"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { audienceList } from "@/constants/constants";

const audienceThemes = [
  // 1. Game Developers (Unreal & Unity)
  {
    gradient: "from-indigo-500 via-purple-500 to-violet-600",
    hoverBorder:
      "hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <line x1="15" y1="13" x2="15.01" y2="13" />
        <line x1="18" y1="11" x2="18.01" y2="11" />
        <rect x="2" y="6" width="20" height="12" rx="6" />
      </svg>
    ),
  },
  // 2. 3D Printing Enthusiasts (STL / 3MF)
  {
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    hoverBorder:
      "hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  // 3. VFX & 3D Environment Artists
  {
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    hoverBorder:
      "hover:border-pink-500/40 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
  },
  // 4. Indie Game Studios & Solo Creators
  {
    gradient: "from-amber-400 via-orange-500 to-yellow-500",
    hoverBorder:
      "hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 9v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  // 5. Digital Product Designers
  {
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    hoverBorder:
      "hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  // 6. AI 3D Asset Creators & Modelers
  {
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    hoverBorder:
      "hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 7h10" />
        <path d="M7 12h10" />
        <path d="M7 17h10" />
      </svg>
    ),
  },
  // 7. Material & Texture Artists
  {
    gradient: "from-rose-500 via-pink-500 to-amber-500",
    hoverBorder:
      "hover:border-rose-500/40 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z" />
      </svg>
    ),
  },
  // 8. Architectural Visualizers
  {
    gradient: "from-lime via-emerald-400 to-teal-400",
    hoverBorder:
      "hover:border-lime/40 hover:shadow-[0_0_25px_rgba(197,249,85,0.2)]",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M10 18h4" />
      </svg>
    ),
  },
];

export default function AudienceSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="audience" className="section-padding bg-bg-elevated">
      <div className="container mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime mb-4 uppercase tracking-wider">
            Target Audience
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
            Who is MeshyGrab for?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            MeshyGrab is built for 3D artists, game developers, designers, 3D
            printing enthusiasts, indie creators, and AI modelers who need a
            streamlined toolkit to inspect, convert, enhance, and export 3D
            models.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {audienceList.map((item, i) => (
            <AudienceCard
              key={item}
              title={item}
              theme={audienceThemes[i % audienceThemes.length]}
              delay={i * 50}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-text-muted max-w-xl mx-auto">
            Whether you work with Meshy AI, Tripo3D, or your own local 3D
            models, MeshyGrab accelerates your asset preparation and export
            workflow.
          </p>
        </div>
      </div>
    </section>
  );
}

function AudienceCard({
  title,
  theme,
  delay,
}: {
  title: string;
  theme: (typeof audienceThemes)[0];
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
        className={`h-full p-4 sm:p-5 bg-bg-card border border-border-subtle rounded-2xl flex items-center gap-3.5 transition-all duration-300 ease-out ${theme.hoverBorder} hover:-translate-y-1 relative overflow-hidden group shadow-md`}
      >
        {/* Subtle ambient colored glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl pointer-events-none`}
        />

        <div
          className={`relative z-10 w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center flex-shrink-0 text-white shadow-md border border-white/15 group-hover:scale-110 transition-transform duration-300`}
        >
          {theme.icon}
        </div>
        <span className="relative z-10 text-sm font-bold text-text-primary group-hover:text-white transition-colors leading-snug">
          {title}
        </span>
      </div>
    </div>
  );
}
