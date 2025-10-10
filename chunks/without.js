/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function o(e, t) {
  const n = new Set(t);
  return e.filter((r) => !n.has(r));
}
function c(e, ...t) {
  return o(e, t);
}
export {
  c as w
};
