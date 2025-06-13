import { a as V, L as S, d as I, h as O, s as o, E as d, x as m, c as T } from "./iframe.js";
import { n as p } from "./ref.js";
import { u as E } from "./useFocusTrap.js";
import { l as P, d as l, b as D, a as c, m as z, o as w, i as R } from "./date.js";
import { f as B } from "./dom.js";
import { d as L, r as N, c as y, b as W, f as H, h as M, F as $ } from "./floating-ui.js";
import { c as U, d as Y, s as _, H as q } from "./form.js";
import { u as j, I as G } from "./interactive.js";
import { n as A } from "./key.js";
import { c as K, d as Z } from "./label.js";
import { c as J, g as C } from "./component.js";
import { n as b, a as Q, j as X, g as tt } from "./locale.js";
import { o as et } from "./openCloseComponent.js";
import { g as x, a as at } from "./utils2.js";
import { g as F } from "./guid.js";
import { V as it } from "./Validation.js";
import { s as st } from "./input.js";
import { u as nt } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.15 */
const rt = V`:host{--calcite-icon-size: 1rem;--calcite-spacing-eighth: .125rem;--calcite-spacing-quarter: .25rem;--calcite-spacing-half: .5rem;--calcite-spacing-three-quarters: .75rem;--calcite-spacing: 1rem;--calcite-spacing-plus-quarter: 1.25rem;--calcite-spacing-plus-half: 1.5rem;--calcite-spacing-double: 2rem;--calcite-menu-min-width: 10rem;--calcite-header-min-height: 3rem;--calcite-footer-min-height: 3rem}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:inline-block;width:100%;overflow:visible;vertical-align:top;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}:host .menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset,left,opacity;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}:host .menu-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}:host .menu-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}:host .menu-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}:host .menu-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}:host([scale=s]){--calcite-toggle-spacing: .5rem;--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-toggle-spacing) + 1rem)}:host([scale=m]){--calcite-toggle-spacing: .75rem;--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-toggle-spacing) + 1.5rem)}:host([scale=l]){--calcite-toggle-spacing: 1rem;--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-toggle-spacing) + 2rem)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.calendar-wrapper{--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);transform:translateZ(0)}.input-wrapper{position:relative}.input-wrapper .chevron-icon{color:var(--calcite-color-text-3)}.input-wrapper:focus-within .chevron-icon,.input-wrapper:active .chevron-icon,.input-wrapper:hover .chevron-icon{color:var(--calcite-color-text-1)}.input-wrapper:focus-within~.input-wrapper .chevron-icon,.input-wrapper:active~.input-wrapper .chevron-icon,.input-wrapper:hover~.input-wrapper .chevron-icon{color:var(--calcite-color-text-1)}.toggle-icon{position:absolute;display:flex;cursor:pointer;align-items:center;inset-inline-end:0;inset-block:0;padding-inline:var(--calcite-toggle-spacing)}:host([range]) .container{display:flex}:host([range]) .input-container{display:flex;flex:1 1 auto}:host([range]) .input-wrapper{flex:1 1 auto}.divider-container{display:flex;align-items:stretch;border-width:1px;border-left-width:0px;border-right-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1)}:host([layout=horizontal]) .divider-container{width:1px}.divider{display:inline-block;width:1px;margin-block:var(--calcite-spacing-xxs);background-color:var(--calcite-color-border-2)}:host([layout=vertical]) .divider-container{height:1px;width:100%;border-top-width:0px;border-bottom-width:0px;border-left-width:1px;border-right-width:0px;padding-inline:var(--calcite-spacing-md)}:host([layout=vertical]) .divider-container .divider{margin-top:0;margin-bottom:0;height:1px;width:100%}:host([range][layout=vertical]) .input-wrapper{width:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}.menu-container{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown);inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}.menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset,left,opacity;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.menu-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.menu-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.menu-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.menu-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}.input .calcite-input__wrapper{margin-top:0}.vertical-chevron-container{display:flex;align-items:center;border-width:1px;border-left-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);padding-inline:var(--calcite-spacing-md);background-color:var(--calcite-color-foreground-1)}.vertical-chevron-container calcite-icon{color:var(--calcite-color-text-3)}.vertical-chevron-container calcite-icon:hover{color:var(--calcite-color-text-1)}:host([range][layout=vertical][scale=s]) .vertical-chevron-container,:host([range][layout=vertical][scale=s]) .divider-container{padding-inline:var(--calcite-spacing-sm)}:host([range][layout=vertical][scale=l]) .vertical-chevron-container,:host([range][layout=vertical][scale=l]) .divider-container{padding-inline:var(--calcite-spacing-lg)}.container:focus-within .vertical-chevron-container calcite-icon,.container:active .vertical-chevron-container calcite-icon,.container:hover .vertical-chevron-container calcite-icon{color:var(--calcite-color-text-1)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}.assistive-text{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}`, n = {
  assistiveText: "assistive-text",
  calendarWrapper: "calendar-wrapper",
  container: "container",
  dividerContainer: "divider-container",
  divider: "divider",
  inputContainer: "input-container",
  inputNoBottomBorder: "input--no-bottom-border",
  inputNoRightBorder: "input--no-right-border",
  inputNoTopBorder: "input--no-top-border",
  inputNoLeftBorder: "input--no-left-border",
  inputWrapper: "input-wrapper",
  input: "input",
  menu: "menu-container",
  toggleIcon: "toggle-icon",
  verticalChevronContainer: "vertical-chevron-container",
  chevronIcon: "chevron-icon"
}, k = {
  validationMessage: "inputDatePickerValidationMessage"
};
function ot(g) {
  if (!g)
    return !1;
  const { year: t } = P(g);
  return Number(t) < 100;
}
function lt(g) {
  const t = (/* @__PURE__ */ new Date()).getFullYear();
  return Math.floor(t / 100) * 100 + g;
}
class ct extends S {
  constructor() {
    super(), this.commonDateSeparators = [".", "-", "/"], this.dialogId = `date-picker-dialog--${F()}`, this.focusOnOpen = !1, this.focusTrap = E({
      triggerProp: "open",
      focusTrapOptions: {
        onActivate: () => {
          this.focusOnOpen && (this.datePickerEl?.setFocus(), this.focusOnOpen = !1);
        },
        allowOutsideClick: !0,
        // Allow outside click and let the popover manager take care of closing the popover.
        clickOutsideDeactivates: !1,
        initialFocus: !1,
        setReturnFocus: !1,
        onDeactivate: () => {
          this.open = !1;
        }
      }
    })(this), this.transitionProp = "opacity", this.placeholderTextId = `calcite-input-date-picker-placeholder-${F()}`, this.rangeStartValueChangedByUser = !1, this.userChangedValue = !1, this._value = "", this.valueAsDateChangedExternally = !1, this.messages = nt({ blocking: !0 }), this.focusedInput = "start", this.disabled = !1, this.focusTrapDisabled = !1, this.layout = "horizontal", this.monthStyle = "wide", this.open = !1, this.overlayPositioning = "absolute", this.placement = L, this.proximitySelectionDisabled = !1, this.range = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    }, this.calciteInputDatePickerBeforeClose = I({ cancelable: !1 }), this.calciteInputDatePickerBeforeOpen = I({ cancelable: !1 }), this.calciteInputDatePickerChange = I({ cancelable: !1 }), this.calciteInputDatePickerClose = I({ cancelable: !1 }), this.calciteInputDatePickerOpen = I({ cancelable: !1 }), this.listen("blur", this.blurHandler), this.listen("keydown", this.keyDownHandler), this.handleDateTimeFormatChange();
  }
  static {
    this.properties = { datePickerActiveDate: 16, focusedInput: 16, localeData: 16, disabled: 7, flipPlacements: 0, focusTrapDisabled: 7, form: 3, headingLevel: 11, label: 1, layout: 3, max: 3, maxAsDate: 0, messageOverrides: 0, min: 3, minAsDate: 0, monthStyle: 1, name: 3, numberingSystem: 3, open: 7, overlayPositioning: 3, placement: 3, proximitySelectionDisabled: 5, range: 7, readOnly: 7, required: 7, scale: 3, status: 3, validationIcon: [3, { converter: O }], validationMessage: 1, validity: 0, value: 1, valueAsDate: 0 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = rt;
  }
  get value() {
    return this._value;
  }
  set value(t) {
    const e = t !== this._value, a = t === "" && (this.startInput?.value !== "" || this.endInput?.value !== "");
    (e || a) && (this._value = t, this.valueWatcher(t));
  }
  async reposition(t = !1) {
    const { floatingEl: e, referenceEl: a, placement: i, overlayPositioning: s, filteredFlipPlacements: r } = this;
    return N(this, {
      floatingEl: e,
      referenceEl: a,
      overlayPositioning: s,
      placement: i,
      flipPlacements: r,
      type: "menu"
    }, t);
  }
  async setFocus() {
    await J(this), B(this.el);
  }
  connectedCallback() {
    super.connectedCallback();
    const { open: t } = this;
    if (t && this.openHandler(), this.min && (this.minAsDate = l(this.min)), this.max && (this.maxAsDate = l(this.max)), Array.isArray(this.value))
      this.valueAsDate = x(this.value);
    else if (this.value)
      try {
        const e = l(this.value), a = D(e, this.minAsDate, this.maxAsDate);
        this.valueAsDate = a;
      } catch {
        this.warnAboutInvalidValue(this.value), this.value = "";
      }
    else this.valueAsDate && (this.range && Array.isArray(this.valueAsDate) ? this.value = [c(this.valueAsDate[0]), c(this.valueAsDate[1])] : !this.range && !Array.isArray(this.valueAsDate) && (this.value = c(this.valueAsDate)));
    K(this), U(this), this.setFilteredPlacements(), b.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.messages._lang,
      useGrouping: !1
    }, y(this);
  }
  async load() {
    this.handleDateTimeFormatChange(), await this.loadLocaleData(), this.onMinChanged(this.min), this.onMaxChanged(this.max);
  }
  willUpdate(t) {
    t.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledAndReadOnlyChange(this.disabled), t.has("readOnly") && (this.hasUpdated || this.readOnly !== !1) && this.handleDisabledAndReadOnlyChange(this.readOnly), t.has("valueAsDate") && this.valueAsDateWatcher(this.valueAsDate), t.has("flipPlacements") && this.flipPlacementsHandler(), t.has("min") && this.onMinChanged(this.min), t.has("max") && this.onMaxChanged(this.max), t.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), t.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") && this.reposition(!0), (t.has("numberingSystem") || t.has("messages")) && this.handleDateTimeFormatChange(), t.has("layout") && (this.hasUpdated || this.layout !== "horizontal") && this.setReferenceEl(), t.has("messages") && this.loadLocaleData();
  }
  updated() {
    j(this);
  }
  loaded() {
    this.localizeInputValues(), y(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Z(this), Y(this), W(this);
  }
  handleDisabledAndReadOnlyChange(t) {
    t || (this.open = !1);
  }
  valueWatcher(t) {
    if (!this.userChangedValue) {
      let e;
      Array.isArray(t) ? e = x(t) : t ? e = l(t) : e = void 0, !this.valueAsDateChangedExternally && e !== this.valueAsDate && (this.valueAsDate = e), this.localizeInputValues();
    }
    this.userChangedValue = !1;
  }
  valueAsDateWatcher(t) {
    const e = Array.isArray(t) ? [c(t[0]), c(t[1])] : c(t);
    this.datePickerActiveDate = Array.isArray(t) ? t[0] : t, this.value !== e && (this.valueAsDateChangedExternally = !0, this.value = e, this.valueAsDateChangedExternally = !1);
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements(), this.reposition(!0);
  }
  onMinChanged(t) {
    this.minAsDate = l(t);
  }
  onMaxChanged(t) {
    this.maxAsDate = l(t);
  }
  openHandler() {
    et(this), !(this.disabled || this.readOnly) && this.reposition(!0);
  }
  calciteInternalInputInputHandler(t) {
    const e = t.target, a = e.value, i = this.parseNumerals(a), s = this.formatNumerals(i);
    e.value = s;
    const { year: r } = z(a, this.localeData);
    if (r && r.length < 4)
      return;
    const h = w(a, this.localeData);
    R(h, this.min, this.max) && (this.datePickerActiveDate = h);
  }
  calciteInternalInputBlurHandler() {
    this.commitValue();
  }
  handleDateTimeFormatChange() {
    const t = {
      // we explicitly set numberingSystem to prevent the browser-inferred value
      // @see [Arabic numbering system support context](https://github.com/Esri/calcite-design-system/issues/3079#issuecomment-1168964195) for more info.
      numberingSystem: Q(this.numberingSystem)
    };
    this.dateTimeFormat = new Intl.DateTimeFormat(X(tt(this.messages._lang)), t);
  }
  setReferenceEl() {
    const { focusedInput: t, layout: e, endWrapper: a, startWrapper: i } = this;
    this.referenceEl = t === "end" || e === "vertical" ? a || i : i || a, requestAnimationFrame(() => y(this));
  }
  onInputWrapperPointerDown() {
    this.currentOpenInput = this.focusedInput;
  }
  onInputWrapperClick(t) {
    const { range: e, endInput: a, startInput: i, currentOpenInput: s } = this, h = t.currentTarget.getAttribute("data-position");
    t.composedPath().find((v) => v.classList?.contains(n.toggleIcon)) && (h === "start" ? i : a).setFocus(), (!e || !this.open || s === h) && (this.open = !this.open);
  }
  setFilteredPlacements() {
    const { el: t, flipPlacements: e } = this;
    this.filteredFlipPlacements = e ? H(e, t) : null;
  }
  setTransitionEl(t) {
    t && (this.transitionEl = t);
  }
  onLabelClick() {
    this.setFocus();
  }
  onBeforeOpen() {
    this.calciteInputDatePickerBeforeOpen.emit();
  }
  onOpen() {
    this.focusTrap.activate(), this.calciteInputDatePickerOpen.emit();
  }
  onBeforeClose() {
    this.calciteInputDatePickerBeforeClose.emit();
  }
  onClose() {
    this.calciteInputDatePickerClose.emit(), M(this), this.focusTrap.deactivate(), this.focusOnOpen = !1, this.datePickerEl?.reset();
  }
  syncHiddenFormInput(t) {
    st("date", this, t);
  }
  setStartInput(t) {
    this.startInput = t;
  }
  setEndInput(t) {
    this.endInput = t;
  }
  blurHandler() {
    this.open = !1;
  }
  commitValue() {
    const { focusedInput: t, value: e } = this, a = `${t}Input`, i = this[a].value, s = w(i, this.localeData), r = c(s), h = Array.isArray(e);
    if (this.range) {
      const u = t === "start" ? 0 : 1;
      if (h) {
        if (r === e[u])
          return;
        s ? (this.setRangeValue([
          t === "start" ? s : l(e[0]),
          t === "end" ? s : l(e[1])
        ]), this.localizeInputValues()) : this.setRangeValue([
          t === "end" && l(e[0]),
          t === "start" && l(e[1])
        ]);
      } else
        s && (this.setRangeValue([
          t === "start" ? s : l(e[0]),
          t === "end" ? s : l(e[1])
        ]), this.localizeInputValues());
    } else {
      if (r === e)
        return;
      this.setValue(s), this.localizeInputValues();
    }
  }
  keyDownHandler(t) {
    const { defaultPrevented: e, key: a } = t;
    if (e)
      return;
    const i = t.composedPath().some((s) => s.tagName === "CALCITE-SELECT");
    a === "Enter" ? (t.preventDefault(), this.commitValue(), this.shouldFocusRangeEnd() ? this.endInput?.setFocus() : this.shouldFocusRangeStart() && this.startInput?.setFocus(), _(this) && this.restoreInputFocus(!0)) : (a === "ArrowDown" || a === "ArrowUp") && !i ? (this.open = !0, this.focusOnOpen = !0, t.preventDefault()) : this.open && a === "Escape" && (this.open = !1, t.preventDefault(), this.restoreInputFocus(!0));
  }
  startInputFocus() {
    this.focusedInput = "start";
  }
  endInputFocus() {
    this.focusedInput = "end";
  }
  setFloatingEl(t) {
    this.floatingEl = t, y(this);
  }
  setStartWrapper(t) {
    this.startWrapper = t, this.setReferenceEl();
  }
  setEndWrapper(t) {
    this.endWrapper = t, this.setReferenceEl();
  }
  setDatePickerRef(t) {
    t && (this.datePickerEl = t, this.focusTrap.overrideFocusTrapEl(t));
  }
  async loadLocaleData() {
    b.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.messages._lang,
      useGrouping: !1
    }, this.localeData = await at(this.messages._lang), this.localizeInputValues();
  }
  handleDateChange(t) {
    this.range || (t.stopPropagation(), this.setValue(t.target.valueAsDate), this.localizeInputValues(), this.restoreInputFocus());
  }
  shouldFocusRangeStart() {
    const t = this.value[0];
    return !!(this.value[1] && !t && this.focusedInput === "end" && this.startInput);
  }
  shouldFocusRangeEnd() {
    const t = this.value[0], e = this.value[1];
    return !!(t && !e && this.focusedInput === "start" && this.endInput);
  }
  handleDateRangeChange(t) {
    if (!this.range)
      return;
    t.stopPropagation();
    const e = t.target.valueAsDate;
    this.setRangeValue(e), this.localizeInputValues(), this.restoreInputFocus();
  }
  restoreInputFocus(t = !1) {
    if (!this.range) {
      this.startInput.setFocus(), this.open = !1;
      return;
    }
    if (t) {
      this.focusInput();
      return;
    }
    this.rangeStartValueChangedByUser = this.focusedInput === "start", this.focusedInput = "end", !(this.shouldFocusRangeStart() || this.rangeStartValueChangedByUser) && (this.open = !1, this.focusInput());
  }
  localizeInputValues() {
    const t = D(this.range ? Array.isArray(this.valueAsDate) && this.valueAsDate[0] || void 0 : this.valueAsDate, this.minAsDate, this.maxAsDate), e = this.range ? D(Array.isArray(this.valueAsDate) && this.valueAsDate[1] || void 0, this.minAsDate, this.maxAsDate) : null;
    this.setInputValue((t && this.dateTimeFormat.format(t)) ?? "", "start"), this.setInputValue((this.range && e && this.dateTimeFormat.format(e)) ?? "", "end");
  }
  setInputValue(t, e = "start") {
    const a = this[`${e}Input`];
    a && (a.value = t);
  }
  setRangeValue(t) {
    if (!this.range)
      return;
    const { value: e } = this, a = Array.isArray(e), i = Array.isArray(t), s = i ? t[0] : null;
    let r = i ? c(s) : "";
    r && (r = this.getNormalizedDate(r));
    const h = i ? t[1] : null;
    let u = i ? c(h) : "";
    u && (u = this.getNormalizedDate(u));
    const f = r || u ? [r, u] : "";
    if (f === e)
      return;
    this.userChangedValue = !0, this.value = f, this.valueAsDate = f ? x(f) : void 0;
    const v = this.calciteInputDatePickerChange.emit();
    v && v.defaultPrevented && (this.value = e, a ? (this.setInputValue(e[0], "start"), this.setInputValue(e[1], "end")) : (this.value = e, this.setInputValue(e)));
  }
  setValue(t) {
    if (this.range)
      return;
    const e = this.value;
    let a = c(t);
    if (a = this.getNormalizedDate(a), a === e)
      return;
    this.userChangedValue = !0, this.valueAsDate = a ? l(a) : void 0, this.value = a || "", this.calciteInputDatePickerChange.emit().defaultPrevented && (this.value = e, this.setInputValue(e));
  }
  warnAboutInvalidValue(t) {
    console.warn(`The specified value "${t}" does not conform to the required format, "YYYY-MM-DD".`);
  }
  formatNumerals(t) {
    return t ? t.split("").map((e) => this.commonDateSeparators?.includes(e) ? this.localeData?.separator : A?.includes(e) ? b?.numberFormatter?.format(Number(e)) : e).join("") : "";
  }
  parseNumerals(t) {
    return t ? t.split("").map((e) => A.includes(e) ? b.delocalize(e) : e).join("") : "";
  }
  getNormalizedDate(t) {
    if (!t)
      return "";
    if (!ot(t))
      return t;
    const { day: e, month: a, year: i } = P(t);
    return `${lt(Number(i))}-${a}-${e}`;
  }
  focusInput() {
    (this.focusedInput === "start" ? this.startInput : this.endInput).setFocus();
  }
  render() {
    const { disabled: t, messages: { _lang: e }, messages: a, numberingSystem: i, readOnly: s } = this;
    return b.numberFormatOptions = {
      numberingSystem: i,
      locale: e,
      useGrouping: !1
    }, G({ disabled: this.disabled, children: m`${this.localeData && m`<div class=${o(n.container)}><div aria-label=${this.label ?? d} class=${o(n.inputContainer)} role=group><div class=${o(n.inputWrapper)} data-position=start @click=${this.onInputWrapperClick} @pointerdown=${this.onInputWrapperPointerDown} ${p(this.setStartWrapper)}><calcite-input-text aria-controls=${this.dialogId ?? d} aria-describedby=${this.placeholderTextId ?? d} aria-errormessage=${k.validationMessage} aria-autocomplete=none .ariaExpanded=${this.open} aria-haspopup=dialog .ariaInvalid=${this.status === "invalid"} class=${o({
      [n.input]: !0,
      [n.inputNoBottomBorder]: this.layout === "vertical" && this.range,
      [n.inputNoRightBorder]: this.range
    })} .disabled=${t} icon=calendar .label=${this.range ? this.messages.startDate : this.messages.date} @calciteInputTextInput=${this.calciteInternalInputInputHandler} @calciteInternalInputTextBlur=${this.calciteInternalInputBlurHandler} @calciteInternalInputTextFocus=${this.startInputFocus} .placeholder=${this.localeData?.placeholder} .readOnly=${s} role=combobox .scale=${this.scale} .status=${this.status} ${p(this.setStartInput)}></calcite-input-text>${!this.readOnly && !this.range && this.renderToggleIcon(this.open && this.focusedInput === "start") || ""}<span aria-hidden=true class=${o(n.assistiveText)} id=${this.placeholderTextId ?? d}>${a.dateFormat.replace("{format}", this.localeData?.placeholder)}</span></div><div .ariaHidden=${!this.open} .ariaLabel=${a.chooseDate} aria-live=polite aria-modal=true class=${o(n.menu)} id=${this.dialogId ?? d} role=dialog ${p(this.setFloatingEl)}><div class=${o({
      [n.calendarWrapper]: !0,
      [$.animation]: !0,
      [$.animationActive]: this.open
    })} ${p(this.setTransitionEl)}><calcite-date-picker .activeDate=${this.datePickerActiveDate} .activeRange=${this.focusedInput} .headingLevel=${this.headingLevel} .layout=${this.layout} .max=${this.max} .maxAsDate=${this.maxAsDate} .messageOverrides=${this.messageOverrides} .min=${this.min} .minAsDate=${this.minAsDate} .monthStyle=${this.monthStyle} .numberingSystem=${i} @calciteDatePickerChange=${this.handleDateChange} @calciteDatePickerRangeChange=${this.handleDateRangeChange} .proximitySelectionDisabled=${this.proximitySelectionDisabled} .range=${this.range} .scale=${this.scale} tabindex=${(this.open ? void 0 : -1) ?? d} .valueAsDate=${this.valueAsDate} ${p(this.setDatePickerRef)}></calcite-date-picker></div></div>${this.range && m`<div class=${o(n.dividerContainer)}><div class=${o(n.divider)}></div></div>` || ""}${this.range && m`<div class=${o(n.inputWrapper)} data-position=end @click=${this.onInputWrapperClick} @pointerdown=${this.onInputWrapperPointerDown} ${p(this.setEndWrapper)}><calcite-input-text aria-controls=${this.dialogId ?? d} aria-autocomplete=none .ariaExpanded=${this.open} aria-haspopup=dialog class=${o({
      [n.input]: !0,
      [n.inputNoTopBorder]: this.layout === "vertical" && this.range,
      [n.inputNoLeftBorder]: this.layout === "horizontal" && this.range,
      [n.inputNoRightBorder]: this.layout === "vertical" && this.range
    })} .disabled=${t} icon=calendar .label=${this.messages.endDate} @calciteInputTextInput=${this.calciteInternalInputInputHandler} @calciteInternalInputTextBlur=${this.calciteInternalInputBlurHandler} @calciteInternalInputTextFocus=${this.endInputFocus} .placeholder=${this.localeData?.placeholder} .readOnly=${s} role=combobox .scale=${this.scale} .status=${this.status} ${p(this.setEndInput)}></calcite-input-text>${!this.readOnly && this.layout === "horizontal" && this.renderToggleIcon(this.open) || ""}</div>` || ""}</div>${this.range && this.layout === "vertical" && m`<div class=${o(n.verticalChevronContainer)}><calcite-icon .icon=${this.open ? "chevron-up" : "chevron-down"} .scale=${C(this.scale)}></calcite-icon></div>` || ""}</div>` || ""}${q({ component: this })}${this.validationMessage && this.status === "invalid" ? it({ icon: this.validationIcon, id: k.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderToggleIcon(t) {
    return m`<span class=${o(n.toggleIcon)} tabindex=-1><calcite-icon class=${o(n.chevronIcon)} .icon=${t ? "chevron-up" : "chevron-down"} .scale=${C(this.scale)}></calcite-icon></span>`;
  }
}
T("calcite-input-date-picker", ct);
export {
  ct as InputDatePicker
};
