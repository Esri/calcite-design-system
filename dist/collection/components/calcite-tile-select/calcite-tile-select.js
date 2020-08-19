import { Component, Element, Host, h, Prop, Listen } from "@stencil/core";
export class CalciteTileSelect {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** The checked state of the tile select. */
        this.checked = false;
        /** The disabled state of the tile select. */
        this.disabled = false;
        /** The focused state of the tile select. */
        this.focused = false;
        /** The hidden state of the tile select. */
        this.hidden = false;
        /** The name of the tile select.  This name will appear in form submissions as either a radio or checkbox identifier based on the `type` property. */
        this.name = "";
        /** The side of the tile that the radio or checkbox appears. */
        this.showInput = "left";
        /** The theme of the tile select. */
        this.theme = "light";
        /** The selection mode of the tile select: radio (single) or checkbox (multiple). */
        this.type = "radio";
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteCheckboxChangeEvent(event) {
        const checkbox = event.target;
        if (checkbox === this.input) {
            this.checked = checkbox.checked;
        }
    }
    calciteCheckboxFocusedChangeEvent(event) {
        const checkbox = event.target;
        if (checkbox === this.input) {
            this.focused = checkbox.focused;
        }
    }
    calciteRadioButtonChangeEvent(event) {
        const radioButton = event.target;
        if (radioButton === this.input) {
            this.checked = radioButton.checked;
        }
    }
    calciteRadioButtonFocusedChangeEvent(event) {
        const radioButton = event.target;
        if (radioButton === this.input) {
            this.focused = radioButton.focused;
        }
    }
    click(event) {
        if (event.target.localName === "calcite-tile-select") {
            this.input.click();
            this.input.focus();
        }
    }
    mouseenter() {
        if (this.input.localName === "calcite-radio-button") {
            this.input.hovered = true;
        }
        if (this.input.localName === "calcite-checkbox") {
            this.input.hovered = true;
        }
    }
    mouseleave() {
        if (this.input.localName === "calcite-radio-button") {
            this.input.hovered = false;
        }
        if (this.input.localName === "calcite-checkbox") {
            this.input.hovered = false;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.renderInput();
    }
    disconnectedCallback() {
        this.input.parentNode.removeChild(this.input);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderInput() {
        this.input = this.el.ownerDocument.createElement(this.type === "radio" ? "calcite-radio-button" : "calcite-checkbox");
        this.input.checked = this.checked;
        this.input.disabled = this.disabled;
        this.input.hidden = this.hidden;
        this.input.id = this.el.id;
        if (this.name) {
            this.input.name = this.name;
        }
        this.input.theme = this.theme;
        if (this.value) {
            this.input.value = this.value;
        }
        this.el.insertAdjacentElement("beforeend", this.input);
    }
    render() {
        return (h(Host, null,
            h("calcite-tile", { active: this.checked, description: this.description, embed: true, heading: this.heading, icon: this.icon }),
            h("slot", null)));
    }
    static get is() { return "calcite-tile-select"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-tile-select.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-tile-select.css"]
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The checked state of the tile select."
            },
            "attribute": "checked",
            "reflect": true,
            "defaultValue": "false"
        },
        "description": {
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
                "text": "The description text that appears beneath the heading of the tile."
            },
            "attribute": "description",
            "reflect": true
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The disabled state of the tile select."
            },
            "attribute": "disabled",
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
                "text": "The focused state of the tile select."
            },
            "attribute": "focused",
            "reflect": true,
            "defaultValue": "false"
        },
        "heading": {
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
                "text": "The heading text that appears between the icon and description of the tile."
            },
            "attribute": "heading",
            "reflect": true
        },
        "hidden": {
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
                "text": "The hidden state of the tile select."
            },
            "attribute": "hidden",
            "reflect": true,
            "defaultValue": "false"
        },
        "icon": {
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
                "text": "The icon that appears at the top of the tile."
            },
            "attribute": "icon",
            "reflect": true
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The name of the tile select.  This name will appear in form submissions as either a radio or checkbox identifier based on the `type` property."
            },
            "attribute": "name",
            "reflect": true,
            "defaultValue": "\"\""
        },
        "showInput": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"left\" | \"right\" | \"none\"",
                "resolved": "\"left\" | \"none\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The side of the tile that the radio or checkbox appears."
            },
            "attribute": "show-input",
            "reflect": true,
            "defaultValue": "\"left\""
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
                "text": "The theme of the tile select."
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"radio\" | \"checkbox\"",
                "resolved": "\"checkbox\" | \"radio\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The selection mode of the tile select: radio (single) or checkbox (multiple)."
            },
            "attribute": "type",
            "reflect": true,
            "defaultValue": "\"radio\""
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
                "text": "The value of the tile select.  This value will appear in form submissions when this tile select is checked."
            },
            "attribute": "value",
            "reflect": true
        }
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "calciteCheckboxChange",
            "method": "calciteCheckboxChangeEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteCheckboxFocusedChange",
            "method": "calciteCheckboxFocusedChangeEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteRadioButtonChange",
            "method": "calciteRadioButtonChangeEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteRadioButtonFocusedChange",
            "method": "calciteRadioButtonFocusedChangeEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "click",
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
