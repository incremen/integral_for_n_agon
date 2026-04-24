// Starter JS for a new page.
//
// Steps:
//   1. Implement computeMyPath(...) in js/math.js (or a new js/<name>_math.js
//      that's loaded before this file).
//   2. Copy this file to js/<name>.js.
//   3. Edit the slider list to match your HTML's ids and parse/format helpers.
//   4. Wire the path + scale functions to your computation.
//
// See js/app.js (simple) or js/star.js (more sliders) for working examples.

createApp({
  sliders: [
    { id: "n-slider", valueId: "n-val", parse: parseInt10, format: (v) => v },

    // Add one entry per slider / checkbox. Common helpers:
    //   parseInt10      - integer from <input type="range">
    //   parseFloatVal   - float from <input type="range">
    //   parseChecked    - bool from <input type="checkbox">
    // For derived values (e.g. sliderToTheta), inline the parser:
    //   parse: (el) => sliderToTheta(parseFloat(el.value))

    { id: "radius-toggle", parse: parseChecked, format: () => "", event: "change" },
  ],

  computePath: (values) => {
    // Return an array of { x, y } points.
    // `values` is keyed by each slider's id.
    const n = values["n-slider"];
    return computeIntegralPath(n, /* theta */ 15, DX);
  },

  computeScale: (values) => {
    // Return the constant to multiply the whole path by.
    // Return 1 for no rescale.
    return values["radius-toggle"] ? 1 / values["n-slider"] : 1;
  },
});
