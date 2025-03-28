import { d as h } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
var m = "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"), a = "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"), i = "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"), s = "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"), l = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
function d(r, _) {
  var t = r.split("_");
  return _ % 10 === 1 && _ % 100 !== 11 ? t[0] : _ % 10 >= 2 && _ % 10 <= 4 && (_ % 100 < 10 || _ % 100 >= 20) ? t[1] : t[2];
}
function e(r, _, t) {
  var M = {
    mm: _ ? "минута_минуты_минут" : "минуту_минуты_минут",
    hh: "час_часа_часов",
    dd: "день_дня_дней",
    MM: "месяц_месяца_месяцев",
    yy: "год_года_лет"
  };
  return t === "m" ? _ ? "минута" : "минуту" : r + " " + d(M[t], +r);
}
var o = function(_, t) {
  return l.test(t) ? m[_.month()] : a[_.month()];
};
o.s = a;
o.f = m;
var n = function(_, t) {
  return l.test(t) ? i[_.month()] : s[_.month()];
};
n.s = s;
n.f = i;
var f = {
  name: "ru",
  weekdays: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
  weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
  weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
  months: o,
  monthsShort: n,
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY г.",
    LLL: "D MMMM YYYY г., H:mm",
    LLLL: "dddd, D MMMM YYYY г., H:mm"
  },
  relativeTime: {
    future: "через %s",
    past: "%s назад",
    s: "несколько секунд",
    m: e,
    mm: e,
    h: "час",
    hh: e,
    d: "день",
    dd: e,
    M: "месяц",
    MM: e,
    y: "год",
    yy: e
  },
  ordinal: function(_) {
    return _;
  },
  meridiem: function(_) {
    return _ < 4 ? "ночи" : _ < 12 ? "утра" : _ < 17 ? "дня" : "вечера";
  }
};
h.locale(f, null, !0);
export {
  f as default
};
