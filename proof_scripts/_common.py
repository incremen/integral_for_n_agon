import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Arc, FancyArrowPatch

plt.rcParams["text.usetex"] = False
plt.rcParams["mathtext.fontset"] = "cm"
plt.rcParams["font.family"] = "serif"

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "proof_diagrams")
os.makedirs(OUT_DIR, exist_ok=True)

N = 5
R = 1.0
S = 1.5

COLOR_FAINT = "#c8c8c8"
COLOR_MAIN = "#1f77b4"
COLOR_ACCENT = "#d62728"
COLOR_HIGHLIGHT = "#2ca02c"
COLOR_DASH = "#555555"


def ngon_vertices(n=N, r=R, phase=np.pi / 2):
    k = np.arange(n)
    ang = phase + 2 * np.pi * k / n
    return np.stack([r * np.cos(ang), r * np.sin(ang)], axis=1)


def star_vertices(n=N, s=S, R_outer=R, phase=np.pi / 2):
    """Outer points at radius R_outer on an (n)-pointed star.
    Inner valleys placed at the midline angles, with radius computed so
    the edge length matches L = sin(pi/n) / cos((1-s)pi/(2n)) and the valley
    sits on OV which bisects the outer central angle."""
    gamma = np.pi / n * (1 - s)
    L = np.sin(np.pi / n) / np.cos((1 - s) * np.pi / (2 * n))
    outer_ang = phase + 2 * np.pi * np.arange(n) / n
    inner_ang = outer_ang + np.pi / n
    # radius of valley: use triangle OAV with OA=1, AV=L, angle AOV=pi/n
    # OV = cos(pi/n) * OA + cos(angle OAV) * ... easier: law of cosines
    # but we need angle at A. Use law of sines: AV/sin(AOV) = OA/sin(AVO)
    # sin(AVO) = OA*sin(pi/n)/L; angle OAV = pi - pi/n - AVO
    # OV = OA * sin(angle OAV)/sin(AVO)
    sin_avo = R_outer * np.sin(np.pi / n) / L
    sin_avo = np.clip(sin_avo, -1, 1)
    avo = np.arcsin(sin_avo)
    # the valley turn angle inside triangle is pi/2 - gamma/2 (per proof)
    avo = np.pi / 2 - gamma / 2
    oav = np.pi - np.pi / n - avo
    OV = R_outer * np.sin(oav) / np.sin(avo)
    outer_pts = np.stack([R_outer * np.cos(outer_ang), R_outer * np.sin(outer_ang)], axis=1)
    inner_pts = np.stack([OV * np.cos(inner_ang), OV * np.sin(inner_ang)], axis=1)
    # interleave
    pts = np.empty((2 * n, 2))
    pts[0::2] = outer_pts
    pts[1::2] = inner_pts
    return pts, outer_pts, inner_pts, L, gamma, OV


def setup_axes(ax, lim=1.35):
    ax.set_xlim(-lim, lim)
    ax.set_ylim(-lim, lim)
    ax.set_aspect("equal")
    ax.axis("off")


def save(fig, name):
    path = os.path.join(OUT_DIR, name)
    fig.savefig(path, dpi=220, bbox_inches="tight", pad_inches=0.15, transparent=False)
    plt.close(fig)
    print(f"wrote {path}")


def draw_circle(ax, r=1.0, color=COLOR_FAINT, lw=1.2, ls="-"):
    t = np.linspace(0, 2 * np.pi, 400)
    ax.plot(r * np.cos(t), r * np.sin(t), color=color, lw=lw, ls=ls)


def draw_arc_angle(ax, center, r, theta1, theta2, label=None, color=COLOR_ACCENT, label_r=None, lw=1.6):
    arc = Arc(center, 2 * r, 2 * r, angle=0, theta1=np.degrees(theta1), theta2=np.degrees(theta2), color=color, lw=lw)
    ax.add_patch(arc)
    if label is not None:
        mid = (theta1 + theta2) / 2
        lr = label_r if label_r is not None else r * 1.35
        ax.text(center[0] + lr * np.cos(mid), center[1] + lr * np.sin(mid), label,
                color=color, ha="center", va="center", fontsize=13)


def label_point(ax, xy, text, offset=(0.06, 0.06), color="black", fontsize=13, ha="center", va="center"):
    ax.text(xy[0] + offset[0], xy[1] + offset[1], text, color=color, fontsize=fontsize, ha=ha, va=va)


def dot(ax, xy, color="black", s=28, z=5):
    ax.scatter([xy[0]], [xy[1]], color=color, s=s, zorder=z)
