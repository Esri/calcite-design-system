/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { L as t, c as a, b as s, d as i } from "./index.js";
class l extends t {
  constructor() {
    super(...arguments), this.disabled = !1, this.calciteInternalOptionGroupChange = a({ cancelable: !1 });
  }
  static {
    this.properties = { disabled: 7, label: 1 };
  }
  willUpdate(e) {
    (e.has("disabled") && (this.hasUpdated || this.disabled !== !1) || e.has("label")) && this.calciteInternalOptionGroupChange.emit();
  }
  render() {
    return s`<div>${this.label}</div><slot></slot>`;
  }
}
i("calcite-option-group", l);
export {
  l as OptionGroup
};
