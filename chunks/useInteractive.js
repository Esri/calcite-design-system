/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as o } from "./index2.js";
import { s as c, b as s } from "./index.js";
const l = {
  container: "interaction-container"
}, d = ({ children: e, disabled: t }) => s`<div class=${c(l.container)} .inert=${t}>${e}</div>`, k = o((e, t) => (t.onUpdated(() => f(e)), d));
function u() {
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
function f(e) {
  if (e.disabled) {
    e.el.setAttribute("aria-disabled", "true"), e.el.contains(document.activeElement) && document.activeElement.blur(), v(e);
    return;
  }
  E(e), e.el.removeAttribute("aria-disabled");
}
function v(e) {
  e.el.click = u, b(e.el);
}
function b(e) {
  e.addEventListener("pointerdown", i, n), r.forEach((t) => e.addEventListener(t, a, n));
}
function E(e) {
  delete e.el.click, m(e.el);
}
function m(e) {
  e.removeEventListener("pointerdown", i, n), r.forEach((t) => e.removeEventListener(t, a, n));
}
export {
  k as u
};
