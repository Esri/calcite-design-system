/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { timeZones as r } from "./time-zones.js";
import "./index5.js";
async function m() {
  return r.sort().map((o) => ({ label: o }));
}
export {
  m as groupByName
};
