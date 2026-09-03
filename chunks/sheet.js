/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as C, L as O, c as m, O as R, s as r, F as V, b as v, d as B, K as $, Q as T } from "./index.js";
import { i as E } from "./keyed.js";
import { u as L, i as g } from "./useSizeOverride.js";
import { e as w, n as f } from "./ref.js";
import { u as U } from "./index2.js";
import { h as c } from "./dom.js";
import { c as H } from "./observers.js";
import { t as P } from "./openCloseComponent.js";
import { g as S } from "./dynamicClasses.js";
import { a as x } from "./aria.js";
import { u as M } from "./useT9n.js";
import { u as A } from "./usePreventDocumentScroll.js";
import { u as _ } from "./useFocusTrap.js";
import { u as F } from "./useSetFocus.js";
import { u as K } from "./useTopLayer.js";
import { I as y, a as D, C as l } from "./resources24.js";
const j = C`:host{position:absolute;inset:0;display:flex;visibility:hidden!important;--calcite-sheet-scrim-background-internal: rgba(0, 0, 0, .85);--calcite-scrim-shadow-block-start-internal: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-block-end-internal: 0 -4px 8px -1px rgba(0, 0, 0, .08), 0 -2px 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-inline-start-internal: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-inline-end-internal: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04)}:host([embedded]){z-index:var(--calcite-z-index-overlay)}.calcite--rtl{--calcite-scrim-shadow-inline-start-internal: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-inline-end-internal: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04)}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.container{visibility:hidden;position:fixed;box-sizing:border-box;display:flex;opacity:0;color:var(--calcite-sheet-text-color, var(--calcite-color-text-2));transition:visibility 0ms linear var(--calcite-internal-animation-timing-medium),opacity var(--calcite-internal-animation-timing-medium) ease-in-out}:host([top-layer-disabled]) .container,:host([embedded]) .container{z-index:var(--calcite-z-index-overlay)}:host([modal-disabled]),:host([modal-disabled]) .container{pointer-events:none}:host([position=inline-start]) .container{justify-content:flex-start;inset-block:0;inset-inline:0 auto;--calcite-sheet-hidden-position-internal: translate3d(-1rem, 0, 0)}:host([position=inline-end]) .container{justify-content:flex-end;inset-block:0;inset-inline:auto 0;--calcite-sheet-hidden-position-internal: translate3d(1rem, 0, 0)}:host([position=block-start]) .container{align-items:flex-start;inset-block:0 auto;inset-inline:0;--calcite-sheet-hidden-position-internal: translate3d(0, -1rem, 0)}:host([position=block-end]) .container{align-items:flex-end;inset-block:auto 0;inset-inline:0;--calcite-sheet-hidden-position-internal: translate3d(0, 1rem, 0)}:host([display-mode=float]) .content{box-shadow:var(--calcite-sheet-shadow, var(--calcite-shadow-sm))}:host([display-mode=overlay][position=inline-start]) .content{box-shadow:var(--calcite-scrim-shadow-inline-start-internal)}:host([display-mode=overlay][position=inline-end]) .content{box-shadow:var(--calcite-scrim-shadow-inline-end-internal)}:host([display-mode=overlay][position=block-start]) .content{box-shadow:var(--calcite-scrim-shadow-block-start-internal)}:host([display-mode=overlay][position=block-end]) .content{box-shadow:var(--calcite-scrim-shadow-block-end-internal)}:host([position^=inline]) .content{inline-size:var(--calcite-sheet-width-internal);max-inline-size:var(--calcite-sheet-max-width-internal);min-inline-size:var(--calcite-sheet-min-width-internal)}:host([position^=block]) .content{block-size:var(--calcite-sheet-height-internal);max-block-size:var(--calcite-sheet-max-height-internal);min-block-size:var(--calcite-sheet-min-height-internal)}:host([position^=inline]) .width-s{--calcite-sheet-width-internal: var(--calcite-sheet-width, 15vw);--calcite-sheet-max-width-internal: var(--calcite-sheet-max-width, 360px);--calcite-sheet-min-width-internal: var(--calcite-sheet-min-width, 260px)}:host([position^=inline]) .width-m{--calcite-sheet-width-internal: var(--calcite-sheet-width, 25vw);--calcite-sheet-max-width-internal: var(--calcite-sheet-max-width, 420px);--calcite-sheet-min-width-internal: var(--calcite-sheet-min-width, 300px)}:host([position^=inline]) .width-l{--calcite-sheet-width-internal: var(--calcite-sheet-width, 45vw);--calcite-sheet-max-width-internal: var(--calcite-sheet-max-width, 680px);--calcite-sheet-min-width-internal: var(--calcite-sheet-min-width, 340px)}:host([position^=block]) .height-s{--calcite-sheet-min-height-internal: var(--calcite-sheet-min-height, 160px);--calcite-sheet-height-internal: var(--calcite-sheet-height, 30vh);--calcite-sheet-max-height-internal: var(--calcite-sheet-max-height, 30vh)}:host([position^=block]) .height-m{--calcite-sheet-min-height-internal: var(--calcite-sheet-min-height, 200px);--calcite-sheet-height-internal: var(--calcite-sheet-height, 45vh);--calcite-sheet-max-height-internal: var(--calcite-sheet-max-height, 50vh)}:host([position^=block]) .height-l{--calcite-sheet-min-height-internal: var(--calcite-sheet-min-height, 240px);--calcite-sheet-height-internal: var(--calcite-sheet-height, 60vh);--calcite-sheet-max-height-internal: var(--calcite-sheet-max-height, 70vh)}.scrim{--calcite-scrim-background: var(--calcite-sheet-scrim-background, var(--calcite-sheet-scrim-background-internal));position:fixed;inset:0;display:flex;overflow:hidden;z-index:calc(var(--calcite-z-index) * -1)}:host([top-layer-disabled]) .scrim{z-index:unset}[popover]{padding:0;margin:0;border:none;background-color:transparent;position:fixed;display:flex;inline-size:100%;block-size:100%}[popover]:popover-open{display:flex}:host([opened]){visibility:visible!important}.content{position:relative;box-sizing:border-box;display:flex;max-inline-size:100%;padding:0;background-color:var(--calcite-sheet-background-color, var(--calcite-color-foreground-1));max-block-size:100%;visibility:hidden;transition:transform var(--calcite-internal-animation-timing-medium) ease-in-out,visibility 0ms linear var(--calcite-internal-animation-timing-medium),opacity var(--calcite-internal-animation-timing-medium) ease-in-out;transform:var(--calcite-sheet-hidden-position-internal)}:host([top-layer-disabled]),:host([top-layer-disabled]) .content,:host([embedded]) .content{z-index:var(--calcite-z-index-modal)}.content-container{position:relative;display:flex;max-block-size:100%;max-inline-size:100%;flex:1 1 0%;overflow:hidden}.content-container ::slotted(*){block-size:auto}.container--open .content{transform:translateZ(0)}:host([display-mode=float]) .content,:host([display-mode=float]) .container,:host([display-mode=float]) .content-container{border-radius:var(--calcite-sheet-corner-radius, var(--calcite-corner-radius-round))}:host([display-mode=float]) .container{padding:var(--calcite-spacing-md)}.container--open{visibility:visible;opacity:1;transition-delay:0ms}.container--open .content{pointer-events:auto;visibility:visible;opacity:1;transition:transform var(--calcite-internal-animation-timing-medium) ease-in-out,visibility 0ms linear,opacity var(--calcite-internal-animation-timing-medium) ease-in-out,max-inline-size var(--calcite-internal-animation-timing-medium) ease-in-out,max-block-size var(--calcite-internal-animation-timing-medium) ease-in-out;transition-delay:0ms}@starting-style{.container--open{opacity:0;visibility:hidden}}:host([position=inline-start]) .content,:host([position=inline-end]) .content{block-size:100%}:host([position=inline-start]) .content{flex-direction:row}:host([position=inline-end]) .content{flex-direction:row-reverse}:host([position=block-start]) .content,:host([position=block-end]) .content{inline-size:100%}:host([position=block-start]) .content{flex-direction:column}:host([position=block-end]) .content{flex-direction:column-reverse}:host([resizable][position=inline-start]) .content{padding-inline-end:var(--calcite-size-fixed-sm-plus)}:host([resizable][position=inline-end]) .content{padding-inline-start:var(--calcite-size-fixed-sm-plus)}:host([resizable][position=block-start]) .content{padding-block-end:var(--calcite-size-fixed-sm-plus)}:host([resizable][position=block-end]) .content{padding-block-start:var(--calcite-size-fixed-sm-plus)}.resize-handle{position:absolute;box-sizing:border-box;display:flex;-webkit-user-select:none;user-select:none;align-items:center;justify-content:center;outline:2px solid transparent;outline-offset:2px;--calcite-internal-sheet-resize-handle-offset: calc( (var(--calcite-size-fixed-xxl) - var(--calcite-size-fixed-sm-plus)) / 2 * -1 );z-index:var(--calcite-z-index-header)}.resize-handle:active .resize-handle-bar,.resize-handle:hover .resize-handle-bar{color:var(--calcite-sheet-resize-icon-color, var(--calcite-color-text-1));background-color:var(--calcite-sheet-resize-background-color, var(--calcite-color-foreground-3))}.resize-handle-bar{pointer-events:none;display:flex;align-items:center;justify-content:center;color:var(--calcite-sheet-resize-icon-color, var(--calcite-color-border-input));background-color:var(--calcite-sheet-resize-background-color, var(--calcite-color-background))}.resize-handle:focus .resize-handle-bar{outline-color:transparent;outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)))}:host([position=inline-start]) .resize-handle{inline-size:var(--calcite-size-fixed-xxl);inset-inline-end:var(--calcite-internal-sheet-resize-handle-offset);block-size:100%}:host([position=inline-start]) .resize-handle-bar{block-size:100%;inline-size:var(--calcite-size-fixed-sm-plus);border-inline-start:var(--calcite-border-width-sm) solid var(--calcite-sheet-border-color, var(--calcite-color-border-3))}:host([position=inline-start]):host([display-mode=float]) .resize-handle-bar{border-start-end-radius:var(--calcite-sheet-corner-radius, var(--calcite-corner-radius-round));border-end-end-radius:var(--calcite-sheet-corner-radius, var(--calcite-corner-radius-round))}:host([position=inline-end]) .resize-handle{inline-size:var(--calcite-size-fixed-xxl);inset-inline-start:var(--calcite-internal-sheet-resize-handle-offset);block-size:100%}:host([position=inline-end]) .resize-handle-bar{block-size:100%;inline-size:var(--calcite-size-fixed-sm-plus);border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-sheet-border-color, var(--calcite-color-border-3))}:host([position=inline-end]):host([display-mode=float]) .resize-handle-bar{border-start-start-radius:.25rem;border-end-start-radius:.25rem}:host([position=block-start]) .resize-handle{block-size:var(--calcite-size-fixed-xxl);inline-size:100%;inset-block-end:var(--calcite-internal-sheet-resize-handle-offset)}:host([position=block-start]) .resize-handle-bar{inline-size:100%;block-size:var(--calcite-size-fixed-sm-plus);border-block-start:var(--calcite-border-width-sm) solid var(--calcite-sheet-border-color, var(--calcite-color-border-3))}:host([position=block-start]):host([display-mode=float]) .resize-handle-bar{border-end-end-radius:.25rem;border-end-start-radius:.25rem}:host([position=block-end]) .resize-handle{block-size:var(--calcite-size-fixed-xxl);inline-size:100%;inset-block-start:var(--calcite-internal-sheet-resize-handle-offset)}:host([position=block-end]) .resize-handle-bar{inline-size:100%;block-size:var(--calcite-size-fixed-sm-plus);border-block-end:var(--calcite-border-width-sm) solid var(--calcite-sheet-border-color, var(--calcite-color-border-3))}:host([position=block-end]):host([display-mode=float]) .resize-handle-bar{border-start-start-radius:var(--calcite-sheet-corner-radius, var(--calcite-corner-radius-round));border-start-end-radius:var(--calcite-sheet-corner-radius, var(--calcite-corner-radius-round))}:host([position]) .container--embedded{pointer-events:auto;position:absolute;inline-size:100%;max-inline-size:100%;min-inline-size:100%;block-size:100%;max-block-size:100%;min-block-size:100%}:host([position]) .container--embedded calcite-scrim{position:absolute}:host([hidden]){display:none}[hidden]{display:none}`;
class N extends O {
  constructor() {
    super(), this.contentRef = w(), this.direction = U(), this.focusTrap = _({
      triggerProp: "open",
      focusTrapOptions: {
        // scrim closes on click, so we let it take over
        clickOutsideDeactivates: () => this.modalDisabled || this.embedded,
        escapeDeactivates: (e) => (!e.defaultPrevented && !this.escapeDisabled && (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.usePreventDocumentScroll = A()(this), this.messages = M(), this.mutationObserver = H("mutation", () => this.handleMutationObserver()), this._modalDisabled = !1, this._open = !1, this.openProp = "opened", this.transitionProp = "opacity", this.transitionRef = w(), this.focusSetter = F()(this), this.keyDownHandler = (e) => {
      const { defaultPrevented: i, key: s } = e;
      !i && !this.escapeDisabled && this.open && s === "Escape" && (e.preventDefault(), this.open = !1);
    }, this.sizeOverride = L({
      targetElement: this.contentRef,
      getBounds: () => ({
        inline: { min: this.resizeValues.minInlineSize, max: this.resizeValues.maxInlineSize },
        block: { min: this.resizeValues.minBlockSize, max: this.resizeValues.maxBlockSize }
      }),
      onResize: (e) => {
        this.resizeValues = { ...e };
      }
    }), this.topLayer = K({
      disabledOverride: () => this.embedded,
      target: this.transitionRef
    })(this), this.resizeValues = {
      inlineSize: null,
      blockSize: null,
      minInlineSize: null,
      minBlockSize: null,
      maxInlineSize: null,
      maxBlockSize: null
    }, this.displayMode = "overlay", this.embedded = !1, this.escapeDisabled = !1, this.focusTrapDisabled = !1, this.heightScale = "m", this.opened = !1, this.outsideCloseDisabled = !1, this.position = "inline-start", this.resizable = !1, this.topLayerDisabled = !1, this.widthScale = "m", this.calciteSheetBeforeClose = m({ cancelable: !1 }), this.calciteSheetBeforeOpen = m({ cancelable: !1 }), this.calciteSheetClose = m({ cancelable: !1 }), this.calciteSheetOpen = m({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { resizeValues: 16, beforeClose: 0, displayMode: 3, embedded: 7, escapeDisabled: 7, focusTrapDisabled: 7, focusTrapOptions: 0, heightScale: 3, height: 3, label: 1, messageOverrides: 0, modalDisabled: 7, open: 7, opened: 7, outsideCloseDisabled: 7, position: 3, resizable: 7, topLayerDisabled: 7, widthScale: 3, width: 3 };
  }
  static {
    this.styles = j;
  }
  get preventDocumentScroll() {
    return !this.embedded && !this.modalDisabled;
  }
  get modalDisabled() {
    return this._modalDisabled;
  }
  set modalDisabled(e) {
    if (e === this._modalDisabled)
      return;
    const i = this.preventDocumentScroll;
    this._modalDisabled = e, this.requestUpdate("preventDocumentScroll", i);
  }
  get open() {
    return this._open;
  }
  set open(e) {
    const i = this._open;
    e !== i && this.setOpenState(e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  async updateFocusTrapElements(e) {
    this.focusTrap.setExtraContainers(e), this.focusTrap.updateContainerElements();
  }
  async updateSize(e) {
    this.updateSizeInternal(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.hasUpdated && this.refreshResize();
  }
  willUpdate(e) {
    e.has("opened") && (this.hasUpdated || this.opened !== !1) && this.transitionRef.value && P(this), (e.has("open") && (this.hasUpdated || this.open !== !1) || e.has("position") && (this.hasUpdated || this.position !== "inline-start") || e.has("resizable") && (this.hasUpdated || this.resizable !== !1) || e.has("direction")) && this.refreshResize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.embedded = !1, this.cleanUpInteractions();
  }
  async setOpenState(e) {
    if (this.beforeClose && !e)
      try {
        await this.beforeClose?.(this.el);
      } catch {
        return;
      }
    this._open = e, e && await this.componentOnReady(), this.opened = e;
  }
  getResizeIcon() {
    const { position: e } = this;
    return e === "block-start" || e === "block-end" ? y.dragVertical : y.dragHorizontal;
  }
  handleKeyDown(e) {
    const { key: i, defaultPrevented: s, shiftKey: n } = e, { contentRef: a, position: t, resizable: d, resizeValues: { maxBlockSize: b, maxInlineSize: u, minBlockSize: h, minInlineSize: z } } = this, I = [...t === "block-end" || t === "block-start" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"], "Home", "End"];
    if (!d || !a.value || s || !I.includes(i))
      return;
    const p = a.value.getBoundingClientRect(), k = this.direction === "rtl" ? -1 : 1, o = n ? $ : T;
    switch (i) {
      case "ArrowUp":
        this.updateSizeInternal({
          block: p.height + (t === "block-end" ? o : -o)
        }), e.preventDefault();
        break;
      case "ArrowDown":
        this.updateSizeInternal({
          block: p.height + (t === "block-end" ? -o : o)
        }), e.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSizeInternal({
          inline: p.width + (t === "inline-end" ? o : -o) * k
        }), e.preventDefault();
        break;
      case "ArrowRight":
        this.updateSizeInternal({
          inline: p.width + (t === "inline-end" ? -o : o) * k
        }), e.preventDefault();
        break;
      case "Home":
        this.updateSizeInternal(t === "block-start" || t === "block-end" ? { block: h } : { inline: z }), e.preventDefault();
        break;
      case "End":
        this.updateSizeInternal(t === "block-start" || t === "block-end" ? { block: b } : { inline: u }), e.preventDefault();
        break;
    }
  }
  updateSizeInternal(e) {
    this.contentRef.value && this.sizeOverride.resize(e);
  }
  cleanUpInteractions() {
    this.interaction?.unset();
  }
  updateResizeValues() {
    const { contentRef: e } = this;
    if (!e.value)
      return;
    const i = window.getComputedStyle(e.value);
    this.resizeValues = {
      inlineSize: c(i.inlineSize),
      blockSize: c(i.blockSize),
      minInlineSize: c(i.minInlineSize),
      minBlockSize: c(i.minBlockSize),
      maxInlineSize: c(i.maxInlineSize) || window.innerWidth,
      maxBlockSize: c(i.maxBlockSize) || window.innerHeight
    };
  }
  refreshResize() {
    this.updateResizeValues(), this.setUpResizeInteractions();
  }
  setUpResizeInteractions() {
    this.cleanUpInteractions();
    const { contentRef: e, el: i, resizable: s, position: n, open: a, resizeHandleEl: t } = this;
    if (!e.value || !a || !s || !t)
      return;
    const d = this.direction === "rtl", b = this.resizeValues.minInlineSize === null || this.resizeValues.minBlockSize === null ? void 0 : { width: this.resizeValues.minInlineSize, height: this.resizeValues.minBlockSize }, u = this.resizeValues.maxInlineSize === null || this.resizeValues.maxBlockSize === null ? void 0 : { width: this.resizeValues.maxInlineSize, height: this.resizeValues.maxBlockSize };
    this.interaction = g(e.value, { context: i.ownerDocument }).resizable({
      edges: {
        top: n === "block-end" ? t : !1,
        right: n === (d ? "inline-end" : "inline-start") ? t : !1,
        bottom: n === "block-start" ? t : !1,
        left: n === (d ? "inline-start" : "inline-end") ? t : !1
      },
      modifiers: [g.modifiers.restrictSize({ min: b, max: u })],
      listeners: {
        move: ({ rect: h }) => {
          const z = n === "block-start" || n === "block-end";
          this.updateSizeInternal(z ? { block: h.height } : { inline: h.width });
        }
      }
    });
  }
  onBeforeOpen() {
    this.calciteSheetBeforeOpen.emit(), this.topLayer.show();
  }
  onOpen() {
    this.focusTrapDisabled && this.setFocus(), this.focusTrap.activate(), this.calciteSheetOpen.emit();
  }
  onBeforeClose() {
    this.calciteSheetBeforeClose.emit();
  }
  onClose() {
    this.calciteSheetClose.emit(), this.focusTrap.deactivate(), this.topLayer.hide();
  }
  setResizeHandleEl(e) {
    this.resizeHandleEl = e, this.refreshResize();
  }
  handleOutsideClose() {
    this.outsideCloseDisabled || (this.open = !1);
  }
  handleMutationObserver() {
    this.focusTrap.updateContainerElements();
  }
  render() {
    const { resizable: e, position: i, resizeValues: s } = this, n = this.direction, a = i === "block-start" || i === "block-end";
    return R(this.el, "aria-describedby", D.sheetContent), this.el.ariaLabel = this.label, this.el.ariaModal = this.modalDisabled ? "false" : "true", this.el.role = "dialog", v`<div class=${r({
      [l.container]: !0,
      [l.containerOpen]: this.opened,
      [l.containerEmbedded]: this.embedded,
      [V.rtl]: n === "rtl",
      [S("width", this.width, this.widthScale)]: !!(this.width || this.widthScale),
      [S("height", this.height, this.heightScale)]: !!(this.height || this.heightScale)
    })} .popover=${this.embedded ? void 0 : "manual"} ${f(this.transitionRef)}>${this.modalDisabled ? null : v`<calcite-scrim class=${r(l.scrim)} @click=${this.handleOutsideClose}></calcite-scrim>`}<div class=${r(l.content)} id=${D.sheetContent} ${f(this.contentRef)}><div class=${r(l.contentContainer)}><slot></slot></div>${e ? E("resize-handle", v`<div .ariaLabel=${this.messages.resizeEnabled} .ariaOrientation=${a ? "vertical" : "horizontal"} .ariaValueMax=${x(a ? "block" : "inline", s.maxBlockSize, s.maxInlineSize)} .ariaValueMin=${x(a ? "block" : "inline", s.minBlockSize, s.minInlineSize)} .ariaValueNow=${x(a ? "block" : "inline", s.blockSize, s.inlineSize)} class=${r(l.resizeHandle)} @keydown=${this.handleKeyDown} role=separator tabindex=0 touch-action=none ${f(this.setResizeHandleEl)}><div class=${r(l.resizeHandleBar)}><calcite-icon .icon=${this.getResizeIcon()} scale=s></calcite-icon></div></div>`) : null}</div></div>`;
  }
}
B("calcite-sheet", N);
export {
  N as Sheet
};
