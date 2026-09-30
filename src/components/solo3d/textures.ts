import * as THREE from "three";

function getContext(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas textures are not supported in this browser.");
  return context;
}

export function createDenimTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = getContext(canvas);
  ctx.fillStyle = "#3e5c8a";
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = "rgba(255,255,255,.14)";
  ctx.lineWidth = 2;
  for (let i = -128; i < 256; i += 10) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 128, 128); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(i + 6, 0); ctx.lineTo(i + 134, 128); ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function createTeeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128; canvas.height = 160;
  const ctx = getContext(canvas);
  ctx.fillStyle = "#c8cbd0"; ctx.fillRect(0, 0, 128, 160);
  const colors = ["#ff3366", "#6c5ce7", "#b6ff3b", "#ffd027"];
  colors.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(24 + index * 24, 74 + (index % 2) * 20, 14 + index * 2, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.strokeStyle = "rgba(26,26,36,.3)"; ctx.lineWidth = 3;
  for (let y = 12; y < 160; y += 24) { ctx.beginPath(); ctx.moveTo(8, y); ctx.lineTo(118, y + 10); ctx.stroke(); }
  return new THREE.CanvasTexture(canvas);
}

export function createSoloPatchTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256; canvas.height = 96;
  const ctx = getContext(canvas);
  ctx.fillStyle = "#1a1a24"; ctx.fillRect(0, 0, 256, 96);
  ctx.fillStyle = "#ffd027"; ctx.font = "900 54px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("SOLO", 128, 48);
  return new THREE.CanvasTexture(canvas);
}
