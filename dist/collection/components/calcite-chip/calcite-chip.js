import { Component, h, Host, Prop, Event, Element, } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { CSS, TEXT } from "./resources";
export class CalciteChip {
    constructor() {
        /** specify the scale of the chip, defaults to m */
        this.scale = "m";
        /** specify the color of the button, defaults to blue */
        this.color = "grey";
        /** specify the appearance style of the button, defaults to solid. */
        this.appearance = "solid";
        /** Optionally show a button the user can click to dismiss the chip */
        this.dismissible = false;
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
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let appearance = ["solid", "clear"];
        if (!appearance.includes(this.appearance))
            this.appearance = "solid";
        let color = ["blue", "green", "grey", "yellow", "red"];
        if (!color.includes(this.color))
            this.color = "grey";
    }
    render() {
        const dir = getElementDir(this.el);
        const iconScale = this.scale !== "l" ? "s" : "m";
        const iconEl = (h("calcite-icon", { class: "calcite-chip--icon", icon: this.icon, scale: iconScale }));
        const closeButton = (h("button", { onClick: this.closeClickHandler, class: CSS.close, title: TEXT.close },
            h("calcite-icon", { scale: iconScale, icon: "x" })));
        return (h(Host, { dir: dir },
            h("slot", { name: "chip-image" }),
            this.icon ? iconEl : null,
            h("span", null,
                h("slot", null)),
            this.dismissible ? closeButton : null));
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
                "original": "\"s\" | \"m\" | \"l\"",
                "resolved": "\"l\" | \"m\" | \"s\"",
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
        "color": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"blue\"\n    | \"red\"\n    | \"yellow\"\n    | \"green\"\n    | \"grey\"",
                "resolved": "\"blue\" | \"green\" | \"grey\" | \"red\" | \"yellow\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the color of the button, defaults to blue"
            },
            "attribute": "color",
            "reflect": true,
            "defaultValue": "\"grey\""
        },
        "appearance": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"solid\" | \"clear\"",
                "resolved": "\"clear\" | \"solid\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the appearance style of the button, defaults to solid."
            },
            "attribute": "appearance",
            "reflect": true,
            "defaultValue": "\"solid\""
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
        },
        "dismissible": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Optionally show a button the user can click to dismiss the chip"
            },
            "attribute": "dismissible",
            "reflect": true,
            "defaultValue": "false"
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
                "text": "Emitted when the dismiss button is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
}
