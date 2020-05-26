import { Component, Host, Prop, h } from "@stencil/core";
import { CSS } from "./resources";
/**
 * @slot - Default slot for content.
 */
export class CalciteScrim {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Determines if the component will have the loader overlay.
         * Otherwise, will render opaque disabled state.
         */
        this.loading = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Method
    //
    // --------------------------------------------------------------------------
    render() {
        const loaderNode = this.loading ? (h("calcite-loader", { "is-active": true })) : null;
        const scrimNode = h("div", { class: CSS.scrim }, loaderNode);
        const contentNode = (h("div", { class: CSS.content },
            h("slot", null)));
        return (h(Host, null,
            scrimNode,
            contentNode));
    }
    static get is() { return "calcite-scrim"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-scrim.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-scrim.css"]
    }; }
    static get properties() { return {
        "loading": {
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
                "text": "Determines if the component will have the loader overlay.\nOtherwise, will render opaque disabled state."
            },
            "attribute": "loading",
            "reflect": true,
            "defaultValue": "false"
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
                "text": "specify the theme of scrim, defaults to light"
            },
            "attribute": "theme",
            "reflect": true
        }
    }; }
}
