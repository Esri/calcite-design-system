import { Component, h, Prop, Event, Element, Host, Listen, Watch } from "@stencil/core";
import { getKey } from "../../utils/key";
import { hasLabel, getElementDir } from "../../utils/dom";
export class CalciteCheckbox {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** The checked state of the checkbox. */
        this.checked = false;
        /** The hovered state of the checkbox. */
        this.hovered = false;
        /** The focused state of the checkbox. */
        this.focused = false;
        /**
         * True if the checkbox is initially indeterminate,
         * which is independent from its checked state
         * https://css-tricks.com/indeterminate-checkboxes/
         * */
        this.indeterminate = false;
        /** The name of the checkbox input */
        this.name = "";
        /** specify the scale of the checkbox, defaults to m */
        this.scale = "m";
        /** True if the checkbox is disabled */
        this.disabled = false;
        //--------------------------------------------------------------------------
        //
        //  Private Properties
        //
        //--------------------------------------------------------------------------
        this.checkedPath = "M12.753 3l-7.319 7.497L3.252 8.31 2 9.373l3.434 3.434L14 4.24z";
        this.indeterminatePath = "M4 7h8v2H4z";
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.getPath = () => this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";
        this.toggle = () => {
            if (!this.disabled) {
                this.checked = !this.checked;
                this.focused = true;
                this.indeterminate = false;
            }
        };
    }
    checkedWatcher(newChecked) {
        newChecked ? this.input.setAttribute("checked", "") : this.input.removeAttribute("checked");
        this.calciteCheckboxChange.emit();
    }
    focusedChanged(focused) {
        if (focused && !this.el.hasAttribute("hidden")) {
            this.input.focus();
        }
        else {
            this.input.blur();
        }
        this.calciteCheckboxFocusedChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleLabelFocus(e) {
        if (!this.el.contains(e.detail.interactedEl) && hasLabel(e.detail.labelEl, this.el)) {
            this.toggle();
            this.el.focus();
        }
    }
    onClick({ currentTarget, target }) {
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && target === this.input) ||
            (!this.el.closest("label") && currentTarget === this.el)) {
            this.toggle();
        }
    }
    keyDownHandler(e) {
        const key = getKey(e.key);
        if (key === " ") {
            e.preventDefault();
            this.toggle();
        }
    }
    mouseenter() {
        this.hovered = true;
    }
    mouseleave() {
        this.hovered = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.renderHiddenCheckboxInput();
        const scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    disconnectedCallback() {
        this.input.parentNode.removeChild(this.input);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHiddenCheckboxInput() {
        this.input = document.createElement("input");
        this.checked && this.input.setAttribute("checked", "");
        this.input.disabled = this.disabled;
        this.input.name = this.name;
        this.input.onblur = () => (this.focused = false);
        this.input.onfocus = () => (this.focused = true);
        this.input.type = "checkbox";
        if (this.value) {
            this.input.value = this.value;
        }
        this.el.appendChild(this.input);
    }
    render() {
        if (this.el.textContent) {
            return (h(Host, { role: "checkbox", "aria-checked": this.checked.toString() },
                h("div", { class: "hasLabel" },
                    h("svg", { class: "check-svg", viewBox: "0 0 16 16" },
                        h("path", { d: this.getPath() })),
                    h("calcite-label", { dir: getElementDir(this.el), scale: this.scale },
                        h("slot", null)))));
        }
        return (h(Host, { role: "checkbox", "aria-checked": this.checked.toString() },
            h("svg", { class: "check-svg", viewBox: "0 0 16 16" },
                h("path", { d: this.getPath() })),
            h("slot", null)));
    }
    static get is() { return "calcite-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-checkbox.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-checkbox.css"]
    }; }
    static get properties() { return {
        "checked": {
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
                "text": "The checked state of the checkbox."
            },
            "attribute": "checked",
            "reflect": true,
            "defaultValue": "false"
        },
        "hovered": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The hovered state of the checkbox."
            },
            "attribute": "hovered",
            "reflect": true,
            "defaultValue": "false"
        },
        "focused": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The focused state of the checkbox."
            },
            "attribute": "focused",
            "reflect": true,
            "defaultValue": "false"
        },
        "indeterminate": {
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
                "text": "True if the checkbox is initially indeterminate,\nwhich is independent from its checked state\nhttps://css-tricks.com/indeterminate-checkboxes/"
            },
            "attribute": "indeterminate",
            "reflect": true,
            "defaultValue": "false"
        },
        "name": {
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
                "text": "The name of the checkbox input"
            },
            "attribute": "name",
            "reflect": true,
            "defaultValue": "\"\""
        },
        "value": {
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
                "text": "The value of the checkbox input"
            },
            "attribute": "value",
            "reflect": true
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
                "text": "specify the scale of the checkbox, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "disabled": {
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
                "text": "True if the checkbox is disabled"
            },
            "attribute": "disabled",
            "reflect": true,
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
                "text": "Determines what theme to use"
            },
            "attribute": "theme",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "calciteCheckboxChange",
            "name": "calciteCheckboxChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the checkbox checked status changes"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteCheckboxFocusedChange",
            "name": "calciteCheckboxFocusedChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the checkbox focused state changes"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "checked",
            "methodName": "checkedWatcher"
        }, {
            "propName": "focused",
            "methodName": "focusedChanged"
        }]; }
    static get listeners() { return [{
            "name": "calciteLabelFocus",
            "method": "handleLabelFocus",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "mouseenter",
            "method": "mouseenter",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "mouseleave",
            "method": "mouseleave",
            "target": undefined,
            "capture": false,
            "passive": true
        }]; }
}
