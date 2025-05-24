import { a as I, L as $, d as c, h as m, s as r, E as s, x as h, c as y } from "./iframe.js";
import { n as d } from "./ref.js";
import { c as C } from "./repeat.js";
import { a as k, u as A } from "./useT9n.js";
import { d as f, r as E, c as p, b as w, F as g } from "./floating-ui.js";
import { u as T, I as O } from "./interactive.js";
import { o as S } from "./openCloseComponent.js";
import { c as F, d as D } from "./label.js";
import { c as z, a as V, d as H, s as P, H as L } from "./form.js";
import { s as b } from "./dom.js";
import { g as B } from "./guid.js";
import { V as M } from "./Validation.js";
import { c as v } from "./observers.js";
import { c as U } from "./component.js";
import { S as x, C as l, I as R } from "./resources5.js";
import { d as G } from "./debounce.js";
import { e as q } from "./escapeRegExp.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const W = I`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:block}.input-container{position:relative;display:flex;flex:1 1 auto;flex-wrap:nowrap}.input{width:100%;--calcite-input-prefix-size: var(--calcite-autocomplete-input-prefix-size);--calcite-input-suffix-size: var(--calcite-autocomplete-input-suffix-size);--calcite-input-background-color: var(--calcite-autocomplete-input-background-color);--calcite-input-border-color: var(--calcite-autocomplete-input-border-color);--calcite-input-corner-radius: var(--calcite-autocomplete-input-corner-radius);--calcite-input-shadow: var(--calcite-autocomplete-input-shadow);--calcite-input-icon-color: var(--calcite-autocomplete-input-icon-color);--calcite-input-text-color: var(--calcite-autocomplete-input-text-color);--calcite-input-placeholder-text-color: var(--calcite-autocomplete-input-placeholder-text-color);--calcite-input-actions-background-color: var(--calcite-autocomplete-input-actions-background-color);--calcite-input-actions-background-color-hover: var(--calcite-autocomplete-input-actions-background-color-hover);--calcite-input-actions-background-color-press: var(--calcite-autocomplete-input-actions-background-color-press);--calcite-input-actions-icon-color: var(--calcite-autocomplete-input-actions-icon-color);--calcite-input-actions-icon-color-hover: var(--calcite-autocomplete-input-actions-icon-color-hover);--calcite-input-actions-icon-color-press: var(--calcite-autocomplete-input-actions-icon-color-press);--calcite-input-loading-background-color: var(--calcite-autocomplete-input-loading-background-color);--calcite-input-loading-fill-color: var(--calcite-autocomplete-input-loading-fill-color);--calcite-input-prefix-background-color: var(--calcite-autocomplete-input-prefix-background-color);--calcite-input-prefix-text-color: var(--calcite-autocomplete-input-prefix-text-color);--calcite-input-suffix-background-color: var(--calcite-autocomplete-input-suffix-background-color);--calcite-input-suffix-text-color: var(--calcite-autocomplete-input-suffix-text-color)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.content-container{box-sizing:border-box;width:100%}.floating-ui-container{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown);inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}.floating-ui-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset,left,opacity;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.floating-ui-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.floating-ui-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.floating-ui-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.floating-ui-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}.content-container .calcite-floating-ui-anim{max-height:45vh;width:100%;overflow-y:auto;color:var(--calcite-autocomplete-text-color, var(--calcite-color-text-1));background-color:var(--calcite-autocomplete-background-color, var(--calcite-color-foreground-1));border-radius:var(--calcite-autocomplete-corner-radius, var(--calcite-corner-radius-round))}.content--hidden{display:none}@media (forced-colors: active){.floating-ui-container--active{border:1px solid canvasText}}.screen-readers-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`, K = "calcite-autocomplete-item-group", j = "calcite-autocomplete-item";
class J extends $ {
  constructor() {
    super(), this.guid = B(), this.attributeWatch = k(["autofocus", "enterkeyhint", "inputmode"], this.handleGlobalAttributesChanged), this.inputId = `autocomplete-input-${this.guid}`, this.listId = `autocomplete-list-${this.guid}`, this.messages = A(), this.transitionProp = "opacity", this.mutationObserver = v("mutation", () => this.getAllItemsDebounced()), this.resizeObserver = v("resize", () => {
      this.setFloatingElSize();
    }), this.getAllItemsDebounced = G(this.getAllItems, 0), this.activeDescendant = "", this.activeIndex = -1, this.hasContentBottom = !1, this.hasContentTop = !1, this.items = [], this.groups = [], this.alignment = "start", this.disabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.open = !1, this.overlayPositioning = "absolute", this.placement = f, this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    }, this.value = "", this.calciteAutocompleteBeforeClose = c({ cancelable: !1 }), this.calciteAutocompleteBeforeOpen = c({ cancelable: !1 }), this.calciteAutocompleteChange = c({ cancelable: !1 }), this.calciteAutocompleteClose = c({ cancelable: !1 }), this.calciteAutocompleteOpen = c({ cancelable: !1 }), this.calciteAutocompleteTextChange = c({ cancelable: !1 }), this.calciteAutocompleteTextInput = c({ cancelable: !1 }), this.listenOn(document, "click", this.documentClickHandler), this.listen("calciteInternalAutocompleteItemSelect", this.handleInternalAutocompleteItemSelect);
  }
  static {
    this.properties = { activeDescendant: 16, activeIndex: 16, hasContentBottom: 16, hasContentTop: 16, items: 16, groups: 16, isOpen: 16, enabledItems: 16, alignment: 3, autocomplete: 0, disabled: 7, flipPlacements: 0, form: 3, icon: [3, { converter: m }], iconFlipRtl: 7, inputValue: 1, label: 1, loading: 7, maxLength: 11, messageOverrides: 0, minLength: 11, name: 3, open: 7, overlayPositioning: 3, pattern: 1, placeholder: 1, placement: 3, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, suffixText: 1, validationIcon: [3, { converter: m }], validationMessage: 1, validity: 0, value: 1 };
  }
  static {
    this.styles = W;
  }
  get isOpen() {
    return this.open && (this.hasContentTop || this.hasContentBottom || this.items.length > 0);
  }
  get enabledItems() {
    return this.items.filter((t) => !t.disabled);
  }
  async reposition(t = !1) {
    const { floatingEl: e, referenceEl: n, placement: i, overlayPositioning: o, flipPlacements: a } = this;
    return E(this, {
      floatingEl: e,
      referenceEl: n,
      overlayPositioning: o,
      placement: i,
      flipPlacements: a,
      type: "menu"
    }, t);
  }
  async scrollContentTo(t) {
    this.transitionEl?.scrollTo(t);
  }
  async selectText() {
    return this.referenceEl.selectText();
  }
  async setFocus() {
    return await U(this), this.referenceEl.setFocus();
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 }), F(this), z(this), this.defaultInputValue = this.inputValue || "", this.getAllItemsDebounced(), p(this);
  }
  async load() {
    this.getAllItemsDebounced();
  }
  willUpdate(t) {
    t.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(this.disabled), t.has("flipPlacements") && this.reposition(!0), t.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), t.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") && this.reposition(!0), t.has("placement") && (this.hasUpdated || this.placement !== f) && this.reposition(!0);
    let e = !1;
    t.has("inputValue") && (this.hasUpdated || this.inputValue) && (this.inputValueMatchPattern = this.inputValue && new RegExp(`(${q(this.inputValue)})`, "i"), this.updateItems(), this.updateGroups(), e = !0), !e && t.has("scale") && (this.hasUpdated || this.scale !== "m") && (this.updateItems(), this.updateGroups(), e = !0), !e && t.has("activeIndex") && (this.hasUpdated || this.activeIndex !== -1) && this.updateItems();
  }
  updated() {
    T(this);
  }
  loaded() {
    V(this, this.value || ""), this.defaultInputValue = this.inputValue || "", p(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.mutationObserver?.disconnect(), this.resizeObserver?.disconnect(), D(this), H(this), w(this);
  }
  setFloatingElSize() {
    const { referenceEl: t, floatingEl: e } = this;
    !t || !e || (e.style.inlineSize = `${t.clientWidth}px`);
  }
  handleGlobalAttributesChanged() {
    this.requestUpdate();
  }
  handleDisabledChange(t) {
    t || (this.open = !1);
  }
  openHandler() {
    if (S(this), this.open || (this.activeIndex = -1), this.disabled) {
      this.open = !1;
      return;
    }
    this.setFloatingElSize(), this.reposition(!0);
  }
  async documentClickHandler(t) {
    this.disabled || t.composedPath().includes(this.el) || (this.open = !1);
  }
  async handleInternalAutocompleteItemSelect(t) {
    this.value = t.target.value, t.stopPropagation(), this.emitChange(), await this.setFocus(), this.open = !1;
  }
  onLabelClick() {
    this.setFocus();
  }
  onFormReset() {
    this.inputValue = this.defaultInputValue;
  }
  onBeforeOpen() {
    this.calciteAutocompleteBeforeOpen.emit();
  }
  onOpen() {
    this.calciteAutocompleteOpen.emit();
  }
  onBeforeClose() {
    this.calciteAutocompleteBeforeClose.emit();
  }
  onClose() {
    this.calciteAutocompleteClose.emit();
  }
  emitChange() {
    this.calciteAutocompleteChange.emit();
  }
  updateGroups() {
    this.groups.forEach((t, e, n) => {
      t.scale = this.scale, e === 0 && (t.disableSpacing = !0);
      const i = n[e + 1];
      i && (i.disableSpacing = t.children.length === 0);
    });
  }
  updateItems() {
    let t = null;
    this.items.forEach((e) => {
      e.scale = this.scale, e.inputValueMatchPattern = this.inputValueMatchPattern;
    }), this.enabledItems.forEach((e, n) => {
      const i = n === this.activeIndex;
      i && (t = e.guid), e.active = i;
    }), this.activeDescendant = t;
  }
  handleInputFocus() {
    this.open = !0;
  }
  handleContentTopSlotChange(t) {
    this.hasContentTop = b(t);
  }
  handleContentBottomSlotChange(t) {
    this.hasContentBottom = b(t);
  }
  getAllItems() {
    const { el: t } = this;
    this.groups = Array.from(t.querySelectorAll(K)), this.items = Array.from(t.querySelectorAll(j)), this.updateItems(), this.updateGroups();
  }
  setReferenceEl(t) {
    this.referenceEl = t, t && (this.resizeObserver?.observe(t), p(this));
  }
  keyDownHandler(t) {
    const { defaultPrevented: e, key: n } = t;
    if (e)
      return;
    const { open: i, activeIndex: o, enabledItems: a } = this, u = a.length && o > -1 ? a[o] : null;
    switch (n) {
      case "Escape":
        i && (this.open = !1, t.preventDefault());
        break;
      case "Tab":
        this.open = !1;
        break;
      case "Enter":
        i && u ? (this.value = u.value, this.emitChange(), this.open = !1, t.preventDefault()) : t.defaultPrevented || P(this) && t.preventDefault();
        break;
      case "ArrowDown":
        a.length && (this.open = !0, this.activeIndex = o !== -1 ? Math.min(o + 1, a.length - 1) : 0, this.scrollToActiveItem(), t.preventDefault());
        break;
      case "ArrowUp":
        a.length && (this.open = !0, this.activeIndex = o !== -1 ? Math.max(o - 1, 0) : a.length - 1, this.scrollToActiveItem(), t.preventDefault());
        break;
      case "Home":
        a.length && (this.open = !0, this.activeIndex = 0, this.scrollToActiveItem(), t.preventDefault());
        break;
      case "End":
        a.length && (this.open = !0, this.activeIndex = a.length - 1, this.scrollToActiveItem(), t.preventDefault());
        break;
    }
  }
  scrollToActiveItem() {
    this.enabledItems[this.activeIndex]?.scrollIntoView({ block: "nearest" });
  }
  changeHandler(t) {
    t.stopPropagation(), this.inputValue = t.target.value, this.calciteAutocompleteTextChange.emit();
  }
  inputClickHandler(t) {
    t.defaultPrevented || (this.open = !0);
  }
  inputHandler(t) {
    t.stopPropagation(), this.inputValue = t.target.value, this.open = this.inputValue?.length > 0, this.calciteAutocompleteTextInput.emit();
  }
  setFloatingEl(t) {
    this.floatingEl = t, p(this);
  }
  setTransitionEl(t) {
    t && (this.transitionEl = t);
  }
  render() {
    const { disabled: t, listId: e, inputId: n, isOpen: i } = this, o = this.el.autofocus, a = this.el.enterKeyHint, u = this.el.inputMode;
    return O({ disabled: t, children: h`<div class=${r(l.inputContainer)}><calcite-input .alignment=${this.alignment} aria-activedescendant=${this.activeDescendant ?? s} aria-controls=${e ?? s} aria-owns=${e ?? s} aria-autocomplete=list .ariaExpanded=${i} aria-haspopup=listbox .autocomplete=${this.autocomplete} .autofocus=${o} class=${r(l.input)} clearable .disabled=${t} enterkeyhint=${a ?? s} .form=${this.form} .icon=${this.icon ?? !0} .iconFlipRtl=${this.iconFlipRtl} id=${n ?? s} inputmode=${u ?? s} .label=${this.label} .loading=${this.loading} .maxLength=${this.maxLength} .messageOverrides=${this.messages} .minLength=${this.minLength} .name=${this.name} @click=${this.inputClickHandler} @keydown=${this.keyDownHandler} @calciteInputChange=${this.changeHandler} @calciteInputInput=${this.inputHandler} @calciteInternalInputFocus=${this.handleInputFocus} .pattern=${this.pattern} .placeholder=${this.placeholder} .prefixText=${this.prefixText} .readOnly=${this.readOnly} role=combobox .scale=${this.scale} .status=${this.status} .suffixText=${this.suffixText} type=search .value=${this.inputValue} ${d(this.setReferenceEl)}></calcite-input>${this.renderListBox()}<div class=${r({
      [l.contentContainer]: !0,
      [l.floatingUIContainer]: !0,
      [l.floatingUIContainerActive]: i
    })} ${d(this.setFloatingEl)}><div class=${r({
      [l.contentAnimation]: !0,
      [g.animation]: !0,
      [g.animationActive]: i
    })} ${d(this.setTransitionEl)}><div class=${r({ [l.content]: !0, [l.contentHidden]: !i })}><slot name=${x.contentTop} @slotchange=${this.handleContentTopSlotChange}></slot><slot aria-hidden=true></slot><slot name=${x.contentBottom} @slotchange=${this.handleContentBottomSlotChange}></slot></div></div></div></div>${L({ component: this })}${this.validationMessage && this.status === "invalid" ? M({ icon: this.validationIcon, id: R.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderListBox() {
    return h`<ul aria-labelledby=${this.inputId ?? s} class=${r(l.screenReadersOnly)} id=${this.listId ?? s} role=listbox tabindex=-1>${this.renderListBoxOptions()}</ul>`;
  }
  renderListBoxOptions() {
    return C(this.items.filter((t) => !!(t.label || t.heading)), (t) => t.guid, (t) => h`<li .ariaDisabled=${t.disabled} .ariaLabel=${t.label} id=${t.guid ?? s} role=option tabindex=-1>${t.heading}${t.description}</li>`);
  }
}
y("calcite-autocomplete", J);
export {
  J as Autocomplete
};
