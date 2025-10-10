import { b as V, L as T, c as b, u as z, s, E as u, x as y, q as E } from "./index.js";
import { e as w, n as h } from "./ref.js";
import { u as L } from "./useFocusTrap.js";
import { l as R, d as l, b as D, a as o, m as B, o as A, i as N } from "./date.js";
import { d as W, r as H, c as k, b as M, f as U, h as q, F as C } from "./floating-ui.js";
import { c as Y, d as _, s as j, H as G } from "./form.js";
import { u as K, I as Z } from "./interactive.js";
import { n as F } from "./key.js";
import { c as J, d as Q, g as X } from "./label.js";
import { g as S } from "./component.js";
import { n as x, a as ee, j as te, g as ae } from "./locale.js";
import { t as ie } from "./openCloseComponent.js";
import { g as $, a as ne } from "./utils2.js";
import { g as P } from "./guid.js";
import { I as re } from "./InternalLabel.js";
import { V as se } from "./Validation.js";
import { s as ce } from "./input.js";
import { u as le } from "./useT9n.js";
import { u as oe } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const de = V`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host .menu-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}:host .menu-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}:host .menu-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}:host .menu-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}:host .menu-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}:host{position:relative;display:inline-block;width:100%;overflow:visible;vertical-align:top;box-shadow:var(--calcite-input-date-picker-shadow, var(--calcite-shadow-none))}:host .menu-container .calcite-floating-ui-anim{box-shadow:var(--calcite-input-date-picker-calendar-shadow, var(--calcite-shadow-sm))}:host([scale=s]){--calcite-internal-date-picker-toggle-spacing: var(--calcite-spacing-sm);--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-internal-date-picker-toggle-spacing) + var(--calcite-spacing-lg))}:host([scale=m]){--calcite-internal-date-picker-toggle-spacing: var(--calcite-spacing-md);--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-internal-date-picker-toggle-spacing) + var(--calcite-spacing-xxl))}:host([scale=l]){--calcite-internal-date-picker-toggle-spacing: var(--calcite-spacing-lg);--calcite-internal-input-text-input-padding-inline-end: calc(var(--calcite-internal-date-picker-toggle-spacing) + var(--calcite-spacing-xxxl))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.calendar-wrapper{box-shadow:var(--calcite-input-date-picker-calendar-shadow, var(--calcite-shadow-none));transform:translateZ(0)}.input-wrapper{position:relative}.input-wrapper .chevron-icon{color:var(--calcite-input-date-picker-actions-icon-color, var(--calcite-color-text-3))}.input-wrapper:focus-within .chevron-icon,.input-wrapper:active .chevron-icon,.input-wrapper:hover .chevron-icon{color:var(--calcite-input-date-picker-actions-icon-color-hover, var(--calcite-color-text-1))}.input-wrapper:focus-within~.input-wrapper .chevron-icon,.input-wrapper:active~.input-wrapper .chevron-icon,.input-wrapper:hover~.input-wrapper .chevron-icon{color:var(--calcite-input-date-picker-actions-icon-color-hover, var(--calcite-color-text-1))}.toggle-icon{position:absolute;display:flex;cursor:pointer;align-items:center;inset-inline-end:0;inset-block:0;padding-inline:var(--calcite-internal-date-picker-toggle-spacing)}:host([range]) .container{display:flex}:host([range]) .input-container{display:flex;flex:1 1 auto}:host([range]) .input-wrapper{flex:1 1 auto}.divider-container{display:flex;align-items:stretch;border-width:1px;border-left-width:0px;border-right-width:0px;border-style:solid;background-color:var(--calcite-input-date-picker-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-input-date-picker-border-color, var(--calcite-color-border-input))}:host([layout=horizontal]) .divider-container{inline-size:var(--calcite-spacing-px)}.divider{display:inline-block;margin-block:var(--calcite-spacing-xxs);background-color:var(--calcite-input-date-picker-divider-color, var(--calcite-color-border-2));inline-size:var(--calcite-spacing-px)}:host([layout=vertical]) .divider-container{height:1px;width:100%;border-top-width:0px;border-bottom-width:0px;border-left-width:1px;border-right-width:0px;padding-inline:var(--calcite-spacing-md)}:host([layout=vertical]) .divider-container .divider{margin-top:0;margin-bottom:0;height:1px;width:100%}:host([range][layout=vertical]) .input-wrapper{width:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}.menu-container{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown);inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.menu-container{opacity:0;inset-block-start:0;left:0}}.menu-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.menu-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.menu-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.menu-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.menu-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.input .calcite-input__wrapper{margin-top:0}.vertical-chevron-container{display:flex;align-items:center;border-width:1px;border-left-width:0px;border-style:solid;padding-inline:var(--calcite-spacing-md);background-color:var(--calcite-input-date-picker-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-input-date-picker-border-color, var(--calcite-color-border-input))}.vertical-chevron-container calcite-icon{color:var(--calcite-input-date-picker-actions-icon-color, var(--calcite-color-text-3))}.vertical-chevron-container calcite-icon:hover{color:var(--calcite-input-date-picker-actions-icon-color-hover, var(--calcite-color-text-1))}:host([range][layout=vertical][scale=s]) .vertical-chevron-container,:host([range][layout=vertical][scale=s]) .divider-container{padding-inline:var(--calcite-spacing-sm)}:host([range][layout=vertical][scale=l]) .vertical-chevron-container,:host([range][layout=vertical][scale=l]) .divider-container{padding-inline:var(--calcite-spacing-lg)}.container:focus-within .vertical-chevron-container calcite-icon,.container:active .vertical-chevron-container calcite-icon,.container:hover .vertical-chevron-container calcite-icon{color:var(--calcite-input-date-picker-actions-icon-color-hover, var(--calcite-color-text-1))}.input{--calcite-input-text-background-color: var(--calcite-input-date-picker-background-color);--calcite-input-text-border-color: var(--calcite-input-date-picker-border-color);--calcite-input-text-corner-radius: var(--calcite-input-date-picker-corner-radius);--calcite-input-text-shadow: var(--calcite-input-date-picker-shadow);--calcite-input-text-icon-color: var(--calcite-input-date-picker-icon-color);--calcite-input-text-text-color: var(--calcite-input-date-picker-text-color);--calcite-input-text-placeholder-text-color: var(--calcite-input-date-picker-placeholder-text-color)}calcite-date-picker{--calcite-date-picker-border-color: var(--calcite-input-date-picker-calendar-border-color);--calcite-date-picker-corner-radius: var(--calcite-input-date-picker-calendar-corner-radius);--calcite-date-picker-range-calendar-divider-color: var(--calcite-input-date-picker-calendar-range-divider-color);--calcite-date-picker-week-header-text-color: var(--calcite-input-date-picker-calendar-text-color);--calcite-date-picker-header-action-background-color: var( --calcite-input-date-picker-calendar-actions-background-color );--calcite-date-picker-header-action-background-color-hover: var( --calcite-input-date-picker-calendar-actions-background-color-hover );--calcite-date-picker-header-action-background-color-press: var( --calcite-input-date-picker-calendar-actions-background-color-press );--calcite-date-picker-header-action-text-color: var(--calcite-input-date-picker-calendar-actions-text-color);--calcite-date-picker-header-action-text-color-press: var( --calcite-input-date-picker-calendar-actions-text-color-press );--calcite-date-picker-year-text-color: var(--calcite-input-date-picker-calendar-text-color);--calcite-date-picker-month-select-text-color: var(--calcite-input-date-picker-calendar-month-select-text-color);--calcite-date-picker-month-select-icon-color: var(--calcite-input-date-picker-calendar-icon-color);--calcite-date-picker-month-select-icon-color-hover: var(--calcite-input-date-picker-calendar-icon-color-hover);--calcite-date-picker-day-background-color: var(--calcite-input-date-picker-calendar-day-background-color);--calcite-date-picker-day-background-color-hover: var( --calcite-input-date-picker-calendar-day-background-color-hover );--calcite-date-picker-day-background-color-selected: var( --calcite-input-date-picker-calendar-selected-background-color );--calcite-date-picker-day-text-color: var(--calcite-input-date-picker-calendar-day-text-color);--calcite-date-picker-day-text-color-hover: var(--calcite-input-date-picker-calendar-day-text-color-hover);--calcite-date-picker-day-text-color-selected: var(--calcite-input-date-picker-calendar-day-text-color-selected);--calcite-date-picker-current-day-text-color: var( --calcite-input-date-picker-calendar-current-day-text-color, var(--calcite-input-date-picker-calendar-day-current-text-color) );--calcite-date-picker-day-range-text-color: var(--calcite-input-date-picker-calendar-day-range-text-color);--calcite-date-picker-day-range-background-color: var(--calcite-input-date-picker-calendar-selected-background-color);--calcite-date-picker-day-outside-range-background-color-hover: var( --calcite-input-date-picker-calendar-day-outside-range-background-color-hover );--calcite-date-picker-day-outside-range-text-color-hover: var( --calcite-input-date-picker-calendar-day-outside-range-text-color-hover )}.assistive-text{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}:host([hidden]){display:none}[hidden]{display:none}`, n = {
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
}, pe = "calcite-input-date-picker", I = {
  validationMessage: "inputDatePickerValidationMessage",
  dialog: (d) => `date-picker-dialog--${d}`,
  placeholder: (d) => `${pe}-placeholder-${d}`
}, O = {
  start: "start",
  end: "end"
}, m = {
  calendar: "calendar",
  chevronDown: "chevron-down",
  chevronUp: "chevron-up"
};
function ue(d) {
  if (!d)
    return !1;
  const { year: e } = R(d);
  return Number(e) < 100;
}
function he(d) {
  const e = (/* @__PURE__ */ new Date()).getFullYear();
  return Math.floor(e / 100) * 100 + d;
}
class ge extends T {
  constructor() {
    super(), this.commonDateSeparators = [".", "-", "/"], this.dialogId = I.dialog(P()), this.endInputRef = w(), this.focusOnOpen = !1, this.focusTrap = L({
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
    })(this), this.transitionProp = "opacity", this.placeholderTextId = I.placeholder(P()), this.rangeStartValueChangedByUser = !1, this.startInputRef = w(), this.userChangedValue = !1, this._value = "", this.valueAsDateChangedExternally = !1, this.messages = le({ blocking: !0 }), this.focusSetter = oe()(this), this.focusedInput = "start", this.calendars = 2, this.disabled = !1, this.focusTrapDisabled = !1, this.layout = "horizontal", this.monthStyle = "wide", this.open = !1, this.overlayPositioning = "absolute", this.placement = W, this.proximitySelectionDisabled = !1, this.range = !1, this.readOnly = !1, this.required = !1, this.scale = "m", this.status = "idle", this.validity = {
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
    }, this.calciteInputDatePickerBeforeClose = b({ cancelable: !1 }), this.calciteInputDatePickerBeforeOpen = b({ cancelable: !1 }), this.calciteInputDatePickerChange = b({ cancelable: !1 }), this.calciteInputDatePickerClose = b({ cancelable: !1 }), this.calciteInputDatePickerOpen = b({ cancelable: !1 }), this.listen("blur", this.blurHandler), this.listen("keydown", this.keyDownHandler), this.handleDateTimeFormatChange();
  }
  static {
    this.properties = { datePickerActiveDate: 16, focusedInput: 16, localeData: 16, calendars: 11, disabled: 7, flipPlacements: 0, focusTrapDisabled: 7, form: 3, headingLevel: 11, label: 1, labelText: 1, layout: 3, max: 3, maxAsDate: 0, messageOverrides: 0, min: 3, minAsDate: 0, monthStyle: 1, name: 3, numberingSystem: 3, open: 7, overlayPositioning: 3, placement: 3, proximitySelectionDisabled: 5, range: 7, readOnly: 7, required: 7, scale: 3, status: 3, validationIcon: [3, { converter: z, type: String }], validationMessage: 1, validity: 0, value: 1, valueAsDate: 0 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = de;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = e !== this._value, a = e === "" && (this.startInputRef.value?.value !== "" || this.endInputRef.value?.value !== "");
    (t || a) && (this._value = e, this.valueWatcher(e));
  }
  async reposition(e = !1) {
    const { floatingEl: t, referenceEl: a, placement: i, overlayPositioning: r, filteredFlipPlacements: c } = this;
    return H(this, {
      floatingEl: t,
      referenceEl: a,
      overlayPositioning: r,
      placement: i,
      flipPlacements: c,
      type: "menu"
    }, e);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  connectedCallback() {
    super.connectedCallback();
    const { open: e } = this;
    if (e && this.openHandler(), this.min && (this.minAsDate = l(this.min)), this.max && (this.maxAsDate = l(this.max)), Array.isArray(this.value))
      this.valueAsDate = $(this.value);
    else if (this.value)
      try {
        const t = l(this.value), a = D(t, this.minAsDate, this.maxAsDate);
        this.valueAsDate = a;
      } catch {
        this.warnAboutInvalidValue(this.value), this.value = "";
      }
    else this.valueAsDate && (this.range && Array.isArray(this.valueAsDate) ? this.value = [o(this.valueAsDate[0]), o(this.valueAsDate[1])] : !this.range && !Array.isArray(this.valueAsDate) && (this.value = o(this.valueAsDate)));
    J(this), Y(this), this.setFilteredPlacements(), x.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.messages._lang,
      useGrouping: !1
    }, k(this);
  }
  async load() {
    this.handleDateTimeFormatChange(), await this.loadLocaleData(), this.onMinChanged(this.min), this.onMaxChanged(this.max);
  }
  willUpdate(e) {
    e.has("disabled") && (this.hasUpdated || this.disabled !== !1) && this.handleDisabledAndReadOnlyChange(this.disabled), e.has("readOnly") && (this.hasUpdated || this.readOnly !== !1) && this.handleDisabledAndReadOnlyChange(this.readOnly), e.has("valueAsDate") && this.valueAsDateWatcher(this.valueAsDate), e.has("flipPlacements") && this.flipPlacementsHandler(), e.has("min") && this.onMinChanged(this.min), e.has("max") && this.onMaxChanged(this.max), e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler(), e.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") && this.reposition(!0), (e.has("numberingSystem") || e.has("messages")) && this.handleDateTimeFormatChange(), e.has("layout") && (this.hasUpdated || this.layout !== "horizontal") && this.setReferenceEl(), e.has("messages") && this.loadLocaleData();
  }
  updated() {
    K(this);
  }
  loaded() {
    this.localizeInputValues(), k(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Q(this), _(this), M(this);
  }
  handleDisabledAndReadOnlyChange(e) {
    e || (this.open = !1);
  }
  valueWatcher(e) {
    if (!this.userChangedValue) {
      let t;
      Array.isArray(e) ? t = $(e) : e ? t = l(e) : t = void 0, !this.valueAsDateChangedExternally && t !== this.valueAsDate && (this.valueAsDate = t), this.localizeInputValues();
    }
    this.userChangedValue = !1;
  }
  valueAsDateWatcher(e) {
    const t = Array.isArray(e) ? [o(e[0]), o(e[1])] : o(e);
    this.datePickerActiveDate = Array.isArray(e) ? e[0] : e, this.value !== t && (this.valueAsDateChangedExternally = !0, this.value = t, this.valueAsDateChangedExternally = !1);
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements(), this.reposition(!0);
  }
  onMinChanged(e) {
    this.minAsDate = l(e);
  }
  onMaxChanged(e) {
    this.maxAsDate = l(e);
  }
  openHandler() {
    ie(this), !(this.disabled || this.readOnly) && this.reposition(!0);
  }
  calciteInternalInputInputHandler(e) {
    const t = e.target, a = t.value, i = this.parseNumerals(a), r = this.formatNumerals(i);
    t.value = r;
    const { year: c } = B(a, this.localeData);
    if (c && c.length < 4)
      return;
    const p = A(a, this.localeData);
    N(p, this.min, this.max) && (this.datePickerActiveDate = p);
  }
  calciteInternalInputBlurHandler() {
    this.commitValue();
  }
  handleDateTimeFormatChange() {
    const e = {
      // we explicitly set numberingSystem to prevent the browser-inferred value
      // @see [Arabic numbering system support context](https://github.com/Esri/calcite-design-system/issues/3079#issuecomment-1168964195) for more info.
      numberingSystem: ee(this.numberingSystem)
    };
    this.dateTimeFormat = new Intl.DateTimeFormat(te(ae(this.messages._lang)), e);
  }
  setReferenceEl() {
    const { focusedInput: e, layout: t, endWrapper: a, startWrapper: i } = this;
    this.referenceEl = e === "end" || t === "vertical" ? a || i : i || a, requestAnimationFrame(() => k(this));
  }
  onInputWrapperPointerDown() {
    this.currentOpenInput = this.focusedInput;
  }
  onInputWrapperClick(e) {
    const { range: t, endInputRef: a, startInputRef: i, currentOpenInput: r } = this, p = e.currentTarget.getAttribute("data-position");
    e.composedPath().find((f) => f.classList?.contains(n.toggleIcon)) && (p === "start" ? i : a).value.setFocus(), (!t || !this.open || r === p) && (this.open = !this.open);
  }
  setFilteredPlacements() {
    const { el: e, flipPlacements: t } = this;
    this.filteredFlipPlacements = t ? U(t, e) : null;
  }
  setTransitionEl(e) {
    e && (this.transitionEl = e);
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
    this.calciteInputDatePickerClose.emit(), q(this), this.focusTrap.deactivate(), this.focusOnOpen = !1, this.datePickerEl?.reset();
  }
  syncHiddenFormInput(e) {
    ce("date", this, e);
  }
  blurHandler() {
    this.open = !1;
  }
  commitValue() {
    const { focusedInput: e, value: t } = this, a = this.getInputRef(e), i = A(a.value.value, this.localeData), r = o(i), c = Array.isArray(t);
    if (this.range) {
      const p = e === "start" ? 0 : 1;
      if (c) {
        if (r === t[p])
          return;
        i ? (this.setRangeValue([
          e === "start" ? i : l(t[0]),
          e === "end" ? i : l(t[1])
        ]), this.localizeInputValues()) : this.setRangeValue([
          e === "end" && l(t[0]),
          e === "start" && l(t[1])
        ]);
      } else
        i && (this.setRangeValue([
          e === "start" ? i : l(t[0]),
          e === "end" ? i : l(t[1])
        ]), this.localizeInputValues());
    } else {
      if (r === t)
        return;
      this.setValue(i), this.localizeInputValues();
    }
  }
  keyDownHandler(e) {
    const { defaultPrevented: t, key: a } = e;
    if (t)
      return;
    const i = e.composedPath().some((r) => r.tagName === "CALCITE-SELECT");
    a === "Enter" ? (e.preventDefault(), this.commitValue(), this.shouldFocusRangeEnd() ? this.endInputRef.value?.setFocus() : this.shouldFocusRangeStart() && this.startInputRef.value?.setFocus(), j(this) && this.restoreInputFocus(!0)) : (a === "ArrowDown" || a === "ArrowUp") && !i ? (this.open = !0, this.focusOnOpen = !0, e.preventDefault()) : this.open && a === "Escape" && (this.open = !1, e.preventDefault(), this.restoreInputFocus(!0));
  }
  startInputFocus() {
    this.focusedInput = "start";
  }
  endInputFocus() {
    this.focusedInput = "end";
  }
  setFloatingEl(e) {
    this.floatingEl = e, k(this);
  }
  setStartWrapper(e) {
    this.startWrapper = e, this.setReferenceEl();
  }
  setEndWrapper(e) {
    this.endWrapper = e, this.setReferenceEl();
  }
  setDatePickerRef(e) {
    e && (this.datePickerEl = e, this.focusTrap.overrideFocusTrapEl(e));
  }
  async loadLocaleData() {
    x.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.messages._lang,
      useGrouping: !1
    }, this.localeData = await ne(this.messages._lang), this.localizeInputValues();
  }
  handleDateChange(e) {
    this.range || (e.stopPropagation(), this.setValue(e.target.valueAsDate), this.localizeInputValues(), this.restoreInputFocus());
  }
  shouldFocusRangeStart() {
    const e = this.value[0];
    return !!(this.value[1] && !e && this.focusedInput === "end" && this.startInputRef);
  }
  shouldFocusRangeEnd() {
    const e = this.value[0], t = this.value[1];
    return !!(e && !t && this.focusedInput === "start" && this.endInputRef);
  }
  handleDateRangeChange(e) {
    if (!this.range)
      return;
    e.stopPropagation();
    const t = e.target.valueAsDate;
    this.setRangeValue(t), this.localizeInputValues(), this.restoreInputFocus();
  }
  restoreInputFocus(e = !1) {
    if (!this.range) {
      this.startInputRef.value.setFocus(), this.open = !1;
      return;
    }
    if (e) {
      this.focusInput();
      return;
    }
    this.rangeStartValueChangedByUser = this.focusedInput === "start", this.focusedInput = "end", !(this.shouldFocusRangeStart() || this.rangeStartValueChangedByUser) && (this.proximitySelectionDisabled && this.valueAsDate[1] === null || (this.open = !1, this.focusInput()));
  }
  localizeInputValues() {
    const e = D(this.range ? Array.isArray(this.valueAsDate) && this.valueAsDate[0] || void 0 : this.valueAsDate, this.minAsDate, this.maxAsDate), t = this.range ? D(Array.isArray(this.valueAsDate) && this.valueAsDate[1] || void 0, this.minAsDate, this.maxAsDate) : null;
    this.setInputValue((e && this.dateTimeFormat.format(e)) ?? "", "start"), this.setInputValue((this.range && t && this.dateTimeFormat.format(t)) ?? "", "end");
  }
  getInputRef(e = "start") {
    return e === "start" ? this.startInputRef : this.endInputRef;
  }
  setInputValue(e, t = "start") {
    const a = this.getInputRef(t);
    a.value && (a.value.value = e);
  }
  setRangeValue(e) {
    if (!this.range)
      return;
    const { value: t } = this, a = Array.isArray(t), i = Array.isArray(e), r = i ? e[0] : null;
    let c = i ? o(r) : "";
    c && (c = this.getNormalizedDate(c));
    const p = i ? e[1] : null;
    let g = i ? o(p) : "";
    g && (g = this.getNormalizedDate(g));
    const v = c || g ? [c, g] : "";
    if (v === t)
      return;
    this.userChangedValue = !0, this.value = v, this.valueAsDate = v ? $(v) : void 0;
    const f = this.calciteInputDatePickerChange.emit();
    f && f.defaultPrevented && (this.value = t, a ? (this.setInputValue(t[0], "start"), this.setInputValue(t[1], "end")) : (this.value = t, this.setInputValue(t)));
  }
  setValue(e) {
    if (this.range)
      return;
    const t = this.value;
    let a = o(e);
    if (a = this.getNormalizedDate(a), a === t)
      return;
    this.userChangedValue = !0, this.valueAsDate = a ? l(a) : void 0, this.value = a || "", this.calciteInputDatePickerChange.emit().defaultPrevented && (this.value = t, this.setInputValue(t));
  }
  warnAboutInvalidValue(e) {
    console.warn(`The specified value "${e}" does not conform to the required format, "YYYY-MM-DD".`);
  }
  formatNumerals(e) {
    return e ? e.split("").map((t) => this.commonDateSeparators?.includes(t) ? this.localeData?.separator : F?.includes(t) ? x?.numberFormatter?.format(Number(t)) : t).join("") : "";
  }
  parseNumerals(e) {
    return e ? e.split("").map((t) => F.includes(t) ? x.delocalize(t) : t).join("") : "";
  }
  getNormalizedDate(e) {
    if (!e)
      return "";
    if (!ue(e))
      return e;
    const { day: t, month: a, year: i } = R(e);
    return `${he(Number(i))}-${a}-${t}`;
  }
  focusInput() {
    (this.focusedInput === "start" ? this.startInputRef : this.endInputRef).value.setFocus();
  }
  render() {
    const { disabled: e, messages: { _lang: t }, messages: a, numberingSystem: i, readOnly: r } = this;
    return x.numberFormatOptions = {
      numberingSystem: i,
      locale: t,
      useGrouping: !1
    }, Z({ disabled: this.disabled, children: y`${this.labelText && re({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${s(n.container)}><div aria-label=${X(this) ?? u} .ariaRequired=${this.required} class=${s(n.inputContainer)} role=group><div class=${s(n.inputWrapper)} data-position=${O.start} @click=${this.onInputWrapperClick} @pointerdown=${this.onInputWrapperPointerDown} ${h(this.setStartWrapper)}><calcite-input-text aria-controls=${this.dialogId ?? u} aria-describedby=${this.placeholderTextId ?? u} aria-errormessage=${I.validationMessage} aria-autocomplete=none .ariaExpanded=${this.open} aria-haspopup=dialog .ariaInvalid=${this.status === "invalid"} class=${s({
      [n.input]: !0,
      [n.inputNoBottomBorder]: this.layout === "vertical" && this.range,
      [n.inputNoRightBorder]: this.range
    })} .disabled=${e} .icon=${m.calendar} .label=${this.range ? this.messages.startDate : this.messages.date} @calciteInputTextInput=${this.calciteInternalInputInputHandler} @calciteInternalInputTextBlur=${this.calciteInternalInputBlurHandler} @calciteInternalInputTextFocus=${this.startInputFocus} .placeholder=${this.localeData?.placeholder} .readOnly=${r} role=combobox .scale=${this.scale} .status=${this.status} ${h(this.startInputRef)}></calcite-input-text>${!this.readOnly && !this.range && this.renderToggleIcon(this.open && this.focusedInput === "start") || ""}<span aria-hidden=true class=${s(n.assistiveText)} id=${this.placeholderTextId ?? u}>${a.dateFormat.replace("{format}", this.localeData?.placeholder)}</span></div><div .ariaHidden=${!this.open} .ariaLabel=${a.chooseDate} aria-live=polite aria-modal=true class=${s(n.menu)} id=${this.dialogId ?? u} role=dialog ${h(this.setFloatingEl)}><div class=${s({
      [n.calendarWrapper]: !0,
      [C.animation]: !0,
      [C.animationActive]: this.open
    })} ${h(this.setTransitionEl)}><calcite-date-picker .activeDate=${this.datePickerActiveDate} .activeRange=${this.focusedInput} .calendars=${this.calendars} .headingLevel=${this.headingLevel} .layout=${this.layout} .max=${this.max} .maxAsDate=${this.maxAsDate} .messageOverrides=${this.messageOverrides} .min=${this.min} .minAsDate=${this.minAsDate} .monthStyle=${this.monthStyle} .numberingSystem=${i} @calciteDatePickerChange=${this.handleDateChange} @calciteDatePickerRangeChange=${this.handleDateRangeChange} .proximitySelectionDisabled=${this.proximitySelectionDisabled} .range=${this.range} .scale=${this.scale} tabindex=${(this.open ? void 0 : -1) ?? u} .valueAsDate=${this.valueAsDate} ${h(this.setDatePickerRef)}></calcite-date-picker></div></div>${this.range && y`<div class=${s(n.dividerContainer)}><div class=${s(n.divider)}></div></div>` || ""}${this.range && y`<div class=${s(n.inputWrapper)} data-position=${O.end} @click=${this.onInputWrapperClick} @pointerdown=${this.onInputWrapperPointerDown} ${h(this.setEndWrapper)}><calcite-input-text aria-controls=${this.dialogId ?? u} aria-autocomplete=none .ariaExpanded=${this.open} aria-haspopup=dialog class=${s({
      [n.input]: !0,
      [n.inputNoTopBorder]: this.layout === "vertical" && this.range,
      [n.inputNoLeftBorder]: this.layout === "horizontal" && this.range,
      [n.inputNoRightBorder]: this.layout === "vertical" && this.range
    })} .disabled=${e} .icon=${m.calendar} .label=${this.messages.endDate} @calciteInputTextInput=${this.calciteInternalInputInputHandler} @calciteInternalInputTextBlur=${this.calciteInternalInputBlurHandler} @calciteInternalInputTextFocus=${this.endInputFocus} .placeholder=${this.localeData?.placeholder} .readOnly=${r} role=combobox .scale=${this.scale} .status=${this.status} ${h(this.endInputRef)}></calcite-input-text>${!this.readOnly && this.layout === "horizontal" && this.renderToggleIcon(this.open) || ""}</div>` || ""}</div>${this.range && this.layout === "vertical" && y`<div class=${s(n.verticalChevronContainer)}><calcite-icon .icon=${this.open ? m.chevronUp : m.chevronDown} .scale=${S(this.scale)}></calcite-icon></div>` || ""}</div>${G({ component: this })}${this.validationMessage && this.status === "invalid" ? se({ icon: this.validationIcon, id: I.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderToggleIcon(e) {
    return y`<span class=${s(n.toggleIcon)} tabindex=-1><calcite-icon class=${s(n.chevronIcon)} .icon=${e ? m.chevronUp : m.chevronDown} .scale=${S(this.scale)}></calcite-icon></span>`;
  }
}
E("calcite-input-date-picker", ge);
export {
  ge as InputDatePicker
};
