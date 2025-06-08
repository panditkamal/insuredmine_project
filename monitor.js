import { fork } from 'child_process';
import os from 'os';

let appProcess = fork('./app.js');

const threshold = 70; 
const checkInterval = 5000; 

function getCPUUsage() {
  const cpus = os.cpus();
  let idle = 0, total = 0;

  for (const cpu of cpus) {
    for (const type in cpu.times) {
      total += cpu.times[type];
    }
    idle += cpu.times.idle;
  }

  const usage = 100 - (idle / total) * 100;
  return usage.toFixed(2);
}

setInterval(() => {
  const usage = getCPUUsage();
  console.log(`[CPU Monitor] Usage: ${usage}%`);

  if (usage > threshold) {
    console.log(`Restarting app...`);
    appProcess.kill('SIGTERM');

    appProcess = fork('./app.js');
  }
}, checkInterval);
