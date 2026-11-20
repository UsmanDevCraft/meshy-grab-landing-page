"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatarText: string;
  gradient: string;
  tag: string;
  quote: string;
  rating?: number;
}

export const row1Testimonials: TestimonialItem[] = [
  {
    id: "alex-r",
    name: "Alex Rivers",
    role: "Lead Technical Artist, Arcane Interactive",
    avatarText: "AR",
    gradient: "from-indigo-500 via-purple-500 to-violet-600",
    tag: "Game Dev • Unreal Engine 5",
    quote:
      "Batch exporting models directly from Meshy and converting GLB to FBX with textures preserved saved our studio hours during rapid concept prototyping.",
    rating: 5,
  },
  {
    id: "elena-r",
    name: "Elena Rostova",
    role: "Industrial Designer & Print Specialist",
    avatarText: "ER",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    tag: "3D Printing • STL / 3MF",
    quote:
      "The STL and 3MF conversion handles complex geometry cleanly without inverted normals. It is now an essential part of my slicing and print-prep workflow.",
    rating: 5,
  },
  {
    id: "marcus-v",
    name: "Marcus Vance",
    role: "Character Concept Artist",
    avatarText: "MV",
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    tag: "PBR Upscaler • 8K Textures",
    quote:
      "The 8K texture upscaler is remarkable. Pulling high-frequency roughness and normal maps straight into Blender without losing micro-detail transformed my pipeline.",
    rating: 5,
  },
  {
    id: "sophia-c",
    name: "Sophia Chen",
    role: "Indie Game Developer",
    avatarText: "SC",
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
    tag: "Tripo3D Studio • Unity",
    quote:
      "Downloading directly from Tripo3D Studio and inspecting wireframes in the interactive 3D viewport before importing into Unity is completely frictionless.",
    rating: 5,
  },
  {
    id: "david-k",
    name: "David K.",
    role: "Senior Environment Artist",
    avatarText: "DK",
    gradient: "from-amber-400 via-orange-500 to-yellow-500",
    tag: "3D Viewport • PBR Lighting",
    quote:
      "Real-time material inspection with studio environment lighting in the extension lets me verify PBR maps immediately without firing up heavy software.",
    rating: 5,
  },
  {
    id: "liam-o",
    name: "Liam O'Connor",
    role: "XR Simulation Developer",
    avatarText: "LO",
    gradient: "from-lime via-emerald-500 to-teal-500",
    tag: "Multi-Account • Asset Hub",
    quote:
      "Linking multiple Meshy accounts under one unified workspace allows our entire team to organize and access generated asset libraries seamlessly.",
    rating: 5,
  },
];

export const row2Testimonials: TestimonialItem[] = [
  {
    id: "chloe-m",
    name: "Chloe Martinez",
    role: "Freelance 3D Modeler & Sculptor",
    avatarText: "CM",
    gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
    tag: "Community Discover • GLB / OBJ",
    quote:
      "Discovering trending community models and grabbing clean, production-ready OBJ files has made gathering high-quality 3D reference assets ten times faster.",
    rating: 5,
  },
  {
    id: "jonas-w",
    name: "Jonas Weber",
    role: "Rapid Prototyping Engineer",
    avatarText: "JW",
    gradient: "from-teal-400 via-cyan-500 to-blue-500",
    tag: "Watertight STL Converter",
    quote:
      "Zero format headaches. I export from AI generators, convert straight to watertight STL meshes, and send them directly to Bambu Studio with flawless results.",
    rating: 5,
  },
  {
    id: "rachel-k",
    name: "Rachel Kim",
    role: "VR Art Director",
    avatarText: "RK",
    gradient: "from-emerald-400 via-lime to-teal-400",
    tag: "4K / 8K Super-Resolution",
    quote:
      "AI 3D models often come with noisy or low-res textures. Upscaling diffuse and normal maps to 4K crispness directly in the extension solved our VR fidelity bottleneck.",
    rating: 5,
  },
  {
    id: "tariq-a",
    name: "Tariq Al-Mansoor",
    role: "Digital Asset Lead, PixelCraft",
    avatarText: "TA",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    tag: "Multi-Account Manager",
    quote:
      "Being able to attach and switch between multiple creator profiles in one interface made managing cross-client 3D deliverables painless.",
    rating: 5,
  },
  {
    id: "nina-p",
    name: "Nina Patel",
    role: "Architectural Visualizer",
    avatarText: "NP",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    tag: "Texture Exporter • PNG Maps",
    quote:
      "Extracting isolated PNG texture channels for roughness, metallic, and normals saved our visualization team countless hours of manual texture rebuilding.",
    rating: 5,
  },
  {
    id: "brandon-l",
    name: "Brandon Lee",
    role: "Technical Designer, NextGen Studios",
    avatarText: "BL",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    tag: "Meshy & Tripo3D Pipeline",
    quote:
      "From Tripo3D model exports to high-res PBR texture extraction, MeshyGrab has proven to be the most comprehensive companion toolkit we have used.",
    rating: 5,
  },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5 text-lime fill-lime"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="group relative flex flex-col justify-between w-[320px] sm:w-[380px] p-5 sm:p-6 rounded-2xl bg-bg-card/75 border border-white/10 hover:border-lime/35 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 select-none flex-shrink-0 overflow-hidden">
      {/* Subtle ambient glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl pointer-events-none`}
        style={{ filter: "blur(24px)" }}
      />

      <div className="relative z-10 flex flex-col gap-3.5">
        {/* Header: Rating & Workflow Tag */}
        <div className="flex items-center justify-between gap-2">
          <StarRating count={item.rating ?? 5} />
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide bg-white/5 border border-white/10 text-lime/90">
            {item.tag}
          </span>
        </div>

        {/* Quote */}
        <p className="text-[13.5px] sm:text-sm text-text-secondary leading-relaxed font-normal">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Creator Info Footer */}
      <div className="relative z-10 flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-xs shadow-md border border-white/20 flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}
        >
          {item.avatarText}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-text-primary leading-tight truncate">
            {item.name}
          </span>
          <span className="text-xs text-text-secondary/80 leading-tight truncate mt-0.5">
            {item.role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  // Duplicate arrays to produce infinite seamless looping
  const duplicatedRow1 = [...row1Testimonials, ...row1Testimonials];
  const duplicatedRow2 = [...row2Testimonials, ...row2Testimonials];

  return (
    <section
      id="testimonials"
      className="py-20 md:py-24 bg-bg-page relative overflow-hidden border-t border-border-subtle"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[420px] w-[600px] rounded-full bg-gradient-radial-lime opacity-10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -right-20 h-64 w-64 rounded-full bg-gradient-radial-pink opacity-20 blur-3xl"
      />

      <div className="container mx-auto max-w-6xl px-6 mb-12 sm:mb-16">
        <div ref={headerRef} className="reveal text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/20 rounded-full text-xs font-semibold text-lime mb-4 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            Creator Stories
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
            Loved by 3D Artists, Devs & Fabricators
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            See how game creators, 3D printing makers, and technical artists
            streamline their asset workflow with MeshyGrab.
          </p>
        </div>
      </div>

      {/* Dual Row Marquee Container with smooth edge fades and vertical breathing room */}
      <div className="relative w-full overflow-hidden flex flex-col gap-2 sm:gap-3 py-2">
        {/* Left and Right Edge Fade Masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-bg-page via-bg-page/85 to-transparent z-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-bg-page via-bg-page/85 to-transparent z-20"
        />

        {/* Row 1: Leftward Scrolling with unclipped top/bottom padding */}
        <div className="w-full overflow-hidden py-3 sm:py-4">
          <div className="flex w-max items-center gap-4 sm:gap-5 animate-marquee-left hover:[animation-play-state:paused] motion-reduce:animate-none py-1">
            {duplicatedRow1.map((item, idx) => (
              <TestimonialCard key={`r1-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Rightward (Reverse) Scrolling with unclipped top/bottom padding */}
        <div className="w-full overflow-hidden py-3 sm:py-4">
          <div className="flex w-max items-center gap-4 sm:gap-5 animate-marquee-right hover:[animation-play-state:paused] motion-reduce:animate-none py-1">
            {duplicatedRow2.map((item, idx) => (
              <TestimonialCard key={`r2-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
