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

export default function FeaturesSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="features" className="section-padding bg-bg-page">
      <div className="container mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime mb-4">
            Focused Benefits
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
            Built for your workflow
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Clear, practical features designed around one job: getting your GLB
            file.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueProps.map((vp, i) => (
            <FeatureCard
              key={vp.title}
              title={vp.title}
              desc={vp.desc}
              icon={featureIcons[i]}
              delay={i * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
  delay,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal h-full"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-full relative p-8 bg-bg-card border border-border-subtle rounded-[20px] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-lime/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_30px_rgba(197,249,85,0.12)] group">
        <div className="w-12 h-12 bg-lime/5 rounded-xl flex items-center justify-center mb-5 group-hover:bg-lime/10 transition-colors">
          <div className="w-6 h-6 text-lime">{icon}</div>
        </div>
        <h3 className="text-lg font-bold mb-2.5">{title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
