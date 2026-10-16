/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { s as r, b as h } from "./index.js";
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
