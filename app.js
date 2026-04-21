const plotDiv = document.getElementById("plot");
const nSlider = document.getElementById("n-slider");
const thetaSlider = document.getElementById("theta-slider");
const nVal = document.getElementById("n-val");
const thetaVal = document.getElementById("theta-val");

function draw() {
  const n = parseInt(nSlider.value);
  const theta = parseInt(thetaSlider.value);
  nVal.textContent = n;
  thetaVal.textContent = theta;

  const points = computeIntegralPath(n, theta);
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);

  const trace = {
    x: xs,
    y: ys,
    type: "scatter",
    mode: "lines",
  };

  const layout = {
    yaxis: { scaleanchor: "x" },
  };

  Plotly.react(plotDiv, [trace], layout);
}

nSlider.addEventListener("input", draw);
thetaSlider.addEventListener("input", draw);

draw();
