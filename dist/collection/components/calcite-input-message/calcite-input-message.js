import { Component, Element, Host, h, Prop } from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
export class CalciteInputMessage {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) */
        this.type = "default";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        // icons for status and validation
        this.iconDefaults = {
            valid: "check-circle",
            invalid: "exclamation-mark-triangle",
            idle: "information",
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let statusOptions = ["invalid", "valid", "idle"];
        if (!statusOptions.includes(this.status))
            this.status = getElementProp(this.el.parentElement, "status", "idle");
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = getElementProp(this.el.parentElement, "scale", "m");
        let type = ["default", "floating"];
        if (!type.includes(this.type))
            this.type = "default";
    }
    componentWillUpdate() {
        this.iconEl = this.setIcon(this.iconDefaults[this.status]);
    }
    render() {
        const dir = getElementDir(this.el);
        this.iconEl = this.setIcon(this.iconDefaults[this.status]);
        return (h(Host, { theme: this.theme, dir: dir },
            this.icon ? this.iconEl : null,
            h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    setIcon(iconName) {
        return (h("calcite-icon", { class: "calcite-input-message-icon", scale: "s", icon: iconName }));
    }
    static get is() { return "calcite-input-message"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-input-message.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-input-message.css"]
    }; }
    static get properties() { return {
        "active": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "active",
            "reflect": true,
            "defaultValue": "false"
        },
        "icon": {
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
                "text": "optionally display an icon based on status"
            },
            "attribute": "icon",
            "reflect": true
        },
        "scale": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"s\" | \"m\" | \"l\"",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the scale of the input, defaults to m"
            },
            "attribute": "scale",
            "reflect": true
        },
        "status": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"invalid\" | \"valid\" | \"idle\"",
                "resolved": "\"idle\" | \"invalid\" | \"valid\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the status of the input field, determines message and icons"
            },
            "attribute": "status",
            "reflect": true
        },
        "theme": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"light\" | \"dark\"",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the theme, defaults to light"
            },
            "attribute": "theme",
            "reflect": true
        },
        "type": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"default\" | \"floating\"",
                "resolved": "\"default\" | \"floating\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input)"
            },
            "attribute": "type",
            "reflect": true,
            "defaultValue": "\"default\""
        }
    }; }
    static get elementRef() { return "el"; }
}
