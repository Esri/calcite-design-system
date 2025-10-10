import { l as g } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const s = /* @__PURE__ */ new Set(), d = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 4,
  error: 8,
  off: 10
};
function p(e) {
  return d[e] >= d[g];
}
function r(e, ...n) {
  if (!p(e))
    return;
  console[e].call(this, "%ccalcite", "background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;", ...n);
}
let a;
const m = {
  debug: (e) => r("debug", e),
  info: (e) => r("info", e),
  warn: (e) => r("warn", e),
  error: (e) => r("error", e),
  trace: (e) => r("trace", e),
  deprecated: $
};
function $(e, { component: n, name: t, suggested: o, removalVersion: i }) {
  const l = `${e}:${e === "component" ? "" : n}${t}`;
  if (s.has(l))
    return;
  s.add(l);
  const c = Array.isArray(o);
  c && !a && (a = new Intl.ListFormat("en", { style: "long", type: "disjunction" }));
  const f = `[${t}] ${e} is deprecated and will be removed in ${i === "future" ? "a future version" : `v${i}`}.${o ? ` Use ${c ? a.format(o.map((u) => `"${u}"`)) : `"${o}"`} instead.` : ""}`;
  r("warn", f);
}
export {
  m as l
};
