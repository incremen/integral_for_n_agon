function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

function computeIntegralPath(n, theta, dx = 0.01) {
  const points = [];
  let real = 0;
  let imag = 0;
  const maxX = n + 1;

  for (let x = 0; x <= maxX; x += dx) {
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
