const nSlider = document.getElementById("n-slider");
const thetaSlider = document.getElementById("theta-slider");
const radiusToggle = document.getElementById("radius-toggle");
const nVal = document.getElementById("n-val");
const thetaVal = document.getElementById("theta-val");
const traceBtn = document.getElementById("trace-btn");

function draw() {
  const n = parseInt(nSlider.value);
  const theta = sliderToTheta(parseFloat(thetaSlider.value));
  const constantRadius = radiusToggle.checked;
  nVal.textContent = n;
  thetaVal.textContent = formatTheta(theta);

  const speedScale = constantRadius ? 2 * Math.sin(Math.PI / n) : 1;
  const points = computeIntegralPath(n, theta, DX, speedScale);
  renderPlot(points, DX);
}

nSlider.addEventListener("input", draw);
thetaSlider.addEventListener("input", draw);
radiusToggle.addEventListener("change", draw);
traceBtn.addEventListener("click", startTrace);

draw();
