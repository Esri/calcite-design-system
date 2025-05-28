import { a as d, L as h, d as p, h as m, s as c, x as o, c as u } from "./iframe.js";
import { n as v } from "./ref.js";
import { a as f } from "./dom.js";
import { c as g, a as b, d as E, H as w } from "./form.js";
import { u as x, I as C } from "./interactive.js";
import { c as I, d as y, g as N } from "./label.js";
import { c as z, g as S } from "./component.js";
import { c as O } from "./observers.js";
import { V as k } from "./Validation.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
const T = d`:host{--calcite-icon-size: 1rem;--calcite-spacing-eighth: .125rem;--calcite-spacing-quarter: .25rem;--calcite-spacing-half: .5rem;--calcite-spacing-three-quarters: .75rem;--calcite-spacing: 1rem;--calcite-spacing-plus-quarter: 1.25rem;--calcite-spacing-plus-half: 1.5rem;--calcite-spacing-double: 2rem;--calcite-menu-min-width: 10rem;--calcite-header-min-height: 3rem;--calcite-footer-min-height: 3rem}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column;font-size:var(--calcite-select-font-size);font-weight:var(--calcite-internal-select-font-weight, var(--calcite-font-weight-regular))}.wrapper{position:relative;display:flex;align-items:stretch;inline-size:var(--select-width);block-size:var(--calcite-internal-select-block-size, 32px)}.wrapper:focus-within .icon,.wrapper:active .icon,.wrapper:hover .icon{color:var(--calcite-select-icon-color-hover, var(--calcite-color-text-1))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){--calcite-internal-select-font-size: var(--calcite-font-size--2);--calcite-select-spacing-inline: .5rem 2rem;--calcite-internal-select-icon-container-padding-inline: var(--calcite-spacing-sm);--calcite-internal-select-block-size: 24px}:host([scale=m]){--calcite-internal-select-font-size: var(--calcite-font-size--1);--calcite-select-spacing-inline: .75rem 2.5rem;--calcite-internal-select-icon-container-padding-inline: var(--calcite-spacing-md)}:host([scale=l]){--calcite-internal-select-font-size: var(--calcite-font-size-0);--calcite-select-spacing-inline: 1rem 3rem;--calcite-internal-select-icon-container-padding-inline: var(--calcite-spacing-lg);--calcite-internal-select-block-size: 44px}:host([width=auto]){inline-size:auto}:host([width=half]){inline-size:50%}:host([width=full]){inline-size:100%}.select{margin:0;box-sizing:border-box;inline-size:100%;cursor:pointer;appearance:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:0;border-style:solid;background-color:var(--calcite-color-foreground-1);font-family:inherit;outline-color:transparent;font-weight:inherit;font-size:var(--calcite-select-font-size, var(--calcite-internal-select-font-size));color:var(--calcite-select-text-color, var(--calcite-color-text-2));border-color:var(--calcite-select-border-color, var(--calcite-color-border-input));border-width:var(--calcite-select-internal-border-width, var(--calcite-border-width-sm));padding-inline:var(--calcite-select-spacing-inline);padding-block:var(--calcite-internal-select-spacing-block);border-inline-end-width:0;line-height:var(--calcite-internal-select-line-height, normal)}.select:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}select:disabled{border-color:var(--calcite-color-border-input);--tw-bg-opacity: 1}.icon-container{pointer-events:none;position:absolute;inset-block:0px;display:flex;align-items:center;border-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:transparent;color:var(--calcite-color-text-2);inset-inline-end:0px;border-color:var(--calcite-select-border-color, var(--calcite-color-border-input));border-inline-width:0px var(--calcite-select-internal-icon-border-inline-end-width, 1px);padding-inline:var(--calcite-internal-select-icon-container-padding-inline)}.icon-container .icon{color:var(--calcite-select-icon-color, var(--calcite-color-text-3))}:host([status=invalid]) select,:host([status=invalid]) .icon-container{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) select:focus,:host([status=invalid]) .icon-container:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.select:focus~.icon-container{border-color:transparent}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`, n = {
  icon: "icon",
  iconContainer: "icon-container",
  select: "select",
  wrapper: "wrapper"
}, r = {
  validationMessage: "selectValidationMessage"
};
function s(l) {
  return l.tagName === "CALCITE-OPTION";
}
function $(l) {
  return l.tagName === "CALCITE-OPTION-GROUP";
}
class A extends h {
  constructor() {
    super(), this.componentToNativeEl = /* @__PURE__ */ new Map(), this.mutationObserver = O("mutation", () => this.populateInternalSelect()), this.disabled = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    this.properties = { disabled: 7, form: 3, label: 1, name: 3, required: 7, scale: 3, selectedOption: 0, status: 3, validationIcon: [3, { converter: m }], validationMessage: 1, validity: 0, value: 1, width: 3 };
  }
  static {
    this.styles = T;
  }
  async setFocus() {
    await z(this), f(this.selectEl);
  }
  connectedCallback() {
    super.connectedCallback();
    const { el: e } = this;
    this.mutationObserver?.observe(e, {
      subtree: !0,
      childList: !0
    }), I(this), g(this);
  }
  willUpdate(e) {
    e.has("value") && (this.hasUpdated || this.value !== null) && this.updateItemsFromValue(this.value), e.has("selectedOption") && (this.value = this.selectedOption?.value);
  }
  updated() {
    x(this);
  }
  loaded() {
    typeof this.value == "string" && this.updateItemsFromValue(this.value), this.populateInternalSelect();
    const e = this.selectEl.selectedOptions[0];
    this.selectFromNativeOption(e), b(this, this.selectedOption?.value ?? "");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), y(this), E(this);
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
    if ($(e)) {
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
    return o`<div class=${c(n.iconContainer)}><calcite-icon class=${c(n.icon)} icon=chevron-down .scale=${S(this.scale)}></calcite-icon></div>`;
  }
  render() {
    const { disabled: e } = this;
    return C({ disabled: e, children: o`<div class=${c(n.wrapper)}><select aria-errormessage=${r.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${N(this)} class=${c(n.select)} .disabled=${e} @change=${this.handleInternalSelectChange} ${v(this.storeSelectRef)}><slot></slot></select>${this.renderChevron()}${w({ component: this })}</div>${this.validationMessage && this.status === "invalid" ? k({ icon: this.validationIcon, id: r.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
u("calcite-select", A);
export {
  A as Select
};
