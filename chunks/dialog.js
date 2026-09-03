/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as S, L as T, c as b, K as h, s as v, b as y, d as C } from "./index.js";
import { i as O } from "./keyed.js";
import { u as E, i as x } from "./useSizeOverride.js";
import { e as k, n as w } from "./ref.js";
import { h as u } from "./dom.js";
import { c as P } from "./observers.js";
import { g as I } from "./dynamicClasses.js";
import { t as R } from "./openCloseComponent.js";
import { S as s } from "./resources14.js";
import { u as B } from "./useT9n.js";
import { u as M } from "./useFocusTrap.js";
import { u as L } from "./usePreventDocumentScroll.js";
import { u as A } from "./useSetFocus.js";
import { u as U } from "./useTopLayer.js";
import { i as $, a as D, S as a, C as g } from "./resources15.js";
const F = S`:host{--calcite-dialog-scrim-background-color: rgba(0, 0, 0, .85);pointer-events:none;inset:0;display:flex;--calcite-internal-dialog-animation-offset: 20px}:host([top-layer-disabled]),:host([top-layer-disabled]) .container,:host([embedded]),.container--embedded{z-index:var(--calcite-z-index-overlay)}:host([embedded][modal]){position:absolute}.container{pointer-events:auto;position:fixed;inset:0;display:flex;block-size:100%;inline-size:100%;align-items:center;justify-content:center;overflow:hidden;color:var(--calcite-color-text-2);opacity:0;visibility:hidden;transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) ease-in-out}:host([placement=top]) .container{align-items:flex-start;justify-content:center}:host([placement=top-start]) .container{align-items:flex-start;justify-content:flex-start}:host([placement=top-end]) .container{align-items:flex-start;justify-content:flex-end}:host([placement=bottom]) .container{align-items:flex-end;justify-content:center}:host([placement=bottom-start]) .container{align-items:flex-end;justify-content:flex-start}:host([placement=bottom-end]) .container{align-items:flex-end;justify-content:flex-end}:host(:not([modal])) .container{pointer-events:none}:host([scale=s]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-sm));--calcite-internal-dialog-min-size-x: 198px;--calcite-internal-dialog-min-size-y: 140px}:host([scale=m]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-md));--calcite-internal-dialog-min-size-x: 288px;--calcite-internal-dialog-min-size-y: 180px}:host([scale=l]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-md-plus));--calcite-internal-dialog-min-size-x: 388px;--calcite-internal-dialog-min-size-y: 220px}.scrim{--calcite-scrim-background: var(--calcite-dialog-scrim-background-color, var(--calcite-color-transparent-scrim));--calcite-scrim-background-color: var( --calcite-dialog-scrim-background-color, var(--calcite-color-transparent-scrim) );position:fixed;inset:0;display:flex;overflow-y:hidden;z-index:calc(var(--calcite-z-index) * -1)}:host([top-layer-disabled]) .scrim{z-index:unset}calcite-panel{--calcite-panel-content-space: var(--calcite-dialog-content-space, var(--calcite-internal-dialog-content-padding));--calcite-panel-content-top-space: var( --calcite-dialog-content-top-space, var(--calcite-internal-dialog-content-padding) );--calcite-panel-content-bottom-space: var( --calcite-dialog-content-bottom-space, var(--calcite-internal-dialog-content-padding) );--calcite-panel-footer-space: var(--calcite-dialog-footer-space);--calcite-panel-border-color: var(--calcite-dialog-border-color);--calcite-panel-background-color: var(--calcite-dialog-background-color, var(--calcite-color-foreground-1));--calcite-panel-icon-color: var(--calcite-dialog-icon-color);--calcite-panel-heading-text-color: var(--calcite-dialog-heading-text-color);--calcite-panel-description-text-color: var(--calcite-dialog-description-text-color);--calcite-panel-header-background-color: var(--calcite-dialog-header-background-color);--calcite-panel-header-action-background-color: var(--calcite-dialog-header-action-background-color);--calcite-panel-header-action-background-color-hover: var(--calcite-dialog-header-action-background-color-hover);--calcite-panel-header-action-background-color-press: var(--calcite-dialog-header-action-background-color-press);--calcite-panel-header-action-text-color: var(--calcite-dialog-header-action-text-color);--calcite-panel-header-action-text-color-press: var(--calcite-dialog-header-action-text-color-press);--calcite-panel-footer-background-color: var(--calcite-dialog-footer-background-color);--calcite-panel-space: var(--calcite-dialog-space, var(--calcite-internal-dialog-content-padding));--calcite-panel-header-content-space: var(--calcite-dialog-header-content-space, var(--calcite-dialog-content-space));--calcite-panel-header-top-space: var(--calcite-dialog-header-top-space);--calcite-popover-border-color: var(--calcite-dialog-action-menu-border-color, var(--calcite-color-border-1));--calcite-panel-corner-radius: var(--calcite-dialog-corner-radius)}:host([kind=brand]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-brand))}:host([kind=danger]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-danger))}:host([kind=info]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-info))}:host([kind=success]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-success))}:host([kind=warning]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-warning))}::slotted(*){--calcite-panel-background-color: initial}[popover]{padding:0;border:none;background-color:transparent;position:fixed;display:flex}[popover]:popover-open{display:flex}.dialog{pointer-events:none;position:relative;margin:1.5rem;box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;opacity:0;box-shadow:var(--calcite-shadow-md);-webkit-overflow-scrolling:touch;visibility:hidden;transition:inset-block-start var(--calcite-internal-animation-timing-slow) ease-in-out allow-discrete,opacity var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:var(--calcite-dialog-corner-radius, var(--calcite-corner-radius-sm));min-inline-size:var(--calcite-dialog-min-size-x, var(--calcite-internal-dialog-min-size-x));max-inline-size:var(--calcite-dialog-max-size-x, 100%);min-block-size:var(--calcite-dialog-min-size-y, var(--calcite-internal-dialog-min-size-y));max-block-size:var(--calcite-dialog-max-size-y, 100%);--calcite-internal-dialog-hidden-position: calc( var(--calcite-dialog-offset-y, 0px) + var(--calcite-internal-dialog-animation-offset) );--calcite-internal-dialog-shown-position: var(--calcite-dialog-offset-y, 0);inset-inline-start:var(--calcite-dialog-offset-x, 0);inset-block-start:var(--calcite-internal-dialog-hidden-position)}:host([top-layer-disabled]) .dialog,:host([embedded]) .dialog{z-index:var(--calcite-z-index-modal)}:host([menu-open]) .dialog{transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) ease-in-out}.panel{visibility:hidden;opacity:0;border-radius:var(--calcite-dialog-corner-radius, var(--calcite-corner-radius-sm));transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) ease-in-out}.container--open .panel{visibility:visible;opacity:1;transition:visibility 0ms linear,opacity var(--calcite-internal-animation-timing-slow) ease-in-out}.container--open{opacity:1;visibility:visible;transition-delay:0ms}.container--open .dialog{pointer-events:auto;visibility:visible;opacity:1;transition:inset-block-start var(--calcite-internal-animation-timing-slow) ease-in-out allow-discrete,opacity var(--calcite-internal-animation-timing-slow) ease-in-out;transition-delay:0ms}.width-s{inline-size:auto;inline-size:var(--calcite-dialog-size-x, 32rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width:35rem){:host(:not([fullscreen-disabled])) .width-s{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}}.width-m{inline-size:var(--calcite-dialog-size-x, 48rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width:51rem){:host(:not([fullscreen-disabled])) .width-m{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}}.width-l{inline-size:var(--calcite-dialog-size-x, 94rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width:97rem){:host(:not([fullscreen-disabled])) .width-l{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}}:host([placement=cover]) .dialog{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;border-radius:0}:host([placement=cover]) .panel{border-radius:0}:host([kind]) .panel{border-start-start-radius:0px;border-start-end-radius:0px}:host([kind]) .dialog{overflow:hidden}:host([kind=brand]) .dialog{border-color:var(--calcite-color-brand)}:host([kind=danger]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-danger))}:host([kind=info]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-info))}:host([kind=success]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-success))}:host([kind=warning]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-warning))}:host([open]) .dialog{inset-block-start:var(--calcite-internal-dialog-shown-position)}@starting-style{:host([open]) .dialog{inset-block-start:var(--calcite-internal-dialog-hidden-position);opacity:0}}:host([kind=brand][open]) .dialog,:host([kind=danger][open]) .dialog,:host([kind=info][open]) .dialog,:host([kind=success][open]) .dialog,:host([kind=warning][open]) .dialog{border-width:0px;border-block-start-width:4px;border-style:solid}.container--embedded{position:absolute;pointer-events:auto}.container--embedded calcite-scrim{position:absolute}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}`;
class j extends T {
  constructor() {
    super(...arguments), this.dragPosition = { ...$ }, this.focusTrap = M({
      triggerProp: "open",
      focusTrapOptions: {
        // scrim closes on click, so we let it take over
        clickOutsideDeactivates: () => !this.modal || this.embedded,
        escapeDeactivates: (e) => (!e.defaultPrevented && !this.escapeDisabled && (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.usePreventDocumentScroll = L()(this), this.mutationObserver = P("mutation", () => this.handleMutationObserver()), this._open = !1, this.openProp = "opened", this.transitionProp = "opacity", this.panelRef = k(), this.popoverRef = k(), this.resizePosition = { ...D }, this.messages = B(), this.focusSetter = A()(this), this.sizeOverride = E({
      targetElement: () => ({ value: this.transitionEl }),
      getBounds: () => ({
        inline: { min: this.resizeValues.minInlineSize, max: this.resizeValues.maxInlineSize },
        block: { min: this.resizeValues.minBlockSize, max: this.resizeValues.maxBlockSize }
      }),
      fullscreenDisabled: () => this.fullscreenDisabled,
      onResize: (e) => {
        this.resizeValues = e;
      }
    }), this.topLayer = U({
      disabledOverride: () => this.embedded,
      target: this.popoverRef
    })(this), this.assistiveText = null, this.hasContentBottom = !1, this.hasContentTop = !1, this.hasFooter = !0, this.opened = !1, this.resizeValues = {
      inlineSize: null,
      blockSize: null,
      minInlineSize: null,
      minBlockSize: null,
      maxInlineSize: null,
      maxBlockSize: null
    }, this.closeDisabled = !1, this.dragEnabled = !1, this.embedded = !1, this.escapeDisabled = !1, this.fullscreenDisabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.menuOpen = !1, this.modal = !1, this.focusTrapDisabled = !1, this.outsideCloseDisabled = !1, this.overlayPositioning = "absolute", this.placement = "center", this.resizable = !1, this.scale = "m", this.topLayerDisabled = !1, this.widthScale = "m", this.calciteDialogBeforeClose = b({ cancelable: !1 }), this.calciteDialogBeforeOpen = b({ cancelable: !1 }), this.calciteDialogClose = b({ cancelable: !1 }), this.calciteDialogOpen = b({ cancelable: !1 }), this.calciteDialogScroll = b({ cancelable: !1 });
  }
  static {
    this.properties = { assistiveText: 16, hasContentBottom: 16, hasContentTop: 16, hasFooter: 16, opened: 16, resizeValues: 16, beforeClose: 0, closeDisabled: 7, description: 1, dragEnabled: 7, embedded: 7, escapeDisabled: 7, focusTrapOptions: 0, fullscreenDisabled: 7, heading: 1, headingLevel: 11, kind: 3, icon: 3, iconFlipRtl: 7, loading: 7, menuOpen: 7, messageOverrides: 0, modal: 7, focusTrapDisabled: 7, open: 7, outsideCloseDisabled: 7, overlayPositioning: 3, placement: 3, resizable: 7, scale: 3, topLayerDisabled: 7, widthScale: 3, width: 3 };
  }
  static {
    this.styles = F;
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
  async updateSize(e) {
    this.updateSizeInternal(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setUpInteractions();
  }
  willUpdate(e) {
    (e.has("open") && (this.hasUpdated || this.open !== !1) || e.has("placement") && (this.hasUpdated || this.placement !== "center") || e.has("resizable") && (this.hasUpdated || this.resizable !== !1) || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1)) && this.setUpInteractions(), (e.has("messages") || e.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== !1) || e.has("resizable") && (this.hasUpdated || this.resizable !== !1)) && this.updateAssistiveText(), e.has("opened") && (this.hasUpdated || this.opened !== !1) && this.handleOpenedChange();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.embedded = !1, this.cleanUpInteractions();
  }
  focusTrapDisabledOverride() {
    return !this.modal && this.focusTrapDisabled;
  }
  updateAssistiveText() {
    const { messages: e } = this;
    this.assistiveText = e && (this.dragEnabled || this.resizable) ? `${this.dragEnabled ? e.dragEnabled : ""} ${this.resizable ? e.resizeEnabled : ""}` : null;
  }
  onBeforeOpen() {
    this.calciteDialogBeforeOpen.emit(), this.topLayer.show();
  }
  onOpen() {
    this.focusTrapDisabled && this.setFocus(), this.focusTrap.activate(), this.calciteDialogOpen.emit();
  }
  onBeforeClose() {
    this.calciteDialogBeforeClose.emit();
  }
  onClose() {
    this.focusTrap.deactivate(), this.calciteDialogClose.emit(), this.topLayer.hide();
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
  handleOpenedChange() {
    R(this);
  }
  async triggerInteractModifiers() {
    const { interaction: e } = this;
    e && (await e.reflow({
      name: "drag"
    }), await e.reflow({
      name: "resize"
    }));
  }
  getTransitionRefDOMRect() {
    return this.transitionEl.getBoundingClientRect();
  }
  handleKeyDown(e) {
    const { key: i, shiftKey: t, defaultPrevented: r } = e, { dragEnabled: o, resizable: n, resizePosition: c, dragPosition: l, transitionEl: p } = this;
    if (!(r || !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(i)))
      switch (i) {
        case "ArrowUp":
          if (t && n && p) {
            const { minBlockSize: m } = window.getComputedStyle(p), d = u(m), f = this.getTransitionRefDOMRect().height;
            if (f <= d)
              return;
            this.updateSizeInternal({
              block: f - h
            }), c.bottom -= h, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault();
          } else o && (l.y -= h, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowDown":
          t && n && p ? (this.updateSizeInternal({
            block: this.getTransitionRefDOMRect().height + h
          }), c.bottom += h, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault()) : o && (l.y += h, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowLeft":
          if (t && n && p) {
            const { minInlineSize: m } = window.getComputedStyle(p), d = u(m), f = this.getTransitionRefDOMRect().width;
            if (f <= d)
              return;
            this.updateSizeInternal({
              inline: f - h
            }), c.right -= h, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault();
          } else o && (l.x -= h, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
        case "ArrowRight":
          t && n && p ? (this.updateSizeInternal({
            inline: this.getTransitionRefDOMRect().width + h
          }), c.right += h, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault()) : o && (l.x += h, this.updateTransform(), this.triggerInteractModifiers(), e.preventDefault());
          break;
      }
  }
  updateTransform() {
    const { dragPosition: { x: e, y: i }, resizePosition: t, transitionEl: r, dragEnabled: o, resizable: n } = this;
    if (!r)
      return;
    if (!o && !n) {
      r.style.transform = "";
      return;
    }
    const { top: c, right: l, bottom: p, left: z } = this.getAdjustedResizePosition(t), m = Math.round(e + z + l), d = Math.round(i + c + p);
    this.transitionEl.style.transform = m || d ? `translate(${m}px, ${d}px)` : "";
  }
  cleanUpInteractions() {
    this.interaction?.unset(), this.updateSizeInternal({
      inline: null,
      block: null
    }), this.dragPosition = { ...$ }, this.resizePosition = { ...D }, this.updateTransform();
  }
  async setUpInteractions() {
    this.cleanUpInteractions();
    const { el: e, transitionEl: i, resizable: t, dragEnabled: r, resizePosition: o, dragPosition: n } = this;
    if (!(!i || !this.open)) {
      if ((t || r) && (this.interaction = x(i, { context: e.ownerDocument })), t) {
        await this.el.componentOnReady();
        const { minInlineSize: c, minBlockSize: l, maxInlineSize: p, maxBlockSize: z } = window.getComputedStyle(this.transitionEl);
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
                width: u(c),
                height: u(l)
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
            move: ({ rect: m, deltaRect: d }) => {
              d && (o.top += d.top, o.right += d.right, o.bottom += d.bottom, o.left += d.left), this.updateSizeInternal({
                inline: m.width,
                block: m.height
              }), this.updateTransform();
            }
          }
        });
      }
      r && this.interaction.draggable({
        modifiers: [
          x.modifiers.restrictRect({
            restriction: "parent"
          })
        ],
        listeners: {
          move: ({ dx: c, dy: l }) => {
            n.x += c, n.y += l, this.updateTransform();
          }
        }
      });
    }
  }
  getAdjustedResizePosition({ top: e, right: i, bottom: t, left: r }) {
    const o = e / 2, n = i / 2, c = t / 2, l = r / 2;
    switch (this.placement) {
      case "top":
        return { top: e, right: n, bottom: 0, left: l };
      case "top-start":
        return { top: e, right: 0, bottom: 0, left: r };
      case "top-end":
        return { top: e, right: i, bottom: 0, left: 0 };
      case "bottom":
        return { top: 0, right: n, bottom: t, left: l };
      case "bottom-start":
        return { top: 0, right: 0, bottom: t, left: r };
      case "bottom-end":
        return { top: 0, right: i, bottom: t, left: 0 };
      default:
        return {
          top: o,
          right: n,
          bottom: c,
          left: l
        };
    }
  }
  setTransitionEl(e) {
    e && (this.transitionEl = e, this.setUpInteractions());
  }
  handleInternalPanelScroll(e) {
    e.target === this.panelRef.value && (e.stopPropagation(), this.calciteDialogScroll.emit());
  }
  handleInternalPanelCloseClick(e) {
    e.target === this.panelRef.value && (e.preventDefault(), e.stopPropagation(), this.open = !1);
  }
  handlePanelKeyDown(e) {
    this.escapeDisabled && e.key === "Escape" && !e.defaultPrevented && e.preventDefault();
  }
  handleOutsideClose() {
    this.outsideCloseDisabled || (this.open = !1);
  }
  handleMutationObserver() {
    this.focusTrap.updateContainerElements();
  }
  updateSizeInternal(e) {
    this.transitionEl && this.sizeOverride.resize(e);
  }
  render() {
    const { assistiveText: e, description: i, heading: t, opened: r, icon: o, iconFlipRtl: n } = this;
    return y`<div .ariaDescription=${i} .ariaLabel=${t} .ariaModal=${this.modal} class=${v({
      [g.container]: !0,
      [g.containerOpen]: r,
      [g.containerEmbedded]: this.embedded
    })} .popover=${this.embedded ? void 0 : "manual"} role=dialog ${w(this.popoverRef)}>${this.modal ? y`<calcite-scrim class=${v(g.scrim)} @click=${this.handleOutsideClose}></calcite-scrim>` : null}<div class=${v({
      [g.dialog]: !0,
      [I("width", this.width, this.widthScale)]: !!(this.width || this.widthScale)
    })} @keydown=${this.handleKeyDown} ${w(this.setTransitionEl)}>${e ? O("assistive-text", y`<div aria-live=polite class=${v(g.assistiveText)}>${e}</div>`) : null}<slot name=${a.customContent}><calcite-panel class=${v(g.panel)} .closable=${!this.closeDisabled} .description=${i} .heading=${t} .headingLevel=${this.headingLevel} .hidden=${!this.opened} .icon=${o} .iconFlipRtl=${n} .loading=${this.loading} .menuOpen=${this.menuOpen} .messageOverrides=${this.messageOverrides} @calcitePanelClose=${this.handleInternalPanelCloseClick} @calcitePanelScroll=${this.handleInternalPanelScroll} @keydown=${this.handlePanelKeyDown} .overlayPositioning=${this.overlayPositioning} .scale=${this.scale} .topLayerDisabled=${this.topLayerDisabled} ${w(this.panelRef)}><slot name=${a.actionBar} slot=${s.actionBar}></slot><slot name=${a.alerts} slot=${s.alerts}></slot><slot name=${a.headerActionsStart} slot=${s.headerActionsStart}></slot><slot name=${a.headerActionsEnd} slot=${s.headerActionsEnd}></slot><slot name=${a.description} slot=${s.description}></slot><slot name=${a.heading} slot=${s.heading}></slot><slot name=${a.headerContent} slot=${s.headerContent}></slot><slot name=${a.headerTop} slot=${s.headerTop}></slot><slot name=${a.headerMenuActions} slot=${s.headerMenuActions}></slot><slot name=${a.fab} slot=${s.fab}></slot><slot name=${a.contentTop} slot=${s.contentTop}></slot><slot name=${a.contentBottom} slot=${s.contentBottom}></slot><slot name=${a.footerStart} slot=${s.footerStart}></slot><slot name=${a.footer} slot=${s.footer}></slot><slot name=${a.footerEnd} slot=${s.footerEnd}></slot><slot></slot></calcite-panel></slot></div></div>`;
  }
}
C("calcite-dialog", j);
export {
  j as Dialog
};
