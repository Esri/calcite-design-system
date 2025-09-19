import { b as E, L as k, c as a, s as d, E as r, x as C, q as x } from "./index.js";
import { n as h } from "./ref.js";
import { b as n, f } from "./dom.js";
import { d as u, r as O, c as l, b as S, f as P, h as $, F as m } from "./floating-ui.js";
import { g as z } from "./guid.js";
import { u as F, I as H } from "./interactive.js";
import { i as A } from "./key.js";
import { c as w, u as g } from "./observers.js";
import { t as T } from "./openCloseComponent.js";
import { g as B } from "./dynamicClasses.js";
import { u as U } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.1-next.1 */
const L = {
  trigger: "trigger"
}, p = {
  content: "content",
  wrapper: "wrapper",
  triggerContainer: "trigger-container"
}, b = "calcite-dropdown", c = {
  menuButton: (o) => `${b}-${o}-menubutton`,
  menu: (o) => `${b}-${o}-menu`
}, R = E`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}.wrapper{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown);inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.wrapper{opacity:0;inset-block-start:0;left:0}}.wrapper .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.wrapper[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.wrapper[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.wrapper[data-placement^=left] .calcite-floating-ui-anim{left:5px}.wrapper[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.content{max-height:45vh;width:auto;overflow-y:auto;overflow-x:hidden;inline-size:var(--calcite-dropdown-width, var(--calcite-internal-dropdown-width));background-color:var(--calcite-dropdown-background-color, var(--calcite-color-foreground-1))}.trigger-container{position:relative;display:flex;height:100%;flex:1 1 auto;word-wrap:break-word;word-break:break-word}.width-s{--calcite-internal-dropdown-width: 12rem}.width-m{--calcite-internal-dropdown-width: 14rem}.width-l{--calcite-internal-dropdown-width: 16rem}@media (forced-colors: active){:host([open]) .wrapper{border:var(--calcite-border-width-sm) solid canvasText}}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
class G extends k {
  constructor() {
    super(), this.focusLastDropdownItem = !1, this.groups = [], this.guid = z(), this.items = [], this.mutationObserver = w("mutation", () => this.updateItems()), this.transitionProp = "opacity", this.resizeObserver = w("resize", (e) => this.resizeObserverCallback(e)), this.focusSetter = U()(this), this.closeOnSelectDisabled = !1, this.disabled = !1, this.maxItems = 0, this.offsetDistance = 0, this.offsetSkidding = 0, this.open = !1, this.overlayPositioning = "absolute", this.placement = u, this.scale = "m", this.selectedItems = [], this.type = "click", this.calciteDropdownBeforeClose = a({ cancelable: !1 }), this.calciteDropdownBeforeOpen = a({ cancelable: !1 }), this.calciteDropdownClose = a({ cancelable: !1 }), this.calciteDropdownOpen = a({ cancelable: !1 }), this.calciteDropdownSelect = a({ cancelable: !1 }), this.listenOn(window, "click", this.closeCalciteDropdownOnClick), this.listen("calciteInternalDropdownCloseRequest", this.closeCalciteDropdownOnEvent), this.listenOn(window, "calciteDropdownOpen", this.closeCalciteDropdownOnOpenEvent), this.listen("pointerenter", this.pointerEnterHandler), this.listen("pointerleave", this.pointerLeaveHandler), this.listen("calciteInternalDropdownItemKeyEvent", this.calciteInternalDropdownItemKeyEvent), this.listen("calciteInternalDropdownItemSelect", this.handleItemSelect);
  }
  static {
    this.properties = { closeOnSelectDisabled: 7, disabled: 7, flipPlacements: 0, maxItems: 11, offsetDistance: 11, offsetSkidding: 11, open: 7, overlayPositioning: 3, placement: 3, scale: 3, selectedItems: 0, type: 3, widthScale: 3, width: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = R;
  }
  async reposition(e = !1) {
    const { filteredFlipPlacements: t, floatingEl: i, offsetDistance: s, offsetSkidding: v, overlayPositioning: D, placement: y, referenceEl: I } = this;
    return O(this, {
      floatingEl: i,
      referenceEl: I,
      offsetDistance: s,
      offsetSkidding: v,
      overlayPositioning: D,
      placement: y,
      flipPlacements: t,
      type: "menu"
    }, e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.referenceEl, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setFilteredPlacements(), this.updateItems(), l(this);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(this.disabled), e.has("flipPlacements") && this.flipPlacementsHandler(), e.has("maxItems") && this.hasUpdated && this.setMaxScrollerHeight(), this.hasUpdated && (e.has("offsetDistance") && this.offsetDistance !== 0 || e.has("offsetSkidding") && this.offsetSkidding !== 0 || e.has("overlayPositioning") && this.overlayPositioning !== "absolute" || e.has("placement") && this.placement !== u) && this.reposition(!0), e.has("scale") && (this.hasUpdated || this.scale !== "m") && this.handlePropsChange();
  }
  updated() {
    F(this);
  }
  loaded() {
    this.updateSelectedItems(), l(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.resizeObserver?.disconnect(), S(this);
  }
  openHandler() {
    T(this), !this.disabled && this.reposition(!0);
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
        n(s, i, "next");
        break;
      case "ArrowUp":
        n(s, i, "previous");
        break;
      case "Home":
        n(s, i, "first");
        break;
      case "End":
        n(s, i, "last");
        break;
    }
    e.stopPropagation();
  }
  handleItemSelect(e) {
    this.updateSelectedItems(), e.stopPropagation(), this.calciteDropdownSelect.emit(), (!this.closeOnSelectDisabled || e.detail.requestedDropdownGroup.selectionMode === "none") && this.closeCalciteDropdown(), e.stopPropagation();
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? P(t, e) : null;
  }
  updateTriggers(e) {
    this.triggers = e.target.assignedElements({
      flatten: !0
    }), this.reposition(!0);
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
    const s = t.length >= e && e > 0 ? this.getYDistance(i, t[e - 1]) : 0;
    i.style.maxBlockSize = s > 0 ? `${s}px` : "", this.reposition(!0);
  }
  setScrollerAndTransitionEl(e) {
    g(this.resizeObserver, this.scrollerEl, e), this.scrollerEl = e, this.transitionEl = e;
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
    this.calciteDropdownClose.emit(), $(this);
  }
  setReferenceEl(e) {
    g(this.resizeObserver, this.referenceEl, e), this.referenceEl = e, l(this);
  }
  setFloatingEl(e) {
    this.floatingEl = e, l(this);
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
      A(i) ? (this.toggleDropdown(), e.preventDefault()) : (i === "ArrowDown" || i === "ArrowUp") && (e.preventDefault(), this.focusLastDropdownItem = i === "ArrowUp", this.open = !0);
    }
  }
  updateSelectedItems() {
    this.selectedItems = this.items.filter((e) => e.selected);
  }
  getYDistance(e, t) {
    const i = e.getBoundingClientRect();
    return t.getBoundingClientRect().bottom - i.top;
  }
  closeCalciteDropdown(e = !0) {
    this.open = !1, e && f(this.triggers[0]);
  }
  focusOnFirstActiveOrDefaultItem() {
    const t = this.getTraversableItems().find((i) => i.selected) || (this.focusLastDropdownItem ? this.items[this.items.length - 1] : this.items[0]);
    this.focusLastDropdownItem = !1, t && f(t);
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
    return H({ disabled: this.disabled, children: C`<div class=${d(p.triggerContainer)} id=${c.menuButton(t) ?? r} @click=${this.toggleDropdown} @keydown=${this.keyDownHandler} ${h(this.setReferenceEl)}><slot aria-controls=${c.menu(t) ?? r} .ariaExpanded=${e} aria-haspopup=menu name=${L.trigger} @slotchange=${this.updateTriggers}></slot></div><div .ariaHidden=${!e} class=${d({
      [p.wrapper]: !0,
      [B("width", this.width, this.widthScale)]: !!(this.width || this.widthScale)
    })} ${h(this.setFloatingEl)}><div aria-labelledby=${c.menuButton(t) ?? r} class=${d({
      [p.content]: !0,
      [m.animation]: !0,
      [m.animationActive]: e
    })} id=${c.menu(t) ?? r} role=menu ${h(this.setScrollerAndTransitionEl)}><slot @slotchange=${this.updateGroups}></slot></div></div>` });
  }
}
x("calcite-dropdown", G);
export {
  G as Dropdown
};
