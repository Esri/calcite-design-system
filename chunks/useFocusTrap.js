import { m as ie } from "./useT9n.js";
import { v as ue, x as oe, y as k, z as C, A as x, B as se, a as ce } from "./dom.js";
import { J as fe } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
/*!
* focus-trap 7.6.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function G(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var i = 0, u = Array(e); i < e; i++) u[i] = n[i];
  return u;
}
function le(n) {
  if (Array.isArray(n)) return G(n);
}
function de(n, e, i) {
  return (e = me(e)) in n ? Object.defineProperty(n, e, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = i, n;
}
function ve(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function be() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Q(n, e) {
  var i = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(n);
    e && (u = u.filter(function(b) {
      return Object.getOwnPropertyDescriptor(n, b).enumerable;
    })), i.push.apply(i, u);
  }
  return i;
}
function X(n) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Q(Object(i), !0).forEach(function(u) {
      de(n, u, i[u]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i)) : Q(Object(i)).forEach(function(u) {
      Object.defineProperty(n, u, Object.getOwnPropertyDescriptor(i, u));
    });
  }
  return n;
}
function pe(n) {
  return le(n) || ve(n) || he(n) || be();
}
function ye(n, e) {
  if (typeof n != "object" || !n) return n;
  var i = n[Symbol.toPrimitive];
  if (i !== void 0) {
    var u = i.call(n, e);
    if (typeof u != "object") return u;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function me(n) {
  var e = ye(n, "string");
  return typeof e == "symbol" ? e : e + "";
}
function he(n, e) {
  if (n) {
    if (typeof n == "string") return G(n, e);
    var i = {}.toString.call(n).slice(8, -1);
    return i === "Object" && n.constructor && (i = n.constructor.name), i === "Map" || i === "Set" ? Array.from(n) : i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? G(n, e) : void 0;
  }
}
var Z = {
  activateTrap: function(e, i) {
    if (e.length > 0) {
      var u = e[e.length - 1];
      u !== i && u._setPausedState(!0);
    }
    var b = e.indexOf(i);
    b === -1 || e.splice(b, 1), e.push(i);
  },
  deactivateTrap: function(e, i) {
    var u = e.indexOf(i);
    u !== -1 && e.splice(u, 1), e.length > 0 && !e[e.length - 1]._isManuallyPaused() && e[e.length - 1]._setPausedState(!1);
  }
}, ge = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, Fe = function(e) {
  return e?.key === "Escape" || e?.key === "Esc" || e?.keyCode === 27;
}, K = function(e) {
  return e?.key === "Tab" || e?.keyCode === 9;
}, we = function(e) {
  return K(e) && !e.shiftKey;
}, Te = function(e) {
  return K(e) && e.shiftKey;
}, ee = function(e) {
  return setTimeout(e, 0);
}, R = function(e) {
  for (var i = arguments.length, u = new Array(i > 1 ? i - 1 : 0), b = 1; b < i; b++)
    u[b - 1] = arguments[b];
  return typeof e == "function" ? e.apply(void 0, u) : e;
}, j = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, Ne = [], ke = function(e, i) {
  var u = i?.document || document, b = i?.trapStack || Ne, c = X({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: we,
    isKeyBackward: Te
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
  }, h, p = function(t, a, o) {
    return t && t[a] !== void 0 ? t[a] : c[o || a];
  }, g = function(t, a) {
    var o = typeof a?.composedPath == "function" ? a.composedPath() : void 0;
    return r.containerGroups.findIndex(function(f) {
      var l = f.container, v = f.tabbableNodes;
      return l.contains(t) || o?.includes(l) || v.find(function(s) {
        return s === t;
      });
    });
  }, N = function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = a.hasFallback, f = o === void 0 ? !1 : o, l = a.params, v = l === void 0 ? [] : l, s = c[t];
    if (typeof s == "function" && (s = s.apply(void 0, pe(v))), s === !0 && (s = void 0), !s) {
      if (s === void 0 || s === !1)
        return s;
      throw new Error("`".concat(t, "` was specified but was not a node, or did not return a node"));
    }
    var y = s;
    if (typeof s == "string") {
      try {
        y = u.querySelector(s);
      } catch (m) {
        throw new Error("`".concat(t, '` appears to be an invalid selector; error="').concat(m.message, '"'));
      }
      if (!y && !f)
        throw new Error("`".concat(t, "` as selector refers to no known node"));
    }
    return y;
  }, E = function() {
    var t = N("initialFocus", {
      hasFallback: !0
    });
    if (t === !1)
      return !1;
    if (t === void 0 || t && !x(t, c.tabbableOptions))
      if (g(u.activeElement) >= 0)
        t = u.activeElement;
      else {
        var a = r.tabbableGroups[0], o = a && a.firstTabbableNode;
        t = o || N("fallbackFocus");
      }
    else t === null && (t = N("fallbackFocus"));
    if (!t)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return t;
  }, D = function() {
    if (r.containerGroups = r.containers.map(function(t) {
      var a = ue(t, c.tabbableOptions), o = oe(t, c.tabbableOptions), f = a.length > 0 ? a[0] : void 0, l = a.length > 0 ? a[a.length - 1] : void 0, v = o.find(function(m) {
        return k(m);
      }), s = o.slice().reverse().find(function(m) {
        return k(m);
      }), y = !!a.find(function(m) {
        return C(m) > 0;
      });
      return {
        container: t,
        tabbableNodes: a,
        focusableNodes: o,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: y,
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
          var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, w = a.indexOf(T);
          return w < 0 ? P ? o.slice(o.indexOf(T) + 1).find(function(A) {
            return k(A);
          }) : o.slice(0, o.indexOf(T)).reverse().find(function(A) {
            return k(A);
          }) : a[w + (P ? 1 : -1)];
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
  }, M = function(t) {
    var a = t.activeElement;
    if (a)
      return a.shadowRoot && a.shadowRoot.activeElement !== null ? M(a.shadowRoot) : a;
  }, F = function(t) {
    if (t !== !1 && t !== M(document)) {
      if (!t || !t.focus) {
        F(E());
        return;
      }
      t.focus({
        preventScroll: !!c.preventScroll
      }), r.mostRecentlyFocusedNode = t, ge(t) && t.select();
    }
  }, $ = function(t) {
    var a = N("setReturnFocus", {
      params: [t]
    });
    return a || (a === !1 ? !1 : t);
  }, H = function(t) {
    var a = t.target, o = t.event, f = t.isBackward, l = f === void 0 ? !1 : f;
    a = a || j(o), D();
    var v = null;
    if (r.tabbableGroups.length > 0) {
      var s = g(a, o), y = s >= 0 ? r.containerGroups[s] : void 0;
      if (s < 0)
        l ? v = r.tabbableGroups[r.tabbableGroups.length - 1].lastTabbableNode : v = r.tabbableGroups[0].firstTabbableNode;
      else if (l) {
        var m = r.tabbableGroups.findIndex(function(S) {
          var _ = S.firstTabbableNode;
          return a === _;
        });
        if (m < 0 && (y.container === a || x(a, c.tabbableOptions) && !k(a, c.tabbableOptions) && !y.nextTabbableNode(a, !1)) && (m = s), m >= 0) {
          var T = m === 0 ? r.tabbableGroups.length - 1 : m - 1, P = r.tabbableGroups[T];
          v = C(a) >= 0 ? P.lastTabbableNode : P.lastDomTabbableNode;
        } else K(o) || (v = y.nextTabbableNode(a, !1));
      } else {
        var w = r.tabbableGroups.findIndex(function(S) {
          var _ = S.lastTabbableNode;
          return a === _;
        });
        if (w < 0 && (y.container === a || x(a, c.tabbableOptions) && !k(a, c.tabbableOptions) && !y.nextTabbableNode(a)) && (w = s), w >= 0) {
          var A = w === r.tabbableGroups.length - 1 ? 0 : w + 1, V = r.tabbableGroups[A];
          v = C(a) >= 0 ? V.firstTabbableNode : V.firstDomTabbableNode;
        } else K(o) || (v = y.nextTabbableNode(a));
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
    var a = j(t), o = g(a, t) >= 0;
    if (o || a instanceof Document)
      o && (r.mostRecentlyFocusedNode = a);
    else {
      t.stopImmediatePropagation();
      var f, l = !0;
      if (r.mostRecentlyFocusedNode)
        if (C(r.mostRecentlyFocusedNode) > 0) {
          var v = g(r.mostRecentlyFocusedNode), s = r.containerGroups[v].tabbableNodes;
          if (s.length > 0) {
            var y = s.findIndex(function(m) {
              return m === r.mostRecentlyFocusedNode;
            });
            y >= 0 && (c.isKeyForward(r.recentNavEvent) ? y + 1 < s.length && (f = s[y + 1], l = !1) : y - 1 >= 0 && (f = s[y - 1], l = !1));
          }
        } else
          r.containerGroups.some(function(m) {
            return m.tabbableNodes.some(function(T) {
              return C(T) > 0;
            });
          }) || (l = !1);
      else
        l = !1;
      l && (f = H({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: r.mostRecentlyFocusedNode,
        isBackward: c.isKeyBackward(r.recentNavEvent)
      })), F(f || r.mostRecentlyFocusedNode || E());
    }
    r.recentNavEvent = void 0;
  }, ne = function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    r.recentNavEvent = t;
    var o = H({
      event: t,
      isBackward: a
    });
    o && (K(t) && t.preventDefault(), F(o));
  }, W = function(t) {
    (c.isKeyForward(t) || c.isKeyBackward(t)) && ne(t, c.isKeyBackward(t));
  }, Y = function(t) {
    Fe(t) && R(c.escapeDeactivates, t) !== !1 && (t.preventDefault(), h.deactivate());
  }, z = function(t) {
    var a = j(t);
    g(a, t) >= 0 || R(c.clickOutsideDeactivates, t) || R(c.allowOutsideClick, t) || (t.preventDefault(), t.stopImmediatePropagation());
  }, J = function() {
    if (r.active)
      return Z.activateTrap(b, h), r.delayInitialFocusTimer = c.delayInitialFocus ? ee(function() {
        F(E());
      }) : F(E()), u.addEventListener("focusin", q, !0), u.addEventListener("mousedown", L, {
        capture: !0,
        passive: !1
      }), u.addEventListener("touchstart", L, {
        capture: !0,
        passive: !1
      }), u.addEventListener("click", z, {
        capture: !0,
        passive: !1
      }), u.addEventListener("keydown", W, {
        capture: !0,
        passive: !1
      }), u.addEventListener("keydown", Y), h;
  }, U = function() {
    if (r.active)
      return u.removeEventListener("focusin", q, !0), u.removeEventListener("mousedown", L, !0), u.removeEventListener("touchstart", L, !0), u.removeEventListener("click", z, !0), u.removeEventListener("keydown", W, !0), u.removeEventListener("keydown", Y), h;
  }, re = function(t) {
    var a = t.some(function(o) {
      var f = Array.from(o.removedNodes);
      return f.some(function(l) {
        return l === r.mostRecentlyFocusedNode;
      });
    });
    a && F(E());
  }, I = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(re) : void 0, O = function() {
    I && (I.disconnect(), r.active && !r.paused && r.containers.map(function(t) {
      I.observe(t, {
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
      var a = p(t, "onActivate"), o = p(t, "onPostActivate"), f = p(t, "checkCanFocusTrap");
      f || D(), r.active = !0, r.paused = !1, r.nodeFocusedBeforeActivation = u.activeElement, a?.();
      var l = function() {
        f && D(), J(), O(), o?.();
      };
      return f ? (f(r.containers.concat()).then(l, l), this) : (l(), this);
    },
    deactivate: function(t) {
      if (!r.active)
        return this;
      var a = X({
        onDeactivate: c.onDeactivate,
        onPostDeactivate: c.onPostDeactivate,
        checkCanReturnFocus: c.checkCanReturnFocus
      }, t);
      clearTimeout(r.delayInitialFocusTimer), r.delayInitialFocusTimer = void 0, U(), r.active = !1, r.paused = !1, O(), Z.deactivateTrap(b, h);
      var o = p(a, "onDeactivate"), f = p(a, "onPostDeactivate"), l = p(a, "checkCanReturnFocus"), v = p(a, "returnFocus", "returnFocusOnDeactivate");
      o?.();
      var s = function() {
        ee(function() {
          v && F($(r.nodeFocusedBeforeActivation)), f?.();
        });
      };
      return v && l ? (l($(r.nodeFocusedBeforeActivation)).then(s, s), this) : (s(), this);
    },
    pause: function(t) {
      return r.active ? (r.manuallyPaused = !0, this._setPausedState(!0, t)) : this;
    },
    unpause: function(t) {
      return r.active ? (r.manuallyPaused = !1, b[b.length - 1] !== this ? this : this._setPausedState(!1, t)) : this;
    },
    updateContainerElements: function(t) {
      var a = [].concat(t).filter(Boolean);
      return r.containers = a.map(function(o) {
        return typeof o == "string" ? u.querySelector(o) : o;
      }), r.active && D(), O(), this;
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
          var o = p(a, "onPause"), f = p(a, "onPostPause");
          o?.(), U(), O(), f?.();
        } else {
          var l = p(a, "onUnpause"), v = p(a, "onPostUnpause");
          l?.(), D(), J(), O(), v?.();
        }
        return this;
      }
    }
  }), h.updateContainerElements(e), h;
};
const B = /* @__PURE__ */ new WeakSet();
function Ee(n, e) {
  const i = e?.fallbackFocus || n, u = e?.clickOutsideDeactivates ?? !0;
  return {
    fallbackFocus: i,
    setReturnFocus: (b) => (B.has(n) || ce(b), !1),
    ...e,
    // the following options are not overridable
    document: n.ownerDocument,
    tabbableOptions: se,
    trapStack: fe,
    clickOutsideDeactivates: (b) => (B.has(n) || B.add(n), typeof u == "function" ? u(b) : u),
    onPostDeactivate: () => {
      B.delete(n);
    }
  };
}
function te(n, { focusTrapOptions: e }, i) {
  return !e?.extraContainers && !i ? n : [n, ...ae(e?.extraContainers), ...ae(i)];
}
function ae(n = []) {
  return Array.isArray(n) ? n : [n];
}
const Ae = (n) => ie((e, i) => {
  let u, b, c;
  const r = n.focusTrapOptions;
  i.onConnected(() => {
    e[n.triggerProp] && u && h.activate();
  }), i.onUpdate((p) => {
    e.hasUpdated && p.has("focusTrapDisabled") && (e.focusTrapDisabled ? h.deactivate() : h.activate());
  }), i.onDisconnected(() => h.deactivate());
  const h = {
    activate: () => {
      const p = b || e.el;
      if (p.isConnected) {
        if (!u) {
          const g = {
            ...r,
            ...e.focusTrapOptions
          };
          c ||= te(p, e), u = ke(c, Ee(p, g));
        }
        (typeof e.focusTrapDisabledOverride == "function" ? !e.focusTrapDisabledOverride() : !e.focusTrapDisabled) && u.activate();
      }
    },
    deactivate: () => u?.deactivate(),
    overrideFocusTrapEl: (p) => {
      if (u)
        throw new Error("Focus trap already created");
      b = p;
    },
    setExtraContainers: (p) => {
      const g = b || e.el;
      c = te(g, e, p);
    },
    updateContainerElements: () => u?.updateContainerElements(c)
  };
  return h;
});
export {
  Ae as u
};
