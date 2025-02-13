import { x as e, s as o, E as l } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const c = {
  validationContainer: "validation-container"
}, r = ({ scale: a, status: i, id: t, icon: s, message: n }) => e`<div class=${o(c.validationContainer)}><calcite-input-message aria-live=polite .icon=${s} id=${t ?? l} .scale=${a} .status=${i}>${n}</calcite-input-message></div>`;
export {
  r as V
};
