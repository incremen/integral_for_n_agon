const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const nSlider = document.getElementById("n-slider");
const thetaSlider = document.getElementById("theta-slider");
const nVal = document.getElementById("n-val");
const thetaVal = document.getElementById("theta-val");

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

function draw() {
  const n = parseInt(nSlider.value);
  const theta = parseInt(thetaSlider.value);
  nVal.textContent = n;
  thetaVal.textContent = theta;

  const displaySize = parseInt(canvas.style.width);
  ctx.clearRect(0, 0, displaySize, displaySize);

  const points = computeIntegralPath(n, theta);
  const box = getBoundingBox(points);

  const padding = 40;
  const scaleX = (displaySize - 2 * padding) / box.width;
  const scaleY = (displaySize - 2 * padding) / box.height;
  const scale = Math.min(scaleX, scaleY);

  ctx.beginPath();
  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  for (let j = 0; j < points.length; j++) {
    const px = displaySize / 2 + (points[j].x - box.cx) * scale;
    const py = displaySize / 2 - (points[j].y - box.cy) * scale;

    if (j === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();
}

nSlider.addEventListener("input", draw);
thetaSlider.addEventListener("input", draw);

window.addEventListener("resize", () => {
  resizeCanvas();
  draw();
});

resizeCanvas();
draw();
