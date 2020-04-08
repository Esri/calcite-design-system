import { Component, h, Host, Prop, Event, Element, } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS, TEXT } from "./resources";
export class CalciteChip {
    constructor() {
        /** specify the scale of the chip, defaults to m */
        this.scale = "m";
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.closeClickHandler = (event) => {
            event.preventDefault();
            this.calciteChipDismiss.emit(this.el);
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        let scale = ["xs", "s", "m", "l", "xl"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    render() {
        const dir = getElementDir(this.el);
        const iconScale = this.scale === "xs" || this.scale === "s" || this.scale === "m"
            ? "s"
            : this.scale === "l"
                ? "m"
                : "l";
        const iconEl = (h("calcite-icon", { class: "calcite-chip--icon", icon: this.icon, scale: iconScale }));
        return (h(Host, { dir: dir },
            this.icon ? iconEl : null,
            h("slot", { name: "chip-image" }),
            h("span", null,
                h("slot", null)),
            h("button", { onClick: this.closeClickHandler, class: CSS.close, title: TEXT.close },
                h("calcite-icon", { scale: iconScale, icon: "x" }))));
    }
    static get is() { return "calcite-chip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-chip.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-chip.css"]
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
            "required": true,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "value",
            "reflect": false
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"light\" | \"dark\"",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Select theme (light or dark)"
            },
            "attribute": "theme",
            "reflect": true
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"xs\" | \"s\" | \"m\" | \"l\" | \"xl\"",
                "resolved": "\"l\" | \"m\" | \"s\" | \"xl\" | \"xs\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the scale of the chip, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "icon": {
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
                "text": "optionally pass an icon to display - accepts Calcite UI icon names"
            },
            "attribute": "icon",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "calciteChipDismiss",
            "name": "calciteChipDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
}
