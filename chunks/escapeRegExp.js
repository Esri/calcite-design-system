/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function e(r) {
  return r.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}
function t(r) {
  if (r == null)
    return "";
  if (typeof r == "string")
    return r;
  if (Array.isArray(r))
    return r.map(t).join(",");
  const n = String(r);
  return n === "0" && Object.is(Number(r), -0) ? "-0" : n;
}
function i(r) {
  return e(t(r));
}
export {
  i as e
};
