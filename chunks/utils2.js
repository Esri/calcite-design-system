/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { s as c, d as u, n as p } from "./dom2.js";
import { d } from "./date.js";
import { g as m, l as g } from "./index.js";
const n = {}, a = {}, f = [
  "de-AT",
  "de-CH",
  "en-AU",
  "en-CA",
  "en-GB",
  "es-MX",
  "fr-CA",
  "fr-CH",
  "hi",
  "it-CH",
  "mk",
  "pt"
], x = [...c, ...f];
function h(t) {
  if (!t)
    return u;
  const r = t.split("-");
  return t = `${r[0].toLowerCase()}${r.length >= 2 ? `-${r[1].toUpperCase()}` : ""}`, f.includes(t) ? t : p(t);
}
async function C(t) {
  return t = h(t), n[t] ? n[t] : (a[t] || (a[t] = fetch(m(`./assets/date-picker/nls/${t}.json`)).then((r) => r.json()).catch(() => (g.error(`Native Language Support data for "${t}" not found or invalid, falling back to english`), C(u)))), n[t] = await a[t]);
}
function M(t) {
  return {
    "ar-SA": "ar"
    // see https://github.com/Esri/calcite-design-system/issues/11399
  }[t] || t;
}
function S(t) {
  return t.map((r, e) => d(r, e === 1));
}
function i(t, r, e) {
  const s = t.has(r), o = t.has(e);
  if (s && !o)
    return r;
  if (o && !s)
    return e;
}
function $(t, r) {
  return r === "min" ? i(t, "min", "minAsDate") : i(t, "max", "maxAsDate");
}
export {
  S as a,
  M as b,
  C as c,
  $ as g,
  x as s
};
