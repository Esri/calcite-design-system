/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { i as $ } from "./keyed.js";
import { A as n, s as c } from "./index.js";
import { s as d, i as f, u as p } from "./static.js";
const g = ({ children: i, class: o, hidden: r = !1, id: m, key: t, level: s }) => {
  const a = s ? d(`h${s}`) : f`div`;
  return $(t, p`<${a} class=${c(o)} .hidden=${r} id=${m ?? n}>${i}</${a}>`);
};
export {
  g as H
};
