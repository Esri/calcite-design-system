import { d as l } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
function _(n) {
  return n % 100 == 2;
}
function s(n) {
  return n % 100 == 3 || n % 100 == 4;
}
function m(n, e, d, a) {
  var r = n + " ";
  switch (d) {
    case "s":
      return e || a ? "nekaj sekund" : "nekaj sekundami";
    case "m":
      return e ? "ena minuta" : "eno minuto";
    case "mm":
      return _(n) ? r + (e || a ? "minuti" : "minutama") : s(n) ? r + (e || a ? "minute" : "minutami") : r + (e || a ? "minut" : "minutami");
    case "h":
      return e ? "ena ura" : "eno uro";
    case "hh":
      return _(n) ? r + (e || a ? "uri" : "urama") : s(n) ? r + (e || a ? "ure" : "urami") : r + (e || a ? "ur" : "urami");
    case "d":
      return e || a ? "en dan" : "enim dnem";
    case "dd":
      return _(n) ? r + (e || a ? "dneva" : "dnevoma") : r + (e || a ? "dni" : "dnevi");
    case "M":
      return e || a ? "en mesec" : "enim mesecem";
    case "MM":
      return _(n) ? r + (e || a ? "meseca" : "mesecema") : s(n) ? r + (e || a ? "mesece" : "meseci") : r + (e || a ? "mesecev" : "meseci");
    case "y":
      return e || a ? "eno leto" : "enim letom";
    case "yy":
      return _(n) ? r + (e || a ? "leti" : "letoma") : s(n) ? r + (e || a ? "leta" : "leti") : r + (e || a ? "let" : "leti");
  }
}
var c = {
  name: "sl",
  weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
  months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
  weekStart: 1,
  weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
  monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
  weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
  ordinal: function(e) {
    return e + ".";
  },
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY H:mm",
    LLLL: "dddd, D. MMMM YYYY H:mm",
    l: "D. M. YYYY"
  },
  relativeTime: {
    future: "čez %s",
    past: "pred %s",
    s: m,
    m,
    mm: m,
    h: m,
    hh: m,
    d: m,
    dd: m,
    M: m,
    MM: m,
    y: m,
    yy: m
  }
};
l.locale(c, null, !0);
export {
  c as default
};
