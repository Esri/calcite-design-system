import { a as k, L as P, d as n, s, x as h, k as C, c as A } from "./iframe.js";
import { i as f } from "./keyed.js";
import { e as D, n as u } from "./ref.js";
import { e as m, r as F, b as $, f as L, c as z, h as O, F as v } from "./floating-ui.js";
import { F as H, f as T, t as R, q as B } from "./dom.js";
import { g as U } from "./guid.js";
import { t as S } from "./openCloseComponent.js";
import { H as I } from "./Heading.js";
import { c as q, g as _ } from "./component.js";
import { c as N } from "./observers.js";
import { F as M } from "./FloatingArrow.js";
import { u as K } from "./useT9n.js";
import { u as j } from "./useFocusTrap.js";
import { i as V } from "./key.js";
import { d as g, A as b, a as E, C as o } from "./resources13.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.19 */
class X {
  constructor() {
    this.registeredElements = /* @__PURE__ */ new Map(), this.registeredElementCount = 0, this.queryPopover = (e) => {
      const { registeredElements: t } = this, i = e.find((r) => t.has(r));
      return t.get(i);
    }, this.togglePopovers = (e) => {
      const t = e.composedPath(), i = this.queryPopover(t);
      i && !i.triggerDisabled && (i.open = !i.open), Array.from(this.registeredElements.values()).filter(
        (r) => r !== i && r.autoClose && r.open && !t.includes(r)
      ).forEach((r) => r.open = !1);
    }, this.keyDownHandler = (e) => {
      e.defaultPrevented || (e.key === "Escape" ? this.closeAllPopovers() : V(e.key) && this.togglePopovers(e));
    }, this.clickHandler = (e) => {
      H(e) || e.defaultPrevented || this.togglePopovers(e);
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  registerElement(e, t) {
    this.registeredElementCount++, this.registeredElements.set(e, t), this.registeredElementCount === 1 && this.addListeners();
  }
  unregisterElement(e) {
    this.registeredElements.delete(e) && this.registeredElementCount--, this.registeredElementCount === 0 && this.removeListeners();
  }
  closeAllPopovers() {
    Array.from(this.registeredElements.values()).forEach((e) => e.open = !1);
  }
  addListeners() {
    window.addEventListener("click", this.clickHandler), window.addEventListener("keydown", this.keyDownHandler);
  }
  removeListeners() {
    window.removeEventListener("click", this.clickHandler), window.removeEventListener("keydown", this.keyDownHandler);
  }
}
const G = k`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:contents;--calcite-floating-ui-z-index: var(--calcite-popover-z-index, var(--calcite-z-index-popup))}.position-container{inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}.position-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset,left,opacity;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.position-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.position-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.position-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.position-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.position-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}:host([scale=s]) .heading{padding:.5rem .75rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .heading{padding:.75rem 1rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .heading{padding:1rem 1.25rem;font-size:var(--calcite-font-size-1);line-height:1.375}.position-container .calcite-floating-ui-anim{border-width:1px;border-style:solid;background-color:var(--calcite-popover-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-popover-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-round))}.calcite-floating-ui-arrow{fill:var(--calcite-popover-background-color, var(--calcite-color-foreground-1))}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-popover-border-color, var(--calcite-color-border-3))}.header{display:flex;flex:1 1 auto;align-items:stretch;justify-content:flex-start;border-width:0px;border-bottom-width:1px;border-style:solid;border-block-end-color:var(--calcite-popover-border-color, var(--calcite-color-border-3))}.heading{margin:0;display:block;flex:1 1 auto;align-self:center;white-space:normal;font-weight:var(--calcite-font-weight-medium);word-wrap:break-word;word-break:break-word;color:var(--calcite-popover-text-color, var(--calcite-color-text-1))}.header-container{position:relative;display:flex;height:100%;flex-direction:row;flex-wrap:nowrap;border-radius:.25rem;color:var(--calcite-popover-text-color, var(--calcite-color-text-1))}.header-container.has-header{flex-direction:column}.content{display:flex;height:100%;width:100%;flex-direction:column;flex-wrap:nowrap;align-self:center;word-wrap:break-word;word-break:break-word}.close-button-container{display:flex;overflow:hidden;flex:0 0 auto;border-start-end-radius:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-round));border-end-end-radius:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-round));--calcite-action-corner-radius-start-end: var(--calcite-popover-corner-radius, var(--calcite-corner-radius-sharp));--calcite-action-corner-radius-end-end: var(--calcite-popover-corner-radius, var(--calcite-corner-radius-sharp))}::slotted(calcite-panel),::slotted(calcite-flow){height:100%}:host([hidden]){display:none}[hidden]{display:none}`, w = new X();
class J extends P {
  constructor() {
    super(...arguments), this.closeButtonEl = D(), this.focusTrap = j({
      triggerProp: "open",
      focusTrapOptions: {
        allowOutsideClick: !0,
        escapeDeactivates: (e) => (e.defaultPrevented || (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.guid = `calcite-popover-${U()}`, this.hasLoaded = !1, this.mutationObserver = N("mutation", () => this.focusTrap.updateContainerElements()), this.transitionProp = "opacity", this.messages = K(), this.floatingLayout = "vertical", this.autoClose = !1, this.closable = !1, this.flipDisabled = !1, this.focusTrapDisabled = !1, this.offsetDistance = m, this.offsetSkidding = 0, this.open = !1, this.overlayPositioning = "absolute", this.placement = g, this.pointerDisabled = !1, this.scale = "m", this.triggerDisabled = !1, this.calcitePopoverBeforeClose = n({ cancelable: !1 }), this.calcitePopoverBeforeOpen = n({ cancelable: !1 }), this.calcitePopoverClose = n({ cancelable: !1 }), this.calcitePopoverOpen = n({ cancelable: !1 });
  }
  static {
    this.properties = { floatingLayout: 16, referenceEl: 16, autoClose: 7, closable: 7, flipDisabled: 7, flipPlacements: 0, focusTrapDisabled: 7, focusTrapOptions: 0, heading: 1, headingLevel: 11, label: 1, messageOverrides: 0, offsetDistance: 11, offsetSkidding: 11, open: 7, overlayPositioning: 3, placement: 3, pointerDisabled: 7, referenceElement: 1, scale: 3, triggerDisabled: 7 };
  }
  static {
    this.styles = G;
  }
  async reposition(e = !1) {
    const { referenceEl: t, placement: i, overlayPositioning: r, flipDisabled: l, filteredFlipPlacements: c, offsetDistance: a, offsetSkidding: d, arrowEl: p, floatingEl: x } = this;
    return F(this, {
      floatingEl: x,
      referenceEl: t,
      overlayPositioning: r,
      placement: i,
      flipDisabled: l,
      flipPlacements: c,
      offsetDistance: a,
      offsetSkidding: d,
      arrowEl: p,
      type: "popover"
    }, e);
  }
  async setFocus() {
    await q(this), this.requestUpdate(), T(this.el);
  }
  async updateFocusTrapElements() {
    this.focusTrap.updateContainerElements();
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setFilteredPlacements(), requestAnimationFrame(() => this.setUpReferenceElement(this.hasLoaded));
  }
  willUpdate(e) {
    e.has("flipPlacements") && this.flipPlacementsHandler(), e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), (e.has("offsetDistance") && (this.hasUpdated || this.offsetDistance !== m) || e.has("offsetSkidding") && (this.hasUpdated || this.offsetSkidding !== 0) || e.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") || e.has("placement") && (this.hasUpdated || this.placement !== g)) && this.reposition(!0), e.has("referenceElement") && this.referenceElementHandler();
  }
  loaded() {
    this.referenceElement && !this.referenceEl && this.setUpReferenceElement(), this.hasLoaded = !0;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.removeReferences(), $(this);
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements(), this.reposition(!0);
  }
  openHandler() {
    S(this), this.reposition(!0), this.setExpandedAttr();
  }
  referenceElementHandler() {
    this.setUpReferenceElement(), this.reposition(!0);
  }
  setFloatingEl(e) {
    this.floatingEl = e, e && requestAnimationFrame(() => this.setUpReferenceElement());
  }
  setTransitionEl(e) {
    e && (this.transitionEl = e);
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? L(t, e) : null;
  }
  setUpReferenceElement(e = !0) {
    this.removeReferences(), this.referenceEl = this.getReferenceElement(), z(this);
    const { el: t, referenceElement: i, referenceEl: r } = this;
    e && i && !r && console.warn(`${t.tagName}: reference-element id "${i}" was not found.`, {
      el: t
    }), this.addReferences();
  }
  getId() {
    return this.el.id || this.guid;
  }
  setExpandedAttr() {
    const { referenceEl: e, open: t } = this;
    e && "setAttribute" in e && e.setAttribute(b, R(t));
  }
  addReferences() {
    const { referenceEl: e } = this;
    if (!e)
      return;
    const t = this.getId();
    "setAttribute" in e && e.setAttribute(E, t), w.registerElement(e, this.el), this.setExpandedAttr();
  }
  removeReferences() {
    const { referenceEl: e } = this;
    e && ("removeAttribute" in e && (e.removeAttribute(E), e.removeAttribute(b)), w.unregisterElement(e));
  }
  getReferenceElement() {
    const { referenceElement: e, el: t } = this;
    return (typeof e == "string" ? B(t, { id: e }) : e) || null;
  }
  hide() {
    this.open = !1;
  }
  onBeforeOpen() {
    this.calcitePopoverBeforeOpen.emit();
  }
  onOpen() {
    this.calcitePopoverOpen.emit(), this.focusTrap.activate();
  }
  onBeforeClose() {
    this.calcitePopoverBeforeClose.emit();
  }
  onClose() {
    this.calcitePopoverClose.emit(), O(this), this.focusTrap.deactivate();
  }
  storeArrowEl(e) {
    this.arrowEl = e, this.reposition(!0);
  }
  renderCloseButton() {
    const { messages: e, closable: t } = this;
    return t ? f(o.closeButtonContainer, h`<div class=${s(o.closeButtonContainer)}><calcite-action appearance=transparent class=${s(o.closeButton)} @click=${this.hide} .scale=${this.scale} .text=${e.close} ${u(this.closeButtonEl)}><calcite-icon icon=x .scale=${_(this.scale)}></calcite-icon></calcite-action></div>`) : null;
  }
  renderHeader() {
    const { heading: e, headingLevel: t } = this, i = e ? I({ class: o.heading, level: t, children: e }) : null;
    return i ? f(o.header, h`<div class=${s(o.header)}>${i}${this.renderCloseButton()}</div>`) : null;
  }
  render() {
    const { referenceEl: e, heading: t, label: i, open: r, pointerDisabled: l, floatingLayout: c } = this, a = e && r, d = !a, p = l ? null : f("floating-arrow", M({ floatingLayout: c, ref: this.storeArrowEl }));
    return this.el.inert = d, this.el.ariaLabel = i, this.el.ariaLive = "polite", C(this.el, "id", this.getId()), this.el.role = "dialog", h`<div class=${s(o.positionContainer)} ${u(this.setFloatingEl)}><div class=${s({
      [o.container]: !0,
      [v.animation]: !0,
      [v.animationActive]: a
    })} ${u(this.setTransitionEl)}>${p}<div class=${s({
      [o.hasHeader]: !!t,
      [o.headerContainer]: !0
    })}>${this.renderHeader()}<div class=${s(o.content)}><slot></slot></div>${t ? null : this.renderCloseButton()}</div></div></div>`;
  }
}
A("calcite-popover", J);
export {
  J as Popover
};
