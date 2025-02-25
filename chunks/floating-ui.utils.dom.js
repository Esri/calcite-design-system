/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
function c() {
  return typeof window < "u";
}
function u(n) {
  return p(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function i(n) {
  var t;
  return (n == null || (t = n.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function E(n) {
  var t;
  return (t = (p(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : t.documentElement;
}
function p(n) {
  return c() ? n instanceof Node || n instanceof i(n).Node : !1;
}
function m(n) {
  return c() ? n instanceof Element || n instanceof i(n).Element : !1;
}
function w(n) {
  return c() ? n instanceof HTMLElement || n instanceof i(n).HTMLElement : !1;
}
function f(n) {
  return !c() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof i(n).ShadowRoot;
}
function y(n) {
  const {
    overflow: t,
    overflowX: e,
    overflowY: o,
    display: r
  } = b(n);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + e) && !["inline", "contents"].includes(r);
}
function v(n) {
  return ["table", "td", "th"].includes(u(n));
}
function N(n) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return n.matches(t);
    } catch {
      return !1;
    }
  });
}
function T(n) {
  const t = L(), e = m(n) ? b(n) : n;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((o) => e[o] ? e[o] !== "none" : !1) || (e.containerType ? e.containerType !== "normal" : !1) || !t && (e.backdropFilter ? e.backdropFilter !== "none" : !1) || !t && (e.filter ? e.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((o) => (e.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (e.contain || "").includes(o));
}
function D(n) {
  let t = l(n);
  for (; w(t) && !g(t); ) {
    if (T(t))
      return t;
    if (N(t))
      return null;
    t = l(t);
  }
  return null;
}
function L() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function g(n) {
  return ["html", "body", "#document"].includes(u(n));
}
function b(n) {
  return i(n).getComputedStyle(n);
}
function C(n) {
  return m(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function l(n) {
  if (u(n) === "html")
    return n;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    f(n) && n.host || // Fallback.
    E(n)
  );
  return f(t) ? t.host : t;
}
function h(n) {
  const t = l(n);
  return g(t) ? n.ownerDocument ? n.ownerDocument.body : n.body : w(t) && y(t) ? t : h(t);
}
function d(n, t, e) {
  var o;
  t === void 0 && (t = []), e === void 0 && (e = !0);
  const r = h(n), S = r === ((o = n.ownerDocument) == null ? void 0 : o.body), s = i(r);
  if (S) {
    const a = k(s);
    return t.concat(s, s.visualViewport || [], y(r) ? r : [], a && e ? d(a) : []);
  }
  return t.concat(r, d(r, [], e));
}
function k(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
export {
  d as a,
  E as b,
  i as c,
  k as d,
  b as e,
  w as f,
  h as g,
  N as h,
  m as i,
  l as j,
  g as k,
  v as l,
  T as m,
  D as n,
  u as o,
  y as p,
  C as q,
  L as r
};
