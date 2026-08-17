"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { steps } from "@/constants/constants";

export default function StepsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="section-padding bg-bg-page">
      <div className="container mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Three simple steps from model to file.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="hidden md:block absolute top-[68px] left-[calc(33.33%+20px)] w-[calc(33.33%-40px)] h-0.5 bg-gradient-to-r from-lime to-pink opacity-30" />
          <div className="hidden md:block absolute top-[68px] left-[calc(66.66%+20px)] w-[calc(33.33%-40px)] h-0.5 bg-gradient-to-r from-lime to-pink opacity-30" />

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
      className="reveal relative text-center p-10 bg-bg-card border border-border-subtle rounded-[20px] transition-all duration-300 hover:border-border-glow hover:shadow-[0_0_40px_rgba(197,249,85,0.15)] hover:-translate-y-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 bg-lime text-deep-black rounded-2xl flex items-center justify-center text-xl font-extrabold mx-auto mb-6">
        {step.num}
      </div>
      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
      <p className="text-[0.9375rem] text-text-secondary leading-relaxed">
        {step.desc}
      </p>
    </div>
  );
}
