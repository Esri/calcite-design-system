import { h as n, L as o, n as a, q as c, x as i, j as l } from "./iframe.js";
import { u as e } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.20 */
const s = {
  valid: "check-circle",
  invalid: "exclamation-mark-triangle",
  idle: "information"
}, r = n`:host{box-sizing:border-box;display:flex;block-size:auto;inline-size:100%;align-items:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);opacity:1;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;--calcite-input-message-spacing-value: .25rem;margin-block-start:var(--calcite-input-message-spacing-value)}.calcite-input-message-icon{pointer-events:none;display:inline-flex;flex-shrink:0;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;margin-inline-end:.5rem}:host([status=invalid]) .calcite-input-message-icon{color:var(--calcite-color-status-danger)}:host([status=warning]) .calcite-input-message-icon{color:var(--calcite-color-status-warning)}:host([status=valid]) .calcite-input-message-icon{color:var(--calcite-color-status-success)}:host([status=idle]) .calcite-input-message-icon{color:var(--calcite-color-brand)}:host([scale=s]){font-size:var(--calcite-font-size--3);line-height:.75rem}:host([scale=m]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=l]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([hidden]){display:none}[hidden]{display:none}`;
class d extends o {
  constructor() {
    super(...arguments), this.iconFlipRtl = !1, this.scale = "m", this.status = "idle";
  }
  static {
    this.properties = { icon: [3, { converter: a }], iconFlipRtl: 7, scale: 3, status: 3 };
  }
  static {
    this.styles = r;
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), this.requestedIcon = e(s, this.icon, this.status);
  }
  willUpdate(t) {
    (t.has("status") && (this.hasUpdated || this.status !== "idle") || t.has("icon")) && (this.requestedIcon = e(s, this.icon, this.status));
  }
  // #endregion
  // #region Private Methods
  // #endregion
  // #region Rendering
  render() {
    const t = this.el.hidden;
    return c(this.el, "calcite-hydrated-hidden", t), i`${this.renderIcon(this.requestedIcon)}<slot></slot>`;
  }
  renderIcon(t) {
    if (t)
      return i`<calcite-icon class="calcite-input-message-icon" .flipRtl=${this.iconFlipRtl} .icon=${t} scale=s></calcite-icon>`;
  }
}
l("calcite-input-message", d);
export {
  d as InputMessage
};
