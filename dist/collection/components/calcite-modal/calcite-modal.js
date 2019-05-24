import { h } from "@stencil/core";
import { format } from "../../utils/utils";
export class CalciteModal {
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return h("div", { class: "example-class" },
            "Hello, World! I'm ",
            this.getText());
    }
    static get is() { return "calcite-modal"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-modal.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-modal.css"]
    }; }
    static get properties() { return {
        "first": {
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
                "text": "The first name"
            },
            "attribute": "first",
            "reflect": false
        },
        "middle": {
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
                "text": "The middle name"
            },
            "attribute": "middle",
            "reflect": false
        },
        "last": {
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
                "text": "The last name"
            },
            "attribute": "last",
            "reflect": false
        }
    }; }
}
