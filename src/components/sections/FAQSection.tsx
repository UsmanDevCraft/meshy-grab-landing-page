"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { faqs } from "@/constants/constants";

export default function FAQSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-bg-elevated">
      <div className="container mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Everything you need to know about MeshyGrab.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              delay={i * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
  delay,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal bg-bg-card border border-border-subtle rounded-2xl overflow-hidden transition-colors duration-300 hover:border-lime/10"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left text-base font-semibold text-text-primary hover:text-lime transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {faq.q}
        <svg
          className={`w-5 h-5 text-text-muted flex-shrink-0 ml-4 transition-all duration-300 ${isOpen ? "rotate-180 text-lime" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "300px" : "0px",
          padding: isOpen ? "0 20px 20px" : "0 20px",
        }}
      >
        <p className="text-[0.9375rem] text-text-secondary leading-relaxed">
          {faq.a}
        </p>
      </div>
    </div>
  );
}
