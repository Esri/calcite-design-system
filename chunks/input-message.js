/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a, L as c, T as n, O as o, b as t, s as l, d as r } from "./index.js";
import { z as e } from "./dom.js";
const u = {
  inputMessageIcon: "calcite-input-message-icon"
}, s = {
  valid: "check-circle",
  invalid: "exclamation-mark-triangle",
  idle: "information"
}, d = a`:host{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;box-sizing:border-box;display:flex;block-size:auto;inline-size:100%;align-items:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);opacity:1;margin-block-start:var(--calcite-input-message-spacing, var(--calcite-input-message-spacing-value, var(--calcite-spacing-xxs)))}.calcite-input-message-icon{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;pointer-events:none;display:inline-flex;flex-shrink:0;margin-inline-end:var(--calcite-spacing-sm)}:host([status=invalid]) .calcite-input-message-icon{color:var(--calcite-input-message-icon-color, var(--calcite-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-status-danger))))}:host([status=valid]) .calcite-input-message-icon{color:var(--calcite-input-message-icon-color, var(--calcite-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-status-success))))}:host([status=idle]) .calcite-input-message-icon{color:var(--calcite-input-message-icon-color, var(--calcite-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-brand))))}:host([scale=s]){font-size:var(--calcite-font-size-relative-xs);line-height:var(--calcite-font-line-height-xs)}:host([scale=m]){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=l]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([hidden]){display:none}[hidden]{display:none}`;
class h extends c {
  constructor() {
    super(...arguments), this.iconFlipRtl = !1, this.scale = "m", this.status = "idle";
  }
  static {
    this.properties = { icon: [3, { converter: n }], iconFlipRtl: 7, scale: 3, status: 3 };
  }
  static {
    this.styles = d;
  }
  connectedCallback() {
    super.connectedCallback(), this.requestedIcon = e(s, this.icon, this.status);
  }
  willUpdate(i) {
    (i.has("status") && (this.hasUpdated || this.status !== "idle") || i.has("icon")) && (this.requestedIcon = e(s, this.icon, this.status));
  }
  render() {
    const i = this.el.hidden;
    return o(this.el, "calcite-hydrated-hidden", i), t`${this.renderIcon(this.requestedIcon)}<slot></slot>`;
  }
  renderIcon(i) {
    return i && t`<calcite-icon class=${l(u.inputMessageIcon)} .flipRtl=${this.iconFlipRtl} .icon=${i} scale=s></calcite-icon>`;
  }
}
r("calcite-input-message", h);
export {
  h as InputMessage
};
