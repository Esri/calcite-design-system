import { g as OT, c as MT } from "./_commonjsHelpers.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
var Ju = { exports: {} };
/*! axe v4.10.3
 * Copyright (c) 2015 - 2025 Deque Systems, Inc.
 *
 * Your use of this Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This entire copyright notice must appear in every copy of this file you
 * distribute or in any file that contains substantial portions of this source
 * code.
 */
Ju.exports;
(function(mi) {
  (function Qu(E) {
    var jt = E, L = E.document, x = x || {};
    x.version = "4.10.3", O(mi) === "object" && mi.exports && typeof Qu.toString == "function" && (x.source = "(" + Qu.toString() + ')(typeof window === "object" ? window : this);', mi.exports = x), typeof E.getComputedStyle == "function" && (E.axe = x);
    function Jr(C) {
      this.name = "SupportError", this.cause = C.cause, this.message = "`".concat(C.cause, "` - feature unsupported in your environment."), C.ruleId && (this.ruleId = C.ruleId, this.message += " Skipping ".concat(this.ruleId, " rule.")), this.stack = new Error().stack;
    }
    Jr.prototype = Object.create(Error.prototype), Jr.prototype.constructor = Jr;
    var xp = ["node"], Ep = ["relatedNodes"], Ap = ["node"], Cp = ["variant"], Fp = ["matches"], Tp = ["chromium"], Rp = ["noImplicit"], Sp = ["noPresentational"], kp = ["precision", "format", "inGamut"], Op = ["space"], Mp = ["algorithm"], Ip = ["method"], Pp = ["maxDeltaE", "deltaEMethod", "steps", "maxSteps"], Np = ["node"], Lp = ["environmentData"], Bp = ["environmentData"], qp = ["environmentData"], jp = ["environmentData"], zp = ["environmentData"];
    function Vp(C) {
      return ns(C) || rs(C) || Va(C) || as();
    }
    function Hp(C, k, j) {
      return (k = os(k)) in C ? Object.defineProperty(C, k, {
        value: j,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : C[k] = j, C;
    }
    function $p(C, k, j) {
      if (vi())
        return Reflect.construct.apply(null, arguments);
      var J = [null];
      J.push.apply(J, k);
      var Te = new (C.bind.apply(C, J))();
      return Te;
    }
    function hi(C, k, j) {
      return k = za(k), Up(C, vi() ? Reflect.construct(k, j || [], za(C).constructor) : k.apply(C, j));
    }
    function Up(C, k) {
      if (k && (O(k) == "object" || typeof k == "function"))
        return k;
      if (k !== void 0)
        throw new TypeError("Derived constructors may only return object or undefined");
      return Gp(C);
    }
    function Gp(C) {
      if (C === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return C;
    }
    function vi() {
      try {
        var C = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch {
      }
      return (vi = function() {
        return !!C;
      })();
    }
    function za(C) {
      return za = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(k) {
        return k.__proto__ || Object.getPrototypeOf(k);
      }, za(C);
    }
    function gi(C, k) {
      if (typeof k != "function" && k !== null)
        throw new TypeError("Super expression must either be null or a function");
      C.prototype = Object.create(k && k.prototype, {
        constructor: {
          value: C,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(C, "prototype", {
        writable: !1
      }), k && bi(C, k);
    }
    function bi(C, k) {
      return bi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(j, J) {
        return j.__proto__ = J, j;
      }, bi(C, k);
    }
    function Xt(C, k, j) {
      ts(C, k), k.set(C, j);
    }
    function es(C, k) {
      ts(C, k), k.add(C);
    }
    function ts(C, k) {
      if (k.has(C))
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
    function wt(C, k) {
      return C.get(Tr(C, k));
    }
    function at(C, k, j) {
      return C.set(Tr(C, k), j), j;
    }
    function Tr(C, k, j) {
      if (typeof C == "function" ? C === k : C.has(k))
        return arguments.length < 3 ? k : j;
      throw new TypeError("Private element is not present on this object");
    }
    function qe(C, k) {
      if (C == null)
        return {};
      var j, J, Te = Wp(C, k);
      if (Object.getOwnPropertySymbols) {
        var Pe = Object.getOwnPropertySymbols(C);
        for (J = 0; J < Pe.length; J++)
          j = Pe[J], k.includes(j) || {}.propertyIsEnumerable.call(C, j) && (Te[j] = C[j]);
      }
      return Te;
    }
    function Wp(C, k) {
      if (C == null)
        return {};
      var j = {};
      for (var J in C)
        if ({}.hasOwnProperty.call(C, J)) {
          if (k.includes(J))
            continue;
          j[J] = C[J];
        }
      return j;
    }
    function ne(C) {
      return Kp(C) || rs(C) || Va(C) || Yp();
    }
    function Yp() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function rs(C) {
      if (typeof Symbol < "u" && C[Symbol.iterator] != null || C["@@iterator"] != null)
        return Array.from(C);
    }
    function Kp(C) {
      if (Array.isArray(C))
        return yi(C);
    }
    function de() {
      return de = Object.assign ? Object.assign.bind() : function(C) {
        for (var k = 1; k < arguments.length; k++) {
          var j = arguments[k];
          for (var J in j)
            ({}).hasOwnProperty.call(j, J) && (C[J] = j[J]);
        }
        return C;
      }, de.apply(null, arguments);
    }
    function $(C, k) {
      return ns(C) || Xp(C, k) || Va(C, k) || as();
    }
    function as() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function Xp(C, k) {
      var j = C == null ? null : typeof Symbol < "u" && C[Symbol.iterator] || C["@@iterator"];
      if (j != null) {
        var J, Te, Pe, Ke, pt = [], He = !0, tt = !1;
        try {
          if (Pe = (j = j.call(C)).next, k === 0) {
            if (Object(j) !== j)
              return;
            He = !1;
          } else
            for (; !(He = (J = Pe.call(j)).done) && (pt.push(J.value), pt.length !== k); He = !0)
              ;
        } catch (Qr) {
          tt = !0, Te = Qr;
        } finally {
          try {
            if (!He && j.return != null && (Ke = j.return(), Object(Ke) !== Ke))
              return;
          } finally {
            if (tt)
              throw Te;
          }
        }
        return pt;
      }
    }
    function ns(C) {
      if (Array.isArray(C))
        return C;
    }
    function Tt(C, k) {
      if (!(C instanceof k))
        throw new TypeError("Cannot call a class as a function");
    }
    function is(C, k) {
      for (var j = 0; j < k.length; j++) {
        var J = k[j];
        J.enumerable = J.enumerable || !1, J.configurable = !0, "value" in J && (J.writable = !0), Object.defineProperty(C, os(J.key), J);
      }
    }
    function Rt(C, k, j) {
      return k && is(C.prototype, k), j && is(C, j), Object.defineProperty(C, "prototype", {
        writable: !1
      }), C;
    }
    function os(C) {
      var k = Zp(C, "string");
      return O(k) == "symbol" ? k : k + "";
    }
    function Zp(C, k) {
      if (O(C) != "object" || !C)
        return C;
      var j = C[Symbol.toPrimitive];
      if (j !== void 0) {
        var J = j.call(C, k);
        if (O(J) != "object")
          return J;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (k === "string" ? String : Number)(C);
    }
    function Ce(C, k) {
      var j = typeof Symbol < "u" && C[Symbol.iterator] || C["@@iterator"];
      if (!j) {
        if (Array.isArray(C) || (j = Va(C)) || k) {
          j && (C = j);
          var J = 0, Te = function() {
          };
          return {
            s: Te,
            n: function() {
              return J >= C.length ? {
                done: !0
              } : {
                done: !1,
                value: C[J++]
              };
            },
            e: function(tt) {
              throw tt;
            },
            f: Te
          };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var Pe, Ke = !0, pt = !1;
      return {
        s: function() {
          j = j.call(C);
        },
        n: function() {
          var tt = j.next();
          return Ke = tt.done, tt;
        },
        e: function(tt) {
          pt = !0, Pe = tt;
        },
        f: function() {
          try {
            Ke || j.return == null || j.return();
          } finally {
            if (pt)
              throw Pe;
          }
        }
      };
    }
    function Va(C, k) {
      if (C) {
        if (typeof C == "string")
          return yi(C, k);
        var j = {}.toString.call(C).slice(8, -1);
        return j === "Object" && C.constructor && (j = C.constructor.name), j === "Map" || j === "Set" ? Array.from(C) : j === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(j) ? yi(C, k) : void 0;
      }
    }
    function yi(C, k) {
      (k == null || k > C.length) && (k = C.length);
      for (var j = 0, J = Array(k); j < k; j++)
        J[j] = C[j];
      return J;
    }
    function O(C) {
      "@babel/helpers - typeof";
      return O = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(k) {
        return typeof k;
      } : function(k) {
        return k && typeof Symbol == "function" && k.constructor === Symbol && k !== Symbol.prototype ? "symbol" : typeof k;
      }, O(C);
    }
    (function(C, k, j, J, Te, Pe, Ke, pt, He, tt, Qr) {
      var Jp = Object.create, ea = Object.defineProperty, Qp = Object.getPrototypeOf, em = Object.prototype.hasOwnProperty, tm = Object.getOwnPropertyNames, rm = Object.getOwnPropertyDescriptor, am = function(t, r, a) {
        return r in t ? ea(t, r, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: a
        }) : t[r] = a;
      }, nm = function(t) {
        return ea(t, "__esModule", {
          value: !0
        });
      }, y = function(t, r) {
        return function() {
          return r || t((r = {
            exports: {}
          }).exports, r), r.exports;
        };
      }, Dt = function(t, r) {
        for (var a in r)
          ea(t, a, {
            get: r[a],
            enumerable: !0
          });
      }, im = function(t, r, a) {
        if (r && O(r) === "object" || typeof r == "function") {
          var n = Ce(tm(r)), i;
          try {
            var o = function() {
              var s = i.value;
              !em.call(t, s) && s !== "default" && ea(t, s, {
                get: function() {
                  return r[s];
                },
                enumerable: !(a = rm(r, s)) || a.enumerable
              });
            };
            for (n.s(); !(i = n.n()).done; )
              o();
          } catch (u) {
            n.e(u);
          } finally {
            n.f();
          }
        }
        return t;
      }, ot = function(t) {
        return im(nm(ea(t != null ? Jp(Qp(t)) : {}, "default", t && t.__esModule && "default" in t ? {
          get: function() {
            return t.default;
          },
          enumerable: !0
        } : {
          value: t,
          enumerable: !0
        })), t);
      }, us = function(t, r, a) {
        return am(t, O(r) !== "symbol" ? r + "" : r, a), a;
      }, om = y(function(e, t) {
        t.exports = function() {
        };
      }), cr = y(function(e, t) {
        var r = om()();
        t.exports = function(a) {
          return a !== r && a !== null;
        };
      }), ss = y(function(e, t) {
        var r = cr(), a = Array.prototype.forEach, n = Object.create, i = function(u, s) {
          var l;
          for (l in u)
            s[l] = u[l];
        };
        t.exports = function(o) {
          var u = n(null);
          return a.call(arguments, function(s) {
            r(s) && i(Object(s), u);
          }), u;
        };
      }), um = y(function(e, t) {
        t.exports = function() {
          var r = Math.sign;
          return typeof r != "function" ? !1 : r(10) === 1 && r(-20) === -1;
        };
      }), sm = y(function(e, t) {
        t.exports = function(r) {
          return r = Number(r), isNaN(r) || r === 0 ? r : r > 0 ? 1 : -1;
        };
      }), lm = y(function(e, t) {
        t.exports = um()() ? Math.sign : sm();
      }), cm = y(function(e, t) {
        var r = lm(), a = Math.abs, n = Math.floor;
        t.exports = function(i) {
          return isNaN(i) ? 0 : (i = Number(i), i === 0 || !isFinite(i) ? i : r(i) * n(a(i)));
        };
      }), dr = y(function(e, t) {
        var r = cm(), a = Math.max;
        t.exports = function(n) {
          return a(0, r(n));
        };
      }), ls = y(function(e, t) {
        var r = dr();
        t.exports = function(a, n, i) {
          var o;
          return isNaN(a) ? (o = n, o >= 0 ? i && o ? o - 1 : o : 1) : a === !1 ? !1 : r(a);
        };
      }), Zt = y(function(e, t) {
        t.exports = function(r) {
          if (typeof r != "function")
            throw new TypeError(r + " is not a function");
          return r;
        };
      }), Rr = y(function(e, t) {
        var r = cr();
        t.exports = function(a) {
          if (!r(a))
            throw new TypeError("Cannot use null or undefined");
          return a;
        };
      }), dm = y(function(e, t) {
        var r = Zt(), a = Rr(), n = Function.prototype.bind, i = Function.prototype.call, o = Object.keys, u = Object.prototype.propertyIsEnumerable;
        t.exports = function(s, l) {
          return function(c, d) {
            var f, p = arguments[2], m = arguments[3];
            return c = Object(a(c)), r(d), f = o(c), m && f.sort(typeof m == "function" ? n.call(m, c) : void 0), typeof s != "function" && (s = f[s]), i.call(s, f, function(h, v) {
              return u.call(c, h) ? i.call(d, p, c[h], h, c, v) : l;
            });
          };
        };
      }), Ha = y(function(e, t) {
        t.exports = dm()("forEach");
      }), fr = y(function() {
      }), fm = y(function(e, t) {
        t.exports = function() {
          var r = Object.assign, a;
          return typeof r != "function" ? !1 : (a = {
            foo: "raz"
          }, r(a, {
            bar: "dwa"
          }, {
            trzy: "trzy"
          }), a.foo + a.bar + a.trzy === "razdwatrzy");
        };
      }), pm = y(function(e, t) {
        t.exports = function() {
          try {
            return Object.keys("primitive"), !0;
          } catch {
            return !1;
          }
        };
      }), mm = y(function(e, t) {
        var r = cr(), a = Object.keys;
        t.exports = function(n) {
          return a(r(n) ? Object(n) : n);
        };
      }), hm = y(function(e, t) {
        t.exports = pm()() ? Object.keys : mm();
      }), vm = y(function(e, t) {
        var r = hm(), a = Rr(), n = Math.max;
        t.exports = function(i, o) {
          var u, s, l = n(arguments.length, 2), c;
          for (i = Object(a(i)), c = function(f) {
            try {
              i[f] = o[f];
            } catch (p) {
              u || (u = p);
            }
          }, s = 1; s < l; ++s)
            o = arguments[s], r(o).forEach(c);
          if (u !== void 0)
            throw u;
          return i;
        };
      }), cs = y(function(e, t) {
        t.exports = fm()() ? Object.assign : vm();
      }), gm = y(function(e, t) {
        var r = cr(), a = {
          function: !0,
          object: !0
        };
        t.exports = function(n) {
          return r(n) && a[O(n)] || !1;
        };
      }), bm = y(function(e, t) {
        var r = cs(), a = gm(), n = cr(), i = Error.captureStackTrace;
        t.exports = function(o) {
          var u = new Error(o), s = arguments[1], l = arguments[2];
          return n(l) || a(s) && (l = s, s = null), n(l) && r(u, l), n(s) && (u.code = s), i && i(u, t.exports), u;
        };
      }), ds = y(function(e, t) {
        var r = Rr(), a = Object.defineProperty, n = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, o = Object.getOwnPropertySymbols;
        t.exports = function(u, s) {
          var l, c = Object(r(s));
          if (u = Object(r(u)), i(c).forEach(function(d) {
            try {
              a(u, d, n(s, d));
            } catch (f) {
              l = f;
            }
          }), typeof o == "function" && o(c).forEach(function(d) {
            try {
              a(u, d, n(s, d));
            } catch (f) {
              l = f;
            }
          }), l !== void 0)
            throw l;
          return u;
        };
      }), fs = y(function(e, t) {
        var r = dr(), a = function(l, c) {
          return c;
        }, n, i, o, u;
        try {
          Object.defineProperty(a, "length", {
            configurable: !0,
            writable: !1,
            enumerable: !1,
            value: 1
          });
        } catch {
        }
        a.length === 1 ? (n = {
          configurable: !0,
          writable: !1,
          enumerable: !1
        }, i = Object.defineProperty, t.exports = function(s, l) {
          return l = r(l), s.length === l ? s : (n.value = l, i(s, "length", n));
        }) : (u = ds(), o = /* @__PURE__ */ function() {
          var s = [];
          return function(l) {
            var c, d = 0;
            if (s[l])
              return s[l];
            for (c = []; l--; )
              c.push("a" + (++d).toString(36));
            return new Function("fn", "return function (" + c.join(", ") + ") { return fn.apply(this, arguments); };");
          };
        }(), t.exports = function(s, l) {
          var c;
          if (l = r(l), s.length === l)
            return s;
          c = o(l)(s);
          try {
            u(c, s);
          } catch {
          }
          return c;
        });
      }), ps = y(function(e, t) {
        var r = void 0;
        t.exports = function(a) {
          return a !== r && a !== null;
        };
      }), ym = y(function(e, t) {
        var r = ps(), a = {
          object: !0,
          function: !0,
          undefined: !0
        };
        t.exports = function(n) {
          return r(n) ? hasOwnProperty.call(a, O(n)) : !1;
        };
      }), wm = y(function(e, t) {
        var r = ym();
        t.exports = function(a) {
          if (!r(a))
            return !1;
          try {
            return a.constructor ? a.constructor.prototype === a : !1;
          } catch {
            return !1;
          }
        };
      }), Dm = y(function(e, t) {
        var r = wm();
        t.exports = function(a) {
          if (typeof a != "function" || !hasOwnProperty.call(a, "length"))
            return !1;
          try {
            if (typeof a.length != "number" || typeof a.call != "function" || typeof a.apply != "function")
              return !1;
          } catch {
            return !1;
          }
          return !r(a);
        };
      }), _m = y(function(e, t) {
        var r = Dm(), a = /^\s*class[\s{/}]/, n = Function.prototype.toString;
        t.exports = function(i) {
          return !(!r(i) || a.test(n.call(i)));
        };
      }), xm = y(function(e, t) {
        var r = "razdwatrzy";
        t.exports = function() {
          return typeof r.contains != "function" ? !1 : r.contains("dwa") === !0 && r.contains("foo") === !1;
        };
      }), Em = y(function(e, t) {
        var r = String.prototype.indexOf;
        t.exports = function(a) {
          return r.call(this, a, arguments[1]) > -1;
        };
      }), Am = y(function(e, t) {
        t.exports = xm()() ? String.prototype.contains : Em();
      }), pr = y(function(e, t) {
        var r = ps(), a = _m(), n = cs(), i = ss(), o = Am(), u = t.exports = function(s, l) {
          var c, d, f, p, m;
          return arguments.length < 2 || typeof s != "string" ? (p = l, l = s, s = null) : p = arguments[2], r(s) ? (c = o.call(s, "c"), d = o.call(s, "e"), f = o.call(s, "w")) : (c = f = !0, d = !1), m = {
            value: l,
            configurable: c,
            enumerable: d,
            writable: f
          }, p ? n(i(p), m) : m;
        };
        u.gs = function(s, l, c) {
          var d, f, p, m;
          return typeof s != "string" ? (p = c, c = l, l = s, s = null) : p = arguments[3], r(l) ? a(l) ? r(c) ? a(c) || (p = c, c = void 0) : c = void 0 : (p = l, l = c = void 0) : l = void 0, r(s) ? (d = o.call(s, "c"), f = o.call(s, "e")) : (d = !0, f = !1), m = {
            get: l,
            set: c,
            configurable: d,
            enumerable: f
          }, p ? n(i(p), m) : m;
        };
      }), Cm = y(function(e, t) {
        var r = pr(), a = Zt(), n = Function.prototype.apply, i = Function.prototype.call, o = Object.create, u = Object.defineProperty, s = Object.defineProperties, l = Object.prototype.hasOwnProperty, c = {
          configurable: !0,
          enumerable: !1,
          writable: !0
        }, d, f, p, m, h, v, g;
        d = function(D, w) {
          var _;
          return a(w), l.call(this, "__ee__") ? _ = this.__ee__ : (_ = c.value = o(null), u(this, "__ee__", c), c.value = null), _[D] ? O(_[D]) === "object" ? _[D].push(w) : _[D] = [_[D], w] : _[D] = w, this;
        }, f = function(D, w) {
          var _, F;
          return a(w), F = this, d.call(this, D, _ = function() {
            p.call(F, D, _), n.call(w, this, arguments);
          }), _.__eeOnceListener__ = w, this;
        }, p = function(D, w) {
          var _, F, R, I;
          if (a(w), !l.call(this, "__ee__"))
            return this;
          if (_ = this.__ee__, !_[D])
            return this;
          if (F = _[D], O(F) === "object")
            for (I = 0; R = F[I]; ++I)
              (R === w || R.__eeOnceListener__ === w) && (F.length === 2 ? _[D] = F[I ? 0 : 1] : F.splice(I, 1));
          else
            (F === w || F.__eeOnceListener__ === w) && delete _[D];
          return this;
        }, m = function(D) {
          var w, _, F, R, I;
          if (l.call(this, "__ee__") && (R = this.__ee__[D], !!R))
            if (O(R) === "object") {
              for (_ = arguments.length, I = new Array(_ - 1), w = 1; w < _; ++w)
                I[w - 1] = arguments[w];
              for (R = R.slice(), w = 0; F = R[w]; ++w)
                n.call(F, this, I);
            } else
              switch (arguments.length) {
                case 1:
                  i.call(R, this);
                  break;
                case 2:
                  i.call(R, this, arguments[1]);
                  break;
                case 3:
                  i.call(R, this, arguments[1], arguments[2]);
                  break;
                default:
                  for (_ = arguments.length, I = new Array(_ - 1), w = 1; w < _; ++w)
                    I[w - 1] = arguments[w];
                  n.call(R, this, I);
              }
        }, h = {
          on: d,
          once: f,
          off: p,
          emit: m
        }, v = {
          on: r(d),
          once: r(f),
          off: r(p),
          emit: r(m)
        }, g = s({}, v), t.exports = e = function(D) {
          return D == null ? o(g) : s(Object(D), v);
        }, e.methods = h;
      }), Fm = y(function(e, t) {
        t.exports = function() {
          var r = Array.from, a, n;
          return typeof r != "function" ? !1 : (a = ["raz", "dwa"], n = r(a), !!(n && n !== a && n[1] === "dwa"));
        };
      }), Tm = y(function(e, t) {
        t.exports = function() {
          return (typeof globalThis > "u" ? "undefined" : O(globalThis)) !== "object" || !globalThis ? !1 : globalThis.Array === Array;
        };
      }), Rm = y(function(e, t) {
        var r = function() {
          if ((typeof self > "u" ? "undefined" : O(self)) === "object" && self)
            return self;
          if ((typeof E > "u" ? "undefined" : O(E)) === "object" && E)
            return E;
          throw new Error("Unable to resolve global `this`");
        };
        t.exports = function() {
          if (this)
            return this;
          try {
            Object.defineProperty(Object.prototype, "__global__", {
              get: function() {
                return this;
              },
              configurable: !0
            });
          } catch {
            return r();
          }
          try {
            return __global__ || r();
          } finally {
            delete Object.prototype.__global__;
          }
        }();
      }), $a = y(function(e, t) {
        t.exports = Tm()() ? globalThis : Rm();
      }), Sm = y(function(e, t) {
        var r = $a(), a = {
          object: !0,
          symbol: !0
        };
        t.exports = function() {
          var n = r.Symbol, i;
          if (typeof n != "function")
            return !1;
          i = n("test symbol");
          try {
            String(i);
          } catch {
            return !1;
          }
          return !(!a[O(n.iterator)] || !a[O(n.toPrimitive)] || !a[O(n.toStringTag)]);
        };
      }), km = y(function(e, t) {
        t.exports = function(r) {
          return r ? O(r) === "symbol" ? !0 : !r.constructor || r.constructor.name !== "Symbol" ? !1 : r[r.constructor.toStringTag] === "Symbol" : !1;
        };
      }), ms = y(function(e, t) {
        var r = km();
        t.exports = function(a) {
          if (!r(a))
            throw new TypeError(a + " is not a symbol");
          return a;
        };
      }), Om = y(function(e, t) {
        var r = pr(), a = Object.create, n = Object.defineProperty, i = Object.prototype, o = a(null);
        t.exports = function(u) {
          for (var s = 0, l, c; o[u + (s || "")]; )
            ++s;
          return u += s || "", o[u] = !0, l = "@@" + u, n(i, l, r.gs(null, function(d) {
            c || (c = !0, n(this, l, r(d)), c = !1);
          })), l;
        };
      }), Mm = y(function(e, t) {
        var r = pr(), a = $a().Symbol;
        t.exports = function(n) {
          return Object.defineProperties(n, {
            hasInstance: r("", a && a.hasInstance || n("hasInstance")),
            isConcatSpreadable: r("", a && a.isConcatSpreadable || n("isConcatSpreadable")),
            iterator: r("", a && a.iterator || n("iterator")),
            match: r("", a && a.match || n("match")),
            replace: r("", a && a.replace || n("replace")),
            search: r("", a && a.search || n("search")),
            species: r("", a && a.species || n("species")),
            split: r("", a && a.split || n("split")),
            toPrimitive: r("", a && a.toPrimitive || n("toPrimitive")),
            toStringTag: r("", a && a.toStringTag || n("toStringTag")),
            unscopables: r("", a && a.unscopables || n("unscopables"))
          });
        };
      }), Im = y(function(e, t) {
        var r = pr(), a = ms(), n = /* @__PURE__ */ Object.create(null);
        t.exports = function(i) {
          return Object.defineProperties(i, {
            for: r(function(o) {
              return n[o] ? n[o] : n[o] = i(String(o));
            }),
            keyFor: r(function(o) {
              var u;
              a(o);
              for (u in n)
                if (n[u] === o)
                  return u;
            })
          });
        };
      }), Pm = y(function(e, t) {
        var r = pr(), a = ms(), n = $a().Symbol, i = Om(), o = Mm(), u = Im(), s = Object.create, l = Object.defineProperties, c = Object.defineProperty, d, f, p;
        if (typeof n == "function")
          try {
            String(n()), p = !0;
          } catch {
          }
        else
          n = null;
        f = function(h) {
          if (this instanceof f)
            throw new TypeError("Symbol is not a constructor");
          return d(h);
        }, t.exports = d = function m(h) {
          var v;
          if (this instanceof m)
            throw new TypeError("Symbol is not a constructor");
          return p ? n(h) : (v = s(f.prototype), h = h === void 0 ? "" : String(h), l(v, {
            __description__: r("", h),
            __name__: r("", i(h))
          }));
        }, o(d), u(d), l(f.prototype, {
          constructor: r(d),
          toString: r("", function() {
            return this.__name__;
          })
        }), l(d.prototype, {
          toString: r(function() {
            return "Symbol (" + a(this).__description__ + ")";
          }),
          valueOf: r(function() {
            return a(this);
          })
        }), c(d.prototype, d.toPrimitive, r("", function() {
          var m = a(this);
          return O(m) === "symbol" ? m : m.toString();
        })), c(d.prototype, d.toStringTag, r("c", "Symbol")), c(f.prototype, d.toStringTag, r("c", d.prototype[d.toStringTag])), c(f.prototype, d.toPrimitive, r("c", d.prototype[d.toPrimitive]));
      }), Nm = y(function(e, t) {
        t.exports = Sm()() ? $a().Symbol : Pm();
      }), Lm = y(function(e, t) {
        var r = Object.prototype.toString, a = r.call(/* @__PURE__ */ function() {
          return arguments;
        }());
        t.exports = function(n) {
          return r.call(n) === a;
        };
      }), Bm = y(function(e, t) {
        var r = Object.prototype.toString, a = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);
        t.exports = function(n) {
          return typeof n == "function" && a(r.call(n));
        };
      }), qm = y(function(e, t) {
        var r = Object.prototype.toString, a = r.call("");
        t.exports = function(n) {
          return typeof n == "string" || n && O(n) === "object" && (n instanceof String || r.call(n) === a) || !1;
        };
      }), jm = y(function(e, t) {
        var r = Nm().iterator, a = Lm(), n = Bm(), i = dr(), o = Zt(), u = Rr(), s = cr(), l = qm(), c = Array.isArray, d = Function.prototype.call, f = {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: null
        }, p = Object.defineProperty;
        t.exports = function(m) {
          var h = arguments[1], v = arguments[2], g, b, D, w, _, F, R, I, V, S;
          if (m = Object(u(m)), s(h) && o(h), !this || this === Array || !n(this)) {
            if (!h) {
              if (a(m))
                return _ = m.length, _ !== 1 ? Array.apply(null, m) : (w = new Array(1), w[0] = m[0], w);
              if (c(m)) {
                for (w = new Array(_ = m.length), b = 0; b < _; ++b)
                  w[b] = m[b];
                return w;
              }
            }
            w = [];
          } else
            g = this;
          if (!c(m)) {
            if ((V = m[r]) !== void 0) {
              for (R = o(V).call(m), g && (w = new g()), I = R.next(), b = 0; !I.done; )
                S = h ? d.call(h, v, I.value, b) : I.value, g ? (f.value = S, p(w, b, f)) : w[b] = S, I = R.next(), ++b;
              _ = b;
            } else if (l(m)) {
              for (_ = m.length, g && (w = new g()), b = 0, D = 0; b < _; ++b)
                S = m[b], b + 1 < _ && (F = S.charCodeAt(0), F >= 55296 && F <= 56319 && (S += m[++b])), S = h ? d.call(h, v, S, D) : S, g ? (f.value = S, p(w, D, f)) : w[D] = S, ++D;
              _ = D;
            }
          }
          if (_ === void 0)
            for (_ = i(m.length), g && (w = new g(_)), b = 0; b < _; ++b)
              S = h ? d.call(h, v, m[b], b) : m[b], g ? (f.value = S, p(w, b, f)) : w[b] = S;
          return g && (f.value = null, w.length = _), w;
        };
      }), wi = y(function(e, t) {
        t.exports = Fm()() ? Array.from : jm();
      }), zm = y(function(e, t) {
        var r = wi(), a = Array.isArray;
        t.exports = function(n) {
          return a(n) ? n : r(n);
        };
      }), Vm = y(function(e, t) {
        var r = zm(), a = cr(), n = Zt(), i = Array.prototype.slice, o;
        o = function(s) {
          return this.map(function(l, c) {
            return l ? l(s[c]) : s[c];
          }).concat(i.call(s, this.length));
        }, t.exports = function(u) {
          return u = r(u), u.forEach(function(s) {
            a(s) && n(s);
          }), o.bind(u);
        };
      }), Hm = y(function(e, t) {
        var r = Zt();
        t.exports = function(a) {
          var n;
          return typeof a == "function" ? {
            set: a,
            get: a
          } : (n = {
            get: r(a.get)
          }, a.set !== void 0 ? (n.set = r(a.set), a.delete && (n.delete = r(a.delete)), a.clear && (n.clear = r(a.clear)), n) : (n.set = n.get, n));
        };
      }), $m = y(function(e, t) {
        var r = bm(), a = fs(), n = pr(), i = Cm().methods, o = Vm(), u = Hm(), s = Function.prototype.apply, l = Function.prototype.call, c = Object.create, d = Object.defineProperties, f = i.on, p = i.emit;
        t.exports = function(m, h, v) {
          var g = c(null), b, D, w, _, F, R, I, V, S, N, z, H, Q, ie, Y;
          return h !== !1 ? D = h : isNaN(m.length) ? D = 1 : D = m.length, v.normalizer && (N = u(v.normalizer), w = N.get, _ = N.set, F = N.delete, R = N.clear), v.resolvers != null && (Y = o(v.resolvers)), w ? ie = a(function(te) {
            var B, Z, A = arguments;
            if (Y && (A = Y(A)), B = w(A), B !== null && hasOwnProperty.call(g, B))
              return z && b.emit("get", B, A, this), g[B];
            if (A.length === 1 ? Z = l.call(m, this, A[0]) : Z = s.call(m, this, A), B === null) {
              if (B = w(A), B !== null)
                throw r("Circular invocation", "CIRCULAR_INVOCATION");
              B = _(A);
            } else if (hasOwnProperty.call(g, B))
              throw r("Circular invocation", "CIRCULAR_INVOCATION");
            return g[B] = Z, H && b.emit("set", B, null, Z), Z;
          }, D) : h === 0 ? ie = function() {
            var B;
            if (hasOwnProperty.call(g, "data"))
              return z && b.emit("get", "data", arguments, this), g.data;
            if (arguments.length ? B = s.call(m, this, arguments) : B = l.call(m, this), hasOwnProperty.call(g, "data"))
              throw r("Circular invocation", "CIRCULAR_INVOCATION");
            return g.data = B, H && b.emit("set", "data", null, B), B;
          } : ie = function(B) {
            var Z, A = arguments, U;
            if (Y && (A = Y(arguments)), U = String(A[0]), hasOwnProperty.call(g, U))
              return z && b.emit("get", U, A, this), g[U];
            if (A.length === 1 ? Z = l.call(m, this, A[0]) : Z = s.call(m, this, A), hasOwnProperty.call(g, U))
              throw r("Circular invocation", "CIRCULAR_INVOCATION");
            return g[U] = Z, H && b.emit("set", U, null, Z), Z;
          }, b = {
            original: m,
            memoized: ie,
            profileName: v.profileName,
            get: function(B) {
              return Y && (B = Y(B)), w ? w(B) : String(B[0]);
            },
            has: function(B) {
              return hasOwnProperty.call(g, B);
            },
            delete: function(B) {
              var Z;
              hasOwnProperty.call(g, B) && (F && F(B), Z = g[B], delete g[B], Q && b.emit("delete", B, Z));
            },
            clear: function() {
              var B = g;
              R && R(), g = c(null), b.emit("clear", B);
            },
            on: function(B, Z) {
              return B === "get" ? z = !0 : B === "set" ? H = !0 : B === "delete" && (Q = !0), f.call(this, B, Z);
            },
            emit: p,
            updateEnv: function() {
              m = b.original;
            }
          }, w ? I = a(function(te) {
            var B, Z = arguments;
            Y && (Z = Y(Z)), B = w(Z), B !== null && b.delete(B);
          }, D) : h === 0 ? I = function() {
            return b.delete("data");
          } : I = function(B) {
            return Y && (B = Y(arguments)[0]), b.delete(B);
          }, V = a(function() {
            var te, B = arguments;
            return h === 0 ? g.data : (Y && (B = Y(B)), w ? te = w(B) : te = String(B[0]), g[te]);
          }), S = a(function() {
            var te, B = arguments;
            return h === 0 ? b.has("data") : (Y && (B = Y(B)), w ? te = w(B) : te = String(B[0]), te === null ? !1 : b.has(te));
          }), d(ie, {
            __memoized__: n(!0),
            delete: n(I),
            clear: n(b.clear),
            _get: n(V),
            _has: n(S)
          }), b;
        };
      }), Um = y(function(e, t) {
        var r = Zt(), a = Ha(), n = fr(), i = $m(), o = ls();
        t.exports = function u(s) {
          var l, c, d;
          if (r(s), l = Object(arguments[1]), l.async && l.promise)
            throw new Error("Options 'async' and 'promise' cannot be used together");
          return hasOwnProperty.call(s, "__memoized__") && !l.force ? s : (c = o(l.length, s.length, l.async && n.async), d = i(s, c, l), a(n, function(f, p) {
            l[p] && f(l[p], d, l);
          }), u.__profiler__ && u.__profiler__(d), d.updateEnv(), d.memoized);
        };
      }), Gm = y(function(e, t) {
        t.exports = function(r) {
          var a, n, i = r.length;
          if (!i)
            return "";
          for (a = String(r[n = 0]); --i; )
            a += "" + r[++n];
          return a;
        };
      }), Wm = y(function(e, t) {
        t.exports = function(r) {
          return r ? function(a) {
            for (var n = String(a[0]), i = 0, o = r; --o; )
              n += "" + a[++i];
            return n;
          } : function() {
            return "";
          };
        };
      }), Ym = y(function(e, t) {
        t.exports = function() {
          var r = Number.isNaN;
          return typeof r != "function" ? !1 : !r({}) && r(NaN) && !r(34);
        };
      }), Km = y(function(e, t) {
        t.exports = function(r) {
          return r !== r;
        };
      }), Xm = y(function(e, t) {
        t.exports = Ym()() ? Number.isNaN : Km();
      }), Di = y(function(e, t) {
        var r = Xm(), a = dr(), n = Rr(), i = Array.prototype.indexOf, o = Object.prototype.hasOwnProperty, u = Math.abs, s = Math.floor;
        t.exports = function(l) {
          var c, d, f, p;
          if (!r(l))
            return i.apply(this, arguments);
          for (d = a(n(this).length), f = arguments[1], isNaN(f) ? f = 0 : f >= 0 ? f = s(f) : f = a(this.length) - s(u(f)), c = f; c < d; ++c)
            if (o.call(this, c) && (p = this[c], r(p)))
              return c;
          return -1;
        };
      }), Zm = y(function(e, t) {
        var r = Di(), a = Object.create;
        t.exports = function() {
          var n = 0, i = [], o = a(null);
          return {
            get: function(s) {
              var l = 0, c = i, d, f = s.length;
              if (f === 0)
                return c[f] || null;
              if (c = c[f]) {
                for (; l < f - 1; ) {
                  if (d = r.call(c[0], s[l]), d === -1)
                    return null;
                  c = c[1][d], ++l;
                }
                return d = r.call(c[0], s[l]), d === -1 ? null : c[1][d] || null;
              }
              return null;
            },
            set: function(s) {
              var l = 0, c = i, d, f = s.length;
              if (f === 0)
                c[f] = ++n;
              else {
                for (c[f] || (c[f] = [[], []]), c = c[f]; l < f - 1; )
                  d = r.call(c[0], s[l]), d === -1 && (d = c[0].push(s[l]) - 1, c[1].push([[], []])), c = c[1][d], ++l;
                d = r.call(c[0], s[l]), d === -1 && (d = c[0].push(s[l]) - 1), c[1][d] = ++n;
              }
              return o[n] = s, n;
            },
            delete: function(s) {
              var l = 0, c = i, d, f = o[s], p = f.length, m = [];
              if (p === 0)
                delete c[p];
              else if (c = c[p]) {
                for (; l < p - 1; ) {
                  if (d = r.call(c[0], f[l]), d === -1)
                    return;
                  m.push(c, d), c = c[1][d], ++l;
                }
                if (d = r.call(c[0], f[l]), d === -1)
                  return;
                for (s = c[1][d], c[0].splice(d, 1), c[1].splice(d, 1); !c[0].length && m.length; )
                  d = m.pop(), c = m.pop(), c[0].splice(d, 1), c[1].splice(d, 1);
              }
              delete o[s];
            },
            clear: function() {
              i = [], o = a(null);
            }
          };
        };
      }), Jm = y(function(e, t) {
        var r = Di();
        t.exports = function() {
          var a = 0, n = [], i = [];
          return {
            get: function(u) {
              var s = r.call(n, u[0]);
              return s === -1 ? null : i[s];
            },
            set: function(u) {
              return n.push(u[0]), i.push(++a), a;
            },
            delete: function(u) {
              var s = r.call(i, u);
              s !== -1 && (n.splice(s, 1), i.splice(s, 1));
            },
            clear: function() {
              n = [], i = [];
            }
          };
        };
      }), Qm = y(function(e, t) {
        var r = Di(), a = Object.create;
        t.exports = function(n) {
          var i = 0, o = [[], []], u = a(null);
          return {
            get: function(l) {
              for (var c = 0, d = o, f; c < n - 1; ) {
                if (f = r.call(d[0], l[c]), f === -1)
                  return null;
                d = d[1][f], ++c;
              }
              return f = r.call(d[0], l[c]), f === -1 ? null : d[1][f] || null;
            },
            set: function(l) {
              for (var c = 0, d = o, f; c < n - 1; )
                f = r.call(d[0], l[c]), f === -1 && (f = d[0].push(l[c]) - 1, d[1].push([[], []])), d = d[1][f], ++c;
              return f = r.call(d[0], l[c]), f === -1 && (f = d[0].push(l[c]) - 1), d[1][f] = ++i, u[i] = l, i;
            },
            delete: function(l) {
              for (var c = 0, d = o, f, p = [], m = u[l]; c < n - 1; ) {
                if (f = r.call(d[0], m[c]), f === -1)
                  return;
                p.push(d, f), d = d[1][f], ++c;
              }
              if (f = r.call(d[0], m[c]), f !== -1) {
                for (l = d[1][f], d[0].splice(f, 1), d[1].splice(f, 1); !d[0].length && p.length; )
                  f = p.pop(), d = p.pop(), d[0].splice(f, 1), d[1].splice(f, 1);
                delete u[l];
              }
            },
            clear: function() {
              o = [[], []], u = a(null);
            }
          };
        };
      }), hs = y(function(e, t) {
        var r = Zt(), a = Ha(), n = Function.prototype.call;
        t.exports = function(i, o) {
          var u = {}, s = arguments[2];
          return r(o), a(i, function(l, c, d, f) {
            u[c] = n.call(o, s, l, c, d, f);
          }), u;
        };
      }), _i = y(function(e, t) {
        var r = function(i) {
          if (typeof i != "function")
            throw new TypeError(i + " is not a function");
          return i;
        }, a = function(i) {
          var o = L.createTextNode(""), u, s, l = 0;
          return new i(function() {
            var c;
            if (u)
              s && (u = s.concat(u));
            else {
              if (!s)
                return;
              u = s;
            }
            if (s = u, u = null, typeof s == "function") {
              c = s, s = null, c();
              return;
            }
            for (o.data = l = ++l % 2; s; )
              c = s.shift(), s.length || (s = null), c();
          }).observe(o, {
            characterData: !0
          }), function(c) {
            if (r(c), u) {
              typeof u == "function" ? u = [u, c] : u.push(c);
              return;
            }
            u = c, o.data = l = ++l % 2;
          };
        };
        t.exports = function() {
          if ((typeof process > "u" ? "undefined" : O(process)) === "object" && process && typeof process.nextTick == "function")
            return process.nextTick;
          if (typeof queueMicrotask == "function")
            return function(n) {
              queueMicrotask(r(n));
            };
          if ((typeof L > "u" ? "undefined" : O(L)) === "object" && L) {
            if (typeof MutationObserver == "function")
              return a(MutationObserver);
            if (typeof WebKitMutationObserver == "function")
              return a(WebKitMutationObserver);
          }
          return typeof setImmediate == "function" ? function(n) {
            setImmediate(r(n));
          } : typeof setTimeout == "function" || (typeof setTimeout > "u" ? "undefined" : O(setTimeout)) === "object" ? function(n) {
            setTimeout(r(n), 0);
          } : null;
        }();
      }), eh = y(function() {
        var e = wi(), t = hs(), r = ds(), a = fs(), n = _i(), i = Array.prototype.slice, o = Function.prototype.apply, u = Object.create;
        fr().async = function(s, l) {
          var c = u(null), d = u(null), f = l.memoized, p = l.original, m, h, v;
          l.memoized = a(function(g) {
            var b = arguments, D = b[b.length - 1];
            return typeof D == "function" && (m = D, b = i.call(b, 0, -1)), f.apply(h = this, v = b);
          }, f);
          try {
            r(l.memoized, f);
          } catch {
          }
          l.on("get", function(g) {
            var b, D, w;
            if (m) {
              if (c[g]) {
                typeof c[g] == "function" ? c[g] = [c[g], m] : c[g].push(m), m = null;
                return;
              }
              b = m, D = h, w = v, m = h = v = null, n(function() {
                var _;
                hasOwnProperty.call(d, g) ? (_ = d[g], l.emit("getasync", g, w, D), o.call(b, _.context, _.args)) : (m = b, h = D, v = w, f.apply(D, w));
              });
            }
          }), l.original = function() {
            var g, b, D, w;
            return m ? (g = e(arguments), b = function _(F) {
              var R, I, V = _.id;
              if (V == null) {
                n(o.bind(_, this, arguments));
                return;
              }
              if (delete _.id, R = c[V], delete c[V], !!R)
                return I = e(arguments), l.has(V) && (F ? l.delete(V) : (d[V] = {
                  context: this,
                  args: I
                }, l.emit("setasync", V, typeof R == "function" ? 1 : R.length))), typeof R == "function" ? w = o.call(R, this, I) : R.forEach(function(S) {
                  w = o.call(S, this, I);
                }, this), w;
            }, D = m, m = h = v = null, g.push(b), w = o.call(p, this, g), b.cb = D, m = b, w) : o.call(p, this, arguments);
          }, l.on("set", function(g) {
            if (!m) {
              l.delete(g);
              return;
            }
            c[g] ? typeof c[g] == "function" ? c[g] = [c[g], m.cb] : c[g].push(m.cb) : c[g] = m.cb, delete m.cb, m.id = g, m = null;
          }), l.on("delete", function(g) {
            var b;
            hasOwnProperty.call(c, g) || d[g] && (b = d[g], delete d[g], l.emit("deleteasync", g, i.call(b.args, 1)));
          }), l.on("clear", function() {
            var g = d;
            d = u(null), l.emit("clearasync", t(g, function(b) {
              return i.call(b.args, 1);
            }));
          });
        };
      }), th = y(function(e, t) {
        var r = Array.prototype.forEach, a = Object.create;
        t.exports = function(n) {
          var i = a(null);
          return r.call(arguments, function(o) {
            i[o] = !0;
          }), i;
        };
      }), vs = y(function(e, t) {
        t.exports = function(r) {
          return typeof r == "function";
        };
      }), rh = y(function(e, t) {
        var r = vs();
        t.exports = function(a) {
          try {
            return a && r(a.toString) ? a.toString() : String(a);
          } catch {
            throw new TypeError("Passed argument cannot be stringifed");
          }
        };
      }), ah = y(function(e, t) {
        var r = Rr(), a = rh();
        t.exports = function(n) {
          return a(r(n));
        };
      }), nh = y(function(e, t) {
        var r = vs();
        t.exports = function(a) {
          try {
            return a && r(a.toString) ? a.toString() : String(a);
          } catch {
            return "<Non-coercible to string value>";
          }
        };
      }), ih = y(function(e, t) {
        var r = nh(), a = /[\n\r\u2028\u2029]/g;
        t.exports = function(n) {
          var i = r(n);
          return i.length > 100 && (i = i.slice(0, 99) + "…"), i = i.replace(a, function(o) {
            return JSON.stringify(o).slice(1, -1);
          }), i;
        };
      }), gs = y(function(e, t) {
        t.exports = r, t.exports.default = r;
        function r(a) {
          return !!a && (O(a) === "object" || typeof a == "function") && typeof a.then == "function";
        }
      }), oh = y(function() {
        var e = hs(), t = th(), r = ah(), a = ih(), n = gs(), i = _i(), o = Object.create, u = t("then", "then:finally", "done", "done:finally");
        fr().promise = function(s, l) {
          var c = o(null), d = o(null), f = o(null);
          if (s === !0)
            s = null;
          else if (s = r(s), !u[s])
            throw new TypeError("'" + a(s) + "' is not valid promise mode");
          l.on("set", function(p, m, h) {
            var v = !1;
            if (!n(h)) {
              d[p] = h, l.emit("setasync", p, 1);
              return;
            }
            c[p] = 1, f[p] = h;
            var g = function(F) {
              var R = c[p];
              if (v)
                throw new Error(`Memoizee error: Detected unordered then|done & finally resolution, which in turn makes proper detection of success/failure impossible (when in 'done:finally' mode)
Consider to rely on 'then' or 'done' mode instead.`);
              R && (delete c[p], d[p] = F, l.emit("setasync", p, R));
            }, b = function() {
              v = !0, c[p] && (delete c[p], delete f[p], l.delete(p));
            }, D = s;
            if (D || (D = "then"), D === "then") {
              var w = function() {
                i(b);
              };
              h = h.then(function(_) {
                i(g.bind(this, _));
              }, w), typeof h.finally == "function" && h.finally(w);
            } else if (D === "done") {
              if (typeof h.done != "function")
                throw new Error("Memoizee error: Retrieved promise does not implement 'done' in 'done' mode");
              h.done(g, b);
            } else if (D === "done:finally") {
              if (typeof h.done != "function")
                throw new Error("Memoizee error: Retrieved promise does not implement 'done' in 'done:finally' mode");
              if (typeof h.finally != "function")
                throw new Error("Memoizee error: Retrieved promise does not implement 'finally' in 'done:finally' mode");
              h.done(g), h.finally(b);
            }
          }), l.on("get", function(p, m, h) {
            var v;
            if (c[p]) {
              ++c[p];
              return;
            }
            v = f[p];
            var g = function() {
              l.emit("getasync", p, m, h);
            };
            n(v) ? typeof v.done == "function" ? v.done(g) : v.then(function() {
              i(g);
            }) : g();
          }), l.on("delete", function(p) {
            if (delete f[p], c[p]) {
              delete c[p];
              return;
            }
            if (hasOwnProperty.call(d, p)) {
              var m = d[p];
              delete d[p], l.emit("deleteasync", p, [m]);
            }
          }), l.on("clear", function() {
            var p = d;
            d = o(null), c = o(null), f = o(null), l.emit("clearasync", e(p, function(m) {
              return [m];
            }));
          });
        };
      }), uh = y(function() {
        var e = Zt(), t = Ha(), r = fr(), a = Function.prototype.apply;
        r.dispose = function(n, i, o) {
          var u;
          if (e(n), o.async && r.async || o.promise && r.promise) {
            i.on("deleteasync", u = function(l, c) {
              a.call(n, null, c);
            }), i.on("clearasync", function(s) {
              t(s, function(l, c) {
                u(c, l);
              });
            });
            return;
          }
          i.on("delete", u = function(l, c) {
            n(c);
          }), i.on("clear", function(s) {
            t(s, function(l, c) {
              u(c, l);
            });
          });
        };
      }), sh = y(function(e, t) {
        t.exports = 2147483647;
      }), lh = y(function(e, t) {
        var r = dr(), a = sh();
        t.exports = function(n) {
          if (n = r(n), n > a)
            throw new TypeError(n + " exceeds maximum possible timeout");
          return n;
        };
      }), ch = y(function() {
        var e = wi(), t = Ha(), r = _i(), a = gs(), n = lh(), i = fr(), o = Function.prototype, u = Math.max, s = Math.min, l = Object.create;
        i.maxAge = function(c, d, f) {
          var p, m, h, v;
          c = n(c), c && (p = l(null), m = f.async && i.async || f.promise && i.promise ? "async" : "", d.on("set" + m, function(g) {
            p[g] = setTimeout(function() {
              d.delete(g);
            }, c), typeof p[g].unref == "function" && p[g].unref(), v && (v[g] && v[g] !== "nextTick" && clearTimeout(v[g]), v[g] = setTimeout(function() {
              delete v[g];
            }, h), typeof v[g].unref == "function" && v[g].unref());
          }), d.on("delete" + m, function(g) {
            clearTimeout(p[g]), delete p[g], v && (v[g] !== "nextTick" && clearTimeout(v[g]), delete v[g]);
          }), f.preFetch && (f.preFetch === !0 || isNaN(f.preFetch) ? h = 0.333 : h = u(s(Number(f.preFetch), 1), 0), h && (v = {}, h = (1 - h) * c, d.on("get" + m, function(g, b, D) {
            v[g] || (v[g] = "nextTick", r(function() {
              var w;
              v[g] === "nextTick" && (delete v[g], d.delete(g), f.async && (b = e(b), b.push(o)), w = d.memoized.apply(D, b), f.promise && a(w) && (typeof w.done == "function" ? w.done(o, o) : w.then(o, o)));
            }));
          }))), d.on("clear" + m, function() {
            t(p, function(g) {
              clearTimeout(g);
            }), p = {}, v && (t(v, function(g) {
              g !== "nextTick" && clearTimeout(g);
            }), v = {});
          }));
        };
      }), dh = y(function(e, t) {
        var r = dr(), a = Object.create, n = Object.prototype.hasOwnProperty;
        t.exports = function(i) {
          var o = 0, u = 1, s = a(null), l = a(null), c = 0, d;
          return i = r(i), {
            hit: function(p) {
              var m = l[p], h = ++c;
              if (s[h] = p, l[p] = h, !m)
                return ++o, o <= i ? void 0 : (p = s[u], d(p), p);
              if (delete s[m], u === m)
                for (; !n.call(s, ++u); )
                  ;
            },
            delete: d = function(p) {
              var m = l[p];
              if (m && (delete s[m], delete l[p], --o, u === m)) {
                if (!o) {
                  c = 0, u = 1;
                  return;
                }
                for (; !n.call(s, ++u); )
                  ;
              }
            },
            clear: function() {
              o = 0, u = 1, s = a(null), l = a(null), c = 0;
            }
          };
        };
      }), fh = y(function() {
        var e = dr(), t = dh(), r = fr();
        r.max = function(a, n, i) {
          var o, u, s;
          a = e(a), a && (u = t(a), o = i.async && r.async || i.promise && r.promise ? "async" : "", n.on("set" + o, s = function(c) {
            c = u.hit(c), c !== void 0 && n.delete(c);
          }), n.on("get" + o, s), n.on("delete" + o, u.delete), n.on("clear" + o, u.clear));
        };
      }), ph = y(function() {
        var e = pr(), t = fr(), r = Object.create, a = Object.defineProperties;
        t.refCounter = function(n, i, o) {
          var u, s;
          u = r(null), s = o.async && t.async || o.promise && t.promise ? "async" : "", i.on("set" + s, function(l, c) {
            u[l] = c || 1;
          }), i.on("get" + s, function(l) {
            ++u[l];
          }), i.on("delete" + s, function(l) {
            delete u[l];
          }), i.on("clear" + s, function() {
            u = {};
          }), a(i.memoized, {
            deleteRef: e(function() {
              var l = i.get(arguments);
              return l === null || !u[l] ? null : --u[l] ? !1 : (i.delete(l), !0);
            }),
            getRefCount: e(function() {
              var l = i.get(arguments);
              return l === null || !u[l] ? 0 : u[l];
            })
          });
        };
      }), bs = y(function(e, t) {
        var r = ss(), a = ls(), n = Um();
        t.exports = function(i) {
          var o = r(arguments[1]), u;
          return o.normalizer || (u = o.length = a(o.length, i.length, o.async), u !== 0 && (o.primitive ? u === !1 ? o.normalizer = Gm() : u > 1 && (o.normalizer = Wm()(u)) : u === !1 ? o.normalizer = Zm()() : u === 1 ? o.normalizer = Jm()() : o.normalizer = Qm()(u))), o.async && eh(), o.promise && oh(), o.dispose && uh(), o.maxAge && ch(), o.max && fh(), o.refCounter && ph(), n(i, o);
        };
      }), ys = y(function(e) {
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        function t(o) {
          return o >= "a" && o <= "z" || o >= "A" && o <= "Z" || o === "-" || o === "_";
        }
        e.isIdentStart = t;
        function r(o) {
          return o >= "a" && o <= "z" || o >= "A" && o <= "Z" || o >= "0" && o <= "9" || o === "-" || o === "_";
        }
        e.isIdent = r;
        function a(o) {
          return o >= "a" && o <= "f" || o >= "A" && o <= "F" || o >= "0" && o <= "9";
        }
        e.isHex = a;
        function n(o) {
          for (var u = o.length, s = "", l = 0; l < u; ) {
            var c = o.charAt(l);
            if (e.identSpecialChars[c])
              s += "\\" + c;
            else if (c === "_" || c === "-" || c >= "A" && c <= "Z" || c >= "a" && c <= "z" || l !== 0 && c >= "0" && c <= "9")
              s += c;
            else {
              var d = c.charCodeAt(0);
              if ((d & 63488) === 55296) {
                var f = o.charCodeAt(l++);
                if ((d & 64512) !== 55296 || (f & 64512) !== 56320)
                  throw Error("UCS-2(decode): illegal sequence");
                d = ((d & 1023) << 10) + (f & 1023) + 65536;
              }
              s += "\\" + d.toString(16) + " ";
            }
            l++;
          }
          return s;
        }
        e.escapeIdentifier = n;
        function i(o) {
          for (var u = o.length, s = "", l = 0, c; l < u; ) {
            var d = o.charAt(l);
            d === '"' ? d = '\\"' : d === "\\" ? d = "\\\\" : (c = e.strReplacementsRev[d]) !== void 0 && (d = c), s += d, l++;
          }
          return '"' + s + '"';
        }
        e.escapeStr = i, e.identSpecialChars = {
          "!": !0,
          '"': !0,
          "#": !0,
          $: !0,
          "%": !0,
          "&": !0,
          "'": !0,
          "(": !0,
          ")": !0,
          "*": !0,
          "+": !0,
          ",": !0,
          ".": !0,
          "/": !0,
          ";": !0,
          "<": !0,
          "=": !0,
          ">": !0,
          "?": !0,
          "@": !0,
          "[": !0,
          "\\": !0,
          "]": !0,
          "^": !0,
          "`": !0,
          "{": !0,
          "|": !0,
          "}": !0,
          "~": !0
        }, e.strReplacementsRev = {
          "\n": "\\n",
          "\r": "\\r",
          "	": "\\t",
          "\f": "\\f",
          "\v": "\\v"
        }, e.singleQuoteEscapeChars = {
          n: `
`,
          r: "\r",
          t: "	",
          f: "\f",
          "\\": "\\",
          "'": "'"
        }, e.doubleQuotesEscapeChars = {
          n: `
`,
          r: "\r",
          t: "	",
          f: "\f",
          "\\": "\\",
          '"': '"'
        };
      }), mh = y(function(e) {
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        var t = ys();
        function r(a, n, i, o, u, s) {
          var l = a.length, c = "";
          function d(b, D) {
            var w = "";
            for (n++, c = a.charAt(n); n < l; ) {
              if (c === b)
                return n++, w;
              if (c === "\\") {
                n++, c = a.charAt(n);
                var _ = void 0;
                if (c === b)
                  w += b;
                else if ((_ = D[c]) !== void 0)
                  w += _;
                else if (t.isHex(c)) {
                  var F = c;
                  for (n++, c = a.charAt(n); t.isHex(c); )
                    F += c, n++, c = a.charAt(n);
                  c === " " && (n++, c = a.charAt(n)), w += String.fromCharCode(parseInt(F, 16));
                  continue;
                } else
                  w += c;
              } else
                w += c;
              n++, c = a.charAt(n);
            }
            return w;
          }
          function f() {
            var b = "";
            for (c = a.charAt(n); n < l; ) {
              if (t.isIdent(c))
                b += c;
              else if (c === "\\") {
                if (n++, n >= l)
                  throw Error("Expected symbol but end of file reached.");
                if (c = a.charAt(n), t.identSpecialChars[c])
                  b += c;
                else if (t.isHex(c)) {
                  var D = c;
                  for (n++, c = a.charAt(n); t.isHex(c); )
                    D += c, n++, c = a.charAt(n);
                  c === " " && (n++, c = a.charAt(n)), b += String.fromCharCode(parseInt(D, 16));
                  continue;
                } else
                  b += c;
              } else
                return b;
              n++, c = a.charAt(n);
            }
            return b;
          }
          function p() {
            c = a.charAt(n);
            for (var b = !1; c === " " || c === "	" || c === `
` || c === "\r" || c === "\f"; )
              b = !0, n++, c = a.charAt(n);
            return b;
          }
          function m() {
            var b = h();
            if (n < l)
              throw Error('Rule expected but "' + a.charAt(n) + '" found.');
            return b;
          }
          function h() {
            var b = v();
            if (!b)
              return null;
            var D = b;
            for (c = a.charAt(n); c === ","; ) {
              if (n++, p(), D.type !== "selectors" && (D = {
                type: "selectors",
                selectors: [b]
              }), b = v(), !b)
                throw Error('Rule expected after ",".');
              D.selectors.push(b);
            }
            return D;
          }
          function v() {
            p();
            var b = {
              type: "ruleSet"
            }, D = g();
            if (!D)
              return null;
            for (var w = b; D && (D.type = "rule", w.rule = D, w = D, p(), c = a.charAt(n), !(n >= l || c === "," || c === ")")); )
              if (u[c]) {
                var _ = c;
                if (n++, p(), D = g(), !D)
                  throw Error('Rule expected after "' + _ + '".');
                D.nestingOperator = _;
              } else
                D = g(), D && (D.nestingOperator = null);
            return b;
          }
          function g() {
            for (var b = null; n < l; )
              if (c = a.charAt(n), c === "*")
                n++, (b = b || {}).tagName = "*";
              else if (t.isIdentStart(c) || c === "\\")
                (b = b || {}).tagName = f();
              else if (c === ".")
                n++, b = b || {}, (b.classNames = b.classNames || []).push(f());
              else if (c === "#")
                n++, (b = b || {}).id = f();
              else if (c === "[") {
                n++, p();
                var D = {
                  name: f()
                };
                if (p(), c === "]")
                  n++;
                else {
                  var w = "";
                  if (o[c] && (w = c, n++, c = a.charAt(n)), n >= l)
                    throw Error('Expected "=" but end of file reached.');
                  if (c !== "=")
                    throw Error('Expected "=" but "' + c + '" found.');
                  D.operator = w + "=", n++, p();
                  var _ = "";
                  if (D.valueType = "string", c === '"')
                    _ = d('"', t.doubleQuotesEscapeChars);
                  else if (c === "'")
                    _ = d("'", t.singleQuoteEscapeChars);
                  else if (s && c === "$")
                    n++, _ = f(), D.valueType = "substitute";
                  else {
                    for (; n < l && c !== "]"; )
                      _ += c, n++, c = a.charAt(n);
                    _ = _.trim();
                  }
                  if (p(), n >= l)
                    throw Error('Expected "]" but end of file reached.');
                  if (c !== "]")
                    throw Error('Expected "]" but "' + c + '" found.');
                  n++, D.value = _;
                }
                b = b || {}, (b.attrs = b.attrs || []).push(D);
              } else if (c === ":") {
                n++;
                var F = f(), R = {
                  name: F
                };
                if (c === "(") {
                  n++;
                  var I = "";
                  if (p(), i[F] === "selector")
                    R.valueType = "selector", I = h();
                  else {
                    if (R.valueType = i[F] || "string", c === '"')
                      I = d('"', t.doubleQuotesEscapeChars);
                    else if (c === "'")
                      I = d("'", t.singleQuoteEscapeChars);
                    else if (s && c === "$")
                      n++, I = f(), R.valueType = "substitute";
                    else {
                      for (; n < l && c !== ")"; )
                        I += c, n++, c = a.charAt(n);
                      I = I.trim();
                    }
                    p();
                  }
                  if (n >= l)
                    throw Error('Expected ")" but end of file reached.');
                  if (c !== ")")
                    throw Error('Expected ")" but "' + c + '" found.');
                  n++, R.value = I;
                }
                b = b || {}, (b.pseudos = b.pseudos || []).push(R);
              } else
                break;
            return b;
          }
          return m();
        }
        e.parseCssSelector = r;
      }), hh = y(function(e) {
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        var t = ys();
        function r(a) {
          var n = "";
          switch (a.type) {
            case "ruleSet":
              for (var i = a.rule, o = []; i; )
                i.nestingOperator && o.push(i.nestingOperator), o.push(r(i)), i = i.rule;
              n = o.join(" ");
              break;
            case "selectors":
              n = a.selectors.map(r).join(", ");
              break;
            case "rule":
              a.tagName && (a.tagName === "*" ? n = "*" : n = t.escapeIdentifier(a.tagName)), a.id && (n += "#" + t.escapeIdentifier(a.id)), a.classNames && (n += a.classNames.map(function(u) {
                return "." + t.escapeIdentifier(u);
              }).join("")), a.attrs && (n += a.attrs.map(function(u) {
                return "operator" in u ? u.valueType === "substitute" ? "[" + t.escapeIdentifier(u.name) + u.operator + "$" + u.value + "]" : "[" + t.escapeIdentifier(u.name) + u.operator + t.escapeStr(u.value) + "]" : "[" + t.escapeIdentifier(u.name) + "]";
              }).join("")), a.pseudos && (n += a.pseudos.map(function(u) {
                return u.valueType ? u.valueType === "selector" ? ":" + t.escapeIdentifier(u.name) + "(" + r(u.value) + ")" : u.valueType === "substitute" ? ":" + t.escapeIdentifier(u.name) + "($" + u.value + ")" : u.valueType === "numeric" ? ":" + t.escapeIdentifier(u.name) + "(" + u.value + ")" : ":" + t.escapeIdentifier(u.name) + "(" + t.escapeIdentifier(u.value) + ")" : ":" + t.escapeIdentifier(u.name);
              }).join(""));
              break;
            default:
              throw Error('Unknown entity type: "' + a.type + '".');
          }
          return n;
        }
        e.renderEntity = r;
      }), ws = y(function(e) {
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        var t = mh(), r = hh(), a = function() {
          function n() {
            this.pseudos = {}, this.attrEqualityMods = {}, this.ruleNestingOperators = {}, this.substitutesEnabled = !1;
          }
          return n.prototype.registerSelectorPseudos = function() {
            for (var i = [], o = 0; o < arguments.length; o++)
              i[o] = arguments[o];
            for (var u = 0, s = i; u < s.length; u++) {
              var l = s[u];
              this.pseudos[l] = "selector";
            }
            return this;
          }, n.prototype.unregisterSelectorPseudos = function() {
            for (var i = [], o = 0; o < arguments.length; o++)
              i[o] = arguments[o];
            for (var u = 0, s = i; u < s.length; u++) {
              var l = s[u];
              delete this.pseudos[l];
            }
            return this;
          }, n.prototype.registerNumericPseudos = function() {
            for (var i = [], o = 0; o < arguments.length; o++)
              i[o] = arguments[o];
            for (var u = 0, s = i; u < s.length; u++) {
              var l = s[u];
              this.pseudos[l] = "numeric";
            }
            return this;
          }, n.prototype.unregisterNumericPseudos = function() {
            for (var i = [], o = 0; o < arguments.length; o++)
              i[o] = arguments[o];
            for (var u = 0, s = i; u < s.length; u++) {
              var l = s[u];
              delete this.pseudos[l];
            }
            return this;
          }, n.prototype.registerNestingOperators = function() {
            for (var i = [], o = 0; o < arguments.length; o++)
              i[o] = arguments[o];
            for (var u = 0, s = i; u < s.length; u++) {
              var l = s[u];
              this.ruleNestingOperators[l] = !0;
            }
            return this;
          }, n.prototype.unregisterNestingOperators = function() {
            for (var i = [], o = 0; o < arguments.length; o++)
              i[o] = arguments[o];
            for (var u = 0, s = i; u < s.length; u++) {
              var l = s[u];
              delete this.ruleNestingOperators[l];
            }
            return this;
          }, n.prototype.registerAttrEqualityMods = function() {
            for (var i = [], o = 0; o < arguments.length; o++)
              i[o] = arguments[o];
            for (var u = 0, s = i; u < s.length; u++) {
              var l = s[u];
              this.attrEqualityMods[l] = !0;
            }
            return this;
          }, n.prototype.unregisterAttrEqualityMods = function() {
            for (var i = [], o = 0; o < arguments.length; o++)
              i[o] = arguments[o];
            for (var u = 0, s = i; u < s.length; u++) {
              var l = s[u];
              delete this.attrEqualityMods[l];
            }
            return this;
          }, n.prototype.enableSubstitutes = function() {
            return this.substitutesEnabled = !0, this;
          }, n.prototype.disableSubstitutes = function() {
            return this.substitutesEnabled = !1, this;
          }, n.prototype.parse = function(i) {
            return t.parseCssSelector(i, 0, this.pseudos, this.attrEqualityMods, this.ruleNestingOperators, this.substitutesEnabled);
          }, n.prototype.render = function(i) {
            return r.renderEntity(i).trim();
          }, n;
        }();
        e.CssSelectorParser = a;
      }), vh = y(function(e, t) {
        (function(r, a) {
          O(e) === "object" && typeof t < "u" ? t.exports = a() : r.ES6Promise = a();
        })(e, function() {
          function r(T) {
            var M = O(T);
            return T !== null && (M === "object" || M === "function");
          }
          function a(T) {
            return typeof T == "function";
          }
          var n = void 0;
          Array.isArray ? n = Array.isArray : n = function(M) {
            return Object.prototype.toString.call(M) === "[object Array]";
          };
          var i = n, o = 0, u = void 0, s = void 0, l = function(M, q) {
            F[o] = M, F[o + 1] = q, o += 2, o === 2 && (s ? s(R) : V());
          };
          function c(T) {
            s = T;
          }
          function d(T) {
            l = T;
          }
          var f = typeof E < "u" ? E : void 0, p = f || {}, m = p.MutationObserver || p.WebKitMutationObserver, h = typeof self > "u" && typeof process < "u" && {}.toString.call(process) === "[object process]", v = typeof Uint8ClampedArray < "u" && typeof importScripts < "u" && typeof MessageChannel < "u";
          function g() {
            return function() {
              return process.nextTick(R);
            };
          }
          function b() {
            return typeof u < "u" ? function() {
              u(R);
            } : _();
          }
          function D() {
            var T = 0, M = new m(R), q = L.createTextNode("");
            return M.observe(q, {
              characterData: !0
            }), function() {
              q.data = T = ++T % 2;
            };
          }
          function w() {
            var T = new MessageChannel();
            return T.port1.onmessage = R, function() {
              return T.port2.postMessage(0);
            };
          }
          function _() {
            var T = setTimeout;
            return function() {
              return T(R, 1);
            };
          }
          var F = new Array(1e3);
          function R() {
            for (var T = 0; T < o; T += 2) {
              var M = F[T], q = F[T + 1];
              M(q), F[T] = void 0, F[T + 1] = void 0;
            }
            o = 0;
          }
          function I() {
            try {
              var T = Function("return this")().require("vertx");
              return u = T.runOnLoop || T.runOnContext, b();
            } catch {
              return _();
            }
          }
          var V = void 0;
          h ? V = g() : m ? V = D() : v ? V = w() : f === void 0 ? V = I() : V = _();
          function S(T, M) {
            var q = this, K = new this.constructor(H);
            K[z] === void 0 && Ee(K);
            var oe = q._state;
            if (oe) {
              var fe = arguments[oe - 1];
              l(function() {
                return xe(oe, K, fe, q._result);
              });
            } else
              pe(q, K, T, M);
            return K;
          }
          function N(T) {
            var M = this;
            if (T && O(T) === "object" && T.constructor === M)
              return T;
            var q = new M(H);
            return G(q, T), q;
          }
          var z = Math.random().toString(36).substring(2);
          function H() {
          }
          var Q = void 0, ie = 1, Y = 2;
          function te() {
            return new TypeError("You cannot resolve a promise with itself");
          }
          function B() {
            return new TypeError("A promises callback cannot return that same promise.");
          }
          function Z(T, M, q, K) {
            try {
              T.call(M, q, K);
            } catch (oe) {
              return oe;
            }
          }
          function A(T, M, q) {
            l(function(K) {
              var oe = !1, fe = Z(q, M, function(Ve) {
                oe || (oe = !0, M !== Ve ? G(K, Ve) : W(K, Ve));
              }, function(Ve) {
                oe || (oe = !0, X(K, Ve));
              }, "Settle: " + (K._label || " unknown promise"));
              !oe && fe && (oe = !0, X(K, fe));
            }, T);
          }
          function U(T, M) {
            M._state === ie ? W(T, M._result) : M._state === Y ? X(T, M._result) : pe(M, void 0, function(q) {
              return G(T, q);
            }, function(q) {
              return X(T, q);
            });
          }
          function P(T, M, q) {
            M.constructor === T.constructor && q === S && M.constructor.resolve === N ? U(T, M) : q === void 0 ? W(T, M) : a(q) ? A(T, M, q) : W(T, M);
          }
          function G(T, M) {
            if (T === M)
              X(T, te());
            else if (r(M)) {
              var q = void 0;
              try {
                q = M.then;
              } catch (K) {
                X(T, K);
                return;
              }
              P(T, M, q);
            } else
              W(T, M);
          }
          function ae(T) {
            T._onerror && T._onerror(T._result), be(T);
          }
          function W(T, M) {
            T._state === Q && (T._result = M, T._state = ie, T._subscribers.length !== 0 && l(be, T));
          }
          function X(T, M) {
            T._state === Q && (T._state = Y, T._result = M, l(ae, T));
          }
          function pe(T, M, q, K) {
            var oe = T._subscribers, fe = oe.length;
            T._onerror = null, oe[fe] = M, oe[fe + ie] = q, oe[fe + Y] = K, fe === 0 && T._state && l(be, T);
          }
          function be(T) {
            var M = T._subscribers, q = T._state;
            if (M.length !== 0) {
              for (var K = void 0, oe = void 0, fe = T._result, Ve = 0; Ve < M.length; Ve += 3)
                K = M[Ve], oe = M[Ve + q], K ? xe(q, K, oe, fe) : oe(fe);
              T._subscribers.length = 0;
            }
          }
          function xe(T, M, q, K) {
            var oe = a(q), fe = void 0, Ve = void 0, Zr = !0;
            if (oe) {
              try {
                fe = q(K);
              } catch (pi) {
                Zr = !1, Ve = pi;
              }
              if (M === fe) {
                X(M, B());
                return;
              }
            } else
              fe = K;
            M._state !== Q || (oe && Zr ? G(M, fe) : Zr === !1 ? X(M, Ve) : T === ie ? W(M, fe) : T === Y && X(M, fe));
          }
          function Me(T, M) {
            try {
              M(function(K) {
                G(T, K);
              }, function(K) {
                X(T, K);
              });
            } catch (q) {
              X(T, q);
            }
          }
          var je = 0;
          function Be() {
            return je++;
          }
          function Ee(T) {
            T[z] = je++, T._state = void 0, T._result = void 0, T._subscribers = [];
          }
          function Xr() {
            return new Error("Array Methods must be provided an Array");
          }
          var Ye = function() {
            function T(M, q) {
              this._instanceConstructor = M, this.promise = new M(H), this.promise[z] || Ee(this.promise), i(q) ? (this.length = q.length, this._remaining = q.length, this._result = new Array(this.length), this.length === 0 ? W(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(q), this._remaining === 0 && W(this.promise, this._result))) : X(this.promise, Xr());
            }
            return T.prototype._enumerate = function(q) {
              for (var K = 0; this._state === Q && K < q.length; K++)
                this._eachEntry(q[K], K);
            }, T.prototype._eachEntry = function(q, K) {
              var oe = this._instanceConstructor, fe = oe.resolve;
              if (fe === N) {
                var Ve = void 0, Zr = void 0, pi = !1;
                try {
                  Ve = q.then;
                } catch (Zu) {
                  pi = !0, Zr = Zu;
                }
                if (Ve === S && q._state !== Q)
                  this._settledAt(q._state, K, q._result);
                else if (typeof Ve != "function")
                  this._remaining--, this._result[K] = q;
                else if (oe === ke) {
                  var Xu = new oe(H);
                  pi ? X(Xu, Zr) : P(Xu, q, Ve), this._willSettleAt(Xu, K);
                } else
                  this._willSettleAt(new oe(function(Zu) {
                    return Zu(q);
                  }), K);
              } else
                this._willSettleAt(fe(q), K);
            }, T.prototype._settledAt = function(q, K, oe) {
              var fe = this.promise;
              fe._state === Q && (this._remaining--, q === Y ? X(fe, oe) : this._result[K] = oe), this._remaining === 0 && W(fe, this._result);
            }, T.prototype._willSettleAt = function(q, K) {
              var oe = this;
              pe(q, void 0, function(fe) {
                return oe._settledAt(ie, K, fe);
              }, function(fe) {
                return oe._settledAt(Y, K, fe);
              });
            }, T;
          }();
          function Ae(T) {
            return new Ye(this, T).promise;
          }
          function ze(T) {
            var M = this;
            return i(T) ? new M(function(q, K) {
              for (var oe = T.length, fe = 0; fe < oe; fe++)
                M.resolve(T[fe]).then(q, K);
            }) : new M(function(q, K) {
              return K(new TypeError("You must pass an array to race."));
            });
          }
          function Ie(T) {
            var M = this, q = new M(H);
            return X(q, T), q;
          }
          function Qe() {
            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
          }
          function et() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
          }
          var ke = function() {
            function T(M) {
              this[z] = Be(), this._result = this._state = void 0, this._subscribers = [], H !== M && (typeof M != "function" && Qe(), this instanceof T ? Me(this, M) : et());
            }
            return T.prototype.catch = function(q) {
              return this.then(null, q);
            }, T.prototype.finally = function(q) {
              var K = this, oe = K.constructor;
              return a(q) ? K.then(function(fe) {
                return oe.resolve(q()).then(function() {
                  return fe;
                });
              }, function(fe) {
                return oe.resolve(q()).then(function() {
                  throw fe;
                });
              }) : K.then(q, q);
            }, T;
          }();
          ke.prototype.then = S, ke.all = Ae, ke.race = ze, ke.resolve = N, ke.reject = Ie, ke._setScheduler = c, ke._setAsap = d, ke._asap = l;
          function ye() {
            var T = void 0;
            if (typeof jt < "u")
              T = jt;
            else if (typeof self < "u")
              T = self;
            else
              try {
                T = Function("return this")();
              } catch {
                throw new Error("polyfill failed because global object is unavailable in this environment");
              }
            var M = T.Promise;
            if (M) {
              var q = null;
              try {
                q = Object.prototype.toString.call(M.resolve());
              } catch {
              }
              if (q === "[object Promise]" && !M.cast)
                return;
            }
            T.Promise = ke;
          }
          return ke.polyfill = ye, ke.Promise = ke, ke;
        });
      }), gh = y(function(e) {
        var t = 1e5, r = /* @__PURE__ */ function() {
          var A = Object.prototype.toString, U = Object.prototype.hasOwnProperty;
          return {
            Class: function(G) {
              return A.call(G).replace(/^\[object *|\]$/g, "");
            },
            HasProperty: function(G, ae) {
              return ae in G;
            },
            HasOwnProperty: function(G, ae) {
              return U.call(G, ae);
            },
            IsCallable: function(G) {
              return typeof G == "function";
            },
            ToInt32: function(G) {
              return G >> 0;
            },
            ToUint32: function(G) {
              return G >>> 0;
            }
          };
        }(), a = Math.LN2, n = Math.abs, i = Math.floor, o = Math.log, u = Math.min, s = Math.pow, l = Math.round;
        function c(A, U, P) {
          return A < U ? U : A > P ? P : A;
        }
        var d = Object.getOwnPropertyNames || function(A) {
          if (A !== Object(A))
            throw new TypeError("Object.getOwnPropertyNames called on non-object");
          var U = [], P;
          for (P in A)
            r.HasOwnProperty(A, P) && U.push(P);
          return U;
        }, f;
        Object.defineProperty && function() {
          try {
            return Object.defineProperty({}, "x", {}), !0;
          } catch {
            return !1;
          }
        }() ? f = Object.defineProperty : f = function(U, P, G) {
          if (!U === Object(U))
            throw new TypeError("Object.defineProperty called on non-object");
          return r.HasProperty(G, "get") && Object.prototype.__defineGetter__ && Object.prototype.__defineGetter__.call(U, P, G.get), r.HasProperty(G, "set") && Object.prototype.__defineSetter__ && Object.prototype.__defineSetter__.call(U, P, G.set), r.HasProperty(G, "value") && (U[P] = G.value), U;
        };
        function p(A) {
          if (d && f) {
            var U = d(A), P;
            for (P = 0; P < U.length; P += 1)
              f(A, U[P], {
                value: A[U[P]],
                writable: !1,
                enumerable: !1,
                configurable: !1
              });
          }
        }
        function m(A) {
          if (!f)
            return;
          if (A.length > t)
            throw new RangeError("Array too large for polyfill");
          function U(G) {
            f(A, G, {
              get: function() {
                return A._getter(G);
              },
              set: function(W) {
                A._setter(G, W);
              },
              enumerable: !0,
              configurable: !1
            });
          }
          var P;
          for (P = 0; P < A.length; P += 1)
            U(P);
        }
        function h(A, U) {
          var P = 32 - U;
          return A << P >> P;
        }
        function v(A, U) {
          var P = 32 - U;
          return A << P >>> P;
        }
        function g(A) {
          return [A & 255];
        }
        function b(A) {
          return h(A[0], 8);
        }
        function D(A) {
          return [A & 255];
        }
        function w(A) {
          return v(A[0], 8);
        }
        function _(A) {
          return A = l(Number(A)), [A < 0 ? 0 : A > 255 ? 255 : A & 255];
        }
        function F(A) {
          return [A >> 8 & 255, A & 255];
        }
        function R(A) {
          return h(A[0] << 8 | A[1], 16);
        }
        function I(A) {
          return [A >> 8 & 255, A & 255];
        }
        function V(A) {
          return v(A[0] << 8 | A[1], 16);
        }
        function S(A) {
          return [A >> 24 & 255, A >> 16 & 255, A >> 8 & 255, A & 255];
        }
        function N(A) {
          return h(A[0] << 24 | A[1] << 16 | A[2] << 8 | A[3], 32);
        }
        function z(A) {
          return [A >> 24 & 255, A >> 16 & 255, A >> 8 & 255, A & 255];
        }
        function H(A) {
          return v(A[0] << 24 | A[1] << 16 | A[2] << 8 | A[3], 32);
        }
        function Q(A, U, P) {
          var G = (1 << U - 1) - 1, ae, W, X, pe, be, xe, Me;
          function je(Be) {
            var Ee = i(Be), Xr = Be - Ee;
            return Xr < 0.5 ? Ee : Xr > 0.5 || Ee % 2 ? Ee + 1 : Ee;
          }
          for (A !== A ? (W = (1 << U) - 1, X = s(2, P - 1), ae = 0) : A === 1 / 0 || A === -1 / 0 ? (W = (1 << U) - 1, X = 0, ae = A < 0 ? 1 : 0) : A === 0 ? (W = 0, X = 0, ae = 1 / A === -1 / 0 ? 1 : 0) : (ae = A < 0, A = n(A), A >= s(2, 1 - G) ? (W = u(i(o(A) / a), 1023), X = je(A / s(2, W) * s(2, P)), X / s(2, P) >= 2 && (W = W + 1, X = 1), W > G ? (W = (1 << U) - 1, X = 0) : (W = W + G, X = X - s(2, P))) : (W = 0, X = je(A / s(2, 1 - G - P)))), be = [], pe = P; pe; pe -= 1)
            be.push(X % 2 ? 1 : 0), X = i(X / 2);
          for (pe = U; pe; pe -= 1)
            be.push(W % 2 ? 1 : 0), W = i(W / 2);
          for (be.push(ae ? 1 : 0), be.reverse(), xe = be.join(""), Me = []; xe.length; )
            Me.push(parseInt(xe.substring(0, 8), 2)), xe = xe.substring(8);
          return Me;
        }
        function ie(A, U, P) {
          var G = [], ae, W, X, pe, be, xe, Me, je;
          for (ae = A.length; ae; ae -= 1)
            for (X = A[ae - 1], W = 8; W; W -= 1)
              G.push(X % 2 ? 1 : 0), X = X >> 1;
          return G.reverse(), pe = G.join(""), be = (1 << U - 1) - 1, xe = parseInt(pe.substring(0, 1), 2) ? -1 : 1, Me = parseInt(pe.substring(1, 1 + U), 2), je = parseInt(pe.substring(1 + U), 2), Me === (1 << U) - 1 ? je === 0 ? xe * (1 / 0) : NaN : Me > 0 ? xe * s(2, Me - be) * (1 + je / s(2, P)) : je !== 0 ? xe * s(2, -(be - 1)) * (je / s(2, P)) : xe < 0 ? -0 : 0;
        }
        function Y(A) {
          return ie(A, 11, 52);
        }
        function te(A) {
          return Q(A, 11, 52);
        }
        function B(A) {
          return ie(A, 8, 23);
        }
        function Z(A) {
          return Q(A, 8, 23);
        }
        (function() {
          function A(Be) {
            if (Be = r.ToInt32(Be), Be < 0)
              throw new RangeError("ArrayBuffer size is not a small enough positive integer");
            this.byteLength = Be, this._bytes = [], this._bytes.length = Be;
            var Ee;
            for (Ee = 0; Ee < this.byteLength; Ee += 1)
              this._bytes[Ee] = 0;
            p(this);
          }
          e.ArrayBuffer = e.ArrayBuffer || A;
          function U() {
          }
          function P(Be, Ee, Xr) {
            var Ye;
            return Ye = function(ze, Ie, Qe) {
              var et, ke, ye, T;
              if (!arguments.length || typeof arguments[0] == "number") {
                if (this.length = r.ToInt32(arguments[0]), Qe < 0)
                  throw new RangeError("ArrayBufferView size is not a small enough positive integer");
                this.byteLength = this.length * this.BYTES_PER_ELEMENT, this.buffer = new A(this.byteLength), this.byteOffset = 0;
              } else if (O(arguments[0]) === "object" && arguments[0].constructor === Ye)
                for (et = arguments[0], this.length = et.length, this.byteLength = this.length * this.BYTES_PER_ELEMENT, this.buffer = new A(this.byteLength), this.byteOffset = 0, ye = 0; ye < this.length; ye += 1)
                  this._setter(ye, et._getter(ye));
              else if (O(arguments[0]) === "object" && !(arguments[0] instanceof A || r.Class(arguments[0]) === "ArrayBuffer"))
                for (ke = arguments[0], this.length = r.ToUint32(ke.length), this.byteLength = this.length * this.BYTES_PER_ELEMENT, this.buffer = new A(this.byteLength), this.byteOffset = 0, ye = 0; ye < this.length; ye += 1)
                  T = ke[ye], this._setter(ye, Number(T));
              else if (O(arguments[0]) === "object" && (arguments[0] instanceof A || r.Class(arguments[0]) === "ArrayBuffer")) {
                if (this.buffer = ze, this.byteOffset = r.ToUint32(Ie), this.byteOffset > this.buffer.byteLength)
                  throw new RangeError("byteOffset out of range");
                if (this.byteOffset % this.BYTES_PER_ELEMENT)
                  throw new RangeError("ArrayBuffer length minus the byteOffset is not a multiple of the element size.");
                if (arguments.length < 3) {
                  if (this.byteLength = this.buffer.byteLength - this.byteOffset, this.byteLength % this.BYTES_PER_ELEMENT)
                    throw new RangeError("length of buffer minus byteOffset not a multiple of the element size");
                  this.length = this.byteLength / this.BYTES_PER_ELEMENT;
                } else
                  this.length = r.ToUint32(Qe), this.byteLength = this.length * this.BYTES_PER_ELEMENT;
                if (this.byteOffset + this.byteLength > this.buffer.byteLength)
                  throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
              } else
                throw new TypeError("Unexpected argument type(s)");
              this.constructor = Ye, p(this), m(this);
            }, Ye.prototype = new U(), Ye.prototype.BYTES_PER_ELEMENT = Be, Ye.prototype._pack = Ee, Ye.prototype._unpack = Xr, Ye.BYTES_PER_ELEMENT = Be, Ye.prototype._getter = function(Ae) {
              if (arguments.length < 1)
                throw new SyntaxError("Not enough arguments");
              if (Ae = r.ToUint32(Ae), !(Ae >= this.length)) {
                for (var ze = [], Ie = 0, Qe = this.byteOffset + Ae * this.BYTES_PER_ELEMENT; Ie < this.BYTES_PER_ELEMENT; Ie += 1, Qe += 1)
                  ze.push(this.buffer._bytes[Qe]);
                return this._unpack(ze);
              }
            }, Ye.prototype.get = Ye.prototype._getter, Ye.prototype._setter = function(Ae, ze) {
              if (arguments.length < 2)
                throw new SyntaxError("Not enough arguments");
              if (Ae = r.ToUint32(Ae), Ae < this.length) {
                var Ie = this._pack(ze), Qe, et;
                for (Qe = 0, et = this.byteOffset + Ae * this.BYTES_PER_ELEMENT; Qe < this.BYTES_PER_ELEMENT; Qe += 1, et += 1)
                  this.buffer._bytes[et] = Ie[Qe];
              }
            }, Ye.prototype.set = function(Ae, ze) {
              if (arguments.length < 1)
                throw new SyntaxError("Not enough arguments");
              var Ie, Qe, et, ke, ye, T, M, q, K, oe;
              if (O(arguments[0]) === "object" && arguments[0].constructor === this.constructor) {
                if (Ie = arguments[0], et = r.ToUint32(arguments[1]), et + Ie.length > this.length)
                  throw new RangeError("Offset plus length of array is out of range");
                if (q = this.byteOffset + et * this.BYTES_PER_ELEMENT, K = Ie.length * this.BYTES_PER_ELEMENT, Ie.buffer === this.buffer) {
                  for (oe = [], ye = 0, T = Ie.byteOffset; ye < K; ye += 1, T += 1)
                    oe[ye] = Ie.buffer._bytes[T];
                  for (ye = 0, M = q; ye < K; ye += 1, M += 1)
                    this.buffer._bytes[M] = oe[ye];
                } else
                  for (ye = 0, T = Ie.byteOffset, M = q; ye < K; ye += 1, T += 1, M += 1)
                    this.buffer._bytes[M] = Ie.buffer._bytes[T];
              } else if (O(arguments[0]) === "object" && typeof arguments[0].length < "u") {
                if (Qe = arguments[0], ke = r.ToUint32(Qe.length), et = r.ToUint32(arguments[1]), et + ke > this.length)
                  throw new RangeError("Offset plus length of array is out of range");
                for (ye = 0; ye < ke; ye += 1)
                  T = Qe[ye], this._setter(et + ye, Number(T));
              } else
                throw new TypeError("Unexpected argument type(s)");
            }, Ye.prototype.subarray = function(Ae, ze) {
              Ae = r.ToInt32(Ae), ze = r.ToInt32(ze), arguments.length < 1 && (Ae = 0), arguments.length < 2 && (ze = this.length), Ae < 0 && (Ae = this.length + Ae), ze < 0 && (ze = this.length + ze), Ae = c(Ae, 0, this.length), ze = c(ze, 0, this.length);
              var Ie = ze - Ae;
              return Ie < 0 && (Ie = 0), new this.constructor(this.buffer, this.byteOffset + Ae * this.BYTES_PER_ELEMENT, Ie);
            }, Ye;
          }
          var G = P(1, g, b), ae = P(1, D, w), W = P(1, _, w), X = P(2, F, R), pe = P(2, I, V), be = P(4, S, N), xe = P(4, z, H), Me = P(4, Z, B), je = P(8, te, Y);
          e.Int8Array = e.Int8Array || G, e.Uint8Array = e.Uint8Array || ae, e.Uint8ClampedArray = e.Uint8ClampedArray || W, e.Int16Array = e.Int16Array || X, e.Uint16Array = e.Uint16Array || pe, e.Int32Array = e.Int32Array || be, e.Uint32Array = e.Uint32Array || xe, e.Float32Array = e.Float32Array || Me, e.Float64Array = e.Float64Array || je;
        })(), function() {
          function A(W, X) {
            return r.IsCallable(W.get) ? W.get(X) : W[X];
          }
          var U = function() {
            var W = new e.Uint16Array([4660]), X = new e.Uint8Array(W.buffer);
            return A(X, 0) === 18;
          }();
          function P(W, X, pe) {
            if (arguments.length === 0)
              W = new e.ArrayBuffer(0);
            else if (!(W instanceof e.ArrayBuffer || r.Class(W) === "ArrayBuffer"))
              throw new TypeError("TypeError");
            if (this.buffer = W || new e.ArrayBuffer(0), this.byteOffset = r.ToUint32(X), this.byteOffset > this.buffer.byteLength)
              throw new RangeError("byteOffset out of range");
            if (arguments.length < 3 ? this.byteLength = this.buffer.byteLength - this.byteOffset : this.byteLength = r.ToUint32(pe), this.byteOffset + this.byteLength > this.buffer.byteLength)
              throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");
            p(this);
          }
          function G(W) {
            return function(X, pe) {
              if (X = r.ToUint32(X), X + W.BYTES_PER_ELEMENT > this.byteLength)
                throw new RangeError("Array index out of range");
              X += this.byteOffset;
              var be = new e.Uint8Array(this.buffer, X, W.BYTES_PER_ELEMENT), xe = [], Me;
              for (Me = 0; Me < W.BYTES_PER_ELEMENT; Me += 1)
                xe.push(A(be, Me));
              return !!pe == !!U && xe.reverse(), A(new W(new e.Uint8Array(xe).buffer), 0);
            };
          }
          P.prototype.getUint8 = G(e.Uint8Array), P.prototype.getInt8 = G(e.Int8Array), P.prototype.getUint16 = G(e.Uint16Array), P.prototype.getInt16 = G(e.Int16Array), P.prototype.getUint32 = G(e.Uint32Array), P.prototype.getInt32 = G(e.Int32Array), P.prototype.getFloat32 = G(e.Float32Array), P.prototype.getFloat64 = G(e.Float64Array);
          function ae(W) {
            return function(X, pe, be) {
              if (X = r.ToUint32(X), X + W.BYTES_PER_ELEMENT > this.byteLength)
                throw new RangeError("Array index out of range");
              var xe = new W([pe]), Me = new e.Uint8Array(xe.buffer), je = [], Be, Ee;
              for (Be = 0; Be < W.BYTES_PER_ELEMENT; Be += 1)
                je.push(A(Me, Be));
              !!be == !!U && je.reverse(), Ee = new e.Uint8Array(this.buffer, X, W.BYTES_PER_ELEMENT), Ee.set(je);
            };
          }
          P.prototype.setUint8 = ae(e.Uint8Array), P.prototype.setInt8 = ae(e.Int8Array), P.prototype.setUint16 = ae(e.Uint16Array), P.prototype.setInt16 = ae(e.Int16Array), P.prototype.setUint32 = ae(e.Uint32Array), P.prototype.setInt32 = ae(e.Int32Array), P.prototype.setFloat32 = ae(e.Float32Array), P.prototype.setFloat64 = ae(e.Float64Array), e.DataView = e.DataView || P;
        }();
      }), bh = y(function(e) {
        (function(t) {
          if (t.WeakMap)
            return;
          var r = Object.prototype.hasOwnProperty, a = Object.defineProperty && function() {
            try {
              return Object.defineProperty({}, "x", {
                value: 1
              }).x === 1;
            } catch {
            }
          }(), n = function(u, s, l) {
            a ? Object.defineProperty(u, s, {
              configurable: !0,
              writable: !0,
              value: l
            }) : u[s] = l;
          };
          t.WeakMap = function() {
            function o() {
              if (this === void 0)
                throw new TypeError("Constructor WeakMap requires 'new'");
              if (n(this, "_id", s("_WeakMap")), arguments.length > 0)
                throw new TypeError("WeakMap iterable is not supported");
            }
            n(o.prototype, "delete", function(c) {
              if (u(this, "delete"), !i(c))
                return !1;
              var d = c[this._id];
              return d && d[0] === c ? (delete c[this._id], !0) : !1;
            }), n(o.prototype, "get", function(c) {
              if (u(this, "get"), !!i(c)) {
                var d = c[this._id];
                if (d && d[0] === c)
                  return d[1];
              }
            }), n(o.prototype, "has", function(c) {
              if (u(this, "has"), !i(c))
                return !1;
              var d = c[this._id];
              return !!(d && d[0] === c);
            }), n(o.prototype, "set", function(c, d) {
              if (u(this, "set"), !i(c))
                throw new TypeError("Invalid value used as weak map key");
              var f = c[this._id];
              return f && f[0] === c ? (f[1] = d, this) : (n(c, this._id, [c, d]), this);
            });
            function u(c, d) {
              if (!i(c) || !r.call(c, "_id"))
                throw new TypeError(d + " method called on incompatible receiver " + O(c));
            }
            function s(c) {
              return c + "_" + l() + "." + l();
            }
            function l() {
              return Math.random().toString().substring(2);
            }
            return n(o, "_polyfill", !0), o;
          }();
          function i(o) {
            return Object(o) === o;
          }
        })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof E < "u" ? E : typeof jt < "u" ? jt : e);
      }), St = y(function(e, t) {
        var r = function(n) {
          return n && n.Math === Math && n;
        };
        t.exports = r((typeof globalThis > "u" ? "undefined" : O(globalThis)) == "object" && globalThis) || r((typeof E > "u" ? "undefined" : O(E)) == "object" && E) || r((typeof self > "u" ? "undefined" : O(self)) == "object" && self) || r((typeof jt > "u" ? "undefined" : O(jt)) == "object" && jt) || /* @__PURE__ */ function() {
          return this;
        }() || e || Function("return this")();
      }), _t = y(function(e, t) {
        t.exports = function(r) {
          try {
            return !!r();
          } catch {
            return !0;
          }
        };
      }), Ua = y(function(e, t) {
        var r = _t();
        t.exports = !r(function() {
          var a = function() {
          }.bind();
          return typeof a != "function" || a.hasOwnProperty("prototype");
        });
      }), yh = y(function(e, t) {
        var r = Ua(), a = Function.prototype, n = a.apply, i = a.call;
        t.exports = (typeof Reflect > "u" ? "undefined" : O(Reflect)) == "object" && Reflect.apply || (r ? i.bind(n) : function() {
          return i.apply(n, arguments);
        });
      }), mt = y(function(e, t) {
        var r = Ua(), a = Function.prototype, n = a.call, i = r && a.bind.bind(n, n);
        t.exports = r ? i : function(o) {
          return function() {
            return n.apply(o, arguments);
          };
        };
      }), xi = y(function(e, t) {
        var r = mt(), a = r({}.toString), n = r("".slice);
        t.exports = function(i) {
          return n(a(i), 8, -1);
        };
      }), Ds = y(function(e, t) {
        var r = xi(), a = mt();
        t.exports = function(n) {
          if (r(n) === "Function")
            return a(n);
        };
      }), _s = y(function(e, t) {
        var r = (typeof L > "u" ? "undefined" : O(L)) == "object" && L.all, a = typeof r > "u" && r !== void 0;
        t.exports = {
          all: r,
          IS_HTMLDDA: a
        };
      }), rt = y(function(e, t) {
        var r = _s(), a = r.all;
        t.exports = r.IS_HTMLDDA ? function(n) {
          return typeof n == "function" || n === a;
        } : function(n) {
          return typeof n == "function";
        };
      }), Jt = y(function(e, t) {
        var r = _t();
        t.exports = !r(function() {
          return Object.defineProperty({}, 1, {
            get: function() {
              return 7;
            }
          })[1] !== 7;
        });
      }), mr = y(function(e, t) {
        var r = Ua(), a = Function.prototype.call;
        t.exports = r ? a.bind(a) : function() {
          return a.apply(a, arguments);
        };
      }), xs = y(function(e) {
        var t = {}.propertyIsEnumerable, r = Object.getOwnPropertyDescriptor, a = r && !t.call({
          1: 2
        }, 1);
        e.f = a ? function(i) {
          var o = r(this, i);
          return !!o && o.enumerable;
        } : t;
      }), Ga = y(function(e, t) {
        t.exports = function(r, a) {
          return {
            enumerable: !(r & 1),
            configurable: !(r & 2),
            writable: !(r & 4),
            value: a
          };
        };
      }), wh = y(function(e, t) {
        var r = mt(), a = _t(), n = xi(), i = Object, o = r("".split);
        t.exports = a(function() {
          return !i("z").propertyIsEnumerable(0);
        }) ? function(u) {
          return n(u) === "String" ? o(u, "") : i(u);
        } : i;
      }), Ei = y(function(e, t) {
        t.exports = function(r) {
          return r == null;
        };
      }), Ai = y(function(e, t) {
        var r = Ei(), a = TypeError;
        t.exports = function(n) {
          if (r(n))
            throw new a("Can't call method on " + n);
          return n;
        };
      }), ta = y(function(e, t) {
        var r = wh(), a = Ai();
        t.exports = function(n) {
          return r(a(n));
        };
      }), Sr = y(function(e, t) {
        var r = rt(), a = _s(), n = a.all;
        t.exports = a.IS_HTMLDDA ? function(i) {
          return O(i) == "object" ? i !== null : r(i) || i === n;
        } : function(i) {
          return O(i) == "object" ? i !== null : r(i);
        };
      }), ra = y(function(e, t) {
        t.exports = {};
      }), Ci = y(function(e, t) {
        var r = ra(), a = St(), n = rt(), i = function(u) {
          return n(u) ? u : void 0;
        };
        t.exports = function(o, u) {
          return arguments.length < 2 ? i(r[o]) || i(a[o]) : r[o] && r[o][u] || a[o] && a[o][u];
        };
      }), Dh = y(function(e, t) {
        var r = mt();
        t.exports = r({}.isPrototypeOf);
      }), _h = y(function(e, t) {
        t.exports = typeof navigator < "u" && String(navigator.userAgent) || "";
      }), xh = y(function(e, t) {
        var r = St(), a = _h(), n = r.process, i = r.Deno, o = n && n.versions || i && i.version, u = o && o.v8, s, l;
        u && (s = u.split("."), l = s[0] > 0 && s[0] < 4 ? 1 : +(s[0] + s[1])), !l && a && (s = a.match(/Edge\/(\d+)/), (!s || s[1] >= 74) && (s = a.match(/Chrome\/(\d+)/), s && (l = +s[1]))), t.exports = l;
      }), Es = y(function(e, t) {
        var r = xh(), a = _t(), n = St(), i = n.String;
        t.exports = !!Object.getOwnPropertySymbols && !a(function() {
          var o = Symbol("symbol detection");
          return !i(o) || !(Object(o) instanceof Symbol) || !Symbol.sham && r && r < 41;
        });
      }), As = y(function(e, t) {
        var r = Es();
        t.exports = r && !Symbol.sham && O(Symbol.iterator) == "symbol";
      }), Cs = y(function(e, t) {
        var r = Ci(), a = rt(), n = Dh(), i = As(), o = Object;
        t.exports = i ? function(u) {
          return O(u) == "symbol";
        } : function(u) {
          var s = r("Symbol");
          return a(s) && n(s.prototype, o(u));
        };
      }), Fs = y(function(e, t) {
        var r = String;
        t.exports = function(a) {
          try {
            return r(a);
          } catch {
            return "Object";
          }
        };
      }), Wa = y(function(e, t) {
        var r = rt(), a = Fs(), n = TypeError;
        t.exports = function(i) {
          if (r(i))
            return i;
          throw new n(a(i) + " is not a function");
        };
      }), Fi = y(function(e, t) {
        var r = Wa(), a = Ei();
        t.exports = function(n, i) {
          var o = n[i];
          return a(o) ? void 0 : r(o);
        };
      }), Eh = y(function(e, t) {
        var r = mr(), a = rt(), n = Sr(), i = TypeError;
        t.exports = function(o, u) {
          var s, l;
          if (u === "string" && a(s = o.toString) && !n(l = r(s, o)) || a(s = o.valueOf) && !n(l = r(s, o)) || u !== "string" && a(s = o.toString) && !n(l = r(s, o)))
            return l;
          throw new i("Can't convert object to primitive value");
        };
      }), Ti = y(function(e, t) {
        t.exports = !0;
      }), Ah = y(function(e, t) {
        var r = St(), a = Object.defineProperty;
        t.exports = function(n, i) {
          try {
            a(r, n, {
              value: i,
              configurable: !0,
              writable: !0
            });
          } catch {
            r[n] = i;
          }
          return i;
        };
      }), Ri = y(function(e, t) {
        var r = St(), a = Ah(), n = "__core-js_shared__", i = r[n] || a(n, {});
        t.exports = i;
      }), Ts = y(function(e, t) {
        var r = Ti(), a = Ri();
        (t.exports = function(n, i) {
          return a[n] || (a[n] = i !== void 0 ? i : {});
        })("versions", []).push({
          version: "3.33.0",
          mode: r ? "pure" : "global",
          copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
          license: "https://github.com/zloirock/core-js/blob/v3.33.0/LICENSE",
          source: "https://github.com/zloirock/core-js"
        });
      }), Si = y(function(e, t) {
        var r = Ai(), a = Object;
        t.exports = function(n) {
          return a(r(n));
        };
      }), zt = y(function(e, t) {
        var r = mt(), a = Si(), n = r({}.hasOwnProperty);
        t.exports = Object.hasOwn || function(o, u) {
          return n(a(o), u);
        };
      }), Rs = y(function(e, t) {
        var r = mt(), a = 0, n = Math.random(), i = r(1 .toString);
        t.exports = function(o) {
          return "Symbol(" + (o === void 0 ? "" : o) + ")_" + i(++a + n, 36);
        };
      }), Vt = y(function(e, t) {
        var r = St(), a = Ts(), n = zt(), i = Rs(), o = Es(), u = As(), s = r.Symbol, l = a("wks"), c = u ? s.for || s : s && s.withoutSetter || i;
        t.exports = function(d) {
          return n(l, d) || (l[d] = o && n(s, d) ? s[d] : c("Symbol." + d)), l[d];
        };
      }), Ch = y(function(e, t) {
        var r = mr(), a = Sr(), n = Cs(), i = Fi(), o = Eh(), u = Vt(), s = TypeError, l = u("toPrimitive");
        t.exports = function(c, d) {
          if (!a(c) || n(c))
            return c;
          var f = i(c, l), p;
          if (f) {
            if (d === void 0 && (d = "default"), p = r(f, c, d), !a(p) || n(p))
              return p;
            throw new s("Can't convert object to primitive value");
          }
          return d === void 0 && (d = "number"), o(c, d);
        };
      }), ki = y(function(e, t) {
        var r = Ch(), a = Cs();
        t.exports = function(n) {
          var i = r(n, "string");
          return a(i) ? i : i + "";
        };
      }), Ss = y(function(e, t) {
        var r = St(), a = Sr(), n = r.document, i = a(n) && a(n.createElement);
        t.exports = function(o) {
          return i ? n.createElement(o) : {};
        };
      }), ks = y(function(e, t) {
        var r = Jt(), a = _t(), n = Ss();
        t.exports = !r && !a(function() {
          return Object.defineProperty(n("div"), "a", {
            get: function() {
              return 7;
            }
          }).a !== 7;
        });
      }), Fh = y(function(e) {
        var t = Jt(), r = mr(), a = xs(), n = Ga(), i = ta(), o = ki(), u = zt(), s = ks(), l = Object.getOwnPropertyDescriptor;
        e.f = t ? l : function(d, f) {
          if (d = i(d), f = o(f), s)
            try {
              return l(d, f);
            } catch {
            }
          if (u(d, f))
            return n(!r(a.f, d, f), d[f]);
        };
      }), Th = y(function(e, t) {
        var r = _t(), a = rt(), n = /#|\.prototype\./, i = function(d, f) {
          var p = u[o(d)];
          return p === l ? !0 : p === s ? !1 : a(f) ? r(f) : !!f;
        }, o = i.normalize = function(c) {
          return String(c).replace(n, ".").toLowerCase();
        }, u = i.data = {}, s = i.NATIVE = "N", l = i.POLYFILL = "P";
        t.exports = i;
      }), Os = y(function(e, t) {
        var r = Ds(), a = Wa(), n = Ua(), i = r(r.bind);
        t.exports = function(o, u) {
          return a(o), u === void 0 ? o : n ? i(o, u) : function() {
            return o.apply(u, arguments);
          };
        };
      }), Ms = y(function(e, t) {
        var r = Jt(), a = _t();
        t.exports = r && a(function() {
          return Object.defineProperty(function() {
          }, "prototype", {
            value: 42,
            writable: !1
          }).prototype !== 42;
        });
      }), hr = y(function(e, t) {
        var r = Sr(), a = String, n = TypeError;
        t.exports = function(i) {
          if (r(i))
            return i;
          throw new n(a(i) + " is not an object");
        };
      }), Ya = y(function(e) {
        var t = Jt(), r = ks(), a = Ms(), n = hr(), i = ki(), o = TypeError, u = Object.defineProperty, s = Object.getOwnPropertyDescriptor, l = "enumerable", c = "configurable", d = "writable";
        e.f = t ? a ? function(p, m, h) {
          if (n(p), m = i(m), n(h), typeof p == "function" && m === "prototype" && "value" in h && d in h && !h[d]) {
            var v = s(p, m);
            v && v[d] && (p[m] = h.value, h = {
              configurable: c in h ? h[c] : v[c],
              enumerable: l in h ? h[l] : v[l],
              writable: !1
            });
          }
          return u(p, m, h);
        } : u : function(p, m, h) {
          if (n(p), m = i(m), n(h), r)
            try {
              return u(p, m, h);
            } catch {
            }
          if ("get" in h || "set" in h)
            throw new o("Accessors not supported");
          return "value" in h && (p[m] = h.value), p;
        };
      }), aa = y(function(e, t) {
        var r = Jt(), a = Ya(), n = Ga();
        t.exports = r ? function(i, o, u) {
          return a.f(i, o, n(1, u));
        } : function(i, o, u) {
          return i[o] = u, i;
        };
      }), Ka = y(function(e, t) {
        var r = St(), a = yh(), n = Ds(), i = rt(), o = Fh().f, u = Th(), s = ra(), l = Os(), c = aa(), d = zt(), f = function(m) {
          var h = function(g, b, D) {
            if (this instanceof h) {
              switch (arguments.length) {
                case 0:
                  return new m();
                case 1:
                  return new m(g);
                case 2:
                  return new m(g, b);
              }
              return new m(g, b, D);
            }
            return a(m, this, arguments);
          };
          return h.prototype = m.prototype, h;
        };
        t.exports = function(p, m) {
          var h = p.target, v = p.global, g = p.stat, b = p.proto, D = v ? r : g ? r[h] : (r[h] || {}).prototype, w = v ? s : s[h] || c(s, h, {})[h], _ = w.prototype, F, R, I, V, S, N, z, H, Q;
          for (V in m)
            F = u(v ? V : h + (g ? "." : "#") + V, p.forced), R = !F && D && d(D, V), N = w[V], R && (p.dontCallGetSet ? (Q = o(D, V), z = Q && Q.value) : z = D[V]), S = R && z ? z : m[V], !(R && O(N) == O(S)) && (p.bind && R ? H = l(S, r) : p.wrap && R ? H = f(S) : b && i(S) ? H = n(S) : H = S, (p.sham || S && S.sham || N && N.sham) && c(H, "sham", !0), c(w, V, H), b && (I = h + "Prototype", d(s, I) || c(s, I, {}), c(s[I], V, S), p.real && _ && (F || !_[V]) && c(_, V, S)));
        };
      }), Rh = y(function() {
        var e = Ka(), t = zt();
        e({
          target: "Object",
          stat: !0
        }, {
          hasOwn: t
        });
      }), Sh = y(function(e, t) {
        Rh();
        var r = ra();
        t.exports = r.Object.hasOwn;
      }), kh = y(function(e, t) {
        var r = Sh();
        t.exports = r;
      }), Oh = y(function(e, t) {
        var r = kh();
        t.exports = r;
      }), Oi = y(function(e, t) {
        var r = Ts(), a = Rs(), n = r("keys");
        t.exports = function(i) {
          return n[i] || (n[i] = a(i));
        };
      }), Mh = y(function(e, t) {
        var r = _t();
        t.exports = !r(function() {
          function a() {
          }
          return a.prototype.constructor = null, Object.getPrototypeOf(new a()) !== a.prototype;
        });
      }), Mi = y(function(e, t) {
        var r = zt(), a = rt(), n = Si(), i = Oi(), o = Mh(), u = i("IE_PROTO"), s = Object, l = s.prototype;
        t.exports = o ? s.getPrototypeOf : function(c) {
          var d = n(c);
          if (r(d, u))
            return d[u];
          var f = d.constructor;
          return a(f) && d instanceof f ? f.prototype : d instanceof s ? l : null;
        };
      }), Ih = y(function(e, t) {
        var r = Math.ceil, a = Math.floor;
        t.exports = Math.trunc || function(i) {
          var o = +i;
          return (o > 0 ? a : r)(o);
        };
      }), Ii = y(function(e, t) {
        var r = Ih();
        t.exports = function(a) {
          var n = +a;
          return n !== n || n === 0 ? 0 : r(n);
        };
      }), Ph = y(function(e, t) {
        var r = Ii(), a = Math.max, n = Math.min;
        t.exports = function(i, o) {
          var u = r(i);
          return u < 0 ? a(u + o, 0) : n(u, o);
        };
      }), Nh = y(function(e, t) {
        var r = Ii(), a = Math.min;
        t.exports = function(n) {
          return n > 0 ? a(r(n), 9007199254740991) : 0;
        };
      }), Is = y(function(e, t) {
        var r = Nh();
        t.exports = function(a) {
          return r(a.length);
        };
      }), Lh = y(function(e, t) {
        var r = ta(), a = Ph(), n = Is(), i = function(u) {
          return function(s, l, c) {
            var d = r(s), f = n(d), p = a(c, f), m;
            if (u && l !== l) {
              for (; f > p; )
                if (m = d[p++], m !== m)
                  return !0;
            } else
              for (; f > p; p++)
                if ((u || p in d) && d[p] === l)
                  return u || p || 0;
            return !u && -1;
          };
        };
        t.exports = {
          includes: i(!0),
          indexOf: i(!1)
        };
      }), Pi = y(function(e, t) {
        t.exports = {};
      }), Bh = y(function(e, t) {
        var r = mt(), a = zt(), n = ta(), i = Lh().indexOf, o = Pi(), u = r([].push);
        t.exports = function(s, l) {
          var c = n(s), d = 0, f = [], p;
          for (p in c)
            !a(o, p) && a(c, p) && u(f, p);
          for (; l.length > d; )
            a(c, p = l[d++]) && (~i(f, p) || u(f, p));
          return f;
        };
      }), Ps = y(function(e, t) {
        t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
      }), Ns = y(function(e, t) {
        var r = Bh(), a = Ps();
        t.exports = Object.keys || function(i) {
          return r(i, a);
        };
      }), qh = y(function(e, t) {
        var r = Jt(), a = _t(), n = mt(), i = Mi(), o = Ns(), u = ta(), s = xs().f, l = n(s), c = n([].push), d = r && a(function() {
          var p = /* @__PURE__ */ Object.create(null);
          return p[2] = 2, !l(p, 2);
        }), f = function(m) {
          return function(h) {
            for (var v = u(h), g = o(v), b = d && i(v) === null, D = g.length, w = 0, _ = [], F; D > w; )
              F = g[w++], (!r || (b ? F in v : l(v, F))) && c(_, m ? [F, v[F]] : v[F]);
            return _;
          };
        };
        t.exports = {
          entries: f(!0),
          values: f(!1)
        };
      }), jh = y(function() {
        var e = Ka(), t = qh().values;
        e({
          target: "Object",
          stat: !0
        }, {
          values: function(a) {
            return t(a);
          }
        });
      }), zh = y(function(e, t) {
        jh();
        var r = ra();
        t.exports = r.Object.values;
      }), Vh = y(function(e, t) {
        var r = zh();
        t.exports = r;
      }), Hh = y(function(e, t) {
        var r = Vh();
        t.exports = r;
      }), Ni = y(function(e, t) {
        var r = Vt(), a = r("toStringTag"), n = {};
        n[a] = "z", t.exports = String(n) === "[object z]";
      }), Xa = y(function(e, t) {
        var r = Ni(), a = rt(), n = xi(), i = Vt(), o = i("toStringTag"), u = Object, s = n(/* @__PURE__ */ function() {
          return arguments;
        }()) === "Arguments", l = function(d, f) {
          try {
            return d[f];
          } catch {
          }
        };
        t.exports = r ? n : function(c) {
          var d, f, p;
          return c === void 0 ? "Undefined" : c === null ? "Null" : typeof (f = l(d = u(c), o)) == "string" ? f : s ? n(d) : (p = n(d)) === "Object" && a(d.callee) ? "Arguments" : p;
        };
      }), Ls = y(function(e, t) {
        var r = Xa(), a = String;
        t.exports = function(n) {
          if (r(n) === "Symbol")
            throw new TypeError("Cannot convert a Symbol value to a string");
          return a(n);
        };
      }), $h = y(function(e, t) {
        var r = mt(), a = Ii(), n = Ls(), i = Ai(), o = r("".charAt), u = r("".charCodeAt), s = r("".slice), l = function(d) {
          return function(f, p) {
            var m = n(i(f)), h = a(p), v = m.length, g, b;
            return h < 0 || h >= v ? d ? "" : void 0 : (g = u(m, h), g < 55296 || g > 56319 || h + 1 === v || (b = u(m, h + 1)) < 56320 || b > 57343 ? d ? o(m, h) : g : d ? s(m, h, h + 2) : (g - 55296 << 10) + (b - 56320) + 65536);
          };
        };
        t.exports = {
          codeAt: l(!1),
          charAt: l(!0)
        };
      }), Uh = y(function(e, t) {
        var r = St(), a = rt(), n = r.WeakMap;
        t.exports = a(n) && /native code/.test(String(n));
      }), Gh = y(function(e, t) {
        var r = Uh(), a = St(), n = Sr(), i = aa(), o = zt(), u = Ri(), s = Oi(), l = Pi(), c = "Object already initialized", d = a.TypeError, f = a.WeakMap, p, m, h, v = function(_) {
          return h(_) ? m(_) : p(_, {});
        }, g = function(_) {
          return function(F) {
            var R;
            if (!n(F) || (R = m(F)).type !== _)
              throw new d("Incompatible receiver, " + _ + " required");
            return R;
          };
        };
        r || u.state ? (b = u.state || (u.state = new f()), b.get = b.get, b.has = b.has, b.set = b.set, p = function(_, F) {
          if (b.has(_))
            throw new d(c);
          return F.facade = _, b.set(_, F), F;
        }, m = function(_) {
          return b.get(_) || {};
        }, h = function(_) {
          return b.has(_);
        }) : (D = s("state"), l[D] = !0, p = function(_, F) {
          if (o(_, D))
            throw new d(c);
          return F.facade = _, i(_, D, F), F;
        }, m = function(_) {
          return o(_, D) ? _[D] : {};
        }, h = function(_) {
          return o(_, D);
        });
        var b, D;
        t.exports = {
          set: p,
          get: m,
          has: h,
          enforce: v,
          getterFor: g
        };
      }), Wh = y(function(e, t) {
        var r = Jt(), a = zt(), n = Function.prototype, i = r && Object.getOwnPropertyDescriptor, o = a(n, "name"), u = o && function() {
        }.name === "something", s = o && (!r || r && i(n, "name").configurable);
        t.exports = {
          EXISTS: o,
          PROPER: u,
          CONFIGURABLE: s
        };
      }), Yh = y(function(e) {
        var t = Jt(), r = Ms(), a = Ya(), n = hr(), i = ta(), o = Ns();
        e.f = t && !r ? Object.defineProperties : function(s, l) {
          n(s);
          for (var c = i(l), d = o(l), f = d.length, p = 0, m; f > p; )
            a.f(s, m = d[p++], c[m]);
          return s;
        };
      }), Kh = y(function(e, t) {
        var r = Ci();
        t.exports = r("document", "documentElement");
      }), Bs = y(function(e, t) {
        var r = hr(), a = Yh(), n = Ps(), i = Pi(), o = Kh(), u = Ss(), s = Oi(), l = ">", c = "<", d = "prototype", f = "script", p = s("IE_PROTO"), m = function() {
        }, h = function(_) {
          return c + f + l + _ + c + "/" + f + l;
        }, v = function(_) {
          _.write(h("")), _.close();
          var F = _.parentWindow.Object;
          return _ = null, F;
        }, g = function() {
          var _ = u("iframe"), F = "java" + f + ":", R;
          return _.style.display = "none", o.appendChild(_), _.src = String(F), R = _.contentWindow.document, R.open(), R.write(h("document.F=Object")), R.close(), R.F;
        }, b, D = function() {
          try {
            b = new ActiveXObject("htmlfile");
          } catch {
          }
          D = typeof L < "u" ? L.domain && b ? v(b) : g() : v(b);
          for (var _ = n.length; _--; )
            delete D[d][n[_]];
          return D();
        };
        i[p] = !0, t.exports = Object.create || function(_, F) {
          var R;
          return _ !== null ? (m[d] = r(_), R = new m(), m[d] = null, R[p] = _) : R = D(), F === void 0 ? R : a.f(R, F);
        };
      }), qs = y(function(e, t) {
        var r = aa();
        t.exports = function(a, n, i, o) {
          return o && o.enumerable ? a[n] = i : r(a, n, i), a;
        };
      }), js = y(function(e, t) {
        var r = _t(), a = rt(), n = Sr(), i = Bs(), o = Mi(), u = qs(), s = Vt(), l = Ti(), c = s("iterator"), d = !1, f, p, m;
        [].keys && (m = [].keys(), "next" in m ? (p = o(o(m)), p !== Object.prototype && (f = p)) : d = !0);
        var h = !n(f) || r(function() {
          var v = {};
          return f[c].call(v) !== v;
        });
        h ? f = {} : l && (f = i(f)), a(f[c]) || u(f, c, function() {
          return this;
        }), t.exports = {
          IteratorPrototype: f,
          BUGGY_SAFARI_ITERATORS: d
        };
      }), Xh = y(function(e, t) {
        var r = Ni(), a = Xa();
        t.exports = r ? {}.toString : function() {
          return "[object " + a(this) + "]";
        };
      }), zs = y(function(e, t) {
        var r = Ni(), a = Ya().f, n = aa(), i = zt(), o = Xh(), u = Vt(), s = u("toStringTag");
        t.exports = function(l, c, d, f) {
          if (l) {
            var p = d ? l : l.prototype;
            i(p, s) || a(p, s, {
              configurable: !0,
              value: c
            }), f && !r && n(p, "toString", o);
          }
        };
      }), Za = y(function(e, t) {
        t.exports = {};
      }), Zh = y(function(e, t) {
        var r = js().IteratorPrototype, a = Bs(), n = Ga(), i = zs(), o = Za(), u = function() {
          return this;
        };
        t.exports = function(s, l, c, d) {
          var f = l + " Iterator";
          return s.prototype = a(r, {
            next: n(+!d, c)
          }), i(s, f, !1, !0), o[f] = u, s;
        };
      }), Jh = y(function(e, t) {
        var r = mt(), a = Wa();
        t.exports = function(n, i, o) {
          try {
            return r(a(Object.getOwnPropertyDescriptor(n, i)[o]));
          } catch {
          }
        };
      }), Qh = y(function(e, t) {
        var r = rt(), a = String, n = TypeError;
        t.exports = function(i) {
          if (O(i) == "object" || r(i))
            return i;
          throw new n("Can't set " + a(i) + " as a prototype");
        };
      }), ev = y(function(e, t) {
        var r = Jh(), a = hr(), n = Qh();
        t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
          var i = !1, o = {}, u;
          try {
            u = r(Object.prototype, "__proto__", "set"), u(o, []), i = o instanceof Array;
          } catch {
          }
          return function(l, c) {
            return a(l), n(c), i ? u(l, c) : l.__proto__ = c, l;
          };
        }() : void 0);
      }), tv = y(function(e, t) {
        var r = Ka(), a = mr(), n = Ti(), i = Wh(), o = rt(), u = Zh(), s = Mi(), l = ev(), c = zs(), d = aa(), f = qs(), p = Vt(), m = Za(), h = js(), v = i.PROPER, g = i.CONFIGURABLE, b = h.IteratorPrototype, D = h.BUGGY_SAFARI_ITERATORS, w = p("iterator"), _ = "keys", F = "values", R = "entries", I = function() {
          return this;
        };
        t.exports = function(V, S, N, z, H, Q, ie) {
          u(N, S, z);
          var Y = function(pe) {
            if (pe === H && U)
              return U;
            if (!D && pe && pe in Z)
              return Z[pe];
            switch (pe) {
              case _:
                return function() {
                  return new N(this, pe);
                };
              case F:
                return function() {
                  return new N(this, pe);
                };
              case R:
                return function() {
                  return new N(this, pe);
                };
            }
            return function() {
              return new N(this);
            };
          }, te = S + " Iterator", B = !1, Z = V.prototype, A = Z[w] || Z["@@iterator"] || H && Z[H], U = !D && A || Y(H), P = S === "Array" && Z.entries || A, G, ae, W;
          if (P && (G = s(P.call(new V())), G !== Object.prototype && G.next && (!n && s(G) !== b && (l ? l(G, b) : o(G[w]) || f(G, w, I)), c(G, te, !0, !0), n && (m[te] = I))), v && H === F && A && A.name !== F && (!n && g ? d(Z, "name", F) : (B = !0, U = function() {
            return a(A, this);
          })), H)
            if (ae = {
              values: Y(F),
              keys: Q ? U : Y(_),
              entries: Y(R)
            }, ie)
              for (W in ae)
                (D || B || !(W in Z)) && f(Z, W, ae[W]);
            else
              r({
                target: S,
                proto: !0,
                forced: D || B
              }, ae);
          return (!n || ie) && Z[w] !== U && f(Z, w, U, {
            name: H
          }), m[S] = U, ae;
        };
      }), rv = y(function(e, t) {
        t.exports = function(r, a) {
          return {
            value: r,
            done: a
          };
        };
      }), av = y(function() {
        var e = $h().charAt, t = Ls(), r = Gh(), a = tv(), n = rv(), i = "String Iterator", o = r.set, u = r.getterFor(i);
        a(String, "String", function(s) {
          o(this, {
            type: i,
            string: t(s),
            index: 0
          });
        }, function() {
          var l = u(this), c = l.string, d = l.index, f;
          return d >= c.length ? n(void 0, !0) : (f = e(c, d), l.index += f.length, n(f, !1));
        });
      }), nv = y(function(e, t) {
        var r = mr(), a = hr(), n = Fi();
        t.exports = function(i, o, u) {
          var s, l;
          a(i);
          try {
            if (s = n(i, "return"), !s) {
              if (o === "throw")
                throw u;
              return u;
            }
            s = r(s, i);
          } catch (c) {
            l = !0, s = c;
          }
          if (o === "throw")
            throw u;
          if (l)
            throw s;
          return a(s), u;
        };
      }), iv = y(function(e, t) {
        var r = hr(), a = nv();
        t.exports = function(n, i, o, u) {
          try {
            return u ? i(r(o)[0], o[1]) : i(o);
          } catch (s) {
            a(n, "throw", s);
          }
        };
      }), ov = y(function(e, t) {
        var r = Vt(), a = Za(), n = r("iterator"), i = Array.prototype;
        t.exports = function(o) {
          return o !== void 0 && (a.Array === o || i[n] === o);
        };
      }), uv = y(function(e, t) {
        var r = mt(), a = rt(), n = Ri(), i = r(Function.toString);
        a(n.inspectSource) || (n.inspectSource = function(o) {
          return i(o);
        }), t.exports = n.inspectSource;
      }), sv = y(function(e, t) {
        var r = mt(), a = _t(), n = rt(), i = Xa(), o = Ci(), u = uv(), s = function() {
        }, l = [], c = o("Reflect", "construct"), d = /^\s*(?:class|function)\b/, f = r(d.exec), p = !d.test(s), m = function(g) {
          if (!n(g))
            return !1;
          try {
            return c(s, l, g), !0;
          } catch {
            return !1;
          }
        }, h = function(g) {
          if (!n(g))
            return !1;
          switch (i(g)) {
            case "AsyncFunction":
            case "GeneratorFunction":
            case "AsyncGeneratorFunction":
              return !1;
          }
          try {
            return p || !!f(d, u(g));
          } catch {
            return !0;
          }
        };
        h.sham = !0, t.exports = !c || a(function() {
          var v;
          return m(m.call) || !m(Object) || !m(function() {
            v = !0;
          }) || v;
        }) ? h : m;
      }), lv = y(function(e, t) {
        var r = ki(), a = Ya(), n = Ga();
        t.exports = function(i, o, u) {
          var s = r(o);
          s in i ? a.f(i, s, n(0, u)) : i[s] = u;
        };
      }), Vs = y(function(e, t) {
        var r = Xa(), a = Fi(), n = Ei(), i = Za(), o = Vt(), u = o("iterator");
        t.exports = function(s) {
          if (!n(s))
            return a(s, u) || a(s, "@@iterator") || i[r(s)];
        };
      }), cv = y(function(e, t) {
        var r = mr(), a = Wa(), n = hr(), i = Fs(), o = Vs(), u = TypeError;
        t.exports = function(s, l) {
          var c = arguments.length < 2 ? o(s) : l;
          if (a(c))
            return n(r(c, s));
          throw new u(i(s) + " is not iterable");
        };
      }), dv = y(function(e, t) {
        var r = Os(), a = mr(), n = Si(), i = iv(), o = ov(), u = sv(), s = Is(), l = lv(), c = cv(), d = Vs(), f = Array;
        t.exports = function(m) {
          var h = n(m), v = u(this), g = arguments.length, b = g > 1 ? arguments[1] : void 0, D = b !== void 0;
          D && (b = r(b, g > 2 ? arguments[2] : void 0));
          var w = d(h), _ = 0, F, R, I, V, S, N;
          if (w && !(this === f && o(w)))
            for (V = c(h, w), S = V.next, R = v ? new this() : []; !(I = a(S, V)).done; _++)
              N = D ? i(V, b, [I.value, _], !0) : I.value, l(R, _, N);
          else
            for (F = s(h), R = v ? new this(F) : f(F); F > _; _++)
              N = D ? b(h[_], _) : h[_], l(R, _, N);
          return R.length = _, R;
        };
      }), fv = y(function(e, t) {
        var r = Vt(), a = r("iterator"), n = !1;
        try {
          i = 0, o = {
            next: function() {
              return {
                done: !!i++
              };
            },
            return: function() {
              n = !0;
            }
          }, o[a] = function() {
            return this;
          }, Array.from(o, function() {
            throw 2;
          });
        } catch {
        }
        var i, o;
        t.exports = function(u, s) {
          try {
            if (!s && !n)
              return !1;
          } catch {
            return !1;
          }
          var l = !1;
          try {
            var c = {};
            c[a] = function() {
              return {
                next: function() {
                  return {
                    done: l = !0
                  };
                }
              };
            }, u(c);
          } catch {
          }
          return l;
        };
      }), pv = y(function() {
        var e = Ka(), t = dv(), r = fv(), a = !r(function(n) {
          Array.from(n);
        });
        e({
          target: "Array",
          stat: !0,
          forced: a
        }, {
          from: t
        });
      }), mv = y(function(e, t) {
        av(), pv();
        var r = ra();
        t.exports = r.Array.from;
      }), hv = y(function(e, t) {
        var r = mv();
        t.exports = r;
      }), Hs = y(function(e, t) {
        var r = hv();
        t.exports = r;
      }), $s = y(function(e, t) {
        (function() {
          var r = {
            name: "doT",
            version: "1.1.1",
            templateSettings: {
              evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
              interpolate: /\{\{=([\s\S]+?)\}\}/g,
              encode: /\{\{!([\s\S]+?)\}\}/g,
              use: /\{\{#([\s\S]+?)\}\}/g,
              useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
              define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
              defineParams: /^\s*([\w$]+):([\s\S]+)/,
              conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
              iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
              varname: "it",
              strip: !0,
              append: !0,
              selfcontained: !1,
              doNotSkipEncoded: !1
            },
            template: void 0,
            compile: void 0,
            log: !0
          };
          (function() {
            if ((typeof globalThis > "u" ? "undefined" : O(globalThis)) !== "object")
              try {
                Object.defineProperty(Object.prototype, "__magic__", {
                  get: function() {
                    return this;
                  },
                  configurable: !0
                }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
              } catch {
                E.globalThis = function() {
                  if (typeof self < "u")
                    return self;
                  if (typeof E < "u")
                    return E;
                  if (typeof jt < "u")
                    return jt;
                  if (typeof this < "u")
                    return this;
                  throw new Error("Unable to locate global `this`");
                }();
              }
          })(), r.encodeHTMLSource = function(u) {
            var s = {
              "&": "&#38;",
              "<": "&#60;",
              ">": "&#62;",
              '"': "&#34;",
              "'": "&#39;",
              "/": "&#47;"
            }, l = u ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
            return function(c) {
              return c ? c.toString().replace(l, function(d) {
                return s[d] || d;
              }) : "";
            };
          }, typeof t < "u" && t.exports ? t.exports = r : globalThis.doT = r;
          var a = {
            append: {
              start: "'+(",
              end: ")+'",
              startencode: "'+encodeHTML("
            },
            split: {
              start: "';out+=(",
              end: ");out+='",
              startencode: "';out+=encodeHTML("
            }
          }, n = /$^/;
          function i(u, s, l) {
            return (typeof s == "string" ? s : s.toString()).replace(u.define || n, function(c, d, f, p) {
              return d.indexOf("def.") === 0 && (d = d.substring(4)), d in l || (f === ":" ? (u.defineParams && p.replace(u.defineParams, function(m, h, v) {
                l[d] = {
                  arg: h,
                  text: v
                };
              }), d in l || (l[d] = p)) : new Function("def", "def['" + d + "']=" + p)(l)), "";
            }).replace(u.use || n, function(c, d) {
              u.useParams && (d = d.replace(u.useParams, function(p, m, h, v) {
                if (l[h] && l[h].arg && v) {
                  var g = (h + ":" + v).replace(/'|\\/g, "_");
                  return l.__exp = l.__exp || {}, l.__exp[g] = l[h].text.replace(new RegExp("(^|[^\\w$])" + l[h].arg + "([^\\w$])", "g"), "$1" + v + "$2"), m + "def.__exp['" + g + "']";
                }
              }));
              var f = new Function("def", "return " + d)(l);
              return f && i(u, f, l);
            });
          }
          function o(u) {
            return u.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
          }
          r.template = function(u, s, l) {
            s = s || r.templateSettings;
            var c = s.append ? a.append : a.split, d, f = 0, p, m = s.use || s.define ? i(s, u, l || {}) : u;
            m = ("var out='" + (s.strip ? m.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : m).replace(/'|\\/g, "\\$&").replace(s.interpolate || n, function(h, v) {
              return c.start + o(v) + c.end;
            }).replace(s.encode || n, function(h, v) {
              return d = !0, c.startencode + o(v) + c.end;
            }).replace(s.conditional || n, function(h, v, g) {
              return v ? g ? "';}else if(" + o(g) + "){out+='" : "';}else{out+='" : g ? "';if(" + o(g) + "){out+='" : "';}out+='";
            }).replace(s.iterate || n, function(h, v, g, b) {
              return v ? (f += 1, p = b || "i" + f, v = o(v), "';var arr" + f + "=" + v + ";if(arr" + f + "){var " + g + "," + p + "=-1,l" + f + "=arr" + f + ".length-1;while(" + p + "<l" + f + "){" + g + "=arr" + f + "[" + p + "+=1];out+='") : "';} } out+='";
            }).replace(s.evaluate || n, function(h, v) {
              return "';" + o(v) + "out+='";
            }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, ""), d && (!s.selfcontained && globalThis && !globalThis._encodeHTML && (globalThis._encodeHTML = r.encodeHTMLSource(s.doNotSkipEncoded)), m = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" + r.encodeHTMLSource.toString() + "(" + (s.doNotSkipEncoded || "") + "));" + m);
            try {
              return new Function(s.varname, m);
            } catch (h) {
              throw typeof console < "u" && console.log("Could not create a template function: " + m), h;
            }
          }, r.compile = function(u, s) {
            return r.template(u, null, s);
          };
        })();
      }), vv = [{
        name: "NA",
        value: "inapplicable",
        priority: 0,
        group: "inapplicable"
      }, {
        name: "PASS",
        value: "passed",
        priority: 1,
        group: "passes"
      }, {
        name: "CANTTELL",
        value: "cantTell",
        priority: 2,
        group: "incomplete"
      }, {
        name: "FAIL",
        value: "failed",
        priority: 3,
        group: "violations"
      }], xt = {
        helpUrlBase: "https://dequeuniversity.com/rules/",
        gridSize: 200,
        selectorSimilarFilterLimit: 700,
        results: [],
        resultGroups: [],
        resultGroupMap: {},
        impact: Object.freeze(["minor", "moderate", "serious", "critical"]),
        preload: Object.freeze({
          assets: ["cssom", "media"],
          timeout: 1e4
        }),
        allOrigins: "<unsafe_all_origins>",
        sameOrigin: "<same_origin>"
      };
      vv.forEach(function(e) {
        var t = e.name, r = e.value, a = e.priority, n = e.group;
        xt[t] = r, xt[t + "_PRIO"] = a, xt[t + "_GROUP"] = n, xt.results[a] = r, xt.resultGroups[a] = n, xt.resultGroupMap[r] = n;
      }), Object.freeze(xt.results), Object.freeze(xt.resultGroups), Object.freeze(xt.resultGroupMap), Object.freeze(xt);
      var se = xt;
      function gv() {
        (typeof console > "u" ? "undefined" : O(console)) === "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
      }
      var vr = gv, bv = /[\t\r\n\f]/g, yv = function() {
        function e() {
          Tt(this, e), this.parent = void 0;
        }
        return Rt(e, [{
          key: "props",
          get: function() {
            throw new Error('VirtualNode class must have a "props" object consisting of "nodeType" and "nodeName" properties');
          }
        }, {
          key: "attrNames",
          get: function() {
            throw new Error('VirtualNode class must have an "attrNames" property');
          }
        }, {
          key: "attr",
          value: function() {
            throw new Error('VirtualNode class must have an "attr" function');
          }
        }, {
          key: "hasAttr",
          value: function() {
            throw new Error('VirtualNode class must have a "hasAttr" function');
          }
        }, {
          key: "hasClass",
          value: function(r) {
            var a = this.attr("class");
            if (!a)
              return !1;
            var n = " " + r + " ";
            return (" " + a + " ").replace(bv, " ").indexOf(n) >= 0;
          }
        }]);
      }(), $e = yv, Li = {};
      Dt(Li, {
        DqElement: function() {
          return Ht;
        },
        aggregate: function() {
          return Ja;
        },
        aggregateChecks: function() {
          return Ws;
        },
        aggregateNodeResults: function() {
          return Ys;
        },
        aggregateResult: function() {
          return Ks;
        },
        areStylesSet: function() {
          return Cv;
        },
        assert: function() {
          return me;
        },
        checkHelper: function() {
          return Hi;
        },
        clone: function() {
          return $t;
        },
        closest: function() {
          return ut;
        },
        collectResultsFromFrames: function() {
          return Cl;
        },
        contains: function() {
          return Ut;
        },
        convertSelector: function() {
          return nn;
        },
        cssParser: function() {
          return ol;
        },
        deepMerge: function() {
          return ao;
        },
        escapeSelector: function() {
          return Oe;
        },
        extendMetaData: function() {
          return no;
        },
        filterHtmlAttrs: function() {
          return X1;
        },
        finalizeRuleResult: function() {
          return na;
        },
        findBy: function() {
          return fa;
        },
        getAllChecks: function() {
          return cn;
        },
        getAncestry: function() {
          return an;
        },
        getBaseLang: function() {
          return Fr;
        },
        getCheckMessage: function() {
          return Ww;
        },
        getCheckOption: function() {
          return Xn;
        },
        getEnvironmentData: function() {
          return ur;
        },
        getFlattenedTree: function() {
          return mu;
        },
        getFrameContexts: function() {
          return cD;
        },
        getFriendlyUriEnd: function() {
          return Js;
        },
        getNodeAttributes: function() {
          return en;
        },
        getNodeFromTree: function() {
          return le;
        },
        getPreloadConfig: function() {
          return G1;
        },
        getRootNode: function() {
          return pa;
        },
        getRule: function() {
          return S1;
        },
        getScroll: function() {
          return Yt;
        },
        getScrollState: function() {
          return pD;
        },
        getSelector: function() {
          return Vi;
        },
        getSelectorData: function() {
          return rn;
        },
        getShadowSelector: function() {
          return qi;
        },
        getStandards: function() {
          return mD;
        },
        getStyleSheetFactory: function() {
          return M1;
        },
        getXpath: function() {
          return nl;
        },
        injectStyle: function() {
          return gD;
        },
        isArrayLike: function() {
          return yu;
        },
        isContextObject: function() {
          return wu;
        },
        isContextProp: function() {
          return Jn;
        },
        isContextSpec: function() {
          return I1;
        },
        isHidden: function() {
          return bD;
        },
        isHtmlElement: function() {
          return _u;
        },
        isLabelledFramesSelector: function() {
          return Du;
        },
        isLabelledShadowDomSelector: function() {
          return Qn;
        },
        isNodeInContext: function() {
          return xu;
        },
        isShadowRoot: function() {
          return fn;
        },
        isValidLang: function() {
          return ri;
        },
        isXHTML: function() {
          return tn;
        },
        matchAncestry: function() {
          return Eu;
        },
        matches: function() {
          return Ui;
        },
        matchesExpression: function() {
          return Or;
        },
        matchesSelector: function() {
          return kr;
        },
        memoize: function() {
          return Fe;
        },
        mergeResults: function() {
          return dn;
        },
        nodeLookup: function() {
          return we;
        },
        nodeSerializer: function() {
          return ht;
        },
        nodeSorter: function() {
          return Au;
        },
        objectHasOwn: function() {
          return Nt;
        },
        parseCrossOriginStylesheet: function() {
          return Fu;
        },
        parseSameOriginStylesheet: function() {
          return L1;
        },
        parseStylesheet: function() {
          return Cu;
        },
        parseTabindex: function() {
          return Lt;
        },
        performanceTimer: function() {
          return ve;
        },
        pollyfillElementsFromPoint: function() {
          return B1;
        },
        preload: function() {
          return $1;
        },
        preloadCssom: function() {
          return j1;
        },
        preloadMedia: function() {
          return H1;
        },
        processMessage: function() {
          return bu;
        },
        publishMetaData: function() {
          return ei;
        },
        querySelectorAll: function() {
          return ft;
        },
        querySelectorAllFilter: function() {
          return Bt;
        },
        queue: function() {
          return kt;
        },
        respondable: function() {
          return Et;
        },
        ruleShouldRun: function() {
          return K1;
        },
        select: function() {
          return Tu;
        },
        sendCommandToFrame: function() {
          return _l;
        },
        setScrollState: function() {
          return XD;
        },
        shadowSelect: function() {
          return ZD;
        },
        shadowSelectAll: function() {
          return Ru;
        },
        shouldPreload: function() {
          return U1;
        },
        toArray: function() {
          return Zs;
        },
        tokenList: function() {
          return Ze;
        },
        uniqueArray: function() {
          return Ia;
        },
        uuid: function() {
          return bg;
        },
        validInputTypes: function() {
          return ti;
        },
        validLangs: function() {
          return tf;
        }
      });
      function wv(e, t, r) {
        t = t.slice(), r && t.push(r);
        var a = t.map(function(n) {
          return e.indexOf(n);
        }).sort();
        return e[a.pop()];
      }
      var Ja = wv, Dv = se.CANTTELL_PRIO, _v = se.FAIL_PRIO, Qa = [];
      Qa[se.PASS_PRIO] = !0, Qa[se.CANTTELL_PRIO] = null, Qa[se.FAIL_PRIO] = !1;
      var Us = ["any", "all", "none"];
      function Gs(e, t) {
        return Us.reduce(function(r, a) {
          return r[a] = (e[a] || []).map(function(n) {
            return t(n, a);
          }), r;
        }, {});
      }
      function xv(e) {
        var t = Object.assign({}, e);
        Gs(t, function(n, i) {
          var o = typeof n.result > "u" ? -1 : Qa.indexOf(n.result);
          n.priority = o !== -1 ? o : se.CANTTELL_PRIO, i === "none" && (n.priority === se.PASS_PRIO ? n.priority = se.FAIL_PRIO : n.priority === se.FAIL_PRIO && (n.priority = se.PASS_PRIO));
        });
        var r = {
          all: t.all.reduce(function(n, i) {
            return Math.max(n, i.priority);
          }, 0),
          none: t.none.reduce(function(n, i) {
            return Math.max(n, i.priority);
          }, 0),
          any: t.any.reduce(function(n, i) {
            return Math.min(n, i.priority);
          }, 4) % 4
        };
        t.priority = Math.max(r.all, r.none, r.any);
        var a = [];
        return Us.forEach(function(n) {
          t[n] = t[n].filter(function(i) {
            return i.priority === t.priority && i.priority === r[n];
          }), t[n].forEach(function(i) {
            return a.push(i.impact);
          });
        }), [Dv, _v].includes(t.priority) ? t.impact = Ja(se.impact, a) : t.impact = null, Gs(t, function(n) {
          delete n.result, delete n.priority;
        }), t.result = se.results[t.priority], delete t.priority, t;
      }
      var Ws = xv;
      function na(e) {
        var t = x._audit.rules.find(function(r) {
          var a = r.id;
          return a === e.id;
        });
        return t && t.impact && e.nodes.forEach(function(r) {
          ["any", "all", "none"].forEach(function(a) {
            (r[a] || []).forEach(function(n) {
              n.impact = t.impact;
            });
          });
        }), Object.assign(e, Ys(e.nodes)), delete e.nodes, e;
      }
      function Ev(e) {
        var t = {};
        if (e = e.map(function(i) {
          if (i.any && i.all && i.none)
            return Ws(i);
          if (Array.isArray(i.node))
            return na(i);
          throw new TypeError("Invalid Result type");
        }), e && e.length) {
          var r = e.map(function(i) {
            return i.result;
          });
          t.result = Ja(se.results, r, t.result);
        } else
          t.result = "inapplicable";
        se.resultGroups.forEach(function(i) {
          return t[i] = [];
        }), e.forEach(function(i) {
          var o = se.resultGroupMap[i.result];
          t[o].push(i);
        });
        var a = se.FAIL_GROUP;
        if (t[a].length === 0 && (a = se.CANTTELL_GROUP), t[a].length > 0) {
          var n = t[a].map(function(i) {
            return i.impact;
          });
          t.impact = Ja(se.impact, n) || null;
        } else
          t.impact = null;
        return t;
      }
      var Ys = Ev;
      function Bi(e, t, r) {
        var a = Object.assign({}, t);
        a.nodes = (a[r] || []).concat(), se.resultGroups.forEach(function(n) {
          delete a[n];
        }), e[r].push(a);
      }
      function Av(e) {
        var t = {};
        return se.resultGroups.forEach(function(r) {
          return t[r] = [];
        }), e.forEach(function(r) {
          r.error ? Bi(t, r, se.CANTTELL_GROUP) : r.result === se.NA ? Bi(t, r, se.NA_GROUP) : se.resultGroups.forEach(function(a) {
            Array.isArray(r[a]) && r[a].length > 0 && Bi(t, r, a);
          });
        }), t;
      }
      var Ks = Av;
      function Xs(e, t, r) {
        var a = E.getComputedStyle(e, null);
        if (!a)
          return !1;
        for (var n = 0; n < t.length; ++n) {
          var i = t[n];
          if (a.getPropertyValue(i.property) === i.value)
            return !0;
        }
        return !e.parentNode || e.nodeName.toUpperCase() === r.toUpperCase() ? !1 : Xs(e.parentNode, t, r);
      }
      var Cv = Xs;
      function Fv(e, t) {
        if (!e)
          throw new Error(t);
      }
      var me = Fv;
      function Tv(e) {
        return Array.prototype.slice.call(e);
      }
      var Zs = Tv;
      function Rv(e) {
        for (var t = String(e), r = t.length, a = -1, n, i = "", o = t.charCodeAt(0); ++a < r; ) {
          if (n = t.charCodeAt(a), n == 0) {
            i += "�";
            continue;
          }
          if (n >= 1 && n <= 31 || n == 127 || a == 0 && n >= 48 && n <= 57 || a == 1 && n >= 48 && n <= 57 && o == 45) {
            i += "\\" + n.toString(16) + " ";
            continue;
          }
          if (a == 0 && r == 1 && n == 45) {
            i += "\\" + t.charAt(a);
            continue;
          }
          if (n >= 128 || n == 45 || n == 95 || n >= 48 && n <= 57 || n >= 65 && n <= 90 || n >= 97 && n <= 122) {
            i += t.charAt(a);
            continue;
          }
          i += "\\" + t.charAt(a);
        }
        return i;
      }
      var Oe = Rv;
      function Sv() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        return e.length !== 0 && (e.match(/[0-9]/g) || "").length >= e.length / 2;
      }
      function ia(e, t) {
        return [e.substring(0, t), e.substring(t)];
      }
      function oa(e) {
        return e.replace(/\s+$/, "");
      }
      function kv(e) {
        var t = e, r = "", a = "", n = "", i = "", o = "", u = "";
        if (e.includes("#")) {
          var s = ia(e, e.indexOf("#")), l = $(s, 2);
          e = l[0], u = l[1];
        }
        if (e.includes("?")) {
          var c = ia(e, e.indexOf("?")), d = $(c, 2);
          e = d[0], o = d[1];
        }
        if (e.includes("://")) {
          var f = e.split("://"), p = $(f, 2);
          r = p[0], e = p[1];
          var m = ia(e, e.indexOf("/")), h = $(m, 2);
          a = h[0], e = h[1];
        } else if (e.substr(0, 2) === "//") {
          e = e.substr(2);
          var v = ia(e, e.indexOf("/")), g = $(v, 2);
          a = g[0], e = g[1];
        }
        if (a.substr(0, 4) === "www." && (a = a.substr(4)), a && a.includes(":")) {
          var b = ia(a, a.indexOf(":")), D = $(b, 2);
          a = D[0], n = D[1];
        }
        return i = e, {
          original: t,
          protocol: r,
          domain: a,
          port: n,
          path: i,
          query: o,
          hash: u
        };
      }
      function Ov() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if (!(e.length <= 1 || e.substr(0, 5) === "data:" || e.substr(0, 11) === "javascript:" || e.includes("?"))) {
          var r = t.currentDomain, a = t.maxLength, n = a === void 0 ? 25 : a, i = kv(e), o = i.path, u = i.domain, s = i.hash, l = o.substr(o.substr(0, o.length - 2).lastIndexOf("/") + 1);
          if (s)
            return l && (l + s).length <= n ? oa(l + s) : l.length < 2 && s.length > 2 && s.length <= n ? oa(s) : void 0;
          if (u && u.length < n && o.length <= 1 || o === "/" + l && u && r && u !== r && (u + o).length <= n)
            return oa(u + o);
          var c = l.lastIndexOf(".");
          if ((c === -1 || c > 1) && (c !== -1 || l.length > 2) && l.length <= n && !l.match(/index(\.[a-zA-Z]{2-4})?/) && !Sv(l))
            return oa(l);
        }
      }
      var Js = Ov;
      function Mv(e) {
        return e.attributes instanceof E.NamedNodeMap ? e.attributes : e.cloneNode(!1).attributes;
      }
      var en = Mv, Iv = /* @__PURE__ */ function() {
        var e;
        function t(r) {
          var a = ["matches", "matchesSelector", "mozMatchesSelector", "webkitMatchesSelector", "msMatchesSelector"], n = a.length, i, o;
          for (i = 0; i < n; i++)
            if (o = a[i], r[o])
              return o;
        }
        return function(r, a) {
          return (!e || !r[e]) && (e = t(r)), r[e] ? r[e](a) : !1;
        };
      }(), kr = Iv, Pv = ot(bs());
      x._memoizedFns = [];
      function Nv(e) {
        var t = (0, Pv.default)(e);
        return x._memoizedFns.push(t), t;
      }
      var Fe = Nv, Lv = Fe(function(e) {
        return e != null && e.createElement ? e.createElement("A").localName === "A" : !1;
      }), tn = Lv;
      function qi(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (!t)
          return "";
        var a = t.getRootNode && t.getRootNode() || L;
        if (a.nodeType !== 11)
          return e(t, r, a);
        for (var n = []; a.nodeType === 11; ) {
          if (!a.host)
            return "";
          n.unshift({
            elm: t,
            doc: a
          }), t = a.host, a = t.getRootNode();
        }
        return n.unshift({
          elm: t,
          doc: a
        }), n.map(function(i) {
          return e(i.elm, r, i.doc);
        });
      }
      var Bv = ["class", "style", "id", "selected", "checked", "disabled", "tabindex", "aria-checked", "aria-selected", "aria-invalid", "aria-activedescendant", "aria-busy", "aria-disabled", "aria-expanded", "aria-grabbed", "aria-pressed", "aria-valuenow", "xmlns"], qv = 31, jv = /([\\"])/g, zv = /(\r\n|\r|\n)/g;
      function ji(e) {
        return e.replace(jv, "\\$1").replace(zv, "\\a ");
      }
      function Qs(e, t) {
        var r = t.name, a;
        if (r.indexOf("href") !== -1 || r.indexOf("src") !== -1) {
          var n = Js(e.getAttribute(r));
          n ? a = Oe(t.name) + '$="' + ji(n) + '"' : a = Oe(t.name) + '="' + ji(e.getAttribute(r)) + '"';
        } else
          a = Oe(r) + '="' + ji(t.value) + '"';
        return a;
      }
      function zi(e, t) {
        return e.count < t.count ? -1 : e.count === t.count ? 0 : 1;
      }
      function el(e) {
        return !Bv.includes(e.name) && e.name.indexOf(":") === -1 && (!e.value || e.value.length < qv);
      }
      function rn(e) {
        var t = {
          classes: {},
          tags: {},
          attributes: {}
        };
        e = Array.isArray(e) ? e : [e];
        for (var r = e.slice(), a = [], n = function() {
          var o = r.pop(), u = o.actualNode;
          if (u.querySelectorAll) {
            var s = u.nodeName;
            t.tags[s] ? t.tags[s]++ : t.tags[s] = 1, u.classList && Array.from(u.classList).forEach(function(l) {
              var c = Oe(l);
              t.classes[c] ? t.classes[c]++ : t.classes[c] = 1;
            }), u.hasAttributes() && Array.from(en(u)).filter(el).forEach(function(l) {
              var c = Qs(u, l);
              c && (t.attributes[c] ? t.attributes[c]++ : t.attributes[c] = 1);
            });
          }
          for (o.children.length && (a.push(r), r = o.children.slice()); !r.length && a.length; )
            r = a.pop();
        }; r.length; )
          n();
        return t;
      }
      function Vv(e, t) {
        var r = [], a = t.classes, n = t.tags;
        return e.classList && Array.from(e.classList).forEach(function(i) {
          var o = Oe(i);
          a[o] < n[e.nodeName] && r.push({
            name: o,
            count: a[o],
            species: "class"
          });
        }), r.sort(zi);
      }
      function Hv(e, t) {
        var r = e.parentNode && Array.from(e.parentNode.children || "") || [], a = r.find(function(i) {
          return i !== e && kr(i, t);
        });
        if (a) {
          var n = 1 + r.indexOf(e);
          return ":nth-child(" + n + ")";
        } else
          return "";
      }
      function $v(e) {
        if (e.getAttribute("id")) {
          var t = e.getRootNode && e.getRootNode() || L, r = "#" + Oe(e.getAttribute("id") || "");
          if (!r.match(/player_uid_/) && t.querySelectorAll(r).length === 1)
            return r;
        }
      }
      function tl(e) {
        var t = tn(L);
        return Oe(t ? e.localName : e.nodeName.toLowerCase());
      }
      function Uv(e, t) {
        var r = [], a = t.attributes, n = t.tags;
        return e.hasAttributes() && Array.from(en(e)).filter(el).forEach(function(i) {
          var o = Qs(e, i);
          o && a[o] < n[e.nodeName] && r.push({
            name: o,
            count: a[o],
            species: "attribute"
          });
        }), r.sort(zi);
      }
      function Gv(e, t) {
        var r = "", a, n = Vv(e, t), i = Uv(e, t);
        return n.length && n[0].count === 1 ? a = [n[0]] : i.length && i[0].count === 1 ? (a = [i[0]], r = tl(e)) : (a = n.concat(i), a.sort(zi), a = a.slice(0, 3), a.some(function(o) {
          return o.species === "class";
        }) ? a.sort(function(o, u) {
          return o.species !== u.species && o.species === "class" ? -1 : o.species === u.species ? 0 : 1;
        }) : r = tl(e)), r += a.reduce(function(o, u) {
          switch (u.species) {
            case "class":
              return o + "." + u.name;
            case "attribute":
              return o + "[" + u.name + "]";
          }
          return o;
        }, "");
      }
      function Wv(e, t, r) {
        if (!x._selectorData)
          throw new Error("Expect axe._selectorData to be set up");
        var a = t.toRoot, n = a === void 0 ? !1 : a, i, o;
        do {
          var u = $v(e);
          u || (u = Gv(e, x._selectorData), u += Hv(e, u)), i ? i = u + " > " + i : i = u, !o || o.length > se.selectorSimilarFilterLimit ? o = Kv(r, i) : o = o.filter(function(s) {
            return kr(s, i);
          }), e = e.parentElement;
        } while ((o.length > 1 || n) && e && e.nodeType !== 11);
        return o.length === 1 ? i : i.indexOf(" > ") !== -1 ? ":root" + i.substring(i.indexOf(" > ")) : ":root";
      }
      function Yv(e, t) {
        return qi(Wv, e, t);
      }
      var Vi = Fe(Yv), Kv = Fe(function(e, t) {
        return Array.from(e.querySelectorAll(t));
      });
      function rl(e) {
        var t = e.nodeName.toLowerCase(), r = e.parentElement, a = e.parentNode, n = "";
        if (t !== "head" && t !== "body" && a?.children.length > 1) {
          var i = Array.prototype.indexOf.call(a.children, e) + 1;
          n = ":nth-child(".concat(i, ")");
        }
        return r ? rl(r) + " > " + t + n : t + n;
      }
      function an(e, t) {
        return qi(rl, e, t);
      }
      function al(e, t) {
        var r, a;
        if (!e)
          return [];
        if (!t && e.nodeType === 9)
          return t = [{
            str: "html"
          }], t;
        if (t = t || [], e.parentNode && e.parentNode !== e && (t = al(e.parentNode, t)), e.previousSibling) {
          a = 1, r = e.previousSibling;
          do
            r.nodeType === 1 && r.nodeName === e.nodeName && a++, r = r.previousSibling;
          while (r);
          a === 1 && (a = null);
        } else if (e.nextSibling) {
          r = e.nextSibling;
          do
            r.nodeType === 1 && r.nodeName === e.nodeName ? (a = 1, r = null) : (a = null, r = r.previousSibling);
          while (r);
        }
        if (e.nodeType === 1) {
          var n = {};
          n.str = e.nodeName.toLowerCase();
          var i = e.getAttribute && Oe(e.getAttribute("id"));
          i && e.ownerDocument.querySelectorAll("#" + i).length === 1 && (n.id = e.getAttribute("id")), a > 1 && (n.count = a), t.push(n);
        }
        return t;
      }
      function Xv(e) {
        return e.reduce(function(t, r) {
          return r.id ? "/".concat(r.str, "[@id='").concat(r.id, "']") : t + "/".concat(r.str) + (r.count > 0 ? "[".concat(r.count, "]") : "");
        }, "");
      }
      function Zv(e) {
        var t = al(e);
        return Xv(t);
      }
      var nl = Zv, ua = {}, Jv = {
        set: function(t, r) {
          Qv(t), ua[t] = r;
        },
        get: function(t, r) {
          if (eg(r), t in ua)
            return ua[t];
          if (typeof r == "function") {
            var a = r();
            return me(a !== void 0, "Cache creator function should not return undefined"), this.set(t, a), ua[t];
          }
        },
        clear: function() {
          ua = {};
        }
      };
      function Qv(e) {
        me(typeof e == "string", "key must be a string, " + O(e) + " given"), me(e !== "", "key must not be empty");
      }
      function eg(e) {
        me(typeof e == "function" || typeof e > "u", "creator must be a function or undefined, " + O(e) + " given");
      }
      var ue = Jv;
      function tg(e, t) {
        var r = t || e;
        return ue.get("nodeMap") ? ue.get("nodeMap").get(r) : null;
      }
      var le = tg, il = "DqElm.RunOptions";
      function rg(e, t) {
        if (t = t || 300, e.length > t) {
          var r = e.indexOf(">");
          e = e.substring(0, r + 1);
        }
        return e;
      }
      function ag(e) {
        if (!(e != null && e.outerHTML))
          return "";
        var t = e.outerHTML;
        return !t && typeof E.XMLSerializer == "function" && (t = new E.XMLSerializer().serializeToString(e)), rg(t || "");
      }
      var gr = Fe(function(t, r, a) {
        var n, i, o, u;
        if ((n = r) !== null && n !== void 0 || (r = null), (i = a) !== null && i !== void 0 || (a = {}), !r) {
          var s;
          r = (s = ue.get(il)) !== null && s !== void 0 ? s : {};
        }
        if (this.spec = a, t instanceof $e ? (this._virtualNode = t, this._element = t.actualNode) : (this._element = t, this._virtualNode = le(t)), this.fromFrame = ((o = this.spec.selector) === null || o === void 0 ? void 0 : o.length) > 1, this._includeElementInJson = r.elementRef, r.absolutePaths && (this._options = {
          toRoot: !0
        }), this.nodeIndexes = [], Array.isArray(this.spec.nodeIndexes) ? this.nodeIndexes = this.spec.nodeIndexes : typeof ((u = this._virtualNode) === null || u === void 0 ? void 0 : u.nodeIndex) == "number" && (this.nodeIndexes = [this._virtualNode.nodeIndex]), this.source = null, !x._audit.noHtml) {
          var l;
          this.source = (l = this.spec.source) !== null && l !== void 0 ? l : ag(this._element);
        }
        return this;
      });
      gr.prototype = {
        get selector() {
          return this.spec.selector || [Vi(this.element, this._options)];
        },
        get ancestry() {
          return this.spec.ancestry || [an(this.element)];
        },
        get xpath() {
          return this.spec.xpath || [nl(this.element)];
        },
        get element() {
          return this._element;
        },
        toJSON: function() {
          var t = {
            selector: this.selector,
            source: this.source,
            xpath: this.xpath,
            ancestry: this.ancestry,
            nodeIndexes: this.nodeIndexes,
            fromFrame: this.fromFrame
          };
          return this._includeElementInJson && (t.element = this._element), t;
        }
      }, gr.fromFrame = function(t, r, a) {
        var n = gr.mergeSpecs(t, a);
        return new gr(a.element, r, n);
      }, gr.mergeSpecs = function(t, r) {
        return de({}, t, {
          selector: [].concat(ne(r.selector), ne(t.selector)),
          ancestry: [].concat(ne(r.ancestry), ne(t.ancestry)),
          xpath: [].concat(ne(r.xpath), ne(t.xpath)),
          nodeIndexes: [].concat(ne(r.nodeIndexes), ne(t.nodeIndexes)),
          fromFrame: !0
        });
      }, gr.setRunOptions = function(t) {
        var r = t.elementRef, a = t.absolutePaths;
        ue.set(il, {
          elementRef: r,
          absolutePaths: a
        });
      };
      var Ht = gr;
      function ng(e, t, r, a) {
        return {
          isAsync: !1,
          async: function() {
            return this.isAsync = !0, function(i) {
              i instanceof Error ? a(i) : (e.result = i, r(e));
            };
          },
          data: function(i) {
            e.data = i;
          },
          relatedNodes: function(i) {
            E.Node && (i instanceof E.Node || i instanceof $e ? i = [i] : i = Zs(i), e.relatedNodes = [], i.forEach(function(o) {
              if (o instanceof $e && (o = o.actualNode), o instanceof E.Node) {
                var u = new Ht(o);
                e.relatedNodes.push(u);
              }
            }));
          }
        };
      }
      var Hi = ng;
      function $t(e) {
        return $i(e, /* @__PURE__ */ new Map());
      }
      function $i(e, t) {
        var r, a;
        if (e === null || O(e) !== "object" || (r = E) !== null && r !== void 0 && r.Node && e instanceof E.Node || (a = E) !== null && a !== void 0 && a.HTMLCollection && e instanceof E.HTMLCollection || "nodeName" in e && "nodeType" in e && "ownerDocument" in e)
          return e;
        if (t.has(e))
          return t.get(e);
        if (Array.isArray(e)) {
          var n = [];
          return t.set(e, n), e.forEach(function(u) {
            n.push($i(u, t));
          }), n;
        }
        var i = {};
        t.set(e, i);
        for (var o in e)
          i[o] = $i(e[o], t);
        return i;
      }
      var ig = ot(ws()), sa = new ig.CssSelectorParser();
      sa.registerSelectorPseudos("not"), sa.registerSelectorPseudos("is"), sa.registerNestingOperators(">"), sa.registerAttrEqualityMods("^", "$", "*", "~");
      var ol = sa;
      function Ui(e, t) {
        var r = nn(t);
        return r.some(function(a) {
          return Or(e, a);
        });
      }
      function og(e, t) {
        return e.props.nodeType === 1 && (t.tag === "*" || e.props.nodeName === t.tag);
      }
      function ug(e, t) {
        return !t.classes || t.classes.every(function(r) {
          return e.hasClass(r.value);
        });
      }
      function sg(e, t) {
        return !t.attributes || t.attributes.every(function(r) {
          var a = e.attr(r.key);
          return a !== null && r.test(a);
        });
      }
      function lg(e, t) {
        return !t.id || e.props.id === t.id;
      }
      function cg(e, t) {
        return !!(!t.pseudos || t.pseudos.every(function(r) {
          if (r.name === "not")
            return !r.expressions.some(function(a) {
              return Or(e, a);
            });
          if (r.name === "is")
            return r.expressions.some(function(a) {
              return Or(e, a);
            });
          throw new Error("the pseudo selector " + r.name + " has not yet been implemented");
        }));
      }
      function ul(e, t) {
        return og(e, t) && ug(e, t) && sg(e, t) && lg(e, t) && cg(e, t);
      }
      var la = /* @__PURE__ */ function() {
        var e = /(?=[\-\[\]{}()*+?.\\\^$|,#\s])/g, t = "\\";
        return function(r) {
          return r.replace(e, t);
        };
      }(), Gi = /\\/g;
      function dg(e) {
        if (e)
          return e.map(function(t) {
            var r = t.name.replace(Gi, ""), a = (t.value || "").replace(Gi, ""), n, i;
            switch (t.operator) {
              case "^=":
                i = new RegExp("^" + la(a));
                break;
              case "$=":
                i = new RegExp(la(a) + "$");
                break;
              case "~=":
                i = new RegExp("(^|\\s)" + la(a) + "(\\s|$)");
                break;
              case "|=":
                i = new RegExp("^" + la(a) + "(-|$)");
                break;
              case "=":
                n = function(u) {
                  return a === u;
                };
                break;
              case "*=":
                n = function(u) {
                  return u && u.includes(a);
                };
                break;
              case "!=":
                n = function(u) {
                  return a !== u;
                };
                break;
              default:
                n = function(u) {
                  return u !== null;
                };
            }
            return a === "" && /^[*$^]=$/.test(t.operator) && (n = function() {
              return !1;
            }), n || (n = function(u) {
              return u && i.test(u);
            }), {
              key: r,
              value: a,
              type: typeof t.value > "u" ? "attrExist" : "attrValue",
              test: n
            };
          });
      }
      function fg(e) {
        if (e)
          return e.map(function(t) {
            return t = t.replace(Gi, ""), {
              value: t,
              regexp: new RegExp("(^|\\s)" + la(t) + "(\\s|$)")
            };
          });
      }
      function pg(e) {
        if (e)
          return e.map(function(t) {
            var r;
            return ["is", "not"].includes(t.name) && (r = t.value, r = r.selectors ? r.selectors : [r], r = sl(r)), {
              name: t.name,
              expressions: r,
              value: t.value
            };
          });
      }
      function sl(e) {
        return e.map(function(t) {
          for (var r = [], a = t.rule; a; )
            r.push({
              tag: a.tagName ? a.tagName.toLowerCase() : "*",
              combinator: a.nestingOperator ? a.nestingOperator : " ",
              id: a.id,
              attributes: dg(a.attrs),
              classes: fg(a.classNames),
              pseudos: pg(a.pseudos)
            }), a = a.rule;
          return r;
        });
      }
      function nn(e) {
        var t = ol.parse(e);
        return t = t.selectors ? t.selectors : [t], sl(t);
      }
      function ll(e, t, r, a) {
        if (!e)
          return !1;
        for (var n = Array.isArray(t), i = n ? t[r] : t, o = ul(e, i); !o && a && e.parent; )
          e = e.parent, o = ul(e, i);
        if (r > 0) {
          if ([" ", ">"].includes(i.combinator) === !1)
            throw new Error("axe.utils.matchesExpression does not support the combinator: " + i.combinator);
          o = o && ll(e.parent, t, r - 1, i.combinator === " ");
        }
        return o;
      }
      function Or(e, t, r) {
        return ll(e, t, t.length - 1, r);
      }
      function mg(e, t) {
        for (; e; ) {
          if (Ui(e, t))
            return e;
          if (typeof e.parent > "u")
            throw new TypeError("Cannot resolve parent for non-DOM nodes");
          e = e.parent;
        }
        return null;
      }
      var ut = mg;
      function on() {
      }
      function Wi(e) {
        if (typeof e != "function")
          throw new TypeError("Queue methods require functions as arguments");
      }
      function hg() {
        var e = [], t = 0, r = 0, a = on, n = !1, i, o = function(p) {
          i = p, setTimeout(function() {
            i != null && vr("Uncaught error (of queue)", i);
          }, 1);
        }, u = o;
        function s(f) {
          return function(p) {
            e[f] = p, r -= 1, !r && a !== on && (n = !0, a(e));
          };
        }
        function l(f) {
          return a = on, u(f), e;
        }
        function c() {
          for (var f = e.length; t < f; t++) {
            var p = e[t];
            try {
              p.call(null, s(t), l);
            } catch (m) {
              l(m);
            }
          }
        }
        var d = {
          defer: function(p) {
            if (O(p) === "object" && p.then && p.catch) {
              var m = p;
              p = function(v, g) {
                m.then(v).catch(g);
              };
            }
            if (Wi(p), i === void 0) {
              if (n)
                throw new Error("Queue already completed");
              return e.push(p), ++r, c(), d;
            }
          },
          then: function(p) {
            if (Wi(p), a !== on)
              throw new Error("queue `then` already set");
            return i || (a = p, r || (n = !0, a(e))), d;
          },
          catch: function(p) {
            if (Wi(p), u !== o)
              throw new Error("queue `catch` already set");
            return i ? (p(i), i = null) : u = p, d;
          },
          abort: l
        };
        return d;
      }
      var kt = hg, Mr, Ir, Yi = E.crypto || E.msCrypto;
      if (!Ir && Yi && Yi.getRandomValues) {
        var cl = new Uint8Array(16);
        Ir = function() {
          return Yi.getRandomValues(cl), cl;
        };
      }
      if (!Ir) {
        var dl = new Array(16);
        Ir = function() {
          for (var t = 0, r; t < 16; t++)
            t & 3 || (r = Math.random() * 4294967296), dl[t] = r >>> ((t & 3) << 3) & 255;
          return dl;
        };
      }
      for (var fl = typeof E.Buffer == "function" ? E.Buffer : Array, Ki = [], pl = {}, Pr = 0; Pr < 256; Pr++)
        Ki[Pr] = (Pr + 256).toString(16).substr(1), pl[Ki[Pr]] = Pr;
      function vg(e, t, r) {
        var a = t && r || 0, n = 0;
        for (t = t || [], e.toLowerCase().replace(/[0-9a-f]{2}/g, function(i) {
          n < 16 && (t[a + n++] = pl[i]);
        }); n < 16; )
          t[a + n++] = 0;
        return t;
      }
      function Xi(e, t) {
        var r = t || 0, a = Ki;
        return a[e[r++]] + a[e[r++]] + a[e[r++]] + a[e[r++]] + "-" + a[e[r++]] + a[e[r++]] + "-" + a[e[r++]] + a[e[r++]] + "-" + a[e[r++]] + a[e[r++]] + "-" + a[e[r++]] + a[e[r++]] + a[e[r++]] + a[e[r++]] + a[e[r++]] + a[e[r++]];
      }
      var Qt = Ir(), gg = [Qt[0] | 1, Qt[1], Qt[2], Qt[3], Qt[4], Qt[5]], ml = (Qt[6] << 8 | Qt[7]) & 16383, Zi = 0, Ji = 0;
      function hl(e, t, r) {
        var a = t && r || 0, n = t || [];
        e = e || {};
        var i = e.clockseq != null ? e.clockseq : ml, o = e.msecs != null ? e.msecs : (/* @__PURE__ */ new Date()).getTime(), u = e.nsecs != null ? e.nsecs : Ji + 1, s = o - Zi + (u - Ji) / 1e4;
        if (s < 0 && e.clockseq == null && (i = i + 1 & 16383), (s < 0 || o > Zi) && e.nsecs == null && (u = 0), u >= 1e4)
          throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        Zi = o, Ji = u, ml = i, o += 122192928e5;
        var l = ((o & 268435455) * 1e4 + u) % 4294967296;
        n[a++] = l >>> 24 & 255, n[a++] = l >>> 16 & 255, n[a++] = l >>> 8 & 255, n[a++] = l & 255;
        var c = o / 4294967296 * 1e4 & 268435455;
        n[a++] = c >>> 8 & 255, n[a++] = c & 255, n[a++] = c >>> 24 & 15 | 16, n[a++] = c >>> 16 & 255, n[a++] = i >>> 8 | 128, n[a++] = i & 255;
        for (var d = e.node || gg, f = 0; f < 6; f++)
          n[a + f] = d[f];
        return t || Xi(n);
      }
      function br(e, t, r) {
        var a = t && r || 0;
        typeof e == "string" && (t = e == "binary" ? new fl(16) : null, e = null), e = e || {};
        var n = e.random || (e.rng || Ir)();
        if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, t)
          for (var i = 0; i < 16; i++)
            t[a + i] = n[i];
        return t || Xi(n);
      }
      Mr = br, Mr.v1 = hl, Mr.v4 = br, Mr.parse = vg, Mr.unparse = Xi, Mr.BufferClass = fl, x._uuid = hl();
      var bg = br, yg = Object.freeze(["EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"]);
      function wg(e) {
        var t = e.topic, r = e.channelId, a = e.message, n = e.messageId, i = e.keepalive, o = {
          channelId: r,
          topic: t,
          messageId: n,
          keepalive: !!i,
          source: vl()
        };
        return a instanceof Error ? o.error = {
          name: a.name,
          message: a.message,
          stack: a.stack
        } : o.payload = a, JSON.stringify(o);
      }
      function Dg(e) {
        var t;
        try {
          t = JSON.parse(e);
        } catch {
          return;
        }
        if (_g(t)) {
          var r = t, a = r.topic, n = r.channelId, i = r.messageId, o = r.keepalive, u = O(t.error) === "object" ? xg(t.error) : t.payload;
          return {
            topic: a,
            message: u,
            messageId: i,
            channelId: n,
            keepalive: !!o
          };
        }
      }
      function _g(e) {
        return e !== null && O(e) === "object" && typeof e.channelId == "string" && e.source === vl();
      }
      function xg(e) {
        var t = e.message || "Unknown error occurred", r = yg.includes(e.name) ? e.name : "Error", a = E[r] || Error;
        return e.stack && (t += `
` + e.stack.replace(e.message, "")), new a(t);
      }
      function vl() {
        var e = "axeAPI", t = "";
        return typeof x < "u" && x._audit && x._audit.application && (e = x._audit.application), typeof x < "u" && (t = x.version), e + "." + t;
      }
      function Qi(e) {
        bl(e), me(E.parent === e, "Source of the response must be the parent window.");
      }
      function gl(e) {
        bl(e), me(e.parent === E, "Respondable target must be a frame in the current window");
      }
      function bl(e) {
        me(E !== e, "Messages can not be sent to the same window.");
      }
      var un = {};
      function Eg(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
        me(!un[e], "A replyHandler already exists for this message channel."), un[e] = {
          replyHandler: t,
          sendToParent: r
        };
      }
      function Ag(e) {
        return un[e];
      }
      function Cg(e) {
        delete un[e];
      }
      var sn = [];
      function eo() {
        var e = "".concat(br(), ":").concat(br());
        return sn.includes(e) ? eo() : (sn.push(e), e);
      }
      function Fg(e) {
        return sn.includes(e) ? !1 : (sn.push(e), !0);
      }
      function to(e, t, r, a) {
        if (r ? Qi(e) : gl(e), t.message instanceof Error && !r)
          return x.log(t.message), !1;
        var n = wg(de({
          messageId: eo()
        }, t)), i = x._audit.allowedOrigins;
        return !i || !i.length ? !1 : (typeof a == "function" && Eg(t.channelId, a, r), i.forEach(function(o) {
          try {
            e.postMessage(n, o);
          } catch (u) {
            throw u instanceof e.DOMException ? new Error('allowedOrigins value "'.concat(o, '" is not a valid origin')) : u;
          }
        }), !0);
      }
      function Tg(e, t, r) {
        if (!e.parent !== E)
          return x.log(t);
        try {
          to(e, {
            topic: null,
            channelId: r,
            message: t,
            messageId: eo(),
            keepalive: !0
          }, !0);
        } catch (a) {
          return x.log(a);
        }
      }
      function yl(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
        return function(n, i, o) {
          var u = {
            channelId: t,
            message: n,
            keepalive: i
          };
          to(e, u, r, o);
        };
      }
      function Rg(e) {
        var t = x._audit.allowedOrigins;
        return t && t.includes("*") || t.includes(e);
      }
      function Sg(e, t) {
        var r = e.origin, a = e.data, n = e.source;
        try {
          var i = Dg(a) || {}, o = i.channelId, u = i.message, s = i.messageId;
          if (!Rg(r) || !Fg(s))
            return;
          if (u instanceof Error && n.parent !== E)
            return x.log(u), !1;
          try {
            if (i.topic) {
              var l = yl(n, o);
              Qi(n), t(i, l);
            } else
              kg(n, i);
          } catch (c) {
            Tg(n, c, o);
          }
        } catch (c) {
          return x.log(c), !1;
        }
      }
      function kg(e, t) {
        var r = t.channelId, a = t.message, n = t.keepalive, i = Ag(r) || {}, o = i.replyHandler, u = i.sendToParent;
        if (o) {
          u ? Qi(e) : gl(e);
          var s = yl(e, r, u);
          !n && r && Cg(r);
          try {
            o(a, n, s);
          } catch (l) {
            x.log(l), s(l, n);
          }
        }
      }
      var Og = {
        open: function(t) {
          if (typeof E.addEventListener == "function") {
            var r = function(n) {
              Sg(n, t);
            };
            return E.addEventListener("message", r, !1), function() {
              E.removeEventListener("message", r, !1);
            };
          }
        },
        post: function(t, r, a) {
          return typeof E.addEventListener != "function" ? !1 : to(t, r, !1, a);
        }
      };
      function wl(e) {
        e.updateMessenger(Og);
      }
      var ln, Dl, ro = {};
      function Et(e, t, r, a, n) {
        var i = {
          topic: t,
          message: r,
          channelId: "".concat(br(), ":").concat(br()),
          keepalive: a
        };
        return Dl(e, i, n);
      }
      function Mg(e, t) {
        var r = e.topic, a = e.message, n = e.keepalive, i = ro[r];
        if (i)
          try {
            i(a, n, t);
          } catch (o) {
            x.log(o), t(o, n);
          }
      }
      Et.updateMessenger = function(t) {
        var r = t.open, a = t.post;
        me(typeof r == "function", "open callback must be a function"), me(typeof a == "function", "post callback must be a function"), ln && ln();
        var n = r(Mg);
        n ? (me(typeof n == "function", "open callback must return a cleanup function"), ln = n) : ln = null, Dl = a;
      }, Et.subscribe = function(t, r) {
        me(typeof r == "function", "Subscriber callback must be a function"), me(!ro[t], "Topic ".concat(t, " is already registered to.")), ro[t] = r;
      }, Et.isInFrame = function() {
        var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : E;
        return !!t.frameElement;
      }, wl(Et);
      function _l(e, t, r, a) {
        var n, i, o = e.contentWindow, u = (n = (i = t.options) === null || i === void 0 ? void 0 : i.pingWaitTime) !== null && n !== void 0 ? n : 500;
        if (!o) {
          vr("Frame does not have a content window", e), r(null);
          return;
        }
        if (u === 0) {
          xl(e, t, r, a);
          return;
        }
        var s = setTimeout(function() {
          s = setTimeout(function() {
            t.debug ? a(El("No response from frame", e)) : r(null);
          }, 0);
        }, u);
        Et(o, "axe.ping", null, void 0, function() {
          clearTimeout(s), xl(e, t, r, a);
        });
      }
      function xl(e, t, r, a) {
        var n, i, o = (n = (i = t.options) === null || i === void 0 ? void 0 : i.frameWaitTime) !== null && n !== void 0 ? n : 6e4, u = e.contentWindow, s = setTimeout(function() {
          a(El("Axe in frame timed out", e));
        }, o);
        Et(u, "axe.start", t, void 0, function(l) {
          clearTimeout(s), l instanceof Error ? a(l) : r(l);
        });
      }
      function El(e, t) {
        var r;
        return x._tree && (r = Vi(t)), new Error(e + ": " + (r || t));
      }
      var ca = null, da = {
        update: function(t) {
          me(O(t) === "object", "serializer must be an object"), ca = t;
        },
        toSpec: function(t) {
          return da.dqElmToSpec(new Ht(t));
        },
        dqElmToSpec: function(t, r) {
          var a;
          return t instanceof Ht ? (r && (t = Ig(t, r)), typeof ((a = ca) === null || a === void 0 ? void 0 : a.toSpec) == "function" ? ca.toSpec(t) : t.toJSON()) : t;
        },
        mergeSpecs: function(t, r) {
          var a;
          return typeof ((a = ca) === null || a === void 0 ? void 0 : a.mergeSpecs) == "function" ? ca.mergeSpecs(t, r) : Ht.mergeSpecs(t, r);
        },
        mapRawResults: function(t) {
          return t.map(function(r) {
            return de({}, r, {
              nodes: da.mapRawNodeResults(r.nodes)
            });
          });
        },
        mapRawNodeResults: function(t) {
          return t?.map(function(r) {
            var a = r.node, n = qe(r, xp);
            n.node = da.dqElmToSpec(a);
            for (var i = 0, o = ["any", "all", "none"]; i < o.length; i++) {
              var u = o[i];
              n[u] = n[u].map(function(s) {
                var l = s.relatedNodes, c = qe(s, Ep);
                return c.relatedNodes = l.map(da.dqElmToSpec), c;
              });
            }
            return n;
          });
        }
      }, ht = da;
      function Ig(e, t) {
        var r = e.fromFrame, a = t.ancestry, n = t.xpath, i = t.selectors !== !1 || r;
        return e = new Ht(e.element, t, {
          source: e.source,
          nodeIndexes: e.nodeIndexes,
          selector: i ? e.selector : [":root"],
          ancestry: a ? e.ancestry : [":root"],
          xpath: n ? e.xpath : "/"
        }), e.fromFrame = r, e;
      }
      function Pg(e) {
        var t = [];
        return t.concat(e.any || []).concat(e.all || []).concat(e.none || []);
      }
      var cn = Pg;
      function Ng(e, t, r) {
        if (Array.isArray(e))
          return e.find(function(a) {
            return a !== null && O(a) === "object" && Object.hasOwn(a, t) && a[t] === r;
          });
      }
      var fa = Ng;
      function Lg(e, t, r) {
        e.forEach(function(a) {
          a.node = ht.mergeSpecs(a.node, r);
          var n = cn(a);
          n.forEach(function(i) {
            i.relatedNodes = i.relatedNodes.map(function(o) {
              return ht.mergeSpecs(o, r);
            });
          });
        });
      }
      function Bg(e, t) {
        for (var r = t[0].node, a, n = 0; n < e.length; n++) {
          a = e[n].node;
          var i = Al(a.nodeIndexes, r.nodeIndexes);
          if (i > 0 || i === 0 && r.selector.length < a.selector.length) {
            e.splice.apply(e, [n, 0].concat(ne(t)));
            return;
          }
        }
        e.push.apply(e, ne(t));
      }
      function qg(e) {
        return !e || !e.results ? null : Array.isArray(e.results) ? e.results.length ? e.results : null : [e.results];
      }
      function jg(e, t) {
        var r = [];
        return e.forEach(function(a) {
          var n = qg(a);
          if (!(!n || !n.length)) {
            var i = zg(a);
            n.forEach(function(o) {
              o.nodes && i && Lg(o.nodes, t, i);
              var u = fa(r, "id", o.id);
              u ? o.nodes.length && Bg(u.nodes, o.nodes) : r.push(o);
            });
          }
        }), r.forEach(function(a) {
          a.nodes && a.nodes.sort(function(n, i) {
            return Al(n.node.nodeIndexes, i.node.nodeIndexes);
          });
        }), r;
      }
      function Al() {
        for (var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = Math.max(e?.length, t?.length), a = 0; a < r; a++) {
          var n = e?.[a], i = t?.[a];
          if (typeof n != "number" || isNaN(n))
            return a === 0 ? 1 : -1;
          if (typeof i != "number" || isNaN(i))
            return a === 0 ? -1 : 1;
          if (n !== i)
            return n - i;
        }
        return 0;
      }
      var dn = jg;
      function zg(e) {
        return e.frameElement ? ht.toSpec(e.frameElement) : e.frameSpec ? e.frameSpec : null;
      }
      function Cl(e, t, r, a, n, i) {
        t = de({}, t, {
          elementRef: !1
        });
        var o = kt(), u = e.frames;
        u.forEach(function(s) {
          var l = s.node, c = qe(s, Ap);
          o.defer(function(d, f) {
            var p = {
              options: t,
              command: r,
              parameter: a,
              context: c
            };
            function m(h) {
              return d(h ? {
                results: h,
                frameElement: l
              } : null);
            }
            _l(l, p, m, f);
          });
        }), o.then(function(s) {
          n(dn(s, t));
        }).catch(i);
      }
      function Ut(e, t) {
        if (!e.shadowId && !t.shadowId && e.actualNode && typeof e.actualNode.contains == "function")
          return e.actualNode.contains(t.actualNode);
        do {
          if (e === t)
            return !0;
          if (t.nodeIndex < e.nodeIndex)
            return !1;
          t = t.parent;
        } while (t);
        return !1;
      }
      function Fl() {
        for (var e = {}, t = arguments.length, r = new Array(t), a = 0; a < t; a++)
          r[a] = arguments[a];
        return r.forEach(function(n) {
          if (!(!n || O(n) !== "object" || Array.isArray(n)))
            for (var i = 0, o = Object.keys(n); i < o.length; i++) {
              var u = o[i];
              !e.hasOwnProperty(u) || O(n[u]) !== "object" || Array.isArray(e[u]) ? e[u] = n[u] : e[u] = Fl(e[u], n[u]);
            }
        }), e;
      }
      var ao = Fl;
      function Vg(e, t) {
        Object.assign(e, t), Object.keys(t).filter(function(r) {
          return typeof t[r] == "function";
        }).forEach(function(r) {
          e[r] = null;
          try {
            e[r] = t[r](e);
          } catch {
          }
        });
      }
      var no = Vg, Hg = ["article", "aside", "blockquote", "body", "div", "footer", "h1", "h2", "h3", "h4", "h5", "h6", "header", "main", "nav", "p", "section", "span"];
      function $g(e) {
        if (e.shadowRoot) {
          var t = e.nodeName.toLowerCase();
          if (Hg.includes(t) || /^[a-z][a-z0-9_.-]*-[a-z0-9_.-]*$/.test(t))
            return !0;
        }
        return !1;
      }
      var fn = $g, io = {};
      Dt(io, {
        createGrid: function() {
          return yr;
        },
        findElmsInContext: function() {
          return Tl;
        },
        findNearbyElms: function() {
          return yn;
        },
        findUp: function() {
          return Lr;
        },
        findUpVirtual: function() {
          return Nr;
        },
        focusDisabled: function() {
          return vo;
        },
        getComposedParent: function() {
          return Ue;
        },
        getElementByReference: function() {
          return bo;
        },
        getElementCoordinates: function() {
          return so;
        },
        getElementStack: function() {
          return uc;
        },
        getModalDialog: function() {
          return rc;
        },
        getOverflowHiddenAncestors: function() {
          return ma;
        },
        getRootNode: function() {
          return Xe;
        },
        getScrollOffset: function() {
          return Hl;
        },
        getTabbableElements: function() {
          return sc;
        },
        getTargetRects: function() {
          return Dn;
        },
        getTargetSize: function() {
          return lc;
        },
        getTextElementStack: function() {
          return Lo;
        },
        getViewportSize: function() {
          return pn;
        },
        getVisibleChildTextRects: function() {
          return No;
        },
        hasContent: function() {
          return Fn;
        },
        hasContentVirtual: function() {
          return _a;
        },
        hasLangText: function() {
          return jo;
        },
        idrefs: function() {
          return Ot;
        },
        insertedIntoFocusOrder: function() {
          return Jc;
        },
        isCurrentPageLink: function() {
          return go;
        },
        isFocusable: function() {
          return Ne;
        },
        isHTML5: function() {
          return td;
        },
        isHiddenForEveryone: function() {
          return er;
        },
        isHiddenWithCSS: function() {
          return g0;
        },
        isInTabOrder: function() {
          return vt;
        },
        isInTextBlock: function() {
          return zo;
        },
        isInert: function() {
          return wn;
        },
        isModalOpen: function() {
          return xa;
        },
        isMultiline: function() {
          return nd;
        },
        isNativelyFocusable: function() {
          return Do;
        },
        isNode: function() {
          return A0;
        },
        isOffscreen: function() {
          return mn;
        },
        isOpaque: function() {
          return Dw;
        },
        isSkipLink: function() {
          return lu;
        },
        isVisible: function() {
          return Fw;
        },
        isVisibleOnScreen: function() {
          return st;
        },
        isVisibleToScreenReaders: function() {
          return Re;
        },
        isVisualContent: function() {
          return Bo;
        },
        reduceToElementsBelowFloating: function() {
          return h1;
        },
        shadowElementsFromPoint: function() {
          return Sw;
        },
        urlPropsFromAttribute: function() {
          return Nw;
        },
        visuallyContains: function() {
          return v1;
        },
        visuallyOverlaps: function() {
          return cu;
        },
        visuallySort: function() {
          return yo;
        }
      });
      function Ug(e) {
        var t = e.getRootNode && e.getRootNode() || L;
        return t === e && (t = L), t;
      }
      var pa = Ug, Xe = pa;
      function Gg(e) {
        var t = e.context, r = e.value, a = e.attr, n = e.elm, i = n === void 0 ? "" : n, o, u = Oe(r);
        return t.nodeType === 9 || t.nodeType === 11 ? o = t : o = Xe(t), Array.from(o.querySelectorAll(i + "[" + a + "=" + u + "]"));
      }
      var Tl = Gg;
      function Wg(e, t) {
        var r;
        if (r = e.actualNode, !e.shadowId && typeof e.actualNode.closest == "function") {
          var a = e.actualNode.closest(t);
          return a || null;
        }
        do
          r = r.assignedSlot ? r.assignedSlot : r.parentNode, r && r.nodeType === 11 && (r = r.host);
        while (r && !kr(r, t) && r !== L.documentElement);
        return !r || !kr(r, t) ? null : r;
      }
      var Nr = Wg;
      function Yg(e, t) {
        return Nr(le(e), t);
      }
      var Lr = Yg;
      function oo(e, t) {
        return (e.left | 0) < (t.right | 0) && (e.right | 0) > (t.left | 0) && (e.top | 0) < (t.bottom | 0) && (e.bottom | 0) > (t.top | 0);
      }
      var Rl = Fe(function(t) {
        var r = [];
        if (!t)
          return r;
        var a = t.getComputedStylePropertyValue("overflow");
        return a === "hidden" && r.push(t), r.concat(Rl(t.parent));
      }), ma = Rl, Kg = /rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/, Xg = /(\w+)\((\d+)/;
      function Sl(e) {
        return ["style", "script", "noscript", "template"].includes(e.props.nodeName);
      }
      function kl(e) {
        return e.props.nodeName === "area" ? !1 : e.getComputedStylePropertyValue("display") === "none";
      }
      function Ol(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.isAncestor;
        return !r && ["hidden", "collapse"].includes(e.getComputedStylePropertyValue("visibility"));
      }
      function Ml(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.isAncestor;
        return !!r && e.getComputedStylePropertyValue("content-visibility") === "hidden";
      }
      function Il(e) {
        return e.attr("aria-hidden") === "true";
      }
      function Pl(e) {
        return e.getComputedStylePropertyValue("opacity") === "0";
      }
      function Nl(e) {
        var t = Yt(e.actualNode), r = parseInt(e.getComputedStylePropertyValue("height")), a = parseInt(e.getComputedStylePropertyValue("width"));
        return !!t && (r === 0 || a === 0);
      }
      function Ll(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.isAncestor;
        if (r)
          return !1;
        var a = e.getComputedStylePropertyValue("position");
        if (a === "fixed")
          return !1;
        var n = ma(e);
        if (!n.length)
          return !1;
        var i = e.boundingClientRect;
        return n.some(function(o) {
          if (a === "absolute" && !Zg(e, o) && o.getComputedStylePropertyValue("position") === "static")
            return !1;
          var u = o.boundingClientRect;
          return u.width < 2 || u.height < 2 ? !0 : !oo(i, u);
        });
      }
      function Bl(e) {
        var t = e.getComputedStylePropertyValue("clip").match(Kg), r = e.getComputedStylePropertyValue("clip-path").match(Xg);
        if (t && t.length === 5) {
          var a = e.getComputedStylePropertyValue("position");
          if (["fixed", "absolute"].includes(a))
            return t[3] - t[1] <= 0 && t[2] - t[4] <= 0;
        }
        if (r) {
          var n = r[1], i = parseInt(r[2], 10);
          switch (n) {
            case "inset":
              return i >= 50;
            case "circle":
              return i === 0;
          }
        }
        return !1;
      }
      function uo(e, t) {
        var r = ut(e, "map");
        if (!r)
          return !0;
        var a = r.attr("name");
        if (!a)
          return !0;
        var n = pa(e.actualNode);
        if (!n || n.nodeType !== 9)
          return !0;
        var i = ft(x._tree, 'img[usemap="#'.concat(Oe(a), '"]'));
        return !i || !i.length ? !0 : i.some(function(o) {
          return !t(o);
        });
      }
      function ql(e) {
        var t;
        if (((t = e.parent) === null || t === void 0 ? void 0 : t.props.nodeName) !== "details")
          return !1;
        if (e.props.nodeName === "summary") {
          var r = e.parent.children.find(function(a) {
            return a.props.nodeName === "summary";
          });
          if (r === e)
            return !1;
        }
        return !e.parent.hasAttr("open");
      }
      function Zg(e, t) {
        for (var r = e.parent; r && r !== t; ) {
          if (["relative", "sticky"].includes(r.getComputedStylePropertyValue("position")))
            return !0;
          r = r.parent;
        }
        return !1;
      }
      var Jg = [kl, Ol, Ml, ql];
      function er(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.skipAncestors, a = t.isAncestor, n = a === void 0 ? !1 : a;
        return e = we(e).vNode, r ? jl(e, n) : zl(e, n);
      }
      var jl = Fe(function(t, r) {
        return Sl(t) ? !0 : t.actualNode ? !!(Jg.some(function(a) {
          return a(t, {
            isAncestor: r
          });
        }) || !t.actualNode.isConnected) : !1;
      }), zl = Fe(function(t, r) {
        return jl(t, r) ? !0 : t.parent ? zl(t.parent, !0) : !1;
      });
      function Vl(e) {
        if (e.assignedSlot)
          return Vl(e.assignedSlot);
        if (e.parentNode) {
          var t = e.parentNode;
          if (t.nodeType === 1)
            return t;
          if (t.host)
            return t.host;
        }
        return null;
      }
      var Ue = Vl;
      function Qg(e) {
        if (!e.nodeType && e.document && (e = e.document), e.nodeType === 9) {
          var t = e.documentElement, r = e.body;
          return {
            left: t && t.scrollLeft || r && r.scrollLeft || 0,
            top: t && t.scrollTop || r && r.scrollTop || 0
          };
        }
        return {
          left: e.scrollLeft,
          top: e.scrollTop
        };
      }
      var Hl = Qg;
      function eb(e) {
        var t = Hl(L), r = t.left, a = t.top, n = e.getBoundingClientRect();
        return {
          top: n.top + a,
          right: n.right + r,
          bottom: n.bottom + a,
          left: n.left + r,
          width: n.right - n.left,
          height: n.bottom - n.top
        };
      }
      var so = eb;
      function tb(e) {
        var t = e.document, r = t.documentElement;
        if (e.innerWidth)
          return {
            width: e.innerWidth,
            height: e.innerHeight
          };
        if (r)
          return {
            width: r.clientWidth,
            height: r.clientHeight
          };
        var a = t.body;
        return {
          width: a.clientWidth,
          height: a.clientHeight
        };
      }
      var pn = tb;
      function rb(e, t) {
        for (e = Ue(e); e && e.nodeName.toLowerCase() !== "html"; ) {
          if (e.scrollTop && (t += e.scrollTop, t >= 0))
            return !1;
          e = Ue(e);
        }
        return !0;
      }
      function ab(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.isAncestor;
        if (r)
          return !1;
        var a = we(e), n = a.domNode;
        if (n) {
          var i, o = L.documentElement, u = E.getComputedStyle(n), s = E.getComputedStyle(L.body || o).getPropertyValue("direction"), l = so(n);
          if (l.bottom < 0 && (rb(n, l.bottom) || u.position === "absolute"))
            return !0;
          if (l.left === 0 && l.right === 0)
            return !1;
          if (s === "ltr") {
            if (l.right <= 0)
              return !0;
          } else if (i = Math.max(o.scrollWidth, pn(E).width), l.left >= i)
            return !0;
          return !1;
        }
      }
      var mn = ab, nb = [Pl, Nl, Ll, Bl, mn];
      function st(e) {
        return e = we(e).vNode, lo(e);
      }
      var lo = Fe(function(t, r) {
        return t.actualNode && t.props.nodeName === "area" ? !uo(t, lo) : er(t, {
          skipAncestors: !0,
          isAncestor: r
        }) || t.actualNode && nb.some(function(a) {
          return a(t, {
            isAncestor: r
          });
        }) ? !1 : t.parent ? lo(t.parent, !0) : !0;
      });
      function hn(e, t) {
        var r = Math.min(e.top, t.top), a = Math.max(e.right, t.right), n = Math.max(e.bottom, t.bottom), i = Math.min(e.left, t.left);
        return new E.DOMRect(i, r, a - i, n - r);
      }
      function vn(e, t) {
        var r = e.x, a = e.y, n = t.top, i = t.right, o = t.bottom, u = t.left;
        return a >= n && r <= i && a <= o && r >= u;
      }
      var $l = {};
      Dt($l, {
        getBoundingRect: function() {
          return hn;
        },
        getIntersectionRect: function() {
          return gn;
        },
        getOffset: function() {
          return Gl;
        },
        getRectCenter: function() {
          return ha;
        },
        hasVisualOverlap: function() {
          return co;
        },
        isPointInRect: function() {
          return vn;
        },
        rectHasMinimumSize: function() {
          return Gt;
        },
        rectsOverlap: function() {
          return oo;
        },
        splitRects: function() {
          return fo;
        }
      });
      function gn(e, t) {
        var r = Math.max(e.left, t.left), a = Math.min(e.right, t.right), n = Math.max(e.top, t.top), i = Math.min(e.bottom, t.bottom);
        return r >= a || n >= i ? null : new E.DOMRect(r, n, a - r, i - n);
      }
      function ha(e) {
        var t = e.left, r = e.top, a = e.width, n = e.height;
        return new E.DOMPoint(t + a / 2, r + n / 2);
      }
      var Ul = 0.05;
      function Gt(e, t) {
        var r = t.width, a = t.height;
        return r + Ul >= e && a + Ul >= e;
      }
      function Gl(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 12, a = Dn(e), n = Dn(t);
        if (!a.length || !n.length)
          return null;
        var i = a.reduce(hn), o = ha(i), u = 1 / 0, s = Ce(n), l;
        try {
          for (s.s(); !(l = s.n()).done; ) {
            var c = l.value;
            if (vn(o, c))
              return 0;
            var d = ib(o, c), f = Wl(o, d);
            u = Math.min(u, f);
          }
        } catch (g) {
          s.e(g);
        } finally {
          s.f();
        }
        var p = lc(t);
        if (Gt(r * 2, p))
          return u;
        var m = n.reduce(hn), h = ha(m), v = Wl(o, h) - r;
        return Math.max(0, Math.min(u, v));
      }
      function ib(e, t) {
        var r, a;
        return e.x < t.left ? r = t.left : e.x > t.right ? r = t.right : r = e.x, e.y < t.top ? a = t.top : e.y > t.bottom ? a = t.bottom : a = e.y, {
          x: r,
          y: a
        };
      }
      function Wl(e, t) {
        return Math.hypot(e.x - t.x, e.y - t.y);
      }
      function co(e, t) {
        var r = e.boundingClientRect, a = t.boundingClientRect;
        return r.left >= a.right || r.right <= a.left || r.top >= a.bottom || r.bottom <= a.top ? !1 : yo(e, t) > 0;
      }
      function fo(e, t) {
        var r = [e], a = Ce(t), n;
        try {
          var i = function() {
            var u = n.value;
            if (r = r.reduce(function(s, l) {
              return s.concat(ob(l, u));
            }, []), r.length > 4e3)
              throw new Error("splitRects: Too many rects");
          };
          for (a.s(); !(n = a.n()).done; )
            i();
        } catch (o) {
          a.e(o);
        } finally {
          a.f();
        }
        return r;
      }
      function ob(e, t) {
        var r = e.top, a = e.left, n = e.bottom, i = e.right, o = r < t.bottom && n > t.top, u = a < t.right && i > t.left, s = [];
        if (bn(t.top, r, n) && u && s.push({
          top: r,
          left: a,
          bottom: t.top,
          right: i
        }), bn(t.right, a, i) && o && s.push({
          top: r,
          left: t.right,
          bottom: n,
          right: i
        }), bn(t.bottom, r, n) && u && s.push({
          top: t.bottom,
          right: i,
          bottom: n,
          left: a
        }), bn(t.left, a, i) && o && s.push({
          top: r,
          left: a,
          bottom: n,
          right: t.left
        }), s.length === 0) {
          if (sb(e, t))
            return [];
          s.push(e);
        }
        return s.map(ub);
      }
      var bn = function(t, r, a) {
        return t > r && t < a;
      };
      function ub(e) {
        return new E.DOMRect(e.left, e.top, e.right - e.left, e.bottom - e.top);
      }
      function sb(e, t) {
        return e.top >= t.top && e.left >= t.left && e.bottom <= t.bottom && e.right <= t.right;
      }
      var Yl = 0, lb = 0.1, Kl = 0.2, Xl = 0.3, po = 0;
      function yr() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : L.body, t = arguments.length > 1 ? arguments[1] : void 0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        if (ue.get("gridCreated") && !r)
          return se.gridSize;
        if (ue.set("gridCreated", !0), !r) {
          var a, n = le(L.documentElement);
          if (n || (n = new du(L.documentElement)), po = 0, n._stackingOrder = [Ql(Yl, po++, null)], (a = t) !== null && a !== void 0 || (t = new mo()), ec(t, n), Yt(n.actualNode)) {
            var i = new mo(n);
            n._subGrid = i;
          }
        }
        for (var o = L.createTreeWalker(e, E.NodeFilter.SHOW_ELEMENT, null, !1), u = r ? o.nextNode() : o.currentNode; u; ) {
          var s = le(u);
          s && s.parent ? r = s.parent : u.assignedSlot ? r = le(u.assignedSlot) : u.parentElement ? r = le(u.parentElement) : u.parentNode && le(u.parentNode) && (r = le(u.parentNode)), s || (s = new x.VirtualNode(u, r)), s._stackingOrder = cb(s, r, po++);
          var l = pb(s, r), c = l ? l._subGrid : t;
          if (Yt(s.actualNode)) {
            var d = new mo(s);
            s._subGrid = d;
          }
          var f = s.boundingClientRect;
          f.width !== 0 && f.height !== 0 && st(u) && ec(c, s), fn(u) && yr(u.shadowRoot, c, s), u = o.nextNode();
        }
        return se.gridSize;
      }
      function Zl(e, t) {
        var r = e.getComputedStylePropertyValue("position"), a = e.getComputedStylePropertyValue("z-index");
        if (r === "fixed" || r === "sticky" || a !== "auto" && r !== "static" || e.getComputedStylePropertyValue("opacity") !== "1")
          return !0;
        var n = e.getComputedStylePropertyValue("-webkit-transform") || e.getComputedStylePropertyValue("-ms-transform") || e.getComputedStylePropertyValue("transform") || "none";
        if (n !== "none")
          return !0;
        var i = e.getComputedStylePropertyValue("mix-blend-mode");
        if (i && i !== "normal")
          return !0;
        var o = e.getComputedStylePropertyValue("filter");
        if (o && o !== "none")
          return !0;
        var u = e.getComputedStylePropertyValue("perspective");
        if (u && u !== "none")
          return !0;
        var s = e.getComputedStylePropertyValue("clip-path");
        if (s && s !== "none")
          return !0;
        var l = e.getComputedStylePropertyValue("-webkit-mask") || e.getComputedStylePropertyValue("mask") || "none";
        if (l !== "none")
          return !0;
        var c = e.getComputedStylePropertyValue("-webkit-mask-image") || e.getComputedStylePropertyValue("mask-image") || "none";
        if (c !== "none")
          return !0;
        var d = e.getComputedStylePropertyValue("-webkit-mask-border") || e.getComputedStylePropertyValue("mask-border") || "none";
        if (d !== "none" || e.getComputedStylePropertyValue("isolation") === "isolate")
          return !0;
        var f = e.getComputedStylePropertyValue("will-change");
        if (f === "transform" || f === "opacity" || e.getComputedStylePropertyValue("-webkit-overflow-scrolling") === "touch")
          return !0;
        var p = e.getComputedStylePropertyValue("contain");
        return !!(["layout", "paint", "strict", "content"].includes(p) || a !== "auto" && Jl(t));
      }
      function Jl(e) {
        if (!e)
          return !1;
        var t = e.getComputedStylePropertyValue("display");
        return ["flex", "inline-flex", "grid", "inline-grid"].includes(t);
      }
      function cb(e, t, r) {
        var a = t._stackingOrder.slice();
        if (Zl(e, t)) {
          var n = a.findIndex(function(o) {
            var u = o.stackLevel;
            return [Yl, Kl, Xl].includes(u);
          });
          n !== -1 && a.splice(n, a.length - n);
        }
        var i = db(e, t);
        return i !== null && a.push(Ql(i, r, e)), a;
      }
      function Ql(e, t, r) {
        return {
          stackLevel: e,
          treeOrder: t,
          vNode: r
        };
      }
      function db(e, t) {
        var r = fb(e, t);
        return ["auto", "0"].includes(r) ? e.getComputedStylePropertyValue("position") !== "static" ? Xl : e.getComputedStylePropertyValue("float") !== "none" ? Kl : Zl(e, t) ? lb : null : parseInt(r);
      }
      function fb(e, t) {
        var r = e.getComputedStylePropertyValue("position");
        return r === "static" && !Jl(t) ? "auto" : e.getComputedStylePropertyValue("z-index");
      }
      function pb(e, t) {
        for (var r = null, a = [e]; t; ) {
          if (Yt(t.actualNode)) {
            r = t;
            break;
          }
          if (t._scrollRegionParent) {
            r = t._scrollRegionParent;
            break;
          }
          a.push(t), t = le(t.actualNode.parentElement || t.actualNode.parentNode);
        }
        return a.forEach(function(n) {
          return n._scrollRegionParent = r;
        }), r;
      }
      function ec(e, t) {
        var r = ma(t);
        t.clientRects.forEach(function(a) {
          var n, i = r.reduce(function(u, s) {
            return u && gn(u, s.boundingClientRect);
          }, a);
          if (i) {
            (n = t._grid) !== null && n !== void 0 || (t._grid = e);
            var o = e.getGridPositionOfRect(i);
            e.loopGridPosition(o, function(u) {
              u.includes(t) || u.push(t);
            });
          }
        });
      }
      var mo = function() {
        function e() {
          var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
          Tt(this, e), this.container = t, this.cells = [];
        }
        return Rt(e, [{
          key: "toGridIndex",
          value: function(r) {
            return Math.floor(r / se.gridSize);
          }
        }, {
          key: "getCellFromPoint",
          value: function(r) {
            var a, n, i = r.x, o = r.y;
            me(this.boundaries, "Grid does not have cells added");
            var u = this.toGridIndex(o), s = this.toGridIndex(i);
            me(vn({
              y: u,
              x: s
            }, this.boundaries), "Element midpoint exceeds the grid bounds");
            var l = (a = this.cells[u - this.cells._negativeIndex]) !== null && a !== void 0 ? a : [];
            return (n = l[s - l._negativeIndex]) !== null && n !== void 0 ? n : [];
          }
        }, {
          key: "loopGridPosition",
          value: function(r, a) {
            var n = r, i = n.left, o = n.right, u = n.top, s = n.bottom;
            this.boundaries && (r = hn(this.boundaries, r)), this.boundaries = r, tc(this.cells, u, s, function(l, c) {
              tc(l, i, o, function(d, f) {
                a(d, {
                  row: c,
                  col: f
                });
              });
            });
          }
        }, {
          key: "getGridPositionOfRect",
          value: function(r) {
            var a = r.top, n = r.right, i = r.bottom, o = r.left, u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            return a = this.toGridIndex(a - u), n = this.toGridIndex(n + u - 1), i = this.toGridIndex(i + u - 1), o = this.toGridIndex(o - u), new E.DOMRect(o, a, n - o, i - a);
          }
        }]);
      }();
      function tc(e, t, r, a) {
        var n;
        if ((n = e._negativeIndex) !== null && n !== void 0 || (e._negativeIndex = 0), t < e._negativeIndex) {
          for (var i = 0; i < e._negativeIndex - t; i++)
            e.splice(0, 0, []);
          e._negativeIndex = t;
        }
        for (var o = t - e._negativeIndex, u = r - e._negativeIndex, s = o; s <= u; s++) {
          var l, c;
          (c = e[l = s]) !== null && c !== void 0 || (e[l] = []), a(e[s], s + e._negativeIndex);
        }
      }
      function yn(e) {
        var t, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        if (yr(), !((t = e._grid) !== null && t !== void 0 && (t = t.cells) !== null && t !== void 0 && t.length))
          return [];
        var a = e.boundingClientRect, n = e._grid, i = ho(e), o = n.getGridPositionOfRect(a, r), u = [];
        return n.loopGridPosition(o, function(s) {
          var l = Ce(s), c;
          try {
            for (l.s(); !(c = l.n()).done; ) {
              var d = c.value;
              d && d !== e && !u.includes(d) && i === ho(d) && u.push(d);
            }
          } catch (f) {
            l.e(f);
          } finally {
            l.f();
          }
        }), u;
      }
      var ho = Fe(function(e) {
        return e ? e.getComputedStylePropertyValue("position") === "fixed" ? !0 : ho(e.parent) : !1;
      }), mb = Fe(function() {
        var t;
        if (!x._tree)
          return null;
        var r = Bt(x._tree[0], "dialog[open]", function(n) {
          var i = n.boundingClientRect, o = L.elementsFromPoint(i.left + 1, i.top + 1);
          return o.includes(n.actualNode) && st(n);
        });
        if (!r.length)
          return null;
        var a = r.find(function(n) {
          var i = n.boundingClientRect, o = L.elementsFromPoint(i.left - 10, i.top - 10);
          return o.includes(n.actualNode);
        });
        return a || ((t = r.find(function(n) {
          var i, o = (i = hb(n)) !== null && i !== void 0 ? i : {}, u = o.vNode, s = o.rect;
          if (!u)
            return !1;
          var l = L.elementsFromPoint(s.left + 1, s.top + 1);
          return !l.includes(u.actualNode);
        })) !== null && t !== void 0 ? t : null);
      }), rc = mb;
      function hb(e) {
        yr();
        var t = x._tree[0]._grid, r = new E.DOMRect(0, 0, E.innerWidth, E.innerHeight);
        if (t)
          for (var a = 0; a < t.cells.length; a++) {
            var n = t.cells[a];
            if (n)
              for (var i = 0; i < n.length; i++) {
                var o = n[i];
                if (o)
                  for (var u = 0; u < o.length; u++) {
                    var s = o[u], l = s.boundingClientRect, c = gn(l, r);
                    if (s.props.nodeName !== "html" && s !== e && s.getComputedStylePropertyValue("pointer-events") !== "none" && c)
                      return {
                        vNode: s,
                        rect: c
                      };
                  }
              }
          }
      }
      function wn(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.skipAncestors, a = t.isAncestor;
        return r ? ac(e, a) : nc(e, a);
      }
      var ac = Fe(function(t, r) {
        if (t.hasAttr("inert"))
          return !0;
        if (!r && t.actualNode) {
          var a = rc();
          if (a && !Ut(a, t))
            return !0;
        }
        return !1;
      }), nc = Fe(function(t, r) {
        return ac(t, r) ? !0 : t.parent ? nc(t.parent, !0) : !1;
      }), vb = ["button", "command", "fieldset", "keygen", "optgroup", "option", "select", "textarea", "input"];
      function gb(e) {
        return vb.includes(e);
      }
      function bb(e) {
        var t = we(e), r = t.vNode;
        if (gb(r.props.nodeName) && r.hasAttr("disabled") || wn(r))
          return !0;
        for (var a = r.parent, n = [], i = !1; a && a.shadowId === r.shadowId && !i && (n.push(a), a.props.nodeName !== "legend"); ) {
          if (a._inDisabledFieldset !== void 0) {
            i = a._inDisabledFieldset;
            break;
          }
          a.props.nodeName === "fieldset" && a.hasAttr("disabled") && (i = !0), a = a.parent;
        }
        return n.forEach(function(o) {
          return o._inDisabledFieldset = i;
        }), i ? !0 : r.props.nodeName !== "area" && r.actualNode ? er(r) : !1;
      }
      var vo = bb, yb = /^\/\#/, wb = /^#[!/]/;
      function go(e) {
        var t, r = e.getAttribute("href");
        if (!r || r === "#")
          return !1;
        if (yb.test(r))
          return !0;
        var a = e.hash, n = e.protocol, i = e.hostname, o = e.port, u = e.pathname;
        if (wb.test(a))
          return !1;
        if (r.charAt(0) === "#")
          return !0;
        if (typeof ((t = E.location) === null || t === void 0 ? void 0 : t.origin) != "string" || E.location.origin.indexOf("://") === -1)
          return null;
        var s = E.location.origin + E.location.pathname, l;
        return i ? l = "".concat(n, "//").concat(i).concat(o ? ":".concat(o) : "") : l = E.location.origin, u ? l += (u[0] !== "/" ? "/" : "") + u : l += E.location.pathname, l === s;
      }
      function Db(e, t) {
        var r = e.getAttribute(t);
        if (!r || t === "href" && !go(e))
          return null;
        r.indexOf("#") !== -1 && (r = decodeURIComponent(r.substr(r.indexOf("#") + 1)));
        var a = L.getElementById(r);
        return a || (a = L.getElementsByName(r), a.length ? a[0] : null);
      }
      var bo = Db;
      function yo(e, t) {
        yr();
        for (var r = Math.max(e._stackingOrder.length, t._stackingOrder.length), a = 0; a < r; a++) {
          if (typeof t._stackingOrder[a] > "u")
            return -1;
          if (typeof e._stackingOrder[a] > "u" || t._stackingOrder[a].stackLevel > e._stackingOrder[a].stackLevel)
            return 1;
          if (t._stackingOrder[a].stackLevel < e._stackingOrder[a].stackLevel)
            return -1;
          if (t._stackingOrder[a].treeOrder !== e._stackingOrder[a].treeOrder)
            return t._stackingOrder[a].treeOrder - e._stackingOrder[a].treeOrder;
        }
        var n = e.actualNode, i = t.actualNode;
        if (n.getRootNode && n.getRootNode() !== i.getRootNode()) {
          for (var o = []; n; )
            o.push({
              root: n.getRootNode(),
              node: n
            }), n = n.getRootNode().host;
          for (; i && !o.find(function(v) {
            return v.root === i.getRootNode();
          }); )
            i = i.getRootNode().host;
          if (n = o.find(function(v) {
            return v.root === i.getRootNode();
          }).node, n === i)
            return e.actualNode.getRootNode() !== n.getRootNode() ? -1 : 1;
        }
        var u = E.Node, s = u.DOCUMENT_POSITION_FOLLOWING, l = u.DOCUMENT_POSITION_CONTAINS, c = u.DOCUMENT_POSITION_CONTAINED_BY, d = n.compareDocumentPosition(i), f = d & s ? 1 : -1, p = d & l || d & c, m = ic(e), h = ic(t);
        return m === h || p ? f : h - m;
      }
      function ic(e) {
        return e.getComputedStylePropertyValue("display").indexOf("inline") !== -1 ? 2 : oc(e) ? 1 : 0;
      }
      function oc(e) {
        if (!e)
          return !1;
        if (e._isFloated !== void 0)
          return e._isFloated;
        var t = e.getComputedStylePropertyValue("float");
        if (t !== "none")
          return e._isFloated = !0, !0;
        var r = oc(e.parent);
        return e._isFloated = r, r;
      }
      function wo(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, a = ha(t), n = e.getCellFromPoint(a) || [], i = Math.floor(a.x), o = Math.floor(a.y), u = n.filter(function(l) {
          return l.clientRects.some(function(c) {
            var d = c.left, f = c.top;
            return i < Math.floor(d + c.width) && i >= Math.floor(d) && o < Math.floor(f + c.height) && o >= Math.floor(f);
          });
        }), s = e.container;
        return s && (u = wo(s._grid, s.boundingClientRect, !0).concat(u)), r || (u = u.sort(yo).map(function(l) {
          return l.actualNode;
        }).concat(L.documentElement).filter(function(l, c, d) {
          return d.indexOf(l) === c;
        })), u;
      }
      function _b(e) {
        yr();
        var t = le(e), r = t._grid;
        return r ? wo(r, t.boundingClientRect) : [];
      }
      var uc = _b;
      function xb(e) {
        var t = ft(e, "*"), r = t.filter(function(a) {
          var n = a.isFocusable, i = Lt(a.actualNode.getAttribute("tabindex"));
          return i !== null ? n && i >= 0 : n;
        });
        return r;
      }
      var sc = xb;
      function Eb(e) {
        var t = we(e), r = t.vNode;
        if (!r || vo(r))
          return !1;
        switch (r.props.nodeName) {
          case "a":
          case "area":
            if (r.hasAttr("href"))
              return !0;
            break;
          case "input":
            return r.props.type !== "hidden";
          case "textarea":
          case "select":
          case "summary":
          case "button":
            return !0;
          case "details":
            return !ft(r, "summary").length;
        }
        return !1;
      }
      var Do = Eb;
      function Ne(e) {
        var t = we(e), r = t.vNode;
        if (r.props.nodeType !== 1 || vo(r))
          return !1;
        if (Do(r))
          return !0;
        var a = Lt(r.attr("tabindex"));
        return a !== null;
      }
      function vt(e) {
        var t = we(e), r = t.vNode;
        if (r.props.nodeType !== 1)
          return !1;
        var a = Lt(r.attr("tabindex"));
        return a <= -1 ? !1 : Ne(r);
      }
      var Dn = Fe(Ab);
      function Ab(e) {
        var t = e.boundingClientRect, r = yn(e).filter(function(n) {
          return co(e, n) && n.getComputedStylePropertyValue("pointer-events") !== "none" && !Cb(e, n);
        });
        if (!r.length)
          return [t];
        var a = r.map(function(n) {
          var i = n.boundingClientRect;
          return i;
        });
        return fo(t, a);
      }
      function Cb(e, t) {
        return Ut(e, t) && !vt(t);
      }
      var lc = Fe(Fb);
      function Fb(e, t) {
        var r = Dn(e);
        return Tb(r, t);
      }
      function Tb(e, t) {
        return e.reduce(function(r, a) {
          var n = Gt(t, r), i = Gt(t, a);
          if (n !== i)
            return n ? r : a;
          var o = r.width * r.height, u = a.width * a.height;
          return o > u ? r : a;
        });
      }
      var va = {};
      Dt(va, {
        accessibleText: function() {
          return wr;
        },
        accessibleTextVirtual: function() {
          return Ge;
        },
        autocomplete: function() {
          return Er;
        },
        formControlValue: function() {
          return jc;
        },
        formControlValueMethods: function() {
          return Ro;
        },
        hasUnicode: function() {
          return Mo;
        },
        isHumanInterpretable: function() {
          return Po;
        },
        isIconLigature: function() {
          return Io;
        },
        isValidAutocomplete: function() {
          return Wc;
        },
        label: function() {
          return n0;
        },
        labelText: function() {
          return So;
        },
        labelVirtual: function() {
          return Cn;
        },
        nativeElementType: function() {
          return o0;
        },
        nativeTextAlternative: function() {
          return Vc;
        },
        nativeTextMethods: function() {
          return zc;
        },
        removeUnicode: function() {
          return Da;
        },
        sanitize: function() {
          return re;
        },
        subtreeText: function() {
          return tr;
        },
        titleText: function() {
          return xn;
        },
        unsupported: function() {
          return Sc;
        },
        visible: function() {
          return Yc;
        },
        visibleTextNodes: function() {
          return u0;
        },
        visibleVirtual: function() {
          return It;
        }
      });
      function Rb(e, t) {
        e = e.actualNode || e;
        try {
          var r = Xe(e), a = [], n = e.getAttribute(t);
          if (n) {
            n = Ze(n);
            for (var i = 0; i < n.length; i++)
              a.push(r.getElementById(n[i]));
          }
          return a;
        } catch {
          throw new TypeError("Cannot resolve id references for non-DOM nodes");
        }
      }
      var Ot = Rb;
      function Sb(e, t) {
        var r = le(e);
        return Ge(r, t);
      }
      var wr = Sb;
      function kb(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = we(e), a = r.vNode;
        if (a?.props.nodeType !== 1 || a.props.nodeType !== 1 || t.inLabelledByContext || t.inControlContext || !a.attr("aria-labelledby"))
          return "";
        var n = Ot(a, "aria-labelledby").filter(function(i) {
          return i;
        });
        return n.reduce(function(i, o) {
          var u = wr(o, de({
            inLabelledByContext: !0,
            startNode: t.startNode || a
          }, t));
          return i ? "".concat(i, " ").concat(u) : u;
        }, "");
      }
      var ga = kb;
      function ba(e) {
        var t = we(e), r = t.vNode;
        return r?.props.nodeType !== 1 ? "" : r.attr("aria-label") || "";
      }
      var Ob = {
        "aria-activedescendant": {
          type: "idref",
          allowEmpty: !0
        },
        "aria-atomic": {
          type: "boolean",
          global: !0
        },
        "aria-autocomplete": {
          type: "nmtoken",
          values: ["inline", "list", "both", "none"]
        },
        "aria-braillelabel": {
          type: "string",
          allowEmpty: !0,
          global: !0
        },
        "aria-brailleroledescription": {
          type: "string",
          allowEmpty: !0,
          global: !0
        },
        "aria-busy": {
          type: "boolean",
          global: !0
        },
        "aria-checked": {
          type: "nmtoken",
          values: ["false", "mixed", "true", "undefined"]
        },
        "aria-colcount": {
          type: "int",
          minValue: -1
        },
        "aria-colindex": {
          type: "int",
          minValue: 1
        },
        "aria-colspan": {
          type: "int",
          minValue: 1
        },
        "aria-controls": {
          type: "idrefs",
          allowEmpty: !0,
          global: !0
        },
        "aria-current": {
          type: "nmtoken",
          allowEmpty: !0,
          values: ["page", "step", "location", "date", "time", "true", "false"],
          global: !0
        },
        "aria-describedby": {
          type: "idrefs",
          allowEmpty: !0,
          global: !0
        },
        "aria-description": {
          type: "string",
          allowEmpty: !0,
          global: !0
        },
        "aria-details": {
          type: "idref",
          allowEmpty: !0,
          global: !0
        },
        "aria-disabled": {
          type: "boolean",
          global: !0
        },
        "aria-dropeffect": {
          type: "nmtokens",
          values: ["copy", "execute", "link", "move", "none", "popup"],
          global: !0
        },
        "aria-errormessage": {
          type: "idref",
          allowEmpty: !0,
          global: !0
        },
        "aria-expanded": {
          type: "nmtoken",
          values: ["true", "false", "undefined"]
        },
        "aria-flowto": {
          type: "idrefs",
          allowEmpty: !0,
          global: !0
        },
        "aria-grabbed": {
          type: "nmtoken",
          values: ["true", "false", "undefined"],
          global: !0
        },
        "aria-haspopup": {
          type: "nmtoken",
          allowEmpty: !0,
          values: ["true", "false", "menu", "listbox", "tree", "grid", "dialog"],
          global: !0
        },
        "aria-hidden": {
          type: "nmtoken",
          values: ["true", "false", "undefined"],
          global: !0
        },
        "aria-invalid": {
          type: "nmtoken",
          values: ["grammar", "false", "spelling", "true"],
          global: !0
        },
        "aria-keyshortcuts": {
          type: "string",
          allowEmpty: !0,
          global: !0
        },
        "aria-label": {
          type: "string",
          allowEmpty: !0,
          global: !0
        },
        "aria-labelledby": {
          type: "idrefs",
          allowEmpty: !0,
          global: !0
        },
        "aria-level": {
          type: "int",
          minValue: 1
        },
        "aria-live": {
          type: "nmtoken",
          values: ["assertive", "off", "polite"],
          global: !0
        },
        "aria-modal": {
          type: "boolean"
        },
        "aria-multiline": {
          type: "boolean"
        },
        "aria-multiselectable": {
          type: "boolean"
        },
        "aria-orientation": {
          type: "nmtoken",
          values: ["horizontal", "undefined", "vertical"]
        },
        "aria-owns": {
          type: "idrefs",
          allowEmpty: !0,
          global: !0
        },
        "aria-placeholder": {
          type: "string",
          allowEmpty: !0
        },
        "aria-posinset": {
          type: "int",
          minValue: 1
        },
        "aria-pressed": {
          type: "nmtoken",
          values: ["false", "mixed", "true", "undefined"]
        },
        "aria-readonly": {
          type: "boolean"
        },
        "aria-relevant": {
          type: "nmtokens",
          values: ["additions", "all", "removals", "text"],
          global: !0
        },
        "aria-required": {
          type: "boolean"
        },
        "aria-roledescription": {
          type: "string",
          allowEmpty: !0,
          global: !0
        },
        "aria-rowcount": {
          type: "int",
          minValue: -1
        },
        "aria-rowindex": {
          type: "int",
          minValue: 1
        },
        "aria-rowspan": {
          type: "int",
          minValue: 0
        },
        "aria-selected": {
          type: "nmtoken",
          values: ["false", "true", "undefined"]
        },
        "aria-setsize": {
          type: "int",
          minValue: -1
        },
        "aria-sort": {
          type: "nmtoken",
          values: ["ascending", "descending", "none", "other"]
        },
        "aria-valuemax": {
          type: "decimal"
        },
        "aria-valuemin": {
          type: "decimal"
        },
        "aria-valuenow": {
          type: "decimal"
        },
        "aria-valuetext": {
          type: "string",
          allowEmpty: !0
        }
      }, cc = Ob, Mb = {
        alert: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        alertdialog: {
          type: "window",
          allowedAttrs: ["aria-expanded", "aria-modal"],
          superclassRole: ["alert", "dialog"],
          accessibleNameRequired: !0
        },
        application: {
          type: "landmark",
          allowedAttrs: ["aria-activedescendant", "aria-expanded"],
          superclassRole: ["structure"],
          accessibleNameRequired: !0
        },
        article: {
          type: "structure",
          allowedAttrs: ["aria-posinset", "aria-setsize", "aria-expanded"],
          superclassRole: ["document"]
        },
        banner: {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        blockquote: {
          type: "structure",
          superclassRole: ["section"]
        },
        button: {
          type: "widget",
          allowedAttrs: ["aria-expanded", "aria-pressed"],
          superclassRole: ["command"],
          accessibleNameRequired: !0,
          nameFromContent: !0,
          childrenPresentational: !0
        },
        caption: {
          type: "structure",
          requiredContext: ["figure", "table", "grid", "treegrid"],
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        cell: {
          type: "structure",
          requiredContext: ["row"],
          allowedAttrs: ["aria-colindex", "aria-colspan", "aria-rowindex", "aria-rowspan", "aria-expanded"],
          superclassRole: ["section"],
          nameFromContent: !0
        },
        checkbox: {
          type: "widget",
          requiredAttrs: ["aria-checked"],
          allowedAttrs: ["aria-readonly", "aria-expanded", "aria-required"],
          superclassRole: ["input"],
          accessibleNameRequired: !0,
          nameFromContent: !0,
          childrenPresentational: !0
        },
        code: {
          type: "structure",
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        columnheader: {
          type: "structure",
          requiredContext: ["row"],
          allowedAttrs: ["aria-sort", "aria-colindex", "aria-colspan", "aria-expanded", "aria-readonly", "aria-required", "aria-rowindex", "aria-rowspan", "aria-selected"],
          superclassRole: ["cell", "gridcell", "sectionhead"],
          accessibleNameRequired: !1,
          nameFromContent: !0
        },
        combobox: {
          type: "widget",
          requiredAttrs: ["aria-expanded", "aria-controls"],
          allowedAttrs: ["aria-owns", "aria-autocomplete", "aria-readonly", "aria-required", "aria-activedescendant", "aria-orientation"],
          superclassRole: ["select"],
          accessibleNameRequired: !0
        },
        command: {
          type: "abstract",
          superclassRole: ["widget"]
        },
        complementary: {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        composite: {
          type: "abstract",
          superclassRole: ["widget"]
        },
        contentinfo: {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        comment: {
          type: "structure",
          allowedAttrs: ["aria-level", "aria-posinset", "aria-setsize"],
          superclassRole: ["article"]
        },
        definition: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        deletion: {
          type: "structure",
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        dialog: {
          type: "window",
          allowedAttrs: ["aria-expanded", "aria-modal"],
          superclassRole: ["window"],
          accessibleNameRequired: !0
        },
        directory: {
          type: "structure",
          deprecated: !0,
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["list"],
          nameFromContent: !0
        },
        document: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["structure"]
        },
        emphasis: {
          type: "structure",
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        feed: {
          type: "structure",
          requiredOwned: ["article"],
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["list"]
        },
        figure: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"],
          nameFromContent: !0
        },
        form: {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        grid: {
          type: "composite",
          requiredOwned: ["rowgroup", "row"],
          allowedAttrs: ["aria-level", "aria-multiselectable", "aria-readonly", "aria-activedescendant", "aria-colcount", "aria-expanded", "aria-rowcount"],
          superclassRole: ["composite", "table"],
          accessibleNameRequired: !1
        },
        gridcell: {
          type: "widget",
          requiredContext: ["row"],
          allowedAttrs: ["aria-readonly", "aria-required", "aria-selected", "aria-colindex", "aria-colspan", "aria-expanded", "aria-rowindex", "aria-rowspan"],
          superclassRole: ["cell", "widget"],
          nameFromContent: !0
        },
        group: {
          type: "structure",
          allowedAttrs: ["aria-activedescendant", "aria-expanded"],
          superclassRole: ["section"]
        },
        heading: {
          type: "structure",
          requiredAttrs: ["aria-level"],
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["sectionhead"],
          accessibleNameRequired: !1,
          nameFromContent: !0
        },
        img: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"],
          accessibleNameRequired: !0,
          childrenPresentational: !0
        },
        input: {
          type: "abstract",
          superclassRole: ["widget"]
        },
        insertion: {
          type: "structure",
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        landmark: {
          type: "abstract",
          superclassRole: ["section"]
        },
        link: {
          type: "widget",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["command"],
          accessibleNameRequired: !0,
          nameFromContent: !0
        },
        list: {
          type: "structure",
          requiredOwned: ["listitem"],
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        listbox: {
          type: "widget",
          requiredOwned: ["group", "option"],
          allowedAttrs: ["aria-multiselectable", "aria-readonly", "aria-required", "aria-activedescendant", "aria-expanded", "aria-orientation"],
          superclassRole: ["select"],
          accessibleNameRequired: !0
        },
        listitem: {
          type: "structure",
          requiredContext: ["list"],
          allowedAttrs: ["aria-level", "aria-posinset", "aria-setsize", "aria-expanded"],
          superclassRole: ["section"],
          nameFromContent: !0
        },
        log: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        main: {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        marquee: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        math: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"],
          childrenPresentational: !0
        },
        menu: {
          type: "composite",
          requiredOwned: ["group", "menuitemradio", "menuitem", "menuitemcheckbox", "menu", "separator"],
          allowedAttrs: ["aria-activedescendant", "aria-expanded", "aria-orientation"],
          superclassRole: ["select"]
        },
        menubar: {
          type: "composite",
          requiredOwned: ["group", "menuitemradio", "menuitem", "menuitemcheckbox", "menu", "separator"],
          allowedAttrs: ["aria-activedescendant", "aria-expanded", "aria-orientation"],
          superclassRole: ["menu"]
        },
        menuitem: {
          type: "widget",
          requiredContext: ["menu", "menubar", "group"],
          allowedAttrs: ["aria-posinset", "aria-setsize", "aria-expanded"],
          superclassRole: ["command"],
          accessibleNameRequired: !0,
          nameFromContent: !0
        },
        menuitemcheckbox: {
          type: "widget",
          requiredContext: ["menu", "menubar", "group"],
          requiredAttrs: ["aria-checked"],
          allowedAttrs: ["aria-expanded", "aria-posinset", "aria-readonly", "aria-setsize"],
          superclassRole: ["checkbox", "menuitem"],
          accessibleNameRequired: !0,
          nameFromContent: !0,
          childrenPresentational: !0
        },
        menuitemradio: {
          type: "widget",
          requiredContext: ["menu", "menubar", "group"],
          requiredAttrs: ["aria-checked"],
          allowedAttrs: ["aria-expanded", "aria-posinset", "aria-readonly", "aria-setsize"],
          superclassRole: ["menuitemcheckbox", "radio"],
          accessibleNameRequired: !0,
          nameFromContent: !0,
          childrenPresentational: !0
        },
        meter: {
          type: "structure",
          requiredAttrs: ["aria-valuenow"],
          allowedAttrs: ["aria-valuemax", "aria-valuemin", "aria-valuetext"],
          superclassRole: ["range"],
          accessibleNameRequired: !0,
          childrenPresentational: !0
        },
        mark: {
          type: "structure",
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        navigation: {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        none: {
          type: "structure",
          superclassRole: ["structure"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        note: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        option: {
          type: "widget",
          requiredContext: ["group", "listbox"],
          allowedAttrs: ["aria-selected", "aria-checked", "aria-posinset", "aria-setsize"],
          superclassRole: ["input"],
          accessibleNameRequired: !0,
          nameFromContent: !0,
          childrenPresentational: !0
        },
        paragraph: {
          type: "structure",
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        presentation: {
          type: "structure",
          superclassRole: ["structure"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        progressbar: {
          type: "widget",
          allowedAttrs: ["aria-expanded", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext"],
          superclassRole: ["range"],
          accessibleNameRequired: !0,
          childrenPresentational: !0
        },
        radio: {
          type: "widget",
          requiredAttrs: ["aria-checked"],
          allowedAttrs: ["aria-posinset", "aria-setsize", "aria-required"],
          superclassRole: ["input"],
          accessibleNameRequired: !0,
          nameFromContent: !0,
          childrenPresentational: !0
        },
        radiogroup: {
          type: "composite",
          allowedAttrs: ["aria-readonly", "aria-required", "aria-activedescendant", "aria-expanded", "aria-orientation"],
          superclassRole: ["select"],
          accessibleNameRequired: !1
        },
        range: {
          type: "abstract",
          superclassRole: ["widget"]
        },
        region: {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"],
          accessibleNameRequired: !1
        },
        roletype: {
          type: "abstract",
          superclassRole: []
        },
        row: {
          type: "structure",
          requiredContext: ["grid", "rowgroup", "table", "treegrid"],
          requiredOwned: ["cell", "columnheader", "gridcell", "rowheader"],
          allowedAttrs: ["aria-colindex", "aria-level", "aria-rowindex", "aria-selected", "aria-activedescendant", "aria-expanded", "aria-posinset", "aria-setsize"],
          superclassRole: ["group", "widget"],
          nameFromContent: !0
        },
        rowgroup: {
          type: "structure",
          requiredContext: ["grid", "table", "treegrid"],
          requiredOwned: ["row"],
          superclassRole: ["structure"],
          nameFromContent: !0
        },
        rowheader: {
          type: "structure",
          requiredContext: ["row"],
          allowedAttrs: ["aria-sort", "aria-colindex", "aria-colspan", "aria-expanded", "aria-readonly", "aria-required", "aria-rowindex", "aria-rowspan", "aria-selected"],
          superclassRole: ["cell", "gridcell", "sectionhead"],
          accessibleNameRequired: !1,
          nameFromContent: !0
        },
        scrollbar: {
          type: "widget",
          requiredAttrs: ["aria-valuenow"],
          allowedAttrs: ["aria-controls", "aria-orientation", "aria-valuemax", "aria-valuemin", "aria-valuetext"],
          superclassRole: ["range"],
          childrenPresentational: !0
        },
        search: {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        searchbox: {
          type: "widget",
          allowedAttrs: ["aria-activedescendant", "aria-autocomplete", "aria-multiline", "aria-placeholder", "aria-readonly", "aria-required"],
          superclassRole: ["textbox"],
          accessibleNameRequired: !0
        },
        section: {
          type: "abstract",
          superclassRole: ["structure"],
          nameFromContent: !0
        },
        sectionhead: {
          type: "abstract",
          superclassRole: ["structure"],
          nameFromContent: !0
        },
        select: {
          type: "abstract",
          superclassRole: ["composite", "group"]
        },
        separator: {
          type: "structure",
          requiredAttrs: ["aria-valuenow"],
          allowedAttrs: ["aria-valuemax", "aria-valuemin", "aria-orientation", "aria-valuetext"],
          superclassRole: ["structure", "widget"],
          childrenPresentational: !0
        },
        slider: {
          type: "widget",
          requiredAttrs: ["aria-valuenow"],
          allowedAttrs: ["aria-valuemax", "aria-valuemin", "aria-orientation", "aria-readonly", "aria-required", "aria-valuetext"],
          superclassRole: ["input", "range"],
          accessibleNameRequired: !0,
          childrenPresentational: !0
        },
        spinbutton: {
          type: "widget",
          allowedAttrs: ["aria-valuemax", "aria-valuemin", "aria-readonly", "aria-required", "aria-activedescendant", "aria-valuetext", "aria-valuenow"],
          superclassRole: ["composite", "input", "range"],
          accessibleNameRequired: !0
        },
        status: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        strong: {
          type: "structure",
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        structure: {
          type: "abstract",
          superclassRole: ["roletype"]
        },
        subscript: {
          type: "structure",
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        superscript: {
          type: "structure",
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        switch: {
          type: "widget",
          requiredAttrs: ["aria-checked"],
          allowedAttrs: ["aria-expanded", "aria-readonly", "aria-required"],
          superclassRole: ["checkbox"],
          accessibleNameRequired: !0,
          nameFromContent: !0,
          childrenPresentational: !0
        },
        suggestion: {
          type: "structure",
          requiredOwned: ["insertion", "deletion"],
          superclassRole: ["section"],
          prohibitedAttrs: ["aria-label", "aria-labelledby"]
        },
        tab: {
          type: "widget",
          requiredContext: ["tablist"],
          allowedAttrs: ["aria-posinset", "aria-selected", "aria-setsize", "aria-expanded"],
          superclassRole: ["sectionhead", "widget"],
          nameFromContent: !0,
          childrenPresentational: !0
        },
        table: {
          type: "structure",
          requiredOwned: ["rowgroup", "row"],
          allowedAttrs: ["aria-colcount", "aria-rowcount", "aria-expanded"],
          superclassRole: ["section"],
          accessibleNameRequired: !1,
          nameFromContent: !0
        },
        tablist: {
          type: "composite",
          requiredOwned: ["tab"],
          allowedAttrs: ["aria-level", "aria-multiselectable", "aria-orientation", "aria-activedescendant", "aria-expanded"],
          superclassRole: ["composite"]
        },
        tabpanel: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"],
          accessibleNameRequired: !1
        },
        term: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"],
          nameFromContent: !0
        },
        text: {
          type: "structure",
          superclassRole: ["section"],
          nameFromContent: !0
        },
        textbox: {
          type: "widget",
          allowedAttrs: ["aria-activedescendant", "aria-autocomplete", "aria-multiline", "aria-placeholder", "aria-readonly", "aria-required"],
          superclassRole: ["input"],
          accessibleNameRequired: !0
        },
        time: {
          type: "structure",
          superclassRole: ["section"]
        },
        timer: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["status"]
        },
        toolbar: {
          type: "structure",
          allowedAttrs: ["aria-orientation", "aria-activedescendant", "aria-expanded"],
          superclassRole: ["group"],
          accessibleNameRequired: !0
        },
        tooltip: {
          type: "structure",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"],
          nameFromContent: !0
        },
        tree: {
          type: "composite",
          requiredOwned: ["group", "treeitem"],
          allowedAttrs: ["aria-multiselectable", "aria-required", "aria-activedescendant", "aria-expanded", "aria-orientation"],
          superclassRole: ["select"],
          accessibleNameRequired: !1
        },
        treegrid: {
          type: "composite",
          requiredOwned: ["rowgroup", "row"],
          allowedAttrs: ["aria-activedescendant", "aria-colcount", "aria-expanded", "aria-level", "aria-multiselectable", "aria-orientation", "aria-readonly", "aria-required", "aria-rowcount"],
          superclassRole: ["grid", "tree"],
          accessibleNameRequired: !1
        },
        treeitem: {
          type: "widget",
          requiredContext: ["group", "tree"],
          allowedAttrs: ["aria-checked", "aria-expanded", "aria-level", "aria-posinset", "aria-selected", "aria-setsize"],
          superclassRole: ["listitem", "option"],
          accessibleNameRequired: !0,
          nameFromContent: !0
        },
        widget: {
          type: "abstract",
          superclassRole: ["roletype"]
        },
        window: {
          type: "abstract",
          superclassRole: ["roletype"]
        }
      }, dc = Mb, Ib = {
        "doc-abstract": {
          type: "section",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        "doc-acknowledgments": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-afterword": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-appendix": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-backlink": {
          type: "link",
          allowedAttrs: ["aria-expanded"],
          nameFromContent: !0,
          superclassRole: ["link"]
        },
        "doc-biblioentry": {
          type: "listitem",
          allowedAttrs: ["aria-expanded", "aria-level", "aria-posinset", "aria-setsize"],
          superclassRole: ["listitem"],
          deprecated: !0
        },
        "doc-bibliography": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-biblioref": {
          type: "link",
          allowedAttrs: ["aria-expanded"],
          nameFromContent: !0,
          superclassRole: ["link"]
        },
        "doc-chapter": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-colophon": {
          type: "section",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        "doc-conclusion": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-cover": {
          type: "img",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["img"]
        },
        "doc-credit": {
          type: "section",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        "doc-credits": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-dedication": {
          type: "section",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        "doc-endnote": {
          type: "listitem",
          allowedAttrs: ["aria-expanded", "aria-level", "aria-posinset", "aria-setsize"],
          superclassRole: ["listitem"],
          deprecated: !0
        },
        "doc-endnotes": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-epigraph": {
          type: "section",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        "doc-epilogue": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-errata": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-example": {
          type: "section",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        "doc-footnote": {
          type: "section",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        "doc-foreword": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-glossary": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-glossref": {
          type: "link",
          allowedAttrs: ["aria-expanded"],
          nameFromContent: !0,
          superclassRole: ["link"]
        },
        "doc-index": {
          type: "navigation",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["navigation"]
        },
        "doc-introduction": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-noteref": {
          type: "link",
          allowedAttrs: ["aria-expanded"],
          nameFromContent: !0,
          superclassRole: ["link"]
        },
        "doc-notice": {
          type: "note",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["note"]
        },
        "doc-pagebreak": {
          type: "separator",
          allowedAttrs: ["aria-expanded", "aria-orientation"],
          superclassRole: ["separator"],
          childrenPresentational: !0
        },
        "doc-pagelist": {
          type: "navigation",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["navigation"]
        },
        "doc-part": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-preface": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-prologue": {
          type: "landmark",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["landmark"]
        },
        "doc-pullquote": {
          type: "none",
          superclassRole: ["none"]
        },
        "doc-qna": {
          type: "section",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["section"]
        },
        "doc-subtitle": {
          type: "sectionhead",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["sectionhead"]
        },
        "doc-tip": {
          type: "note",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["note"]
        },
        "doc-toc": {
          type: "navigation",
          allowedAttrs: ["aria-expanded"],
          superclassRole: ["navigation"]
        }
      }, Pb = Ib, Nb = {
        "graphics-document": {
          type: "structure",
          superclassRole: ["document"],
          accessibleNameRequired: !0
        },
        "graphics-object": {
          type: "structure",
          superclassRole: ["group"],
          nameFromContent: !0
        },
        "graphics-symbol": {
          type: "structure",
          superclassRole: ["img"],
          accessibleNameRequired: !0,
          childrenPresentational: !0
        }
      }, Lb = Nb, Bb = {
        a: {
          variant: {
            href: {
              matches: "[href]",
              contentTypes: ["interactive", "phrasing", "flow"],
              allowedRoles: ["button", "checkbox", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "switch", "tab", "treeitem", "doc-backlink", "doc-biblioref", "doc-glossref", "doc-noteref"],
              namingMethods: ["subtreeText"]
            },
            default: {
              contentTypes: ["phrasing", "flow"],
              allowedRoles: !0
            }
          }
        },
        abbr: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        address: {
          contentTypes: ["flow"],
          allowedRoles: !0
        },
        area: {
          variant: {
            href: {
              matches: "[href]",
              allowedRoles: !1
            },
            default: {
              allowedRoles: ["button", "link"]
            }
          },
          contentTypes: ["phrasing", "flow"],
          namingMethods: ["altText"]
        },
        article: {
          contentTypes: ["sectioning", "flow"],
          allowedRoles: ["feed", "presentation", "none", "document", "application", "main", "region"],
          shadowRoot: !0
        },
        aside: {
          contentTypes: ["sectioning", "flow"],
          allowedRoles: ["feed", "note", "presentation", "none", "region", "search", "doc-dedication", "doc-example", "doc-footnote", "doc-glossary", "doc-pullquote", "doc-tip"]
        },
        audio: {
          variant: {
            controls: {
              matches: "[controls]",
              contentTypes: ["interactive", "embedded", "phrasing", "flow"]
            },
            default: {
              contentTypes: ["embedded", "phrasing", "flow"]
            }
          },
          allowedRoles: ["application"],
          chromiumRole: "Audio"
        },
        b: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        base: {
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        bdi: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        bdo: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        blockquote: {
          contentTypes: ["flow"],
          allowedRoles: !0,
          shadowRoot: !0
        },
        body: {
          allowedRoles: !1,
          shadowRoot: !0
        },
        br: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: ["presentation", "none"],
          namingMethods: ["titleText", "singleSpace"]
        },
        button: {
          contentTypes: ["interactive", "phrasing", "flow"],
          allowedRoles: ["checkbox", "combobox", "gridcell", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "separator", "slider", "switch", "tab", "treeitem"],
          namingMethods: ["subtreeText"]
        },
        canvas: {
          allowedRoles: !0,
          contentTypes: ["embedded", "phrasing", "flow"],
          chromiumRole: "Canvas"
        },
        caption: {
          allowedRoles: !1
        },
        cite: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        code: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        col: {
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        colgroup: {
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        data: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        datalist: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !1,
          noAriaAttrs: !0,
          implicitAttrs: {
            "aria-multiselectable": "false"
          }
        },
        dd: {
          allowedRoles: !1
        },
        del: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        dfn: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        details: {
          contentTypes: ["interactive", "flow"],
          allowedRoles: !1
        },
        dialog: {
          contentTypes: ["flow"],
          allowedRoles: ["alertdialog"]
        },
        div: {
          contentTypes: ["flow"],
          allowedRoles: !0,
          shadowRoot: !0
        },
        dl: {
          contentTypes: ["flow"],
          allowedRoles: ["group", "list", "presentation", "none"],
          chromiumRole: "DescriptionList"
        },
        dt: {
          allowedRoles: ["listitem"]
        },
        em: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        embed: {
          contentTypes: ["interactive", "embedded", "phrasing", "flow"],
          allowedRoles: ["application", "document", "img", "presentation", "none"],
          chromiumRole: "EmbeddedObject"
        },
        fieldset: {
          contentTypes: ["flow"],
          allowedRoles: ["none", "presentation", "radiogroup"],
          namingMethods: ["fieldsetLegendText"]
        },
        figcaption: {
          allowedRoles: ["group", "none", "presentation"]
        },
        figure: {
          contentTypes: ["flow"],
          allowedRoles: !0,
          namingMethods: ["figureText", "titleText"]
        },
        footer: {
          contentTypes: ["flow"],
          allowedRoles: ["group", "none", "presentation", "doc-footnote"],
          shadowRoot: !0
        },
        form: {
          contentTypes: ["flow"],
          allowedRoles: ["form", "search", "none", "presentation"]
        },
        h1: {
          contentTypes: ["heading", "flow"],
          allowedRoles: ["none", "presentation", "tab", "doc-subtitle"],
          shadowRoot: !0,
          implicitAttrs: {
            "aria-level": "1"
          }
        },
        h2: {
          contentTypes: ["heading", "flow"],
          allowedRoles: ["none", "presentation", "tab", "doc-subtitle"],
          shadowRoot: !0,
          implicitAttrs: {
            "aria-level": "2"
          }
        },
        h3: {
          contentTypes: ["heading", "flow"],
          allowedRoles: ["none", "presentation", "tab", "doc-subtitle"],
          shadowRoot: !0,
          implicitAttrs: {
            "aria-level": "3"
          }
        },
        h4: {
          contentTypes: ["heading", "flow"],
          allowedRoles: ["none", "presentation", "tab", "doc-subtitle"],
          shadowRoot: !0,
          implicitAttrs: {
            "aria-level": "4"
          }
        },
        h5: {
          contentTypes: ["heading", "flow"],
          allowedRoles: ["none", "presentation", "tab", "doc-subtitle"],
          shadowRoot: !0,
          implicitAttrs: {
            "aria-level": "5"
          }
        },
        h6: {
          contentTypes: ["heading", "flow"],
          allowedRoles: ["none", "presentation", "tab", "doc-subtitle"],
          shadowRoot: !0,
          implicitAttrs: {
            "aria-level": "6"
          }
        },
        head: {
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        header: {
          contentTypes: ["flow"],
          allowedRoles: ["group", "none", "presentation", "doc-footnote"],
          shadowRoot: !0
        },
        hgroup: {
          contentTypes: ["heading", "flow"],
          allowedRoles: !0
        },
        hr: {
          contentTypes: ["flow"],
          allowedRoles: ["none", "presentation", "doc-pagebreak"],
          namingMethods: ["titleText", "singleSpace"]
        },
        html: {
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        i: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        iframe: {
          contentTypes: ["interactive", "embedded", "phrasing", "flow"],
          allowedRoles: ["application", "document", "img", "none", "presentation"],
          chromiumRole: "Iframe"
        },
        img: {
          variant: {
            nonEmptyAlt: {
              matches: [{
                attributes: {
                  alt: "/.+/"
                }
              }, {
                hasAccessibleName: !0
              }],
              allowedRoles: ["button", "checkbox", "link", "math", "menuitem", "menuitemcheckbox", "menuitemradio", "meter", "option", "progressbar", "radio", "scrollbar", "separator", "slider", "switch", "tab", "treeitem", "doc-cover"]
            },
            usemap: {
              matches: "[usemap]",
              contentTypes: ["interactive", "embedded", "flow"]
            },
            default: {
              allowedRoles: ["presentation", "none"],
              contentTypes: ["embedded", "flow"]
            }
          },
          namingMethods: ["altText"]
        },
        input: {
          variant: {
            button: {
              matches: {
                properties: {
                  type: "button"
                }
              },
              allowedRoles: ["checkbox", "combobox", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "switch", "tab"]
            },
            buttonType: {
              matches: {
                properties: {
                  type: ["button", "submit", "reset"]
                }
              },
              namingMethods: ["valueText", "titleText", "buttonDefaultText"]
            },
            checkboxPressed: {
              matches: {
                properties: {
                  type: "checkbox"
                },
                attributes: {
                  "aria-pressed": "/.*/"
                }
              },
              allowedRoles: ["button", "menuitemcheckbox", "option", "switch"],
              implicitAttrs: {
                "aria-checked": "false"
              }
            },
            checkbox: {
              matches: {
                properties: {
                  type: "checkbox"
                },
                attributes: {
                  "aria-pressed": null
                }
              },
              allowedRoles: ["menuitemcheckbox", "option", "switch"],
              implicitAttrs: {
                "aria-checked": "false"
              }
            },
            noRoles: {
              matches: {
                properties: {
                  type: ["color", "date", "datetime-local", "file", "month", "number", "password", "range", "reset", "submit", "time", "week"]
                }
              },
              allowedRoles: !1
            },
            hidden: {
              matches: {
                properties: {
                  type: "hidden"
                }
              },
              contentTypes: ["flow"],
              allowedRoles: !1,
              noAriaAttrs: !0
            },
            image: {
              matches: {
                properties: {
                  type: "image"
                }
              },
              allowedRoles: ["link", "menuitem", "menuitemcheckbox", "menuitemradio", "radio", "switch"],
              namingMethods: ["altText", "valueText", "labelText", "titleText", "buttonDefaultText"]
            },
            radio: {
              matches: {
                properties: {
                  type: "radio"
                }
              },
              allowedRoles: ["menuitemradio"],
              implicitAttrs: {
                "aria-checked": "false"
              }
            },
            textWithList: {
              matches: {
                properties: {
                  type: "text"
                },
                attributes: {
                  list: "/.*/"
                }
              },
              allowedRoles: !1
            },
            default: {
              contentTypes: ["interactive", "flow"],
              allowedRoles: ["combobox", "searchbox", "spinbutton"],
              implicitAttrs: {
                "aria-valuenow": ""
              },
              namingMethods: ["labelText", "placeholderText"]
            }
          }
        },
        ins: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        kbd: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        label: {
          contentTypes: ["interactive", "phrasing", "flow"],
          allowedRoles: !1,
          chromiumRole: "Label"
        },
        legend: {
          allowedRoles: !1
        },
        li: {
          allowedRoles: ["menuitem", "menuitemcheckbox", "menuitemradio", "option", "none", "presentation", "radio", "separator", "tab", "treeitem", "doc-biblioentry", "doc-endnote"],
          implicitAttrs: {
            "aria-setsize": "1",
            "aria-posinset": "1"
          }
        },
        link: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        main: {
          contentTypes: ["flow"],
          allowedRoles: !1,
          shadowRoot: !0
        },
        map: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        math: {
          contentTypes: ["embedded", "phrasing", "flow"],
          allowedRoles: !1
        },
        mark: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        menu: {
          contentTypes: ["flow"],
          allowedRoles: ["directory", "group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"]
        },
        meta: {
          variant: {
            itemprop: {
              matches: "[itemprop]",
              contentTypes: ["phrasing", "flow"]
            }
          },
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        meter: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !1,
          chromiumRole: "progressbar"
        },
        nav: {
          contentTypes: ["sectioning", "flow"],
          allowedRoles: ["doc-index", "doc-pagelist", "doc-toc", "menu", "menubar", "none", "presentation", "tablist"],
          shadowRoot: !0
        },
        noscript: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        object: {
          variant: {
            usemap: {
              matches: "[usemap]",
              contentTypes: ["interactive", "embedded", "phrasing", "flow"]
            },
            default: {
              contentTypes: ["embedded", "phrasing", "flow"]
            }
          },
          allowedRoles: ["application", "document", "img"],
          chromiumRole: "PluginObject"
        },
        ol: {
          contentTypes: ["flow"],
          allowedRoles: ["directory", "group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"]
        },
        optgroup: {
          allowedRoles: !1
        },
        option: {
          allowedRoles: !1,
          implicitAttrs: {
            "aria-selected": "false"
          }
        },
        output: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0,
          namingMethods: ["subtreeText"]
        },
        p: {
          contentTypes: ["flow"],
          allowedRoles: !0,
          shadowRoot: !0
        },
        param: {
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        picture: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        pre: {
          contentTypes: ["flow"],
          allowedRoles: !0
        },
        progress: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !1,
          implicitAttrs: {
            "aria-valuemax": "100",
            "aria-valuemin": "0",
            "aria-valuenow": "0"
          }
        },
        q: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        rp: {
          allowedRoles: !0
        },
        rt: {
          allowedRoles: !0
        },
        ruby: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        s: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        samp: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        script: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        search: {
          contentTypes: ["flow"],
          allowedRoles: ["form", "group", "none", "presentation", "region", "search"]
        },
        section: {
          contentTypes: ["sectioning", "flow"],
          allowedRoles: ["alert", "alertdialog", "application", "banner", "complementary", "contentinfo", "dialog", "document", "feed", "group", "log", "main", "marquee", "navigation", "none", "note", "presentation", "search", "status", "tabpanel", "doc-abstract", "doc-acknowledgments", "doc-afterword", "doc-appendix", "doc-bibliography", "doc-chapter", "doc-colophon", "doc-conclusion", "doc-credit", "doc-credits", "doc-dedication", "doc-endnotes", "doc-epigraph", "doc-epilogue", "doc-errata", "doc-example", "doc-foreword", "doc-glossary", "doc-index", "doc-introduction", "doc-notice", "doc-pagelist", "doc-part", "doc-preface", "doc-prologue", "doc-pullquote", "doc-qna", "doc-toc"],
          shadowRoot: !0
        },
        select: {
          variant: {
            combobox: {
              matches: {
                attributes: {
                  multiple: null,
                  size: [null, "1"]
                }
              },
              allowedRoles: ["menu"]
            },
            default: {
              allowedRoles: !1
            }
          },
          contentTypes: ["interactive", "phrasing", "flow"],
          implicitAttrs: {
            "aria-valuenow": ""
          },
          namingMethods: ["labelText"]
        },
        slot: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        small: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        source: {
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        span: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0,
          shadowRoot: !0
        },
        strong: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        style: {
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        svg: {
          contentTypes: ["embedded", "phrasing", "flow"],
          allowedRoles: !0,
          chromiumRole: "SVGRoot",
          namingMethods: ["svgTitleText"]
        },
        sub: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        summary: {
          allowedRoles: !1,
          namingMethods: ["subtreeText"]
        },
        sup: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        table: {
          contentTypes: ["flow"],
          allowedRoles: !0,
          namingMethods: ["tableCaptionText", "tableSummaryText"]
        },
        tbody: {
          allowedRoles: !0
        },
        template: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        textarea: {
          contentTypes: ["interactive", "phrasing", "flow"],
          allowedRoles: !1,
          implicitAttrs: {
            "aria-valuenow": "",
            "aria-multiline": "true"
          },
          namingMethods: ["labelText", "placeholderText"]
        },
        tfoot: {
          allowedRoles: !0
        },
        thead: {
          allowedRoles: !0
        },
        time: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        title: {
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        td: {
          allowedRoles: !0
        },
        th: {
          allowedRoles: !0
        },
        tr: {
          allowedRoles: !0
        },
        track: {
          allowedRoles: !1,
          noAriaAttrs: !0
        },
        u: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        ul: {
          contentTypes: ["flow"],
          allowedRoles: ["directory", "group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"]
        },
        var: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: !0
        },
        video: {
          variant: {
            controls: {
              matches: "[controls]",
              contentTypes: ["interactive", "embedded", "phrasing", "flow"]
            },
            default: {
              contentTypes: ["embedded", "phrasing", "flow"]
            }
          },
          allowedRoles: ["application"],
          chromiumRole: "video"
        },
        wbr: {
          contentTypes: ["phrasing", "flow"],
          allowedRoles: ["presentation", "none"]
        }
      }, qb = Bb, jb = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
      }, zb = jb, fc = {
        ariaAttrs: cc,
        ariaRoles: de({}, dc, Pb, Lb),
        htmlElms: qb,
        cssColors: zb
      }, Br = de({}, fc);
      function Vb(e) {
        Object.keys(Br).forEach(function(t) {
          e[t] && (Br[t] = ao(Br[t], e[t]));
        });
      }
      function Hb() {
        Object.keys(Br).forEach(function(e) {
          Br[e] = fc[e];
        });
      }
      var he = Br;
      function $b(e) {
        var t = he.ariaRoles[e];
        return t ? !!t.unsupported : !1;
      }
      var _o = $b;
      function Ub(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.allowAbstract, a = t.flagUnsupported, n = a === void 0 ? !1 : a, i = he.ariaRoles[e], o = _o(e);
        return !i || n && o ? !1 : r ? !0 : i.type !== "abstract";
      }
      var qr = Ub;
      function Gb(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.fallback, a = t.abstracts, n = t.dpub;
        if (e = e instanceof $e ? e : le(e), e.props.nodeType !== 1)
          return null;
        var i = (e.attr("role") || "").trim().toLowerCase(), o = r ? Ze(i) : [i], u = o.find(function(s) {
          return !n && s.substr(0, 4) === "doc-" ? !1 : qr(s, {
            allowAbstract: a
          });
        });
        return u || null;
      }
      var De = Gb;
      function Wb(e) {
        return Object.keys(he.htmlElms).filter(function(t) {
          var r = he.htmlElms[t];
          return r.contentTypes ? r.contentTypes.includes(e) : r.variant && r.variant.default && r.variant.default.contentTypes ? r.variant.default.contentTypes.includes(e) : !1;
        });
      }
      var xo = Wb;
      function Yb() {
        return ue.get("globalAriaAttrs", function() {
          return Object.keys(he.ariaAttrs).filter(function(e) {
            return he.ariaAttrs[e].global;
          });
        });
      }
      var Dr = Yb;
      function Kb(e) {
        for (var t = [], r = e.rows, a = 0, n = r.length; a < n; a++) {
          var i = r[a].cells;
          t[a] = t[a] || [];
          for (var o = 0, u = 0, s = i.length; u < s; u++)
            for (var l = 0; l < i[u].colSpan; l++) {
              for (var c = i[u].getAttribute("rowspan"), d = parseInt(c) === 0 || i[u].rowspan === 0 ? r.length : i[u].rowSpan, f = 0; f < d; f++) {
                for (t[a + f] = t[a + f] || []; t[a + f][o]; )
                  o++;
                t[a + f][o] = i[u];
              }
              o++;
            }
        }
        return t;
      }
      var Wt = Fe(Kb);
      function Xb(e, t) {
        var r, a;
        for (t || (t = Wt(Lr(e, "table"))), r = 0; r < t.length; r++)
          if (t[r] && (a = t[r].indexOf(e), a !== -1))
            return {
              x: a,
              y: r
            };
      }
      var _n = Fe(Xb);
      function Eo(e) {
        var t = we(e), r = t.vNode, a = t.domNode, n = r.attr("scope"), i = r.attr("role");
        if (!["td", "th"].includes(r.props.nodeName))
          throw new TypeError("Expected TD or TH element");
        if (i === "columnheader")
          return "col";
        if (i === "rowheader")
          return "row";
        if (n === "col" || n === "row")
          return n;
        if (r.props.nodeName !== "th")
          return !1;
        if (!r.actualNode)
          return "auto";
        var o = Wt(Lr(a, "table")), u = _n(a, o), s = o[u.y].every(function(c) {
          return c.nodeName.toUpperCase() === "TH";
        });
        if (s)
          return "col";
        var l = o.map(function(c) {
          return c[u.x];
        }).every(function(c) {
          return c && c.nodeName.toUpperCase() === "TH";
        });
        return l ? "row" : "auto";
      }
      function Zb(e) {
        return ["col", "auto"].indexOf(Eo(e)) !== -1;
      }
      var jr = Zb;
      function Jb(e) {
        return ["row", "auto"].includes(Eo(e));
      }
      var zr = Jb;
      function Qb(e) {
        return e ? e.replace(/\r\n/g, `
`).replace(/\u00A0/g, " ").replace(/[\s]{2,}/g, " ").trim() : "";
      }
      var re = Qb, pc = function() {
        return ue.get("sectioningContentSelector", function() {
          return xo("sectioning").map(function(t) {
            return "".concat(t, ":not([role])");
          }).join(", ") + " , [role=article], [role=complementary], [role=navigation], [role=region]";
        });
      }, mc = function() {
        return ue.get("sectioningContentPlusMainSelector", function() {
          return pc() + " , main:not([role]), [role=main]";
        });
      };
      function Ao(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.checkTitle, a = r === void 0 ? !1 : r;
        return !!(re(ga(e)) || re(ba(e)) || a && e?.props.nodeType === 1 && re(e.attr("title")));
      }
      var ey = {
        a: function(t) {
          return t.hasAttr("href") ? "link" : null;
        },
        area: function(t) {
          return t.hasAttr("href") ? "link" : null;
        },
        article: "article",
        aside: function(t) {
          return ut(t.parent, pc()) && !Ao(t, {
            checkTitle: !0
          }) ? null : "complementary";
        },
        body: "document",
        button: "button",
        datalist: "listbox",
        dd: "definition",
        dfn: "term",
        details: "group",
        dialog: "dialog",
        dt: "term",
        fieldset: "group",
        figure: "figure",
        footer: function(t) {
          var r = ut(t, mc());
          return r ? null : "contentinfo";
        },
        form: function(t) {
          return Ao(t) ? "form" : null;
        },
        h1: "heading",
        h2: "heading",
        h3: "heading",
        h4: "heading",
        h5: "heading",
        h6: "heading",
        header: function(t) {
          var r = ut(t, mc());
          return r ? null : "banner";
        },
        hr: "separator",
        img: function(t) {
          var r = t.hasAttr("alt") && !t.attr("alt"), a = Dr().find(function(n) {
            return t.hasAttr(n);
          });
          return r && !a && !Ne(t) ? "presentation" : "img";
        },
        input: function(t) {
          var r;
          if (t.hasAttr("list")) {
            var a = Ot(t.actualNode, "list").filter(function(n) {
              return !!n;
            })[0];
            r = a && a.nodeName.toLowerCase() === "datalist";
          }
          switch (t.props.type) {
            case "checkbox":
              return "checkbox";
            case "number":
              return "spinbutton";
            case "radio":
              return "radio";
            case "range":
              return "slider";
            case "search":
              return r ? "combobox" : "searchbox";
            case "button":
            case "image":
            case "reset":
            case "submit":
              return "button";
            case "text":
            case "tel":
            case "url":
            case "email":
            case "":
              return r ? "combobox" : "textbox";
            default:
              return "textbox";
          }
        },
        li: "listitem",
        main: "main",
        math: "math",
        menu: "list",
        meter: "meter",
        nav: "navigation",
        ol: "list",
        optgroup: "group",
        option: "option",
        output: "status",
        progress: "progressbar",
        search: "search",
        section: function(t) {
          return Ao(t) ? "region" : null;
        },
        select: function(t) {
          return t.hasAttr("multiple") || parseInt(t.attr("size")) > 1 ? "listbox" : "combobox";
        },
        summary: "button",
        table: "table",
        tbody: "rowgroup",
        td: function(t) {
          var r = ut(t, "table"), a = De(r);
          return ["grid", "treegrid"].includes(a) ? "gridcell" : "cell";
        },
        textarea: "textbox",
        tfoot: "rowgroup",
        th: function(t) {
          if (jr(t))
            return "columnheader";
          if (zr(t))
            return "rowheader";
        },
        thead: "rowgroup",
        tr: "row",
        ul: "list"
      }, Co = ey;
      function ty(e, t) {
        var r = O(t);
        if (Array.isArray(t) && typeof e < "u")
          return t.includes(e);
        if (r === "function")
          return !!t(e);
        if (e != null) {
          if (t instanceof RegExp)
            return t.test(e);
          if (/^\/.*\/$/.test(t)) {
            var a = t.substring(1, t.length - 1);
            return new RegExp(a).test(e);
          }
        }
        return t === e;
      }
      var _r = ty;
      function ry(e, t) {
        return _r(!!Ge(e), t);
      }
      var hc = ry;
      function ay(e, t) {
        var r = O(t);
        if (r !== "object" || Array.isArray(t) || t instanceof RegExp)
          throw new Error("Expect matcher to be an object");
        return Object.keys(t).every(function(a) {
          return _r(e(a), t[a]);
        });
      }
      var Fo = ay;
      function ny(e, t) {
        return e = we(e).vNode, Fo(function(r) {
          return e.attr(r);
        }, t);
      }
      var vc = ny;
      function gc(e, t) {
        return !!t(e);
      }
      function iy(e, t) {
        return _r(De(e), t);
      }
      var bc = iy;
      function oy(e, t) {
        return _r(Mt(e), t);
      }
      var yc = oy;
      function uy(e, t) {
        return e = we(e).vNode, _r(e.props.nodeName, t);
      }
      var wc = uy;
      function sy(e, t) {
        return e = we(e).vNode, Fo(function(r) {
          return e.props[r];
        }, t);
      }
      var Dc = sy;
      function ly(e, t) {
        return _r(ce(e), t);
      }
      var _c = ly, xc = {
        hasAccessibleName: hc,
        attributes: vc,
        condition: gc,
        explicitRole: bc,
        implicitRole: yc,
        nodeName: wc,
        properties: Dc,
        semanticRole: _c
      };
      function Ec(e, t) {
        return e = we(e).vNode, Array.isArray(t) ? t.some(function(r) {
          return Ec(e, r);
        }) : typeof t == "string" ? Ui(e, t) : Object.keys(t).every(function(r) {
          if (!xc[r])
            throw new Error('Unknown matcher type "'.concat(r, '"'));
          var a = xc[r], n = t[r];
          return a(e, n);
        });
      }
      var Ac = Ec;
      function cy(e, t) {
        return Ac(e, t);
      }
      var lt = cy;
      lt.hasAccessibleName = hc, lt.attributes = vc, lt.condition = gc, lt.explicitRole = bc, lt.fromDefinition = Ac, lt.fromFunction = Fo, lt.fromPrimative = _r, lt.implicitRole = yc, lt.nodeName = wc, lt.properties = Dc, lt.semanticRole = _c;
      var ya = lt;
      function dy(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.noMatchAccessibleName, a = r === void 0 ? !1 : r, n = he.htmlElms[e.props.nodeName];
        if (!n)
          return {};
        if (!n.variant)
          return n;
        var i = n.variant, o = qe(n, Cp);
        for (var u in i)
          if (!(!i.hasOwnProperty(u) || u === "default")) {
            for (var s = i[u], l = s.matches, c = qe(s, Fp), d = Array.isArray(l) ? l : [l], f = 0; f < d.length && a; f++)
              if (d[f].hasOwnProperty("hasAccessibleName"))
                return n;
            if (ya(e, l))
              for (var p in c)
                c.hasOwnProperty(p) && (o[p] = c[p]);
          }
        for (var m in i.default)
          i.default.hasOwnProperty(m) && typeof o[m] > "u" && (o[m] = i.default[m]);
        return o;
      }
      var xr = dy;
      function fy(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.chromium, a = e instanceof $e ? e : le(e);
        if (e = a.actualNode, !a)
          throw new ReferenceError("Cannot get implicit role of a node outside the current scope.");
        var n = a.props.nodeName, i = Co[n];
        if (!i && r) {
          var o = xr(a), u = o.chromiumRole;
          return u || null;
        }
        return typeof i == "function" ? i(a) : i || null;
      }
      var Mt = fy, py = {
        td: ["tr"],
        th: ["tr"],
        tr: ["thead", "tbody", "tfoot", "table"],
        thead: ["table"],
        tbody: ["table"],
        tfoot: ["table"],
        li: ["ol", "ul"],
        dt: ["dl", "div"],
        dd: ["dl", "div"],
        div: ["dl"]
      };
      function Cc(e, t) {
        var r = py[e.props.nodeName];
        if (!r)
          return null;
        if (!e.parent) {
          if (!e.actualNode)
            return null;
          throw new ReferenceError("Cannot determine role presentational inheritance of a required parent outside the current scope.");
        }
        if (!r.includes(e.parent.props.nodeName))
          return null;
        var a = De(e.parent, t);
        return ["none", "presentation"].includes(a) && !Tc(e.parent) ? a : a ? null : Cc(e.parent, t);
      }
      function Fc(e, t) {
        var r = t.chromium, a = qe(t, Tp), n = Mt(e, {
          chromium: r
        });
        if (!n)
          return null;
        var i = Cc(e, a);
        return i || n;
      }
      function Tc(e) {
        var t = Dr().some(function(r) {
          return e.hasAttr(r);
        });
        return t || Ne(e);
      }
      function my(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.noImplicit, a = qe(t, Rp), n = we(e), i = n.vNode;
        if (i.props.nodeType !== 1)
          return null;
        var o = De(i, a);
        return o ? ["presentation", "none"].includes(o) && Tc(i) ? r ? null : Fc(i, a) : o : r ? null : Fc(i, a);
      }
      function hy(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.noPresentational, a = qe(t, Sp), n = my(e, a);
        return r && ["presentation", "none"].includes(n) ? null : n;
      }
      var ce = hy, vy = ["iframe"];
      function gy(e) {
        var t = we(e), r = t.vNode;
        return r.props.nodeType !== 1 || !e.hasAttr("title") || !lt(r, vy) && ["none", "presentation"].includes(ce(r)) ? "" : r.attr("title");
      }
      var xn = gy;
      function by(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.strict;
        if (e = e instanceof $e ? e : le(e), e.props.nodeType !== 1)
          return !1;
        var a = ce(e), n = he.ariaRoles[a];
        return n && n.nameFromContent ? !0 : r ? !1 : !n || ["presentation", "none"].includes(a);
      }
      var Rc = by;
      function yy(e) {
        var t = e.actualNode, r = e.children;
        if (!r)
          throw new Error("getOwnedVirtual requires a virtual node");
        if (e.hasAttr("aria-owns")) {
          var a = Ot(t, "aria-owns").filter(function(n) {
            return !!n;
          }).map(function(n) {
            return x.utils.getNodeFromTree(n);
          });
          return [].concat(ne(r), ne(a));
        }
        return ne(r);
      }
      var wa = yy, Sc = {
        accessibleNameFromFieldValue: ["progressbar"]
      };
      function Re(e) {
        return e = we(e).vNode, To(e);
      }
      var To = Fe(function(t, r) {
        return Il(t) || wn(t, {
          skipAncestors: !0,
          isAncestor: r
        }) ? !1 : t.actualNode && t.props.nodeName === "area" ? !uo(t, To) : er(t, {
          skipAncestors: !0,
          isAncestor: r
        }) ? !1 : t.parent ? To(t.parent, !0) : !0;
      });
      function kc(e, t, r) {
        var a = we(e), n = a.vNode, i = t ? Re : st, o = !e.actualNode || e.actualNode && i(e), u = n.children.map(function(s) {
          var l = s.props, c = l.nodeType, d = l.nodeValue;
          if (c === 3) {
            if (d && o)
              return d;
          } else if (!r)
            return kc(s, t);
        }).join("");
        return re(u);
      }
      var It = kc, wy = ["button", "checkbox", "color", "file", "hidden", "image", "password", "radio", "reset", "submit"];
      function Dy(e) {
        e = e instanceof $e ? e : le(e);
        var t = e.props.nodeName;
        return t === "textarea" || t === "input" && !wy.includes((e.attr("type") || "").toLowerCase());
      }
      var Oc = Dy;
      function _y(e) {
        e = e instanceof $e ? e : le(e);
        var t = e.props.nodeName;
        return t === "select";
      }
      var Mc = _y;
      function xy(e) {
        var t = De(e);
        return t === "textbox";
      }
      var Ic = xy;
      function Ey(e) {
        var t = De(e);
        return t === "listbox";
      }
      var Pc = Ey;
      function Ay(e) {
        var t = De(e);
        return t === "combobox";
      }
      var Nc = Ay, Cy = ["progressbar", "scrollbar", "slider", "spinbutton"];
      function Fy(e) {
        var t = De(e);
        return Cy.includes(t);
      }
      var Lc = Fy, Bc = ["textbox", "progressbar", "scrollbar", "slider", "spinbutton", "combobox", "listbox"], Ro = {
        nativeTextboxValue: Ry,
        nativeSelectValue: Sy,
        ariaTextboxValue: ky,
        ariaListboxValue: qc,
        ariaComboboxValue: Oy,
        ariaRangeValue: My
      };
      function Ty(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = e.actualNode, a = Sc.accessibleNameFromFieldValue || [], n = ce(e);
        if (t.startNode === e || !Bc.includes(n) || a.includes(n))
          return "";
        var i = Object.keys(Ro).map(function(u) {
          return Ro[u];
        }), o = i.reduce(function(u, s) {
          return u || s(e, t);
        }, "");
        return t.debug && vr(o || "{empty-value}", r, t), o;
      }
      function Ry(e) {
        var t = we(e), r = t.vNode;
        return Oc(r) && r.props.value || "";
      }
      function Sy(e) {
        var t = we(e), r = t.vNode;
        if (!Mc(r))
          return "";
        var a = ft(r, "option"), n = a.filter(function(i) {
          return i.props.selected;
        });
        return n.length || n.push(a[0]), n.map(function(i) {
          return It(i);
        }).join(" ") || "";
      }
      function ky(e) {
        var t = we(e), r = t.vNode, a = t.domNode;
        return Ic(r) ? !a || a && !er(a) ? It(r, !0) : a.textContent : "";
      }
      function qc(e, t) {
        var r = we(e), a = r.vNode;
        if (!Pc(a))
          return "";
        var n = wa(a).filter(function(i) {
          return ce(i) === "option" && i.attr("aria-selected") === "true";
        });
        return n.length === 0 ? "" : Ge(n[0], t);
      }
      function Oy(e, t) {
        var r = we(e), a = r.vNode;
        if (!Nc(a))
          return "";
        var n = wa(a).filter(function(i) {
          return ce(i) === "listbox";
        })[0];
        return n ? qc(n, t) : "";
      }
      function My(e) {
        var t = we(e), r = t.vNode;
        if (!Lc(r) || !r.hasAttr("aria-valuenow"))
          return "";
        var a = +r.attr("aria-valuenow");
        return isNaN(a) ? "0" : String(a);
      }
      var jc = Ty;
      function Iy(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = Ge.alreadyProcessed;
        t.startNode = t.startNode || e;
        var a = t, n = a.strict, i = a.inControlContext, o = a.inLabelledByContext, u = ce(e), s = xr(e, {
          noMatchAccessibleName: !0
        }), l = s.contentTypes;
        if (r(e, t) || e.props.nodeType !== 1 || l != null && l.includes("embedded") || Bc.includes(u) || !t.subtreeDescendant && !t.inLabelledByContext && !Rc(e, {
          strict: n
        }))
          return "";
        if (!n) {
          var c = !i && !o;
          t = de({
            subtreeDescendant: c
          }, t);
        }
        return wa(e).reduce(function(d, f) {
          return Ny(d, f, t);
        }, "");
      }
      var Py = xo("phrasing").concat(["#text"]);
      function Ny(e, t, r) {
        var a = t.props.nodeName, n = Ge(t, r);
        return n ? (Py.includes(a) || (n[0] !== " " && (n += " "), e && e[e.length - 1] !== " " && (n = " " + n)), e + n) : e;
      }
      var tr = Iy;
      function Ly(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = Ge.alreadyProcessed;
        if (t.inControlContext || t.inLabelledByContext || r(e, t))
          return "";
        t.startNode || (t.startNode = e);
        var a = de({
          inControlContext: !0
        }, t), n = By(e), i = ut(e, "label"), o;
        return i ? (o = [].concat(ne(n), [i.actualNode]), o.sort(Au)) : o = n, o.map(function(u) {
          return wr(u, a);
        }).filter(function(u) {
          return u !== "";
        }).join(" ");
      }
      function By(e) {
        if (!e.attr("id"))
          return [];
        if (!e.actualNode)
          throw new TypeError("Cannot resolve explicit label reference for non-DOM nodes");
        return Tl({
          elm: "label",
          attr: "for",
          value: e.attr("id"),
          context: e.actualNode
        });
      }
      var So = Ly, qy = {
        submit: "Submit",
        image: "Submit",
        reset: "Reset",
        button: ""
      }, jy = {
        valueText: function(t) {
          return t.props.value || "";
        },
        buttonDefaultText: function(t) {
          return qy[t.props.type] || "";
        },
        tableCaptionText: En.bind(null, "caption"),
        figureText: En.bind(null, "figcaption"),
        svgTitleText: En.bind(null, "title"),
        fieldsetLegendText: En.bind(null, "legend"),
        altText: ko.bind(null, "alt"),
        tableSummaryText: ko.bind(null, "summary"),
        titleText: xn,
        subtreeText: tr,
        labelText: So,
        singleSpace: function() {
          return " ";
        },
        placeholderText: ko.bind(null, "placeholder")
      };
      function ko(e, t) {
        return t.attr(e) || "";
      }
      function En(e, t, r) {
        var a = t.actualNode;
        e = e.toLowerCase();
        var n = [e, a.nodeName.toLowerCase()].join(","), i = a.querySelector(n);
        return !i || i.nodeName.toLowerCase() !== e ? "" : wr(i, r);
      }
      var zc = jy;
      function Vc(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = e.actualNode;
        if (e.props.nodeType !== 1 || ["presentation", "none"].includes(ce(e)))
          return "";
        var a = zy(e), n = a.reduce(function(i, o) {
          return i || o(e, t);
        }, "");
        return t.debug && x.log(n || "{empty-value}", r, t), n;
      }
      function zy(e) {
        var t = xr(e, {
          noMatchAccessibleName: !0
        }), r = t.namingMethods || [];
        return r.map(function(a) {
          return zc[a];
        });
      }
      function Hc() {
        return /[\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u20A0-\u20CF\u20D0-\u20FF\u2100-\u214F\u2150-\u218F\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u2400-\u243F\u2440-\u245F\u2460-\u24FF\u2500-\u257F\u2580-\u259F\u25A0-\u25FF\u2600-\u26FF\u2700-\u27BF\uE000-\uF8FF]/g;
      }
      function $c() {
        return /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&\xa3\xa2\xa5\xa7\u20ac()*+,\-.\/:;<=>?@\[\]^_`{|}~\xb1]/g;
      }
      function Uc() {
        return /[\uDB80-\uDBBF][\uDC00-\uDFFF]/g;
      }
      function Gc() {
        return /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC38]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/g;
      }
      var Oo = function() {
        return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
      };
      function Vy(e, t) {
        var r = t.emoji, a = t.nonBmp, n = t.punctuations, i = !1;
        return r && (i || (i = Oo().test(e))), a && (i || (i = Hc().test(e) || Uc().test(e) || Gc().test(e))), n && (i || (i = $c().test(e))), i;
      }
      var Mo = Vy;
      function Io(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.15, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 3, a = e.actualNode.nodeValue.trim();
        if (!re(a) || Mo(a, {
          emoji: !0,
          nonBmp: !0
        }))
          return !1;
        var n = ue.get("canvasContext", function() {
          return L.createElement("canvas").getContext("2d", {
            willReadFrequently: !0
          });
        }), i = n.canvas, o = ue.get("fonts", function() {
          return {};
        }), u = E.getComputedStyle(e.parent.actualNode), s = u.getPropertyValue("font-family");
        o[s] || (o[s] = {
          occurrences: 0,
          numLigatures: 0
        });
        var l = o[s];
        if (l.occurrences >= r) {
          if (l.numLigatures / l.occurrences === 1)
            return !0;
          if (l.numLigatures === 0)
            return !1;
        }
        l.occurrences++;
        var c = 30, d = "".concat(c, "px ").concat(s);
        n.font = d;
        var f = a.charAt(0), p = n.measureText(f).width;
        if (p === 0)
          return l.numLigatures++, !0;
        if (p < 30) {
          var m = 30 / p;
          p *= m, c *= m, d = "".concat(c, "px ").concat(s);
        }
        i.width = p, i.height = c, n.font = d, n.textAlign = "left", n.textBaseline = "top", n.fillText(f, 0, 0);
        var h = new Uint32Array(n.getImageData(0, 0, p, c).data.buffer);
        if (!h.some(function(F) {
          return F;
        }))
          return l.numLigatures++, !0;
        n.clearRect(0, 0, p, c), n.fillText(a, 0, 0);
        var v = new Uint32Array(n.getImageData(0, 0, p, c).data.buffer), g = h.reduce(function(F, R, I) {
          return R === 0 && v[I] === 0 || R !== 0 && v[I] !== 0 ? F : ++F;
        }, 0), b = a.split("").reduce(function(F, R) {
          return F + n.measureText(R).width;
        }, 0), D = n.measureText(a).width, w = g / h.length, _ = 1 - D / b;
        return w >= t && _ >= t ? (l.numLigatures++, !0) : !1;
      }
      function Ge(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if (t = Gy(e, t), $y(e, t) || Uy(e, t))
          return "";
        var r = [ga, ba, Vc, jc, tr, Hy, xn], a = r.reduce(function(n, i) {
          return t.startNode === e && (n = re(n)), n !== "" ? n : i(e, t);
        }, "");
        return t.debug && x.log(a || "{empty-value}", e.actualNode, t), a;
      }
      function Hy(e) {
        return e.props.nodeType !== 3 ? "" : e.props.nodeValue;
      }
      function $y(e, t) {
        return !e || e.props.nodeType !== 1 || t.includeHidden ? !1 : !Re(e);
      }
      function Uy(e, t) {
        var r, a = t.ignoreIconLigature, n = t.pixelThreshold, i = (r = t.occurrenceThreshold) !== null && r !== void 0 ? r : t.occuranceThreshold;
        return e.props.nodeType !== 3 || !a ? !1 : Io(e, n, i);
      }
      function Gy(e, t) {
        return t.startNode || (t = de({
          startNode: e
        }, t)), e.props.nodeType === 1 && t.inLabelledByContext && t.includeHidden === void 0 && (t = de({
          includeHidden: !Re(e)
        }, t)), t;
      }
      Ge.alreadyProcessed = function(t, r) {
        return r.processed = r.processed || [], r.processed.includes(t) ? !0 : (r.processed.push(t), !1);
      };
      function Wy(e, t) {
        var r = t.emoji, a = t.nonBmp, n = t.punctuations;
        return r && (e = e.replace(Oo(), "")), a && (e = e.replace(Hc(), "").replace(Uc(), "").replace(Gc(), "")), n && (e = e.replace($c(), "")), e;
      }
      var Da = Wy;
      function Yy(e) {
        return Ky(e) || Xy(e) || Zy(e) || Jy(e) ? 0 : 1;
      }
      function Ky(e) {
        return re(e).length === 0;
      }
      function Xy(e) {
        return e.length === 1 && e.match(/\D/);
      }
      function Zy(e) {
        var t = ["aa", "abc"];
        return t.includes(e.toLowerCase());
      }
      function Jy(e) {
        var t = Da(e, {
          emoji: !0,
          nonBmp: !0,
          punctuations: !0
        });
        return !re(t);
      }
      var Po = Yy, Er = {
        stateTerms: ["on", "off"],
        standaloneTerms: ["name", "honorific-prefix", "given-name", "additional-name", "family-name", "honorific-suffix", "nickname", "username", "new-password", "current-password", "organization-title", "organization", "street-address", "address-line1", "address-line2", "address-line3", "address-level4", "address-level3", "address-level2", "address-level1", "country", "country-name", "postal-code", "cc-name", "cc-given-name", "cc-additional-name", "cc-family-name", "cc-number", "cc-exp", "cc-exp-month", "cc-exp-year", "cc-csc", "cc-type", "transaction-currency", "transaction-amount", "language", "bday", "bday-day", "bday-month", "bday-year", "sex", "url", "photo", "one-time-code"],
        qualifiers: ["home", "work", "mobile", "fax", "pager"],
        qualifiedTerms: ["tel", "tel-country-code", "tel-national", "tel-area-code", "tel-local", "tel-local-prefix", "tel-local-suffix", "tel-extension", "email", "impp"],
        locations: ["billing", "shipping"]
      };
      function Qy(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.looseTyped, a = r === void 0 ? !1 : r, n = t.stateTerms, i = n === void 0 ? [] : n, o = t.locations, u = o === void 0 ? [] : o, s = t.qualifiers, l = s === void 0 ? [] : s, c = t.standaloneTerms, d = c === void 0 ? [] : c, f = t.qualifiedTerms, p = f === void 0 ? [] : f, m = t.ignoredValues, h = m === void 0 ? [] : m;
        if (e = e.toLowerCase().trim(), i = i.concat(Er.stateTerms), i.includes(e) || e === "")
          return !0;
        l = l.concat(Er.qualifiers), u = u.concat(Er.locations), d = d.concat(Er.standaloneTerms), p = p.concat(Er.qualifiedTerms);
        var v = e.split(/\s+/g);
        if (v[v.length - 1] === "webauthn" && (v.pop(), v.length === 0) || !a && (v[0].length > 8 && v[0].substr(0, 8) === "section-" && v.shift(), u.includes(v[0]) && v.shift(), l.includes(v[0]) && (v.shift(), d = []), v.length !== 1))
          return !1;
        var g = v[v.length - 1];
        if (!h.includes(g))
          return d.includes(g) || p.includes(g);
      }
      var Wc = Qy;
      function e0(e) {
        var t, r;
        return e.attr("aria-labelledby") && (t = Ot(e.actualNode, "aria-labelledby"), r = t.map(function(a) {
          var n = le(a);
          return n ? It(n) : "";
        }).join(" ").trim(), r) || (r = e.attr("aria-label"), r && (r = re(r), r)) ? r : null;
      }
      var An = e0;
      function t0(e, t, r) {
        return e = le(e), It(e, t, r);
      }
      var Yc = t0;
      function r0(e) {
        var t, r, a;
        if (r = An(e), r)
          return r;
        if (e.attr("id")) {
          if (!e.actualNode)
            throw new TypeError("Cannot resolve explicit label reference for non-DOM nodes");
          var n = Oe(e.attr("id"));
          if (a = Xe(e.actualNode), t = a.querySelector('label[for="' + n + '"]'), r = t && Yc(t, !0), r)
            return r;
        }
        return t = ut(e, "label"), r = t && It(t, !0), r || null;
      }
      var Cn = r0;
      function a0(e) {
        return e = le(e), Cn(e);
      }
      var n0 = a0, i0 = [{
        matches: [{
          nodeName: "textarea"
        }, {
          nodeName: "input",
          properties: {
            type: ["text", "password", "search", "tel", "email", "url"]
          }
        }],
        namingMethods: "labelText"
      }, {
        matches: {
          nodeName: "input",
          properties: {
            type: ["button", "submit", "reset"]
          }
        },
        namingMethods: ["valueText", "titleText", "buttonDefaultText"]
      }, {
        matches: {
          nodeName: "input",
          properties: {
            type: "image"
          }
        },
        namingMethods: ["altText", "valueText", "labelText", "titleText", "buttonDefaultText"]
      }, {
        matches: "button",
        namingMethods: "subtreeText"
      }, {
        matches: "fieldset",
        namingMethods: "fieldsetLegendText"
      }, {
        matches: "OUTPUT",
        namingMethods: "subtreeText"
      }, {
        matches: [{
          nodeName: "select"
        }, {
          nodeName: "input",
          properties: {
            type: /^(?!text|password|search|tel|email|url|button|submit|reset)/
          }
        }],
        namingMethods: "labelText"
      }, {
        matches: "summary",
        namingMethods: "subtreeText"
      }, {
        matches: "figure",
        namingMethods: ["figureText", "titleText"]
      }, {
        matches: "img",
        namingMethods: "altText"
      }, {
        matches: "table",
        namingMethods: ["tableCaptionText", "tableSummaryText"]
      }, {
        matches: ["hr", "br"],
        namingMethods: ["titleText", "singleSpace"]
      }], o0 = i0;
      function Kc(e) {
        var t = st(e), r = [];
        return e.children.forEach(function(a) {
          a.actualNode.nodeType === 3 ? t && r.push(a) : r = r.concat(Kc(a));
        }), r;
      }
      var u0 = Kc, s0 = Fe(function(t) {
        var r = le(t), a = r.boundingClientRect, n = [], i = ma(r);
        return t.childNodes.forEach(function(o) {
          if (!(o.nodeType !== 3 || re(o.nodeValue) === "")) {
            var u = l0(o);
            c0(u, a) || n.push.apply(n, ne(Xc(u, i)));
          }
        }), n.length ? n : Xc([a], i);
      }), No = s0;
      function l0(e) {
        var t = L.createRange();
        return t.selectNodeContents(e), Array.from(t.getClientRects());
      }
      function c0(e, t) {
        return e.some(function(r) {
          var a = ha(r);
          return !vn(a, t);
        });
      }
      function Xc(e, t) {
        var r = [];
        return e.forEach(function(a) {
          if (!(a.width < 1 || a.height < 1)) {
            var n = t.reduce(function(i, o) {
              return i && gn(i, o.boundingClientRect);
            }, a);
            n && r.push(n);
          }
        }), r;
      }
      function d0(e) {
        yr();
        var t = le(e), r = t._grid;
        if (!r)
          return [];
        var a = No(e);
        return a.map(function(n) {
          return wo(r, n);
        });
      }
      var Lo = d0, f0 = ["checkbox", "img", "meter", "progressbar", "scrollbar", "radio", "slider", "spinbutton", "textbox"];
      function p0(e) {
        var t = we(e), r = t.vNode, a = x.commons.aria.getExplicitRole(r);
        if (a)
          return f0.indexOf(a) !== -1;
        switch (r.props.nodeName) {
          case "img":
          case "iframe":
          case "object":
          case "video":
          case "audio":
          case "canvas":
          case "svg":
          case "math":
          case "button":
          case "select":
          case "textarea":
          case "keygen":
          case "progress":
          case "meter":
            return !0;
          case "input":
            return r.props.type !== "hidden";
          default:
            return !1;
        }
      }
      var Bo = p0, m0 = ["head", "title", "template", "script", "style", "iframe", "object", "video", "audio", "noscript"];
      function qo(e) {
        return m0.includes(e.props.nodeName) ? !1 : e.children.some(function(t) {
          var r = t.props;
          return r.nodeType === 3 && r.nodeValue.trim();
        });
      }
      function Zc(e, t, r) {
        return qo(e) || Bo(e.actualNode) || !r && !!An(e) || !t && e.children.some(function(a) {
          return a.actualNode.nodeType === 1 && Zc(a);
        });
      }
      var _a = Zc;
      function h0(e, t, r) {
        return e = le(e), _a(e, t, r);
      }
      var Fn = h0;
      function jo(e) {
        return typeof e.children > "u" || qo(e) ? !0 : e.props.nodeType === 1 && Bo(e) ? !!x.commons.text.accessibleTextVirtual(e) : e.children.some(function(t) {
          return !t.attr("lang") && jo(t) && !er(t);
        });
      }
      function v0(e) {
        var t = Lt(e.getAttribute("tabindex"));
        return t > -1 && Ne(e) && !Do(e);
      }
      var Jc = v0;
      function Qc(e, t) {
        var r = we(e), a = r.vNode, n = r.domNode;
        return a ? (a._isHiddenWithCSS === void 0 && (a._isHiddenWithCSS = ed(n, t)), a._isHiddenWithCSS) : ed(n, t);
      }
      function ed(e, t) {
        if (e.nodeType === 9 || (e.nodeType === 11 && (e = e.host), ["STYLE", "SCRIPT"].includes(e.nodeName.toUpperCase())))
          return !1;
        var r = E.getComputedStyle(e, null);
        if (!r)
          throw new Error("Style does not exist for the given element.");
        var a = r.getPropertyValue("display");
        if (a === "none")
          return !0;
        var n = ["hidden", "collapse"], i = r.getPropertyValue("visibility");
        if (n.includes(i) && !t || n.includes(i) && t && n.includes(t))
          return !0;
        var o = Ue(e);
        return o && !n.includes(i) ? Qc(o, i) : !1;
      }
      var g0 = Qc;
      function b0(e) {
        var t = e.doctype;
        return t === null ? !1 : t.name === "html" && !t.publicId && !t.systemId;
      }
      var td = b0;
      function y0(e) {
        var t;
        (e instanceof $e || (t = E) !== null && t !== void 0 && t.Node && e instanceof E.Node) && (e = x.commons.aria.getRole(e));
        var r = he.ariaRoles[e];
        return r?.type || null;
      }
      var At = y0;
      function rd(e, t) {
        t(e.actualNode) !== !1 && e.children.forEach(function(r) {
          return rd(r, t);
        });
      }
      var w0 = ["block", "list-item", "table", "flex", "grid", "inline-block"];
      function ad(e) {
        var t = E.getComputedStyle(e).getPropertyValue("display");
        return w0.includes(t) || t.substr(0, 6) === "table-";
      }
      function D0(e) {
        for (var t = Ue(e); t && !ad(t); )
          t = Ue(t);
        return le(t);
      }
      function _0(e, t) {
        if (ad(e))
          return !1;
        var r = D0(e), a = "", n = "", i = 0;
        return rd(r, function(o) {
          if (i === 2)
            return !1;
          if (o.nodeType === 3 && (a += o.nodeValue), o.nodeType === 1) {
            var u = (o.nodeName || "").toUpperCase();
            if (o === e && (i = 1), ["BR", "HR"].includes(u))
              i === 0 ? (a = "", n = "") : i = 2;
            else {
              if (o.style.display === "none" || o.style.overflow === "hidden" || !["", null, "none"].includes(o.style.float) || !["", null, "relative"].includes(o.style.position))
                return !1;
              if (At(o) === "widget")
                return n += o.textContent, !1;
            }
          }
        }), a = re(a), t != null && t.noLengthCompare ? a.length !== 0 : (n = re(n), a.length > n.length);
      }
      var zo = _0;
      function x0(e) {
        e = e || {};
        var t = e.modalPercent || 0.75;
        if (ue.get("isModalOpen"))
          return ue.get("isModalOpen");
        var r = Bt(x._tree[0], "dialog, [role=dialog], [aria-modal=true]", st);
        if (r.length)
          return ue.set("isModalOpen", !0), !0;
        for (var a = pn(E), n = a.width * t, i = a.height * t, o = (a.width - n) / 2, u = (a.height - i) / 2, s = [{
          x: o,
          y: u
        }, {
          x: a.width - o,
          y: u
        }, {
          x: a.width / 2,
          y: a.height / 2
        }, {
          x: o,
          y: a.height - u
        }, {
          x: a.width - o,
          y: a.height - u
        }], l = s.map(function(p) {
          return Array.from(L.elementsFromPoint(p.x, p.y));
        }), c = function() {
          var m = l[f].find(function(h) {
            var v = E.getComputedStyle(h);
            return parseInt(v.width, 10) >= n && parseInt(v.height, 10) >= i && v.getPropertyValue("pointer-events") !== "none" && (v.position === "absolute" || v.position === "fixed");
          });
          if (m && l.every(function(h) {
            return h.includes(m);
          }))
            return ue.set("isModalOpen", !0), {
              v: !0
            };
        }, d, f = 0; f < l.length; f++)
          if (d = c(), d)
            return d.v;
        ue.set("isModalOpen", void 0);
      }
      var xa = x0;
      function nd(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2, r = e.ownerDocument.createRange();
        r.setStart(e, 0), r.setEnd(e, e.childNodes.length);
        var a = 0, n = 0, i = Ce(r.getClientRects()), o;
        try {
          for (i.s(); !(o = i.n()).done; ) {
            var u = o.value;
            if (!(u.height <= t))
              if (a > u.top + t)
                a = Math.max(a, u.bottom);
              else if (n === 0)
                a = u.bottom, n++;
              else
                return !0;
          }
        } catch (s) {
          i.e(s);
        } finally {
          i.f();
        }
        return !1;
      }
      function E0(e) {
        return e instanceof E.Node;
      }
      var A0 = E0, Vo = "color.incompleteData", C0 = {
        set: function(t, r) {
          if (typeof t != "string")
            throw new Error("Incomplete data: key must be a string");
          var a = ue.get(Vo, function() {
            return {};
          });
          return r && (a[t] = r), a[t];
        },
        get: function(t) {
          var r = ue.get(Vo);
          return r?.[t];
        },
        clear: function() {
          ue.set(Vo, {});
        }
      }, We = C0;
      function F0(e, t) {
        var r = ["IMG", "CANVAS", "OBJECT", "IFRAME", "VIDEO", "SVG"], a = e.nodeName.toUpperCase();
        if (r.includes(a))
          return We.set("bgColor", "imgNode"), !0;
        t = t || E.getComputedStyle(e);
        var n = t.getPropertyValue("background-image"), i = n !== "none";
        if (i) {
          var o = /gradient/.test(n);
          We.set("bgColor", o ? "bgGradient" : "bgImage");
        }
        return i;
      }
      var Tn = F0, id = {};
      Dt(id, {
        ArrayFrom: function() {
          return m1.default;
        },
        Colorjs: function() {
          return _e;
        },
        CssSelectorParser: function() {
          return M0.CssSelectorParser;
        },
        doT: function() {
          return od.default;
        },
        emojiRegexText: function() {
          return Oo;
        },
        memoize: function() {
          return I0.default;
        }
      });
      var T0 = ot(vh()), R0 = ot(gh());
      ot(bh());
      var S0 = ot(Oh()), k0 = ot(Hh()), O0 = ot(Hs());
      "hasOwn" in Object || (Object.hasOwn = S0.default), "values" in Object || (Object.values = k0.default), "Promise" in E || T0.default.polyfill(), "Uint32Array" in E || (E.Uint32Array = R0.Uint32Array), E.Uint32Array && ("some" in E.Uint32Array.prototype || Object.defineProperty(E.Uint32Array.prototype, "some", {
        value: Array.prototype.some
      }), "reduce" in E.Uint32Array.prototype || Object.defineProperty(E.Uint32Array.prototype, "reduce", {
        value: Array.prototype.reduce
      })), typeof Object.assign != "function" && function() {
        Object.assign = function(e) {
          if (e == null)
            throw new TypeError("Cannot convert undefined or null to object");
          for (var t = Object(e), r = 1; r < arguments.length; r++) {
            var a = arguments[r];
            if (a != null)
              for (var n in a)
                a.hasOwnProperty(n) && (t[n] = a[n]);
          }
          return t;
        };
      }(), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(t) {
          if (this === null)
            throw new TypeError("Array.prototype.find called on null or undefined");
          if (typeof t != "function")
            throw new TypeError("predicate must be a function");
          for (var r = Object(this), a = r.length >>> 0, n = arguments[1], i, o = 0; o < a; o++)
            if (i = r[o], t.call(n, i, o, r))
              return i;
        }
      }), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(t, r) {
          if (this === null)
            throw new TypeError("Array.prototype.find called on null or undefined");
          if (typeof t != "function")
            throw new TypeError("predicate must be a function");
          for (var a = Object(this), n = a.length >>> 0, i, o = 0; o < n; o++)
            if (i = a[o], t.call(r, i, o, a))
              return o;
          return -1;
        }
      }), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
        value: function(t) {
          var r = Object(this), a = parseInt(r.length, 10) || 0;
          if (a === 0)
            return !1;
          var n = parseInt(arguments[1], 10) || 0, i;
          n >= 0 ? i = n : (i = a + n, i < 0 && (i = 0));
          for (var o; i < a; ) {
            if (o = r[i], t === o || t !== t && o !== o)
              return !0;
            i++;
          }
          return !1;
        }
      }), Array.prototype.some || Object.defineProperty(Array.prototype, "some", {
        value: function(t) {
          if (this == null)
            throw new TypeError("Array.prototype.some called on null or undefined");
          if (typeof t != "function")
            throw new TypeError();
          for (var r = Object(this), a = r.length >>> 0, n = arguments.length >= 2 ? arguments[1] : void 0, i = 0; i < a; i++)
            if (i in r && t.call(n, r[i], i, r))
              return !0;
          return !1;
        }
      }), Array.from || (Array.from = O0.default), String.prototype.includes || (String.prototype.includes = function(e, t) {
        return typeof t != "number" && (t = 0), t + e.length > this.length ? !1 : this.indexOf(e, t) !== -1;
      }), Array.prototype.flat || Object.defineProperty(Array.prototype, "flat", {
        configurable: !0,
        value: function e() {
          var t = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
          return t ? Array.prototype.reduce.call(this, function(r, a) {
            return Array.isArray(a) ? r.push.apply(r, e.call(a, t - 1)) : r.push(a), r;
          }, []) : Array.prototype.slice.call(this);
        },
        writable: !0
      }), E.Node && !("isConnected" in E.Node.prototype) && Object.defineProperty(E.Node.prototype, "isConnected", {
        get: function() {
          return !this.ownerDocument || !(this.ownerDocument.compareDocumentPosition(this) & this.DOCUMENT_POSITION_DISCONNECTED);
        }
      });
      var M0 = ot(ws()), od = ot($s()), I0 = ot(bs());
      function Le(e, t) {
        var r = e.length;
        Array.isArray(e[0]) || (e = [e]), Array.isArray(t[0]) || (t = t.map(function(o) {
          return [o];
        }));
        var a = t[0].length, n = t[0].map(function(o, u) {
          return t.map(function(s) {
            return s[u];
          });
        }), i = e.map(function(o) {
          return n.map(function(u) {
            var s = 0;
            if (!Array.isArray(o)) {
              var l = Ce(u), c;
              try {
                for (l.s(); !(c = l.n()).done; ) {
                  var d = c.value;
                  s += o * d;
                }
              } catch (p) {
                l.e(p);
              } finally {
                l.f();
              }
              return s;
            }
            for (var f = 0; f < o.length; f++)
              s += o[f] * (u[f] || 0);
            return s;
          });
        });
        return r === 1 && (i = i[0]), a === 1 ? i.map(function(o) {
          return o[0];
        }) : i;
      }
      function Ea(e) {
        return rr(e) === "string";
      }
      function rr(e) {
        var t = Object.prototype.toString.call(e);
        return (t.match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();
      }
      function Rn(e, t) {
        e = +e, t = +t;
        var r = (Math.floor(e) + "").length;
        if (t > r)
          return +e.toFixed(t - r);
        var a = Math.pow(10, r - t);
        return Math.round(e / a) * a;
      }
      function ud(e) {
        if (e) {
          e = e.trim();
          var t = /^([a-z]+)\((.+?)\)$/i, r = /^-?[\d.]+$/, a = e.match(t);
          if (a) {
            var n = [];
            return a[2].replace(/\/?\s*([-\w.]+(?:%|deg)?)/g, function(i, o) {
              /%$/.test(o) ? (o = new Number(o.slice(0, -1) / 100), o.type = "<percentage>") : /deg$/.test(o) ? (o = new Number(+o.slice(0, -3)), o.type = "<angle>", o.unit = "deg") : r.test(o) && (o = new Number(o), o.type = "<number>"), i.startsWith("/") && (o = o instanceof Number ? o : new Number(o), o.alpha = !0), n.push(o);
            }), {
              name: a[1].toLowerCase(),
              rawName: a[1],
              rawArgs: a[2],
              args: n
            };
          }
        }
      }
      function sd(e) {
        return e[e.length - 1];
      }
      function Sn(e, t, r) {
        return isNaN(e) ? t : isNaN(t) ? e : e + (t - e) * r;
      }
      function ld(e, t, r) {
        return (r - e) / (t - e);
      }
      function Ho(e, t, r) {
        return Sn(t[0], t[1], ld(e[0], e[1], r));
      }
      function cd(e) {
        return e.map(function(t) {
          return t.split("|").map(function(r) {
            r = r.trim();
            var a = r.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);
            if (a) {
              var n = new String(a[1]);
              return n.range = [+a[2], +a[3]], n;
            }
            return r;
          });
        });
      }
      var P0 = Object.freeze({
        __proto__: null,
        isString: Ea,
        type: rr,
        toPrecision: Rn,
        parseFunction: ud,
        last: sd,
        interpolate: Sn,
        interpolateInv: ld,
        mapRange: Ho,
        parseCoordGrammar: cd,
        multiplyMatrices: Le
      }), N0 = function() {
        function e() {
          Tt(this, e);
        }
        return Rt(e, [{
          key: "add",
          value: function(r, a, n) {
            if (typeof arguments[0] != "string") {
              for (var r in arguments[0])
                this.add(r, arguments[0][r], arguments[1]);
              return;
            }
            (Array.isArray(r) ? r : [r]).forEach(function(i) {
              this[i] = this[i] || [], a && this[i][n ? "unshift" : "push"](a);
            }, this);
          }
        }, {
          key: "run",
          value: function(r, a) {
            this[r] = this[r] || [], this[r].forEach(function(n) {
              n.call(a && a.context ? a.context : a, a);
            });
          }
        }]);
      }(), ar = new N0(), Pt = {
        gamut_mapping: "lch.c",
        precision: 5,
        deltaE: "76"
      }, Ct = {
        D50: [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585],
        D65: [0.3127 / 0.329, 1, (1 - 0.3127 - 0.329) / 0.329]
      };
      function $o(e) {
        return Array.isArray(e) ? e : Ct[e];
      }
      function kn(e, t, r) {
        var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        if (e = $o(e), t = $o(t), !e || !t)
          throw new TypeError("Missing white point to convert ".concat(e ? "" : "from").concat(!e && !t ? "/" : "").concat(t ? "" : "to"));
        if (e === t)
          return r;
        var n = {
          W1: e,
          W2: t,
          XYZ: r,
          options: a
        };
        if (ar.run("chromatic-adaptation-start", n), n.M || (n.W1 === Ct.D65 && n.W2 === Ct.D50 ? n.M = [[1.0479298208405488, 0.022946793341019088, -0.05019222954313557], [0.029627815688159344, 0.990434484573249, -0.01707382502938514], [-0.009243058152591178, 0.015055144896577895, 0.7518742899580008]] : n.W1 === Ct.D50 && n.W2 === Ct.D65 && (n.M = [[0.9554734527042182, -0.023098536874261423, 0.0632593086610217], [-0.028369706963208136, 1.0099954580058226, 0.021041398966943008], [0.012314001688319899, -0.020507696433477912, 1.3303659366080753]])), ar.run("chromatic-adaptation-end", n), n.M)
          return Le(n.M, n.XYZ);
        throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.");
      }
      var L0 = 75e-6, Ft = (C = /* @__PURE__ */ new WeakSet(), k = /* @__PURE__ */ new WeakMap(), function() {
        function e(t) {
          var r, a, n, i, o, u, s;
          Tt(this, e), es(this, C), Xt(this, k, void 0), this.id = t.id, this.name = t.name, this.base = t.base ? Ft.get(t.base) : null, this.aliases = t.aliases, this.base && (this.fromBase = t.fromBase, this.toBase = t.toBase);
          var l = (r = t.coords) !== null && r !== void 0 ? r : this.base.coords;
          this.coords = l;
          var c = (a = (n = t.white) !== null && n !== void 0 ? n : this.base.white) !== null && a !== void 0 ? a : "D65";
          this.white = $o(c), this.formats = (i = t.formats) !== null && i !== void 0 ? i : {};
          for (var d in this.formats) {
            var f = this.formats[d];
            f.type || (f.type = "function"), f.name || (f.name = d);
          }
          t.cssId && !((o = this.formats.functions) !== null && o !== void 0 && o.color) ? (this.formats.color = {
            id: t.cssId
          }, Object.defineProperty(this, "cssId", {
            value: t.cssId
          })) : (u = this.formats) !== null && u !== void 0 && u.color && !((s = this.formats) !== null && s !== void 0 && s.color.id) && (this.formats.color.id = this.id), this.referred = t.referred, at(k, this, Tr(C, this, B0).call(this).reverse()), ar.run("colorspace-init-end", this);
        }
        return Rt(e, [{
          key: "inGamut",
          value: function(r) {
            var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = a.epsilon, i = n === void 0 ? L0 : n;
            if (this.isPolar)
              return r = this.toBase(r), this.base.inGamut(r, {
                epsilon: i
              });
            var o = Object.values(this.coords);
            return r.every(function(u, s) {
              var l = o[s];
              if (l.type !== "angle" && l.range) {
                if (Number.isNaN(u))
                  return !0;
                var c = $(l.range, 2), d = c[0], f = c[1];
                return (d === void 0 || u >= d - i) && (f === void 0 || u <= f + i);
              }
              return !0;
            });
          }
        }, {
          key: "cssId",
          get: function() {
            var r;
            return ((r = this.formats.functions) === null || r === void 0 || (r = r.color) === null || r === void 0 ? void 0 : r.id) || this.id;
          }
        }, {
          key: "isPolar",
          get: function() {
            for (var r in this.coords)
              if (this.coords[r].type === "angle")
                return !0;
            return !1;
          }
        }, {
          key: "getFormat",
          value: function(r) {
            if (O(r) === "object")
              return r = Tr(C, this, dd).call(this, r), r;
            var a;
            return r === "default" ? a = Object.values(this.formats)[0] : a = this.formats[r], a ? (a = Tr(C, this, dd).call(this, a), a) : null;
          }
        }, {
          key: "to",
          value: function(r, a) {
            if (arguments.length === 1) {
              var n = [r.space, r.coords];
              r = n[0], a = n[1];
            }
            if (r = Ft.get(r), this === r)
              return a;
            a = a.map(function(f) {
              return Number.isNaN(f) ? 0 : f;
            });
            for (var i = wt(k, this), o = wt(k, r), u, s, l = 0; l < i.length && i[l] === o[l]; l++)
              u = i[l], s = l;
            if (!u)
              throw new Error("Cannot convert between color spaces ".concat(this, " and ").concat(r, ": no connection space was found"));
            for (var c = i.length - 1; c > s; c--)
              a = i[c].toBase(a);
            for (var d = s + 1; d < o.length; d++)
              a = o[d].fromBase(a);
            return a;
          }
        }, {
          key: "from",
          value: function(r, a) {
            if (arguments.length === 1) {
              var n = [r.space, r.coords];
              r = n[0], a = n[1];
            }
            return r = Ft.get(r), r.to(this, a);
          }
        }, {
          key: "toString",
          value: function() {
            return "".concat(this.name, " (").concat(this.id, ")");
          }
        }, {
          key: "getMinCoords",
          value: function() {
            var r = [];
            for (var a in this.coords) {
              var n, i = this.coords[a], o = i.range || i.refRange;
              r.push((n = o?.min) !== null && n !== void 0 ? n : 0);
            }
            return r;
          }
        }], [{
          key: "all",
          get: function() {
            return ne(new Set(Object.values(Ft.registry)));
          }
        }, {
          key: "register",
          value: function(r, a) {
            if (arguments.length === 1 && (a = arguments[0], r = a.id), a = this.get(a), this.registry[r] && this.registry[r] !== a)
              throw new Error("Duplicate color space registration: '".concat(r, "'"));
            if (this.registry[r] = a, arguments.length === 1 && a.aliases) {
              var n = Ce(a.aliases), i;
              try {
                for (n.s(); !(i = n.n()).done; ) {
                  var o = i.value;
                  this.register(o, a);
                }
              } catch (u) {
                n.e(u);
              } finally {
                n.f();
              }
            }
            return a;
          }
        }, {
          key: "get",
          value: function(r) {
            if (!r || r instanceof Ft)
              return r;
            var a = rr(r);
            if (a === "string") {
              var n = Ft.registry[r.toLowerCase()];
              if (!n)
                throw new TypeError('No color space found with id = "'.concat(r, '"'));
              return n;
            }
            for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), u = 1; u < i; u++)
              o[u - 1] = arguments[u];
            if (o.length)
              return Ft.get.apply(Ft, o);
            throw new TypeError("".concat(r, " is not a valid color space"));
          }
        }, {
          key: "resolveCoord",
          value: function(r, a) {
            var n = rr(r), i, o;
            if (n === "string")
              if (r.includes(".")) {
                var u = r.split("."), s = $(u, 2);
                i = s[0], o = s[1];
              } else
                i = void 0, o = r;
            else if (Array.isArray(r)) {
              var l = $(r, 2);
              i = l[0], o = l[1];
            } else
              i = r.space, o = r.coordId;
            if (i = Ft.get(i), i || (i = a), !i)
              throw new TypeError("Cannot resolve coordinate reference ".concat(r, ": No color space specified and relative references are not allowed here"));
            if (n = rr(o), n === "number" || n === "string" && o >= 0) {
              var c = Object.entries(i.coords)[o];
              if (c)
                return de({
                  space: i,
                  id: c[0],
                  index: o
                }, c[1]);
            }
            i = Ft.get(i);
            var d = o.toLowerCase(), f = 0;
            for (var p in i.coords) {
              var m, h = i.coords[p];
              if (p.toLowerCase() === d || ((m = h.name) === null || m === void 0 ? void 0 : m.toLowerCase()) === d)
                return de({
                  space: i,
                  id: p,
                  index: f
                }, h);
              f++;
            }
            throw new TypeError('No "'.concat(o, '" coordinate found in ').concat(i.name, ". Its coordinates are: ").concat(Object.keys(i.coords).join(", ")));
          }
        }]);
      }());
      function dd(e) {
        if (e.coords && !e.coordGrammar) {
          e.type || (e.type = "function"), e.name || (e.name = "color"), e.coordGrammar = cd(e.coords);
          var t = Object.entries(this.coords).map(function(r, a) {
            var n = $(r, 2);
            n[0];
            var i = n[1], o = e.coordGrammar[a][0], u = i.range || i.refRange, s = o.range, l = "";
            return o == "<percentage>" ? (s = [0, 100], l = "%") : o == "<angle>" && (l = "deg"), {
              fromRange: u,
              toRange: s,
              suffix: l
            };
          });
          e.serializeCoords = function(r, a) {
            return r.map(function(n, i) {
              var o = t[i], u = o.fromRange, s = o.toRange, l = o.suffix;
              return u && s && (n = Ho(u, s, n)), n = Rn(n, a), l && (n += l), n;
            });
          };
        }
        return e;
      }
      function B0() {
        for (var e = [this], t = this; t = t.base; )
          e.push(t);
        return e;
      }
      var ee = Ft;
      us(ee, "registry", {}), us(ee, "DEFAULT_FORMAT", {
        type: "functions",
        name: "color"
      });
      var gt = new ee({
        id: "xyz-d65",
        name: "XYZ D65",
        coords: {
          x: {
            name: "X"
          },
          y: {
            name: "Y"
          },
          z: {
            name: "Z"
          }
        },
        white: "D65",
        formats: {
          color: {
            ids: ["xyz-d65", "xyz"]
          }
        },
        aliases: ["xyz"]
      }), nt = function(e) {
        function t(r) {
          var a, n;
          if (Tt(this, t), r.coords || (r.coords = {
            r: {
              range: [0, 1],
              name: "Red"
            },
            g: {
              range: [0, 1],
              name: "Green"
            },
            b: {
              range: [0, 1],
              name: "Blue"
            }
          }), r.base || (r.base = gt), r.toXYZ_M && r.fromXYZ_M) {
            var i, o;
            (i = r.toBase) !== null && i !== void 0 || (r.toBase = function(u) {
              var s = Le(r.toXYZ_M, u);
              return n.white !== n.base.white && (s = kn(n.white, n.base.white, s)), s;
            }), (o = r.fromBase) !== null && o !== void 0 || (r.fromBase = function(u) {
              return u = kn(n.base.white, n.white, u), Le(r.fromXYZ_M, u);
            });
          }
          return (a = r.referred) !== null && a !== void 0 || (r.referred = "display"), n = hi(this, t, [r]);
        }
        return gi(t, e), Rt(t);
      }(ee);
      function fd(e) {
        var t, r = {
          str: (t = String(e)) === null || t === void 0 ? void 0 : t.trim()
        };
        if (ar.run("parse-start", r), r.color)
          return r.color;
        if (r.parsed = ud(r.str), r.parsed) {
          var a = r.parsed.name;
          if (a === "color") {
            var n = r.parsed.args.shift(), i = r.parsed.rawArgs.indexOf("/") > 0 ? r.parsed.args.pop() : 1, o = Ce(ee.all), u;
            try {
              var s = function() {
                var V = u.value, S = V.getFormat("color");
                if (S) {
                  var N;
                  if (n === S.id || (N = S.ids) !== null && N !== void 0 && N.includes(n)) {
                    var z = Object.keys(V.coords).length, H = Array(z).fill(0);
                    return H.forEach(function(Q, ie) {
                      return H[ie] = r.parsed.args[ie] || 0;
                    }), {
                      v: {
                        spaceId: V.id,
                        coords: H,
                        alpha: i
                      }
                    };
                  }
                }
              }, l;
              for (o.s(); !(u = o.n()).done; )
                if (l = s(), l)
                  return l.v;
            } catch (I) {
              o.e(I);
            } finally {
              o.f();
            }
            var c = "";
            if (n in ee.registry) {
              var d, f = (d = ee.registry[n].formats) === null || d === void 0 || (d = d.functions) === null || d === void 0 || (d = d.color) === null || d === void 0 ? void 0 : d.id;
              f && (c = "Did you mean color(".concat(f, ")?"));
            }
            throw new TypeError("Cannot parse color(".concat(n, "). ") + (c || "Missing a plugin?"));
          } else {
            var p = Ce(ee.all), m;
            try {
              var h = function() {
                var V = m.value, S = V.getFormat(a);
                if (S && S.type === "function") {
                  var N = 1;
                  (S.lastAlpha || sd(r.parsed.args).alpha) && (N = r.parsed.args.pop());
                  var z = r.parsed.args;
                  return S.coordGrammar && Object.entries(V.coords).forEach(function(H, Q) {
                    var ie, Y = $(H, 2), te = Y[0], B = Y[1], Z = S.coordGrammar[Q], A = (ie = z[Q]) === null || ie === void 0 ? void 0 : ie.type;
                    if (Z = Z.find(function(ae) {
                      return ae == A;
                    }), !Z) {
                      var U = B.name || te;
                      throw new TypeError("".concat(A, " not allowed for ").concat(U, " in ").concat(a, "()"));
                    }
                    var P = Z.range;
                    A === "<percentage>" && (P || (P = [0, 1]));
                    var G = B.range || B.refRange;
                    P && G && (z[Q] = Ho(P, G, z[Q]));
                  }), {
                    v: {
                      spaceId: V.id,
                      coords: z,
                      alpha: N
                    }
                  };
                }
              }, v;
              for (p.s(); !(m = p.n()).done; )
                if (v = h(), v)
                  return v.v;
            } catch (I) {
              p.e(I);
            } finally {
              p.f();
            }
          }
        } else {
          var g = Ce(ee.all), b;
          try {
            for (g.s(); !(b = g.n()).done; ) {
              var D = b.value;
              for (var w in D.formats) {
                var _ = D.formats[w];
                if (_.type === "custom" && !(_.test && !_.test(r.str))) {
                  var F = _.parse(r.str);
                  if (F) {
                    var R;
                    return (R = F.alpha) !== null && R !== void 0 || (F.alpha = 1), F;
                  }
                }
              }
            }
          } catch (I) {
            g.e(I);
          } finally {
            g.f();
          }
        }
        throw new TypeError("Could not parse ".concat(e, " as a color. Missing a plugin?"));
      }
      function ge(e) {
        if (!e)
          throw new TypeError("Empty color reference");
        Ea(e) && (e = fd(e));
        var t = e.space || e.spaceId;
        return t instanceof ee || (e.space = ee.get(t)), e.alpha === void 0 && (e.alpha = 1), e;
      }
      function Aa(e, t) {
        return t = ee.get(t), t.from(e);
      }
      function bt(e, t) {
        var r = ee.resolveCoord(t, e.space), a = r.space, n = r.index, i = Aa(e, a);
        return i[n];
      }
      function pd(e, t, r) {
        return t = ee.get(t), e.coords = t.to(e.space, r), e;
      }
      function nr(e, t, r) {
        if (e = ge(e), arguments.length === 2 && rr(arguments[1]) === "object") {
          var a = arguments[1];
          for (var n in a)
            nr(e, n, a[n]);
        } else {
          typeof r == "function" && (r = r(bt(e, t)));
          var i = ee.resolveCoord(t, e.space), o = i.space, u = i.index, s = Aa(e, o);
          s[u] = r, pd(e, o, s);
        }
        return e;
      }
      var Uo = new ee({
        id: "xyz-d50",
        name: "XYZ D50",
        white: "D50",
        base: gt,
        fromBase: function(t) {
          return kn(gt.white, "D50", t);
        },
        toBase: function(t) {
          return kn("D50", gt.white, t);
        },
        formats: {
          color: {}
        }
      }), q0 = 216 / 24389, md = 24 / 116, On = 24389 / 27, Go = Ct.D50, ct = new ee({
        id: "lab",
        name: "Lab",
        coords: {
          l: {
            refRange: [0, 100],
            name: "L"
          },
          a: {
            refRange: [-125, 125]
          },
          b: {
            refRange: [-125, 125]
          }
        },
        white: Go,
        base: Uo,
        fromBase: function(t) {
          var r = t.map(function(n, i) {
            return n / Go[i];
          }), a = r.map(function(n) {
            return n > q0 ? Math.cbrt(n) : (On * n + 16) / 116;
          });
          return [116 * a[1] - 16, 500 * (a[0] - a[1]), 200 * (a[1] - a[2])];
        },
        toBase: function(t) {
          var r = [];
          r[1] = (t[0] + 16) / 116, r[0] = t[1] / 500 + r[1], r[2] = r[1] - t[2] / 200;
          var a = [r[0] > md ? Math.pow(r[0], 3) : (116 * r[0] - 16) / On, t[0] > 8 ? Math.pow((t[0] + 16) / 116, 3) : t[0] / On, r[2] > md ? Math.pow(r[2], 3) : (116 * r[2] - 16) / On];
          return a.map(function(n, i) {
            return n * Go[i];
          });
        },
        formats: {
          lab: {
            coords: ["<number> | <percentage>", "<number>", "<number>"]
          }
        }
      });
      function Mn(e) {
        return (e % 360 + 360) % 360;
      }
      function j0(e, t) {
        if (e === "raw")
          return t;
        var r = t.map(Mn), a = $(r, 2), n = a[0], i = a[1], o = i - n;
        return e === "increasing" ? o < 0 && (i += 360) : e === "decreasing" ? o > 0 && (n += 360) : e === "longer" ? -180 < o && o < 180 && (o > 0 ? i += 360 : n += 360) : e === "shorter" && (o > 180 ? n += 360 : o < -180 && (i += 360)), [n, i];
      }
      var Ca = new ee({
        id: "lch",
        name: "LCH",
        coords: {
          l: {
            refRange: [0, 100],
            name: "Lightness"
          },
          c: {
            refRange: [0, 150],
            name: "Chroma"
          },
          h: {
            refRange: [0, 360],
            type: "angle",
            name: "Hue"
          }
        },
        base: ct,
        fromBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2], o, u = 0.02;
          return Math.abs(n) < u && Math.abs(i) < u ? o = NaN : o = Math.atan2(i, n) * 180 / Math.PI, [a, Math.sqrt(Math.pow(n, 2) + Math.pow(i, 2)), Mn(o)];
        },
        toBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2];
          return n < 0 && (n = 0), isNaN(i) && (i = 0), [a, n * Math.cos(i * Math.PI / 180), n * Math.sin(i * Math.PI / 180)];
        },
        formats: {
          lch: {
            coords: ["<number> | <percentage>", "<number>", "<number> | <angle>"]
          }
        }
      }), hd = Math.pow(25, 7), In = Math.PI, vd = 180 / In, Vr = In / 180;
      function Wo(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = r.kL, n = a === void 0 ? 1 : a, i = r.kC, o = i === void 0 ? 1 : i, u = r.kH, s = u === void 0 ? 1 : u, l = ct.from(e), c = $(l, 3), d = c[0], f = c[1], p = c[2], m = Ca.from(ct, [d, f, p])[1], h = ct.from(t), v = $(h, 3), g = v[0], b = v[1], D = v[2], w = Ca.from(ct, [g, b, D])[1];
        m < 0 && (m = 0), w < 0 && (w = 0);
        var _ = (m + w) / 2, F = Math.pow(_, 7), R = 0.5 * (1 - Math.sqrt(F / (F + hd))), I = (1 + R) * f, V = (1 + R) * b, S = Math.sqrt(Math.pow(I, 2) + Math.pow(p, 2)), N = Math.sqrt(Math.pow(V, 2) + Math.pow(D, 2)), z = I === 0 && p === 0 ? 0 : Math.atan2(p, I), H = V === 0 && D === 0 ? 0 : Math.atan2(D, V);
        z < 0 && (z += 2 * In), H < 0 && (H += 2 * In), z *= vd, H *= vd;
        var Q = g - d, ie = N - S, Y = H - z, te = z + H, B = Math.abs(Y), Z;
        S * N === 0 ? Z = 0 : B <= 180 ? Z = Y : Y > 180 ? Z = Y - 360 : Y < -180 ? Z = Y + 360 : console.log("the unthinkable has happened");
        var A = 2 * Math.sqrt(N * S) * Math.sin(Z * Vr / 2), U = (d + g) / 2, P = (S + N) / 2, G = Math.pow(P, 7), ae;
        S * N === 0 ? ae = te : B <= 180 ? ae = te / 2 : te < 360 ? ae = (te + 360) / 2 : ae = (te - 360) / 2;
        var W = Math.pow(U - 50, 2), X = 1 + 0.015 * W / Math.sqrt(20 + W), pe = 1 + 0.045 * P, be = 1;
        be -= 0.17 * Math.cos((ae - 30) * Vr), be += 0.24 * Math.cos(2 * ae * Vr), be += 0.32 * Math.cos((3 * ae + 6) * Vr), be -= 0.2 * Math.cos((4 * ae - 63) * Vr);
        var xe = 1 + 0.015 * P * be, Me = 30 * Math.exp(-1 * Math.pow((ae - 275) / 25, 2)), je = 2 * Math.sqrt(G / (G + hd)), Be = -1 * Math.sin(2 * Me * Vr) * je, Ee = Math.pow(Q / (n * X), 2);
        return Ee += Math.pow(ie / (o * pe), 2), Ee += Math.pow(A / (s * xe), 2), Ee += Be * (ie / (o * pe)) * (A / (s * xe)), Math.sqrt(Ee);
      }
      var z0 = 75e-6;
      function Fa(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.space, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = r.epsilon, n = a === void 0 ? z0 : a;
        e = ge(e), t = ee.get(t);
        var i = e.coords;
        return t !== e.space && (i = t.from(e)), t.inGamut(i, {
          epsilon: n
        });
      }
      function Ta(e) {
        return {
          space: e.space,
          coords: e.coords.slice(),
          alpha: e.alpha
        };
      }
      function ir(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.method, a = r === void 0 ? Pt.gamut_mapping : r, n = t.space, i = n === void 0 ? e.space : n;
        if (Ea(arguments[1]) && (i = arguments[1]), i = ee.get(i), Fa(e, i, {
          epsilon: 0
        }))
          return e;
        var o = yt(e, i);
        if (a !== "clip" && !Fa(e, i)) {
          var u = ir(Ta(o), {
            method: "clip",
            space: i
          });
          if (Wo(e, u) > 2) {
            for (var s = ee.resolveCoord(a), l = s.space, c = s.id, d = yt(o, l), f = s.range || s.refRange, p = f[0], m = 0.01, h = p, v = bt(d, c); v - h > m; ) {
              var g = Ta(d);
              g = ir(g, {
                space: i,
                method: "clip"
              });
              var b = Wo(d, g);
              b - 2 < m ? h = bt(d, c) : v = bt(d, c), nr(d, c, (h + v) / 2);
            }
            o = yt(d, i);
          } else
            o = u;
        }
        if (a === "clip" || !Fa(o, i, {
          epsilon: 0
        })) {
          var D = Object.values(i.coords).map(function(w) {
            return w.range || [];
          });
          o.coords = o.coords.map(function(w, _) {
            var F = $(D[_], 2), R = F[0], I = F[1];
            return R !== void 0 && (w = Math.max(R, w)), I !== void 0 && (w = Math.min(w, I)), w;
          });
        }
        return i !== e.space && (o = yt(o, e.space)), e.coords = o.coords, e;
      }
      ir.returns = "color";
      function yt(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = r.inGamut;
        e = ge(e), t = ee.get(t);
        var n = t.from(e), i = {
          space: t,
          coords: n,
          alpha: e.alpha
        };
        return a && (i = ir(i)), i;
      }
      yt.returns = "color";
      function Pn(e) {
        var t, r, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = a.precision, i = n === void 0 ? Pt.precision : n, o = a.format, u = o === void 0 ? "default" : o, s = a.inGamut, l = s === void 0 ? !0 : s, c = qe(a, kp), d;
        e = ge(e);
        var f = u;
        u = (t = (r = e.space.getFormat(u)) !== null && r !== void 0 ? r : e.space.getFormat("default")) !== null && t !== void 0 ? t : ee.DEFAULT_FORMAT, l || (l = u.toGamut);
        var p = e.coords;
        if (p = p.map(function(w) {
          return w || 0;
        }), l && !Fa(e) && (p = ir(Ta(e), l === !0 ? void 0 : l).coords), u.type === "custom")
          if (c.precision = i, u.serialize)
            d = u.serialize(p, e.alpha, c);
          else
            throw new TypeError("format ".concat(f, " can only be used to parse colors, not for serialization"));
        else {
          var m = u.name || "color";
          u.serializeCoords ? p = u.serializeCoords(p, i) : i !== null && (p = p.map(function(w) {
            return Rn(w, i);
          }));
          var h = ne(p);
          if (m === "color") {
            var v, g = u.id || ((v = u.ids) === null || v === void 0 ? void 0 : v[0]) || e.space.id;
            h.unshift(g);
          }
          var b = e.alpha;
          i !== null && (b = Rn(b, i));
          var D = e.alpha < 1 && !u.noAlpha ? "".concat(u.commas ? "," : " /", " ").concat(b) : "";
          d = "".concat(m, "(").concat(h.join(u.commas ? ", " : " ")).concat(D, ")");
        }
        return d;
      }
      var V0 = [[0.6369580483012914, 0.14461690358620832, 0.1688809751641721], [0.2627002120112671, 0.6779980715188708, 0.05930171646986196], [0, 0.028072693049087428, 1.060985057710791]], H0 = [[1.716651187971268, -0.355670783776392, -0.25336628137366], [-0.666684351832489, 1.616481236634939, 0.0157685458139111], [0.017639857445311, -0.042770613257809, 0.942103121235474]], Nn = new nt({
        id: "rec2020-linear",
        name: "Linear REC.2020",
        white: "D65",
        toXYZ_M: V0,
        fromXYZ_M: H0,
        formats: {
          color: {}
        }
      }), Ln = 1.09929682680944, gd = 0.018053968510807, bd = new nt({
        id: "rec2020",
        name: "REC.2020",
        base: Nn,
        toBase: function(t) {
          return t.map(function(r) {
            return r < gd * 4.5 ? r / 4.5 : Math.pow((r + Ln - 1) / Ln, 1 / 0.45);
          });
        },
        fromBase: function(t) {
          return t.map(function(r) {
            return r >= gd ? Ln * Math.pow(r, 0.45) - (Ln - 1) : 4.5 * r;
          });
        },
        formats: {
          color: {}
        }
      }), $0 = [[0.4865709486482162, 0.26566769316909306, 0.1982172852343625], [0.2289745640697488, 0.6917385218365064, 0.079286914093745], [0, 0.04511338185890264, 1.043944368900976]], U0 = [[2.493496911941425, -0.9313836179191239, -0.40271078445071684], [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577], [0.03584583024378447, -0.07617238926804182, 0.9568845240076872]], yd = new nt({
        id: "p3-linear",
        name: "Linear P3",
        white: "D65",
        toXYZ_M: $0,
        fromXYZ_M: U0
      }), G0 = [[0.41239079926595934, 0.357584339383878, 0.1804807884018343], [0.21263900587151027, 0.715168678767756, 0.07219231536073371], [0.01933081871559182, 0.11919477979462598, 0.9505321522496607]], W0 = [[3.2409699419045226, -1.537383177570094, -0.4986107602930034], [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559], [0.05563007969699366, -0.20397695888897652, 1.0569715142428786]], wd = new nt({
        id: "srgb-linear",
        name: "Linear sRGB",
        white: "D65",
        toXYZ_M: G0,
        fromXYZ_M: W0,
        formats: {
          color: {}
        }
      }), Dd = {
        aliceblue: [240 / 255, 248 / 255, 1],
        antiquewhite: [250 / 255, 235 / 255, 215 / 255],
        aqua: [0, 1, 1],
        aquamarine: [127 / 255, 1, 212 / 255],
        azure: [240 / 255, 1, 1],
        beige: [245 / 255, 245 / 255, 220 / 255],
        bisque: [1, 228 / 255, 196 / 255],
        black: [0, 0, 0],
        blanchedalmond: [1, 235 / 255, 205 / 255],
        blue: [0, 0, 1],
        blueviolet: [138 / 255, 43 / 255, 226 / 255],
        brown: [165 / 255, 42 / 255, 42 / 255],
        burlywood: [222 / 255, 184 / 255, 135 / 255],
        cadetblue: [95 / 255, 158 / 255, 160 / 255],
        chartreuse: [127 / 255, 1, 0],
        chocolate: [210 / 255, 105 / 255, 30 / 255],
        coral: [1, 127 / 255, 80 / 255],
        cornflowerblue: [100 / 255, 149 / 255, 237 / 255],
        cornsilk: [1, 248 / 255, 220 / 255],
        crimson: [220 / 255, 20 / 255, 60 / 255],
        cyan: [0, 1, 1],
        darkblue: [0, 0, 139 / 255],
        darkcyan: [0, 139 / 255, 139 / 255],
        darkgoldenrod: [184 / 255, 134 / 255, 11 / 255],
        darkgray: [169 / 255, 169 / 255, 169 / 255],
        darkgreen: [0, 100 / 255, 0],
        darkgrey: [169 / 255, 169 / 255, 169 / 255],
        darkkhaki: [189 / 255, 183 / 255, 107 / 255],
        darkmagenta: [139 / 255, 0, 139 / 255],
        darkolivegreen: [85 / 255, 107 / 255, 47 / 255],
        darkorange: [1, 140 / 255, 0],
        darkorchid: [153 / 255, 50 / 255, 204 / 255],
        darkred: [139 / 255, 0, 0],
        darksalmon: [233 / 255, 150 / 255, 122 / 255],
        darkseagreen: [143 / 255, 188 / 255, 143 / 255],
        darkslateblue: [72 / 255, 61 / 255, 139 / 255],
        darkslategray: [47 / 255, 79 / 255, 79 / 255],
        darkslategrey: [47 / 255, 79 / 255, 79 / 255],
        darkturquoise: [0, 206 / 255, 209 / 255],
        darkviolet: [148 / 255, 0, 211 / 255],
        deeppink: [1, 20 / 255, 147 / 255],
        deepskyblue: [0, 191 / 255, 1],
        dimgray: [105 / 255, 105 / 255, 105 / 255],
        dimgrey: [105 / 255, 105 / 255, 105 / 255],
        dodgerblue: [30 / 255, 144 / 255, 1],
        firebrick: [178 / 255, 34 / 255, 34 / 255],
        floralwhite: [1, 250 / 255, 240 / 255],
        forestgreen: [34 / 255, 139 / 255, 34 / 255],
        fuchsia: [1, 0, 1],
        gainsboro: [220 / 255, 220 / 255, 220 / 255],
        ghostwhite: [248 / 255, 248 / 255, 1],
        gold: [1, 215 / 255, 0],
        goldenrod: [218 / 255, 165 / 255, 32 / 255],
        gray: [128 / 255, 128 / 255, 128 / 255],
        green: [0, 128 / 255, 0],
        greenyellow: [173 / 255, 1, 47 / 255],
        grey: [128 / 255, 128 / 255, 128 / 255],
        honeydew: [240 / 255, 1, 240 / 255],
        hotpink: [1, 105 / 255, 180 / 255],
        indianred: [205 / 255, 92 / 255, 92 / 255],
        indigo: [75 / 255, 0, 130 / 255],
        ivory: [1, 1, 240 / 255],
        khaki: [240 / 255, 230 / 255, 140 / 255],
        lavender: [230 / 255, 230 / 255, 250 / 255],
        lavenderblush: [1, 240 / 255, 245 / 255],
        lawngreen: [124 / 255, 252 / 255, 0],
        lemonchiffon: [1, 250 / 255, 205 / 255],
        lightblue: [173 / 255, 216 / 255, 230 / 255],
        lightcoral: [240 / 255, 128 / 255, 128 / 255],
        lightcyan: [224 / 255, 1, 1],
        lightgoldenrodyellow: [250 / 255, 250 / 255, 210 / 255],
        lightgray: [211 / 255, 211 / 255, 211 / 255],
        lightgreen: [144 / 255, 238 / 255, 144 / 255],
        lightgrey: [211 / 255, 211 / 255, 211 / 255],
        lightpink: [1, 182 / 255, 193 / 255],
        lightsalmon: [1, 160 / 255, 122 / 255],
        lightseagreen: [32 / 255, 178 / 255, 170 / 255],
        lightskyblue: [135 / 255, 206 / 255, 250 / 255],
        lightslategray: [119 / 255, 136 / 255, 153 / 255],
        lightslategrey: [119 / 255, 136 / 255, 153 / 255],
        lightsteelblue: [176 / 255, 196 / 255, 222 / 255],
        lightyellow: [1, 1, 224 / 255],
        lime: [0, 1, 0],
        limegreen: [50 / 255, 205 / 255, 50 / 255],
        linen: [250 / 255, 240 / 255, 230 / 255],
        magenta: [1, 0, 1],
        maroon: [128 / 255, 0, 0],
        mediumaquamarine: [102 / 255, 205 / 255, 170 / 255],
        mediumblue: [0, 0, 205 / 255],
        mediumorchid: [186 / 255, 85 / 255, 211 / 255],
        mediumpurple: [147 / 255, 112 / 255, 219 / 255],
        mediumseagreen: [60 / 255, 179 / 255, 113 / 255],
        mediumslateblue: [123 / 255, 104 / 255, 238 / 255],
        mediumspringgreen: [0, 250 / 255, 154 / 255],
        mediumturquoise: [72 / 255, 209 / 255, 204 / 255],
        mediumvioletred: [199 / 255, 21 / 255, 133 / 255],
        midnightblue: [25 / 255, 25 / 255, 112 / 255],
        mintcream: [245 / 255, 1, 250 / 255],
        mistyrose: [1, 228 / 255, 225 / 255],
        moccasin: [1, 228 / 255, 181 / 255],
        navajowhite: [1, 222 / 255, 173 / 255],
        navy: [0, 0, 128 / 255],
        oldlace: [253 / 255, 245 / 255, 230 / 255],
        olive: [128 / 255, 128 / 255, 0],
        olivedrab: [107 / 255, 142 / 255, 35 / 255],
        orange: [1, 165 / 255, 0],
        orangered: [1, 69 / 255, 0],
        orchid: [218 / 255, 112 / 255, 214 / 255],
        palegoldenrod: [238 / 255, 232 / 255, 170 / 255],
        palegreen: [152 / 255, 251 / 255, 152 / 255],
        paleturquoise: [175 / 255, 238 / 255, 238 / 255],
        palevioletred: [219 / 255, 112 / 255, 147 / 255],
        papayawhip: [1, 239 / 255, 213 / 255],
        peachpuff: [1, 218 / 255, 185 / 255],
        peru: [205 / 255, 133 / 255, 63 / 255],
        pink: [1, 192 / 255, 203 / 255],
        plum: [221 / 255, 160 / 255, 221 / 255],
        powderblue: [176 / 255, 224 / 255, 230 / 255],
        purple: [128 / 255, 0, 128 / 255],
        rebeccapurple: [102 / 255, 51 / 255, 153 / 255],
        red: [1, 0, 0],
        rosybrown: [188 / 255, 143 / 255, 143 / 255],
        royalblue: [65 / 255, 105 / 255, 225 / 255],
        saddlebrown: [139 / 255, 69 / 255, 19 / 255],
        salmon: [250 / 255, 128 / 255, 114 / 255],
        sandybrown: [244 / 255, 164 / 255, 96 / 255],
        seagreen: [46 / 255, 139 / 255, 87 / 255],
        seashell: [1, 245 / 255, 238 / 255],
        sienna: [160 / 255, 82 / 255, 45 / 255],
        silver: [192 / 255, 192 / 255, 192 / 255],
        skyblue: [135 / 255, 206 / 255, 235 / 255],
        slateblue: [106 / 255, 90 / 255, 205 / 255],
        slategray: [112 / 255, 128 / 255, 144 / 255],
        slategrey: [112 / 255, 128 / 255, 144 / 255],
        snow: [1, 250 / 255, 250 / 255],
        springgreen: [0, 1, 127 / 255],
        steelblue: [70 / 255, 130 / 255, 180 / 255],
        tan: [210 / 255, 180 / 255, 140 / 255],
        teal: [0, 128 / 255, 128 / 255],
        thistle: [216 / 255, 191 / 255, 216 / 255],
        tomato: [1, 99 / 255, 71 / 255],
        turquoise: [64 / 255, 224 / 255, 208 / 255],
        violet: [238 / 255, 130 / 255, 238 / 255],
        wheat: [245 / 255, 222 / 255, 179 / 255],
        white: [1, 1, 1],
        whitesmoke: [245 / 255, 245 / 255, 245 / 255],
        yellow: [1, 1, 0],
        yellowgreen: [154 / 255, 205 / 255, 50 / 255]
      }, _d = Array(3).fill("<percentage> | <number>[0, 255]"), xd = Array(3).fill("<number>[0, 255]"), Ra = new nt({
        id: "srgb",
        name: "sRGB",
        base: wd,
        fromBase: function(t) {
          return t.map(function(r) {
            var a = r < 0 ? -1 : 1, n = r * a;
            return n > 31308e-7 ? a * (1.055 * Math.pow(n, 1 / 2.4) - 0.055) : 12.92 * r;
          });
        },
        toBase: function(t) {
          return t.map(function(r) {
            var a = r < 0 ? -1 : 1, n = r * a;
            return n < 0.04045 ? r / 12.92 : a * Math.pow((n + 0.055) / 1.055, 2.4);
          });
        },
        formats: {
          rgb: {
            coords: _d
          },
          rgb_number: {
            name: "rgb",
            commas: !0,
            coords: xd,
            noAlpha: !0
          },
          color: {},
          rgba: {
            coords: _d,
            commas: !0,
            lastAlpha: !0
          },
          rgba_number: {
            name: "rgba",
            commas: !0,
            coords: xd
          },
          hex: {
            type: "custom",
            toGamut: !0,
            test: function(t) {
              return /^#([a-f0-9]{3,4}){1,2}$/i.test(t);
            },
            parse: function(t) {
              t.length <= 5 && (t = t.replace(/[a-f0-9]/gi, "$&$&"));
              var r = [];
              return t.replace(/[a-f0-9]{2}/gi, function(a) {
                r.push(parseInt(a, 16) / 255);
              }), {
                spaceId: "srgb",
                coords: r.slice(0, 3),
                alpha: r.slice(3)[0]
              };
            },
            serialize: function(t, r) {
              var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = a.collapse, i = n === void 0 ? !0 : n;
              r < 1 && t.push(r), t = t.map(function(s) {
                return Math.round(s * 255);
              });
              var o = i && t.every(function(s) {
                return s % 17 === 0;
              }), u = t.map(function(s) {
                return o ? (s / 17).toString(16) : s.toString(16).padStart(2, "0");
              }).join("");
              return "#" + u;
            }
          },
          keyword: {
            type: "custom",
            test: function(t) {
              return /^[a-z]+$/i.test(t);
            },
            parse: function(t) {
              t = t.toLowerCase();
              var r = {
                spaceId: "srgb",
                coords: null,
                alpha: 1
              };
              if (t === "transparent" ? (r.coords = Dd.black, r.alpha = 0) : r.coords = Dd[t], r.coords)
                return r;
            }
          }
        }
      }), Ed = new nt({
        id: "p3",
        name: "P3",
        base: yd,
        fromBase: Ra.fromBase,
        toBase: Ra.toBase,
        formats: {
          color: {
            id: "display-p3"
          }
        }
      });
      if (Pt.display_space = Ra, typeof CSS < "u" && (j = CSS) !== null && j !== void 0 && j.supports)
        for (var Yo = 0, Ad = [ct, bd, Ed]; Yo < Ad.length; Yo++) {
          var Ko = Ad[Yo], Y0 = Ko.getMinCoords(), K0 = {
            space: Ko,
            coords: Y0,
            alpha: 1
          }, X0 = Pn(K0);
          if (CSS.supports("color", X0)) {
            Pt.display_space = Ko;
            break;
          }
        }
      function Z0(e) {
        var t, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = r.space, n = a === void 0 ? Pt.display_space : a, i = qe(r, Op), o = Pn(e, i);
        if (typeof CSS > "u" || (t = CSS) !== null && t !== void 0 && t.supports("color", o) || !Pt.display_space)
          o = new String(o), o.color = e;
        else {
          var u = yt(e, n);
          o = new String(Pn(u, i)), o.color = u;
        }
        return o;
      }
      function Cd(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "lab";
        r = ee.get(r);
        var a = r.from(e), n = r.from(t);
        return Math.sqrt(a.reduce(function(i, o, u) {
          var s = n[u];
          return isNaN(o) || isNaN(s) ? i : i + Math.pow(s - o, 2);
        }, 0));
      }
      function J0(e, t) {
        return e = ge(e), t = ge(t), e.space === t.space && e.alpha === t.alpha && e.coords.every(function(r, a) {
          return r === t.coords[a];
        });
      }
      function or(e) {
        return bt(e, [gt, "y"]);
      }
      function Fd(e, t) {
        nr(e, [gt, "y"], t);
      }
      function Q0(e) {
        Object.defineProperty(e.prototype, "luminance", {
          get: function() {
            return or(this);
          },
          set: function(r) {
            Fd(this, r);
          }
        });
      }
      var e2 = Object.freeze({
        __proto__: null,
        getLuminance: or,
        setLuminance: Fd,
        register: Q0
      });
      function t2(e, t) {
        e = ge(e), t = ge(t);
        var r = Math.max(or(e), 0), a = Math.max(or(t), 0);
        if (a > r) {
          var n = [a, r];
          r = n[0], a = n[1];
        }
        return (r + 0.05) / (a + 0.05);
      }
      var r2 = 0.56, a2 = 0.57, n2 = 0.62, i2 = 0.65, Td = 0.022, o2 = 1.414, u2 = 0.1, s2 = 5e-4, l2 = 1.14, Rd = 0.027, c2 = 1.14;
      function Sd(e) {
        return e >= Td ? e : e + Math.pow(Td - e, o2);
      }
      function Hr(e) {
        var t = e < 0 ? -1 : 1, r = Math.abs(e);
        return t * Math.pow(r, 2.4);
      }
      function d2(e, t) {
        t = ge(t), e = ge(e);
        var r, a, n, i, o, u;
        t = yt(t, "srgb");
        var s = $(t.coords, 3);
        i = s[0], o = s[1], u = s[2];
        var l = Hr(i) * 0.2126729 + Hr(o) * 0.7151522 + Hr(u) * 0.072175;
        e = yt(e, "srgb");
        var c = $(e.coords, 3);
        i = c[0], o = c[1], u = c[2];
        var d = Hr(i) * 0.2126729 + Hr(o) * 0.7151522 + Hr(u) * 0.072175, f = Sd(l), p = Sd(d), m = p > f;
        return Math.abs(p - f) < s2 ? a = 0 : m ? (r = Math.pow(p, r2) - Math.pow(f, a2), a = r * l2) : (r = Math.pow(p, i2) - Math.pow(f, n2), a = r * c2), Math.abs(a) < u2 ? n = 0 : a > 0 ? n = a - Rd : n = a + Rd, n * 100;
      }
      function f2(e, t) {
        e = ge(e), t = ge(t);
        var r = Math.max(or(e), 0), a = Math.max(or(t), 0);
        if (a > r) {
          var n = [a, r];
          r = n[0], a = n[1];
        }
        var i = r + a;
        return i === 0 ? 0 : (r - a) / i;
      }
      var p2 = 5e4;
      function m2(e, t) {
        e = ge(e), t = ge(t);
        var r = Math.max(or(e), 0), a = Math.max(or(t), 0);
        if (a > r) {
          var n = [a, r];
          r = n[0], a = n[1];
        }
        return a === 0 ? p2 : (r - a) / a;
      }
      function h2(e, t) {
        e = ge(e), t = ge(t);
        var r = bt(e, [ct, "l"]), a = bt(t, [ct, "l"]);
        return Math.abs(r - a);
      }
      var v2 = 216 / 24389, kd = 24 / 116, Bn = 24389 / 27, Xo = Ct.D65, Zo = new ee({
        id: "lab-d65",
        name: "Lab D65",
        coords: {
          l: {
            refRange: [0, 100],
            name: "L"
          },
          a: {
            refRange: [-125, 125]
          },
          b: {
            refRange: [-125, 125]
          }
        },
        white: Xo,
        base: gt,
        fromBase: function(t) {
          var r = t.map(function(n, i) {
            return n / Xo[i];
          }), a = r.map(function(n) {
            return n > v2 ? Math.cbrt(n) : (Bn * n + 16) / 116;
          });
          return [116 * a[1] - 16, 500 * (a[0] - a[1]), 200 * (a[1] - a[2])];
        },
        toBase: function(t) {
          var r = [];
          r[1] = (t[0] + 16) / 116, r[0] = t[1] / 500 + r[1], r[2] = r[1] - t[2] / 200;
          var a = [r[0] > kd ? Math.pow(r[0], 3) : (116 * r[0] - 16) / Bn, t[0] > 8 ? Math.pow((t[0] + 16) / 116, 3) : t[0] / Bn, r[2] > kd ? Math.pow(r[2], 3) : (116 * r[2] - 16) / Bn];
          return a.map(function(n, i) {
            return n * Xo[i];
          });
        },
        formats: {
          "lab-d65": {
            coords: ["<number> | <percentage>", "<number>", "<number>"]
          }
        }
      }), Jo = Math.pow(5, 0.5) * 0.5 + 0.5;
      function g2(e, t) {
        e = ge(e), t = ge(t);
        var r = bt(e, [Zo, "l"]), a = bt(t, [Zo, "l"]), n = Math.abs(Math.pow(r, Jo) - Math.pow(a, Jo)), i = Math.pow(n, 1 / Jo) * Math.SQRT2 - 40;
        return i < 7.5 ? 0 : i;
      }
      var qn = Object.freeze({
        __proto__: null,
        contrastWCAG21: t2,
        contrastAPCA: d2,
        contrastMichelson: f2,
        contrastWeber: m2,
        contrastLstar: h2,
        contrastDeltaPhi: g2
      });
      function b2(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        Ea(r) && (r = {
          algorithm: r
        });
        var a = r, n = a.algorithm, i = qe(a, Mp);
        if (!n) {
          var o = Object.keys(qn).map(function(s) {
            return s.replace(/^contrast/, "");
          }).join(", ");
          throw new TypeError("contrast() function needs a contrast algorithm. Please specify one of: ".concat(o));
        }
        e = ge(e), t = ge(t);
        for (var u in qn)
          if ("contrast" + n.toLowerCase() === u.toLowerCase())
            return qn[u](e, t, i);
        throw new TypeError("Unknown contrast algorithm: ".concat(n));
      }
      function Od(e) {
        var t = Aa(e, gt), r = $(t, 3), a = r[0], n = r[1], i = r[2], o = a + 15 * n + 3 * i;
        return [4 * a / o, 9 * n / o];
      }
      function Md(e) {
        var t = Aa(e, gt), r = $(t, 3), a = r[0], n = r[1], i = r[2], o = a + n + i;
        return [a / o, n / o];
      }
      function y2(e) {
        Object.defineProperty(e.prototype, "uv", {
          get: function() {
            return Od(this);
          }
        }), Object.defineProperty(e.prototype, "xy", {
          get: function() {
            return Md(this);
          }
        });
      }
      var w2 = Object.freeze({
        __proto__: null,
        uv: Od,
        xy: Md,
        register: y2
      });
      function D2(e, t) {
        return Cd(e, t, "lab");
      }
      var _2 = Math.PI, Id = _2 / 180;
      function x2(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = r.l, n = a === void 0 ? 2 : a, i = r.c, o = i === void 0 ? 1 : i, u = ct.from(e), s = $(u, 3), l = s[0], c = s[1], d = s[2], f = Ca.from(ct, [l, c, d]), p = $(f, 3), m = p[1], h = p[2], v = ct.from(t), g = $(v, 3), b = g[0], D = g[1], w = g[2], _ = Ca.from(ct, [b, D, w])[1];
        m < 0 && (m = 0), _ < 0 && (_ = 0);
        var F = l - b, R = m - _, I = c - D, V = d - w, S = Math.pow(I, 2) + Math.pow(V, 2) - Math.pow(R, 2), N = 0.511;
        l >= 16 && (N = 0.040975 * l / (1 + 0.01765 * l));
        var z = 0.0638 * m / (1 + 0.0131 * m) + 0.638, H;
        Number.isNaN(h) && (h = 0), h >= 164 && h <= 345 ? H = 0.56 + Math.abs(0.2 * Math.cos((h + 168) * Id)) : H = 0.36 + Math.abs(0.4 * Math.cos((h + 35) * Id));
        var Q = Math.pow(m, 4), ie = Math.sqrt(Q / (Q + 1900)), Y = z * (ie * H + 1 - ie), te = Math.pow(F / (n * N), 2);
        return te += Math.pow(R / (o * z), 2), te += S / Math.pow(Y, 2), Math.sqrt(te);
      }
      var Pd = 203, Qo = new ee({
        id: "xyz-abs-d65",
        name: "Absolute XYZ D65",
        coords: {
          x: {
            refRange: [0, 9504.7],
            name: "Xa"
          },
          y: {
            refRange: [0, 1e4],
            name: "Ya"
          },
          z: {
            refRange: [0, 10888.3],
            name: "Za"
          }
        },
        base: gt,
        fromBase: function(t) {
          return t.map(function(r) {
            return Math.max(r * Pd, 0);
          });
        },
        toBase: function(t) {
          return t.map(function(r) {
            return Math.max(r / Pd, 0);
          });
        }
      }), jn = 1.15, zn = 0.66, Nd = 2610 / Math.pow(2, 14), E2 = Math.pow(2, 14) / 2610, Ld = 3424 / Math.pow(2, 12), Bd = 2413 / Math.pow(2, 7), qd = 2392 / Math.pow(2, 7), A2 = 1.7 * 2523 / Math.pow(2, 5), jd = Math.pow(2, 5) / (1.7 * 2523), Vn = -0.56, eu = 16295499532821565e-27, C2 = [[0.41478972, 0.579999, 0.014648], [-0.20151, 1.120649, 0.0531008], [-0.0166008, 0.2648, 0.6684799]], F2 = [[1.9242264357876067, -1.0047923125953657, 0.037651404030618], [0.35031676209499907, 0.7264811939316552, -0.06538442294808501], [-0.09098281098284752, -0.3127282905230739, 1.5227665613052603]], T2 = [[0.5, 0.5, 0], [3.524, -4.066708, 0.542708], [0.199076, 1.096799, -1.295875]], R2 = [[1, 0.1386050432715393, 0.05804731615611886], [0.9999999999999999, -0.1386050432715393, -0.05804731615611886], [0.9999999999999998, -0.09601924202631895, -0.8118918960560388]], zd = new ee({
        id: "jzazbz",
        name: "Jzazbz",
        coords: {
          jz: {
            refRange: [0, 1],
            name: "Jz"
          },
          az: {
            refRange: [-0.5, 0.5]
          },
          bz: {
            refRange: [-0.5, 0.5]
          }
        },
        base: Qo,
        fromBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2], o = jn * a - (jn - 1) * i, u = zn * n - (zn - 1) * a, s = Le(C2, [o, u, i]), l = s.map(function(v) {
            var g = Ld + Bd * Math.pow(v / 1e4, Nd), b = 1 + qd * Math.pow(v / 1e4, Nd);
            return Math.pow(g / b, A2);
          }), c = Le(T2, l), d = $(c, 3), f = d[0], p = d[1], m = d[2], h = (1 + Vn) * f / (1 + Vn * f) - eu;
          return [h, p, m];
        },
        toBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2], o = (a + eu) / (1 + Vn - Vn * (a + eu)), u = Le(R2, [o, n, i]), s = u.map(function(v) {
            var g = Ld - Math.pow(v, jd), b = qd * Math.pow(v, jd) - Bd, D = 1e4 * Math.pow(g / b, E2);
            return D;
          }), l = Le(F2, s), c = $(l, 3), d = c[0], f = c[1], p = c[2], m = (d + (jn - 1) * p) / jn, h = (f + (zn - 1) * m) / zn;
          return [m, h, p];
        },
        formats: {
          color: {}
        }
      }), tu = new ee({
        id: "jzczhz",
        name: "JzCzHz",
        coords: {
          jz: {
            refRange: [0, 1],
            name: "Jz"
          },
          cz: {
            refRange: [0, 1],
            name: "Chroma"
          },
          hz: {
            refRange: [0, 360],
            type: "angle",
            name: "Hue"
          }
        },
        base: zd,
        fromBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2], o, u = 2e-4;
          return Math.abs(n) < u && Math.abs(i) < u ? o = NaN : o = Math.atan2(i, n) * 180 / Math.PI, [a, Math.sqrt(Math.pow(n, 2) + Math.pow(i, 2)), Mn(o)];
        },
        toBase: function(t) {
          return [t[0], t[1] * Math.cos(t[2] * Math.PI / 180), t[1] * Math.sin(t[2] * Math.PI / 180)];
        },
        formats: {
          color: {}
        }
      });
      function S2(e, t) {
        var r = tu.from(e), a = $(r, 3), n = a[0], i = a[1], o = a[2], u = tu.from(t), s = $(u, 3), l = s[0], c = s[1], d = s[2], f = n - l, p = i - c;
        Number.isNaN(o) && Number.isNaN(d) ? (o = 0, d = 0) : Number.isNaN(o) ? o = d : Number.isNaN(d) && (d = o);
        var m = o - d, h = 2 * Math.sqrt(i * c) * Math.sin(m / 2 * (Math.PI / 180));
        return Math.sqrt(Math.pow(f, 2) + Math.pow(p, 2) + Math.pow(h, 2));
      }
      var Vd = 3424 / 4096, Hd = 2413 / 128, $d = 2392 / 128, Ud = 2610 / 16384, k2 = 2523 / 32, O2 = 16384 / 2610, Gd = 32 / 2523, M2 = [[0.3592, 0.6976, -0.0358], [-0.1922, 1.1004, 0.0755], [7e-3, 0.0749, 0.8434]], I2 = [[2048 / 4096, 2048 / 4096, 0], [6610 / 4096, -13613 / 4096, 7003 / 4096], [17933 / 4096, -17390 / 4096, -543 / 4096]], P2 = [[0.9999888965628402, 0.008605050147287059, 0.11103437159861648], [1.00001110343716, -0.008605050147287059, -0.11103437159861648], [1.0000320633910054, 0.56004913547279, -0.3206339100541203]], N2 = [[2.0701800566956137, -1.326456876103021, 0.20661600684785517], [0.3649882500326575, 0.6804673628522352, -0.04542175307585323], [-0.04959554223893211, -0.04942116118675749, 1.1879959417328034]], ru = new ee({
        id: "ictcp",
        name: "ICTCP",
        coords: {
          i: {
            refRange: [0, 1],
            name: "I"
          },
          ct: {
            refRange: [-0.5, 0.5],
            name: "CT"
          },
          cp: {
            refRange: [-0.5, 0.5],
            name: "CP"
          }
        },
        base: Qo,
        fromBase: function(t) {
          var r = Le(M2, t);
          return L2(r);
        },
        toBase: function(t) {
          var r = B2(t);
          return Le(N2, r);
        },
        formats: {
          color: {}
        }
      });
      function L2(e) {
        var t = e.map(function(r) {
          var a = Vd + Hd * Math.pow(r / 1e4, Ud), n = 1 + $d * Math.pow(r / 1e4, Ud);
          return Math.pow(a / n, k2);
        });
        return Le(I2, t);
      }
      function B2(e) {
        var t = Le(P2, e), r = t.map(function(a) {
          var n = Math.max(Math.pow(a, Gd) - Vd, 0), i = Hd - $d * Math.pow(a, Gd);
          return 1e4 * Math.pow(n / i, O2);
        });
        return r;
      }
      function q2(e, t) {
        var r = ru.from(e), a = $(r, 3), n = a[0], i = a[1], o = a[2], u = ru.from(t), s = $(u, 3), l = s[0], c = s[1], d = s[2];
        return 720 * Math.sqrt(Math.pow(n - l, 2) + 0.25 * Math.pow(i - c, 2) + Math.pow(o - d, 2));
      }
      var j2 = [[0.8190224432164319, 0.3619062562801221, -0.12887378261216414], [0.0329836671980271, 0.9292868468965546, 0.03614466816999844], [0.048177199566046255, 0.26423952494422764, 0.6335478258136937]], z2 = [[1.2268798733741557, -0.5578149965554813, 0.28139105017721583], [-0.04057576262431372, 1.1122868293970594, -0.07171106666151701], [-0.07637294974672142, -0.4214933239627914, 1.5869240244272418]], V2 = [[0.2104542553, 0.793617785, -0.0040720468], [1.9779984951, -2.428592205, 0.4505937099], [0.0259040371, 0.7827717662, -0.808675766]], H2 = [[0.9999999984505198, 0.39633779217376786, 0.2158037580607588], [1.0000000088817609, -0.10556134232365635, -0.06385417477170591], [1.0000000546724108, -0.08948418209496575, -1.2914855378640917]], Hn = new ee({
        id: "oklab",
        name: "OKLab",
        coords: {
          l: {
            refRange: [0, 1],
            name: "L"
          },
          a: {
            refRange: [-0.4, 0.4]
          },
          b: {
            refRange: [-0.4, 0.4]
          }
        },
        white: "D65",
        base: gt,
        fromBase: function(t) {
          var r = Le(j2, t), a = r.map(function(n) {
            return Math.cbrt(n);
          });
          return Le(V2, a);
        },
        toBase: function(t) {
          var r = Le(H2, t), a = r.map(function(n) {
            return Math.pow(n, 3);
          });
          return Le(z2, a);
        },
        formats: {
          oklab: {
            coords: ["<number> | <percentage>", "<number>", "<number>"]
          }
        }
      });
      function $2(e, t) {
        var r = Hn.from(e), a = $(r, 3), n = a[0], i = a[1], o = a[2], u = Hn.from(t), s = $(u, 3), l = s[0], c = s[1], d = s[2], f = n - l, p = i - c, m = o - d;
        return Math.sqrt(Math.pow(f, 2) + Math.pow(p, 2) + Math.pow(m, 2));
      }
      var au = Object.freeze({
        __proto__: null,
        deltaE76: D2,
        deltaECMC: x2,
        deltaE2000: Wo,
        deltaEJz: S2,
        deltaEITP: q2,
        deltaEOK: $2
      });
      function Sa(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        Ea(r) && (r = {
          method: r
        });
        var a = r, n = a.method, i = n === void 0 ? Pt.deltaE : n, o = qe(a, Ip);
        e = ge(e), t = ge(t);
        for (var u in au)
          if ("deltae" + i.toLowerCase() === u.toLowerCase())
            return au[u](e, t, o);
        throw new TypeError("Unknown deltaE method: ".concat(i));
      }
      function U2(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.25, r = ee.get("oklch", "lch"), a = [r, "l"];
        return nr(e, a, function(n) {
          return n * (1 + t);
        });
      }
      function G2(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.25, r = ee.get("oklch", "lch"), a = [r, "l"];
        return nr(e, a, function(n) {
          return n * (1 - t);
        });
      }
      var W2 = Object.freeze({
        __proto__: null,
        lighten: U2,
        darken: G2
      });
      function Wd(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.5, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = [ge(e), ge(t)];
        if (e = n[0], t = n[1], rr(r) === "object") {
          var i = [0.5, r];
          r = i[0], a = i[1];
        }
        var o = a, u = o.space, s = o.outputSpace, l = o.premultiplied, c = ka(e, t, {
          space: u,
          outputSpace: s,
          premultiplied: l
        });
        return c(r);
      }
      function Yd(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a;
        if (nu(e)) {
          a = e, r = t;
          var n = $(a.rangeArgs.colors, 2);
          e = n[0], t = n[1];
        }
        var i = r, o = i.maxDeltaE, u = i.deltaEMethod, s = i.steps, l = s === void 0 ? 2 : s, c = i.maxSteps, d = c === void 0 ? 1e3 : c, f = qe(i, Pp);
        if (!a) {
          var p = [ge(e), ge(t)];
          e = p[0], t = p[1], a = ka(e, t, f);
        }
        var m = Sa(e, t), h = o > 0 ? Math.max(l, Math.ceil(m / o) + 1) : l, v = [];
        if (d !== void 0 && (h = Math.min(h, d)), h === 1)
          v = [{
            p: 0.5,
            color: a(0.5)
          }];
        else {
          var g = 1 / (h - 1);
          v = Array.from({
            length: h
          }, function(I, V) {
            var S = V * g;
            return {
              p: S,
              color: a(S)
            };
          });
        }
        if (o > 0)
          for (var b = v.reduce(function(I, V, S) {
            if (S === 0)
              return 0;
            var N = Sa(V.color, v[S - 1].color, u);
            return Math.max(I, N);
          }, 0); b > o; ) {
            b = 0;
            for (var D = 1; D < v.length && v.length < d; D++) {
              var w = v[D - 1], _ = v[D], F = (_.p + w.p) / 2, R = a(F);
              b = Math.max(b, Sa(R, w.color), Sa(R, _.color)), v.splice(D, 0, {
                p: F,
                color: a(F)
              }), D++;
            }
          }
        return v = v.map(function(I) {
          return I.color;
        }), v;
      }
      function ka(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (nu(e)) {
          var a = e, n = t;
          return ka.apply(void 0, ne(a.rangeArgs.colors).concat([de({}, a.rangeArgs.options, n)]));
        }
        var i = r.space, o = r.outputSpace, u = r.progression, s = r.premultiplied;
        e = ge(e), t = ge(t), e = Ta(e), t = Ta(t);
        var l = {
          colors: [e, t],
          options: r
        };
        if (i ? i = ee.get(i) : i = ee.registry[Pt.interpolationSpace] || e.space, o = o ? ee.get(o) : i, e = yt(e, i), t = yt(t, i), e = ir(e), t = ir(t), i.coords.h && i.coords.h.type === "angle") {
          var c = r.hue = r.hue || "shorter", d = [i, "h"], f = [bt(e, d), bt(t, d)], p = f[0], m = f[1], h = j0(c, [p, m]), v = $(h, 2);
          p = v[0], m = v[1], nr(e, d, p), nr(t, d, m);
        }
        return s && (e.coords = e.coords.map(function(g) {
          return g * e.alpha;
        }), t.coords = t.coords.map(function(g) {
          return g * t.alpha;
        })), Object.assign(function(g) {
          g = u ? u(g) : g;
          var b = e.coords.map(function(_, F) {
            var R = t.coords[F];
            return Sn(_, R, g);
          }), D = Sn(e.alpha, t.alpha, g), w = {
            space: i,
            coords: b,
            alpha: D
          };
          return s && (w.coords = w.coords.map(function(_) {
            return _ / D;
          })), o !== i && (w = yt(w, o)), w;
        }, {
          rangeArgs: l
        });
      }
      function nu(e) {
        return rr(e) === "function" && !!e.rangeArgs;
      }
      Pt.interpolationSpace = "lab";
      function Y2(e) {
        e.defineFunction("mix", Wd, {
          returns: "color"
        }), e.defineFunction("range", ka, {
          returns: "function<color>"
        }), e.defineFunction("steps", Yd, {
          returns: "array<color>"
        });
      }
      var K2 = Object.freeze({
        __proto__: null,
        mix: Wd,
        steps: Yd,
        range: ka,
        isRange: nu,
        register: Y2
      }), Kd = new ee({
        id: "hsl",
        name: "HSL",
        coords: {
          h: {
            refRange: [0, 360],
            type: "angle",
            name: "Hue"
          },
          s: {
            range: [0, 100],
            name: "Saturation"
          },
          l: {
            range: [0, 100],
            name: "Lightness"
          }
        },
        base: Ra,
        fromBase: function(t) {
          var r = Math.max.apply(Math, ne(t)), a = Math.min.apply(Math, ne(t)), n = $(t, 3), i = n[0], o = n[1], u = n[2], s = NaN, l = 0, c = (a + r) / 2, d = r - a;
          if (d !== 0) {
            switch (l = c === 0 || c === 1 ? 0 : (r - c) / Math.min(c, 1 - c), r) {
              case i:
                s = (o - u) / d + (o < u ? 6 : 0);
                break;
              case o:
                s = (u - i) / d + 2;
                break;
              case u:
                s = (i - o) / d + 4;
            }
            s = s * 60;
          }
          return [s, l * 100, c * 100];
        },
        toBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2];
          a = a % 360, a < 0 && (a += 360), n /= 100, i /= 100;
          function o(u) {
            var s = (u + a / 30) % 12, l = n * Math.min(i, 1 - i);
            return i - l * Math.max(-1, Math.min(s - 3, 9 - s, 1));
          }
          return [o(0), o(8), o(4)];
        },
        formats: {
          hsl: {
            toGamut: !0,
            coords: ["<number> | <angle>", "<percentage>", "<percentage>"]
          },
          hsla: {
            coords: ["<number> | <angle>", "<percentage>", "<percentage>"],
            commas: !0,
            lastAlpha: !0
          }
        }
      }), Xd = new ee({
        id: "hsv",
        name: "HSV",
        coords: {
          h: {
            refRange: [0, 360],
            type: "angle",
            name: "Hue"
          },
          s: {
            range: [0, 100],
            name: "Saturation"
          },
          v: {
            range: [0, 100],
            name: "Value"
          }
        },
        base: Kd,
        fromBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2];
          n /= 100, i /= 100;
          var o = i + n * Math.min(i, 1 - i);
          return [a, o === 0 ? 0 : 200 * (1 - i / o), 100 * o];
        },
        toBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2];
          n /= 100, i /= 100;
          var o = i * (1 - n / 2);
          return [a, o === 0 || o === 1 ? 0 : (i - o) / Math.min(o, 1 - o) * 100, o * 100];
        },
        formats: {
          color: {
            toGamut: !0
          }
        }
      }), X2 = new ee({
        id: "hwb",
        name: "HWB",
        coords: {
          h: {
            refRange: [0, 360],
            type: "angle",
            name: "Hue"
          },
          w: {
            range: [0, 100],
            name: "Whiteness"
          },
          b: {
            range: [0, 100],
            name: "Blackness"
          }
        },
        base: Xd,
        fromBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2];
          return [a, i * (100 - n) / 100, 100 - i];
        },
        toBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2];
          n /= 100, i /= 100;
          var o = n + i;
          if (o >= 1) {
            var u = n / o;
            return [a, 0, u * 100];
          }
          var s = 1 - i, l = s === 0 ? 0 : 1 - n / s;
          return [a, l * 100, s * 100];
        },
        formats: {
          hwb: {
            toGamut: !0,
            coords: ["<number> | <angle>", "<percentage>", "<percentage>"]
          }
        }
      }), Z2 = [[0.5766690429101305, 0.1855582379065463, 0.1882286462349947], [0.29734497525053605, 0.6273635662554661, 0.07529145849399788], [0.02703136138641234, 0.07068885253582723, 0.9913375368376388]], J2 = [[2.0415879038107465, -0.5650069742788596, -0.34473135077832956], [-0.9692436362808795, 1.8759675015077202, 0.04155505740717557], [0.013444280632031142, -0.11836239223101838, 1.0151749943912054]], Zd = new nt({
        id: "a98rgb-linear",
        name: "Linear Adobe® 98 RGB compatible",
        white: "D65",
        toXYZ_M: Z2,
        fromXYZ_M: J2
      }), Q2 = new nt({
        id: "a98rgb",
        name: "Adobe® 98 RGB compatible",
        base: Zd,
        toBase: function(t) {
          return t.map(function(r) {
            return Math.pow(Math.abs(r), 563 / 256) * Math.sign(r);
          });
        },
        fromBase: function(t) {
          return t.map(function(r) {
            return Math.pow(Math.abs(r), 256 / 563) * Math.sign(r);
          });
        },
        formats: {
          color: {
            id: "a98-rgb"
          }
        }
      }), ew = [[0.7977604896723027, 0.13518583717574031, 0.0313493495815248], [0.2880711282292934, 0.7118432178101014, 8565396060525902e-20], [0, 0, 0.8251046025104601]], tw = [[1.3457989731028281, -0.25558010007997534, -0.05110628506753401], [-0.5446224939028347, 1.5082327413132781, 0.02053603239147973], [0, 0, 1.2119675456389454]], Jd = new nt({
        id: "prophoto-linear",
        name: "Linear ProPhoto",
        white: "D50",
        base: Uo,
        toXYZ_M: ew,
        fromXYZ_M: tw
      }), rw = 1 / 512, aw = 16 / 512, nw = new nt({
        id: "prophoto",
        name: "ProPhoto",
        base: Jd,
        toBase: function(t) {
          return t.map(function(r) {
            return r < aw ? r / 16 : Math.pow(r, 1.8);
          });
        },
        fromBase: function(t) {
          return t.map(function(r) {
            return r >= rw ? Math.pow(r, 1 / 1.8) : 16 * r;
          });
        },
        formats: {
          color: {
            id: "prophoto-rgb"
          }
        }
      }), iw = new ee({
        id: "oklch",
        name: "OKLCh",
        coords: {
          l: {
            refRange: [0, 1],
            name: "Lightness"
          },
          c: {
            refRange: [0, 0.4],
            name: "Chroma"
          },
          h: {
            refRange: [0, 360],
            type: "angle",
            name: "Hue"
          }
        },
        white: "D65",
        base: Hn,
        fromBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2], o, u = 2e-4;
          return Math.abs(n) < u && Math.abs(i) < u ? o = NaN : o = Math.atan2(i, n) * 180 / Math.PI, [a, Math.sqrt(Math.pow(n, 2) + Math.pow(i, 2)), Mn(o)];
        },
        toBase: function(t) {
          var r = $(t, 3), a = r[0], n = r[1], i = r[2], o, u;
          return isNaN(i) ? (o = 0, u = 0) : (o = n * Math.cos(i * Math.PI / 180), u = n * Math.sin(i * Math.PI / 180)), [a, o, u];
        },
        formats: {
          oklch: {
            coords: ["<number> | <percentage>", "<number>", "<number> | <angle>"]
          }
        }
      }), Qd = 203, e1 = 2610 / Math.pow(2, 14), ow = Math.pow(2, 14) / 2610, uw = 2523 / Math.pow(2, 5), t1 = Math.pow(2, 5) / 2523, r1 = 3424 / Math.pow(2, 12), a1 = 2413 / Math.pow(2, 7), n1 = 2392 / Math.pow(2, 7), sw = new nt({
        id: "rec2100pq",
        name: "REC.2100-PQ",
        base: Nn,
        toBase: function(t) {
          return t.map(function(r) {
            var a = Math.pow(Math.max(Math.pow(r, t1) - r1, 0) / (a1 - n1 * Math.pow(r, t1)), ow);
            return a * 1e4 / Qd;
          });
        },
        fromBase: function(t) {
          return t.map(function(r) {
            var a = Math.max(r * Qd / 1e4, 0), n = r1 + a1 * Math.pow(a, e1), i = 1 + n1 * Math.pow(a, e1);
            return Math.pow(n / i, uw);
          });
        },
        formats: {
          color: {
            id: "rec2100-pq"
          }
        }
      }), i1 = 0.17883277, o1 = 0.28466892, u1 = 0.55991073, iu = 3.7743, lw = new nt({
        id: "rec2100hlg",
        cssid: "rec2100-hlg",
        name: "REC.2100-HLG",
        referred: "scene",
        base: Nn,
        toBase: function(t) {
          return t.map(function(r) {
            return r <= 0.5 ? Math.pow(r, 2) / 3 * iu : Math.exp((r - u1) / i1 + o1) / 12 * iu;
          });
        },
        fromBase: function(t) {
          return t.map(function(r) {
            return r /= iu, r <= 1 / 12 ? Math.sqrt(3 * r) : i1 * Math.log(12 * r - o1) + u1;
          });
        },
        formats: {
          color: {
            id: "rec2100-hlg"
          }
        }
      }), s1 = {};
      ar.add("chromatic-adaptation-start", function(e) {
        e.options.method && (e.M = l1(e.W1, e.W2, e.options.method));
      }), ar.add("chromatic-adaptation-end", function(e) {
        e.M || (e.M = l1(e.W1, e.W2, e.options.method));
      });
      function $n(e) {
        var t = e.id;
        e.toCone_M, e.fromCone_M, s1[t] = arguments[0];
      }
      function l1(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "Bradford", a = s1[r], n = Le(a.toCone_M, e), i = $(n, 3), o = i[0], u = i[1], s = i[2], l = Le(a.toCone_M, t), c = $(l, 3), d = c[0], f = c[1], p = c[2], m = [[d / o, 0, 0], [0, f / u, 0], [0, 0, p / s]], h = Le(m, a.toCone_M), v = Le(a.fromCone_M, h);
        return v;
      }
      $n({
        id: "von Kries",
        toCone_M: [[0.40024, 0.7076, -0.08081], [-0.2263, 1.16532, 0.0457], [0, 0, 0.91822]],
        fromCone_M: [[1.8599364, -1.1293816, 0.2198974], [0.3611914, 0.6388125, -64e-7], [0, 0, 1.0890636]]
      }), $n({
        id: "Bradford",
        toCone_M: [[0.8951, 0.2664, -0.1614], [-0.7502, 1.7135, 0.0367], [0.0389, -0.0685, 1.0296]],
        fromCone_M: [[0.9869929, -0.1470543, 0.1599627], [0.4323053, 0.5183603, 0.0492912], [-85287e-7, 0.0400428, 0.9684867]]
      }), $n({
        id: "CAT02",
        toCone_M: [[0.7328, 0.4296, -0.1624], [-0.7036, 1.6975, 61e-4], [3e-3, 0.0136, 0.9834]],
        fromCone_M: [[1.0961238, -0.278869, 0.1827452], [0.454369, 0.4735332, 0.0720978], [-96276e-7, -5698e-6, 1.0153256]]
      }), $n({
        id: "CAT16",
        toCone_M: [[0.401288, 0.650173, -0.051461], [-0.250268, 1.204414, 0.045854], [-2079e-6, 0.048952, 0.953127]],
        fromCone_M: [[1.862067855087233, -1.011254630531685, 0.1491867754444518], [0.3875265432361372, 0.6214474419314753, -0.008973985167612518], [-0.01584149884933386, -0.03412293802851557, 1.04996443687785]]
      }), Object.assign(Ct, {
        A: [1.0985, 1, 0.35585],
        C: [0.98074, 1, 1.18232],
        D55: [0.95682, 1, 0.92149],
        D75: [0.94972, 1, 1.22638],
        E: [1, 1, 1],
        F2: [0.99186, 1, 0.67393],
        F7: [0.95041, 1, 1.08747],
        F11: [1.00962, 1, 0.6435]
      }), Ct.ACES = [0.32168 / 0.33767, 1, (1 - 0.32168 - 0.33767) / 0.33767];
      var cw = [[0.6624541811085053, 0.13400420645643313, 0.1561876870049078], [0.27222871678091454, 0.6740817658111484, 0.05368951740793705], [-0.005574649490394108, 0.004060733528982826, 1.0103391003129971]], dw = [[1.6410233796943257, -0.32480329418479, -0.23642469523761225], [-0.6636628587229829, 1.6153315916573379, 0.016756347685530137], [0.011721894328375376, -0.008284441996237409, 0.9883948585390215]], c1 = new nt({
        id: "acescg",
        name: "ACEScg",
        coords: {
          r: {
            range: [0, 65504],
            name: "Red"
          },
          g: {
            range: [0, 65504],
            name: "Green"
          },
          b: {
            range: [0, 65504],
            name: "Blue"
          }
        },
        referred: "scene",
        white: Ct.ACES,
        toXYZ_M: cw,
        fromXYZ_M: dw,
        formats: {
          color: {}
        }
      }), Un = Math.pow(2, -16), ou = -0.35828683, Gn = (Math.log2(65504) + 9.72) / 17.52, fw = new nt({
        id: "acescc",
        name: "ACEScc",
        coords: {
          r: {
            range: [ou, Gn],
            name: "Red"
          },
          g: {
            range: [ou, Gn],
            name: "Green"
          },
          b: {
            range: [ou, Gn],
            name: "Blue"
          }
        },
        referred: "scene",
        base: c1,
        toBase: function(t) {
          var r = -0.3013698630136986;
          return t.map(function(a) {
            return a <= r ? (Math.pow(2, a * 17.52 - 9.72) - Un) * 2 : a < Gn ? Math.pow(2, a * 17.52 - 9.72) : 65504;
          });
        },
        fromBase: function(t) {
          return t.map(function(r) {
            return r <= 0 ? (Math.log2(Un) + 9.72) / 17.52 : r < Un ? (Math.log2(Un + r * 0.5) + 9.72) / 17.52 : (Math.log2(r) + 9.72) / 17.52;
          });
        },
        formats: {
          color: {}
        }
      }), d1 = Object.freeze({
        __proto__: null,
        XYZ_D65: gt,
        XYZ_D50: Uo,
        XYZ_ABS_D65: Qo,
        Lab_D65: Zo,
        Lab: ct,
        LCH: Ca,
        sRGB_Linear: wd,
        sRGB: Ra,
        HSL: Kd,
        HWB: X2,
        HSV: Xd,
        P3_Linear: yd,
        P3: Ed,
        A98RGB_Linear: Zd,
        A98RGB: Q2,
        ProPhoto_Linear: Jd,
        ProPhoto: nw,
        REC_2020_Linear: Nn,
        REC_2020: bd,
        OKLab: Hn,
        OKLCH: iw,
        Jzazbz: zd,
        JzCzHz: tu,
        ICTCP: ru,
        REC_2100_PQ: sw,
        REC_2100_HLG: lw,
        ACEScg: c1,
        ACEScc: fw
      }), _e = (J = /* @__PURE__ */ new WeakMap(), function() {
        function e() {
          var t = this;
          Tt(this, e), Xt(this, J, void 0);
          for (var r, a = arguments.length, n = new Array(a), i = 0; i < a; i++)
            n[i] = arguments[i];
          n.length === 1 && (r = ge(n[0]));
          var o, u, s;
          r ? (o = r.space || r.spaceId, u = r.coords, s = r.alpha) : (o = n[0], u = n[1], s = n[2]), at(J, this, ee.get(o)), this.coords = u ? u.slice() : [0, 0, 0], this.alpha = s < 1 ? s : 1;
          for (var l = 0; l < this.coords.length; l++)
            this.coords[l] === "NaN" && (this.coords[l] = NaN);
          var c = function(p) {
            Object.defineProperty(t, p, {
              get: function() {
                return t.get(p);
              },
              set: function(h) {
                return t.set(p, h);
              }
            });
          };
          for (var d in wt(J, this).coords)
            c(d);
        }
        return Rt(e, [{
          key: "space",
          get: function() {
            return wt(J, this);
          }
        }, {
          key: "spaceId",
          get: function() {
            return wt(J, this).id;
          }
        }, {
          key: "clone",
          value: function() {
            return new _e(this.space, this.coords, this.alpha);
          }
        }, {
          key: "toJSON",
          value: function() {
            return {
              spaceId: this.spaceId,
              coords: this.coords,
              alpha: this.alpha
            };
          }
        }, {
          key: "display",
          value: function() {
            for (var r = arguments.length, a = new Array(r), n = 0; n < r; n++)
              a[n] = arguments[n];
            var i = Z0.apply(void 0, [this].concat(a));
            return i.color = new _e(i.color), i;
          }
        }], [{
          key: "get",
          value: function(r) {
            if (r instanceof _e)
              return r;
            for (var a = arguments.length, n = new Array(a > 1 ? a - 1 : 0), i = 1; i < a; i++)
              n[i - 1] = arguments[i];
            return $p(_e, [r].concat(n));
          }
        }, {
          key: "defineFunction",
          value: function(r, a) {
            var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : a, i = n.instance, o = i === void 0 ? !0 : i, u = n.returns, s = function() {
              var c = a.apply(void 0, arguments);
              if (u === "color")
                c = _e.get(c);
              else if (u === "function<color>") {
                var d = c;
                c = function() {
                  var p = d.apply(void 0, arguments);
                  return _e.get(p);
                }, Object.assign(c, d);
              } else u === "array<color>" && (c = c.map(function(f) {
                return _e.get(f);
              }));
              return c;
            };
            r in _e || (_e[r] = s), o && (_e.prototype[r] = function() {
              for (var l = arguments.length, c = new Array(l), d = 0; d < l; d++)
                c[d] = arguments[d];
              return s.apply(void 0, [this].concat(c));
            });
          }
        }, {
          key: "defineFunctions",
          value: function(r) {
            for (var a in r)
              _e.defineFunction(a, r[a], r[a]);
          }
        }, {
          key: "extend",
          value: function(r) {
            if (r.register)
              r.register(_e);
            else
              for (var a in r)
                _e.defineFunction(a, r[a]);
          }
        }]);
      }());
      _e.defineFunctions({
        get: bt,
        getAll: Aa,
        set: nr,
        setAll: pd,
        to: yt,
        equals: J0,
        inGamut: Fa,
        toGamut: ir,
        distance: Cd,
        toString: Pn
      }), Object.assign(_e, {
        util: P0,
        hooks: ar,
        WHITES: Ct,
        Space: ee,
        spaces: ee.registry,
        parse: fd,
        defaults: Pt
      });
      for (var uu = 0, f1 = Object.keys(d1); uu < f1.length; uu++) {
        var pw = f1[uu];
        ee.register(d1[pw]);
      }
      for (var p1 in ee.registry)
        su(p1, ee.registry[p1]);
      ar.add("colorspace-init-end", function(e) {
        var t;
        su(e.id, e), (t = e.aliases) === null || t === void 0 || t.forEach(function(r) {
          su(r, e);
        });
      });
      function su(e, t) {
        Object.keys(t.coords), Object.values(t.coords).map(function(a) {
          return a.name;
        });
        var r = e.replace(/-/g, "_");
        Object.defineProperty(_e.prototype, r, {
          get: function() {
            var n = this, i = this.getAll(e);
            return typeof Proxy > "u" ? i : new Proxy(i, {
              has: function(u, s) {
                try {
                  return ee.resolveCoord([t, s]), !0;
                } catch {
                }
                return Reflect.has(u, s);
              },
              get: function(u, s, l) {
                if (s && O(s) !== "symbol" && !(s in u)) {
                  var c = ee.resolveCoord([t, s]), d = c.index;
                  if (d >= 0)
                    return u[d];
                }
                return Reflect.get(u, s, l);
              },
              set: function(u, s, l, c) {
                if (s && O(s) !== "symbol" && !(s in u) || s >= 0) {
                  var d = ee.resolveCoord([t, s]), f = d.index;
                  if (f >= 0)
                    return u[f] = l, n.setAll(e, u), !0;
                }
                return Reflect.set(u, s, l, c);
              }
            });
          },
          set: function(n) {
            this.setAll(e, n);
          },
          configurable: !0,
          enumerable: !0
        });
      }
      _e.extend(au), _e.extend({
        deltaE: Sa
      }), _e.extend(W2), _e.extend({
        contrast: b2
      }), _e.extend(w2), _e.extend(e2), _e.extend(K2), _e.extend(qn);
      var m1 = ot(Hs());
      od.default.templateSettings.strip = !1;
      var mw = /^#[0-9a-f]{3,8}$/i, hw = /hsl\(\s*([-\d.]+)(rad|turn)/, Oa = (Te = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), Qr = /* @__PURE__ */ new WeakSet(), function() {
        function e(t, r, a) {
          var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
          if (Tt(this, e), es(this, Qr), Xt(this, Te, void 0), Xt(this, Pe, void 0), Xt(this, Ke, void 0), Xt(this, pt, void 0), Xt(this, He, void 0), Xt(this, tt, void 0), t instanceof Oa) {
            var i = t.r, o = t.g, u = t.b;
            this.r = i, this.g = o, this.b = u, this.alpha = t.alpha;
            return;
          }
          this.red = t, this.green = r, this.blue = a, this.alpha = n;
        }
        return Rt(e, [{
          key: "r",
          get: function() {
            return wt(Te, this);
          },
          set: function(r) {
            at(Te, this, r), at(pt, this, Math.round($r(r, 0, 1) * 255));
          }
        }, {
          key: "g",
          get: function() {
            return wt(Pe, this);
          },
          set: function(r) {
            at(Pe, this, r), at(He, this, Math.round($r(r, 0, 1) * 255));
          }
        }, {
          key: "b",
          get: function() {
            return wt(Ke, this);
          },
          set: function(r) {
            at(Ke, this, r), at(tt, this, Math.round($r(r, 0, 1) * 255));
          }
        }, {
          key: "red",
          get: function() {
            return wt(pt, this);
          },
          set: function(r) {
            at(Te, this, r / 255), at(pt, this, $r(r, 0, 255));
          }
        }, {
          key: "green",
          get: function() {
            return wt(He, this);
          },
          set: function(r) {
            at(Pe, this, r / 255), at(He, this, $r(r, 0, 255));
          }
        }, {
          key: "blue",
          get: function() {
            return wt(tt, this);
          },
          set: function(r) {
            at(Ke, this, r / 255), at(tt, this, $r(r, 0, 255));
          }
        }, {
          key: "toHexString",
          value: function() {
            var r = Math.round(this.red).toString(16), a = Math.round(this.green).toString(16), n = Math.round(this.blue).toString(16);
            return "#" + (this.red > 15.5 ? r : "0" + r) + (this.green > 15.5 ? a : "0" + a) + (this.blue > 15.5 ? n : "0" + n);
          }
        }, {
          key: "toJSON",
          value: function() {
            var r = this.red, a = this.green, n = this.blue, i = this.alpha;
            return {
              red: r,
              green: a,
              blue: n,
              alpha: i
            };
          }
        }, {
          key: "parseString",
          value: function(r) {
            r = r.replace(hw, function(i, o, u) {
              var s = o + u;
              switch (u) {
                case "rad":
                  return i.replace(s, gw(o));
                case "turn":
                  return i.replace(s, bw(o));
              }
            });
            try {
              var a;
              "Prototype" in E && "Version" in E.Prototype && (a = Array.from, Array.from = m1.default);
              var n = new _e(r).to("srgb");
              a && (Array.from = a, a = null), this.r = n.r, this.g = n.g, this.b = n.b, this.alpha = +n.alpha;
            } catch {
              throw new Error('Unable to parse color "'.concat(r, '"'));
            }
            return this;
          }
        }, {
          key: "parseRgbString",
          value: function(r) {
            this.parseString(r);
          }
        }, {
          key: "parseHexString",
          value: function(r) {
            !r.match(mw) || [6, 8].includes(r.length) || this.parseString(r);
          }
        }, {
          key: "parseColorFnString",
          value: function(r) {
            this.parseString(r);
          }
        }, {
          key: "getRelativeLuminance",
          value: function() {
            var r = this.r, a = this.g, n = this.b, i = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4), o = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), u = n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
            return 0.2126 * i + 0.7152 * o + 0.0722 * u;
          }
        }, {
          key: "getLuminosity",
          value: function() {
            return 0.3 * this.r + 0.59 * this.g + 0.11 * this.b;
          }
        }, {
          key: "setLuminosity",
          value: function(r) {
            var a = r - this.getLuminosity();
            return Tr(Qr, this, vw).call(this, a).clip();
          }
        }, {
          key: "getSaturation",
          value: function() {
            return Math.max(this.r, this.g, this.b) - Math.min(this.r, this.g, this.b);
          }
        }, {
          key: "setSaturation",
          value: function(r) {
            var a = new Oa(this), n = [{
              name: "r",
              value: a.r
            }, {
              name: "g",
              value: a.g
            }, {
              name: "b",
              value: a.b
            }], i = n.sort(function(c, d) {
              return c.value - d.value;
            }), o = $(i, 3), u = o[0], s = o[1], l = o[2];
            return l.value > u.value ? (s.value = (s.value - u.value) * r / (l.value - u.value), l.value = r) : s.value = l.value = 0, u.value = 0, a[l.name] = l.value, a[u.name] = u.value, a[s.name] = s.value, a;
          }
        }, {
          key: "clip",
          value: function() {
            var r = new Oa(this), a = r.getLuminosity(), n = Math.min(r.r, r.g, r.b), i = Math.max(r.r, r.g, r.b);
            return n < 0 && (r.r = a + (r.r - a) * a / (a - n), r.g = a + (r.g - a) * a / (a - n), r.b = a + (r.b - a) * a / (a - n)), i > 1 && (r.r = a + (r.r - a) * (1 - a) / (i - a), r.g = a + (r.g - a) * (1 - a) / (i - a), r.b = a + (r.b - a) * (1 - a) / (i - a)), r;
          }
        }]);
      }());
      function vw(e) {
        var t = new Oa(this);
        return t.r += e, t.g += e, t.b += e, t;
      }
      var Se = Oa;
      function $r(e, t, r) {
        return Math.min(Math.max(t, e), r);
      }
      function gw(e) {
        return e * 180 / Math.PI;
      }
      function bw(e) {
        return e * 360;
      }
      function yw(e) {
        var t = new Se();
        if (t.parseString(e.getPropertyValue("background-color")), t.alpha !== 0) {
          var r = e.getPropertyValue("opacity");
          t.alpha = t.alpha * r;
        }
        return t;
      }
      var Ar = yw;
      function ww(e) {
        var t = E.getComputedStyle(e);
        return Tn(e, t) || Ar(t).alpha === 1;
      }
      var Dw = ww;
      function lu(e) {
        if (!e.href)
          return !1;
        var t = ue.get("firstPageLink", _w);
        return t ? e.compareDocumentPosition(t.actualNode) === e.DOCUMENT_POSITION_FOLLOWING : !0;
      }
      function _w() {
        var e;
        return E.location.origin ? e = ft(x._tree, 'a[href]:not([href^="javascript:"])').find(function(t) {
          return !go(t.actualNode);
        }) : e = ft(x._tree, 'a:not([href^="#"]):not([href^="/#"]):not([href^="javascript:"])')[0], e || null;
      }
      var xw = /rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/, Ew = /(\w+)\((\d+)/;
      function Aw(e) {
        var t = e.getPropertyValue("clip").match(xw), r = e.getPropertyValue("clip-path").match(Ew);
        if (t && t.length === 5) {
          var a = e.getPropertyValue("position");
          if (["fixed", "absolute"].includes(a))
            return t[3] - t[1] <= 0 && t[2] - t[4] <= 0;
        }
        if (r) {
          var n = r[1], i = parseInt(r[2], 10);
          switch (n) {
            case "inset":
              return i >= 50;
            case "circle":
              return i === 0;
          }
        }
        return !1;
      }
      function Cw(e, t, r) {
        var a = Lr(e, "map");
        if (!a)
          return !1;
        var n = a.getAttribute("name");
        if (!n)
          return !1;
        var i = Xe(e);
        if (!i || i.nodeType !== 9)
          return !1;
        var o = ft(x._tree, 'img[usemap="#'.concat(Oe(n), '"]'));
        return !o || !o.length ? !1 : o.some(function(u) {
          var s = u.actualNode;
          return Wn(s, t, r);
        });
      }
      function Wn(e, t, r) {
        var a;
        if (!e)
          throw new TypeError("Cannot determine if element is visible for non-DOM nodes");
        var n = e instanceof $e ? e : le(e);
        e = n ? n.actualNode : e;
        var i = "_isVisible" + (t ? "ScreenReader" : ""), o = (a = E.Node) !== null && a !== void 0 ? a : {}, u = o.DOCUMENT_NODE, s = o.DOCUMENT_FRAGMENT_NODE, l = n ? n.props.nodeType : e.nodeType, c = n ? n.props.nodeName : e.nodeName.toLowerCase();
        if (n && typeof n[i] < "u")
          return n[i];
        if (l === u)
          return !0;
        if (["style", "script", "noscript", "template"].includes(c))
          return !1;
        if (e && l === s && (e = e.host), t) {
          var d = n ? n.attr("aria-hidden") : e.getAttribute("aria-hidden");
          if (d === "true")
            return !1;
        }
        if (!e) {
          var f = n.parent, p = !0;
          return f && (p = Wn(f, t, !0)), n && (n[i] = p), p;
        }
        var m = E.getComputedStyle(e, null);
        if (m === null)
          return !1;
        if (c === "area")
          return Cw(e, t, r);
        if (m.getPropertyValue("display") === "none")
          return !1;
        var h = parseInt(m.getPropertyValue("height")), v = parseInt(m.getPropertyValue("width")), g = Yt(e), b = g && h === 0, D = g && v === 0, w = m.getPropertyValue("position") === "absolute" && (h < 2 || v < 2) && m.getPropertyValue("overflow") === "hidden";
        if (!t && (Aw(m) || m.getPropertyValue("opacity") === "0" || b || D || w) || !r && (m.getPropertyValue("visibility") === "hidden" || !t && mn(e)))
          return !1;
        var _ = e.assignedSlot ? e.assignedSlot : e.parentNode, F = !1;
        return _ && (F = Wn(_, t, !0)), n && (n[i] = F), F;
      }
      var Fw = Wn;
      function Tw(e, t) {
        for (var r = ["fixed", "sticky"], a = [], n = !1, i = 0; i < e.length; ++i) {
          var o = e[i];
          o === t && (n = !0);
          var u = E.getComputedStyle(o);
          if (!n && r.indexOf(u.position) !== -1) {
            a = [];
            continue;
          }
          a.push(o);
        }
        return a;
      }
      var h1 = Tw;
      function v1(e, t) {
        var r = g1(t);
        do {
          var a = g1(e);
          if (a === r || a === t)
            return Rw(e, t);
          e = a;
        } while (e);
        return !1;
      }
      function g1(e) {
        for (var t = le(e), r = t.parent; r; ) {
          if (Yt(r.actualNode))
            return r.actualNode;
          r = r.parent;
        }
      }
      function Rw(e, t) {
        var r = E.getComputedStyle(t), a = r.getPropertyValue("overflow");
        if (r.getPropertyValue("display") === "inline")
          return !0;
        var n = Array.from(e.getClientRects()), i = t.getBoundingClientRect(), o = {
          left: i.left,
          top: i.top,
          width: i.width,
          height: i.height
        };
        return (["scroll", "auto"].includes(a) || t instanceof E.HTMLHtmlElement) && (o.width = t.scrollWidth, o.height = t.scrollHeight), n.length === 1 && a === "hidden" && r.getPropertyValue("white-space") === "nowrap" && (n[0] = o), n.some(function(u) {
          return !(Math.ceil(u.left) < Math.floor(o.left) || Math.ceil(u.top) < Math.floor(o.top) || Math.floor(u.left + u.width) > Math.ceil(o.left + o.width) || Math.floor(u.top + u.height) > Math.ceil(o.top + o.height));
        });
      }
      function b1(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : L, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
        if (a > 999)
          throw new Error("Infinite loop detected");
        return Array.from(r.elementsFromPoint(e, t) || []).filter(function(n) {
          return Xe(n) === r;
        }).reduce(function(n, i) {
          if (fn(i)) {
            var o = b1(e, t, i.shadowRoot, a + 1);
            n = n.concat(o), n.length && v1(n[0], i) && n.push(i);
          } else
            n.push(i);
          return n;
        }, []);
      }
      var Sw = b1;
      function kw(e, t) {
        if (e.hasAttribute(t)) {
          var r = e.nodeName.toUpperCase(), a = e;
          (!["A", "AREA"].includes(r) || e.ownerSVGElement) && (a = L.createElement("a"), a.href = e.getAttribute(t));
          var n = ["https:", "ftps:"].includes(a.protocol) ? a.protocol.replace(/s:$/, ":") : a.protocol, i = /^\//.test(a.pathname) ? a.pathname : "/".concat(a.pathname), o = Mw(i), u = o.pathname, s = o.filename;
          return {
            protocol: n,
            hostname: a.hostname,
            port: Ow(a.port),
            pathname: /\/$/.test(u) ? u : "".concat(u, "/"),
            search: Iw(a.search),
            hash: Pw(a.hash),
            filename: s
          };
        }
      }
      function Ow(e) {
        var t = ["443", "80"];
        return t.includes(e) ? "" : e;
      }
      function Mw(e) {
        var t = e.split("/").pop();
        return !t || t.indexOf(".") === -1 ? {
          pathname: e,
          filename: ""
        } : {
          pathname: e.replace(t, ""),
          filename: /index./.test(t) ? "" : t
        };
      }
      function Iw(e) {
        var t = {};
        if (!e || !e.length)
          return t;
        var r = e.substring(1).split("&");
        if (!r || !r.length)
          return t;
        for (var a = 0; a < r.length; a++) {
          var n = r[a], i = n.split("="), o = $(i, 2), u = o[0], s = o[1], l = s === void 0 ? "" : s;
          t[decodeURIComponent(u)] = decodeURIComponent(l);
        }
        return t;
      }
      function Pw(e) {
        if (!e)
          return "";
        var t = /#!?\/?/g, r = e.match(t);
        if (!r)
          return "";
        var a = $(r, 1), n = a[0];
        return n === "#" ? "" : e;
      }
      var Nw = kw;
      function Lw(e, t) {
        var r = t.getBoundingClientRect(), a = r.top, n = r.left, i = {
          top: a - t.scrollTop,
          bottom: a - t.scrollTop + t.scrollHeight,
          left: n - t.scrollLeft,
          right: n - t.scrollLeft + t.scrollWidth
        };
        if (e.left > i.right && e.left > r.right || e.top > i.bottom && e.top > r.bottom || e.right < i.left && e.right < r.left || e.bottom < i.top && e.bottom < r.top)
          return !1;
        var o = E.getComputedStyle(t);
        return e.left > r.right || e.top > r.bottom ? o.overflow === "scroll" || o.overflow === "auto" || t instanceof E.HTMLBodyElement || t instanceof E.HTMLHtmlElement : !0;
      }
      var cu = Lw, y1 = 0, Bw = function(e) {
        function t(r, a, n) {
          var i;
          if (Tt(this, t), i = hi(this, t), i.shadowId = n, i.children = [], i.actualNode = r, i.parent = a, a || (y1 = 0), i.nodeIndex = y1++, i._isHidden = null, i._cache = {}, i._isXHTML = tn(r.ownerDocument), r.nodeName.toLowerCase() === "input") {
            var o = r.getAttribute("type");
            o = i._isXHTML ? o : (o || "").toLowerCase(), ti().includes(o) || (o = "text"), i._type = o;
          }
          return ue.get("nodeMap") && ue.get("nodeMap").set(r, i), i;
        }
        return gi(t, e), Rt(t, [{
          key: "props",
          get: function() {
            if (!this._cache.hasOwnProperty("props")) {
              var a = this.actualNode, n = a.nodeType, i = a.nodeName, o = a.id, u = a.nodeValue;
              this._cache.props = {
                nodeType: n,
                nodeName: this._isXHTML ? i : i.toLowerCase(),
                id: o,
                type: this._type,
                nodeValue: u
              }, n === 1 && (this._cache.props.multiple = this.actualNode.multiple, this._cache.props.value = this.actualNode.value, this._cache.props.selected = this.actualNode.selected, this._cache.props.checked = this.actualNode.checked, this._cache.props.indeterminate = this.actualNode.indeterminate);
            }
            return this._cache.props;
          }
        }, {
          key: "attr",
          value: function(a) {
            return typeof this.actualNode.getAttribute != "function" ? null : this.actualNode.getAttribute(a);
          }
        }, {
          key: "hasAttr",
          value: function(a) {
            return typeof this.actualNode.hasAttribute != "function" ? !1 : this.actualNode.hasAttribute(a);
          }
        }, {
          key: "attrNames",
          get: function() {
            if (!this._cache.hasOwnProperty("attrNames")) {
              var a;
              this.actualNode.attributes instanceof E.NamedNodeMap ? a = this.actualNode.attributes : a = this.actualNode.cloneNode(!1).attributes, this._cache.attrNames = Array.from(a).map(function(n) {
                return n.name;
              });
            }
            return this._cache.attrNames;
          }
        }, {
          key: "getComputedStylePropertyValue",
          value: function(a) {
            var n = "computedStyle_" + a;
            return this._cache.hasOwnProperty(n) || (this._cache.hasOwnProperty("computedStyle") || (this._cache.computedStyle = E.getComputedStyle(this.actualNode)), this._cache[n] = this._cache.computedStyle.getPropertyValue(a)), this._cache[n];
          }
        }, {
          key: "isFocusable",
          get: function() {
            return this._cache.hasOwnProperty("isFocusable") || (this._cache.isFocusable = Ne(this.actualNode)), this._cache.isFocusable;
          }
        }, {
          key: "tabbableElements",
          get: function() {
            return this._cache.hasOwnProperty("tabbableElements") || (this._cache.tabbableElements = sc(this)), this._cache.tabbableElements;
          }
        }, {
          key: "clientRects",
          get: function() {
            return this._cache.hasOwnProperty("clientRects") || (this._cache.clientRects = Array.from(this.actualNode.getClientRects()).filter(function(a) {
              return a.width > 0;
            })), this._cache.clientRects;
          }
        }, {
          key: "boundingClientRect",
          get: function() {
            return this._cache.hasOwnProperty("boundingClientRect") || (this._cache.boundingClientRect = this.actualNode.getBoundingClientRect()), this._cache.boundingClientRect;
          }
        }]);
      }($e), du = Bw;
      function qw(e) {
        return (e || "").trim().replace(/\s{2,}/g, " ").split(" ");
      }
      var Ze = qw, Cr = " [idsMap]";
      function w1(e, t, r) {
        var a = e[0]._selectorMap;
        if (a) {
          for (var n = e[0].shadowId, i = 0; i < t.length; i++)
            if (t[i].length > 1 && t[i].some(function(s) {
              return D1(s);
            }))
              return;
          var o = /* @__PURE__ */ new Set();
          t.forEach(function(s) {
            var l, c = jw(s, a, n);
            c == null || (l = c.nodes) === null || l === void 0 || l.forEach(function(d) {
              c.isComplexSelector && !Or(d, s) || o.add(d);
            });
          });
          var u = [];
          return o.forEach(function(s) {
            return u.push(s);
          }), r && (u = u.filter(r)), u.sort(function(s, l) {
            return s.nodeIndex - l.nodeIndex;
          });
        }
      }
      function jw(e, t, r) {
        var a = e[e.length - 1], n = null, i = e.length > 1 || !!a.pseudos || !!a.classes;
        if (D1(a))
          n = t["*"];
        else {
          if (a.id) {
            var o;
            if (!t[Cr] || !Object.hasOwn(t[Cr], a.id) || !((o = t[Cr][a.id]) !== null && o !== void 0 && o.length))
              return;
            n = t[Cr][a.id].filter(function(h) {
              return h.shadowId === r;
            });
          }
          if (a.tag && a.tag !== "*") {
            var u;
            if (!((u = t[a.tag]) !== null && u !== void 0 && u.length))
              return;
            var s = t[a.tag];
            n = n ? fu(s, n) : s;
          }
          if (a.classes) {
            var l;
            if (!((l = t["[class]"]) !== null && l !== void 0 && l.length))
              return;
            var c = t["[class]"];
            n = n ? fu(c, n) : c;
          }
          if (a.attributes)
            for (var d = 0; d < a.attributes.length; d++) {
              var f, p = a.attributes[d];
              if (p.type === "attrValue" && (i = !0), !((f = t["[".concat(p.key, "]")]) !== null && f !== void 0 && f.length))
                return;
              var m = t["[".concat(p.key, "]")];
              n = n ? fu(m, n) : m;
            }
        }
        return {
          nodes: n,
          isComplexSelector: i
        };
      }
      function D1(e) {
        return e.tag === "*" && !e.attributes && !e.id && !e.classes;
      }
      function fu(e, t) {
        return e.filter(function(r) {
          return t.includes(r);
        });
      }
      function Yn(e, t, r) {
        Object.hasOwn(r, e) || (r[e] = []), r[e].push(t);
      }
      function _1(e, t) {
        e.props.nodeType === 1 && (Yn(e.props.nodeName, e, t), Yn("*", e, t), e.attrNames.forEach(function(r) {
          r === "id" && (t[Cr] = t[Cr] || {}, Ze(e.attr(r)).forEach(function(a) {
            Yn(a, e, t[Cr]);
          })), Yn("[".concat(r, "]"), e, t);
        }));
      }
      var pu;
      function mu() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : L.documentElement, t = arguments.length > 1 ? arguments[1] : void 0;
        pu = !1;
        var r = {};
        ue.set("nodeMap", /* @__PURE__ */ new WeakMap()), ue.set("selectorMap", r);
        var a = x1(e, t, null);
        return a[0]._selectorMap = r, a[0]._hasShadowRoot = pu, a;
      }
      function zw(e) {
        var t = [];
        for (e = e.firstChild; e; )
          t.push(e), e = e.nextSibling;
        return t;
      }
      function hu(e, t, r) {
        var a = new du(e, t, r);
        return _1(a, ue.get("selectorMap")), a;
      }
      function x1(e, t, r) {
        var a, n;
        function i(u, s, l) {
          var c = x1(s, t, l);
          return c && (u = u.concat(c)), u;
        }
        e.documentElement && (e = e.documentElement);
        var o = e.nodeName.toLowerCase();
        return fn(e) ? (pu = !0, a = hu(e, r, t), t = "a" + Math.random().toString().substring(2), n = Array.from(e.shadowRoot.childNodes), a.children = n.reduce(function(u, s) {
          return i(u, s, a);
        }, []), [a]) : o === "content" && typeof e.getDistributedNodes == "function" ? (n = Array.from(e.getDistributedNodes()), n.reduce(function(u, s) {
          return i(u, s, r);
        }, [])) : o === "slot" && typeof e.assignedNodes == "function" ? (n = Array.from(e.assignedNodes()), n.length || (n = zw(e)), E.getComputedStyle(e), n.reduce(function(u, s) {
          return i(u, s, r);
        }, [])) : e.nodeType === 1 ? (a = hu(e, r, t), n = Array.from(e.childNodes), a.children = n.reduce(function(u, s) {
          return i(u, s, a);
        }, []), [a]) : e.nodeType === 3 ? [hu(e, r)] : void 0;
      }
      function Vw(e) {
        return e ? e.trim().split("-")[0].toLowerCase() : "";
      }
      var Fr = Vw;
      function Hw(e) {
        var t = {};
        return t.none = e.none.concat(e.all), t.any = e.any, Object.keys(t).map(function(r) {
          if (t[r].length) {
            var a = x._audit.data.failureSummaries[r];
            if (a && typeof a.failureMessage == "function")
              return a.failureMessage(t[r].map(function(n) {
                return n.message || "";
              }));
          }
        }).filter(function(r) {
          return r !== void 0;
        }).join(`

`);
      }
      var vu = Hw;
      function gu() {
        var e = x._audit.data.incompleteFallbackMessage;
        return typeof e == "function" && (e = e()), typeof e != "string" ? "" : e;
      }
      var E1 = se.resultGroups;
      function Ma(e, t) {
        var r = x.utils.aggregateResult(e);
        return E1.forEach(function(a) {
          t.resultTypes && !t.resultTypes.includes(a) && (r[a] || []).forEach(function(n) {
            Array.isArray(n.nodes) && n.nodes.length > 0 && (n.nodes = [n.nodes[0]]);
          }), r[a] = (r[a] || []).map(function(n) {
            return n = Object.assign({}, n), Array.isArray(n.nodes) && n.nodes.length > 0 && (n.nodes = n.nodes.map(function(i) {
              if (O(i.node) === "object") {
                var o = A1(i.node, t);
                Object.assign(i, o);
              }
              return delete i.result, delete i.node, $w(i, t), i;
            })), E1.forEach(function(i) {
              return delete n[i];
            }), delete n.pageLevel, delete n.result, n;
          });
        }), r;
      }
      function $w(e, t) {
        ["any", "all", "none"].forEach(function(r) {
          Array.isArray(e[r]) && e[r].filter(function(a) {
            return Array.isArray(a.relatedNodes);
          }).forEach(function(a) {
            a.relatedNodes = a.relatedNodes.map(function(n) {
              return A1(n, t);
            });
          });
        });
      }
      function A1() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
        e = ht.dqElmToSpec(e, t);
        var r = {};
        if (x._audit.noHtml)
          r.html = null;
        else {
          var a;
          r.html = (a = e.source) !== null && a !== void 0 ? a : "Undefined";
        }
        if (t.elementRef && !e.fromFrame) {
          var n;
          r.element = (n = e.element) !== null && n !== void 0 ? n : null;
        }
        if (t.selectors !== !1 || e.fromFrame) {
          var i;
          r.target = (i = e.selector) !== null && i !== void 0 ? i : [":root"];
        }
        if (t.ancestry) {
          var o;
          r.ancestry = (o = e.ancestry) !== null && o !== void 0 ? o : [":root"];
        }
        if (t.xpath) {
          var u;
          r.xpath = (u = e.xpath) !== null && u !== void 0 ? u : ["/"];
        }
        return r;
      }
      var Uw = /\$\{\s?data\s?\}/g;
      function Kn(e, t) {
        if (typeof t == "string")
          return e.replace(Uw, t);
        for (var r in t)
          if (t.hasOwnProperty(r)) {
            var a = new RegExp("\\${\\s?data\\." + r + "\\s?}", "g"), n = typeof t[r] > "u" ? "" : String(t[r]);
            e = e.replace(a, n);
          }
        return e;
      }
      function C1(e, t) {
        if (e) {
          if (Array.isArray(t)) {
            if (t.values = t.join(", "), typeof e.singular == "string" && typeof e.plural == "string") {
              var r = t.length === 1 ? e.singular : e.plural;
              return Kn(r, t);
            }
            return Kn(e, t);
          }
          if (typeof e == "string")
            return Kn(e, t);
          if (typeof t == "string") {
            var a = e[t];
            return Kn(a, t);
          }
          var n = e.default || gu();
          return t && t.messageKey && e[t.messageKey] && (n = e[t.messageKey]), C1(n, t);
        }
      }
      var bu = C1;
      function Gw(e, t, r) {
        var a = x._audit.data.checks[e];
        if (!a)
          throw new Error("Cannot get message for unknown check: ".concat(e, "."));
        if (!a.messages[t])
          throw new Error('Check "'.concat(e, '"" does not have a "').concat(t, '" message.'));
        return bu(a.messages[t], r);
      }
      var Ww = Gw;
      function Yw(e, t, r) {
        var a = ((r.rules && r.rules[t] || {}).checks || {})[e.id], n = (r.checks || {})[e.id], i = e.enabled, o = e.options;
        return n && (n.hasOwnProperty("enabled") && (i = n.enabled), n.hasOwnProperty("options") && (o = n.options)), a && (a.hasOwnProperty("enabled") && (i = a.enabled), a.hasOwnProperty("options") && (o = a.options)), {
          enabled: i,
          options: o,
          absolutePaths: r.absolutePaths
        };
      }
      var Xn = Yw;
      function ur() {
        var e, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : E;
        return t && O(t) === "object" ? t : O(r) !== "object" ? {} : {
          testEngine: {
            name: "axe-core",
            version: x.version
          },
          testRunner: {
            name: x._audit.brand
          },
          testEnvironment: Kw(r),
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          url: (e = r.location) === null || e === void 0 ? void 0 : e.href
        };
      }
      function Kw(e) {
        if (!e.navigator || O(e.navigator) !== "object")
          return {};
        var t = e.navigator, r = e.innerHeight, a = e.innerWidth, n = Xw(e) || {}, i = n.angle, o = n.type;
        return {
          userAgent: t.userAgent,
          windowWidth: a,
          windowHeight: r,
          orientationAngle: i,
          orientationType: o
        };
      }
      function Xw(e) {
        var t = e.screen;
        return t.orientation || t.msOrientation || t.mozOrientation;
      }
      function F1(e, t) {
        var r = t.focusable, a = t.page;
        return {
          node: e,
          include: [],
          exclude: [],
          initiator: !1,
          focusable: r && Zw(e),
          size: Jw(e),
          page: a
        };
      }
      function Zw(e) {
        var t = Lt(e.getAttribute("tabindex"));
        return t === null || t >= 0;
      }
      function Jw(e) {
        var t = parseInt(e.getAttribute("width"), 10), r = parseInt(e.getAttribute("height"), 10);
        if (isNaN(t) || isNaN(r)) {
          var a = e.getBoundingClientRect();
          t = isNaN(t) ? a.width : t, r = isNaN(r) ? a.height : r;
        }
        return {
          width: t,
          height: r
        };
      }
      function Qw(e) {
        if (wu(e)) {
          var t = " must be used inside include or exclude. It should not be on the same object.";
          sr(!Nt(e, "fromFrames"), "fromFrames" + t), sr(!Nt(e, "fromShadowDom"), "fromShadowDom" + t);
        } else if (Jn(e))
          e = {
            include: e,
            exclude: []
          };
        else
          return {
            include: [L],
            exclude: []
          };
        var r = T1(e.include);
        r.length === 0 && r.push(L);
        var a = T1(e.exclude);
        return {
          include: r,
          exclude: a
        };
      }
      function T1() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = [];
        yu(e) || (e = [e]);
        for (var r = 0; r < e.length; r++) {
          var a = eD(e[r]);
          a && t.push(a);
        }
        return t;
      }
      function eD(e) {
        return e instanceof E.Node ? e : typeof e == "string" ? [e] : (Du(e) ? (rD(e), e = e.fromFrames) : Qn(e) && (e = [e]), tD(e));
      }
      function tD(e) {
        if (Array.isArray(e)) {
          var t = [], r = Ce(e), a;
          try {
            for (r.s(); !(a = r.n()).done; ) {
              var n = a.value;
              if (Qn(n) && (aD(n), n = n.fromShadowDom), typeof n != "string" && !nD(n))
                return;
              t.push(n);
            }
          } catch (i) {
            r.e(i);
          } finally {
            r.f();
          }
          return t;
        }
      }
      function rD(e) {
        sr(Array.isArray(e.fromFrames), "fromFrames property must be an array"), sr(e.fromFrames.every(function(t) {
          return !Nt(t, "fromFrames");
        }), "Invalid context; fromFrames selector must be appended, rather than nested"), sr(!Nt(e, "fromShadowDom"), "fromFrames and fromShadowDom cannot be used on the same object");
      }
      function aD(e) {
        sr(Array.isArray(e.fromShadowDom), "fromShadowDom property must be an array"), sr(e.fromShadowDom.every(function(t) {
          return !Nt(t, "fromFrames");
        }), "shadow selector must be inside fromFrame instead"), sr(e.fromShadowDom.every(function(t) {
          return !Nt(t, "fromShadowDom");
        }), "fromShadowDom selector must be appended, rather than nested");
      }
      function nD(e) {
        return Array.isArray(e) && e.every(function(t) {
          return typeof t == "string";
        });
      }
      function sr(e, t) {
        me(e, "Invalid context; ".concat(t, `
See: https://github.com/dequelabs/axe-core/blob/master/doc/context.md`));
      }
      function R1(e, t) {
        for (var r = [], a = 0, n = e[t].length; a < n; a++) {
          var i = e[t][a];
          if (i instanceof E.Node)
            i.documentElement instanceof E.Node ? r.push(e.flatTree[0]) : r.push(le(i));
          else if (i && i.length)
            if (i.length > 1)
              iD(e, t, i);
            else {
              var o = Ru(i[0]);
              r.push.apply(r, ne(o.map(function(u) {
                return le(u);
              })));
            }
        }
        return r.filter(function(u) {
          return u;
        });
      }
      function iD(e, t, r) {
        e.frames = e.frames || [];
        var a = r.shift(), n = Ru(a);
        n.forEach(function(i) {
          var o = e.frames.find(function(u) {
            return u.node === i;
          });
          o || (o = F1(i, e), e.frames.push(o)), o[t].push(r);
        });
      }
      function Zn(e, t) {
        var r, a, n, i, o = this;
        e = $t(e), this.frames = [], this.page = typeof ((r = e) === null || r === void 0 ? void 0 : r.page) == "boolean" ? e.page : void 0, this.initiator = typeof ((a = e) === null || a === void 0 ? void 0 : a.initiator) == "boolean" ? e.initiator : !0, this.focusable = typeof ((n = e) === null || n === void 0 ? void 0 : n.focusable) == "boolean" ? e.focusable : !0, this.size = O((i = e) === null || i === void 0 ? void 0 : i.size) === "object" ? e.size : {}, e = Qw(e), this.flatTree = t ?? mu(lD(e)), this.exclude = e.exclude, this.include = e.include, this.include = R1(this, "include"), this.exclude = R1(this, "exclude"), Tu("frame, iframe", this).forEach(function(u) {
          xu(u, o) && oD(o, u.actualNode);
        }), typeof this.page > "u" && (this.page = uD(this), this.frames.forEach(function(u) {
          u.page = o.page;
        })), sD(this), Array.isArray(this.include) || (this.include = Array.from(this.include)), this.include.sort(Au);
      }
      function oD(e, t) {
        !Re(t) || fa(e.frames, "node", t) || e.frames.push(F1(t, e));
      }
      function uD(e) {
        var t = e.include;
        return t.length === 1 && t[0].actualNode === L.documentElement;
      }
      function sD(e) {
        if (e.include.length === 0 && e.frames.length === 0) {
          var t = Et.isInFrame() ? "frame" : "page";
          throw new Error("No elements found for include in " + t + " Context");
        }
      }
      function lD(e) {
        for (var t = e.include, r = e.exclude, a = Array.from(t).concat(Array.from(r)), n = 0; n < a.length; n++) {
          var i = a[n];
          if (i instanceof E.Element)
            return i.ownerDocument.documentElement;
          if (i instanceof E.Document)
            return i.documentElement;
        }
        return L.documentElement;
      }
      function cD(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if (t.iframes === !1)
          return [];
        var r = new Zn(e), a = r.frames;
        return a.map(function(n) {
          var i = n.node, o = qe(n, Np);
          o.initiator = !1;
          var u = an(i);
          return {
            frameSelector: u,
            frameContext: o
          };
        });
      }
      function S1(e) {
        var t = x._audit.rules.find(function(r) {
          var a = r.id;
          return a === e;
        });
        if (!t)
          throw new Error("Cannot find rule by id: ".concat(e));
        return t;
      }
      function dD(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = e.scrollWidth > e.clientWidth + t, a = e.scrollHeight > e.clientHeight + t;
        if (r || a) {
          var n = E.getComputedStyle(e), i = k1(n, "overflow-x"), o = k1(n, "overflow-y");
          if (r && i || a && o)
            return {
              elm: e,
              top: e.scrollTop,
              left: e.scrollLeft
            };
        }
      }
      function k1(e, t) {
        var r = e.getPropertyValue(t);
        return ["scroll", "auto"].includes(r);
      }
      var Yt = Fe(dD);
      function O1(e) {
        return Array.from(e.children || e.childNodes || []).reduce(function(t, r) {
          var a = Yt(r);
          return a && t.push(a), t.concat(O1(r));
        }, []);
      }
      function fD() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : E, t = e.document.documentElement, r = [e.pageXOffset !== void 0 ? {
          elm: e,
          top: e.pageYOffset,
          left: e.pageXOffset
        } : {
          elm: t,
          top: t.scrollTop,
          left: t.scrollLeft
        }];
        return r.concat(O1(L.body));
      }
      var pD = fD;
      function mD() {
        return $t(he);
      }
      function hD(e) {
        if (!e)
          throw new Error("axe.utils.getStyleSheetFactory should be invoked with an argument");
        return function(t) {
          var r = t.data, a = t.isCrossOrigin, n = a === void 0 ? !1 : a, i = t.shadowId, o = t.root, u = t.priority, s = t.isLink, l = s === void 0 ? !1 : s, c = e.createElement("style");
          if (l) {
            var d = e.createTextNode('@import "'.concat(r.href, '"'));
            c.appendChild(d);
          } else
            c.appendChild(e.createTextNode(r));
          return e.head.appendChild(c), {
            sheet: c.sheet,
            isCrossOrigin: n,
            shadowId: i,
            root: o,
            priority: u
          };
        };
      }
      var M1 = hD, dt;
      function vD(e) {
        if (dt && dt.parentNode)
          return dt.styleSheet === void 0 ? dt.appendChild(L.createTextNode(e)) : dt.styleSheet.cssText += e, dt;
        if (e) {
          var t = L.head || L.getElementsByTagName("head")[0];
          return dt = L.createElement("style"), dt.type = "text/css", dt.styleSheet === void 0 ? dt.appendChild(L.createTextNode(e)) : dt.styleSheet.cssText = e, t.appendChild(dt), dt;
        }
      }
      var gD = vD;
      function yu(e) {
        return !!e && O(e) === "object" && typeof e.length == "number" && !(e instanceof E.Node);
      }
      function Nt(e, t) {
        return !e || O(e) !== "object" ? !1 : Object.prototype.hasOwnProperty.call(e, t);
      }
      function I1(e) {
        return wu(e) || Jn(e);
      }
      function wu(e) {
        return ["include", "exclude"].some(function(t) {
          return Nt(e, t) && Jn(e[t]);
        });
      }
      function Jn(e) {
        return typeof e == "string" || e instanceof E.Node || Du(e) || Qn(e) || yu(e);
      }
      function Du(e) {
        return Nt(e, "fromFrames");
      }
      function Qn(e) {
        return Nt(e, "fromShadowDom");
      }
      function P1(e, t) {
        var r = le(e);
        if (e.nodeType === 9)
          return !1;
        if (e.nodeType === 11 && (e = e.host), r && r._isHidden !== null)
          return r._isHidden;
        var a = E.getComputedStyle(e, null);
        if (!a || !e.parentNode || a.getPropertyValue("display") === "none" || !t && a.getPropertyValue("visibility") === "hidden" || e.getAttribute("aria-hidden") === "true")
          return !0;
        var n = e.assignedSlot ? e.assignedSlot : e.parentNode, i = P1(n, !0);
        return r && (r._isHidden = i), i;
      }
      var bD = P1;
      function yD(e) {
        var t, r, a = (t = (r = e.props) === null || r === void 0 ? void 0 : r.nodeName) !== null && t !== void 0 ? t : e.nodeName.toLowerCase();
        return e.namespaceURI === "http://www.w3.org/2000/svg" ? !1 : !!he.htmlElms[a];
      }
      var _u = yD;
      function xu(e, t) {
        var r = t.include, a = r === void 0 ? [] : r, n = t.exclude, i = n === void 0 ? [] : n, o = a.filter(function(c) {
          return Ut(c, e);
        });
        if (o.length === 0)
          return !1;
        var u = i.filter(function(c) {
          return Ut(c, e);
        });
        if (u.length === 0)
          return !0;
        var s = N1(o), l = N1(u);
        return Ut(l, s);
      }
      function N1(e) {
        var t, r = Ce(e), a;
        try {
          for (r.s(); !(a = r.n()).done; ) {
            var n = a.value;
            (!t || !Ut(n, t)) && (t = n);
          }
        } catch (i) {
          r.e(i);
        } finally {
          r.f();
        }
        return t;
      }
      function Eu(e, t) {
        return e.length !== t.length ? !1 : e.every(function(r, a) {
          var n = t[a];
          return Array.isArray(r) ? r.length !== n.length ? !1 : r.every(function(i, o) {
            return n[o] === i;
          }) : r === n;
        });
      }
      function wD(e, t) {
        return e = e.actualNode || e, t = t.actualNode || t, e === t ? 0 : e.compareDocumentPosition(t) & 4 ? -1 : 1;
      }
      var Au = wD;
      function we(e) {
        return e instanceof $e ? {
          vNode: e,
          domNode: e.actualNode
        } : {
          vNode: le(e),
          domNode: e
        };
      }
      function DD(e, t, r, a) {
        var n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, i = Array.from(e.cssRules);
        if (!i)
          return Promise.resolve();
        var o = i.filter(function(c) {
          return c.type === 3;
        });
        if (!o.length)
          return Promise.resolve({
            isCrossOrigin: n,
            priority: r,
            root: t.rootNode,
            shadowId: t.shadowId,
            sheet: e
          });
        var u = o.filter(function(c) {
          return c.href;
        }).map(function(c) {
          return c.href;
        }).filter(function(c) {
          return !a.includes(c);
        }), s = u.map(function(c, d) {
          var f = [].concat(ne(r), [d]), p = /^https?:\/\/|^\/\//i.test(c);
          return Fu(c, t, f, a, p);
        }), l = i.filter(function(c) {
          return c.type !== 3;
        });
        return l.length && s.push(Promise.resolve(t.convertDataToStylesheet({
          data: l.map(function(c) {
            return c.cssText;
          }).join(),
          isCrossOrigin: n,
          priority: r,
          root: t.rootNode,
          shadowId: t.shadowId
        }))), Promise.all(s);
      }
      var L1 = DD;
      function _D(e, t, r, a) {
        var n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, i = xD(e);
        return i ? L1(e, t, r, a, n) : Fu(e.href, t, r, a, !0);
      }
      function xD(e) {
        try {
          var t = e.cssRules;
          return !(!t && e.href);
        } catch {
          return !1;
        }
      }
      var Cu = _D;
      function ED(e, t, r, a, n) {
        return a.push(e), new Promise(function(i, o) {
          var u = new E.XMLHttpRequest();
          u.open("GET", e), u.timeout = se.preload.timeout, u.addEventListener("error", o), u.addEventListener("timeout", o), u.addEventListener("loadend", function(s) {
            if (s.loaded && u.responseText)
              return i(u.responseText);
            o(u.responseText);
          }), u.send();
        }).then(function(i) {
          var o = t.convertDataToStylesheet({
            data: i,
            isCrossOrigin: n,
            priority: r,
            root: t.rootNode,
            shadowId: t.shadowId
          });
          return Cu(o.sheet, t, r, a, o.isCrossOrigin);
        });
      }
      var Fu = ED;
      function AD(e) {
        if (typeof e != "string")
          return null;
        var t = e.trim().match(/^([-+]?\d+)/);
        return t ? Number(t[1]) : null;
      }
      var Lt = AD, CD = function() {
        function e() {
          if (E.performance && E.performance)
            return E.performance.now();
        }
        var t = null, r = e();
        return {
          start: function() {
            this.mark("mark_axe_start");
          },
          end: function() {
            this.mark("mark_axe_end"), this.measure("axe", "mark_axe_start", "mark_axe_end"), this.logMeasures("axe");
          },
          auditStart: function() {
            this.mark("mark_audit_start");
          },
          auditEnd: function() {
            this.mark("mark_audit_end"), this.measure("audit_start_to_end", "mark_audit_start", "mark_audit_end"), this.logMeasures();
          },
          mark: function(n) {
            E.performance && E.performance.mark !== void 0 && E.performance.mark(n);
          },
          measure: function(n, i, o) {
            E.performance && E.performance.measure !== void 0 && E.performance.measure(n, i, o);
          },
          logMeasures: function(n) {
            function i(c) {
              vr("Measure " + c.name + " took " + c.duration + "ms");
            }
            if (E.performance && E.performance.getEntriesByType !== void 0)
              for (var o = E.performance.getEntriesByName("mark_axe_start")[0], u = E.performance.getEntriesByType("measure").filter(function(c) {
                return c.startTime >= o.startTime;
              }), s = 0; s < u.length; ++s) {
                var l = u[s];
                if (l.name === n) {
                  i(l);
                  return;
                }
                i(l);
              }
          },
          timeElapsed: function() {
            return e() - r;
          },
          reset: function() {
            t || (t = e()), r = e();
          }
        };
      }(), ve = CD;
      function B1() {
        if (L.elementsFromPoint)
          return L.elementsFromPoint;
        if (L.msElementsFromPoint)
          return L.msElementsFromPoint;
        var e = function() {
          var n = L.createElement("x");
          return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
        }(), t = e ? "pointer-events" : "visibility", r = e ? "none" : "hidden", a = L.createElement("style");
        return a.innerHTML = e ? "* { pointer-events: all }" : "* { visibility: visible }", function(n, i) {
          var o, u, s, l = [], c = [];
          for (L.head.appendChild(a); (o = L.elementFromPoint(n, i)) && l.indexOf(o) === -1; )
            l.push(o), c.push({
              value: o.style.getPropertyValue(t),
              priority: o.style.getPropertyPriority(t)
            }), o.style.setProperty(t, r, "important");
          for (l.indexOf(L.documentElement) < l.length - 1 && (l.splice(l.indexOf(L.documentElement), 1), l.push(L.documentElement)), u = c.length; s = c[--u]; )
            l[u].style.setProperty(t, s.value ? s.value : "", s.priority);
          return L.head.removeChild(a), l;
        };
      }
      typeof E.addEventListener == "function" && (L.elementsFromPoint = B1());
      function FD(e, t) {
        return e.concat(t).filter(function(r, a, n) {
          return n.indexOf(r) === a;
        });
      }
      var Ia = FD;
      function q1(e, t, r, a, n) {
        var i = n || {};
        return i.vNodes = e, i.vNodesIndex = 0, i.anyLevel = t, i.thisLevel = r, i.parentShadowId = a, i;
      }
      function TD(e, t, r) {
        for (var a = ue.get("qsa.recycledLocalVariables", function() {
          return [];
        }), n = [], i = Array.isArray(e) ? e : [e], o = q1(i, t, null, e[0].shadowId, a.pop()), u = []; o.vNodesIndex < o.vNodes.length; ) {
          for (var s, l, c = o.vNodes[o.vNodesIndex++], d = null, f = null, p = (((s = o.anyLevel) === null || s === void 0 ? void 0 : s.length) || 0) + (((l = o.thisLevel) === null || l === void 0 ? void 0 : l.length) || 0), m = !1, h = 0; h < p; h++) {
            var v, g, b, D = h < (((v = o.anyLevel) === null || v === void 0 ? void 0 : v.length) || 0) ? o.anyLevel[h] : o.thisLevel[h - (((g = o.anyLevel) === null || g === void 0 ? void 0 : g.length) || 0)];
            if ((!D[0].id || c.shadowId === o.parentShadowId) && Or(c, D[0]))
              if (D.length === 1)
                !m && (!r || r(c)) && (u.push(c), m = !0);
              else {
                var w = D.slice(1);
                if ([" ", ">"].includes(w[0].combinator) === !1)
                  throw new Error("axe.utils.querySelectorAll does not support the combinator: " + D[1].combinator);
                w[0].combinator === ">" ? (d = d || []).push(w) : (f = f || []).push(w);
              }
            (!D[0].id || c.shadowId === o.parentShadowId) && (b = o.anyLevel) !== null && b !== void 0 && b.includes(D) && (f = f || []).push(D);
          }
          for (c.children && c.children.length && (n.push(o), o = q1(c.children, f, d, c.shadowId, a.pop())); o.vNodesIndex === o.vNodes.length && n.length; )
            a.push(o), o = n.pop();
        }
        return u;
      }
      function RD(e, t, r) {
        e = Array.isArray(e) ? e : [e];
        var a = nn(t), n = w1(e, a, r);
        return n || TD(e, a, r);
      }
      var Bt = RD;
      function SD(e) {
        var t = e.treeRoot, r = t === void 0 ? x._tree[0] : t, a = kD(r);
        if (!a.length)
          return Promise.resolve();
        var n = L.implementation.createHTMLDocument("Dynamic document for loading cssom"), i = M1(n);
        return OD(a, i).then(function(o) {
          return z1(o);
        });
      }
      var j1 = SD;
      function kD(e) {
        var t = [], r = Bt(e, "*", function(a) {
          return t.includes(a.shadowId) ? !1 : (t.push(a.shadowId), !0);
        }).map(function(a) {
          return {
            shadowId: a.shadowId,
            rootNode: pa(a.actualNode)
          };
        });
        return Ia(r, []);
      }
      function OD(e, t) {
        var r = [];
        return e.forEach(function(a, n) {
          var i = a.rootNode, o = a.shadowId, u = MD(i, o, t);
          if (!u)
            return Promise.all(r);
          var s = n + 1, l = {
            rootNode: i,
            shadowId: o,
            convertDataToStylesheet: t,
            rootIndex: s
          }, c = [], d = Promise.all(u.map(function(f, p) {
            var m = [s, p];
            return Cu(f, l, m, c);
          }));
          r.push(d);
        }), Promise.all(r);
      }
      function z1(e) {
        return e.reduce(function(t, r) {
          return Array.isArray(r) ? t.concat(z1(r)) : t.concat(r);
        }, []);
      }
      function MD(e, t, r) {
        var a;
        return e.nodeType === 11 && t ? a = ID(e, r) : a = PD(e), LD(a);
      }
      function ID(e, t) {
        return Array.from(e.children).filter(ND).reduce(function(r, a) {
          var n = a.nodeName.toUpperCase(), i = n === "STYLE" ? a.textContent : a, o = n === "LINK", u = t({
            data: i,
            isLink: o,
            root: e
          });
          return u.sheet && r.push(u.sheet), r;
        }, []);
      }
      function PD(e) {
        return Array.from(e.styleSheets).filter(function(t) {
          return t.media ? V1(t.media.mediaText) : !1;
        });
      }
      function ND(e) {
        var t = e.nodeName.toUpperCase(), r = e.getAttribute("href"), a = e.getAttribute("rel"), n = t === "LINK" && r && a && e.rel.toUpperCase().includes("STYLESHEET"), i = t === "STYLE";
        return i || n && V1(e.media);
      }
      function V1(e) {
        return e ? !e.toUpperCase().includes("PRINT") : !0;
      }
      function LD(e) {
        var t = [];
        return e.filter(function(r) {
          return r.href ? t.includes(r.href) ? !1 : (t.push(r.href), !0) : !0;
        });
      }
      function BD(e) {
        var t = e.treeRoot, r = t === void 0 ? x._tree[0] : t, a = Bt(r, "video[autoplay], audio[autoplay]", function(n) {
          var i = n.actualNode;
          if (i.preload === "none" && i.readyState === 0 && i.networkState !== i.NETWORK_LOADING || i.hasAttribute("paused") || i.hasAttribute("muted"))
            return !1;
          if (i.hasAttribute("src"))
            return !!i.getAttribute("src");
          var o = Array.from(i.getElementsByTagName("source")).filter(function(u) {
            return !!u.getAttribute("src");
          });
          return !(o.length <= 0);
        });
        return Promise.all(a.map(function(n) {
          var i = n.actualNode;
          return qD(i);
        }));
      }
      var H1 = BD;
      function qD(e) {
        return new Promise(function(t) {
          e.readyState > 0 && t(e);
          function r() {
            e.removeEventListener("loadedmetadata", r), t(e);
          }
          e.addEventListener("loadedmetadata", r);
        });
      }
      function $1(e) {
        var t = {
          cssom: j1,
          media: H1
        };
        return U1(e) ? new Promise(function(r, a) {
          var n = G1(e), i = n.assets, o = n.timeout, u = setTimeout(function() {
            return a(new Error("Preload assets timed out."));
          }, o);
          Promise.all(i.map(function(s) {
            return t[s](e).then(function(l) {
              return Hp({}, s, l);
            });
          })).then(function(s) {
            var l = s.reduce(function(c, d) {
              return de({}, c, d);
            }, {});
            clearTimeout(u), r(l);
          }).catch(function(s) {
            clearTimeout(u), a(s);
          });
        }) : Promise.resolve();
      }
      function jD(e) {
        return O(e) === "object" && Array.isArray(e.assets);
      }
      function U1(e) {
        return !e || e.preload === void 0 || e.preload === null ? !0 : typeof e.preload == "boolean" ? e.preload : jD(e.preload);
      }
      function G1(e) {
        var t = se.preload, r = t.assets, a = t.timeout, n = {
          assets: r,
          timeout: a
        };
        if (!e.preload || typeof e.preload == "boolean")
          return n;
        var i = e.preload.assets.every(function(o) {
          return r.includes(o.toLowerCase());
        });
        if (!i)
          throw new Error("Requested assets, not supported. Supported assets are: ".concat(r.join(", "), "."));
        return n.assets = Ia(e.preload.assets.map(function(o) {
          return o.toLowerCase();
        }), []), e.preload.timeout && typeof e.preload.timeout == "number" && !isNaN(e.preload.timeout) && (n.timeout = e.preload.timeout), n;
      }
      function ei(e) {
        var t = x._audit.data.checks || {}, r = x._audit.data.rules || {}, a = fa(x._audit.rules, "id", e.id) || {};
        e.tags = $t(a.tags || []);
        var n = W1(t, !0, a), i = W1(t, !1, a);
        e.nodes.forEach(function(o) {
          o.any.forEach(n), o.all.forEach(n), o.none.forEach(i);
        }), no(e, $t(r[e.id] || {}));
      }
      function zD(e, t) {
        function r(n) {
          return n.incomplete && n.incomplete.default ? n.incomplete.default : gu();
        }
        if (e && e.missingData)
          try {
            var a = t.incomplete[e.missingData[0].reason];
            if (!a)
              throw new Error();
            return a;
          } catch {
            return typeof e.missingData == "string" ? t.incomplete[e.missingData] : r(t);
          }
        else return e && e.messageKey ? t.incomplete[e.messageKey] : r(t);
      }
      function W1(e, t, r) {
        return function(a) {
          var n = e[a.id] || {}, i = n.messages || {}, o = Object.assign({}, n);
          delete o.messages, !r.reviewOnFail && a.result === void 0 ? (O(i.incomplete) === "object" && !Array.isArray(a.data) && (o.message = zD(a.data, i)), o.message || (o.message = i.incomplete)) : o.message = a.result === t ? i.pass : i.fail, typeof o.message != "function" && (o.message = bu(o.message, a.data)), no(a, o);
        };
      }
      function VD(e, t) {
        return Bt(e, t);
      }
      var ft = VD;
      function Y1(e, t) {
        var r, a, n = x._audit && x._audit.tagExclude ? x._audit.tagExclude : [];
        t.hasOwnProperty("include") || t.hasOwnProperty("exclude") ? (r = t.include || [], r = Array.isArray(r) ? r : [r], a = t.exclude || [], a = Array.isArray(a) ? a : [a], a = a.concat(n.filter(function(o) {
          return r.indexOf(o) === -1;
        }))) : (r = Array.isArray(t) ? t : [t], a = n.filter(function(o) {
          return r.indexOf(o) === -1;
        }));
        var i = r.some(function(o) {
          return e.tags.indexOf(o) !== -1;
        });
        return i || r.length === 0 && e.enabled !== !1 ? a.every(function(o) {
          return e.tags.indexOf(o) === -1;
        }) : !1;
      }
      function HD(e, t, r) {
        var a = r.runOnly || {}, n = (r.rules || {})[e.id];
        return e.pageLevel && !t.page ? !1 : a.type === "rule" ? a.values.indexOf(e.id) !== -1 : n && typeof n.enabled == "boolean" ? n.enabled : a.type === "tag" && a.values ? Y1(e, a.values) : Y1(e, []);
      }
      var K1 = HD;
      function X1(e, t) {
        if (!t)
          return e;
        var r = e.cloneNode(!1), a = en(r);
        if (r.nodeType === 1) {
          var n = r.outerHTML;
          r = ue.get(n, function() {
            return Z1(r, a, e, t);
          });
        } else
          r = Z1(r, a, e, t);
        return Array.from(e.childNodes).forEach(function(i) {
          r.appendChild(X1(i, t));
        }), r;
      }
      function Z1(e, t, r, a) {
        return t && (e = L.createElement(e.nodeName), Array.from(t).forEach(function(n) {
          $D(r, n.name, a) || e.setAttribute(n.name, n.value);
        })), e;
      }
      function $D(e, t, r) {
        return typeof r[t] > "u" ? !1 : r[t] === !0 ? !0 : kr(e, r[t]);
      }
      function Tu(e, t) {
        var r = [], a;
        if (x._selectCache)
          for (var n = 0, i = x._selectCache.length; n < i; n++) {
            var o = x._selectCache[n];
            if (o.selector === e)
              return o.result;
          }
        for (var u = UD(t.include), s = GD(t), l = 0; l < u.length; l++) {
          a = u[l];
          var c = Bt(a, e, s);
          r = WD(r, c);
        }
        return x._selectCache && x._selectCache.push({
          selector: e,
          result: r
        }), r;
      }
      function UD(e) {
        return e.reduce(function(t, r) {
          return (!t.length || !Ut(t[t.length - 1], r)) && t.push(r), t;
        }, []);
      }
      function GD(e) {
        return !e.exclude || e.exclude.length === 0 ? null : function(t) {
          return xu(t, e);
        };
      }
      function WD(e, t) {
        if (e.length === 0)
          return t;
        if (e.length < t.length) {
          var r = e;
          e = t, t = r;
        }
        for (var a = 0, n = t.length; a < n; a++)
          e.includes(t[a]) || e.push(t[a]);
        return e;
      }
      function YD(e, t, r) {
        if (e === E)
          return e.scroll(r, t);
        e.scrollTop = t, e.scrollLeft = r;
      }
      function KD(e) {
        e.forEach(function(t) {
          var r = t.elm, a = t.top, n = t.left;
          return YD(r, a, n);
        });
      }
      var XD = KD;
      function ZD(e) {
        var t = Array.isArray(e) ? ne(e) : [e];
        return J1(t, L);
      }
      function J1(e, t) {
        var r = e.shift(), a = r ? t.querySelector(r) : null;
        return e.length === 0 ? a : a != null && a.shadowRoot ? J1(e, a.shadowRoot) : null;
      }
      function Ru(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : L, r = Array.isArray(e) ? ne(e) : [e];
        return e.length === 0 ? [] : Q1(r, t);
      }
      function Q1(e, t) {
        var r = Vp(e), a = r[0], n = r.slice(1), i = t.querySelectorAll(a);
        if (n.length === 0)
          return Array.from(i);
        var o = [], u = Ce(i), s;
        try {
          for (u.s(); !(s = u.n()).done; ) {
            var l = s.value;
            l != null && l.shadowRoot && o.push.apply(o, ne(Q1(n, l.shadowRoot)));
          }
        } catch (c) {
          u.e(c);
        } finally {
          u.f();
        }
        return o;
      }
      function JD() {
        return ["hidden", "text", "search", "tel", "url", "email", "password", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button"];
      }
      var ti = JD, ef = [, [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, , 1, 1, 1, , 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, , 1, 1, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, , , 1, 1, 1, , 1, , 1, , 1, 1], [1, 1, 1, , 1, 1, , 1, 1, 1, , 1, , , 1, 1, 1, , , 1, 1, 1, , , , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, , , , , 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1], [, 1, , , , , , 1, , 1, , , , , 1, , 1, , , , 1, 1, , 1, , , 1], [1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , 1, 1, 1, 1, , , 1, , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , 1, 1, , , 1, , , , , 1, 1, 1, , 1, , 1, , 1, , , , , , 1], [1, , 1, 1, 1, 1, , , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [1, , 1, , 1, , , , , 1, , 1, 1, 1, 1, 1, , , , 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, , 1, 1, 1, , , 1, 1, 1, 1, 1, 1, 1, 1], [, , 1, , , 1, , 1, , , , 1, 1, 1, , , , , , , , , , , 1], [1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1], [1, 1, 1, 1, 1, , , 1, , , 1, , , 1, 1, 1, , , , , 1, , , , , , 1]], [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1], [, 1, 1, , 1, , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, , 1, 1, 1, 1, 1, 1, 1, , 1], [, 1, , 1, 1, 1, , 1, 1, , 1, , 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, , , 1, 1, , , , , , 1, 1], [1, 1, 1, , , , , 1, , , , 1, 1, , 1, , , , , , 1, , , , , 1], [, 1, , , 1, , , 1, , , , , , 1], [, 1, , 1, , , , 1, , , , 1], [1, , 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , , 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , , 1, , , 1, , 1, 1, , 1, , 1, , , , , 1, , 1], [, 1, , , , 1, , , 1, 1, , 1, , 1, 1, 1, 1, , 1, 1, , , 1, , , 1], [, 1, 1, , , , , , 1, , , , 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1], [, 1, , 1, 1, 1, , , 1, 1, 1, 1, 1, 1, , 1, , , , , 1, 1, , 1, , 1], [, 1, , 1, , 1, , 1, , 1, , 1, 1, 1, 1, 1, , , 1, 1, 1], [, 1, 1, 1, , , , 1, 1, 1, , 1, 1, , , 1, 1, , 1, 1, 1, 1, , 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, , 1, 1, 1, , 1, , , , , 1, 1, 1, , , 1, , 1, , , 1, 1], [, , , , 1, , , , , , , , , , , , , , , , , 1], [1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1], [, 1, , 1, 1, 1, , 1, 1, , , , 1, 1, 1, 1, 1, , , 1, 1, 1, , , , , 1], [1, 1, 1, 1, , , , 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, , , , , , , 1, , , , , , , 1], [, 1, 1, , 1, 1, , 1, , , , , , , , , , , , , 1], , [1, 1, 1, , , , , , , , , , , , , 1], [, , , , , , , , 1, , , 1, , , 1, 1, , , , , 1]], [, [1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [, 1, 1, , 1, 1, 1, 1, , 1, 1, , 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1], [, , , 1, , , , , , , , , , , , , , , 1], [, 1, , , 1, 1, , 1, , 1, 1, , , , 1, 1, , , 1, 1, , , , 1], [1, , , 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, , , 1, , , , 1], , [, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, , 1, 1, , , 1, 1, 1, 1, , 1, 1, , 1], [, 1, , , 1, , , 1, , 1, , , 1, 1, 1, 1, , , 1, 1, , 1, 1, 1, 1], [, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, 1, 1, , , 1, , , 1, , 1], [, 1, , , , , , , , , , 1, 1, , , , , , 1, 1, , , , , 1], [, , , , , , , 1, , , , 1, , 1, 1], [, 1, 1, 1, 1, 1, 1, 1, , , , 1, 1, 1, 1, 1, , , 1, 1, , 1, 1, 1, 1, 1], [, 1, , , 1, 1, , 1, , 1, 1, 1, , , 1, 1, , , 1, , 1, 1, 1, 1, , 1], [, 1, 1, 1, , 1, 1, , 1, 1, , 1, 1, , 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1], [, , , , , , , , , , , , , , , , 1], , [, 1, 1, 1, 1, 1, , 1, 1, 1, , , 1, , 1, 1, , 1, 1, 1, 1, 1, , 1, , 1], [, , 1, , , 1, , , 1, 1, , , 1, , 1, 1, , 1], [, 1, 1, , 1, , , , 1, 1, , 1, , 1, 1, 1, 1, , 1, 1, 1, 1, , , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [1, 1], [, 1, , , , , , , , , , 1, 1, , , , , , 1, 1, , 1, , 1, , 1, 1], , [, 1, 1, , 1, , , 1, , 1, , , , 1, 1, 1, , , , , , 1, , , , 1], [1, 1, , , 1, 1, , 1, , , , , 1, , 1]], [, [, 1], [, , , 1, , , , 1, , , , 1, , , , 1, , , 1, , , 1], [, , , , , , , , , , , , , , , , , , 1, 1, , , , , , 1], , [1, , , , , 1], [, 1, , , , 1, , , , 1], [, 1, , , , , , , , , , , 1, , , 1, , , , , , , , , 1, 1], [, , , , , , , , , , , , , , , , , , , , , 1], [, , , , , , , , , , , , , , , , 1, , , , 1, , 1], [, 1], [, 1, , 1, , 1, , 1, , 1, , 1, 1, 1, , 1, 1, , 1, , , , , , , 1], [1, , , , , 1, , , 1, 1, , 1, , 1, , 1, 1, , , , , 1, , , 1], [, 1, 1, , , 1, , 1, , 1, , 1, , 1, 1, 1, 1, , , 1, , 1, , 1, 1, 1], [1, 1, 1, 1, 1, , 1, , 1, , , , 1, 1, 1, 1, , 1, 1, , , 1, 1, 1, 1], [1, , , , , , , , , , , , , , , , , , , , 1], [, , , , , , , , , 1], , [, 1, , , , , , 1, 1, 1, , 1, , , , 1, , , 1, 1, 1, , , 1], [1, , , , , 1, , 1, 1, 1, , 1, 1, 1, 1, 1, , 1, , 1, , 1, , , 1, 1], [1, , 1, 1, , , , , 1, , , , , , 1, 1, , , 1, 1, 1, 1, , , 1, , 1], [1, , , , , , , , , , , , , , , , , 1], [, , , , , 1, , , 1, , , , , , 1], [, , , , , , , , , , , , , , , 1], [, , , , , , , , , , , , , , , , , , , , 1], [, 1, , , , , , , , , , , , , , 1], [, 1, , , , 1]], [, [1, 1, 1, , 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, , 1, 1, , , 1, 1, 1], [, , , , , , , , , , , , 1], [, , , , , , , , , , , , , , , , , , , 1], , [, , , , , , , , , , , , , , , , , , 1], [1, , , , , , , , , 1, , , , 1], [, , , , , , , , , , , , , , , , , , 1], , [1, 1, , , , 1, 1, , , , , , 1, , , , 1, , 1, , 1, 1, , 1], [1], [, , , , , , , , , , , 1, , , , , , , , , , , 1], [, 1, , , , , , , 1, 1, , , 1, , 1, , , , 1, , , , , , , 1], [, , , , , , , , , , , , , , , , 1, , , , , 1], [, , 1, , , , , 1, , 1], [1, , , , 1, , , , , 1, , , , 1, 1, , , , 1, 1, , , , , 1], [, , , , , 1], [, , , , , , , , , , , , , , , , , , , 1], [1, , , 1, 1, , , , , , , 1, , 1, , 1, 1, 1, 1, 1, 1], [, , , , , 1, , , , , , , 1, , , , , , , 1], , [, , 1, 1, 1, 1, 1, , 1, 1, 1, , , 1, 1, , , 1, 1, , 1, 1, 1, , , 1], [, , , , , , , , , , , , , , , , , , 1], [, 1, , , , 1], , [1]], [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [, , , 1, 1, 1, 1, , , , , , 1, , 1, , , , 1, , 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , , 1], [, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, , , , 1, , 1, , , 1, 1, 1, 1, 1], [, , , , , , , , , , , 1, , , , , , , , , 1, , , , 1], [, 1, 1, , 1, 1, , 1, , , , 1, 1, , 1, 1, , , 1, , 1, 1, , 1], [, 1, , 1, , 1, , , 1, , , 1, 1, , 1, 1, , , 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, 1, , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [, , , , , , , , , 1, , 1, , 1, 1, , , , 1, , , 1], [, 1, , , 1, 1, , , , , , , , , 1, 1, 1, , , , , 1], [1, , , 1, 1, , , , 1, 1, 1, 1, 1, , , 1, , , 1, , , 1, , 1, , 1], [, 1, 1, , 1, 1, , 1, 1, , , , 1, 1, 1, , , 1, 1, , , 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, , 1, 1, , 1, , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [, 1, , , , 1, , , , , , , , , 1], [, 1, , , , , , , , 1, , , , , 1, , , , 1, , , 1], [, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, , 1, , 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , , , , 1, , 1, , , , , 1, 1, 1, 1, 1, , , 1, , , , 1], [, 1, , , , , , , , 1, , , , , , , , , , , , 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1], [1, 1, , 1, , 1, 1, , , , 1, , 1, 1, 1, 1, 1, , 1, 1, , , , , , 1], [, 1, 1, 1, 1, 1, 1, 1, , 1, 1, , , 1, 1, , , , 1, , 1, 1, , 1, 1], [, , , , , , , , , , , , , , , , , , , , , , , , 1], [, 1, 1, , 1, 1, 1, 1, , 1, , , 1, 1, 1, 1, , , 1, , , , , , , 1], [, 1, , , , , , , , 1, , , , , 1]], [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1], [, 1, 1, , , , , , , , , , , , 1, 1, , , , , , 1], [, 1, , , , , , , 1], [, , , , , , , , , , , , , , 1, , , , , 1, , , , , , 1], [1, 1, , , 1, , , 1, 1, 1, , , , 1], , [, , , , , , , , , , , , , 1, , , , , , , , , , 1], [, , , , , , , , , 1, , , , , , , , , 1, , , , , , , 1], [1, 1, 1, , 1, , 1, 1, 1, 1, 1, 1, 1, 1, , 1, , , 1, , 1, , , 1, 1], [, , , , , , , , , 1], [, 1, , , , 1, , , , , , 1, , , 1, , , , , 1], [, 1, 1, , 1, 1, , , , , , , , , , , , , , , 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , , 1, 1, , 1, 1, 1, 1, , , , 1, 1, , , , 1, , 1], [1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, 1, , 1, 1, , 1, 1, 1, , 1, 1, , 1, 1], [, , , , , , , , , , , , , , , 1, , , , 1], , [1, 1, , 1, , 1, , , , , , 1, , 1, , 1, 1, , 1, , 1, 1, , 1, 1, , 1], [, , 1, , , , , , 1, , , , 1, , 1, , , , , 1], [1, , , , , , , , , 1, , , , , , 1, , , , 1, , 1, , , 1], [1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , , 1, , 1, , , , , , 1, , , 1, , , , , , , , 1], [, 1, , 1, , , , , , , , , , , , 1], , [1, 1, , , , , , , , , , , , , , , , , , , , , , 1, 1], [1]], [, [1, , , , , , , , , 1, , , , , 1, , 1, , 1], [, 1, 1, , 1, 1, , 1, 1, 1, , , 1, 1, 1, , , , 1, , , 1, , , , 1], [, 1, , , , , , , 1, , , , 1, , , , , , 1], [1, 1, 1, 1, 1, 1, , , , 1, , , , , , , , , 1, 1, 1, 1], [1], [, 1, 1, , , 1, 1, , , , , 1, , 1, , , , , , , , 1, , , , 1], [1, , 1, , , 1, , 1, , , , , 1, 1, 1, 1, , , , 1, , , , 1], [, , 1, , , , , , , 1, , , , , , , 1, , , , , , , 1], [1, , , , , , , , , , , , , , 1, , , , 1], [, , , 1, , 1, , , , , 1, , , , 1, 1, , , , 1], [1, , , , , 1, , , , 1, , 1, 1, , , 1, 1, , 1, 1, 1, , 1, 1, 1, , 1], [, 1, 1, , , , , 1, , 1, , 1, 1, 1, , 1, 1, , , 1, , 1, 1, 1], [, 1, , , , 1, , , , 1, , , 1, , 1, 1, , , 1, 1, , , , , , 1], [1, , 1, 1, , 1, , 1, 1, , 1, , 1, 1, 1, 1, 1, , , 1, 1, , , , , , 1], [1, , , , , , , , , , , , , , , , , , 1, , , 1, , 1], [, , , , , , , , , 1, , , , , , 1], [, , , , , , , , , , , , , , , , , , , , , 1, , 1], [, 1, , , , 1, , , 1, 1, , 1, , , 1, 1, , , 1, , , 1, , , 1, 1], [1, 1, , 1, 1, 1, , 1, 1, 1, , 1, , 1, 1, 1, , , 1, , 1, 1], [1, , 1, 1, 1, 1, , , , 1, , 1, 1, 1, , 1, , , 1, 1, 1, , 1, 1, 1, 1, 1], [1, , , , , , , , , , , , , 1], [, , 1, , , , , , , , , , , , , , , , , , , , 1], [1, , , , , , , , , , , 1, , 1, , 1, , , , 1], [, , , 1, , , , , , , , , 1], [, 1, , , , , , , , , , , , , , 1, , , , , , , , , 1], [, , , , , , , , 1, 1, , , , , , , , , 1, , , , , , , , 1]], [, [1, 1, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , , 1, 1, 1], [, , , , , 1, , , , 1, 1, 1, , , 1, 1, , , 1, , 1, 1, , 1], [, , , , , , , , , , , , , , , , , , , 1, 1], [, 1, , , , , , 1, , , , , , , , , , , , , 1], [, , 1, , , 1, , 1, 1, 1, , 1, 1, , 1, , , , 1, , 1, 1], , [, , 1, , , 1, , , , , , 1, , , , 1], [, , , , , , , , , 1, , , , , , , , , , 1], [1, 1, 1, 1, 1, 1, , 1, 1, 1, , , 1, 1, , 1, , 1, , , 1, 1, 1, , , 1], [, , , , , 1, , , , , , , , , , , , , 1], [, 1, , , , , , , , , , , , 1, , 1, 1, , 1, , , 1], [, , , , , 1, , , , , , , , , , , , , , 1], [, 1, 1, 1, 1, , , , , 1, , , 1, , 1, , , , 1, 1, , , , 1, 1], [, 1, , , 1, , , 1, , 1, 1, , 1, , , , , , , 1], [, , 1, , 1, , , 1, , , , , , , , , , , 1, 1, , , , 1], [, 1, , , , , , , , , , , , , , , , , 1, , , , , , 1], [, , , , , , , , , , , , , , , , , , 1], [, 1, 1, , , , , , , , , , , , , , , , 1, , 1, 1], [, , , , , , , , , , , , 1], , [, 1, 1, 1, 1, , , , 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1, , 1], [1, , , , 1, , , , , , , , , , 1], [1, , , , , , , , , 1], , [, 1, , , , 1, , , , , , , , , , , , , , , , , , , , 1]], [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, 1, , , , 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1, , 1, 1, 1, 1], [1, 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , , 1, 1, 1, 1, , 1, , , , 1, 1, , , 1, 1, , 1], [, 1, 1, , 1, , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , , , , , , , , , , , , 1], [1, 1, 1, , , , , 1, 1, 1, , 1, 1, 1, 1, , , 1, 1, , 1, 1, , , , , 1], [, 1, , , , , , , 1, 1, , , 1, 1, 1, , 1, , , 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [, 1, , , , 1, , , , 1, , , 1, , , , 1, , , , , , , 1, 1], [, 1, 1, 1, 1, 1, , , 1, 1, 1, , 1, 1, 1, 1, , , 1, 1, 1, 1, , , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, 1], [1, 1, 1, , 1, , , 1, 1, 1, 1, , 1, 1, 1, 1, , , , 1, , 1, , 1, , , 1], [1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , , , 1, , , , , , , , , 1, 1, , , , , , , , , 1], , [, 1, , 1, , 1, , 1, , 1, , 1, 1, 1, 1, 1, , , 1, , 1, , 1, , , , 1], [, 1, , , 1, 1, , 1, 1, 1, , , 1, 1, 1, 1, 1, , 1, 1, 1, , 1, , , 1], [1, , , 1, , , , 1, 1, 1, , , , , 1, 1, , , , 1, , 1], [1, 1, , 1, 1, 1, 1, , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1], [1, 1, , , , , , , , 1, , 1, , , , , , , , 1, , 1], [, 1, , , , 1, , 1, 1, , , , 1, 1, , 1, , , , 1, 1, 1, , 1], , [, 1, , , , , , 1, , , , , , , 1], [, , , , , , , , 1, , , , 1, , 1, , , , , , , , , , , , 1]], [, [, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, , 1, 1, , 1, 1, , 1, 1, 1, 1, 1, 1, , 1], [, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1], [, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , 1, , 1], [1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , , 1, , , , , , , , 1, , , , , , 1, , , 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, , 1, , , , 1, 1, 1, , 1, 1, 1, 1, , , 1, 1, 1, 1, , , 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1], [1, 1, , 1, , 1, , 1, , 1, 1, 1, 1, 1, 1, 1, , 1, 1, , , 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1], [, 1, 1, , , , , 1, 1, 1, , , 1, , 1, 1, , , , 1, , 1, , , 1, 1], [, , , , , , , 1, , , , 1, 1, 1, 1, 1, , 1, , , , , , , , 1], [1, 1, 1, 1, , 1, 1, 1, , 1, , 1, 1, 1, 1, , 1, , 1, , 1, 1, , , 1, , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , , , 1, 1, , 1, , 1, 1, 1, , 1, , 1, 1, , 1, 1, , 1, , 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, , , , , , , , 1, , , , , 1, , 1], [, 1, 1, 1, , 1, , 1, , 1, , , , 1, , 1, , , 1, , , , , , 1, 1], [, 1, , , 1, 1, , 1, , 1, , 1, 1, 1, 1, 1, , 1, 1, , , 1, , , 1], [1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, , 1, , , , , 1, , 1, , 1, , , , , , 1, , 1, , , , 1, 1]], [, [, 1, , 1, , , , , , , , , , , , , , , 1, , , , 1], [, , , , , , , , , 1, , 1, 1, 1, , 1, , , 1, , 1, 1], [1, 1, , , , , , , 1, , , , , , , 1, , , , , , 1], [, 1, , , , , , , , , , 1, , , , , , , , , 1, 1], , [, , , , , , , , , , , , , , , 1, , , , 1, , 1], [, , 1, 1, , 1, , 1, , , , , , , , 1, , , , , , 1], [, , , , , , , , , , , , , , , , , , , , 1, 1], [, 1, , , , , , , , , , , , , 1], [1, , 1, 1, , , , 1, , , , , , , , , 1, , , 1, , , 1, 1], [, 1, 1, , 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, , 1, 1, , 1], [, 1, , , 1, 1, , , , , , 1, , 1, , 1, , , 1, , 1, 1], [1, 1, 1, 1, , 1, , 1, , 1, , 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1], [, 1, 1, , , 1, , 1, , 1, 1, 1, , , 1, 1, 1, , 1, 1, 1, 1, , 1, 1], [, , , , 1, , , 1, , , , , , , 1, , , , 1, 1], [, 1, , , , , , , , , , 1, , 1, , 1, , , , , 1, , , , , 1], , [1, 1, , 1, , 1, , 1, 1, , , , , , 1, 1, , , 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, , 1, , , , , , 1, , , , , , 1, 1, , , , 1, 1, , , 1], [, 1, 1, , 1, 1, , , , 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1], [, 1, 1, , , 1, , , , 1, , , , 1, 1], [, , , , 1], [, , , , , , , , , 1, , , 1], , [, , 1, , 1, , , , , , , , , 1, , , , , , , , , , , , 1], [, , , , , , , , , , , , , 1]], [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , 1, 1, , 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , , 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, , , , , 1], [, 1, , 1, , , , , , 1, , , , , 1, 1, , , , , 1, 1], [, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, , , 1, , 1, 1, 1], [, 1, , , , 1, , , , , , , 1], [, 1, , , 1, , , 1, , 1, , 1, 1, , 1, , , , , 1, , 1, , , , 1, 1], [, 1, , , 1, , , 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, , 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , , , , , , , , , , , , , , , , , , , 1], [, 1, 1, 1, , , , 1, 1, , , , , , 1, 1, 1, , 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1], [, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , , 1, 1, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, 1, 1, , 1, 1, , 1, 1, 1, 1, 1], [, 1, , , , 1, , , , 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , , , 1, , , , , , , , 1, , , , , , , , , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [1, 1, , 1, 1, 1, , 1, 1, 1, , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1], [1, 1, , , , , , , 1, 1, , , , , 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1], [, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, , 1, 1, 1, 1, , 1, 1, , 1, 1, 1, 1], , [, 1, 1, , , , , 1, , 1, , , , 1, 1, 1, , , 1, , , , , 1], [, , , , , , , , , , , , , 1], [, , , , , 1, , , , , , , , 1, 1, , , , , 1, , 1, , , 1, 1], [, , , , , , , , , , , , , , 1]], [, [, 1], , , , , , , , , , , , , , , , , , , , [1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, , , 1, 1, 1, 1, 1], [, 1, , 1, , 1, , , 1, 1, 1, , 1, 1, 1, 1, 1, , , 1, , , , 1, , 1, 1], [, 1, , 1, , 1, , , 1, , , , , 1, , , , , , 1, 1], [, 1, , 1, , , , , 1, , , , 1, , 1, 1, 1, 1, 1, 1, 1, 1, , 1], [, 1, , , , , , , , , , , , , , , 1]], [, [, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , 1, , , , , , , , , 1, 1, , , , 1], [, , , , , , 1], [, , 1], [, 1, 1, , , 1, , 1, , 1, 1, , 1, 1, 1, , , , 1, 1, 1, , , , , 1], , [, 1, , , , 1, , , , , , 1, , , 1, , , , 1, 1, , 1], [, , , , , , , 1, , , , , , , , , 1], [, 1, , , , 1, 1, , , , , , 1, 1, 1, , , , 1, , 1, 1], [, , , , , , , 1, , 1, , , , , , , , , , 1], [, 1, 1, , , , , , 1, 1, , , , 1, , , , , , , 1, , , 1], , [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, , , 1, , , 1, , , , , 1, , 1, , 1, , 1, , , , , 1], [1, 1, 1, 1, 1, 1, 1, 1, , , , , 1, 1, , 1, 1, , 1, , , 1, , 1], [, , , , , , , , , , , , , , 1, , , , , , 1], , [, , , , , , , , , 1, , , , , , 1, , , , , 1], [, , 1, , , , , , , 1, , , 1, 1], [, , , 1, , , , , 1, , , , , 1, , , , , , 1, , , , 1], [1, , 1, 1, , 1, 1, 1, 1, 1, , 1, , , , 1, 1, 1, , , 1, 1, , , , 1, 1], , [1, 1, , , , , , , , , , 1, , 1, , 1, , , 1], [, , , , 1, , , , , , , , , , , , , , , , , , , 1], [, , , , , , , , , , , , , , 1, , , , , 1, , 1], [, , , , , , , , 1]], [, [1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, , , 1, 1, 1, 1, 1, , 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1], [, , 1, , , 1, , , , , , , , 1, , , , , , 1, , , , 1], [1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, , 1, 1, , 1, , , , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1], [1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, , 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [, , 1, 1, 1, 1, , 1, , 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1], [1, 1, , , , , , , 1, , 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1], [1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1], [1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1], [1, 1, 1, 1, , 1, , 1, , 1, 1, 1, 1, 1, , , , 1, 1, 1, 1, , 1, 1, 1, 1, 1], [1, 1, 1, 1, , 1, , , , , , 1, , 1, , , , , 1, 1, , , , , 1], [1, , 1, 1, , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , 1, 1, , 1, , 1, , , , 1, 1, 1, 1, 1, , , 1, 1, , 1, , 1], [, 1, 1, 1, 1, , , , , 1, , 1, 1, 1, 1, 1, , , 1, 1, , , , 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, , , , , 1, , 1, , 1, , , 1, , , 1, 1, , 1]], [, [1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , , , , , , , , 1, , , , , 1, 1, , , 1, , 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, , , 1, 1, 1, 1, , 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , , , , , 1, , 1, 1, , 1, 1, 1, 1, 1, , , 1, , 1, , 1], [1, 1, 1, , 1, 1, 1, 1, , , , 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1], [1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [, 1, , 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1], [, , 1, , , , , , , , , , 1, 1, 1, 1, 1, 1, 1, , 1, 1, , 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , , 1, 1, , , , , , 1, 1, 1, 1, 1, , , , 1, 1, 1, , 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, , , , 1, 1, 1, 1, 1, 1, 1, , 1, 1, , 1, 1, 1], [, 1, 1, 1, , 1, , 1, 1, 1, 1, , , 1, 1, 1, , 1, 1, 1, 1, 1, , , 1, 1], [1, 1, , , , 1, , , 1, 1, 1, , 1, , 1, , 1, , 1, 1, 1, 1, 1, , 1, , 1], [, 1, , , , , , , 1, , 1, , 1, 1, 1, 1, , , , , , , , , 1]], [, [, , , , , , , , , , , , , 1, 1, , , , 1], [, 1, , , , , , , , 1, , , 1, , , , , , 1, , , 1, , , , 1], , [, 1, , , , 1, , 1, , 1, 1, , 1, 1, , , , , , , , 1], [, , , , , , , , , , , , , , , , , , , 1], [, , , , , , , , , 1], [1, 1, 1, , , 1, , , , , , , , , 1, 1, , , , , , , , , , 1], [, 1, , , , , , , , , , , , , 1], [, , , , , , , , , , , , , , , , , , , 1, , , 1], [, , , , , , , , , 1], [1, 1, , , , , , 1, 1, 1, , 1, 1, , , , 1, 1, , 1, , 1, 1, 1, , 1], [, 1, 1, 1, , 1, 1, , , 1, , 1, 1, 1, 1, , , , , , , 1, , 1], [, 1, 1, 1, 1, , , 1, , 1, , , , 1, 1, 1, 1, , 1, 1, , 1], [, 1, , , 1, 1, , 1, , , , 1, , 1, 1, , 1, , 1, , , 1, , , 1, , 1], [, , , , , , , , , , , 1], [, , , , , , , , , 1, , , , , , , , , , , , , 1], , [1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, 1, 1, 1, 1], [, 1, , , , , , , 1, 1, , 1, , , , , 1, , , 1, , 1], [, 1, , , , 1, , , 1, , , , , , , , 1, , 1, , , 1], [, , , , , , , , , , , , , 1, 1, , , , 1, , , 1], [, , , , , 1, , , 1, , , , 1], [, 1], , [, 1], [1, , , , , , , , , , , , , , 1, , , , , 1]], [, [, 1, , , , 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, , 1, 1, , , 1], [, , 1, , , , , , , , , 1], , , [1, , , 1, 1, , , , , , , , 1, 1, , 1, 1, , 1], , [, , , , , , , , , , , , , , , , , , 1, , 1], , [1, , , 1, 1, , 1, 1, , , , , 1, , 1, , , , , 1, 1, , 1], , [, 1, , , , , , , , 1, 1, 1, 1, 1, , 1, 1, , , , 1, 1], [, , , , , , , , , , , , , , , , 1, , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1], [, , , , , , , , , , , 1, , 1, , , 1], [1, , , , , , , , , , , , , , , , , , 1, , 1], , , [, 1, , , , , , , , , , , , , , 1, , , , 1, 1], [, , , , , , , , , 1, , , 1, , , , , , , , , , 1], [, , , , , , , , , , , , , , , 1], [, , , , , , , , , , , , , 1, 1, , , , , , 1], , [, 1]], [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, , , 1, 1, , 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, , 1, 1], [, 1, , , , , , , , 1], [, , , , 1, , , 1, , , 1, 1, , , , , , , , , , 1, , , , 1], [, 1, , 1, 1, , , 1, 1, 1, , , , 1, 1, 1, 1, , 1, 1, 1, 1, , 1], [, , , , , , , 1], [, 1, 1, , , , , 1, , 1, , , , , , 1, , , , , , 1, , 1, , 1], [, 1, , , , , , 1, , , , 1, , , , , , , , , , 1], [, , 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , 1, , 1, 1, 1, 1, , 1], [, 1, , , , , , , , 1], [, 1, 1, , 1, , , , , , , , 1, , , , , , 1, , , 1, , 1, , 1], [, 1, , 1, , 1, , 1, 1, 1, , 1, 1, 1, , 1, , , 1, 1, , 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , , 1, 1, , , , 1, 1, 1, , , , 1, 1, , , 1, 1], [, , 1, 1, 1, 1, , 1, , 1, , 1, , 1, 1, 1, 1, , , , , 1, , 1, , 1], [1, 1, 1, 1, 1, 1, 1, 1, , 1, , 1, , 1, 1, 1, , , 1, 1, , , , 1, , 1], [, , , 1], , [, 1, 1, , 1, , , 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, , 1, 1, 1, 1, 1, 1], [, 1, , , , , , 1, , 1, , 1, , , , , , , 1, 1, , 1, 1], [, , , , , , 1, , 1, 1, , 1, , 1, , , , , , , , , , 1], [, 1, 1, , 1, , , , 1, , , , 1, 1, 1, , , , 1, , 1, 1, 1, , 1, 1], , [, 1, 1, , , , , , , , , , , , , 1, , , 1, , , , , 1], [, 1, , , , , , , , , , , , , , , , , , , , , , 1], [, 1, 1, , , , , , , 1, , , , 1, , , , , 1, , , , , , , 1]], [, [, 1, 1, 1, 1, 1, , 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1], [, 1, 1, 1, 1, 1, , 1, , 1, 1, , , 1, 1, 1, 1, , 1, , , , , 1, 1, 1], [, , 1, 1, , 1, , 1, 1, , , , 1, 1, 1, 1, , , 1, , 1, 1, 1, 1, , 1], [, 1, , 1, , , , , , , , 1, , 1, , 1, , , , , , , , , , 1], [, , 1, , 1, , , 1, , , , , 1, 1, , , 1, , 1, 1, 1, 1], [, 1], [, 1, 1, , 1, , 1, 1, , 1, , , 1, 1, 1, , , , 1, , , 1, , 1], [1, 1, , 1, 1, 1, , , , , , , , , , , , , 1, , 1, 1, 1], [, 1, 1, , , , , , , 1, , , 1, , 1, , 1, , 1, 1, , , 1, , , 1], [, , 1, , , , , , , , , , , , , , , , , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, 1, 1, 1, , 1, , 1, , , , , 1, 1, 1, , , 1, , 1, , , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, , 1, , , 1, 1, 1, , 1, , 1, 1, 1, , , 1, 1, 1, 1, , , , 1, 1], [, , , 1, 1, , , 1, , 1, , 1, , 1, 1, 1, 1, , 1, , , , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , , , , , , , , , , , , , , , , , , 1], [, 1, 1, , 1, 1, , 1, , 1, , , , 1, 1, , , 1, 1, , 1, 1, , 1], [, 1, 1, 1, 1, 1, , , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, , , 1], [, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1], [, 1, 1, , 1, , , 1, , , 1, , 1, 1, 1, 1, 1, , 1, , 1, 1], [, , , , , 1, , , , 1, , , , , 1, 1, , , , 1], [, 1, , 1, 1, 1, , 1, , , 1, 1, 1, , , 1, , , 1, , 1, , , 1], [, , 1, , , , , , , , , 1, , 1, , , , , 1, , 1], [, 1, 1, , , , , , , , 1, 1, 1, , , , , , , , 1, , , , , 1], [, , , , , , , , 1, , , , , 1, , , 1]], [, [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, 1, , 1, 1, , , 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , , 1, 1], [, , , , , , , , 1, , , , 1, , 1, , 1], [, 1, , , 1, 1, , 1, , , , 1, , , , , , , , 1], [, 1, , 1, , 1, , , , 1, 1, , 1, , 1, , , , 1, 1, 1, 1, 1, , , 1], , [, 1, , , , , , , , 1, , , 1, 1, , , 1, , 1, 1, , 1, , 1], [, 1, , , 1, , , , , , , , 1, , , , , , , 1], [1, 1, , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1], , [, 1, , , , , , 1, , 1, , 1, 1, 1, 1, 1, , , 1, , 1, 1, , , , 1], [, 1, 1, , , 1, , 1, , 1, , , 1, 1, 1, 1, , , 1, , , 1, , , , 1], [, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , 1, , 1], [, 1, , , 1, 1, , 1, 1, , , 1, 1, , 1, 1, , 1, , 1, , 1], [1, , 1, , , , , 1, , 1, , 1, 1, 1, 1, , , , , 1, 1, , , , 1, 1], [, 1, 1, , , , , 1, 1, , , 1, , 1, 1, 1, 1, , , , , , , , , , 1], , [, 1, 1, , , 1, , , , 1, , 1, 1, 1, 1, 1, , , , 1, , , , 1, , 1], [, , , 1, 1, , , 1, , , , , 1, , 1, 1, 1, , 1, 1, , , , , , 1], [, 1, , , , , , , , , , , 1, , , , 1, , , , , , , 1, , 1], [, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, , 1, 1, 1, 1], [, 1, , , , , , , , , , , , , , , , , , , 1], [, 1, , , , , , 1, , , , , 1, , 1, , , 1, 1, , 1, 1, , 1], [, 1, , , , , , 1, , , , , 1, 1, , , , , , , , 1, , , , 1], [, , , , , , , , , , , , , , , , , , 1, , , 1, , , , , 1], [, , , , , , , 1, , , , 1]], [, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , 1, , 1, , , , , , , 1, , , , , , , , 1, , , 1], [, 1, , , , , , , 1], [, , , , , , , , , , 1], [, 1, , , , , , 1, 1, , , , , , 1], , [, 1, 1, , , , , , 1, , , , , 1, 1, , , , 1], [1, , 1, , 1, , , , , 1, , , , , 1, , , , , , , , , 1, 1], [, 1, 1, , , , , , , , , 1, 1, 1, 1, , , , 1, , , , , 1, , , 1], , [, 1, 1, , 1, , , 1, 1, , , 1, , , 1, 1, 1, , 1, , 1, 1, 1, , , , 1], [, , , , , 1, , , , , 1, , , 1, 1, , , 1, , 1, , , , 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, 1, , , 1, 1, , 1, , , , 1, , , , , , , , 1], [, , , 1, , , , , 1, , , , , 1, , 1, , 1, 1, 1], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [, , , , , 1], [, 1, , , , , , 1, , , , , , , 1, 1, 1, , , 1], [, 1, , , , , , , , , , 1, 1, 1, , , , , 1, , , 1], [, , , , , 1, , 1, , , , , 1, 1, 1, , 1, 1, , 1, 1, 1, , , 1, 1], [1, 1, , , , , , , 1, , , , , 1, 1, , , , , , , , , , , 1], , [, 1], [, , , , , , , , , , , , , , , , , , , , , , , , 1], [, , 1, , , , , 1, , , 1, , , , 1, , 1], [, 1, , , , , , , , , 1]]];
      function QD(e) {
        for (var t = ef; e.length < 3; )
          e += "`";
        for (var r = 0; r <= e.length - 1; r++) {
          var a = e.charCodeAt(r) - 96;
          if (t = t[a], !t)
            return !1;
        }
        return !0;
      }
      function tf(e) {
        e = Array.isArray(e) ? e : ef;
        var t = [];
        return e.forEach(function(r, a) {
          var n = String.fromCharCode(a + 96).replace("`", "");
          Array.isArray(r) ? t = t.concat(tf(r).map(function(i) {
            return n + i;
          })) : t.push(n);
        }), t;
      }
      var ri = QD, e_ = function(e) {
        function t(r) {
          var a;
          return Tt(this, t), a = hi(this, t), a._props = r_(r), a._attrs = a_(r), a;
        }
        return gi(t, e), Rt(t, [{
          key: "props",
          get: function() {
            return this._props;
          }
        }, {
          key: "attr",
          value: function(a) {
            var n;
            return (n = this._attrs[a]) !== null && n !== void 0 ? n : null;
          }
        }, {
          key: "hasAttr",
          value: function(a) {
            return this._attrs[a] !== void 0;
          }
        }, {
          key: "attrNames",
          get: function() {
            return Object.keys(this._attrs);
          }
        }]);
      }($e), Su = {
        "#cdata-section": 2,
        "#text": 3,
        "#comment": 8,
        "#document": 9,
        "#document-fragment": 11
      }, rf = {}, t_ = Object.keys(Su);
      t_.forEach(function(e) {
        rf[Su[e]] = e;
      });
      function r_(e) {
        var t, r, a, n = (t = e.nodeName) !== null && t !== void 0 ? t : rf[e.nodeType], i = (r = (a = e.nodeType) !== null && a !== void 0 ? a : Su[e.nodeName]) !== null && r !== void 0 ? r : 1;
        me(typeof i == "number", "nodeType has to be a number, got '".concat(i, "'")), me(typeof n == "string", "nodeName has to be a string, got '".concat(n, "'")), n = n.toLowerCase();
        var o = null;
        n === "input" && (o = (e.type || e.attributes && e.attributes.type || "").toLowerCase(), ti().includes(o) || (o = "text"));
        var u = de({}, e, {
          nodeType: i,
          nodeName: n
        });
        return o && (u.type = o), delete u.attributes, Object.freeze(u);
      }
      function a_(e) {
        var t = e.attributes, r = t === void 0 ? {} : t, a = {
          htmlFor: "for",
          className: "class"
        };
        return Object.keys(r).reduce(function(n, i) {
          var o = r[i];
          if (me(O(o) !== "object" || o === null, "expects attributes not to be an object, '".concat(i, "' was")), o !== void 0) {
            var u = a[i] || i;
            n[u] = o !== null ? String(o) : null;
          }
          return n;
        }, {});
      }
      var af = e_;
      function n_(e, t) {
        if (e = e || function() {
        }, t = t || x.log, !x._audit)
          throw new Error("No audit configured");
        var r = x.utils.queue(), a = [];
        Object.keys(x.plugins).forEach(function(i) {
          r.defer(function(o) {
            var u = function(l) {
              a.push(l), o();
            };
            try {
              x.plugins[i].cleanup(o, u);
            } catch (s) {
              u(s);
            }
          });
        });
        var n = x.utils.getFlattenedTree(L.body);
        x.utils.querySelectorAll(n, "iframe, frame").forEach(function(i) {
          r.defer(function(o, u) {
            return x.utils.sendCommandToFrame(i.actualNode, {
              command: "cleanup-plugin"
            }, o, u);
          });
        }), r.then(function(i) {
          a.length === 0 ? e(i) : t(a);
        }).catch(t);
      }
      var nf = n_, Pa = {}, of;
      function uf(e) {
        return Pa.hasOwnProperty(e);
      }
      function ku(e) {
        return typeof e == "string" && Pa[e] ? Pa[e] : typeof e == "function" ? e : of;
      }
      function i_(e, t, r) {
        Pa[e] = t, r && (of = t);
      }
      function o_(e) {
        var t = x._audit;
        if (!t)
          throw new Error("No audit configured");
        if (e.axeVersion || e.ver) {
          var r = e.axeVersion || e.ver;
          if (!/^\d+\.\d+\.\d+(-canary)?/.test(r))
            throw new Error("Invalid configured version ".concat(r));
          var a = r.split("-"), n = $(a, 2), i = n[0], o = n[1], u = i.split(".").map(Number), s = $(u, 3), l = s[0], c = s[1], d = s[2], f = x.version.split("-"), p = $(f, 2), m = p[0], h = p[1], v = m.split(".").map(Number), g = $(v, 3), b = g[0], D = g[1], w = g[2];
          if (l !== b || D < c || D === c && w < d || l === b && c === D && d === w && o && o !== h)
            throw new Error("Configured version ".concat(r, " is not compatible with current axe version ").concat(x.version));
        }
        if (e.reporter && (typeof e.reporter == "function" || uf(e.reporter)) && (t.reporter = e.reporter), e.checks) {
          if (!Array.isArray(e.checks))
            throw new TypeError("Checks property must be an array");
          e.checks.forEach(function(F) {
            if (!F.id)
              throw new TypeError("Configured check ".concat(JSON.stringify(F), " is invalid. Checks must be an object with at least an id property"));
            t.addCheck(F);
          });
        }
        var _ = [];
        if (e.rules) {
          if (!Array.isArray(e.rules))
            throw new TypeError("Rules property must be an array");
          e.rules.forEach(function(F) {
            if (!F.id)
              throw new TypeError("Configured rule ".concat(JSON.stringify(F), " is invalid. Rules must be an object with at least an id property"));
            _.push(F.id), t.addRule(F);
          });
        }
        if (e.disableOtherRules && t.rules.forEach(function(F) {
          _.includes(F.id) === !1 && (F.enabled = !1);
        }), typeof e.branding < "u" ? t.setBranding(e.branding) : t._constructHelpUrls(), e.tagExclude && (t.tagExclude = e.tagExclude), e.locale && t.applyLocale(e.locale), e.standards && Vb(e.standards), e.noHtml && (t.noHtml = !0), e.allowedOrigins) {
          if (!Array.isArray(e.allowedOrigins))
            throw new TypeError("Allowed origins property must be an array");
          if (e.allowedOrigins.includes("*"))
            throw new Error('"*" is not allowed. Use "'.concat(se.allOrigins, '" instead'));
          t.setAllowedOrigins(e.allowedOrigins);
        }
      }
      var u_ = o_;
      function s_(e) {
        Et.updateMessenger(e);
      }
      function l_(e) {
        e = e || [];
        var t = e.length ? x._audit.rules.filter(function(a) {
          return !!e.filter(function(n) {
            return a.tags.indexOf(n) !== -1;
          }).length;
        }) : x._audit.rules, r = x._audit.data.rules || {};
        return t.map(function(a) {
          var n = r[a.id] || {};
          return {
            ruleId: a.id,
            description: n.description,
            help: n.help,
            helpUrl: n.helpUrl,
            tags: a.tags,
            actIds: a.actIds
          };
        });
      }
      var c_ = l_;
      function d_(e, t, r) {
        var a = ["SCRIPT", "HEAD", "TITLE", "NOSCRIPT", "STYLE", "TEMPLATE"];
        if (!a.includes(e.nodeName.toUpperCase()) && _a(r)) {
          var n = E.getComputedStyle(e);
          if (n.getPropertyValue("display") === "none")
            return;
          if (n.getPropertyValue("visibility") === "hidden") {
            var i = Ue(e), o = i && E.getComputedStyle(i);
            if (!o || o.getPropertyValue("visibility") !== "hidden")
              return;
          }
        }
        return !0;
      }
      var f_ = d_, sf = {};
      Dt(sf, {
        getAllCells: function() {
          return Ou;
        },
        getCellPosition: function() {
          return _n;
        },
        getHeaders: function() {
          return ai;
        },
        getScope: function() {
          return Eo;
        },
        isColumnHeader: function() {
          return jr;
        },
        isDataCell: function() {
          return cf;
        },
        isDataTable: function() {
          return ni;
        },
        isHeader: function() {
          return b_;
        },
        isRowHeader: function() {
          return zr;
        },
        toArray: function() {
          return Wt;
        },
        toGrid: function() {
          return Wt;
        },
        traverse: function() {
          return Mu;
        }
      });
      function p_(e) {
        var t, r, a, n, i = [];
        for (t = 0, a = e.rows.length; t < a; t++)
          for (r = 0, n = e.rows[t].cells.length; r < n; r++)
            i.push(e.rows[t].cells[r]);
        return i;
      }
      var Ou = p_;
      function lf(e, t, r) {
        for (var a = e === "row" ? "_rowHeaders" : "_colHeaders", n = e === "row" ? zr : jr, i = r[t.y][t.x], o = i.colSpan - 1, u = i.getAttribute("rowspan"), s = parseInt(u) === 0 || i.rowspan === 0 ? r.length : i.rowSpan, l = s - 1, c = t.y + l, d = t.x + o, f = e === "row" ? t.y : 0, p = e === "row" ? 0 : t.x, m, h = [], v = c; v >= f && !m; v--)
          for (var g = d; g >= p; g--) {
            var b = r[v] ? r[v][g] : void 0;
            if (b) {
              var D = x.utils.getNodeFromTree(b);
              if (D[a]) {
                m = D[a];
                break;
              }
              h.push(b);
            }
          }
        return m = (m || []).concat(h.filter(n)), h.forEach(function(w) {
          var _ = x.utils.getNodeFromTree(w);
          _[a] = m;
        }), m;
      }
      function m_(e, t) {
        if (e.getAttribute("headers")) {
          var r = Ot(e, "headers");
          if (r.filter(function(o) {
            return o;
          }).length)
            return r;
        }
        t || (t = Wt(Lr(e, "table")));
        var a = _n(e, t), n = lf("row", a, t), i = lf("col", a, t);
        return [].concat(n, i).reverse();
      }
      var ai = m_;
      function h_(e) {
        if (!e.children.length && !e.textContent.trim())
          return !1;
        var t = e.getAttribute("role");
        return qr(t) ? ["cell", "gridcell"].includes(t) : e.nodeName.toUpperCase() === "TD";
      }
      var cf = h_;
      function v_(e) {
        var t = (e.getAttribute("role") || "").toLowerCase();
        if ((t === "presentation" || t === "none") && !Ne(e))
          return !1;
        if (e.getAttribute("contenteditable") === "true" || Lr(e, '[contenteditable="true"]') || t === "grid" || t === "treegrid" || t === "table" || At(t) === "landmark")
          return !0;
        if (e.getAttribute("datatable") === "0")
          return !1;
        if (e.getAttribute("summary") || e.tHead || e.tFoot || e.caption)
          return !0;
        for (var r = 0, a = e.children.length; r < a; r++)
          if (e.children[r].nodeName.toUpperCase() === "COLGROUP")
            return !0;
        for (var n = 0, i = e.rows.length, o, u, s = !1, l = 0; l < i; l++) {
          o = e.rows[l];
          for (var c = 0, d = o.cells.length; c < d; c++) {
            if (u = o.cells[c], u.nodeName.toUpperCase() === "TH" || (!s && (u.offsetWidth !== u.clientWidth || u.offsetHeight !== u.clientHeight) && (s = !0), u.getAttribute("scope") || u.getAttribute("headers") || u.getAttribute("abbr")) || ["columnheader", "rowheader"].includes((u.getAttribute("role") || "").toLowerCase()) || u.children.length === 1 && u.children[0].nodeName.toUpperCase() === "ABBR")
              return !0;
            n++;
          }
        }
        if (e.getElementsByTagName("table").length || i < 2)
          return !1;
        var f = e.rows[Math.ceil(i / 2)];
        if (f.cells.length === 1 && f.cells[0].colSpan === 1)
          return !1;
        if (f.cells.length >= 5 || s)
          return !0;
        for (var p, m, h = 0; h < i; h++) {
          if (o = e.rows[h], p && p !== E.getComputedStyle(o).getPropertyValue("background-color") || (p = E.getComputedStyle(o).getPropertyValue("background-color"), m && m !== E.getComputedStyle(o).getPropertyValue("background-image")))
            return !0;
          m = E.getComputedStyle(o).getPropertyValue("background-image");
        }
        return i >= 20 ? !0 : !(so(e).width > pn(E).width * 0.95 || n < 10 || e.querySelector("object, embed, iframe, applet"));
      }
      var ni = v_;
      function g_(e) {
        if (jr(e) || zr(e))
          return !0;
        if (e.getAttribute("id")) {
          var t = Oe(e.getAttribute("id"));
          return !!L.querySelector('[headers~="'.concat(t, '"]'));
        }
        return !1;
      }
      var b_ = g_;
      function df(e, t, r, a) {
        var n, i = r[t.y] ? r[t.y][t.x] : void 0;
        return i ? typeof a == "function" && (n = a(i, t, r), n === !0) ? [i] : (n = df(e, {
          x: t.x + e.x,
          y: t.y + e.y
        }, r, a), n.unshift(i), n) : [];
      }
      function y_(e, t, r, a) {
        if (Array.isArray(t) && (a = r, r = t, t = {
          x: 0,
          y: 0
        }), typeof e == "string")
          switch (e) {
            case "left":
              e = {
                x: -1,
                y: 0
              };
              break;
            case "up":
              e = {
                x: 0,
                y: -1
              };
              break;
            case "right":
              e = {
                x: 1,
                y: 0
              };
              break;
            case "down":
              e = {
                x: 0,
                y: 1
              };
              break;
          }
        return df(e, {
          x: t.x + e.x,
          y: t.y + e.y
        }, r, a);
      }
      var Mu = y_;
      function w_(e) {
        var t = Ou(e), r = this, a = [];
        t.forEach(function(u) {
          var s = u.getAttribute("headers");
          s && (a = a.concat(s.split(/\s+/)));
          var l = u.getAttribute("aria-labelledby");
          l && (a = a.concat(l.split(/\s+/)));
        });
        var n = t.filter(function(u) {
          return re(u.textContent) === "" ? !1 : u.nodeName.toUpperCase() === "TH" || ["rowheader", "columnheader"].indexOf(u.getAttribute("role")) !== -1;
        }), i = Wt(e), o = !0;
        return n.forEach(function(u) {
          if (!(u.getAttribute("id") && a.includes(u.getAttribute("id")))) {
            var s = _n(u, i), l = !1;
            jr(u) && (l = Mu("down", s, i).find(function(c) {
              return !jr(c) && ai(c, i).includes(u);
            })), !l && zr(u) && (l = Mu("right", s, i).find(function(c) {
              return !zr(c) && ai(c, i).includes(u);
            })), l || r.relatedNodes(u), o = o && l;
          }
        }), o ? !0 : void 0;
      }
      var D_ = w_;
      function __(e) {
        for (var t = [], r = [], a = [], n = 0; n < e.rows.length; n++)
          for (var i = e.rows[n], o = 0; o < i.cells.length; o++)
            t.push(i.cells[o]);
        var u = t.filter(function(s) {
          return s.getAttribute("id");
        }).map(function(s) {
          return s.getAttribute("id");
        });
        if (t.forEach(function(s) {
          var l = !1, c = !1;
          if (!(!s.hasAttribute("headers") || !Re(s))) {
            var d = s.getAttribute("headers").trim();
            if (!d)
              return r.push(s);
            var f = Ze(d);
            f.length !== 0 && (s.getAttribute("id") && (l = f.indexOf(s.getAttribute("id").trim()) !== -1), c = f.some(function(p) {
              return !u.includes(p);
            }), (l || c) && a.push(s));
          }
        }), a.length > 0)
          return this.relatedNodes(a), !1;
        if (r.length) {
          this.relatedNodes(r);
          return;
        }
        return !0;
      }
      var ff = {};
      Dt(ff, {
        allowedAttr: function() {
          return pf;
        },
        arialabelText: function() {
          return ba;
        },
        arialabelledbyText: function() {
          return ga;
        },
        getAccessibleRefs: function() {
          return Iu;
        },
        getElementUnallowedRoles: function() {
          return vf;
        },
        getExplicitRole: function() {
          return De;
        },
        getImplicitRole: function() {
          return Mt;
        },
        getOwnedVirtual: function() {
          return wa;
        },
        getRole: function() {
          return ce;
        },
        getRoleType: function() {
          return At;
        },
        getRolesByType: function() {
          return I_;
        },
        getRolesWithNameFromContents: function() {
          return L_;
        },
        implicitNodes: function() {
          return q_;
        },
        implicitRole: function() {
          return Mt;
        },
        isAccessibleRef: function() {
          return ii;
        },
        isAriaRoleAllowedOnElement: function() {
          return hf;
        },
        isComboboxPopup: function() {
          return Nu;
        },
        isUnsupportedRole: function() {
          return _o;
        },
        isValidRole: function() {
          return qr;
        },
        label: function() {
          return wf;
        },
        labelVirtual: function() {
          return An;
        },
        lookupTable: function() {
          return bf;
        },
        namedFromContents: function() {
          return Rc;
        },
        requiredAttr: function() {
          return Df;
        },
        requiredContext: function() {
          return Lu;
        },
        requiredOwned: function() {
          return Bu;
        },
        validateAttr: function() {
          return oi;
        },
        validateAttrValue: function() {
          return _f;
        }
      });
      function x_(e) {
        var t = he.ariaRoles[e], r = ne(Dr());
        return t && (t.allowedAttrs && r.push.apply(r, ne(t.allowedAttrs)), t.requiredAttrs && r.push.apply(r, ne(t.requiredAttrs))), r;
      }
      var pf = x_, E_ = /^idrefs?$/;
      function mf(e, t, r) {
        if (e.hasAttribute) {
          if (e.nodeName.toUpperCase() === "LABEL" && e.hasAttribute("for")) {
            var a = e.getAttribute("for");
            t.has(a) ? t.get(a).push(e) : t.set(a, [e]);
          }
          for (var n = 0; n < r.length; ++n) {
            var i = r[n], o = re(e.getAttribute(i) || "");
            if (o) {
              var u = Ce(Ze(o)), s;
              try {
                for (u.s(); !(s = u.n()).done; ) {
                  var l = s.value;
                  t.has(l) ? t.get(l).push(e) : t.set(l, [e]);
                }
              } catch (d) {
                u.e(d);
              } finally {
                u.f();
              }
            }
          }
        }
        for (var c = 0; c < e.childNodes.length; c++)
          e.childNodes[c].nodeType === 1 && mf(e.childNodes[c], t, r);
      }
      function A_(e) {
        var t;
        e = e.actualNode || e;
        var r = Xe(e);
        r = r.documentElement || r;
        var a = ue.get("idRefsByRoot", function() {
          return /* @__PURE__ */ new Map();
        }), n = a.get(r);
        if (!n) {
          n = /* @__PURE__ */ new Map(), a.set(r, n);
          var i = Object.keys(he.ariaAttrs).filter(function(o) {
            var u = he.ariaAttrs[o].type;
            return E_.test(u);
          });
          mf(r, n, i);
        }
        return (t = n.get(e.id)) !== null && t !== void 0 ? t : [];
      }
      var Iu = A_;
      function C_(e, t) {
        var r = e instanceof $e ? e : le(e), a = Mt(r), n = xr(r);
        return Array.isArray(n.allowedRoles) ? n.allowedRoles.includes(t) : t === a ? !1 : !!n.allowedRoles;
      }
      var hf = C_, F_ = ["doc-backlink", "doc-biblioentry", "doc-biblioref", "doc-cover", "doc-endnote", "doc-glossref", "doc-noteref"], T_ = {
        header: "banner",
        footer: "contentinfo"
      };
      function R_(e) {
        var t = [];
        if (!e)
          return t;
        if (e.hasAttr("role")) {
          var r = Ze(e.attr("role").toLowerCase());
          t = t.concat(r);
        }
        return t.filter(function(a) {
          return qr(a);
        });
      }
      function S_(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = we(e), a = r.vNode;
        if (!_u(a))
          return [];
        var n = a.props.nodeName, i = Mt(a) || T_[n], o = R_(a);
        return o.filter(function(u) {
          return !k_(u, a, t, i);
        });
      }
      function k_(e, t, r, a) {
        return r && e === a ? !0 : F_.includes(e) && At(e) !== a ? !1 : hf(t, e);
      }
      var vf = S_;
      function O_(e) {
        return Object.keys(he.ariaRoles).filter(function(t) {
          return he.ariaRoles[t].type === e;
        });
      }
      var Ur = O_;
      function M_(e) {
        return Ur(e);
      }
      var I_ = M_;
      function P_() {
        return ue.get("ariaRolesNameFromContent", function() {
          return Object.keys(he.ariaRoles).filter(function(e) {
            return he.ariaRoles[e].nameFromContent;
          });
        });
      }
      var Pu = P_;
      function N_() {
        return Pu();
      }
      var L_ = N_, gf = function(t) {
        return t === null;
      }, Je = function(t) {
        return t !== null;
      }, Kt = {};
      Kt.attributes = {
        "aria-activedescendant": {
          type: "idref",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-atomic": {
          type: "boolean",
          values: ["true", "false"],
          unsupported: !1
        },
        "aria-autocomplete": {
          type: "nmtoken",
          values: ["inline", "list", "both", "none"],
          unsupported: !1
        },
        "aria-busy": {
          type: "boolean",
          values: ["true", "false"],
          unsupported: !1
        },
        "aria-checked": {
          type: "nmtoken",
          values: ["true", "false", "mixed", "undefined"],
          unsupported: !1
        },
        "aria-colcount": {
          type: "int",
          unsupported: !1
        },
        "aria-colindex": {
          type: "int",
          unsupported: !1
        },
        "aria-colspan": {
          type: "int",
          unsupported: !1
        },
        "aria-controls": {
          type: "idrefs",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-current": {
          type: "nmtoken",
          allowEmpty: !0,
          values: ["page", "step", "location", "date", "time", "true", "false"],
          unsupported: !1
        },
        "aria-describedby": {
          type: "idrefs",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-describedat": {
          unsupported: !0,
          unstandardized: !0
        },
        "aria-details": {
          type: "idref",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-disabled": {
          type: "boolean",
          values: ["true", "false"],
          unsupported: !1
        },
        "aria-dropeffect": {
          type: "nmtokens",
          values: ["copy", "move", "reference", "execute", "popup", "none"],
          unsupported: !1
        },
        "aria-errormessage": {
          type: "idref",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-expanded": {
          type: "nmtoken",
          values: ["true", "false", "undefined"],
          unsupported: !1
        },
        "aria-flowto": {
          type: "idrefs",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-grabbed": {
          type: "nmtoken",
          values: ["true", "false", "undefined"],
          unsupported: !1
        },
        "aria-haspopup": {
          type: "nmtoken",
          allowEmpty: !0,
          values: ["true", "false", "menu", "listbox", "tree", "grid", "dialog"],
          unsupported: !1
        },
        "aria-hidden": {
          type: "boolean",
          values: ["true", "false"],
          unsupported: !1
        },
        "aria-invalid": {
          type: "nmtoken",
          allowEmpty: !0,
          values: ["true", "false", "spelling", "grammar"],
          unsupported: !1
        },
        "aria-keyshortcuts": {
          type: "string",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-label": {
          type: "string",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-labelledby": {
          type: "idrefs",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-level": {
          type: "int",
          unsupported: !1
        },
        "aria-live": {
          type: "nmtoken",
          values: ["off", "polite", "assertive"],
          unsupported: !1
        },
        "aria-modal": {
          type: "boolean",
          values: ["true", "false"],
          unsupported: !1
        },
        "aria-multiline": {
          type: "boolean",
          values: ["true", "false"],
          unsupported: !1
        },
        "aria-multiselectable": {
          type: "boolean",
          values: ["true", "false"],
          unsupported: !1
        },
        "aria-orientation": {
          type: "nmtoken",
          values: ["horizontal", "vertical"],
          unsupported: !1
        },
        "aria-owns": {
          type: "idrefs",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-placeholder": {
          type: "string",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-posinset": {
          type: "int",
          unsupported: !1
        },
        "aria-pressed": {
          type: "nmtoken",
          values: ["true", "false", "mixed", "undefined"],
          unsupported: !1
        },
        "aria-readonly": {
          type: "boolean",
          values: ["true", "false"],
          unsupported: !1
        },
        "aria-relevant": {
          type: "nmtokens",
          values: ["additions", "removals", "text", "all"],
          unsupported: !1
        },
        "aria-required": {
          type: "boolean",
          values: ["true", "false"],
          unsupported: !1
        },
        "aria-roledescription": {
          type: "string",
          allowEmpty: !0,
          unsupported: !1
        },
        "aria-rowcount": {
          type: "int",
          unsupported: !1
        },
        "aria-rowindex": {
          type: "int",
          unsupported: !1
        },
        "aria-rowspan": {
          type: "int",
          unsupported: !1
        },
        "aria-selected": {
          type: "nmtoken",
          values: ["true", "false", "undefined"],
          unsupported: !1
        },
        "aria-setsize": {
          type: "int",
          unsupported: !1
        },
        "aria-sort": {
          type: "nmtoken",
          values: ["ascending", "descending", "other", "none"],
          unsupported: !1
        },
        "aria-valuemax": {
          type: "decimal",
          unsupported: !1
        },
        "aria-valuemin": {
          type: "decimal",
          unsupported: !1
        },
        "aria-valuenow": {
          type: "decimal",
          unsupported: !1
        },
        "aria-valuetext": {
          type: "string",
          unsupported: !1
        }
      }, Kt.globalAttributes = ["aria-atomic", "aria-busy", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-dropeffect", "aria-flowto", "aria-grabbed", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-live", "aria-owns", "aria-relevant", "aria-roledescription"], Kt.role = {
        alert: {
          type: "widget",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        alertdialog: {
          type: "widget",
          attributes: {
            allowed: ["aria-expanded", "aria-modal", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["dialog", "section"]
        },
        application: {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage", "aria-activedescendant"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["article", "audio", "embed", "iframe", "object", "section", "svg", "video"]
        },
        article: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-posinset", "aria-setsize", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["article"],
          unsupported: !1
        },
        banner: {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["header"],
          unsupported: !1,
          allowedElements: ["section"]
        },
        button: {
          type: "widget",
          attributes: {
            allowed: ["aria-expanded", "aria-pressed", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          implicit: ["button", 'input[type="button"]', 'input[type="image"]', 'input[type="reset"]', 'input[type="submit"]', "summary"],
          unsupported: !1,
          allowedElements: [{
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        cell: {
          type: "structure",
          attributes: {
            allowed: ["aria-colindex", "aria-colspan", "aria-rowindex", "aria-rowspan", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["row"],
          implicit: ["td", "th"],
          unsupported: !1
        },
        checkbox: {
          type: "widget",
          attributes: {
            allowed: ["aria-checked", "aria-required", "aria-readonly", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          implicit: ['input[type="checkbox"]'],
          unsupported: !1,
          allowedElements: ["button"]
        },
        columnheader: {
          type: "structure",
          attributes: {
            allowed: ["aria-colindex", "aria-colspan", "aria-expanded", "aria-rowindex", "aria-rowspan", "aria-required", "aria-readonly", "aria-selected", "aria-sort", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["row"],
          implicit: ["th"],
          unsupported: !1
        },
        combobox: {
          type: "composite",
          attributes: {
            allowed: ["aria-autocomplete", "aria-required", "aria-activedescendant", "aria-orientation", "aria-errormessage"],
            required: ["aria-expanded"]
          },
          owned: {
            all: ["listbox", "tree", "grid", "dialog", "textbox"]
          },
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: [{
            nodeName: "input",
            properties: {
              type: ["text", "search", "tel", "url", "email"]
            }
          }]
        },
        command: {
          nameFrom: ["author"],
          type: "abstract",
          unsupported: !1
        },
        complementary: {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["aside"],
          unsupported: !1,
          allowedElements: ["section"]
        },
        composite: {
          nameFrom: ["author"],
          type: "abstract",
          unsupported: !1
        },
        contentinfo: {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["footer"],
          unsupported: !1,
          allowedElements: ["section"]
        },
        definition: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["dd", "dfn"],
          unsupported: !1
        },
        dialog: {
          type: "widget",
          attributes: {
            allowed: ["aria-expanded", "aria-modal", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["dialog"],
          unsupported: !1,
          allowedElements: ["section"]
        },
        directory: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          unsupported: !1,
          allowedElements: ["ol", "ul"]
        },
        document: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["body"],
          unsupported: !1,
          allowedElements: ["article", "embed", "iframe", "object", "section", "svg"]
        },
        "doc-abstract": {
          type: "section",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-acknowledgments": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-afterword": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-appendix": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-backlink": {
          type: "link",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          unsupported: !1,
          allowedElements: [{
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        "doc-biblioentry": {
          type: "listitem",
          attributes: {
            allowed: ["aria-expanded", "aria-level", "aria-posinset", "aria-setsize", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: ["doc-bibliography"],
          unsupported: !1,
          allowedElements: ["li"]
        },
        "doc-bibliography": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: {
            one: ["doc-biblioentry"]
          },
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-biblioref": {
          type: "link",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          unsupported: !1,
          allowedElements: [{
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        "doc-chapter": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-colophon": {
          type: "section",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-conclusion": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-cover": {
          type: "img",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1
        },
        "doc-credit": {
          type: "section",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-credits": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-dedication": {
          type: "section",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-endnote": {
          type: "listitem",
          attributes: {
            allowed: ["aria-expanded", "aria-level", "aria-posinset", "aria-setsize", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: ["doc-endnotes"],
          unsupported: !1,
          allowedElements: ["li"]
        },
        "doc-endnotes": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: {
            one: ["doc-endnote"]
          },
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-epigraph": {
          type: "section",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1
        },
        "doc-epilogue": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-errata": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-example": {
          type: "section",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["aside", "section"]
        },
        "doc-footnote": {
          type: "section",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["aside", "footer", "header"]
        },
        "doc-foreword": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-glossary": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: ["term", "definition"],
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["dl"]
        },
        "doc-glossref": {
          type: "link",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author", "contents"],
          context: null,
          unsupported: !1,
          allowedElements: [{
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        "doc-index": {
          type: "navigation",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["nav", "section"]
        },
        "doc-introduction": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-noteref": {
          type: "link",
          attributes: {
            allowed: ["aria-expanded"]
          },
          owned: null,
          namefrom: ["author", "contents"],
          context: null,
          unsupported: !1,
          allowedElements: [{
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        "doc-notice": {
          type: "note",
          attributes: {
            allowed: ["aria-expanded"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-pagebreak": {
          type: "separator",
          attributes: {
            allowed: ["aria-expanded"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["hr"]
        },
        "doc-pagelist": {
          type: "navigation",
          attributes: {
            allowed: ["aria-expanded"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["nav", "section"]
        },
        "doc-part": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-preface": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-prologue": {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-pullquote": {
          type: "none",
          attributes: {
            allowed: ["aria-expanded"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["aside", "section"]
        },
        "doc-qna": {
          type: "section",
          attributes: {
            allowed: ["aria-expanded"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        "doc-subtitle": {
          type: "sectionhead",
          attributes: {
            allowed: ["aria-expanded"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: {
            nodeName: ["h1", "h2", "h3", "h4", "h5", "h6"]
          }
        },
        "doc-tip": {
          type: "note",
          attributes: {
            allowed: ["aria-expanded"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["aside"]
        },
        "doc-toc": {
          type: "navigation",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          namefrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["nav", "section"]
        },
        feed: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: {
            one: ["article"]
          },
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["article", "aside", "section"]
        },
        figure: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          implicit: ["figure"],
          unsupported: !1
        },
        form: {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["form"],
          unsupported: !1
        },
        grid: {
          type: "composite",
          attributes: {
            allowed: ["aria-activedescendant", "aria-expanded", "aria-colcount", "aria-level", "aria-multiselectable", "aria-readonly", "aria-rowcount", "aria-errormessage"]
          },
          owned: {
            one: ["rowgroup", "row"]
          },
          nameFrom: ["author"],
          context: null,
          implicit: ["table"],
          unsupported: !1
        },
        gridcell: {
          type: "widget",
          attributes: {
            allowed: ["aria-colindex", "aria-colspan", "aria-expanded", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-readonly", "aria-required", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["row"],
          implicit: ["td", "th"],
          unsupported: !1
        },
        group: {
          type: "structure",
          attributes: {
            allowed: ["aria-activedescendant", "aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["details", "optgroup"],
          unsupported: !1,
          allowedElements: ["dl", "figcaption", "fieldset", "figure", "footer", "header", "ol", "ul"]
        },
        heading: {
          type: "structure",
          attributes: {
            required: ["aria-level"],
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          implicit: ["h1", "h2", "h3", "h4", "h5", "h6"],
          unsupported: !1
        },
        img: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["img"],
          unsupported: !1,
          allowedElements: ["embed", "iframe", "object", "svg"]
        },
        input: {
          nameFrom: ["author"],
          type: "abstract",
          unsupported: !1
        },
        landmark: {
          nameFrom: ["author"],
          type: "abstract",
          unsupported: !1
        },
        link: {
          type: "widget",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          implicit: ["a[href]", "area[href]"],
          unsupported: !1,
          allowedElements: ["button", {
            nodeName: "input",
            properties: {
              type: ["image", "button"]
            }
          }]
        },
        list: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: {
            all: ["listitem"]
          },
          nameFrom: ["author"],
          context: null,
          implicit: ["ol", "ul", "dl"],
          unsupported: !1
        },
        listbox: {
          type: "composite",
          attributes: {
            allowed: ["aria-activedescendant", "aria-multiselectable", "aria-readonly", "aria-required", "aria-expanded", "aria-orientation", "aria-errormessage"]
          },
          owned: {
            all: ["option"]
          },
          nameFrom: ["author"],
          context: null,
          implicit: ["select"],
          unsupported: !1,
          allowedElements: ["ol", "ul"]
        },
        listitem: {
          type: "structure",
          attributes: {
            allowed: ["aria-level", "aria-posinset", "aria-setsize", "aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["list"],
          implicit: ["li", "dt"],
          unsupported: !1
        },
        log: {
          type: "widget",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        main: {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["main"],
          unsupported: !1,
          allowedElements: ["article", "section"]
        },
        marquee: {
          type: "widget",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        math: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["math"],
          unsupported: !1
        },
        menu: {
          type: "composite",
          attributes: {
            allowed: ["aria-activedescendant", "aria-expanded", "aria-orientation", "aria-errormessage"]
          },
          owned: {
            one: ["menuitem", "menuitemradio", "menuitemcheckbox"]
          },
          nameFrom: ["author"],
          context: null,
          implicit: ['menu[type="context"]'],
          unsupported: !1,
          allowedElements: ["ol", "ul"]
        },
        menubar: {
          type: "composite",
          attributes: {
            allowed: ["aria-activedescendant", "aria-expanded", "aria-orientation", "aria-errormessage"]
          },
          owned: {
            one: ["menuitem", "menuitemradio", "menuitemcheckbox"]
          },
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["ol", "ul"]
        },
        menuitem: {
          type: "widget",
          attributes: {
            allowed: ["aria-posinset", "aria-setsize", "aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["menu", "menubar"],
          implicit: ['menuitem[type="command"]'],
          unsupported: !1,
          allowedElements: ["button", "li", {
            nodeName: "iput",
            properties: {
              type: ["image", "button"]
            }
          }, {
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        menuitemcheckbox: {
          type: "widget",
          attributes: {
            allowed: ["aria-checked", "aria-posinset", "aria-setsize", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["menu", "menubar"],
          implicit: ['menuitem[type="checkbox"]'],
          unsupported: !1,
          allowedElements: [{
            nodeName: ["button", "li"]
          }, {
            nodeName: "input",
            properties: {
              type: ["checkbox", "image", "button"]
            }
          }, {
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        menuitemradio: {
          type: "widget",
          attributes: {
            allowed: ["aria-checked", "aria-selected", "aria-posinset", "aria-setsize", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["menu", "menubar"],
          implicit: ['menuitem[type="radio"]'],
          unsupported: !1,
          allowedElements: [{
            nodeName: ["button", "li"]
          }, {
            nodeName: "input",
            properties: {
              type: ["image", "button", "radio"]
            }
          }, {
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        navigation: {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["nav"],
          unsupported: !1,
          allowedElements: ["section"]
        },
        none: {
          type: "structure",
          attributes: null,
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: [{
            nodeName: ["article", "aside", "dl", "embed", "figcaption", "fieldset", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "iframe", "li", "ol", "section", "ul"]
          }, {
            nodeName: "img",
            attributes: {
              alt: Je
            }
          }]
        },
        note: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["aside"]
        },
        option: {
          type: "widget",
          attributes: {
            allowed: ["aria-selected", "aria-posinset", "aria-setsize", "aria-checked", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["listbox"],
          implicit: ["option"],
          unsupported: !1,
          allowedElements: [{
            nodeName: ["button", "li"]
          }, {
            nodeName: "input",
            properties: {
              type: ["checkbox", "button"]
            }
          }, {
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        presentation: {
          type: "structure",
          attributes: null,
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: [{
            nodeName: ["article", "aside", "dl", "embed", "figcaption", "fieldset", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "iframe", "li", "ol", "section", "ul"]
          }, {
            nodeName: "img",
            attributes: {
              alt: Je
            }
          }]
        },
        progressbar: {
          type: "widget",
          attributes: {
            allowed: ["aria-valuetext", "aria-valuenow", "aria-valuemax", "aria-valuemin", "aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["progress"],
          unsupported: !1
        },
        radio: {
          type: "widget",
          attributes: {
            allowed: ["aria-selected", "aria-posinset", "aria-setsize", "aria-required", "aria-errormessage", "aria-checked"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          implicit: ['input[type="radio"]'],
          unsupported: !1,
          allowedElements: [{
            nodeName: ["button", "li"]
          }, {
            nodeName: "input",
            properties: {
              type: ["image", "button"]
            }
          }]
        },
        radiogroup: {
          type: "composite",
          attributes: {
            allowed: ["aria-activedescendant", "aria-required", "aria-expanded", "aria-readonly", "aria-errormessage", "aria-orientation"]
          },
          owned: {
            all: ["radio"]
          },
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: {
            nodeName: ["ol", "ul", "fieldset"]
          }
        },
        range: {
          nameFrom: ["author"],
          type: "abstract",
          unsupported: !1
        },
        region: {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["section[aria-label]", "section[aria-labelledby]", "section[title]"],
          unsupported: !1,
          allowedElements: {
            nodeName: ["article", "aside"]
          }
        },
        roletype: {
          type: "abstract",
          unsupported: !1
        },
        row: {
          type: "structure",
          attributes: {
            allowed: ["aria-activedescendant", "aria-colindex", "aria-expanded", "aria-level", "aria-selected", "aria-rowindex", "aria-errormessage"]
          },
          owned: {
            one: ["cell", "columnheader", "rowheader", "gridcell"]
          },
          nameFrom: ["author", "contents"],
          context: ["rowgroup", "grid", "treegrid", "table"],
          implicit: ["tr"],
          unsupported: !1
        },
        rowgroup: {
          type: "structure",
          attributes: {
            allowed: ["aria-activedescendant", "aria-expanded", "aria-errormessage"]
          },
          owned: {
            all: ["row"]
          },
          nameFrom: ["author", "contents"],
          context: ["grid", "table", "treegrid"],
          implicit: ["tbody", "thead", "tfoot"],
          unsupported: !1
        },
        rowheader: {
          type: "structure",
          attributes: {
            allowed: ["aria-colindex", "aria-colspan", "aria-expanded", "aria-rowindex", "aria-rowspan", "aria-required", "aria-readonly", "aria-selected", "aria-sort", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["row"],
          implicit: ["th"],
          unsupported: !1
        },
        scrollbar: {
          type: "widget",
          attributes: {
            required: ["aria-controls", "aria-valuenow"],
            allowed: ["aria-valuetext", "aria-orientation", "aria-errormessage", "aria-valuemax", "aria-valuemin"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1
        },
        search: {
          type: "landmark",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: {
            nodeName: ["aside", "form", "section"]
          }
        },
        searchbox: {
          type: "widget",
          attributes: {
            allowed: ["aria-activedescendant", "aria-autocomplete", "aria-multiline", "aria-readonly", "aria-required", "aria-placeholder", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ['input[type="search"]'],
          unsupported: !1,
          allowedElements: {
            nodeName: "input",
            properties: {
              type: "text"
            }
          }
        },
        section: {
          nameFrom: ["author", "contents"],
          type: "abstract",
          unsupported: !1
        },
        sectionhead: {
          nameFrom: ["author", "contents"],
          type: "abstract",
          unsupported: !1
        },
        select: {
          nameFrom: ["author"],
          type: "abstract",
          unsupported: !1
        },
        separator: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-orientation", "aria-valuenow", "aria-valuemax", "aria-valuemin", "aria-valuetext", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["hr"],
          unsupported: !1,
          allowedElements: ["li"]
        },
        slider: {
          type: "widget",
          attributes: {
            allowed: ["aria-valuetext", "aria-orientation", "aria-readonly", "aria-errormessage", "aria-valuemax", "aria-valuemin"],
            required: ["aria-valuenow"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ['input[type="range"]'],
          unsupported: !1
        },
        spinbutton: {
          type: "widget",
          attributes: {
            allowed: ["aria-valuetext", "aria-required", "aria-readonly", "aria-errormessage", "aria-valuemax", "aria-valuemin"],
            required: ["aria-valuenow"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ['input[type="number"]'],
          unsupported: !1,
          allowedElements: {
            nodeName: "input",
            properties: {
              type: ["text", "tel"]
            }
          }
        },
        status: {
          type: "widget",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ["output"],
          unsupported: !1,
          allowedElements: ["section"]
        },
        structure: {
          type: "abstract",
          unsupported: !1
        },
        switch: {
          type: "widget",
          attributes: {
            allowed: ["aria-errormessage"],
            required: ["aria-checked"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          unsupported: !1,
          allowedElements: ["button", {
            nodeName: "input",
            properties: {
              type: ["checkbox", "image", "button"]
            }
          }, {
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        tab: {
          type: "widget",
          attributes: {
            allowed: ["aria-selected", "aria-expanded", "aria-setsize", "aria-posinset", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["tablist"],
          unsupported: !1,
          allowedElements: [{
            nodeName: ["button", "h1", "h2", "h3", "h4", "h5", "h6", "li"]
          }, {
            nodeName: "input",
            properties: {
              type: "button"
            }
          }, {
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        table: {
          type: "structure",
          attributes: {
            allowed: ["aria-colcount", "aria-rowcount", "aria-errormessage"]
          },
          owned: {
            one: ["rowgroup", "row"]
          },
          nameFrom: ["author", "contents"],
          context: null,
          implicit: ["table"],
          unsupported: !1
        },
        tablist: {
          type: "composite",
          attributes: {
            allowed: ["aria-activedescendant", "aria-expanded", "aria-level", "aria-multiselectable", "aria-orientation", "aria-errormessage"]
          },
          owned: {
            all: ["tab"]
          },
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["ol", "ul"]
        },
        tabpanel: {
          type: "widget",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["section"]
        },
        term: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          implicit: ["dt"],
          unsupported: !1
        },
        textbox: {
          type: "widget",
          attributes: {
            allowed: ["aria-activedescendant", "aria-autocomplete", "aria-multiline", "aria-readonly", "aria-required", "aria-placeholder", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ['input[type="text"]', 'input[type="email"]', 'input[type="password"]', 'input[type="tel"]', 'input[type="url"]', "input:not([type])", "textarea"],
          unsupported: !1
        },
        timer: {
          type: "widget",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          unsupported: !1
        },
        toolbar: {
          type: "structure",
          attributes: {
            allowed: ["aria-activedescendant", "aria-expanded", "aria-orientation", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author"],
          context: null,
          implicit: ['menu[type="toolbar"]'],
          unsupported: !1,
          allowedElements: ["ol", "ul"]
        },
        tooltip: {
          type: "structure",
          attributes: {
            allowed: ["aria-expanded", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: null,
          unsupported: !1
        },
        tree: {
          type: "composite",
          attributes: {
            allowed: ["aria-activedescendant", "aria-multiselectable", "aria-required", "aria-expanded", "aria-orientation", "aria-errormessage"]
          },
          owned: {
            all: ["treeitem"]
          },
          nameFrom: ["author"],
          context: null,
          unsupported: !1,
          allowedElements: ["ol", "ul"]
        },
        treegrid: {
          type: "composite",
          attributes: {
            allowed: ["aria-activedescendant", "aria-colcount", "aria-expanded", "aria-level", "aria-multiselectable", "aria-readonly", "aria-required", "aria-rowcount", "aria-orientation", "aria-errormessage"]
          },
          owned: {
            one: ["rowgroup", "row"]
          },
          nameFrom: ["author"],
          context: null,
          unsupported: !1
        },
        treeitem: {
          type: "widget",
          attributes: {
            allowed: ["aria-checked", "aria-selected", "aria-expanded", "aria-level", "aria-posinset", "aria-setsize", "aria-errormessage"]
          },
          owned: null,
          nameFrom: ["author", "contents"],
          context: ["group", "tree"],
          unsupported: !1,
          allowedElements: ["li", {
            nodeName: "a",
            attributes: {
              href: Je
            }
          }]
        },
        widget: {
          type: "abstract",
          unsupported: !1
        },
        window: {
          nameFrom: ["author"],
          type: "abstract",
          unsupported: !1
        }
      }, Kt.implicitHtmlRole = Co, Kt.elementsAllowedNoRole = [{
        nodeName: ["base", "body", "caption", "col", "colgroup", "datalist", "dd", "details", "dt", "head", "html", "keygen", "label", "legend", "main", "map", "math", "meta", "meter", "noscript", "optgroup", "param", "picture", "progress", "script", "source", "style", "template", "textarea", "title", "track"]
      }, {
        nodeName: "area",
        attributes: {
          href: Je
        }
      }, {
        nodeName: "input",
        properties: {
          type: ["color", "data", "datatime", "file", "hidden", "month", "number", "password", "range", "reset", "submit", "time", "week"]
        }
      }, {
        nodeName: "link",
        attributes: {
          href: Je
        }
      }, {
        nodeName: "menu",
        attributes: {
          type: "context"
        }
      }, {
        nodeName: "menuitem",
        attributes: {
          type: ["command", "checkbox", "radio"]
        }
      }, {
        nodeName: "select",
        condition: function(t) {
          return t instanceof x.AbstractVirtualNode || (t = x.utils.getNodeFromTree(t)), Number(t.attr("size")) > 1;
        },
        properties: {
          multiple: !0
        }
      }, {
        nodeName: ["clippath", "cursor", "defs", "desc", "feblend", "fecolormatrix", "fecomponenttransfer", "fecomposite", "feconvolvematrix", "fediffuselighting", "fedisplacementmap", "fedistantlight", "fedropshadow", "feflood", "fefunca", "fefuncb", "fefuncg", "fefuncr", "fegaussianblur", "feimage", "femerge", "femergenode", "femorphology", "feoffset", "fepointlight", "fespecularlighting", "fespotlight", "fetile", "feturbulence", "filter", "hatch", "hatchpath", "lineargradient", "marker", "mask", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "pattern", "radialgradient", "solidcolor", "stop", "switch", "view"]
      }], Kt.elementsAllowedAnyRole = [{
        nodeName: "a",
        attributes: {
          href: gf
        }
      }, {
        nodeName: "img",
        attributes: {
          alt: gf
        }
      }, {
        nodeName: ["abbr", "address", "canvas", "div", "p", "pre", "blockquote", "ins", "del", "output", "span", "table", "tbody", "thead", "tfoot", "td", "em", "strong", "small", "s", "cite", "q", "dfn", "abbr", "time", "code", "var", "samp", "kbd", "sub", "sup", "i", "b", "u", "mark", "ruby", "rt", "rp", "bdi", "bdo", "br", "wbr", "th", "tr"]
      }], Kt.evaluateRoleForElement = {
        A: function(t) {
          var r = t.node, a = t.out;
          return r.namespaceURI === "http://www.w3.org/2000/svg" ? !0 : r.href.length ? a : !0;
        },
        AREA: function(t) {
          var r = t.node;
          return !r.href;
        },
        BUTTON: function(t) {
          var r = t.node, a = t.role, n = t.out;
          return r.getAttribute("type") === "menu" ? a === "menuitem" : n;
        },
        IMG: function(t) {
          var r = t.node, a = t.role, n = t.out;
          switch (r.alt) {
            case null:
              return n;
            case "":
              return a === "presentation" || a === "none";
            default:
              return a !== "presentation" && a !== "none";
          }
        },
        INPUT: function(t) {
          var r = t.node, a = t.role, n = t.out;
          switch (r.type) {
            case "button":
            case "image":
              return n;
            case "checkbox":
              return a === "button" && r.hasAttribute("aria-pressed") ? !0 : n;
            case "radio":
              return a === "menuitemradio";
            case "text":
              return a === "combobox" || a === "searchbox" || a === "spinbutton";
            case "tel":
              return a === "combobox" || a === "spinbutton";
            case "url":
            case "search":
            case "email":
              return a === "combobox";
            default:
              return !1;
          }
        },
        LI: function(t) {
          var r = t.node, a = t.out, n = x.utils.matchesSelector(r, "ol li, ul li");
          return n ? a : !0;
        },
        MENU: function(t) {
          var r = t.node;
          return r.getAttribute("type") !== "context";
        },
        OPTION: function(t) {
          var r = t.node, a = x.utils.matchesSelector(r, "select > option, datalist > option, optgroup > option");
          return !a;
        },
        SELECT: function(t) {
          var r = t.node, a = t.role;
          return !r.multiple && r.size <= 1 && a === "menu";
        },
        SVG: function(t) {
          var r = t.node, a = t.out;
          return r.parentNode && r.parentNode.namespaceURI === "http://www.w3.org/2000/svg" ? !0 : a;
        }
      }, Kt.rolesOfType = {
        widget: ["button", "checkbox", "dialog", "gridcell", "link", "log", "marquee", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "progressbar", "radio", "scrollbar", "searchbox", "slider", "spinbutton", "status", "switch", "tab", "tabpanel", "textbox", "timer", "tooltip", "tree", "treeitem"]
      };
      var bf = Kt;
      function B_(e) {
        var t = null, r = bf.role[e];
        return r && r.implicit && (t = $t(r.implicit)), t;
      }
      var q_ = B_;
      function j_(e) {
        return !!Iu(e).length;
      }
      var ii = j_;
      function Nu(e) {
        var t, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = r.popupRoles, n = ce(e);
        if ((t = a) !== null && t !== void 0 || (a = cc["aria-haspopup"].values), !a.includes(n))
          return !1;
        var i = z_(e);
        if (yf(i))
          return !0;
        var o = e.props.id;
        if (!o)
          return !1;
        if (!e.actualNode)
          throw new Error("Unable to determine combobox popup without an actualNode");
        var u = pa(e.actualNode), s = u.querySelectorAll('[aria-owns~="'.concat(o, `"][role~="combobox"]:not(select),
     [aria-controls~="`).concat(o, '"][role~="combobox"]:not(select)'));
        return Array.from(s).some(yf);
      }
      var yf = function(t) {
        return t && ce(t) === "combobox";
      };
      function z_(e) {
        for (; e = e.parent; )
          if (ce(e, {
            noPresentational: !0
          }) !== null)
            return e;
        return null;
      }
      function V_(e) {
        return e = le(e), An(e);
      }
      var wf = V_;
      function H_(e) {
        var t = he.ariaRoles[e];
        return !t || !Array.isArray(t.requiredAttrs) ? [] : ne(t.requiredAttrs);
      }
      var Df = H_;
      function $_(e) {
        var t = he.ariaRoles[e];
        return !t || !Array.isArray(t.requiredContext) ? null : ne(t.requiredContext);
      }
      var Lu = $_;
      function U_(e) {
        var t = he.ariaRoles[e];
        return !t || !Array.isArray(t.requiredOwned) ? null : ne(t.requiredOwned);
      }
      var Bu = U_;
      function G_(e, t) {
        e = e instanceof $e ? e : le(e);
        var r, a, n = e.attr(t), i = he.ariaAttrs[t];
        if (!i || i.allowEmpty && (!n || n.trim() === ""))
          return !0;
        switch (i.type) {
          case "boolean":
            return ["true", "false"].includes(n.toLowerCase());
          case "nmtoken":
            return typeof n == "string" && i.values.includes(n.toLowerCase());
          case "nmtokens":
            return a = Ze(n), a.reduce(function(s, l) {
              return s && i.values.includes(l);
            }, a.length !== 0);
          case "idref":
            try {
              var o = Xe(e.actualNode);
              return !!(n && o.getElementById(n));
            } catch {
              throw new TypeError("Cannot resolve id references for partial DOM");
            }
          case "idrefs":
            return Ot(e, t).some(function(s) {
              return !!s;
            });
          case "string":
            return n.trim() !== "";
          case "decimal":
            return r = n.match(/^[-+]?([0-9]*)\.?([0-9]*)$/), !!(r && (r[1] || r[2]));
          case "int":
            var u = typeof i.minValue < "u" ? i.minValue : -1 / 0;
            return /^[-+]?[0-9]+$/.test(n) && parseInt(n) >= u;
        }
      }
      var _f = G_;
      function W_(e) {
        var t = he.ariaAttrs[e];
        return !!t;
      }
      var oi = W_;
      function Y_(e) {
        var t = [], r = Ou(e), a = Wt(e);
        return r.forEach(function(n) {
          if (Fn(n) && cf(n) && !wf(n)) {
            var i = ai(n, a).some(function(o) {
              return o !== null && !!Fn(o);
            });
            i || t.push(n);
          }
        }), t.length ? (this.relatedNodes(t), !1) : !0;
      }
      var K_ = Y_;
      function X_(e, t) {
        var r = e.getAttribute("scope").toLowerCase();
        return t.values.indexOf(r) !== -1;
      }
      var Z_ = X_, J_ = Q_;
      function Q_(e, t, r) {
        if (r.children !== void 0) {
          var a = r.attr("summary"), n = r.children.find(ex), i = n ? re(tr(n)) : !1;
          return !i || !a ? !1 : re(a).toLowerCase() === re(i).toLowerCase();
        }
      }
      function ex(e) {
        return e.props.nodeName === "caption";
      }
      function tx(e) {
        return td(L) ? e.nodeName.toUpperCase() === "TH" : !0;
      }
      var rx = tx;
      function ax(e) {
        var t = Wt(e), r = t[0];
        return t.length <= 1 || r.length <= 1 || e.rows.length <= 1 ? !0 : r.reduce(function(a, n, i) {
          return a || n !== r[i + 1] && r[i + 1] !== void 0;
        }, !1);
      }
      var nx = ax;
      function ix(e, t, r) {
        if (r.children) {
          var a = r.children.find(function(i) {
            var o = i.props;
            return o.nodeName === "title";
          });
          if (!a)
            return this.data({
              messageKey: "noTitle"
            }), !1;
          try {
            var n = tr(a, {
              includeHidden: !0
            }).trim();
            if (n === "")
              return this.data({
                messageKey: "emptyTitle"
              }), !1;
          } catch {
            return;
          }
          return !0;
        }
      }
      var ox = ix, xf = {};
      Dt(xf, {
        getAriaRolesByType: function() {
          return Ur;
        },
        getAriaRolesSupportingNameFromContent: function() {
          return Pu;
        },
        getElementSpec: function() {
          return xr;
        },
        getElementsByContentType: function() {
          return xo;
        },
        getGlobalAriaAttrs: function() {
          return Dr;
        },
        implicitHtmlRoles: function() {
          return Co;
        }
      });
      function ux(e, t, r) {
        var a = De(r);
        if (["presentation", "none"].includes(a) && ["iframe", "frame"].includes(r.props.nodeName) && r.hasAttr("title"))
          return this.data({
            messageKey: "iframe",
            nodeName: r.props.nodeName
          }), !1;
        var n = ce(r);
        if (["presentation", "none"].includes(n))
          return this.data({
            role: n
          }), !0;
        if (!["presentation", "none"].includes(a))
          return !1;
        var i = Dr().some(function(s) {
          return r.hasAttr(s);
        }), o = Ne(r), u;
        return i && !o ? u = "globalAria" : !i && o ? u = "focusable" : u = "both", this.data({
          messageKey: u,
          role: n
        }), !1;
      }
      function sx(e, t, r) {
        var a = r.props.nodeName, n = (r.attr("type") || "").toLowerCase(), i = r.attr("value");
        return i && this.data({
          messageKey: "has-label"
        }), a === "input" && ["submit", "reset"].includes(n) ? i === null : !1;
      }
      var lx = sx;
      function cx(e) {
        return st(e);
      }
      var dx = cx;
      function fx(e, t) {
        var r = t.cssProperty, a = t.absoluteValues, n = t.minValue, i = t.maxValue, o = t.normalValue, u = o === void 0 ? 0 : o, s = t.noImportant, l = t.multiLineOnly;
        if (!s && e.style.getPropertyPriority(r) !== "important" || l && !nd(e))
          return !0;
        var c = {};
        typeof n == "number" && (c.minValue = n), typeof i == "number" && (c.maxValue = i);
        var d = e.style.getPropertyValue(r);
        if (["inherit", "unset", "revert", "revert-layer"].includes(d))
          return this.data(de({
            value: d
          }, c)), !0;
        var f = px(e, {
          absoluteValues: a,
          cssProperty: r,
          normalValue: u
        });
        if (this.data(de({
          value: f
        }, c)), typeof f == "number")
          return (typeof n != "number" || f >= n) && (typeof i != "number" || f <= i);
      }
      function px(e, t) {
        var r = t.cssProperty, a = t.absoluteValues, n = t.normalValue, i = E.getComputedStyle(e), o = i.getPropertyValue(r);
        if (o === "normal")
          return n;
        var u = parseFloat(o);
        if (a)
          return u;
        var s = parseFloat(i.getPropertyValue("font-size")), l = Math.round(u / s * 100) / 100;
        return isNaN(l) ? o : l;
      }
      function mx(e, t, r) {
        var a = r.props.nodeName;
        return ["img", "input", "area"].includes(a) ? r.hasAttr("alt") : !1;
      }
      var hx = mx;
      function vx() {
      }
      var gx = vx;
      function bx() {
        var e = L.title;
        return !!re(e);
      }
      var yx = bx;
      function wx(e, t) {
        var r = t.cssProperties.filter(function(a) {
          if (e.style.getPropertyPriority(a) === "important")
            return a;
        });
        return r.length > 0 ? (this.data(r), !1) : !0;
      }
      var Dx = wx;
      function _x(e, t, r) {
        try {
          return !!re(ga(r));
        } catch {
          return;
        }
      }
      var xx = _x;
      function Ex(e, t, r) {
        return !!re(ba(r));
      }
      var Ax = Ex;
      function Cx(e) {
        var t = e.getAttribute("id").trim();
        if (!t)
          return !0;
        var r = Xe(e), a = Array.from(r.querySelectorAll('[id="'.concat(Oe(t), '"]'))).filter(function(n) {
          return n !== e;
        });
        return a.length && this.relatedNodes(a), this.data(t), a.length === 0;
      }
      var Fx = Cx;
      function Tx(e) {
        var t = [];
        return e.filter(function(r) {
          return t.indexOf(r.data) === -1 ? (t.push(r.data), !0) : !1;
        });
      }
      var Rx = Tx;
      function Sx(e, t, r) {
        var a = re(r.attr("title")).toLowerCase();
        return this.data(a), !0;
      }
      var kx = Sx;
      function Ox(e) {
        var t = {};
        return e.forEach(function(r) {
          t[r.data] = t[r.data] !== void 0 ? ++t[r.data] : 0;
        }), e.forEach(function(r) {
          r.result = !!t[r.data];
        }), e;
      }
      var Mx = Ox;
      function Ix(e) {
        var t = bo(e, "href");
        return t ? Re(t) || void 0 : !1;
      }
      var Px = Ix, Nx = ["alert", "log", "status"];
      function Lx(e, t, r) {
        this.data({
          isIframe: ["iframe", "frame"].includes(r.props.nodeName)
        });
        var a = ue.get("regionlessNodes", function() {
          return Bx(t);
        });
        return !a.includes(r);
      }
      function Bx(e) {
        var t = Ef(x._tree[0], e).map(function(r) {
          for (; r.parent && !r.parent._hasRegionDescendant && r.parent.actualNode !== L.body; )
            r = r.parent;
          return r;
        }).filter(function(r, a, n) {
          return n.indexOf(r) === a;
        });
        return t;
      }
      function Ef(e, t) {
        var r = e.actualNode;
        if (ce(e) === "button" || jx(e, t) || ["iframe", "frame"].includes(e.props.nodeName) || lu(e.actualNode) && bo(e.actualNode, "href") || !Re(r)) {
          for (var a = e; a; )
            a._hasRegionDescendant = !0, a = a.parent;
          return ["iframe", "frame"].includes(e.props.nodeName) ? [e] : [];
        } else return r !== L.body && Fn(r, !0) && !qx(e) ? [e] : e.children.filter(function(n) {
          var i = n.actualNode;
          return i.nodeType === 1;
        }).map(function(n) {
          return Ef(n, t);
        }).reduce(function(n, i) {
          return n.concat(i);
        }, []);
      }
      function qx(e) {
        return ["none", "presentation"].includes(ce(e)) && !qo(e);
      }
      function jx(e, t) {
        var r = e.actualNode, a = ce(e), n = (r.getAttribute("aria-live") || "").toLowerCase().trim(), i = Ur("landmark");
        return !!(["assertive", "polite"].includes(n) || Nx.includes(a) || i.includes(a) || t.regionMatcher && ya(e, t.regionMatcher));
      }
      function zx(e) {
        var t = e.filter(function(r) {
          return r.data.isIframe;
        });
        return e.forEach(function(r) {
          if (!(r.result || r.node.ancestry.length === 1)) {
            var a = r.node.ancestry.slice(0, -1), n = Ce(t), i;
            try {
              for (n.s(); !(i = n.n()).done; ) {
                var o = i.value;
                if (Eu(a, o.node.ancestry)) {
                  r.result = o.result;
                  break;
                }
              }
            } catch (u) {
              n.e(u);
            } finally {
              n.f();
            }
          }
        }), t.forEach(function(r) {
          r.result || (r.result = !0);
        }), e;
      }
      var Vx = zx;
      function Hx(e) {
        switch (e) {
          case "lighter":
            return 100;
          case "normal":
            return 400;
          case "bold":
            return 700;
          case "bolder":
            return 900;
        }
        return e = parseInt(e), isNaN(e) ? 400 : e;
      }
      function $x(e) {
        for (var t = e, r = e.textContent.trim(), a = r; a === r && t !== void 0; ) {
          var n = -1;
          if (e = t, e.children.length === 0)
            return e;
          do
            n++, a = e.children[n].textContent.trim();
          while (a === "" && n + 1 < e.children.length);
          t = e.children[n];
        }
        return e;
      }
      function qu(e) {
        var t = E.getComputedStyle($x(e));
        return {
          fontWeight: Hx(t.getPropertyValue("font-weight")),
          fontSize: parseInt(t.getPropertyValue("font-size")),
          isItalic: t.getPropertyValue("font-style") === "italic"
        };
      }
      function Af(e, t, r) {
        return r.reduce(function(a, n) {
          return a || (!n.size || e.fontSize / n.size > t.fontSize) && (!n.weight || e.fontWeight - n.weight > t.fontWeight) && (!n.italic || e.isItalic && !t.isItalic);
        }, !1);
      }
      function Ux(e, t, r) {
        var a = Array.from(e.parentNode.children), n = a.indexOf(e);
        t = t || {};
        var i = t.margins || [], o = a.slice(n + 1).find(function(v) {
          return v.nodeName.toUpperCase() === "P";
        }), u = a.slice(0, n).reverse().find(function(v) {
          return v.nodeName.toUpperCase() === "P";
        }), s = qu(e), l = o ? qu(o) : null, c = u ? qu(u) : null, d = t.passLength, f = t.failLength, p = e.textContent.trim().length, m = o?.textContent.trim().length;
        if (p > m * d || !l || !Af(s, l, i))
          return !0;
        var h = Nr(r, "blockquote");
        if (!(h && h.nodeName.toUpperCase() === "BLOCKQUOTE") && !(c && !Af(s, c, i)) && !(p > m * f))
          return !1;
      }
      var Gx = Ux, Wx = /[;,\s]/, Yx = /^[0-9.]+$/;
      function Kx(e, t, r) {
        var a = t || {}, n = a.minDelay, i = a.maxDelay, o = (r.attr("content") || "").trim(), u = o.split(Wx), s = $(u, 1), l = s[0];
        if (!l.match(Yx))
          return !0;
        var c = parseFloat(l);
        return this.data({
          redirectDelay: c
        }), typeof n == "number" && c <= t.minDelay || typeof i == "number" && c > t.maxDelay;
      }
      function Xx(e, t, r) {
        var a = ft(r, "a[href]");
        return a.some(function(n) {
          return /^#[^/!]/.test(n.attr("href"));
        });
      }
      var Zx = Xx, Cf = {};
      Dt(Cf, {
        aria: function() {
          return ff;
        },
        color: function() {
          return Ff;
        },
        dom: function() {
          return io;
        },
        forms: function() {
          return qf;
        },
        matches: function() {
          return ya;
        },
        math: function() {
          return $l;
        },
        standards: function() {
          return xf;
        },
        table: function() {
          return sf;
        },
        text: function() {
          return va;
        },
        utils: function() {
          return Li;
        }
      });
      var Ff = {};
      Dt(Ff, {
        Color: function() {
          return Se;
        },
        centerPointOfRect: function() {
          return Qx;
        },
        elementHasImage: function() {
          return Tn;
        },
        elementIsDistinct: function() {
          return Rf;
        },
        filteredRectStack: function() {
          return aE;
        },
        flattenColors: function() {
          return qt;
        },
        flattenShadowColors: function() {
          return zu;
        },
        getBackgroundColor: function() {
          return La;
        },
        getBackgroundStack: function() {
          return Vu;
        },
        getContrast: function() {
          return Gr;
        },
        getForegroundColor: function() {
          return li;
        },
        getOwnBackgroundColor: function() {
          return Ar;
        },
        getRectStack: function() {
          return Sf;
        },
        getStackingContext: function() {
          return $u;
        },
        getStrokeColorsFromShadows: function() {
          return Hu;
        },
        getTextShadowColors: function() {
          return si;
        },
        hasValidContrastRatio: function() {
          return AE;
        },
        incompleteData: function() {
          return We;
        },
        parseTextShadows: function() {
          return Mf;
        },
        stackingContextToColor: function() {
          return Na;
        }
      });
      function Jx(e) {
        if (!(e.left > E.innerWidth) && !(e.top > E.innerHeight)) {
          var t = Math.min(Math.ceil(e.left + e.width / 2), E.innerWidth - 1), r = Math.min(Math.ceil(e.top + e.height / 2), E.innerHeight - 1);
          return {
            x: t,
            y: r
          };
        }
      }
      var Qx = Jx;
      function Tf(e) {
        return e.getPropertyValue("font-family").split(/[,;]/g).map(function(t) {
          return t.trim().toLowerCase();
        });
      }
      function eE(e, t) {
        var r = E.getComputedStyle(e);
        if (r.getPropertyValue("background-image") !== "none")
          return !0;
        var a = ["border-bottom", "border-top", "outline"].reduce(function(u, s) {
          var l = new Se();
          return l.parseString(r.getPropertyValue(s + "-color")), u || r.getPropertyValue(s + "-style") !== "none" && parseFloat(r.getPropertyValue(s + "-width")) > 0 && l.alpha !== 0;
        }, !1);
        if (a)
          return !0;
        var n = E.getComputedStyle(t);
        if (Tf(r)[0] !== Tf(n)[0])
          return !0;
        var i = ["text-decoration-line", "text-decoration-style", "font-weight", "font-style", "font-size"].reduce(function(u, s) {
          return u || r.getPropertyValue(s) !== n.getPropertyValue(s);
        }, !1), o = r.getPropertyValue("text-decoration");
        return o.split(" ").length < 3 && (i = i || o !== n.getPropertyValue("text-decoration")), i;
      }
      var Rf = eE;
      function tE(e) {
        var t = uc(e), r = Lo(e);
        return !r || r.length <= 1 ? [t] : r.some(function(a) {
          return a === void 0;
        }) ? null : (r.splice(0, 0, t), r);
      }
      var Sf = tE;
      function rE(e) {
        var t = Sf(e);
        if (t && t.length === 1)
          return t[0];
        if (t && t.length > 1) {
          var r = t.shift(), a;
          return t.forEach(function(n, i) {
            if (i !== 0) {
              var o = t[i - 1], u = t[i];
              a = o.every(function(s, l) {
                return s === u[l];
              }) || r.includes(e);
            }
          }), a ? t[0] : (We.set("bgColor", "elmPartiallyObscuring"), null);
        }
        return We.set("bgColor", "outsideViewport"), null;
      }
      var aE = rE, nE = ["hue", "saturation", "color", "luminosity"], kf = {
        normal: function(t, r) {
          return r;
        },
        multiply: function(t, r) {
          return r * t;
        },
        screen: function(t, r) {
          return t + r - t * r;
        },
        overlay: function(t, r) {
          return this["hard-light"](r, t);
        },
        darken: function(t, r) {
          return Math.min(t, r);
        },
        lighten: function(t, r) {
          return Math.max(t, r);
        },
        "color-dodge": function(t, r) {
          return t === 0 ? 0 : r === 1 ? 1 : Math.min(1, t / (1 - r));
        },
        "color-burn": function(t, r) {
          return t === 1 ? 1 : r === 0 ? 0 : 1 - Math.min(1, (1 - t) / r);
        },
        "hard-light": function(t, r) {
          return r <= 0.5 ? this.multiply(t, 2 * r) : this.screen(t, 2 * r - 1);
        },
        "soft-light": function(t, r) {
          if (r <= 0.5)
            return t - (1 - 2 * r) * t * (1 - t);
          var a = t <= 0.25 ? ((16 * t - 12) * t + 4) * t : Math.sqrt(t);
          return t + (2 * r - 1) * (a - t);
        },
        difference: function(t, r) {
          return Math.abs(t - r);
        },
        exclusion: function(t, r) {
          return t + r - 2 * t * r;
        },
        hue: function(t, r) {
          return r.setSaturation(t.getSaturation()).setLuminosity(t.getLuminosity());
        },
        saturation: function(t, r) {
          return t.setSaturation(r.getSaturation()).setLuminosity(t.getLuminosity());
        },
        color: function(t, r) {
          return r.setLuminosity(t.getLuminosity());
        },
        luminosity: function(t, r) {
          return t.setLuminosity(r.getLuminosity());
        }
      };
      function qt(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "normal", a = oE(t, e, r), n = ju(e.red, e.alpha, t.red, t.alpha, a.r * 255), i = ju(e.green, e.alpha, t.green, t.alpha, a.g * 255), o = ju(e.blue, e.alpha, t.blue, t.alpha, a.b * 255), u = iE(e.alpha + t.alpha * (1 - e.alpha), 0, 1);
        if (u === 0)
          return new Se(n, i, o, u);
        var s = Math.round(n / u), l = Math.round(i / u), c = Math.round(o / u);
        return new Se(s, l, c, u);
      }
      function ju(e, t, r, a, n) {
        return t * (1 - a) * e + t * a * n + (1 - t) * a * r;
      }
      function iE(e, t, r) {
        return Math.min(Math.max(t, e), r);
      }
      function oE(e, t, r) {
        if (nE.includes(r))
          return kf[r](e, t);
        var a = new Se();
        return ["r", "g", "b"].forEach(function(n) {
          a[n] = kf[r](e[n], t[n]);
        }), a;
      }
      function zu(e, t) {
        var r = e.alpha, a = (1 - r) * t.red + r * e.red, n = (1 - r) * t.green + r * e.green, i = (1 - r) * t.blue + r * e.blue, o = e.alpha + t.alpha * (1 - e.alpha);
        return new Se(a, n, i, o);
      }
      function Vu(e) {
        for (var t = Lo(e).map(function(n) {
          return n = h1(n, e), n = uE(n), n;
        }), r = 0; r < t.length; r++) {
          var a = t[r];
          if (a[0] !== e)
            return We.set("bgColor", "bgOverlap"), null;
          if (r !== 0 && !sE(a, t[0]))
            return We.set("bgColor", "elmPartiallyObscuring"), null;
        }
        return t[0] || null;
      }
      function uE(e) {
        var t = e.indexOf(L.body), r = e, a = Ar(E.getComputedStyle(L.documentElement));
        if (t > 1 && a.alpha === 0 && !Tn(L.documentElement)) {
          t > 1 && (r.splice(t, 1), r.push(L.body));
          var n = r.indexOf(L.documentElement);
          n > 0 && (r.splice(n, 1), r.push(L.documentElement));
        }
        return r;
      }
      function sE(e, t) {
        if (e === t)
          return !0;
        if (e === null || t === null || e.length !== t.length)
          return !1;
        for (var r = 0; r < e.length; ++r)
          if (e[r] !== t[r])
            return !1;
        return !0;
      }
      var lE = 0.54, ui = 0.5, cE = 1.5, Of = ["top", "right", "bottom", "left"];
      function Hu(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.ignoreEdgeCount, a = r === void 0 ? !1 : r, n = dE(e), i = Object.entries(n).map(function(o) {
          var u = $(o, 2), s = u[0], l = u[1], c = Of.filter(function(d) {
            return l[d].length !== 0;
          }).length;
          return {
            colorStr: s,
            sides: l,
            edgeCount: c
          };
        });
        return !a && i.some(function(o) {
          var u = o.edgeCount;
          return u > 1 && u < 4;
        }) ? null : i.map(fE).filter(function(o) {
          return o !== null;
        });
      }
      function dE(e) {
        var t = {}, r = Ce(e), a;
        try {
          for (r.s(); !(a = r.n()).done; ) {
            var n, i = a.value, o = i.colorStr, u = i.pixels;
            (n = t[o]) !== null && n !== void 0 || (t[o] = {
              top: [],
              right: [],
              bottom: [],
              left: []
            });
            var s = t[o], l = $(u, 2), c = l[0], d = l[1];
            c > ui ? s.right.push(c) : -c > ui && s.left.push(-c), d > ui ? s.bottom.push(d) : -d > ui && s.top.push(-d);
          }
        } catch (f) {
          r.e(f);
        } finally {
          r.f();
        }
        return t;
      }
      function fE(e) {
        var t = e.colorStr, r = e.sides, a = e.edgeCount;
        if (a !== 4)
          return null;
        var n = new Se();
        n.parseString(t);
        var i = 0, o = !0;
        return Of.forEach(function(u) {
          i += r[u].length / 4, o && (o = r[u].every(function(s) {
            return s > cE;
          }));
        }), o || (n.alpha = 1 - Math.pow(lE, i)), n;
      }
      function Mf(e) {
        var t = {
          pixels: []
        }, r = e.trim(), a = [t];
        if (!r)
          return [];
        for (; r; ) {
          var n = r.match(/^[a-z]+(\([^)]+\))?/i) || r.match(/^#[0-9a-f]+/i), i = r.match(/^([0-9.-]+)px/i) || r.match(/^(0)/);
          if (n)
            me(!t.colorStr, "Multiple colors identified in text-shadow: ".concat(e)), r = r.replace(n[0], "").trim(), t.colorStr = n[0];
          else if (i) {
            me(t.pixels.length < 3, "Too many pixel units in text-shadow: ".concat(e)), r = r.replace(i[0], "").trim();
            var o = parseFloat((i[1][0] === "." ? "0" : "") + i[1]);
            t.pixels.push(o);
          } else if (r[0] === ",")
            me(t.pixels.length >= 2, "Missing pixel value in text-shadow: ".concat(e)), t = {
              pixels: []
            }, a.push(t), r = r.substr(1).trim();
          else
            throw new Error("Unable to process text-shadows: ".concat(r));
        }
        return a.forEach(function(u) {
          var s = u.pixels;
          s.length === 2 && s.push(0);
        }), a;
      }
      function si(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.minRatio, a = t.maxRatio, n = t.ignoreEdgeCount, i = [], o = E.getComputedStyle(e), u = o.getPropertyValue("text-shadow");
        if (u === "none")
          return i;
        var s = o.getPropertyValue("font-size"), l = parseInt(s);
        me(isNaN(l) === !1, "Unable to determine font-size value ".concat(s));
        var c = [], d = Mf(u), f = Ce(d), p;
        try {
          for (f.s(); !(p = f.n()).done; ) {
            var m = p.value, h = m.colorStr || o.getPropertyValue("color"), v = $(m.pixels, 3), g = v[0], b = v[1], D = v[2], w = D === void 0 ? 0 : D;
            if (!(a && w >= l * a)) {
              if (r && w < l * r) {
                c.push({
                  colorStr: h,
                  pixels: m.pixels
                });
                continue;
              }
              if (c.length > 0) {
                var _ = Hu(c, {
                  ignoreEdgeCount: n
                });
                if (_ === null)
                  return null;
                i.push.apply(i, ne(_)), c.splice(0, c.length);
              }
              var F = pE({
                colorStr: h,
                offsetX: g,
                offsetY: b,
                blurRadius: w,
                fontSize: l
              });
              i.push(F);
            }
          }
        } catch (I) {
          f.e(I);
        } finally {
          f.f();
        }
        if (c.length > 0) {
          var R = Hu(c, {
            ignoreEdgeCount: n
          });
          if (R === null)
            return null;
          i.push.apply(i, ne(R));
        }
        return i;
      }
      function pE(e) {
        var t = e.colorStr, r = e.offsetX, a = e.offsetY, n = e.blurRadius, i = e.fontSize;
        if (r > n || a > n)
          return new Se(0, 0, 0, 0);
        var o = new Se();
        return o.parseString(t), o.alpha *= mE(n, i), o;
      }
      function mE(e, t) {
        if (e === 0)
          return 1;
        var r = e / t;
        return 0.185 / (r + 0.4);
      }
      function $u(e, t) {
        var r, a = le(e);
        if (a._stackingContext)
          return a._stackingContext;
        var n = [], i = /* @__PURE__ */ new Map();
        return t = (r = t) !== null && r !== void 0 ? r : Vu(e), t.forEach(function(o) {
          var u, s = le(o), l = gE(s), c = s._stackingOrder.filter(function(p) {
            var m = p.vNode;
            return !!m;
          });
          c.forEach(function(p, m) {
            var h, v = p.vNode, g = (h = c[m - 1]) === null || h === void 0 ? void 0 : h.vNode, b = Pf(i, v, g);
            m === 0 && !i.get(v) && n.unshift(b), i.set(v, b);
          });
          var d = (u = c[c.length - 1]) === null || u === void 0 ? void 0 : u.vNode, f = Pf(i, s, d);
          c.length || n.unshift(f), f.bgColor = l;
        }), a._stackingContext = n, n;
      }
      function Na(e) {
        var t;
        if (!((t = e.descendants) !== null && t !== void 0 && t.length)) {
          var r = e.bgColor;
          return r.alpha *= e.opacity, {
            color: r,
            blendMode: e.blendMode
          };
        }
        var a = e.descendants.reduce(hE, If()), n = qt(a, e.bgColor, e.descendants[0].blendMode);
        return n.alpha *= e.opacity, {
          color: n,
          blendMode: e.blendMode
        };
      }
      function hE(e, t) {
        var r;
        e instanceof Se ? r = e : r = Na(e).color;
        var a = Na(t).color;
        return qt(a, r, t.blendMode);
      }
      function If(e, t) {
        var r;
        return {
          vNode: e,
          ancestor: t,
          opacity: parseFloat((r = e?.getComputedStylePropertyValue("opacity")) !== null && r !== void 0 ? r : 1),
          bgColor: new Se(0, 0, 0, 0),
          blendMode: vE(e?.getComputedStylePropertyValue("mix-blend-mode")),
          descendants: []
        };
      }
      function vE(e) {
        return e || void 0;
      }
      function Pf(e, t, r) {
        var a, n = e.get(r), i = (a = e.get(t)) !== null && a !== void 0 ? a : If(t, n);
        return n && r !== t && !n.descendants.includes(i) && n.descendants.unshift(i), i;
      }
      function gE(e) {
        var t = new Se();
        return t.parseString(e.getComputedStylePropertyValue("background-color")), t;
      }
      function La(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.1, a = le(e), n = a._cache.getBackgroundColor;
        if (n)
          return t.push.apply(t, ne(n.bgElms)), We.set("bgColor", n.incompleteData), n.bgColor;
        var i = bE(e, t, r);
        return a._cache.getBackgroundColor = {
          bgColor: i,
          bgElms: t,
          incompleteData: We.get("bgColor")
        }, i;
      }
      function bE(e, t, r) {
        var a, n, i = Vu(e);
        if (!i)
          return null;
        var o = No(e), u = (a = si(e, {
          minRatio: r,
          ignoreEdgeCount: !0
        })) !== null && a !== void 0 ? a : [];
        u.length && (u = [{
          color: u.reduce(zu)
        }]);
        for (var s = 0; s < i.length; s++) {
          var l = i[s], c = E.getComputedStyle(l);
          if (Tn(l, c))
            return t.push(l), null;
          var d = Ar(c);
          if (d.alpha !== 0) {
            if (c.getPropertyValue("display") !== "inline" && !Nf(l, o))
              return t.push(l), We.set("bgColor", "elmPartiallyObscured"), null;
            if (t.push(l), d.alpha === 1)
              break;
          }
        }
        var f = $u(e, i);
        u = f.map(Na).concat(u);
        var p = yE(e, i.includes(L.body));
        if ((n = u).unshift.apply(n, ne(p)), u.length === 0)
          return new Se(255, 255, 255, 1);
        var m = u.reduce(function(h, v) {
          return qt(v.color, h.color instanceof Se ? h.color : h, v.blendMode);
        });
        return qt(m.color instanceof Se ? m.color : m, new Se(255, 255, 255, 1));
      }
      function Nf(e, t) {
        t = Array.isArray(t) ? t : [t];
        var r = e.getBoundingClientRect(), a = r.right, n = r.bottom, i = E.getComputedStyle(e), o = i.getPropertyValue("overflow");
        return (["scroll", "auto"].includes(o) || e instanceof E.HTMLHtmlElement) && (a = r.left + e.scrollWidth, n = r.top + e.scrollHeight), t.every(function(u) {
          return u.top >= r.top && u.bottom <= n && u.left >= r.left && u.right <= a;
        });
      }
      function Lf(e) {
        return e || void 0;
      }
      function yE(e, t) {
        var r = [];
        if (!t) {
          var a = L.documentElement, n = L.body, i = E.getComputedStyle(a), o = E.getComputedStyle(n), u = Ar(i), s = Ar(o), l = s.alpha !== 0 && Nf(n, e.getBoundingClientRect());
          (s.alpha !== 0 && u.alpha === 0 || l && s.alpha !== 1) && r.unshift({
            color: s,
            blendMode: Lf(o.getPropertyValue("mix-blend-mode"))
          }), u.alpha !== 0 && (!l || l && s.alpha !== 1) && r.unshift({
            color: u,
            blendMode: Lf(i.getPropertyValue("mix-blend-mode"))
          });
        }
        return r;
      }
      function wE(e, t) {
        if (!t || !e)
          return null;
        t.alpha < 1 && (t = qt(t, e));
        var r = e.getRelativeLuminance(), a = t.getRelativeLuminance();
        return (Math.max(a, r) + 0.05) / (Math.min(a, r) + 0.05);
      }
      var Gr = wE;
      function li(e, t, r) {
        for (var a, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = E.getComputedStyle(e), o = [function() {
          return _E(i, n);
        }, function() {
          return DE(i);
        }, function() {
          return si(e, {
            minRatio: 0
          });
        }], u = [], s = 0, l = o; s < l.length; s++) {
          var c = l[s], d = c();
          if (d && (u = u.concat(d), d.alpha === 1))
            break;
        }
        var f = u.reduce(function(v, g) {
          return qt(v, g);
        });
        if ((a = r) !== null && a !== void 0 || (r = La(e, [])), r === null) {
          var p = We.get("bgColor");
          return We.set("fgColor", p), null;
        }
        var m = $u(e), h = Bf(m, e);
        return qt(xE(f, h, m), new Se(255, 255, 255, 1));
      }
      function DE(e) {
        return new Se().parseString(e.getPropertyValue("-webkit-text-fill-color") || e.getPropertyValue("color"));
      }
      function _E(e, t) {
        var r = t.textStrokeEmMin, a = r === void 0 ? 0 : r, n = parseFloat(e.getPropertyValue("-webkit-text-stroke-width"));
        if (n === 0)
          return null;
        var i = e.getPropertyValue("font-size"), o = n / parseFloat(i);
        if (isNaN(o) || o < a)
          return null;
        var u = e.getPropertyValue("-webkit-text-stroke-color");
        return new Se().parseString(u);
      }
      function xE(e, t, r) {
        for (; t; ) {
          var a;
          if (t.opacity === 1 && t.ancestor) {
            t = t.ancestor;
            continue;
          }
          e.alpha *= t.opacity;
          var n = ((a = t.ancestor) === null || a === void 0 ? void 0 : a.descendants) || r;
          t.opacity !== 1 && (n = n.slice(0, n.indexOf(t)));
          var i = n.map(Na);
          if (!i.length) {
            t = t.ancestor;
            continue;
          }
          var o = i.reduce(function(u, s) {
            return qt(s.color, u.color instanceof Se ? u.color : u);
          }, {
            color: new Se(0, 0, 0, 0),
            blendMode: "normal"
          });
          e = qt(e, o), t = t.ancestor;
        }
        return e;
      }
      function Bf(e, t) {
        var r = Ce(e), a;
        try {
          for (r.s(); !(a = r.n()).done; ) {
            var n, i = a.value;
            if (((n = i.vNode) === null || n === void 0 ? void 0 : n.actualNode) === t)
              return i;
            var o = Bf(i.descendants, t);
            if (o)
              return o;
          }
        } catch (u) {
          r.e(u);
        } finally {
          r.f();
        }
      }
      function EE(e, t, r, a) {
        var n = Gr(e, t), i = a && Math.ceil(r * 72) / 96 < 14 || !a && Math.ceil(r * 72) / 96 < 18, o = i ? 4.5 : 3;
        return {
          isValid: n > o,
          contrastRatio: n,
          expectedContrastRatio: o
        };
      }
      var AE = EE, qf = {};
      Dt(qf, {
        isAriaCombobox: function() {
          return Nc;
        },
        isAriaListbox: function() {
          return Pc;
        },
        isAriaRange: function() {
          return Lc;
        },
        isAriaTextbox: function() {
          return Ic;
        },
        isDisabled: function() {
          return Ba;
        },
        isNativeSelect: function() {
          return Mc;
        },
        isNativeTextbox: function() {
          return Oc;
        }
      });
      var CE = ["fieldset", "button", "select", "input", "textarea"];
      function jf(e) {
        var t = e._isDisabled;
        if (typeof t == "boolean")
          return t;
        var r = e.props.nodeName, a = e.attr("aria-disabled");
        return CE.includes(r) && e.hasAttr("disabled") ? t = !0 : a ? t = a.toLowerCase() === "true" : e.parent ? t = jf(e.parent) : t = !1, e._isDisabled = t, t;
      }
      var Ba = jf;
      function FE(e, t, r) {
        var a = va.accessibleTextVirtual(r), n = va.sanitize(va.removeUnicode(a, {
          emoji: !0,
          nonBmp: !0,
          punctuations: !0
        })).toLowerCase();
        if (n) {
          var i = {
            name: n,
            urlProps: io.urlPropsFromAttribute(e, "href")
          };
          return this.data(i), this.relatedNodes([e]), !0;
        }
      }
      var TE = FE;
      function zf(e, t) {
        if (!e || !t)
          return !1;
        var r = Object.getOwnPropertyNames(e), a = Object.getOwnPropertyNames(t);
        if (r.length !== a.length)
          return !1;
        var n = r.every(function(i) {
          var o = e[i], u = t[i];
          return O(o) !== O(u) ? !1 : O(o) === "object" || O(u) === "object" ? zf(o, u) : o === u;
        });
        return n;
      }
      function RE(e) {
        if (e.length < 2)
          return e;
        for (var t = e.filter(function(o) {
          var u = o.result;
          return u !== void 0;
        }), r = [], a = {}, n = function(u) {
          var s, l = t[u], c = l.data, d = c.name, f = c.urlProps;
          if (a[d])
            return 1;
          var p = t.filter(function(h, v) {
            var g = h.data;
            return g.name === d && v !== u;
          }), m = p.every(function(h) {
            var v = h.data;
            return zf(v.urlProps, f);
          });
          p.length && !m && (l.result = void 0), l.relatedNodes = [], (s = l.relatedNodes).push.apply(s, ne(p.map(function(h) {
            return h.relatedNodes[0];
          }))), a[d] = p, r.push(l);
        }, i = 0; i < t.length; i++)
          n(i);
        return r;
      }
      var SE = RE;
      function kE(e) {
        var t = ce(e), r = t && t.includes("heading"), a = e.attr("aria-level"), n = parseInt(a, 10), i = e.props.nodeName.match(/h(\d)/) || [], o = $(i, 2), u = o[1];
        return r ? u && !a ? parseInt(u, 10) : isNaN(n) || n < 1 ? u ? parseInt(u, 10) : 2 : n || -1 : -1;
      }
      function OE() {
        var e = ue.get("headingOrder");
        if (e)
          return !0;
        var t = "h1, h2, h3, h4, h5, h6, [role=heading], iframe, frame", r = Bt(x._tree[0], t, Re);
        return e = r.map(function(a) {
          return {
            ancestry: [an(a.actualNode)],
            level: kE(a)
          };
        }), this.data({
          headingOrder: e
        }), ue.set("headingOrder", r), !0;
      }
      var ME = OE;
      function IE(e) {
        var t = NE(e);
        return e.forEach(function(r) {
          r.result = PE(r, t);
        }), e;
      }
      function PE(e, t) {
        var r, a, n, i, o = Vf(t, e.node.ancestry), u = (r = (a = t[o]) === null || a === void 0 ? void 0 : a.level) !== null && r !== void 0 ? r : -1, s = (n = (i = t[o - 1]) === null || i === void 0 ? void 0 : i.level) !== null && n !== void 0 ? n : -1;
        if (o === 0)
          return !0;
        if (u !== -1)
          return u - s <= 1;
      }
      function NE(e) {
        e = ne(e), e.sort(function(r, a) {
          var n = r.node, i = a.node;
          return n.ancestry.length - i.ancestry.length;
        });
        var t = e.reduce(LE, []);
        return t.filter(function(r) {
          var a = r.level;
          return a !== -1;
        });
      }
      function LE(e, t) {
        var r, a = (r = t.data) === null || r === void 0 ? void 0 : r.headingOrder, n = Hf(t.node.ancestry, 1);
        if (!a)
          return e;
        var i = a.map(function(u) {
          return qE(u, n);
        }), o = BE(e, n);
        return o === -1 ? e.push.apply(e, ne(i)) : e.splice.apply(e, [o, 0].concat(ne(i))), e;
      }
      function BE(e, t) {
        for (; t.length; ) {
          var r = Vf(e, t);
          if (r !== -1)
            return r;
          t = Hf(t, 1);
        }
        return -1;
      }
      function Vf(e, t) {
        return e.findIndex(function(r) {
          return Eu(r.ancestry, t);
        });
      }
      function qE(e, t) {
        var r = t.concat(e.ancestry);
        return de({}, e, {
          ancestry: r
        });
      }
      function Hf(e, t) {
        return e.slice(0, e.length - t);
      }
      function jE(e, t, r) {
        var a = t?.minSize || 24, n = r.boundingClientRect;
        if (Gt(a * 10, n))
          return this.data({
            messageKey: "large",
            minSize: a
          }), !0;
        var i = Gt.bind(null, a), o = yn(r), u = zE(r, o), s = VE(r, o), l = s.fullyObscuringElms, c = s.partialObscuringElms;
        if (u.length && (l.length || !i(n))) {
          this.data({
            minSize: a,
            messageKey: "contentOverflow"
          }), this.relatedNodes(qa(u));
          return;
        }
        if (l.length)
          return this.relatedNodes(qa(l)), this.data({
            messageKey: "obscured"
          }), !0;
        var d = vt(r) ? !1 : void 0;
        if (!i(n))
          return this.data(de({
            minSize: a
          }, ci(n))), d;
        var f = UE(c);
        if (!f.length)
          return this.data(de({
            minSize: a
          }, ci(n))), !0;
        var p = HE(r, f);
        if (!p) {
          this.data({
            minSize: a,
            messageKey: "tooManyRects"
          });
          return;
        }
        if (!i(p)) {
          if (u.length) {
            this.data({
              minSize: a,
              messageKey: "contentOverflow"
            }), this.relatedNodes(qa(u));
            return;
          }
          var m = f.every(vt), h = "partiallyObscured".concat(m ? "" : "NonTabbable");
          return this.data(de({
            messageKey: h,
            minSize: a
          }, ci(p))), this.relatedNodes(qa(f)), m ? d : void 0;
        }
        return this.data(de({
          minSize: a
        }, ci(p || n))), this.relatedNodes(qa(f)), !0;
      }
      function zE(e, t) {
        return t.filter(function(r) {
          return !$f(r, e) && Uf(e, r);
        });
      }
      function VE(e, t) {
        var r = [], a = [], n = Ce(t), i;
        try {
          for (n.s(); !(i = n.n()).done; ) {
            var o = i.value;
            !Uf(e, o) && co(e, o) && GE(o) !== "none" && ($f(e, o) ? r.push(o) : a.push(o));
          }
        } catch (u) {
          n.e(u);
        } finally {
          n.f();
        }
        return {
          fullyObscuringElms: r,
          partialObscuringElms: a
        };
      }
      function HE(e, t) {
        var r = e.boundingClientRect, a = t.map(function(i) {
          var o = i.boundingClientRect;
          return o;
        }), n;
        try {
          n = fo(r, a);
        } catch {
          return null;
        }
        return $E(n);
      }
      function $E(e, t) {
        return e.reduce(function(r, a) {
          var n = Gt(t, r), i = Gt(t, a);
          if (n !== i)
            return n ? r : a;
          var o = r.width * r.height, u = a.width * a.height;
          return o > u ? r : a;
        });
      }
      function UE(e) {
        return e.filter(function(t) {
          return At(t) === "widget" && Ne(t);
        });
      }
      function $f(e, t) {
        var r = e.boundingClientRect, a = t.boundingClientRect;
        return r.top >= a.top && r.left >= a.left && r.bottom <= a.bottom && r.right <= a.right;
      }
      function GE(e) {
        return e.getComputedStylePropertyValue("pointer-events");
      }
      function ci(e) {
        return {
          width: Math.round(e.width * 10) / 10,
          height: Math.round(e.height * 10) / 10
        };
      }
      function Uf(e, t) {
        return Ut(e, t) && !vt(t);
      }
      function qa(e) {
        return e.map(function(t) {
          var r = t.actualNode;
          return r;
        });
      }
      var WE = 0.05;
      function YE(e, t, r) {
        var a = t?.minOffset || 24;
        if (Gt(a * 10, r.boundingClientRect))
          return this.data({
            messageKey: "large",
            minOffset: a
          }), !0;
        var n = [], i = a, o = Ce(yn(r, a)), u;
        try {
          for (o.s(); !(u = o.n()).done; ) {
            var s = u.value;
            if (!(At(s) !== "widget" || !Ne(s))) {
              var l = null;
              try {
                l = Gl(r, s, a / 2);
              } catch (c) {
                if (c.message.startsWith("splitRects")) {
                  this.data({
                    messageKey: "tooManyRects",
                    closestOffset: 0,
                    minOffset: a
                  });
                  return;
                }
                throw c;
              }
              l !== null && (l = KE(l) * 2, !(l + WE >= a) && (i = Math.min(i, l), n.push(s)));
            }
          }
        } catch (c) {
          o.e(c);
        } finally {
          o.f();
        }
        if (n.length === 0)
          return this.data({
            closestOffset: i,
            minOffset: a
          }), !0;
        if (this.relatedNodes(n.map(function(c) {
          var d = c.actualNode;
          return d;
        })), !n.some(vt)) {
          this.data({
            messageKey: "nonTabbableNeighbor",
            closestOffset: i,
            minOffset: a
          });
          return;
        }
        return this.data({
          closestOffset: i,
          minOffset: a
        }), vt(r) ? !1 : void 0;
      }
      function KE(e) {
        return Math.round(e * 10) / 10;
      }
      function XE(e, t, r) {
        var a = t || {}, n = a.scaleMinimum, i = n === void 0 ? 2 : n, o = a.lowerBound, u = o === void 0 ? !1 : o, s = r.attr("content") || "";
        if (!s)
          return !0;
        var l = s.split(/[;,]/).reduce(function(d, f) {
          var p = f.trim();
          if (!p)
            return d;
          var m = p.split("="), h = $(m, 2), v = h[0], g = h[1];
          if (!v || !g)
            return d;
          var b = v.toLowerCase().trim(), D = g.toLowerCase().trim();
          return b === "maximum-scale" && D === "yes" && (D = 1), b === "maximum-scale" && parseFloat(D) < 0 || (d[b] = D), d;
        }, {});
        if (u && l["maximum-scale"] && parseFloat(l["maximum-scale"]) < u)
          return !0;
        if (!u && l["user-scalable"] === "no")
          return this.data("user-scalable=no"), !1;
        var c = parseFloat(l["user-scalable"]);
        return !u && l["user-scalable"] && (c || c === 0) && c > -1 && c < 1 ? (this.data("user-scalable"), !1) : l["maximum-scale"] && parseFloat(l["maximum-scale"]) < i ? (this.data("maximum-scale"), !1) : !0;
      }
      var ZE = XE;
      function JE(e, t, r, a) {
        var n = a || {}, i = n.cssom, o = i === void 0 ? void 0 : i, u = t || {}, s = u.degreeThreshold, l = s === void 0 ? 0 : s;
        if (!o || !o.length)
          return;
        for (var c = !1, d = [], f = v(o), p = function() {
          var N = h[m], z = f[N], H = z.root, Q = z.rules, ie = Q.filter(g);
          if (!ie.length)
            return 1;
          ie.forEach(function(Y) {
            var te = Y.cssRules;
            Array.from(te).forEach(function(B) {
              var Z = b(B);
              if (Z && B.selectorText.toUpperCase() !== "HTML") {
                var A = Array.from(H.querySelectorAll(B.selectorText)) || [];
                d = d.concat(A);
              }
              c = c || Z;
            });
          });
        }, m = 0, h = Object.keys(f); m < h.length; m++)
          p();
        if (!c)
          return !0;
        return d.length && this.relatedNodes(d), !1;
        function v(S) {
          return S.reduce(function(N, z) {
            var H = z.sheet, Q = z.root, ie = z.shadowId, Y = ie || "topDocument";
            if (N[Y] || (N[Y] = {
              root: Q,
              rules: []
            }), !H || !H.cssRules)
              return N;
            var te = Array.from(H.cssRules);
            return N[Y].rules = N[Y].rules.concat(te), N;
          }, {});
        }
        function g(S) {
          var N = S.type, z = S.cssText;
          return N !== 4 ? !1 : /orientation:\s*landscape/i.test(z) || /orientation:\s*portrait/i.test(z);
        }
        function b(S) {
          var N = S.selectorText, z = S.style;
          if (!N || z.length <= 0)
            return !1;
          var H = z.transform || z.webkitTransform || z.msTransform || !1;
          if (!H && !z.rotate)
            return !1;
          var Q = D(H), ie = w("rotate", z.rotate), Y = Q + ie;
          return !Y || (Y = Math.abs(Y), Math.abs(Y - 180) % 180 <= l) ? !1 : Math.abs(Y - 90) % 90 <= l;
        }
        function D(S) {
          if (!S)
            return 0;
          var N = S.match(/(rotate|rotateZ|rotate3d|matrix|matrix3d)\(([^)]+)\)(?!.*(rotate|rotateZ|rotate3d|matrix|matrix3d))/);
          if (!N)
            return 0;
          var z = $(N, 3), H = z[1], Q = z[2];
          return w(H, Q);
        }
        function w(S, N) {
          switch (S) {
            case "rotate":
            case "rotateZ":
              return _(N);
            case "rotate3d":
              var z = N.split(",").map(function(Y) {
                return Y.trim();
              }), H = $(z, 4), Q = H[2], ie = H[3];
              return parseInt(Q) === 0 ? void 0 : _(ie);
            case "matrix":
            case "matrix3d":
              return F(N);
            default:
              return 0;
          }
        }
        function _(S) {
          var N = S.match(/(deg|grad|rad|turn)/) || [], z = $(N, 1), H = z[0];
          if (!H)
            return 0;
          var Q = parseFloat(S.replace(H, ""));
          switch (H) {
            case "rad":
              return R(Q);
            case "grad":
              return I(Q);
            case "turn":
              return V(Q);
            case "deg":
            default:
              return parseInt(Q);
          }
        }
        function F(S) {
          var N = S.split(",");
          if (N.length <= 6) {
            var z = $(N, 2), H = z[0], Q = z[1], ie = Math.atan2(parseFloat(Q), parseFloat(H));
            return R(ie);
          }
          var Y = parseFloat(N[8]), te = Math.asin(Y), B = Math.cos(te), Z = Math.acos(parseFloat(N[0]) / B);
          return R(Z);
        }
        function R(S) {
          return Math.round(S * (180 / Math.PI));
        }
        function I(S) {
          return S = S % 400, S < 0 && (S += 400), Math.round(S / 400 * 360);
        }
        function V(S) {
          return Math.round(360 / (1 / S));
        }
      }
      var QE = JE;
      function e5(e, t) {
        var r = e.hasAttribute("controls");
        if (e.hasAttribute("loop"))
          return r;
        if (!e.duration) {
          console.warn("axe.utils.preloadMedia did not load metadata");
          return;
        }
        var a = t.allowedDuration, n = a === void 0 ? 3 : a, i = o(e);
        if (i <= n)
          return !0;
        if (!r)
          return !1;
        return !0;
        function o(l) {
          if (!l.currentSrc)
            return 0;
          var c = u(l.currentSrc);
          return c ? c.length === 1 ? Math.abs(l.duration - c[0]) : Math.abs(c[1] - c[0]) : Math.abs(l.duration - (l.currentTime || 0));
        }
        function u(l) {
          var c = l.match(/#t=(.*)/);
          if (c) {
            var d = $(c, 2), f = d[1], p = f.split(",");
            return p.map(function(m) {
              return /:/.test(m) ? s(m) : parseFloat(m);
            });
          }
        }
        function s(l) {
          for (var c = l.split(":"), d = 0, f = 1; c.length > 0; )
            d += f * parseInt(c.pop(), 10), f *= 60;
          return parseFloat(d);
        }
      }
      var t5 = e5;
      function r5(e, t) {
        return t.isViolation ? !1 : void 0;
      }
      var a5 = r5, Gf = " > ";
      function n5(e) {
        var t = {};
        return e.filter(function(r) {
          var a = r.node.ancestry[r.node.ancestry.length - 1] !== "html";
          if (a) {
            var n = r.node.ancestry.flat(1 / 0).join(Gf);
            return t[n] = r, !0;
          }
          var i = r.node.ancestry.slice(0, r.node.ancestry.length - 1).flat(1 / 0).join(Gf);
          return t[i] && (t[i].result = !0), !1;
        });
      }
      var i5 = n5;
      function o5(e, t, r) {
        var a = ft(r, "track"), n = a.some(function(i) {
          return (i.attr("kind") || "").toLowerCase() === "captions";
        });
        return n ? !1 : void 0;
      }
      var u5 = o5;
      function s5(e, t, r) {
        var a = r.children;
        if (!a || !a.length)
          return !1;
        for (var n = !1, i = !1, o, u = 0; u < a.length; u++) {
          if (o = a[u].props.nodeName.toUpperCase(), o === "DT" && (n = !0), n && o === "DD")
            return !1;
          o === "DD" && (i = !0);
        }
        return n || i;
      }
      var l5 = s5;
      function c5(e, t, r) {
        var a = !1, n = !1, i = !0, o = [], u = [], s = [];
        return r.children.forEach(function(l) {
          var c = l.actualNode;
          if (c.nodeType === 3 && c.nodeValue.trim() !== "") {
            a = !0;
            return;
          }
          if (!(c.nodeType !== 1 || !Re(c))) {
            i = !1;
            var d = c.nodeName.toUpperCase() === "LI", f = ce(l), p = f === "listitem";
            !d && !p && o.push(c), d && !p && (u.push(c), s.includes(f) || s.push(f)), p && (n = !0);
          }
        }), a || o.length ? (this.relatedNodes(o), !0) : i || n ? !1 : (this.relatedNodes(u), this.data({
          messageKey: "roleNotValid",
          roles: s.join(", ")
        }), !0);
      }
      var d5 = c5;
      function f5(e, t, r) {
        var a = ["definition", "term", "list"], n = {
          badNodes: [],
          hasNonEmptyTextNode: !1
        }, i = r.children.reduce(function(u, s) {
          var l = s.actualNode;
          return l.nodeName.toUpperCase() === "DIV" && ce(l) === null ? u.concat(s.children) : u.concat(s);
        }, []), o = i.reduce(function(u, s) {
          var l = s.actualNode, c = l.nodeName.toUpperCase();
          if (l.nodeType === 1 && Re(l)) {
            var d = De(l);
            (c !== "DT" && c !== "DD" || d) && (a.includes(d) || u.badNodes.push(l));
          } else l.nodeType === 3 && l.nodeValue.trim() !== "" && (u.hasNonEmptyTextNode = !0);
          return u;
        }, n);
        return o.badNodes.length && this.relatedNodes(o.badNodes), !!o.badNodes.length || o.hasNonEmptyTextNode;
      }
      function p5(e, t, r) {
        var a = r.parent;
        if (a) {
          var n = a.props.nodeName, i = De(a);
          return ["presentation", "none", "list"].includes(i) ? !0 : i && qr(i) ? (this.data({
            messageKey: "roleNotValid"
          }), !1) : ["ul", "ol", "menu"].includes(n);
        }
      }
      function m5(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0, a = [], n = [];
        if (r.children) {
          for (var i = Wf(r.children); i.length; ) {
            var o, u = i.shift(), s = u.vChild, l = u.nested;
            if (t.divGroups && !l && v5(s)) {
              if (!s.children)
                return;
              var c = Wf(s.children, !0);
              i.push.apply(i, ne(c));
              continue;
            }
            var d = h5(s, l, t);
            d && (n.includes(d) || n.push(d), (s == null || (o = s.actualNode) === null || o === void 0 ? void 0 : o.nodeType) === 1 && a.push(s.actualNode));
          }
          return n.length === 0 ? !1 : (this.data({
            values: n.join(", ")
          }), this.relatedNodes(a), !0);
        }
      }
      function h5(e, t, r) {
        var a = r.validRoles, n = a === void 0 ? [] : a, i = r.validNodeNames, o = i === void 0 ? [] : i, u = e.props, s = u.nodeName, l = u.nodeType, c = u.nodeValue, d = t ? "div > " : "";
        if (l === 3 && c.trim() !== "")
          return d + "#text";
        if (l !== 1 || !Re(e))
          return !1;
        var f = De(e);
        return f ? n.includes(f) ? !1 : d + "[role=".concat(f, "]") : o.includes(s) ? !1 : d + s;
      }
      function v5(e) {
        return e.props.nodeName === "div" && De(e) === null;
      }
      function Wf(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
        return e.map(function(r) {
          return {
            vChild: r,
            nested: t
          };
        });
      }
      function g5(e) {
        var t = Ue(e), r = t.nodeName.toUpperCase(), a = De(t);
        return r === "DIV" && ["presentation", "none", null].includes(a) && (t = Ue(t), r = t.nodeName.toUpperCase(), a = De(t)), r !== "DL" ? !1 : !!(!a || ["presentation", "none", "list"].includes(a));
      }
      var b5 = g5;
      function y5(e, t, r) {
        var a = Fr(r.attr("lang")), n = Fr(r.attr("xml:lang"));
        return a === n;
      }
      var w5 = y5;
      function D5(e, t, r) {
        var a = [];
        return t.attributes.forEach(function(n) {
          var i = r.attr(n);
          if (typeof i == "string") {
            var o = Fr(i), u = t.value ? !t.value.map(Fr).includes(o) : !ri(o);
            (o !== "" && u || i !== "" && !re(i)) && a.push(n + '="' + r.attr(n) + '"');
          }
        }), !a.length || r.props.nodeName !== "html" && !jo(r) ? !1 : (this.data(a), !0);
      }
      var _5 = D5;
      function Uu(e) {
        return (e || "").trim() !== "";
      }
      function x5(e, t, r) {
        var a = typeof L < "u" ? tn(L) : !1;
        if (t.attributes.includes("xml:lang") && t.attributes.includes("lang") && Uu(r.attr("xml:lang")) && !Uu(r.attr("lang")) && !a)
          return this.data({
            messageKey: "noXHTML"
          }), !1;
        var n = t.attributes.some(function(i) {
          return Uu(r.attr(i));
        });
        return n ? !0 : (this.data({
          messageKey: "noLang"
        }), !1);
      }
      var E5 = x5;
      function A5(e, t, r) {
        var a = ce(e), n = Ge(r);
        return n = n ? n.toLowerCase() : null, this.data({
          role: a,
          accessibleText: n
        }), this.relatedNodes([e]), !0;
      }
      var C5 = A5;
      function F5(e) {
        var t = [];
        return e.filter(function(r) {
          var a = function(o) {
            return r.data.role === o.data.role && r.data.accessibleText === o.data.accessibleText;
          }, n = t.find(a);
          return n ? (n.result = !1, n.relatedNodes.push(r.relatedNodes[0]), !1) : (t.push(r), r.relatedNodes = [], !0);
        });
      }
      var T5 = F5;
      function R5(e, t, r) {
        var a = Cn(r), n = xn(r), i = r.attr("aria-describedby");
        return !a && !!(n || i);
      }
      var S5 = R5;
      function k5(e) {
        var t = Oe(e.getAttribute("id")), r = e.parentNode, a = Xe(e);
        a = a.documentElement || a;
        var n = Array.from(a.querySelectorAll('label[for="'.concat(t, '"]')));
        for (n.length && (n = n.filter(function(u) {
          return !er(u);
        })); r; )
          r.nodeName.toUpperCase() === "LABEL" && n.indexOf(r) === -1 && n.push(r), r = r.parentNode;
        if (this.relatedNodes(n), n.length > 1) {
          var i = n.filter(function(u) {
            return Re(u);
          });
          if (i.length > 1)
            return;
          var o = Ot(e, "aria-labelledby");
          return o.includes(i[0]) ? !1 : void 0;
        }
        return !1;
      }
      var O5 = k5;
      function M5(e, t) {
        var r = Yf(t), a = Yf(e);
        return !r || !a ? !1 : r.includes(a);
      }
      function Yf(e) {
        var t = Da(e, {
          emoji: !0,
          nonBmp: !0,
          punctuations: !0
        });
        return re(t);
      }
      function I5(e, t, r) {
        var a, n = t?.pixelThreshold, i = (a = t?.occurrenceThreshold) !== null && a !== void 0 ? a : t?.occuranceThreshold, o = wr(e).toLowerCase(), u = re(tr(r, {
          subtreeDescendant: !0,
          ignoreIconLigature: !0,
          pixelThreshold: n,
          occurrenceThreshold: i
        })).toLowerCase();
        if (!u)
          return !0;
        if (!(Po(o) < 1 || Po(u) < 1))
          return M5(u, o);
      }
      var P5 = I5;
      function N5(e, t, r) {
        try {
          var a = ut(r, "label");
          if (a) {
            var n = re(Ge(a, {
              inControlContext: !0,
              startNode: r
            }));
            return a.actualNode && this.relatedNodes([a.actualNode]), this.data({
              implicitLabel: n
            }), !!n;
          }
          return !1;
        } catch {
          return;
        }
      }
      var L5 = N5;
      function B5(e, t, r) {
        if (r.hasAttr("id")) {
          if (!r.actualNode)
            return;
          var a = Xe(e), n = Oe(e.getAttribute("id")), i = a.querySelector('label[for="'.concat(n, '"]'));
          if (i && !Re(i)) {
            var o;
            try {
              o = Ge(r).trim();
            } catch {
              return;
            }
            var u = o === "";
            return u;
          }
        }
        return !1;
      }
      var q5 = B5;
      function j5(e, t, r) {
        var a = Cn(r), n = e.getAttribute("title");
        if (!a)
          return !1;
        if (!n && (n = "", e.getAttribute("aria-describedby"))) {
          var i = Ot(e, "aria-describedby");
          n = i.map(function(o) {
            return o ? wr(o) : "";
          }).join("");
        }
        return re(n) === re(a);
      }
      var z5 = j5;
      function V5(e, t, r) {
        var a = this;
        if (!r.attr("id"))
          return !1;
        if (r.actualNode) {
          var n = Xe(r.actualNode), i = Oe(r.attr("id")), o = Array.from(n.querySelectorAll('label[for="'.concat(i, '"]')));
          if (this.relatedNodes(o), !o.length)
            return !1;
          try {
            return o.some(function(u) {
              if (st(u)) {
                var s = re(wr(u, {
                  inControlContext: !0,
                  startNode: r
                }));
                return a.data({
                  explicitLabel: s
                }), !!s;
              } else
                return !0;
            });
          } catch {
            return;
          }
        }
      }
      var H5 = V5;
      function $5(e, t, r) {
        if (["none", "presentation"].includes(ce(r)))
          return !1;
        var a = ut(r, t.parentSelector);
        if (!a)
          return !1;
        var n = It(a, !0).toLowerCase();
        return n === "" ? !1 : n === Ge(r).toLowerCase();
      }
      var U5 = $5;
      function G5(e, t, r) {
        var a = r.attr("alt"), n = /^\s+$/;
        return typeof a == "string" && n.test(a);
      }
      var W5 = G5;
      function Y5(e, t, r) {
        var a = Lt(r.attr("tabindex"));
        return a === null || a <= 0;
      }
      var K5 = Y5;
      function X5(e, t, r) {
        if (r.children)
          try {
            var a = Kf(r);
            if (!a.length)
              return !0;
            var n = a.filter(Z5);
            return n.length > 0 ? (this.data({
              messageKey: "notHidden"
            }), this.relatedNodes(n)) : this.relatedNodes(a), !1;
          } catch {
            return;
          }
      }
      function Kf(e) {
        if (!e.children) {
          if (e.props.nodeType === 1)
            throw new Error("Cannot determine children");
          return [];
        }
        var t = [];
        return e.children.forEach(function(r) {
          At(r) === "widget" && Ne(r) ? t.push(r) : t.push.apply(t, ne(Kf(r)));
        }), t;
      }
      function Z5(e) {
        var t = Lt(e.attr("tabindex"));
        return t !== null && t < 0;
      }
      function J5(e) {
        var t = Ur("landmark"), r = Ue(e), a = ce(e);
        for (this.data({
          role: a
        }); r; ) {
          var n = r.getAttribute("role");
          if (!n && r.nodeName.toUpperCase() !== "FORM" && (n = Mt(r)), n && t.includes(n) && !(n === "main" && a === "complementary"))
            return !1;
          r = Ue(r);
        }
        return !0;
      }
      var Q5 = J5;
      function eA(e, t, r) {
        if (r.children)
          try {
            return !r.children.some(function(a) {
              return Xf(a);
            });
          } catch {
            return;
          }
      }
      function Xf(e) {
        if (vt(e))
          return !0;
        if (!e.children) {
          if (e.props.nodeType === 1)
            throw new Error("Cannot determine children");
          return !1;
        }
        return e.children.some(function(t) {
          return Xf(t);
        });
      }
      function tA(e, t, r) {
        var a = ["button", "fieldset", "input", "select", "textarea"], n = r.tabbableElements;
        if (!n || !n.length)
          return !0;
        var i = n.filter(function(o) {
          return !a.includes(o.props.nodeName);
        });
        return this.relatedNodes(i.map(function(o) {
          return o.actualNode;
        })), i.length === 0 || xa() ? !0 : i.every(function(o) {
          var u = o.getComputedStylePropertyValue("pointer-events"), s = parseInt(o.getComputedStylePropertyValue("width")), l = parseInt(o.getComputedStylePropertyValue("height"));
          return o.actualNode.onfocus || (s === 0 || l === 0) && u === "none";
        }) ? void 0 : !1;
      }
      var rA = tA;
      function aA(e, t, r) {
        if (!vt(r))
          return !1;
        try {
          return !Ge(r);
        } catch {
          return;
        }
      }
      var nA = aA;
      function iA(e, t, r) {
        var a = r.tabbableElements.map(function(n) {
          var i = n.actualNode;
          return i;
        });
        if (!a || !a.length)
          return !0;
        if (xa()) {
          this.relatedNodes(a);
          return;
        }
        return !0;
      }
      var oA = iA;
      function uA(e, t, r) {
        if (r.hasAttr("contenteditable") && a(r))
          return !0;
        return vt(r);
        function a(n) {
          var i = n.attr("contenteditable");
          if (i === "true" || i === "")
            return !0;
          if (i === "false")
            return !1;
          var o = ut(r.parent, "[contenteditable]");
          return o ? a(o) : !1;
        }
      }
      var sA = uA;
      function lA(e, t, r) {
        var a = ["button", "fieldset", "input", "select", "textarea"], n = r.tabbableElements;
        if (!n || !n.length)
          return !0;
        var i = n.filter(function(o) {
          return a.includes(o.props.nodeName);
        });
        return this.relatedNodes(i.map(function(o) {
          return o.actualNode;
        })), i.length === 0 || xa() ? !0 : i.every(function(o) {
          var u = o.getComputedStylePropertyValue("pointer-events"), s = parseInt(o.getComputedStylePropertyValue("width")), l = parseInt(o.getComputedStylePropertyValue("height"));
          return o.actualNode.onfocus || (s === 0 || l === 0) && u === "none";
        }) ? void 0 : !1;
      }
      var cA = lA;
      function dA(e, t, r) {
        var a = r.tabbableElements;
        if (!a)
          return !1;
        var n = a.filter(function(i) {
          return i !== r;
        });
        return n.length > 0;
      }
      var fA = dA;
      function pA(e, t, r) {
        return er(r) || (this.data(r.attr("accesskey")), this.relatedNodes([e])), !0;
      }
      var mA = pA;
      function hA(e) {
        var t = {};
        return e.filter(function(r) {
          if (!r.data)
            return !1;
          var a = r.data.toUpperCase();
          return t[a] ? (t[a].relatedNodes.push(r.relatedNodes[0]), !1) : (t[a] = r, r.relatedNodes = [], !0);
        }).map(function(r) {
          return r.result = !!r.relatedNodes.length, r;
        });
      }
      var vA = hA;
      function gA(e, t, r) {
        if (!t || !t.selector || typeof t.selector != "string")
          throw new TypeError("page-no-duplicate requires options.selector to be a string");
        var a = "page-no-duplicate;" + t.selector;
        if (ue.get(a)) {
          this.data("ignored");
          return;
        }
        ue.set(a, !0);
        var n = Bt(x._tree[0], t.selector, function(i) {
          return Re(i);
        });
        return typeof t.nativeScopeFilter == "string" && (n = n.filter(function(i) {
          return i.actualNode.hasAttribute("role") || !Nr(i, t.nativeScopeFilter);
        })), typeof t.role == "string" && (n = n.filter(function(i) {
          return ce(i) === t.role;
        })), this.relatedNodes(n.filter(function(i) {
          return i !== r;
        }).map(function(i) {
          return i.actualNode;
        })), n.length <= 1;
      }
      var bA = gA;
      function yA(e) {
        return e.filter(function(t) {
          return t.data !== "ignored";
        });
      }
      var wA = yA;
      function DA(e, t, r) {
        return ya(r, t.matcher);
      }
      var _A = DA;
      function xA(e, t, r) {
        try {
          return re(tr(r)) !== "";
        } catch {
          return;
        }
      }
      function EA(e, t, r) {
        if (!t || !t.selector || typeof t.selector != "string")
          throw new TypeError("has-descendant requires options.selector to be a string");
        if (t.passForModal && xa())
          return !0;
        var a = Bt(r, t.selector, function(n) {
          return Re(n);
        });
        return this.relatedNodes(a.map(function(n) {
          return n.actualNode;
        })), a.length > 0;
      }
      var AA = EA;
      function CA(e) {
        var t = e.some(function(r) {
          return r.result === !0;
        });
        return t && e.forEach(function(r) {
          r.result = !0;
        }), e;
      }
      var FA = CA;
      function TA(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0;
        if (!t.attribute || typeof t.attribute != "string")
          throw new TypeError("attr-non-space-content requires options.attribute to be a string");
        if (!r.hasAttr(t.attribute))
          return this.data({
            messageKey: "noAttr"
          }), !1;
        var a = r.attr(t.attribute), n = !re(a);
        return n ? (this.data({
          messageKey: "emptyAttr"
        }), !1) : !0;
      }
      var RA = TA;
      function SA(e, t, r) {
        var a = r.attr("autocomplete") || "";
        return Wc(a, t);
      }
      var kA = SA;
      function OA(e, t, r) {
        if (r.props.nodeName !== "input")
          return !0;
        var a = ["text", "search", "number", "tel"], n = ["text", "search", "url"], i = {
          bday: ["text", "search", "date"],
          email: ["text", "search", "email"],
          username: ["text", "search", "email"],
          "street-address": ["text"],
          tel: ["text", "search", "tel"],
          "tel-country-code": ["text", "search", "tel"],
          "tel-national": ["text", "search", "tel"],
          "tel-area-code": ["text", "search", "tel"],
          "tel-local": ["text", "search", "tel"],
          "tel-local-prefix": ["text", "search", "tel"],
          "tel-local-suffix": ["text", "search", "tel"],
          "tel-extension": ["text", "search", "tel"],
          "cc-number": a,
          "cc-exp": ["text", "search", "month", "tel"],
          "cc-exp-month": a,
          "cc-exp-year": a,
          "cc-csc": a,
          "transaction-amount": a,
          "bday-day": a,
          "bday-month": a,
          "bday-year": a,
          "new-password": ["text", "search", "password"],
          "current-password": ["text", "search", "password"],
          url: n,
          photo: n,
          impp: n
        };
        O(t) === "object" && Object.keys(t).forEach(function(d) {
          i[d] || (i[d] = []), i[d] = i[d].concat(t[d]);
        });
        var o = r.attr("autocomplete"), u = o.split(/\s+/g).map(function(d) {
          return d.toLowerCase();
        }), s = u[u.length - 1];
        if (Er.stateTerms.includes(s))
          return !0;
        var l = i[s], c = r.hasAttr("type") ? re(r.attr("type")).toLowerCase() : "text";
        return c = ti().includes(c) ? c : "text", typeof l > "u" ? c === "text" : l.includes(c);
      }
      var MA = OA, IA = ["block", "list-item", "table", "flex", "grid", "inline-block"];
      function PA(e) {
        if (Zf(e))
          return !1;
        for (var t = Ue(e); t && t.nodeType === 1 && !Zf(t); )
          t = Ue(t);
        if (t) {
          if (this.relatedNodes([t]), Rf(e, t))
            return !0;
          if (NA(e)) {
            this.data({
              messageKey: "pseudoContent"
            });
            return;
          }
          return !1;
        }
      }
      function Zf(e) {
        var t = E.getComputedStyle(e).getPropertyValue("display");
        return IA.indexOf(t) !== -1 || t.substr(0, 6) === "table-";
      }
      function NA(e) {
        for (var t = 0, r = ["before", "after"]; t < r.length; t++) {
          var a = r[t], n = E.getComputedStyle(e, ":".concat(a)), i = n.getPropertyValue("content");
          if (i !== "none")
            return !0;
        }
        return !1;
      }
      function Jf(e, t) {
        var r = e.getRelativeLuminance(), a = t.getRelativeLuminance();
        return (Math.max(r, a) + 0.05) / (Math.min(r, a) + 0.05);
      }
      var LA = ["block", "list-item", "table", "flex", "grid", "inline-block"];
      function Qf(e) {
        var t = E.getComputedStyle(e).getPropertyValue("display");
        return LA.indexOf(t) !== -1 || t.substr(0, 6) === "table-";
      }
      function BA(e, t) {
        var r = t.requiredContrastRatio, a = t.allowSameColor;
        if (Qf(e))
          return !1;
        for (var n = Ue(e); n && n.nodeType === 1 && !Qf(n); )
          n = Ue(n);
        if (n) {
          this.relatedNodes([n]);
          var i = li(e), o = li(n), u = La(e), s = La(n), l = i && o ? Jf(i, o) : void 0;
          if (l && (l = Math.floor(l * 100) / 100), l && l >= r)
            return !0;
          var c = u && s ? Jf(u, s) : void 0;
          if (c && (c = Math.floor(c * 100) / 100), c && c >= r)
            return !0;
          if (!c) {
            var d, f = (d = We.get("bgColor")) !== null && d !== void 0 ? d : "bgContrast";
            this.data({
              messageKey: f
            }), We.clear();
            return;
          }
          if (l)
            return a && l === 1 && c === 1 ? !0 : l === 1 && c > 1 ? (this.data({
              messageKey: "bgContrast",
              contrastRatio: c,
              requiredContrastRatio: r,
              nodeBackgroundColor: u ? u.toHexString() : void 0,
              parentBackgroundColor: s ? s.toHexString() : void 0
            }), !1) : (this.data({
              messageKey: "fgContrast",
              contrastRatio: l,
              requiredContrastRatio: r,
              nodeColor: i ? i.toHexString() : void 0,
              parentColor: o ? o.toHexString() : void 0
            }), !1);
        }
      }
      var qA = BA;
      function jA(e, t, r) {
        var a = t.ignoreUnicode, n = t.ignoreLength, i = t.ignorePseudo, o = t.boldValue, u = t.boldTextPt, s = t.largeTextPt, l = t.contrastRatio, c = t.shadowOutlineEmMax, d = t.pseudoSizeThreshold;
        if (!st(e))
          return this.data({
            messageKey: "hidden"
          }), !0;
        var f = It(r, !1, !0);
        if (a && VA(f)) {
          this.data({
            messageKey: "nonBmp"
          });
          return;
        }
        var p = E.getComputedStyle(e), m = parseFloat(p.getPropertyValue("font-size")), h = p.getPropertyValue("font-weight"), v = parseFloat(h) >= o || h === "bold", g = Math.ceil(m * 72) / 96, b = v && g < u || !v && g < s, D = b ? l.normal : l.large, w = D.expected, _ = D.minThreshold, F = D.maxThreshold, R = zA(r, {
          ignorePseudo: i,
          pseudoSizeThreshold: d
        });
        if (R) {
          this.data({
            fontSize: "".concat((m * 72 / 96).toFixed(1), "pt (").concat(m, "px)"),
            fontWeight: v ? "bold" : "normal",
            messageKey: "pseudoContent",
            expectedContrastRatio: w + ":1"
          }), this.relatedNodes(R.actualNode);
          return;
        }
        var I = si(e, {
          minRatio: 1e-3,
          maxRatio: c
        });
        if (I === null) {
          this.data({
            messageKey: "complexTextShadows"
          });
          return;
        }
        var V = [], S = La(e, V, c), N = li(e, !1, S, t), z = null, H = null, Q = null;
        if (I.length === 0)
          z = Gr(S, N);
        else if (N && S) {
          Q = [].concat(ne(I), [S]).reduce(zu);
          var ie = Gr(S, N), Y = Gr(S, Q), te = Gr(Q, N);
          z = Math.max(ie, Y, te), z !== ie && (H = Y > te ? "shadowOnBgColor" : "fgOnShadowColor");
        }
        var B = z > w;
        if (typeof _ == "number" && (typeof z != "number" || z < _) || typeof F == "number" && (typeof z != "number" || z > F))
          return this.data({
            contrastRatio: z
          }), !0;
        var Z = Math.floor(z * 100) / 100, A;
        S === null ? A = We.get("bgColor") : B || (A = H);
        var U = Z === 1, P = f.length === 1;
        if (U ? A = We.set("bgColor", "equalRatio") : !B && P && !n && (A = "shortTextContent"), this.data({
          fgColor: N ? N.toHexString() : void 0,
          bgColor: S ? S.toHexString() : void 0,
          contrastRatio: Z,
          fontSize: "".concat((m * 72 / 96).toFixed(1), "pt (").concat(m, "px)"),
          fontWeight: v ? "bold" : "normal",
          messageKey: A,
          expectedContrastRatio: w + ":1",
          shadowColor: Q ? Q.toHexString() : void 0
        }), N === null || S === null || U || P && !n && !B) {
          A = null, We.clear(), this.relatedNodes(V);
          return;
        }
        return B || this.relatedNodes(V), B;
      }
      function zA(e, t) {
        var r = t.pseudoSizeThreshold, a = r === void 0 ? 0.25 : r, n = t.ignorePseudo, i = n === void 0 ? !1 : n;
        if (!i) {
          var o = e.boundingClientRect, u = o.width * o.height * a;
          do {
            var s = ep(e.actualNode, ":before"), l = ep(e.actualNode, ":after");
            if (s + l > u)
              return e;
          } while (e = e.parent);
        }
      }
      var ep = Fe(function(t, r) {
        var a = E.getComputedStyle(t, r), n = function(s, l) {
          return a.getPropertyValue(s) === l;
        };
        if (n("content", "none") || n("display", "none") || n("visibility", "hidden") || n("position", "absolute") === !1 || Ar(a).alpha === 0 && n("background-image", "none"))
          return 0;
        var i = tp(a.getPropertyValue("width")), o = tp(a.getPropertyValue("height"));
        return i.unit !== "px" || o.unit !== "px" ? i.value === 0 || o.value === 0 ? 0 : 1 / 0 : i.value * o.value;
      });
      function VA(e) {
        var t = {
          nonBmp: !0
        }, r = Mo(e, t), a = re(Da(e, t)) === "";
        return r && a;
      }
      function tp(e) {
        var t = /^([0-9.]+)([a-z]+)$/i, r = e.match(t) || [], a = $(r, 3), n = a[1], i = n === void 0 ? "" : n, o = a[2], u = o === void 0 ? "" : o;
        return {
          value: parseFloat(i),
          unit: u.toLowerCase()
        };
      }
      var HA = {
        ARTICLE: !0,
        ASIDE: !0,
        NAV: !0,
        SECTION: !0
      }, $A = {
        alert: !0,
        alertdialog: !0,
        application: !0,
        article: !0,
        banner: !1,
        complementary: !0,
        contentinfo: !0,
        dialog: !0,
        form: !0,
        log: !0,
        main: !0,
        navigation: !0,
        region: !0,
        search: !1,
        status: !0,
        tabpanel: !0
      };
      function UA(e) {
        var t = e.nodeName.toUpperCase();
        return HA[t] || !1;
      }
      function GA(e, t) {
        var r = De(e);
        return r && ($A[r] || t.roles.includes(r)) || !1;
      }
      function WA(e, t) {
        return GA(e, t) || UA(e);
      }
      var YA = WA;
      function KA(e, t, r) {
        var a = ce(r, {
          dpub: !0,
          fallback: !0
        }), n = _o(a);
        return n && this.data(a), n;
      }
      var XA = KA;
      function ZA(e, t, r) {
        var a = ce(r, {
          noImplicit: !0
        });
        this.data(a);
        var n, i;
        try {
          n = re(So(r)).toLowerCase(), i = re(Ge(r)).toLowerCase();
        } catch {
          return;
        }
        if (!i && !n)
          return !1;
        if (!(!i && n) && i.includes(n))
          return !1;
      }
      var JA = ZA;
      function QA(e, t, r) {
        return Ne(r);
      }
      var eC = QA;
      function tC(e, t, r) {
        var a = Ze(r.attr("role")), n = a.every(function(i) {
          return !qr(i.toLowerCase(), {
            allowAbstract: !0
          });
        });
        return n ? (this.data(a), !0) : !1;
      }
      var rC = tC;
      function aC(e) {
        var t = e.getAttribute("role");
        if (t === null)
          return !1;
        var r = At(t);
        return r === "widget" || r === "composite";
      }
      var nC = aC;
      function iC(e, t, r) {
        var a = Dr().filter(function(n) {
          return r.hasAttr(n);
        });
        return this.data(a), a.length > 0;
      }
      var oC = iC;
      function uC(e, t) {
        var r = Mt(e);
        return !r && t.length === 2 && t.includes("none") && t.includes("presentation");
      }
      function sC(e, t, r) {
        var a = Ze(r.attr("role"));
        return a.length <= 1 ? !1 : uC(r, a) ? void 0 : !0;
      }
      var lC = sC;
      function cC(e, t, r) {
        var a = ce(r, {
          dpub: !0,
          fallback: !0
        }), n = he.ariaRoles[a];
        return n != null && n.deprecated ? (this.data(a), !0) : !1;
      }
      function dC(e, t, r) {
        var a, n = (a = r.attr("aria-brailleroledescription")) !== null && a !== void 0 ? a : "";
        if (re(n) === "")
          return !0;
        var i = r.attr("aria-roledescription");
        return typeof i != "string" ? (this.data({
          messageKey: "noRoleDescription"
        }), !1) : re(i) === "" ? (this.data({
          messageKey: "emptyRoleDescription"
        }), !1) : !0;
      }
      function fC(e, t, r) {
        var a, n = (a = r.attr("aria-braillelabel")) !== null && a !== void 0 ? a : "";
        if (!n.trim())
          return !0;
        try {
          return re(Ge(r)) !== "";
        } catch {
          return;
        }
      }
      function pC(e, t, r) {
        t = Array.isArray(t.value) ? t.value : [];
        var a = "", n = "", i = [], o = /^aria-/, u = ["aria-errormessage"], s = {
          "aria-controls": function() {
            var c = ["false", null].includes(r.attr("aria-haspopup")) === !1;
            return c && (a = 'aria-controls="'.concat(r.attr("aria-controls"), '"'), n = "controlsWithinPopup"), r.attr("aria-expanded") !== "false" && r.attr("aria-selected") !== "false" && c === !1;
          },
          "aria-current": function(c) {
            c || (a = 'aria-current="'.concat(r.attr("aria-current"), '"'), n = "ariaCurrent");
          },
          "aria-owns": function() {
            return r.attr("aria-expanded") !== "false";
          },
          "aria-describedby": function(c) {
            c || (a = 'aria-describedby="'.concat(r.attr("aria-describedby"), '"'), n = x._tree && x._tree[0]._hasShadowRoot ? "noIdShadow" : "noId");
          },
          "aria-labelledby": function(c) {
            c || (a = 'aria-labelledby="'.concat(r.attr("aria-labelledby"), '"'), n = x._tree && x._tree[0]._hasShadowRoot ? "noIdShadow" : "noId");
          }
        };
        if (r.attrNames.forEach(function(l) {
          if (!(u.includes(l) || t.includes(l) || !o.test(l))) {
            var c, d = r.attr(l);
            try {
              c = _f(r, l);
            } catch {
              a = "".concat(l, '="').concat(d, '"'), n = "idrefs";
              return;
            }
            (!s[l] || s[l](c)) && !c && (d === "" && !mC(l) ? (a = l, n = "empty") : i.push("".concat(l, '="').concat(d, '"')));
          }
        }), i.length)
          return this.data(i), !1;
        if (a) {
          this.data({
            messageKey: n,
            needsReview: a
          });
          return;
        }
        return !0;
      }
      function mC(e) {
        var t;
        return ((t = he.ariaAttrs[e]) === null || t === void 0 ? void 0 : t.type) === "string";
      }
      function hC(e, t, r) {
        t = Array.isArray(t.value) ? t.value : [];
        var a = [], n = /^aria-/;
        return r.attrNames.forEach(function(i) {
          t.indexOf(i) === -1 && n.test(i) && !oi(i) && a.push(i);
        }), a.length ? (this.data(a), !1) : !0;
      }
      var vC = hC;
      function gC(e, t, r) {
        var a = r.attrNames.filter(function(n) {
          var i = he.ariaAttrs[n];
          if (!oi(n))
            return !1;
          var o = i.unsupported;
          return O(o) !== "object" ? !!o : !ya(e, o.exceptions);
        });
        return a.length ? (this.data(a), !0) : !1;
      }
      var bC = gC;
      function yC(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0, a = ce(r), n = t.supportedRoles || [];
        if (n.includes(a))
          return !0;
        if (!(a && a !== "presentation" && a !== "none"))
          return !1;
      }
      var wC = yC;
      function rp(e, t, r, a) {
        var n = De(e);
        if (r || (r = Lu(n)), !r)
          return null;
        for (var i = r.includes("group"), o = a ? e : e.parent; o; ) {
          var u = ce(o, {
            noPresentational: !0
          });
          if (!u)
            o = o.parent;
          else if (u === "group" && i)
            t.includes(n) && r.push(n), r = r.filter(function(s) {
              return s !== "group";
            }), o = o.parent;
          else return r.includes(u) ? null : r;
        }
        return r;
      }
      function DC(e) {
        for (var t = [], r = null; e; ) {
          if (e.getAttribute("id")) {
            var a = Oe(e.getAttribute("id")), n = Xe(e);
            r = n.querySelector("[aria-owns~=".concat(a, "]")), r && t.push(r);
          }
          e = e.parentElement;
        }
        return t.length ? t : null;
      }
      function _C(e, t, r) {
        var a = t && Array.isArray(t.ownGroupRoles) ? t.ownGroupRoles : [], n = rp(r, a);
        if (!n)
          return !0;
        var i = DC(e);
        if (i) {
          for (var o = 0, u = i.length; o < u; o++)
            if (n = rp(le(i[o]), a, n, !0), !n)
              return !0;
        }
        return this.data(n), !1;
      }
      var xC = _C;
      function EC(e, t, r) {
        var a = t && Array.isArray(t.reviewEmpty) ? t.reviewEmpty : [], n = De(r, {
          dpub: !0
        }), i = Bu(n);
        if (i === null)
          return !0;
        var o = AC(r, i), u = o.filter(function(s) {
          var l = s.role, c = s.vNode;
          return c.props.nodeType === 1 && !i.includes(l);
        });
        if (u.length)
          return this.relatedNodes(u.map(function(s) {
            var l = s.vNode;
            return l;
          })), this.data({
            messageKey: "unallowed",
            values: u.map(function(s) {
              var l = s.vNode, c = s.attr;
              return TC(l, c);
            }).filter(function(s, l, c) {
              return c.indexOf(s) === l;
            }).join(", ")
          }), !1;
        if (CC(i, o))
          return !0;
        if (r.attr("aria-busy") === "true")
          return this.data({
            messageKey: "aria-busy"
          }), !0;
        if (this.data(i), !(a.includes(n) && !o.some(RC)))
          return !1;
      }
      function AC(e, t) {
        for (var r, a = [], n = wa(e), i = function() {
          if (r.props.nodeType === 3 && a.push({
            vNode: r,
            role: null
          }), r.props.nodeType !== 1 || !Re(r))
            return 1;
          var u = ce(r, {
            noPresentational: !0
          }), s = FC(r), l = !!s || Ne(r);
          if (!u && !l || ["group", "rowgroup"].includes(u) && t.some(function(d) {
            return d === u;
          }))
            n.push.apply(n, ne(r.children));
          else if (u || l) {
            var c = s || "tabindex";
            a.push({
              role: u,
              attr: c,
              vNode: r
            });
          }
        }; r = n.shift(); )
          i();
        return a;
      }
      function CC(e, t) {
        return t.some(function(r) {
          var a = r.role;
          return a && e.includes(a);
        });
      }
      function FC(e) {
        return Dr().find(function(t) {
          return e.hasAttr(t);
        });
      }
      function TC(e, t) {
        var r = e.props, a = r.nodeName, n = r.nodeType;
        if (n === 3)
          return "#text";
        var i = De(e, {
          dpub: !0
        });
        return i ? "[role=".concat(i, "]") : t ? a + "[".concat(t, "]") : a;
      }
      function RC(e) {
        var t = e.vNode;
        return t.props.nodeType === 3 ? t.props.nodeValue.trim().length > 0 : _a(t, !1, !0);
      }
      function SC(e) {
        var t, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = arguments.length > 2 ? arguments[2] : void 0, n = De(a), i = a.attrNames, o = Df(n);
        if (Array.isArray(r[n]) && (o = Ia(r[n], o)), !n || !i.length || !o.length || kC(a, n) || MC(a, n) || n === "slider" && (t = a.attr("aria-valuetext")) !== null && t !== void 0 && t.trim())
          return !0;
        var u = xr(a), s = o.filter(function(l) {
          return !a.attr(l) && !OC(u, l);
        });
        return s.length ? (this.data(s), !1) : !0;
      }
      function kC(e, t) {
        return t === "separator" && !Ne(e);
      }
      function OC(e, t) {
        var r;
        return ((r = e.implicitAttrs) === null || r === void 0 ? void 0 : r[t]) !== void 0;
      }
      function MC(e, t) {
        return t === "combobox" && e.attr("aria-expanded") === "false";
      }
      function IC(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0, a = t?.elementsAllowedAriaLabel || [], n = r.props.nodeName, i = ce(r, {
          chromium: !0
        }), o = PC(r, i, n, a), u = o.filter(function(c) {
          return r.attrNames.includes(c) ? re(r.attr(c)) !== "" : !1;
        });
        if (u.length === 0)
          return !1;
        var s = r.hasAttr("role") ? "hasRole" : "noRole";
        s += u.length > 1 ? "Plural" : "Singular", this.data({
          role: i,
          nodeName: n,
          messageKey: s,
          prohibited: u
        });
        var l = tr(r, {
          subtreeDescendant: !0
        });
        if (re(l) === "")
          return !0;
      }
      function PC(e, t, r, a) {
        var n = he.ariaRoles[t];
        return n ? n.prohibitedAttrs || [] : t || a.includes(r) || ap(e) === "widget" ? [] : ["aria-label", "aria-labelledby"];
      }
      var ap = Fe(function(t) {
        if (t) {
          var r = ce(t, {
            noPresentational: !0,
            chromium: !0
          });
          return r ? At(r) : ap(t.parent);
        }
      });
      function NC(e, t, r) {
        var a = r.attr("aria-level"), n = parseInt(a, 10);
        if (!(n > 6))
          return !0;
      }
      var LC = NC;
      function BC(e, t, r) {
        return r.attr("aria-hidden") !== "true";
      }
      var qC = BC;
      function jC(e, t, r) {
        t = Array.isArray(t) ? t : [];
        var a = r.attr("aria-errormessage"), n = r.hasAttr("aria-errormessage"), i = r.attr("aria-invalid"), o = r.hasAttr("aria-invalid");
        if (!o || i === "false")
          return !0;
        function u(s) {
          if (s.trim() === "")
            return he.ariaAttrs["aria-errormessage"].allowEmpty;
          var l;
          try {
            l = s && Ot(r, "aria-errormessage")[0];
          } catch {
            this.data({
              messageKey: "idrefs",
              values: Ze(s)
            });
            return;
          }
          if (l)
            return Re(l) ? l.getAttribute("role") === "alert" || l.getAttribute("aria-live") === "assertive" || l.getAttribute("aria-live") === "polite" || Ze(r.attr("aria-describedby")).indexOf(s) > -1 : (this.data({
              messageKey: "hidden",
              values: Ze(s)
            }), !1);
        }
        return t.indexOf(a) === -1 && n ? (this.data(Ze(a)), u.call(this, a)) : !0;
      }
      function np(e) {
        var t, r, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = a.invalidTableRowAttrs, i = arguments.length > 2 ? arguments[2] : void 0, o = (t = n == null || (r = n.filter) === null || r === void 0 ? void 0 : r.call(n, function(c) {
          return i.hasAttr(c);
        })) !== null && t !== void 0 ? t : [];
        if (o.length === 0)
          return !0;
        var u = zC(i), s = u && ce(u);
        if (!s || s === "treegrid")
          return !0;
        var l = "row".concat(o.length > 1 ? "Plural" : "Singular");
        return this.data({
          messageKey: l,
          invalidAttrs: o,
          ownerRole: s
        }), !1;
      }
      function zC(e) {
        if (e.parent) {
          var t = 'table:not([role]), [role~="treegrid"], [role~="table"], [role~="grid"]';
          return ut(e, t);
        }
      }
      function ip(e, t, r) {
        var a = r.props, n = a.nodeName, i = a.type, o = HC(r.attr("aria-checked"));
        if (n !== "input" || i !== "checkbox" || !o)
          return !0;
        var u = VC(r);
        return o === u ? !0 : (this.data({
          messageKey: "checkbox",
          checkState: u
        }), !1);
      }
      function VC(e) {
        return e.props.indeterminate ? "mixed" : e.props.checked ? "true" : "false";
      }
      function HC(e) {
        return e ? (e = e.toLowerCase(), ["mixed", "true"].includes(e) ? e : "false") : "";
      }
      var op = {
        row: np,
        checkbox: ip
      };
      function $C(e, t, r) {
        var a = ce(r);
        return op[a] ? op[a].call(this, e, t, r) : !0;
      }
      function UC(e, t, r) {
        return r.attr("aria-busy") === "true";
      }
      function GC(e) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0, a = t.allowImplicit, n = a === void 0 ? !0 : a, i = t.ignoredTags, o = i === void 0 ? [] : i, u = r.props.nodeName;
        if (o.map(function(l) {
          return l.toLowerCase();
        }).includes(u))
          return !0;
        var s = vf(r, n);
        return s.length ? (this.data(s), Re(r) ? !1 : void 0) : !0;
      }
      var WC = GC;
      function YC(e, t, r) {
        var a = [], n = ce(r), i = pf(n);
        Array.isArray(t[n]) && (i = Ia(t[n].concat(i)));
        var o = Ce(r.attrNames), u;
        try {
          for (o.s(); !(u = o.n()).done; ) {
            var s = u.value;
            oi(s) && !i.includes(s) && !KC(s, r.attr(s), r) && a.push(s);
          }
        } catch (l) {
          o.e(l);
        } finally {
          o.f();
        }
        if (!a.length)
          return !0;
        if (this.data(a.map(function(l) {
          return l + '="' + r.attr(l) + '"';
        })), !(!n && !_u(r) && !Ne(r)))
          return !1;
      }
      function KC(e, t, r) {
        return !!(e === "aria-required" && t === "false" || e === "aria-multiline" && t === "false" && r.hasAttr("contenteditable"));
      }
      function XC(e, t, r) {
        var a = Ze(r.attr("role")).filter(function(n) {
          return At(n) === "abstract";
        });
        return a.length > 0 ? (this.data(a), !0) : !1;
      }
      var ZC = XC;
      function JC(e) {
        var t = Fr(e.getAttribute("lang")), r = Fr(e.getAttribute("xml:lang"));
        return ri(t) && ri(r);
      }
      var QC = JC;
      function eF(e) {
        return e.ownerDocument.defaultView.self === e.ownerDocument.defaultView.top;
      }
      var tF = eF;
      function rF(e, t) {
        try {
          var r = t.props.nodeName;
          return r === "svg" ? !0 : !!ut(t, "svg");
        } catch {
          return !1;
        }
      }
      var Gu = rF;
      function aF(e, t) {
        return nF.every(function(r) {
          return r(e, t);
        });
      }
      var nF = [function(e, t) {
        return up(t);
      }, function(e, t) {
        return iF(t);
      }, function(e, t) {
        return !Gu(e, t);
      }, function(e, t) {
        return Ne(t);
      }, function(e, t) {
        return vt(t) || !oF(t);
      }, function(e) {
        return !zo(e, {
          noLengthCompare: !0
        });
      }];
      function up(e) {
        return At(e) === "widget";
      }
      function iF(e) {
        return e.props.nodeName !== "area";
      }
      var oF = Fe(function e(t) {
        return t != null && t.parent ? up(t.parent) && vt(t.parent) ? !0 : e(t.parent) : !1;
      });
      function uF(e, t) {
        var r = ce(t);
        return ["treegrid", "grid", "table"].includes(r);
      }
      function sF(e, t) {
        var r = t.parent;
        if (r.props.nodeName !== "details" || lF(t))
          return !1;
        var a = r.children.find(function(n) {
          return n.props.nodeName === "summary";
        });
        return a === t;
      }
      function lF(e) {
        var t, r = (t = e.actualNode) === null || t === void 0 ? void 0 : t.parentElement;
        return r && r !== e.parent.actualNode;
      }
      function cF(e) {
        return lu(e) && mn(e);
      }
      var dF = cF;
      function fF(e, t) {
        return Yt(e, 13) !== void 0 && Nu(t) === !1 && pF(t);
      }
      function pF(e) {
        return ft(e, "*").some(function(t) {
          return _a(t, !0, !0);
        });
      }
      function mF(e, t) {
        return Mt(t, {
          chromiumRoles: !0
        }) !== null;
      }
      var hF = mF;
      function vF(e) {
        var t = Array.from(e.parentNode.childNodes), r = e.textContent.trim(), a = /[.!?:;](?![.!?:;])/g;
        if (r.length === 0 || (r.match(a) || []).length >= 2)
          return !1;
        var n = t.slice(t.indexOf(e) + 1).filter(function(i) {
          return i.nodeName.toUpperCase() === "P" && i.textContent.trim() !== "";
        });
        return n.length !== 0;
      }
      var gF = vF;
      function bF(e, t) {
        var r = De(t);
        if (!r || ["none", "presentation"].includes(r))
          return !0;
        var a = dc[r] || {}, n = a.accessibleNameRequired;
        return !!(n || Ne(t));
      }
      var sp = bF, yF = function(t, r) {
        return [sp, wF].every(function(a) {
          return a(t, r);
        });
      };
      function wF(e) {
        var t;
        if (!(e != null && (t = e.ownerDocument) !== null && t !== void 0 && t.createRange))
          return !0;
        var r = e.ownerDocument.createRange();
        return r.setStart(e, 0), r.setEnd(e, e.childNodes.length), r.getClientRects().length === 0;
      }
      function DF(e, t) {
        return t.props.nodeName !== "html";
      }
      var _F = DF;
      function xF(e, t) {
        return !t.attr("role");
      }
      var EF = xF;
      function AF(e, t) {
        var r = Lt(t.attr("tabindex"));
        return r === null || r >= 0;
      }
      var CF = AF;
      function FF(e, t) {
        var r = xr(t), a = r.namingMethods;
        return !(a && a.length !== 0 || De(t) === "combobox" && ft(t, 'input:not([type="hidden"])').length || Nu(t, {
          popupRoles: ["listbox"]
        }));
      }
      var TF = FF;
      function RF(e, t) {
        return !(!t.hasAttr("role") || !t.attr("role").trim());
      }
      var SF = RF;
      function kF(e) {
        return !(!e.currentSrc || e.hasAttribute("paused") || e.hasAttribute("muted"));
      }
      var OF = kF;
      function MF(e, t) {
        var r = ce(t);
        return r ? !!he.ariaRoles[r].childrenPresentational : !1;
      }
      var IF = MF;
      function PF(e) {
        var t = re(e.innerText), r = e.getAttribute("role");
        return r && r !== "link" || !t || !st(e) ? !1 : zo(e);
      }
      var NF = PF;
      function LF(e) {
        return !ni(e) && !Ne(e);
      }
      var BF = LF;
      function qF(e, t) {
        return jF(t) && Re(t);
      }
      function jF(e) {
        var t = Ur("landmark"), r = ce(e);
        if (!r)
          return !1;
        var a = e.props.nodeName;
        if (a === "section" || a === "form") {
          var n = Ge(e);
          return !!n;
        }
        return t.indexOf(r) >= 0 || r === "region";
      }
      function zF(e, t) {
        var r = "article, aside, main, nav, section";
        return e.hasAttribute("role") || !Nr(t, r);
      }
      var VF = zF;
      function HF(e, t) {
        if (t.props.nodeName !== "input" || t.hasAttr("type") === !1)
          return !0;
        var r = t.attr("type").toLowerCase();
        return ["hidden", "image", "button", "submit", "reset"].includes(r) === !1;
      }
      var $F = HF;
      function UF(e, t) {
        var r = ce(e);
        if (!r)
          return !1;
        var a = Ur("widget"), n = a.includes(r);
        if (!n)
          return !1;
        var i = Pu();
        return !(!i.includes(r) || !re(ba(t)) && !re(ga(e)) || !re(It(t)));
      }
      var GF = UF;
      function WF(e, t) {
        return st(t);
      }
      function YF(e) {
        return st(e);
      }
      function KF(e, t, r) {
        return r.initiator;
      }
      var lp = KF;
      function XF(e) {
        return Jc(e);
      }
      var ZF = XF;
      function JF(e, t) {
        var r = !!Ge(t);
        if (!r)
          return !1;
        var a = ce(e);
        return !(a && a !== "link");
      }
      var QF = JF;
      function e3(e, t) {
        return !Gu(e, t);
      }
      var t3 = e3;
      function r3(e, t) {
        return ce(t) === "heading";
      }
      function a3(e, t) {
        return Mt(t, {
          chromium: !0
        }) !== null;
      }
      var n3 = a3;
      function i3(e) {
        var t = e.getAttribute("title");
        return !!re(t);
      }
      var o3 = i3;
      function u3(e, t, r) {
        var a, n;
        return !r.initiator && !r.focusable && ((a = r.size) === null || a === void 0 ? void 0 : a.width) * ((n = r.size) === null || n === void 0 ? void 0 : n.height) > 1;
      }
      var s3 = u3;
      function l3(e) {
        var t = e.getAttribute("id").trim(), r = '*[id="'.concat(Oe(t), '"]'), a = Array.from(Xe(e).querySelectorAll(r));
        return !ii(e) && a.every(function(n) {
          return !Ne(n);
        });
      }
      var c3 = l3;
      function d3(e) {
        return ii(e);
      }
      var f3 = d3;
      function p3(e) {
        var t = e.getAttribute("id").trim(), r = '*[id="'.concat(Oe(t), '"]'), a = Array.from(Xe(e).querySelectorAll(r));
        return !ii(e) && a.some(Ne);
      }
      var m3 = p3;
      function h3(e) {
        return ni(e);
      }
      var v3 = h3;
      function g3(e) {
        if (ni(e)) {
          var t = Wt(e);
          return t.length >= 3 && t[0].length >= 3 && t[1].length >= 3 && t[2].length >= 3;
        }
        return !1;
      }
      var b3 = g3;
      function y3(e, t) {
        var r = t.props, a = r.nodeName, n = r.type;
        if (a === "option" || a === "select" && !e.options.length)
          return !1;
        var i = ["hidden", "range", "color", "checkbox", "radio", "image"];
        if (a === "input" && i.includes(n) || Ba(t) || wn(t))
          return !1;
        var o = ["input", "select", "textarea"];
        if (o.includes(a)) {
          var u = E.getComputedStyle(e), s = parseInt(u.getPropertyValue("text-indent"), 10);
          if (s) {
            var l = e.getBoundingClientRect();
            if (l = {
              top: l.top,
              bottom: l.bottom,
              left: l.left + s,
              right: l.right + s
            }, !cu(l, e))
              return !1;
          }
          return !0;
        }
        var c = Nr(t, "label");
        if (a === "label" || c) {
          var d = c || e, f = c ? le(c) : t;
          if (d.htmlFor) {
            var p = Xe(d), m = p.getElementById(d.htmlFor), h = m && le(m);
            if (h && Ba(h))
              return !1;
          }
          var v = 'input:not([type="hidden"],[type="image"],[type="button"],[type="submit"],[type="reset"]), select, textarea', g = ft(f, v)[0];
          if (g && Ba(g))
            return !1;
        }
        for (var b = [], D = t; D; ) {
          if (D.props.id) {
            var w = Iu(D).filter(function(N) {
              return Ze(N.getAttribute("aria-labelledby") || "").includes(D.props.id);
            }).map(function(N) {
              return le(N);
            });
            b.push.apply(b, ne(w));
          }
          D = D.parent;
        }
        if (b.length > 0 && b.every(Ba) || !_3(t))
          return !1;
        for (var _ = L.createRange(), F = t.children, R = 0; R < F.length; R++) {
          var I = F[R];
          I.actualNode.nodeType === 3 && re(I.actualNode.nodeValue) !== "" && _.selectNodeContents(I.actualNode);
        }
        var V = Array.from(_.getClientRects()), S = ma(t);
        return V.some(function(N) {
          var z = cu(N, e);
          if (!S.length)
            return z;
          var H = S.some(function(Q) {
            return oo(N, Q.boundingClientRect);
          });
          return z && H;
        });
      }
      var w3 = y3, D3 = {
        emoji: !0,
        nonBmp: !1,
        punctuations: !0
      };
      function _3(e) {
        var t = It(e, !1, !0);
        return t === "" || Da(t, D3) === "" ? !1 : e.children.some(function(r) {
          return r.props.nodeName === "#text" && !Io(r);
        });
      }
      function x3(e, t, r) {
        return lp(e, t, r) ? !!e.querySelector("a[href]") : !0;
      }
      var E3 = x3;
      function A3(e, t) {
        var r = t.attr("autocomplete");
        if (!r || re(r) === "")
          return !1;
        var a = t.props.nodeName;
        if (["textarea", "input", "select"].includes(a) === !1)
          return !1;
        var n = ["submit", "reset", "button", "hidden"];
        if (a === "input" && n.includes(t.props.type))
          return !1;
        var i = t.attr("aria-disabled") || "false";
        if (t.hasAttr("disabled") || i.toLowerCase() === "true")
          return !1;
        var o = t.attr("role"), u = Lt(t.attr("tabindex"));
        if (u < 0 && o) {
          var s = he.ariaRoles[o];
          if (s === void 0 || s.type !== "widget")
            return !1;
        }
        return !(u < 0 && t.actualNode && !st(t) && !Re(t));
      }
      var C3 = A3;
      function F3(e, t) {
        var r = De(t);
        return !!Lu(r);
      }
      var T3 = F3;
      function R3(e, t) {
        var r = De(t, {
          dpub: !0
        });
        return !!Bu(r);
      }
      var S3 = R3;
      function cp(e) {
        return e ? e.getAttribute("aria-hidden") === "true" ? !1 : cp(Ue(e)) : !0;
      }
      function k3(e) {
        return cp(Ue(e));
      }
      var O3 = k3;
      function M3(e, t) {
        var r = /^aria-/;
        return t.attrNames.some(function(a) {
          return r.test(a);
        });
      }
      var I3 = M3;
      function P3(e, t) {
        return De(t, {
          dpub: !0,
          fallback: !0
        }) !== null;
      }
      var N3 = P3;
      function L3(e, t) {
        var r = /^aria-/, a = t.attrNames;
        if (a.length) {
          for (var n = 0, i = a.length; n < i; n++)
            if (r.test(a[n]))
              return !0;
        }
        return !1;
      }
      var B3 = L3, q3 = {
        "abstractrole-evaluate": ZC,
        "accesskeys-after": vA,
        "accesskeys-evaluate": mA,
        "alt-space-value-evaluate": W5,
        "aria-allowed-attr-evaluate": YC,
        "aria-allowed-attr-matches": B3,
        "aria-allowed-role-evaluate": WC,
        "aria-allowed-role-matches": N3,
        "aria-busy-evaluate": UC,
        "aria-conditional-attr-evaluate": $C,
        "aria-conditional-checkbox-attr-evaluate": ip,
        "aria-conditional-row-attr-evaluate": np,
        "aria-errormessage-evaluate": jC,
        "aria-has-attr-matches": I3,
        "aria-hidden-body-evaluate": qC,
        "aria-hidden-focus-matches": O3,
        "aria-label-evaluate": Ax,
        "aria-labelledby-evaluate": xx,
        "aria-level-evaluate": LC,
        "aria-prohibited-attr-evaluate": IC,
        "aria-required-attr-evaluate": SC,
        "aria-required-children-evaluate": EC,
        "aria-required-children-matches": S3,
        "aria-required-parent-evaluate": xC,
        "aria-required-parent-matches": T3,
        "aria-roledescription-evaluate": wC,
        "aria-unsupported-attr-evaluate": bC,
        "aria-valid-attr-evaluate": vC,
        "aria-valid-attr-value-evaluate": pC,
        "attr-non-space-content-evaluate": RA,
        "autocomplete-appropriate-evaluate": MA,
        "autocomplete-matches": C3,
        "autocomplete-valid-evaluate": kA,
        "avoid-inline-spacing-evaluate": Dx,
        "braille-label-equivalent-evaluate": fC,
        "braille-roledescription-equivalent-evaluate": dC,
        "bypass-matches": E3,
        "caption-evaluate": u5,
        "caption-faked-evaluate": nx,
        "color-contrast-evaluate": jA,
        "color-contrast-matches": w3,
        "css-orientation-lock-evaluate": QE,
        "data-table-large-matches": b3,
        "data-table-matches": v3,
        "deprecatedrole-evaluate": cC,
        "dlitem-evaluate": b5,
        "doc-has-title-evaluate": yx,
        "duplicate-id-active-matches": m3,
        "duplicate-id-after": Rx,
        "duplicate-id-aria-matches": f3,
        "duplicate-id-evaluate": Fx,
        "duplicate-id-misc-matches": c3,
        "duplicate-img-label-evaluate": U5,
        "exists-evaluate": gx,
        "explicit-evaluate": H5,
        "fallbackrole-evaluate": lC,
        "focusable-content-evaluate": fA,
        "focusable-disabled-evaluate": cA,
        "focusable-element-evaluate": sA,
        "focusable-modal-open-evaluate": oA,
        "focusable-no-name-evaluate": nA,
        "focusable-not-tabbable-evaluate": rA,
        "frame-focusable-content-evaluate": eA,
        "frame-focusable-content-matches": s3,
        "frame-tested-after": i5,
        "frame-tested-evaluate": a5,
        "frame-title-has-text-matches": o3,
        "has-alt-evaluate": hx,
        "has-descendant-after": FA,
        "has-descendant-evaluate": AA,
        "has-global-aria-attribute-evaluate": oC,
        "has-implicit-chromium-role-matches": n3,
        "has-lang-evaluate": E5,
        "has-text-content-evaluate": xA,
        "has-widget-role-evaluate": nC,
        "heading-matches": r3,
        "heading-order-after": IE,
        "heading-order-evaluate": ME,
        "help-same-as-label-evaluate": z5,
        "hidden-content-evaluate": f_,
        "hidden-explicit-label-evaluate": q5,
        "html-namespace-matches": t3,
        "html5-scope-evaluate": rx,
        "identical-links-same-purpose-after": SE,
        "identical-links-same-purpose-evaluate": TE,
        "identical-links-same-purpose-matches": QF,
        "implicit-evaluate": L5,
        "inline-style-property-evaluate": fx,
        "inserted-into-focus-order-matches": ZF,
        "internal-link-present-evaluate": Zx,
        "invalid-children-evaluate": m5,
        "invalidrole-evaluate": rC,
        "is-element-focusable-evaluate": eC,
        "is-initiator-matches": lp,
        "is-on-screen-evaluate": dx,
        "is-visible-matches": YF,
        "is-visible-on-screen-matches": WF,
        "label-content-name-mismatch-evaluate": P5,
        "label-content-name-mismatch-matches": GF,
        "label-matches": $F,
        "landmark-has-body-context-matches": VF,
        "landmark-is-top-level-evaluate": Q5,
        "landmark-is-unique-after": T5,
        "landmark-is-unique-evaluate": C5,
        "landmark-unique-matches": qF,
        "layout-table-matches": BF,
        "link-in-text-block-evaluate": qA,
        "link-in-text-block-matches": NF,
        "link-in-text-block-style-evaluate": PA,
        "listitem-evaluate": p5,
        "matches-definition-evaluate": _A,
        "meta-refresh-evaluate": Kx,
        "meta-viewport-scale-evaluate": ZE,
        "multiple-label-evaluate": O5,
        "nested-interactive-matches": IF,
        "no-autoplay-audio-evaluate": t5,
        "no-autoplay-audio-matches": OF,
        "no-empty-role-matches": SF,
        "no-explicit-name-required-matches": sp,
        "no-focusable-content-evaluate": X5,
        "no-implicit-explicit-label-evaluate": JA,
        "no-naming-method-matches": TF,
        "no-negative-tabindex-matches": CF,
        "no-role-matches": EF,
        "non-empty-if-present-evaluate": lx,
        "not-html-matches": _F,
        "object-is-loaded-matches": yF,
        "only-dlitems-evaluate": f5,
        "only-listitems-evaluate": d5,
        "p-as-heading-evaluate": Gx,
        "p-as-heading-matches": gF,
        "page-no-duplicate-after": wA,
        "page-no-duplicate-evaluate": bA,
        "presentation-role-conflict-matches": hF,
        "presentational-role-evaluate": ux,
        "region-after": Vx,
        "region-evaluate": Lx,
        "same-caption-summary-evaluate": J_,
        "scope-value-evaluate": Z_,
        "scrollable-region-focusable-matches": fF,
        "skip-link-evaluate": Px,
        "skip-link-matches": dF,
        "structured-dlitems-evaluate": l5,
        "summary-interactive-matches": sF,
        "svg-namespace-matches": Gu,
        "svg-non-empty-title-evaluate": ox,
        "tabindex-evaluate": K5,
        "table-or-grid-role-matches": uF,
        "target-offset-evaluate": YE,
        "target-size-evaluate": jE,
        "td-has-header-evaluate": K_,
        "td-headers-attr-evaluate": __,
        "th-has-data-cells-evaluate": D_,
        "title-only-evaluate": S5,
        "unique-frame-title-after": Mx,
        "unique-frame-title-evaluate": kx,
        "unsupportedrole-evaluate": XA,
        "valid-lang-evaluate": _5,
        "valid-scrollable-semantics-evaluate": YA,
        "widget-not-inline-matches": aF,
        "window-is-top-matches": tF,
        "xml-lang-mismatch-evaluate": w5,
        "xml-lang-mismatch-matches": QC
      }, di = q3;
      function j3(e) {
        this.id = e.id, this.data = null, this.relatedNodes = [], this.result = null;
      }
      var Wu = j3;
      function Yu(e) {
        if (typeof e == "string") {
          if (di[e])
            return di[e];
          if (/^\s*function[\s\w]*\(/.test(e))
            return new Function("return " + e + ";")();
          throw new ReferenceError("Function ID does not exist in the metadata-function-map: ".concat(e));
        }
        return e;
      }
      function dp() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return (Array.isArray(e) || O(e) !== "object") && (e = {
          value: e
        }), e;
      }
      function Wr(e) {
        e && (this.id = e.id, this.configure(e));
      }
      Wr.prototype.enabled = !0, Wr.prototype.run = function(t, r, a, n, i) {
        r = r || {};
        var o = r.hasOwnProperty("enabled") ? r.enabled : this.enabled, u = this.getOptions(r.options);
        if (o) {
          var s = new Wu(this), l = Hi(s, r, n, i), c;
          try {
            c = this.evaluate.call(l, t.actualNode, u, t, a);
          } catch (d) {
            t && t.actualNode && (d.errorNode = ht.toSpec(t)), i(d);
            return;
          }
          l.isAsync || (s.result = c, n(s));
        } else
          n(null);
      }, Wr.prototype.runSync = function(t, r, a) {
        r = r || {};
        var n = r, i = n.enabled, o = i === void 0 ? this.enabled : i;
        if (!o)
          return null;
        var u = this.getOptions(r.options), s = new Wu(this), l = Hi(s);
        l.async = function() {
          throw new Error("Cannot run async check while in a synchronous run");
        };
        var c;
        try {
          c = this.evaluate.call(l, t.actualNode, u, t, a);
        } catch (d) {
          throw t && t.actualNode && (d.errorNode = ht.toSpec(t)), d;
        }
        return s.result = c, s;
      }, Wr.prototype.configure = function(t) {
        var r = this;
        (!t.evaluate || di[t.evaluate]) && (this._internalCheck = !0), t.hasOwnProperty("enabled") && (this.enabled = t.enabled), t.hasOwnProperty("options") && (this._internalCheck ? this.options = dp(t.options) : this.options = t.options), ["evaluate", "after"].filter(function(a) {
          return t.hasOwnProperty(a);
        }).forEach(function(a) {
          return r[a] = Yu(t[a]);
        });
      }, Wr.prototype.getOptions = function(t) {
        return this._internalCheck ? ao(this.options, dp(t || {})) : t || this.options;
      };
      var fp = Wr;
      function z3(e) {
        this.id = e.id, this.result = se.NA, this.pageLevel = e.pageLevel, this.impact = null, this.nodes = [];
      }
      var fi = z3;
      function it(e, t) {
        this._audit = t, this.id = e.id, this.selector = e.selector || "*", e.impact && (me(se.impact.includes(e.impact), "Impact ".concat(e.impact, " is not a valid impact")), this.impact = e.impact), this.excludeHidden = typeof e.excludeHidden == "boolean" ? e.excludeHidden : !0, this.enabled = typeof e.enabled == "boolean" ? e.enabled : !0, this.pageLevel = typeof e.pageLevel == "boolean" ? e.pageLevel : !1, this.reviewOnFail = typeof e.reviewOnFail == "boolean" ? e.reviewOnFail : !1, this.any = e.any || [], this.all = e.all || [], this.none = e.none || [], this.tags = e.tags || [], this.preload = !!e.preload, this.actIds = e.actIds, e.matches && (this.matches = Yu(e.matches));
      }
      it.prototype.matches = function() {
        return !0;
      }, it.prototype.gather = function(t) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = "mark_gather_start_" + this.id, n = "mark_gather_end_" + this.id, i = "mark_isVisibleToScreenReaders_start_" + this.id, o = "mark_isVisibleToScreenReaders_end_" + this.id;
        r.performanceTimer && ve.mark(a);
        var u = Tu(this.selector, t);
        return this.excludeHidden && (r.performanceTimer && ve.mark(i), u = u.filter(function(s) {
          return Re(s);
        }), r.performanceTimer && (ve.mark(o), ve.measure("rule_" + this.id + "#gather_axe.utils.isVisibleToScreenReaders", i, o))), r.performanceTimer && (ve.mark(n), ve.measure("rule_" + this.id + "#gather", a, n)), u;
      }, it.prototype.runChecks = function(t, r, a, n, i, o) {
        var u = this, s = kt();
        this[t].forEach(function(l) {
          var c = u._audit.checks[l.id || l], d = Xn(c, u.id, a);
          s.defer(function(f, p) {
            c.run(r, d, n, f, p);
          });
        }), s.then(function(l) {
          l = l.filter(function(c) {
            return c;
          }), i({
            type: t,
            results: l
          });
        }).catch(o);
      }, it.prototype.runChecksSync = function(t, r, a, n) {
        var i = this, o = [];
        return this[t].forEach(function(u) {
          var s = i._audit.checks[u.id || u], l = Xn(s, i.id, a);
          o.push(s.runSync(r, l, n));
        }), o = o.filter(function(u) {
          return u;
        }), {
          type: t,
          results: o
        };
      }, it.prototype.run = function(t) {
        var r = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0, i = arguments.length > 3 ? arguments[3] : void 0;
        a.performanceTimer && this._trackPerformance();
        var o = kt(), u = new fi(this), s;
        try {
          s = this.gatherAndMatchNodes(t, a);
        } catch (l) {
          i(new Jr({
            cause: l,
            ruleId: this.id
          }));
          return;
        }
        a.performanceTimer && this._logGatherPerformance(s), s.forEach(function(l) {
          o.defer(function(c, d) {
            var f = kt();
            ["any", "all", "none"].forEach(function(p) {
              f.defer(function(m, h) {
                r.runChecks(p, l, a, t, m, h);
              });
            }), f.then(function(p) {
              var m = pp(p);
              m && (m.node = new Ht(l), u.nodes.push(m), r.reviewOnFail && (["any", "all"].forEach(function(h) {
                m[h].forEach(function(v) {
                  v.result === !1 && (v.result = void 0);
                });
              }), m.none.forEach(function(h) {
                h.result === !0 && (h.result = void 0);
              }))), c();
            }).catch(function(p) {
              return d(p);
            });
          });
        }), o.then(function() {
          a.performanceTimer && r._logRulePerformance(), setTimeout(function() {
            n(u);
          }, 0);
        }).catch(function(l) {
          a.performanceTimer && r._logRulePerformance(), i(l);
        });
      }, it.prototype.runSync = function(t) {
        var r = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        a.performanceTimer && this._trackPerformance();
        var n = new fi(this), i;
        try {
          i = this.gatherAndMatchNodes(t, a);
        } catch (o) {
          throw new Jr({
            cause: o,
            ruleId: this.id
          });
        }
        return a.performanceTimer && this._logGatherPerformance(i), i.forEach(function(o) {
          var u = [];
          ["any", "all", "none"].forEach(function(l) {
            u.push(r.runChecksSync(l, o, a, t));
          });
          var s = pp(u);
          s && (s.node = o.actualNode ? new Ht(o) : null, n.nodes.push(s), r.reviewOnFail && (["any", "all"].forEach(function(l) {
            s[l].forEach(function(c) {
              c.result === !1 && (c.result = void 0);
            });
          }), s.none.forEach(function(l) {
            l.result === !0 && (l.result = void 0);
          })));
        }), a.performanceTimer && this._logRulePerformance(), n;
      }, it.prototype._trackPerformance = function() {
        this._markStart = "mark_rule_start_" + this.id, this._markEnd = "mark_rule_end_" + this.id, this._markChecksStart = "mark_runchecks_start_" + this.id, this._markChecksEnd = "mark_runchecks_end_" + this.id;
      }, it.prototype._logGatherPerformance = function(t) {
        vr("gather (", t.length, "):", ve.timeElapsed() + "ms"), ve.mark(this._markChecksStart);
      }, it.prototype._logRulePerformance = function() {
        ve.mark(this._markChecksEnd), ve.mark(this._markEnd), ve.measure("runchecks_" + this.id, this._markChecksStart, this._markChecksEnd), ve.measure("rule_" + this.id, this._markStart, this._markEnd);
      };
      function pp(e) {
        if (e.length) {
          var t = !1, r = {};
          return e.forEach(function(a) {
            var n = a.results.filter(function(i) {
              return i;
            });
            r[a.type] = n, n.length && (t = !0);
          }), t ? r : null;
        }
      }
      it.prototype.gatherAndMatchNodes = function(t, r) {
        var a = this, n = "mark_matches_start_" + this.id, i = "mark_matches_end_" + this.id, o = this.gather(t, r);
        return r.performanceTimer && ve.mark(n), o = o.filter(function(u) {
          return a.matches(u.actualNode, u, t);
        }), r.performanceTimer && (ve.mark(i), ve.measure("rule_" + this.id + "#matches", n, i)), o;
      };
      function V3(e) {
        return cn(e).map(function(t) {
          var r = e._audit.checks[t.id || t];
          return r && typeof r.after == "function" ? r : null;
        }).filter(Boolean);
      }
      function H3(e, t) {
        var r = [];
        return e.forEach(function(a) {
          var n = cn(a);
          n.forEach(function(i) {
            i.id === t && (i.node = a.node, r.push(i));
          });
        }), r;
      }
      function $3(e) {
        return e.filter(function(t) {
          return t.filtered !== !0;
        });
      }
      function U3(e) {
        var t = ["any", "all", "none"], r = e.nodes.filter(function(a) {
          var n = 0;
          return t.forEach(function(i) {
            a[i] = $3(a[i]), n += a[i].length;
          }), n > 0;
        });
        return e.pageLevel && r.length && (r = [r.reduce(function(a, n) {
          if (a)
            return t.forEach(function(i) {
              a[i].push.apply(a[i], n[i]);
            }), a;
        })]), r;
      }
      it.prototype.after = function(t, r) {
        var a = this, n = V3(this), i = this.id;
        return n.forEach(function(o) {
          var u = H3(t.nodes, o.id), s = Xn(o, i, r), l = o.after(u, s.options);
          a.reviewOnFail && l.forEach(function(c) {
            var d = (a.any.includes(c.id) || a.all.includes(c.id)) && c.result === !1, f = a.none.includes(c.id) && c.result === !0;
            (d || f) && (c.result = void 0);
          }), u.forEach(function(c) {
            delete c.node, l.indexOf(c) === -1 && (c.filtered = !0);
          });
        }), t.nodes = U3(t), t;
      }, it.prototype.configure = function(t) {
        t.hasOwnProperty("selector") && (this.selector = t.selector), t.hasOwnProperty("excludeHidden") && (this.excludeHidden = typeof t.excludeHidden == "boolean" ? t.excludeHidden : !0), t.hasOwnProperty("enabled") && (this.enabled = typeof t.enabled == "boolean" ? t.enabled : !0), t.hasOwnProperty("pageLevel") && (this.pageLevel = typeof t.pageLevel == "boolean" ? t.pageLevel : !1), t.hasOwnProperty("reviewOnFail") && (this.reviewOnFail = typeof t.reviewOnFail == "boolean" ? t.reviewOnFail : !1), t.hasOwnProperty("any") && (this.any = t.any), t.hasOwnProperty("all") && (this.all = t.all), t.hasOwnProperty("none") && (this.none = t.none), t.hasOwnProperty("tags") && (this.tags = t.tags), t.hasOwnProperty("actIds") && (this.actIds = t.actIds), t.hasOwnProperty("matches") && (this.matches = Yu(t.matches)), t.impact && (me(se.impact.includes(t.impact), "Impact ".concat(t.impact, " is not a valid impact")), this.impact = t.impact);
      };
      var Yr = ot($s()), Kr = /\{\{.+?\}\}/g, G3 = function() {
        function e(t) {
          Tt(this, e), this.lang = "en", this.defaultConfig = t, this.standards = he, this._init(), this._defaultLocale = null;
        }
        return Rt(e, [{
          key: "_setDefaultLocale",
          value: function() {
            if (!this._defaultLocale) {
              for (var r = {
                checks: {},
                rules: {},
                failureSummaries: {},
                incompleteFallbackMessage: "",
                lang: this.lang
              }, a = Object.keys(this.data.checks), n = 0; n < a.length; n++) {
                var i = a[n], o = this.data.checks[i], u = o.messages, s = u.pass, l = u.fail, c = u.incomplete;
                r.checks[i] = {
                  pass: s,
                  fail: l,
                  incomplete: c
                };
              }
              for (var d = Object.keys(this.data.rules), f = 0; f < d.length; f++) {
                var p = d[f], m = this.data.rules[p], h = m.description, v = m.help;
                r.rules[p] = {
                  description: h,
                  help: v
                };
              }
              for (var g = Object.keys(this.data.failureSummaries), b = 0; b < g.length; b++) {
                var D = g[b], w = this.data.failureSummaries[D], _ = w.failureMessage;
                r.failureSummaries[D] = {
                  failureMessage: _
                };
              }
              r.incompleteFallbackMessage = this.data.incompleteFallbackMessage, this._defaultLocale = r;
            }
          }
        }, {
          key: "_resetLocale",
          value: function() {
            var r = this._defaultLocale;
            r && this.applyLocale(r);
          }
        }, {
          key: "_applyCheckLocale",
          value: function(r) {
            for (var a = Object.keys(r), n = 0; n < a.length; n++) {
              var i = a[n];
              if (!this.data.checks[i])
                throw new Error('Locale provided for unknown check: "'.concat(i, '"'));
              this.data.checks[i] = Y3(this.data.checks[i], r[i]);
            }
          }
        }, {
          key: "_applyRuleLocale",
          value: function(r) {
            for (var a = Object.keys(r), n = 0; n < a.length; n++) {
              var i = a[n];
              if (!this.data.rules[i])
                throw new Error('Locale provided for unknown rule: "'.concat(i, '"'));
              this.data.rules[i] = K3(this.data.rules[i], r[i]);
            }
          }
        }, {
          key: "_applyFailureSummaries",
          value: function(r) {
            for (var a = Object.keys(r), n = 0; n < a.length; n++) {
              var i = a[n];
              if (!this.data.failureSummaries[i])
                throw new Error('Locale provided for unknown failureMessage: "'.concat(i, '"'));
              this.data.failureSummaries[i] = X3(this.data.failureSummaries[i], r[i]);
            }
          }
        }, {
          key: "applyLocale",
          value: function(r) {
            this._setDefaultLocale(), r.checks && this._applyCheckLocale(r.checks), r.rules && this._applyRuleLocale(r.rules), r.failureSummaries && this._applyFailureSummaries(r.failureSummaries, "failureSummaries"), r.incompleteFallbackMessage && (this.data.incompleteFallbackMessage = Z3(this.data.incompleteFallbackMessage, r.incompleteFallbackMessage)), r.lang && (this.lang = r.lang);
          }
        }, {
          key: "setAllowedOrigins",
          value: function(r) {
            var a = hp();
            this.allowedOrigins = [];
            var n = Ce(r), i;
            try {
              for (n.s(); !(i = n.n()).done; ) {
                var o = i.value;
                if (o === se.allOrigins) {
                  this.allowedOrigins = ["*"];
                  return;
                } else o !== se.sameOrigin ? this.allowedOrigins.push(o) : a && this.allowedOrigins.push(a);
              }
            } catch (u) {
              n.e(u);
            } finally {
              n.f();
            }
          }
        }, {
          key: "_init",
          value: function() {
            var r = W3(this.defaultConfig);
            this.lang = r.lang || "en", this.reporter = r.reporter, this.commands = {}, this.rules = [], this.checks = {}, this.brand = "axe", this.application = "axeAPI", this.tagExclude = ["experimental", "deprecated"], this.noHtml = r.noHtml, this.allowedOrigins = r.allowedOrigins, vp(r.rules, this, "addRule"), vp(r.checks, this, "addCheck"), this.data = {}, this.data.checks = r.data && r.data.checks || {}, this.data.rules = r.data && r.data.rules || {}, this.data.failureSummaries = r.data && r.data.failureSummaries || {}, this.data.incompleteFallbackMessage = r.data && r.data.incompleteFallbackMessage || "", this._constructHelpUrls();
          }
        }, {
          key: "registerCommand",
          value: function(r) {
            this.commands[r.id] = r.callback;
          }
        }, {
          key: "addRule",
          value: function(r) {
            r.metadata && (this.data.rules[r.id] = r.metadata);
            var a = this.getRule(r.id);
            a ? a.configure(r) : this.rules.push(new it(r, this));
          }
        }, {
          key: "addCheck",
          value: function(r) {
            var a = r.metadata;
            O(a) === "object" && (this.data.checks[r.id] = a, O(a.messages) === "object" && Object.keys(a.messages).filter(function(n) {
              return a.messages.hasOwnProperty(n) && typeof a.messages[n] == "string";
            }).forEach(function(n) {
              a.messages[n].indexOf("function") === 0 && (a.messages[n] = new Function("return " + a.messages[n] + ";")());
            })), this.checks[r.id] ? this.checks[r.id].configure(r) : this.checks[r.id] = new fp(r);
          }
        }, {
          key: "run",
          value: function(r, a, n, i) {
            this.normalizeOptions(a), Ht.setRunOptions(a), x._selectCache = [];
            var o = J3(this.rules, r, a), u = o.now, s = o.later, l = kt();
            u.forEach(function(f) {
              l.defer(gp(f, r, a));
            });
            var c = kt();
            s.length && c.defer(function(f) {
              $1(a).then(function(p) {
                return f(p);
              }).catch(function(p) {
                console.warn("Couldn't load preload assets: ", p), f(void 0);
              });
            });
            var d = kt();
            d.defer(l), d.defer(c), d.then(function(f) {
              var p = f.pop();
              if (p && p.length) {
                var m = p[0];
                m && (r = de({}, r, m));
              }
              var h = f[0];
              if (!s.length) {
                x._selectCache = void 0, n(h.filter(function(g) {
                  return !!g;
                }));
                return;
              }
              var v = kt();
              s.forEach(function(g) {
                var b = gp(g, r, a);
                v.defer(b);
              }), v.then(function(g) {
                x._selectCache = void 0, n(h.concat(g).filter(function(b) {
                  return !!b;
                }));
              }).catch(i);
            }).catch(i);
          }
        }, {
          key: "after",
          value: function(r, a) {
            var n = this.rules;
            return r.map(function(i) {
              var o = fa(n, "id", i.id);
              if (!o)
                throw new Error("Result for unknown rule. You may be running mismatch axe-core versions");
              return o.after(i, a);
            });
          }
        }, {
          key: "getRule",
          value: function(r) {
            return this.rules.find(function(a) {
              return a.id === r;
            });
          }
        }, {
          key: "normalizeOptions",
          value: function(r) {
            var a = this, n = [], i = [];
            if (a.rules.forEach(function(c) {
              i.push(c.id), c.tags.forEach(function(d) {
                n.includes(d) || n.push(d);
              });
            }), ["object", "string"].includes(O(r.runOnly))) {
              if (typeof r.runOnly == "string" && (r.runOnly = [r.runOnly]), Array.isArray(r.runOnly)) {
                var o = r.runOnly.find(function(c) {
                  return n.includes(c);
                }), u = r.runOnly.find(function(c) {
                  return i.includes(c);
                });
                if (o && u)
                  throw new Error("runOnly cannot be both rules and tags");
                u ? r.runOnly = {
                  type: "rule",
                  values: r.runOnly
                } : r.runOnly = {
                  type: "tag",
                  values: r.runOnly
                };
              }
              var s = r.runOnly;
              if (s.value && !s.values && (s.values = s.value, delete s.value), !Array.isArray(s.values) || s.values.length === 0)
                throw new Error("runOnly.values must be a non-empty array");
              if (["rule", "rules"].includes(s.type))
                s.type = "rule", s.values.forEach(function(c) {
                  if (!i.includes(c))
                    throw new Error("unknown rule `" + c + "` in options.runOnly");
                });
              else if (["tag", "tags", void 0].includes(s.type)) {
                s.type = "tag";
                var l = s.values.filter(function(c) {
                  return !n.includes(c) && !/wcag2[1-3]a{1,3}/.test(c);
                });
                l.length !== 0 && x.log("Could not find tags `" + l.join("`, `") + "`");
              } else
                throw new Error("Unknown runOnly type '".concat(s.type, "'"));
            }
            return O(r.rules) === "object" && Object.keys(r.rules).forEach(function(c) {
              if (!i.includes(c))
                throw new Error("unknown rule `" + c + "` in options.rules");
            }), r;
          }
        }, {
          key: "setBranding",
          value: function(r) {
            var a = {
              brand: this.brand,
              application: this.application
            };
            typeof r == "string" && (this.application = r), r && r.hasOwnProperty("brand") && r.brand && typeof r.brand == "string" && (this.brand = r.brand), r && r.hasOwnProperty("application") && r.application && typeof r.application == "string" && (this.application = r.application), this._constructHelpUrls(a);
          }
        }, {
          key: "_constructHelpUrls",
          value: function() {
            var r = this, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, n = (x.version.match(/^[1-9][0-9]*\.[0-9]+/) || ["x.y"])[0];
            this.rules.forEach(function(i) {
              r.data.rules[i.id] || (r.data.rules[i.id] = {});
              var o = r.data.rules[i.id];
              (typeof o.helpUrl != "string" || a && o.helpUrl === bp(a, i.id, n)) && (o.helpUrl = bp(r, i.id, n));
            });
          }
        }, {
          key: "resetRulesAndChecks",
          value: function() {
            this._init(), this._resetLocale();
          }
        }]);
      }(), mp = G3;
      function hp() {
        if (E.origin && E.origin !== "null")
          return E.origin;
        if (E.location && E.location.origin && E.location.origin !== "null")
          return E.location.origin;
      }
      function W3(e) {
        var t;
        if (e ? (t = $t(e), t.commons = e.commons) : t = {}, t.reporter = t.reporter || null, t.noHtml = t.noHtml || !1, !t.allowedOrigins) {
          var r = hp();
          t.allowedOrigins = r ? [r] : [];
        }
        return t.rules = t.rules || [], t.checks = t.checks || [], t.data = de({
          checks: {},
          rules: {}
        }, t.data), t;
      }
      function vp(e, t, r) {
        var a, n;
        for (a = 0, n = e.length; a < n; a++)
          t[r](e[a]);
      }
      var Y3 = function(t, r) {
        var a = r.pass, n = r.fail;
        return typeof a == "string" && Kr.test(a) && (a = Yr.default.compile(a)), typeof n == "string" && Kr.test(n) && (n = Yr.default.compile(n)), de({}, t, {
          messages: {
            pass: a || t.messages.pass,
            fail: n || t.messages.fail,
            incomplete: O(t.messages.incomplete) === "object" ? de({}, t.messages.incomplete, r.incomplete) : r.incomplete
          }
        });
      }, K3 = function(t, r) {
        var a = r.help, n = r.description;
        return typeof a == "string" && Kr.test(a) && (a = Yr.default.compile(a)), typeof n == "string" && Kr.test(n) && (n = Yr.default.compile(n)), de({}, t, {
          help: a || t.help,
          description: n || t.description
        });
      }, X3 = function(t, r) {
        var a = r.failureMessage;
        return typeof a == "string" && Kr.test(a) && (a = Yr.default.compile(a)), de({}, t, {
          failureMessage: a || t.failureMessage
        });
      }, Z3 = function(t, r) {
        return typeof r == "string" && Kr.test(r) && (r = Yr.default.compile(r)), r || t;
      };
      function J3(e, t, r) {
        var a = {
          now: [],
          later: []
        }, n = e.reduce(function(i, o) {
          return K1(o, t, r) ? o.preload ? (i.later.push(o), i) : (i.now.push(o), i) : i;
        }, a);
        return n;
      }
      function gp(e, t, r) {
        return r.performanceTimer && ve.mark("mark_rule_start_" + e.id), function(a, n) {
          e.run(t, r, function(i) {
            a(i);
          }, function(i) {
            if (r.debug)
              n(i);
            else {
              var o = Object.assign(new fi(e), {
                result: se.CANTTELL,
                description: "An error occured while running this rule",
                message: i.message,
                stack: i.stack,
                error: i,
                errorNode: i.errorNode
              });
              a(o);
            }
          });
        };
      }
      function bp(e, t, r) {
        var a = e.brand, n = e.application, i = e.lang;
        return se.helpUrlBase + a + "/" + (r || x.version.substring(0, x.version.lastIndexOf("."))) + "/" + t + "?application=" + encodeURIComponent(n) + (i && i !== "en" ? "&lang=" + encodeURIComponent(i) : "");
      }
      function yp(e) {
        var t = E && "Node" in E && "NodeList" in E, r = !!L;
        if (!(t && r)) {
          if (!e || !e.ownerDocument)
            throw new Error('Required "window" or "document" globals not defined and cannot be deduced from the context. Either set the globals before running or pass in a valid Element.');
          r || (ue.set("globalDocumentSet", !0), L = e.ownerDocument), t || (ue.set("globalWindowSet", !0), E = L.defaultView);
        }
      }
      function Q3() {
        ue.get("globalDocumentSet") && (ue.set("globalDocumentSet", !1), L = null), ue.get("globalWindowSet") && (ue.set("globalWindowSet", !1), E = null);
      }
      function eT() {
        Q3(), x._memoizedFns.forEach(function(e) {
          return e.clear();
        }), ue.clear(), x._tree = void 0, x._selectorData = void 0, x._selectCache = void 0;
      }
      var lr = eT;
      function wp(e, t, r, a) {
        try {
          e = new Zn(e), x._tree = e.flatTree, x._selectorData = rn(e.flatTree);
        } catch (o) {
          return lr(), a(o);
        }
        var n = kt(), i = x._audit;
        t.performanceTimer && ve.auditStart(), e.frames.length && t.iframes !== !1 && n.defer(function(o, u) {
          Cl(e, t, "rules", null, o, u);
        }), n.defer(function(o, u) {
          i.run(e, t, o, u);
        }), n.then(function(o) {
          try {
            t.performanceTimer && ve.auditEnd();
            var u = dn(o.map(function(s) {
              return {
                results: s
              };
            }));
            e.initiator && (t.performanceTimer && ve.mark("auditAfterStart"), u = i.after(u, t), t.performanceTimer && (ve.mark("auditAfterEnd"), ve.measure("audit.after", "auditAfterStart", "auditAfterEnd"), ve.logMeasures("audit.after")), u.forEach(ei), u = u.map(na));
            try {
              r(u, lr);
            } catch (s) {
              lr(), vr(s);
            }
          } catch (s) {
            lr(), a(s);
          }
        }).catch(function(o) {
          lr(), a(o);
        });
      }
      function tT(e) {
        x._audit = new mp(e);
      }
      function rT(e, t, r) {
        var a = r, n = function(s) {
          s instanceof Error || (s = new Error(s)), r(s);
        }, i = e && e.context || {};
        i.hasOwnProperty("include") && !i.include.length && (i.include = [L]);
        var o = e && e.options || {};
        switch (e.command) {
          case "rules":
            return wp(i, o, function(u, s) {
              u = ht.mapRawResults(u), a(u), s();
            }, n);
          case "cleanup-plugin":
            return nf(a, n);
          default:
            if (x._audit && x._audit.commands && x._audit.commands[e.command])
              return x._audit.commands[e.command](e, r);
        }
      }
      E.top !== E && (Et.subscribe("axe.start", rT), Et.subscribe("axe.ping", function(e, t, r) {
        r({
          axe: !0
        });
      }));
      function ja(e) {
        this._run = e.run, this._collect = e.collect, this._registry = {}, e.commands.forEach(function(t) {
          x._audit.registerCommand(t);
        });
      }
      ja.prototype.run = function() {
        return this._run.apply(this, arguments);
      }, ja.prototype.collect = function() {
        return this._collect.apply(this, arguments);
      }, ja.prototype.cleanup = function(t) {
        var r = x.utils.queue(), a = this;
        Object.keys(this._registry).forEach(function(n) {
          r.defer(function(i) {
            a._registry[n].cleanup(i);
          });
        }), r.then(t);
      }, ja.prototype.add = function(t) {
        this._registry[t.id] = t;
      };
      function aT(e) {
        x.plugins[e.id] = new ja(e);
      }
      var nT = aT;
      function iT() {
        var e = x._audit;
        if (!e)
          throw new Error("No audit configured");
        e.resetRulesAndChecks(), Hb();
      }
      var oT = iT;
      function uT(e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        r.reporter = r.reporter || x._audit.reporter || "v1", x._selectorData = {}, t instanceof $e || (t = new af(t));
        var a = S1(e);
        if (!a)
          throw new Error("unknown rule `" + e + "`");
        a = Object.create(a, {
          excludeHidden: {
            value: !1
          }
        });
        var n = {
          initiator: !0,
          include: [t],
          exclude: [],
          frames: [],
          page: !1,
          focusable: !0,
          size: {},
          flatTree: []
        }, i = a.runSync(n, r);
        ei(i), na(i);
        var o = Ks([i]);
        return o.violations.forEach(function(u) {
          return u.nodes.forEach(function(s) {
            s.failureSummary = vu(s);
          });
        }), de({}, ur(), o, {
          toolOptions: r
        });
      }
      function Dp(e) {
        var t, r, a, n = $(e, 3), i = n[0], o = n[1], u = n[2], s = new TypeError("axe.run arguments are invalid");
        if (!I1(i)) {
          if (u !== void 0)
            throw s;
          u = o, o = i, i = L;
        }
        if (O(o) !== "object") {
          if (u !== void 0)
            throw s;
          u = o, o = {};
        }
        if (typeof u != "function" && u !== void 0)
          throw s;
        return o = $t(o), o.reporter = (t = (r = o.reporter) !== null && r !== void 0 ? r : (a = x._audit) === null || a === void 0 ? void 0 : a.reporter) !== null && t !== void 0 ? t : "v1", {
          context: i,
          options: o,
          callback: u
        };
      }
      var Ku = function() {
      };
      function sT() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        yp(t[0]);
        var a = Dp(t), n = a.context, i = a.options, o = a.callback, u = o === void 0 ? Ku : o, s = lT(u), l = s.thenable, c = s.resolve, d = s.reject;
        try {
          me(x._audit, "No audit configured"), me(!x._running, "Axe is already running. Use `await axe.run()` to wait for the previous run to finish before starting a new run.");
        } catch (m) {
          return dT(m, u);
        }
        x._running = !0, i.performanceTimer && ve.start();
        function f(m, h) {
          var v = function(D) {
            i.performanceTimer && (ve.mark("reporterEnd"), ve.measure("reporter", "reporterStart", "reporterEnd"), ve.logMeasures("reporter"), ve.end()), x._running = !1, h();
            try {
              c(D);
            } catch (w) {
              x.log(w);
            }
          }, g = function(D) {
            x._running = !1, h();
            try {
              d(D);
            } catch (w) {
              x.log(w);
            }
          };
          try {
            i.performanceTimer && ve.mark("reporterStart"), cT(m, i, v, g);
          } catch (b) {
            g(b);
          }
        }
        function p(m) {
          i.performanceTimer && ve.end(), x._running = !1, u(m), d(m);
        }
        return x._runRules(n, i, f, p), l;
      }
      function lT(e) {
        var t, r, a;
        return typeof Promise == "function" && e === Ku ? t = new Promise(function(n, i) {
          r = i, a = n;
        }) : (a = function(i) {
          return e(null, i);
        }, r = function(i) {
          return e(i);
        }), {
          thenable: t,
          reject: r,
          resolve: a
        };
      }
      function cT(e, t, r, a) {
        var n = ku(t.reporter), i = n(e, t, r, a);
        i !== void 0 && r(i);
      }
      function dT(e, t) {
        if (typeof t == "function" && t !== Ku) {
          t(e.message);
          return;
        }
        throw e;
      }
      function fT() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        var a = Dp(t), n = a.options, i = a.context;
        me(x._audit, "Axe is not configured. Audit is missing."), me(!x._running, "Axe is already running. Use `await axe.run()` to wait for the previous run to finish before starting a new run.");
        var o = new Zn(i, x._tree);
        return x._tree = o.flatTree, x._selectorData = rn(o.flatTree), x._running = !0, n.elementRef = !1, new Promise(function(u, s) {
          x._audit.run(o, n, u, s);
        }).then(function(u) {
          u = ht.mapRawResults(u);
          var s = o.frames.map(function(c) {
            var d = c.node;
            return ht.toSpec(d);
          }), l;
          return o.initiator && (l = ur()), x._running = !1, lr(), {
            results: u,
            frames: s,
            environmentData: l
          };
        }).catch(function(u) {
          return x._running = !1, lr(), Promise.reject(u);
        });
      }
      function pT(e) {
        var t, r, a, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        n = $t(n);
        var i = e.find(function(s) {
          return s.environmentData;
        }) || {}, o = i.environmentData;
        x._audit.normalizeOptions(n), n.reporter = (t = (r = n.reporter) !== null && r !== void 0 ? r : (a = x._audit) === null || a === void 0 ? void 0 : a.reporter) !== null && t !== void 0 ? t : "v1", mT(e);
        var u = dn(e);
        return u = x._audit.after(u, n), u.forEach(ei), u = u.map(na), vT(u, de({
          environmentData: o
        }, n));
      }
      function mT(e) {
        var t = [], r = Ce(e), a;
        try {
          for (r.s(); !(a = r.n()).done; ) {
            var n = a.value, i = t.shift();
            if (n) {
              n.frameSpec = i ?? null;
              var o = hT(n);
              t.unshift.apply(t, ne(o));
            }
          }
        } catch (u) {
          r.e(u);
        } finally {
          r.f();
        }
      }
      function hT(e) {
        var t = e.frames, r = e.frameSpec;
        return r ? t.map(function(a) {
          return ht.mergeSpecs(a, r);
        }) : t;
      }
      function vT(e, t) {
        return new Promise(function(r, a) {
          var n = ku(t.reporter);
          n(e, t, r, a);
        });
      }
      function gT(e) {
        if (x._tree)
          throw new Error("Axe is already setup. Call `axe.teardown()` before calling `axe.setup` again.");
        return e && O(e.documentElement) === "object" && O(e.defaultView) === "object" && (e = e.documentElement), yp(e), x._tree = mu(e), x._selectorData = rn(x._tree), x._tree[0];
      }
      var bT = gT, yT = function(t, r, a) {
        console.warn('"na" reporter will be deprecated in axe v4.0. Use the "v2" reporter instead.'), typeof r == "function" && (a = r, r = {});
        var n = r, i = n.environmentData, o = qe(n, Lp);
        a(de({}, ur(i), {
          toolOptions: o
        }, Ma(t, r)));
      }, wT = yT, DT = function(t, r, a) {
        typeof r == "function" && (a = r, r = {});
        var n = r, i = n.environmentData, o = qe(n, Bp);
        r.resultTypes = ["violations"];
        var u = Ma(t, r), s = u.violations;
        a(de({}, ur(i), {
          toolOptions: o,
          violations: s
        }));
      }, _T = DT, xT = function(t, r, a) {
        if (typeof r == "function" && (a = r, r = {}), !t || !Array.isArray(t))
          return a(t);
        var n = t.map(function(i) {
          for (var o = de({}, i), u = ["passes", "violations", "incomplete", "inapplicable"], s = 0, l = u; s < l.length; s++) {
            var c = l[s];
            o[c] = ht.mapRawNodeResults(o[c]);
          }
          return o;
        });
        a(n);
      }, _p = xT, ET = function(t, r, a) {
        typeof r == "function" && (a = r, r = {});
        var n = r, i = n.environmentData, o = qe(n, qp);
        _p(t, o, function(u) {
          var s = ur(i);
          a({
            raw: u,
            env: s
          });
        });
      }, AT = ET, CT = function(t, r, a) {
        typeof r == "function" && (a = r, r = {});
        var n = r, i = n.environmentData, o = qe(n, jp), u = Ma(t, r), s = function(c) {
          c.nodes.forEach(function(d) {
            d.failureSummary = vu(d);
          });
        };
        u.incomplete.forEach(s), u.violations.forEach(s), a(de({}, ur(i), {
          toolOptions: o
        }, u));
      }, FT = CT, TT = function(t, r, a) {
        typeof r == "function" && (a = r, r = {});
        var n = r, i = n.environmentData, o = qe(n, zp), u = Ma(t, r);
        a(de({}, ur(i), {
          toolOptions: o
        }, u));
      }, RT = TT, ST = {
        base: {
          Audit: mp,
          CheckResult: Wu,
          Check: fp,
          Context: Zn,
          RuleResult: fi,
          Rule: it,
          metadataFunctionMap: di
        },
        public: {
          reporters: Pa
        },
        helpers: {
          failureSummary: vu,
          incompleteFallbackMessage: gu,
          processAggregate: Ma
        },
        utils: {
          setDefaultFrameMessenger: wl,
          cacheNodeSelectors: _1,
          getNodesMatchingExpression: w1,
          convertSelector: nn
        },
        commons: {
          dom: {
            nativelyHidden: Sl,
            displayHidden: kl,
            visibilityHidden: Ol,
            contentVisibiltyHidden: Ml,
            ariaHidden: Il,
            opacityHidden: Pl,
            scrollHidden: Nl,
            overflowHidden: Ll,
            clipHidden: Bl,
            areaHidden: uo,
            detailsHidden: ql
          }
        }
      }, kT = ST;
      x._thisWillBeDeletedDoNotUse = kT, x.constants = se, x.log = vr, x.AbstractVirtualNode = $e, x.SerialVirtualNode = af, x.VirtualNode = du, x._cache = ue, x.imports = id, x.cleanup = nf, x.configure = u_, x.frameMessenger = s_, x.getRules = c_, x._load = tT, x.plugins = {}, x.registerPlugin = nT, x.hasReporter = uf, x.getReporter = ku, x.addReporter = i_, x.reset = oT, x._runRules = wp, x.runVirtualRule = uT, x.run = sT, x.setup = bT, x.teardown = lr, x.runPartial = fT, x.finishRun = pT, x.commons = Cf, x.utils = Li, x.addReporter("na", wT), x.addReporter("no-passes", _T), x.addReporter("rawEnv", AT), x.addReporter("raw", _p), x.addReporter("v1", FT), x.addReporter("v2", RT, !0);
    })(), x._load({
      lang: "en",
      data: {
        rules: {
          accesskeys: {
            description: "Ensure every accesskey attribute value is unique",
            help: "accesskey attribute value should be unique"
          },
          "area-alt": {
            description: "Ensure <area> elements of image maps have alternative text",
            help: "Active <area> elements must have alternative text"
          },
          "aria-allowed-attr": {
            description: "Ensure an element's role supports its ARIA attributes",
            help: "Elements must only use supported ARIA attributes"
          },
          "aria-allowed-role": {
            description: "Ensure role attribute has an appropriate value for the element",
            help: "ARIA role should be appropriate for the element"
          },
          "aria-braille-equivalent": {
            description: "Ensure aria-braillelabel and aria-brailleroledescription have a non-braille equivalent",
            help: "aria-braille attributes must have a non-braille equivalent"
          },
          "aria-command-name": {
            description: "Ensure every ARIA button, link and menuitem has an accessible name",
            help: "ARIA commands must have an accessible name"
          },
          "aria-conditional-attr": {
            description: "Ensure ARIA attributes are used as described in the specification of the element's role",
            help: "ARIA attributes must be used as specified for the element's role"
          },
          "aria-deprecated-role": {
            description: "Ensure elements do not use deprecated roles",
            help: "Deprecated ARIA roles must not be used"
          },
          "aria-dialog-name": {
            description: "Ensure every ARIA dialog and alertdialog node has an accessible name",
            help: "ARIA dialog and alertdialog nodes should have an accessible name"
          },
          "aria-hidden-body": {
            description: 'Ensure aria-hidden="true" is not present on the document body.',
            help: 'aria-hidden="true" must not be present on the document body'
          },
          "aria-hidden-focus": {
            description: "Ensure aria-hidden elements are not focusable nor contain focusable elements",
            help: "ARIA hidden element must not be focusable or contain focusable elements"
          },
          "aria-input-field-name": {
            description: "Ensure every ARIA input field has an accessible name",
            help: "ARIA input fields must have an accessible name"
          },
          "aria-meter-name": {
            description: "Ensure every ARIA meter node has an accessible name",
            help: "ARIA meter nodes must have an accessible name"
          },
          "aria-progressbar-name": {
            description: "Ensure every ARIA progressbar node has an accessible name",
            help: "ARIA progressbar nodes must have an accessible name"
          },
          "aria-prohibited-attr": {
            description: "Ensure ARIA attributes are not prohibited for an element's role",
            help: "Elements must only use permitted ARIA attributes"
          },
          "aria-required-attr": {
            description: "Ensure elements with ARIA roles have all required ARIA attributes",
            help: "Required ARIA attributes must be provided"
          },
          "aria-required-children": {
            description: "Ensure elements with an ARIA role that require child roles contain them",
            help: "Certain ARIA roles must contain particular children"
          },
          "aria-required-parent": {
            description: "Ensure elements with an ARIA role that require parent roles are contained by them",
            help: "Certain ARIA roles must be contained by particular parents"
          },
          "aria-roledescription": {
            description: "Ensure aria-roledescription is only used on elements with an implicit or explicit role",
            help: "aria-roledescription must be on elements with a semantic role"
          },
          "aria-roles": {
            description: "Ensure all elements with a role attribute use a valid value",
            help: "ARIA roles used must conform to valid values"
          },
          "aria-text": {
            description: 'Ensure role="text" is used on elements with no focusable descendants',
            help: '"role=text" should have no focusable descendants'
          },
          "aria-toggle-field-name": {
            description: "Ensure every ARIA toggle field has an accessible name",
            help: "ARIA toggle fields must have an accessible name"
          },
          "aria-tooltip-name": {
            description: "Ensure every ARIA tooltip node has an accessible name",
            help: "ARIA tooltip nodes must have an accessible name"
          },
          "aria-treeitem-name": {
            description: "Ensure every ARIA treeitem node has an accessible name",
            help: "ARIA treeitem nodes should have an accessible name"
          },
          "aria-valid-attr-value": {
            description: "Ensure all ARIA attributes have valid values",
            help: "ARIA attributes must conform to valid values"
          },
          "aria-valid-attr": {
            description: "Ensure attributes that begin with aria- are valid ARIA attributes",
            help: "ARIA attributes must conform to valid names"
          },
          "audio-caption": {
            description: "Ensure <audio> elements have captions",
            help: "<audio> elements must have a captions track"
          },
          "autocomplete-valid": {
            description: "Ensure the autocomplete attribute is correct and suitable for the form field",
            help: "autocomplete attribute must be used correctly"
          },
          "avoid-inline-spacing": {
            description: "Ensure that text spacing set through style attributes can be adjusted with custom stylesheets",
            help: "Inline text spacing must be adjustable with custom stylesheets"
          },
          blink: {
            description: "Ensure <blink> elements are not used",
            help: "<blink> elements are deprecated and must not be used"
          },
          "button-name": {
            description: "Ensure buttons have discernible text",
            help: "Buttons must have discernible text"
          },
          bypass: {
            description: "Ensure each page has at least one mechanism for a user to bypass navigation and jump straight to the content",
            help: "Page must have means to bypass repeated blocks"
          },
          "color-contrast-enhanced": {
            description: "Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds",
            help: "Elements must meet enhanced color contrast ratio thresholds"
          },
          "color-contrast": {
            description: "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            help: "Elements must meet minimum color contrast ratio thresholds"
          },
          "css-orientation-lock": {
            description: "Ensure content is not locked to any specific display orientation, and the content is operable in all display orientations",
            help: "CSS Media queries must not lock display orientation"
          },
          "definition-list": {
            description: "Ensure <dl> elements are structured correctly",
            help: "<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements"
          },
          dlitem: {
            description: "Ensure <dt> and <dd> elements are contained by a <dl>",
            help: "<dt> and <dd> elements must be contained by a <dl>"
          },
          "document-title": {
            description: "Ensure each HTML document contains a non-empty <title> element",
            help: "Documents must have <title> element to aid in navigation"
          },
          "duplicate-id-active": {
            description: "Ensure every id attribute value of active elements is unique",
            help: "IDs of active elements must be unique"
          },
          "duplicate-id-aria": {
            description: "Ensure every id attribute value used in ARIA and in labels is unique",
            help: "IDs used in ARIA and labels must be unique"
          },
          "duplicate-id": {
            description: "Ensure every id attribute value is unique",
            help: "id attribute value must be unique"
          },
          "empty-heading": {
            description: "Ensure headings have discernible text",
            help: "Headings should not be empty"
          },
          "empty-table-header": {
            description: "Ensure table headers have discernible text",
            help: "Table header text should not be empty"
          },
          "focus-order-semantics": {
            description: "Ensure elements in the focus order have a role appropriate for interactive content",
            help: "Elements in the focus order should have an appropriate role"
          },
          "form-field-multiple-labels": {
            description: "Ensure form field does not have multiple label elements",
            help: "Form field must not have multiple label elements"
          },
          "frame-focusable-content": {
            description: "Ensure <frame> and <iframe> elements with focusable content do not have tabindex=-1",
            help: "Frames with focusable content must not have tabindex=-1"
          },
          "frame-tested": {
            description: "Ensure <iframe> and <frame> elements contain the axe-core script",
            help: "Frames should be tested with axe-core"
          },
          "frame-title-unique": {
            description: "Ensure <iframe> and <frame> elements contain a unique title attribute",
            help: "Frames must have a unique title attribute"
          },
          "frame-title": {
            description: "Ensure <iframe> and <frame> elements have an accessible name",
            help: "Frames must have an accessible name"
          },
          "heading-order": {
            description: "Ensure the order of headings is semantically correct",
            help: "Heading levels should only increase by one"
          },
          "hidden-content": {
            description: "Informs users about hidden content.",
            help: "Hidden content on the page should be analyzed"
          },
          "html-has-lang": {
            description: "Ensure every HTML document has a lang attribute",
            help: "<html> element must have a lang attribute"
          },
          "html-lang-valid": {
            description: "Ensure the lang attribute of the <html> element has a valid value",
            help: "<html> element must have a valid value for the lang attribute"
          },
          "html-xml-lang-mismatch": {
            description: "Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page",
            help: "HTML elements with lang and xml:lang must have the same base language"
          },
          "identical-links-same-purpose": {
            description: "Ensure that links with the same accessible name serve a similar purpose",
            help: "Links with the same name must have a similar purpose"
          },
          "image-alt": {
            description: "Ensure <img> elements have alternative text or a role of none or presentation",
            help: "Images must have alternative text"
          },
          "image-redundant-alt": {
            description: "Ensure image alternative is not repeated as text",
            help: "Alternative text of images should not be repeated as text"
          },
          "input-button-name": {
            description: "Ensure input buttons have discernible text",
            help: "Input buttons must have discernible text"
          },
          "input-image-alt": {
            description: 'Ensure <input type="image"> elements have alternative text',
            help: "Image buttons must have alternative text"
          },
          "label-content-name-mismatch": {
            description: "Ensure that elements labelled through their content must have their visible text as part of their accessible name",
            help: "Elements must have their visible text as part of their accessible name"
          },
          "label-title-only": {
            description: "Ensure that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes",
            help: "Form elements should have a visible label"
          },
          label: {
            description: "Ensure every form element has a label",
            help: "Form elements must have labels"
          },
          "landmark-banner-is-top-level": {
            description: "Ensure the banner landmark is at top level",
            help: "Banner landmark should not be contained in another landmark"
          },
          "landmark-complementary-is-top-level": {
            description: "Ensure the complementary landmark or aside is at top level",
            help: "Aside should not be contained in another landmark"
          },
          "landmark-contentinfo-is-top-level": {
            description: "Ensure the contentinfo landmark is at top level",
            help: "Contentinfo landmark should not be contained in another landmark"
          },
          "landmark-main-is-top-level": {
            description: "Ensure the main landmark is at top level",
            help: "Main landmark should not be contained in another landmark"
          },
          "landmark-no-duplicate-banner": {
            description: "Ensure the document has at most one banner landmark",
            help: "Document should not have more than one banner landmark"
          },
          "landmark-no-duplicate-contentinfo": {
            description: "Ensure the document has at most one contentinfo landmark",
            help: "Document should not have more than one contentinfo landmark"
          },
          "landmark-no-duplicate-main": {
            description: "Ensure the document has at most one main landmark",
            help: "Document should not have more than one main landmark"
          },
          "landmark-one-main": {
            description: "Ensure the document has a main landmark",
            help: "Document should have one main landmark"
          },
          "landmark-unique": {
            description: "Ensure landmarks are unique",
            help: "Landmarks should have a unique role or role/label/title (i.e. accessible name) combination"
          },
          "link-in-text-block": {
            description: "Ensure links are distinguished from surrounding text in a way that does not rely on color",
            help: "Links must be distinguishable without relying on color"
          },
          "link-name": {
            description: "Ensure links have discernible text",
            help: "Links must have discernible text"
          },
          list: {
            description: "Ensure that lists are structured correctly",
            help: "<ul> and <ol> must only directly contain <li>, <script> or <template> elements"
          },
          listitem: {
            description: "Ensure <li> elements are used semantically",
            help: "<li> elements must be contained in a <ul> or <ol>"
          },
          marquee: {
            description: "Ensure <marquee> elements are not used",
            help: "<marquee> elements are deprecated and must not be used"
          },
          "meta-refresh-no-exceptions": {
            description: 'Ensure <meta http-equiv="refresh"> is not used for delayed refresh',
            help: "Delayed refresh must not be used"
          },
          "meta-refresh": {
            description: 'Ensure <meta http-equiv="refresh"> is not used for delayed refresh',
            help: "Delayed refresh under 20 hours must not be used"
          },
          "meta-viewport-large": {
            description: 'Ensure <meta name="viewport"> can scale a significant amount',
            help: "Users should be able to zoom and scale the text up to 500%"
          },
          "meta-viewport": {
            description: 'Ensure <meta name="viewport"> does not disable text scaling and zooming',
            help: "Zooming and scaling must not be disabled"
          },
          "nested-interactive": {
            description: "Ensure interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies",
            help: "Interactive controls must not be nested"
          },
          "no-autoplay-audio": {
            description: "Ensure <video> or <audio> elements do not autoplay audio for more than 3 seconds without a control mechanism to stop or mute the audio",
            help: "<video> or <audio> elements must not play automatically"
          },
          "object-alt": {
            description: "Ensure <object> elements have alternative text",
            help: "<object> elements must have alternative text"
          },
          "p-as-heading": {
            description: "Ensure bold, italic text and font-size is not used to style <p> elements as a heading",
            help: "Styled <p> elements must not be used as headings"
          },
          "page-has-heading-one": {
            description: "Ensure that the page, or at least one of its frames contains a level-one heading",
            help: "Page should contain a level-one heading"
          },
          "presentation-role-conflict": {
            description: "Elements marked as presentational should not have global ARIA or tabindex to ensure all screen readers ignore them",
            help: "Ensure elements marked as presentational are consistently ignored"
          },
          region: {
            description: "Ensure all page content is contained by landmarks",
            help: "All page content should be contained by landmarks"
          },
          "role-img-alt": {
            description: 'Ensure [role="img"] elements have alternative text',
            help: '[role="img"] elements must have an alternative text'
          },
          "scope-attr-valid": {
            description: "Ensure the scope attribute is used correctly on tables",
            help: "scope attribute should be used correctly"
          },
          "scrollable-region-focusable": {
            description: "Ensure elements that have scrollable content are accessible by keyboard",
            help: "Scrollable region must have keyboard access"
          },
          "select-name": {
            description: "Ensure select element has an accessible name",
            help: "Select element must have an accessible name"
          },
          "server-side-image-map": {
            description: "Ensure that server-side image maps are not used",
            help: "Server-side image maps must not be used"
          },
          "skip-link": {
            description: "Ensure all skip links have a focusable target",
            help: "The skip-link target should exist and be focusable"
          },
          "summary-name": {
            description: "Ensure summary elements have discernible text",
            help: "Summary elements must have discernible text"
          },
          "svg-img-alt": {
            description: "Ensure <svg> elements with an img, graphics-document or graphics-symbol role have an accessible text",
            help: "<svg> elements with an img role must have an alternative text"
          },
          tabindex: {
            description: "Ensure tabindex attribute values are not greater than 0",
            help: "Elements should not have tabindex greater than zero"
          },
          "table-duplicate-name": {
            description: "Ensure the <caption> element does not contain the same text as the summary attribute",
            help: "Tables should not have the same summary and caption"
          },
          "table-fake-caption": {
            description: "Ensure that tables with a caption use the <caption> element.",
            help: "Data or header cells must not be used to give caption to a data table."
          },
          "target-size": {
            description: "Ensure touch targets have sufficient size and space",
            help: "All touch targets must be 24px large, or leave sufficient space"
          },
          "td-has-header": {
            description: "Ensure that each non-empty data cell in a <table> larger than 3 by 3  has one or more table headers",
            help: "Non-empty <td> elements in larger <table> must have an associated table header"
          },
          "td-headers-attr": {
            description: "Ensure that each cell in a table that uses the headers attribute refers only to other cells in that table",
            help: "Table cells that use the headers attribute must only refer to cells in the same table"
          },
          "th-has-data-cells": {
            description: "Ensure that <th> elements and elements with role=columnheader/rowheader have data cells they describe",
            help: "Table headers in a data table must refer to data cells"
          },
          "valid-lang": {
            description: "Ensure lang attributes have valid values",
            help: "lang attribute must have a valid value"
          },
          "video-caption": {
            description: "Ensure <video> elements have captions",
            help: "<video> elements must have captions"
          }
        },
        checks: {
          abstractrole: {
            impact: "serious",
            messages: {
              pass: "Abstract roles are not used",
              fail: {
                singular: "Abstract role cannot be directly used: ${data.values}",
                plural: "Abstract roles cannot be directly used: ${data.values}"
              }
            }
          },
          "aria-allowed-attr": {
            impact: "critical",
            messages: {
              pass: "ARIA attributes are used correctly for the defined role",
              fail: {
                singular: "ARIA attribute is not allowed: ${data.values}",
                plural: "ARIA attributes are not allowed: ${data.values}"
              },
              incomplete: "Check that there is no problem if the ARIA attribute is ignored on this element: ${data.values}"
            }
          },
          "aria-allowed-role": {
            impact: "minor",
            messages: {
              pass: "ARIA role is allowed for given element",
              fail: {
                singular: "ARIA role ${data.values} is not allowed for given element",
                plural: "ARIA roles ${data.values} are not allowed for given element"
              },
              incomplete: {
                singular: "ARIA role ${data.values} must be removed when the element is made visible, as it is not allowed for the element",
                plural: "ARIA roles ${data.values} must be removed when the element is made visible, as they are not allowed for the element"
              }
            }
          },
          "aria-busy": {
            impact: "serious",
            messages: {
              pass: "Element has an aria-busy attribute",
              fail: 'Element uses aria-busy="true" while showing a loader'
            }
          },
          "aria-conditional-attr": {
            impact: "serious",
            messages: {
              pass: "ARIA attribute is allowed",
              fail: {
                checkbox: 'Remove aria-checked, or set it to "${data.checkState}" to match the real checkbox state',
                rowSingular: "This attribute is supported with treegrid rows, but not ${data.ownerRole}: ${data.invalidAttrs}",
                rowPlural: "These attributes are supported with treegrid rows, but not ${data.ownerRole}: ${data.invalidAttrs}"
              }
            }
          },
          "aria-errormessage": {
            impact: "critical",
            messages: {
              pass: "aria-errormessage exists and references elements visible to screen readers that use a supported aria-errormessage technique",
              fail: {
                singular: "aria-errormessage value `${data.values}` must use a technique to announce the message (e.g., aria-live, aria-describedby, role=alert, etc.)",
                plural: "aria-errormessage values `${data.values}` must use a technique to announce the message (e.g., aria-live, aria-describedby, role=alert, etc.)",
                hidden: "aria-errormessage value `${data.values}` cannot reference a hidden element"
              },
              incomplete: {
                singular: "Ensure aria-errormessage value `${data.values}` references an existing element",
                plural: "Ensure aria-errormessage values `${data.values}` reference existing elements",
                idrefs: "Unable to determine if aria-errormessage element exists on the page: ${data.values}"
              }
            }
          },
          "aria-hidden-body": {
            impact: "critical",
            messages: {
              pass: "No aria-hidden attribute is present on document body",
              fail: "aria-hidden=true should not be present on the document body"
            }
          },
          "aria-level": {
            impact: "serious",
            messages: {
              pass: "aria-level values are valid",
              incomplete: "aria-level values greater than 6 are not supported in all screenreader and browser combinations"
            }
          },
          "aria-prohibited-attr": {
            impact: "serious",
            messages: {
              pass: "ARIA attribute is allowed",
              fail: {
                hasRolePlural: '${data.prohibited} attributes cannot be used with role "${data.role}".',
                hasRoleSingular: '${data.prohibited} attribute cannot be used with role "${data.role}".',
                noRolePlural: "${data.prohibited} attributes cannot be used on a ${data.nodeName} with no valid role attribute.",
                noRoleSingular: "${data.prohibited} attribute cannot be used on a ${data.nodeName} with no valid role attribute."
              },
              incomplete: {
                hasRoleSingular: '${data.prohibited} attribute is not well supported with role "${data.role}".',
                hasRolePlural: '${data.prohibited} attributes are not well supported with role "${data.role}".',
                noRoleSingular: "${data.prohibited} attribute is not well supported on a ${data.nodeName} with no valid role attribute.",
                noRolePlural: "${data.prohibited} attributes are not well supported on a ${data.nodeName} with no valid role attribute."
              }
            }
          },
          "aria-required-attr": {
            impact: "critical",
            messages: {
              pass: "All required ARIA attributes are present",
              fail: {
                singular: "Required ARIA attribute not present: ${data.values}",
                plural: "Required ARIA attributes not present: ${data.values}"
              }
            }
          },
          "aria-required-children": {
            impact: "critical",
            messages: {
              pass: {
                default: "Required ARIA children are present",
                "aria-busy": "Element has an aria-busy attribute, so it is allowed to omit required children"
              },
              fail: {
                singular: "Required ARIA child role not present: ${data.values}",
                plural: "Required ARIA children role not present: ${data.values}",
                unallowed: "Element has children which are not allowed: ${data.values}"
              },
              incomplete: {
                singular: "Expecting ARIA child role to be added: ${data.values}",
                plural: "Expecting ARIA children role to be added: ${data.values}"
              }
            }
          },
          "aria-required-parent": {
            impact: "critical",
            messages: {
              pass: "Required ARIA parent role present",
              fail: {
                singular: "Required ARIA parent role not present: ${data.values}",
                plural: "Required ARIA parents role not present: ${data.values}"
              }
            }
          },
          "aria-roledescription": {
            impact: "serious",
            messages: {
              pass: "aria-roledescription used on a supported semantic role",
              incomplete: "Check that the aria-roledescription is announced by supported screen readers",
              fail: "Give the element a role that supports aria-roledescription"
            }
          },
          "aria-unsupported-attr": {
            impact: "critical",
            messages: {
              pass: "ARIA attribute is supported",
              fail: "ARIA attribute is not widely supported in screen readers and assistive technologies: ${data.values}"
            }
          },
          "aria-valid-attr-value": {
            impact: "critical",
            messages: {
              pass: "ARIA attribute values are valid",
              fail: {
                singular: "Invalid ARIA attribute value: ${data.values}",
                plural: "Invalid ARIA attribute values: ${data.values}"
              },
              incomplete: {
                noId: "ARIA attribute element ID does not exist on the page: ${data.needsReview}",
                noIdShadow: "ARIA attribute element ID does not exist on the page or is a descendant of a different shadow DOM tree: ${data.needsReview}",
                ariaCurrent: 'ARIA attribute value is invalid and will be treated as "aria-current=true": ${data.needsReview}',
                idrefs: "Unable to determine if ARIA attribute element ID exists on the page: ${data.needsReview}",
                empty: "ARIA attribute value is ignored while empty: ${data.needsReview}",
                controlsWithinPopup: "Unable to determine if aria-controls referenced ID exists on the page while using aria-haspopup: ${data.needsReview}"
              }
            }
          },
          "aria-valid-attr": {
            impact: "critical",
            messages: {
              pass: "ARIA attribute name is valid",
              fail: {
                singular: "Invalid ARIA attribute name: ${data.values}",
                plural: "Invalid ARIA attribute names: ${data.values}"
              }
            }
          },
          "braille-label-equivalent": {
            impact: "serious",
            messages: {
              pass: "aria-braillelabel is used on an element with accessible text",
              fail: "aria-braillelabel is used on an element with no accessible text",
              incomplete: "Unable to compute accessible text"
            }
          },
          "braille-roledescription-equivalent": {
            impact: "serious",
            messages: {
              pass: "aria-brailleroledescription is used on an element with aria-roledescription",
              fail: {
                noRoleDescription: "aria-brailleroledescription is used on an element with no aria-roledescription",
                emptyRoleDescription: "aria-brailleroledescription is used on an element with an empty aria-roledescription"
              }
            }
          },
          deprecatedrole: {
            impact: "minor",
            messages: {
              pass: "ARIA role is not deprecated",
              fail: "The role used is deprecated: ${data}"
            }
          },
          fallbackrole: {
            impact: "serious",
            messages: {
              pass: "Only one role value used",
              fail: "Use only one role value, since fallback roles are not supported in older browsers",
              incomplete: "Use only role 'presentation' or 'none' since they are synonymous."
            }
          },
          "has-global-aria-attribute": {
            impact: "minor",
            messages: {
              pass: {
                singular: "Element has global ARIA attribute: ${data.values}",
                plural: "Element has global ARIA attributes: ${data.values}"
              },
              fail: "Element does not have global ARIA attribute"
            }
          },
          "has-widget-role": {
            impact: "minor",
            messages: {
              pass: "Element has a widget role.",
              fail: "Element does not have a widget role."
            }
          },
          invalidrole: {
            impact: "critical",
            messages: {
              pass: "ARIA role is valid",
              fail: {
                singular: "Role must be one of the valid ARIA roles: ${data.values}",
                plural: "Roles must be one of the valid ARIA roles: ${data.values}"
              }
            }
          },
          "is-element-focusable": {
            impact: "minor",
            messages: {
              pass: "Element is focusable.",
              fail: "Element is not focusable."
            }
          },
          "no-implicit-explicit-label": {
            impact: "serious",
            messages: {
              pass: "There is no mismatch between a <label> and accessible name",
              incomplete: "Check that the <label> does not need be part of the ARIA ${data} field's name"
            }
          },
          unsupportedrole: {
            impact: "critical",
            messages: {
              pass: "ARIA role is supported",
              fail: "The role used is not widely supported in screen readers and assistive technologies: ${data}"
            }
          },
          "valid-scrollable-semantics": {
            impact: "minor",
            messages: {
              pass: "Element has valid semantics for an element in the focus order.",
              fail: "Element has invalid semantics for an element in the focus order."
            }
          },
          "color-contrast-enhanced": {
            impact: "serious",
            messages: {
              pass: "Element has sufficient color contrast of ${data.contrastRatio}",
              fail: {
                default: "Element has insufficient color contrast of ${data.contrastRatio} (foreground color: ${data.fgColor}, background color: ${data.bgColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}",
                fgOnShadowColor: "Element has insufficient color contrast of ${data.contrastRatio} between the foreground and shadow color (foreground color: ${data.fgColor}, text-shadow color: ${data.shadowColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}",
                shadowOnBgColor: "Element has insufficient color contrast of ${data.contrastRatio} between the shadow color and background color (text-shadow color: ${data.shadowColor}, background color: ${data.bgColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}"
              },
              incomplete: {
                default: "Unable to determine contrast ratio",
                bgImage: "Element's background color could not be determined due to a background image",
                bgGradient: "Element's background color could not be determined due to a background gradient",
                imgNode: "Element's background color could not be determined because element contains an image node",
                bgOverlap: "Element's background color could not be determined because it is overlapped by another element",
                fgAlpha: "Element's foreground color could not be determined because of alpha transparency",
                elmPartiallyObscured: "Element's background color could not be determined because it's partially obscured by another element",
                elmPartiallyObscuring: "Element's background color could not be determined because it partially overlaps other elements",
                outsideViewport: "Element's background color could not be determined because it's outside the viewport",
                equalRatio: "Element has a 1:1 contrast ratio with the background",
                shortTextContent: "Element content is too short to determine if it is actual text content",
                nonBmp: "Element content contains only non-text characters",
                pseudoContent: "Element's background color could not be determined due to a pseudo element"
              }
            }
          },
          "color-contrast": {
            impact: "serious",
            messages: {
              pass: {
                default: "Element has sufficient color contrast of ${data.contrastRatio}",
                hidden: "Element is hidden"
              },
              fail: {
                default: "Element has insufficient color contrast of ${data.contrastRatio} (foreground color: ${data.fgColor}, background color: ${data.bgColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}",
                fgOnShadowColor: "Element has insufficient color contrast of ${data.contrastRatio} between the foreground and shadow color (foreground color: ${data.fgColor}, text-shadow color: ${data.shadowColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}",
                shadowOnBgColor: "Element has insufficient color contrast of ${data.contrastRatio} between the shadow color and background color (text-shadow color: ${data.shadowColor}, background color: ${data.bgColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}"
              },
              incomplete: {
                default: "Unable to determine contrast ratio",
                bgImage: "Element's background color could not be determined due to a background image",
                bgGradient: "Element's background color could not be determined due to a background gradient",
                imgNode: "Element's background color could not be determined because element contains an image node",
                bgOverlap: "Element's background color could not be determined because it is overlapped by another element",
                complexTextShadows: "Element's contrast could not be determined because it uses complex text shadows",
                fgAlpha: "Element's foreground color could not be determined because of alpha transparency",
                elmPartiallyObscured: "Element's background color could not be determined because it's partially obscured by another element",
                elmPartiallyObscuring: "Element's background color could not be determined because it partially overlaps other elements",
                outsideViewport: "Element's background color could not be determined because it's outside the viewport",
                equalRatio: "Element has a 1:1 contrast ratio with the background",
                shortTextContent: "Element content is too short to determine if it is actual text content",
                nonBmp: "Element content contains only non-text characters",
                pseudoContent: "Element's background color could not be determined due to a pseudo element"
              }
            }
          },
          "link-in-text-block-style": {
            impact: "serious",
            messages: {
              pass: "Links can be distinguished from surrounding text by visual styling",
              incomplete: {
                default: "Check if the link needs styling to distinguish it from nearby text",
                pseudoContent: "Check if the link's pseudo style is sufficient to distinguish it from the surrounding text"
              },
              fail: "The link has no styling (such as underline) to distinguish it from the surrounding text"
            }
          },
          "link-in-text-block": {
            impact: "serious",
            messages: {
              pass: "Links can be distinguished from surrounding text in some way other than by color",
              fail: {
                fgContrast: "The link has insufficient color contrast of ${data.contrastRatio}:1 with the surrounding text. (Minimum contrast is ${data.requiredContrastRatio}:1, link text: ${data.nodeColor}, surrounding text: ${data.parentColor})",
                bgContrast: "The link background has insufficient color contrast of ${data.contrastRatio} (Minimum contrast is ${data.requiredContrastRatio}:1, link background color: ${data.nodeBackgroundColor}, surrounding background color: ${data.parentBackgroundColor})"
              },
              incomplete: {
                default: "Element's foreground contrast ratio could not be determined",
                bgContrast: "Element's background contrast ratio could not be determined",
                bgImage: "Element's contrast ratio could not be determined due to a background image",
                bgGradient: "Element's contrast ratio could not be determined due to a background gradient",
                imgNode: "Element's contrast ratio could not be determined because element contains an image node",
                bgOverlap: "Element's contrast ratio could not be determined because of element overlap"
              }
            }
          },
          "autocomplete-appropriate": {
            impact: "serious",
            messages: {
              pass: "The autocomplete value is on an appropriate element",
              fail: "The autocomplete value is inappropriate for this type of input"
            }
          },
          "autocomplete-valid": {
            impact: "serious",
            messages: {
              pass: "the autocomplete attribute is correctly formatted",
              fail: "the autocomplete attribute is incorrectly formatted",
              incomplete: "the autocomplete attribute has a non-standard value. Check whether any standard value could be used instead."
            }
          },
          accesskeys: {
            impact: "serious",
            messages: {
              pass: "Accesskey attribute value is unique",
              fail: "Document has multiple elements with the same accesskey"
            }
          },
          "focusable-content": {
            impact: "serious",
            messages: {
              pass: "Element contains focusable elements",
              fail: "Element should have focusable content"
            }
          },
          "focusable-disabled": {
            impact: "serious",
            messages: {
              pass: "No focusable elements contained within element",
              incomplete: "Check if the focusable elements immediately move the focus indicator",
              fail: "Focusable content should be disabled or be removed from the DOM"
            }
          },
          "focusable-element": {
            impact: "serious",
            messages: {
              pass: "Element is focusable",
              fail: "Element should be focusable"
            }
          },
          "focusable-modal-open": {
            impact: "serious",
            messages: {
              pass: "No focusable elements while a modal is open",
              incomplete: "Check that focusable elements are not tabbable in the current state"
            }
          },
          "focusable-no-name": {
            impact: "serious",
            messages: {
              pass: "Element is not in tab order or has accessible text",
              fail: "Element is in tab order and does not have accessible text",
              incomplete: "Unable to determine if element has an accessible name"
            }
          },
          "focusable-not-tabbable": {
            impact: "serious",
            messages: {
              pass: "No focusable elements contained within element",
              incomplete: "Check if the focusable elements immediately move the focus indicator",
              fail: 'Focusable content should have tabindex="-1" or be removed from the DOM'
            }
          },
          "frame-focusable-content": {
            impact: "serious",
            messages: {
              pass: "Element does not have focusable descendants",
              fail: "Element has focusable descendants",
              incomplete: "Could not determine if element has descendants"
            }
          },
          "landmark-is-top-level": {
            impact: "moderate",
            messages: {
              pass: "The ${data.role} landmark is at the top level.",
              fail: "The ${data.role} landmark is contained in another landmark."
            }
          },
          "no-focusable-content": {
            impact: "serious",
            messages: {
              pass: "Element does not have focusable descendants",
              fail: {
                default: "Element has focusable descendants",
                notHidden: 'Using a negative tabindex on an element inside an interactive control does not prevent assistive technologies from focusing the element (even with aria-hidden="true")'
              },
              incomplete: "Could not determine if element has descendants"
            }
          },
          "page-has-heading-one": {
            impact: "moderate",
            messages: {
              pass: "Page has at least one level-one heading",
              fail: "Page must have a level-one heading"
            }
          },
          "page-has-main": {
            impact: "moderate",
            messages: {
              pass: "Document has at least one main landmark",
              fail: "Document does not have a main landmark"
            }
          },
          "page-no-duplicate-banner": {
            impact: "moderate",
            messages: {
              pass: "Document does not have more than one banner landmark",
              fail: "Document has more than one banner landmark"
            }
          },
          "page-no-duplicate-contentinfo": {
            impact: "moderate",
            messages: {
              pass: "Document does not have more than one contentinfo landmark",
              fail: "Document has more than one contentinfo landmark"
            }
          },
          "page-no-duplicate-main": {
            impact: "moderate",
            messages: {
              pass: "Document does not have more than one main landmark",
              fail: "Document has more than one main landmark"
            }
          },
          tabindex: {
            impact: "serious",
            messages: {
              pass: "Element does not have a tabindex greater than 0",
              fail: "Element has a tabindex greater than 0"
            }
          },
          "alt-space-value": {
            impact: "critical",
            messages: {
              pass: "Element has a valid alt attribute value",
              fail: "Element has an alt attribute containing only a space character, which is not ignored by all screen readers"
            }
          },
          "duplicate-img-label": {
            impact: "minor",
            messages: {
              pass: "Element does not duplicate existing text in <img> alt text",
              fail: "Element contains <img> element with alt text that duplicates existing text"
            }
          },
          "explicit-label": {
            impact: "critical",
            messages: {
              pass: "Element has an explicit <label>",
              fail: "Element does not have an explicit <label>",
              incomplete: "Unable to determine if form element has an explicit <label>"
            }
          },
          "help-same-as-label": {
            impact: "minor",
            messages: {
              pass: "Help text (title or aria-describedby) does not duplicate label text",
              fail: "Help text (title or aria-describedby) text is the same as the label text"
            }
          },
          "hidden-explicit-label": {
            impact: "critical",
            messages: {
              pass: "Form element has a visible explicit <label>",
              fail: "Form element has explicit <label> that is hidden",
              incomplete: "Unable to determine if form element has explicit <label> that is hidden"
            }
          },
          "implicit-label": {
            impact: "critical",
            messages: {
              pass: "Element has an implicit (wrapped) <label>",
              fail: "Element does not have an implicit (wrapped) <label>",
              incomplete: "Unable to determine if form element has an implicit (wrapped) <label>"
            }
          },
          "label-content-name-mismatch": {
            impact: "serious",
            messages: {
              pass: "Element contains visible text as part of it's accessible name",
              fail: "Text inside the element is not included in the accessible name"
            }
          },
          "multiple-label": {
            impact: "moderate",
            messages: {
              pass: "Form field does not have multiple label elements",
              incomplete: "Multiple label elements is not widely supported in assistive technologies. Ensure the first label contains all necessary information."
            }
          },
          "title-only": {
            impact: "serious",
            messages: {
              pass: "Form element does not solely use title attribute for its label",
              fail: "Only title used to generate label for form element"
            }
          },
          "landmark-is-unique": {
            impact: "moderate",
            messages: {
              pass: "Landmarks must have a unique role or role/label/title (i.e. accessible name) combination",
              fail: "The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable"
            }
          },
          "has-lang": {
            impact: "serious",
            messages: {
              pass: "The <html> element has a lang attribute",
              fail: {
                noXHTML: "The xml:lang attribute is not valid on HTML pages, use the lang attribute.",
                noLang: "The <html> element does not have a lang attribute"
              }
            }
          },
          "valid-lang": {
            impact: "serious",
            messages: {
              pass: "Value of lang attribute is included in the list of valid languages",
              fail: "Value of lang attribute not included in the list of valid languages"
            }
          },
          "xml-lang-mismatch": {
            impact: "moderate",
            messages: {
              pass: "Lang and xml:lang attributes have the same base language",
              fail: "Lang and xml:lang attributes do not have the same base language"
            }
          },
          dlitem: {
            impact: "serious",
            messages: {
              pass: "Description list item has a <dl> parent element",
              fail: "Description list item does not have a <dl> parent element"
            }
          },
          listitem: {
            impact: "serious",
            messages: {
              pass: 'List item has a <ul>, <ol> or role="list" parent element',
              fail: {
                default: "List item does not have a <ul>, <ol> parent element",
                roleNotValid: 'List item parent element has a role that is not role="list"'
              }
            }
          },
          "only-dlitems": {
            impact: "serious",
            messages: {
              pass: "dl element only has direct children that are allowed inside; <dt>, <dd>, or <div> elements",
              fail: "dl element has direct children that are not allowed: ${data.values}"
            }
          },
          "only-listitems": {
            impact: "serious",
            messages: {
              pass: "List element only has direct children that are allowed inside <li> elements",
              fail: "List element has direct children that are not allowed: ${data.values}"
            }
          },
          "structured-dlitems": {
            impact: "serious",
            messages: {
              pass: "When not empty, element has both <dt> and <dd> elements",
              fail: "When not empty, element does not have at least one <dt> element followed by at least one <dd> element"
            }
          },
          caption: {
            impact: "critical",
            messages: {
              pass: "The multimedia element has a captions track",
              incomplete: "Check that captions are available for the element"
            }
          },
          "frame-tested": {
            impact: "critical",
            messages: {
              pass: "The iframe was tested with axe-core",
              fail: "The iframe could not be tested with axe-core",
              incomplete: "The iframe still has to be tested with axe-core"
            }
          },
          "no-autoplay-audio": {
            impact: "moderate",
            messages: {
              pass: "<video> or <audio> does not output audio for more than allowed duration or has controls mechanism",
              fail: "<video> or <audio> outputs audio for more than allowed duration and does not have a controls mechanism",
              incomplete: "Check that the <video> or <audio> does not output audio for more than allowed duration or provides a controls mechanism"
            }
          },
          "css-orientation-lock": {
            impact: "serious",
            messages: {
              pass: "Display is operable, and orientation lock does not exist",
              fail: "CSS Orientation lock is applied, and makes display inoperable",
              incomplete: "CSS Orientation lock cannot be determined"
            }
          },
          "meta-viewport-large": {
            impact: "minor",
            messages: {
              pass: "<meta> tag does not prevent significant zooming on mobile devices",
              fail: "<meta> tag limits zooming on mobile devices"
            }
          },
          "meta-viewport": {
            impact: "critical",
            messages: {
              pass: "<meta> tag does not disable zooming on mobile devices",
              fail: "${data} on <meta> tag disables zooming on mobile devices"
            }
          },
          "target-offset": {
            impact: "serious",
            messages: {
              pass: {
                default: "Target has sufficient space from its closest neighbors. Safe clickable space has a diameter of ${data.closestOffset}px which is at least ${data.minOffset}px.",
                large: "Target far exceeds the minimum size of ${data.minOffset}px."
              },
              fail: "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of ${data.closestOffset}px instead of at least ${data.minOffset}px.",
              incomplete: {
                default: "Element with negative tabindex has insufficient space to its closest neighbors. Safe clickable space has a diameter of ${data.closestOffset}px instead of at least ${data.minOffset}px. Is this a target?",
                nonTabbableNeighbor: "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of ${data.closestOffset}px instead of at least ${data.minOffset}px. Is the neighbor a target?",
                tooManyRects: "Could not get the target size because there are too many overlapping elements"
              }
            }
          },
          "target-size": {
            impact: "serious",
            messages: {
              pass: {
                default: "Control has sufficient size (${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px)",
                obscured: "Control is ignored because it is fully obscured and thus not clickable",
                large: "Target far exceeds the minimum size of ${data.minSize}px."
              },
              fail: {
                default: "Target has insufficient size (${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px)",
                partiallyObscured: "Target has insufficient size because it is partially obscured (smallest space is ${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px)"
              },
              incomplete: {
                default: "Element with negative tabindex has insufficient size (${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px). Is this a target?",
                contentOverflow: "Element size could not be accurately determined due to overflow content",
                partiallyObscured: "Element with negative tabindex has insufficient size because it is partially obscured (smallest space is ${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px). Is this a target?",
                partiallyObscuredNonTabbable: "Target has insufficient size because it is partially obscured by a neighbor with negative tabindex (smallest space is ${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px). Is the neighbor a target?",
                tooManyRects: "Could not get the target size because there are too many overlapping elements"
              }
            }
          },
          "header-present": {
            impact: "serious",
            messages: {
              pass: "Page has a heading",
              fail: "Page does not have a heading"
            }
          },
          "heading-order": {
            impact: "moderate",
            messages: {
              pass: "Heading order valid",
              fail: "Heading order invalid",
              incomplete: "Unable to determine previous heading"
            }
          },
          "identical-links-same-purpose": {
            impact: "minor",
            messages: {
              pass: "There are no other links with the same name, that go to a different URL",
              incomplete: "Check that links have the same purpose, or are intentionally ambiguous."
            }
          },
          "internal-link-present": {
            impact: "serious",
            messages: {
              pass: "Valid skip link found",
              fail: "No valid skip link found"
            }
          },
          landmark: {
            impact: "serious",
            messages: {
              pass: "Page has a landmark region",
              fail: "Page does not have a landmark region"
            }
          },
          "meta-refresh-no-exceptions": {
            impact: "minor",
            messages: {
              pass: "<meta> tag does not immediately refresh the page",
              fail: "<meta> tag forces timed refresh of page"
            }
          },
          "meta-refresh": {
            impact: "critical",
            messages: {
              pass: "<meta> tag does not immediately refresh the page",
              fail: "<meta> tag forces timed refresh of page (less than 20 hours)"
            }
          },
          "p-as-heading": {
            impact: "serious",
            messages: {
              pass: "<p> elements are not styled as headings",
              fail: "Heading elements should be used instead of styled <p> elements",
              incomplete: "Unable to determine if <p> elements are styled as headings"
            }
          },
          region: {
            impact: "moderate",
            messages: {
              pass: "All page content is contained by landmarks",
              fail: "Some page content is not contained by landmarks"
            }
          },
          "skip-link": {
            impact: "moderate",
            messages: {
              pass: "Skip link target exists",
              incomplete: "Skip link target should become visible on activation",
              fail: "No skip link target"
            }
          },
          "unique-frame-title": {
            impact: "serious",
            messages: {
              pass: "Element's title attribute is unique",
              fail: "Element's title attribute is not unique"
            }
          },
          "duplicate-id-active": {
            impact: "serious",
            messages: {
              pass: "Document has no active elements that share the same id attribute",
              fail: "Document has active elements with the same id attribute: ${data}"
            }
          },
          "duplicate-id-aria": {
            impact: "critical",
            messages: {
              pass: "Document has no elements referenced with ARIA or labels that share the same id attribute",
              fail: "Document has multiple elements referenced with ARIA with the same id attribute: ${data}"
            }
          },
          "duplicate-id": {
            impact: "minor",
            messages: {
              pass: "Document has no static elements that share the same id attribute",
              fail: "Document has multiple static elements with the same id attribute: ${data}"
            }
          },
          "aria-label": {
            impact: "serious",
            messages: {
              pass: "aria-label attribute exists and is not empty",
              fail: "aria-label attribute does not exist or is empty"
            }
          },
          "aria-labelledby": {
            impact: "serious",
            messages: {
              pass: "aria-labelledby attribute exists and references elements that are visible to screen readers",
              fail: "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
              incomplete: "Ensure aria-labelledby references an existing element"
            }
          },
          "avoid-inline-spacing": {
            impact: "serious",
            messages: {
              pass: "No inline styles with '!important' that affect text spacing has been specified",
              fail: {
                singular: "Remove '!important' from inline style ${data.values}, as overriding this is not supported by most browsers",
                plural: "Remove '!important' from inline styles ${data.values}, as overriding this is not supported by most browsers"
              }
            }
          },
          "button-has-visible-text": {
            impact: "critical",
            messages: {
              pass: "Element has inner text that is visible to screen readers",
              fail: "Element does not have inner text that is visible to screen readers",
              incomplete: "Unable to determine if element has children"
            }
          },
          "doc-has-title": {
            impact: "serious",
            messages: {
              pass: "Document has a non-empty <title> element",
              fail: "Document does not have a non-empty <title> element"
            }
          },
          exists: {
            impact: "minor",
            messages: {
              pass: "Element does not exist",
              incomplete: "Element exists"
            }
          },
          "has-alt": {
            impact: "critical",
            messages: {
              pass: "Element has an alt attribute",
              fail: "Element does not have an alt attribute"
            }
          },
          "has-visible-text": {
            impact: "minor",
            messages: {
              pass: "Element has text that is visible to screen readers",
              fail: "Element does not have text that is visible to screen readers",
              incomplete: "Unable to determine if element has children"
            }
          },
          "important-letter-spacing": {
            impact: "serious",
            messages: {
              pass: "Letter-spacing in the style attribute is not set to !important, or meets the minimum",
              fail: "letter-spacing in the style attribute must not use !important, or be at ${data.minValue}em (current ${data.value}em)"
            }
          },
          "important-line-height": {
            impact: "serious",
            messages: {
              pass: "line-height in the style attribute is not set to !important, or meets the minimum",
              fail: "line-height in the style attribute must not use !important, or be at ${data.minValue}em (current ${data.value}em)"
            }
          },
          "important-word-spacing": {
            impact: "serious",
            messages: {
              pass: "word-spacing in the style attribute is not set to !important, or meets the minimum",
              fail: "word-spacing in the style attribute must not use !important, or be at ${data.minValue}em (current ${data.value}em)"
            }
          },
          "is-on-screen": {
            impact: "serious",
            messages: {
              pass: "Element is not visible",
              fail: "Element is visible"
            }
          },
          "non-empty-alt": {
            impact: "critical",
            messages: {
              pass: "Element has a non-empty alt attribute",
              fail: {
                noAttr: "Element has no alt attribute",
                emptyAttr: "Element has an empty alt attribute"
              }
            }
          },
          "non-empty-if-present": {
            impact: "critical",
            messages: {
              pass: {
                default: "Element does not have a value attribute",
                "has-label": "Element has a non-empty value attribute"
              },
              fail: "Element has a value attribute and the value attribute is empty"
            }
          },
          "non-empty-placeholder": {
            impact: "serious",
            messages: {
              pass: "Element has a placeholder attribute",
              fail: {
                noAttr: "Element has no placeholder attribute",
                emptyAttr: "Element has an empty placeholder attribute"
              }
            }
          },
          "non-empty-title": {
            impact: "serious",
            messages: {
              pass: "Element has a title attribute",
              fail: {
                noAttr: "Element has no title attribute",
                emptyAttr: "Element has an empty title attribute"
              }
            }
          },
          "non-empty-value": {
            impact: "critical",
            messages: {
              pass: "Element has a non-empty value attribute",
              fail: {
                noAttr: "Element has no value attribute",
                emptyAttr: "Element has an empty value attribute"
              }
            }
          },
          "presentational-role": {
            impact: "minor",
            messages: {
              pass: 'Element\'s default semantics were overridden with role="${data.role}"',
              fail: {
                default: `Element's default semantics were not overridden with role="none" or role="presentation"`,
                globalAria: "Element's role is not presentational because it has a global ARIA attribute",
                focusable: "Element's role is not presentational because it is focusable",
                both: "Element's role is not presentational because it has a global ARIA attribute and is focusable",
                iframe: 'Using the "title" attribute on an ${data.nodeName} element with a presentational role behaves inconsistently between screen readers'
              }
            }
          },
          "role-none": {
            impact: "minor",
            messages: {
              pass: `Element's default semantics were overridden with role="none"`,
              fail: `Element's default semantics were not overridden with role="none"`
            }
          },
          "role-presentation": {
            impact: "minor",
            messages: {
              pass: `Element's default semantics were overridden with role="presentation"`,
              fail: `Element's default semantics were not overridden with role="presentation"`
            }
          },
          "svg-non-empty-title": {
            impact: "serious",
            messages: {
              pass: "Element has a child that is a title",
              fail: {
                noTitle: "Element has no child that is a title",
                emptyTitle: "Element child title is empty"
              },
              incomplete: "Unable to determine element has a child that is a title"
            }
          },
          "caption-faked": {
            impact: "serious",
            messages: {
              pass: "The first row of a table is not used as a caption",
              fail: "The first child of the table should be a caption instead of a table cell"
            }
          },
          "html5-scope": {
            impact: "moderate",
            messages: {
              pass: "Scope attribute is only used on table header elements (<th>)",
              fail: "In HTML 5, scope attributes may only be used on table header elements (<th>)"
            }
          },
          "same-caption-summary": {
            impact: "minor",
            messages: {
              pass: "Content of summary attribute and <caption> are not duplicated",
              fail: "Content of summary attribute and <caption> element are identical",
              incomplete: "Unable to determine if <table> element has a caption"
            }
          },
          "scope-value": {
            impact: "critical",
            messages: {
              pass: "Scope attribute is used correctly",
              fail: "The value of the scope attribute may only be 'row' or 'col'"
            }
          },
          "td-has-header": {
            impact: "critical",
            messages: {
              pass: "All non-empty data cells have table headers",
              fail: "Some non-empty data cells do not have table headers"
            }
          },
          "td-headers-attr": {
            impact: "serious",
            messages: {
              pass: "The headers attribute is exclusively used to refer to other cells in the table",
              incomplete: "The headers attribute is empty",
              fail: "The headers attribute is not exclusively used to refer to other cells in the table"
            }
          },
          "th-has-data-cells": {
            impact: "serious",
            messages: {
              pass: "All table header cells refer to data cells",
              fail: "Not all table header cells refer to data cells",
              incomplete: "Table data cells are missing or empty"
            }
          },
          "hidden-content": {
            impact: "minor",
            messages: {
              pass: "All content on the page has been analyzed.",
              fail: "There were problems analyzing the content on this page.",
              incomplete: "There is hidden content on the page that was not analyzed. You will need to trigger the display of this content in order to analyze it."
            }
          }
        },
        failureSummaries: {
          any: {
            failureMessage: function(k) {
              var j = "Fix any of the following:", J = k;
              if (J)
                for (var Te, Pe = -1, Ke = J.length - 1; Pe < Ke; )
                  Te = J[Pe += 1], j += `
  ` + Te.split(`
`).join(`
  `);
              return j;
            }
          },
          none: {
            failureMessage: function(k) {
              var j = "Fix all of the following:", J = k;
              if (J)
                for (var Te, Pe = -1, Ke = J.length - 1; Pe < Ke; )
                  Te = J[Pe += 1], j += `
  ` + Te.split(`
`).join(`
  `);
              return j;
            }
          }
        },
        incompleteFallbackMessage: "axe couldn't tell the reason. Time to break out the element inspector!"
      },
      rules: [{
        id: "accesskeys",
        impact: "serious",
        selector: "[accesskey]",
        excludeHidden: !1,
        tags: ["cat.keyboard", "best-practice"],
        all: [],
        any: [],
        none: ["accesskeys"]
      }, {
        id: "area-alt",
        impact: "critical",
        selector: "map area[href]",
        excludeHidden: !1,
        tags: ["cat.text-alternatives", "wcag2a", "wcag244", "wcag412", "section508", "section508.22.a", "TTv5", "TT6.a", "EN-301-549", "EN-9.2.4.4", "EN-9.4.1.2", "ACT"],
        actIds: ["c487ae"],
        all: [],
        any: [{
          options: {
            attribute: "alt"
          },
          id: "non-empty-alt"
        }, "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "aria-allowed-attr",
        impact: "critical",
        matches: "aria-allowed-attr-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["5c01ea"],
        all: [{
          options: {
            validTreeRowAttrs: ["aria-posinset", "aria-setsize", "aria-expanded", "aria-level"]
          },
          id: "aria-allowed-attr"
        }],
        any: [],
        none: ["aria-unsupported-attr"]
      }, {
        id: "aria-allowed-role",
        impact: "minor",
        excludeHidden: !1,
        selector: "[role]",
        matches: "aria-allowed-role-matches",
        tags: ["cat.aria", "best-practice"],
        all: [],
        any: [{
          options: {
            allowImplicit: !0,
            ignoredTags: []
          },
          id: "aria-allowed-role"
        }],
        none: []
      }, {
        id: "aria-braille-equivalent",
        reviewOnFail: !0,
        impact: "serious",
        selector: "[aria-brailleroledescription], [aria-braillelabel]",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        all: ["braille-roledescription-equivalent", "braille-label-equivalent"],
        any: [],
        none: []
      }, {
        id: "aria-command-name",
        impact: "serious",
        selector: '[role="link"], [role="button"], [role="menuitem"]',
        matches: "no-naming-method-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "TTv5", "TT6.a", "EN-301-549", "EN-9.4.1.2", "ACT"],
        actIds: ["97a4e1"],
        all: [],
        any: ["has-visible-text", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "aria-conditional-attr",
        impact: "serious",
        matches: "aria-allowed-attr-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["5c01ea"],
        all: [{
          options: {
            invalidTableRowAttrs: ["aria-posinset", "aria-setsize", "aria-expanded", "aria-level"]
          },
          id: "aria-conditional-attr"
        }],
        any: [],
        none: []
      }, {
        id: "aria-deprecated-role",
        impact: "minor",
        selector: "[role]",
        matches: "no-empty-role-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["674b10"],
        all: [],
        any: [],
        none: ["deprecatedrole"]
      }, {
        id: "aria-dialog-name",
        impact: "serious",
        selector: '[role="dialog"], [role="alertdialog"]',
        matches: "no-naming-method-matches",
        tags: ["cat.aria", "best-practice"],
        all: [],
        any: ["aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "aria-hidden-body",
        impact: "critical",
        selector: "body",
        excludeHidden: !1,
        matches: "is-initiator-matches",
        tags: ["cat.aria", "wcag2a", "wcag131", "wcag412", "EN-301-549", "EN-9.1.3.1", "EN-9.4.1.2"],
        all: [],
        any: ["aria-hidden-body"],
        none: []
      }, {
        id: "aria-hidden-focus",
        impact: "serious",
        selector: '[aria-hidden="true"]',
        matches: "aria-hidden-focus-matches",
        excludeHidden: !1,
        tags: ["cat.name-role-value", "wcag2a", "wcag412", "TTv5", "TT6.a", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["6cfa84"],
        all: ["focusable-modal-open", "focusable-disabled", "focusable-not-tabbable"],
        any: [],
        none: []
      }, {
        id: "aria-input-field-name",
        impact: "serious",
        selector: '[role="combobox"], [role="listbox"], [role="searchbox"], [role="slider"], [role="spinbutton"], [role="textbox"]',
        matches: "no-naming-method-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "TTv5", "TT5.c", "EN-301-549", "EN-9.4.1.2", "ACT"],
        actIds: ["e086e5"],
        all: [],
        any: ["aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: ["no-implicit-explicit-label"]
      }, {
        id: "aria-meter-name",
        impact: "serious",
        selector: '[role="meter"]',
        matches: "no-naming-method-matches",
        tags: ["cat.aria", "wcag2a", "wcag111", "EN-301-549", "EN-9.1.1.1"],
        all: [],
        any: ["aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "aria-progressbar-name",
        impact: "serious",
        selector: '[role="progressbar"]',
        matches: "no-naming-method-matches",
        tags: ["cat.aria", "wcag2a", "wcag111", "EN-301-549", "EN-9.1.1.1"],
        all: [],
        any: ["aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "aria-prohibited-attr",
        impact: "serious",
        matches: "aria-allowed-attr-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["5c01ea"],
        all: [],
        any: [],
        none: [{
          options: {
            elementsAllowedAriaLabel: ["applet", "input"]
          },
          id: "aria-prohibited-attr"
        }]
      }, {
        id: "aria-required-attr",
        impact: "critical",
        selector: "[role]",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["4e8ab6"],
        all: [],
        any: ["aria-required-attr"],
        none: []
      }, {
        id: "aria-required-children",
        impact: "critical",
        selector: "[role]",
        matches: "aria-required-children-matches",
        tags: ["cat.aria", "wcag2a", "wcag131", "EN-301-549", "EN-9.1.3.1"],
        actIds: ["bc4a75", "ff89c9"],
        all: [],
        any: [{
          options: {
            reviewEmpty: ["doc-bibliography", "doc-endnotes", "grid", "list", "listbox", "menu", "menubar", "table", "tablist", "tree", "treegrid", "rowgroup"]
          },
          id: "aria-required-children"
        }],
        none: []
      }, {
        id: "aria-required-parent",
        impact: "critical",
        selector: "[role]",
        matches: "aria-required-parent-matches",
        tags: ["cat.aria", "wcag2a", "wcag131", "EN-301-549", "EN-9.1.3.1"],
        actIds: ["ff89c9"],
        all: [],
        any: [{
          options: {
            ownGroupRoles: ["listitem", "treeitem"]
          },
          id: "aria-required-parent"
        }],
        none: []
      }, {
        id: "aria-roledescription",
        impact: "serious",
        selector: "[aria-roledescription]",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2", "deprecated"],
        enabled: !1,
        all: [],
        any: [{
          options: {
            supportedRoles: ["button", "img", "checkbox", "radio", "combobox", "menuitemcheckbox", "menuitemradio"]
          },
          id: "aria-roledescription"
        }],
        none: []
      }, {
        id: "aria-roles",
        impact: "critical",
        selector: "[role]",
        matches: "no-empty-role-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["674b10"],
        all: [],
        any: [],
        none: ["invalidrole", "abstractrole", "unsupportedrole"]
      }, {
        id: "aria-text",
        impact: "serious",
        selector: "[role=text]",
        tags: ["cat.aria", "best-practice"],
        all: [],
        any: ["no-focusable-content"],
        none: []
      }, {
        id: "aria-toggle-field-name",
        impact: "serious",
        selector: '[role="checkbox"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="radio"], [role="switch"], [role="option"]',
        matches: "no-naming-method-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "TTv5", "TT5.c", "EN-301-549", "EN-9.4.1.2", "ACT"],
        actIds: ["e086e5"],
        all: [],
        any: ["has-visible-text", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: ["no-implicit-explicit-label"]
      }, {
        id: "aria-tooltip-name",
        impact: "serious",
        selector: '[role="tooltip"]',
        matches: "no-naming-method-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        all: [],
        any: ["has-visible-text", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "aria-treeitem-name",
        impact: "serious",
        selector: '[role="treeitem"]',
        matches: "no-naming-method-matches",
        tags: ["cat.aria", "best-practice"],
        all: [],
        any: ["has-visible-text", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "aria-valid-attr-value",
        impact: "critical",
        matches: "aria-has-attr-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["6a7281"],
        all: [{
          options: [],
          id: "aria-valid-attr-value"
        }, "aria-errormessage", "aria-level"],
        any: [],
        none: []
      }, {
        id: "aria-valid-attr",
        impact: "critical",
        matches: "aria-has-attr-matches",
        tags: ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["5f99a7"],
        all: [],
        any: [{
          options: [],
          id: "aria-valid-attr"
        }],
        none: []
      }, {
        id: "audio-caption",
        impact: "critical",
        selector: "audio",
        enabled: !1,
        excludeHidden: !1,
        tags: ["cat.time-and-media", "wcag2a", "wcag121", "EN-301-549", "EN-9.1.2.1", "section508", "section508.22.a", "deprecated"],
        actIds: ["2eb176", "afb423"],
        all: [],
        any: [],
        none: ["caption"]
      }, {
        id: "autocomplete-valid",
        impact: "serious",
        matches: "autocomplete-matches",
        tags: ["cat.forms", "wcag21aa", "wcag135", "EN-301-549", "EN-9.1.3.5", "ACT"],
        actIds: ["73f2c2"],
        all: [{
          options: {
            stateTerms: ["none", "false", "true", "disabled", "enabled", "undefined", "null"],
            ignoredValues: ["text", "pronouns", "gender", "message", "content"]
          },
          id: "autocomplete-valid"
        }],
        any: [],
        none: []
      }, {
        id: "avoid-inline-spacing",
        impact: "serious",
        selector: "[style]",
        matches: "is-visible-on-screen-matches",
        tags: ["cat.structure", "wcag21aa", "wcag1412", "EN-301-549", "EN-9.1.4.12", "ACT"],
        actIds: ["24afc2", "9e45ec", "78fd32"],
        all: [{
          options: {
            cssProperty: "letter-spacing",
            minValue: 0.12
          },
          id: "important-letter-spacing"
        }, {
          options: {
            cssProperty: "word-spacing",
            minValue: 0.16
          },
          id: "important-word-spacing"
        }, {
          options: {
            multiLineOnly: !0,
            cssProperty: "line-height",
            minValue: 1.5,
            normalValue: 1
          },
          id: "important-line-height"
        }],
        any: [],
        none: []
      }, {
        id: "blink",
        impact: "serious",
        selector: "blink",
        excludeHidden: !1,
        tags: ["cat.time-and-media", "wcag2a", "wcag222", "section508", "section508.22.j", "TTv5", "TT2.b", "EN-301-549", "EN-9.2.2.2"],
        all: [],
        any: [],
        none: ["is-on-screen"]
      }, {
        id: "button-name",
        impact: "critical",
        selector: "button",
        matches: "no-explicit-name-required-matches",
        tags: ["cat.name-role-value", "wcag2a", "wcag412", "section508", "section508.22.a", "TTv5", "TT6.a", "EN-301-549", "EN-9.4.1.2", "ACT"],
        actIds: ["97a4e1", "m6b1q3"],
        all: [],
        any: ["button-has-visible-text", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }, "implicit-label", "explicit-label", "presentational-role"],
        none: []
      }, {
        id: "bypass",
        impact: "serious",
        selector: "html",
        pageLevel: !0,
        matches: "bypass-matches",
        reviewOnFail: !0,
        tags: ["cat.keyboard", "wcag2a", "wcag241", "section508", "section508.22.o", "TTv5", "TT9.a", "EN-301-549", "EN-9.2.4.1"],
        actIds: ["cf77f2", "047fe0", "b40fd1", "3e12e1", "ye5d6e"],
        all: [],
        any: ["internal-link-present", {
          options: {
            selector: ":is(h1, h2, h3, h4, h5, h6):not([role]), [role=heading]"
          },
          id: "header-present"
        }, {
          options: {
            selector: "main, [role=main]"
          },
          id: "landmark"
        }],
        none: []
      }, {
        id: "color-contrast-enhanced",
        impact: "serious",
        matches: "color-contrast-matches",
        excludeHidden: !1,
        enabled: !1,
        tags: ["cat.color", "wcag2aaa", "wcag146", "ACT"],
        actIds: ["09o5cg"],
        all: [],
        any: [{
          options: {
            ignoreUnicode: !0,
            ignoreLength: !1,
            ignorePseudo: !1,
            boldValue: 700,
            boldTextPt: 14,
            largeTextPt: 18,
            contrastRatio: {
              normal: {
                expected: 7,
                minThreshold: 4.5
              },
              large: {
                expected: 4.5,
                minThreshold: 3
              }
            },
            pseudoSizeThreshold: 0.25,
            shadowOutlineEmMax: 0.1,
            textStrokeEmMin: 0.03
          },
          id: "color-contrast-enhanced"
        }],
        none: []
      }, {
        id: "color-contrast",
        impact: "serious",
        matches: "color-contrast-matches",
        excludeHidden: !1,
        tags: ["cat.color", "wcag2aa", "wcag143", "TTv5", "TT13.c", "EN-301-549", "EN-9.1.4.3", "ACT"],
        actIds: ["afw4f7", "09o5cg"],
        all: [],
        any: [{
          options: {
            ignoreUnicode: !0,
            ignoreLength: !1,
            ignorePseudo: !1,
            boldValue: 700,
            boldTextPt: 14,
            largeTextPt: 18,
            contrastRatio: {
              normal: {
                expected: 4.5
              },
              large: {
                expected: 3
              }
            },
            pseudoSizeThreshold: 0.25,
            shadowOutlineEmMax: 0.2,
            textStrokeEmMin: 0.03
          },
          id: "color-contrast"
        }],
        none: []
      }, {
        id: "css-orientation-lock",
        impact: "serious",
        selector: "html",
        tags: ["cat.structure", "wcag134", "wcag21aa", "EN-301-549", "EN-9.1.3.4", "experimental"],
        actIds: ["b33eff"],
        all: [{
          options: {
            degreeThreshold: 2
          },
          id: "css-orientation-lock"
        }],
        any: [],
        none: [],
        preload: !0
      }, {
        id: "definition-list",
        impact: "serious",
        selector: "dl",
        matches: "no-role-matches",
        tags: ["cat.structure", "wcag2a", "wcag131", "EN-301-549", "EN-9.1.3.1"],
        all: [],
        any: [],
        none: ["structured-dlitems", {
          options: {
            validRoles: ["definition", "term", "listitem"],
            validNodeNames: ["dt", "dd"],
            divGroups: !0
          },
          id: "only-dlitems"
        }]
      }, {
        id: "dlitem",
        impact: "serious",
        selector: "dd, dt",
        matches: "no-role-matches",
        tags: ["cat.structure", "wcag2a", "wcag131", "EN-301-549", "EN-9.1.3.1"],
        all: [],
        any: ["dlitem"],
        none: []
      }, {
        id: "document-title",
        impact: "serious",
        selector: "html",
        matches: "is-initiator-matches",
        tags: ["cat.text-alternatives", "wcag2a", "wcag242", "TTv5", "TT12.a", "EN-301-549", "EN-9.2.4.2", "ACT"],
        actIds: ["2779a5"],
        all: [],
        any: ["doc-has-title"],
        none: []
      }, {
        id: "duplicate-id-active",
        impact: "serious",
        selector: "[id]",
        matches: "duplicate-id-active-matches",
        excludeHidden: !1,
        tags: ["cat.parsing", "wcag2a-obsolete", "wcag411", "deprecated"],
        enabled: !1,
        actIds: ["3ea0c8"],
        all: [],
        any: ["duplicate-id-active"],
        none: []
      }, {
        id: "duplicate-id-aria",
        impact: "critical",
        selector: "[id]",
        matches: "duplicate-id-aria-matches",
        excludeHidden: !1,
        tags: ["cat.parsing", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2"],
        reviewOnFail: !0,
        actIds: ["3ea0c8"],
        all: [],
        any: ["duplicate-id-aria"],
        none: []
      }, {
        id: "duplicate-id",
        impact: "minor",
        selector: "[id]",
        matches: "duplicate-id-misc-matches",
        excludeHidden: !1,
        tags: ["cat.parsing", "wcag2a-obsolete", "wcag411", "deprecated"],
        enabled: !1,
        actIds: ["3ea0c8"],
        all: [],
        any: ["duplicate-id"],
        none: []
      }, {
        id: "empty-heading",
        impact: "minor",
        selector: 'h1, h2, h3, h4, h5, h6, [role="heading"]',
        matches: "heading-matches",
        tags: ["cat.name-role-value", "best-practice"],
        actIds: ["ffd0e9"],
        all: [],
        any: ["has-visible-text", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "empty-table-header",
        impact: "minor",
        selector: 'th:not([role]), [role="rowheader"], [role="columnheader"]',
        tags: ["cat.name-role-value", "best-practice"],
        all: [],
        any: ["has-visible-text"],
        none: []
      }, {
        id: "focus-order-semantics",
        impact: "minor",
        selector: "div, h1, h2, h3, h4, h5, h6, [role=heading], p, span",
        matches: "inserted-into-focus-order-matches",
        tags: ["cat.keyboard", "best-practice", "experimental"],
        all: [],
        any: [{
          options: [],
          id: "has-widget-role"
        }, {
          options: {
            roles: ["tooltip"]
          },
          id: "valid-scrollable-semantics"
        }],
        none: []
      }, {
        id: "form-field-multiple-labels",
        impact: "moderate",
        selector: "input, select, textarea",
        matches: "label-matches",
        tags: ["cat.forms", "wcag2a", "wcag332", "TTv5", "TT5.c", "EN-301-549", "EN-9.3.3.2"],
        all: [],
        any: [],
        none: ["multiple-label"]
      }, {
        id: "frame-focusable-content",
        impact: "serious",
        selector: "html",
        matches: "frame-focusable-content-matches",
        tags: ["cat.keyboard", "wcag2a", "wcag211", "TTv5", "TT4.a", "EN-301-549", "EN-9.2.1.1"],
        actIds: ["akn7bn"],
        all: [],
        any: ["frame-focusable-content"],
        none: []
      }, {
        id: "frame-tested",
        impact: "critical",
        selector: "html, frame, iframe",
        tags: ["cat.structure", "best-practice", "review-item"],
        all: [{
          options: {
            isViolation: !1
          },
          id: "frame-tested"
        }],
        any: [],
        none: []
      }, {
        id: "frame-title-unique",
        impact: "serious",
        selector: "frame[title], iframe[title]",
        matches: "frame-title-has-text-matches",
        tags: ["cat.text-alternatives", "wcag2a", "wcag412", "TTv5", "TT12.d", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["4b1c6c"],
        all: [],
        any: [],
        none: ["unique-frame-title"],
        reviewOnFail: !0
      }, {
        id: "frame-title",
        impact: "serious",
        selector: "frame, iframe",
        matches: "no-negative-tabindex-matches",
        tags: ["cat.text-alternatives", "wcag2a", "wcag412", "section508", "section508.22.i", "TTv5", "TT12.d", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["cae760"],
        all: [],
        any: [{
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }, "aria-label", "aria-labelledby", "presentational-role"],
        none: []
      }, {
        id: "heading-order",
        impact: "moderate",
        selector: "h1, h2, h3, h4, h5, h6, [role=heading]",
        matches: "heading-matches",
        tags: ["cat.semantics", "best-practice"],
        all: [],
        any: ["heading-order"],
        none: []
      }, {
        id: "hidden-content",
        impact: "minor",
        selector: "*",
        excludeHidden: !1,
        tags: ["cat.structure", "best-practice", "experimental", "review-item"],
        all: [],
        any: ["hidden-content"],
        none: []
      }, {
        id: "html-has-lang",
        impact: "serious",
        selector: "html",
        matches: "is-initiator-matches",
        tags: ["cat.language", "wcag2a", "wcag311", "TTv5", "TT11.a", "EN-301-549", "EN-9.3.1.1", "ACT"],
        actIds: ["b5c3f8"],
        all: [],
        any: [{
          options: {
            attributes: ["lang", "xml:lang"]
          },
          id: "has-lang"
        }],
        none: []
      }, {
        id: "html-lang-valid",
        impact: "serious",
        selector: 'html[lang]:not([lang=""]), html[xml\\:lang]:not([xml\\:lang=""])',
        tags: ["cat.language", "wcag2a", "wcag311", "TTv5", "TT11.a", "EN-301-549", "EN-9.3.1.1", "ACT"],
        actIds: ["bf051a"],
        all: [],
        any: [],
        none: [{
          options: {
            attributes: ["lang", "xml:lang"]
          },
          id: "valid-lang"
        }]
      }, {
        id: "html-xml-lang-mismatch",
        impact: "moderate",
        selector: "html[lang][xml\\:lang]",
        matches: "xml-lang-mismatch-matches",
        tags: ["cat.language", "wcag2a", "wcag311", "EN-301-549", "EN-9.3.1.1", "ACT"],
        actIds: ["5b7ae0"],
        all: ["xml-lang-mismatch"],
        any: [],
        none: []
      }, {
        id: "identical-links-same-purpose",
        impact: "minor",
        selector: 'a[href], area[href], [role="link"]',
        excludeHidden: !1,
        enabled: !1,
        matches: "identical-links-same-purpose-matches",
        tags: ["cat.semantics", "wcag2aaa", "wcag249"],
        actIds: ["b20e66"],
        all: ["identical-links-same-purpose"],
        any: [],
        none: []
      }, {
        id: "image-alt",
        impact: "critical",
        selector: "img",
        matches: "no-explicit-name-required-matches",
        tags: ["cat.text-alternatives", "wcag2a", "wcag111", "section508", "section508.22.a", "TTv5", "TT7.a", "TT7.b", "EN-301-549", "EN-9.1.1.1", "ACT"],
        actIds: ["23a2a8"],
        all: [],
        any: ["has-alt", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }, "presentational-role"],
        none: ["alt-space-value"]
      }, {
        id: "image-redundant-alt",
        impact: "minor",
        selector: "img",
        tags: ["cat.text-alternatives", "best-practice"],
        all: [],
        any: [],
        none: [{
          options: {
            parentSelector: "button, [role=button], a[href], p, li, td, th"
          },
          id: "duplicate-img-label"
        }]
      }, {
        id: "input-button-name",
        impact: "critical",
        selector: 'input[type="button"], input[type="submit"], input[type="reset"]',
        matches: "no-explicit-name-required-matches",
        tags: ["cat.name-role-value", "wcag2a", "wcag412", "section508", "section508.22.a", "TTv5", "TT5.c", "EN-301-549", "EN-9.4.1.2", "ACT"],
        actIds: ["97a4e1"],
        all: [],
        any: ["non-empty-if-present", {
          options: {
            attribute: "value"
          },
          id: "non-empty-value"
        }, "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }, "implicit-label", "explicit-label", "presentational-role"],
        none: []
      }, {
        id: "input-image-alt",
        impact: "critical",
        selector: 'input[type="image"]',
        matches: "no-explicit-name-required-matches",
        tags: ["cat.text-alternatives", "wcag2a", "wcag111", "wcag412", "section508", "section508.22.a", "TTv5", "TT7.a", "EN-301-549", "EN-9.1.1.1", "EN-9.4.1.2", "ACT"],
        actIds: ["59796f"],
        all: [],
        any: [{
          options: {
            attribute: "alt"
          },
          id: "non-empty-alt"
        }, "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }, "implicit-label", "explicit-label"],
        none: []
      }, {
        id: "label-content-name-mismatch",
        impact: "serious",
        matches: "label-content-name-mismatch-matches",
        tags: ["cat.semantics", "wcag21a", "wcag253", "EN-301-549", "EN-9.2.5.3", "experimental"],
        actIds: ["2ee8b8"],
        all: [],
        any: [{
          options: {
            pixelThreshold: 0.1,
            occurrenceThreshold: 3
          },
          id: "label-content-name-mismatch"
        }],
        none: []
      }, {
        id: "label-title-only",
        impact: "serious",
        selector: "input, select, textarea",
        matches: "label-matches",
        tags: ["cat.forms", "best-practice"],
        all: [],
        any: [],
        none: ["title-only"]
      }, {
        id: "label",
        impact: "critical",
        selector: "input, textarea",
        matches: "label-matches",
        tags: ["cat.forms", "wcag2a", "wcag412", "section508", "section508.22.n", "TTv5", "TT5.c", "EN-301-549", "EN-9.4.1.2", "ACT"],
        actIds: ["e086e5"],
        all: [],
        any: ["implicit-label", "explicit-label", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }, {
          options: {
            attribute: "placeholder"
          },
          id: "non-empty-placeholder"
        }, "presentational-role"],
        none: ["hidden-explicit-label"]
      }, {
        id: "landmark-banner-is-top-level",
        impact: "moderate",
        selector: "header:not([role]), [role=banner]",
        matches: "landmark-has-body-context-matches",
        tags: ["cat.semantics", "best-practice"],
        all: [],
        any: ["landmark-is-top-level"],
        none: []
      }, {
        id: "landmark-complementary-is-top-level",
        impact: "moderate",
        selector: "aside:not([role]), [role=complementary]",
        tags: ["cat.semantics", "best-practice"],
        all: [],
        any: ["landmark-is-top-level"],
        none: []
      }, {
        id: "landmark-contentinfo-is-top-level",
        impact: "moderate",
        selector: "footer:not([role]), [role=contentinfo]",
        matches: "landmark-has-body-context-matches",
        tags: ["cat.semantics", "best-practice"],
        all: [],
        any: ["landmark-is-top-level"],
        none: []
      }, {
        id: "landmark-main-is-top-level",
        impact: "moderate",
        selector: "main:not([role]), [role=main]",
        tags: ["cat.semantics", "best-practice"],
        all: [],
        any: ["landmark-is-top-level"],
        none: []
      }, {
        id: "landmark-no-duplicate-banner",
        impact: "moderate",
        selector: "header:not([role]), [role=banner]",
        tags: ["cat.semantics", "best-practice"],
        all: [],
        any: [{
          options: {
            selector: "header:not([role]), [role=banner]",
            role: "banner"
          },
          id: "page-no-duplicate-banner"
        }],
        none: []
      }, {
        id: "landmark-no-duplicate-contentinfo",
        impact: "moderate",
        selector: "footer:not([role]), [role=contentinfo]",
        tags: ["cat.semantics", "best-practice"],
        all: [],
        any: [{
          options: {
            selector: "footer:not([role]), [role=contentinfo]",
            role: "contentinfo"
          },
          id: "page-no-duplicate-contentinfo"
        }],
        none: []
      }, {
        id: "landmark-no-duplicate-main",
        impact: "moderate",
        selector: "main:not([role]), [role=main]",
        tags: ["cat.semantics", "best-practice"],
        all: [],
        any: [{
          options: {
            selector: "main:not([role]), [role='main']"
          },
          id: "page-no-duplicate-main"
        }],
        none: []
      }, {
        id: "landmark-one-main",
        impact: "moderate",
        selector: "html",
        tags: ["cat.semantics", "best-practice"],
        all: [{
          options: {
            selector: "main:not([role]), [role='main']",
            passForModal: !0
          },
          id: "page-has-main"
        }],
        any: [],
        none: []
      }, {
        id: "landmark-unique",
        impact: "moderate",
        selector: "[role=banner], [role=complementary], [role=contentinfo], [role=main], [role=navigation], [role=region], [role=search], [role=form], form, footer, header, aside, main, nav, section",
        tags: ["cat.semantics", "best-practice"],
        matches: "landmark-unique-matches",
        all: [],
        any: ["landmark-is-unique"],
        none: []
      }, {
        id: "link-in-text-block",
        impact: "serious",
        selector: "a[href], [role=link]",
        matches: "link-in-text-block-matches",
        excludeHidden: !1,
        tags: ["cat.color", "wcag2a", "wcag141", "TTv5", "TT13.a", "EN-301-549", "EN-9.1.4.1"],
        all: [],
        any: [{
          options: {
            requiredContrastRatio: 3,
            allowSameColor: !0
          },
          id: "link-in-text-block"
        }, "link-in-text-block-style"],
        none: []
      }, {
        id: "link-name",
        impact: "serious",
        selector: "a[href]",
        tags: ["cat.name-role-value", "wcag2a", "wcag244", "wcag412", "section508", "section508.22.a", "TTv5", "TT6.a", "EN-301-549", "EN-9.2.4.4", "EN-9.4.1.2", "ACT"],
        actIds: ["c487ae"],
        all: [],
        any: ["has-visible-text", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: ["focusable-no-name"]
      }, {
        id: "list",
        impact: "serious",
        selector: "ul, ol",
        matches: "no-role-matches",
        tags: ["cat.structure", "wcag2a", "wcag131", "EN-301-549", "EN-9.1.3.1"],
        all: [],
        any: [],
        none: [{
          options: {
            validRoles: ["listitem"],
            validNodeNames: ["li"]
          },
          id: "only-listitems"
        }]
      }, {
        id: "listitem",
        impact: "serious",
        selector: "li",
        matches: "no-role-matches",
        tags: ["cat.structure", "wcag2a", "wcag131", "EN-301-549", "EN-9.1.3.1"],
        all: [],
        any: ["listitem"],
        none: []
      }, {
        id: "marquee",
        impact: "serious",
        selector: "marquee",
        excludeHidden: !1,
        tags: ["cat.parsing", "wcag2a", "wcag222", "TTv5", "TT2.b", "EN-301-549", "EN-9.2.2.2"],
        all: [],
        any: [],
        none: ["is-on-screen"]
      }, {
        id: "meta-refresh-no-exceptions",
        impact: "minor",
        selector: 'meta[http-equiv="refresh"][content]',
        excludeHidden: !1,
        enabled: !1,
        tags: ["cat.time-and-media", "wcag2aaa", "wcag224", "wcag325"],
        actIds: ["bisz58"],
        all: [],
        any: [{
          options: {
            minDelay: 72e3,
            maxDelay: !1
          },
          id: "meta-refresh-no-exceptions"
        }],
        none: []
      }, {
        id: "meta-refresh",
        impact: "critical",
        selector: 'meta[http-equiv="refresh"][content]',
        excludeHidden: !1,
        tags: ["cat.time-and-media", "wcag2a", "wcag221", "TTv5", "TT8.a", "EN-301-549", "EN-9.2.2.1"],
        actIds: ["bc659a", "bisz58"],
        all: [],
        any: [{
          options: {
            minDelay: 0,
            maxDelay: 72e3
          },
          id: "meta-refresh"
        }],
        none: []
      }, {
        id: "meta-viewport-large",
        impact: "minor",
        selector: 'meta[name="viewport"]',
        matches: "is-initiator-matches",
        excludeHidden: !1,
        tags: ["cat.sensory-and-visual-cues", "best-practice"],
        all: [],
        any: [{
          options: {
            scaleMinimum: 5,
            lowerBound: 2
          },
          id: "meta-viewport-large"
        }],
        none: []
      }, {
        id: "meta-viewport",
        impact: "critical",
        selector: 'meta[name="viewport"]',
        matches: "is-initiator-matches",
        excludeHidden: !1,
        tags: ["cat.sensory-and-visual-cues", "wcag2aa", "wcag144", "EN-301-549", "EN-9.1.4.4", "ACT"],
        actIds: ["b4f0c3"],
        all: [],
        any: [{
          options: {
            scaleMinimum: 2
          },
          id: "meta-viewport"
        }],
        none: []
      }, {
        id: "nested-interactive",
        impact: "serious",
        matches: "nested-interactive-matches",
        tags: ["cat.keyboard", "wcag2a", "wcag412", "TTv5", "TT6.a", "EN-301-549", "EN-9.4.1.2"],
        actIds: ["307n5z"],
        all: [],
        any: ["no-focusable-content"],
        none: []
      }, {
        id: "no-autoplay-audio",
        impact: "moderate",
        excludeHidden: !1,
        selector: "audio[autoplay], video[autoplay]",
        matches: "no-autoplay-audio-matches",
        reviewOnFail: !0,
        tags: ["cat.time-and-media", "wcag2a", "wcag142", "TTv5", "TT2.a", "EN-301-549", "EN-9.1.4.2", "ACT"],
        actIds: ["80f0bf"],
        preload: !0,
        all: [{
          options: {
            allowedDuration: 3
          },
          id: "no-autoplay-audio"
        }],
        any: [],
        none: []
      }, {
        id: "object-alt",
        impact: "serious",
        selector: "object[data]",
        matches: "object-is-loaded-matches",
        tags: ["cat.text-alternatives", "wcag2a", "wcag111", "section508", "section508.22.a", "EN-301-549", "EN-9.1.1.1"],
        actIds: ["8fc3b6"],
        all: [],
        any: ["aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }, "presentational-role"],
        none: []
      }, {
        id: "p-as-heading",
        impact: "serious",
        selector: "p",
        matches: "p-as-heading-matches",
        tags: ["cat.semantics", "wcag2a", "wcag131", "EN-301-549", "EN-9.1.3.1", "experimental"],
        all: [{
          options: {
            margins: [{
              weight: 150,
              italic: !0
            }, {
              weight: 150,
              size: 1.15
            }, {
              italic: !0,
              size: 1.15
            }, {
              size: 1.4
            }],
            passLength: 1,
            failLength: 0.5
          },
          id: "p-as-heading"
        }],
        any: [],
        none: []
      }, {
        id: "page-has-heading-one",
        impact: "moderate",
        selector: "html",
        tags: ["cat.semantics", "best-practice"],
        all: [{
          options: {
            selector: "h1:not([role], [aria-level]), :is(h1, h2, h3, h4, h5, h6):not([role])[aria-level=1], [role=heading][aria-level=1]",
            passForModal: !0
          },
          id: "page-has-heading-one"
        }],
        any: [],
        none: []
      }, {
        id: "presentation-role-conflict",
        impact: "minor",
        selector: `img[alt=''], [role="none"], [role="presentation"]`,
        matches: "has-implicit-chromium-role-matches",
        tags: ["cat.aria", "best-practice", "ACT"],
        actIds: ["46ca7f"],
        all: [],
        any: [],
        none: ["is-element-focusable", "has-global-aria-attribute"]
      }, {
        id: "region",
        impact: "moderate",
        selector: "body *",
        tags: ["cat.keyboard", "best-practice"],
        all: [],
        any: [{
          options: {
            regionMatcher: "dialog, [role=dialog], [role=alertdialog], svg"
          },
          id: "region"
        }],
        none: []
      }, {
        id: "role-img-alt",
        impact: "serious",
        selector: "[role='img']:not(img, area, input, object)",
        matches: "html-namespace-matches",
        tags: ["cat.text-alternatives", "wcag2a", "wcag111", "section508", "section508.22.a", "TTv5", "TT7.a", "EN-301-549", "EN-9.1.1.1", "ACT"],
        actIds: ["23a2a8"],
        all: [],
        any: ["aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "scope-attr-valid",
        impact: "moderate",
        selector: "td[scope], th[scope]",
        tags: ["cat.tables", "best-practice"],
        all: ["html5-scope", {
          options: {
            values: ["row", "col", "rowgroup", "colgroup"]
          },
          id: "scope-value"
        }],
        any: [],
        none: []
      }, {
        id: "scrollable-region-focusable",
        impact: "serious",
        selector: "*:not(select,textarea)",
        matches: "scrollable-region-focusable-matches",
        tags: ["cat.keyboard", "wcag2a", "wcag211", "wcag213", "TTv5", "TT4.a", "EN-301-549", "EN-9.2.1.1", "EN-9.2.1.3"],
        actIds: ["0ssw9k"],
        all: [],
        any: ["focusable-content", "focusable-element"],
        none: []
      }, {
        id: "select-name",
        impact: "critical",
        selector: "select",
        tags: ["cat.forms", "wcag2a", "wcag412", "section508", "section508.22.n", "TTv5", "TT5.c", "EN-301-549", "EN-9.4.1.2", "ACT"],
        actIds: ["e086e5"],
        all: [],
        any: ["implicit-label", "explicit-label", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }, "presentational-role"],
        none: ["hidden-explicit-label"]
      }, {
        id: "server-side-image-map",
        impact: "minor",
        selector: "img[ismap]",
        tags: ["cat.text-alternatives", "wcag2a", "wcag211", "section508", "section508.22.f", "TTv5", "TT4.a", "EN-301-549", "EN-9.2.1.1"],
        all: [],
        any: [],
        none: ["exists"]
      }, {
        id: "skip-link",
        impact: "moderate",
        selector: 'a[href^="#"], a[href^="/#"]',
        matches: "skip-link-matches",
        tags: ["cat.keyboard", "best-practice"],
        all: [],
        any: ["skip-link"],
        none: []
      }, {
        id: "summary-name",
        impact: "serious",
        selector: "summary",
        matches: "summary-interactive-matches",
        tags: ["cat.name-role-value", "wcag2a", "wcag412", "section508", "section508.22.a", "TTv5", "TT6.a", "EN-301-549", "EN-9.4.1.2"],
        all: [],
        any: ["has-visible-text", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "svg-img-alt",
        impact: "serious",
        selector: '[role="img"], [role="graphics-symbol"], svg[role="graphics-document"]',
        matches: "svg-namespace-matches",
        tags: ["cat.text-alternatives", "wcag2a", "wcag111", "section508", "section508.22.a", "TTv5", "TT7.a", "EN-301-549", "EN-9.1.1.1", "ACT"],
        actIds: ["7d6734"],
        all: [],
        any: ["svg-non-empty-title", "aria-label", "aria-labelledby", {
          options: {
            attribute: "title"
          },
          id: "non-empty-title"
        }],
        none: []
      }, {
        id: "tabindex",
        impact: "serious",
        selector: "[tabindex]",
        tags: ["cat.keyboard", "best-practice"],
        all: [],
        any: ["tabindex"],
        none: []
      }, {
        id: "table-duplicate-name",
        impact: "minor",
        selector: "table",
        tags: ["cat.tables", "best-practice"],
        all: [],
        any: [],
        none: ["same-caption-summary"]
      }, {
        id: "table-fake-caption",
        impact: "serious",
        selector: "table",
        matches: "data-table-matches",
        tags: ["cat.tables", "experimental", "wcag2a", "wcag131", "section508", "section508.22.g", "EN-301-549", "EN-9.1.3.1"],
        all: ["caption-faked"],
        any: [],
        none: []
      }, {
        id: "target-size",
        impact: "serious",
        selector: "*",
        enabled: !1,
        matches: "widget-not-inline-matches",
        tags: ["cat.sensory-and-visual-cues", "wcag22aa", "wcag258"],
        all: [],
        any: [{
          options: {
            minSize: 24
          },
          id: "target-size"
        }, {
          options: {
            minOffset: 24
          },
          id: "target-offset"
        }],
        none: []
      }, {
        id: "td-has-header",
        impact: "critical",
        selector: "table",
        matches: "data-table-large-matches",
        tags: ["cat.tables", "experimental", "wcag2a", "wcag131", "section508", "section508.22.g", "TTv5", "TT14.b", "EN-301-549", "EN-9.1.3.1"],
        all: ["td-has-header"],
        any: [],
        none: []
      }, {
        id: "td-headers-attr",
        impact: "serious",
        selector: "table",
        matches: "table-or-grid-role-matches",
        tags: ["cat.tables", "wcag2a", "wcag131", "section508", "section508.22.g", "TTv5", "TT14.b", "EN-301-549", "EN-9.1.3.1"],
        actIds: ["a25f45"],
        all: ["td-headers-attr"],
        any: [],
        none: []
      }, {
        id: "th-has-data-cells",
        impact: "serious",
        selector: "table",
        matches: "data-table-matches",
        tags: ["cat.tables", "wcag2a", "wcag131", "section508", "section508.22.g", "TTv5", "TT14.b", "EN-301-549", "EN-9.1.3.1"],
        actIds: ["d0f69e"],
        all: ["th-has-data-cells"],
        any: [],
        none: []
      }, {
        id: "valid-lang",
        impact: "serious",
        selector: "[lang]:not(html), [xml\\:lang]:not(html)",
        tags: ["cat.language", "wcag2aa", "wcag312", "TTv5", "TT11.b", "EN-301-549", "EN-9.3.1.2", "ACT"],
        actIds: ["de46e4"],
        all: [],
        any: [],
        none: [{
          options: {
            attributes: ["lang", "xml:lang"]
          },
          id: "valid-lang"
        }]
      }, {
        id: "video-caption",
        impact: "critical",
        selector: "video",
        tags: ["cat.text-alternatives", "wcag2a", "wcag122", "section508", "section508.22.a", "TTv5", "TT17.a", "EN-301-549", "EN-9.1.2.2"],
        actIds: ["eac66b"],
        all: [],
        any: [],
        none: ["caption"]
      }],
      checks: [{
        id: "abstractrole",
        evaluate: "abstractrole-evaluate"
      }, {
        id: "aria-allowed-attr",
        evaluate: "aria-allowed-attr-evaluate",
        options: {
          validTreeRowAttrs: ["aria-posinset", "aria-setsize", "aria-expanded", "aria-level"]
        }
      }, {
        id: "aria-allowed-role",
        evaluate: "aria-allowed-role-evaluate",
        options: {
          allowImplicit: !0,
          ignoredTags: []
        }
      }, {
        id: "aria-busy",
        evaluate: "aria-busy-evaluate",
        deprecated: !0
      }, {
        id: "aria-conditional-attr",
        evaluate: "aria-conditional-attr-evaluate",
        options: {
          invalidTableRowAttrs: ["aria-posinset", "aria-setsize", "aria-expanded", "aria-level"]
        }
      }, {
        id: "aria-errormessage",
        evaluate: "aria-errormessage-evaluate"
      }, {
        id: "aria-hidden-body",
        evaluate: "aria-hidden-body-evaluate"
      }, {
        id: "aria-level",
        evaluate: "aria-level-evaluate"
      }, {
        id: "aria-prohibited-attr",
        evaluate: "aria-prohibited-attr-evaluate",
        options: {
          elementsAllowedAriaLabel: ["applet", "input"]
        }
      }, {
        id: "aria-required-attr",
        evaluate: "aria-required-attr-evaluate"
      }, {
        id: "aria-required-children",
        evaluate: "aria-required-children-evaluate",
        options: {
          reviewEmpty: ["doc-bibliography", "doc-endnotes", "grid", "list", "listbox", "menu", "menubar", "table", "tablist", "tree", "treegrid", "rowgroup"]
        }
      }, {
        id: "aria-required-parent",
        evaluate: "aria-required-parent-evaluate",
        options: {
          ownGroupRoles: ["listitem", "treeitem"]
        }
      }, {
        id: "aria-roledescription",
        evaluate: "aria-roledescription-evaluate",
        options: {
          supportedRoles: ["button", "img", "checkbox", "radio", "combobox", "menuitemcheckbox", "menuitemradio"]
        }
      }, {
        id: "aria-unsupported-attr",
        evaluate: "aria-unsupported-attr-evaluate"
      }, {
        id: "aria-valid-attr-value",
        evaluate: "aria-valid-attr-value-evaluate",
        options: []
      }, {
        id: "aria-valid-attr",
        evaluate: "aria-valid-attr-evaluate",
        options: []
      }, {
        id: "braille-label-equivalent",
        evaluate: "braille-label-equivalent-evaluate"
      }, {
        id: "braille-roledescription-equivalent",
        evaluate: "braille-roledescription-equivalent-evaluate"
      }, {
        id: "deprecatedrole",
        evaluate: "deprecatedrole-evaluate"
      }, {
        id: "fallbackrole",
        evaluate: "fallbackrole-evaluate"
      }, {
        id: "has-global-aria-attribute",
        evaluate: "has-global-aria-attribute-evaluate"
      }, {
        id: "has-widget-role",
        evaluate: "has-widget-role-evaluate",
        options: []
      }, {
        id: "invalidrole",
        evaluate: "invalidrole-evaluate"
      }, {
        id: "is-element-focusable",
        evaluate: "is-element-focusable-evaluate"
      }, {
        id: "no-implicit-explicit-label",
        evaluate: "no-implicit-explicit-label-evaluate"
      }, {
        id: "unsupportedrole",
        evaluate: "unsupportedrole-evaluate"
      }, {
        id: "valid-scrollable-semantics",
        evaluate: "valid-scrollable-semantics-evaluate",
        options: {
          roles: ["tooltip"]
        }
      }, {
        id: "color-contrast-enhanced",
        evaluate: "color-contrast-evaluate",
        options: {
          ignoreUnicode: !0,
          ignoreLength: !1,
          ignorePseudo: !1,
          boldValue: 700,
          boldTextPt: 14,
          largeTextPt: 18,
          contrastRatio: {
            normal: {
              expected: 7,
              minThreshold: 4.5
            },
            large: {
              expected: 4.5,
              minThreshold: 3
            }
          },
          pseudoSizeThreshold: 0.25,
          shadowOutlineEmMax: 0.1,
          textStrokeEmMin: 0.03
        }
      }, {
        id: "color-contrast",
        evaluate: "color-contrast-evaluate",
        options: {
          ignoreUnicode: !0,
          ignoreLength: !1,
          ignorePseudo: !1,
          boldValue: 700,
          boldTextPt: 14,
          largeTextPt: 18,
          contrastRatio: {
            normal: {
              expected: 4.5
            },
            large: {
              expected: 3
            }
          },
          pseudoSizeThreshold: 0.25,
          shadowOutlineEmMax: 0.2,
          textStrokeEmMin: 0.03
        }
      }, {
        id: "link-in-text-block-style",
        evaluate: "link-in-text-block-style-evaluate"
      }, {
        id: "link-in-text-block",
        evaluate: "link-in-text-block-evaluate",
        options: {
          requiredContrastRatio: 3,
          allowSameColor: !0
        }
      }, {
        id: "autocomplete-appropriate",
        evaluate: "autocomplete-appropriate-evaluate",
        deprecated: !0
      }, {
        id: "autocomplete-valid",
        evaluate: "autocomplete-valid-evaluate",
        options: {
          stateTerms: ["none", "false", "true", "disabled", "enabled", "undefined", "null"],
          ignoredValues: ["text", "pronouns", "gender", "message", "content"]
        }
      }, {
        id: "accesskeys",
        evaluate: "accesskeys-evaluate",
        after: "accesskeys-after"
      }, {
        id: "focusable-content",
        evaluate: "focusable-content-evaluate"
      }, {
        id: "focusable-disabled",
        evaluate: "focusable-disabled-evaluate"
      }, {
        id: "focusable-element",
        evaluate: "focusable-element-evaluate"
      }, {
        id: "focusable-modal-open",
        evaluate: "focusable-modal-open-evaluate"
      }, {
        id: "focusable-no-name",
        evaluate: "focusable-no-name-evaluate"
      }, {
        id: "focusable-not-tabbable",
        evaluate: "focusable-not-tabbable-evaluate"
      }, {
        id: "frame-focusable-content",
        evaluate: "frame-focusable-content-evaluate"
      }, {
        id: "landmark-is-top-level",
        evaluate: "landmark-is-top-level-evaluate"
      }, {
        id: "no-focusable-content",
        evaluate: "no-focusable-content-evaluate"
      }, {
        id: "page-has-heading-one",
        evaluate: "has-descendant-evaluate",
        after: "has-descendant-after",
        options: {
          selector: "h1:not([role], [aria-level]), :is(h1, h2, h3, h4, h5, h6):not([role])[aria-level=1], [role=heading][aria-level=1]",
          passForModal: !0
        }
      }, {
        id: "page-has-main",
        evaluate: "has-descendant-evaluate",
        after: "has-descendant-after",
        options: {
          selector: "main:not([role]), [role='main']",
          passForModal: !0
        }
      }, {
        id: "page-no-duplicate-banner",
        evaluate: "page-no-duplicate-evaluate",
        after: "page-no-duplicate-after",
        options: {
          selector: "header:not([role]), [role=banner]",
          role: "banner"
        }
      }, {
        id: "page-no-duplicate-contentinfo",
        evaluate: "page-no-duplicate-evaluate",
        after: "page-no-duplicate-after",
        options: {
          selector: "footer:not([role]), [role=contentinfo]",
          role: "contentinfo"
        }
      }, {
        id: "page-no-duplicate-main",
        evaluate: "page-no-duplicate-evaluate",
        after: "page-no-duplicate-after",
        options: {
          selector: "main:not([role]), [role='main']"
        }
      }, {
        id: "tabindex",
        evaluate: "tabindex-evaluate"
      }, {
        id: "alt-space-value",
        evaluate: "alt-space-value-evaluate"
      }, {
        id: "duplicate-img-label",
        evaluate: "duplicate-img-label-evaluate",
        options: {
          parentSelector: "button, [role=button], a[href], p, li, td, th"
        }
      }, {
        id: "explicit-label",
        evaluate: "explicit-evaluate"
      }, {
        id: "help-same-as-label",
        evaluate: "help-same-as-label-evaluate"
      }, {
        id: "hidden-explicit-label",
        evaluate: "hidden-explicit-label-evaluate"
      }, {
        id: "implicit-label",
        evaluate: "implicit-evaluate"
      }, {
        id: "label-content-name-mismatch",
        evaluate: "label-content-name-mismatch-evaluate",
        options: {
          pixelThreshold: 0.1,
          occurrenceThreshold: 3
        }
      }, {
        id: "multiple-label",
        evaluate: "multiple-label-evaluate"
      }, {
        id: "title-only",
        evaluate: "title-only-evaluate"
      }, {
        id: "landmark-is-unique",
        evaluate: "landmark-is-unique-evaluate",
        after: "landmark-is-unique-after"
      }, {
        id: "has-lang",
        evaluate: "has-lang-evaluate",
        options: {
          attributes: ["lang", "xml:lang"]
        }
      }, {
        id: "valid-lang",
        evaluate: "valid-lang-evaluate",
        options: {
          attributes: ["lang", "xml:lang"]
        }
      }, {
        id: "xml-lang-mismatch",
        evaluate: "xml-lang-mismatch-evaluate"
      }, {
        id: "dlitem",
        evaluate: "dlitem-evaluate"
      }, {
        id: "listitem",
        evaluate: "listitem-evaluate"
      }, {
        id: "only-dlitems",
        evaluate: "invalid-children-evaluate",
        options: {
          validRoles: ["definition", "term", "listitem"],
          validNodeNames: ["dt", "dd"],
          divGroups: !0
        }
      }, {
        id: "only-listitems",
        evaluate: "invalid-children-evaluate",
        options: {
          validRoles: ["listitem"],
          validNodeNames: ["li"]
        }
      }, {
        id: "structured-dlitems",
        evaluate: "structured-dlitems-evaluate"
      }, {
        id: "caption",
        evaluate: "caption-evaluate"
      }, {
        id: "frame-tested",
        evaluate: "frame-tested-evaluate",
        after: "frame-tested-after",
        options: {
          isViolation: !1
        }
      }, {
        id: "no-autoplay-audio",
        evaluate: "no-autoplay-audio-evaluate",
        options: {
          allowedDuration: 3
        }
      }, {
        id: "css-orientation-lock",
        evaluate: "css-orientation-lock-evaluate",
        options: {
          degreeThreshold: 2
        }
      }, {
        id: "meta-viewport-large",
        evaluate: "meta-viewport-scale-evaluate",
        options: {
          scaleMinimum: 5,
          lowerBound: 2
        }
      }, {
        id: "meta-viewport",
        evaluate: "meta-viewport-scale-evaluate",
        options: {
          scaleMinimum: 2
        }
      }, {
        id: "target-offset",
        evaluate: "target-offset-evaluate",
        options: {
          minOffset: 24
        }
      }, {
        id: "target-size",
        evaluate: "target-size-evaluate",
        options: {
          minSize: 24
        }
      }, {
        id: "header-present",
        evaluate: "has-descendant-evaluate",
        after: "has-descendant-after",
        options: {
          selector: ":is(h1, h2, h3, h4, h5, h6):not([role]), [role=heading]"
        }
      }, {
        id: "heading-order",
        evaluate: "heading-order-evaluate",
        after: "heading-order-after"
      }, {
        id: "identical-links-same-purpose",
        evaluate: "identical-links-same-purpose-evaluate",
        after: "identical-links-same-purpose-after"
      }, {
        id: "internal-link-present",
        evaluate: "internal-link-present-evaluate"
      }, {
        id: "landmark",
        evaluate: "has-descendant-evaluate",
        options: {
          selector: "main, [role=main]"
        }
      }, {
        id: "meta-refresh-no-exceptions",
        evaluate: "meta-refresh-evaluate",
        options: {
          minDelay: 72e3,
          maxDelay: !1
        }
      }, {
        id: "meta-refresh",
        evaluate: "meta-refresh-evaluate",
        options: {
          minDelay: 0,
          maxDelay: 72e3
        }
      }, {
        id: "p-as-heading",
        evaluate: "p-as-heading-evaluate",
        options: {
          margins: [{
            weight: 150,
            italic: !0
          }, {
            weight: 150,
            size: 1.15
          }, {
            italic: !0,
            size: 1.15
          }, {
            size: 1.4
          }],
          passLength: 1,
          failLength: 0.5
        }
      }, {
        id: "region",
        evaluate: "region-evaluate",
        after: "region-after",
        options: {
          regionMatcher: "dialog, [role=dialog], [role=alertdialog], svg"
        }
      }, {
        id: "skip-link",
        evaluate: "skip-link-evaluate"
      }, {
        id: "unique-frame-title",
        evaluate: "unique-frame-title-evaluate",
        after: "unique-frame-title-after"
      }, {
        id: "duplicate-id-active",
        evaluate: "duplicate-id-evaluate",
        after: "duplicate-id-after"
      }, {
        id: "duplicate-id-aria",
        evaluate: "duplicate-id-evaluate",
        after: "duplicate-id-after"
      }, {
        id: "duplicate-id",
        evaluate: "duplicate-id-evaluate",
        after: "duplicate-id-after"
      }, {
        id: "aria-label",
        evaluate: "aria-label-evaluate"
      }, {
        id: "aria-labelledby",
        evaluate: "aria-labelledby-evaluate"
      }, {
        id: "avoid-inline-spacing",
        evaluate: "avoid-inline-spacing-evaluate",
        options: {
          cssProperties: ["line-height", "letter-spacing", "word-spacing"]
        }
      }, {
        id: "button-has-visible-text",
        evaluate: "has-text-content-evaluate"
      }, {
        id: "doc-has-title",
        evaluate: "doc-has-title-evaluate"
      }, {
        id: "exists",
        evaluate: "exists-evaluate"
      }, {
        id: "has-alt",
        evaluate: "has-alt-evaluate"
      }, {
        id: "has-visible-text",
        evaluate: "has-text-content-evaluate"
      }, {
        id: "important-letter-spacing",
        evaluate: "inline-style-property-evaluate",
        options: {
          cssProperty: "letter-spacing",
          minValue: 0.12
        }
      }, {
        id: "important-line-height",
        evaluate: "inline-style-property-evaluate",
        options: {
          multiLineOnly: !0,
          cssProperty: "line-height",
          minValue: 1.5,
          normalValue: 1
        }
      }, {
        id: "important-word-spacing",
        evaluate: "inline-style-property-evaluate",
        options: {
          cssProperty: "word-spacing",
          minValue: 0.16
        }
      }, {
        id: "is-on-screen",
        evaluate: "is-on-screen-evaluate"
      }, {
        id: "non-empty-alt",
        evaluate: "attr-non-space-content-evaluate",
        options: {
          attribute: "alt"
        }
      }, {
        id: "non-empty-if-present",
        evaluate: "non-empty-if-present-evaluate"
      }, {
        id: "non-empty-placeholder",
        evaluate: "attr-non-space-content-evaluate",
        options: {
          attribute: "placeholder"
        }
      }, {
        id: "non-empty-title",
        evaluate: "attr-non-space-content-evaluate",
        options: {
          attribute: "title"
        }
      }, {
        id: "non-empty-value",
        evaluate: "attr-non-space-content-evaluate",
        options: {
          attribute: "value"
        }
      }, {
        id: "presentational-role",
        evaluate: "presentational-role-evaluate"
      }, {
        id: "role-none",
        evaluate: "matches-definition-evaluate",
        deprecated: !0,
        options: {
          matcher: {
            attributes: {
              role: "none"
            }
          }
        }
      }, {
        id: "role-presentation",
        evaluate: "matches-definition-evaluate",
        deprecated: !0,
        options: {
          matcher: {
            attributes: {
              role: "presentation"
            }
          }
        }
      }, {
        id: "svg-non-empty-title",
        evaluate: "svg-non-empty-title-evaluate"
      }, {
        id: "caption-faked",
        evaluate: "caption-faked-evaluate"
      }, {
        id: "html5-scope",
        evaluate: "html5-scope-evaluate"
      }, {
        id: "same-caption-summary",
        evaluate: "same-caption-summary-evaluate"
      }, {
        id: "scope-value",
        evaluate: "scope-value-evaluate",
        options: {
          values: ["row", "col", "rowgroup", "colgroup"]
        }
      }, {
        id: "td-has-header",
        evaluate: "td-has-header-evaluate"
      }, {
        id: "td-headers-attr",
        evaluate: "td-headers-attr-evaluate"
      }, {
        id: "th-has-data-cells",
        evaluate: "th-has-data-cells-evaluate"
      }, {
        id: "hidden-content",
        evaluate: "hidden-content-evaluate"
      }]
    });
  })(typeof window == "object" ? window : MT);
})(Ju);
var IT = Ju.exports;
const PT = /* @__PURE__ */ OT(IT), LT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PT
}, Symbol.toStringTag, { value: "Module" }));
export {
  LT as a
};
