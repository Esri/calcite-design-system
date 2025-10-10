import { g as a, a as s } from "./index-p4VH55K1.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const r = {
  /* eslint-disable @typescript-eslint/naming-convention */
  CET: "Europe/Brussels",
  CST6CDT: "America/Chicago",
  EET: "Europe/Athens",
  EST: "America/Panama",
  EST5EDT: "America/New_York",
  HST: "Pacific/Honolulu",
  MET: "Europe/Brussels",
  MST: "America/Phoenix",
  MST7MDT: "America/Denver",
  PST8PDT: "America/Los_Angeles",
  WET: "Europe/Lisbon"
  /* eslint-enable @typescript-eslint/naming-convention */
}, t = (() => {
  const e = Object.keys(r);
  return Object.keys(s()).filter((o) => !e.includes(o));
})();
function c(e) {
  const o = r[e];
  return o || (a(e)?.aliasOf ?? e);
}
export {
  c as normalize,
  t as timeZones
};
