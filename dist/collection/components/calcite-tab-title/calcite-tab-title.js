import { h, Host } from "@stencil/core";
import { guid } from "../../utils/guid";
import { SPACE, ENTER, LEFT, RIGHT } from "../../utils/keys";
export class CalciteTabTitle {
    constructor() {
        this.id = `calite-tab-title-${guid()}`;
        this.isActive = false;
    }
    tabChangeHand(event) {
        if (this.tab) {
            this.isActive = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then(index => {
                this.isActive = index === event.detail.tab;
            });
        }
    }
    onClick() {
        this.calciteActivateTab.emit({
            tab: this.tab
        });
    }
    keyDownHandler(e) {
        switch (e.keyCode) {
            case SPACE:
            case ENTER:
                this.onClick();
                break;
            case RIGHT:
                this.calciteFocusNextTab.emit();
                break;
            case LEFT:
                this.calciteFocusPreviousTab.emit();
                break;
        }
    }
    componentDidLoad() {
        this.getTabIndex().then(index => {
            this.calciteRegisterTabTitle.emit({
                id: this.id,
                index
            });
        });
    }
    async getTabIndex() {
        return Promise.resolve(Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-tab-title"), this.el));
    }
    async setControledBy(id) {
        this.controls = id;
    }
    render() {
        return (h(Host, { "aria-controls": this.controls, "aria-expanded": this.isActive ? "true" : "false", role: "tab", tabindex: "0" },
            h("a", null,
                h("slot", null))));
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
        "id": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "id",
            "reflect": true,
            "defaultValue": "`calite-tab-title-${guid()}`"
        },
        "tab": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "tab",
            "reflect": true
        },
        "isActive": {
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
            "attribute": "is-active",
            "reflect": true,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "controls": {}
    }; }
    static get events() { return [{
            "method": "calciteActivateTab",
            "name": "calciteActivateTab",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
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
            "method": "calciteFocusNextTab",
            "name": "calciteFocusNextTab",
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
            "method": "calciteFocusPreviousTab",
            "name": "calciteFocusPreviousTab",
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
            "method": "calciteRegisterTabTitle",
            "name": "calciteRegisterTabTitle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "TabRegisterEventDetail",
                "resolved": "TabRegisterEventDetail",
                "references": {
                    "TabRegisterEventDetail": {
                        "location": "import",
                        "path": "../../interfaces/TabRegister"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "getTabIndex": {
            "complexType": {
                "signature": "() => Promise<any>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<any>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "setControledBy": {
            "complexType": {
                "signature": "(id: string) => Promise<void>",
                "parameters": [{
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
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "calciteTabChange",
            "method": "tabChangeHand",
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
