import { q as k, c as m, i as w } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const h = "calciteInternalLabelClick", E = "calciteInternalLabelConnected", f = "calciteInternalLabelDisconnected", L = "calcite-label", i = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new Set(), y = (e) => {
  const { id: t } = e, l = t && k(e, { selector: `${L}[for="${t}"]` });
  if (l)
    return l;
  const a = m(e, L);
  return !a || // labelable components within other custom elements are not considered labelable
  M(a, e) ? null : a;
};
function M(e, t) {
  let l;
  const a = "custom-element-ancestor-check", b = (n) => {
    n.stopImmediatePropagation();
    const u = n.composedPath();
    l = u.slice(u.indexOf(t), u.indexOf(e));
  };
  return e.addEventListener(a, b, { once: !0 }), t.dispatchEvent(new CustomEvent(a, { composed: !0, bubbles: !0 })), e.removeEventListener(a, b), l.filter((n) => n !== t && n !== e).filter((n) => n.tagName?.includes("-")).length > 0;
}
function v(e) {
  if (!e)
    return;
  const t = y(e.el);
  if (r.has(t) && t === e.labelEl || !t && s.has(e))
    return;
  const l = O.bind(e);
  if (t) {
    e.labelEl = t;
    const a = i.get(t) || [];
    a.push(e), i.set(t, a.sort(g)), r.has(e.labelEl) || (r.set(e.labelEl, C), e.labelEl.addEventListener(h, C)), s.delete(e), document.removeEventListener(E, c.get(e)), d.set(e, l), document.addEventListener(f, l);
  } else s.has(e) || (l(), document.removeEventListener(f, d.get(e)));
}
function T(e) {
  if (!e || (s.delete(e), document.removeEventListener(E, c.get(e)), document.removeEventListener(f, d.get(e)), c.delete(e), d.delete(e), !e.labelEl))
    return;
  const t = i.get(e.labelEl);
  t.length === 1 && (e.labelEl.removeEventListener(h, r.get(e.labelEl)), r.delete(e.labelEl)), i.set(
    e.labelEl,
    t.filter((l) => l !== e).sort(g)
  ), e.labelEl = null;
}
function g(e, t) {
  return w(e.el, t.el) ? -1 : 1;
}
function I(e) {
  return e.label || e.labelEl?.textContent?.trim() || "";
}
function C(e) {
  const t = e.detail.sourceEvent.target, l = i.get(this), a = l.find((n) => n.el === t);
  if (l.includes(a))
    return;
  const o = l[0];
  o.disabled || o.onLabelClick(e);
}
function D() {
  s.has(this) && v(this);
}
function O() {
  s.add(this);
  const e = c.get(this) || D.bind(this);
  c.set(this, e), document.addEventListener(E, e);
}
async function B(e) {
  if (await e.componentOnReady(), i.has(e))
    return;
  const l = e.ownerDocument?.getElementById(e.for);
  l && requestAnimationFrame(() => {
    for (const a of s)
      if (a.el === l) {
        v(a);
        break;
      }
  });
}
export {
  B as a,
  f as b,
  v as c,
  T as d,
  I as g,
  E as l
};
