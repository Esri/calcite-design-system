import { b as l, L as n, s as i, x as e, z as r, q as s } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const a = {
  container: "container",
  containerNoSpacing: "container--no-spacing",
  firstTitle: "first-title",
  heading: "heading",
  scale: (t) => `scale--${t}`,
  separator: "separator"
}, p = l`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-internal-autocomplete-item-group-horizontal-spacing-unit: var(--calcite-spacing-sm);--calcite-internal-autocomplete-item-group-vertical-spacing-unit: var(--calcite-spacing-xxs)}.scale--s .first-title{padding-block-start:var(--calcite-spacing-sm)}.scale--s .separator{margin-block:var(--calcite-internal-autocomplete-item-group-vertical-spacing-unit);margin-inline:var(--calcite-internal-autocomplete-item-group-horizontal-spacing-unit)}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-internal-autocomplete-item-group-horizontal-spacing-unit: var(--calcite-spacing-md);--calcite-internal-autocomplete-item-group-vertical-spacing-unit: var(--calcite-spacing-xs)}.scale--m .first-title{padding-block-start:var(--calcite-spacing-md)}.scale--m .separator{margin-block:var(--calcite-internal-autocomplete-item-group-vertical-spacing-unit);margin-inline:var(--calcite-internal-autocomplete-item-group-horizontal-spacing-unit)}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-internal-autocomplete-item-group-horizontal-spacing-unit: var(--calcite-spacing-lg);--calcite-internal-autocomplete-item-group-vertical-spacing-unit: var(--calcite-spacing-sm-plus)}.scale--l .first-title{padding-block-start:var(--calcite-spacing-xl)}.scale--l .separator{margin-block:var(--calcite-internal-autocomplete-item-group-vertical-spacing-unit);margin-inline:var(--calcite-internal-autocomplete-item-group-horizontal-spacing-unit)}:host{margin:0;display:flex;flex-direction:column}.container{display:flex;flex-direction:column;background-color:var(--calcite-autocomplete-background-color, var(--calcite-color-foreground-1))}.container--no-spacing{padding-block-start:0}.separator{block-size:var(--calcite-spacing-px);background-color:var(--calcite-autocomplete-border-color, var(--calcite-color-border-3))}.heading{box-sizing:border-box;inline-size:100%;min-inline-size:0px;max-inline-size:100%;font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;color:var(--calcite-autocomplete-text-color, var(--calcite-color-text-1));padding-block:var(--calcite-internal-autocomplete-item-group-vertical-spacing-unit);padding-inline:var(--calcite-internal-autocomplete-item-group-horizontal-spacing-unit)}:host([hidden]){display:none}[hidden]{display:none}`;
class g extends n {
  constructor() {
    super(...arguments), this.disableSpacing = !1, this.position = 0, this.scale = "m";
  }
  static {
    this.properties = { disableSpacing: 5, heading: 1, label: 1, position: 9, scale: 1 };
  }
  static {
    this.styles = p;
  }
  render() {
    const { scale: c } = this, o = this.position > 0 ? e`<div class=${i(a.separator)} role=separator></div>` : null;
    return e`<div aria-label=${this.label ?? this.heading ?? r} class=${i({
      [a.container]: !0,
      [a.containerNoSpacing]: this.disableSpacing,
      [a.scale(c)]: !0
    })} role=group>${o}<div class=${i({ [a.heading]: !0, [a.firstTitle]: this.position === 0 })}>${this.heading}</div><slot></slot></div>`;
  }
}
s("calcite-autocomplete-item-group", g);
export {
  g as AutocompleteItemGroup
};
