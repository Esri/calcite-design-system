import { b as E, L as I, c as z, A as O, s as h, C as B, x as S, y as $, H as T, q as H } from "./index.js";
import { n as g } from "./ref.js";
import { i as V } from "./keyed.js";
import { i as y } from "./interact.min.js";
import { a as w, k as p, D as M } from "./dom.js";
import { c as R } from "./observers.js";
import { t as A } from "./openCloseComponent.js";
import { g as C } from "./dynamicClasses.js";
import { c as P } from "./math.js";
import { u as L } from "./useT9n.js";
import { u as U } from "./usePreventDocumentScroll.js";
import { u as F } from "./useFocusTrap.js";
import { u as K } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const r = {
  scrim: "scrim",
  container: "container",
  containerOpen: "container--open",
  content: "content",
  contentContainer: "content-container",
  containerEmbedded: "container--embedded",
  resizeHandle: "resize-handle",
  resizeHandleBar: "resize-handle-bar"
}, _ = {
  sheetContent: "sheet-content"
}, D = {
  dragVertical: "drag-resize-vertical",
  dragHorizontal: "drag-resize-horizontal"
}, j = E`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{position:absolute;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;visibility:hidden!important;--calcite-sheet-scrim-background-internal: rgba(0, 0, 0, .85);--calcite-scrim-shadow-block-start-internal: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-block-end-internal: 0 -4px 8px -1px rgba(0, 0, 0, .08), 0 -2px 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-inline-start-internal: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-inline-end-internal: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04)}.calcite--rtl{--calcite-scrim-shadow-inline-start-internal: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-inline-end-internal: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04)}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.container{visibility:hidden;position:fixed;z-index:var(--calcite-z-index-overlay);box-sizing:border-box;display:flex;opacity:0;color:var(--calcite-sheet-text-color, var(--calcite-color-text-2));transition:visibility 0ms linear var(--calcite-internal-animation-timing-medium),opacity var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88)}:host([position=inline-start]) .container{justify-content:flex-start;inset-block:0;inset-inline:0 auto;--calcite-sheet-hidden-position-internal: translate3d(-1rem, 0, 0)}:host([position=inline-end]) .container{justify-content:flex-end;inset-block:0;inset-inline:auto 0;--calcite-sheet-hidden-position-internal: translate3d(1rem, 0, 0)}:host([position=block-start]) .container{align-items:flex-start;inset-block:0 auto;inset-inline:0;--calcite-sheet-hidden-position-internal: translate3d(0, -1rem, 0)}:host([position=block-end]) .container{align-items:flex-end;inset-block:auto 0;inset-inline:0;--calcite-sheet-hidden-position-internal: translate3d(0, 1rem, 0)}:host([display-mode=float]) .content{--tw-shadow: 0 2px 12px -4px rgba(0, 0, 0, .2), 0 2px 4px -2px rgba(0, 0, 0, .16);--tw-shadow-colored: 0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--calcite-sheet-shadow, var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow))}:host([display-mode=overlay][position=inline-start]) .container{box-shadow:var(--calcite-scrim-shadow-inline-start-internal)}:host([display-mode=overlay][position=inline-end]) .container{box-shadow:var(--calcite-scrim-shadow-inline-end-internal)}:host([display-mode=overlay][position=block-start]) .container{box-shadow:var(--calcite-scrim-shadow-block-start-internal)}:host([display-mode=overlay][position=block-end]) .container{box-shadow:var(--calcite-scrim-shadow-block-end-internal)}:host([position^=inline]) .content{inline-size:var(--calcite-sheet-width-internal);max-inline-size:var(--calcite-sheet-max-width-internal);min-inline-size:var(--calcite-sheet-min-width-internal)}:host([position^=block]) .content{block-size:var(--calcite-sheet-height-internal);max-block-size:var(--calcite-sheet-max-height-internal);min-block-size:var(--calcite-sheet-min-height-internal)}:host([position^=inline]) .width-s{--calcite-sheet-width-internal: var(--calcite-sheet-width, 15vw);--calcite-sheet-max-width-internal: var(--calcite-sheet-max-width, 360px);--calcite-sheet-min-width-internal: var(--calcite-sheet-min-width, 260px)}:host([position^=inline]) .width-m{--calcite-sheet-width-internal: var(--calcite-sheet-width, 25vw);--calcite-sheet-max-width-internal: var(--calcite-sheet-max-width, 420px);--calcite-sheet-min-width-internal: var(--calcite-sheet-min-width, 300px)}:host([position^=inline]) .width-l{--calcite-sheet-width-internal: var(--calcite-sheet-width, 45vw);--calcite-sheet-max-width-internal: var(--calcite-sheet-max-width, 680px);--calcite-sheet-min-width-internal: var(--calcite-sheet-min-width, 340px)}:host([position^=block]) .height-s{--calcite-sheet-min-height-internal: var(--calcite-sheet-min-height, 160px);--calcite-sheet-height-internal: var(--calcite-sheet-height, 30vh);--calcite-sheet-max-height-internal: var(--calcite-sheet-max-height, 30vh)}:host([position^=block]) .height-m{--calcite-sheet-min-height-internal: var(--calcite-sheet-min-height, 200px);--calcite-sheet-height-internal: var(--calcite-sheet-height, 45vh);--calcite-sheet-max-height-internal: var(--calcite-sheet-max-height, 50vh)}:host([position^=block]) .height-l{--calcite-sheet-min-height-internal: var(--calcite-sheet-min-height, 240px);--calcite-sheet-height-internal: var(--calcite-sheet-height, 60vh);--calcite-sheet-max-height-internal: var(--calcite-sheet-max-height, 70vh)}.scrim{--calcite-scrim-background: var(--calcite-sheet-scrim-background, var(--calcite-sheet-scrim-background-internal));position:fixed;inset:0;display:flex;overflow:hidden}:host([opened]){visibility:visible!important}.content{position:relative;z-index:var(--calcite-z-index-modal);box-sizing:border-box;display:flex;max-inline-size:100%;padding:0;background-color:var(--calcite-sheet-background-color, var(--calcite-color-foreground-1));max-block-size:100%;visibility:hidden;transition:transform var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88),visibility 0ms linear var(--calcite-internal-animation-timing-medium),opacity var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88);transform:var(--calcite-sheet-hidden-position-internal)}.content-container{position:relative;display:flex;max-block-size:100%;max-inline-size:100%;flex:1 1 0%;overflow:hidden}.container--open .content{transform:translateZ(0)}:host([display-mode=float]) .content,:host([display-mode=float]) .container,:host([display-mode=float]) .content-container{border-radius:var(--calcite-sheet-corner-radius, var(--calcite-corner-radius-round))}:host([display-mode=float]) .container{padding:var(--calcite-spacing-md)}.container--open{visibility:visible;opacity:1;transition-delay:0ms}.container--open .content{pointer-events:auto;visibility:visible;opacity:1;transition:transform var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88),visibility 0ms linear,opacity var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88),max-inline-size var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88),max-block-size var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88);transition-delay:0ms}:host([position=inline-start]) .content,:host([position=inline-end]) .content{block-size:100%}:host([position=inline-start]) .content{flex-direction:row}:host([position=inline-end]) .content{flex-direction:row-reverse}:host([position=block-start]) .content,:host([position=block-end]) .content{inline-size:100%}:host([position=block-start]) .content{flex-direction:column}:host([position=block-end]) .content{flex-direction:column-reverse}:host([resizable][position=inline-start]) .content{padding-inline-end:var(--calcite-size-fixed-sm-plus)}:host([resizable][position=inline-end]) .content{padding-inline-start:var(--calcite-size-fixed-sm-plus)}:host([resizable][position=block-start]) .content{padding-block-end:var(--calcite-size-fixed-sm-plus)}:host([resizable][position=block-end]) .content{padding-block-start:var(--calcite-size-fixed-sm-plus)}.resize-handle{position:absolute;box-sizing:border-box;display:flex;-webkit-user-select:none;user-select:none;align-items:center;justify-content:center;outline:2px solid transparent;outline-offset:2px;--calcite-internal-sheet-resize-handle-offset: calc( (var(--calcite-size-fixed-xxl) - var(--calcite-size-fixed-sm-plus)) / 2 * -1 );z-index:var(--calcite-z-index-header)}.resize-handle:active .resize-handle-bar,.resize-handle:hover .resize-handle-bar{color:var(--calcite-sheet-resize-icon-color, var(--calcite-color-text-1));background-color:var(--calcite-sheet-resize-background-color, var(--calcite-color-foreground-3))}.resize-handle-bar{pointer-events:none;display:flex;align-items:center;justify-content:center;color:var(--calcite-sheet-resize-icon-color, var(--calcite-color-border-input));background-color:var(--calcite-sheet-resize-background-color, var(--calcite-color-background))}.resize-handle:focus .resize-handle-bar{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-color:transparent;outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus)}:host([position=inline-start]) .resize-handle{inline-size:var(--calcite-size-fixed-xxl);inset-inline-end:var(--calcite-internal-sheet-resize-handle-offset);block-size:100%}:host([position=inline-start]) .resize-handle-bar{block-size:100%;inline-size:var(--calcite-size-fixed-sm-plus);border-inline-start:var(--calcite-border-width-sm) solid var(--calcite-sheet-border-color, var(--calcite-color-border-3))}:host([position=inline-start]):host([display-mode=float]) .resize-handle-bar{border-start-end-radius:var(--calcite-sheet-corner-radius, var(--calcite-corner-radius-round));border-end-end-radius:var(--calcite-sheet-corner-radius, var(--calcite-corner-radius-round))}:host([position=inline-end]) .resize-handle{inline-size:var(--calcite-size-fixed-xxl);inset-inline-start:var(--calcite-internal-sheet-resize-handle-offset);block-size:100%}:host([position=inline-end]) .resize-handle-bar{block-size:100%;inline-size:var(--calcite-size-fixed-sm-plus);border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-sheet-border-color, var(--calcite-color-border-3))}:host([position=inline-end]):host([display-mode=float]) .resize-handle-bar{border-start-start-radius:.25rem;border-end-start-radius:.25rem}:host([position=block-start]) .resize-handle{block-size:var(--calcite-size-fixed-xxl);inline-size:100%;inset-block-end:var(--calcite-internal-sheet-resize-handle-offset)}:host([position=block-start]) .resize-handle-bar{inline-size:100%;block-size:var(--calcite-size-fixed-sm-plus);border-block-start:var(--calcite-border-width-sm) solid var(--calcite-sheet-border-color, var(--calcite-color-border-3))}:host([position=block-start]):host([display-mode=float]) .resize-handle-bar{border-end-end-radius:.25rem;border-end-start-radius:.25rem}:host([position=block-end]) .resize-handle{block-size:var(--calcite-size-fixed-xxl);inline-size:100%;inset-block-start:var(--calcite-internal-sheet-resize-handle-offset)}:host([position=block-end]) .resize-handle-bar{inline-size:100%;block-size:var(--calcite-size-fixed-sm-plus);border-block-end:var(--calcite-border-width-sm) solid var(--calcite-sheet-border-color, var(--calcite-color-border-3))}:host([position=block-end]):host([display-mode=float]) .resize-handle-bar{border-start-start-radius:var(--calcite-sheet-corner-radius, var(--calcite-corner-radius-round));border-start-end-radius:var(--calcite-sheet-corner-radius, var(--calcite-corner-radius-round))}:host([position]) .container--embedded{pointer-events:auto;position:absolute;inline-size:100%;max-inline-size:100%;min-inline-size:100%;block-size:100%;max-block-size:100%;min-block-size:100%}:host([position]) .container--embedded calcite-scrim{position:absolute}:host([hidden]){display:none}[hidden]{display:none}`;
class N extends I {
  constructor() {
    super(), this.focusTrap = F({
      triggerProp: "open",
      focusTrapOptions: {
        // scrim closes on click, so we let it take over
        clickOutsideDeactivates: () => this.embedded,
        escapeDeactivates: (e) => (!e.defaultPrevented && !this.escapeDisabled && (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.usePreventDocumentScroll = U()(this), this.messages = L(), this.mutationObserver = R("mutation", () => this.handleMutationObserver()), this._open = !1, this.openProp = "opened", this.transitionProp = "opacity", this.focusSetter = K()(this), this.keyDownHandler = (e) => {
      const { defaultPrevented: t, key: a } = e;
      !t && !this.escapeDisabled && this.focusTrapDisabled && this.open && a === "Escape" && (e.preventDefault(), this.open = !1);
    }, this.resizeValues = {
      inlineSize: null,
      blockSize: null,
      minInlineSize: null,
      minBlockSize: null,
      maxInlineSize: null,
      maxBlockSize: null
    }, this.displayMode = "overlay", this.embedded = !1, this.escapeDisabled = !1, this.focusTrapDisabled = !1, this.heightScale = "m", this.opened = !1, this.outsideCloseDisabled = !1, this.position = "inline-start", this.resizable = !1, this.widthScale = "m", this.calciteSheetBeforeClose = z({ cancelable: !1 }), this.calciteSheetBeforeOpen = z({ cancelable: !1 }), this.calciteSheetClose = z({ cancelable: !1 }), this.calciteSheetOpen = z({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { resizeValues: 16, beforeClose: 0, displayMode: 3, embedded: 5, escapeDisabled: 7, focusTrapDisabled: 7, focusTrapOptions: 0, heightScale: 3, height: 3, label: 1, messageOverrides: 0, open: 7, opened: 7, outsideCloseDisabled: 7, position: 3, resizable: 7, widthScale: 3, width: 3 };
  }
  static {
    this.styles = j;
  }
  get preventDocumentScroll() {
    return !this.embedded;
  }
  get open() {
    return this._open;
  }
  set open(e) {
    const t = this._open;
    e !== t && this.setOpenState(e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  async updateFocusTrapElements(e) {
    this.focusTrap.setExtraContainers(e), this.focusTrap.updateContainerElements();
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setupInteractions();
  }
  willUpdate(e) {
    e.has("opened") && (this.hasUpdated || this.opened !== !1) && A(this), (e.has("open") && (this.hasUpdated || this.open !== !1) || e.has("position") && (this.hasUpdated || this.position !== "inline-start") || e.has("resizable") && (this.hasUpdated || this.resizable !== !1)) && this.setupInteractions();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.embedded = !1, this.cleanupInteractions();
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
    return e === "block-start" || e === "block-end" ? D.dragVertical : D.dragHorizontal;
  }
  getContentElDOMRect() {
    return this.contentEl.getBoundingClientRect();
  }
  handleKeyDown(e) {
    const { key: t, defaultPrevented: a, shiftKey: n } = e, { position: i, resizable: s, contentEl: b, el: c, resizeValues: { maxBlockSize: v, maxInlineSize: x, minBlockSize: f, minInlineSize: k } } = this, u = [...i === "block-end" || i === "block-start" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"], "Home", "End"];
    if (!s || !b || a || !u.includes(t))
      return;
    const l = this.getContentElDOMRect(), m = w(c) === "rtl" ? -1 : 1, o = n ? $ : T;
    switch (t) {
      case "ArrowUp":
        this.updateSize({
          size: l.height + (i === "block-end" ? o : -o),
          type: "blockSize"
        }), e.preventDefault();
        break;
      case "ArrowDown":
        this.updateSize({
          size: l.height + (i === "block-end" ? -o : o),
          type: "blockSize"
        }), e.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSize({
          size: l.width + (i === "inline-end" ? o : -o) * m,
          type: "inlineSize"
        }), e.preventDefault();
        break;
      case "ArrowRight":
        this.updateSize({
          size: l.width + (i === "inline-end" ? -o : o) * m,
          type: "inlineSize"
        }), e.preventDefault();
        break;
      case "Home":
        this.updateSize({
          size: i === "block-start" || i === "block-end" ? f : k,
          type: i === "block-start" || i === "block-end" ? "blockSize" : "inlineSize"
        }), e.preventDefault();
        break;
      case "End":
        this.updateSize({
          size: i === "block-start" || i === "block-end" ? v : x,
          type: i === "block-start" || i === "block-end" ? "blockSize" : "inlineSize"
        }), e.preventDefault();
        break;
    }
  }
  updateSize({ type: e, size: t }) {
    const { contentEl: a, resizeValues: n } = this;
    if (!a)
      return;
    const i = e === "blockSize" ? "minBlockSize" : "minInlineSize", s = e === "blockSize" ? "maxBlockSize" : "maxInlineSize", b = n[i] && n[s] ? P(t, n[i], n[s]) : t, c = Math.round(b);
    this.resizeValues = {
      ...n,
      [e]: c
    }, a.style[e] = t !== null ? `${c}px` : null;
  }
  cleanupInteractions() {
    this.interaction?.unset(), this.updateSize({ size: null, type: "inlineSize" }), this.updateSize({ size: null, type: "blockSize" });
  }
  async setupInteractions() {
    this.cleanupInteractions();
    const { el: e, contentEl: t, resizable: a, position: n, open: i, resizeHandleEl: s } = this;
    if (!t || !i || !a || !s)
      return;
    await this.el.componentOnReady();
    const { inlineSize: b, minInlineSize: c, blockSize: v, minBlockSize: x, maxInlineSize: f, maxBlockSize: k } = window.getComputedStyle(t), d = {
      inlineSize: p(b),
      blockSize: p(v),
      minInlineSize: p(c),
      minBlockSize: p(x),
      maxInlineSize: p(f) || window.innerWidth,
      maxBlockSize: p(k) || window.innerHeight
    };
    this.resizeValues = d;
    const u = w(e) === "rtl";
    this.interaction = y(t, { context: e.ownerDocument }).resizable({
      edges: {
        top: n === "block-end" ? s : !1,
        right: n === (u ? "inline-end" : "inline-start") ? s : !1,
        bottom: n === "block-start" ? s : !1,
        left: n === (u ? "inline-start" : "inline-end") ? s : !1
      },
      modifiers: [
        y.modifiers.restrictSize({
          min: {
            width: d.minInlineSize,
            height: d.minBlockSize
          },
          max: {
            width: d.maxInlineSize,
            height: d.maxBlockSize
          }
        })
      ],
      listeners: {
        move: ({ rect: l }) => {
          const m = n === "block-start" || n === "block-end";
          this.updateSize({
            size: m ? l.height : l.width,
            type: m ? "blockSize" : "inlineSize"
          });
        }
      }
    });
  }
  onBeforeOpen() {
    this.calciteSheetBeforeOpen.emit();
  }
  onOpen() {
    this.focusTrapDisabled && this.setFocus(), this.focusTrap.activate(), this.calciteSheetOpen.emit();
  }
  onBeforeClose() {
    this.calciteSheetBeforeClose.emit();
  }
  onClose() {
    this.calciteSheetClose.emit(), this.focusTrap.deactivate();
  }
  setResizeHandleEl(e) {
    this.resizeHandleEl = e, this.setupInteractions();
  }
  setContentEl(e) {
    this.contentEl = e, this.contentId = M(e);
  }
  setTransitionEl(e) {
    e && (this.transitionEl = e);
  }
  handleOutsideClose() {
    this.outsideCloseDisabled || (this.open = !1);
  }
  handleMutationObserver() {
    this.focusTrap.updateContainerElements();
  }
  render() {
    const { resizable: e, position: t, resizeValues: a } = this, n = w(this.el), i = t === "block-start" || t === "block-end";
    return O(this.el, "aria-describedby", this.contentId), this.el.ariaLabel = this.label, this.el.ariaModal = "true", this.el.role = "dialog", S`<div class=${h({
      [r.container]: !0,
      [r.containerOpen]: this.opened,
      [r.containerEmbedded]: this.embedded,
      [B.rtl]: n === "rtl",
      [C("width", this.width, this.widthScale)]: !!(this.width || this.widthScale),
      [C("height", this.height, this.heightScale)]: !!(this.height || this.heightScale)
    })} ${g(this.setTransitionEl)}><calcite-scrim class=${h(r.scrim)} @click=${this.handleOutsideClose}></calcite-scrim><div class=${h(r.content)} id=${_.sheetContent} ${g(this.setContentEl)}><div class=${h(r.contentContainer)}><slot></slot></div>${e ? V("resize-handle", S`<div .ariaLabel=${this.messages.resizeEnabled} .ariaOrientation=${i ? "vertical" : "horizontal"} .ariaValueMax=${i ? a.maxBlockSize : a.maxInlineSize} .ariaValueMin=${i ? a.minBlockSize : a.minInlineSize} .ariaValueNow=${i ? a.blockSize : a.inlineSize} class=${h(r.resizeHandle)} @keydown=${this.handleKeyDown} role=separator tabindex=0 touch-action=none ${g(this.setResizeHandleEl)}><div class=${h(r.resizeHandleBar)}><calcite-icon .icon=${this.getResizeIcon()} scale=s></calcite-icon></div></div>`) : null}</div></div>`;
  }
}
H("calcite-sheet", N);
export {
  N as Sheet
};
