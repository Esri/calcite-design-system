import { h as c, L as a, k as t, s as o, y as i, C as l, d as n, x as r, j as h } from "./iframe.js";
import { e as d, n as g } from "./ref.js";
import { g as b } from "./dom.js";
import { c as u, d as k, H as p } from "./form.js";
import { u as m, I as f } from "./interactive.js";
import { i as v } from "./key.js";
import { c as x, d as y, g as C } from "./label.js";
import { c as z } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const s = {
  toggle: "toggle",
  check: "check-svg"
}, w = c`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .check-svg,:host([scale=s]) .toggle{inline-size:var(--calcite-checkbox-size, .75rem);block-size:var(--calcite-checkbox-size, .75rem)}:host([scale=m]) .check-svg,:host([scale=m]) .toggle{inline-size:var(--calcite-checkbox-size, var(--calcite-font-size--1));block-size:var(--calcite-checkbox-size, var(--calcite-font-size--1))}:host([scale=l]) .check-svg,:host([scale=l]) .toggle{inline-size:var(--calcite-checkbox-size, 1rem);block-size:var(--calcite-checkbox-size, 1rem)}:host{position:relative;display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host .check-svg{pointer-events:none;box-sizing:border-box;display:block;overflow:hidden;background-color:var(--calcite-color-foreground-1);fill:currentColor;stroke:currentColor;stroke-width:1;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;box-shadow:inset 0 0 0 1px var(--calcite-checkbox-border-color, var(--calcite-color-border-input));color:var(--calcite-checkbox-icon-color, var(--calcite-color-background))}:host([status=invalid]:not([checked])) .check-svg{box-shadow:inset 0 0 0 1px var(--calcite-color-status-danger)}:host([status=invalid]:not([checked])) .toggle:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-color-brand);box-shadow:inset 0 0 0 1px var(--calcite-color-brand)}:host([hovered]) .toggle .check-svg,:host .toggle:hover .check-svg{box-shadow:inset 0 0 0 2px var(--calcite-checkbox-border-color-hover, var(--calcite-color-brand))}.toggle{position:relative;outline-color:transparent}.toggle:active,.toggle:focus,.toggle:focus-visible{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.toggle:after,.toggle:before{inset-block-start:50%;inset-inline-start:50%;min-block-size:1.5rem;min-inline-size:1.5rem;position:absolute}.toggle:not(.calcite--rtl):after{content:"";transform:translate(-50%) translateY(-50%)}.toggle.calcite--rtl:before{content:"";transform:translate(50%) translateY(-50%)}@media (forced-colors: active){.check-svg{border:1px solid currentColor}}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class I extends a {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z", this.indeterminatePath = "M13 8v1H3V8z", this.onLabelClick = () => {
      this.toggle();
    }, this.toggleEl = d(), this.checked = !1, this.disabled = !1, this.hovered = !1, this.indeterminate = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    }, this.calciteCheckboxChange = t({ cancelable: !1 }), this.calciteInternalCheckboxBlur = t({ cancelable: !1 }), this.calciteInternalCheckboxFocus = t({ cancelable: !1 }), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { checked: 7, disabled: 7, form: 3, hovered: 7, indeterminate: 7, label: 1, name: 3, required: 7, scale: 3, status: 3, validity: 0, value: 1 };
  }
  static {
    this.styles = w;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await z(this), this.toggleEl.value?.focus();
  }
  connectedCallback() {
    super.connectedCallback(), x(this), u(this);
  }
  updated() {
    m(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), y(this), k(this);
  }
  // #endregion
  // #region Private Methods
  syncHiddenFormInput(e) {
    e.type = "checkbox";
  }
  getPath() {
    return this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";
  }
  toggle() {
    this.disabled || (this.checked = !this.checked, this.setFocus(), this.indeterminate = !1, this.calciteCheckboxChange.emit());
  }
  keyDownHandler(e) {
    v(e.key) && (this.toggle(), e.preventDefault());
  }
  clickHandler() {
    this.toggle();
  }
  onToggleBlur() {
    this.calciteInternalCheckboxBlur.emit(!1);
  }
  onToggleFocus() {
    this.calciteInternalCheckboxFocus.emit(!0);
  }
  // #endregion
  // #region Rendering
  render() {
    const e = b(this.el) === "rtl";
    return f({ disabled: this.disabled, children: r`<div .ariaChecked=${this.checked} .ariaLabel=${C(this)} class=${o({
      [s.toggle]: !0,
      [l.rtl]: e
    })} @blur=${this.onToggleBlur} @focus=${this.onToggleFocus} role=checkbox tabindex=${(this.disabled ? void 0 : 0) ?? i} ${g(this.toggleEl)}><svg aria-hidden=true class=${o(s.check)} viewBox="0 0 16 16">${n`<path d=${this.getPath() ?? i} />`}</svg><slot></slot></div>${p({ component: this })}` });
  }
}
h("calcite-checkbox", I);
export {
  I as Checkbox
};
