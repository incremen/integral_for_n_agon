createApp({
  sliders: [
    { id: "n-slider", valueId: "n-val", parse: parseInt10, format: (v) => v },
    {
      id: "theta-slider",
      valueId: "theta-val",
      parse: (el) => sliderToTheta(parseFloat(el.value)),
      format: formatTheta,
    },
    { id: "radius-toggle", parse: parseChecked, format: () => "", event: "change" },
  ],
  computePath: ({ "n-slider": n, "theta-slider": theta }) =>
    computeIntegralPath(n, theta, DX),
  computeScale: ({ "n-slider": n, "radius-toggle": constantSize }) =>
    constantSize ? 2 * Math.sin(Math.PI / n) : 1,
});
