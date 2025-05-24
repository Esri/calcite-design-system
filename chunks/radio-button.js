import { a as f, L as p, d as r, s as l, E as v, x as m, c as k } from "./iframe.js";
import { n as g } from "./ref.js";
import { g as h } from "./array.js";
import { a as B, g as x } from "./dom.js";
import { c as w, d as y, H as I } from "./form.js";
import { u as R, I as C } from "./interactive.js";
import { c as z, d as A, g as F } from "./label.js";
import { c as L } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const u = {
  container: "container",
  radio: "radio"
}, E = f`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;cursor:pointer}:host .container{position:relative;outline:2px solid transparent;outline-offset:2px}:host .radio{cursor:pointer;outline-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-radius:var(--calcite-radio-button-corner-radius, var(--calcite-corner-radius-pill));background-color:var(--calcite-radio-button-background-color, var(--calcite-color-foreground-1));box-shadow:inset 0 0 0 var(--calcite-border-width-sm) var(--calcite-radio-button-border-color, var(--calcite-color-border-input))}:host([hovered]) .radio,:host(:not([checked])[focused]:not([disabled])) .radio{box-shadow:inset 0 0 0 var(--calcite-border-width-md) var(--calcite-radio-button-border-color, var(--calcite-color-brand-hover))}:host([hovered]) .radio:active,:host(:not([checked])[focused]:not([disabled])) .radio:active{box-shadow:inset 0 0 0 var(--calcite-border-width-md) var(--calcite-color-brand-press)}:host([focused]) .radio{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([disabled]) .radio{cursor:default;opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hovered][disabled]) .radio{box-shadow:inset 0 0 0 var(--calcite-border-width-sm) var(--calcite-radio-button-border-color, var(--calcite-color-border-input))}:host([scale=s]){--calcite-internal-radio-size: var( --calcite-radio-button-size, var(--calcite-radio-size, var(--calcite-size-fixed-md)) )}:host([scale=m]){--calcite-internal-radio-size: var( --calcite-radio-button-size, var(--calcite-radio-size, var(--calcite-size-fixed-md-plus)) )}:host([scale=l]){--calcite-internal-radio-size: var( --calcite-radio-button-size, var(--calcite-radio-size, var(--calcite-size-fixed-lg)) )}.radio{block-size:var(--calcite-internal-radio-size);inline-size:var(--calcite-internal-radio-size);size:var(--calcite-internal-radio-size)}:host([scale=s][checked]) .radio,:host([hovered][scale=s][checked][disabled]) .radio{box-shadow:inset 0 0 0 var(--calcite-border-width-lg) var(--calcite-radio-button-border-color, var(--calcite-color-brand))}:host([scale=s][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 var(--calcite-border-width-lg) var(--calcite-radio-button-border-color, var(--calcite-color-brand)),0 0 0 2px var(--calcite-radio-button-background-color, var(--calcite-color-foreground-1))}:host([scale=m][checked]) .radio,:host([hovered][scale=m][checked][disabled]) .radio{box-shadow:inset 0 0 0 5px var(--calcite-radio-button-border-color, var(--calcite-color-brand))}:host([scale=m][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 5px var(--calcite-radio-button-border-color, var(--calcite-color-brand)),0 0 0 2px var(--calcite-radio-button-background-color, var(--calcite-color-foreground-1))}:host([scale=l][checked]) .radio,:host([hovered][scale=l][checked][disabled]) .radio{box-shadow:inset 0 0 0 6px var(--calcite-radio-button-border-color, var(--calcite-color-brand))}:host([scale=l][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 6px var(--calcite-radio-button-border-color, var(--calcite-color-brand)),0 0 0 2px var(--calcite-radio-button-background-color, var(--calcite-color-foreground-1))}@media (forced-colors: active){:host([checked]) .radio:after,:host([checked][disabled]) .radio:after{content:"";inline-size:var(--calcite-internal-radio-size);block-size:var(--calcite-internal-radio-size);background-color:windowText;display:block}}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class q extends p {
  constructor() {
    super(), this.checked = !1, this.disabled = !1, this.focused = !1, this.hovered = !1, this.required = !1, this.scale = "m", this.calciteInternalRadioButtonBlur = r({ cancelable: !1 }), this.calciteInternalRadioButtonCheckedChange = r({ cancelable: !1 }), this.calciteInternalRadioButtonFocus = r({ cancelable: !1 }), this.calciteRadioButtonChange = r({ cancelable: !1 }), this.listen("pointerenter", this.pointerEnterHandler), this.listen("pointerleave", this.pointerLeaveHandler), this.listen("click", this.clickHandler), this.listen("keydown", this.handleKeyDown);
  }
  static {
    this.properties = { checked: 7, disabled: 7, focused: 7, form: 3, hovered: 7, label: 1, name: 3, required: 7, scale: 3, value: 1 };
  }
  static {
    this.styles = E;
  }
  async emitCheckedChange() {
    this.calciteInternalRadioButtonCheckedChange.emit();
  }
  async setFocus() {
    await L(this), this.disabled || B(this.containerEl);
  }
  connectedCallback() {
    this.rootNode = this.el.getRootNode(), this.name && this.checkLastRadioButton(), z(this), w(this), this.updateTabIndexOfOtherRadioButtonsInGroup(), super.connectedCallback();
  }
  willUpdate(e) {
    this.hasUpdated && e.has("checked") && this.checkedChanged(this.checked), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.updateTabIndexOfOtherRadioButtonsInGroup(), e.has("name") && this.checkLastRadioButton();
  }
  updated() {
    R(this);
  }
  loaded() {
    this.focused && !this.disabled && this.setFocus();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), A(this), y(this), this.updateTabIndexOfOtherRadioButtonsInGroup();
  }
  checkedChanged(e) {
    e && this.uncheckOtherRadioButtonsInGroup(), this.calciteInternalRadioButtonCheckedChange.emit();
  }
  syncHiddenFormInput(e) {
    e.type = "radio";
  }
  selectItem(e, o) {
    e[o].click();
  }
  queryButtons() {
    return Array.from(this.rootNode.querySelectorAll("calcite-radio-button:not([hidden])")).filter((e) => e.name === this.name);
  }
  isFocusable() {
    const e = this.queryButtons(), o = e.find((i) => !i.disabled), t = e.find((i) => i.checked);
    return o === this.el && !t;
  }
  check() {
    this.disabled || (this.focused = !0, this.setFocus(), !this.checked && (this.uncheckAllRadioButtonsInGroup(), this.checked = !0, this.calciteRadioButtonChange.emit()));
  }
  clickHandler() {
    this.disabled || this.check();
  }
  onLabelClick(e) {
    if (this.disabled || this.el.hidden)
      return;
    const o = e.currentTarget, t = o.for ? this.rootNode.querySelector(`calcite-radio-button[id="${o.for}"]`) : o.querySelector(`calcite-radio-button[name="${this.name}"]`);
    t && (t.focused = !0, this.setFocus(), !t.checked && (this.uncheckOtherRadioButtonsInGroup(), t.checked = !0, this.calciteRadioButtonChange.emit()));
  }
  checkLastRadioButton() {
    const o = this.queryButtons().filter((t) => t.checked);
    if (o?.length > 1) {
      const t = o[o.length - 1];
      o.filter((i) => i !== t).forEach((i) => {
        i.checked = !1, i.emitCheckedChange();
      });
    }
  }
  setContainerEl(e) {
    this.containerEl = e;
  }
  uncheckAllRadioButtonsInGroup() {
    this.queryButtons().forEach((o) => {
      o.checked && (o.checked = !1, o.focused = !1);
    });
  }
  uncheckOtherRadioButtonsInGroup() {
    this.queryButtons().filter((t) => t !== this.el).forEach((t) => {
      t.checked && (t.checked = !1, t.focused = !1);
    });
  }
  updateTabIndexOfOtherRadioButtonsInGroup() {
    this.queryButtons().filter((t) => t !== this.el && !t.disabled).forEach((t) => {
      t.manager?.component.requestUpdate();
    });
  }
  getTabIndex() {
    if (!this.disabled)
      return this.checked || this.isFocusable() ? 0 : -1;
  }
  pointerEnterHandler() {
    this.disabled || (this.hovered = !0);
  }
  pointerLeaveHandler() {
    this.disabled || (this.hovered = !1);
  }
  handleKeyDown(e) {
    const o = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "], { key: t } = e, { el: i } = this;
    if (o.indexOf(t) === -1)
      return;
    if (t === " ") {
      this.check(), e.preventDefault();
      return;
    }
    let c = t;
    x(i) === "rtl" && (t === "ArrowRight" && (c = "ArrowLeft"), t === "ArrowLeft" && (c = "ArrowRight"));
    const a = Array.from(this.rootNode.querySelectorAll("calcite-radio-button:not([hidden])")).filter((n) => n.name === this.name);
    let s = 0;
    const d = a.length;
    switch (a.some((n, b) => {
      if (n.checked)
        return s = b, !0;
    }), c) {
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault(), this.selectItem(a, h(Math.max(s - 1, -1), d));
        return;
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault(), this.selectItem(a, h(s + 1, d));
        return;
      default:
        return;
    }
  }
  onContainerBlur() {
    this.focused = !1, this.calciteInternalRadioButtonBlur.emit();
  }
  onContainerFocus() {
    this.disabled || (this.focused = !0, this.calciteInternalRadioButtonFocus.emit());
  }
  render() {
    const e = this.getTabIndex();
    return C({ disabled: this.disabled, children: m`<div .ariaChecked=${this.checked} .ariaLabel=${F(this)} class=${l(u.container)} @blur=${this.onContainerBlur} @focus=${this.onContainerFocus} role=radio tabindex=${e ?? v} ${g(this.setContainerEl)}><div class=${l(u.radio)}></div></div>${I({ component: this })}` });
  }
}
k("calcite-radio-button", q);
export {
  q as RadioButton
};
