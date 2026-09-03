/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { p as e, m as Y, d as _ } from "./floating-ui.js";
import { d as t } from "./resources15.js";
import { s as l } from "./utils2.js";
import { j as a } from "./time.js";
const n = ["inline-start", "inline-end", "block-start", "block-end"], s = ["start", "end", "top", "bottom"], o = ["s", "m", "l"], i = ["slow", "medium", "fast"], u = ["start", "center", "end"], c = ["solid", "outline", "outline-fill", "transparent"], d = ["invalid", "valid", "idle"], r = ["brand", "danger", "info", "inverse", "neutral", "warning", "success"], p = ["last", "next", "immediate"], f = ["auto", "half", "full"], v = [
  "single",
  "none",
  "children",
  "single-persist",
  "multichildren",
  "ancestors",
  "multiple"
], m = ["inline", "edge", "none"], V = ["bottom", "top"], O = ["float", "overlay"], g = ["button", "switch"], h = [
  "horizontal",
  "vertical",
  "grid",
  "inline",
  "center",
  "auto",
  "fixed",
  "none",
  "horizontal-single"
], y = ["arab", "arabext", "latn"], b = ["ltr", "rtl"], P = ["interactive", "static"], T = ["chevron", "caret", "ellipsis", "overflow", "plus-minus"], S = ["determinate", "indeterminate"], w = ["single", "range"], x = ["percent", "units"], M = ["click", "hover"], k = ["down", "up"], D = [
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
], L = ["offset", "name"], A = ["icon", "border", "neutral", "highlight"], F = ["absolute", "fixed"], W = ["dock", "float", "overlay"], z = [1, 2], N = [
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
], q = ["12", "14", "16", "18", "20", "24", "32"], C = ["300", "400", "500", "700"], X = [1, 2, 3, 4, 5, 6], $ = ["", ...X], H = ["horizontal", "vertical"], Z = ["default", "block", "inline", "inline-space-between"], j = ["flat", "nested"], B = ["wide", "abbreviated"], E = ["", "arab", "latn"], I = ["none", "top"], R = ["all", "none", "single"], U = ["leading-start", "leading-end", "trailing-start", "trailing-end"], G = ["hard", "soft"], J = ["icon", "highlight"], K = [
  "none",
  "single",
  "multiple"
], Q = ["user", "utc", "gmt"], ne = {
  alignment: {
    values: u,
    defaultValue: u[0]
  },
  appearance: {
    values: c,
    defaultValue: c[0]
  },
  duration: {
    values: i,
    defaultValue: i[1]
  },
  logicalFlowPosition: {
    values: n,
    defaultValue: n[2]
  },
  position: {
    values: s,
    defaultValue: s[0]
  },
  scale: {
    values: o,
    defaultValue: o[1]
  },
  status: {
    values: d,
    defaultValue: d[2]
  },
  kind: {
    values: r,
    defaultValue: r[0]
  },
  queue: {
    values: p,
    defaultValue: p[0]
  },
  width: {
    values: f,
    defaultValue: f[0]
  },
  selectionMode: {
    values: v,
    defaultValue: v[6]
  },
  arrowType: {
    values: m,
    defaultValue: m[0]
  },
  paginationPosition: {
    values: V,
    defaultValue: V[0]
  },
  placement: {
    values: [...e],
    defaultValue: e[0]
  },
  menuPlacement: {
    values: Y,
    defaultValue: _
  },
  dialogPlacement: {
    values: t,
    defaultValue: t[7]
  },
  supportedNlsLocale: {
    values: l,
    defaultValue: l[0]
  },
  hourFormat: {
    values: a,
    defaultValue: a[0]
  },
  displayMode: {
    values: O,
    defaultValue: O[0]
  },
  toggleDisplay: {
    values: g,
    defaultValue: g[0]
  },
  layout: {
    values: h,
    defaultValue: h[0]
  },
  dir: {
    values: b,
    defaultValue: b[0]
  },
  interactionMode: {
    values: P,
    defaultValue: P[0]
  },
  iconType: {
    values: T,
    defaultValue: T[0]
  },
  determinateType: {
    values: S,
    defaultValue: S[0]
  },
  fillType: {
    values: w,
    defaultValue: w[1]
  },
  labelType: {
    values: x,
    defaultValue: x[0]
  },
  clickType: {
    values: M,
    defaultValue: M[0]
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
    values: L,
    defaultValue: L[0]
  },
  overlayPositioning: {
    values: F,
    defaultValue: F[0]
  },
  selectionAppearance: {
    values: A,
    defaultValue: A[0]
  },
  shellDisplayMode: {
    values: W,
    defaultValue: W[0]
  },
  numberingSystem: {
    values: y,
    defaultValue: y[2]
  },
  calendarCount: {
    values: z,
    defaultValue: z[1]
  },
  colorPickerFormat: {
    values: N,
    defaultValue: N[0]
  },
  fontSize: {
    values: q,
    defaultValue: q[2]
  },
  fontWeight: {
    values: C,
    defaultValue: C[1]
  },
  headingLevel: {
    values: X
  },
  headingLevelWithNone: {
    values: $
  },
  horizontalVerticalLayout: {
    values: H,
    defaultValue: H[0]
  },
  labelLayout: {
    values: Z,
    defaultValue: Z[1]
  },
  listDisplayMode: {
    values: j,
    defaultValue: j[0]
  },
  monthStyle: {
    values: B,
    defaultValue: B[0]
  },
  numberingSystemWithNone: {
    values: E,
    defaultValue: E[0]
  },
  selectionDisplay: {
    values: I,
    defaultValue: I[1]
  },
  sliderFillPlacement: {
    values: R,
    defaultValue: R[0]
  },
  sortHandlePlacement: {
    values: U,
    defaultValue: U[0]
  },
  textAreaWrap: {
    values: G,
    defaultValue: G[1]
  },
  tileSelectionAppearance: {
    values: J,
    defaultValue: J[0]
  },
  tileSelectionMode: {
    values: K,
    defaultValue: K[0]
  },
  timeZoneOffsetStyle: {
    values: Q,
    defaultValue: Q[0]
  }
};
export {
  ne as A
};
