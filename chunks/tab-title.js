/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as p, L as v, c as a, s as o, b as n, O as l, d as m } from "./index.js";
import { i as f } from "./keyed.js";
import { e as g, n as r } from "./ref.js";
import { u as x } from "./index2.js";
import { n as k } from "./dom.js";
import { t as y } from "./aria.js";
import { g as T } from "./guid.js";
import { c as d, u as C } from "./observers.js";
import { g as h } from "./component.js";
import { u as I } from "./useT9n.js";
import { i as w } from "./resources28.js";
import { u as z } from "./useInteractive.js";
import { i as E } from "./resources2.js";
const i = {
  close: "close",
  container: "container",
  containerBottom: "container--bottom",
  content: "content",
  contentHasText: "content--has-text",
  iconEnd: "icon-end",
  iconPresent: "icon-present",
  iconStart: "icon-start",
  titleIcon: "calcite-tab-title--icon",
  scale: (s) => `scale-${s}`,
  selectedIndicator: "selected-indicator"
}, R = "calcite-tab-title", $ = {
  host: (s) => `${R}-${s}`
}, F = E("calcite-tab-title"), S = p`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{outline:var(--calcite-border-width-md) solid transparent;outline-offset:var(--calcite-border-width-md);display:block;margin-inline-start:0px}:host([layout=inline]){flex:0 1 auto}:host([layout=center]){flex:1 1 auto}.content{display:flex;align-items:center;justify-content:center;block-size:100%;margin-block-end:var(--calcite-space-base);position:relative;box-sizing:border-box}.scale-s{--calcite-internal-tab-title-close-padding: var(--calcite-theme-space-none, var(--calcite-spacing-none));--calcite-internal-tab-title-close-margin-start: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}.scale-s .content{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);padding-block:var(--calcite-space-2xs)}.scale-m{--calcite-internal-tab-title-close-padding: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs));--calcite-internal-tab-title-close-margin-start: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}.scale-m .content{font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);padding-block:var(--calcite-space-sm)}.scale-l{--calcite-internal-tab-title-close-padding: var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs));--calcite-internal-tab-title-close-margin-start: var(--calcite-theme-space-xs, var(--calcite-spacing-xs))}.scale-l .content{font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);padding-block:var(--calcite-space-sm-plus)}:host([closable]) .content{border-block-end-color:transparent}:host([layout=inline]) .content,:host([layout=center]) .content{padding-inline:var(--calcite-space-2xs)}:host([layout=center]) .scale-s,:host([layout=center]) .scale-m,:host([layout=center]) .scale-l{justify-content:center;margin-block:0;text-align:center}:host([layout=center]) .scale-s .content,:host([layout=center]) .scale-m .content,:host([layout=center]) .scale-l .content{flex:1 1 auto;flex-grow:1}.container{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);position:relative;box-sizing:border-box;align-content:center;cursor:pointer;display:flex;outline-color:transparent;block-size:100%;justify-content:space-between;padding-inline:0;inline-size:100%;color:var(--calcite-tab-text-color, var(--calcite-color-text-3));background-color:var(--calcite-tab-background-color, transparent)}.selected-indicator{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:absolute;display:block;block-size:var(--calcite-space-base);inset-block-end:0;inset-inline-start:0;inset-inline-end:0;inline-size:100%}:host([bordered][selected]) .container:after{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:absolute;display:block;block-size:var(--calcite-space-base);inset-block-end:-1px;inset-inline-start:0;inset-inline-end:0;inline-size:100%;content:""}:host([bordered][selected]) .container.container--bottom:after{inset-block-start:-1px}:host([bordered][selected]:focus) .container:after{background:transparent}.container--bottom .selected-indicator{inset-block-end:unset;inset-block-start:0}:host([bordered]:not([selected]):hover:not(:focus)) .selected-indicator{background-color:var(--calcite-theme-color-surface-3, var(--calcite-color-foreground-2))}:host([bordered]:not([selected]):hover:not(:focus)) .container:not(.container--bottom) .selected-indicator{box-shadow:inset 0 1px var(--calcite-color-border-1)}:host([bordered]:not([selected]):hover:not(:focus)) .container.container--bottom .selected-indicator{box-shadow:inset 0 -1px var(--calcite-color-border-1)}:host([selected]:focus) .selected-indicator{block-size:4px}.calcite-tab-title--icon{position:relative;margin:0;display:inline-flex;align-self:center}.calcite-tab-title--icon svg{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.container{color:var(--calcite-tab-text-color, var(--calcite-color-text-3))}.container .icon-start{color:var(--calcite-tab-icon-color-start, var(--calcite-icon-color, var(--calcite-ui-icon-color)))}.container .icon-end{color:var(--calcite-tab-icon-color-end, var(--calcite-icon-color, var(--calcite-ui-icon-color)))}.container:hover,.container:active,:host([selected]) .container{color:var(--calcite-tab-text-color-press, var(--calcite-color-text-1))}.container:hover .icon-start,.container:active .icon-start,:host([selected]) .container .icon-start{color:var(--calcite-tab-icon-color-start-press, var(--calcite-icon-color, var(--calcite-ui-icon-color)))}.container:hover .icon-end,.container:active .icon-end,:host([selected]) .container .icon-end{color:var(--calcite-tab-icon-color-end-press, var(--calcite-icon-color, var(--calcite-ui-icon-color)))}.content--has-text{padding:var(--calcite-space-2xs)}.content--has-text .calcite-tab-title--icon.icon-start{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}.content--has-text .calcite-tab-title--icon.icon-end{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([bordered]) .container{border-color:transparent;border-inline-width:var(--calcite-theme-space-px, var(--calcite-spacing-px));border-inline-style:solid}:host([bordered]) .container.container--bottom{border-block-start-style:solid;border-block-start-width:1px}:host([bordered]) .container.container--bottom .selected-indicator{inset-block-start:unset;inset-block-end:0}:host([bordered]) .container:not(.container--bottom){border-block-end-style:solid;border-block-end-width:1px}:host([bordered]) .container .selected-indicator{inset-block-start:0;inset-block-end:unset;inset-inline-start:-1px;inset-inline-end:0;inline-size:calc(100% + var(--calcite-theme-space-base, var(--calcite-spacing-base)))}:host([bordered]) .container:host(:not([selected])) .container{box-shadow:0 2px 0 0 transparent}:host([bordered]) .container:host(:not([selected])):host(:hover) .container:not(.container--bottom){border-block-end-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]) .container:host(:not([selected])):host(:hover):host(:not(:focus)) .selected-indicator{box-shadow:inset 0 var(--calcite-internal-tab-shadow-length) var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]) .container:host(:not([selected])):host(:hover):host(:not(:focus)) :not(.container--bottom){--calcite-internal-tab-shadow-length: 1px}:host([bordered]) .container:host(:not([selected])):host(:hover):host(:not(:focus)) .container--bottom{--calcite-internal-tab-shadow-length: -1px}:host([bordered]) .container:hover{background-color:var(--calcite-tab-background-color-hover, var(--calcite-theme-color-surface-3, var(--calcite-color-foreground-2)));border-block-end-color:var(--calcite-color-border-1)}:host(:hover) .selected-indicator{background-color:var(--calcite-color-border-3)}:host([selected]) .selected-indicator,:host([selected]:hover) .selected-indicator,:host(:focus) .selected-indicator,:host(:active) .selected-indicator{background-color:var(--calcite-tab-accent-color-press, var(--calcite-color-brand))}:host([closed]){display:none}:host([selected][bordered]) .container{border-inline-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([selected][bordered]) .container:after{background-color:var(--calcite-tab-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)))}:host([selected][bordered]) .container:hover,:host([selected][bordered]) .container:active{background:transparent}:host(:focus) .container{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-1 * var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}:host(:focus) .container:focus-within{outline-color:transparent}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([layout=inline][bordered]) .scale-m .content,:host([layout=center][bordered]) .scale-m .content{padding-inline:var(--calcite-space-md)}:host([layout=inline][bordered]) .scale-s .content,:host([layout=center][bordered]) .scale-s .content{padding-inline:var(--calcite-space-sm)}:host([layout=inline][bordered]) .scale-l .content,:host([layout=center][bordered]) .scale-l .content{padding-inline:var(--calcite-space-lg)}:host([layout=inline][closable]) .scale-s .content,:host([layout=inline][closable]) .scale-m .content,:host([layout=inline][closable]) .scale-l .content{padding-inline-end:0}.close{--calcite-internal-action-spacing: var(--calcite-internal-tab-title-close-padding);--calcite-internal-action-min-height: unset;--calcite-action-text-color: var(--calcite-tab-close-icon-color);--calcite-action-text-color-press: var(--calcite-tab-close-icon-color-press);--calcite-action-background-color: var(--calcite-tab-close-icon-background-color);--calcite-action-background-color-press: var(--calcite-tab-close-icon-background-color-press);--calcite-action-background-color-hover: var(--calcite-tab-close-icon-background-color-hover);margin:auto;margin-inline:var(--calcite-theme-space-sm, var(--calcite-spacing-sm)) var(--calcite-internal-tab-title-close-margin-start)}@media(forced-colors:active){:host{outline-width:0;outline-offset:0}:host(:focus) .container{outline-color:highlight}:host([bordered][selected]) .container{border-block-end-style:none}:host([bordered][selected]) .container--bottom{border-block-start-style:none}.selected-indicator{background-color:highlight}}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) .container{pointer-events:none;opacity:.5}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class O extends v {
  constructor() {
    super(), this._closed = !1, this.closeButtonRef = g(), this.direction = x(), this.guid = $.host(T()), this.mutationObserver = d("mutation", () => this.updateHasText()), this.parentTabsEl = null, this.resizeObserver = d("resize", () => {
      this.calciteInternalTabIconChanged.emit();
    }), this.messages = I(), this.interactiveContainer = z(this), this.controls = null, this.hasText = !1, this.bordered = !1, this.closable = !1, this.disabled = !1, this.position = "top", this.scale = "m", this.selected = !1, this.calciteInternalTabIconChanged = a({ cancelable: !1 }), this.calciteInternalTabTitleCloseChange = a({ cancelable: !1 }), this.calciteInternalTabTitleRegister = a({ cancelable: !1 }), this.calciteInternalTabsActivate = a({ cancelable: !1 }), this.calciteInternalTabsClose = a({ cancelable: !1 }), this.calciteInternalTabsFocusFirst = a({ cancelable: !1 }), this.calciteInternalTabsFocusLast = a({ cancelable: !1 }), this.calciteInternalTabsFocusNext = a({ cancelable: !1 }), this.calciteInternalTabsFocusPrevious = a({ cancelable: !1 }), this.calciteTabsActivate = a({ cancelable: !1 }), this.calciteTabsClose = a({ cancelable: !1 }), this.listenOn(document.body, "calciteInternalTabChange", this.internalTabChangeHandler), this.listen("click", this.onClick), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { controls: 16, hasText: 16, beforeClose: 0, bordered: 7, closable: 7, closed: 7, disabled: 7, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, layout: 3, messageOverrides: 0, position: 1, scale: 1, selected: 7, tab: 3 };
  }
  static {
    this.styles = S;
  }
  get closed() {
    return this._closed;
  }
  set closed(e) {
    (e !== this._closed || !e && this.closeRequest) && this.setClosedState(e);
  }
  async activateTab(e = !0) {
    if (this.disabled || this.closed)
      return;
    const t = { tab: this.tab, userTriggered: e };
    this.calciteInternalTabsActivate.emit(t), e && requestAnimationFrame(() => this.calciteTabsActivate.emit());
  }
  async getTabIdentifier() {
    return this.tab ? this.tab : this.getTabIndex();
  }
  async getTabIndex() {
    return Array.prototype.indexOf.call(k(this.el.parentElement.children).filter(F), this.el);
  }
  _updateAriaInfo(e = [], t = []) {
    this.controls = e[t.indexOf(this.el.id)] || null;
  }
  connectedCallback() {
    super.connectedCallback(), this.setupTextContentObserver(), this.parentTabsEl = this.el.closest("calcite-tabs");
  }
  async load() {
    this.updateHasText(), this.tab && this.selected && this.activateTab(!1);
  }
  willUpdate(e) {
    e.has("selected") && (this.hasUpdated || this.selected !== !1) && this.selectedHandler(), e.has("closed") && this.hasUpdated && this.calciteInternalTabTitleCloseChange.emit(), this.parentTabsEl && (this.layout = this.parentTabsEl.layout, this.bordered = this.parentTabsEl.bordered);
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
  internalTabChangeHandler(e) {
    e.composedPath().find(w) === this.parentTabsEl && (this.tab ? this.selected = this.tab === e.detail.tab : this.getTabIndex().then((c) => {
      this.selected = c === e.detail.tab;
    }), e.stopPropagation());
  }
  onClick() {
    this.activateTab();
  }
  keyDownHandler(e) {
    switch (e.key) {
      case " ":
      case "Enter":
        e.composedPath().includes(this.closeButtonRef.value) || (this.activateTab(), e.preventDefault());
        break;
      case "ArrowRight":
        e.preventDefault(), this.direction === "ltr" ? this.calciteInternalTabsFocusNext.emit() : this.calciteInternalTabsFocusPrevious.emit();
        break;
      case "ArrowLeft":
        e.preventDefault(), this.direction === "ltr" ? this.calciteInternalTabsFocusPrevious.emit() : this.calciteInternalTabsFocusNext.emit();
        break;
      case "Home":
        e.preventDefault(), this.calciteInternalTabsFocusFirst.emit();
        break;
      case "End":
        e.preventDefault(), this.calciteInternalTabsFocusLast.emit();
        break;
    }
  }
  closeClickHandler() {
    this.setClosedState(!0, !0);
  }
  updateHasText() {
    this.hasText = this.el.textContent.trim().length > 0;
  }
  setContainerRef(e) {
    C(this.resizeObserver, this.containerEl, e), this.containerEl = e;
  }
  setupTextContentObserver() {
    this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  async setClosedState(e, t = !1) {
    if (!e) {
      this.closeRequest = void 0, this.updateClosedState(!1);
      return;
    }
    if (this.closeRequest)
      return this.closeRequest;
    const c = Promise.resolve().then(async () => {
      if (this.beforeClose)
        try {
          await this.beforeClose();
        } catch {
          return;
        }
      this.closeRequest === c && (this.updateClosedState(!0), t && (this.calciteInternalTabsClose.emit({ tab: this.tab }), requestAnimationFrame(() => this.calciteTabsClose.emit())));
    });
    this.closeRequest = c;
    try {
      await c;
    } finally {
      this.closeRequest === c && (this.closeRequest = void 0);
    }
  }
  updateClosedState(e) {
    const t = this._closed;
    this._closed = e, this.requestUpdate("closed", t);
  }
  render() {
    const { el: e, closed: t } = this, c = e.id || this.guid, b = n`<calcite-icon class=${o({ [i.titleIcon]: !0, [i.iconStart]: !0 })} .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} .scale=${h(this.scale)}></calcite-icon>`, u = n`<calcite-icon class=${o({ [i.titleIcon]: !0, [i.iconEnd]: !0 })} .flipRtl=${this.iconFlipRtl === "end" || this.iconFlipRtl === "both"} .icon=${this.iconEnd} .scale=${h(this.scale)}></calcite-icon>`;
    return l(this.el, "aria-controls", this.controls), this.el.ariaSelected = y(this.selected), l(this.el, "id", c), this.el.role = "tab", l(this.el, "tabIndex", this.selected && !this.disabled ? 0 : -1), this.interactiveContainer({ disabled: this.disabled, children: n`<div class=${o({
      [i.container]: !0,
      [i.containerBottom]: this.position === "bottom",
      [i.iconPresent]: !!this.iconStart || !!this.iconEnd,
      [i.scale(this.scale)]: !0
    })} .hidden=${t} ${r(this.setContainerRef)}><div class=${o({ [i.content]: !0, [i.contentHasText]: this.hasText })}>${this.iconStart ? b : null}<slot></slot>${this.iconEnd ? u : null}</div>${this.renderCloseButton()}<div class=${o(i.selectedIndicator)}></div></div>` });
  }
  renderCloseButton() {
    const { closable: e, messages: t } = this;
    return e ? f("close-button", n`<calcite-action class=${o(i.close)} icon=x @click=${this.closeClickHandler} .scale=${this.scale} .text=${t.close} ${r(this.closeButtonRef)}></calcite-action>`) : null;
  }
}
m("calcite-tab-title", O);
export {
  O as TabTitle
};
