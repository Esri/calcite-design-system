import { d as s } from "./date.js";
import { g as c } from "./locale.js";
import { g as i } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const o = {}, n = {};
async function l(e) {
  const t = c(e);
  if (o[t])
    return o[t];
  n[t] || (n[t] = fetch(i(`./assets/date-picker/nls/${t}.json`)).then((r) => r.json()).catch(() => (console.error(`Translations for "${t}" not found or invalid, falling back to english`), l("en"))));
  const a = await n[t];
  return o[t] = a, a;
}
function m(e) {
  return e.map((t, a) => s(t, a === 1));
}
export {
  l as a,
  m as g
};
