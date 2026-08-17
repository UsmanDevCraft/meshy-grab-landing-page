"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { plans } from "@/constants/constants";

export default function PricingSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="pricing" className="section-padding bg-bg-page">
      <div className="container mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime mb-4">
            Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Try 2 downloads for free. Upgrade to Pro for unlimited access.
          </p>
        </div>

        {/* Visual progression indicator */}
        <div className="max-w-xl mx-auto mb-12 flex items-center justify-center gap-3 p-3 bg-bg-card border border-border-subtle rounded-2xl text-xs sm:text-sm font-medium">
          <span className="text-lime font-bold">2 Free Downloads</span>
          <span className="text-text-muted">&rarr;</span>
          <span className="text-pink font-bold">$0.99 / month</span>
          <span className="text-text-muted">&rarr;</span>
          <span className="text-lime font-bold">Unlimited Downloads</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} delay={i * 100} />
          ))}
        </div>

        <p className="reveal text-center text-xs text-text-muted mt-10">
          No hidden fees. Cancel your Pro subscription anytime.
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
      className={`reveal relative p-10 bg-bg-card border rounded-3xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
        plan.primary
          ? "border-lime/40 shadow-[0_0_60px_rgba(197,249,85,0.12)]"
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

      <div>
        <div className="flex justify-between items-center mb-5">
          <span className="inline-block px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime">
            {plan.badge}
          </span>
          {plan.primary && (
            <span className="text-xs font-bold text-pink uppercase tracking-wider">
              Most Popular
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <div className="text-5xl font-extrabold text-text-primary mb-6 leading-none font-mono">
          {plan.price}
          {plan.period && (
            <span className="text-base font-medium text-text-muted font-sans">
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
      </div>

      <button
        className={`btn w-full ${plan.primary ? "btn-primary" : "btn-secondary"}`}
      >
        {plan.cta}
      </button>
    </div>
  );
}
