import { Component, Prop, Event, Listen, Element, Method, h, Host, State, } from "@stencil/core";
import { guid } from "../../utils/guid";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";
export class CalciteTabTitle {
    constructor() {
        /** Show this tab title as selected */
        this.active = false;
        /**
         * @internal
         */
        this.guid = `calcite-tab-title-${guid()}`;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        if (this.tab && this.active) {
            this.calciteTabsActivate.emit({
                tab: this.tab,
            });
        }
    }
    componentWillRender() {
        var _a;
        this.layout = (_a = this.el.closest("calcite-tabs")) === null || _a === void 0 ? void 0 : _a.layout;
    }
    render() {
        const id = this.el.id || this.guid;
        return (h(Host, { id: id, "aria-controls": this.controls, "aria-expanded": this.active.toString(), role: "tab", tabindex: "0" },
            h("a", null,
                h("slot", null))));
    }
    componentDidLoad() {
        this.calciteTabTitleRegister.emit();
    }
    componentDidUnload() {
        this.calciteTabTitleUnregister.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Events Listeners
    //
    //--------------------------------------------------------------------------
    tabChangeHandler(event) {
        if (this.tab) {
            this.active = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then((index) => {
                this.active = index === event.detail.tab;
            });
        }
    }
    onClick() {
        this.calciteTabsActivate.emit({
            tab: this.tab,
        });
    }
    keyDownHandler(e) {
        switch (getKey(e.key)) {
            case " ":
            case "Enter":
                this.calciteTabsActivate.emit({
                    tab: this.tab,
                });
                e.preventDefault();
                break;
            case "ArrowRight":
                if (getElementDir(this.el) === "ltr") {
                    this.calciteTabsFocusNext.emit();
                }
                else {
                    this.calciteTabsFocusPrevious.emit();
                }
                break;
            case "ArrowLeft":
                if (getElementDir(this.el) === "ltr") {
                    this.calciteTabsFocusPrevious.emit();
                }
                else {
                    this.calciteTabsFocusNext.emit();
                }
                break;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Return the index of this title within the nav
     */
    async getTabIndex() {
        return Promise.resolve(Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-tab-title"), this.el));
    }
    /**
     * @internal
     */
    async getTabIdentifier() {
        return this.tab ? Promise.resolve(this.tab) : this.getTabIndex();
    }
    /**
     * @internal
     */
    async updateAriaInfo(tabIds = [], titleIds = []) {
        this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
        return Promise.resolve();
    }
    static get is() { return "calcite-tab-title"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-tab-title.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-tab-title.css"]
    }; }
    static get properties() { return {
        "tab": {
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
                "tags": [],
                "text": "Optionally include a unique name for the tab title,\nbe sure to also set this name on the associated tab."
            },
            "attribute": "tab",
            "reflect": true
        },
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
                "text": "Show this tab title as selected"
            },
            "attribute": "active",
            "reflect": true,
            "defaultValue": "false"
        },
        "layout": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"center\" | \"inline\"",
                "resolved": "\"center\" | \"inline\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Parent tabs component layout value",
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "layout",
            "reflect": true
        }
    }; }
    static get states() { return {
        "controls": {}
    }; }
    static get events() { return [{
            "method": "calciteTabsActivate",
            "name": "calciteTabsActivate",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fires when a specific tab is activated. `event.details`: [TabChangeEventDetail](../../interfaces/TabChange.ts)"
            },
            "complexType": {
                "original": "TabChangeEventDetail",
                "resolved": "TabChangeEventDetail",
                "references": {
                    "TabChangeEventDetail": {
                        "location": "import",
                        "path": "../../interfaces/TabChange"
                    }
                }
            }
        }, {
            "method": "calciteTabsFocusNext",
            "name": "calciteTabsFocusNext",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteTabsFocusPrevious",
            "name": "calciteTabsFocusPrevious",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteTabTitleRegister",
            "name": "calciteTabTitleRegister",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteTabTitleUnregister",
            "name": "calciteTabTitleUnregister",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "getTabIndex": {
            "complexType": {
                "signature": "() => Promise<number>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<number>"
            },
            "docs": {
                "text": "Return the index of this title within the nav",
                "tags": []
            }
        },
        "getTabIdentifier": {
            "complexType": {
                "signature": "() => Promise<string | number>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<string | number>"
            },
            "docs": {
                "text": "",
                "tags": [{
                        "name": "internal",
                        "text": undefined
                    }]
            }
        },
        "updateAriaInfo": {
            "complexType": {
                "signature": "(tabIds?: string[], titleIds?: string[]) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
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
                "text": "",
                "tags": [{
                        "name": "internal",
                        "text": undefined
                    }]
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "calciteTabChange",
            "method": "tabChangeHandler",
            "target": "parent",
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
