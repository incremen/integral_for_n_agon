import numpy as np
import matplotlib.pyplot as plt
from _common import (ngon_vertices, setup_axes, save, draw_circle, draw_arc_angle,
                     label_point, dot, COLOR_FAINT, COLOR_MAIN, COLOR_HIGHLIGHT,
                     COLOR_ACCENT, N)

fig, ax = plt.subplots(figsize=(5.2, 5.2))
setup_axes(ax)

# Faded circle & pentagon
draw_circle(ax, r=1.0, color="#e8e8e8")
V = ngon_vertices(n=N, r=1.0)
poly = np.vstack([V, V[:1]])
ax.plot(poly[:, 0], poly[:, 1], color="#dcdcdc", lw=1.5)

# Solid triangle OAB
O = np.array([0.0, 0.0])
A = V[0]
B = V[1]
tri = np.vstack([O, A, B, O])
ax.plot(tri[:, 0], tri[:, 1], color=COLOR_MAIN, lw=2.2)

# Points
dot(ax, O)
dot(ax, A, color=COLOR_HIGHLIGHT, s=40, z=6)
dot(ax, B, color=COLOR_HIGHLIGHT, s=40, z=6)
label_point(ax, O, "$O$", offset=(-0.08, -0.08))
label_point(ax, A, "$A$", offset=(0.02, 0.10))
label_point(ax, B, "$B$", offset=(-0.12, 0.06))

# Central angle arc
angA = np.arctan2(A[1], A[0])
angB = np.arctan2(B[1], B[0])
# go from A counterclockwise to B
if angB < angA:
    angB += 2 * np.pi
# actually from smaller to larger, pentagon: A at pi/2, B at pi/2 + 2pi/5
draw_arc_angle(ax, O, 0.28, angA, angB, label=r"$\dfrac{2\pi}{n}$",
               color=COLOR_ACCENT, label_r=0.46)

# Edge AB label s
mid = (A + B) / 2
# perpendicular direction outward
d = B - A
perp = np.array([-d[1], d[0]])
perp = perp / np.linalg.norm(perp)
ax.text(mid[0] + 0.09 * perp[0], mid[1] + 0.09 * perp[1], "$s$",
        color=COLOR_MAIN, fontsize=14, ha="center", va="center")

save(fig, "ngon_step2.png")
