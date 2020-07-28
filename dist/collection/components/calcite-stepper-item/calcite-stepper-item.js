import { Component, Element, Event, h, Host, Listen, Prop, Watch, } from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { getKey } from "../../utils/key";
export class CalciteStepperItem {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /** is the step active */
        this.active = false;
        /** has the step been completed */
        this.complete = false;
        /** does the step contain an error that needs to be resolved by the user */
        this.error = false;
        /** is the step disabled and not navigable to by a user */
        this.disabled = false;
        /** should the items display an icon based on status */
        /** @internal */
        this.icon = false;
        /** optionally display the step number next to the title and subtitle */
        /** @internal */
        this.numbered = false;
        /** the scale of the item */
        /** @internal */
        this.scale = "m";
    }
    // watch for removal of disabled to register step
    disabledWatcher() {
        this.registerStepperItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.icon = getElementProp(this.el, "icon", false);
        this.numbered = getElementProp(this.el, "numbered", false);
        this.layout = getElementProp(this.el, "layout", false);
        this.scale = getElementProp(this.el, "scale", "m");
    }
    componentDidLoad() {
        this.itemPosition = this.getItemPosition();
        this.itemContent = this.getItemContent();
        this.registerStepperItem();
        if (this.active)
            this.emitRequestedItem();
    }
    componentDidUpdate() {
        if (this.active)
            this.emitRequestedItem();
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, tabindex: this.disabled ? null : 0, "aria-expanded": this.active.toString(), onClick: () => this.emitRequestedItem() },
            h("div", { class: "stepper-item-header" },
                this.icon ? this.setIcon() : null,
                this.numbered ? (h("div", { class: "stepper-item-number" },
                    this.getItemPosition() + 1,
                    ".")) : null,
                h("div", { class: "stepper-item-header-text" },
                    h("span", { class: "stepper-item-title" }, this.itemTitle),
                    h("span", { class: "stepper-item-subtitle" }, this.itemSubtitle))),
            h("div", { class: "stepper-item-content" },
                h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
        if (!this.disabled && e.target === this.el) {
            switch (getKey(e.key)) {
                case " ":
                case "Enter":
                    this.emitRequestedItem();
                    e.preventDefault();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                case "ArrowLeft":
                case "ArrowRight":
                case "Home":
                case "End":
                    this.calciteStepperItemKeyEvent.emit({ item: e });
                    e.preventDefault();
                    break;
            }
        }
    }
    updateActiveItemOnChange(event) {
        this.activePosition = event.detail.position;
        this.determineActiveItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    setIcon() {
        var path = this.active
            ? "circleF"
            : this.error
                ? "exclamationMarkCircleF"
                : this.complete
                    ? "checkCircleF"
                    : "circle";
        return h("calcite-icon", { icon: path, scale: "s", class: "stepper-item-icon" });
    }
    determineActiveItem() {
        this.active = !this.disabled && this.itemPosition === this.activePosition;
    }
    registerStepperItem() {
        this.calciteStepperItemRegister.emit({
            position: this.itemPosition,
            content: this.itemContent,
        });
    }
    emitRequestedItem() {
        if (!this.disabled) {
            this.calciteStepperItemSelect.emit({
                position: this.itemPosition,
                content: this.itemContent,
            });
        }
    }
    getItemContent() {
        var _a;
        // handle ie and edge
        return ((_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("slot")) ? this.el.shadowRoot
            .querySelector("slot")
            .assignedNodes({ flatten: true })
            : this.el.querySelector(".stepper-item-content")
                ? this.el.querySelector(".stepper-item-content")
                : null;
    }
    getItemPosition() {
        const parent = this.el.parentElement;
        return Array.prototype.indexOf.call(parent.querySelectorAll("calcite-stepper-item"), this.el);
    }
    static get is() { return "calcite-stepper-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-stepper-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-stepper-item.css"]
    }; }
    static get properties() { return {
        "active": {
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
                "text": "is the step active"
            },
            "attribute": "active",
            "reflect": true,
            "defaultValue": "false"
        },
        "complete": {
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
                "text": "has the step been completed"
            },
            "attribute": "complete",
            "reflect": true,
            "defaultValue": "false"
        },
        "error": {
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
                "text": "does the step contain an error that needs to be resolved by the user"
            },
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
        },
        "disabled": {
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
                "text": "is the step disabled and not navigable to by a user"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "itemTitle": {
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
                "text": "pass a title for the stepper item"
            },
            "attribute": "item-title",
            "reflect": false
        },
        "itemSubtitle": {
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
                "text": "pass a title for the stepper item"
            },
            "attribute": "item-subtitle",
            "reflect": false
        },
        "layout": {
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
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "layout",
            "reflect": true
        },
        "icon": {
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
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "icon",
            "reflect": false,
            "defaultValue": "false"
        },
        "numbered": {
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
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "numbered",
            "reflect": false,
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
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        }
    }; }
    static get events() { return [{
            "method": "calciteStepperItemKeyEvent",
            "name": "calciteStepperItemKeyEvent",
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
            "method": "calciteStepperItemSelect",
            "name": "calciteStepperItemSelect",
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
            "method": "calciteStepperItemRegister",
            "name": "calciteStepperItemRegister",
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
            "propName": "disabled",
            "methodName": "disabledWatcher"
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteStepperItemChange",
            "method": "updateActiveItemOnChange",
            "target": "parent",
            "capture": false,
            "passive": false
        }]; }
}
