/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as h, L as p, c as n, s as i, b as r, d as m } from "./index.js";
import { g as u } from "./component.js";
import { g as v } from "./guid.js";
import { h as s } from "./text.js";
import { u as f } from "./useInteractive.js";
import { I as g, S as d, C as t } from "./resources8.js";
const b = h`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}.scale--s{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);--calcite-internal-autocomplete-item-spacing-unit-l: .5rem;--calcite-internal-autocomplete-item-spacing-unit-s: .25rem;--calcite-internal-autocomplete-item-description-font-size: var(--calcite-font-size-xs)}.scale--m{font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);--calcite-internal-autocomplete-item-spacing-unit-l: .75rem;--calcite-internal-autocomplete-item-spacing-unit-s: .375rem;--calcite-internal-autocomplete-item-description-font-size: var(--calcite-font-size-sm)}.scale--l{font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);--calcite-internal-autocomplete-item-spacing-unit-l: 1rem;--calcite-internal-autocomplete-item-spacing-unit-s: var(--calcite-space-sm-plus);--calcite-internal-autocomplete-item-description-font-size: var(--calcite-font-size)}:host{display:flex}.container{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;outline-color:transparent;background-color:var(--calcite-autocomplete-background-color, var(--calcite-color-foreground-1));color:var(--calcite-autocomplete-text-color, var(--calcite-color-text-3));gap:var(--calcite-internal-autocomplete-item-spacing-unit-l);padding-inline:var(--calcite-internal-autocomplete-item-spacing-unit-l);padding-block:var(--calcite-internal-autocomplete-item-spacing-unit-s);overflow-wrap:break-word;word-break:break-word;justify-content:space-around}.description{color:var(--calcite-autocomplete-description-text-color);font-size:var(--calcite-internal-autocomplete-item-description-font-size)}.heading{color:var(--calcite-autocomplete-heading-text-color, var(--calcite-color-text-1))}.heading,.description{line-height:var(--calcite-font-line-height-relative-snug)}:host([selected]) .container{color:var(--calcite-color-text-1);background-color:var(--calcite-color-surface-highlight)}:host([selected]) .container .description{color:var(--calcite-autocomplete-description-text-color, var(--calcite-color-text-2))}:host([selected]) .heading{font-weight:var(--calcite-font-weight-medium)}:host(:hover:not([disabled])) .container{background-color:var(--calcite-autocomplete-background-color, var(--calcite-color-foreground-2))}:host(:hover:not([disabled])) .container .description{color:var(--calcite-autocomplete-description-text-color, var(--calcite-color-text-2))}.container--active{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.content-center{display:flex;flex-direction:column;flex-grow:1;padding-block:0}.text-match{background-color:transparent;color:inherit;font-weight:var(--calcite-font-weight-bold)}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class x extends p {
  constructor() {
    super(...arguments), this.interactiveContainer = f(this), this.active = !1, this.disabled = !1, this.guid = g.host(v()), this.scale = "m", this.selected = !1, this.calciteAutocompleteItemSelect = n({ cancelable: !1 }), this.calciteInternalAutocompleteItemChange = n({ cancelable: !1 });
  }
  static {
    this.properties = { active: 5, description: 1, disabled: 7, guid: 1, heading: 1, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, inputValueMatchPattern: 3, label: 1, scale: 1, selected: 7, value: 1 };
  }
  static {
    this.styles = b;
  }
  requestSelection() {
    this.calciteAutocompleteItemSelect.emit();
  }
  willUpdate(e) {
    this.hasUpdated && (e.has("description") || e.has("disabled") || e.has("heading") || e.has("label") || e.has("selected") || e.has("value")) && this.calciteInternalAutocompleteItemChange.emit();
  }
  handleClick(e) {
    e.preventDefault(), !this.disabled && this.requestSelection();
  }
  render() {
    const { active: e, description: c, heading: a, disabled: o, inputValueMatchPattern: l } = this;
    return this.interactiveContainer({ disabled: o, children: r`<div class=${i({
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
    return a ? r`<calcite-icon class=${i(e === "start" ? t.iconStart : t.iconEnd)} .flipRtl=${c === e || c === "both"} .icon=${a} .scale=${u(this.scale)}></calcite-icon>` : null;
  }
}
m("calcite-autocomplete-item", x);
export {
  x as AutocompleteItem
};
