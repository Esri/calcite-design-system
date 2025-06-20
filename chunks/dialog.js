import { a as D, L as S, d as b, n as d, s as v, x, c as C } from "./iframe.js";
import { i as T } from "./keyed.js";
import { i as w } from "./interact.min.js";
import { e as E, n as y } from "./ref.js";
import { f as O, k as f } from "./dom.js";
import { c as P } from "./component.js";
import { c as I } from "./observers.js";
import { g as M } from "./dynamicClasses.js";
import { t as A } from "./openCloseComponent.js";
import { S as h } from "./resources6.js";
import { u as B } from "./useT9n.js";
import { u as R } from "./useFocusTrap.js";
import { u as F } from "./usePreventDocumentScroll.js";
import { i as k, a as $, C as g, S as l } from "./resources7.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
const L = D`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{--calcite-dialog-scrim-background-color: rgba(0, 0, 0, .85);pointer-events:none;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;--calcite-internal-dialog-animation-offset: 20px}:host([modal]){position:absolute}.container{pointer-events:auto;position:fixed;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;align-items:center;justify-content:center;overflow:hidden;color:var(--calcite-color-text-2);opacity:0;visibility:hidden;transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}:host([placement=top]) .container{align-items:flex-start;justify-content:center}:host([placement=top-start]) .container{align-items:flex-start;justify-content:flex-start}:host([placement=top-end]) .container{align-items:flex-start;justify-content:flex-end}:host([placement=bottom]) .container{align-items:flex-end;justify-content:center}:host([placement=bottom-start]) .container{align-items:flex-end;justify-content:flex-start}:host([placement=bottom-end]) .container{align-items:flex-end;justify-content:flex-end}:host(:not([modal])) .container{pointer-events:none}:host([scale=s]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-sm));--calcite-internal-dialog-min-size-x: 198px;--calcite-internal-dialog-min-size-y: 140px}:host([scale=m]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-md));--calcite-internal-dialog-min-size-x: 288px;--calcite-internal-dialog-min-size-y: 180px}:host([scale=l]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-md-plus));--calcite-internal-dialog-min-size-x: 388px;--calcite-internal-dialog-min-size-y: 220px}.scrim{--calcite-scrim-background: var(--calcite-dialog-scrim-background-color, var(--calcite-color-transparent-scrim));--calcite-scrim-background-color: var( --calcite-dialog-scrim-background-color, var(--calcite-color-transparent-scrim) );position:fixed;inset:0;display:flex;overflow-y:hidden}calcite-panel{--calcite-panel-content-space: var(--calcite-dialog-content-space, var(--calcite-internal-dialog-content-padding));--calcite-panel-footer-space: var(--calcite-dialog-footer-space);--calcite-panel-border-color: var(--calcite-dialog-border-color);--calcite-panel-background-color: var(--calcite-dialog-background-color, var(--calcite-color-foreground-1));--calcite-panel-icon-color: var(--calcite-dialog-icon-color)}:host([kind=brand]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-brand))}:host([kind=danger]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-danger))}:host([kind=info]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-info))}:host([kind=success]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-success))}:host([kind=warning]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-warning))}::slotted(*){--calcite-panel-background-color: initial}.dialog{pointer-events:none;position:relative;z-index:var(--calcite-z-index-modal);margin:1.5rem;box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;border-radius:.25rem;opacity:0;--tw-shadow: 0 2px 12px -4px rgba(0, 0, 0, .2), 0 2px 4px -2px rgba(0, 0, 0, .16);--tw-shadow-colored: 0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);-webkit-overflow-scrolling:touch;visibility:hidden;transition:inset-block var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);min-inline-size:var(--calcite-dialog-min-size-x, var(--calcite-internal-dialog-min-size-x));max-inline-size:var(--calcite-dialog-max-size-x, 100%);min-block-size:var(--calcite-dialog-min-size-y, var(--calcite-internal-dialog-min-size-y));max-block-size:var(--calcite-dialog-max-size-y, 100%);--calcite-internal-dialog-hidden-position: calc( var(--calcite-dialog-offset-y, 0px) + var(--calcite-internal-dialog-animation-offset) );--calcite-internal-dialog-shown-position: var(--calcite-dialog-offset-y, 0);inset-inline-start:var(--calcite-dialog-offset-x, 0);inset-block-start:var(--calcite-internal-dialog-hidden-position)}.dialog--opening-active{inset-block-start:var(--calcite-internal-dialog-shown-position)}:host([menu-open]) .dialog{transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}.panel{border-radius:.25rem}.container--open{opacity:1;visibility:visible;transition-delay:0ms}.container--open .dialog{pointer-events:auto;visibility:visible;opacity:1;transition:inset-block var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);transition-delay:0ms}.width-s{inline-size:auto;inline-size:var(--calcite-dialog-size-x, 32rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width: 35rem){.width-s{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}.width-s.dialog--opening-active{inset-block-start:0}}.width-m{inline-size:var(--calcite-dialog-size-x, 48rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width: 51rem){.width-m{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}.width-m.dialog--opening-active{inset-block-start:0}}.width-l{inline-size:var(--calcite-dialog-size-x, 94rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width: 97rem){.width-l{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}.width-l.dialog--opening-active{inset-block-start:0}}:host([placement=cover]) .dialog{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;border-radius:0}:host([placement=cover]) .panel{border-radius:0}:host([kind]) .panel{border-start-start-radius:0px;border-start-end-radius:0px}:host([kind=brand]) .dialog{border-color:var(--calcite-color-brand)}:host([kind=danger]) .dialog{border-color:var(--calcite-color-status-danger)}:host([kind=info]) .dialog{border-color:var(--calcite-color-status-info)}:host([kind=success]) .dialog{border-color:var(--calcite-color-status-success)}:host([kind=warning]) .dialog{border-color:var(--calcite-color-status-warning)}:host([kind=brand][open]) .dialog,:host([kind=danger][open]) .dialog,:host([kind=info][open]) .dialog,:host([kind=success][open]) .dialog,:host([kind=warning][open]) .dialog{border-width:0px;border-block-start-width:4px;border-style:solid}.container--embedded{position:absolute;pointer-events:auto}.container--embedded calcite-scrim{position:absolute}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}`;
class U extends S {
  constructor() {
    super(...arguments), this.dragPosition = { ...k }, this.focusTrap = R({
      triggerProp: "open",
      focusTrapOptions: {
        // scrim closes on click, so we let it take over
        clickOutsideDeactivates: () => !this.modal || this.embedded,
        escapeDeactivates: (e) => (!e.defaultPrevented && !this.escapeDisabled && (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.usePreventDocumentScroll = F()(this), this.ignoreOpenChange = !1, this.mutationObserver = I("mutation", () => this.handleMutationObserver()), this._open = !1, this.openProp = "opened", this.transitionProp = "opacity", this.panelEl = E(), this.resizePosition = { ...$ }, this.messages = B(), this.assistiveText = null, this.hasContentBottom = !1, this.hasContentTop = !1, this.hasFooter = !0, this.opened = !1, this.closeDisabled = !1, this.dragEnabled = !1, this.embedded = !1, this.escapeDisabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.menuOpen = !1, this.modal = !1, this.focusTrapDisabled = !1, this.outsideCloseDisabled = !1, this.overlayPositioning = "absolute", this.placement = "center", this.resizable = !1, this.scale = "m", this.widthScale = "m", this.calciteDialogBeforeClose = b({ cancelable: !1 }), this.calciteDialogBeforeOpen = b({ cancelable: !1 }), this.calciteDialogClose = b({ cancelable: !1 }), this.calciteDialogOpen = b({ cancelable: !1 }), this.calciteDialogScroll = b({ cancelable: !1 });
  }
  static {
    this.properties = { assistiveText: 16, hasContentBottom: 16, hasContentTop: 16, hasFooter: 16, opened: 16, preventDocumentScroll: 16, beforeClose: 0, closeDisabled: 7, description: 1, dragEnabled: 7, embedded: 5, escapeDisabled: 7, focusTrapOptions: 0, heading: 1, headingLevel: 11, kind: 3, icon: 3, iconFlipRtl: 7, loading: 7, menuOpen: 7, messageOverrides: 0, modal: 7, focusTrapDisabled: 7, open: 7, outsideCloseDisabled: 7, overlayPositioning: 3, placement: 3, resizable: 7, scale: 3, widthScale: 3, width: 3 };
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
    e !== i && (this._open = e, this.toggleDialog(e));
  }
  async scrollContentTo(e) {
    await this.panelEl.value?.scrollContentTo(e);
  }
  async setFocus() {
    return await P(this), this.panelEl.value?.setFocus() ?? O(this.el);
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
  toggleDialog(e) {
    this.ignoreOpenChange || (e ? this.openDialog() : this.closeDialog());
  }
  handleOpenedChange(e) {
    const { transitionEl: i } = this;
    i && (i.classList.toggle(g.openingActive, e), A(this));
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
    const { key: i, shiftKey: t, defaultPrevented: a } = e, { dragEnabled: s, resizable: o, resizePosition: r, dragPosition: n, transitionEl: p } = this;
    if (!(a || !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(i)))
      switch (i) {
        case "ArrowUp":
          if (t && o && p) {
            const { minBlockSize: m } = window.getComputedStyle(p), c = f(m), u = this.getTransitionElDOMRect().height;
            if (u <= c)
              return;
            this.updateSize({
              size: u - d,
              type: "blockSize"
            }), r.bottom -= d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault();
          } else s && (n.y -= d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowDown":
          t && o && p ? (this.updateSize({
            size: this.getTransitionElDOMRect().height + d,
            type: "blockSize"
          }), r.bottom += d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault()) : s && (n.y += d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowLeft":
          if (t && o && p) {
            const { minInlineSize: m } = window.getComputedStyle(p), c = f(m), u = this.getTransitionElDOMRect().width;
            if (u <= c)
              return;
            this.updateSize({
              size: u - d,
              type: "inlineSize"
            }), r.right -= d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault();
          } else s && (n.x -= d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowRight":
          t && o && p ? (this.updateSize({
            size: this.getTransitionElDOMRect().width + d,
            type: "inlineSize"
          }), r.right += d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault()) : s && (n.x += d, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
      }
  }
  updateTransform() {
    const { dragPosition: { x: e, y: i }, resizePosition: t, transitionEl: a, dragEnabled: s, resizable: o } = this;
    if (!a)
      return;
    if (!s && !o) {
      a.style.transform = null;
      return;
    }
    const { top: r, right: n, bottom: p, left: z } = this.getAdjustedResizePosition(t), m = Math.round(e + z + n), c = Math.round(i + r + p);
    a.style.transform = m || c ? `translate(${m}px, ${c}px)` : null;
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
    const { el: e, transitionEl: i, resizable: t, dragEnabled: a, resizePosition: s, dragPosition: o } = this;
    if (!(!i || !this.open)) {
      if ((t || a) && (this.interaction = w(i, { context: e.ownerDocument })), t) {
        await this.el.componentOnReady();
        const { minInlineSize: r, minBlockSize: n, maxInlineSize: p, maxBlockSize: z } = window.getComputedStyle(i);
        this.interaction.resizable({
          edges: {
            top: !0,
            right: !0,
            bottom: !0,
            left: !0
          },
          modifiers: [
            w.modifiers.restrictSize({
              min: {
                width: f(r),
                height: f(n)
              },
              max: {
                width: f(p) || window.innerWidth,
                height: f(z) || window.innerHeight
              }
            }),
            w.modifiers.restrict({
              restriction: "parent"
            })
          ],
          listeners: {
            move: ({ rect: m, deltaRect: c }) => {
              c && (s.top += c.top, s.right += c.right, s.bottom += c.bottom, s.left += c.left), this.updateSize({ size: m.width, type: "inlineSize" }), this.updateSize({ size: m.height, type: "blockSize" }), this.updateTransform();
            }
          }
        });
      }
      a && this.interaction.draggable({
        modifiers: [
          w.modifiers.restrictRect({
            restriction: "parent"
          })
        ],
        listeners: {
          move: ({ dx: r, dy: n }) => {
            o.x += r, o.y += n, this.updateTransform();
          }
        }
      });
    }
  }
  getAdjustedResizePosition({ top: e, right: i, bottom: t, left: a }) {
    const s = e / 2, o = i / 2, r = t / 2, n = a / 2;
    switch (this.placement) {
      case "top":
        return { top: e, right: o, bottom: 0, left: n };
      case "top-start":
        return { top: e, right: 0, bottom: 0, left: a };
      case "top-end":
        return { top: e, right: i, bottom: 0, left: 0 };
      case "bottom":
        return { top: 0, right: o, bottom: t, left: n };
      case "bottom-start":
        return { top: 0, right: 0, bottom: t, left: a };
      case "bottom-end":
        return { top: 0, right: i, bottom: t, left: 0 };
      case "cover":
      case "center":
      default:
        return {
          top: s,
          right: o,
          bottom: r,
          left: n
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
    await this.componentOnReady(), this.opened = !0;
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
    this.opened = !1;
  }
  handleMutationObserver() {
    this.focusTrap.updateContainerElements();
  }
  render() {
    const { assistiveText: e, description: i, heading: t, opened: a, icon: s, iconFlipRtl: o } = this;
    return x`<div class=${v({
      [g.container]: !0,
      [g.containerOpen]: a,
      [g.containerEmbedded]: this.embedded
    })}>${this.modal ? x`<calcite-scrim class=${v(g.scrim)} @click=${this.handleOutsideClose}></calcite-scrim>` : null}<div .ariaDescription=${i} .ariaLabel=${t} .ariaModal=${this.modal} class=${v({
      [g.dialog]: !0,
      [M("width", this.width, this.widthScale)]: !!(this.width || this.widthScale)
    })} @keydown=${this.handleKeyDown} role=dialog ${y(this.setTransitionEl)}>${e ? T("assistive-text", x`<div aria-live=polite class=${v(g.assistiveText)}>${e}</div>`) : null}<slot name=${l.customContent}><slot name=${l.content}><calcite-panel .beforeClose=${this.beforeClose} class=${v(g.panel)} .closable=${!this.closeDisabled} .closed=${!a} .description=${i} .heading=${t} .headingLevel=${this.headingLevel} .icon=${s} .iconFlipRtl=${o} .loading=${this.loading} .menuOpen=${this.menuOpen} .messageOverrides=${this.messageOverrides} @keydown=${this.handlePanelKeyDown} @calcitePanelClose=${this.handleInternalPanelCloseClick} @calcitePanelScroll=${this.handleInternalPanelScroll} .overlayPositioning=${this.overlayPositioning} .scale=${this.scale} ${y(this.panelEl)}><slot name=${l.actionBar} slot=${h.actionBar}></slot><slot name=${l.alerts} slot=${h.alerts}></slot><slot name=${l.headerActionsStart} slot=${h.headerActionsStart}></slot><slot name=${l.headerActionsEnd} slot=${h.headerActionsEnd}></slot><slot name=${l.headerContent} slot=${h.headerContent}></slot><slot name=${l.headerMenuActions} slot=${h.headerMenuActions}></slot><slot name=${l.fab} slot=${h.fab}></slot><slot name=${l.contentTop} slot=${h.contentTop}></slot><slot name=${l.contentBottom} slot=${h.contentBottom}></slot><slot name=${l.footerStart} slot=${h.footerStart}></slot><slot name=${l.footer} slot=${h.footer}></slot><slot name=${l.footerEnd} slot=${h.footerEnd}></slot><slot></slot></calcite-panel></slot></slot></div></div>`;
  }
}
C("calcite-dialog", U);
export {
  U as Dialog
};
