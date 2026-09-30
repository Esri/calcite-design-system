/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as k, L as C, s as h, J as u, b, d as T } from "./index.js";
import { i as f } from "./keyed.js";
import { e as m, n as v } from "./ref.js";
import { n as P } from "./locale.js";
import { G as M } from "./dom.js";
import { c as V } from "./observers.js";
import { u as S } from "./useT9n.js";
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
}, F = k`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host{display:flex;--calcite-internal-meter-space: var(--calcite-spacing-base);--calcite-internal-meter-height: var(--calcite-spacing-lg);--calcite-internal-meter-font-size: var(--calcite-font-size--1);--calcite-internal-meter-fill-color: var(--calcite-meter-fill-color, var(--calcite-color-brand));--calcite-internal-meter-background-color: var(--calcite-meter-background-color, var(--calcite-color-foreground-2));--calcite-internal-meter-border-color: var(--calcite-meter-border-color, var(--calcite-color-border-2));--calcite-internal-meter-shadow: var(--calcite-meter-shadow, var(--calcite-shadow-none));--calcite-internal-meter-corner-radius: var(--calcite-meter-corner-radius, 9999px);--calcite-internal-meter-value-text-color: var(--calcite-meter-value-text-color, var(--calcite-color-text-1));--calcite-internal-meter-range-text-color: var(--calcite-meter-range-text-color, var(--calcite-color-text-3));--calcite-internal-meter-label-line-height: var(--calcite-font-line-height-base)}:host([scale=s]){--calcite-internal-meter-height: var(--calcite-spacing-md);--calcite-internal-meter-font-size: var(--calcite-font-size--2)}:host([scale=l]){--calcite-internal-meter-height: var(--calcite-spacing-xxl);--calcite-internal-meter-font-size: var(--calcite-font-size-0);--calcite-internal-meter-label-line-height: var(--calcite-font-line-height-md)}:host([appearance=solid]){--calcite-internal-meter-border-color: var(--calcite-color-foreground-3);--calcite-internal-meter-background-color: var(--calcite-color-foreground-3)}:host([appearance=outline]){--calcite-internal-meter-background-color: transparent}.fill{--calcite-internal-meter-fill-color: var(--calcite-meter-fill-color, var(--calcite-color-brand))}.fill-danger{--calcite-internal-meter-fill-color: var(--calcite-meter-fill-color, var(--calcite-color-status-danger))}.fill-success{--calcite-internal-meter-fill-color: var(--calcite-meter-fill-color, var(--calcite-color-status-success))}.fill-warning{--calcite-internal-meter-fill-color: var(--calcite-meter-fill-color, var(--calcite-color-status-warning))}.container{position:relative;display:flex;align-items:center;margin:0;inline-size:var(--calcite-container-size-content-fluid);block-size:var(--calcite-internal-meter-height);background-color:var(--calcite-internal-meter-background-color);border:var(--calcite-border-width-sm) solid var(--calcite-internal-meter-border-color);border-radius:var(--calcite-internal-meter-corner-radius);box-shadow:var(--calcite-internal-meter-shadow)}.value-visible{margin-block-start:var(--calcite-spacing-xxl)}.steps-visible{margin-block-end:var(--calcite-spacing-xxl)}.step-line{position:absolute;inset-block:0px;display:block;inline-size:var(--calcite-internal-meter-space);background-color:var(--calcite-internal-meter-border-color)}.label{position:absolute;display:flex;gap:var(--calcite-spacing-xxs);font-size:var(--calcite-internal-meter-font-size);line-height:var(--calcite-internal-meter-label-line-height)}.label-hidden{visibility:hidden;opacity:0}.label-value{inset-block-end:calc(100% + .5em);font-weight:var(--calcite-font-weight-bold);color:var(--calcite-internal-meter-value-text-color)}.label-range{color:var(--calcite-internal-meter-range-text-color);inset-block-start:calc(100% + .5em)}.label-range .unit-label{font-weight:var(--calcite-font-weight-medium)}.fill{position:absolute;z-index:var(--calcite-z-index);display:block;transition-timing-function:cubic-bezier(.4,0,.2,1);inset-inline-start:var(--calcite-internal-meter-space);inset-block:var(--calcite-internal-meter-space);border-radius:var(--calcite-internal-meter-corner-radius);max-inline-size:calc(100% - var(--calcite-internal-meter-space) * 2);min-inline-size:calc(var(--calcite-internal-meter-height) - var(--calcite-internal-meter-space) * 2);background-color:var(--calcite-internal-meter-fill-color);transition-property:inline-size,background-color,box-shadow}.solid .fill{inset-block:0;inset-inline-start:0;max-inline-size:100%;min-inline-size:calc(var(--calcite-internal-meter-height));box-shadow:0 0 0 1px var(--calcite-internal-meter-fill-color)}`;
class E extends C {
  constructor() {
    super(...arguments), this.highLabelRef = m(), this.labelFlipMax = 0.8, this.labelFlipProximity = 0.15, this.lowLabelRef = m(), this.maxLabelRef = m(), this.maxPercent = 100, this.messages = S({ name: null }), this.meterContainerRef = m(), this.minLabelRef = m(), this.minPercent = 0, this.resizeObserver = V("resize", () => this.resizeHandler()), this.valueLabelRef = m(), this.currentPercent = 0, this.highActive = !1, this.highPercent = 100, this.lowActive = !1, this.lowPercent = 0, this.appearance = "outline-fill", this.disabled = !1, this.fillType = "range", this.groupSeparator = !1, this.max = 100, this.min = 0, this.rangeLabelType = "percent", this.rangeLabels = !1, this.scale = "m", this.unitLabel = "", this.valueLabel = !1, this.valueLabelType = "percent";
  }
  static {
    this.properties = { currentPercent: 16, highActive: 16, highPercent: 16, lowActive: 16, lowPercent: 16, appearance: 3, disabled: 7, fillType: 3, form: 3, groupSeparator: 7, high: 11, label: 1, low: 11, max: 11, min: 11, name: 3, numberingSystem: 1, rangeLabelType: 3, rangeLabels: 7, scale: 3, unitLabel: 1, value: 9, valueLabel: 7, valueLabelType: 3 };
  }
  static {
    this.styles = F;
  }
  connectedCallback() {
    super.connectedCallback(), this.resizeObserver?.observe(this.el);
  }
  load() {
    this.calculateValues();
  }
  willUpdate(e) {
    (e.has("min") && (this.hasUpdated || this.min !== 0) || e.has("max") && (this.hasUpdated || this.max !== 100) || e.has("low") || e.has("high") || e.has("value")) && this.handleRangeChange(), (e.has("rangeLabels") && (this.hasUpdated || this.rangeLabels !== !1) || e.has("rangeLabelType") && (this.hasUpdated || this.rangeLabelType !== "percent") || e.has("unitLabel") && (this.hasUpdated || this.unitLabel !== "") || e.has("valueLabel") && (this.hasUpdated || this.valueLabel !== !1) || e.has("valueLabelType") && (this.hasUpdated || this.valueLabelType !== "percent")) && this.updateLabels();
  }
  loaded() {
    this.updateLabels();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect();
  }
  handleRangeChange() {
    this.calculateValues(), this.updateLabels();
  }
  resizeHandler() {
    this.updateLabels();
  }
  updateLabels() {
    this.determineValueLabelPosition(), this.determineVisibleLabels();
  }
  calculateValues() {
    const { min: e, max: a, low: t, high: l, value: i } = this, n = t === void 0 ? NaN : 100 * (t - e) / (a - e), s = l === void 0 ? NaN : 100 * (l - e) / (a - e), c = i === void 0 ? NaN : 100 * (i - e) / (a - e);
    (!t || t < e || l !== void 0 && t > l || t > a) && (this.low = e), (!l || l > a || t !== void 0 && l < t || l < e) && (this.high = a), i || (this.value = e), this.lowPercent = n, this.highPercent = s, this.currentPercent = i ? c : 0, this.lowActive = !!t && t > e && (!i || t > i) && (!l || t < l), this.highActive = !!l && e <= l && l < a && (!i || l > i) && (!t || l > t);
  }
  formatLabel(e, a) {
    if (a === "percent") {
      if (!this.percentFormatting) {
        const t = this.messages._lang, l = new Intl.NumberFormat(t, {
          useGrouping: this.groupSeparator,
          style: "percent"
        });
        this.percentFormatting = { formatter: l, locale: t };
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
    const { low: e, high: a, min: t, max: l, value: i } = this, n = e || t, s = a || l, c = i !== void 0 && i >= n, d = i !== void 0 && i < n, p = i !== void 0 && i >= s, o = i !== void 0 && i < s;
    return !i || !e && o || d ? r.success : c && o ? r.warning : p ? r.danger : r.success;
  }
  intersects(e, a) {
    return !!(e && a && M(e.getBoundingClientRect(), a.getBoundingClientRect()));
  }
  determineVisibleLabels() {
    if (!this.rangeLabels)
      return;
    const { minLabelRef: { value: e }, lowLabelRef: { value: a }, highLabelRef: { value: t }, maxLabelRef: { value: l } } = this, i = this.intersects(t, l), n = this.intersects(a, t), s = this.intersects(a, l), c = this.intersects(e, t), d = this.intersects(e, a), p = this.intersects(e, l), o = r.labelHidden;
    a && (d || s || n ? a.classList.add(o) : a.classList.remove(o)), t && (c || s || i ? t.classList.add(o) : t.classList.remove(o)), e && l && (p ? l.classList.add(o) : l.classList.remove(o));
  }
  determineValueLabelPosition() {
    const { valueLabelRef: { value: e }, meterContainerRef: { value: a }, currentPercent: t } = this;
    if (!e || !a)
      return;
    const l = t > 100 ? 100 : t > 0 ? t : 0, i = e.getBoundingClientRect().width, n = a.getBoundingClientRect().width, s = 100 * (i - 0) / (n - 0);
    l + s >= 100 ? (e.style.insetInlineEnd = "0%", e.style.removeProperty("inset-inline-start")) : (e.style.insetInlineStart = `${l}% `, e.style.removeProperty("inset-inline-end"));
  }
  renderMeterFill() {
    const { currentPercent: e, fillType: a } = this, t = this.getMeterKindCssClass();
    return b`<div class=${h({ [r.fill]: !0, [t]: a !== "single" })} style=${u({ width: `${e}%` })}></div>`;
  }
  renderRangeLine(e) {
    const a = { insetInlineStart: `${e}%` };
    return b`<div class=${h(r.stepLine)} style=${u(a)}></div>`;
  }
  renderValueLabel() {
    const { currentPercent: e, valueLabelType: a, unitLabel: t, value: l } = this, i = this.formatLabel(a === "percent" ? e / 100 : l || 0, a);
    return f("low-label-line", b`<div class=${h({ [r.label]: !0, [r.labelValue]: !0 })} ${v(this.valueLabelRef)}>${i}${t && a !== "percent" && b`<span class=${h(r.unitLabel)}>${t}</span>` || ""}</div>`);
  }
  renderMinLabel() {
    const { rangeLabelType: e, min: a, minPercent: t, unitLabel: l } = this, i = { insetInlineStart: `${t}%` }, n = this.formatLabel(e === "percent" ? t : a, e);
    return f("min-label-line", b`<div class=${h({ [r.label]: !0, [r.labelRange]: !0 })} style=${u(i)} ${v(this.minLabelRef)}>${n}${l && e !== "percent" && b`<span class=${h(r.unitLabel)}>${l}</span>` || ""}</div>`);
  }
  renderLowLabel() {
    const { rangeLabelType: e, low: a, lowPercent: t, highPercent: l, labelFlipProximity: i } = this, n = a ? this.formatLabel(e === "percent" ? t / 100 : a, e) : "", s = { insetInlineStart: `${t}%` }, c = { insetInlineEnd: `${100 - t}%` }, d = (l - t) / 100 < i ? c : s;
    return f("low-label-line", b`<div class=${h({ [r.label]: !0, [r.labelRange]: !0 })} style=${u(d)} ${v(this.lowLabelRef)}>${n}</div>`);
  }
  renderHighLabel() {
    const { rangeLabelType: e, high: a, highPercent: t, labelFlipMax: l } = this, i = a ? this.formatLabel(e === "percent" ? t / 100 : a, e) : "", n = { insetInlineStart: `${t}%` }, s = { insetInlineEnd: `${100 - t}%` }, c = t / 100 >= l ? s : n;
    return f("high-label-line", b`<div class=${h({ [r.label]: !0, [r.labelRange]: !0 })} style=${u(c)} ${v(this.highLabelRef)}>${i}</div>`);
  }
  renderMaxLabel() {
    const { rangeLabelType: e, max: a, maxPercent: t } = this, l = { insetInlineEnd: `${100 - t}%` }, i = this.formatLabel(e === "percent" ? t / 100 : a, e);
    return f("max-label-line", b`<div class=${h({ [r.label]: !0, [r.labelRange]: !0 })} style=${u(l)} ${v(this.maxLabelRef)}>${i}</div>`);
  }
  render() {
    const { appearance: e, currentPercent: a, highActive: t, highPercent: l, label: i, lowActive: n, lowPercent: s, max: c, maxPercent: d, min: p, minPercent: o, rangeLabels: g, rangeLabelType: L, unitLabel: y, value: x, valueLabel: w, valueLabelType: $ } = this, R = this.formatLabel(a / 100, "percent"), z = `${x} ${y}`;
    return b`<div .ariaLabel=${i} .ariaValueMax=${L === "percent" ? d : c} .ariaValueMin=${L === "percent" ? o : p} .ariaValueNow=${$ === "percent" ? a : x} .ariaValueText=${$ === "percent" ? R : y ? z : void 0} class=${h({
      [r.container]: !0,
      [r.stepsVisible]: g,
      [r.valueVisible]: w,
      [e]: e !== "outline-fill"
    })} role=meter ${v(this.meterContainerRef)}>${this.renderMeterFill()}${w && this.renderValueLabel() || ""}${n && this.renderRangeLine(s) || ""}${t && this.renderRangeLine(l) || ""}${g && this.renderMinLabel() || ""}${g && n && this.renderLowLabel() || ""}${g && t && this.renderHighLabel() || ""}${g && this.renderMaxLabel() || ""}</div>`;
  }
}
T("calcite-meter", E);
export {
  E as Meter
};
