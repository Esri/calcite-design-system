import { d as i } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
function a(s, u, e, _) {
  var t = {
    s: ["mõne sekundi", "mõni sekund", "paar sekundit"],
    m: ["ühe minuti", "üks minut"],
    mm: ["%d minuti", "%d minutit"],
    h: ["ühe tunni", "tund aega", "üks tund"],
    hh: ["%d tunni", "%d tundi"],
    d: ["ühe päeva", "üks päev"],
    M: ["kuu aja", "kuu aega", "üks kuu"],
    MM: ["%d kuu", "%d kuud"],
    y: ["ühe aasta", "aasta", "üks aasta"],
    yy: ["%d aasta", "%d aastat"]
  };
  return u ? (t[e][2] ? t[e][2] : t[e][1]).replace("%d", s) : (_ ? t[e][0] : t[e][1]).replace("%d", s);
}
var r = {
  name: "et",
  // Estonian
  weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
  // Note weekdays are not capitalized in Estonian
  weekdaysShort: "P_E_T_K_N_R_L".split("_"),
  // There is no short form of weekdays in Estonian except this 1 letter format so it is used for both 'weekdaysShort' and 'weekdaysMin'
  weekdaysMin: "P_E_T_K_N_R_L".split("_"),
  months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
  // Note month names are not capitalized in Estonian
  monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
  ordinal: function(u) {
    return u + ".";
  },
  weekStart: 1,
  relativeTime: {
    future: "%s pärast",
    past: "%s tagasi",
    s: a,
    m: a,
    mm: a,
    h: a,
    hh: a,
    d: a,
    dd: "%d päeva",
    M: a,
    MM: a,
    y: a,
    yy: a
  },
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY H:mm",
    LLLL: "dddd, D. MMMM YYYY H:mm"
  }
};
i.locale(r, null, !0);
export {
  r as default
};
