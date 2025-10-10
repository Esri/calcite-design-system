import { b as O, L as x, c as n, s as u, E as c, x as S, q as P } from "./index.js";
import { n as m } from "./ref.js";
import { b as d, f as b, H as g } from "./dom.js";
import { d as v, r as $, c as p, b as F, f as z, h as H, F as D } from "./floating-ui.js";
import { g as A } from "./guid.js";
import { u as T, I as U } from "./interactive.js";
import { i as B } from "./key.js";
import { c as y, u as I } from "./observers.js";
import { t as L } from "./openCloseComponent.js";
import { g as R } from "./dynamicClasses.js";
import { u as G } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = (a, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(a, e, t), t);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(a) {
  return (e, t) => {
    const { slot: i, selector: s } = a ?? {}, o = "slot" + (i ? `[name=${i}]` : ":not([name])");
    return K(e, t, { get() {
      const r = this.renderRoot?.querySelector(o), l = r?.assignedElements(a) ?? [];
      return s === void 0 ? l : l.filter(((f) => f.matches(s)));
    } });
  };
}
const k = {
  trigger: "trigger"
}, w = {
  content: "content",
  wrapper: "wrapper",
  triggerContainer: "trigger-container"
}, E = "calcite-dropdown", h = {
  menuButton: (a) => `${E}-${a}-menubutton`,
  menu: (a) => `${E}-${a}-menu`
}, q = O`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}.wrapper{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown);inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.wrapper{opacity:0;inset-block-start:0;left:0}}.wrapper .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.wrapper[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.wrapper[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.wrapper[data-placement^=left] .calcite-floating-ui-anim{left:5px}.wrapper[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.content{max-height:45vh;width:auto;overflow-y:auto;overflow-x:hidden;inline-size:var(--calcite-dropdown-width, var(--calcite-internal-dropdown-width));background-color:var(--calcite-dropdown-background-color, var(--calcite-color-foreground-1))}.trigger-container{position:relative;display:flex;height:100%;flex:1 1 auto;word-wrap:break-word;word-break:break-word}.width-s{--calcite-internal-dropdown-width: 12rem}.width-m{--calcite-internal-dropdown-width: 14rem}.width-l{--calcite-internal-dropdown-width: 16rem}@media (forced-colors: active){:host([open]) .wrapper{border:var(--calcite-border-width-sm) solid canvasText}}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
var W = Object.defineProperty, _ = (a, e, t, i) => {
  for (var s = void 0, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (s = r(e, t, s) || s);
  return s && W(e, t, s), s;
};
class C extends x {
  constructor() {
    super(), this.focusLastDropdownItem = !1, this.groups = [], this.guid = A(), this.items = [], this.mutationObserver = y("mutation", () => this.updateItems()), this.transitionProp = "opacity", this.resizeObserver = y("resize", (e) => this.resizeObserverCallback(e)), this.focusSetter = G()(this), this.closeOnSelectDisabled = !1, this.disabled = !1, this.maxItems = 0, this.offsetDistance = 0, this.offsetSkidding = 0, this.open = !1, this.overlayPositioning = "absolute", this.placement = v, this.scale = "m", this.selectedItems = [], this.type = "click", this.calciteDropdownBeforeClose = n({ cancelable: !1 }), this.calciteDropdownBeforeOpen = n({ cancelable: !1 }), this.calciteDropdownClose = n({ cancelable: !1 }), this.calciteDropdownOpen = n({ cancelable: !1 }), this.calciteDropdownSelect = n({ cancelable: !1 }), this.listenOn(window, "click", this.closeCalciteDropdownOnClick), this.listen("calciteInternalDropdownCloseRequest", this.closeCalciteDropdownOnEvent), this.listenOn(window, "calciteDropdownOpen", this.closeCalciteDropdownOnOpenEvent), this.listen("pointerenter", this.pointerEnterHandler), this.listen("pointerleave", this.pointerLeaveHandler), this.listen("calciteInternalDropdownItemKeyEvent", this.calciteInternalDropdownItemKeyEvent), this.listen("calciteInternalDropdownItemSelect", this.handleItemSelect);
  }
  static {
    this.properties = { closeOnSelectDisabled: 7, disabled: 7, flipPlacements: 0, maxItems: 11, offsetDistance: 11, offsetSkidding: 11, open: 7, overlayPositioning: 3, placement: 3, scale: 3, selectedItems: 0, type: 3, widthScale: 3, width: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = q;
  }
  async reposition(e = !1) {
    const { filteredFlipPlacements: t, floatingEl: i, offsetDistance: s, offsetSkidding: o, overlayPositioning: r, placement: l, referenceEl: f } = this;
    return $(this, {
      floatingEl: i,
      referenceEl: f,
      offsetDistance: s,
      offsetSkidding: o,
      overlayPositioning: r,
      placement: l,
      flipPlacements: t,
      type: "menu"
    }, e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.referenceEl, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setFilteredPlacements(), this.updateItems(), p(this);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(this.disabled), e.has("flipPlacements") && this.flipPlacementsHandler(), e.has("maxItems") && this.hasUpdated && this.setMaxScrollerHeight(), this.hasUpdated && (e.has("offsetDistance") && this.offsetDistance !== 0 || e.has("offsetSkidding") && this.offsetSkidding !== 0 || e.has("overlayPositioning") && this.overlayPositioning !== "absolute" || e.has("placement") && this.placement !== v) && this.reposition(!0), e.has("scale") && (this.hasUpdated || this.scale !== "m") && this.handlePropsChange();
  }
  updated() {
    T(this);
  }
  loaded() {
    this.updateSelectedItems(), p(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.resizeObserver?.disconnect(), F(this);
  }
  openHandler() {
    L(this), !this.disabled && this.reposition(!0);
  }
  handleDisabledChange(e) {
    e || (this.open = !1);
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements(), this.reposition(!0);
  }
  handlePropsChange() {
    this.updateItems(), this.updateGroupProps();
  }
  closeCalciteDropdownOnClick(e) {
    this.disabled || !this.open || e.composedPath().includes(this.el) || this.closeCalciteDropdown(!1);
  }
  closeCalciteDropdownOnEvent(e) {
    this.closeCalciteDropdown(), e.stopPropagation();
  }
  closeCalciteDropdownOnOpenEvent(e) {
    e.composedPath().includes(this.el) || (this.open = !1);
  }
  pointerEnterHandler() {
    this.disabled || this.type !== "hover" || this.toggleDropdown();
  }
  pointerLeaveHandler() {
    this.disabled || this.type !== "hover" || this.closeCalciteDropdown();
  }
  getTraversableItems() {
    return this.items.filter((e) => !e.disabled && !e.hidden);
  }
  calciteInternalDropdownItemKeyEvent(e) {
    const { keyboardEvent: t } = e.detail, i = t.target, s = this.getTraversableItems();
    switch (t.key) {
      case "Tab":
        this.open = !1, this.updateTabIndexOfItems(i);
        break;
      case "ArrowDown":
        d(s, i, "next");
        break;
      case "ArrowUp":
        d(s, i, "previous");
        break;
      case "Home":
        d(s, i, "first");
        break;
      case "End":
        d(s, i, "last");
        break;
    }
    e.stopPropagation();
  }
  handleItemSelect(e) {
    this.updateSelectedItems(), e.stopPropagation(), this.calciteDropdownSelect.emit(), this.closeOnSelectDisabled || this.closeCalciteDropdown();
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? z(t, e) : null;
  }
  updateItems() {
    this.items = this.groups.map((e) => Array.from(e?.querySelectorAll("calcite-dropdown-item"))).reduce((e, t) => [...e, ...t], []), this.updateSelectedItems(), this.reposition(!0), this.items.forEach((e) => e.scale = this.scale);
  }
  updateGroups(e) {
    const t = e.target.assignedElements({ flatten: !0 }).filter((i) => i?.matches("calcite-dropdown-group"));
    this.groups = t, this.updateItems(), this.updateGroupProps();
  }
  updateGroupProps() {
    this.groups.forEach((e, t) => {
      e.scale = this.scale, e.position = t;
    });
  }
  resizeObserverCallback(e) {
    e.forEach(({ target: t }) => {
      t === this.referenceEl ? this.setDropdownWidth() : t === this.scrollerEl && this.setMaxScrollerHeight();
    });
  }
  setDropdownWidth() {
    const { referenceEl: e, scrollerEl: t } = this;
    !t || !e || (t.style.minWidth = `${e.clientWidth}px`);
  }
  setMaxScrollerHeight() {
    const { maxItems: e, items: t, scrollerEl: i } = this;
    if (!i)
      return;
    const s = t.length >= e && e > 0 ? this.getYDistanceFromScroller(t.at(e - 1)) : 0;
    i.style.maxBlockSize = s > 0 ? `${s}px` : "", this.reposition(!0);
  }
  setScrollerAndTransitionEl(e) {
    I(this.resizeObserver, this.scrollerEl, e), this.scrollerEl = e, this.transitionEl = e;
  }
  onBeforeOpen() {
    this.focusOnFirstActiveOrDefaultItem(), this.calciteDropdownBeforeOpen.emit();
  }
  onOpen() {
    this.calciteDropdownOpen.emit();
  }
  onBeforeClose() {
    this.calciteDropdownBeforeClose.emit();
  }
  onClose() {
    this.calciteDropdownClose.emit(), H(this);
  }
  setReferenceEl(e) {
    I(this.resizeObserver, this.referenceEl, e), this.referenceEl = e, p(this);
  }
  setFloatingEl(e) {
    this.floatingEl = e, p(this);
  }
  keyDownHandler(e) {
    if (!e.composedPath().includes(this.referenceEl))
      return;
    const { defaultPrevented: t, key: i } = e;
    if (!t) {
      if (i === "Escape") {
        this.closeCalciteDropdown(), e.preventDefault();
        return;
      }
      if (this.open && e.shiftKey && i === "Tab") {
        this.closeCalciteDropdown(), e.preventDefault();
        return;
      }
      B(i) ? (this.toggleDropdown(), e.preventDefault()) : (i === "ArrowDown" || i === "ArrowUp") && (e.preventDefault(), this.focusLastDropdownItem = i === "ArrowUp", this.open = !0);
    }
  }
  updateSelectedItems() {
    this.selectedItems = this.items.filter((e) => e.selected);
  }
  getYDistanceFromScroller(e) {
    const t = e.getBoundingClientRect();
    return e.offsetTop + t.height;
  }
  closeCalciteDropdown(e = !0) {
    this.open = !1, e && b(this.triggerEls[0]);
  }
  async focusOnFirstActiveOrDefaultItem() {
    const t = this.getTraversableItems().find((i) => i.selected) || (this.focusLastDropdownItem ? this.items.at(-1) : this.items[0]);
    this.focusLastDropdownItem = !1, t && (await this.updateComplete, await g(), await g(), await b(t), t.scrollIntoView({ block: "nearest" }));
  }
  toggleDropdown() {
    this.open = !this.open;
  }
  updateTabIndexOfItems(e) {
    this.items.forEach((t) => {
      t.tabIndex = e !== t ? -1 : 0;
    });
  }
  render() {
    const { open: e, guid: t } = this;
    return U({ disabled: this.disabled, children: S`<div class=${u(w.triggerContainer)} id=${h.menuButton(t) ?? c} @click=${this.toggleDropdown} @keydown=${this.keyDownHandler} ${m(this.setReferenceEl)}><slot aria-controls=${h.menu(t) ?? c} .ariaExpanded=${e} aria-haspopup=menu name=${k.trigger}></slot></div><div .ariaHidden=${!e} class=${u({
      [w.wrapper]: !0,
      [R("width", this.width, this.widthScale)]: !!(this.width || this.widthScale)
    })} ${m(this.setFloatingEl)}><div aria-labelledby=${h.menuButton(t) ?? c} class=${u({
      [w.content]: !0,
      [D.animation]: !0,
      [D.animationActive]: e
    })} id=${h.menu(t) ?? c} role=menu ${m(this.setScrollerAndTransitionEl)}><slot @slotchange=${this.updateGroups}></slot></div></div>` });
  }
}
_([
  M({ slot: k.trigger })
], C.prototype, "triggerEls");
P("calcite-dropdown", C);
export {
  C as Dropdown
};
