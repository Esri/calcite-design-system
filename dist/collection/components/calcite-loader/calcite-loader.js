import { Component, Element, h, Host, Prop } from "@stencil/core";
import { guid } from "../../utils/guid";
export class CalciteLoader {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Show the loader */
        this.active = false;
        /** Inline loaders are smaller and will appear to the left of the text */
        this.inline = false;
        /** Speficy the scale of the loader. Defaults to "m" */
        this.scale = "m";
        /** Percent complete of 100, only valid for determinate indicators */
        this.value = 0;
        /** Text which should appear under the loading indicator (optional) */
        this.text = "";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scales = ["s", "m", "l"];
        if (!scales.includes(this.scale))
            this.scale = "m";
        let types = ["indeterminate", "determinate"];
        if (!types.includes(this.type))
            this.type = "indeterminate";
    }
    render() {
        const { el, inline, scale, text, type, value } = this;
        const id = el.id || guid;
        const radiusRatio = 0.45;
        const size = inline ? this.getInlineSize(scale) : this.getSize(scale);
        const radius = size * radiusRatio;
        const viewbox = `0 0 ${size} ${size}`;
        const isDeterminate = type === "determinate";
        const circumference = 2 * radius * Math.PI;
        const progress = (value / 100) * circumference;
        const remaining = circumference - progress;
        const valueNow = Math.floor(value);
        const hostAttributes = {
            "aria-valuenow": valueNow,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            complete: valueNow === 100,
        };
        const svgAttributes = { r: radius, cx: size / 2, cy: size / 2 };
        const determinateStyle = { "stroke-dasharray": `${progress} ${remaining}` };
        return (h(Host, Object.assign({ id: id, role: "progressbar" }, (isDeterminate ? hostAttributes : {})),
            h("div", { class: "loader__svgs" },
                h("svg", { viewBox: viewbox, class: "loader__svg loader__svg--1" },
                    h("circle", Object.assign({}, svgAttributes))),
                h("svg", { viewBox: viewbox, class: "loader__svg loader__svg--2" },
                    h("circle", Object.assign({}, svgAttributes))),
                h("svg", Object.assign({ viewBox: viewbox, class: "loader__svg loader__svg--3" }, (isDeterminate ? { style: determinateStyle } : {})),
                    h("circle", Object.assign({}, svgAttributes)))),
            text && h("div", { class: "loader__text" }, text),
            isDeterminate && h("div", { class: "loader__percentage" }, value)));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Return the proper sizes based on the scale property
     */
    getSize(scale) {
        return {
            "s": 32,
            "m": 56,
            "l": 80
        }[scale];
    }
    getInlineSize(scale) {
        return {
            "s": 12,
            "m": 16,
            "l": 20
        }[scale];
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
                "text": "Show the loader"
            },
            "attribute": "active",
            "reflect": true,
            "defaultValue": "false"
        },
        "inline": {
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
                "text": "Inline loaders are smaller and will appear to the left of the text"
            },
            "attribute": "inline",
            "reflect": true,
            "defaultValue": "false"
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
                "text": "Speficy the scale of the loader. Defaults to \"m\""
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
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
            "reflect": true
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
                "text": "Percent complete of 100, only valid for determinate indicators"
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
                "text": "Text which should appear under the loading indicator (optional)"
            },
            "attribute": "text",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "noPadding": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Turn off spacing around the loader"
            },
            "attribute": "no-padding",
            "reflect": false
        }
    }; }
    static get elementRef() { return "el"; }
}
