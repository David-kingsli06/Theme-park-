# Master Prompt Specification: Cinematic Scroll-Controlled Theme Park Hero Experience

Use this comprehensive prompt specification to recreate an exact replica of this high-performance, cinematic, scroll-driven theme park hero website.

---

## 📋 The Master Prompt

```markdown
# Role & Mission
You are an expert creative frontend engineer, interaction designer, motion designer, and visual designer specializing in Emil Kowalski design engineering principles and modern Next.js architecture.

Build a premium, immersive website for a colorful amusement/theme park where:
> **The scroll-controlled cinematic video IS the entire hero section and the sole focus of the page.**
> There is NO separate hero banner, static photo, or conventional autoplay video player.

---

## 🛠 Strict Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Iconography: Lucide React (or lightweight SVG equivalents)
- Zero bulky animation dependencies (NO heavy GSAP/Framer libraries needed—use vanilla requestAnimationFrame with Canvas 2D for sub-millisecond, zero-lag timeline scrubbing).

---

## 🎞 Video Asset & Exact Scene Composition
The website uses a 10-second continuous 240-frame 16:9 first-person ride video located at:
- Video source: `/public/theme-park-hero.mp4`
- Pre-extracted frames directory: `/public/frames/coaster/frame_001.webp` through `frame_240.webp`

### Exact Ride Scene Breakdown (Source of Truth):
1. **Scene 01 / Vertical Ascent** (Frames 1 – 32 | Scroll 0.00 – 0.14):
   - First-person roller coaster climbing steadily up the lift hill into the open park skyline.
   - Tag: `SCENE 01 / VERTICAL ASCENT`
   - Title: `THE ADVENTURE BEGINS`
   - Subtitle: `Hold on. The park is waiting.`
   - Position: Top-Left
   - Accent: Amber / Gold (`#f59e0b`)
   - Telemetry: Elevation: `72m` | Track Length: `1,240m`

2. **Scene 02 / The 85° Plunge** (Frames 33 – 54 | Scroll 0.14 – 0.24):
   - Coaster reaches peak crest and accelerates violently down into steep banked track.
   - Tag: `SCENE 02 / 85° PLUNGE`
   - Title: `FEEL THE DROP`
   - Subtitle: `Where anticipation becomes pure adrenaline.`
   - Position: Bottom-Left
   - Accent: Crimson Red (`#ef4444`)
   - Telemetry: Max Speed: `115 km/h` | G-Force: `4.2 G`

3. **Scene 03 / Hydro Canyon Flume** (Frames 55 – 105 | Scroll 0.24 – 0.46):
   - Downward coaster motion leads naturally into the log flume chute and a massive double water splash.
   - Tag: `SCENE 03 / HYDRO CANYON`
   - Title: `MAKE A SPLASH`
   - Subtitle: `Every turn brings a sudden rush of white water.`
   - Position: Top-Right
   - Accent: Electric Cyan (`#06b6d4`)
   - Telemetry: Water Flow: `12,000 L/min` | Drop: `24m`

4. **Scene 04 / Vortex Carousel Cups** (Frames 106 – 165 | Scroll 0.46 – 0.70):
   - Transitioning from the water swirls directly into rotating giant tea cups with centrifugal spin.
   - Tag: `SCENE 04 / VORTEX CAROUSEL`
   - Title: `SPIN INTO THE FUN`
   - Subtitle: `Round and round, the kaleidoscopic rhythm never stops.`
   - Position: Bottom-Right
   - Accent: Vibrant Pink (`#ec4899`)
   - Telemetry: RPM: `45 RPM` | Motion: `Tri-Axial`

5. **Scene 05 / Kinetic Bumper Arena** (Frames 166 – 220 | Scroll 0.70 – 0.91):
   - Entering the dark neon-lit bumper car arena with sparkling ceiling grid and oncoming cars.
   - Tag: `SCENE 05 / KINETIC ARENA`
   - Title: `READY FOR IMPACT?`
   - Subtitle: `Your next collision is waiting. No brakes, pure momentum.`
   - Position: Top-Left
   - Accent: Electric Purple / Violet (`#8b5cf6`)
   - Telemetry: Grid Power: `48V DC` | Arena: `850 m²`

6. **Climax / Zero Distance Impact** (Frames 221 – 240 | Scroll 0.91 – 1.00):
   - Head-on electric collision with sparks and vapor explosion; UI recedes cleanly so action breathes.
   - Tag: `CLIMAX / ZERO DISTANCE`
   - Title: `MOMENTUM UNLEASHED`
   - Subtitle: `Four legendary rides. One continuous pulse.`
   - Position: Bottom-Left
   - Accent: Emerald (`#10b981`)

---

## ⚙️ Core Technical Implementation Details

### 1. Canvas 2D Engine with Sub-Frame Alpha Blending
- Use an HTML5 `<canvas>` element fitted to viewport dimensions with `devicePixelRatio` scaling.
- Calculate object-fit `cover` dimensions to preserve 16:9 ratio without black letterboxes.
- **Float Lerp Interpolation**: Interpolate frame position in a `requestAnimationFrame` loop with damping factor `0.12`:
  ```ts
  const diff = targetFrameRef.current - currentRenderFrame;
  if (Math.abs(diff) > 0.005) {
    currentRenderFrame += diff * 0.12;
  }
  ```
- **Sub-frame Crossfade**: Blend the current floor frame with the next frame based on the fractional part (`currentRenderFrame - Math.floor(currentRenderFrame)`) to achieve continuous 60fps+ silkiness.

### 2. Physical Scroll Track & Sticky Viewport
- Set the parent container height to `1050vh` (10.5x viewport height).
- Child container is `sticky top-0 w-full h-screen overflow-hidden select-none`.
- Calculate normalized scroll progress:
  ```ts
  const scrolledDist = -rect.top;
  const rawProgress = Math.min(Math.max(scrolledDist / totalScrollableDistance, 0), 1);
  ```

### 3. Reading Dwell Plateau Curve
To prevent text from flying by during rapid or normal scrolling, apply a trapezoidal dwell curve to each scene's progress:
- `0.0 to 0.15`: Fade-in (`opacity: 0 -> 1`, `translateY: 16px -> 0`, `blur: 6px -> 0`)
- `0.15 to 0.82`: **Stable reading dwell** (`opacity: 1`, `translateY: 0`, `blur: 0`)
- `0.82 to 1.00`: Fade-out exit (`opacity: 1 -> 0`, `translateY: 0 -> -14px`, `blur: 0 -> 5px`)

### 4. Overlays & HUD Elements
- Top and bottom gradient shadows (`from-[#07090e]/80 to-transparent`) and a radial cinematic vignette.
- Bottom-left HUD showing:
  - Timeline percentage (e.g., `46%`)
  - Gradient progress bar (`from-amber-400 via-rose-500 to-indigo-500`)
  - Frame counter (e.g., `112 / 240 FR`)
- Right-side interactive scene indicator dots with labels that allow smooth scrolling to any ride.
- Subtle `"SCROLL TO EXPLORE"` animated badge that dismisses once the user starts scrolling.

### 5. Floating Minimal Header
- Transparent header with `LUMINA Theme Park` logo.
- Pill badge showing: `CINEMATIC JOURNEY • 4 RIDES` with pulsing green dot.
- `"Restart Journey"` button that smoothly scrolls back to `top: 0`.

### 6. Scope
- Do NOT include any extra generic card grids, footer sections, or promotional banners below the hero.
- The hero IS the entire page experience.
```

---

## 🗂 File Structure To Replicate

```text
d:/theme_park/
├── app/
│   ├── components/
│   │   ├── cinematic-hero.tsx    # Canvas 2D render loop, RAF lerp, HUD, and reading dwell curve
│   │   ├── navigation.tsx        # Floating minimal header with live pill & restart action
│   │   └── scene-config.ts       # Centralized scene configs, frames, and telemetry
│   ├── globals.css               # Dark theme, vignette & text glow utilities
│   ├── layout.tsx                # Clean HTML shell, system fonts, meta titles
│   └── page.tsx                  # Main page rendering Navigation + CinematicHero
├── public/
│   ├── frames/
│   │   └── coaster/              # frame_001.webp through frame_240.webp
│   └── theme-park-hero.mp4       # 10s source video (1280x720, 24fps)
└── package.json                  # Next.js 16, React 19, Tailwind CSS
```
