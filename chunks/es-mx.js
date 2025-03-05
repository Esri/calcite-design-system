import { d as _ } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
var s = {
  name: "es-mx",
  weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
  weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
  weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
  months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
  monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años"
  },
  ordinal: function(e) {
    return e + "º";
  },
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY H:mm",
    LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
  }
};
_.locale(s, null, !0);
export {
  s as default
};
