/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as c, L as l, d as s, s as a, b as n, f as r } from "./index.js";
import { e as o, n as d } from "./ref.js";
import { i as h } from "./key.js";
import { g as b } from "./label.js";
import { u as v } from "./useLabel.js";
import { I as i } from "./InternalLabel.js";
import { u as m } from "./useFocusable.js";
import { u as p } from "./useInteractive.js";
import { u } from "./useForm.js";
const t = {
  container: "container",
  track: "track",
  handle: "handle"
}, g = c`:host([disabled]){opacity:var(--calcite-opacity-disabled);cursor:default;-webkit-user-select:none;user-select:none}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .container{block-size:var(--calcite-space-md)}:host([scale=s]) .track{block-size:var(--calcite-space-md);inline-size:var(--calcite-space-2xl)}:host([scale=s]) .handle{block-size:var(--calcite-space-sm);inline-size:var(--calcite-space-sm)}:host([scale=m]) .container{block-size:var(--calcite-space-lg)}:host([scale=m]) .track{block-size:var(--calcite-space-lg);inline-size:var(--calcite-space-3xl)}:host([scale=m]) .handle{block-size:var(--calcite-space-md);inline-size:var(--calcite-space-md)}:host([scale=l]) .container{block-size:var(--calcite-space-2xl)}:host([scale=l]) .track{block-size:var(--calcite-space-2xl);inline-size:3rem}:host([scale=l]) .handle{block-size:var(--calcite-space-xl);inline-size:var(--calcite-space-xl)}:host{position:relative;display:inline-block;inline-size:auto;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:middle;tap-highlight-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:var(--calcite-opacity-full)}.interaction-container{display:contents}.container{outline:none;display:flex}.track{pointer-events:none;position:relative;box-sizing:border-box;display:inline-block;vertical-align:top;outline-color:var(--calcite-color-transparent);border-radius:var(--calcite-switch-corner-radius, 9999px);border-color:var(--calcite-switch-border-color);background-color:var(--calcite-switch-background-color, var(--calcite-color-border-input))}.container:focus .track{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}.container:hover .track{background-color:var(--calcite-switch-background-color-hover, var(--calcite-color-text-3))}.handle{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;pointer-events:none;position:absolute;display:block;transition-timing-function:var(--calcite-animation-easing-function);inset-block-start:var(--calcite-theme-space-base, var(--calcite-spacing-base));inset-inline:var(--calcite-theme-space-base, var(--calcite-spacing-base)) auto;background-color:var(--calcite-switch-handle-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));border-color:var(--calcite-switch-handle-border-color);border-radius:var(--calcite-switch-corner-radius, 9999px);box-shadow:var(--calcite-switch-handle-shadow)}:host([checked]) .track{background-color:var(--calcite-switch-background-color, var(--calcite-color-brand))}:host([checked]) .handle{inset-inline:auto var(--calcite-theme-space-base, var(--calcite-spacing-base))}:host([checked]):host(:hover:not([disabled])) .track{background-color:var(--calcite-switch-background-color-hover, var(--calcite-color-brand-hover))}@media(forced-colors:active){.container:focus-visible{outline:var(--calcite-border-width-md) solid transparent;outline-offset:var(--calcite-border-width-md)}.track,.handle{outline:var(--calcite-border-width-md) solid transparent;outline-offset:var(--calcite-border-width-md)}:host([checked]) .track{background-color:canvasText}:host([checked]) .handle{outline:none}:host([checked]):host(:hover:not([disabled])) .track{background-color:canvasText}}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-theme-space-base, var(--calcite-spacing-base))}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}:host([hidden]){display:none}[hidden]{display:none}`;
class k extends l {
  constructor() {
    super(), this.formSupport = u({
      inputType: "checkbox"
    })(this), this.switchRef = o(), this.focusSetter = m()(this).setFocus, this.interactiveContainer = p(this), this.checked = !1, this.disabled = !1, this.required = !1, this.scale = "m", this.calciteSwitchChange = s({ cancelable: !1 }), v(this), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { checked: 7, disabled: 7, form: 3, label: 1, labelTextEnd: 1, labelTextStart: 1, name: 3, required: 7, scale: 3, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = g;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.switchRef.value, e);
  }
  keyDownHandler(e) {
    !this.disabled && h(e.key) && (this.toggle(), e.preventDefault());
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
    return this.interactiveContainer({ disabled: this.disabled, children: n`<div .ariaChecked=${this.checked} .ariaLabel=${b(this)} class=${a(t.container)} role=switch tabindex=0 ${d(this.switchRef)}>${this.labelTextStart && i({ alignmentCenter: !0, bottomSpacingDisabled: !0, labelText: this.labelTextStart, spacingInlineEnd: !0 }) || ""}<div class=${a(t.track)}><div class=${a(t.handle)}></div></div>${this.labelTextEnd && i({ alignmentCenter: !0, bottomSpacingDisabled: !0, labelText: this.labelTextEnd, spacingInlineStart: !0 }) || ""}</div>` });
  }
}
r("calcite-switch", k);
export {
  k as Switch
};
