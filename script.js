const drivers = {
  leclerc: {
    name: "Charles Leclerc",
    number: 16,
    speed: 300,
    fuel: 60,
    tireWear: 20,
    lapTime: 75.3,
    color: "#f43f5e",
  },
  lewis: {
    name: "Lewis Hamilton",
    number: 44,
    speed: 298,
    fuel: 62, 
    tireWear: 18,
    lapTime: 75.9,
    color: "#60a5fa",
  },
};

let lap = 0;
let totalLaps = 58;
let intervalId = null;
let updateMs = 2000;

// Chart data arrays
const timeLabels = [];
const speedDataLeclerc = [];
const speedDataLewis = [];
const tireDataLeclerc = [];
const tireDataLewis = [];
const fuelDataLeclerc = [];
const fuelDataLewis = [];

// Helper
const $ = (id) => document.getElementById(id);
const rand = (min, max) => Math.random() * (max - min) + min;

function formatTime(seconds) {
  const s = Math.floor(seconds % 60);
  const m = Math.floor(seconds / 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ======================
// UI UPDATE
// ======================
function updateDriverUI(key) {
  const d = drivers[key];
  $(`speed-${key}`).textContent = Math.round(d.speed) + " km/h";
  $(`laptime-${key}`).textContent = d.lapTime.toFixed(2) + " s";
  $(`fuel-${key}`).textContent = Math.round(d.fuel) + " %";
  $(`tire-${key}`).textContent = Math.round(d.tireWear) + " %";

  // Status color
  const statusEl = $(`status-${key}`);
  const isBox = d.tireWear > 75 || d.fuel < 10;
  statusEl.textContent = isBox ? "Box Now" : "Green";
  statusEl.className = isBox ? "text-red-400" : "text-green-400";
}

// ======================
// SIMULATION ENGINE
// ======================
function simulateStep() {
  lap++;
  if (lap >= totalLaps) {
    lap = totalLaps;
    clearInterval(intervalId);
    intervalId = null;
    $("race-summary").textContent += " — Race Finished 🏁";
    getRaceInsight();
    return;
  }
  $("lap-number").textContent = lap;

  // Update driver data
  Object.keys(drivers).forEach((key) => {
    const d = drivers[key];
    d.speed = Math.max(250, Math.min(340, d.speed + rand(-3, 3)));
    d.lapTime = Math.max(60, d.lapTime + rand(-0.5, 0.5));
    d.fuel = Math.max(0, d.fuel - rand(0.2, 0.7));
    d.tireWear = Math.min(100, d.tireWear + rand(0.3, 1.2));
  });

  // Label waktu
  const now = new Date();
  const label = `${now.getMinutes()}:${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  timeLabels.push(label);

  // Push data terbaru
  speedDataLeclerc.push(drivers.leclerc.speed);
  speedDataLewis.push(drivers.lewis.speed);
  tireDataLeclerc.push(drivers.leclerc.tireWear);
  tireDataLewis.push(drivers.lewis.tireWear);
  fuelDataLeclerc.push(drivers.leclerc.fuel);
  fuelDataLewis.push(drivers.lewis.fuel);

  // Limit data biar ga lag (max 30 titik)
  const maxPoints = 30;
  [
    timeLabels,
    speedDataLeclerc,
    speedDataLewis,
    tireDataLeclerc,
    tireDataLewis,
    fuelDataLeclerc,
    fuelDataLewis,
  ].forEach((arr) => {
    if (arr.length > maxPoints) arr.splice(0, arr.length - maxPoints);
  });

  // Update UI dan chart
  updateDriverUI("leclerc");
  updateDriverUI("lewis");
  updateCharts();
  updateRaceSummary();
}

// ======================
// CHARTS
// ======================
let speedChart, tireChart, fuelChart;

function initCharts() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: true,
    scales: {
      x: { ticks: { color: "#aaa" } },
      y: { ticks: { color: "#aaa" }, beginAtZero: false },
    },
    plugins: { legend: { labels: { color: "#fff" } } },
  };

  // Speed Chart
  speedChart = new Chart($("speedChart").getContext("2d"), {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Leclerc Speed",
          data: speedDataLeclerc,
          borderColor: drivers.leclerc.color,
          borderWidth: 2,
          tension: 0.2,
        },
        {
          label: "Lewis Speed",
          data: speedDataLewis,
          borderColor: drivers.lewis.color,
          borderWidth: 2,
          tension: 0.2,
        },
      ],
    },
    options: chartOptions,
  });

  // Tire Chart
  tireChart = new Chart($("tireChart").getContext("2d"), {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Leclerc Tire Wear",
          data: tireDataLeclerc,
          borderColor: drivers.leclerc.color,
          borderWidth: 2,
          tension: 0.2,
        },
        {
          label: "Lewis Tire Wear",
          data: tireDataLewis,
          borderColor: drivers.lewis.color,
          borderWidth: 2,
          tension: 0.2,
        },
      ],
    },
    options: chartOptions,
  });

  // Fuel Chart
  fuelChart = new Chart($("fuelChart").getContext("2d"), {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Leclerc Fuel %",
          data: fuelDataLeclerc,
          borderColor: drivers.leclerc.color,
          borderWidth: 2,
          tension: 0.2,
        },
        {
          label: "Lewis Fuel %",
          data: fuelDataLewis,
          borderColor: drivers.lewis.color,
          borderWidth: 2,
          tension: 0.2,
        },
      ],
    },
    options: chartOptions,
  });
}

function updateCharts() {
  // Speed
  speedChart.data.labels = timeLabels.slice();
  speedChart.data.datasets[0].data = speedDataLeclerc.slice();
  speedChart.data.datasets[1].data = speedDataLewis.slice();
  speedChart.update("none");

  // Tire
  tireChart.data.labels = timeLabels.slice();
  tireChart.data.datasets[0].data = tireDataLeclerc.slice();
  tireChart.data.datasets[1].data = tireDataLewis.slice();
  tireChart.update("none");

  // Fuel
  fuelChart.data.labels = timeLabels.slice();
  fuelChart.data.datasets[0].data = fuelDataLeclerc.slice();
  fuelChart.data.datasets[1].data = fuelDataLewis.slice();
  fuelChart.update("none");
}

// ======================
// RACE INFO
// ======================
function updateRaceSummary() {
  const summary = `Lap ${lap}/${totalLaps} — Leclerc: ${drivers.leclerc.lapTime.toFixed(
    2
  )}s, Lewis: ${drivers.lewis.lapTime.toFixed(2)}s`;
  $("race-summary").textContent = summary;
}

// ======================
// BUTTON CONTROLS
// ======================
$("start-btn").addEventListener("click", () => {
  if (intervalId) return;
  updateMs = Number($("update-interval").value);
  intervalId = setInterval(simulateStep, updateMs);
});

$("stop-btn").addEventListener("click", () => {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
});

$("session-select").addEventListener("change", (e) => {
  const session = e.target.value;

  switch (session) {
    case "fp1":
    case "fp2":
    case "fp3":
      totalLaps = 20;
      updateMs = 1500;
      break;
    case "q1":
    case "q2":
    case "q3":
      totalLaps = 12;
      updateMs = 1200;
      break;
    case "sprint":
      totalLaps = 25;
      updateMs = 1000;
      break;
    case "race":
    default:
      totalLaps = 58;
      updateMs = 2000;
      break;
  }

  // Reset race
  lap = 0;
  $("lap-number").textContent = lap;
  $("total-laps").textContent = totalLaps;
  $(
    "race-summary"
  ).textContent = `Session: ${session.toUpperCase()} — Ready 🏎️`;

  // Stop interval jika sedang jalan
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  // Reset data telemetry
  timeLabels.length = 0;
  speedDataLeclerc.length = 0;
  speedDataLewis.length = 0;
  tireDataLeclerc.length = 0;
  tireDataLewis.length = 0;
  fuelDataLeclerc.length = 0;
  fuelDataLewis.length = 0;
  updateCharts();
});

$("box-leclerc").addEventListener("click", () => {
  drivers.leclerc.tireWear = Math.max(0, drivers.leclerc.tireWear - 40);
  drivers.leclerc.fuel = Math.max(0, drivers.leclerc.fuel - 8);
  updateDriverUI("leclerc");
});

$("box-lewis").addEventListener("click", () => {
  drivers.lewis.tireWear = Math.max(0, drivers.lewis.tireWear - 40);
  drivers.lewis.fuel = Math.max(0, drivers.lewis.fuel - 8);
  updateDriverUI("lewis");
});

// ======================
// AI STRATEGY INSIGHT
// ======================
async function getRaceInsight() {
  try {
    const response = await fetch("http://localhost:4000/strategy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lap,
        leclerc: drivers.leclerc,
        lewis: drivers.lewis,
      }),
    });

    const data = await response.json();
    const insightBox = document.createElement("div");
    insightBox.className =
      "mt-3 p-3 bg-green-900 border border-green-700 rounded-lg text-sm text-green-200 animate-fade-in";
    insightBox.innerHTML = `<b>AI Strategy Insight 🧠:</b> ${
      data.insight || "No insight available."
    }`;
    document.querySelector("#race-summary").appendChild(insightBox);
  } catch (err) {
    console.error("AI Strategy Error:", err);
    const insightBox = document.createElement("div");
    insightBox.className =
      "mt-3 p-3 bg-red-900 border border-red-700 rounded-lg text-sm text-red-200";
    insightBox.textContent = "⚠️ Failed to get AI insight.";
    document.querySelector("#race-summary").appendChild(insightBox);
  }
}

// ======================
// INIT
// ======================
window.addEventListener("load", () => {
  initCharts();
  updateDriverUI("leclerc");
  updateDriverUI("lewis");
  $("total-laps").textContent = totalLaps;
});
