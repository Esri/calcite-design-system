import { h, Host } from "@stencil/core";
import { guid } from "../../utils/guid";
import { getElementTheme, getElementProp } from "../../utils/dom";
import DropdownInterface from "../../interfaces/DropdownInterface";
export class CalciteDropdownGroup {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.requestedDropdownGroup = "";
        this.requestedDropdownItem = "";
        /** optionally set a group title for display */
        this.grouptitle = null;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of dropdown items */
        this.items = [];
        /** unique id for dropdown group */
        /** @internal */
        this.dropdownGroupId = `calcite-dropdown-group-${guid()}`;
        this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map(a => a.item);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        this.groupPosition = this.getGroupPosition();
        this.items = this.sortItems(this.items);
        this.registerCalciteDropdownGroup.emit({
            items: this.items,
            position: this.groupPosition
        });
    }
    render() {
        const theme = getElementTheme(this.el);
        const scale = getElementProp(this.el, "scale", "m");
        const dropdownState = {
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem
        };
        const grouptitle = this.grouptitle ? (h("span", { class: "dropdown-title" }, this.grouptitle)) : null;
        return (h(Host, { theme: theme, scale: scale, id: this.dropdownGroupId },
            grouptitle,
            h(DropdownInterface.Provider, { state: dropdownState },
                h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    updateActiveItemOnChange(event) {
        this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
        this.calciteDropdownItemHasChanged.emit({
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem
        });
    }
    registerCalciteDropdownItem(e) {
        const item = {
            item: e.detail.item,
            position: e.detail.position
        };
        this.items.push(item);
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
        "grouptitle": {
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
            "attribute": "grouptitle",
            "reflect": true,
            "defaultValue": "null"
        }
    }; }
    static get states() { return {
        "requestedDropdownGroup": {},
        "requestedDropdownItem": {},
        "items": {},
        "groupPosition": {}
    }; }
    static get events() { return [{
            "method": "calciteDropdownItemHasChanged",
            "name": "calciteDropdownItemHasChanged",
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
            "method": "registerCalciteDropdownGroup",
            "name": "registerCalciteDropdownGroup",
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
            "name": "calciteDropdownItemSelected",
            "method": "updateActiveItemOnChange",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "registerCalciteDropdownItem",
            "method": "registerCalciteDropdownItem",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
