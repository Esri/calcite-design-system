import { d as z, L as C, s as h, n as u, x as b, h as T } from "./iframe.js";
import { i as L } from "./keyed.js";
import { e as p, n as m } from "./ref.js";
import { c as M, a as V, d as S } from "./form.js";
import { g as F, n as P } from "./locale.js";
import { D as R } from "./dom.js";
import { c as H } from "./observers.js";
import { u as O } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
const s = {
  container: "container",
  fill: "fill",
  stepLine: "step-line",
  label: "label",
  labelHidden: "label-hidden",
  labelRange: "label-range",
  labelValue: "label-value",
  unitLabel: "unit-label",
  stepsVisible: "steps-visible",
  valueVisible: "value-visible",
  success: "fill-success",
  warning: "fill-warning",
  danger: "fill-danger"
}, I = z`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host{display:flex;--calcite-meter-space-internal: .125rem;--calcite-meter-height-internal: 1rem;--calcite-meter-font-size-internal: var(--calcite-font-size--1)}:host([scale=s]){--calcite-meter-height-internal: .75rem;--calcite-meter-font-size-internal: var(--calcite-font-size--2)}:host([scale=l]){--calcite-meter-height-internal: 1.5rem;--calcite-meter-font-size-internal: var(--calcite-font-size-0)}.container{position:relative;margin:0;display:flex;inline-size:100%;align-items:center;block-size:var(--calcite-meter-height-internal);background-color:var(--calcite-color-foreground-2);border:1px solid var(--calcite-color-border-3);border-radius:var(--calcite-meter-height-internal)}.solid{border:1px solid var(--calcite-color-foreground-3);background-color:var(--calcite-color-foreground-3)}.outline{background-color:transparent}.value-visible{margin-block-start:1.5rem}.steps-visible{margin-block-end:1.5rem}.step-line{position:absolute;inset-block:0px;display:block;inline-size:var(--calcite-meter-space-internal);background-color:var(--calcite-color-border-3)}.label{position:absolute;font-size:var(--calcite-meter-font-size-internal)}.label-hidden{visibility:hidden;opacity:0}.label-value{inset-block-end:calc(100% + .5em);font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.label-range{color:var(--calcite-color-text-3);inset-block-start:calc(100% + .5em)}.unit-label{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-3)}.label-value .unit-label{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-2)}.fill{position:absolute;z-index:var(--calcite-z-index);display:block;background-color:var(--calcite-color-brand);transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);inset-inline-start:var(--calcite-meter-space-internal);inset-block:var(--calcite-meter-space-internal);border-radius:var(--calcite-meter-height-internal);max-inline-size:calc(100% - var(--calcite-meter-space-internal) * 2);min-inline-size:calc(var(--calcite-meter-height-internal) - var(--calcite-meter-space-internal) * 2);transition-property:inline-size,background-color,box-shadow}.fill-danger{background-color:var(--calcite-color-status-danger)}.fill-success{background-color:var(--calcite-color-status-success)}.fill-warning{background-color:var(--calcite-color-status-warning)}.solid .fill{inset-block:0;inset-inline-start:0;max-inline-size:100%;min-inline-size:calc(var(--calcite-meter-height-internal));box-shadow:0 0 0 1px var(--calcite-color-brand)}.solid .fill-danger{box-shadow:0 0 0 1px var(--calcite-color-status-danger)}.solid .fill-success{box-shadow:0 0 0 1px var(--calcite-color-status-success)}.solid .fill-warning{box-shadow:0 0 0 1px var(--calcite-color-status-warning)}@media (forced-colors: active){.fill,.fill-danger,.fill-success,.fill-warning{background-color:Highlight}}`;
class U extends C {
  constructor() {
    super(...arguments), this.highLabelEl = p(), this.labelFlipMax = 0.8, this.labelFlipProximity = 0.15, this.lowLabelEl = p(), this.maxLabelEl = p(), this.maxPercent = 100, this.messages = O({ name: null }), this.meterContainerEl = p(), this.minLabelEl = p(), this.minPercent = 0, this.resizeObserver = H("resize", () => this.resizeHandler()), this.valueLabelEl = p(), this.appearance = "outline-fill", this.disabled = !1, this.fillType = "range", this.groupSeparator = !1, this.max = 100, this.min = 0, this.rangeLabelType = "percent", this.rangeLabels = !1, this.scale = "m", this.unitLabel = "", this.valueLabel = !1, this.valueLabelType = "percent";
  }
  static {
    this.properties = { currentPercent: 16, highActive: 16, highPercent: 16, lowActive: 16, lowPercent: 16, appearance: 3, disabled: 7, fillType: 3, form: 3, groupSeparator: 7, high: 11, label: 1, low: 11, max: 11, min: 11, name: 3, numberingSystem: 1, rangeLabelType: 3, rangeLabels: 7, scale: 3, unitLabel: 1, value: 9, valueLabel: 7, valueLabelType: 3 };
  }
  static {
    this.styles = I;
  }
  // #endregion
  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback(), M(this), this.resizeObserver?.observe(this.el);
  }
  load() {
    this.calculateValues(), V(this, this.value);
  }
  willUpdate(e) {
    (e.has("min") && (this.hasUpdated || this.min !== 0) || e.has("max") && (this.hasUpdated || this.max !== 100) || e.has("low") || e.has("high") || e.has("value")) && this.handleRangeChange(), (e.has("rangeLabels") && (this.hasUpdated || this.rangeLabels !== !1) || e.has("rangeLabelType") && (this.hasUpdated || this.rangeLabelType !== "percent") || e.has("unitLabel") && (this.hasUpdated || this.unitLabel !== "") || e.has("valueLabel") && (this.hasUpdated || this.valueLabel !== !1) || e.has("valueLabelType") && (this.hasUpdated || this.valueLabelType !== "percent")) && this.updateLabels();
  }
  loaded() {
    this.updateLabels();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), S(this), this.resizeObserver?.disconnect();
  }
  // #endregion
  // #region Private Methods
  handleRangeChange() {
    this.calculateValues(), this.updateLabels();
  }
  resizeHandler() {
    this.updateLabels();
  }
  updateLabels() {
    this.valueLabelEl.value && this.determineValueLabelPosition(), this.rangeLabels && this.determineVisibleLabels();
  }
  calculateValues() {
    const { min: e, max: l, low: t, high: a, value: i } = this, n = 100 * (t - e) / (l - e), r = 100 * (a - e) / (l - e), c = 100 * (i - e) / (l - e);
    (!t || t < e || t > a || t > l) && (this.low = e), (!a || a > l || a < t || a < e) && (this.high = l), i || (this.value = e), this.lowPercent = n, this.highPercent = r, this.currentPercent = i ? c : 0, this.lowActive = !!t && t > e && (!i || t > i) && (!a || t < a), this.highActive = !!a && e <= a && a < l && (!i || a > i) && (!t || a > t);
  }
  formatLabel(e, l) {
    if (l === "percent") {
      if (!this.percentFormatting) {
        const t = F(this.messages._lang), a = new Intl.NumberFormat(t, {
          useGrouping: this.groupSeparator,
          style: "percent"
        });
        this.percentFormatting = { formatter: a, locale: t };
      }
      return this.percentFormatting.formatter.format(e);
    } else
      return P.numberFormatOptions = {
        locale: this.messages._lang,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator
      }, P.localize(e.toString());
  }
  getMeterKindCssClass() {
    const { low: e, high: l, min: t, max: a, value: i } = this, n = e || t, r = l || a, c = i >= n, d = i < n, g = i >= r, o = i < r;
    return !i || !e && o || d ? s.success : c && o ? s.warning : g ? s.danger : s.success;
  }
  intersects(e, l) {
    return e && l && R(e.getBoundingClientRect(), l.getBoundingClientRect());
  }
  determineVisibleLabels() {
    const { minLabelEl: { value: e }, lowLabelEl: { value: l }, highLabelEl: { value: t }, maxLabelEl: { value: a } } = this, i = this.intersects(t, a), n = this.intersects(l, t), r = this.intersects(l, a), c = this.intersects(e, t), d = this.intersects(e, l), g = this.intersects(e, a), o = s.labelHidden;
    l && (d || r || n ? l.classList.add(o) : l.classList.remove(o)), t && (c || r || i ? t.classList.add(o) : t.classList.remove(o)), e && a && (g ? a.classList.add(o) : a.classList.remove(o));
  }
  determineValueLabelPosition() {
    const { valueLabelEl: { value: e }, meterContainerEl: { value: l }, currentPercent: t } = this, a = t > 100 ? 100 : t > 0 ? t : 0, i = e.getBoundingClientRect().width, n = l.getBoundingClientRect().width, r = 100 * (i - 0) / (n - 0);
    a + r >= 100 ? (e.style.insetInlineEnd = "0%", e.style.removeProperty("inset-inline-start")) : (e.style.insetInlineStart = `${a}% `, e.style.removeProperty("inset-inline-end"));
  }
  // #endregion
  // #region Rendering
  renderMeterFill() {
    const { currentPercent: e, fillType: l } = this, t = this.getMeterKindCssClass();
    return b`<div class=${h({ [s.fill]: !0, [t]: l !== "single" })} style=${u({ width: `${e}%` })}></div>`;
  }
  renderRangeLine(e) {
    const l = { insetInlineStart: `${e}%` };
    return b`<div class=${h(s.stepLine)} style=${u(l)}></div>`;
  }
  renderValueLabel() {
    const { currentPercent: e, valueLabelType: l, unitLabel: t, value: a } = this, i = this.formatLabel(l === "percent" ? e / 100 : a || 0, l);
    return L("low-label-line", b`<div class=${h({ [s.label]: !0, [s.labelValue]: !0 })} ${m(this.valueLabelEl)}>${i}${t && l !== "percent" && b`<span class=${h(s.unitLabel)}>&nbsp;${t}</span>` || ""}</div>`);
  }
  renderMinLabel() {
    const { rangeLabelType: e, min: l, minPercent: t, unitLabel: a } = this, i = { insetInlineStart: `${t}%` }, n = this.formatLabel(e === "percent" ? t : l, e);
    return L("min-label-line", b`<div class=${h({ [s.label]: !0, [s.labelRange]: !0 })} style=${u(i)} ${m(this.minLabelEl)}>${n}${a && e !== "percent" && b`<span class=${h(s.unitLabel)}>&nbsp;${a}</span>` || ""}</div>`);
  }
  renderLowLabel() {
    const { rangeLabelType: e, low: l, lowPercent: t, highPercent: a, labelFlipProximity: i } = this, n = l ? this.formatLabel(e === "percent" ? t / 100 : l, e) : "", r = { insetInlineStart: `${t}%` }, c = { insetInlineEnd: `${100 - t}%` }, d = (a - t) / 100 < i ? c : r;
    return L("low-label-line", b`<div class=${h({ [s.label]: !0, [s.labelRange]: !0 })} style=${u(d)} ${m(this.lowLabelEl)}>${n}</div>`);
  }
  renderHighLabel() {
    const { rangeLabelType: e, high: l, highPercent: t, labelFlipMax: a } = this, i = l ? this.formatLabel(e === "percent" ? t / 100 : l, e) : "", n = { insetInlineStart: `${t}%` }, r = { insetInlineEnd: `${100 - t}%` }, c = t / 100 >= a ? r : n;
    return L("high-label-line", b`<div class=${h({ [s.label]: !0, [s.labelRange]: !0 })} style=${u(c)} ${m(this.highLabelEl)}>${i}</div>`);
  }
  renderMaxLabel() {
    const { rangeLabelType: e, max: l, maxPercent: t } = this, a = { insetInlineEnd: `${100 - t}%` }, i = this.formatLabel(e === "percent" ? t / 100 : l, e);
    return L("max-label-line", b`<div class=${h({ [s.label]: !0, [s.labelRange]: !0 })} style=${u(a)} ${m(this.maxLabelEl)}>${i}</div>`);
  }
  render() {
    const { appearance: e, currentPercent: l, highActive: t, highPercent: a, label: i, lowActive: n, lowPercent: r, max: c, maxPercent: d, min: g, minPercent: o, rangeLabels: v, rangeLabelType: f, unitLabel: y, value: x, valueLabel: w, valueLabelType: $ } = this, E = this.formatLabel(l / 100, "percent"), k = `${x} ${y}`;
    return b`<div .ariaLabel=${i} .ariaValueMax=${f === "percent" ? d : c} .ariaValueMin=${f === "percent" ? o : g} .ariaValueNow=${$ === "percent" ? l : x} .ariaValueText=${$ === "percent" ? E : y ? k : void 0} class=${h({
      [s.container]: !0,
      [s.stepsVisible]: v,
      [s.valueVisible]: w,
      [e]: e !== "outline-fill"
    })} role=meter ${m(this.meterContainerEl)}>${this.renderMeterFill()}${w && this.renderValueLabel() || ""}${n && this.renderRangeLine(r) || ""}${t && this.renderRangeLine(a) || ""}${v && this.renderMinLabel() || ""}${v && n && this.renderLowLabel() || ""}${v && t && this.renderHighLabel() || ""}${v && this.renderMaxLabel() || ""}</div>`;
  }
}
T("calcite-meter", U);
export {
  U as Meter
};
