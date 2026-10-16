/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
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
