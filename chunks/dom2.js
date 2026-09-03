/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { H as c } from "./index.js";
const h = (n, o) => {
  let t = n;
  for (; t; ) {
    if (t === o)
      return !0;
    if (!t.parentNode)
      return !1;
    t.parentNode instanceof ShadowRoot ? t = t.parentNode.host : t = t.parentNode;
  }
  return !1;
}, p = (n, o, t) => {
  const e = b(o).subscribe;
  return e((r) => {
    r.some((s) => h(n, s.target)) && t();
  });
}, u = {}, b = (n) => {
  const o = n.join(","), t = u[o];
  if (t !== void 0)
    return t;
  const e = /* @__PURE__ */ new Set(), r = new MutationObserver((s) => e.forEach((l) => l(s)));
  globalThis.document && r.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: n,
    subtree: !0
  });
  const a = {
    subscribe: (s) => (e.add(s), () => {
      e.delete(s), e.size === 0 && (r.disconnect(), u[o] = void 0);
    })
  };
  return u[o] = a, a;
}, m = (n, o) => {
  let t = n;
  for (; t; ) {
    const e = t.closest?.(o);
    if (e)
      return e;
    const r = t.getRootNode?.();
    if (r === globalThis.document)
      return;
    t = r?.host;
  }
}, v = (n, o, t) => m(n, `[${o}]`)?.getAttribute(o) ?? t;
var $ = {};
const L = (n) => {
  const o = v(n, "lang", globalThis.navigator?.language || i);
  return { lang: o, t9nLocale: f(o) };
}, N = (n, o, t, e) => {
  let r;
  const a = () => E(n, o(), e).then((s) => {
    (r?.lang !== s.lang || r.t9nLocale !== s.t9nLocale || r.t9nStrings !== s.t9nStrings) && t(s), r = s;
  }).catch((s) => {
    c("error", "intl", "Error updating component locale state", { detail: { error: s } });
  });
  return queueMicrotask(a), p(n, ["lang"], a);
}, E = async (n, o, t = n.localName.split("-").slice(1).join("-")) => {
  const { lang: e, t9nLocale: r } = L(n), a = `${o}/${t}/t9n`, l = (
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    t === null ? {} : await C(r, a, "messages.")
  );
  return { lang: e, t9nLocale: r, t9nStrings: l };
}, w = "ar,bg,bs,ca,cs,da,de,el,en,es,et,fi,fr,he,hr,hu,id,it,ja,ko,lt,lv,nl,nb,no,pl,pt-BR,pt-PT,ro,ru,sk,sl,sr,sv,th,tr,uk,vi,zh-CN,zh-HK,zh-TW".split(
  ","
), z = (
  //#endregion supportedLocales
  /* @__PURE__ */ new Set(w)
), i = "en", S = {
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
}, C = async (n, o, t = "") => {
  const e = `${o}/${t}`, r = `${e}${n}.json`;
  return d[r] ??= g(n, e), await d[r];
}, d = {}, g = async (n, o) => {
  const t = `${o}${n}.json`;
  try {
    const e = await fetch(t);
    if (e.ok)
      return await e.json();
  } catch (e) {
    return $.NODE_ENV !== "production" ? String(e).includes(`Unexpected token '<', "<!doctype "... is not valid JSON`) ? c("error", "intl", `Localization strings not found at ${t}`) : c("error", "intl", `Error fetching localization strings at ${t}`, { detail: { error: e } }) : c("error", "intl", `An unknown error occurred while fetching localization strings at ${t}`, {
      detail: { error: e }
    }), {};
  }
  return n === i ? {} : await g(i, o);
}, f = (n) => {
  const [o, t] = n.split("-"), e = o.toLowerCase();
  let r = e;
  return t && (r = `${e}-${t.toUpperCase()}`), r = S[r] ?? r, z.has(r) ? r : t ? f(e) : i;
};
export {
  N as a,
  v as b,
  i as d,
  L as g,
  f as n,
  p as o,
  z as s
};
