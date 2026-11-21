/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as K, L as Y, d as I, s as D, b as R, f as J } from "./index.js";
import { n as O } from "./ref.js";
import { m as j, u as Q } from "./index2.js";
import { a as X, t as Z, r as ee, J as H, K as F } from "./dom.js";
import { d as L, r as te, c as w, e as ie, f as se, h as ne, F as $ } from "./floating-ui.js";
import { i as z } from "./key.js";
import { c as M, u as U } from "./observers.js";
import { t as oe } from "./openCloseComponent.js";
import { g as re } from "./dynamicClasses.js";
import { i as ae } from "./resources16.js";
import { u as W } from "./useFocusable.js";
import { u as le } from "./useInteractive.js";
import { u as ce } from "./useTopLayer.js";
import { u as de, r as he } from "./manager.js";
const E = /* @__PURE__ */ new WeakMap();
function ue(d, e) {
  if (!d)
    return [];
  const t = Z(d, { ...ee, includeContainer: !0 }).filter(
    H
  );
  return t.push(
    ...e.filter((s) => (E.get(s)?.tabIndex ?? -1) >= 0)
  ), H(d) && d.tabIndex >= 0 && t.push(d), [...new Set(t)];
}
const pe = (d = {}) => j((e, t) => {
  const s = W()(e), o = /* @__PURE__ */ new Set();
  let p = [], h = null, f = -1, m = [], u, y = !1, l, b = null;
  const C = /* @__PURE__ */ new WeakSet();
  function g() {
    return d.getTraversableElements?.() ?? d.getElements?.() ?? p;
  }
  function T(i) {
    const r = E.get(i);
    !r || !o.delete(i) || (r.referenceCount--, !(r.referenceCount > 0) && (r.attribute === null ? i.removeAttribute("tabindex") : i.setAttribute("tabindex", r.attribute), E.delete(i)));
  }
  function B(i) {
    const r = g(), a = i.composedPath(), n = r.find((x) => a.includes(x));
    n && (l = n, v.setActiveIndex(r.indexOf(n)));
  }
  function V(i) {
    const r = i.composedPath();
    if (!p.some((n) => r.includes(n)))
      return;
    const a = i.relatedTarget;
    if (b = a, !(a instanceof Node && g().some((n) => n.contains(a)))) {
      if (a instanceof Element)
        l = void 0;
      else if (l) {
        const n = l;
        queueMicrotask(() => {
          l === n && n.isConnected && !n.matches(":focus-within") && g().includes(n) && (l = void 0);
        });
      }
    }
  }
  t.onLoaded(() => {
    e.listenOn(e.renderRoot, "focusin", B), e.listenOn(e.renderRoot, "focusout", V, { capture: !0 });
  }), e.listenOn(
    e.el.ownerDocument,
    "focusin",
    (i) => {
      if (!l && !b)
        return;
      const r = i.composedPath();
      b && r.includes(b) && C.add(i), b = null, l && !r.includes(l) && (l = void 0);
    },
    { capture: !0 }
  ), t.onDisconnected(() => {
    l = void 0, b = null, o.forEach(T);
  });
  const v = {
    get activeElement() {
      return h;
    },
    get activeIndex() {
      return f;
    },
    get hasFocus() {
      return s.hasFocus || (d.getEntryElement?.()?.matches(":focus-within") ?? !1);
    },
    isFocusFromItem(i) {
      return C.has(i);
    },
    get isRestoringFocus() {
      return y;
    },
    get shouldRecoverFocus() {
      if (!l)
        return !1;
      const i = X(e.el);
      return !(e.el.ownerDocument.activeElement === e.el.ownerDocument.body || i instanceof ShadowRoot && !i.activeElement && i.host.matches(":focus-within")) && !l.matches(":focus-within") ? (l = void 0, !1) : !l.isConnected || !g().includes(l);
    },
    update(i, r) {
      const a = d.getEntryElement?.();
      m.forEach(T);
      const n = s.getFocusableElements(a), x = ue(a, n), G = x.length > 0 ? x : m.filter((c) => c.isConnected && a?.contains(c));
      p = i;
      const N = d.getTraversableElements?.() ?? i;
      f = r && d.isActive?.() !== !1 && i.includes(r) ? N.indexOf(r) : -1, h = f >= 0 ? r : null;
      const _ = s.getDeepActiveElement();
      u = n.find((c) => c === _) ?? (u && n.includes(u) ? u : n[0]), m = G;
      const k = h ? [...i, ...m] : i, q = new Set(k);
      o.forEach((c) => {
        q.has(c) || T(c);
      }), k.forEach((c) => {
        if (!o.has(c)) {
          const P = E.get(c);
          P ? P.referenceCount++ : E.set(c, {
            attribute: c.getAttribute("tabindex"),
            tabIndex: c.tabIndex,
            referenceCount: 1
          }), o.add(c);
        }
        const S = c === h ? 0 : -1;
        c.getAttribute("tabindex") !== String(S) && (c.tabIndex = S);
      });
    },
    setActiveIndex(i) {
      const r = d.getElements?.() ?? p, a = d.getTraversableElements?.() ?? r, n = i >= 0 ? a[i] ?? null : null;
      v.update(r, n);
    },
    navigate(i) {
      const r = g(), a = r.length;
      if (!a)
        return v.setActiveIndex(-1), null;
      let n = f;
      return n < 0 || n >= a ? n = i === "previous" || i === "last" ? a - 1 : 0 : i === "next" ? n = (n + 1) % a : i === "previous" ? n = (n - 1 + a) % a : i === "first" ? n = 0 : i === "last" && (n = a - 1), v.update(d.getElements?.() ?? p, r[n]), h;
    },
    reconcile() {
      const i = g(), r = h ? i.indexOf(h) : -1, a = r >= 0 ? r : i.findIndex((n) => n.matches(":focus-within"));
      return v.setActiveIndex(
        a >= 0 ? a : Math.min(Math.max(f, 0), i.length - 1)
      ), h;
    },
    restoreFocus(i = "within") {
      const r = p.some(s.isFocusedWithin) || m.some(s.isFocusedWithin) || u !== void 0 && s.isFocusedWithin(u);
      if (!(!(i === "force" || r || i === "recover" && v.shouldRecoverFocus) || !u || !u.isConnected)) {
        y = !0;
        try {
          u.focus(), l = void 0;
        } finally {
          y = !1;
        }
      }
    }
  };
  return v;
}), fe = {
  trigger: "trigger"
}, A = {
  content: "content",
  wrapper: "wrapper",
  triggerContainer: "trigger-container"
}, me = K`:host([disabled]){opacity:var(--calcite-opacity-disabled);cursor:default;-webkit-user-select:none;user-select:none}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}.wrapper{inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.wrapper{opacity:0;inset-block-start:0;left:0}}:host([top-layer-disabled]) .wrapper{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown)}.wrapper[popover]{padding:0;margin:0;border:none;background-color:transparent;overflow:visible;display:none}.wrapper:popover-open{display:block}.wrapper .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;border-radius:var(--calcite-corner-radius-sm);z-index:var(--calcite-z-index)}.wrapper[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.wrapper[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.wrapper[data-placement^=left] .calcite-floating-ui-anim{left:5px}.wrapper[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.wrapper .calcite-floating-ui-anim{box-shadow:var(--calcite-shadow-md)}.content{overflow-y:auto;overflow-x:hidden;inline-size:var(--calcite-dropdown-width, var(--calcite-internal-dropdown-width));background-color:var(--calcite-dropdown-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));max-block-size:var(--calcite-dropdown-max-height, 45vh)}.trigger-container{position:relative;display:flex;flex:1 1 auto;block-size:100%;overflow-wrap:break-word;word-break:break-word}.width-s{--calcite-internal-dropdown-width: 12rem}.width-m{--calcite-internal-dropdown-width: 14rem}.width-l{--calcite-internal-dropdown-width: 16rem}@media(forced-colors:active){:host([open]) .wrapper{border:var(--calcite-border-width-sm) solid canvasText}}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:var(--calcite-opacity-full)}.interaction-container{display:contents}`, ve = he({ click: !0, hover: !0 });
class be extends Y {
  constructor() {
    super(), this.referenceElementController = de({ manager: ve })(this), this.direction = Q(), this.focusLastDropdownItem = !1, this.focusActiveItemOnOpen = !0, this.focusedElementOnOpen = null, this._open = !1, this.groups = [], this.items = [], this.mutationObserver = M("mutation", () => this.updateItems()), this.transitionProp = "opacity", this.resizeObserver = M("resize", (e) => this.resizeObserverCallback(e)), this.onReferenceElementKeyDown = (e) => this.keyDownHandler(e), this.onReferenceElementFocusIn = (e) => this.openHoverDropdown(e), this.onReferenceElementPointerOpen = () => {
      this.open || (this.focusActiveItemOnOpen = !1);
    }, this.focusable = W()(this), this.rovingTabIndex = pe({
      getElements: () => this.items,
      getEntryElement: () => this.referenceEl instanceof Element ? this.referenceEl : void 0,
      getTraversableElements: () => this.getTraversableItems(),
      isActive: () => this.open && !this.disabled && this.focusActiveItemOnOpen
    })(this), this.interactiveContainer = le(this), this.topLayer = ce({
      target: () => this.floatingEl
    })(this), this.closeOnSelectDisabled = !1, this.disabled = !1, this.maxItems = 0, this.offsetDistance = 0, this.offsetSkidding = 0, this.overlayPositioning = "absolute", this.placement = L, this.scale = "m", this.selectedItems = [], this.topLayerDisabled = !1, this.type = "click", this.calciteDropdownBeforeClose = I({ cancelable: !1 }), this.calciteDropdownBeforeOpen = I({ cancelable: !1 }), this.calciteDropdownClose = I({ cancelable: !1 }), this.calciteDropdownOpen = I({ cancelable: !1 }), this.calciteDropdownSelect = I({ cancelable: !1 }), this.listen("pointerenter", this.pointerEnterHandler), this.listen("pointerleave", this.pointerLeaveHandler), this.listen("calciteInternalDropdownItemSelect", this.handleItemSelect);
  }
  static {
    this.properties = { referenceEl: 16, closeOnSelectDisabled: 7, disabled: 7, flipPlacements: 0, maxItems: 11, offsetDistance: 11, offsetSkidding: 11, open: 7, overlayPositioning: 3, placement: 3, referenceElement: 1, scale: 3, selectedItems: 0, topLayerDisabled: 7, type: 3, widthScale: 3, width: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = me;
  }
  get referenceElementType() {
    return this.referenceElement ? this.type : void 0;
  }
  get autoClose() {
    return !0;
  }
  get isRestoringFocus() {
    return this.rovingTabIndex.isRestoringFocus;
  }
  get open() {
    return this._open;
  }
  set open(e) {
    e && !this._open && (this.focusedElementOnOpen = this.focusable.getDeepActiveElement()), this._open = e;
  }
  async reposition(e = !1) {
    const { filteredFlipPlacements: t, floatingEl: s, offsetDistance: o, offsetSkidding: p, overlayPositioning: h, placement: f, referenceEl: m } = this;
    return te(this, {
      direction: this.direction,
      floatingEl: s,
      referenceEl: m,
      offsetDistance: o,
      offsetSkidding: p,
      overlayPositioning: h,
      placement: f,
      flipPlacements: t,
      type: "menu"
    }, e);
  }
  async setFocus(e) {
    return this.focusable.setFocus(() => {
      const t = this.referenceEl instanceof HTMLElement ? this.referenceEl : this.floatingEl;
      return t ? { target: t, strategy: "focusable" } : void 0;
    }, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, {
      attributeFilter: ["disabled", "hidden", "inert"],
      attributes: !0,
      childList: !0,
      subtree: !0
    }), this.setFilteredPlacements(), this.updateItems(), w(this);
  }
  load() {
    this.listenOn(document, "click", this.closeCalciteDropdownOnClick), this.listenOn(document, "calciteDropdownOpen", this.closeCalciteDropdownOnOpenEvent);
  }
  willUpdate(e) {
    e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(this.disabled), e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("flipPlacements") && this.flipPlacementsHandler(), e.has("maxItems") && this.hasUpdated && this.setMaxScrollerHeight(), this.hasUpdated && (e.has("offsetDistance") && this.offsetDistance !== 0 || e.has("offsetSkidding") && this.offsetSkidding !== 0 || e.has("overlayPositioning") && this.overlayPositioning !== "absolute" || e.has("placement") && this.placement !== L) && this.reposition(!0), e.has("scale") && (this.hasUpdated || this.scale !== "m") && this.handlePropsChange(), e.has("referenceElement") && !this.referenceElement && this.open && this.topLayer.hide();
  }
  updated(e) {
    e.has("referenceEl") && this.referenceElementType && (this.syncTabStops(), w(this));
  }
  loaded() {
    this.updateSelectedItems(), w(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.resizeObserver?.disconnect(), ie(this);
  }
  openHandler() {
    if (this.disabled && this.open) {
      this.open = !1, this.focusActiveItemOnOpen = !0, this.rovingTabIndex.setActiveIndex(-1);
      return;
    }
    this.open || (this.focusActiveItemOnOpen = !0), oe(this), this.open || this.rovingTabIndex.setActiveIndex(-1), this.reposition(!0);
  }
  handleDisabledChange(e) {
    e && (this.open = !1, this.rovingTabIndex.setActiveIndex(-1));
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
    this.referenceElementType || this.disabled || this.type !== "hover" || (this.open || (this.focusActiveItemOnOpen = !1), this.open = !0);
  }
  pointerLeaveHandler() {
    this.referenceElementType || this.disabled || this.type !== "hover" || this.closeCalciteDropdown();
  }
  getTraversableItems() {
    return this.items.filter((e) => !e.disabled && !e.closest("[hidden], [inert]"));
  }
  async handleItemSelect(e) {
    this.updateSelectedItems(), this.syncActiveItemFromTraversableItems();
    const t = this.focusable.getDeepActiveElement();
    if (e.stopPropagation(), this.calciteDropdownSelect.emit(), !this.closeOnSelectDisabled)
      this.closeCalciteDropdown(), this.rovingTabIndex.restoreFocus("recover");
    else {
      const { requestedDropdownItem: s } = e.detail, o = this.getTraversableItems().indexOf(s);
      if (o < 0 || !s.isConnected) {
        this.updateItems();
        return;
      }
      s.matches(":focus-within") && this.focusable.isFocusUnchanged(t) && (this.rovingTabIndex.setActiveIndex(o), await this.scrollActiveItemIntoView(s, t));
    }
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? se(t, e) : void 0;
  }
  updateItems() {
    this.items = this.groups.flatMap((e) => Array.from(e.querySelectorAll("calcite-dropdown-item"))), this.updateSelectedItems(), this.syncActiveItemFromTraversableItems(), this.reposition(!0), this.items.forEach((e) => e.scale = this.scale);
  }
  updateGroups(e) {
    const t = e.target.assignedElements({ flatten: !0 }).filter(ae);
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
    const { maxItems: e, items: t, scrollerEl: s } = this;
    if (!s)
      return;
    const o = t.length >= e && e > 0 ? this.getYDistanceFromScroller(t.at(e - 1)) : 0;
    s.style.maxBlockSize = o > 0 ? `${o}px` : "", this.reposition(!0);
  }
  setScrollerAndTransitionEl(e) {
    U(this.resizeObserver, this.scrollerEl, e), this.scrollerEl = e, this.transitionEl = e;
  }
  onBeforeOpen() {
    this.setInitialActiveItem(), this.calciteDropdownBeforeOpen.emit();
  }
  onOpen() {
    this.calciteDropdownOpen.emit();
  }
  onBeforeClose() {
    this.rovingTabIndex.restoreFocus("recover"), this.calciteDropdownBeforeClose.emit();
  }
  onClose() {
    this.calciteDropdownClose.emit(), ne(this), this.topLayer.hide();
  }
  setReferenceEl(e) {
    const t = this.referenceEl instanceof HTMLElement ? this.referenceEl : void 0, s = e instanceof HTMLElement ? e : void 0;
    U(this.resizeObserver, t, s), !(this.referenceElementType || !s) && (this.referenceEl = e, this.syncTabStops(), w(this));
  }
  setFloatingEl(e) {
    this.floatingEl = e, w(this);
  }
  handleTriggerSlotChange() {
    this.syncTabStops();
  }
  keyDownHandler(e) {
    const t = e.composedPath();
    if (this.disabled || !t.includes(this.floatingEl) && (!(this.referenceEl instanceof Element) || !t.includes(this.referenceEl)))
      return;
    const { defaultPrevented: s, key: o } = e;
    if (!s) {
      if (this.open && o === "Escape") {
        this.closeCalciteDropdown(), this.rovingTabIndex.restoreFocus(), e.preventDefault();
        return;
      }
      if (!this.open && z(o)) {
        this.focusActiveItemOnOpen = !0, this.open = !0, e.preventDefault();
        return;
      }
      if (!this.open && (o === "ArrowDown" || o === "ArrowUp")) {
        e.preventDefault(), this.focusActiveItemOnOpen = !0, this.focusLastDropdownItem = o === "ArrowUp", this.open = !0;
        return;
      }
      if (this.open) {
        if (o === "Tab") {
          this.rovingTabIndex.restoreFocus(), this.closeCalciteDropdown();
          return;
        }
        if (o === "ArrowDown") {
          e.preventDefault(), this.navigateActiveItem("next");
          return;
        }
        if (o === "ArrowUp") {
          e.preventDefault(), this.navigateActiveItem("previous");
          return;
        }
        if (o === "Home") {
          e.preventDefault(), this.navigateActiveItem("first");
          return;
        }
        if (o === "End") {
          e.preventDefault(), this.navigateActiveItem("last");
          return;
        }
        z(o) && (e.preventDefault(), this.activateActiveItem());
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
    this.open = !1, this.rovingTabIndex.setActiveIndex(-1);
  }
  async setInitialActiveItem() {
    const e = this.getTraversableItems(), t = this.focusLastDropdownItem ? e.length - 1 : 0, s = !e.length && this.focusLastDropdownItem ? "last" : void 0;
    this.focusLastDropdownItem = !1, this.rovingTabIndex.setActiveIndex(e.length ? t : -1), await this.topLayer.show(), this.focusActiveItemOnOpen && await this.scrollActiveItemIntoView(void 0, this.focusedElementOnOpen, s);
  }
  syncActiveItemFromTraversableItems() {
    const e = this.getTraversableItems(), t = this.rovingTabIndex.activeElement, s = this.rovingTabIndex.shouldRecoverFocus;
    if (!this.open || !e.length) {
      this.rovingTabIndex.setActiveIndex(-1), this.open && t && s && this.rovingTabIndex.restoreFocus("force");
      return;
    }
    const o = this.rovingTabIndex.reconcile();
    t && o && s && this.scrollActiveItemIntoView(o);
  }
  syncTabStops() {
    this.rovingTabIndex.update(this.items, this.rovingTabIndex.activeElement);
  }
  handleItemFocus() {
    this.focusActiveItemOnOpen = !0;
  }
  handleItemFocusOut(e) {
    !e.relatedTarget && this.rovingTabIndex.shouldRecoverFocus || this.closeHoverDropdown(e);
  }
  navigateActiveItem(e) {
    this.focusActiveItemOnOpen = !0;
    const t = this.rovingTabIndex.navigate(e);
    t && this.scrollActiveItemIntoView(t);
  }
  async scrollActiveItemIntoView(e, t = this.focusable.getDeepActiveElement(), s) {
    await this.updateComplete, await F(), await F(), e ??= this.rovingTabIndex.activeElement ?? void 0, !(!e || !this.open || this.rovingTabIndex.activeElement !== e || !e.isConnected || !this.focusable.isFocusUnchanged(t)) && (s && (e = this.rovingTabIndex.navigate(s) ?? e), await e.setFocus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest" }));
  }
  activateActiveItem() {
    const e = this.getTraversableItems(), t = this.rovingTabIndex.activeIndex, s = t >= 0 && t < e.length ? t : 0, o = e[s];
    o && (this.rovingTabIndex.setActiveIndex(s), o.activateItem());
  }
  openHoverDropdown(e) {
    if (!(this.disabled || this.type !== "hover" || this.isRestoringFocus) && !(this.rovingTabIndex.isFocusFromItem(e) || e.relatedTarget instanceof Node && this.el.contains(e.relatedTarget))) {
      if (this.focusActiveItemOnOpen = !0, this.open) {
        this.rovingTabIndex.activeElement || this.rovingTabIndex.setActiveIndex(0), this.scrollActiveItemIntoView(this.rovingTabIndex.activeElement ?? void 0);
        return;
      }
      this.open = !0;
    }
  }
  async closeHoverDropdown(e) {
    if (!this.open || this.disabled || this.type !== "hover")
      return;
    const t = e.relatedTarget;
    t && (this.el.contains(t) || this.referenceEl instanceof Element && this.referenceEl.contains(t)) || t instanceof Element && t.shadowRoot && (await F(), !this.open || this.rovingTabIndex.hasFocus) || this.closeCalciteDropdown();
  }
  toggleClickDropdown() {
    this.disabled || this.type !== "click" || (this.focusActiveItemOnOpen = !0, this.open = !this.open);
  }
  render() {
    const { open: e } = this;
    return this.interactiveContainer({ disabled: this.disabled, children: R`${this.referenceElementType ? null : R`<div class=${D(A.triggerContainer)} @click=${this.toggleClickDropdown} @focusin=${this.openHoverDropdown} @focusout=${this.closeHoverDropdown} @keydown=${this.keyDownHandler} ${O(this.setReferenceEl)}><slot .ariaControlsElements=${this.scrollerEl ? [this.scrollerEl] : void 0} .ariaExpanded=${e} aria-haspopup=menu name=${fe.trigger} @slotchange=${this.handleTriggerSlotChange}></slot></div>`}<div class=${D({
      [A.wrapper]: !0,
      [re("width", this.width, this.widthScale)]: !!(this.width || this.widthScale)
    })} .inert=${!e} @focusin=${this.handleItemFocus} @focusout=${this.handleItemFocusOut} @keydown=${this.keyDownHandler} popover=manual ${O(this.setFloatingEl)}><div .ariaLabelledByElements=${this.referenceEl instanceof HTMLElement ? [this.referenceEl] : void 0} class=${D({
      [A.content]: !0,
      [$.animation]: !0,
      [$.animationActive]: e
    })} role=menu ${O(this.setScrollerAndTransitionEl)}><slot @slotchange=${this.updateGroups}></slot></div></div>` });
  }
}
J("calcite-dropdown", be);
export {
  be as Dropdown
};
