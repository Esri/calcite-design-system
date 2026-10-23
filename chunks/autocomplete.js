/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as T, L as E, c as l, T as g, A as u, s as c, b as m, d as w } from "./index.js";
import { c as O } from "./repeat.js";
import { b as R, u as z } from "./index2.js";
import { e as L } from "./escapeRegExp.js";
import { e as p, n as r } from "./ref.js";
import { d as v, r as D, c as d, e as P, F as b } from "./floating-ui.js";
import { g as x } from "./label.js";
import { s as I, a as y } from "./dom.js";
import { g as H } from "./guid.js";
import { u as F } from "./useT9n.js";
import { i as C } from "./resources8.js";
import { i as B } from "./resources9.js";
import { I as U } from "./InternalLabel.js";
import { V as M } from "./Validation.js";
import { c as V, u as q } from "./observers.js";
import { u as G } from "./useFocusable.js";
import { u as _ } from "./useInteractive.js";
import { t as j } from "./openCloseComponent.js";
import { u as W } from "./useTopLayer.js";
import { u as K } from "./useForm.js";
import { u as J } from "./useLabel.js";
const N = T`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:block}.input-container{position:relative;display:flex;flex:1 1 auto;flex-wrap:nowrap}.input{width:100%;--calcite-input-prefix-size: var(--calcite-autocomplete-input-prefix-size);--calcite-input-suffix-size: var(--calcite-autocomplete-input-suffix-size);--calcite-input-background-color: var(--calcite-autocomplete-input-background-color);--calcite-input-border-color: var(--calcite-autocomplete-input-border-color);--calcite-input-corner-radius: var(--calcite-autocomplete-input-corner-radius, var(--calcite-corner-radius));--calcite-input-shadow: var(--calcite-autocomplete-input-shadow);--calcite-input-icon-color: var(--calcite-autocomplete-input-icon-color);--calcite-input-text-color: var(--calcite-autocomplete-input-text-color);--calcite-input-placeholder-text-color: var(--calcite-autocomplete-input-placeholder-text-color);--calcite-input-actions-background-color: var(--calcite-autocomplete-input-actions-background-color);--calcite-input-actions-background-color-hover: var(--calcite-autocomplete-input-actions-background-color-hover);--calcite-input-actions-background-color-press: var(--calcite-autocomplete-input-actions-background-color-press);--calcite-input-actions-icon-color: var(--calcite-autocomplete-input-actions-icon-color);--calcite-input-actions-icon-color-hover: var(--calcite-autocomplete-input-actions-icon-color-hover);--calcite-input-actions-icon-color-press: var(--calcite-autocomplete-input-actions-icon-color-press);--calcite-input-loading-background-color: var(--calcite-autocomplete-input-loading-background-color);--calcite-input-loading-fill-color: var(--calcite-autocomplete-input-loading-fill-color);--calcite-input-prefix-text-color: var(--calcite-autocomplete-input-prefix-text-color);--calcite-input-suffix-text-color: var(--calcite-autocomplete-input-suffix-text-color)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.content-container{box-sizing:border-box;width:100%}.floating-ui-container{inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.floating-ui-container{opacity:0;inset-block-start:0;left:0}}:host([top-layer-disabled]) .floating-ui-container{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown)}.floating-ui-container[popover]{padding:0;margin:0;border:none;background-color:transparent;overflow:visible;display:none}.floating-ui-container:popover-open{display:block}.floating-ui-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.floating-ui-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.floating-ui-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.floating-ui-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.floating-ui-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.floating-ui-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.content-container .calcite-floating-ui-anim{width:100%;overflow-y:auto;box-shadow:var(--calcite-shadow-md);max-block-size:var(--calcite-autocomplete-menu-max-size-y, 45vh);color:var(--calcite-autocomplete-text-color, var(--calcite-color-text-1));background-color:var(--calcite-autocomplete-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));border-radius:var(--calcite-autocomplete-corner-radius, var(--calcite-theme-corner-radius-sm, var(--calcite-corner-radius-round)))}.content--hidden{display:none}@media(forced-colors:active){.floating-ui-container--active{border:1px solid canvasText}}.screen-readers-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-theme-space-base, var(--calcite-spacing-base))}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`, $ = {
  contentBottom: "content-bottom",
  contentTop: "content-top"
}, o = {
  inputContainer: "input-container",
  input: "input",
  contentContainer: "content-container",
  contentAnimation: "content-animation",
  content: "content",
  contentHidden: "content--hidden",
  floatingUIContainer: "floating-ui-container",
  floatingUIContainerActive: "floating-ui-container--active",
  screenReadersOnly: "screen-readers-only"
}, A = "autocomplete", k = {
  validationMessage: "autocompleteValidationMessage",
  input: (h) => `${A}-input-${h}`,
  list: (h) => `${A}-list-${h}`
}, Q = "calcite-autocomplete-item-group", X = "calcite-autocomplete-item";
class S extends E {
  constructor() {
    super(), this.guid = H(), this.attributeWatch = R(["autofocus", "enterkeyhint", "inputmode"], this.handleGlobalAttributesChanged), this.direction = z(), this.formSupport = K({
      inputType: "text"
    })(this), this.listId = k.list(this.guid), this.messages = F(), this.transitionProp = "opacity", this.transitionRef = p(), this.defaultSlotRef = p(), this.listboxRef = p(), this.listboxOptionRefs = /* @__PURE__ */ new Map(), this.focusSetter = G()(this), this.resizeObserver = V("resize", () => {
      this.setFloatingElSize();
    }), this.interactiveContainer = _(this), this.topLayer = W({
      target: () => this.floatingEl
    })(this), this.activeIndex = -1, this.hasContentBottom = !1, this.hasContentTop = !1, this.items = [], this.groups = [], this.alignment = "start", this.disabled = !1, this.iconFlipRtl = !1, this.loading = !1, this.open = !1, this.overlayPositioning = "absolute", this.placement = v, this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.topLayerDisabled = !1, this.value = "", this.calciteAutocompleteBeforeClose = l({ cancelable: !1 }), this.calciteAutocompleteBeforeOpen = l({ cancelable: !1 }), this.calciteAutocompleteChange = l({ cancelable: !1 }), this.calciteAutocompleteClose = l({ cancelable: !1 }), this.calciteAutocompleteOpen = l({ cancelable: !1 }), this.calciteAutocompleteTextChange = l({ cancelable: !1 }), this.calciteAutocompleteTextInput = l({ cancelable: !1 }), J(this), this.listen("calciteAutocompleteItemSelect", this.handleAutocompleteItemSelect), this.listen("calciteInternalAutocompleteItemChange", this.handleAutocompleteItemChange), this.listen("calciteInternalAutocompleteItemGroupItemsChange", this.handleAutocompleteItemGroupItemsChange);
  }
  static {
    this.properties = { activeDescendantElement: 16, activeIndex: 16, hasContentBottom: 16, hasContentTop: 16, items: 16, groups: 16, alignment: 3, autocomplete: 1, disabled: 7, flipPlacements: 0, form: 3, icon: [3, { converter: g }], iconFlipRtl: 7, inputValue: 1, label: 1, labelText: 1, loading: 7, maxLength: 11, messageOverrides: 0, minLength: 11, name: 3, open: 7, overlayPositioning: 3, pattern: 1, placeholder: 1, placement: 3, prefixText: 1, readOnly: 7, required: 7, scale: 3, status: 3, suffixText: 1, topLayerDisabled: 7, validationIcon: [3, { converter: g }], validationMessage: 1, validity: 32, value: 1 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = N;
  }
  get isOpen() {
    return this.open && (this.hasContentTop || this.hasContentBottom || this.items.length > 0);
  }
  get enabledItems() {
    return this.items.filter((t) => !t.disabled);
  }
  async reposition(t = !1) {
    const { floatingEl: e, referenceEl: a, placement: i, overlayPositioning: n, flipPlacements: s } = this;
    return D(this, {
      direction: this.direction,
      floatingEl: e,
      referenceEl: a,
      overlayPositioning: n,
      placement: i,
      flipPlacements: s,
      type: "menu"
    }, t);
  }
  async scrollContentTo(t) {
    this.transitionRef.value?.scrollTo(t);
  }
  async selectText() {
    return this.referenceEl?.selectText();
  }
  async setFocus(t) {
    return this.focusSetter(() => this.referenceEl, t);
  }
  connectedCallback() {
    super.connectedCallback(), d(this);
  }
  load() {
    this.listenOn(document, "click", this.documentClickHandler);
  }
  willUpdate(t) {
    t.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledChange(this.disabled), t.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), t.has("value") && this.hasUpdated && this.selectedItemsHandler(), (t.has("flipPlacements") || t.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") || t.has("placement") && (this.hasUpdated || this.placement !== v)) && this.reposition(!0);
    let e = !1;
    t.has("inputValue") && (this.hasUpdated || this.inputValue) && (this.inputValueMatchPattern = this.inputValue ? new RegExp(`(${L(this.inputValue)})`, "i") : void 0, this.updateItems(), this.updateGroups(), e = !0), !e && t.has("scale") && (this.hasUpdated || this.scale !== "m") && (this.updateItems(), this.updateGroups(), e = !0), !e && t.has("activeIndex") && (this.hasUpdated || this.activeIndex !== -1) && this.updateItems();
  }
  updated() {
    this.syncActiveDescendantElement();
  }
  loaded() {
    this.getAllItems(), d(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect(), P(this);
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
  selectedItemsHandler() {
    this.items.forEach((t) => t.selected = t.value === this.value);
  }
  openHandler() {
    if (this.disabled) {
      this.open = !1;
      return;
    }
    this.open || (this.activeIndex = -1), j(this), this.setFloatingElSize(), this.reposition(!0);
  }
  async documentClickHandler(t) {
    this.disabled || t.composedPath().includes(this.el) || (this.open = !1);
  }
  async handleAutocompleteItemSelect(t) {
    this.value = t.target.value, this.selectedItemsHandler(), this.emitChange(), await this.setFocus(), this.open = !1;
  }
  handleAutocompleteItemChange(t) {
    t.stopPropagation(), this.items.length && (this.updateItems(), this.requestUpdate());
  }
  onLabelClick() {
    this.setFocus();
  }
  onBeforeOpen() {
    this.calciteAutocompleteBeforeOpen.emit(), this.topLayer.show();
  }
  onOpen() {
    this.calciteAutocompleteOpen.emit();
  }
  onBeforeClose() {
    this.calciteAutocompleteBeforeClose.emit();
  }
  onClose() {
    this.calciteAutocompleteClose.emit(), this.topLayer.hide();
  }
  emitChange() {
    this.calciteAutocompleteChange.emit();
  }
  updateGroups() {
    this.groups.forEach((t, e, a) => {
      t.scale = this.scale, t.position = e, e === 0 && (t.disableSpacing = !0);
      const i = a[e + 1];
      i && (i.disableSpacing = t.children.length === 0);
    });
  }
  updateItems() {
    this.value && this.selectedItemsHandler(), this.items.forEach((t) => {
      t.scale = this.scale, t.inputValueMatchPattern = this.inputValueMatchPattern;
    }), this.enabledItems.forEach((t, e) => {
      const a = e === this.activeIndex;
      t.active = a;
    }), this.syncActiveDescendantElement();
  }
  syncActiveDescendantElement() {
    const t = this.enabledItems[this.activeIndex];
    this.activeDescendantElement = t ? this.listboxOptionRefs.get(t.guid)?.value : void 0;
  }
  handleInputFocus() {
    this.open = !0;
  }
  handleContentTopSlotChange(t) {
    this.hasContentTop = I(t);
  }
  handleContentBottomSlotChange(t) {
    this.hasContentBottom = I(t);
  }
  handleDefaultSlotChange() {
    this.getAllItems();
  }
  handleAutocompleteItemGroupItemsChange(t) {
    t.stopPropagation(), this.getAllItems();
  }
  getAllItems() {
    const t = this.defaultSlotRef.value ? y(this.defaultSlotRef.value, Q) : Array.from(this.el.children).filter(B), e = this.defaultSlotRef.value ? y(this.defaultSlotRef.value, X) : Array.from(this.el.children).filter(C), a = t.flatMap((n) => n.items ?? []), i = Array.from(new Set([...e, ...a].filter(C)));
    this.groups = t, this.items = i, this.removeStaleListboxOptionRefs(i), this.updateItems(), this.updateGroups();
  }
  removeStaleListboxOptionRefs(t) {
    const e = new Set(t.map((a) => a.guid));
    this.listboxOptionRefs.forEach((a, i) => {
      e.has(i) || this.listboxOptionRefs.delete(i);
    });
  }
  getListboxOptionRef(t) {
    let e = this.listboxOptionRefs.get(t.guid);
    return e || (e = p(), this.listboxOptionRefs.set(t.guid, e)), e;
  }
  setReferenceEl(t) {
    q(this.resizeObserver, this.referenceEl, t), this.referenceEl = t, d(this);
  }
  keyDownHandler(t) {
    const { defaultPrevented: e, key: a } = t;
    if (e)
      return;
    const { open: i, activeIndex: n, enabledItems: s } = this, f = s.length && n > -1 ? s[n] : null;
    switch (a) {
      case "Escape":
        i && (this.open = !1, t.preventDefault());
        break;
      case "Tab":
        this.open = !1;
        break;
      case "Enter":
        i && f ? (f.requestSelection(), this.open = !1, t.preventDefault()) : !t.defaultPrevented && this.formSupport.active && (t.preventDefault(), this.formSupport.requestSubmit());
        break;
      case "ArrowDown":
        s.length && (this.open = !0, this.activeIndex = n !== -1 ? Math.min(n + 1, s.length - 1) : 0, this.scrollToActiveItem(), t.preventDefault());
        break;
      case "ArrowUp":
        s.length && (this.open = !0, this.activeIndex = n !== -1 ? Math.max(n - 1, 0) : s.length - 1, this.scrollToActiveItem(), t.preventDefault());
        break;
      case "Home":
        s.length && (this.open = !0, this.activeIndex = 0, this.scrollToActiveItem(), t.preventDefault());
        break;
      case "End":
        s.length && (this.open = !0, this.activeIndex = s.length - 1, this.scrollToActiveItem(), t.preventDefault());
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
    this.floatingEl = t, d(this);
  }
  render() {
    const { disabled: t, isOpen: e } = this, a = this.el.autofocus, i = this.el.enterKeyHint, n = this.el.inputMode;
    return this.interactiveContainer({ disabled: t, children: m`${this.labelText && U({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${c(o.inputContainer)}><calcite-input .alignment=${this.alignment} .aria=${{
      activeDescendantElement: this.activeDescendantElement,
      autoComplete: "list",
      controlsElements: this.listboxRef.value ? [this.listboxRef.value] : void 0,
      expanded: e,
      hasPopup: "listbox",
      label: x(this)
    }} .autocomplete=${this.autocomplete} .autofocus=${a} class=${c(o.input)} clearable .disabled=${t} enterkeyhint=${i ?? u} .form=${this.form} .icon=${this.icon ?? !0} .iconFlipRtl=${this.iconFlipRtl} inputmode=${n ?? u} .inputRole=${"combobox"} .label=${this.label} .loading=${this.loading} .maxLength=${this.maxLength} .messageOverrides=${this.messages} .minLength=${this.minLength} .name=${this.name} @calciteInputChange=${this.changeHandler} @calciteInputInput=${this.inputHandler} @calciteInternalInputFocus=${this.handleInputFocus} @click=${this.inputClickHandler} @keydown=${this.keyDownHandler} .pattern=${this.pattern} .placeholder=${this.placeholder} .prefixText=${this.prefixText} .readOnly=${this.readOnly} .required=${this.required} .scale=${this.scale} .status=${this.status} .suffixText=${this.suffixText} type=search .value=${this.inputValue} ${r(this.setReferenceEl)}></calcite-input>${this.renderListBox()}<div class=${c({
      [o.contentContainer]: !0,
      [o.floatingUIContainer]: !0,
      [o.floatingUIContainerActive]: e
    })} popover=manual ${r(this.setFloatingEl)}><div class=${c({
      [o.contentAnimation]: !0,
      [b.animation]: !0,
      [b.animationActive]: e
    })} ${r(this.transitionRef)}><div class=${c({ [o.content]: !0, [o.contentHidden]: !e })}><slot name=${$.contentTop} @slotchange=${this.handleContentTopSlotChange}></slot><slot aria-hidden=true @slotchange=${this.handleDefaultSlotChange} ${r(this.defaultSlotRef)}></slot><slot name=${$.contentBottom} @slotchange=${this.handleContentBottomSlotChange}></slot></div></div></div></div>${this.validationMessage && this.status === "invalid" ? M({ icon: this.validationIcon, id: k.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderListBox() {
    return m`<ul .ariaLabel=${x(this)} aria-live=polite class=${c(o.screenReadersOnly)} id=${this.listId ?? u} role=listbox tabindex=-1 ${r(this.listboxRef)}>${this.renderListBoxOptions()}</ul>`;
  }
  renderListBoxOptions() {
    return O(this.items.filter((t) => !!(t.label || t.heading)), (t) => t.guid, (t) => m`<li .ariaDisabled=${t.disabled} .ariaLabel=${t.label} .ariaSelected=${t.selected} role=option tabindex=-1 ${r(this.getListboxOptionRef(t))}>${t.heading}${t.description}</li>`);
  }
}
w("calcite-autocomplete", S);
const xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Autocomplete: S
}, Symbol.toStringTag, { value: "Module" }));
export {
  $ as S,
  xt as a
};
