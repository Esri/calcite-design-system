/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as t } from "./keyed.js";
import { s as $, i as n, u as c } from "./static.js";
import { s as f } from "./index.js";
const l = ({ children: i, class: o, hidden: r = !1, key: m, level: s }) => {
  const a = s ? $(`h${s}`) : n`div`;
  return t(m, c`<${a} class=${f(o)} .hidden=${r}>${i}</${a}>`);
};
export {
  l as H
};
