import numpy as np
import matplotlib.pyplot as plt
from _common import (ngon_vertices, setup_axes, save, draw_arc_angle, label_point,
                     dot, COLOR_MAIN, COLOR_HIGHLIGHT, COLOR_ACCENT, COLOR_DASH, N)

fig, ax = plt.subplots(figsize=(5.2, 5.2))
# zoom in on triangle; pentagon is with phase pi/2, A at top, B up-left
O = np.array([0.0, 0.0])
V = ngon_vertices(n=N, r=1.0)
A = V[0]
B = V[1]
M = (A + B) / 2  # foot of altitude

# set limits to frame the triangle tightly
xs = [O[0], A[0], B[0]]
ys = [O[1], A[1], B[1]]
pad = 0.25
ax.set_xlim(min(xs) - pad, max(xs) + pad)
ax.set_ylim(min(ys) - pad, max(ys) + pad)
ax.set_aspect("equal")
ax.axis("off")

# Triangle
tri = np.vstack([O, A, B, O])
ax.plot(tri[:, 0], tri[:, 1], color=COLOR_MAIN, lw=2.2)

# Altitude (dashed)
ax.plot([O[0], M[0]], [O[1], M[1]], color=COLOR_DASH, lw=1.7, ls="--")

# Right angle marker at M
# small square
d_om = (M - O)
d_om /= np.linalg.norm(d_om)
d_ab = (B - A)
d_ab /= np.linalg.norm(d_ab)
size = 0.05
p0 = M
p1 = M - d_om * size
p2 = M - d_om * size + d_ab * size
p3 = M + d_ab * size
ax.plot([p1[0], p2[0]], [p1[1], p2[1]], color=COLOR_DASH, lw=1.2)
ax.plot([p2[0], p3[0]], [p2[1], p3[1]], color=COLOR_DASH, lw=1.2)

# Points
dot(ax, O)
dot(ax, A, color=COLOR_HIGHLIGHT, s=40, z=6)
dot(ax, B, color=COLOR_HIGHLIGHT, s=40, z=6)
label_point(ax, O, "$O$", offset=(0.0, -0.10))
label_point(ax, A, "$A$", offset=(0.08, 0.06))
label_point(ax, B, "$B$", offset=(-0.10, 0.06))

# Bisected angle at O (between OA and OM)
angA = np.arctan2(A[1], A[0])
angM = np.arctan2(M[1], M[0])
lo, hi = sorted([angA, angM])
draw_arc_angle(ax, O, 0.22, lo, hi, label=r"$\dfrac{\pi}{n}$",
               color=COLOR_ACCENT, label_r=0.38)

# s/2 label on segment A->M
midAM = (A + M) / 2
perp = np.array([-(M - A)[1], (M - A)[0]])
perp /= np.linalg.norm(perp)
ax.text(midAM[0] + 0.07 * perp[0], midAM[1] + 0.07 * perp[1], r"$s/2$",
        color=COLOR_MAIN, fontsize=13, ha="center", va="center")

# s/2 label on segment M->B (faded, optional)
midMB = (M + B) / 2
perp2 = np.array([-(B - M)[1], (B - M)[0]])
perp2 /= np.linalg.norm(perp2)
ax.text(midMB[0] + 0.07 * perp2[0], midMB[1] + 0.07 * perp2[1], r"$s/2$",
        color=COLOR_MAIN, fontsize=13, ha="center", va="center", alpha=0.55)

# hypotenuse label OA = 1
midOA = (O + A) / 2
ax.text(midOA[0] + 0.1, midOA[1], r"$1$", color=COLOR_HIGHLIGHT, fontsize=13,
        ha="center", va="center")

save(fig, "ngon_step3.png")
