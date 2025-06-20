import { a as s, L as i, k as a, s as l, x as c, c as o } from "./iframe.js";
import { g as n } from "./guid.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
const e = {
  container: "container",
  selected: "selected"
}, r = s`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:flex}.container{display:none;inline-size:var(--calcite-container-size-content-fluid)}:host([selected]) .container{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
class d extends i {
  constructor() {
    super(...arguments), this.guid = `calcite-carousel-item-${n()}`, this.selected = !1;
  }
  static {
    this.properties = { label: 1, selected: 7 };
  }
  static {
    this.styles = r;
  }
  render() {
    const t = this.el.id || this.guid;
    return a(this.el, "id", t), c`<div .ariaLabel=${this.label} class=${l({ [e.container]: !0, [e.selected]: this.selected })} role=tabpanel><slot></slot></div>`;
  }
}
o("calcite-carousel-item", d);
export {
  d as CarouselItem
};
