/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { m as fe } from "./index2.js";
import { t as de, l as ve, m as C, o as L, p as W, r as be, f as pe } from "./dom.js";
import { y as ye } from "./index.js";
function V(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var i = 0, o = Array(e); i < e; i++) o[i] = n[i];
  return o;
}
function me(n) {
  if (Array.isArray(n)) return V(n);
}
function te(n, e) {
  var i = typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
  if (!i) {
    if (Array.isArray(n) || (i = ue(n)) || e) {
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
  var s, t = !0, b = !1;
  return {
    s: function() {
      i = i.call(n);
    },
    n: function() {
      var h = i.next();
      return t = h.done, h;
    },
    e: function(h) {
      b = !0, s = h;
    },
    f: function() {
      try {
        t || i.return == null || i.return();
      } finally {
        if (b) throw s;
      }
    }
  };
}
function he(n, e, i) {
  return (e = Ne(e)) in n ? Object.defineProperty(n, e, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = i, n;
}
function ge(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function we() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ae(n, e) {
  var i = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    e && (o = o.filter(function(y) {
      return Object.getOwnPropertyDescriptor(n, y).enumerable;
    })), i.push.apply(i, o);
  }
  return i;
}
function re(n) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ae(Object(i), !0).forEach(function(o) {
      he(n, o, i[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i)) : ae(Object(i)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(i, o));
    });
  }
  return n;
}
function Te(n) {
  return me(n) || ge(n) || ue(n) || we();
}
function Fe(n, e) {
  if (typeof n != "object" || !n) return n;
  var i = n[Symbol.toPrimitive];
  if (i !== void 0) {
    var o = i.call(n, e);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function Ne(n) {
  var e = Fe(n, "string");
  return typeof e == "symbol" ? e : e + "";
}
function ue(n, e) {
  if (n) {
    if (typeof n == "string") return V(n, e);
    var i = {}.toString.call(n).slice(8, -1);
    return i === "Object" && n.constructor && (i = n.constructor.name), i === "Map" || i === "Set" ? Array.from(n) : i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? V(n, e) : void 0;
  }
}
var O = /* @__PURE__ */ new WeakMap(), U = function(e) {
  var i = e?.preexistingTrap;
  if (i) {
    var o = O.get(i);
    o === 1 ? O.delete(i) : O.set(i, o - 1), e.preexistingTrap = void 0;
  }
}, k = {
  // Returns the trap from the top of the stack.
  getActiveTrap: function(e) {
    return e?.length > 0 ? e[e.length - 1] : null;
  },
  // Pauses the currently active trap, then adds a new trap to the stack.
  activateTrap: function(e, i) {
    var o = k.getActiveTrap(e);
    i !== o && k.pauseTrap(e);
    var y = e.indexOf(i);
    y === -1 || e.splice(y, 1), e.push(i);
  },
  // Removes the trap from the top of the stack, then unpauses the next trap down.
  deactivateTrap: function(e, i) {
    var o = e.indexOf(i);
    o !== -1 && e.splice(o, 1), k.unpauseTrap(e);
  },
  // Pauses the trap at the top of the stack.
  pauseTrap: function(e) {
    var i = k.getActiveTrap(e);
    i?._setPausedState(!0);
  },
  // Unpauses the trap at the top of the stack.
  unpauseTrap: function(e) {
    var i = k.getActiveTrap(e);
    i && !i._isManuallyPaused() && i._setPausedState(!1);
  }
}, ke = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, Ee = function(e) {
  return e?.key === "Escape" || e?.key === "Esc" || e?.keyCode === 27;
}, B = function(e) {
  return e?.key === "Tab" || e?.keyCode === 9;
}, De = function(e) {
  return B(e) && !e.shiftKey;
}, Ae = function(e) {
  return B(e) && e.shiftKey;
}, ne = function(e) {
  return setTimeout(e, 0);
}, K = function(e) {
  for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), y = 1; y < i; y++)
    o[y - 1] = arguments[y];
  return typeof e == "function" ? e.apply(void 0, o) : e;
}, G = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, Se = [], Pe = function(e, i) {
  var o = i?.document || document, y = i?.trapStack || Se, s = re({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    delayReturnFocus: !0,
    isolateSubtrees: !1,
    isKeyForward: De,
    isKeyBackward: Ae
  }, i), t = {
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
    subtreeIsolated: !1,
    // Tracks the current activation and any prior trap whose isolation it suspended.
    activation: void 0,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: !1,
    paused: !1,
    manuallyPaused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // unique token for the unpause in progress, if any, so a cancelled unpause (e.g. the trap
    //  was deactivated or paused again before it finished) doesn't finish later
    unpausing: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, b, h = function(a, r, u) {
    return a && a[r] !== void 0 ? a[r] : s[u || r];
  }, E = function(a, r) {
    var u = typeof r?.composedPath == "function" ? r.composedPath() : void 0;
    return t.containerGroups.findIndex(function(f) {
      var d = f.container, l = f.tabbableNodes;
      return d.contains(a) || u?.includes(d) || l.find(function(c) {
        return c === a;
      });
    });
  }, A = function(a) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = r.hasFallback, f = u === void 0 ? !1 : u, d = r.params, l = d === void 0 ? [] : d, c = s[a];
    if (typeof c == "function" && (c = c.apply(void 0, Te(l))), c === !0 && (c = void 0), !c) {
      if (c === void 0 || c === !1)
        return c;
      throw new Error("`".concat(a, "` was specified but was not a node, or did not return a node"));
    }
    var v = c;
    if (typeof c == "string") {
      try {
        v = o.querySelector(c);
      } catch (p) {
        throw new Error("`".concat(a, '` appears to be an invalid selector; error="').concat(p.message, '"'), {
          cause: p
        });
      }
      if (!v && !f)
        throw new Error("`".concat(a, "` as selector refers to no known node"));
    }
    return v;
  }, S = function(a) {
    var r = a.activeElement;
    return r ? r.shadowRoot && r.shadowRoot.activeElement !== null ? S(r.shadowRoot) : r : null;
  }, D = function() {
    var a = A("initialFocus", {
      hasFallback: !0
    });
    if (a === !1)
      return !1;
    if (a === void 0 || a && !W(a, s.tabbableOptions)) {
      var r = S(o);
      if (E(r) >= 0)
        a = r;
      else {
        var u = t.tabbableGroups[0], f = u && u.firstTabbableNode;
        a = f || A("fallbackFocus");
      }
    } else a === null && (a = A("fallbackFocus"));
    if (!a)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return a;
  }, R = function() {
    if (t.containerGroups = t.containers.map(function(a) {
      var r = de(a, s.tabbableOptions), u = ve(a, s.tabbableOptions), f = r.length > 0 ? r[0] : void 0, d = r.length > 0 ? r[r.length - 1] : void 0, l = u.find(function(p) {
        return C(p);
      }), c = u.slice().reverse().find(function(p) {
        return C(p);
      }), v = !!r.find(function(p) {
        return L(p) > 0;
      });
      return {
        container: a,
        tabbableNodes: r,
        focusableNodes: u,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: v,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: f,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: d,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: l,
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
          var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, T = r.indexOf(g);
          return T < 0 ? w ? u.slice(u.indexOf(g) + 1).find(function(N) {
            return C(N);
          }) : u.slice(0, u.indexOf(g)).reverse().find(function(N) {
            return C(N);
          }) : r[T + (w ? 1 : -1)];
        }
      };
    }), t.tabbableGroups = t.containerGroups.filter(function(a) {
      return a.tabbableNodes.length > 0;
    }), t.tabbableGroups.length <= 0 && !A("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (t.containerGroups.find(function(a) {
      return a.posTabIndexesFound;
    }) && t.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, F = function(a) {
    if (a !== !1) {
      if (a === S(o)) {
        t.mostRecentlyFocusedNode = a;
        return;
      }
      if (!a || !a.focus) {
        F(D());
        return;
      }
      a.focus({
        preventScroll: !!s.preventScroll
      }), t.mostRecentlyFocusedNode = a, ke(a) && a.select();
    }
  }, _ = function(a) {
    var r = A("setReturnFocus", {
      params: [a]
    });
    return r || (r === !1 ? !1 : a);
  }, Y = function(a) {
    var r = a.target, u = a.event, f = a.isBackward, d = f === void 0 ? !1 : f;
    r = r || G(u), R();
    var l = null;
    if (t.tabbableGroups.length > 0) {
      var c = E(r, u), v = c >= 0 ? t.containerGroups[c] : void 0;
      if (c < 0)
        d ? l = t.tabbableGroups[t.tabbableGroups.length - 1].lastTabbableNode : l = t.tabbableGroups[0].firstTabbableNode;
      else if (d) {
        var p = t.tabbableGroups.findIndex(function(I) {
          var q = I.firstTabbableNode;
          return r === q;
        });
        if (p < 0 && (v.container === r || W(r, s.tabbableOptions) && !C(r, s.tabbableOptions) && !v.nextTabbableNode(r, !1)) && (p = Math.max(0, t.tabbableGroups.findIndex(function(I) {
          return t.containerGroups.indexOf(I) >= c;
        }))), p >= 0) {
          var g = p === 0 ? t.tabbableGroups.length - 1 : p - 1, w = t.tabbableGroups[g];
          l = L(r) >= 0 ? w.lastTabbableNode : w.lastDomTabbableNode;
        } else B(u) || (l = v.nextTabbableNode(r, !1));
      } else {
        var T = t.tabbableGroups.findIndex(function(I) {
          var q = I.lastTabbableNode;
          return r === q;
        });
        if (T < 0 && (v.container === r || W(r, s.tabbableOptions) && !C(r, s.tabbableOptions) && !v.nextTabbableNode(r))) {
          var N = t.tabbableGroups.findIndex(function(I) {
            return t.containerGroups.indexOf(I) > c;
          });
          T = N > 0 ? N - 1 : t.tabbableGroups.length - 1;
        }
        if (T >= 0) {
          var P = T === t.tabbableGroups.length - 1 ? 0 : T + 1, ee = t.tabbableGroups[P];
          l = L(r) >= 0 ? ee.firstTabbableNode : ee.firstDomTabbableNode;
        } else B(u) || (l = v.nextTabbableNode(r));
      }
    } else
      l = A("fallbackFocus");
    return l;
  }, x = function(a) {
    var r = G(a);
    if (!(E(r, a) >= 0)) {
      if (K(s.clickOutsideDeactivates, a)) {
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
      K(s.allowOutsideClick, a) || a.preventDefault();
    }
  }, z = function(a) {
    var r = G(a), u = E(r, a) >= 0;
    if (u || r instanceof Document)
      u && (t.mostRecentlyFocusedNode = r);
    else {
      a.stopImmediatePropagation();
      var f, d = !0;
      if (t.mostRecentlyFocusedNode)
        if (L(t.mostRecentlyFocusedNode) > 0) {
          var l = E(t.mostRecentlyFocusedNode), c = t.containerGroups[l].tabbableNodes;
          if (c.length > 0) {
            var v = c.findIndex(function(p) {
              return p === t.mostRecentlyFocusedNode;
            });
            v >= 0 && (s.isKeyForward(t.recentNavEvent) ? v + 1 < c.length && (f = c[v + 1], d = !1) : v - 1 >= 0 && (f = c[v - 1], d = !1));
          }
        } else
          t.containerGroups.some(function(p) {
            return p.tabbableNodes.some(function(g) {
              return L(g) > 0;
            });
          }) || (d = !1);
      else
        d = !1;
      d && (f = Y({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: t.mostRecentlyFocusedNode,
        isBackward: s.isKeyBackward(t.recentNavEvent)
      })), F(f || t.mostRecentlyFocusedNode || D());
    }
    t.recentNavEvent = void 0;
  }, se = function(a) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    t.recentNavEvent = a;
    var u = Y({
      event: a,
      isBackward: r
    });
    u && (B(a) && a.preventDefault(), F(u));
  }, J = function(a) {
    (s.isKeyForward(a) || s.isKeyBackward(a)) && se(a, s.isKeyBackward(a));
  }, Q = function(a) {
    Ee(a) && K(s.escapeDeactivates, a) !== !1 && (a.preventDefault(), b.deactivate());
  }, X = function(a) {
    var r = G(a);
    E(r, a) >= 0 || K(s.clickOutsideDeactivates, a) || K(s.allowOutsideClick, a) || (a.preventDefault(), a.stopImmediatePropagation());
  }, Z = function() {
    if (t.active && (k.activateTrap(y, b), !t.paused)) {
      var a;
      if (s.delayInitialFocus)
        a = new Promise(function(r) {
          t.delayInitialFocusTimer = ne(function() {
            F(D()), r();
          });
        });
      else if (F(D()), !t.active || t.paused)
        return;
      return o.addEventListener("focusin", z, !0), o.addEventListener("mousedown", x, {
        capture: !0,
        passive: !1
      }), o.addEventListener("touchstart", x, {
        capture: !0,
        passive: !1
      }), o.addEventListener("click", X, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", J, {
        capture: !0,
        passive: !1
      }), o.addEventListener("keydown", Q), a;
    }
  }, ce = function(a) {
    t.active && !t.paused && b._setSubtreeIsolation(!1), t.adjacentElements.clear(), t.alreadySilent.clear();
    var r = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), f = te(a), d;
    try {
      for (f.s(); !(d = f.n()).done; ) {
        var l = d.value;
        r.add(l);
        for (var c = typeof ShadowRoot < "u" && l.getRootNode() instanceof ShadowRoot, v = l; v; ) {
          r.add(v);
          var p = v.parentElement, g = [];
          p ? g = p.children : !p && c && (g = v.getRootNode().children, p = v.getRootNode().host, c = typeof ShadowRoot < "u" && p.getRootNode() instanceof ShadowRoot);
          var w = te(g), T;
          try {
            for (w.s(); !(T = w.n()).done; ) {
              var N = T.value;
              u.add(N);
            }
          } catch (P) {
            w.e(P);
          } finally {
            w.f();
          }
          v = p;
        }
      }
    } catch (P) {
      f.e(P);
    } finally {
      f.f();
    }
    r.forEach(function(P) {
      u.delete(P);
    }), t.adjacentElements = u;
  }, $ = function() {
    if (t.active)
      return o.removeEventListener("focusin", z, !0), o.removeEventListener("mousedown", x, !0), o.removeEventListener("touchstart", x, !0), o.removeEventListener("click", X, !0), o.removeEventListener("keydown", J, !0), o.removeEventListener("keydown", Q), b;
  }, le = function(a) {
    var r = t.mostRecentlyFocusedNode;
    if (r) {
      var u = a.some(function(d) {
        var l = Array.from(d.removedNodes);
        return l.some(function(c) {
          return c === r || typeof c.contains == "function" && c.contains(r);
        });
      });
      if (u && t.containers.some(function(d) {
        return d?.isConnected;
      })) {
        R();
        var f = D();
        F(f);
      }
    }
  }, H = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(le) : void 0, j = function() {
    H && (H.disconnect(), t.active && !t.paused && t.containers.map(function(a) {
      H.observe(a, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return b = {
    get active() {
      return t.active;
    },
    get paused() {
      return t.paused;
    },
    activate: function(a) {
      if (t.active)
        return this;
      var r = {};
      t.activation = r;
      var u = h(a, "onActivate"), f = h(a, "onPostActivate"), d = h(a, "checkCanFocusTrap"), l = k.getActiveTrap(y), c = !1;
      if (l && !l.paused) {
        var v;
        (v = l._setSubtreeIsolation) === null || v === void 0 || v.call(l, !1), c = !0, r.preexistingTrap = l, O.set(l, (O.get(l) || 0) + 1);
      }
      try {
        d || R(), t.active = !0, t.paused = !1, t.nodeFocusedBeforeActivation = S(o), u?.({
          trap: b
        });
        var p = function() {
          if (!(!t.active || t.activation !== r)) {
            d && R();
            var T = function() {
              !t.active || t.activation !== r || (t.paused || b._setSubtreeIsolation(!0), j(), f?.({
                trap: b
              }));
            };
            U(r);
            var N = Z();
            N ? N.then(T) : T();
          }
        };
        if (d)
          return d(t.containers.concat()).then(p, p), this;
        p();
      } catch (w) {
        if (U(r), l === k.getActiveTrap(y) && c && !O.has(l)) {
          var g;
          (g = l._setSubtreeIsolation) === null || g === void 0 || g.call(l, !0);
        }
        throw w;
      }
      return this;
    },
    deactivate: function(a) {
      var r;
      if (!t.active)
        return this;
      var u = re({
        onDeactivate: s.onDeactivate,
        onPostDeactivate: s.onPostDeactivate,
        checkCanReturnFocus: s.checkCanReturnFocus
      }, a);
      clearTimeout(t.delayInitialFocusTimer), t.delayInitialFocusTimer = void 0, t.unpausing = void 0, t.paused || b._setSubtreeIsolation(!1), t.alreadySilent.clear(), $(), t.active = !1, t.paused = !1, j(), k.deactivateTrap(y, b);
      var f = (r = t.activation) === null || r === void 0 ? void 0 : r.preexistingTrap;
      if (U(t.activation), !O.has(f) && f === k.getActiveTrap(y) && f !== null && f !== void 0 && f.active && !f.paused) {
        var d;
        (d = f._setSubtreeIsolation) === null || d === void 0 || d.call(f, !0);
      }
      var l = h(u, "onDeactivate"), c = h(u, "onPostDeactivate"), v = h(u, "checkCanReturnFocus"), p = h(u, "delayReturnFocus"), g = h(u, "returnFocus", "returnFocusOnDeactivate");
      l?.({
        trap: b
      });
      var w = function() {
        g && F(_(t.nodeFocusedBeforeActivation)), c?.({
          trap: b
        });
      }, T = function() {
        p && g ? ne(w) : w();
      };
      return g && v ? (v(_(t.nodeFocusedBeforeActivation)).then(T, T), this) : (T(), this);
    },
    pause: function(a) {
      return t.active ? (t.manuallyPaused = !0, this._setPausedState(!0, a)) : this;
    },
    unpause: function(a) {
      return t.active ? (t.manuallyPaused = !1, y[y.length - 1] !== this ? this : this._setPausedState(!1, a)) : this;
    },
    updateContainerElements: function(a) {
      var r = [].concat(a).filter(Boolean);
      return t.containers = r.map(function(u) {
        return typeof u == "string" ? o.querySelector(u) : u;
      }), s.isolateSubtrees && ce(t.containers), t.active && (R(), t.paused || b._setSubtreeIsolation(!0)), j(), this;
    }
  }, Object.defineProperties(b, {
    _isManuallyPaused: {
      value: function() {
        return t.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(a, r) {
        if (t.paused === a)
          return this;
        if (t.paused = a, a) {
          var u = h(r, "onPause"), f = h(r, "onPostPause");
          u?.({
            trap: b
          }), t.unpausing = void 0, $(), b._setSubtreeIsolation(!1), j(), f?.({
            trap: b
          });
        } else {
          var d = h(r, "onUnpause"), l = h(r, "onPostUnpause"), c = {};
          if (t.unpausing = c, d?.({
            trap: b
          }), t.unpausing !== c)
            return this;
          var v = function() {
            if (!(!t.active || t.paused)) {
              R();
              var g = function() {
                t.unpausing === c && (O.has(b) || b._setSubtreeIsolation(!0), j(), l?.({
                  trap: b
                }));
              }, w = Z();
              w ? w.then(g) : g();
            }
          };
          v();
        }
        return this;
      }
    },
    _setSubtreeIsolation: {
      value: function(a) {
        if (s.isolateSubtrees) {
          if (t.subtreeIsolated === a)
            return;
          t.subtreeIsolated = a, t.adjacentElements.forEach(function(r) {
            var u;
            a ? s.isolateSubtrees === "aria-hidden" ? ((r.ariaHidden === "true" || ((u = r.getAttribute("aria-hidden")) === null || u === void 0 ? void 0 : u.toLowerCase()) === "true") && t.alreadySilent.add(r), r.setAttribute("aria-hidden", "true")) : ((r.inert || r.hasAttribute("inert")) && t.alreadySilent.add(r), r.setAttribute("inert", !0)) : t.alreadySilent.has(r) || (s.isolateSubtrees === "aria-hidden" ? r.removeAttribute("aria-hidden") : r.removeAttribute("inert"));
          });
        }
      }
    }
  }), b.updateContainerElements(e), b;
}, Oe = {};
function ie(n, { focusTrapOptions: e }, i) {
  return !e?.extraContainers && !i ? n : [n, ...oe(e?.extraContainers), ...oe(i)];
}
function oe(n = []) {
  return Array.isArray(n) ? n : [n];
}
const M = /* @__PURE__ */ new WeakSet();
function Re(n, e) {
  const i = e && e !== document.body && e !== document.documentElement;
  return !M.has(n) && i && pe(e), !1;
}
function Ie(n, e) {
  const i = e?.fallbackFocus || n, o = e?.clickOutsideDeactivates ?? !0;
  let y;
  return {
    fallbackFocus: i,
    ...e,
    // the following options are not overridable
    document: n.ownerDocument,
    tabbableOptions: be,
    trapStack: ye().focusTrapStack,
    clickOutsideDeactivates: (s) => (M.has(n) || M.add(n), typeof o == "function" ? o(s) : o),
    onActivate: (s) => {
      e?.escapeDeactivates && (y = new AbortController(), n.addEventListener(
        "keydown",
        (t) => {
          if (t.key === "Escape") {
            const b = e?.escapeDeactivates;
            (typeof b == "function" ? b(t) : b ?? !0) && s.trap.deactivate();
          }
        },
        { signal: y.signal }
      )), e?.onActivate?.(s);
    },
    onDeactivate: (s) => {
      y?.abort(), y = void 0, e?.onDeactivate?.(s);
    },
    onPostDeactivate: () => {
      M.delete(n);
    },
    setReturnFocus: (s) => {
      const t = typeof e?.setReturnFocus == "function" ? e.setReturnFocus(s) : e?.setReturnFocus;
      return t === void 0 ? Re(n, s) : t;
    }
  };
}
const Ke = (n = {}) => fe((e, i) => {
  let o, y, s, t = !1;
  const b = n.focusTrapOptions, h = () => n.triggerProp ? !!e[n.triggerProp] : !0, E = () => n.triggerProp ? h() : t, A = () => typeof e.focusTrapDisabledOverride == "function" ? !e.focusTrapDisabledOverride() : !e.focusTrapDisabled, S = () => {
    const F = y || e.el;
    F.isConnected && (o || (s ||= ie(F, e), o = Pe(
      s,
      Ie(F, {
        ...b,
        ...e.focusTrapOptions
      })
    )), A() && o.activate());
  }, D = () => {
    o?.deactivate();
  };
  return i.onConnected(() => {
    o && E() && S();
  }), i.onUpdate((F) => {
    if (!(!e.hasUpdated || !F.has("focusTrapDisabled"))) {
      if (e.focusTrapDisabled || !h()) {
        D();
        return;
      }
      E() && S();
    }
  }), i.onDisconnected(() => D()), {
    get _instance() {
      if (Oe.NODE_ENV === "test")
        return o;
    },
    activate: () => {
      t = !0, S();
    },
    deactivate: () => {
      t = !1, D();
    },
    overrideFocusTrapEl: (F) => {
      if (o)
        throw new Error("Focus trap already created");
      y = F;
    },
    setExtraContainers: (F) => {
      const _ = y || e.el;
      s = ie(_, e, F);
    },
    updateContainerElements: () => o?.updateContainerElements(s)
  };
});
export {
  Ke as u
};
