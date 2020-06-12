import { Component, Element, Event, Host, h, Prop, Listen, } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
export class CalciteLabel {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** specify the status of the label and any child input / input messages */
        this.status = "idle";
        /** specify the scale of the input, defaults to m */
        this.scale = "m";
        /** is the wrapped element positioned inline with the label slotted text */
        this.layout = "default";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        let status = ["invalid", "valid", "idle"];
        if (!status.includes(this.status))
            this.status = "idle";
        let layout = ["inline", "inline-space-between", "default"];
        if (!layout.includes(this.layout))
            this.layout = "default";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    componentDidLoad() {
        this.requestedInputId = this.el.getAttribute("for");
        if (this.layout === "inline" || this.layout === "inline-space-between") {
            this.displayedSlottedContent = this.handleSlottedContent();
            this.slottedContent.innerHTML = "";
            this.slottedContent.append(...this.displayedSlottedContent);
        }
    }
    render() {
        const attributes = this.getAttributes();
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir },
            h("label", Object.assign({}, attributes, { ref: (el) => (this.slottedContent = el) }),
                h("slot", null))));
    }
    handleClick(e) {
        var _a;
        // don't refocus the input if the click occurs on a slotted input action
        // defer to slider click events if the click occurs on a calcite-slider
        if (((_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.className) !== "calcite-input-action-wrapper" &&
            e.target.nodeName !== "CALCITE-SLIDER" &&
            e.target.nodeName !== "CALCITE-RADIO-GROUP-ITEM")
            this.focusChildEl();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    // take unique action on calcite child controls if present
    focusChildEl() {
        if (this.requestedInputId) {
            this.emitSelectedItem();
            document.getElementById(this.requestedInputId).focus();
        }
        else if (this.el.querySelector("calcite-radio-group")) {
            this.el.querySelectorAll("calcite-radio-group-item[checked]")[0].focus();
        }
        else if (this.el.querySelector("calcite-switch")) {
            this.el.querySelector("calcite-switch").focus();
            this.el.querySelector("calcite-switch").toggleAttribute("switched");
        }
        else if (this.el.querySelector("calcite-checkbox")) {
            this.el.querySelector("calcite-checkbox").focus();
            this.el.querySelector("calcite-checkbox").toggleAttribute("checked");
        }
        else if (this.el.querySelector("calcite-slider")) {
            this.el.querySelector("calcite-slider").setFocus();
        }
        else if (this.el.querySelector("textarea")) {
            this.el.querySelector("textarea").focus();
        }
        else if (this.el.querySelector("input")) {
            this.el.querySelector("input").focus();
        }
    }
    // wrap slotted text nodes in span to handle spacing of inline and inline space between layout
    handleSlottedContent() {
        let nodeList = [];
        let requestedSlottedContent = this.el.childNodes;
        // iterate over slotted nodes and wrap text nodes in span
        if (requestedSlottedContent) {
            requestedSlottedContent.forEach(function (item) {
                if (item.nodeName === "#text" && item.textContent.trim().length > 0) {
                    const node = document.createElement("span");
                    node.classList.add("calcite-label-text");
                    node.classList.add("sc-calcite-label");
                    node.innerHTML = item.textContent.trim();
                    nodeList.push(node);
                }
                else if (item.nodeName !== "#text") {
                    nodeList.push(item);
                }
            });
        }
        return nodeList;
    }
    emitSelectedItem() {
        this.calciteLabelSelectedEvent.emit({
            requestedInput: this.requestedInputId,
        });
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = ["layout", "theme", "scale", "status"];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    static get is() { return "calcite-label"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-label.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-label.css"]
    }; }
    static get properties() { return {
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
                "text": "specify the status of the label and any child input / input messages"
            },
            "attribute": "status",
            "reflect": true,
            "defaultValue": "\"idle\""
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
            "reflect": true,
            "defaultValue": "\"m\""
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
                "text": "specify theme of the label and its any child input / input messages"
            },
            "attribute": "theme",
            "reflect": true
        },
        "layout": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"inline\"\n    | \"inline-space-between\"\n    | \"default\"",
                "resolved": "\"default\" | \"inline\" | \"inline-space-between\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "is the wrapped element positioned inline with the label slotted text"
            },
            "attribute": "layout",
            "reflect": true,
            "defaultValue": "\"default\""
        }
    }; }
    static get events() { return [{
            "method": "calciteLabelSelectedEvent",
            "name": "calciteLabelSelectedEvent",
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
    static get listeners() { return [{
            "name": "click",
            "method": "handleClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
