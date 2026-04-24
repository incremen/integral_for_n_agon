import numpy as np
import matplotlib.pyplot as plt
from _common import (star_vertices, save, draw_arc_angle, label_point, dot,
                     COLOR_MAIN, COLOR_HIGHLIGHT, COLOR_ACCENT, COLOR_DASH, N, S)

fig, ax = plt.subplots(figsize=(5.4, 5.4))

# Build star geometry
pts, outer, inner, L, gamma, OV_r = star_vertices(n=N, s=S, R_outer=1.0)
O = np.array([0.0, 0.0])
A = outer[0]
V = inner[0]
B = outer[1]  # the other outer point the "car" heads to next

# Zoom to OAV region with some padding
xs = [O[0], A[0], V[0], B[0]]
ys = [O[1], A[1], V[1], B[1]]
pad_x, pad_y = 0.28, 0.28
ax.set_xlim(min(xs) - pad_x, max(xs) + pad_x)
ax.set_ylim(min(ys) - pad_y, max(ys) + pad_y)
ax.set_aspect("equal")
ax.axis("off")

# Triangle OAV solid
tri = np.vstack([O, A, V, O])
ax.plot(tri[:, 0], tri[:, 1], color=COLOR_MAIN, lw=2.2)

# Extended dashed line from A through V past V (the "car" direction before turn)
dir_av = (V - A) / np.linalg.norm(V - A)
ext_end = V + dir_av * 0.45
ax.plot([A[0], ext_end[0]], [A[1], ext_end[1]], color=COLOR_DASH, lw=1.6, ls="--")

# Also draw a short segment from V toward B (next edge after the turn), solid but thin
dir_vb = (B - V) / np.linalg.norm(B - V)
next_end = V + dir_vb * 0.45
ax.plot([V[0], next_end[0]], [V[1], next_end[1]], color=COLOR_ACCENT, lw=1.6)

# Exterior angle gamma: between ext (A->V extended) and (V->B).
ang_ext = np.arctan2(dir_av[1], dir_av[0])
ang_next = np.arctan2(dir_vb[1], dir_vb[0])
# For s=1.5, gamma is negative (right turn), ang_next is clockwise from ang_ext.
# Draw arc from min to max angle about V.
lo, hi = sorted([ang_ext, ang_next])
# unwrap to smallest arc
if hi - lo > np.pi:
    lo, hi = hi, lo + 2 * np.pi
draw_arc_angle(ax, V, 0.18, lo, hi, label=r"$\gamma$",
               color=COLOR_ACCENT, label_r=0.30)

# Interior angle AVO at V (between V->A and V->O)
dir_va = (A - V) / np.linalg.norm(A - V)
dir_vo = (O - V) / np.linalg.norm(O - V)
ang_va = np.arctan2(dir_va[1], dir_va[0])
ang_vo = np.arctan2(dir_vo[1], dir_vo[0])
lo2, hi2 = sorted([ang_va, ang_vo])
if hi2 - lo2 > np.pi:
    lo2, hi2 = hi2, lo2 + 2 * np.pi
draw_arc_angle(ax, V, 0.13, lo2, hi2, label=r"$\angle AVO$",
               color=COLOR_MAIN, label_r=0.30)

# OV dashed
ax.plot([O[0], V[0]], [O[1], V[1]], color=COLOR_DASH, lw=1.4, ls="--")

# Points & labels
dot(ax, O)
dot(ax, A, color=COLOR_HIGHLIGHT, s=44, z=6)
dot(ax, V, color=COLOR_ACCENT, s=42, z=6)
label_point(ax, O, "$O$", offset=(0.0, -0.10))
label_point(ax, A, "$A$", offset=(0.10, 0.06))
label_point(ax, V, "$V$", offset=(-0.11, 0.04), color=COLOR_ACCENT)

save(fig, "star_step3.png")
