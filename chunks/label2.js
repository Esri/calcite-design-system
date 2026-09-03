/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as t, L as a, c as l, s as i, b as n, d as s } from "./index.js";
import { l as c, a as o, b as r } from "./useLabel.js";
const d = {
  container: "container"
}, b = t`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}:host([alignment=start]){text-align:start}:host([alignment=end]){text-align:end}:host([alignment=center]){text-align:center}:host([scale=s]) .container{gap:.25rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);margin-block-end:var(--calcite-label-margin-bottom, .5rem)}:host([scale=m]) .container{gap:.5rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);margin-block-end:var(--calcite-label-margin-bottom, .75rem)}:host([scale=l]) .container{gap:.5rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);margin-block-end:var(--calcite-label-margin-bottom, 1rem)}:host .container{margin-inline:0px;margin-block-start:0px;inline-size:100%;line-height:1.375;color:var(--calcite-color-text-1);color:var(--calcite-label-text-color, var(--calcite-color-text-1))}:host([layout=block]) .container,:host([layout=default]) .container{display:flex;flex-direction:column}:host([layout=inline]) .container,:host([layout=inline-space-between]) .container{display:flex;flex-direction:row;align-items:center;gap:.5rem}:host([layout=inline][scale=l]) .container{gap:.75rem}:host([layout=inline-space-between]) .container{justify-content:space-between}:host([disabled])>.container{opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted(*[disabled]),:host([disabled]) ::slotted(*[disabled] *){--tw-bg-opacity: 1}:host([disabled]) ::slotted(calcite-input-message:not([active])){--tw-bg-opacity: 0}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class h extends a {
  constructor() {
    super(), this.alignment = "start", this.layout = "block", this.scale = "m", this.calciteInternalLabelClick = l({ bubbles: !1, cancelable: !1 }), this.listen("click", this.labelClickHandler);
  }
  static {
    this.properties = { alignment: 3, for: 3, layout: 3, scale: 3 };
  }
  static {
    this.styles = b;
  }
  connectedCallback() {
    super.connectedCallback(), document.dispatchEvent(new CustomEvent(c));
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
    return n`<div class=${i(d.container)}><slot></slot></div>`;
  }
}
s("calcite-label", h);
export {
  h as Label
};
