/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as r, L as d, c as i, T as h, s as t, b as c, d as g } from "./index.js";
import { e as a, n as l } from "./ref.js";
import { z as s, s as p } from "./dom.js";
import { K as v, a as u } from "./resources2.js";
import { t as m } from "./openCloseComponent.js";
import { g as f } from "./component.js";
import { u as b } from "./useT9n.js";
import { u as k } from "./useSetFocus.js";
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
}, x = r`:host([scale=s]){--calcite-notice-spacing-token-small: .5rem;--calcite-notice-spacing-token-large: .75rem}:host([scale=s]) .container slot[name=title]::slotted(*),:host([scale=s]) .container *::slotted([slot=title]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=s]) .container slot[name=message]::slotted(*),:host([scale=s]) .container *::slotted([slot=message]){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=s]) ::slotted(calcite-link){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=m]){--calcite-notice-spacing-token-small: .75rem;--calcite-notice-spacing-token-large: 1rem}:host([scale=m]) .container slot[name=title]::slotted(*),:host([scale=m]) .container *::slotted([slot=title]){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=m]) .container slot[name=message]::slotted(*),:host([scale=m]) .container *::slotted([slot=message]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=m]) ::slotted(calcite-link){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]){--calcite-notice-spacing-token-small: 1rem;--calcite-notice-spacing-token-large: 1.25rem}:host([scale=l]) .container slot[name=title]::slotted(*),:host([scale=l]) .container *::slotted([slot=title]){font-size:var(--calcite-font-size-relative-lg);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]) .container slot[name=message]::slotted(*),:host([scale=l]) .container *::slotted([slot=message]){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]) ::slotted(calcite-link){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]) .notice-close{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=l]) .actions-end{margin-inline-end:var(--calcite-spacing-sm);gap:var(--calcite-spacing-sm)}:host([width=auto]){--calcite-notice-width: auto}:host([width=half]){--calcite-notice-width: 50%}:host([width=full]){--calcite-notice-width: 100%}:host{margin-inline:auto;display:none;max-inline-size:100%;align-items:center;inline-size:var(--calcite-notice-width)}.container{pointer-events:none;margin-block:0px;box-sizing:border-box;display:flex;inline-size:100%;opacity:0;overflow:hidden;max-block-size:0;transition-property:opacity,max-block-size;transition-duration:var(--calcite-animation-timing);text-align:start;border-radius:var(--calcite-notice-corner-radius, var(--calcite-corner-radius-sm));box-shadow:var(--calcite-notice-shadow, var(--calcite-shadow-none))}:host{display:flex}:host([open]) .container{pointer-events:auto;max-block-size:100%;align-items:center;opacity:1;overflow:visible}@starting-style{:host([open]) .container{opacity:0;max-block-size:0}}:host([open][appearance=outline-fill]) .container{border:var(--calcite-border-width-sm) solid}.container slot[name=title]::slotted(*),.container *::slotted([slot=title]){margin:0;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-notice-title-text-color, var(--calcite-color-text-1))}.container slot[name=message]::slotted(*),.container *::slotted([slot=message]){margin:0;display:inline;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-notice-content-text-color, var(--calcite-color-text-2))}:host(:not([kind=neutral])[appearance=solid]) .container slot[name=title]::slotted(*),:host(:not([kind=neutral])[appearance=solid]) .container *::slotted([slot=title]){color:var(--calcite-notice-title-text-color, var(--calcite-color-text-inverse))}:host(:not([kind=neutral])[appearance=solid]) .container slot[name=message]::slotted(*),:host(:not([kind=neutral])[appearance=solid]) .container *::slotted([slot=message]){color:var(--calcite-notice-content-text-color, var(--calcite-color-text-inverse))}.notice-content{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;box-sizing:border-box;padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;display:flex;min-inline-size:0px;flex-direction:column;overflow-wrap:break-word;flex:1 1 0;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:0 var(--calcite-notice-spacing-token-large)}.notice-content:first-of-type:not(:only-child){padding-inline-start:var(--calcite-notice-spacing-token-large)}.notice-content:only-of-type{padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large)}.notice-icon{display:flex;align-items:center;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;box-sizing:border-box;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;padding-inline:var(--calcite-notice-spacing-token-small)}.notice-close{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;flex:0 0 auto;margin-inline-end:var(--calcite-spacing-xs);--calcite-action-background-color: var(--calcite-notice-close-background-color);--calcite-action-background-color-hover: var( --calcite-notice-close-background-color-hover, var(--calcite-notice-close-background-color-focus) );--calcite-action-background-color-press: var(--calcite-notice-close-background-color-press);--calcite-action-text-color: var(--calcite-notice-close-icon-color, var(--calcite-color-text-3));--calcite-action-text-color-press: var(--calcite-notice-close-icon-color-hover)}.actions-end{display:flex;align-items:center;flex:0 0 auto;margin-inline-end:var(--calcite-spacing-xs);gap:var(--calcite-spacing-xs)}:host([kind=brand][appearance=outline-fill]) .container{border-color:var(--calcite-notice-border-color, rgb(from var(--calcite-color-brand) r g b/var(--calcite-opacity-half)));background-color:var(--calcite-notice-background-color, color-mix(in srgb, var(--calcite-color-brand) 5%, var(--calcite-color-foreground-1)))}:host([kind=brand][appearance=outline-fill]) .notice-icon,:host([kind=brand][appearance=transparent]) .notice-icon{color:var(--calcite-color-brand)}:host([kind=info][appearance=outline-fill]) .container{border-color:var(--calcite-notice-border-color, rgb(from var(--calcite-color-status-info) r g b/var(--calcite-opacity-half)));background-color:var(--calcite-notice-background-color, color-mix(in srgb, var(--calcite-color-status-info) 5%, var(--calcite-color-foreground-1)))}:host([kind=info][appearance=outline-fill]) .notice-icon,:host([kind=info][appearance=transparent]) .notice-icon{color:var(--calcite-color-status-info)}:host([kind=danger][appearance=outline-fill]) .container{border-color:var(--calcite-notice-border-color, rgb(from var(--calcite-color-status-danger) r g b/var(--calcite-opacity-half)));background-color:var(--calcite-notice-background-color, color-mix(in srgb, var(--calcite-color-status-danger) 5%, var(--calcite-color-foreground-1)))}:host([kind=danger][appearance=outline-fill]) .notice-icon,:host([kind=danger][appearance=transparent]) .notice-icon{color:var(--calcite-color-status-danger)}:host([kind=success][appearance=outline-fill]) .container{border-color:var(--calcite-notice-border-color, rgb(from var(--calcite-color-status-success) r g b/var(--calcite-opacity-half)));background-color:var(--calcite-notice-background-color, color-mix(in srgb, var(--calcite-color-status-success) 5%, var(--calcite-color-foreground-1)))}:host([kind=success][appearance=outline-fill]) .notice-icon,:host([kind=success][appearance=transparent]) .notice-icon{color:var(--calcite-color-status-success)}:host([kind=warning][appearance=outline-fill]) .container{border-color:var(--calcite-notice-border-color, rgb(from var(--calcite-color-status-warning) r g b/var(--calcite-opacity-half)));background-color:var(--calcite-notice-background-color, color-mix(in srgb, var(--calcite-color-status-warning) 5%, var(--calcite-color-foreground-1)))}:host([kind=warning][appearance=outline-fill]) .notice-icon,:host([kind=warning][appearance=transparent]) .notice-icon{color:var(--calcite-color-status-warning)}:host([kind=neutral][appearance=outline-fill]) .container{border-color:var(--calcite-color-border-2);background-color:var(--calcite-notice-background-color, var(--calcite-color-foreground-1))}:host([kind=neutral]) .notice-icon{color:var(--calcite-color-text-3)}:host([appearance=transparent]) .container{background-color:transparent}:host([hidden]){display:none}[hidden]{display:none}`;
class y extends d {
  constructor() {
    super(...arguments), this.closeButtonRef = a(), this.transitionProp = "opacity", this.transitionRef = a(), this.messages = b(), this.focusSetter = k()(this), this.hasActionEnd = !1, this.appearance = "outline-fill", this.closable = !1, this.iconFlipRtl = !1, this.kind = "brand", this.open = !1, this.scale = "m", this.width = "auto", this.calciteNoticeBeforeClose = i({ cancelable: !1 }), this.calciteNoticeBeforeOpen = i({ cancelable: !1 }), this.calciteNoticeClose = i({ cancelable: !1 }), this.calciteNoticeOpen = i({ cancelable: !1 });
  }
  static {
    this.properties = { hasActionEnd: 16, appearance: 3, closable: 7, icon: [3, { converter: h }], iconFlipRtl: 7, kind: 3, messageOverrides: 0, open: 7, scale: 3, width: 3 };
  }
  static {
    this.styles = x;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el.querySelector("calcite-link") || this.closeButtonRef.value, e);
  }
  async load() {
    this.kindIcons = { ...u, brand: v.brand }, this.requestedIcon = s(this.kindIcons, this.icon, this.kind);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && m(this), (e.has("icon") || e.has("kind") && (this.hasUpdated || this.kind !== "brand")) && (this.requestedIcon = s(this.kindIcons, this.icon, this.kind));
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
  close() {
    this.open = !1;
  }
  handleActionsEndSlotChange(e) {
    this.hasActionEnd = p(e);
  }
  render() {
    const e = c`<calcite-action class=${t(o.close)} icon=x @click=${this.close} .scale=${this.scale} .text=${this.messages.close} ${l(this.closeButtonRef)}></calcite-action>`;
    return c`<div class=${t(o.container)} ${l(this.transitionRef)}>${this.requestedIcon ? c`<div class=${t(o.icon)}><calcite-icon .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${f(this.scale)}></calcite-icon></div>` : null}<div class=${t(o.content)}><slot name=${n.title}></slot><slot name=${n.message}></slot><slot name=${n.link}></slot></div><div class=${t(o.actionsEnd)} .hidden=${!this.hasActionEnd}><slot name=${n.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot></div>${this.closable ? e : null}</div>`;
  }
}
g("calcite-notice", y);
export {
  y as Notice
};
