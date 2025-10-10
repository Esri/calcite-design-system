import { b as S, L as D, c as b, y as d, s as v, x as w, q as T } from "./index.js";
import { i as C } from "./keyed.js";
import { i as x } from "./interact.min.js";
import { e as E, n as y } from "./ref.js";
import { k as u } from "./dom.js";
import { c as O } from "./observers.js";
import { g as P } from "./dynamicClasses.js";
import { t as I } from "./openCloseComponent.js";
import { S as h } from "./resources7.js";
import { u as M } from "./useT9n.js";
import { u as R } from "./useFocusTrap.js";
import { u as A } from "./usePreventDocumentScroll.js";
import { u as B } from "./useSetFocus.js";
import { i as k, a as $, C as m, S as l } from "./resources8.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const L = S`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{--calcite-dialog-scrim-background-color: rgba(0, 0, 0, .85);pointer-events:none;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;--calcite-internal-dialog-animation-offset: 20px}:host([modal]){position:absolute}.container{pointer-events:auto;position:fixed;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;align-items:center;justify-content:center;overflow:hidden;color:var(--calcite-color-text-2);opacity:0;visibility:hidden;transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}:host([placement=top]) .container{align-items:flex-start;justify-content:center}:host([placement=top-start]) .container{align-items:flex-start;justify-content:flex-start}:host([placement=top-end]) .container{align-items:flex-start;justify-content:flex-end}:host([placement=bottom]) .container{align-items:flex-end;justify-content:center}:host([placement=bottom-start]) .container{align-items:flex-end;justify-content:flex-start}:host([placement=bottom-end]) .container{align-items:flex-end;justify-content:flex-end}:host(:not([modal])) .container{pointer-events:none}:host([scale=s]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-sm));--calcite-internal-dialog-min-size-x: 198px;--calcite-internal-dialog-min-size-y: 140px}:host([scale=m]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-md));--calcite-internal-dialog-min-size-x: 288px;--calcite-internal-dialog-min-size-y: 180px}:host([scale=l]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-md-plus));--calcite-internal-dialog-min-size-x: 388px;--calcite-internal-dialog-min-size-y: 220px}.scrim{--calcite-scrim-background: var(--calcite-dialog-scrim-background-color, var(--calcite-color-transparent-scrim));--calcite-scrim-background-color: var( --calcite-dialog-scrim-background-color, var(--calcite-color-transparent-scrim) );position:fixed;inset:0;display:flex;overflow-y:hidden}calcite-panel{--calcite-panel-content-space: var(--calcite-dialog-content-space, var(--calcite-internal-dialog-content-padding));--calcite-panel-footer-space: var(--calcite-dialog-footer-space);--calcite-panel-border-color: var(--calcite-dialog-border-color);--calcite-panel-background-color: var(--calcite-dialog-background-color, var(--calcite-color-foreground-1));--calcite-panel-icon-color: var(--calcite-dialog-icon-color);--calcite-panel-heading-text-color: var(--calcite-dialog-heading-text-color);--calcite-panel-description-text-color: var(--calcite-dialog-description-text-color);--calcite-panel-header-background-color: var(--calcite-dialog-header-background-color);--calcite-panel-header-action-background-color: var(--calcite-dialog-header-action-background-color);--calcite-panel-header-action-background-color-hover: var(--calcite-dialog-header-action-background-color-hover);--calcite-panel-header-action-background-color-press: var(--calcite-dialog-header-action-background-color-press);--calcite-panel-header-action-text-color: var(--calcite-dialog-header-action-text-color);--calcite-panel-header-action-text-color-press: var(--calcite-dialog-header-action-text-color-press);--calcite-panel-footer-background-color: var(--calcite-dialog-footer-background-color);--calcite-panel-space: var(--calcite-dialog-space, var(--calcite-internal-dialog-content-padding));--calcite-panel-header-content-space: var(--calcite-dialog-header-content-space, var(--calcite-dialog-content-space));--calcite-popover-border-color: var(--calcite-dialog-action-menu-border-color, var(--calcite-color-border-1));--calcite-panel-corner-radius: var(--calcite-dialog-corner-radius)}:host([kind=brand]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-brand))}:host([kind=danger]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-danger))}:host([kind=info]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-info))}:host([kind=success]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-success))}:host([kind=warning]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-warning))}::slotted(*){--calcite-panel-background-color: initial}.dialog{pointer-events:none;position:relative;z-index:var(--calcite-z-index-modal);margin:1.5rem;box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;opacity:0;--tw-shadow: 0 2px 12px -4px rgba(0, 0, 0, .2), 0 2px 4px -2px rgba(0, 0, 0, .16);--tw-shadow-colored: 0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);-webkit-overflow-scrolling:touch;visibility:hidden;transition:inset-block var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);border-radius:var(--calcite-dialog-corner-radius, var(--calcite-corner-radius-sm));min-inline-size:var(--calcite-dialog-min-size-x, var(--calcite-internal-dialog-min-size-x));max-inline-size:var(--calcite-dialog-max-size-x, 100%);min-block-size:var(--calcite-dialog-min-size-y, var(--calcite-internal-dialog-min-size-y));max-block-size:var(--calcite-dialog-max-size-y, 100%);--calcite-internal-dialog-hidden-position: calc( var(--calcite-dialog-offset-y, 0px) + var(--calcite-internal-dialog-animation-offset) );--calcite-internal-dialog-shown-position: var(--calcite-dialog-offset-y, 0);inset-inline-start:var(--calcite-dialog-offset-x, 0);inset-block-start:var(--calcite-internal-dialog-hidden-position)}.dialog--opening-active{inset-block-start:var(--calcite-internal-dialog-shown-position)}:host([menu-open]) .dialog{transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}.panel{visibility:hidden;opacity:0;border-radius:var(--calcite-dialog-corner-radius, var(--calcite-corner-radius-sm));transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}.container--open .panel{visibility:visible;opacity:1;transition:visibility 0ms linear,opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}.container--open{opacity:1;visibility:visible;transition-delay:0ms}.container--open .dialog{pointer-events:auto;visibility:visible;opacity:1;transition:inset-block var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);transition-delay:0ms}.width-s{inline-size:auto;inline-size:var(--calcite-dialog-size-x, 32rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width: 35rem){.width-s{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}.width-s.dialog--opening-active{inset-block-start:0}}.width-m{inline-size:var(--calcite-dialog-size-x, 48rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width: 51rem){.width-m{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}.width-m.dialog--opening-active{inset-block-start:0}}.width-l{inline-size:var(--calcite-dialog-size-x, 94rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width: 97rem){.width-l{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}.width-l.dialog--opening-active{inset-block-start:0}}:host([placement=cover]) .dialog{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;border-radius:0}:host([placement=cover]) .panel{border-radius:0}:host([kind]) .panel{border-start-start-radius:0px;border-start-end-radius:0px}:host([kind]) .dialog{overflow:hidden}:host([kind=brand]) .dialog{border-color:var(--calcite-color-brand)}:host([kind=danger]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-danger))}:host([kind=info]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-info))}:host([kind=success]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-success))}:host([kind=warning]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-warning))}:host([kind=brand][open]) .dialog,:host([kind=danger][open]) .dialog,:host([kind=info][open]) .dialog,:host([kind=success][open]) .dialog,:host([kind=warning][open]) .dialog{border-width:0px;border-block-start-width:4px;border-style:solid}.container--embedded{position:absolute;pointer-events:auto}.container--embedded calcite-scrim{position:absolute}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}`;
class F extends D {
  constructor() {
    super(...arguments), this.dragPosition = { ...k }, this.focusTrap = R({
      triggerProp: "open",
      focusTrapOptions: {
        // scrim closes on click, so we let it take over
        clickOutsideDeactivates: () => !this.modal || this.embedded,
        escapeDeactivates: (e) => (!e.defaultPrevented && !this.escapeDisabled && (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.usePreventDocumentScroll = A()(this), this.mutationObserver = O("mutation", () => this.handleMutationObserver()), this._open = !1, this.openProp = "opened", this.transitionProp = "opacity", this.panelRef = E(), this.resizePosition = { ...$ }, this.messages = M(), this.focusSetter = B()(this), this.assistiveText = null, this.hasContentBottom = !1, this.hasContentTop = !1, this.hasFooter = !0, this.opened = !1, this.closeDisabled = !1, this.dragEnabled = !1, this.embedded = !1, this.escapeDisabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.menuOpen = !1, this.modal = !1, this.focusTrapDisabled = !1, this.outsideCloseDisabled = !1, this.overlayPositioning = "absolute", this.placement = "center", this.resizable = !1, this.scale = "m", this.widthScale = "m", this.calciteDialogBeforeClose = b({ cancelable: !1 }), this.calciteDialogBeforeOpen = b({ cancelable: !1 }), this.calciteDialogClose = b({ cancelable: !1 }), this.calciteDialogOpen = b({ cancelable: !1 }), this.calciteDialogScroll = b({ cancelable: !1 });
  }
  static {
    this.properties = { assistiveText: 16, hasContentBottom: 16, hasContentTop: 16, hasFooter: 16, opened: 16, beforeClose: 0, closeDisabled: 7, description: 1, dragEnabled: 7, embedded: 5, escapeDisabled: 7, focusTrapOptions: 0, heading: 1, headingLevel: 11, kind: 3, icon: [3, { type: String }], iconFlipRtl: 7, loading: 7, menuOpen: 7, messageOverrides: 0, modal: 7, focusTrapDisabled: 7, open: 7, outsideCloseDisabled: 7, overlayPositioning: 3, placement: 3, resizable: 7, scale: 3, widthScale: 3, width: 3 };
  }
  static {
    this.styles = L;
  }
  get preventDocumentScroll() {
    return !this.embedded && this.modal;
  }
  get open() {
    return this._open;
  }
  set open(e) {
    const i = this._open;
    e !== i && this.setOpenState(e);
  }
  async scrollContentTo(e) {
    await this.panelRef.value?.scrollContentTo(e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.panelRef.value ?? this.el, e);
  }
  async updateFocusTrapElements(e) {
    this.focusTrap.setExtraContainers(e), this.focusTrap.updateContainerElements();
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setupInteractions();
  }
  willUpdate(e) {
    (e.has("open") && (this.hasUpdated || this.open !== !1) || e.has("placement") && (this.hasUpdated || this.placement !== "center") || e.has("resizable") && (this.hasUpdated || this.resizable !== !1) || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1)) && this.setupInteractions(), (e.has("messages") || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1) || e.has("resizable") && (this.hasUpdated || this.resizable !== !1)) && this.updateAssistiveText(), e.has("opened") && (this.hasUpdated || this.opened !== !1) && this.handleOpenedChange(this.opened);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.embedded = !1, this.cleanupInteractions();
  }
  focusTrapDisabledOverride() {
    return !this.modal && this.focusTrapDisabled;
  }
  updateAssistiveText() {
    const { messages: e } = this;
    this.assistiveText = e && (this.dragEnabled || this.resizable) ? `${this.dragEnabled ? e.dragEnabled : ""} ${this.resizable ? e.resizeEnabled : ""}` : null;
  }
  onBeforeOpen() {
    this.calciteDialogBeforeOpen.emit();
  }
  onOpen() {
    this.focusTrapDisabled && this.setFocus(), this.focusTrap.activate(), this.calciteDialogOpen.emit();
  }
  onBeforeClose() {
    this.calciteDialogBeforeClose.emit();
  }
  onClose() {
    this.focusTrap.deactivate(), this.calciteDialogClose.emit();
  }
  async setOpenState(e) {
    if (this.beforeClose && !e)
      try {
        await this.beforeClose?.();
      } catch {
        return;
      }
    this._open = e, e && await this.componentOnReady(), this.opened = e;
  }
  handleOpenedChange(e) {
    const { transitionEl: i } = this;
    i && (i.classList.toggle(m.openingActive, e), I(this));
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
    const { key: i, shiftKey: t, defaultPrevented: n } = e, { dragEnabled: a, resizable: o, resizePosition: r, dragPosition: s, transitionEl: p } = this;
    if (!(n || !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(i)))
      switch (i) {
        case "ArrowUp":
          if (t && o && p) {
            const { minBlockSize: g } = window.getComputedStyle(p), c = u(g), f = this.getTransitionElDOMRect().height;
            if (f <= c)
              return;
            this.updateSize({
              size: f - d,
              type: "blockSize"
            }), r.bottom -= d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault();
          } else a && (s.y -= d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowDown":
          t && o && p ? (this.updateSize({
            size: this.getTransitionElDOMRect().height + d,
            type: "blockSize"
          }), r.bottom += d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault()) : a && (s.y += d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowLeft":
          if (t && o && p) {
            const { minInlineSize: g } = window.getComputedStyle(p), c = u(g), f = this.getTransitionElDOMRect().width;
            if (f <= c)
              return;
            this.updateSize({
              size: f - d,
              type: "inlineSize"
            }), r.right -= d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault();
          } else a && (s.x -= d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowRight":
          t && o && p ? (this.updateSize({
            size: this.getTransitionElDOMRect().width + d,
            type: "inlineSize"
          }), r.right += d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault()) : a && (s.x += d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
      }
  }
  updateTransform() {
    const { dragPosition: { x: e, y: i }, resizePosition: t, transitionEl: n, dragEnabled: a, resizable: o } = this;
    if (!n)
      return;
    if (!a && !o) {
      n.style.transform = null;
      return;
    }
    const { top: r, right: s, bottom: p, left: z } = this.getAdjustedResizePosition(t), g = Math.round(e + z + s), c = Math.round(i + r + p);
    n.style.transform = g || c ? `translate(${g}px, ${c}px)` : null;
  }
  updateSize({ type: e, size: i }) {
    const { transitionEl: t } = this;
    t && (t.style[e] = i !== null ? `${Math.round(i)}px` : null);
  }
  cleanupInteractions() {
    this.interaction?.unset(), this.updateSize({ size: null, type: "inlineSize" }), this.updateSize({ size: null, type: "blockSize" }), this.dragPosition = { ...k }, this.resizePosition = { ...$ }, this.updateTransform();
  }
  async setupInteractions() {
    this.cleanupInteractions();
    const { el: e, transitionEl: i, resizable: t, dragEnabled: n, resizePosition: a, dragPosition: o } = this;
    if (!(!i || !this.open)) {
      if ((t || n) && (this.interaction = x(i, { context: e.ownerDocument })), t) {
        await this.el.componentOnReady();
        const { minInlineSize: r, minBlockSize: s, maxInlineSize: p, maxBlockSize: z } = window.getComputedStyle(i);
        this.interaction.resizable({
          edges: {
            top: !0,
            right: !0,
            bottom: !0,
            left: !0
          },
          modifiers: [
            x.modifiers.restrictSize({
              min: {
                width: u(r),
                height: u(s)
              },
              max: {
                width: u(p) || window.innerWidth,
                height: u(z) || window.innerHeight
              }
            }),
            x.modifiers.restrict({
              restriction: "parent"
            })
          ],
          listeners: {
            move: ({ rect: g, deltaRect: c }) => {
              c && (a.top += c.top, a.right += c.right, a.bottom += c.bottom, a.left += c.left), this.updateSize({ size: g.width, type: "inlineSize" }), this.updateSize({ size: g.height, type: "blockSize" }), this.updateTransform();
            }
          }
        });
      }
      n && this.interaction.draggable({
        modifiers: [
          x.modifiers.restrictRect({
            restriction: "parent"
          })
        ],
        listeners: {
          move: ({ dx: r, dy: s }) => {
            o.x += r, o.y += s, this.updateTransform();
          }
        }
      });
    }
  }
  getAdjustedResizePosition({ top: e, right: i, bottom: t, left: n }) {
    const a = e / 2, o = i / 2, r = t / 2, s = n / 2;
    switch (this.placement) {
      case "top":
        return { top: e, right: o, bottom: 0, left: s };
      case "top-start":
        return { top: e, right: 0, bottom: 0, left: n };
      case "top-end":
        return { top: e, right: i, bottom: 0, left: 0 };
      case "bottom":
        return { top: 0, right: o, bottom: t, left: s };
      case "bottom-start":
        return { top: 0, right: 0, bottom: t, left: n };
      case "bottom-end":
        return { top: 0, right: i, bottom: t, left: 0 };
      case "cover":
      case "center":
      default:
        return {
          top: a,
          right: o,
          bottom: r,
          left: s
        };
    }
  }
  setTransitionEl(e) {
    e && (this.transitionEl = e, this.setupInteractions());
  }
  handleInternalPanelScroll(e) {
    e.target === this.panelRef.value && (e.stopPropagation(), this.calciteDialogScroll.emit());
  }
  handleInternalPanelCloseClick(e) {
    e.target === this.panelRef.value && (e.preventDefault(), e.stopPropagation(), this.open = !1);
  }
  handlePanelKeyDown(e) {
    this.escapeDisabled && e.key === "Escape" && e.preventDefault();
  }
  handleOutsideClose() {
    this.outsideCloseDisabled || (this.open = !1);
  }
  handleMutationObserver() {
    this.focusTrap.updateContainerElements();
  }
  render() {
    const { assistiveText: e, description: i, heading: t, opened: n, icon: a, iconFlipRtl: o } = this;
    return w`<div class=${v({
      [m.container]: !0,
      [m.containerOpen]: n,
      [m.containerEmbedded]: this.embedded
    })}>${this.modal ? w`<calcite-scrim class=${v(m.scrim)} @click=${this.handleOutsideClose}></calcite-scrim>` : null}<div .ariaDescription=${i} .ariaLabel=${t} .ariaModal=${this.modal} class=${v({
      [m.dialog]: !0,
      [P("width", this.width, this.widthScale)]: !!(this.width || this.widthScale)
    })} @keydown=${this.handleKeyDown} role=dialog ${y(this.setTransitionEl)}>${e ? C("assistive-text", w`<div aria-live=polite class=${v(m.assistiveText)}>${e}</div>`) : null}<slot name=${l.customContent}><slot name=${l.content}><calcite-panel class=${v(m.panel)} .closable=${!this.closeDisabled} .description=${i} .heading=${t} .headingLevel=${this.headingLevel} .hidden=${!this.opened} .icon=${a} .iconFlipRtl=${o} .loading=${this.loading} .menuOpen=${this.menuOpen} .messageOverrides=${this.messageOverrides} @keydown=${this.handlePanelKeyDown} @calcitePanelClose=${this.handleInternalPanelCloseClick} @calcitePanelScroll=${this.handleInternalPanelScroll} .overlayPositioning=${this.overlayPositioning} .scale=${this.scale} ${y(this.panelRef)}><slot name=${l.actionBar} slot=${h.actionBar}></slot><slot name=${l.alerts} slot=${h.alerts}></slot><slot name=${l.headerActionsStart} slot=${h.headerActionsStart}></slot><slot name=${l.headerActionsEnd} slot=${h.headerActionsEnd}></slot><slot name=${l.headerContent} slot=${h.headerContent}></slot><slot name=${l.headerMenuActions} slot=${h.headerMenuActions}></slot><slot name=${l.fab} slot=${h.fab}></slot><slot name=${l.contentTop} slot=${h.contentTop}></slot><slot name=${l.contentBottom} slot=${h.contentBottom}></slot><slot name=${l.footerStart} slot=${h.footerStart}></slot><slot name=${l.footer} slot=${h.footer}></slot><slot name=${l.footerEnd} slot=${h.footerEnd}></slot><slot></slot></calcite-panel></slot></slot></div></div>`;
  }
}
T("calcite-dialog", F);
export {
  F as Dialog
};
