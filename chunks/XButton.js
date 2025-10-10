import { n as l } from "./ref.js";
import { i as $ } from "./keyed.js";
import { s as m, E as p, x } from "./index.js";
import { g as d } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const o = {
  button: "x-button",
  buttonRound: "x-button--round"
}, I = ({ disabled: n, focusable: u, key: a, label: c, onClick: e, ref: i, round: r = !0, scale: t, title: b }) => $(a, x`<button .ariaLabel=${c} class=${m({
  [((s) => `x-button--${s}`)(t)]: !0,
  [o.button]: !0,
  [o.buttonRound]: r
})} .disabled=${n} @click=${e} .tabIndex=${u ? 0 : -1} title=${b ?? p} type=button ${l(i)}><calcite-icon icon=x .scale=${d(t)}></calcite-icon></button>`);
export {
  o as C,
  I as X
};
