// ====================== //
// TIRE DATA
// ====================== //
const tireCompounds = {
  soft: { name: "Soft", color: "#ef4444", grip: 1.5, degradation: 1.8 },
  medium: { name: "Medium", color: "#facc15", grip: 0.5, degradation: 1.0 },
  hard: { name: "Hard", color: "#d1d5db", grip: -1.0, degradation: 0.6 },
  intermediate: { name: "Intermediate", color: "#4ade80", grip: -2.5, degradation: 1.2 },
  wet: { name: "Wet", color: "#38bdf8", grip: -4.0, degradation: 1.5 },
};

// ====================== //
// CIRCUIT DATA
// ====================== //
const circuits = {
    melbourne: { name: "Australia", laps: 58, tireDegFactor: 1.1, coords: { lat: -37.85, lon: 144.97 } },
    shanghai: { name: "China", laps: 56, tireDegFactor: 1.4, coords: { lat: 31.34, lon: 121.22 } },
    suzuka: { name: "Japan", laps: 53, tireDegFactor: 1.8, coords: { lat: 34.84, lon: 136.54 } },
    bahrain: { name: "Bahrain", laps: 57, tireDegFactor: 1.5, coords: { lat: 26.03, lon: 50.51 } },
    jeddah: { name: "Saudi Arabia", laps: 50, tireDegFactor: 0.9, coords: { lat: 21.63, lon: 39.10 } },
    miami: { name: "Miami", laps: 57, tireDegFactor: 1.2, coords: { lat: 25.96, lon: -80.24 } },
    imola: { name: "Emilia Romagna", laps: 63, tireDegFactor: 1.1, coords: { lat: 44.34, lon: 11.71 } },
    monaco: { name: "Monaco", laps: 78, tireDegFactor: 0.7, coords: { lat: 43.73, lon: 7.42 } },
    barcelona: { name: "Spain", laps: 66, tireDegFactor: 1.6, coords: { lat: 41.57, lon: 2.26 } },
    montreal: { name: "Canada", laps: 70, tireDegFactor: 1.2, coords: { lat: 45.50, lon: -73.52 } },
    spielberg: { name: "Austria", laps: 71, tireDegFactor: 1.0, coords: { lat: 47.22, lon: 14.76 } },
    silverstone: { name: "Great Britain", laps: 52, tireDegFactor: 1.9, coords: { lat: 52.07, lon: -1.01 } },
    spa: { name: "Belgium", laps: 44, tireDegFactor: 1.7, coords: { lat: 50.44, lon: 5.97 } },
    budapest: { name: "Hungary", laps: 70, tireDegFactor: 1.5, coords: { lat: 47.58, lon: 19.25 } },
    zandvoort: { name: "Netherlands", laps: 72, tireDegFactor: 1.6, coords: { lat: 52.39, lon: 4.54 } },
    monza: { name: "Italy", laps: 53, tireDegFactor: 0.8, coords: { lat: 45.62, lon: 9.28 } },
    baku: { name: "Azerbaijan", laps: 51, tireDegFactor: 0.9, coords: { lat: 40.37, lon: 49.85 } },
    singapore: { name: "Singapore", laps: 62, tireDegFactor: 1.6, coords: { lat: 1.29, lon: 103.86 } },
    austin: { name: "United States", laps: 56, tireDegFactor: 1.7, coords: { lat: 30.13, lon: -97.64 } },
    mexico: { name: "Mexico", laps: 71, tireDegFactor: 0.9, coords: { lat: 19.40, lon: -99.09 } },
    saopaulo: { name: "Brazil", laps: 71, tireDegFactor: 1.4, coords: { lat: -23.70, lon: -46.69 } },
    vegas: { name: "Las Vegas", laps: 50, tireDegFactor: 0.8, coords: { lat: 36.11, lon: -115.17 } },
    qatar: { name: "Qatar", laps: 57, tireDegFactor: 1.5, coords: { lat: 25.49, lon: 51.45 } },
    abudhabi: { name: "Abu Dhabi", laps: 58, tireDegFactor: 1.2, coords: { lat: 24.47, lon: 54.60 } },
};
let currentCircuit = circuits.melbourne;
let currentWeatherData = null;

// ====================== //
// DRIVER DATA (DENGAN STATISTIK UNIK)
// ====================== //
const initialDriverStates = () => [
    // Data diperbarui dengan daftar pembalap F1 2025 yang baru
    // Ferrari
    { id: 'leclerc', shortName: 'LEC', name: "Charles Leclerc", color: "#E8002D", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 1, totalRaceTime: 0, drsAvailable: false, status: 'running', reliability: 99.5, stats: { pace: 1.05, consistency: 93, tireManagement: 1.05 } },
    { id: 'lewis', shortName: 'HAM', name: "Lewis Hamilton", color: "#E8002D", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 2, totalRaceTime: 0.5, drsAvailable: false, status: 'running', reliability: 99.8, stats: { pace: 1.0, consistency: 98, tireManagement: 0.95 } },
    // Red Bull
    { id: 'verstappen', shortName: 'VER', name: "Max Verstappen", color: "#3671C6", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 3, totalRaceTime: 1.0, drsAvailable: false, status: 'running', reliability: 99.7, stats: { pace: 1.1, consistency: 97, tireManagement: 1.0 } },
    { id: 'tsunoda', shortName: 'TSU', name: "Yuki Tsunoda", color: "#3671C6", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 4, totalRaceTime: 1.5, drsAvailable: false, status: 'running', reliability: 99.2, stats: { pace: 0.78, consistency: 92, tireManagement: 1.08 } },
    // McLaren
    { id: 'norris', shortName: 'NOR', name: "Lando Norris", color: "#FF8000", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 5, totalRaceTime: 2.0, drsAvailable: false, status: 'running', reliability: 99.4, stats: { pace: 0.9, consistency: 96, tireManagement: 0.98 } },
    { id: 'piastri', shortName: 'PIA', name: "Oscar Piastri", color: "#FF8000", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "hard", position: 6, totalRaceTime: 2.5, drsAvailable: false, status: 'running', reliability: 99.6, stats: { pace: 0.88, consistency: 95, tireManagement: 1.02 } },
    // Mercedes
    { id: 'russell', shortName: 'RUS', name: "George Russell", color: "#6CD3BF", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 7, totalRaceTime: 3.0, drsAvailable: false, status: 'running', reliability: 99.5, stats: { pace: 0.85, consistency: 96, tireManagement: 1.0 } },
    { id: 'antonelli', shortName: 'ANT', name: "Kimi Antonelli", color: "#6CD3BF", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "hard", position: 8, totalRaceTime: 3.5, drsAvailable: false, status: 'running', reliability: 99.2, stats: { pace: 0.7, consistency: 92, tireManagement: 1.05 } },
    // Aston Martin
    { id: 'alonso', shortName: 'ALO', name: "Fernando Alonso", color: "#229971", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "hard", position: 9, totalRaceTime: 4.0, drsAvailable: false, status: 'running', reliability: 99.2, stats: { pace: 0.85, consistency: 99, tireManagement: 0.92 } },
    { id: 'stroll', shortName: 'STR', name: "Lance Stroll", color: "#229971", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 10, totalRaceTime: 4.5, drsAvailable: false, status: 'running', reliability: 99.0, stats: { pace: 0.6, consistency: 88, tireManagement: 1.1 } },
    // Alpine
    { id: 'gasly', shortName: 'GAS', name: "Pierre Gasly", color: "#2293D1", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 11, totalRaceTime: 5.0, drsAvailable: false, status: 'running', reliability: 98.9, stats: { pace: 0.75, consistency: 94, tireManagement: 1.0 } },
    { id: 'doohan', shortName: 'DOO', name: "Jack Doohan", color: "#2293D1", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "hard", position: 12, totalRaceTime: 5.5, drsAvailable: false, status: 'running', reliability: 99.1, stats: { pace: 0.65, consistency: 91, tireManagement: 1.02 } },
    // Williams
    { id: 'albon', shortName: 'ALB', name: "Alex Albon", color: "#37BEDD", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 13, totalRaceTime: 6.0, drsAvailable: false, status: 'running', reliability: 99.3, stats: { pace: 0.8, consistency: 95, tireManagement: 0.99 } },
    { id: 'sainz', shortName: 'SAI', name: "Carlos Sainz", color: "#37BEDD", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 14, totalRaceTime: 6.5, drsAvailable: false, status: 'running', reliability: 99.6, stats: { pace: 0.95, consistency: 97, tireManagement: 0.96 } },
    // Racing Bulls
    { id: 'lawson', shortName: 'LAW', name: "Liam Lawson", color: "#6692FF", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 15, totalRaceTime: 7.0, drsAvailable: false, status: 'running', reliability: 99.4, stats: { pace: 0.72, consistency: 94, tireManagement: 1.04 } },
    { id: 'hadjar', shortName: 'HAD', name: "Isack Hadjar", color: "#6692FF", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "soft", position: 16, totalRaceTime: 7.5, drsAvailable: false, status: 'running', reliability: 98.9, stats: { pace: 0.62, consistency: 89, tireManagement: 1.07 } },
    // Sauber
    { id: 'hulkenberg', shortName: 'HUL', name: "Nico Hülkenberg", color: "#52E252", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "hard", position: 17, totalRaceTime: 8.0, drsAvailable: false, status: 'running', reliability: 99.7, stats: { pace: 0.7, consistency: 98, tireManagement: 0.97 } },
    { id: 'bortoleto', shortName: 'BOR', name: "Gabriel Bortoleto", color: "#52E252", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 18, totalRaceTime: 8.5, drsAvailable: false, status: 'running', reliability: 99.0, stats: { pace: 0.6, consistency: 90, tireManagement: 1.06 } },
    // Haas
    { id: 'ocon', shortName: 'OCO', name: "Esteban Ocon", color: "#B6BABD", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "medium", position: 19, totalRaceTime: 9.0, drsAvailable: false, status: 'running', reliability: 99.0, stats: { pace: 0.72, consistency: 95, tireManagement: 1.01 } },
    { id: 'bearman', shortName: 'BEA', name: "Oliver Bearman", color: "#B6BABD", speed: 0, fuel: 100, tireWear: 0, lapTime: 0.0, compound: "hard", position: 20, totalRaceTime: 9.5, drsAvailable: false, status: 'running', reliability: 98.8, stats: { pace: 0.68, consistency: 91, tireManagement: 1.03 } },
];

let drivers = initialDriverStates();
let lap = 0;
let totalLaps = currentCircuit.laps;
let intervalId = null;
let updateMs = 2000;
let raceLog = [];

let raceStatus = 'green'; // 'green', 'safety-car', 'vsc'
let safetyCarLaps = 0; // Digunakan untuk SC dan VSC

const timeLabels = [], speedDataLeclerc = [], speedDataLewis = [], tireDataLeclerc = [], tireDataLewis = [], fuelDataLeclerc = [], fuelDataLewis = [];

const $ = (id) => document.getElementById(id);
const rand = (min, max) => Math.random() * (max - min) + min;

// ====================== //
// LOGGING SYSTEM
// ====================== //
function logEvent(message, type = 'info') {
    const logEntry = { lap, message, type };
    raceLog.unshift(logEntry);
    if (raceLog.length > 50) raceLog.pop();
    updateRaceLogUI();
}

function updateRaceLogUI() {
    const container = $('race-log-container');
    container.innerHTML = raceLog.map(entry => {
        let colorClass = 'text-gray-300';
        if (entry.type === 'pit') colorClass = 'text-yellow-400';
        if (entry.type === 'overtake') colorClass = 'text-green-400';
        if (entry.type === 'system') colorClass = 'text-sky-400';
        if (entry.type === 'sc' || entry.type === 'vsc') colorClass = 'text-amber-500 font-bold';
        if (entry.type === 'dnf') colorClass = 'text-red-500 font-bold';
        // BARU: Warna log untuk kesalahan pembalap
        if (entry.message.includes('goes wide') || entry.message.includes('lock-up') || entry.message.includes('spin')) colorClass = 'text-orange-400';
        return `<div class="${colorClass}"><span class="font-semibold">[Lap ${entry.lap}]</span> ${entry.message}</div>`;
    }).join('');
}

// ====================== //
// LIVE STANDINGS (MODIFIED FOR DNF)
// ====================== //
function updateStandingsUI() {
    const container = $('standings-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="grid grid-cols-12 gap-2 text-xs text-gray-400 font-bold mb-1 px-2">
            <div class="col-span-1">Pos</div>
            <div class="col-span-3">Driver</div>
            <div class="col-span-3">Tire</div>
            <div class="col-span-2">Lap Time</div>
            <div class="col-span-2">Interval</div>
            <div class="col-span-1 text-center">DRS</div>
        </div>
        ${drivers.map((d, index) => {
            const tire = tireCompounds[d.compound];
            const isFeatured = d.id === 'leclerc' || d.id === 'lewis';
            let interval = 'Leader';
            // Hitung interval hanya untuk pembalap yang masih berlomba
            if (index > 0 && d.status === 'running') {
                const driverAhead = drivers.slice(0, index).reverse().find(da => da.status === 'running');
                if(driverAhead) {
                    interval = `+${(d.totalRaceTime - driverAhead.totalRaceTime).toFixed(2)}s`;
                }
            }

            const drsIndicator = d.drsAvailable ? `<div class="w-4 h-4 mx-auto rounded-full bg-purple-500" title="DRS Available"></div>` : '';
            const isDNF = d.status === 'DNF';

            return `
                <div class="grid grid-cols-12 gap-2 text-sm items-center rounded p-1 px-2 ${isFeatured ? 'bg-gray-700' : ''} ${isDNF ? 'opacity-50' : ''}">
                    <div class="col-span-1 font-bold">${isDNF ? 'DNF' : d.position}</div>
                    <div class="col-span-3 flex items-center gap-2">
                        <div class="w-1 h-4 rounded-full" style="background-color: ${d.color};"></div>
                        <span>${d.name}</span>
                    </div>
                    <div class="col-span-3 flex items-center gap-2 text-xs">
                       <div class="w-2 h-2 rounded-full" style="background-color: ${tire.color};"></div>
                       <span>${tire.name}</span>
                    </div>
                    <div class="col-span-2 font-mono">${d.lapTime > 0 && !isDNF ? d.lapTime.toFixed(2) : '--.--'}</div>
                    <div class="col-span-2 font-mono text-gray-300">${isDNF ? 'OUT' : interval}</div>
                    <div class="col-span-1">${drsIndicator}</div>
                </div>
            `;
        }).join('')}
    `;
}

// ====================== //
// UI UPDATE (MODIFIED FOR DNF)
// ====================== //
function updateDriverUI(driverId) {
    const d = drivers.find(drv => drv.id === driverId);
    if (!d || !$(`speed-${driverId}`)) return;

    const isDNF = d.status === 'DNF';
    $(`speed-${driverId}`).textContent = d.speed === 0 || isDNF ? "— km/h" : `${Math.round(d.speed)} km/h`;
    $(`laptime-${driverId}`).textContent = d.lapTime === 0 || isDNF ? "—" : `${d.lapTime.toFixed(2)} s`;
    $(`fuel-${driverId}`).textContent = isDNF ? '— %' : `${Math.round(d.fuel)} %`;
    $(`tire-${driverId}`).textContent = isDNF ? '— %' : `${Math.round(d.tireWear)} %`;
    $(`position-${driverId}`).textContent = isDNF ? 'DNF' : `P${d.position}`;
    $(`compound-${driverId}`).textContent = tireCompounds[d.compound].name;

    const isBox = d.tireWear > 90 || d.fuel < 5;
    const statusEl = $(`status-${driverId}`);

    if (isDNF) {
        statusEl.textContent = "OUT";
        statusEl.className = "text-red-500 font-bold";
    } else {
        statusEl.textContent = isBox ? "Box Now!" : "Green";
        statusEl.className = isBox ? "text-red-400 font-bold animate-pulse" : "text-green-400";
    }
}

// ====================== //
// FLAG UI (MODIFIED FOR VSC)
// ====================== //
function updateFlagUI() {
    const icon = $('flag-status-icon');
    const text = $('flag-status-text');
    if (raceStatus === 'safety-car') {
        icon.className = 'w-6 h-6 rounded-full bg-yellow-500 animate-pulse';
        text.className = 'font-bold text-yellow-400';
        text.textContent = 'SAFETY CAR';
    } else if (raceStatus === 'vsc') {
        icon.className = 'w-6 h-6 rounded-full bg-yellow-500 animate-pulse';
        text.className = 'font-bold text-yellow-400';
        text.textContent = 'VIRTUAL SAFETY CAR';
    } else {
        icon.className = 'w-6 h-6 rounded-full bg-green-500';
        text.className = 'font-bold text-green-400';
        text.textContent = 'GREEN FLAG';
    }
}


// ====================== //
// SIMULATION ENGINE (DENGAN DRIVER STATS & ERRORS)
// ====================== //
function simulateStep() {
    lap++;
    $("lap-number").textContent = lap;

    // Logika Safety Car & VSC
    if (raceStatus === 'safety-car' || raceStatus === 'vsc') {
        safetyCarLaps--;
        drivers.filter(d => d.status === 'running').forEach(d => {
            if (raceStatus === 'safety-car') {
                d.speed = 120 + rand(-5, 5);
                d.lapTime = 140 + rand(-1, 1);
            } else { // VSC
                d.speed = 200 + rand(-10, 10);
                d.lapTime = 110 + rand(-1, 1);
            }
            d.totalRaceTime += d.lapTime;
        });
        
        const statusText = raceStatus === 'safety-car' ? 'Safety Car' : 'Virtual Safety Car';
        logEvent(`${statusText} lap. Laps remaining: ${safetyCarLaps}`, raceStatus.replace('-', ''));

        if (safetyCarLaps <= 0) {
            logEvent(`${statusText.split(' ')[0]} ENDING. Race resumes.`, raceStatus.replace('-', ''));
            raceStatus = 'green';
            updateFlagUI();
        }
    } 
    // Logika balapan normal
    else { 
        // Kemungkinan munculnya insiden random
        const incidentChance = Math.random();
        if (lap > 5 && lap < totalLaps - 5 && raceStatus === 'green') {
            if (incidentChance < 0.02) {
                raceStatus = 'safety-car';
                safetyCarLaps = 3;
                logEvent('SAFETY CAR DEPLOYED! (Random Incident)', 'sc');
                updateFlagUI();
                return;
            } else if (incidentChance < 0.05) {
                raceStatus = 'vsc';
                safetyCarLaps = 2;
                logEvent('VIRTUAL SAFETY CAR DEPLOYED (Random Incident)', 'vsc');
                updateFlagUI();
                return;
            }
        }
        
        const oldPositions = new Map(drivers.map(d => [d.id, d.position]));
        const runningDrivers = drivers.filter(d => d.status === 'running');
        const isRaining = currentWeatherData && currentWeatherData.current.precipitation > 0;

        // Cek DRS
        for(let i = 1; i < runningDrivers.length; i++) {
            const driverAhead = runningDrivers[i-1];
            const currentDriver = runningDrivers[i];
            const gap = currentDriver.totalRaceTime - driverAhead.totalRaceTime;
            currentDriver.drsAvailable = gap < 1.0 && raceStatus === 'green' && !isRaining;
        }
        if (runningDrivers.length > 0) runningDrivers[0].drsAvailable = false;

        runningDrivers.forEach((d) => {
            // Peluang DNF Mekanis
            if (Math.random() * 100 > d.reliability && lap > 2) {
                const reasons = ["Engine Failure", "Gearbox Problem", "Brake Failure", "Suspension Damage"];
                d.status = 'DNF'; d.speed = 0; d.lapTime = 0;
                logEvent(`${d.shortName} is OUT! Reason: ${reasons[Math.floor(Math.random() * reasons.length)]}`, 'dnf');
                return;
            }

            // Peluang Kesalahan Pembalap berdasarkan Konsistensi
            const errorChance = (100 - d.stats.consistency) / 500;
            if (Math.random() < errorChance) {
                const errorSeverity = Math.random();
                if (errorSeverity < 0.6) {
                    const timeLoss = rand(0.5, 1.5);
                    d.totalRaceTime += timeLoss;
                    logEvent(`${d.shortName} goes wide and loses ${timeLoss.toFixed(1)}s!`, 'info');
                } else if (errorSeverity < 0.85) {
                    const wearPenalty = rand(3, 6);
                    d.tireWear += wearPenalty;
                    logEvent(`${d.shortName} has a lock-up! Extra ${wearPenalty.toFixed(1)}% tire wear.`, 'info');
                } else if (errorSeverity < 0.98) {
                    const timeLoss = rand(5, 8);
                    d.totalRaceTime += timeLoss;
                    logEvent(`${d.shortName} has a spin! A costly mistake, losing ${timeLoss.toFixed(1)}s.`, 'sc');
                } else {
                    d.status = 'DNF'; d.speed = 0; d.lapTime = 0;
                    logEvent(`${d.shortName} has CRASHED OUT of the race!`, 'dnf');
                    if (raceStatus === 'green') {
                        raceStatus = 'safety-car'; safetyCarLaps = 3;
                        logEvent('SAFETY CAR DEPLOYED due to the crash!', 'sc');
                        updateFlagUI();
                    }
                    return;
                }
            }

            const tire = tireCompounds[d.compound];
            let gripModifier = tire.grip;
            let tireWearRate = tire.degradation * currentCircuit.tireDegFactor * d.stats.tireManagement;
            let drsBonus = d.drsAvailable ? 15 : 0;

            // Logika Hujan
            if (isRaining) {
                if (d.compound === 'intermediate' || d.compound === 'wet') gripModifier = (d.compound === 'wet' ? 3.0 : 2.0);
                else gripModifier -= 5.0;
            } else {
                if (d.compound === 'intermediate' || d.compound === 'wet') {
                    gripModifier -= 3.0;
                    tireWearRate *= 3;
                }
            }

            if (lap === 1) d.speed = 300;
            d.speed = Math.max(200, Math.min(340, d.speed + rand(-5, 5) + gripModifier)) + drsBonus;
            
            const baseLapTime = 90;
            const consistencyFactor = (100 - d.stats.consistency) / 100;
            const paceBonus = d.stats.pace;
            d.lapTime = Math.max(baseLapTime - 10, baseLapTime + rand(-0.5, 0.5) * (1 + consistencyFactor) - (gripModifier * 1.5) + (d.tireWear / 20) - (drsBonus / 10) - paceBonus);
            
            d.totalRaceTime += d.lapTime;
            d.fuel = Math.max(0, d.fuel - rand(1.6, 1.8));
            d.tireWear = Math.min(100, d.tireWear + rand(0.8, 2.0) * tireWearRate);

            // Logika Radio
            if ((d.id === 'leclerc' || d.id === 'lewis') && d.status === 'running') {
                const prevTireWear = d.tireWear - (rand(0.8, 2.0) * tireWearRate);
                const prevFuel = d.fuel + rand(1.6, 1.8);
                if (d.tireWear > 85 && prevTireWear <= 85) logEvent(`To ${d.shortName}: Box, box, tires are gone.`, 'info');
                if (d.fuel < 10 && prevFuel >= 10) logEvent(`To ${d.shortName}: We need to save fuel.`, 'info');
            }
        });

        // Urutkan pembalap dan perbarui posisi
        const stillRunning = drivers.filter(d => d.status === 'running').sort((a, b) => a.totalRaceTime - b.totalRaceTime);
        const dnfDrivers = drivers.filter(d => d.status === 'DNF');
        drivers = [...stillRunning, ...dnfDrivers];

        drivers.forEach((d, index) => {
            if (d.status === 'running') {
                const oldPos = oldPositions.get(d.id);
                d.position = index + 1;
                if (lap > 1 && oldPos && d.position < oldPos) {
                    logEvent(`${d.shortName} overtakes for P${d.position}`, 'overtake');
                }
            }
        });
    }

    updateStandingsUI();
    updateDriverUI("leclerc");
    updateDriverUI("lewis");
    updateCharts();

    if (lap >= totalLaps) {
        clearInterval(intervalId);
        intervalId = null;
        logEvent("Race Finished 🏁", 'system');
        getRaceInsight();
    }
}

// ====================== //
// CHARTS
// ====================== //
let speedChart, tireChart, fuelChart;
function initCharts() {
  const chartOptions = { responsive: true, maintainAspectRatio: false, animation: false, scales: { x: { ticks: { color: "#aaa" } }, y: { ticks: { color: "#aaa" }, beginAtZero: false } }, plugins: { legend: { labels: { color: "#fff" } } }, };
  const getChartData = (lecData, hamData, lecLabel, hamLabel) => ({ labels: timeLabels, datasets: [ { label: lecLabel, data: lecData, borderColor: '#f43f5e', borderWidth: 2, tension: 0.2, pointRadius: 0 }, { label: hamLabel, data: hamData, borderColor: '#60a5fa', borderWidth: 2, tension: 0.2, pointRadius: 0 }, ], });
  speedChart = new Chart($("speedChart"), { type: "line", data: getChartData(speedDataLeclerc, speedDataLewis, "Leclerc Speed", "Hamilton Speed"), options: chartOptions });
  tireChart = new Chart($("tireChart"), { type: "line", data: getChartData(tireDataLeclerc, tireDataLewis, "Leclerc Tire", "Hamilton Tire"), options: chartOptions });
  fuelChart = new Chart($("fuelChart"), { type: "line", data: getChartData(fuelDataLeclerc, fuelDataLewis, "Leclerc Fuel", "Hamilton Fuel"), options: chartOptions });
}

function updateCharts() {
    const leclerc = drivers.find(d => d.id === 'leclerc');
    const lewis = drivers.find(d => d.id === 'lewis');
    if (!leclerc || !lewis) return;

    timeLabels.push(`L${lap}`);
    speedDataLeclerc.push(leclerc.status === 'running' ? leclerc.speed : null); 
    speedDataLewis.push(lewis.status === 'running' ? lewis.speed : null);
    tireDataLeclerc.push(leclerc.status === 'running' ? leclerc.tireWear : null); 
    tireDataLewis.push(lewis.status === 'running' ? lewis.tireWear : null);
    fuelDataLeclerc.push(leclerc.status === 'running' ? leclerc.fuel : null);
    fuelDataLewis.push(lewis.status === 'running' ? lewis.fuel : null);

    const maxPoints = 30;
    [timeLabels, speedDataLeclerc, speedDataLewis, tireDataLeclerc, tireDataLewis, fuelDataLeclerc, fuelDataLewis].forEach(arr => {
        if (arr.length > maxPoints) arr.shift();
    });

    speedChart.update(); 
    tireChart.update(); 
    fuelChart.update();
}

// ====================== //
// PIT STOP LOGIC (MODIFIED FOR VSC)
// ====================== //
function performPitStop(driverId, newCompound) {
    const driver = drivers.find(d => d.id === driverId);
    if (!driver || lap === 0 || driver.status === 'DNF') return;
    
    let pitStopTime = 22 + rand(-1, 1);
    if (raceStatus === 'safety-car') {
        pitStopTime = 12 + rand(-1, 1);
    } else if (raceStatus === 'vsc') {
        pitStopTime = 16 + rand(-1, 1); // Waktu pit stop saat VSC
    }
    
    driver.totalRaceTime += pitStopTime;
    driver.compound = newCompound;
    driver.tireWear = 0;
    logEvent(`${driver.shortName} pits for ${newCompound} tires. Pit stop time: ${pitStopTime.toFixed(1)}s`, 'pit');
    
    const statusEl = $(`status-${driverId}`);
    if (statusEl) {
        statusEl.textContent = "IN PIT";
        statusEl.className = "text-yellow-400";
        setTimeout(() => { updateDriverUI(driverId); }, updateMs * 1.5);
    }
}

// ====================== //
// RACE RESET FUNCTION
// ====================== //
function resetRace() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    lap = 0;
    raceStatus = 'green';
    safetyCarLaps = 0;
    updateFlagUI();

    drivers = initialDriverStates();
    raceLog = [];
    timeLabels.length = 0;
    [speedDataLeclerc, speedDataLewis, tireDataLeclerc, tireDataLewis, fuelDataLeclerc, fuelDataLewis].forEach(arr => arr.length = 0);
    
    const session = $('session-select').value;
    switch (session) {
        case 'sprint': totalLaps = 25; break;
        case 'q3': totalLaps = 12; break;
        case 'race': default: totalLaps = currentCircuit.laps; break;
    }

    $("lap-number").textContent = lap;
    $("total-laps").textContent = totalLaps;

    const oldInsight = document.querySelector(".ai-insight-box");
    if(oldInsight) oldInsight.remove();
    
    const sessionName = session.charAt(0).toUpperCase() + session.slice(1);
    logEvent(`Welcome to ${currentCircuit.name}. Session: ${sessionName}. Distance: ${totalLaps} laps.`, 'system');
    updateDriverUI("leclerc");
    updateDriverUI("lewis");
    updateCharts();
    updateStandingsUI();
}

// ====================== //
// WEATHER LOGIC
// ====================== //
async function fetchWeather(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        currentWeatherData = data;
        updateWeatherUI(data);
    } catch (error) { console.error("Failed to fetch weather:", error); $('weather-desc').textContent = "Error"; }
}
function updateWeatherUI(data) {
    const { temperature_2m, apparent_temperature, precipitation, wind_speed_10m, relative_humidity_2m } = data.current;
    $('weather-temp').textContent = `${Math.round(temperature_2m)} °C`;
    $('weather-feels').textContent = `Feels like ${Math.round(apparent_temperature)} °C`;
    $('weather-wind').textContent = `${Math.round(wind_speed_10m)} km/h`;
    $('weather-humidity').textContent = `Humidity: ${relative_humidity_2m} %`;
    let weatherCondition = 'Clear', weatherIcon = '☀️';
    if (precipitation > 0.5) { weatherCondition = 'Rainy'; weatherIcon = '🌧️'; } 
    else if (precipitation > 0) { weatherCondition = 'Drizzle'; weatherIcon = '💧'; }
    $('weather-icon').textContent = weatherIcon;
    $('weather-desc').textContent = weatherCondition;
    if(lap > 0) logEvent(`Weather update: ${weatherCondition}, Temp: ${Math.round(temperature_2m)}°C`, 'system');
}
function populateCircuits() {
    const select = $('circuit-select');
    Object.keys(circuits).forEach(key => {
        const circuit = circuits[key];
        const option = document.createElement('option');
        option.value = key;
        option.textContent = circuit.name;
        if (key === "melbourne") option.selected = true;
        select.appendChild(option);
    });
}

// ====================== //
// BUTTON CONTROLS
// ====================== //
$("start-btn").addEventListener("click", () => {
  if (intervalId) return;
  if (lap >= totalLaps) { resetRace(); }
  updateMs = Number($("update-interval").value);
  intervalId = setInterval(simulateStep, updateMs);
});
$("stop-btn").addEventListener("click", resetRace);
$("session-select").addEventListener("change", resetRace);
$("box-leclerc").addEventListener("click", () => performPitStop('leclerc', $("tire-select-leclerc").value));
$("box-lewis").addEventListener("click", () => performPitStop('lewis', $("tire-select-lewis").value));
$('circuit-select').addEventListener('change', (e) => {
    currentCircuit = circuits[e.target.value];
    fetchWeather(currentCircuit.coords.lat, currentCircuit.coords.lon);
    resetRace();
});

// ====================== //
// AI STRATEGY INSIGHT
// ====================== //
async function getRaceInsight() {
  try {
    // FIX: Mengirim data pembalap terlepas dari status mereka (running atau DNF).
    // Menghapus '&& d.status === 'running'' agar data tetap dikirim jika DNF.
    const leclercData = drivers.find(d=>d.id==='leclerc');
    const lewisData = drivers.find(d=>d.id==='lewis');

    // Tambahkan pengecekan untuk memastikan data tidak kosong sebelum mengirim
    if (!leclercData || !lewisData) {
        console.error("Data pembalap untuk AI insight tidak ditemukan.");
        return;
    }

    const response = await fetch("https://ai-strategy-server-production.up.railway.app/strategy", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lap, leclerc: leclercData, lewis: lewisData }),
    });
    if (!response.ok) return;
    const data = await response.json();
    const insightBox = document.createElement("div");
    insightBox.className = "ai-insight-box mt-3 p-3 bg-green-900 border border-green-700 rounded-lg text-sm text-green-200 animate-fade-in";
    insightBox.innerHTML = `<b>AI Strategy Insight 🧠:</b> ${data.insight || "No insight available."}`;
    $('race-log-container').parentElement.appendChild(insightBox);
  } catch (err) { console.error("AI Strategy Error:", err); }
}

// ====================== //
// INIT
// ====================== //
window.addEventListener("load", () => {
  populateCircuits();
  initCharts();
  fetchWeather(currentCircuit.coords.lat, currentCircuit.coords.lon).then(resetRace);
});



