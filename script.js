// ====================== //
// TIRE DATA
// ====================== //
const tireCompounds = {
  soft: {
    name: "Soft",
    color: "#ef4444",
    grip: 1.5,
    degradation: 1.8,
  },
  medium: {
    name: "Medium",
    color: "#facc15",
    grip: 0.5,
    degradation: 1.0,
  },
  hard: {
    name: "Hard",
    color: "#d1d5db",
    grip: -1.0,
    degradation: 0.6,
  },
};

// ====================== //
// DRIVER DATA
// ====================== //
const initialDriverState = {
  leclerc: {
    name: "Charles Leclerc",
    number: 16,
    speed: 0,
    fuel: 100,
    tireWear: 0,
    lapTime: 0.0,
    color: "#f43f5e",
    compound: "medium",
  },
  lewis: {
    name: "Lewis Hamilton",
    number: 44,
    speed: 0,
    fuel: 100,
    tireWear: 0,
    lapTime: 0.0,
    color: "#60a5fa",
    compound: "medium",
  },
};

// Use a deep copy for the simulation state so we can reset it later
let drivers = JSON.parse(JSON.stringify(initialDriverState));

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

// ====================== //
// UI UPDATE
// ====================== //
function updateDriverUI(key) {
  const d = drivers[key];
  $(`speed-${key}`).textContent = d.speed === 0 ? "— km/h" : Math.round(d.speed) + " km/h";
  $(`laptime-${key}`).textContent = d.lapTime === 0 ? "—" : d.lapTime.toFixed(2) + " s";
  $(`fuel-${key}`).textContent = Math.round(d.fuel) + " %";
  $(`tire-${key}`).textContent = Math.round(d.tireWear) + " %";

  const compound = tireCompounds[d.compound];
  const compoundEl = $(`compound-${key}`);
  compoundEl.textContent = compound.name;
  compoundEl.parentElement.style.borderColor = compound.color;

  const statusEl = $(`status-${key}`);
  const isBox = d.tireWear > 75 || d.fuel < 10;
  statusEl.textContent = isBox ? "Box Now" : "Green";
  statusEl.className = isBox ? "text-red-400" : "text-green-400";
}

// ====================== //
// SIMULATION ENGINE (MODIFIED)
// ====================== //
function simulateStep() {
  lap++;
  $("lap-number").textContent = lap;

  Object.keys(drivers).forEach((key) => {
    const d = drivers[key];
    const tire = tireCompounds[d.compound];

    // Initialize speed and laptime on the first lap
    if (lap === 1) {
        d.speed = 300;
        d.lapTime = 75;
    }

    d.speed = Math.max(250, Math.min(340, d.speed + rand(-3, 3) + tire.grip));
    d.lapTime = Math.max(60, d.lapTime + rand(-0.5, 0.5) - tire.grip * 0.1);
    d.fuel = Math.max(0, d.fuel - rand(1.5, 1.8));
    d.tireWear = Math.min(
      100,
      d.tireWear + rand(0.5, 1.5) * tire.degradation
    );
  });

  const now = new Date();
  const label = `${now.getMinutes()}:${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  timeLabels.push(label);

  speedDataLeclerc.push(drivers.leclerc.speed);
  speedDataLewis.push(drivers.lewis.speed);
  tireDataLeclerc.push(drivers.leclerc.tireWear);
  tireDataLewis.push(drivers.lewis.tireWear);
  fuelDataLeclerc.push(drivers.leclerc.fuel);
  fuelDataLewis.push(drivers.lewis.fuel);

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

  updateDriverUI("leclerc");
  updateDriverUI("lewis");
  updateCharts();
  updateRaceSummary();
  
  // NEW: Check for race finish AFTER the final lap is simulated and displayed
  if (lap >= totalLaps) {
    clearInterval(intervalId);
    intervalId = null;
    $("race-summary").textContent += " — Race Finished 🏁";
    getRaceInsight();
  }
}

// ====================== //
// CHARTS
// ====================== //
let speedChart, tireChart, fuelChart;

function initCharts() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: { ticks: { color: "#aaa" } },
      y: { ticks: { color: "#aaa" }, beginAtZero: false },
    },
    plugins: { legend: { labels: { color: "#fff" } } },
  };

  speedChart = new Chart($("speedChart").getContext("2d"), {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Leclerc Speed", data: speedDataLeclerc, borderColor: drivers.leclerc.color, borderWidth: 2, tension: 0.2,
        },
        {
          label: "Lewis Speed", data: speedDataLewis, borderColor: drivers.lewis.color, borderWidth: 2, tension: 0.2,
        },
      ],
    },
    options: chartOptions,
  });

  tireChart = new Chart($("tireChart").getContext("2d"), {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Leclerc Tire Wear", data: tireDataLeclerc, borderColor: drivers.leclerc.color, borderWidth: 2, tension: 0.2,
        },
        {
          label: "Lewis Tire Wear", data: tireDataLewis, borderColor: drivers.lewis.color, borderWidth: 2, tension: 0.2,
        },
      ],
    },
    options: chartOptions,
  });

  fuelChart = new Chart($("fuelChart").getContext("2d"), {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Leclerc Fuel %", data: fuelDataLeclerc, borderColor: drivers.leclerc.color, borderWidth: 2, tension: 0.2,
        },
        {
          label: "Lewis Fuel %", data: fuelDataLewis, borderColor: drivers.lewis.color, borderWidth: 2, tension: 0.2,
        },
      ],
    },
    options: chartOptions,
  });
}

function updateCharts() {
  speedChart.data.labels = timeLabels.slice();
  speedChart.data.datasets[0].data = speedDataLeclerc.slice();
  speedChart.data.datasets[1].data = speedDataLewis.slice();
  speedChart.update("none");

  tireChart.data.labels = timeLabels.slice();
  tireChart.data.datasets[0].data = tireDataLeclerc.slice();
  tireChart.data.datasets[1].data = tireDataLewis.slice();
  tireChart.update("none");

  fuelChart.data.labels = timeLabels.slice();
  fuelChart.data.datasets[0].data = fuelDataLeclerc.slice();
  fuelChart.data.datasets[1].data = fuelDataLewis.slice();
  fuelChart.update("none");
}

// ====================== //
// RACE INFO
// ====================== //
function updateRaceSummary() {
  const summary = `Lap ${lap}/${totalLaps} — Leclerc: ${drivers.leclerc.lapTime.toFixed(
    2
  )}s, Lewis: ${drivers.lewis.lapTime.toFixed(2)}s`;
  $("race-summary").textContent = summary;
}

// ====================== //
// PIT STOP LOGIC
// ====================== //
function performPitStop(driverKey, newCompound) {
  const driver = drivers[driverKey];
  const statusEl = $(`status-${driverKey}`);

  driver.compound = newCompound;
  driver.tireWear = 0;
  driver.lapTime += 20;
  statusEl.textContent = "IN PIT";
  statusEl.className = "text-yellow-400";

  setTimeout(() => {
    updateDriverUI(driverKey);
  }, updateMs * 1.5);
}

// ====================== //
// NEW: RACE RESET FUNCTION
// ====================== //
function resetRace() {
    // Stop any active simulation
    if (intervalId) clearInterval(intervalId);
    intervalId = null;

    // Reset variables
    lap = 0;
    drivers = JSON.parse(JSON.stringify(initialDriverState)); // Reset driver data

    // Clear chart data
    timeLabels.length = 0;
    speedDataLeclerc.length = 0;
    speedDataLewis.length = 0;
    tireDataLeclerc.length = 0;
    tireDataLewis.length = 0;
    fuelDataLeclerc.length = 0;
    fuelDataLewis.length = 0;
    
    // Update UI
    $("lap-number").textContent = lap;
    $("race-summary").textContent = "Race reset. Ready to start.";
    updateDriverUI("leclerc");
    updateDriverUI("lewis");
    updateCharts();
}


// ====================== //
// BUTTON CONTROLS (MODIFIED)
// ====================== //
$("start-btn").addEventListener("click", () => {
  if (intervalId) return; // Prevent multiple intervals
  // If race is over, reset before starting
  if (lap >= totalLaps) {
    resetRace();
  }
  updateMs = Number($("update-interval").value);
  intervalId = setInterval(simulateStep, updateMs);
});

$("stop-btn").addEventListener("click", () => {
  resetRace(); // NEW: Call the reset function
});

$("session-select").addEventListener("change", (e) => {
    const session = e.target.value;

    switch (session) {
        case "fp1": case "fp2": case "fp3": totalLaps = 20; break;
        case "q1": case "q2": case "q3": totalLaps = 12; break;
        case "sprint": totalLaps = 25; break;
        case "race": default: totalLaps = 58; break;
    }
    $("total-laps").textContent = totalLaps;
    resetRace(); // Reset the simulation when changing session
});

$("box-leclerc").addEventListener("click", () => {
  const selectedTire = $("tire-select-leclerc").value;
  performPitStop("leclerc", selectedTire);
});

$("box-lewis").addEventListener("click", () => {
  const selectedTire = $("tire-select-lewis").value;
  performPitStop("lewis", selectedTire);
});

// ====================== //
// AI STRATEGY INSIGHT
// ====================== //
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
  }
}

// ====================== //
// INIT
// ====================== //
window.addEventListener("load", () => {
  initCharts();
  updateDriverUI("leclerc");
  updateDriverUI("lewis");
  $("total-laps").textContent = totalLaps;
});