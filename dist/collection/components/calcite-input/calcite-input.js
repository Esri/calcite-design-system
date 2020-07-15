import { Component, Element, Host, Event, h, Listen, Method, Prop, Watch, } from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { getKey } from "../../utils/key";
export class CalciteInput {
    constructor() {
        /** specify if the input is in loading state */
        this.loading = false;
        /** specify the alignment of the value of the input */
        this.alignment = "start";
        /** input value */
        this.value = "";
        /** for recognized input types, show an icon if applicable */
        this.icon = false;
        /** specify the input type */
        this.type = "text";
        /** specify the placement of the number buttons */
        this.numberButtonType = "vertical";
        /** is the input required */
        this.required = false;
        /** should the input autofocus */
        this.autofocus = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** keep track of the rendered child type */
        this.childElType = "input";
        /** determine if there is a slotted action for styling purposes */
        this.hasAction = false;
        /** track if the input is clearable */
        this.isClearable = false;
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        /** map icons to colors */
        this.iconTypeDefaults = {
            tel: "phone",
            password: "lock",
            email: "send",
            date: "calendar",
            time: "clock",
            search: "search",
        };
        this.updateNumberValue = (e) => {
            // todo, when dropping ie11 support, refactor to use stepup/stepdown
            // prevent blur and re-focus of input on mousedown
            e.preventDefault();
            if (this.childElType === "input" && this.type === "number") {
                let inputMax = this.maxString ? parseFloat(this.maxString) : null;
                let inputMin = this.minString ? parseFloat(this.minString) : null;
                let inputStep = this.stepString ? parseFloat(this.stepString) : 1;
                let inputVal = this.value && this.value !== "" ? parseFloat(this.value) : 0;
                switch (e.target.dataset.adjustment) {
                    case "up":
                        if ((!inputMax && inputMax !== 0) || inputVal < inputMax)
                            this.childEl.value = (inputVal += inputStep).toString();
                        break;
                    case "down":
                        if ((!inputMin && inputMin !== 0) || inputVal > inputMin)
                            this.childEl.value = (inputVal -= inputStep).toString();
                        break;
                }
                this.value = this.childEl.value.toString();
            }
        };
    }
    /** watcher to update number-to-string for min max */
    minWatcher() {
        this.minString = this.min.toString() || null;
    }
    maxWatcher() {
        this.maxString = this.max.toString() || null;
    }
    stepWatcher() {
        this.maxString = this.max.toString() || null;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let status = ["invalid", "valid", "idle"];
        let foundStatus = getElementProp(this.el, "status", "idle");
        if (!status.includes(this.status))
            this.status = !status.includes(foundStatus) ? "idle" : foundStatus;
        let scale = ["s", "m", "l"];
        let foundScale = getElementProp(this.el, "scale", "m");
        if (!scale.includes(this.scale)) {
            this.scale = !scale.includes(foundScale) ? "m" : foundScale;
        }
        let alignment = ["start", "end"];
        if (!alignment.includes(this.alignment))
            this.alignment = "start";
        let type = [
            "color",
            "date",
            "datetime-local",
            "email",
            "file",
            "image",
            "month",
            "number",
            "password",
            "search",
            "tel",
            "text",
            "textarea",
            "time",
            "url",
            "week",
        ];
        if (!type.includes(this.type))
            this.type = "text";
        let numberButtonType = ["vertical", "horizontal", "none"];
        if (!numberButtonType.includes(this.numberButtonType))
            this.numberButtonType = "vertical";
        // if an icon string is not provided, but icon is true and a default icon is present
        // for the requested type, set that as the icon
        let typesWithIcons = ["date", "email", "password", "search", "tel", "time"];
        this.icon = this.icon
            ? this.icon
            : this.icon !== false && typesWithIcons.includes(this.type)
                ? this.iconTypeDefaults[this.type]
                : false;
        this.determineClearable();
    }
    componentDidLoad() {
        var _a, _b, _c;
        this.minString = (_a = this.min) === null || _a === void 0 ? void 0 : _a.toString();
        this.maxString = (_b = this.max) === null || _b === void 0 ? void 0 : _b.toString();
        this.stepString = (_c = this.step) === null || _c === void 0 ? void 0 : _c.toString();
        this.slottedActionEl = this.el.querySelector("[slot=input-action]");
    }
    componentWillLoad() {
        this.childElType = this.type === "textarea" ? "textarea" : "input";
        this.hasAction = !!this.el.querySelector("[slot=input-action]");
    }
    componentWillUpdate() {
        this.calciteInputInput.emit({
            element: this.childEl,
            value: this.value,
        });
        this.determineClearable();
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const inputClearButton = (h("div", { class: "calcite-input-clear-button", onClick: () => this.clearInputValue() },
            h("calcite-icon", { theme: this.theme, icon: "x", scale: "s" })));
        const loader = (h("div", { class: "calcite-input-loading" },
            h("calcite-progress", { type: "indeterminate" })));
        const numberButtonClassModifier = this.numberButtonType === "horizontal"
            ? "number-button-item-horizontal"
            : null;
        const numberButtonsHorizontalUp = (h("div", { class: `calcite-input-number-button-item ${numberButtonClassModifier}`, onMouseDown: this.updateNumberValue, "data-adjustment": "up" },
            h("calcite-icon", { theme: this.theme, icon: "chevron-up" })));
        const numberButtonsHorizontalDown = (h("div", { class: `calcite-input-number-button-item ${numberButtonClassModifier}`, onMouseDown: this.updateNumberValue, "data-adjustment": "down" },
            h("calcite-icon", { theme: this.theme, icon: "chevron-down" })));
        const numberButtonsVertical = (h("div", { class: `calcite-input-number-button-wrapper` },
            numberButtonsHorizontalUp,
            numberButtonsHorizontalDown));
        const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
        const iconEl = (h("calcite-icon", { class: "calcite-input-icon", scale: iconScale, theme: this.theme, icon: this.icon }));
        const inputAction = (h("div", { class: "calcite-input-action-wrapper" },
            h("slot", { name: "input-action" })));
        const prefixText = (h("div", { class: "calcite-input-prefix" }, this.prefixText));
        const suffixText = (h("div", { class: "calcite-input-suffix" }, this.suffixText));
        const childEl = this.childElType !== "textarea" ? (h("input", Object.assign({}, attributes, { onBlur: () => this.inputBlurHandler(), onFocus: (e) => this.inputFocusHandler(e), onInput: (e) => this.inputInputHandler(e), type: this.type, min: this.minString, max: this.maxString, step: this.stepString, value: this.value, placeholder: this.placeholder || "", required: this.required ? true : null, autofocus: this.autofocus ? true : null, disabled: this.disabled ? true : null, tabIndex: this.disabled ? -1 : null, ref: (el) => (this.childEl = el) }))) : ([
            h("textarea", Object.assign({}, attributes, { onBlur: () => this.inputBlurHandler(), onFocus: (e) => this.inputFocusHandler(e), onInput: (e) => this.inputInputHandler(e), required: this.required ? true : null, placeholder: this.placeholder || "", autofocus: this.autofocus ? true : null, disabled: this.disabled ? true : null, tabIndex: this.disabled ? -1 : null, ref: (el) => (this.childEl = el) }),
                h("slot", null)),
            h("div", { class: "calcite-input-resize-icon-wrapper" },
                h("calcite-icon", { icon: "chevron-down", scale: "s" })),
        ]);
        return (h(Host, { dir: dir, onClick: (e) => this.inputFocusHandler(e) },
            h("div", { class: "calcite-input-wrapper" },
                this.type === "number" && this.numberButtonType === "horizontal"
                    ? numberButtonsHorizontalDown
                    : null,
                this.prefixText ? prefixText : null,
                h("div", { class: "calcite-input-element-wrapper" },
                    childEl,
                    this.isClearable ? inputClearButton : null,
                    this.icon ? iconEl : null,
                    this.loading ? loader : null),
                this.hasAction ? inputAction : null,
                this.type === "number" && this.numberButtonType === "vertical"
                    ? numberButtonsVertical
                    : null,
                this.suffixText ? suffixText : null,
                this.type === "number" && this.numberButtonType === "horizontal"
                    ? numberButtonsHorizontalUp
                    : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleLabelFocus(e) {
        if (e.detail.labelEl.contains(this.el) ||
            e.detail.labelEl.shadowRoot.contains(this.el) ||
            e.detail.requestedInput === this.el.id) {
            this.childEl.focus();
        }
    }
    keyDownHandler(e) {
        if (this.isClearable && getKey(e.key) === "Escape") {
            this.clearInputValue();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** focus the rendered child element */
    async setFocus() {
        var _a;
        (_a = this.childEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    inputInputHandler(e) {
        this.value = e.target.value;
        this.calciteInputInput.emit({
            element: this.childEl,
            value: this.value,
        });
    }
    inputBlurHandler() {
        this.calciteInputBlur.emit({
            element: this.childEl,
            value: this.value,
        });
    }
    inputFocusHandler(e) {
        if (e.target !== this.slottedActionEl)
            this.setFocus();
        this.calciteInputFocus.emit({
            element: this.childEl,
            value: this.value,
        });
    }
    determineClearable() {
        this.isClearable =
            this.type !== "textarea" &&
                (this.clearable ||
                    this.type === "search" ||
                    this.type === "time" ||
                    this.type === "date") &&
                this.value.length > 0;
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = [
            "alignment",
            "dir",
            "clearable",
            "min",
            "max",
            "step",
            "value",
            "icon",
            "loading",
            "prefix-text",
            "scale",
            "status",
            "suffix-text",
            "theme",
            "number-button-type",
        ];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    clearInputValue() {
        this.value = "";
    }
    static get is() { return "calcite-input"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-input.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-input.css"]
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
                "text": "specify the status of the input field, determines message and icons"
            },
            "attribute": "status",
            "reflect": true
        },
        "loading": {
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
                "text": "specify if the input is in loading state"
            },
            "attribute": "loading",
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
                "text": "specify the scale of the input, defaults to m"
            },
            "attribute": "scale",
            "reflect": true
        },
        "alignment": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"start\" | \"end\"",
                "resolved": "\"end\" | \"start\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the alignment of the value of the input"
            },
            "attribute": "alignment",
            "reflect": true,
            "defaultValue": "\"start\""
        },
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "input value"
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "\"\""
        },
        "clearable": {
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
                "text": "will not display for type=\"textarea\""
            },
            "attribute": "clearable",
            "reflect": true
        },
        "step": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "input step"
            },
            "attribute": "step",
            "reflect": true
        },
        "min": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "input min"
            },
            "attribute": "min",
            "reflect": true
        },
        "max": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "input max"
            },
            "attribute": "max",
            "reflect": true
        },
        "prefixText": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "optionally add prefix  *"
            },
            "attribute": "prefix-text",
            "reflect": false
        },
        "suffixText": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "optionally add suffix  *"
            },
            "attribute": "suffix-text",
            "reflect": false
        },
        "icon": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "string | boolean",
                "resolved": "boolean | string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "for recognized input types, show an icon if applicable"
            },
            "attribute": "icon",
            "reflect": true,
            "defaultValue": "false"
        },
        "type": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"color\"\n    | \"date\"\n    | \"datetime-local\"\n    | \"email\"\n    | \"file\"\n    | \"image\"\n    | \"month\"\n    | \"number\"\n    | \"password\"\n    | \"search\"\n    | \"tel\"\n    | \"text\"\n    | \"textarea\"\n    | \"time\"\n    | \"url\"\n    | \"week\"",
                "resolved": "\"color\" | \"date\" | \"datetime-local\" | \"email\" | \"file\" | \"image\" | \"month\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"textarea\" | \"time\" | \"url\" | \"week\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the input type"
            },
            "attribute": "type",
            "reflect": true,
            "defaultValue": "\"text\""
        },
        "numberButtonType": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"vertical\"\n    | \"horizontal\"\n    | \"none\"",
                "resolved": "\"horizontal\" | \"none\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "specify the placement of the number buttons"
            },
            "attribute": "number-button-type",
            "reflect": true,
            "defaultValue": "\"vertical\""
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
                "text": "specify the alignment of dropdown, defaults to left"
            },
            "attribute": "theme",
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
                "text": "is the input required"
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        },
        "autofocus": {
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
                "text": "should the input autofocus"
            },
            "attribute": "autofocus",
            "reflect": false,
            "defaultValue": "false"
        },
        "placeholder": {
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
                "text": "explicitly whitelist placeholder attribute"
            },
            "attribute": "placeholder",
            "reflect": false
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
                "text": "is the input disabled"
            },
            "attribute": "disabled",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "calciteInputFocus",
            "name": "calciteInputFocus",
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
        }, {
            "method": "calciteInputBlur",
            "name": "calciteInputBlur",
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
        }, {
            "method": "calciteInputInput",
            "name": "calciteInputInput",
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
    static get methods() { return {
        "setFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "focus the rendered child element",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "min",
            "methodName": "minWatcher"
        }, {
            "propName": "max",
            "methodName": "maxWatcher"
        }, {
            "propName": "step",
            "methodName": "stepWatcher"
        }]; }
    static get listeners() { return [{
            "name": "calciteLabelFocus",
            "method": "handleLabelFocus",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
