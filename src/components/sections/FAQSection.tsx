"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "What is MeshyGrab?",
    a: "MeshyGrab is an independent browser extension designed to make downloading generated Meshy models as GLB files easier. It provides a simple interface for grabbing your 3D models without needing to understand APIs or manage tokens.",
  },
  {
    q: "Is MeshyGrab an official Meshy product?",
    a: "No. MeshyGrab is an independent third-party product and is not affiliated with, endorsed by, or sponsored by Meshy. Meshy and its trademarks remain the property of their respective owners.",
  },
  {
    q: "Do I need a Meshy API key?",
    a: "The product is designed not to require users to manually provide an API token. MeshyGrab handles the technical integration so you can focus on downloading your models.",
  },
  {
    q: "What file format does MeshyGrab download?",
    a: "GLB. This is the standard binary format for glTF 3D models, widely supported by 3D software, game engines, and web viewers.",
  },
  {
    q: "How many free downloads do I get?",
    a: "The current plan provides 2 free model downloads. After that, you can upgrade to Pro for unlimited downloads.",
  },
  {
    q: "What does Pro include?",
    a: "Pro provides unlimited downloads for the current monthly subscription price of $0.99/month. You also get continued access to all MeshyGrab features without usage limits.",
  },
  {
    q: "Does MeshyGrab store my 3D models?",
    a: "No. The backend is used for entitlement and usage accounting only. The actual model download remains client-side, meaning the file goes directly from Meshy to your device.",
  },
  {
    q: "Can I cancel Pro?",
    a: "Yes. You can cancel your Pro subscription at any time through your payment provider. Your access will continue until the end of the current billing period.",
  },
];

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
