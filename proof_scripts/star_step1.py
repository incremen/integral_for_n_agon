import numpy as np
import matplotlib.pyplot as plt
from _common import (star_vertices, setup_axes, save, draw_circle, label_point,
                     dot, COLOR_MAIN, COLOR_HIGHLIGHT, COLOR_ACCENT, N, S)

fig, ax = plt.subplots(figsize=(5.4, 5.4))
setup_axes(ax, lim=1.35)

# Unit circle
draw_circle(ax, r=1.0)

# Star
pts, outer, inner, L, gamma, OV_r = star_vertices(n=N, s=S, R_outer=1.0)
poly = np.vstack([pts, pts[:1]])
ax.plot(poly[:, 0], poly[:, 1], color=COLOR_MAIN, lw=2.0)

# Center
O = np.array([0.0, 0.0])
dot(ax, O)
label_point(ax, O, "$O$", offset=(-0.08, -0.08))

# Two adjacent outer points A and B: outer[0] (top) and outer[1]
A = outer[0]
B = outer[1]
V = inner[0]  # valley between outer[0] and outer[1]

dot(ax, A, color=COLOR_HIGHLIGHT, s=44, z=6)
dot(ax, B, color=COLOR_HIGHLIGHT, s=44, z=6)
dot(ax, V, color=COLOR_ACCENT, s=40, z=6)
label_point(ax, A, "$A$", offset=(0.08, 0.08))
label_point(ax, B, "$B$", offset=(-0.12, 0.06))
label_point(ax, V, "$V$", offset=(0.10, 0.04), color=COLOR_ACCENT)

# OA and OB radii
for P in (A, B):
    ax.plot([O[0], P[0]], [O[1], P[1]], color=COLOR_HIGHLIGHT, lw=1.8)

# labels on radii
def mid_label(P, text, off):
    m = (O + P) / 2
    ax.text(m[0] + off[0], m[1] + off[1], text, color=COLOR_HIGHLIGHT,
            fontsize=12, ha="center", va="center")

mid_label(A, "$OA=1$", (0.18, 0.02))
mid_label(B, "$OB=1$", (-0.22, -0.02))

save(fig, "star_step1.png")
