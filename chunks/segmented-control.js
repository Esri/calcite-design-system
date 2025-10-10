import { b as m, L as p, c as u, u as f, E as g, s as b, x as c, q as v } from "./index.js";
import { a as y, d as w } from "./dom.js";
import { c as I, a as x, d as C, H as k } from "./form.js";
import { u as S, I as A } from "./interactive.js";
import { c as D, d as L, g as z } from "./label.js";
import { I as M } from "./InternalLabel.js";
import { V as E } from "./Validation.js";
import { u as q } from "./useT9n.js";
import { u as $ } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const U = {
  itemWrapper: "item-wrapper"
}, d = {
  validationMessage: "segmentedControlValidationMessage"
}, T = m`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}.item-wrapper{display:flex;background-color:var(--calcite-color-foreground-1);inline-size:fit-content;outline:1px solid var(--calcite-segmented-control-border-color, var(--calcite-color-border-input));outline-offset:-1px}:host([appearance=outline])>.item-wrapper{background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([layout=vertical])>.item-wrapper{flex-direction:column;align-items:flex-start;align-self:flex-start}:host([width=full])>.item-wrapper{inline-size:100%;min-inline-size:fit-content}:host([width=full])>.item-wrapper ::slotted(calcite-segmented-control-item){flex:1 1 auto}:host([width=full][layout=vertical])>.item-wrapper ::slotted(calcite-segmented-control-item){justify-content:flex-start}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class F extends p {
  constructor() {
    super(), this.items = [], this.messages = q(), this.focusSetter = $()(this), this.appearance = "solid", this.disabled = !1, this.layout = "horizontal", this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    }, this.value = null, this.width = "auto", this.calciteSegmentedControlChange = u({ cancelable: !1 }), this.listen("calciteInternalSegmentedControlItemChange", this.handleSelected), this.listen("keydown", this.handleKeyDown), this.listen("click", this.handleClick);
  }
  static {
    this.properties = { appearance: 3, disabled: 7, form: 3, layout: 3, labelText: 1, messageOverrides: 0, name: 3, required: 7, scale: 3, selectedItem: 0, status: 3, validationIcon: [3, { converter: f, type: String }], validationMessage: 1, validity: 0, value: 1, width: 3 };
  }
  static {
    this.styles = T;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.selectedItem || this.items[0], e);
  }
  connectedCallback() {
    super.connectedCallback(), D(this), I(this);
  }
  willUpdate(e) {
    (e.has("appearance") && (this.hasUpdated || this.appearance !== "solid") || e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") || e.has("scale") && (this.hasUpdated || this.scale !== "m")) && this.handleItemPropChange(), e.has("value") && (this.hasUpdated || this.value !== null) && this.valueHandler(this.value), e.has("selectedItem") && this.handleSelectedItemChange(this.selectedItem, e.get("selectedItem"));
  }
  updated() {
    S(this);
  }
  loaded() {
    x(this, this.value);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), L(this), C(this);
  }
  valueHandler(e) {
    const { items: t } = this;
    t.forEach((a) => a.checked = a.value === e);
  }
  handleSelectedItemChange(e, t) {
    if (this.value = e?.value, e === t)
      return;
    const { items: a } = this, s = a.filter((i) => i === e).pop();
    s ? this.selectItem(s) : a[0] && (a[0].tabIndex = 0);
  }
  handleClick(e) {
    this.disabled || e.target.localName === "calcite-segmented-control-item" && this.selectItem(e.target, !0);
  }
  handleSelected(e) {
    e.preventDefault();
    const t = e.target;
    t.checked && this.selectItem(t), e.stopPropagation();
  }
  handleKeyDown(e) {
    const t = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "], { key: a } = e, { el: s, selectedItem: i } = this;
    if (t.indexOf(a) === -1)
      return;
    let l = a;
    y(s) === "rtl" && (a === "ArrowRight" && (l = "ArrowLeft"), a === "ArrowLeft" && (l = "ArrowRight"));
    const { items: n } = this;
    let o = -1;
    switch (n.forEach((r, h) => {
      r === i && (o = h);
    }), l) {
      case "ArrowLeft":
      case "ArrowUp": {
        e.preventDefault();
        const r = o < 1 ? n[n.length - 1] : n[o - 1];
        this.selectItem(r, !0);
        return;
      }
      case "ArrowRight":
      case "ArrowDown": {
        e.preventDefault();
        const r = o === -1 ? n[1] : n[o + 1] || n[0];
        this.selectItem(r, !0);
        return;
      }
      case " ":
        e.preventDefault(), this.selectItem(e.target, !0);
        return;
      default:
        return;
    }
  }
  handleItemPropChange() {
    const { items: e } = this;
    e.forEach((t) => {
      t.appearance = this.appearance, t.layout = this.layout, t.scale = this.scale;
    });
  }
  handleSelectedItem() {
    const { items: e } = this, t = e.filter((a) => a.checked).pop();
    t ? this.selectItem(t) : e[0] && (e[0].tabIndex = 0);
  }
  async handleDefaultSlotChange(e) {
    const t = w(e).filter((a) => a.matches("calcite-segmented-control-item"));
    await Promise.all(t.map((a) => a.componentOnReady())), this.items = t, this.handleSelectedItem(), this.handleItemPropChange();
  }
  onLabelClick() {
    this.setFocus();
  }
  async selectItem(e, t = !1) {
    if (e === this.selectedItem)
      return;
    const { items: a } = this;
    let s = null;
    a.forEach((i) => {
      const l = i === e;
      (l && !i.checked || !l && i.checked) && (i.checked = l), i.tabIndex = l ? 0 : -1, l && (s = i);
    }), this.selectedItem = s, s && t && (await this.updateComplete, this.calciteSegmentedControlChange.emit(), s.focus());
  }
  render() {
    return this.el.role = "radiogroup", c`${this.labelText && M({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div aria-errormessage=${d.validationMessage} aria-label=${z(this) ?? g} .ariaInvalid=${this.status === "invalid"} .ariaRequired=${this.required} class=${b(U.itemWrapper)}>${A({ disabled: this.disabled, children: c`<slot @slotchange=${this.handleDefaultSlotChange}></slot>${k({ component: this })}` })}</div>${this.validationMessage && this.status === "invalid" ? E({ icon: this.validationIcon, id: d.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}`;
  }
}
v("calcite-segmented-control", F);
export {
  F as SegmentedControl
};
