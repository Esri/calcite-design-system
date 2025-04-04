import { c as be, L as Fe, h as A, j as Ye, E as N, x as ne, s as Oe, d as Pe } from "./iframe.js";
import { n as J } from "./ref.js";
import { c as Ce, d as He, s as Ee, H as _e } from "./form.js";
import { u as Ae, I as xe } from "./interactive.js";
import { n as ze } from "./key.js";
import { c as Ve, d as Ue, g as Ne } from "./label.js";
import { c as We, g as Be } from "./component.js";
import { n as q, l as G, g as se } from "./locale.js";
import { i as K, t as oe, d as Q, j as je, k as Ze, n as le, f as X, o as Re, e as Je, q as qe } from "./time.js";
import { d as W } from "./math.js";
import { V as Ge } from "./Validation.js";
import { f as Ke } from "./dom.js";
import { s as Qe } from "./input.js";
import { u as Xe } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
var pe = 60, ve = pe * 60, ge = ve * 24, et = ge * 7, E = 1e3, ee = pe * E, ce = ve * E, tt = ge * E, it = et * E, re = "millisecond", O = "second", P = "minute", C = "hour", w = "day", B = "week", I = "month", Se = "quarter", b = "year", H = "date", $e = "YYYY-MM-DDTHH:mm:ssZ", ue = "Invalid Date", rt = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, at = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const Me = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  ordinal: function(e) {
    var t = ["th", "st", "nd", "rd"], i = e % 100;
    return "[" + e + (t[(i - 20) % 10] || t[i] || t[0]) + "]";
  }
}, nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" }));
var ie = function(e, t, i) {
  var r = String(e);
  return !r || r.length >= t ? e : "" + Array(t + 1 - r.length).join(i) + e;
}, st = function(e) {
  var t = -e.utcOffset(), i = Math.abs(t), r = Math.floor(i / 60), a = i % 60;
  return (t <= 0 ? "+" : "-") + ie(r, 2, "0") + ":" + ie(a, 2, "0");
}, ot = function s(e, t) {
  if (e.date() < t.date()) return -s(t, e);
  var i = (t.year() - e.year()) * 12 + (t.month() - e.month()), r = e.clone().add(i, I), a = t - r < 0, n = e.clone().add(i + (a ? -1 : 1), I);
  return +(-(i + (t - r) / (a ? r - n : n - r)) || 0);
}, lt = function(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}, ct = function(e) {
  var t = {
    M: I,
    y: b,
    w: B,
    d: w,
    D: H,
    h: C,
    m: P,
    s: O,
    ms: re,
    Q: Se
  };
  return t[e] || String(e || "").toLowerCase().replace(/s$/, "");
}, ut = function(e) {
  return e === void 0;
};
const ht = {
  s: ie,
  z: st,
  m: ot,
  a: lt,
  p: ct,
  u: ut
};
var V = "en", Y = {};
Y[V] = Me;
var ye = "$isDayjsObject", ae = function(e) {
  return e instanceof Z || !!(e && e[ye]);
}, j = function s(e, t, i) {
  var r;
  if (!e) return V;
  if (typeof e == "string") {
    var a = e.toLowerCase();
    Y[a] && (r = a), t && (Y[a] = t, r = a);
    var n = e.split("-");
    if (!r && n.length > 1)
      return s(n[0]);
  } else {
    var l = e.name;
    Y[l] = e, r = l;
  }
  return !i && r && (V = r), r || !i && V;
}, f = function(e, t) {
  if (ae(e))
    return e.clone();
  var i = typeof t == "object" ? t : {};
  return i.date = e, i.args = arguments, new Z(i);
}, dt = function(e, t) {
  return f(e, {
    locale: t.$L,
    utc: t.$u,
    x: t.$x,
    $offset: t.$offset
    // todo: refactor; do not use this.$offset in you code
  });
}, m = ht;
m.l = j;
m.i = ae;
m.w = dt;
var mt = function(e) {
  var t = e.date, i = e.utc;
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  if (m.u(t)) return /* @__PURE__ */ new Date();
  if (t instanceof Date) return new Date(t);
  if (typeof t == "string" && !/Z$/i.test(t)) {
    var r = t.match(rt);
    if (r) {
      var a = r[2] - 1 || 0, n = (r[7] || "0").substring(0, 3);
      return i ? new Date(Date.UTC(r[1], a, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, n)) : new Date(r[1], a, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, n);
    }
  }
  return new Date(t);
}, Z = /* @__PURE__ */ function() {
  function s(t) {
    this.$L = j(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[ye] = !0;
  }
  var e = s.prototype;
  return e.parse = function(i) {
    this.$d = mt(i), this.init();
  }, e.init = function() {
    var i = this.$d;
    this.$y = i.getFullYear(), this.$M = i.getMonth(), this.$D = i.getDate(), this.$W = i.getDay(), this.$H = i.getHours(), this.$m = i.getMinutes(), this.$s = i.getSeconds(), this.$ms = i.getMilliseconds();
  }, e.$utils = function() {
    return m;
  }, e.isValid = function() {
    return this.$d.toString() !== ue;
  }, e.isSame = function(i, r) {
    var a = f(i);
    return this.startOf(r) <= a && a <= this.endOf(r);
  }, e.isAfter = function(i, r) {
    return f(i) < this.startOf(r);
  }, e.isBefore = function(i, r) {
    return this.endOf(r) < f(i);
  }, e.$g = function(i, r, a) {
    return m.u(i) ? this[r] : this.set(a, i);
  }, e.unix = function() {
    return Math.floor(this.valueOf() / 1e3);
  }, e.valueOf = function() {
    return this.$d.getTime();
  }, e.startOf = function(i, r) {
    var a = this, n = m.u(r) ? !0 : r, l = m.p(i), o = function(D, S) {
      var v = m.w(a.$u ? Date.UTC(a.$y, S, D) : new Date(a.$y, S, D), a);
      return n ? v : v.endOf(w);
    }, u = function(D, S) {
      var v = [0, 0, 0, 0], L = [23, 59, 59, 999];
      return m.w(a.toDate()[D].apply(
        // eslint-disable-line prefer-spread
        a.toDate("s"),
        (n ? v : L).slice(S)
      ), a);
    }, c = this.$W, d = this.$M, h = this.$D, p = "set" + (this.$u ? "UTC" : "");
    switch (l) {
      case b:
        return n ? o(1, 0) : o(31, 11);
      case I:
        return n ? o(1, d) : o(0, d + 1);
      case B: {
        var $ = this.$locale().weekStart || 0, g = (c < $ ? c + 7 : c) - $;
        return o(n ? h - g : h + (6 - g), d);
      }
      case w:
      case H:
        return u(p + "Hours", 0);
      case C:
        return u(p + "Minutes", 1);
      case P:
        return u(p + "Seconds", 2);
      case O:
        return u(p + "Milliseconds", 3);
      default:
        return this.clone();
    }
  }, e.endOf = function(i) {
    return this.startOf(i, !1);
  }, e.$set = function(i, r) {
    var a, n = m.p(i), l = "set" + (this.$u ? "UTC" : ""), o = (a = {}, a[w] = l + "Date", a[H] = l + "Date", a[I] = l + "Month", a[b] = l + "FullYear", a[C] = l + "Hours", a[P] = l + "Minutes", a[O] = l + "Seconds", a[re] = l + "Milliseconds", a)[n], u = n === w ? this.$D + (r - this.$W) : r;
    if (n === I || n === b) {
      var c = this.clone().set(H, 1);
      c.$d[o](u), c.init(), this.$d = c.set(H, Math.min(this.$D, c.daysInMonth())).$d;
    } else o && this.$d[o](u);
    return this.init(), this;
  }, e.set = function(i, r) {
    return this.clone().$set(i, r);
  }, e.get = function(i) {
    return this[m.p(i)]();
  }, e.add = function(i, r) {
    var a = this, n;
    i = Number(i);
    var l = m.p(r), o = function(h) {
      var p = f(a);
      return m.w(p.date(p.date() + Math.round(h * i)), a);
    };
    if (l === I)
      return this.set(I, this.$M + i);
    if (l === b)
      return this.set(b, this.$y + i);
    if (l === w)
      return o(1);
    if (l === B)
      return o(7);
    var u = (n = {}, n[P] = ee, n[C] = ce, n[O] = E, n)[l] || 1, c = this.$d.getTime() + i * u;
    return m.w(c, this);
  }, e.subtract = function(i, r) {
    return this.add(i * -1, r);
  }, e.format = function(i) {
    var r = this, a = this.$locale();
    if (!this.isValid()) return a.invalidDate || ue;
    var n = i || $e, l = m.z(this), o = this.$H, u = this.$m, c = this.$M, d = a.weekdays, h = a.months, p = a.meridiem, $ = function(v, L, k, _) {
      return v && (v[L] || v(r, n)) || k[L].slice(0, _);
    }, g = function(v) {
      return m.s(o % 12 || 12, v, "0");
    }, M = p || function(S, v, L) {
      var k = S < 12 ? "AM" : "PM";
      return L ? k.toLowerCase() : k;
    }, D = function(v) {
      switch (v) {
        case "YY":
          return String(r.$y).slice(-2);
        case "YYYY":
          return m.s(r.$y, 4, "0");
        case "M":
          return c + 1;
        case "MM":
          return m.s(c + 1, 2, "0");
        case "MMM":
          return $(a.monthsShort, c, h, 3);
        case "MMMM":
          return $(h, c);
        case "D":
          return r.$D;
        case "DD":
          return m.s(r.$D, 2, "0");
        case "d":
          return String(r.$W);
        case "dd":
          return $(a.weekdaysMin, r.$W, d, 2);
        case "ddd":
          return $(a.weekdaysShort, r.$W, d, 3);
        case "dddd":
          return d[r.$W];
        case "H":
          return String(o);
        case "HH":
          return m.s(o, 2, "0");
        case "h":
          return g(1);
        case "hh":
          return g(2);
        case "a":
          return M(o, u, !0);
        case "A":
          return M(o, u, !1);
        case "m":
          return String(u);
        case "mm":
          return m.s(u, 2, "0");
        case "s":
          return String(r.$s);
        case "ss":
          return m.s(r.$s, 2, "0");
        case "SSS":
          return m.s(r.$ms, 3, "0");
        case "Z":
          return l;
      }
      return null;
    };
    return n.replace(at, function(S, v) {
      return v || D(S) || l.replace(":", "");
    });
  }, e.utcOffset = function() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }, e.diff = function(i, r, a) {
    var n = this, l = m.p(r), o = f(i), u = (o.utcOffset() - this.utcOffset()) * ee, c = this - o, d = function() {
      return m.m(n, o);
    }, h;
    switch (l) {
      case b:
        h = d() / 12;
        break;
      case I:
        h = d();
        break;
      case Se:
        h = d() / 3;
        break;
      case B:
        h = (c - u) / it;
        break;
      case w:
        h = (c - u) / tt;
        break;
      case C:
        h = c / ce;
        break;
      case P:
        h = c / ee;
        break;
      case O:
        h = c / E;
        break;
      default:
        h = c;
        break;
    }
    return a ? h : m.a(h);
  }, e.daysInMonth = function() {
    return this.endOf(I).$D;
  }, e.$locale = function() {
    return Y[this.$L];
  }, e.locale = function(i, r) {
    if (!i) return this.$L;
    var a = this.clone(), n = j(i, r, !0);
    return n && (a.$L = n), a;
  }, e.clone = function() {
    return m.w(this.$d, this);
  }, e.toDate = function() {
    return new Date(this.valueOf());
  }, e.toJSON = function() {
    return this.isValid() ? this.toISOString() : null;
  }, e.toISOString = function() {
    return this.$d.toISOString();
  }, e.toString = function() {
    return this.$d.toUTCString();
  }, s;
}(), De = Z.prototype;
f.prototype = De;
[["$ms", re], ["$s", O], ["$m", P], ["$H", C], ["$W", w], ["$M", I], ["$y", b], ["$D", H]].forEach(function(s) {
  De[s[1]] = function(e) {
    return this.$g(e, s[0], s[1]);
  };
});
f.extend = function(s, e) {
  return s.$i || (s(e, Z, f), s.$i = !0), f;
};
f.locale = j;
f.isDayjs = ae;
f.unix = function(s) {
  return f(s * 1e3);
};
f.en = Y[V];
f.Ls = Y;
f.p = {};
var Le = function(e) {
  return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(t, i, r) {
    return i || r.slice(1);
  });
}, Te = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
}, Ie = function(e, t) {
  return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(i, r, a) {
    var n = a && a.toUpperCase();
    return r || t[a] || Te[a] || Le(t[n]);
  });
}, ft = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, he = /\d/, x = /\d\d/, pt = /\d{3}/, vt = /\d{4}/, T = /\d\d?/, gt = /[+-]?\d+/, St = /[+-]\d\d:?(\d\d)?|Z/, z = /\d*[^-_:/,()\s\d]+/, F = {}, ke = function(e) {
  return e = +e, e + (e > 68 ? 1900 : 2e3);
};
function $t(s) {
  if (!s || s === "Z") return 0;
  var e = s.match(/([+-]|\d\d)/g), t = +(e[1] * 60) + (+e[2] || 0);
  return t === 0 ? 0 : e[0] === "+" ? -t : t;
}
var y = function(e) {
  return function(t) {
    this[e] = +t;
  };
}, de = [St, function(s) {
  var e = this.zone || (this.zone = {});
  e.offset = $t(s);
}], te = function(e) {
  var t = F[e];
  return t && (t.indexOf ? t : t.s.concat(t.f));
}, me = function(e, t) {
  var i, r = F, a = r.meridiem;
  if (!a)
    i = e === (t ? "pm" : "PM");
  else
    for (var n = 1; n <= 24; n += 1)
      if (e.indexOf(a(n, 0, t)) > -1) {
        i = n > 12;
        break;
      }
  return i;
}, Mt = {
  A: [z, function(s) {
    this.afternoon = me(s, !1);
  }],
  a: [z, function(s) {
    this.afternoon = me(s, !0);
  }],
  Q: [he, function(s) {
    this.month = (s - 1) * 3 + 1;
  }],
  S: [he, function(s) {
    this.milliseconds = +s * 100;
  }],
  SS: [x, function(s) {
    this.milliseconds = +s * 10;
  }],
  SSS: [pt, function(s) {
    this.milliseconds = +s;
  }],
  s: [T, y("seconds")],
  ss: [T, y("seconds")],
  m: [T, y("minutes")],
  mm: [T, y("minutes")],
  H: [T, y("hours")],
  h: [T, y("hours")],
  HH: [T, y("hours")],
  hh: [T, y("hours")],
  D: [T, y("day")],
  DD: [x, y("day")],
  Do: [z, function(s) {
    var e = F, t = e.ordinal, i = s.match(/\d+/);
    if (this.day = i[0], !!t)
      for (var r = 1; r <= 31; r += 1)
        t(r).replace(/\[|\]/g, "") === s && (this.day = r);
  }],
  w: [T, y("week")],
  ww: [x, y("week")],
  M: [T, y("month")],
  MM: [x, y("month")],
  MMM: [z, function(s) {
    var e = te("months"), t = te("monthsShort"), i = (t || e.map(function(r) {
      return r.slice(0, 3);
    })).indexOf(s) + 1;
    if (i < 1)
      throw new Error();
    this.month = i % 12 || i;
  }],
  MMMM: [z, function(s) {
    var e = te("months"), t = e.indexOf(s) + 1;
    if (t < 1)
      throw new Error();
    this.month = t % 12 || t;
  }],
  Y: [gt, y("year")],
  YY: [x, function(s) {
    this.year = ke(s);
  }],
  YYYY: [vt, y("year")],
  Z: de,
  ZZ: de
};
function yt(s) {
  var e = s.afternoon;
  if (e !== void 0) {
    var t = s.hours;
    e ? t < 12 && (s.hours += 12) : t === 12 && (s.hours = 0), delete s.afternoon;
  }
}
function Dt(s) {
  s = Ie(s, F && F.formats);
  for (var e = s.match(ft), t = e.length, i = 0; i < t; i += 1) {
    var r = e[i], a = Mt[r], n = a && a[0], l = a && a[1];
    l ? e[i] = {
      regex: n,
      parser: l
    } : e[i] = r.replace(/^\[|\]$/g, "");
  }
  return function(o) {
    for (var u = {}, c = 0, d = 0; c < t; c += 1) {
      var h = e[c];
      if (typeof h == "string")
        d += h.length;
      else {
        var p = h.regex, $ = h.parser, g = o.slice(d), M = p.exec(g), D = M[0];
        $.call(u, D), o = o.replace(D, "");
      }
    }
    return yt(u), u;
  };
}
var Lt = function(e, t, i, r) {
  try {
    if (["x", "X"].indexOf(t) > -1) return new Date((t === "X" ? 1e3 : 1) * e);
    var a = Dt(t), n = a(e), l = n.year, o = n.month, u = n.day, c = n.hours, d = n.minutes, h = n.seconds, p = n.milliseconds, $ = n.zone, g = n.week, M = /* @__PURE__ */ new Date(), D = u || (!l && !o ? M.getDate() : 1), S = l || M.getFullYear(), v = 0;
    l && !o || (v = o > 0 ? o - 1 : M.getMonth());
    var L = c || 0, k = d || 0, _ = h || 0, R = p || 0;
    if ($)
      return new Date(Date.UTC(S, v, D, L, k, _, R + $.offset * 60 * 1e3));
    if (i)
      return new Date(Date.UTC(S, v, D, L, k, _, R));
    var U;
    return U = new Date(S, v, D, L, k, _, R), g && (U = r(U).week(g).toDate()), U;
  } catch {
    return /* @__PURE__ */ new Date("");
  }
};
const Tt = function(s, e, t) {
  t.p.customParseFormat = !0, s && s.parseTwoDigitYear && (ke = s.parseTwoDigitYear);
  var i = e.prototype, r = i.parse;
  i.parse = function(a) {
    var n = a.date, l = a.utc, o = a.args;
    this.$u = l;
    var u = o[1];
    if (typeof u == "string") {
      var c = o[2] === !0, d = o[3] === !0, h = c || d, p = o[2];
      d && (p = o[2]), F = this.$locale(), !c && p && (F = t.Ls[p]), this.$d = Lt(n, u, l, t), this.init(), p && p !== !0 && (this.$L = this.locale(p).$L), h && n != this.format(u) && (this.$d = /* @__PURE__ */ new Date("")), F = {};
    } else if (u instanceof Array)
      for (var $ = u.length, g = 1; g <= $; g += 1) {
        o[1] = u[g - 1];
        var M = t.apply(this, o);
        if (M.isValid()) {
          this.$d = M.$d, this.$L = M.$L, this.init();
          break;
        }
        g === $ && (this.$d = /* @__PURE__ */ new Date(""));
      }
    else
      r.call(this, a);
  };
}, It = function(s, e, t) {
  var i = e.prototype, r = function(c) {
    return c && (c.indexOf ? c : c.s);
  }, a = function(c, d, h, p, $) {
    var g = c.name ? c : c.$locale(), M = r(g[d]), D = r(g[h]), S = M || D.map(function(L) {
      return L.slice(0, p);
    });
    if (!$) return S;
    var v = g.weekStart;
    return S.map(function(L, k) {
      return S[(k + (v || 0)) % 7];
    });
  }, n = function() {
    return t.Ls[t.locale()];
  }, l = function(c, d) {
    return c.formats[d] || Le(c.formats[d.toUpperCase()]);
  }, o = function() {
    var c = this;
    return {
      months: function(h) {
        return h ? h.format("MMMM") : a(c, "months");
      },
      monthsShort: function(h) {
        return h ? h.format("MMM") : a(c, "monthsShort", "months", 3);
      },
      firstDayOfWeek: function() {
        return c.$locale().weekStart || 0;
      },
      weekdays: function(h) {
        return h ? h.format("dddd") : a(c, "weekdays");
      },
      weekdaysMin: function(h) {
        return h ? h.format("dd") : a(c, "weekdaysMin", "weekdays", 2);
      },
      weekdaysShort: function(h) {
        return h ? h.format("ddd") : a(c, "weekdaysShort", "weekdays", 3);
      },
      longDateFormat: function(h) {
        return l(c.$locale(), h);
      },
      meridiem: this.$locale().meridiem,
      ordinal: this.$locale().ordinal
    };
  };
  i.localeData = function() {
    return o.bind(this)();
  }, t.localeData = function() {
    var u = n();
    return {
      firstDayOfWeek: function() {
        return u.weekStart || 0;
      },
      weekdays: function() {
        return t.weekdays();
      },
      weekdaysShort: function() {
        return t.weekdaysShort();
      },
      weekdaysMin: function() {
        return t.weekdaysMin();
      },
      months: function() {
        return t.months();
      },
      monthsShort: function() {
        return t.monthsShort();
      },
      longDateFormat: function(d) {
        return l(u, d);
      },
      meridiem: u.meridiem,
      ordinal: u.ordinal
    };
  }, t.months = function() {
    return a(n(), "months");
  }, t.monthsShort = function() {
    return a(n(), "monthsShort", "months", 3);
  }, t.weekdays = function(u) {
    return a(n(), "weekdays", null, null, u);
  }, t.weekdaysShort = function(u) {
    return a(n(), "weekdaysShort", "weekdays", 3, u);
  }, t.weekdaysMin = function(u) {
    return a(n(), "weekdaysMin", "weekdays", 2, u);
  };
}, kt = function(s, e, t) {
  var i = e.prototype, r = i.format;
  t.en.formats = Te, i.format = function(a) {
    a === void 0 && (a = $e);
    var n = this.$locale(), l = n.formats, o = l === void 0 ? {} : l, u = Ie(a, o);
    return r.call(this, u);
  };
}, wt = function(s, e) {
  var t = e.prototype.parse;
  e.prototype.parse = function(a) {
    if (typeof a.date == "string") {
      var n = this.$locale();
      a.date = n && n.preparse ? n.preparse(a.date) : a.date;
    }
    return t.bind(this)(a);
  };
  var i = e.prototype.format;
  e.prototype.format = function() {
    for (var a = arguments.length, n = new Array(a), l = 0; l < a; l++)
      n[l] = arguments[l];
    var o = i.call.apply(i, [this].concat(n)), u = this.$locale();
    return u && u.postformat ? u.postformat(o) : o;
  };
  var r = e.prototype.fromToBase;
  r && (e.prototype.fromToBase = function(a, n, l, o) {
    var u = this.$locale() || l.$locale();
    return r.call(this, a, n, l, o, u && u.postformat);
  });
}, bt = function(s, e, t) {
  t.updateLocale = function(i, r) {
    var a = t.Ls, n = a[i];
    if (n) {
      var l = r ? Object.keys(r) : [];
      return l.forEach(function(o) {
        n[o] = r[o];
      }), n;
    }
  };
}, Ft = be`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block;-webkit-user-select:none;user-select:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([scale=s]){--calcite-toggle-spacing: .5rem;--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-toggle-spacing) + 1rem)}:host([scale=m]){--calcite-toggle-spacing: .75rem;--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-toggle-spacing) + 1.5rem)}:host([scale=l]){--calcite-toggle-spacing: 1rem;--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-toggle-spacing) + 2rem)}.input-wrapper{position:relative}.toggle-icon{position:absolute;display:flex;cursor:pointer;align-items:center;inset-inline-end:0;inset-block:0;padding-inline:var(--calcite-toggle-spacing);--calcite-icon-color: var(--calcite-color-text-3)}.input-wrapper:hover .toggle-icon,calcite-input-text:focus+.toggle-icon{--calcite-icon-color: var(--calcite-color-text-1)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`, Yt = {
  toggleIcon: "toggle-icon"
}, fe = {
  validationMessage: "inputTimePickerValidationMessage"
}, Ot = /* @__PURE__ */ new Map([
  ["ar", () => import("./ar.js")],
  ["bg", () => import("./bg.js")],
  ["bs", () => import("./bs.js")],
  ["ca", () => import("./ca.js")],
  ["cs", () => import("./cs.js")],
  ["da", () => import("./da.js")],
  ["de", () => import("./de.js")],
  ["de-at", () => import("./de-at.js")],
  ["de-ch", () => import("./de-ch.js")],
  ["el", () => import("./el.js")],
  ["en", () => Promise.resolve().then(() => nt)],
  ["en-au", () => import("./en-au.js")],
  ["en-ca", () => import("./en-ca.js")],
  ["en-gb", () => import("./en-gb.js")],
  ["es", () => import("./es.js")],
  ["es-mx", () => import("./es-mx.js")],
  ["et", () => import("./et.js")],
  ["fi", () => import("./fi.js")],
  ["fr", () => import("./fr.js")],
  ["fr-ch", () => import("./fr-ch.js")],
  ["he", () => import("./he.js")],
  ["hi", () => import("./hi.js")],
  ["hr", () => import("./hr.js")],
  ["hu", () => import("./hu.js")],
  ["id", () => import("./id.js")],
  ["it", () => import("./it.js")],
  ["it-ch", () => import("./it-ch.js")],
  ["ja", () => import("./ja.js")],
  ["ko", () => import("./ko.js")],
  ["lt", () => import("./lt.js")],
  ["lv", () => import("./lv.js")],
  ["mk", () => import("./mk.js")],
  ["nl", () => import("./nl.js")],
  ["nb", () => import("./nb.js")],
  ["pl", () => import("./pl.js")],
  ["pt", () => import("./pt.js")],
  ["pt-br", () => import("./pt-br.js")],
  ["ro", () => import("./ro.js")],
  ["ru", () => import("./ru.js")],
  ["sk", () => import("./sk.js")],
  ["sl", () => import("./sl.js")],
  ["sr", () => import("./sr.js")],
  ["sv", () => import("./sv.js")],
  ["th", () => import("./th.js")],
  ["tr", () => import("./tr.js")],
  ["uk", () => import("./uk.js")],
  ["vi", () => import("./vi.js")],
  ["zh-cn", () => import("./zh-cn.js")],
  ["zh-hk", () => import("./zh-hk.js")],
  ["zh-tw", () => import("./zh-tw.js")]
]);
f.extend(Tt);
f.extend(It);
f.extend(kt);
f.extend(wt);
f.extend(bt);
class we extends Fe {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.userChangedValue = !1, this._value = null, this.disabled = !1, this.focusTrapDisabled = !1, this.hourFormat = "user", this.messages = Xe(), this.open = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.step = 60, this.validity = {
      valid: !1,
      badInput: !1,
      customError: !1,
      patternMismatch: !1,
      rangeOverflow: !1,
      rangeUnderflow: !1,
      stepMismatch: !1,
      tooLong: !1,
      tooShort: !1,
      typeMismatch: !1,
      valueMissing: !1
    }, this.calciteInputTimePickerBeforeClose = A({ cancelable: !1 }), this.calciteInputTimePickerBeforeOpen = A({ cancelable: !1 }), this.calciteInputTimePickerChange = A(), this.calciteInputTimePickerClose = A({ cancelable: !1 }), this.calciteInputTimePickerOpen = A({ cancelable: !1 }), this.setLocalizedInputValue = (e) => {
      this.setInputValue(this.getLocalizedTimeString(e));
    }, this.listen("blur", this.hostBlurHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { calciteInputEl: 16, effectiveHourFormat: 16, disabled: 7, focusTrapDisabled: 7, form: 3, hourFormat: 3, max: 3, messageOverrides: 0, min: 3, name: 1, numberingSystem: 1, open: 7, overlayPositioning: 1, placement: 3, readOnly: 7, required: 7, scale: 3, status: 3, step: 9, validationIcon: [3, { converter: Ye }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = Ft;
  }
  /** The time value in ISO (24-hour) format. */
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.valueWatcher(e));
  }
  // #endregion
  // #region Public Methods
  /**
   * Updates the position of the component.
   *
   * @param delayed If true, delay the repositioning.
   */
  async reposition(e = !1) {
    this.popoverEl?.reposition(e);
  }
  /** Sets focus on the component. */
  async setFocus() {
    await We(this), Ke(this.el);
  }
  connectedCallback() {
    super.connectedCallback(), K(this.value) ? this.setValueDirectly(this.value) : this.value = void 0, Ve(this), Ce(this);
  }
  async load() {
    await this.loadLocaleData(), this.updateLocale();
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && (this.disabled || (this.open = !1)), e.has("hourFormat") && this.updateLocale(), e.has("readOnly") && (this.hasUpdated || this.readOnly !== !1) && (this.readOnly || (this.open = !1)), e.has("messages") && this.langWatcher(), e.has("numberingSystem") && this.setLocalizedInputValue({ numberingSystem: e.get("numberingSystem") }), e.has("step") && (this.hasUpdated || this.step !== 60) && this.stepWatcher(this.step, e.get("step"));
  }
  updated() {
    Ae(this);
  }
  loaded() {
    K(this.value) && this.setLocalizedInputValue();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Ue(this), He(this);
  }
  // #endregion
  // #region Private Methods
  async langWatcher() {
    await this.loadLocaleData(), this.updateLocale();
  }
  openHandler() {
    this.disabled || this.readOnly || this.popoverEl && (this.popoverEl.open = this.open);
  }
  stepWatcher(e, t) {
    (t >= 60 && e > 0 && e < 60 || e >= 60 && t > 0 && t < 60) && this.setValueDirectly(this.value);
  }
  valueWatcher(e) {
    this.userChangedValue || this.setValueDirectly(e), this.userChangedValue = !1;
  }
  hostBlurHandler() {
    const e = this.delocalizeTimeString(this.calciteInputEl.value);
    e ? e !== this.value && (this.setValue(e), this.setLocalizedInputValue()) : this.setValue(""), this.deactivate();
  }
  calciteInternalInputFocusHandler(e) {
    this.readOnly || e.stopPropagation();
  }
  calciteInternalInputInputHandler(e) {
    const { messages: { _lang: t }, numberingSystem: i } = this;
    if (i && i !== "latn") {
      const r = e.target;
      q.numberFormatOptions = {
        locale: t,
        numberingSystem: i,
        useGrouping: !1
      };
      const a = q.delocalize(r.value).split("").map((n) => ze.includes(n) ? q.numberFormatter.format(Number(n)) : n).join("");
      this.setInputValue(a);
    }
  }
  timePickerChangeHandler(e) {
    e.stopPropagation();
    const i = e.target.value, r = this.shouldIncludeSeconds();
    this.setValue(oe(i, r)), this.setLocalizedInputValue({ isoTimeString: i });
  }
  updateLocale(e = this.messages._lang) {
    this.effectiveHourFormat = this.hourFormat === "user" ? Q(this.messages._lang) : this.hourFormat, this.localeDefaultLTFormat = this.localeConfig.formats.LT, this.localeDefaultLTSFormat = this.localeConfig.formats.LTS, this.setLocalizedInputValue({ locale: e });
  }
  popoverBeforeOpenHandler(e) {
    e.stopPropagation(), this.calciteInputTimePickerBeforeOpen.emit();
  }
  popoverOpenHandler(e) {
    e.stopPropagation(), this.calciteInputTimePickerOpen.emit();
  }
  popoverBeforeCloseHandler(e) {
    e.stopPropagation(), this.calciteInputTimePickerBeforeClose.emit();
  }
  popoverCloseHandler(e) {
    e.stopPropagation(), this.calciteInputTimePickerClose.emit(), this.open = !1;
  }
  syncHiddenFormInput(e) {
    Qe("time", this, e);
  }
  delocalizeTimeString(e) {
    f.locale(this.getSupportedDayjsLocale(this.messages._lang.toLowerCase()));
    const t = this.delocalizeTimeStringToParts(e);
    let i;
    if (this.shouldIncludeFractionalSeconds()) {
      const r = W(this.step), a = this.delocalizeTimeStringToParts(e, "S");
      if (r === 1)
        i = a.millisecond !== 0 ? this.getTimeStringFromParts(a) : this.getTimeStringFromParts(t);
      else {
        const n = this.delocalizeTimeStringToParts(e, "SS");
        if (r === 2)
          n.millisecond !== 0 ? i = this.getTimeStringFromParts(n) : a.millisecond !== 0 ? i = this.getTimeStringFromParts(a) : i = this.getTimeStringFromParts(t);
        else if (r >= 3) {
          const l = this.delocalizeTimeStringToParts(e, "SSS");
          l.millisecond !== 0 ? i = this.getTimeStringFromParts(l) : n.millisecond !== 0 ? i = this.getTimeStringFromParts(n) : a.millisecond !== 0 ? i = this.getTimeStringFromParts(a) : i = this.getTimeStringFromParts(t);
        }
      }
    } else
      i = this.getTimeStringFromParts(t);
    return i;
  }
  delocalizeTimeStringToParts(e, t) {
    const i = this.messages._lang;
    let r = e;
    const a = je(this.effectiveHourFormat, i) ? Ze(i) : Q(i);
    if (G.has(i) && a === "12") {
      const l = G.get(i).am, o = G.get(i).pm, u = le(i), c = u === u.toUpperCase() ? "AM" : "am", d = u === u.toUpperCase() ? "PM" : "pm";
      r = r.includes(o) ? r.replaceAll(o, d) : r.replaceAll(l, c);
    }
    this.setLocaleTimeFormat({
      fractionalSecondFormatToken: t,
      hourFormat: a
    });
    const n = f(r, ["LTS", "LT"]);
    return n.isValid() ? {
      hour: n.get("hour"),
      minute: n.get("minute"),
      second: n.get("second"),
      millisecond: n.get("millisecond")
    } : {
      hour: null,
      minute: null,
      second: null,
      millisecond: null
    };
  }
  getTimeStringFromParts(e) {
    let t = "";
    if (!e)
      return t;
    if (e.hour !== null && e.minute !== null && (t = `${X(e.hour)}:${X(e.minute)}`, this.shouldIncludeSeconds() && e.second !== null && (t += `:${X(e.second)}`, this.shouldIncludeFractionalSeconds() && e.millisecond !== null))) {
      const i = (e.millisecond * 1e-3).toFixed(W(this.step));
      t += `.${i.toString().replace("0.", "")}`;
    }
    return t;
  }
  keyDownHandler(e) {
    const { defaultPrevented: t, key: i } = e;
    if (!t)
      if (i === "Enter") {
        if (Ee(this) && (e.preventDefault(), this.calciteInputEl.setFocus()), e.composedPath().includes(this.calciteTimePickerEl))
          return;
        const r = this.delocalizeTimeString(this.calciteInputEl.value);
        K(r) ? (this.setValue(r), this.setLocalizedInputValue()) : this.setValue("");
      } else i === "ArrowDown" ? (this.open = !0, e.preventDefault()) : this.open && this.focusTrapDisabled && i === "Escape" && (this.open = !1, e.preventDefault());
  }
  getSupportedDayjsLocale(e) {
    const t = e.toLowerCase();
    return t === "no" ? "nb" : t === "pt-pt" ? "pt" : t;
  }
  async loadLocaleData() {
    let e = se(this.messages._lang).toLowerCase();
    e = this.getSupportedDayjsLocale(e);
    const { default: t } = await Ot.get(e)();
    this.localeConfig = t, f.locale(this.localeConfig, null, !0), f.updateLocale(e, this.getExtendedLocaleConfig(e));
  }
  getExtendedLocaleConfig(e) {
    if (e === "ar")
      return {
        meridiem: (t) => t > 12 ? "م" : "ص",
        formats: {
          LT: "h:mm a",
          LTS: "h:mm:ss a",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm a",
          LLLL: "dddd D MMMM YYYY h:mm a"
        }
      };
    if (e === "en-au")
      return {
        meridiem: (t) => t > 12 ? "pm" : "am"
      };
    if (e === "en-ca")
      return {
        meridiem: (t) => t > 12 ? "p.m." : "a.m."
      };
    if (e === "el")
      return {
        meridiem: (t) => t > 12 ? "μ.μ." : "π.μ."
      };
    if (e === "es-mx")
      return {
        formats: {
          LT: "h:mm a",
          LTS: "h:mm:ss a",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY H:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        }
      };
    if (e === "hi")
      return {
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, h:mm A",
          LLLL: "dddd, D MMMM YYYY, h:mm A"
        },
        meridiem: (t) => t > 12 ? "pm" : "am"
      };
    if (e === "ja")
      return {
        meridiem: (t) => t > 12 ? "午後" : "午前"
      };
    if (e === "ko")
      return {
        meridiem: (t) => t > 12 ? "오후" : "오전"
      };
    if (e === "no")
      return {
        meridiem: (t) => t > 12 ? "p.m." : "a.m."
      };
    if (e === "ru")
      return {
        meridiem: (t) => t > 12 ? "PM" : "AM"
      };
    if (e === "zh-cn")
      return {
        meridiem: (t) => t > 12 ? "下午" : "上午"
      };
    if (e === "zh-tw")
      return {
        formats: {
          LT: "Ah:mm",
          LTS: "Ah:mm:ss"
        }
      };
    if (e === "zh-hk")
      return {
        formats: {
          LT: "Ah:mm",
          LTS: "Ah:mm:ss"
        },
        meridiem: (t) => t > 12 ? "下午" : "上午"
      };
  }
  getLocalizedTimeString(e) {
    const t = e?.hourFormat === "12" || this.effectiveHourFormat && this.effectiveHourFormat === "12", i = e?.locale ?? this.messages._lang, r = e?.numberingSystem ?? this.numberingSystem, a = e?.isoTimeString ?? this.value;
    return Re({
      fractionalSecondDigits: W(this.step),
      hour12: t,
      includeSeconds: this.shouldIncludeSeconds(),
      locale: i,
      numberingSystem: r,
      value: a
    }) ?? "";
  }
  onLabelClick() {
    this.setFocus();
  }
  shouldIncludeSeconds() {
    return this.step < 60;
  }
  shouldIncludeFractionalSeconds() {
    return W(this.step) > 0;
  }
  setCalcitePopoverEl(e) {
    this.popoverEl = e, this.openHandler();
  }
  setInputEl(e) {
    e && (this.calciteInputEl = e);
  }
  setCalciteTimePickerEl(e) {
    e && (this.calciteTimePickerEl = e);
  }
  setLocaleTimeFormat({ fractionalSecondFormatToken: e, hourFormat: t }) {
    const i = this.messages._lang, r = Q(i), a = /h+|H+/g, n = /\s+|a+|A+|\s+/g;
    let l = this.localeConfig.formats.LT, o = this.localeConfig.formats.LTS;
    if (t === "12" && r === "24") {
      const c = le(i), d = Je(i);
      l = l.replaceAll(a, "h"), l = l.replaceAll(n, ""), l = d === 0 ? `${c}${l}` : `${l}${c}`, o = o.replaceAll(a, "h"), o = o.replaceAll(n, ""), o = d === 0 ? `${c}${o}` : `${o}${c}`;
    } else t === "24" && r === "12" ? (l = l.replaceAll(a, "H"), l = l.replaceAll(n, ""), o = o.replaceAll(a, "H"), o = o.replaceAll(n, "")) : (l = this.localeDefaultLTFormat, o = this.localeDefaultLTSFormat);
    const u = o?.match(/ss\.*(S+)/g);
    if (e && this.shouldIncludeFractionalSeconds()) {
      const c = `ss.${e}`;
      o = u ? o.replace(u[0], c) : o.replace("ss", c);
    } else u && (o = o.replace(u[0], "ss"));
    this.localeConfig.formats.LT = l, this.localeConfig.formats.LTS = o, f.updateLocale(this.getSupportedDayjsLocale(se(i)), this.localeConfig);
  }
  setInputValue(e) {
    this.calciteInputEl && (this.calciteInputEl.value = e);
  }
  /**
   * Sets the value and emits a change event.
   * This is used to update the value as a result of user interaction.
   *
   * @param value The new value
   */
  setValue(e) {
    const t = this.value, i = qe(e) || "";
    if (i === t)
      return;
    this.userChangedValue = !0, this.value = i || "", this.calciteInputTimePickerChange.emit().defaultPrevented && (this.userChangedValue = !1, this.value = t, this.setLocalizedInputValue({ isoTimeString: t }));
  }
  /**
   * Sets the value directly without emitting a change event.
   * This is used to update the value on initial load and when props change that are not the result of user interaction.
   *
   * @param value The new value
   */
  setValueDirectly(e) {
    const t = this.shouldIncludeSeconds();
    this.value = oe(e, t), this.setLocalizedInputValue();
  }
  onInputWrapperClick() {
    this.open = !this.open;
  }
  deactivate() {
    this.open = !1;
  }
  // #endregion
  // #region Rendering
  render() {
    const { disabled: e, messages: t, readOnly: i } = this;
    return xe({ disabled: this.disabled, children: ne`<div class="input-wrapper" @click=${this.onInputWrapperClick}><calcite-input-text aria-errormessage=${fe.validationMessage} aria-autocomplete=none aria-haspopup=dialog .ariaInvalid=${this.status === "invalid"} .disabled=${e} icon=clock .label=${Ne(this)} lang=${this.messages._lang ?? N} @calciteInputTextInput=${this.calciteInternalInputInputHandler} @calciteInternalInputTextFocus=${this.calciteInternalInputFocusHandler} .readOnly=${i} role=combobox .scale=${this.scale} .status=${this.status} ${J(this.setInputEl)}>${!this.readOnly && this.renderToggleIcon(this.open) || ""}</calcite-input-text></div><calcite-popover auto-close .focusTrapDisabled=${this.focusTrapDisabled} .focusTrapOptions=${{ initialFocus: !1 }} .label=${t.chooseTime} lang=${this.messages._lang ?? N} @calcitePopoverBeforeClose=${this.popoverBeforeCloseHandler} @calcitePopoverBeforeOpen=${this.popoverBeforeOpenHandler} @calcitePopoverClose=${this.popoverCloseHandler} @calcitePopoverOpen=${this.popoverOpenHandler} .overlayPositioning=${this.overlayPositioning} .placement=${this.placement} .referenceElement=${this.calciteInputEl} trigger-disabled ${J(this.setCalcitePopoverEl)}><calcite-time-picker .hourFormat=${this.effectiveHourFormat} lang=${this.messages._lang ?? N} .messageOverrides=${this.messageOverrides} .numberingSystem=${this.numberingSystem} @calciteTimePickerChange=${this.timePickerChangeHandler} .scale=${this.scale} .step=${this.step} tabindex=${(this.open ? void 0 : -1) ?? N} .value=${this.value} ${J(this.setCalciteTimePickerEl)}></calcite-time-picker></calcite-popover>${_e({ component: this })}${this.validationMessage && this.status === "invalid" ? Ge({ icon: this.validationIcon, id: fe.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderToggleIcon(e) {
    return ne`<span class=${Oe(Yt.toggleIcon)} slot=action><calcite-icon .icon=${e ? "chevron-up" : "chevron-down"} .scale=${Be(this.scale)}></calcite-icon></span>`;
  }
}
Pe("calcite-input-time-picker", we);
const Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  InputTimePicker: we
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as d,
  Rt as i
};
