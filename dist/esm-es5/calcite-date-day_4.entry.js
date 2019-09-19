import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-26bd2899.js';
import { S as SPACE, E as ENTER, U as UP, R as RIGHT, D as DOWN, L as LEFT, P as PAGE_UP, a as PAGE_DOWN, H as HOME, b as END, c as ESCAPE } from './keys-6415f679.js';
var CalciteDateDay = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
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
        this.calciteDaySelect = createEvent(this, "calciteDaySelect", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.componentWillUpdate = function () { };
    class_1.prototype.render = function () {
        return (h(Host, { class: (this.active ? "active" : "") + "\n        " + (this.enable ? "enabled" : "disabled") + "\n        " + (this.selected ? "selected-day" : ""), role: "gridcell", tabindex: this.selected || this.active ? 0 : -1 }, h("span", { class: "day" }, this.day)));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    class_1.prototype.onClick = function () {
        this.enable && (this.selected = true) && this.calciteDaySelect.emit();
    };
    class_1.prototype.keyDownHandler = function (e) {
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            this.enable && (this.selected = true) && this.calciteDaySelect.emit();
        }
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{outline:none;color:#6a6a6a;padding:.3rem .4rem;cursor:pointer;width:calc(100% / 7)}:host,:host .day{display:-ms-flexbox;display:flex}:host .day{width:100%;border-radius:100%;font-size:14px;font-weight:500;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;height:2rem;width:2rem}:host(.active) .day,:host(:focus) .day,:host(:hover) .day{background-color:#eaeaea;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;color:#151515}:host(.selected-day) .day,:host(:focus.active) .day{-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:#007ac2;border-radius:100%;color:#fff;font-weight:500}:host(.disabled){cursor:default}:host(.active) .disabled .day,:host(.disabled) .day,:host(:hover) .disabled .day{color:#bfbfbf;background:none}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
var CalciteDateMonth = /** @class */ (function () {
    function class_2(hostRef) {
        registerInstance(this, hostRef);
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
        this.calciteDateSelect = createEvent(this, "calciteDateSelect", 7);
        this.calciteActiveDateChange = createEvent(this, "calciteActiveDateChange", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_2.prototype.componentWillUpdate = function () { };
    class_2.prototype.render = function () {
        var _this = this;
        var weekDays = this.getLocalizedWeekday(), curMonDays = Array(new Date(this.year, this.month + 1, 0).getDate()).keys().slice(), prevMonDays = this.getPrevMonthdays(this.month, this.year), nextMonDays = this.getNextMonthdays(this.month, this.year), splitDays = [], days = prevMonDays.map(function (prev) { return (h("calcite-date-day", { day: prev, enable: false })); }).concat(curMonDays.map(function (cur) { return (h("calcite-date-day", { day: cur + 1, enable: _this.validateDate(cur + 1, _this.month, _this.year), selected: _this.isSelectedDate(_this.year, _this.month, cur + 1), active: _this.activeDate.getDate() === cur + 1, onCalciteDaySelect: function () { return _this.onSelectDate(cur + 1); } })); }), nextMonDays.map(function (next) { return (h("calcite-date-day", { day: next + 1, enable: false })); }));
        for (var i = 0; i < days.length; i += 7)
            splitDays.push(days.slice(i, i + 7));
        return (h(Host, null, h("div", { class: "calender", role: "grid" }, h("div", { class: "week-headers", role: "presentation" }, weekDays.map(function (weekday) { return (h("span", { class: "week-header", role: "columnheader" }, weekday)); })), splitDays.map(function (days) { return (h("div", { class: "week-days", role: "row" }, days)); }))));
    };
    class_2.prototype.keyDownHandler = function (e) {
        switch (e.keyCode) {
            case UP:
                e.preventDefault();
                this.addDaysToActiveDate(-7);
                break;
            case RIGHT:
                e.preventDefault();
                this.addDaysToActiveDate(1);
                break;
            case DOWN:
                e.preventDefault();
                this.addDaysToActiveDate(7);
                break;
            case LEFT:
                e.preventDefault();
                this.addDaysToActiveDate(-1);
                break;
            case PAGE_UP:
                e.preventDefault();
                this.addMonthToActiveDate(-1);
                break;
            case PAGE_DOWN:
                e.preventDefault();
                this.addMonthToActiveDate(1);
                break;
            case HOME:
                e.preventDefault();
                this.activeDate.setDate(1);
                this.addDaysToActiveDate();
                break;
            case END:
                e.preventDefault();
                this.activeDate.setDate(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate());
                this.addDaysToActiveDate();
                break;
            case ENTER:
            case SPACE:
                e.preventDefault();
                this.selectedDate = new Date(this.activeDate);
                this.calciteDateSelect.emit();
                break;
            case ESCAPE:
                e.preventDefault();
                this.activeDate = new Date(this.selectedDate);
                this.calciteActiveDateChange.emit();
                break;
        }
    };
    class_2.prototype.mouseoverHandler = function (e) {
        var day = e.target.day || this.activeDate.getDate();
        if (day != this.activeDate.getDate()) {
            var _a = [
                day,
                this.activeDate.getMonth(),
                this.activeDate.getFullYear()
            ], activeDay = _a[0], activeMonth = _a[1], activeYear = _a[2];
            if (this.validateDate(activeDay, activeMonth, activeYear)) {
                this.activeDate = new Date(activeYear, activeMonth, activeDay);
                this.calciteActiveDateChange.emit();
            }
        }
    };
    class_2.prototype.addMonthToActiveDate = function (step) {
        var _a = [
            this.activeDate.getDate(),
            this.activeDate.getMonth(),
            this.activeDate.getFullYear()
        ], activeDay = _a[0], activeMonth = _a[1], activeYear = _a[2];
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
    };
    class_2.prototype.addDaysToActiveDate = function (step) {
        if (step === void 0) { step = 0; }
        var _a = [
            this.activeDate.getDate(),
            this.activeDate.getMonth(),
            this.activeDate.getFullYear()
        ], activeDay = _a[0], activeMonth = _a[1], activeYear = _a[2];
        activeDay += step;
        var noOfDaysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
        var noOfDaysInPrevMonth = new Date(activeYear, activeMonth, 0).getDate();
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
    };
    class_2.prototype.onSelectDate = function (date) {
        this.selectedDate = new Date(this.year, this.month, date);
        this.calciteDateSelect.emit();
    };
    class_2.prototype.isSelectedDate = function (year, month, day) {
        var date = new Date(year, month, day);
        return date.toDateString() === this.selectedDate.toDateString();
    };
    class_2.prototype.validateDate = function (day, month, year) {
        var isValid = true;
        if (this.min) {
            var minYear = this.min.getFullYear();
            var minMonth = this.min.getMonth();
            var minDay = this.min.getDate();
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
            var maxYear = this.max.getFullYear();
            var maxMonth = this.max.getMonth();
            var maxDay = this.max.getDate();
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
    };
    class_2.prototype.getPrevMonthdays = function (month, year) {
        var startDay = new Date(year, month, 1).getDay(), days = [], prevMonDays = new Date(year, month, 0).getDate();
        if (startDay === this.startOfWeek) {
            return days;
        }
        for (var i = (6 - this.startOfWeek + startDay) % 7; i >= 0; i--) {
            days.push(prevMonDays - i);
        }
        return days;
    };
    class_2.prototype.getNextMonthdays = function (month, year) {
        var endDay = new Date(year, month + 1, 0).getDay(), days = [];
        if (endDay === (this.startOfWeek + 6) % 7) {
            return days;
        }
        return Array((6 - (endDay - this.startOfWeek)) % 7).keys().slice();
    };
    class_2.prototype.getLocalizedWeekday = function () {
        var w = 1, startWeek = [], endWeek = [], date = new Date();
        for (; w < 8; w++) {
            date.setDate(w);
            var day = new Intl.DateTimeFormat(this.locale, {
                weekday: "short"
            }).format(date);
            date.getDay() === this.startOfWeek || startWeek.length > 0
                ? startWeek.push(day)
                : endWeek.push(day);
        }
        return startWeek.concat(endWeek);
    };
    Object.defineProperty(class_2.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_2, "style", {
        get: function () { return ":host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.calender .week-headers{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;border-bottom:1px solid #f3f3f3;border-top:1px solid #f3f3f3}.calender .week-headers .week-header{color:#555;padding:.75rem 0;text-transform:uppercase;font-weight:600;font-size:11px;width:calc(100% / 7);text-align:center}.calender .week-days{outline:none;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row}"; },
        enumerable: true,
        configurable: true
    });
    return class_2;
}());
var CalciteDateMonth$1 = /** @class */ (function () {
    function class_3(hostRef) {
        registerInstance(this, hostRef);
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
        this.calciteMonthChange = createEvent(this, "calciteMonthChange", 7);
        this.calciteYearChange = createEvent(this, "calciteYearChange", 7);
    }
    class_3.prototype.monthChange = function () {
        this.calciteMonthChange.emit();
    };
    class_3.prototype.yearChange = function () {
        this.calciteYearChange.emit();
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_3.prototype.componentWillUpdate = function () { };
    class_3.prototype.render = function () {
        var _this = this;
        var localizedMonth = this.getLocalizedMonths()[this.month];
        return (h(Host, null, h("div", { class: "month-year", "aria-hidden": "true" }, h("button", { class: "left-icon", "aria-label": this.prevMonthLabel, onClick: function () { return _this.selectPrevMonth(); }, onKeyDown: function (event) { return _this.selectPrevMonthOnEnter(event); } }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", height: "16", width: "16" }, h("path", { d: "M11.783 14H9.017l-6-6 6-6h2.766l-6 6z" }))), h("div", { class: "month-year-text" }, h("span", { class: "month", role: "heading" }, localizedMonth), h("input", { class: "year", type: "number", value: this.year, min: this.min && this.min.getFullYear(), max: this.max && this.max.getFullYear(), onChange: function (event) { return _this.onYearChange(event); } })), h("button", { class: "right-icon", "aria-label": this.nextMonthLabel, onClick: function () { return _this.selectNextMonth(); }, onKeyDown: function (event) { return _this.selectNextMonthOnEnter(event); } }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", height: "16", width: "16" }, h("path", { d: "M10.217 8l-6-6h2.766l6 6-6 6H4.217z" }))))));
    };
    class_3.prototype.selectPrevMonth = function () {
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
    };
    class_3.prototype.selectPrevMonthOnEnter = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.selectPrevMonth();
        }
    };
    class_3.prototype.selectNextMonth = function () {
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
    };
    class_3.prototype.selectNextMonthOnEnter = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.selectNextMonth();
        }
    };
    class_3.prototype.validateYear = function (year) {
        var isValid = true;
        if (this.min) {
            isValid = isValid && year >= this.min.getFullYear();
        }
        if (this.max) {
            isValid = isValid && year <= this.max.getFullYear();
        }
        return isValid;
    };
    class_3.prototype.validateMonth = function (month, year) {
        var isValid = true;
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
    };
    class_3.prototype.onYearChange = function (event) {
        this.year = parseInt(event.target.value);
    };
    class_3.prototype.getLocalizedMonths = function () {
        var m = 0, months = [], date = new Date();
        for (; m < 12; m++) {
            date.setMonth(m);
            months.push(new Intl.DateTimeFormat(this.locale, {
                month: "long"
            }).format(date));
        }
        return months;
    };
    Object.defineProperty(class_3.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_3, "watchers", {
        get: function () {
            return {
                "month": ["monthChange"],
                "year": ["yearChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_3, "style", {
        get: function () { return ":host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.month-year{display:-ms-flexbox;display:flex}input{font-family:inherit;text-align:center}.left-icon,.right-icon{fill:#bfbfbf;-ms-flex-positive:1;flex-grow:1;outline:none;padding:0;border:none;color:inherit;background-color:transparent;cursor:pointer;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.left-icon:focus,.left-icon:hover,.right-icon:focus,.right-icon:hover{fill:#000;background-color:#f3f3f3}.left-icon:active,.right-icon:active{background-color:#eaeaea}.month-year-text{padding:.5rem;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-positive:1;flex-grow:1;width:50%;-ms-flex-pack:center;justify-content:center}.month,.year{color:#000;font-size:1rem;line-height:1.5;font-weight:500}.year{border:none;width:60px;padding:0;margin:0}"; },
        enumerable: true,
        configurable: true
    });
    return class_3;
}());
var CalciteDatePicker = /** @class */ (function () {
    function class_4(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
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
        this.locale = "en-US";
        /**
         * Expanded state of the calander.
         */
        this.showCalendar = false;
        /**
         * Active date.
         */
        this.activeDate = new Date(this.value) || new Date();
        this.syncThisToProxyInput = function () {
            _this.value = new Intl.DateTimeFormat(_this.locale).format(new Date(_this.inputProxy.value + " "));
            _this.min = _this.inputProxy.min;
            _this.max = _this.inputProxy.max;
        };
        this.syncProxyInputToThis = function () {
            _this.inputProxy.value = new Date(_this.value + " ")
                .toISOString()
                .substr(0, 10);
            _this.inputProxy.min = _this.min;
            _this.inputProxy.max = _this.max;
        };
        this.calciteDateChange = createEvent(this, "calciteDateChange", 7);
    }
    class_4.prototype.connectedCallback = function () {
        this.setupProxyInput();
    };
    class_4.prototype.disconnectedCallback = function () {
        this.observer.disconnect();
    };
    class_4.prototype.componentWillRender = function () {
        this.syncProxyInputToThis();
    };
    class_4.prototype.render = function () {
        var _this = this;
        var selectedDate = this.value ? new Date("" + this.value) : new Date();
        return (h(Host, { role: "application", expanded: this.showCalendar, onBlur: function () { return _this.closeCalendar(); } }, h("div", { class: "date-input-wrapper " + (this.showCalendar ? "expanded" : ""), role: "application" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "calendar-icon", viewBox: "0 0 16 16", width: "16", height: "16" }, h("path", { d: "M16 16H0V6h16zM3 7H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM3 10H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM3 13H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM5 2V1h6v1zm9-1v1h1v2H1V2h1V1H0v4h16V1zM4 0H3v2h1zm9 0h-1v2h1z" })), h("input", { type: "text", placeholder: "dd/mm/yyyy", value: this.value, class: "date-input", onFocus: function () { return _this.expandCalendar(); } })), this.showCalendar && (h("div", { class: "calendar-picker-wrapper" }, h("calcite-date-month-header", { month: this.getMonth(), year: this.getYear(), selectedDate: selectedDate, prevMonthLabel: this.prevMonthLabel, nextMonthLabel: this.nextMonthLabel, locale: this.locale, min: this.min ? new Date(this.min) : null, max: this.max ? new Date(this.max) : null, onCalciteMonthChange: function (e) { return _this.setMonth(e.target); }, onCalciteYearChange: function (e) { return _this.setYear(e.target); } }), h("calcite-date-month", { month: this.getMonth(), year: this.getYear(), min: this.min ? new Date(this.min) : null, max: this.max ? new Date(this.max) : null, selectedDate: selectedDate, activeDate: this.activeDate, startOfWeek: this.startOfWeek, locale: this.locale, onCalciteDateSelect: function (evt) { return _this.setDate(evt.target); }, onCalciteActiveDateChange: function (evt) { return _this.setActiveDate(evt.target); } }))), h("slot", null)));
    };
    class_4.prototype.setActiveDate = function (target) {
        this.activeDate = new Date(target.activeDate);
    };
    class_4.prototype.expandCalendar = function () {
        this.showCalendar = true;
    };
    class_4.prototype.closeCalendar = function () {
        this.showCalendar = true;
    };
    class_4.prototype.getMonth = function () {
        return this.activeDate.getMonth();
    };
    class_4.prototype.getYear = function () {
        return this.activeDate.getFullYear();
    };
    class_4.prototype.setMonth = function (target) {
        this.activeDate = new Date(this.activeDate.setMonth(target.month));
    };
    class_4.prototype.setYear = function (target) {
        this.activeDate = new Date(this.activeDate.setFullYear(target.year));
    };
    class_4.prototype.setDate = function (target) {
        // Set date to in dd/mm/yyyy format.
        this.activeDate = new Date(target.selectedDate);
        this.value = target.selectedDate.toISOString().substr(0, 10);
        this.syncProxyInputToThis();
        this.calciteDateChange.emit();
    };
    class_4.prototype.setupProxyInput = function () {
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
        this.observer = new MutationObserver(this.syncThisToProxyInput);
        this.observer.observe(this.inputProxy, { attributes: true });
    };
    Object.defineProperty(class_4.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_4, "style", {
        get: function () { return ":host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}::slotted(input){display:none}:host{display:inline-block;vertical-align:top}:host .date-input-wrapper{border:1px solid #dfdfdf;position:relative}:host .date-input-wrapper.expanded{border:none;border-bottom:1px solid #dfdfdf}:host .date-input-wrapper.open,:host .date-input-wrapper:active,:host .date-input-wrapper:focus{border-color:transparent;border-bottom:1px solid #dfdfdf}:host .date-input-wrapper .calendar-icon{fill:grey;position:absolute;top:.8333333333rem;left:1.3043478261rem}:host .date-input-wrapper .date-input{color:#555;-webkit-box-sizing:border-box;box-sizing:border-box;border:none;font-weight:400;font-size:16px;font-family:inherit;padding:.75rem;width:100%;margin:0;padding-left:3rem}:host .date-input-wrapper .date-input:active,:host .date-input-wrapper .date-input:focus{outline:none}:host([expanded]){background-color:#fff;border:1px solid #dfdfdf;-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15)}"; },
        enumerable: true,
        configurable: true
    });
    return class_4;
}());
export { CalciteDateDay as calcite_date_day, CalciteDateMonth as calcite_date_month, CalciteDateMonth$1 as calcite_date_month_header, CalciteDatePicker as calcite_date_picker };
