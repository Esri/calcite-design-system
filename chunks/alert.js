import { b as k, L as x, c as l, u as w, s as o, x as a, q as y } from "./index.js";
import { n as z } from "./ref.js";
import { i as m } from "./keyed.js";
import { s as T, m as A } from "./dom.js";
import { g as f } from "./component.js";
import { N as $ } from "./locale.js";
import { t as E } from "./openCloseComponent.js";
import { K as S } from "./resources4.js";
import { u as F } from "./useT9n.js";
import { u as O } from "./useSetFocus.js";
import { D as c, S as r, C as s } from "./resources5.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const B = 300;
class q {
  constructor() {
    this.registeredElements = [], this.queueTimeoutId = null;
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  registerElement(e) {
    const { registeredElements: t } = this;
    if (!t.includes(e)) {
      switch (e.queue) {
        case "immediate":
          t.unshift(e);
          break;
        case "next":
          t.splice(1, 0, e);
          break;
        case "last":
          t.push(e);
          break;
      }
      this.updateAlerts();
    }
  }
  unregisterElement(e) {
    const { registeredElements: t } = this, i = t.indexOf(e);
    i !== -1 && t.splice(i, 1), e.active = !1, this.updateAlerts();
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  updateAlerts() {
    window.clearTimeout(this.queueTimeoutId), this.queueTimeoutId = null, this.registeredElements.forEach((e, t) => {
      e.openAlertCount = this.registeredElements.length, t === 0 ? this.queueTimeoutId = window.setTimeout(() => e.active = !0, B) : e.active = !1;
    });
  }
}
const I = k`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:block;inline-size:var(--calcite-alert-width)}.container{pointer-events:none;position:fixed;z-index:var(--calcite-z-index-toast);margin-inline:auto;margin-block:0px;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:min-content;align-items:center;justify-content:center;text-align:start;opacity:0;--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--calcite-alert-shadow, var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow));background-color:var(--calcite-alert-background-color, var(--calcite-color-foreground-1));border-radius:var(--calcite-alert-corner-radius, var(--calcite-border-radius));border-block-start:0 solid transparent;border-inline:1px solid var(--calcite-color-border-3);border-block-end:1px solid var(--calcite-color-border-3);max-inline-size:calc(100% - var(--calcite-alert-offset-size, 2rem) * 2);transition:opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),all var(--calcite-animation-timing) ease-in-out}.container--bottom,.container--top{inset-inline-end:0;inset-inline-start:0}.container[class*=bottom]{transform:translate3d(0,var(--calcite-alert-offset-size, 2rem),0);inset-block-end:var(--calcite-alert-offset-size, 2rem)}.container[class*=top]{transform:translate3d(0,calc(-1 * var(--calcite-alert-offset-size, 2rem)),0);inset-block-start:var(--calcite-alert-offset-size, 2rem)}.container[class*=start]{inset-inline-start:var(--calcite-alert-offset-size, 2rem);inset-inline-end:auto}.container[class*=end]{inset-inline-end:var(--calcite-alert-offset-size, 2rem);inset-inline-start:auto}.icon{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;margin-block:auto;margin-inline-end:auto}.close{display:flex;cursor:pointer;align-items:center;justify-content:flex-end;align-self:stretch;border-style:none;background-color:transparent;color:var(--calcite-color-text-3);outline:2px solid transparent;outline-offset:2px;-webkit-appearance:none;border-start-end-radius:var(--calcite-alert-corner-radius, var(--calcite-border-radius));border-end-end-radius:var(--calcite-alert-corner-radius, var(--calcite-border-radius));outline-color:transparent}.close:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.close:hover,.close:focus{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-2)}.close:active{background-color:var(--calcite-color-foreground-3)}.queue-count{visibility:hidden;display:flex;min-inline-size:min-content;cursor:default;align-items:center;justify-content:space-around;align-self:stretch;overflow:hidden;text-align:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2);opacity:0;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-inline:0 solid transparent;border-start-end-radius:0}.queue-count--active{visibility:visible;opacity:1}.dismiss-progress{position:absolute;display:block;inline-size:100%;overflow:hidden;inset-inline:0;inset-block-start:-2px;block-size:2px;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.dismiss-progress:after{position:absolute;inset-block-start:0px;display:block;block-size:2px;content:"";background-color:var(--calcite-color-transparent-tint);inset-inline-end:0}.actions-end{display:flex;align-self:stretch}.text-container{box-sizing:border-box;display:flex;min-inline-size:0px;flex:1 1 auto;flex-direction:column;overflow-wrap:break-word}.footer{position:relative;display:flex;inline-size:auto;justify-content:flex-end;align-self:stretch;padding-block-start:1px;block-size:inherit}:host([scale=s]) slot[name=title]::slotted(*),:host([scale=s]) *::slotted([slot=title]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=s]) slot[name=message]::slotted(*),:host([scale=s]) *::slotted([slot=message]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) slot[name=link]::slotted(*),:host([scale=s]) *::slotted([slot=link]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) .queue-count{margin-inline:.5rem}:host([scale=s]) .container{--calcite-internal-alert-min-height: 3.5rem;inline-size:var(--calcite-alert-width, 40em)}:host([scale=s]) .close{padding:.75rem}:host([scale=s]) .icon{padding-inline-start:.75rem}:host([scale=s]) .text-container{padding-block:.5rem;padding-inline:.75rem .5rem}:host([scale=m]) slot[name=title]::slotted(*),:host([scale=m]) *::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=m]) slot[name=message]::slotted(*),:host([scale=m]) *::slotted([slot=message]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) slot[name=link]::slotted(*),:host([scale=m]) *::slotted([slot=link]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .queue-count{margin-inline:.75rem}:host([scale=m]) .container{--calcite-internal-alert-min-height: 4.1875rem;inline-size:var(--calcite-alert-width, 50em)}:host([scale=m]) .close{padding:1rem}:host([scale=m]) .icon{padding-inline-start:1rem}:host([scale=m]) .text-container{padding-block:.75rem;padding-inline:1rem .75rem}:host([scale=l]) slot[name=title]::slotted(*),:host([scale=l]) *::slotted([slot=title]){margin-block-end:.25rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host([scale=l]) slot[name=message]::slotted(*),:host([scale=l]) *::slotted([slot=message]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) slot[name=link]::slotted(*),:host([scale=l]) *::slotted([slot=link]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .queue-count{margin-inline:1rem}:host([scale=l]) .container{--calcite-internal-alert-min-height: 5.625rem;inline-size:var(--calcite-alert-width, 60em)}:host([scale=l]) .close{padding:1.25rem}:host([scale=l]) .icon{padding-inline-start:1.25rem}:host([scale=l]) .text-container{padding-block:1rem;padding-inline:1.25rem 1rem}:host([open]) .container--active{border-block-start-width:2px;opacity:1;pointer-events:initial}:host([open]) .container--active[class*=bottom]{transform:translate3d(0,calc(-1 * var(--calcite-alert-offset-size, 2rem)),inherit)}:host([open]) .container--active[class*=top]{transform:translate3d(0,var(--calcite-alert-offset-size, 2rem),inherit)}:host([auto-close])>.queue-count{border-inline-end:0 solid transparent}slot[name=title]::slotted(*),*::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}slot[name=message]::slotted(*),*::slotted([slot=message]){margin:0;display:inline;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-normal);margin-inline-end:.5rem;color:var(--calcite-color-text-2)}slot[name=link]::slotted(*),*::slotted([slot=link]){display:inline-flex;color:var(--calcite-color-text-link)}:host([kind=brand]) .container{border-block-start-color:var(--calcite-color-brand)}:host([kind=brand]) .container .icon{color:var(--calcite-color-brand)}:host([kind=info]) .container{border-block-start-color:var(--calcite-color-status-info)}:host([kind=info]) .container .icon{color:var(--calcite-color-status-info)}:host([kind=danger]) .container{border-block-start-color:var(--calcite-color-status-danger)}:host([kind=danger]) .container .icon{color:var(--calcite-color-status-danger)}:host([kind=success]) .container{border-block-start-color:var(--calcite-color-status-success)}:host([kind=success]) .container .icon{color:var(--calcite-color-status-success)}:host([kind=warning]) .container{border-block-start-color:var(--calcite-color-status-warning)}:host([kind=warning]) .container .icon{color:var(--calcite-color-status-warning)}:host([auto-close-duration=fast]) .dismiss-progress:after{animation:dismissProgress 6s ease-out}:host(:hover[auto-close-duration=fast]) .dismiss-progress:after,:host(:focus[auto-close-duration=fast]) .dismiss-progress:after{animation-play-state:paused}:host([auto-close-duration=medium]) .dismiss-progress:after{animation:dismissProgress 10s ease-out}:host(:hover[auto-close-duration=medium]) .dismiss-progress:after,:host(:focus[auto-close-duration=medium]) .dismiss-progress:after{animation-play-state:paused}:host([auto-close-duration=slow]) .dismiss-progress:after{animation:dismissProgress 14s ease-out}:host(:hover[auto-close-duration=slow]) .dismiss-progress:after,:host(:focus[auto-close-duration=slow]) .dismiss-progress:after{animation-play-state:paused}.container.focused .dismiss-progress:after{animation-play-state:paused}@keyframes dismissProgress{0%{inline-size:0px;opacity:.75}to{inline-size:100%;opacity:1}}.container--embedded{position:absolute}:host([hidden]){display:none}[hidden]{display:none}:host([calcite-hydrated-hidden]){visibility:hidden!important;pointer-events:none}`, n = new q();
class D extends x {
  constructor() {
    super(...arguments), this.autoCloseTimeoutId = null, this.transitionProp = "opacity", this.totalHoverTime = 0, this.totalOpenTime = 0, this.messages = F(), this.focusSetter = O()(this), this.hasEndActions = !1, this.isFocused = !1, this.numberStringFormatter = new $(), this.active = !1, this.autoClose = !1, this.autoCloseDuration = "medium", this.embedded = !1, this.iconFlipRtl = !1, this.kind = "brand", this.open = !1, this.openAlertCount = 0, this.placement = "bottom", this.queue = "last", this.scale = "m", this.calciteAlertBeforeClose = l({ cancelable: !1 }), this.calciteAlertBeforeOpen = l({ cancelable: !1 }), this.calciteAlertClose = l({ cancelable: !1 }), this.calciteAlertOpen = l({ cancelable: !1 });
  }
  static {
    this.properties = { hasEndActions: 16, isFocused: 16, numberStringFormatter: 16, active: 5, autoClose: 7, autoCloseDuration: 3, embedded: 5, icon: [3, { converter: w, type: String }], iconFlipRtl: 7, kind: 3, label: 1, messageOverrides: 0, numberingSystem: 3, open: 7, openAlertCount: 9, placement: 3, queue: 3, scale: 3 };
  }
  static {
    this.styles = I;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.open && n.registerElement(this.el), this.numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      signDisplay: "always"
    };
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("active") && (this.hasUpdated || this.active !== !1) && this.handleActiveChange(), e.has("autoCloseDuration") && (this.hasUpdated || this.autoCloseDuration !== "medium") && this.updateDuration(), e.has("queue") && (this.hasUpdated || this.queue !== "last") && this.handleQueueChange(), e.has("numberingSystem") && this.numberingSystemChange(), e.has("messages") && this.effectiveLocaleChange();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), n.unregisterElement(this.el), this.clearAutoCloseTimeout(), this.embedded = !1;
  }
  handleActiveChange() {
    E(this), this.clearAutoCloseTimeout(), this.active && this.autoClose && !this.autoCloseTimeoutId && (this.initialOpenTime = Date.now(), this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), c[this.autoCloseDuration]));
  }
  openHandler() {
    this.open ? n.registerElement(this.el) : n.unregisterElement(this.el);
  }
  updateDuration() {
    this.autoClose && this.autoCloseTimeoutId && (this.clearAutoCloseTimeout(), this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), c[this.autoCloseDuration]));
  }
  handleQueueChange() {
    this.open && (n.unregisterElement(this.el), n.registerElement(this.el));
  }
  handleKeyBoardFocus() {
    this.isFocused = !0, this.handleFocus();
  }
  handleKeyBoardBlur() {
    this.isFocused = !1, this.isHovered || this.handleBlur();
  }
  effectiveLocaleChange() {
    this.numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      signDisplay: "always"
    };
  }
  numberingSystemChange() {
    this.numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      signDisplay: "always"
    };
  }
  clearAutoCloseTimeout() {
    window.clearTimeout(this.autoCloseTimeoutId), this.autoCloseTimeoutId = null;
  }
  setTransitionEl(e) {
    e && (this.transitionEl = e);
  }
  closeAlert() {
    this.open = !1, this.clearAutoCloseTimeout();
  }
  onBeforeOpen() {
    this.calciteAlertBeforeOpen.emit();
  }
  onOpen() {
    this.calciteAlertOpen.emit();
  }
  onBeforeClose() {
    this.calciteAlertBeforeClose.emit();
  }
  onClose() {
    this.calciteAlertClose.emit();
  }
  actionsEndSlotChangeHandler(e) {
    this.hasEndActions = T(e);
  }
  handleMouseOver() {
    this.isHovered = !0, this.handleFocus();
  }
  handleMouseLeave() {
    this.isHovered = !1, this.isFocused || this.handleBlur();
  }
  handleFocus() {
    this.clearAutoCloseTimeout(), this.totalOpenTime = Date.now() - this.initialOpenTime, this.lastMouseOverBegin = Date.now();
  }
  handleBlur() {
    const e = Date.now() - this.lastMouseOverBegin, t = c[this.autoCloseDuration] - this.totalOpenTime + this.totalHoverTime;
    this.totalHoverTime = this.totalHoverTime ? e + this.totalHoverTime : e, this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), t);
  }
  render() {
    const { open: e, autoClose: t, label: i, placement: g, active: d, openAlertCount: v } = this, b = t ? "alert" : "alertdialog", u = !e, h = A(S, this.icon, this.kind), C = v > 1;
    return this.el.inert = u, this.el.ariaLabel = i, this.el.toggleAttribute("calcite-hydrated-hidden", u), this.el.role = b, a`<div class=${o({
      [s.container]: !0,
      [s.containerActive]: d,
      [`${s.container}--${g}`]: !0,
      [s.containerEmbedded]: this.embedded,
      [s.focused]: this.isFocused
    })} @pointerenter=${this.autoClose && this.autoCloseTimeoutId ? this.handleMouseOver : null} @pointerleave=${this.autoClose ? this.handleMouseLeave : null} ${z(this.setTransitionEl)}>${h && this.renderIcon(h) || ""}<div class=${o(s.textContainer)} @focusin=${this.autoClose && this.autoCloseTimeoutId ? this.handleKeyBoardFocus : null} @focusout=${this.autoClose ? this.handleKeyBoardBlur : null}><slot name=${r.title}></slot><slot name=${r.message}></slot><slot name=${r.link}></slot></div>${this.renderActionsEnd()}${C ? this.renderQueueCount() : null}${this.renderCloseButton()}${e && d && t ? a`<div class=${o(s.dismissProgress)}></div>` : null}</div>`;
  }
  renderCloseButton() {
    return m("close", a`<button .ariaLabel=${this.messages.close} class=${o(s.close)} @click=${this.closeAlert} @focusin=${this.autoClose ? this.handleKeyBoardFocus : null} @focusout=${this.autoClose ? this.handleKeyBoardBlur : null} type=button><calcite-icon icon=x .scale=${f(this.scale)}></calcite-icon></button>`);
  }
  renderQueueCount() {
    const { openAlertCount: e } = this, t = e > 2 ? e - 1 : 1, i = this.numberStringFormatter.numberFormatter.format(t);
    return m("queue-count", a`<div class=${o({
      [s.queueCount]: !0,
      [s.queueCountActive]: e > 1
    })}><calcite-chip .label=${i} .scale=${this.scale} .value=${i}>${i}</calcite-chip></div>`);
  }
  renderActionsEnd() {
    return a`<div class=${o(s.actionsEnd)}><slot name=${r.actionsEnd} @slotchange=${this.actionsEndSlotChangeHandler}></slot></div>`;
  }
  renderIcon(e) {
    return a`<div class=${o(s.icon)}><calcite-icon .flipRtl=${this.iconFlipRtl} .icon=${e} .scale=${f(this.scale)}></calcite-icon></div>`;
  }
}
y("calcite-alert", D);
export {
  D as Alert
};
