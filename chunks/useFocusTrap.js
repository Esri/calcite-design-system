/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as se } from "./index2.js";
import { t as ce, j as le, k as R, l as I, m as q, o as fe, f as de } from "./dom.js";
import { N as ve } from "./index.js";
function U(r, e) {
  (e == null || e > r.length) && (e = r.length);
  for (var i = 0, o = Array(e); i < e; i++) o[i] = r[i];
  return o;
}
function be(r) {
  if (Array.isArray(r)) return U(r);
}
function X(r, e) {
  var i = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!i) {
    if (Array.isArray(r) || (i = ne(r)) || e) {
      i && (r = i);
      var o = 0, y = function() {
      };
      return {
        s: y,
        n: function() {
          return o >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[o++]
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
  var s, n = !0, b = !1;
  return {
    s: function() {
      i = i.call(r);
    },
    n: function() {
      var h = i.next();
      return n = h.done, h;
    },
    e: function(h) {
      b = !0, s = h;
    },
    f: function() {
      try {
        n || i.return == null || i.return();
      } finally {
        if (b) throw s;
      }
    }
  };
}
function pe(r, e, i) {
  return (e = we(e)) in r ? Object.defineProperty(r, e, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : r[e] = i, r;
}
function ye(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function me() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Z(r, e) {
  var i = Object.keys(r);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(r);
    e && (o = o.filter(function(y) {
      return Object.getOwnPropertyDescriptor(r, y).enumerable;
    })), i.push.apply(i, o);
  }
  return i;
}
function ee(r) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Z(Object(i), !0).forEach(function(o) {
      pe(r, o, i[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(i)) : Z(Object(i)).forEach(function(o) {
      Object.defineProperty(r, o, Object.getOwnPropertyDescriptor(i, o));
    });
  }
  return r;
}
function he(r) {
  return be(r) || ye(r) || ne(r) || me();
}
function ge(r, e) {
  if (typeof r != "object" || !r) return r;
  var i = r[Symbol.toPrimitive];
  if (i !== void 0) {
    var o = i.call(r, e);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(r);
}
function we(r) {
  var e = ge(r, "string");
  return typeof e == "symbol" ? e : e + "";
}
function ne(r, e) {
  if (r) {
    if (typeof r == "string") return U(r, e);
    var i = {}.toString.call(r).slice(8, -1);
    return i === "Object" && r.constructor && (i = r.constructor.name), i === "Map" || i === "Set" ? Array.from(r) : i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? U(r, e) : void 0;
  }
}
var E = {
  // Returns the trap from the top of the stack.
  getActiveTrap: function(e) {
    return e?.length > 0 ? e[e.length - 1] : null;
  },
  // Pauses the currently active trap, then adds a new trap to the stack.
  activateTrap: function(e, i) {
    var o = E.getActiveTrap(e);
    i !== o && E.pauseTrap(e);
    var y = e.indexOf(i);
    y === -1 || e.splice(y, 1), e.push(i);
  },
  // Removes the trap from the top of the stack, then unpauses the next trap down.
  deactivateTrap: function(e, i) {
    var o = e.indexOf(i);
    o !== -1 && e.splice(o, 1), E.unpauseTrap(e);
  },
  // Pauses the trap at the top of the stack.
  pauseTrap: function(e) {
    var i = E.getActiveTrap(e);
    i?._setPausedState(!0);
  },
  // Unpauses the trap at the top of the stack.
  unpauseTrap: function(e) {
    var i = E.getActiveTrap(e);
    i && !i._isManuallyPaused() && i._setPausedState(!1);
  }
}, Te = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, Fe = function(e) {
  return e?.key === "Escape" || e?.key === "Esc" || e?.keyCode === 27;
}, L = function(e) {
  return e?.key === "Tab" || e?.keyCode === 9;
}, Ne = function(e) {
  return L(e) && !e.shiftKey;
}, ke = function(e) {
  return L(e) && e.shiftKey;
}, te = function(e) {
  return setTimeout(e, 0);
}, j = function(e) {
  for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), y = 1; y < i; y++)
    o[y - 1] = arguments[y];
  return typeof e == "function" ? e.apply(void 0, o) : e;
}, B = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, Ee = [], De = function(e, i) {
  var o = i?.document || document, y = i?.trapStack || Ee, s = ee({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    delayReturnFocus: !0,
    isolateSubtrees: !1,
    isKeyForward: Ne,
    isKeyBackward: ke
  }, i), n = {
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
    return n.containerGroups.findIndex(function(f) {
      var l = f.container, p = f.tabbableNodes;
      return l.contains(t) || u?.includes(l) || p.find(function(c) {
        return c === t;
      });
    });
  }, D = function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = a.hasFallback, f = u === void 0 ? !1 : u, l = a.params, p = l === void 0 ? [] : l, c = s[t];
    if (typeof c == "function" && (c = c.apply(void 0, he(p))), c === !0 && (c = void 0), !c) {
      if (c === void 0 || c === !1)
        return c;
      throw new Error("`".concat(t, "` was specified but was not a node, or did not return a node"));
    }
    var v = c;
    if (typeof c == "string") {
      try {
        v = o.querySelector(c);
      } catch (d) {
        throw new Error("`".concat(t, '` appears to be an invalid selector; error="').concat(d.message, '"'));
      }
      if (!v && !f)
        throw new Error("`".concat(t, "` as selector refers to no known node"));
    }
    return v;
  }, A = function(t) {
    var a = t.activeElement;
    return a ? a.shadowRoot && a.shadowRoot.activeElement !== null ? A(a.shadowRoot) : a : null;
  }, k = function() {
    var t = D("initialFocus", {
      hasFallback: !0
    });
    if (t === !1)
      return !1;
    if (t === void 0 || t && !q(t, s.tabbableOptions)) {
      var a = A(o);
      if (N(a) >= 0)
        t = a;
      else {
        var u = n.tabbableGroups[0], f = u && u.firstTabbableNode;
        t = f || D("fallbackFocus");
      }
    } else t === null && (t = D("fallbackFocus"));
    if (!t)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return t;
  }, O = function() {
    if (n.containerGroups = n.containers.map(function(t) {
      var a = ce(t, s.tabbableOptions), u = le(t, s.tabbableOptions), f = a.length > 0 ? a[0] : void 0, l = a.length > 0 ? a[a.length - 1] : void 0, p = u.find(function(d) {
        return R(d);
      }), c = u.slice().reverse().find(function(d) {
        return R(d);
      }), v = !!a.find(function(d) {
        return I(d) > 0;
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
          return F < 0 ? T ? u.slice(u.indexOf(g) + 1).find(function(S) {
            return R(S);
          }) : u.slice(0, u.indexOf(g)).reverse().find(function(S) {
            return R(S);
          }) : a[F + (T ? 1 : -1)];
        }
      };
    }), n.tabbableGroups = n.containerGroups.filter(function(t) {
      return t.tabbableNodes.length > 0;
    }), n.tabbableGroups.length <= 0 && !D("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (n.containerGroups.find(function(t) {
      return t.posTabIndexesFound;
    }) && n.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, w = function(t) {
    if (t !== !1 && t !== A(document)) {
      if (!t || !t.focus) {
        w(k());
        return;
      }
      t.focus({
        preventScroll: !!s.preventScroll
      }), n.mostRecentlyFocusedNode = t, Te(t) && t.select();
    }
  }, K = function(t) {
    var a = D("setReturnFocus", {
      params: [t]
    });
    return a || (a === !1 ? !1 : t);
  }, V = function(t) {
    var a = t.target, u = t.event, f = t.isBackward, l = f === void 0 ? !1 : f;
    a = a || B(u), O();
    var p = null;
    if (n.tabbableGroups.length > 0) {
      var c = N(a, u), v = c >= 0 ? n.containerGroups[c] : void 0;
      if (c < 0)
        l ? p = n.tabbableGroups[n.tabbableGroups.length - 1].lastTabbableNode : p = n.tabbableGroups[0].firstTabbableNode;
      else if (l) {
        var d = n.tabbableGroups.findIndex(function(H) {
          var M = H.firstTabbableNode;
          return a === M;
        });
        if (d < 0 && (v.container === a || q(a, s.tabbableOptions) && !R(a, s.tabbableOptions) && !v.nextTabbableNode(a, !1)) && (d = c), d >= 0) {
          var g = d === 0 ? n.tabbableGroups.length - 1 : d - 1, T = n.tabbableGroups[g];
          p = I(a) >= 0 ? T.lastTabbableNode : T.lastDomTabbableNode;
        } else L(u) || (p = v.nextTabbableNode(a, !1));
      } else {
        var F = n.tabbableGroups.findIndex(function(H) {
          var M = H.lastTabbableNode;
          return a === M;
        });
        if (F < 0 && (v.container === a || q(a, s.tabbableOptions) && !R(a, s.tabbableOptions) && !v.nextTabbableNode(a)) && (F = c), F >= 0) {
          var S = F === n.tabbableGroups.length - 1 ? 0 : F + 1, P = n.tabbableGroups[S];
          p = I(a) >= 0 ? P.firstTabbableNode : P.firstDomTabbableNode;
        } else L(u) || (p = v.nextTabbableNode(a));
      }
    } else
      p = D("fallbackFocus");
    return p;
  }, _ = function(t) {
    var a = B(t);
    if (!(N(a, t) >= 0)) {
      if (j(s.clickOutsideDeactivates, t)) {
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
      j(s.allowOutsideClick, t) || t.preventDefault();
    }
  }, W = function(t) {
    var a = B(t), u = N(a, t) >= 0;
    if (u || a instanceof Document)
      u && (n.mostRecentlyFocusedNode = a);
    else {
      t.stopImmediatePropagation();
      var f, l = !0;
      if (n.mostRecentlyFocusedNode)
        if (I(n.mostRecentlyFocusedNode) > 0) {
          var p = N(n.mostRecentlyFocusedNode), c = n.containerGroups[p].tabbableNodes;
          if (c.length > 0) {
            var v = c.findIndex(function(d) {
              return d === n.mostRecentlyFocusedNode;
            });
            v >= 0 && (s.isKeyForward(n.recentNavEvent) ? v + 1 < c.length && (f = c[v + 1], l = !1) : v - 1 >= 0 && (f = c[v - 1], l = !1));
          }
        } else
          n.containerGroups.some(function(d) {
            return d.tabbableNodes.some(function(g) {
              return I(g) > 0;
            });
          }) || (l = !1);
      else
        l = !1;
      l && (f = V({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: n.mostRecentlyFocusedNode,
        isBackward: s.isKeyBackward(n.recentNavEvent)
      })), w(f || n.mostRecentlyFocusedNode || k());
    }
    n.recentNavEvent = void 0;
  }, ie = function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    n.recentNavEvent = t;
    var u = V({
      event: t,
      isBackward: a
    });
    u && (L(t) && t.preventDefault(), w(u));
  }, Y = function(t) {
    (s.isKeyForward(t) || s.isKeyBackward(t)) && ie(t, s.isKeyBackward(t));
  }, $ = function(t) {
    Fe(t) && j(s.escapeDeactivates, t) !== !1 && (t.preventDefault(), b.deactivate());
  }, z = function(t) {
    var a = B(t);
    N(a, t) >= 0 || j(s.clickOutsideDeactivates, t) || j(s.allowOutsideClick, t) || (t.preventDefault(), t.stopImmediatePropagation());
  }, J = function() {
    if (n.active) {
      E.activateTrap(y, b);
      var t;
      return s.delayInitialFocus ? t = new Promise(function(a) {
        n.delayInitialFocusTimer = te(function() {
          w(k()), a();
        });
      }) : w(k()), o.addEventListener("focusin", W, !0), o.addEventListener("mousedown", _, {
        capture: !0,
        passive: !1
      }), o.addEventListener("touchstart", _, {
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
  }, oe = function(t) {
    n.active && !n.paused && b._setSubtreeIsolation(!1), n.adjacentElements.clear(), n.alreadySilent.clear();
    var a = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), f = X(t), l;
    try {
      for (f.s(); !(l = f.n()).done; ) {
        var p = l.value;
        a.add(p);
        for (var c = typeof ShadowRoot < "u" && p.getRootNode() instanceof ShadowRoot, v = p; v; ) {
          a.add(v);
          var d = v.parentElement, g = [];
          d ? g = d.children : !d && c && (g = v.getRootNode().children, d = v.getRootNode().host, c = typeof ShadowRoot < "u" && d.getRootNode() instanceof ShadowRoot);
          var T = X(g), F;
          try {
            for (T.s(); !(F = T.n()).done; ) {
              var S = F.value;
              u.add(S);
            }
          } catch (P) {
            T.e(P);
          } finally {
            T.f();
          }
          v = d;
        }
      }
    } catch (P) {
      f.e(P);
    } finally {
      f.f();
    }
    a.forEach(function(P) {
      u.delete(P);
    }), n.adjacentElements = u;
  }, Q = function() {
    if (n.active)
      return o.removeEventListener("focusin", W, !0), o.removeEventListener("mousedown", _, !0), o.removeEventListener("touchstart", _, !0), o.removeEventListener("click", z, !0), o.removeEventListener("keydown", Y, !0), o.removeEventListener("keydown", $), b;
  }, ue = function(t) {
    var a = n.mostRecentlyFocusedNode;
    if (a) {
      var u = t.some(function(l) {
        var p = Array.from(l.removedNodes);
        return p.some(function(c) {
          return c === a || typeof c.contains == "function" && c.contains(a);
        });
      });
      if (u && n.containers.some(function(l) {
        return l?.isConnected;
      })) {
        O();
        var f = k();
        w(f);
      }
    }
  }, G = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(ue) : void 0, C = function() {
    G && (G.disconnect(), n.active && !n.paused && n.containers.map(function(t) {
      G.observe(t, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return b = {
    get active() {
      return n.active;
    },
    get paused() {
      return n.paused;
    },
    activate: function(t) {
      if (n.active)
        return this;
      var a = h(t, "onActivate"), u = h(t, "onPostActivate"), f = h(t, "checkCanFocusTrap"), l = E.getActiveTrap(y), p = !1;
      if (l && !l.paused) {
        var c;
        (c = l._setSubtreeIsolation) === null || c === void 0 || c.call(l, !1), p = !0;
      }
      try {
        f || O(), n.active = !0, n.paused = !1, n.nodeFocusedBeforeActivation = A(o), a?.({
          trap: b
        });
        var v = function() {
          f && O();
          var T = function() {
            b._setSubtreeIsolation(!0), C(), u?.({
              trap: b
            });
          }, F = J();
          F ? F.then(T) : T();
        };
        if (f)
          return f(n.containers.concat()).then(v, v), this;
        v();
      } catch (g) {
        if (l === E.getActiveTrap(y) && p) {
          var d;
          (d = l._setSubtreeIsolation) === null || d === void 0 || d.call(l, !0);
        }
        throw g;
      }
      return this;
    },
    deactivate: function(t) {
      if (!n.active)
        return this;
      var a = ee({
        onDeactivate: s.onDeactivate,
        onPostDeactivate: s.onPostDeactivate,
        checkCanReturnFocus: s.checkCanReturnFocus
      }, t);
      clearTimeout(n.delayInitialFocusTimer), n.delayInitialFocusTimer = void 0, n.paused || b._setSubtreeIsolation(!1), n.alreadySilent.clear(), Q(), n.active = !1, n.paused = !1, C(), E.deactivateTrap(y, b);
      var u = h(a, "onDeactivate"), f = h(a, "onPostDeactivate"), l = h(a, "checkCanReturnFocus"), p = h(a, "delayReturnFocus"), c = h(a, "returnFocus", "returnFocusOnDeactivate");
      u?.({
        trap: b
      });
      var v = function() {
        c && w(K(n.nodeFocusedBeforeActivation)), f?.({
          trap: b
        });
      }, d = function() {
        p && c ? te(v) : v();
      };
      return c && l ? (l(K(n.nodeFocusedBeforeActivation)).then(d, d), this) : (d(), this);
    },
    pause: function(t) {
      return n.active ? (n.manuallyPaused = !0, this._setPausedState(!0, t)) : this;
    },
    unpause: function(t) {
      return n.active ? (n.manuallyPaused = !1, y[y.length - 1] !== this ? this : this._setPausedState(!1, t)) : this;
    },
    updateContainerElements: function(t) {
      var a = [].concat(t).filter(Boolean);
      return n.containers = a.map(function(u) {
        return typeof u == "string" ? o.querySelector(u) : u;
      }), s.isolateSubtrees && oe(n.containers), n.active && (O(), n.paused || b._setSubtreeIsolation(!0)), C(), this;
    }
  }, Object.defineProperties(b, {
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
          var u = h(a, "onPause"), f = h(a, "onPostPause");
          u?.({
            trap: b
          }), Q(), b._setSubtreeIsolation(!1), C(), f?.({
            trap: b
          });
        } else {
          var l = h(a, "onUnpause"), p = h(a, "onPostUnpause");
          l?.({
            trap: b
          });
          var c = function() {
            O();
            var d = function() {
              b._setSubtreeIsolation(!0), C(), p?.({
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
        s.isolateSubtrees && n.adjacentElements.forEach(function(a) {
          var u;
          t ? s.isolateSubtrees === "aria-hidden" ? ((a.ariaHidden === "true" || ((u = a.getAttribute("aria-hidden")) === null || u === void 0 ? void 0 : u.toLowerCase()) === "true") && n.alreadySilent.add(a), a.setAttribute("aria-hidden", "true")) : ((a.inert || a.hasAttribute("inert")) && n.alreadySilent.add(a), a.setAttribute("inert", !0)) : n.alreadySilent.has(a) || (s.isolateSubtrees === "aria-hidden" ? a.removeAttribute("aria-hidden") : a.removeAttribute("inert"));
        });
      }
    }
  }), b.updateContainerElements(e), b;
}, Ae = {};
function ae(r, { focusTrapOptions: e }, i) {
  return !e?.extraContainers && !i ? r : [r, ...re(e?.extraContainers), ...re(i)];
}
function re(r = []) {
  return Array.isArray(r) ? r : [r];
}
const x = /* @__PURE__ */ new WeakSet();
function Se(r, e) {
  const i = e && e !== document.body && e !== document.documentElement;
  return !x.has(r) && i && de(e), !1;
}
function Pe(r, e) {
  const i = e?.fallbackFocus || r, o = e?.clickOutsideDeactivates ?? !0;
  let y;
  return {
    fallbackFocus: i,
    ...e,
    // the following options are not overridable
    document: r.ownerDocument,
    tabbableOptions: fe,
    trapStack: ve().focusTrapStack,
    clickOutsideDeactivates: (s) => (x.has(r) || x.add(r), typeof o == "function" ? o(s) : o),
    onActivate: (s) => {
      e?.escapeDeactivates && (y = new AbortController(), r.addEventListener(
        "keydown",
        (n) => {
          if (n.key === "Escape") {
            const b = e?.escapeDeactivates;
            (typeof b == "function" ? b(n) : b ?? !0) && s.trap.deactivate();
          }
        },
        { signal: y.signal }
      )), e?.onActivate?.(s);
    },
    onDeactivate: (s) => {
      y?.abort(), y = void 0, e?.onDeactivate?.(s);
    },
    onPostDeactivate: () => {
      x.delete(r);
    },
    setReturnFocus: (s) => {
      const n = typeof e?.setReturnFocus == "function" ? e.setReturnFocus(s) : e?.setReturnFocus;
      return n === void 0 ? Se(r, s) : n;
    }
  };
}
const Ie = (r = {}) => se((e, i) => {
  let o, y, s, n = !1;
  const b = r.focusTrapOptions, h = () => r.triggerProp ? !!e[r.triggerProp] : !0, N = () => r.triggerProp ? h() : n, D = () => typeof e.focusTrapDisabledOverride == "function" ? !e.focusTrapDisabledOverride() : !e.focusTrapDisabled, A = () => {
    const w = y || e.el;
    w.isConnected && (o || (s ||= ae(w, e), o = De(
      s,
      Pe(w, {
        ...b,
        ...e.focusTrapOptions
      })
    )), D() && o.activate());
  }, k = () => {
    o?.deactivate();
  };
  return i.onConnected(() => {
    o && N() && A();
  }), i.onUpdate((w) => {
    if (!(!e.hasUpdated || !w.has("focusTrapDisabled"))) {
      if (e.focusTrapDisabled || !h()) {
        k();
        return;
      }
      N() && A();
    }
  }), i.onDisconnected(() => k()), {
    get _instance() {
      if (Ae.NODE_ENV === "test")
        return o;
    },
    activate: () => {
      n = !0, A();
    },
    deactivate: () => {
      n = !1, k();
    },
    overrideFocusTrapEl: (w) => {
      if (o)
        throw new Error("Focus trap already created");
      y = w;
    },
    setExtraContainers: (w) => {
      const K = y || e.el;
      s = ae(K, e, w);
    },
    updateContainerElements: () => o?.updateContainerElements(s)
  };
});
export {
  Ie as u
};
