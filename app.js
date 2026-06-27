const camera = document.querySelector("#camera");
const photoInput = document.querySelector("#photoInput");
const snapshot = document.querySelector("#snapshot");
const viewport = document.querySelector("#viewport");
const cameraBtn = document.querySelector("#cameraBtn");
const snapBtn = document.querySelector("#snapBtn");
const demoBtn = document.querySelector("#demoBtn");
const statusText = document.querySelector("#statusText");
const detectionChip = document.querySelector("#detectionChip");
const caughtCount = document.querySelector("#caughtCount");
const cardGrid = document.querySelector("#cardGrid");
const cardTemplate = document.querySelector("#cardTemplate");
const resultBurst = document.querySelector("#resultBurst");
const resultName = document.querySelector("#resultName");
const mapBoard = document.querySelector("#mapBoard");
const mapCenter = document.querySelector("#mapCenter");
const statList = document.querySelector("#statList");
const rarityMix = document.querySelector("#rarityMix");
const mapMode = document.querySelector("#mapMode");
const mapNote = document.querySelector("#mapNote");
const resetBtn = document.querySelector("#resetBtn");
const namingSheet = document.querySelector("#namingSheet");
const sheetPhoto = document.querySelector("#sheetPhoto");
const sheetBreed = document.querySelector("#sheetBreed");
const sheetTraits = document.querySelector("#sheetTraits");
const sheetLocation = document.querySelector("#sheetLocation");
const nameInput = document.querySelector("#nameInput");
const saveCatchBtn = document.querySelector("#saveCatchBtn");
const cancelCatchBtn = document.querySelector("#cancelCatchBtn");

const names = ["Biscuit", "Rocket", "Miso", "Pixel", "Noodle", "Scout", "Maple", "Ziggy", "Pepper", "Tango"];
const rarities = [
  { label: "Common", color: "#58c4a5", weight: 48 },
  { label: "Rare", color: "#69a7ff", weight: 28 },
  { label: "Epic", color: "#f7d84a", weight: 17 },
  { label: "Legend", color: "#ef6554", weight: 7 },
];
const stats = ["zoom", "charm", "sniff"];

let stream = null;
let detectorModel = null;
let breedModel = null;
let currentCoords = null;
let pendingCatch = null;
let collection = JSON.parse(localStorage.getItem("puppymon.collection") || "[]");

function save() {
  localStorage.setItem("puppymon.collection", JSON.stringify(collection));
}

function formatCapturedAt(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "unknown time";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function updateStatus(text, badge = null) {
  statusText.textContent = text;
  if (badge) detectionChip.textContent = badge;
}

function pickRarity(score) {
  const boosted = Math.min(100, Math.round(score * 100) + Math.floor(Math.random() * 8));
  let roll = Math.max(1, boosted - Math.floor(Math.random() * 30));
  let cursor = 0;
  return rarities.find((rarity) => {
    cursor += rarity.weight;
    return roll <= cursor;
  }) || rarities[0];
}

function traitsFromPixels(sample) {
  const tone = sample.avgR > sample.avgB + 18 ? "warm coat" : sample.avgB > sample.avgR + 18 ? "cool-toned coat" : "balanced coat";
  const brightness = sample.avgL > 165 ? "light fur" : sample.avgL < 105 ? "dark fur" : "mid-tone fur";
  const size = sample.coverage > 0.35 ? "big frame" : sample.coverage < 0.18 ? "small frame" : "medium build";
  return [tone, brightness, size];
}

function extractColorProfile(ctx, box) {
  const sx = Math.max(0, Math.floor(box[0]));
  const sy = Math.max(0, Math.floor(box[1]));
  const sw = Math.max(1, Math.floor(box[2]));
  const sh = Math.max(1, Math.floor(box[3]));
  const pixels = ctx.getImageData(sx, sy, sw, sh).data;
  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  const count = Math.max(1, pixels.length / 4);
  for (let i = 0; i < pixels.length; i += 4) {
    totalR += pixels[i];
    totalG += pixels[i + 1];
    totalB += pixels[i + 2];
  }
  const avgR = totalR / count;
  const avgG = totalG / count;
  const avgB = totalB / count;
  return {
    avgR,
    avgG,
    avgB,
    avgL: (avgR + avgG + avgB) / 3,
    coverage: (sw * sh) / (snapshot.width * snapshot.height),
  };
}

function createDogProfile(details) {
  const rarity = pickRarity(details.detection.score);
  const level = Math.floor(1 + details.detection.score * 20 + rarities.indexOf(rarity) * 4);
  const baseName = names[Math.floor(Math.random() * names.length)];
  const statsSeed = details.traits.join("|").length + Math.round(details.detection.score * 100);
  return {
    id: crypto.randomUUID(),
    name: baseName,
    rarity: rarity.label,
    color: rarity.color,
    level,
    speciesGuess: details.speciesGuess,
    traits: details.traits,
    detectionScore: details.detection.score,
    capturedAt: new Date().toISOString(),
    photo: details.photo,
    location: details.location,
    stats: {
      zoom: Math.min(99, 40 + (statsSeed % 50)),
      charm: Math.min(99, 45 + ((statsSeed * 3) % 45)),
      sniff: Math.min(99, 42 + ((statsSeed * 5) % 47)),
    },
  };
}

function renderCards() {
  cardGrid.innerHTML = "";
  collection.forEach((dog) => {
    const node = cardTemplate.content.firstElementChild.cloneNode(true);
    node.style.setProperty("--card-bg", dog.color);
    node.querySelector(".card-photo").src = dog.photo;
    node.querySelector(".rarity").textContent = dog.rarity;
    node.querySelector("h3").textContent = dog.name;
    node.querySelector(".breed-line").textContent = dog.speciesGuess;
    node.querySelector(".level").textContent = `LV ${dog.level}`;
    const profileBits = [
      `Traits: ${dog.traits.join(" • ")}`,
      dog.location?.label || "location unavailable",
      formatCapturedAt(dog.capturedAt),
    ];
    node.querySelector(".profile-line").innerHTML = `<strong>Seen at</strong> ${profileBits.join(" • ")}`;
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

function projectMarker(location, center) {
  if (!location?.coords || !center) {
    return {
      left: 50,
      top: 50,
    };
  }
  const latScale = 0.015;
  const lngScale = 0.02;
  const dx = ((location.coords.longitude - center.longitude) / lngScale) * 50;
  const dy = ((location.coords.latitude - center.latitude) / latScale) * -50;
  return {
    left: Math.min(92, Math.max(8, 50 + dx)),
    top: Math.min(92, Math.max(8, 50 + dy)),
  };
}

function renderMap() {
  mapBoard.querySelectorAll(".pin").forEach((pin) => pin.remove());
  const center = currentCoords;
  mapMode.textContent = center ? "geo tagged" : "relative grid";
  mapCenter.textContent = center ? "YOU" : "GRID";
  mapNote.textContent = center
    ? "Pins are placed from the coordinates saved when each dog was collected."
    : "Location permission is off or unavailable, so pins fall back to a relative grid.";
  collection.forEach((dog) => {
    const position = projectMarker(dog.location, center);
    const pin = document.createElement("div");
    pin.className = "pin";
    pin.style.left = `${position.left}%`;
    pin.style.top = `${position.top}%`;
    pin.style.setProperty("--pin", dog.color);
    pin.title = `${dog.name} - ${dog.location?.label || "saved spot"}`;
    pin.innerHTML = `<span>${dog.name.slice(0, 1)}</span>`;
    mapBoard.appendChild(pin);
  });
}

function renderStats() {
  const counts = Object.fromEntries(rarities.map((rarity) => [rarity.label, 0]));
  const breeds = {};
  collection.forEach((dog) => {
    counts[dog.rarity] += 1;
    breeds[dog.speciesGuess] = (breeds[dog.speciesGuess] || 0) + 1;
  });
  const topBreed = Object.entries(breeds).sort((a, b) => b[1] - a[1])[0];
  rarityMix.textContent = topBreed ? `${collection.length} total • ${topBreed[0]}` : "fresh run";
  statList.innerHTML = rarities.map((rarity) => {
    const value = counts[rarity.label];
    const pct = collection.length ? Math.max(8, Math.round((value / collection.length) * 100)) : 0;
    return `
      <div class="stat-row">
        <span>${rarity.label}</span>
        <span class="track"><span class="fill" style="--value:${pct}%; background:${rarity.color}"></span></span>
        <span>${value}</span>
      </div>
    `;
  }).join("");
}

function renderAll() {
  renderCards();
  renderMap();
  renderStats();
}

async function ensureModels() {
  if (detectorModel && breedModel) return;
  updateStatus("Loading dog detector...", "loading detector");
  detectorModel = await cocoSsd.load({ base: "lite_mobilenet_v2" });
  breedModel = await mobilenet.load();
  updateStatus("Detector ready. Snap a real dog to collect it.", "detector ready");
}

async function readLocation() {
  if (!navigator.geolocation) {
    return { label: "location unavailable", coords: null };
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);
        resolve({
          label: `${lat}, ${lng}`,
          coords: { latitude: position.coords.latitude, longitude: position.coords.longitude },
        });
      },
      () => resolve({ label: "location unavailable", coords: null }),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 },
    );
  });
}

async function openCamera() {
  try {
    await ensureModels();
    if (!navigator.mediaDevices?.getUserMedia) {
      updateStatus("Phone camera opening for a fresh catch.", "camera picker");
      photoInput.click();
      return;
    }
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
    camera.srcObject = stream;
    await camera.play();
    viewport.classList.add("has-camera");
    updateStatus("Camera ready. Keep the dog in frame and tap capture.", "live camera");
  } catch {
    updateStatus("Live camera unavailable. Opening phone camera instead.", "camera picker");
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

async function detectDogFromSnapshot() {
  await ensureModels();
  const detections = await detectorModel.detect(snapshot, 4, 0.45);
  const dogDetections = detections
    .filter((item) => item.class === "dog" && item.score >= 0.55)
    .sort((a, b) => b.score - a.score);
  if (dogDetections.length === 0) return null;
  const best = dogDetections[0];
  const breedPredictions = await breedModel.classify(snapshot, 5);
  const likelyDogLabel = breedPredictions.find((item) => /dog|terrier|retriever|shepherd|husky|poodle|beagle|bulldog|spaniel|corgi|dachshund|akita|shiba|collie|mastiff|chihuahua|boxer|pug/i.test(item.className));
  const ctx = snapshot.getContext("2d");
  const sample = extractColorProfile(ctx, best.bbox);
  const traits = traitsFromPixels(sample);
  return {
    detection: best,
    speciesGuess: likelyDogLabel ? likelyDogLabel.className : "mixed-breed dog",
    traits,
    photo: snapshot.toDataURL("image/jpeg", 0.92),
  };
}

function openNamingSheet(profile) {
  pendingCatch = profile;
  sheetPhoto.src = profile.photo;
  sheetBreed.textContent = `Breed: ${profile.speciesGuess}`;
  sheetTraits.textContent = `Traits: ${profile.traits.join(" • ")}`;
  sheetLocation.textContent = `Spot: ${profile.location?.label || "location unavailable"}`;
  nameInput.value = profile.name;
  namingSheet.classList.remove("hidden");
  setTimeout(() => nameInput.focus(), 30);
}

function closeNamingSheet() {
  pendingCatch = null;
  namingSheet.classList.add("hidden");
}

async function runCatch(isDemo = false) {
  snapBtn.disabled = true;
  if (!isDemo) {
    captureFrame();
  }
  updateStatus(isDemo ? "Running a quick demo catch." : "Scanning this photo for a real dog...", "scanning");
  let details;
  if (isDemo) {
    details = {
      detection: { score: 0.81 },
      speciesGuess: "mixed-breed dog",
      traits: ["warm coat", "mid-tone fur", "medium build"],
      photo: snapshot.toDataURL("image/jpeg", 0.92) || "",
    };
  } else {
    details = await detectDogFromSnapshot();
    if (!details) {
      updateStatus("No dog detected in that shot. Try a clearer dog photo.", "no dog found");
      snapBtn.disabled = false;
      return;
    }
  }
  const location = await readLocation();
  const profile = createDogProfile({
    ...details,
    location,
  });
  resultName.textContent = profile.name;
  resultBurst.classList.remove("show");
  void resultBurst.offsetWidth;
  resultBurst.classList.add("show");
  updateStatus(`Dog found. Name your new Puppymon to save it.`, `dog ${Math.round(profile.detectionScore * 100)}%`);
  openNamingSheet(profile);
  snapBtn.disabled = false;
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
snapBtn.addEventListener("click", async () => {
  await ensureModels();
  if (stream && camera.videoWidth) {
    runCatch(false);
    return;
  }
  updateStatus("Opening the phone camera for a fresh catch.", "camera picker");
  photoInput.click();
});
demoBtn.addEventListener("click", async () => {
  await ensureModels();
  if (!snapshot.width || !snapshot.height) {
    const ctx = snapshot.getContext("2d");
    snapshot.width = 960;
    snapshot.height = 720;
    ctx.fillStyle = "#f7d8c8";
    ctx.fillRect(0, 0, snapshot.width, snapshot.height);
    ctx.fillStyle = "#151515";
    ctx.font = "bold 42px sans-serif";
    ctx.fillText("Demo Pup", 60, 110);
  }
  viewport.classList.add("has-snapshot");
  runCatch(true);
});
photoInput.addEventListener("change", async () => {
  const file = photoInput.files?.[0];
  if (!file) return;
  try {
    updateStatus("Photo received. Checking for a dog...", "photo loaded");
    await loadPhoto(file);
    await runCatch(false);
  } catch {
    updateStatus("Could not read that photo. Try another snap.", "photo error");
  } finally {
    photoInput.value = "";
  }
});

saveCatchBtn.addEventListener("click", () => {
  if (!pendingCatch) return;
  pendingCatch.name = nameInput.value.trim() || pendingCatch.name;
  collection.push(pendingCatch);
  save();
  closeNamingSheet();
  updateStatus(`${collection[collection.length - 1].name} joined your Puppydex.`, "saved");
  renderAll();
});

cancelCatchBtn.addEventListener("click", () => {
  closeNamingSheet();
  updateStatus("Catch canceled. Nothing was added.", "canceled");
});

resetBtn.addEventListener("click", () => {
  collection = [];
  save();
  updateStatus("Puppydex cleared. Fresh walk, fresh finds.", "reset");
  renderAll();
});

window.addEventListener("load", async () => {
  try {
    await ensureModels();
  } catch {
    updateStatus("Model load failed. Camera can still open, but detection is unavailable.", "model error");
  }
  renderAll();
});
