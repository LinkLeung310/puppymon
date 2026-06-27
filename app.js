const camera = document.querySelector("#camera");
const photoInput = document.querySelector("#photoInput");
const snapshot = document.querySelector("#snapshot");
const viewport = document.querySelector("#viewport");
const cameraBtn = document.querySelector("#cameraBtn");
const snapBtn = document.querySelector("#snapBtn");
const galleryBtn = document.querySelector("#galleryBtn");
const langToggle = document.querySelector("#langToggle");
const statusText = document.querySelector("#statusText");
const detectionChip = document.querySelector("#detectionChip");
const caughtCount = document.querySelector("#caughtCount");
const cardGrid = document.querySelector("#cardGrid");
const cardTemplate = document.querySelector("#cardTemplate");
const resultBurst = document.querySelector("#resultBurst");
const resultLabel = document.querySelector("#resultLabel");
const resultName = document.querySelector("#resultName");
const mapBoard = document.querySelector("#mapBoard");
const statList = document.querySelector("#statList");
const rarityMix = document.querySelector("#rarityMix");
const mapMode = document.querySelector("#mapMode");
const mapNote = document.querySelector("#mapNote");
const resetBtn = document.querySelector("#resetBtn");
const streakBadge = document.querySelector("#streakBadge");
const namingSheet = document.querySelector("#namingSheet");
const sheetPhoto = document.querySelector("#sheetPhoto");
const sheetBreed = document.querySelector("#sheetBreed");
const sheetTraits = document.querySelector("#sheetTraits");
const sheetLocation = document.querySelector("#sheetLocation");
const nameInput = document.querySelector("#nameInput");
const saveCatchBtn = document.querySelector("#saveCatchBtn");
const cancelCatchBtn = document.querySelector("#cancelCatchBtn");
const profileSheet = document.querySelector("#profileSheet");
const profileName = document.querySelector("#profileName");
const profilePhoto = document.querySelector("#profilePhoto");
const profileBreed = document.querySelector("#profileBreed");
const profileRarity = document.querySelector("#profileRarity");
const profileLocation = document.querySelector("#profileLocation");
const profileTime = document.querySelector("#profileTime");
const profileTraits = document.querySelector("#profileTraits");
const profileBadges = document.querySelector("#profileBadges");
const profileMetaList = document.querySelector("#profileMetaList");
const profileStats = document.querySelector("#profileStats");
const closeProfileBtn = document.querySelector("#closeProfileBtn");
const intelSpecies = document.querySelector("#intelSpecies");
const intelHint = document.querySelector("#intelHint");
const intelTraits = document.querySelector("#intelTraits");
const intelLocation = document.querySelector("#intelLocation");
const intelConfidence = document.querySelector("#intelConfidence");
const scanOverlay = document.querySelector("#scanOverlay");
const scanTitle = document.querySelector("#scanTitle");
const scanMessage = document.querySelector("#scanMessage");

const names = ["Biscuit", "Rocket", "Miso", "Pixel", "Noodle", "Scout", "Maple", "Ziggy", "Pepper", "Tango"];
const rarities = [
  { label: "Common", color: "#58c4a5", weight: 48 },
  { label: "Rare", color: "#69a7ff", weight: 28 },
  { label: "Epic", color: "#f7d84a", weight: 17 },
  { label: "Legend", color: "#ef6554", weight: 7 },
];
const stats = ["zoom", "charm", "sniff"];

const copy = {
  en: {
    brand_kicker: "Puppymon",
    brand_title: "Puppydex",
    subcopy: "Catch real dogs, keep the photo, save the spot, build a living local dex.",
    caught_label: "caught",
    chip_loading: "Model loading...",
    result_detected: "Dog detected",
    mobile_callout: "Best on phone: tap capture, let us detect the dog, then give your new Puppymon a name.",
    status_loading: "Loading dog detector...",
    catch_intel: "Catch Intel",
    latest_scan: "Latest scan",
    field_notes: "Field notes",
    active_zone: "Active zone",
    tab_profiles: "Profiles",
    tab_map: "Map",
    tab_dex: "Dex",
    collected_dogs: "Collected Dogs",
    reset: "Reset",
    catch_map: "Catch Map",
    puppydex: "Puppydex",
    name_your_puppymon: "Name your Puppymon",
    name_label: "Name",
    cancel: "Cancel",
    save_catch: "Save catch",
    collected_profile: "Collected profile",
    back_to_dex: "Back to dex",
    scan_title: "Scanning for a real dog",
    scan_message: "Running live dog detection and breed guess...",
    scan_message_location: "Checking the dog, traits, and current location...",
    camera_picker: "camera picker",
    loading_detector_badge: "loading detector",
    detector_ready_badge: "detector ready",
    live_camera_badge: "live camera",
    scanning_badge: "scanning",
    no_dog_badge: "no dog found",
    photo_roll_badge: "photo roll",
    photo_loaded_badge: "photo loaded",
    photo_error_badge: "photo error",
    saved_badge: "saved",
    canceled_badge: "canceled",
    reset_badge: "reset",
    model_error_badge: "model error",
    camera_ready: "Camera ready. Keep the dog in frame and tap capture.",
    camera_opening: "Opening the phone camera for a fresh catch.",
    live_camera_unavailable: "Live camera unavailable. Opening phone camera instead.",
    phone_camera_opening: "Phone camera opening for a fresh catch.",
    opening_photo_roll: "Opening photo roll. A real dog still needs to be detected to save.",
    photo_received: "Photo received. Checking for a dog...",
    photo_error: "Could not read that photo. Try another snap.",
    detector_ready: "Detector ready. Snap a real dog to collect it.",
    model_error: "Model load failed. Camera can still open, but detection is unavailable.",
    scanning_status: "Scanning this photo for a real dog...",
    no_dog: "No dog detected in that shot. Try a clearer dog photo.",
    dog_found: "Dog found. Name your new Puppymon to save it.",
    catch_canceled: "Catch canceled. Nothing was added.",
    dex_reset: "Puppydex cleared. Fresh walk, fresh finds.",
    joined_dex: "{name} joined your Puppydex.",
    waiting_for_dog: "Waiting for a dog",
    no_traits: "No traits yet",
    location_pending: "Location pending",
    detector_confidence_here: "Detector confidence will appear here.",
    open_camera: "Open camera",
    use_photo: "Use photo",
    snap_dog: "Snap dog",
    world_map: "world map",
    world_map_ready: "World map",
    pins_after_capture: "Location markers appear after capture.",
    live_map_note: "Pins are placed on the real map using the coordinates saved for each dog.",
    no_location_map_note: "Location permission is off or unavailable, so the world map centers on a default view.",
    you_marker: "You are here",
    breed_label: "Breed",
    traits_label: "Traits",
    spot_label: "Spot",
    rarity_label: "Rarity",
    seen_label: "Seen",
    encounter_type: "Encounter type",
    stored_frame: "Stored frame",
    nearest_spot: "Nearest spot",
    full_shot_crop: "full shot + dog crop",
    full_shot_only: "full shot only",
    location_unavailable: "location unavailable",
    unknown_time: "unknown time",
    streak_suffix: "streak",
    total_label: "total",
    fresh_run: "fresh run",
    latest_saved_hint: "{count} dogs logged. Open the camera to add the next local find.",
    unlock_hint: "Point the camera at a real dog to unlock a new Puppymon profile.",
    latest_saved_confidence: "{score}% dog match from the latest saved catch.",
    latest_scan_hint: "Latest scan reads as a {encounter}. Name it to save the entry.",
    dog_match: "{score}% dog match",
    seen_at: "Seen at",
    level_label: "LV {level}",
    mixed_breed_dog: "mixed-breed dog",
    warm_coat: "warm coat",
    cool_toned_coat: "cool-toned coat",
    balanced_coat: "balanced coat",
    light_fur: "light fur",
    dark_fur: "dark fur",
    mid_tone_fur: "mid-tone fur",
    big_frame: "big frame",
    small_frame: "small frame",
    medium_build: "medium build",
    alpha_encounter: "alpha encounter",
    strong_encounter: "strong encounter",
    steady_encounter: "steady encounter",
    wild_encounter: "wild encounter",
  },
  zh: {
    brand_kicker: "Puppymon",
    brand_title: "狗狗图鉴",
    subcopy: "拍到真实狗狗，保存照片和地点，慢慢收集你身边的活体图鉴。",
    caught_label: "已收集",
    chip_loading: "模型加载中...",
    result_detected: "检测到狗狗",
    mobile_callout: "最适合手机使用：点击拍摄，让我们先识别狗狗，再给新的 Puppymon 命名。",
    status_loading: "正在加载狗狗检测器...",
    catch_intel: "捕捉情报",
    latest_scan: "最近扫描",
    field_notes: "现场特征",
    active_zone: "当前区域",
    tab_profiles: "档案",
    tab_map: "地图",
    tab_dex: "图鉴",
    collected_dogs: "已收集狗狗",
    reset: "重置",
    catch_map: "捕捉地图",
    puppydex: "狗狗图鉴",
    name_your_puppymon: "给你的 Puppymon 命名",
    name_label: "名字",
    cancel: "取消",
    save_catch: "保存收集",
    collected_profile: "已收集档案",
    back_to_dex: "返回图鉴",
    scan_title: "正在扫描真实狗狗",
    scan_message: "正在运行实时狗狗检测和种类猜测...",
    scan_message_location: "正在检查狗狗、特征和当前位置...",
    camera_picker: "打开相机",
    loading_detector_badge: "模型加载中",
    detector_ready_badge: "识别器就绪",
    live_camera_badge: "实时相机",
    scanning_badge: "扫描中",
    no_dog_badge: "未检测到狗",
    photo_roll_badge: "相册",
    photo_loaded_badge: "照片已载入",
    photo_error_badge: "照片错误",
    saved_badge: "已保存",
    canceled_badge: "已取消",
    reset_badge: "已重置",
    model_error_badge: "模型错误",
    camera_ready: "相机已就绪，把狗狗放进取景框后点击拍摄。",
    camera_opening: "正在打开手机相机进行新的捕捉。",
    live_camera_unavailable: "无法使用实时相机，改为打开手机相机。",
    phone_camera_opening: "正在打开手机相机进行新的捕捉。",
    opening_photo_roll: "正在打开相册，仍然必须检测到真实狗狗才能保存。",
    photo_received: "照片已接收，正在检查是否有狗狗...",
    photo_error: "无法读取这张照片，请换一张再试。",
    detector_ready: "识别器已就绪。拍摄真实狗狗即可收集。",
    model_error: "模型加载失败。相机仍可打开，但检测功能暂时不可用。",
    scanning_status: "正在扫描这张照片里的真实狗狗...",
    no_dog: "这张照片里没有检测到狗狗，请换一张更清晰的。",
    dog_found: "找到狗狗了。给新的 Puppymon 命名后再保存。",
    catch_canceled: "本次捕捉已取消，没有加入图鉴。",
    dex_reset: "图鉴已清空，重新开始散步收集吧。",
    joined_dex: "{name} 已加入你的图鉴。",
    waiting_for_dog: "等待狗狗出现",
    no_traits: "还没有特征",
    location_pending: "位置待获取",
    detector_confidence_here: "这里会显示识别置信度。",
    open_camera: "打开相机",
    use_photo: "使用照片",
    snap_dog: "拍摄狗狗",
    world_map: "世界地图",
    world_map_ready: "真实地图",
    pins_after_capture: "成功收集后会在地图上出现位置标记。",
    live_map_note: "每只狗狗都会按保存时的经纬度落在真实地图上。",
    no_location_map_note: "如果没有定位权限，地图会显示默认视角，之后拿到定位再自动更新。",
    you_marker: "你在这里",
    breed_label: "种类",
    traits_label: "特征",
    spot_label: "地点",
    rarity_label: "稀有度",
    seen_label: "时间",
    encounter_type: "遭遇类型",
    stored_frame: "保存画面",
    nearest_spot: "收集位置",
    full_shot_crop: "原图 + 狗狗裁切",
    full_shot_only: "只有原图",
    location_unavailable: "位置不可用",
    unknown_time: "时间未知",
    streak_suffix: "连击",
    total_label: "总计",
    fresh_run: "刚开始收集",
    latest_saved_hint: "已记录 {count} 只狗狗，打开相机继续收集下一只。",
    unlock_hint: "把镜头对准真实狗狗，就能解锁新的 Puppymon 档案。",
    latest_saved_confidence: "最近一次保存的狗狗匹配度为 {score}%。",
    latest_scan_hint: "最近一次扫描判定为 {encounter}，命名后即可保存档案。",
    dog_match: "狗狗匹配度 {score}%",
    seen_at: "发现于",
    level_label: "等级 {level}",
    mixed_breed_dog: "混种狗狗",
    warm_coat: "暖色毛发",
    cool_toned_coat: "冷色毛发",
    balanced_coat: "中性毛色",
    light_fur: "浅色毛发",
    dark_fur: "深色毛发",
    mid_tone_fur: "中等毛色",
    big_frame: "体型偏大",
    small_frame: "体型偏小",
    medium_build: "中等体型",
    alpha_encounter: "首领遭遇",
    strong_encounter: "强势遭遇",
    steady_encounter: "稳定遭遇",
    wild_encounter: "野外遭遇",
  },
};

let stream = null;
let detectorModel = null;
let breedModel = null;
let map = null;
let tileLayer = null;
let playerMarker = null;
let dogMarkers = [];
let currentCoords = null;
let pendingCatch = null;
let lastDetection = null;
let currentLang = localStorage.getItem("puppymon.lang") || "en";
let collection = JSON.parse(localStorage.getItem("puppymon.collection") || "[]");

function save() {
  localStorage.setItem("puppymon.collection", JSON.stringify(collection));
}

function t(key, vars = {}) {
  const table = copy[currentLang] || copy.en;
  const fallback = copy.en[key] || key;
  const template = table[key] || fallback;
  return Object.entries(vars).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    template,
  );
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}

function joinBits(values) {
  return values.join(" - ");
}

function localizeTraitLabel(label) {
  const key = label.replaceAll(" ", "_").replaceAll("-", "_");
  return t(key);
}

function updateStaticText() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  langToggle.dataset.lang = currentLang;
  cameraBtn.title = t("open_camera");
  cameraBtn.setAttribute("aria-label", t("open_camera"));
  snapBtn.setAttribute("aria-label", t("snap_dog"));
  galleryBtn.title = t("use_photo");
  galleryBtn.setAttribute("aria-label", t("use_photo"));
  nameInput.placeholder = currentLang === "zh" ? "给它起个名字" : "Mochi";
}

function formatCapturedAt(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return t("unknown_time");
  return date.toLocaleString(currentLang === "zh" ? "zh-CN" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function setScanState(active, messageKey = "scan_message") {
  scanOverlay.classList.toggle("hidden", !active);
  scanTitle.textContent = t("scan_title");
  scanMessage.textContent = t(messageKey);
}

function updateStatus(text, badge = null) {
  statusText.textContent = text;
  if (badge) detectionChip.textContent = badge;
}

function classifyEncounter(score) {
  if (score >= 0.9) return t("alpha_encounter");
  if (score >= 0.8) return t("strong_encounter");
  if (score >= 0.68) return t("steady_encounter");
  return t("wild_encounter");
}

function buildCatchBadges(dog) {
  return [
    dog.rarity,
    t("level_label", { level: dog.level }),
    `${Math.round(dog.detectionScore * 100)}%`,
    dog.encounterType || classifyEncounter(dog.detectionScore),
  ];
}

function getCatchStreak() {
  if (collection.length === 0) return 0;
  let streak = 1;
  for (let i = collection.length - 1; i > 0; i -= 1) {
    const current = new Date(collection[i].capturedAt).getTime();
    const previous = new Date(collection[i - 1].capturedAt).getTime();
    if (Number.isNaN(current) || Number.isNaN(previous) || current - previous > 1000 * 60 * 60 * 8) break;
    streak += 1;
  }
  return streak;
}

function clearDetectionBox() {
  viewport.querySelectorAll(".detection-box").forEach((node) => node.remove());
}

function drawDetectionBox(detection) {
  clearDetectionBox();
  if (!detection || !snapshot.width || !snapshot.height) return;
  const [x, y, width, height] = detection.bbox;
  const box = document.createElement("div");
  box.className = "detection-box";
  box.style.left = `${(x / snapshot.width) * 100}%`;
  box.style.top = `${(y / snapshot.height) * 100}%`;
  box.style.width = `${(width / snapshot.width) * 100}%`;
  box.style.height = `${(height / snapshot.height) * 100}%`;
  box.innerHTML = `<span>${t("result_detected")} ${Math.round(detection.score * 100)}%</span>`;
  viewport.appendChild(box);
}

function pickRarity(score) {
  const boosted = Math.min(100, Math.round(score * 100) + Math.floor(Math.random() * 8));
  const roll = Math.max(1, boosted - Math.floor(Math.random() * 30));
  let cursor = 0;
  return rarities.find((rarity) => {
    cursor += rarity.weight;
    return roll <= cursor;
  }) || rarities[0];
}

function traitsFromPixels(sample) {
  const tone =
    sample.avgR > sample.avgB + 18
      ? t("warm_coat")
      : sample.avgB > sample.avgR + 18
        ? t("cool_toned_coat")
        : t("balanced_coat");
  const brightness = sample.avgL > 165 ? t("light_fur") : sample.avgL < 105 ? t("dark_fur") : t("mid_tone_fur");
  const size = sample.coverage > 0.35 ? t("big_frame") : sample.coverage < 0.18 ? t("small_frame") : t("medium_build");
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

function cropDogImage(box) {
  const sx = Math.max(0, Math.floor(box[0]));
  const sy = Math.max(0, Math.floor(box[1]));
  const sw = Math.max(1, Math.floor(box[2]));
  const sh = Math.max(1, Math.floor(box[3]));
  const cropCanvas = document.createElement("canvas");
  cropCanvas.width = sw;
  cropCanvas.height = sh;
  const cropCtx = cropCanvas.getContext("2d");
  cropCtx.drawImage(snapshot, sx, sy, sw, sh, 0, 0, sw, sh);
  return cropCanvas;
}

function createDogProfile(details) {
  const rarity = pickRarity(details.detection.score);
  const level = Math.floor(1 + details.detection.score * 20 + rarities.indexOf(rarity) * 4);
  const baseName = names[Math.floor(Math.random() * names.length)];
  const statsSeed = details.traits.join("|").length + Math.round(details.detection.score * 100);
  const encounterType = classifyEncounter(details.detection.score);
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
    cropPhoto: details.cropPhoto,
    location: details.location,
    encounterType,
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
    node.querySelector(".card-photo").src = dog.cropPhoto || dog.photo;
    node.querySelector(".rarity").textContent = dog.rarity;
    node.querySelector("h3").textContent = dog.name;
    node.querySelector(".breed-line").textContent = dog.speciesGuess;
    node.querySelector(".level").textContent = t("level_label", { level: dog.level });
    const profileBits = [
      `${t("traits_label")}: ${joinBits(dog.traits)}`,
      dog.location?.label || t("location_unavailable"),
      formatCapturedAt(dog.capturedAt),
      t("dog_match", { score: Math.round(dog.detectionScore * 100) }),
    ];
    node.querySelector(".profile-line").innerHTML = `<strong>${t("seen_at")}</strong> ${escapeHtml(joinBits(profileBits))}`;
    node.querySelector(".bars").innerHTML = stats.map((key) => `
      <div class="bar">
        <span>${key}</span>
        <span class="track"><span class="fill" style="--value:${dog.stats[key]}%"></span></span>
        <span>${dog.stats[key]}</span>
      </div>
    `).join("");
    node.addEventListener("click", () => openProfileSheet(dog));
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProfileSheet(dog);
      }
    });
    cardGrid.prepend(node);
  });
  caughtCount.textContent = collection.length;
}

function ensureMap() {
  if (map || typeof L === "undefined") return;
  map = L.map(mapBoard, { zoomControl: false, attributionControl: true }).setView([34.0522, -118.2437], 12);
  tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  });
  tileLayer.addTo(map);
  setTimeout(() => map.invalidateSize(), 60);
}

function makeDivIcon(className, color) {
  return L.divIcon({
    className: "",
    html: `<div class="${className}" style="--pin:${color || "#ef6554"}"></div>`,
    iconSize: className === "player-pin" ? [22, 22] : [18, 18],
    iconAnchor: className === "player-pin" ? [11, 11] : [9, 9],
  });
}

function clearMapMarkers() {
  dogMarkers.forEach((marker) => marker.remove());
  dogMarkers = [];
  if (playerMarker) {
    playerMarker.remove();
    playerMarker = null;
  }
}

function renderMap() {
  ensureMap();
  clearMapMarkers();
  if (!map) return;

  const coords = currentCoords;
  mapMode.textContent = t("world_map_ready");
  mapNote.textContent = coords ? t("live_map_note") : t("no_location_map_note");

  if (coords) {
    map.setView([coords.latitude, coords.longitude], 15);
    playerMarker = L.marker([coords.latitude, coords.longitude], {
      icon: makeDivIcon("player-pin", "#f7d84a"),
      title: t("you_marker"),
    }).addTo(map);
  } else if (collection[0]?.location?.coords) {
    map.setView([collection[0].location.coords.latitude, collection[0].location.coords.longitude], 12);
  }

  collection.forEach((dog) => {
    if (!dog.location?.coords) return;
    const marker = L.marker([dog.location.coords.latitude, dog.location.coords.longitude], {
      icon: makeDivIcon("dog-pin", dog.color),
      title: dog.name,
    }).addTo(map);
    marker.on("click", () => openProfileSheet(dog));
    marker.bindPopup(`<strong>${escapeHtml(dog.name)}</strong><br>${escapeHtml(dog.speciesGuess)}`);
    dogMarkers.push(marker);
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
  rarityMix.textContent = topBreed ? `${collection.length} ${t("total_label")} - ${topBreed[0]}` : t("fresh_run");
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

function renderIntel() {
  streakBadge.textContent = `${getCatchStreak()} ${t("streak_suffix")}`;
  if (!lastDetection) {
    const latestSaved = collection[collection.length - 1];
    intelSpecies.textContent = latestSaved?.speciesGuess || t("waiting_for_dog");
    intelHint.textContent = latestSaved
      ? t("latest_saved_hint", { count: collection.length })
      : t("unlock_hint");
    intelTraits.innerHTML = latestSaved
      ? latestSaved.traits.map((trait) => `<span>${escapeHtml(trait)}</span>`).join("")
      : `<span>${escapeHtml(t("no_traits"))}</span>`;
    intelLocation.textContent = currentCoords
      ? `${currentCoords.latitude.toFixed(4)}, ${currentCoords.longitude.toFixed(4)}`
      : latestSaved?.location?.label || t("location_pending");
    intelConfidence.textContent = latestSaved
      ? t("latest_saved_confidence", { score: Math.round(latestSaved.detectionScore * 100) })
      : t("detector_confidence_here");
    return;
  }

  intelSpecies.textContent = lastDetection.speciesGuess;
  intelHint.textContent = t("latest_scan_hint", { encounter: classifyEncounter(lastDetection.detection.score) });
  intelTraits.innerHTML = lastDetection.traits.map((trait) => `<span>${escapeHtml(trait)}</span>`).join("");
  intelLocation.textContent = lastDetection.location?.label || t("location_unavailable");
  intelConfidence.textContent = t("dog_match", { score: Math.round(lastDetection.detection.score * 100) });
}

function renderAll() {
  updateStaticText();
  renderCards();
  renderMap();
  renderStats();
  renderIntel();
}

function openProfileSheet(dog) {
  profileName.textContent = dog.name;
  profilePhoto.src = dog.photo;
  profileBreed.textContent = `${t("breed_label")}: ${dog.speciesGuess}`;
  profileRarity.textContent = `${t("rarity_label")}: ${dog.rarity}`;
  profileLocation.textContent = `${t("spot_label")}: ${dog.location?.label || t("location_unavailable")}`;
  profileTime.textContent = `${t("seen_label")}: ${formatCapturedAt(dog.capturedAt)}`;
  profileTraits.textContent = `${t("traits_label")}: ${joinBits(dog.traits)} - ${t("dog_match", { score: Math.round(dog.detectionScore * 100) })}`;
  profileBadges.innerHTML = buildCatchBadges(dog).map((badge) => `<span>${escapeHtml(badge)}</span>`).join("");
  profileMetaList.innerHTML = [
    { label: t("encounter_type"), value: dog.encounterType || classifyEncounter(dog.detectionScore) },
    { label: t("stored_frame"), value: dog.cropPhoto ? t("full_shot_crop") : t("full_shot_only") },
    { label: t("nearest_spot"), value: dog.location?.label || t("location_unavailable") },
  ].map((item) => `
    <div class="profile-meta-item">
      <span class="profile-meta-label">${escapeHtml(item.label)}</span>
      <strong class="profile-meta-value">${escapeHtml(item.value)}</strong>
    </div>
  `).join("");
  profileStats.innerHTML = stats.map((key) => `
    <div class="bar">
      <span>${key}</span>
      <span class="track"><span class="fill" style="--value:${dog.stats[key]}%; background:${dog.color}"></span></span>
      <span>${dog.stats[key]}</span>
    </div>
  `).join("");
  profileSheet.classList.remove("hidden");
}

function closeProfileSheet() {
  profileSheet.classList.add("hidden");
}

async function ensureModels() {
  if (detectorModel && breedModel) return;
  updateStatus(t("status_loading"), t("loading_detector_badge"));
  detectorModel = await cocoSsd.load({ base: "lite_mobilenet_v2" });
  breedModel = await mobilenet.load();
  updateStatus(t("detector_ready"), t("detector_ready_badge"));
}

async function readLocation() {
  if (!navigator.geolocation) {
    return { label: t("location_unavailable"), coords: null };
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
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      () => resolve({ label: t("location_unavailable"), coords: null }),
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 60000 },
    );
  });
}

async function openCamera() {
  try {
    await ensureModels();
    if (!navigator.mediaDevices?.getUserMedia) {
      updateStatus(t("phone_camera_opening"), t("camera_picker"));
      photoInput.click();
      return;
    }
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });
    camera.srcObject = stream;
    await camera.play();
    viewport.classList.add("has-camera");
    updateStatus(t("camera_ready"), t("live_camera_badge"));
  } catch {
    updateStatus(t("live_camera_unavailable"), t("camera_picker"));
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
  const cropCanvas = cropDogImage(best.bbox);
  const breedPredictions = await breedModel.classify(cropCanvas, 5);
  const likelyDogLabel = breedPredictions.find((item) =>
    /dog|terrier|retriever|shepherd|husky|poodle|beagle|bulldog|spaniel|corgi|dachshund|akita|shiba|collie|mastiff|chihuahua|boxer|pug/i.test(
      item.className,
    ),
  );
  const ctx = snapshot.getContext("2d");
  const sample = extractColorProfile(ctx, best.bbox);
  const traits = traitsFromPixels(sample);
  drawDetectionBox(best);

  return {
    detection: best,
    speciesGuess: likelyDogLabel ? likelyDogLabel.className : t("mixed_breed_dog"),
    traits,
    photo: snapshot.toDataURL("image/jpeg", 0.92),
    cropPhoto: cropCanvas.toDataURL("image/jpeg", 0.92),
  };
}

function openNamingSheet(profile) {
  pendingCatch = profile;
  sheetPhoto.src = profile.photo;
  sheetBreed.textContent = `${t("breed_label")}: ${profile.speciesGuess}`;
  sheetTraits.textContent = `${t("traits_label")}: ${joinBits(profile.traits)}`;
  sheetLocation.textContent = `${t("spot_label")}: ${profile.location?.label || t("location_unavailable")}`;
  nameInput.value = profile.name;
  namingSheet.classList.remove("hidden");
  setTimeout(() => nameInput.focus(), 30);
}

function closeNamingSheet() {
  pendingCatch = null;
  namingSheet.classList.add("hidden");
}

async function runCatch() {
  snapBtn.disabled = true;
  captureFrame();
  setScanState(true, "scan_message");
  updateStatus(t("scanning_status"), t("scanning_badge"));
  try {
    const details = await detectDogFromSnapshot();
    if (!details) {
      clearDetectionBox();
      lastDetection = null;
      renderIntel();
      updateStatus(t("no_dog"), t("no_dog_badge"));
      return;
    }

    setScanState(true, "scan_message_location");
    const location = await readLocation();
    const profile = createDogProfile({
      ...details,
      location,
    });
    lastDetection = {
      ...details,
      location,
    };
    resultLabel.textContent = t("result_detected");
    resultName.textContent = profile.name;
    resultBurst.classList.remove("show");
    void resultBurst.offsetWidth;
    resultBurst.classList.add("show");
    updateStatus(t("dog_found"), `${Math.round(profile.detectionScore * 100)}%`);
    renderIntel();
    renderMap();
    openNamingSheet(profile);
  } finally {
    setScanState(false);
    snapBtn.disabled = false;
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("puppymon.lang", currentLang);
  renderAll();
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.view}View`).classList.add("active");
    if (tab.dataset.view === "map" && map) {
      setTimeout(() => map.invalidateSize(), 40);
    }
  });
});

langToggle.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "zh" : "en");
});

cameraBtn.addEventListener("click", openCamera);
snapBtn.addEventListener("click", async () => {
  await ensureModels();
  if (stream && camera.videoWidth) {
    await runCatch();
    return;
  }
  updateStatus(t("camera_opening"), t("camera_picker"));
  photoInput.click();
});

galleryBtn.addEventListener("click", () => {
  updateStatus(t("opening_photo_roll"), t("photo_roll_badge"));
  photoInput.click();
});

photoInput.addEventListener("change", async () => {
  const file = photoInput.files?.[0];
  if (!file) return;
  try {
    updateStatus(t("photo_received"), t("photo_loaded_badge"));
    await loadPhoto(file);
    await runCatch();
  } catch {
    setScanState(false);
    updateStatus(t("photo_error"), t("photo_error_badge"));
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
  updateStatus(t("joined_dex", { name: collection[collection.length - 1].name }), t("saved_badge"));
  renderAll();
});

cancelCatchBtn.addEventListener("click", () => {
  closeNamingSheet();
  updateStatus(t("catch_canceled"), t("canceled_badge"));
});

closeProfileBtn.addEventListener("click", closeProfileSheet);

resetBtn.addEventListener("click", () => {
  collection = [];
  lastDetection = null;
  save();
  clearDetectionBox();
  updateStatus(t("dex_reset"), t("reset_badge"));
  renderAll();
});

window.addEventListener("load", async () => {
  updateStaticText();
  ensureMap();
  try {
    await ensureModels();
  } catch {
    updateStatus(t("model_error"), t("model_error_badge"));
  }
  await readLocation();
  renderAll();
});
