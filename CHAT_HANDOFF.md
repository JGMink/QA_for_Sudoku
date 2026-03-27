# Project Handoff — QA for Sudoku (Conference Poster)

## What This Project Is

A research project for **CMSC 410: Intro to Quantum Computing** at Virginia Commonwealth University. The work formulates Sudoku as a **QUBO (Quadratic Unconstrained Binary Optimization)** problem, solves it using D-Wave's quantum annealing hardware and classical simulated annealing, and benchmarks the results.

**Authors:** Jonah Minkoff (poster), Derek Chiou, Siri Reddy Patlannagari (full report)
**Advisor:** Prof. Thang Dinh, Dept. of Computer Science, VCU
**Repo:** https://github.com/JGMink/QA_for_Sudoku

---

## Key Files

| File | Description |
|------|-------------|
| `quantum_sudoku_poster_v2.pptx` | **Current conference poster** — 42"×36", generate from `make_poster.js` |
| `make_poster.js` | PptxGenJS script that builds the poster. Run with `NODE_PATH=/c/Users/jonah/AppData/Roaming/npm/node_modules node make_poster.js` |
| `quantum_sudoku_poster_FINAL.pptx` | Original poster (kept as color/layout reference) |
| `papers/Derek__Jonah__Siri___CMSC_410__Intro_to_QC___Final_Report (1).pdf` | Full research report — primary content source |
| `figures/vectorized/` | All poster figures as both PDF and hires PNG |
| `figures/plot_*.py` | Scripts that generate each figure |

---

## Poster Layout (42" × 36" — one slide)

**Color palette** (matching original `quantum_sudoku_poster_FINAL`):
- Dark navy `#0A1635` — header/footer background
- Cyan `#00B4D8` — accent bars, section highlights
- Blue `#0077A8` — section header bars
- Light blue `#E8F4FA` — content card fills
- Slate `#3D4F60` — secondary text, some section headers

**Three-column layout:**

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Introduction & Motivation | Methodology | fig1: Test Puzzles |
| QUBO Formulation (formula breakdown) | fig4: QUBO Coefficient Matrix | fig5: QPU vs SA Results Table |
| fig2: One-Hot Encoding | fig3: Variable Reduction (3D cube) | Key Observations |
| | | Conclusions & Future Work |

**Footer:** Special Thanks (Prof. Thang Dinh) + QR code

---

## Figures in `figures/vectorized/`

| File | Aspect ratio | Content |
|------|-------------|---------|
| `fig1_sudoku_puzzles_hires-1.png` | 2.191 (wide) | 4×4 / 9×9 Easy / 9×9 Hard test puzzles |
| `fig2_onehot_matrix_hires-1.png` | 1.881 | One-hot encoding: puzzle → 16×4 binary matrix |
| `fig3_compression_hires-1.png` | 1.054 (square) | 3D cube: variable reduction via given-cell elimination |
| `fig4_qubo_matrix_hires-1.png` | 1.075 (square) | 64×64 QUBO coefficient heatmap (4×4 Sudoku) |
| `fig5_comparison_table_hires-1.png` | 2.387 (wide) | D-Wave Advantage2 QPU vs SA comparison table |
| `dwave_qpu_box.jpg` | — | D-Wave hardware photo (used in Methodology section) |
| `qr_code.png` / `qr_code.svg` | — | QR code for poster footer |

**Important:** The `make_poster.js` script uses the `_hires-1.png` versions. Card heights in the script are computed to match each figure's exact aspect ratio — don't resize cards without rechecking math.

---

## Research Summary

### Problem
Sudoku = constraint satisfaction problem = graph coloring on N×N grid. Model it as QUBO and solve with quantum annealing.

### QUBO Encoding
- **Variable:** `x_{i,j,k} = 1` if cell (i,j) holds digit k+1, else 0
- **4×4:** 64 binary variables → 64×64 QUBO matrix
- **9×9:** 729 variables; with 30 givens → 459 free variables (37% reduction via given-cell elimination)
- **Energy:** `E_total = E1 + E2 + E3 + E4 = 0` ⟹ valid Sudoku
  - E1: cell uniqueness, E2: row, E3: column, E4: box
  - All Lagrange multipliers λ = 1.0; QUBO sparsity: 90.6%

### Results (D-Wave Advantage2 QPU vs Simulated Annealing — 4×4 Sudoku)

| Difficulty | Free Vars | Qubits | SA Opt % | QPU Opt % | QPU ±Std |
|------------|-----------|--------|----------|-----------|----------|
| Easy       | 16        | 16–17  | 100%     | 100%      | ±0.0%    |
| Medium     | 32        | 46–47  | 100%     | 99.4%     | ±1.0%    |
| Hard       | 48        | 99–117 | 100%     | 76.1%     | ±12.7%   |

### Key Findings
- SA: 99% on 4×4, collapses to 6%/0%/0% on 9×9 Easy/Medium/Hard
- D-Wave Hybrid solved Medium puzzle where all 100 SA runs failed — quantum tunneling advantage
- QPU performance drops on Hard (17-clue) — embedding complexity is the bottleneck
- Execution times comparable: Hybrid 1.72s avg vs SA 1.96s

---

## Regenerating the Poster

```bash
cd /c/Users/jonah/Documents/repos/research/QA_for_Sudoku
NODE_PATH=/c/Users/jonah/AppData/Roaming/npm/node_modules node make_poster.js
# Output: quantum_sudoku_poster_v2.pptx
```

**Note:** `pptxgenjs` is installed globally at `C:\Users\jonah\AppData\Roaming\npm\node_modules\pptxgenjs`. LibreOffice is NOT installed, so PDF conversion for visual QA requires opening the PPTX in PowerPoint.

### Column height math (important for edits)
All three columns must sum to exactly **29.65"** (= FOOTER_Y 34.4 − BODY_Y 4.6 − 0.15 bottom padding).
- BODY_Y = 4.6 (= header 4.2 + cyan divider 0.15 + gap 0.25)
- Vertical gutter between cards = 0.2"
- Column width = 13.0"; left margins at x = [0.6, 14.25, 27.9]

---

## Things That Could Be Improved

- **fig3 (3D cube)** is nearly square (1.054:1) in a 13"-wide card — it displays centered with ~1.9" whitespace on each side. Could crop the figure or use a narrower card.
- **Penalty weight tuning** (λ₁…λ₄) was not explored — all set to 1.0.
- **9×9 QPU experiments** were blocked by qubit count; only 4×4 ran on actual QPU hardware.
- Poster currently single-author (Jonah Minkoff); full report has three authors.

---

## Memory / Persistent Context

Auto-memory for this project is in:
`C:\Users\jonah\.claude\projects\C--Users-jonah-Documents-repos-research-QA-for-Sudoku\memory\`
