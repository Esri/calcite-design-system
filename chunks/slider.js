import { j as P, L as z, n as w, o as C, w as F, x as k, s as f, q as _, E as O, k as B } from "./iframe.js";
import { n as T } from "./ref.js";
import { i as E } from "./keyed.js";
import { g as A } from "./guid.js";
import { e as M, D as R } from "./dom.js";
import { V as I } from "./Validation.js";
import { c as X, a as U, d as q, H as j } from "./form.js";
import { u as N, I as G } from "./interactive.js";
import { i as K } from "./key.js";
import { c as W, d as J, g as Q } from "./label.js";
import { c as Y } from "./component.js";
import { n as H, B as Z } from "./locale.js";
import { d as S, c as ee } from "./math.js";
import { u as te } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.3 */
const l = {
  container: "container",
  containerRange: "container--range",
  graph: "graph",
  handle: "handle",
  handleExtension: "handle-extension",
  handleLabel: "handle__label",
  handleLabelMinValue: "handle__label--minValue",
  handleLabelValue: "handle__label--value",
  hyphen: "hyphen",
  hyphenWrap: "hyphen--wrap",
  static: "static",
  thumb: "thumb",
  thumbActive: "thumb--active",
  thumbContainer: "thumb-container",
  thumbMinValue: "thumb--minValue",
  thumbPrecise: "thumb--precise",
  thumbValue: "thumb--value",
  tick: "tick",
  tickActive: "tick--active",
  tickLabel: "tick__label",
  tickMax: "tick__label--max",
  tickMin: "tick__label--min",
  ticks: "ticks",
  track: "track",
  trackRange: "track__range",
  transformed: "transformed"
}, D = {
  validationMessage: "validationMessage"
}, ae = 250, ie = P`@charset "UTF-8";:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}.scale--s{--calcite-slider-handle-size: .625rem;--calcite-slider-handle-extension-height: .4rem;--calcite-slider-container-font-size: var(--calcite-font-size--3)}.scale--s .handle__label,.scale--s .tick__label{line-height:.75rem}.scale--m{--calcite-slider-handle-size: .875rem;--calcite-slider-handle-extension-height: .5rem;--calcite-slider-container-font-size: var(--calcite-font-size--2)}.scale--m .handle__label,.scale--m .tick__label{line-height:1rem}.scale--l{--calcite-slider-handle-size: 1rem;--calcite-slider-handle-extension-height: .65rem;--calcite-slider-container-font-size: var(--calcite-font-size--1)}.scale--l .handle__label,.scale--l .tick__label{line-height:1rem}.handle__label,.tick__label{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-slider-text-color, var(--calcite-color-text-2));font-size:var(--calcite-slider-container-font-size)}:host{display:block}:host .validation-container{padding-block-start:0!important}.container{position:relative;display:block;overflow-wrap:normal;word-break:normal;padding-inline:calc(var(--calcite-slider-handle-size) * .5);padding-block:calc(var(--calcite-slider-handle-size) * .5);margin-block:calc(var(--calcite-slider-handle-size) * .5);margin-inline:0;--calcite-slider-full-handle-height: calc( var(--calcite-slider-handle-size) + var(--calcite-slider-handle-extension-height) );touch-action:none;-webkit-user-select:none;user-select:none}:host([disabled]) .track__range,:host([disabled]) .tick--active{background-color:var(--calcite-color-text-3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.scale--s .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -.375rem}.scale--m .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -.5rem}.scale--l .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -.55rem}:host([precise]:not([has-histogram])) .container .thumb--value{--calcite-slider-thumb-y-offset: calc(var(--calcite-slider-full-handle-height) * -1)}.thumb-container{position:relative;max-inline-size:100%}.thumb{--calcite-slider-thumb-x-offset: calc(var(--calcite-slider-handle-size) * .5);position:absolute;margin:0;display:flex;cursor:pointer;flex-direction:column;align-items:center;border-style:none;background-color:transparent;padding:0;font-family:inherit;outline:2px solid transparent;outline-offset:2px;transform:translate(var(--calcite-slider-thumb-x-offset),var(--calcite-slider-thumb-y-offset))}.thumb .handle__label{white-space:nowrap}.thumb .handle__label.static,.thumb .handle__label.transformed{position:absolute;inset-block:0px;opacity:0}.thumb .handle__label.hyphen:after{content:"\u2014";display:inline-block;inline-size:1em}.thumb .handle__label.hyphen--wrap{display:flex}.thumb .handle{box-sizing:border-box;border-radius:9999px;outline-color:transparent;background-color:var(--calcite-slider-handle-fill-color, var(--calcite-color-foreground-1));block-size:var(--calcite-slider-handle-size);inline-size:var(--calcite-slider-handle-size);box-shadow:0 0 0 2px var(--calcite-color-text-3) inset;transition:border var(--calcite-internal-animation-timing-medium) ease,background-color var(--calcite-internal-animation-timing-medium) ease,box-shadow var(--calcite-animation-timing) ease}.thumb .handle-extension{inline-size:.125rem;block-size:var(--calcite-slider-handle-extension-height);background-color:var(--calcite-slider-handle-extension-color, var(--calcite-color-text-3))}.thumb:hover .handle{box-shadow:0 0 0 3px var(--calcite-color-brand) inset}.thumb:hover .handle-extension{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand))}.thumb:focus .handle{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.thumb:focus .handle-extension{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand))}.thumb.thumb--minValue{transform:translate(calc(var(--calcite-slider-thumb-x-offset) * -1),var(--calcite-slider-thumb-y-offset))}.thumb.thumb--precise{--calcite-slider-thumb-y-offset: -.125rem}:host([label-handles]) .thumb{--calcite-slider-thumb-x-offset: 50%}:host([label-handles]):host(:not([has-histogram])) .scale--s .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -1.4375rem}:host([label-handles]):host(:not([has-histogram])) .scale--m .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -1.875rem}:host([label-handles]):host(:not([has-histogram])) .scale--l .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -2rem}:host([has-histogram][label-handles]) .handle__label,:host([label-handles]:not([has-histogram])) .thumb--minValue.thumb--precise .handle__label{margin-block-start:.5em}:host(:not([has-histogram]):not([precise])) .handle__label,:host([label-handles]:not([has-histogram])) .thumb--value .handle__label{margin-block-end:.5em}:host([label-handles][precise]):host(:not([has-histogram])) .scale--s .thumb--value{--calcite-slider-thumb-y-offset: -2.075rem}:host([label-handles][precise]):host(:not([has-histogram])) .scale--m .thumb--value{--calcite-slider-thumb-y-offset: -2.75rem}:host([label-handles][precise]):host(:not([has-histogram])) .scale--l .thumb--value{--calcite-slider-thumb-y-offset: -3.0625rem}.thumb:focus .handle,.thumb--active .handle{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand));box-shadow:0 0 8px #00000029}.thumb:hover.thumb--precise:after,.thumb:focus.thumb--precise:after,.thumb--active.thumb--precise:after{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand))}.track{position:relative;block-size:.125rem;border-radius:0;background-color:var(--calcite-slider-track-color, var(--calcite-color-border-2));transition:all var(--calcite-internal-animation-timing-medium) ease-in}.track__range{position:absolute;inset-block-start:0px;block-size:.125rem;background-color:var(--calcite-slider-track-fill-color, var(--calcite-color-brand))}.container--range .track__range:hover{cursor:ew-resize}.container--range .track__range:after{position:absolute;inline-size:100%;content:"";inset-block-start:calc(var(--calcite-slider-full-handle-height) * .5 * -1);block-size:calc(var(--calcite-slider-handle-size) + var(--calcite-slider-handle-extension-height))}@media (forced-colors: active){.thumb{outline-width:0;outline-offset:0}.handle{outline:2px solid transparent;outline-offset:2px}.thumb:focus .handle,.thumb .handle-extension,.thumb:hover .handle-extension,.thumb:focus .handle-extension,.thumb:active .handle-extension{background-color:canvasText}.track{background-color:canvasText}.track__range{background-color:highlight}}.tick{position:absolute;block-size:.25rem;inline-size:.125rem;border-width:1px;border-style:solid;background-color:var(--calcite-slider-tick-color, var(--calcite-color-border-input));border-color:var(--calcite-slider-tick-border-color, var(--calcite-color-foreground-1));inset-block-start:-2px;pointer-events:none;margin-inline-start:-.125rem}.tick--active{background-color:var(--calcite-slider-tick-selected-color, var(--calcite-color-brand))}.tick__label{pointer-events:none;margin-block-start:.875rem;display:flex;justify-content:center}.tick__label--min{transition:opacity var(--calcite-animation-timing)}.tick__label--max{transition:opacity var(--calcite-internal-animation-timing-fast)}:host([has-histogram][label-handles]) .tick__label--min,:host([has-histogram][label-handles]) .tick__label--max,:host([has-histogram][precise]) .tick__label--min,:host([has-histogram][precise]) .tick__label--max{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-3)}.graph{color:var(--calcite-slider-graph-color, var(--calcite-color-foreground-3));block-size:48px}:host([label-ticks][ticks]) .container{padding-block-end:calc(.875rem + var(--calcite-slider-container-font-size))}:host([has-histogram]):host([precise][label-handles]) .container{padding-block-end:calc(var(--calcite-slider-full-handle-height) + 1em)}:host([has-histogram]):host([label-handles]:not([precise])) .container{padding-block-end:calc(var(--calcite-slider-handle-size) * .5 + 1em)}:host([has-histogram]):host([precise]:not([label-handles])) .container{padding-block-end:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([precise]:not([label-handles])) .container{padding-block-start:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([precise]:not([label-handles])) .container--range{padding-block-end:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([label-handles]:not([precise])) .container{padding-block-start:calc(var(--calcite-slider-full-handle-height) + 4px)}:host(:not([has-histogram])):host([label-handles][precise]) .container{padding-block-start:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px)}:host(:not([has-histogram])):host([label-handles][precise]) .container--range{padding-block-end:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}`;
function g(L) {
  return Array.isArray(L);
}
class se extends z {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.activeProp = "value", this.dragEnd = (e) => {
      this.disabled || (this.removeDragListeners(), this.focusActiveHandle(e.clientX), this.lastDragPropValue != this[this.dragProp] && this.emitChange(), this.dragProp = null, this.lastDragPropValue = null, this.minValueDragRange = null, this.maxValueDragRange = null, this.minMaxValueRange = null);
    }, this.dragUpdate = (e) => {
      if (!this.disabled && (e.preventDefault(), this.dragProp)) {
        const t = this.mapToRange(e.clientX || e.pageX);
        if (g(this.value) && this.dragProp === "minMaxValue")
          if (this.minValueDragRange && this.maxValueDragRange && this.minMaxValueRange) {
            const i = t - this.minValueDragRange, a = t + this.maxValueDragRange;
            a <= this.max && i >= this.min && a - i === this.minMaxValueRange && this.setValue({
              minValue: this.clamp(i, "minValue"),
              maxValue: this.clamp(a, "maxValue")
            });
          } else
            this.minValueDragRange = t - this.minValue, this.maxValueDragRange = this.maxValue - t, this.minMaxValueRange = this.maxValue - this.minValue;
        else
          this.setValue({ [this.dragProp]: this.clamp(t, this.dragProp) });
      }
    }, this.formatValue = (e) => (H.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, H.localize(e.toString())), this.guid = `calcite-slider-${A()}`, this.messages = te({ name: null }), this.pointerUpDragEnd = (e) => {
      this.disabled || !M(e) || this.dragEnd(e);
    }, this.maxValueDragRange = null, this.minMaxValueRange = null, this.minValueDragRange = null, this.tickValues = [], this.disabled = !1, this.fillPlacement = "start", this.groupSeparator = !1, this.hasHistogram = !1, this.labelHandles = !1, this.labelTicks = !1, this.max = 100, this.min = 0, this.mirrored = !1, this.precise = !1, this.required = !1, this.scale = "m", this.snap = !1, this.status = "idle", this.step = 1, this.validity = {
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
    }, this.value = 0, this.calciteSliderChange = w({ cancelable: !1 }), this.calciteSliderInput = w({ cancelable: !1 }), this.listen("pointerdown", this.pointerDownHandler), this.listen("keydown", this.handleKeyDown), this.listen("touchstart", this.handleTouchStart);
  }
  static {
    this.properties = { maxValueDragRange: 16, minMaxValueRange: 16, minValueDragRange: 16, tickValues: 16, disabled: 7, fillPlacement: 3, form: 3, groupSeparator: 7, hasHistogram: 7, histogram: 0, histogramStops: 0, labelFormatter: 0, labelHandles: 7, labelTicks: 7, max: 11, maxLabel: 1, maxValue: 9, min: 11, minLabel: 1, minValue: 9, mirrored: 7, name: 3, numberingSystem: 1, pageStep: 11, precise: 7, required: 7, scale: 3, snap: 7, status: 3, step: 11, ticks: 11, validationIcon: [3, { converter: C }], validationMessage: 1, validity: 0, value: 11 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = ie;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await Y(this), (this.minHandle ? this.minHandle : this.maxHandle)?.focus();
  }
  connectedCallback() {
    super.connectedCallback(), this.setMinMaxFromValue(), this.setValueFromMinMax(), W(this), X(this);
  }
  load() {
    g(this.value) || (this.value = this.snap ? this.getClosestStep(this.value) : this.clamp(this.value)), U(this, this.value);
  }
  willUpdate(e) {
    e.has("histogram") && (this.hasHistogram = !!this.histogram), e.has("ticks") && (this.tickValues = this.generateTickValues()), e.has("value") && (this.hasUpdated || this.value !== 0) && this.setMinMaxFromValue(), (e.has("minValue") || e.has("maxValue")) && this.setValueFromMinMax();
  }
  updated() {
    this.labelHandles && (this.adjustHostObscuredHandleLabel("value"), g(this.value) && (this.adjustHostObscuredHandleLabel("minValue"), this.precise && !this.hasHistogram || this.hyphenateCollidingRangeHandleLabels())), this.hideObscuredBoundingTickLabels(), N(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), J(this), q(this), this.removeDragListeners();
  }
  // #endregion
  // #region Private Methods
  handleKeyDown(e) {
    const t = this.shouldMirror(), { activeProp: i, max: a, min: s, pageStep: n, step: o } = this, r = this[i], { key: c } = e;
    if (K(c)) {
      e.preventDefault();
      return;
    }
    let u;
    if (c === "ArrowUp" || c === "ArrowRight" ? u = r + o * (t && c === "ArrowRight" ? -1 : 1) : c === "ArrowDown" || c === "ArrowLeft" ? u = r - o * (t && c === "ArrowLeft" ? -1 : 1) : c === "PageUp" ? n && (u = r + n) : c === "PageDown" ? n && (u = r - n) : c === "Home" ? u = s : c === "End" && (u = a), isNaN(u))
      return;
    e.preventDefault();
    const d = Number(u.toFixed(S(o)));
    this.setValue({
      [i]: this.clamp(d, i)
    });
  }
  pointerDownHandler(e) {
    if (this.disabled || !M(e))
      return;
    const t = e.clientX || e.pageX, i = this.mapToRange(t);
    let a = "value";
    g(this.value) && (i >= this.minValue && i <= this.maxValue && this.lastDragProp === "minMaxValue" ? a = "minMaxValue" : a = Math.abs(this.maxValue - i) < Math.abs(this.minValue - i) || i >= this.maxValue ? "maxValue" : "minValue"), this.lastDragPropValue = this[a], this.dragStart(a), this.el.shadowRoot.querySelector(`.${l.thumb}:active`) || this.setValue({ [a]: this.clamp(i, a) }), this.focusActiveHandle(t);
  }
  handleTouchStart(e) {
    e.preventDefault();
  }
  buildThumbType(e) {
    const t = [e];
    return this.labelHandles && t.push("labeled"), this.precise && t.push("precise"), this.hasHistogram && t.push("histogram"), t.join("-");
  }
  setValueFromMinMax() {
    const { minValue: e, maxValue: t } = this;
    typeof e == "number" && typeof t == "number" && (this.value = [e, t]);
  }
  setMinMaxFromValue() {
    const { value: e } = this;
    g(e) && (this.minValue = e[0], this.maxValue = e[1]);
  }
  onLabelClick() {
    this.setFocus();
  }
  shouldMirror() {
    return this.mirrored && !this.hasHistogram;
  }
  shouldUseMinValue() {
    return g(this.value) ? this.hasHistogram && this.maxValue === 0 || !this.hasHistogram && this.minValue === 0 : !1;
  }
  getTickDensity() {
    const e = (this.max - this.min) / this.ticks / ae;
    return e < 1 ? 1 : e;
  }
  generateTickValues() {
    const e = this.ticks ?? 0;
    if (e <= 0)
      return [];
    const t = [this.min], i = this.getTickDensity(), a = e * i;
    let s = this.min;
    for (; s < this.max; )
      s += a, t.push(Math.min(s, this.max));
    return t.includes(this.max) || t.push(this.max), t;
  }
  onThumbBlur() {
    this.activeProp = null;
  }
  onThumbFocus(e) {
    const t = e.currentTarget;
    this.activeProp = t.getAttribute("data-value-prop");
  }
  onThumbPointerDown(e) {
    const t = e.currentTarget;
    this.pointerDownDragStart(e, t.getAttribute("data-value-prop"));
  }
  onTrackPointerDown(e) {
    this.pointerDownDragStart(e, "minMaxValue");
  }
  pointerDownDragStart(e, t) {
    M(e) && this.dragStart(t);
  }
  dragStart(e) {
    this.dragProp = e, this.lastDragProp = this.dragProp, this.activeProp = e, window.addEventListener("pointermove", this.dragUpdate), window.addEventListener("pointerup", this.pointerUpDragEnd), window.addEventListener("pointercancel", this.dragEnd);
  }
  focusActiveHandle(e) {
    this.dragProp === "minValue" ? this.minHandle.focus() : this.dragProp === "maxValue" || this.dragProp === "value" ? this.maxHandle.focus() : this.dragProp === "minMaxValue" && this.getClosestHandle(e).focus();
  }
  emitInput() {
    this.calciteSliderInput.emit();
  }
  emitChange() {
    this.calciteSliderChange.emit();
  }
  removeDragListeners() {
    window.removeEventListener("pointermove", this.dragUpdate), window.removeEventListener("pointerup", this.pointerUpDragEnd), window.removeEventListener("pointercancel", this.dragEnd);
  }
  /**
   * Set prop value(s) if changed at the component level
   *
   * @param {object} values - a set of key/value pairs delineating what properties in the component to update
   */
  setValue(e) {
    let t;
    if (Object.keys(e).forEach((a) => {
      const s = e[a];
      t || (t = this[a] !== s), this[a] = s;
    }), !t)
      return;
    this.dragProp || this.emitChange(), this.emitInput();
  }
  storeTrackRef(e) {
    this.trackEl = e;
  }
  storeThumbRef(e) {
    if (!e)
      return;
    e.getAttribute("data-value-prop") === "minValue" ? this.minHandle = e : this.maxHandle = e;
  }
  /**
   * If number is outside range, constrain to min or max
   *
   * @param value
   * @param prop
   * @private
   */
  clamp(e, t) {
    return e = ee(e, this.min, this.max), t === "maxValue" && (e = Math.max(e, this.minValue)), t === "minValue" && (e = Math.min(e, this.maxValue)), e;
  }
  /**
   * Translate a pixel position to value along the range
   *
   * @param x
   * @private
   */
  mapToRange(e) {
    const t = this.max - this.min, { left: i, width: a } = this.trackEl.getBoundingClientRect(), s = (e - i) / a, n = this.shouldMirror(), o = this.clamp(this.min + t * (n ? 1 - s : s)), r = Number(o.toFixed(S(this.step)));
    return this.snap && this.step ? this.getClosestStep(r) : r;
  }
  /**
   * Get closest allowed value along stepped values
   *
   * @param value
   * @private
   */
  getClosestStep(e) {
    const { max: t, min: i, step: a } = this, s = new Z(`${Math.floor((e - i) / a)}`).multiply(`${a}`).add(`${i}`).toString();
    let n = this.clamp(Number(s));
    return n > t && (n -= a), n;
  }
  getClosestHandle(e) {
    return this.getDistanceX(this.maxHandle, e) > this.getDistanceX(this.minHandle, e) ? this.minHandle : this.maxHandle;
  }
  getDistanceX(e, t) {
    return Math.abs(e.getBoundingClientRect().left - t);
  }
  getFontSizeForElement(e) {
    return Number(window.getComputedStyle(e).getPropertyValue("font-size").match(/\d+/)[0]);
  }
  /**
   * Get position of value along range as fractional value
   *
   * @param num
   * @return {number} number in the unit interval [0,1]
   * @private
   */
  getUnitInterval(e) {
    e = this.clamp(e);
    const t = this.max - this.min;
    return (e - this.min) / t;
  }
  adjustHostObscuredHandleLabel(e) {
    const t = this.el.shadowRoot.querySelector(`.handle__label--${e}`), i = this.el.shadowRoot.querySelector(`.handle__label--${e}.static`), a = this.el.shadowRoot.querySelector(`.handle__label--${e}.transformed`), s = i.getBoundingClientRect(), n = this.getHostOffset(s.left, s.right);
    t.style.transform = `translateX(${n}px)`, a.style.transform = `translateX(${n}px)`;
  }
  hyphenateCollidingRangeHandleLabels() {
    const { shadowRoot: e } = this.el, t = this.shouldMirror(), i = t ? "value" : "minValue", a = t ? "minValue" : "value", s = e.querySelector(`.handle__label--${i}`), n = e.querySelector(`.handle__label--${i}.static`), o = e.querySelector(`.handle__label--${i}.transformed`), r = this.getHostOffset(n.getBoundingClientRect().left, n.getBoundingClientRect().right), c = e.querySelector(`.handle__label--${a}`), u = e.querySelector(`.handle__label--${a}.static`), d = e.querySelector(`.handle__label--${a}.transformed`), m = this.getHostOffset(u.getBoundingClientRect().left, u.getBoundingClientRect().right), v = this.getFontSizeForElement(s), p = this.getRangeLabelOverlap(o, d), x = s, b = v / 2;
    if (p > 0) {
      if (x.classList.add(l.hyphen, l.hyphenWrap), m === 0 && r === 0) {
        let h = p / 2 - b;
        h = Math.sign(h) === -1 ? Math.abs(h) : -h;
        const V = this.getHostOffset(o.getBoundingClientRect().left + h - b, o.getBoundingClientRect().right + h - b);
        let y = p / 2;
        const $ = this.getHostOffset(d.getBoundingClientRect().left + y, d.getBoundingClientRect().right + y);
        V !== 0 && (h += V, y += V), $ !== 0 && (h += $, y += $), s.style.transform = `translateX(${h}px)`, o.style.transform = `translateX(${h - b}px)`, c.style.transform = `translateX(${y}px)`, d.style.transform = `translateX(${y}px)`;
      } else if (r > 0 || m > 0)
        s.style.transform = `translateX(${r + b}px)`, c.style.transform = `translateX(${p + m}px)`, d.style.transform = `translateX(${p + m}px)`;
      else if (r < 0 || m < 0) {
        let h = Math.abs(r) + p - b;
        h = Math.sign(h) === -1 ? Math.abs(h) : -h, s.style.transform = `translateX(${h}px)`, o.style.transform = `translateX(${h - b}px)`;
      }
    } else
      x.classList.remove(l.hyphen, l.hyphenWrap), s.style.transform = `translateX(${r}px)`, o.style.transform = `translateX(${r}px)`, c.style.transform = `translateX(${m}px)`, d.style.transform = `translateX(${m}px)`;
  }
  /** Hides bounding tick labels that are obscured by either handle. */
  hideObscuredBoundingTickLabels() {
    const e = g(this.value);
    if (!this.hasHistogram && !e && !this.labelHandles && !this.precise || !this.hasHistogram && !e && this.labelHandles && !this.precise || !this.hasHistogram && !e && !this.labelHandles && this.precise || !this.hasHistogram && !e && this.labelHandles && this.precise || !this.hasHistogram && e && !this.precise || this.hasHistogram && !this.precise && !this.labelHandles)
      return;
    const t = this.el.shadowRoot.querySelector(`.${l.thumbMinValue}`), i = this.el.shadowRoot.querySelector(`.${l.thumbValue}`), a = this.el.shadowRoot.querySelector(`.${l.tickMin}`), s = this.el.shadowRoot.querySelector(`.${l.tickMax}`);
    !t && i && a && s && (a.style.opacity = this.isMinTickLabelObscured(a, i) ? "0" : "1", s.style.opacity = this.isMaxTickLabelObscured(s, i) ? "0" : "1"), t && i && a && s && (a.style.opacity = this.isMinTickLabelObscured(a, t) || this.isMinTickLabelObscured(a, i) ? "0" : "1", s.style.opacity = this.isMaxTickLabelObscured(s, t) || this.isMaxTickLabelObscured(s, i) && this.hasHistogram ? "0" : "1");
  }
  /**
   * Returns an integer representing the number of pixels to offset on the left or right side based on desired position behavior.
   *
   * @param leftBounds
   * @param rightBounds
   * @private
   */
  getHostOffset(e, t) {
    const { left: i, right: a } = this.el.getBoundingClientRect();
    return e < i ? i - e : t > a ? -(t - a) : 0;
  }
  /**
   * Returns an integer representing the number of pixels that the two given span elements are overlapping, taking into account
   * a space in between the two spans equal to the font-size set on them to account for the space needed to render a hyphen.
   *
   * @param leftLabel
   * @param rightLabel
   */
  getRangeLabelOverlap(e, t) {
    const i = e.getBoundingClientRect(), a = t.getBoundingClientRect(), s = this.getFontSizeForElement(e), n = i.right + s - a.left;
    return Math.max(n, 0);
  }
  /**
   * Returns a boolean value representing if the minLabel span element is obscured (being overlapped) by the given handle div element.
   *
   * @param minLabel
   * @param handle
   */
  isMinTickLabelObscured(e, t) {
    const i = e.getBoundingClientRect(), a = t.getBoundingClientRect();
    return R(i, a);
  }
  /**
   * Returns a boolean value representing if the maxLabel span element is obscured (being overlapped) by the given handle div element.
   *
   * @param maxLabel
   * @param handle
   */
  isMaxTickLabelObscured(e, t) {
    const i = e.getBoundingClientRect(), a = t.getBoundingClientRect();
    return R(i, a);
  }
  internalLabelFormatter(e, t) {
    const i = this.labelFormatter;
    if (!i)
      return this.formatValue(e);
    const a = i(e, t, this.formatValue);
    return a ?? this.formatValue(e);
  }
  // #endregion
  // #region Rendering
  render() {
    const e = this.el.id || this.guid, t = g(this.value) ? this.maxValue : this.value, i = this.minValue || this.min, a = this.shouldUseMinValue(), s = this.getUnitInterval(a ? this.minValue : i) * 100, n = this.getUnitInterval(t) * 100, o = this.shouldMirror(), r = g(this.value), c = this.buildThumbType("max"), u = this.renderThumb({
      type: c,
      thumbPlacement: c.includes("histogram") ? "below" : "above",
      maxInterval: n,
      minInterval: s,
      mirror: o
    }), d = this.buildThumbType("min"), m = r ? this.renderThumb({
      type: d,
      thumbPlacement: d.includes("histogram") || d.includes("precise") ? "below" : "above",
      maxInterval: n,
      minInterval: s,
      mirror: o
    }) : null, v = r ? "start" : this.fillPlacement, p = v === "none" ? {
      left: "unset",
      right: "unset"
    } : v === "end" ? {
      left: `${o ? s : n}%`,
      right: `${o ? n : s}%`
    } : (
      /* default */
      {
        left: `${o ? 100 - n : s}%`,
        right: `${o ? s : 100 - n}%`
      }
    );
    return F(this.el, "id", e), G({ disabled: this.disabled, children: k`<div aria-errormessage=${D.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${Q(this)} class=${f({
      [l.container]: !0,
      [l.containerRange]: r,
      [`scale--${this.scale}`]: !0
    })}>${this.renderGraph()}<div class=${f(l.track)} ${T(this.storeTrackRef)}><div class=${f(l.trackRange)} @pointerdown=${this.onTrackPointerDown} style=${_(p)}></div><div class=${f(l.ticks)}>${this.tickValues.map((x) => {
      const b = `${this.getUnitInterval(x) * 100}%`;
      let h = !1;
      if (v === "start" || v === "end")
        if (a)
          h = x >= this.minValue && x <= this.maxValue;
        else {
          const V = v === "start" ? i : t, y = v === "start" ? t : this.max;
          h = x >= V && x <= y;
        }
      return k`<span class=${f({
        [l.tick]: !0,
        [l.tickActive]: h
      })} style=${_({
        left: o ? "" : b,
        right: o ? b : ""
      })}>${this.renderTickLabel(x)}</span>`;
    })}</div></div><div class=${f(l.thumbContainer)}>${m}${u}${j({ component: this })}</div></div>${this.validationMessage && this.status === "invalid" ? I({ icon: this.validationIcon, id: D.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderThumb({ type: e, mirror: t, thumbPlacement: i, minInterval: a, maxInterval: s }) {
    const n = e.includes("labeled"), o = e.includes("precise"), r = e.includes("min"), c = g(this.value), u = r ? this.minValue : c ? this.maxValue : this.value, d = r ? "minValue" : c ? "maxValue" : "value", m = r ? this.minLabel : c ? this.maxLabel : this.minLabel, v = r ? this.minValue : u, p = d === "minValue" ? this.internalLabelFormatter(this.minValue, "min") : d === "maxValue" ? this.internalLabelFormatter(this.maxValue, "max") : this.internalLabelFormatter(u, "value"), x = r ? { left: `${t ? 100 - a : a}%` } : { right: `${t ? s : 100 - s}%` }, b = `${l.handleLabel} ${r ? l.handleLabelMinValue : l.handleLabelValue}`, V = [
      ...n ? [
        k`<span aria-hidden=true class=${f(b)}>${p}</span>`,
        k`<span aria-hidden=true class=${`${b} ${l.static}`}>${p}</span>`,
        k`<span aria-hidden=true class=${`${b} ${l.transformed}`}>${p}</span>`
      ] : [],
      k`<div class=${f(l.handle)}></div>`,
      o && k`<div class=${f(l.handleExtension)}></div>` || ""
    ];
    return i === "below" && V.reverse(), E(e, k`<div .ariaLabel=${m} aria-orientation=horizontal .ariaValueMax=${this.max} .ariaValueMin=${this.min} .ariaValueNow=${v} class=${f({
      [l.thumb]: !0,
      [l.thumbValue]: !r,
      [l.thumbActive]: this.lastDragProp !== "minMaxValue" && this.dragProp === d,
      [l.thumbPrecise]: o,
      [l.thumbMinValue]: r
    })} data-value-prop=${d ?? O} @blur=${this.onThumbBlur} @focus=${this.onThumbFocus} @pointerdown=${this.onThumbPointerDown} role=slider style=${_(x)} tabindex=0 ${T(this.storeThumbRef)}>${V}</div>`);
  }
  renderGraph() {
    return this.histogram ? k`<calcite-graph class=${f(l.graph)} .colorStops=${this.histogramStops} .data=${this.histogram} .highlightMax=${g(this.value) ? this.maxValue : this.value} .highlightMin=${g(this.value) ? this.minValue : this.min} .max=${this.max} .min=${this.min}></calcite-graph>` : null;
  }
  renderTickLabel(e) {
    const { hasHistogram: t, labelHandles: i, labelTicks: a, max: s, min: n, precise: o, value: r } = this, c = g(r), u = e === n, d = e === s, m = u || d;
    return a && (!t && (m || !o || !c) || t && (m || !o && !i)) ? k`<span class=${f({
      [l.tickLabel]: !0,
      [l.tickMin]: u,
      [l.tickMax]: d
    })}>${this.internalLabelFormatter(e, "tick")}</span>` : null;
  }
}
B("calcite-slider", se);
export {
  se as Slider
};
