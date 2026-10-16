/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as k } from "./index2.js";
import { q as m, c as w, i as y } from "./dom.js";
const W = k((e, t) => {
  t.onConnected(() => {
    L(e);
  }), t.onDisconnected(() => {
    O(e);
  });
}), v = "calciteInternalLabelClick", E = "calciteInternalLabelConnected", f = "calciteInternalLabelDisconnected", C = "calcite-label", i = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new Set(), D = (e) => {
  const { id: t } = e, l = t && m(e, { selector: `${C}[for="${t}"]` });
  if (l)
    return l;
  const a = w(e, C);
  return !a || // labelable components within other custom elements are not considered labelable
  M(a, e) ? null : a;
};
function M(e, t) {
  let l;
  const a = "custom-element-ancestor-check", d = ((n) => {
    n.stopImmediatePropagation();
    const u = n.composedPath();
    l = u.slice(u.indexOf(t), u.indexOf(e));
  });
  return e.addEventListener(a, d, { once: !0 }), t.dispatchEvent(new CustomEvent(a, { composed: !0, bubbles: !0 })), e.removeEventListener(a, d), l.filter((n) => n !== t && n !== e).filter((n) => n.tagName?.includes("-")).length > 0;
}
function L(e) {
  if (!e)
    return;
  const t = D(e.el);
  if (t && r.has(t) && t === e.labelEl || !t && s.has(e))
    return;
  const l = T.bind(e);
  if (t) {
    e.labelEl = t;
    const a = i.get(t) || [];
    a.push(e), i.set(t, a.sort(g)), r.has(e.labelEl) || (r.set(e.labelEl, h), e.labelEl.addEventListener(v, h)), s.delete(e), document.removeEventListener(E, c.get(e)), o.set(e, l), document.addEventListener(f, l);
  } else s.has(e) || (l(), document.removeEventListener(f, o.get(e)));
}
function O(e) {
  if (!e || (s.delete(e), document.removeEventListener(E, c.get(e)), document.removeEventListener(f, o.get(e)), c.delete(e), o.delete(e), !e.labelEl))
    return;
  const t = i.get(e.labelEl);
  t.length === 1 && (e.labelEl.removeEventListener(v, r.get(e.labelEl)), r.delete(e.labelEl)), i.set(
    e.labelEl,
    t.filter((l) => l !== e).sort(g)
  ), e.labelEl = void 0;
}
function g(e, t) {
  return y(e.el, t.el) ? -1 : 1;
}
function h(e) {
  const t = e.detail.sourceEvent.target, l = i.get(this), a = l.find((n) => n.el === t);
  if (a && l.includes(a))
    return;
  const b = l[0];
  b.disabled || b.onLabelClick(e);
}
function I() {
  s.has(this) && L(this);
}
function T() {
  s.add(this);
  const e = c.get(this) || I.bind(this);
  c.set(this, e), document.addEventListener(E, e);
}
async function q(e) {
  if (await e.componentOnReady(), i.has(e))
    return;
  const l = e.for && e.ownerDocument?.getElementById(e.for);
  l && requestAnimationFrame(() => {
    for (const a of s)
      if (a.el === l) {
        L(a);
        break;
      }
  });
}
export {
  q as a,
  f as b,
  E as l,
  W as u
};
