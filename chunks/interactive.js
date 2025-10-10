import { s as o, x as s } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function c() {
  const { disabled: e } = this;
  e || HTMLElement.prototype.click.call(this);
}
function i(e) {
  e.target.disabled && e.preventDefault();
}
const r = ["mousedown", "mouseup", "click"];
function a(e) {
  e.target.disabled && (e.stopImmediatePropagation(), e.preventDefault());
}
const n = { capture: !0 };
function E(e) {
  if (e.disabled) {
    e.el.setAttribute("aria-disabled", "true"), e.el.contains(document.activeElement) && document.activeElement.blur(), l(e);
    return;
  }
  u(e), e.el.removeAttribute("aria-disabled");
}
function l(e) {
  e.el.click = c, d(e.el);
}
function d(e) {
  e.addEventListener("pointerdown", i, n), r.forEach((t) => e.addEventListener(t, a, n));
}
function u(e) {
  delete e.el.click, f(e.el);
}
function f(e) {
  e.removeEventListener("pointerdown", i, n), r.forEach((t) => e.removeEventListener(t, a, n));
}
const v = {
  container: "interaction-container"
}, m = ({ children: e, disabled: t }) => s`<div class=${o(v.container)} .inert=${t}>${e}</div>`;
export {
  m as I,
  E as u
};
