"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function MoneySection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-20 bg-gradient-to-b from-bg-page via-bg-card to-bg-page relative overflow-hidden border-y border-border-subtle">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial-lime animate-pulse-glow" />
      </div>

      <div className="container mx-auto max-w-4xl px-6 relative z-10">
        <div
          ref={ref}
          className="reveal text-center p-10 md:p-14 bg-bg-card/80 backdrop-blur-xl border border-lime/20 rounded-[28px] shadow-[0_0_50px_rgba(197,249,85,0.08)]"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-lime/10 border border-lime/30 rounded-full text-xs font-bold text-lime mb-5 uppercase tracking-wider">
            Pro Membership
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
            Need more than two downloads?
          </h2>

          <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
            MeshyGrab gives you 2 downloads for free. If you&apos;re regularly
            generating models and need more, Pro removes the download limit for
            just $0.99/month.
          </p>

          <div className="flex flex-col items-center gap-3">
            <button className="btn btn-primary !px-10 !py-4 !text-base shadow-[0_0_25px_rgba(197,249,85,0.3)]">
              Go Pro — $0.99/month
            </button>
            <p className="text-xs text-text-muted font-medium">
              Unlimited downloads. Simple as that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
