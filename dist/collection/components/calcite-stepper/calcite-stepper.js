import { Component, Element, Event, h, Host, Listen, Method, Prop, Watch, } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";
export class CalciteStepper {
    constructor() {
        /** specify the scale of stepper, defaults to m */
        this.scale = "m";
        /** optionally display the number next to the step title */
        this.numbered = false;
        /** optionally display a status icon next to the step title */
        this.icon = false;
        /** specify the layout of stepper, defaults to horizontal */
        this.layout = "horizontal";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of Stepper items */
        this.items = [];
        /** sorted list of Stepper items */
        this.sortedItems = [];
    }
    // watch for removal of disabled to register step
    contentWatcher() {
        this.updateContent(this.requestedContent);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let layout = ["horizontal", "vertical"];
        if (!layout.includes(this.layout))
            this.layout = "horizontal";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let numbered = [true, false];
        if (!numbered.includes(this.numbered))
            this.numbered = false;
        let icon = [true, false];
        if (!icon.includes(this.icon))
            this.icon = false;
    }
    componentDidLoad() {
        // if no stepper items are set as active, default to the first one
        if (!this.currentPosition) {
            this.calciteStepperItemHasChanged.emit({
                position: 0,
            });
        }
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir },
            h("slot", null),
            this.layout === "horizontal" ? (h("div", { class: "stepper-content", ref: (el) => (this.stepperContentContainer = el) })) : null));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteStepperItemKeyEvent(e) {
        let item = e.detail.item;
        let itemToFocus = e.target;
        let isFirstItem = this.itemIndex(itemToFocus) === 0;
        let isLastItem = this.itemIndex(itemToFocus) === this.sortedItems.length - 1;
        switch (getKey(item.key)) {
            case "ArrowDown":
            case "ArrowRight":
                if (isLastItem)
                    this.focusFirstItem();
                else
                    this.focusNextItem(itemToFocus);
                break;
            case "ArrowUp":
            case "ArrowLeft":
                if (isFirstItem)
                    this.focusLastItem();
                else
                    this.focusPrevItem(itemToFocus);
                break;
            case "Home":
                this.focusFirstItem();
                break;
            case "End":
                this.focusLastItem();
                break;
        }
    }
    registerItem(event) {
        const item = {
            item: event.target,
            position: event.detail.position,
            content: event.detail.content,
        };
        if (item.content !== null && item.item.active)
            this.requestedContent = [item.content];
        if (!this.items.includes(item))
            this.items.push(item);
        this.sortedItems = this.sortItems();
    }
    updateItem(event) {
        if (event.detail.content)
            this.requestedContent =
                event.detail.content.length > 0
                    ? event.detail.content
                    : [event.detail.content];
        this.currentPosition = event.detail.position;
        this.calciteStepperItemHasChanged.emit({
            position: this.currentPosition,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** set the next step as active */
    async nextStep() {
        this.currentPosition =
            this.currentPosition + 1 < this.items.length
                ? this.currentPosition + 1
                : this.currentPosition;
        this.emitChangedItem();
    }
    /** set the previous step as active */
    async prevStep() {
        this.currentPosition =
            this.currentPosition - 1 >= 0
                ? this.currentPosition - 1
                : this.currentPosition;
        this.emitChangedItem();
    }
    /** set the requested step as active */
    async goToStep(num) {
        this.currentPosition = num - 1;
        this.emitChangedItem();
    }
    /** set the first step as active */
    async startStep() {
        this.currentPosition = 0;
        this.emitChangedItem();
    }
    /** set the last step as active */
    async endStep() {
        this.currentPosition = this.items.length - 1;
        this.emitChangedItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    emitChangedItem() {
        this.calciteStepperItemHasChanged.emit({
            position: this.currentPosition,
        });
    }
    focusFirstItem() {
        const firstItem = this.sortedItems[0];
        this.focusElement(firstItem);
    }
    focusLastItem() {
        const lastItem = this.sortedItems[this.sortedItems.length - 1];
        this.focusElement(lastItem);
    }
    focusNextItem(e) {
        const index = this.itemIndex(e);
        const nextItem = this.sortedItems[index + 1] || this.sortedItems[0];
        this.focusElement(nextItem);
    }
    focusPrevItem(e) {
        const index = this.itemIndex(e);
        const prevItem = this.sortedItems[index - 1] ||
            this.sortedItems[this.sortedItems.length - 1];
        this.focusElement(prevItem);
    }
    itemIndex(e) {
        return this.sortedItems.indexOf(e);
    }
    focusElement(item) {
        const target = item;
        target.focus();
    }
    sortItems() {
        let items = Array.from(this.items)
            .filter((a) => !a.item.disabled)
            .sort((a, b) => a.position - b.position)
            .map((a) => a.item);
        return [...new Set(items)];
    }
    updateContent(content) {
        if (this.stepperContentContainer) {
            this.stepperContentContainer.innerHTML = ``;
            this.stepperContentContainer.append(...content);
        }
    }
    static get is() { return "calcite-stepper"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-stepper.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-stepper.css"]
    }; }
    static get properties() { return {
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
                "text": "specify the theme of stepper, defaults to light"
            },
            "attribute": "theme",
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
                "text": "specify the scale of stepper, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
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
                "tags": [],
                "text": "optionally display the number next to the step title"
            },
            "attribute": "numbered",
            "reflect": true,
            "defaultValue": "false"
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
                "tags": [],
                "text": "optionally display a status icon next to the step title"
            },
            "attribute": "icon",
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
                "text": "specify the layout of stepper, defaults to horizontal"
            },
            "attribute": "layout",
            "reflect": true,
            "defaultValue": "\"horizontal\""
        },
        "requestedContent": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLElement[] | HTMLElement",
                "resolved": "HTMLElement | HTMLElement[]",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            }
        }
    }; }
    static get events() { return [{
            "method": "calciteStepperItemHasChanged",
            "name": "calciteStepperItemHasChanged",
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
        "nextStep": {
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
                "text": "set the next step as active",
                "tags": []
            }
        },
        "prevStep": {
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
                "text": "set the previous step as active",
                "tags": []
            }
        },
        "goToStep": {
            "complexType": {
                "signature": "(num: number) => Promise<void>",
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
                "text": "set the requested step as active",
                "tags": []
            }
        },
        "startStep": {
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
                "text": "set the first step as active",
                "tags": []
            }
        },
        "endStep": {
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
                "text": "set the last step as active",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "requestedContent",
            "methodName": "contentWatcher"
        }]; }
    static get listeners() { return [{
            "name": "calciteStepperItemKeyEvent",
            "method": "calciteStepperItemKeyEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "registerCalciteStepperItem",
            "method": "registerItem",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteStepperItemSelected",
            "method": "updateItem",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
