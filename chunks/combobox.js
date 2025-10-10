import { b as W, L as U, c as v, u as G, E as u, x as d, s as r, D as N, q as _ } from "./index.js";
import { i as x } from "./keyed.js";
import { l as j } from "./live.js";
import { c as X } from "./core.js";
import { e as C, n as b } from "./ref.js";
import { f as J } from "./filter.js";
import { h as y, j as K, f as Q } from "./dom.js";
import { d as Y, r as Z, c as w, b as ee, f as te, h as ie, F as D } from "./floating-ui.js";
import { c as se, a as le, d as ae, s as ne, H as oe } from "./form.js";
import { g as ce } from "./guid.js";
import { u as re, I as he } from "./interactive.js";
import { c as de, d as pe, g as ue } from "./label.js";
import { c as H, u as T } from "./observers.js";
import { t as me } from "./openCloseComponent.js";
import { C as fe, X as be } from "./XButton.js";
import { i as M, g as R } from "./component.js";
import { I as ge } from "./InternalLabel.js";
import { V as ve } from "./Validation.js";
import { u as xe } from "./useT9n.js";
import { h as Ie } from "./text.js";
import { u as Ce } from "./useSetFocus.js";
import { u as Se } from "./useCancelable.js";
import { I as p, b as o, C as F, a as z, c as O } from "./resources2.js";
import { h as V, i as S, g as k, a as P, b as $e } from "./utils.js";
import { d as ye } from "./debounce.js";
import { e as L } from "./escapeRegExp.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const we = W`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:block}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-internal-combobox-spacing-unit-l: .5rem;--calcite-internal-combobox-spacing-unit-s: .25rem;--calcite-internal-combobox-no-matches-spacing-unit-s: .25rem;--calcite-combobox-input-height: 1rem;--calcite-internal-combobox-input-margin-block: calc(.25rem - 1px) ;--calcite-internal-close-size: 1rem}:host([scale=s]) .x-button{margin-inline:.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-internal-combobox-spacing-unit-l: .75rem;--calcite-internal-combobox-spacing-unit-s: .5rem;--calcite-internal-combobox-no-matches-spacing-unit-s: .375rem;--calcite-combobox-input-height: 1rem;--calcite-internal-combobox-input-margin-block: calc(.5rem - 1px) ;--calcite-internal-close-size: 1.5rem}:host([scale=m]) .x-button{margin-inline-end:.75rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-internal-combobox-spacing-unit-l: 1rem;--calcite-internal-combobox-spacing-unit-s: .75rem;--calcite-internal-combobox-no-matches-spacing-unit-s: .625rem;--calcite-combobox-input-height: 1.5rem;--calcite-internal-combobox-input-margin-block: calc(.625rem - 1px) ;--calcite-internal-close-size: 2rem}:host([scale=l]) .x-button{margin-inline-end:1rem}.x-button{align-self:center}.wrapper{display:flex;border-width:1px;border-style:solid;outline-color:transparent;padding-block:calc(var(--calcite-internal-combobox-spacing-unit-s) / 4);padding-inline:var(--calcite-internal-combobox-spacing-unit-l);background-color:var(--calcite-combobox-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-combobox-input-text-color, var(--calcite-color-text-1));border-color:var(--calcite-combobox-input-border-color, var(--calcite-color-border-input))}.wrapper:hover .icon{color:var(--calcite-combobox-icon-color-hover, var(--calcite-color-text-1))}:host(:focus-within) .wrapper,.wrapper--active{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([read-only]) .wrapper{background-color:var(--calcite-color-background)}:host([read-only]) .label{font-weight:var(--calcite-font-weight-medium)}:host([status=invalid]) .wrapper{border-color:var(--calcite-color-status-danger)}:host([status=invalid]:focus-within) .wrapper{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.wrapper--single{padding-block:0;padding-inline:var(--calcite-internal-combobox-spacing-unit-l);cursor:pointer;flex-wrap:nowrap}.grid-input{position:relative;display:flex;flex-grow:1;flex-wrap:wrap;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0;gap:var(--calcite-internal-combobox-spacing-unit-s);margin-inline-end:var(--calcite-internal-combobox-spacing-unit-s)}.grid-input.selection-display--fit,.grid-input.selection-display--single{flex-wrap:nowrap;overflow:hidden}.input{flex-grow:1;appearance:none;overflow:hidden;text-overflow:ellipsis;border-style:none;background-color:transparent;padding:0;font-family:inherit;color:var(--calcite-color-text-1);font-size:inherit;block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);inline-size:100%;margin-block-end:var(--calcite-internal-combobox-spacing-unit-s);min-inline-size:4.8125rem}.input:focus{outline:2px solid transparent;outline-offset:2px}.input:placeholder-shown{text-overflow:ellipsis}.input--single{padding:0;margin-block:var(--calcite-internal-combobox-input-margin-block)}.wrapper--active .input-single{cursor:text}.input--hidden{pointer-events:none;width:0px;min-width:0px;opacity:0}.input--icon{padding-block:0;padding-inline:var(--calcite-internal-combobox-spacing-unit-l)}.placeholder-icon{color:var(--calcite-combobox-icon-color, var(--calcite-color-text-3))}.input-wrap{display:flex;flex-grow:1;align-items:center}.input-wrap--single{flex:1 1 0%;overflow:hidden}.label{pointer-events:none;max-width:100%;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0;font-weight:var(--calcite-font-weight-normal);block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--icon{padding-inline:var(--calcite-internal-combobox-spacing-unit-l)}.icon-end,.icon-start{display:flex;cursor:pointer;align-items:center}.icon-end{flex:none}.icon-end .icon{color:var(--calcite-combobox-icon-color, var(--calcite-color-text-3))}.floating-ui-container{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown);inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.floating-ui-container{opacity:0;inset-block-start:0;left:0}}.floating-ui-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.floating-ui-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.floating-ui-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.floating-ui-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.floating-ui-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}@media (forced-colors: active){.wrapper,.floating-ui-container{border:1px solid canvasText}}.screen-readers-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.list-container{max-height:45vh;overflow-y:auto;inline-size:var(--calcite-dropdown-width, 100%);background-color:var(--calcite-combobox-background-color, var(--calcite-color-foreground-1))}.list{margin:0;display:block;padding:0}.list--hide{height:0px;overflow:hidden}calcite-chip{--calcite-animation-timing: 0}.chip{margin-block:calc(var(--calcite-internal-combobox-spacing-unit-s) / 4);max-inline-size:100%}.chip--invisible{visibility:hidden;position:absolute}.item{display:block}.select-all{background-color:var(--calcite-combobox-item-background-color-active, var(--calcite-color-foreground-1));border-block-end-color:var(--calcite-combobox-divider-color, var(--calcite-combobox-item-border-color, var(--calcite-color-border-3)));border-block-end-style:solid;border-block-end-width:var(--calcite-border-width-sm);inset-block-start:0;position:sticky;z-index:var(--calcite-z-index-sticky)}.no-matches{padding-block:var(--calcite-internal-combobox-no-matches-spacing-unit-s);padding-inline:var(--calcite-internal-combobox-spacing-unit-l);color:var(--calcite-combobox-input-text-color, var(--calcite-color-text-1));background:var(--calcite-combobox-background-color, var(--calcite-color-foreground-1));cursor:pointer}.no-matches-placeholder{color:var(--calcite-combobox-icon-color, var(--calcite-color-text-3));cursor:default}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.x-button{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-style:none;cursor:pointer;outline-color:transparent;align-items:center;margin:0;background-color:var(--calcite-close-background-color, var(--calcite-color-foreground-2));-webkit-appearance:none;display:flex;align-content:center;justify-content:center;color:var(--calcite-close-icon-color, var(--calcite-color-text-3));block-size:var(--calcite-internal-close-size, 1.5rem);inline-size:var(--calcite-internal-close-size, 1.5rem);min-block-size:var(--calcite-internal-close-size, 1.5rem);min-inline-size:var(--calcite-internal-close-size, 1.5rem);padding:0}.x-button:hover,.x-button:focus{background-color:var(--calcite-close-background-color-hover, var(--calcite-color-foreground-3))}.x-button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.x-button:active{background-color:var(--calcite-close-background-color-press, var(--calcite-color-transparent-press))}.x-button calcite-icon{color:inherit}.x-button--round{border-radius:9999px}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}.text-match{background-color:transparent;color:inherit;font-weight:var(--calcite-font-weight-bold)}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}`;
class ke extends U {
  constructor() {
    super(), this.closeButtonRef = C(), this.selectAllComboboxItemRef = C(), this.allSelectedIndicatorChipRef = C(), this.cancelable = Se()(this), this.filterItems = (() => {
      const e = (t, i) => t && i.some(({ el: s }) => t === s);
      return ye((t, i = !1, s = !0) => {
        const l = J([...this.data, ...this.groupData], t, this.effectiveFilterProps), a = this.getItemsAndGroups(), n = t === "";
        a.forEach((c) => {
          if (n) {
            c.itemHidden = !1;
            return;
          }
          const h = !e(c, l);
          c.itemHidden = h;
          const [m, $] = c.ancestors;
          (e(m, l) || e($, l)) && (c.itemHidden = !1), h || c.ancestors.forEach((f) => f.itemHidden = !1);
        }), this.noMatchesFound = this.filteredItems.length === 0 && !!this.filterText, this.filterTextMatchPattern = this.filterText && new RegExp(`(${L(this.filterText)})`, "i"), this.keyboardNavItems.forEach((c) => {
          c.filterTextMatchPattern = this.filterTextMatchPattern;
        }), i && (this.open = this.filterText.trim().length > 0), s && this.calciteComboboxFilterChange.emit();
      }, N.filter);
    })(), this._filterText = "", this.getSelectedItems = () => {
      if (!this.isMulti()) {
        const e = this.items.find(({ selected: t }) => t);
        return e ? [e] : [];
      }
      return this.items.filter((e) => e.selected && (this.selectionMode !== "ancestors" || !V(e))).sort((e, t) => {
        const i = this.selectedItems.indexOf(e), s = this.selectedItems.indexOf(t);
        return i > -1 && s > -1 ? i - s : s - i;
      });
    }, this.groupItems = [], this.guid = ce(), this.ignoreSelectedEventsFlag = !1, this.inputHeight = 0, this.internalValueChangeFlag = !1, this.mutationObserver = H("mutation", () => this.updateItems()), this.onLabelClick = () => {
      this.setFocus();
    }, this.transitionProp = "opacity", this.placement = Y, this.resizeObserver = H("resize", () => {
      this.setMaxScrollerHeight(), this.refreshSelectionDisplay();
    }), this.selectedIndicatorChipRef = C(), this._selectedItems = [], this.textInputRef = C(), this._value = null, this.messages = xe(), this.focusSetter = Ce()(this), this.customChipAddHandler = () => {
      this.addCustomChip(this.filterText, !0);
    }, this.activeChipIndex = -1, this.activeDescendant = "", this.activeItemIndex = -1, this.compactSelectionDisplay = !1, this.selectedHiddenChipsCount = 0, this.selectedVisibleChipsCount = 0, this.items = [], this.clearDisabled = !1, this.disabled = !1, this.maxItems = 0, this.open = !1, this.overlayPositioning = "absolute", this.placeholderIconFlipRtl = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.selectAllEnabled = !1, this.selectionDisplay = "all", this.selectionMode = "multiple", this.status = "idle", this.validity = {
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
    }, this.calciteComboboxBeforeClose = v({ cancelable: !1 }), this.calciteComboboxBeforeOpen = v({ cancelable: !1 }), this.calciteComboboxChange = v({ cancelable: !1 }), this.calciteComboboxChipClose = v({ cancelable: !1 }), this.calciteComboboxClose = v({ cancelable: !1 }), this.calciteComboboxFilterChange = v({ cancelable: !1 }), this.calciteComboboxOpen = v({ cancelable: !1 }), this.listenOn(document, "click", this.documentClickHandler), this.listen("calciteComboboxItemChange", this.calciteComboboxItemChangeHandler), this.listen("calciteInternalComboboxItemChange", this.calciteInternalComboboxItemChangeHandler), this.listen("click", this.comboboxFocusHandler);
  }
  static {
    this.properties = { activeChipIndex: 16, activeDescendant: 16, activeItemIndex: 16, compactSelectionDisplay: 16, selectedHiddenChipsCount: 16, selectedVisibleChipsCount: 16, items: 16, noMatchesFound: 16, allowCustomValues: 7, clearDisabled: 7, disabled: 7, filterText: 3, filterProps: 0, filteredItems: 32, flipPlacements: 0, form: 3, label: 1, labelText: 1, maxItems: 11, messageOverrides: 0, name: 3, open: 7, overlayPositioning: 3, placeholder: 1, placeholderIcon: [3, { type: String }], placeholderIconFlipRtl: 7, readOnly: 7, required: 7, scale: 3, selectAllEnabled: 7, selectedItems: 0, selectionDisplay: 3, selectionMode: 3, status: 3, validationIcon: [3, { converter: G, type: String }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.styles = we;
  }
  get effectiveFilterProps() {
    return this.filterProps ? this.filterProps.filter((e) => e !== "el") : ["description", "label", "metadata", "shortHeading", "textLabel"];
  }
  get showingInlineIcon() {
    const { placeholderIcon: e, selectionMode: t, selectedItems: i, open: s } = this, l = i[0], a = l?.icon, n = S(t);
    return !s && l ? !!a && n : !!e && (!l || n);
  }
  get allSelected() {
    return this.selectedItems.length === this.items.length;
  }
  get indeterminate() {
    return this.selectedItems.length > 0 && !this.allSelected;
  }
  get keyboardNavItems() {
    const { selectAllComboboxItemRef: e } = this, t = this.filteredItems.filter((i) => !i.disabled);
    return e.value ? [e.value, ...t] : t;
  }
  get filterText() {
    return this._filterText;
  }
  set filterText(e) {
    const t = this._filterText;
    e !== t && (this._filterText = e, this.filterTextChange(e));
  }
  get filteredItems() {
    return this.items.filter((e) => !M(e));
  }
  get selectedItems() {
    return this._selectedItems;
  }
  set selectedItems(e) {
    const t = this._selectedItems;
    e !== t && (this._selectedItems = e, this.selectedItemsHandler());
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    e !== t && (this._value = e, this.valueHandler(e));
  }
  async reposition(e = !1) {
    const { floatingEl: t, referenceEl: i, placement: s, overlayPositioning: l, filteredFlipPlacements: a } = this;
    return Z(this, {
      floatingEl: t,
      referenceEl: i,
      overlayPositioning: l,
      placement: s,
      flipPlacements: a,
      type: "menu"
    }, e);
  }
  async setFocus(e) {
    return this.focusSetter(() => (this.activeChipIndex = -1, this.activeItemIndex = -1, this.textInputRef.value), e);
  }
  connectedCallback() {
    super.connectedCallback(), de(this), se(this), this.internalValueChangeFlag = !0, this.value = this.getValue(), this.internalValueChangeFlag = !1, this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setFilteredPlacements(), w(this), this.cancelable.add(this.filterItems);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(this.disabled), e.has("maxItems") && (this.hasUpdated || this.maxItems !== 0) && this.setMaxScrollerHeight(), e.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") && this.reposition(!0), (e.has("selectionMode") || e.has("scale")) && this.updateItems(), e.has("flipPlacements") && this.flipPlacementsHandler();
  }
  updated() {
    this.el.offsetHeight !== this.inputHeight && (this.reposition(!0), this.inputHeight = this.el.offsetHeight), re(this), this.refreshSelectionDisplay();
  }
  async load() {
    this.handleSelectionModeWarning();
  }
  loaded() {
    le(this, this.getValue()), w(this), this.updateItems(), this.filterItems(this.filterText, !1, !1);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.resizeObserver?.disconnect(), pe(this), ae(this), ee(this);
  }
  emitComboboxChange() {
    this.calciteComboboxChange.emit();
  }
  filterTextChange(e) {
    this.updateActiveItemIndex(-1), this.filterItems(e, !0);
  }
  openHandler() {
    me(this), !this.disabled && this.setMaxScrollerHeight();
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
  handleSelectAll(e) {
    e && this.toggleSelectAll(), this.allSelected && this.selectedItems.forEach((t) => {
      const i = this.referenceEl.querySelector(`#${p.chip(t.guid)}`);
      i && this.hideChip(i);
    });
  }
  calciteComboboxItemChangeHandler(e) {
    if (this.ignoreSelectedEventsFlag)
      return;
    const t = e.target, i = e.composedPath().includes(this.selectAllComboboxItemRef.value);
    this.selectAllEnabled && this.handleSelectAll(i);
    const s = this.keyboardNavItems.indexOf(t);
    this.updateActiveItemIndex(s), this.toggleSelection(t, t.selected), this.selectedItems = this.getSelectedItems();
  }
  calciteInternalComboboxItemChangeHandler(e) {
    e.stopPropagation(), this.hasUpdated && this.updateItems();
  }
  clearValue() {
    this.ignoreSelectedEventsFlag = !0, this.items.forEach((e) => e.selected = !1), this.ignoreSelectedEventsFlag = !1, this.selectedItems = [], this.emitComboboxChange(), this.open = !1, this.updateActiveItemIndex(-1), this.resetText(), this.filterItems(""), this.setFocus();
  }
  clearInputValue() {
    this.textInputRef.value && (this.textInputRef.value.value = ""), this.filterText = "";
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? te(t, e) : null;
  }
  getValue() {
    const e = this.selectedItems.map((t) => t.value?.toString());
    return e.length ? e.length > 1 ? e : e[0] : "";
  }
  comboboxInViewport() {
    const e = this.el.getBoundingClientRect();
    return e.top >= 0 && e.left >= 0 && e.right <= (window.innerWidth || document.documentElement.clientWidth) && e.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }
  toggleSelectAll() {
    const e = !this.allSelected;
    this.items.forEach((t) => t.selected = e), this.selectedItems = e ? this.items : [], this.emitComboboxChange();
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
        (this.activeChipIndex !== -1 || this.textInputRef.value.selectionStart === 0) && (this.previousChip(), e.preventDefault());
        break;
      case "ArrowRight":
        this.activeChipIndex !== -1 && (this.nextChip(), e.preventDefault());
        break;
      case "ArrowUp":
        this.keyboardNavItems.length && (e.preventDefault(), this.open && this.shiftActiveItemIndex(-1), this.scrollToActiveOrSelectedItem(), this.comboboxInViewport() || this.el.scrollIntoView()), this.scrollToActiveOrSelectedItem();
        break;
      case "ArrowDown":
        this.keyboardNavItems.length && (e.preventDefault(), this.open ? this.shiftActiveItemIndex(1) : (this.open = !0, this.ensureRecentSelectedItemIsActive()), this.scrollToActiveOrSelectedItem(), this.comboboxInViewport() || this.el.scrollIntoView());
        break;
      case " ":
        !this.textInputRef.value.value && !e.defaultPrevented && (this.open || (this.open = !0, this.shiftActiveItemIndex(1)), e.preventDefault());
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
          const i = this.keyboardNavItems[this.activeItemIndex];
          this.toggleSelection(i, !i.selected), e.preventDefault(), this.selectAllEnabled && this.handleSelectAll(i === this.selectAllComboboxItemRef.value);
        } else this.activeChipIndex > -1 ? (this.removeActiveChip(), e.preventDefault()) : this.allowCustomValues && this.filterText ? (this.addCustomChip(this.filterText, !0), e.preventDefault()) : e.defaultPrevented || ne(this) && e.preventDefault();
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
    this.calciteComboboxClose.emit(), ie(this);
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
    if (t.some((i) => i.classList?.contains(fe.button))) {
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
    e.classList.add(o.chipInvisible);
  }
  showChip(e) {
    e.classList.remove(o.chipInvisible);
  }
  refreshChipDisplay({ chipEls: e, availableHorizontalChipElSpace: t, chipContainerElGap: i }) {
    e.forEach((s) => {
      if (!s.selected)
        this.hideChip(s);
      else {
        const l = y(s);
        if (l && l < t) {
          t -= l + i, this.showChip(s);
          return;
        }
      }
      this.hideChip(s);
    });
  }
  async refreshSelectionDisplay() {
    if (this.componentOnReady(), S(this.selectionMode) || !this.textInputRef.value || !this.chipContainerEl)
      return;
    const { allSelectedIndicatorChipRef: e, chipContainerEl: t, selectionDisplay: i, placeholder: s, selectedIndicatorChipRef: l, textInputRef: a } = this, n = parseInt(getComputedStyle(t).gap.replace("px", "")), c = y(t), { fontSize: h, fontFamily: m } = getComputedStyle(a.value), f = (K(s, `${h} ${m}`) || parseInt(X)) + n, A = y(e.value), E = y(l.value), B = Math.max(A, E);
    if (this.setCompactSelectionDisplay({
      chipContainerElGap: n,
      chipContainerElWidth: c,
      inputWidth: f,
      largestSelectedIndicatorChipWidth: B
    }), this.allSelected && this.selectAllEnabled && this.selectedItems.forEach((I) => {
      const g = this.referenceEl.querySelector(`#${p.chip(I.guid)}`);
      g && this.hideChip(g);
    }), this.indeterminate && this.selectedItems.forEach((I) => {
      const g = this.referenceEl.querySelector(`#${p.chip(I.guid)}`);
      g && this.showChip(g);
    }), i === "fit") {
      const I = Array.from(this.el.shadowRoot.querySelectorAll("calcite-chip")).filter((q) => q.closable), g = Math.round(c - ((this.selectedHiddenChipsCount > 0 ? E : 0) + n + f + n));
      this.refreshChipDisplay({ availableHorizontalChipElSpace: g, chipContainerElGap: n, chipEls: I }), this.setVisibleAndHiddenChips(I);
    }
  }
  setFloatingEl(e) {
    this.floatingEl = e, w(this);
  }
  setCompactSelectionDisplay({ chipContainerElGap: e, chipContainerElWidth: t, inputWidth: i, largestSelectedIndicatorChipWidth: s }) {
    const l = Math.round(s + e + i);
    (!this.maxCompactBreakpoint || this.maxCompactBreakpoint < l) && (this.maxCompactBreakpoint = l), this.compactSelectionDisplay = t < this.maxCompactBreakpoint;
  }
  setContainerEl(e) {
    T(this.resizeObserver, this.listContainerEl, e), this.listContainerEl = e, this.transitionEl = e;
  }
  setChipContainerEl(e) {
    T(this.resizeObserver, this.chipContainerEl, e), this.chipContainerEl = e;
  }
  setReferenceEl(e) {
    this.referenceEl = e, w(this);
  }
  setVisibleAndHiddenChips(e) {
    let t = 0;
    e.forEach((s) => {
      s.selected && !s.classList.contains(o.chipInvisible) && t++;
    }), t !== this.selectedVisibleChipsCount && (this.selectedVisibleChipsCount = t);
    const i = this.getSelectedItems().length - t;
    i !== this.selectedHiddenChipsCount && (this.selectedHiddenChipsCount = i);
  }
  getMaxScrollerHeight() {
    const t = [...this.groupItems, ...this.getItems(!0)].filter((a) => !M(a)), { maxItems: i } = this;
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
    const t = e.getBoundingClientRect().height, i = `:scope > ${F}, :scope > ${z}`, s = Array.from(e.querySelectorAll(i)).reduce((l, a) => l + a.getBoundingClientRect().height, 0);
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
    !e || this.selectionMode === "single-persist" && e.selected && e.value === this.value && !t || (this.isMulti() ? this.handleMultiSelection(e, t) : this.handleSingleSelection(e, t));
  }
  handleMultiSelection(e, t) {
    e.selected = t, this.updateAncestors(e), this.selectedItems = this.getSelectedItems(), this.emitComboboxChange(), this.resetText(), this.filterItems("");
  }
  handleSingleSelection(e, t) {
    this.ignoreSelectedEventsFlag = !0, this.items.forEach((i) => i.selected = i === e ? t : !1), this.ignoreSelectedEventsFlag = !1, this.selectedItems = this.getSelectedItems(), this.emitComboboxChange(), this.textInputRef.value && (this.textInputRef.value.value = k(e)), this.open = !1, this.updateActiveItemIndex(-1), this.resetText(), this.filterItems("");
  }
  updateAncestors(e) {
    if (this.selectionMode !== "ancestors")
      return;
    const t = P(e), i = $e(e);
    e.selected ? t.forEach((s) => {
      s.selected = !0;
    }) : (i.forEach((s) => s.selected = !1), [...t].forEach((s) => {
      V(s) || (s.selected = !1);
    }));
  }
  updateItems() {
    this.items = this.getItems(), this.groupItems = this.getGroupItems(), this.data = this.getData(), this.groupData = this.getGroupData(), this.updateItemProps(), this.selectedItems = this.getSelectedItems();
  }
  updateItemProps() {
    this.getItems(!0).forEach((e) => {
      e.selectionMode = this.selectionMode, e.scale = this.scale;
    }), this.groupItems.forEach((e, t) => (e.scale = this.scale, e.position = t)), this.allowCustomValues || this.setMaxScrollerHeight(), this.groupItems.forEach((e, t, i) => {
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
    this.textInputRef.value && (this.textInputRef.value.value = ""), this.filterText = "";
  }
  getItems(e = !1) {
    return Array.from(this.el.querySelectorAll(F)).filter((i) => e || !i.disabled);
  }
  getGroupItems() {
    return Array.from(this.el.querySelectorAll(z));
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
    t > e ? (this.activeChipIndex = -1, Q(this.textInputRef.value)) : (this.activeChipIndex = t, this.focusChip()), this.updateActiveItemIndex(-1);
  }
  focusChip() {
    const e = this.selectedItems[this.activeChipIndex]?.guid;
    (e ? this.referenceEl.querySelector(`#${p.chip(e)}`) : null)?.setFocus();
  }
  scrollToActiveOrSelectedItem(e = !1) {
    const t = e && this.selectedItems?.length ? this.selectedItems[0] : this.keyboardNavItems[this.activeItemIndex], i = this.listContainerEl;
    if (!t || !i)
      return;
    t.scrollIntoView({ block: "nearest" });
    const l = this.selectAllComboboxItemRef.value?.offsetHeight || 0, a = t.getBoundingClientRect(), n = i.getBoundingClientRect();
    a.top < n.top + l && (i.scrollTop -= n.top + l - a.top);
  }
  shiftActiveItemIndex(e) {
    const { length: t } = this.keyboardNavItems, i = (this.activeItemIndex + t + e) % t;
    this.updateActiveItemIndex(i), this.scrollToActiveOrSelectedItem();
  }
  updateActiveItemIndex(e) {
    this.activeItemIndex = e;
    let t = null;
    this.keyboardNavItems.forEach((i, s) => {
      s === e ? (i.active = !0, t = `${p.item(i.guid)}`) : i.active = !1;
    }), this.activeDescendant = t, this.activeItemIndex > -1 && (this.activeChipIndex = -1);
  }
  isMulti() {
    return !S(this.selectionMode);
  }
  comboboxFocusHandler() {
    this.disabled || this.textInputRef.value.focus();
  }
  createScreenReaderItem({ ariaLabel: e, ariaSelected: t, id: i, textContent: s }) {
    return d`<li aria-label=${e ?? u} aria-selected=${t ?? u} id=${i ?? u} role=option tabindex=-1>${s}</li>`;
  }
  handleSelectionModeWarning() {
    this.selectionMode === "single-persist" && this.clearDisabled && console.warn('clearDisabled is ignored when selection-mode is set to "single-persist"');
  }
  renderChips() {
    const { activeChipIndex: e, readOnly: t, scale: i, selectionMode: s, messages: l } = this;
    return this.selectAllEnabled && this.allSelected ? null : this.selectedItems.map((a, n) => {
      const c = {
        [o.chip]: !0
      }, h = [...P(a)].reverse(), m = k(a), $ = [...h, a].map((A) => k(A)), f = s !== "ancestors" ? m : $.join(" / ");
      return x(m, d`<calcite-chip .appearance=${t ? "outline" : "solid"} class=${r(c)} .closable=${!t} data-test-id=${`chip-${n}`} .icon=${a.icon} .iconFlipRtl=${a.iconFlipRtl} id=${(a.guid ? `${p.chip(a.guid)}` : null) ?? u} .label=${f} .messageOverrides=${{ dismissLabel: l.removeTag }} @focusin=${() => this.activeChipIndex = n} @calciteChipClose=${() => this.calciteChipCloseHandler(a)} .scale=${i} .selected=${a.selected} .tabIndex=${e === n ? 0 : -1} title=${f ?? u} .value=${a.value}>${f}</calcite-chip>`);
    });
  }
  renderAllSelectedIndicatorChip() {
    const { allSelectedIndicatorChipRef: e, compactSelectionDisplay: t, scale: i, selectedVisibleChipsCount: s } = this, l = t ? this.messages.all : this.messages.allSelected;
    return d`<calcite-chip class=${r({
      [o.chip]: !0,
      [o.chipInvisible]: !(this.allSelected && !s),
      [o.allSelected]: !0
    })} data-test-id=all-selected-indicator-chip .label=${l} .scale=${i} title=${l ?? u} value ${b(e)}>${l}</calcite-chip>`;
  }
  renderSelectedIndicatorChip() {
    const { compactSelectionDisplay: e, selectionDisplay: t, getSelectedItems: i, scale: s, selectedHiddenChipsCount: l, selectedVisibleChipsCount: a, selectedIndicatorChipRef: n } = this;
    let c, h;
    if (e)
      c = !0;
    else if (t === "single") {
      const m = i().length;
      this.allSelected ? c = !0 : m > 0 ? c = !1 : c = !0, h = `${m} ${this.messages.selected}`;
    } else t === "fit" && (c = !!(this.allSelected && a === 0 || l === 0), h = a > 0 ? `+${l}` : `${l} ${this.messages.selected}`);
    return d`<calcite-chip class=${r({
      [o.chip]: !0,
      [o.chipInvisible]: c
    })} .label=${h} .scale=${s} title=${h ?? u} value ${b(n)}>${h}</calcite-chip>`;
  }
  renderSelectedIndicatorChipCompact() {
    const { compactSelectionDisplay: e, selectionDisplay: t, getSelectedItems: i, scale: s, selectedHiddenChipsCount: l } = this;
    let a, n;
    if (e) {
      const c = i().length;
      this.allSelected ? a = !0 : t === "fit" ? (a = !(l > 0), n = `${l || 0}`) : t === "single" && (a = !(c > 0), n = `${c}`);
    } else
      a = !0;
    return d`<calcite-chip class=${r({
      [o.chip]: !0,
      [o.chipInvisible]: a
    })} .label=${n} .scale=${s} title=${n ?? u} value>${n}</calcite-chip>`;
  }
  renderInput() {
    const { guid: e, disabled: t, placeholder: i, selectionMode: s, selectedItems: l, open: a } = this, n = S(s), c = l[0], h = !a && n && !!c && !this.filterText;
    return d`<span class=${r({
      [o.inputWrap]: !0,
      [o.inputWrapSingle]: n
    })}>${h && x("label", d`<span class=${r({
      [o.label]: !0,
      [o.labelIcon]: !!c?.icon
    })}>${k(c)}</span>`) || ""}${x("input", d`<input aria-activedescendant=${this.activeDescendant ?? u} aria-controls=${`${p.listbox(e)}`} aria-errormessage=${p.validationMessage} aria-owns=${`${p.listbox(e)}`} aria-autocomplete=list .ariaExpanded=${a} aria-haspopup=listbox .ariaInvalid=${this.status === "invalid"} .ariaLabel=${ue(this)} class=${r({
      [o.input]: !0,
      [o.inputSingle]: !0,
      [o.inputHidden]: h,
      [o.inputIcon]: this.showingInlineIcon && !!this.placeholderIcon
    })} data-test-id=input .disabled=${t} .id=${`${p.input(e)}`} @focus=${this.comboboxFocusHandler} @input=${this.inputHandler} placeholder=${i ?? u} .readOnly=${this.readOnly} .required=${this.required} role=combobox .tabIndex=${this.activeChipIndex === -1 ? 0 : -1} type=text .value=${j(this.filterText ?? "")} ${b(this.textInputRef)}>`)}</span>`;
  }
  renderListBoxOptions() {
    const e = this.keyboardNavItems.map((t) => this.createScreenReaderItem({
      ariaLabel: t.label,
      ariaSelected: t.selected,
      id: `${p.item(t.guid)}`,
      textContent: t.heading || t.textLabel
    }));
    if (this.selectAllEnabled && this.selectionMode !== "single" && this.selectionMode !== "single-persist") {
      const t = this.createScreenReaderItem({
        ariaLabel: this.messages.selectAll,
        ariaSelected: this.allSelected,
        textContent: this.messages.selectAll
      });
      t && e.unshift(t);
    }
    return e;
  }
  renderFloatingUIContainer() {
    const { messages: e, setFloatingEl: t, setContainerEl: i, open: s, scale: l } = this, a = {
      [o.listContainer]: !0,
      [D.animation]: !0,
      [D.animationActive]: s
    }, n = (this.filterText && e.add?.replace("{text}", `${this.filterText}`)) ?? "";
    return d`<div aria-hidden=true class=${r(o.floatingUIContainer)} ${b(t)}><div class=${r(a)} ${b(i)}><ul class=${r({ [o.list]: !0, [o.listHide]: !s })}>${this.selectAllEnabled && this.selectionMode !== "single" && this.selectionMode !== "single-persist" && d`<calcite-combobox-item class=${r(o.selectAll)} .id=${`${this.guid}-select-all-enabled-interactive`} .indeterminate=${this.indeterminate} .label=${e.selectAll} .scale=${l} .selected=${this.allSelected} tabindex=-1 text-label=${e.selectAll ?? u} value=select-all ${b(this.selectAllComboboxItemRef)}></calcite-combobox-item>` || ""}<slot></slot>${this.noMatchesFound && (this.allowCustomValues ? d`<li aria-label=${n ?? u} class=${r(o.noMatches)} @click=${this.customChipAddHandler} role=option tabindex=0>${Ie({
      text: n,
      pattern: new RegExp(`(${L(this.filterText)})`, "i")
    })}</li>` : d`<li class=${r({ [o.noMatchesPlaceholder]: !0, [o.noMatches]: !0 })}>${e.noMatches}</li>`) || ""}</ul></div></div>`;
  }
  renderSelectedOrPlaceholderIcon() {
    const { open: e, placeholderIcon: t, placeholderIconFlipRtl: i, selectedItems: s } = this, l = s[0], a = l?.icon, n = t && (e || !l);
    return this.showingInlineIcon && x("selected-placeholder-icon", d`<span class=${r(o.iconStart)}><calcite-icon class=${r({
      [o.selectedIcon]: !n,
      [o.placeholderIcon]: n
    })} .flipRtl=${n ? i : l.iconFlipRtl} .icon=${n ? t : a} .scale=${R(this.scale)}></calcite-icon></span>`) || "";
  }
  renderChevronIcon() {
    const { open: e } = this;
    return x("chevron", d`<span class=${r(o.iconEnd)}><calcite-icon class=${r(o.icon)} .icon=${e ? O.chevronUp : O.chevronDown} .scale=${R(this.scale)}></calcite-icon></span>`);
  }
  render() {
    const { selectionDisplay: e, guid: t, label: i, open: s, readOnly: l } = this, a = S(this.selectionMode), n = e === "all", c = e === "single", h = !a && e === "fit", m = !this.clearDisabled && this.selectionMode !== "single-persist" && !!this.value?.length;
    return he({ disabled: this.disabled, children: d`${this.labelText && ge({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div aria-live=polite class=${r({
      [o.wrapper]: !0,
      [o.wrapperSingle]: a || !this.selectedItems.length,
      [o.wrapperActive]: s
    })} @click=${this.clickHandler} @keydown=${this.keyDownHandler} ${b(this.setReferenceEl)}>${this.renderSelectedOrPlaceholderIcon()}${x("grid", d`<div class=${r({
      [o.gridInput]: !0,
      [o.selectionDisplayFit]: h,
      [o.selectionDisplaySingle]: c
    })} ${b(this.setChipContainerEl)}>${!a && !c && this.renderChips() || ""}${!a && !c && this.selectAllEnabled && this.renderAllSelectedIndicatorChip() || ""}${!a && !n && [
      this.renderSelectedIndicatorChip(),
      this.renderSelectedIndicatorChipCompact(),
      this.renderAllSelectedIndicatorChip()
    ] || ""}<label class=${r(o.screenReadersOnly)} .htmlFor=${`${p.input(t)}`} .id=${`${p.label(t)}`}>${i}</label>${this.renderInput()}</div>`)}${!l && m ? x("close-button", be({ disabled: this.disabled, label: this.messages.clear, ref: this.closeButtonRef, scale: this.scale })) : null}${!l && this.renderChevronIcon() || ""}</div><ul aria-labelledby=${`${p.label(t)}`} aria-multiselectable=true class=${r(o.screenReadersOnly)} .id=${`${p.listbox(t)}`} role=listbox tabindex=-1>${this.renderListBoxOptions()}</ul>${this.renderFloatingUIContainer()}${oe({ component: this })}${this.validationMessage && this.status === "invalid" ? ve({ icon: this.validationIcon, id: p.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
_("calcite-combobox", ke);
export {
  ke as Combobox
};
