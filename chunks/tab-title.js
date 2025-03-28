import { d as f, L as v, j as o, i as g, s as n, x as a, o as s, E as x, h as k } from "./iframe.js";
import { i as y } from "./keyed.js";
import { e as T, n as b } from "./ref.js";
import { n as z, g as h, t as I } from "./dom.js";
import { g as E } from "./guid.js";
import { u as C, I as w } from "./interactive.js";
import { c as u } from "./observers.js";
import { g as r } from "./component.js";
import { u as $ } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.0 */
const e = {
  closeButton: "close-button",
  container: "container",
  containerBottom: "container--bottom",
  content: "content",
  contentHasText: "content--has-text",
  iconEnd: "icon-end",
  iconPresent: "icon-present",
  iconStart: "icon-start",
  titleIcon: "calcite-tab-title--icon",
  scale: (l) => `scale-${l}`,
  selectedIndicator: "selected-indicator"
}, F = {
  close: "x"
}, A = f`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;outline:2px solid transparent;outline-offset:2px;margin-inline-start:0px}:host([layout=inline]){flex:0 1 auto}:host([layout=center]){flex:1 1 auto}.content{position:relative;margin-block-end:.125rem;box-sizing:border-box;display:flex;block-size:100%;align-items:center;justify-content:center}.scale-s .content{padding-block:.25rem;font-size:var(--calcite-font-size--2);line-height:1rem}.scale-s .close-button{inline-size:1.25rem}.scale-m .content{padding-block:.5rem;font-size:var(--calcite-font-size--1);line-height:1rem}.scale-m .close-button{inline-size:1.75rem}.scale-l .content{padding-block:.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}.scale-l .close-button{inline-size:2rem}:host([closable]) .content{border-block-end-color:transparent}:host([layout=inline]) .content,:host([layout=center]) .content{padding-inline:.25rem}:host([layout=center]) .scale-s,:host([layout=center]) .scale-m,:host([layout=center]) .scale-l{margin-block:0px;justify-content:center;text-align:center}:host([layout=center]) .scale-s .content,:host([layout=center]) .scale-m .content,:host([layout=center]) .scale-l .content{flex:1 1 auto;flex-grow:1}.container{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;align-content:center;justify-content:space-between;padding-inline:0px;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-3);outline-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.selected-indicator{position:absolute;display:block;block-size:.125rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;inset-block-end:0;inset-inline-start:0;inset-inline-end:0;inline-size:100%}.container--bottom .selected-indicator{inset-block-end:unset;inset-block-start:0}:host([bordered]) .selected-indicator{inset-block-start:0;inset-block-end:unset;inset-inline-start:-1px;inset-inline-end:0;inline-size:calc(100% + var(--calcite-spacing-base))}:host([bordered]) .container:not(.container--bottom){border-block-end:1px solid transparent}:host(:not([bordered])) .container:hover,:host(:not([bordered])) .container:active{color:var(--calcite-color-text-1)}:host([bordered]:not([selected]):hover) .container:not(.container--bottom){border-block-end:1px solid var(--calcite-color-border-1)}:host([bordered]:not([selected]):hover:not(:focus)) .selected-indicator{background-color:var(--calcite-color-foreground-2)}:host([bordered]:not([selected]):hover:not(:focus)) .container:not(.container--bottom) .selected-indicator{box-shadow:inset 0 1px var(--calcite-color-border-1)}:host([bordered]:not([selected]):hover:not(:focus)) .container.container--bottom .selected-indicator{box-shadow:inset 0 -1px var(--calcite-color-border-1)}:host([bordered][selected]) .container:after{position:absolute;display:block;block-size:.125rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;inset-block-end:-1px;inset-inline-start:0;inset-inline-end:0;inline-size:100%;background:var(--calcite-color-foreground-1);content:""}:host([bordered][selected]) .container.container--bottom:after{inset-block-start:-1px}:host([bordered][selected]:focus) .container:after{background:transparent}:host([bordered]) .container--bottom .selected-indicator{inset-block-start:unset;inset-block-end:0}:host([selected]) .selected-indicator,:host([selected]:hover) .selected-indicator{background-color:var(--calcite-color-brand)}:host(:hover) .selected-indicator{background-color:var(--calcite-color-border-3)}:host(:focus) .selected-indicator,:host(:active) .selected-indicator{background-color:var(--calcite-color-brand)}:host([selected]:focus) .selected-indicator{block-size:4px}@media (forced-colors: active){.selected-indicator{background-color:highlight}}:host([closed]){display:none}:host([selected]) .container{border-color:transparent;color:var(--calcite-color-text-1)}:host(:focus) .container{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:focus) .container:focus-within{outline-color:transparent}:host(:active) a,:host(:focus) a,:host(:hover) a{border-color:var(--calcite-color-border-2);color:var(--calcite-color-text-1);text-decoration-line:none}:host([disabled]) .container{pointer-events:none;opacity:.5}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.calcite-tab-title--icon{position:relative;margin:0;display:inline-flex;align-self:center}.calcite-tab-title--icon svg{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.content--has-text{padding:.25rem}.content--has-text .calcite-tab-title--icon.icon-start{margin-inline-end:var(--calcite-spacing-sm);color:var(--calcite-tab-icon-color-start, var(--calcite-icon-color))}.content--has-text .calcite-tab-title--icon.icon-end{margin-inline-start:var(--calcite-spacing-sm);color:var(--calcite-tab-icon-color-end, var(--calcite-icon-color))}.close-button{display:flex;block-size:100%;cursor:pointer;appearance:none;align-content:center;align-items:center;justify-content:center;align-self:center;border-style:none;background-color:transparent;color:var(--calcite-color-text-3);outline-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;margin-inline-start:var(--calcite-spacing-sm);margin-inline-end:var(--calcite-spacing-px);block-size:calc(100% - var(--calcite-spacing-xxs))}.close-button:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)))}.close-button:focus,.close-button:hover{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.close-button:active{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.close-button calcite-icon{color:inherit}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{margin-inline-end:var(--calcite-spacing-sm)}:host([bordered]) .container:hover,:host([bordered]) .container:active{color:var(--calcite-color-text-1)}:host([bordered]) .container:not(.container--bottom) .close-button{block-size:calc(100% - var(--calcite-spacing-px));margin-block-start:-1px}:host([bordered]) .container .close-button calcite-icon{margin-block-start:var(--calcite-spacing-px)}:host([bordered]) .container .close-button:focus,:host([bordered]) .container .close-button:hover,:host([bordered]) .container .close-button:active{box-shadow:0 2px 0 0 var(--calcite-color-foreground-3)}:host([bordered]) .container.container--bottom .close-button{box-shadow:0 -2px 0 0 transparent}:host([bordered]) .container.container--bottom .close-button calcite-icon{margin-block-end:var(--calcite-spacing-px)}:host([bordered]) .container.container--bottom .close-button:focus,:host([bordered]) .container.container--bottom .close-button:hover,:host([bordered]) .container.container--bottom .close-button:active{box-shadow:0 -2px 0 0 var(--calcite-color-foreground-3)}:host([bordered][selected]){box-shadow:inset 0 -1px var(--calcite-color-foreground-1)}:host([bordered]:not([selected])) .container .close-button{box-shadow:0 2px 0 0 transparent}:host([bordered]:hover) .container{background-color:var(--calcite-color-foreground-2)}:host([bordered]) .container{border-inline:var(--calcite-spacing-px) solid transparent}:host([selected][bordered]) .container{border-inline-color:var(--calcite-color-border-1)}:host([selected][bordered]) .container:hover,:host([selected][bordered]) .container:active{background:transparent}:host([layout=inline][bordered]) .scale-m .content,:host([layout=center][bordered]) .scale-m .content{padding-inline:.75rem}:host([layout=inline][bordered]) .scale-s .content,:host([layout=center][bordered]) .scale-s .content{padding-inline:.5rem}:host([layout=inline][bordered]) .scale-l .content,:host([layout=center][bordered]) .scale-l .content{padding-inline:1rem}:host([layout=inline][closable]) .scale-s .content,:host([layout=inline][closable]) .scale-m .content,:host([layout=inline][closable]) .scale-l .content{padding-inline-end:0}@media (forced-colors: active){:host{outline-width:0;outline-offset:0}:host(:focus) .container{outline-color:highlight}:host([bordered]) .container{border-block-end-style:solid}:host([bordered]) .container--bottom{border-block-start-style:solid}:host([bordered][selected]) .container{border-block-end-style:none}:host([bordered][selected]) .container--bottom{border-block-start-style:none}.close-button{z-index:var(--calcite-z-index)}}:host([hidden]){display:none}[hidden]{display:none}`;
class H extends v {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.closeButtonEl = T(), this.guid = `calcite-tab-title-${E()}`, this.mutationObserver = u("mutation", () => this.updateHasText()), this.resizeObserver = u("resize", () => {
      this.calciteInternalTabIconChanged.emit();
    }), this.hasText = !1, this.bordered = !1, this.closable = !1, this.closed = !1, this.disabled = !1, this.messages = $(), this.position = "top", this.scale = "m", this.selected = !1, this.calciteInternalTabIconChanged = o({ cancelable: !1 }), this.calciteInternalTabTitleRegister = o({ cancelable: !1 }), this.calciteInternalTabsActivate = o({ cancelable: !1 }), this.calciteInternalTabsClose = o({ cancelable: !1 }), this.calciteInternalTabsFocusFirst = o({ cancelable: !1 }), this.calciteInternalTabsFocusLast = o({ cancelable: !1 }), this.calciteInternalTabsFocusNext = o({ cancelable: !1 }), this.calciteInternalTabsFocusPrevious = o({ cancelable: !1 }), this.calciteTabsActivate = o({ cancelable: !1 }), this.calciteTabsClose = o({ cancelable: !1 }), this.listenOn(document.body, "calciteInternalTabChange", this.internalTabChangeHandler), this.listen("click", this.onClick), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { controls: 16, hasText: 16, bordered: 7, closable: 7, closed: 7, disabled: 7, iconEnd: 3, iconFlipRtl: 3, iconStart: 3, layout: 3, messageOverrides: 0, position: 1, scale: 1, selected: 7, tab: 3 };
  }
  static {
    this.styles = A;
  }
  // #endregion
  // #region Public Methods
  /**
   * This activates a tab in order for it and its associated tab-title be selected.
   *
   * @param userTriggered - when `true`, user-interaction events will be emitted in addition to internal events
   * @private
   */
  async activateTab(t = !0) {
    if (this.disabled || this.closed)
      return;
    const i = { tab: this.tab };
    this.calciteInternalTabsActivate.emit(i), t && requestAnimationFrame(() => this.calciteTabsActivate.emit());
  }
  /** @private */
  async getTabIdentifier() {
    return this.tab ? this.tab : this.getTabIndex();
  }
  /** Returns the index of the title within the `calcite-tab-nav`. */
  async getTabIndex() {
    return Array.prototype.indexOf.call(z(this.el.parentElement.children).filter((t) => t.matches("calcite-tab-title")), this.el);
  }
  /**
   * @param tabIds
   * @param titleIds
   * @private
   */
  _updateAriaInfo(t = [], i = []) {
    this.controls = t[i.indexOf(this.el.id)] || null;
  }
  connectedCallback() {
    super.connectedCallback(), this.setupTextContentObserver(), this.parentTabsEl = this.el.closest("calcite-tabs");
  }
  async load() {
    g() && this.updateHasText(), this.tab && this.selected && this.activateTab(!1);
  }
  willUpdate(t) {
    t.has("selected") && (this.hasUpdated || this.selected !== !1) && this.selectedHandler(), this.parentTabsEl && (this.layout = this.parentTabsEl.layout, this.bordered = this.parentTabsEl.bordered);
  }
  updated() {
    C(this);
  }
  /** This lifecycle method is not expected to return a promise. The returned promise will be ignored by Lit rather than awaited. */
  async loaded() {
    this.calciteInternalTabTitleRegister.emit(await this.getTabIdentifier());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), document.body?.dispatchEvent(new CustomEvent("calciteTabTitleUnregister", {
      detail: this.el
    })), this.resizeObserver?.disconnect();
  }
  // #endregion
  // #region Private Methods
  selectedHandler() {
    this.selected && this.activateTab(!1);
  }
  internalTabChangeHandler(t) {
    t.composedPath().find((c) => c.tagName === "CALCITE-TABS") === this.parentTabsEl && (this.tab ? this.selected = this.tab === t.detail.tab : this.getTabIndex().then((c) => {
      this.selected = c === t.detail.tab;
    }), t.stopPropagation());
  }
  onClick() {
    this.activateTab();
  }
  keyDownHandler(t) {
    switch (t.key) {
      case " ":
      case "Enter":
        t.composedPath().includes(this.closeButtonEl.value) || (this.activateTab(), t.preventDefault());
        break;
      case "ArrowRight":
        t.preventDefault(), h(this.el) === "ltr" ? this.calciteInternalTabsFocusNext.emit() : this.calciteInternalTabsFocusPrevious.emit();
        break;
      case "ArrowLeft":
        t.preventDefault(), h(this.el) === "ltr" ? this.calciteInternalTabsFocusPrevious.emit() : this.calciteInternalTabsFocusNext.emit();
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
  setupTextContentObserver() {
    this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  closeTabTitleAndNotify() {
    this.closed = !0, this.calciteInternalTabsClose.emit({ tab: this.tab }), this.calciteTabsClose.emit();
  }
  // #endregion
  // #region Rendering
  render() {
    const { el: t, closed: i } = this, c = t.id || this.guid, p = a`<calcite-icon class=${n({ [e.titleIcon]: !0, [e.iconStart]: !0 })} .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} .scale=${r(this.scale)}></calcite-icon>`, m = a`<calcite-icon class=${n({ [e.titleIcon]: !0, [e.iconEnd]: !0 })} .flipRtl=${this.iconFlipRtl === "end" || this.iconFlipRtl === "both"} .icon=${this.iconEnd} .scale=${r(this.scale)}></calcite-icon>`;
    return s(this.el, "aria-controls", this.controls), this.el.ariaSelected = I(this.selected), s(this.el, "id", c), this.el.role = "tab", s(this.el, "tabIndex", this.selected && !this.disabled ? 0 : -1), w({ disabled: this.disabled, children: a`<div class=${n({
      [e.container]: !0,
      [e.containerBottom]: this.position === "bottom",
      [e.iconPresent]: !!this.iconStart || !!this.iconEnd,
      [e.scale(this.scale)]: !0
    })} .hidden=${i} ${b((d) => d ? this.resizeObserver?.observe(d) : null)}><div class=${n({ [e.content]: !0, [e.contentHasText]: this.hasText })}>${this.iconStart ? p : null}<slot></slot>${this.iconEnd ? m : null}</div>${this.renderCloseButton()}<div class=${n(e.selectedIndicator)}></div></div>` });
  }
  renderCloseButton() {
    const { closable: t, messages: i } = this;
    return t ? y(e.closeButton, a`<button .ariaLabel=${i.close} class=${n(e.closeButton)} @click=${this.closeClickHandler} title=${i.close ?? x} type=button ${b(this.closeButtonEl)}><calcite-icon .icon=${F.close} .scale=${r(this.scale)}></calcite-icon></button>`) : null;
  }
}
k("calcite-tab-title", H);
export {
  H as TabTitle
};
