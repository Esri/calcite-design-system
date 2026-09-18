/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as o, L as r, s, b as i, d } from "./index.js";
import { e as h, n as m } from "./ref.js";
import { c as u } from "./observers.js";
import { u as f } from "./dom.js";
import { u as g } from "./useT9n.js";
const n = {
  scrim: "scrim",
  content: "content"
}, a = {
  s: 72,
  // Less than 72px.
  // medium is assumed default.
  l: 480
  // Greater than or equal to 480px.
}, p = o`:host{position:absolute;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;block-size:100%;inline-size:100%;flex-direction:column;align-items:stretch}@keyframes calcite-scrim-fade-in{0%{--tw-bg-opacity: 0 }to{--tw-text-opacity: 1 }}.scrim{position:absolute;inset:0;display:flex;flex-direction:column;align-content:center;align-items:center;justify-content:center;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background, var(--calcite-color-transparent-scrim))}.content{padding:1rem}:host([hidden]){display:none}[hidden]{display:none}`;
class b extends r {
  constructor() {
    super(...arguments), this.loaderRef = h(), this.resizeObserver = u("resize", () => this.handleResize()), this.messages = g(), this.hasContent = !1, this.loading = !1;
  }
  static {
    this.properties = { hasContent: 16, loaderScale: 16, loading: 7, messageOverrides: 0 };
  }
  static {
    this.styles = p;
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
    return e < a.s ? "s" : e >= a.l ? "l" : "m";
  }
  handleResize() {
    const { el: e } = this;
    this.loaderScale = this.getScale(Math.min(e.clientHeight, e.clientWidth) ?? 0);
  }
  render() {
    const { hasContent: e, loading: l, loaderScale: t, messages: c } = this;
    return i`<div class=${s(n.scrim)}>${l && t ? i`<calcite-loader .label=${c.loading} .scale=${t} ${m(this.loaderRef)}></calcite-loader>` : null}<div class=${s(n.content)} .hidden=${!e}><slot @slotchange=${this.handleDefaultSlotChange}></slot></div></div>`;
  }
}
d("calcite-scrim", b);
export {
  b as Scrim
};
