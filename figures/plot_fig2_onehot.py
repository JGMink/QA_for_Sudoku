"""
Recreate fig2_onehot_matrix.png — One-Hot Encoding visualization.

Shows how a 4×4 Sudoku puzzle maps to a 16×4 binary encoding matrix,
color-coded by variable status (free / eliminated / fixed=1).

Uses hard_1 puzzle: 4 givens (2 @ r0c1, 3 @ r1c3, 2 @ r2c0, 4 @ r3c2)

Run from repo root:
    python figures/plot_fig2_onehot.py
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch
from pathlib import Path

OUT = Path(__file__).parent / "fig2_onehot_matrix.png"

# hard_1 puzzle (0 = blank)
PUZZLE = np.array([
    [0, 2, 0, 0],
    [0, 0, 0, 3],
    [2, 0, 0, 0],
    [0, 0, 4, 0],
])
N = 4

# ---------------------------------------------------------------------------
# Build encoding matrix  shape (16, 4)
# Row i*N+j = cell (i,j), col k = digit k+1
# Values: 0 = free, -1 = eliminated (given wrong digit), 1 = fixed
# ---------------------------------------------------------------------------
enc = np.zeros((N * N, N), dtype=int)
for i in range(N):
    for j in range(N):
        g = PUZZLE[i, j]
        if g != 0:
            for k in range(N):
                enc[i * N + j, k] = 1 if k == g - 1 else -1

# Colors
FREE_C  = "#AED6F1"   # light blue
ELIM_C  = "#D5D8DC"   # light gray
FIXED_C = "#1A5276"   # dark blue
BLANK_C = "white"

# ---------------------------------------------------------------------------
# Layout: puzzle grid left, matrix right, connecting lines in between
# ---------------------------------------------------------------------------
fig = plt.figure(figsize=(13, 7))
fig.patch.set_facecolor("white")

ax_puzzle = fig.add_axes([0.02, 0.12, 0.28, 0.72])   # left: puzzle
ax_matrix = fig.add_axes([0.42, 0.08, 0.42, 0.80])   # right: matrix

# ── Puzzle grid ─────────────────────────────────────────────────────────────
ax_puzzle.set_xlim(0, N)
ax_puzzle.set_ylim(0, N)
ax_puzzle.set_aspect("equal")
ax_puzzle.axis("off")
ax_puzzle.set_title("4×4 Puzzle", fontsize=12, fontweight="bold", pad=8)

BOX_GIVEN = "#F9E79F"
BOX_FREE  = "white"

for i in range(N):
    for j in range(N):
        val  = PUZZLE[i, j]
        row  = N - 1 - i          # flip so row 0 is at top
        col  = j
        color = BOX_GIVEN if val != 0 else BOX_FREE
        rect = plt.Rectangle([col, row], 1, 1,
                              facecolor=color, edgecolor="#888888", linewidth=1.2)
        ax_puzzle.add_patch(rect)
        if val != 0:
            ax_puzzle.text(col + 0.5, row + 0.5, str(val),
                           ha="center", va="center",
                           fontsize=18, fontweight="bold", color="#333333")
        else:
            ax_puzzle.text(col + 0.5, row + 0.5, "?",
                           ha="center", va="center",
                           fontsize=12, color="#aaaaaa")

# Box borders (2×2 boxes)
for br in range(2):
    for bc in range(2):
        rect = plt.Rectangle([bc * 2, br * 2], 2, 2,
                              fill=False, edgecolor="#333333", linewidth=2.2)
        ax_puzzle.add_patch(rect)

# Legend for puzzle
given_patch = mpatches.Patch(facecolor=BOX_GIVEN, edgecolor="#888888", label="Given clue")
free_patch  = mpatches.Patch(facecolor=BOX_FREE,  edgecolor="#888888", label="Free cell")
ax_puzzle.legend(handles=[given_patch, free_patch],
                 loc="lower center", bbox_to_anchor=(0.5, -0.12),
                 fontsize=9, framealpha=0.9, ncol=2)

# ── Encoding matrix ─────────────────────────────────────────────────────────
ax_matrix.set_xlim(-0.5, N - 0.5)
ax_matrix.set_ylim(-0.5, N * N - 0.5)
ax_matrix.set_aspect("equal")
ax_matrix.axis("off")
ax_matrix.set_title(
    f"16×4 Encoding Matrix  ({N*N} binary variables per digit = {N*N*N} total,  "
    f"{int(np.sum(enc == 0))} free)",
    fontsize=11, fontweight="bold", pad=10,
)

for row_idx in range(N * N):
    cell_row = row_idx // N   # 0-indexed puzzle row
    cell_col = row_idx % N    # 0-indexed puzzle col
    mat_y    = N * N - 1 - row_idx   # flip so (1,1) at top

    for k in range(N):
        v = enc[row_idx, k]
        if v == 0:
            color = FREE_C
        elif v == -1:
            color = ELIM_C
        else:
            color = FIXED_C

        rect = plt.Rectangle([k - 0.5, mat_y - 0.5], 1, 1,
                              facecolor=color, edgecolor="white", linewidth=0.8)
        ax_matrix.add_patch(rect)

    # Row label (right side) — (row, col) 1-indexed
    ax_matrix.text(N - 0.5 + 0.55, mat_y,
                   f"({cell_row+1},{cell_col+1})",
                   ha="left", va="center", fontsize=8, color="#444444")

# Column labels (bottom)
for k in range(N):
    ax_matrix.text(k, -0.5 - 0.4, f"d={k+1}",
                   ha="center", va="top", fontsize=10, fontweight="bold")

# Annotations with arrows pointing to specific rows
# Row (1,2): given=2 — top given row in matrix (row_idx=1 → mat_y = N²-2 = 14)
given_row_y = N * N - 1 - 1   # (1,2) is row_idx=1

ax_matrix.annotate(
    "given=2:\none locked, 3 killed",
    xy=(N - 0.5, given_row_y),
    xytext=(N + 1.6, given_row_y + 2.5),
    fontsize=8.5, color="#7D6608",
    ha="left", va="center",
    arrowprops=dict(arrowstyle="->", color="#7D6608", lw=1.2),
    bbox=dict(boxstyle="round,pad=0.3", facecolor="#FEF9E7",
              edgecolor="#7D6608", alpha=0.9),
)

# Row (1,1): free — row_idx=0 → mat_y = N²-1 = 15
free_row_y = N * N - 1 - 0

ax_matrix.annotate(
    "free:\nall 4 vars active",
    xy=(N - 0.5, free_row_y),
    xytext=(N + 1.6, free_row_y + 1.2),
    fontsize=8.5, color="#1A5276",
    ha="left", va="center",
    arrowprops=dict(arrowstyle="->", color="#1A5276", lw=1.2),
    bbox=dict(boxstyle="round,pad=0.3", facecolor="#EBF5FB",
              edgecolor="#1A5276", alpha=0.9),
)

# ── Bottom legend for matrix ─────────────────────────────────────────────────
n_free  = int(np.sum(enc == 0))
n_elim  = int(np.sum(enc == -1))
n_fixed = int(np.sum(enc == 1))

patches = [
    mpatches.Patch(facecolor=FREE_C,  edgecolor="#888888",
                   label=f"Free variable  ({n_free} vars)"),
    mpatches.Patch(facecolor=ELIM_C,  edgecolor="#888888",
                   label=f"Eliminated  ({n_elim} vars, given ≠ digit)"),
    mpatches.Patch(facecolor=FIXED_C, edgecolor="#888888",
                   label=f"Fixed = 1  ({n_fixed} vars, given = digit)"),
]
fig.legend(handles=patches, loc="lower center", bbox_to_anchor=(0.62, 0.0),
           fontsize=9, ncol=3, framealpha=0.9)

# ── Connecting lines (puzzle cell → matrix row) ───────────────────────────────
# Map puzzle axes → figure coords via transforms
for i in range(N):
    for j in range(N):
        row_idx = i * N + j
        mat_y   = N * N - 1 - row_idx

        # Puzzle cell center in axes coords
        puz_x = j + 0.5
        puz_y = (N - 1 - i) + 0.5

        # Convert to figure coords
        puz_disp  = ax_puzzle.transData.transform((puz_x, puz_y))
        puz_fig   = fig.transFigure.inverted().transform(puz_disp)

        mat_disp  = ax_matrix.transData.transform((-0.5, mat_y))
        mat_fig   = fig.transFigure.inverted().transform(mat_disp)

        line = plt.Line2D(
            [puz_fig[0], mat_fig[0]],
            [puz_fig[1], mat_fig[1]],
            transform=fig.transFigure,
            color="#AAAAAA", linewidth=0.5, alpha=0.5,
        )
        fig.add_artist(line)

# ── Overall title ─────────────────────────────────────────────────────────────
fig.suptitle("One-Hot Encoding: Each Sudoku Cell Becomes N Binary Variables",
             fontsize=13, fontweight="bold", y=0.97)

plt.savefig(OUT, dpi=150, bbox_inches="tight", facecolor="white")
plt.close()
print(f"Saved {OUT}")
