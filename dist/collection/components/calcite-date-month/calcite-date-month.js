import { Host, h } from "@stencil/core";
import { LEFT, RIGHT, UP, DOWN, PAGE_UP, PAGE_DOWN, HOME, END, ENTER, SPACE, ESCAPE } from "../../utils/keys";
export class CalciteDateMonth {
    constructor() {
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
            ...prevMonDays.map(prev => (h("calcite-date-day", { day: prev, enable: false }))),
            ...curMonDays.map(cur => (h("calcite-date-day", { day: cur + 1, enable: this.validateDate(cur + 1, this.month, this.year), selected: this.isSelectedDate(this.year, this.month, cur + 1), active: this.activeDate.getDate() === cur + 1, onCalciteDaySelect: () => this.onSelectDate(cur + 1) }))),
            ...nextMonDays.map(next => (h("calcite-date-day", { day: next + 1, enable: false })))
        ];
        for (let i = 0; i < days.length; i += 7)
            splitDays.push(days.slice(i, i + 7));
        return (h(Host, null,
            h("div", { class: "calender", role: "grid" },
                h("div", { class: "week-headers", role: "presentation" }, weekDays.map(weekday => (h("span", { class: "week-header", role: "columnheader" }, weekday)))),
                splitDays.map(days => (h("div", { class: "week-days", role: "row" }, days))))));
    }
    keyDownHandler(e) {
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
                this.selectedDate = this.activeDate;
                this.calciteDateSelect.emit();
                break;
            case ESCAPE:
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
    static get is() { return "calcite-date-month"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-date-month.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-date-month.css"]
    }; }
    static get properties() { return {
        "month": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Month number starting 0 as January for which the calendar is shown."
            },
            "attribute": "month",
            "reflect": false,
            "defaultValue": "0"
        },
        "year": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Year for which the calendar is shown."
            },
            "attribute": "year",
            "reflect": false,
            "defaultValue": "0"
        },
        "selectedDate": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Already selected date."
            }
        },
        "activeDate": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Date currently active."
            }
        },
        "min": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Minimum date of the calendar below which is disabled."
            }
        },
        "max": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Maximum date of the calendar above which is disabled."
            }
        },
        "startOfWeek": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Sun by default\n0: Sunday\n1: Monday\n2: Tuesday\n3: Wednesday\n4: Thursday\n5: Friday\n6: Saturday"
            },
            "attribute": "start-of-week",
            "reflect": false,
            "defaultValue": "0"
        },
        "locale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "pass the locale in which user wants to show the date."
            },
            "attribute": "locale",
            "reflect": false,
            "defaultValue": "\"en-US\""
        }
    }; }
    static get events() { return [{
            "method": "calciteDateSelect",
            "name": "calciteDateSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event emitted when user selects the date."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteActiveDateChange",
            "name": "calciteActiveDateChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Active date for the user keyboard access."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "mouseover",
            "method": "mouseoverHandler",
            "target": undefined,
            "capture": false,
            "passive": true
        }]; }
}
