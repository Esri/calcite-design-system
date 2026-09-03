/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as S } from "./index.js";
const u = /* @__PURE__ */ Symbol.for(""), d = (t) => {
  if (t?.r === u) return t?._$litStatic$;
}, b = (t) => ({ _$litStatic$: t, r: u }), m = (t, ...e) => ({ _$litStatic$: e.reduce((o, r, l) => o + ((a) => {
  if (a._$litStatic$ !== void 0) return a._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(r) + t[l + 1], t[0]), r: u }), p = /* @__PURE__ */ new Map(), h = (t) => (e, ...o) => {
  const r = o.length;
  let l, a;
  const s = [], $ = [];
  let n, i = 0, c = !1;
  for (; i < r; ) {
    for (n = e[i]; i < r && (a = o[i], (l = d(a)) !== void 0); ) n += l + e[++i], c = !0;
    i !== r && $.push(a), s.push(n), i++;
  }
  if (i === r && s.push(e[r]), c) {
    const f = s.join("$$lit$$");
    (e = p.get(f)) === void 0 && (s.raw = s, p.set(f, e = s)), o = $;
  }
  return t(e, ...o);
}, v = h(S);
export {
  m as i,
  b as s,
  v as u
};
