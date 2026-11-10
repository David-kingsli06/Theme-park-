import { Navigation } from "./components/navigation";
import { CinematicHero } from "./components/cinematic-hero";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#07090e] text-[#f1f3f9] selection:bg-amber-400 selection:text-black">
      {/* Floating Minimal Navigation */}
      <Navigation />

      {/* 
        THE SCROLL-CONTROLLED VIDEO IS THE SOLE HERO EXPERIENCE
        Pure cinematic theme park journey scrubbing through all 4 rides.
      */}
      <CinematicHero />
    </main>
  );
}
