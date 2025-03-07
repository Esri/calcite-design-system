import { d as r } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
var s = {
  name: "bg",
  weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
  weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
  weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
  monthsShort: "яну_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
  weekStart: 1,
  ordinal: function(_) {
    var e = _ % 100;
    if (e > 10 && e < 20)
      return _ + "-ти";
    var t = _ % 10;
    return t === 1 ? _ + "-ви" : t === 2 ? _ + "-ри" : t === 7 || t === 8 ? _ + "-ми" : _ + "-ти";
  },
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "D.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY H:mm",
    LLLL: "dddd, D MMMM YYYY H:mm"
  },
  relativeTime: {
    future: "след %s",
    past: "преди %s",
    s: "няколко секунди",
    m: "минута",
    mm: "%d минути",
    h: "час",
    hh: "%d часа",
    d: "ден",
    dd: "%d дена",
    M: "месец",
    MM: "%d месеца",
    y: "година",
    yy: "%d години"
  }
};
r.locale(s, null, !0);
export {
  s as default
};
