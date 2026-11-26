/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { s as t } from "./intl.js";
import { p as l, m as _, d as $ } from "./floating-ui.js";
import { d as a } from "./resources15.js";
import { j as n } from "./time.js";
const s = ["inline-start", "inline-end", "block-start", "block-end"], o = ["start", "end", "top", "bottom"], i = ["s", "m", "l"], u = ["slow", "medium", "fast"], c = ["start", "center", "end"], d = ["solid", "outline", "outline-fill", "transparent"], r = ["invalid", "valid", "idle"], p = ["brand", "danger", "info", "inverse", "neutral", "warning", "success"], f = ["last", "next", "immediate"], v = ["auto", "half", "full"], m = [
  "single",
  "none",
  "children",
  "single-persist",
  "multichildren",
  "ancestors",
  "multiple"
], V = ["inline", "edge", "none"], O = ["bottom", "top"], g = ["float", "overlay"], h = ["button", "switch"], y = [
  "horizontal",
  "vertical",
  "grid",
  "inline",
  "center",
  "auto",
  "fixed",
  "none",
  "horizontal-single"
], b = ["arab", "arabext", "latn"], P = ["ltr", "rtl"], T = ["interactive", "static"], S = ["chevron", "caret", "ellipsis", "overflow", "plus-minus"], w = ["determinate", "determinate-value", "indeterminate"], x = ["single", "range"], M = ["percent", "units"], L = ["click", "hover"], k = ["down", "up"], D = [
  "text",
  "textarea",
  "email",
  "password",
  "tel",
  "number",
  "search",
  "file",
  "time",
  "date"
], A = ["offset", "name"], F = ["icon", "border", "neutral", "highlight"], W = ["absolute", "fixed"], z = ["dock", "float-content", "overlay"], N = [1, 2], q = [
  "auto",
  "hex",
  "hexa",
  "rgb-css",
  "rgba-css",
  "hsl-css",
  "hsla-css",
  "rgb",
  "rgba",
  "hsl",
  "hsla",
  "hsv",
  "hsva"
], C = ["12", "14", "16", "18", "20", "24", "32"], H = ["300", "400", "500", "700"], Y = [1, 2, 3, 4, 5, 6], ee = ["", ...Y], e = ["horizontal", "vertical"], Z = [
  e[1],
  e[0],
  "columns"
], j = ["block", "inline", "inline-space-between"], B = ["flat", "nested"], E = ["wide", "abbreviated"], I = ["", "arab", "latn"], R = ["none", "top"], U = ["all", "none", "single"], G = ["leading-start", "leading-end", "trailing-start", "trailing-end"], J = ["hard", "soft"], K = ["icon", "highlight"], Q = [
  "none",
  "single",
  "multiple"
], X = ["user", "utc", "gmt"], se = {
  alignment: {
    values: c,
    defaultValue: c[0]
  },
  appearance: {
    values: d,
    defaultValue: d[0]
  },
  duration: {
    values: u,
    defaultValue: u[1]
  },
  logicalFlowPosition: {
    values: s,
    defaultValue: s[2]
  },
  position: {
    values: o,
    defaultValue: o[0]
  },
  scale: {
    values: i,
    defaultValue: i[1]
  },
  status: {
    values: r,
    defaultValue: r[2]
  },
  kind: {
    values: p,
    defaultValue: p[0]
  },
  queue: {
    values: f,
    defaultValue: f[0]
  },
  width: {
    values: v,
    defaultValue: v[0]
  },
  selectionMode: {
    values: m,
    defaultValue: m[6]
  },
  arrowType: {
    values: V,
    defaultValue: V[0]
  },
  paginationPosition: {
    values: O,
    defaultValue: O[0]
  },
  placement: {
    values: [...l],
    defaultValue: l[0]
  },
  menuPlacement: {
    values: _,
    defaultValue: $
  },
  dialogPlacement: {
    values: a,
    defaultValue: a[7]
  },
  supportedNlsLocale: {
    values: [...t],
    defaultValue: [...t][0]
  },
  hourFormat: {
    values: n,
    defaultValue: n[0]
  },
  displayMode: {
    values: g,
    defaultValue: g[0]
  },
  toggleDisplay: {
    values: h,
    defaultValue: h[0]
  },
  layout: {
    values: y,
    defaultValue: y[0]
  },
  dir: {
    values: P,
    defaultValue: P[0]
  },
  interactionMode: {
    values: T,
    defaultValue: T[0]
  },
  iconType: {
    values: S,
    defaultValue: S[0]
  },
  determinateType: {
    values: w,
    defaultValue: w[0]
  },
  fillType: {
    values: x,
    defaultValue: x[1]
  },
  labelType: {
    values: M,
    defaultValue: M[0]
  },
  clickType: {
    values: L,
    defaultValue: L[0]
  },
  collapseDirection: {
    values: k,
    defaultValue: k[0]
  },
  textType: {
    values: D,
    defaultValue: D[0]
  },
  mode: {
    values: A,
    defaultValue: A[0]
  },
  overlayPositioning: {
    values: W,
    defaultValue: W[0]
  },
  selectionAppearance: {
    values: F,
    defaultValue: F[0]
  },
  shellDisplayMode: {
    values: z,
    defaultValue: z[0]
  },
  numberingSystem: {
    values: b,
    defaultValue: b[2]
  },
  calendarCount: {
    values: N,
    defaultValue: N[1]
  },
  colorPickerFormat: {
    values: q,
    defaultValue: q[0]
  },
  fontSize: {
    values: C,
    defaultValue: C[2]
  },
  fontWeight: {
    values: H,
    defaultValue: H[1]
  },
  headingLevel: {
    values: Y
  },
  headingLevelWithNone: {
    values: ee
  },
  fieldLayout: {
    values: Z,
    defaultValue: Z[0]
  },
  horizontalVerticalLayout: {
    values: e,
    defaultValue: e[0]
  },
  labelLayout: {
    values: j,
    defaultValue: j[0]
  },
  listDisplayMode: {
    values: B,
    defaultValue: B[0]
  },
  monthStyle: {
    values: E,
    defaultValue: E[0]
  },
  numberingSystemWithNone: {
    values: I,
    defaultValue: I[0]
  },
  selectionDisplay: {
    values: R,
    defaultValue: R[1]
  },
  sliderFillPlacement: {
    values: U,
    defaultValue: U[0]
  },
  sortHandlePlacement: {
    values: G,
    defaultValue: G[0]
  },
  textAreaWrap: {
    values: J,
    defaultValue: J[1]
  },
  tileSelectionAppearance: {
    values: K,
    defaultValue: K[0]
  },
  tileSelectionMode: {
    values: Q,
    defaultValue: Q[0]
  },
  timeZoneOffsetStyle: {
    values: X,
    defaultValue: X[0]
  }
};
export {
  se as A
};
