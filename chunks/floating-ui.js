/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { P as Qt, l as Zt } from "./index.js";
import { d as te } from "./debounce.js";
const Wt = ["top", "right", "bottom", "left"], Rt = ["start", "end"], At = /* @__PURE__ */ Wt.reduce((t, e) => t.concat(e, e + "-" + Rt[0], e + "-" + Rt[1]), []), J = Math.min, X = Math.max, ot = Math.round, nt = Math.floor, W = (t) => ({
  x: t,
  y: t
}), ee = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function kt(t, e, n) {
  return X(t, J(e, n));
}
function K(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function V(t) {
  return t.split("-")[0];
}
function D(t) {
  return t.split("-")[1];
}
function _t(t) {
  return t === "x" ? "y" : "x";
}
function xt(t) {
  return t === "y" ? "height" : "width";
}
function B(t) {
  const e = t[0];
  return e === "t" || e === "b" ? "y" : "x";
}
function vt(t) {
  return _t(B(t));
}
function Bt(t, e, n) {
  n === void 0 && (n = !1);
  const o = D(t), i = vt(t), r = xt(i);
  let s = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (s = rt(s)), [s, rt(s)];
}
function ne(t) {
  const e = rt(t);
  return [it(t), e, it(e)];
}
function it(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const Pt = ["left", "right"], Ct = ["right", "left"], oe = ["top", "bottom"], ie = ["bottom", "top"];
function re(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? Ct : Pt : e ? Pt : Ct;
    case "left":
    case "right":
      return e ? oe : ie;
    default:
      return [];
  }
}
function se(t, e, n, o) {
  const i = D(t);
  let r = re(V(t), n === "start", o);
  return i && (r = r.map((s) => s + "-" + i), e && (r = r.concat(r.map(it)))), r;
}
function rt(t) {
  const e = V(t);
  return ee[e] + t.slice(e.length);
}
function ce(t) {
  var e, n, o, i;
  return {
    top: (e = t.top) != null ? e : 0,
    right: (n = t.right) != null ? n : 0,
    bottom: (o = t.bottom) != null ? o : 0,
    left: (i = t.left) != null ? i : 0
  };
}
function Vt(t) {
  return typeof t != "number" ? ce(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function st(t) {
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
function St(t, e, n) {
  let {
    reference: o,
    floating: i
  } = t;
  const r = B(e), s = vt(e), c = xt(s), a = V(e), l = r === "y", d = o.x + o.width / 2 - i.width / 2, u = o.y + o.height / 2 - i.height / 2, m = o[c] / 2 - i[c] / 2;
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
  const g = D(e);
  return g && (f[s] += m * (g === "end" ? 1 : -1) * (n && l ? -1 : 1)), f;
}
async function le(t, e) {
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
  } = K(e, t), g = Vt(f), w = c[m ? u === "floating" ? "reference" : "floating" : u], h = st(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(w))) == null || n ? w : w.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(c.floating)),
    boundary: l,
    rootBoundary: d,
    strategy: a
  })), y = u === "floating" ? {
    x: o,
    y: i,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, x = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c.floating)), b = await (r.isElement == null ? void 0 : r.isElement(x)) && await (r.getScale == null ? void 0 : r.getScale(x)) || {
    x: 1,
    y: 1
  }, R = st(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: y,
    offsetParent: x,
    strategy: a
  }) : y);
  return {
    top: (h.top - R.top + g.top) / b.y,
    bottom: (R.bottom - h.bottom + g.bottom) / b.y,
    left: (h.left - R.left + g.left) / b.x,
    right: (R.right - h.right + g.right) / b.x
  };
}
const ae = 50, fe = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: s
  } = n, c = s.detectOverflow ? s : {
    ...s,
    detectOverflow: le
  }, a = await (s.isRTL == null ? void 0 : s.isRTL(e));
  let l = await s.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: d,
    y: u
  } = St(l, o, a), m = o, f = 0;
  const g = {};
  for (let p = 0; p < r.length; p++) {
    const w = r[p];
    if (!w)
      continue;
    const {
      name: h,
      fn: y
    } = w, {
      x,
      y: b,
      data: R,
      reset: O
    } = await y({
      x: d,
      y: u,
      initialPlacement: o,
      placement: m,
      strategy: i,
      middlewareData: g,
      rects: l,
      platform: c,
      elements: {
        reference: t,
        floating: e
      }
    });
    d = x ?? d, u = b ?? u, g[h] = {
      ...g[h],
      ...R
    }, O && f < ae && (f++, typeof O == "object" && (O.placement && (m = O.placement), O.rects && (l = O.rects === !0 ? await s.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : O.rects), {
      x: d,
      y: u
    } = St(l, m, a)), p = -1);
  }
  return {
    x: d,
    y: u,
    placement: m,
    strategy: i,
    middlewareData: g
  };
}, ue = (t) => ({
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
    } = K(t, e) || {};
    if (l == null)
      return {};
    const u = Vt(d), m = {
      x: n,
      y: o
    }, f = vt(i), g = xt(f), p = await s.getDimensions(l), w = f === "y", h = w ? "top" : "left", y = w ? "bottom" : "right", x = w ? "clientHeight" : "clientWidth", b = r.reference[g] + r.reference[f] - m[f] - r.floating[g], R = m[f] - r.reference[f], O = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let A = O ? O[x] : 0;
    (!A || !await (s.isElement == null ? void 0 : s.isElement(O))) && (A = c.floating[x] || r.floating[g]);
    const S = b / 2 - R / 2, P = A / 2 - p[g] / 2 - 1, v = J(u[h], P), L = J(u[y], P), z = A - p[g] - L, E = A / 2 - p[g] / 2 + S, T = kt(v, E, z), I = !a.arrow && D(i) != null && E !== T && r.reference[g] / 2 - (E < v ? v : L) - p[g] / 2 < 0, N = I ? E < v ? E - v : E - z : 0;
    return {
      [f]: m[f] + N,
      data: {
        [f]: T,
        centerOffset: E - T - N,
        ...I && {
          alignmentOffset: N
        }
      },
      reset: I
    };
  }
});
function de(t, e, n) {
  return (t ? [...n.filter((i) => D(i) === t), ...n.filter((i) => D(i) !== t)] : n.filter((i) => V(i) === i)).filter((i) => t ? D(i) === t || (e ? it(i) !== i : !1) : !0);
}
const me = function(t) {
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
        allowedPlacements: m = At,
        autoAlignment: f = !0,
        ...g
      } = K(t, e), p = u !== void 0 || m === At ? de(u || null, f, m) : m, w = ((n = s.autoPlacement) == null ? void 0 : n.index) || 0, h = p[w];
      if (h == null)
        return {};
      if (c !== h)
        return {
          reset: {
            placement: p[0]
          }
        };
      const y = await a.detectOverflow(e, g), x = Bt(h, r, await (a.isRTL == null ? void 0 : a.isRTL(l.floating))), b = [y[V(h)], y[x[0]], y[x[1]]], R = [...((o = s.autoPlacement) == null ? void 0 : o.overflows) || [], {
        placement: h,
        overflows: b
      }], O = p[w + 1];
      if (O)
        return {
          data: {
            index: w + 1,
            overflows: R
          },
          reset: {
            placement: O
          }
        };
      const A = R.map((v) => {
        const L = D(v.placement);
        return [v.placement, L && d ? (
          // Check along the mainAxis and main crossAxis side.
          v.overflows.slice(0, 2).reduce((z, E) => z + E, 0)
        ) : (
          // Check only the mainAxis.
          v.overflows[0]
        ), v.overflows];
      }).sort((v, L) => v[1] - L[1]), P = ((i = A.filter((v) => v[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        D(v[0]) ? 2 : 3
      ).every((L) => L <= 0))[0]) == null ? void 0 : i[0]) || A[0][0];
      return P !== c ? {
        data: {
          index: w + 1,
          overflows: R
        },
        reset: {
          placement: P
        }
      } : {};
    }
  };
}, ge = function(t) {
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
        ...w
      } = K(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const h = V(i), y = B(c), x = V(c) === c, b = await (a.isRTL == null ? void 0 : a.isRTL(l.floating)), R = m || (x || !p ? [rt(c)] : ne(c)), O = g !== "none";
      !m && O && R.push(...se(c, p, g, b));
      const A = [c, ...R], S = await a.detectOverflow(e, w), P = [];
      let v = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (d && P.push(S[h]), u) {
        const T = Bt(i, s, b);
        P.push(S[T[0]], S[T[1]]);
      }
      if (v = [...v, {
        placement: i,
        overflows: P
      }], !P.every((T) => T <= 0)) {
        var L, z;
        const T = (((L = r.flip) == null ? void 0 : L.index) || 0) + 1, I = A[T];
        if (I && (!(u === "alignment" ? y !== B(I) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        v.every((F) => B(F.placement) === y ? F.overflows[0] > 0 : !0)))
          return {
            data: {
              index: T,
              overflows: v
            },
            reset: {
              placement: I
            }
          };
        let N = (z = v.filter((U) => U.overflows[0] <= 0).sort((U, F) => U.overflows[1] - F.overflows[1])[0]) == null ? void 0 : z.placement;
        if (!N)
          switch (f) {
            case "bestFit": {
              var E;
              const U = (E = v.filter((F) => {
                if (O) {
                  const _ = B(F.placement);
                  return _ === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  _ === "y";
                }
                return !0;
              }).map((F) => [F.placement, F.overflows.filter((_) => _ > 0).reduce((_, Jt) => _ + Jt, 0)]).sort((F, _) => F[1] - _[1])[0]) == null ? void 0 : E[0];
              U && (N = U);
              break;
            }
            case "initialPlacement":
              N = c;
              break;
          }
        if (i !== N)
          return {
            reset: {
              placement: N
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
function Lt(t) {
  return Wt.some((e) => t[e] >= 0);
}
const he = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n,
        platform: o
      } = e, {
        strategy: i = "referenceHidden",
        ...r
      } = K(t, e);
      switch (i) {
        case "referenceHidden": {
          const s = await o.detectOverflow(e, {
            ...r,
            elementContext: "reference"
          }), c = Et(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: c,
              referenceHidden: Lt(c)
            }
          };
        }
        case "escaped": {
          const s = await o.detectOverflow(e, {
            ...r,
            altBoundary: !0
          }), c = Et(s, n.floating);
          return {
            data: {
              escapedOffsets: c,
              escaped: Lt(c)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, pe = /* @__PURE__ */ new Set(["left", "top"]);
async function we(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, r = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), s = V(n), c = D(n), a = B(n) === "y", l = pe.has(s) ? -1 : 1, d = r && a ? -1 : 1, u = K(e, t);
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
const ye = function(t) {
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
      } = e, a = await we(e, t);
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
}, xe = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: o,
        placement: i,
        platform: r
      } = e, {
        mainAxis: s = !0,
        crossAxis: c = !1,
        limiter: a = {
          fn: (y) => {
            let {
              x,
              y: b
            } = y;
            return {
              x,
              y: b
            };
          }
        },
        ...l
      } = K(t, e), d = {
        x: n,
        y: o
      }, u = await r.detectOverflow(e, l), m = B(i), f = _t(m);
      let g = d[f], p = d[m];
      const w = (y, x) => kt(x + u[y === "y" ? "top" : "left"], x, x - u[y === "y" ? "bottom" : "right"]);
      s && (g = w(f, g)), c && (p = w(m, p));
      const h = a.fn({
        ...e,
        [f]: g,
        [m]: p
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - o,
          enabled: {
            [f]: s,
            [m]: c
          }
        }
      };
    }
  };
};
function lt() {
  return typeof window < "u";
}
function Q(t) {
  return Ht(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function C(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function k(t) {
  var e;
  return (e = (Ht(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Ht(t) {
  return lt() ? t instanceof Node || t instanceof C(t).Node : !1;
}
function M(t) {
  return lt() ? t instanceof Element || t instanceof C(t).Element : !1;
}
function H(t) {
  return lt() ? t instanceof HTMLElement || t instanceof C(t).HTMLElement : !1;
}
function Tt(t) {
  return !lt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof C(t).ShadowRoot;
}
function at(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = $(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && i !== "inline" && i !== "contents";
}
function ve(t) {
  return /^(table|td|th)$/.test(Q(t));
}
function ft(t) {
  try {
    if (t.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return t.matches(":modal");
  } catch {
    return !1;
  }
}
const be = /transform|translate|scale|rotate|perspective|filter/, Oe = /paint|layout|strict|content/, j = (t) => !!t && t !== "none";
let gt;
function ut(t) {
  const e = M(t) ? $(t) : t;
  return j(e.transform) || j(e.translate) || j(e.scale) || j(e.rotate) || j(e.perspective) || !bt() && (j(e.backdropFilter) || j(e.filter)) || be.test(e.willChange || "") || Oe.test(e.contain || "");
}
function Re(t) {
  let e = Y(t);
  for (; H(e) && !Z(e); ) {
    if (ut(e))
      return e;
    if (ft(e))
      return null;
    e = Y(e);
  }
  return null;
}
function bt() {
  return gt == null && (gt = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), gt;
}
function Z(t) {
  return /^(html|body|#document)$/.test(Q(t));
}
function $(t) {
  return C(t).getComputedStyle(t);
}
function dt(t) {
  return M(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Y(t) {
  if (Q(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Tt(t) && t.host || // Fallback.
    k(t)
  );
  return Tt(e) ? e.host : e;
}
function zt(t) {
  const e = Y(t);
  return Z(e) ? (t.ownerDocument || t).body : H(e) && at(e) ? e : zt(e);
}
function tt(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = zt(t), r = i === ((o = t.ownerDocument) == null ? void 0 : o.body), s = C(i);
  if (r) {
    const c = wt(s);
    return e.concat(s, s.visualViewport || [], at(i) ? i : [], c && n ? tt(c) : []);
  } else
    return e.concat(i, tt(i, [], n));
}
function wt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function It(t) {
  const e = $(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = H(t), r = i ? t.offsetWidth : n, s = i ? t.offsetHeight : o, c = ot(n) !== r || ot(o) !== s;
  return c && (n = r, o = s), {
    width: n,
    height: o,
    $: c
  };
}
function Ot(t) {
  return M(t) ? t : t.contextElement;
}
function G(t) {
  const e = Ot(t);
  if (!H(e))
    return W(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: r
  } = It(e);
  let s = (r ? ot(n.width) : n.width) / o, c = (r ? ot(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: s,
    y: c
  };
}
const Ae = /* @__PURE__ */ W(0);
function Ut(t) {
  const e = C(t);
  return !bt() || !e.visualViewport ? Ae : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Pe(t, e, n) {
  return e === void 0 && (e = !1), !!n && e && n === C(t);
}
function q(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), r = Ot(t);
  let s = W(1);
  e && (o ? M(o) && (s = G(o)) : s = G(t));
  const c = Pe(r, n, o) ? Ut(r) : W(0);
  let a = (i.left + c.x) / s.x, l = (i.top + c.y) / s.y, d = i.width / s.x, u = i.height / s.y;
  if (r && o) {
    const m = C(r), f = M(o) ? C(o) : o;
    let g = m, p = wt(g);
    for (; p && f !== g; ) {
      const w = G(p), h = p.getBoundingClientRect(), y = $(p), x = h.left + (p.clientLeft + parseFloat(y.paddingLeft)) * w.x, b = h.top + (p.clientTop + parseFloat(y.paddingTop)) * w.y;
      a *= w.x, l *= w.y, d *= w.x, u *= w.y, a += x, l += b, g = C(p), p = wt(g);
    }
  }
  return st({
    width: d,
    height: u,
    x: a,
    y: l
  });
}
function mt(t, e) {
  const n = dt(t).scrollLeft;
  return e ? e.left + n : q(k(t)).left + n;
}
function jt(t, e) {
  const n = t.getBoundingClientRect(), o = n.left + e.scrollLeft - mt(t, n), i = n.top + e.scrollTop;
  return {
    x: o,
    y: i
  };
}
function Ce(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const r = i === "fixed", s = k(o), c = e ? ft(e.floating) : !1;
  if (o === s || c && r)
    return n;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = W(1);
  const d = W(0), u = H(o);
  if ((u || !r) && ((Q(o) !== "body" || at(s)) && (a = dt(o)), u)) {
    const f = q(o);
    l = G(o), d.x = f.x + o.clientLeft, d.y = f.y + o.clientTop;
  }
  const m = s && !u && !r ? jt(s, a) : W(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - a.scrollLeft * l.x + d.x + m.x,
    y: n.y * l.y - a.scrollTop * l.y + d.y + m.y
  };
}
function Se(t) {
  return t.getClientRects ? Array.from(t.getClientRects()) : [];
}
function Ee(t) {
  const e = dt(t), n = t.ownerDocument.body, o = X(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth), i = X(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight);
  let r = -e.scrollLeft + mt(t);
  const s = -e.scrollTop;
  return $(n).direction === "rtl" && (r += X(t.clientWidth, n.clientWidth) - o), {
    width: o,
    height: i,
    x: r,
    y: s
  };
}
const Le = 25;
function Te(t, e, n) {
  n === void 0 && (n = "viewport");
  const o = n === "layoutViewport", i = C(t), r = k(t), s = i.visualViewport;
  let c = r.clientWidth, a = r.clientHeight, l = 0, d = 0;
  if (s) {
    const m = !bt() || e === "fixed";
    o ? m || (l = -s.offsetLeft, d = -s.offsetTop) : (c = s.width, a = s.height, m && (l = s.offsetLeft, d = s.offsetTop));
  }
  if (mt(r) <= 0) {
    const m = r.ownerDocument, f = m.body, g = getComputedStyle(f), p = m.compatMode === "CSS1Compat" && parseFloat(g.marginLeft) + parseFloat(g.marginRight) || 0, w = Math.abs(r.clientWidth - f.clientWidth - p), h = getComputedStyle(r).scrollbarGutter === "stable both-edges" ? w / 2 : w;
    h <= Le && (c -= h);
  }
  return {
    width: c,
    height: a,
    x: l,
    y: d
  };
}
function Fe(t, e) {
  const n = q(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, r = G(t), s = t.clientWidth * r.x, c = t.clientHeight * r.y, a = i * r.x, l = o * r.y;
  return {
    width: s,
    height: c,
    x: a,
    y: l
  };
}
function Ft(t, e, n) {
  let o;
  if (e === "viewport" || e === "layoutViewport")
    o = Te(t, n, e);
  else if (e === "document")
    o = Ee(k(t));
  else if (M(e))
    o = Fe(e, n);
  else {
    const i = Ut(t);
    o = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return st(o);
}
function De(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = tt(t, [], !1).filter((c) => M(c) && Q(c) !== "body"), i = null;
  const r = $(t).position === "fixed";
  let s = r ? Y(t) : t;
  for (; M(s) && !Z(s); ) {
    const c = $(s), a = ut(s), l = i ? i.position : r ? "fixed" : "";
    !a && (l === "fixed" || l === "absolute" && c.position === "static") ? o = o.filter((u) => u !== s) : i = c, s = Y(s);
  }
  return e.set(t, o), o;
}
function Me(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const s = [...n === "clippingAncestors" ? ft(e) ? [] : De(e, this._c) : [].concat(n), o], c = Ft(e, s[0], i);
  let a = c.top, l = c.right, d = c.bottom, u = c.left;
  for (let m = 1; m < s.length; m++) {
    const f = Ft(e, s[m], i);
    a = X(f.top, a), l = J(f.right, l), d = J(f.bottom, d), u = X(f.left, u);
  }
  return {
    width: l - u,
    height: d - a,
    x: u,
    y: a
  };
}
function $e(t) {
  const {
    width: e,
    height: n
  } = It(t);
  return {
    width: e,
    height: n
  };
}
function Ne(t, e, n) {
  const o = H(e), i = k(e), r = n === "fixed", s = q(t, !0, r, e);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = W(0);
  if ((o || !r) && ((Q(e) !== "body" || at(i)) && (c = dt(e)), o)) {
    const m = q(e, !0, r, e);
    a.x = m.x + e.clientLeft, a.y = m.y + e.clientTop;
  }
  !o && i && (a.x = mt(i));
  const l = i && !o && !r ? jt(i, c) : W(0), d = s.left + c.scrollLeft - a.x - l.x, u = s.top + c.scrollTop - a.y - l.y;
  return {
    x: d,
    y: u,
    width: s.width,
    height: s.height
  };
}
function ht(t) {
  return $(t).position === "static";
}
function Dt(t, e) {
  if (!H(t) || $(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return k(t) === n && (n = n.ownerDocument.body), n;
}
function Xt(t, e) {
  const n = C(t);
  if (ft(t))
    return n;
  if (!H(t)) {
    let i = Y(t);
    for (; i && !Z(i); ) {
      if (M(i) && !ht(i))
        return i;
      i = Y(i);
    }
    return n;
  }
  let o = Dt(t, e);
  for (; o && ve(o) && ht(o); )
    o = Dt(o, e);
  return o && Z(o) && ht(o) && !ut(o) ? n : o || Re(t) || n;
}
const We = async function(t) {
  const e = this.getOffsetParent || Xt, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: Ne(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function ke(t) {
  return $(t).direction === "rtl";
}
const yt = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ce,
  getDocumentElement: k,
  getClippingRect: Me,
  getOffsetParent: Xt,
  getElementRects: We,
  getClientRects: Se,
  getDimensions: $e,
  getScale: G,
  isElement: M,
  isRTL: ke
};
function Yt(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function _e(t, e, n) {
  let o = null, i;
  const r = k(t);
  function s() {
    var d;
    clearTimeout(i), (d = o) == null || d.disconnect(), o = null;
  }
  function c(d, u) {
    d === void 0 && (d = !1), u === void 0 && (u = 1), s();
    const m = t.getBoundingClientRect(), {
      left: f,
      top: g,
      width: p,
      height: w
    } = m;
    if (d || e(), !p || !w)
      return;
    const h = nt(g), y = nt(r.clientWidth - (f + p)), x = nt(r.clientHeight - (g + w)), b = nt(f), O = {
      rootMargin: -h + "px " + -y + "px " + -x + "px " + -b + "px",
      threshold: X(0, J(1, u)) || 1
    };
    let A = !0;
    function S(P) {
      const v = P[0].intersectionRatio;
      if (!Yt(m, t.getBoundingClientRect()))
        return c();
      if (v !== u) {
        if (!A)
          return c();
        v ? c(!1, v) : i = setTimeout(() => {
          c(!1, 1e-7);
        }, 1e3);
      }
      A = !1;
    }
    try {
      o = new IntersectionObserver(S, {
        ...O,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      o = new IntersectionObserver(S, O);
    }
    o.observe(t);
  }
  const a = C(t), l = () => c(n);
  return a.addEventListener("resize", l), c(!0), () => {
    a.removeEventListener("resize", l), s();
  };
}
function Be(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = o, l = Ot(t), d = i || r ? [...l ? tt(l) : [], ...e ? tt(e) : []] : [];
  d.forEach((h) => {
    i && h.addEventListener("scroll", n), r && h.addEventListener("resize", n);
  });
  const u = l && c ? _e(l, n, r) : null;
  let m = -1, f = null;
  s && (f = new ResizeObserver((h) => {
    let [y] = h;
    y && y.target === l && f && e && (f.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var x;
      (x = f) == null || x.observe(e);
    })), n();
  }), l && !a && f.observe(l), e && f.observe(e));
  let g, p = a ? q(t) : null;
  a && w();
  function w() {
    const h = q(t);
    p && !Yt(p, h) && n(), p = h, g = requestAnimationFrame(w);
  }
  return n(), () => {
    var h;
    d.forEach((y) => {
      i && y.removeEventListener("scroll", n), r && y.removeEventListener("resize", n);
    }), u?.(), (h = f) == null || h.disconnect(), f = null, a && cancelAnimationFrame(g);
  };
}
const Ve = ye, He = me, ze = xe, Ie = ge, Ue = he, je = ue, Xe = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = n ?? {}, r = {
    ...yt,
    ...i.platform,
    _c: o
  };
  return fe(t, e, {
    ...i,
    platform: r
  });
};
function Ye(t) {
  return qe(t);
}
function pt(t) {
  return t.assignedSlot ? t.assignedSlot : t.parentNode instanceof ShadowRoot ? t.parentNode.host : t.parentNode;
}
function qe(t) {
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
    yt.getOffsetParent = (n) => e(n, Ye);
  }
})();
function Mt(t) {
  const e = window.devicePixelRatio || 1;
  return Math.round(t * e) / e;
}
const qt = (
  /* we export arrow function to allow us to spy on it during testing */
  (async (t, {
    arrowEl: e,
    direction: n,
    flipDisabled: o,
    flipPlacements: i,
    floatingEl: r,
    offsetDistance: s,
    offsetSkidding: c,
    overlayPositioning: a = "absolute",
    placement: l,
    referenceEl: d,
    type: u
  }) => {
    if (!d || !r)
      return;
    const m = n === "rtl", {
      x: f,
      y: g,
      placement: p,
      strategy: w,
      middlewareData: h
    } = await Xe(d, r, {
      strategy: a,
      placement: l === "auto" || l === "auto-start" || l === "auto-end" ? void 0 : $t(l, m),
      middleware: Ge({
        placement: l,
        flipDisabled: o,
        flipPlacements: i?.map((R) => $t(R, m)),
        offsetDistance: s,
        offsetSkidding: c,
        arrowEl: e,
        type: u
      })
    });
    if (e && h.arrow) {
      const { x: R, y: O } = h.arrow, A = p.split("-")[0], S = R != null ? "left" : "top", P = Ze[A], v = { left: "", top: "", bottom: "", right: "" };
      "floatingLayout" in t && (t.floatingLayout = A === "left" || A === "right" ? "horizontal" : "vertical"), Object.assign(e.style, {
        ...v,
        [S]: `${S == "left" ? R : O}px`,
        [A]: "100%",
        transform: P
      });
    }
    const x = h.hide?.referenceHidden ? "hidden" : null, b = x ? "none" : null;
    r.setAttribute(Ke, p), Object.assign(r.style, {
      pointerEvents: b,
      position: w,
      transform: `translate(${Mt(f)}px,${Mt(g)}px)`,
      visibility: x
    });
  })
), Ke = "data-placement", rn = [
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
], sn = ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"], Kt = [
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
], cn = "bottom-start", ln = "bottom-end", an = {
  animation: "calcite-floating-ui-anim",
  animationActive: "calcite-floating-ui-anim--active"
};
function Ge({
  placement: t,
  flipDisabled: e,
  flipPlacements: n,
  offsetDistance: o,
  offsetSkidding: i,
  arrowEl: r,
  type: s
}) {
  const c = "layoutViewport", a = t === "auto" || t === "auto-start" || t === "auto-end", l = [
    ze({
      rootBoundary: c
    })
  ];
  if (l.push(
    Ve({
      mainAxis: typeof o == "number" ? o : 0,
      crossAxis: typeof i == "number" ? i : 0
    })
  ), a && l.push(
    He({
      alignment: t === "auto-start" ? "start" : t === "auto-end" ? "end" : null,
      rootBoundary: c
    })
  ), !e && (!a || s === "menu")) {
    const u = s === "menu" ? n || ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"] : n;
    l.push(Ie(u ? { fallbackPlacements: u, rootBoundary: c } : { rootBoundary: c }));
  }
  return r && l.push(
    je({
      element: r
    })
  ), l.push(
    Ue({
      rootBoundary: c
    })
  ), l;
}
function Je(t) {
  return Kt.includes(t);
}
function fn(t, e) {
  const n = t.filter(Je);
  return n.length !== t.length && Zt.warn(
    `${e.tagName}: Invalid value found in: flipPlacements. Try any of these: ${Kt.map((o) => `"${o}"`).join(", ").trim()}`,
    { el: e }
  ), n;
}
function $t(t, e = !1) {
  const n = ["left", "right"];
  return e && n.reverse(), t.replace(/leading/gi, n[0]).replace(/trailing/gi, n[1]);
}
async function un(t, e, n = !1) {
  if (!t.open || !e.floatingEl || !e.referenceEl)
    return;
  if (Object.assign(e.floatingEl.style, {
    display: "block",
    inset: "unset",
    // initial positioning based on https://floating-ui.com/docs/computePosition#initial-layout
    left: "0",
    position: e.overlayPositioning ?? "absolute",
    top: "0"
  }), !et.get(t))
    return Gt(t);
  await (n ? Qe(t) : qt)(t, e);
}
function Qe(t) {
  let e = ct.get(t);
  return e || (e = te(qt, Qt.reposition, {
    edges: ["leading", "trailing"]
  }), ct.set(t, e), e);
}
const Ze = {
  top: "",
  left: "rotate(-90deg)",
  bottom: "rotate(180deg)",
  right: "rotate(90deg)"
}, et = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap();
async function Gt(t) {
  const { referenceEl: e, floatingEl: n } = t;
  if (!n?.isConnected)
    return;
  const o = Be;
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
function tn(t) {
  const { floatingEl: e } = t;
  e && Object.assign(e.style, {
    display: "",
    left: "",
    pointerEvents: "",
    position: "",
    top: "",
    transform: "",
    visibility: ""
  });
}
async function dn(t) {
  const { floatingEl: e, referenceEl: n } = t;
  if (tn(t), en(t), !(!e || !n || !t.open))
    return Gt(t);
}
function en(t) {
  const e = et.get(t);
  e?.state === "active" && e.cleanUp(), et.delete(t), ct.get(t)?.cancel(), ct.delete(t);
}
const Nt = 4, mn = Math.ceil(Math.hypot(Nt, Nt));
export {
  an as F,
  ln as a,
  mn as b,
  dn as c,
  cn as d,
  en as e,
  fn as f,
  tn as h,
  sn as m,
  rn as p,
  un as r
};
