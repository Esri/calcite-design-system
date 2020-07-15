import { Component, Element, Event, h, Host, Listen, Prop, } from "@stencil/core";
import { getKey } from "../../utils/key";
export class CalciteAccordion {
    constructor() {
        /** specify the scale of accordion, defaults to m */
        this.scale = "m";
        /** specify the appearance - default (containing border), or minimal (no containing border), defaults to default */
        this.appearance = "default";
        /** specify the placement of the icon in the header, defaults to end */
        this.iconPosition = "end";
        /** specify the type of the icon in the header, defaults to chevron */
        this.iconType = "chevron";
        /** specify the selection mode - multi (allow any number of open items), single (allow one open item),
         * or single-persist (allow and require one open item), defaults to multi */
        this.selectionMode = "multi";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of Accordion items */
        this.items = [];
        /** keep track of whether the items have been sorted so we don't re-sort */
        this.sorted = false;
        this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map((a) => a.item);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let appearance = ["default", "minimal", "transparent"];
        if (!appearance.includes(this.appearance))
            this.appearance = "default";
        let iconPosition = ["start", "end"];
        if (!iconPosition.includes(this.iconPosition))
            this.iconPosition = "end";
        let iconType = ["chevron", "caret", "plus-minus"];
        if (!iconType.includes(this.iconType))
            this.iconType = "chevron";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let selectionMode = ["multi", "single", "single-persist"];
        if (!selectionMode.includes(this.selectionMode))
            this.selectionMode = "multi";
    }
    componentDidLoad() {
        if (!this.sorted) {
            this.items = this.sortItems(this.items);
            this.sorted = true;
        }
    }
    render() {
        return (h(Host, null,
            h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteAccordionItemKeyEvent(e) {
        const item = e.detail.item;
        const parent = e.detail.parent;
        if (this.el === parent) {
            const key = getKey(item.key);
            let itemToFocus = e.target;
            let isFirstItem = this.itemIndex(itemToFocus) === 0;
            let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
            switch (key) {
                case "ArrowDown":
                    if (isLastItem)
                        this.focusFirstItem();
                    else
                        this.focusNextItem(itemToFocus);
                    break;
                case "ArrowUp":
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
    }
    registerCalciteAccordionItem(e) {
        const item = {
            item: e.target,
            parent: e.detail.parent,
            position: e.detail.position,
        };
        if (this.el === item.parent)
            this.items.push(item);
    }
    updateActiveItemOnChange(event) {
        this.requestedAccordionItem = event.detail.requestedAccordionItem;
        this.calciteAccordionChange.emit({
            requestedAccordionItem: this.requestedAccordionItem,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    focusFirstItem() {
        const firstItem = this.items[0];
        this.focusElement(firstItem);
    }
    focusLastItem() {
        const lastItem = this.items[this.items.length - 1];
        this.focusElement(lastItem);
    }
    focusNextItem(e) {
        const index = this.itemIndex(e);
        const nextItem = this.items[index + 1] || this.items[0];
        this.focusElement(nextItem);
    }
    focusPrevItem(e) {
        const index = this.itemIndex(e);
        const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        this.focusElement(prevItem);
    }
    itemIndex(e) {
        return this.items.indexOf(e);
    }
    focusElement(item) {
        const target = item;
        target.focus();
    }
    static get is() { return "calcite-accordion"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-accordion.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-accordion.css"]
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
                "text": "specify the theme of accordion, defaults to light"
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
                "text": "specify the scale of accordion, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "appearance": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"default\"\n    | \"minimal\"\n    | \"transparent\"",
                "resolved": "\"default\" | \"minimal\" | \"transparent\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the appearance - default (containing border), or minimal (no containing border), defaults to default"
            },
            "attribute": "appearance",
            "reflect": true,
            "defaultValue": "\"default\""
        },
        "iconPosition": {
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
                "text": "specify the placement of the icon in the header, defaults to end"
            },
            "attribute": "icon-position",
            "reflect": true,
            "defaultValue": "\"end\""
        },
        "iconType": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"chevron\"\n    | \"caret\"\n    | \"plus-minus\"",
                "resolved": "\"caret\" | \"chevron\" | \"plus-minus\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the type of the icon in the header, defaults to chevron"
            },
            "attribute": "icon-type",
            "reflect": true,
            "defaultValue": "\"chevron\""
        },
        "selectionMode": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"multi\"\n    | \"single\"\n    | \"single-persist\"",
                "resolved": "\"multi\" | \"single\" | \"single-persist\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the selection mode - multi (allow any number of open items), single (allow one open item),\nor single-persist (allow and require one open item), defaults to multi"
            },
            "attribute": "selection-mode",
            "reflect": true,
            "defaultValue": "\"multi\""
        }
    }; }
    static get events() { return [{
            "method": "calciteAccordionChange",
            "name": "calciteAccordionChange",
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
    static get listeners() { return [{
            "name": "calciteAccordionItemKeyEvent",
            "method": "calciteAccordionItemKeyEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteAccordionItemRegister",
            "method": "registerCalciteAccordionItem",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteAccordionItemSelect",
            "method": "updateActiveItemOnChange",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
