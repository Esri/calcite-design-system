import { Component, Element, Event, h, Method, Prop, State, Watch } from "@stencil/core";
import { hexChar, hexToRGB, isLonghandHex, isValidHex, normalizeHex, rgbToHex } from "../calcite-color/utils";
import Color from "color";
import { CSS } from "./resources";
import { focusElement, getElementDir } from "../../utils/dom";
import { TEXT } from "../calcite-color/resources";
const DEFAULT_COLOR = Color();
export class CalciteColorHexInput {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Label used for the hex input.
         */
        this.intlHex = TEXT.hex;
        /**
         * The component's scale.
         */
        this.scale = "m";
        /**
         * The component's theme.
         */
        this.theme = "light";
        /**
         * The hex value.
         */
        this.value = normalizeHex(DEFAULT_COLOR.hex());
        this.onCalciteInputBlur = (event) => {
            const node = event.currentTarget;
            const hex = `#${node.value}`;
            if (isValidHex(hex) && isLonghandHex(hex)) {
                return;
            }
            // manipulating DOM directly since rerender doesn't update input value
            node.value = this.formatForInternalInput(rgbToHex(this.internalColor.object()));
        };
        this.onInputChange = (event) => {
            const node = event.currentTarget;
            const hex = node.value;
            const color = hexToRGB(`#${hex}`);
            if (!color) {
                return;
            }
            this.value = normalizeHex(hex);
            this.calciteColorHexInputChange.emit();
        };
        this.onInputKeyDown = (event) => {
            const { inputNode } = this;
            const { key, altKey, ctrlKey, metaKey } = event;
            const withModifiers = altKey || ctrlKey || metaKey;
            const exceededHexLength = inputNode.value.length >= 6;
            const hasTextSelection = getSelection().type === "Range";
            if (key.length === 1 &&
                !withModifiers &&
                !hasTextSelection &&
                (!hexChar.test(key) || exceededHexLength)) {
                event.preventDefault();
            }
        };
        /**
         * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
         */
        this.internalColor = DEFAULT_COLOR;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        const normalized = normalizeHex(this.value);
        if (isValidHex(normalized)) {
            this.internalColor = Color(normalized);
            this.value = normalized;
        }
    }
    handleValueChange(value, oldValue) {
        const normalized = normalizeHex(value);
        if (isValidHex(normalized)) {
            const changed = normalized !== normalizeHex(this.internalColor.hex());
            this.internalColor = Color(normalized);
            this.value = normalized;
            if (changed) {
                this.calciteColorHexInputChange.emit();
            }
            return;
        }
        this.value = oldValue;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const { el, intlHex, value } = this;
        const hexInputValue = this.formatForInternalInput(value);
        const elementDir = getElementDir(el);
        return (h("div", { class: CSS.container },
            h("calcite-input", { "aria-label": intlHex, class: CSS.input, dir: elementDir, onChange: this.onInputChange, onCalciteInputBlur: this.onCalciteInputBlur, onKeyDown: this.onInputKeyDown, prefixText: "#", ref: (node) => (this.inputNode = node), scale: "s", value: hexInputValue }),
            h("calcite-color-swatch", { active: true, class: CSS.preview, scale: "s", color: `#${hexInputValue}` })));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        focusElement(this.inputNode);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    formatForInternalInput(hex) {
        return hex.replace("#", "");
    }
    static get is() { return "calcite-color-hex-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-color-hex-input.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-color-hex-input.css"]
    }; }
    static get properties() { return {
        "intlHex": {
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
                "text": "Label used for the hex input."
            },
            "attribute": "intl-hex",
            "reflect": false,
            "defaultValue": "TEXT.hex"
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Exclude<Scale, \"xs\" | \"xl\">",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {
                    "Exclude": {
                        "location": "global"
                    },
                    "Scale": {
                        "location": "import",
                        "path": "../../interfaces/common"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The component's scale."
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Theme",
                "resolved": "\"dark\" | \"light\"",
                "references": {
                    "Theme": {
                        "location": "import",
                        "path": "../../interfaces/common"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The component's theme."
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The hex value."
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "normalizeHex(DEFAULT_COLOR.hex())"
        }
    }; }
    static get states() { return {
        "internalColor": {}
    }; }
    static get events() { return [{
            "method": "calciteColorHexInputChange",
            "name": "calciteColorHexInputChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the hex value changes."
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
                "text": "Sets focus on the component.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "handleValueChange"
        }]; }
}
