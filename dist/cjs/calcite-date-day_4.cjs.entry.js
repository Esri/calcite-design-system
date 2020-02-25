'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-67746296.js');
const keys = require('./keys-4806e54f.js');

const CalciteDateDay = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * day of the month to be shown.
         */
        this.day = 0;
        /**
         * Enables tells whether day enabled for the user click.
         */
        this.enable = true;
        /**
         * Selected tells whether day is selected.
         */
        this.selected = false;
        /**
         * Active tells whether day is Actively in focus.
         */
        this.active = false;
        this.calciteDaySelect = core.createEvent(this, "calciteDaySelect", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        return (core.h(core.Host, { class: `${this.active ? "active" : ""}
        ${this.enable ? "enabled" : "disabled"}
        ${this.selected ? "selected-day" : ""}`, role: "gridcell", tabindex: (this.selected || this.active) ? 0 : -1 }, core.h("span", { class: "day" }, this.day)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick() {
        this.enable && (this.selected = true) && this.calciteDaySelect.emit();
    }
    keyDownHandler(e) {
        if (e.keyCode === keys.SPACE || e.keyCode === keys.ENTER) {
            this.enable && (this.selected = true) && this.calciteDaySelect.emit();
        }
    }
    get el() { return core.getElement(this); }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{display:-ms-flexbox;display:flex;outline:none;color:var(--calcite-ui-text-3);padding:.3rem .4rem;cursor:pointer;width:calc(100% / 7)}:host .disabled{pointer-events:none}:host .day{display:-ms-flexbox;display:flex;width:100%;border-radius:100%;font-size:14px;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;height:2rem;width:2rem}:host(.active) .day,:host(:focus) .day,:host(:hover) .day{background-color:var(--calcite-ui-foreground-hover);-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;color:var(--calcite-ui-text-1)}:host(.selected-day) .day,:host(:focus.active) .day{-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:var(--calcite-ui-blue);border-radius:100%;color:var(--calcite-ui-foreground);font-weight:500}:host(.disabled){cursor:default}:host(.active) .disabled .day,:host(.disabled) .day,:host(:focus.active) .disabled .day,:host(:hover) .disabled .day{color:#bfbfbf;background:none}"; }
};

const CalciteDateMonth = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Month number starting 0 as January for which the calendar is shown.
         */
        this.month = 0;
        /**
         * Year for which the calendar is shown.
         */
        this.year = 0;
        /**
         * Sun by default
         * 0: Sunday
         * 1: Monday
         * 2: Tuesday
         * 3: Wednesday
         * 4: Thursday
         * 5: Friday
         * 6: Saturday
         */
        this.startOfWeek = 0;
        /**
         * pass the locale in which user wants to show the date.
         */
        this.locale = "en-US";
        this.calciteDateSelect = core.createEvent(this, "calciteDateSelect", 7);
        this.calciteActiveDateChange = core.createEvent(this, "calciteActiveDateChange", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        let weekDays = this.getLocalizedWeekday(), curMonDays = [
            ...Array(new Date(this.year, this.month + 1, 0).getDate()).keys()
        ], prevMonDays = this.getPrevMonthdays(this.month, this.year), nextMonDays = this.getNextMonthdays(this.month, this.year), splitDays = [], days = [
            ...prevMonDays.map(prev => (core.h("calcite-date-day", { day: prev, enable: false }))),
            ...curMonDays.map(cur => (core.h("calcite-date-day", { day: cur + 1, enable: this.validateDate(cur + 1, this.month, this.year), selected: this.isSelectedDate(this.year, this.month, cur + 1), active: this.activeDate.getDate() === cur + 1, onCalciteDaySelect: () => this.onSelectDate(cur + 1) }))),
            ...nextMonDays.map(next => (core.h("calcite-date-day", { day: next + 1, enable: false })))
        ];
        for (let i = 0; i < days.length; i += 7)
            splitDays.push(days.slice(i, i + 7));
        return (core.h(core.Host, null, core.h("div", { class: "calender", role: "grid" }, core.h("div", { class: "week-headers", role: "presentation" }, weekDays.map(weekday => (core.h("span", { class: "week-header", role: "columnheader" }, weekday)))), splitDays.map(days => (core.h("div", { class: "week-days", role: "row" }, days))))));
    }
    keyDownHandler(e) {
        switch (e.keyCode) {
            case keys.UP:
                e.preventDefault();
                this.addDaysToActiveDate(-7);
                break;
            case keys.RIGHT:
                e.preventDefault();
                this.addDaysToActiveDate(1);
                break;
            case keys.DOWN:
                e.preventDefault();
                this.addDaysToActiveDate(7);
                break;
            case keys.LEFT:
                e.preventDefault();
                this.addDaysToActiveDate(-1);
                break;
            case keys.PAGE_UP:
                e.preventDefault();
                this.addMonthToActiveDate(-1);
                break;
            case keys.PAGE_DOWN:
                e.preventDefault();
                this.addMonthToActiveDate(1);
                break;
            case keys.HOME:
                e.preventDefault();
                this.activeDate.setDate(1);
                this.addDaysToActiveDate();
                break;
            case keys.END:
                e.preventDefault();
                this.activeDate.setDate(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate());
                this.addDaysToActiveDate();
                break;
            case keys.ENTER:
            case keys.SPACE:
                e.preventDefault();
                this.selectedDate = this.activeDate;
                this.calciteDateSelect.emit();
                break;
            case keys.ESCAPE:
                e.preventDefault();
                this.activeDate = this.selectedDate;
                this.calciteActiveDateChange.emit();
                break;
        }
    }
    mouseoverHandler(e) {
        let day = e.target.day || this.activeDate.getDate();
        if (!e.target.enable)
            return;
        if (day != this.activeDate.getDate()) {
            let [activeDay, activeMonth, activeYear] = [
                day,
                this.activeDate.getMonth(),
                this.activeDate.getFullYear()
            ];
            if (this.validateDate(activeDay, activeMonth, activeYear)) {
                this.activeDate = new Date(activeYear, activeMonth, activeDay);
                this.calciteActiveDateChange.emit();
            }
        }
    }
    addMonthToActiveDate(step) {
        let [activeDay, activeMonth, activeYear] = [
            this.activeDate.getDate(),
            this.activeDate.getMonth(),
            this.activeDate.getFullYear()
        ];
        activeMonth += step;
        if (activeMonth === 12) {
            activeMonth = 0;
            activeYear += 1;
        }
        if (activeMonth === -1) {
            activeMonth = 11;
            activeYear -= 1;
        }
        if (this.validateDate(activeDay, activeMonth, activeYear)) {
            this.activeDate = new Date(activeYear, activeMonth, activeDay);
            this.calciteActiveDateChange.emit();
        }
    }
    addDaysToActiveDate(step = 0) {
        let [activeDay, activeMonth, activeYear] = [
            this.activeDate.getDate(),
            this.activeDate.getMonth(),
            this.activeDate.getFullYear()
        ];
        activeDay += step;
        let noOfDaysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
        let noOfDaysInPrevMonth = new Date(activeYear, activeMonth, 0).getDate();
        if (activeDay > noOfDaysInMonth) {
            activeDay -= noOfDaysInMonth;
            activeMonth += 1;
            if (activeMonth === 12) {
                activeMonth = 0;
                activeYear += 1;
            }
        }
        if (activeDay < 0) {
            activeDay = noOfDaysInPrevMonth + activeDay;
            activeMonth -= 1;
            if (activeMonth === -1) {
                activeMonth = 11;
                activeYear -= 1;
            }
        }
        if (this.validateDate(activeDay, activeMonth, activeYear)) {
            this.activeDate = new Date(activeYear, activeMonth, activeDay);
            this.calciteActiveDateChange.emit();
        }
    }
    onSelectDate(date) {
        this.selectedDate = new Date(this.year, this.month, date);
        this.calciteDateSelect.emit();
    }
    isSelectedDate(year, month, day) {
        let date = new Date(year, month, day);
        return date.toDateString().substr(0, 10) === this.selectedDate.toDateString().substr(0, 10);
    }
    validateDate(day, month, year) {
        let isValid = true;
        if (this.min) {
            let minYear = this.min.getFullYear();
            let minMonth = this.min.getMonth();
            let minDay = this.min.getDate();
            isValid =
                isValid &&
                    (minYear < year
                        ? true
                        : minYear === year && minMonth < month
                            ? true
                            : minMonth === month && minDay < day
                                ? true
                                : false);
        }
        if (this.max) {
            let maxYear = this.max.getFullYear();
            let maxMonth = this.max.getMonth();
            let maxDay = this.max.getDate();
            isValid =
                isValid &&
                    (maxYear > year
                        ? true
                        : maxYear === year && maxMonth > month
                            ? true
                            : maxMonth === month && maxDay > day
                                ? true
                                : false);
        }
        return isValid;
    }
    getPrevMonthdays(month, year) {
        let startDay = new Date(year, month, 1).getDay(), days = [], prevMonDays = new Date(year, month, 0).getDate();
        if (startDay === this.startOfWeek) {
            return days;
        }
        for (let i = (6 - this.startOfWeek + startDay) % 7; i >= 0; i--) {
            days.push(prevMonDays - i);
        }
        return days;
    }
    getNextMonthdays(month, year) {
        let endDay = new Date(year, month + 1, 0).getDay(), days = [];
        if (endDay === (this.startOfWeek + 6) % 7) {
            return days;
        }
        return [...Array((6 - (endDay - this.startOfWeek)) % 7).keys()];
    }
    getLocalizedWeekday() {
        let w = 1, startWeek = [], endWeek = [], date = new Date();
        for (; w < 8; w++) {
            date.setDate(w);
            let day = new Intl.DateTimeFormat(this.locale, {
                weekday: "short"
            }).format(date);
            date.getDay() === this.startOfWeek || startWeek.length > 0
                ? startWeek.push(day)
                : endWeek.push(day);
        }
        return [...startWeek, ...endWeek];
    }
    get el() { return core.getElement(this); }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}.calender .week-headers{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;border-bottom:1px solid var(--calcite-ui-border-3);border-top:1px solid var(--calcite-ui-border-3)}.calender .week-headers .week-header{color:var(--calcite-ui-text-2);padding:.75rem 0;text-transform:uppercase;font-weight:600;font-size:11px;width:calc(100% / 7);text-align:center}.calender .week-days{outline:none;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row}"; }
};

const CalciteDateMonthHeader = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Month number starting 0 as January for which the calendar is shown.
         */
        this.month = 0;
        /**
         * Year for which the calendar is shown.
         */
        this.year = 0;
        /**
         * pass the locale in which user wants to show the date.
         */
        this.locale = "en-US";
        /**
         * Localized string for previous month.
         */
        this.prevMonthLabel = "";
        /**
         * Localized string for next month.
         */
        this.nextMonthLabel = "";
        this.calciteMonthChange = core.createEvent(this, "calciteMonthChange", 7);
        this.calciteYearChange = core.createEvent(this, "calciteYearChange", 7);
    }
    monthChange() {
        this.calciteMonthChange.emit();
    }
    yearChange() {
        this.calciteYearChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        let localizedMonth = this.getLocalizedMonths()[this.month];
        return (core.h(core.Host, null, core.h("div", { class: "month-year", "aria-hidden": "true" }, core.h("button", { class: "left-icon", "aria-label": this.prevMonthLabel, onClick: () => this.selectPrevMonth() }, core.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", height: "16", width: "16" }, core.h("path", { d: "M11.783 14H9.017l-6-6 6-6h2.766l-6 6z" }))), core.h("div", { class: "month-year-text" }, core.h("span", { class: "month", role: "heading" }, localizedMonth), core.h("input", { class: "year", type: "number", value: this.year, min: this.min && this.min.getFullYear(), max: this.max && this.max.getFullYear(), onChange: event => this.onYearChange(event) })), core.h("button", { class: "right-icon", "aria-label": this.nextMonthLabel, onClick: () => this.selectNextMonth() }, core.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", height: "16", width: "16" }, core.h("path", { d: "M10.217 8l-6-6h2.766l6 6-6 6H4.217z" }))))));
    }
    selectPrevMonth() {
        if (this.month === 0) {
            if (this.validateYear(this.year - 1)) {
                this.year -= 1;
            }
            else {
                return;
            }
        }
        if (this.validateMonth((12 + this.month - 1) % 12, this.year)) {
            this.month = (12 + this.month - 1) % 12;
        }
    }
    selectNextMonth() {
        if (this.month === 11) {
            if (this.validateYear(this.year + 1)) {
                this.year += 1;
            }
            else {
                return;
            }
        }
        if (this.validateMonth((this.month + 1) % 12, this.year)) {
            this.month = (this.month + 1) % 12;
        }
    }
    validateYear(year) {
        let isValid = true;
        if (this.min) {
            isValid = isValid && year >= this.min.getFullYear();
        }
        if (this.max) {
            isValid = isValid && year <= this.max.getFullYear();
        }
        return isValid;
    }
    validateMonth(month, year) {
        let isValid = true;
        if (this.min) {
            isValid =
                isValid &&
                    (this.validateYear(year)
                        ? year === this.min.getFullYear()
                            ? month >= this.min.getMonth()
                            : true
                        : false);
        }
        if (this.max) {
            isValid =
                isValid &&
                    (this.validateYear(year)
                        ? year === this.max.getFullYear()
                            ? month <= this.max.getMonth()
                            : true
                        : false);
        }
        return isValid;
    }
    onYearChange(event) {
        this.year = parseInt(event.target.value);
    }
    getLocalizedMonths() {
        let m = 0, months = [], date = new Date();
        for (; m < 12; m++) {
            date.setMonth(m);
            months.push(new Intl.DateTimeFormat(this.locale, {
                month: "long"
            }).format(date));
        }
        return months;
    }
    get el() { return core.getElement(this); }
    static get watchers() { return {
        "month": ["monthChange"],
        "year": ["yearChange"]
    }; }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}.month-year{display:-ms-flexbox;display:flex}input{font-family:inherit;text-align:center}.left-icon,.right-icon{fill:var(--calcite-ui-text-3);-ms-flex-positive:1;flex-grow:1;outline:none;padding:0;border:none;color:inherit;background-color:var(--calcite-ui-foreground);cursor:pointer;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.left-icon:focus,.left-icon:hover,.right-icon:focus,.right-icon:hover{fill:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-hover)}.left-icon:active,.right-icon:active{background-color:var(--calcite-ui-foreground-pressed)}.month-year-text{padding:.5rem;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-positive:1;flex-grow:1;width:50%;-ms-flex-pack:center;justify-content:center}.month,.year{color:var(--calcite-ui-text-1);background:var(--calcite-ui-foreground);font-size:1rem;line-height:1.5;font-weight:500}.year{border:none;width:60px;padding:0;margin:0}input[type=number]{-moz-appearance:textfield}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none}"; }
};

const CalciteDatePicker = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /**
         * Value of the form control
         */
        this.value = "";
        /**
         * Name of the form control (useful for specifying input/label relationship)
         */
        this.min = "";
        /**
         * Value of the form control
         */
        this.max = "";
        /**
         * Localized string for place holder to the date picker input.
         */
        this.placeholder = "mm/dd/yyyy";
        /**
         * Localized string for previous month.
         */
        this.prevMonthLabel = "";
        /**
         * Localized string for next month.
         */
        this.nextMonthLabel = "";
        /**
         * Sun by default
         * 0: Sunday
         * 1: Monday
         * 2: Tuesday
         * 3: Wednesday
         * 4: Thursday
         * 5: Friday
         * 6: Saturday
         */
        this.startOfWeek = 0;
        /**
         * pass the locale in which user wants to show the date.
         */
        this.locale = "en-GB";
        /**
         * Input as Date
         */
        this.valueAsDate = !isNaN(Date.parse(this.value)) ? this.generateDate(this.value) : null;
        /**
         * Show no input for only calendar popup
         */
        this.noCalendarInput = false;
        /**
         * Expand or collapse when calendar does not have input.
         */
        this.showCalendar = false;
        /**
         * Active date.
         */
        this.activeDate = isNaN(Date.parse(this.value)) ? new Date() : this.generateDate(this.value);
        this.syncThisToProxyInput = () => {
            this.value = this.inputProxy.valueAsDate && this.inputProxy.valueAsDate.toISOString() || "";
            this.min = this.inputProxy.min;
            this.max = this.inputProxy.max;
        };
        this.syncProxyInputToThis = () => {
            this.inputProxy.valueAsDate = this.valueAsDate;
            this.inputProxy.min = this.min;
            this.inputProxy.max = this.max;
        };
        this.calciteDateChange = core.createEvent(this, "calciteDateChange", 7);
    }
    onNameChanged(newValue) {
        if (!isNaN(Date.parse(newValue))) {
            this.valueAsDate = this.generateDate(newValue);
            this.activeDate = this.generateDate(newValue);
        }
    }
    connectedCallback() {
        this.setupProxyInput();
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillRender() {
        this.syncProxyInputToThis();
    }
    render() {
        let selectedDate = this.valueAsDate || new Date();
        return (core.h(core.Host, { role: "application", expanded: this.showCalendar }, !this.noCalendarInput && core.h("div", { class: `date-input-wrapper ${this.showCalendar ? "expanded" : ""}`, role: "application" }, core.h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "calendar-icon", viewBox: "0 0 16 16", width: "16", height: "16" }, core.h("path", { d: "M16 16H0V6h16zM3 7H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM3 10H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM3 13H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM5 2V1h6v1zm9-1v1h1v2H1V2h1V1H0v4h16V1zM4 0H3v2h1zm9 0h-1v2h1z" })), core.h("input", { type: "text", placeholder: this.placeholder, value: this.valueAsDate ? new Intl.DateTimeFormat(this.locale).format(this.valueAsDate) : "", class: "date-input", onFocus: () => this.expandCalendar(), onInput: (e) => this.setDate(e.target) })), this.showCalendar && (core.h("div", { class: "calendar-picker-wrapper" }, core.h("calcite-date-month-header", { month: this.getMonth(), year: this.getYear(), selectedDate: selectedDate, prevMonthLabel: this.prevMonthLabel, nextMonthLabel: this.nextMonthLabel, locale: this.locale, min: this.min ? new Date(this.min) : null, max: this.max ? new Date(this.max) : null, onCalciteMonthChange: e => this.setMonth(e.target), onCalciteYearChange: e => this.setYear(e.target) }), core.h("calcite-date-month", { month: this.getMonth(), year: this.getYear(), min: this.min ? new Date(this.min) : null, max: this.max ? new Date(this.max) : null, selectedDate: selectedDate, activeDate: this.activeDate, startOfWeek: this.startOfWeek, locale: this.locale, onCalciteDateSelect: evt => { this.closeCalendar(); this.setDate(evt.target); }, onCalciteActiveDateChange: evt => this.setActiveDate(evt.target) }))), core.h("slot", null)));
    }
    setActiveDate(target) {
        this.activeDate = target.activeDate;
    }
    expandCalendar() {
        this.showCalendar = true;
    }
    closeCalendar() {
        this.showCalendar = false;
    }
    getMonth() {
        return this.activeDate.getMonth();
    }
    getYear() {
        return this.activeDate.getFullYear();
    }
    setMonth(target) {
        this.activeDate = new Date(this.activeDate.setMonth(target.month));
    }
    setYear(target) {
        this.activeDate = new Date(this.activeDate.setFullYear(target.year));
    }
    setDate(target) {
        this.value = isNaN(Date.parse(target.value)) ? target.selectedDate ? target.selectedDate.toISOString() : this.value
            : target.value;
        this.syncProxyInputToThis();
        this.calciteDateChange.emit();
    }
    setupProxyInput() {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            this.inputProxy.type = "date";
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
        {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    }
    generateDate(dateString) {
        let date = new Date(dateString);
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    }
    get el() { return core.getElement(this); }
    static get watchers() { return {
        "value": ["onNameChanged"]
    }; }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}::slotted(input){display:none}:host{display:inline-block;vertical-align:top}:host .date-input-wrapper{border:1px solid var(--calcite-ui-border-1);position:relative}:host .date-input-wrapper.expanded{border:none;border-bottom:1px solid var(--calcite-ui-border-1)}:host .date-input-wrapper.open,:host .date-input-wrapper:active,:host .date-input-wrapper:focus{border-color:transparent;border-bottom:1px solid var(--calcite-ui-border-1)}:host .date-input-wrapper .calendar-icon{fill:var(--calcite-ui-text-3);position:absolute;top:.8333333333rem;left:1.3043478261rem}:host .date-input-wrapper .date-input{color:var(--calcite-ui-text-3);background:var(--calcite-ui-foreground);-webkit-box-sizing:border-box;box-sizing:border-box;border:none;font-weight:400;font-size:16px;font-family:inherit;padding:.75rem;width:100%;margin:0;padding-left:3rem}:host .date-input-wrapper .date-input:active,:host .date-input-wrapper .date-input:focus{outline:none}:host .date-input-wrapper .date-input::-webkit-calendar-picker-indicator,:host .date-input-wrapper .date-input::-webkit-inner-spin-button{display:none;-webkit-appearance:none}:host([expanded]){background-color:var(--calcite-ui-foreground);border-radius:var(--calcite-border-radius);border:1px solid var(--calcite-ui-border-2);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.16);box-shadow:0 0 16px 0 rgba(0,0,0,.16);overflow:hidden}"; }
};

exports.calcite_date_day = CalciteDateDay;
exports.calcite_date_month = CalciteDateMonth;
exports.calcite_date_month_header = CalciteDateMonthHeader;
exports.calcite_date_picker = CalciteDatePicker;
