import { b as e, L as s, c as a, x as l, q as i } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const o = e`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
class c extends s {
  constructor() {
    super(...arguments), this.disabled = !1, this.calciteInternalOptionGroupChange = a({ cancelable: !1 });
  }
  static {
    this.properties = { disabled: 7, label: 1 };
  }
  static {
    this.styles = o;
  }
  willUpdate(t) {
    (t.has("disabled") && (this.hasUpdated || this.disabled !== !1) || t.has("label")) && this.calciteInternalOptionGroupChange.emit();
  }
  render() {
    return l`<div>${this.label}</div><slot></slot>`;
  }
}
i("calcite-option-group", c);
export {
  c as OptionGroup
};
