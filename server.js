const express = require("express");
const fs = require("fs");
const os = require("os");

const app = express();
const port = 3000;

app.get("/api/temperature", (req, res) => {
  fs.readFile("/sys/class/thermal/thermal_zone0/temp", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading CPU temperature");
      return;
    }
    const temperature = parseInt(data) / 1000;
    res.json({ temperature });
  });
});

app.get("/api/ram", (req, res) => {
  const freeMemory = os.freemem() / 1024 / 1024;
  const totalMemory = os.totalmem() / 1024 / 1024;
  const usedMemory = totalMemory - freeMemory;

  res.json({
    freeMemory: freeMemory.toFixed(2),
    usedMemory: usedMemory.toFixed(2),
    totalMemory: totalMemory.toFixed(2),
  });
});

app.use(express.static("pages"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
