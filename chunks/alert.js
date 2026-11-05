/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as b, L as y, d as l, H as C, s as a, b as o, f as k } from "./index.js";
import { i as w } from "./keyed.js";
import { e as z, n as x } from "./ref.js";
import { s as A, z as T } from "./dom.js";
import { g as $ } from "./component.js";
import { N as F } from "./locale.js";
import { t as E } from "./openCloseComponent.js";
import { K as S, a as O } from "./resources2.js";
import { u as B } from "./useT9n.js";
import { u as D } from "./useFocusable.js";
import { u as q } from "./useTopLayer.js";
import { D as c, S as r, C as i } from "./resources7.js";
const I = 300;
class H {
  constructor() {
    this.registeredElements = [];
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
    const { registeredElements: t } = this, s = t.indexOf(e);
    s !== -1 && t.splice(s, 1), e.active = !1, this.updateAlerts();
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  updateAlerts() {
    window.clearTimeout(this.queueTimeoutId), this.queueTimeoutId = void 0, this.registeredElements.forEach((e, t) => {
      e.openAlertCount = this.registeredElements.length, t === 0 ? this.queueTimeoutId = window.setTimeout(() => e.active = !0, I) : e.active = !1;
    });
  }
}
const L = b`:host([scale=s]){--calcite-internal-alert-action-spacing: var(--calcite-theme-space-xs, var(--calcite-spacing-xs))}:host([scale=m]){--calcite-internal-alert-action-spacing: var(--calcite-theme-space-xs, var(--calcite-spacing-xs))}:host([scale=l]){--calcite-internal-alert-action-spacing: var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host{display:block;inline-size:var(--calcite-alert-width)}.container--embedded,.container[popover]{box-sizing:border-box;position:fixed;display:flex;align-items:center;justify-content:center;min-inline-size:min-content;margin-inline:auto;margin-block:var(--calcite-space-none);padding:var(--calcite-space-none);opacity:0;pointer-events:none;text-align:start;inline-size:100%;inset:initial;box-shadow:var(--calcite-alert-shadow, var(--calcite-shadow-md));background-color:var(--calcite-alert-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));border-radius:var(--calcite-alert-corner-radius, var(--calcite-border-radius));border-block-start:0 solid transparent;border-inline:1px solid var(--calcite-color-border-3);border-block-end:1px solid var(--calcite-color-border-3);max-inline-size:calc(100% - var(--calcite-alert-offset-size, 2rem) * 2);transition:opacity var(--calcite-internal-animation-timing-slow) ease-in-out,all var(--calcite-animation-timing) ease-in-out;overflow:visible}.container--bottom,.container--top,.container--bottom[popover],.container--top[popover]{inset-inline-end:0;inset-inline-start:0}.container[class*=bottom]{transform:translate3d(0,var(--calcite-alert-offset-size, 2rem),0);inset-block-end:var(--calcite-alert-offset-size, 2rem)}.container[class*=top]{transform:translate3d(0,calc(-1 * var(--calcite-alert-offset-size, 2rem)),0);inset-block-start:var(--calcite-alert-offset-size, 2rem)}.container[class*=start]{inset-inline-start:var(--calcite-alert-offset-size, 2rem);inset-inline-end:auto}.container[class*=end]{inset-inline-end:var(--calcite-alert-offset-size, 2rem);inset-inline-start:auto}.icon{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--calcite-space-none);margin-block:auto;margin-inline-end:auto}.close{margin-inline-end:var(--calcite-internal-alert-action-spacing)}.queue-count{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;cursor:default;display:flex;font-weight:var(--calcite-font-weight-medium);visibility:hidden;align-items:center;justify-content:space-around;min-inline-size:min-content;opacity:0;overflow:hidden;align-self:stretch;text-align:center;color:var(--calcite-color-text-2);border-inline:0 solid transparent;border-start-end-radius:0}.queue-count--active{visibility:visible;opacity:var(--calcite-opacity-full)}.dismiss-progress{position:absolute;display:block;inline-size:100%;overflow:hidden;inset-inline:0;inset-block-start:-2px;block-size:2px;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.dismiss-progress:after{position:absolute;inset-block-start:var(--calcite-space-none);display:block;block-size:2px;content:"";background-color:var(--calcite-color-transparent-tint);inset-inline-end:0}.actions-end{display:flex;gap:var(--calcite-internal-alert-action-spacing);padding-block:var(--calcite-internal-alert-action-spacing);padding-inline:0 var(--calcite-internal-alert-action-spacing)}.text-container{box-sizing:border-box;display:flex;flex:1 1 auto;min-inline-size:var(--calcite-space-none);flex-direction:column;overflow-wrap:break-word}.footer{display:flex;justify-content:flex-end;padding-block-start:var(--calcite-space-px);position:relative;align-self:stretch;inline-size:auto;block-size:inherit}:host([scale=s]) slot[name=title]::slotted(*),:host([scale=s]) *::slotted([slot=title]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=s]) slot[name=message]::slotted(*),:host([scale=s]) *::slotted([slot=message]){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=s]) slot[name=link]::slotted(*),:host([scale=s]) *::slotted([slot=link]){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=s]) .queue-count{margin-inline:var(--calcite-space-sm)}:host([scale=s]) .container{--calcite-internal-alert-min-height: 3.5rem;inline-size:var(--calcite-alert-width, 40em)}:host([scale=s]) .icon{padding-inline-start:.75rem}:host([scale=s]) .text-container{padding-block:.5rem;padding-inline:.75rem .5rem}:host([scale=m]) slot[name=title]::slotted(*),:host([scale=m]) *::slotted([slot=title]){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=m]) slot[name=message]::slotted(*),:host([scale=m]) *::slotted([slot=message]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=m]) slot[name=link]::slotted(*),:host([scale=m]) *::slotted([slot=link]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=m]) .queue-count{margin-inline:var(--calcite-space-md)}:host([scale=m]) .container{--calcite-internal-alert-min-height: 4.1875rem;inline-size:var(--calcite-alert-width, 50em)}:host([scale=m]) .icon{padding-inline-start:1rem}:host([scale=m]) .text-container{padding-block:.75rem;padding-inline:1rem .75rem}:host([scale=l]) slot[name=title]::slotted(*),:host([scale=l]) *::slotted([slot=title]){font-size:var(--calcite-font-size-relative-lg);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]) slot[name=message]::slotted(*),:host([scale=l]) *::slotted([slot=message]){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]) slot[name=link]::slotted(*),:host([scale=l]) *::slotted([slot=link]){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]) .queue-count{margin-inline:var(--calcite-space-lg)}:host([scale=l]) .container{--calcite-internal-alert-min-height: 5.625rem;inline-size:var(--calcite-alert-width, 60em)}:host([scale=l]) .icon{padding-inline-start:1.25rem}:host([scale=l]) .text-container{padding-block:1rem;padding-inline:1.25rem 1rem}:host([open]) .container--active{border-block-start-width:var(--calcite-border-width-md);opacity:var(--calcite-opacity-full);pointer-events:initial}:host([open]) .container--active[class*=bottom]{transform:translate3d(0,calc(-1 * var(--calcite-alert-offset-size, 2rem)),inherit)}:host([open]) .container--active[class*=top]{transform:translate3d(0,var(--calcite-alert-offset-size, 2rem),inherit)}:host([auto-close])>.queue-count{border-inline-end:0 solid transparent}slot[name=title]::slotted(*),*::slotted([slot=title]){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}slot[name=message]::slotted(*),*::slotted([slot=message]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug);margin:var(--calcite-space-none);display:inline;font-weight:var(--calcite-theme-font-weight-regular, var(--calcite-font-weight-normal));margin-inline-end:.5rem;color:var(--calcite-color-text-2)}slot[name=link]::slotted(*),*::slotted([slot=link]){color:var(--calcite-color-text-link)}slot[name=link]::slotted(:not(calcite-link)){display:inline-flex}:host([kind=brand]) .container{border-block-start-color:var(--calcite-color-brand)}:host([kind=brand]) .container .icon{color:var(--calcite-color-brand)}:host([kind=info]) .container{border-block-start-color:var(--calcite-color-status-info)}:host([kind=info]) .container .icon{color:var(--calcite-color-status-info)}:host([kind=danger]) .container{border-block-start-color:var(--calcite-color-status-danger)}:host([kind=danger]) .container .icon{color:var(--calcite-color-status-danger)}:host([kind=success]) .container{border-block-start-color:var(--calcite-color-status-success)}:host([kind=success]) .container .icon{color:var(--calcite-color-status-success)}:host([kind=warning]) .container{border-block-start-color:var(--calcite-color-status-warning)}:host([kind=warning]) .container .icon{color:var(--calcite-color-status-warning)}:host([auto-close-duration=fast]) .dismiss-progress:after{animation:dismissProgress calc(6s * var(--calcite-internal-duration-factor)) ease-out}:host(:hover[auto-close-duration=fast]) .dismiss-progress:after,:host(:focus[auto-close-duration=fast]) .dismiss-progress:after{animation-play-state:paused}:host([auto-close-duration=medium]) .dismiss-progress:after{animation:dismissProgress calc(10s * var(--calcite-internal-duration-factor)) ease-out}:host(:hover[auto-close-duration=medium]) .dismiss-progress:after,:host(:focus[auto-close-duration=medium]) .dismiss-progress:after{animation-play-state:paused}:host([auto-close-duration=slow]) .dismiss-progress:after{animation:dismissProgress calc(14s * var(--calcite-internal-duration-factor)) ease-out}:host(:hover[auto-close-duration=slow]) .dismiss-progress:after,:host(:focus[auto-close-duration=slow]) .dismiss-progress:after{animation-play-state:paused}.container.focused .dismiss-progress:after{animation-play-state:paused}@keyframes dismissProgress{0%{inline-size:var(--calcite-space-none);opacity:.75}to{inline-size:100%;opacity:var(--calcite-opacity-full)}}:host([top-layer-disabled]) .container,.container--embedded{z-index:var(--calcite-z-index-toast)}.container--embedded{position:absolute}:host([hidden]){display:none}[hidden]{display:none}:host([calcite-hydrated-hidden]){visibility:hidden!important;pointer-events:none}`, n = new H();
class M extends y {
  constructor() {
    super(...arguments), this.initialOpenTime = -1, this.isHovered = !1, this.lastMouseOverBegin = -1, this.transitionProp = "opacity", this.totalHoverTime = 0, this.totalOpenTime = 0, this.transitionRef = z(), this.messages = B(), this.focusSetter = D()(this), this.topLayer = q({
      disabledOverride: () => this.embedded,
      target: this.transitionRef
    })(this), this.hasEndActions = !1, this.isFocused = !1, this.numberStringFormatter = new F(), this.active = !1, this.autoClose = !1, this.autoCloseDuration = "medium", this.embedded = !1, this.iconFlipRtl = !1, this.kind = "brand", this.open = !1, this.openAlertCount = 0, this.placement = "bottom", this.queue = "last", this.scale = "m", this.topLayerDisabled = !1, this.calciteAlertBeforeClose = l({ cancelable: !1 }), this.calciteAlertBeforeOpen = l({ cancelable: !1 }), this.calciteAlertClose = l({ cancelable: !1 }), this.calciteAlertOpen = l({ cancelable: !1 });
  }
  static {
    this.properties = { hasEndActions: 16, isFocused: 16, numberStringFormatter: 16, active: 5, autoClose: 7, autoCloseDuration: 3, embedded: 7, icon: [3, { converter: C }], iconFlipRtl: 7, kind: 3, label: 1, messageOverrides: 0, numberingSystem: 3, open: 7, openAlertCount: 9, placement: 3, queue: 3, scale: 3, topLayerDisabled: 7 };
  }
  static {
    this.styles = L;
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
    window.clearTimeout(this.autoCloseTimeoutId), this.autoCloseTimeoutId = void 0;
  }
  closeAlert() {
    this.open = !1, this.clearAutoCloseTimeout();
  }
  onBeforeOpen() {
    this.calciteAlertBeforeOpen.emit(), this.topLayer.show();
  }
  onOpen() {
    this.calciteAlertOpen.emit();
  }
  onBeforeClose() {
    this.calciteAlertBeforeClose.emit();
  }
  onClose() {
    this.calciteAlertClose.emit(), this.topLayer.hide();
  }
  actionsEndSlotChangeHandler(e) {
    this.hasEndActions = A(e);
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
    const { open: e, autoClose: t, label: s, placement: p, active: d, openAlertCount: v } = this, g = t ? "alert" : "alertdialog", h = !e, u = T(this.kind === "brand" ? S : O, this.icon, this.kind), f = v > 1;
    return this.el.inert = h, this.el.ariaLabel = s, this.el.toggleAttribute("calcite-hydrated-hidden", h), this.el.role = g, o`<div class=${a({
      [i.container]: !0,
      [i.containerActive]: d,
      [`${i.container}--${p}`]: !0,
      [i.containerEmbedded]: this.embedded,
      [i.focused]: this.isFocused
    })} @pointerenter=${this.autoClose && this.autoCloseTimeoutId ? this.handleMouseOver : void 0} @pointerleave=${this.autoClose ? this.handleMouseLeave : void 0} .popover=${this.embedded ? void 0 : "manual"} ${x(this.transitionRef)}>${u && this.renderIcon(u) || ""}<div class=${a(i.textContainer)} @focusin=${this.autoClose && this.autoCloseTimeoutId ? this.handleKeyBoardFocus : void 0} @focusout=${this.autoClose ? this.handleKeyBoardBlur : void 0}><slot name=${r.title}></slot><slot name=${r.message}></slot><slot name=${r.link}></slot></div>${this.renderActionsEnd()}${f ? this.renderQueueCount() : void 0}${this.renderCloseButton()}${e && d && t ? o`<div class=${a(i.dismissProgress)}></div>` : void 0}</div>`;
  }
  renderCloseButton() {
    return o`<calcite-action class=${a(i.close)} icon=x .label=${this.messages.close} @click=${this.closeAlert} @focusin=${this.autoClose ? this.handleKeyBoardFocus : void 0} @focusout=${this.autoClose ? this.handleKeyBoardBlur : void 0} .scale=${this.scale} .text=${this.messages.close}></calcite-action>`;
  }
  renderQueueCount() {
    const { openAlertCount: e } = this, t = e > 2 ? e - 1 : 1, s = this.numberStringFormatter.numberFormatter.format(t);
    return w("queue-count", o`<div class=${a({
      [i.queueCount]: !0,
      [i.queueCountActive]: e > 1
    })}><calcite-chip .label=${s} .scale=${this.scale} .value=${s}>${s}</calcite-chip></div>`);
  }
  renderActionsEnd() {
    return o`<div class=${a(i.actionsEnd)}><slot name=${r.actionsEnd} @slotchange=${this.actionsEndSlotChangeHandler}></slot></div>`;
  }
  renderIcon(e) {
    return o`<div class=${a(i.icon)}><calcite-icon .flipRtl=${this.iconFlipRtl} .icon=${e} .scale=${$(this.scale)}></calcite-icon></div>`;
  }
}
k("calcite-alert", M);
export {
  M as Alert
};
