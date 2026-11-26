/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as t, L as a, c as l, s as n, b as i, d as c } from "./index.js";
import { l as s, a as o, b as r } from "./useLabel.js";
const h = {
  container: "container"
}, d = t`:host{display:flex}:host([alignment=start]){text-align:start}:host([alignment=end]){text-align:end}:host([alignment=center]){text-align:center}:host([scale=s]) .container{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);gap:var(--calcite-space-2xs);margin-block-end:var(--calcite-label-margin-bottom, var(--calcite-space-sm))}:host([scale=m]) .container{font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);gap:var(--calcite-space-sm);margin-block-end:var(--calcite-label-margin-bottom, var(--calcite-space-md))}:host([scale=l]) .container{font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);gap:var(--calcite-space-sm);margin-block-end:var(--calcite-label-margin-bottom, var(--calcite-space-lg))}:host .container{margin-block-start:var(--calcite-space-none);margin-inline:var(--calcite-space-none);inline-size:100%;line-height:var(--calcite-font-line-height-relative-snug);color:var(--calcite-label-text-color, var(--calcite-color-text-1))}:host([layout=block]) .container{display:flex;flex-direction:column}:host([layout=inline]) .container,:host([layout=inline-space-between]) .container{display:flex;flex-direction:row;align-items:center;gap:var(--calcite-space-sm)}:host([layout=inline][scale=l]) .container{gap:var(--calcite-space-md)}:host([layout=inline-space-between]) .container{justify-content:space-between}:host([hidden]){display:none}[hidden]{display:none}`;
class m extends a {
  constructor() {
    super(), this.alignment = "start", this.layout = "block", this.scale = "m", this.calciteInternalLabelClick = l({ bubbles: !1, cancelable: !1 }), this.listen("click", this.labelClickHandler);
  }
  static {
    this.properties = { alignment: 3, for: 3, layout: 3, scale: 3 };
  }
  static {
    this.styles = d;
  }
  connectedCallback() {
    super.connectedCallback(), document.dispatchEvent(new CustomEvent(s));
  }
  willUpdate(e) {
    e.has("for") && o(this.el);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.dispatchEvent(new CustomEvent(r));
  }
  labelClickHandler(e) {
    window.getSelection()?.type === "Range" || e.defaultPrevented || this.calciteInternalLabelClick.emit({
      sourceEvent: e
    });
  }
  render() {
    return i`<div class=${n(h.container)}><slot></slot></div>`;
  }
}
c("calcite-label", m);
export {
  m as Label
};
