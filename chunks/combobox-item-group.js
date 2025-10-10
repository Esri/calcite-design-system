import { b as m, L as b, s as t, w as c, x as o, z as l, q as p } from "./index.js";
import { g } from "./guid.js";
import { c as d, d as u } from "./utils.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const i = {
  firstTitle: "first-title",
  list: "list",
  label: "label",
  separator: "separator",
  title: "title",
  scale: (a) => `scale--${a}`
}, x = m`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-horizontal-spacing-unit: var(--calcite-spacing-sm);--calcite-combobox-item-vertical-spacing-unit: var(--calcite-spacing-xxs)}.scale--s .first-title{padding-block-start:var(--calcite-spacing-sm)}.scale--s .separator{margin-block:var(--calcite-combobox-item-vertical-spacing-unit);margin-inline-start:calc(var(--calcite-combobox-item-horizontal-spacing-unit) + var(--calcite-combobox-item-horizontal-spacing-unit) * var(--calcite-combobox-item-spacing-indent-multiplier));margin-inline-end:var(--calcite-combobox-item-horizontal-spacing-unit)}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-horizontal-spacing-unit: var(--calcite-spacing-md);--calcite-combobox-item-vertical-spacing-unit: var(--calcite-spacing-xs)}.scale--m .first-title{padding-block-start:var(--calcite-spacing-md)}.scale--m .separator{margin-block:var(--calcite-combobox-item-vertical-spacing-unit);margin-inline-start:calc(var(--calcite-combobox-item-horizontal-spacing-unit) + var(--calcite-combobox-item-horizontal-spacing-unit) * var(--calcite-combobox-item-spacing-indent-multiplier));margin-inline-end:var(--calcite-combobox-item-horizontal-spacing-unit)}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-horizontal-spacing-unit: var(--calcite-spacing-lg);--calcite-combobox-item-vertical-spacing-unit: var(--calcite-spacing-sm-plus)}.scale--l .first-title{padding-block-start:var(--calcite-spacing-xl)}.scale--l .separator{margin-block:var(--calcite-combobox-item-vertical-spacing-unit);margin-inline-start:calc(var(--calcite-combobox-item-horizontal-spacing-unit) + var(--calcite-combobox-item-horizontal-spacing-unit) * var(--calcite-combobox-item-spacing-indent-multiplier));margin-inline-end:var(--calcite-combobox-item-horizontal-spacing-unit)}:host,.list{margin:0;display:flex;flex-direction:column;padding:0}:host(:focus),.list:focus{outline:2px solid transparent;outline-offset:2px}.separator{block-size:var(--calcite-spacing-px);background-color:var(--calcite-combobox-item-group-border-color, var(--calcite-color-border-3))}.label{box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:0px;max-inline-size:100%}.title{--calcite-combobox-item-indent-value: calc( var(--calcite-combobox-item-horizontal-spacing-unit) * var(--calcite-combobox-item-spacing-indent-multiplier) );border:0 solid;display:block;flex:1 1 0%;font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;padding-block:var(--calcite-combobox-item-vertical-spacing-unit);padding-inline-start:calc(var(--calcite-combobox-item-indent-value) + var(--calcite-combobox-item-horizontal-spacing-unit));padding-inline-end:var(--calcite-combobox-item-horizontal-spacing-unit);color:var(--calcite-combobox-item-group-text-color, var(--calcite-color-text-1))}:host([hidden]){display:none}[hidden]{display:none}:host([item-hidden]){display:none}`;
class v extends b {
  constructor() {
    super(...arguments), this.guid = g(), this.afterEmptyGroup = !1, this.position = 0, this.scale = "m", this.itemHidden = !1;
  }
  static {
    this.properties = { afterEmptyGroup: 7, ancestors: 0, label: 1, position: 9, scale: 1, itemHidden: 7 };
  }
  static {
    this.styles = x;
  }
  connectedCallback() {
    super.connectedCallback(), this.ancestors = d(this.el);
  }
  render() {
    const { el: n, scale: s } = this, e = u(n), r = this.position > 0 ? o`<div class=${t(i.separator)} role=separator style=${c({ "--calcite-combobox-item-spacing-indent-multiplier": `${e}` })}></div>` : null;
    return o`<ul aria-labelledby=${this.guid ?? l} class=${t({ [i.list]: !0, [i.scale(s)]: !0 })} role=group>${r}<li class=${t({ [i.label]: !0 })} id=${this.guid ?? l} role=presentation style=${c({ "--calcite-combobox-item-spacing-indent-multiplier": `${e}` })}><span class=${t({ [i.title]: !0, [i.firstTitle]: this.position === 0 })}>${this.label}</span></li><slot></slot></ul>`;
  }
}
p("calcite-combobox-item-group", v);
export {
  v as ComboboxItemGroup
};
