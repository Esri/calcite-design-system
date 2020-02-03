import { Host, h } from "@stencil/core";
export class CalciteDateMonthHeader {
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
        return (h(Host, null,
            h("div", { class: "month-year", "aria-hidden": "true" },
                h("button", { class: "left-icon", "aria-label": this.prevMonthLabel, onClick: () => this.selectPrevMonth() },
                    h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", height: "16", width: "16" },
                        h("path", { d: "M11.783 14H9.017l-6-6 6-6h2.766l-6 6z" }))),
                h("div", { class: "month-year-text" },
                    h("span", { class: "month", role: "heading" }, localizedMonth),
                    h("input", { class: "year", type: "number", value: this.year, min: this.min && this.min.getFullYear(), max: this.max && this.max.getFullYear(), onChange: event => this.onYearChange(event) })),
                h("button", { class: "right-icon", "aria-label": this.nextMonthLabel, onClick: () => this.selectNextMonth() },
                    h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", height: "16", width: "16" },
                        h("path", { d: "M10.217 8l-6-6h2.766l6 6-6 6H4.217z" }))))));
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
    static get is() { return "calcite-date-month-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-date-month-header.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-date-month-header.css"]
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
                "text": "pass the locale in which user wants to show the date."
            },
            "attribute": "locale",
            "reflect": false,
            "defaultValue": "\"en-US\""
        },
        "prevMonthLabel": {
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
                "text": "Localized string for previous month."
            },
            "attribute": "prev-month-label",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "nextMonthLabel": {
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
                "text": "Localized string for next month."
            },
            "attribute": "next-month-label",
            "reflect": false,
            "defaultValue": "\"\""
        }
    }; }
    static get events() { return [{
            "method": "calciteMonthChange",
            "name": "calciteMonthChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event triggered when user change month."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteYearChange",
            "name": "calciteYearChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event triggered when user change year."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "month",
            "methodName": "monthChange"
        }, {
            "propName": "year",
            "methodName": "yearChange"
        }]; }
}
