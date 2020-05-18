import { Component, Host, h, Listen, Prop, Element, Watch, Event, } from "@stencil/core";
import { guid } from "../../utils/guid";
export class CalciteRadioButton {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** The checked state of the radio button. */
        this.checked = false;
        /** The disabled state of the radio button. */
        this.disabled = false;
        /** The focused state of the radio button. */
        this.focused = false;
        /** The id attribute of the radio button.  When omitted, a globally unique identifier is used. */
        this.guid = this.el.id || `calcite-radio-button-${guid()}`;
        /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
        this.hidden = false;
        /** Requires that a value is selected for the radio button group before the parent form will submit. */
        this.required = false;
        /** The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code><calcite-radio-button-group></code>. */
        this.scale = "m";
        /** The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code><calcite-radio-button-group></code>. */
        this.theme = "light";
    }
    checkedChanged(newChecked, oldChecked) {
        if (newChecked === true && oldChecked === false) {
            this.uncheckOtherRadioButtonsInGroup();
        }
        this.input.checked = newChecked;
        this.calciteRadioButtonChange.emit();
    }
    disabledChanged(disabled) {
        this.input.disabled = disabled;
    }
    focusedChanged(focused) {
        if (focused && !this.el.hasAttribute("hidden")) {
            this.input.focus();
        }
        else {
            this.input.blur();
        }
    }
    hiddenChanged(newHidden) {
        this.input.hidden = newHidden;
    }
    nameChanged(newName) {
        this.input.name = newName;
    }
    requiredChanged(required) {
        this.input.required = required;
    }
    validateScale(newScale) {
        const scales = ["s", "m", "l"];
        if (!scales.includes(newScale))
            this.scale = "m";
    }
    validateTheme(newTheme) {
        const themes = ["light", "dark"];
        if (!themes.includes(newTheme))
            this.theme = "light";
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    checkFirstRadioButton() {
        let radioButtons = document.querySelectorAll(`calcite-radio-button[name=${this.name}]`);
        let firstCheckedRadioButton;
        if (radioButtons && radioButtons.length > 0) {
            radioButtons.forEach((radioButton) => {
                if (firstCheckedRadioButton) {
                    radioButton.checked = false;
                }
                else if (radioButton.checked) {
                    firstCheckedRadioButton = radioButton;
                }
                return radioButton;
            });
        }
    }
    setupTitleAttributeObserver() {
        this.titleAttributeObserver = new MutationObserver(() => {
            this.input.title = this.el.getAttribute("title");
        });
        this.titleAttributeObserver.observe(this.el, {
            attributes: true,
            attributeFilter: ["title"],
        });
    }
    uncheckOtherRadioButtonsInGroup() {
        const otherRadioButtons = document.querySelectorAll(`calcite-radio-button[name=${this.name}]:not([guid="${this.guid}"])`);
        otherRadioButtons.forEach((otherRadioButton) => {
            if (otherRadioButton.checked) {
                otherRadioButton.checked = false;
            }
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    check() {
        if (!this.disabled && !this.hidden) {
            this.uncheckOtherRadioButtonsInGroup();
            this.focused = true;
            this.checked = true;
        }
    }
    onInputBlur() {
        this.focused = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.renderHiddenRadioInput();
        this.setupTitleAttributeObserver();
    }
    componentWillLoad() {
        this.validateScale(this.scale);
        this.validateTheme(this.theme);
        if (this.name) {
            this.checkFirstRadioButton();
        }
    }
    disconnectedCallback() {
        this.input.parentNode.removeChild(this.input);
        this.titleAttributeObserver.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHiddenRadioInput() {
        // Rendering a hidden radio input outside Shadow DOM so it can participate in form submissions
        // @link https://www.hjorthhansen.dev/shadow-dom-form-participation/
        this.input = this.el.ownerDocument.createElement("input");
        this.input.setAttribute("aria-label", this.value || this.guid);
        this.input.checked = this.checked;
        this.input.disabled = this.disabled;
        this.input.hidden = this.hidden;
        this.input.id = this.guid;
        if (this.name) {
            this.input.name = this.name;
        }
        this.input.onfocus = this.check.bind(this);
        this.input.onblur = this.onInputBlur.bind(this);
        // We're using option #3 explained here to hide the radio input without compromising accessibility
        // @link https://blog.bitsrc.io/customise-radio-buttons-without-compromising-accessibility-b03061b5ba93
        // The only difference is we're using "fixed" instead of "absolute" positioning thanks to this StackOverflow:
        // @link https://stackoverflow.com/questions/24299567/radio-button-causes-browser-to-jump-to-the-top/24323870
        this.input.style.opacity = "0";
        this.input.style.position = "fixed";
        this.input.style.zIndex = "-1";
        if (this.value) {
            this.input.value = this.value;
        }
        this.input.required = this.required;
        if (this.el.getAttribute("title")) {
            this.input.title = this.el.getAttribute("title");
        }
        else if (this.name && this.value) {
            this.input.title = `Radio button with name of ${this.name} and value of ${this.value}`;
        }
        else {
            this.input.title = this.guid;
        }
        this.input.type = "radio";
        // This renders the input as a sibling of calcite-radio-button because as it turns out
        // doing appendChild as hjorthhansen suggests doesn't really keep it out of the
        // shadow DOM as far as slot behavior goes.  This is required to render {this.value} as fallback slot content.
        this.el.insertAdjacentElement("afterend", this.input);
    }
    render() {
        return (h(Host, { "aria-checked": this.checked.toString(), "aria-disabled": this.disabled },
            h("div", { class: "radio" }),
            h("calcite-label", { dir: document.documentElement.getAttribute("dir"), scale: this.scale },
                h("slot", null, this.value))));
    }
    static get is() { return "calcite-radio-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-radio-button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-radio-button.css"]
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
                "text": "The checked state of the radio button."
            },
            "attribute": "checked",
            "reflect": true,
            "defaultValue": "false"
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
                "text": "The disabled state of the radio button."
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
                "text": "The focused state of the radio button."
            },
            "attribute": "focused",
            "reflect": true,
            "defaultValue": "false"
        },
        "guid": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The id attribute of the radio button.  When omitted, a globally unique identifier is used."
            },
            "attribute": "guid",
            "reflect": true,
            "defaultValue": "this.el.id || `calcite-radio-button-${guid()}`"
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
                "text": "The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable."
            },
            "attribute": "hidden",
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
            "required": true,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The name of the radio button.  <code>name</code> is passed as a property automatically from <code><calcite-radio-button-group></code>."
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
                "text": "The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code><calcite-radio-button-group></code>."
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
                "text": "The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code><calcite-radio-button-group></code>."
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        },
        "value": {
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
                "text": "The value of the radio button."
            },
            "attribute": "value",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "calciteRadioButtonChange",
            "name": "calciteRadioButtonChange",
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
    static get watchers() { return [{
            "propName": "checked",
            "methodName": "checkedChanged"
        }, {
            "propName": "disabled",
            "methodName": "disabledChanged"
        }, {
            "propName": "focused",
            "methodName": "focusedChanged"
        }, {
            "propName": "hidden",
            "methodName": "hiddenChanged"
        }, {
            "propName": "name",
            "methodName": "nameChanged"
        }, {
            "propName": "required",
            "methodName": "requiredChanged"
        }, {
            "propName": "scale",
            "methodName": "validateScale"
        }, {
            "propName": "theme",
            "methodName": "validateTheme"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "check",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
