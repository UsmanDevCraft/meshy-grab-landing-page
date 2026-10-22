"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { audienceList } from "@/constants/constants";

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
            <AudienceCard key={item} title={item} delay={i * 50} />
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

function AudienceCard({ title, delay }: { title: string; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal h-full"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-full p-5 bg-bg-card border border-border-subtle rounded-2xl flex items-center gap-3 transition-all duration-200 ease-out hover:border-lime/30 hover:shadow-[0_0_20px_rgba(197,249,85,0.12)] hover:-translate-y-0.5">
        <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center flex-shrink-0 text-lime">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-text-primary">{title}</span>
      </div>
    </div>
  );
}
