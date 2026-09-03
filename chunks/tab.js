/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as l, L as o, O as s, s as c, b as r, d } from "./index.js";
import { n as b } from "./dom.js";
import { g as h } from "./guid.js";
import { i as p } from "./resources28.js";
import { i as f } from "./resources2.js";
const a = {
  container: "container",
  content: "content",
  scale: (t) => `scale-${t}`
}, m = {
  tabTitleId: (t) => `calcite-tab-title-${t}`
}, u = f("calcite-tab"), y = l`:host{display:none}:host,.container,.content{block-size:100%;inline-size:100%}:host([selected]),:host([selected]) .container{display:flex;flex-direction:column}.content{box-sizing:border-box;padding-block:var(--calcite-tab-content-space-y, var(--calcite-tab-content-block-padding, var(--calcite-internal-tab-content-space-y)))}.scale-s{--calcite-internal-tab-content-space-y: .25rem;font-size:var(--calcite-font-size-sm);line-height:1rem}.scale-m{--calcite-internal-tab-content-space-y: .5rem;font-size:var(--calcite-font-size);line-height:1rem}.scale-l{--calcite-internal-tab-content-space-y: var(--calcite-space-sm-plus);font-size:var(--calcite-font-size-md);line-height:1.25rem}.container{display:none;block-size:100%;inline-size:100%;overflow:auto;outline-color:transparent}.container:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([hidden]){display:none}[hidden]{display:none}`;
class g extends o {
  constructor() {
    super(), this.guid = m.tabTitleId(h()), this.parentTabsEl = null, this.scale = "m", this.selected = !1, this.listenOn(document.body, "calciteInternalTabChange", this.internalTabChangeHandler);
  }
  static {
    this.properties = { labeledBy: 16, scale: 1, selected: 7, tab: 3 };
  }
  static {
    this.styles = y;
  }
  async getTabIndex() {
    return Array.prototype.indexOf.call(b(this.el.parentElement.children).filter(u), this.el);
  }
  _updateAriaInfo(e = [], i = []) {
    this.labeledBy = i[e.indexOf(this.el.id)] || void 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.parentTabsEl = this.el.closest("calcite-tabs");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.body?.dispatchEvent(new CustomEvent("calciteTabUnregister", {
      detail: this.el
    }));
  }
  internalTabChangeHandler(e) {
    e.composedPath().find(p) === this.parentTabsEl && (this.tab ? this.selected = this.tab === e.detail.tab : this.getTabIndex().then((n) => {
      this.selected = n === e.detail.tab;
    }), e.stopPropagation());
  }
  render() {
    const e = this.el.id || this.guid;
    return s(this.el, "aria-labelledby", this.labeledBy), s(this.el, "id", e), r`<div class=${c({ [a.container]: !0, [a.scale(this.scale)]: !0 })} role=tabpanel .tabIndex=${this.selected ? 0 : -1}><section class=${c(a.content)}><slot></slot></section></div>`;
  }
}
d("calcite-tab", g);
export {
  g as Tab
};
