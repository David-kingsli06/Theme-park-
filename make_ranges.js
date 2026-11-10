const { execSync } = require('child_process');

// Generate 4 separate images for key ranges:
// Range 1: 1 - 60
// Range 2: 61 - 120
// Range 3: 121 - 180
// Range 4: 181 - 240
execSync('ffmpeg -y -i public/theme-park-hero.mp4 -vf "select=\'between(n,0,59)*not(mod(n,5))\',scale=320:180,tile=4x3" -frames:v 1 public/range1.jpg');
execSync('ffmpeg -y -i public/theme-park-hero.mp4 -vf "select=\'between(n,60,119)*not(mod(n,5))\',scale=320:180,tile=4x3" -frames:v 1 public/range2.jpg');
execSync('ffmpeg -y -i public/theme-park-hero.mp4 -vf "select=\'between(n,120,179)*not(mod(n,5))\',scale=320:180,tile=4x3" -frames:v 1 public/range3.jpg');
execSync('ffmpeg -y -i public/theme-park-hero.mp4 -vf "select=\'between(n,180,239)*not(mod(n,5))\',scale=320:180,tile=4x3" -frames:v 1 public/range4.jpg');
console.log('Generated ranges 1-4');
