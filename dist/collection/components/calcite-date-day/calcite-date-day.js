import { Host, h } from "@stencil/core";
import { SPACE, ENTER } from "../../utils/keys";
export class CalciteDateDay {
    constructor() {
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
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        return (h(Host, { class: `${this.active ? "active" : ""}
        ${this.enable ? "enabled" : "disabled"}
        ${this.selected ? "selected-day" : ""}`, role: "gridcell", tabindex: (this.selected || this.active) ? 0 : -1 },
            h("span", { class: "day" }, this.day)));
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
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            this.enable && (this.selected = true) && this.calciteDaySelect.emit();
        }
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
                "text": "day of the month to be shown."
            },
            "attribute": "day",
            "reflect": false,
            "defaultValue": "0"
        },
        "enable": {
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
                "text": "Enables tells whether day enabled for the user click."
            },
            "attribute": "enable",
            "reflect": false,
            "defaultValue": "true"
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
                "text": "Selected tells whether day is selected."
            },
            "attribute": "selected",
            "reflect": false,
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
                "text": "Active tells whether day is Actively in focus."
            },
            "attribute": "active",
            "reflect": false,
            "defaultValue": "false"
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
                "text": "When user selects day it emits the event."
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
