const nSlider = document.getElementById("n-slider");
const thetaSlider = document.getElementById("theta-slider");
const radiusToggle = document.getElementById("radius-toggle");
const nVal = document.getElementById("n-val");
const thetaVal = document.getElementById("theta-val");
const traceBtn = document.getElementById("trace-btn");

const DX = 0.01;

function draw() {
  const n = parseInt(nSlider.value);
  const s = parseFloat(thetaSlider.value);
  const theta = 500 * Math.pow(s, 3);
  const constantRadius = radiusToggle.checked;
  nVal.textContent = n;
  thetaVal.textContent = theta < 10 ? theta.toFixed(2) : theta.toFixed(1);

  const speedScale = constantRadius ? 2 * Math.sin(Math.PI / n) : 1;
  const points = computeIntegralPath(n, theta, DX, speedScale);
  renderPlot(points, DX);
}

nSlider.addEventListener("input", draw);
thetaSlider.addEventListener("input", draw);
radiusToggle.addEventListener("change", draw);
traceBtn.addEventListener("click", startTrace);

draw();
