/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as ae, L as ne, P as oe, c as S, T as ce, A as I, b as m, l as re, s as d, d as he } from "./index.js";
import { i as k } from "./keyed.js";
import { l as de } from "./live.js";
import { d as pe } from "./debounce.js";
import { e as W } from "./escapeRegExp.js";
import { e as A, n as x } from "./ref.js";
import { u as ue } from "./index2.js";
import { f as me } from "./filter.js";
import { D as y, E as U, f as fe } from "./dom.js";
import { d as q, r as be, c as E, e as ge, f as ve, h as Ie, F as G } from "./floating-ui.js";
import { g as xe } from "./guid.js";
import { g as Ce } from "./label.js";
import { c as N, u as _ } from "./observers.js";
import { t as Se } from "./openCloseComponent.js";
import { u as ye } from "./useLabel.js";
import { i as j, g as Q } from "./component.js";
import { C as $e } from "./ClearButton.js";
import { I as we } from "./InternalLabel.js";
import { V as ke } from "./Validation.js";
import { u as Ae } from "./useT9n.js";
import { h as De } from "./text.js";
import { u as Ee } from "./useSetFocus.js";
import { u as Fe } from "./useCancelable.js";
import { u as Re } from "./useInteractive.js";
import { u as Me } from "./useTopLayer.js";
import { u as He } from "./useForm.js";
import { i as J } from "./resources12.js";
import { I as u, b as o, C as T, a as O, c as K } from "./resources13.js";
import { h as P, i as D, o as Te, a as X, g as F, b as Y, c as Oe } from "./utils.js";
const R = "48px", Pe = ae`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:block}:host([scale=s]){font-size:var(--calcite-font-size-relative-sm);--calcite-internal-combobox-spacing-unit-l: .5rem;--calcite-internal-combobox-spacing-unit-s: .25rem;--calcite-internal-combobox-padding-inline-end: var(--calcite-space-2xs);--calcite-internal-combobox-no-matches-spacing-unit-s: .25rem;--calcite-combobox-input-height: 1rem;--calcite-internal-combobox-input-margin-block: calc(.25rem - 1px) ;--calcite-internal-close-size: 1rem}:host([scale=m]){font-size:var(--calcite-font-size-relative-base);--calcite-internal-combobox-spacing-unit-l: .75rem;--calcite-internal-combobox-spacing-unit-s: .5rem;--calcite-internal-combobox-padding-inline-end: var(--calcite-space-sm);--calcite-internal-combobox-no-matches-spacing-unit-s: .375rem;--calcite-combobox-input-height: 1rem;--calcite-internal-combobox-input-margin-block: calc(.5rem - 1px) ;--calcite-internal-close-size: 1.5rem}:host([scale=l]){font-size:var(--calcite-font-size-relative-md);--calcite-internal-combobox-spacing-unit-l: 1rem;--calcite-internal-combobox-spacing-unit-s: .75rem;--calcite-internal-combobox-padding-inline-end: var(--calcite-space-sm-plus);--calcite-internal-combobox-no-matches-spacing-unit-s: var(--calcite-space-sm-plus);--calcite-combobox-input-height: 1.5rem;--calcite-internal-combobox-input-margin-block: calc(var(--calcite-space-sm-plus) - 1px);--calcite-internal-close-size: 2rem}.wrapper{display:flex;border-width:1px;border-style:solid;outline-color:transparent;padding-block:calc(var(--calcite-internal-combobox-spacing-unit-s) / 4);padding-inline:var(--calcite-internal-combobox-spacing-unit-l) var(--calcite-internal-combobox-padding-inline-end);border-radius:var(--calcite-combobox-corner-radius, var(--calcite-corner-radius));background-color:var(--calcite-combobox-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-combobox-input-text-color, var(--calcite-color-text-1));border-color:var(--calcite-combobox-input-border-color, var(--calcite-color-border-input))}.wrapper:hover .icon{color:var(--calcite-combobox-icon-color-hover, var(--calcite-color-text-1))}:host(:focus-within) .wrapper,.wrapper--active{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([read-only]) .wrapper{background-color:var(--calcite-color-background)}:host([read-only]) .label{font-weight:var(--calcite-font-weight-medium)}:host([status=invalid]) .wrapper{border-color:var(--calcite-color-status-danger)}:host([status=invalid]:focus-within) .wrapper{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.wrapper--single{padding-block:0;padding-inline:var(--calcite-internal-combobox-spacing-unit-l) var(--calcite-internal-combobox-padding-inline-end);cursor:pointer;flex-wrap:nowrap}.grid-input{position:relative;display:flex;flex-grow:1;flex-wrap:wrap;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0;gap:var(--calcite-internal-combobox-spacing-unit-s);margin-inline-end:var(--calcite-internal-combobox-spacing-unit-s)}.grid-input.selection-display--fit,.grid-input.selection-display--single{flex-wrap:nowrap;overflow:hidden}.input{flex-grow:1;appearance:none;overflow:hidden;text-overflow:ellipsis;border-style:none;background-color:transparent;padding:0;font-family:inherit;color:var(--calcite-color-text-1);font-size:inherit;block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);inline-size:100%;margin-block-end:var(--calcite-internal-combobox-spacing-unit-s);min-inline-size:4.8125rem}.input:focus{outline:2px solid transparent;outline-offset:2px}.input:placeholder-shown{text-overflow:ellipsis}.input--single{padding:0;margin-block:var(--calcite-internal-combobox-input-margin-block)}.wrapper--active .input-single{cursor:text}.input--hidden{pointer-events:none;width:0px;min-width:0px;opacity:0}.input--icon{padding-block:0;padding-inline:var(--calcite-internal-combobox-spacing-unit-l)}.placeholder-icon{color:var(--calcite-combobox-icon-color, var(--calcite-color-text-3))}.input-wrap{display:flex;flex-grow:1;align-items:center}.input-wrap--single{flex:1 1 0%;overflow:hidden}.label{pointer-events:none;max-width:100%;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0;font-weight:var(--calcite-font-weight-normal);block-size:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--icon{padding-inline:var(--calcite-internal-combobox-spacing-unit-l)}.icon-end,.icon-start{display:flex;cursor:pointer;align-items:center}.icon-end{flex:none}.icon-end .icon{color:var(--calcite-combobox-icon-color, var(--calcite-color-text-3))}.floating-ui-container{inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.floating-ui-container{opacity:0;inset-block-start:0;left:0}}:host([top-layer-disabled]) .floating-ui-container{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown)}.floating-ui-container[popover]{padding:0;margin:0;border:none;background-color:transparent;overflow:visible;display:none}.floating-ui-container:popover-open{display:block}.floating-ui-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.floating-ui-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.floating-ui-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.floating-ui-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.floating-ui-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.floating-ui-container .calcite-floating-ui-anim{box-shadow:var(--calcite-shadow-md)}@media(forced-colors:active){.wrapper,.floating-ui-container{border:1px solid canvasText}}.screen-readers-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.list-container{max-height:45vh;overflow-y:auto;inline-size:var(--calcite-dropdown-width, 100%);background-color:var(--calcite-combobox-background-color, var(--calcite-color-foreground-1))}.list{margin:0;display:block;padding:0;line-height:var(--calcite-font-line-height-relative-snug)}.list--hide{height:0px;overflow:hidden}calcite-chip{--calcite-animation-timing: 0}.chip{margin-block:calc(var(--calcite-internal-combobox-spacing-unit-s) / 4);max-inline-size:100%}.chip--invisible{visibility:hidden;position:absolute}.item{display:block}.select-all{background-color:var(--calcite-combobox-item-background-color-active, var(--calcite-color-foreground-1));border-block-end-color:var(--calcite-combobox-divider-color, var(--calcite-combobox-item-border-color, var(--calcite-color-border-3)));border-block-end-style:solid;border-block-end-width:var(--calcite-border-width-sm);inset-block-start:0;position:sticky;z-index:var(--calcite-z-index-sticky)}.no-matches{padding-block:var(--calcite-internal-combobox-no-matches-spacing-unit-s);padding-inline:var(--calcite-internal-combobox-spacing-unit-l);color:var(--calcite-combobox-input-text-color, var(--calcite-color-text-1));background:var(--calcite-combobox-background-color, var(--calcite-color-foreground-1));cursor:pointer}.no-matches-placeholder{color:var(--calcite-combobox-icon-color, var(--calcite-color-text-3));cursor:default}.disabled{opacity:.5}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.clear-button--container{display:flex;cursor:pointer;align-items:center}.clear-button--container:hover calcite-action{--calcite-action-background-color: var(--calcite-clear-button-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color: var(--calcite-clear-button-icon-color-hover, var(--calcite-color-text-1))}.clear-button--container:active calcite-action{--calcite-action-background-color: var(--calcite-clear-button-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color: var(--calcite-clear-button-icon-color-press, var(--calcite-color-text-1))}.clear-button--container calcite-action{--calcite-internal-action-height: 100%;--calcite-internal-action-padding-inline: var(--calcite-spacing-none);--calcite-internal-action-padding-block: var(--calcite-spacing-none);--calcite-action-background-color: var(--calcite-clear-button-background-color, var(--calcite-color-foreground-2));--calcite-action-text-color: var(--calcite-clear-button-icon-color)}.clear-button--container calcite-action:hover{--calcite-action-background-color-hover: var(--calcite-clear-button-background-color-hover, var(--calcite-color-foreground-3));--calcite-action-text-color-press: var(--calcite-clear-button-icon-color-hover)}.clear-button--container calcite-action:active{--calcite-action-background-color-press: var(--calcite-clear-button-background-color-press, var(--calcite-color-border-2));--calcite-action-text-color-press: var(--calcite-clear-button-icon-color-press)}:host([scale=s]) .clear-button--container{padding:var(--calcite-space-2xs)}:host([scale=m]) .clear-button--container{padding:var(--calcite-space-2xs);padding-inline-end:var(--calcite-space-sm)}:host([scale=l]) .clear-button--container{padding-inline-end:var(--calcite-space-sm-plus)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}.text-match{background-color:transparent;color:inherit;font-weight:var(--calcite-font-weight-bold)}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}`;
class Ve extends ne {
  constructor() {
    super(), this.direction = ue(), this.formSupport = He({
      inputType: "text"
    })(this), this.selectAllComboboxItemRef = A(), this.allSelectedIndicatorChipRef = A(), this.data = [], this.cancelable = Fe()(this), this.filterItems = (() => {
      const e = (t, i) => t && i.some(({ el: s }) => t === s);
      return pe((t, i = !1, s = !0) => {
        const l = me([...this.data, ...this.groupData], t, this.effectiveFilterProps), a = this.getItemsAndGroups(), n = t === "";
        a.forEach((c) => {
          if (n) {
            c.itemHidden = !1;
            return;
          }
          const r = !e(c, l);
          c.itemHidden = r;
          const [g, h] = c.ancestors;
          (e(g, l) || e(h, l)) && (c.itemHidden = !1), r || c.ancestors.forEach((f) => f.itemHidden = !1);
        }), this.noMatchesFound = this.filteredItems.length === 0 && !!this.filterText, this.filterTextMatchPattern = this.filterText ? new RegExp(`(${W(this.filterText)})`, "i") : void 0, this.keyboardNavItems.forEach((c) => {
          c.filterTextMatchPattern = this.filterTextMatchPattern;
        }), i && (this.open = this.filterText.trim().length > 0), s && this.calciteComboboxFilterChange.emit();
      }, oe.filter);
    })(), this._filterText = "", this.getSelectedItems = () => {
      if (!this.isMulti()) {
        const e = this.allItems.find(({ selected: t }) => t);
        return e ? [e] : [];
      }
      return this.allItems.filter((e) => e.selected && (this.selectionMode !== "ancestors" || !P(e)));
    }, this.groupData = [], this.groupItems = [], this.guid = xe(), this.ignoreSelectedEventsFlag = !1, this.internalValueChangeFlag = !1, this.previousAllSelected = !1, this.refreshingSelectionDisplay = !1, this.mutationObserver = N("mutation", () => this.updateItems()), this.onLabelClick = () => {
      this.setFocus();
    }, this.transitionProp = "opacity", this.resizeObserver = (() => {
      let e = !1;
      return N("resize", () => {
        e || (e = !0, requestAnimationFrame(() => {
          e = !1, this.setMaxScrollerHeight(), this.refreshSelectionDisplay();
        }));
      });
    })(), this.selectedIndicatorChipRef = A(), this.selectedChipCountRef = A(), this.clearButtonRef = A(), this._selectedItems = [], this.textInputRef = A(), this._value = "", this.messages = Ae({ blocking: !0 }), this.focusSetter = Ee()(this), this.customChipAddHandler = () => {
      this.addCustomChip(this.filterText, !0);
    }, this.interactiveContainer = Re(this), this.topLayer = Me({
      target: () => this.floatingEl
    })(this), this.activeChipIndex = -1, this.activeDescendant = "", this.activeItemIndex = -1, this.compactSelectionDisplay = !1, this.deferFitChipCountRender = !1, this.selectedHiddenChipsCount = 0, this.selectedVisibleChipsCount = 0, this.fitUsingCompactCountLabel = !1, this.allItems = [], this.items = [], this.noMatchesFound = !1, this.clearDisabled = !1, this.disabled = !1, this.maxItems = 0, this.open = !1, this.overlayPositioning = "absolute", this.placeholderIconFlipRtl = !1, this.placement = q, this.readOnly = !1, this.required = !1, this.scale = "m", this.selectAllEnabled = !1, this.selectionDisplay = "all", this.selectionAppearance = "icon", this.selectionMode = "multiple", this.status = "idle", this.topLayerDisabled = !1, this.calciteComboboxBeforeClose = S({ cancelable: !1 }), this.calciteComboboxBeforeOpen = S({ cancelable: !1 }), this.calciteComboboxChange = S({ cancelable: !1 }), this.calciteComboboxChipClose = S({ cancelable: !1 }), this.calciteComboboxClose = S({ cancelable: !1 }), this.calciteComboboxFilterChange = S({ cancelable: !1 }), this.calciteComboboxOpen = S({ cancelable: !1 }), ye(this), this.listenOn(document, "click", this.documentClickHandler), this.listen("calciteComboboxItemChange", this.calciteComboboxItemChangeHandler), this.listen("calciteInternalComboboxItemChange", this.calciteInternalComboboxItemChangeHandler), this.listen("click", this.comboboxFocusHandler);
  }
  static {
    this.properties = { activeChipIndex: 16, activeDescendant: 16, activeItemIndex: 16, compactSelectionDisplay: 16, deferFitChipCountRender: 16, selectedHiddenChipsCount: 16, selectedVisibleChipsCount: 16, fitUsingCompactCountLabel: 16, allItems: 16, items: 16, noMatchesFound: 16, allowCustomValues: 7, clearDisabled: 7, disabled: 7, filterText: 3, filterProps: 0, filteredItems: 32, flipPlacements: 0, form: 3, label: 1, labelText: 1, maxItems: 11, messageOverrides: 0, name: 3, open: 7, overlayPositioning: 3, placeholder: 1, placeholderIcon: 3, placeholderIconFlipRtl: 7, placement: 3, readOnly: 7, required: 7, scale: 3, selectAllEnabled: 7, selectedItems: 0, selectionDisplay: 3, selectionAppearance: 3, selectionMode: 3, status: 3, topLayerDisabled: 7, validationIcon: [3, { converter: ce }], validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = Pe;
  }
  get effectiveFilterProps() {
    return this.filterProps ? this.filterProps.filter((e) => e !== "el") : ["description", "label", "metadata", "shortHeading"];
  }
  get showingInlineIcon() {
    const { placeholderIcon: e, selectionMode: t, selectedItems: i, open: s } = this, l = i[0], a = l?.icon, n = D(t);
    return !s && l ? !!a && n : !!e && (!l || n);
  }
  get allSelected() {
    const e = this.allItems.filter((t) => !t.disabled);
    return e.length > 0 && e.every((t) => t.selected);
  }
  get hasDisabledSelected() {
    return this.allItems.some((e) => e.disabled && e.selected);
  }
  get indeterminate() {
    const e = this.selectedItems.length > 0 || this.hasDisabledSelected;
    return this.selectAllEnabled ? !this.allSelected && e : this.selectedItems.length > 0 && !this.allSelected;
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
    return this.items.filter((e) => !j(e));
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
    return be(this, {
      direction: this.direction,
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
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), this.setFilteredPlacements(), E(this), this.cancelable.add(this.filterItems);
  }
  async load() {
    this.handleSelectionModeWarning();
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(this.disabled), e.has("maxItems") && (this.hasUpdated || this.maxItems !== 0) && this.setMaxScrollerHeight(), (e.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") || e.has("placement") && (this.hasUpdated || this.placement !== q)) && this.reposition(!0), (e.has("selectionMode") || e.has("scale") || e.has("selectionAppearance")) && this.updateItems(), e.has("flipPlacements") && this.flipPlacementsHandler();
  }
  loaded() {
    E(this), this.updateItems(), this.filterItems(this.filterText, !1, !1);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.resizeObserver?.disconnect(), ge(this);
  }
  emitComboboxChange() {
    this.calciteComboboxChange.emit();
  }
  filterTextChange(e) {
    this.updateActiveItemIndex(-1), this.filterItems(e, !0);
  }
  openHandler() {
    this.disabled || Se(this);
  }
  handleDisabledChange(e) {
    e || (this.open = !1);
  }
  valueHandler(e) {
    this.internalValueChangeFlag || (this.items.forEach((t) => {
      t.selected = Array.isArray(e) ? e.includes(t.value) : e === t.value;
    }), this.updateItems());
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements(), this.reposition(!0);
  }
  selectedItemsHandler() {
    const e = this.previousAllSelected, t = this.allSelected;
    if (this.previousAllSelected = t, this.internalValueChangeFlag = !0, this.value = this.getValue(), this.internalValueChangeFlag = !1, this.selectionDisplay === "fit" && this.isMulti()) {
      const i = e && !t;
      e && !t && (this.selectedHiddenChipsCount = 0, this.selectedItems.forEach((s) => {
        const l = this.referenceEl?.querySelector(`#${u.chip(s.guid)}`);
        l && this.showChip(l);
      })), this.updateComplete.then(async () => {
        i && await this.updateComplete, await this.refreshSelectionDisplay(), this.fitFollowUpRefreshPromise && await this.fitFollowUpRefreshPromise, this.deferFitChipCountRender = !1;
      });
    }
  }
  async documentClickHandler(e) {
    this.disabled || e.composedPath().includes(this.el) || (await this.componentOnReady(), !this.allowCustomValues && this.filterText && (this.clearInputValue(), this.filterItems(""), this.updateActiveItemIndex(-1)), this.allowCustomValues && this.filterText.trim().length && this.addCustomChip(this.filterText), this.open = !1);
  }
  handleSelectAll(e) {
    e && (this.toggleSelectAll(), this.selectionDisplay !== "fit" && this.allSelected && this.selectedItems.forEach((t) => {
      const i = this.referenceEl.querySelector(`#${u.chip(t.guid)}`);
      i && this.hideChip(i);
    }));
  }
  updateSelectedItems() {
    this.selectedItems = this.getOrderedSelectedItems(this.getSelectedItems());
  }
  calciteComboboxItemChangeHandler(e) {
    if (this.ignoreSelectedEventsFlag)
      return;
    const t = e.target, i = e.composedPath().includes(this.selectAllComboboxItemRef.value);
    this.selectAllEnabled && this.handleSelectAll(i);
    const s = this.keyboardNavItems.indexOf(i ? this.selectAllComboboxItemRef.value : t);
    this.updateActiveItemIndex(s), this.toggleSelection(t, t.selected);
  }
  calciteInternalComboboxItemChangeHandler(e) {
    e.stopPropagation(), this.hasUpdated && this.updateItems();
  }
  clearValue() {
    const e = this.items.filter((t) => t.selected && !t.disabled);
    e.length && (this.ignoreSelectedEventsFlag = !0, e.forEach((t) => t.selected = !1), this.ignoreSelectedEventsFlag = !1, this.updateSelectedItems(), this.emitComboboxChange()), this.open = !1, this.updateActiveItemIndex(-1), this.resetText(), this.filterItems(""), this.setFocus();
  }
  clearInputValue() {
    this.textInputRef.value && (this.textInputRef.value.value = ""), this.filterText = "";
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? ve(t, e) : void 0;
  }
  getValue() {
    const e = this.getOrderedSelectedValues(this.selectedItems.map((t) => t.value?.toString()));
    return e.length ? e.length > 1 ? e : e[0] : "";
  }
  getOrderedSelectedValues(e) {
    if (!this.isMulti())
      return e;
    const t = Array.isArray(this.value) ? this.value : this.value ? [this.value] : [];
    return Te(e, t);
  }
  getOrderedSelectedItems(e) {
    return this.isMulti() ? X(e, this.selectedItems) : e;
  }
  comboboxInViewport() {
    const e = this.el.getBoundingClientRect();
    return e.top >= 0 && e.left >= 0 && e.right <= (window.innerWidth || document.documentElement.clientWidth) && e.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }
  toggleSelectAll() {
    const e = !this.allSelected;
    this.allItems.forEach((t) => {
      t.disabled || (t.selected = e);
    }), this.updateSelectedItems(), this.emitComboboxChange();
  }
  hasHiddenSelectedFitChips() {
    if (this.selectionDisplay !== "fit" || !this.isMulti())
      return !1;
    const e = this.selectedChipCountRef.value;
    return !!e && !e.classList.contains(o.chipInvisible);
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
        (this.activeChipIndex !== -1 || this.textInputRef.value?.selectionStart === 0) && (this.previousChip(), e.preventDefault());
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
        !this.textInputRef.value?.value && !e.defaultPrevented && (!this.open && this.keyboardNavItems.length && (this.open = !0, this.ensureRecentSelectedItemIsActive()), e.preventDefault());
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
        if (this.open) {
          this.open = !1, e.preventDefault();
          break;
        }
        this.clearDisabled || (this.textInputRef.value.value.length > 0 ? (this.resetText(), e.preventDefault()) : this.selectedItems.length > 0 && this.selectionMode !== "single-persist" && (this.clearValue(), e.preventDefault()));
        break;
      case "Enter":
        this.open && this.activeItemIndex > -1 ? (this.keyboardNavItems[this.activeItemIndex].toggleSelection(), e.preventDefault()) : this.activeChipIndex > -1 ? (this.removeActiveChip(e.target), e.preventDefault()) : this.allowCustomValues && this.filterText ? (this.addCustomChip(this.filterText, !0), e.preventDefault()) : !e.defaultPrevented && this.formSupport.active && (e.preventDefault(), this.formSupport.requestSubmit());
        break;
      case "Delete":
      case "Backspace": {
        const s = this.hasHiddenSelectedFitChips() && this.activeChipIndex === -1;
        if (this.selectionDisplay === "single" || s)
          return;
        const a = e.composedPath().find(J);
        this.activeChipIndex > -1 && a ? (e.preventDefault(), this.removeActiveChip(a)) : !this.filterText && this.isMulti() && (e.preventDefault(), this.removeLastChip());
        break;
      }
    }
  }
  onBeforeOpen() {
    this.topLayer.show(), this.reposition(), this.calciteComboboxBeforeOpen.emit(), setTimeout(() => this.scrollToActiveOrSelectedItem(this.activeItemIndex < 0), 0);
  }
  onOpen() {
    this.calciteComboboxOpen.emit();
  }
  onBeforeClose() {
    this.calciteComboboxBeforeClose.emit();
  }
  onClose() {
    this.calciteComboboxClose.emit(), Ie(this), this.topLayer.hide();
  }
  async setMaxScrollerHeight() {
    const { listContainerEl: e, open: t, referenceEl: i } = this;
    if (!e || !t || !i)
      return;
    const s = this.getMaxScrollerHeight();
    e.style.maxBlockSize = s > 0 ? `${s}px` : "", e.style.inlineSize = `${i.clientWidth}px`;
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
    if (t.some((s) => J(s))) {
      this.open = !1, e.preventDefault();
      return;
    }
    const i = this.clearButtonRef.value;
    if (i && t.includes(i)) {
      this.clearValue(), e.preventDefault();
      return;
    }
    this.open = !this.open, this.ensureRecentSelectedItemIsActive();
  }
  ensureRecentSelectedItemIsActive() {
    const { activeItemIndex: e, selectedItems: t, keyboardNavItems: i } = this;
    if (e > -1 && i[e]) {
      this.updateActiveItemIndex(e);
      return;
    }
    const s = t[t.length - 1], l = s ? i.indexOf(s) : i.length ? 0 : -1;
    this.updateActiveItemIndex(l > -1 ? l : i.length ? 0 : -1);
  }
  hideChip(e) {
    e.classList.add(o.chipInvisible);
  }
  showChip(e) {
    e.classList.remove(o.chipInvisible);
  }
  refreshChipDisplay({ chipEls: e, availableHorizontalChipElSpace: t, chipContainerElGap: i, hideSelectedChips: s }) {
    const l = e.filter((h) => h.selected), a = l.filter((h) => !h.disabled), n = l.filter((h) => h.disabled), c = (h) => {
      const f = y(h), p = h.getBoundingClientRect().width;
      return Number.isFinite(f) && f > 0 ? f : p;
    };
    if (l.forEach((h) => c(h)), e.forEach((h) => {
      this.hideChip(h);
    }), s)
      return;
    const r = (h) => {
      let f = 0;
      return h.forEach((p) => {
        const b = c(p);
        b && b <= t && (t -= b + i, this.showChip(p), f++);
      }), f;
    };
    r(a) <= 1 && r(n);
  }
  async refreshSelectionDisplay(e = !0) {
    if (this.refreshingSelectionDisplay)
      return;
    if (this.refreshingSelectionDisplay = !0, await this.componentOnReady(), D(this.selectionMode)) {
      this.refreshingSelectionDisplay = !1;
      return;
    }
    const { allSelectedIndicatorChipRef: t, chipContainerEl: i, selectionDisplay: s, placeholder: l, selectedIndicatorChipRef: a, textInputRef: n } = this;
    if (!n.value || !i) {
      this.refreshingSelectionDisplay = !1;
      return;
    }
    const c = parseInt(getComputedStyle(i).gap, 10), r = y(i), { fontSize: g, fontFamily: h, minInlineSize: f } = getComputedStyle(n.value), p = 0.55, b = parseFloat(f) || parseInt(R, 10), v = U(l, `${g} ${h}`), $ = v > 0 ? v : Math.max(b, Math.round((l?.length || 0) * (parseFloat(g) || parseInt(R, 10)) * p)), M = Math.max(b, $), H = (s === "fit" ? M : $) + c, Z = y(t.value), V = y(a.value), ee = Math.max(Z, V);
    if (this.setCompactSelectionDisplay({
      chipContainerElGap: c,
      chipContainerElWidth: r,
      inputWidth: H,
      largestSelectedIndicatorChipWidth: ee
    }), s !== "fit" && this.allSelected && this.selectAllEnabled && this.selectedItems.forEach((w) => {
      const C = this.referenceEl?.querySelector(`#${u.chip(w.guid)}`);
      C && this.hideChip(C);
    }), this.indeterminate && this.selectedItems.forEach((w) => {
      const C = this.referenceEl?.querySelector(`#${u.chip(w.guid)}`);
      C && this.showChip(C);
    }), s === "fit") {
      const w = Array.from(this.renderRoot.querySelectorAll("calcite-chip")).filter((L) => {
        const B = L.value, le = B != null && `${B}` != "";
        return L.disabled || le;
      }), { hiddenChipIndicatorWidth: C, hideSelectedChips: z, reservedPlaceholderInputWidth: te } = this.getFitCompactDisplayState({
        chipContainerElGap: c,
        chipContainerElWidth: r,
        inputMinWidth: b,
        placeholderWidth: $,
        selectedIndicatorChipElWidth: V
      });
      this.fitUsingCompactCountLabel = z;
      const ie = Math.round(r - (C + c + te + c));
      this.refreshChipDisplay({
        availableHorizontalChipElSpace: ie,
        chipContainerElGap: c,
        chipEls: w,
        hideSelectedChips: z
      });
      const se = this.selectedHiddenChipsCount;
      this.syncChipVisibilityCounts(w), se !== this.selectedHiddenChipsCount && e && (this.fitFollowUpRefreshPromise = this.updateComplete.then(() => this.refreshSelectionDisplay(!1)).then(() => {
        this.fitFollowUpRefreshPromise = void 0;
      }));
    }
    this.refreshingSelectionDisplay = !1;
  }
  setFloatingEl(e) {
    this.floatingEl = e, E(this);
  }
  shouldUseFitCompactDisplay({ chipContainerElGap: e, chipContainerElWidth: t, hiddenChipIndicatorWidth: i, inputMinWidth: s, placeholderWidth: l, reservedPlaceholderInputWidth: a }) {
    const n = Math.round(t - (i + e + a + e));
    return l > s * 2 && n <= 0;
  }
  getFitCompactDisplayState({ chipContainerElGap: e, chipContainerElWidth: t, inputMinWidth: i, placeholderWidth: s, selectedIndicatorChipElWidth: l }) {
    const a = y(this.selectedChipCountRef.value), n = this.deferFitChipCountRender || this.selectedHiddenChipsCount <= 0 ? 0 : a || l, c = Math.max(i, s), r = this.shouldUseFitCompactDisplay({
      chipContainerElGap: e,
      chipContainerElWidth: t,
      hiddenChipIndicatorWidth: n,
      inputMinWidth: i,
      placeholderWidth: s,
      reservedPlaceholderInputWidth: c
    });
    return {
      hiddenChipIndicatorWidth: n,
      hideSelectedChips: r,
      reservedPlaceholderInputWidth: c
    };
  }
  setCompactSelectionDisplay({ chipContainerElGap: e, chipContainerElWidth: t, inputWidth: i, largestSelectedIndicatorChipWidth: s }) {
    const l = Math.round(s + e + i);
    (!this.maxCompactBreakpoint || this.maxCompactBreakpoint < l) && (this.maxCompactBreakpoint = l), this.compactSelectionDisplay = t < this.maxCompactBreakpoint;
  }
  setContainerEl(e) {
    _(this.resizeObserver, this.listContainerEl, e), this.listContainerEl = e, this.transitionEl = e;
  }
  setChipContainerEl(e) {
    _(this.resizeObserver, this.chipContainerEl, e), this.chipContainerEl = e;
  }
  setReferenceEl(e) {
    this.referenceEl = e, E(this);
  }
  syncChipVisibilityCounts(e) {
    let t = 0, i = 0;
    e.forEach((l) => {
      l.selected && (i++, l.classList.contains(o.chipInvisible) || t++);
    }), t !== this.selectedVisibleChipsCount && (this.selectedVisibleChipsCount = t);
    const s = Math.max(0, i - t);
    s !== this.selectedHiddenChipsCount && (this.selectedHiddenChipsCount = s);
  }
  getMaxScrollerHeight() {
    const t = this.getItemsAndGroups(!0).filter((a) => !j(a)), { maxItems: i } = this;
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
    const t = e.getBoundingClientRect().height, i = `:scope > ${T}, :scope > ${O}`, s = Array.from(e.querySelectorAll(i)).reduce((l, a) => l + a.getBoundingClientRect().height, 0);
    return t - s;
  }
  inputHandler(e) {
    const t = e.target.value;
    this.filterText = t;
  }
  getItemsAndGroups(e = !1) {
    return e ? Array.from(this.el.querySelectorAll(`${T}, ${O}`)) : [...this.groupItems, ...this.items];
  }
  toggleSelection(e, t) {
    !e || this.selectionMode === "single-persist" && e.selected && e.value === this.value && !t || (this.selectionDisplay === "fit" && this.isMulti() && (this.deferFitChipCountRender = !0), this.isMulti() ? this.handleMultiSelection(e, t) : this.handleSingleSelection(e, t));
  }
  handleMultiSelection(e, t) {
    e.selected = t, this.updateAncestors(e), this.updateSelectedItems(), this.emitComboboxChange(), this.resetText(), this.filterItems("");
  }
  handleSingleSelection(e, t) {
    this.ignoreSelectedEventsFlag = !0, this.items.forEach((i) => i.selected = i === e ? t : !1), this.ignoreSelectedEventsFlag = !1, this.updateSelectedItems(), this.emitComboboxChange(), this.textInputRef.value && (this.textInputRef.value.value = F(e)), this.open = !1, this.updateActiveItemIndex(-1), this.resetText(), this.filterItems("");
  }
  updateAncestors(e) {
    if (this.selectionMode !== "ancestors")
      return;
    const t = Y(e), i = Oe(e);
    e.selected ? t.forEach((s) => {
      s.disabled || (s.selected = !0);
    }) : ([...i].forEach((s) => {
      s.disabled || (s.selected = !1);
    }), [...t].forEach((s) => {
      P(s) || (s.selected = !1);
    }));
  }
  updateItems() {
    this.allItems = this.getItems(!0), this.items = this.allItems.filter((e) => !e.disabled), this.groupItems = this.getGroupItems(), this.data = this.getData(), this.groupData = this.getGroupData(), this.updateItemProps(), this.updateSelectedItems(), this.previousAllSelected = this.allSelected;
  }
  updateItemProps() {
    this.allItems.forEach((e) => {
      e.selectionMode = this.selectionMode, e.selectionAppearance = this.selectionAppearance, e.scale = this.scale;
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
    return Array.from(this.el.querySelectorAll(T)).filter((i) => e || !i.disabled);
  }
  getGroupItems() {
    return Array.from(this.el.querySelectorAll(O));
  }
  addCustomChip(e, t) {
    const i = this.items.find((s) => s.heading === e);
    if (i)
      this.toggleSelection(i, !0);
    else {
      const s = document.createElement(
        // TODO: [MIGRATION] If this is dynamically creating a web component, please read the docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#rendering-jsx-outside-the-component
        "calcite-combobox-item"
      );
      s.value = e, s.heading = e, this.el.prepend(s), this.updateItems(), this.toggleSelection(s, !0), this.open = !0, t && this.setFocus();
    }
  }
  removeActiveChip(e) {
    const t = this.selectedItems[this.activeChipIndex];
    t && !t.disabled && `${u.chip(t.guid)}` === e.id && this.toggleSelection(t, !1), this.setFocus();
  }
  removeLastChip() {
    const e = this.selectedItems.findLast((t) => !t.disabled);
    e && (this.toggleSelection(e, !1), this.setFocus());
  }
  previousChip() {
    const e = this.selectedItems.length - 1, t = this.activeChipIndex;
    this.activeChipIndex = t === -1 ? e : Math.max(t - 1, 0), this.updateActiveItemIndex(-1), this.focusChip();
  }
  nextChip() {
    const e = this.selectedItems.length - 1, t = this.activeChipIndex + 1;
    t > e ? (this.activeChipIndex = -1, fe(this.textInputRef.value)) : (this.activeChipIndex = t, this.focusChip()), this.updateActiveItemIndex(-1);
  }
  focusChip() {
    const e = this.selectedItems[this.activeChipIndex]?.guid;
    (e ? this.referenceEl?.querySelector(`#${u.chip(e)}`) : void 0)?.setFocus();
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
    let t = "";
    this.keyboardNavItems.forEach((i, s) => {
      s === e ? (i.active = !0, t = `${u.item(i.guid)}`) : i.active = !1;
    }), this.activeDescendant = t, this.activeItemIndex > -1 && (this.activeChipIndex = -1);
  }
  isMulti() {
    return !D(this.selectionMode);
  }
  comboboxFocusHandler() {
    this.disabled || (this.activeChipIndex = -1, this.textInputRef.value?.focus(), this.open && this.selectionDisplay === "fit" && this.isMulti() && this.refreshSelectionDisplay());
  }
  createScreenReaderItem({ ariaLabel: e, ariaSelected: t, id: i, textContent: s }) {
    return m`<li aria-label=${e ?? I} aria-selected=${t ?? I} id=${i ?? I} role=option tabindex=-1>${s}</li>`;
  }
  handleSelectionModeWarning() {
    this.selectionMode === "single-persist" && this.clearDisabled && re.warn('clearDisabled is ignored when selection-mode is set to "single-persist"');
  }
  getDescriptionMessage() {
    const e = Array.isArray(this.value) ? this.value.join(", ") : this.value;
    return this.readOnly ? this.messages.nonEditable.replace("{value}", `${e}`) : e;
  }
  getChipLabel(e, t) {
    return t ? [...[...Y(e)].reverse(), e].map((s) => F(s)).join(" / ") : F(e);
  }
  renderChip({ activeChipIndex: e, disabled: t, index: i, item: s, messages: l, readOnly: a, scale: n, isAncestors: c }) {
    const r = this.getChipLabel(s, c);
    return k(s.guid || s.value || r, m`<calcite-chip .appearance=${a ? "outline" : "solid"} class=${d({
      [o.chip]: !0,
      [o.disabled]: t
    })} .closable=${!t && !a} data-testid=${`${t ? "disabled-chip" : "chip"}-${i}`} .disabled=${t} .icon=${s.icon} .iconFlipRtl=${s.iconFlipRtl} id=${(!t && s.guid ? `${u.chip(s.guid)}` : void 0) ?? I} .label=${r} .messageOverrides=${t ? void 0 : { dismissLabel: l.removeTag.replace("{value}", `${r}`) }} @calciteChipClose=${t ? void 0 : () => this.calciteChipCloseHandler(s)} @focusin=${t ? void 0 : () => this.activeChipIndex = i} .scale=${n} .selected=${s.selected} .tabIndex=${!t && e === i ? 0 : -1} title=${r ?? I} .value=${s.value}>${r}</calcite-chip>`);
  }
  renderChipCount(e, t) {
    const i = this.fitUsingCompactCountLabel ? `${e}` : this.messages.disabledSelectedCount.replace("{count}", `${e}`) ?? `+${e}`;
    return m`<calcite-chip appearance=solid class=${d({
      [o.chip]: !0
    })} data-testid=selected-chip-count id=selected-chip-count .label=${i} .scale=${t} tabindex=-1 title=${i ?? I} ${x(this.selectedChipCountRef)}>${i}</calcite-chip>`;
  }
  renderChips() {
    const { activeChipIndex: e, readOnly: t, scale: i, selectionDisplay: s, selectionMode: l, messages: a } = this, n = [], c = l === "ancestors", r = this.selectAllEnabled && this.allSelected, g = s === "all";
    if (r)
      return null;
    let h = 0, f = 0;
    if (g) {
      const p = this.allItems.filter((v) => v.selected && (!c || !P(v)));
      X(p, this.selectedItems).forEach((v) => {
        if (v.disabled) {
          n.push(this.renderChip({
            activeChipIndex: e,
            disabled: !0,
            index: f++,
            item: v,
            messages: a,
            readOnly: t,
            scale: i,
            isAncestors: c
          }));
          return;
        }
        n.push(this.renderChip({
          activeChipIndex: e,
          disabled: !1,
          index: h++,
          item: v,
          messages: a,
          readOnly: t,
          scale: i,
          isAncestors: c
        }));
      });
    } else r || this.selectedItems.forEach((p) => {
      n.push(this.renderChip({
        activeChipIndex: e,
        disabled: p.disabled,
        index: h++,
        item: p,
        messages: a,
        readOnly: t,
        scale: i,
        isAncestors: c
      }));
    });
    if (s === "fit") {
      const p = this.selectedHiddenChipsCount, b = this.selectedVisibleChipsCount === 0 ? this.selectedItems.length : p;
      p > 0 && !this.deferFitChipCountRender && n.push(this.renderChipCount(b, i));
    }
    return n.length ? n : null;
  }
  renderAllSelectedIndicatorChip() {
    const { allSelectedIndicatorChipRef: e, compactSelectionDisplay: t, scale: i, selectedVisibleChipsCount: s } = this;
    let l = !1;
    if (this.selectionDisplay === "fit" && this.textInputRef.value && this.chipContainerEl) {
      const r = parseInt(getComputedStyle(this.chipContainerEl).gap, 10), g = y(this.chipContainerEl), { fontSize: h, fontFamily: f, minInlineSize: p } = getComputedStyle(this.textInputRef.value), b = 0.55, v = parseFloat(p) || parseInt(R, 10), $ = U(this.placeholder, `${h} ${f}`), M = $ > 0 ? $ : Math.max(v, Math.round((this.placeholder?.length || 0) * (parseFloat(h) || parseInt(R, 10)) * b)), H = y(this.selectedIndicatorChipRef.value);
      l = this.getFitCompactDisplayState({
        chipContainerElGap: r,
        chipContainerElWidth: g,
        inputMinWidth: v,
        placeholderWidth: M,
        selectedIndicatorChipElWidth: H
      }).hideSelectedChips;
    }
    const n = t || l ? this.messages.all : this.messages.allSelected, c = this.allSelected && (this.selectionDisplay === "single" || !s || this.selectionDisplay === "all");
    return m`<calcite-chip class=${d({
      [o.chip]: !0,
      [o.chipInvisible]: !c,
      [o.allSelected]: !0
    })} data-testid=all-selected-indicator-chip .label=${n} .scale=${i} title=${n ?? I} value ${x(e)}>${n}</calcite-chip>`;
  }
  renderSelectedIndicatorChip() {
    const { compactSelectionDisplay: e, selectionDisplay: t, scale: i, selectedIndicatorChipRef: s } = this;
    let l = !1, a;
    const n = this.getSelectedItems().length;
    return e ? l = !0 : t === "single" && (this.allSelected ? l = !0 : n > 0 ? l = !1 : l = !0, a = `${n} ${this.messages.selected}`), m`<calcite-chip class=${d({
      [o.chip]: !0,
      [o.chipInvisible]: l
    })} .label=${a} .scale=${i} title=${a ?? I} value ${x(s)}>${a}</calcite-chip>`;
  }
  renderSelectedIndicatorChipCompact() {
    const { compactSelectionDisplay: e, selectionDisplay: t, scale: i } = this;
    let s = !1, l;
    const a = this.getSelectedItems().length;
    return e ? this.allSelected ? s = !0 : t === "single" && (s = !(a > 0), l = `${a}`) : s = !0, m`<calcite-chip class=${d({
      [o.chip]: !0,
      [o.chipInvisible]: s
    })} .label=${l} .scale=${i} title=${l ?? I} value>${l}</calcite-chip>`;
  }
  renderInput() {
    const { guid: e, disabled: t, placeholder: i, selectionMode: s, selectedItems: l, open: a } = this, n = D(s), c = l[0], r = !a && n && !!c && !this.filterText;
    return m`<span class=${d({
      [o.inputWrap]: !0,
      [o.inputWrapSingle]: n
    })}>${r && k("label", m`<span class=${d({
      [o.label]: !0,
      [o.labelIcon]: !!c?.icon
    })}>${F(c)}</span>`) || ""}${k("input", m`<input aria-activedescendant=${this.activeDescendant ?? I} aria-controls=${`${u.listbox(e)}`} aria-errormessage=${u.validationMessage} aria-owns=${`${u.listbox(e)}`} aria-autocomplete=list .ariaDescription=${this.getDescriptionMessage()} .ariaExpanded=${a} aria-haspopup=listbox .ariaInvalid=${this.status === "invalid"} .ariaLabel=${Ce(this)} class=${d({
      [o.input]: !0,
      [o.inputSingle]: !0,
      [o.inputHidden]: r,
      [o.inputIcon]: this.showingInlineIcon && !!this.placeholderIcon
    })} data-testid=input .disabled=${t} .id=${`${u.input(e)}`} @focus=${this.comboboxFocusHandler} @input=${this.inputHandler} placeholder=${i ?? I} .readOnly=${this.readOnly} .required=${this.required} role=combobox .tabIndex=${this.activeChipIndex === -1 ? 0 : -1} type=text .value=${de(this.filterText ?? "")} ${x(this.textInputRef)}>`)}</span>`;
  }
  renderListBoxOptions() {
    const e = this.keyboardNavItems.map((t) => this.createScreenReaderItem({
      ariaLabel: t.label,
      ariaSelected: t.selected,
      id: `${u.item(t.guid)}`,
      textContent: t.heading
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
      [G.animation]: !0,
      [G.animationActive]: s
    }, n = (this.filterText && e.add.replace("{text}", `${this.filterText}`)) ?? "";
    return m`<div aria-hidden=true class=${d(o.floatingUIContainer)} popover=manual ${x(t)}><div class=${d(a)} ${x(i)}><ul class=${d({ [o.list]: !0, [o.listHide]: !s })}>${this.selectAllEnabled && this.selectionMode !== "single" && this.selectionMode !== "single-persist" && m`<calcite-combobox-item class=${d(o.selectAll)} data-testid=select-all-item .heading=${e.selectAll} .id=${`${this.guid}-select-all-enabled-interactive`} .indeterminate=${this.indeterminate} .label=${e.selectAll} .scale=${l} .selected=${this.allSelected} tabindex=-1 value=select-all ${x(this.selectAllComboboxItemRef)}></calcite-combobox-item>` || ""}<slot></slot>${this.noMatchesFound && (this.allowCustomValues ? m`<li aria-label=${n ?? I} class=${d(o.noMatches)} @click=${this.customChipAddHandler} role=option tabindex=0>${De({
      text: n,
      pattern: new RegExp(`(${W(this.filterText)})`, "i")
    })}</li>` : m`<li class=${d({ [o.noMatchesPlaceholder]: !0, [o.noMatches]: !0 })}>${e.noMatches}</li>`) || ""}</ul></div></div>`;
  }
  renderSelectedOrPlaceholderIcon() {
    const { open: e, placeholderIcon: t, placeholderIconFlipRtl: i, selectedItems: s } = this, l = s[0], a = l?.icon, n = t && (e || !l);
    return this.showingInlineIcon && k("selected-placeholder-icon", m`<span class=${d(o.iconStart)}><calcite-icon class=${d({
      [o.selectedIcon]: !n,
      [o.placeholderIcon]: n
    })} .flipRtl=${n ? i : l.iconFlipRtl} .icon=${n ? t : a} .scale=${Q(this.scale)}></calcite-icon></span>`) || "";
  }
  renderChevronIcon() {
    const { open: e } = this;
    return k("chevron", m`<span class=${d(o.iconEnd)}><calcite-icon class=${d(o.icon)} .icon=${e ? K.chevronUp : K.chevronDown} .scale=${Q(this.scale)}></calcite-icon></span>`);
  }
  render() {
    const { selectionDisplay: e, guid: t, label: i, open: s, readOnly: l } = this, a = D(this.selectionMode), n = e === "all", c = e === "single", r = !a && e === "fit", g = !a && !n, h = g && !r, f = this.items.some((b) => b.selected && !b.disabled), p = !this.clearDisabled && this.selectionMode !== "single-persist" && !!this.value?.length && f;
    return this.interactiveContainer({ disabled: this.disabled, children: m`${this.labelText && we({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div aria-live=polite class=${d({
      [o.wrapper]: !0,
      [o.wrapperSingle]: a || !this.selectedItems.length,
      [o.wrapperActive]: s
    })} @click=${this.clickHandler} @keydown=${this.keyDownHandler} ${x(this.setReferenceEl)}>${this.renderSelectedOrPlaceholderIcon()}${k("grid", m`<div class=${d({
      [o.gridInput]: !0,
      [o.selectionDisplayFit]: r,
      [o.selectionDisplaySingle]: c
    })} ${x(this.setChipContainerEl)}>${!a && !c && this.renderChips() || ""}${!a && !c && this.selectAllEnabled && n && this.renderAllSelectedIndicatorChip() || ""}${h && this.renderSelectedIndicatorChip() || ""}${h && this.renderSelectedIndicatorChipCompact() || ""}${g && this.renderAllSelectedIndicatorChip() || ""}<label class=${d(o.screenReadersOnly)} .htmlFor=${`${u.input(t)}`} .id=${`${u.label(t)}`}>${i}</label>${this.renderInput()}</div>`)}${!l && p ? $e({ ariaLabel: this.messages.clear, disabled: this.disabled, ref: this.clearButtonRef, scale: this.scale, title: this.messages.clear }) : null}${!l && this.renderChevronIcon() || ""}</div><ul aria-labelledby=${`${u.label(t)}`} aria-multiselectable=true class=${d(o.screenReadersOnly)} .id=${`${u.listbox(t)}`} role=listbox tabindex=-1>${this.renderListBoxOptions()}</ul>${this.renderFloatingUIContainer()}${this.validationMessage && this.status === "invalid" ? ke({ icon: this.validationIcon, id: u.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
}
he("calcite-combobox", Ve);
export {
  Ve as Combobox
};
