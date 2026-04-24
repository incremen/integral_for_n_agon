import numpy as np
import matplotlib.pyplot as plt
from _common import (star_vertices, setup_axes, save, draw_circle, draw_arc_angle,
                     label_point, dot, COLOR_MAIN, COLOR_HIGHLIGHT, COLOR_ACCENT,
                     COLOR_DASH, N, S)

fig, ax = plt.subplots(figsize=(5.4, 5.4))
setup_axes(ax, lim=1.35)

# Faded circle
draw_circle(ax, r=1.0, color="#efefef")

# Faded star
pts, outer, inner, L, gamma, OV_r = star_vertices(n=N, s=S, R_outer=1.0)
poly = np.vstack([pts, pts[:1]])
ax.plot(poly[:, 0], poly[:, 1], color="#d8d8d8", lw=1.5)

O = np.array([0.0, 0.0])
A = outer[0]
V = inner[0]  # valley between outer[0] and outer[1]

# Triangle OAV solid
tri = np.vstack([O, A, V, O])
ax.plot(tri[:, 0], tri[:, 1], color=COLOR_MAIN, lw=2.2)

# OV line emphasized
ax.plot([O[0], V[0]], [O[1], V[1]], color=COLOR_DASH, lw=1.7, ls="--")

# Points
dot(ax, O)
dot(ax, A, color=COLOR_HIGHLIGHT, s=44, z=6)
dot(ax, V, color=COLOR_ACCENT, s=42, z=6)
label_point(ax, O, "$O$", offset=(-0.08, -0.08))
label_point(ax, A, "$A$", offset=(0.08, 0.08))
label_point(ax, V, "$V$", offset=(0.10, 0.04), color=COLOR_ACCENT)

# Arc for angle AOV at O
angA = np.arctan2(A[1], A[0])
angV = np.arctan2(V[1], V[0])
lo, hi = sorted([angA, angV])
draw_arc_angle(ax, O, 0.24, lo, hi, label=r"$\dfrac{\pi}{n}$",
               color=COLOR_ACCENT, label_r=0.42)

# Label edge AV as L
mid = (A + V) / 2
d = V - A
perp = np.array([-d[1], d[0]])
perp /= np.linalg.norm(perp)
ax.text(mid[0] + 0.09 * perp[0], mid[1] + 0.09 * perp[1], "$L$",
        color=COLOR_MAIN, fontsize=14, ha="center", va="center")

save(fig, "star_step2.png")
