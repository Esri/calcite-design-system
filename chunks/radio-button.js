/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as u, L as b, c, A as f, s as n, b as v, d as p } from "./index.js";
import { e as m, n as g } from "./ref.js";
import { u as k } from "./index2.js";
import { g as l } from "./array.js";
import { g as x } from "./label.js";
import { u as w } from "./useLabel.js";
import { I as y } from "./InternalLabel.js";
import { u as B } from "./useSetFocus.js";
import { u as I } from "./useInteractive.js";
import { u as R } from "./useForm.js";
const d = {
  container: "container",
  radio: "radio"
}, C = u`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;cursor:pointer}:host .container{position:relative;outline:2px solid transparent;outline-offset:2px;display:flex}:host .radio{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;cursor:pointer;outline-color:transparent;border-radius:var(--calcite-radio-button-corner-radius, var(--calcite-corner-radius-pill));background-color:var(--calcite-radio-button-background-color, var(--calcite-color-foreground-1));box-shadow:inset 0 0 0 var(--calcite-border-width-sm) var(--calcite-radio-button-border-color, var(--calcite-color-border-input))}:host([hovered]) .radio,:host(:not([checked])[focused]:not([disabled])) .radio{box-shadow:inset 0 0 0 var(--calcite-border-width-md) var(--calcite-radio-button-border-color, var(--calcite-color-brand-hover))}:host([hovered]) .radio:active,:host(:not([checked])[focused]:not([disabled])) .radio:active{box-shadow:inset 0 0 0 var(--calcite-border-width-md) var(--calcite-color-brand-press)}:host([focused]) .radio{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([disabled]) .radio{cursor:default;opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hovered][disabled]) .radio{box-shadow:inset 0 0 0 var(--calcite-border-width-sm) var(--calcite-radio-button-border-color, var(--calcite-color-border-input))}:host([scale=s]){--calcite-internal-radio-size: var(--calcite-radio-button-size, var(--calcite-size-fixed-md))}:host([scale=m]){--calcite-internal-radio-size: var(--calcite-radio-button-size, var(--calcite-size-fixed-md-plus))}:host([scale=l]){--calcite-internal-radio-size: var(--calcite-radio-button-size, var(--calcite-size-fixed-lg))}.radio{block-size:var(--calcite-internal-radio-size);inline-size:var(--calcite-internal-radio-size);size:var(--calcite-internal-radio-size)}:host([scale=s][checked]) .radio,:host([hovered][scale=s][checked][disabled]) .radio{box-shadow:inset 0 0 0 var(--calcite-border-width-lg) var(--calcite-radio-button-border-color, var(--calcite-color-brand))}:host([scale=s][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 var(--calcite-border-width-lg) var(--calcite-radio-button-border-color, var(--calcite-color-brand)),0 0 0 2px var(--calcite-radio-button-background-color, var(--calcite-color-foreground-1))}:host([scale=m][checked]) .radio,:host([hovered][scale=m][checked][disabled]) .radio{box-shadow:inset 0 0 0 5px var(--calcite-radio-button-border-color, var(--calcite-color-brand))}:host([scale=m][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 5px var(--calcite-radio-button-border-color, var(--calcite-color-brand)),0 0 0 2px var(--calcite-radio-button-background-color, var(--calcite-color-foreground-1))}:host([scale=l][checked]) .radio,:host([hovered][scale=l][checked][disabled]) .radio{box-shadow:inset 0 0 0 6px var(--calcite-radio-button-border-color, var(--calcite-color-brand))}:host([scale=l][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 6px var(--calcite-radio-button-border-color, var(--calcite-color-brand)),0 0 0 2px var(--calcite-radio-button-background-color, var(--calcite-color-foreground-1))}:host([status=invalid]:not([checked])){--calcite-radio-button-border-color: var(--calcite-color-status-danger)}:host([status=invalid]:not([checked]):focus) .radio{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}@media(forced-colors:active){:host([checked]) .radio:after,:host([checked][disabled]) .radio:after{content:"";inline-size:var(--calcite-internal-radio-size);block-size:var(--calcite-internal-radio-size);background-color:CanvasText;display:block}}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}:host([hidden]){display:none}[hidden]{display:none}`;
class z extends b {
  constructor() {
    super(), this.containerRef = m(), this.direction = k(), this.formSupport = R({ inputType: "radio" })(this), this.focusSetter = B()(this), this.interactiveContainer = I(this), this.checked = !1, this.disabled = !1, this.focused = !1, this.hovered = !1, this.required = !1, this.scale = "m", this.status = "idle", this.calciteInternalRadioButtonBlur = c({ cancelable: !1 }), this.calciteInternalRadioButtonCheckedChange = c({ cancelable: !1 }), this.calciteInternalRadioButtonFocus = c({ cancelable: !1 }), this.calciteRadioButtonChange = c({ cancelable: !1 }), w(this), this.listen("pointerenter", this.pointerEnterHandler), this.listen("pointerleave", this.pointerLeaveHandler), this.listen("click", this.clickHandler), this.listen("keydown", this.handleKeyDown);
  }
  static {
    this.properties = { checked: 7, disabled: 7, focused: 7, form: 3, hovered: 7, label: 1, labelText: 1, name: 3, required: 7, scale: 3, status: 3, validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = C;
  }
  async emitCheckedChange() {
    this.calciteInternalRadioButtonCheckedChange.emit();
  }
  async setFocus(e) {
    return this.focusSetter(() => this.containerRef.value, e);
  }
  async setValidity(e, i = this.validationMessage) {
    this.elementInternals.setValidity(e, i || "");
  }
  connectedCallback() {
    this.rootNode = this.el.getRootNode(), this.name && this.checkLastRadioButton(), this.updateTabIndexOfOtherRadioButtonsInGroup(), super.connectedCallback();
  }
  willUpdate(e) {
    this.hasUpdated && e.has("checked") && this.checkedChanged(this.checked), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.updateTabIndexOfOtherRadioButtonsInGroup(), e.has("name") && this.checkLastRadioButton();
  }
  loaded() {
    this.focused && !this.disabled && this.setFocus();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.updateTabIndexOfOtherRadioButtonsInGroup();
  }
  checkedChanged(e) {
    e && this.uncheckOtherRadioButtonsInGroup(), this.calciteInternalRadioButtonCheckedChange.emit();
  }
  selectItem(e, i) {
    e[i].click();
  }
  queryButtons() {
    return Array.from(this.rootNode.querySelectorAll("calcite-radio-button:not([hidden])")).filter((e) => e.name === this.name);
  }
  isFocusable() {
    const e = this.queryButtons(), i = e.find((a) => !a.disabled), t = e.find((a) => a.checked);
    return i === this.el && !t;
  }
  check() {
    this.disabled || (this.focused = !0, this.setFocus(), !this.checked && (this.checked = !0, this.calciteRadioButtonChange.emit()));
  }
  clickHandler() {
    this.disabled || this.check();
  }
  onLabelClick(e) {
    if (this.disabled || this.el.hidden)
      return;
    const i = e.currentTarget, t = i.for ? this.rootNode.querySelector(`calcite-radio-button[id="${i.for}"]`) : i.querySelector(`calcite-radio-button[name="${this.name}"]`);
    t && (t.focused = !0, this.setFocus(), !t.checked && (this.uncheckOtherRadioButtonsInGroup(), t.checked = !0, this.calciteRadioButtonChange.emit()));
  }
  checkLastRadioButton() {
    const i = this.queryButtons().filter((t) => t.checked);
    if (i?.length > 1) {
      const t = i[i.length - 1];
      i.filter((a) => a !== t).forEach((a) => {
        a.checked = !1, a.emitCheckedChange();
      });
    }
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
    const i = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "], { key: t } = e;
    if (i.indexOf(t) === -1)
      return;
    if (t === " ") {
      this.check(), e.preventDefault();
      return;
    }
    let a = t;
    this.direction === "rtl" && (t === "ArrowRight" && (a = "ArrowLeft"), t === "ArrowLeft" && (a = "ArrowRight"));
    const o = Array.from(this.rootNode.querySelectorAll("calcite-radio-button:not([hidden])")).filter((s) => s.name === this.name);
    let r = 0;
    switch (o.some((s, h) => s.checked ? (r = h, !0) : !1), a) {
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault(), this.selectItem(o, this.getNextNonDisabledIndex(o, r, "left"));
        return;
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault(), this.selectItem(o, this.getNextNonDisabledIndex(o, r, "right"));
        return;
      default:
        return;
    }
  }
  getNextNonDisabledIndex(e, i, t) {
    const a = e.length, o = t === "left" ? -1 : 1;
    let r = l(i + o, a);
    for (; e[r].disabled; )
      r = l(r + o, a);
    return r;
  }
  onContainerBlur() {
    this.focused = !1, this.calciteInternalRadioButtonBlur.emit();
  }
  onContainerFocus() {
    this.disabled || (this.focused = !0, this.calciteInternalRadioButtonFocus.emit());
  }
  render() {
    const e = this.getTabIndex();
    return this.interactiveContainer({ disabled: this.disabled, children: v`<div .ariaChecked=${this.checked} .ariaLabel=${x(this)} class=${n(d.container)} @blur=${this.onContainerBlur} @focus=${this.onContainerFocus} role=radio tabindex=${e ?? f} ${g(this.containerRef)}><div class=${n(d.radio)}></div>${this.labelText && y({ labelText: this.labelText, spacingInlineStart: !0 }) || ""}</div>` });
  }
}
p("calcite-radio-button", z);
export {
  z as RadioButton
};
