import { b as o, L as c, z as n, s as t, x as l, q as r } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.1-next.1 */
const e = {
  container: "container",
  containerNoSpacing: "container--no-spacing",
  heading: "heading",
  scale: (i) => `scale--${i}`
}, s = o`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-internal-autocomplete-item-group-spacing-unit: .5rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-internal-autocomplete-item-group-spacing-unit: .75rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-internal-autocomplete-item-group-spacing-unit: 1rem}:host{margin:0;display:flex;flex-direction:column}.container{display:flex;flex-direction:column;background-color:var(--calcite-autocomplete-background-color, var(--calcite-color-foreground-1));padding-block-start:var(--calcite-internal-autocomplete-item-group-spacing-unit)}.container--no-spacing{padding-block-start:0}.heading{border:0 solid;box-sizing:border-box;inline-size:100%;min-inline-size:0px;max-inline-size:100%;border-block-end-width:1px;font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;color:var(--calcite-autocomplete-text-color, var(--calcite-color-text-2));border-block-end-color:var(--calcite-autocomplete-border-color, var(--calcite-color-border-3));padding-block:var(--calcite-internal-autocomplete-item-group-spacing-unit);padding-inline:var(--calcite-internal-autocomplete-item-group-spacing-unit)}:host([hidden]){display:none}[hidden]{display:none}`;
class d extends c {
  constructor() {
    super(...arguments), this.disableSpacing = !1, this.scale = "m";
  }
  static {
    this.properties = { disableSpacing: 5, heading: 1, label: 1, scale: 1 };
  }
  static {
    this.styles = s;
  }
  render() {
    const { scale: a } = this;
    return l`<div aria-label=${this.label ?? this.heading ?? n} class=${t({
      [e.container]: !0,
      [e.containerNoSpacing]: this.disableSpacing,
      [e.scale(a)]: !0
    })} role=group><div class=${t(e.heading)} role=presentation>${this.heading}</div><slot></slot></div>`;
  }
}
r("calcite-autocomplete-item-group", d);
export {
  d as AutocompleteItemGroup
};
