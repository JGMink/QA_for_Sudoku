# QPU Experiment Proposal: 4×4 Sudoku on D-Wave Advantage2

**To:** Prof. Dinh
**From:** Jonah Minkoff
**Date:** March 2026

---

Three runs on Sycamore (D-Wave Advantage2 system1.13, Zephyr, ~7,000 qubits) to benchmark QPU performance on 4×4 Sudoku QUBO across difficulty levels and annealing modes, producing poster figures with QPU vs SA valid/ground-state rates and chain break fractions.

## Run 1 — LAM Tuning (local, free)

**Script:** `python qpu_experiments/tune_lam_sudoku.py`
**Hardware:** Local CPU only (no QPU access)
**Purpose:** Find the optimal QUBO penalty weight (LAM) before committing QPU time.

The Sudoku QUBO uses a single penalty weight λ for all four constraint types (cell one-hot, row, column, 2×2 box). Sweep LAM ∈ {0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0, 4.0} × 12 puzzles = 108 SA runs (200 reads, 10k sweeps). Completes in ~5 minutes locally.

**Output:** `qpu_experiments/lam_tuning/lam_sweep.csv` + `lam_summary.json`

**QPU time: 0 s**

---

## Run 2 — Forward Annealing (QPU, 12 tasks)

```bash
python qpu_experiments/run_qpu_sudoku.py --mode forward --phase embed
python qpu_experiments/run_qpu_sudoku.py --mode forward --phase solve
python qpu_experiments/run_qpu_sudoku.py --phase analyze
```

12 tasks: 4 puzzles × 3 difficulty levels

| Difficulty | Givens | Free vars | Qubits (approx) |
|------------|--------|-----------|-----------------|
| Easy       | 12     | 16        | ~17             |
| Medium     | 8      | 32        | ~47             |
| Hard       | 4      | 48        | ~99             |

Settings: 1,000 reads · 200 µs anneal · chain_strength = 1× max_coupling

**12 tasks × 1,000 reads × 200 µs → ~2.4 s QPU time**

---

## Run 3 — Reverse Annealing (QPU, 12 tasks)

```bash
python qpu_experiments/run_qpu_sudoku.py --mode reverse --phase embed
python qpu_experiments/run_qpu_sudoku.py --mode reverse --phase solve
python qpu_experiments/run_qpu_sudoku.py --phase analyze
```

Same 12 puzzles. SA finds a valid initial state per puzzle; QPU reverse-anneals from that state using schedule: (0µs, s=1) → (10µs, s=0.45) → (110µs, s=0.45) → (120µs, s=1).

**Hypothesis:** Starting from the valid manifold increases valid rate vs forward annealing, especially for hard puzzles.

**12 tasks × 1,000 reads × 120 µs → ~1.4 s QPU time**

---

## Metrics (per task, per run)

- **Valid rate** — % reads decoding to a valid Sudoku solution
- **GS rate** — % reads matching the known unique solution
- **Chain break fraction** — mean fraction of chains broken per read
- **SA baseline** — SA valid rate at same read count (free comparison)

**Poster figure:** valid rate vs difficulty, forward vs reverse vs SA baseline, CBF as secondary axis.

---

## Timeline

| Step | Where | Time |
|------|-------|------|
| compute_gs_sudoku.py (ground truths) | Local | ~1 min |
| tune_lam_sudoku.py (LAM sweep) | Local | ~5 min |
| Update LAM in run_qpu_sudoku.py | Local | 1 min |
| Run 2: embed + solve (forward) | Sycamore | ~30 min |
| Run 3: embed + solve (reverse) | Sycamore | ~30 min |
| Analyze + poster figures | Local | ~2 hrs |

**Start to poster-ready figures: 1 day.**
