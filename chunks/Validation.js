import { s as e, E as o, x as l } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const c = {
  validationContainer: "validation-container"
}, r = ({ scale: a, status: i, id: t, icon: s, message: n }) => l`<div class=${e(c.validationContainer)}><calcite-input-message aria-live=polite .icon=${s} id=${t ?? o} .scale=${a} .status=${i}>${n}</calcite-input-message></div>`;
export {
  r as V
};
