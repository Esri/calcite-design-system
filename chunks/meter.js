import { c as k, L as C, s as h, k as u, x as b, d as T } from "./iframe.js";
import { i as L } from "./keyed.js";
import { e as m, n as p } from "./ref.js";
import { c as M, a as V, d as S } from "./form.js";
import { g as F, n as P } from "./locale.js";
import { D as R } from "./dom.js";
import { c as O } from "./observers.js";
import { u as H } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
const r = {
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
}, I = k`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host{display:flex;--calcite-internal-meter-space: var(--calcite-spacing-base);--calcite-internal-meter-height: var(--calcite-spacing-lg);--calcite-internal-meter-font-size: var(--calcite-font-size--1);--calcite-internal-meter-fill-color: var(--calcite-meter-fill-color, var(--calcite-color-brand));--calcite-internal-meter-background-color: var(--calcite-meter-background-color, var(--calcite-color-foreground-2));--calcite-internal-meter-border-color: var(--calcite-meter-border-color, var(--calcite-color-border-3));--calcite-internal-meter-shadow: var(--calcite-meter-shadow, var(--calcite-shadow-none));--calcite-internal-meter-corner-radius: var(--calcite-meter-corner-radius, 9999px);--calcite-internal-meter-value-text-color: var(--calcite-meter-value-text-color, var(--calcite-color-text-1));--calcite-internal-meter-range-text-color: var(--calcite-meter-range-text-color, var(--calcite-color-text-3))}:host([scale=s]){--calcite-internal-meter-height: var(--calcite-spacing-md);--calcite-internal-meter-font-size: var(--calcite-font-size--2)}:host([scale=l]){--calcite-internal-meter-height: var(--calcite-spacing-xxl);--calcite-internal-meter-font-size: var(--calcite-font-size-0)}:host([appearance=solid]){--calcite-internal-meter-border-color: var(--calcite-color-foreground-3);--calcite-internal-meter-background-color: var(--calcite-color-foreground-3)}:host([appearance=outline]){--calcite-internal-meter-background-color: transparent}.fill{--calcite-internal-meter-fill-color: var(--calcite-meter-fill-color, var(--calcite-color-brand))}.fill-danger{--calcite-internal-meter-fill-color: var(--calcite-meter-fill-color, var(--calcite-color-status-danger))}.fill-success{--calcite-internal-meter-fill-color: var(--calcite-meter-fill-color, var(--calcite-color-status-success))}.fill-warning{--calcite-internal-meter-fill-color: var(--calcite-meter-fill-color, var(--calcite-color-status-warning))}.container{position:relative;display:flex;align-items:center;margin:0;inline-size:var(--calcite-container-size-content-fluid);block-size:var(--calcite-internal-meter-height);background-color:var(--calcite-internal-meter-background-color);border:var(--calcite-border-width-sm) solid var(--calcite-internal-meter-border-color);border-radius:var(--calcite-internal-meter-corner-radius);box-shadow:var(--calcite-internal-meter-shadow)}.value-visible{margin-block-start:var(--calcite-spacing-xxl)}.steps-visible{margin-block-end:var(--calcite-spacing-xxl)}.step-line{position:absolute;inset-block:0px;display:block;inline-size:var(--calcite-internal-meter-space);background-color:var(--calcite-internal-meter-border-color)}.label{position:absolute;font-size:var(--calcite-internal-meter-font-size)}.label-hidden{visibility:hidden;opacity:0}.label-value{inset-block-end:calc(100% + .5em);font-weight:var(--calcite-font-weight-bold);color:var(--calcite-internal-meter-value-text-color)}.label-range{color:var(--calcite-internal-meter-range-text-color);inset-block-start:calc(100% + .5em)}.label-range .unit-label{font-weight:var(--calcite-font-weight-medium)}.fill{position:absolute;z-index:var(--calcite-z-index);display:block;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);inset-inline-start:var(--calcite-internal-meter-space);inset-block:var(--calcite-internal-meter-space);border-radius:var(--calcite-internal-meter-corner-radius);max-inline-size:calc(100% - var(--calcite-internal-meter-space) * 2);min-inline-size:calc(var(--calcite-internal-meter-height) - var(--calcite-internal-meter-space) * 2);background-color:var(--calcite-internal-meter-fill-color);transition-property:inline-size,background-color,box-shadow}.solid .fill{inset-block:0;inset-inline-start:0;max-inline-size:100%;min-inline-size:calc(var(--calcite-internal-meter-height));box-shadow:0 0 0 1px var(--calcite-internal-meter-fill-color)}`;
class U extends C {
  constructor() {
    super(...arguments), this.highLabelEl = m(), this.labelFlipMax = 0.8, this.labelFlipProximity = 0.15, this.lowLabelEl = m(), this.maxLabelEl = m(), this.maxPercent = 100, this.messages = H({ name: null }), this.meterContainerEl = m(), this.minLabelEl = m(), this.minPercent = 0, this.resizeObserver = O("resize", () => this.resizeHandler()), this.valueLabelEl = m(), this.appearance = "outline-fill", this.disabled = !1, this.fillType = "range", this.groupSeparator = !1, this.max = 100, this.min = 0, this.rangeLabelType = "percent", this.rangeLabels = !1, this.scale = "m", this.unitLabel = "", this.valueLabel = !1, this.valueLabelType = "percent";
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
    const { min: e, max: l, low: t, high: a, value: i } = this, n = 100 * (t - e) / (l - e), s = 100 * (a - e) / (l - e), c = 100 * (i - e) / (l - e);
    (!t || t < e || t > a || t > l) && (this.low = e), (!a || a > l || a < t || a < e) && (this.high = l), i || (this.value = e), this.lowPercent = n, this.highPercent = s, this.currentPercent = i ? c : 0, this.lowActive = !!t && t > e && (!i || t > i) && (!a || t < a), this.highActive = !!a && e <= a && a < l && (!i || a > i) && (!t || a > t);
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
    const { low: e, high: l, min: t, max: a, value: i } = this, n = e || t, s = l || a, c = i >= n, d = i < n, v = i >= s, o = i < s;
    return !i || !e && o || d ? r.success : c && o ? r.warning : v ? r.danger : r.success;
  }
  intersects(e, l) {
    return e && l && R(e.getBoundingClientRect(), l.getBoundingClientRect());
  }
  determineVisibleLabels() {
    const { minLabelEl: { value: e }, lowLabelEl: { value: l }, highLabelEl: { value: t }, maxLabelEl: { value: a } } = this, i = this.intersects(t, a), n = this.intersects(l, t), s = this.intersects(l, a), c = this.intersects(e, t), d = this.intersects(e, l), v = this.intersects(e, a), o = r.labelHidden;
    l && (d || s || n ? l.classList.add(o) : l.classList.remove(o)), t && (c || s || i ? t.classList.add(o) : t.classList.remove(o)), e && a && (v ? a.classList.add(o) : a.classList.remove(o));
  }
  determineValueLabelPosition() {
    const { valueLabelEl: { value: e }, meterContainerEl: { value: l }, currentPercent: t } = this, a = t > 100 ? 100 : t > 0 ? t : 0, i = e.getBoundingClientRect().width, n = l.getBoundingClientRect().width, s = 100 * (i - 0) / (n - 0);
    a + s >= 100 ? (e.style.insetInlineEnd = "0%", e.style.removeProperty("inset-inline-start")) : (e.style.insetInlineStart = `${a}% `, e.style.removeProperty("inset-inline-end"));
  }
  // #endregion
  // #region Rendering
  renderMeterFill() {
    const { currentPercent: e, fillType: l } = this, t = this.getMeterKindCssClass();
    return b`<div class=${h({ [r.fill]: !0, [t]: l !== "single" })} style=${u({ width: `${e}%` })}></div>`;
  }
  renderRangeLine(e) {
    const l = { insetInlineStart: `${e}%` };
    return b`<div class=${h(r.stepLine)} style=${u(l)}></div>`;
  }
  renderValueLabel() {
    const { currentPercent: e, valueLabelType: l, unitLabel: t, value: a } = this, i = this.formatLabel(l === "percent" ? e / 100 : a || 0, l);
    return L("low-label-line", b`<div class=${h({ [r.label]: !0, [r.labelValue]: !0 })} ${p(this.valueLabelEl)}>${i}${t && l !== "percent" && b`<span class=${h(r.unitLabel)}>&nbsp;${t}</span>` || ""}</div>`);
  }
  renderMinLabel() {
    const { rangeLabelType: e, min: l, minPercent: t, unitLabel: a } = this, i = { insetInlineStart: `${t}%` }, n = this.formatLabel(e === "percent" ? t : l, e);
    return L("min-label-line", b`<div class=${h({ [r.label]: !0, [r.labelRange]: !0 })} style=${u(i)} ${p(this.minLabelEl)}>${n}${a && e !== "percent" && b`<span class=${h(r.unitLabel)}>&nbsp;${a}</span>` || ""}</div>`);
  }
  renderLowLabel() {
    const { rangeLabelType: e, low: l, lowPercent: t, highPercent: a, labelFlipProximity: i } = this, n = l ? this.formatLabel(e === "percent" ? t / 100 : l, e) : "", s = { insetInlineStart: `${t}%` }, c = { insetInlineEnd: `${100 - t}%` }, d = (a - t) / 100 < i ? c : s;
    return L("low-label-line", b`<div class=${h({ [r.label]: !0, [r.labelRange]: !0 })} style=${u(d)} ${p(this.lowLabelEl)}>${n}</div>`);
  }
  renderHighLabel() {
    const { rangeLabelType: e, high: l, highPercent: t, labelFlipMax: a } = this, i = l ? this.formatLabel(e === "percent" ? t / 100 : l, e) : "", n = { insetInlineStart: `${t}%` }, s = { insetInlineEnd: `${100 - t}%` }, c = t / 100 >= a ? s : n;
    return L("high-label-line", b`<div class=${h({ [r.label]: !0, [r.labelRange]: !0 })} style=${u(c)} ${p(this.highLabelEl)}>${i}</div>`);
  }
  renderMaxLabel() {
    const { rangeLabelType: e, max: l, maxPercent: t } = this, a = { insetInlineEnd: `${100 - t}%` }, i = this.formatLabel(e === "percent" ? t / 100 : l, e);
    return L("max-label-line", b`<div class=${h({ [r.label]: !0, [r.labelRange]: !0 })} style=${u(a)} ${p(this.maxLabelEl)}>${i}</div>`);
  }
  render() {
    const { appearance: e, currentPercent: l, highActive: t, highPercent: a, label: i, lowActive: n, lowPercent: s, max: c, maxPercent: d, min: v, minPercent: o, rangeLabels: g, rangeLabelType: f, unitLabel: y, value: x, valueLabel: $, valueLabelType: w } = this, E = this.formatLabel(l / 100, "percent"), z = `${x} ${y}`;
    return b`<div .ariaLabel=${i} .ariaValueMax=${f === "percent" ? d : c} .ariaValueMin=${f === "percent" ? o : v} .ariaValueNow=${w === "percent" ? l : x} .ariaValueText=${w === "percent" ? E : y ? z : void 0} class=${h({
      [r.container]: !0,
      [r.stepsVisible]: g,
      [r.valueVisible]: $,
      [e]: e !== "outline-fill"
    })} role=meter ${p(this.meterContainerEl)}>${this.renderMeterFill()}${$ && this.renderValueLabel() || ""}${n && this.renderRangeLine(s) || ""}${t && this.renderRangeLine(a) || ""}${g && this.renderMinLabel() || ""}${g && n && this.renderLowLabel() || ""}${g && t && this.renderHighLabel() || ""}${g && this.renderMaxLabel() || ""}</div>`;
  }
}
T("calcite-meter", U);
export {
  U as Meter
};
