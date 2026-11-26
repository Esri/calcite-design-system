/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { d as x } from "./intl.js";
import { d as S } from "./date.js";
import { b as W, c as C } from "./locale.js";
function o(t) {
  let e = !1, a;
  return function(...r) {
    return e || (e = !0, a = t(...r)), a;
  };
}
const i = {}, u = {}, p = new Date(Date.UTC(2006, 10, 22)), T = Array.from({ length: 12 }, (t, e) => new Date(Date.UTC(2006, e, 1))), I = Array.from({ length: 7 }, (t, e) => new Date(Date.UTC(2006, 0, e + 1)));
function h(t) {
  return c(t, "calendar").resolvedOptions().calendar === "buddhist" ? "buddhist" : "gregorian";
}
function c(t, e, a = {}) {
  const r = `${t}:${e}`;
  if (!u[r]) {
    const n = e === "calendar" ? void 0 : h(t) === "buddhist" ? "buddhist" : "gregory";
    u[r] = new Intl.DateTimeFormat(t, {
      ...a,
      ...n && { calendar: n },
      timeZone: "UTC"
    });
  }
  return u[r];
}
function M(t) {
  const e = c(t, "date-pattern", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  }).formatToParts(p), a = e.map(({ type: r, value: n }) => {
    switch (r) {
      case "day":
        return "DD";
      case "month":
        return "MM";
      case "year":
        return "YYYY";
      default:
        return n;
    }
  }).join("");
  return {
    placeholder: a,
    separator: e.find(({ type: r }) => r === "literal")?.value.replace(/\s/gu, "") || "/",
    unitOrder: a
  };
}
function m(t, e) {
  const a = e === "abbreviated" ? "short" : "long", r = c(t, `months-${e}`, { month: a });
  return T.map((n) => r.format(n));
}
function d(t, e) {
  const a = e === "abbreviated" ? "short" : "narrow", r = c(t, `weekdays-${e}`, { weekday: a });
  return I.map((n) => r.format(n));
}
function O(t, e) {
  return t === "pt-PT" ? d("pt", "abbreviated") : e;
}
function F(t) {
  return new Intl.Locale(t).getWeekInfo().firstDay;
}
function A(t) {
  const e = c(t, "year", { year: "numeric" }).formatToParts(p), a = e.findIndex(({ type: n }) => n === "year");
  return e.slice(a + 1).filter(({ type: n }) => n === "literal").map(({ value: n }) => n).join("") || void 0;
}
function $(t) {
  const e = Intl.getCanonicalLocales(t || x)[0];
  if (i[e])
    return i[e];
  const a = C(e), r = W(e), n = o(() => h(a)), s = o(() => M(a)), b = o(() => m(r, "abbreviated")), y = o(() => m(r, "wide")), l = o(() => d(r, "abbreviated")), D = o(() => d(r, "narrow")), v = o(() => O(r, l())), w = o(() => F(e)), k = o(() => A(r)), L = {
    get "default-calendar"() {
      return n();
    },
    get separator() {
      return s().separator;
    },
    get unitOrder() {
      return s().unitOrder;
    },
    get weekStart() {
      return w();
    },
    get placeholder() {
      return s().placeholder;
    },
    days: {
      get abbreviated() {
        return l();
      },
      get narrow() {
        return D();
      },
      get short() {
        return v();
      }
    },
    months: {
      get abbreviated() {
        return b();
      },
      get wide() {
        return y();
      }
    },
    get year() {
      const f = k();
      return f ? { suffix: f } : void 0;
    }
  };
  return i[e] = L;
}
function N(t) {
  return {
    "ar-SA": "ar"
    // see https://github.com/Esri/calcite-design-system/issues/11399
  }[t] || t;
}
function j(t) {
  return t.map((e, a) => S(e, a === 1));
}
function g(t, e, a) {
  const r = t.has(e), n = t.has(a);
  if (r && !n)
    return e;
  if (n && !r)
    return a;
}
function _(t, e) {
  return e === "min" ? g(t, "min", "minAsDate") : g(t, "max", "maxAsDate");
}
export {
  j as a,
  N as b,
  $ as c,
  _ as g
};
