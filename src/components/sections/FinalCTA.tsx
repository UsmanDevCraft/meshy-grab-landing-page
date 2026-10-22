"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function FinalCTA() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden py-32 bg-bg-page border-t border-border-subtle">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial-lime animate-pulse-glow" />
      </div>

      <div className="container mx-auto max-w-3xl px-6 relative z-10">
        <div ref={ref} className="reveal text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/30 rounded-full text-xs font-bold text-lime mb-5 uppercase tracking-wider">
            All-In-One 3D Platform
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-5">
            Your 3D Models.
            <br />
            <span className="text-lime">One Powerful Workspace.</span>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
            View, convert, upscale PBR textures to 4K &amp; 8K, and export your
            3D assets effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://chromewebstore.google.com/detail/jkddfapkjenldpiacoccgheimcokhmcc?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !px-9 !py-4 !text-base font-bold shadow-[0_0_30px_rgba(197,249,85,0.25)]"
            >
              Get the Chrome Extension
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="#pricing"
              className="btn btn-secondary !px-8 !py-4 !text-base font-bold"
            >
              View Pricing &amp; Plans
            </a>
          </div>
          <p className="text-xs text-text-muted font-medium mt-4">
            Start with free downloads &bull; Pro plans start at $0.99/mo &bull;
            Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
