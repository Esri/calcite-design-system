import { D as te } from "./index.js";
import { a as ee } from "./dom.js";
import { d as ne } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const Wt = ["top", "right", "bottom", "left"], At = ["start", "end"], St = /* @__PURE__ */ Wt.reduce((t, e) => t.concat(e, e + "-" + At[0], e + "-" + At[1]), []), K = Math.min, X = Math.max, it = Math.round, ot = Math.floor, M = (t) => ({
  x: t,
  y: t
}), oe = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ie = {
  start: "end",
  end: "start"
};
function ht(t, e, n) {
  return X(t, K(e, n));
}
function q(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function V(t) {
  return t.split("-")[0];
}
function k(t) {
  return t.split("-")[1];
}
function Vt(t) {
  return t === "x" ? "y" : "x";
}
function xt(t) {
  return t === "y" ? "height" : "width";
}
const se = /* @__PURE__ */ new Set(["top", "bottom"]);
function I(t) {
  return se.has(V(t)) ? "y" : "x";
}
function bt(t) {
  return Vt(I(t));
}
function Ht(t, e, n) {
  n === void 0 && (n = !1);
  const o = k(t), i = bt(t), r = xt(i);
  let s = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (s = rt(s)), [s, rt(s)];
}
function re(t) {
  const e = rt(t);
  return [st(t), e, st(e)];
}
function st(t) {
  return t.replace(/start|end/g, (e) => ie[e]);
}
const Rt = ["left", "right"], Pt = ["right", "left"], ce = ["top", "bottom"], le = ["bottom", "top"];
function ae(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? Pt : Rt : e ? Rt : Pt;
    case "left":
    case "right":
      return e ? ce : le;
    default:
      return [];
  }
}
function fe(t, e, n, o) {
  const i = k(t);
  let r = ae(V(t), n === "start", o);
  return i && (r = r.map((s) => s + "-" + i), e && (r = r.concat(r.map(st)))), r;
}
function rt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => oe[e]);
}
function ue(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function _t(t) {
  return typeof t != "number" ? ue(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function ct(t) {
  const {
    x: e,
    y: n,
    width: o,
    height: i
  } = t;
  return {
    width: o,
    height: i,
    top: n,
    left: e,
    right: e + o,
    bottom: n + i,
    x: e,
    y: n
  };
}
function Ct(t, e, n) {
  let {
    reference: o,
    floating: i
  } = t;
  const r = I(e), s = bt(e), c = xt(s), a = V(e), l = r === "y", d = o.x + o.width / 2 - i.width / 2, u = o.y + o.height / 2 - i.height / 2, m = o[c] / 2 - i[c] / 2;
  let f;
  switch (a) {
    case "top":
      f = {
        x: d,
        y: o.y - i.height
      };
      break;
    case "bottom":
      f = {
        x: d,
        y: o.y + o.height
      };
      break;
    case "right":
      f = {
        x: o.x + o.width,
        y: u
      };
      break;
    case "left":
      f = {
        x: o.x - i.width,
        y: u
      };
      break;
    default:
      f = {
        x: o.x,
        y: o.y
      };
  }
  switch (k(e)) {
    case "start":
      f[s] -= m * (n && l ? -1 : 1);
      break;
    case "end":
      f[s] += m * (n && l ? -1 : 1);
      break;
  }
  return f;
}
const de = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: s
  } = n, c = r.filter(Boolean), a = await (s.isRTL == null ? void 0 : s.isRTL(e));
  let l = await s.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: d,
    y: u
  } = Ct(l, o, a), m = o, f = {}, g = 0;
  for (let p = 0; p < c.length; p++) {
    const {
      name: h,
      fn: w
    } = c[p], {
      x: y,
      y: x,
      data: v,
      reset: b
    } = await w({
      x: d,
      y: u,
      initialPlacement: o,
      placement: m,
      strategy: i,
      middlewareData: f,
      rects: l,
      platform: s,
      elements: {
        reference: t,
        floating: e
      }
    });
    d = y ?? d, u = x ?? u, f = {
      ...f,
      [h]: {
        ...f[h],
        ...v
      }
    }, b && g <= 50 && (g++, typeof b == "object" && (b.placement && (m = b.placement), b.rects && (l = b.rects === !0 ? await s.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : b.rects), {
      x: d,
      y: u
    } = Ct(l, m, a)), p = -1);
  }
  return {
    x: d,
    y: u,
    placement: m,
    strategy: i,
    middlewareData: f
  };
};
async function Z(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: o,
    y: i,
    platform: r,
    rects: s,
    elements: c,
    strategy: a
  } = t, {
    boundary: l = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: u = "floating",
    altBoundary: m = !1,
    padding: f = 0
  } = q(e, t), g = _t(f), h = c[m ? u === "floating" ? "reference" : "floating" : u], w = ct(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(h))) == null || n ? h : h.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(c.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: a
  })), y = u === "floating" ? {
    x: o,
    y: i,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, x = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c.floating)), v = await (r.isElement == null ? void 0 : r.isElement(x)) ? await (r.getScale == null ? void 0 : r.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, b = ct(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: y,
    offsetParent: x,
    strategy: a
  }) : y);
  return {
    top: (w.top - b.top + g.top) / v.y,
    bottom: (b.bottom - w.bottom + g.bottom) / v.y,
    left: (w.left - b.left + g.left) / v.x,
    right: (b.right - w.right + g.right) / v.x
  };
}
const me = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: o,
      placement: i,
      rects: r,
      platform: s,
      elements: c,
      middlewareData: a
    } = e, {
      element: l,
      padding: d = 0
    } = q(t, e) || {};
    if (l == null)
      return {};
    const u = _t(d), m = {
      x: n,
      y: o
    }, f = bt(i), g = xt(f), p = await s.getDimensions(l), h = f === "y", w = h ? "top" : "left", y = h ? "bottom" : "right", x = h ? "clientHeight" : "clientWidth", v = r.reference[g] + r.reference[f] - m[f] - r.floating[g], b = m[f] - r.reference[f], S = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let A = S ? S[x] : 0;
    (!A || !await (s.isElement == null ? void 0 : s.isElement(S))) && (A = c.floating[x] || r.floating[g]);
    const H = v / 2 - b / 2, C = A / 2 - p[g] / 2 - 1, O = K(u[w], C), E = K(u[y], C), $ = O, z = A - p[g] - E, R = A / 2 - p[g] / 2 + H, j = ht($, R, z), W = !a.arrow && k(i) != null && R !== j && r.reference[g] / 2 - (R < $ ? O : E) - p[g] / 2 < 0, T = W ? R < $ ? R - $ : R - z : 0;
    return {
      [f]: m[f] + T,
      data: {
        [f]: j,
        centerOffset: R - j - T,
        ...W && {
          alignmentOffset: T
        }
      },
      reset: W
    };
  }
});
function ge(t, e, n) {
  return (t ? [...n.filter((i) => k(i) === t), ...n.filter((i) => k(i) !== t)] : n.filter((i) => V(i) === i)).filter((i) => t ? k(i) === t || (e ? st(i) !== i : !1) : !0);
}
const pe = function(t) {
  return t === void 0 && (t = {}), {
    name: "autoPlacement",
    options: t,
    async fn(e) {
      var n, o, i;
      const {
        rects: r,
        middlewareData: s,
        placement: c,
        platform: a,
        elements: l
      } = e, {
        crossAxis: d = !1,
        alignment: u,
        allowedPlacements: m = St,
        autoAlignment: f = !0,
        ...g
      } = q(t, e), p = u !== void 0 || m === St ? ge(u || null, f, m) : m, h = await Z(e, g), w = ((n = s.autoPlacement) == null ? void 0 : n.index) || 0, y = p[w];
      if (y == null)
        return {};
      const x = Ht(y, r, await (a.isRTL == null ? void 0 : a.isRTL(l.floating)));
      if (c !== y)
        return {
          reset: {
            placement: p[0]
          }
        };
      const v = [h[V(y)], h[x[0]], h[x[1]]], b = [...((o = s.autoPlacement) == null ? void 0 : o.overflows) || [], {
        placement: y,
        overflows: v
      }], S = p[w + 1];
      if (S)
        return {
          data: {
            index: w + 1,
            overflows: b
          },
          reset: {
            placement: S
          }
        };
      const A = b.map((O) => {
        const E = k(O.placement);
        return [O.placement, E && d ? (
          // Check along the mainAxis and main crossAxis side.
          O.overflows.slice(0, 2).reduce(($, z) => $ + z, 0)
        ) : (
          // Check only the mainAxis.
          O.overflows[0]
        ), O.overflows];
      }).sort((O, E) => O[1] - E[1]), C = ((i = A.filter((O) => O[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        k(O[0]) ? 2 : 3
      ).every((E) => E <= 0))[0]) == null ? void 0 : i[0]) || A[0][0];
      return C !== c ? {
        data: {
          index: w + 1,
          overflows: b
        },
        reset: {
          placement: C
        }
      } : {};
    }
  };
}, he = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: i,
        middlewareData: r,
        rects: s,
        initialPlacement: c,
        platform: a,
        elements: l
      } = e, {
        mainAxis: d = !0,
        crossAxis: u = !0,
        fallbackPlacements: m,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: p = !0,
        ...h
      } = q(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const w = V(i), y = I(c), x = V(c) === c, v = await (a.isRTL == null ? void 0 : a.isRTL(l.floating)), b = m || (x || !p ? [rt(c)] : re(c)), S = g !== "none";
      !m && S && b.push(...fe(c, p, g, v));
      const A = [c, ...b], H = await Z(e, h), C = [];
      let O = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (d && C.push(H[w]), u) {
        const R = Ht(i, s, v);
        C.push(H[R[0]], H[R[1]]);
      }
      if (O = [...O, {
        placement: i,
        overflows: C
      }], !C.every((R) => R <= 0)) {
        var E, $;
        const R = (((E = r.flip) == null ? void 0 : E.index) || 0) + 1, j = A[R];
        if (j && (!(u === "alignment" ? y !== I(j) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        O.every((L) => I(L.placement) === y ? L.overflows[0] > 0 : !0)))
          return {
            data: {
              index: R,
              overflows: O
            },
            reset: {
              placement: j
            }
          };
        let W = ($ = O.filter((T) => T.overflows[0] <= 0).sort((T, L) => T.overflows[1] - L.overflows[1])[0]) == null ? void 0 : $.placement;
        if (!W)
          switch (f) {
            case "bestFit": {
              var z;
              const T = (z = O.filter((L) => {
                if (S) {
                  const _ = I(L.placement);
                  return _ === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  _ === "y";
                }
                return !0;
              }).map((L) => [L.placement, L.overflows.filter((_) => _ > 0).reduce((_, Zt) => _ + Zt, 0)]).sort((L, _) => L[1] - _[1])[0]) == null ? void 0 : z[0];
              T && (W = T);
              break;
            }
            case "initialPlacement":
              W = c;
              break;
          }
        if (i !== W)
          return {
            reset: {
              placement: W
            }
          };
      }
      return {};
    }
  };
};
function Et(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function Tt(t) {
  return Wt.some((e) => t[e] >= 0);
}
const we = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: o = "referenceHidden",
        ...i
      } = q(t, e);
      switch (o) {
        case "referenceHidden": {
          const r = await Z(e, {
            ...i,
            elementContext: "reference"
          }), s = Et(r, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: Tt(s)
            }
          };
        }
        case "escaped": {
          const r = await Z(e, {
            ...i,
            altBoundary: !0
          }), s = Et(r, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: Tt(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, ye = /* @__PURE__ */ new Set(["left", "top"]);
async function xe(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, r = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), s = V(n), c = k(n), a = I(n) === "y", l = ye.has(s) ? -1 : 1, d = r && a ? -1 : 1, u = q(e, t);
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
  return c && typeof g == "number" && (f = c === "end" ? g * -1 : g), a ? {
    x: f * d,
    y: m * l
  } : {
    x: m * l,
    y: f * d
  };
}
const be = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, o;
      const {
        x: i,
        y: r,
        placement: s,
        middlewareData: c
      } = e, a = await xe(e, t);
      return s === ((n = c.offset) == null ? void 0 : n.placement) && (o = c.arrow) != null && o.alignmentOffset ? {} : {
        x: i + a.x,
        y: r + a.y,
        data: {
          ...a,
          placement: s
        }
      };
    }
  };
}, ve = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: o,
        placement: i
      } = e, {
        mainAxis: r = !0,
        crossAxis: s = !1,
        limiter: c = {
          fn: (h) => {
            let {
              x: w,
              y
            } = h;
            return {
              x: w,
              y
            };
          }
        },
        ...a
      } = q(t, e), l = {
        x: n,
        y: o
      }, d = await Z(e, a), u = I(V(i)), m = Vt(u);
      let f = l[m], g = l[u];
      if (r) {
        const h = m === "y" ? "top" : "left", w = m === "y" ? "bottom" : "right", y = f + d[h], x = f - d[w];
        f = ht(y, f, x);
      }
      if (s) {
        const h = u === "y" ? "top" : "left", w = u === "y" ? "bottom" : "right", y = g + d[h], x = g - d[w];
        g = ht(y, g, x);
      }
      const p = c.fn({
        ...e,
        [m]: f,
        [u]: g
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - o,
          enabled: {
            [m]: r,
            [u]: s
          }
        }
      };
    }
  };
};
function at() {
  return typeof window < "u";
}
function Q(t) {
  return It(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function P(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function N(t) {
  var e;
  return (e = (It(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function It(t) {
  return at() ? t instanceof Node || t instanceof P(t).Node : !1;
}
function D(t) {
  return at() ? t instanceof Element || t instanceof P(t).Element : !1;
}
function B(t) {
  return at() ? t instanceof HTMLElement || t instanceof P(t).HTMLElement : !1;
}
function Lt(t) {
  return !at() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof P(t).ShadowRoot;
}
const Oe = /* @__PURE__ */ new Set(["inline", "contents"]);
function nt(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = F(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !Oe.has(i);
}
const Ae = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Se(t) {
  return Ae.has(Q(t));
}
const Re = [":popover-open", ":modal"];
function ft(t) {
  return Re.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const Pe = ["transform", "translate", "scale", "rotate", "perspective"], Ce = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Ee = ["paint", "layout", "strict", "content"];
function ut(t) {
  const e = vt(), n = D(t) ? F(t) : t;
  return Pe.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || Ce.some((o) => (n.willChange || "").includes(o)) || Ee.some((o) => (n.contain || "").includes(o));
}
function Te(t) {
  let e = U(t);
  for (; B(e) && !J(e); ) {
    if (ut(e))
      return e;
    if (ft(e))
      return null;
    e = U(e);
  }
  return null;
}
function vt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Le = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function J(t) {
  return Le.has(Q(t));
}
function F(t) {
  return P(t).getComputedStyle(t);
}
function dt(t) {
  return D(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function U(t) {
  if (Q(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Lt(t) && t.host || // Fallback.
    N(t)
  );
  return Lt(e) ? e.host : e;
}
function Ut(t) {
  const e = U(t);
  return J(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : B(e) && nt(e) ? e : Ut(e);
}
function tt(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Ut(t), r = i === ((o = t.ownerDocument) == null ? void 0 : o.body), s = P(i);
  if (r) {
    const c = wt(s);
    return e.concat(s, s.visualViewport || [], nt(i) ? i : [], c && n ? tt(c) : []);
  }
  return e.concat(i, tt(i, [], n));
}
function wt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function zt(t) {
  const e = F(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = B(t), r = i ? t.offsetWidth : n, s = i ? t.offsetHeight : o, c = it(n) !== r || it(o) !== s;
  return c && (n = r, o = s), {
    width: n,
    height: o,
    $: c
  };
}
function Ot(t) {
  return D(t) ? t : t.contextElement;
}
function G(t) {
  const e = Ot(t);
  if (!B(e))
    return M(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: r
  } = zt(e);
  let s = (r ? it(n.width) : n.width) / o, c = (r ? it(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: s,
    y: c
  };
}
const De = /* @__PURE__ */ M(0);
function jt(t) {
  const e = P(t);
  return !vt() || !e.visualViewport ? De : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Fe(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== P(t) ? !1 : e;
}
function Y(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), r = Ot(t);
  let s = M(1);
  e && (o ? D(o) && (s = G(o)) : s = G(t));
  const c = Fe(r, n, o) ? jt(r) : M(0);
  let a = (i.left + c.x) / s.x, l = (i.top + c.y) / s.y, d = i.width / s.x, u = i.height / s.y;
  if (r) {
    const m = P(r), f = o && D(o) ? P(o) : o;
    let g = m, p = wt(g);
    for (; p && o && f !== g; ) {
      const h = G(p), w = p.getBoundingClientRect(), y = F(p), x = w.left + (p.clientLeft + parseFloat(y.paddingLeft)) * h.x, v = w.top + (p.clientTop + parseFloat(y.paddingTop)) * h.y;
      a *= h.x, l *= h.y, d *= h.x, u *= h.y, a += x, l += v, g = P(p), p = wt(g);
    }
  }
  return ct({
    width: d,
    height: u,
    x: a,
    y: l
  });
}
function mt(t, e) {
  const n = dt(t).scrollLeft;
  return e ? e.left + n : Y(N(t)).left + n;
}
function Xt(t, e) {
  const n = t.getBoundingClientRect(), o = n.left + e.scrollLeft - mt(t, n), i = n.top + e.scrollTop;
  return {
    x: o,
    y: i
  };
}
function Me(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const r = i === "fixed", s = N(o), c = e ? ft(e.floating) : !1;
  if (o === s || c && r)
    return n;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = M(1);
  const d = M(0), u = B(o);
  if ((u || !u && !r) && ((Q(o) !== "body" || nt(s)) && (a = dt(o)), B(o))) {
    const f = Y(o);
    l = G(o), d.x = f.x + o.clientLeft, d.y = f.y + o.clientTop;
  }
  const m = s && !u && !r ? Xt(s, a) : M(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - a.scrollLeft * l.x + d.x + m.x,
    y: n.y * l.y - a.scrollTop * l.y + d.y + m.y
  };
}
function ke(t) {
  return Array.from(t.getClientRects());
}
function Be(t) {
  const e = N(t), n = dt(t), o = t.ownerDocument.body, i = X(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), r = X(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let s = -n.scrollLeft + mt(t);
  const c = -n.scrollTop;
  return F(o).direction === "rtl" && (s += X(e.clientWidth, o.clientWidth) - i), {
    width: i,
    height: r,
    x: s,
    y: c
  };
}
const Dt = 25;
function Ne(t, e) {
  const n = P(t), o = N(t), i = n.visualViewport;
  let r = o.clientWidth, s = o.clientHeight, c = 0, a = 0;
  if (i) {
    r = i.width, s = i.height;
    const d = vt();
    (!d || d && e === "fixed") && (c = i.offsetLeft, a = i.offsetTop);
  }
  const l = mt(o);
  if (l <= 0) {
    const d = o.ownerDocument, u = d.body, m = getComputedStyle(u), f = d.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, g = Math.abs(o.clientWidth - u.clientWidth - f);
    g <= Dt && (r -= g);
  } else l <= Dt && (r += l);
  return {
    width: r,
    height: s,
    x: c,
    y: a
  };
}
const $e = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function We(t, e) {
  const n = Y(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, r = B(t) ? G(t) : M(1), s = t.clientWidth * r.x, c = t.clientHeight * r.y, a = i * r.x, l = o * r.y;
  return {
    width: s,
    height: c,
    x: a,
    y: l
  };
}
function Ft(t, e, n) {
  let o;
  if (e === "viewport")
    o = Ne(t, n);
  else if (e === "document")
    o = Be(N(t));
  else if (D(e))
    o = We(e, n);
  else {
    const i = jt(t);
    o = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return ct(o);
}
function Yt(t, e) {
  const n = U(t);
  return n === e || !D(n) || J(n) ? !1 : F(n).position === "fixed" || Yt(n, e);
}
function Ve(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = tt(t, [], !1).filter((c) => D(c) && Q(c) !== "body"), i = null;
  const r = F(t).position === "fixed";
  let s = r ? U(t) : t;
  for (; D(s) && !J(s); ) {
    const c = F(s), a = ut(s);
    !a && c.position === "fixed" && (i = null), (r ? !a && !i : !a && c.position === "static" && !!i && $e.has(i.position) || nt(s) && !a && Yt(t, s)) ? o = o.filter((d) => d !== s) : i = c, s = U(s);
  }
  return e.set(t, o), o;
}
function He(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const s = [...n === "clippingAncestors" ? ft(e) ? [] : Ve(e, this._c) : [].concat(n), o], c = s[0], a = s.reduce((l, d) => {
    const u = Ft(e, d, i);
    return l.top = X(u.top, l.top), l.right = K(u.right, l.right), l.bottom = K(u.bottom, l.bottom), l.left = X(u.left, l.left), l;
  }, Ft(e, c, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function _e(t) {
  const {
    width: e,
    height: n
  } = zt(t);
  return {
    width: e,
    height: n
  };
}
function Ie(t, e, n) {
  const o = B(e), i = N(e), r = n === "fixed", s = Y(t, !0, r, e);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = M(0);
  function l() {
    a.x = mt(i);
  }
  if (o || !o && !r)
    if ((Q(e) !== "body" || nt(i)) && (c = dt(e)), o) {
      const f = Y(e, !0, r, e);
      a.x = f.x + e.clientLeft, a.y = f.y + e.clientTop;
    } else i && l();
  r && !o && i && l();
  const d = i && !o && !r ? Xt(i, c) : M(0), u = s.left + c.scrollLeft - a.x - d.x, m = s.top + c.scrollTop - a.y - d.y;
  return {
    x: u,
    y: m,
    width: s.width,
    height: s.height
  };
}
function gt(t) {
  return F(t).position === "static";
}
function Mt(t, e) {
  if (!B(t) || F(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return N(t) === n && (n = n.ownerDocument.body), n;
}
function qt(t, e) {
  const n = P(t);
  if (ft(t))
    return n;
  if (!B(t)) {
    let i = U(t);
    for (; i && !J(i); ) {
      if (D(i) && !gt(i))
        return i;
      i = U(i);
    }
    return n;
  }
  let o = Mt(t, e);
  for (; o && Se(o) && gt(o); )
    o = Mt(o, e);
  return o && J(o) && gt(o) && !ut(o) ? n : o || Te(t) || n;
}
const Ue = async function(t) {
  const e = this.getOffsetParent || qt, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: Ie(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function ze(t) {
  return F(t).direction === "rtl";
}
const yt = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Me,
  getDocumentElement: N,
  getClippingRect: He,
  getOffsetParent: qt,
  getElementRects: Ue,
  getClientRects: ke,
  getDimensions: _e,
  getScale: G,
  isElement: D,
  isRTL: ze
};
function Gt(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function je(t, e) {
  let n = null, o;
  const i = N(t);
  function r() {
    var c;
    clearTimeout(o), (c = n) == null || c.disconnect(), n = null;
  }
  function s(c, a) {
    c === void 0 && (c = !1), a === void 0 && (a = 1), r();
    const l = t.getBoundingClientRect(), {
      left: d,
      top: u,
      width: m,
      height: f
    } = l;
    if (c || e(), !m || !f)
      return;
    const g = ot(u), p = ot(i.clientWidth - (d + m)), h = ot(i.clientHeight - (u + f)), w = ot(d), x = {
      rootMargin: -g + "px " + -p + "px " + -h + "px " + -w + "px",
      threshold: X(0, K(1, a)) || 1
    };
    let v = !0;
    function b(S) {
      const A = S[0].intersectionRatio;
      if (A !== a) {
        if (!v)
          return s();
        A ? s(!1, A) : o = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      A === 1 && !Gt(l, t.getBoundingClientRect()) && s(), v = !1;
    }
    try {
      n = new IntersectionObserver(b, {
        ...x,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(b, x);
    }
    n.observe(t);
  }
  return s(!0), r;
}
function Xe(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = o, l = Ot(t), d = i || r ? [...l ? tt(l) : [], ...tt(e)] : [];
  d.forEach((w) => {
    i && w.addEventListener("scroll", n, {
      passive: !0
    }), r && w.addEventListener("resize", n);
  });
  const u = l && c ? je(l, n) : null;
  let m = -1, f = null;
  s && (f = new ResizeObserver((w) => {
    let [y] = w;
    y && y.target === l && f && (f.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var x;
      (x = f) == null || x.observe(e);
    })), n();
  }), l && !a && f.observe(l), f.observe(e));
  let g, p = a ? Y(t) : null;
  a && h();
  function h() {
    const w = Y(t);
    p && !Gt(p, w) && n(), p = w, g = requestAnimationFrame(h);
  }
  return n(), () => {
    var w;
    d.forEach((y) => {
      i && y.removeEventListener("scroll", n), r && y.removeEventListener("resize", n);
    }), u?.(), (w = f) == null || w.disconnect(), f = null, a && cancelAnimationFrame(g);
  };
}
const Ye = be, qe = pe, Ge = ve, kt = he, Ke = we, Je = me, Qe = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = {
    platform: yt,
    ...n
  }, r = {
    ...i.platform,
    _c: o
  };
  return de(t, e, {
    ...i,
    platform: r
  });
};
function Ze(t) {
  return tn(t);
}
function pt(t) {
  return t.assignedSlot ? t.assignedSlot : t.parentNode instanceof ShadowRoot ? t.parentNode.host : t.parentNode;
}
function tn(t) {
  for (let e = t; e; e = pt(e)) if (e instanceof Element && getComputedStyle(e).display === "none") return null;
  for (let e = pt(t); e; e = pt(e)) {
    if (!(e instanceof Element)) continue;
    const n = getComputedStyle(e);
    if (n.display !== "contents" && (n.position !== "static" || ut(n) || e.tagName === "BODY"))
      return e;
  }
  return null;
}
(function() {
  {
    const e = yt.getOffsetParent;
    yt.getOffsetParent = (n) => e(n, Ze);
  }
})();
function Bt(t) {
  const e = window.devicePixelRatio || 1;
  return Math.round(t * e) / e;
}
const Kt = (
  /* we export arrow function to allow us to spy on it during testing */
  (async (t, {
    referenceEl: e,
    floatingEl: n,
    overlayPositioning: o = "absolute",
    placement: i,
    flipDisabled: r,
    flipPlacements: s,
    offsetDistance: c,
    offsetSkidding: a,
    arrowEl: l,
    type: d
  }) => {
    if (!e || !n)
      return;
    const u = ee(n) === "rtl", {
      x: m,
      y: f,
      placement: g,
      strategy: p,
      middlewareData: h
    } = await Qe(e, n, {
      strategy: o,
      placement: i === "auto" || i === "auto-start" || i === "auto-end" ? void 0 : Nt(i, u),
      middleware: nn({
        placement: i,
        flipDisabled: r,
        flipPlacements: s?.map((v) => Nt(v, u)),
        offsetDistance: c,
        offsetSkidding: a,
        arrowEl: l,
        type: d
      })
    });
    if (l && h.arrow) {
      const { x: v, y: b } = h.arrow, S = g.split("-")[0], A = v != null ? "left" : "top", H = rn[S], C = { left: "", top: "", bottom: "", right: "" };
      "floatingLayout" in t && (t.floatingLayout = S === "left" || S === "right" ? "horizontal" : "vertical"), Object.assign(l.style, {
        ...C,
        [A]: `${A == "left" ? v : b}px`,
        [S]: "100%",
        transform: H
      });
    }
    const y = h.hide?.referenceHidden ? "hidden" : null, x = y ? "none" : null;
    n.setAttribute(en, g), Object.assign(n.style, {
      pointerEvents: x,
      position: p,
      transform: `translate(${Bt(m)}px,${Bt(f)}px)`,
      visibility: y
    });
  })
), en = "data-placement", dn = [
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
], mn = ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"], Jt = [
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
], gn = "bottom-start", pn = "bottom-end", hn = {
  animation: "calcite-floating-ui-anim",
  animationActive: "calcite-floating-ui-anim--active"
};
function nn({
  placement: t,
  flipDisabled: e,
  flipPlacements: n,
  offsetDistance: o,
  offsetSkidding: i,
  arrowEl: r,
  type: s
}) {
  const c = [Ge(), Ke()];
  return s === "menu" && c.push(
    kt({
      fallbackPlacements: n || ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    })
  ), c.push(
    Ye({
      mainAxis: typeof o == "number" ? o : 0,
      crossAxis: typeof i == "number" ? i : 0
    })
  ), t === "auto" || t === "auto-start" || t === "auto-end" ? c.push(
    qe({ alignment: t === "auto-start" ? "start" : t === "auto-end" ? "end" : null })
  ) : e || c.push(kt(n ? { fallbackPlacements: n } : {})), r && c.push(
    Je({
      element: r
    })
  ), c;
}
function on(t) {
  return Jt.includes(t);
}
function wn(t, e) {
  const n = t.filter(on);
  return n.length !== t.length && console.warn(
    `${e.tagName}: Invalid value found in: flipPlacements. Try any of these: ${Jt.map((o) => `"${o}"`).join(", ").trim()}`,
    { el: e }
  ), n;
}
function Nt(t, e = !1) {
  const n = ["left", "right"];
  return e && n.reverse(), t.replace(/leading/gi, n[0]).replace(/trailing/gi, n[1]);
}
async function yn(t, e, n = !1) {
  if (!t.open || !e.floatingEl || !e.referenceEl)
    return;
  if (Object.assign(e.floatingEl.style, {
    display: "block",
    // initial positioning based on https://floating-ui.com/docs/computePosition#initial-layout
    position: e.overlayPositioning ?? "absolute"
  }), !et.get(t))
    return Qt(t);
  await (n ? sn(t) : Kt)(t, e);
}
function sn(t) {
  let e = lt.get(t);
  return e || (e = ne(Kt, te.reposition, {
    edges: ["leading", "trailing"]
  }), lt.set(t, e), e);
}
const rn = {
  top: "",
  left: "rotate(-90deg)",
  bottom: "rotate(180deg)",
  right: "rotate(90deg)"
}, et = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap();
async function Qt(t) {
  const { referenceEl: e, floatingEl: n } = t;
  if (!n.isConnected)
    return;
  const o = Xe;
  et.set(t, { state: "pending" });
  let i;
  const r = o(
    e,
    n,
    // callback is invoked immediately
    () => {
      const s = t.reposition();
      i || (i = s);
    }
  );
  return et.set(t, { state: "active", cleanUp: r }), i;
}
function cn(t) {
  const { floatingEl: e } = t;
  e && Object.assign(e.style, {
    display: "",
    pointerEvents: "",
    position: "",
    transform: "",
    visibility: ""
  });
}
async function xn(t) {
  const { floatingEl: e, referenceEl: n } = t;
  if (cn(t), !(!e || !n) && (ln(t), !!t.open))
    return Qt(t);
}
function ln(t) {
  const e = et.get(t);
  e?.state === "active" && e.cleanUp(), et.delete(t), lt.get(t)?.cancel(), lt.delete(t);
}
const $t = 4, bn = Math.ceil(Math.hypot($t, $t));
export {
  hn as F,
  pn as a,
  ln as b,
  xn as c,
  gn as d,
  bn as e,
  wn as f,
  cn as h,
  mn as m,
  dn as p,
  yn as r
};
