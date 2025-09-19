import { b as s, L as r, z as o, s as t, w as n, x as m, q as b } from "./index.js";
import { g as d } from "./guid.js";
import { c as p, d as u } from "./utils.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.1-next.1 */
const e = {
  list: "list",
  label: "label",
  title: "title",
  scale: (i) => `scale--${i}`
}, g = s`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit: .5rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit: .75rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit: 1rem}:host,.list{margin:0;display:flex;flex-direction:column;padding:0}:host(:focus),.list:focus{outline:2px solid transparent;outline-offset:2px}.label{box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:0px;max-inline-size:100%}.title{--calcite-combobox-item-indent-value: calc( var(--calcite-combobox-item-spacing-unit) * var(--calcite-combobox-item-spacing-indent-multiplier) );border:0 solid;display:block;flex:1 1 0%;border-block-end-width:1px;font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;padding:var(--calcite-combobox-item-spacing-unit);margin-inline-start:var(--calcite-combobox-item-indent-value);color:var(--calcite-combobox-item-group-text-color, var(--calcite-color-text-2));border-block-end-color:var(--calcite-combobox-item-group-border-color, var(--calcite-color-border-3))}::slotted(calcite-combobox-item-group:not([after-empty-group])){padding-block-start:var(--calcite-combobox-item-spacing-unit)}:host([hidden]){display:none}[hidden]{display:none}:host([item-hidden]){display:none}`;
class h extends r {
  constructor() {
    super(...arguments), this.guid = d(), this.afterEmptyGroup = !1, this.scale = "m", this.itemHidden = !1;
  }
  static {
    this.properties = { afterEmptyGroup: 7, ancestors: 0, label: 1, scale: 1, itemHidden: 7 };
  }
  static {
    this.styles = g;
  }
  connectedCallback() {
    super.connectedCallback(), this.ancestors = p(this.el);
  }
  render() {
    const { el: l, scale: a } = this, c = u(l);
    return m`<ul aria-labelledby=${this.guid ?? o} class=${t({ [e.list]: !0, [e.scale(a)]: !0 })} role=group><li class=${t({ [e.label]: !0 })} id=${this.guid ?? o} role=presentation style=${n({ "--calcite-combobox-item-spacing-indent-multiplier": `${c}` })}><span class=${t(e.title)}>${this.label}</span></li><slot></slot></ul>`;
  }
}
b("calcite-combobox-item-group", h);
export {
  h as ComboboxItemGroup
};
