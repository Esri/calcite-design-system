/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1-next.0 */
var M = typeof global == "object" && global && global.Object === Object && global, R = typeof self == "object" && self && self.Object === Object && self, W = M || R || Function("return this")(), T = W.Symbol, L = Object.prototype, B = L.hasOwnProperty, F = L.toString, g = T ? T.toStringTag : void 0;
function w(e) {
  var n = B.call(e, g), i = e[g];
  try {
    e[g] = void 0;
    var a = !0;
  } catch {
  }
  var f = F.call(e);
  return a && (n ? e[g] = i : delete e[g]), f;
}
var G = Object.prototype, U = G.toString;
function _(e) {
  return U.call(e);
}
var D = "[object Null]", H = "[object Undefined]", E = T ? T.toStringTag : void 0;
function X(e) {
  return e == null ? e === void 0 ? H : D : E && E in Object(e) ? w(e) : _(e);
}
function q(e) {
  return e != null && typeof e == "object";
}
var z = "[object Symbol]";
function J(e) {
  return typeof e == "symbol" || q(e) && X(e) == z;
}
var K = /\s/;
function Q(e) {
  for (var n = e.length; n-- && K.test(e.charAt(n)); )
    ;
  return n;
}
var V = /^\s+/;
function Y(e) {
  return e && e.slice(0, Q(e) + 1).replace(V, "");
}
function O(e) {
  var n = typeof e;
  return e != null && (n == "object" || n == "function");
}
var k = NaN, Z = /^[-+]0x[0-9a-f]+$/i, ee = /^0b[01]+$/i, ne = /^0o[0-7]+$/i, te = parseInt;
function $(e) {
  if (typeof e == "number")
    return e;
  if (J(e))
    return k;
  if (O(e)) {
    var n = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = O(n) ? n + "" : n;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Y(e);
  var i = ee.test(e);
  return i || ne.test(e) ? te(e.slice(2), i ? 2 : 8) : Z.test(e) ? k : +e;
}
var S = function() {
  return W.Date.now();
}, re = "Expected a function", ie = Math.max, ae = Math.min;
function oe(e, n, i) {
  var a, f, s, u, r, c, d = 0, v = !1, l = !1, y = !0;
  if (typeof e != "function")
    throw new TypeError(re);
  n = $(n) || 0, O(i) && (v = !!i.leading, l = "maxWait" in i, s = l ? ie($(i.maxWait) || 0, n) : s, y = "trailing" in i ? !!i.trailing : y);
  function j(t) {
    var o = a, b = f;
    return a = f = void 0, d = t, u = e.apply(b, o), u;
  }
  function N(t) {
    return d = t, r = setTimeout(m, n), v ? j(t) : u;
  }
  function P(t) {
    var o = t - c, b = t - d, I = n - o;
    return l ? ae(I, s - b) : I;
  }
  function h(t) {
    var o = t - c, b = t - d;
    return c === void 0 || o >= n || o < 0 || l && b >= s;
  }
  function m() {
    var t = S();
    if (h(t))
      return x(t);
    r = setTimeout(m, P(t));
  }
  function x(t) {
    return r = void 0, y && a ? j(t) : (a = f = void 0, u);
  }
  function A() {
    r !== void 0 && clearTimeout(r), d = 0, a = c = f = r = void 0;
  }
  function C() {
    return r === void 0 ? u : x(S());
  }
  function p() {
    var t = S(), o = h(t);
    if (a = arguments, f = this, c = t, o) {
      if (r === void 0)
        return N(c);
      if (l)
        return clearTimeout(r), r = setTimeout(m, n), j(c);
    }
    return r === void 0 && (r = setTimeout(m, n)), u;
  }
  return p.cancel = A, p.flush = C, p;
}
export {
  T as S,
  J as a,
  X as b,
  q as c,
  oe as d,
  M as f,
  O as i,
  W as r
};
