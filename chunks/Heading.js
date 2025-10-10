import { i as t } from "./keyed.js";
import { s, i as n, u as l } from "./static.js";
import { s as m } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function $(e) {
  return Math.min(Math.max(Math.ceil(e), 1), 6);
}
const f = ({ children: e, ...a }) => {
  const i = a.level ? s(`h${a.level}`) : n`div`;
  return t(a.key, l`<${i} class=${m(a.class)}>${e}</${i}>`);
};
export {
  f as H,
  $ as c
};
