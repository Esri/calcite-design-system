import { d as o } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
var e = {
  words: {
    m: ["jedan minut", "jednog minuta"],
    mm: ["%d minut", "%d minuta", "%d minuta"],
    h: ["jedan sat", "jednog sata"],
    hh: ["%d sat", "%d sata", "%d sati"],
    d: ["jedan dan", "jednog dana"],
    dd: ["%d dan", "%d dana", "%d dana"],
    M: ["jedan mesec", "jednog meseca"],
    MM: ["%d mesec", "%d meseca", "%d meseci"],
    y: ["jednu godinu", "jedne godine"],
    yy: ["%d godinu", "%d godine", "%d godina"]
  },
  correctGrammarCase: function(a, r) {
    return a % 10 >= 1 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20) ? a % 10 === 1 ? r[0] : r[1] : r[2];
  },
  relativeTimeFormatter: function(a, r, t, n) {
    var d = e.words[t];
    if (t.length === 1)
      return t === "y" && r ? "jedna godina" : n || r ? d[0] : d[1];
    var i = e.correctGrammarCase(a, d);
    return t === "yy" && r && i === "%d godinu" ? a + " godina" : i.replace("%d", a);
  }
}, _ = {
  name: "sr",
  weekdays: "Nedelja_Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota".split("_"),
  weekdaysShort: "Ned._Pon._Uto._Sre._Čet._Pet._Sub.".split("_"),
  weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
  months: "Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar".split("_"),
  monthsShort: "Jan._Feb._Mar._Apr._Maj_Jun_Jul_Avg._Sep._Okt._Nov._Dec.".split("_"),
  weekStart: 1,
  relativeTime: {
    future: "za %s",
    past: "pre %s",
    s: "nekoliko sekundi",
    m: e.relativeTimeFormatter,
    mm: e.relativeTimeFormatter,
    h: e.relativeTimeFormatter,
    hh: e.relativeTimeFormatter,
    d: e.relativeTimeFormatter,
    dd: e.relativeTimeFormatter,
    M: e.relativeTimeFormatter,
    MM: e.relativeTimeFormatter,
    y: e.relativeTimeFormatter,
    yy: e.relativeTimeFormatter
  },
  ordinal: function(a) {
    return a + ".";
  },
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "D. M. YYYY.",
    LL: "D. MMMM YYYY.",
    LLL: "D. MMMM YYYY. H:mm",
    LLLL: "dddd, D. MMMM YYYY. H:mm"
  }
};
o.locale(_, null, !0);
export {
  _ as default
};
