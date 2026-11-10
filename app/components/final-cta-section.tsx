"use client";

import React from "react";

export function FinalCtaSection() {
  return (
    <footer className="relative py-28 px-6 sm:px-12 bg-[#05060a] border-t border-white/10 overflow-hidden">
      {/* Background cinematic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-amber-400 block mb-4">
          REACH ESCAPE VELOCITY
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
          Your Next Adventure Starts Here.
        </h2>

        <p className="mt-6 text-base sm:text-xl text-white/70 max-w-xl mx-auto font-light leading-relaxed">
          Come for the rides. Stay for the memories. Four world-class attractions waiting for your arrival.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#tickets"
            className="px-8 py-4 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black bg-white hover:bg-amber-400 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Plan Your Visit
          </a>
          <a
            href="#hero"
            className="px-8 py-4 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white border border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Replay The Journey
          </a>
        </div>

        {/* Park Meta details */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-widest uppercase">LUMINA</span>
            <span>© 2026 Lumina Entertainment Group. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-white transition-colors">
              Privacy Notice
            </a>
            <a href="#hero" className="hover:text-white transition-colors">
              Safety Regulations
            </a>
            <a href="#hero" className="hover:text-white transition-colors">
              Ride Guidelines
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
