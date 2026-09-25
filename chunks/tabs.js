/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as c, L as d, s as n, b, d as h } from "./index.js";
import { e as p, n as m } from "./ref.js";
import { b as f, a as u } from "./dom.js";
import { S as v, C as g } from "./resources28.js";
const w = c`:host{display:flex;flex-direction:column;background-color:var(--calcite-tab-background-color, var(--calcite-color-transparent))}:host([bordered]){box-shadow:inset 0 1px 0 var(--calcite-tab-border-color, var(--calcite-color-border-1));background-color:var(--calcite-tab-background-color, var(--calcite-color-foreground-1))}:host([bordered]) section{border-color:var(--calcite-tab-border-color, var(--calcite-color-border-1));border-style:solid}section{border-width:var(--calcite-border-width-sm);display:flex;flex-grow:1;overflow:hidden;border-block-start-style:solid;border-block-start-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered][position=bottom]){box-shadow:inset 0 1px 0 var(--calcite-tab-border-color, var(--calcite-color-border-1)),inset 0 -1px 0 var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]:not([position=bottom])) ::slotted(calcite-tab-nav){margin-block-end:-1px}:host([position=bottom]){flex-direction:column-reverse}:host([position=bottom]) section{flex-direction:column-reverse;border-block-start-width:var(--calcite-border-width-none);border-block-end-width:var(--calcite-border-width-sm)}:host([bordered][scale=s]) section{padding:var(--calcite-space-md)}:host([bordered][scale=m]) section{padding:var(--calcite-space-sm)}:host([bordered][scale=l]) section{padding:var(--calcite-space-lg)}:host([position=bottom]:not([bordered])) section{border-block-end-style:solid;border-block-end-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}@media(forced-colors:active){:host([bordered]) section{border-block-start-width:var(--calcite-border-width-none);border-block-end-width:var(--calcite-border-width-sm)}:host([position=bottom][bordered]) section{border-block-start-width:var(--calcite-border-width-sm);border-block-end-width:var(--calcite-border-width-none)}}:host([hidden]){display:none}[hidden]{display:none}`;
class C extends d {
  constructor() {
    super(), this.slotRef = p(), this.tabs = [], this.titles = [], this.hasVisibleTitles = !0, this.bordered = !1, this.layout = "inline", this.lastTabClosable = !1, this.position = "top", this.scale = "m", this.listen("calciteInternalTabNavSlotChange", this.calciteInternalTabNavSlotChangeHandler);
  }
  static {
    this.properties = { tabs: 16, titles: 16, hasVisibleTitles: 16, bordered: 7, layout: 3, lastTabClosable: 7, position: 3, scale: 3 };
  }
  static {
    this.styles = w;
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
    const a = [...e.detail];
    a.some((t, i) => this.titles[i] !== t) && (this.titles = a), this.hasVisibleTitles = a.some((t) => !t.closed);
  }
  defaultSlotChangeHandler(e) {
    this.tabs = f(e, "calcite-tab");
  }
  async updateAriaSettings() {
    if (await this.componentOnReady(), !this.slotRef.value)
      return;
    let e, a;
    const s = u(this.slotRef.value, "calcite-tab");
    if (await Promise.all([...s, ...this.titles].map((t) => t.componentOnReady())), s.some((t) => t.tab) || this.titles.some((t) => t.tab))
      e = s.sort((t, i) => t.tab && i.tab ? t.tab.localeCompare(i.tab) : 0).map((t) => t.id), a = this.titles.sort((t, i) => t.tab.localeCompare(i.tab)).map((t) => t.id);
    else {
      const t = await Promise.all(s.map((o) => o.getTabIndex())), i = await Promise.all(this.titles.map((o) => o.getTabIndex()));
      e = t.reduce((o, l, r) => (o[l] = s[r].id, o), []), a = i.reduce((o, l, r) => (o[l] = this.titles[r].id, o), []);
    }
    s.forEach((t) => t._updateAriaInfo(e, a)), this.titles.forEach((t) => t._updateAriaInfo(e, a));
  }
  updateItems() {
    const { lastTabClosable: e, position: a, scale: s } = this, t = this.el.querySelector("calcite-tab-nav");
    t && (t.lastTabClosable = e, t.position = a, t.scale = s), Array.from(this.el.querySelectorAll("calcite-tab")).forEach((o) => {
      o.parentElement === this.el && (o.scale = s);
    });
    const i = this.el.querySelectorAll("calcite-tab-nav > calcite-tab-title");
    Array.from(i).forEach((o) => {
      o.position = a, o.scale = s;
    });
  }
  render() {
    return b`<slot name=${v.titleGroup}></slot><section class=${n(g.section)} .hidden=${!this.hasVisibleTitles}><slot @slotchange=${this.defaultSlotChangeHandler} ${m(this.slotRef)}></slot></section>`;
  }
}
h("calcite-tabs", C);
export {
  C as Tabs
};
