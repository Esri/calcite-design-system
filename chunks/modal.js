import { b as u, L as g, c as l, A as c, s as i, x as a, E as f, q as v } from "./index.js";
import { i as d } from "./keyed.js";
import { e as x, n as h } from "./ref.js";
import { d as m, s, D as p } from "./dom.js";
import { c as b } from "./observers.js";
import { t as k } from "./openCloseComponent.js";
import { g as y } from "./component.js";
import { l as z } from "./logger.js";
import { u as w } from "./useT9n.js";
import { u as C } from "./usePreventDocumentScroll.js";
import { u as $ } from "./useFocusTrap.js";
import { u as S } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = {
  modal: "modal",
  title: "title",
  header: "header",
  footer: "footer",
  scrim: "scrim",
  back: "back",
  close: "close",
  secondary: "secondary",
  primary: "primary",
  container: "container",
  containerOpen: "container--open",
  content: "content",
  contentNoFooter: "content--no-footer",
  contentBottom: "content-bottom",
  contentTop: "content-top",
  // these classes help apply the animation in phases to only set transform on open/close
  // this helps avoid a positioning issue for any floating-ui-owning children
  openingIdle: "modal--opening-idle",
  openingActive: "modal--opening-active",
  closingIdle: "modal--closing-idle",
  closingActive: "modal--closing-active"
}, T = {
  close: "x"
}, n = {
  content: "content",
  contentBottom: "content-bottom",
  contentTop: "content-top",
  back: "back",
  secondary: "secondary",
  primary: "primary"
}, O = u`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{--calcite-modal-scrim-background: rgba(0, 0, 0, .85);position:fixed;inset:0;z-index:var(--calcite-z-index-overlay);display:flex;opacity:0;visibility:hidden!important;transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);--calcite-modal-scrim-background-internal: rgba(0, 0, 0, .85)}.container{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow-y:hidden;color:var(--calcite-color-text-2);opacity:0;visibility:hidden!important;transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}:host([scale=s]){--calcite-modal-padding-internal: .75rem;--calcite-modal-padding-large-internal: 1rem;--calcite-modal-title-text-internal: var(--calcite-font-size-1);--calcite-modal-content-text-internal: var(--calcite-font-size--1)}:host([scale=m]){--calcite-modal-padding-internal: 1rem;--calcite-modal-padding-large-internal: 1.25rem;--calcite-modal-title-text-internal: var(--calcite-font-size-2);--calcite-modal-content-text-internal: var(--calcite-font-size-0)}:host([scale=l]){--calcite-modal-padding-internal: 1.25rem;--calcite-modal-padding-large-internal: 1.5rem;--calcite-modal-title-text-internal: var(--calcite-font-size-3);--calcite-modal-content-text-internal: var(--calcite-font-size-1)}.scrim{--calcite-scrim-background: var(--calcite-modal-scrim-background, var(--calcite-color-transparent-scrim));position:absolute;inset:0;display:flex;overflow-y:hidden}.modal{pointer-events:none;z-index:var(--calcite-z-index-modal);float:none;margin:1.5rem;box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;overflow:hidden;border-radius:.25rem;background-color:var(--calcite-color-foreground-1);opacity:0;--tw-shadow: 0 2px 12px -4px rgba(0, 0, 0, .2), 0 2px 4px -2px rgba(0, 0, 0, .16);--tw-shadow-colored: 0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);-webkit-overflow-scrolling:touch;visibility:hidden;transition:transform var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);--calcite-modal-hidden-position: translate3d(0, 20px, 0);--calcite-modal-shown-position: translate3d(0, 0, 0)}.modal--opening-idle{transform:var(--calcite-modal-hidden-position)}.modal--opening-active,.modal--closing-idle{transform:var(--calcite-modal-shown-position)}.modal--closing-active{transform:var(--calcite-modal-hidden-position)}:host([opened]){opacity:1;visibility:visible!important;transition-delay:0ms}.container--open{opacity:1;visibility:visible!important;transition-delay:0ms}.container--open .modal{pointer-events:auto;visibility:visible;opacity:1;transition:transform var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),visibility 0ms linear,opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),max-inline-size var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88),max-block-size var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);transition-delay:0ms}.header{z-index:var(--calcite-z-index-header);display:flex;min-inline-size:0px;max-inline-size:100%;border-start-start-radius:.25rem;border-start-end-radius:.25rem;border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1);flex:0 0 auto}.close{order:2;margin:0;cursor:pointer;appearance:none;border-style:none;background-color:transparent;color:var(--calcite-color-text-3);transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;outline-color:transparent;padding-block:var(--calcite-modal-padding-internal);padding-inline:var(--calcite-modal-padding-internal);flex:0 0 auto}.close calcite-icon{vertical-align:-2px}.close:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.close:hover,.close:focus,.close:active{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}.title{order:1;display:flex;min-inline-size:0px;align-items:center;flex:1 1 auto;padding-block:var(--calcite-modal-padding-internal);padding-inline:var(--calcite-modal-padding-large-internal)}slot[name=header]::slotted(*),*::slotted([slot=header]){margin:0;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1);font-size:var(--calcite-modal-title-text-internal)}.content{position:relative;box-sizing:border-box;display:block;block-size:100%;overflow:auto;padding:0;background-color:var(--calcite-modal-content-background, var(--calcite-color-foreground-1));max-block-size:100%;padding:var(--calcite-modal-content-padding, var(--calcite-modal-padding-internal))}.content-top,.content-bottom{z-index:var(--calcite-z-index-header);display:flex;border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1);flex:0 0 auto;padding:var(--calcite-modal-padding-internal)}.content-top{min-inline-size:0px;max-inline-size:100%;border-block-end-width:1px}.content-bottom{margin-block-start:auto;box-sizing:border-box;inline-size:100%;justify-content:space-between;border-block-start-width:1px}.content-top:not(.header~.content-top){border-start-start-radius:.25rem;border-start-end-radius:.25rem}.content-bottom:not(.content-bottom~.footer),.content--no-footer{border-end-end-radius:.25rem;border-end-start-radius:.25rem}slot[name=content]::slotted(*),*::slotted([slot=content]){font-size:var(--calcite-modal-context-text-internal)}.footer{z-index:var(--calcite-z-index-header);margin-block-start:auto;box-sizing:border-box;display:flex;inline-size:100%;justify-content:space-between;border-end-end-radius:.25rem;border-end-start-radius:.25rem;border-width:0px;border-block-start-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1);flex:0 0 auto;padding-block:var(--calcite-modal-padding-internal);padding-inline:var(--calcite-modal-padding-large-internal)}.footer--hide-back .back,.footer--hide-secondary .secondary{display:none}.back{display:block;margin-inline-end:auto}.secondary{margin-inline:.25rem;display:block}slot[name=primary]{display:block}:host([width=small]) .modal{inline-size:auto}:host([width-scale=s]) .modal{max-block-size:100%;max-inline-size:100%;inline-size:var(--calcite-modal-width, 32rem);block-size:var(--calcite-modal-height, auto)}@media screen and (max-width: 35rem){:host([width-scale=s]) .modal{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%}:host([width-scale=s]) .content{flex:1 1 auto;max-block-size:unset}:host([width-scale=s][docked]) .container{align-items:flex-end}}:host([width-scale=m]) .modal{max-block-size:100%;max-inline-size:100%;inline-size:var(--calcite-modal-width, 48rem);block-size:var(--calcite-modal-height, auto)}@media screen and (max-width: 51rem){:host([width-scale=m]) .modal{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%}:host([width-scale=m]) .content{flex:1 1 auto;max-block-size:unset}:host([width-scale=m][docked]) .container{align-items:flex-end}}:host([width-scale=l]) .modal{max-block-size:100%;max-inline-size:100%;inline-size:var(--calcite-modal-width, 94rem);block-size:var(--calcite-modal-height, auto)}@media screen and (max-width: 97rem){:host([width-scale=l]) .modal{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%}:host([width-scale=l]) .content{flex:1 1 auto;max-block-size:unset}:host([width-scale=l][docked]) .container{align-items:flex-end}}:host([fullscreen]) .modal{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;border-radius:0;--calcite-modal-hidden-position: translate3D(0, 20px, 0) scale(.95);--calcite-modal-shown-position: translate3D(0, 0, 0) scale(1)}:host([fullscreen]) .content{max-block-size:100%;flex:1 1 auto}:host([opened][fullscreen]) .header,:host([opened][fullscreen]) .footer,:host([opened][fullscreen]) .content-top,:host([opened][fullscreen]) .content-bottom{border-radius:0}:host([docked]) .modal{block-size:var(--calcite-modal-height, auto)}:host([docked]) .content{block-size:auto;flex:1 1 auto}:host([kind=brand]) .modal{border-color:var(--calcite-color-brand)}:host([kind=danger]) .modal{border-color:var(--calcite-color-status-danger)}:host([kind=info]) .modal{border-color:var(--calcite-color-status-info)}:host([kind=success]) .modal{border-color:var(--calcite-color-status-success)}:host([kind=warning]) .modal{border-color:var(--calcite-color-status-warning)}:host([kind=brand]) .modal,:host([kind=danger]) .modal,:host([kind=info]) .modal,:host([kind=success]) .modal,:host([kind=warning]) .modal{border-width:0px;border-block-start-width:4px;border-style:solid}:host([kind=brand]) .header,:host([kind=brand]) .content-top,:host([kind=danger]) .header,:host([kind=danger]) .content-top,:host([kind=info]) .header,:host([kind=info]) .content-top,:host([kind=success]) .header,:host([kind=success]) .content-top,:host([kind=warning]) .header,:host([kind=warning]) .content-top{border-radius:.25rem;border-end-end-radius:0px;border-end-start-radius:0px}@media screen and (max-width: 860px){* slot[name=header]::slotted(content-top),* content-top::slotted([slot=header]){font-size:var(--calcite-font-size-1)}.footer,.content-bottom{position:sticky;inset-block-end:0px}}@media screen and (max-width: 480px){.footer,.content-bottom{flex-direction:column}.back,.secondary{margin:0;margin-block-end:.25rem}}:host([hidden]){display:none}[hidden]{display:none}`;
class B extends g {
  constructor() {
    super(), this.cssVarObserver = b("mutation", () => {
      this.updateSizeCssVars();
    }), this.focusTrap = $({
      triggerProp: "open",
      focusTrapOptions: {
        // scrim closes on click, so we let it take over
        clickOutsideDeactivates: () => this.embedded,
        escapeDeactivates: (e) => (!e.defaultPrevented && !this.escapeDisabled && (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.usePreventDocumentScroll = C()(this), this.ignoreOpenChange = !1, this.modalContentRef = x(), this.mutationObserver = b("mutation", () => this.focusTrap.updateContainerElements()), this._open = !1, this.openProp = "opened", this.transitionProp = "opacity", this.messages = w(), this.focusSetter = S()(this), this.keyDownHandler = (e) => {
      const { defaultPrevented: o, key: r } = e;
      !o && this.focusTrapDisabled && this.open && !this.escapeDisabled && r === "Escape" && (e.preventDefault(), this.open = !1);
    }, this.hasBack = !1, this.hasContentBottom = !1, this.hasContentTop = !1, this.hasFooter = !1, this.hasPrimary = !1, this.hasSecondary = !1, this.closeButtonDisabled = !1, this.embedded = !1, this.escapeDisabled = !1, this.focusTrapDisabled = !1, this.opened = !1, this.outsideCloseDisabled = !1, this.scale = "m", this.widthScale = "m", this.calciteModalBeforeClose = l({ cancelable: !1 }), this.calciteModalBeforeOpen = l({ cancelable: !1 }), this.calciteModalClose = l({ cancelable: !1 }), this.calciteModalOpen = l({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { contentEl: 16, cssHeight: 16, cssWidth: 16, hasBack: 16, hasContentBottom: 16, hasContentTop: 16, hasFooter: 16, hasPrimary: 16, hasSecondary: 16, titleEl: 16, beforeClose: 0, closeButtonDisabled: 7, docked: 7, embedded: 5, escapeDisabled: 7, focusTrapDisabled: 7, focusTrapOptions: 0, fullscreen: 7, kind: 3, messageOverrides: 0, open: 7, opened: 7, outsideCloseDisabled: 7, scale: 3, widthScale: 3 };
  }
  static {
    this.styles = O;
  }
  get preventDocumentScroll() {
    return !this.embedded;
  }
  get open() {
    return this._open;
  }
  set open(e) {
    const o = this._open;
    e !== o && (this._open = e, this.toggleModal(e));
  }
  async scrollContent(e = 0, o = 0) {
    this.modalContentRef.value && (this.modalContentRef.value.scrollTo ? this.modalContentRef.value.scrollTo({ top: e, left: o, behavior: "smooth" }) : (this.modalContentRef.value.scrollTop = e, this.modalContentRef.value.scrollLeft = o));
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  async updateFocusTrapElements(e) {
    this.focusTrap.setExtraContainers(e), this.focusTrap.updateContainerElements();
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.cssVarObserver?.observe(this.el, { attributeFilter: ["style"] }), this.updateSizeCssVars();
  }
  async load() {
    z.deprecated("component", {
      name: "modal",
      removalVersion: 4,
      suggested: "dialog"
    }), this.open && this.openModal();
  }
  willUpdate(e) {
    (e.has("hasBack") && (this.hasUpdated || this.hasBack !== !1) || e.has("hasPrimary") && (this.hasUpdated || this.hasPrimary !== !1) || e.has("hasSecondary") && (this.hasUpdated || this.hasSecondary !== !1)) && (this.hasFooter = this.hasBack || this.hasPrimary || this.hasSecondary), e.has("opened") && (this.hasUpdated || this.opened !== !1) && this.handleOpenedChange(this.opened);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.cssVarObserver?.disconnect(), this.embedded = !1;
  }
  handleHeaderSlotChange(e) {
    this.titleEl = m(e)[0];
  }
  handleContentSlotChange(e) {
    this.contentEl = m(e)[0];
  }
  handleBackSlotChange(e) {
    this.hasBack = s(e);
  }
  handlePrimarySlotChange(e) {
    this.hasPrimary = s(e);
  }
  handleSecondarySlotChange(e) {
    this.hasSecondary = s(e);
  }
  setTransitionEl(e) {
    e && (this.transitionEl = e);
  }
  onBeforeOpen() {
    this.transitionEl?.classList.add(t.openingActive), this.calciteModalBeforeOpen.emit();
  }
  onOpen() {
    this.transitionEl?.classList.remove(t.openingIdle, t.openingActive), this.focusTrapDisabled && this.setFocus(), this.focusTrap.activate(), this.calciteModalOpen.emit();
  }
  onBeforeClose() {
    this.transitionEl?.classList.add(t.closingActive), this.calciteModalBeforeClose.emit();
  }
  onClose() {
    this.transitionEl?.classList.remove(t.closingIdle, t.closingActive), this.calciteModalClose.emit(), this.focusTrap.deactivate();
  }
  toggleModal(e) {
    this.ignoreOpenChange || (e ? this.openModal() : this.closeModal());
  }
  handleOpenedChange(e) {
    const { transitionEl: o } = this;
    if (!o)
      return;
    const r = e ? t.openingIdle : t.closingIdle;
    o.classList.add(r), k(this);
  }
  handleCloseClick() {
    this.open = !1;
  }
  async openModal() {
    await this.componentOnReady(), this.opened = !0, this.titleId = p(this.titleEl), this.contentId = p(this.contentEl);
  }
  handleOutsideClose() {
    this.outsideCloseDisabled || (this.open = !1);
  }
  async closeModal() {
    if (this.beforeClose)
      try {
        await this.beforeClose(this.el);
      } catch {
        requestAnimationFrame(() => {
          this.ignoreOpenChange = !0, this.open = !0, this.ignoreOpenChange = !1;
        });
        return;
      }
    this.opened = !1;
  }
  updateSizeCssVars() {
    this.cssWidth = getComputedStyle(this.el).getPropertyValue("--calcite-modal-width"), this.cssHeight = getComputedStyle(this.el).getPropertyValue("--calcite-modal-height");
  }
  contentTopSlotChangeHandler(e) {
    this.hasContentTop = s(e);
  }
  contentBottomSlotChangeHandler(e) {
    this.hasContentBottom = s(e);
  }
  render() {
    return c(this.el, "aria-describedby", this.contentId), c(this.el, "aria-labelledby", this.titleId), this.el.ariaModal = "true", this.el.role = "dialog", a`<div class=${i({
      [t.container]: !0,
      [t.containerOpen]: this.opened
    })}><calcite-scrim class=${i(t.scrim)} @click=${this.handleOutsideClose}></calcite-scrim>${this.renderStyle()}<div class=${i({
      [t.modal]: !0
    })} ${h(this.setTransitionEl)}><div class=${i(t.header)}>${this.renderCloseButton()}<header class=${i(t.title)}><slot name=${t.header} @slotchange=${this.handleHeaderSlotChange}></slot></header></div>${this.renderContentTop()}<div class=${i({
      [t.content]: !0,
      [t.contentNoFooter]: !this.hasFooter
    })} ${h(this.modalContentRef)}><slot name=${n.content} @slotchange=${this.handleContentSlotChange}></slot></div>${this.renderContentBottom()}${this.renderFooter()}</div></div>`;
  }
  renderFooter() {
    return d("footer", a`<div class=${i(t.footer)} .hidden=${!this.hasFooter}><span class=${i(t.back)}><slot name=${n.back} @slotchange=${this.handleBackSlotChange}></slot></span><span class=${i(t.secondary)}><slot name=${n.secondary} @slotchange=${this.handleSecondarySlotChange}></slot></span><span class=${i(t.primary)}><slot name=${n.primary} @slotchange=${this.handlePrimarySlotChange}></slot></span></div>`);
  }
  renderContentTop() {
    return a`<div class=${i(t.contentTop)} .hidden=${!this.hasContentTop}><slot name=${n.contentTop} @slotchange=${this.contentTopSlotChangeHandler}></slot></div>`;
  }
  renderContentBottom() {
    return a`<div class=${i(t.contentBottom)} .hidden=${!this.hasContentBottom}><slot name=${n.contentBottom} @slotchange=${this.contentBottomSlotChangeHandler}></slot></div>`;
  }
  renderCloseButton() {
    return this.closeButtonDisabled ? null : d("button", a`<button .ariaLabel=${this.messages.close} class=${i(t.close)} @click=${this.handleCloseClick} title=${this.messages.close ?? f}><calcite-icon .icon=${T.close} .scale=${y(this.scale)}></calcite-icon></button>`);
  }
  renderStyle() {
    if (!this.fullscreen && (this.cssWidth || this.cssHeight))
      return a`<style>${`.${t.container} {
              ${this.docked && this.cssWidth ? "align-items: center !important;" : ""}
            }
            .${t.modal} {
              block-size: ${this.cssHeight ? this.cssHeight : "auto"} !important;
              ${this.cssWidth ? `inline-size: ${this.cssWidth} !important;` : ""}
              ${this.cssWidth ? `max-inline-size: ${this.cssWidth} !important;` : ""}
              ${this.docked ? "border-radius: var(--calcite-border-radius) !important;" : ""}
            }
            @media screen and (max-width: ${this.cssWidth}) {
              .${t.container} {
                ${this.docked ? "align-items: flex-end !important;" : ""}
              }
              .${t.modal} {
                max-block-size: 100% !important;
                inline-size: 100% !important;
                max-inline-size: 100% !important;
                min-inline-size: 100% !important;
                margin: 0 !important;
                ${this.docked ? "" : "block-size: 100% !important;"}
                ${this.docked ? "" : "border-radius: 0 !important;"}
                ${this.docked ? "border-radius: var(--calcite-border-radius) var(--calcite-border-radius) 0 0 !important;" : ""}
              }
            }
          `}</style>`;
  }
}
v("calcite-modal", B);
export {
  B as Modal
};
