// Wires up a page with sliders, a plot, and a trace button.
//
// config = {
//   sliders: [
//     { id, valueId, parse, format, event },   // event: "input" or "change"
//     ...
//   ],
//   computePath: (values) => points,
//   computeScale: (values) => number,
// }
//
// `values` is a map { id -> parsed number / bool } keyed by each slider's id.

function createApp(config) {
  const elements = config.sliders.map((slider) => ({
    ...slider,
    input: document.getElementById(slider.id),
    valueEl: slider.valueId ? document.getElementById(slider.valueId) : null,
  }));
  const traceBtn = document.getElementById("trace-btn");

  function readValues() {
    const values = {};
    for (const el of elements) {
      values[el.id] = el.parse(el.input);
    }
    return values;
  }

  function draw() {
    const values = readValues();
    for (const el of elements) {
      if (el.valueEl) el.valueEl.textContent = el.format(values[el.id]);
    }
    const scale = config.computeScale(values);
    const points = scalePath(config.computePath(values), scale);
    renderPlot(points, DX);
  }

  for (const el of elements) {
    el.input.addEventListener(el.event || "input", draw);
  }
  if (traceBtn) traceBtn.addEventListener("click", startTrace);

  draw();
}

// Common slider parsers
const parseInt10 = (el) => parseInt(el.value, 10);
const parseFloatVal = (el) => parseFloat(el.value);
const parseChecked = (el) => el.checked;
