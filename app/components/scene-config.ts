export interface SceneConfig {
  id: string;
  name: string;
  startProgress: number; // 0.0 to 1.0 (relative to hero scroll)
  endProgress: number;   // 0.0 to 1.0
  peakProgress: number;  // point of highest focus/opacity
  startFrame: number;    // Exact matching video frame start
  endFrame: number;      // Exact matching video frame end
  tag: string;
  title: string;
  subtitle: string;
  position: "top-left" | "bottom-left" | "top-right" | "bottom-right" | "center-right" | "center-left";
  accentColor: string;
  rideStats?: {
    label: string;
    value: string;
  }[];
}

/**
 * EXACT FRAME RANGES VERIFIED FROM VIDEO ASSET:
 *
 * 1. Roller Coaster Climb & Descent:
 *    - Frames 1 to 54 (0.00 to 0.23 of video)
 *    - Climb: Frames 1 - 32
 *    - Descent/Drop: Frames 33 - 54
 *
 * 2. Water Ride Flume & Double Splash:
 *    - Frames 55 to 105 (0.23 to 0.44 of video)
 *    - Down the water chute & massive splash
 *
 * 3. Cup & Saucer Spin / Whirl:
 *    - Frames 106 to 165 (0.44 to 0.69 of video)
 *    - Giant tea cup platform, centrifugal rotation
 *
 * 4. Bumper Cars Arena:
 *    - Frames 166 to 220 (0.69 to 0.92 of video)
 *    - Entering arena, electric sparks, approaching collision
 *
 * 5. Impact Collision & Climax:
 *    - Frames 221 to 240 (0.92 to 1.00 of video)
 *    - Direct bumper impact, sparks, smoke, clean finish
 */
export const SCENE_CONFIGS: SceneConfig[] = [
  {
    id: "roller_coaster_ascent",
    name: "HyperCoaster Ascent",
    startProgress: 0.00,
    endProgress: 0.14,
    peakProgress: 0.07,
    startFrame: 1,
    endFrame: 32,
    tag: "SCENE 01 / VERTICAL ASCENT",
    title: "THE ADVENTURE BEGINS",
    subtitle: "Hold on. The park is waiting.",
    position: "top-left",
    accentColor: "#f59e0b", // Amber / Gold
    rideStats: [
      { label: "Elevation", value: "72m" },
      { label: "Track Length", value: "1,240m" },
    ],
  },
  {
    id: "roller_coaster_descent",
    name: "The Gravity Drop",
    startProgress: 0.14,
    endProgress: 0.24,
    peakProgress: 0.19,
    startFrame: 33,
    endFrame: 54,
    tag: "SCENE 02 / 85° PLUNGE",
    title: "FEEL THE DROP",
    subtitle: "Where anticipation becomes pure adrenaline.",
    position: "bottom-left",
    accentColor: "#ef4444", // Crimson Red
    rideStats: [
      { label: "Max Speed", value: "115 km/h" },
      { label: "G-Force", value: "4.2 G" },
    ],
  },
  {
    id: "water_ride",
    name: "Aqueduct Flume",
    startProgress: 0.24,
    endProgress: 0.46,
    peakProgress: 0.35,
    startFrame: 55,
    endFrame: 105,
    tag: "SCENE 03 / HYDRO CANYON",
    title: "MAKE A SPLASH",
    subtitle: "Every turn brings a sudden rush of white water.",
    position: "top-right",
    accentColor: "#06b6d4", // Electric Cyan
    rideStats: [
      { label: "Water Flow", value: "12,000 L/min" },
      { label: "Drop", value: "24m" },
    ],
  },
  {
    id: "cup_saucer",
    name: "Centrifugal Whirl",
    startProgress: 0.46,
    endProgress: 0.70,
    peakProgress: 0.58,
    startFrame: 106,
    endFrame: 165,
    tag: "SCENE 04 / VORTEX CAROUSEL",
    title: "SPIN INTO THE FUN",
    subtitle: "Round and round, the kaleidoscopic rhythm never stops.",
    position: "bottom-right",
    accentColor: "#ec4899", // Vibrant Pink
    rideStats: [
      { label: "RPM", value: "45 RPM" },
      { label: "Motion", value: "Tri-Axial" },
    ],
  },
  {
    id: "bumper_cars",
    name: "Electric Arena",
    startProgress: 0.70,
    endProgress: 0.91,
    peakProgress: 0.80,
    startFrame: 166,
    endFrame: 220,
    tag: "SCENE 05 / KINETIC ARENA",
    title: "READY FOR IMPACT?",
    subtitle: "Your next collision is waiting. No brakes, pure momentum.",
    position: "top-left",
    accentColor: "#8b5cf6", // Electric Purple / Violet
    rideStats: [
      { label: "Grid Power", value: "48V DC" },
      { label: "Arena", value: "850 m²" },
    ],
  },
  {
    id: "climax_impact",
    name: "The Impact Climax",
    startProgress: 0.91,
    endProgress: 1.00,
    peakProgress: 0.96,
    startFrame: 221,
    endFrame: 240,
    tag: "CLIMAX / ZERO DISTANCE",
    title: "MOMENTUM UNLEASHED",
    subtitle: "Four legendary rides. One continuous pulse.",
    position: "bottom-left",
    accentColor: "#10b981", // Emerald
  },
];

export const TOTAL_FRAMES = 240;
export const FRAME_DIR = "/frames/coaster";

/**
 * Returns formatted frame path: /frames/coaster/frame_001.webp to frame_240.webp
 */
export function getFramePath(index: number): string {
  const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
  const padded = String(clamped).padStart(3, "0");
  return `${FRAME_DIR}/frame_${padded}.webp`;
}
