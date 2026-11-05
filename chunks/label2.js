/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as t, L as a, d as n, s as l, b as i, f as c } from "./index.js";
import { l as s, a as o, b as r } from "./useLabel.js";
const m = {
  container: "container"
}, h = t`:host{display:flex}:host([alignment=start]){text-align:start}:host([alignment=end]){text-align:end}:host([alignment=center]){text-align:center}:host([scale=s]) .container{gap:.25rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);margin-block-end:var(--calcite-label-margin-bottom, .5rem)}:host([scale=m]) .container{gap:.5rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);margin-block-end:var(--calcite-label-margin-bottom, .75rem)}:host([scale=l]) .container{gap:.5rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);margin-block-end:var(--calcite-label-margin-bottom, 1rem)}:host .container{margin-inline:0px;margin-block-start:0px;inline-size:100%;line-height:1.375;color:var(--calcite-color-text-1);color:var(--calcite-label-text-color, var(--calcite-color-text-1))}:host([layout=block]) .container{display:flex;flex-direction:column}:host([layout=inline]) .container,:host([layout=inline-space-between]) .container{display:flex;flex-direction:row;align-items:center;gap:.5rem}:host([layout=inline][scale=l]) .container{gap:.75rem}:host([layout=inline-space-between]) .container{justify-content:space-between}:host([hidden]){display:none}[hidden]{display:none}`;
class d extends a {
  constructor() {
    super(), this.alignment = "start", this.layout = "block", this.scale = "m", this.calciteInternalLabelClick = n({ bubbles: !1, cancelable: !1 }), this.listen("click", this.labelClickHandler);
  }
  static {
    this.properties = { alignment: 3, for: 3, layout: 3, scale: 3 };
  }
  static {
    this.styles = h;
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
    return i`<div class=${l(m.container)}><slot></slot></div>`;
  }
}
c("calcite-label", d);
export {
  d as Label
};
