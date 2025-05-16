import { q as b, u as g, w as v, y as _, z as C, A as m, F as E, G as O, H as y, I as L, g as P } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1-next.0 */
const A = (t) => (...n) => {
  const e = g(), s = new t(...n), o = s.exports;
  b(e.at(-1));
  const r = s.component.manager;
  r._markExports(s, o), s.watchExports((a) => r._markExports(s, a)), v(s);
  const i = [s.component, ...e].reverse();
  return _(
    i,
    (a) => a === void 0 ? void 0 : w(s, a, o),
    o
  );
};
function w(t, { host: n, key: e, isReactive: s }, o) {
  const r = n, i = r[e] !== t.exports, a = r[e] !== o, c = o !== t.exports;
  if (i && !a && c && (r[e] = t.exports), n === t.component) {
    if (s) {
      const p = t.component.manager;
      a && p._markExports(t, r[e]), t.onUpdate((u) => {
        if (u.has(e)) {
          const d = r[e];
          d !== t.exports && p._markExports(t, d);
        }
      });
    }
    t.assignedProperty = s ? void 0 : e;
  }
  const h = t.component.constructor.elementProperties.get(e)?.readOnly;
  t.watchExports(() => {
    r[e] !== t.exports && (h ? C(() => {
      r[e] = t.exports;
    }) : r[e] = t.exports);
  });
}
const U = (t) => x(void 0, t), N = (t) => (n) => x(
  n,
  /**
   * GenericController is identical to Controller, in all except for typing.
   * So dying a type-cast here so as not to needlessly add one more object
   * to the prototype chain
   */
  t
);
class V extends m {
  constructor(n, e) {
    super(n);
    const s = this.exports;
    try {
      y(this.component);
      const o = e(this.component, this), r = this.exports !== s;
      if (L(o)) {
        r || this.setProvisionalExports(o);
        const i = o.then((a) => {
          this.exports = a, super.catchUpLifecycle();
        }).catch((a) => {
          this._ready.reject(a), console.error(a);
        });
        this.onLoad(async () => await i);
      } else
        (!r || o !== void 0) && (this.exports = o), queueMicrotask(() => super.catchUpLifecycle());
    } catch (o) {
      this._ready.reject(o), console.error(o);
    }
  }
  /** Noop - will be called in the constructor instead */
  catchUpLifecycle() {
  }
}
const x = A(V), R = (t, n) => new j(t, n);
class j extends m {
  constructor(n, e) {
    super(), this._attributes = n, this._callback = e, this._observer = new MutationObserver((s) => {
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
    this._attributes.forEach((n) => {
      this.component.el.hasAttribute(n) && this._callback.call(this.component, null, this.component.el.getAttribute(n), n);
    }), this._observer.observe(this.component.el, {
      attributes: !0,
      attributeOldValue: !0,
      attributeFilter: this._attributes
    });
  }
  hostDisconnected() {
    this._observer.disconnect();
  }
}
const M = (t) => (n = {}) => (
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  U((e, s) => {
    const o = E(e.el), r = { _lang: o.lang, _t9nLocale: o.t9nLocale, _loading: !0 }, i = e;
    s.onLifecycle(
      () => O(
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
        n.name
      )
    );
    function a(c) {
      const l = s.exports, h = l._original ?? l, p = f(h, c);
      c && (p._original = h), s.exports = p;
    }
    return "messageOverrides" in i && s.onUpdate((c) => {
      c.has("messageOverrides") && a(i.messageOverrides);
    }), n.blocking ? (s.setProvisionalExports(r, !1), s.ready) : r;
  })
);
function f(t, n) {
  if (!n)
    return t;
  const e = { ...t };
  return Object.entries(n).forEach(([s, o]) => {
    typeof o == "object" ? e[s] = f(t[s], o) : e[s] = o ?? t[s];
  }), e;
}
const W = M(P);
export {
  R as a,
  N as m,
  W as u
};
