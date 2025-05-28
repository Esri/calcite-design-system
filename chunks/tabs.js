import { a as c, L as d, s as n, x as b, c as h } from "./iframe.js";
import { n as p } from "./ref.js";
import { d as m, H as u } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
const f = {
  section: "section"
}, x = {
  titleGroup: "title-group"
}, g = c`:host{display:flex;flex-direction:column}:host([bordered]){box-shadow:inset 0 1px 0 var(--calcite-tab-border-color, var(--calcite-color-border-1));background-color:var(--calcite-tab-background-color, var(--calcite-color-foreground-1))}:host([bordered]) section{border-color:var(--calcite-tab-border-color, var(--calcite-color-border-1));border-style:solid}section{display:flex;flex-grow:1;overflow:hidden;border-width:1px;border-block-start-style:solid;border-block-start-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered][position=bottom]){box-shadow:inset 0 1px 0 var(--calcite-tab-border-color, var(--calcite-color-border-1)),inset 0 -1px 0 var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]:not([position=bottom])) ::slotted(calcite-tab-nav){margin-block-end:-1px}:host([position=bottom]){flex-direction:column-reverse}:host([position=bottom]) section{flex-direction:column-reverse;border-block-start-width:0px;border-block-end-width:1px}:host([bordered][scale=s]) section{padding:.75rem}:host([bordered][scale=m]) section{padding:.5rem}:host([bordered][scale=l]) section{padding:1rem}:host([position=bottom]:not([bordered])) section{border-block-end-style:solid;border-block-end-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}@media (forced-colors: active){:host([bordered]) section{border-block-start-width:0px;border-block-end-width:1px}:host([position=bottom][bordered]) section{border-block-start-width:1px;border-block-end-width:0px}}:host([hidden]){display:none}[hidden]{display:none}`;
class v extends d {
  constructor() {
    super(), this.tabs = [], this.titles = [], this.bordered = !1, this.layout = "inline", this.position = "top", this.scale = "m", this.listen("calciteInternalTabNavSlotChange", this.calciteInternalTabNavSlotChangeHandler);
  }
  static {
    this.properties = { tabs: 16, titles: 16, bordered: 5, layout: 3, position: 3, scale: 3 };
  }
  static {
    this.styles = g;
  }
  connectedCallback() {
    super.connectedCallback(), this.updateItems();
  }
  load() {
    this.updateItems();
  }
  willUpdate(e) {
    (e.has("position") && (this.hasUpdated || this.position !== "top") || e.has("scale") && (this.hasUpdated || this.scale !== "m")) && this.updateItems(), (e.has("titles") || e.has("tabs")) && this.hasUpdated && this.titles?.length > 0 && this.tabs?.length > 0 && (this.updateAriaSettings(), this.updateItems());
  }
  calciteInternalTabNavSlotChangeHandler(e) {
    e.stopPropagation(), e.detail.length !== this.titles.length && (this.titles = e.detail);
  }
  defaultSlotChangeHandler(e) {
    this.tabs = m(e, "calcite-tab");
  }
  async updateAriaSettings() {
    await this.componentOnReady();
    let e, a;
    const o = u(this.slotEl, "calcite-tab");
    if (o.some((t) => t.tab) || this.titles.some((t) => t.tab))
      e = o.sort((t, r) => t.tab.localeCompare(r.tab)).map((t) => t.id), a = this.titles.sort((t, r) => t.tab.localeCompare(r.tab)).map((t) => t.id);
    else {
      const t = await Promise.all(o.map((s) => s.getTabIndex())), r = await Promise.all(this.titles.map((s) => s.getTabIndex()));
      e = t.reduce((s, i, l) => (s[i] = o[l].id, s), []), a = r.reduce((s, i, l) => (s[i] = this.titles[l].id, s), []);
    }
    o.forEach((t) => t._updateAriaInfo(e, a)), this.titles.forEach((t) => t._updateAriaInfo(e, a));
  }
  updateItems() {
    const { position: e, scale: a } = this, o = this.el.querySelector("calcite-tab-nav");
    o && (o.position = e, o.scale = a), Array.from(this.el.querySelectorAll("calcite-tab")).forEach((t) => {
      t.parentElement === this.el && (t.scale = a);
    }), Array.from(this.el.querySelectorAll("calcite-tab-nav > calcite-tab-title")).forEach((t) => {
      t.position = e, t.scale = a;
    });
  }
  setDefaultSlotRef(e) {
    this.slotEl = e;
  }
  render() {
    return b`<slot name=${x.titleGroup}></slot><section class=${n(f.section)}><slot @slotchange=${this.defaultSlotChangeHandler} ${p(this.setDefaultSlotRef)}></slot></section>`;
  }
}
h("calcite-tabs", v);
export {
  v as Tabs
};
