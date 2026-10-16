/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as Bt } from "./index2.js";
function Gt(t, e, n) {
  return (e = Lt(e)) in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function q() {
  return q = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var o in n) ({}).hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
  }, q.apply(null, arguments);
}
function ct(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function L(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ct(Object(n), !0).forEach(function(o) {
      Gt(t, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ct(Object(n)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return t;
}
function jt(t, e) {
  if (t == null) return {};
  var n, o, r = Ht(t, e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (o = 0; o < i.length; o++) n = i[o], e.indexOf(n) === -1 && {}.propertyIsEnumerable.call(t, n) && (r[n] = t[n]);
  }
  return r;
}
function Ht(t, e) {
  if (t == null) return {};
  var n = {};
  for (var o in t) if ({}.hasOwnProperty.call(t, o)) {
    if (e.indexOf(o) !== -1) continue;
    n[o] = t[o];
  }
  return n;
}
function Wt(t, e) {
  if (typeof t != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var o = n.call(t, e);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function Lt(t) {
  var e = Wt(t, "string");
  return typeof e == "symbol" ? e : e + "";
}
function Je(t) {
  "@babel/helpers - typeof";
  return Je = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Je(t);
}
var zt = "1.15.7";
function U(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var V = U(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Ie = U(/Edge/i), ht = U(/firefox/i), we = U(/safari/i) && !U(/chrome/i) && !U(/android/i), at = U(/iP(ad|od|hone)/i), Dt = U(/chrome/i) && U(/android/i), St = {
  capture: !1,
  passive: !1
};
function v(t, e, n) {
  t.addEventListener(e, n, !V && St);
}
function m(t, e, n) {
  t.removeEventListener(e, n, !V && St);
}
function Ye(t, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), t)
      try {
        if (t.matches)
          return t.matches(e);
        if (t.msMatchesSelector)
          return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector)
          return t.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function _t(t) {
  return t.host && t !== document && t.host.nodeType && t.host !== t ? t.host : t.parentNode;
}
function j(t, e, n, o) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && Ye(t, e) : Ye(t, e)) || o && t === n)
        return t;
      if (t === n) break;
    } while (t = _t(t));
  }
  return null;
}
var pt = /\s+/g;
function k(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var o = (" " + t.className + " ").replace(pt, " ").replace(" " + e + " ", " ");
      t.className = (o + (n ? " " + e : "")).replace(pt, " ");
    }
}
function h(t, e, n) {
  var o = t && t.style;
  if (o) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), e === void 0 ? n : n[e];
    !(e in o) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), o[e] = n + (typeof n == "string" ? "" : "px");
  }
}
function de(t, e) {
  var n = "";
  if (typeof t == "string")
    n = t;
  else
    do {
      var o = h(t, "transform");
      o && o !== "none" && (n = o + " " + n);
    } while (!e && (t = t.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(n);
}
function Tt(t, e, n) {
  if (t) {
    var o = t.getElementsByTagName(e), r = 0, i = o.length;
    if (n)
      for (; r < i; r++)
        n(o[r], r);
    return o;
  }
  return [];
}
function W() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function C(t, e, n, o, r) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var i, a, l, s, u, c, d;
    if (t !== window && t.parentNode && t !== W() ? (i = t.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, u = i.right, c = i.height, d = i.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, c = window.innerHeight, d = window.innerWidth), (e || n) && t !== window && (r = r || t.parentNode, !V))
      do
        if (r && r.getBoundingClientRect && (h(r, "transform") !== "none" || n && h(r, "position") !== "static")) {
          var b = r.getBoundingClientRect();
          a -= b.top + parseInt(h(r, "border-top-width")), l -= b.left + parseInt(h(r, "border-left-width")), s = a + i.height, u = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (o && t !== window) {
      var w = de(r || t), y = w && w.a, E = w && w.d;
      w && (a /= E, l /= y, d /= y, c /= E, s = a + c, u = l + d);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: d,
      height: c
    };
  }
}
function gt(t, e, n) {
  for (var o = ee(t, !0), r = C(t)[e]; o; ) {
    var i = C(o)[n], a = void 0;
    if (a = r >= i, !a) return o;
    if (o === W()) break;
    o = ee(o, !1);
  }
  return !1;
}
function ce(t, e, n, o) {
  for (var r = 0, i = 0, a = t.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== p.ghost && (o || a[i] !== p.dragged) && j(a[i], n.draggable, t, !1)) {
      if (r === e)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function lt(t, e) {
  for (var n = t.lastElementChild; n && (n === p.ghost || h(n, "display") === "none" || e && !Ye(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function X(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== p.clone && (!e || Ye(t, e)) && n++;
  return n;
}
function mt(t) {
  var e = 0, n = 0, o = W();
  if (t)
    do {
      var r = de(t), i = r.a, a = r.d;
      e += t.scrollLeft * i, n += t.scrollTop * a;
    } while (t !== o && (t = t.parentNode));
  return [e, n];
}
function $t(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var o in e)
        if (e.hasOwnProperty(o) && e[o] === t[n][o]) return Number(n);
    }
  return -1;
}
function ee(t, e) {
  if (!t || !t.getBoundingClientRect) return W();
  var n = t, o = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = h(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return W();
        if (o || e) return n;
        o = !0;
      }
    }
  while (n = n.parentNode);
  return W();
}
function Ut(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function Le(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var De;
function Ct(t, e) {
  return function() {
    if (!De) {
      var n = arguments, o = this;
      n.length === 1 ? t.call(o, n[0]) : t.apply(o, n), De = setTimeout(function() {
        De = void 0;
      }, e);
    }
  };
}
function qt() {
  clearTimeout(De), De = void 0;
}
function It(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function Ot(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function At(t, e, n) {
  var o = {};
  return Array.from(t.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!j(r, e.draggable, t, !1) || r.animated || r === n)) {
      var u = C(r);
      o.left = Math.min((i = o.left) !== null && i !== void 0 ? i : 1 / 0, u.left), o.top = Math.min((a = o.top) !== null && a !== void 0 ? a : 1 / 0, u.top), o.right = Math.max((l = o.right) !== null && l !== void 0 ? l : -1 / 0, u.right), o.bottom = Math.max((s = o.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
var N = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Vt() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(r) {
          if (!(h(r, "display") === "none" || r === p.ghost)) {
            t.push({
              target: r,
              rect: C(r)
            });
            var i = L({}, t[t.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = de(r, !0);
              a && (i.top -= a.f, i.left -= a.e);
            }
            r.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function(o) {
      t.push(o);
    },
    removeAnimationState: function(o) {
      t.splice($t(t, {
        target: o
      }), 1);
    },
    animateAll: function(o) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof o == "function" && o();
        return;
      }
      var i = !1, a = 0;
      t.forEach(function(l) {
        var s = 0, u = l.target, c = u.fromRect, d = C(u), b = u.prevFromRect, w = u.prevToRect, y = l.rect, E = de(u, !0);
        E && (d.top -= E.f, d.left -= E.e), u.toRect = d, u.thisAnimationDuration && Le(b, d) && !Le(c, d) && // Make sure animatingRect is on line between toRect & fromRect
        (y.top - d.top) / (y.left - d.left) === (c.top - d.top) / (c.left - d.left) && (s = Zt(y, b, w, r.options)), Le(d, c) || (u.prevFromRect = c, u.prevToRect = d, s || (s = r.options.animation), r.animate(u, y, d, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, a) : typeof o == "function" && o(), t = [];
    },
    animate: function(o, r, i, a) {
      if (a) {
        h(o, "transition", ""), h(o, "transform", "");
        var l = de(this.el), s = l && l.a, u = l && l.d, c = (r.left - i.left) / (s || 1), d = (r.top - i.top) / (u || 1);
        o.animatingX = !!c, o.animatingY = !!d, h(o, "transform", "translate3d(" + c + "px," + d + "px,0)"), this.forRepaintDummy = Kt(o), h(o, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), h(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          h(o, "transition", ""), h(o, "transform", ""), o.animated = !1, o.animatingX = !1, o.animatingY = !1;
        }, a);
      }
    }
  };
}
function Kt(t) {
  return t.offsetWidth;
}
function Zt(t, e, n, o) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * o.animation;
}
var le = [], ze = {
  initializeByDefault: !0
}, Oe = {
  mount: function(e) {
    for (var n in ze)
      ze.hasOwnProperty(n) && !(n in e) && (e[n] = ze[n]);
    le.forEach(function(o) {
      if (o.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), le.push(e);
  },
  pluginEvent: function(e, n, o) {
    var r = this;
    this.eventCanceled = !1, o.cancel = function() {
      r.eventCanceled = !0;
    };
    var i = e + "Global";
    le.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](L({
        sortable: n
      }, o)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](L({
        sortable: n
      }, o)));
    });
  },
  initializePlugins: function(e, n, o, r) {
    le.forEach(function(l) {
      var s = l.pluginName;
      if (!(!e.options[s] && !l.initializeByDefault)) {
        var u = new l(e, n, e.options);
        u.sortable = e, u.options = e.options, e[s] = u, q(o, u.defaults);
      }
    });
    for (var i in e.options)
      if (e.options.hasOwnProperty(i)) {
        var a = this.modifyOption(e, i, e.options[i]);
        typeof a < "u" && (e.options[i] = a);
      }
  },
  getEventProperties: function(e, n) {
    var o = {};
    return le.forEach(function(r) {
      typeof r.eventProperties == "function" && q(o, r.eventProperties.call(n[r.pluginName], e));
    }), o;
  },
  modifyOption: function(e, n, o) {
    var r;
    return le.forEach(function(i) {
      e[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(e[i.pluginName], o));
    }), r;
  }
};
function Qt(t) {
  var e = t.sortable, n = t.rootEl, o = t.name, r = t.targetEl, i = t.cloneEl, a = t.toEl, l = t.fromEl, s = t.oldIndex, u = t.newIndex, c = t.oldDraggableIndex, d = t.newDraggableIndex, b = t.originalEvent, w = t.putSortable, y = t.extraEventProperties;
  if (e = e || n && n[N], !!e) {
    var E, Y = e.options, z = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !V && !Ie ? E = new CustomEvent(o, {
      bubbles: !0,
      cancelable: !0
    }) : (E = document.createEvent("Event"), E.initEvent(o, !0, !0)), E.to = a || n, E.from = l || n, E.item = r || n, E.clone = i, E.oldIndex = s, E.newIndex = u, E.oldDraggableIndex = c, E.newDraggableIndex = d, E.originalEvent = b, E.pullMode = w ? w.lastPutMode : void 0;
    var A = L(L({}, y), Oe.getEventProperties(o, e));
    for (var B in A)
      E[B] = A[B];
    n && n.dispatchEvent(E), Y[z] && Y[z].call(e, E);
  }
}
var Jt = ["evt"], x = function(e, n) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = o.evt, i = jt(o, Jt);
  Oe.pluginEvent.bind(p)(e, n, L({
    dragEl: f,
    parentEl: _,
    ghostEl: g,
    rootEl: D,
    nextEl: ae,
    lastDownEl: Fe,
    cloneEl: S,
    cloneHidden: J,
    dragStarted: be,
    putSortable: I,
    activeSortable: p.active,
    originalEvent: r,
    oldIndex: fe,
    oldDraggableIndex: Se,
    newIndex: R,
    newDraggableIndex: Q,
    hideGhostForTarget: Mt,
    unhideGhostForTarget: Ft,
    cloneNowHidden: function() {
      J = !0;
    },
    cloneNowShown: function() {
      J = !1;
    },
    dispatchSortableEvent: function(l) {
      P({
        sortable: n,
        name: l,
        originalEvent: r
      });
    }
  }, i));
};
function P(t) {
  Qt(L({
    putSortable: I,
    cloneEl: S,
    targetEl: f,
    rootEl: D,
    oldIndex: fe,
    oldDraggableIndex: Se,
    newIndex: R,
    newDraggableIndex: Q
  }, t));
}
var f, _, g, D, ae, Fe, S, J, fe, R, Se, Q, Pe, I, ue = !1, Be = !1, Ge = [], re, G, $e, Ue, vt, bt, be, se, _e, Te = !1, xe = !1, ke, O, qe = [], et = !1, je = [], We = typeof document < "u", Ne = at, yt = Ie || V ? "cssFloat" : "float", en = We && !Dt && !at && "draggable" in document.createElement("div"), Pt = (function() {
  if (We) {
    if (V)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), xt = function(e, n) {
  var o = h(e), r = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), i = ce(e, 0, n), a = ce(e, 1, n), l = i && h(i), s = a && h(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + C(i).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + C(a).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= r && o[yt] === "none" || a && o[yt] === "none" && u + c > r) ? "vertical" : "horizontal";
}, tn = function(e, n, o) {
  var r = o ? e.left : e.top, i = o ? e.right : e.bottom, a = o ? e.width : e.height, l = o ? n.left : n.top, s = o ? n.right : n.bottom, u = o ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + u / 2;
}, nn = function(e, n) {
  var o;
  return Ge.some(function(r) {
    var i = r[N].options.emptyInsertThreshold;
    if (!(!i || lt(r))) {
      var a = C(r), l = e >= a.left - i && e <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return o = r;
    }
  }), o;
}, Nt = function(e) {
  function n(i, a) {
    return function(l, s, u, c) {
      var d = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (i == null && (a || d))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return n(i(l, s, u, c), a)(l, s, u, c);
      var b = (a ? l : s).options.group.name;
      return i === !0 || typeof i == "string" && i === b || i.join && i.indexOf(b) > -1;
    };
  }
  var o = {}, r = e.group;
  (!r || Je(r) != "object") && (r = {
    name: r
  }), o.name = r.name, o.checkPull = n(r.pull, !0), o.checkPut = n(r.put), o.revertClone = r.revertClone, e.group = o;
}, Mt = function() {
  !Pt && g && h(g, "display", "none");
}, Ft = function() {
  !Pt && g && h(g, "display", "");
};
We && !Dt && document.addEventListener("click", function(t) {
  if (Be)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), Be = !1, !1;
}, !0);
var ie = function(e) {
  if (f) {
    e = e.touches ? e.touches[0] : e;
    var n = nn(e.clientX, e.clientY);
    if (n) {
      var o = {};
      for (var r in e)
        e.hasOwnProperty(r) && (o[r] = e[r]);
      o.target = o.rootEl = n, o.preventDefault = void 0, o.stopPropagation = void 0, n[N]._onDragOver(o);
    }
  }
}, on = function(e) {
  f && f.parentNode[N]._isOutsideThisEl(e.target);
};
function p(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = q({}, e), t[N] = this;
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(t.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return xt(t, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(a, l) {
      a.setData("Text", l.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: p.supportPointer !== !1 && "PointerEvent" in window && (!we || at),
    emptyInsertThreshold: 5
  };
  Oe.initializePlugins(this, t, n);
  for (var o in n)
    !(o in e) && (e[o] = n[o]);
  Nt(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : en, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? v(t, "pointerdown", this._onTapStart) : (v(t, "mousedown", this._onTapStart), v(t, "touchstart", this._onTapStart)), this.nativeDraggable && (v(t, "dragover", this), v(t, "dragenter", this)), Ge.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), q(this, Vt());
}
p.prototype = /** @lends Sortable.prototype */
{
  constructor: p,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (se = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, f) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, o = this.el, r = this.options, i = r.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, c = r.filter;
      if (cn(o), !f && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !u.isContentEditable && !(!this.nativeDraggable && we && s && s.tagName.toUpperCase() === "SELECT") && (s = j(s, r.draggable, o, !1), !(s && s.animated) && Fe !== s)) {
        if (fe = X(s), Se = X(s, r.draggable), typeof c == "function") {
          if (c.call(this, e, s, this)) {
            P({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: o,
              fromEl: o
            }), x("filter", n, {
              evt: e
            }), i && e.preventDefault();
            return;
          }
        } else if (c && (c = c.split(",").some(function(d) {
          if (d = j(u, d.trim(), o, !1), d)
            return P({
              sortable: n,
              rootEl: d,
              name: "filter",
              targetEl: s,
              fromEl: o,
              toEl: o
            }), x("filter", n, {
              evt: e
            }), !0;
        }), c)) {
          i && e.preventDefault();
          return;
        }
        r.handle && !j(u, r.handle, o, !1) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, n, o) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (o && !f && o.parentNode === i) {
      var u = C(o);
      if (D = i, f = o, _ = f.parentNode, ae = f.nextSibling, Fe = o, Pe = a.group, p.dragged = f, re = {
        target: f,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, vt = re.clientX - u.left, bt = re.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, f.style["will-change"] = "all", s = function() {
        if (x("delayEnded", r, {
          evt: e
        }), p.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !ht && r.nativeDraggable && (f.draggable = !0), r._triggerDragStart(e, n), P({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), k(f, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(c) {
        Tt(f, c.trim(), Ve);
      }), v(l, "dragover", ie), v(l, "mousemove", ie), v(l, "touchmove", ie), a.supportPointer ? (v(l, "pointerup", r._onDrop), !this.nativeDraggable && v(l, "pointercancel", r._onDrop)) : (v(l, "mouseup", r._onDrop), v(l, "touchend", r._onDrop), v(l, "touchcancel", r._onDrop)), ht && this.nativeDraggable && (this.options.touchStartThreshold = 4, f.draggable = !0), x("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Ie || V))) {
        if (p.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (v(l, "pointerup", r._disableDelayedDrag), v(l, "pointercancel", r._disableDelayedDrag)) : (v(l, "mouseup", r._disableDelayedDrag), v(l, "touchend", r._disableDelayedDrag), v(l, "touchcancel", r._disableDelayedDrag)), v(l, "mousemove", r._delayedDragTouchMoveHandler), v(l, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && v(l, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    f && Ve(f), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    m(e, "mouseup", this._disableDelayedDrag), m(e, "touchend", this._disableDelayedDrag), m(e, "touchcancel", this._disableDelayedDrag), m(e, "pointerup", this._disableDelayedDrag), m(e, "pointercancel", this._disableDelayedDrag), m(e, "mousemove", this._delayedDragTouchMoveHandler), m(e, "touchmove", this._delayedDragTouchMoveHandler), m(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? v(document, "pointermove", this._onTouchMove) : n ? v(document, "touchmove", this._onTouchMove) : v(document, "mousemove", this._onTouchMove) : (v(f, "dragend", this), v(D, "dragstart", this._onDragStart));
    try {
      document.selection ? Re(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (ue = !1, D && f) {
      x("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && v(document, "dragover", on);
      var o = this.options;
      !e && k(f, o.dragClass, !1), k(f, o.ghostClass, !0), p.active = this, e && this._appendGhost(), P({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (G) {
      this._lastX = G.clientX, this._lastY = G.clientY, Mt();
      for (var e = document.elementFromPoint(G.clientX, G.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(G.clientX, G.clientY), e !== n); )
        n = e;
      if (f.parentNode[N]._isOutsideThisEl(e), n)
        do {
          if (n[N]) {
            var o = void 0;
            if (o = n[N]._onDragOver({
              clientX: G.clientX,
              clientY: G.clientY,
              target: e,
              rootEl: n
            }), o && !this.options.dragoverBubble)
              break;
          }
          e = n;
        } while (n = _t(n));
      Ft();
    }
  },
  _onTouchMove: function(e) {
    if (re) {
      var n = this.options, o = n.fallbackTolerance, r = n.fallbackOffset, i = e.touches ? e.touches[0] : e, a = g && de(g, !0), l = g && a && a.a, s = g && a && a.d, u = Ne && O && mt(O), c = (i.clientX - re.clientX + r.x) / (l || 1) + (u ? u[0] - qe[0] : 0) / (l || 1), d = (i.clientY - re.clientY + r.y) / (s || 1) + (u ? u[1] - qe[1] : 0) / (s || 1);
      if (!p.active && !ue) {
        if (o && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < o)
          return;
        this._onDragStart(e, !0);
      }
      if (g) {
        a ? (a.e += c - ($e || 0), a.f += d - (Ue || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: c,
          f: d
        };
        var b = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        h(g, "webkitTransform", b), h(g, "mozTransform", b), h(g, "msTransform", b), h(g, "transform", b), $e = c, Ue = d, G = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!g) {
      var e = this.options.fallbackOnBody ? document.body : D, n = C(f, !0, Ne, !0, e), o = this.options;
      if (Ne) {
        for (O = e; h(O, "position") === "static" && h(O, "transform") === "none" && O !== document; )
          O = O.parentNode;
        O !== document.body && O !== document.documentElement ? (O === document && (O = W()), n.top += O.scrollTop, n.left += O.scrollLeft) : O = W(), qe = mt(O);
      }
      g = f.cloneNode(!0), k(g, o.ghostClass, !1), k(g, o.fallbackClass, !0), k(g, o.dragClass, !0), h(g, "transition", ""), h(g, "transform", ""), h(g, "box-sizing", "border-box"), h(g, "margin", 0), h(g, "top", n.top), h(g, "left", n.left), h(g, "width", n.width), h(g, "height", n.height), h(g, "opacity", "0.8"), h(g, "position", Ne ? "absolute" : "fixed"), h(g, "zIndex", "100000"), h(g, "pointerEvents", "none"), p.ghost = g, e.appendChild(g), h(g, "transform-origin", vt / parseInt(g.style.width) * 100 + "% " + bt / parseInt(g.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var o = this, r = e.dataTransfer, i = o.options;
    if (x("dragStart", this, {
      evt: e
    }), p.eventCanceled) {
      this._onDrop();
      return;
    }
    x("setupClone", this), p.eventCanceled || (S = Ot(f), S.removeAttribute("id"), S.draggable = !1, S.style["will-change"] = "", this._hideClone(), k(S, this.options.chosenClass, !1), p.clone = S), o.cloneId = Re(function() {
      x("clone", o), !p.eventCanceled && (o.options.removeCloneOnHide || D.insertBefore(S, f), o._hideClone(), P({
        sortable: o,
        name: "clone"
      }));
    }), !n && k(f, i.dragClass, !0), n ? (Be = !0, o._loopId = setInterval(o._emulateDragOver, 50)) : (m(document, "mouseup", o._onDrop), m(document, "touchend", o._onDrop), m(document, "touchcancel", o._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(o, r, f)), v(document, "drop", o), h(f, "transform", "translateZ(0)")), ue = !0, o._dragStartId = Re(o._dragStarted.bind(o, n, e)), v(document, "selectstart", o), be = !0, window.getSelection().removeAllRanges(), we && h(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, o = e.target, r, i, a, l = this.options, s = l.group, u = p.active, c = Pe === s, d = l.sort, b = I || u, w, y = this, E = !1;
    if (et) return;
    function Y(ve, Xt) {
      x(ve, y, L({
        evt: e,
        isOwner: c,
        axis: w ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: d,
        fromSortable: b,
        target: o,
        completed: A,
        onMove: function(dt, Yt) {
          return Me(D, n, f, r, dt, C(dt), e, Yt);
        },
        changed: B
      }, Xt));
    }
    function z() {
      Y("dragOverAnimationCapture"), y.captureAnimationState(), y !== b && b.captureAnimationState();
    }
    function A(ve) {
      return Y("dragOverCompleted", {
        insertion: ve
      }), ve && (c ? u._hideClone() : u._showClone(y), y !== b && (k(f, I ? I.options.ghostClass : u.options.ghostClass, !1), k(f, l.ghostClass, !0)), I !== y && y !== p.active ? I = y : y === p.active && I && (I = null), b === y && (y._ignoreWhileAnimating = o), y.animateAll(function() {
        Y("dragOverAnimationComplete"), y._ignoreWhileAnimating = null;
      }), y !== b && (b.animateAll(), b._ignoreWhileAnimating = null)), (o === f && !f.animated || o === n && !o.animated) && (se = null), !l.dragoverBubble && !e.rootEl && o !== document && (f.parentNode[N]._isOutsideThisEl(e.target), !ve && ie(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), E = !0;
    }
    function B() {
      R = X(f), Q = X(f, l.draggable), P({
        sortable: y,
        name: "change",
        toEl: n,
        newIndex: R,
        newDraggableIndex: Q,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = j(o, l.draggable, n, !0), Y("dragOver"), p.eventCanceled) return E;
    if (f.contains(e.target) || o.animated && o.animatingX && o.animatingY || y._ignoreWhileAnimating === o)
      return A(!1);
    if (Be = !1, u && !l.disabled && (c ? d || (a = _ !== D) : I === this || (this.lastPutMode = Pe.checkPull(this, u, f, e)) && s.checkPut(this, u, f, e))) {
      if (w = this._getDirection(e, o) === "vertical", r = C(f), Y("dragOverValid"), p.eventCanceled) return E;
      if (a)
        return _ = D, z(), this._hideClone(), Y("revert"), p.eventCanceled || (ae ? D.insertBefore(f, ae) : D.appendChild(f)), A(!0);
      var M = lt(n, l.draggable);
      if (!M || sn(e, w, this) && !M.animated) {
        if (M === f)
          return A(!1);
        if (M && n === e.target && (o = M), o && (i = C(o)), Me(D, n, f, r, o, i, e, !!o) !== !1)
          return z(), M && M.nextSibling ? n.insertBefore(f, M.nextSibling) : n.appendChild(f), _ = n, B(), A(!0);
      } else if (M && ln(e, w, this)) {
        var te = ce(n, 0, l, !0);
        if (te === f)
          return A(!1);
        if (o = te, i = C(o), Me(D, n, f, r, o, i, e, !1) !== !1)
          return z(), n.insertBefore(f, te), _ = n, B(), A(!0);
      } else if (o.parentNode === n) {
        i = C(o);
        var H = 0, ne, he = f.parentNode !== n, F = !tn(f.animated && f.toRect || r, o.animated && o.toRect || i, w), pe = w ? "top" : "left", K = gt(o, "top", "top") || gt(f, "top", "top"), ge = K ? K.scrollTop : void 0;
        se !== o && (ne = i[pe], Te = !1, xe = !F && l.invertSwap || he), H = un(e, o, i, w, F ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, xe, se === o);
        var $;
        if (H !== 0) {
          var oe = X(f);
          do
            oe -= H, $ = _.children[oe];
          while ($ && (h($, "display") === "none" || $ === g));
        }
        if (H === 0 || $ === o)
          return A(!1);
        se = o, _e = H;
        var me = o.nextElementSibling, Z = !1;
        Z = H === 1;
        var Ae = Me(D, n, f, r, o, i, e, Z);
        if (Ae !== !1)
          return (Ae === 1 || Ae === -1) && (Z = Ae === 1), et = !0, setTimeout(an, 30), z(), Z && !me ? n.appendChild(f) : o.parentNode.insertBefore(f, Z ? me : o), K && It(K, 0, ge - K.scrollTop), _ = f.parentNode, ne !== void 0 && !xe && (ke = Math.abs(ne - C(o)[pe])), B(), A(!0);
      }
      if (n.contains(f))
        return A(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    m(document, "mousemove", this._onTouchMove), m(document, "touchmove", this._onTouchMove), m(document, "pointermove", this._onTouchMove), m(document, "dragover", ie), m(document, "mousemove", ie), m(document, "touchmove", ie);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    m(e, "mouseup", this._onDrop), m(e, "touchend", this._onDrop), m(e, "pointerup", this._onDrop), m(e, "pointercancel", this._onDrop), m(e, "touchcancel", this._onDrop), m(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, o = this.options;
    if (R = X(f), Q = X(f, o.draggable), x("drop", this, {
      evt: e
    }), _ = f && f.parentNode, R = X(f), Q = X(f, o.draggable), p.eventCanceled) {
      this._nulling();
      return;
    }
    ue = !1, xe = !1, Te = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tt(this.cloneId), tt(this._dragStartId), this.nativeDraggable && (m(document, "drop", this), m(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), we && h(document.body, "user-select", ""), h(f, "transform", ""), e && (be && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), g && g.parentNode && g.parentNode.removeChild(g), (D === _ || I && I.lastPutMode !== "clone") && S && S.parentNode && S.parentNode.removeChild(S), f && (this.nativeDraggable && m(f, "dragend", this), Ve(f), f.style["will-change"] = "", be && !ue && k(f, I ? I.options.ghostClass : this.options.ghostClass, !1), k(f, this.options.chosenClass, !1), P({
      sortable: this,
      name: "unchoose",
      toEl: _,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), D !== _ ? (R >= 0 && (P({
      rootEl: _,
      name: "add",
      toEl: _,
      fromEl: D,
      originalEvent: e
    }), P({
      sortable: this,
      name: "remove",
      toEl: _,
      originalEvent: e
    }), P({
      rootEl: _,
      name: "sort",
      toEl: _,
      fromEl: D,
      originalEvent: e
    }), P({
      sortable: this,
      name: "sort",
      toEl: _,
      originalEvent: e
    })), I && I.save()) : R !== fe && R >= 0 && (P({
      sortable: this,
      name: "update",
      toEl: _,
      originalEvent: e
    }), P({
      sortable: this,
      name: "sort",
      toEl: _,
      originalEvent: e
    })), p.active && ((R == null || R === -1) && (R = fe, Q = Se), P({
      sortable: this,
      name: "end",
      toEl: _,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    x("nulling", this), D = f = _ = g = ae = S = Fe = J = re = G = be = R = Q = fe = Se = se = _e = I = Pe = p.dragged = p.ghost = p.clone = p.active = null;
    var e = this.el;
    je.forEach(function(n) {
      e.contains(n) && (n.checked = !0);
    }), je.length = $e = Ue = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        f && (this._onDragOver(e), rn(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], n, o = this.el.children, r = 0, i = o.length, a = this.options; r < i; r++)
      n = o[r], j(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || dn(n));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, n) {
    var o = {}, r = this.el;
    this.toArray().forEach(function(i, a) {
      var l = r.children[a];
      j(l, this.options.draggable, r, !1) && (o[i] = l);
    }, this), n && this.captureAnimationState(), e.forEach(function(i) {
      o[i] && (r.removeChild(o[i]), r.appendChild(o[i]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, n) {
    return j(e, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, n) {
    var o = this.options;
    if (n === void 0)
      return o[e];
    var r = Oe.modifyOption(this, e, n);
    typeof r < "u" ? o[e] = r : o[e] = n, e === "group" && Nt(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    x("destroy", this);
    var e = this.el;
    e[N] = null, m(e, "mousedown", this._onTapStart), m(e, "touchstart", this._onTapStart), m(e, "pointerdown", this._onTapStart), this.nativeDraggable && (m(e, "dragover", this), m(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Ge.splice(Ge.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!J) {
      if (x("hideClone", this), p.eventCanceled) return;
      h(S, "display", "none"), this.options.removeCloneOnHide && S.parentNode && S.parentNode.removeChild(S), J = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (J) {
      if (x("showClone", this), p.eventCanceled) return;
      f.parentNode == D && !this.options.group.revertClone ? D.insertBefore(S, f) : ae ? D.insertBefore(S, ae) : D.appendChild(S), this.options.group.revertClone && this.animate(f, S), h(S, "display", ""), J = !1;
    }
  }
};
function rn(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Me(t, e, n, o, r, i, a, l) {
  var s, u = t[N], c = u.options.onMove, d;
  return window.CustomEvent && !V && !Ie ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = e, s.from = t, s.dragged = n, s.draggedRect = o, s.related = r || e, s.relatedRect = i || C(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), c && (d = c.call(u, s, a)), d;
}
function Ve(t) {
  t.draggable = !1;
}
function an() {
  et = !1;
}
function ln(t, e, n) {
  var o = C(ce(n.el, 0, n.options, !0)), r = At(n.el, n.options, g), i = 10;
  return e ? t.clientX < r.left - i || t.clientY < o.top && t.clientX < o.right : t.clientY < r.top - i || t.clientY < o.bottom && t.clientX < o.left;
}
function sn(t, e, n) {
  var o = C(lt(n.el, n.options.draggable)), r = At(n.el, n.options, g), i = 10;
  return e ? t.clientX > r.right + i || t.clientY > o.bottom && t.clientX > o.left : t.clientY > r.bottom + i || t.clientX > o.right && t.clientY > o.top;
}
function un(t, e, n, o, r, i, a, l) {
  var s = o ? t.clientY : t.clientX, u = o ? n.height : n.width, c = o ? n.top : n.left, d = o ? n.bottom : n.right, b = !1;
  if (!a) {
    if (l && ke < u * r) {
      if (!Te && (_e === 1 ? s > c + u * i / 2 : s < d - u * i / 2) && (Te = !0), Te)
        b = !0;
      else if (_e === 1 ? s < c + ke : s > d - ke)
        return -_e;
    } else if (s > c + u * (1 - r) / 2 && s < d - u * (1 - r) / 2)
      return fn(e);
  }
  return b = b || a, b && (s < c + u * i / 2 || s > d - u * i / 2) ? s > c + u / 2 ? 1 : -1 : 0;
}
function fn(t) {
  return X(f) < X(t) ? 1 : -1;
}
function dn(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, o = 0; n--; )
    o += e.charCodeAt(n);
  return o.toString(36);
}
function cn(t) {
  je.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var o = e[n];
    o.checked && je.push(o);
  }
}
function Re(t) {
  return setTimeout(t, 0);
}
function tt(t) {
  return clearTimeout(t);
}
We && v(document, "touchmove", function(t) {
  (p.active || ue) && t.cancelable && t.preventDefault();
});
p.utils = {
  on: v,
  off: m,
  css: h,
  find: Tt,
  is: function(e, n) {
    return !!j(e, n, e, !1);
  },
  extend: Ut,
  throttle: Ct,
  closest: j,
  toggleClass: k,
  clone: Ot,
  index: X,
  nextTick: Re,
  cancelNextTick: tt,
  detectDirection: xt,
  getChild: ce,
  expando: N
};
p.get = function(t) {
  return t[N];
};
p.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (p.utils = L(L({}, p.utils), o.utils)), Oe.mount(o);
  });
};
p.create = function(t, e) {
  return new p(t, e);
};
p.version = zt;
var T = [], ye, nt, ot = !1, Ke, Ze, He, Ee;
function hn() {
  function t() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return t.prototype = {
    dragStarted: function(n) {
      var o = n.originalEvent;
      this.sortable.nativeDraggable ? v(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? v(document, "pointermove", this._handleFallbackAutoScroll) : o.touches ? v(document, "touchmove", this._handleFallbackAutoScroll) : v(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var o = n.originalEvent;
      !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
    },
    drop: function() {
      this.sortable.nativeDraggable ? m(document, "dragover", this._handleAutoScroll) : (m(document, "pointermove", this._handleFallbackAutoScroll), m(document, "touchmove", this._handleFallbackAutoScroll), m(document, "mousemove", this._handleFallbackAutoScroll)), Et(), Xe(), qt();
    },
    nulling: function() {
      He = nt = ye = ot = Ee = Ke = Ze = null, T.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, o) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (He = n, o || this.options.forceAutoScrollFallback || Ie || V || we) {
        Qe(n, this.options, l, o);
        var s = ee(l, !0);
        ot && (!Ee || i !== Ke || a !== Ze) && (Ee && Et(), Ee = setInterval(function() {
          var u = ee(document.elementFromPoint(i, a), !0);
          u !== s && (s = u, Xe()), Qe(n, r.options, u, o);
        }, 10), Ke = i, Ze = a);
      } else {
        if (!this.options.bubbleScroll || ee(l, !0) === W()) {
          Xe();
          return;
        }
        Qe(n, this.options, ee(l, !1), !1);
      }
    }
  }, q(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Xe() {
  T.forEach(function(t) {
    clearInterval(t.pid);
  }), T = [];
}
function Et() {
  clearInterval(Ee);
}
var Qe = Ct(function(t, e, n, o) {
  if (e.scroll) {
    var r = (t.touches ? t.touches[0] : t).clientX, i = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = W(), u = !1, c;
    nt !== n && (nt = n, Xe(), ye = e.scroll, c = e.scrollFn, ye === !0 && (ye = ee(n, !0)));
    var d = 0, b = ye;
    do {
      var w = b, y = C(w), E = y.top, Y = y.bottom, z = y.left, A = y.right, B = y.width, M = y.height, te = void 0, H = void 0, ne = w.scrollWidth, he = w.scrollHeight, F = h(w), pe = w.scrollLeft, K = w.scrollTop;
      w === s ? (te = B < ne && (F.overflowX === "auto" || F.overflowX === "scroll" || F.overflowX === "visible"), H = M < he && (F.overflowY === "auto" || F.overflowY === "scroll" || F.overflowY === "visible")) : (te = B < ne && (F.overflowX === "auto" || F.overflowX === "scroll"), H = M < he && (F.overflowY === "auto" || F.overflowY === "scroll"));
      var ge = te && (Math.abs(A - r) <= a && pe + B < ne) - (Math.abs(z - r) <= a && !!pe), $ = H && (Math.abs(Y - i) <= a && K + M < he) - (Math.abs(E - i) <= a && !!K);
      if (!T[d])
        for (var oe = 0; oe <= d; oe++)
          T[oe] || (T[oe] = {});
      (T[d].vx != ge || T[d].vy != $ || T[d].el !== w) && (T[d].el = w, T[d].vx = ge, T[d].vy = $, clearInterval(T[d].pid), (ge != 0 || $ != 0) && (u = !0, T[d].pid = setInterval(function() {
        o && this.layer === 0 && p.active._onTouchMove(He);
        var me = T[this.layer].vy ? T[this.layer].vy * l : 0, Z = T[this.layer].vx ? T[this.layer].vx * l : 0;
        typeof c == "function" && c.call(p.dragged.parentNode[N], Z, me, t, He, T[this.layer].el) !== "continue" || It(T[this.layer].el, Z, me);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (e.bubbleScroll && b !== s && (b = ee(b, !1)));
    ot = u;
  }
}, 30), kt = function(e) {
  var n = e.originalEvent, o = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, l = e.hideGhostForTarget, s = e.unhideGhostForTarget;
  if (n) {
    var u = o || i;
    l();
    var c = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, d = document.elementFromPoint(c.clientX, c.clientY);
    s(), u && !u.el.contains(d) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: o
    }));
  }
};
function st() {
}
st.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, o = e.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var r = ce(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n), this.sortable.animateAll(), o && o.animateAll();
  },
  drop: kt
};
q(st, {
  pluginName: "revertOnSpill"
});
function ut() {
}
ut.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, o = e.putSortable, r = o || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: kt
};
q(ut, {
  pluginName: "removeOnSpill"
});
p.mount(new hn());
p.mount(ut, st);
const Ce = /* @__PURE__ */ new Set(), pn = {
  ghostClass: "calcite-sortable--ghost",
  chosenClass: "calcite-sortable--chosen",
  dragClass: "calcite-sortable--drag",
  fallbackClass: "calcite-sortable--fallback"
};
function gn() {
  Array.from(Ce).forEach((t) => t.onGlobalDragStart());
}
function mn() {
  Array.from(Ce).forEach((t) => t.onGlobalDragEnd());
}
const rt = { active: !1 }, ft = /* @__PURE__ */ new Set();
function Rt() {
  const t = ft.size > 0;
  if (rt.active !== t) {
    if (rt.active = t, t) {
      gn();
      return;
    }
    mn();
  }
}
function wt(t) {
  ft.add(t), Rt();
}
function it(t) {
  ft.delete(t), Rt();
}
function vn(t) {
  const { el: n, group: o, handleSelector: r, dragSelector: i, sortDisabled: a } = t;
  return p.create(n, {
    dataIdAttr: "id",
    swapThreshold: 0.5,
    // Keep the fallback ghost out of nested list DOM updates during touch drag startup.
    // Applied globally so all sortable hosts use the same stable fallback behavior.
    fallbackOnBody: !0,
    ...pn,
    ...!!i && { draggable: i },
    ...!!o && {
      sort: !a,
      group: {
        name: o,
        ...!!t.canPull && {
          pull: (l, s, u, { newDraggableIndex: c, oldDraggableIndex: d }) => t.canPull({
            toEl: l.el,
            fromEl: s.el,
            dragEl: u,
            newIndex: c,
            oldIndex: d
          })
        },
        ...!!t.canPut && {
          put: (l, s, u, { newDraggableIndex: c, oldDraggableIndex: d }) => t.canPut({
            toEl: l.el,
            fromEl: s.el,
            dragEl: u,
            newIndex: c,
            oldIndex: d
          })
        }
      }
    },
    onMove: ({ from: l, dragged: s, to: u, related: c }) => {
      t.onDragMove && t.onDragMove({ fromEl: l, dragEl: s, toEl: u, relatedEl: c });
    },
    handle: r,
    filter: `${r}[disabled]`,
    onChoose: () => {
      wt(t);
    },
    onUnchoose: () => {
      it(t);
    },
    onStart: ({ from: l, item: s, to: u, newDraggableIndex: c, oldDraggableIndex: d }) => {
      wt(t), t.onDragStart({ fromEl: l, dragEl: s, toEl: u, newIndex: c, oldIndex: d });
    },
    onEnd: ({ from: l, item: s, to: u, newDraggableIndex: c, oldDraggableIndex: d }) => {
      it(t), t.onDragEnd({ fromEl: l, dragEl: s, toEl: u, newIndex: c, oldIndex: d });
    },
    onSort: ({ from: l, item: s, to: u, newDraggableIndex: c, oldDraggableIndex: d }) => {
      t.onDragSort({ fromEl: l, dragEl: s, toEl: u, newIndex: c, oldIndex: d });
    }
  });
}
const En = () => Bt((t, e) => {
  let n;
  function o(a) {
    return a.dragEnabled && rt.active;
  }
  function r(a) {
    o(a) || (i(a), a.dragEnabled && (Ce.add(a), n = vn(a)));
  }
  function i(a) {
    o(a) || (Ce.delete(a), n?.destroy(), n = void 0);
  }
  return e.onConnected(() => {
    r(t);
  }), e.onDisconnected(() => {
    Ce.delete(t), it(t), i(t);
  }), {
    reset: () => {
      r(t);
    }
  };
});
export {
  En as u
};
