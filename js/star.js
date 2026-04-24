createApp({
  sliders: [
    { id: "n-slider", valueId: "n-val", parse: parseInt10, format: (v) => v },
    {
      id: "s-slider",
      valueId: "s-val",
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
  computePath: ({ "n-slider": n, "s-slider": s, "theta-slider": theta }) =>
    computeStarPath(n, theta, s, DX),
  computeScale: ({ "n-slider": n, "s-slider": s, "radius-toggle": constantSize }) =>
    constantSize
      ? Math.sin(Math.PI / n) / Math.cos(((1 - s) * Math.PI) / (2 * n))
      : 1,
});
