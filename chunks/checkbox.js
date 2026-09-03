/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as s, L as o, c as t, I as i, s as a, F as l, w as r, b as n, d as h } from "./index.js";
import { e as d, n as g } from "./ref.js";
import { u as b } from "./index2.js";
import { i as v } from "./key.js";
import { g as u } from "./label.js";
import { I as m } from "./InternalLabel.js";
import { u as k } from "./useT9n.js";
import { u as p } from "./useSetFocus.js";
import { u as f } from "./useInteractive.js";
import { u as x } from "./useForm.js";
import { u as z } from "./useLabel.js";
const c = {
  toggle: "toggle",
  check: "check-svg"
}, w = s`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .check-svg,:host([scale=s]) .toggle{inline-size:var(--calcite-checkbox-size, .75rem);block-size:var(--calcite-checkbox-size, .75rem)}:host([scale=m]) .check-svg,:host([scale=m]) .toggle{inline-size:var(--calcite-checkbox-size, var(--calcite-font-size-relative-base));block-size:var(--calcite-checkbox-size, var(--calcite-font-size-relative-base))}:host([scale=l]) .check-svg,:host([scale=l]) .toggle{inline-size:var(--calcite-checkbox-size, 1rem);block-size:var(--calcite-checkbox-size, 1rem)}:host{position:relative;display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host .check-svg{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;pointer-events:none;box-sizing:border-box;display:block;overflow:hidden;background-color:var(--calcite-color-foreground-1);fill:currentColor;stroke:currentColor;stroke-width:1;box-shadow:inset 0 0 0 1px var(--calcite-checkbox-border-color, var(--calcite-color-border-input));color:var(--calcite-checkbox-icon-color, var(--calcite-color-background))}:host([status=invalid]:not([checked])) .check-svg{box-shadow:inset 0 0 0 1px var(--calcite-color-status-danger)}:host([status=invalid]:not([checked])) .toggle:hover .check-svg{box-shadow:inset 0 0 0 2px var(--calcite-color-status-danger)}:host([status=invalid]:not([checked])) .toggle:active .check-svg{box-shadow:inset 0 0 0 2px var(--calcite-color-brand-press)}:host([status=invalid]:not([checked])) .toggle:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-color-brand);box-shadow:inset 0 0 0 1px var(--calcite-color-brand)}:host([checked]) .toggle:hover .check-svg,:host([indeterminate]) .toggle:hover .check-svg{background-color:var(--calcite-checkbox-border-color-hover, var(--calcite-color-brand-hover))}:host([checked]) .toggle:active .check-svg,:host([indeterminate]) .toggle:active .check-svg{background-color:var(--calcite-checkbox-border-color-press, var(--calcite-color-brand-press));box-shadow:inset 0 0 0 2px var(--calcite-checkbox-border-color-press, var(--calcite-color-brand-press))}:host([hovered]) .toggle .check-svg,:host .toggle:hover .check-svg{box-shadow:inset 0 0 0 2px var(--calcite-checkbox-border-color-hover, var(--calcite-color-brand-hover))}.toggle:active .check-svg{box-shadow:inset 0 0 0 2px var(--calcite-checkbox-border-color-press, var(--calcite-color-brand-press))}.toggle{position:relative;outline-color:transparent}.toggle:active,.toggle:focus,.toggle:focus-visible{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.toggle:after,.toggle:before{inset-block-start:50%;inset-inline-start:50%;min-block-size:1.5rem;min-inline-size:1.5rem;position:absolute}.toggle:not(.calcite--rtl):after{content:"";transform:translate(-50%) translateY(-50%)}.toggle.calcite--rtl:before{content:"";transform:translate(50%) translateY(-50%)}@media(forced-colors:active){.check-svg{border:1px solid currentColor}}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class y extends o {
  constructor() {
    super(), this.checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z", this.direction = b(), this.formSupport = x({ inputType: "checkbox" })(this), this.indeterminatePath = "M13 8v1H3V8z", this.onLabelClick = () => {
      this.toggle();
    }, this.toggleRef = d(), this.messages = k(), this.focusSetter = p()(this), this.interactiveContainer = f(this), this.checked = !1, this.disabled = !1, this.hovered = !1, this.indeterminate = !1, this.required = !1, this.scale = "m", this.status = "idle", this.calciteCheckboxChange = t({ cancelable: !1 }), this.calciteInternalCheckboxBlur = t({ cancelable: !1 }), this.calciteInternalCheckboxFocus = t({ cancelable: !1 }), z(this), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { checked: 7, disabled: 7, form: 3, hovered: 7, indeterminate: 7, label: 1, labelText: 1, messageOverrides: 0, name: 3, required: 7, scale: 3, status: 3, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = w;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.toggleRef.value, e);
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
  render() {
    const e = this.direction === "rtl";
    return this.interactiveContainer({ disabled: this.disabled, children: n`<div .ariaChecked=${this.checked} .ariaLabel=${u(this)} .ariaRequired=${this.required} class=${a({
      [c.toggle]: !0,
      [l.rtl]: e
    })} @blur=${this.onToggleBlur} @focus=${this.onToggleFocus} role=checkbox tabindex=${(this.disabled ? void 0 : 0) ?? i} ${g(this.toggleRef)}><svg aria-hidden=true class=${a(c.check)} viewBox="0 0 16 16">${r`<path d=${this.getPath() ?? i} />`}</svg><slot></slot></div>${this.labelText && m({ bottomSpacingDisabled: !0, labelText: this.labelText, required: this.required, spacingInlineStart: !0, tooltipText: this.messages.required }) || ""}` });
  }
}
h("calcite-checkbox", y);
export {
  y as Checkbox
};
