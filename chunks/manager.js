/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { m as ie } from "./index2.js";
import { q as oe, u as le, j as ae, v as de } from "./dom.js";
import { c as ce } from "./index.js";
import { i as ue } from "./key.js";
import { t as fe } from "./aria.js";
const Le = (i) => {
  const { manager: a } = i;
  return ie((o, c) => {
    let u, f;
    const g = (l) => !!(l && o.referenceElementType), v = (l) => {
      g(l) && (a.registerElement(o, l), f = l);
    }, w = (l) => {
      g(l) && (a.unregisterElement(o, l), f === l && (f = void 0));
    }, k = (l) => {
      const { referenceElement: m, el: C } = l;
      return (typeof m == "string" ? oe(C, { id: m }) : m) || void 0;
    }, E = (l = !0) => {
      if (!o.referenceElementType)
        return;
      o.referenceEl = k(o);
      const { el: m, referenceElement: C, referenceEl: P } = o;
      l && C && !P && ce.warn(`${m.tagName}: reference-element id "${C}" was not found.`, {
        el: m
      });
    };
    c.onConnected(() => {
      u = requestAnimationFrame(() => {
        o.el.isConnected && (E(o.manager.loadedCalled), v(o.referenceEl));
      });
    }), c.onLoaded(() => {
      o.referenceElement && !o.referenceEl && E();
    }), c.onUpdate((l) => {
      o.hasUpdated && (l.has("referenceElement") && E(), l.has("referenceEl") ? (w(l.get("referenceEl")), v(o.referenceEl)) : (l.has("open") || l.has("triggerDisabled")) && a.updateElement(o, o.referenceEl));
    }), c.onDisconnected(() => {
      u != null && (cancelAnimationFrame(u), u = void 0), w(f);
    });
  });
};
function U(i, a) {
  if (i === a)
    return !0;
  if (i.length !== a.length)
    return !1;
  const o = new Set(i), c = new Set(a);
  if (o.size !== c.size)
    return !1;
  for (const u of o)
    if (!c.has(u))
      return !1;
  return !0;
}
const me = 5, R = 300, ge = R / 3, Ee = R * 1.5;
function he({
  startX: i,
  startY: a,
  endX: o,
  endY: c
}) {
  return Math.hypot(o - i, c - a) > me;
}
const He = (i) => {
  const a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakSet(), u = /* @__PURE__ */ new WeakMap();
  let f = null, g = null, v = null, w = null, k = null, E = null, l = 0;
  const m = (e, t) => {
    const n = e.find((s) => a.has(s));
    if (!n)
      return;
    const r = a.get(n);
    return t ? r?.filter((s) => s.referenceElementType === t) : r;
  }, C = (e, t) => {
    const n = e.composedPath(), r = m(n, t);
    r?.forEach((s) => {
      s && !s.triggerDisabled && (s.open = !s.open);
    }), Array.from(a.values()).flat().filter(
      (s) => !r?.includes(s) && s.autoClose && s.open && !n.includes(s.el)
    ).forEach((s) => s.open = !1);
  }, P = (e) => {
    de(e) || e.defaultPrevented || E && he({
      endY: e.clientY,
      endX: e.clientX,
      startY: E.y,
      startX: E.x
    }) || (E = null, C(e, "click"));
  }, T = () => {
    w != null && window.clearTimeout(w), w = null;
  }, b = () => {
    v != null && window.clearTimeout(v), v = null;
  }, h = () => {
    T(), b();
  }, D = (e, t) => !!(f?.some((n) => n?.open && t.includes(n.el)) || e?.some((n) => n?.open && t.includes(n.el))), y = (e, t) => {
    e?.forEach((n) => n.open = t), f = t ? e : null;
  }, p = () => {
    y(f, !1);
  }, W = (e) => {
    if (e.key === "Escape" && !e.defaultPrevented) {
      const t = f?.filter((n) => n?.open);
      if (t?.length) {
        h(), p();
        const n = e.composedPath();
        t.some(
          (r) => r.referenceEl instanceof Element && n.includes(r.referenceEl) || n.includes(r.el)
        ) && e.preventDefault();
      }
    }
  }, X = (e) => {
    if (e.defaultPrevented)
      return;
    g = null;
    const t = e.composedPath(), n = m(t, "hover");
    if (D(n, t)) {
      h();
      return;
    }
    if (p(), !n?.length)
      return;
    h();
    const r = n.filter((d) => d.closeOnClick), s = n.filter((d) => !d.closeOnClick);
    r?.length && (g = r, y(r, !1)), y(s, !0);
  }, A = (e) => {
    if (e.defaultPrevented || !ae(e))
      return;
    const { clientX: t, clientY: n } = e;
    E = { x: t, y: n };
  }, V = (e) => {
    e.defaultPrevented || (e.key === "Escape" ? $() : ue(e.key) && C(e, "click"));
  }, z = (e) => {
    m(e.composedPath())?.forEach((n) => n.onReferenceElementKeyDown?.(e));
  }, $ = () => {
    Array.from(a.values()).flat().forEach((e) => e.open = !1);
  }, S = (e) => {
    U(e ?? [], f ?? []) || p();
  }, j = (e) => {
    w = window.setTimeout(
      () => {
        w === null || !U(e ?? [], k ?? []) || (b(), S(e), e.forEach((t) => t.onReferenceElementPointerOpen?.()), y(e, !0));
      },
      f?.some((t) => t.open) ? ge : R
    );
  }, O = () => {
    v = window.setTimeout(() => {
      v !== null && p();
    }, Ee);
  }, x = (e) => {
    if (e.defaultPrevented) {
      p();
      return;
    }
    const t = e.composedPath(), n = m(t, "hover");
    if (D(n, t)) {
      h();
      return;
    }
    n?.some((r) => g?.includes(r)) || (n?.some((r) => k?.includes(r)) || T(), k = n, n?.length ? j(n) : f?.some((r) => r?.open) && O(), g = null);
  }, M = () => {
    p();
  }, _ = (e) => {
    e.defaultPrevented || (h(), O());
  }, B = (e) => {
    i.click && P(e), i.hover && X(e);
  }, N = (e) => {
    z(e), i.click && V(e), i.hover && W(e);
  }, G = () => {
    (i.click || i.hover) && (window.addEventListener("click", B), window.addEventListener("keydown", N)), i.click && window.addEventListener("pointerdown", A), i.hover && (window.addEventListener("pointermove", x), window.addEventListener("focusin", L), window.addEventListener("blur", M), document.addEventListener("pointerleave", _));
  }, Q = () => {
    (i.click || i.hover) && (window.removeEventListener("click", B), window.removeEventListener("keydown", N)), i.click && window.removeEventListener("pointerdown", A), i.hover && (window.removeEventListener("pointermove", x), window.removeEventListener("focusin", L), window.removeEventListener("blur", M), document.removeEventListener("pointerleave", _));
  }, J = (e, t) => {
    h(), y(e, t);
  }, Y = (e) => e instanceof Element ? le(e) : null, L = (e) => {
    if (e.defaultPrevented)
      return;
    const t = e.composedPath(), n = m(t, "hover");
    if (n?.some(
      (r) => r.isRestoringFocus || e.relatedTarget instanceof Node && r.el.contains(e.relatedTarget)
    )) {
      h();
      return;
    }
    if (n?.forEach((r) => {
      r.open && r.onReferenceElementFocusIn?.(e);
    }), D(n, t)) {
      h();
      return;
    }
    n?.some((r) => g?.includes(r)) || (g = null, S(n), n?.length && J(n, !0));
  }, F = (e, t) => {
    if (!("ariaExpanded" in e))
      return;
    const n = t.filter((r) => !r.triggerDisabled);
    if (n.length) {
      e.ariaExpanded = fe(n.some((r) => r.open)), c.add(e);
      return;
    }
    c.has(e) && (e.ariaExpanded = null, c.delete(e));
  }, I = (e, t, n = !t.triggerDisabled) => {
    if (!("ariaControlsElements" in e))
      return;
    const r = e.ariaControlsElements ?? [], s = r.includes(t.el), d = o.get(e);
    if (!n) {
      if (!d?.has(t))
        return;
      const H = r.filter((se) => se !== t.el);
      e.ariaControlsElements = H.length > 0 ? H : null, d?.delete(t);
      return;
    }
    s || (e.ariaControlsElements = [...r, t.el], d ? d.add(t) : o.set(e, new WeakSet([t])));
  }, K = (e, t) => {
    !t || !e.referenceElementType || i.click && (I(t, e), F(t, a.get(t) ?? []));
  }, Z = (e) => {
    e.addEventListener("focusin", L);
  }, ee = (e) => {
    e.removeEventListener("focusin", L);
  }, te = (e) => {
    const t = u.get(e), n = (typeof t == "number" ? t : 0) + 1;
    n === 1 && Z(e), u.set(e, n);
  }, ne = (e) => {
    const t = u.get(e), n = typeof t == "number" ? t : 0, r = Math.max(0, n - 1);
    if (n > 0 && r === 0) {
      ee(e), u.delete(e);
      return;
    }
    r > 0 && u.set(e, r);
  }, re = (e, t) => {
    if (!t || !e.referenceElementType)
      return;
    const n = a.get(t) ?? [];
    if (n.includes(e))
      return;
    if (i.hover && "ariaDescribedByElements" in t) {
      const s = t.ariaDescribedByElements ?? [];
      if (!s.includes(e.el)) {
        const d = [...s, e.el];
        t.ariaDescribedByElements = d;
      }
    }
    l++, a.set(t, [...n, e]);
    const r = i.hover ? Y(t) : null;
    r && te(r), l === 1 && G(), K(e, t);
  }, q = (e) => {
    l--, e && ne(e);
  };
  return {
    registerElement: re,
    unregisterElement: (e, t) => {
      if (!t || !e.referenceElementType)
        return;
      const n = i.hover ? Y(t) : null, r = a.get(t) ?? [], s = r.filter((d) => d !== e);
      if (s.length > 0 ? (a.set(t, s), s.length !== r.length && q(n)) : a.delete(t) && q(n), l === 0 && (Q(), h()), i.click && (I(t, e, !1), F(t, s)), i.hover && "ariaDescribedByElements" in t) {
        const d = (t.ariaDescribedByElements ?? []).filter((H) => H !== e.el);
        t.ariaDescribedByElements = d.length > 0 ? d : null;
      }
    },
    updateElement: K
  };
};
export {
  He as r,
  Le as u
};
