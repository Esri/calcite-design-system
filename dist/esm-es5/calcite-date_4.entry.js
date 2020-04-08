var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-1713631a.js';
import { g as getElementDir } from './dom-d74d6fbc.js';
import { a as ESCAPE, S as SPACE, E as ENTER, T as TAB, b as END, H as HOME, P as PAGE_DOWN, c as PAGE_UP, L as LEFT, D as DOWN, R as RIGHT, U as UP } from './keys-e08384ed.js';
/**
 * Date units
 */
var units;
(function (units) {
    units["day"] = "day";
    units["month"] = "month";
    units["year"] = "year";
})(units || (units = {}));
/**
 * Parse date formatting data for a given locale
 */
function getLocaleFormatData(locale) {
    var data = [
        { unit: units.month, num: "11", placeholder: "mm" },
        { unit: units.day, num: "22", placeholder: "dd" },
        { unit: units.year, num: "3333", placeholder: "yyyy" },
    ];
    // create a new localized string from a known date
    var test = new Date(3333, 10, 22).toLocaleDateString(locale);
    var buddhist = test.indexOf("3876") > -1;
    // replace arabic numerals and adjust for buddhist era
    test = replaceArabicNumerals(test).replace("3876", "3333");
    var placeholder = data.reduce(function (str, d) { return str.replace(d.num, d.placeholder); }, test);
    // given the localized test string, determine the order of day, month, year
    var order = data
        .sort(function (a, b) { return (test.indexOf(a.num) < test.indexOf(b.num) ? -1 : 1); })
        .map(function (d) { return d.unit; });
    var separator = [". ", ".", "-", "/", "/"].find(function (char) { return test.indexOf(char) > -1; });
    return {
        order: order,
        separator: separator,
        buddhist: buddhist,
        placeholder: placeholder,
    };
}
/**
 * Parse numeric units for day, month, and year from a localized string
 * month starts at 0 (can pass to date constructor)
 */
function parseDateString(str, locale) {
    var _a = getLocaleFormatData(locale), separator = _a.separator, order = _a.order, buddhist = _a.buddhist;
    var values = replaceArabicNumerals(str)
        .split(separator)
        .filter(function (part) { return part !== separator; })
        .map(function (part) { return part.replace(".", ""); });
    return {
        day: parseInt(values[order.indexOf(units.day)]),
        month: Math.max(parseInt(values[order.indexOf(units.month)]) - 1, 0),
        year: parseInt(values[order.indexOf(units.year)]) - (buddhist ? 543 : 0),
    };
}
/**
 * Convert eastern arbic numerals and remove right-to-left control marks
 */
function replaceArabicNumerals(str) {
    if (str === void 0) { str = ""; }
    return str
        .replace(/[\u0660-\u0669]/g, function (c) { return (c.charCodeAt(0) - 0x0660); })
        .replace(/[\u06f0-\u06f9]/g, function (c) { return (c.charCodeAt(0) - 0x06f0); })
        .replace(/[^\x00-\x7F]/g, "");
}
/**
 * Assemble an array of month names for a locale
 */
function getMonths(locale) {
    var date = new Date(0, 0, 1);
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) {
        date.setMonth(i);
        return new Intl.DateTimeFormat(locale, {
            month: "long",
        }).format(date);
    });
}
/**
 * Get localized year name for given locale
 */
function getYear(date, locale) {
    return new Intl.DateTimeFormat(locale, { year: "numeric" }).format(date);
}
/**
 * Generate an array of localized week day names in the correct order
 */
function getLocalizedWeekdays(locale) {
    var startWeek = [];
    var endWeek = [];
    var date = new Date();
    for (var w = 1; w < 8; w++) {
        date.setDate(w);
        var day = new Intl.DateTimeFormat(locale, {
            weekday: "short",
        }).format(date);
        date.getDay() === getFirstDayOfWeek(locale) || startWeek.length > 0
            ? startWeek.push(day)
            : endWeek.push(day);
    }
    return __spreadArrays(startWeek, endWeek);
}
/**
 * Find the week starting day for a given locale
 */
function getFirstDayOfWeek(locale) {
    return firstDayOfWeek[locale.slice(0, 2).toUpperCase()] || 0;
}
/**
 * Which day of the week is considered the start in each locale
 * Sunday starting locales have been omitted.
 * https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/weekData.json
 */
var firstDayOfWeek = {
    AD: 1,
    AE: 6,
    AF: 6,
    AI: 1,
    AL: 1,
    AM: 1,
    AN: 1,
    AR: 1,
    AT: 1,
    AX: 1,
    AZ: 1,
    BA: 1,
    BE: 1,
    BG: 1,
    BH: 6,
    BM: 1,
    BN: 1,
    BY: 1,
    CH: 1,
    CL: 1,
    CM: 1,
    CR: 1,
    CY: 1,
    CZ: 1,
    DE: 1,
    DJ: 6,
    DK: 1,
    DZ: 6,
    EC: 1,
    EE: 1,
    EG: 6,
    ES: 1,
    FI: 1,
    FJ: 1,
    FO: 1,
    FR: 1,
    GB: 1,
    GE: 1,
    GF: 1,
    GP: 1,
    GR: 1,
    HR: 1,
    HU: 1,
    IE: 1,
    IQ: 6,
    IR: 6,
    IS: 1,
    IT: 1,
    JO: 6,
    KG: 1,
    KW: 6,
    KZ: 1,
    LB: 1,
    LI: 1,
    LK: 1,
    LT: 1,
    LU: 1,
    LV: 1,
    LY: 6,
    MC: 1,
    MD: 1,
    ME: 1,
    MK: 1,
    MN: 1,
    MQ: 1,
    MV: 5,
    MY: 1,
    NL: 1,
    NO: 1,
    NZ: 1,
    OM: 6,
    PL: 1,
    QA: 6,
    RE: 1,
    RO: 1,
    RS: 1,
    RU: 1,
    SD: 6,
    SE: 1,
    SI: 1,
    SK: 1,
    SM: 1,
    SY: 6,
    TJ: 1,
    TM: 1,
    TR: 1,
    UA: 1,
    UY: 1,
    UZ: 1,
    VA: 1,
    VN: 1,
    XK: 1,
};
/**
 * Check if date is within a min and max
 */
function inRange(date, min, max) {
    var time = date.getTime();
    var afterMin = !(min instanceof Date) || time >= min.getTime();
    var beforeMax = !(max instanceof Date) || time <= max.getTime();
    return afterMin && beforeMax;
}
/**
 * Ensures date is within range,
 * returns min or max if out of bounds
 */
function dateFromRange(date, min, max) {
    if (!(date instanceof Date)) {
        return null;
    }
    var time = date.getTime();
    var beforeMin = min instanceof Date && time < min.getTime();
    var afterMax = max instanceof Date && time > max.getTime();
    if (beforeMin) {
        return min;
    }
    if (afterMax) {
        return max;
    }
    return date;
}
/**
 * Parse an iso8601 string (YYYY-mm-dd) into a valid date.
 * TODO: handle time when time of day UI is added
 */
function dateFromISO(iso8601) {
    if (!iso8601 || typeof iso8601 !== "string") {
        return null;
    }
    var d = iso8601.split(/[: T-]/).map(parseFloat);
    var date = new Date(d[0], (d[1] || 1) - 1, d[2] || 1);
    if (isNaN(date.getTime())) {
        console.error("Invalid ISO 8601 date: \"" + iso8601 + "\"");
        return null;
    }
    return date;
}
/**
 * Return first portion of ISO string (YYYY-mm-dd)
 */
function dateToISO(date) {
    if (date instanceof Date) {
        return date.toISOString().split("T")[0];
    }
    return "";
}
/**
 * Check if two dates are the same day, month, year
 */
function sameDate(d1, d2) {
    return (d1 instanceof Date &&
        d2 instanceof Date &&
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear());
}
/**
 * Get a date one month in the past
 */
function prevMonth(date) {
    var month = date.getMonth();
    var nextDate = new Date(date);
    nextDate.setMonth(month - 1);
    // date doesn't exist in new month, use last day
    if (month === nextDate.getMonth()) {
        return new Date(date.getFullYear(), month, 0);
    }
    return nextDate;
}
/**
 * Get a date one month in the future
 */
function nextMonth(date) {
    var month = date.getMonth();
    var nextDate = new Date(date);
    nextDate.setMonth(month + 1);
    // date doesn't exist in new month, use last day
    if ((month + 2) % 7 === nextDate.getMonth() % 7) {
        return new Date(date.getFullYear(), month + 2, 0);
    }
    return nextDate;
}
var calciteDateCss = ":host([hidden]){display:none}:host{display:inline-block;vertical-align:top}::slotted(input){display:none}.date-input-wrapper{border:1px solid var(--calcite-ui-border-1);position:relative}.date-input-wrapper:active,.date-input-wrapper:focus{border-color:transparent;border-bottom:1px solid var(--calcite-ui-border-3)}.date-input{color:var(--calcite-ui-text-3);background:var(--calcite-ui-foreground-1);-webkit-box-sizing:border-box;box-sizing:border-box;border:none;font-weight:400;font-size:1rem;line-height:1.5;font-family:inherit;padding:0.75rem 2.5rem;width:100%;margin:0}.date-input:active,.date-input:focus{outline:none}.calendar-icon{color:var(--calcite-ui-text-3);position:absolute;top:50%;margin:-8px 0.75rem;pointer-events:none}.calendar-picker-wrapper{position:absolute;background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);opacity:0;visibility:hidden;-webkit-transform:translate3d(0, -1.5rem, 0);transform:translate3d(0, -1.5rem, 0);-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;pointer-events:none;z-index:2}:host([show-calendar]){background-color:var(--calcite-ui-foreground-1);border-radius:var(--calcite-border-radius);border:1px solid var(--calcite-ui-border-2);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);overflow:hidden}:host([show-calendar]) .calendar-picker-wrapper{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);visibility:visible;pointer-events:initial}:host([show-calendar]) .date-input-wrapper{border:none;border-bottom:1px solid var(--calcite-ui-border-3)}:host([no-calendar-input]) .calendar-picker-wrapper{position:static;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}";
var CalciteDatePicker = /** @class */ (function () {
    function CalciteDatePicker(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /** Expand or collapse when calendar does not have input */
        this.showCalendar = false;
        /** Localized string for "previous month" */
        this.prevMonthLabel = "previous month";
        /** Localized string for "next month" */
        this.nextMonthLabel = "next month";
        /** BCP 47 language tag for desired language and country format */
        this.locale = "en-US";
        /** Show only calendar popup */
        this.noCalendarInput = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.localeData = getLocaleFormatData(this.locale);
        this.hasShadow = !!document.head.attachShadow;
        /**
         * Update component based on input proxy
         */
        this.syncThisToProxyInput = function () {
            _this.min = _this.inputProxy.min;
            _this.max = _this.inputProxy.max;
            var min = dateFromISO(_this.min);
            var max = dateFromISO(_this.max);
            var date = dateFromISO(_this.inputProxy.value);
            _this.valueAsDate = dateFromRange(date, min, max);
            _this.value = dateToISO(_this.valueAsDate);
        };
        /**
         * Update input proxy
         */
        this.syncProxyInputToThis = function () {
            if (_this.inputProxy) {
                _this.inputProxy.value = _this.value || "";
                if (_this.min) {
                    _this.inputProxy.min = _this.min;
                }
                if (_this.max) {
                    _this.inputProxy.max = _this.max;
                }
            }
        };
        this.calciteDateChange = createEvent(this, "calciteDateChange", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteDatePicker.prototype.focusOutHandler = function () {
        this.reset();
    };
    /**
     * Blur doesn't fire properly when there is no shadow dom (ege/IE11)
     * Check if the focused element is inside the date picker, if not close
     */
    CalciteDatePicker.prototype.focusInHandler = function (e) {
        if (!this.hasShadow && !this.el.contains(e.srcElement)) {
            this.reset();
        }
    };
    CalciteDatePicker.prototype.keyDownHandler = function (e) {
        if (e.keyCode === ESCAPE) {
            this.reset();
        }
    };
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    CalciteDatePicker.prototype.connectedCallback = function () {
        this.setupProxyInput();
    };
    CalciteDatePicker.prototype.disconnectedCallback = function () {
        this.observer.disconnect();
    };
    CalciteDatePicker.prototype.componentWillRender = function () {
        this.syncProxyInputToThis();
    };
    CalciteDatePicker.prototype.render = function () {
        var _this = this;
        var min = dateFromISO(this.min);
        var max = dateFromISO(this.max);
        var date = dateFromRange(this.valueAsDate, min, max);
        var activeDate = this.getActiveDate(date, min, max);
        var formattedDate = date ? date.toLocaleDateString(this.locale) : "";
        var dir = getElementDir(this.el);
        return (h(Host, { role: "application", dir: dir }, h("slot", null), !this.noCalendarInput && (h("div", { class: "date-input-wrapper", role: "application" }, h("calcite-icon", { icon: "calendar", class: "calendar-icon", scale: "s" }), h("input", { type: "text", placeholder: this.localeData.placeholder, value: formattedDate, class: "date-input", onFocus: function () { return (_this.showCalendar = true); }, onInput: function (e) { return _this.input(e.target.value); }, onBlur: function (e) { return _this.blur(e.target); } }))), h("div", { class: "calendar-picker-wrapper" }, h("calcite-date-month-header", { activeDate: activeDate, selectedDate: date || new Date(), prevMonthLabel: this.prevMonthLabel, nextMonthLabel: this.nextMonthLabel, locale: this.locale, min: min, max: max, onCalciteActiveDateChange: function (e) {
                _this.activeDate = new Date(e.detail);
            }, dir: dir }), h("calcite-date-month", { min: min, max: max, selectedDate: date, activeDate: activeDate, locale: this.locale, onCalciteDateSelect: function (e) {
                _this.setValue(new Date(e.detail));
                _this.activeDate = new Date(e.detail);
                _this.calciteDateChange.emit(new Date(e.detail));
                _this.reset();
            }, onCalciteActiveDateChange: function (e) {
                _this.activeDate = new Date(e.detail);
            }, dir: dir }))));
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Register slotted date input proxy, or create one if not provided
     */
    CalciteDatePicker.prototype.setupProxyInput = function () {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            try {
                this.inputProxy.type = "date";
            }
            catch (e) {
                this.inputProxy.type = "text";
            }
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
        {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    };
    /**
     * Set both iso value and date value and update proxy
     */
    CalciteDatePicker.prototype.setValue = function (date) {
        this.valueAsDate = new Date(date);
        this.value = date.toISOString().split("T")[0];
        this.syncProxyInputToThis();
    };
    /**
     * Reset active date and close
     */
    CalciteDatePicker.prototype.reset = function () {
        if (this.valueAsDate) {
            this.activeDate = new Date(this.valueAsDate);
        }
        if (!this.noCalendarInput) {
            this.showCalendar = false;
        }
    };
    /**
     * If inputted string is a valid date, update value/active
     */
    CalciteDatePicker.prototype.input = function (value) {
        var date = this.getDateFromInput(value);
        if (date) {
            this.setValue(date);
            this.activeDate = date;
            this.calciteDateChange.emit(new Date(date));
        }
    };
    /**
     * Clean up invalid date from input on blur
     */
    CalciteDatePicker.prototype.blur = function (target) {
        var date = this.getDateFromInput(target.value);
        if (!date && this.valueAsDate) {
            target.value = this.valueAsDate.toLocaleDateString(this.locale);
        }
    };
    /**
     * Get an active date using the value, or current date as default
     */
    CalciteDatePicker.prototype.getActiveDate = function (value, min, max) {
        return (dateFromRange(this.activeDate, min, max) ||
            value ||
            dateFromRange(new Date(), min, max));
    };
    /**
     * Find a date from input string
     * return false if date is invalid, or out of range
     */
    CalciteDatePicker.prototype.getDateFromInput = function (value) {
        var separator = this.localeData.separator;
        var _a = parseDateString(value, this.locale), day = _a.day, month = _a.month, year = _a.year;
        var date = new Date(year, month, day);
        var validDate = !isNaN(date.getTime());
        var validLength = value.split(separator).filter(function (c) { return c; }).length > 2;
        var validYear = year.toString().length > 3;
        if (validDate &&
            validLength &&
            validYear &&
            inRange(date, this.min, this.max)) {
            return date;
        }
        return false;
    };
    Object.defineProperty(CalciteDatePicker.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalciteDatePicker;
}());
CalciteDatePicker.style = calciteDateCss;
var calciteDateDayCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;outline:none;color:var(--calcite-ui-text-3);padding:0.3rem 0.4rem;cursor:pointer;width:calc(100% / 7);min-width:0}:host .day{display:-ms-flexbox;display:flex;width:100%;border-radius:100%;font-size:0.875rem;line-height:1.5;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;height:2rem;width:2rem;color:var(--calcite-ui-text-3);-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;background:none;-webkit-box-shadow:0 0 0 2px transparent, 0 0 0 0px transparent;box-shadow:0 0 0 2px transparent, 0 0 0 0px transparent}:host([current-month]) .day{color:var(--calcite-ui-text-1)}:host([disabled]){cursor:default;pointer-events:none}:host([disabled]) .day{color:var(--calcite-ui-border-1)}:host(:hover) .day,:host([active]) .day{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:focus) .day{-webkit-box-shadow:0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}:host([selected]) .day{background-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-foreground-1);font-weight:500}";
var CalciteDateDay = /** @class */ (function () {
    function CalciteDateDay(hostRef) {
        registerInstance(this, hostRef);
        /** Date is outside of range and can't be selected */
        this.disabled = false;
        /** Date is in the current month. */
        this.currentMonth = false;
        /** Date is the current selected date of the picker */
        this.selected = false;
        /** Date is actively in focus for keyboard navigation */
        this.active = false;
        this.calciteDaySelect = createEvent(this, "calciteDaySelect", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteDateDay.prototype.onClick = function () {
        !this.disabled && this.calciteDaySelect.emit();
    };
    CalciteDateDay.prototype.keyDownHandler = function (e) {
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            !this.disabled && this.calciteDaySelect.emit();
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteDateDay.prototype.render = function () {
        var intl = new Intl.NumberFormat(this.locale);
        return (h(Host, { role: "gridcell", tabindex: this.selected || this.active ? 0 : -1 }, h("span", { class: "day" }, intl.format(this.day))));
    };
    Object.defineProperty(CalciteDateDay.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalciteDateDay;
}());
CalciteDateDay.style = calciteDateDayCss;
var calciteDateMonthCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}.calender .week-headers{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;border-bottom:1px solid var(--calcite-ui-border-3);border-top:1px solid var(--calcite-ui-border-3)}.calender .week-headers .week-header{color:var(--calcite-ui-text-2);padding:0.75rem 0;text-transform:uppercase;font-weight:600;font-size:11px;width:calc(100% / 7);text-align:center}.calender .week-days{outline:none;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row}";
var CalciteDateMonth = /** @class */ (function () {
    function CalciteDateMonth(hostRef) {
        registerInstance(this, hostRef);
        /** Date currently active.*/
        this.activeDate = new Date();
        /** User's language and region as BCP 47 formatted string. */
        this.locale = "en-US";
        this.calciteDateSelect = createEvent(this, "calciteDateSelect", 7);
        this.calciteActiveDateChange = createEvent(this, "calciteActiveDateChange", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteDateMonth.prototype.keyDownHandler = function (e) {
        var isRTL = this.el.dir === "rtl";
        switch (e.keyCode) {
            case UP:
                e.preventDefault();
                this.addDays(-7);
                break;
            case RIGHT:
                e.preventDefault();
                this.addDays(isRTL ? -1 : 1);
                break;
            case DOWN:
                e.preventDefault();
                this.addDays(7);
                break;
            case LEFT:
                e.preventDefault();
                this.addDays(isRTL ? 1 : -1);
                break;
            case PAGE_UP:
                e.preventDefault();
                this.addMonths(-1);
                break;
            case PAGE_DOWN:
                e.preventDefault();
                this.addMonths(1);
                break;
            case HOME:
                e.preventDefault();
                this.activeDate.setDate(1);
                this.addDays();
                break;
            case END:
                e.preventDefault();
                this.activeDate.setDate(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate());
                this.addDays();
                break;
            case ENTER:
            case SPACE:
                e.preventDefault();
                this.calciteDateSelect.emit(this.activeDate);
                break;
            case TAB:
                this.activeFocus = false;
        }
    };
    /**
     * Once user is not interacting via keyboard,
     * disable auto focusing of active date
     */
    CalciteDateMonth.prototype.disableActiveFocus = function () {
        this.activeFocus = false;
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteDateMonth.prototype.render = function () {
        var _this = this;
        var month = this.activeDate.getMonth();
        var year = this.activeDate.getFullYear();
        var startOfWeek = getFirstDayOfWeek(this.locale);
        var weekDays = getLocalizedWeekdays(this.locale);
        var curMonDays = this.getCurrentMonthDays(month, year);
        var prevMonDays = this.getPrevMonthdays(month, year, startOfWeek);
        var nextMonDays = this.getNextMonthDays(month, year, startOfWeek);
        var days = __spreadArrays(prevMonDays.map(function (day) {
            var date = new Date(year, month - 1, day);
            return (h("calcite-date-day", { day: day, disabled: !inRange(date, _this.min, _this.max), selected: sameDate(date, _this.selectedDate), onCalciteDaySelect: function () { return _this.calciteDateSelect.emit(date); }, locale: _this.locale }));
        }), curMonDays.map(function (day) {
            var date = new Date(year, month, day);
            var active = sameDate(date, _this.activeDate);
            return (h("calcite-date-day", { day: day, disabled: !inRange(date, _this.min, _this.max), selected: sameDate(date, _this.selectedDate), active: active, onCalciteDaySelect: function () { return _this.calciteDateSelect.emit(date); }, locale: _this.locale, ref: function (el) {
                    // when moving via keyboard, focus must be updated on active date
                    if (active && _this.activeFocus) {
                        el === null || el === void 0 ? void 0 : el.focus();
                    }
                }, "current-month": true }));
        }), nextMonDays.map(function (day) {
            var date = new Date(year, month + 1, day);
            return (h("calcite-date-day", { day: day, disabled: !inRange(date, _this.min, _this.max), selected: sameDate(date, _this.selectedDate), onCalciteDaySelect: function () { return _this.calciteDateSelect.emit(date); }, locale: _this.locale }));
        }));
        var weeks = [];
        for (var i = 0; i < days.length; i += 7) {
            weeks.push(days.slice(i, i + 7));
        }
        return (h(Host, null, h("div", { class: "calender", role: "grid" }, h("div", { class: "week-headers", role: "row" }, weekDays.map(function (weekday) { return (h("span", { class: "week-header", role: "columnheader" }, weekday)); })), weeks.map(function (days) { return (h("div", { class: "week-days", role: "row" }, days)); }))));
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Add n months to the current month
     */
    CalciteDateMonth.prototype.addMonths = function (step) {
        var nextDate = new Date(this.activeDate);
        nextDate.setMonth(this.activeDate.getMonth() + step);
        this.calciteActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
        this.activeFocus = true;
    };
    /**
     * Add n days to the current date
     */
    CalciteDateMonth.prototype.addDays = function (step) {
        if (step === void 0) { step = 0; }
        var nextDate = new Date(this.activeDate);
        nextDate.setDate(this.activeDate.getDate() + step);
        this.calciteActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
        this.activeFocus = true;
    };
    /**
     * Get dates for last days of the previous month
     */
    CalciteDateMonth.prototype.getPrevMonthdays = function (month, year, startOfWeek) {
        var lastDate = new Date(year, month, 0);
        var date = lastDate.getDate();
        var day = lastDate.getDay();
        var days = [];
        if (day - 6 === startOfWeek) {
            return days;
        }
        for (var i = lastDate.getDay(); i >= startOfWeek; i--) {
            days.push(date - i);
        }
        return days;
    };
    /**
     * Get dates for the current month
     */
    CalciteDateMonth.prototype.getCurrentMonthDays = function (month, year) {
        var num = new Date(year, month + 1, 0).getDate();
        var days = [];
        for (var i = 0; i < num; i++) {
            days.push(i + 1);
        }
        return days;
    };
    /**
     * Get dates for first days of the next month
     */
    CalciteDateMonth.prototype.getNextMonthDays = function (month, year, startOfWeek) {
        var endDay = new Date(year, month + 1, 0).getDay();
        var days = [];
        if (endDay === (startOfWeek + 6) % 7) {
            return days;
        }
        for (var i = 0; i < (6 - (endDay - startOfWeek)) % 7; i++) {
            days.push(i + 1);
        }
        return days;
    };
    Object.defineProperty(CalciteDateMonth.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalciteDateMonth;
}());
CalciteDateMonth.style = calciteDateMonthCss;
var calciteDateMonthHeaderCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}.month-year{display:-ms-flexbox;display:flex}.right-icon,.left-icon{color:var(--calcite-ui-text-3);-ms-flex-positive:1;flex-grow:1;outline:none;padding:0;border:none;color:inherit;background-color:var(--calcite-ui-foreground-1);cursor:pointer;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out}.right-icon:hover,.right-icon:focus,.left-icon:hover,.left-icon:focus{fill:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-2)}.right-icon:active,.left-icon:active{background-color:var(--calcite-ui-foreground-3)}.month-year-text{padding:0.5rem;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-positive:1;flex-grow:1;width:50%;-ms-flex-pack:center;justify-content:center}.month,.year{color:var(--calcite-ui-text-1);background:var(--calcite-ui-foreground-1);font-size:1rem;line-height:1.5;font-weight:500}.year{font-family:inherit;text-align:center;border:none;width:3em;padding:0;margin:0 8px;outline-offset:0;outline-color:rgba(0, 0, 0, 0);-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.year:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}";
var CalciteDateMonthHeader = /** @class */ (function () {
    function CalciteDateMonthHeader(hostRef) {
        registerInstance(this, hostRef);
        this.calciteActiveDateChange = createEvent(this, "calciteActiveDateChange", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteDateMonthHeader.prototype.render = function () {
        var _this = this;
        var activeMonth = this.activeDate.getMonth();
        var localizedMonth = getMonths(this.locale)[activeMonth];
        var localizedYear = getYear(this.activeDate, this.locale);
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("div", { class: "month-year", "aria-hidden": "true" }, h("button", { class: "left-icon", "aria-label": this.prevMonthLabel, onClick: function () { return _this.selectPrevMonth(); } }, h("calcite-icon", { icon: "chevron-left", scale: "s", mirrored: true, dir: dir })), h("div", { class: "month-year-text" }, h("span", { class: "month", role: "heading" }, localizedMonth), h("input", { class: "year", type: "text", inputmode: "numeric", maxlength: "4", minlength: "4", pattern: "\\d*", value: "" + localizedYear.slice(-4), onKeyDown: function (event) { return _this.onYearKey(event); }, onChange: function (event) { return _this.setYear(event.target.value); }, ref: function (el) { return (_this.yearInput = el); } })), h("button", { class: "right-icon", "aria-label": this.nextMonthLabel, onClick: function () { return _this.selectNextMonth(); } }, h("calcite-icon", { icon: "chevron-right", scale: "s", mirrored: true, dir: dir })))));
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Set active date to previous month (or min if out of range)
     */
    CalciteDateMonthHeader.prototype.selectPrevMonth = function () {
        var nextDate = prevMonth(this.activeDate);
        this.calciteActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
    };
    /**
     * Set active date to next month (or max if out of range)
     */
    CalciteDateMonthHeader.prototype.selectNextMonth = function () {
        var nextDate = nextMonth(this.activeDate);
        this.calciteActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
    };
    /**
     * Increment year on UP/DOWN keys
     */
    CalciteDateMonthHeader.prototype.onYearKey = function (e) {
        var year = e.target.value;
        switch (e.keyCode) {
            case DOWN:
                e.preventDefault();
                this.setYear(year, -1);
                break;
            case UP:
                e.preventDefault();
                this.setYear(year, 1);
                break;
        }
    };
    /**
     * Parse localized year string from input,
     * set to active if in range
     */
    CalciteDateMonthHeader.prototype.setYear = function (localizedYear, increment) {
        if (increment === void 0) { increment = 0; }
        var _a = this, min = _a.min, max = _a.max, activeDate = _a.activeDate, locale = _a.locale, yearInput = _a.yearInput;
        var parsedYear = parseInt(replaceArabicNumerals(localizedYear));
        var length = parsedYear.toString().length;
        var offset = getLocaleFormatData(locale).buddhist ? 543 : 0;
        var year = isNaN(parsedYear) ? false : parsedYear - offset + increment;
        var inRange = year &&
            (!min || min.getFullYear() <= year) &&
            (!max || max.getFullYear() >= year);
        // if you've supplied a year and it's in range, update active date
        if (year && inRange && length === localizedYear.length && length > 3) {
            var nextDate = new Date(activeDate);
            nextDate.setFullYear(year);
            var inRangeDate = dateFromRange(nextDate, min, max);
            this.calciteActiveDateChange.emit(inRangeDate);
            yearInput.value = getYear(inRangeDate, locale).slice(-4);
        }
        else {
            // leave the current active date and clean up garbage input
            yearInput.value = getYear(activeDate, locale).slice(-4);
        }
    };
    Object.defineProperty(CalciteDateMonthHeader.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalciteDateMonthHeader;
}());
CalciteDateMonthHeader.style = calciteDateMonthHeaderCss;
export { CalciteDatePicker as calcite_date, CalciteDateDay as calcite_date_day, CalciteDateMonth as calcite_date_month, CalciteDateMonthHeader as calcite_date_month_header };
