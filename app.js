const plotDiv = document.getElementById("plot");
const nSlider = document.getElementById("n-slider");
const thetaSlider = document.getElementById("theta-slider");
const radiusToggle = document.getElementById("radius-toggle");
const nVal = document.getElementById("n-val");
const thetaVal = document.getElementById("theta-val");

function draw() {
  const n = parseInt(nSlider.value);
  const theta = parseInt(thetaSlider.value);
  const constantRadius = radiusToggle.checked;
  nVal.textContent = n;
  thetaVal.textContent = theta;

  const speedScale = constantRadius ? 2 * Math.sin(Math.PI / n) : 1;
  const points = computeIntegralPath(n, theta, 0.01, speedScale);
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);

  const box = getBoundingBox(points);
  const halfSpan = Math.max(box.width, box.height) / 2;
  const pad = halfSpan * 0.1;
  const xMin = box.cx - halfSpan - pad;
  const xMax = box.cx + halfSpan + pad;
  const yMin = box.cy - halfSpan - pad;
  const yMax = box.cy + halfSpan + pad;

  const trace = {
    x: xs,
    y: ys,
    type: "scatter",
    mode: "lines",
  };

  const layout = {
    xaxis: { range: [xMin, xMax], constrain: "domain" },
    yaxis: { range: [yMin, yMax], scaleanchor: "x", constrain: "domain" },
    margin: { l: 40, r: 20, t: 20, b: 40 },
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  Plotly.react(plotDiv, [trace], layout, config);
}

nSlider.addEventListener("input", draw);
thetaSlider.addEventListener("input", draw);
radiusToggle.addEventListener("change", draw);

draw();
