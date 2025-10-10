import { n as s } from "./ref.js";
import { s as c, E as l, x as r } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const d = {
  validationContainer: "validation-container"
}, p = () => {
}, m = ({ scale: i, status: t, id: n, icon: e, message: o, ref: a }) => r`<div class=${c(d.validationContainer)} ${s(a || p)}><calcite-input-message aria-live=polite .icon=${e} id=${n ?? l} .scale=${i} .status=${t}>${o}</calcite-input-message></div>`;
export {
  m as V
};
