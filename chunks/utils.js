/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import "./index.js";
import { n as u } from "./dom.js";
import { A as s, C as f, a } from "./resources13.js";
function h(e) {
  const r = e.parentElement?.closest(s), t = r?.parentElement?.closest(s);
  return [r, t].filter((n) => !!n);
}
function p(e) {
  return e.ancestors?.filter((r) => r.nodeName === "CALCITE-COMBOBOX-ITEM") || [];
}
function b(e) {
  return u(e.querySelectorAll("calcite-combobox-item"));
}
function C(e) {
  return u(e.querySelectorAll("calcite-combobox-item")).filter((t) => t.selected).length > 0;
}
function A(e) {
  const r = document.evaluate(
    "ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",
    e,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  ), t = r.snapshotLength;
  if (t > 0 && e.nodeName === f) {
    for (let n = 0; n < t; n++)
      if (r.snapshotItem(n).nodeName === a)
        return t;
  } else if (e.nodeName === a)
    return t;
  return t + 1;
}
function E(e) {
  return e.includes("single");
}
function O(e) {
  return e.shortHeading || e.heading;
}
function S(e, r) {
  if (e.length < 2 || r.length === 0)
    return e;
  const t = new Map(r.map((n, o) => [n, o]));
  return [...e].sort((n, o) => {
    const i = t.get(n), c = t.get(o);
    return i !== void 0 && c !== void 0 ? i - c : i !== void 0 ? -1 : c !== void 0 ? 1 : 0;
  });
}
function l(e, r) {
  const t = e.get(r) ?? 0;
  return t === 0 ? !1 : (t === 1 ? e.delete(r) : e.set(r, t - 1), !0);
}
function x(e, r) {
  if (e.length < 2 || r.length === 0)
    return e;
  const t = /* @__PURE__ */ new Map();
  e.forEach((o) => {
    t.set(o, (t.get(o) ?? 0) + 1);
  });
  const n = r.filter((o) => l(t, o));
  return n.length === 0 ? e : (e.forEach((o) => {
    l(t, o) && n.push(o);
  }), n);
}
export {
  S as a,
  p as b,
  b as c,
  h as d,
  A as e,
  O as g,
  C as h,
  E as i,
  x as o
};
