import { i as O, e as w } from "./escapeRegExp.js";
import { i as x, b as g, c as l, r as P, f as B } from "./debounce.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
function $(r) {
  return r;
}
var M = "[object AsyncFunction]", U = "[object Function]", G = "[object GeneratorFunction]", L = "[object Proxy]";
function R(r) {
  if (!x(r))
    return !1;
  var e = g(r);
  return e == U || e == G || e == M || e == L;
}
var S = 9007199254740991, N = /^(?:0|[1-9]\d*)$/;
function _(r, e) {
  var n = typeof r;
  return e = e ?? S, !!e && (n == "number" || n != "symbol" && N.test(r)) && r > -1 && r % 1 == 0 && r < e;
}
var C = 9007199254740991;
function h(r) {
  return typeof r == "number" && r > -1 && r % 1 == 0 && r <= C;
}
function D(r) {
  return r != null && h(r.length) && !R(r);
}
var K = Object.prototype;
function V(r) {
  var e = r && r.constructor, n = typeof e == "function" && e.prototype || K;
  return r === n;
}
function q(r, e) {
  for (var n = -1, o = Array(r); ++n < r; )
    o[n] = e(n);
  return o;
}
var X = "[object Arguments]";
function d(r) {
  return l(r) && g(r) == X;
}
var I = Object.prototype, W = I.hasOwnProperty, z = I.propertyIsEnumerable, H = d(/* @__PURE__ */ function() {
  return arguments;
}()) ? d : function(r) {
  return l(r) && W.call(r, "callee") && !z.call(r, "callee");
};
function J() {
  return !1;
}
var v = typeof exports == "object" && exports && !exports.nodeType && exports, T = v && typeof module == "object" && module && !module.nodeType && module, Q = T && T.exports === v, j = Q ? P.Buffer : void 0, Y = j ? j.isBuffer : void 0, Z = Y || J, k = "[object Arguments]", rr = "[object Array]", er = "[object Boolean]", tr = "[object Date]", nr = "[object Error]", or = "[object Function]", ar = "[object Map]", ir = "[object Number]", sr = "[object Object]", ur = "[object RegExp]", fr = "[object Set]", cr = "[object String]", pr = "[object WeakMap]", br = "[object ArrayBuffer]", yr = "[object DataView]", gr = "[object Float32Array]", lr = "[object Float64Array]", dr = "[object Int8Array]", Tr = "[object Int16Array]", jr = "[object Int32Array]", mr = "[object Uint8Array]", Ar = "[object Uint8ClampedArray]", xr = "[object Uint16Array]", hr = "[object Uint32Array]", t = {};
t[gr] = t[lr] = t[dr] = t[Tr] = t[jr] = t[mr] = t[Ar] = t[xr] = t[hr] = !0;
t[k] = t[rr] = t[br] = t[er] = t[yr] = t[tr] = t[nr] = t[or] = t[ar] = t[ir] = t[sr] = t[ur] = t[fr] = t[cr] = t[pr] = !1;
function Ir(r) {
  return l(r) && h(r.length) && !!t[g(r)];
}
function vr(r) {
  return function(e) {
    return r(e);
  };
}
var E = typeof exports == "object" && exports && !exports.nodeType && exports, b = E && typeof module == "object" && module && !module.nodeType && module, Er = b && b.exports === E, y = Er && B.process, m = function() {
  try {
    var r = b && b.require && b.require("util").types;
    return r || y && y.binding && y.binding("util");
  } catch {
  }
}(), A = m && m.isTypedArray, Fr = A ? vr(A) : Ir;
function Or(r, e) {
  var n = O(r), o = !n && H(r), f = !n && !o && Z(r), s = !n && !o && !f && Fr(r), i = n || o || f || s, u = i ? q(r.length, String) : [], c = u.length;
  for (var a in r)
    i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (a == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    f && (a == "offset" || a == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (a == "buffer" || a == "byteLength" || a == "byteOffset") || // Skip index properties.
    _(a, c)) || u.push(a);
  return u;
}
function wr(r) {
  var e = [];
  if (r != null)
    for (var n in Object(r))
      e.push(n);
  return e;
}
var Pr = Object.prototype, Br = Pr.hasOwnProperty;
function $r(r) {
  if (!x(r))
    return wr(r);
  var e = V(r), n = [];
  for (var o in r)
    o == "constructor" && (e || !Br.call(r, o)) || n.push(o);
  return n;
}
function Mr(r) {
  return D(r) ? Or(r) : $r(r);
}
function Ur(r) {
  return function(e, n, o) {
    for (var f = -1, s = Object(e), i = o(e), u = i.length; u--; ) {
      var c = i[++f];
      if (n(s[c], c, s) === !1)
        break;
    }
    return e;
  };
}
var Gr = Ur();
function Lr(r) {
  return typeof r == "function" ? r : $;
}
function Rr(r, e) {
  return r == null ? r : Gr(r, Lr(e), Mr);
}
const _r = (r, e, n) => {
  const o = w(e), f = new RegExp(o, "i");
  r.length === 0 && console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
  const s = (i, u, c) => {
    if (i?.constant || i?.filterDisabled)
      return !0;
    let a = !1;
    return Rr(i, (p, F) => {
      typeof p == "function" || p == null || c && !c.includes(F) || (Array.isArray(p) || typeof p == "object" && p !== null ? s(p, u) && (a = !0) : u.test(p) && (a = !0));
    }), a;
  };
  return r.filter((i) => s(i, f, n));
};
export {
  _r as f
};
