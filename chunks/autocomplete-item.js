import { b as p, L as u, c as m, s as i, x as r, q as h } from "./index.js";
import { g as v } from "./component.js";
import { u as g, I as f } from "./interactive.js";
import { g as b } from "./guid.js";
import { h as s } from "./text.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = {
  container: "container",
  containerActive: "container--active",
  contentCenter: "content-center",
  description: "description",
  heading: "heading",
  iconEnd: "icon-end",
  iconStart: "icon-start",
  scale: (c) => `scale--${c}`
}, d = {
  contentEnd: "content-end",
  contentStart: "content-start"
}, x = "autocomplete-item", S = {
  host: (c) => `${x}-${c}`
}, $ = p`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-internal-autocomplete-item-spacing-unit-l: .5rem;--calcite-internal-autocomplete-item-spacing-unit-s: .25rem;--calcite-internal-autocomplete-item-description-font-size: var(--calcite-font-size-xs)}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-internal-autocomplete-item-spacing-unit-l: .75rem;--calcite-internal-autocomplete-item-spacing-unit-s: .375rem;--calcite-internal-autocomplete-item-description-font-size: var(--calcite-font-size-sm)}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-internal-autocomplete-item-spacing-unit-l: 1rem;--calcite-internal-autocomplete-item-spacing-unit-s: .625rem;--calcite-internal-autocomplete-item-description-font-size: var(--calcite-font-size)}:host{display:flex}.container{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;outline-color:transparent;background-color:var(--calcite-autocomplete-background-color, var(--calcite-color-foreground-1));color:var(--calcite-autocomplete-text-color, var(--calcite-color-text-3));gap:var(--calcite-internal-autocomplete-item-spacing-unit-l);padding-inline:var(--calcite-internal-autocomplete-item-spacing-unit-l);padding-block:var(--calcite-internal-autocomplete-item-spacing-unit-s);word-wrap:break-word;word-break:break-word;justify-content:space-around}.description{color:var(--calcite-autocomplete-description-text-color);font-size:var(--calcite-internal-autocomplete-item-description-font-size)}.heading{color:var(--calcite-autocomplete-heading-text-color, var(--calcite-color-text-1))}.heading,.description{line-height:var(--calcite-font-line-height-relative-snug)}:host(:hover:not([disabled])) .container{background-color:var(--calcite-autocomplete-background-color, var(--calcite-color-foreground-2))}:host(:hover:not([disabled])) .container .description{color:var(--calcite-autocomplete-description-text-color, var(--calcite-color-text-2))}.container--active{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.content-center{display:flex;flex-direction:column;flex-grow:1;padding-block:0}.text-match{background-color:transparent;color:inherit;font-weight:var(--calcite-font-weight-bold)}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class z extends u {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this.guid = S.host(b()), this.scale = "m", this.calciteAutocompleteItemSelect = m({ cancelable: !1 });
  }
  static {
    this.properties = { active: 5, description: 1, disabled: 7, guid: 1, heading: 1, iconEnd: [3, { type: String }], iconFlipRtl: 3, iconStart: [3, { type: String }], inputValueMatchPattern: 2, label: 1, scale: 1, value: 1 };
  }
  static {
    this.styles = $;
  }
  emitSelectEvent() {
    this.calciteAutocompleteItemSelect.emit();
  }
  updated() {
    g(this);
  }
  handleClick(e) {
    e.preventDefault(), this.emitSelectEvent();
  }
  render() {
    const { active: e, description: a, heading: o, disabled: n, inputValueMatchPattern: l } = this;
    return f({ disabled: n, children: r`<div class=${i({
      [t.container]: !0,
      [t.containerActive]: e && !n,
      [t.scale(this.scale)]: !0
    })} @click=${this.handleClick}>${this.renderIcon("start")}<slot name=${d.contentStart}></slot><div class=${i(t.contentCenter)}><div class=${i(t.heading)}>${s({
      text: o,
      pattern: l
    })}</div><div class=${i(t.description)}>${s({
      text: a,
      pattern: l
    })}</div></div><slot name=${d.contentEnd}></slot>${this.renderIcon("end")}</div>` });
  }
  renderIcon(e) {
    const { iconFlipRtl: a } = this, o = e === "start" ? this.iconStart : this.iconEnd;
    return o ? r`<calcite-icon class=${i(e === "start" ? t.iconStart : t.iconEnd)} .flipRtl=${a === e || a === "both"} .icon=${o} .scale=${v(this.scale)}></calcite-icon>` : null;
  }
}
h("calcite-autocomplete-item", z);
export {
  z as AutocompleteItem
};
