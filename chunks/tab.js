import { h as s, L as c, q as i, s as n, x as o, j as r } from "./iframe.js";
import { n as d } from "./dom.js";
import { g as b } from "./guid.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.17 */
const l = {
  container: "container",
  content: "content"
}, h = s`:host([selected]) section,:host([selected]) .container{display:block}:host{display:none;block-size:100%;inline-size:100%}:host([selected]){display:block;block-size:100%;inline-size:100%;overflow:auto}.content{box-sizing:border-box;padding-block:var(--calcite-internal-tab-content-block-padding)}.scale-s{--calcite-internal-tab-content-block-padding: var(--calcite-tab-content-block-padding, .25rem);font-size:var(--calcite-font-size--2);line-height:1rem}.scale-m{--calcite-internal-tab-content-block-padding: var(--calcite-tab-content-block-padding, .5rem);font-size:var(--calcite-font-size--1);line-height:1rem}.scale-l{--calcite-internal-tab-content-block-padding: var(--calcite-tab-content-block-padding, .625rem);font-size:var(--calcite-font-size-0);line-height:1.25rem}section,.container{display:none;block-size:100%;inline-size:100%}.container{outline-color:transparent}.container:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([hidden]){display:none}[hidden]{display:none}`;
class p extends c {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.guid = `calcite-tab-title-${b()}`, this.scale = "m", this.selected = !1, this.listenOn(document.body, "calciteInternalTabChange", this.internalTabChangeHandler);
  }
  static {
    this.properties = { labeledBy: 16, scale: 1, selected: 7, tab: 3 };
  }
  static {
    this.styles = h;
  }
  // #endregion
  // #region Public Methods
  /** Returns the index of the component item within the tab array. */
  async getTabIndex() {
    return Array.prototype.indexOf.call(d(this.el.parentElement.children).filter((e) => e.matches("calcite-tab")), this.el);
  }
  /**
   * @param tabIds
   * @param titleIds
   * @private
   */
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
  // #endregion
  // #region Private Methods
  internalTabChangeHandler(e) {
    e.composedPath().find((t) => t.tagName === "CALCITE-TABS") === this.parentTabsEl && (this.tab ? this.selected = this.tab === e.detail.tab : this.getTabIndex().then((t) => {
      this.selected = t === e.detail.tab;
    }), e.stopPropagation());
  }
  // #endregion
  // #region Rendering
  render() {
    const e = this.el.id || this.guid;
    return i(this.el, "aria-labelledby", this.labeledBy), i(this.el, "id", e), o`<div class=${n({ [l.container]: !0, [`scale-${this.scale}`]: !0 })} role=tabpanel .tabIndex=${this.selected ? 0 : -1}><section class=${n(l.content)}><slot></slot></section></div>`;
  }
}
r("calcite-tab", p);
export {
  p as Tab
};
