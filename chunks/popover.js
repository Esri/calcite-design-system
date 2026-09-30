/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as x, L as w, c as s, s as o, b as h, d as k } from "./index.js";
import { i as f } from "./keyed.js";
import { e as P, n as u } from "./ref.js";
import { u as C } from "./index2.js";
import { b as m, r as E, c as D, e as z, f as F, h as O, F as v } from "./floating-ui.js";
import { t as $ } from "./openCloseComponent.js";
import { H as L } from "./Heading.js";
import { c as T } from "./observers.js";
import { F as B } from "./FloatingArrow.js";
import { u as S } from "./useT9n.js";
import { u as H } from "./useFocusTrap.js";
import { u as U } from "./useSetFocus.js";
import { u as _ } from "./useTopLayer.js";
import { u as A, r as j } from "./manager.js";
const i = {
  positionContainer: "position-container",
  container: "container",
  closeButtonContainer: "close-button-container",
  closeButton: "close-button",
  content: "content",
  hasHeader: "has-header",
  header: "header",
  headerContainer: "header-container",
  heading: "heading"
}, g = "auto", I = x`:host{display:contents}:host([top-layer-disabled]){--calcite-floating-ui-z-index: var(--calcite-z-index-popup)}.position-container{inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.position-container{opacity:0;inset-block-start:0;left:0}}.position-container{max-inline-size:var(--calcite-popover-max-size-x, 100vw)}.position-container[popover]{padding:0;margin:0;border:none;background-color:transparent;overflow:visible;display:none}.position-container:popover-open{display:block}.position-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.position-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.position-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.position-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.position-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.position-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.position-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}:host([scale=s]) .heading{padding:.5rem .75rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}:host(:is([scale=s],[scale=m])){--calcite-internal-popover-close-spacing: var(--calcite-spacing-xs)}:host([scale=m]) .heading{padding:.75rem 1rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]){--calcite-internal-popover-close-spacing: var(--calcite-spacing-sm)}:host([scale=l]) .heading{padding:1rem 1.25rem;font-size:var(--calcite-font-size-relative-lg);line-height:var(--calcite-font-line-height-relative-snug)}.position-container .calcite-floating-ui-anim{border-width:1px;border-style:solid;box-shadow:var(--calcite-shadow-md);background-color:var(--calcite-popover-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-popover-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-round))}.calcite-floating-ui-arrow{fill:var(--calcite-popover-background-color, var(--calcite-color-foreground-1))}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-popover-border-color, var(--calcite-color-border-3))}.header{display:flex;flex:1 1 auto;align-items:stretch;justify-content:flex-start;border-width:0px;border-bottom-width:1px;border-style:solid;border-block-end-color:var(--calcite-popover-border-color, var(--calcite-color-border-3))}.heading{margin:0;display:block;flex:1 1 auto;align-self:center;white-space:normal;font-weight:var(--calcite-font-weight-medium);word-wrap:break-word;word-break:break-word;color:var(--calcite-popover-text-color, var(--calcite-color-text-1))}.header-container{position:relative;display:flex;height:100%;flex-direction:row;flex-wrap:nowrap;border-radius:.25rem;color:var(--calcite-popover-text-color, var(--calcite-color-text-1))}.header-container.has-header{flex-direction:column}.content{display:flex;height:100%;width:100%;flex-direction:column;flex-wrap:nowrap;align-self:center;word-wrap:break-word;word-break:break-word}.close-button{margin:auto;margin-inline-end:var(--calcite-internal-popover-close-spacing)}.close-button-container{display:flex;flex:0 0 auto}::slotted(calcite-panel),::slotted(calcite-flow){height:100%}:host([hidden]){display:none}[hidden]{display:none}`, M = j({ click: !0 });
class b extends w {
  constructor() {
    super(...arguments), this.referenceElementType = "click", this.referenceElementController = A({ manager: M })(this), this.direction = C(), this.focusTrap = H({
      triggerProp: "open",
      focusTrapOptions: {
        allowOutsideClick: !0,
        escapeDeactivates: (e) => (e.defaultPrevented || (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.mutationObserver = T("mutation", () => this.focusTrap.updateContainerElements()), this.transitionProp = "opacity", this.transitionRef = P(), this.messages = S(), this.focusSetter = U()(this), this.topLayer = _({
      disabledOverride: () => this.open && !this.referenceEl,
      target: () => this.floatingEl
    })(this), this.floatingLayout = "vertical", this.autoClose = !1, this.closable = !1, this.flipDisabled = !1, this.focusTrapDisabled = !1, this.offsetDistance = m, this.offsetSkidding = 0, this.open = !1, this.overlayPositioning = "absolute", this.placement = g, this.pointerDisabled = !1, this.scale = "m", this.topLayerDisabled = !1, this.triggerDisabled = !1, this.calcitePopoverBeforeClose = s({ cancelable: !1 }), this.calcitePopoverBeforeOpen = s({ cancelable: !1 }), this.calcitePopoverClose = s({ cancelable: !1 }), this.calcitePopoverOpen = s({ cancelable: !1 });
  }
  static {
    this.properties = { floatingLayout: 16, referenceEl: 16, autoClose: 7, closable: 7, flipDisabled: 7, flipPlacements: 0, focusTrapDisabled: 7, focusTrapOptions: 0, heading: 1, headingLevel: 11, label: 1, messageOverrides: 0, offsetDistance: 11, offsetSkidding: 11, open: 7, overlayPositioning: 3, placement: 3, pointerDisabled: 7, referenceElement: 1, scale: 3, topLayerDisabled: 7, triggerDisabled: 7 };
  }
  static {
    this.styles = I;
  }
  async reposition(e = !1) {
    const { referenceEl: t, placement: a, overlayPositioning: n, flipDisabled: l, filteredFlipPlacements: c, offsetDistance: r, offsetSkidding: d, arrowEl: p, floatingEl: y } = this;
    return E(this, {
      direction: this.direction,
      floatingEl: y,
      referenceEl: t,
      overlayPositioning: n,
      placement: a,
      flipDisabled: l,
      flipPlacements: c,
      offsetDistance: r,
      offsetSkidding: d,
      arrowEl: p,
      type: "popover"
    }, e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  async updateFocusTrapElements(e) {
    this.focusTrap.setExtraContainers(e), this.focusTrap.updateContainerElements();
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setFilteredPlacements();
  }
  willUpdate(e) {
    e.has("flipPlacements") && this.flipPlacementsHandler(), e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), (e.has("offsetDistance") && (this.hasUpdated || this.offsetDistance !== m) || e.has("offsetSkidding") && (this.hasUpdated || this.offsetSkidding !== 0) || e.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") || e.has("placement") && (this.hasUpdated || this.placement !== g)) && this.reposition(!0), e.has("referenceElement") && !this.referenceElement && this.open && this.topLayer.hide();
  }
  updated(e) {
    e.has("referenceEl") && D(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), z(this);
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements(), this.reposition(!0);
  }
  openHandler() {
    $(this), this.reposition(!0);
  }
  setFloatingEl(e) {
    this.floatingEl = e;
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? F(t, e) : void 0;
  }
  hide() {
    this.open = !1;
  }
  onBeforeOpen() {
    this.calcitePopoverBeforeOpen.emit(), this.topLayer.show();
  }
  onOpen() {
    this.calcitePopoverOpen.emit(), this.focusTrap.activate();
  }
  onBeforeClose() {
    this.calcitePopoverBeforeClose.emit();
  }
  onClose() {
    this.calcitePopoverClose.emit(), O(this), this.focusTrap.deactivate(), this.topLayer.hide();
  }
  setArrowEl(e) {
    this.arrowEl = e, this.reposition(!0);
  }
  renderCloseButton() {
    const { messages: e, closable: t } = this;
    return t ? f(i.closeButtonContainer, h`<div class=${o(i.closeButtonContainer)}><calcite-action class=${o(i.closeButton)} icon=x @click=${this.hide} .scale=${this.scale} .text=${e.close}></calcite-action></div>`) : null;
  }
  renderHeader() {
    const { heading: e, headingLevel: t } = this, a = e ? L({ class: i.heading, level: t, children: e }) : null;
    return a ? f(i.header, h`<div class=${o(i.header)}>${a}${this.renderCloseButton()}</div>`) : null;
  }
  render() {
    const { referenceEl: e, heading: t, label: a, open: n, pointerDisabled: l, floatingLayout: c } = this, r = e && n, d = !r, p = l ? null : f("floating-arrow", B({ floatingLayout: c, ref: this.setArrowEl }));
    return this.el.inert = d, this.el.ariaLabel = a, this.el.ariaLive = "polite", this.el.role = "dialog", h`<div class=${o(i.positionContainer)} popover=manual ${u(this.setFloatingEl)}><div class=${o({
      [i.container]: !0,
      [v.animation]: !0,
      [v.animationActive]: r
    })} ${u(this.transitionRef)}>${p}<div class=${o({
      [i.hasHeader]: !!t,
      [i.headerContainer]: !0
    })}>${this.renderHeader()}<div class=${o(i.content)}><slot></slot></div>${t ? null : this.renderCloseButton()}</div></div></div>`;
  }
}
k("calcite-popover", b);
const oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Popover: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  g as d,
  oe as p
};
