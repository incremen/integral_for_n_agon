import numpy as np
import matplotlib.pyplot as plt
from _common import (ngon_vertices, setup_axes, save, draw_circle, label_point, dot,
                     COLOR_MAIN, COLOR_HIGHLIGHT, N)

fig, ax = plt.subplots(figsize=(5.2, 5.2))
setup_axes(ax)

# Unit circle
draw_circle(ax, r=1.0)

# Pentagon
V = ngon_vertices(n=N, r=1.0)
poly = np.vstack([V, V[:1]])
ax.plot(poly[:, 0], poly[:, 1], color=COLOR_MAIN, lw=2.0)

# Center
O = np.array([0.0, 0.0])
dot(ax, O)
label_point(ax, O, "$O$", offset=(-0.08, -0.08))

# Highlight two adjacent vertices A, B
A = V[0]
B = V[1]
dot(ax, A, color=COLOR_HIGHLIGHT, s=44, z=6)
dot(ax, B, color=COLOR_HIGHLIGHT, s=44, z=6)
label_point(ax, A, "$A$", offset=(0.02, 0.10))
label_point(ax, B, "$B$", offset=(-0.12, 0.06))

# Radii OA and OB
for P, name in [(A, "OA"), (B, "OB")]:
    ax.plot([O[0], P[0]], [O[1], P[1]], color=COLOR_HIGHLIGHT, lw=2.0)

# Labels on radii (midpoint)
def mid_label(P, text, off):
    m = (O + P) / 2
    ax.text(m[0] + off[0], m[1] + off[1], text, color=COLOR_HIGHLIGHT, fontsize=12, ha="center", va="center")

mid_label(A, "$OA=1$", (0.16, 0.05))
mid_label(B, "$OB=1$", (-0.22, -0.04))

save(fig, "ngon_step1.png")
