import { h, Host } from "@stencil/core";
import { UP, DOWN, TAB, ENTER, ESCAPE, HOME, END, SPACE } from "../../utils/keys";
import { getElementDir } from "../../utils/dom";
import { guid } from "../../utils/guid";
export class CalciteDropdown {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** specify the alignment of dropdrown, defaults to left */
        this.alignment = "left";
        /** specify the alignment of dropdrown, defaults to left */
        this.theme = "light";
        /** specify the scale of dropdrown, defaults to m */
        this.scale = "m";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of dropdown items */
        this.items = [];
        /** keep track of whether the groups have been sorted so we don't re-sort */
        this.sorted = false;
        /** unique id for dropdown */
        /** @internal */
        this.dropdownId = `calcite-dropdown-${guid()}`;
        this.sortItems = (items) => items
            .sort((a, b) => a.position - b.position)
            .concat.apply([], this.items.map(item => item.items));
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let alignment = ["left", "right", "center"];
        if (!alignment.includes(this.alignment))
            this.alignment = "left";
        let theme = ["light", "dark"];
        if (!theme.includes(this.theme))
            this.theme = "light";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    componentWillUpdate() {
        if (!this.sorted) {
            this.items = this.sortItems(this.items);
            this.sorted = true;
        }
    }
    render() {
        const dir = getElementDir(this.el);
        const expanded = this.active.toString();
        return (h(Host, { dir: dir, active: this.active, id: this.dropdownId },
            h("slot", { name: "dropdown-trigger", "aria-haspopup": "true", "aria-expanded": expanded }),
            h("div", { class: "calcite-dropdown-wrapper", role: "menu" },
                h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    openDropdown(e) {
        if (e.target.getAttribute("slot") === "dropdown-trigger") {
            this.openCalciteDropdown();
            e.preventDefault();
        }
    }
    closeCalciteDropdownOnClick(e) {
        if (this.active && e.target.offsetParent.id !== this.dropdownId)
            this.closeCalciteDropdown();
    }
    closeCalciteDropdownOnEvent() {
        this.closeCalciteDropdown();
    }
    keyDownHandler(e) {
        if (e.target.getAttribute("slot") === "dropdown-trigger") {
            if (e.target.nodeName !== "BUTTON" &&
                e.target.nodeName !== "CALCITE-BUTTON") {
                switch (e.keyCode) {
                    case SPACE:
                    case ENTER:
                        this.openCalciteDropdown();
                        break;
                    case ESCAPE:
                        this.closeCalciteDropdown();
                        break;
                }
            }
            else if (e.keyCode === ESCAPE || (e.shiftKey && e.keyCode === TAB)) {
                this.closeCalciteDropdown();
            }
        }
    }
    calciteDropdownItemKeyEvent(item) {
        let e = item.detail.item;
        // handle edge
        let itemToFocus = e.target.nodeName !== "A" ? e.target : e.target.parentNode;
        let isFirstItem = this.itemIndex(itemToFocus) === 0;
        let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
        switch (e.keyCode) {
            case TAB:
                if (isLastItem && !e.shiftKey)
                    this.closeCalciteDropdown();
                else if (isFirstItem && e.shiftKey)
                    this.closeCalciteDropdown();
                else if (e.shiftKey)
                    this.focusPrevItem(itemToFocus);
                else
                    this.focusNextItem(itemToFocus);
                break;
            case DOWN:
                this.focusNextItem(itemToFocus);
                break;
            case UP:
                this.focusPrevItem(itemToFocus);
                break;
            case HOME:
                this.focusFirstItem();
                break;
            case END:
                this.focusLastItem();
                break;
        }
        e.preventDefault();
    }
    registerCalciteDropdownGroup(e) {
        const items = {
            items: e.detail.items,
            position: e.detail.position
        };
        this.items.push(items);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    closeCalciteDropdown() {
        this.active = false;
    }
    focusFirstItem() {
        const firstItem = this.items[0];
        const focusableItem = this.getFocusableElement(firstItem);
        focusableItem.focus();
    }
    focusLastItem() {
        const lastItem = this.items[this.items.length - 1];
        const focusableItem = this.getFocusableElement(lastItem);
        focusableItem.focus();
    }
    focusNextItem(e) {
        const index = this.itemIndex(e);
        const nextItem = this.items[index + 1] || this.items[0];
        const focusableItem = this.getFocusableElement(nextItem);
        focusableItem.focus();
    }
    focusPrevItem(e) {
        const index = this.itemIndex(e);
        const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        const focusableItem = this.getFocusableElement(prevItem);
        focusableItem.focus();
    }
    itemIndex(e) {
        return this.items.indexOf(e);
    }
    getFocusableElement(item) {
        return item.attributes.islink ? item.shadowRoot.querySelector("a") : item;
    }
    openCalciteDropdown() {
        this.active = !this.active;
        // time for animation
        setTimeout(() => this.focusFirstItem(), 50);
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
        "alignment": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"left\"\n    | \"right\"\n    | \"center\"",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the alignment of dropdrown, defaults to left"
            },
            "attribute": "alignment",
            "reflect": true,
            "defaultValue": "\"left\""
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
                "text": "specify the alignment of dropdrown, defaults to left"
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
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
                "text": "specify the scale of dropdrown, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        }
    }; }
    static get states() { return {
        "active": {},
        "items": {},
        "sorted": {}
    }; }
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
            "name": "closeCalciteDropdown",
            "method": "closeCalciteDropdownOnEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteDropdownItemKeyEvent",
            "method": "calciteDropdownItemKeyEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "registerCalciteDropdownGroup",
            "method": "registerCalciteDropdownGroup",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
