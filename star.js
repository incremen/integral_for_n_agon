const nSlider = document.getElementById("n-slider");
const sSlider = document.getElementById("s-slider");
const thetaSlider = document.getElementById("theta-slider");
const nVal = document.getElementById("n-val");
const sVal = document.getElementById("s-val");
const thetaVal = document.getElementById("theta-val");
const traceBtn = document.getElementById("trace-btn");

const DX = 0.01;

function draw() {
  const n = parseInt(nSlider.value);
  const s = parseFloat(sSlider.value);
  const tSlider = parseFloat(thetaSlider.value);
  const theta = 500 * Math.pow(tSlider, 3);
  nVal.textContent = n;
  sVal.textContent = s.toFixed(2);
  thetaVal.textContent = theta < 10 ? theta.toFixed(2) : theta.toFixed(1);

  const points = computeStarPath(n, theta, s, DX, 1);
  renderPlot(points, DX);
}

nSlider.addEventListener("input", draw);
sSlider.addEventListener("input", draw);
thetaSlider.addEventListener("input", draw);
traceBtn.addEventListener("click", startTrace);

draw();
