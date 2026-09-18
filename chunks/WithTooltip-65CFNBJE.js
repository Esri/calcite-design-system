/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { R as kt, _ as te, b as Bt, s as Le, c as _t, l as pe, r as Pt } from "./blocks.js";
import { f as y, R as X, k as je, m as ft } from "./index.js";
var Mt = {}, Ht = ft({
  "../../node_modules/react-fast-compare/index.js"(e, t) {
    var r = typeof Element < "u", o = typeof Map == "function", n = typeof Set == "function", u = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
    function c(s, i) {
      if (s === i) return !0;
      if (s && i && typeof s == "object" && typeof i == "object") {
        if (s.constructor !== i.constructor) return !1;
        var a, f, p;
        if (Array.isArray(s)) {
          if (a = s.length, a != i.length) return !1;
          for (f = a; f-- !== 0; )
            if (!c(s[f], i[f])) return !1;
          return !0;
        }
        var l;
        if (o && s instanceof Map && i instanceof Map) {
          if (s.size !== i.size) return !1;
          for (l = s.entries(); !(f = l.next()).done; )
            if (!i.has(f.value[0])) return !1;
          for (l = s.entries(); !(f = l.next()).done; )
            if (!c(f.value[1], i.get(f.value[0]))) return !1;
          return !0;
        }
        if (n && s instanceof Set && i instanceof Set) {
          if (s.size !== i.size) return !1;
          for (l = s.entries(); !(f = l.next()).done; )
            if (!i.has(f.value[0])) return !1;
          return !0;
        }
        if (u && ArrayBuffer.isView(s) && ArrayBuffer.isView(i)) {
          if (a = s.length, a != i.length) return !1;
          for (f = a; f-- !== 0; )
            if (s[f] !== i[f]) return !1;
          return !0;
        }
        if (s.constructor === RegExp) return s.source === i.source && s.flags === i.flags;
        if (s.valueOf !== Object.prototype.valueOf && typeof s.valueOf == "function" && typeof i.valueOf == "function") return s.valueOf() === i.valueOf();
        if (s.toString !== Object.prototype.toString && typeof s.toString == "function" && typeof i.toString == "function") return s.toString() === i.toString();
        if (p = Object.keys(s), a = p.length, a !== Object.keys(i).length) return !1;
        for (f = a; f-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(i, p[f])) return !1;
        if (r && s instanceof Element) return !1;
        for (f = a; f-- !== 0; )
          if (!((p[f] === "_owner" || p[f] === "__v" || p[f] === "__o") && s.$$typeof) && !c(s[p[f]], i[p[f]]))
            return !1;
        return !0;
      }
      return s !== s && i !== i;
    }
    t.exports = function(s, i) {
      try {
        return c(s, i);
      } catch (a) {
        if ((a.message || "").match(/stack|recursion/i))
          return console.warn("react-fast-compare cannot handle circular refs"), !1;
        throw a;
      }
    };
  }
}), Nt = ft({
  "../../node_modules/warning/warning.js"(e, t) {
    var r = Mt.NODE_ENV !== "production", o = function() {
    };
    r && (n = function(u, c) {
      var s = arguments.length;
      c = new Array(s > 1 ? s - 1 : 0);
      for (var i = 1; i < s; i++)
        c[i - 1] = arguments[i];
      var a = 0, f = "Warning: " + u.replace(/%s/g, function() {
        return c[a++];
      });
      typeof console < "u" && console.error(f);
      try {
        throw new Error(f);
      } catch {
      }
    }, o = function(u, c, s) {
      var i = arguments.length;
      s = new Array(i > 2 ? i - 2 : 0);
      for (var a = 2; a < i; a++)
        s[a - 2] = arguments[a];
      if (c === void 0)
        throw new Error(
          "`warning(condition, format, ...args)` requires a warning message argument"
        );
      u || n.apply(null, [c].concat(s));
    });
    var n;
    t.exports = o;
  }
}), Vt = je(Pt(), 1);
const { deprecate: qt } = __STORYBOOK_MODULE_CLIENT_LOGGER__, { global: It } = __STORYBOOK_MODULE_GLOBAL__;
y.createContext();
y.createContext();
var Ke = function(e) {
  return e.reduce(function(t, r) {
    var o = r[0], n = r[1];
    return t[o] = n, t;
  }, {});
}, Je = typeof window < "u" && window.document && window.document.createElement ? y.useLayoutEffect : y.useEffect, k = "top", H = "bottom", N = "right", B = "left", $e = "auto", ye = [k, H, N, B], ie = "start", me = "end", Ut = "clippingParents", ct = "viewport", le = "popper", zt = "reference", Qe = ye.reduce(function(e, t) {
  return e.concat([t + "-" + ie, t + "-" + me]);
}, []), lt = [].concat(ye, [$e]).reduce(function(e, t) {
  return e.concat([t, t + "-" + ie, t + "-" + me]);
}, []), Yt = "beforeRead", Xt = "read", Ft = "afterRead", Gt = "beforeMain", Kt = "main", Jt = "afterMain", Qt = "beforeWrite", Zt = "write", er = "afterWrite", tr = [Yt, Xt, Ft, Gt, Kt, Jt, Qt, Zt, er];
function U(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function _(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function ne(e) {
  var t = _(e).Element;
  return e instanceof t || e instanceof Element;
}
function M(e) {
  var t = _(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ke(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = _(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function rr(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var o = t.styles[r] || {}, n = t.attributes[r] || {}, u = t.elements[r];
    !M(u) || !U(u) || (Object.assign(u.style, o), Object.keys(n).forEach(function(c) {
      var s = n[c];
      s === !1 ? u.removeAttribute(c) : u.setAttribute(c, s === !0 ? "" : s);
    }));
  });
}
function nr(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(o) {
      var n = t.elements[o], u = t.attributes[o] || {}, c = Object.keys(t.styles.hasOwnProperty(o) ? t.styles[o] : r[o]), s = c.reduce(function(i, a) {
        return i[a] = "", i;
      }, {});
      !M(n) || !U(n) || (Object.assign(n.style, s), Object.keys(u).forEach(function(i) {
        n.removeAttribute(i);
      }));
    });
  };
}
var pt = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: rr,
  effect: nr,
  requires: ["computeStyles"]
};
function I(e) {
  return e.split("-")[0];
}
var re = Math.max, Re = Math.min, ae = Math.round;
function De() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function dt() {
  return !/^((?!chrome|android).)*safari/i.test(De());
}
function se(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var o = e.getBoundingClientRect(), n = 1, u = 1;
  t && M(e) && (n = e.offsetWidth > 0 && ae(o.width) / e.offsetWidth || 1, u = e.offsetHeight > 0 && ae(o.height) / e.offsetHeight || 1);
  var c = ne(e) ? _(e) : window, s = c.visualViewport, i = !dt() && r, a = (o.left + (i && s ? s.offsetLeft : 0)) / n, f = (o.top + (i && s ? s.offsetTop : 0)) / u, p = o.width / n, l = o.height / u;
  return {
    width: p,
    height: l,
    top: f,
    right: a + p,
    bottom: f + l,
    left: a,
    x: a,
    y: f
  };
}
function Be(e) {
  var t = se(e), r = e.offsetWidth, o = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - o) <= 1 && (o = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: o
  };
}
function vt(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && ke(r)) {
    var o = t;
    do {
      if (o && e.isSameNode(o))
        return !0;
      o = o.parentNode || o.host;
    } while (o);
  }
  return !1;
}
function F(e) {
  return _(e).getComputedStyle(e);
}
function or(e) {
  return ["table", "td", "th"].indexOf(U(e)) >= 0;
}
function K(e) {
  return ((ne(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Ce(e) {
  return U(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ke(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    K(e)
  );
}
function Ze(e) {
  return !M(e) || // https://github.com/popperjs/popper-core/issues/837
  F(e).position === "fixed" ? null : e.offsetParent;
}
function ir(e) {
  var t = /firefox/i.test(De()), r = /Trident/i.test(De());
  if (r && M(e)) {
    var o = F(e);
    if (o.position === "fixed")
      return null;
  }
  var n = Ce(e);
  for (ke(n) && (n = n.host); M(n) && ["html", "body"].indexOf(U(n)) < 0; ) {
    var u = F(n);
    if (u.transform !== "none" || u.perspective !== "none" || u.contain === "paint" || ["transform", "perspective"].indexOf(u.willChange) !== -1 || t && u.willChange === "filter" || t && u.filter && u.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function be(e) {
  for (var t = _(e), r = Ze(e); r && or(r) && F(r).position === "static"; )
    r = Ze(r);
  return r && (U(r) === "html" || U(r) === "body" && F(r).position === "static") ? t : r || ir(e) || t;
}
function _e(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function de(e, t, r) {
  return re(e, Re(t, r));
}
function ar(e, t, r) {
  var o = de(e, t, r);
  return o > r ? r : o;
}
function gt() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mt(e) {
  return Object.assign({}, gt(), e);
}
function ht(e, t) {
  return t.reduce(function(r, o) {
    return r[o] = e, r;
  }, {});
}
var sr = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, mt(typeof e != "number" ? e : ht(e, ye));
};
function ur(e) {
  var t, r = e.state, o = e.name, n = e.options, u = r.elements.arrow, c = r.modifiersData.popperOffsets, s = I(r.placement), i = _e(s), a = [B, N].indexOf(s) >= 0, f = a ? "height" : "width";
  if (!(!u || !c)) {
    var p = sr(n.padding, r), l = Be(u), v = i === "y" ? k : B, m = i === "y" ? H : N, d = r.rects.reference[f] + r.rects.reference[i] - c[i] - r.rects.popper[f], x = c[i] - r.rects.reference[i], O = be(u), C = O ? i === "y" ? O.clientHeight || 0 : O.clientWidth || 0 : 0, A = d / 2 - x / 2, g = p[v], b = C - l[f] - p[m], E = C / 2 - l[f] / 2 + A, R = de(g, E, b), S = i;
    r.modifiersData[o] = (t = {}, t[S] = R, t.centerOffset = R - E, t);
  }
}
function fr(e) {
  var t = e.state, r = e.options, o = r.element, n = o === void 0 ? "[data-popper-arrow]" : o;
  n != null && (typeof n == "string" && (n = t.elements.popper.querySelector(n), !n) || vt(t.elements.popper, n) && (t.elements.arrow = n));
}
var cr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: ur,
  effect: fr,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function ue(e) {
  return e.split("-")[1];
}
var lr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function pr(e, t) {
  var r = e.x, o = e.y, n = t.devicePixelRatio || 1;
  return {
    x: ae(r * n) / n || 0,
    y: ae(o * n) / n || 0
  };
}
function et(e) {
  var t, r = e.popper, o = e.popperRect, n = e.placement, u = e.variation, c = e.offsets, s = e.position, i = e.gpuAcceleration, a = e.adaptive, f = e.roundOffsets, p = e.isFixed, l = c.x, v = l === void 0 ? 0 : l, m = c.y, d = m === void 0 ? 0 : m, x = typeof f == "function" ? f({
    x: v,
    y: d
  }) : {
    x: v,
    y: d
  };
  v = x.x, d = x.y;
  var O = c.hasOwnProperty("x"), C = c.hasOwnProperty("y"), A = B, g = k, b = window;
  if (a) {
    var E = be(r), R = "clientHeight", S = "clientWidth";
    if (E === _(r) && (E = K(r), F(E).position !== "static" && s === "absolute" && (R = "scrollHeight", S = "scrollWidth")), E = E, n === k || (n === B || n === N) && u === me) {
      g = H;
      var w = p && E === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        E[R]
      );
      d -= w - o.height, d *= i ? 1 : -1;
    }
    if (n === B || (n === k || n === H) && u === me) {
      A = N;
      var L = p && E === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        E[S]
      );
      v -= L - o.width, v *= i ? 1 : -1;
    }
  }
  var D = Object.assign({
    position: s
  }, a && lr), $ = f === !0 ? pr({
    x: v,
    y: d
  }, _(r)) : {
    x: v,
    y: d
  };
  if (v = $.x, d = $.y, i) {
    var j;
    return Object.assign({}, D, (j = {}, j[g] = C ? "0" : "", j[A] = O ? "0" : "", j.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + d + "px)" : "translate3d(" + v + "px, " + d + "px, 0)", j));
  }
  return Object.assign({}, D, (t = {}, t[g] = C ? d + "px" : "", t[A] = O ? v + "px" : "", t.transform = "", t));
}
function dr(e) {
  var t = e.state, r = e.options, o = r.gpuAcceleration, n = o === void 0 ? !0 : o, u = r.adaptive, c = u === void 0 ? !0 : u, s = r.roundOffsets, i = s === void 0 ? !0 : s, a = {
    placement: I(t.placement),
    variation: ue(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: n,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, et(Object.assign({}, a, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: c,
    roundOffsets: i
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, et(Object.assign({}, a, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: i
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
var yt = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: dr,
  data: {}
}, Ee = {
  passive: !0
};
function vr(e) {
  var t = e.state, r = e.instance, o = e.options, n = o.scroll, u = n === void 0 ? !0 : n, c = o.resize, s = c === void 0 ? !0 : c, i = _(t.elements.popper), a = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return u && a.forEach(function(f) {
    f.addEventListener("scroll", r.update, Ee);
  }), s && i.addEventListener("resize", r.update, Ee), function() {
    u && a.forEach(function(f) {
      f.removeEventListener("scroll", r.update, Ee);
    }), s && i.removeEventListener("resize", r.update, Ee);
  };
}
var bt = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: vr,
  data: {}
}, gr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Se(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return gr[t];
  });
}
var mr = {
  start: "end",
  end: "start"
};
function tt(e) {
  return e.replace(/start|end/g, function(t) {
    return mr[t];
  });
}
function Pe(e) {
  var t = _(e), r = t.pageXOffset, o = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: o
  };
}
function Me(e) {
  return se(K(e)).left + Pe(e).scrollLeft;
}
function hr(e, t) {
  var r = _(e), o = K(e), n = r.visualViewport, u = o.clientWidth, c = o.clientHeight, s = 0, i = 0;
  if (n) {
    u = n.width, c = n.height;
    var a = dt();
    (a || !a && t === "fixed") && (s = n.offsetLeft, i = n.offsetTop);
  }
  return {
    width: u,
    height: c,
    x: s + Me(e),
    y: i
  };
}
function yr(e) {
  var t, r = K(e), o = Pe(e), n = (t = e.ownerDocument) == null ? void 0 : t.body, u = re(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), c = re(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), s = -o.scrollLeft + Me(e), i = -o.scrollTop;
  return F(n || r).direction === "rtl" && (s += re(r.clientWidth, n ? n.clientWidth : 0) - u), {
    width: u,
    height: c,
    x: s,
    y: i
  };
}
function He(e) {
  var t = F(e), r = t.overflow, o = t.overflowX, n = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + n + o);
}
function wt(e) {
  return ["html", "body", "#document"].indexOf(U(e)) >= 0 ? e.ownerDocument.body : M(e) && He(e) ? e : wt(Ce(e));
}
function ve(e, t) {
  var r;
  t === void 0 && (t = []);
  var o = wt(e), n = o === ((r = e.ownerDocument) == null ? void 0 : r.body), u = _(o), c = n ? [u].concat(u.visualViewport || [], He(o) ? o : []) : o, s = t.concat(c);
  return n ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(ve(Ce(c)))
  );
}
function We(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function br(e, t) {
  var r = se(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function rt(e, t, r) {
  return t === ct ? We(hr(e, r)) : ne(t) ? br(t, r) : We(yr(K(e)));
}
function wr(e) {
  var t = ve(Ce(e)), r = ["absolute", "fixed"].indexOf(F(e).position) >= 0, o = r && M(e) ? be(e) : e;
  return ne(o) ? t.filter(function(n) {
    return ne(n) && vt(n, o) && U(n) !== "body";
  }) : [];
}
function xr(e, t, r, o) {
  var n = t === "clippingParents" ? wr(e) : [].concat(t), u = [].concat(n, [r]), c = u[0], s = u.reduce(function(i, a) {
    var f = rt(e, a, o);
    return i.top = re(f.top, i.top), i.right = Re(f.right, i.right), i.bottom = Re(f.bottom, i.bottom), i.left = re(f.left, i.left), i;
  }, rt(e, c, o));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function xt(e) {
  var t = e.reference, r = e.element, o = e.placement, n = o ? I(o) : null, u = o ? ue(o) : null, c = t.x + t.width / 2 - r.width / 2, s = t.y + t.height / 2 - r.height / 2, i;
  switch (n) {
    case k:
      i = {
        x: c,
        y: t.y - r.height
      };
      break;
    case H:
      i = {
        x: c,
        y: t.y + t.height
      };
      break;
    case N:
      i = {
        x: t.x + t.width,
        y: s
      };
      break;
    case B:
      i = {
        x: t.x - r.width,
        y: s
      };
      break;
    default:
      i = {
        x: t.x,
        y: t.y
      };
  }
  var a = n ? _e(n) : null;
  if (a != null) {
    var f = a === "y" ? "height" : "width";
    switch (u) {
      case ie:
        i[a] = i[a] - (t[f] / 2 - r[f] / 2);
        break;
      case me:
        i[a] = i[a] + (t[f] / 2 - r[f] / 2);
        break;
    }
  }
  return i;
}
function he(e, t) {
  t === void 0 && (t = {});
  var r = t, o = r.placement, n = o === void 0 ? e.placement : o, u = r.strategy, c = u === void 0 ? e.strategy : u, s = r.boundary, i = s === void 0 ? Ut : s, a = r.rootBoundary, f = a === void 0 ? ct : a, p = r.elementContext, l = p === void 0 ? le : p, v = r.altBoundary, m = v === void 0 ? !1 : v, d = r.padding, x = d === void 0 ? 0 : d, O = mt(typeof x != "number" ? x : ht(x, ye)), C = l === le ? zt : le, A = e.rects.popper, g = e.elements[m ? C : l], b = xr(ne(g) ? g : g.contextElement || K(e.elements.popper), i, f, c), E = se(e.elements.reference), R = xt({
    reference: E,
    element: A,
    placement: n
  }), S = We(Object.assign({}, A, R)), w = l === le ? S : E, L = {
    top: b.top - w.top + O.top,
    bottom: w.bottom - b.bottom + O.bottom,
    left: b.left - w.left + O.left,
    right: w.right - b.right + O.right
  }, D = e.modifiersData.offset;
  if (l === le && D) {
    var $ = D[n];
    Object.keys(L).forEach(function(j) {
      var V = [N, H].indexOf(j) >= 0 ? 1 : -1, h = [k, H].indexOf(j) >= 0 ? "y" : "x";
      L[j] += $[h] * V;
    });
  }
  return L;
}
function Or(e, t) {
  t === void 0 && (t = {});
  var r = t, o = r.placement, n = r.boundary, u = r.rootBoundary, c = r.padding, s = r.flipVariations, i = r.allowedAutoPlacements, a = i === void 0 ? lt : i, f = ue(o), p = f ? s ? Qe : Qe.filter(function(m) {
    return ue(m) === f;
  }) : ye, l = p.filter(function(m) {
    return a.indexOf(m) >= 0;
  });
  l.length === 0 && (l = p);
  var v = l.reduce(function(m, d) {
    return m[d] = he(e, {
      placement: d,
      boundary: n,
      rootBoundary: u,
      padding: c
    })[I(d)], m;
  }, {});
  return Object.keys(v).sort(function(m, d) {
    return v[m] - v[d];
  });
}
function Er(e) {
  if (I(e) === $e)
    return [];
  var t = Se(e);
  return [tt(e), t, tt(t)];
}
function Sr(e) {
  var t = e.state, r = e.options, o = e.name;
  if (!t.modifiersData[o]._skip) {
    for (var n = r.mainAxis, u = n === void 0 ? !0 : n, c = r.altAxis, s = c === void 0 ? !0 : c, i = r.fallbackPlacements, a = r.padding, f = r.boundary, p = r.rootBoundary, l = r.altBoundary, v = r.flipVariations, m = v === void 0 ? !0 : v, d = r.allowedAutoPlacements, x = t.options.placement, O = I(x), C = O === x, A = i || (C || !m ? [Se(x)] : Er(x)), g = [x].concat(A).reduce(function(Z, Y) {
      return Z.concat(I(Y) === $e ? Or(t, {
        placement: Y,
        boundary: f,
        rootBoundary: p,
        padding: a,
        flipVariations: m,
        allowedAutoPlacements: d
      }) : Y);
    }, []), b = t.rects.reference, E = t.rects.popper, R = /* @__PURE__ */ new Map(), S = !0, w = g[0], L = 0; L < g.length; L++) {
      var D = g[L], $ = I(D), j = ue(D) === ie, V = [k, H].indexOf($) >= 0, h = V ? "width" : "height", T = he(t, {
        placement: D,
        boundary: f,
        rootBoundary: p,
        altBoundary: l,
        padding: a
      }), W = V ? j ? N : B : j ? H : k;
      b[h] > E[h] && (W = Se(W));
      var z = Se(W), q = [];
      if (u && q.push(T[$] <= 0), s && q.push(T[W] <= 0, T[z] <= 0), q.every(function(Z) {
        return Z;
      })) {
        w = D, S = !1;
        break;
      }
      R.set(D, q);
    }
    if (S)
      for (var J = m ? 3 : 1, Q = function(Z) {
        var Y = g.find(function(xe) {
          var ce = R.get(xe);
          if (ce)
            return ce.slice(0, Z).every(function(oe) {
              return oe;
            });
        });
        if (Y)
          return w = Y, "break";
      }, fe = J; fe > 0; fe--) {
        var we = Q(fe);
        if (we === "break") break;
      }
    t.placement !== w && (t.modifiersData[o]._skip = !0, t.placement = w, t.reset = !0);
  }
}
var Rr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Sr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function nt(e, t, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - r.y,
    right: e.right - t.width + r.x,
    bottom: e.bottom - t.height + r.y,
    left: e.left - t.width - r.x
  };
}
function ot(e) {
  return [k, N, H, B].some(function(t) {
    return e[t] >= 0;
  });
}
function Lr(e) {
  var t = e.state, r = e.name, o = t.rects.reference, n = t.rects.popper, u = t.modifiersData.preventOverflow, c = he(t, {
    elementContext: "reference"
  }), s = he(t, {
    altBoundary: !0
  }), i = nt(c, o), a = nt(s, n, u), f = ot(i), p = ot(a);
  t.modifiersData[r] = {
    referenceClippingOffsets: i,
    popperEscapeOffsets: a,
    isReferenceHidden: f,
    hasPopperEscaped: p
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": p
  });
}
var Cr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Lr
};
function Tr(e, t, r) {
  var o = I(e), n = [B, k].indexOf(o) >= 0 ? -1 : 1, u = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, c = u[0], s = u[1];
  return c = c || 0, s = (s || 0) * n, [B, N].indexOf(o) >= 0 ? {
    x: s,
    y: c
  } : {
    x: c,
    y: s
  };
}
function Ar(e) {
  var t = e.state, r = e.options, o = e.name, n = r.offset, u = n === void 0 ? [0, 0] : n, c = lt.reduce(function(f, p) {
    return f[p] = Tr(p, t.rects, u), f;
  }, {}), s = c[t.placement], i = s.x, a = s.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += a), t.modifiersData[o] = c;
}
var Dr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ar
};
function Wr(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = xt({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
var Ot = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Wr,
  data: {}
};
function jr(e) {
  return e === "x" ? "y" : "x";
}
function $r(e) {
  var t = e.state, r = e.options, o = e.name, n = r.mainAxis, u = n === void 0 ? !0 : n, c = r.altAxis, s = c === void 0 ? !1 : c, i = r.boundary, a = r.rootBoundary, f = r.altBoundary, p = r.padding, l = r.tether, v = l === void 0 ? !0 : l, m = r.tetherOffset, d = m === void 0 ? 0 : m, x = he(t, {
    boundary: i,
    rootBoundary: a,
    padding: p,
    altBoundary: f
  }), O = I(t.placement), C = ue(t.placement), A = !C, g = _e(O), b = jr(g), E = t.modifiersData.popperOffsets, R = t.rects.reference, S = t.rects.popper, w = typeof d == "function" ? d(Object.assign({}, t.rects, {
    placement: t.placement
  })) : d, L = typeof w == "number" ? {
    mainAxis: w,
    altAxis: w
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, w), D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, $ = {
    x: 0,
    y: 0
  };
  if (E) {
    if (u) {
      var j, V = g === "y" ? k : B, h = g === "y" ? H : N, T = g === "y" ? "height" : "width", W = E[g], z = W + x[V], q = W - x[h], J = v ? -S[T] / 2 : 0, Q = C === ie ? R[T] : S[T], fe = C === ie ? -S[T] : -R[T], we = t.elements.arrow, Z = v && we ? Be(we) : {
        width: 0,
        height: 0
      }, Y = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : gt(), xe = Y[V], ce = Y[h], oe = de(0, R[T], Z[T]), Ct = A ? R[T] / 2 - J - oe - xe - L.mainAxis : Q - oe - xe - L.mainAxis, Tt = A ? -R[T] / 2 + J + oe + ce + L.mainAxis : fe + oe + ce + L.mainAxis, Te = t.elements.arrow && be(t.elements.arrow), At = Te ? g === "y" ? Te.clientTop || 0 : Te.clientLeft || 0 : 0, Ve = (j = D?.[g]) != null ? j : 0, Dt = W + Ct - Ve - At, Wt = W + Tt - Ve, qe = de(v ? Re(z, Dt) : z, W, v ? re(q, Wt) : q);
      E[g] = qe, $[g] = qe - W;
    }
    if (s) {
      var Ie, jt = g === "x" ? k : B, $t = g === "x" ? H : N, ee = E[b], Oe = b === "y" ? "height" : "width", Ue = ee + x[jt], ze = ee - x[$t], Ae = [k, B].indexOf(O) !== -1, Ye = (Ie = D?.[b]) != null ? Ie : 0, Xe = Ae ? Ue : ee - R[Oe] - S[Oe] - Ye + L.altAxis, Fe = Ae ? ee + R[Oe] + S[Oe] - Ye - L.altAxis : ze, Ge = v && Ae ? ar(Xe, ee, Fe) : de(v ? Xe : Ue, ee, v ? Fe : ze);
      E[b] = Ge, $[b] = Ge - ee;
    }
    t.modifiersData[o] = $;
  }
}
var kr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: $r,
  requiresIfExists: ["offset"]
};
function Br(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function _r(e) {
  return e === _(e) || !M(e) ? Pe(e) : Br(e);
}
function Pr(e) {
  var t = e.getBoundingClientRect(), r = ae(t.width) / e.offsetWidth || 1, o = ae(t.height) / e.offsetHeight || 1;
  return r !== 1 || o !== 1;
}
function Mr(e, t, r) {
  r === void 0 && (r = !1);
  var o = M(t), n = M(t) && Pr(t), u = K(t), c = se(e, n, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, i = {
    x: 0,
    y: 0
  };
  return (o || !o && !r) && ((U(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  He(u)) && (s = _r(t)), M(t) ? (i = se(t, !0), i.x += t.clientLeft, i.y += t.clientTop) : u && (i.x = Me(u))), {
    x: c.left + s.scrollLeft - i.x,
    y: c.top + s.scrollTop - i.y,
    width: c.width,
    height: c.height
  };
}
function Hr(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), o = [];
  e.forEach(function(u) {
    t.set(u.name, u);
  });
  function n(u) {
    r.add(u.name);
    var c = [].concat(u.requires || [], u.requiresIfExists || []);
    c.forEach(function(s) {
      if (!r.has(s)) {
        var i = t.get(s);
        i && n(i);
      }
    }), o.push(u);
  }
  return e.forEach(function(u) {
    r.has(u.name) || n(u);
  }), o;
}
function Nr(e) {
  var t = Hr(e);
  return tr.reduce(function(r, o) {
    return r.concat(t.filter(function(n) {
      return n.phase === o;
    }));
  }, []);
}
function Vr(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function qr(e) {
  var t = e.reduce(function(r, o) {
    var n = r[o.name];
    return r[o.name] = n ? Object.assign({}, n, o, {
      options: Object.assign({}, n.options, o.options),
      data: Object.assign({}, n.data, o.data)
    }) : o, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
var it = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function at() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function Ne(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, o = r === void 0 ? [] : r, n = t.defaultOptions, u = n === void 0 ? it : n;
  return function(c, s, i) {
    i === void 0 && (i = u);
    var a = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, it, u),
      modifiersData: {},
      elements: {
        reference: c,
        popper: s
      },
      attributes: {},
      styles: {}
    }, f = [], p = !1, l = {
      state: a,
      setOptions: function(d) {
        var x = typeof d == "function" ? d(a.options) : d;
        m(), a.options = Object.assign({}, u, a.options, x), a.scrollParents = {
          reference: ne(c) ? ve(c) : c.contextElement ? ve(c.contextElement) : [],
          popper: ve(s)
        };
        var O = Nr(qr([].concat(o, a.options.modifiers)));
        return a.orderedModifiers = O.filter(function(C) {
          return C.enabled;
        }), v(), l.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var d = a.elements, x = d.reference, O = d.popper;
          if (at(x, O)) {
            a.rects = {
              reference: Mr(x, be(O), a.options.strategy === "fixed"),
              popper: Be(O)
            }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach(function(S) {
              return a.modifiersData[S.name] = Object.assign({}, S.data);
            });
            for (var C = 0; C < a.orderedModifiers.length; C++) {
              if (a.reset === !0) {
                a.reset = !1, C = -1;
                continue;
              }
              var A = a.orderedModifiers[C], g = A.fn, b = A.options, E = b === void 0 ? {} : b, R = A.name;
              typeof g == "function" && (a = g({
                state: a,
                options: E,
                name: R,
                instance: l
              }) || a);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Vr(function() {
        return new Promise(function(d) {
          l.forceUpdate(), d(a);
        });
      }),
      destroy: function() {
        m(), p = !0;
      }
    };
    if (!at(c, s))
      return l;
    l.setOptions(i).then(function(d) {
      !p && i.onFirstUpdate && i.onFirstUpdate(d);
    });
    function v() {
      a.orderedModifiers.forEach(function(d) {
        var x = d.name, O = d.options, C = O === void 0 ? {} : O, A = d.effect;
        if (typeof A == "function") {
          var g = A({
            state: a,
            name: x,
            instance: l,
            options: C
          }), b = function() {
          };
          f.push(g || b);
        }
      });
    }
    function m() {
      f.forEach(function(d) {
        return d();
      }), f = [];
    }
    return l;
  };
}
Ne();
var Ir = [bt, Ot, yt, pt];
Ne({
  defaultModifiers: Ir
});
var Ur = [bt, Ot, yt, pt, Dr, Rr, kr, cr, Cr], zr = Ne({
  defaultModifiers: Ur
}), Yr = je(Ht()), Xr = [], Fr = function(e, t, r) {
  r === void 0 && (r = {});
  var o = y.useRef(null), n = {
    onFirstUpdate: r.onFirstUpdate,
    placement: r.placement || "bottom",
    strategy: r.strategy || "absolute",
    modifiers: r.modifiers || Xr
  }, u = y.useState({
    styles: {
      popper: {
        position: n.strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), c = u[0], s = u[1], i = y.useMemo(function() {
    return {
      name: "updateState",
      enabled: !0,
      phase: "write",
      fn: function(p) {
        var l = p.state, v = Object.keys(l.elements);
        _t.flushSync(function() {
          s({
            styles: Ke(v.map(function(m) {
              return [m, l.styles[m] || {}];
            })),
            attributes: Ke(v.map(function(m) {
              return [m, l.attributes[m]];
            }))
          });
        });
      },
      requires: ["computeStyles"]
    };
  }, []), a = y.useMemo(function() {
    var p = {
      onFirstUpdate: n.onFirstUpdate,
      placement: n.placement,
      strategy: n.strategy,
      modifiers: [].concat(n.modifiers, [i, {
        name: "applyStyles",
        enabled: !1
      }])
    };
    return (0, Yr.default)(o.current, p) ? o.current || p : (o.current = p, p);
  }, [n.onFirstUpdate, n.placement, n.strategy, n.modifiers, i]), f = y.useRef();
  return Je(function() {
    f.current && f.current.setOptions(a);
  }, [a]), Je(function() {
    if (!(e == null || t == null)) {
      var p = r.createPopper || zr, l = p(e, t, a);
      return f.current = l, function() {
        l.destroy(), f.current = null;
      };
    }
  }, [e, t, r.createPopper]), {
    state: f.current ? f.current.state : null,
    styles: c.styles,
    attributes: c.attributes,
    update: f.current ? f.current.update : null,
    forceUpdate: f.current ? f.current.forceUpdate : null
  };
};
je(Nt());
function Et(e) {
  var t = y.useRef(e);
  return t.current = e, y.useCallback(function() {
    return t.current;
  }, []);
}
var Gr = function() {
};
function Kr(e) {
  var t = e.initial, r = e.value, o = e.onChange, n = o === void 0 ? Gr : o;
  if (t === void 0 && r === void 0)
    throw new TypeError('Either "value" or "initial" variable must be set. Now both are undefined');
  var u = y.useState(t), c = u[0], s = u[1], i = Et(c), a = y.useCallback(function(p) {
    var l = i(), v = typeof p == "function" ? p(l) : p;
    typeof v.persist == "function" && v.persist(), s(v), typeof n == "function" && n(v);
  }, [i, n]), f = r !== void 0;
  return [f ? r : c, f ? n : a];
}
function St(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), function() {
    return {
      width: 0,
      height: 0,
      top: t,
      right: e,
      bottom: t,
      left: e,
      x: 0,
      y: 0,
      toJSON: function() {
        return null;
      }
    };
  };
}
var Jr = ["styles", "attributes"], st = {
  getBoundingClientRect: St()
}, ut = {
  closeOnOutsideClick: !0,
  closeOnTriggerHidden: !1,
  defaultVisible: !1,
  delayHide: 0,
  delayShow: 0,
  followCursor: !1,
  interactive: !1,
  mutationObserverOptions: {
    attributes: !0,
    childList: !0,
    subtree: !0
  },
  offset: [0, 6],
  trigger: "hover"
};
function Qr(e, t) {
  var r, o, n;
  e === void 0 && (e = {}), t === void 0 && (t = {});
  var u = Object.keys(ut).reduce(function(h, T) {
    var W;
    return te({}, h, (W = {}, W[T] = h[T] !== void 0 ? h[T] : ut[T], W));
  }, e), c = y.useMemo(
    function() {
      return [{
        name: "offset",
        options: {
          offset: u.offset
        }
      }];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.isArray(u.offset) ? u.offset : []
  ), s = te({}, t, {
    placement: t.placement || u.placement,
    modifiers: t.modifiers || c
  }), i = y.useState(null), a = i[0], f = i[1], p = y.useState(null), l = p[0], v = p[1], m = Kr({
    initial: u.defaultVisible,
    value: u.visible,
    onChange: u.onVisibleChange
  }), d = m[0], x = m[1], O = y.useRef();
  y.useEffect(function() {
    return function() {
      return clearTimeout(O.current);
    };
  }, []);
  var C = Fr(u.followCursor ? st : a, l, s), A = C.styles, g = C.attributes, b = Bt(C, Jr), E = b.update, R = Et({
    visible: d,
    triggerRef: a,
    tooltipRef: l,
    finalConfig: u
  }), S = y.useCallback(
    function(h) {
      return Array.isArray(u.trigger) ? u.trigger.includes(h) : u.trigger === h;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.isArray(u.trigger) ? u.trigger : [u.trigger]
  ), w = y.useCallback(function() {
    clearTimeout(O.current), O.current = window.setTimeout(function() {
      return x(!1);
    }, u.delayHide);
  }, [u.delayHide, x]), L = y.useCallback(function() {
    clearTimeout(O.current), O.current = window.setTimeout(function() {
      return x(!0);
    }, u.delayShow);
  }, [u.delayShow, x]), D = y.useCallback(function() {
    R().visible ? w() : L();
  }, [R, w, L]);
  y.useEffect(function() {
    if (R().finalConfig.closeOnOutsideClick) {
      var h = function(T) {
        var W, z = R(), q = z.tooltipRef, J = z.triggerRef, Q = (T.composedPath == null || (W = T.composedPath()) == null ? void 0 : W[0]) || T.target;
        Q instanceof Node && q != null && J != null && !q.contains(Q) && !J.contains(Q) && w();
      };
      return document.addEventListener("mousedown", h), function() {
        return document.removeEventListener("mousedown", h);
      };
    }
  }, [R, w]), y.useEffect(function() {
    if (!(a == null || !S("click")))
      return a.addEventListener("click", D), function() {
        return a.removeEventListener("click", D);
      };
  }, [a, S, D]), y.useEffect(function() {
    if (!(a == null || !S("double-click")))
      return a.addEventListener("dblclick", D), function() {
        return a.removeEventListener("dblclick", D);
      };
  }, [a, S, D]), y.useEffect(function() {
    if (!(a == null || !S("right-click"))) {
      var h = function(T) {
        T.preventDefault(), D();
      };
      return a.addEventListener("contextmenu", h), function() {
        return a.removeEventListener("contextmenu", h);
      };
    }
  }, [a, S, D]), y.useEffect(function() {
    if (!(a == null || !S("focus")))
      return a.addEventListener("focus", L), a.addEventListener("blur", w), function() {
        a.removeEventListener("focus", L), a.removeEventListener("blur", w);
      };
  }, [a, S, L, w]), y.useEffect(function() {
    if (!(a == null || !S("hover")))
      return a.addEventListener("mouseenter", L), a.addEventListener("mouseleave", w), function() {
        a.removeEventListener("mouseenter", L), a.removeEventListener("mouseleave", w);
      };
  }, [a, S, L, w]), y.useEffect(function() {
    if (!(l == null || !S("hover") || !R().finalConfig.interactive))
      return l.addEventListener("mouseenter", L), l.addEventListener("mouseleave", w), function() {
        l.removeEventListener("mouseenter", L), l.removeEventListener("mouseleave", w);
      };
  }, [l, S, L, w, R]);
  var $ = b == null || (r = b.state) == null || (o = r.modifiersData) == null || (n = o.hide) == null ? void 0 : n.isReferenceHidden;
  y.useEffect(function() {
    u.closeOnTriggerHidden && $ && w();
  }, [u.closeOnTriggerHidden, w, $]), y.useEffect(function() {
    if (!u.followCursor || a == null) return;
    function h(T) {
      var W = T.clientX, z = T.clientY;
      st.getBoundingClientRect = St(W, z), E?.();
    }
    return a.addEventListener("mousemove", h), function() {
      return a.removeEventListener("mousemove", h);
    };
  }, [u.followCursor, a, E]), y.useEffect(function() {
    if (!(l == null || E == null || u.mutationObserverOptions == null)) {
      var h = new MutationObserver(E);
      return h.observe(l, u.mutationObserverOptions), function() {
        return h.disconnect();
      };
    }
  }, [u.mutationObserverOptions, l, E]);
  var j = function(h) {
    return h === void 0 && (h = {}), te({}, h, {
      style: te({}, h.style, A.popper)
    }, g.popper, {
      "data-popper-interactive": u.interactive
    });
  }, V = function(h) {
    return h === void 0 && (h = {}), te({}, h, g.arrow, {
      style: te({}, h.style, A.arrow),
      "data-popper-arrow": !0
    });
  };
  return te({
    getArrowProps: V,
    getTooltipProps: j,
    setTooltipRef: v,
    setTriggerRef: f,
    tooltipRef: l,
    triggerRef: a,
    visible: d
  }, b);
}
var { document: ge } = It, P = (0, Vt.default)(1e3)(
  (e, t, r, o = 0) => t.split("-")[0] === e ? r : o
), G = 8, Zr = Le.div(
  {
    position: "absolute",
    borderStyle: "solid"
  },
  ({ placement: e }) => {
    let t = 0, r = 0;
    switch (!0) {
      case (e.startsWith("left") || e.startsWith("right")): {
        r = 8;
        break;
      }
      case (e.startsWith("top") || e.startsWith("bottom")): {
        t = 8;
        break;
      }
    }
    return { transform: `translate3d(${t}px, ${r}px, 0px)` };
  },
  ({ theme: e, color: t, placement: r }) => ({
    bottom: `${P("top", r, `${G * -1}px`, "auto")}`,
    top: `${P("bottom", r, `${G * -1}px`, "auto")}`,
    right: `${P("left", r, `${G * -1}px`, "auto")}`,
    left: `${P("right", r, `${G * -1}px`, "auto")}`,
    borderBottomWidth: `${P("top", r, "0", G)}px`,
    borderTopWidth: `${P("bottom", r, "0", G)}px`,
    borderRightWidth: `${P("left", r, "0", G)}px`,
    borderLeftWidth: `${P("right", r, "0", G)}px`,
    borderTopColor: P(
      "top",
      r,
      e.color[t] || t || e.base === "light" ? pe(e.background.app) : e.background.app,
      "transparent"
    ),
    borderBottomColor: P(
      "bottom",
      r,
      e.color[t] || t || e.base === "light" ? pe(e.background.app) : e.background.app,
      "transparent"
    ),
    borderLeftColor: P(
      "left",
      r,
      e.color[t] || t || e.base === "light" ? pe(e.background.app) : e.background.app,
      "transparent"
    ),
    borderRightColor: P(
      "right",
      r,
      e.color[t] || t || e.base === "light" ? pe(e.background.app) : e.background.app,
      "transparent"
    )
  })
), en = Le.div(
  ({ hidden: e }) => ({
    display: e ? "none" : "inline-block",
    zIndex: 2147483647,
    colorScheme: "light dark"
  }),
  ({ theme: e, color: t, hasChrome: r }) => r ? {
    background: t && e.color[t] || t || e.base === "light" ? pe(e.background.app) : e.background.app,
    filter: `
            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1))
          `,
    borderRadius: e.appBorderRadius + 2,
    fontSize: e.typography.size.s1
  } : {}
), Rt = X.forwardRef(
  ({
    placement: e = "top",
    hasChrome: t = !0,
    children: r,
    arrowProps: o = {},
    tooltipRef: n,
    color: u,
    withArrows: c,
    ...s
  }, i) => X.createElement(en, { "data-testid": "tooltip", hasChrome: t, ref: i, ...s, color: u }, t && c && X.createElement(Zr, { placement: e, ...o, color: u }), r)
);
Rt.displayName = "Tooltip";
var tn = Le.div`
  display: inline-block;
  cursor: ${(e) => e.trigger === "hover" || e.trigger?.includes("hover") ? "default" : "pointer"};
`, rn = Le.g`
  cursor: ${(e) => e.trigger === "hover" || e.trigger?.includes("hover") ? "default" : "pointer"};
`, Lt = ({
  svg: e = !1,
  trigger: t = "click",
  closeOnOutsideClick: r = !1,
  placement: o = "top",
  modifiers: n = [
    {
      name: "preventOverflow",
      options: {
        padding: 8
      }
    },
    {
      name: "offset",
      options: {
        offset: [8, 8]
      }
    },
    {
      name: "arrow",
      options: {
        padding: 8
      }
    }
  ],
  hasChrome: u = !0,
  defaultVisible: c = !1,
  withArrows: s,
  offset: i,
  tooltip: a,
  children: f,
  closeOnTriggerHidden: p,
  mutationObserverOptions: l,
  delayHide: v = t === "hover" ? 200 : 0,
  visible: m,
  interactive: d,
  delayShow: x = t === "hover" ? 400 : 0,
  strategy: O,
  followCursor: C,
  onVisibleChange: A,
  portalContainer: g,
  ...b
}) => {
  let E = e ? rn : tn, {
    getArrowProps: R,
    getTooltipProps: S,
    setTooltipRef: w,
    setTriggerRef: L,
    visible: D,
    state: $
  } = Qr(
    {
      trigger: t,
      placement: o,
      defaultVisible: c,
      delayHide: v,
      interactive: d,
      closeOnOutsideClick: r,
      closeOnTriggerHidden: p,
      onVisibleChange: A,
      delayShow: x,
      followCursor: C,
      mutationObserverOptions: l,
      visible: m,
      offset: i
    },
    {
      modifiers: n,
      strategy: O
    }
  ), j = (typeof g == "string" ? ge.querySelector(g) : g) || ge.body, V = D ? X.createElement(
    Rt,
    {
      placement: $?.placement,
      ref: w,
      hasChrome: u,
      arrowProps: R(),
      withArrows: s,
      ...S()
    },
    typeof a == "function" ? a({ onHide: () => A(!1) }) : a
  ) : null;
  return X.createElement(X.Fragment, null, X.createElement(E, { trigger: t, ref: L, ...b }, f), D && kt.createPortal(V, j));
}, an = ({
  startOpen: e = !1,
  onVisibleChange: t,
  ...r
}) => {
  let [o, n] = y.useState(e), u = y.useCallback(
    (c) => {
      t && t(c) === !1 || n(c);
    },
    [t]
  );
  return y.useEffect(() => {
    let c = () => u(!1), s = (f) => {
      f.key === "Escape" && c();
    };
    ge.addEventListener("keydown", s, !1);
    let i = Array.from(ge.getElementsByTagName("iframe")), a = [];
    return i.forEach((f) => {
      let p = () => {
        try {
          f.contentWindow.document && (f.contentWindow.document.addEventListener("click", c), a.push(() => {
            try {
              f.contentWindow.document.removeEventListener("click", c);
            } catch {
            }
          }));
        } catch {
        }
      };
      p(), f.addEventListener("load", p), a.push(() => {
        f.removeEventListener("load", p);
      });
    }), () => {
      ge.removeEventListener("keydown", s), a.forEach((f) => {
        f();
      });
    };
  }), X.createElement(Lt, { ...r, visible: o, onVisibleChange: u });
}, sn = (e) => (qt(
  "WithTooltipPure is deprecated and will be removed in Storybook 11. Please use WithTooltip instead."
), X.createElement(Lt, { "data-deprecated": "WithTooltipPure", ...e }));
export {
  Rt as Tooltip,
  an as WithTooltip,
  sn as WithTooltipPure
};
