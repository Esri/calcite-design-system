import { j as a, L as o, x as n, z as c, s as i, k as r } from "./iframe.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const e = {
  container: "container",
  containerNoSpacing: "container--no-spacing",
  heading: "heading"
}, l = a`.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-internal-autocomplete-item-group-spacing-unit: .5rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-internal-autocomplete-item-group-spacing-unit: .75rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-internal-autocomplete-item-group-spacing-unit: 1rem}:host{margin:0;display:flex;flex-direction:column}.container{display:flex;flex-direction:column;background-color:var(--calcite-autocomplete-background-color, var(--calcite-color-foreground-1));padding-block-start:var(--calcite-internal-autocomplete-item-group-spacing-unit)}.container--no-spacing{padding-block-start:0}.heading{border:0 solid;box-sizing:border-box;inline-size:100%;min-inline-size:0px;max-inline-size:100%;border-block-end-width:1px;font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;color:var(--calcite-autocomplete-text-color, var(--calcite-color-text-2));border-block-end-color:var(--calcite-autocomplete-border-color, var(--calcite-color-border-3));padding-block:var(--calcite-internal-autocomplete-item-group-spacing-unit);padding-inline:var(--calcite-internal-autocomplete-item-group-spacing-unit)}:host([hidden]){display:none}[hidden]{display:none}`;
class s extends o {
  constructor() {
    super(...arguments), this.disableSpacing = !1, this.scale = "m";
  }
  static {
    this.properties = { disableSpacing: 5, heading: 1, label: 1, scale: 1 };
  }
  static {
    this.styles = l;
  }
  // #endregion
  // #region Lifecycle
  // #endregion
  // #region Rendering
  render() {
    const { scale: t } = this;
    return n`<div aria-label=${this.label ?? this.heading ?? c} class=${i({
      [e.container]: !0,
      [e.containerNoSpacing]: this.disableSpacing,
      [`scale--${t}`]: !0
    })} role=group><div class=${i(e.heading)} role=presentation>${this.heading}</div><slot></slot></div>`;
  }
}
r("calcite-autocomplete-item-group", s);
export {
  s as AutocompleteItemGroup
};
