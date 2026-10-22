"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const workflows = [
  {
    id: "meshy-workspace",
    title: "Meshy AI Workspace Models",
    badge: "Personal Generations",
    desc: "Direct export of models you have generated in your private Meshy workspace. Access all formats without manual API tokens.",
    features: [
      "Export generated models as GLB, OBJ, FBX, STL, and 3MF",
      "Separate PBR texture map downloads in lossless PNG",
      "Real-time 3D model preview inside the extension popup",
      "Unlimited exports for Pro, Pro Max, Pro Annual & Lifetime tiers",
    ],
    formats: "GLB • OBJ • FBX • STL • 3MF • PNG Textures",
    tagColor: "text-lime bg-lime/10 border-lime/30",
  },
  {
    id: "meshy-community",
    title: "Meshy Discover Community Assets",
    badge: "Community Showcase",
    desc: "Explore public AI models created across the Meshy Discover community and download them directly with format conversion.",
    features: [
      "Download models shared publicly in the Meshy Discover gallery",
      "Convert community GLB assets into OBJ, FBX, STL, or 3MF",
      "Plan allowances: 1 free, 2/mo (Pro), 8/mo (Pro Max), 40/yr (Annual), Unlimited (Lifetime)",
      "Instant inspection in MeshyGrab's 3D workspace before saving",
    ],
    formats: "Community GLB & automated format conversions",
    tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },
  {
    id: "tripo-community",
    title: "Tripo3D Studio Integration",
    badge: "Pro Max, Annual & Lifetime",
    desc: "Access and export AI-generated community assets directly from Tripo3D Studio with built-in format pipelines.",
    features: [
      "Native support for Tripo3D Studio community model downloads",
      "Convert Tripo3D assets into 3D printing STL/3MF or game-ready FBX/OBJ",
      "Integrated into Pro Max, Pro Annual, and Lifetime subscription plans",
      "Seamless multi-platform asset management under a single toolkit",
    ],
    formats: "Tripo3D models & universal format conversion",
    tagColor: "text-pink bg-pink/10 border-pink/30",
  },
];

export default function IntegrationsSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const [selectedWorkflow, setSelectedWorkflow] = useState(0);

  const active = workflows[selectedWorkflow];

  return (
    <section
      id="integrations"
      className="section-padding bg-bg-page border-b border-border-subtle relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div
          ref={textRef}
          className="reveal text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/30 rounded-full text-xs font-bold text-lime mb-4 uppercase tracking-wider">
            Pillars 04 &amp; 05 — Integrations &amp; Community
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] mb-5 text-text-primary">
            Meshy AI &amp; Tripo3D Workflows, Demystified
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            MeshyGrab clearly separates personal workspace model exports from
            community showcase downloads, ensuring transparent quota accounting
            and seamless format conversion.
          </p>
        </div>

        {/* Workflow Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          {workflows.map((wf, idx) => (
            <button
              key={wf.id}
              onClick={() => setSelectedWorkflow(idx)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                selectedWorkflow === idx
                  ? "bg-bg-card border-lime/40 shadow-[0_0_30px_rgba(197,249,85,0.12)] scale-[1.02]"
                  : "bg-bg-elevated/40 border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-subtle"
              }`}
            >
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border mb-2 inline-block ${wf.tagColor}`}
              >
                {wf.badge}
              </span>
              <h3 className="text-sm font-bold text-text-primary block mb-1">
                {wf.title}
              </h3>
              <p className="text-xs text-text-muted line-clamp-2">{wf.desc}</p>
            </button>
          ))}
        </div>

        {/* Active Workflow Deep-Dive Card */}
        <div className="max-w-4xl mx-auto bg-bg-card border border-border-subtle rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Detailed capabilities */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full border ${active.tagColor}`}
                >
                  {active.badge}
                </span>
                <span className="text-xs text-text-muted font-mono">
                  Verified Pipeline
                </span>
              </div>

              <h4 className="text-2xl font-bold text-text-primary mb-3">
                {active.title}
              </h4>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {active.desc}
              </p>

              <div className="space-y-3 mb-6">
                {active.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-text-secondary"
                  >
                    <svg
                      className="w-4 h-4 text-lime flex-shrink-0 mt-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-bg-page rounded-xl border border-border-subtle text-xs flex items-center justify-between">
                <span className="text-text-muted">Export formats:</span>
                <span className="font-mono text-lime font-bold">
                  {active.formats}
                </span>
              </div>
            </div>

            {/* Right: Visual flow diagram */}
            <div className="md:col-span-5 bg-bg-elevated border border-border-subtle rounded-2xl p-5 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-lime/10 border border-lime/30 text-lime flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(197,249,85,0.15)]">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>

              <span className="text-xs font-bold text-text-primary mb-1">
                Zero Configuration Required
              </span>
              <p className="text-[11px] text-text-muted leading-relaxed mb-4">
                MeshyGrab interacts locally in your browser session. No
                developer API credentials, API key purchases, or authentication
                tokens required.
              </p>

              <div className="w-full pt-4 border-t border-border-subtle/80 flex justify-between text-[10px] font-mono text-text-muted">
                <span>Client-Side Download</span>
                <span className="text-lime font-bold">100% Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Affiliation Notice */}
        <p className="text-[11px] text-text-muted text-center max-w-2xl mx-auto mt-8 leading-relaxed">
          * MeshyGrab is an independent third-party tool and is not affiliated
          with, endorsed by, or sponsored by Meshy (Meshy AI) or Tripo3D. Meshy
          and Tripo3D trademarks belong to their respective owners.
        </p>
      </div>
    </section>
  );
}
