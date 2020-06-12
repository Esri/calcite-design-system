import { Component, h, Host, Prop, State, Listen, Event, Element, } from "@stencil/core";
import { filter } from "../../utils/filter";
import { getElementDir } from "../../utils/dom";
import { debounce } from "lodash-es";
import { getKey } from "../../utils/key";
const COMBO_BOX_ITEM = "calcite-combobox-item";
export class CalciteCombobox {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        this.disabled = false;
        /** specify the scale of the combobox, defaults to m */
        this.scale = "m";
        this.items = [];
        this.selectedItems = [];
        this.visibleItems = [];
        this.textInput = null;
        this.observer = new MutationObserver(this.updateItems);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.inputHandler = (event) => {
            const target = event.target;
            this.filterItems(target.value);
        };
        this.filterItems = debounce((value) => {
            const filteredData = filter(this.data, value);
            const values = filteredData.map((item) => item.value);
            this.items.forEach((item) => {
                item.hidden = values.indexOf(item.value) === -1;
                // If item is nested inside another item...
                const { parentItem } = item;
                if (parentItem) {
                    // If the parent item is a match, show me.
                    if (values.indexOf(parentItem.value) !== -1) {
                        item.hidden = false;
                    }
                    // If I am a match, show my parent.
                    if (values.indexOf(item.value) !== -1) {
                        parentItem.hidden = false;
                    }
                }
            });
            this.visibleItems = this.getVisibleItems();
        }, 100);
        this.comboboxFocusHandler = (event) => {
            this.active = event.type === "focusin";
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    componentWillLoad() {
        this.updateItems();
    }
    componentDidLoad() {
        this.observer.observe(this.el, { childList: true, subtree: true });
    }
    componentDidUnload() {
        this.observer.disconnect();
    }
    calciteComboboxItemChangeHandler(event) {
        this.toggleSelection(event.detail);
    }
    calciteChipDismissHandler(event) {
        var _a;
        this.textInput.focus();
        const value = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.value;
        const comboboxItem = this.items.find((item) => item.value === value);
        if (comboboxItem) {
            this.toggleSelection(comboboxItem, false);
        }
    }
    handleInputKeyDown(event) {
        if (event.target === this.textInput) {
            const key = getKey(event.key);
            if (event.shiftKey && key === "Tab") {
                return;
            }
            else if (key === "Escape") {
                this.active = false;
            }
            else if (key === "ArrowDown") {
                this.focusFirstItem();
            }
            else if (key === "ArrowUp") {
                this.focusLastItem();
            }
            else {
                this.active = true;
                this.textInput.focus();
            }
        }
    }
    toggleSelection(item, value = !item.selected) {
        item.selected = value;
        this.selectedItems = this.getSelectedItems();
        this.calciteLookupChange.emit(this.selectedItems);
    }
    getVisibleItems() {
        return this.items.filter((item) => !item.hidden);
    }
    getSelectedItems() {
        return this.items.filter((item) => item.selected);
    }
    updateItems() {
        this.items = this.getItems();
        this.data = this.getData();
        this.selectedItems = this.getSelectedItems();
        this.visibleItems = this.getVisibleItems();
    }
    getData() {
        return this.items.map((item) => ({
            value: item.value,
            label: item.textLabel,
        }));
    }
    getItems() {
        const items = Array.from(this.el.querySelectorAll(COMBO_BOX_ITEM));
        return items
            .filter((item) => !item.disabled)
            .map((item) => {
            const { parentElement } = item;
            item.parentItem = parentElement.matches(COMBO_BOX_ITEM)
                ? parentElement
                : null;
            return item;
        });
    }
    calciteComboboxItemKeyEventHandler(event) {
        const { item, event: keyboardEvent } = event.detail;
        let isFirstItem = this.itemIndex(item) === 0;
        let isLastItem = this.itemIndex(item) === this.items.length - 1;
        const shiftKey = keyboardEvent.shiftKey;
        const keyCode = getKey(keyboardEvent.key);
        switch (keyCode) {
            case "Tab":
                if (isFirstItem && shiftKey)
                    this.closeCalciteCombobox();
                if (isLastItem && !shiftKey)
                    this.closeCalciteCombobox();
                else if (isFirstItem && shiftKey)
                    this.textInput.focus();
                else if (shiftKey)
                    this.focusPrevItem(item);
                else
                    this.focusNextItem(item);
                break;
            case "ArrowDown":
                this.focusNextItem(item);
                break;
            case "ArrowUp":
                this.focusPrevItem(item);
                break;
            case "Home":
                this.focusFirstItem();
                break;
            case "End":
                this.focusLastItem();
                break;
            case "Escape":
                this.closeCalciteCombobox();
                break;
        }
    }
    closeCalciteCombobox() {
        this.textInput.focus();
        this.active = false;
    }
    focusFirstItem() {
        const firstItem = this.items[0];
        firstItem.focus();
    }
    focusLastItem() {
        const lastItem = this.items[this.items.length - 1];
        lastItem.focus();
    }
    focusNextItem(item) {
        const index = this.itemIndex(item);
        const nextItem = this.items[index + 1] || this.items[0];
        nextItem.focus();
    }
    focusPrevItem(item) {
        const index = this.itemIndex(item);
        const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        prevItem.focus();
    }
    itemIndex(item) {
        return this.items.indexOf(item);
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const dir = getElementDir(this.el);
        const listBoxId = "listbox";
        return (h(Host, { active: this.active, onFocusin: this.comboboxFocusHandler, onFocusout: this.comboboxFocusHandler, dir: dir },
            h("div", { class: "selections" }, this.selectedItems.map((item) => {
                return (h("calcite-chip", { key: item.value, scale: this.scale, value: item.value, dir: dir, dismissible: true }, item.textLabel));
            })),
            h("div", { role: "combobox", "aria-expanded": this.active.toString(), "aria-owns": listBoxId, "aria-haspopup": "listbox" },
                h("input", { type: "text", placeholder: this.placeholder, "aria-label": this.label, "aria-autocomplete": "list", "aria-controls": listBoxId, onInput: this.inputHandler, disabled: this.disabled, onKeyDown: (e) => this.handleInputKeyDown(e), ref: (el) => (this.textInput = el) })),
            h("ul", { id: listBoxId, role: "listbox", class: { list: true }, "aria-multiselectable": "true" },
                h("slot", null))));
    }
    static get is() { return "calcite-combobox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-combobox.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-combobox.css"]
    }; }
    static get properties() { return {
        "active": {
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
            "attribute": "active",
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
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
                "text": "Select theme (light or dark)"
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
                "text": "specify the scale of the combobox, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "label": {
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
            "attribute": "label",
            "reflect": false
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
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "placeholder",
            "reflect": false
        }
    }; }
    static get states() { return {
        "items": {},
        "selectedItems": {},
        "visibleItems": {}
    }; }
    static get events() { return [{
            "method": "calciteLookupChange",
            "name": "calciteLookupChange",
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
            "method": "calciteComboboxChipDismiss",
            "name": "calciteComboboxChipDismiss",
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
            "name": "calciteComboboxItemChange",
            "method": "calciteComboboxItemChangeHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteChipDismiss",
            "method": "calciteChipDismissHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteComboboxItemKeyEvent",
            "method": "calciteComboboxItemKeyEventHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
