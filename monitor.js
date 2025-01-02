const express = require("express");
const si = require("systeminformation");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/metrics", async (req, res) => {
  try {
    const memory = await si.mem();
    const cpu = await si.currentLoad();
    const temp = await si.cpuTemperature();

    res.json({
      memory: {
        total: memory.total,
        free: memory.free,
        used: memory.used,
      },
      cpu: {
        load: cpu.currentLoad.toFixed(2),
      },
      temperature: {
        main: temp.main || "N/A",
        cores: temp.cores || [],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching metrics");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
