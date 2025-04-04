import { c as d, L as c, x as n, d as h } from "./iframe.js";
import { n as b } from "./ref.js";
import { d as p, H as m } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
const u = {
  titleGroup: "title-group"
}, f = d`:host{display:flex;flex-direction:column}:host([bordered]){box-shadow:inset 0 1px 0 var(--calcite-color-border-1);background-color:var(--calcite-color-foreground-1)}:host([bordered]) section{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-1)}:host([bordered][position=bottom]){box-shadow:inset 0 1px 0 var(--calcite-color-border-1),inset 0 -1px 0 var(--calcite-color-border-1)}:host([bordered]:not([position=bottom])) ::slotted(calcite-tab-nav){margin-block-end:-1px}:host([bordered][scale=s]) section{padding:.75rem}:host([bordered][scale=m]) section{padding:.5rem}:host([bordered][scale=l]) section{padding:1rem}:host([position=bottom]){flex-direction:column-reverse}section{display:flex;flex-grow:1;overflow:hidden;border-block-start-width:1px;border-block-start-color:var(--calcite-color-border-1);border-block-start-style:solid}:host([position=bottom]) section{flex-direction:column-reverse;border-block-start-width:0px;border-block-end-width:1px;border-block-end-color:var(--calcite-color-border-1)}:host([position=bottom]:not([bordered])) section{border-block-end-style:solid}@media (forced-colors: active){:host([bordered]) section{border-block-start-width:0px;border-block-end-width:1px}:host([position=bottom][bordered]) section{border-block-start-width:1px;border-block-end-width:0px}}:host([hidden]){display:none}[hidden]{display:none}`;
class x extends c {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.tabs = [], this.titles = [], this.bordered = !1, this.layout = "inline", this.position = "top", this.scale = "m", this.listen("calciteInternalTabNavSlotChange", this.calciteInternalTabNavSlotChangeHandler);
  }
  static {
    this.properties = { tabs: 16, titles: 16, bordered: 5, layout: 3, position: 3, scale: 3 };
  }
  static {
    this.styles = f;
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
  // #endregion
  // #region Private Methods
  calciteInternalTabNavSlotChangeHandler(e) {
    e.stopPropagation(), e.detail.length !== this.titles.length && (this.titles = e.detail);
  }
  defaultSlotChangeHandler(e) {
    this.tabs = p(e, "calcite-tab");
  }
  /**
   * Matches up elements from the internal `tabs` and `titles` to automatically
   * update the ARIA attributes and link `<calcite-tab>` and
   * `<calcite-tab-title>` components.
   */
  async updateAriaSettings() {
    await this.componentOnReady();
    let e, i;
    const o = m(this.slotEl, "calcite-tab");
    if (o.some((t) => t.tab) || this.titles.some((t) => t.tab))
      e = o.sort((t, a) => t.tab.localeCompare(a.tab)).map((t) => t.id), i = this.titles.sort((t, a) => t.tab.localeCompare(a.tab)).map((t) => t.id);
    else {
      const t = await Promise.all(o.map((s) => s.getTabIndex())), a = await Promise.all(this.titles.map((s) => s.getTabIndex()));
      e = t.reduce((s, l, r) => (s[l] = o[r].id, s), []), i = a.reduce((s, l, r) => (s[l] = this.titles[r].id, s), []);
    }
    o.forEach((t) => t._updateAriaInfo(e, i)), this.titles.forEach((t) => t._updateAriaInfo(e, i));
  }
  updateItems() {
    const { position: e, scale: i } = this, o = this.el.querySelector("calcite-tab-nav");
    o && (o.position = e, o.scale = i), Array.from(this.el.querySelectorAll("calcite-tab")).forEach((t) => {
      t.parentElement === this.el && (t.scale = i);
    }), Array.from(this.el.querySelectorAll("calcite-tab-nav > calcite-tab-title")).forEach((t) => {
      t.position = e, t.scale = i;
    });
  }
  setDefaultSlotRef(e) {
    this.slotEl = e;
  }
  // #endregion
  // #region Rendering
  render() {
    return n`<slot name=${u.titleGroup}></slot><section><slot @slotchange=${this.defaultSlotChangeHandler} ${b(this.setDefaultSlotRef)}></slot></section>`;
  }
}
h("calcite-tabs", x);
export {
  x as Tabs
};
