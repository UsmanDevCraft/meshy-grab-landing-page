"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const plans = [
  {
    name: "Free",
    badge: "Free",
    price: "$0",
    period: "",
    features: [
      "2 model downloads",
      "No subscription required",
      "Core MeshyGrab functionality",
    ],
    cta: "Start Free",
    primary: false,
  },
  {
    name: "Pro",
    badge: "Pro",
    price: "$0.99",
    period: "/month",
    features: [
      "Unlimited downloads",
      "No free-download limit",
      "Continued access to MeshyGrab",
    ],
    cta: "Get Pro",
    primary: true,
  },
];

export default function PricingSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="pricing" className="section-padding bg-bg-page">
      <div className="container mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
            Simple pricing
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} delay={i * 100} />
          ))}
        </div>

        <p className="reveal text-center text-sm text-text-muted mt-10">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  delay,
}: {
  plan: (typeof plans)[0];
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal relative p-10 bg-bg-card border rounded-3xl transition-all duration-300 hover:-translate-y-1 ${
        plan.primary
          ? "border-lime/30 shadow-[0_0_60px_rgba(197,249,85,0.08)]"
          : "border-border-subtle"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {plan.primary && (
        <div
          className="absolute inset-0 rounded-3xl p-px pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(197,249,85,0.4), rgba(255,62,143,0.2))",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      <span className="inline-block px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime mb-5">
        {plan.badge}
      </span>
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <div className="text-5xl font-extrabold text-text-primary mb-6 leading-none">
        {plan.price}
        {plan.period && (
          <span className="text-base font-medium text-text-muted">
            {plan.period}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {plan.features.map((f) => (
          <div
            key={f}
            className="flex items-center gap-2.5 text-[0.9375rem] text-text-secondary"
          >
            <svg
              className="w-[18px] h-[18px] text-lime flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </div>
        ))}
      </div>

      <button
        className={`btn w-full ${plan.primary ? "btn-primary" : "btn-secondary"}`}
      >
        {plan.cta}
      </button>
    </div>
  );
}
