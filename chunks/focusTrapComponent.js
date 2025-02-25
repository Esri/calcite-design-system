import { j as ae, k as ne, l as k, m as R, o as _, p as re, a as ie } from "./dom.js";
import { w as oe } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
/*!
* focus-trap 7.6.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function x(n, t) {
  (t == null || t > n.length) && (t = n.length);
  for (var i = 0, o = Array(t); i < t; i++) o[i] = n[i];
  return o;
}
function ue(n) {
  if (Array.isArray(n)) return x(n);
}
function se(n, t, i) {
  return (t = be(t)) in n ? Object.defineProperty(n, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[t] = i, n;
}
function ce(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function fe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Q(n, t) {
  var i = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    t && (o = o.filter(function(m) {
      return Object.getOwnPropertyDescriptor(n, m).enumerable;
    })), i.push.apply(i, o);
  }
  return i;
}
function X(n) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Q(Object(i), !0).forEach(function(o) {
      se(n, o, i[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i)) : Q(Object(i)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(i, o));
    });
  }
  return n;
}
function le(n) {
  return ue(n) || ce(n) || ve(n) || fe();
}
function de(n, t) {
  if (typeof n != "object" || !n) return n;
  var i = n[Symbol.toPrimitive];
  if (i !== void 0) {
    var o = i.call(n, t);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(n);
}
function be(n) {
  var t = de(n, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ve(n, t) {
  if (n) {
    if (typeof n == "string") return x(n, t);
    var i = {}.toString.call(n).slice(8, -1);
    return i === "Object" && n.constructor && (i = n.constructor.name), i === "Map" || i === "Set" ? Array.from(n) : i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? x(n, t) : void 0;
  }
}
var Z = {
  activateTrap: function(t, i) {
    if (t.length > 0) {
      var o = t[t.length - 1];
      o !== i && o._setPausedState(!0);
    }
    var m = t.indexOf(i);
    m === -1 || t.splice(m, 1), t.push(i);
  },
  deactivateTrap: function(t, i) {
    var o = t.indexOf(i);
    o !== -1 && t.splice(o, 1), t.length > 0 && !t[t.length - 1]._isManuallyPaused() && t[t.length - 1]._setPausedState(!1);
  }
}, pe = function(t) {
  return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
}, me = function(t) {
  return t?.key === "Escape" || t?.key === "Esc" || t?.keyCode === 27;
}, j = function(t) {
  return t?.key === "Tab" || t?.keyCode === 9;
}, ye = function(t) {
  return j(t) && !t.shiftKey;
}, he = function(t) {
  return j(t) && t.shiftKey;
}, U = function(t) {
  return setTimeout(t, 0);
}, K = function(t) {
  for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), m = 1; m < i; m++)
    o[m - 1] = arguments[m];
  return typeof t == "function" ? t.apply(void 0, o) : t;
}, B = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, ge = [], Fe = function(t, i) {
  var o = i?.document || document, m = i?.trapStack || ge, l = X({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: ye,
    isKeyBackward: he
  }, i), r = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: !1,
    paused: !1,
    manuallyPaused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, h, y = function(e, a, u) {
    return e && e[a] !== void 0 ? e[a] : l[u || a];
  }, w = function(e, a) {
    var u = typeof a?.composedPath == "function" ? a.composedPath() : void 0;
    return r.containerGroups.findIndex(function(c) {
      var f = c.container, b = c.tabbableNodes;
      return f.contains(e) || u?.includes(f) || b.find(function(s) {
        return s === e;
      });
    });
  }, N = function(e) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = a.hasFallback, c = u === void 0 ? !1 : u, f = a.params, b = f === void 0 ? [] : f, s = l[e];
    if (typeof s == "function" && (s = s.apply(void 0, le(b))), s === !0 && (s = void 0), !s) {
      if (s === void 0 || s === !1)
        return s;
      throw new Error("`".concat(e, "` was specified but was not a node, or did not return a node"));
    }
    var v = s;
    if (typeof s == "string") {
      try {
        v = o.querySelector(s);
      } catch (p) {
        throw new Error("`".concat(e, '` appears to be an invalid selector; error="').concat(p.message, '"'));
      }
      if (!v && !c)
        throw new Error("`".concat(e, "` as selector refers to no known node"));
    }
    return v;
  }, E = function() {
    var e = N("initialFocus", {
      hasFallback: !0
    });
    if (e === !1)
      return !1;
    if (e === void 0 || e && !_(e, l.tabbableOptions))
      if (w(o.activeElement) >= 0)
        e = o.activeElement;
      else {
        var a = r.tabbableGroups[0], u = a && a.firstTabbableNode;
        e = u || N("fallbackFocus");
      }
    else e === null && (e = N("fallbackFocus"));
    if (!e)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return e;
  }, D = function() {
    if (r.containerGroups = r.containers.map(function(e) {
      var a = ae(e, l.tabbableOptions), u = ne(e, l.tabbableOptions), c = a.length > 0 ? a[0] : void 0, f = a.length > 0 ? a[a.length - 1] : void 0, b = u.find(function(p) {
        return k(p);
      }), s = u.slice().reverse().find(function(p) {
        return k(p);
      }), v = !!a.find(function(p) {
        return R(p) > 0;
      });
      return {
        container: e,
        tabbableNodes: a,
        focusableNodes: u,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: v,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: c,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: f,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: b,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: s,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(T) {
          var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, F = a.indexOf(T);
          return F < 0 ? O ? u.slice(u.indexOf(T) + 1).find(function(A) {
            return k(A);
          }) : u.slice(0, u.indexOf(T)).reverse().find(function(A) {
            return k(A);
          }) : a[F + (O ? 1 : -1)];
        }
      };
    }), r.tabbableGroups = r.containerGroups.filter(function(e) {
      return e.tabbableNodes.length > 0;
    }), r.tabbableGroups.length <= 0 && !N("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (r.containerGroups.find(function(e) {
      return e.posTabIndexesFound;
    }) && r.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, G = function(e) {
    var a = e.activeElement;
    if (a)
      return a.shadowRoot && a.shadowRoot.activeElement !== null ? G(a.shadowRoot) : a;
  }, g = function(e) {
    if (e !== !1 && e !== G(document)) {
      if (!e || !e.focus) {
        g(E());
        return;
      }
      e.focus({
        preventScroll: !!l.preventScroll
      }), r.mostRecentlyFocusedNode = e, pe(e) && e.select();
    }
  }, M = function(e) {
    var a = N("setReturnFocus", {
      params: [e]
    });
    return a || (a === !1 ? !1 : e);
  }, $ = function(e) {
    var a = e.target, u = e.event, c = e.isBackward, f = c === void 0 ? !1 : c;
    a = a || B(u), D();
    var b = null;
    if (r.tabbableGroups.length > 0) {
      var s = w(a, u), v = s >= 0 ? r.containerGroups[s] : void 0;
      if (s < 0)
        f ? b = r.tabbableGroups[r.tabbableGroups.length - 1].lastTabbableNode : b = r.tabbableGroups[0].firstTabbableNode;
      else if (f) {
        var p = r.tabbableGroups.findIndex(function(I) {
          var S = I.firstTabbableNode;
          return a === S;
        });
        if (p < 0 && (v.container === a || _(a, l.tabbableOptions) && !k(a, l.tabbableOptions) && !v.nextTabbableNode(a, !1)) && (p = s), p >= 0) {
          var T = p === 0 ? r.tabbableGroups.length - 1 : p - 1, O = r.tabbableGroups[T];
          b = R(a) >= 0 ? O.lastTabbableNode : O.lastDomTabbableNode;
        } else j(u) || (b = v.nextTabbableNode(a, !1));
      } else {
        var F = r.tabbableGroups.findIndex(function(I) {
          var S = I.lastTabbableNode;
          return a === S;
        });
        if (F < 0 && (v.container === a || _(a, l.tabbableOptions) && !k(a, l.tabbableOptions) && !v.nextTabbableNode(a)) && (F = s), F >= 0) {
          var A = F === r.tabbableGroups.length - 1 ? 0 : F + 1, J = r.tabbableGroups[A];
          b = R(a) >= 0 ? J.firstTabbableNode : J.firstDomTabbableNode;
        } else j(u) || (b = v.nextTabbableNode(a));
      }
    } else
      b = N("fallbackFocus");
    return b;
  }, L = function(e) {
    var a = B(e);
    if (!(w(a, e) >= 0)) {
      if (K(l.clickOutsideDeactivates, e)) {
        h.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: l.returnFocusOnDeactivate
        });
        return;
      }
      K(l.allowOutsideClick, e) || e.preventDefault();
    }
  }, H = function(e) {
    var a = B(e), u = w(a, e) >= 0;
    if (u || a instanceof Document)
      u && (r.mostRecentlyFocusedNode = a);
    else {
      e.stopImmediatePropagation();
      var c, f = !0;
      if (r.mostRecentlyFocusedNode)
        if (R(r.mostRecentlyFocusedNode) > 0) {
          var b = w(r.mostRecentlyFocusedNode), s = r.containerGroups[b].tabbableNodes;
          if (s.length > 0) {
            var v = s.findIndex(function(p) {
              return p === r.mostRecentlyFocusedNode;
            });
            v >= 0 && (l.isKeyForward(r.recentNavEvent) ? v + 1 < s.length && (c = s[v + 1], f = !1) : v - 1 >= 0 && (c = s[v - 1], f = !1));
          }
        } else
          r.containerGroups.some(function(p) {
            return p.tabbableNodes.some(function(T) {
              return R(T) > 0;
            });
          }) || (f = !1);
      else
        f = !1;
      f && (c = $({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: r.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(r.recentNavEvent)
      })), g(c || r.mostRecentlyFocusedNode || E());
    }
    r.recentNavEvent = void 0;
  }, ee = function(e) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    r.recentNavEvent = e;
    var u = $({
      event: e,
      isBackward: a
    });
    u && (j(e) && e.preventDefault(), g(u));
  }, q = function(e) {
    (l.isKeyForward(e) || l.isKeyBackward(e)) && ee(e, l.isKeyBackward(e));
  }, Y = function(e) {
    me(e) && K(l.escapeDeactivates, e) !== !1 && (e.preventDefault(), h.deactivate());
  }, V = function(e) {
    var a = B(e);
    w(a, e) >= 0 || K(l.clickOutsideDeactivates, e) || K(l.allowOutsideClick, e) || (e.preventDefault(), e.stopImmediatePropagation());
  }, W = function() {
    if (r.active)
      return Z.activateTrap(m, h), r.delayInitialFocusTimer = l.delayInitialFocus ? U(function() {
        g(E());
      }) : g(E()), o.addEventListener("focusin", H, !0), o.addEventListener("mousedown", L, {
        capture: !0,
        passive: !1
      }), o.addEventListener("touchstart", L, {
        capture: !0,
        passive: !1
      }), o.addEventListener("click", V, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", q, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", Y), h;
  }, z = function() {
    if (r.active)
      return o.removeEventListener("focusin", H, !0), o.removeEventListener("mousedown", L, !0), o.removeEventListener("touchstart", L, !0), o.removeEventListener("click", V, !0), o.removeEventListener("keydown", q, !0), o.removeEventListener("keydown", Y), h;
  }, te = function(e) {
    var a = e.some(function(u) {
      var c = Array.from(u.removedNodes);
      return c.some(function(f) {
        return f === r.mostRecentlyFocusedNode;
      });
    });
    a && g(E());
  }, C = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(te) : void 0, P = function() {
    C && (C.disconnect(), r.active && !r.paused && r.containers.map(function(e) {
      C.observe(e, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return h = {
    get active() {
      return r.active;
    },
    get paused() {
      return r.paused;
    },
    activate: function(e) {
      if (r.active)
        return this;
      var a = y(e, "onActivate"), u = y(e, "onPostActivate"), c = y(e, "checkCanFocusTrap");
      c || D(), r.active = !0, r.paused = !1, r.nodeFocusedBeforeActivation = o.activeElement, a?.();
      var f = function() {
        c && D(), W(), P(), u?.();
      };
      return c ? (c(r.containers.concat()).then(f, f), this) : (f(), this);
    },
    deactivate: function(e) {
      if (!r.active)
        return this;
      var a = X({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, e);
      clearTimeout(r.delayInitialFocusTimer), r.delayInitialFocusTimer = void 0, z(), r.active = !1, r.paused = !1, P(), Z.deactivateTrap(m, h);
      var u = y(a, "onDeactivate"), c = y(a, "onPostDeactivate"), f = y(a, "checkCanReturnFocus"), b = y(a, "returnFocus", "returnFocusOnDeactivate");
      u?.();
      var s = function() {
        U(function() {
          b && g(M(r.nodeFocusedBeforeActivation)), c?.();
        });
      };
      return b && f ? (f(M(r.nodeFocusedBeforeActivation)).then(s, s), this) : (s(), this);
    },
    pause: function(e) {
      return r.active ? (r.manuallyPaused = !0, this._setPausedState(!0, e)) : this;
    },
    unpause: function(e) {
      return r.active ? (r.manuallyPaused = !1, m[m.length - 1] !== this ? this : this._setPausedState(!1, e)) : this;
    },
    updateContainerElements: function(e) {
      var a = [].concat(e).filter(Boolean);
      return r.containers = a.map(function(u) {
        return typeof u == "string" ? o.querySelector(u) : u;
      }), r.active && D(), P(), this;
    }
  }, Object.defineProperties(h, {
    _isManuallyPaused: {
      value: function() {
        return r.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(e, a) {
        if (r.paused === e)
          return this;
        if (r.paused = e, e) {
          var u = y(a, "onPause"), c = y(a, "onPostPause");
          u?.(), z(), P(), c?.();
        } else {
          var f = y(a, "onUnpause"), b = y(a, "onPostUnpause");
          f?.(), D(), W(), P(), b?.();
        }
        return this;
      }
    }
  }), h.updateContainerElements(t), h;
};
function ke(n, t) {
  const { el: i } = n, o = t?.focusTrapEl || i;
  o && (n.focusTrap = Fe(o, Te(i, t?.focusTrapOptions)));
}
function Te(n, t) {
  return {
    clickOutsideDeactivates: !0,
    fallbackFocus: t?.fallbackFocus || n,
    setReturnFocus: (o) => (ie(o), !1),
    ...t,
    // the following options are not overridable
    document: n.ownerDocument,
    tabbableOptions: re,
    trapStack: oe
  };
}
function Ee(n, t) {
  (n.focusTrapDisabledOverride ? !n.focusTrapDisabledOverride() : !n.focusTrapDisabled) && n.focusTrap?.activate(t);
}
function De(n, t) {
  n.focusTrap?.deactivate(t);
}
export {
  Te as a,
  Ee as b,
  Fe as c,
  De as d,
  ke as e
};
