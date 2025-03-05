import { d as t } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
var d = {
  s: "מספר שניות",
  ss: "%d שניות",
  m: "דקה",
  mm: "%d דקות",
  h: "שעה",
  hh: "%d שעות",
  hh2: "שעתיים",
  d: "יום",
  dd: "%d ימים",
  dd2: "יומיים",
  M: "חודש",
  MM: "%d חודשים",
  MM2: "חודשיים",
  y: "שנה",
  yy: "%d שנים",
  yy2: "שנתיים"
};
function Y(M, _, m) {
  var l = d[m + (M === 2 ? "2" : "")] || d[m];
  return l.replace("%d", M);
}
var s = {
  name: "he",
  weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
  weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
  weekdaysMin: "א׳_ב׳_ג׳_ד׳_ה׳_ו_ש׳".split("_"),
  months: "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
  monthsShort: "ינו_פבר_מרץ_אפר_מאי_יונ_יול_אוג_ספט_אוק_נוב_דצמ".split("_"),
  relativeTime: {
    future: "בעוד %s",
    past: "לפני %s",
    s: Y,
    m: Y,
    mm: Y,
    h: Y,
    hh: Y,
    d: Y,
    dd: Y,
    M: Y,
    MM: Y,
    y: Y,
    yy: Y
  },
  ordinal: function(_) {
    return _;
  },
  format: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D [ב]MMMM YYYY",
    LLL: "D [ב]MMMM YYYY HH:mm",
    LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
    l: "D/M/YYYY",
    ll: "D MMM YYYY",
    lll: "D MMM YYYY HH:mm",
    llll: "ddd, D MMM YYYY HH:mm"
  },
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D [ב]MMMM YYYY",
    LLL: "D [ב]MMMM YYYY HH:mm",
    LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
    l: "D/M/YYYY",
    ll: "D MMM YYYY",
    lll: "D MMM YYYY HH:mm",
    llll: "ddd, D MMM YYYY HH:mm"
  }
};
t.locale(s, null, !0);
export {
  s as default
};
