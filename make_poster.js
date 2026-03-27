// Conference Poster – Grid-Based Quantum Annealing for Sudoku
// PptxGenJS  |  42" × 36"  |  Matches quantum_sudoku_poster_FINAL color scheme
//
// Figure aspect ratios (width:height):
//   fig1 (test puzzles):      2653×1211  = 2.191 — wide landscape
//   fig2 (one-hot matrix):    2449×1302  = 1.881 — landscape
//   fig3 (3D cube):           2360×2240  = 1.054 — nearly square
//   fig4 (QUBO matrix):       1376×1280  = 1.075 — nearly square
//   fig5 (results table):     1590×666   = 2.387 — wide landscape

const pptxgen = require("pptxgenjs");

const C = {
  darkNavy:    "0A1635",
  navy:        "0D1B4B",
  cyan:        "00B4D8",
  blue:        "0077A8",
  lightBlueBg: "E8F4FA",
  cardBorder:  "B8D0E8",
  slate:       "3D4F60",
  bodyText:    "1A202C",
  white:       "FFFFFF",
  green:       "1A7A3C",
  red:         "C0392B",
  mutedBlue:   "9BBDD6",
};

// ─── Layout ──────────────────────────────────────────────────────────────────
const W = 42, H = 36;
const HEADER_H  = 4.2;
const DIVIDER_H = 0.15;
const FOOTER_Y  = 34.4;
const MARGIN    = 0.6;
const COL_W     = 13.0;
const GUTTER    = 0.65;
const COL_X     = [MARGIN, MARGIN + COL_W + GUTTER, MARGIN + 2 * (COL_W + GUTTER)];
// COL_X = [0.6, 14.25, 27.9]
const BODY_Y    = HEADER_H + DIVIDER_H + 0.25;   // 4.6"
const AVAIL     = FOOTER_Y - BODY_Y - 0.15;      // 29.65"  (per-column)
const GUTTER_V  = 0.2;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function card(slide, pres, x, y, w, h, bg = C.lightBlueBg) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h,
    fill: { color: bg }, line: { color: C.cardBorder, width: 1.5 } });
}

function sectionHeader(slide, label, x, y, w, color = C.blue) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.62,
    fill: { color }, line: { color, width: 0 } });
  slide.addText(label.toUpperCase(), {
    x: x + 0.18, y, w: w - 0.2, h: 0.62,
    fontSize: 26, bold: true, color: C.white,
    align: "left", valign: "middle", margin: 0, charSpacing: 2,
  });
}

function fig(slide, imgPath, x, y, cardW, cardH, pad = 0.12) {
  // Place image inside (x+pad, y+0.75) with contain sizing
  const dispW = cardW - 2 * pad;
  const dispH = cardH - 0.75 - pad - 0.1;
  slide.addImage({
    path: imgPath,
    x: x + pad, y: y + 0.75,
    sizing: { type: "contain", w: dispW, h: dispH },
  });
}

// ─── Build Slide ─────────────────────────────────────────────────────────────
const pres = new pptxgen();
pres.defineLayout({ name: "POSTER", width: W, height: H });
pres.layout = "POSTER";
const slide = pres.addSlide();
slide.background = { color: "F2F5FA" };

// ════════════════════════════════════════════════════════════════════════════
// HEADER
// ════════════════════════════════════════════════════════════════════════════
slide.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:W, h:HEADER_H,
  fill:{color:C.darkNavy}, line:{color:C.darkNavy,width:0} });
// Left cyan accent bar
slide.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.38, h:HEADER_H,
  fill:{color:C.cyan}, line:{color:C.cyan,width:0} });

slide.addText("Grid-Based Quantum Annealing for Sudoku", {
  x:0.7, y:0.22, w:32, h:1.45,
  fontSize:96, bold:true, color:C.white,
  align:"left", valign:"middle", margin:0, fontFace:"Calibri",
});
slide.addText("A QUBO Formulation of Sudoku as Graph Coloring  \u2022  Benchmarked Against Classical Simulated Annealing  \u2022  D-Wave Advantage2 QPU Validation", {
  x:0.7, y:1.78, w:32, h:0.72,
  fontSize:30, color:C.cyan,
  align:"left", valign:"middle", margin:0, fontFace:"Calibri",
});
slide.addText("Jonah Minkoff", {
  x:0.7, y:2.6, w:30, h:0.6,
  fontSize:36, bold:true, color:C.white,
  align:"left", valign:"middle", margin:0, fontFace:"Calibri",
});
slide.addText("Dept. of Computer Science  \u00B7  Virginia Commonwealth University  \u00B7  minkoffjg@vcu.edu", {
  x:0.7, y:3.3, w:32, h:0.55,
  fontSize:26, color:C.mutedBlue,
  align:"left", valign:"middle", margin:0, fontFace:"Calibri",
});

// VCU badge
slide.addShape(pres.shapes.RECTANGLE, { x:34, y:0.35, w:7.5, h:3.5,
  fill:{color:C.navy}, line:{color:C.cyan,width:3} });
slide.addText("VCU", {
  x:34, y:0.55, w:7.5, h:1.5,
  fontSize:88, bold:true, color:C.white,
  align:"center", valign:"middle", margin:0, fontFace:"Calibri",
});
slide.addText("COMPUTER SCIENCE", {
  x:34, y:2.1, w:7.5, h:0.55,
  fontSize:22, bold:true, color:C.cyan,
  align:"center", charSpacing:2, margin:0,
});
slide.addText("Virginia Commonwealth University", {
  x:34, y:2.72, w:7.5, h:0.45,
  fontSize:19, color:C.mutedBlue, align:"center", margin:0,
});

// Cyan divider
slide.addShape(pres.shapes.RECTANGLE, { x:0, y:HEADER_H, w:W, h:DIVIDER_H,
  fill:{color:C.cyan}, line:{color:C.cyan,width:0} });

// ════════════════════════════════════════════════════════════════════════════
// COLUMN 1 — Introduction · QUBO Formulation · One-Hot Encoding (fig2)
// col1 heights: intro=10.0  form=11.25  fig2=8.0  gutters=2×0.2  total=29.65 ✓
// fig2 (1.881:1) at 13" wide → display h = 12.7/1.881 = 6.75" in 7.15" display area → good fit
// ════════════════════════════════════════════════════════════════════════════
const cx1 = COL_X[0];

// ── 1a. Introduction ─────────────────────────────────────────────────────────
const intro_y = BODY_Y, intro_h = 10.0;
card(slide, pres, cx1, intro_y, COL_W, intro_h);
sectionHeader(slide, "Introduction & Motivation", cx1, intro_y, COL_W);
slide.addText([
  { text: "What is Sudoku?\n",                   options: { bold: true,  fontSize: 25, breakLine: true } },
  { text: "Sudoku is a constraint satisfaction problem (CSP) modeled as graph coloring on an N\u00D7N grid: each cell receives exactly one digit 1\u2013N such that no digit repeats in any row, column, or \u221AN\u00D7\u221AN box. It encodes the same constraint structure found in scheduling, resource allocation, and combinatorial optimization.\n", options: { fontSize: 23, breakLine: true } },
  { text: "\nWhy Quantum Annealing?\n",           options: { bold: true,  fontSize: 25, breakLine: true } },
  { text: "Classical solvers (backtracking, constraint propagation, dancing links) solve 9\u00D79 in milliseconds but scale poorly as constraints densify. Quantum annealing leverages quantum tunneling to escape local energy minima \u2014 ideal for constraint-heavy landscapes where classical methods get trapped.\n", options: { fontSize: 23, breakLine: true } },
  { text: "\nGoal\n",                             options: { bold: true,  fontSize: 25, breakLine: true } },
  { text: "Derive a QUBO formulation for Sudoku from first principles, validate correctness via simulated annealing, then test on D-Wave\u2019s Leap Hybrid BQM Solver and Advantage2 QPU. Benchmark scalability from 4\u00D74 to 9\u00D79, comparing quantum and classical methods on success rate and energy.", options: { fontSize: 23 } },
], { x: cx1+0.2, y: intro_y+0.72, w: COL_W-0.35, h: intro_h-0.82,
     align:"left", valign:"top", wrap:true, autoFit:false });

// ── 1b. QUBO Formulation ──────────────────────────────────────────────────────
const form_y = intro_y + intro_h + GUTTER_V, form_h = 11.25;
card(slide, pres, cx1, form_y, COL_W, form_h, "FFFFFF");
sectionHeader(slide, "QUBO Formulation", cx1, form_y, COL_W, C.slate);

// Variable definition box
slide.addShape(pres.shapes.RECTANGLE, { x: cx1+0.2, y: form_y+0.82, w: COL_W-0.4, h: 1.3,
  fill:{color:C.lightBlueBg}, line:{color:C.cyan,width:2.5} });
slide.addText([
  { text: "Binary Variable: ", options: { bold:true, fontSize:25 } },
  { text: "x",                 options: { fontSize:25 } },
  { text: "i,j,k",             options: { fontSize:19, baseline:-10 } },
  { text: " = 1  if cell (i,j) holds digit k+1,  else 0", options: { fontSize:25 } },
], { x: cx1+0.3, y: form_y+0.92, w: COL_W-0.6, h: 0.6, align:"left", valign:"middle", margin:0 });
slide.addText("4\u00D74: 64 vars  |  9\u00D79: 729 vars  |  9\u00D79 with 30 givens: 459 free vars  (37% reduction via given-cell elimination)", {
  x: cx1+0.3, y: form_y+1.55, w: COL_W-0.6, h: 0.42,
  fontSize:20, italic:true, color:C.slate, align:"left", valign:"middle", margin:0 });

// Energy formula
slide.addText("Energy Function  \u2014  minimize to solve:", {
  x: cx1+0.2, y: form_y+2.3, w: COL_W-0.4, h: 0.48,
  fontSize:25, bold:true, color:C.bodyText, margin:0 });
slide.addText("E\u209C\u2092\u209C\u2090\u2097 = E\u2081 + E\u2082 + E\u2083 + E\u2084 = 0  \u21D2  Valid Sudoku", {
  x: cx1+0.2, y: form_y+2.85, w: COL_W-0.4, h: 0.65,
  fontSize:31, bold:true, color:C.blue, align:"center", margin:0, fontFace:"Calibri" });

// Constraint rows
const constraints = [
  { label: "E\u2081  Cell",   desc: "\u03A3\u1D62\u2C7C (\u03A3\u2096 x\u1D62\u2C7C\u2096 \u2212 1)\u00B2" },
  { label: "E\u2082  Row",    desc: "\u03A3\u1D62\u2096 (\u03A3\u2C7C x\u1D62\u2C7C\u2096 \u2212 1)\u00B2" },
  { label: "E\u2083  Column", desc: "\u03A3\u2C7C\u2096 (\u03A3\u1D62 x\u1D62\u2C7C\u2096 \u2212 1)\u00B2" },
  { label: "E\u2084  Box",    desc: "\u03A3\u0299\u2092\u02E3,\u2096 (\u03A3\u208D\u1D62,\u2C7C\u208E\u2208\u0299\u2092\u02E3 x\u1D62\u2C7C\u2096 \u2212 1)\u00B2" },
];
const descMap = ["each cell has exactly one digit", "each digit appears once per row",
                 "each digit appears once per column", "each digit appears once per \u221AN\u00D7\u221AN box"];
constraints.forEach((c, i) => {
  const cy = form_y + 3.68 + i * 1.45;
  slide.addShape(pres.shapes.RECTANGLE, { x: cx1+0.2, y: cy, w: 2.7, h: 1.32,
    fill:{color:C.navy}, line:{color:C.navy,width:0} });
  slide.addText(c.label, { x: cx1+0.2, y: cy, w: 2.7, h: 1.32,
    fontSize:22, bold:true, color:C.white, align:"center", valign:"middle", margin:0 });
  slide.addShape(pres.shapes.RECTANGLE, { x: cx1+2.92, y: cy, w: COL_W-3.12, h: 1.32,
    fill:{color:C.lightBlueBg}, line:{color:C.cardBorder,width:1} });
  slide.addText([
    { text: c.desc + "\n",   options: { fontSize:22, bold:true, breakLine:true } },
    { text: descMap[i],      options: { fontSize:20, italic:true, color:C.slate } },
  ], { x: cx1+3.1, y: cy, w: COL_W-3.32, h: 1.32, align:"left", valign:"middle", margin:0, wrap:true });
});

slide.addText("Lagrange multipliers: \u03BB\u2081=\u03BB\u2082=\u03BB\u2083=\u03BB\u2084=1.0  \u00B7  Diagonal: \u22121  \u00B7  Off-diagonal: +2  \u00B7  QUBO sparsity: 90.6% zeros", {
  x: cx1+0.2, y: form_y+11.0, w: COL_W-0.4, h: 0.35,
  fontSize:18, italic:true, color:C.slate, align:"left", valign:"middle", margin:0 });

// ── 1c. One-Hot Encoding figure (fig2, ratio 1.881) ───────────────────────────
// At 13" wide: display h = (13-0.24)/1.881 = 6.79"  card h = 6.79+0.75+0.12+0.1 = 7.76 → 8.0"
const fig2_y = form_y + form_h + GUTTER_V, fig2_h = AVAIL - intro_h - form_h - 2*GUTTER_V;  // = 8.0"
card(slide, pres, cx1, fig2_y, COL_W, fig2_h, "FFFFFF");
sectionHeader(slide, "One-Hot Encoding", cx1, fig2_y, COL_W);
fig(slide, "figures/vectorized/fig2_onehot_matrix_hires-1.png", cx1, fig2_y, COL_W, fig2_h);

// ════════════════════════════════════════════════════════════════════════════
// COLUMN 2 — Methodology · QUBO Matrix (fig4) · Variable Reduction (fig3)
// col2 heights: meth=7.0  fig4=12.7  fig3=9.55  gutters=2×0.2  total=29.65 ✓
// fig4 (1.075:1) at 13" wide → display h = 12.7/1.075 = 11.8" ✓
// fig3 (1.054:1) at 13" wide → display h = 8.8/1.054 = 8.35" wide → 8.35" within 13" ✓
// ════════════════════════════════════════════════════════════════════════════
const cx2 = COL_X[1];

// ── 2a. Methodology ───────────────────────────────────────────────────────────
const meth_y = BODY_Y, meth_h = 7.0;
card(slide, pres, cx2, meth_y, COL_W, meth_h);
sectionHeader(slide, "Methodology", cx2, meth_y, COL_W);
// D-Wave hardware image (right portion)
slide.addImage({ path: "figures/vectorized/dwave_qpu_box.jpg",
  x: cx2+7.7, y: meth_y+0.78,
  sizing: { type:"contain", w:5.1, h:5.0 } });
slide.addText("D-Wave Advantage2", {
  x: cx2+7.7, y: meth_y+5.82, w:5.1, h:0.38,
  fontSize:17, italic:true, color:C.slate, align:"center", margin:0 });
slide.addText([
  { text: "Solvers Evaluated\n", options: { bold:true, fontSize:24, breakLine:true } },
  { text: "\u2022 Simulated Annealing (D-Wave neal)\n  100 reads, 1000 sweeps\n", options: { fontSize:21, breakLine:true } },
  { text: "\u2022 D-Wave Leap Hybrid BQM v2.2\n  9-second time limit\n", options: { fontSize:21, breakLine:true } },
  { text: "\u2022 D-Wave Advantage2 QPU\n  1,000 reads \u00B7 200 \u00B5s \u00B7 forward annealing\n", options: { fontSize:21, breakLine:true } },
  { text: "\u2022 QAOA (Qiskit) \u2014 2\u00D72 only\n  p=2, 2048 shots, COBYLA\n\n", options: { fontSize:21, breakLine:true } },
  { text: "Test Cases\n", options: { bold:true, fontSize:24, breakLine:true } },
  { text: "\u2022 4\u00D74 blank (64 vars) \u2014 correctness baseline\n", options: { fontSize:21, breakLine:true } },
  { text: "\u2022 9\u00D79 Easy   30 givens \u2192 459 vars\n", options: { fontSize:21, breakLine:true } },
  { text: "\u2022 9\u00D79 Medium  25 givens \u2192 504 vars\n", options: { fontSize:21, breakLine:true } },
  { text: "\u2022 9\u00D79 Hard    17 givens \u2192 576 vars", options: { fontSize:21 } },
], { x: cx2+0.2, y: meth_y+0.72, w: 7.3, h: meth_h-0.85,
     align:"left", valign:"top", wrap:true, autoFit:false });

// ── 2b. QUBO Matrix figure (fig4, ratio 1.075) ────────────────────────────────
// Optimal height: (13-0.24)/1.075 + 0.75+0.24 = 11.87+0.99 = 12.86 → use 12.7"
const fig4_y = meth_y + meth_h + GUTTER_V, fig4_h = 12.7;
card(slide, pres, cx2, fig4_y, COL_W, fig4_h, "FFFFFF");
sectionHeader(slide, "QUBO Coefficient Matrix (4\u00D74 Sudoku, 64\u00D764)", cx2, fig4_y, COL_W);
fig(slide, "figures/vectorized/fig4_qubo_matrix_hires-1.png", cx2, fig4_y, COL_W, fig4_h);

// ── 2c. Variable Reduction figure (fig3, ratio 1.054) ─────────────────────────
const fig3_y = fig4_y + fig4_h + GUTTER_V;
const fig3_h = AVAIL - meth_h - fig4_h - 2*GUTTER_V;   // = 9.55"
card(slide, pres, cx2, fig3_y, COL_W, fig3_h, "FFFFFF");
sectionHeader(slide, "Variable Reduction via Given-Cell Elimination", cx2, fig3_y, COL_W);
fig(slide, "figures/vectorized/fig3_compression_hires-1.png", cx2, fig3_y, COL_W, fig3_h);

// ════════════════════════════════════════════════════════════════════════════
// COLUMN 3 — Test Puzzles (fig1) · Results Table (fig5) · Observations · Conclusions
// col3 heights: fig1=7.0  fig5=6.0  obs=7.0  conc=9.45  gutters=3×0.2  total=29.65 ✓
// fig1 (2.191:1) at 13": display h = 12.7/2.191 = 5.80" in 6.15" area ✓
// fig5 (2.387:1) at 13": display h = 12.7/2.387 = 5.32" in 5.15" area → height-limited; width = 5.15×2.387=12.3" ✓
// ════════════════════════════════════════════════════════════════════════════
const cx3 = COL_X[2];

// ── 3a. Test Puzzles figure (fig1, ratio 2.191) ───────────────────────────────
const fig1_y = BODY_Y, fig1_h = 7.0;
card(slide, pres, cx3, fig1_y, COL_W, fig1_h, "FFFFFF");
sectionHeader(slide, "Sudoku Test Puzzles", cx3, fig1_y, COL_W);
fig(slide, "figures/vectorized/fig1_sudoku_puzzles_hires-1.png", cx3, fig1_y, COL_W, fig1_h);

// ── 3b. Results table figure (fig5, ratio 2.387) ─────────────────────────────
const fig5_y = fig1_y + fig1_h + GUTTER_V, fig5_h = 6.0;
card(slide, pres, cx3, fig5_y, COL_W, fig5_h, "FFFFFF");
sectionHeader(slide, "Results: D-Wave QPU vs. Simulated Annealing", cx3, fig5_y, COL_W);
fig(slide, "figures/vectorized/fig5_comparison_table_hires-1.png", cx3, fig5_y, COL_W, fig5_h);

// ── 3c. Key Observations ─────────────────────────────────────────────────────
const obs_y = fig5_y + fig5_h + GUTTER_V, obs_h = 7.0;
card(slide, pres, cx3, obs_y, COL_W, obs_h);
sectionHeader(slide, "Key Observations", cx3, obs_y, COL_W, C.slate);

const obsItems = [
  { icon: "\u2705", color: C.green,   text: "SA: 99% success on 4\u00D74 (64 vars) but 6%/0%/0% on 9\u00D79 Easy/Medium/Hard \u2014 a 14\u00D7 variable-density increase collapses classical performance." },
  { icon: "\u26A1", color: C.blue,    text: "Quantum tunneling advantage confirmed: D-Wave Hybrid solved Medium where all 100 SA runs failed, achieving E\u00A0=\u00A00 on a single attempt." },
  { icon: "\u2714", color: C.blue,    text: "Advantage2 QPU: 100% on Easy \u00B7 99.4% on Medium \u00B7 76.1% \u00B1\u200A12.7% on Hard \u2014 embedding complexity limits hard instances." },
  { icon: "\u26A0", color: C.red,     text: "Both solvers failed on 17-clue Sudoku (E\u00A0=\u00A04): extreme constraint sparsity creates energy landscapes beyond current hardware." },
  { icon: "\u23F1", color: C.slate,   text: "Hybrid averaged 1.72s vs. SA\u2019s 1.96s \u2014 no quantum overhead penalty at this scale." },
];
obsItems.forEach((o, i) => {
  const oy = obs_y + 0.78 + i * 1.24;
  slide.addText(o.icon, { x: cx3+0.22, y: oy, w: 0.55, h: 1.1,
    fontSize:28, color:o.color, align:"center", valign:"middle", margin:0 });
  slide.addText(o.text, { x: cx3+0.82, y: oy, w: COL_W-1.05, h: 1.1,
    fontSize:21, color:C.bodyText, align:"left", valign:"middle", wrap:true, margin:0 });
});

// ── 3d. Conclusions & Future Work ─────────────────────────────────────────────
const conc_y = obs_y + obs_h + GUTTER_V;
const conc_h = AVAIL - fig1_h - fig5_h - obs_h - 3*GUTTER_V;  // = 9.45"
card(slide, pres, cx3, conc_y, COL_W, conc_h, C.lightBlueBg);
sectionHeader(slide, "Conclusions & Future Work", cx3, conc_y, COL_W, C.navy);
slide.addText([
  { text: "\u2022 QUBO correctly encodes all four Sudoku constraints; E\u00A0=\u00A00 guarantees a valid solution.\n", options: { fontSize:22, breakLine:true } },
  { text: "\u2022 D-Wave Hybrid BQM Solver solved 2/3 test puzzles vs. SA\u2019s 1/3 \u2014 practical quantum advantage demonstrated.\n", options: { fontSize:22, breakLine:true } },
  { text: "\u2022 Advantage2 QPU matches SA on easy instances; embedding limits emerge on harder ones.\n", options: { fontSize:22, breakLine:true } },
  { text: "\u2022 Given-cell elimination is essential: 37% variable reduction (729\u2192459 vars) on 9\u00D79 Easy.\n", options: { fontSize:22, breakLine:true } },
  { text: "\u2022 Execution times are competitive: hybrid 1.72s vs. SA 1.96s \u2014 quantum overhead is not a barrier.\n\n", options: { fontSize:22, breakLine:true } },
  { text: "Future Directions\n", options: { bold:true, fontSize:24, breakLine:true } },
  { text: "\u2022 Penalty weight optimization per constraint type (\u03BB\u2081\u2026\u03BB\u2084 tuning)\n", options: { fontSize:22, breakLine:true } },
  { text: "\u2022 Domain-wall encoding to further reduce variable count\n", options: { fontSize:22, breakLine:true } },
  { text: "\u2022 Direct Advantage QPU access for full 9\u00D79 benchmarks\n", options: { fontSize:22, breakLine:true } },
  { text: "\u2022 Systematic benchmarking across full puzzle difficulty distributions", options: { fontSize:22 } },
], { x: cx3+0.2, y: conc_y+0.78, w: COL_W-0.35, h: conc_h-0.88,
     align:"left", valign:"top", wrap:true, autoFit:false });

// ════════════════════════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════════════════════════
const FOOTER_H = H - FOOTER_Y;
slide.addShape(pres.shapes.RECTANGLE, { x:0, y:FOOTER_Y, w:W, h:FOOTER_H,
  fill:{color:C.navy}, line:{color:C.navy,width:0} });
slide.addShape(pres.shapes.RECTANGLE, { x:0, y:FOOTER_Y, w:W, h:0.1,
  fill:{color:C.cyan}, line:{color:C.cyan,width:0} });

// Special Thanks — centered, full width minus QR space
slide.addText([
  { text: "Special Thanks:  ", options: { bold:true, color:C.cyan, fontSize:26 } },
  { text: "Prof. Thang Dinh, Dept. of Computer Science, Virginia Commonwealth University \u2014 for guidance, resources, and D-Wave hardware access.", options: { color:C.white, fontSize:26 } },
], { x:0.6, y:FOOTER_Y+0.1, w:W-3.5, h:FOOTER_H-0.2,
     align:"left", valign:"middle", margin:0, wrap:true });

// QR code — large, right-aligned
slide.addImage({ path: "figures/vectorized/qr_code.png",
  x: W-2.2, y: FOOTER_Y+0.1, w:1.9, h:1.9 });

// ─── Write ────────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "quantum_sudoku_poster_v2.pptx" })
  .then(() => console.log("\u2705  quantum_sudoku_poster_v2.pptx written"))
  .catch(err => { console.error("\u274C", err); process.exit(1); });
