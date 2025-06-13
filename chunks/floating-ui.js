import { D as At } from "./iframe.js";
import { g as Qt } from "./dom.js";
import { d as Zt } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const Nt = ["top", "right", "bottom", "left"], Rt = ["start", "end"], Pt = /* @__PURE__ */ Nt.reduce((t, e) => t.concat(e, e + "-" + Rt[0], e + "-" + Rt[1]), []), K = Math.min, Y = Math.max, it = Math.round, ot = Math.floor, k = (t) => ({
  x: t,
  y: t
}), te = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ee = {
  start: "end",
  end: "start"
};
function pt(t, e, n) {
  return Y(t, K(e, n));
}
function X(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function H(t) {
  return t.split("-")[0];
}
function M(t) {
  return t.split("-")[1];
}
function Wt(t) {
  return t === "x" ? "y" : "x";
}
function yt(t) {
  return t === "y" ? "height" : "width";
}
function I(t) {
  return ["top", "bottom"].includes(H(t)) ? "y" : "x";
}
function xt(t) {
  return Wt(I(t));
}
function Ht(t, e, n) {
  n === void 0 && (n = !1);
  const o = M(t), i = xt(t), r = yt(i);
  let s = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (s = rt(s)), [s, rt(s)];
}
function ne(t) {
  const e = rt(t);
  return [st(t), e, st(e)];
}
function st(t) {
  return t.replace(/start|end/g, (e) => ee[e]);
}
function oe(t, e, n) {
  const o = ["left", "right"], i = ["right", "left"], r = ["top", "bottom"], s = ["bottom", "top"];
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? i : o : e ? o : i;
    case "left":
    case "right":
      return e ? r : s;
    default:
      return [];
  }
}
function ie(t, e, n, o) {
  const i = M(t);
  let r = oe(H(t), n === "start", o);
  return i && (r = r.map((s) => s + "-" + i), e && (r = r.concat(r.map(st)))), r;
}
function rt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => te[e]);
}
function se(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Vt(t) {
  return typeof t != "number" ? se(t) : {
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
  const r = I(e), s = xt(e), c = yt(s), a = H(e), l = r === "y", d = o.x + o.width / 2 - i.width / 2, u = o.y + o.height / 2 - i.height / 2, m = o[c] / 2 - i[c] / 2;
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
  switch (M(e)) {
    case "start":
      f[s] -= m * (n && l ? -1 : 1);
      break;
    case "end":
      f[s] += m * (n && l ? -1 : 1);
      break;
  }
  return f;
}
const re = async (t, e, n) => {
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
      data: b,
      reset: v
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
        ...b
      }
    }, v && g <= 50 && (g++, typeof v == "object" && (v.placement && (m = v.placement), v.rects && (l = v.rects === !0 ? await s.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : v.rects), {
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
  } = X(e, t), g = Vt(f), h = c[m ? u === "floating" ? "reference" : "floating" : u], w = ct(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(h))) == null || n ? h : h.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(c.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: a
  })), y = u === "floating" ? {
    x: o,
    y: i,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, x = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c.floating)), b = await (r.isElement == null ? void 0 : r.isElement(x)) ? await (r.getScale == null ? void 0 : r.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, v = ct(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: y,
    offsetParent: x,
    strategy: a
  }) : y);
  return {
    top: (w.top - v.top + g.top) / b.y,
    bottom: (v.bottom - w.bottom + g.bottom) / b.y,
    left: (w.left - v.left + g.left) / b.x,
    right: (v.right - w.right + g.right) / b.x
  };
}
const ce = (t) => ({
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
    } = X(t, e) || {};
    if (l == null)
      return {};
    const u = Vt(d), m = {
      x: n,
      y: o
    }, f = xt(i), g = yt(f), p = await s.getDimensions(l), h = f === "y", w = h ? "top" : "left", y = h ? "bottom" : "right", x = h ? "clientHeight" : "clientWidth", b = r.reference[g] + r.reference[f] - m[f] - r.floating[g], v = m[f] - r.reference[f], R = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let A = R ? R[x] : 0;
    (!A || !await (s.isElement == null ? void 0 : s.isElement(R))) && (A = c.floating[x] || r.floating[g]);
    const V = b / 2 - v / 2, S = A / 2 - p[g] / 2 - 1, O = K(u[w], S), E = K(u[y], S), N = O, z = A - p[g] - E, P = A / 2 - p[g] / 2 + V, j = pt(N, P, z), W = !a.arrow && M(i) != null && P !== j && r.reference[g] / 2 - (P < N ? O : E) - p[g] / 2 < 0, T = W ? P < N ? P - N : P - z : 0;
    return {
      [f]: m[f] + T,
      data: {
        [f]: j,
        centerOffset: P - j - T,
        ...W && {
          alignmentOffset: T
        }
      },
      reset: W
    };
  }
});
function le(t, e, n) {
  return (t ? [...n.filter((i) => M(i) === t), ...n.filter((i) => M(i) !== t)] : n.filter((i) => H(i) === i)).filter((i) => t ? M(i) === t || (e ? st(i) !== i : !1) : !0);
}
const ae = function(t) {
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
        allowedPlacements: m = Pt,
        autoAlignment: f = !0,
        ...g
      } = X(t, e), p = u !== void 0 || m === Pt ? le(u || null, f, m) : m, h = await Z(e, g), w = ((n = s.autoPlacement) == null ? void 0 : n.index) || 0, y = p[w];
      if (y == null)
        return {};
      const x = Ht(y, r, await (a.isRTL == null ? void 0 : a.isRTL(l.floating)));
      if (c !== y)
        return {
          reset: {
            placement: p[0]
          }
        };
      const b = [h[H(y)], h[x[0]], h[x[1]]], v = [...((o = s.autoPlacement) == null ? void 0 : o.overflows) || [], {
        placement: y,
        overflows: b
      }], R = p[w + 1];
      if (R)
        return {
          data: {
            index: w + 1,
            overflows: v
          },
          reset: {
            placement: R
          }
        };
      const A = v.map((O) => {
        const E = M(O.placement);
        return [O.placement, E && d ? (
          // Check along the mainAxis and main crossAxis side.
          O.overflows.slice(0, 2).reduce((N, z) => N + z, 0)
        ) : (
          // Check only the mainAxis.
          O.overflows[0]
        ), O.overflows];
      }).sort((O, E) => O[1] - E[1]), S = ((i = A.filter((O) => O[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        M(O[0]) ? 2 : 3
      ).every((E) => E <= 0))[0]) == null ? void 0 : i[0]) || A[0][0];
      return S !== c ? {
        data: {
          index: w + 1,
          overflows: v
        },
        reset: {
          placement: S
        }
      } : {};
    }
  };
}, fe = function(t) {
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
      } = X(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const w = H(i), y = I(c), x = H(c) === c, b = await (a.isRTL == null ? void 0 : a.isRTL(l.floating)), v = m || (x || !p ? [rt(c)] : ne(c)), R = g !== "none";
      !m && R && v.push(...ie(c, p, g, b));
      const A = [c, ...v], V = await Z(e, h), S = [];
      let O = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (d && S.push(V[w]), u) {
        const P = Ht(i, s, b);
        S.push(V[P[0]], V[P[1]]);
      }
      if (O = [...O, {
        placement: i,
        overflows: S
      }], !S.every((P) => P <= 0)) {
        var E, N;
        const P = (((E = r.flip) == null ? void 0 : E.index) || 0) + 1, j = A[P];
        if (j && (!(u === "alignment" ? y !== I(j) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        O.every((L) => L.overflows[0] > 0 && I(L.placement) === y)))
          return {
            data: {
              index: P,
              overflows: O
            },
            reset: {
              placement: j
            }
          };
        let W = (N = O.filter((T) => T.overflows[0] <= 0).sort((T, L) => T.overflows[1] - L.overflows[1])[0]) == null ? void 0 : N.placement;
        if (!W)
          switch (f) {
            case "bestFit": {
              var z;
              const T = (z = O.filter((L) => {
                if (R) {
                  const _ = I(L.placement);
                  return _ === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  _ === "y";
                }
                return !0;
              }).map((L) => [L.placement, L.overflows.filter((_) => _ > 0).reduce((_, Jt) => _ + Jt, 0)]).sort((L, _) => L[1] - _[1])[0]) == null ? void 0 : z[0];
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
function St(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function Et(t) {
  return Nt.some((e) => t[e] >= 0);
}
const ue = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: o = "referenceHidden",
        ...i
      } = X(t, e);
      switch (o) {
        case "referenceHidden": {
          const r = await Z(e, {
            ...i,
            elementContext: "reference"
          }), s = St(r, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: Et(s)
            }
          };
        }
        case "escaped": {
          const r = await Z(e, {
            ...i,
            altBoundary: !0
          }), s = St(r, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: Et(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function de(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, r = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), s = H(n), c = M(n), a = I(n) === "y", l = ["left", "top"].includes(s) ? -1 : 1, d = r && a ? -1 : 1, u = X(e, t);
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
const me = function(t) {
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
      } = e, a = await de(e, t);
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
}, ge = function(t) {
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
      } = X(t, e), l = {
        x: n,
        y: o
      }, d = await Z(e, a), u = I(H(i)), m = Wt(u);
      let f = l[m], g = l[u];
      if (r) {
        const h = m === "y" ? "top" : "left", w = m === "y" ? "bottom" : "right", y = f + d[h], x = f - d[w];
        f = pt(y, f, x);
      }
      if (s) {
        const h = u === "y" ? "top" : "left", w = u === "y" ? "bottom" : "right", y = g + d[h], x = g - d[w];
        g = pt(y, g, x);
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
  return _t(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function C(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function $(t) {
  var e;
  return (e = (_t(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function _t(t) {
  return at() ? t instanceof Node || t instanceof C(t).Node : !1;
}
function D(t) {
  return at() ? t instanceof Element || t instanceof C(t).Element : !1;
}
function B(t) {
  return at() ? t instanceof HTMLElement || t instanceof C(t).HTMLElement : !1;
}
function Tt(t) {
  return !at() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof C(t).ShadowRoot;
}
function nt(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = F(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !["inline", "contents"].includes(i);
}
function pe(t) {
  return ["table", "td", "th"].includes(Q(t));
}
function ft(t) {
  return [":popover-open", ":modal"].some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
function ut(t) {
  const e = vt(), n = D(t) ? F(t) : t;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((o) => (n.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (n.contain || "").includes(o));
}
function he(t) {
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
function J(t) {
  return ["html", "body", "#document"].includes(Q(t));
}
function F(t) {
  return C(t).getComputedStyle(t);
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
    Tt(t) && t.host || // Fallback.
    $(t)
  );
  return Tt(e) ? e.host : e;
}
function It(t) {
  const e = U(t);
  return J(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : B(e) && nt(e) ? e : It(e);
}
function tt(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = It(t), r = i === ((o = t.ownerDocument) == null ? void 0 : o.body), s = C(i);
  if (r) {
    const c = ht(s);
    return e.concat(s, s.visualViewport || [], nt(i) ? i : [], c && n ? tt(c) : []);
  }
  return e.concat(i, tt(i, [], n));
}
function ht(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Ut(t) {
  const e = F(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = B(t), r = i ? t.offsetWidth : n, s = i ? t.offsetHeight : o, c = it(n) !== r || it(o) !== s;
  return c && (n = r, o = s), {
    width: n,
    height: o,
    $: c
  };
}
function bt(t) {
  return D(t) ? t : t.contextElement;
}
function G(t) {
  const e = bt(t);
  if (!B(e))
    return k(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: r
  } = Ut(e);
  let s = (r ? it(n.width) : n.width) / o, c = (r ? it(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: s,
    y: c
  };
}
const we = /* @__PURE__ */ k(0);
function zt(t) {
  const e = C(t);
  return !vt() || !e.visualViewport ? we : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ye(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== C(t) ? !1 : e;
}
function q(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), r = bt(t);
  let s = k(1);
  e && (o ? D(o) && (s = G(o)) : s = G(t));
  const c = ye(r, n, o) ? zt(r) : k(0);
  let a = (i.left + c.x) / s.x, l = (i.top + c.y) / s.y, d = i.width / s.x, u = i.height / s.y;
  if (r) {
    const m = C(r), f = o && D(o) ? C(o) : o;
    let g = m, p = ht(g);
    for (; p && o && f !== g; ) {
      const h = G(p), w = p.getBoundingClientRect(), y = F(p), x = w.left + (p.clientLeft + parseFloat(y.paddingLeft)) * h.x, b = w.top + (p.clientTop + parseFloat(y.paddingTop)) * h.y;
      a *= h.x, l *= h.y, d *= h.x, u *= h.y, a += x, l += b, g = C(p), p = ht(g);
    }
  }
  return ct({
    width: d,
    height: u,
    x: a,
    y: l
  });
}
function Ot(t, e) {
  const n = dt(t).scrollLeft;
  return e ? e.left + n : q($(t)).left + n;
}
function jt(t, e, n) {
  n === void 0 && (n = !1);
  const o = t.getBoundingClientRect(), i = o.left + e.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    Ot(t, o)
  )), r = o.top + e.scrollTop;
  return {
    x: i,
    y: r
  };
}
function xe(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const r = i === "fixed", s = $(o), c = e ? ft(e.floating) : !1;
  if (o === s || c && r)
    return n;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = k(1);
  const d = k(0), u = B(o);
  if ((u || !u && !r) && ((Q(o) !== "body" || nt(s)) && (a = dt(o)), B(o))) {
    const f = q(o);
    l = G(o), d.x = f.x + o.clientLeft, d.y = f.y + o.clientTop;
  }
  const m = s && !u && !r ? jt(s, a, !0) : k(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - a.scrollLeft * l.x + d.x + m.x,
    y: n.y * l.y - a.scrollTop * l.y + d.y + m.y
  };
}
function ve(t) {
  return Array.from(t.getClientRects());
}
function be(t) {
  const e = $(t), n = dt(t), o = t.ownerDocument.body, i = Y(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), r = Y(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let s = -n.scrollLeft + Ot(t);
  const c = -n.scrollTop;
  return F(o).direction === "rtl" && (s += Y(e.clientWidth, o.clientWidth) - i), {
    width: i,
    height: r,
    x: s,
    y: c
  };
}
function Oe(t, e) {
  const n = C(t), o = $(t), i = n.visualViewport;
  let r = o.clientWidth, s = o.clientHeight, c = 0, a = 0;
  if (i) {
    r = i.width, s = i.height;
    const l = vt();
    (!l || l && e === "fixed") && (c = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: s,
    x: c,
    y: a
  };
}
function Ae(t, e) {
  const n = q(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, r = B(t) ? G(t) : k(1), s = t.clientWidth * r.x, c = t.clientHeight * r.y, a = i * r.x, l = o * r.y;
  return {
    width: s,
    height: c,
    x: a,
    y: l
  };
}
function Lt(t, e, n) {
  let o;
  if (e === "viewport")
    o = Oe(t, n);
  else if (e === "document")
    o = be($(t));
  else if (D(e))
    o = Ae(e, n);
  else {
    const i = zt(t);
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
function Re(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = tt(t, [], !1).filter((c) => D(c) && Q(c) !== "body"), i = null;
  const r = F(t).position === "fixed";
  let s = r ? U(t) : t;
  for (; D(s) && !J(s); ) {
    const c = F(s), a = ut(s);
    !a && c.position === "fixed" && (i = null), (r ? !a && !i : !a && c.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || nt(s) && !a && Yt(t, s)) ? o = o.filter((d) => d !== s) : i = c, s = U(s);
  }
  return e.set(t, o), o;
}
function Pe(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const s = [...n === "clippingAncestors" ? ft(e) ? [] : Re(e, this._c) : [].concat(n), o], c = s[0], a = s.reduce((l, d) => {
    const u = Lt(e, d, i);
    return l.top = Y(u.top, l.top), l.right = K(u.right, l.right), l.bottom = K(u.bottom, l.bottom), l.left = Y(u.left, l.left), l;
  }, Lt(e, c, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function Ce(t) {
  const {
    width: e,
    height: n
  } = Ut(t);
  return {
    width: e,
    height: n
  };
}
function Se(t, e, n) {
  const o = B(e), i = $(e), r = n === "fixed", s = q(t, !0, r, e);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = k(0);
  function l() {
    a.x = Ot(i);
  }
  if (o || !o && !r)
    if ((Q(e) !== "body" || nt(i)) && (c = dt(e)), o) {
      const f = q(e, !0, r, e);
      a.x = f.x + e.clientLeft, a.y = f.y + e.clientTop;
    } else i && l();
  r && !o && i && l();
  const d = i && !o && !r ? jt(i, c) : k(0), u = s.left + c.scrollLeft - a.x - d.x, m = s.top + c.scrollTop - a.y - d.y;
  return {
    x: u,
    y: m,
    width: s.width,
    height: s.height
  };
}
function mt(t) {
  return F(t).position === "static";
}
function Dt(t, e) {
  if (!B(t) || F(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return $(t) === n && (n = n.ownerDocument.body), n;
}
function qt(t, e) {
  const n = C(t);
  if (ft(t))
    return n;
  if (!B(t)) {
    let i = U(t);
    for (; i && !J(i); ) {
      if (D(i) && !mt(i))
        return i;
      i = U(i);
    }
    return n;
  }
  let o = Dt(t, e);
  for (; o && pe(o) && mt(o); )
    o = Dt(o, e);
  return o && J(o) && mt(o) && !ut(o) ? n : o || he(t) || n;
}
const Ee = async function(t) {
  const e = this.getOffsetParent || qt, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: Se(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Te(t) {
  return F(t).direction === "rtl";
}
const wt = {
  convertOffsetParentRelativeRectToViewportRelativeRect: xe,
  getDocumentElement: $,
  getClippingRect: Pe,
  getOffsetParent: qt,
  getElementRects: Ee,
  getClientRects: ve,
  getDimensions: Ce,
  getScale: G,
  isElement: D,
  isRTL: Te
};
function Xt(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Le(t, e) {
  let n = null, o;
  const i = $(t);
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
      threshold: Y(0, K(1, a)) || 1
    };
    let b = !0;
    function v(R) {
      const A = R[0].intersectionRatio;
      if (A !== a) {
        if (!b)
          return s();
        A ? s(!1, A) : o = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      A === 1 && !Xt(l, t.getBoundingClientRect()) && s(), b = !1;
    }
    try {
      n = new IntersectionObserver(v, {
        ...x,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(v, x);
    }
    n.observe(t);
  }
  return s(!0), r;
}
function De(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = o, l = bt(t), d = i || r ? [...l ? tt(l) : [], ...tt(e)] : [];
  d.forEach((w) => {
    i && w.addEventListener("scroll", n, {
      passive: !0
    }), r && w.addEventListener("resize", n);
  });
  const u = l && c ? Le(l, n) : null;
  let m = -1, f = null;
  s && (f = new ResizeObserver((w) => {
    let [y] = w;
    y && y.target === l && f && (f.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var x;
      (x = f) == null || x.observe(e);
    })), n();
  }), l && !a && f.observe(l), f.observe(e));
  let g, p = a ? q(t) : null;
  a && h();
  function h() {
    const w = q(t);
    p && !Xt(p, w) && n(), p = w, g = requestAnimationFrame(h);
  }
  return n(), () => {
    var w;
    d.forEach((y) => {
      i && y.removeEventListener("scroll", n), r && y.removeEventListener("resize", n);
    }), u?.(), (w = f) == null || w.disconnect(), f = null, a && cancelAnimationFrame(g);
  };
}
const Fe = me, ke = ae, Me = ge, Ft = fe, Be = ue, $e = ce, Ne = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = {
    platform: wt,
    ...n
  }, r = {
    ...i.platform,
    _c: o
  };
  return re(t, e, {
    ...i,
    platform: r
  });
};
function We(t) {
  return He(t);
}
function gt(t) {
  return t.assignedSlot ? t.assignedSlot : t.parentNode instanceof ShadowRoot ? t.parentNode.host : t.parentNode;
}
function He(t) {
  for (let e = t; e; e = gt(e)) if (e instanceof Element && getComputedStyle(e).display === "none") return null;
  for (let e = gt(t); e; e = gt(e)) {
    if (!(e instanceof Element)) continue;
    const n = getComputedStyle(e);
    if (n.display !== "contents" && (n.position !== "static" || ut(n) || e.tagName === "BODY"))
      return e;
  }
  return null;
}
(function() {
  {
    const e = wt.getOffsetParent;
    wt.getOffsetParent = (n) => e(n, We);
  }
})();
function kt(t) {
  const e = window.devicePixelRatio || 1;
  return Math.round(t * e) / e;
}
const Gt = (
  /* we export arrow function to allow us to spy on it during testing */
  async (t, {
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
    const u = Qt(n) === "rtl", {
      x: m,
      y: f,
      placement: g,
      strategy: p,
      middlewareData: h
    } = await Ne(e, n, {
      strategy: o,
      placement: i === "auto" || i === "auto-start" || i === "auto-end" ? void 0 : Bt(i, u),
      middleware: _e({
        placement: i,
        flipDisabled: r,
        flipPlacements: s?.map((b) => Bt(b, u)),
        offsetDistance: c,
        offsetSkidding: a,
        arrowEl: l,
        type: d
      })
    });
    if (l && h.arrow) {
      const { x: b, y: v } = h.arrow, R = g.split("-")[0], A = b != null ? "left" : "top", V = Ue[R], S = { left: "", top: "", bottom: "", right: "" };
      "floatingLayout" in t && (t.floatingLayout = R === "left" || R === "right" ? "horizontal" : "vertical"), Object.assign(l.style, {
        ...S,
        [A]: `${A == "left" ? b : v}px`,
        [R]: "100%",
        transform: V
      });
    }
    const y = h.hide?.referenceHidden ? "hidden" : null, x = y ? "none" : null;
    n.setAttribute(Ve, g), Object.assign(n.style, {
      pointerEvents: x,
      position: p,
      transform: `translate(${kt(m)}px,${kt(f)}px)`,
      visibility: y
    });
  }
), Ve = "data-placement", Ge = [
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
], Ke = ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"], Mt = [
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
], Je = "bottom-start", Qe = "bottom-end", Ze = {
  animation: "calcite-floating-ui-anim",
  animationActive: "calcite-floating-ui-anim--active"
};
function _e({
  placement: t,
  flipDisabled: e,
  flipPlacements: n,
  offsetDistance: o,
  offsetSkidding: i,
  arrowEl: r,
  type: s
}) {
  const c = [Me(), Be()];
  return s === "menu" && c.push(
    Ft({
      fallbackPlacements: n || ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    })
  ), c.push(
    Fe({
      mainAxis: typeof o == "number" ? o : 0,
      crossAxis: typeof i == "number" ? i : 0
    })
  ), t === "auto" || t === "auto-start" || t === "auto-end" ? c.push(
    ke({ alignment: t === "auto-start" ? "start" : t === "auto-end" ? "end" : null })
  ) : e || c.push(Ft(n ? { fallbackPlacements: n } : {})), r && c.push(
    $e({
      element: r
    })
  ), c;
}
function tn(t, e) {
  const n = t.filter(
    (o) => Mt.includes(o)
  );
  return n.length !== t.length && console.warn(
    `${e.tagName}: Invalid value found in: flipPlacements. Try any of these: ${Mt.map((o) => `"${o}"`).join(", ").trim()}`,
    { el: e }
  ), n;
}
function Bt(t, e = !1) {
  const n = ["left", "right"];
  return e && n.reverse(), t.replace(/leading/gi, n[0]).replace(/trailing/gi, n[1]);
}
async function en(t, e, n = !1) {
  if (!t.open || !e.floatingEl || !e.referenceEl)
    return;
  if (Object.assign(e.floatingEl.style, {
    display: "block",
    // initial positioning based on https://floating-ui.com/docs/computePosition#initial-layout
    position: e.overlayPositioning ?? "absolute"
  }), !et.get(t))
    return Kt(t);
  await (n ? Ie(t) : Gt)(t, e);
}
function Ie(t) {
  let e = lt.get(t);
  return e || (e = Zt(Gt, At.reposition, {
    leading: !0,
    maxWait: At.reposition
  }), lt.set(t, e), e);
}
const Ue = {
  top: "",
  left: "rotate(-90deg)",
  bottom: "rotate(180deg)",
  right: "rotate(90deg)"
}, et = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap();
async function Kt(t) {
  const { referenceEl: e, floatingEl: n } = t;
  if (!n.isConnected)
    return;
  const o = De;
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
function ze(t) {
  const { floatingEl: e } = t;
  e && Object.assign(e.style, {
    display: "",
    pointerEvents: "",
    position: "",
    transform: "",
    visibility: ""
  });
}
async function nn(t) {
  const { floatingEl: e, referenceEl: n } = t;
  if (ze(t), !(!e || !n) && (je(t), !!t.open))
    return Kt(t);
}
function je(t) {
  const e = et.get(t);
  e?.state === "active" && e.cleanUp(), et.delete(t), lt.get(t)?.cancel(), lt.delete(t);
}
const $t = 4, on = Math.ceil(Math.hypot($t, $t));
export {
  Ze as F,
  Qe as a,
  je as b,
  nn as c,
  Je as d,
  on as e,
  tn as f,
  ze as h,
  Ke as m,
  Ge as p,
  en as r
};
