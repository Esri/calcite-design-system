/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { n as s } from "./ref.js";
import { s as c, b as l, A as r } from "./index.js";
const d = {
  validationContainer: "validation-container"
}, p = () => {
}, m = ({ scale: i, status: t, id: n, icon: e, message: o, ref: a }) => l`<div class=${c(d.validationContainer)} ${s(a || p)}><calcite-input-message aria-live=polite .icon=${e} id=${n ?? r} .scale=${i} .status=${t}>${o}</calcite-input-message></div>`;
export {
  m as V
};
