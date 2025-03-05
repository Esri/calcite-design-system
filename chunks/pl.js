import { d as m } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
function r(t) {
  return t % 10 < 5 && t % 10 > 1 && ~~(t / 10) % 10 !== 1;
}
function a(t, e, _) {
  var i = t + " ";
  switch (_) {
    case "m":
      return e ? "minuta" : "minutę";
    case "mm":
      return i + (r(t) ? "minuty" : "minut");
    case "h":
      return e ? "godzina" : "godzinę";
    case "hh":
      return i + (r(t) ? "godziny" : "godzin");
    case "MM":
      return i + (r(t) ? "miesiące" : "miesięcy");
    case "yy":
      return i + (r(t) ? "lata" : "lat");
  }
}
var s = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"), o = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"), l = /D MMMM/, n = function(e, _) {
  return l.test(_) ? s[e.month()] : o[e.month()];
};
n.s = o;
n.f = s;
var d = {
  name: "pl",
  weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
  weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"),
  weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
  months: n,
  monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
  ordinal: function(e) {
    return e + ".";
  },
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: "za %s",
    past: "%s temu",
    s: "kilka sekund",
    m: a,
    mm: a,
    h: a,
    hh: a,
    d: "1 dzień",
    dd: "%d dni",
    M: "miesiąc",
    MM: a,
    y: "rok",
    yy: a
  },
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  }
};
m.locale(d, null, !0);
export {
  d as default
};
