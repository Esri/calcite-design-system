import { h, Host } from "@stencil/core";
import { guid } from "../../utils/guid";
import { nodeListToArray } from "../../utils/dom";
export class CalciteTab {
    constructor() {
        this.id = `calcite-tab-${guid()}`;
        this.isActive = false;
    }
    tabChangeHandler(event) {
        if (!nodeListToArray(event.target.parentNode.children).some(child => child == this.el)) {
            return;
        }
        if (this.tab) {
            this.isActive = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then(index => {
                this.isActive = index === event.detail.tab;
            });
        }
    }
    componentDidLoad() {
        this.getTabIndex().then(index => {
            this.calciteRegisterTab.emit({
                id: this.id,
                index
            });
        });
    }
    async getTabIndex() {
        return Promise.resolve(Array.prototype.indexOf.call(nodeListToArray(this.el.parentElement.children).filter(e => e.matches("calcite-tab")), this.el));
    }
    async registerLabeledBy(id) {
        this.labeledBy = id;
    }
    render() {
        return (h(Host, { "aria-labeledby": this.labeledBy, "aria-expanded": this.isActive ? "true" : "false", role: "tabpanel" },
            h("section", null,
                h("slot", null))));
    }
    static get is() { return "calcite-tab"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-tab.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-tab.css"]
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
            "defaultValue": "`calcite-tab-${guid()}`"
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
        "labeledBy": {}
    }; }
    static get events() { return [{
            "method": "calciteRegisterTab",
            "name": "calciteRegisterTab",
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
        "registerLabeledBy": {
            "complexType": {
                "signature": "(id: any) => Promise<void>",
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
            "method": "tabChangeHandler",
            "target": "parent",
            "capture": false,
            "passive": false
        }]; }
}
