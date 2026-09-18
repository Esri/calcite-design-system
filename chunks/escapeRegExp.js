/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
function i(r) {
  return r.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}
function e(r) {
  return typeof r == "symbol" || r instanceof Symbol;
}
function o(r) {
  return r == null ? "" : t(r);
}
function t(r) {
  if (typeof r == "string") return r;
  if (Array.isArray(r)) return r.map(t).join(",");
  if (e(r)) return r.toString();
  const n = r + "";
  return n === "0" && Object.is(Number(r), -0) ? "-0" : n;
}
function f(r) {
  return i(o(r));
}
export {
  f as e
};
