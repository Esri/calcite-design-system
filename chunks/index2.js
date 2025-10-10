import { J as m, K as v, N as P, O as y, P as N, Q as x, R as $, S as A } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const _ = (e) => (...o) => {
  const t = v(), s = new e(...o), n = s.exports;
  m(t.at(-1));
  const r = s.component.manager;
  r.W(s, n), s.watchExports(r.W.bind(r, s)), P(s);
  const a = [s.component, ...t].reverse();
  return y(
    a,
    (c) => c === void 0 ? void 0 : S(s, c, n),
    n
  );
}, S = (e, { host: o, key: t, isReactive: s }, n) => {
  const r = o, a = r[t] !== e.exports, c = r[t] !== n, i = n !== e.exports;
  if (a && !c && i && (r[t] = e.exports), o === e.component) {
    if (s) {
      const l = e.component.manager;
      c && l.W(e, r[t]), e.onUpdate((d) => {
        if (d.has(t)) {
          const b = r[t];
          b !== e.exports && l.W(e, b);
        }
      });
    }
    e.O = s ? void 0 : t;
  }
  const p = e.component.constructor.elementProperties.get(t)?.readOnly;
  e.watchExports(() => {
    r[t] !== e.exports && (p ? N(() => {
      r[t] = e.exports;
    }) : r[t] = e.exports);
  });
}, j = (e, o) => {
  let t = e;
  for (; t; ) {
    if (t === o)
      return !0;
    if (!t.parentNode)
      return !1;
    t.parentNode instanceof ShadowRoot ? t = t.parentNode.host : t = t.parentNode;
  }
  return !1;
}, z = (e, o, t) => {
  const s = T(o).subscribe;
  return s((n) => {
    n.some((a) => j(e, a.target)) && t();
  });
}, f = {}, T = (e) => {
  const o = e.join(","), t = f[o];
  if (t !== void 0)
    return t;
  const s = /* @__PURE__ */ new Set(), n = new MutationObserver((a) => s.forEach((c) => c(a)));
  globalThis.document && n.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: e,
    subtree: !0
  });
  const r = {
    subscribe: (a) => (s.add(a), () => {
      s.delete(a), s.size === 0 && (n.disconnect(), f[o] = void 0);
    })
  };
  return f[o] = r, r;
}, U = (e, o) => {
  let t = e;
  for (; t; ) {
    const s = t.closest?.(o);
    if (s)
      return s;
    const n = t.getRootNode?.();
    if (n === globalThis.document)
      return;
    t = n.host;
  }
}, V = (e, o, t) => U(e, `[${o}]`)?.getAttribute(o) ?? t;
var W = {};
const M = "ar,bg,bs,ca,cs,da,de,el,en,es,et,fi,fr,he,hr,hu,id,it,ja,ko,lt,lv,nl,nb,no,pl,pt-BR,pt-PT,ro,ru,sk,sl,sr,sv,th,tr,uk,vi,zh-CN,zh-HK,zh-TW".split(
  ","
), F = (
  //#endregion supportedLocales
  /* @__PURE__ */ new Set(M)
), h = "en", q = {
  //#region localeEquivalencies
  // We use `pt-PT` as it will have the same translations as `pt`, which has no corresponding bundle
  pt: "pt-PT",
  // We support both 'nb' and 'no' (BCP 47) for Norwegian but only `no` has corresponding bundle
  nb: "no",
  // We support both 'nn' and 'no' (BCP 47) for Norwegian but only `no` has corresponding bundle
  // See https://devtopia.esri.com/WebGIS/arcgis-web-components/issues/4667
  nn: "no",
  // We use `zh-CN` as base translation for chinese locales which has no corresponding bundle.
  zh: "zh-CN"
  //#endregion localeEquivalencies
}, B = async (e, o, t = "") => {
  const s = `${o}/${t}`, n = `${s}${e}.json`;
  return g[n] ?? (g[n] = C(e, s)), await g[n];
}, g = {}, C = async (e, o) => {
  const t = `${o}${e}.json`;
  try {
    const s = await fetch(t);
    if (s.ok)
      return await s.json();
  } catch (s) {
    return W.NODE_ENV !== "production" ? String(s).includes(`Unexpected token '<', "<!doctype "... is not valid JSON`) ? console.error(`[404] Localization strings not found at ${t}`) : console.error(`Error fetching localization strings at ${t}`, s) : console.error(s), {};
  }
  return e === h ? {} : await C(h, o);
}, E = (e) => {
  const o = V(e, "lang", globalThis.navigator?.language || h);
  return { lang: o, t9nLocale: L(o) };
}, L = (e) => {
  const [o, t] = e.split("-"), s = o.toLowerCase();
  let n = s;
  return t && (n = `${s}-${t.toUpperCase()}`), n = q[n] ?? n, F.has(n) ? n : t ? L(s) : h;
}, K = (e, o, t, s) => {
  let n;
  const r = () => R(e, o(), s).then((a) => {
    (n?.lang !== a.lang || n.t9nLocale !== a.t9nLocale || n.t9nStrings !== a.t9nStrings) && t(a), n = a;
  }).catch(console.error);
  return queueMicrotask(r), z(e, ["lang"], r);
}, R = async (e, o, t = e.localName.split("-").slice(1).join("-")) => {
  const { lang: s, t9nLocale: n } = E(e), r = `${o}/${t}/t9n`, c = (
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    t === null ? {} : await B(n, r, "messages.")
  );
  return { lang: s, t9nLocale: n, t9nStrings: c };
}, D = (e) => O(void 0, e), G = (e) => (o) => O(
  o,
  /**
   * GenericController is identical to Controller, in all except for typing.
   * So doing a type-cast here so as not to needlessly add one more object
   * to the prototype chain
   */
  e
);
class H extends x {
  constructor(o, t) {
    super(o);
    const s = this.exports;
    try {
      $(this.component);
      const n = t(this.component, this), r = this.exports !== s;
      if (A(n)) {
        r || this.setProvisionalExports(n);
        const a = n.then((c) => {
          this.exports = c, super.catchUpLifecycle();
        }).catch((c) => {
          this.P.reject(c), console.error(c);
        });
        this.onLoad(async () => await a);
      } else
        (!r || n !== void 0) && (this.exports = n), queueMicrotask(() => super.catchUpLifecycle());
    } catch (n) {
      this.P.reject(n), console.error(n);
    }
  }
  /** Noop - will be called in the constructor instead */
  catchUpLifecycle() {
  }
}
const O = _(H), Q = (e, o) => new J(e, o);
class J extends x {
  #t;
  #e;
  #s;
  constructor(o, t) {
    super(), this.#e = o, this.#s = t, this.#t = new MutationObserver((s) => {
      s.forEach((n) => {
        o.includes(n.attributeName) && t.call(
          this.component,
          this.component.el.getAttribute(n.attributeName),
          n.oldValue,
          n.attributeName
        );
      });
    });
  }
  hostConnected() {
    this.#e.forEach((o) => {
      this.component.el.hasAttribute(o) && this.#s.call(this.component, null, this.component.el.getAttribute(o), o);
    }), this.#t.observe(this.component.el, {
      attributes: !0,
      attributeOldValue: !0,
      attributeFilter: this.#e
    });
  }
  hostDisconnected() {
    this.#t.disconnect();
  }
}
const I = (e) => (...o) => {
  const t = v(), s = new e(...o);
  return m(t.at(-1)), s;
}, X = (e) => (o = {}) => (
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  D((t, s) => {
    const n = E(t.el), r = { _lang: n.lang, _t9nLocale: n.t9nLocale, _loading: !0 }, a = t;
    s.onLifecycle(
      () => K(
        t.el,
        () => e("./assets"),
        ({ t9nLocale: i, t9nStrings: u, lang: p }) => {
          const l = {
            ...u,
            _lang: p,
            _t9nLocale: i,
            _loading: !1
          };
          s.exports = l;
          const d = u.componentLabel;
          typeof d == "string" && "label" in t && t.label == null && (t.label ??= d), c(a.messageOverrides);
        },
        o.name
      )
    );
    const c = (i) => {
      const u = s.exports, p = u._original ?? u, l = w(p, i);
      i && (l._original = p), s.exports = l;
    };
    return "messageOverrides" in a && s.onUpdate((i) => {
      i.has("messageOverrides") && c(a.messageOverrides);
    }), o.blocking ? (s.setProvisionalExports(r, !1), s.ready) : r;
  })
), w = (e, o) => {
  if (!o)
    return e;
  const t = { ...e };
  return Object.entries(o).forEach(([s, n]) => {
    typeof n == "object" ? t[s] = w(e[s], n) : t[s] = n ?? e[s];
  }), t;
};
export {
  X as a,
  G as m,
  I as t,
  Q as u
};
