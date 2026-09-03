/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as p, L as v, c as i, s as a, b as n, O as l, d as m } from "./index.js";
import { i as f } from "./keyed.js";
import { e as g, n as r } from "./ref.js";
import { u as k } from "./index2.js";
import { n as x } from "./dom.js";
import { t as y } from "./aria.js";
import { g as T } from "./guid.js";
import { c as d, u as I } from "./observers.js";
import { g as b } from "./component.js";
import { u as C } from "./useT9n.js";
import { i as z } from "./resources28.js";
import { u as w } from "./useInteractive.js";
import { i as E } from "./resources2.js";
const e = {
  close: "close",
  container: "container",
  containerBottom: "container--bottom",
  content: "content",
  contentHasText: "content--has-text",
  iconEnd: "icon-end",
  iconPresent: "icon-present",
  iconStart: "icon-start",
  titleIcon: "calcite-tab-title--icon",
  scale: (c) => `scale-${c}`,
  selectedIndicator: "selected-indicator"
}, $ = "calcite-tab-title", F = {
  host: (c) => `${$}-${c}`
}, R = E("calcite-tab-title"), A = p`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;outline:2px solid transparent;outline-offset:2px;margin-inline-start:0px}:host([layout=inline]){flex:0 1 auto}:host([layout=center]){flex:1 1 auto}.content{position:relative;margin-block-end:.125rem;box-sizing:border-box;display:flex;block-size:100%;align-items:center;justify-content:center}.scale-s{--calcite-internal-tab-title-close-padding: var(--calcite-spacing-none);--calcite-internal-tab-title-close-margin-start: var(--calcite-spacing-xxs)}.scale-s .content{padding-block:.25rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}.scale-m{--calcite-internal-tab-title-close-padding: var(--calcite-spacing-xxs);--calcite-internal-tab-title-close-margin-start: var(--calcite-spacing-xxs)}.scale-m .content{padding-block:.5rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}.scale-l{--calcite-internal-tab-title-close-padding: var(--calcite-spacing-xxs);--calcite-internal-tab-title-close-margin-start: var(--calcite-spacing-xs)}.scale-l .content{padding-block:var(--calcite-space-sm-plus);font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([closable]) .content{border-block-end-color:transparent}:host([layout=inline]) .content,:host([layout=center]) .content{padding-inline:.25rem}:host([layout=center]) .scale-s,:host([layout=center]) .scale-m,:host([layout=center]) .scale-l{margin-block:0px;justify-content:center;text-align:center}:host([layout=center]) .scale-s .content,:host([layout=center]) .scale-m .content,:host([layout=center]) .scale-l .content{flex:1 1 auto;flex-grow:1}.container{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;align-content:center;justify-content:space-between;padding-inline:0px;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);outline-color:transparent;color:var(--calcite-tab-text-color, var(--calcite-color-text-3));background-color:var(--calcite-tab-background-color, transparent)}.selected-indicator{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:absolute;display:block;block-size:.125rem;inset-block-end:0;inset-inline-start:0;inset-inline-end:0;inline-size:100%}:host([bordered][selected]) .container:after{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:absolute;display:block;block-size:.125rem;inset-block-end:-1px;inset-inline-start:0;inset-inline-end:0;inline-size:100%;content:""}:host([bordered][selected]) .container.container--bottom:after{inset-block-start:-1px}:host([bordered][selected]:focus) .container:after{background:transparent}.container--bottom .selected-indicator{inset-block-end:unset;inset-block-start:0}:host([bordered]:not([selected]):hover:not(:focus)) .selected-indicator{background-color:var(--calcite-color-foreground-2)}:host([bordered]:not([selected]):hover:not(:focus)) .container:not(.container--bottom) .selected-indicator{box-shadow:inset 0 1px var(--calcite-color-border-1)}:host([bordered]:not([selected]):hover:not(:focus)) .container.container--bottom .selected-indicator{box-shadow:inset 0 -1px var(--calcite-color-border-1)}:host([selected]:focus) .selected-indicator{block-size:4px}.calcite-tab-title--icon{position:relative;margin:0;display:inline-flex;align-self:center}.calcite-tab-title--icon svg{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.container{color:var(--calcite-tab-text-color, var(--calcite-color-text-3))}.container .icon-start{color:var(--calcite-tab-icon-color-start, var(--calcite-icon-color, var(--calcite-ui-icon-color)))}.container .icon-end{color:var(--calcite-tab-icon-color-end, var(--calcite-icon-color, var(--calcite-ui-icon-color)))}.container:hover,.container:active,:host([selected]) .container{color:var(--calcite-tab-text-color-press, var(--calcite-color-text-1))}.container:hover .icon-start,.container:active .icon-start,:host([selected]) .container .icon-start{color:var(--calcite-tab-icon-color-start-press, var(--calcite-icon-color, var(--calcite-ui-icon-color)))}.container:hover .icon-end,.container:active .icon-end,:host([selected]) .container .icon-end{color:var(--calcite-tab-icon-color-end-press, var(--calcite-icon-color, var(--calcite-ui-icon-color)))}.content--has-text{padding:.25rem}.content--has-text .calcite-tab-title--icon.icon-start{margin-inline-end:var(--calcite-spacing-sm)}.content--has-text .calcite-tab-title--icon.icon-end{margin-inline-start:var(--calcite-spacing-sm)}:host([bordered]) .container{border-color:transparent;border-inline-width:var(--calcite-spacing-px);border-inline-style:solid}:host([bordered]) .container.container--bottom{border-block-start-style:solid;border-block-start-width:1px}:host([bordered]) .container.container--bottom .selected-indicator{inset-block-start:unset;inset-block-end:0}:host([bordered]) .container:not(.container--bottom){border-block-end-style:solid;border-block-end-width:1px}:host([bordered]) .container .selected-indicator{inset-block-start:0;inset-block-end:unset;inset-inline-start:-1px;inset-inline-end:0;inline-size:calc(100% + var(--calcite-spacing-base))}:host([bordered]) .container:host(:not([selected])) .container{box-shadow:0 2px 0 0 transparent}:host([bordered]) .container:host(:not([selected])):host(:hover) .container:not(.container--bottom){border-block-end-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]) .container:host(:not([selected])):host(:hover):host(:not(:focus)) .selected-indicator{box-shadow:inset 0 var(--calcite-internal-tab-shadow-length) var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]) .container:host(:not([selected])):host(:hover):host(:not(:focus)) :not(.container--bottom){--calcite-internal-tab-shadow-length: 1px}:host([bordered]) .container:host(:not([selected])):host(:hover):host(:not(:focus)) .container--bottom{--calcite-internal-tab-shadow-length: -1px}:host([bordered]) .container:hover{background-color:var(--calcite-tab-background-color-hover, var(--calcite-color-foreground-2));border-block-end-color:var(--calcite-color-border-1)}:host(:hover) .selected-indicator{background-color:var(--calcite-color-border-3)}:host([selected]) .selected-indicator,:host([selected]:hover) .selected-indicator,:host(:focus) .selected-indicator,:host(:active) .selected-indicator{background-color:var(--calcite-tab-accent-color-press, var(--calcite-color-brand))}:host([closed]){display:none}:host([selected][bordered]) .container{border-inline-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([selected][bordered]) .container:after{background-color:var(--calcite-tab-background-color, var(--calcite-color-foreground-1))}:host([selected][bordered]) .container:hover,:host([selected][bordered]) .container:active{background:transparent}:host(:focus) .container{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:focus) .container:focus-within{outline-color:transparent}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{margin-inline-end:var(--calcite-spacing-sm)}:host([layout=inline][bordered]) .scale-m .content,:host([layout=center][bordered]) .scale-m .content{padding-inline:.75rem}:host([layout=inline][bordered]) .scale-s .content,:host([layout=center][bordered]) .scale-s .content{padding-inline:.5rem}:host([layout=inline][bordered]) .scale-l .content,:host([layout=center][bordered]) .scale-l .content{padding-inline:1rem}:host([layout=inline][closable]) .scale-s .content,:host([layout=inline][closable]) .scale-m .content,:host([layout=inline][closable]) .scale-l .content{padding-inline-end:0}.close{--calcite-internal-action-spacing: var(--calcite-internal-tab-title-close-padding);--calcite-internal-action-min-height: unset;--calcite-action-text-color: var(--calcite-tab-close-icon-color);--calcite-action-text-color-press: var(--calcite-tab-close-icon-color-press);--calcite-action-background-color: var(--calcite-tab-close-icon-background-color);--calcite-action-background-color-press: var(--calcite-tab-close-icon-background-color-press);--calcite-action-background-color-hover: var(--calcite-tab-close-icon-background-color-hover);margin:auto;margin-inline:var(--calcite-spacing-sm) var(--calcite-internal-tab-title-close-margin-start)}@media(forced-colors:active){:host{outline-width:0;outline-offset:0}:host(:focus) .container{outline-color:highlight}:host([bordered][selected]) .container{border-block-end-style:none}:host([bordered][selected]) .container--bottom{border-block-start-style:none}.selected-indicator{background-color:highlight}}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) .container{pointer-events:none;opacity:.5}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class O extends v {
  constructor() {
    super(), this.closeButtonRef = g(), this.direction = k(), this.guid = F.host(T()), this.mutationObserver = d("mutation", () => this.updateHasText()), this.parentTabsEl = null, this.resizeObserver = d("resize", () => {
      this.calciteInternalTabIconChanged.emit();
    }), this.messages = C(), this.interactiveContainer = w(this), this.controls = null, this.hasText = !1, this.bordered = !1, this.closable = !1, this.closed = !1, this.disabled = !1, this.position = "top", this.scale = "m", this.selected = !1, this.calciteInternalTabIconChanged = i({ cancelable: !1 }), this.calciteInternalTabTitleRegister = i({ cancelable: !1 }), this.calciteInternalTabTitleCloseChange = i({ cancelable: !1 }), this.calciteInternalTabsActivate = i({ cancelable: !1 }), this.calciteInternalTabsClose = i({ cancelable: !1 }), this.calciteInternalTabsFocusFirst = i({ cancelable: !1 }), this.calciteInternalTabsFocusLast = i({ cancelable: !1 }), this.calciteInternalTabsFocusNext = i({ cancelable: !1 }), this.calciteInternalTabsFocusPrevious = i({ cancelable: !1 }), this.calciteTabsActivate = i({ cancelable: !1 }), this.calciteTabsClose = i({ cancelable: !1 }), this.listenOn(document.body, "calciteInternalTabChange", this.internalTabChangeHandler), this.listen("click", this.onClick), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { controls: 16, hasText: 16, bordered: 7, closable: 7, closed: 7, disabled: 7, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, layout: 3, messageOverrides: 0, position: 1, scale: 1, selected: 7, tab: 3 };
  }
  static {
    this.styles = A;
  }
  async activateTab(t = !0) {
    if (this.disabled || this.closed)
      return;
    const o = { tab: this.tab, userTriggered: t };
    this.calciteInternalTabsActivate.emit(o), t && requestAnimationFrame(() => this.calciteTabsActivate.emit());
  }
  async getTabIdentifier() {
    return this.tab ? this.tab : this.getTabIndex();
  }
  async getTabIndex() {
    return Array.prototype.indexOf.call(x(this.el.parentElement.children).filter(R), this.el);
  }
  _updateAriaInfo(t = [], o = []) {
    this.controls = t[o.indexOf(this.el.id)] || null;
  }
  connectedCallback() {
    super.connectedCallback(), this.setupTextContentObserver(), this.parentTabsEl = this.el.closest("calcite-tabs");
  }
  async load() {
    this.updateHasText(), this.tab && this.selected && this.activateTab(!1);
  }
  willUpdate(t) {
    t.has("selected") && (this.hasUpdated || this.selected !== !1) && this.selectedHandler(), t.has("closed") && this.hasUpdated && this.calciteInternalTabTitleCloseChange.emit(), this.parentTabsEl && (this.layout = this.parentTabsEl.layout, this.bordered = this.parentTabsEl.bordered);
  }
  async loaded() {
    this.calciteInternalTabTitleRegister.emit(await this.getTabIdentifier());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), document.body?.dispatchEvent(new CustomEvent("calciteTabTitleUnregister", {
      detail: this.el
    })), this.resizeObserver?.disconnect();
  }
  selectedHandler() {
    this.selected && this.activateTab(!1);
  }
  internalTabChangeHandler(t) {
    t.composedPath().find(z) === this.parentTabsEl && (this.tab ? this.selected = this.tab === t.detail.tab : this.getTabIndex().then((s) => {
      this.selected = s === t.detail.tab;
    }), t.stopPropagation());
  }
  onClick() {
    this.activateTab();
  }
  keyDownHandler(t) {
    switch (t.key) {
      case " ":
      case "Enter":
        t.composedPath().includes(this.closeButtonRef.value) || (this.activateTab(), t.preventDefault());
        break;
      case "ArrowRight":
        t.preventDefault(), this.direction === "ltr" ? this.calciteInternalTabsFocusNext.emit() : this.calciteInternalTabsFocusPrevious.emit();
        break;
      case "ArrowLeft":
        t.preventDefault(), this.direction === "ltr" ? this.calciteInternalTabsFocusPrevious.emit() : this.calciteInternalTabsFocusNext.emit();
        break;
      case "Home":
        t.preventDefault(), this.calciteInternalTabsFocusFirst.emit();
        break;
      case "End":
        t.preventDefault(), this.calciteInternalTabsFocusLast.emit();
        break;
    }
  }
  closeClickHandler() {
    this.closeTabTitleAndNotify();
  }
  updateHasText() {
    this.hasText = this.el.textContent.trim().length > 0;
  }
  setContainerRef(t) {
    I(this.resizeObserver, this.containerEl, t), this.containerEl = t;
  }
  setupTextContentObserver() {
    this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  closeTabTitleAndNotify() {
    this.closed = !0, this.calciteInternalTabsClose.emit({ tab: this.tab }), requestAnimationFrame(() => this.calciteTabsClose.emit());
  }
  render() {
    const { el: t, closed: o } = this, s = t.id || this.guid, h = n`<calcite-icon class=${a({ [e.titleIcon]: !0, [e.iconStart]: !0 })} .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} .scale=${b(this.scale)}></calcite-icon>`, u = n`<calcite-icon class=${a({ [e.titleIcon]: !0, [e.iconEnd]: !0 })} .flipRtl=${this.iconFlipRtl === "end" || this.iconFlipRtl === "both"} .icon=${this.iconEnd} .scale=${b(this.scale)}></calcite-icon>`;
    return l(this.el, "aria-controls", this.controls), this.el.ariaSelected = y(this.selected), l(this.el, "id", s), this.el.role = "tab", l(this.el, "tabIndex", this.selected && !this.disabled ? 0 : -1), this.interactiveContainer({ disabled: this.disabled, children: n`<div class=${a({
      [e.container]: !0,
      [e.containerBottom]: this.position === "bottom",
      [e.iconPresent]: !!this.iconStart || !!this.iconEnd,
      [e.scale(this.scale)]: !0
    })} .hidden=${o} ${r(this.setContainerRef)}><div class=${a({ [e.content]: !0, [e.contentHasText]: this.hasText })}>${this.iconStart ? h : null}<slot></slot>${this.iconEnd ? u : null}</div>${this.renderCloseButton()}<div class=${a(e.selectedIndicator)}></div></div>` });
  }
  renderCloseButton() {
    const { closable: t, messages: o } = this;
    return t ? f("close-button", n`<calcite-action class=${a(e.close)} icon=x @click=${this.closeClickHandler} .scale=${this.scale} .text=${o.close} ${r(this.closeButtonRef)}></calcite-action>`) : null;
  }
}
m("calcite-tab-title", O);
export {
  O as TabTitle
};
