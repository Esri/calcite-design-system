import { b as c, L as n, c as l, s as t, x as s, q as r } from "./index.js";
import { e as o, n as d } from "./ref.js";
import { c as h, d as b, H as m } from "./form.js";
import { u as p, I as u } from "./interactive.js";
import { i as g } from "./key.js";
import { c as v, d as k, g as f } from "./label.js";
import { I as i } from "./InternalLabel.js";
import { u as w } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const a = {
  container: "container",
  track: "track",
  handle: "handle"
}, x = c`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .container{block-size:.75rem}:host([scale=s]) .track{block-size:.75rem;inline-size:1.5rem}:host([scale=s]) .handle{block-size:.5rem;inline-size:.5rem}:host([scale=m]) .container{block-size:1rem}:host([scale=m]) .track{block-size:1rem;inline-size:2rem}:host([scale=m]) .handle{block-size:.75rem;inline-size:.75rem}:host([scale=l]) .container{block-size:1.5rem}:host([scale=l]) .track{block-size:1.5rem;inline-size:3rem}:host([scale=l]) .handle{block-size:1.25rem;inline-size:1.25rem}:host{position:relative;display:inline-block;inline-size:auto;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:middle;tap-highlight-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{outline-width:0px;display:flex}.track{pointer-events:none;position:relative;box-sizing:border-box;display:inline-block;vertical-align:top;outline-color:transparent;border-radius:var(--calcite-switch-corner-radius, 9999px);border-color:var(--calcite-switch-border-color);background-color:var(--calcite-switch-background-color, var(--calcite-color-border-input))}.container:focus .track{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container:hover .track{background-color:var(--calcite-switch-background-color-hover, var(--calcite-color-text-3))}.handle{pointer-events:none;position:absolute;display:block;transition-property:all;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1);inset-block-start:var(--calcite-spacing-base);inset-inline:var(--calcite-spacing-base) auto;background-color:var(--calcite-switch-handle-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-switch-handle-border-color);border-radius:var(--calcite-switch-corner-radius, 9999px);box-shadow:var(--calcite-switch-handle-shadow)}:host([checked]) .track{background-color:var(--calcite-switch-background-color, var(--calcite-color-brand))}:host([checked]) .handle{inset-inline:auto var(--calcite-spacing-base)}:host([checked]):host(:hover:not([disabled])) .track{background-color:var(--calcite-switch-background-color-hover, var(--calcite-color-brand-hover))}@media (forced-colors: active){:host([checked]) .track{background-color:canvasText}}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class y extends n {
  constructor() {
    super(), this.switchRef = o(), this.focusSetter = w()(this), this.checked = !1, this.disabled = !1, this.scale = "m", this.calciteSwitchChange = l({ cancelable: !1 }), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { checked: 7, disabled: 7, form: 3, label: 1, labelTextEnd: 1, labelTextStart: 1, name: 3, scale: 3, value: 1 };
  }
  static {
    this.styles = x;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.switchRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), v(this), h(this);
  }
  updated() {
    p(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), k(this), b(this);
  }
  syncHiddenFormInput(e) {
    e.type = "checkbox";
  }
  keyDownHandler(e) {
    !this.disabled && g(e.key) && (this.toggle(), e.preventDefault());
  }
  onLabelClick() {
    this.disabled || (this.toggle(), this.setFocus());
  }
  toggle() {
    this.checked = !this.checked, this.calciteSwitchChange.emit();
  }
  clickHandler() {
    this.disabled || this.toggle();
  }
  render() {
    return u({ disabled: this.disabled, children: s`<div .ariaChecked=${this.checked} .ariaLabel=${f(this)} class=${t(a.container)} role=switch tabindex=0 ${d(this.switchRef)}>${this.labelTextStart && i({ alignmentCenter: !0, bottomSpacingDisabled: !0, labelText: this.labelTextStart, spacingInlineEnd: !0 }) || ""}<div class=${t(a.track)}><div class=${t(a.handle)}></div></div>${this.labelTextEnd && i({ alignmentCenter: !0, bottomSpacingDisabled: !0, labelText: this.labelTextEnd, spacingInlineStart: !0 }) || ""}${m({ component: this })}</div>` });
  }
}
r("calcite-switch", y);
export {
  y as Switch
};
