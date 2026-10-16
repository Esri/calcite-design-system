/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { n as m, o as O, q as x, x as b, y as L, C as g, z as w, B as _, D as y } from "./index.js";
import { g as P, a as A, o as W, b as D } from "./dom2.js";
const M = (t) => (...n) => {
  const e = b(), s = new t(...n), o = s.exports;
  m(e.at(-1));
  const r = s.component.manager;
  r.W(s, o), s.watchExports(r.W.bind(r, s)), O(s);
  const a = [s.component, ...e].reverse();
  return x(
    a,
    (i) => i === void 0 ? void 0 : U(s, i, o),
    o
  );
}, U = (t, { host: n, key: e, isReactive: s }, o) => {
  const r = n, a = r[e] !== t.exports, i = r[e] !== o, c = o !== t.exports;
  if (a && !i && c && (r[e] = t.exports), n === t.component) {
    if (s) {
      const l = t.component.manager;
      i && l.W(t, r[e]), t.onUpdate((h) => {
        if (h.has(e)) {
          const u = r[e];
          u !== t.exports && l.W(t, u);
        }
      });
    }
    t.O = s ? void 0 : e;
  }
  const d = t.component.constructor.elementProperties.get(e)?.readOnly;
  t.watchExports(() => {
    r[e] !== t.exports && (d ? L(() => {
      r[e] = t.exports;
    }) : r[e] = t.exports);
  });
};
var V = {};
const v = (t) => C(void 0, t), q = (t) => (n) => C(
  n,
  /**
   * GenericController is identical to Controller, in all except for typing.
   * So doing a type-cast here so as not to needlessly add one more object
   * to the prototype chain
   */
  t
);
class N extends g {
  constructor(n, e) {
    super(n);
    const s = this.exports;
    try {
      _(this.component);
      const o = e(this.component, this), r = this.exports !== s;
      if (y(o)) {
        r || this.setProvisionalExports(o);
        const a = o.then((i) => {
          this.exports = i, super.catchUpLifecycle();
        }).catch((i) => {
          this.P.reject(i);
        });
        this.onLoad(async () => await a);
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
const C = M(N), H = (t, n) => new j(t, n);
class j extends g {
  #t;
  #e;
  #s;
  constructor(n, e) {
    super(), this.#e = n, this.#s = e, this.#t = new MutationObserver((s) => {
      s.forEach((o) => {
        n.includes(o.attributeName) && e.call(
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
const I = (t) => (...n) => {
  const e = b(), s = new t(...n);
  return m(e.at(-1)), s;
}, f = "ltr", $ = () => v((t, n) => {
  n.exports = f, n.onLifecycle(() => {
    const e = () => {
      const s = D(t.el, "dir", f);
      n.exports = s === "rtl" ? "rtl" : "ltr";
    };
    return e(), W(t.el, ["dir"], e);
  }), V.NODE_ENV !== "production" && w() && x(
    t,
    (e) => {
      if (e?.key === "dir")
        throw new Error(
          "Do not assign this controller to a prop called `dir` as that will overwrite the HTMLElement's built-in `dir` attribute - component should not be setting the `dir` attribute on itself. Instead, assign this controller to a property called `direction`."
        );
    },
    n.exports
  );
}), z = (t) => (n = {}) => (
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  v((e, s) => {
    const o = P(e.el), r = { _lang: o.lang, _t9nLocale: o.t9nLocale, _loading: !0 }, a = e;
    s.onLifecycle(
      () => A(
        e.el,
        () => t("./assets"),
        ({ t9nLocale: c, t9nStrings: p, lang: d }) => {
          const l = {
            ...p,
            _lang: d,
            _t9nLocale: c,
            _loading: !1
          };
          s.exports = l;
          const h = p.componentLabel;
          typeof h == "string" && "label" in e && e.label == null && (e.label ??= h), i(a.messageOverrides);
        },
        n.name
      )
    );
    const i = (c) => {
      const p = s.exports, d = p._original ?? p, l = E(d, c);
      c && (l._original = d), s.exports = l;
    };
    return "messageOverrides" in a && s.onUpdate((c) => {
      c.has("messageOverrides") && i(a.messageOverrides);
    }), n.blocking ? (s.setProvisionalExports(r, !1), s.ready) : r;
  })
), E = (t, n) => {
  if (!n)
    return t;
  const e = { ...t };
  return Object.entries(n).forEach(([s, o]) => {
    t[s] !== void 0 && (typeof o == "object" ? e[s] = E(t[s], o) : e[s] = o ?? t[s]);
  }), e;
};
export {
  z as a,
  H as b,
  v as c,
  q as m,
  I as t,
  $ as u
};
