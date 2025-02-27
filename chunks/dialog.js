import { h as O, L as E, k as u, s as b, x, j as T } from "./iframe.js";
import { i as S } from "./keyed.js";
import { i as v } from "./interact.min.js";
import { e as P, n as k } from "./ref.js";
import { f as I, h as z } from "./dom.js";
import { c as M } from "./component.js";
import { c as A } from "./observers.js";
import { g as B } from "./dynamicClasses.js";
import { o as L } from "./openCloseComponent.js";
import { S as c } from "./resources6.js";
import { u as R } from "./useT9n.js";
import { u as U } from "./useFocusTrap.js";
import { i as D, a as $, C as p, b as m, c as w, S as o } from "./resources7.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.20 */
const j = O`:host{--calcite-dialog-scrim-background-color: rgba(0, 0, 0, .85);pointer-events:none;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;--calcite-internal-dialog-animation-offset: 20px}:host([modal]){position:absolute}.container{pointer-events:auto;position:fixed;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;align-items:center;justify-content:center;overflow:hidden;color:var(--calcite-color-text-2);opacity:0;visibility:hidden;transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}:host([placement=top]) .container{align-items:flex-start;justify-content:center}:host([placement=top-start]) .container{align-items:flex-start;justify-content:flex-start}:host([placement=top-end]) .container{align-items:flex-start;justify-content:flex-end}:host([placement=bottom]) .container{align-items:flex-end;justify-content:center}:host([placement=bottom-start]) .container{align-items:flex-end;justify-content:flex-start}:host([placement=bottom-end]) .container{align-items:flex-end;justify-content:flex-end}:host(:not([modal])) .container{pointer-events:none}:host([scale=s]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-sm));--calcite-internal-dialog-min-size-x: 198px;--calcite-internal-dialog-min-size-y: 140px}:host([scale=m]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-md));--calcite-internal-dialog-min-size-x: 288px;--calcite-internal-dialog-min-size-y: 180px}:host([scale=l]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-md-plus));--calcite-internal-dialog-min-size-x: 388px;--calcite-internal-dialog-min-size-y: 220px}.scrim{--calcite-scrim-background: var(--calcite-dialog-scrim-background-color, var(--calcite-color-transparent-scrim));--calcite-scrim-background-color: var( --calcite-dialog-scrim-background-color, var(--calcite-color-transparent-scrim) );position:fixed;inset:0;display:flex;overflow-y:hidden}calcite-panel{--calcite-panel-content-space: var(--calcite-dialog-content-space, var(--calcite-internal-dialog-content-padding));--calcite-panel-footer-space: var(--calcite-dialog-footer-space);--calcite-panel-border-color: var(--calcite-dialog-border-color);--calcite-panel-background-color: var(--calcite-dialog-background-color, var(--calcite-color-foreground-1))}::slotted(*){--calcite-panel-background-color: initial}.dialog{pointer-events:none;position:relative;z-index:var(--calcite-z-index-modal);margin:1.5rem;box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;border-radius:.25rem;opacity:0;--tw-shadow: 0 2px 12px -4px rgba(0, 0, 0, .2), 0 2px 4px -2px rgba(0, 0, 0, .16);--tw-shadow-colored: 0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);-webkit-overflow-scrolling:touch;visibility:hidden;transition:inset-block var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);min-inline-size:var(--calcite-dialog-min-size-x, var(--calcite-internal-dialog-min-size-x));max-inline-size:var(--calcite-dialog-max-size-x, 100%);min-block-size:var(--calcite-dialog-min-size-y, var(--calcite-internal-dialog-min-size-y));max-block-size:var(--calcite-dialog-max-size-y, 100%);--calcite-internal-dialog-hidden-position: calc( var(--calcite-dialog-offset-y, 0px) + var(--calcite-internal-dialog-animation-offset) );--calcite-internal-dialog-shown-position: var(--calcite-dialog-offset-y, 0);inset-inline-start:var(--calcite-dialog-offset-x, 0);inset-block-start:var(--calcite-internal-dialog-hidden-position)}.dialog--opening-active{inset-block-start:var(--calcite-internal-dialog-shown-position)}:host([menu-open]) .dialog{transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}.panel{border-radius:.25rem}.container--open{opacity:1;visibility:visible;transition-delay:0ms}.container--open .dialog{pointer-events:auto;visibility:visible;opacity:1;transition:inset-block var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);transition-delay:0ms}.width-s{inline-size:auto;inline-size:var(--calcite-dialog-size-x, 32rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width: 35rem){.width-s{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}.width-s.dialog--opening-active{inset-block-start:0}}.width-m{inline-size:var(--calcite-dialog-size-x, 48rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width: 51rem){.width-m{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}.width-m.dialog--opening-active{inset-block-start:0}}.width-l{inline-size:var(--calcite-dialog-size-x, 94rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width: 97rem){.width-l{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}.width-l.dialog--opening-active{inset-block-start:0}}:host([placement=cover]) .dialog{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;border-radius:0}:host([placement=cover]) .panel{border-radius:0}:host([kind]) .panel{border-start-start-radius:0px;border-start-end-radius:0px}:host([kind=brand]) .dialog{border-color:var(--calcite-color-brand)}:host([kind=danger]) .dialog{border-color:var(--calcite-color-status-danger)}:host([kind=info]) .dialog{border-color:var(--calcite-color-status-info)}:host([kind=success]) .dialog{border-color:var(--calcite-color-status-success)}:host([kind=warning]) .dialog{border-color:var(--calcite-color-status-warning)}:host([kind=brand][open]) .dialog,:host([kind=danger][open]) .dialog,:host([kind=info][open]) .dialog,:host([kind=success][open]) .dialog,:host([kind=warning][open]) .dialog{border-width:0px;border-block-start-width:4px;border-style:solid}.container--embedded{position:absolute;pointer-events:auto}.container--embedded calcite-scrim{position:absolute}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}`;
let y = 0, C = "";
class F extends E {
  constructor() {
    super(...arguments), this.dragPosition = { ...D }, this.focusTrap = U({
      triggerProp: "open",
      focusTrapOptions: {
        // scrim closes on click, so we let it take over
        clickOutsideDeactivates: () => !this.modal,
        escapeDeactivates: (e) => (!e.defaultPrevented && !this.escapeDisabled && (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.ignoreOpenChange = !1, this.mutationObserver = A("mutation", () => this.handleMutationObserver()), this._open = !1, this.openEnd = () => {
      this.setFocus(), this.el.removeEventListener("calciteDialogOpen", this.openEnd);
    }, this.openProp = "opened", this.transitionProp = "opacity", this.panelEl = P(), this.resizePosition = { ...$ }, this.assistiveText = null, this.hasContentBottom = !1, this.hasContentTop = !1, this.hasFooter = !0, this.opened = !1, this.closeDisabled = !1, this.dragEnabled = !1, this.embedded = !1, this.escapeDisabled = !1, this.loading = !1, this.menuOpen = !1, this.messages = R(), this.modal = !1, this.focusTrapDisabled = !1, this.outsideCloseDisabled = !1, this.overlayPositioning = "absolute", this.placement = "center", this.resizable = !1, this.scale = "m", this.widthScale = "m", this.calciteDialogBeforeClose = u({ cancelable: !1 }), this.calciteDialogBeforeOpen = u({ cancelable: !1 }), this.calciteDialogClose = u({ cancelable: !1 }), this.calciteDialogOpen = u({ cancelable: !1 }), this.calciteDialogScroll = u({ cancelable: !1 });
  }
  static {
    this.properties = { assistiveText: 16, hasContentBottom: 16, hasContentTop: 16, hasFooter: 16, opened: 16, beforeClose: 0, closeDisabled: 7, description: 1, dragEnabled: 7, embedded: 5, escapeDisabled: 7, focusTrapOptions: 0, heading: 1, headingLevel: 11, kind: 3, loading: 7, menuOpen: 7, messageOverrides: 0, modal: 7, focusTrapDisabled: 7, open: 7, outsideCloseDisabled: 7, overlayPositioning: 3, placement: 3, resizable: 7, scale: 3, widthScale: 3, width: 3 };
  }
  static {
    this.styles = j;
  }
  /** When `true`, displays and positions the component. */
  get open() {
    return this._open;
  }
  set open(e) {
    const t = this._open;
    e !== t && (this._open = e, this.toggleDialog(e));
  }
  // #endregion
  // #region Public Methods
  /**
   * Scrolls the component's content to a specified set of coordinates.
   *
   * @example
   * myCalciteFlowItem.scrollContentTo({
   *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   * });
   * @param options - allows specific coordinates to be defined.
   * @returns - promise that resolves once the content is scrolled to.
   */
  async scrollContentTo(e) {
    await this.panelEl.value?.scrollContentTo(e);
  }
  /**
   * Sets focus on the component's "close" button (the first focusable item).
   *
   * @returns {Promise<void>} - A promise that is resolved when the operation has completed.
   */
  async setFocus() {
    return await M(this), this.panelEl.value?.setFocus() ?? I(this.el);
  }
  /**
   * Updates the element(s) that are included in the focus-trap of the component.
   *
   * @param extraContainers - Additional elements to include in the focus trap. This is useful for including elements that may have related parts rendered outside the main focus trapping element.
   */
  async updateFocusTrapElements(e) {
    this.focusTrap.setExtraContainers(e), this.focusTrap.updateContainerElements();
  }
  /** When defined, provides a condition to disable focus trapping. When `true`, prevents focus trapping. */
  focusTrapDisabledOverride() {
    return !this.modal && this.focusTrapDisabled;
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setupInteractions();
  }
  willUpdate(e) {
    e.has("modal") && (this.hasUpdated || this.modal !== !1) && this.updateOverflowHiddenClass(), (e.has("open") && (this.hasUpdated || this.open !== !1) || e.has("placement") && (this.hasUpdated || this.placement !== "center") || e.has("resizable") && (this.hasUpdated || this.resizable !== !1) || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1)) && this.setupInteractions(), (e.has("messages") || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1) || e.has("resizable") && (this.hasUpdated || this.resizable !== !1)) && this.updateAssistiveText(), e.has("opened") && (this.hasUpdated || this.opened !== !1) && this.handleOpenedChange(this.opened);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeOverflowHiddenClass(), this.mutationObserver?.disconnect(), this.embedded = !1, this.cleanupInteractions();
  }
  // #endregion
  // #region Private Methods
  updateAssistiveText() {
    const { messages: e } = this;
    this.assistiveText = e && (this.dragEnabled || this.resizable) ? `${this.dragEnabled ? e.dragEnabled : ""} ${this.resizable ? e.resizeEnabled : ""}` : null;
  }
  onBeforeOpen() {
    this.calciteDialogBeforeOpen.emit();
  }
  onOpen() {
    this.calciteDialogOpen.emit(), this.focusTrap.activate();
  }
  onBeforeClose() {
    this.calciteDialogBeforeClose.emit();
  }
  onClose() {
    this.calciteDialogClose.emit(), this.focusTrap.deactivate();
  }
  toggleDialog(e) {
    this.ignoreOpenChange || (e ? this.openDialog() : this.closeDialog());
  }
  handleOpenedChange(e) {
    const { transitionEl: t } = this;
    t && (t.classList.toggle(p.openingActive, e), L(this));
  }
  async triggerInteractModifiers() {
    const { interaction: e } = this;
    e && (await e.reflow({
      name: "drag"
    }), await e.reflow({
      name: "resize"
    }));
  }
  getTransitionElDOMRect() {
    return this.transitionEl.getBoundingClientRect();
  }
  handleKeyDown(e) {
    const { key: t, shiftKey: i, defaultPrevented: a } = e, { dragEnabled: n, resizable: l, resizePosition: r, dragPosition: s, transitionEl: d } = this;
    if (!(a || !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(t)))
      switch (t) {
        case "ArrowUp":
          i && l && d ? (this.updateSize({
            size: this.getTransitionElDOMRect().height - m,
            type: "blockSize"
          }), r.bottom -= m, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault()) : n && (s.y -= w, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowDown":
          i && l && d ? (this.updateSize({
            size: this.getTransitionElDOMRect().height + m,
            type: "blockSize"
          }), r.bottom += m, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault()) : n && (s.y += w, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowLeft":
          i && l && d ? (this.updateSize({
            size: this.getTransitionElDOMRect().width - m,
            type: "inlineSize"
          }), r.right -= m, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault()) : n && (s.x -= w, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowRight":
          i && l && d ? (this.updateSize({
            size: this.getTransitionElDOMRect().width + m,
            type: "inlineSize"
          }), r.right += m, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault()) : n && (s.x += w, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
      }
  }
  updateTransform() {
    const { dragPosition: { x: e, y: t }, resizePosition: i, transitionEl: a, dragEnabled: n, resizable: l } = this;
    if (!a)
      return;
    if (!n && !l) {
      a.style.transform = null;
      return;
    }
    const { top: r, right: s, bottom: d, left: g } = this.getAdjustedResizePosition(i), f = Math.round(e + g + s), h = Math.round(t + r + d);
    a.style.transform = f || h ? `translate(${f}px, ${h}px)` : null;
  }
  updateSize({ type: e, size: t }) {
    const { transitionEl: i } = this;
    i && (i.style[e] = t !== null ? `${Math.round(t)}px` : null);
  }
  cleanupInteractions() {
    this.interaction?.unset(), this.updateSize({ size: null, type: "inlineSize" }), this.updateSize({ size: null, type: "blockSize" }), this.dragPosition = { ...D }, this.resizePosition = { ...$ }, this.updateTransform();
  }
  setupInteractions() {
    this.cleanupInteractions();
    const { el: e, transitionEl: t, resizable: i, dragEnabled: a, resizePosition: n, dragPosition: l } = this;
    if (!(!t || !this.open)) {
      if ((i || a) && (this.interaction = v(t, { context: e.ownerDocument })), i) {
        const { minInlineSize: r, minBlockSize: s, maxInlineSize: d, maxBlockSize: g } = window.getComputedStyle(t);
        this.interaction.resizable({
          edges: {
            top: !0,
            right: !0,
            bottom: !0,
            left: !0
          },
          modifiers: [
            v.modifiers.restrictSize({
              min: {
                width: z(r) ? parseInt(r) : 0,
                height: z(s) ? parseInt(s) : 0
              },
              max: {
                width: z(d) ? parseInt(d) : window.innerWidth,
                height: z(g) ? parseInt(g) : window.innerHeight
              }
            }),
            v.modifiers.restrict({
              restriction: "parent"
            })
          ],
          listeners: {
            move: ({ rect: f, deltaRect: h }) => {
              h && (n.top += h.top, n.right += h.right, n.bottom += h.bottom, n.left += h.left), this.updateSize({ size: f.width, type: "inlineSize" }), this.updateSize({ size: f.height, type: "blockSize" }), this.updateTransform();
            }
          }
        });
      }
      a && this.interaction.draggable({
        modifiers: [
          v.modifiers.restrictRect({
            restriction: "parent"
          })
        ],
        listeners: {
          move: ({ dx: r, dy: s }) => {
            l.x += r, l.y += s, this.updateTransform();
          }
        }
      });
    }
  }
  getAdjustedResizePosition({ top: e, right: t, bottom: i, left: a }) {
    const n = e / 2, l = t / 2, r = i / 2, s = a / 2;
    switch (this.placement) {
      case "top":
        return { top: e, right: l, bottom: 0, left: s };
      case "top-start":
        return { top: e, right: 0, bottom: 0, left: a };
      case "top-end":
        return { top: e, right: t, bottom: 0, left: 0 };
      case "bottom":
        return { top: 0, right: l, bottom: i, left: s };
      case "bottom-start":
        return { top: 0, right: 0, bottom: i, left: a };
      case "bottom-end":
        return { top: 0, right: t, bottom: i, left: 0 };
      case "cover":
      case "center":
      default:
        return {
          top: n,
          right: l,
          bottom: r,
          left: s
        };
    }
  }
  setTransitionEl(e) {
    e && (this.transitionEl = e, this.setupInteractions());
  }
  handleInternalPanelScroll(e) {
    e.target === this.panelEl.value && (e.stopPropagation(), this.calciteDialogScroll.emit());
  }
  handleInternalPanelCloseClick(e) {
    e.target === this.panelEl.value && (e.stopPropagation(), this.open = !1);
  }
  handlePanelKeyDown(e) {
    this.escapeDisabled && e.key === "Escape" && e.preventDefault();
  }
  async openDialog() {
    await this.componentOnReady(), this.el.addEventListener("calciteDialogOpen", this.openEnd), this.opened = !0, this.updateOverflowHiddenClass();
  }
  handleOutsideClose() {
    this.outsideCloseDisabled || (this.open = !1);
  }
  async closeDialog() {
    if (this.beforeClose)
      try {
        await this.beforeClose();
      } catch {
        requestAnimationFrame(() => {
          this.ignoreOpenChange = !0, this.open = !0, this.ignoreOpenChange = !1;
        });
        return;
      }
    y--, this.opened = !1, this.updateOverflowHiddenClass();
  }
  updateOverflowHiddenClass() {
    this.opened && !this.embedded && this.modal ? this.addOverflowHiddenClass() : this.removeOverflowHiddenClass();
  }
  addOverflowHiddenClass() {
    y === 0 && (C = document.documentElement.style.overflow), y++, document.documentElement.style.setProperty("overflow", "hidden");
  }
  removeOverflowHiddenClass() {
    document.documentElement.style.setProperty("overflow", C);
  }
  handleMutationObserver() {
    this.focusTrap.updateContainerElements();
  }
  // #endregion
  // #region Rendering
  render() {
    const { assistiveText: e, description: t, heading: i, opened: a } = this;
    return x`<div class=${b({
      [p.container]: !0,
      [p.containerOpen]: a,
      [p.containerEmbedded]: this.embedded
    })}>${this.modal ? x`<calcite-scrim class=${b(p.scrim)} @click=${this.handleOutsideClose}></calcite-scrim>` : null}<div .ariaDescription=${t} .ariaLabel=${i} .ariaModal=${this.modal} class=${b({
      [p.dialog]: !0,
      [B("width", this.width, this.widthScale)]: !!(this.width || this.widthScale)
    })} @keydown=${this.handleKeyDown} role=dialog ${k(this.setTransitionEl)}>${e ? S("assistive-text", x`<div aria-live=polite class=${b(p.assistiveText)}>${e}</div>`) : null}<slot name=${o.customContent}><slot name=${o.content}><calcite-panel .beforeClose=${this.beforeClose} class=${b(p.panel)} .closable=${!this.closeDisabled} .closed=${!a} .description=${t} .heading=${i} .headingLevel=${this.headingLevel} .loading=${this.loading} .menuOpen=${this.menuOpen} .messageOverrides=${this.messageOverrides} @keydown=${this.handlePanelKeyDown} @calcitePanelClose=${this.handleInternalPanelCloseClick} @calcitePanelScroll=${this.handleInternalPanelScroll} .overlayPositioning=${this.overlayPositioning} .scale=${this.scale} ${k(this.panelEl)}><slot name=${o.actionBar} slot=${c.actionBar}></slot><slot name=${o.alerts} slot=${c.alerts}></slot><slot name=${o.headerActionsStart} slot=${c.headerActionsStart}></slot><slot name=${o.headerActionsEnd} slot=${c.headerActionsEnd}></slot><slot name=${o.headerContent} slot=${c.headerContent}></slot><slot name=${o.headerMenuActions} slot=${c.headerMenuActions}></slot><slot name=${o.fab} slot=${c.fab}></slot><slot name=${o.contentTop} slot=${c.contentTop}></slot><slot name=${o.contentBottom} slot=${c.contentBottom}></slot><slot name=${o.footerStart} slot=${c.footerStart}></slot><slot name=${o.footer} slot=${c.footer}></slot><slot name=${o.footerEnd} slot=${c.footerEnd}></slot><slot></slot></calcite-panel></slot></slot></div></div>`;
  }
}
T("calcite-dialog", F);
export {
  F as Dialog
};
