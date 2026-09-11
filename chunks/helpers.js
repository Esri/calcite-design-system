/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as o } from "./index4.js";
const c = Object.keys(o).filter((e) => e.endsWith("16")).map((e) => e.replace("16", "")).sort((e, a) => {
  const r = /^i(\d)/;
  return e.replace(r, "$1").localeCompare(a.replace(r, "$1"));
});
export {
  c as i
};
