import { q as re, w as ie } from "./iframe.js";
import { v as oe, x as ue, y as E, z as C, A as _, B as se, a as ce } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
/*!
* focus-trap 7.6.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function x(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var i = 0, o = Array(e); i < e; i++) o[i] = n[i];
  return o;
}
function fe(n) {
  if (Array.isArray(n)) return x(n);
}
function le(n, e, i) {
  return (e = ye(e)) in n ? Object.defineProperty(n, e, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = i, n;
}
function de(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function ve() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function J(n, e) {
  var i = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    e && (o = o.filter(function(y) {
      return Object.getOwnPropertyDescriptor(n, y).enumerable;
    })), i.push.apply(i, o);
  }
  return i;
}
function Q(n) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e] != null ? arguments[e] : {};
    e % 2 ? J(Object(i), !0).forEach(function(o) {
      le(n, o, i[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i)) : J(Object(i)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(i, o));
    });
  }
  return n;
}
function be(n) {
  return fe(n) || de(n) || me(n) || ve();
}
function pe(n, e) {
  if (typeof n != "object" || !n) return n;
  var i = n[Symbol.toPrimitive];
  if (i !== void 0) {
    var o = i.call(n, e);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function ye(n) {
  var e = pe(n, "string");
  return typeof e == "symbol" ? e : e + "";
}
function me(n, e) {
  if (n) {
    if (typeof n == "string") return x(n, e);
    var i = {}.toString.call(n).slice(8, -1);
    return i === "Object" && n.constructor && (i = n.constructor.name), i === "Map" || i === "Set" ? Array.from(n) : i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? x(n, e) : void 0;
  }
}
var X = {
  activateTrap: function(e, i) {
    if (e.length > 0) {
      var o = e[e.length - 1];
      o !== i && o._setPausedState(!0);
    }
    var y = e.indexOf(i);
    y === -1 || e.splice(y, 1), e.push(i);
  },
  deactivateTrap: function(e, i) {
    var o = e.indexOf(i);
    o !== -1 && e.splice(o, 1), e.length > 0 && !e[e.length - 1]._isManuallyPaused() && e[e.length - 1]._setPausedState(!1);
  }
}, he = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, ge = function(e) {
  return e?.key === "Escape" || e?.key === "Esc" || e?.keyCode === 27;
}, K = function(e) {
  return e?.key === "Tab" || e?.keyCode === 9;
}, Fe = function(e) {
  return K(e) && !e.shiftKey;
}, we = function(e) {
  return K(e) && e.shiftKey;
}, Z = function(e) {
  return setTimeout(e, 0);
}, R = function(e) {
  for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), y = 1; y < i; y++)
    o[y - 1] = arguments[y];
  return typeof e == "function" ? e.apply(void 0, o) : e;
}, j = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, Te = [], Ne = function(e, i) {
  var o = i?.document || document, y = i?.trapStack || Te, c = Q({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Fe,
    isKeyBackward: we
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
  }, h, b = function(t, a, u) {
    return t && t[a] !== void 0 ? t[a] : c[u || a];
  }, g = function(t, a) {
    var u = typeof a?.composedPath == "function" ? a.composedPath() : void 0;
    return r.containerGroups.findIndex(function(f) {
      var l = f.container, v = f.tabbableNodes;
      return l.contains(t) || u?.includes(l) || v.find(function(s) {
        return s === t;
      });
    });
  }, N = function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = a.hasFallback, f = u === void 0 ? !1 : u, l = a.params, v = l === void 0 ? [] : l, s = c[t];
    if (typeof s == "function" && (s = s.apply(void 0, be(v))), s === !0 && (s = void 0), !s) {
      if (s === void 0 || s === !1)
        return s;
      throw new Error("`".concat(t, "` was specified but was not a node, or did not return a node"));
    }
    var p = s;
    if (typeof s == "string") {
      try {
        p = o.querySelector(s);
      } catch (m) {
        throw new Error("`".concat(t, '` appears to be an invalid selector; error="').concat(m.message, '"'));
      }
      if (!p && !f)
        throw new Error("`".concat(t, "` as selector refers to no known node"));
    }
    return p;
  }, k = function() {
    var t = N("initialFocus", {
      hasFallback: !0
    });
    if (t === !1)
      return !1;
    if (t === void 0 || t && !_(t, c.tabbableOptions))
      if (g(o.activeElement) >= 0)
        t = o.activeElement;
      else {
        var a = r.tabbableGroups[0], u = a && a.firstTabbableNode;
        t = u || N("fallbackFocus");
      }
    else t === null && (t = N("fallbackFocus"));
    if (!t)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return t;
  }, D = function() {
    if (r.containerGroups = r.containers.map(function(t) {
      var a = oe(t, c.tabbableOptions), u = ue(t, c.tabbableOptions), f = a.length > 0 ? a[0] : void 0, l = a.length > 0 ? a[a.length - 1] : void 0, v = u.find(function(m) {
        return E(m);
      }), s = u.slice().reverse().find(function(m) {
        return E(m);
      }), p = !!a.find(function(m) {
        return C(m) > 0;
      });
      return {
        container: t,
        tabbableNodes: a,
        focusableNodes: u,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: p,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: f,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: l,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: v,
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
          var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, w = a.indexOf(T);
          return w < 0 ? O ? u.slice(u.indexOf(T) + 1).find(function(A) {
            return E(A);
          }) : u.slice(0, u.indexOf(T)).reverse().find(function(A) {
            return E(A);
          }) : a[w + (O ? 1 : -1)];
        }
      };
    }), r.tabbableGroups = r.containerGroups.filter(function(t) {
      return t.tabbableNodes.length > 0;
    }), r.tabbableGroups.length <= 0 && !N("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (r.containerGroups.find(function(t) {
      return t.posTabIndexesFound;
    }) && r.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, G = function(t) {
    var a = t.activeElement;
    if (a)
      return a.shadowRoot && a.shadowRoot.activeElement !== null ? G(a.shadowRoot) : a;
  }, F = function(t) {
    if (t !== !1 && t !== G(document)) {
      if (!t || !t.focus) {
        F(k());
        return;
      }
      t.focus({
        preventScroll: !!c.preventScroll
      }), r.mostRecentlyFocusedNode = t, he(t) && t.select();
    }
  }, M = function(t) {
    var a = N("setReturnFocus", {
      params: [t]
    });
    return a || (a === !1 ? !1 : t);
  }, $ = function(t) {
    var a = t.target, u = t.event, f = t.isBackward, l = f === void 0 ? !1 : f;
    a = a || j(u), D();
    var v = null;
    if (r.tabbableGroups.length > 0) {
      var s = g(a, u), p = s >= 0 ? r.containerGroups[s] : void 0;
      if (s < 0)
        l ? v = r.tabbableGroups[r.tabbableGroups.length - 1].lastTabbableNode : v = r.tabbableGroups[0].firstTabbableNode;
      else if (l) {
        var m = r.tabbableGroups.findIndex(function(I) {
          var S = I.firstTabbableNode;
          return a === S;
        });
        if (m < 0 && (p.container === a || _(a, c.tabbableOptions) && !E(a, c.tabbableOptions) && !p.nextTabbableNode(a, !1)) && (m = s), m >= 0) {
          var T = m === 0 ? r.tabbableGroups.length - 1 : m - 1, O = r.tabbableGroups[T];
          v = C(a) >= 0 ? O.lastTabbableNode : O.lastDomTabbableNode;
        } else K(u) || (v = p.nextTabbableNode(a, !1));
      } else {
        var w = r.tabbableGroups.findIndex(function(I) {
          var S = I.lastTabbableNode;
          return a === S;
        });
        if (w < 0 && (p.container === a || _(a, c.tabbableOptions) && !E(a, c.tabbableOptions) && !p.nextTabbableNode(a)) && (w = s), w >= 0) {
          var A = w === r.tabbableGroups.length - 1 ? 0 : w + 1, W = r.tabbableGroups[A];
          v = C(a) >= 0 ? W.firstTabbableNode : W.firstDomTabbableNode;
        } else K(u) || (v = p.nextTabbableNode(a));
      }
    } else
      v = N("fallbackFocus");
    return v;
  }, L = function(t) {
    var a = j(t);
    if (!(g(a, t) >= 0)) {
      if (R(c.clickOutsideDeactivates, t)) {
        h.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: c.returnFocusOnDeactivate
        });
        return;
      }
      R(c.allowOutsideClick, t) || t.preventDefault();
    }
  }, q = function(t) {
    var a = j(t), u = g(a, t) >= 0;
    if (u || a instanceof Document)
      u && (r.mostRecentlyFocusedNode = a);
    else {
      t.stopImmediatePropagation();
      var f, l = !0;
      if (r.mostRecentlyFocusedNode)
        if (C(r.mostRecentlyFocusedNode) > 0) {
          var v = g(r.mostRecentlyFocusedNode), s = r.containerGroups[v].tabbableNodes;
          if (s.length > 0) {
            var p = s.findIndex(function(m) {
              return m === r.mostRecentlyFocusedNode;
            });
            p >= 0 && (c.isKeyForward(r.recentNavEvent) ? p + 1 < s.length && (f = s[p + 1], l = !1) : p - 1 >= 0 && (f = s[p - 1], l = !1));
          }
        } else
          r.containerGroups.some(function(m) {
            return m.tabbableNodes.some(function(T) {
              return C(T) > 0;
            });
          }) || (l = !1);
      else
        l = !1;
      l && (f = $({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: r.mostRecentlyFocusedNode,
        isBackward: c.isKeyBackward(r.recentNavEvent)
      })), F(f || r.mostRecentlyFocusedNode || k());
    }
    r.recentNavEvent = void 0;
  }, ae = function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    r.recentNavEvent = t;
    var u = $({
      event: t,
      isBackward: a
    });
    u && (K(t) && t.preventDefault(), F(u));
  }, H = function(t) {
    (c.isKeyForward(t) || c.isKeyBackward(t)) && ae(t, c.isKeyBackward(t));
  }, Y = function(t) {
    ge(t) && R(c.escapeDeactivates, t) !== !1 && (t.preventDefault(), h.deactivate());
  }, z = function(t) {
    var a = j(t);
    g(a, t) >= 0 || R(c.clickOutsideDeactivates, t) || R(c.allowOutsideClick, t) || (t.preventDefault(), t.stopImmediatePropagation());
  }, U = function() {
    if (r.active)
      return X.activateTrap(y, h), r.delayInitialFocusTimer = c.delayInitialFocus ? Z(function() {
        F(k());
      }) : F(k()), o.addEventListener("focusin", q, !0), o.addEventListener("mousedown", L, {
        capture: !0,
        passive: !1
      }), o.addEventListener("touchstart", L, {
        capture: !0,
        passive: !1
      }), o.addEventListener("click", z, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", H, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", Y), h;
  }, V = function() {
    if (r.active)
      return o.removeEventListener("focusin", q, !0), o.removeEventListener("mousedown", L, !0), o.removeEventListener("touchstart", L, !0), o.removeEventListener("click", z, !0), o.removeEventListener("keydown", H, !0), o.removeEventListener("keydown", Y), h;
  }, ne = function(t) {
    var a = t.some(function(u) {
      var f = Array.from(u.removedNodes);
      return f.some(function(l) {
        return l === r.mostRecentlyFocusedNode;
      });
    });
    a && F(k());
  }, B = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(ne) : void 0, P = function() {
    B && (B.disconnect(), r.active && !r.paused && r.containers.map(function(t) {
      B.observe(t, {
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
    activate: function(t) {
      if (r.active)
        return this;
      var a = b(t, "onActivate"), u = b(t, "onPostActivate"), f = b(t, "checkCanFocusTrap");
      f || D(), r.active = !0, r.paused = !1, r.nodeFocusedBeforeActivation = o.activeElement, a?.();
      var l = function() {
        f && D(), U(), P(), u?.();
      };
      return f ? (f(r.containers.concat()).then(l, l), this) : (l(), this);
    },
    deactivate: function(t) {
      if (!r.active)
        return this;
      var a = Q({
        onDeactivate: c.onDeactivate,
        onPostDeactivate: c.onPostDeactivate,
        checkCanReturnFocus: c.checkCanReturnFocus
      }, t);
      clearTimeout(r.delayInitialFocusTimer), r.delayInitialFocusTimer = void 0, V(), r.active = !1, r.paused = !1, P(), X.deactivateTrap(y, h);
      var u = b(a, "onDeactivate"), f = b(a, "onPostDeactivate"), l = b(a, "checkCanReturnFocus"), v = b(a, "returnFocus", "returnFocusOnDeactivate");
      u?.();
      var s = function() {
        Z(function() {
          v && F(M(r.nodeFocusedBeforeActivation)), f?.();
        });
      };
      return v && l ? (l(M(r.nodeFocusedBeforeActivation)).then(s, s), this) : (s(), this);
    },
    pause: function(t) {
      return r.active ? (r.manuallyPaused = !0, this._setPausedState(!0, t)) : this;
    },
    unpause: function(t) {
      return r.active ? (r.manuallyPaused = !1, y[y.length - 1] !== this ? this : this._setPausedState(!1, t)) : this;
    },
    updateContainerElements: function(t) {
      var a = [].concat(t).filter(Boolean);
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
      value: function(t, a) {
        if (r.paused === t)
          return this;
        if (r.paused = t, t) {
          var u = b(a, "onPause"), f = b(a, "onPostPause");
          u?.(), V(), P(), f?.();
        } else {
          var l = b(a, "onUnpause"), v = b(a, "onPostUnpause");
          l?.(), D(), U(), P(), v?.();
        }
        return this;
      }
    }
  }), h.updateContainerElements(e), h;
};
function Ee(n, e) {
  return {
    clickOutsideDeactivates: !0,
    fallbackFocus: e?.fallbackFocus || n,
    setReturnFocus: (o) => (ce(o), !1),
    ...e,
    // the following options are not overridable
    document: n.ownerDocument,
    tabbableOptions: se,
    trapStack: re
  };
}
function ee(n, { focusTrapOptions: e }, i) {
  return !e?.extraContainers && !i ? n : [n, ...te(e?.extraContainers), ...te(i)];
}
function te(n = []) {
  return Array.isArray(n) ? n : [n];
}
const Pe = (n) => ie((e, i) => {
  let o, y, c;
  const r = n.focusTrapOptions;
  i.onConnected(() => {
    e[n.triggerProp] && o && h.activate();
  }), i.onUpdate((b) => {
    e.hasUpdated && b.has("focusTrapDisabled") && (e.focusTrapDisabled ? h.deactivate() : h.activate());
  }), i.onDisconnected(() => h.deactivate());
  const h = {
    activate: () => {
      const b = y || e.el;
      if (b.isConnected) {
        if (!o) {
          const g = {
            ...r,
            ...e.focusTrapOptions
          };
          c ||= ee(b, e), o = Ne(c, Ee(b, g));
        }
        (typeof e.focusTrapDisabledOverride == "function" ? !e.focusTrapDisabledOverride() : !e.focusTrapDisabled) && o.activate();
      }
    },
    deactivate: () => o?.deactivate(),
    overrideFocusTrapEl: (b) => {
      if (o)
        throw new Error("Focus trap already created");
      y = b;
    },
    setExtraContainers: (b) => {
      const g = y || e.el;
      c = ee(g, e, b);
    },
    updateContainerElements: () => o?.updateContainerElements(c)
  };
  return h;
});
export {
  Pe as u
};
