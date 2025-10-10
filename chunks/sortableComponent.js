/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ft(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function z(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ft(Object(n), !0).forEach(function(o) {
      Xt(t, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ft(Object(n)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return t;
}
function Me(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Me = function(e) {
    return typeof e;
  } : Me = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Me(t);
}
function Xt(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function q() {
  return q = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
  }, q.apply(this, arguments);
}
function Yt(t, e) {
  if (t == null) return {};
  var n = {}, o = Object.keys(t), r, i;
  for (i = 0; i < o.length; i++)
    r = o[i], !(e.indexOf(r) >= 0) && (n[r] = t[r]);
  return n;
}
function kt(t, e) {
  if (t == null) return {};
  var n = Yt(t, e), o, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (r = 0; r < i.length; r++)
      o = i[r], !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(t, o) && (n[o] = t[o]);
  }
  return n;
}
var Bt = "1.15.6";
function U(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var V = U(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Ce = U(/Edge/i), dt = U(/firefox/i), ye = U(/safari/i) && !U(/chrome/i) && !U(/android/i), it = U(/iP(ad|od|hone)/i), Et = U(/chrome/i) && U(/android/i), wt = {
  capture: !1,
  passive: !1
};
function v(t, e, n) {
  t.addEventListener(e, n, !V && wt);
}
function m(t, e, n) {
  t.removeEventListener(e, n, !V && wt);
}
function ke(t, e) {
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
function yt(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function H(t, e, n, o) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && ke(t, e) : ke(t, e)) || o && t === n)
        return t;
      if (t === n) break;
    } while (t = yt(t));
  }
  return null;
}
var ct = /\s+/g;
function R(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var o = (" " + t.className + " ").replace(ct, " ").replace(" " + e + " ", " ");
      t.className = (o + (n ? " " + e : "")).replace(ct, " ");
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
function Dt(t, e, n) {
  if (t) {
    var o = t.getElementsByTagName(e), r = 0, i = o.length;
    if (n)
      for (; r < i; r++)
        n(o[r], r);
    return o;
  }
  return [];
}
function L() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function C(t, e, n, o, r) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var i, a, l, s, u, d, c;
    if (t !== window && t.parentNode && t !== L() ? (i = t.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, u = i.right, d = i.height, c = i.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (e || n) && t !== window && (r = r || t.parentNode, !V))
      do
        if (r && r.getBoundingClientRect && (h(r, "transform") !== "none" || n && h(r, "position") !== "static")) {
          var b = r.getBoundingClientRect();
          a -= b.top + parseInt(h(r, "border-top-width")), l -= b.left + parseInt(h(r, "border-left-width")), s = a + i.height, u = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (o && t !== window) {
      var y = de(r || t), E = y && y.a, w = y && y.d;
      y && (a /= w, l /= E, c /= E, d /= w, s = a + d, u = l + c);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: c,
      height: d
    };
  }
}
function ht(t, e, n) {
  for (var o = ee(t, !0), r = C(t)[e]; o; ) {
    var i = C(o)[n], a = void 0;
    if (a = r >= i, !a) return o;
    if (o === L()) break;
    o = ee(o, !1);
  }
  return !1;
}
function ce(t, e, n, o) {
  for (var r = 0, i = 0, a = t.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== p.ghost && (o || a[i] !== p.dragged) && H(a[i], n.draggable, t, !1)) {
      if (r === e)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function at(t, e) {
  for (var n = t.lastElementChild; n && (n === p.ghost || h(n, "display") === "none" || e && !ke(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function Y(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== p.clone && (!e || ke(t, e)) && n++;
  return n;
}
function pt(t) {
  var e = 0, n = 0, o = L();
  if (t)
    do {
      var r = de(t), i = r.a, a = r.d;
      e += t.scrollLeft * i, n += t.scrollTop * a;
    } while (t !== o && (t = t.parentNode));
  return [e, n];
}
function Gt(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var o in e)
        if (e.hasOwnProperty(o) && e[o] === t[n][o]) return Number(n);
    }
  return -1;
}
function ee(t, e) {
  if (!t || !t.getBoundingClientRect) return L();
  var n = t, o = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = h(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return L();
        if (o || e) return n;
        o = !0;
      }
    }
  while (n = n.parentNode);
  return L();
}
function Ht(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function je(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var De;
function _t(t, e) {
  return function() {
    if (!De) {
      var n = arguments, o = this;
      n.length === 1 ? t.call(o, n[0]) : t.apply(o, n), De = setTimeout(function() {
        De = void 0;
      }, e);
    }
  };
}
function Wt() {
  clearTimeout(De), De = void 0;
}
function St(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function Tt(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function Ct(t, e, n) {
  var o = {};
  return Array.from(t.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!H(r, e.draggable, t, !1) || r.animated || r === n)) {
      var u = C(r);
      o.left = Math.min((i = o.left) !== null && i !== void 0 ? i : 1 / 0, u.left), o.top = Math.min((a = o.top) !== null && a !== void 0 ? a : 1 / 0, u.top), o.right = Math.max((l = o.right) !== null && l !== void 0 ? l : -1 / 0, u.right), o.bottom = Math.max((s = o.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
var N = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Lt() {
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
            var i = z({}, t[t.length - 1].rect);
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
      t.splice(Gt(t, {
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
        var s = 0, u = l.target, d = u.fromRect, c = C(u), b = u.prevFromRect, y = u.prevToRect, E = l.rect, w = de(u, !0);
        w && (c.top -= w.f, c.left -= w.e), u.toRect = c, u.thisAnimationDuration && je(b, c) && !je(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (E.top - c.top) / (E.left - c.left) === (d.top - c.top) / (d.left - c.left) && (s = jt(E, b, y, r.options)), je(c, d) || (u.prevFromRect = d, u.prevToRect = c, s || (s = r.options.animation), r.animate(u, E, c, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, a) : typeof o == "function" && o(), t = [];
    },
    animate: function(o, r, i, a) {
      if (a) {
        h(o, "transition", ""), h(o, "transform", "");
        var l = de(this.el), s = l && l.a, u = l && l.d, d = (r.left - i.left) / (s || 1), c = (r.top - i.top) / (u || 1);
        o.animatingX = !!d, o.animatingY = !!c, h(o, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = zt(o), h(o, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), h(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          h(o, "transition", ""), h(o, "transform", ""), o.animated = !1, o.animatingX = !1, o.animatingY = !1;
        }, a);
      }
    }
  };
}
function zt(t) {
  return t.offsetWidth;
}
function jt(t, e, n, o) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * o.animation;
}
var le = [], $e = {
  initializeByDefault: !0
}, Ie = {
  mount: function(e) {
    for (var n in $e)
      $e.hasOwnProperty(n) && !(n in e) && (e[n] = $e[n]);
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
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](z({
        sortable: n
      }, o)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](z({
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
function $t(t) {
  var e = t.sortable, n = t.rootEl, o = t.name, r = t.targetEl, i = t.cloneEl, a = t.toEl, l = t.fromEl, s = t.oldIndex, u = t.newIndex, d = t.oldDraggableIndex, c = t.newDraggableIndex, b = t.originalEvent, y = t.putSortable, E = t.extraEventProperties;
  if (e = e || n && n[N], !!e) {
    var w, k = e.options, j = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !V && !Ce ? w = new CustomEvent(o, {
      bubbles: !0,
      cancelable: !0
    }) : (w = document.createEvent("Event"), w.initEvent(o, !0, !0)), w.to = a || n, w.from = l || n, w.item = r || n, w.clone = i, w.oldIndex = s, w.newIndex = u, w.oldDraggableIndex = d, w.newDraggableIndex = c, w.originalEvent = b, w.pullMode = y ? y.lastPutMode : void 0;
    var A = z(z({}, E), Ie.getEventProperties(o, e));
    for (var B in A)
      w[B] = A[B];
    n && n.dispatchEvent(w), k[j] && k[j].call(e, w);
  }
}
var Ut = ["evt"], x = function(e, n) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = o.evt, i = kt(o, Ut);
  Ie.pluginEvent.bind(p)(e, n, z({
    dragEl: f,
    parentEl: S,
    ghostEl: g,
    rootEl: D,
    nextEl: ae,
    lastDownEl: Fe,
    cloneEl: _,
    cloneHidden: J,
    dragStarted: be,
    putSortable: I,
    activeSortable: p.active,
    originalEvent: r,
    oldIndex: fe,
    oldDraggableIndex: _e,
    newIndex: X,
    newDraggableIndex: Q,
    hideGhostForTarget: Pt,
    unhideGhostForTarget: xt,
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
  $t(z({
    putSortable: I,
    cloneEl: _,
    targetEl: f,
    rootEl: D,
    oldIndex: fe,
    oldDraggableIndex: _e,
    newIndex: X,
    newDraggableIndex: Q
  }, t));
}
var f, S, g, D, ae, Fe, _, J, fe, X, _e, Q, Ae, I, ue = !1, Be = !1, Ge = [], re, G, Ue, qe, gt, mt, be, se, Se, Te = !1, Pe = !1, Re, O, Ve = [], et = !1, He = [], Le = typeof document < "u", xe = it, vt = Ce || V ? "cssFloat" : "float", qt = Le && !Et && !it && "draggable" in document.createElement("div"), It = (function() {
  if (Le) {
    if (V)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Ot = function(e, n) {
  var o = h(e), r = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), i = ce(e, 0, n), a = ce(e, 1, n), l = i && h(i), s = a && h(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + C(i).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + C(a).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= r && o[vt] === "none" || a && o[vt] === "none" && u + d > r) ? "vertical" : "horizontal";
}, Vt = function(e, n, o) {
  var r = o ? e.left : e.top, i = o ? e.right : e.bottom, a = o ? e.width : e.height, l = o ? n.left : n.top, s = o ? n.right : n.bottom, u = o ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + u / 2;
}, Kt = function(e, n) {
  var o;
  return Ge.some(function(r) {
    var i = r[N].options.emptyInsertThreshold;
    if (!(!i || at(r))) {
      var a = C(r), l = e >= a.left - i && e <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return o = r;
    }
  }), o;
}, At = function(e) {
  function n(i, a) {
    return function(l, s, u, d) {
      var c = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (i == null && (a || c))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return n(i(l, s, u, d), a)(l, s, u, d);
      var b = (a ? l : s).options.group.name;
      return i === !0 || typeof i == "string" && i === b || i.join && i.indexOf(b) > -1;
    };
  }
  var o = {}, r = e.group;
  (!r || Me(r) != "object") && (r = {
    name: r
  }), o.name = r.name, o.checkPull = n(r.pull, !0), o.checkPut = n(r.put), o.revertClone = r.revertClone, e.group = o;
}, Pt = function() {
  !It && g && h(g, "display", "none");
}, xt = function() {
  !It && g && h(g, "display", "");
};
Le && !Et && document.addEventListener("click", function(t) {
  if (Be)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), Be = !1, !1;
}, !0);
var ie = function(e) {
  if (f) {
    e = e.touches ? e.touches[0] : e;
    var n = Kt(e.clientX, e.clientY);
    if (n) {
      var o = {};
      for (var r in e)
        e.hasOwnProperty(r) && (o[r] = e[r]);
      o.target = o.rootEl = n, o.preventDefault = void 0, o.stopPropagation = void 0, n[N]._onDragOver(o);
    }
  }
}, Zt = function(e) {
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
      return Ot(t, this.options);
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
    supportPointer: p.supportPointer !== !1 && "PointerEvent" in window && (!ye || it),
    emptyInsertThreshold: 5
  };
  Ie.initializePlugins(this, t, n);
  for (var o in n)
    !(o in e) && (e[o] = n[o]);
  At(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : qt, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? v(t, "pointerdown", this._onTapStart) : (v(t, "mousedown", this._onTapStart), v(t, "touchstart", this._onTapStart)), this.nativeDraggable && (v(t, "dragover", this), v(t, "dragenter", this)), Ge.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), q(this, Lt());
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
      var n = this, o = this.el, r = this.options, i = r.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, d = r.filter;
      if (an(o), !f && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !u.isContentEditable && !(!this.nativeDraggable && ye && s && s.tagName.toUpperCase() === "SELECT") && (s = H(s, r.draggable, o, !1), !(s && s.animated) && Fe !== s)) {
        if (fe = Y(s), _e = Y(s, r.draggable), typeof d == "function") {
          if (d.call(this, e, s, this)) {
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
        } else if (d && (d = d.split(",").some(function(c) {
          if (c = H(u, c.trim(), o, !1), c)
            return P({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              fromEl: o,
              toEl: o
            }), x("filter", n, {
              evt: e
            }), !0;
        }), d)) {
          i && e.preventDefault();
          return;
        }
        r.handle && !H(u, r.handle, o, !1) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, n, o) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (o && !f && o.parentNode === i) {
      var u = C(o);
      if (D = i, f = o, S = f.parentNode, ae = f.nextSibling, Fe = o, Ae = a.group, p.dragged = f, re = {
        target: f,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, gt = re.clientX - u.left, mt = re.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, f.style["will-change"] = "all", s = function() {
        if (x("delayEnded", r, {
          evt: e
        }), p.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !dt && r.nativeDraggable && (f.draggable = !0), r._triggerDragStart(e, n), P({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), R(f, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Dt(f, d.trim(), Ke);
      }), v(l, "dragover", ie), v(l, "mousemove", ie), v(l, "touchmove", ie), a.supportPointer ? (v(l, "pointerup", r._onDrop), !this.nativeDraggable && v(l, "pointercancel", r._onDrop)) : (v(l, "mouseup", r._onDrop), v(l, "touchend", r._onDrop), v(l, "touchcancel", r._onDrop)), dt && this.nativeDraggable && (this.options.touchStartThreshold = 4, f.draggable = !0), x("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Ce || V))) {
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
    f && Ke(f), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    m(e, "mouseup", this._disableDelayedDrag), m(e, "touchend", this._disableDelayedDrag), m(e, "touchcancel", this._disableDelayedDrag), m(e, "pointerup", this._disableDelayedDrag), m(e, "pointercancel", this._disableDelayedDrag), m(e, "mousemove", this._delayedDragTouchMoveHandler), m(e, "touchmove", this._delayedDragTouchMoveHandler), m(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? v(document, "pointermove", this._onTouchMove) : n ? v(document, "touchmove", this._onTouchMove) : v(document, "mousemove", this._onTouchMove) : (v(f, "dragend", this), v(D, "dragstart", this._onDragStart));
    try {
      document.selection ? Xe(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (ue = !1, D && f) {
      x("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && v(document, "dragover", Zt);
      var o = this.options;
      !e && R(f, o.dragClass, !1), R(f, o.ghostClass, !0), p.active = this, e && this._appendGhost(), P({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (G) {
      this._lastX = G.clientX, this._lastY = G.clientY, Pt();
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
        } while (n = yt(n));
      xt();
    }
  },
  _onTouchMove: function(e) {
    if (re) {
      var n = this.options, o = n.fallbackTolerance, r = n.fallbackOffset, i = e.touches ? e.touches[0] : e, a = g && de(g, !0), l = g && a && a.a, s = g && a && a.d, u = xe && O && pt(O), d = (i.clientX - re.clientX + r.x) / (l || 1) + (u ? u[0] - Ve[0] : 0) / (l || 1), c = (i.clientY - re.clientY + r.y) / (s || 1) + (u ? u[1] - Ve[1] : 0) / (s || 1);
      if (!p.active && !ue) {
        if (o && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < o)
          return;
        this._onDragStart(e, !0);
      }
      if (g) {
        a ? (a.e += d - (Ue || 0), a.f += c - (qe || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var b = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        h(g, "webkitTransform", b), h(g, "mozTransform", b), h(g, "msTransform", b), h(g, "transform", b), Ue = d, qe = c, G = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!g) {
      var e = this.options.fallbackOnBody ? document.body : D, n = C(f, !0, xe, !0, e), o = this.options;
      if (xe) {
        for (O = e; h(O, "position") === "static" && h(O, "transform") === "none" && O !== document; )
          O = O.parentNode;
        O !== document.body && O !== document.documentElement ? (O === document && (O = L()), n.top += O.scrollTop, n.left += O.scrollLeft) : O = L(), Ve = pt(O);
      }
      g = f.cloneNode(!0), R(g, o.ghostClass, !1), R(g, o.fallbackClass, !0), R(g, o.dragClass, !0), h(g, "transition", ""), h(g, "transform", ""), h(g, "box-sizing", "border-box"), h(g, "margin", 0), h(g, "top", n.top), h(g, "left", n.left), h(g, "width", n.width), h(g, "height", n.height), h(g, "opacity", "0.8"), h(g, "position", xe ? "absolute" : "fixed"), h(g, "zIndex", "100000"), h(g, "pointerEvents", "none"), p.ghost = g, e.appendChild(g), h(g, "transform-origin", gt / parseInt(g.style.width) * 100 + "% " + mt / parseInt(g.style.height) * 100 + "%");
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
    x("setupClone", this), p.eventCanceled || (_ = Tt(f), _.removeAttribute("id"), _.draggable = !1, _.style["will-change"] = "", this._hideClone(), R(_, this.options.chosenClass, !1), p.clone = _), o.cloneId = Xe(function() {
      x("clone", o), !p.eventCanceled && (o.options.removeCloneOnHide || D.insertBefore(_, f), o._hideClone(), P({
        sortable: o,
        name: "clone"
      }));
    }), !n && R(f, i.dragClass, !0), n ? (Be = !0, o._loopId = setInterval(o._emulateDragOver, 50)) : (m(document, "mouseup", o._onDrop), m(document, "touchend", o._onDrop), m(document, "touchcancel", o._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(o, r, f)), v(document, "drop", o), h(f, "transform", "translateZ(0)")), ue = !0, o._dragStartId = Xe(o._dragStarted.bind(o, n, e)), v(document, "selectstart", o), be = !0, window.getSelection().removeAllRanges(), ye && h(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, o = e.target, r, i, a, l = this.options, s = l.group, u = p.active, d = Ae === s, c = l.sort, b = I || u, y, E = this, w = !1;
    if (et) return;
    function k(ve, Ft) {
      x(ve, E, z({
        evt: e,
        isOwner: d,
        axis: y ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: c,
        fromSortable: b,
        target: o,
        completed: A,
        onMove: function(ut, Rt) {
          return Ne(D, n, f, r, ut, C(ut), e, Rt);
        },
        changed: B
      }, Ft));
    }
    function j() {
      k("dragOverAnimationCapture"), E.captureAnimationState(), E !== b && b.captureAnimationState();
    }
    function A(ve) {
      return k("dragOverCompleted", {
        insertion: ve
      }), ve && (d ? u._hideClone() : u._showClone(E), E !== b && (R(f, I ? I.options.ghostClass : u.options.ghostClass, !1), R(f, l.ghostClass, !0)), I !== E && E !== p.active ? I = E : E === p.active && I && (I = null), b === E && (E._ignoreWhileAnimating = o), E.animateAll(function() {
        k("dragOverAnimationComplete"), E._ignoreWhileAnimating = null;
      }), E !== b && (b.animateAll(), b._ignoreWhileAnimating = null)), (o === f && !f.animated || o === n && !o.animated) && (se = null), !l.dragoverBubble && !e.rootEl && o !== document && (f.parentNode[N]._isOutsideThisEl(e.target), !ve && ie(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), w = !0;
    }
    function B() {
      X = Y(f), Q = Y(f, l.draggable), P({
        sortable: E,
        name: "change",
        toEl: n,
        newIndex: X,
        newDraggableIndex: Q,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = H(o, l.draggable, n, !0), k("dragOver"), p.eventCanceled) return w;
    if (f.contains(e.target) || o.animated && o.animatingX && o.animatingY || E._ignoreWhileAnimating === o)
      return A(!1);
    if (Be = !1, u && !l.disabled && (d ? c || (a = S !== D) : I === this || (this.lastPutMode = Ae.checkPull(this, u, f, e)) && s.checkPut(this, u, f, e))) {
      if (y = this._getDirection(e, o) === "vertical", r = C(f), k("dragOverValid"), p.eventCanceled) return w;
      if (a)
        return S = D, j(), this._hideClone(), k("revert"), p.eventCanceled || (ae ? D.insertBefore(f, ae) : D.appendChild(f)), A(!0);
      var M = at(n, l.draggable);
      if (!M || tn(e, y, this) && !M.animated) {
        if (M === f)
          return A(!1);
        if (M && n === e.target && (o = M), o && (i = C(o)), Ne(D, n, f, r, o, i, e, !!o) !== !1)
          return j(), M && M.nextSibling ? n.insertBefore(f, M.nextSibling) : n.appendChild(f), S = n, B(), A(!0);
      } else if (M && en(e, y, this)) {
        var te = ce(n, 0, l, !0);
        if (te === f)
          return A(!1);
        if (o = te, i = C(o), Ne(D, n, f, r, o, i, e, !1) !== !1)
          return j(), n.insertBefore(f, te), S = n, B(), A(!0);
      } else if (o.parentNode === n) {
        i = C(o);
        var W = 0, ne, he = f.parentNode !== n, F = !Vt(f.animated && f.toRect || r, o.animated && o.toRect || i, y), pe = y ? "top" : "left", K = ht(o, "top", "top") || ht(f, "top", "top"), ge = K ? K.scrollTop : void 0;
        se !== o && (ne = i[pe], Te = !1, Pe = !F && l.invertSwap || he), W = nn(e, o, i, y, F ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Pe, se === o);
        var $;
        if (W !== 0) {
          var oe = Y(f);
          do
            oe -= W, $ = S.children[oe];
          while ($ && (h($, "display") === "none" || $ === g));
        }
        if (W === 0 || $ === o)
          return A(!1);
        se = o, Se = W;
        var me = o.nextElementSibling, Z = !1;
        Z = W === 1;
        var Oe = Ne(D, n, f, r, o, i, e, Z);
        if (Oe !== !1)
          return (Oe === 1 || Oe === -1) && (Z = Oe === 1), et = !0, setTimeout(Jt, 30), j(), Z && !me ? n.appendChild(f) : o.parentNode.insertBefore(f, Z ? me : o), K && St(K, 0, ge - K.scrollTop), S = f.parentNode, ne !== void 0 && !Pe && (Re = Math.abs(ne - C(o)[pe])), B(), A(!0);
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
    if (X = Y(f), Q = Y(f, o.draggable), x("drop", this, {
      evt: e
    }), S = f && f.parentNode, X = Y(f), Q = Y(f, o.draggable), p.eventCanceled) {
      this._nulling();
      return;
    }
    ue = !1, Pe = !1, Te = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), tt(this.cloneId), tt(this._dragStartId), this.nativeDraggable && (m(document, "drop", this), m(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ye && h(document.body, "user-select", ""), h(f, "transform", ""), e && (be && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), g && g.parentNode && g.parentNode.removeChild(g), (D === S || I && I.lastPutMode !== "clone") && _ && _.parentNode && _.parentNode.removeChild(_), f && (this.nativeDraggable && m(f, "dragend", this), Ke(f), f.style["will-change"] = "", be && !ue && R(f, I ? I.options.ghostClass : this.options.ghostClass, !1), R(f, this.options.chosenClass, !1), P({
      sortable: this,
      name: "unchoose",
      toEl: S,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), D !== S ? (X >= 0 && (P({
      rootEl: S,
      name: "add",
      toEl: S,
      fromEl: D,
      originalEvent: e
    }), P({
      sortable: this,
      name: "remove",
      toEl: S,
      originalEvent: e
    }), P({
      rootEl: S,
      name: "sort",
      toEl: S,
      fromEl: D,
      originalEvent: e
    }), P({
      sortable: this,
      name: "sort",
      toEl: S,
      originalEvent: e
    })), I && I.save()) : X !== fe && X >= 0 && (P({
      sortable: this,
      name: "update",
      toEl: S,
      originalEvent: e
    }), P({
      sortable: this,
      name: "sort",
      toEl: S,
      originalEvent: e
    })), p.active && ((X == null || X === -1) && (X = fe, Q = _e), P({
      sortable: this,
      name: "end",
      toEl: S,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    x("nulling", this), D = f = S = g = ae = _ = Fe = J = re = G = be = X = Q = fe = _e = se = Se = I = Ae = p.dragged = p.ghost = p.clone = p.active = null, He.forEach(function(e) {
      e.checked = !0;
    }), He.length = Ue = qe = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        f && (this._onDragOver(e), Qt(e));
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
      n = o[r], H(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || rn(n));
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
      H(l, this.options.draggable, r, !1) && (o[i] = l);
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
    return H(e, n || this.options.draggable, this.el, !1);
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
    var r = Ie.modifyOption(this, e, n);
    typeof r < "u" ? o[e] = r : o[e] = n, e === "group" && At(o);
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
      h(_, "display", "none"), this.options.removeCloneOnHide && _.parentNode && _.parentNode.removeChild(_), J = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (J) {
      if (x("showClone", this), p.eventCanceled) return;
      f.parentNode == D && !this.options.group.revertClone ? D.insertBefore(_, f) : ae ? D.insertBefore(_, ae) : D.appendChild(_), this.options.group.revertClone && this.animate(f, _), h(_, "display", ""), J = !1;
    }
  }
};
function Qt(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Ne(t, e, n, o, r, i, a, l) {
  var s, u = t[N], d = u.options.onMove, c;
  return window.CustomEvent && !V && !Ce ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = e, s.from = t, s.dragged = n, s.draggedRect = o, s.related = r || e, s.relatedRect = i || C(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), d && (c = d.call(u, s, a)), c;
}
function Ke(t) {
  t.draggable = !1;
}
function Jt() {
  et = !1;
}
function en(t, e, n) {
  var o = C(ce(n.el, 0, n.options, !0)), r = Ct(n.el, n.options, g), i = 10;
  return e ? t.clientX < r.left - i || t.clientY < o.top && t.clientX < o.right : t.clientY < r.top - i || t.clientY < o.bottom && t.clientX < o.left;
}
function tn(t, e, n) {
  var o = C(at(n.el, n.options.draggable)), r = Ct(n.el, n.options, g), i = 10;
  return e ? t.clientX > r.right + i || t.clientY > o.bottom && t.clientX > o.left : t.clientY > r.bottom + i || t.clientX > o.right && t.clientY > o.top;
}
function nn(t, e, n, o, r, i, a, l) {
  var s = o ? t.clientY : t.clientX, u = o ? n.height : n.width, d = o ? n.top : n.left, c = o ? n.bottom : n.right, b = !1;
  if (!a) {
    if (l && Re < u * r) {
      if (!Te && (Se === 1 ? s > d + u * i / 2 : s < c - u * i / 2) && (Te = !0), Te)
        b = !0;
      else if (Se === 1 ? s < d + Re : s > c - Re)
        return -Se;
    } else if (s > d + u * (1 - r) / 2 && s < c - u * (1 - r) / 2)
      return on(e);
  }
  return b = b || a, b && (s < d + u * i / 2 || s > c - u * i / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function on(t) {
  return Y(f) < Y(t) ? 1 : -1;
}
function rn(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, o = 0; n--; )
    o += e.charCodeAt(n);
  return o.toString(36);
}
function an(t) {
  He.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var o = e[n];
    o.checked && He.push(o);
  }
}
function Xe(t) {
  return setTimeout(t, 0);
}
function tt(t) {
  return clearTimeout(t);
}
Le && v(document, "touchmove", function(t) {
  (p.active || ue) && t.cancelable && t.preventDefault();
});
p.utils = {
  on: v,
  off: m,
  css: h,
  find: Dt,
  is: function(e, n) {
    return !!H(e, n, e, !1);
  },
  extend: Ht,
  throttle: _t,
  closest: H,
  toggleClass: R,
  clone: Tt,
  index: Y,
  nextTick: Xe,
  cancelNextTick: tt,
  detectDirection: Ot,
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
    o.utils && (p.utils = z(z({}, p.utils), o.utils)), Ie.mount(o);
  });
};
p.create = function(t, e) {
  return new p(t, e);
};
p.version = Bt;
var T = [], Ee, nt, ot = !1, Ze, Qe, We, we;
function ln() {
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
      this.sortable.nativeDraggable ? m(document, "dragover", this._handleAutoScroll) : (m(document, "pointermove", this._handleFallbackAutoScroll), m(document, "touchmove", this._handleFallbackAutoScroll), m(document, "mousemove", this._handleFallbackAutoScroll)), bt(), Ye(), Wt();
    },
    nulling: function() {
      We = nt = Ee = ot = we = Ze = Qe = null, T.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, o) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (We = n, o || this.options.forceAutoScrollFallback || Ce || V || ye) {
        Je(n, this.options, l, o);
        var s = ee(l, !0);
        ot && (!we || i !== Ze || a !== Qe) && (we && bt(), we = setInterval(function() {
          var u = ee(document.elementFromPoint(i, a), !0);
          u !== s && (s = u, Ye()), Je(n, r.options, u, o);
        }, 10), Ze = i, Qe = a);
      } else {
        if (!this.options.bubbleScroll || ee(l, !0) === L()) {
          Ye();
          return;
        }
        Je(n, this.options, ee(l, !1), !1);
      }
    }
  }, q(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Ye() {
  T.forEach(function(t) {
    clearInterval(t.pid);
  }), T = [];
}
function bt() {
  clearInterval(we);
}
var Je = _t(function(t, e, n, o) {
  if (e.scroll) {
    var r = (t.touches ? t.touches[0] : t).clientX, i = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = L(), u = !1, d;
    nt !== n && (nt = n, Ye(), Ee = e.scroll, d = e.scrollFn, Ee === !0 && (Ee = ee(n, !0)));
    var c = 0, b = Ee;
    do {
      var y = b, E = C(y), w = E.top, k = E.bottom, j = E.left, A = E.right, B = E.width, M = E.height, te = void 0, W = void 0, ne = y.scrollWidth, he = y.scrollHeight, F = h(y), pe = y.scrollLeft, K = y.scrollTop;
      y === s ? (te = B < ne && (F.overflowX === "auto" || F.overflowX === "scroll" || F.overflowX === "visible"), W = M < he && (F.overflowY === "auto" || F.overflowY === "scroll" || F.overflowY === "visible")) : (te = B < ne && (F.overflowX === "auto" || F.overflowX === "scroll"), W = M < he && (F.overflowY === "auto" || F.overflowY === "scroll"));
      var ge = te && (Math.abs(A - r) <= a && pe + B < ne) - (Math.abs(j - r) <= a && !!pe), $ = W && (Math.abs(k - i) <= a && K + M < he) - (Math.abs(w - i) <= a && !!K);
      if (!T[c])
        for (var oe = 0; oe <= c; oe++)
          T[oe] || (T[oe] = {});
      (T[c].vx != ge || T[c].vy != $ || T[c].el !== y) && (T[c].el = y, T[c].vx = ge, T[c].vy = $, clearInterval(T[c].pid), (ge != 0 || $ != 0) && (u = !0, T[c].pid = setInterval(function() {
        o && this.layer === 0 && p.active._onTouchMove(We);
        var me = T[this.layer].vy ? T[this.layer].vy * l : 0, Z = T[this.layer].vx ? T[this.layer].vx * l : 0;
        typeof d == "function" && d.call(p.dragged.parentNode[N], Z, me, t, We, T[this.layer].el) !== "continue" || St(T[this.layer].el, Z, me);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && b !== s && (b = ee(b, !1)));
    ot = u;
  }
}, 30), Nt = function(e) {
  var n = e.originalEvent, o = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, l = e.hideGhostForTarget, s = e.unhideGhostForTarget;
  if (n) {
    var u = o || i;
    l();
    var d = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, c = document.elementFromPoint(d.clientX, d.clientY);
    s(), u && !u.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: o
    }));
  }
};
function lt() {
}
lt.prototype = {
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
  drop: Nt
};
q(lt, {
  pluginName: "revertOnSpill"
});
function st() {
}
st.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, o = e.putSortable, r = o || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: Nt
};
q(st, {
  pluginName: "removeOnSpill"
});
p.mount(new ln());
p.mount(st, lt);
const ze = /* @__PURE__ */ new Set(), sn = {
  ghostClass: "calcite-sortable--ghost",
  chosenClass: "calcite-sortable--chosen",
  dragClass: "calcite-sortable--drag",
  fallbackClass: "calcite-sortable--fallback"
};
function hn(t) {
  if (Mt(t))
    return;
  un(t), ze.add(t);
  const e = "id", { group: n, handleSelector: o, dragSelector: r, sortDisabled: i } = t;
  t.sortable = p.create(t.el, {
    dataIdAttr: e,
    swapThreshold: 0.5,
    ...sn,
    ...!!r && { draggable: r },
    ...!!n && {
      sort: !i,
      group: {
        name: n,
        ...!!t.canPull && {
          pull: (a, l, s, { newDraggableIndex: u, oldDraggableIndex: d }) => t.canPull({
            toEl: a.el,
            fromEl: l.el,
            dragEl: s,
            newIndex: u,
            oldIndex: d
          })
        },
        ...!!t.canPut && {
          put: (a, l, s, { newDraggableIndex: u, oldDraggableIndex: d }) => t.canPut({
            toEl: a.el,
            fromEl: l.el,
            dragEl: s,
            newIndex: u,
            oldIndex: d
          })
        }
      }
    },
    onMove: ({ from: a, dragged: l, to: s, related: u }) => {
      t.onDragMove && t.onDragMove({ fromEl: a, dragEl: l, toEl: s, relatedEl: u });
    },
    handle: o,
    filter: `${o}[disabled]`,
    onStart: ({ from: a, item: l, to: s, newDraggableIndex: u, oldDraggableIndex: d }) => {
      rt.active = !0, fn(), t.onDragStart({ fromEl: a, dragEl: l, toEl: s, newIndex: u, oldIndex: d });
    },
    onEnd: ({ from: a, item: l, to: s, newDraggableIndex: u, oldDraggableIndex: d }) => {
      rt.active = !1, dn(), t.onDragEnd({ fromEl: a, dragEl: l, toEl: s, newIndex: u, oldIndex: d });
    },
    onSort: ({ from: a, item: l, to: s, newDraggableIndex: u, oldDraggableIndex: d }) => {
      t.onDragSort({ fromEl: a, dragEl: l, toEl: s, newIndex: u, oldIndex: d });
    }
  });
}
function un(t) {
  Mt(t) || (ze.delete(t), t.sortable?.destroy(), t.sortable = null);
}
const rt = { active: !1 };
function Mt(t) {
  return t.dragEnabled && rt.active;
}
function fn() {
  Array.from(ze).forEach((t) => t.onGlobalDragStart());
}
function dn() {
  Array.from(ze).forEach((t) => t.onGlobalDragEnd());
}
export {
  hn as c,
  un as d
};
