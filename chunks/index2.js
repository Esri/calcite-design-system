/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { O as m, P as _, Q as g, S as v, I as A, l as y, T as x, U as N, V as M, W } from "./index.js";
import { n as S, d as T, f as U } from "./intl.js";
const V = (e) => (...s) => {
  const t = v(), n = new e(...s), o = n.exports;
  m(t.at(-1));
  const r = n.component.manager;
  r.W(n, o), n.watchExports(r.W.bind(r, n)), _(n);
  const i = [n.component, ...t].reverse();
  return g(
    i,
    (a) => a === void 0 ? void 0 : j(n, a, o),
    o
  );
}, j = (e, { host: s, key: t, isReactive: n }, o) => {
  const r = s, i = r[t] !== e.exports, a = r[t] !== o, c = o !== e.exports;
  if (i && !a && c && (r[t] = e.exports), s === e.component) {
    if (n) {
      const l = e.component.manager;
      a && l.W(e, r[t]), e.onUpdate((p) => {
        if (p.has(t)) {
          const f = r[t];
          f !== e.exports && l.W(e, f);
        }
      });
    }
    e.O = n ? void 0 : t;
  }
  const d = e.component.constructor.elementProperties.get(t)?.readOnly;
  e.watchExports(() => {
    r[t] !== e.exports && (d ? A(() => {
      r[t] = e.exports;
    }) : r[t] = e.exports);
  });
}, D = (e, s) => {
  let t = e;
  for (; t; ) {
    if (t === s)
      return !0;
    if (!t.parentNode)
      return !1;
    t.parentNode instanceof ShadowRoot ? t = t.parentNode.host : t = t.parentNode;
  }
  return !1;
}, E = (e, s, t) => {
  const n = I(s).subscribe;
  return n((o) => {
    o.some((i) => D(e, i.target)) && t();
  });
}, h = {}, I = (e) => {
  const s = e.join(","), t = h[s];
  if (t !== void 0)
    return t;
  const n = /* @__PURE__ */ new Set(), o = new MutationObserver((i) => n.forEach((a) => a(i)));
  globalThis.document && o.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: e,
    subtree: !0
  });
  const r = {
    subscribe: (i) => (n.add(i), () => {
      n.delete(i), n.size === 0 && (o.disconnect(), h[s] = void 0);
    })
  };
  return h[s] = r, r;
}, $ = (e, s) => {
  let t = e;
  for (; t; ) {
    const n = t.closest?.(s);
    if (n)
      return n;
    const o = t.getRootNode?.();
    if (o === globalThis.document)
      return;
    t = o?.host;
  }
}, C = (e, s, t) => $(e, `[${s}]`)?.getAttribute(s) ?? t, O = (e) => {
  const s = C(e, "lang", globalThis.navigator?.language || T);
  return { lang: s, t9nLocale: S(s) };
}, q = (e, s, t, n) => {
  let o;
  const r = () => z(e, s(), n).then((i) => {
    (o?.lang !== i.lang || o.t9nLocale !== i.t9nLocale || o.t9nStrings !== i.t9nStrings) && t(i), o = i;
  }).catch((i) => {
    y("error", "intl", "Error updating component locale state", { detail: { error: i } });
  });
  return queueMicrotask(r), E(e, ["lang"], r);
}, z = async (e, s, t = e.localName.split("-").slice(1).join("-")) => {
  const { lang: n, t9nLocale: o } = O(e), r = `${s}/${t}/t9n`, a = (
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    t === null ? {} : await U(o, r, "messages.")
  );
  return { lang: n, t9nLocale: o, t9nStrings: a };
};
var F = {};
const L = (e) => w(void 0, e), Q = (e) => (s) => w(
  s,
  /**
   * GenericController is identical to Controller, in all except for typing.
   * So doing a type-cast here so as not to needlessly add one more object
   * to the prototype chain
   */
  e
);
class H extends x {
  constructor(s, t) {
    super(s);
    const n = this.exports;
    try {
      M(this.component);
      const o = t(this.component, this), r = this.exports !== n;
      if (W(o)) {
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
const w = V(H), R = (e, s) => new B(e, s);
class B extends x {
  #t;
  #e;
  #s;
  constructor(s, t) {
    super(), this.#e = s, this.#s = t, this.#t = new MutationObserver((n) => {
      n.forEach((o) => {
        s.includes(o.attributeName) && t.call(
          this.component,
          this.component.el.getAttribute(o.attributeName),
          o.oldValue,
          o.attributeName
        );
      });
    });
  }
  hostConnected() {
    this.#e.forEach((s) => {
      this.component.el.hasAttribute(s) && this.#s.call(this.component, this.component.el.getAttribute(s), null, s);
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
const J = (e) => (...s) => {
  const t = v(), n = new e(...s);
  return m(t.at(-1)), n;
}, b = "ltr", X = () => L((e, s) => {
  s.exports = b, s.onLifecycle(() => {
    const t = () => {
      const n = C(e.el, "dir", b);
      s.exports = n === "rtl" ? "rtl" : "ltr";
    };
    return t(), E(e.el, ["dir"], t);
  }), F.NODE_ENV !== "production" && N() && g(
    e,
    (t) => {
      if (t?.key === "dir")
        throw new Error(
          "Do not assign this controller to a prop called `dir` as that will overwrite the HTMLElement's built-in `dir` attribute - component should not be setting the `dir` attribute on itself. Instead, assign this controller to a property called `direction`."
        );
    },
    s.exports
  );
}), Y = (e) => (s = {}) => (
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  L((t, n) => {
    const o = O(t.el), r = { _lang: o.lang, _t9nLocale: o.t9nLocale, _loading: !0 }, i = t;
    n.onLifecycle(
      () => q(
        t.el,
        () => e("./assets"),
        ({ t9nLocale: c, t9nStrings: u, lang: d }) => {
          const l = {
            ...u,
            _lang: d,
            _t9nLocale: c,
            _loading: !1
          };
          n.exports = l;
          const p = u.componentLabel;
          typeof p == "string" && "label" in t && t.label == null && (t.label ??= p), a(i.messageOverrides);
        },
        s.name
      )
    );
    const a = (c) => {
      const u = n.exports, d = u._original ?? u, l = P(d, c);
      c && (l._original = d), n.exports = l;
    };
    return "messageOverrides" in i && n.onUpdate((c) => {
      c.has("messageOverrides") && a(i.messageOverrides);
    }), s.blocking ? (n.setProvisionalExports(r, !1), n.ready) : r;
  })
), P = (e, s) => {
  if (!s)
    return e;
  const t = { ...e };
  return Object.entries(s).forEach(([n, o]) => {
    e[n] !== void 0 && (typeof o == "object" ? t[n] = P(e[n], o) : t[n] = o ?? e[n]);
  }), t;
};
export {
  Y as a,
  R as b,
  L as c,
  Q as m,
  J as t,
  X as u
};
