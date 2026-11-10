"use client";

import React, { useState, useEffect } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#07090e]/80 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#07090e] rounded-[7px] flex items-center justify-center">
              <span className="text-xs font-black tracking-tighter text-white">LM</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-[0.22em] text-white uppercase group-hover:text-amber-400 transition-colors">
              LUMINA
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-white/50 -mt-0.5">
              Theme Park
            </span>
          </div>
        </a>

        {/* Live Status and Reset */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium tracking-wider text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CINEMATIC JOURNEY • 4 RIDES
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Restart Journey
          </button>
        </div>
      </div>
    </header>
  );
}
