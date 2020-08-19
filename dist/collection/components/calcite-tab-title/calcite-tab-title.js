import { Component, Prop, Event, Listen, Element, Method, h, Host, State, Build } from "@stencil/core";
import { guid } from "../../utils/guid";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";
export class CalciteTabTitle {
    constructor() {
        /** Show this tab title as selected */
        this.active = false;
        /** determine if there is slotted text for styling purposes */
        this.hasText = false;
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
    connectedCallback() {
        this.setupTextContentObserver();
    }
    disconnectedCallback() {
        this.observer.disconnect();
        this.calciteTabTitleUnregister.emit();
    }
    componentWillLoad() {
        if (Build.isBrowser) {
            this.updateHasText();
        }
        if (this.tab && this.active) {
            this.calciteTabsActivate.emit({
                tab: this.tab
            });
        }
    }
    componentWillRender() {
        var _a, _b;
        this.layout = (_a = this.el.closest("calcite-tabs")) === null || _a === void 0 ? void 0 : _a.layout;
        this.position = (_b = this.el.closest("calcite-tabs")) === null || _b === void 0 ? void 0 : _b.position;
    }
    render() {
        const id = this.el.id || this.guid;
        const iconStartEl = (h("calcite-icon", { class: "calcite-tab-title--icon icon-start", icon: this.iconStart, scale: "s" }));
        const iconEndEl = (h("calcite-icon", { class: "calcite-tab-title--icon icon-end", icon: this.iconEnd, scale: "s" }));
        return (h(Host, { id: id, "aria-controls": this.controls, "aria-expanded": this.active.toString(), role: "tab", tabindex: "0", hasText: this.hasText },
            h("a", null,
                this.iconStart ? iconStartEl : null,
                h("slot", null),
                this.iconEnd ? iconEndEl : null)));
    }
    componentDidLoad() {
        this.calciteTabTitleRegister.emit();
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
            tab: this.tab
        });
    }
    keyDownHandler(e) {
        switch (getKey(e.key)) {
            case " ":
            case "Enter":
                this.calciteTabsActivate.emit({
                    tab: this.tab
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
    updateHasText() {
        this.hasText = this.el.textContent.trim().length > 0;
    }
    setupTextContentObserver() {
        if (Build.isBrowser) {
            this.observer = new MutationObserver(() => {
                this.updateHasText();
            });
            this.observer.observe(this.el, { childList: true, subtree: true });
        }
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
        "iconStart": {
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
                "text": "optionally pass an icon to display at the start of a tab title - accepts calcite ui icon names"
            },
            "attribute": "icon-start",
            "reflect": true
        },
        "iconEnd": {
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
                "text": "optionally pass an icon to display at the end of a tab title - accepts calcite ui icon names"
            },
            "attribute": "icon-end",
            "reflect": true
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
        },
        "position": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"above\" | \"below\"",
                "resolved": "\"above\" | \"below\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Parent tabs component position value",
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "position",
            "reflect": true
        }
    }; }
    static get states() { return {
        "controls": {},
        "hasText": {}
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
