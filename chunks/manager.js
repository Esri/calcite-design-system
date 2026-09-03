/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as te } from "./index2.js";
import { q as re, p as se, e as oe, r as ie } from "./dom.js";
import { l as le } from "./index.js";
import { i as ae } from "./key.js";
import { t as N } from "./aria.js";
const Ce = (o) => {
  const { manager: a } = o;
  return te((i, c) => {
    let u, f;
    const E = (l) => !!(l && i.referenceElementType), C = (l) => {
      E(l) && (a.registerElement(i, l), f = l);
    }, v = (l) => {
      E(l) && (a.unregisterElement(i, l), f === l && (f = void 0));
    }, p = (l) => {
      const { referenceElement: g, el: w } = l;
      return (typeof g == "string" ? re(w, { id: g }) : g) || void 0;
    }, m = (l = !0) => {
      if (!i.referenceElementType)
        return;
      i.referenceEl = p(i);
      const { el: g, referenceElement: w, referenceEl: H } = i;
      l && w && !H && le.warn(`${g.tagName}: reference-element id "${w}" was not found.`, {
        el: g
      });
    };
    c.onConnected(() => {
      u = requestAnimationFrame(() => {
        i.el.isConnected && (m(i.manager.loadedCalled), C(i.referenceEl));
      });
    }), c.onLoaded(() => {
      i.referenceElement && !i.referenceEl && m();
    }), c.onUpdate((l) => {
      i.hasUpdated && (l.has("referenceElement") && m(), l.has("referenceEl") ? (v(l.get("referenceEl")), C(i.referenceEl)) : l.has("open") && a.updateElement(i, i.referenceEl));
    }), c.onDisconnected(() => {
      u != null && (cancelAnimationFrame(u), u = void 0), v(f);
    });
  });
};
function q(o, a) {
  if (o === a)
    return !0;
  if (o.length !== a.length)
    return !1;
  const i = new Set(o), c = new Set(a);
  if (i.size !== c.size)
    return !1;
  for (const u of i)
    if (!c.has(u))
      return !1;
  return !0;
}
const ce = 5, R = 300, de = R / 3, ue = R * 1.5;
function fe({
  startX: o,
  startY: a,
  endX: i,
  endY: c
}) {
  return Math.hypot(i - o, c - a) > ce;
}
const pe = (o) => {
  const a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new WeakMap();
  let c = null, u = null, f = null, E = null, C = null, v = null, p = 0;
  const m = (e, n) => {
    const t = e.find((s) => a.has(s));
    if (!t)
      return;
    const r = a.get(t);
    return n ? r?.filter((s) => s.referenceElementType === n) : r;
  }, l = (e, n) => {
    const t = e.composedPath(), r = m(t, n);
    r?.forEach((s) => {
      s && !s.triggerDisabled && (s.open = !s.open);
    }), Array.from(a.values()).flat().filter(
      (s) => !r?.includes(s) && s.autoClose && s.open && !t.includes(s.el)
    ).forEach((s) => s.open = !1);
  }, g = (e) => {
    ie(e) || e.defaultPrevented || v && fe({
      endY: e.clientY,
      endX: e.clientX,
      startY: v.y,
      startX: v.x
    }) || (v = null, l(e, "click"));
  }, w = () => {
    E != null && window.clearTimeout(E), E = null;
  }, H = () => {
    f != null && window.clearTimeout(f), f = null;
  }, h = () => {
    w(), H();
  }, D = (e, n) => !!(c?.some((t) => t?.open && n.includes(t.el)) || e?.some((t) => t?.open && n.includes(t.el))), k = (e, n) => {
    e?.forEach((t) => t.open = n), c = n ? e : null;
  }, y = () => {
    k(c, !1);
  }, F = (e) => {
    if (e.key === "Escape" && !e.defaultPrevented) {
      const n = c?.filter((t) => t?.open);
      if (n?.length) {
        h(), y();
        const t = e.composedPath();
        n.some(
          (r) => r.referenceEl instanceof Element && t.includes(r.referenceEl) || t.includes(r.el)
        ) && e.preventDefault();
      }
    }
  }, I = (e) => {
    if (e.defaultPrevented)
      return;
    u = null;
    const n = e.composedPath(), t = m(n, "hover");
    if (D(t, n)) {
      h();
      return;
    }
    if (y(), !t?.length)
      return;
    h();
    const r = t.filter((d) => d.closeOnClick), s = t.filter((d) => !d.closeOnClick);
    r?.length && (u = r, k(r, !1)), k(s, !0);
  }, T = (e) => {
    if (e.defaultPrevented || !oe(e))
      return;
    const { clientX: n, clientY: t } = e;
    v = { x: n, y: t };
  }, U = (e) => {
    e.defaultPrevented || (e.key === "Escape" ? V() : ae(e.key) && l(e, "click"));
  }, X = (e) => {
    m(e.composedPath())?.forEach((t) => t.onReferenceElementKeyDown?.(e));
  }, V = () => {
    Array.from(a.values()).flat().forEach((e) => e.open = !1);
  }, x = (e) => {
    q(e ?? [], c ?? []) || y();
  }, z = (e) => {
    E = window.setTimeout(
      () => {
        E === null || !q(e ?? [], C ?? []) || (H(), x(e), k(e, !0));
      },
      c?.some((n) => n.open) ? de : R
    );
  }, O = () => {
    f = window.setTimeout(() => {
      f !== null && y();
    }, ue);
  }, S = (e) => {
    if (e.defaultPrevented) {
      y();
      return;
    }
    const n = e.composedPath(), t = m(n, "hover");
    if (D(t, n)) {
      h();
      return;
    }
    t?.some((r) => u?.includes(r)) || (t?.some((r) => C?.includes(r)) || w(), C = t, t?.length ? z(t) : c?.some((r) => r?.open) && O(), u = null);
  }, b = () => {
    y();
  }, A = (e) => {
    e.defaultPrevented || (h(), O());
  }, M = (e) => {
    o.click && g(e), o.hover && I(e);
  }, _ = (e) => {
    X(e), o.click && U(e), o.hover && F(e);
  }, $ = () => {
    (o.click || o.hover) && (window.addEventListener("click", M), window.addEventListener("keydown", _)), o.click && window.addEventListener("pointerdown", T), o.hover && (window.addEventListener("pointermove", S), window.addEventListener("focusin", P), window.addEventListener("blur", b), document.addEventListener("pointerleave", A));
  }, G = () => {
    (o.click || o.hover) && (window.removeEventListener("click", M), window.removeEventListener("keydown", _)), o.click && window.removeEventListener("pointerdown", T), o.hover && (window.removeEventListener("pointermove", S), window.removeEventListener("focusin", P), window.removeEventListener("blur", b), document.removeEventListener("pointerleave", A));
  }, Q = (e, n) => {
    h(), k(e, n);
  }, B = (e) => e instanceof Element ? se(e) : null, P = (e) => {
    if (e.defaultPrevented)
      return;
    const n = e.composedPath(), t = m(n, "hover");
    if (D(t, n)) {
      h();
      return;
    }
    t?.some((r) => u?.includes(r)) || (u = null, x(t), t?.length && Q(t, !0));
  }, Y = (e, n) => {
    if (!(!n || !e.referenceElementType) && o.click && "ariaExpanded" in n) {
      const r = (a.get(n) ?? [])?.some((s) => s.open) ?? !1;
      n.ariaExpanded = N(e.open || r);
    }
  }, W = (e) => {
    e.addEventListener("focusin", P);
  }, j = (e) => {
    e.removeEventListener("focusin", P);
  }, J = (e) => {
    const n = i.get(e), t = (typeof n == "number" ? n : 0) + 1;
    t === 1 && W(e), i.set(e, t);
  }, Z = (e) => {
    const n = i.get(e), t = typeof n == "number" ? n : 0, r = Math.max(0, t - 1);
    if (t > 0 && r === 0) {
      j(e), i.delete(e);
      return;
    }
    r > 0 && i.set(e, r);
  }, ee = (e, n) => {
    if (!n || !e.referenceElementType)
      return;
    const t = a.get(n) ?? [];
    if (t.includes(e))
      return;
    if (o.click && "ariaControlsElements" in n) {
      const s = n.ariaControlsElements ?? [];
      if (!s.includes(e.el)) {
        const d = [...s, e.el];
        n.ariaControlsElements = d;
      }
    }
    if (o.hover && "ariaDescribedByElements" in n) {
      const s = n.ariaDescribedByElements ?? [];
      if (!s.includes(e.el)) {
        const d = [...s, e.el];
        n.ariaDescribedByElements = d;
      }
    }
    p++, a.set(n, [...t, e]);
    const r = o.hover ? B(n) : null;
    r && J(r), p === 1 && $(), Y(e, n);
  }, K = (e) => {
    p--, e && Z(e);
  };
  return {
    registerElement: ee,
    unregisterElement: (e, n) => {
      if (!n || !e.referenceElementType)
        return;
      const t = o.hover ? B(n) : null, r = a.get(n) ?? [], s = r.filter((d) => d !== e);
      if (s.length > 0 ? (a.set(n, s), s.length !== r.length && K(t)) : a.delete(n) && K(t), p === 0 && (G(), h()), o.click && "ariaControlsElements" in n) {
        const d = (n.ariaControlsElements ?? []).filter((L) => L !== e.el);
        n.ariaControlsElements = d.length > 0 ? d : null;
      }
      if (o.click && "ariaExpanded" in n)
        if ((s?.length ?? 0) > 0) {
          const L = s?.some((ne) => ne.open) ?? !1;
          n.ariaExpanded = N(L);
        } else
          n.ariaExpanded = null;
      if (o.hover && "ariaDescribedByElements" in n) {
        const d = (n.ariaDescribedByElements ?? []).filter((L) => L !== e.el);
        n.ariaDescribedByElements = d.length > 0 ? d : null;
      }
    },
    updateElement: Y
  };
};
export {
  pe as r,
  Ce as u
};
