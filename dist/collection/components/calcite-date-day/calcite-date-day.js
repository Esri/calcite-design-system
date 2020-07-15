import { Component, Element, Prop, Host, Event, Listen, h, } from "@stencil/core";
import { getKey } from "../../utils/key";
export class CalciteDateDay {
    constructor() {
        /** Date is outside of range and can't be selected */
        this.disabled = false;
        /** Date is in the current month. */
        this.currentMonth = false;
        /** Date is the current selected date of the picker */
        this.selected = false;
        /** Date is actively in focus for keyboard navigation */
        this.active = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick() {
        !this.disabled && this.calciteDaySelect.emit();
    }
    keyDownHandler(e) {
        const key = getKey(e.key);
        if (key === " " || key === "Enter") {
            !this.disabled && this.calciteDaySelect.emit();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const intl = new Intl.NumberFormat(this.locale);
        return (h(Host, { role: "gridcell", tabindex: this.selected || this.active ? 0 : -1 },
            h("span", { class: "day" },
                h("span", { class: "text" }, intl.format(this.day)))));
    }
    static get is() { return "calcite-date-day"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-date-day.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-date-day.css"]
    }; }
    static get properties() { return {
        "day": {
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
                "text": "Day of the month to be shown."
            },
            "attribute": "day",
            "reflect": false
        },
        "disabled": {
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
                "text": "Date is outside of range and can't be selected"
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "currentMonth": {
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
                "text": "Date is in the current month."
            },
            "attribute": "current-month",
            "reflect": true,
            "defaultValue": "false"
        },
        "selected": {
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
                "text": "Date is the current selected date of the picker"
            },
            "attribute": "selected",
            "reflect": true,
            "defaultValue": "false"
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
                "text": "Date is actively in focus for keyboard navigation"
            },
            "attribute": "active",
            "reflect": true,
            "defaultValue": "false"
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
                "text": "Locale to display the day in"
            },
            "attribute": "locale",
            "reflect": false
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
            "method": "calciteDaySelect",
            "name": "calciteDaySelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when user selects day"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
