import { b as p, L as f, c as o, s as c, x as r, A as s, q as m } from "./index.js";
import { i as v } from "./keyed.js";
import { e as g, n as x } from "./ref.js";
import { n as k, a as l, t as y } from "./dom.js";
import { g as T } from "./guid.js";
import { u as z, I } from "./interactive.js";
import { c as d, u as w } from "./observers.js";
import { g as b } from "./component.js";
import { X as C } from "./XButton.js";
import { u as E } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const e = {
  container: "container",
  containerBottom: "container--bottom",
  content: "content",
  contentHasText: "content--has-text",
  iconEnd: "icon-end",
  iconPresent: "icon-present",
  iconStart: "icon-start",
  titleIcon: "calcite-tab-title--icon",
  scale: (a) => `scale-${a}`,
  selectedIndicator: "selected-indicator"
}, $ = "calcite-tab-title", F = {
  host: (a) => `${$}-${a}`
}, A = p`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;outline:2px solid transparent;outline-offset:2px;margin-inline-start:0px}:host([layout=inline]){flex:0 1 auto}:host([layout=center]){flex:1 1 auto}.content{position:relative;margin-block-end:.125rem;box-sizing:border-box;display:flex;block-size:100%;align-items:center;justify-content:center}.scale-s .content{padding-block:.25rem;font-size:var(--calcite-font-size--2);line-height:1rem}.scale-s .x-button{inline-size:1.25rem}.scale-m .content{padding-block:.5rem;font-size:var(--calcite-font-size--1);line-height:1rem}.scale-m .x-button{inline-size:1.75rem}.scale-l .content{padding-block:.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}.scale-l .x-button{inline-size:2rem}:host([closable]) .content{border-block-end-color:transparent}:host([layout=inline]) .content,:host([layout=center]) .content{padding-inline:.25rem}:host([layout=center]) .scale-s,:host([layout=center]) .scale-m,:host([layout=center]) .scale-l{margin-block:0px;justify-content:center;text-align:center}:host([layout=center]) .scale-s .content,:host([layout=center]) .scale-m .content,:host([layout=center]) .scale-l .content{flex:1 1 auto;flex-grow:1}.container{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;align-content:center;justify-content:space-between;padding-inline:0px;font-size:var(--calcite-font-size--1);line-height:1rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;outline-color:transparent;color:var(--calcite-tab-text-color, var(--calcite-color-text-3));background-color:var(--calcite-tab-background-color, transparent)}.selected-indicator{position:absolute;display:block;block-size:.125rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;inset-block-end:0;inset-inline-start:0;inset-inline-end:0;inline-size:100%}:host([bordered][selected]) .container:after{position:absolute;display:block;block-size:.125rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;inset-block-end:-1px;inset-inline-start:0;inset-inline-end:0;inline-size:100%;content:""}:host([bordered][selected]) .container.container--bottom:after{inset-block-start:-1px}:host([bordered][selected]:focus) .container:after{background:transparent}.container--bottom .selected-indicator{inset-block-end:unset;inset-block-start:0}:host(:not([bordered])) .container:hover,:host(:not([bordered])) .container:active{color:var(--calcite-color-text-1)}:host([bordered]:not([selected]):hover:not(:focus)) .selected-indicator{background-color:var(--calcite-color-foreground-2)}:host([bordered]:not([selected]):hover:not(:focus)) .container:not(.container--bottom) .selected-indicator{box-shadow:inset 0 1px var(--calcite-color-border-1)}:host([bordered]:not([selected]):hover:not(:focus)) .container.container--bottom .selected-indicator{box-shadow:inset 0 -1px var(--calcite-color-border-1)}:host([selected]:focus) .selected-indicator{block-size:4px}.calcite-tab-title--icon{position:relative;margin:0;display:inline-flex;align-self:center}.calcite-tab-title--icon svg{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.content--has-text .icon-start,.content--has-text .calcite-tab-title--icon.icon-start{color:var(--calcite-tab-icon-color-start, var(--calcite-icon-color))}.content--has-text .calcite-tab-title--icon.icon-start .icon-end,.content--has-text .calcite-tab-title--icon.icon-end{color:var(--calcite-tab-icon-color-end, var(--calcite-icon-color))}.content--has-text{padding:.25rem}.content--has-text .calcite-tab-title--icon.icon-start{margin-inline-end:var(--calcite-spacing-sm)}.content--has-text .calcite-tab-title--icon.icon-end{margin-inline-start:var(--calcite-spacing-sm)}.x-button{display:flex;block-size:100%;cursor:pointer;appearance:none;align-content:center;align-items:center;justify-content:center;align-self:center;border-style:none;background-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;outline-color:transparent;margin-inline-start:var(--calcite-spacing-sm);margin-inline-end:var(--calcite-spacing-px);block-size:calc(100% - var(--calcite-spacing-xxs));color:var(--calcite-tab-close-icon-color, var(--calcite-color-text-3));background-color:var(--calcite-tab-close-icon-background-color, var(--calcite-color-transparent))}.x-button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus)}.x-button:focus,.x-button:hover,.x-button:active{color:var(--calcite-tab-close-icon-color-press, var(--calcite-color-text-1));background-color:var(--calcite-tab-close-icon-background-color-press, var(--calcite-color-foreground-3))}:host([bordered]) .container{border-color:transparent;border-inline-width:var(--calcite-spacing-px);border-inline-style:solid}:host([bordered]) .container:hover,:host([bordered]) .container:active{color:var(--calcite-color-text-1)}:host([bordered]) .container .x-button calcite-icon{margin-block-start:var(--calcite-spacing-px)}:host([bordered]) .container .x-button:focus,:host([bordered]) .container .x-button:hover,:host([bordered]) .container .x-button:active{box-shadow:0 2px 0 0 var(--calcite-tab-close-icon-background-color-press, var(--calcite-color-foreground-3))}:host([bordered]) .container.container--bottom{border-block-start-style:solid;border-block-start-width:1px}:host([bordered]) .container.container--bottom .selected-indicator{inset-block-start:unset;inset-block-end:0}:host([bordered]) .container.container--bottom .x-button{box-shadow:0 -2px 0 0 var(--calcite-tab-close-icon-background-color, var(--calcite-color-transparent))}:host([bordered]) .container.container--bottom .x-button:focus,:host([bordered]) .container.container--bottom .x-button:hover,:host([bordered]) .container.container--bottom .x-button:active{box-shadow:0 -2px 0 0 var(--calcite-tab-close-icon-background-color-press, var(--calcite-color-foreground-3))}:host([bordered]) .container.container--bottom .x-button calcite-icon{margin-block-end:var(--calcite-spacing-px)}:host([bordered]) .container:not(.container--bottom){border-block-end-style:solid;border-block-end-width:1px}:host([bordered]) .container:not(.container--bottom) .x-button{block-size:calc(100% - var(--calcite-spacing-px));margin-block-start:-1px}:host([bordered]) .container .selected-indicator{inset-block-start:0;inset-block-end:unset;inset-inline-start:-1px;inset-inline-end:0;inline-size:calc(100% + var(--calcite-spacing-base))}:host([bordered]) .container:host(:not([selected])) .container .x-button{box-shadow:0 2px 0 0 transparent}:host([bordered]) .container:host(:not([selected])):host(:hover) .container:not(.container--bottom){border-block-end-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]) .container:host(:not([selected])):host(:hover):host(:not(:focus)) .selected-indicator{box-shadow:inset 0 var(--calcite-internal-tab-shadow-length) var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([bordered]) .container:host(:not([selected])):host(:hover):host(:not(:focus)) :not(.container--bottom){--calcite-internal-tab-shadow-length: 1px}:host([bordered]) .container:host(:not([selected])):host(:hover):host(:not(:focus)) .container--bottom{--calcite-internal-tab-shadow-length: -1px}:host([bordered]) .container:hover{background-color:var(--calcite-tab-background-color-hover, var(--calcite-color-foreground-2));border-block-end-color:var(--calcite-color-border-1)}:host(:hover) .selected-indicator{background-color:var(--calcite-color-border-3)}:host([selected]) .selected-indicator,:host([selected]:hover) .selected-indicator,:host(:focus) .selected-indicator,:host(:active) .selected-indicator{background-color:var(--calcite-tab-accent-color-press, var(--calcite-color-brand))}:host([closed]){display:none}:host([selected]) .container{border-color:transparent;color:var(--calcite-tab-text-color, var(--calcite-color-text-1))}:host([selected][bordered]) .container{border-inline-color:var(--calcite-tab-border-color, var(--calcite-color-border-1))}:host([selected][bordered]) .container:after{background-color:var(--calcite-tab-background-color, var(--calcite-color-foreground-1))}:host([selected][bordered]) .container:hover,:host([selected][bordered]) .container:active{background:transparent}:host(:focus) .container{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:focus) .container:focus-within{outline-color:transparent}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{margin-inline-end:var(--calcite-spacing-sm)}:host([layout=inline][bordered]) .scale-m .content,:host([layout=center][bordered]) .scale-m .content{padding-inline:.75rem}:host([layout=inline][bordered]) .scale-s .content,:host([layout=center][bordered]) .scale-s .content{padding-inline:.5rem}:host([layout=inline][bordered]) .scale-l .content,:host([layout=center][bordered]) .scale-l .content{padding-inline:1rem}:host([layout=inline][closable]) .scale-s .content,:host([layout=inline][closable]) .scale-m .content,:host([layout=inline][closable]) .scale-l .content{padding-inline-end:0}@media (forced-colors: active){:host{outline-width:0;outline-offset:0}:host(:focus) .container{outline-color:highlight}:host([bordered][selected]) .container{border-block-end-style:none}:host([bordered][selected]) .container--bottom{border-block-start-style:none}.x-button{z-index:var(--calcite-z-index)}.selected-indicator{background-color:highlight}}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) .container{pointer-events:none;opacity:.5}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class R extends f {
  constructor() {
    super(), this.closeButtonRef = g(), this.guid = F.host(T()), this.mutationObserver = d("mutation", () => this.updateHasText()), this.resizeObserver = d("resize", () => {
      this.calciteInternalTabIconChanged.emit();
    }), this.messages = E(), this.hasText = !1, this.bordered = !1, this.closable = !1, this.closed = !1, this.disabled = !1, this.position = "top", this.scale = "m", this.selected = !1, this.calciteInternalTabIconChanged = o({ cancelable: !1 }), this.calciteInternalTabTitleRegister = o({ cancelable: !1 }), this.calciteInternalTabsActivate = o({ cancelable: !1 }), this.calciteInternalTabsClose = o({ cancelable: !1 }), this.calciteInternalTabsFocusFirst = o({ cancelable: !1 }), this.calciteInternalTabsFocusLast = o({ cancelable: !1 }), this.calciteInternalTabsFocusNext = o({ cancelable: !1 }), this.calciteInternalTabsFocusPrevious = o({ cancelable: !1 }), this.calciteTabsActivate = o({ cancelable: !1 }), this.calciteTabsClose = o({ cancelable: !1 }), this.listenOn(document.body, "calciteInternalTabChange", this.internalTabChangeHandler), this.listen("click", this.onClick), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { controls: 16, hasText: 16, bordered: 7, closable: 7, closed: 7, disabled: 7, iconEnd: [3, { type: String }], iconFlipRtl: 3, iconStart: [3, { type: String }], layout: 3, messageOverrides: 0, position: 1, scale: 1, selected: 7, tab: 3 };
  }
  static {
    this.styles = A;
  }
  async activateTab(t = !0) {
    if (this.disabled || this.closed)
      return;
    const i = { tab: this.tab, userTriggered: t };
    this.calciteInternalTabsActivate.emit(i), t && requestAnimationFrame(() => this.calciteTabsActivate.emit());
  }
  async getTabIdentifier() {
    return this.tab ? this.tab : this.getTabIndex();
  }
  async getTabIndex() {
    return Array.prototype.indexOf.call(k(this.el.parentElement.children).filter((t) => t.matches("calcite-tab-title")), this.el);
  }
  _updateAriaInfo(t = [], i = []) {
    this.controls = t[i.indexOf(this.el.id)] || null;
  }
  connectedCallback() {
    super.connectedCallback(), this.setupTextContentObserver(), this.parentTabsEl = this.el.closest("calcite-tabs");
  }
  async load() {
    this.updateHasText(), this.tab && this.selected && this.activateTab(!1);
  }
  willUpdate(t) {
    t.has("selected") && (this.hasUpdated || this.selected !== !1) && this.selectedHandler(), this.parentTabsEl && (this.layout = this.parentTabsEl.layout, this.bordered = this.parentTabsEl.bordered);
  }
  updated() {
    z(this);
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
    t.composedPath().find((n) => n.tagName === "CALCITE-TABS") === this.parentTabsEl && (this.tab ? this.selected = this.tab === t.detail.tab : this.getTabIndex().then((n) => {
      this.selected = n === t.detail.tab;
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
        t.preventDefault(), l(this.el) === "ltr" ? this.calciteInternalTabsFocusNext.emit() : this.calciteInternalTabsFocusPrevious.emit();
        break;
      case "ArrowLeft":
        t.preventDefault(), l(this.el) === "ltr" ? this.calciteInternalTabsFocusPrevious.emit() : this.calciteInternalTabsFocusNext.emit();
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
    w(this.resizeObserver, this.containerEl, t), this.containerEl = t;
  }
  setupTextContentObserver() {
    this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  closeTabTitleAndNotify() {
    this.closed = !0, this.calciteInternalTabsClose.emit({ tab: this.tab }), this.calciteTabsClose.emit();
  }
  render() {
    const { el: t, closed: i } = this, n = t.id || this.guid, h = r`<calcite-icon class=${c({ [e.titleIcon]: !0, [e.iconStart]: !0 })} .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} .scale=${b(this.scale)}></calcite-icon>`, u = r`<calcite-icon class=${c({ [e.titleIcon]: !0, [e.iconEnd]: !0 })} .flipRtl=${this.iconFlipRtl === "end" || this.iconFlipRtl === "both"} .icon=${this.iconEnd} .scale=${b(this.scale)}></calcite-icon>`;
    return s(this.el, "aria-controls", this.controls), this.el.ariaSelected = y(this.selected), s(this.el, "id", n), this.el.role = "tab", s(this.el, "tabIndex", this.selected && !this.disabled ? 0 : -1), I({ disabled: this.disabled, children: r`<div class=${c({
      [e.container]: !0,
      [e.containerBottom]: this.position === "bottom",
      [e.iconPresent]: !!this.iconStart || !!this.iconEnd,
      [e.scale(this.scale)]: !0
    })} .hidden=${i} ${x(this.setContainerRef)}><div class=${c({ [e.content]: !0, [e.contentHasText]: this.hasText })}>${this.iconStart ? h : null}<slot></slot>${this.iconEnd ? u : null}</div>${this.renderCloseButton()}<div class=${c(e.selectedIndicator)}></div></div>` });
  }
  renderCloseButton() {
    const { closable: t, messages: i } = this;
    return t ? v("close-button", C({ disabled: !1, focusable: !0, label: i.close, onClick: this.closeClickHandler, ref: this.closeButtonRef, round: !1, scale: this.scale, title: i.close })) : null;
  }
}
m("calcite-tab-title", R);
export {
  R as TabTitle
};
