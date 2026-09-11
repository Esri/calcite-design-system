/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as c, L as d, s as n, b, d as h } from "./index.js";
import { e as p, n as m } from "./ref.js";
import { b as f, a as u } from "./dom.js";
import { S as v, C as x } from "./resources28.js";
const g = c`:host{display:flex;flex-direction:column;background-color:var(--calcite-tab-background-color, var(--calcite-color-transparent))}:host([bordered]){box-shadow:inset 0 1px 0 var(--calcite-tab-border-color, var(--calcite-color-border-1));background-color:var(--calcite-tab-background-color, var(--calcite-color-foreground-1))}:host([bordered]) section{border-color:var(--calcite-tab-border-color, var(--calcite-color-border-1));border-style:solid}section{display:flex;flex-grow:1;overflow:hidden;border-width:1px;border-block-start-style:solid;border-block-start-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered][position=bottom]){box-shadow:inset 0 1px 0 var(--calcite-tab-border-color, var(--calcite-color-border-1)),inset 0 -1px 0 var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]:not([position=bottom])) ::slotted(calcite-tab-nav){margin-block-end:-1px}:host([position=bottom]){flex-direction:column-reverse}:host([position=bottom]) section{flex-direction:column-reverse;border-block-start-width:0px;border-block-end-width:1px}:host([bordered][scale=s]) section{padding:.75rem}:host([bordered][scale=m]) section{padding:.5rem}:host([bordered][scale=l]) section{padding:1rem}:host([position=bottom]:not([bordered])) section{border-block-end-style:solid;border-block-end-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}@media(forced-colors:active){:host([bordered]) section{border-block-start-width:0px;border-block-end-width:1px}:host([position=bottom][bordered]) section{border-block-start-width:1px;border-block-end-width:0px}}:host([hidden]){display:none}[hidden]{display:none}`;
class C extends d {
  constructor() {
    super(), this.slotRef = p(), this.tabs = [], this.titles = [], this.hasVisibleTitles = !0, this.bordered = !1, this.layout = "inline", this.lastTabClosable = !1, this.position = "top", this.scale = "m", this.listen("calciteInternalTabNavSlotChange", this.calciteInternalTabNavSlotChangeHandler);
  }
  static {
    this.properties = { tabs: 16, titles: 16, hasVisibleTitles: 16, bordered: 7, layout: 3, lastTabClosable: 7, position: 3, scale: 3 };
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
    (e.has("position") && (this.hasUpdated || this.position !== "top") || e.has("scale") && (this.hasUpdated || this.scale !== "m") || e.has("lastTabClosable") && (this.hasUpdated || this.lastTabClosable !== !1)) && this.updateItems(), (e.has("titles") || e.has("tabs")) && this.hasUpdated && (this.lastTabClosable || this.titles?.length > 0) && (this.lastTabClosable || this.tabs?.length > 0) && (this.updateAriaSettings(), this.updateItems());
  }
  calciteInternalTabNavSlotChangeHandler(e) {
    e.stopPropagation();
    const s = [...e.detail];
    s.some((t, l) => this.titles[l] !== t) && (this.titles = s), this.hasVisibleTitles = s.some((t) => !t.closed);
  }
  defaultSlotChangeHandler(e) {
    this.tabs = f(e, "calcite-tab");
  }
  async updateAriaSettings() {
    if (await this.componentOnReady(), !this.slotRef.value)
      return;
    let e, s;
    const a = u(this.slotRef.value, "calcite-tab");
    if (await Promise.all([...a, ...this.titles].map((t) => t.componentOnReady())), a.some((t) => t.tab) || this.titles.some((t) => t.tab))
      e = a.sort((t, l) => t.tab && l.tab ? t.tab.localeCompare(l.tab) : 0).map((t) => t.id), s = this.titles.sort((t, l) => t.tab.localeCompare(l.tab)).map((t) => t.id);
    else {
      const t = await Promise.all(a.map((o) => o.getTabIndex())), l = await Promise.all(this.titles.map((o) => o.getTabIndex()));
      e = t.reduce((o, i, r) => (o[i] = a[r].id, o), []), s = l.reduce((o, i, r) => (o[i] = this.titles[r].id, o), []);
    }
    a.forEach((t) => t._updateAriaInfo(e, s)), this.titles.forEach((t) => t._updateAriaInfo(e, s));
  }
  updateItems() {
    const { lastTabClosable: e, position: s, scale: a } = this, t = this.el.querySelector("calcite-tab-nav");
    t && (t.lastTabClosable = e, t.position = s, t.scale = a), Array.from(this.el.querySelectorAll("calcite-tab")).forEach((o) => {
      o.parentElement === this.el && (o.scale = a);
    });
    const l = this.el.querySelectorAll("calcite-tab-nav > calcite-tab-title");
    Array.from(l).forEach((o) => {
      o.position = s, o.scale = a;
    });
  }
  render() {
    return b`<slot name=${v.titleGroup}></slot><section class=${n(x.section)} .hidden=${!this.hasVisibleTitles}><slot @slotchange=${this.defaultSlotChangeHandler} ${m(this.slotRef)}></slot></section>`;
  }
}
h("calcite-tabs", C);
export {
  C as Tabs
};
