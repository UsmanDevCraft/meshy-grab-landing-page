"use client";

import { useState } from "react";
import Link from "next/link";
import { plansList } from "@/constants/constants";

export default function PlansContent() {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("free");

  return (
    <div
      id="pricing"
      className="container mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16"
    >
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-lime/10 border border-lime/25 rounded-full text-xs font-semibold text-lime mb-5">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          Plans & Pricing
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-4 leading-tight">
          Flexible plans for every 3D creator
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Start with 2 free downloads or upgrade to unlimited GLB, OBJ, FBX, and
          texture exports.
        </p>
      </div>

      {/* Visual Progression Strip */}
      <div className="max-w-2xl mx-auto mb-12 p-3 bg-bg-card border border-border-subtle rounded-2xl flex flex-wrap items-center justify-around gap-2 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span>
            Free: <strong className="text-text-primary">2 Downloads</strong>
          </span>
        </div>
        <span className="text-text-muted font-bold">&rarr;</span>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span>
            Pro: <strong className="text-lime">$0.99/mo</strong>
          </span>
        </div>
        <span className="text-text-muted font-bold">&rarr;</span>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-lime" />
          <span>
            Annual: <strong className="text-lime">$9.99/yr</strong>
          </span>
        </div>
        <span className="text-text-muted font-bold">&rarr;</span>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-pink" />
          <span>
            Lifetime: <strong className="text-pink">$49 once</strong>
          </span>
        </div>
      </div>

      {/* 4 Pricing Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16">
        {plansList.map((plan) => {
          const isSelected = selectedPlanId === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "bg-bg-card ring-2 ring-lime shadow-[0_0_35px_rgba(197,249,85,0.18)] scale-[1.02]"
                  : "bg-bg-card/80 hover:bg-bg-card hover:-translate-y-1 border border-border-subtle hover:border-lime/30"
              } ${
                plan.isBestValue
                  ? "border-lime/40 bg-gradient-to-b from-lime/5 via-bg-card to-bg-card shadow-[0_0_40px_rgba(197,249,85,0.12)]"
                  : ""
              } ${
                plan.isPremium
                  ? "border-pink/40 bg-gradient-to-b from-pink/5 via-bg-card to-bg-card shadow-[0_0_40px_rgba(255,62,143,0.12)]"
                  : ""
              }`}
            >
              {/* Highlight Gradient Borders for Best Value & Lifetime */}
              {plan.isBestValue && (
                <div
                  className="absolute inset-0 rounded-3xl p-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(197,249,85,0.5), rgba(197,249,85,0.1))",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              )}

              {plan.isPremium && (
                <div
                  className="absolute inset-0 rounded-3xl p-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,62,143,0.5), rgba(197,249,85,0.2))",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              )}

              <div>
                {/* Header Row: Badge & Selected Indicator */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      plan.isBestValue
                        ? "bg-lime text-deep-black shadow-[0_0_15px_rgba(197,249,85,0.4)]"
                        : plan.isPremium
                          ? "bg-pink/20 text-pink border border-pink/30"
                          : "bg-lime/10 text-lime border border-lime/20"
                    }`}
                  >
                    {plan.badge}
                  </span>

                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-lime bg-lime/10 border border-lime/30 px-2.5 py-0.5 rounded-full">
                      <svg
                        className="w-3.5 h-3.5 text-lime"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Selected
                    </span>
                  ) : (
                    plan.savings && (
                      <span className="text-xs font-bold text-lime bg-lime/10 border border-lime/20 px-2 py-0.5 rounded-full">
                        {plan.savings}
                      </span>
                    )
                  )}
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-extrabold text-text-primary mb-1">
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <p className="text-xs text-text-muted mb-4 min-h-[32px] leading-relaxed">
                    {plan.subtitle}
                  </p>
                )}

                {/* Price Display */}
                <div className="mb-6 pt-2 border-t border-border-subtle/50">
                  {plan.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="line-through text-text-muted text-sm font-semibold">
                        {plan.originalPrice}
                      </span>
                      {plan.savings && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-lime bg-lime/15 px-1.5 py-0.5 rounded">
                          {plan.savings}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm font-sans font-medium text-text-secondary">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {plan.id === "lifetime" && (
                    <p className="text-xs font-bold text-pink mt-1">
                      Pay once, use forever
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-text-secondary leading-snug"
                    >
                      <svg
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.isPremium ? "text-pink" : "text-lime"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA Button */}
              <div>
                <Link
                  href={plan.href}
                  target={plan.id === "free" ? "_blank" : "_self"}
                  className={`btn w-full text-center text-sm font-bold py-3.5 rounded-xl transition-all duration-300 ${
                    plan.isBestValue
                      ? "btn-primary"
                      : plan.isPremium
                        ? "bg-gradient-to-r from-pink to-rose-500 text-white shadow-[0_4px_20px_rgba(255,62,143,0.3)] hover:brightness-110 hover:-translate-y-0.5"
                        : isSelected
                          ? "btn-primary"
                          : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                </Link>
                {plan.id === "free" && (
                  <p className="text-[11px] text-center text-text-muted mt-2">
                    Default free tier — No credit card needed
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Matrix / Guarantee Box */}
      <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
          All Paid Tiers Include Full Pro Rights
        </h2>
        <p className="text-sm text-text-secondary max-w-xl mx-auto mb-8">
          Whether you choose Pro Monthly, Pro Annual, or Lifetime, you get
          unlimited access with no hidden restrictions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-4 bg-bg-elevated/50 border border-border-subtle rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-lime/10 text-lime flex items-center justify-center font-bold text-sm mb-3">
              100%
            </div>
            <h4 className="font-semibold text-text-primary text-sm mb-1">
              Instant Activation
            </h4>
            <p className="text-xs text-text-muted">
              License unlocks automatically inside your Chrome extension after
              checkout.
            </p>
          </div>
          <div className="p-4 bg-bg-elevated/50 border border-border-subtle rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-lime/10 text-lime flex items-center justify-center font-bold text-sm mb-3">
              ⚡
            </div>
            <h4 className="font-semibold text-text-primary text-sm mb-1">
              Priority Model Support
            </h4>
            <p className="text-xs text-text-muted">
              Get access to new export formats and feature updates before
              everyone else.
            </p>
          </div>
          <div className="p-4 bg-bg-elevated/50 border border-border-subtle rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-pink/10 text-pink flex items-center justify-center font-bold text-sm mb-3">
              🛡️
            </div>
            <h4 className="font-semibold text-text-primary text-sm mb-1">
              Cancel Anytime
            </h4>
            <p className="text-xs text-text-muted">
              No long term lock-in for subscriptions. Lifetime plan has zero
              recurring fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
