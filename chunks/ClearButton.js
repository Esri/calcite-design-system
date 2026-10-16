/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { A as e, s, b as l } from "./index.js";
import { n as $ } from "./ref.js";
const u = {
  container: "clear-button--container"
}, b = () => {
}, p = ({ ariaLabel: a, ref: t, disabled: n, focusable: o, onClick: i, scale: r, title: c }) => l`<div class=${s(u.container)} .inert=${n} ${$(t || b)}><calcite-action .disabled=${n} icon=x .label=${a ?? ""} @click=${i} .scale=${r} tabindex=${(o ? void 0 : -1) ?? e} .text=${c} title=${c ?? e}></calcite-action></div>`;
export {
  p as C
};
