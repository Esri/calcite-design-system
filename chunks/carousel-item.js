/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as i, L as a, O as l, s as n, b as o, d as c } from "./index.js";
import { g as r } from "./guid.js";
const t = {
  container: "container",
  selected: "selected"
}, d = "calcite-carousel-item", h = {
  host: (e) => `${d}-${e}`
}, u = i`:host{display:flex}.container{display:none;inline-size:var(--calcite-container-size-content-fluid)}:host([selected]) .container{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
class p extends a {
  constructor() {
    super(...arguments), this.guid = h.host(r()), this.selected = !1;
  }
  static {
    this.properties = { label: 1, selected: 7 };
  }
  static {
    this.styles = u;
  }
  render() {
    const s = this.el.id || this.guid;
    return l(this.el, "id", s), o`<div .ariaLabel=${this.label} class=${n({ [t.container]: !0, [t.selected]: this.selected })} role=tabpanel><slot></slot></div>`;
  }
}
c("calcite-carousel-item", p);
export {
  p as CarouselItem
};
