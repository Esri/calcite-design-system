import { Component, Element, Prop, Host, Event, h, Listen, } from "@stencil/core";
import { getFirstDayOfWeek, getLocalizedWeekdays } from "../../utils/locale";
import { inRange, sameDate, dateFromRange } from "../../utils/date";
import { getKey } from "../../utils/key";
export class CalciteDateMonth {
    constructor() {
        /** Date currently active.*/
        this.activeDate = new Date();
        /** User's language and region as BCP 47 formatted string. */
        this.locale = "en-US";
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
        const isRTL = this.el.dir === "rtl";
        switch (getKey(e.key)) {
            case "ArrowUp":
                e.preventDefault();
                this.addDays(-7);
                break;
            case "ArrowRight":
                e.preventDefault();
                this.addDays(isRTL ? -1 : 1);
                break;
            case "ArrowDown":
                e.preventDefault();
                this.addDays(7);
                break;
            case "ArrowLeft":
                e.preventDefault();
                this.addDays(isRTL ? 1 : -1);
                break;
            case "PageUp":
                e.preventDefault();
                this.addMonths(-1);
                break;
            case "PageDown":
                e.preventDefault();
                this.addMonths(1);
                break;
            case "Home":
                e.preventDefault();
                this.activeDate.setDate(1);
                this.addDays();
                break;
            case "End":
                e.preventDefault();
                this.activeDate.setDate(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate());
                this.addDays();
                break;
            case "Enter":
            case " ":
                e.preventDefault();
                this.calciteDateSelect.emit(this.activeDate);
                break;
            case "Tab":
                this.activeFocus = false;
        }
    }
    /**
     * Once user is not interacting via keyboard,
     * disable auto focusing of active date
     */
    disableActiveFocus() {
        this.activeFocus = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const month = this.activeDate.getMonth();
        const year = this.activeDate.getFullYear();
        const startOfWeek = getFirstDayOfWeek(this.locale);
        const weekDays = getLocalizedWeekdays(this.locale, this.scale === "s" ? "narrow" : "short");
        const curMonDays = this.getCurrentMonthDays(month, year);
        const prevMonDays = this.getPrevMonthdays(month, year, startOfWeek);
        const nextMonDays = this.getNextMonthDays(month, year, startOfWeek);
        const days = [
            ...prevMonDays.map((day) => {
                const date = new Date(year, month - 1, day);
                return (h("calcite-date-day", { scale: this.scale, day: day, disabled: !inRange(date, this.min, this.max), selected: sameDate(date, this.selectedDate), onCalciteDaySelect: () => this.calciteDateSelect.emit(date), locale: this.locale }));
            }),
            ...curMonDays.map((day) => {
                const date = new Date(year, month, day);
                const active = sameDate(date, this.activeDate);
                return (h("calcite-date-day", { scale: this.scale, day: day, disabled: !inRange(date, this.min, this.max), selected: sameDate(date, this.selectedDate), active: active, onCalciteDaySelect: () => this.calciteDateSelect.emit(date), locale: this.locale, ref: (el) => {
                        // when moving via keyboard, focus must be updated on active date
                        if (active && this.activeFocus) {
                            el === null || el === void 0 ? void 0 : el.focus();
                        }
                    }, "current-month": true }));
            }),
            ...nextMonDays.map((day) => {
                const date = new Date(year, month + 1, day);
                return (h("calcite-date-day", { scale: this.scale, day: day, disabled: !inRange(date, this.min, this.max), selected: sameDate(date, this.selectedDate), onCalciteDaySelect: () => this.calciteDateSelect.emit(date), locale: this.locale }));
            }),
        ];
        const weeks = [];
        for (let i = 0; i < days.length; i += 7) {
            weeks.push(days.slice(i, i + 7));
        }
        return (h(Host, null,
            h("div", { class: "calender", role: "grid" },
                h("div", { class: "week-headers", role: "row" }, weekDays.map((weekday) => (h("span", { class: "week-header", role: "columnheader" }, weekday)))),
                weeks.map((days) => (h("div", { class: "week-days", role: "row" }, days))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Add n months to the current month
     */
    addMonths(step) {
        const nextDate = new Date(this.activeDate);
        nextDate.setMonth(this.activeDate.getMonth() + step);
        this.calciteActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
        this.activeFocus = true;
    }
    /**
     * Add n days to the current date
     */
    addDays(step = 0) {
        const nextDate = new Date(this.activeDate);
        nextDate.setDate(this.activeDate.getDate() + step);
        this.calciteActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
        this.activeFocus = true;
    }
    /**
     * Get dates for last days of the previous month
     */
    getPrevMonthdays(month, year, startOfWeek) {
        const lastDate = new Date(year, month, 0);
        const date = lastDate.getDate();
        const day = lastDate.getDay();
        const days = [];
        if (day - 6 === startOfWeek) {
            return days;
        }
        for (let i = lastDate.getDay(); i >= startOfWeek; i--) {
            days.push(date - i);
        }
        return days;
    }
    /**
     * Get dates for the current month
     */
    getCurrentMonthDays(month, year) {
        const num = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < num; i++) {
            days.push(i + 1);
        }
        return days;
    }
    /**
     * Get dates for first days of the next month
     */
    getNextMonthDays(month, year, startOfWeek) {
        const endDay = new Date(year, month + 1, 0).getDay();
        const days = [];
        if (endDay === (startOfWeek + 6) % 7) {
            return days;
        }
        for (let i = 0; i < (6 - (endDay - startOfWeek)) % 7; i++) {
            days.push(i + 1);
        }
        return days;
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
            },
            "defaultValue": "new Date()"
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
                "text": "User's language and region as BCP 47 formatted string."
            },
            "attribute": "locale",
            "reflect": false,
            "defaultValue": "\"en-US\""
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"s\" | \"m\" | \"l\"",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the scale of the date picker"
            },
            "attribute": "scale",
            "reflect": true
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
            "name": "focusout",
            "method": "disableActiveFocus",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
