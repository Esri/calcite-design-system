/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as o, L as r, s, b as i, f as d } from "./index.js";
import { e as h, n as m } from "./ref.js";
import { c as p } from "./observers.js";
import { x as f } from "./dom.js";
import { u } from "./useT9n.js";
const a = {
  scrim: "scrim",
  content: "content"
}, n = {
  s: 72,
  // Less than 72px.
  // medium is assumed default.
  l: 480
  // Greater than or equal to 480px.
}, g = o`:host{position:absolute;inset:var(--calcite-space-none);z-index:var(--calcite-z-index-overlay);display:flex;block-size:100%;inline-size:100%;flex-direction:column;align-items:stretch}@keyframes calcite-scrim-fade-in{0%{opacity:0}to{opacity:var(--calcite-opacity-full)}}.scrim{position:absolute;inset:var(--calcite-space-none);display:flex;flex-direction:column;align-content:center;align-items:center;justify-content:center;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background, var(--calcite-color-transparent-scrim))}.content{padding:var(--calcite-space-lg)}:host([hidden]){display:none}[hidden]{display:none}`;
class v extends r {
  constructor() {
    super(...arguments), this.loaderRef = h(), this.resizeObserver = p("resize", () => this.handleResize()), this.messages = u(), this.hasContent = !1, this.loading = !1;
  }
  static {
    this.properties = { hasContent: 16, loaderScale: 16, loading: 7, messageOverrides: 0 };
  }
  static {
    this.styles = g;
  }
  connectedCallback() {
    super.connectedCallback(), this.resizeObserver?.observe(this.el);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  handleDefaultSlotChange(e) {
    this.hasContent = f(e);
  }
  getScale(e) {
    return e < n.s ? "s" : e >= n.l ? "l" : "m";
  }
  handleResize() {
    const { el: e } = this;
    this.loaderScale = this.getScale(Math.min(e.clientHeight, e.clientWidth) ?? 0);
  }
  render() {
    const { hasContent: e, loading: c, loaderScale: t, messages: l } = this;
    return i`<div class=${s(a.scrim)}>${c && t ? i`<calcite-loader .label=${l.loading} .scale=${t} ${m(this.loaderRef)}></calcite-loader>` : null}<div class=${s(a.content)} .hidden=${!e}><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></div>`;
  }
}
d("calcite-scrim", v);
export {
  v as Scrim
};
