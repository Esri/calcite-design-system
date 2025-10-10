import { b as o, g as r } from "./index-p4VH55K1.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = "Global";
function i(n) {
  return r(n).countries.length === 0;
}
function a(n) {
  if (i(n))
    return t;
  const e = n.indexOf("/");
  return e === -1 ? n : n.slice(0, e);
}
function c(n) {
  return o(n)?.id ?? n;
}
export {
  a as extractRegion,
  c as getCountry,
  t as global
};
