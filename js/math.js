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
  // Five sigmoid turns per tooth:
  //   +pi/2, -pi/2, -pi/2, +pi/2     -> zero-net-turn square tooth
  //   +2pi/n                         -> macro polygon corner, fired AFTER
  //                                    the second half of the gap so the
  //                                    tooth is centered on the edge.
  const points = [];
  let real = 0;
  let imag = 0;
  const t1 = g / 2;
  const t2 = t1 + h;
  const t3 = t2 + w;
  const t4 = t3 + h;
  const t5 = t4 + g / 2;
  const L = t5;
  const totalTime = n * L;
  const macroTurn = (2 * Math.PI) / n;

  for (let x = dx / 2; x <= totalTime; x += dx) {
    let phase = 0;
    for (let r = 0; r < n; r++) {
      const xAdj = x - r * L;
      // Once a tooth has fully fired, its five sigmoids sum to macroTurn
      // (square bump cancels to 0, macro turn adds 2pi/n).
      const margin = 10 / theta;
      if (xAdj < -margin) continue;
      if (xAdj > t5 + margin) {
        phase += macroTurn;
        continue;
      }
      phase += (Math.PI / 2) * sigmoid(theta * (xAdj - t1));
      phase += (-Math.PI / 2) * sigmoid(theta * (xAdj - t2));
      phase += (-Math.PI / 2) * sigmoid(theta * (xAdj - t3));
      phase += (Math.PI / 2) * sigmoid(theta * (xAdj - t4));
      phase += macroTurn * sigmoid(theta * (xAdj - t5));
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
