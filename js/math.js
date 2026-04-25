const DX = 0.001;

function sliderToTheta(s) {
  return 1_000 * Math.pow(s, 3);
}

function formatTheta(theta) {
  return theta < 10 ? theta.toFixed(2) : theta.toFixed(1);
}

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

function computeIntegralPath(n, theta, dx) {
  const points = [];
  let real = 0;
  let imag = 0;
  for (let x = 0; x <= n; x += dx) {
    let sum = 0;
    for (let k = 1; k <= n; k++) {
      sum += sigmoid(theta * (x - k));
    }

    const phase = (2 * Math.PI / n) * sum;
    real += Math.cos(phase) * dx;
    imag += Math.sin(phase) * dx;
    points.push({ x: real, y: imag });
  }

  return points;
}

function computeStarPath(n, theta, sharpness, dx) {
  const points = [];
  let real = 0;
  let imag = 0;
  const total = 2 * n;
  const cOdd = (Math.PI / n) * (1 + sharpness);
  const cEven = (Math.PI / n) * (1 - sharpness);

  for (let x = 0; x <= total; x += dx) {
    let phase = 0;
    for (let k = 1; k <= total; k++) {
      const c = k % 2 === 1 ? cOdd : cEven;
      phase += c * sigmoid(theta * (x - k));
    }

    real += Math.cos(phase) * dx;
    imag += Math.sin(phase) * dx;
    points.push({ x: real, y: imag });
  }

  return points;
}

function computeGearPath(n, theta, h, w, g, dx) {
  // Four sigmoid turns per tooth form a "zero-net-turn" square bump:
  //   +pi/2, -pi/2, -pi/2, (pi/2 + 2pi/n)
  // The last term folds the macroscopic polygon corner into the final turn,
  // so the n teeth close into a gear.
  const points = [];
  let real = 0;
  let imag = 0;
  const t1 = g;
  const t2 = t1 + h;
  const t3 = t2 + w;
  const t4 = t3 + h;
  const L = t4;
  const totalTime = n * L;
  const macroTurn = (2 * Math.PI) / n;

  for (let x = dx / 2; x <= totalTime; x += dx) {
    let phase = 0;
    for (let r = 0; r < n; r++) {
      const xAdj = x - r * L;
      // Once a tooth has fully fired, its four sigmoids sum to exactly
      // macroTurn (the zero-net-turn cancels), so we can add that constant
      // instead of re-computing four saturated sigmoids.
      const margin = 10 / theta;
      if (xAdj < -margin) continue;
      if (xAdj > t4 + margin) {
        phase += macroTurn;
        continue;
      }
      phase += (Math.PI / 2) * sigmoid(theta * (xAdj - t1));
      phase += (-Math.PI / 2) * sigmoid(theta * (xAdj - t2));
      phase += (-Math.PI / 2) * sigmoid(theta * (xAdj - t3));
      phase += (Math.PI / 2 + macroTurn) * sigmoid(theta * (xAdj - t4));
    }
    real += Math.cos(phase) * dx;
    imag += Math.sin(phase) * dx;
    points.push({ x: real, y: imag });
  }

  return points;
}

function scalePath(points, scale) {
  if (scale === 1) return points;
  return points.map((p) => ({ x: p.x * scale, y: p.y * scale }));
}

function getBoundingBox(points) {
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  return {
    minX, maxX, minY, maxY,
    width: maxX - minX,
    height: maxY - minY,
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
  };
}
