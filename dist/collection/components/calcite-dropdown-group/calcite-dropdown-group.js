import { h, Host } from "@stencil/core";
import { getElementTheme, getElementProp } from "../../utils/dom";
import { guid } from "../../utils/guid";
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
        /** unique id for dropdown group */
        this.dropdownGroupId = `calcite-dropdown-group-${guid()}`;
        this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map(a => a.item);
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
        this.registerCalciteDropdownGroup.emit({
            items: this.items,
            position: this.groupPosition,
            groupId: this.dropdownGroupId
        });
    }
    render() {
        const theme = getElementTheme(this.el);
        const scale = getElementProp(this.el, "scale", "m");
        const groupTitle = this.groupTitle ? (h("span", { class: "dropdown-title" }, this.groupTitle)) : null;
        return (h(Host, { theme: theme, scale: scale },
            groupTitle,
            h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    registerCalciteDropdownItem(event) {
        const item = {
            item: event.target,
            position: event.detail.position
        };
        this.items.push(item);
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
    }
    updateActiveItemOnChange(event) {
        this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
        this.calciteDropdownItemHasChanged.emit({
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem
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
            "name": "registerCalciteDropdownItem",
            "method": "registerCalciteDropdownItem",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteDropdownItemSelected",
            "method": "updateActiveItemOnChange",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
