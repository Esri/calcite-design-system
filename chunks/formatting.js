/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
function s(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(l) {
      return Object.getOwnPropertyDescriptor(e, l).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function m(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? s(Object(r), !0).forEach(function(n) {
      g(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function g(e, t, r) {
  return t = b(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function b(e) {
  var t = d(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function d(e, t) {
  if (typeof e != "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
const h = y({});
function y(e) {
  return t.withOptions = (r) => y(m(m({}, e), r)), t;
  function t(r, ...n) {
    const l = typeof r == "string" ? [r] : r.raw, {
      escapeSpecialCharacters: a = Array.isArray(r),
      trimWhitespace: O = !0
    } = e;
    let o = "";
    for (let c = 0; c < l.length; c++) {
      let i = l[c];
      a && (i = i.replace(/\\\n[ \t]*/g, "").replace(/\\`/g, "`").replace(/\\\$/g, "$").replace(/\\\{/g, "{")), o += i, c < n.length && (o += n[c]);
    }
    const u = o.split(`
`);
    let f = null;
    for (const c of u) {
      const i = c.match(/^(\s+)\S+/);
      if (i) {
        const p = i[1].length;
        f ? f = Math.min(f, p) : f = p;
      }
    }
    if (f !== null) {
      const c = f;
      o = u.map((i) => i[0] === " " || i[0] === "	" ? i.slice(c) : i).join(`
`);
    }
    return O && (o = o.trim()), a && (o = o.replace(/\\n/g, `
`)), o;
  }
}
function P(e, ...t) {
  return h(e, ...t);
}
export {
  P as h
};
