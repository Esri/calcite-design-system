import { s as r, x as h } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
const c = {
  textMatch: "text-match"
};
function e({ text: s, pattern: a }) {
  if (!a || !s)
    return s;
  const t = s.split(a);
  return t.length > 1 && (t[1] = h`<mark class=${r(c.textMatch)}>${t[1]}</mark>`), t;
}
export {
  e as h
};
