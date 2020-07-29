import { Component, Element, Event, h, Host, Listen, Prop, } from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { getKey } from "../../utils/key";
export class CalciteAccordionItem {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** the containing accordion element */
        this.parent = this.el.parentElement;
        /** what selection mode is the parent accordion in */
        this.selectionMode = getElementProp(this.el, "selection-mode", "multi");
        /** what icon type does the parent accordion specify */
        this.iconType = getElementProp(this.el, "icon-type", "chevron");
        /** what icon position does the parent accordion specify */
        this.iconPosition = getElementProp(this.el, "icon-position", "end");
        /** the scale of the parent accordion */
        this.scale = getElementProp(this.el, "scale", "m");
        /** handle clicks on item header */
        this.itemHeaderClickHandler = () => this.emitRequestedItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        this.itemPosition = this.getItemPosition();
        this.calciteAccordionItemRegister.emit({
            parent: this.parent,
            position: this.itemPosition,
        });
    }
    render() {
        const dir = getElementDir(this.el);
        const iconScale = this.scale !== "l" ? "s" : "m";
        const iconEl = (h("calcite-icon", { class: "accordion-item-icon", icon: this.icon, scale: iconScale }));
        return (h(Host, { tabindex: "0", "aria-expanded": this.active.toString(), dir: dir, "icon-position": this.iconPosition },
            h("div", { class: "accordion-item-header", onClick: this.itemHeaderClickHandler },
                this.icon ? iconEl : null,
                h("div", { class: "accordion-item-header-text" },
                    h("span", { class: "accordion-item-title" }, this.itemTitle),
                    h("span", { class: "accordion-item-subtitle" }, this.itemSubtitle)),
                h("calcite-icon", { class: "accordion-item-expand-icon", icon: this.iconType === "chevron"
                        ? "chevronUp"
                        : this.iconType === "caret"
                            ? "caretUp"
                            : this.active
                                ? "minus"
                                : "plus", scale: "s" })),
            h("div", { class: "accordion-item-content" },
                h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
        if (e.target === this.el) {
            switch (getKey(e.key)) {
                case " ":
                case "Enter":
                    this.emitRequestedItem();
                    e.preventDefault();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                case "Home":
                case "End":
                    this.calciteAccordionItemKeyEvent.emit({
                        parent: this.parent,
                        item: e,
                    });
                    e.preventDefault();
                    break;
            }
        }
    }
    updateActiveItemOnChange(event) {
        this.requestedAccordionItem = event.detail
            .requestedAccordionItem;
        this.determineActiveItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    determineActiveItem() {
        switch (this.selectionMode) {
            case "multi":
                if (this.el === this.requestedAccordionItem)
                    this.active = !this.active;
                break;
            case "single":
                if (this.el === this.requestedAccordionItem)
                    this.active = !this.active;
                else
                    this.active = false;
                break;
            case "single-persist":
                this.active = this.el === this.requestedAccordionItem;
                break;
        }
    }
    emitRequestedItem() {
        this.calciteAccordionItemSelect.emit({
            requestedAccordionItem: this.el,
        });
    }
    getItemPosition() {
        return Array.prototype.indexOf.call(this.parent.querySelectorAll("calcite-accordion-item"), this.el);
    }
    static get is() { return "calcite-accordion-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-accordion-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-accordion-item.css"]
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
                "text": "pass a title for the accordion item"
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
                "text": "pass a title for the accordion item"
            },
            "attribute": "item-subtitle",
            "reflect": false
        },
        "icon": {
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
                "text": "optionally pass an icon to display - accepts Calcite UI icon names"
            },
            "attribute": "icon",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "calciteAccordionItemKeyEvent",
            "name": "calciteAccordionItemKeyEvent",
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
            "method": "calciteAccordionItemSelect",
            "name": "calciteAccordionItemSelect",
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
            "method": "calciteAccordionItemClose",
            "name": "calciteAccordionItemClose",
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
            "method": "calciteAccordionItemRegister",
            "name": "calciteAccordionItemRegister",
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
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteAccordionChange",
            "method": "updateActiveItemOnChange",
            "target": "parent",
            "capture": false,
            "passive": false
        }]; }
}
