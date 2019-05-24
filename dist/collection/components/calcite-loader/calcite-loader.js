import { h, Host } from "@stencil/core";
export class CalciteLoader {
    constructor() {
        this.isActive = false;
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
                "text": ""
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
                "text": ""
            },
            "attribute": "text",
            "reflect": false,
            "defaultValue": "\"Loading...\""
        }
    }; }
    static get elementRef() { return "el"; }
}
