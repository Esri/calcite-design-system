import { i as o } from "./index4.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const c = Object.keys(o).filter((e) => e.endsWith("16")).map((e) => e.replace("16", "")).sort((e, a) => {
  const r = /^i(\d)/;
  return e.replace(r, "$1").localeCompare(a.replace(r, "$1"));
});
export {
  c as i
};
