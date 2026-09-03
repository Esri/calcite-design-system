/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as m, L as p, c as u, T as f, A as g, s as b, b as o, d as v } from "./index.js";
import { u as x } from "./index2.js";
import { b as y } from "./dom.js";
import { g as w } from "./label.js";
import { u as I } from "./useLabel.js";
import { I as C } from "./InternalLabel.js";
import { V as k } from "./Validation.js";
import { i as c } from "./resources23.js";
import { u as S } from "./useT9n.js";
import { u as A } from "./useSetFocus.js";
import { u as D } from "./useInteractive.js";
import { u as z } from "./useForm.js";
const L = {
  itemWrapper: "item-wrapper"
}, d = {
  validationMessage: "segmentedControlValidationMessage"
}, q = m`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}.item-wrapper{display:flex;background-color:var(--calcite-color-foreground-1);inline-size:fit-content;border-radius:var(--calcite-segmented-control-corner-radius, var(--calcite-corner-radius));outline:1px solid var(--calcite-segmented-control-border-color, var(--calcite-color-border-input));outline-offset:-1px}:host([appearance=outline])>.item-wrapper{background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([layout=vertical])>.item-wrapper{flex-direction:column;align-items:flex-start;align-self:flex-start}:host([width=full])>.item-wrapper{inline-size:100%;min-inline-size:fit-content}:host([width=full])>.item-wrapper ::slotted(calcite-segmented-control-item){flex:1 1 auto}:host([width=full][layout=vertical])>.item-wrapper ::slotted(calcite-segmented-control-item){justify-content:flex-start}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`;
class T extends p {
  constructor() {
    super(), this.direction = x(), this.formSupport = z({ inputType: "text" })(this), this.items = [], this.messages = S(), this.focusSetter = A()(this), this.interactiveContainer = D(this), this.appearance = "solid", this.disabled = !1, this.layout = "horizontal", this.required = !1, this.scale = "m", this.status = "idle", this.value = null, this.width = "auto", this.calciteSegmentedControlChange = u({ cancelable: !1 }), I(this), this.listen("calciteInternalSegmentedControlItemChange", this.handleSelected), this.listen("keydown", this.handleKeyDown), this.listen("click", this.handleClick);
  }
  static {
    this.properties = { appearance: 3, disabled: 7, form: 3, layout: 3, labelText: 1, messageOverrides: 0, name: 3, required: 7, scale: 3, selectedItem: 0, status: 3, validationIcon: [3, { converter: f }], validationMessage: 1, validity: 32, value: 1, width: 3 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = q;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.selectedItem || this.items[0], e);
  }
  willUpdate(e) {
    (e.has("appearance") && (this.hasUpdated || this.appearance !== "solid") || e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") || e.has("scale") && (this.hasUpdated || this.scale !== "m")) && this.handleItemPropChange(), e.has("value") && (this.hasUpdated || this.value !== null) && this.valueHandler(this.value), e.has("selectedItem") && this.handleSelectedItemChange(this.selectedItem, e.get("selectedItem"));
  }
  loaded() {
    this.formSupport.overrideDefaultValue(this.value);
  }
  valueHandler(e) {
    const { items: t } = this;
    t.forEach((a) => a.checked = a.value === e);
  }
  handleSelectedItemChange(e, t) {
    if (this.value = e?.value, e === t)
      return;
    const { items: a } = this, l = a.filter((s) => s === e).pop();
    l ? this.selectItem(l) : a[0] && (a[0].tabIndex = 0);
  }
  handleClick(e) {
    this.disabled || c(e.target) && this.selectItem(e.target, !0);
  }
  handleSelected(e) {
    e.preventDefault();
    const t = e.target;
    t.checked && this.selectItem(t), e.stopPropagation();
  }
  handleKeyDown(e) {
    const t = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "], { key: a } = e, { selectedItem: l } = this;
    if (t.indexOf(a) === -1)
      return;
    let s = a;
    this.direction === "rtl" && (a === "ArrowRight" && (s = "ArrowLeft"), a === "ArrowLeft" && (s = "ArrowRight"));
    const { items: i } = this;
    let n = -1;
    switch (i.forEach((r, h) => {
      r === l && (n = h);
    }), s) {
      case "ArrowLeft":
      case "ArrowUp": {
        e.preventDefault();
        const r = n < 1 ? i[i.length - 1] : i[n - 1];
        this.selectItem(r, !0);
        return;
      }
      case "ArrowRight":
      case "ArrowDown": {
        e.preventDefault();
        const r = n === -1 ? i[1] : i[n + 1] || i[0];
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
    const t = y(e).filter(c);
    await Promise.all(t.map((a) => a.componentOnReady())), this.items = t, this.handleSelectedItem(), this.handleItemPropChange();
  }
  onLabelClick() {
    this.setFocus();
  }
  async selectItem(e, t = !1) {
    if (e === this.selectedItem)
      return;
    const { items: a } = this;
    let l;
    a.forEach((s) => {
      const i = s === e;
      (i && !s.checked || !i && s.checked) && (s.checked = i), s.tabIndex = i ? 0 : -1, i && (l = s);
    }), this.selectedItem = l, l && t && (await this.updateComplete, this.calciteSegmentedControlChange.emit(), l.focus());
  }
  render() {
    return this.el.role = "radiogroup", o`${this.labelText && C({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div aria-errormessage=${d.validationMessage} aria-label=${w(this) ?? g} .ariaInvalid=${this.status === "invalid"} .ariaRequired=${this.required} class=${b(L.itemWrapper)}>${this.interactiveContainer({ disabled: this.disabled, children: o`<slot @slotchange=${this.handleDefaultSlotChange}></slot>` })}</div>${this.validationMessage && this.status === "invalid" ? k({ icon: this.validationIcon, id: d.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}`;
  }
}
v("calcite-segmented-control", T);
export {
  T as SegmentedControl
};
