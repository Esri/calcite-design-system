import { b as x, L as k, c as n, s, x as f, A as C, q as D } from "./index.js";
import { i as u } from "./keyed.js";
import { n as m } from "./ref.js";
import { e as v, r as A, b as L, f as $, c as F, h as z, F as g } from "./floating-ui.js";
import { e as H, E as O, t as T, q as R } from "./dom.js";
import { g as B } from "./guid.js";
import { t as S } from "./openCloseComponent.js";
import { H as U } from "./Heading.js";
import { c as I } from "./observers.js";
import { F as q } from "./FloatingArrow.js";
import { g as _ } from "./component.js";
import { u as N } from "./useT9n.js";
import { u as X } from "./useFocusTrap.js";
import { u as M } from "./useSetFocus.js";
import { i as Y } from "./key.js";
import { d as b, A as w, a as E, C as o } from "./resources15.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const K = 5;
function j({
  startX: l,
  startY: e,
  endX: t,
  endY: i
}) {
  return Math.hypot(t - l, i - e) > K;
}
class V {
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
      e.defaultPrevented || (e.key === "Escape" ? this.closeAllPopovers() : Y(e.key) && this.togglePopovers(e));
    }, this.pointerDownHandler = (e) => {
      if (e.defaultPrevented || !H(e))
        return;
      const { clientX: t, clientY: i } = e;
      this.pointerDownPosition = { x: t, y: i };
    }, this.clickHandler = (e) => {
      O(e) || e.defaultPrevented || this.pointerDownPosition && j({
        endY: e.clientY,
        endX: e.clientX,
        startY: this.pointerDownPosition.y,
        startX: this.pointerDownPosition.x
      }) || (this.pointerDownPosition = void 0, this.togglePopovers(e));
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
    window.addEventListener("pointerdown", this.pointerDownHandler), window.addEventListener("click", this.clickHandler), window.addEventListener("keydown", this.keyDownHandler);
  }
  removeListeners() {
    window.removeEventListener("pointerdown", this.pointerDownHandler), window.removeEventListener("click", this.clickHandler), window.removeEventListener("keydown", this.keyDownHandler);
  }
}
const G = x`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:contents;--calcite-floating-ui-z-index: var(--calcite-popover-z-index, var(--calcite-z-index-popup))}.position-container{inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.position-container{opacity:0;inset-block-start:0;left:0}}.position-container{max-inline-size:var(--calcite-popover-max-size-x, 100vw)}.position-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.position-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.position-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.position-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.position-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.position-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.position-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}:host([scale=s]) .heading{padding:.5rem .75rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .heading{padding:.75rem 1rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .heading{padding:1rem 1.25rem;font-size:var(--calcite-font-size-1);line-height:1.375}.position-container .calcite-floating-ui-anim{border-width:1px;border-style:solid;background-color:var(--calcite-popover-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-popover-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-round))}.calcite-floating-ui-arrow{fill:var(--calcite-popover-background-color, var(--calcite-color-foreground-1))}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-popover-border-color, var(--calcite-color-border-3))}.header{display:flex;flex:1 1 auto;align-items:stretch;justify-content:flex-start;border-width:0px;border-bottom-width:1px;border-style:solid;border-block-end-color:var(--calcite-popover-border-color, var(--calcite-color-border-3))}.heading{margin:0;display:block;flex:1 1 auto;align-self:center;white-space:normal;font-weight:var(--calcite-font-weight-medium);word-wrap:break-word;word-break:break-word;color:var(--calcite-popover-text-color, var(--calcite-color-text-1))}.header-container{position:relative;display:flex;height:100%;flex-direction:row;flex-wrap:nowrap;border-radius:.25rem;color:var(--calcite-popover-text-color, var(--calcite-color-text-1))}.header-container.has-header{flex-direction:column}.content{display:flex;height:100%;width:100%;flex-direction:column;flex-wrap:nowrap;align-self:center;word-wrap:break-word;word-break:break-word}.close-button-container{display:flex;overflow:hidden;flex:0 0 auto;border-start-end-radius:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-round));border-end-end-radius:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-round));--calcite-action-corner-radius-start-end: var(--calcite-popover-corner-radius, var(--calcite-corner-radius-sharp));--calcite-action-corner-radius-end-end: var(--calcite-popover-corner-radius, var(--calcite-corner-radius-sharp))}::slotted(calcite-panel),::slotted(calcite-flow){height:100%}:host([hidden]){display:none}[hidden]{display:none}`, y = new V();
class J extends k {
  constructor() {
    super(...arguments), this.focusTrap = X({
      triggerProp: "open",
      focusTrapOptions: {
        allowOutsideClick: !0,
        escapeDeactivates: (e) => (e.defaultPrevented || (this.open = !1, e.preventDefault()), !1)
      }
    })(this), this.guid = `calcite-popover-${B()}`, this.hasLoaded = !1, this.mutationObserver = I("mutation", () => this.focusTrap.updateContainerElements()), this.transitionProp = "opacity", this.messages = N(), this.focusSetter = M()(this), this.floatingLayout = "vertical", this.autoClose = !1, this.closable = !1, this.flipDisabled = !1, this.focusTrapDisabled = !1, this.offsetDistance = v, this.offsetSkidding = 0, this.open = !1, this.overlayPositioning = "absolute", this.placement = b, this.pointerDisabled = !1, this.scale = "m", this.triggerDisabled = !1, this.calcitePopoverBeforeClose = n({ cancelable: !1 }), this.calcitePopoverBeforeOpen = n({ cancelable: !1 }), this.calcitePopoverClose = n({ cancelable: !1 }), this.calcitePopoverOpen = n({ cancelable: !1 });
  }
  static {
    this.properties = { floatingLayout: 16, referenceEl: 16, autoClose: 7, closable: 7, flipDisabled: 7, flipPlacements: 0, focusTrapDisabled: 7, focusTrapOptions: 0, heading: 1, headingLevel: 11, label: 1, messageOverrides: 0, offsetDistance: 11, offsetSkidding: 11, open: 7, overlayPositioning: 3, placement: 3, pointerDisabled: 7, referenceElement: 1, scale: 3, triggerDisabled: 7 };
  }
  static {
    this.styles = G;
  }
  async reposition(e = !1) {
    const { referenceEl: t, placement: i, overlayPositioning: r, flipDisabled: c, filteredFlipPlacements: d, offsetDistance: a, offsetSkidding: p, arrowEl: h, floatingEl: P } = this;
    return A(this, {
      floatingEl: P,
      referenceEl: t,
      overlayPositioning: r,
      placement: i,
      flipDisabled: c,
      flipPlacements: d,
      offsetDistance: a,
      offsetSkidding: p,
      arrowEl: h,
      type: "popover"
    }, e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  async updateFocusTrapElements() {
    this.focusTrap.updateContainerElements();
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setFilteredPlacements(), requestAnimationFrame(() => this.setUpReferenceElement(this.hasLoaded));
  }
  willUpdate(e) {
    e.has("flipPlacements") && this.flipPlacementsHandler(), e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), (e.has("offsetDistance") && (this.hasUpdated || this.offsetDistance !== v) || e.has("offsetSkidding") && (this.hasUpdated || this.offsetSkidding !== 0) || e.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") || e.has("placement") && (this.hasUpdated || this.placement !== b)) && this.reposition(!0), e.has("referenceElement") && this.referenceElementHandler();
  }
  loaded() {
    this.referenceElement && !this.referenceEl && this.setUpReferenceElement(), this.hasLoaded = !0;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.removeReferences(), L(this);
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
    this.filteredFlipPlacements = t ? $(t, e) : null;
  }
  setUpReferenceElement(e = !0) {
    this.removeReferences(), this.referenceEl = this.getReferenceElement(), F(this);
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
    e && "setAttribute" in e && e.setAttribute(w, T(t));
  }
  addReferences() {
    const { referenceEl: e } = this;
    if (!e)
      return;
    const t = this.getId();
    "setAttribute" in e && e.setAttribute(E, t), y.registerElement(e, this.el), this.setExpandedAttr();
  }
  removeReferences() {
    const { referenceEl: e } = this;
    e && ("removeAttribute" in e && (e.removeAttribute(E), e.removeAttribute(w)), y.unregisterElement(e));
  }
  getReferenceElement() {
    const { referenceElement: e, el: t } = this;
    return (typeof e == "string" ? R(t, { id: e }) : e) || null;
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
    this.calcitePopoverClose.emit(), z(this), this.focusTrap.deactivate();
  }
  storeArrowEl(e) {
    this.arrowEl = e, this.reposition(!0);
  }
  renderCloseButton() {
    const { messages: e, closable: t } = this;
    return t ? u(o.closeButtonContainer, f`<div class=${s(o.closeButtonContainer)}><calcite-action appearance=transparent class=${s(o.closeButton)} @click=${this.hide} .scale=${this.scale} .text=${e.close}><calcite-icon icon=x .scale=${_(this.scale)}></calcite-icon></calcite-action></div>`) : null;
  }
  renderHeader() {
    const { heading: e, headingLevel: t } = this, i = e ? U({ class: o.heading, level: t, children: e }) : null;
    return i ? u(o.header, f`<div class=${s(o.header)}>${i}${this.renderCloseButton()}</div>`) : null;
  }
  render() {
    const { referenceEl: e, heading: t, label: i, open: r, pointerDisabled: c, floatingLayout: d } = this, a = e && r, p = !a, h = c ? null : u("floating-arrow", q({ floatingLayout: d, ref: this.storeArrowEl }));
    return this.el.inert = p, this.el.ariaLabel = i, this.el.ariaLive = "polite", C(this.el, "id", this.getId()), this.el.role = "dialog", f`<div class=${s(o.positionContainer)} ${m(this.setFloatingEl)}><div class=${s({
      [o.container]: !0,
      [g.animation]: !0,
      [g.animationActive]: a
    })} ${m(this.setTransitionEl)}>${h}<div class=${s({
      [o.hasHeader]: !!t,
      [o.headerContainer]: !0
    })}>${this.renderHeader()}<div class=${s(o.content)}><slot></slot></div>${t ? null : this.renderCloseButton()}</div></div></div>`;
  }
}
D("calcite-popover", J);
export {
  J as Popover
};
