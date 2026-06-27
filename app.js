const camera = document.querySelector("#camera");
const photoInput = document.querySelector("#photoInput");
const snapshot = document.querySelector("#snapshot");
const viewport = document.querySelector("#viewport");
const cameraBtn = document.querySelector("#cameraBtn");
const snapBtn = document.querySelector("#snapBtn");
const demoBtn = document.querySelector("#demoBtn");
const statusText = document.querySelector("#statusText");
const caughtCount = document.querySelector("#caughtCount");
const cardGrid = document.querySelector("#cardGrid");
const cardTemplate = document.querySelector("#cardTemplate");
const resultBurst = document.querySelector("#resultBurst");
const resultName = document.querySelector("#resultName");
const mapBoard = document.querySelector("#mapBoard");
const statList = document.querySelector("#statList");
const rarityMix = document.querySelector("#rarityMix");
const resetBtn = document.querySelector("#resetBtn");

const names = ["Biscuit", "Rocket", "Miso", "Pixel", "Noodle", "Scout", "Maple", "Ziggy", "Pepper", "Tango"];
const rarities = [
  { label: "Common", color: "#58c4a5", weight: 48 },
  { label: "Rare", color: "#69a7ff", weight: 28 },
  { label: "Epic", color: "#5f4bb6", weight: 17 },
  { label: "Legend", color: "#ef6554", weight: 7 },
];
const stats = ["zoom", "charm", "sniff"];

let stream = null;
let collection = JSON.parse(localStorage.getItem("puppymon.collection") || "[]");

function save() {
  localStorage.setItem("puppymon.collection", JSON.stringify(collection));
}

function pickRarity() {
  const roll = Math.random() * 100;
  let cursor = 0;
  return rarities.find((rarity) => {
    cursor += rarity.weight;
    return roll <= cursor;
  }) || rarities[0];
}

function makeDog() {
  const rarity = pickRarity();
  const level = Math.floor(1 + Math.random() * 19 + rarities.indexOf(rarity) * 4);
  return {
    id: crypto.randomUUID(),
    name: names[Math.floor(Math.random() * names.length)],
    rarity: rarity.label,
    color: rarity.color,
    level,
    stats: Object.fromEntries(stats.map((key) => [key, Math.floor(38 + Math.random() * 58)])),
    x: 12 + Math.random() * 76,
    y: 12 + Math.random() * 76,
    ears: Math.random() > 0.5 ? "point" : "flop",
  };
}

function dogSvg(dog) {
  const earPath = dog.ears === "point"
    ? '<path d="M25 39 36 9l16 29M64 38 82 11l6 34" fill="#fff8df" stroke="#151515" stroke-width="6" stroke-linejoin="round"/>'
    : '<path d="M31 36c-23-3-23 28-4 35M73 35c24-5 27 27 8 36" fill="#fff8df" stroke="#151515" stroke-width="6" stroke-linecap="round"/>';
  return `
    <svg viewBox="0 0 112 112" aria-hidden="true">
      <circle cx="56" cy="56" r="42" fill="#fff8df" stroke="#151515" stroke-width="6"/>
      ${earPath}
      <circle cx="43" cy="53" r="5" fill="#151515"/>
      <circle cx="69" cy="53" r="5" fill="#151515"/>
      <path d="M51 67c5 5 13 5 18 0" fill="none" stroke="#151515" stroke-width="5" stroke-linecap="round"/>
      <path d="M52 61c3-5 10-5 13 0-1 5-4 8-7 8s-5-3-6-8z" fill="#151515"/>
      <path d="M23 78c14 14 50 17 68 0" fill="none" stroke="${dog.color}" stroke-width="7" stroke-linecap="round"/>
    </svg>
  `;
}

function renderCards() {
  cardGrid.innerHTML = "";
  collection.forEach((dog) => {
    const node = cardTemplate.content.firstElementChild.cloneNode(true);
    node.style.setProperty("--card-bg", dog.color);
    node.querySelector(".card-art").innerHTML = dogSvg(dog);
    node.querySelector(".rarity").textContent = dog.rarity;
    node.querySelector("h3").textContent = dog.name;
    node.querySelector(".level").textContent = `LV ${dog.level}`;
    node.querySelector(".bars").innerHTML = stats.map((key) => `
      <div class="bar">
        <span>${key}</span>
        <span class="track"><span class="fill" style="--value:${dog.stats[key]}%"></span></span>
        <span>${dog.stats[key]}</span>
      </div>
    `).join("");
    cardGrid.prepend(node);
  });
  caughtCount.textContent = collection.length;
}

function renderMap() {
  mapBoard.querySelectorAll(".pin").forEach((pin) => pin.remove());
  collection.forEach((dog) => {
    const pin = document.createElement("div");
    pin.className = "pin";
    pin.style.left = `${dog.x}%`;
    pin.style.top = `${dog.y}%`;
    pin.style.setProperty("--pin", dog.color);
    pin.innerHTML = `<span>${dog.name.slice(0, 1)}</span>`;
    mapBoard.appendChild(pin);
  });
}

function renderStats() {
  const counts = Object.fromEntries(rarities.map((rarity) => [rarity.label, 0]));
  collection.forEach((dog) => counts[dog.rarity] += 1);
  statList.innerHTML = rarities.map((rarity) => {
    const value = counts[rarity.label];
    const pct = collection.length ? Math.max(8, Math.round((value / collection.length) * 100)) : 0;
    return `
      <div class="stat-row" style="--card-bg:${rarity.color}">
        <span>${rarity.label}</span>
        <span class="track"><span class="fill" style="--value:${pct}%"></span></span>
        <span>${value}</span>
      </div>
    `;
  }).join("");
  rarityMix.textContent = collection.length ? `${collection.length} total` : "fresh run";
}

function renderAll() {
  renderCards();
  renderMap();
  renderStats();
}

async function openCamera() {
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      photoInput.click();
      return;
    }
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
    camera.srcObject = stream;
    await camera.play();
    viewport.classList.add("has-camera");
    statusText.textContent = "Camera ready. Center the pup and snap.";
  } catch {
    statusText.textContent = "Live camera unavailable. Opening phone camera instead.";
    photoInput.click();
  }
}

function captureFrame() {
  const ctx = snapshot.getContext("2d");
  if (stream && camera.videoWidth) {
    snapshot.width = camera.videoWidth;
    snapshot.height = camera.videoHeight;
    ctx.drawImage(camera, 0, 0, snapshot.width, snapshot.height);
    viewport.classList.add("has-snapshot");
  }
}

function loadPhoto(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const ctx = snapshot.getContext("2d");
      const maxSide = 1200;
      const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
      snapshot.width = Math.max(1, Math.round(img.naturalWidth * scale));
      snapshot.height = Math.max(1, Math.round(img.naturalHeight * scale));
      ctx.drawImage(img, 0, 0, snapshot.width, snapshot.height);
      URL.revokeObjectURL(img.src);
      viewport.classList.add("has-snapshot");
      resolve();
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

async function runCatch(isDemo = false) {
  statusText.textContent = "Checking for a real-time pup signal...";
  snapBtn.disabled = true;
  if (!isDemo) captureFrame();
  await new Promise((resolve) => setTimeout(resolve, 520));
  const dog = makeDog();
  collection.push(dog);
  save();
  resultName.textContent = dog.name;
  resultBurst.classList.remove("show");
  void resultBurst.offsetWidth;
  resultBurst.classList.add("show");
  statusText.textContent = `${dog.name} joined your Puppydex as ${dog.rarity}.`;
  snapBtn.disabled = false;
  renderAll();
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.view}View`).classList.add("active");
  });
});

cameraBtn.addEventListener("click", openCamera);
snapBtn.addEventListener("click", () => {
  if (stream && camera.videoWidth) {
    runCatch(false);
    return;
  }
  statusText.textContent = "Opening the phone camera for a fresh snap.";
  photoInput.click();
});
demoBtn.addEventListener("click", () => runCatch(true));
photoInput.addEventListener("change", async () => {
  const file = photoInput.files?.[0];
  if (!file) return;
  try {
    statusText.textContent = "Photo received. Checking the pup signal...";
    await loadPhoto(file);
    await runCatch(true);
  } catch {
    statusText.textContent = "Could not read that photo. Try another snap.";
  } finally {
    photoInput.value = "";
  }
});
resetBtn.addEventListener("click", () => {
  collection = [];
  save();
  statusText.textContent = "Puppydex cleared. Fresh walk, fresh finds.";
  renderAll();
});

if (collection.length === 0) {
  collection = [makeDog(), makeDog(), makeDog()];
  save();
}

renderAll();
