const express = require("express");
const os = require("os");
const app = express();
const port = 3000;

app.use(express.static("pages"));

app.get("/api/ram", (req, res) => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  res.json({
    totalMemory: formatBytes(totalMemory),
    freeMemory: formatBytes(freeMemory),
    usedMemory: formatBytes(usedMemory),
  });
});

function formatBytes(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
