import { d as _ } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
var r = {
  name: "tr",
  weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
  weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
  weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
  months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
  monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
  weekStart: 1,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  relativeTime: {
    future: "%s sonra",
    past: "%s önce",
    s: "birkaç saniye",
    m: "bir dakika",
    mm: "%d dakika",
    h: "bir saat",
    hh: "%d saat",
    d: "bir gün",
    dd: "%d gün",
    M: "bir ay",
    MM: "%d ay",
    y: "bir yıl",
    yy: "%d yıl"
  },
  ordinal: function(a) {
    return a + ".";
  }
};
_.locale(r, null, !0);
export {
  r as default
};
