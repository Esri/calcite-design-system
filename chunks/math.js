/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const m = (t, e, n) => Math.max(e, Math.min(t, n)), c = new RegExp(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/), s = (t) => {
  const e = ("" + t).match(c);
  return !e || parseInt(e[1]) === 0 ? 0 : Math.max(
    0,
    // Number of digits right of decimal point.
    (e[1] ? e[1].length : 0) - // Adjust for scientific notation.
    (e[2] ? +e[2] : 0)
  );
};
function i(t) {
  return s(t) > 0 && t > 0 ? parseFloat(`0.${t.toString().split(".")[1]}`) : t;
}
function o(t, e, n, a, r) {
  return (t - e) * (r - a) / (n - e) + a;
}
function g(t, e, n) {
  return t < n ? -1 : t > e - n ? 1 : 0;
}
export {
  g as a,
  m as c,
  s as d,
  i as g,
  o as r
};
