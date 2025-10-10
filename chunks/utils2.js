import { d as s } from "./date.js";
import { g as c } from "./locale.js";
import { g as i } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const o = {}, n = {};
async function g(e) {
  const t = c(e);
  if (o[t])
    return o[t];
  n[t] || (n[t] = fetch(i(`./assets/date-picker/nls/${t}.json`)).then((r) => r.json()).catch(() => (console.error(`Native Language Support data for "${t}" not found or invalid, falling back to english`), g("en"))));
  const a = await n[t];
  return o[t] = a, a;
}
function p(e) {
  return e.map((t, a) => s(t, a === 1));
}
export {
  g as a,
  p as g
};
