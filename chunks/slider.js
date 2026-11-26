/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as B, L as X, c as z, H as I, z as U, s as x, q as M, b as y, A as S, d as q } from "./index.js";
import { i as j } from "./keyed.js";
import { e as L, n as _ } from "./ref.js";
import { u as N } from "./index2.js";
import { g as G } from "./guid.js";
import { L as $, j as w, F as P } from "./dom.js";
import { I as W } from "./InternalLabel.js";
import { V as K } from "./Validation.js";
import { i as J } from "./key.js";
import { g as Q } from "./label.js";
import { u as Y } from "./useLabel.js";
import { n as H, B as Z } from "./locale.js";
import { d as D, c as ee } from "./math.js";
import { u as te } from "./useT9n.js";
import { u as ae } from "./useFocusable.js";
import { u as ie } from "./useInteractive.js";
import { u as se } from "./useForm.js";
import { i as F } from "./isEqual.js";
import { c as le } from "./observers.js";
const c = {
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
  tickEndAligned: "tick--end-aligned",
  tickLabel: "tick__label",
  tickLabelCovered: "tick__label--covered",
  tickLabelLeft: "tick__label--left",
  tickLabelRight: "tick__label--right",
  tickLabelVisible: "tick__label--visible",
  tickMax: "tick__label--max",
  tickMin: "tick__label--min",
  ticks: "ticks",
  track: "track",
  trackRange: "track__range",
  transformed: "transformed",
  scale: (V) => `scale--${V}`
}, ne = "calcite-slider", C = {
  validationMessage: "validationMessage",
  host: (V) => `${ne}-${V}`
}, re = 250, oe = B`@charset "UTF-8";:host([disabled]){opacity:var(--calcite-opacity-disabled);cursor:default;-webkit-user-select:none;user-select:none}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}.scale--s{--calcite-slider-handle-size: var(--calcite-size-4xs);--calcite-slider-handle-extension-height: .4rem;--calcite-slider-container-font-size: var(--calcite-font-size-relative-xs)}.scale--s .handle__label,.scale--s .tick__label{line-height:.75rem}.scale--m{--calcite-slider-handle-size: var(--calcite-size-2xs);--calcite-slider-handle-extension-height: .5rem;--calcite-slider-container-font-size: var(--calcite-font-size-relative-sm)}.scale--m .handle__label,.scale--m .tick__label{line-height:1rem}.scale--l{--calcite-slider-handle-size: 1rem;--calcite-slider-handle-extension-height: .65rem;--calcite-slider-container-font-size: var(--calcite-font-size-relative-base)}.scale--l .handle__label,.scale--l .tick__label{line-height:1rem}.handle__label,.tick__label{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-slider-text-color, var(--calcite-color-text-2));font-size:var(--calcite-slider-container-font-size)}:host{display:block;inline-size:100%;min-inline-size:0}:host .validation-container{padding-block-start:0!important}.container{position:relative;display:block;overflow-wrap:normal;word-break:normal;padding-inline:calc(var(--calcite-slider-handle-size) * .5);padding-block:calc(var(--calcite-slider-handle-size) * .5);margin-block:calc(var(--calcite-slider-handle-size) * .5);margin-inline:0;--calcite-slider-full-handle-height: calc( var(--calcite-slider-handle-size) + var(--calcite-slider-handle-extension-height) );touch-action:none;-webkit-user-select:none;user-select:none}:host([disabled]) .track__range,:host([disabled]) .tick--active{background-color:var(--calcite-color-text-3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:var(--calcite-opacity-full)}.interaction-container{display:contents}.scale--s .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -.375rem}.scale--m .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -.5rem}.scale--l .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -.55rem}:host([precise]:not([has-histogram])) .container .thumb--value{--calcite-slider-thumb-y-offset: calc(var(--calcite-slider-full-handle-height) * -1)}.thumb-container{position:relative;max-inline-size:100%}.thumb{--calcite-slider-thumb-x-offset: calc(var(--calcite-slider-handle-size) * .5);outline:var(--calcite-border-width-md) solid transparent;outline-offset:var(--calcite-border-width-md);font-family:inherit;position:absolute;margin:var(--calcite-space-none);display:flex;cursor:pointer;flex-direction:column;align-items:center;border-style:none;background-color:var(--calcite-color-transparent);padding:var(--calcite-space-none);transform:translate(var(--calcite-slider-thumb-x-offset),var(--calcite-slider-thumb-y-offset))}.thumb .handle__label{white-space:nowrap}.thumb .handle__label.static,.thumb .handle__label.transformed{position:absolute;inset-block:var(--calcite-space-none);opacity:0}.thumb .handle__label.hyphen:after{content:"—";display:inline-block;inline-size:1em}.thumb .handle__label.hyphen--wrap{display:flex}.thumb .handle{outline-color:var(--calcite-color-transparent);box-sizing:border-box;border-radius:var(--calcite-corner-radius-pill);background-color:var(--calcite-slider-handle-fill-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));block-size:var(--calcite-slider-handle-size);inline-size:var(--calcite-slider-handle-size);box-shadow:0 0 0 2px var(--calcite-color-text-3) inset;transition:border var(--calcite-internal-animation-timing-medium) ease,background-color var(--calcite-internal-animation-timing-medium) ease,box-shadow var(--calcite-animation-timing) ease}.thumb .handle-extension{inline-size:.125rem;block-size:var(--calcite-slider-handle-extension-height);background-color:var(--calcite-slider-handle-extension-color, var(--calcite-color-text-3))}.thumb:hover .handle{box-shadow:0 0 0 3px var(--calcite-color-brand) inset}.thumb:hover .handle-extension{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand))}.thumb:focus .handle{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}.thumb:focus .handle-extension{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand))}.thumb.thumb--minValue{transform:translate(calc(var(--calcite-slider-thumb-x-offset) * -1),var(--calcite-slider-thumb-y-offset))}.thumb.thumb--precise{--calcite-slider-thumb-y-offset: -.125rem}:host([label-handles]) .thumb{--calcite-slider-thumb-x-offset: 50%}:host([label-handles]):host(:not([has-histogram])) .scale--s .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -1.4375rem}:host([label-handles]):host(:not([has-histogram])) .scale--m .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -1.875rem}:host([label-handles]):host(:not([has-histogram])) .scale--l .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset: -2rem}:host([has-histogram][label-handles]) .handle__label,:host([label-handles]:not([has-histogram])) .thumb--minValue.thumb--precise .handle__label{margin-block-start:.5em}:host(:not([has-histogram]):not([precise])) .handle__label,:host([label-handles]:not([has-histogram])) .thumb--value .handle__label{margin-block-end:.5em}:host([label-handles][precise]):host(:not([has-histogram])) .scale--s .thumb--value{--calcite-slider-thumb-y-offset: -2.075rem}:host([label-handles][precise]):host(:not([has-histogram])) .scale--m .thumb--value{--calcite-slider-thumb-y-offset: -2.75rem}:host([label-handles][precise]):host(:not([has-histogram])) .scale--l .thumb--value{--calcite-slider-thumb-y-offset: -3.0625rem}.thumb:focus .handle,.thumb--active .handle{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand));box-shadow:0 0 8px #00000029}.thumb:hover.thumb--precise:after,.thumb:focus.thumb--precise:after,.thumb--active.thumb--precise:after{background-color:var(--calcite-slider-accent-color, var(--calcite-color-brand))}.track{position:relative;block-size:.125rem;background-color:var(--calcite-slider-track-color, var(--calcite-color-border-2));transition:all var(--calcite-internal-animation-timing-medium) ease-in;border-radius:var(--calcite-corner-radius)}.track__range{position:absolute;inset-block-start:var(--calcite-space-none);block-size:.125rem;background-color:var(--calcite-slider-track-fill-color, var(--calcite-color-brand));border-radius:var(--calcite-corner-radius)}.container--range .track__range:hover{cursor:ew-resize}.container--range .track__range:after{position:absolute;inline-size:100%;content:"";inset-block-start:calc(var(--calcite-slider-full-handle-height) * .5 * -1);block-size:calc(var(--calcite-slider-handle-size) + var(--calcite-slider-handle-extension-height))}@media(forced-colors:active){.thumb{outline-width:0;outline-offset:0}.handle{outline:var(--calcite-border-width-md) solid transparent;outline-offset:var(--calcite-border-width-md)}.thumb:focus .handle,.thumb .handle-extension,.thumb:hover .handle-extension,.thumb:focus .handle-extension,.thumb:active .handle-extension{background-color:canvasText}.track{background-color:canvasText}.track__range{background-color:highlight}}.tick{position:absolute;block-size:var(--calcite-space-2xs);inline-size:.125rem;border-width:var(--calcite-border-width-sm);border-style:solid;background-color:var(--calcite-slider-tick-color, var(--calcite-color-border-input));border-color:var(--calcite-slider-tick-border-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1)));inset-block-start:-2px;pointer-events:none;margin-inline-start:calc(var(--calcite-space-2xs) * -.5)}.tick--end-aligned{margin-inline-start:var(--calcite-space-none);margin-inline-end:calc(var(--calcite-space-2xs) * -.5)}.tick--active{background-color:var(--calcite-slider-tick-selected-color, var(--calcite-color-brand))}.tick__label{pointer-events:none;margin-block-start:var(--calcite-space-md-plus);display:flex;justify-content:center;visibility:hidden}.tick__label--visible{visibility:visible}.tick__label--covered{opacity:0}.tick__label--min{transition:opacity var(--calcite-animation-timing)}.tick__label--min,.tick__label--max{position:absolute;inset-block-start:calc(var(--calcite-space-px) * -1);inline-size:max-content}.tick__label--left{transform:translate(-.25ch);left:0}.tick__label--right{transform:translate(.25ch);right:0}.tick__label--max{transition:opacity var(--calcite-internal-animation-timing-fast)}:host([has-histogram][label-handles]) .tick__label--min,:host([has-histogram][label-handles]) .tick__label--max,:host([has-histogram][precise]) .tick__label--min,:host([has-histogram][precise]) .tick__label--max{color:var(--calcite-color-text-3);font-weight:var(--calcite-theme-font-weight-regular, var(--calcite-font-weight-normal))}.graph{color:var(--calcite-slider-graph-color, var(--calcite-theme-color-surface-4, var(--calcite-color-foreground-3)));block-size:48px}:host([label-ticks][ticks]) .container{padding-block-end:calc(var(--calcite-space-md-plus) + var(--calcite-slider-container-font-size))}:host([has-histogram]):host([precise][label-handles]) .container{padding-block-end:calc(var(--calcite-slider-full-handle-height) + 1em)}:host([has-histogram]):host([label-handles]:not([precise])) .container{padding-block-end:calc(var(--calcite-slider-handle-size) * .5 + 1em)}:host([has-histogram]):host([precise]:not([label-handles])) .container{padding-block-end:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([precise]:not([label-handles])) .container{padding-block-start:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([precise]:not([label-handles])) .container--range{padding-block-end:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([label-handles]:not([precise])) .container{padding-block-start:calc(var(--calcite-slider-full-handle-height) + 4px)}:host(:not([has-histogram])):host([label-handles][precise]) .container{padding-block-start:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px)}:host(:not([has-histogram])):host([label-handles][precise]) .container--range{padding-block-end:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px)}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-theme-space-base, var(--calcite-spacing-base))}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-2xs, var(--calcite-spacing-xxs))}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size-relative-sm)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size-relative-base)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-theme-space-sm, var(--calcite-spacing-sm))}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-theme-space-md, var(--calcite-spacing-md))}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-relative-md)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}:host([hidden]){display:none}[hidden]{display:none}`;
function ce(V, e = !1) {
  const t = V.find((i) => i.edge === "min"), s = V.find((i) => i.edge === "max"), a = [];
  t && a.push(t), s && (!t || !$(t, s) || e) && a.push(s);
  const n = V.filter((i) => !i.edge && !a.some((r) => $(i, r))).sort((i, r) => i.right - r.right || i.value - r.value), l = [];
  for (const i of n) {
    const r = l.at(-1);
    (!r || !$(r, i)) && l.push(i);
  }
  if (l.length === n.length)
    return new Set([...a, ...l].map((i) => i.value));
  l.push(...a), l.sort((i, r) => i.value - r.value);
  for (let i = 0; i < l.length; i++) {
    const r = l[i];
    if (r.edge)
      continue;
    const o = l[i - 1], h = l[i + 1], m = o?.position ?? 0, g = h?.position ?? 1, f = (d) => (d.position - m) ** 2 + (g - d.position) ** 2;
    let k = r;
    for (const d of n) {
      if (d.position <= m || d.position >= g || o && $(o, d) || h && $(h, d))
        continue;
      const u = f(d), b = f(k);
      (u < b || u === b && d.value < k.value) && (k = d);
    }
    l[i] = k;
  }
  return new Set(l.map((i) => i.value));
}
function p(V) {
  return Array.isArray(V);
}
const E = 0, he = "‎";
class de extends X {
  constructor() {
    super(), this.direction = N(), this.dragEnd = (e) => {
      this.disabled || (this.removeDragListeners(), this.focusActiveHandle(e.clientX), this.dragProp && !F(this.lastDragPropValue, this.getDragPropValue(this.dragProp)) && this.emitChange(), this.dragProp = void 0, this.lastDragPropValue = void 0, this.minValueDragRange = void 0, this.maxValueDragRange = void 0, this.minMaxValueRange = void 0);
    }, this.dragUpdate = (e) => {
      if (!(this.disabled || !this.trackRef.value) && (e.preventDefault(), this.dragProp)) {
        const t = this.mapToRange(e.clientX || e.pageX);
        if (p(this.value) && this.dragProp === "minMaxValue")
          if (this.minValueDragRange && this.maxValueDragRange && this.minMaxValueRange) {
            const s = t - this.minValueDragRange, a = t + this.maxValueDragRange;
            a <= this.max && s >= this.min && a - s === this.minMaxValueRange && this.setValue({
              minValue: this.clamp(s, "minValue"),
              maxValue: this.clamp(a, "maxValue")
            });
          } else
            this.minValueDragRange = t - this.minValue, this.maxValueDragRange = this.maxValue - t, this.minMaxValueRange = this.maxValue - this.minValue;
        else if (p(this.value) && this.previousEmittedValue !== void 0 && p(this.previousEmittedValue) && this.dragProp === "maxValue") {
          const [s, a] = this.previousEmittedValue;
          s === a && t < s ? (this.dragProp = "minValue", this.minHandleRef.value.focus()) : this.setValue({
            [this.dragProp]: this.clamp(t, this.dragProp)
          });
        } else
          this.setValue({
            [this.dragProp]: this.clamp(t, this.dragProp)
          });
      }
    }, this.formatValue = (e) => {
      H.numberFormatOptions = {
        locale: this.messages._lang,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator
      };
      const t = H.localize(e.toString(), !0);
      return this.direction === "rtl" && t.startsWith(H.minusSign) ? `${he}${t}` : t;
    }, this.formSupport = se({
      inputType: "range"
    })(this), this.guid = C.host(G()), this.maxHandleRef = L(), this.maxValueLabelRefs = {
      label: L(),
      static: L(),
      transformed: L()
    }, this.maxTickLabelRef = L(), this.messages = te({ blocking: !0 }), this.minHandleRef = L(), this.minValueLabelRefs = {
      label: L(),
      static: L(),
      transformed: L()
    }, this.minTickLabelRef = L(), this.pointerUpDragEnd = (e) => {
      this.disabled || !w(e) || this.dragEnd(e);
    }, this.coveredTickLabels = /* @__PURE__ */ new Set(), this.tickLabelRefs = /* @__PURE__ */ new Map(), this.tickLabelText = /* @__PURE__ */ new Map(), this.invalidateTickLabelLayout = () => {
      this.tickLabelLayout = void 0, this.scheduleTickLabelLayout();
    }, this.tickLabelResizeObserver = le("resize", this.invalidateTickLabelLayout), this.trackRef = L(), this.focusSetter = ae()(this).setFocus, this.interactiveContainer = ie(this), this._value = E, this.activeProp = "value", this.tickValues = [], this.disabled = !1, this.fillPlacement = "start", this.groupSeparator = !1, this.hasHistogram = !1, this.labelHandles = !1, this.labelTicks = !1, this.max = 100, this.min = 0, this.mirrored = !1, this.precise = !1, this.required = !1, this.scale = "m", this.snap = !1, this.status = "idle", this.step = 1, this.calciteSliderChange = z({ cancelable: !1 }), this.calciteSliderInput = z({ cancelable: !1 }), Y(this), this.listen("pointerdown", this.pointerDownHandler), this.listen("keydown", this.handleKeyDown), this.listen("touchstart", this.handleTouchStart);
  }
  static {
    this.properties = { activeProp: 16, maxValueDragRange: 16, minMaxValueRange: 16, minValueDragRange: 16, tickValues: 16, disabled: 7, fillPlacement: 3, form: 3, groupSeparator: 7, hasHistogram: 7, histogram: 0, histogramStops: 0, label: 1, labelFormatter: 0, labelHandles: 7, labelTicks: 7, max: 11, maxLabel: 1, maxValue: 9, min: 11, minLabel: 1, labelText: 1, messageOverrides: 0, minValue: 9, mirrored: 7, name: 3, numberingSystem: 1, pageStep: 11, precise: 7, required: 7, scale: 3, snap: 7, status: 3, step: 11, ticks: 11, validationIcon: [3, { converter: I }], validationMessage: 1, validity: 32, value: 11 };
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.shadowRootOptions = {
      mode: "open",
      delegatesFocus: !0
    };
  }
  static {
    this.styles = oe;
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
    this._value = Array.isArray(this._value) ? [this.minValue, this.maxValue] : E;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.minHandleRef.value || this.maxHandleRef.value, e);
  }
  connectedCallback() {
    super.connectedCallback(), this.setMinMaxFromValue(), this.setValueFromMinMax(), this.previousEmittedValue = this.value, this.tickLabelResizeObserver?.observe(this.el);
  }
  load() {
    this.setInitialValue();
  }
  willUpdate(e) {
    e.has("histogram") && (this.hasHistogram = !!this.histogram), (e.has("ticks") || e.has("min") || e.has("max")) && (this.tickValues = this.generateTickValues(), this.tickLabelRefs.clear()), (e.has("ticks") || e.has("min") || e.has("max") || e.has("scale") || e.has("mirrored") || e.has("hasHistogram") || e.has("labelTicks") || e.has("labelHandles") || e.has("precise") || e.has("groupSeparator") || e.has("numberingSystem") || e.has("value") && Array.isArray(e.get("value")) !== p(this.value)) && (this.tickLabelText.clear(), this.invalidateTickLabelLayout()), e.has("value") && (this.hasUpdated || this.value !== 0) && this.setMinMaxFromValue(), (e.has("minValue") || e.has("maxValue")) && this.setValueFromMinMax();
  }
  updated() {
    this.isConnected && (this.labelHandles && (this.adjustHostObscuredHandleLabel("value"), p(this.value) && (this.adjustHostObscuredHandleLabel("minValue"), this.precise && !this.hasHistogram || this.hyphenateCollidingRangeHandleLabels())), this.hideCoveredBoundingTickLabels(), this.tickLabelLayout && this.tickLabelLayout.direction !== this.direction && this.invalidateTickLabelLayout(), this.tickLabelLayout?.visibleValues || this.scheduleTickLabelLayout());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeDragListeners(), this.tickLabelResizeObserver?.disconnect(), this.tickLabelLayoutFrame !== void 0 && (cancelAnimationFrame(this.tickLabelLayoutFrame), this.tickLabelLayoutFrame = void 0), this.tickLabelLayout = void 0;
  }
  setInitialValue() {
    p(this.value) || (this.value = this.snap ? this.getClosestStep(this.value) : this.clamp(this.value));
  }
  handleKeyDown(e) {
    const t = this.shouldMirror(), { activeProp: s, max: a, min: n, pageStep: l, step: i } = this, r = this[s], { key: o } = e;
    if (J(o)) {
      e.preventDefault();
      return;
    }
    let h = NaN;
    if (o === "ArrowUp" || o === "ArrowRight" ? h = r + i * (t && o === "ArrowRight" ? -1 : 1) : o === "ArrowDown" || o === "ArrowLeft" ? h = r - i * (t && o === "ArrowLeft" ? -1 : 1) : o === "PageUp" ? l && (h = r + l) : o === "PageDown" ? l && (h = r - l) : o === "Home" ? h = n : o === "End" && (h = a), isNaN(h))
      return;
    e.preventDefault();
    const m = Number(h.toFixed(D(i)));
    this.setValue({
      [s]: this.clamp(m, s)
    });
  }
  pointerDownHandler(e) {
    if (this.disabled || !w(e))
      return;
    const t = e.clientX || e.pageX, s = this.mapToRange(t);
    let a = "value";
    p(this.value) && (s >= this.minValue && s <= this.maxValue && this.lastDragProp === "minMaxValue" ? a = "minMaxValue" : a = Math.abs(this.maxValue - s) < Math.abs(this.minValue - s) || s >= this.maxValue ? "maxValue" : "minValue"), this.lastDragPropValue = this.getDragPropValue(a), this.dragStart(a);
    const n = e.composedPath();
    [this.minHandleRef.value, this.maxHandleRef.value].some((i) => i && n.includes(i)) || this.setValue({ [a]: this.clamp(s, a) }), this.focusActiveHandle(t);
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
    p(e) && (this.minValue = e[0], this.maxValue = e[1]);
  }
  onLabelClick() {
    this.setFocus();
  }
  shouldMirror() {
    return this.mirrored && !this.hasHistogram;
  }
  shouldUseMinValue() {
    return p(this.value) ? this.hasHistogram && this.maxValue === 0 || !this.hasHistogram && this.minValue === 0 : !1;
  }
  getTickDensity() {
    const e = (this.max - this.min) / this.ticks / re;
    return e < 1 ? 1 : e;
  }
  generateTickValues() {
    const e = this.ticks ?? 0;
    if (e <= 0)
      return [];
    const t = [this.min], s = this.getTickDensity(), a = e * s;
    let n = this.min;
    for (; n < this.max; )
      n += a, t.push(Math.min(n, this.max));
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
    w(e) && this.dragStart(t);
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
      const n = e[a];
      n !== void 0 && (t || (t = this[a] !== n), this[a] = n);
    }), !t)
      return;
    (e.minValue || e.maxValue) && this.setValueFromMinMax();
    const s = this.dragProp;
    this.calciteSliderInput.emit(), s || this.emitChange();
  }
  clamp(e, t) {
    return e = ee(e, this.min, this.max), t === "maxValue" && (e = Math.max(e, this.minValue)), t === "minValue" && (e = Math.min(e, this.maxValue)), e;
  }
  mapToRange(e) {
    const t = this.max - this.min, { left: s, width: a } = this.trackRef.value.getBoundingClientRect() || {
      left: 0,
      width: 0
    }, n = (e - s) / a, l = this.shouldMirror(), i = this.clamp(this.min + t * (l ? 1 - n : n)), r = Number(i.toFixed(D(this.step)));
    return this.snap && this.step ? this.getClosestStep(r) : r;
  }
  getClosestStep(e) {
    const { max: t, min: s, step: a } = this, n = new Z(`${Math.floor((e - s) / a)}`).multiply(`${a}`).add(`${s}`).toString();
    let l = this.clamp(Number(n));
    return l > t && (l -= a), l;
  }
  getClosestHandle(e) {
    const t = this.minHandleRef.value, s = this.maxHandleRef.value;
    return this.getDistanceX(s, e) > this.getDistanceX(t, e) ? t : s;
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
    const t = e === "minValue" ? this.minValueLabelRefs : this.maxValueLabelRefs, s = t.label.value, a = t.static.value, n = t.transformed.value, l = a.getBoundingClientRect(), i = this.getHostOffset(l.left, l.right);
    s.style.transform = `translateX(${i}px)`, n.style.transform = `translateX(${i}px)`;
  }
  hyphenateCollidingRangeHandleLabels() {
    const e = this.shouldMirror(), t = e ? this.maxValueLabelRefs : this.minValueLabelRefs, s = e ? this.minValueLabelRefs : this.maxValueLabelRefs, a = t.label.value, n = t.static.value, l = t.transformed.value, i = this.getHostOffset(n.getBoundingClientRect().left, n.getBoundingClientRect().right), r = s.label.value, o = s.static.value, h = s.transformed.value, m = this.getHostOffset(o.getBoundingClientRect().left, o.getBoundingClientRect().right), g = this.getFontSizeForElement(a), f = this.getRangeLabelOverlap(l, h), k = a, d = g / 2;
    if (f > 0) {
      if (k.classList.add(c.hyphen, c.hyphenWrap), m === 0 && i === 0) {
        let u = f / 2 - d;
        u = Math.sign(u) === -1 ? Math.abs(u) : -u;
        const b = this.getHostOffset(l.getBoundingClientRect().left + u - d, l.getBoundingClientRect().right + u - d);
        let v = f / 2;
        const R = this.getHostOffset(h.getBoundingClientRect().left + v, h.getBoundingClientRect().right + v);
        b !== 0 && (u += b, v += b), R !== 0 && (u += R, v += R), a.style.transform = `translateX(${u}px)`, l.style.transform = `translateX(${u - d}px)`, r.style.transform = `translateX(${v}px)`, h.style.transform = `translateX(${v}px)`;
      } else if (i > 0 || m > 0)
        a.style.transform = `translateX(${i + d}px)`, r.style.transform = `translateX(${f + m}px)`, h.style.transform = `translateX(${f + m}px)`;
      else if (i < 0 || m < 0) {
        let u = Math.abs(i) + f - d;
        u = Math.sign(u) === -1 ? Math.abs(u) : -u, a.style.transform = `translateX(${u}px)`, l.style.transform = `translateX(${u - d}px)`;
      }
    } else
      k.classList.remove(c.hyphen, c.hyphenWrap), a.style.transform = `translateX(${i}px)`, l.style.transform = `translateX(${i}px)`, r.style.transform = `translateX(${m}px)`, h.style.transform = `translateX(${m}px)`;
  }
  hideCoveredBoundingTickLabels() {
    const e = p(this.value), t = this.hasHistogram ? this.precise || this.labelHandles : e && this.precise, s = this.minHandleRef.value, a = this.maxHandleRef.value, n = this.minTickLabelRef.value, l = this.maxTickLabelRef.value, i = /* @__PURE__ */ new Set();
    t && a && n && l && ((s && this.isMinTickLabelObscured(n, s) || this.isMinTickLabelObscured(n, a)) && i.add(this.min), (s && this.isMaxTickLabelObscured(l, s) || (!s || this.hasHistogram) && this.isMaxTickLabelObscured(l, a)) && i.add(this.max)), n && l && (n.classList.toggle(c.tickLabelCovered, i.has(this.min)), l.classList.toggle(c.tickLabelCovered, i.has(this.max))), F(this.coveredTickLabels, i) || (this.coveredTickLabels = i, this.tickLabelLayout && (this.tickLabelLayout.visibleValues = void 0));
  }
  scheduleTickLabelLayout() {
    !this.isConnected || !this.labelTicks || !this.ticks || this.tickLabelLayoutFrame !== void 0 || (this.tickLabelLayoutFrame = requestAnimationFrame(() => {
      this.tickLabelLayoutFrame = void 0, this.updateTickLabelVisibility();
    }));
  }
  updateTickLabelVisibility() {
    const e = this.trackRef.value;
    if (!this.isConnected || !this.labelTicks || !this.ticks || !e)
      return;
    if (!this.tickLabelLayout) {
      const a = e.getBoundingClientRect();
      if (!a.width)
        return;
      const n = document.createRange(), l = [], i = this.shouldMirror();
      for (const [r, o] of this.tickLabelRefs) {
        const h = o.value;
        if (!h)
          continue;
        if (!h.textContent?.trim()) {
          l.push({ element: h });
          continue;
        }
        n.selectNodeContents(h);
        const m = n.getBoundingClientRect();
        l.push({
          element: h,
          measurement: {
            value: r,
            position: this.max === this.min ? 0 : (r - this.min) / (this.max - this.min),
            left: i ? a.right - m.right : m.left - a.left,
            right: i ? a.right - m.left : m.right - a.left,
            edge: r === this.min ? "min" : r === this.max ? "max" : void 0
          }
        });
      }
      this.tickLabelLayout = { direction: this.direction, labels: l };
    }
    if (this.hideCoveredBoundingTickLabels(), this.tickLabelLayout.visibleValues)
      return;
    const { labels: t } = this.tickLabelLayout, s = ce(t.flatMap(({ measurement: a }) => a && !this.coveredTickLabels.has(a.value) ? [a] : []));
    for (const { element: a, measurement: n } of t) {
      const l = !!n && s.has(n.value);
      a.classList.contains(c.tickLabelVisible) !== l && a.classList.toggle(c.tickLabelVisible, l);
    }
    this.tickLabelLayout.visibleValues = s;
  }
  getHostOffset(e, t) {
    const { left: s, right: a } = this.el.getBoundingClientRect();
    return e < s ? s - e : t > a ? -(t - a) : 0;
  }
  getRangeLabelOverlap(e, t) {
    const s = e.getBoundingClientRect(), a = t.getBoundingClientRect(), n = this.getFontSizeForElement(e), l = s.right + n - a.left;
    return Math.max(l, 0);
  }
  isMinTickLabelObscured(e, t) {
    const s = e.getBoundingClientRect(), a = t.getBoundingClientRect();
    return P(s, a);
  }
  isMaxTickLabelObscured(e, t) {
    const s = e.getBoundingClientRect(), a = t.getBoundingClientRect();
    return P(s, a);
  }
  internalLabelFormatter(e, t) {
    const s = this.labelFormatter;
    if (!s)
      return this.formatValue(e);
    const a = s(e, t, this.formatValue);
    return a ?? this.formatValue(e);
  }
  render() {
    const e = this.el.id || this.guid, t = p(this.value) ? this.maxValue : this.value, s = this.minValue || this.min, a = this.shouldUseMinValue(), n = this.getUnitInterval(a ? this.minValue : s) * 100, l = this.getUnitInterval(t) * 100, i = this.shouldMirror(), r = p(this.value), o = Q(this), h = r && !!o, m = this.buildThumbType("max"), g = this.renderThumb({
      type: m,
      thumbPlacement: m.includes("histogram") ? "below" : "above",
      labelFallback: o,
      maxInterval: l,
      minInterval: n,
      mirror: i
    }), f = this.buildThumbType("min"), k = r ? this.renderThumb({
      type: f,
      thumbPlacement: f.includes("histogram") || f.includes("precise") ? "below" : "above",
      labelFallback: o,
      maxInterval: l,
      minInterval: n,
      mirror: i
    }) : null, d = r ? "start" : this.fillPlacement, u = d === "none" ? {
      left: "unset",
      right: "unset"
    } : d === "end" ? {
      left: `${i ? n : l}%`,
      right: `${i ? l : n}%`
    } : (
      /* default */
      {
        left: `${i ? 100 - l : n}%`,
        right: `${i ? n : 100 - l}%`
      }
    );
    return U(this.el, "id", e), this.interactiveContainer({ disabled: this.disabled, children: y`${this.labelText && W({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div aria-errormessage=${C.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${o} .ariaRequired=${this.required} class=${x({
      [c.container]: !0,
      [c.containerRange]: r,
      [c.scale(this.scale)]: !0
    })} .role=${h ? "group" : void 0}>${this.renderGraph()}<div class=${x(c.track)} ${_(this.trackRef)}><div class=${x(c.trackRange)} @pointerdown=${this.onTrackPointerDown} style=${M(u)}></div><div class=${x(c.ticks)}>${this.tickValues.map((b) => {
      const v = `${this.getUnitInterval(b) * 100}%`, R = b === this.min || b === this.max;
      let T = !1;
      if (d === "start" || d === "end")
        if (a)
          T = b >= this.minValue && b <= this.maxValue;
        else {
          const A = d === "start" ? s : t, O = d === "start" ? t : this.max;
          T = b >= A && b <= O;
        }
      return y`<span class=${x({
        [c.tick]: !0,
        [c.tickActive]: T,
        [c.tickEndAligned]: i !== (this.direction === "rtl")
      })} style=${M({
        left: i ? "" : v,
        right: i ? v : ""
      })}>${!R && this.renderTickLabel(b) || ""}</span>${R && this.renderTickLabel(b) || ""}`;
    })}</div></div><div class=${x(c.thumbContainer)}>${k}${g}</div></div>${this.validationMessage && this.status === "invalid" ? K({ icon: this.validationIcon, id: C.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
  renderThumb({ type: e, mirror: t, thumbPlacement: s, minInterval: a, maxInterval: n, labelFallback: l }) {
    const i = e.includes("labeled"), r = e.includes("precise"), o = e.includes("min"), h = p(this.value), m = o ? this.minValue : h ? this.maxValue : this.value, g = o ? "minValue" : h ? "maxValue" : "value", f = o ? this.minLabel || l : h ? this.maxLabel || l : this.minLabel || l, k = o ? this.minValue : m, d = g === "minValue" ? this.internalLabelFormatter(this.minValue, "min") : g === "maxValue" ? this.internalLabelFormatter(this.maxValue, "max") : this.internalLabelFormatter(m, "value"), u = o ? { left: `${t ? 100 - a : a}%` } : { right: `${t ? n : 100 - n}%` }, b = `${c.handleLabel} ${o ? c.handleLabelMinValue : c.handleLabelValue}`, v = o ? this.minValueLabelRefs : this.maxValueLabelRefs, T = [
      ...i ? [
        y`<span aria-hidden=true class=${x(b)} ${_(v.label)}>${d}</span>`,
        y`<span aria-hidden=true class=${`${b} ${c.static}`} ${_(v.static)}>${d}</span>`,
        y`<span aria-hidden=true class=${`${b} ${c.transformed}`} ${_(v.transformed)}>${d}</span>`
      ] : [],
      y`<div class=${x(c.handle)}></div>`,
      r && y`<div class=${x(c.handleExtension)}></div>` || ""
    ];
    return s === "below" && T.reverse(), j(e, y`<div .ariaLabel=${f} aria-orientation=horizontal .ariaValueMax=${this.max} .ariaValueMin=${this.min} .ariaValueNow=${k} class=${x({
      [c.thumb]: !0,
      [c.thumbValue]: !o,
      [c.thumbActive]: this.lastDragProp !== "minMaxValue" && this.dragProp === g,
      [c.thumbPrecise]: r,
      [c.thumbMinValue]: o
    })} data-value-prop=${g ?? S} @blur=${this.onThumbBlur} @focus=${this.onThumbFocus} @pointerdown=${this.onThumbPointerDown} role=slider style=${M(u)} tabindex=0 ${_(o ? this.minHandleRef : this.maxHandleRef)}>${T}</div>`);
  }
  renderGraph() {
    return this.histogram ? y`<calcite-graph class=${x(c.graph)} .colorStops=${this.histogramStops} .data=${this.histogram} .highlightMax=${p(this.value) ? this.maxValue : this.value} .highlightMin=${p(this.value) ? this.minValue : this.min} .max=${this.max} .min=${this.min}></calcite-graph>` : null;
  }
  renderTickLabel(e) {
    const { hasHistogram: t, labelHandles: s, labelTicks: a, max: n, min: l, precise: i, value: r } = this, o = p(r), h = e === l, m = e === n, g = h || m, f = h !== this.shouldMirror();
    if (!(a && (!t && (g || !i || !o) || t && (g || !i && !s))))
      return null;
    const d = {
      [c.tickLabel]: !0,
      [c.tickMin]: h,
      [c.tickMax]: m,
      [c.tickLabelCovered]: this.coveredTickLabels.has(e),
      [c.tickLabelLeft]: g && f,
      [c.tickLabelRight]: g && !f
    }, u = this.internalLabelFormatter(e, "tick");
    this.tickLabelText.get(e) !== u && (this.tickLabelText.set(e, u), this.tickLabelLayout = void 0);
    let b = this.tickLabelRefs.get(e);
    return b || (b = h ? this.minTickLabelRef : m ? this.maxTickLabelRef : L(), this.tickLabelRefs.set(e, b)), y`<span class=${x(d)} data-tick=${e ?? S} ${_(b)}>${u}</span>`;
  }
}
q("calcite-slider", de);
export {
  de as Slider
};
