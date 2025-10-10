import { b as $, L as C, c as z, s as o, x as l, E as Y, q as w } from "./index.js";
import { l as S } from "./live.js";
import { e as R, f as P, g as I } from "./global.js";
import { e as f, n as v } from "./ref.js";
import { b as h, n as x, p as b, f as A, e as O, j as y, i as g, h as p, k as W } from "./date.js";
import { c as F, j as L } from "./dom.js";
import { i as k } from "./key.js";
import { n as m } from "./locale.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const N = $`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:block}.header{display:flex;block-size:100%;align-items:center;justify-content:space-between}.chevron-container{display:flex;align-items:center}:host([scale=s]){block-size:24px;margin:var(--calcite-spacing-xs);margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .chevron-container,:host([scale=s]) .chevron{min-inline-size:24px;block-size:24px}:host([scale=m]){block-size:32px;margin:var(--calcite-spacing-sm);margin-inline-start:var(--calcite-spacing-sm-plus)}:host([scale=m]) .chevron-container,:host([scale=m]) .chevron{min-inline-size:32px;block-size:32px;--calcite-internal-action-padding-block: var(--calcite-spacing-xxs)}:host([scale=l]){block-size:44px;margin:var(--calcite-spacing-xs);margin-inline-start:var(--calcite-spacing-sm)}:host([scale=l]) .chevron-container,:host([scale=l]) .chevron{min-inline-size:44px;block-size:44px;--calcite-internal-action-padding-block: var(--calcite-spacing-sm-plus)}.chevron{box-sizing:content-box;display:flex;block-size:100%;inline-size:100%;flex-grow:0;cursor:pointer;align-items:center;justify-content:center;border-style:none;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;outline-color:transparent;--calcite-internal-action-padding-block: 0;--calcite-action-background-color: var(--calcite-date-picker-header-action-background-color);--calcite-action-background-color-hover: var(--calcite-date-picker-header-action-background-color-hover);--calcite-action-background-color-press: var(--calcite-date-picker-header-action-background-color-press);--calcite-action-text-color: var(--calcite-date-picker-header-action-text-color);--calcite-action-text-color-press: var(--calcite-date-picker-header-action-text-color-press)}.chevron:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.chevron[aria-disabled=true]{pointer-events:none}.month-year-container{display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;align-items:center;justify-content:flex-start;text-align:center;line-height:1;gap:var(--calcite-spacing-xxs)}.month-year-container.range-calendar{justify-content:center}.year-container{position:relative;display:flex;block-size:100%}.suffix{display:flex;align-items:center}.year,.suffix{margin-inline:var(--calcite-spacing-xxs);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-date-picker-year-text-color, var(--calcite-color-text-1));font-size:var(--calcite-font-size-md);line-height:var(--calcite-font-line-height-fixed-lg)}.year{position:relative;display:inline-block;border-style:none;background-color:transparent;text-align:center;font-family:inherit;outline-color:transparent;inline-size:44px}.year:hover{transition-timing-function:cubic-bezier(.4,0,.2,1);transition-property:outline-color;outline:2px solid var(--calcite-color-border-2);outline-offset:-2px}.year:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.month-select{--calcite-select-internal-border-width: 0;--calcite-select-internal-icon-border-inline-end-width: 0;--calcite-select-spacing-inline: var(--calcite-spacing-xxs);--calcite-select-font-size: var(--calcite-date-picker-month-select-font-size, var(--calcite-font-size-md));--calcite-select-text-color: var(--calcite-date-picker-month-select-text-color, var(--calcite-color-text-1));--calcite-select-icon-color: var(--calcite-date-picker-month-select-icon-color);--calcite-select-icon-color-hover: var(--calcite-date-picker-month-select-icon-color-hover);--calcite-internal-select-spacing-block: var(--calcite-spacing-xxs);--calcite-internal-select-icon-container-padding-inline: var(--calcite-spacing-xxs);--calcite-internal-select-line-height: var(--calcite-font-line-height-fixed-lg);--calcite-internal-select-font-weight: var(--calcite-font-weight-medium)}:host([scale=s]) .month-year-container .month-select{--calcite-select-spacing-inline: var(--calcite-spacing-base);--calcite-select-font-size: var(--calcite-date-picker-month-select-font-size, var(--calcite-font-size));--calcite-internal-select-spacing-block: var(--calcite-spacing-base);--calcite-internal-select-icon-container-padding-inline: var(--calcite-spacing-base);--calcite-internal-select-block-size: 24px;--calcite-internal-select-line-height: var(--calcite-font-line-height-fixed-base)}:host([scale=s]) .month-year-container .year{inline-size:40px}:host([scale=s]) .month-year-container .year,:host([scale=s]) .month-year-container .suffix{font-size:var(--calcite-font-size);line-height:var(--calcite-font-line-height-fixed-base)}:host([scale=l]) .month-year-container .month-select{--calcite-select-spacing-inline: var(--calcite-spacing-sm);--calcite-select-font-size: var(--calcite-date-picker-month-select-font-size, var(--calcite-font-size-lg));--calcite-internal-select-spacing-block: var(--calcite-spacing-sm);--calcite-internal-select-icon-container-padding-inline: var(--calcite-spacing-sm);--calcite-internal-select-block-size: 44px;--calcite-internal-select-line-height: var(--calcite-font-line-height-fixed-xl)}:host([scale=l]) .month-year-container .year{inline-size:48px}:host([scale=l]) .month-year-container .year,:host([scale=l]) .month-year-container .suffix{font-size:var(--calcite-font-size-lg);line-height:var(--calcite-font-line-height-fixed-xl)}:host([hidden]){display:none}[hidden]{display:none}`, r = {
  header: "header",
  chevron: "chevron",
  chevronContainer: "chevron-container",
  monthYearContainer: "month-year-container",
  monthPicker: "month-select",
  rangeCalendar: "range-calendar",
  suffix: "suffix",
  yearContainer: "year-container",
  year: "year"
}, M = {
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right"
}, E = 16;
class H extends C {
  constructor() {
    super(...arguments), this.monthPickerRef = f(), this.nextMonthActionRef = f(), this.prevMonthActionRef = f(), this.yearInputRef = f(), this.calciteInternalDatePickerMonthHeaderSelectChange = z({ cancelable: !1 });
  }
  static {
    this.properties = { nextMonthDate: 16, prevMonthDate: 16, activeDate: 0, headingLevel: 9, localeData: 0, max: 0, messages: 0, min: 0, monthStyle: 1, position: 1, scale: 3, selectedDate: 0 };
  }
  static {
    this.styles = N;
  }
  connectedCallback() {
    super.connectedCallback(), this.setNextPrevMonthDates();
  }
  load() {
    this.parentDatePickerEl = F(this.el, "calcite-date-picker");
  }
  willUpdate(e) {
    this.hasUpdated && (e.has("activeDate") || e.has("localeData")) && this.setYearSelectMenuWidth(), this.hasUpdated && e.has("scale") && this.setYearSelectWidthOffset(), (e.has("min") || e.has("max") || e.has("activeDate")) && this.setNextPrevMonthDates();
  }
  loaded() {
    this.setYearSelectWidthOffset();
  }
  setNextPrevMonthDates() {
    this.activeDate && (this.nextMonthDate = h(x(this.activeDate), this.min, this.max), this.prevMonthDate = h(b(this.activeDate), this.min, this.max));
  }
  onYearKey(e) {
    const t = this.parseCalendarYear(e.target.value);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(), this.setYear({ localizedYear: t, offset: -1 });
        break;
      case "ArrowUp":
        e.preventDefault(), this.setYear({ localizedYear: t, offset: 1 });
        break;
    }
  }
  formatCalendarYear(e) {
    return m.localize(`${A(e, this.localeData)}`);
  }
  parseCalendarYear(e) {
    return m.localize(`${O(Number(m.delocalize(e)), this.localeData)}`);
  }
  onYearChange(e) {
    this.setYear({
      localizedYear: this.parseCalendarYear(e.target.value)
    });
  }
  onYearInput(e) {
    this.setYear({
      localizedYear: this.parseCalendarYear(e.target.value),
      commit: !1
    });
  }
  prevMonthClick(e) {
    this.handleArrowClick(e, this.prevMonthDate);
  }
  prevMonthKeydown(e) {
    k(e.key) && this.prevMonthClick(e);
  }
  nextMonthClick(e) {
    this.handleArrowClick(e, this.nextMonthDate);
  }
  nextMonthKeydown(e) {
    k(e.key) && this.nextMonthClick(e);
  }
  async handleArrowClick(e, t) {
    e.preventDefault(), await this.handlePenultimateValidMonth(e), this.calciteInternalDatePickerMonthHeaderSelectChange.emit(t);
  }
  handleMonthChange(e) {
    const t = e.target, { abbreviated: a, wide: n } = this.localeData.months, i = (this.monthStyle === "wide" ? n : a).indexOf(t.value);
    let s = y(this.activeDate, i);
    g(s, this.min, this.max) || (s = h(s, this.min, this.max)), this.calciteInternalDatePickerMonthHeaderSelectChange.emit(s), this.setYearSelectMenuWidth();
  }
  getInRangeDate({ localizedYear: e, offset: t = 0 }) {
    const { min: a, max: n, activeDate: c } = this, i = Number(m.delocalize(e)), s = i.toString().length, d = isNaN(i) ? !1 : i + t, D = d && (!a || a.getFullYear() <= d) && (!n || n.getFullYear() >= d);
    if (d && D && s === e.length) {
      const u = new Date(c);
      return u.setFullYear(d), h(u, a, n);
    }
  }
  setYear({ localizedYear: e, commit: t = !0, offset: a = 0 }) {
    const { yearInputRef: n, activeDate: c } = this, i = this.getInRangeDate({ localizedYear: e, offset: a });
    i && this.calciteInternalDatePickerMonthHeaderSelectChange.emit(i), t && (n.value.value = this.formatCalendarYear((i || c).getFullYear()));
  }
  setYearSelectWidthOffset() {
    this.yearSelectWidthOffset = E + 3 * parseInt(this.getYearSelectPadding()), this.setYearSelectMenuWidth();
  }
  setYearSelectMenuWidth() {
    const e = this.monthPickerRef.value;
    e && requestAnimationFrame(() => {
      const t = getComputedStyle(e), a = `${t.fontStyle} ${t.fontVariant} ${t.fontWeight} ${t.fontSize}/${t.lineHeight} ${t.fontFamily}`, c = this.localeData.months[this.monthStyle][this.activeDate.getMonth()], i = Math.ceil(L(c, a));
      e.style.width = `${i + this.yearSelectWidthOffset}px`;
    });
  }
  isMonthInRange(e) {
    const t = y(this.activeDate, e);
    return !this.min && !this.max || g(t, this.min, this.max) ? !0 : p(t, this.max) || p(t, this.min);
  }
  async handlePenultimateValidMonth(e) {
    const n = e.target.getAttribute("data-direction") === "left";
    let c;
    if (n && this.min) {
      const i = h(b(this.activeDate), this.min, this.max);
      c = p(i, this.min);
    } else if (this.max) {
      const i = h(x(this.activeDate), this.min, this.max);
      c = p(i, this.max);
    }
    if (c)
      if (this.position)
        this.yearInputRef.value?.focus();
      else {
        const s = (n ? this.nextMonthActionRef : this.prevMonthActionRef).value;
        if (!s)
          return;
        s.disabled = !1, await s.setFocus();
      }
  }
  getPx(e) {
    const t = Number(e.replace(/[rem|px]/g, "")), a = 16;
    return e.includes("rem") ? `${t * a}px` : `${t}px`;
  }
  getYearSelectPadding() {
    let e;
    switch (this.scale) {
      case "l":
        e = I;
        break;
      case "s":
        e = P;
        break;
      default:
        e = R;
        break;
    }
    return this.getPx(e);
  }
  render() {
    return l`<div class=${o(r.header)}>${this.renderContent()}</div>`;
  }
  renderContent() {
    const { localeData: e, activeDate: t } = this;
    if (!t || !e)
      return null;
    if (this.parentDatePickerEl) {
      const { numberingSystem: c, lang: i } = this.parentDatePickerEl;
      m.numberFormatOptions = {
        useGrouping: !1,
        ...c && { numberingSystem: c },
        ...i && { locale: i }
      };
    }
    const a = W(e.unitOrder), n = a.indexOf("y") < a.indexOf("m");
    return l`${this.position && l`<div class=${o({ [r.chevronContainer]: !0 })}>${this.position === "start" && this.renderChevron("left") || ""}</div>` || ""}<div class=${o({
      [r.monthYearContainer]: !0,
      [r.rangeCalendar]: !!this.position
    })}>${this.renderMonthYearContainer(n)}</div>${!this.position && l`<div class=${o({ [r.chevronContainer]: !0 })}>${this.renderChevron("left")}</div>` || ""}<div class=${o({ [r.chevronContainer]: !0 })}>${this.position !== "start" && this.renderChevron("right") || ""}</div>`;
  }
  renderMonthYearContainer(e) {
    return e ? [this.renderYearInput(), this.renderMonthPicker()] : [this.renderMonthPicker(), this.renderYearInput()];
  }
  renderMonthPicker() {
    const e = this.activeDate.getMonth(), t = this.localeData.months[this.monthStyle];
    return l`<calcite-select class=${o(r.monthPicker)} .label=${this.messages.monthMenu} @calciteSelectChange=${this.handleMonthChange} width=auto ${v(this.monthPickerRef)}>${t.map((a, n) => l`<calcite-option .disabled=${!this.isMonthInRange(n)} .selected=${n === e} .value=${a}>${a}</calcite-option>`)}</calcite-select>`;
  }
  renderYearInput() {
    const e = this.localeData.year?.suffix, t = this.formatCalendarYear(this.activeDate.getFullYear());
    return l`<span class=${o(r.yearContainer)}><input .ariaLabel=${this.messages.year} class=${o({ [r.year]: !0 })} inputmode=numeric maxlength=4 minlength=1 @change=${this.onYearChange} @input=${this.onYearInput} @keydown=${this.onYearKey} pattern=\\d* type=text .value=${S(t ?? "")} ${v(this.yearInputRef)}>${e && l`<span class=${o(r.suffix)}>${e}</span>` || ""}</span>`;
  }
  renderChevron(e) {
    const t = e === "right", a = p(t ? this.nextMonthDate : this.prevMonthDate, this.activeDate) || !g(this.activeDate, this.min, this.max);
    return l`<calcite-action alignment=center .ariaDisabled=${a} .ariaLabel=${t ? this.messages.nextMonth : this.messages.prevMonth} class=${o(r.chevron)} compact data-direction=${e ?? Y} .disabled=${a} .icon=${t ? M.chevronRight : M.chevronLeft} icon-flip-rtl @click=${t ? this.nextMonthClick : this.prevMonthClick} @keydown=${t ? this.nextMonthKeydown : this.prevMonthKeydown} role=button .scale=${this.scale === "l" ? "l" : "m"} .text=${t ? this.messages.nextMonth : this.messages.prevMonth} ${v(t ? this.nextMonthActionRef : this.prevMonthActionRef)}></calcite-action>`;
  }
}
w("calcite-date-picker-month-header", H);
export {
  H as DatePickerMonthHeader
};
