import { b as d, L as h, c as p, u as v, s as n, x as r, q as u } from "./index.js";
import { n as m } from "./ref.js";
import { u as f } from "./useT9n.js";
import { c as b, a as g, d as w, H as x } from "./form.js";
import { u as E, I as C } from "./interactive.js";
import { c as I, d as y, g as z } from "./label.js";
import { c as N } from "./observers.js";
import { g as S } from "./component.js";
import { I as k } from "./InternalLabel.js";
import { V as T } from "./Validation.js";
import { u as O } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const $ = d`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column;font-size:var(--calcite-select-font-size);font-weight:var(--calcite-internal-select-font-weight, var(--calcite-font-weight-regular))}.wrapper{position:relative;display:flex;align-items:stretch;inline-size:var(--select-width);block-size:var(--calcite-internal-select-block-size, 32px)}.wrapper:focus-within .icon,.wrapper:active .icon,.wrapper:hover .icon{color:var(--calcite-select-icon-color-hover, var(--calcite-color-text-1))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){--calcite-internal-select-font-size: var(--calcite-font-size--2);--calcite-select-spacing-inline: .5rem 2rem;--calcite-internal-select-icon-container-padding-inline: var(--calcite-spacing-sm);--calcite-internal-select-block-size: 24px}:host([scale=m]){--calcite-internal-select-font-size: var(--calcite-font-size--1);--calcite-select-spacing-inline: .75rem 2.5rem;--calcite-internal-select-icon-container-padding-inline: var(--calcite-spacing-md)}:host([scale=l]){--calcite-internal-select-font-size: var(--calcite-font-size-0);--calcite-select-spacing-inline: 1rem 3rem;--calcite-internal-select-icon-container-padding-inline: var(--calcite-spacing-lg);--calcite-internal-select-block-size: 44px}:host([width=auto]){inline-size:auto}:host([width=half]){inline-size:50%}:host([width=full]){inline-size:100%}.select{margin:0;box-sizing:border-box;inline-size:100%;cursor:pointer;appearance:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-style:solid;font-family:inherit;outline-color:transparent;font-weight:inherit;font-size:var(--calcite-select-font-size, var(--calcite-internal-select-font-size));color:var(--calcite-select-text-color, var(--calcite-color-text-2));border-color:var(--calcite-select-border-color, var(--calcite-color-border-input));border-width:var(--calcite-select-internal-border-width, var(--calcite-border-width-sm));padding-inline:var(--calcite-select-spacing-inline);padding-block:var(--calcite-internal-select-spacing-block);border-inline-end-width:0;line-height:var(--calcite-internal-select-line-height, normal);background-color:var(--calcite-select-background-color, var(--calcite-color-foreground-1));border-radius:var(--calcite-select-corner-radius, var(--calcite-corner-radius-none));box-shadow:var(--calcite-select-shadow, var(--calcite-shadow-small))}.select:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}select:disabled{border-color:var(--calcite-color-border-input);--tw-bg-opacity: 1}.icon-container{pointer-events:none;position:absolute;inset-block:0px;display:flex;align-items:center;border-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:transparent;color:var(--calcite-color-text-2);inset-inline-end:0px;border-start-start-radius:var(--calcite-select-corner-radius, var(--calcite-corner-radius-none));border-start-end-radius:var(--calcite-select-corner-radius, var(--calcite-corner-radius-none));border-end-start-radius:var(--calcite-select-corner-radius, var(--calcite-corner-radius-none));border-end-end-radius:var(--calcite-select-corner-radius, var(--calcite-corner-radius-none));border-color:var(--calcite-select-border-color, var(--calcite-color-border-input));border-inline-width:0 var(--calcite-select-internal-icon-border-inline-end-width, var(--calcite-border-width-sm));padding-inline:var(--calcite-internal-select-icon-container-padding-inline)}.icon-container .icon{color:var(--calcite-select-icon-color, var(--calcite-color-text-3))}:host([status=invalid]) select,:host([status=invalid]) .icon-container{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) select:focus,:host([status=invalid]) .icon-container:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.select:focus~.icon-container{border-color:transparent}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`, c = {
  icon: "icon",
  iconContainer: "icon-container",
  select: "select",
  wrapper: "wrapper"
}, o = {
  validationMessage: "selectValidationMessage"
};
function s(l) {
  return l.tagName === "CALCITE-OPTION";
}
function L(l) {
  return l.tagName === "CALCITE-OPTION-GROUP";
}
class q extends h {
  constructor() {
    super(), this.componentToNativeEl = /* @__PURE__ */ new Map(), this.mutationObserver = N("mutation", () => this.populateInternalSelect()), this.messages = f(), this.focusSetter = O()(this), this.disabled = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
      valid: !1,
      badInput: !1,
      customError: !1,
      patternMismatch: !1,
      rangeOverflow: !1,
      rangeUnderflow: !1,
      stepMismatch: !1,
      tooLong: !1,
      tooShort: !1,
      typeMismatch: !1,
      valueMissing: !1
    }, this.value = null, this.width = "auto", this.calciteSelectChange = p({ cancelable: !1 }), this.listen("calciteInternalOptionChange", this.handleOptionOrGroupChange), this.listen("calciteInternalOptionGroupChange", this.handleOptionOrGroupChange);
  }
  static {
    this.properties = { disabled: 7, form: 3, label: 1, labelText: 1, name: 3, required: 7, scale: 3, selectedOption: 0, status: 3, validationIcon: [3, { converter: v, type: String }], validationMessage: 1, validity: 0, value: 1, width: 3, messageOverrides: 0 };
  }
  static {
    this.styles = $;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.selectEl, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, {
      subtree: !0,
      childList: !0
    }), I(this), b(this);
  }
  willUpdate(e) {
    e.has("value") && (this.hasUpdated || this.value !== null) && this.updateItemsFromValue(this.value), e.has("selectedOption") && (this.value = this.selectedOption?.value);
  }
  updated() {
    E(this);
  }
  loaded() {
    typeof this.value == "string" && this.updateItemsFromValue(this.value), this.populateInternalSelect();
    const e = this.selectEl?.selectedOptions[0];
    this.selectFromNativeOption(e), g(this, this.selectedOption?.value ?? "");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), y(this), w(this);
  }
  handleInternalSelectChange() {
    const e = this.selectEl.selectedOptions[0];
    this.selectFromNativeOption(e), requestAnimationFrame(() => this.emitChangeEvent());
  }
  handleOptionOrGroupChange(e) {
    e.stopPropagation();
    const t = e.target, i = this.componentToNativeEl.get(t);
    i && (this.updateNativeElement(t, i), s(t) && t.selected && (this.deselectAllExcept(t), this.selectedOption = t));
  }
  onLabelClick() {
    this.setFocus();
  }
  updateItemsFromValue(e) {
    this.el.querySelectorAll("calcite-option").forEach((t) => t.selected = t.value === e);
  }
  updateNativeElement(e, t) {
    if (t.disabled = e.disabled, t.label = e.label, s(e)) {
      const i = t;
      i.selected = e.selected, i.value = e.value, i.innerText = e.label;
    }
  }
  populateInternalSelect() {
    const e = Array.from(this.el.children).filter((t) => t.tagName === "CALCITE-OPTION" || t.tagName === "CALCITE-OPTION-GROUP");
    this.clearInternalSelect(), e.forEach((t) => this.selectEl?.append(this.toNativeElement(t)));
  }
  clearInternalSelect() {
    this.componentToNativeEl.forEach((e) => e.remove()), this.componentToNativeEl.clear();
  }
  storeSelectRef(e) {
    e && (this.selectEl = e);
  }
  selectFromNativeOption(e) {
    if (!e)
      return;
    let t;
    this.componentToNativeEl.forEach((i, a) => {
      s(a) && i === e && (a.selected = !0, t = a, this.deselectAllExcept(a));
    }), t && (this.selectedOption = t);
  }
  toNativeElement(e) {
    if (s(e)) {
      const t = document.createElement("option");
      return this.updateNativeElement(e, t), this.componentToNativeEl.set(e, t), t;
    }
    if (L(e)) {
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
    return r`<div class=${n(c.iconContainer)}><calcite-icon class=${n(c.icon)} icon=chevron-down .scale=${S(this.scale)}></calcite-icon></div>`;
  }
  render() {
    const { disabled: e } = this;
    return C({ disabled: e, children: r`${this.labelText && k({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${n(c.wrapper)}><select aria-errormessage=${o.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${z(this)} class=${n(c.select)} .disabled=${e} @change=${this.handleInternalSelectChange} .required=${this.required} ${m(this.storeSelectRef)}><slot></slot></select>${this.renderChevron()}${x({ component: this })}</div>${this.validationMessage && this.status === "invalid" ? T({ icon: this.validationIcon, id: o.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
u("calcite-select", q);
export {
  q as Select
};
