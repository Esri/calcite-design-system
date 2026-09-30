/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { e as s, i, A as n, p as o } from "./index.js";
const p = s(class extends i {
  constructor() {
    super(...arguments), this.key = n;
  }
  render(r, e) {
    return this.key = r, e;
  }
  update(r, [e, t]) {
    return e !== this.key && (o(r), this.key = e), t;
  }
});
export {
  p as i
};
