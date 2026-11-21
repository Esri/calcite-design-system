/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { l as s } from "./index.js";
var l = {};
const u = "ar,bg,bs,ca,cs,da,de,el,en,es,et,fi,fr,he,hr,hu,id,it,ja,ko,lt,lv,nl,nb,no,pl,pt-BR,pt-PT,ro,ru,sk,sl,sr,sv,th,tr,uk,vi,zh-CN,zh-HK,zh-TW".split(
  ","
), d = (
  //#endregion supportedLocales
  /* @__PURE__ */ new Set(u)
), a = "en", f = {
  //#region localeEquivalencies
  // Locale equivalencies aligned with ArcGIS Maps SDK for JavaScript:
  // https://developers.arcgis.com/javascript/latest/localization/#locale-support
  // We resolve to `pt-BR` as it will have the same translations as `pt`, which has no corresponding bundle
  pt: "pt-BR",
  // We support both 'nb' and 'no' (BCP 47) for Norwegian but only `no` has corresponding bundle
  nb: "no",
  // We support both 'nn' and 'no' (BCP 47) for Norwegian but only `no` has corresponding bundle
  // See https://devtopia.esri.com/WebGIS/webgis-sdk/issues/4667
  nn: "no",
  // We use `zh-CN` as base translation for chinese locales which has no corresponding bundle.
  zh: "zh-CN"
  //#endregion localeEquivalencies
}, g = async (r, o, e = "") => {
  const t = `${o}/${e}`, n = `${t}${r}.json`;
  return i[n] ??= c(r, t), await i[n];
}, i = {}, c = async (r, o) => {
  const e = `${o}${r}.json`;
  try {
    const t = await fetch(e);
    if (t.ok)
      return await t.json();
  } catch (t) {
    return l.NODE_ENV !== "production" ? String(t).includes(`Unexpected token '<', "<!doctype "... is not valid JSON`) ? s("error", "intl", `Localization strings not found at ${e}`) : s("error", "intl", `Error fetching localization strings at ${e}`, { detail: { error: t } }) : s("error", "intl", `An unknown error occurred while fetching localization strings at ${e}`, {
      detail: { error: t }
    }), {};
  }
  return r === a ? {} : await c(a, o);
}, h = (r) => {
  const [o, e] = r.split("-"), t = o.toLowerCase();
  let n = t;
  return e && (n = `${t}-${e.toUpperCase()}`), n = f[n] ?? n, d.has(n) ? n : e ? h(t) : a;
};
export {
  a as d,
  g as f,
  h as n,
  d as s
};
