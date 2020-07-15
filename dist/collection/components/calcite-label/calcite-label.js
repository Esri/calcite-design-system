import { Component, Element, Event, Host, h, Prop, } from "@stencil/core";
import { getElementDir, focusElement } from "../../utils/dom";
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
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        // emit focus event and focus the requested input if available
        this.handleClick = (event) => {
            this.emitSelectedItem(event.target);
            if (this.requestedFor) {
                focusElement(document.getElementById(this.requestedFor));
            }
            else if (this.el.querySelector("textarea")) {
                this.el.querySelector("textarea").focus();
            }
            else if (this.el.querySelector("input")) {
                this.el.querySelector("input").focus();
            }
        };
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
        this.requestedFor = this.el.getAttribute("for");
        if (this.layout === "inline" || this.layout === "inline-space-between") {
            this.displayedSlottedContent = this.handleSlottedContent();
            this.slottedContent.innerHTML = "";
            this.displayedSlottedContent.map((item) => {
                this.slottedContent.append(item);
            });
        }
    }
    render() {
        const attributes = this.getAttributes();
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, onClick: this.handleClick },
            h("label", Object.assign({}, attributes, { ref: (el) => (this.slottedContent = el) }),
                h("slot", null))));
    }
    // wrap slotted text nodes in span to handle spacing of inline and inline space between layouts
    handleSlottedContent() {
        let nodeList = [];
        let requestedSlottedContent = this.el.childNodes;
        // iterate over slotted nodes and wrap text nodes in span
        if (requestedSlottedContent) {
            requestedSlottedContent.forEach(function (item) {
                if (item.nodeName === "#text" && item.textContent.trim().length > 0) {
                    const node = document.createElement("span");
                    node.classList.add("calcite-label-text");
                    node.innerHTML = item.textContent.trim();
                    nodeList.push(node);
                }
                else if (item.nodeName !== "#text") {
                    nodeList.push(item);
                }
            });
        }
        return [...Array.from(new Set(nodeList))];
    }
    emitSelectedItem(target) {
        this.calciteLabelFocus.emit({
            labelEl: this.el,
            interactedEl: target,
            requestedInput: this.requestedFor,
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
            "method": "calciteLabelFocus",
            "name": "calciteLabelFocus",
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
