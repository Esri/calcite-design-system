import { Component, Host, h, Element, Prop, Watch } from "@stencil/core";
export class CalciteRadioButtonGroup {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** The disabled state of the radio button group. */
        this.disabled = false;
        /** The radio button group's hidden status.  When a radio button group is hidden none of its options are focusable or checkable. */
        this.hidden = false;
        /** The layout direction of the radio buttons in a group. */
        this.layout = "horizontal";
        /** Requires that a value is selected for the radio button group before the parent form will submit. */
        this.required = false;
        /** The scale (size) of the radio button group. */
        this.scale = "m";
        /** The color theme of the radio button group. */
        this.theme = "light";
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.passPropsToRadioButtons = () => {
            const radioButtons = this.el.querySelectorAll("calcite-radio-button");
            let firstCheckedRadioButton;
            if (radioButtons.length > 0) {
                radioButtons.forEach((radioButton) => {
                    radioButton.disabled = this.disabled;
                    radioButton.hidden = this.hidden;
                    radioButton.name = this.name;
                    radioButton.required = this.required;
                    radioButton.scale = this.scale;
                    radioButton.theme = this.theme;
                    if (firstCheckedRadioButton) {
                        radioButton.checked = false;
                    }
                    else if (radioButton.checked) {
                        firstCheckedRadioButton = radioButton;
                    }
                    return radioButton;
                });
            }
        };
    }
    onDisabledChange() {
        this.passPropsToRadioButtons();
    }
    onHiddenChange() {
        this.passPropsToRadioButtons();
    }
    validateLayout(newLayout) {
        const layouts = ["horizontal", "vertical"];
        if (!layouts.includes(newLayout)) {
            this.layout = "horizontal";
            this.passPropsToRadioButtons();
        }
    }
    validateScale(newScale) {
        const scales = ["s", "m", "l"];
        if (!scales.includes(newScale)) {
            this.scale = "m";
            this.passPropsToRadioButtons();
        }
    }
    validateTheme(newTheme) {
        const themes = ["light", "dark"];
        if (!themes.includes(newTheme)) {
            this.theme = "light";
            this.passPropsToRadioButtons();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.validateLayout(this.layout);
        this.validateScale(this.scale);
        this.validateTheme(this.theme);
        this.passPropsToRadioButtons();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (h(Host, { role: "radiogroup" },
            h("slot", null)));
    }
    static get is() { return "calcite-radio-button-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-radio-button-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-radio-button-group.css"]
    }; }
    static get properties() { return {
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
                "text": "The disabled state of the radio button group."
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
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
                "text": "The radio button group's hidden status.  When a radio button group is hidden none of its options are focusable or checkable."
            },
            "attribute": "hidden",
            "reflect": true,
            "defaultValue": "false"
        },
        "layout": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"horizontal\" | \"vertical\"",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The layout direction of the radio buttons in a group."
            },
            "attribute": "layout",
            "reflect": true,
            "defaultValue": "\"horizontal\""
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": true,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The name of the radio button group. <code>name</code> must be unique to other radio button group instances."
            },
            "attribute": "name",
            "reflect": true
        },
        "required": {
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
                "text": "Requires that a value is selected for the radio button group before the parent form will submit."
            },
            "attribute": "required",
            "reflect": true,
            "defaultValue": "false"
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
                "text": "The scale (size) of the radio button group."
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
                "text": "The color theme of the radio button group."
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "disabled",
            "methodName": "onDisabledChange"
        }, {
            "propName": "hidden",
            "methodName": "onHiddenChange"
        }, {
            "propName": "layout",
            "methodName": "validateLayout"
        }, {
            "propName": "scale",
            "methodName": "validateScale"
        }, {
            "propName": "theme",
            "methodName": "validateTheme"
        }]; }
}
