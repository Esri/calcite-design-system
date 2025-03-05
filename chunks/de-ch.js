import { d as i } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
var _ = {
  s: "ein paar Sekunden",
  m: ["eine Minute", "einer Minute"],
  mm: "%d Minuten",
  h: ["eine Stunde", "einer Stunde"],
  hh: "%d Stunden",
  d: ["ein Tag", "einem Tag"],
  dd: ["%d Tage", "%d Tagen"],
  M: ["ein Monat", "einem Monat"],
  MM: ["%d Monate", "%d Monaten"],
  y: ["ein Jahr", "einem Jahr"],
  yy: ["%d Jahre", "%d Jahren"]
};
function e(r, n, t) {
  var a = _[t];
  return Array.isArray(a) && (a = a[n ? 0 : 1]), a.replace("%d", r);
}
var M = {
  name: "de-ch",
  weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
  weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
  weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
  months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
  monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
  ordinal: function(n) {
    return n + ".";
  },
  weekStart: 1,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY HH:mm",
    LLLL: "dddd, D. MMMM YYYY HH:mm"
  },
  relativeTime: {
    future: "in %s",
    past: "vor %s",
    s: e,
    m: e,
    mm: e,
    h: e,
    hh: e,
    d: e,
    dd: e,
    M: e,
    MM: e,
    y: e,
    yy: e
  }
};
i.locale(M, null, !0);
export {
  M as default
};
