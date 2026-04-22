const nSlider = document.getElementById("n-slider");
const sSlider = document.getElementById("s-slider");
const thetaSlider = document.getElementById("theta-slider");
const radiusToggle = document.getElementById("radius-toggle");
const nVal = document.getElementById("n-val");
const sVal = document.getElementById("s-val");
const thetaVal = document.getElementById("theta-val");
const traceBtn = document.getElementById("trace-btn");

function draw() {
  const n = parseInt(nSlider.value);
  const s = parseFloat(sSlider.value);
  const theta = sliderToTheta(parseFloat(thetaSlider.value));
  const constantSize = radiusToggle.checked;
  nVal.textContent = n;
  sVal.textContent = s.toFixed(2);
  thetaVal.textContent = formatTheta(theta);

  const speedScale = constantSize
    ? Math.sin(Math.PI / n) / Math.cos(((1 - s) * Math.PI) / (2 * n))
    : 1;
  const points = computeStarPath(n, theta, s, DX, speedScale);
  renderPlot(points, DX);
}

nSlider.addEventListener("input", draw);
sSlider.addEventListener("input", draw);
thetaSlider.addEventListener("input", draw);
radiusToggle.addEventListener("change", draw);
traceBtn.addEventListener("click", startTrace);

draw();
