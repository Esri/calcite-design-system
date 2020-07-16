import { Component, Element, Event, h, Host, Listen, Prop, } from "@stencil/core";
import { getKey } from "../../utils/key";
import { focusElement, getElementDir } from "../../utils/dom";
export class CalciteDropdown {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** specify the alignment of dropdown, defaults to start */
        this.alignment = "start";
        /** specify the max items to display before showing the scroller, must be greater than 0 **/
        this.maxItems = 0;
        /**
         * **read-only** The currently selected items
         *
         * @readonly
         */
        this.selectedItems = [];
        /** specify the scale of dropdown, defaults to m */
        this.scale = "m";
        /** specify the width of dropdown, defaults to m */
        this.width = "m";
        /** specify whether the dropdown is opened by hover or click of the trigger element */
        this.type = "click";
        /**
        allow the dropdown to remain open after a selection is made
        if the selection-mode of the selected item's containing group is "none", the dropdown will always close
        */
        this.disableCloseOnSelect = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of dropdown items */
        this.items = [];
        /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
        this.maxScrollerHeight = 0;
        /** keep track of whether the groups have been sorted so we don't re-sort */
        this.sorted = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let alignment = ["start", "center", "end"];
        if (!alignment.includes(this.alignment))
            this.alignment = "start";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let width = ["s", "m", "l"];
        if (!width.includes(this.width))
            this.width = "m";
        let type = ["hover", "click"];
        if (!type.includes(this.type))
            this.type = "hover";
    }
    componentDidLoad() {
        this.trigger = this.el.querySelector("[slot=dropdown-trigger]");
        if (!this.sorted) {
            const groups = this.items.sort((a, b) => a.position - b.position);
            this.maxScrollerHeight = this.getMaxScrollerHeight(groups);
            this.items = groups.reduce((items, group) => [...items, ...group.items], []);
            this.sorted = true;
        }
    }
    render() {
        const { maxScrollerHeight } = this;
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, tabIndex: this.disabled ? -1 : null },
            h("slot", { name: "dropdown-trigger", "aria-haspopup": "true", "aria-expanded": this.active.toString() }),
            h("div", { class: "calcite-dropdown-wrapper", role: "menu", style: {
                    maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "",
                } },
                h("slot", null))));
    }
    openDropdown(e) {
        if (e.target === this.trigger || this.trigger.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            this.openCalciteDropdown();
        }
    }
    closeCalciteDropdownOnClick(e) {
        if (this.active &&
            e.target.nodeName !== "CALCITE-DROPDOWN-ITEM" &&
            e.target.nodeName !== "CALCITE-DROPDOWN-GROUP") {
            this.closeCalciteDropdown();
        }
    }
    closeCalciteDropdownOnEvent() {
        this.closeCalciteDropdown();
    }
    closeCalciteDropdownOnOpenEvent(e) {
        if (e.target !== this.el)
            this.active = false;
    }
    keyDownHandler(e) {
        const key = getKey(e.key);
        if (e.target === this.trigger || this.trigger.contains(e.target)) {
            if (e.target.nodeName !== "BUTTON" &&
                e.target.nodeName !== "CALCITE-BUTTON") {
                switch (key) {
                    case " ":
                    case "Enter":
                        this.openCalciteDropdown();
                        break;
                    case "Escape":
                        this.closeCalciteDropdown();
                        break;
                }
            }
            else if (key === "Escape" || (e.shiftKey && key === "Tab")) {
                this.closeCalciteDropdown();
            }
        }
    }
    mouseoverHandler() {
        if (this.type === "hover") {
            this.openCalciteDropdown();
        }
    }
    mouseoffHandler() {
        if (this.type === "hover") {
            this.closeCalciteDropdown();
        }
    }
    calciteDropdownItemKeyEvent(e) {
        let { keyboardEvent } = e.detail;
        // handle edge
        const target = keyboardEvent.target;
        let itemToFocus = target.nodeName !== "A" ? target : target.parentNode;
        let isFirstItem = this.itemIndex(itemToFocus) === 0;
        let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
        switch (getKey(keyboardEvent.key)) {
            case "Tab":
                if (isLastItem && !keyboardEvent.shiftKey)
                    this.closeCalciteDropdown();
                else if (isFirstItem && keyboardEvent.shiftKey)
                    this.closeCalciteDropdown();
                else if (keyboardEvent.shiftKey)
                    this.focusPrevItem(itemToFocus);
                else
                    this.focusNextItem(itemToFocus);
                break;
            case "ArrowDown":
                this.focusNextItem(itemToFocus);
                break;
            case "ArrowUp":
                this.focusPrevItem(itemToFocus);
                break;
            case "Home":
                this.focusFirstItem();
                break;
            case "End":
                this.focusLastItem();
                break;
        }
        e.stopPropagation();
    }
    handleItemSelect(event) {
        this.updateSelectedItems();
        event.stopPropagation();
        this.calciteDropdownSelect.emit();
        if (!this.disableCloseOnSelect ||
            event.detail.requestedDropdownGroup.selectionMode === "none")
            this.closeCalciteDropdown();
    }
    registerCalciteDropdownGroup(e) {
        const { detail: { items, position, titleEl }, } = e;
        this.items.push({
            items,
            position,
            titleEl,
        });
        e.stopPropagation();
        this.updateSelectedItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    updateSelectedItems() {
        const items = Array.from(this.el.querySelectorAll("calcite-dropdown-item"));
        this.selectedItems = items.filter((item) => item.active);
    }
    getMaxScrollerHeight(groups) {
        const { maxItems } = this;
        let itemsToProcess = 0;
        let maxScrollerHeight = 0;
        groups.forEach((group) => {
            var _a;
            if (maxItems > 0 && itemsToProcess < maxItems) {
                maxScrollerHeight += ((_a = group === null || group === void 0 ? void 0 : group.titleEl) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
                group.items.forEach((item) => {
                    if (itemsToProcess < maxItems) {
                        maxScrollerHeight += item.offsetHeight;
                        itemsToProcess += 1;
                    }
                });
            }
        });
        return maxScrollerHeight;
    }
    closeCalciteDropdown() {
        this.calciteDropdownClose.emit();
        this.active = false;
        focusElement(this.trigger);
    }
    focusOnFirstActiveOrFirstItem() {
        this.getFocusableElement(this.items.find((item) => item.active) || this.items[0]);
    }
    focusFirstItem() {
        const firstItem = this.items[0];
        this.getFocusableElement(firstItem);
    }
    focusLastItem() {
        const lastItem = this.items[this.items.length - 1];
        this.getFocusableElement(lastItem);
    }
    focusNextItem(e) {
        const index = this.itemIndex(e);
        const nextItem = this.items[index + 1] || this.items[0];
        this.getFocusableElement(nextItem);
    }
    focusPrevItem(e) {
        const index = this.itemIndex(e);
        const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        this.getFocusableElement(prevItem);
    }
    itemIndex(e) {
        return this.items.indexOf(e);
    }
    getFocusableElement(item) {
        if (!item) {
            return;
        }
        const target = item.attributes.isLink
            ? item.shadowRoot.querySelector("a")
            : item;
        focusElement(target);
    }
    openCalciteDropdown() {
        this.calciteDropdownOpen.emit();
        this.active = !this.active;
        const animationDelayInMs = 50;
        if (this.active) {
            setTimeout(() => this.focusOnFirstActiveOrFirstItem(), animationDelayInMs);
        }
    }
    static get is() { return "calcite-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-dropdown.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-dropdown.css"]
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
                "text": ""
            },
            "attribute": "active",
            "reflect": true,
            "defaultValue": "false"
        },
        "alignment": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"start\"\n    | \"center\"\n    | \"end\"",
                "resolved": "\"center\" | \"end\" | \"start\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the alignment of dropdown, defaults to start"
            },
            "attribute": "alignment",
            "reflect": true,
            "defaultValue": "\"start\""
        },
        "maxItems": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the max items to display before showing the scroller, must be greater than 0 *"
            },
            "attribute": "max-items",
            "reflect": false,
            "defaultValue": "0"
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
                "text": "specify the theme of the dropdown, defaults to light"
            },
            "attribute": "theme",
            "reflect": true
        },
        "selectedItems": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "HTMLCalciteDropdownItemElement[]",
                "resolved": "HTMLCalciteDropdownItemElement[]",
                "references": {
                    "HTMLCalciteDropdownItemElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "readonly"
                    }],
                "text": "**read-only** The currently selected items"
            },
            "defaultValue": "[]"
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
                "text": "specify the scale of dropdown, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "width": {
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
                "text": "specify the width of dropdown, defaults to m"
            },
            "attribute": "width",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "type": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"hover\" | \"click\"",
                "resolved": "\"click\" | \"hover\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify whether the dropdown is opened by hover or click of the trigger element"
            },
            "attribute": "type",
            "reflect": true,
            "defaultValue": "\"click\""
        },
        "disableCloseOnSelect": {
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
                "text": "allow the dropdown to remain open after a selection is made\nif the selection-mode of the selected item's containing group is \"none\", the dropdown will always close"
            },
            "attribute": "disable-close-on-select",
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
                "text": "is the dropdown disabled"
            },
            "attribute": "disabled",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "calciteDropdownSelect",
            "name": "calciteDropdownSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "fires when a dropdown item has been selected or deselected *"
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "calciteDropdownOpen",
            "name": "calciteDropdownOpen",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "fires when a dropdown has been opened *"
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "calciteDropdownClose",
            "name": "calciteDropdownClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "fires when a dropdown has been closed *"
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "click",
            "method": "openDropdown",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "closeCalciteDropdownOnClick",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "calciteDropdownCloseRequest",
            "method": "closeCalciteDropdownOnEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteDropdownOpen",
            "method": "closeCalciteDropdownOnOpenEvent",
            "target": "window",
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
            "method": "mouseoverHandler",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "mouseleave",
            "method": "mouseoffHandler",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "calciteDropdownItemKeyEvent",
            "method": "calciteDropdownItemKeyEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteDropdownItemSelect",
            "method": "handleItemSelect",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteDropdownGroupRegister",
            "method": "registerCalciteDropdownGroup",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
