import { g as xt } from "./_commonjsHelpers.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
function Lt(P, f) {
  for (var Y = 0; Y < f.length; Y++) {
    const $ = f[Y];
    if (typeof $ != "string" && !Array.isArray($)) {
      for (const I in $)
        if (I !== "default" && !(I in P)) {
          const L = Object.getOwnPropertyDescriptor($, I);
          L && Object.defineProperty(P, I, L.get ? L : {
            enumerable: !0,
            get: () => $[I]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(P, Symbol.toStringTag, { value: "Module" }));
}
var ke = { exports: {} }, p = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Or;
function Mt() {
  if (Or) return p;
  Or = 1;
  var P = Symbol.for("react.element"), f = Symbol.for("react.portal"), Y = Symbol.for("react.fragment"), $ = Symbol.for("react.strict_mode"), I = Symbol.for("react.profiler"), L = Symbol.for("react.provider"), B = Symbol.for("react.context"), ne = Symbol.for("react.forward_ref"), ae = Symbol.for("react.suspense"), oe = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), M = Symbol.iterator;
  function H(t) {
    return t === null || typeof t != "object" ? null : (t = M && t[M] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var K = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, F = Object.assign, z = {};
  function N(t, u, l) {
    this.props = t, this.context = u, this.refs = z, this.updater = l || K;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(t, u) {
    if (typeof t != "object" && typeof t != "function" && t != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, t, u, "setState");
  }, N.prototype.forceUpdate = function(t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate");
  };
  function ue() {
  }
  ue.prototype = N.prototype;
  function ie(t, u, l) {
    this.props = t, this.context = u, this.refs = z, this.updater = l || K;
  }
  var G = ie.prototype = new ue();
  G.constructor = ie, F(G, N.prototype), G.isPureReactComponent = !0;
  var se = Array.isArray, x = Object.prototype.hasOwnProperty, T = { current: null }, D = { key: !0, ref: !0, __self: !0, __source: !0 };
  function V(t, u, l) {
    var h, v = {}, _ = null, S = null;
    if (u != null) for (h in u.ref !== void 0 && (S = u.ref), u.key !== void 0 && (_ = "" + u.key), u) x.call(u, h) && !D.hasOwnProperty(h) && (v[h] = u[h]);
    var g = arguments.length - 2;
    if (g === 1) v.children = l;
    else if (1 < g) {
      for (var b = Array(g), j = 0; j < g; j++) b[j] = arguments[j + 2];
      v.children = b;
    }
    if (t && t.defaultProps) for (h in g = t.defaultProps, g) v[h] === void 0 && (v[h] = g[h]);
    return { $$typeof: P, type: t, key: _, ref: S, props: v, _owner: T.current };
  }
  function Q(t, u) {
    return { $$typeof: P, type: t.type, key: u, ref: t.ref, props: t.props, _owner: t._owner };
  }
  function X(t) {
    return typeof t == "object" && t !== null && t.$$typeof === P;
  }
  function Pe(t) {
    var u = { "=": "=0", ":": "=2" };
    return "$" + t.replace(/[=:]/g, function(l) {
      return u[l];
    });
  }
  var ye = /\/+/g;
  function ce(t, u) {
    return typeof t == "object" && t !== null && t.key != null ? Pe("" + t.key) : u.toString(36);
  }
  function J(t, u, l, h, v) {
    var _ = typeof t;
    (_ === "undefined" || _ === "boolean") && (t = null);
    var S = !1;
    if (t === null) S = !0;
    else switch (_) {
      case "string":
      case "number":
        S = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case P:
          case f:
            S = !0;
        }
    }
    if (S) return S = t, v = v(S), t = h === "" ? "." + ce(S, 0) : h, se(v) ? (l = "", t != null && (l = t.replace(ye, "$&/") + "/"), J(v, u, l, "", function(j) {
      return j;
    })) : v != null && (X(v) && (v = Q(v, l + (!v.key || S && S.key === v.key ? "" : ("" + v.key).replace(ye, "$&/") + "/") + t)), u.push(v)), 1;
    if (S = 0, h = h === "" ? "." : h + ":", se(t)) for (var g = 0; g < t.length; g++) {
      _ = t[g];
      var b = h + ce(_, g);
      S += J(_, u, l, b, v);
    }
    else if (b = H(t), typeof b == "function") for (t = b.call(t), g = 0; !(_ = t.next()).done; ) _ = _.value, b = h + ce(_, g++), S += J(_, u, l, b, v);
    else if (_ === "object") throw u = String(t), Error("Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead.");
    return S;
  }
  function Z(t, u, l) {
    if (t == null) return t;
    var h = [], v = 0;
    return J(t, h, "", "", function(_) {
      return u.call(l, _, v++);
    }), h;
  }
  function U(t) {
    if (t._status === -1) {
      var u = t._result;
      u = u(), u.then(function(l) {
        (t._status === 0 || t._status === -1) && (t._status = 1, t._result = l);
      }, function(l) {
        (t._status === 0 || t._status === -1) && (t._status = 2, t._result = l);
      }), t._status === -1 && (t._status = 0, t._result = u);
    }
    if (t._status === 1) return t._result.default;
    throw t._result;
  }
  var w = { current: null }, d = { transition: null }, he = { ReactCurrentDispatcher: w, ReactCurrentBatchConfig: d, ReactCurrentOwner: T };
  function fe() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return p.Children = { map: Z, forEach: function(t, u, l) {
    Z(t, function() {
      u.apply(this, arguments);
    }, l);
  }, count: function(t) {
    var u = 0;
    return Z(t, function() {
      u++;
    }), u;
  }, toArray: function(t) {
    return Z(t, function(u) {
      return u;
    }) || [];
  }, only: function(t) {
    if (!X(t)) throw Error("React.Children.only expected to receive a single React element child.");
    return t;
  } }, p.Component = N, p.Fragment = Y, p.Profiler = I, p.PureComponent = ie, p.StrictMode = $, p.Suspense = ae, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = he, p.act = fe, p.cloneElement = function(t, u, l) {
    if (t == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
    var h = F({}, t.props), v = t.key, _ = t.ref, S = t._owner;
    if (u != null) {
      if (u.ref !== void 0 && (_ = u.ref, S = T.current), u.key !== void 0 && (v = "" + u.key), t.type && t.type.defaultProps) var g = t.type.defaultProps;
      for (b in u) x.call(u, b) && !D.hasOwnProperty(b) && (h[b] = u[b] === void 0 && g !== void 0 ? g[b] : u[b]);
    }
    var b = arguments.length - 2;
    if (b === 1) h.children = l;
    else if (1 < b) {
      g = Array(b);
      for (var j = 0; j < b; j++) g[j] = arguments[j + 2];
      h.children = g;
    }
    return { $$typeof: P, type: t.type, key: v, ref: _, props: h, _owner: S };
  }, p.createContext = function(t) {
    return t = { $$typeof: B, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: L, _context: t }, t.Consumer = t;
  }, p.createElement = V, p.createFactory = function(t) {
    var u = V.bind(null, t);
    return u.type = t, u;
  }, p.createRef = function() {
    return { current: null };
  }, p.forwardRef = function(t) {
    return { $$typeof: ne, render: t };
  }, p.isValidElement = X, p.lazy = function(t) {
    return { $$typeof: q, _payload: { _status: -1, _result: t }, _init: U };
  }, p.memo = function(t, u) {
    return { $$typeof: oe, type: t, compare: u === void 0 ? null : u };
  }, p.startTransition = function(t) {
    var u = d.transition;
    d.transition = {};
    try {
      t();
    } finally {
      d.transition = u;
    }
  }, p.unstable_act = fe, p.useCallback = function(t, u) {
    return w.current.useCallback(t, u);
  }, p.useContext = function(t) {
    return w.current.useContext(t);
  }, p.useDebugValue = function() {
  }, p.useDeferredValue = function(t) {
    return w.current.useDeferredValue(t);
  }, p.useEffect = function(t, u) {
    return w.current.useEffect(t, u);
  }, p.useId = function() {
    return w.current.useId();
  }, p.useImperativeHandle = function(t, u, l) {
    return w.current.useImperativeHandle(t, u, l);
  }, p.useInsertionEffect = function(t, u) {
    return w.current.useInsertionEffect(t, u);
  }, p.useLayoutEffect = function(t, u) {
    return w.current.useLayoutEffect(t, u);
  }, p.useMemo = function(t, u) {
    return w.current.useMemo(t, u);
  }, p.useReducer = function(t, u, l) {
    return w.current.useReducer(t, u, l);
  }, p.useRef = function(t) {
    return w.current.useRef(t);
  }, p.useState = function(t) {
    return w.current.useState(t);
  }, p.useSyncExternalStore = function(t, u, l) {
    return w.current.useSyncExternalStore(t, u, l);
  }, p.useTransition = function() {
    return w.current.useTransition();
  }, p.version = "18.3.1", p;
}
var ve = { exports: {} };
ve.exports;
var Tr;
function Nt() {
  return Tr || (Tr = 1, function(P, f) {
    var Y = {};
    /**
     * @license React
     * react.development.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    Y.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var $ = "18.3.1", I = Symbol.for("react.element"), L = Symbol.for("react.portal"), B = Symbol.for("react.fragment"), ne = Symbol.for("react.strict_mode"), ae = Symbol.for("react.profiler"), oe = Symbol.for("react.provider"), q = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), N = Symbol.for("react.offscreen"), ue = Symbol.iterator, ie = "@@iterator";
      function G(e) {
        if (e === null || typeof e != "object")
          return null;
        var r = ue && e[ue] || e[ie];
        return typeof r == "function" ? r : null;
      }
      var se = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, x = {
        transition: null
      }, T = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, D = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, V = {}, Q = null;
      function X(e) {
        Q = e;
      }
      V.setExtraStackFrame = function(e) {
        Q = e;
      }, V.getCurrentStack = null, V.getStackAddendum = function() {
        var e = "";
        Q && (e += Q);
        var r = V.getCurrentStack;
        return r && (e += r() || ""), e;
      };
      var Pe = !1, ye = !1, ce = !1, J = !1, Z = !1, U = {
        ReactCurrentDispatcher: se,
        ReactCurrentBatchConfig: x,
        ReactCurrentOwner: D
      };
      U.ReactDebugCurrentFrame = V, U.ReactCurrentActQueue = T;
      function w(e) {
        {
          for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            n[a - 1] = arguments[a];
          he("warn", e, n);
        }
      }
      function d(e) {
        {
          for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            n[a - 1] = arguments[a];
          he("error", e, n);
        }
      }
      function he(e, r, n) {
        {
          var a = U.ReactDebugCurrentFrame, o = a.getStackAddendum();
          o !== "" && (r += "%s", n = n.concat([o]));
          var s = n.map(function(i) {
            return String(i);
          });
          s.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, s);
        }
      }
      var fe = {};
      function t(e, r) {
        {
          var n = e.constructor, a = n && (n.displayName || n.name) || "ReactClass", o = a + "." + r;
          if (fe[o])
            return;
          d("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", r, a), fe[o] = !0;
        }
      }
      var u = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(e) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(e, r, n) {
          t(e, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(e, r, n, a) {
          t(e, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(e, r, n, a) {
          t(e, "setState");
        }
      }, l = Object.assign, h = {};
      Object.freeze(h);
      function v(e, r, n) {
        this.props = e, this.context = r, this.refs = h, this.updater = n || u;
      }
      v.prototype.isReactComponent = {}, v.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, r, "setState");
      }, v.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var _ = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, S = function(e, r) {
          Object.defineProperty(v.prototype, e, {
            get: function() {
              w("%s(...) is deprecated in plain JavaScript React classes. %s", r[0], r[1]);
            }
          });
        };
        for (var g in _)
          _.hasOwnProperty(g) && S(g, _[g]);
      }
      function b() {
      }
      b.prototype = v.prototype;
      function j(e, r, n) {
        this.props = e, this.context = r, this.refs = h, this.updater = n || u;
      }
      var je = j.prototype = new b();
      je.constructor = j, l(je, v.prototype), je.isPureReactComponent = !0;
      function jr() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var Ar = Array.isArray;
      function me(e) {
        return Ar(e);
      }
      function Ir(e) {
        {
          var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return n;
        }
      }
      function Dr(e) {
        try {
          return Ye(e), !1;
        } catch {
          return !0;
        }
      }
      function Ye(e) {
        return "" + e;
      }
      function _e(e) {
        if (Dr(e))
          return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ir(e)), Ye(e);
      }
      function $r(e, r, n) {
        var a = e.displayName;
        if (a)
          return a;
        var o = r.displayName || r.name || "";
        return o !== "" ? n + "(" + o + ")" : n;
      }
      function ze(e) {
        return e.displayName || "Context";
      }
      function W(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case B:
            return "Fragment";
          case L:
            return "Portal";
          case ae:
            return "Profiler";
          case ne:
            return "StrictMode";
          case H:
            return "Suspense";
          case K:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case q:
              var r = e;
              return ze(r) + ".Consumer";
            case oe:
              var n = e;
              return ze(n._context) + ".Provider";
            case M:
              return $r(e, e.render, "ForwardRef");
            case F:
              var a = e.displayName || null;
              return a !== null ? a : W(e.type) || "Memo";
            case z: {
              var o = e, s = o._payload, i = o._init;
              try {
                return W(i(s));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var le = Object.prototype.hasOwnProperty, Be = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, qe, He, Ae;
      Ae = {};
      function Ke(e) {
        if (le.call(e, "ref")) {
          var r = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function Ge(e) {
        if (le.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function Fr(e, r) {
        var n = function() {
          qe || (qe = !0, d("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
      function xr(e, r) {
        var n = function() {
          He || (He = !0, d("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
      function Lr(e) {
        if (typeof e.ref == "string" && D.current && e.__self && D.current.stateNode !== e.__self) {
          var r = W(D.current.type);
          Ae[r] || (d('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, e.ref), Ae[r] = !0);
        }
      }
      var Ie = function(e, r, n, a, o, s, i) {
        var c = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: I,
          // Built-in properties that belong on the element
          type: e,
          key: r,
          ref: n,
          props: i,
          // Record the component responsible for creating this element.
          _owner: s
        };
        return c._store = {}, Object.defineProperty(c._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(c, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: a
        }), Object.defineProperty(c, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: o
        }), Object.freeze && (Object.freeze(c.props), Object.freeze(c)), c;
      };
      function Mr(e, r, n) {
        var a, o = {}, s = null, i = null, c = null, y = null;
        if (r != null) {
          Ke(r) && (i = r.ref, Lr(r)), Ge(r) && (_e(r.key), s = "" + r.key), c = r.__self === void 0 ? null : r.__self, y = r.__source === void 0 ? null : r.__source;
          for (a in r)
            le.call(r, a) && !Be.hasOwnProperty(a) && (o[a] = r[a]);
        }
        var m = arguments.length - 2;
        if (m === 1)
          o.children = n;
        else if (m > 1) {
          for (var E = Array(m), R = 0; R < m; R++)
            E[R] = arguments[R + 2];
          Object.freeze && Object.freeze(E), o.children = E;
        }
        if (e && e.defaultProps) {
          var C = e.defaultProps;
          for (a in C)
            o[a] === void 0 && (o[a] = C[a]);
        }
        if (s || i) {
          var O = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && Fr(o, O), i && xr(o, O);
        }
        return Ie(e, s, i, c, y, D.current, o);
      }
      function Nr(e, r) {
        var n = Ie(e.type, r, e.ref, e._self, e._source, e._owner, e.props);
        return n;
      }
      function Vr(e, r, n) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var a, o = l({}, e.props), s = e.key, i = e.ref, c = e._self, y = e._source, m = e._owner;
        if (r != null) {
          Ke(r) && (i = r.ref, m = D.current), Ge(r) && (_e(r.key), s = "" + r.key);
          var E;
          e.type && e.type.defaultProps && (E = e.type.defaultProps);
          for (a in r)
            le.call(r, a) && !Be.hasOwnProperty(a) && (r[a] === void 0 && E !== void 0 ? o[a] = E[a] : o[a] = r[a]);
        }
        var R = arguments.length - 2;
        if (R === 1)
          o.children = n;
        else if (R > 1) {
          for (var C = Array(R), O = 0; O < R; O++)
            C[O] = arguments[O + 2];
          o.children = C;
        }
        return Ie(e.type, s, i, c, y, m, o);
      }
      function ee(e) {
        return typeof e == "object" && e !== null && e.$$typeof === I;
      }
      var Qe = ".", Ur = ":";
      function Wr(e) {
        var r = /[=:]/g, n = {
          "=": "=0",
          ":": "=2"
        }, a = e.replace(r, function(o) {
          return n[o];
        });
        return "$" + a;
      }
      var Xe = !1, Yr = /\/+/g;
      function Je(e) {
        return e.replace(Yr, "$&/");
      }
      function De(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (_e(e.key), Wr("" + e.key)) : r.toString(36);
      }
      function ge(e, r, n, a, o) {
        var s = typeof e;
        (s === "undefined" || s === "boolean") && (e = null);
        var i = !1;
        if (e === null)
          i = !0;
        else
          switch (s) {
            case "string":
            case "number":
              i = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case I:
                case L:
                  i = !0;
              }
          }
        if (i) {
          var c = e, y = o(c), m = a === "" ? Qe + De(c, 0) : a;
          if (me(y)) {
            var E = "";
            m != null && (E = Je(m) + "/"), ge(y, r, E, "", function(Ft) {
              return Ft;
            });
          } else y != null && (ee(y) && (y.key && (!c || c.key !== y.key) && _e(y.key), y = Nr(
            y,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            n + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (y.key && (!c || c.key !== y.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              Je("" + y.key) + "/"
            ) : "") + m
          )), r.push(y));
          return 1;
        }
        var R, C, O = 0, k = a === "" ? Qe : a + Ur;
        if (me(e))
          for (var Te = 0; Te < e.length; Te++)
            R = e[Te], C = k + De(R, Te), O += ge(R, r, n, C, o);
        else {
          var We = G(e);
          if (typeof We == "function") {
            var Cr = e;
            We === Cr.entries && (Xe || w("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Xe = !0);
            for (var Dt = We.call(Cr), wr, $t = 0; !(wr = Dt.next()).done; )
              R = wr.value, C = k + De(R, $t++), O += ge(R, r, n, C, o);
          } else if (s === "object") {
            var Sr = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (Sr === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : Sr) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return O;
      }
      function be(e, r, n) {
        if (e == null)
          return e;
        var a = [], o = 0;
        return ge(e, a, "", "", function(s) {
          return r.call(n, s, o++);
        }), a;
      }
      function zr(e) {
        var r = 0;
        return be(e, function() {
          r++;
        }), r;
      }
      function Br(e, r, n) {
        be(e, function() {
          r.apply(this, arguments);
        }, n);
      }
      function qr(e) {
        return be(e, function(r) {
          return r;
        }) || [];
      }
      function Hr(e) {
        if (!ee(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function Kr(e) {
        var r = {
          $$typeof: q,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: e,
          _currentValue2: e,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        r.Provider = {
          $$typeof: oe,
          _context: r
        };
        var n = !1, a = !1, o = !1;
        {
          var s = {
            $$typeof: q,
            _context: r
          };
          Object.defineProperties(s, {
            Provider: {
              get: function() {
                return a || (a = !0, d("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), r.Provider;
              },
              set: function(i) {
                r.Provider = i;
              }
            },
            _currentValue: {
              get: function() {
                return r._currentValue;
              },
              set: function(i) {
                r._currentValue = i;
              }
            },
            _currentValue2: {
              get: function() {
                return r._currentValue2;
              },
              set: function(i) {
                r._currentValue2 = i;
              }
            },
            _threadCount: {
              get: function() {
                return r._threadCount;
              },
              set: function(i) {
                r._threadCount = i;
              }
            },
            Consumer: {
              get: function() {
                return n || (n = !0, d("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), r.Consumer;
              }
            },
            displayName: {
              get: function() {
                return r.displayName;
              },
              set: function(i) {
                o || (w("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", i), o = !0);
              }
            }
          }), r.Consumer = s;
        }
        return r._currentRenderer = null, r._currentRenderer2 = null, r;
      }
      var pe = -1, $e = 0, Ze = 1, Gr = 2;
      function Qr(e) {
        if (e._status === pe) {
          var r = e._result, n = r();
          if (n.then(function(s) {
            if (e._status === $e || e._status === pe) {
              var i = e;
              i._status = Ze, i._result = s;
            }
          }, function(s) {
            if (e._status === $e || e._status === pe) {
              var i = e;
              i._status = Gr, i._result = s;
            }
          }), e._status === pe) {
            var a = e;
            a._status = $e, a._result = n;
          }
        }
        if (e._status === Ze) {
          var o = e._result;
          return o === void 0 && d(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, o), "default" in o || d(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, o), o.default;
        } else
          throw e._result;
      }
      function Xr(e) {
        var r = {
          // We use these fields to store the result.
          _status: pe,
          _result: e
        }, n = {
          $$typeof: z,
          _payload: r,
          _init: Qr
        };
        {
          var a, o;
          Object.defineProperties(n, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return a;
              },
              set: function(s) {
                d("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), a = s, Object.defineProperty(n, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return o;
              },
              set: function(s) {
                d("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), o = s, Object.defineProperty(n, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return n;
      }
      function Jr(e) {
        e != null && e.$$typeof === F ? d("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? d("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && d("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && d("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var r = {
          $$typeof: M,
          render: e
        };
        {
          var n;
          Object.defineProperty(r, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return n;
            },
            set: function(a) {
              n = a, !e.name && !e.displayName && (e.displayName = a);
            }
          });
        }
        return r;
      }
      var er;
      er = Symbol.for("react.module.reference");
      function rr(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === B || e === ae || Z || e === ne || e === H || e === K || J || e === N || Pe || ye || ce || typeof e == "object" && e !== null && (e.$$typeof === z || e.$$typeof === F || e.$$typeof === oe || e.$$typeof === q || e.$$typeof === M || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        e.$$typeof === er || e.getModuleId !== void 0));
      }
      function Zr(e, r) {
        rr(e) || d("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var n = {
          $$typeof: F,
          type: e,
          compare: r === void 0 ? null : r
        };
        {
          var a;
          Object.defineProperty(n, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return a;
            },
            set: function(o) {
              a = o, !e.name && !e.displayName && (e.displayName = o);
            }
          });
        }
        return n;
      }
      function A() {
        var e = se.current;
        return e === null && d(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function et(e) {
        var r = A();
        if (e._context !== void 0) {
          var n = e._context;
          n.Consumer === e ? d("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : n.Provider === e && d("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return r.useContext(e);
      }
      function rt(e) {
        var r = A();
        return r.useState(e);
      }
      function tt(e, r, n) {
        var a = A();
        return a.useReducer(e, r, n);
      }
      function nt(e) {
        var r = A();
        return r.useRef(e);
      }
      function at(e, r) {
        var n = A();
        return n.useEffect(e, r);
      }
      function ot(e, r) {
        var n = A();
        return n.useInsertionEffect(e, r);
      }
      function ut(e, r) {
        var n = A();
        return n.useLayoutEffect(e, r);
      }
      function it(e, r) {
        var n = A();
        return n.useCallback(e, r);
      }
      function st(e, r) {
        var n = A();
        return n.useMemo(e, r);
      }
      function ct(e, r, n) {
        var a = A();
        return a.useImperativeHandle(e, r, n);
      }
      function ft(e, r) {
        {
          var n = A();
          return n.useDebugValue(e, r);
        }
      }
      function lt() {
        var e = A();
        return e.useTransition();
      }
      function pt(e) {
        var r = A();
        return r.useDeferredValue(e);
      }
      function dt() {
        var e = A();
        return e.useId();
      }
      function vt(e, r, n) {
        var a = A();
        return a.useSyncExternalStore(e, r, n);
      }
      var de = 0, tr, nr, ar, or, ur, ir, sr;
      function cr() {
      }
      cr.__reactDisabledLog = !0;
      function yt() {
        {
          if (de === 0) {
            tr = console.log, nr = console.info, ar = console.warn, or = console.error, ur = console.group, ir = console.groupCollapsed, sr = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: cr,
              writable: !0
            };
            Object.defineProperties(console, {
              info: e,
              log: e,
              warn: e,
              error: e,
              group: e,
              groupCollapsed: e,
              groupEnd: e
            });
          }
          de++;
        }
      }
      function ht() {
        {
          if (de--, de === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: l({}, e, {
                value: tr
              }),
              info: l({}, e, {
                value: nr
              }),
              warn: l({}, e, {
                value: ar
              }),
              error: l({}, e, {
                value: or
              }),
              group: l({}, e, {
                value: ur
              }),
              groupCollapsed: l({}, e, {
                value: ir
              }),
              groupEnd: l({}, e, {
                value: sr
              })
            });
          }
          de < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Fe = U.ReactCurrentDispatcher, xe;
      function Ee(e, r, n) {
        {
          if (xe === void 0)
            try {
              throw Error();
            } catch (o) {
              var a = o.stack.trim().match(/\n( *(at )?)/);
              xe = a && a[1] || "";
            }
          return `
` + xe + e;
        }
      }
      var Le = !1, Re;
      {
        var mt = typeof WeakMap == "function" ? WeakMap : Map;
        Re = new mt();
      }
      function fr(e, r) {
        if (!e || Le)
          return "";
        {
          var n = Re.get(e);
          if (n !== void 0)
            return n;
        }
        var a;
        Le = !0;
        var o = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var s;
        s = Fe.current, Fe.current = null, yt();
        try {
          if (r) {
            var i = function() {
              throw Error();
            };
            if (Object.defineProperty(i.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(i, []);
              } catch (k) {
                a = k;
              }
              Reflect.construct(e, [], i);
            } else {
              try {
                i.call();
              } catch (k) {
                a = k;
              }
              e.call(i.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (k) {
              a = k;
            }
            e();
          }
        } catch (k) {
          if (k && a && typeof k.stack == "string") {
            for (var c = k.stack.split(`
`), y = a.stack.split(`
`), m = c.length - 1, E = y.length - 1; m >= 1 && E >= 0 && c[m] !== y[E]; )
              E--;
            for (; m >= 1 && E >= 0; m--, E--)
              if (c[m] !== y[E]) {
                if (m !== 1 || E !== 1)
                  do
                    if (m--, E--, E < 0 || c[m] !== y[E]) {
                      var R = `
` + c[m].replace(" at new ", " at ");
                      return e.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", e.displayName)), typeof e == "function" && Re.set(e, R), R;
                    }
                  while (m >= 1 && E >= 0);
                break;
              }
          }
        } finally {
          Le = !1, Fe.current = s, ht(), Error.prepareStackTrace = o;
        }
        var C = e ? e.displayName || e.name : "", O = C ? Ee(C) : "";
        return typeof e == "function" && Re.set(e, O), O;
      }
      function _t(e, r, n) {
        return fr(e, !1);
      }
      function gt(e) {
        var r = e.prototype;
        return !!(r && r.isReactComponent);
      }
      function Ce(e, r, n) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return fr(e, gt(e));
        if (typeof e == "string")
          return Ee(e);
        switch (e) {
          case H:
            return Ee("Suspense");
          case K:
            return Ee("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case M:
              return _t(e.render);
            case F:
              return Ce(e.type, r, n);
            case z: {
              var a = e, o = a._payload, s = a._init;
              try {
                return Ce(s(o), r, n);
              } catch {
              }
            }
          }
        return "";
      }
      var lr = {}, pr = U.ReactDebugCurrentFrame;
      function we(e) {
        if (e) {
          var r = e._owner, n = Ce(e.type, e._source, r ? r.type : null);
          pr.setExtraStackFrame(n);
        } else
          pr.setExtraStackFrame(null);
      }
      function bt(e, r, n, a, o) {
        {
          var s = Function.call.bind(le);
          for (var i in e)
            if (s(e, i)) {
              var c = void 0;
              try {
                if (typeof e[i] != "function") {
                  var y = Error((a || "React class") + ": " + n + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw y.name = "Invariant Violation", y;
                }
                c = e[i](r, i, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (m) {
                c = m;
              }
              c && !(c instanceof Error) && (we(o), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, i, typeof c), we(null)), c instanceof Error && !(c.message in lr) && (lr[c.message] = !0, we(o), d("Failed %s type: %s", n, c.message), we(null));
            }
        }
      }
      function re(e) {
        if (e) {
          var r = e._owner, n = Ce(e.type, e._source, r ? r.type : null);
          X(n);
        } else
          X(null);
      }
      var Me;
      Me = !1;
      function dr() {
        if (D.current) {
          var e = W(D.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function Et(e) {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), n = e.lineNumber;
          return `

Check your code at ` + r + ":" + n + ".";
        }
        return "";
      }
      function Rt(e) {
        return e != null ? Et(e.__source) : "";
      }
      var vr = {};
      function Ct(e) {
        var r = dr();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
      function yr(e, r) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var n = Ct(r);
          if (!vr[n]) {
            vr[n] = !0;
            var a = "";
            e && e._owner && e._owner !== D.current && (a = " It was passed a child from " + W(e._owner.type) + "."), re(e), d('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, a), re(null);
          }
        }
      }
      function hr(e, r) {
        if (typeof e == "object") {
          if (me(e))
            for (var n = 0; n < e.length; n++) {
              var a = e[n];
              ee(a) && yr(a, r);
            }
          else if (ee(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var o = G(e);
            if (typeof o == "function" && o !== e.entries)
              for (var s = o.call(e), i; !(i = s.next()).done; )
                ee(i.value) && yr(i.value, r);
          }
        }
      }
      function mr(e) {
        {
          var r = e.type;
          if (r == null || typeof r == "string")
            return;
          var n;
          if (typeof r == "function")
            n = r.propTypes;
          else if (typeof r == "object" && (r.$$typeof === M || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          r.$$typeof === F))
            n = r.propTypes;
          else
            return;
          if (n) {
            var a = W(r);
            bt(n, e.props, "prop", a, e);
          } else if (r.PropTypes !== void 0 && !Me) {
            Me = !0;
            var o = W(r);
            d("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
          }
          typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && d("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function wt(e) {
        {
          for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
            var a = r[n];
            if (a !== "children" && a !== "key") {
              re(e), d("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), re(null);
              break;
            }
          }
          e.ref !== null && (re(e), d("Invalid attribute `ref` supplied to `React.Fragment`."), re(null));
        }
      }
      function _r(e, r, n) {
        var a = rr(e);
        if (!a) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var s = Rt(r);
          s ? o += s : o += dr();
          var i;
          e === null ? i = "null" : me(e) ? i = "array" : e !== void 0 && e.$$typeof === I ? (i = "<" + (W(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : i = typeof e, d("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", i, o);
        }
        var c = Mr.apply(this, arguments);
        if (c == null)
          return c;
        if (a)
          for (var y = 2; y < arguments.length; y++)
            hr(arguments[y], e);
        return e === B ? wt(c) : mr(c), c;
      }
      var gr = !1;
      function St(e) {
        var r = _r.bind(null, e);
        return r.type = e, gr || (gr = !0, w("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(r, "type", {
          enumerable: !1,
          get: function() {
            return w("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), r;
      }
      function Ot(e, r, n) {
        for (var a = Vr.apply(this, arguments), o = 2; o < arguments.length; o++)
          hr(arguments[o], a.type);
        return mr(a), a;
      }
      function Tt(e, r) {
        var n = x.transition;
        x.transition = {};
        var a = x.transition;
        x.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (x.transition = n, n === null && a._updatedFibers) {
            var o = a._updatedFibers.size;
            o > 10 && w("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), a._updatedFibers.clear();
          }
        }
      }
      var br = !1, Se = null;
      function kt(e) {
        if (Se === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7), n = P && P[r];
            Se = n.call(P, "timers").setImmediate;
          } catch {
            Se = function(o) {
              br === !1 && (br = !0, typeof MessageChannel > "u" && d("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var s = new MessageChannel();
              s.port1.onmessage = o, s.port2.postMessage(void 0);
            };
          }
        return Se(e);
      }
      var te = 0, Er = !1;
      function Rr(e) {
        {
          var r = te;
          te++, T.current === null && (T.current = []);
          var n = T.isBatchingLegacy, a;
          try {
            if (T.isBatchingLegacy = !0, a = e(), !n && T.didScheduleLegacyUpdate) {
              var o = T.current;
              o !== null && (T.didScheduleLegacyUpdate = !1, Ue(o));
            }
          } catch (C) {
            throw Oe(r), C;
          } finally {
            T.isBatchingLegacy = n;
          }
          if (a !== null && typeof a == "object" && typeof a.then == "function") {
            var s = a, i = !1, c = {
              then: function(C, O) {
                i = !0, s.then(function(k) {
                  Oe(r), te === 0 ? Ne(k, C, O) : C(k);
                }, function(k) {
                  Oe(r), O(k);
                });
              }
            };
            return !Er && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              i || (Er = !0, d("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), c;
          } else {
            var y = a;
            if (Oe(r), te === 0) {
              var m = T.current;
              m !== null && (Ue(m), T.current = null);
              var E = {
                then: function(C, O) {
                  T.current === null ? (T.current = [], Ne(y, C, O)) : C(y);
                }
              };
              return E;
            } else {
              var R = {
                then: function(C, O) {
                  C(y);
                }
              };
              return R;
            }
          }
        }
      }
      function Oe(e) {
        e !== te - 1 && d("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), te = e;
      }
      function Ne(e, r, n) {
        {
          var a = T.current;
          if (a !== null)
            try {
              Ue(a), kt(function() {
                a.length === 0 ? (T.current = null, r(e)) : Ne(e, r, n);
              });
            } catch (o) {
              n(o);
            }
          else
            r(e);
        }
      }
      var Ve = !1;
      function Ue(e) {
        if (!Ve) {
          Ve = !0;
          var r = 0;
          try {
            for (; r < e.length; r++) {
              var n = e[r];
              do
                n = n(!0);
              while (n !== null);
            }
            e.length = 0;
          } catch (a) {
            throw e = e.slice(r + 1), a;
          } finally {
            Ve = !1;
          }
        }
      }
      var Pt = _r, jt = Ot, At = St, It = {
        map: be,
        forEach: Br,
        count: zr,
        toArray: qr,
        only: Hr
      };
      f.Children = It, f.Component = v, f.Fragment = B, f.Profiler = ae, f.PureComponent = j, f.StrictMode = ne, f.Suspense = H, f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = U, f.act = Rr, f.cloneElement = jt, f.createContext = Kr, f.createElement = Pt, f.createFactory = At, f.createRef = jr, f.forwardRef = Jr, f.isValidElement = ee, f.lazy = Xr, f.memo = Zr, f.startTransition = Tt, f.unstable_act = Rr, f.useCallback = it, f.useContext = et, f.useDebugValue = ft, f.useDeferredValue = pt, f.useEffect = at, f.useId = dt, f.useImperativeHandle = ct, f.useInsertionEffect = ot, f.useLayoutEffect = ut, f.useMemo = st, f.useReducer = tt, f.useRef = nt, f.useState = rt, f.useSyncExternalStore = vt, f.useTransition = lt, f.version = $, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(ve, ve.exports)), ve.exports;
}
var kr;
function Vt() {
  if (kr) return ke.exports;
  kr = 1;
  var P = {};
  return P.NODE_ENV === "production" ? ke.exports = Mt() : ke.exports = Nt(), ke.exports;
}
var Pr = Vt();
const Ut = /* @__PURE__ */ xt(Pr), Yt = /* @__PURE__ */ Lt({
  __proto__: null,
  default: Ut
}, [Pr]);
export {
  Vt as a,
  Yt as b,
  Ut as e,
  Pr as r
};
