import { c as s, L as c, o as i, s as e, k as r, x as n, d as m } from "./iframe.js";
import { g as b } from "./guid.js";
import { e as d, f as p } from "./utils5.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
const t = {
  list: "list",
  label: "label",
  title: "title"
}, u = s`.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit: .5rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit: .75rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit: 1rem}:host,.list{margin:0;display:flex;flex-direction:column;padding:0}:host(:focus),.list:focus{outline:2px solid transparent;outline-offset:2px}.label{box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:0px;max-inline-size:100%}.title{--calcite-combobox-item-indent-value: calc( var(--calcite-combobox-item-spacing-unit) * var(--calcite-combobox-item-spacing-indent-multiplier) );border:0 solid;display:block;flex:1 1 0%;border-block-end-width:1px;font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;padding:var(--calcite-combobox-item-spacing-unit);margin-inline-start:var(--calcite-combobox-item-indent-value);color:var(--calcite-combobox-item-group-text-color, var(--calcite-color-text-2));border-block-end-color:var(--calcite-combobox-item-group-border-color, var(--calcite-color-border-3))}::slotted(calcite-combobox-item-group:not([after-empty-group])){padding-block-start:var(--calcite-combobox-item-spacing-unit)}:host([hidden]){display:none}[hidden]{display:none}:host([item-hidden]){display:none}`;
class g extends c {
  constructor() {
    super(...arguments), this.guid = b(), this.afterEmptyGroup = !1, this.scale = "m", this.itemHidden = !1;
  }
  static {
    this.properties = { afterEmptyGroup: 7, ancestors: 0, label: 1, scale: 1, itemHidden: 7 };
  }
  static {
    this.styles = u;
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), this.ancestors = d(this.el);
  }
  // #endregion
  // #region Rendering
  render() {
    const { el: o, scale: l } = this, a = p(o);
    return n`<ul aria-labelledby=${this.guid ?? i} class=${e({ [t.list]: !0, [`scale--${l}`]: !0 })} role=group><li class=${e({ [t.label]: !0 })} id=${this.guid ?? i} role=presentation style=${r({ "--calcite-combobox-item-spacing-indent-multiplier": `${a}` })}><span class=${e(t.title)}>${this.label}</span></li><slot></slot></ul>`;
  }
}
m("calcite-combobox-item-group", g);
export {
  g as ComboboxItemGroup
};
