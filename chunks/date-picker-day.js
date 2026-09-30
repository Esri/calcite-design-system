/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as d, L as h, c, O as r, s as t, b as v, d as u } from "./index.js";
import { a as f } from "./date.js";
import { c as y } from "./dom.js";
import { t as p } from "./aria.js";
import { i as g } from "./key.js";
import { n as l } from "./locale.js";
import { u as b } from "./useSetFocus.js";
import { u as m } from "./useInteractive.js";
const k = d`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;cursor:pointer;outline:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.day-wrapper{position:relative;display:flex;inline-size:100%;flex-direction:column;align-items:center;justify-content:center}.day{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;position:relative;display:flex;inline-size:100%;align-items:center;justify-content:center;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);line-height:1;line-height:var(--calcite-font-line-height-fixed-base);block-size:var(--calcite-internal-day-size);outline-color:var(--calcite-color-transparent);background-color:var(--calcite-date-picker-day-background-color);color:var(--calcite-date-picker-day-text-color, var(--calcite-color-text-1))}.text{margin-block:1px 0px;margin-inline-start:0px}:host([scale=s]){--calcite-internal-day-size: 32px}:host([scale=s]) .day{font-size:var(--calcite-font-size-relative-sm)}:host([scale=m]){--calcite-internal-day-size: 40px}:host([scale=m]) .day{font-size:var(--calcite-font-size-relative-base)}:host([scale=l]){--calcite-internal-day-size: 44px}:host([scale=l]) .day{font-size:var(--calcite-font-size-relative-md)}:host(:not([current-month])) .day{opacity:var(--calcite-opacity-full);color:var(--calcite-color-text-3)}:host(:focus:not([disabled]):not([selected]):not([current-month])) .day{color:var(--calcite-color-text-1)}:host(:hover:not([disabled]):not([selected])) .day{background-color:var(--calcite-date-picker-day-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-date-picker-day-text-color-hover, var(--calcite-color-text-1))}:host(:not([range]):not([selected]).current-day) .day{color:var(--calcite-date-picker-current-day-text-color, var(--calcite-color-brand));font-weight:var(--calcite-font-weight-bold)}:host(:focus[selected]) .day{z-index:var(--calcite-z-index);outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));box-shadow:0 0 0 2px var(--calcite-color-foreground-1)}:host(:focus:not([disabled]):not([selected])) .day{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:hover:not([disabled]):not([selected])) .day{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([selected]) .day{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-date-picker-day-background-color-selected, var(--calcite-color-brand));color:var(--calcite-date-picker-day-text-color-selected, var(--calcite-color-text-inverse))}:host([range-hover]:not([selected])) .day{background-color:var(--calcite-date-picker-day-outside-range-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-date-picker-day-outside-range-text-color-hover, var(--calcite-color-text-1))}:host([highlighted]:not([selected])) .day,:host(:hover[highlighted]:not([selected])) .day{color:var(--calcite-date-picker-day-range-text-color, var(--calcite-color-text-highlight));background-color:var(--calcite-date-picker-day-range-background-color, var(--calcite-color-surface-highlight))}:host([disabled]) .day{color:var(--calcite-color-text-2);text-decoration-line:line-through;opacity:var(--calcite-opacity-disabled)}@media(forced-colors:active){.day{border-radius:0}:host([selected]){outline:2px solid canvasText}:host(:hover:not([selected])) .day{border-radius:50%}:host([range][selected]) .day,:host([highlighted]) .day,:host([range-hover]:not([selected])) .day{background-color:highlight}:host([range-hover]) .day,:host([range][selected][start-of-range]) .day,:host([range][selected][end-of-range]) .day{background-color:canvas}}:host([hidden]){display:none}[hidden]{display:none}`, a = {
  dayWrapper: "day-wrapper",
  day: "day",
  text: "text"
};
class x extends h {
  constructor() {
    super(), this.focusSetter = b()(this), this.interactiveContainer = m(this), this.active = !1, this.currentMonth = !1, this.disabled = !1, this.endOfRange = !1, this.highlighted = !1, this.range = !1, this.rangeHover = !1, this.selected = !1, this.startOfRange = !1, this.calciteInternalDayHover = c({ cancelable: !1 }), this.calciteInternalDaySelect = c({ cancelable: !1 }), this.listen("pointerover", this.pointerOverHandler), this.listen("click", this.onClick), this.listen("keydown", this.keyDownHandler);
  }
  static {
    this.properties = { active: 7, currentMonth: 7, dateTimeFormat: 0, day: 9, disabled: 7, endOfRange: 7, highlighted: 7, range: 7, rangeHover: 7, scale: 3, selected: 7, startOfRange: 7, value: 0 };
  }
  static {
    this.styles = k;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.el, e);
  }
  load() {
    this.parentDatePickerEl = y(this.el, "calcite-date-picker") ?? void 0;
  }
  onClick() {
    this.disabled || this.calciteInternalDaySelect.emit();
  }
  keyDownHandler(e) {
    g(e.key) && (this.disabled || this.calciteInternalDaySelect.emit(), e.preventDefault());
  }
  pointerOverHandler() {
    this.disabled || this.calciteInternalDayHover.emit();
  }
  render() {
    const e = f(this.value).replaceAll("-", "");
    if (this.parentDatePickerEl) {
      const { numberingSystem: i, lang: o } = this.parentDatePickerEl;
      l.numberFormatOptions = {
        useGrouping: !1,
        ...i && { numberingSystem: i },
        ...o && { locale: o }
      };
    }
    const s = l.localize(String(this.day)), n = this.dateTimeFormat.format(this.value) ?? null;
    return this.el.ariaLabel = n, this.el.ariaSelected = p(this.active), r(this.el, "id", e), this.el.role = "button", r(this.el, "tabIndex", this.active && !this.disabled ? 0 : -1), this.interactiveContainer({ disabled: this.disabled, children: v`<div aria-hidden=true class=${t(a.dayWrapper)}><span class=${t(a.day)}><span class=${t(a.text)}>${s}</span></span></div>` });
  }
}
u("calcite-date-picker-day", x);
export {
  x as DatePickerDay
};
