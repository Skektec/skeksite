document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/temperature")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cpuTemp").innerText = data.temperature;
    })
    .catch((err) => {
      document.getElementById("cpuTemp").innerText = "Error";
    });

  fetch("/api/ram")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("ramUsed").innerText = data.usedMemory;
      document.getElementById("ramFree").innerText = data.freeMemory;
      document.getElementById("ramTotal").innerText = data.totalMemory;
    })
    .catch((err) => {
      document.getElementById("ramUsed").innerText = "Error";
      document.getElementById("ramFree").innerText = "Error";
      document.getElementById("ramTotal").innerText = "Error";
    });
});
