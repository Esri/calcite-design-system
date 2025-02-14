import { d as o } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.5 */
var t = "siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"), s = "siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"), r = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/, _ = function(a, n) {
  return r.test(n) ? t[a.month()] : s[a.month()];
};
_.s = s;
_.f = t;
var i = {
  name: "hr",
  weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
  weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
  weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
  months: _,
  monthsShort: "sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
  weekStart: 1,
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY H:mm",
    LLLL: "dddd, D. MMMM YYYY H:mm"
  },
  relativeTime: {
    future: "za %s",
    past: "prije %s",
    s: "sekunda",
    m: "minuta",
    mm: "%d minuta",
    h: "sat",
    hh: "%d sati",
    d: "dan",
    dd: "%d dana",
    M: "mjesec",
    MM: "%d mjeseci",
    y: "godina",
    yy: "%d godine"
  },
  ordinal: function(a) {
    return a + ".";
  }
};
o.locale(i, null, !0);
export {
  i as default
};
