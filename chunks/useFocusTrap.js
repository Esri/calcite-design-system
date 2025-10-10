import { m as ie } from "./index2.js";
import { v as oe, x as ue, y as k, z as R, A as G, B as se, f as ce } from "./dom.js";
import { F as le } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
/*!
* focus-trap 7.6.5
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function M(r, e) {
  (e == null || e > r.length) && (e = r.length);
  for (var i = 0, o = Array(e); i < e; i++) o[i] = r[i];
  return o;
}
function fe(r) {
  if (Array.isArray(r)) return M(r);
}
function de(r, e, i) {
  return (e = me(e)) in r ? Object.defineProperty(r, e, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : r[e] = i, r;
}
function ve(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function be() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Q(r, e) {
  var i = Object.keys(r);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(r);
    e && (o = o.filter(function(b) {
      return Object.getOwnPropertyDescriptor(r, b).enumerable;
    })), i.push.apply(i, o);
  }
  return i;
}
function X(r) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Q(Object(i), !0).forEach(function(o) {
      de(r, o, i[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(i)) : Q(Object(i)).forEach(function(o) {
      Object.defineProperty(r, o, Object.getOwnPropertyDescriptor(i, o));
    });
  }
  return r;
}
function pe(r) {
  return fe(r) || ve(r) || he(r) || be();
}
function ye(r, e) {
  if (typeof r != "object" || !r) return r;
  var i = r[Symbol.toPrimitive];
  if (i !== void 0) {
    var o = i.call(r, e);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(r);
}
function me(r) {
  var e = ye(r, "string");
  return typeof e == "symbol" ? e : e + "";
}
function he(r, e) {
  if (r) {
    if (typeof r == "string") return M(r, e);
    var i = {}.toString.call(r).slice(8, -1);
    return i === "Object" && r.constructor && (i = r.constructor.name), i === "Map" || i === "Set" ? Array.from(r) : i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? M(r, e) : void 0;
  }
}
var Z = {
  activateTrap: function(e, i) {
    if (e.length > 0) {
      var o = e[e.length - 1];
      o !== i && o._setPausedState(!0);
    }
    var b = e.indexOf(i);
    b === -1 || e.splice(b, 1), e.push(i);
  },
  deactivateTrap: function(e, i) {
    var o = e.indexOf(i);
    o !== -1 && e.splice(o, 1), e.length > 0 && !e[e.length - 1]._isManuallyPaused() && e[e.length - 1]._setPausedState(!1);
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
}, C = function(e) {
  for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), b = 1; b < i; b++)
    o[b - 1] = arguments[b];
  return typeof e == "function" ? e.apply(void 0, o) : e;
}, j = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, Ne = [], ke = function(e, i) {
  var o = i?.document || document, b = i?.trapStack || Ne, s = X({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: we,
    isKeyBackward: Te
  }, i), n = {
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
  }, h, p = function(t, a, u) {
    return t && t[a] !== void 0 ? t[a] : s[u || a];
  }, g = function(t, a) {
    var u = typeof a?.composedPath == "function" ? a.composedPath() : void 0;
    return n.containerGroups.findIndex(function(l) {
      var f = l.container, v = l.tabbableNodes;
      return f.contains(t) || u?.includes(f) || v.find(function(c) {
        return c === t;
      });
    });
  }, N = function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = a.hasFallback, l = u === void 0 ? !1 : u, f = a.params, v = f === void 0 ? [] : f, c = s[t];
    if (typeof c == "function" && (c = c.apply(void 0, pe(v))), c === !0 && (c = void 0), !c) {
      if (c === void 0 || c === !1)
        return c;
      throw new Error("`".concat(t, "` was specified but was not a node, or did not return a node"));
    }
    var y = c;
    if (typeof c == "string") {
      try {
        y = o.querySelector(c);
      } catch (m) {
        throw new Error("`".concat(t, '` appears to be an invalid selector; error="').concat(m.message, '"'));
      }
      if (!y && !l)
        throw new Error("`".concat(t, "` as selector refers to no known node"));
    }
    return y;
  }, E = function() {
    var t = N("initialFocus", {
      hasFallback: !0
    });
    if (t === !1)
      return !1;
    if (t === void 0 || t && !G(t, s.tabbableOptions))
      if (g(o.activeElement) >= 0)
        t = o.activeElement;
      else {
        var a = n.tabbableGroups[0], u = a && a.firstTabbableNode;
        t = u || N("fallbackFocus");
      }
    else t === null && (t = N("fallbackFocus"));
    if (!t)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return t;
  }, D = function() {
    if (n.containerGroups = n.containers.map(function(t) {
      var a = oe(t, s.tabbableOptions), u = ue(t, s.tabbableOptions), l = a.length > 0 ? a[0] : void 0, f = a.length > 0 ? a[a.length - 1] : void 0, v = u.find(function(m) {
        return k(m);
      }), c = u.slice().reverse().find(function(m) {
        return k(m);
      }), y = !!a.find(function(m) {
        return R(m) > 0;
      });
      return {
        container: t,
        tabbableNodes: a,
        focusableNodes: u,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: y,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: l,
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
        firstDomTabbableNode: v,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: c,
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
          return w < 0 ? P ? u.slice(u.indexOf(T) + 1).find(function(A) {
            return k(A);
          }) : u.slice(0, u.indexOf(T)).reverse().find(function(A) {
            return k(A);
          }) : a[w + (P ? 1 : -1)];
        }
      };
    }), n.tabbableGroups = n.containerGroups.filter(function(t) {
      return t.tabbableNodes.length > 0;
    }), n.tabbableGroups.length <= 0 && !N("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (n.containerGroups.find(function(t) {
      return t.posTabIndexesFound;
    }) && n.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, S = function(t) {
    var a = t.activeElement;
    if (a)
      return a.shadowRoot && a.shadowRoot.activeElement !== null ? S(a.shadowRoot) : a;
  }, F = function(t) {
    if (t !== !1 && t !== S(document)) {
      if (!t || !t.focus) {
        F(E());
        return;
      }
      t.focus({
        preventScroll: !!s.preventScroll
      }), n.mostRecentlyFocusedNode = t, ge(t) && t.select();
    }
  }, $ = function(t) {
    var a = N("setReturnFocus", {
      params: [t]
    });
    return a || (a === !1 ? !1 : t);
  }, H = function(t) {
    var a = t.target, u = t.event, l = t.isBackward, f = l === void 0 ? !1 : l;
    a = a || j(u), D();
    var v = null;
    if (n.tabbableGroups.length > 0) {
      var c = g(a, u), y = c >= 0 ? n.containerGroups[c] : void 0;
      if (c < 0)
        f ? v = n.tabbableGroups[n.tabbableGroups.length - 1].lastTabbableNode : v = n.tabbableGroups[0].firstTabbableNode;
      else if (f) {
        var m = n.tabbableGroups.findIndex(function(_) {
          var x = _.firstTabbableNode;
          return a === x;
        });
        if (m < 0 && (y.container === a || G(a, s.tabbableOptions) && !k(a, s.tabbableOptions) && !y.nextTabbableNode(a, !1)) && (m = c), m >= 0) {
          var T = m === 0 ? n.tabbableGroups.length - 1 : m - 1, P = n.tabbableGroups[T];
          v = R(a) >= 0 ? P.lastTabbableNode : P.lastDomTabbableNode;
        } else K(u) || (v = y.nextTabbableNode(a, !1));
      } else {
        var w = n.tabbableGroups.findIndex(function(_) {
          var x = _.lastTabbableNode;
          return a === x;
        });
        if (w < 0 && (y.container === a || G(a, s.tabbableOptions) && !k(a, s.tabbableOptions) && !y.nextTabbableNode(a)) && (w = c), w >= 0) {
          var A = w === n.tabbableGroups.length - 1 ? 0 : w + 1, J = n.tabbableGroups[A];
          v = R(a) >= 0 ? J.firstTabbableNode : J.firstDomTabbableNode;
        } else K(u) || (v = y.nextTabbableNode(a));
      }
    } else
      v = N("fallbackFocus");
    return v;
  }, L = function(t) {
    var a = j(t);
    if (!(g(a, t) >= 0)) {
      if (C(s.clickOutsideDeactivates, t)) {
        h.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: s.returnFocusOnDeactivate
        });
        return;
      }
      C(s.allowOutsideClick, t) || t.preventDefault();
    }
  }, q = function(t) {
    var a = j(t), u = g(a, t) >= 0;
    if (u || a instanceof Document)
      u && (n.mostRecentlyFocusedNode = a);
    else {
      t.stopImmediatePropagation();
      var l, f = !0;
      if (n.mostRecentlyFocusedNode)
        if (R(n.mostRecentlyFocusedNode) > 0) {
          var v = g(n.mostRecentlyFocusedNode), c = n.containerGroups[v].tabbableNodes;
          if (c.length > 0) {
            var y = c.findIndex(function(m) {
              return m === n.mostRecentlyFocusedNode;
            });
            y >= 0 && (s.isKeyForward(n.recentNavEvent) ? y + 1 < c.length && (l = c[y + 1], f = !1) : y - 1 >= 0 && (l = c[y - 1], f = !1));
          }
        } else
          n.containerGroups.some(function(m) {
            return m.tabbableNodes.some(function(T) {
              return R(T) > 0;
            });
          }) || (f = !1);
      else
        f = !1;
      f && (l = H({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: n.mostRecentlyFocusedNode,
        isBackward: s.isKeyBackward(n.recentNavEvent)
      })), F(l || n.mostRecentlyFocusedNode || E());
    }
    n.recentNavEvent = void 0;
  }, re = function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    n.recentNavEvent = t;
    var u = H({
      event: t,
      isBackward: a
    });
    u && (K(t) && t.preventDefault(), F(u));
  }, W = function(t) {
    (s.isKeyForward(t) || s.isKeyBackward(t)) && re(t, s.isKeyBackward(t));
  }, Y = function(t) {
    Fe(t) && C(s.escapeDeactivates, t) !== !1 && (t.preventDefault(), h.deactivate());
  }, z = function(t) {
    var a = j(t);
    g(a, t) >= 0 || C(s.clickOutsideDeactivates, t) || C(s.allowOutsideClick, t) || (t.preventDefault(), t.stopImmediatePropagation());
  }, U = function() {
    if (n.active)
      return Z.activateTrap(b, h), n.delayInitialFocusTimer = s.delayInitialFocus ? ee(function() {
        F(E());
      }) : F(E()), o.addEventListener("focusin", q, !0), o.addEventListener("mousedown", L, {
        capture: !0,
        passive: !1
      }), o.addEventListener("touchstart", L, {
        capture: !0,
        passive: !1
      }), o.addEventListener("click", z, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", W, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", Y), h;
  }, V = function() {
    if (n.active)
      return o.removeEventListener("focusin", q, !0), o.removeEventListener("mousedown", L, !0), o.removeEventListener("touchstart", L, !0), o.removeEventListener("click", z, !0), o.removeEventListener("keydown", W, !0), o.removeEventListener("keydown", Y), h;
  }, ne = function(t) {
    var a = t.some(function(u) {
      var l = Array.from(u.removedNodes);
      return l.some(function(f) {
        return f === n.mostRecentlyFocusedNode;
      });
    });
    a && F(E());
  }, I = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(ne) : void 0, O = function() {
    I && (I.disconnect(), n.active && !n.paused && n.containers.map(function(t) {
      I.observe(t, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return h = {
    get active() {
      return n.active;
    },
    get paused() {
      return n.paused;
    },
    activate: function(t) {
      if (n.active)
        return this;
      var a = p(t, "onActivate"), u = p(t, "onPostActivate"), l = p(t, "checkCanFocusTrap");
      l || D(), n.active = !0, n.paused = !1, n.nodeFocusedBeforeActivation = S(o), a?.();
      var f = function() {
        l && D(), U(), O(), u?.();
      };
      return l ? (l(n.containers.concat()).then(f, f), this) : (f(), this);
    },
    deactivate: function(t) {
      if (!n.active)
        return this;
      var a = X({
        onDeactivate: s.onDeactivate,
        onPostDeactivate: s.onPostDeactivate,
        checkCanReturnFocus: s.checkCanReturnFocus
      }, t);
      clearTimeout(n.delayInitialFocusTimer), n.delayInitialFocusTimer = void 0, V(), n.active = !1, n.paused = !1, O(), Z.deactivateTrap(b, h);
      var u = p(a, "onDeactivate"), l = p(a, "onPostDeactivate"), f = p(a, "checkCanReturnFocus"), v = p(a, "returnFocus", "returnFocusOnDeactivate");
      u?.();
      var c = function() {
        ee(function() {
          v && F($(n.nodeFocusedBeforeActivation)), l?.();
        });
      };
      return v && f ? (f($(n.nodeFocusedBeforeActivation)).then(c, c), this) : (c(), this);
    },
    pause: function(t) {
      return n.active ? (n.manuallyPaused = !0, this._setPausedState(!0, t)) : this;
    },
    unpause: function(t) {
      return n.active ? (n.manuallyPaused = !1, b[b.length - 1] !== this ? this : this._setPausedState(!1, t)) : this;
    },
    updateContainerElements: function(t) {
      var a = [].concat(t).filter(Boolean);
      return n.containers = a.map(function(u) {
        return typeof u == "string" ? o.querySelector(u) : u;
      }), n.active && D(), O(), this;
    }
  }, Object.defineProperties(h, {
    _isManuallyPaused: {
      value: function() {
        return n.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(t, a) {
        if (n.paused === t)
          return this;
        if (n.paused = t, t) {
          var u = p(a, "onPause"), l = p(a, "onPostPause");
          u?.(), V(), O(), l?.();
        } else {
          var f = p(a, "onUnpause"), v = p(a, "onPostUnpause");
          f?.(), D(), U(), O(), v?.();
        }
        return this;
      }
    }
  }), h.updateContainerElements(e), h;
};
const B = /* @__PURE__ */ new WeakSet();
function Ee(r, e) {
  return B.has(r) || ce(e), !1;
}
function De(r, e) {
  const i = e?.fallbackFocus || r, o = e?.clickOutsideDeactivates ?? !0;
  return {
    fallbackFocus: i,
    ...e,
    // the following options are not overridable
    document: r.ownerDocument,
    tabbableOptions: se,
    trapStack: le,
    clickOutsideDeactivates: (b) => (B.has(r) || B.add(r), typeof o == "function" ? o(b) : o),
    onPostDeactivate: () => {
      B.delete(r);
    },
    setReturnFocus: (b) => {
      const s = typeof e?.setReturnFocus == "function" ? e.setReturnFocus(b) : e?.setReturnFocus;
      return s === void 0 ? Ee(r, b) : s;
    }
  };
}
function te(r, { focusTrapOptions: e }, i) {
  return !e?.extraContainers && !i ? r : [r, ...ae(e?.extraContainers), ...ae(i)];
}
function ae(r = []) {
  return Array.isArray(r) ? r : [r];
}
const Re = (r) => ie((e, i) => {
  let o, b, s;
  const n = r.focusTrapOptions;
  i.onConnected(() => {
    e[r.triggerProp] && o && h.activate();
  }), i.onUpdate((p) => {
    e.hasUpdated && p.has("focusTrapDisabled") && (e.focusTrapDisabled ? h.deactivate() : h.activate());
  }), i.onDisconnected(() => h.deactivate());
  const h = {
    activate: () => {
      const p = b || e.el;
      if (p.isConnected) {
        if (!o) {
          const g = {
            ...n,
            ...e.focusTrapOptions
          };
          s ||= te(p, e), o = ke(s, De(p, g));
        }
        (typeof e.focusTrapDisabledOverride == "function" ? !e.focusTrapDisabledOverride() : !e.focusTrapDisabled) && o.activate();
      }
    },
    deactivate: () => o?.deactivate(),
    overrideFocusTrapEl: (p) => {
      if (o)
        throw new Error("Focus trap already created");
      b = p;
    },
    setExtraContainers: (p) => {
      const g = b || e.el;
      s = te(g, e, p);
    },
    updateContainerElements: () => o?.updateContainerElements(s)
  };
  return h;
});
export {
  Re as u
};
