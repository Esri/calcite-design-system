import { x as k } from "./index.js";
import { q as M, c as h } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const S = [
  "calcite-input",
  "calcite-input-number",
  "calcite-input-text",
  "calcite-text-area"
];
function V(e) {
  return `${e.split("-").map((n, i) => i === 0 ? n : `${n[0].toUpperCase()}${n.slice(1)}`).join("")}${S.includes(e) ? "Input" : "Change"}`;
}
const v = "hidden-form-input";
function E(e) {
  return "checked" in e;
}
const m = /* @__PURE__ */ new WeakMap(), g = /* @__PURE__ */ new WeakSet();
function H(e, t) {
  if (h(t.parentElement, "[form]"))
    return !0;
  const n = "calciteInternalFormComponentRegister";
  let i = !1;
  return e.addEventListener(n, (o) => {
    i = o.composedPath().some((d) => g.has(d)), o.stopPropagation();
  }, { once: !0 }), t.dispatchEvent(new CustomEvent(n, {
    bubbles: !0,
    composed: !0
  })), i;
}
function L(e, { status: t, message: a, icon: n }) {
  "status" in e && (e.status = t), "validationIcon" in e && typeof e.validationIcon != "string" && (e.validationIcon = n), "validationMessage" in e && !e.validationMessage && (e.validationMessage = a);
}
function F(e) {
  return e.nodeName === "CALCITE-RADIO-BUTTON" ? h(e, "calcite-radio-button-group") : e;
}
const R = new CustomEvent("calciteInvalid", { bubbles: !0, composed: !0 });
function I(e) {
  const t = e?.target, a = t?.validationMessage, n = F(t?.parentElement);
  if (!n)
    return;
  const i = n?.nodeName?.toLowerCase(), o = i?.split("-");
  if (o.length < 2 || o[0] !== "calcite")
    return;
  e?.preventDefault(), "validity" in n && (n.validity = t?.validity), n.dispatchEvent(R), L(n, {
    message: a,
    icon: !0,
    status: "invalid"
  });
  const d = V(i);
  n.addEventListener(d, () => {
    "status" in n && (n.status = "idle"), "validationIcon" in n && // validationIcon could be an empty string when true due to reflection
    (!n.validationIcon || n.validationIcon === !0) && (n.validationIcon = !1), "validationMessage" in n && n.validationMessage === a && (n.validationMessage = ""), "validity" in n && (n.validity = t?.validity);
  }, { once: !0 });
}
function T(e) {
  const { formEl: t } = e;
  return t ? (t.addEventListener("invalid", I, !0), t.requestSubmit(), t.removeEventListener("invalid", I, !0), requestAnimationFrame(() => {
    const a = t.querySelectorAll("[status=invalid]");
    for (const n of a)
      if (n?.validationMessage) {
        n?.setFocus();
        break;
      }
  }), !0) : !1;
}
function $(e) {
  e.formEl?.reset();
}
function D(e) {
  const { el: t, value: a } = e, n = A(e);
  if (!n || H(n, t))
    return;
  e.formEl = n, e.defaultValue = a, E(e) && (e.defaultChecked = e.checked);
  const i = w.bind(e);
  n.addEventListener("reset", i), m.set(e.el, i), g.add(t);
}
function A(e) {
  const { el: t, form: a } = e;
  return a ? M(t, { id: a }) : h(t, "form");
}
function w() {
  if ("status" in this && (this.status = "idle"), "validationIcon" in this && (this.validationIcon = !1), "validationMessage" in this && (this.validationMessage = ""), E(this)) {
    this.checked = this.defaultChecked;
    return;
  }
  this.value = this.defaultValue, this.onFormReset?.();
}
function W(e) {
  const { el: t, formEl: a } = e;
  if (!a)
    return;
  const n = m.get(t);
  a.removeEventListener("reset", n), m.delete(t), e.formEl = null, g.delete(t);
}
function O(e, t) {
  e.defaultValue = t;
}
const q = "calciteInternalHiddenInputInput", b = (e) => {
  e.target.dispatchEvent(new CustomEvent(q, { bubbles: !0 }));
}, C = (e) => e.removeEventListener("input", b);
function P(e) {
  const { el: t, formEl: a, name: n, value: i } = e, { ownerDocument: o } = t, d = t.querySelectorAll(`input[slot="${v}"]`);
  if (!a || !n) {
    d.forEach((s) => {
      C(s), s.remove();
    });
    return;
  }
  const f = Array.isArray(i) ? i : [i], l = [], c = /* @__PURE__ */ new Set();
  d.forEach((s) => {
    const r = f.find((y) => (
      /* intentional non-strict equality check */
      y == s.value
    ));
    r != null ? (c.add(r), p(e, s, r)) : l.push(s);
  });
  let u;
  f.forEach((s) => {
    if (c.has(s))
      return;
    let r = l.pop();
    r || (r = o.createElement("input"), r.ariaHidden = "true", r.slot = v), u || (u = o.createDocumentFragment()), u.append(r), r.addEventListener("input", b), p(e, r, s);
  }), u && t.append(u), l.forEach((s) => {
    C(s), s.remove();
  });
}
function p(e, t, a) {
  const { defaultValue: n, disabled: i, form: o, name: d, required: f } = e;
  t.defaultValue = n, t.disabled = i, t.name = d, t.required = f, t.tabIndex = -1, o ? t.setAttribute("form", o) : t.removeAttribute("form"), E(e) ? (t.checked = e.checked, t.defaultChecked = e.defaultChecked, t.value = e.checked ? a || "on" : "") : t.value = a || "", e.syncHiddenFormInput?.(t);
  const l = F(e.el);
  if (l && "validity" in l)
    for (const c in { ...t?.validity })
      l.validity[c] = t.validity[c];
}
const B = ({ component: e }) => (P(e), k`<slot name=${v}></slot>`);
export {
  B as H,
  O as a,
  D as c,
  W as d,
  A as f,
  q as i,
  $ as r,
  T as s
};
