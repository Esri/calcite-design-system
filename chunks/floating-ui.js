import { D as Rt } from "./iframe.js";
import { g as Zt } from "./dom.js";
import { d as te } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const Wt = ["top", "right", "bottom", "left"], Pt = ["start", "end"], Ct = /* @__PURE__ */ Wt.reduce((t, e) => t.concat(e, e + "-" + Pt[0], e + "-" + Pt[1]), []), J = Math.min, Y = Math.max, st = Math.round, it = Math.floor, M = (t) => ({
  x: t,
  y: t
}), ee = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ne = {
  start: "end",
  end: "start"
};
function ht(t, e, n) {
  return Y(t, J(e, n));
}
function G(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function H(t) {
  return t.split("-")[0];
}
function k(t) {
  return t.split("-")[1];
}
function Ht(t) {
  return t === "x" ? "y" : "x";
}
function xt(t) {
  return t === "y" ? "height" : "width";
}
function q(t) {
  return ["top", "bottom"].includes(H(t)) ? "y" : "x";
}
function vt(t) {
  return Ht(q(t));
}
function Vt(t, e, n) {
  n === void 0 && (n = !1);
  const o = k(t), i = vt(t), r = xt(i);
  let s = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (s = ct(s)), [s, ct(s)];
}
function oe(t) {
  const e = ct(t);
  return [rt(t), e, rt(e)];
}
function rt(t) {
  return t.replace(/start|end/g, (e) => ne[e]);
}
function ie(t, e, n) {
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
function se(t, e, n, o) {
  const i = k(t);
  let r = ie(H(t), n === "start", o);
  return i && (r = r.map((s) => s + "-" + i), e && (r = r.concat(r.map(rt)))), r;
}
function ct(t) {
  return t.replace(/left|right|bottom|top/g, (e) => ee[e]);
}
function re(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function It(t) {
  return typeof t != "number" ? re(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function lt(t) {
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
  const r = q(e), s = vt(e), c = xt(s), a = H(e), l = r === "y", d = o.x + o.width / 2 - i.width / 2, u = o.y + o.height / 2 - i.height / 2, m = o[c] / 2 - i[c] / 2;
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
const ce = async (t, e, n) => {
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
  } = St(l, o, a), m = o, f = {}, g = 0;
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
    } = St(l, m, a)), p = -1);
  }
  return {
    x: d,
    y: u,
    placement: m,
    strategy: i,
    middlewareData: f
  };
};
async function tt(t, e) {
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
  } = G(e, t), g = It(f), h = c[m ? u === "floating" ? "reference" : "floating" : u], w = lt(await r.getClippingRect({
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
  }, v = lt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
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
const le = (t) => ({
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
    } = G(t, e) || {};
    if (l == null)
      return {};
    const u = It(d), m = {
      x: n,
      y: o
    }, f = vt(i), g = xt(f), p = await s.getDimensions(l), h = f === "y", w = h ? "top" : "left", y = h ? "bottom" : "right", x = h ? "clientHeight" : "clientWidth", b = r.reference[g] + r.reference[f] - m[f] - r.floating[g], v = m[f] - r.reference[f], R = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let A = R ? R[x] : 0;
    (!A || !await (s.isElement == null ? void 0 : s.isElement(R))) && (A = c.floating[x] || r.floating[g]);
    const V = b / 2 - v / 2, C = A / 2 - p[g] / 2 - 1, O = J(u[w], C), S = J(u[y], C), $ = O, z = A - p[g] - S, D = A / 2 - p[g] / 2 + V, E = ht($, D, z), j = !a.arrow && k(i) != null && D !== E && r.reference[g] / 2 - (D < $ ? O : S) - p[g] / 2 < 0, W = j ? D < $ ? D - $ : D - z : 0;
    return {
      [f]: m[f] + W,
      data: {
        [f]: E,
        centerOffset: D - E - W,
        ...j && {
          alignmentOffset: W
        }
      },
      reset: j
    };
  }
});
function ae(t, e, n) {
  return (t ? [...n.filter((i) => k(i) === t), ...n.filter((i) => k(i) !== t)] : n.filter((i) => H(i) === i)).filter((i) => t ? k(i) === t || (e ? rt(i) !== i : !1) : !0);
}
const fe = function(t) {
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
        allowedPlacements: m = Ct,
        autoAlignment: f = !0,
        ...g
      } = G(t, e), p = u !== void 0 || m === Ct ? ae(u || null, f, m) : m, h = await tt(e, g), w = ((n = s.autoPlacement) == null ? void 0 : n.index) || 0, y = p[w];
      if (y == null)
        return {};
      const x = Vt(y, r, await (a.isRTL == null ? void 0 : a.isRTL(l.floating)));
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
        const S = k(O.placement);
        return [O.placement, S && d ? (
          // Check along the mainAxis and main crossAxis side.
          O.overflows.slice(0, 2).reduce(($, z) => $ + z, 0)
        ) : (
          // Check only the mainAxis.
          O.overflows[0]
        ), O.overflows];
      }).sort((O, S) => O[1] - S[1]), C = ((i = A.filter((O) => O[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        k(O[0]) ? 2 : 3
      ).every((S) => S <= 0))[0]) == null ? void 0 : i[0]) || A[0][0];
      return C !== c ? {
        data: {
          index: w + 1,
          overflows: v
        },
        reset: {
          placement: C
        }
      } : {};
    }
  };
}, ue = function(t) {
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
      } = G(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const w = H(i), y = q(c), x = H(c) === c, b = await (a.isRTL == null ? void 0 : a.isRTL(l.floating)), v = m || (x || !p ? [ct(c)] : oe(c)), R = g !== "none";
      !m && R && v.push(...se(c, p, g, b));
      const A = [c, ...v], V = await tt(e, h), C = [];
      let O = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (d && C.push(V[w]), u) {
        const E = Vt(i, s, b);
        C.push(V[E[0]], V[E[1]]);
      }
      if (O = [...O, {
        placement: i,
        overflows: C
      }], !C.every((E) => E <= 0)) {
        var S, $;
        const E = (((S = r.flip) == null ? void 0 : S.index) || 0) + 1, j = A[E];
        if (j) {
          var z;
          const I = u === "alignment" ? y !== q(j) : !1, F = ((z = O[0]) == null ? void 0 : z.overflows[0]) > 0;
          if (!I || F)
            return {
              data: {
                index: E,
                overflows: O
              },
              reset: {
                placement: j
              }
            };
        }
        let W = ($ = O.filter((I) => I.overflows[0] <= 0).sort((I, F) => I.overflows[1] - F.overflows[1])[0]) == null ? void 0 : $.placement;
        if (!W)
          switch (f) {
            case "bestFit": {
              var D;
              const I = (D = O.filter((F) => {
                if (R) {
                  const _ = q(F.placement);
                  return _ === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  _ === "y";
                }
                return !0;
              }).map((F) => [F.placement, F.overflows.filter((_) => _ > 0).reduce((_, Qt) => _ + Qt, 0)]).sort((F, _) => F[1] - _[1])[0]) == null ? void 0 : D[0];
              I && (W = I);
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
const de = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: o = "referenceHidden",
        ...i
      } = G(t, e);
      switch (o) {
        case "referenceHidden": {
          const r = await tt(e, {
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
          const r = await tt(e, {
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
};
async function me(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, r = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), s = H(n), c = k(n), a = q(n) === "y", l = ["left", "top"].includes(s) ? -1 : 1, d = r && a ? -1 : 1, u = G(e, t);
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
const ge = function(t) {
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
      } = e, a = await me(e, t);
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
}, pe = function(t) {
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
      } = G(t, e), l = {
        x: n,
        y: o
      }, d = await tt(e, a), u = q(H(i)), m = Ht(u);
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
function ft() {
  return typeof window < "u";
}
function Z(t) {
  return _t(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function P(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function N(t) {
  var e;
  return (e = (_t(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function _t(t) {
  return ft() ? t instanceof Node || t instanceof P(t).Node : !1;
}
function T(t) {
  return ft() ? t instanceof Element || t instanceof P(t).Element : !1;
}
function B(t) {
  return ft() ? t instanceof HTMLElement || t instanceof P(t).HTMLElement : !1;
}
function Lt(t) {
  return !ft() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof P(t).ShadowRoot;
}
function ot(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = L(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !["inline", "contents"].includes(i);
}
function he(t) {
  return ["table", "td", "th"].includes(Z(t));
}
function ut(t) {
  return [":popover-open", ":modal"].some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
function dt(t) {
  const e = bt(), n = T(t) ? L(t) : t;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((o) => (n.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (n.contain || "").includes(o));
}
function we(t) {
  let e = U(t);
  for (; B(e) && !Q(e); ) {
    if (dt(e))
      return e;
    if (ut(e))
      return null;
    e = U(e);
  }
  return null;
}
function bt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Q(t) {
  return ["html", "body", "#document"].includes(Z(t));
}
function L(t) {
  return P(t).getComputedStyle(t);
}
function mt(t) {
  return T(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function U(t) {
  if (Z(t) === "html")
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
  return Q(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : B(e) && ot(e) ? e : Ut(e);
}
function et(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Ut(t), r = i === ((o = t.ownerDocument) == null ? void 0 : o.body), s = P(i);
  if (r) {
    const c = wt(s);
    return e.concat(s, s.visualViewport || [], ot(i) ? i : [], c && n ? et(c) : []);
  }
  return e.concat(i, et(i, [], n));
}
function wt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function zt(t) {
  const e = L(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = B(t), r = i ? t.offsetWidth : n, s = i ? t.offsetHeight : o, c = st(n) !== r || st(o) !== s;
  return c && (n = r, o = s), {
    width: n,
    height: o,
    $: c
  };
}
function Ot(t) {
  return T(t) ? t : t.contextElement;
}
function K(t) {
  const e = Ot(t);
  if (!B(e))
    return M(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: r
  } = zt(e);
  let s = (r ? st(n.width) : n.width) / o, c = (r ? st(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: s,
    y: c
  };
}
const ye = /* @__PURE__ */ M(0);
function jt(t) {
  const e = P(t);
  return !bt() || !e.visualViewport ? ye : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function xe(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== P(t) ? !1 : e;
}
function X(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), r = Ot(t);
  let s = M(1);
  e && (o ? T(o) && (s = K(o)) : s = K(t));
  const c = xe(r, n, o) ? jt(r) : M(0);
  let a = (i.left + c.x) / s.x, l = (i.top + c.y) / s.y, d = i.width / s.x, u = i.height / s.y;
  if (r) {
    const m = P(r), f = o && T(o) ? P(o) : o;
    let g = m, p = wt(g);
    for (; p && o && f !== g; ) {
      const h = K(p), w = p.getBoundingClientRect(), y = L(p), x = w.left + (p.clientLeft + parseFloat(y.paddingLeft)) * h.x, b = w.top + (p.clientTop + parseFloat(y.paddingTop)) * h.y;
      a *= h.x, l *= h.y, d *= h.x, u *= h.y, a += x, l += b, g = P(p), p = wt(g);
    }
  }
  return lt({
    width: d,
    height: u,
    x: a,
    y: l
  });
}
function At(t, e) {
  const n = mt(t).scrollLeft;
  return e ? e.left + n : X(N(t)).left + n;
}
function Yt(t, e, n) {
  n === void 0 && (n = !1);
  const o = t.getBoundingClientRect(), i = o.left + e.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    At(t, o)
  )), r = o.top + e.scrollTop;
  return {
    x: i,
    y: r
  };
}
function ve(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const r = i === "fixed", s = N(o), c = e ? ut(e.floating) : !1;
  if (o === s || c && r)
    return n;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = M(1);
  const d = M(0), u = B(o);
  if ((u || !u && !r) && ((Z(o) !== "body" || ot(s)) && (a = mt(o)), B(o))) {
    const f = X(o);
    l = K(o), d.x = f.x + o.clientLeft, d.y = f.y + o.clientTop;
  }
  const m = s && !u && !r ? Yt(s, a, !0) : M(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - a.scrollLeft * l.x + d.x + m.x,
    y: n.y * l.y - a.scrollTop * l.y + d.y + m.y
  };
}
function be(t) {
  return Array.from(t.getClientRects());
}
function Oe(t) {
  const e = N(t), n = mt(t), o = t.ownerDocument.body, i = Y(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), r = Y(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let s = -n.scrollLeft + At(t);
  const c = -n.scrollTop;
  return L(o).direction === "rtl" && (s += Y(e.clientWidth, o.clientWidth) - i), {
    width: i,
    height: r,
    x: s,
    y: c
  };
}
function Ae(t, e) {
  const n = P(t), o = N(t), i = n.visualViewport;
  let r = o.clientWidth, s = o.clientHeight, c = 0, a = 0;
  if (i) {
    r = i.width, s = i.height;
    const l = bt();
    (!l || l && e === "fixed") && (c = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: s,
    x: c,
    y: a
  };
}
function Re(t, e) {
  const n = X(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, r = B(t) ? K(t) : M(1), s = t.clientWidth * r.x, c = t.clientHeight * r.y, a = i * r.x, l = o * r.y;
  return {
    width: s,
    height: c,
    x: a,
    y: l
  };
}
function Dt(t, e, n) {
  let o;
  if (e === "viewport")
    o = Ae(t, n);
  else if (e === "document")
    o = Oe(N(t));
  else if (T(e))
    o = Re(e, n);
  else {
    const i = jt(t);
    o = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return lt(o);
}
function qt(t, e) {
  const n = U(t);
  return n === e || !T(n) || Q(n) ? !1 : L(n).position === "fixed" || qt(n, e);
}
function Pe(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = et(t, [], !1).filter((c) => T(c) && Z(c) !== "body"), i = null;
  const r = L(t).position === "fixed";
  let s = r ? U(t) : t;
  for (; T(s) && !Q(s); ) {
    const c = L(s), a = dt(s);
    !a && c.position === "fixed" && (i = null), (r ? !a && !i : !a && c.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || ot(s) && !a && qt(t, s)) ? o = o.filter((d) => d !== s) : i = c, s = U(s);
  }
  return e.set(t, o), o;
}
function Ce(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const s = [...n === "clippingAncestors" ? ut(e) ? [] : Pe(e, this._c) : [].concat(n), o], c = s[0], a = s.reduce((l, d) => {
    const u = Dt(e, d, i);
    return l.top = Y(u.top, l.top), l.right = J(u.right, l.right), l.bottom = J(u.bottom, l.bottom), l.left = Y(u.left, l.left), l;
  }, Dt(e, c, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function Se(t) {
  const {
    width: e,
    height: n
  } = zt(t);
  return {
    width: e,
    height: n
  };
}
function Ee(t, e, n) {
  const o = B(e), i = N(e), r = n === "fixed", s = X(t, !0, r, e);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = M(0);
  function l() {
    a.x = At(i);
  }
  if (o || !o && !r)
    if ((Z(e) !== "body" || ot(i)) && (c = mt(e)), o) {
      const f = X(e, !0, r, e);
      a.x = f.x + e.clientLeft, a.y = f.y + e.clientTop;
    } else i && l();
  r && !o && i && l();
  const d = i && !o && !r ? Yt(i, c) : M(0), u = s.left + c.scrollLeft - a.x - d.x, m = s.top + c.scrollTop - a.y - d.y;
  return {
    x: u,
    y: m,
    width: s.width,
    height: s.height
  };
}
function gt(t) {
  return L(t).position === "static";
}
function Ft(t, e) {
  if (!B(t) || L(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return N(t) === n && (n = n.ownerDocument.body), n;
}
function Xt(t, e) {
  const n = P(t);
  if (ut(t))
    return n;
  if (!B(t)) {
    let i = U(t);
    for (; i && !Q(i); ) {
      if (T(i) && !gt(i))
        return i;
      i = U(i);
    }
    return n;
  }
  let o = Ft(t, e);
  for (; o && he(o) && gt(o); )
    o = Ft(o, e);
  return o && Q(o) && gt(o) && !dt(o) ? n : o || we(t) || n;
}
const Te = async function(t) {
  const e = this.getOffsetParent || Xt, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: Ee(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Le(t) {
  return L(t).direction === "rtl";
}
const yt = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ve,
  getDocumentElement: N,
  getClippingRect: Ce,
  getOffsetParent: Xt,
  getElementRects: Te,
  getClientRects: be,
  getDimensions: Se,
  getScale: K,
  isElement: T,
  isRTL: Le
};
function Gt(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function De(t, e) {
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
    const g = it(u), p = it(i.clientWidth - (d + m)), h = it(i.clientHeight - (u + f)), w = it(d), x = {
      rootMargin: -g + "px " + -p + "px " + -h + "px " + -w + "px",
      threshold: Y(0, J(1, a)) || 1
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
      A === 1 && !Gt(l, t.getBoundingClientRect()) && s(), b = !1;
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
function Fe(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = o, l = Ot(t), d = i || r ? [...l ? et(l) : [], ...et(e)] : [];
  d.forEach((w) => {
    i && w.addEventListener("scroll", n, {
      passive: !0
    }), r && w.addEventListener("resize", n);
  });
  const u = l && c ? De(l, n) : null;
  let m = -1, f = null;
  s && (f = new ResizeObserver((w) => {
    let [y] = w;
    y && y.target === l && f && (f.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var x;
      (x = f) == null || x.observe(e);
    })), n();
  }), l && !a && f.observe(l), f.observe(e));
  let g, p = a ? X(t) : null;
  a && h();
  function h() {
    const w = X(t);
    p && !Gt(p, w) && n(), p = w, g = requestAnimationFrame(h);
  }
  return n(), () => {
    var w;
    d.forEach((y) => {
      i && y.removeEventListener("scroll", n), r && y.removeEventListener("resize", n);
    }), u?.(), (w = f) == null || w.disconnect(), f = null, a && cancelAnimationFrame(g);
  };
}
const Me = ge, ke = fe, Be = pe, Mt = ue, Ne = de, $e = le, We = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = {
    platform: yt,
    ...n
  }, r = {
    ...i.platform,
    _c: o
  };
  return ce(t, e, {
    ...i,
    platform: r
  });
};
function He(t) {
  return Ve(t);
}
function pt(t) {
  return t.assignedSlot ? t.assignedSlot : t.parentNode instanceof ShadowRoot ? t.parentNode.host : t.parentNode;
}
function Ve(t) {
  for (let e = t; e; e = pt(e)) if (e instanceof Element && getComputedStyle(e).display === "none") return null;
  for (let e = pt(t); e; e = pt(e)) {
    if (!(e instanceof Element)) continue;
    const n = getComputedStyle(e);
    if (n.display !== "contents" && (n.position !== "static" || dt(n) || e.tagName === "BODY"))
      return e;
  }
  return null;
}
(function() {
  {
    const e = yt.getOffsetParent;
    yt.getOffsetParent = (n) => e(n, He);
  }
})();
function kt(t) {
  const e = window.devicePixelRatio || 1;
  return Math.round(t * e) / e;
}
const Kt = (
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
    const u = Zt(n) === "rtl", {
      x: m,
      y: f,
      placement: g,
      strategy: p,
      middlewareData: h
    } = await We(e, n, {
      strategy: o,
      placement: i === "auto" || i === "auto-start" || i === "auto-end" ? void 0 : Nt(i, u),
      middleware: _e({
        placement: i,
        flipDisabled: r,
        flipPlacements: s?.map((b) => Nt(b, u)),
        offsetDistance: c,
        offsetSkidding: a,
        arrowEl: l,
        type: d
      })
    });
    if (l && h.arrow) {
      const { x: b, y: v } = h.arrow, R = g.split("-")[0], A = b != null ? "left" : "top", V = ze[R], C = { left: "", top: "", bottom: "", right: "" };
      "floatingLayout" in t && (t.floatingLayout = R === "left" || R === "right" ? "horizontal" : "vertical"), Object.assign(l.style, {
        ...C,
        [A]: `${A == "left" ? b : v}px`,
        [R]: "100%",
        transform: V
      });
    }
    const y = h.hide?.referenceHidden ? "hidden" : null, x = y ? "none" : null;
    n.setAttribute(Ie, g), Object.assign(n.style, {
      pointerEvents: x,
      position: p,
      transform: `translate(${kt(m)}px,${kt(f)}px)`,
      visibility: y
    });
  }
), Ie = "data-placement", Ke = [
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
], Je = ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"], Bt = [
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
], Qe = "bottom-start", Ze = "bottom-end", tn = {
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
  const c = [Be(), Ne()];
  return s === "menu" && c.push(
    Mt({
      fallbackPlacements: n || ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    })
  ), c.push(
    Me({
      mainAxis: typeof o == "number" ? o : 0,
      crossAxis: typeof i == "number" ? i : 0
    })
  ), t === "auto" || t === "auto-start" || t === "auto-end" ? c.push(
    ke({ alignment: t === "auto-start" ? "start" : t === "auto-end" ? "end" : null })
  ) : e || c.push(Mt(n ? { fallbackPlacements: n } : {})), r && c.push(
    $e({
      element: r
    })
  ), c;
}
function en(t, e) {
  const n = t.filter(
    (o) => Bt.includes(o)
  );
  return n.length !== t.length && console.warn(
    `${e.tagName}: Invalid value found in: flipPlacements. Try any of these: ${Bt.map((o) => `"${o}"`).join(", ").trim()}`,
    { el: e }
  ), n;
}
function Nt(t, e = !1) {
  const n = ["left", "right"];
  return e && n.reverse(), t.replace(/leading/gi, n[0]).replace(/trailing/gi, n[1]);
}
async function nn(t, e, n = !1) {
  if (!t.open || !e.floatingEl || !e.referenceEl)
    return;
  if (Object.assign(e.floatingEl.style, {
    display: "block",
    // initial positioning based on https://floating-ui.com/docs/computePosition#initial-layout
    position: e.overlayPositioning ?? "absolute"
  }), !nt.get(t))
    return Jt(t);
  await (n ? Ue(t) : Kt)(t, e);
}
function Ue(t) {
  let e = at.get(t);
  return e || (e = te(Kt, Rt.reposition, {
    leading: !0,
    maxWait: Rt.reposition
  }), at.set(t, e), e);
}
const ze = {
  top: "",
  left: "rotate(-90deg)",
  bottom: "rotate(180deg)",
  right: "rotate(90deg)"
}, nt = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap();
async function Jt(t) {
  const { referenceEl: e, floatingEl: n } = t;
  if (!n.isConnected)
    return;
  const o = Fe;
  nt.set(t, { state: "pending" });
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
  return nt.set(t, { state: "active", cleanUp: r }), i;
}
function je(t) {
  const { floatingEl: e } = t;
  e && Object.assign(e.style, {
    display: "",
    pointerEvents: "",
    position: "",
    transform: "",
    visibility: ""
  });
}
async function on(t) {
  const { floatingEl: e, referenceEl: n } = t;
  if (je(t), !(!e || !n) && (Ye(t), !!t.open))
    return Jt(t);
}
function Ye(t) {
  const e = nt.get(t);
  e?.state === "active" && e.cleanUp(), nt.delete(t), at.get(t)?.cancel(), at.delete(t);
}
const $t = 4, sn = Math.ceil(Math.hypot($t, $t));
export {
  tn as F,
  Ze as a,
  Ye as b,
  on as c,
  Qe as d,
  sn as e,
  en as f,
  je as h,
  Je as m,
  Ke as p,
  nn as r
};
