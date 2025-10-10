import { b as t, L as i, c as s, u as l, s as n, x as r, q as o } from "./index.js";
import { c } from "./observers.js";
import { I as d } from "./InternalLabel.js";
import { V as h } from "./Validation.js";
import { u as p } from "./useT9n.js";
import { u } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const m = {
  itemWrapper: "item-wrapper"
}, a = {
  validationMessage: "radioButtonGroupValidationMessage"
}, g = t`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:flex;flex-direction:column}:host>.item-wrapper{display:flex;max-inline-size:100vw}:host([layout=horizontal])>.item-wrapper{flex-direction:row;flex-wrap:wrap}:host([layout=horizontal][scale=s])>.item-wrapper{column-gap:var(--calcite-radio-button-group-gap, var(--calcite-spacing-lg))}:host([layout=horizontal][scale=m])>.item-wrapper{column-gap:var(--calcite-radio-button-group-gap, var(--calcite-spacing-xl))}:host([layout=horizontal][scale=l])>.item-wrapper{column-gap:var(--calcite-radio-button-group-gap, var(--calcite-spacing-xxl))}:host([layout=vertical])>.item-wrapper{flex-direction:column;inline-size:fit-content}:host([scale=s]) calcite-input-message{--calcite-input-message-spacing: var( --calcite-radio-button-input-message-spacing, calc(var(--calcite-spacing-xxs) * -1) )}:host([scale=m]) calcite-input-message{--calcite-input-message-spacing: var( --calcite-radio-button-input-message-spacing, calc(var(--calcite-spacing-sm) * -1) )}:host([scale=l]) calcite-input-message{--calcite-input-message-spacing: var( --calcite-radio-button-input-message-spacing, calc(var(--calcite-spacing-md) * -1) )}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`;
class b extends i {
  constructor() {
    super(), this.messages = p(), this.mutationObserver = c("mutation", () => this.passPropsToRadioButtons()), this.focusSetter = u()(this), this.radioButtons = [], this.disabled = !1, this.layout = "horizontal", this.required = !1, this.scale = "m", this.selectedItem = null, this.status = "idle", this.calciteRadioButtonGroupChange = s({ cancelable: !1 }), this.listen("calciteRadioButtonChange", this.radioButtonChangeHandler);
  }
  static {
    this.properties = { radioButtons: 16, disabled: 7, labelText: 1, layout: 3, messageOverrides: 0, name: 3, required: 7, scale: 3, selectedItem: 0, status: 3, validationIcon: [3, { converter: l, type: String }], validationMessage: 1 };
  }
  static {
    this.styles = g;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.selectedItem && !this.selectedItem.disabled ? this.selectedItem : this.getFocusableRadioButton(), e);
  }
  connectedCallback() {
    super.connectedCallback(), this.passPropsToRadioButtons(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  willUpdate(e) {
    (e.has("disabled") && (this.hasUpdated || this.disabled !== !1) || e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") || e.has("scale") && (this.hasUpdated || this.scale !== "m")) && this.passPropsToRadioButtons();
  }
  loaded() {
    this.passPropsToRadioButtons();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  passPropsToRadioButtons() {
    this.radioButtons = Array.from(this.el.querySelectorAll("calcite-radio-button")), this.selectedItem = Array.from(this.radioButtons).reverse().find((e) => e.checked) || null, this.radioButtons.length > 0 && this.radioButtons.forEach((e) => {
      this.hasUpdated && (e.disabled = this.disabled || e.disabled), e.name = this.name, e.required = this.required, e.scale = this.scale;
    });
  }
  getFocusableRadioButton() {
    return this.radioButtons.find((e) => !e.disabled) ?? null;
  }
  radioButtonChangeHandler(e) {
    this.selectedItem = e.target, this.calciteRadioButtonGroupChange.emit();
  }
  render() {
    return this.el.role = "radiogroup", r`${this.labelText && d({ labelText: this.labelText, required: this.required, tooltipText: this.messages.required }) || ""}<div aria-errormessage=${a.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaRequired=${this.required} class=${n(m.itemWrapper)}><slot></slot></div>${this.validationMessage && this.status === "invalid" ? h({ icon: this.validationIcon, id: a.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}`;
  }
}
o("calcite-radio-button-group", b);
export {
  b as RadioButtonGroup
};
