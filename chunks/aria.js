/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
function a(t, e, n) {
  const o = t === "block" ? e : n;
  return o != null ? `${o}` : void 0;
}
function l(t, ...e) {
  const n = e.length === 0 ? "false" : e[0];
  return t ? "true" : n;
}
export {
  a,
  l as t
};
