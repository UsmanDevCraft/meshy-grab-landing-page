"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const featureList = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Simple",
    desc: "A focused workflow built around downloading your generated models without unnecessary complexity.",
  },
  {
    icon: (
      <svg
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
      </svg>
    ),
    title: "GLB Downloads",
    desc: "Download generated models as GLB files, the standard format for 3D web content.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Preview Before Download",
    desc: "See the available model preview before downloading to confirm it is the right file.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: "No API Token Setup",
    desc: "No need to manually provide Meshy API credentials. The extension handles the technical details.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20v-6M6 20V10M18 20V4" />
      </svg>
    ),
    title: "Smart Usage Tracking",
    desc: "Free usage and subscription entitlement are handled reliably so you always know where you stand.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    title: "Clean Interface",
    desc: "Modern light and dark extension themes that match your browser and system preferences.",
  },
];

export default function FeaturesSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="features" className="section-padding bg-bg-page">
      <div className="container mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Focused features built around one goal: getting your model files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={i * 50} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  delay,
}: {
  feature: (typeof featureList)[0];
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal relative p-8 bg-bg-card border border-border-subtle rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:border-lime/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(197,249,85,0.15)] group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="absolute inset-0 rounded-[20px] p-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(197,249,85,0.3), rgba(255,62,143,0.2))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="w-12 h-12 bg-lime/5 rounded-xl flex items-center justify-center mb-5">
        <div className="w-6 h-6 text-lime">{feature.icon}</div>
      </div>
      <h3 className="text-lg font-bold mb-2.5">{feature.title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        {feature.desc}
      </p>
    </div>
  );
}
