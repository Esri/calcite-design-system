import { d as o } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.20 */
function m(r) {
  return r > 1 && r < 5 && ~~(r / 10) !== 1;
}
function n(r, e, s, a) {
  var _ = r + " ";
  switch (s) {
    case "s":
      return e || a ? "pár sekúnd" : "pár sekundami";
    case "m":
      return e ? "minúta" : a ? "minútu" : "minútou";
    case "mm":
      return e || a ? _ + (m(r) ? "minúty" : "minút") : _ + "minútami";
    case "h":
      return e ? "hodina" : a ? "hodinu" : "hodinou";
    case "hh":
      return e || a ? _ + (m(r) ? "hodiny" : "hodín") : _ + "hodinami";
    case "d":
      return e || a ? "deň" : "dňom";
    case "dd":
      return e || a ? _ + (m(r) ? "dni" : "dní") : _ + "dňami";
    case "M":
      return e || a ? "mesiac" : "mesiacom";
    case "MM":
      return e || a ? _ + (m(r) ? "mesiace" : "mesiacov") : _ + "mesiacmi";
    case "y":
      return e || a ? "rok" : "rokom";
    case "yy":
      return e || a ? _ + (m(r) ? "roky" : "rokov") : _ + "rokmi";
  }
}
var t = {
  name: "sk",
  weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
  weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
  weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
  months: "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),
  monthsShort: "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"),
  weekStart: 1,
  yearStart: 4,
  ordinal: function(e) {
    return e + ".";
  },
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY H:mm",
    LLLL: "dddd D. MMMM YYYY H:mm",
    l: "D. M. YYYY"
  },
  relativeTime: {
    future: "za %s",
    // Should be `o %s` (change when moment/moment#5408 is fixed)
    past: "pred %s",
    s: n,
    m: n,
    mm: n,
    h: n,
    hh: n,
    d: n,
    dd: n,
    M: n,
    MM: n,
    y: n,
    yy: n
  }
};
o.locale(t, null, !0);
export {
  t as default
};
