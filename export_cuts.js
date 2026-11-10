const { execSync } = require('child_process');

// Let's inspect frames around transitions:
// Coaster -> Water: 48, 52, 56, 60, 64
// Water -> Cups: 100, 104, 108, 112, 116
// Cups -> Bumper cars: 156, 160, 164, 168, 172
// Collision: 216, 220, 224, 228, 232, 238
const frames = [
  50, 54, 58, 62,
  102, 106, 110, 114,
  160, 164, 168, 172,
  216, 224, 232, 238
];

for (const f of frames) {
  const padded = String(f).padStart(3, '0');
  execSync(`ffmpeg -y -ss ${(f/24).toFixed(3)} -i public/theme-park-hero.mp4 -frames:v 1 public/cut_${padded}.jpg`);
}
console.log('Transition cuts exported');
