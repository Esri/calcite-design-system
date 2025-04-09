import { d as t } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
function a(n) {
  return n > 1 && n < 5 && ~~(n / 10) !== 1;
}
function _(n, e, d, r) {
  var s = n + " ";
  switch (d) {
    case "s":
      return e || r ? "pár sekund" : "pár sekundami";
    case "m":
      return e ? "minuta" : r ? "minutu" : "minutou";
    case "mm":
      return e || r ? s + (a(n) ? "minuty" : "minut") : s + "minutami";
    case "h":
      return e ? "hodina" : r ? "hodinu" : "hodinou";
    case "hh":
      return e || r ? s + (a(n) ? "hodiny" : "hodin") : s + "hodinami";
    case "d":
      return e || r ? "den" : "dnem";
    case "dd":
      return e || r ? s + (a(n) ? "dny" : "dní") : s + "dny";
    case "M":
      return e || r ? "měsíc" : "měsícem";
    case "MM":
      return e || r ? s + (a(n) ? "měsíce" : "měsíců") : s + "měsíci";
    case "y":
      return e || r ? "rok" : "rokem";
    case "yy":
      return e || r ? s + (a(n) ? "roky" : "let") : s + "lety";
  }
}
var m = {
  name: "cs",
  weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
  weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
  weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
  months: "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),
  monthsShort: "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"),
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
    past: "před %s",
    s: _,
    m: _,
    mm: _,
    h: _,
    hh: _,
    d: _,
    dd: _,
    M: _,
    MM: _,
    y: _,
    yy: _
  }
};
t.locale(m, null, !0);
export {
  m as default
};
