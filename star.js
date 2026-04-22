const plotDiv = document.getElementById("plot");
const nSlider = document.getElementById("n-slider");
const sSlider = document.getElementById("s-slider");
const thetaSlider = document.getElementById("theta-slider");
const nVal = document.getElementById("n-val");
const sVal = document.getElementById("s-val");
const thetaVal = document.getElementById("theta-val");
const traceBtn = document.getElementById("trace-btn");

let lastPath = [];
let lastTs = [];
let traceTimer = null;

function draw() {
  const n = parseInt(nSlider.value);
  const s = parseFloat(sSlider.value);
  const tSlider = parseFloat(thetaSlider.value);
  const theta = 500 * Math.pow(tSlider, 3);
  nVal.textContent = n;
  sVal.textContent = s.toFixed(2);
  thetaVal.textContent = theta < 10 ? theta.toFixed(2) : theta.toFixed(1);

  cancelTrace();

  const dx = 0.01;
  const points = computeStarPath(n, theta, s, dx, 1);
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const ts = points.map((_, i) => i * dx);

  lastPath = points;
  lastTs = ts;

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
    customdata: ts,
    type: "scatter",
    mode: "lines",
    hovertemplate: "x = %{customdata:.2f}<br>(%{x:.3f}, %{y:.3f})<extra></extra>",
  };

  const layout = {
    xaxis: { range: [xMin, xMax], constrain: "domain" },
    yaxis: { range: [yMin, yMax], scaleanchor: "x", constrain: "domain" },
    margin: { l: 40, r: 20, t: 20, b: 40 },
    annotations: [
      {
        text: "",
        xref: "paper",
        yref: "paper",
        x: 0.02,
        y: 0.98,
        xanchor: "left",
        yanchor: "top",
        showarrow: false,
        font: { family: "ui-monospace, SFMono-Regular, Menlo, monospace", size: 13, color: "#fff" },
        bgcolor: "rgba(29, 29, 31, 0.88)",
        bordercolor: "rgba(29, 29, 31, 0.88)",
        borderpad: 4,
        borderwidth: 0,
        opacity: 1,
      },
    ],
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  Plotly.react(plotDiv, [trace], layout, config);
}

function cancelTrace() {
  if (traceTimer !== null) {
    cancelAnimationFrame(traceTimer);
    traceTimer = null;
  }
}

function startTrace() {
  cancelTrace();
  if (lastPath.length === 0) return;

  const durationMs = 9000;
  const startTime = performance.now();
  const total = lastPath.length;

  function step(now) {
    const progress = Math.min((now - startTime) / durationMs, 1);
    const idx = Math.max(1, Math.floor(progress * (total - 1)));
    const xs = lastPath.slice(0, idx + 1).map((p) => p.x);
    const ys = lastPath.slice(0, idx + 1).map((p) => p.y);
    const t = lastTs[idx];

    Plotly.restyle(plotDiv, { x: [xs], y: [ys] }, [0]);
    Plotly.relayout(plotDiv, {
      "annotations[0].text": `x = ${t.toFixed(2)}`,
    });

    if (progress < 1) {
      traceTimer = requestAnimationFrame(step);
    } else {
      traceTimer = null;
    }
  }

  traceTimer = requestAnimationFrame(step);
}

nSlider.addEventListener("input", draw);
sSlider.addEventListener("input", draw);
thetaSlider.addEventListener("input", draw);
traceBtn.addEventListener("click", startTrace);

draw();
