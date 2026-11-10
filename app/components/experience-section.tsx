"use client";

import React from "react";

export function ExperienceSection() {
  const moments = [
    {
      num: "01",
      title: "Zero-Lag Physical Scrubbing",
      desc: "Every scroll input directly syncs with 240 high-density cinematic frames, giving you tactile control over velocity and camera trajectory.",
      tag: "EMIL DESIGN ENGINEERING",
    },
    {
      num: "02",
      title: "Continuous Seamless World",
      desc: "From the summit drop to the hydro flume, vortex spins, and electric collisions—no jarring cuts or fake wipes interrupt your passage.",
      tag: "CINEMATIC CONTINUITY",
    },
    {
      num: "03",
      title: "Multi-Sensory Park Architecture",
      desc: "Immerse yourself in vivid daylight, synchronized reflections, neon night glows, and meticulously choreographed ride acoustics.",
      tag: "IMPECCABLE CRAFT",
    },
  ];

  return (
    <section id="experience" className="relative py-28 px-6 sm:px-12 bg-[#07090e]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Sub-hero Banner */}
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-white/10 relative overflow-hidden mb-20">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase mb-3 block">
              THE PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Crafted For Pure Kinesthetic Wonder
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/70 font-light leading-relaxed">
              We engineered the LUMINA experience to discard conventional park websites. You don’t just read about our coasters; you trigger their kinetic gravity with your own hands.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* 3-Pillar Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {moments.map((m) => (
            <div
              key={m.num}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono tracking-widest text-amber-400/90 uppercase block mb-6">
                  {m.tag}
                </span>
                <span className="text-4xl font-black text-white/20 block mb-2 font-mono">
                  {m.num}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {m.title}
                </h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
