const { execSync } = require('child_process');
const fs = require('fs');

// Let's create single frame previews at specific frames to pin down the exact boundaries:
// 45, 55, 60, 65, 70, 75, 115, 125, 135, 175, 185, 195
const frames = [45, 55, 60, 65, 70, 75, 115, 125, 135, 175, 185, 195];
for (const f of frames) {
  const padded = String(f).padStart(3, '0');
  // Copy to public/test_frame_XXX.jpg
  execSync(`ffmpeg -y -ss ${(f/24).toFixed(3)} -i public/theme-park-hero.mp4 -frames:v 1 public/tf_${padded}.jpg`);
}
console.log('Exported test frames');
