# 🏎️ PitWall - F1 Race Strategy Dashboard

<p align="center">
<strong>An immersive real-time F1 race strategy simulation dashboard. Experience the thrill of the <em>pit wall</em> as you monitor telemetry, dynamic weather, and unpredictable race-changing incidents.</strong>
</p>

---

## 🚀 About This Project

**PitWall** is an interactive web application born from a passion for the data-driven and strategic world of Formula 1. The project aims to simulate F1 races in real-time, giving users the sensation of being on a real pit wall.

The main focuses of this project are:

* **Realistic Simulation** — Brings unpredictable race dynamics including weather, Safety Cars, DNFs (Did Not Finish), and driver errors.
* **Intuitive Data Visualization** — Displays complex telemetry data (speed, tire wear, fuel) through easy-to-read charts.
* **AI Integration** — Uses AI to automatically provide post-race strategic analysis, summarizing key insights from the race.

---

## ✨ Key Features

### 🖥️ Dashboard & Visualization

* **📊 Live Standings:** Real-time leaderboard of all 20 drivers, updated every lap, with time intervals and DRS status.
* **📈 Telemetry Charts:** Real-time graphs comparing speed, tire wear, and fuel levels between top drivers.
* **👤 Driver Panels:** Detailed telemetry information for monitored drivers.
* **📋 Race & Strategy Log:** Records of all key race events (overtakes, pit stops, incidents, and team radio messages).

### ⚙️ Dynamic Simulation

* **🏎️ Driver Characteristics:** Each driver has unique stats (Pace, Consistency, Tire Management) that dynamically influence performance.
* **🌦️ Realistic Weather:** Weather conditions are fetched from the Open-Meteo API and significantly affect tire grip.
* **💨 DRS (Drag Reduction System):** Drivers gain a speed boost when within 1 second of the car ahead.

### ⚡ Incidents & Strategy

* **🟡 Safety Car & VSC:** Can appear randomly or due to crashes, slowing down the race and opening strategic pit stop opportunities.
* **💥 DNFs & Driver Errors:** Drivers can suffer mechanical failures or make mistakes (wide runs, spins, crashes) based on their stats.

### 💡 Highlight Feature

* **🧠 AI Strategy Insight:** After the race, data is sent to the backend server, which requests an AI model to provide an analytical summary of performance and strategy.

---

## 🛠️ Tech Stack

**Frontend:**

* HTML, CSS, JavaScript (no heavy frameworks)

**Backend (for AI Features):**

* Node.js / Express.js

**Third-Party APIs:**

* Open-Meteo API — for real weather data
* Replicate API — for AI analysis

---

## 🏁 How to Run

To run this project locally, follow these steps:

1. **Clone this repository:**

```bash
git clone https://github.com/Kubrooo/pit-wall-dashboard.git
```

2. **Navigate into the project directory:**

```bash
cd pit-wall-dashboard
```

3. **Open the `index.html` file** in your favorite browser. No installation or local server required — everything runs on the client side!

> Note: The **AI Strategy Insight** feature requires a backend server to function. The server code is included in this repository.

---

## 🔮 Roadmap

* [ ] Qualification Mode — Add a qualifying session to determine starting grid positions.
* [ ] Automated Pit Stop Strategy — AI not only analyzes but also recommends optimal pit stop timing.
* [ ] Race Result Database — Save and analyze simulation results for future insights.

---

## 🤝 Contributing

Thank you for checking out this project! If you have suggestions or feedback, feel free to:

* Create an **Issue** to report bugs or suggest new features 🧩
* Submit a **Pull Request** to contribute directly to development ⚙️

---

> "Speed. Strategy. Precision. — Welcome to the PitWall."
