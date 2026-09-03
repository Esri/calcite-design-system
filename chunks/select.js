/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as h, L as v, c as p, T as u, s as c, b as n, d as m } from "./index.js";
import { e as b, n as f } from "./ref.js";
import { u as g } from "./useT9n.js";
import { g as x } from "./label.js";
import { u as w } from "./useLabel.js";
import { c as E } from "./observers.js";
import { g as y } from "./component.js";
import { I as z } from "./InternalLabel.js";
import { V as C } from "./Validation.js";
import { i as d } from "./resources2.js";
import { u as k } from "./useSetFocus.js";
import { u as S } from "./useInteractive.js";
import { u as I } from "./useForm.js";
import { C as s, I as r } from "./resources18.js";
const l = d("calcite-option"), o = d("calcite-option-group"), T = h`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column;font-size:var(--calcite-select-font-size);font-weight:var(--calcite-internal-select-font-weight, var(--calcite-font-weight-regular))}.wrapper{position:relative;display:flex;align-items:stretch;inline-size:var(--select-width);block-size:var(--calcite-internal-select-block-size, 32px)}.wrapper:focus-within .icon,.wrapper:active .icon,.wrapper:hover .icon{color:var(--calcite-select-icon-color-hover, var(--calcite-color-text-1))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){--calcite-internal-select-font-size: var(--calcite-font-size-relative-sm);--calcite-internal-select-spacing-inline: var(--calcite-space-sm) var(--calcite-space-2xl);--calcite-internal-select-icon-container-padding-inline: var(--calcite-space-2xs);--calcite-internal-select-block-size: 24px}:host([scale=m]){--calcite-internal-select-font-size: var(--calcite-font-size-relative-base);--calcite-internal-select-spacing-inline: var(--calcite-space-md) var(--calcite-space-3xl);--calcite-internal-select-icon-container-padding-inline: var(--calcite-space-sm)}:host([scale=l]){--calcite-internal-select-font-size: var(--calcite-font-size-relative-md);--calcite-internal-select-spacing-inline: var(--calcite-space-lg) var(--calcite-space-4xl);--calcite-internal-select-icon-container-padding-inline: var(--calcite-space-sm-plus);--calcite-internal-select-block-size: 44px}:host([width=auto]){inline-size:auto}:host([width=half]){inline-size:50%}:host([width=full]){inline-size:100%}.select{margin:0;box-sizing:border-box;inline-size:100%;cursor:pointer;appearance:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-style:solid;font-family:inherit;outline-color:transparent;font-weight:inherit;font-size:var(--calcite-select-font-size, var(--calcite-internal-select-font-size));color:var(--calcite-select-text-color, var(--calcite-color-text-2));border-color:var(--calcite-select-border-color, var(--calcite-color-border-input));border-width:var(--calcite-select-internal-border-width, var(--calcite-border-width-sm));padding-inline:var(--calcite-internal-select-spacing-inline);padding-block:var(--calcite-internal-select-spacing-block);border-inline-end-width:0;line-height:var(--calcite-internal-select-line-height, normal);background-color:var(--calcite-select-background-color, var(--calcite-color-foreground-1));border-radius:var(--calcite-select-corner-radius, var(--calcite-corner-radius));box-shadow:var(--calcite-select-shadow, var(--calcite-shadow-none))}.select:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}select:disabled{border-color:var(--calcite-color-border-input);--tw-bg-opacity: 1}.icon-container{pointer-events:none;position:absolute;inset-block:0px;display:flex;align-items:center;border-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:transparent;color:var(--calcite-color-text-2);inset-inline-end:0px;border-start-start-radius:var(--calcite-select-corner-radius, var(--calcite-corner-radius));border-start-end-radius:var(--calcite-select-corner-radius, var(--calcite-corner-radius));border-end-start-radius:var(--calcite-select-corner-radius, var(--calcite-corner-radius));border-end-end-radius:var(--calcite-select-corner-radius, var(--calcite-corner-radius));border-color:var(--calcite-select-border-color, var(--calcite-color-border-input));border-inline-width:0 var(--calcite-select-internal-icon-border-inline-end-width, var(--calcite-border-width-sm));padding-inline:var(--calcite-internal-select-icon-container-padding-inline)}.icon-container .icon{color:var(--calcite-select-icon-color, var(--calcite-color-text-3))}:host([status=invalid]) select,:host([status=invalid]) .icon-container{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) select:focus,:host([status=invalid]) .icon-container:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.select:focus~.icon-container{border-color:transparent}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`;
class N extends v {
  constructor() {
    super(), this.componentToNativeEl = /* @__PURE__ */ new Map(), this.formSupport = I({ inputType: "text" })(this), this.mutationObserver = E("mutation", () => this.populateInternalSelect()), this.selectRef = b(), this.messages = g(), this.focusSetter = k()(this), this.interactiveContainer = S(this), this.disabled = !1, this.required = !1, this.scale = "m", this.status = "idle", this.value = null, this.width = "auto", this.calciteSelectChange = p({ cancelable: !1 }), w(this), this.listen("calciteInternalOptionChange", this.handleOptionOrGroupChange), this.listen("calciteInternalOptionGroupChange", this.handleOptionOrGroupChange);
  }
  static {
    this.properties = { disabled: 7, form: 3, label: 1, labelText: 1, name: 3, required: 7, scale: 3, selectedOption: 0, status: 3, validationIcon: [3, { converter: u }], validationMessage: 1, validity: 32, value: 1, width: 3, messageOverrides: 0 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = T;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.selectRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, {
      subtree: !0,
      childList: !0
    });
  }
  willUpdate(e) {
    e.has("value") && (this.hasUpdated || this.value !== null) && this.updateItemsFromValue(this.value), e.has("selectedOption") && (this.value = this.selectedOption?.value);
  }
  loaded() {
    typeof this.value == "string" && this.updateItemsFromValue(this.value), this.populateInternalSelect();
    const e = this.selectRef.value?.selectedOptions[0];
    this.selectFromNativeOption(e), this.formSupport.overrideDefaultValue(this.selectedOption?.value ?? "");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect();
  }
  handleInternalSelectChange() {
    const e = this.selectRef.value.selectedOptions[0];
    this.selectFromNativeOption(e), requestAnimationFrame(() => this.emitChangeEvent());
  }
  handleOptionOrGroupChange(e) {
    e.stopPropagation();
    const t = e.target, i = this.componentToNativeEl.get(t);
    i && (this.updateNativeElement(t, i), l(t) && t.selected && (this.deselectAllExcept(t), this.selectedOption = t));
  }
  onLabelClick() {
    this.setFocus();
  }
  updateItemsFromValue(e) {
    this.el.querySelectorAll("calcite-option").forEach((t) => t.selected = t.value === e);
  }
  updateNativeElement(e, t) {
    if (t.disabled = e.disabled, t.label = e.label, l(e)) {
      const i = t;
      i.selected = e.selected, i.value = e.value, i.innerText = e.label;
    }
  }
  populateInternalSelect() {
    const e = Array.from(this.el.children).filter((t) => l(t) || o(t));
    this.clearInternalSelect(), e.forEach((t) => this.selectRef.value?.append(this.toNativeElement(t)));
  }
  clearInternalSelect() {
    this.componentToNativeEl.forEach((e) => e.remove()), this.componentToNativeEl.clear();
  }
  selectFromNativeOption(e) {
    if (!e)
      return;
    let t;
    this.componentToNativeEl.forEach((i, a) => {
      l(a) && i === e && (a.selected = !0, t = a, this.deselectAllExcept(a));
    }), t && (this.selectedOption = t);
  }
  toNativeElement(e) {
    if (l(e)) {
      const t = document.createElement("option");
      return this.updateNativeElement(e, t), this.componentToNativeEl.set(e, t), t;
    }
    if (o(e)) {
      const t = document.createElement("optgroup");
      return this.updateNativeElement(e, t), Array.from(e.children).forEach((i) => {
        const a = this.toNativeElement(i);
        t.append(a), this.componentToNativeEl.set(e, a);
      }), this.componentToNativeEl.set(e, t), t;
    }
    throw new Error("unsupported element child provided");
  }
  deselectAllExcept(e) {
    this.el.querySelectorAll("calcite-option").forEach((t) => {
      t !== e && (t.selected = !1);
    });
  }
  emitChangeEvent() {
    this.calciteSelectChange.emit();
  }
  renderChevron() {
    return n`<div class=${c(s.iconContainer)}><calcite-icon class=${c(s.icon)} icon=chevron-down .scale=${y(this.scale)}></calcite-icon></div>`;
  }
  render() {
    const { disabled: e } = this;
    return this.interactiveContainer({ disabled: e, children: n`${this.labelText && z({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${c(s.wrapper)}><select aria-errormessage=${r.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${x(this)} class=${c(s.select)} .disabled=${e} @change=${this.handleInternalSelectChange} .required=${this.required} ${f(this.selectRef)}><slot></slot></select>${this.renderChevron()}</div>${this.validationMessage && this.status === "invalid" ? C({ icon: this.validationIcon, id: r.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
m("calcite-select", N);
export {
  N as Select
};
