import { Component, Element, Event, Host, Listen, Method, Prop, h, State, Watch, } from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { CSS } from "./resources";
import { getKey } from "../../utils/key";
export class CalciteComboboxItem {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /* When true, the item cannot be clicked and is visually muted. */
        this.disabled = false;
        /* Set this to true to pre-select an item. Toggles when an item is checked/unchecked. */
        this.selected = false;
        this.isSelected = this.selected;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.itemClickHandler = (event) => {
            event.preventDefault();
            if (this.disabled) {
                return;
            }
            this.isSelected = !this.isSelected;
            this.calciteComboboxItemChange.emit(this.el);
        };
    }
    selectedWatchHandler(newValue) {
        this.isSelected = newValue;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentWillLoad() {
        this.isNested = this.getDepth();
        this.hasDefaultSlot = this.el.querySelector(":not([slot])") !== null;
    }
    // --------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    // --------------------------------------------------------------------------
    keyDownHandler(event) {
        event.stopPropagation();
        switch (getKey(event.key)) {
            case " ":
            case "Enter":
                this.isSelected = !this.isSelected;
                this.calciteComboboxItemChange.emit(this.el);
                event.preventDefault();
                break;
            case "ArrowUp":
            case "ArrowDown":
            case "Home":
            case "End":
            case "Tab":
            case "Escape":
                this.calciteComboboxItemKeyEvent.emit({
                    event: event,
                    item: this.el,
                });
                event.preventDefault();
                break;
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Used to toggle the selection state. By default this won't trigger an event.
     * The first argument allows the value to be coerced, rather than swapping values.
     */
    async toggleSelected(coerce) {
        if (this.disabled) {
            return;
        }
        this.isSelected = typeof coerce === "boolean" ? coerce : !this.isSelected;
    }
    getDepth() {
        var _a;
        return !!((_a = this.el.parentElement) === null || _a === void 0 ? void 0 : _a.closest("calcite-combobox-item"));
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderIcon(scale) {
        const iconScale = scale !== "l" ? "s" : "m";
        const iconPath = this.disabled ? "circle-disallowed" : "check";
        return h("calcite-icon", { class: CSS.icon, scale: iconScale, icon: iconPath });
    }
    renderChildren() {
        if (!this.hasDefaultSlot) {
            return null;
        }
        return (h("ul", null,
            h("slot", null)));
    }
    render() {
        const classes = {
            [CSS.label]: true,
            [CSS.selected]: this.isSelected,
            [CSS.nested]: this.isNested,
            [CSS.parent]: !this.isNested,
        };
        const scale = getElementProp(this.el, "scale", "m");
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, scale: scale, role: "option", "aria-selected": this.isSelected, disabled: this.disabled, tabIndex: this.disabled ? null : 0 },
            h("div", { class: classes, onClick: this.itemClickHandler, ref: (el) => (this.comboboxItemEl = el) },
                this.renderIcon(scale),
                h("span", { class: CSS.title }, this.textLabel)),
            this.renderChildren()));
    }
    static get is() { return "calcite-combobox-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./calcite-combobox-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-combobox-item.css"]
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
                "text": ""
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "parentItem": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLCalciteComboboxItemElement",
                "resolved": "HTMLCalciteComboboxItemElement",
                "references": {
                    "HTMLCalciteComboboxItemElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "selected": {
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
                "text": ""
            },
            "attribute": "selected",
            "reflect": true,
            "defaultValue": "false"
        },
        "textLabel": {
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
                "text": ""
            },
            "attribute": "text-label",
            "reflect": true
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
                "text": ""
            },
            "attribute": "value",
            "reflect": true
        }
    }; }
    static get states() { return {
        "isSelected": {}
    }; }
    static get events() { return [{
            "method": "calciteComboboxItemChange",
            "name": "calciteComboboxItemChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "calciteComboboxItemChange",
                        "name": "event"
                    }],
                "text": "Emitted whenever the item is selected or unselected."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteComboboxItemKeyEvent",
            "name": "calciteComboboxItemKeyEvent",
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
        "toggleSelected": {
            "complexType": {
                "signature": "(coerce?: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Used to toggle the selection state. By default this won't trigger an event.\nThe first argument allows the value to be coerced, rather than swapping values.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "selected",
            "methodName": "selectedWatchHandler"
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
