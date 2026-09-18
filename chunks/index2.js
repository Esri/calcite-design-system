/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { I as x, J as z, K as E, N as C, O as S, P as h, Q as L, S as j, T, U } from "./index.js";
const V = (e) => (...n) => {
  const t = C(), s = new e(...n), o = s.exports;
  x(t.at(-1));
  const r = s.component.manager;
  r.W(s, o), s.watchExports(r.W.bind(r, s)), z(s);
  const i = [s.component, ...t].reverse();
  return E(
    i,
    (a) => a === void 0 ? void 0 : M(s, a, o),
    o
  );
}, M = (e, { host: n, key: t, isReactive: s }, o) => {
  const r = n, i = r[t] !== e.exports, a = r[t] !== o, c = o !== e.exports;
  if (i && !a && c && (r[t] = e.exports), n === e.component) {
    if (s) {
      const l = e.component.manager;
      a && l.W(e, r[t]), e.onUpdate((p) => {
        if (p.has(t)) {
          const b = r[t];
          b !== e.exports && l.W(e, b);
        }
      });
    }
    e.O = s ? void 0 : t;
  }
  const d = e.component.constructor.elementProperties.get(t)?.readOnly;
  e.watchExports(() => {
    r[t] !== e.exports && (d ? S(() => {
      r[t] = e.exports;
    }) : r[t] = e.exports);
  });
}, W = (e, n) => {
  let t = e;
  for (; t; ) {
    if (t === n)
      return !0;
    if (!t.parentNode)
      return !1;
    t.parentNode instanceof ShadowRoot ? t = t.parentNode.host : t = t.parentNode;
  }
  return !1;
}, w = (e, n, t) => {
  const s = D(n).subscribe;
  return s((o) => {
    o.some((i) => W(e, i.target)) && t();
  });
}, g = {}, D = (e) => {
  const n = e.join(","), t = g[n];
  if (t !== void 0)
    return t;
  const s = /* @__PURE__ */ new Set(), o = new MutationObserver((i) => s.forEach((a) => a(i)));
  globalThis.document && o.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: e,
    subtree: !0
  });
  const r = {
    subscribe: (i) => (s.add(i), () => {
      s.delete(i), s.size === 0 && (o.disconnect(), g[n] = void 0);
    })
  };
  return g[n] = r, r;
}, B = (e, n) => {
  let t = e;
  for (; t; ) {
    const s = t.closest?.(n);
    if (s)
      return s;
    const o = t.getRootNode?.();
    if (o === globalThis.document)
      return;
    t = o?.host;
  }
}, O = (e, n, t) => B(e, `[${n}]`)?.getAttribute(n) ?? t;
var F = {};
const $ = (e) => {
  const n = O(e, "lang", globalThis.navigator?.language || f);
  return { lang: n, t9nLocale: y(n) };
}, k = (e, n, t, s) => {
  let o;
  const r = () => q(e, n(), s).then((i) => {
    (o?.lang !== i.lang || o.t9nLocale !== i.t9nLocale || o.t9nStrings !== i.t9nStrings) && t(i), o = i;
  }).catch((i) => {
    h("error", "intl", "Error updating component locale state", { detail: { error: i } });
  });
  return queueMicrotask(r), w(e, ["lang"], r);
}, q = async (e, n, t = e.localName.split("-").slice(1).join("-")) => {
  const { lang: s, t9nLocale: o } = $(e), r = `${n}/${t}/t9n`, a = (
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    t === null ? {} : await R(o, r, "messages.")
  );
  return { lang: s, t9nLocale: o, t9nStrings: a };
}, H = "ar,bg,bs,ca,cs,da,de,el,en,es,et,fi,fr,he,hr,hu,id,it,ja,ko,lt,lv,nl,nb,no,pl,pt-BR,pt-PT,ro,ru,sk,sl,sr,sv,th,tr,uk,vi,zh-CN,zh-HK,zh-TW".split(
  ","
), I = (
  //#endregion supportedLocales
  /* @__PURE__ */ new Set(H)
), f = "en", K = {
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
}, R = async (e, n, t = "") => {
  const s = `${n}/${t}`, o = `${s}${e}.json`;
  return m[o] ??= _(e, s), await m[o];
}, m = {}, _ = async (e, n) => {
  const t = `${n}${e}.json`;
  try {
    const s = await fetch(t);
    if (s.ok)
      return await s.json();
  } catch (s) {
    return F.NODE_ENV !== "production" ? String(s).includes(`Unexpected token '<', "<!doctype "... is not valid JSON`) ? h("error", "intl", `Localization strings not found at ${t}`) : h("error", "intl", `Error fetching localization strings at ${t}`, { detail: { error: s } }) : h("error", "intl", `An unknown error occurred while fetching localization strings at ${t}`, {
      detail: { error: s }
    }), {};
  }
  return e === f ? {} : await _(f, n);
}, y = (e) => {
  const [n, t] = e.split("-"), s = n.toLowerCase();
  let o = s;
  return t && (o = `${s}-${t.toUpperCase()}`), o = K[o] ?? o, I.has(o) ? o : t ? y(s) : f;
};
var J = {};
const N = (e) => P(void 0, e), Y = (e) => (n) => P(
  n,
  /**
   * GenericController is identical to Controller, in all except for typing.
   * So doing a type-cast here so as not to needlessly add one more object
   * to the prototype chain
   */
  e
);
class G extends L {
  constructor(n, t) {
    super(n);
    const s = this.exports;
    try {
      T(this.component);
      const o = t(this.component, this), r = this.exports !== s;
      if (U(o)) {
        r || this.setProvisionalExports(o);
        const i = o.then((a) => {
          this.exports = a, super.catchUpLifecycle();
        }).catch((a) => {
          this.P.reject(a);
        });
        this.onLoad(async () => await i);
      } else
        (!r || o !== void 0) && (this.exports = o), queueMicrotask(() => super.catchUpLifecycle());
    } catch (o) {
      this.P.reject(o);
    }
  }
  /** Noop - will be called in the constructor instead */
  catchUpLifecycle() {
  }
}
const P = V(G), Z = (e, n) => new Q(e, n);
class Q extends L {
  #t;
  #e;
  #s;
  constructor(n, t) {
    super(), this.#e = n, this.#s = t, this.#t = new MutationObserver((s) => {
      s.forEach((o) => {
        n.includes(o.attributeName) && t.call(
          this.component,
          this.component.el.getAttribute(o.attributeName),
          o.oldValue,
          o.attributeName
        );
      });
    });
  }
  hostConnected() {
    this.#e.forEach((n) => {
      this.component.el.hasAttribute(n) && this.#s.call(this.component, this.component.el.getAttribute(n), null, n);
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
const tt = (e) => (...n) => {
  const t = C(), s = new e(...n);
  return x(t.at(-1)), s;
}, v = "ltr", et = () => N((e, n) => {
  n.exports = v, n.onLifecycle(() => {
    const t = () => {
      const s = O(e.el, "dir", v);
      n.exports = s === "rtl" ? "rtl" : "ltr";
    };
    return t(), w(e.el, ["dir"], t);
  }), J.NODE_ENV !== "production" && j() && E(
    e,
    (t) => {
      if (t?.key === "dir")
        throw new Error(
          "Do not assign this controller to a prop called `dir` as that will overwrite the HTMLElement's built-in `dir` attribute - component should not be setting the `dir` attribute on itself. Instead, assign this controller to a property called `direction`."
        );
    },
    n.exports
  );
}), st = (e) => (n = {}) => (
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  N((t, s) => {
    const o = $(t.el), r = { _lang: o.lang, _t9nLocale: o.t9nLocale, _loading: !0 }, i = t;
    s.onLifecycle(
      () => k(
        t.el,
        () => e("./assets"),
        ({ t9nLocale: c, t9nStrings: u, lang: d }) => {
          const l = {
            ...u,
            _lang: d,
            _t9nLocale: c,
            _loading: !1
          };
          s.exports = l;
          const p = u.componentLabel;
          typeof p == "string" && "label" in t && t.label == null && (t.label ??= p), a(i.messageOverrides);
        },
        n.name
      )
    );
    const a = (c) => {
      const u = s.exports, d = u._original ?? u, l = A(d, c);
      c && (l._original = d), s.exports = l;
    };
    return "messageOverrides" in i && s.onUpdate((c) => {
      c.has("messageOverrides") && a(i.messageOverrides);
    }), n.blocking ? (s.setProvisionalExports(r, !1), s.ready) : r;
  })
), A = (e, n) => {
  if (!n)
    return e;
  const t = { ...e };
  return Object.entries(n).forEach(([s, o]) => {
    e[s] !== void 0 && (typeof o == "object" ? t[s] = A(e[s], o) : t[s] = o ?? e[s]);
  }), t;
};
export {
  st as a,
  Z as b,
  N as c,
  Y as m,
  tt as t,
  et as u
};
