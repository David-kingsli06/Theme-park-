"use client";

import React, { useState } from "react";

export function PlanVisitSection() {
  const [ticketType, setTicketType] = useState<"day" | "season" | "vip">("day");

  return (
    <section id="plan" className="relative py-28 px-6 sm:px-12 bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-bold tracking-[0.25em] text-white/60 uppercase">
              VISITOR ESSENTIALS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Plan Your Lumina Journey
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base font-light leading-relaxed">
            Everything you need for seamless arrival, park navigation, dining reservations, and guaranteed entry.
          </p>
        </div>

        {/* 4 Practical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          
          {/* Card 1: Hours & Calendar */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                OPERATING HOURS
              </span>
              <h3 className="text-lg font-bold text-white mt-2">Daily Schedule</h3>
              <div className="mt-4 space-y-2 text-xs text-white/70">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Mon – Thu</span>
                  <span className="text-white font-medium">10:00 – 21:00</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Fri – Sun</span>
                  <span className="text-white font-medium">10:00 – 23:00</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span>Holidays</span>
                  <span className="text-amber-400 font-medium">09:30 – 00:00</span>
                </div>
              </div>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium mt-6 block">
              ● All 4 Major Rides Operating
            </span>
          </div>

          {/* Card 2: Location & Transport */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                PARK LOCATION
              </span>
              <h3 className="text-lg font-bold text-white mt-2">Transit & Access</h3>
              <p className="mt-4 text-xs text-white/70 leading-relaxed">
                Direct express terminal connection via Lumina Metro Line (Exit A). Over 4,200 EV-ready covered parking bays available on site.
              </p>
            </div>
            <div className="text-xs text-white/50 border-t border-white/5 pt-4 mt-6">
              Navigation Code: <span className="text-white font-mono">LMN-PARK-01</span>
            </div>
          </div>

          {/* Card 3: Accessibility */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-rose-400 uppercase">
                INCLUSIVE ACCESS
              </span>
              <h3 className="text-lg font-bold text-white mt-2">Universal Access</h3>
              <p className="mt-4 text-xs text-white/70 leading-relaxed">
                Step-free boarding pathways across all ride stations, companion assist facilities, sensory resting lounges, and tactile park guides.
              </p>
            </div>
            <span className="text-[11px] text-white/60 font-medium mt-6 block">
              Guest Services: Guest Hub South
            </span>
          </div>

          {/* Card 4: Mobile App & Wait Times */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">
                LIVE TELEMETRY
              </span>
              <h3 className="text-lg font-bold text-white mt-2">Virtual Queueing</h3>
              <p className="mt-4 text-xs text-white/70 leading-relaxed">
                Join ride return slots directly from your browser. Live telemetry shows current queue durations, locker availability, and food prep times.
              </p>
            </div>
            <span className="text-[11px] text-amber-400 font-medium mt-6 block">
              Average wait: ~12 mins
            </span>
          </div>

        </div>

        {/* Admission Tickets Module */}
        <div id="tickets" className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                OFFICIAL ADMISSION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">
                Select Your Park Pass
              </h3>
            </div>
            
            {/* Pass Selector Tabs */}
            <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setTicketType("day")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  ticketType === "day" ? "bg-white text-black shadow-md" : "text-white/60 hover:text-white"
                }`}
              >
                Day Pass
              </button>
              <button
                onClick={() => setTicketType("season")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  ticketType === "season" ? "bg-white text-black shadow-md" : "text-white/60 hover:text-white"
                }`}
              >
                Express Pass
              </button>
              <button
                onClick={() => setTicketType("vip")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  ticketType === "vip" ? "bg-white text-black shadow-md" : "text-white/60 hover:text-white"
                }`}
              >
                VIP Unlimited
              </button>
            </div>
          </div>

          {/* Ticket Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Standard Day Pass */}
            <div className={`p-6 rounded-2xl border transition-all ${
              ticketType === "day" ? "border-amber-400 bg-amber-400/[0.03]" : "border-white/5 bg-white/[0.01]"
            }`}>
              <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">STANDARD ENTRY</span>
              <h4 className="text-xl font-bold text-white mt-1">General Admission</h4>
              <p className="text-xs text-white/60 mt-2">Unlimited access to all 4 hero rides and open attractions throughout the day.</p>
              <div className="mt-6">
                <span className="text-3xl font-black text-white">$49</span>
                <span className="text-xs text-white/50 ml-1">/ person</span>
              </div>
              <button className="w-full mt-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors">
                Select Standard
              </button>
            </div>

            {/* Express Pass */}
            <div className={`p-6 rounded-2xl border transition-all relative ${
              ticketType === "season" ? "border-amber-400 bg-amber-400/[0.05]" : "border-white/15 bg-white/[0.03]"
            }`}>
              <div className="absolute top-4 right-4">
                <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-400 text-black px-2 py-0.5 rounded-full">
                  MOST POPULAR
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">FAST TRACK</span>
              <h4 className="text-xl font-bold text-white mt-1">Lumina Express Pass</h4>
              <p className="text-xs text-white/60 mt-2">General admission + dedicated Express lanes on Roller Coaster, Water Flume & Bumper Cars.</p>
              <div className="mt-6">
                <span className="text-3xl font-black text-white">$89</span>
                <span className="text-xs text-white/50 ml-1">/ person</span>
              </div>
              <button className="w-full mt-6 py-2.5 rounded-full bg-amber-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                Select Express
              </button>
            </div>

            {/* VIP Pass */}
            <div className={`p-6 rounded-2xl border transition-all ${
              ticketType === "vip" ? "border-indigo-400 bg-indigo-400/[0.03]" : "border-white/5 bg-white/[0.01]"
            }`}>
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">CONCIERGE TIER</span>
              <h4 className="text-xl font-bold text-white mt-1">VIP All-Access Pass</h4>
              <p className="text-xs text-white/60 mt-2">Zero-wait immediate boarding, lounge access, reserved parking & front-row ride seating.</p>
              <div className="mt-6">
                <span className="text-3xl font-black text-white">$145</span>
                <span className="text-xs text-white/50 ml-1">/ person</span>
              </div>
              <button className="w-full mt-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-indigo-300 transition-colors">
                Select VIP
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
