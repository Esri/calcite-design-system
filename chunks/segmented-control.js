import { a as m, L as p, d as u, h as f, s as g, x as c, c as v } from "./iframe.js";
import { g as w, d as y } from "./dom.js";
import { c as I, a as b, d as C, H as k } from "./form.js";
import { u as x, I as S } from "./interactive.js";
import { c as A, d as D } from "./label.js";
import { c as M } from "./component.js";
import { V as E } from "./Validation.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const L = {
  itemWrapper: "item-wrapper"
}, d = {
  validationMessage: "segmentedControlValidationMessage"
}, U = m`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}.item-wrapper{display:flex;background-color:var(--calcite-color-foreground-1);inline-size:fit-content;outline:1px solid var(--calcite-segmented-control-border-color, var(--calcite-color-border-input));outline-offset:-1px}:host([appearance=outline])>.item-wrapper{background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([layout=vertical])>.item-wrapper{flex-direction:column;align-items:flex-start;align-self:flex-start}:host([width=full])>.item-wrapper{inline-size:100%;min-inline-size:fit-content}:host([width=full])>.item-wrapper ::slotted(calcite-segmented-control-item){flex:1 1 auto}:host([width=full][layout=vertical])>.item-wrapper ::slotted(calcite-segmented-control-item){justify-content:flex-start}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class $ extends p {
  constructor() {
    super(), this.items = [], this.appearance = "solid", this.disabled = !1, this.layout = "horizontal", this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    this.properties = { appearance: 3, disabled: 7, form: 3, layout: 3, name: 3, required: 7, scale: 3, selectedItem: 0, status: 3, validationIcon: [3, { converter: f }], validationMessage: 1, validity: 0, value: 1, width: 3 };
  }
  static {
    this.styles = U;
  }
  async setFocus() {
    await M(this), (this.selectedItem || this.items[0])?.focus();
  }
  connectedCallback() {
    super.connectedCallback(), A(this), I(this);
  }
  willUpdate(e) {
    (e.has("appearance") && (this.hasUpdated || this.appearance !== "solid") || e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") || e.has("scale") && (this.hasUpdated || this.scale !== "m")) && this.handleItemPropChange(), e.has("value") && (this.hasUpdated || this.value !== null) && this.valueHandler(this.value), e.has("selectedItem") && this.handleSelectedItemChange(this.selectedItem, e.get("selectedItem"));
  }
  updated() {
    x(this);
  }
  loaded() {
    b(this, this.value);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), D(this), C(this);
  }
  valueHandler(e) {
    const { items: t } = this;
    t.forEach((a) => a.checked = a.value === e);
  }
  handleSelectedItemChange(e, t) {
    if (this.value = e?.value, e === t)
      return;
    const { items: a } = this, i = a.filter((s) => s === e).pop();
    i ? this.selectItem(i) : a[0] && (a[0].tabIndex = 0);
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
    const t = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "], { key: a } = e, { el: i, selectedItem: s } = this;
    if (t.indexOf(a) === -1)
      return;
    let l = a;
    w(i) === "rtl" && (a === "ArrowRight" && (l = "ArrowLeft"), a === "ArrowLeft" && (l = "ArrowRight"));
    const { items: o } = this;
    let n = -1;
    switch (o.forEach((r, h) => {
      r === s && (n = h);
    }), l) {
      case "ArrowLeft":
      case "ArrowUp": {
        e.preventDefault();
        const r = n < 1 ? o[o.length - 1] : o[n - 1];
        this.selectItem(r, !0);
        return;
      }
      case "ArrowRight":
      case "ArrowDown": {
        e.preventDefault();
        const r = n === -1 ? o[1] : o[n + 1] || o[0];
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
    const t = y(e).filter((a) => a.matches("calcite-segmented-control-item"));
    await Promise.all(t.map((a) => a.componentOnReady())), this.items = t, this.handleSelectedItem(), this.handleItemPropChange();
  }
  onLabelClick() {
    this.setFocus();
  }
  async selectItem(e, t = !1) {
    if (e === this.selectedItem)
      return;
    const { items: a } = this;
    let i = null;
    a.forEach((s) => {
      const l = s === e;
      (l && !s.checked || !l && s.checked) && (s.checked = l), s.tabIndex = l ? 0 : -1, l && (i = s);
    }), this.selectedItem = i, i && t && (await this.updateComplete, this.calciteSegmentedControlChange.emit(), i.focus());
  }
  render() {
    return this.el.role = "radiogroup", c`<div aria-errormessage=${d.validationMessage} .ariaInvalid=${this.status === "invalid"} class=${g(L.itemWrapper)}>${S({ disabled: this.disabled, children: c`<slot @slotchange=${this.handleDefaultSlotChange}></slot>${k({ component: this })}` })}</div>${this.validationMessage && this.status === "invalid" ? E({ icon: this.validationIcon, id: d.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}`;
  }
}
v("calcite-segmented-control", $);
export {
  $ as SegmentedControl
};
