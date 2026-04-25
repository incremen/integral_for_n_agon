# The Integral Gear

This builds on the [$n$-gon](../index.html). We're still adding shifted sigmoids in the exponent of a complex exponential, but now each sigmoid fires a specific turn angle — not a uniform $\tfrac{2\pi}{n}$ — so we can draw a polygon whose edges have square teeth sticking out.

### 1. What shape we wanna trace

A gear is an $n$-sided polygon with a square bump (a "tooth") in the middle of each edge. If the car drove clockwise-er, sorry, counterclockwise around the shape, starting along one edge, it would:

1. drive straight for a bit (half of the gap between teeth),
2. turn **left** $90°$ to start climbing the tooth,
3. drive up,
4. turn **right** $90°$ to go across the top of the tooth,
5. drive across,
6. turn **right** $90°$ to come back down,
7. drive down,
8. turn **left** $90°$ to rejoin the edge,
9. drive straight for a bit (the other half of the gap),
10. turn **left** $\tfrac{2\pi}{n}$ to start the next edge of the polygon.

Then repeat that block $n$ times and the path closes.

### 2. Turning it into sigmoid coefficients

Each of those turns is one sigmoid in the sum. The $c_k$ in front of each sigmoid is the exact angle of that turn (positive = left, negative = right):

| Step | Action | Coefficient |
|---|---|---|
| turn left $90°$ | going up the tooth | $+\tfrac{\pi}{2}$ |
| turn right $90°$ | crossing the top | $-\tfrac{\pi}{2}$ |
| turn right $90°$ | going down | $-\tfrac{\pi}{2}$ |
| turn left $90°$ | back to the edge | $+\tfrac{\pi}{2}$ |
| turn left $\tfrac{2\pi}{n}$ | polygon corner | $+\tfrac{2\pi}{n}$ |

Summing those angles gives $\tfrac{\pi}{2} - \tfrac{\pi}{2} - \tfrac{\pi}{2} + \tfrac{\pi}{2} + \tfrac{2\pi}{n} = \tfrac{2\pi}{n}$. The four tooth turns cancel exactly — this is the **zero-net-turn** part. Only the $\tfrac{2\pi}{n}$ corner contributes to the heading change across one full tooth block.

Closure check: after $n$ repetitions the car has accumulated $n \cdot \tfrac{2\pi}{n} = 2\pi$, a full rotation. The path closes for *any* choice of $h$, $w$, $g$ — the geometry of the tooth can't break the loop.

### 3. When each sigmoid fires

A sigmoid $\sigma(\theta(x - t))$ flips from $0$ to $1$ right around $x = t$. We want each turn to happen when the car has driven far enough along its current heading to have covered the right distance. Because the pen moves at speed 1, "distance" and "time" are the same number.

Within one tooth block, call the start of the block $x = 0$:

* **$t_1 = g/2$** — the car has driven half the gap. Time to start climbing.
* **$t_2 = t_1 + h$** — climbed the full height $h$. Time to go across.
* **$t_3 = t_2 + w$** — crossed the top for width $w$. Time to come down.
* **$t_4 = t_3 + h$** — back at baseline after descending $h$. Rejoin the edge.
* **$t_5 = t_4 + g/2$** — drove the second half of the gap. Time to make the polygon corner.

The full block length is $L = t_5 = g + 2h + w$.

**Why split the gap in half?** If we put the whole gap *before* the tooth and fired the polygon corner right at the end of the tooth, the tooth would sit at the trailing edge of each side and the gear would look like a ratchet (every tooth leaning in the same direction). Splitting the gap centers each tooth on its edge.

### 4. Stacking $n$ blocks

The sigmoid pattern for one tooth block has to repeat $n$ times — once per edge of the underlying polygon. Instead of listing out $5n$ sigmoids explicitly, we offset each repetition by $r \cdot L$ for $r = 0, 1, \dots, n{-}1$:

$$
z(X) = \frac{2\sin(\pi/n)}{g + 2h + w} \int_0^X \exp\!\left( i \sum_{r=0}^{n-1} \left[
\begin{aligned}
  & +\tfrac{\pi}{2}\sigma(x - rL - t_1) \\
  & -\tfrac{\pi}{2}\sigma(x - rL - t_2) \\
  & -\tfrac{\pi}{2}\sigma(x - rL - t_3) \\
  & +\tfrac{\pi}{2}\sigma(x - rL - t_4) \\
  & +\tfrac{2\pi}{n}\sigma(x - rL - t_5)
\end{aligned}
\right] \right) dx
$$

Each value of $r$ selects a different block; each $t_i$ selects a step within that block. Together they schedule all $5n$ turns across the interval $[0, nL]$.

### 6. Fixing the size

The pen moves at speed 1, so the raw integral's perimeter is $n \cdot L = n(g + 2h + w)$ — i.e. each edge of the polygon has length $L$, not $1$. To restore the $n$-gon sizing convention (circumradius of the underlying polygon $= 1$), we need each edge to have length $2\sin(\pi/n)$ instead of length $L$.

Since the integral is linear, we just pull a scalar out front:

$$\frac{2\sin(\pi/n)}{g + 2h + w}$$

That's the constant at the beginning of the integral. Turning off "Constant Size" drops it and reverts to the raw speed-1 path. The teeth still poke out beyond the circumradius — this only locks the underlying polygon to $R = 1$.
