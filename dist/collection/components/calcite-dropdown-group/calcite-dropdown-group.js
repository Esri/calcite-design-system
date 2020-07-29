import { Component, Element, Event, h, Host, Listen, Prop, } from "@stencil/core";
export class CalciteDropdownGroup {
    constructor() {
        /** specify the selection mode - multi (allow any number of (or no) active items), single (allow and require one active item),
         none (no active items), defaults to single */
        this.selectionMode = "single";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of dropdown items */
        this.items = [];
        this.titleEl = null;
        this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map((a) => a.item);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let selectionMode = ["multi", "single", "none"];
        if (!selectionMode.includes(this.selectionMode))
            this.selectionMode = "single";
    }
    componentDidLoad() {
        this.groupPosition = this.getGroupPosition();
        this.items = this.sortItems(this.items);
        this.calciteDropdownGroupRegister.emit({
            items: this.items,
            position: this.groupPosition,
            group: this.el,
            titleEl: this.titleEl,
        });
    }
    render() {
        const groupTitle = this.groupTitle ? (h("span", { class: "dropdown-title", ref: (node) => (this.titleEl = node) }, this.groupTitle)) : null;
        return (h(Host, null,
            groupTitle,
            h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    registerCalciteDropdownItem(event) {
        const item = event.target;
        if (this.selectionMode === "none") {
            item.active = false;
        }
        this.items.push({
            item,
            position: event.detail.position,
        });
        event.stopPropagation();
    }
    updateActiveItemOnChange(event) {
        this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
        this.calciteDropdownItemChange.emit({
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getGroupPosition() {
        return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-dropdown-group"), this.el);
    }
    static get is() { return "calcite-dropdown-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-dropdown-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-dropdown-group.css"]
    }; }
    static get properties() { return {
        "groupTitle": {
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
                "text": "optionally set a group title for display"
            },
            "attribute": "group-title",
            "reflect": true
        },
        "selectionMode": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"multi\"\n    | \"single\"\n    | \"none\"",
                "resolved": "\"multi\" | \"none\" | \"single\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the selection mode - multi (allow any number of (or no) active items), single (allow and require one active item),\nnone (no active items), defaults to single"
            },
            "attribute": "selection-mode",
            "reflect": true,
            "defaultValue": "\"single\""
        }
    }; }
    static get events() { return [{
            "method": "calciteDropdownGroupRegister",
            "name": "calciteDropdownGroupRegister",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "GroupRegistration",
                "resolved": "GroupRegistration",
                "references": {
                    "GroupRegistration": {
                        "location": "import",
                        "path": "../../interfaces/Dropdown"
                    }
                }
            }
        }, {
            "method": "calciteDropdownItemChange",
            "name": "calciteDropdownItemChange",
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
            "name": "calciteDropdownItemRegister",
            "method": "registerCalciteDropdownItem",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteDropdownItemSelect",
            "method": "updateActiveItemOnChange",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
