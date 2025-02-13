import { d as a } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
var s = {
  name: "hu",
  weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
  weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
  weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
  months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
  monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
  ordinal: function(n) {
    return n + ".";
  },
  weekStart: 1,
  relativeTime: {
    future: "%s múlva",
    past: "%s",
    s: function(n, _, t, e) {
      return "néhány másodperc" + (e || _ ? "" : "e");
    },
    m: function(n, _, t, e) {
      return "egy perc" + (e || _ ? "" : "e");
    },
    mm: function(n, _, t, e) {
      return n + " perc" + (e || _ ? "" : "e");
    },
    h: function(n, _, t, e) {
      return "egy " + (e || _ ? "óra" : "órája");
    },
    hh: function(n, _, t, e) {
      return n + " " + (e || _ ? "óra" : "órája");
    },
    d: function(n, _, t, e) {
      return "egy " + (e || _ ? "nap" : "napja");
    },
    dd: function(n, _, t, e) {
      return n + " " + (e || _ ? "nap" : "napja");
    },
    M: function(n, _, t, e) {
      return "egy " + (e || _ ? "hónap" : "hónapja");
    },
    MM: function(n, _, t, e) {
      return n + " " + (e || _ ? "hónap" : "hónapja");
    },
    y: function(n, _, t, e) {
      return "egy " + (e || _ ? "év" : "éve");
    },
    yy: function(n, _, t, e) {
      return n + " " + (e || _ ? "év" : "éve");
    }
  },
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "YYYY.MM.DD.",
    LL: "YYYY. MMMM D.",
    LLL: "YYYY. MMMM D. H:mm",
    LLLL: "YYYY. MMMM D., dddd H:mm"
  }
};
a.locale(s, null, !0);
export {
  s as default
};
