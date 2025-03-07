import { s as r, x as d, d as q, L as j, j as b, k as N, E as m, D as X, h as J } from "./iframe.js";
import { i as f } from "./keyed.js";
import { l as K } from "./live.js";
import { c as Q } from "./core.js";
import { e as Y, n as g } from "./ref.js";
import { f as Z } from "./filter.js";
import { p as v, r as ee } from "./dom.js";
import { d as te, r as ie, c as C, b as se, f as le, h as ae, F as E } from "./floating-ui.js";
import { c as ne, a as oe, d as ce, s as re, H as he } from "./form.js";
import { g as de } from "./guid.js";
import { u as pe, I as ue } from "./interactive.js";
import { c as me, d as fe, g as be } from "./label.js";
import { g as S, c as ge, i as H } from "./component.js";
import { c as F } from "./observers.js";
import { o as xe } from "./openCloseComponent.js";
import { V as Ie } from "./Validation.js";
import { u as ve } from "./useT9n.js";
import { h as T, i as x, C as c, a as V, b as O, g as $, c as M, d as Ce, I as P } from "./utils5.js";
import { d as $e } from "./debounce.js";
import { e as we } from "./escapeRegExp.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
const U = {
  button: "x-button"
}, ye = ({ disabled: k, key: e, label: t, scale: i }) => f(e, d`<button .ariaLabel=${t} class=${r(U.button)} .disabled=${k} tabindex=-1 type=button><calcite-icon icon=x .scale=${S(i)}></calcite-icon></button>`), Se = q`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]) .x-button{inline-size:1rem;block-size:1rem}:host([scale=m]) .x-button{inline-size:1.5rem;block-size:1.5rem}:host([scale=l]) .x-button{inline-size:2rem;block-size:2rem}.x-button{margin:0;display:flex;cursor:pointer;appearance:none;align-content:center;align-items:center;justify-content:center;align-self:center;border-width:2px;background-color:transparent;color:var(--calcite-color-text-3);outline-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-radius:50%;border-color:transparent;background-color:var(--calcite-color-foreground-2)}.x-button:active,.x-button:hover{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.x-button:active{border-style:solid;border-color:var(--calcite-color-brand)}.x-button calcite-icon{color:inherit}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l: .5rem;--calcite-combobox-item-spacing-unit-s: .25rem;--calcite-combobox-input-height: 1rem;--calcite-internal-combobox-input-margin-block: calc(.25rem - 1px) }:host([scale=s]) .x-button{margin-inline:.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l: .75rem;--calcite-combobox-item-spacing-unit-s: .5rem;--calcite-combobox-input-height: 1rem;--calcite-internal-combobox-input-margin-block: calc(.5rem - 1px) }:host([scale=m]) .x-button{margin-inline-end:.75rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l: 1rem;--calcite-combobox-item-spacing-unit-s: .75rem;--calcite-combobox-input-height: 1.5rem;--calcite-internal-combobox-input-margin-block: calc(.625rem - 1px) }:host([scale=l]) .x-button{margin-inline-end:1rem}.wrapper{display:flex;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-1);outline-color:transparent;padding-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.wrapper:hover .icon{color:var(--calcite-color-text-1)}:host(:focus-within) .wrapper,.wrapper--active{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([read-only]) .wrapper{background-color:var(--calcite-color-background)}:host([read-only]) .label{font-weight:var(--calcite-font-weight-medium)}:host([status=invalid]) .wrapper{border-color:var(--calcite-color-status-danger)}:host([status=invalid]:focus-within) .wrapper{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.wrapper--single{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l);cursor:pointer;flex-wrap:nowrap}.grid-input{position:relative;display:flex;flex-grow:1;flex-wrap:wrap;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0;gap:var(--calcite-combobox-item-spacing-unit-s);margin-inline-end:var(--calcite-combobox-item-spacing-unit-s)}.grid-input.selection-display-fit,.grid-input.selection-display-single{flex-wrap:nowrap;overflow:hidden}.input{flex-grow:1;appearance:none;overflow:hidden;text-overflow:ellipsis;border-style:none;background-color:transparent;padding:0;font-family:inherit;color:var(--calcite-color-text-1);font-size:inherit;block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);inline-size:100%;margin-block-end:var(--calcite-combobox-item-spacing-unit-s);min-inline-size:4.8125rem}.input:focus{outline:2px solid transparent;outline-offset:2px}.input:placeholder-shown{text-overflow:ellipsis}.input--single{padding:0;margin-block:var(--calcite-internal-combobox-input-margin-block)}.wrapper--active .input-single{cursor:text}.input--hidden{pointer-events:none;width:0px;min-width:0px;opacity:0}.input--icon{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.placeholder-icon{color:var(--calcite-color-text-3)}.input-wrap{display:flex;flex-grow:1;align-items:center}.input-wrap--single{flex:1 1 0%;overflow:hidden}.label{pointer-events:none;max-width:100%;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0;font-weight:var(--calcite-font-weight-normal);block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--icon{padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.icon-end,.icon-start{display:flex;cursor:pointer;align-items:center}.icon-end{flex:none}.icon-end .icon{color:var(--calcite-color-text-3)}.floating-ui-container{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown);inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}.floating-ui-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset,left,opacity;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.floating-ui-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.floating-ui-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.floating-ui-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.floating-ui-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@media (forced-colors: active){.wrapper,.floating-ui-container{border:1px solid canvasText}}.screen-readers-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.list-container{max-height:45vh;overflow-y:auto;background-color:var(--calcite-color-foreground-1);inline-size:var(--calcite-dropdown-width, 100%)}.list{margin:0;display:block;padding:0}.list--hide{height:0px;overflow:hidden}calcite-chip{--calcite-animation-timing: 0}.chip{margin-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);max-inline-size:100%}.chip--active{background-color:var(--calcite-color-foreground-3)}.chip--invisible{visibility:hidden;position:absolute}.item{display:block}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}::slotted(calcite-combobox-item-group:not(:first-child)){padding-block-start:var(--calcite-combobox-item-spacing-unit-l)}`, z = "combobox-item-", L = "combobox-chip-", R = "combobox-label-", y = "combobox-listbox-", B = "combobox-input-";
class ke extends j {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.filterItems = (() => {
      const e = (t, i) => t && i.some(({ el: s }) => t === s);
      return $e((t, i = !1, s = !0) => {
        const l = Z([...this.data, ...this.groupData], t, this.effectiveFilterProps), a = this.getItemsAndGroups(), n = t === "";
        a.forEach((o) => {
          if (n) {
            o.itemHidden = !1;
            return;
          }
          const h = !e(o, l);
          o.itemHidden = h;
          const [p, I] = o.ancestors;
          (e(p, l) || e(I, l)) && (o.itemHidden = !1), h || o.ancestors.forEach((u) => u.itemHidden = !1);
        }), this.filterTextMatchPattern = this.filterText && new RegExp(`(${we(this.filterText)})`, "i"), this.filteredItems = this.getFilteredItems(), this.filteredItems.forEach((o) => {
          o.filterTextMatchPattern = this.filterTextMatchPattern;
        }), i && (this.open = this.filterText.trim().length > 0 && this.filteredItems.length > 0), s && this.calciteComboboxFilterChange.emit();
      }, X.filter);
    })(), this._filterText = "", this.getSelectedItems = () => {
      if (!this.isMulti()) {
        const e = this.items.find(({ selected: t }) => t);
        return e ? [e] : [];
      }
      return this.items.filter((e) => e.selected && (this.selectionMode !== "ancestors" || !T(e))).sort((e, t) => {
        const i = this.selectedItems.indexOf(e), s = this.selectedItems.indexOf(t);
        return i > -1 && s > -1 ? i - s : s - i;
      });
    }, this.groupItems = [], this.guid = de(), this.ignoreSelectedEventsFlag = !1, this.inputHeight = 0, this.internalValueChangeFlag = !1, this.items = [], this.mutationObserver = F("mutation", () => this.updateItems()), this.onLabelClick = () => {
      this.setFocus();
    }, this.transitionProp = "opacity", this.placement = te, this.resizeObserver = F("resize", () => {
      this.setMaxScrollerHeight(), this.refreshSelectionDisplay();
    }), this._selectedItems = [], this.textInput = Y(), this._value = null, this.activeChipIndex = -1, this.activeDescendant = "", this.activeItemIndex = -1, this.compactSelectionDisplay = !1, this.selectedHiddenChipsCount = 0, this.selectedVisibleChipsCount = 0, this.clearDisabled = !1, this.disabled = !1, this.filteredItems = [], this.maxItems = 0, this.messages = ve(), this.open = !1, this.overlayPositioning = "absolute", this.placeholderIconFlipRtl = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.selectionDisplay = "all", this.selectionMode = "multiple", this.status = "idle", this.validity = {
      valid: !1,
      badInput: !1,
      customError: !1,
      patternMismatch: !1,
      rangeOverflow: !1,
      rangeUnderflow: !1,
      stepMismatch: !1,
      tooLong: !1,
      tooShort: !1,
      typeMismatch: !1,
      valueMissing: !1
    }, this.calciteComboboxBeforeClose = b({ cancelable: !1 }), this.calciteComboboxBeforeOpen = b({ cancelable: !1 }), this.calciteComboboxChange = b({ cancelable: !1 }), this.calciteComboboxChipClose = b({ cancelable: !1 }), this.calciteComboboxClose = b({ cancelable: !1 }), this.calciteComboboxFilterChange = b({ cancelable: !1 }), this.calciteComboboxOpen = b({ cancelable: !1 }), this.listenOn(document, "click", this.documentClickHandler), this.listen("calciteComboboxItemChange", this.calciteComboboxItemChangeHandler), this.listen("calciteInternalComboboxItemChange", this.calciteInternalComboboxItemChangeHandler), this.listen("click", this.comboboxFocusHandler);
  }
  static {
    this.properties = { activeChipIndex: 16, activeDescendant: 16, activeItemIndex: 16, compactSelectionDisplay: 16, selectedHiddenChipsCount: 16, selectedVisibleChipsCount: 16, allowCustomValues: 7, clearDisabled: 7, disabled: 7, filterText: 3, filterProps: 0, filteredItems: 0, flipPlacements: 0, form: 3, label: 1, maxItems: 11, messageOverrides: 0, name: 3, open: 7, overlayPositioning: 3, placeholder: 1, placeholderIcon: 3, placeholderIconFlipRtl: 7, readOnly: 7, required: 7, scale: 3, selectedItems: 0, selectionDisplay: 3, selectionMode: 3, status: 3, validationIcon: [3, { converter: N }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.styles = Se;
  }
  emitComboboxChange() {
    this.calciteComboboxChange.emit();
  }
  get effectiveFilterProps() {
    return this.filterProps ? this.filterProps.filter((e) => e !== "el") : ["description", "label", "metadata", "shortHeading", "textLabel"];
  }
  get showingInlineIcon() {
    const { placeholderIcon: e, selectionMode: t, selectedItems: i, open: s } = this, l = i[0], a = l?.icon, n = x(t);
    return !s && l ? !!a && n : !!e && (!l || n);
  }
  /** Text for the component's filter input field. */
  get filterText() {
    return this._filterText;
  }
  set filterText(e) {
    const t = this._filterText;
    e !== t && (this._filterText = e, this.filterTextChange(e));
  }
  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  get selectedItems() {
    return this._selectedItems;
  }
  set selectedItems(e) {
    const t = this._selectedItems;
    e !== t && (this._selectedItems = e, this.selectedItemsHandler());
  }
  /** The component's value(s) from the selected `calcite-combobox-item`(s). */
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.valueHandler(e));
  }
  // #endregion
  // #region Public Methods
  /**
   * Updates the position of the component.
   *
   * @param delayed Reposition the component after a delay
   * @returns Promise
   */
  async reposition(e = !1) {
    const { floatingEl: t, referenceEl: i, placement: s, overlayPositioning: l, filteredFlipPlacements: a } = this;
    return ie(this, {
      floatingEl: t,
      referenceEl: i,
      overlayPositioning: l,
      placement: s,
      flipPlacements: a,
      type: "menu"
    }, e);
  }
  /** Sets focus on the component. */
  async setFocus() {
    await ge(this), this.textInput.value?.focus(), this.activeChipIndex = -1, this.activeItemIndex = -1;
  }
  connectedCallback() {
    super.connectedCallback(), me(this), ne(this), this.internalValueChangeFlag = !0, this.value = this.getValue(), this.internalValueChangeFlag = !1, this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setFilteredPlacements(), C(this);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(this.disabled), e.has("maxItems") && (this.hasUpdated || this.maxItems !== 0) && this.setMaxScrollerHeight(), e.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") && this.reposition(!0), (e.has("selectionMode") || e.has("scale")) && this.updateItems(), e.has("flipPlacements") && this.flipPlacementsHandler();
  }
  updated() {
    this.el.offsetHeight !== this.inputHeight && (this.reposition(!0), this.inputHeight = this.el.offsetHeight), pe(this), this.refreshSelectionDisplay();
  }
  loaded() {
    oe(this, this.getValue()), C(this), this.updateItems(), this.filterItems(this.filterText, !1, !1);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.resizeObserver?.disconnect(), fe(this), ce(this), se(this);
  }
  // #endregion
  // #region Private Methods
  filterTextChange(e) {
    this.updateActiveItemIndex(-1), this.filterItems(e, !0);
  }
  openHandler() {
    xe(this), !this.disabled && this.setMaxScrollerHeight();
  }
  handleDisabledChange(e) {
    e || (this.open = !1);
  }
  valueHandler(e) {
    this.internalValueChangeFlag || (this.getItems().forEach((t) => {
      t.selected = Array.isArray(e) ? e.includes(t.value) : e === t.value;
    }), this.updateItems());
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements(), this.reposition(!0);
  }
  selectedItemsHandler() {
    this.internalValueChangeFlag = !0, this.value = this.getValue(), this.internalValueChangeFlag = !1;
  }
  async documentClickHandler(e) {
    this.disabled || e.composedPath().includes(this.el) || (await this.componentOnReady(), !this.allowCustomValues && this.filterText && (this.clearInputValue(), this.filterItems(""), this.updateActiveItemIndex(-1)), this.allowCustomValues && this.filterText.trim().length && this.addCustomChip(this.filterText), this.open = !1);
  }
  calciteComboboxItemChangeHandler(e) {
    if (this.ignoreSelectedEventsFlag)
      return;
    const t = e.target, i = this.filteredItems.indexOf(t);
    this.updateActiveItemIndex(i), this.toggleSelection(t, t.selected);
  }
  calciteInternalComboboxItemChangeHandler(e) {
    e.stopPropagation(), this.hasUpdated && this.updateItems();
  }
  clearValue() {
    this.ignoreSelectedEventsFlag = !0, this.items.forEach((e) => e.selected = !1), this.ignoreSelectedEventsFlag = !1, this.selectedItems = [], this.emitComboboxChange(), this.open = !1, this.updateActiveItemIndex(-1), this.resetText(), this.filterItems(""), this.setFocus();
  }
  clearInputValue() {
    this.textInput.value.value = "", this.filterText = "";
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? le(t, e) : null;
  }
  getValue() {
    const e = this.selectedItems.map((t) => t.value?.toString());
    return e.length ? e.length > 1 ? e : e[0] : "";
  }
  comboboxInViewport() {
    const e = this.el.getBoundingClientRect();
    return e.top >= 0 && e.left >= 0 && e.right <= (window.innerWidth || document.documentElement.clientWidth) && e.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }
  keyDownHandler(e) {
    if (this.readOnly)
      return;
    const { key: t } = e;
    switch (t) {
      case "Tab":
        this.activeChipIndex = -1, this.activeItemIndex = -1, this.allowCustomValues && this.filterText ? (this.addCustomChip(this.filterText, !0), e.preventDefault()) : this.open ? (this.open = !1, e.preventDefault()) : !this.allowCustomValues && this.filterText && (this.clearInputValue(), this.filterItems(""), this.updateActiveItemIndex(-1));
        break;
      case "ArrowLeft":
        (this.activeChipIndex !== -1 || this.textInput.value.selectionStart === 0) && (this.previousChip(), e.preventDefault());
        break;
      case "ArrowRight":
        this.activeChipIndex !== -1 && (this.nextChip(), e.preventDefault());
        break;
      case "ArrowUp":
        this.filteredItems.length && (e.preventDefault(), this.open && this.shiftActiveItemIndex(-1), this.comboboxInViewport() || this.el.scrollIntoView());
        break;
      case "ArrowDown":
        this.filteredItems.length && (e.preventDefault(), this.open ? this.shiftActiveItemIndex(1) : (this.open = !0, this.ensureRecentSelectedItemIsActive()), this.comboboxInViewport() || this.el.scrollIntoView());
        break;
      case " ":
        !this.textInput.value.value && !e.defaultPrevented && (this.open || (this.open = !0, this.shiftActiveItemIndex(1)), e.preventDefault());
        break;
      case "Home":
        if (!this.open)
          return;
        e.preventDefault(), this.updateActiveItemIndex(0), this.scrollToActiveOrSelectedItem(), this.comboboxInViewport() || this.el.scrollIntoView();
        break;
      case "End":
        if (!this.open)
          return;
        e.preventDefault(), this.updateActiveItemIndex(this.filteredItems.length - 1), this.scrollToActiveOrSelectedItem(), this.comboboxInViewport() || this.el.scrollIntoView();
        break;
      case "Escape":
        !this.clearDisabled && !this.open && this.clearValue(), this.open = !1, e.preventDefault();
        break;
      case "Enter":
        if (this.open && this.activeItemIndex > -1) {
          const i = this.filteredItems[this.activeItemIndex];
          this.toggleSelection(i, !i.selected), e.preventDefault();
        } else this.activeChipIndex > -1 ? (this.removeActiveChip(), e.preventDefault()) : this.allowCustomValues && this.filterText ? (this.addCustomChip(this.filterText, !0), e.preventDefault()) : e.defaultPrevented || re(this) && e.preventDefault();
        break;
      case "Delete":
      case "Backspace": {
        if (this.selectionDisplay === "single" || this.selectionDisplay === "fit" && this.selectedHiddenChipsCount > 0)
          return;
        this.activeChipIndex > -1 ? (e.preventDefault(), this.removeActiveChip()) : !this.filterText && this.isMulti() && (e.preventDefault(), this.removeLastChip());
        break;
      }
    }
  }
  onBeforeOpen() {
    this.scrollToActiveOrSelectedItem(), this.calciteComboboxBeforeOpen.emit();
  }
  onOpen() {
    this.scrollToActiveOrSelectedItem(!0), this.calciteComboboxOpen.emit();
  }
  onBeforeClose() {
    this.calciteComboboxBeforeClose.emit();
  }
  onClose() {
    this.calciteComboboxClose.emit(), ae(this);
  }
  async setMaxScrollerHeight() {
    const { listContainerEl: e, open: t, referenceEl: i } = this;
    if (!e || !t)
      return;
    await this.reposition(!0);
    const s = this.getMaxScrollerHeight();
    e.style.maxBlockSize = s > 0 ? `${s}px` : "", e.style.inlineSize = `${i.clientWidth}px`, await this.reposition(!0);
  }
  calciteChipCloseHandler(e) {
    this.open = !1;
    const t = this.items.find((i) => i === e);
    t && this.toggleSelection(t, !1), this.calciteComboboxChipClose.emit();
  }
  clickHandler(e) {
    if (this.readOnly)
      return;
    const t = e.composedPath();
    if (t.some((i) => i.tagName === "CALCITE-CHIP")) {
      this.open = !1, e.preventDefault();
      return;
    }
    if (t.some((i) => i.classList?.contains(U.button))) {
      this.clearValue(), e.preventDefault();
      return;
    }
    this.open = !this.open, this.ensureRecentSelectedItemIsActive();
  }
  ensureRecentSelectedItemIsActive() {
    const { selectedItems: e } = this, t = e.length === 0 ? 0 : this.items.indexOf(e[e.length - 1]);
    this.updateActiveItemIndex(t);
  }
  hideChip(e) {
    e.classList.add(c.chipInvisible);
  }
  showChip(e) {
    e.classList.remove(c.chipInvisible);
  }
  refreshChipDisplay({ chipEls: e, availableHorizontalChipElSpace: t, chipContainerElGap: i }) {
    e.forEach((s) => {
      if (!s.selected)
        this.hideChip(s);
      else {
        const l = v(s);
        if (l && l < t) {
          t -= l + i, this.showChip(s);
          return;
        }
      }
      this.hideChip(s);
    });
  }
  async refreshSelectionDisplay() {
    if (this.componentOnReady(), x(this.selectionMode) || !this.textInput.value)
      return;
    const { allSelectedIndicatorChipEl: e, chipContainerEl: t, selectionDisplay: i, placeholder: s, selectedIndicatorChipEl: l, textInput: { value: a } } = this, n = parseInt(getComputedStyle(t).gap.replace("px", "")), o = v(t), { fontSize: h, fontFamily: p } = getComputedStyle(a), u = (ee(s, `${h} ${p}`) || parseInt(Q)) + n, w = v(e), D = v(l), G = Math.max(w, D);
    if (this.setCompactSelectionDisplay({
      chipContainerElGap: n,
      chipContainerElWidth: o,
      inputWidth: u,
      largestSelectedIndicatorChipWidth: G
    }), i === "fit") {
      const A = Array.from(this.el.shadowRoot.querySelectorAll("calcite-chip")).filter((_) => _.closable), W = Math.round(o - ((this.selectedHiddenChipsCount > 0 ? D : 0) + n + u + n));
      this.refreshChipDisplay({ availableHorizontalChipElSpace: W, chipContainerElGap: n, chipEls: A }), this.setVisibleAndHiddenChips(A);
    }
  }
  setFloatingEl(e) {
    this.floatingEl = e, C(this);
  }
  setCompactSelectionDisplay({ chipContainerElGap: e, chipContainerElWidth: t, inputWidth: i, largestSelectedIndicatorChipWidth: s }) {
    const l = Math.round(s + e + i);
    (!this.maxCompactBreakpoint || this.maxCompactBreakpoint < l) && (this.maxCompactBreakpoint = l), this.compactSelectionDisplay = t < this.maxCompactBreakpoint;
  }
  setContainerEl(e) {
    e && (this.resizeObserver?.observe(e), this.listContainerEl = e, this.transitionEl = e);
  }
  setChipContainerEl(e) {
    e && this.resizeObserver?.observe(e), this.chipContainerEl = e;
  }
  setReferenceEl(e) {
    this.referenceEl = e, C(this);
  }
  setAllSelectedIndicatorChipEl(e) {
    this.allSelectedIndicatorChipEl = e;
  }
  setSelectedIndicatorChipEl(e) {
    this.selectedIndicatorChipEl = e;
  }
  setVisibleAndHiddenChips(e) {
    let t = 0;
    e.forEach((s) => {
      s.selected && !s.classList.contains(c.chipInvisible) && t++;
    }), t !== this.selectedVisibleChipsCount && (this.selectedVisibleChipsCount = t);
    const i = this.getSelectedItems().length - t;
    i !== this.selectedHiddenChipsCount && (this.selectedHiddenChipsCount = i);
  }
  getMaxScrollerHeight() {
    const t = [...this.groupItems, ...this.getItems(!0)].filter((a) => !H(a)), { maxItems: i } = this;
    let s = 0, l = 0;
    return t.length >= i && t.forEach((a) => {
      if (s < i) {
        const n = this.calculateScrollerHeight(a);
        l += n, s += 1;
      }
    }), l;
  }
  calculateScrollerHeight(e) {
    if (!e)
      return 0;
    const t = e.getBoundingClientRect().height, i = `:scope > ${V}, :scope > ${O}`, s = Array.from(e.querySelectorAll(i)).reduce((l, a) => l + a.getBoundingClientRect().height, 0);
    return t - s;
  }
  inputHandler(e) {
    const t = e.target.value;
    this.filterText = t;
  }
  getItemsAndGroups() {
    return [...this.groupItems, ...this.items];
  }
  toggleSelection(e, t) {
    !e || this.selectionMode === "single-persist" && e.selected && e.value === this.value && !t || (this.isMulti() ? (e.selected = t, this.updateAncestors(e), this.selectedItems = this.getSelectedItems(), this.emitComboboxChange(), this.resetText(), this.filterItems("")) : (this.ignoreSelectedEventsFlag = !0, this.items.forEach((i) => i.selected = i === e ? t : !1), this.ignoreSelectedEventsFlag = !1, this.selectedItems = this.getSelectedItems(), this.emitComboboxChange(), this.textInput.value && (this.textInput.value.value = $(e)), this.open = !1, this.updateActiveItemIndex(-1), this.resetText(), this.filterItems("")));
  }
  updateAncestors(e) {
    if (this.selectionMode !== "ancestors")
      return;
    const t = M(e), i = Ce(e);
    e.selected ? t.forEach((s) => {
      s.selected = !0;
    }) : (i.forEach((s) => s.selected = !1), [...t].forEach((s) => {
      T(s) || (s.selected = !1);
    }));
  }
  getFilteredItems() {
    return this.filterText === "" ? this.items : this.items.filter((e) => !H(e));
  }
  updateItems() {
    this.items = this.getItems(), this.groupItems = this.getGroupItems(), this.data = this.getData(), this.groupData = this.getGroupData(), this.updateItemProps(), this.selectedItems = this.getSelectedItems(), this.filteredItems = this.getFilteredItems();
  }
  updateItemProps() {
    this.getItems(!0).forEach((e) => {
      e.selectionMode = this.selectionMode, e.scale = this.scale;
    }), this.groupItems.forEach((e) => e.scale = this.scale), this.allowCustomValues || this.setMaxScrollerHeight(), this.groupItems.forEach((e, t, i) => {
      t === 0 && (e.afterEmptyGroup = !1);
      const s = i[t + 1];
      s && (s.afterEmptyGroup = e.children.length === 0);
    });
  }
  getData() {
    return this.items.map((e) => ({
      description: e.description,
      filterDisabled: e.filterDisabled,
      label: e.heading,
      metadata: e.metadata,
      shortHeading: e.shortHeading,
      textLabel: e.textLabel,
      el: e
      // used for matching items to data
    }));
  }
  getGroupData() {
    return this.groupItems.map((e) => ({
      label: e.label,
      el: e
    }));
  }
  resetText() {
    this.textInput.value && (this.textInput.value.value = ""), this.filterText = "";
  }
  getItems(e = !1) {
    return Array.from(this.el.querySelectorAll(V)).filter((i) => e || !i.disabled);
  }
  getGroupItems() {
    return Array.from(this.el.querySelectorAll(O));
  }
  addCustomChip(e, t) {
    const i = this.items.find((s) => (s.heading || s.textLabel) === e);
    if (i)
      this.toggleSelection(i, !0);
    else {
      const s = document.createElement(
        // TODO: [MIGRATION] If this is dynamically creating a web component, please read the docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#rendering-jsx-outside-the-component
        "calcite-combobox-item"
      );
      s.value = e, s.heading = e, this.el.prepend(s), this.updateItems(), this.toggleSelection(s, !0), this.open = !0, t && this.setFocus();
    }
  }
  removeActiveChip() {
    this.toggleSelection(this.selectedItems[this.activeChipIndex], !1), this.setFocus();
  }
  removeLastChip() {
    this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], !1), this.setFocus();
  }
  previousChip() {
    const e = this.selectedItems.length - 1, t = this.activeChipIndex;
    this.activeChipIndex = t === -1 ? e : Math.max(t - 1, 0), this.updateActiveItemIndex(-1), this.focusChip();
  }
  nextChip() {
    const e = this.selectedItems.length - 1, t = this.activeChipIndex + 1;
    t > e ? (this.activeChipIndex = -1, this.setFocus()) : (this.activeChipIndex = t, this.focusChip()), this.updateActiveItemIndex(-1);
  }
  focusChip() {
    const e = this.selectedItems[this.activeChipIndex]?.guid;
    (e ? this.referenceEl.querySelector(`#${L}${e}`) : null)?.setFocus();
  }
  scrollToActiveOrSelectedItem(e = !1) {
    const t = e && this.selectedItems?.length ? this.selectedItems[0] : this.filteredItems[this.activeItemIndex];
    t && t.scrollIntoView({ block: "nearest" });
  }
  shiftActiveItemIndex(e) {
    const { length: t } = this.filteredItems, i = (this.activeItemIndex + t + e) % t;
    this.updateActiveItemIndex(i), this.scrollToActiveOrSelectedItem();
  }
  updateActiveItemIndex(e) {
    this.activeItemIndex = e;
    let t = null;
    this.filteredItems.forEach((i, s) => {
      s === e ? (i.active = !0, t = `${z}${i.guid}`) : i.active = !1;
    }), this.activeDescendant = t, this.activeItemIndex > -1 && (this.activeChipIndex = -1);
  }
  isAllSelected() {
    return this.getItems().length === this.getSelectedItems().length;
  }
  isMulti() {
    return !x(this.selectionMode);
  }
  comboboxFocusHandler() {
    this.disabled || this.textInput.value?.focus();
  }
  // #endregion
  // #region Rendering
  renderChips() {
    const { activeChipIndex: e, readOnly: t, scale: i, selectionMode: s, messages: l } = this;
    return this.selectedItems.map((a, n) => {
      const o = {
        chip: !0,
        "chip--active": e === n
      }, h = [...M(a)].reverse(), p = $(a), I = [...h, a].map((w) => $(w)), u = s !== "ancestors" ? p : I.join(" / ");
      return f(p, d`<calcite-chip .appearance=${t ? "outline" : "solid"} class=${r(o)} .closable=${!t} data-test-id=${`chip-${n}`} .icon=${a.icon} .iconFlipRtl=${a.iconFlipRtl} id=${(a.guid ? `${L}${a.guid}` : null) ?? m} .label=${u} .messageOverrides=${{ dismissLabel: l.removeTag }} @focusin=${() => this.activeChipIndex = n} @calciteChipClose=${() => this.calciteChipCloseHandler(a)} .scale=${i} .selected=${a.selected} .tabIndex=${e === n ? 0 : -1} title=${u ?? m} .value=${a.value}>${u}</calcite-chip>`);
    });
  }
  renderAllSelectedIndicatorChip() {
    const { compactSelectionDisplay: e, scale: t, selectedVisibleChipsCount: i, setAllSelectedIndicatorChipEl: s } = this, l = this.messages.allSelected;
    return d`<calcite-chip class=${r({
      chip: !0,
      [c.chipInvisible]: !(this.isAllSelected() && !i && !e)
    })} .label=${l} .scale=${t} title=${l ?? m} value ${g(s)}>${l}</calcite-chip>`;
  }
  renderAllSelectedIndicatorChipCompact() {
    const { compactSelectionDisplay: e, scale: t, selectedVisibleChipsCount: i } = this, s = this.messages.all || "All";
    return d`<calcite-chip class=${r({
      chip: !0,
      [c.chipInvisible]: !(this.isAllSelected() && !i && e)
    })} .label=${s} .scale=${t} title=${s} value>${s}</calcite-chip>`;
  }
  renderSelectedIndicatorChip() {
    const { compactSelectionDisplay: e, selectionDisplay: t, getSelectedItems: i, scale: s, selectedHiddenChipsCount: l, selectedVisibleChipsCount: a, setSelectedIndicatorChipEl: n } = this;
    let o, h;
    if (e)
      o = !0;
    else if (t === "single") {
      const p = i().length;
      this.isAllSelected() ? o = !0 : p > 0 ? o = !1 : o = !0, h = `${p} ${this.messages.selected}`;
    } else t === "fit" && (o = !!(this.isAllSelected() && a === 0 || l === 0), h = a > 0 ? `+${l}` : `${l} ${this.messages.selected}`);
    return d`<calcite-chip class=${r({
      chip: !0,
      [c.chipInvisible]: o
    })} .label=${h} .scale=${s} title=${h ?? m} value ${g(n)}>${h}</calcite-chip>`;
  }
  renderSelectedIndicatorChipCompact() {
    const { compactSelectionDisplay: e, selectionDisplay: t, getSelectedItems: i, scale: s, selectedHiddenChipsCount: l } = this;
    let a, n;
    if (e) {
      const o = i().length;
      this.isAllSelected() ? a = !0 : t === "fit" ? (a = !(l > 0), n = `${l || 0}`) : t === "single" && (a = !(o > 0), n = `${o}`);
    } else
      a = !0;
    return d`<calcite-chip class=${r({
      chip: !0,
      [c.chipInvisible]: a
    })} .label=${n} .scale=${s} title=${n ?? m} value>${n}</calcite-chip>`;
  }
  renderInput() {
    const { guid: e, disabled: t, placeholder: i, selectionMode: s, selectedItems: l, open: a } = this, n = x(s), o = l[0], h = !a && n && !!o && !this.filterText;
    return d`<span class=${r({
      "input-wrap": !0,
      "input-wrap--single": n
    })}>${h && f("label", d`<span class=${r({
      label: !0,
      "label--icon": !!o?.icon
    })}>${$(o)}</span>`) || ""}${f("input", d`<input aria-activedescendant=${this.activeDescendant ?? m} aria-controls=${`${y}${e}`} aria-errormessage=${P.validationMessage} aria-owns=${`${y}${e}`} aria-autocomplete=list .ariaExpanded=${a} aria-haspopup=listbox .ariaInvalid=${this.status === "invalid"} .ariaLabel=${be(this)} class=${r({
      [c.input]: !0,
      "input--single": !0,
      [c.inputHidden]: h,
      "input--icon": this.showingInlineIcon && !!this.placeholderIcon
    })} data-test-id=input .disabled=${t} .id=${`${B}${e}`} @focus=${this.comboboxFocusHandler} @input=${this.inputHandler} placeholder=${i ?? m} .readOnly=${this.readOnly} role=combobox .tabIndex=${this.activeChipIndex === -1 ? 0 : -1} type=text .value=${K(this.filterText ?? "")} ${g(this.textInput)}>`)}</span>`;
  }
  renderListBoxOptions() {
    return this.filteredItems.map((e) => d`<li .ariaLabel=${e.label} .ariaSelected=${e.selected} id=${(e.guid ? `${z}${e.guid}` : null) ?? m} role=option tabindex=-1>${e.heading || e.textLabel}</li>`);
  }
  renderFloatingUIContainer() {
    const { setFloatingEl: e, setContainerEl: t, open: i } = this, s = {
      [c.listContainer]: !0,
      [E.animation]: !0,
      [E.animationActive]: i
    };
    return d`<div aria-hidden=true class=${r(c.floatingUIContainer)} ${g(e)}><div class=${r(s)} ${g(t)}><ul class=${r({ list: !0, "list--hide": !i })}><slot></slot></ul></div></div>`;
  }
  renderSelectedOrPlaceholderIcon() {
    const { open: e, placeholderIcon: t, placeholderIconFlipRtl: i, selectedItems: s } = this, l = s[0], a = l?.icon, n = t && (e || !l);
    return this.showingInlineIcon && f("selected-placeholder-icon", d`<span class="icon-start"><calcite-icon class=${r({
      [c.selectedIcon]: !n,
      [c.placeholderIcon]: n
    })} .flipRtl=${n ? i : l.iconFlipRtl} .icon=${n ? t : a} .scale=${S(this.scale)}></calcite-icon></span>`) || "";
  }
  renderChevronIcon() {
    const { open: e } = this;
    return f("chevron", d`<span class="icon-end"><calcite-icon class=${r(c.icon)} .icon=${e ? "chevron-up" : "chevron-down"} .scale=${S(this.scale)}></calcite-icon></span>`);
  }
  render() {
    const { selectionDisplay: e, guid: t, label: i, open: s, readOnly: l } = this, a = x(this.selectionMode), n = e === "all", o = e === "single", h = !a && e === "fit", p = !this.clearDisabled && this.value?.length > 0;
    return ue({ disabled: this.disabled, children: d`<div aria-live=polite class=${r({
      wrapper: !0,
      "wrapper--single": a || !this.selectedItems.length,
      "wrapper--active": s
    })} @click=${this.clickHandler} @keydown=${this.keyDownHandler} ${g(this.setReferenceEl)}>${this.renderSelectedOrPlaceholderIcon()}${f("grid", d`<div class=${r({
      "grid-input": !0,
      [c.selectionDisplayFit]: h,
      [c.selectionDisplaySingle]: o
    })} ${g(this.setChipContainerEl)}>${!a && !o && this.renderChips() || ""}${!a && !n && [
      this.renderSelectedIndicatorChip(),
      this.renderSelectedIndicatorChipCompact(),
      this.renderAllSelectedIndicatorChip(),
      this.renderAllSelectedIndicatorChipCompact()
    ] || ""}<label class=${r(c.screenReadersOnly)} .htmlFor=${`${B}${t}`} .id=${`${R}${t}`}>${i}</label>${this.renderInput()}</div>`)}${!l && p ? f("close-button", ye({ disabled: this.disabled, label: this.messages.clear, scale: this.scale })) : null}${!l && this.renderChevronIcon() || ""}</div><ul aria-labelledby=${`${R}${t}`} aria-multiselectable=true class=${r(c.screenReadersOnly)} .id=${`${y}${t}`} role=listbox tabindex=-1>${this.renderListBoxOptions()}</ul>${this.renderFloatingUIContainer()}${he({ component: this })}${this.validationMessage && this.status === "invalid" ? Ie({ icon: this.validationIcon, id: P.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
J("calcite-combobox", ke);
export {
  ke as Combobox
};
