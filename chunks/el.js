import { d as t } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
var d = {
  name: "el",
  weekdays: "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
  weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
  weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
  months: "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
  monthsShort: "Ιαν_Φεβ_Μαρ_Απρ_Μαι_Ιουν_Ιουλ_Αυγ_Σεπτ_Οκτ_Νοε_Δεκ".split("_"),
  ordinal: function(_) {
    return _;
  },
  weekStart: 1,
  relativeTime: {
    future: "σε %s",
    past: "πριν %s",
    s: "μερικά δευτερόλεπτα",
    m: "ένα λεπτό",
    mm: "%d λεπτά",
    h: "μία ώρα",
    hh: "%d ώρες",
    d: "μία μέρα",
    dd: "%d μέρες",
    M: "ένα μήνα",
    MM: "%d μήνες",
    y: "ένα χρόνο",
    yy: "%d χρόνια"
  },
  formats: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY h:mm A",
    LLLL: "dddd, D MMMM YYYY h:mm A"
  }
};
t.locale(d, null, !0);
export {
  d as default
};
