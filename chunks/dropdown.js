/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as b, L as I, c as r, s as c, b as h, d as y } from "./index.js";
import { e as D, n as l } from "./ref.js";
import { u as x } from "./index2.js";
import { F as p } from "./dom.js";
import { d as m, r as C, c as a, e as A, f as S, h as k, F as f } from "./floating-ui.js";
import { i as u } from "./key.js";
import { c as v, u as w } from "./observers.js";
import { t as O } from "./openCloseComponent.js";
import { g as T } from "./dynamicClasses.js";
import { i as H } from "./resources16.js";
import { u as P } from "./useSetFocus.js";
import { u as L } from "./useInteractive.js";
import { u as F } from "./useTopLayer.js";
import { u as $, r as z } from "./manager.js";
const B = {
  trigger: "trigger"
}, d = {
  content: "content",
  wrapper: "wrapper",
  triggerContainer: "trigger-container"
}, M = b`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}.wrapper{inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.wrapper{opacity:0;inset-block-start:0;left:0}}:host([top-layer-disabled]) .wrapper{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown)}.wrapper[popover]{padding:0;margin:0;border:none;background-color:transparent;overflow:visible;display:none}.wrapper:popover-open{display:block}.wrapper .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.wrapper[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.wrapper[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.wrapper[data-placement^=left] .calcite-floating-ui-anim{left:5px}.wrapper[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.wrapper .calcite-floating-ui-anim{box-shadow:var(--calcite-shadow-md)}.content{width:auto;overflow-y:auto;overflow-x:hidden;inline-size:var(--calcite-dropdown-width, var(--calcite-internal-dropdown-width));background-color:var(--calcite-dropdown-background-color, var(--calcite-color-foreground-1));max-block-size:var(--calcite-dropdown-max-height, 45vh)}.trigger-container{position:relative;display:flex;height:100%;flex:1 1 auto;overflow-wrap:break-word;word-break:break-word}.width-s{--calcite-internal-dropdown-width: 12rem}.width-m{--calcite-internal-dropdown-width: 14rem}.width-l{--calcite-internal-dropdown-width: 16rem}@media(forced-colors:active){:host([open]) .wrapper{border:var(--calcite-border-width-sm) solid canvasText}}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`, R = z({ click: !0, hover: !0 });
class U extends I {
  constructor() {
    super(), this.referenceElementController = $({ manager: R })(this), this.direction = x(), this.focusLastDropdownItem = !1, this.activeItemIndex = -1, this.groups = [], this.items = [], this.mutationObserver = v("mutation", () => this.updateItems()), this.transitionProp = "opacity", this.resizeObserver = v("resize", (e) => this.resizeObserverCallback(e)), this.triggerSlotRef = D(), this.onReferenceElementKeyDown = (e) => this.keyDownHandler(e), this.focusSetter = P()(this), this.interactiveContainer = L(this), this.topLayer = F({
      target: () => this.floatingEl
    })(this), this.closeOnSelectDisabled = !1, this.disabled = !1, this.maxItems = 0, this.offsetDistance = 0, this.offsetSkidding = 0, this.open = !1, this.overlayPositioning = "absolute", this.placement = m, this.scale = "m", this.selectedItems = [], this.topLayerDisabled = !1, this.type = "click", this.calciteDropdownBeforeClose = r({ cancelable: !1 }), this.calciteDropdownBeforeOpen = r({ cancelable: !1 }), this.calciteDropdownClose = r({ cancelable: !1 }), this.calciteDropdownOpen = r({ cancelable: !1 }), this.calciteDropdownSelect = r({ cancelable: !1 }), this.listenOn(window, "click", this.closeCalciteDropdownOnClick), this.listenOn(window, "calciteDropdownOpen", this.closeCalciteDropdownOnOpenEvent), this.listen("pointerenter", this.pointerEnterHandler), this.listen("pointerleave", this.pointerLeaveHandler), this.listen("calciteInternalDropdownItemSelect", this.handleItemSelect);
  }
  static {
    this.properties = { activeDescendantElement: 16, referenceEl: 16, closeOnSelectDisabled: 7, disabled: 7, flipPlacements: 0, maxItems: 11, offsetDistance: 11, offsetSkidding: 11, open: 7, overlayPositioning: 3, placement: 3, referenceElement: 1, scale: 3, selectedItems: 0, topLayerDisabled: 7, type: 3, widthScale: 3, width: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = M;
  }
  get referenceElementType() {
    return this.referenceElement ? this.type : void 0;
  }
  get autoClose() {
    return !0;
  }
  async reposition(e = !1) {
    const { filteredFlipPlacements: t, floatingEl: i, offsetDistance: s, offsetSkidding: n, overlayPositioning: o, placement: g, referenceEl: E } = this;
    return C(this, {
      direction: this.direction,
      floatingEl: i,
      referenceEl: E,
      offsetDistance: s,
      offsetSkidding: n,
      overlayPositioning: o,
      placement: g,
      flipPlacements: t,
      type: "menu"
    }, e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.referenceEl instanceof HTMLElement ? this.referenceEl : this.floatingEl, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setFilteredPlacements(), this.updateItems(), a(this);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(this.disabled), e.has("flipPlacements") && this.flipPlacementsHandler(), e.has("maxItems") && this.hasUpdated && this.setMaxScrollerHeight(), this.hasUpdated && (e.has("offsetDistance") && this.offsetDistance !== 0 || e.has("offsetSkidding") && this.offsetSkidding !== 0 || e.has("overlayPositioning") && this.overlayPositioning !== "absolute" || e.has("placement") && this.placement !== m) && this.reposition(!0), e.has("scale") && (this.hasUpdated || this.scale !== "m") && this.handlePropsChange(), e.has("referenceElement") && !this.referenceElement && this.open && this.topLayer.hide();
  }
  updated(e) {
    if (e.has("referenceEl") && this.referenceElementType) {
      const t = e.get("referenceEl");
      t instanceof HTMLElement && (t.ariaActiveDescendantElement = null), this.syncActiveDescendantOwnerElement(), a(this);
    }
  }
  loaded() {
    this.updateSelectedItems(), a(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    const e = this.triggerSlotRef.value;
    e && (e.ariaActiveDescendantElement = null), this.referenceEl instanceof HTMLElement && (this.referenceEl.ariaActiveDescendantElement = null), this.mutationObserver?.disconnect(), this.resizeObserver?.disconnect(), A(this);
  }
  openHandler() {
    this.disabled || (O(this), this.reposition(!0));
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
    this.referenceElementType || this.disabled || !this.open || e.composedPath().includes(this.el) || this.closeCalciteDropdown();
  }
  closeCalciteDropdownOnOpenEvent(e) {
    this.referenceElementType || e.composedPath().includes(this.el) || this.closeCalciteDropdown();
  }
  pointerEnterHandler() {
    this.referenceElementType || this.disabled || this.type !== "hover" || (this.open = !0);
  }
  pointerLeaveHandler() {
    this.referenceElementType || this.disabled || this.type !== "hover" || this.closeCalciteDropdown();
  }
  getTraversableItems() {
    return this.items.filter((e) => !e.disabled && !e.hidden);
  }
  async handleItemSelect(e) {
    this.updateSelectedItems(), this.syncActiveItemFromTraversableItems(), e.stopPropagation(), this.calciteDropdownSelect.emit(), await this.setFocus(), this.closeOnSelectDisabled || this.closeCalciteDropdown();
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? S(t, e) : void 0;
  }
  updateItems() {
    this.items = this.groups.map((e) => Array.from(e?.querySelectorAll("calcite-dropdown-item"))).reduce((e, t) => [...e, ...t], []), this.updateSelectedItems(), this.syncActiveItemFromTraversableItems(), this.reposition(!0), this.items.forEach((e) => e.scale = this.scale);
  }
  updateGroups(e) {
    const t = e.target.assignedElements({ flatten: !0 }).filter(H);
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
    !t || !(e instanceof HTMLElement) || (t.style.minWidth = `${e.clientWidth}px`);
  }
  setMaxScrollerHeight() {
    const { maxItems: e, items: t, scrollerEl: i } = this;
    if (!i)
      return;
    const s = t.length >= e && e > 0 ? this.getYDistanceFromScroller(t.at(e - 1)) : 0;
    i.style.maxBlockSize = s > 0 ? `${s}px` : "", this.reposition(!0);
  }
  setScrollerAndTransitionEl(e) {
    w(this.resizeObserver, this.scrollerEl, e), this.scrollerEl = e, this.transitionEl = e;
  }
  onBeforeOpen() {
    this.setInitialActiveItem(), this.calciteDropdownBeforeOpen.emit(), this.topLayer.show();
  }
  onOpen() {
    this.calciteDropdownOpen.emit();
  }
  onBeforeClose() {
    this.calciteDropdownBeforeClose.emit();
  }
  onClose() {
    this.calciteDropdownClose.emit(), this.syncActiveDescendantOwnerElement(), k(this), this.topLayer.hide();
  }
  setReferenceEl(e) {
    const t = this.referenceEl instanceof HTMLElement ? this.referenceEl : void 0, i = e instanceof HTMLElement ? e : void 0;
    w(this.resizeObserver, t, i), !(this.referenceElementType || !i) && (this.referenceEl = e, this.syncActiveDescendantOwnerElement(), a(this));
  }
  setFloatingEl(e) {
    this.floatingEl = e, a(this);
  }
  handleTriggerSlotChange() {
    this.syncActiveDescendantOwnerElement();
  }
  keyDownHandler(e) {
    if (!(this.referenceEl instanceof HTMLElement) || !e.composedPath().includes(this.referenceEl))
      return;
    const { defaultPrevented: t, key: i } = e;
    if (!t) {
      if (this.open && i === "Escape") {
        this.closeCalciteDropdown(), e.preventDefault();
        return;
      }
      if (!this.open && u(i)) {
        this.open = !0, e.preventDefault();
        return;
      }
      if (!this.open && (i === "ArrowDown" || i === "ArrowUp")) {
        e.preventDefault(), this.focusLastDropdownItem = i === "ArrowUp", this.open = !0;
        return;
      }
      if (this.open) {
        if (i === "Tab") {
          this.closeCalciteDropdown();
          return;
        }
        if (i === "ArrowDown") {
          e.preventDefault(), this.navigateActiveItem("next");
          return;
        }
        if (i === "ArrowUp") {
          e.preventDefault(), this.navigateActiveItem("previous");
          return;
        }
        if (i === "Home") {
          e.preventDefault(), this.navigateActiveItem("first");
          return;
        }
        if (i === "End") {
          e.preventDefault(), this.navigateActiveItem("last");
          return;
        }
        u(i) && (e.preventDefault(), this.activateActiveItem());
      }
    }
  }
  updateSelectedItems() {
    this.selectedItems = this.items.filter((e) => e.selected);
  }
  getYDistanceFromScroller(e) {
    const { scrollerEl: t } = this;
    return !e || !t ? NaN : e.getBoundingClientRect().bottom - t.getBoundingClientRect().top + t.scrollTop;
  }
  closeCalciteDropdown() {
    this.open = !1, this.setActiveItemByIndex(-1);
  }
  async setInitialActiveItem() {
    const e = this.getTraversableItems(), t = this.focusLastDropdownItem ? e.at(-1) : e[0];
    if (this.focusLastDropdownItem = !1, !t) {
      this.setActiveItemByIndex(-1);
      return;
    }
    const i = e.findIndex((s) => s === t);
    this.setActiveItemByIndex(i), await this.scrollActiveItemIntoView(t);
  }
  syncActiveItemFromTraversableItems() {
    const e = this.getTraversableItems();
    if (!e.length) {
      this.setActiveItemByIndex(-1);
      return;
    }
    if (this.activeItemIndex < 0 || this.activeItemIndex >= e.length) {
      this.setActiveItemByIndex(0);
      return;
    }
    this.updateActiveDescendantElement(e[this.activeItemIndex]);
  }
  setActiveItemByIndex(e) {
    this.activeItemIndex = e;
    const t = this.getTraversableItems(), i = e >= 0 ? t[e] : null;
    this.updateActiveDescendantElement(i);
  }
  updateActiveDescendantElement(e) {
    this.items.forEach((t) => {
      t.activeDescendant = t === e;
    }), this.activeDescendantElement = e ?? void 0, this.syncActiveDescendantOwnerElement();
  }
  syncActiveDescendantOwnerElement() {
    const { referenceEl: e, referenceElementType: t } = this, i = this.triggerSlotRef.value, s = this.open ? this.activeDescendantElement ?? null : null, n = e instanceof HTMLElement ? e : null, o = !!t;
    i && (i.ariaActiveDescendantElement = o ? null : s), n && (n.ariaActiveDescendantElement = o ? s : null);
  }
  navigateActiveItem(e) {
    const t = this.getTraversableItems();
    if (!t.length)
      return;
    const i = t.length;
    let s = this.activeItemIndex;
    s < 0 || s >= i ? s = e === "previous" || e === "last" ? i - 1 : 0 : e === "next" ? s = (s + 1) % i : e === "previous" ? s = (s - 1 + i) % i : e === "first" ? s = 0 : e === "last" && (s = i - 1);
    const n = t[s];
    this.setActiveItemByIndex(s), this.scrollActiveItemIntoView(n);
  }
  async scrollActiveItemIntoView(e) {
    e && (await this.updateComplete, await p(), await p(), e.scrollIntoView({ block: "nearest" }));
  }
  activateActiveItem() {
    const e = this.getTraversableItems(), t = e[this.activeItemIndex] || e[0];
    t && (this.setActiveItemByIndex(e.findIndex((i) => i === t)), t.activateItem());
  }
  openHoverDropdown() {
    this.open || this.disabled || this.type !== "hover" || (this.open = !0);
  }
  closeHoverDropdown(e) {
    if (!this.open || this.disabled || this.type !== "hover")
      return;
    const t = e.relatedTarget;
    t && (this.el.contains(t) || this.referenceEl != null && this.referenceEl instanceof HTMLElement && this.referenceEl.contains(t)) || this.closeCalciteDropdown();
  }
  toggleClickDropdown() {
    this.disabled || this.type !== "click" || (this.open = !this.open);
  }
  render() {
    const { open: e } = this;
    return this.interactiveContainer({ disabled: this.disabled, children: h`${this.referenceElementType ? null : h`<div class=${c(d.triggerContainer)} @click=${this.toggleClickDropdown} @focusin=${this.openHoverDropdown} @focusout=${this.closeHoverDropdown} @keydown=${this.keyDownHandler} ${l(this.setReferenceEl)}><slot .ariaControlsElements=${this.scrollerEl ? [this.scrollerEl] : void 0} .ariaExpanded=${e} aria-haspopup=menu name=${B.trigger} @slotchange=${this.handleTriggerSlotChange} ${l(this.triggerSlotRef)}></slot></div>`}<div class=${c({
      [d.wrapper]: !0,
      [T("width", this.width, this.widthScale)]: !!(this.width || this.widthScale)
    })} .inert=${!e} popover=manual ${l(this.setFloatingEl)}><div .ariaLabelledByElements=${this.referenceEl instanceof HTMLElement ? [this.referenceEl] : void 0} class=${c({
      [d.content]: !0,
      [f.animation]: !0,
      [f.animationActive]: e
    })} role=menu ${l(this.setScrollerAndTransitionEl)}><slot @slotchange=${this.updateGroups}></slot></div></div>` });
  }
}
y("calcite-dropdown", U);
export {
  U as Dropdown
};
