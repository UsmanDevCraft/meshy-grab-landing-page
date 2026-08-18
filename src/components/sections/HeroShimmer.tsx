"use client";

export default function HeroShimmer() {
  return (
    <section
      aria-label="Loading Hero"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        border-b
        border-white/5
        pt-24
        pb-16
        sm:pt-28
        sm:pb-20
        md:pt-32
        bg-bg-page
      "
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute left-1/2 top-[38%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime/20" />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          items-center
          px-4
          text-center
          sm:px-6
          md:px-8
        "
      >
        {/* Video Card Shimmer */}
        <div className="w-full max-w-[1080px] animate-pulse">
          <div className="relative aspect-video w-full rounded-xl border border-white/10 bg-bg-card shadow-2xl overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40">
              <div className="h-12 w-12 rounded-full border border-lime/30 bg-lime/10 animate-pulse" />
              <div className="h-3 w-32 rounded-full bg-white/10" />
            </div>
          </div>
        </div>

        {/* Hero Text Shimmer */}
        <div
          className="
            relative
            z-10
            mt-6
            flex
            w-full
            max-w-3xl
            flex-col
            items-center
            gap-4
            px-1
            sm:mt-8
          "
        >
          {/* Badge skeleton */}
          <div className="h-7 w-56 rounded-full bg-lime/10 animate-pulse border border-lime/20" />

          {/* Headline skeleton */}
          <div className="flex flex-col items-center gap-2.5 w-full mt-2">
            <div className="h-10 sm:h-12 md:h-14 w-3/4 max-w-xl rounded-xl bg-white/10 animate-pulse" />
            <div className="h-10 sm:h-12 md:h-14 w-1/2 max-w-md rounded-xl bg-gradient-to-r from-lime/20 via-pink/20 to-lime/20 animate-pulse" />
          </div>

          {/* Subtitle skeleton */}
          <div className="flex flex-col items-center gap-2 w-full max-w-lg mt-3">
            <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
            <div className="h-4 w-4/5 rounded bg-white/5 animate-pulse" />
          </div>

          {/* CTA Buttons skeleton */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
            <div className="h-12 w-44 rounded-xl bg-lime/20 border border-lime/30 animate-pulse" />
            <div className="h-12 w-44 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
