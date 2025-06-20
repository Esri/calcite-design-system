import { q as m, u as x, w as v, y as C, z as O, A as f, F as E, G as L, H as P, I as w, g as A } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
const y = (t) => (...o) => {
  const e = x(), s = new t(...o), n = s.exports;
  m(e.at(-1));
  const r = s.component.manager;
  r.W(s, n), s.watchExports(r.W.bind(r, s)), v(s);
  const i = [s.component, ...e].reverse();
  return C(
    i,
    (a) => a === void 0 ? void 0 : _(s, a, n),
    n
  );
}, _ = (t, { host: o, key: e, isReactive: s }, n) => {
  const r = o, i = r[e] !== t.exports, a = r[e] !== n, c = n !== t.exports;
  if (i && !a && c && (r[e] = t.exports), o === t.component) {
    if (s) {
      const p = t.component.manager;
      a && p.W(t, r[e]), t.onUpdate((u) => {
        if (u.has(e)) {
          const d = r[e];
          d !== t.exports && p.W(t, d);
        }
      });
    }
    t.O = s ? void 0 : e;
  }
  const h = t.component.constructor.elementProperties.get(e)?.readOnly;
  t.watchExports(() => {
    r[e] !== t.exports && (h ? O(() => {
      r[e] = t.exports;
    }) : r[e] = t.exports);
  });
}, W = (t) => b(void 0, t), M = (t) => (o) => b(
  o,
  /**
   * GenericController is identical to Controller, in all except for typing.
   * So dying a type-cast here so as not to needlessly add one more object
   * to the prototype chain
   */
  t
);
class U extends f {
  constructor(o, e) {
    super(o);
    const s = this.exports;
    try {
      P(this.component);
      const n = e(this.component, this), r = this.exports !== s;
      if (w(n)) {
        r || this.setProvisionalExports(n);
        const i = n.then((a) => {
          this.exports = a, super.catchUpLifecycle();
        }).catch((a) => {
          this.P.reject(a), console.error(a);
        });
        this.onLoad(async () => await i);
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
const b = y(U), N = (t, o) => new V(t, o);
class V extends f {
  #t;
  #e;
  #s;
  constructor(o, e) {
    super(), this.#e = o, this.#s = e, this.#t = new MutationObserver((s) => {
      s.forEach((n) => {
        o.includes(n.attributeName) && e.call(
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
const R = (t) => (...o) => {
  const e = x(), s = new t(...o);
  return m(e.at(-1)), s;
}, j = (t) => (o = {}) => (
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  W((e, s) => {
    const n = E(e.el), r = { _lang: n.lang, _t9nLocale: n.t9nLocale, _loading: !0 }, i = e;
    s.onLifecycle(
      () => L(
        e.el,
        () => t("./assets"),
        ({ t9nLocale: c, t9nStrings: l, lang: h }) => {
          const p = {
            ...l,
            _lang: h,
            _t9nLocale: c,
            _loading: !1
          };
          s.exports = p;
          const u = l.componentLabel;
          typeof u == "string" && "label" in e && e.label == null && (e.label ??= u), a(i.messageOverrides);
        },
        o.name
      )
    );
    const a = (c) => {
      const l = s.exports, h = l._original ?? l, p = g(h, c);
      c && (p._original = h), s.exports = p;
    };
    return "messageOverrides" in i && s.onUpdate((c) => {
      c.has("messageOverrides") && a(i.messageOverrides);
    }), o.blocking ? (s.setProvisionalExports(r, !1), s.ready) : r;
  })
), g = (t, o) => {
  if (!o)
    return t;
  const e = { ...t };
  return Object.entries(o).forEach(([s, n]) => {
    typeof n == "object" ? e[s] = g(t[s], n) : e[s] = n ?? t[s];
  }), e;
}, q = j(A);
export {
  N as a,
  M as m,
  R as t,
  q as u
};
