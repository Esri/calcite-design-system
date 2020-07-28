import { Component, Prop, h, Host, Watch } from "@stencil/core";
import Color from "color";
import { CSS } from "./resources";
const ACTIVE_BORDER_COLOR = "rgba(0, 0, 0, 0.15)";
export class CalciteColorSwatch {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Used to display whether the swatch is active or not.
         */
        this.active = false;
        /**
         * The component scale.
         */
        this.scale = "m";
        /**
         * The component's theme.
         */
        this.theme = "light";
    }
    handleColorChange(color) {
        this.internalColor = Color(color);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.handleColorChange(this.color);
    }
    render() {
        const { internalColor, active, theme } = this;
        const hex = internalColor.hex();
        const borderColor = active
            ? ACTIVE_BORDER_COLOR
            : internalColor[theme === "light" ? "darken" : "whiten"](0.25).hex();
        const borderRadius = active ? "100%" : "0";
        return (h(Host, { "aria-label": hex, title: hex },
            h("svg", { class: CSS.swatch, xmlns: "http://www.w3.org/2000/svg" },
                h("rect", { width: "100%", height: "100%", fill: hex, stroke: borderColor, rx: borderRadius }))));
    }
    static get is() { return "calcite-color-swatch"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-color-swatch.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-color-swatch.css"]
    }; }
    static get properties() { return {
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
                "text": "Used to display whether the swatch is active or not."
            },
            "attribute": "active",
            "reflect": true,
            "defaultValue": "false"
        },
        "color": {
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
                "tags": [{
                        "text": "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value",
                        "name": "see"
                    }],
                "text": "The color value."
            },
            "attribute": "color",
            "reflect": false
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Exclude<Scale, \"xs\" | \"xl\">",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {
                    "Exclude": {
                        "location": "global"
                    },
                    "Scale": {
                        "location": "import",
                        "path": "../../interfaces/common"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The component scale."
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Theme",
                "resolved": "\"dark\" | \"light\"",
                "references": {
                    "Theme": {
                        "location": "import",
                        "path": "../../interfaces/common"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The component's theme."
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        }
    }; }
    static get watchers() { return [{
            "propName": "color",
            "methodName": "handleColorChange"
        }]; }
}
