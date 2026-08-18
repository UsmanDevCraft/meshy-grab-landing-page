"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { steps } from "@/constants/constants";

export default function StepsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="section-padding bg-bg-page">
      <div className="container mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime mb-4">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            From model creation to downloading your GLB asset in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, delay }: { step: (typeof steps)[0]; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal h-full"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-full relative text-left p-8 bg-bg-card border border-border-subtle rounded-[20px] transition-all duration-200 ease-out hover:border-lime/30 hover:shadow-[0_0_30px_rgba(197,249,85,0.15)] hover:-translate-y-1">
        <div className="w-12 h-12 bg-lime text-deep-black rounded-xl flex items-center justify-center text-lg font-extrabold mb-6 font-mono">
          {step.num}
        </div>
        <h3 className="text-xl font-bold mb-2.5">{step.title}</h3>
        <p className="text-[0.9375rem] text-text-secondary leading-relaxed">
          {step.desc}
        </p>
      </div>
    </div>
  );
}
