/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
const A = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || /* @__PURE__ */ (function() {
  return this;
})();
function h() {
}
function T(e) {
  return typeof A.Buffer < "u" && A.Buffer.isBuffer(e);
}
function O(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function d(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const w = "[object RegExp]", S = "[object String]", U = "[object Number]", B = "[object Boolean]", v = "[object Symbol]", I = "[object Date]", N = "[object Map]", P = "[object Set]", x = "[object Array]", z = "[object Function]", L = "[object ArrayBuffer]", p = "[object Object]", F = "[object Error]", K = "[object DataView]", C = "[object Uint8Array]", D = "[object Uint8ClampedArray]", M = "[object Uint16Array]", W = "[object Uint32Array]", R = "[object BigUint64Array]", Z = "[object Int8Array]", _ = "[object Int16Array]", E = "[object Int32Array]", G = "[object BigInt64Array]", H = "[object Float32Array]", J = "[object Float64Array]";
function m(e) {
  if (!e || typeof e != "object") return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype || Object.getPrototypeOf(t) === null ? Object.prototype.toString.call(e) === "[object Object]" : !1;
}
function Q(e, t) {
  return e === t || Number.isNaN(e) && Number.isNaN(t);
}
function X(e, t, r) {
  return l(e, t, void 0, void 0, void 0, void 0, r);
}
function l(e, t, r, o, c, s, f) {
  const y = f(e, t, r, o, c, s);
  if (y !== void 0) return y;
  if (typeof e == typeof t) switch (typeof e) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return e === t;
    case "number":
      return e === t || Object.is(e, t);
    case "function":
      return e === t;
    case "object":
      return g(e, t, s, f);
  }
  return g(e, t, s, f);
}
function g(e, t, r, o) {
  if (Object.is(e, t)) return !0;
  let c = d(e), s = d(t);
  if (c === "[object Arguments]" && (c = p), s === "[object Arguments]" && (s = p), c !== s) return !1;
  switch (c) {
    case S:
      return e.toString() === t.toString();
    case U:
      return Q(e.valueOf(), t.valueOf());
    case B:
    case I:
    case v:
      return Object.is(e.valueOf(), t.valueOf());
    case w:
      return e.source === t.source && e.flags === t.flags;
    case z:
      return e === t;
  }
  r = r ?? /* @__PURE__ */ new Map();
  const f = r.get(e), y = r.get(t);
  if (f != null && y != null) return f === t;
  r.set(e, t), r.set(t, e);
  try {
    switch (c) {
      case N:
        if (e.size !== t.size) return !1;
        for (const [n, u] of e.entries()) if (!t.has(n) || !l(u, t.get(n), n, e, t, r, o)) return !1;
        return !0;
      case P: {
        if (e.size !== t.size) return !1;
        const n = Array.from(e.values()), u = Array.from(t.values());
        for (let i = 0; i < n.length; i++) {
          const a = n[i], j = u.findIndex((b) => l(a, b, void 0, e, t, r, o));
          if (j === -1) return !1;
          u.splice(j, 1);
        }
        return !0;
      }
      case x:
      case C:
      case D:
      case M:
      case W:
      case R:
      case Z:
      case _:
      case E:
      case G:
      case H:
      case J:
        if (T(e) !== T(t) || e.length !== t.length) return !1;
        for (let n = 0; n < e.length; n++) if (!l(e[n], t[n], n, e, t, r, o)) return !1;
        return !0;
      case L:
        return e.byteLength !== t.byteLength ? !1 : g(new Uint8Array(e), new Uint8Array(t), r, o);
      case K:
        return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : g(new Uint8Array(e), new Uint8Array(t), r, o);
      case F:
        return e.name === t.name && e.message === t.message;
      case p: {
        if (!(g(e.constructor, t.constructor, r, o) || m(e) && m(t))) return !1;
        const n = [...Object.keys(e), ...O(e)], u = [...Object.keys(t), ...O(t)];
        if (n.length !== u.length) return !1;
        for (let i = 0; i < n.length; i++) {
          const a = n[i], j = e[a];
          if (!Object.hasOwn(t, a)) return !1;
          const b = t[a];
          if (!l(j, b, a, e, t, r, o)) return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    r.delete(e), r.delete(t);
  }
}
function Y(e, t) {
  return X(e, t, h);
}
export {
  Y as i
};
