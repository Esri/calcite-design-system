/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const e = ["inline-start", "inline-end", "block-start", "block-end"], t = ["start", "end", "top", "bottom"], l = ["s", "m", "l"], a = ["slow", "medium", "fast"], n = ["start", "center", "end"], s = ["solid", "outline", "outline-fill", "transparent"], o = ["invalid", "valid", "idle"], i = ["brand", "danger", "info", "inverse", "neutral", "warning", "success"], u = ["last", "next", "immediate"], c = ["auto", "half", "full"], d = [
  "single",
  "none",
  "children",
  "single-persist",
  "multichildren",
  "ancestors",
  "multiple"
], p = ["inline", "edge", "none"], r = ["float", "overlay"], f = ["button", "switch"], v = [
  "horizontal",
  "vertical",
  "grid",
  "inline",
  "center",
  "auto",
  "fixed",
  "none",
  "horizontal-single"
], y = ["arab", "arabext", "latn"], V = ["ltr", "rtl"], O = ["radio", "checkbox"], m = ["interactive", "static"], g = ["chevron", "caret", "ellipsis", "overflow", "plus-minus"], T = ["determinate", "indeterminate"], b = ["single", "range"], h = ["percent", "units"], w = ["click", "hover"], x = ["down", "up"], k = [
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
], M = ["offset", "name"], D = ["icon", "border", "neutral", "highlight"], A = ["absolute", "fixed"], P = ["dock", "float", "overlay"], S = {
  alignment: {
    values: n,
    defaultValue: n[0]
  },
  appearance: {
    values: s,
    defaultValue: s[0]
  },
  duration: {
    values: a,
    defaultValue: a[1]
  },
  logicalFlowPosition: {
    values: e,
    defaultValue: e[2]
  },
  position: {
    values: t,
    defaultValue: t[0]
  },
  scale: {
    values: l,
    defaultValue: l[1]
  },
  status: {
    values: o,
    defaultValue: o[2]
  },
  kind: {
    values: i,
    defaultValue: i[0]
  },
  queue: {
    values: u,
    defaultValue: u[0]
  },
  width: {
    values: c,
    defaultValue: c[0]
  },
  selectionMode: {
    values: d,
    defaultValue: d[6]
  },
  arrowType: {
    values: p,
    defaultValue: p[0]
  },
  displayMode: {
    values: r,
    defaultValue: r[0]
  },
  toggleDisplay: {
    values: f,
    defaultValue: f[0]
  },
  layout: {
    values: v,
    defaultValue: v[0]
  },
  dir: {
    values: V,
    defaultValue: V[0]
  },
  buttonType: {
    values: O,
    defaultValue: O[0]
  },
  interactionMode: {
    values: m,
    defaultValue: m[0]
  },
  iconType: {
    values: g,
    defaultValue: g[0]
  },
  determinateType: {
    values: T,
    defaultValue: T[0]
  },
  fillType: {
    values: b,
    defaultValue: b[1]
  },
  labelType: {
    values: h,
    defaultValue: h[0]
  },
  clickType: {
    values: w,
    defaultValue: w[0]
  },
  collapseDirection: {
    values: x,
    defaultValue: x[0]
  },
  textType: {
    values: k,
    defaultValue: k[0]
  },
  mode: {
    values: M,
    defaultValue: M[0]
  },
  overlayPositioning: {
    values: A,
    defaultValue: A[0]
  },
  selectionAppearance: {
    values: D,
    defaultValue: D[0]
  },
  shellDisplayMode: {
    values: P,
    defaultValue: P[0]
  },
  numberingSystem: {
    values: y,
    defaultValue: y[2]
  }
};
export {
  S as A
};
