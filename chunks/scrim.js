import { d as r, L as o, s, x as i, h as c } from "./iframe.js";
import { n as d } from "./ref.js";
import { c as h } from "./observers.js";
import { u as m } from "./dom.js";
import { u } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const n = {
  scrim: "scrim",
  content: "content"
}, a = {
  s: 72,
  // Less than 72px.
  // medium is assumed default.
  l: 480
  // Greater than or equal to 480px.
}, g = r`:host{position:absolute;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;block-size:100%;inline-size:100%;flex-direction:column;align-items:stretch}@keyframes calcite-scrim-fade-in{0%{--tw-bg-opacity: 0 }to{--tw-text-opacity: 1 }}.scrim{position:absolute;inset:0;display:flex;flex-direction:column;align-content:center;align-items:center;justify-content:center;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background, var(--calcite-color-transparent-scrim))}.content{padding:1rem}:host([hidden]){display:none}[hidden]{display:none}`;
class f extends o {
  constructor() {
    super(...arguments), this.resizeObserver = h("resize", () => this.handleResize()), this.hasContent = !1, this.loading = !1, this.messages = u();
  }
  static {
    this.properties = { hasContent: 16, loaderScale: 16, loading: 7, messageOverrides: 0 };
  }
  static {
    this.styles = g;
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), this.resizeObserver?.observe(this.el);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  // #endregion
  // #region Private Methods
  handleDefaultSlotChange(e) {
    this.hasContent = m(e);
  }
  storeLoaderEl(e) {
    this.loaderEl = e, this.handleResize();
  }
  getScale(e) {
    return e < a.s ? "s" : e >= a.l ? "l" : "m";
  }
  handleResize() {
    const { loaderEl: e, el: t } = this;
    e && (this.loaderScale = this.getScale(Math.min(t.clientHeight, t.clientWidth) ?? 0));
  }
  // #endregion
  // #region Rendering
  render() {
    const { hasContent: e, loading: t, messages: l } = this;
    return i`<div class=${s(n.scrim)}>${t ? i`<calcite-loader .label=${l.loading} .scale=${this.loaderScale} ${d(this.storeLoaderEl)}></calcite-loader>` : null}<div class=${s(n.content)} .hidden=${!e}><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></div>`;
  }
}
c("calcite-scrim", f);
export {
  f as Scrim
};
