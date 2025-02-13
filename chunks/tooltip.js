import { j as T, L as E, n as r, w, x as b, s as c, k } from "./iframe.js";
import { n as d } from "./ref.js";
import { e as h, r as C, b as H, h as y, c as L, F as p } from "./floating-ui.js";
import { g as O } from "./guid.js";
import { o as S } from "./openCloseComponent.js";
import { F as x } from "./FloatingArrow.js";
import { q as R, I as A } from "./dom.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const u = {
  positionContainer: "position-container",
  container: "container"
}, P = 300, I = 500, f = "aria-describedby";
function v(n) {
  const { referenceElement: e } = n;
  return (typeof e == "string" ? R(n, { id: e }) : e) || null;
}
class z {
  constructor() {
    this.registeredElements = /* @__PURE__ */ new WeakMap(), this.registeredShadowRootCounts = /* @__PURE__ */ new WeakMap(), this.hoverOpenTimeout = null, this.hoverCloseTimeout = null, this.activeTooltip = null, this.registeredElementCount = 0, this.clickedTooltip = null, this.queryTooltip = (e) => {
      const { registeredElements: t } = this, i = e.find((o) => t.has(o));
      return t.get(i);
    }, this.keyDownHandler = (e) => {
      if (e.key === "Escape" && !e.defaultPrevented) {
        const { activeTooltip: t } = this;
        if (t?.open) {
          this.clearHoverTimeout(), this.closeActiveTooltip();
          const i = v(t), o = e.composedPath();
          (i instanceof Element && o.includes(i) || o.includes(t)) && e.preventDefault();
        }
      }
    }, this.pointerMoveHandler = (e) => {
      if (e.defaultPrevented)
        return;
      const t = e.composedPath(), { activeTooltip: i } = this, o = this.queryTooltip(t);
      if (this.pathHasOpenTooltip(o, t)) {
        this.clearHoverTimeout();
        return;
      }
      o !== this.clickedTooltip && (o ? this.openHoveredTooltip(o) : i?.open && this.closeHoveredTooltip(), this.clickedTooltip = null);
    }, this.clickHandler = (e) => {
      if (e.defaultPrevented)
        return;
      this.clickedTooltip = null;
      const t = e.composedPath(), i = this.queryTooltip(t);
      if (this.pathHasOpenTooltip(i, t)) {
        this.clearHoverTimeout();
        return;
      }
      if (this.closeActiveTooltip(), !!i) {
        if (this.clearHoverTimeout(), i.closeOnClick) {
          this.clickedTooltip = i, this.toggleTooltip(i, !1);
          return;
        }
        this.toggleTooltip(i, !0);
      }
    }, this.blurHandler = () => {
      this.closeActiveTooltip();
    }, this.focusInHandler = (e) => {
      if (e.defaultPrevented)
        return;
      const t = e.composedPath(), i = this.queryTooltip(t);
      if (this.pathHasOpenTooltip(i, t)) {
        this.clearHoverTimeout();
        return;
      }
      i !== this.clickedTooltip && (this.clickedTooltip = null, this.closeTooltipIfNotActive(i), i && this.toggleFocusedTooltip(i, !0));
    }, this.openHoveredTooltip = (e) => {
      this.hoverOpenTimeout = window.setTimeout(
        () => {
          this.hoverOpenTimeout !== null && (this.clearHoverCloseTimeout(), this.closeTooltipIfNotActive(e), this.toggleTooltip(e, !0));
        },
        this.activeTooltip?.open ? 0 : P
      );
    }, this.closeHoveredTooltip = () => {
      this.hoverCloseTimeout = window.setTimeout(() => {
        this.hoverCloseTimeout !== null && this.closeActiveTooltip();
      }, I);
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  registerElement(e, t) {
    this.registeredElementCount++, this.registeredElements.set(e, t);
    const i = this.getReferenceElShadowRootNode(e);
    i && this.registerShadowRoot(i), this.registeredElementCount === 1 && this.addListeners();
  }
  unregisterElement(e) {
    const t = this.getReferenceElShadowRootNode(e);
    t && this.unregisterShadowRoot(t), this.registeredElements.delete(e) && this.registeredElementCount--, this.registeredElementCount === 0 && this.removeListeners();
  }
  pathHasOpenTooltip(e, t) {
    const { activeTooltip: i } = this;
    return i?.open && t.includes(i) || e?.open && t.includes(e);
  }
  addShadowListeners(e) {
    e.addEventListener("focusin", this.focusInHandler);
  }
  removeShadowListeners(e) {
    e.removeEventListener("focusin", this.focusInHandler);
  }
  addListeners() {
    window.addEventListener("keydown", this.keyDownHandler), window.addEventListener("pointermove", this.pointerMoveHandler), window.addEventListener("click", this.clickHandler), window.addEventListener("focusin", this.focusInHandler), window.addEventListener("blur", this.blurHandler);
  }
  removeListeners() {
    window.removeEventListener("keydown", this.keyDownHandler), window.removeEventListener("pointermove", this.pointerMoveHandler), window.removeEventListener("click", this.clickHandler), window.removeEventListener("focusin", this.focusInHandler), window.removeEventListener("blur", this.blurHandler);
  }
  clearHoverOpenTimeout() {
    window.clearTimeout(this.hoverOpenTimeout), this.hoverOpenTimeout = null;
  }
  clearHoverCloseTimeout() {
    window.clearTimeout(this.hoverCloseTimeout), this.hoverCloseTimeout = null;
  }
  clearHoverTimeout() {
    this.clearHoverOpenTimeout(), this.clearHoverCloseTimeout();
  }
  closeTooltipIfNotActive(e) {
    this.activeTooltip !== e && this.closeActiveTooltip();
  }
  closeActiveTooltip() {
    const { activeTooltip: e } = this;
    e?.open && this.toggleTooltip(e, !1);
  }
  toggleFocusedTooltip(e, t) {
    t && this.clearHoverTimeout(), this.toggleTooltip(e, t);
  }
  toggleTooltip(e, t) {
    e.open = t, this.activeTooltip = t ? e : null;
  }
  registerShadowRoot(e) {
    const { registeredShadowRootCounts: t } = this, i = t.get(e), o = Math.min((typeof i == "number" ? i : 0) + 1, 1);
    o === 1 && this.addShadowListeners(e), t.set(e, o);
  }
  unregisterShadowRoot(e) {
    const { registeredShadowRootCounts: t } = this, i = t.get(e), o = Math.max((typeof i == "number" ? i : 1) - 1, 0);
    o === 0 && this.removeShadowListeners(e), t.set(e, o);
  }
  getReferenceElShadowRootNode(e) {
    return e instanceof Element ? A(e) : null;
  }
}
const D = T`:host{display:contents;--calcite-floating-ui-z-index: var(--calcite-tooltip-z-index, var(--calcite-z-index-tooltip))}.position-container{inline-size:max-content;display:none;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}.position-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset,left,opacity;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.position-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.position-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.position-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.position-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.position-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}.container{position:relative;overflow:hidden;padding:.75rem 1rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-medium);border-radius:var(--calcite-tooltip-corner-radius, var(--calcite-corner-radius-round));color:var(--calcite-tooltip-text-color, var(--calcite-color-text-1));max-inline-size:20rem;max-block-size:20rem;text-align:start}.position-container .calcite-floating-ui-anim{border-width:1px;border-style:solid;background-color:var(--calcite-tooltip-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-tooltip-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-tooltip-corner-radius, var(--calcite-corner-radius-round))}.calcite-floating-ui-arrow{fill:var(--calcite-tooltip-background-color, var(--calcite-color-foreground-1))}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-tooltip-border-color, var(--calcite-color-border-3))}:host([hidden]){display:none}[hidden]{display:none}`, m = new z();
class U extends E {
  constructor() {
    super(...arguments), this.guid = `calcite-tooltip-${O()}`, this.transitionProp = "opacity", this.floatingLayout = "vertical", this.closeOnClick = !1, this.offsetDistance = h, this.offsetSkidding = 0, this.open = !1, this.overlayPositioning = "absolute", this.placement = "auto", this.calciteTooltipBeforeClose = r({ cancelable: !1 }), this.calciteTooltipBeforeOpen = r({ cancelable: !1 }), this.calciteTooltipClose = r({ cancelable: !1 }), this.calciteTooltipOpen = r({ cancelable: !1 });
  }
  static {
    this.properties = { floatingLayout: 16, referenceEl: 16, closeOnClick: 7, label: 1, offsetDistance: 11, offsetSkidding: 11, open: 7, overlayPositioning: 3, placement: 3, referenceElement: 1 };
  }
  static {
    this.styles = D;
  }
  // #endregion
  // #region Public Methods
  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  async reposition(e = !1) {
    const { referenceEl: t, placement: i, overlayPositioning: o, offsetDistance: s, offsetSkidding: l, arrowEl: a, floatingEl: g } = this;
    return C(this, {
      floatingEl: g,
      referenceEl: t,
      overlayPositioning: o,
      placement: i,
      offsetDistance: s,
      offsetSkidding: l,
      arrowEl: a,
      type: "tooltip"
    }, e);
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), this.setUpReferenceElement(!0);
  }
  willUpdate(e) {
    (e.has("offsetDistance") && (this.hasUpdated || this.offsetDistance !== h) || e.has("offsetSkidding") && (this.hasUpdated || this.offsetSkidding !== 0) || e.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") || e.has("placement") && (this.hasUpdated || this.placement !== "auto")) && this.reposition(!0), e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("referenceElement") && this.setUpReferenceElement();
  }
  loaded() {
    this.referenceElement && !this.referenceEl && this.setUpReferenceElement();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeReferences(), H(this);
  }
  // #endregion
  // #region Private Methods
  openHandler() {
    S(this), this.reposition(!0);
  }
  onBeforeOpen() {
    this.calciteTooltipBeforeOpen.emit();
  }
  onOpen() {
    this.calciteTooltipOpen.emit();
  }
  onBeforeClose() {
    this.calciteTooltipBeforeClose.emit();
  }
  onClose() {
    this.calciteTooltipClose.emit(), y(this);
  }
  setFloatingEl(e) {
    this.floatingEl = e, e && requestAnimationFrame(() => this.setUpReferenceElement());
  }
  setTransitionEl(e) {
    this.transitionEl = e;
  }
  setUpReferenceElement(e = !0) {
    this.removeReferences(), this.referenceEl = v(this.el), L(this);
    const { el: t, referenceElement: i, referenceEl: o } = this;
    e && i && !o && console.warn(`${t.tagName}: reference-element id "${i}" was not found.`, {
      el: t
    }), this.addReferences();
  }
  getId() {
    return this.el.id || this.guid;
  }
  addReferences() {
    const { referenceEl: e } = this;
    if (!e)
      return;
    const t = this.getId();
    "setAttribute" in e && e.setAttribute(f, t), m.registerElement(e, this.el);
  }
  removeReferences() {
    const { referenceEl: e } = this;
    e && ("removeAttribute" in e && e.removeAttribute(f), m.unregisterElement(e));
  }
  // #endregion
  // #region Rendering
  render() {
    const { referenceEl: e, label: t, open: i, floatingLayout: o } = this, s = e && i, l = !s;
    return this.el.inert = l, this.el.ariaLabel = t, this.el.ariaLive = "polite", w(this.el, "id", this.getId()), this.el.role = "tooltip", b`<div class=${c(u.positionContainer)} ${d(this.setFloatingEl)}><div class=${c({
      [p.animation]: !0,
      [p.animationActive]: s
    })} ${d(this.setTransitionEl)}>${x({ floatingLayout: o, ref: (a) => this.arrowEl = a })}<div class=${c(u.container)}><slot></slot></div></div></div>`;
  }
}
k("calcite-tooltip", U);
export {
  U as Tooltip
};
