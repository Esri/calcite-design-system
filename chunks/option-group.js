import { c as e, L as s, h as a, x as i, d as l } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
const n = e`:host{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
class o extends s {
  constructor() {
    super(...arguments), this.disabled = !1, this.calciteInternalOptionGroupChange = a({ cancelable: !1 });
  }
  static {
    this.properties = { disabled: 7, label: 1 };
  }
  static {
    this.styles = n;
  }
  // #endregion
  // #region Lifecycle
  willUpdate(t) {
    (t.has("disabled") && (this.hasUpdated || this.disabled !== !1) || t.has("label")) && this.calciteInternalOptionGroupChange.emit();
  }
  // #endregion
  // #region Private Methods
  // #endregion
  // #region Rendering
  render() {
    return i`<div>${this.label}</div><slot></slot>`;
  }
}
l("calcite-option-group", o);
export {
  o as OptionGroup
};
