import { b as i, L as c, A as l, s as a, x as o, q as n } from "./index.js";
import { g as r } from "./guid.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = {
  container: "container",
  selected: "selected"
}, d = "calcite-carousel-item", u = {
  host: (e) => `${d}-${e}`
}, h = i`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:flex}.container{display:none;inline-size:var(--calcite-container-size-content-fluid)}:host([selected]) .container{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
class p extends c {
  constructor() {
    super(...arguments), this.guid = u.host(r()), this.selected = !1;
  }
  static {
    this.properties = { label: 1, selected: 7 };
  }
  static {
    this.styles = h;
  }
  render() {
    const s = this.el.id || this.guid;
    return l(this.el, "id", s), o`<div .ariaLabel=${this.label} class=${a({ [t.container]: !0, [t.selected]: this.selected })} role=tabpanel><slot></slot></div>`;
  }
}
n("calcite-carousel-item", p);
export {
  p as CarouselItem
};
