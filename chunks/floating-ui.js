import { a as at, i as M, b as $, c as U, d as vt, e as k, f as I, h as dt, j as X, k as tt, l as Kt, m as mt, n as Xt, o as gt, p as ht, q as rt, r as kt } from "./floating-ui.utils.dom.js";
import { D as bt, i as Bt } from "./iframe.js";
import { g as Jt } from "./dom.js";
import { d as Qt } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const $t = ["top", "right", "bottom", "left"], Ot = ["start", "end"], At = /* @__PURE__ */ $t.reduce((t, e) => t.concat(e, e + "-" + Ot[0], e + "-" + Ot[1]), []), G = Math.min, _ = Math.max, et = Math.round, Z = Math.floor, T = (t) => ({
  x: t,
  y: t
}), Zt = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, te = {
  start: "end",
  end: "start"
};
function ft(t, e, n) {
  return _(t, G(e, n));
}
function j(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function B(t) {
  return t.split("-")[0];
}
function L(t) {
  return t.split("-")[1];
}
function Wt(t) {
  return t === "x" ? "y" : "x";
}
function pt(t) {
  return t === "y" ? "height" : "width";
}
function K(t) {
  return ["top", "bottom"].includes(B(t)) ? "y" : "x";
}
function xt(t) {
  return Wt(K(t));
}
function Ht(t, e, n) {
  n === void 0 && (n = !1);
  const i = L(t), o = xt(t), r = pt(o);
  let s = o === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (s = it(s)), [s, it(s)];
}
function ee(t) {
  const e = it(t);
  return [nt(t), e, nt(e)];
}
function nt(t) {
  return t.replace(/start|end/g, (e) => te[e]);
}
function ne(t, e, n) {
  const i = ["left", "right"], o = ["right", "left"], r = ["top", "bottom"], s = ["bottom", "top"];
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? o : i : e ? i : o;
    case "left":
    case "right":
      return e ? r : s;
    default:
      return [];
  }
}
function ie(t, e, n, i) {
  const o = L(t);
  let r = ne(B(t), n === "start", i);
  return o && (r = r.map((s) => s + "-" + o), e && (r = r.concat(r.map(nt)))), r;
}
function it(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Zt[e]);
}
function oe(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Nt(t) {
  return typeof t != "number" ? oe(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function ot(t) {
  const {
    x: e,
    y: n,
    width: i,
    height: o
  } = t;
  return {
    width: i,
    height: o,
    top: n,
    left: e,
    right: e + i,
    bottom: n + o,
    x: e,
    y: n
  };
}
function Pt(t, e, n) {
  let {
    reference: i,
    floating: o
  } = t;
  const r = K(e), s = xt(e), c = pt(s), l = B(e), a = r === "y", d = i.x + i.width / 2 - o.width / 2, u = i.y + i.height / 2 - o.height / 2, m = i[c] / 2 - o[c] / 2;
  let f;
  switch (l) {
    case "top":
      f = {
        x: d,
        y: i.y - o.height
      };
      break;
    case "bottom":
      f = {
        x: d,
        y: i.y + i.height
      };
      break;
    case "right":
      f = {
        x: i.x + i.width,
        y: u
      };
      break;
    case "left":
      f = {
        x: i.x - o.width,
        y: u
      };
      break;
    default:
      f = {
        x: i.x,
        y: i.y
      };
  }
  switch (L(e)) {
    case "start":
      f[s] -= m * (n && a ? -1 : 1);
      break;
    case "end":
      f[s] += m * (n && a ? -1 : 1);
      break;
  }
  return f;
}
const se = async (t, e, n) => {
  const {
    placement: i = "bottom",
    strategy: o = "absolute",
    middleware: r = [],
    platform: s
  } = n, c = r.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(e));
  let a = await s.getElementRects({
    reference: t,
    floating: e,
    strategy: o
  }), {
    x: d,
    y: u
  } = Pt(a, i, l), m = i, f = {}, g = 0;
  for (let h = 0; h < c.length; h++) {
    const {
      name: p,
      fn: x
    } = c[h], {
      x: w,
      y,
      data: b,
      reset: v
    } = await x({
      x: d,
      y: u,
      initialPlacement: i,
      placement: m,
      strategy: o,
      middlewareData: f,
      rects: a,
      platform: s,
      elements: {
        reference: t,
        floating: e
      }
    });
    d = w ?? d, u = y ?? u, f = {
      ...f,
      [p]: {
        ...f[p],
        ...b
      }
    }, v && g <= 50 && (g++, typeof v == "object" && (v.placement && (m = v.placement), v.rects && (a = v.rects === !0 ? await s.getElementRects({
      reference: t,
      floating: e,
      strategy: o
    }) : v.rects), {
      x: d,
      y: u
    } = Pt(a, m, l)), h = -1);
  }
  return {
    x: d,
    y: u,
    placement: m,
    strategy: o,
    middlewareData: f
  };
};
async function J(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: i,
    y: o,
    platform: r,
    rects: s,
    elements: c,
    strategy: l
  } = t, {
    boundary: a = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: u = "floating",
    altBoundary: m = !1,
    padding: f = 0
  } = j(e, t), g = Nt(f), p = c[m ? u === "floating" ? "reference" : "floating" : u], x = ot(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(p))) == null || n ? p : p.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(c.floating)),
    boundary: a,
    rootBoundary: d,
    strategy: l
  })), w = u === "floating" ? {
    x: i,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, y = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c.floating)), b = await (r.isElement == null ? void 0 : r.isElement(y)) ? await (r.getScale == null ? void 0 : r.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, v = ot(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: w,
    offsetParent: y,
    strategy: l
  }) : w);
  return {
    top: (x.top - v.top + g.top) / b.y,
    bottom: (v.bottom - x.bottom + g.bottom) / b.y,
    left: (x.left - v.left + g.left) / b.x,
    right: (v.right - x.right + g.right) / b.x
  };
}
const re = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: i,
      placement: o,
      rects: r,
      platform: s,
      elements: c,
      middlewareData: l
    } = e, {
      element: a,
      padding: d = 0
    } = j(t, e) || {};
    if (a == null)
      return {};
    const u = Nt(d), m = {
      x: n,
      y: i
    }, f = xt(o), g = pt(f), h = await s.getDimensions(a), p = f === "y", x = p ? "top" : "left", w = p ? "bottom" : "right", y = p ? "clientHeight" : "clientWidth", b = r.reference[g] + r.reference[f] - m[f] - r.floating[g], v = m[f] - r.reference[f], P = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a));
    let A = P ? P[y] : 0;
    (!A || !await (s.isElement == null ? void 0 : s.isElement(P))) && (A = c.floating[y] || r.floating[g]);
    const W = b / 2 - v / 2, C = A / 2 - h[g] / 2 - 1, O = G(u[x], C), E = G(u[w], C), F = O, V = A - h[g] - E, R = A / 2 - h[g] / 2 + W, q = ft(F, R, V), D = !l.arrow && L(o) != null && R !== q && r.reference[g] / 2 - (R < F ? O : E) - h[g] / 2 < 0, S = D ? R < F ? R - F : R - V : 0;
    return {
      [f]: m[f] + S,
      data: {
        [f]: q,
        centerOffset: R - q - S,
        ...D && {
          alignmentOffset: S
        }
      },
      reset: D
    };
  }
});
function ce(t, e, n) {
  return (t ? [...n.filter((o) => L(o) === t), ...n.filter((o) => L(o) !== t)] : n.filter((o) => B(o) === o)).filter((o) => t ? L(o) === t || (e ? nt(o) !== o : !1) : !0);
}
const le = function(t) {
  return t === void 0 && (t = {}), {
    name: "autoPlacement",
    options: t,
    async fn(e) {
      var n, i, o;
      const {
        rects: r,
        middlewareData: s,
        placement: c,
        platform: l,
        elements: a
      } = e, {
        crossAxis: d = !1,
        alignment: u,
        allowedPlacements: m = At,
        autoAlignment: f = !0,
        ...g
      } = j(t, e), h = u !== void 0 || m === At ? ce(u || null, f, m) : m, p = await J(e, g), x = ((n = s.autoPlacement) == null ? void 0 : n.index) || 0, w = h[x];
      if (w == null)
        return {};
      const y = Ht(w, r, await (l.isRTL == null ? void 0 : l.isRTL(a.floating)));
      if (c !== w)
        return {
          reset: {
            placement: h[0]
          }
        };
      const b = [p[B(w)], p[y[0]], p[y[1]]], v = [...((i = s.autoPlacement) == null ? void 0 : i.overflows) || [], {
        placement: w,
        overflows: b
      }], P = h[x + 1];
      if (P)
        return {
          data: {
            index: x + 1,
            overflows: v
          },
          reset: {
            placement: P
          }
        };
      const A = v.map((O) => {
        const E = L(O.placement);
        return [O.placement, E && d ? (
          // Check along the mainAxis and main crossAxis side.
          O.overflows.slice(0, 2).reduce((F, V) => F + V, 0)
        ) : (
          // Check only the mainAxis.
          O.overflows[0]
        ), O.overflows];
      }).sort((O, E) => O[1] - E[1]), C = ((o = A.filter((O) => O[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        L(O[0]) ? 2 : 3
      ).every((E) => E <= 0))[0]) == null ? void 0 : o[0]) || A[0][0];
      return C !== c ? {
        data: {
          index: x + 1,
          overflows: v
        },
        reset: {
          placement: C
        }
      } : {};
    }
  };
}, ae = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, i;
      const {
        placement: o,
        middlewareData: r,
        rects: s,
        initialPlacement: c,
        platform: l,
        elements: a
      } = e, {
        mainAxis: d = !0,
        crossAxis: u = !0,
        fallbackPlacements: m,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: h = !0,
        ...p
      } = j(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const x = B(o), w = K(c), y = B(c) === c, b = await (l.isRTL == null ? void 0 : l.isRTL(a.floating)), v = m || (y || !h ? [it(c)] : ee(c)), P = g !== "none";
      !m && P && v.push(...ie(c, h, g, b));
      const A = [c, ...v], W = await J(e, p), C = [];
      let O = ((i = r.flip) == null ? void 0 : i.overflows) || [];
      if (d && C.push(W[x]), u) {
        const R = Ht(o, s, b);
        C.push(W[R[0]], W[R[1]]);
      }
      if (O = [...O, {
        placement: o,
        overflows: C
      }], !C.every((R) => R <= 0)) {
        var E, F;
        const R = (((E = r.flip) == null ? void 0 : E.index) || 0) + 1, q = A[R];
        if (q)
          return {
            data: {
              index: R,
              overflows: O
            },
            reset: {
              placement: q
            }
          };
        let D = (F = O.filter((S) => S.overflows[0] <= 0).sort((S, H) => S.overflows[1] - H.overflows[1])[0]) == null ? void 0 : F.placement;
        if (!D)
          switch (f) {
            case "bestFit": {
              var V;
              const S = (V = O.filter((H) => {
                if (P) {
                  const N = K(H.placement);
                  return N === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  N === "y";
                }
                return !0;
              }).map((H) => [H.placement, H.overflows.filter((N) => N > 0).reduce((N, Gt) => N + Gt, 0)]).sort((H, N) => H[1] - N[1])[0]) == null ? void 0 : V[0];
              S && (D = S);
              break;
            }
            case "initialPlacement":
              D = c;
              break;
          }
        if (o !== D)
          return {
            reset: {
              placement: D
            }
          };
      }
      return {};
    }
  };
};
function Rt(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function Ct(t) {
  return $t.some((e) => t[e] >= 0);
}
const fe = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: i = "referenceHidden",
        ...o
      } = j(t, e);
      switch (i) {
        case "referenceHidden": {
          const r = await J(e, {
            ...o,
            elementContext: "reference"
          }), s = Rt(r, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: Ct(s)
            }
          };
        }
        case "escaped": {
          const r = await J(e, {
            ...o,
            altBoundary: !0
          }), s = Rt(r, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: Ct(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function ue(t, e) {
  const {
    placement: n,
    platform: i,
    elements: o
  } = t, r = await (i.isRTL == null ? void 0 : i.isRTL(o.floating)), s = B(n), c = L(n), l = K(n) === "y", a = ["left", "top"].includes(s) ? -1 : 1, d = r && l ? -1 : 1, u = j(e, t);
  let {
    mainAxis: m,
    crossAxis: f,
    alignmentAxis: g
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return c && typeof g == "number" && (f = c === "end" ? g * -1 : g), l ? {
    x: f * d,
    y: m * a
  } : {
    x: m * a,
    y: f * d
  };
}
const de = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, i;
      const {
        x: o,
        y: r,
        placement: s,
        middlewareData: c
      } = e, l = await ue(e, t);
      return s === ((n = c.offset) == null ? void 0 : n.placement) && (i = c.arrow) != null && i.alignmentOffset ? {} : {
        x: o + l.x,
        y: r + l.y,
        data: {
          ...l,
          placement: s
        }
      };
    }
  };
}, me = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i,
        placement: o
      } = e, {
        mainAxis: r = !0,
        crossAxis: s = !1,
        limiter: c = {
          fn: (p) => {
            let {
              x,
              y: w
            } = p;
            return {
              x,
              y: w
            };
          }
        },
        ...l
      } = j(t, e), a = {
        x: n,
        y: i
      }, d = await J(e, l), u = K(B(o)), m = Wt(u);
      let f = a[m], g = a[u];
      if (r) {
        const p = m === "y" ? "top" : "left", x = m === "y" ? "bottom" : "right", w = f + d[p], y = f - d[x];
        f = ft(w, f, y);
      }
      if (s) {
        const p = u === "y" ? "top" : "left", x = u === "y" ? "bottom" : "right", w = g + d[p], y = g - d[x];
        g = ft(w, g, y);
      }
      const h = c.fn({
        ...e,
        [m]: f,
        [u]: g
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - i,
          enabled: {
            [m]: r,
            [u]: s
          }
        }
      };
    }
  };
};
function It(t) {
  const e = k(t);
  let n = parseFloat(e.width) || 0, i = parseFloat(e.height) || 0;
  const o = I(t), r = o ? t.offsetWidth : n, s = o ? t.offsetHeight : i, c = et(n) !== r || et(i) !== s;
  return c && (n = r, i = s), {
    width: n,
    height: i,
    $: c
  };
}
function wt(t) {
  return M(t) ? t : t.contextElement;
}
function Y(t) {
  const e = wt(t);
  if (!I(e))
    return T(1);
  const n = e.getBoundingClientRect(), {
    width: i,
    height: o,
    $: r
  } = It(e);
  let s = (r ? et(n.width) : n.width) / i, c = (r ? et(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: s,
    y: c
  };
}
const ge = /* @__PURE__ */ T(0);
function Vt(t) {
  const e = U(t);
  return !kt() || !e.visualViewport ? ge : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function he(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== U(t) ? !1 : e;
}
function z(t, e, n, i) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const o = t.getBoundingClientRect(), r = wt(t);
  let s = T(1);
  e && (i ? M(i) && (s = Y(i)) : s = Y(t));
  const c = he(r, n, i) ? Vt(r) : T(0);
  let l = (o.left + c.x) / s.x, a = (o.top + c.y) / s.y, d = o.width / s.x, u = o.height / s.y;
  if (r) {
    const m = U(r), f = i && M(i) ? U(i) : i;
    let g = m, h = vt(g);
    for (; h && i && f !== g; ) {
      const p = Y(h), x = h.getBoundingClientRect(), w = k(h), y = x.left + (h.clientLeft + parseFloat(w.paddingLeft)) * p.x, b = x.top + (h.clientTop + parseFloat(w.paddingTop)) * p.y;
      l *= p.x, a *= p.y, d *= p.x, u *= p.y, l += y, a += b, g = U(h), h = vt(g);
    }
  }
  return ot({
    width: d,
    height: u,
    x: l,
    y: a
  });
}
function yt(t, e) {
  const n = rt(t).scrollLeft;
  return e ? e.left + n : z($(t)).left + n;
}
function Ut(t, e, n) {
  n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), o = i.left + e.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    yt(t, i)
  )), r = i.top + e.scrollTop;
  return {
    x: o,
    y: r
  };
}
function pe(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: i,
    strategy: o
  } = t;
  const r = o === "fixed", s = $(i), c = e ? dt(e.floating) : !1;
  if (i === s || c && r)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = T(1);
  const d = T(0), u = I(i);
  if ((u || !u && !r) && ((gt(i) !== "body" || ht(s)) && (l = rt(i)), I(i))) {
    const f = z(i);
    a = Y(i), d.x = f.x + i.clientLeft, d.y = f.y + i.clientTop;
  }
  const m = s && !u && !r ? Ut(s, l, !0) : T(0);
  return {
    width: n.width * a.x,
    height: n.height * a.y,
    x: n.x * a.x - l.scrollLeft * a.x + d.x + m.x,
    y: n.y * a.y - l.scrollTop * a.y + d.y + m.y
  };
}
function xe(t) {
  return Array.from(t.getClientRects());
}
function we(t) {
  const e = $(t), n = rt(t), i = t.ownerDocument.body, o = _(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth), r = _(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
  let s = -n.scrollLeft + yt(t);
  const c = -n.scrollTop;
  return k(i).direction === "rtl" && (s += _(e.clientWidth, i.clientWidth) - o), {
    width: o,
    height: r,
    x: s,
    y: c
  };
}
function ye(t, e) {
  const n = U(t), i = $(t), o = n.visualViewport;
  let r = i.clientWidth, s = i.clientHeight, c = 0, l = 0;
  if (o) {
    r = o.width, s = o.height;
    const a = kt();
    (!a || a && e === "fixed") && (c = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: r,
    height: s,
    x: c,
    y: l
  };
}
function ve(t, e) {
  const n = z(t, !0, e === "fixed"), i = n.top + t.clientTop, o = n.left + t.clientLeft, r = I(t) ? Y(t) : T(1), s = t.clientWidth * r.x, c = t.clientHeight * r.y, l = o * r.x, a = i * r.y;
  return {
    width: s,
    height: c,
    x: l,
    y: a
  };
}
function Et(t, e, n) {
  let i;
  if (e === "viewport")
    i = ye(t, n);
  else if (e === "document")
    i = we($(t));
  else if (M(e))
    i = ve(e, n);
  else {
    const o = Vt(t);
    i = {
      x: e.x - o.x,
      y: e.y - o.y,
      width: e.width,
      height: e.height
    };
  }
  return ot(i);
}
function _t(t, e) {
  const n = X(t);
  return n === e || !M(n) || tt(n) ? !1 : k(n).position === "fixed" || _t(n, e);
}
function be(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let i = at(t, [], !1).filter((c) => M(c) && gt(c) !== "body"), o = null;
  const r = k(t).position === "fixed";
  let s = r ? X(t) : t;
  for (; M(s) && !tt(s); ) {
    const c = k(s), l = mt(s);
    !l && c.position === "fixed" && (o = null), (r ? !l && !o : !l && c.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || ht(s) && !l && _t(t, s)) ? i = i.filter((d) => d !== s) : o = c, s = X(s);
  }
  return e.set(t, i), i;
}
function Oe(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: i,
    strategy: o
  } = t;
  const s = [...n === "clippingAncestors" ? dt(e) ? [] : be(e, this._c) : [].concat(n), i], c = s[0], l = s.reduce((a, d) => {
    const u = Et(e, d, o);
    return a.top = _(u.top, a.top), a.right = G(u.right, a.right), a.bottom = G(u.bottom, a.bottom), a.left = _(u.left, a.left), a;
  }, Et(e, c, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Ae(t) {
  const {
    width: e,
    height: n
  } = It(t);
  return {
    width: e,
    height: n
  };
}
function Pe(t, e, n) {
  const i = I(e), o = $(e), r = n === "fixed", s = z(t, !0, r, e);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = T(0);
  if (i || !i && !r)
    if ((gt(e) !== "body" || ht(o)) && (c = rt(e)), i) {
      const m = z(e, !0, r, e);
      l.x = m.x + e.clientLeft, l.y = m.y + e.clientTop;
    } else o && (l.x = yt(o));
  const a = o && !i && !r ? Ut(o, c) : T(0), d = s.left + c.scrollLeft - l.x - a.x, u = s.top + c.scrollTop - l.y - a.y;
  return {
    x: d,
    y: u,
    width: s.width,
    height: s.height
  };
}
function ct(t) {
  return k(t).position === "static";
}
function St(t, e) {
  if (!I(t) || k(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return $(t) === n && (n = n.ownerDocument.body), n;
}
function zt(t, e) {
  const n = U(t);
  if (dt(t))
    return n;
  if (!I(t)) {
    let o = X(t);
    for (; o && !tt(o); ) {
      if (M(o) && !ct(o))
        return o;
      o = X(o);
    }
    return n;
  }
  let i = St(t, e);
  for (; i && Kt(i) && ct(i); )
    i = St(i, e);
  return i && tt(i) && ct(i) && !mt(i) ? n : i || Xt(t) || n;
}
const Re = async function(t) {
  const e = this.getOffsetParent || zt, n = this.getDimensions, i = await n(t.floating);
  return {
    reference: Pe(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function Ce(t) {
  return k(t).direction === "rtl";
}
const ut = {
  convertOffsetParentRelativeRectToViewportRelativeRect: pe,
  getDocumentElement: $,
  getClippingRect: Oe,
  getOffsetParent: zt,
  getElementRects: Re,
  getClientRects: xe,
  getDimensions: Ae,
  getScale: Y,
  isElement: M,
  isRTL: Ce
};
function jt(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Ee(t, e) {
  let n = null, i;
  const o = $(t);
  function r() {
    var c;
    clearTimeout(i), (c = n) == null || c.disconnect(), n = null;
  }
  function s(c, l) {
    c === void 0 && (c = !1), l === void 0 && (l = 1), r();
    const a = t.getBoundingClientRect(), {
      left: d,
      top: u,
      width: m,
      height: f
    } = a;
    if (c || e(), !m || !f)
      return;
    const g = Z(u), h = Z(o.clientWidth - (d + m)), p = Z(o.clientHeight - (u + f)), x = Z(d), y = {
      rootMargin: -g + "px " + -h + "px " + -p + "px " + -x + "px",
      threshold: _(0, G(1, l)) || 1
    };
    let b = !0;
    function v(P) {
      const A = P[0].intersectionRatio;
      if (A !== l) {
        if (!b)
          return s();
        A ? s(!1, A) : i = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      A === 1 && !jt(a, t.getBoundingClientRect()) && s(), b = !1;
    }
    try {
      n = new IntersectionObserver(v, {
        ...y,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(v, y);
    }
    n.observe(t);
  }
  return s(!0), r;
}
function Se(t, e, n, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: r = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = i, a = wt(t), d = o || r ? [...a ? at(a) : [], ...at(e)] : [];
  d.forEach((x) => {
    o && x.addEventListener("scroll", n, {
      passive: !0
    }), r && x.addEventListener("resize", n);
  });
  const u = a && c ? Ee(a, n) : null;
  let m = -1, f = null;
  s && (f = new ResizeObserver((x) => {
    let [w] = x;
    w && w.target === a && f && (f.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var y;
      (y = f) == null || y.observe(e);
    })), n();
  }), a && !l && f.observe(a), f.observe(e));
  let g, h = l ? z(t) : null;
  l && p();
  function p() {
    const x = z(t);
    h && !jt(h, x) && n(), h = x, g = requestAnimationFrame(p);
  }
  return n(), () => {
    var x;
    d.forEach((w) => {
      o && w.removeEventListener("scroll", n), r && w.removeEventListener("resize", n);
    }), u?.(), (x = f) == null || x.disconnect(), f = null, l && cancelAnimationFrame(g);
  };
}
const Te = de, Le = le, Fe = me, Tt = ae, De = fe, Me = re, ke = (t, e, n) => {
  const i = /* @__PURE__ */ new Map(), o = {
    platform: ut,
    ...n
  }, r = {
    ...o.platform,
    _c: i
  };
  return se(t, e, {
    ...o,
    platform: r
  });
};
function Be(t) {
  return $e(t);
}
function lt(t) {
  return t.assignedSlot ? t.assignedSlot : t.parentNode instanceof ShadowRoot ? t.parentNode.host : t.parentNode;
}
function $e(t) {
  for (let e = t; e; e = lt(e)) if (e instanceof Element && getComputedStyle(e).display === "none") return null;
  for (let e = lt(t); e; e = lt(e)) {
    if (!(e instanceof Element)) continue;
    const n = getComputedStyle(e);
    if (n.display !== "contents" && (n.position !== "static" || mt(n) || e.tagName === "BODY"))
      return e;
  }
  return null;
}
(function() {
  if (Bt()) {
    const e = ut.getOffsetParent;
    ut.getOffsetParent = (n) => e(n, Be);
  }
})();
function Lt(t) {
  const e = window.devicePixelRatio || 1;
  return Math.round(t * e) / e;
}
const qt = (
  /* we export arrow function to allow us to spy on it during testing */
  async (t, {
    referenceEl: e,
    floatingEl: n,
    overlayPositioning: i = "absolute",
    placement: o,
    flipDisabled: r,
    flipPlacements: s,
    offsetDistance: c,
    offsetSkidding: l,
    arrowEl: a,
    type: d
  }) => {
    if (!e || !n)
      return;
    const u = Jt(n) === "rtl", {
      x: m,
      y: f,
      placement: g,
      strategy: h,
      middlewareData: p
    } = await ke(e, n, {
      strategy: i,
      placement: o === "auto" || o === "auto-start" || o === "auto-end" ? void 0 : Dt(o, u),
      middleware: He({
        placement: o,
        flipDisabled: r,
        flipPlacements: s?.map((b) => Dt(b, u)),
        offsetDistance: c,
        offsetSkidding: l,
        arrowEl: a,
        type: d
      })
    });
    if (a && p.arrow) {
      const { x: b, y: v } = p.arrow, P = g.split("-")[0], A = b != null ? "left" : "top", W = Ie[P], C = { left: "", top: "", bottom: "", right: "" };
      "floatingLayout" in t && (t.floatingLayout = P === "left" || P === "right" ? "horizontal" : "vertical"), Object.assign(a.style, {
        ...C,
        [A]: `${A == "left" ? b : v}px`,
        [P]: "100%",
        transform: W
      });
    }
    const w = p.hide?.referenceHidden ? "hidden" : null, y = w ? "none" : null;
    n.setAttribute(We, g), Object.assign(n.style, {
      pointerEvents: y,
      position: h,
      transform: `translate(${Lt(m)}px,${Lt(f)}px)`,
      visibility: w
    });
  }
), We = "data-placement", Ye = [
  // auto placements
  "auto",
  "auto-start",
  "auto-end",
  // placements
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "right",
  "right-start",
  "right-end",
  "left",
  "left-start",
  "left-end",
  // variation placements
  "leading-start",
  "leading",
  "leading-end",
  "trailing-end",
  "trailing",
  "trailing-start"
], Ge = ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"], Ft = [
  "top",
  "bottom",
  "right",
  "left",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end",
  "leading",
  "trailing",
  "leading-start",
  "leading-end",
  "trailing-start",
  "trailing-end"
], Ke = "bottom-start", Xe = "bottom-end", Je = {
  animation: "calcite-floating-ui-anim",
  animationActive: "calcite-floating-ui-anim--active"
};
function He({
  placement: t,
  flipDisabled: e,
  flipPlacements: n,
  offsetDistance: i,
  offsetSkidding: o,
  arrowEl: r,
  type: s
}) {
  const c = [Fe(), De()];
  return s === "menu" && c.push(
    Tt({
      fallbackPlacements: n || ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    })
  ), c.push(
    Te({
      mainAxis: typeof i == "number" ? i : 0,
      crossAxis: typeof o == "number" ? o : 0
    })
  ), t === "auto" || t === "auto-start" || t === "auto-end" ? c.push(
    Le({ alignment: t === "auto-start" ? "start" : t === "auto-end" ? "end" : null })
  ) : e || c.push(Tt(n ? { fallbackPlacements: n } : {})), r && c.push(
    Me({
      element: r
    })
  ), c;
}
function Qe(t, e) {
  const n = t.filter(
    (i) => Ft.includes(i)
  );
  return n.length !== t.length && console.warn(
    `${e.tagName}: Invalid value found in: flipPlacements. Try any of these: ${Ft.map((i) => `"${i}"`).join(", ").trim()}`,
    { el: e }
  ), n;
}
function Dt(t, e = !1) {
  const n = ["left", "right"];
  return e && n.reverse(), t.replace(/leading/gi, n[0]).replace(/trailing/gi, n[1]);
}
async function Ze(t, e, n = !1) {
  if (!t.open || !e.floatingEl || !e.referenceEl)
    return;
  if (Object.assign(e.floatingEl.style, {
    display: "block",
    // initial positioning based on https://floating-ui.com/docs/computePosition#initial-layout
    position: e.overlayPositioning ?? "absolute"
  }), !Q.get(t))
    return Yt(t);
  await (n ? Ne(t) : qt)(t, e);
}
function Ne(t) {
  let e = st.get(t);
  return e || (e = Qt(qt, bt.reposition, {
    leading: !0,
    maxWait: bt.reposition
  }), st.set(t, e), e);
}
const Ie = {
  top: "",
  left: "rotate(-90deg)",
  bottom: "rotate(180deg)",
  right: "rotate(90deg)"
}, Q = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap();
async function Yt(t) {
  const { referenceEl: e, floatingEl: n } = t;
  if (!n.isConnected)
    return;
  const i = Bt() ? Se : (s, c, l) => (l(), () => {
  });
  Q.set(t, { state: "pending" });
  let o;
  const r = i(
    e,
    n,
    // callback is invoked immediately
    () => {
      const s = t.reposition();
      o || (o = s);
    }
  );
  return Q.set(t, { state: "active", cleanUp: r }), o;
}
function Ve(t) {
  const { floatingEl: e } = t;
  e && Object.assign(e.style, {
    display: "",
    pointerEvents: "",
    position: "",
    transform: "",
    visibility: ""
  });
}
async function tn(t) {
  const { floatingEl: e, referenceEl: n } = t;
  if (Ve(t), !(!e || !n) && (Ue(t), !!t.open))
    return Yt(t);
}
function Ue(t) {
  const { floatingEl: e, referenceEl: n } = t;
  if (!e || !n)
    return;
  const i = Q.get(t);
  i?.state === "active" && i.cleanUp(), Q.delete(t), st.get(t)?.cancel(), st.delete(t);
}
const Mt = 4, en = Math.ceil(Math.hypot(Mt, Mt));
export {
  Je as F,
  Xe as a,
  Ue as b,
  tn as c,
  Ke as d,
  en as e,
  Qe as f,
  Ve as h,
  Ge as m,
  Ye as p,
  Ze as r
};
