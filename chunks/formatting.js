/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
function g(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    r && (i = i.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), t.push.apply(t, i);
  }
  return t;
}
function d(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? g(Object(t), !0).forEach(function(i) {
      b(e, i, t[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : g(Object(t)).forEach(function(i) {
      Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(t, i));
    });
  }
  return e;
}
function b(e, r, t) {
  return r = P(r), r in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function P(e) {
  var r = w(e, "string");
  return typeof r == "symbol" ? r : String(r);
}
function w(e, r) {
  if (typeof e != "object" || e === null) return e;
  var t = e[Symbol.toPrimitive];
  if (t !== void 0) {
    var i = t.call(e, r);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(e);
}
const v = m({});
function m(e) {
  return r.withOptions = (t) => m(d(d({}, e), t)), r;
  function r(t, ...i) {
    const a = typeof t == "string" ? [t] : t.raw, {
      alignValues: y = !1,
      escapeSpecialCharacters: u = Array.isArray(t),
      trimWhitespace: O = !0
    } = e;
    let c = "";
    for (let o = 0; o < a.length; o++) {
      let n = a[o];
      if (u && (n = n.replace(/\\\n[ \t]*/g, "").replace(/\\`/g, "`").replace(/\\\$/g, "$").replace(/\\\{/g, "{")), c += n, o < i.length) {
        const l = y ? S(i[o], c) : i[o];
        c += l;
      }
    }
    const s = c.split(`
`);
    let f = null;
    for (const o of s) {
      const n = o.match(/^(\s+)\S+/);
      if (n) {
        const l = n[1].length;
        f ? f = Math.min(f, l) : f = l;
      }
    }
    if (f !== null) {
      const o = f;
      c = s.map((n) => n[0] === " " || n[0] === "	" ? n.slice(o) : n).join(`
`);
    }
    return O && (c = c.trim()), u && (c = c.replace(/\\n/g, `
`).replace(/\\t/g, "	").replace(/\\r/g, "\r").replace(/\\v/g, "\v").replace(/\\b/g, "\b").replace(/\\f/g, "\f").replace(/\\0/g, "\0").replace(/\\x([\da-fA-F]{2})/g, (o, n) => String.fromCharCode(parseInt(n, 16))).replace(/\\u\{([\da-fA-F]{1,6})\}/g, (o, n) => String.fromCodePoint(parseInt(n, 16))).replace(/\\u([\da-fA-F]{4})/g, (o, n) => String.fromCharCode(parseInt(n, 16)))), typeof Bun < "u" && (c = c.replace(
      // Matches e.g. \\u{1f60a} or \\u5F1F
      /\\u(?:\{([\da-fA-F]{1,6})\}|([\da-fA-F]{4}))/g,
      (o, n, l) => {
        var p;
        const h = (p = n ?? l) !== null && p !== void 0 ? p : "";
        return String.fromCodePoint(parseInt(h, 16));
      }
    )), c;
  }
}
function S(e, r) {
  if (typeof e != "string" || !e.includes(`
`))
    return e;
  const i = r.slice(r.lastIndexOf(`
`) + 1).match(/^(\s+)/);
  if (i) {
    const a = i[1];
    return e.replace(/\n/g, `
${a}`);
  }
  return e;
}
function j(e, ...r) {
  return v(e, ...r);
}
export {
  j as h
};
