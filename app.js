const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tooltip = document.getElementById("tooltip");
const nSlider = document.getElementById("n-slider");
const thetaSlider = document.getElementById("theta-slider");
const nVal = document.getElementById("n-val");
const thetaVal = document.getElementById("theta-val");

const DX = 0.01;

let currentPoints = [];
let currentTransform = null;
let hoverIndex = -1;

function resizeCanvas() {
  const container = canvas.parentElement;
  const size = Math.min(container.clientWidth, 600);
  const dpr = window.devicePixelRatio || 1;

  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function toCanvas(p) {
  const { displaySize, scale, box } = currentTransform;
  return {
    x: displaySize / 2 + (p.x - box.cx) * scale,
    y: displaySize / 2 - (p.y - box.cy) * scale,
  };
}

function draw() {
  const n = parseInt(nSlider.value);
  const theta = parseInt(thetaSlider.value);
  nVal.textContent = n;
  thetaVal.textContent = theta;

  const displaySize = parseInt(canvas.style.width);
  ctx.clearRect(0, 0, displaySize, displaySize);

  currentPoints = computeIntegralPath(n, theta, DX);
  const box = getBoundingBox(currentPoints);

  const padding = 40;
  const scaleX = (displaySize - 2 * padding) / box.width;
  const scaleY = (displaySize - 2 * padding) / box.height;
  const scale = Math.min(scaleX, scaleY);

  currentTransform = { displaySize, scale, box };

  ctx.beginPath();
  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  for (let j = 0; j < currentPoints.length; j++) {
    const c = toCanvas(currentPoints[j]);
    if (j === 0) ctx.moveTo(c.x, c.y);
    else ctx.lineTo(c.x, c.y);
  }
  ctx.stroke();

  if (hoverIndex >= 0 && hoverIndex < currentPoints.length) {
    const c = toCanvas(currentPoints[hoverIndex]);
    ctx.beginPath();
    ctx.fillStyle = "#2563eb";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.arc(c.x, c.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

function findNearestIndex(mx, my) {
  let bestDist = Infinity;
  let bestIdx = -1;
  for (let i = 0; i < currentPoints.length; i++) {
    const c = toCanvas(currentPoints[i]);
    const dx = c.x - mx;
    const dy = c.y - my;
    const d = dx * dx + dy * dy;
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  return { index: bestIdx, distPx: Math.sqrt(bestDist) };
}

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  const { index, distPx } = findNearestIndex(mx, my);
  if (index < 0 || distPx > 20) {
    if (hoverIndex !== -1) {
      hoverIndex = -1;
      tooltip.hidden = true;
      draw();
    }
    return;
  }

  hoverIndex = index;
  const p = currentPoints[index];
  const X = index * DX;
  tooltip.innerHTML = `X = ${X.toFixed(2)}<br>Re = ${p.x.toFixed(3)}<br>Im = ${p.y.toFixed(3)}`;
  const c = toCanvas(p);
  tooltip.style.left = c.x + "px";
  tooltip.style.top = c.y + "px";
  tooltip.hidden = false;
  draw();
});

canvas.addEventListener("mouseleave", () => {
  hoverIndex = -1;
  tooltip.hidden = true;
  draw();
});

nSlider.addEventListener("input", draw);
thetaSlider.addEventListener("input", draw);

window.addEventListener("resize", () => {
  resizeCanvas();
  draw();
});

resizeCanvas();
draw();
