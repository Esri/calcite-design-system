import { h } from "@stencil/core";
export class CalciteTabs {
    constructor() {
        this.tabs = {};
        this.tabTitles = {};
        this.theme = "light";
    }
    tabTitleRegistationHandler(e) {
        const { index, id } = e.detail;
        this.tabTitles[index] = {
            id: id,
            title: e.target
        };
        if (this.tabs[index]) {
            this.tabs[index].tab.registerLabeledBy(id);
        }
    }
    tabRegistationHandler(e) {
        const { index, id } = e.detail;
        this.tabs[index] = {
            id: id,
            tab: e.target
        };
        if (this.tabTitles[index]) {
            this.tabs[index].tab.registerLabeledBy(this.tabTitles[index].id);
        }
    }
    render() {
        return (h("div", null,
            h("slot", { name: "tab-nav" }),
            h("section", { class: "tab-contents" },
                h("slot", null))));
    }
    static get is() { return "calcite-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-tabs.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-tabs.css"]
    }; }
    static get properties() { return {
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
                "text": ""
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        }
    }; }
    static get states() { return {
        "tabs": {},
        "tabTitles": {}
    }; }
    static get listeners() { return [{
            "name": "calciteRegisterTabTitle",
            "method": "tabTitleRegistationHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteRegisterTab",
            "method": "tabRegistationHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
