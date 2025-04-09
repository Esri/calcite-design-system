import { d as a } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
var _ = {
  name: "nl",
  weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
  weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
  weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
  months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
  monthsShort: "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
  ordinal: function(e) {
    return "[" + e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de") + "]";
  },
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD-MM-YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm"
  },
  relativeTime: {
    future: "over %s",
    past: "%s geleden",
    s: "een paar seconden",
    m: "een minuut",
    mm: "%d minuten",
    h: "een uur",
    hh: "%d uur",
    d: "een dag",
    dd: "%d dagen",
    M: "een maand",
    MM: "%d maanden",
    y: "een jaar",
    yy: "%d jaar"
  }
};
a.locale(_, null, !0);
export {
  _ as default
};
