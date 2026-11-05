/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { m as ce } from "./index2.js";
import { t as le, k as fe, l as C, m as j, o as q, p as de, f as ve } from "./dom.js";
import { y as be } from "./index.js";
function U(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var i = 0, o = Array(e); i < e; i++) o[i] = n[i];
  return o;
}
function pe(n) {
  if (Array.isArray(n)) return U(n);
}
function Z(n, e) {
  var i = typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
  if (!i) {
    if (Array.isArray(n) || (i = ie(n)) || e) {
      i && (n = i);
      var o = 0, y = function() {
      };
      return {
        s: y,
        n: function() {
          return o >= n.length ? {
            done: !0
          } : {
            done: !1,
            value: n[o++]
          };
        },
        e: function(h) {
          throw h;
        },
        f: y
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s, r = !0, b = !1;
  return {
    s: function() {
      i = i.call(n);
    },
    n: function() {
      var h = i.next();
      return r = h.done, h;
    },
    e: function(h) {
      b = !0, s = h;
    },
    f: function() {
      try {
        r || i.return == null || i.return();
      } finally {
        if (b) throw s;
      }
    }
  };
}
function ye(n, e, i) {
  return (e = Te(e)) in n ? Object.defineProperty(n, e, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = i, n;
}
function me(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function he() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ee(n, e) {
  var i = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    e && (o = o.filter(function(y) {
      return Object.getOwnPropertyDescriptor(n, y).enumerable;
    })), i.push.apply(i, o);
  }
  return i;
}
function te(n) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ee(Object(i), !0).forEach(function(o) {
      ye(n, o, i[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i)) : ee(Object(i)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(i, o));
    });
  }
  return n;
}
function ge(n) {
  return pe(n) || me(n) || ie(n) || he();
}
function we(n, e) {
  if (typeof n != "object" || !n) return n;
  var i = n[Symbol.toPrimitive];
  if (i !== void 0) {
    var o = i.call(n, e);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function Te(n) {
  var e = we(n, "string");
  return typeof e == "symbol" ? e : e + "";
}
function ie(n, e) {
  if (n) {
    if (typeof n == "string") return U(n, e);
    var i = {}.toString.call(n).slice(8, -1);
    return i === "Object" && n.constructor && (i = n.constructor.name), i === "Map" || i === "Set" ? Array.from(n) : i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? U(n, e) : void 0;
  }
}
var D = {
  // Returns the trap from the top of the stack.
  getActiveTrap: function(e) {
    return e?.length > 0 ? e[e.length - 1] : null;
  },
  // Pauses the currently active trap, then adds a new trap to the stack.
  activateTrap: function(e, i) {
    var o = D.getActiveTrap(e);
    i !== o && D.pauseTrap(e);
    var y = e.indexOf(i);
    y === -1 || e.splice(y, 1), e.push(i);
  },
  // Removes the trap from the top of the stack, then unpauses the next trap down.
  deactivateTrap: function(e, i) {
    var o = e.indexOf(i);
    o !== -1 && e.splice(o, 1), D.unpauseTrap(e);
  },
  // Pauses the trap at the top of the stack.
  pauseTrap: function(e) {
    var i = D.getActiveTrap(e);
    i?._setPausedState(!0);
  },
  // Unpauses the trap at the top of the stack.
  unpauseTrap: function(e) {
    var i = D.getActiveTrap(e);
    i && !i._isManuallyPaused() && i._setPausedState(!1);
  }
}, Fe = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, Ne = function(e) {
  return e?.key === "Escape" || e?.key === "Esc" || e?.keyCode === 27;
}, K = function(e) {
  return e?.key === "Tab" || e?.keyCode === 9;
}, ke = function(e) {
  return K(e) && !e.shiftKey;
}, Ee = function(e) {
  return K(e) && e.shiftKey;
}, ae = function(e) {
  return setTimeout(e, 0);
}, L = function(e) {
  for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), y = 1; y < i; y++)
    o[y - 1] = arguments[y];
  return typeof e == "function" ? e.apply(void 0, o) : e;
}, x = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, De = [], Ae = function(e, i) {
  var o = i?.document || document, y = i?.trapStack || De, s = te({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    delayReturnFocus: !0,
    isolateSubtrees: !1,
    isKeyForward: ke,
    isKeyBackward: Ee
  }, i), r = {
    // containers given to createFocusTrap()
    /** @type {Array<HTMLElement>} */
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    /** @type {Array<{
     *    container: HTMLElement,
     *    tabbableNodes: Array<HTMLElement>, // empty if none
     *    focusableNodes: Array<HTMLElement>, // empty if none
     *    posTabIndexesFound: boolean,
     *    firstTabbableNode: HTMLElement|undefined,
     *    lastTabbableNode: HTMLElement|undefined,
     *    firstDomTabbableNode: HTMLElement|undefined,
     *    lastDomTabbableNode: HTMLElement|undefined,
     *    nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
     *  }>}
     */
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    // references to nodes that are siblings to the ancestors of this trap's containers.
    /** @type {Set<HTMLElement>} */
    adjacentElements: /* @__PURE__ */ new Set(),
    // references to nodes that were inert or aria-hidden before the trap was activated.
    /** @type {Set<HTMLElement>} */
    alreadySilent: /* @__PURE__ */ new Set(),
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
  }, b, h = function(t, a, u) {
    return t && t[a] !== void 0 ? t[a] : s[u || a];
  }, N = function(t, a) {
    var u = typeof a?.composedPath == "function" ? a.composedPath() : void 0;
    return r.containerGroups.findIndex(function(f) {
      var l = f.container, p = f.tabbableNodes;
      return l.contains(t) || u?.includes(l) || p.find(function(c) {
        return c === t;
      });
    });
  }, A = function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = a.hasFallback, f = u === void 0 ? !1 : u, l = a.params, p = l === void 0 ? [] : l, c = s[t];
    if (typeof c == "function" && (c = c.apply(void 0, ge(p))), c === !0 && (c = void 0), !c) {
      if (c === void 0 || c === !1)
        return c;
      throw new Error("`".concat(t, "` was specified but was not a node, or did not return a node"));
    }
    var v = c;
    if (typeof c == "string") {
      try {
        v = o.querySelector(c);
      } catch (d) {
        throw new Error("`".concat(t, '` appears to be an invalid selector; error="').concat(d.message, '"'), {
          cause: d
        });
      }
      if (!v && !f)
        throw new Error("`".concat(t, "` as selector refers to no known node"));
    }
    return v;
  }, S = function(t) {
    var a = t.activeElement;
    return a ? a.shadowRoot && a.shadowRoot.activeElement !== null ? S(a.shadowRoot) : a : null;
  }, k = function() {
    var t = A("initialFocus", {
      hasFallback: !0
    });
    if (t === !1)
      return !1;
    if (t === void 0 || t && !q(t, s.tabbableOptions)) {
      var a = S(o);
      if (N(a) >= 0)
        t = a;
      else {
        var u = r.tabbableGroups[0], f = u && u.firstTabbableNode;
        t = f || A("fallbackFocus");
      }
    } else t === null && (t = A("fallbackFocus"));
    if (!t)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return t;
  }, P = function() {
    if (r.containerGroups = r.containers.map(function(t) {
      var a = le(t, s.tabbableOptions), u = fe(t, s.tabbableOptions), f = a.length > 0 ? a[0] : void 0, l = a.length > 0 ? a[a.length - 1] : void 0, p = u.find(function(d) {
        return C(d);
      }), c = u.slice().reverse().find(function(d) {
        return C(d);
      }), v = !!a.find(function(d) {
        return j(d) > 0;
      });
      return {
        container: t,
        tabbableNodes: a,
        focusableNodes: u,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: v,
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
        firstDomTabbableNode: p,
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
        nextTabbableNode: function(g) {
          var T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, F = a.indexOf(g);
          return F < 0 ? T ? u.slice(u.indexOf(g) + 1).find(function(E) {
            return C(E);
          }) : u.slice(0, u.indexOf(g)).reverse().find(function(E) {
            return C(E);
          }) : a[F + (T ? 1 : -1)];
        }
      };
    }), r.tabbableGroups = r.containerGroups.filter(function(t) {
      return t.tabbableNodes.length > 0;
    }), r.tabbableGroups.length <= 0 && !A("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (r.containerGroups.find(function(t) {
      return t.posTabIndexesFound;
    }) && r.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, w = function(t) {
    if (t !== !1) {
      if (t === S(o)) {
        r.mostRecentlyFocusedNode = t;
        return;
      }
      if (!t || !t.focus) {
        w(k());
        return;
      }
      t.focus({
        preventScroll: !!s.preventScroll
      }), r.mostRecentlyFocusedNode = t, Fe(t) && t.select();
    }
  }, _ = function(t) {
    var a = A("setReturnFocus", {
      params: [t]
    });
    return a || (a === !1 ? !1 : t);
  }, V = function(t) {
    var a = t.target, u = t.event, f = t.isBackward, l = f === void 0 ? !1 : f;
    a = a || x(u), P();
    var p = null;
    if (r.tabbableGroups.length > 0) {
      var c = N(a, u), v = c >= 0 ? r.containerGroups[c] : void 0;
      if (c < 0)
        l ? p = r.tabbableGroups[r.tabbableGroups.length - 1].lastTabbableNode : p = r.tabbableGroups[0].firstTabbableNode;
      else if (l) {
        var d = r.tabbableGroups.findIndex(function(R) {
          var H = R.firstTabbableNode;
          return a === H;
        });
        if (d < 0 && (v.container === a || q(a, s.tabbableOptions) && !C(a, s.tabbableOptions) && !v.nextTabbableNode(a, !1)) && (d = Math.max(0, r.tabbableGroups.findIndex(function(R) {
          return r.containerGroups.indexOf(R) >= c;
        }))), d >= 0) {
          var g = d === 0 ? r.tabbableGroups.length - 1 : d - 1, T = r.tabbableGroups[g];
          p = j(a) >= 0 ? T.lastTabbableNode : T.lastDomTabbableNode;
        } else K(u) || (p = v.nextTabbableNode(a, !1));
      } else {
        var F = r.tabbableGroups.findIndex(function(R) {
          var H = R.lastTabbableNode;
          return a === H;
        });
        if (F < 0 && (v.container === a || q(a, s.tabbableOptions) && !C(a, s.tabbableOptions) && !v.nextTabbableNode(a))) {
          var E = r.tabbableGroups.findIndex(function(R) {
            return r.containerGroups.indexOf(R) > c;
          });
          F = E > 0 ? E - 1 : r.tabbableGroups.length - 1;
        }
        if (F >= 0) {
          var O = F === r.tabbableGroups.length - 1 ? 0 : F + 1, X = r.tabbableGroups[O];
          p = j(a) >= 0 ? X.firstTabbableNode : X.firstDomTabbableNode;
        } else K(u) || (p = v.nextTabbableNode(a));
      }
    } else
      p = A("fallbackFocus");
    return p;
  }, B = function(t) {
    var a = x(t);
    if (!(N(a, t) >= 0)) {
      if (L(s.clickOutsideDeactivates, t)) {
        b.deactivate({
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
      L(s.allowOutsideClick, t) || t.preventDefault();
    }
  }, W = function(t) {
    var a = x(t), u = N(a, t) >= 0;
    if (u || a instanceof Document)
      u && (r.mostRecentlyFocusedNode = a);
    else {
      t.stopImmediatePropagation();
      var f, l = !0;
      if (r.mostRecentlyFocusedNode)
        if (j(r.mostRecentlyFocusedNode) > 0) {
          var p = N(r.mostRecentlyFocusedNode), c = r.containerGroups[p].tabbableNodes;
          if (c.length > 0) {
            var v = c.findIndex(function(d) {
              return d === r.mostRecentlyFocusedNode;
            });
            v >= 0 && (s.isKeyForward(r.recentNavEvent) ? v + 1 < c.length && (f = c[v + 1], l = !1) : v - 1 >= 0 && (f = c[v - 1], l = !1));
          }
        } else
          r.containerGroups.some(function(d) {
            return d.tabbableNodes.some(function(g) {
              return j(g) > 0;
            });
          }) || (l = !1);
      else
        l = !1;
      l && (f = V({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: r.mostRecentlyFocusedNode,
        isBackward: s.isKeyBackward(r.recentNavEvent)
      })), w(f || r.mostRecentlyFocusedNode || k());
    }
    r.recentNavEvent = void 0;
  }, oe = function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    r.recentNavEvent = t;
    var u = V({
      event: t,
      isBackward: a
    });
    u && (K(t) && t.preventDefault(), w(u));
  }, Y = function(t) {
    (s.isKeyForward(t) || s.isKeyBackward(t)) && oe(t, s.isKeyBackward(t));
  }, $ = function(t) {
    Ne(t) && L(s.escapeDeactivates, t) !== !1 && (t.preventDefault(), b.deactivate());
  }, z = function(t) {
    var a = x(t);
    N(a, t) >= 0 || L(s.clickOutsideDeactivates, t) || L(s.allowOutsideClick, t) || (t.preventDefault(), t.stopImmediatePropagation());
  }, J = function() {
    if (r.active) {
      D.activateTrap(y, b);
      var t;
      return s.delayInitialFocus ? t = new Promise(function(a) {
        r.delayInitialFocusTimer = ae(function() {
          w(k()), a();
        });
      }) : w(k()), o.addEventListener("focusin", W, !0), o.addEventListener("mousedown", B, {
        capture: !0,
        passive: !1
      }), o.addEventListener("touchstart", B, {
        capture: !0,
        passive: !1
      }), o.addEventListener("click", z, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", Y, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", $), t;
    }
  }, ue = function(t) {
    r.active && !r.paused && b._setSubtreeIsolation(!1), r.adjacentElements.clear(), r.alreadySilent.clear();
    var a = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), f = Z(t), l;
    try {
      for (f.s(); !(l = f.n()).done; ) {
        var p = l.value;
        a.add(p);
        for (var c = typeof ShadowRoot < "u" && p.getRootNode() instanceof ShadowRoot, v = p; v; ) {
          a.add(v);
          var d = v.parentElement, g = [];
          d ? g = d.children : !d && c && (g = v.getRootNode().children, d = v.getRootNode().host, c = typeof ShadowRoot < "u" && d.getRootNode() instanceof ShadowRoot);
          var T = Z(g), F;
          try {
            for (T.s(); !(F = T.n()).done; ) {
              var E = F.value;
              u.add(E);
            }
          } catch (O) {
            T.e(O);
          } finally {
            T.f();
          }
          v = d;
        }
      }
    } catch (O) {
      f.e(O);
    } finally {
      f.f();
    }
    a.forEach(function(O) {
      u.delete(O);
    }), r.adjacentElements = u;
  }, Q = function() {
    if (r.active)
      return o.removeEventListener("focusin", W, !0), o.removeEventListener("mousedown", B, !0), o.removeEventListener("touchstart", B, !0), o.removeEventListener("click", z, !0), o.removeEventListener("keydown", Y, !0), o.removeEventListener("keydown", $), b;
  }, se = function(t) {
    var a = r.mostRecentlyFocusedNode;
    if (a) {
      var u = t.some(function(l) {
        var p = Array.from(l.removedNodes);
        return p.some(function(c) {
          return c === a || typeof c.contains == "function" && c.contains(a);
        });
      });
      if (u && r.containers.some(function(l) {
        return l?.isConnected;
      })) {
        P();
        var f = k();
        w(f);
      }
    }
  }, M = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(se) : void 0, I = function() {
    M && (M.disconnect(), r.active && !r.paused && r.containers.map(function(t) {
      M.observe(t, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return b = {
    get active() {
      return r.active;
    },
    get paused() {
      return r.paused;
    },
    activate: function(t) {
      if (r.active)
        return this;
      var a = h(t, "onActivate"), u = h(t, "onPostActivate"), f = h(t, "checkCanFocusTrap"), l = D.getActiveTrap(y), p = !1;
      if (l && !l.paused) {
        var c;
        (c = l._setSubtreeIsolation) === null || c === void 0 || c.call(l, !1), p = !0;
      }
      try {
        f || P(), r.active = !0, r.paused = !1, r.nodeFocusedBeforeActivation = S(o), a?.({
          trap: b
        });
        var v = function() {
          f && P();
          var T = function() {
            b._setSubtreeIsolation(!0), I(), u?.({
              trap: b
            });
          }, F = J();
          F ? F.then(T) : T();
        };
        if (f)
          return f(r.containers.concat()).then(v, v), this;
        v();
      } catch (g) {
        if (l === D.getActiveTrap(y) && p) {
          var d;
          (d = l._setSubtreeIsolation) === null || d === void 0 || d.call(l, !0);
        }
        throw g;
      }
      return this;
    },
    deactivate: function(t) {
      if (!r.active)
        return this;
      var a = te({
        onDeactivate: s.onDeactivate,
        onPostDeactivate: s.onPostDeactivate,
        checkCanReturnFocus: s.checkCanReturnFocus
      }, t);
      clearTimeout(r.delayInitialFocusTimer), r.delayInitialFocusTimer = void 0, r.paused || b._setSubtreeIsolation(!1), r.alreadySilent.clear(), Q(), r.active = !1, r.paused = !1, I(), D.deactivateTrap(y, b);
      var u = h(a, "onDeactivate"), f = h(a, "onPostDeactivate"), l = h(a, "checkCanReturnFocus"), p = h(a, "delayReturnFocus"), c = h(a, "returnFocus", "returnFocusOnDeactivate");
      u?.({
        trap: b
      });
      var v = function() {
        c && w(_(r.nodeFocusedBeforeActivation)), f?.({
          trap: b
        });
      }, d = function() {
        p && c ? ae(v) : v();
      };
      return c && l ? (l(_(r.nodeFocusedBeforeActivation)).then(d, d), this) : (d(), this);
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
      }), s.isolateSubtrees && ue(r.containers), r.active && (P(), r.paused || b._setSubtreeIsolation(!0)), I(), this;
    }
  }, Object.defineProperties(b, {
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
          var u = h(a, "onPause"), f = h(a, "onPostPause");
          u?.({
            trap: b
          }), Q(), b._setSubtreeIsolation(!1), I(), f?.({
            trap: b
          });
        } else {
          var l = h(a, "onUnpause"), p = h(a, "onPostUnpause");
          l?.({
            trap: b
          });
          var c = function() {
            P();
            var d = function() {
              b._setSubtreeIsolation(!0), I(), p?.({
                trap: b
              });
            }, g = J();
            g ? g.then(d) : d();
          };
          c();
        }
        return this;
      }
    },
    _setSubtreeIsolation: {
      value: function(t) {
        s.isolateSubtrees && r.adjacentElements.forEach(function(a) {
          var u;
          t ? s.isolateSubtrees === "aria-hidden" ? ((a.ariaHidden === "true" || ((u = a.getAttribute("aria-hidden")) === null || u === void 0 ? void 0 : u.toLowerCase()) === "true") && r.alreadySilent.add(a), a.setAttribute("aria-hidden", "true")) : ((a.inert || a.hasAttribute("inert")) && r.alreadySilent.add(a), a.setAttribute("inert", !0)) : r.alreadySilent.has(a) || (s.isolateSubtrees === "aria-hidden" ? a.removeAttribute("aria-hidden") : a.removeAttribute("inert"));
        });
      }
    }
  }), b.updateContainerElements(e), b;
}, Se = {};
function re(n, { focusTrapOptions: e }, i) {
  return !e?.extraContainers && !i ? n : [n, ...ne(e?.extraContainers), ...ne(i)];
}
function ne(n = []) {
  return Array.isArray(n) ? n : [n];
}
const G = /* @__PURE__ */ new WeakSet();
function Pe(n, e) {
  const i = e && e !== document.body && e !== document.documentElement;
  return !G.has(n) && i && ve(e), !1;
}
function Oe(n, e) {
  const i = e?.fallbackFocus || n, o = e?.clickOutsideDeactivates ?? !0;
  let y;
  return {
    fallbackFocus: i,
    ...e,
    // the following options are not overridable
    document: n.ownerDocument,
    tabbableOptions: de,
    trapStack: be().focusTrapStack,
    clickOutsideDeactivates: (s) => (G.has(n) || G.add(n), typeof o == "function" ? o(s) : o),
    onActivate: (s) => {
      e?.escapeDeactivates && (y = new AbortController(), n.addEventListener(
        "keydown",
        (r) => {
          if (r.key === "Escape") {
            const b = e?.escapeDeactivates;
            (typeof b == "function" ? b(r) : b ?? !0) && s.trap.deactivate();
          }
        },
        { signal: y.signal }
      )), e?.onActivate?.(s);
    },
    onDeactivate: (s) => {
      y?.abort(), y = void 0, e?.onDeactivate?.(s);
    },
    onPostDeactivate: () => {
      G.delete(n);
    },
    setReturnFocus: (s) => {
      const r = typeof e?.setReturnFocus == "function" ? e.setReturnFocus(s) : e?.setReturnFocus;
      return r === void 0 ? Pe(n, s) : r;
    }
  };
}
const je = (n = {}) => ce((e, i) => {
  let o, y, s, r = !1;
  const b = n.focusTrapOptions, h = () => n.triggerProp ? !!e[n.triggerProp] : !0, N = () => n.triggerProp ? h() : r, A = () => typeof e.focusTrapDisabledOverride == "function" ? !e.focusTrapDisabledOverride() : !e.focusTrapDisabled, S = () => {
    const w = y || e.el;
    w.isConnected && (o || (s ||= re(w, e), o = Ae(
      s,
      Oe(w, {
        ...b,
        ...e.focusTrapOptions
      })
    )), A() && o.activate());
  }, k = () => {
    o?.deactivate();
  };
  return i.onConnected(() => {
    o && N() && S();
  }), i.onUpdate((w) => {
    if (!(!e.hasUpdated || !w.has("focusTrapDisabled"))) {
      if (e.focusTrapDisabled || !h()) {
        k();
        return;
      }
      N() && S();
    }
  }), i.onDisconnected(() => k()), {
    get _instance() {
      if (Se.NODE_ENV === "test")
        return o;
    },
    activate: () => {
      r = !0, S();
    },
    deactivate: () => {
      r = !1, k();
    },
    overrideFocusTrapEl: (w) => {
      if (o)
        throw new Error("Focus trap already created");
      y = w;
    },
    setExtraContainers: (w) => {
      const _ = y || e.el;
      s = re(_, e, w);
    },
    updateContainerElements: () => o?.updateContainerElements(s)
  };
});
export {
  je as u
};
