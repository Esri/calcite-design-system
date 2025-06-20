import { a as s, L as n, k as c, s as i, x as o, c as r } from "./iframe.js";
import { n as d } from "./dom.js";
import { g as b } from "./guid.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
const l = {
  container: "container",
  content: "content"
}, h = s`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:none}:host,.container,.content{block-size:100%;inline-size:100%}:host([selected]),:host([selected]) .container{display:flex;flex-direction:column}.content{box-sizing:border-box;padding-block:var(--calcite-tab-content-space-y, var(--calcite-tab-content-block-padding, var(--calcite-internal-tab-content-space-y)))}.scale-s{--calcite-internal-tab-content-space-y: .25rem;font-size:var(--calcite-font-size-sm);line-height:1rem}.scale-m{--calcite-internal-tab-content-space-y: .5rem;font-size:var(--calcite-font-size);line-height:1rem}.scale-l{--calcite-internal-tab-content-space-y: .625rem;font-size:var(--calcite-font-size-md);line-height:1.25rem}.container{display:none;block-size:100%;inline-size:100%;overflow:auto;outline-color:transparent}.container:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([hidden]){display:none}[hidden]{display:none}`;
class p extends n {
  constructor() {
    super(), this.guid = `calcite-tab-title-${b()}`, this.scale = "m", this.selected = !1, this.listenOn(document.body, "calciteInternalTabChange", this.internalTabChangeHandler);
  }
  static {
    this.properties = { labeledBy: 16, scale: 1, selected: 7, tab: 3 };
  }
  static {
    this.styles = h;
  }
  async getTabIndex() {
    return Array.prototype.indexOf.call(d(this.el.parentElement.children).filter((e) => e.matches("calcite-tab")), this.el);
  }
  _updateAriaInfo(e = [], a = []) {
    this.labeledBy = a[e.indexOf(this.el.id)] || null;
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
    e.composedPath().find((t) => t.tagName === "CALCITE-TABS") === this.parentTabsEl && (this.tab ? this.selected = this.tab === e.detail.tab : this.getTabIndex().then((t) => {
      this.selected = t === e.detail.tab;
    }), e.stopPropagation());
  }
  render() {
    const e = this.el.id || this.guid;
    return c(this.el, "aria-labelledby", this.labeledBy), c(this.el, "id", e), o`<div class=${i({ [l.container]: !0, [`scale-${this.scale}`]: !0 })} role=tabpanel .tabIndex=${this.selected ? 0 : -1}><section class=${i(l.content)}><slot></slot></section></div>`;
  }
}
r("calcite-tab", p);
export {
  p as Tab
};
