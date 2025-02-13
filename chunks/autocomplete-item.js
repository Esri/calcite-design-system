import { j as p, L as u, n as m, x as r, s as i, k as h } from "./iframe.js";
import { g as v } from "./component.js";
import { u as g, I as f } from "./interactive.js";
import { g as b } from "./guid.js";
import { h as s } from "./text.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const t = {
  container: "container",
  containerActive: "container--active",
  contentCenter: "content-center",
  description: "description",
  heading: "heading",
  iconEnd: "icon-end",
  iconStart: "icon-start",
  scale: (n) => `scale--${n}`
}, d = {
  contentEnd: "content-end",
  contentStart: "content-start"
}, x = p`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-internal-autocomplete-item-spacing-unit-l: .5rem;--calcite-internal-autocomplete-item-spacing-unit-s: .25rem;--calcite-internal-autocomplete-item-description-font-size: var(--calcite-font-size-xs)}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-internal-autocomplete-item-spacing-unit-l: .75rem;--calcite-internal-autocomplete-item-spacing-unit-s: .375rem;--calcite-internal-autocomplete-item-description-font-size: var(--calcite-font-size-sm)}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-internal-autocomplete-item-spacing-unit-l: 1rem;--calcite-internal-autocomplete-item-spacing-unit-s: .625rem;--calcite-internal-autocomplete-item-description-font-size: var(--calcite-font-size)}:host{display:flex}.container{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;outline-color:transparent;background-color:var(--calcite-autocomplete-background-color, var(--calcite-color-foreground-1));color:var(--calcite-autocomplete-text-color, var(--calcite-color-text-3));gap:var(--calcite-internal-autocomplete-item-spacing-unit-l);padding-inline:var(--calcite-internal-autocomplete-item-spacing-unit-l);padding-block:var(--calcite-internal-autocomplete-item-spacing-unit-s);word-wrap:break-word;word-break:break-word;justify-content:space-around}.description{color:var(--calcite-autocomplete-description-text-color);font-size:var(--calcite-internal-autocomplete-item-description-font-size)}.heading{color:var(--calcite-autocomplete-heading-text-color, var(--calcite-color-text-1))}.heading,.description{line-height:var(--calcite-font-line-height-relative-snug)}:host(:hover:not([disabled])) .container{background-color:var(--calcite-autocomplete-background-color, var(--calcite-color-foreground-2))}:host(:hover:not([disabled])) .container .description{color:var(--calcite-autocomplete-description-text-color, var(--calcite-color-text-2))}.container--active{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.content-center{display:flex;flex-direction:column;flex-grow:1;padding-block:0}.text-match{background-color:transparent;color:inherit;font-weight:var(--calcite-font-weight-bold)}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class z extends u {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this.guid = `autocomplete-item-${b()}`, this.scale = "m", this.calciteInternalAutocompleteItemSelect = m({ cancelable: !1 });
  }
  static {
    this.properties = { active: 5, description: 1, disabled: 7, guid: 1, heading: 1, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, inputValueMatchPattern: 2, label: 1, scale: 1, value: 1 };
  }
  static {
    this.styles = x;
  }
  // #endregion
  // #region Lifecycle
  updated() {
    g(this);
  }
  // #endregion
  // #region Private Methods
  handleClick(e) {
    e.preventDefault(), this.calciteInternalAutocompleteItemSelect.emit();
  }
  // #endregion
  // #region Rendering
  render() {
    const { active: e, description: c, heading: a, disabled: o, inputValueMatchPattern: l } = this;
    return f({ disabled: o, children: r`<div class=${i({
      [t.container]: !0,
      [t.containerActive]: e && !o,
      [t.scale(this.scale)]: !0
    })} @click=${this.handleClick}>${this.renderIcon("start")}<slot name=${d.contentStart}></slot><div class=${i(t.contentCenter)}><div class=${i(t.heading)}>${s({
      text: a,
      pattern: l
    })}</div><div class=${i(t.description)}>${s({
      text: c,
      pattern: l
    })}</div></div><slot name=${d.contentEnd}></slot>${this.renderIcon("end")}</div>` });
  }
  renderIcon(e) {
    const { iconFlipRtl: c } = this, a = e === "start" ? this.iconStart : this.iconEnd;
    return a ? r`<calcite-icon class=${i(e === "start" ? t.iconStart : t.iconEnd)} .flipRtl=${c === e || c === "both"} .icon=${a} .scale=${v(this.scale)}></calcite-icon>` : null;
  }
}
h("calcite-autocomplete-item", z);
export {
  z as AutocompleteItem
};
