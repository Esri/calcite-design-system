/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
function r(t, e, a) {
  const n = t === "block" ? e : a;
  return n != null ? `${n}` : void 0;
}
function i(t, ...e) {
  const a = e.length === 0 ? "false" : e[0];
  return t ? "true" : a;
}
const o = ["off", "polite", "assertive"];
function l(t) {
  return o.find((e) => e === t);
}
export {
  r as a,
  l as r,
  i as t
};
