const os = require("os");

function getCpuUsage() {
  const cpus = os.cpus();
  let totalIdle = 0,
    totalTick = 0;

  for (let i = 0; i < cpus.length; i++) {
    const cpu = cpus[i];
    for (type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  }

  const idle = totalIdle / cpus.length;
  const total = totalTick / cpus.length;
  const usage = 1 - idle / total;

  return usage * 100;
}

setInterval(() => {
  const cpuUsage = getCpuUsage();

  let displayElement1 = document.getElementById("cpuse");

  displayElement1.textContent = cpuUsage;
}, 1000);
