/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as c, L as l, s as n, b as e, f as d } from "./index.js";
import { i } from "./keyed.js";
import { s as a } from "./dom.js";
import { S as o, C as s } from "./resources19.js";
const r = c`:host([disabled]) .content{opacity:var(--calcite-opacity-disabled);cursor:default;-webkit-user-select:none;user-select:none}:host([disabled]) .content *,:host([disabled]) .content ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column;flex:1 1 0%}.container{color:var(--calcite-color-text-2);display:flex;flex:1 1 auto;font-weight:var(--calcite-theme-font-weight-regular, var(--calcite-font-weight-normal));align-items:stretch}.content{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug);display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;padding-inline:var(--calcite-stack-padding-inline, .75rem);padding-block:var(--calcite-stack-padding-block, .5rem)}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:0 1 auto}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){align-self:center;margin-inline:var(--calcite-space-md)}.actions-start,.actions-end,.content-start,.content-end{display:flex;align-items:center}.actions-start ::slotted(calcite-action),.actions-start ::slotted(calcite-action-menu),.actions-start ::slotted(calcite-sort-handle),.actions-start ::slotted(calcite-dropdown),.actions-end ::slotted(calcite-action),.actions-end ::slotted(calcite-action-menu),.actions-end ::slotted(calcite-sort-handle),.actions-end ::slotted(calcite-dropdown){align-self:stretch;color:inherit}:host([hidden]){display:none}[hidden]{display:none}`;
class h extends l {
  constructor() {
    super(...arguments), this.hasActionsEnd = !1, this.hasActionsStart = !1, this.hasContentEnd = !1, this.hasContentStart = !1, this.disabled = !1;
  }
  static {
    this.properties = { hasActionsEnd: 16, hasActionsStart: 16, hasContentEnd: 16, hasContentStart: 16, disabled: 7 };
  }
  static {
    this.styles = r;
  }
  handleActionsStartSlotChange(t) {
    this.hasActionsStart = a(t);
  }
  handleActionsEndSlotChange(t) {
    this.hasActionsEnd = a(t);
  }
  handleContentStartSlotChange(t) {
    this.hasContentStart = a(t);
  }
  handleContentEndSlotChange(t) {
    this.hasContentEnd = a(t);
  }
  renderActionsStart() {
    const { hasActionsStart: t } = this;
    return i("actions-start-container", e`<div class=${n(s.actionsStart)} .hidden=${!t}><slot name=${o.actionsStart} @slotchange=${this.handleActionsStartSlotChange}></slot></div>`);
  }
  renderActionsEnd() {
    const { hasActionsEnd: t } = this;
    return i("actions-end-container", e`<div class=${n(s.actionsEnd)} .hidden=${!t}><slot name=${o.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot></div>`);
  }
  renderContentStart() {
    const { hasContentStart: t } = this;
    return e`<div class=${n(s.contentStart)} .hidden=${!t}><slot name=${o.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot></div>`;
  }
  renderDefaultContent() {
    return e`<div class=${n(s.content)}><slot></slot></div>`;
  }
  renderContentEnd() {
    const { hasContentEnd: t } = this;
    return e`<div class=${n(s.contentEnd)} .hidden=${!t}><slot name=${o.contentEnd} @slotchange=${this.handleContentEndSlotChange}></slot></div>`;
  }
  render() {
    return e`<div class=${n(s.container)}>${this.renderActionsStart()}${this.renderContentStart()}${this.renderDefaultContent()}${this.renderContentEnd()}${this.renderActionsEnd()}</div>`;
  }
}
d("calcite-stack", h);
export {
  h as Stack
};
