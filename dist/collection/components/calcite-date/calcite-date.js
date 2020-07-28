import { Component, h, Prop, Event, Element, Host, State, Listen, Build, } from "@stencil/core";
import { parseDateString, getLocaleFormatData, } from "../../utils/locale";
import { getElementDir } from "../../utils/dom";
import { dateFromRange, inRange, dateFromISO, dateToISO, } from "../../utils/date";
import { getKey } from "../../utils/key";
import { TEXT } from "./calcite-date-resources";
export class CalciteDate {
    constructor() {
        /** Expand or collapse when calendar does not have input */
        this.active = false;
        /** Localized string for "previous month" */
        this.intlPrevMonth = TEXT.prevMonth;
        /** Localized string for "next month" */
        this.intlNextMonth = TEXT.nextMonth;
        /** BCP 47 language tag for desired language and country format */
        this.locale = "en-US";
        /** Show only calendar popup */
        this.noCalendarInput = false;
        /** specify the scale of the date picker */
        this.scale = "m";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.localeData = getLocaleFormatData(this.locale);
        this.hasShadow = Build.isBrowser && !!document.head.attachShadow;
        /**
         * Update component based on input proxy
         */
        this.syncThisToProxyInput = () => {
            this.min = this.inputProxy.min;
            this.max = this.inputProxy.max;
            const min = dateFromISO(this.min);
            const max = dateFromISO(this.max);
            const date = dateFromISO(this.inputProxy.value);
            this.valueAsDate = dateFromRange(date, min, max);
            this.value = dateToISO(this.valueAsDate);
        };
        /**
         * Update input proxy
         */
        this.syncProxyInputToThis = () => {
            if (this.inputProxy) {
                this.inputProxy.value = this.value || "";
                if (this.min) {
                    this.inputProxy.min = this.min;
                }
                if (this.max) {
                    this.inputProxy.max = this.max;
                }
            }
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    focusOutHandler() {
        this.reset();
    }
    /**
     * Blur doesn't fire properly when there is no shadow dom (ege/IE11)
     * Check if the focused element is inside the date picker, if not close
     */
    focusInHandler(e) {
        if (!this.hasShadow && !this.el.contains(e.srcElement)) {
            this.reset();
        }
    }
    keyDownHandler(e) {
        if (getKey(e.key) === "Escape") {
            this.reset();
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
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
        const min = dateFromISO(this.min);
        const max = dateFromISO(this.max);
        const date = dateFromRange(this.valueAsDate, min, max);
        const activeDate = this.getActiveDate(date, min, max);
        const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
        const dir = getElementDir(this.el);
        return (h(Host, { role: "application", dir: dir },
            h("div", { class: "slot" },
                h("slot", null)),
            !this.noCalendarInput && (h("div", { role: "application" },
                h("calcite-input", { type: "text", value: formattedDate, placeholder: this.localeData.placeholder, icon: "calendar", onCalciteInputFocus: () => (this.active = true), onCalciteInputInput: (e) => this.input(e.detail.value), onCalciteInputBlur: (e) => this.blur(e.detail), scale: this.scale, "number-button-type": "none", class: "input" }))),
            h("div", { class: "calendar-picker-wrapper" },
                h("calcite-date-month-header", { activeDate: activeDate, selectedDate: date || new Date(), intlPrevMonth: this.intlPrevMonth, intlNextMonth: this.intlNextMonth, locale: this.locale, min: min, max: max, onCalciteActiveDateChange: (e) => {
                        this.activeDate = new Date(e.detail);
                    }, dir: dir, scale: this.scale }),
                h("calcite-date-month", { min: min, max: max, selectedDate: date, activeDate: activeDate, locale: this.locale, onCalciteDateSelect: (e) => {
                        this.setValue(new Date(e.detail));
                        this.activeDate = new Date(e.detail);
                        this.calciteDateChange.emit(new Date(e.detail));
                        this.reset();
                    }, onCalciteActiveDateChange: (e) => {
                        this.activeDate = new Date(e.detail);
                    }, dir: dir, scale: this.scale }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Register slotted date input proxy, or create one if not provided
     */
    setupProxyInput() {
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
        if (Build.isBrowser) {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    }
    /**
     * Set both iso value and date value and update proxy
     */
    setValue(date) {
        this.valueAsDate = new Date(date);
        this.value = date.toISOString().split("T")[0];
        this.syncProxyInputToThis();
    }
    /**
     * Reset active date and close
     */
    reset() {
        if (this.valueAsDate) {
            this.activeDate = new Date(this.valueAsDate);
        }
        if (!this.noCalendarInput) {
            this.active = false;
        }
    }
    /**
     * If inputted string is a valid date, update value/active
     */
    input(value) {
        const date = this.getDateFromInput(value);
        if (date) {
            this.setValue(date);
            this.activeDate = date;
            this.calciteDateChange.emit(new Date(date));
        }
    }
    /**
     * Clean up invalid date from input on blur
     */
    blur(target) {
        const date = this.getDateFromInput(target.value);
        if (!date && this.valueAsDate) {
            target.value = this.valueAsDate.toLocaleDateString(this.locale);
        }
    }
    /**
     * Get an active date using the value, or current date as default
     */
    getActiveDate(value, min, max) {
        return (dateFromRange(this.activeDate, min, max) ||
            value ||
            dateFromRange(new Date(), min, max));
    }
    /**
     * Find a date from input string
     * return false if date is invalid, or out of range
     */
    getDateFromInput(value) {
        const { separator } = this.localeData;
        const { day, month, year } = parseDateString(value, this.locale);
        const validDay = day > 0;
        const validMonth = month > -1;
        const date = new Date(year, month, day);
        const validDate = !isNaN(date.getTime());
        const validLength = value.split(separator).filter((c) => c).length > 2;
        const validYear = year.toString().length > 3;
        if (validDay &&
            validMonth &&
            validDate &&
            validLength &&
            validYear &&
            inRange(date, this.min, this.max)) {
            return date;
        }
        return false;
    }
    static get is() { return "calcite-date"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-date.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-date.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Selected date"
            },
            "attribute": "value",
            "reflect": true
        },
        "valueAsDate": {
            "type": "unknown",
            "mutable": true,
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
                "text": "Selected date as full date object"
            }
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
                "text": "Earliest allowed date (\"yyyy-mm-dd\")"
            },
            "attribute": "min",
            "reflect": false
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
                "text": "Latest allowed date (\"yyyy-mm-dd\")"
            },
            "attribute": "max",
            "reflect": false
        },
        "active": {
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
                "text": "Expand or collapse when calendar does not have input"
            },
            "attribute": "active",
            "reflect": true,
            "defaultValue": "false"
        },
        "intlPrevMonth": {
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
                "text": "Localized string for \"previous month\""
            },
            "attribute": "intl-prev-month",
            "reflect": false,
            "defaultValue": "TEXT.prevMonth"
        },
        "intlNextMonth": {
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
                "text": "Localized string for \"next month\""
            },
            "attribute": "intl-next-month",
            "reflect": false,
            "defaultValue": "TEXT.nextMonth"
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
                "text": "BCP 47 language tag for desired language and country format"
            },
            "attribute": "locale",
            "reflect": false,
            "defaultValue": "\"en-US\""
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
                "text": "Show only calendar popup"
            },
            "attribute": "no-calendar-input",
            "reflect": false,
            "defaultValue": "false"
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
            "reflect": true,
            "defaultValue": "\"m\""
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
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "blur",
            "method": "focusOutHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "focusin",
            "method": "focusInHandler",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "keyup",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
