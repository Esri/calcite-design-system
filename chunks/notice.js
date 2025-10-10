import { b as d, L as h, c as i, u as g, s as e, x as c, q as m } from "./index.js";
import { e as p, n as a } from "./ref.js";
import { m as s, s as f } from "./dom.js";
import { K as l } from "./resources4.js";
import { t as u } from "./openCloseComponent.js";
import { g as r } from "./component.js";
import { u as b } from "./useT9n.js";
import { u as v } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const n = {
  title: "title",
  message: "message",
  link: "link",
  actionsEnd: "actions-end"
}, o = {
  actionsEnd: "actions-end",
  close: "notice-close",
  container: "container",
  content: "notice-content",
  icon: "notice-icon"
}, k = d`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([scale=s]){--calcite-notice-spacing-token-small: .5rem;--calcite-notice-spacing-token-large: .75rem}:host([scale=s]) .container slot[name=title]::slotted(*),:host([scale=s]) .container *::slotted([slot=title]){margin-block:.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=s]) .container slot[name=message]::slotted(*),:host([scale=s]) .container *::slotted([slot=message]){margin-block:.125rem;font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) ::slotted(calcite-link){margin-block:.125rem;font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) .notice-close{padding:.5rem}:host([scale=m]){--calcite-notice-spacing-token-small: .75rem;--calcite-notice-spacing-token-large: 1rem}:host([scale=m]) .container slot[name=title]::slotted(*),:host([scale=m]) .container *::slotted([slot=title]){margin-block:.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=m]) .container slot[name=message]::slotted(*),:host([scale=m]) .container *::slotted([slot=message]){margin-block:.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) ::slotted(calcite-link){margin-block:.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=l]){--calcite-notice-spacing-token-small: 1rem;--calcite-notice-spacing-token-large: 1.25rem}:host([scale=l]) .container slot[name=title]::slotted(*),:host([scale=l]) .container *::slotted([slot=title]){margin-block:.125rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host([scale=l]) .container slot[name=message]::slotted(*),:host([scale=l]) .container *::slotted([slot=message]){margin-block:.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) ::slotted(calcite-link){margin-block:.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([width=auto]){--calcite-notice-width: auto}:host([width=half]){--calcite-notice-width: 50%}:host([width=full]){--calcite-notice-width: 100%}:host{margin-inline:auto;display:none;max-inline-size:100%;align-items:center;inline-size:var(--calcite-notice-width)}.container{pointer-events:none;margin-block:0px;box-sizing:border-box;display:flex;inline-size:100%;opacity:0;overflow:hidden;max-block-size:0;transition-property:opacity,max-block-size;transition-duration:var(--calcite-animation-timing);text-align:start;border-inline-start:var(--calcite-border-width-md) solid;box-shadow:0 0 0 0 transparent;background-color:var(--calcite-notice-background-color, var(--calcite-color-foreground-1))}.notice-close{outline-color:transparent}.notice-close:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host{display:flex}:host([open]) .container{pointer-events:auto;max-block-size:100%;align-items:center;opacity:1;--tw-shadow: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--tw-shadow-colored: 0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);overflow:visible}.container slot[name=title]::slotted(*),.container *::slotted([slot=title]){margin:0;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-notice-title-text-color, var(--calcite-color-text-1))}.container slot[name=message]::slotted(*),.container *::slotted([slot=message]){margin:0;display:inline;font-weight:var(--calcite-font-weight-normal);margin-inline-end:var(--calcite-notice-spacing-token-small);color:var(--calcite-notice-content-text-color, var(--calcite-color-text-2))}.notice-content{box-sizing:border-box;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;display:flex;min-inline-size:0px;flex-direction:column;overflow-wrap:break-word;flex:1 1 0;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:0 var(--calcite-notice-spacing-token-small)}.notice-content:first-of-type:not(:only-child){padding-inline-start:var(--calcite-notice-spacing-token-large)}.notice-content:only-of-type{padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large)}.notice-icon{display:flex;align-items:center;box-sizing:border-box;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto}.notice-close{display:flex;cursor:pointer;align-items:center;align-self:stretch;border-style:none;background-color:transparent;outline:2px solid transparent;outline-offset:2px;box-sizing:border-box;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;-webkit-appearance:none;color:var(--calcite-notice-close-icon-color, var(--calcite-color-text-3))}.notice-close:hover,.notice-close:focus{background-color:var(--calcite-notice-close-background-color-focus, var(--calcite-color-foreground-2));color:var(--calcite-notice-close-icon-color-hover, var(--calcite-color-text-1))}.notice-close:active{background-color:var(--calcite-notice-close-background-color-press, var(--calcite-color-foreground-3))}.actions-end{display:flex;align-self:stretch}:host([kind=brand]) .container{border-color:var(--calcite-color-brand)}:host([kind=brand]) .container .notice-icon{color:var(--calcite-color-brand)}:host([kind=info]) .container{border-color:var(--calcite-color-status-info)}:host([kind=info]) .container .notice-icon{color:var(--calcite-color-status-info)}:host([kind=danger]) .container{border-color:var(--calcite-color-status-danger)}:host([kind=danger]) .container .notice-icon{color:var(--calcite-color-status-danger)}:host([kind=success]) .container{border-color:var(--calcite-color-status-success)}:host([kind=success]) .container .notice-icon{color:var(--calcite-color-status-success)}:host([kind=warning]) .container{border-color:var(--calcite-color-status-warning)}:host([kind=warning]) .container .notice-icon{color:var(--calcite-color-status-warning)}:host([hidden]){display:none}[hidden]{display:none}`;
class x extends h {
  constructor() {
    super(...arguments), this.closeButtonRef = p(), this.transitionProp = "opacity", this.messages = b(), this.focusSetter = v()(this), this.hasActionEnd = !1, this.closable = !1, this.iconFlipRtl = !1, this.kind = "brand", this.open = !1, this.scale = "m", this.width = "auto", this.calciteNoticeBeforeClose = i({ cancelable: !1 }), this.calciteNoticeBeforeOpen = i({ cancelable: !1 }), this.calciteNoticeClose = i({ cancelable: !1 }), this.calciteNoticeOpen = i({ cancelable: !1 });
  }
  static {
    this.properties = { hasActionEnd: 16, closable: 7, icon: [3, { converter: g, type: String }], iconFlipRtl: 7, kind: 3, messageOverrides: 0, open: 7, scale: 3, width: 3 };
  }
  static {
    this.styles = k;
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el.querySelector("calcite-link") || this.closeButtonRef.value, t);
  }
  async load() {
    this.requestedIcon = s(l, this.icon, this.kind);
  }
  willUpdate(t) {
    t.has("open") && (this.hasUpdated || this.open !== !1) && u(this), (t.has("icon") || t.has("kind") && (this.hasUpdated || this.kind !== "brand")) && (this.requestedIcon = s(l, this.icon, this.kind));
  }
  onBeforeClose() {
    this.calciteNoticeBeforeClose.emit();
  }
  onBeforeOpen() {
    this.calciteNoticeBeforeOpen.emit();
  }
  onClose() {
    this.calciteNoticeClose.emit();
  }
  onOpen() {
    this.calciteNoticeOpen.emit();
  }
  setTransitionEl(t) {
    t && (this.transitionEl = t);
  }
  close() {
    this.open = !1;
  }
  handleActionsEndSlotChange(t) {
    this.hasActionEnd = f(t);
  }
  render() {
    const t = c`<button .ariaLabel=${this.messages.close} class=${e(o.close)} @click=${this.close} ${a(this.closeButtonRef)}><calcite-icon icon=x .scale=${r(this.scale)}></calcite-icon></button>`;
    return c`<div class=${e(o.container)} ${a(this.setTransitionEl)}>${this.requestedIcon ? c`<div class=${e(o.icon)}><calcite-icon .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${r(this.scale)}></calcite-icon></div>` : null}<div class=${e(o.content)}><slot name=${n.title}></slot><slot name=${n.message}></slot><slot name=${n.link}></slot></div><div class=${e(o.actionsEnd)} .hidden=${!this.hasActionEnd}><slot name=${n.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot></div>${this.closable ? t : null}</div>`;
  }
}
m("calcite-notice", x);
export {
  x as Notice
};
