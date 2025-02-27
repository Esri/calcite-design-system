import { d as i } from "./input-time-picker.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.20 */
var _ = {
  name: "ro",
  weekdays: "Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă".split("_"),
  weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
  weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
  months: "Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"),
  monthsShort: "Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.".split("_"),
  weekStart: 1,
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY H:mm",
    LLLL: "dddd, D MMMM YYYY H:mm"
  },
  relativeTime: {
    future: "peste %s",
    past: "acum %s",
    s: "câteva secunde",
    m: "un minut",
    mm: "%d minute",
    h: "o oră",
    hh: "%d ore",
    d: "o zi",
    dd: "%d zile",
    M: "o lună",
    MM: "%d luni",
    y: "un an",
    yy: "%d ani"
  },
  ordinal: function(e) {
    return e;
  }
};
i.locale(_, null, !0);
export {
  _ as default
};
