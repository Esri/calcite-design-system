import { c as E, L as O, h as g, n as I, s as p, C as D, x as S, d as B } from "./iframe.js";
import { n as k } from "./ref.js";
import { i as T } from "./keyed.js";
import { i as y } from "./interact.min.js";
import { f as $, g as w, k as m, E as H } from "./dom.js";
import { c as M } from "./component.js";
import { c as R } from "./observers.js";
import { o as V } from "./openCloseComponent.js";
import { g as C } from "./dynamicClasses.js";
import { c as L } from "./math.js";
import { u as A } from "./useT9n.js";
import { u as P } from "./useFocusTrap.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
const l = {
  scrim: "scrim",
  container: "container",
  containerOpen: "container--open",
  content: "content",
  contentContainer: "content-container",
  containerEmbedded: "container--embedded",
  resizeHandle: "resize-handle",
  resizeHandleBar: "resize-handle-bar"
}, U = 10, F = 25, K = E`:host{position:absolute;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;visibility:hidden!important;--calcite-sheet-scrim-background-internal: rgba(0, 0, 0, .85);--calcite-scrim-shadow-block-start-internal: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-block-end-internal: 0 -4px 8px -1px rgba(0, 0, 0, .08), 0 -2px 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-inline-start-internal: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-inline-end-internal: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04)}.calcite--rtl{--calcite-scrim-shadow-inline-start-internal: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-scrim-shadow-inline-end-internal: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04)}.assistive-text{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.container{visibility:hidden;position:fixed;z-index:var(--calcite-z-index-overlay);box-sizing:border-box;display:flex;color:var(--calcite-color-text-2);opacity:0;transition:visibility 0ms linear var(--calcite-internal-animation-timing-medium),opacity var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88)}:host([position=inline-start]) .container{justify-content:flex-start;inset-block:0;inset-inline:0 auto;--calcite-sheet-hidden-position-internal: translate3d(-1rem, 0, 0)}:host([position=inline-end]) .container{justify-content:flex-end;inset-block:0;inset-inline:auto 0;--calcite-sheet-hidden-position-internal: translate3d(1rem, 0, 0)}:host([position=block-start]) .container{align-items:flex-start;inset-block:0 auto;inset-inline:0;--calcite-sheet-hidden-position-internal: translate3d(0, -1rem, 0)}:host([position=block-end]) .container{align-items:flex-end;inset-block:auto 0;inset-inline:0;--calcite-sheet-hidden-position-internal: translate3d(0, 1rem, 0)}:host([display-mode=float]) .content{--tw-shadow: 0 2px 12px -4px rgba(0, 0, 0, .2), 0 2px 4px -2px rgba(0, 0, 0, .16);--tw-shadow-colored: 0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}:host([display-mode=overlay][position=inline-start]) .container{box-shadow:var(--calcite-scrim-shadow-inline-start-internal)}:host([display-mode=overlay][position=inline-end]) .container{box-shadow:var(--calcite-scrim-shadow-inline-end-internal)}:host([display-mode=overlay][position=block-start]) .container{box-shadow:var(--calcite-scrim-shadow-block-start-internal)}:host([display-mode=overlay][position=block-end]) .container{box-shadow:var(--calcite-scrim-shadow-block-end-internal)}:host([position^=inline]) .content{inline-size:var(--calcite-sheet-width-internal);max-inline-size:var(--calcite-sheet-max-width-internal);min-inline-size:var(--calcite-sheet-min-width-internal)}:host([position^=block]) .content{block-size:var(--calcite-sheet-height-internal);max-block-size:var(--calcite-sheet-max-height-internal);min-block-size:var(--calcite-sheet-min-height-internal)}:host([position^=inline]) .width-s{--calcite-sheet-width-internal: var(--calcite-sheet-width, 15vw);--calcite-sheet-max-width-internal: var(--calcite-sheet-max-width, 360px);--calcite-sheet-min-width-internal: var(--calcite-sheet-min-width, 260px)}:host([position^=inline]) .width-m{--calcite-sheet-width-internal: var(--calcite-sheet-width, 25vw);--calcite-sheet-max-width-internal: var(--calcite-sheet-max-width, 420px);--calcite-sheet-min-width-internal: var(--calcite-sheet-min-width, 300px)}:host([position^=inline]) .width-l{--calcite-sheet-width-internal: var(--calcite-sheet-width, 45vw);--calcite-sheet-max-width-internal: var(--calcite-sheet-max-width, 680px);--calcite-sheet-min-width-internal: var(--calcite-sheet-min-width, 340px)}:host([position^=block]) .height-s{--calcite-sheet-min-height-internal: var(--calcite-sheet-min-height, 160px);--calcite-sheet-height-internal: var(--calcite-sheet-height, 30vh);--calcite-sheet-max-height-internal: var(--calcite-sheet-max-height, 30vh)}:host([position^=block]) .height-m{--calcite-sheet-min-height-internal: var(--calcite-sheet-min-height, 200px);--calcite-sheet-height-internal: var(--calcite-sheet-height, 45vh);--calcite-sheet-max-height-internal: var(--calcite-sheet-max-height, 50vh)}:host([position^=block]) .height-l{--calcite-sheet-min-height-internal: var(--calcite-sheet-min-height, 240px);--calcite-sheet-height-internal: var(--calcite-sheet-height, 60vh);--calcite-sheet-max-height-internal: var(--calcite-sheet-max-height, 70vh)}.scrim{--calcite-scrim-background: var(--calcite-sheet-scrim-background, var(--calcite-sheet-scrim-background-internal));position:fixed;inset:0;display:flex;overflow:hidden}:host([opened]){visibility:visible!important}.content{position:relative;z-index:var(--calcite-z-index-modal);box-sizing:border-box;display:flex;max-height:100%;max-width:100%;padding:0;background-color:var(--calcite-color-foreground-1);max-block-size:100%;visibility:hidden;transition:transform var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88),visibility 0ms linear var(--calcite-internal-animation-timing-medium),opacity var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88);transform:var(--calcite-sheet-hidden-position-internal)}.content-container{position:relative;display:flex;max-height:100%;max-width:100%;flex:1 1 0%;overflow:hidden}.container--open .content{transform:translateZ(0)}:host([display-mode=float]) .content,:host([display-mode=float]) .container,:host([display-mode=float]) .content-container{border-radius:.25rem}:host([display-mode=float]) .container{padding:.75rem}.container--open{visibility:visible;opacity:1;transition-delay:0ms}.container--open .content{pointer-events:auto;visibility:visible;opacity:1;transition:transform var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88),visibility 0ms linear,opacity var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88),max-inline-size var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88),max-block-size var(--calcite-internal-animation-timing-medium) cubic-bezier(.215,.44,.42,.88);transition-delay:0ms}:host([position=inline-start]) .content,:host([position=inline-end]) .content{height:100%}:host([position=inline-start]) .content{flex-direction:row}:host([position=inline-end]) .content{flex-direction:row-reverse}:host([position=block-start]) .content,:host([position=block-end]) .content{width:100%}:host([position=block-start]) .content{flex-direction:column}:host([position=block-end]) .content{flex-direction:column-reverse}:host([resizable][position=inline-start]) .content{padding-inline-end:var(--calcite-size-fixed-sm-plus)}:host([resizable][position=inline-end]) .content{padding-inline-start:var(--calcite-size-fixed-sm-plus)}:host([resizable][position=block-start]) .content{padding-block-end:var(--calcite-size-fixed-sm-plus)}:host([resizable][position=block-end]) .content{padding-block-start:var(--calcite-size-fixed-sm-plus)}.resize-handle{position:absolute;box-sizing:border-box;display:flex;-webkit-user-select:none;user-select:none;align-items:center;justify-content:center;outline:2px solid transparent;outline-offset:2px;--calcite-internal-sheet-resize-handle-offset: calc( (var(--calcite-size-fixed-xxl) - var(--calcite-size-fixed-sm-plus)) / 2 * -1 );z-index:var(--calcite-z-index-overlay)}.resize-handle:active .resize-handle-bar,.resize-handle:hover .resize-handle-bar{background-color:var(--calcite-color-foreground-3);color:var(--calcite-color-text-1)}.resize-handle-bar{pointer-events:none;display:flex;align-items:center;justify-content:center;background-color:var(--calcite-color-background);color:var(--calcite-color-border-input)}.resize-handle:focus .resize-handle-bar{outline-color:transparent;outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)))}:host([position=inline-start]) .resize-handle{inline-size:var(--calcite-size-fixed-xxl);right:var(--calcite-internal-sheet-resize-handle-offset);block-size:100%}:host([position=inline-start]) .resize-handle-bar{block-size:100%;inline-size:var(--calcite-size-fixed-sm-plus);border-inline-start:1px solid var(--calcite-color-border-3)}:host([position=inline-start]):host([display-mode=float]) .resize-handle-bar{border-start-end-radius:.25rem;border-end-end-radius:.25rem}:host([position=inline-end]) .resize-handle{inline-size:var(--calcite-size-fixed-xxl);left:var(--calcite-internal-sheet-resize-handle-offset);block-size:100%}:host([position=inline-end]) .resize-handle-bar{block-size:100%;inline-size:var(--calcite-size-fixed-sm-plus);border-inline-end:1px solid var(--calcite-color-border-3)}:host([position=inline-end]):host([display-mode=float]) .resize-handle-bar{border-start-start-radius:.25rem;border-end-start-radius:.25rem}:host([position=block-start]) .resize-handle{block-size:var(--calcite-size-fixed-xxl);inline-size:100%;inset-block-end:var(--calcite-internal-sheet-resize-handle-offset)}:host([position=block-start]) .resize-handle-bar{inline-size:100%;block-size:var(--calcite-size-fixed-sm-plus);border-block-start:1px solid var(--calcite-color-border-3)}:host([position=block-start]):host([display-mode=float]) .resize-handle-bar{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}:host([position=block-end]) .resize-handle{block-size:var(--calcite-size-fixed-xxl);inline-size:100%;inset-block-start:var(--calcite-internal-sheet-resize-handle-offset)}:host([position=block-end]) .resize-handle-bar{inline-size:100%;block-size:var(--calcite-size-fixed-sm-plus);border-block-end:1px solid var(--calcite-color-border-3)}:host([position=block-end]):host([display-mode=float]) .resize-handle-bar{border-top-left-radius:.25rem;border-top-right-radius:.25rem}:host([position]) .container--embedded{pointer-events:auto;position:absolute;inline-size:100%;max-inline-size:100%;min-inline-size:100%;block-size:100%;max-block-size:100%;min-block-size:100%}:host([position]) .container--embedded calcite-scrim{position:absolute}:host([hidden]){display:none}[hidden]{display:none}`;
class _ extends O {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.focusTrap = P({
      triggerProp: "open",
      focusTrapOptions: {
        // scrim closes on click, so we let it take over
        clickOutsideDeactivates: !1,
        escapeDeactivates: (e) => (!e.defaultPrevented && !this.escapeDisabled && (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.ignoreOpenChange = !1, this.messages = A(), this.mutationObserver = R("mutation", () => this.handleMutationObserver()), this._open = !1, this.openEnd = () => {
      this.setFocus(), this.el.removeEventListener("calciteSheetOpen", this.openEnd);
    }, this.openProp = "opened", this.transitionProp = "opacity", this.resizeValues = {
      inlineSize: 0,
      blockSize: 0,
      minInlineSize: 0,
      minBlockSize: 0,
      maxInlineSize: 0,
      maxBlockSize: 0
    }, this.displayMode = "overlay", this.embedded = !1, this.escapeDisabled = !1, this.focusTrapDisabled = !1, this.heightScale = "m", this.opened = !1, this.outsideCloseDisabled = !1, this.position = "inline-start", this.resizable = !1, this.widthScale = "m", this.calciteSheetBeforeClose = g({ cancelable: !1 }), this.calciteSheetBeforeOpen = g({ cancelable: !1 }), this.calciteSheetClose = g({ cancelable: !1 }), this.calciteSheetOpen = g({ cancelable: !1 }), this.keyDownHandler = (e) => {
      const { defaultPrevented: t, key: s } = e;
      !t && !this.escapeDisabled && this.focusTrapDisabled && this.open && s === "Escape" && (e.preventDefault(), this.open = !1);
    }, this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { resizeValues: 16, beforeClose: 0, displayMode: 3, embedded: 5, escapeDisabled: 7, focusTrapDisabled: 7, focusTrapOptions: 0, heightScale: 3, height: 3, label: 1, messageOverrides: 0, open: 7, opened: 7, outsideCloseDisabled: 7, position: 3, resizable: 7, widthScale: 3, width: 3 };
  }
  static {
    this.styles = K;
  }
  /** When `true`, displays and positions the component. */
  get open() {
    return this._open;
  }
  set open(e) {
    const t = this._open;
    e !== t && (this._open = e, this.toggleSheet(e));
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component's "close" button - the first focusable item. */
  async setFocus() {
    await M(this), $(this.el);
  }
  /**
   * Updates the element(s) that are included in the focus-trap of the component.
   *
   * @param extraContainers - Additional elements to include in the focus trap. This is useful for including elements that may have related parts rendered outside the main focus trapping element.
   */
  async updateFocusTrapElements(e) {
    this.focusTrap.setExtraContainers(e), this.focusTrap.updateContainerElements();
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setupInteractions();
  }
  load() {
    this.open && this.openSheet();
  }
  willUpdate(e) {
    e.has("opened") && (this.hasUpdated || this.opened !== !1) && V(this), (e.has("open") && (this.hasUpdated || this.open !== !1) || e.has("position") && (this.hasUpdated || this.position !== "inline-start") || e.has("resizable") && (this.hasUpdated || this.resizable !== !1)) && this.setupInteractions();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeOverflowHiddenClass(), this.mutationObserver?.disconnect(), this.embedded = !1, this.cleanupInteractions();
  }
  toggleSheet(e) {
    this.ignoreOpenChange || (e ? this.openSheet() : this.closeSheet());
  }
  getResizeIcon() {
    const { position: e } = this;
    return e === "block-start" || e === "block-end" ? "drag-resize-vertical" : "drag-resize-horizontal";
  }
  getContentElDOMRect() {
    return this.contentEl.getBoundingClientRect();
  }
  handleKeyDown(e) {
    const { key: t, defaultPrevented: s, shiftKey: n } = e, { position: i, resizable: a, contentEl: h, el: r, resizeValues: { maxBlockSize: z, maxInlineSize: u, minBlockSize: x, minInlineSize: f } } = this, v = [...i === "block-end" || i === "block-start" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"], "Home", "End"];
    if (!a || !h || s || !v.includes(t))
      return;
    const c = this.getContentElDOMRect(), b = w(r) === "rtl" ? -1 : 1, o = n ? F : U;
    switch (t) {
      case "ArrowUp":
        this.updateSize({
          size: c.height + (i === "block-end" ? o : -o),
          type: "blockSize"
        }), e.preventDefault();
        break;
      case "ArrowDown":
        this.updateSize({
          size: c.height + (i === "block-end" ? -o : o),
          type: "blockSize"
        }), e.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSize({
          size: c.width + (i === "inline-end" ? o : -o) * b,
          type: "inlineSize"
        }), e.preventDefault();
        break;
      case "ArrowRight":
        this.updateSize({
          size: c.width + (i === "inline-end" ? -o : o) * b,
          type: "inlineSize"
        }), e.preventDefault();
        break;
      case "Home":
        this.updateSize({
          size: i === "block-start" || i === "block-end" ? x : f,
          type: i === "block-start" || i === "block-end" ? "blockSize" : "inlineSize"
        });
        break;
      case "End":
        this.updateSize({
          size: i === "block-start" || i === "block-end" ? z : u,
          type: i === "block-start" || i === "block-end" ? "blockSize" : "inlineSize"
        });
        break;
    }
  }
  updateSize({ type: e, size: t }) {
    const { contentEl: s, resizeValues: n } = this;
    if (!s)
      return;
    const i = e === "blockSize" ? "minBlockSize" : "minInlineSize", a = e === "blockSize" ? "maxBlockSize" : "maxInlineSize", h = n[i] && n[a] ? L(t, n[i], n[a]) : t, r = Math.round(h);
    this.resizeValues = {
      ...n,
      [e]: r
    }, s.style[e] = t !== null ? `${r}px` : null;
  }
  cleanupInteractions() {
    this.interaction?.unset(), this.updateSize({ size: null, type: "inlineSize" }), this.updateSize({ size: null, type: "blockSize" });
  }
  setupInteractions() {
    this.cleanupInteractions();
    const { el: e, contentEl: t, resizable: s, position: n, open: i, resizeHandleEl: a } = this;
    if (!t || !i || !s || !a)
      return;
    const { inlineSize: h, minInlineSize: r, blockSize: z, minBlockSize: u, maxInlineSize: x, maxBlockSize: f } = window.getComputedStyle(t), d = {
      inlineSize: m(h) ? parseInt(h) : 0,
      blockSize: m(z) ? parseInt(z) : 0,
      minInlineSize: m(r) ? parseInt(r) : 0,
      minBlockSize: m(u) ? parseInt(u) : 0,
      maxInlineSize: m(x) ? parseInt(x) : window.innerWidth,
      maxBlockSize: m(f) ? parseInt(f) : window.innerHeight
    };
    this.resizeValues = d;
    const v = w(e) === "rtl";
    this.interaction = y(t, { context: e.ownerDocument }).resizable({
      edges: {
        top: n === "block-end" ? a : !1,
        right: n === (v ? "inline-end" : "inline-start") ? a : !1,
        bottom: n === "block-start" ? a : !1,
        left: n === (v ? "inline-start" : "inline-end") ? a : !1
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
        move: ({ rect: c }) => {
          const b = n === "block-start" || n === "block-end";
          this.updateSize({
            size: b ? c.height : c.width,
            type: b ? "blockSize" : "inlineSize"
          });
        }
      }
    });
  }
  onBeforeOpen() {
    this.calciteSheetBeforeOpen.emit();
  }
  onOpen() {
    this.calciteSheetOpen.emit(), this.focusTrap.activate();
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
    this.contentEl = e, this.contentId = H(e);
  }
  setTransitionEl(e) {
    e && (this.transitionEl = e);
  }
  async openSheet() {
    await this.componentOnReady(), this.el.addEventListener("calciteSheetOpen", this.openEnd), this.opened = !0, this.embedded || (this.initialOverflowCSS = document.documentElement.style.overflow, document.documentElement.style.setProperty("overflow", "hidden"));
  }
  handleOutsideClose() {
    this.outsideCloseDisabled || (this.open = !1);
  }
  async closeSheet() {
    if (this.beforeClose)
      try {
        await this.beforeClose(this.el);
      } catch {
        requestAnimationFrame(() => {
          this.ignoreOpenChange = !0, this.open = !0, this.ignoreOpenChange = !1;
        });
        return;
      }
    this.opened = !1, this.removeOverflowHiddenClass();
  }
  removeOverflowHiddenClass() {
    document.documentElement.style.setProperty("overflow", this.initialOverflowCSS);
  }
  handleMutationObserver() {
    this.focusTrap.updateContainerElements();
  }
  // #endregion
  // #region Rendering
  render() {
    const { resizable: e, position: t, resizeValues: s } = this, n = w(this.el), i = t === "block-start" || t === "block-end";
    return I(this.el, "aria-describedby", this.contentId), this.el.ariaLabel = this.label, this.el.ariaModal = "true", this.el.role = "dialog", S`<div class=${p({
      [l.container]: !0,
      [l.containerOpen]: this.opened,
      [l.containerEmbedded]: this.embedded,
      [D.rtl]: n === "rtl",
      [C("width", this.width, this.widthScale)]: !!(this.width || this.widthScale),
      [C("height", this.height, this.heightScale)]: !!(this.height || this.heightScale)
    })} ${k(this.setTransitionEl)}><calcite-scrim class=${p(l.scrim)} @click=${this.handleOutsideClose}></calcite-scrim><div class=${p(l.content)} ${k(this.setContentEl)}><div class=${p(l.contentContainer)}><slot></slot></div>${e ? T("resize-handle", S`<div .ariaLabel=${this.messages.resizeEnabled} .ariaOrientation=${i ? "vertical" : "horizontal"} .ariaValueMax=${i ? s.maxBlockSize : s.maxInlineSize} .ariaValueMin=${i ? s.minBlockSize : s.minInlineSize} .ariaValueNow=${i ? s.blockSize : s.inlineSize} class=${p(l.resizeHandle)} @keydown=${this.handleKeyDown} role=separator tabindex=0 touch-action=none ${k(this.setResizeHandleEl)}><div class=${p(l.resizeHandleBar)}><calcite-icon .icon=${this.getResizeIcon()} scale=s></calcite-icon></div></div>`) : null}</div></div>`;
  }
}
B("calcite-sheet", _);
export {
  _ as Sheet
};
