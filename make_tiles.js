const { execSync } = require('child_process');
const fs = require('fs');

// We can check which frame numbers correspond to which ride:
// Let's create an html file or inspect every 10th frame index and print it
const list = [];
for (let i = 1; i <= 240; i += 10) {
  list.push(i);
}
console.log('Sampling frames:', list.join(', '));
