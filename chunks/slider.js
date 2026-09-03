/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as F, L as O, c as H, T as E, O as B, s as f, J as M, b as V, A, d as X } from "./index.js";
import { i as I } from "./keyed.js";
import { e as k, n as R } from "./ref.js";
import { g as U } from "./guid.js";
import { e as _, G as P } from "./dom.js";
import { I as q } from "./InternalLabel.js";
import { V as j } from "./Validation.js";
import { i as N } from "./key.js";
import { g as G } from "./label.js";
import { u as K } from "./useLabel.js";
import { n as D, B as W } from "./locale.js";
import { d as S, c as J } from "./math.js";
import { u as Q } from "./useT9n.js";
import { u as Y } from "./useSetFocus.js";
import { u as Z } from "./useInteractive.js";
import { u as ee } from "./useForm.js";
import { i as te } from "./isEqual.js";
const o = {
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
  transformed: "transformed",
  scale: ($) => `scale--${$}`
}, ae = "calcite-slider", w = {
  validationMessage: "validationMessage",
  host: ($) => `${ae}-${$}`
}, ie = 250, se = F`@charset "UTF-8";:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}.scale--s{--calcite-slider-handle-size: var(--calcite-space-sm-plus);--calcite-slider-handle-extension-height: .4rem;--calcite-slider-container-font-size: var(--calcite-font-size--3)}.scale--s .handle__label,.scale--s .tick__label{line-height:.75rem}.scale--m{--calcite-slider-handle-size: .875rem;--calcite-slider-handle-extension-height: .5rem;--calcite-slider-container-font-size: var(--calcite-font-size--2)}.scale--m .handle__label,.scale--m .tick__label{line-height:1rem}.scale--l{--calcite-slider-handle-size: 1rem;--calcite-slider-handle-extension-height: .65rem;--calcite-slider-container-font-size: var(--calcite-font-size--1)}.scale--l .handle__label,.scale--l .tick__label{line-height:1rem}.handle__label,.tick__label{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-slider-text-color, var(--calcite-color-text-2));font-size:var(--calcite-slider-container-font-size)}:host{display:block}:host .validation-container{padding-block-start:0!important}.container{position:relative;display:block;overflow-wrap:normal;word-break:normal;padding-inline:calc(var(--calcite-slider-handle-size) * .5);padding-block:calc(var(--calcite-slider-handle-size) * .5);margin-block:calc(var(--calcite-slider-handle-size) * .5);margin-inline:0;--calcite-slider-full-handle-height: calc( var(--calcite-slider-handle-size) + var(--calcite-slider-handle-extension-height) );touch-action:none;-webkit-user-select:none;user-select:none}:host([disabled]) .track__range,:host([disabled]) .tick--active{background-color:var(--calcite-color-text-3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.scale--s .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -.375rem}.scale--m .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -.5rem}.scale--l .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -.55rem}:host([precise]:not([has-histogram])) .container .thumb--value{--calcite-slider-thumb-y-offset: calc(var(--calcite-slider-full-handle-height) * -1)}.thumb-container{position:relative;max-inline-size:100%}.thumb{--calcite-slider-thumb-x-offset: calc(var(--calcite-slider-handle-size) * .5);position:absolute;margin:0;display:flex;cursor:pointer;flex-direction:column;align-items:center;border-style:none;background-color:transparent;padding:0;font-family:inherit;outline:2px solid transparent;outline-offset:2px;transform:translate(var(--calcite-slider-thumb-x-offset),var(--calcite-slider-thumb-y-offset))}.thumb .handle__label{white-space:nowrap}.thumb .handle__label.static,.thumb .handle__label.transformed{position:absolute;inset-block:0px;opacity:0}.thumb .handle__label.hyphen:after{content:"—";display:inline-block;inline-size:1em}.thumb .handle__label.hyphen--wrap{display:flex}.thumb .handle{box-sizing:border-box;border-radius:9999px;outline-color:transparent;background-color:var(--calcite-slider-handle-fill-color, var(--calcite-color-foreground-1));block-size:var(--calcite-slider-handle-size);inline-size:var(--calcite-slider-handle-size);box-shadow:0 0 0 2px var(--calcite-color-text-3) inset;transition:border var(--calcite-internal-animation-timing-medium) ease,background-color var(--calcite-internal-animation-timing-medium) ease,box-shadow var(--calcite-animation-timing) ease}.thumb .handle-extension{inline-size:.125rem;block-size:var(--calcite-slider-handle-extension-height);background-color:var(--calcite-slider-handle-extension-color, var(--calcite-color-text-3))}.thumb:hover .handle{box-shadow:0 0 0 3px var(--calcite-color-brand) inset}.thumb:hover .handle-extension{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand))}.thumb:focus .handle{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.thumb:focus .handle-extension{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand))}.thumb.thumb--minValue{transform:translate(calc(var(--calcite-slider-thumb-x-offset) * -1),var(--calcite-slider-thumb-y-offset))}.thumb.thumb--precise{--calcite-slider-thumb-y-offset: -.125rem}:host([label-handles]) .thumb{--calcite-slider-thumb-x-offset: 50%}:host([label-handles]):host(:not([has-histogram])) .scale--s .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -1.4375rem}:host([label-handles]):host(:not([has-histogram])) .scale--m .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -1.875rem}:host([label-handles]):host(:not([has-histogram])) .scale--l .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -2rem}:host([has-histogram][label-handles]) .handle__label,:host([label-handles]:not([has-histogram])) .thumb--minValue.thumb--precise .handle__label{margin-block-start:.5em}:host(:not([has-histogram]):not([precise])) .handle__label,:host([label-handles]:not([has-histogram])) .thumb--value .handle__label{margin-block-end:.5em}:host([label-handles][precise]):host(:not([has-histogram])) .scale--s .thumb--value{--calcite-slider-thumb-y-offset: -2.075rem}:host([label-handles][precise]):host(:not([has-histogram])) .scale--m .thumb--value{--calcite-slider-thumb-y-offset: -2.75rem}:host([label-handles][precise]):host(:not([has-histogram])) .scale--l .thumb--value{--calcite-slider-thumb-y-offset: -3.0625rem}.thumb:focus .handle,.thumb--active .handle{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand));box-shadow:0 0 8px #00000029}.thumb:hover.thumb--precise:after,.thumb:focus.thumb--precise:after,.thumb--active.thumb--precise:after{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand))}.track{position:relative;block-size:.125rem;background-color:var(--calcite-slider-track-color, var(--calcite-color-border-2));transition:all var(--calcite-internal-animation-timing-medium) ease-in;border-radius:var(--calcite-corner-radius)}.track__range{position:absolute;inset-block-start:0px;block-size:.125rem;background-color:var(--calcite-slider-track-fill-color, var(--calcite-color-brand))}.container--range .track__range:hover{cursor:ew-resize}.container--range .track__range:after{position:absolute;inline-size:100%;content:"";inset-block-start:calc(var(--calcite-slider-full-handle-height) * .5 * -1);block-size:calc(var(--calcite-slider-handle-size) + var(--calcite-slider-handle-extension-height))}@media(forced-colors:active){.thumb{outline-width:0;outline-offset:0}.handle{outline:2px solid transparent;outline-offset:2px}.thumb:focus .handle,.thumb .handle-extension,.thumb:hover .handle-extension,.thumb:focus .handle-extension,.thumb:active .handle-extension{background-color:canvasText}.track{background-color:canvasText}.track__range{background-color:highlight}}.tick{position:absolute;block-size:.25rem;inline-size:.125rem;border-width:1px;border-style:solid;background-color:var(--calcite-slider-tick-color, var(--calcite-color-border-input));border-color:var(--calcite-slider-tick-border-color, var(--calcite-color-foreground-1));inset-block-start:-2px;pointer-events:none;margin-inline-start:-.125rem}.tick--active{background-color:var(--calcite-slider-tick-selected-color, var(--calcite-color-brand))}.tick__label{pointer-events:none;margin-block-start:.875rem;display:flex;justify-content:center}.tick__label--min{transition:opacity var(--calcite-animation-timing)}.tick__label--max{transition:opacity var(--calcite-internal-animation-timing-fast)}:host([has-histogram][label-handles]) .tick__label--min,:host([has-histogram][label-handles]) .tick__label--max,:host([has-histogram][precise]) .tick__label--min,:host([has-histogram][precise]) .tick__label--max{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-3)}.graph{color:var(--calcite-slider-graph-color, var(--calcite-color-foreground-3));block-size:48px}:host([label-ticks][ticks]) .container{padding-block-end:calc(.875rem + var(--calcite-slider-container-font-size))}:host([has-histogram]):host([precise][label-handles]) .container{padding-block-end:calc(var(--calcite-slider-full-handle-height) + 1em)}:host([has-histogram]):host([label-handles]:not([precise])) .container{padding-block-end:calc(var(--calcite-slider-handle-size) * .5 + 1em)}:host([has-histogram]):host([precise]:not([label-handles])) .container{padding-block-end:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([precise]:not([label-handles])) .container{padding-block-start:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([precise]:not([label-handles])) .container--range{padding-block-end:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([label-handles]:not([precise])) .container{padding-block-start:calc(var(--calcite-slider-full-handle-height) + 4px)}:host(:not([has-histogram])):host([label-handles][precise]) .container{padding-block-start:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px)}:host(:not([has-histogram])):host([label-handles][precise]) .container--range{padding-block-end:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px)}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`;
function b($) {
  return Array.isArray($);
}
const z = 0;
class le extends O {
  constructor() {
    super(), this.dragEnd = (e) => {
      this.disabled || (this.removeDragListeners(), this.focusActiveHandle(e.clientX), this.dragProp && !te(this.lastDragPropValue, this.getDragPropValue(this.dragProp)) && this.emitChange(), this.dragProp = void 0, this.lastDragPropValue = void 0, this.minValueDragRange = void 0, this.maxValueDragRange = void 0, this.minMaxValueRange = void 0);
    }, this.dragUpdate = (e) => {
      if (!(this.disabled || !this.trackRef.value) && (e.preventDefault(), this.dragProp)) {
        const t = this.mapToRange(e.clientX || e.pageX);
        if (b(this.value) && this.dragProp === "minMaxValue")
          if (this.minValueDragRange && this.maxValueDragRange && this.minMaxValueRange) {
            const i = t - this.minValueDragRange, a = t + this.maxValueDragRange;
            a <= this.max && i >= this.min && a - i === this.minMaxValueRange && this.setValue({
              minValue: this.clamp(i, "minValue"),
              maxValue: this.clamp(a, "maxValue")
            });
          } else
            this.minValueDragRange = t - this.minValue, this.maxValueDragRange = this.maxValue - t, this.minMaxValueRange = this.maxValue - this.minValue;
        else if (b(this.value) && this.previousEmittedValue !== void 0 && b(this.previousEmittedValue) && this.dragProp === "maxValue") {
          const [i, a] = this.previousEmittedValue;
          i === a && t < i ? (this.dragProp = "minValue", this.minHandleRef.value.focus()) : this.setValue({ [this.dragProp]: this.clamp(t, this.dragProp) });
        } else
          this.setValue({ [this.dragProp]: this.clamp(t, this.dragProp) });
      }
    }, this.formatValue = (e) => (D.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    }, D.localize(e.toString())), this.formSupport = ee({
      inputType: "range"
    })(this), this.guid = w.host(U()), this.maxHandleRef = k(), this.maxValueLabelRefs = {
      label: k(),
      static: k(),
      transformed: k()
    }, this.maxTickLabelRef = k(), this.messages = Q({ blocking: !0 }), this.minHandleRef = k(), this.minValueLabelRefs = {
      label: k(),
      static: k(),
      transformed: k()
    }, this.minTickLabelRef = k(), this.pointerUpDragEnd = (e) => {
      this.disabled || !_(e) || this.dragEnd(e);
    }, this.trackRef = k(), this.focusSetter = Y()(this), this.interactiveContainer = Z(this), this._value = z, this.activeProp = "value", this.tickValues = [], this.disabled = !1, this.fillPlacement = "start", this.groupSeparator = !1, this.hasHistogram = !1, this.labelHandles = !1, this.labelTicks = !1, this.max = 100, this.min = 0, this.mirrored = !1, this.precise = !1, this.required = !1, this.scale = "m", this.snap = !1, this.status = "idle", this.step = 1, this.calciteSliderChange = H({ cancelable: !1 }), this.calciteSliderInput = H({ cancelable: !1 }), K(this), this.listen("pointerdown", this.pointerDownHandler), this.listen("keydown", this.handleKeyDown), this.listen("touchstart", this.handleTouchStart);
  }
  static {
    this.properties = { activeProp: 16, maxValueDragRange: 16, minMaxValueRange: 16, minValueDragRange: 16, tickValues: 16, disabled: 7, fillPlacement: 3, form: 3, groupSeparator: 7, hasHistogram: 7, histogram: 0, histogramStops: 0, label: 1, labelFormatter: 0, labelHandles: 7, labelTicks: 7, max: 11, maxLabel: 1, maxValue: 9, min: 11, minLabel: 1, labelText: 1, messageOverrides: 0, minValue: 9, mirrored: 7, name: 3, numberingSystem: 1, pageStep: 11, precise: 7, required: 7, scale: 3, snap: 7, status: 3, step: 11, ticks: 11, validationIcon: [3, { converter: E }], validationMessage: 1, validity: 32, value: 11 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = se;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    if (Array.isArray(e)) {
      this._value = e;
      return;
    }
    if (
      /* intentional loose null check */
      e != null
    ) {
      this._value = Number(e);
      return;
    }
    this._value = Array.isArray(this._value) ? [this.minValue, this.maxValue] : z;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.minHandleRef.value || this.maxHandleRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.setMinMaxFromValue(), this.setValueFromMinMax(), this.previousEmittedValue = this.value;
  }
  load() {
    this.setInitialValue();
  }
  willUpdate(e) {
    e.has("histogram") && (this.hasHistogram = !!this.histogram), e.has("ticks") && (this.tickValues = this.generateTickValues()), e.has("value") && (this.hasUpdated || this.value !== 0) && this.setMinMaxFromValue(), (e.has("minValue") || e.has("maxValue")) && this.setValueFromMinMax();
  }
  updated() {
    this.isConnected && (this.labelHandles && (this.adjustHostObscuredHandleLabel("value"), b(this.value) && (this.adjustHostObscuredHandleLabel("minValue"), this.precise && !this.hasHistogram || this.hyphenateCollidingRangeHandleLabels())), this.hideObscuredBoundingTickLabels());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeDragListeners();
  }
  setInitialValue() {
    b(this.value) || (this.value = this.snap ? this.getClosestStep(this.value) : this.clamp(this.value));
  }
  handleKeyDown(e) {
    const t = this.shouldMirror(), { activeProp: i, max: a, min: s, pageStep: l, step: n } = this, h = this[i], { key: r } = e;
    if (N(r)) {
      e.preventDefault();
      return;
    }
    let c = NaN;
    if (r === "ArrowUp" || r === "ArrowRight" ? c = h + n * (t && r === "ArrowRight" ? -1 : 1) : r === "ArrowDown" || r === "ArrowLeft" ? c = h - n * (t && r === "ArrowLeft" ? -1 : 1) : r === "PageUp" ? l && (c = h + l) : r === "PageDown" ? l && (c = h - l) : r === "Home" ? c = s : r === "End" && (c = a), isNaN(c))
      return;
    e.preventDefault();
    const m = Number(c.toFixed(S(n)));
    this.setValue({
      [i]: this.clamp(m, i)
    });
  }
  pointerDownHandler(e) {
    if (this.disabled || !_(e))
      return;
    const t = e.clientX || e.pageX, i = this.mapToRange(t);
    let a = "value";
    b(this.value) && (i >= this.minValue && i <= this.maxValue && this.lastDragProp === "minMaxValue" ? a = "minMaxValue" : a = Math.abs(this.maxValue - i) < Math.abs(this.minValue - i) || i >= this.maxValue ? "maxValue" : "minValue"), this.lastDragPropValue = this.getDragPropValue(a), this.dragStart(a);
    const s = e.composedPath();
    [this.minHandleRef.value, this.maxHandleRef.value].some((n) => n && s.includes(n)) || this.setValue({ [a]: this.clamp(i, a) }), this.focusActiveHandle(t);
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
    b(e) && (this.minValue = e[0], this.maxValue = e[1]);
  }
  onLabelClick() {
    this.setFocus();
  }
  shouldMirror() {
    return this.mirrored && !this.hasHistogram;
  }
  shouldUseMinValue() {
    return b(this.value) ? this.hasHistogram && this.maxValue === 0 || !this.hasHistogram && this.minValue === 0 : !1;
  }
  getTickDensity() {
    const e = (this.max - this.min) / this.ticks / ie;
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
    this.activeProp = void 0;
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
    _(e) && this.dragStart(t);
  }
  dragStart(e) {
    this.dragProp = e, this.lastDragProp = this.dragProp, this.activeProp = e, window.addEventListener("pointermove", this.dragUpdate), window.addEventListener("pointerup", this.pointerUpDragEnd), window.addEventListener("pointercancel", this.dragEnd);
  }
  getDragPropValue(e) {
    return e === "minMaxValue" ? this.value : this[e];
  }
  focusActiveHandle(e) {
    this.dragProp === "minValue" ? this.minHandleRef.value.focus() : this.dragProp === "maxValue" || this.dragProp === "value" ? this.maxHandleRef.value.focus() : this.dragProp === "minMaxValue" && this.getClosestHandle(e).focus();
  }
  emitChange() {
    this.calciteSliderChange.emit(), this.previousEmittedValue = this.value;
  }
  removeDragListeners() {
    window.removeEventListener("pointermove", this.dragUpdate), window.removeEventListener("pointerup", this.pointerUpDragEnd), window.removeEventListener("pointercancel", this.dragEnd);
  }
  setValue(e) {
    let t = !1;
    if (Object.keys(e).forEach((a) => {
      const s = e[a];
      s !== void 0 && (t || (t = this[a] !== s), this[a] = s);
    }), !t)
      return;
    (e.minValue || e.maxValue) && this.setValueFromMinMax(), this.dragProp || this.emitChange(), this.calciteSliderInput.emit();
  }
  clamp(e, t) {
    return e = J(e, this.min, this.max), t === "maxValue" && (e = Math.max(e, this.minValue)), t === "minValue" && (e = Math.min(e, this.maxValue)), e;
  }
  mapToRange(e) {
    const t = this.max - this.min, { left: i, width: a } = this.trackRef.value.getBoundingClientRect() || { left: 0, width: 0 }, s = (e - i) / a, l = this.shouldMirror(), n = this.clamp(this.min + t * (l ? 1 - s : s)), h = Number(n.toFixed(S(this.step)));
    return this.snap && this.step ? this.getClosestStep(h) : h;
  }
  getClosestStep(e) {
    const { max: t, min: i, step: a } = this, s = new W(`${Math.floor((e - i) / a)}`).multiply(`${a}`).add(`${i}`).toString();
    let l = this.clamp(Number(s));
    return l > t && (l -= a), l;
  }
  getClosestHandle(e) {
    const t = this.minHandleRef.value, i = this.maxHandleRef.value;
    return this.getDistanceX(i, e) > this.getDistanceX(t, e) ? t : i;
  }
  getDistanceX(e, t) {
    return Math.abs(e.getBoundingClientRect().left - t);
  }
  getFontSizeForElement(e) {
    return Number(window.getComputedStyle(e).getPropertyValue("font-size").match(/\d+/)[0]);
  }
  getUnitInterval(e) {
    e = this.clamp(e);
    const t = this.max - this.min;
    return (e - this.min) / t;
  }
  adjustHostObscuredHandleLabel(e) {
    const t = e === "minValue" ? this.minValueLabelRefs : this.maxValueLabelRefs, i = t.label.value, a = t.static.value, s = t.transformed.value, l = a.getBoundingClientRect(), n = this.getHostOffset(l.left, l.right);
    i.style.transform = `translateX(${n}px)`, s.style.transform = `translateX(${n}px)`;
  }
  hyphenateCollidingRangeHandleLabels() {
    const e = this.shouldMirror(), t = e ? this.maxValueLabelRefs : this.minValueLabelRefs, i = e ? this.minValueLabelRefs : this.maxValueLabelRefs, a = t.label.value, s = t.static.value, l = t.transformed.value, n = this.getHostOffset(s.getBoundingClientRect().left, s.getBoundingClientRect().right), h = i.label.value, r = i.static.value, c = i.transformed.value, m = this.getHostOffset(r.getBoundingClientRect().left, r.getBoundingClientRect().right), p = this.getFontSizeForElement(a), v = this.getRangeLabelOverlap(l, c), y = a, d = p / 2;
    if (v > 0) {
      if (y.classList.add(o.hyphen, o.hyphenWrap), m === 0 && n === 0) {
        let u = v / 2 - d;
        u = Math.sign(u) === -1 ? Math.abs(u) : -u;
        const g = this.getHostOffset(l.getBoundingClientRect().left + u - d, l.getBoundingClientRect().right + u - d);
        let x = v / 2;
        const L = this.getHostOffset(c.getBoundingClientRect().left + x, c.getBoundingClientRect().right + x);
        g !== 0 && (u += g, x += g), L !== 0 && (u += L, x += L), a.style.transform = `translateX(${u}px)`, l.style.transform = `translateX(${u - d}px)`, h.style.transform = `translateX(${x}px)`, c.style.transform = `translateX(${x}px)`;
      } else if (n > 0 || m > 0)
        a.style.transform = `translateX(${n + d}px)`, h.style.transform = `translateX(${v + m}px)`, c.style.transform = `translateX(${v + m}px)`;
      else if (n < 0 || m < 0) {
        let u = Math.abs(n) + v - d;
        u = Math.sign(u) === -1 ? Math.abs(u) : -u, a.style.transform = `translateX(${u}px)`, l.style.transform = `translateX(${u - d}px)`;
      }
    } else
      y.classList.remove(o.hyphen, o.hyphenWrap), a.style.transform = `translateX(${n}px)`, l.style.transform = `translateX(${n}px)`, h.style.transform = `translateX(${m}px)`, c.style.transform = `translateX(${m}px)`;
  }
  hideObscuredBoundingTickLabels() {
    const e = b(this.value);
    if (!this.hasHistogram && !e && !this.labelHandles && !this.precise || !this.hasHistogram && !e && this.labelHandles && !this.precise || !this.hasHistogram && !e && !this.labelHandles && this.precise || !this.hasHistogram && !e && this.labelHandles && this.precise || !this.hasHistogram && e && !this.precise || this.hasHistogram && !this.precise && !this.labelHandles)
      return;
    const t = this.minHandleRef.value, i = this.maxHandleRef.value, a = this.minTickLabelRef.value, s = this.maxTickLabelRef.value;
    !t && i && a && s && (a.style.opacity = this.isMinTickLabelObscured(a, i) ? "0" : "1", s.style.opacity = this.isMaxTickLabelObscured(s, i) ? "0" : "1"), t && i && a && s && (a.style.opacity = this.isMinTickLabelObscured(a, t) || this.isMinTickLabelObscured(a, i) ? "0" : "1", s.style.opacity = this.isMaxTickLabelObscured(s, t) || this.isMaxTickLabelObscured(s, i) && this.hasHistogram ? "0" : "1");
  }
  getHostOffset(e, t) {
    const { left: i, right: a } = this.el.getBoundingClientRect();
    return e < i ? i - e : t > a ? -(t - a) : 0;
  }
  getRangeLabelOverlap(e, t) {
    const i = e.getBoundingClientRect(), a = t.getBoundingClientRect(), s = this.getFontSizeForElement(e), l = i.right + s - a.left;
    return Math.max(l, 0);
  }
  isMinTickLabelObscured(e, t) {
    const i = e.getBoundingClientRect(), a = t.getBoundingClientRect();
    return P(i, a);
  }
  isMaxTickLabelObscured(e, t) {
    const i = e.getBoundingClientRect(), a = t.getBoundingClientRect();
    return P(i, a);
  }
  internalLabelFormatter(e, t) {
    const i = this.labelFormatter;
    if (!i)
      return this.formatValue(e);
    const a = i(e, t, this.formatValue);
    return a ?? this.formatValue(e);
  }
  render() {
    const e = this.el.id || this.guid, t = b(this.value) ? this.maxValue : this.value, i = this.minValue || this.min, a = this.shouldUseMinValue(), s = this.getUnitInterval(a ? this.minValue : i) * 100, l = this.getUnitInterval(t) * 100, n = this.shouldMirror(), h = b(this.value), r = G(this), c = h && !!r, m = this.buildThumbType("max"), p = this.renderThumb({
      type: m,
      thumbPlacement: m.includes("histogram") ? "below" : "above",
      labelFallback: r,
      maxInterval: l,
      minInterval: s,
      mirror: n
    }), v = this.buildThumbType("min"), y = h ? this.renderThumb({
      type: v,
      thumbPlacement: v.includes("histogram") || v.includes("precise") ? "below" : "above",
      labelFallback: r,
      maxInterval: l,
      minInterval: s,
      mirror: n
    }) : null, d = h ? "start" : this.fillPlacement, u = d === "none" ? {
      left: "unset",
      right: "unset"
    } : d === "end" ? {
      left: `${n ? s : l}%`,
      right: `${n ? l : s}%`
    } : (
      /* default */
      {
        left: `${n ? 100 - l : s}%`,
        right: `${n ? s : 100 - l}%`
      }
    );
    return B(this.el, "id", e), this.interactiveContainer({ disabled: this.disabled, children: V`${this.labelText && q({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div aria-errormessage=${w.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${r} .ariaRequired=${this.required} class=${f({
      [o.container]: !0,
      [o.containerRange]: h,
      [o.scale(this.scale)]: !0
    })} .role=${c ? "group" : void 0}>${this.renderGraph()}<div class=${f(o.track)} ${R(this.trackRef)}><div class=${f(o.trackRange)} @pointerdown=${this.onTrackPointerDown} style=${M(u)}></div><div class=${f(o.ticks)}>${this.tickValues.map((g) => {
      const x = `${this.getUnitInterval(g) * 100}%`;
      let L = !1;
      if (d === "start" || d === "end")
        if (a)
          L = g >= this.minValue && g <= this.maxValue;
        else {
          const T = d === "start" ? i : t, C = d === "start" ? t : this.max;
          L = g >= T && g <= C;
        }
      return V`<span class=${f({
        [o.tick]: !0,
        [o.tickActive]: L
      })} style=${M({
        left: n ? "" : x,
        right: n ? x : ""
      })}>${this.renderTickLabel(g)}</span>`;
    })}</div></div><div class=${f(o.thumbContainer)}>${y}${p}</div></div>${this.validationMessage && this.status === "invalid" ? j({ icon: this.validationIcon, id: w.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderThumb({ type: e, mirror: t, thumbPlacement: i, minInterval: a, maxInterval: s, labelFallback: l }) {
    const n = e.includes("labeled"), h = e.includes("precise"), r = e.includes("min"), c = b(this.value), m = r ? this.minValue : c ? this.maxValue : this.value, p = r ? "minValue" : c ? "maxValue" : "value", v = r ? this.minLabel || l : c ? this.maxLabel || l : this.minLabel || l, y = r ? this.minValue : m, d = p === "minValue" ? this.internalLabelFormatter(this.minValue, "min") : p === "maxValue" ? this.internalLabelFormatter(this.maxValue, "max") : this.internalLabelFormatter(m, "value"), u = r ? { left: `${t ? 100 - a : a}%` } : { right: `${t ? s : 100 - s}%` }, g = `${o.handleLabel} ${r ? o.handleLabelMinValue : o.handleLabelValue}`, x = r ? this.minValueLabelRefs : this.maxValueLabelRefs, T = [
      ...n ? [
        V`<span aria-hidden=true class=${f(g)} ${R(x.label)}>${d}</span>`,
        V`<span aria-hidden=true class=${`${g} ${o.static}`} ${R(x.static)}>${d}</span>`,
        V`<span aria-hidden=true class=${`${g} ${o.transformed}`} ${R(x.transformed)}>${d}</span>`
      ] : [],
      V`<div class=${f(o.handle)}></div>`,
      h && V`<div class=${f(o.handleExtension)}></div>` || ""
    ];
    return i === "below" && T.reverse(), I(e, V`<div .ariaLabel=${v} aria-orientation=horizontal .ariaValueMax=${this.max} .ariaValueMin=${this.min} .ariaValueNow=${y} class=${f({
      [o.thumb]: !0,
      [o.thumbValue]: !r,
      [o.thumbActive]: this.lastDragProp !== "minMaxValue" && this.dragProp === p,
      [o.thumbPrecise]: h,
      [o.thumbMinValue]: r
    })} data-value-prop=${p ?? A} @blur=${this.onThumbBlur} @focus=${this.onThumbFocus} @pointerdown=${this.onThumbPointerDown} role=slider style=${M(u)} tabindex=0 ${R(r ? this.minHandleRef : this.maxHandleRef)}>${T}</div>`);
  }
  renderGraph() {
    return this.histogram ? V`<calcite-graph class=${f(o.graph)} .colorStops=${this.histogramStops} .data=${this.histogram} .highlightMax=${b(this.value) ? this.maxValue : this.value} .highlightMin=${b(this.value) ? this.minValue : this.min} .max=${this.max} .min=${this.min}></calcite-graph>` : null;
  }
  renderTickLabel(e) {
    const { hasHistogram: t, labelHandles: i, labelTicks: a, max: s, min: l, precise: n, value: h } = this, r = b(h), c = e === l, m = e === s, p = c || m;
    if (!(a && (!t && (p || !n || !r) || t && (p || !n && !i))))
      return null;
    const y = {
      [o.tickLabel]: !0,
      [o.tickMin]: c,
      [o.tickMax]: m
    }, d = this.internalLabelFormatter(e, "tick");
    return c ? V`<span class=${f(y)} ${R(this.minTickLabelRef)}>${d}</span>` : m ? V`<span class=${f(y)} ${R(this.maxTickLabelRef)}>${d}</span>` : V`<span class=${f(y)}>${d}</span>`;
  }
}
X("calcite-slider", le);
export {
  le as Slider
};
