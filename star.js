const nSlider = document.getElementById("n-slider");
const sSlider = document.getElementById("s-slider");
const thetaSlider = document.getElementById("theta-slider");
const nVal = document.getElementById("n-val");
const sVal = document.getElementById("s-val");
const thetaVal = document.getElementById("theta-val");
const traceBtn = document.getElementById("trace-btn");

function draw() {
  const n = parseInt(nSlider.value);
  const s = parseFloat(sSlider.value);
  const theta = sliderToTheta(parseFloat(thetaSlider.value));
  nVal.textContent = n;
  sVal.textContent = s.toFixed(2);
  thetaVal.textContent = formatTheta(theta);

  const points = computeStarPath(n, theta, s, DX, 1);
  renderPlot(points, DX);
}

nSlider.addEventListener("input", draw);
sSlider.addEventListener("input", draw);
thetaSlider.addEventListener("input", draw);
traceBtn.addEventListener("click", startTrace);

draw();
