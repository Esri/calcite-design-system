import { h, Host, Build } from "@stencil/core";
export class CalciteDatePicker {
    constructor() {
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
        return (h(Host, { role: "application", expanded: this.showCalendar },
            !this.noCalendarInput && h("div", { class: `date-input-wrapper ${this.showCalendar ? "expanded" : ""}`, role: "application" },
                h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "calendar-icon", viewBox: "0 0 16 16", width: "16", height: "16" },
                    h("path", { d: "M16 16H0V6h16zM3 7H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM3 10H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM3 13H1v2h2zm3 0H4v2h2zm3 0H7v2h2zm3 0h-2v2h2zm3 0h-2v2h2zM5 2V1h6v1zm9-1v1h1v2H1V2h1V1H0v4h16V1zM4 0H3v2h1zm9 0h-1v2h1z" })),
                h("input", { type: "text", placeholder: this.placeholder, value: this.valueAsDate ? new Intl.DateTimeFormat(this.locale).format(this.valueAsDate) : "", class: "date-input", onFocus: () => this.expandCalendar(), onInput: (e) => this.setDate(e.target) })),
            this.showCalendar && (h("div", { class: "calendar-picker-wrapper" },
                h("calcite-date-month-header", { month: this.getMonth(), year: this.getYear(), selectedDate: selectedDate, prevMonthLabel: this.prevMonthLabel, nextMonthLabel: this.nextMonthLabel, locale: this.locale, min: this.min ? new Date(this.min) : null, max: this.max ? new Date(this.max) : null, onCalciteMonthChange: e => this.setMonth(e.target), onCalciteYearChange: e => this.setYear(e.target) }),
                h("calcite-date-month", { month: this.getMonth(), year: this.getYear(), min: this.min ? new Date(this.min) : null, max: this.max ? new Date(this.max) : null, selectedDate: selectedDate, activeDate: this.activeDate, startOfWeek: this.startOfWeek, locale: this.locale, onCalciteDateSelect: evt => { this.closeCalendar(); this.setDate(evt.target); }, onCalciteActiveDateChange: evt => this.setActiveDate(evt.target) }))),
            h("slot", null)));
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
        if (Build.isBrowser) {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    }
    generateDate(dateString) {
        let date = new Date(dateString);
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    }
    static get is() { return "calcite-date-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-date-picker.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-date-picker.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Value of the form control"
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "\"\""
        },
        "min": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Name of the form control (useful for specifying input/label relationship)"
            },
            "attribute": "min",
            "reflect": true,
            "defaultValue": "\"\""
        },
        "max": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Value of the form control"
            },
            "attribute": "max",
            "reflect": true,
            "defaultValue": "\"\""
        },
        "placeholder": {
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
                "text": "Localized string for place holder to the date picker input."
            },
            "attribute": "placeholder",
            "reflect": true,
            "defaultValue": "\"mm/dd/yyyy\""
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
            "optional": true,
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
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Localized string for next month."
            },
            "attribute": "next-month-label",
            "reflect": false,
            "defaultValue": "\"\""
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
            "optional": true,
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
            "optional": true,
            "docs": {
                "tags": [],
                "text": "pass the locale in which user wants to show the date."
            },
            "attribute": "locale",
            "reflect": false,
            "defaultValue": "\"en-GB\""
        },
        "valueAsDate": {
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
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Input as Date"
            },
            "defaultValue": "!isNaN(Date.parse(this.value)) ? this.generateDate(this.value) : null"
        },
        "noCalendarInput": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Show no input for only calendar popup"
            },
            "attribute": "no-calendar-input",
            "reflect": false,
            "defaultValue": "false"
        },
        "showCalendar": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Expand or collapse when calendar does not have input."
            },
            "attribute": "show-calendar",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "activeDate": {}
    }; }
    static get events() { return [{
            "method": "calciteDateChange",
            "name": "calciteDateChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Trigger calcite date change when a user changes the date."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "onNameChanged"
        }]; }
    static get listeners() { return [{
            "name": "blur",
            "method": "closeCalendar",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
