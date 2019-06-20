import { h, Host } from "@stencil/core";
export class CalciteLoader {
    constructor() {
        /**
         * Loader is visible when active
         */
        this.isActive = false;
        /**
         * Text which should appear under the loading indicator
         */
        this.text = "Loading...";
    }
    render() {
        return (h(Host, { "is-active": !!this.isActive },
            h("div", { class: "loader-bars" }),
            h("div", { class: "loader-text" }, this.text)));
    }
    static get is() { return "calcite-loader"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-loader.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-loader.css"]
    }; }
    static get properties() { return {
        "isActive": {
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
                "text": "Loader is visible when active"
            },
            "attribute": "is-active",
            "reflect": false,
            "defaultValue": "false"
        },
        "text": {
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
                "text": "Text which should appear under the loading indicator"
            },
            "attribute": "text",
            "reflect": false,
            "defaultValue": "\"Loading...\""
        }
    }; }
    static get elementRef() { return "el"; }
}
