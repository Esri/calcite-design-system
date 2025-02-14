import { n as d } from "./ref.js";
import { i as g } from "./keyed.js";
import { x as f, s as e, h as $, E as n } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.5 */
const h = {
  arrow: "calcite-floating-ui-arrow",
  arrowStroke: "calcite-floating-ui-arrow__stroke"
}, k = {
  width: 12,
  height: 6,
  strokeWidth: 1
}, v = ({ floatingLayout: c, key: l, ref: w }) => {
  const { width: t, height: o, strokeWidth: r } = k, i = t / 2, s = c === "vertical", a = `M0,0 H${t} L${t - i},${o} Q${i},${o} ${i},${o} Z`;
  return g(l, f`<svg aria-hidden=true class=${e(h.arrow)} height=${t} viewBox=${`0 0 ${t} ${t + (s ? 0 : r)}`} width=${t + (s ? r : 0)} ${d(w)}>${$`${$`<path class=${e(h.arrowStroke)} d=${a ?? n} fill=none stroke-width=${r + 1} />` || ""}<path d=${a ?? n} stroke=none />`}</svg>`);
};
export {
  v as F
};
