import { j as i, L as c, n as a, x as r, s as t, k as s } from "./iframe.js";
import { n as l } from "./ref.js";
import { a as n } from "./dom.js";
import { c as d, d as h, H as b } from "./form.js";
import { u as p, I as m } from "./interactive.js";
import { i as u } from "./key.js";
import { c as k, d as v, g as w } from "./label.js";
import { c as f } from "./component.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.5 */
const o = {
  container: "container",
  track: "track",
  handle: "handle"
}, g = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .container{block-size:.75rem}:host([scale=s]) .track{block-size:.75rem;inline-size:1.5rem}:host([scale=s]) .handle{block-size:.5rem;inline-size:.5rem}:host([scale=m]) .container{block-size:1rem}:host([scale=m]) .track{block-size:1rem;inline-size:2rem}:host([scale=m]) .handle{block-size:.75rem;inline-size:.75rem}:host([scale=l]) .container{block-size:1.5rem}:host([scale=l]) .track{block-size:1.5rem;inline-size:3rem}:host([scale=l]) .handle{block-size:1.25rem;inline-size:1.25rem}:host{position:relative;display:inline-block;inline-size:auto;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:middle;tap-highlight-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{outline-width:0px}.track{pointer-events:none;position:relative;box-sizing:border-box;display:inline-block;border-width:1px;border-style:solid;vertical-align:top;outline-color:transparent;border-radius:var(--calcite-switch-corner-radius, 9999px);border-color:var(--calcite-switch-border-color, var(--calcite-color-border-2));background-color:var(--calcite-switch-background-color, var(--calcite-color-foreground-2))}.container:focus .track{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.handle{pointer-events:none;position:absolute;display:block;border-width:2px;border-style:solid;transition-property:all;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);inset-block-start:-1px;inset-inline:-1px auto;background-color:var(--calcite-switch-handle-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-switch-handle-border-color, var(--calcite-color-border-input));border-radius:var(--calcite-switch-corner-radius, 9999px);box-shadow:var(--calcite-switch-handle-shadow)}:host(:hover:not([disabled])) .handle,:host(:focus:not([disabled])) .handle{border-color:var(--calcite-switch-handle-border-color, var(--calcite-color-brand));box-shadow:var(--calcite-switch-handle-shadow, inset 0 0 0 1px var(--calcite-color-brand))}:host([checked]) .track{border-color:var(--calcite-switch-border-color, var(--calcite-color-brand-hover));background-color:var(--calcite-switch-background-color, var(--calcite-color-brand))}:host([checked]) .handle{border-color:var(--calcite-switch-handle-border-color, var(--calcite-color-brand));inset-inline:auto -1px}:host([checked]):host(:hover:not([disabled])) .handle{border-color:var(--calcite-switch-handle-border-color, var(--calcite-color-brand-hover));box-shadow:var(--calcite-switch-handle-shadow, inset 0 0 0 1px var(--calcite-color-brand-hover))}@media (forced-colors: active){:host([checked]) .track{background-color:canvasText}}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
class x extends c {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.checked = !1, this.disabled = !1, this.scale = "m", this.calciteSwitchChange = a({ cancelable: !1 }), this.listen("click", this.clickHandler), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { checked: 7, disabled: 7, form: 3, label: 1, name: 3, scale: 3, value: 1 };
  }
  static {
    this.styles = g;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await f(this), n(this.switchEl);
  }
  connectedCallback() {
    super.connectedCallback(), k(this), d(this);
  }
  updated() {
    p(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), v(this), h(this);
  }
  // #endregion
  // #region Private Methods
  syncHiddenFormInput(e) {
    e.type = "checkbox";
  }
  keyDownHandler(e) {
    !this.disabled && u(e.key) && (this.toggle(), e.preventDefault());
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
  setSwitchEl(e) {
    this.switchEl = e;
  }
  // #endregion
  // #region Rendering
  render() {
    return m({ disabled: this.disabled, children: r`<div .ariaChecked=${this.checked} .ariaLabel=${w(this)} class=${t(o.container)} role=switch tabindex=0 ${l(this.setSwitchEl)}><div class=${t(o.track)}><div class=${t(o.handle)}></div></div>${b({ component: this })}</div>` });
  }
}
s("calcite-switch", x);
export {
  x as Switch
};
