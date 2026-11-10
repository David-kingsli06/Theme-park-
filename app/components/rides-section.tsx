"use client";

import React, { useState } from "react";

interface RideItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  heroFrame: string;
  specs: {
    speed?: string;
    drop?: string;
    duration?: string;
    intensity: "Extreme Thrill" | "High Adventure" | "Family Whirl" | "Interactive Action";
    heightRequirement: string;
  };
  accentColor: string;
}

const RIDES: RideItem[] = [
  {
    id: "roller-coaster",
    name: "HyperCoaster V-8",
    category: "Hyper Thrill Coaster",
    tagline: "72 Meters Above Ground. Zero Compromise.",
    description:
      "Climb steadily into the open skyline before plunging down an 85-degree drop into high-g banked curves and airtime hills engineered for total weightlessness.",
    heroFrame: "/frames/coaster/frame_045.webp",
    specs: {
      speed: "115 km/h",
      drop: "72 m",
      duration: "2 min 40s",
      intensity: "Extreme Thrill",
      heightRequirement: "135 cm",
    },
    accentColor: "#ef4444",
  },
  {
    id: "water-ride",
    name: "Aqueduct Flume Run",
    category: "Hydro Canyon Descent",
    tagline: "A Whitewater Rush Carved Through Solid Stone.",
    description:
      "Wind through dramatic aquatic channels and high-speed water chutes culminating in a monumental double splashdown that cools the senses and thrills riders.",
    heroFrame: "/frames/coaster/frame_125.webp",
    specs: {
      speed: "68 km/h",
      drop: "24 m",
      duration: "3 min 15s",
      intensity: "High Adventure",
      heightRequirement: "110 cm",
    },
    accentColor: "#06b6d4",
  },
  {
    id: "cup-saucer",
    name: "Centrifugal Vortex Cups",
    category: "Tri-Axial Carousel",
    tagline: "Kaleidoscopic Rotations In Continuous Motion.",
    description:
      "Control your own spin rate as multi-tier circular turntables generate playful centrifugal momentum amidst vibrant neon accents and rhythmic park soundscapes.",
    heroFrame: "/frames/coaster/frame_175.webp",
    specs: {
      speed: "45 RPM",
      duration: "2 min 10s",
      intensity: "Family Whirl",
      heightRequirement: "95 cm",
    },
    accentColor: "#ec4899",
  },
  {
    id: "bumper-cars",
    name: "Electra Kinetic Arena",
    category: "Interactive Electric Combat",
    tagline: "High-Frequency Collisions & Direct Momentum.",
    description:
      "Take the wheel of responsive electric combat cars inside our high-voltage arena. No tracks, no scripted paths—pure reactive maneuvering and impact thrills.",
    heroFrame: "/frames/coaster/frame_235.webp",
    specs: {
      speed: "25 km/h",
      duration: "4 min 00s",
      intensity: "Interactive Action",
      heightRequirement: "105 cm",
    },
    accentColor: "#8b5cf6",
  },
];

export function RidesSection() {
  const [selectedRide, setSelectedRide] = useState<RideItem>(RIDES[0]);

  return (
    <section id="rides" className="relative py-32 px-6 sm:px-12 bg-[#07090e] border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-bold tracking-[0.25em] text-white/60 uppercase">
                ATTRACTIONS SHOWCASE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              The Four Legendary Rides
            </h2>
          </div>
          <p className="text-white/60 text-sm sm:text-base max-w-md font-light leading-relaxed">
            Every attraction in our cinematic sequence is engineered with custom track geometry, kinetic pacing, and distinct visual atmospheres.
          </p>
        </div>

        {/* Editorial Layout: Interactive Selector + Main Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Ride Selector Menu */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {RIDES.map((ride, idx) => {
                const isSelected = ride.id === selectedRide.id;
                return (
                  <button
                    key={ride.id}
                    onClick={() => setSelectedRide(ride)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border flex flex-col relative overflow-hidden group ${
                      isSelected
                        ? "bg-white/[0.07] border-white/20 shadow-2xl"
                        : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Active Accent Bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ backgroundColor: ride.accentColor }}
                    />

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono tracking-widest uppercase text-white/40">
                        0{idx + 1} // {ride.category}
                      </span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10"
                        style={{ color: ride.accentColor }}
                      >
                        {ride.specs.intensity}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {ride.name}
                    </h3>
                    <p className="text-xs text-white/50 mt-1 line-clamp-1 font-light">
                      {ride.tagline}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Quick FastPass Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-transparent to-white/[0.02] border border-amber-500/20 mt-6">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
                LUMINA EXPRESS ACCESS
              </span>
              <p className="text-xs text-white/80 mt-1">
                Skip regular wait times on all 4 featured rides with an Express Wristband.
              </p>
            </div>
          </div>

          {/* Right: Focused Ride Spotlight Detail */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            
            {/* Ride Frame Visual Preview */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedRide.heroFrame}
                alt={selectedRide.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/20 text-white">
                  FRAME CAPTURE • 4K ULTRA-WIDE
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider uppercase">
                    {selectedRide.category}
                  </span>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                    {selectedRide.name}
                  </h4>
                </div>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="space-y-6">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
                {selectedRide.description}
              </p>

              {/* Ride Telemetry Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                {selectedRide.specs.speed && (
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="block text-[10px] font-mono text-white/40 uppercase">Top Velocity</span>
                    <span className="text-base font-bold text-white">{selectedRide.specs.speed}</span>
                  </div>
                )}
                {selectedRide.specs.drop && (
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="block text-[10px] font-mono text-white/40 uppercase">Max Drop</span>
                    <span className="text-base font-bold text-white">{selectedRide.specs.drop}</span>
                  </div>
                )}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="block text-[10px] font-mono text-white/40 uppercase">Ride Duration</span>
                  <span className="text-base font-bold text-white">{selectedRide.specs.duration}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="block text-[10px] font-mono text-white/40 uppercase">Min Height</span>
                  <span className="text-base font-bold text-white">{selectedRide.specs.heightRequirement}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#plan"
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-amber-400 transition-colors shadow-lg"
                >
                  View Wait Times & Schedule
                </a>
                <a
                  href="#hero"
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Experience in 360° Hero
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
