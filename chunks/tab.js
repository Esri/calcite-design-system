import { b as n, L as o, A as l, s, x as r, q as d } from "./index.js";
import { n as b } from "./dom.js";
import { g as h } from "./guid.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const c = {
  container: "container",
  content: "content",
  scale: (t) => `scale-${t}`
}, p = {
  tabTitleId: (t) => `calcite-tab-title-${t}`
}, u = n`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:none}:host,.container,.content{block-size:100%;inline-size:100%}:host([selected]),:host([selected]) .container{display:flex;flex-direction:column}.content{box-sizing:border-box;padding-block:var(--calcite-tab-content-space-y, var(--calcite-tab-content-block-padding, var(--calcite-internal-tab-content-space-y)))}.scale-s{--calcite-internal-tab-content-space-y: .25rem;font-size:var(--calcite-font-size-sm);line-height:1rem}.scale-m{--calcite-internal-tab-content-space-y: .5rem;font-size:var(--calcite-font-size);line-height:1rem}.scale-l{--calcite-internal-tab-content-space-y: .625rem;font-size:var(--calcite-font-size-md);line-height:1.25rem}.container{display:none;block-size:100%;inline-size:100%;overflow:auto;outline-color:transparent}.container:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([hidden]){display:none}[hidden]{display:none}`;
class f extends o {
  constructor() {
    super(), this.guid = p.tabTitleId(h()), this.scale = "m", this.selected = !1, this.listenOn(document.body, "calciteInternalTabChange", this.internalTabChangeHandler);
  }
  static {
    this.properties = { labeledBy: 16, scale: 1, selected: 7, tab: 3 };
  }
  static {
    this.styles = u;
  }
  async getTabIndex() {
    return Array.prototype.indexOf.call(b(this.el.parentElement.children).filter((e) => e.matches("calcite-tab")), this.el);
  }
  _updateAriaInfo(e = [], i = []) {
    this.labeledBy = i[e.indexOf(this.el.id)] || null;
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
    e.composedPath().find((a) => a.tagName === "CALCITE-TABS") === this.parentTabsEl && (this.tab ? this.selected = this.tab === e.detail.tab : this.getTabIndex().then((a) => {
      this.selected = a === e.detail.tab;
    }), e.stopPropagation());
  }
  render() {
    const e = this.el.id || this.guid;
    return l(this.el, "aria-labelledby", this.labeledBy), l(this.el, "id", e), r`<div class=${s({ [c.container]: !0, [c.scale(this.scale)]: !0 })} role=tabpanel .tabIndex=${this.selected ? 0 : -1}><section class=${s(c.content)}><slot></slot></section></div>`;
  }
}
d("calcite-tab", f);
export {
  f as Tab
};
