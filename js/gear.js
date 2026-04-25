createApp({
  sliders: [
    { id: "n-slider", valueId: "n-val", parse: parseInt10, format: (v) => v },
    {
      id: "h-slider",
      valueId: "h-val",
      parse: parseFloatVal,
      format: (v) => v.toFixed(2),
    },
    {
      id: "w-slider",
      valueId: "w-val",
      parse: parseFloatVal,
      format: (v) => v.toFixed(2),
    },
    {
      id: "g-slider",
      valueId: "g-val",
      parse: parseFloatVal,
      format: (v) => v.toFixed(2),
    },
    {
      id: "theta-slider",
      valueId: "theta-val",
      parse: (el) => sliderToTheta(parseFloat(el.value)),
      format: formatTheta,
    },
    { id: "radius-toggle", parse: parseChecked, format: () => "", event: "change" },
  ],
  computePath: ({
    "n-slider": n,
    "h-slider": h,
    "w-slider": w,
    "g-slider": g,
    "theta-slider": theta,
  }) => computeGearPath(n, theta, h, w, g, DX),
  // The gear doesn't have a clean closed-form circumradius, so "constant size"
  // just rescales by 1/perimeter-ish: total macro side length is (g + 2h + w).
  computeScale: ({
    "n-slider": n,
    "h-slider": h,
    "w-slider": w,
    "g-slider": g,
    "radius-toggle": constantSize,
  }) => (constantSize ? (2 * Math.sin(Math.PI / n)) / (g + 2 * h + w) : 1),
});
