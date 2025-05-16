import { a as e, L as i, d as o, h as l, s as n, x as r, c } from "./iframe.js";
import { c as d } from "./observers.js";
import { c as h } from "./component.js";
import { V as u } from "./Validation.js";
import { f as a } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1-next.0 */
const p = {
  itemWrapper: "item-wrapper"
}, s = {
  validationMessage: "radioButtonGroupValidationMessage"
}, m = e`:host{display:flex;flex-direction:column}:host>.item-wrapper{display:flex;max-inline-size:100vw}:host([layout=horizontal])>.item-wrapper{flex-direction:row;flex-wrap:wrap}:host([layout=horizontal][scale=s])>.item-wrapper{column-gap:var(--calcite-radio-button-group-gap, var(--calcite-spacing-lg))}:host([layout=horizontal][scale=m])>.item-wrapper{column-gap:var(--calcite-radio-button-group-gap, var(--calcite-spacing-xl))}:host([layout=horizontal][scale=l])>.item-wrapper{column-gap:var(--calcite-radio-button-group-gap, var(--calcite-spacing-xxl))}:host([layout=vertical])>.item-wrapper{flex-direction:column;inline-size:fit-content}:host([scale=s]) calcite-input-message{--calcite-input-message-spacing: var( --calcite-radio-button-input-message-spacing, calc(var(--calcite-spacing-xxs) * -1) )}:host([scale=m]) calcite-input-message{--calcite-input-message-spacing: var( --calcite-radio-button-input-message-spacing, calc(var(--calcite-spacing-sm) * -1) )}:host([scale=l]) calcite-input-message{--calcite-input-message-spacing: var( --calcite-radio-button-input-message-spacing, calc(var(--calcite-spacing-md) * -1) )}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`;
class g extends i {
  constructor() {
    super(), this.mutationObserver = d("mutation", () => this.passPropsToRadioButtons()), this.radioButtons = [], this.disabled = !1, this.layout = "horizontal", this.required = !1, this.scale = "m", this.selectedItem = null, this.status = "idle", this.calciteRadioButtonGroupChange = o({ cancelable: !1 }), this.listen("calciteRadioButtonChange", this.radioButtonChangeHandler);
  }
  static {
    this.properties = { radioButtons: 16, disabled: 7, layout: 3, name: 3, required: 7, scale: 3, selectedItem: 0, status: 3, validationIcon: [3, { converter: l }], validationMessage: 1 };
  }
  static {
    this.styles = m;
  }
  async setFocus() {
    await h(this), this.selectedItem && !this.selectedItem.disabled && a(this.selectedItem), this.radioButtons.length > 0 && a(this.getFocusableRadioButton());
  }
  connectedCallback() {
    super.connectedCallback(), this.passPropsToRadioButtons(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  willUpdate(t) {
    (t.has("disabled") && (this.hasUpdated || this.disabled !== !1) || t.has("layout") && (this.hasUpdated || this.layout !== "horizontal") || t.has("scale") && (this.hasUpdated || this.scale !== "m")) && this.passPropsToRadioButtons();
  }
  loaded() {
    this.passPropsToRadioButtons();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  passPropsToRadioButtons() {
    this.radioButtons = Array.from(this.el.querySelectorAll("calcite-radio-button")), this.selectedItem = Array.from(this.radioButtons).reverse().find((t) => t.checked) || null, this.radioButtons.length > 0 && this.radioButtons.forEach((t) => {
      this.hasUpdated && (t.disabled = this.disabled || t.disabled), t.name = this.name, t.required = this.required, t.scale = this.scale;
    });
  }
  getFocusableRadioButton() {
    return this.radioButtons.find((t) => !t.disabled) ?? null;
  }
  radioButtonChangeHandler(t) {
    this.selectedItem = t.target, this.calciteRadioButtonGroupChange.emit();
  }
  render() {
    return this.el.role = "radiogroup", r`<div aria-errormessage=${s.validationMessage} .ariaInvalid=${this.status === "invalid"} class=${n(p.itemWrapper)}><slot></slot></div>${this.validationMessage && this.status === "invalid" ? u({ icon: this.validationIcon, id: s.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}`;
  }
}
c("calcite-radio-button-group", g);
export {
  g as RadioButtonGroup
};
