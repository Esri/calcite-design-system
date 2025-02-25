import { d as l } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
var e = "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"), M = "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"), o = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
function n(s, _) {
  var r = s.split("_");
  return _ % 10 === 1 && _ % 100 !== 11 ? r[0] : _ % 10 >= 2 && _ % 10 <= 4 && (_ % 100 < 10 || _ % 100 >= 20) ? r[1] : r[2];
}
function t(s, _, r) {
  var m = {
    ss: _ ? "секунда_секунди_секунд" : "секунду_секунди_секунд",
    mm: _ ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
    hh: _ ? "година_години_годин" : "годину_години_годин",
    dd: "день_дні_днів",
    MM: "місяць_місяці_місяців",
    yy: "рік_роки_років"
  };
  return r === "m" ? _ ? "хвилина" : "хвилину" : r === "h" ? _ ? "година" : "годину" : s + " " + n(m[r], +s);
}
var a = function(_, r) {
  return o.test(r) ? e[_.month()] : M[_.month()];
};
a.s = M;
a.f = e;
var d = {
  name: "uk",
  weekdays: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
  weekdaysShort: "ндл_пнд_втр_срд_чтв_птн_сбт".split("_"),
  weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  months: a,
  monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
  weekStart: 1,
  relativeTime: {
    future: "за %s",
    past: "%s тому",
    s: "декілька секунд",
    m: t,
    mm: t,
    h: t,
    hh: t,
    d: "день",
    dd: t,
    M: "місяць",
    MM: t,
    y: "рік",
    yy: t
  },
  ordinal: function(_) {
    return _;
  },
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY р.",
    LLL: "D MMMM YYYY р., HH:mm",
    LLLL: "dddd, D MMMM YYYY р., HH:mm"
  }
};
l.locale(d, null, !0);
export {
  d as default
};
