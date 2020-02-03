import { h, Host } from "@stencil/core";
import { getElementTheme } from "../../utils/dom";
export class CalciteProgress {
    constructor() {
        /**
         * Use indeterminate if finding actual progress value is impossible
         */
        this.type = "determinate";
        /**
         * Percent complete of 100
         */
        this.value = 0;
        /**
         * Text label for the progress indicator
         */
        this.text = null;
        /**
         * Fill bar in the opposite direction
         */
        this.reversed = false;
        /** Select theme (light or dark) */
        this.theme = "light";
    }
    render() {
        const theme = getElementTheme(this.el);
        return (h(Host, { class: "calcite-progress", type: this.type, reversed: this.reversed, style: {
                "--percentage-value": `${this.value * 100}%`
            }, theme: theme },
            h("div", { class: "calcite-progress--track" }),
            h("div", { class: {
                    "calcite-progress--bar": true,
                    "--indeterminate": this.type === "indeterminate",
                    "--determinate": this.type === "determinate"
                } }),
            this.text ? (h("div", { class: "calcite-progress--text" }, this.text)) : null));
    }
    static get is() { return "calcite-progress"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-progress.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-progress.css"]
    }; }
    static get properties() { return {
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"indeterminate\" | \"determinate\"",
                "resolved": "\"determinate\" | \"indeterminate\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Use indeterminate if finding actual progress value is impossible"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "\"determinate\""
        },
        "value": {
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
                "text": "Percent complete of 100"
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "0"
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
                "text": "Text label for the progress indicator"
            },
            "attribute": "text",
            "reflect": false,
            "defaultValue": "null"
        },
        "reversed": {
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
                "text": "Fill bar in the opposite direction"
            },
            "attribute": "reversed",
            "reflect": false,
            "defaultValue": "false"
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
            "reflect": true,
            "defaultValue": "\"light\""
        }
    }; }
    static get elementRef() { return "el"; }
}
