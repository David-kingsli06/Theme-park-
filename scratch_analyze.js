const { execSync } = require('child_process');
const fs = require('fs');

// Let's sample frames and compute dominant color or detect where water starts
// In water ride, cyan/blue color dominates. In cups, pink/purple/yellow cups. In bumper cars, dark arena with headlights.
// We can use ffmpeg with crop and signalstats to get Y, U, V or RGB values for each frame!
execSync('ffmpeg -i public/theme-park-hero.mp4 -vf "signalstats" -f null - 2> signalstats.txt');
const content = fs.readFileSync('signalstats.txt', 'utf8');

// Parse YAVG, UAVG, VAVG or HUE
const lines = content.split('\n');
const stats = [];
for (const line of lines) {
  const match = line.match(/pts_time:([0-9.]+).*YAVG:([0-9.]+).*UAVG:([0-9.]+).*VAVG:([0-9.]+)/);
  if (match) {
    stats.push({
      time: parseFloat(match[1]),
      y: parseFloat(match[2]),
      u: parseFloat(match[3]),
      v: parseFloat(match[4]),
    });
  }
}

console.log('Parsed frames:', stats.length);
// Print stats every 15 frames
for (let i = 0; i < stats.length; i += 12) {
  console.log(`Fr ${i+1} (${Math.round((i/240)*100)}%): Y=${stats[i].y.toFixed(1)}, U=${stats[i].u.toFixed(1)}, V=${stats[i].v.toFixed(1)}`);
}
