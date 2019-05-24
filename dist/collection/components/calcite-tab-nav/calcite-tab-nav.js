import { h, Host } from "@stencil/core";
import { guid } from "../../utils/guid";
export class CalciteTabNav {
    constructor() {
        this.id = `calite-tab-nav-${guid()}`;
        this.selectedTab = 0;
    }
    selectedTabChanged() {
        this.calciteTabChange.emit({
            tab: this.selectedTab
        });
    }
    focusPreviousTabHandler(e) {
        const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
        const currentIndex = this.getIndexOfTabTitle(e.target);
        const previousTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
        previousTab.focus();
    }
    focusNextTabHandler(e) {
        const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
        const currentIndex = this.getIndexOfTabTitle(e.target);
        const nextTab = tabs[currentIndex + 1] || tabs[0];
        nextTab.focus();
    }
    tabTitleRegistationHandler(e) {
        e.target.setControledBy(this.id);
    }
    activateTabHandler(e) {
        if (e.detail.tab) {
            this.selectedTab = e.detail.tab;
        }
        else {
            this.selectedTab = this.getIndexOfTabTitle(e.target);
        }
    }
    getIndexOfTabTitle(el) {
        const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
        return [...tabs].indexOf(el);
    }
    componentWillLoad() {
        this.selectedTabChanged();
    }
    render() {
        return (h(Host, { role: "tablist" },
            h("nav", { class: "tab-nav" },
                h("slot", null))));
    }
    static get is() { return "calcite-tab-nav"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-tab-nav.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-tab-nav.css"]
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
            "defaultValue": "`calite-tab-nav-${guid()}`"
        },
        "selectedTab": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "number | string",
                "resolved": "number | string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "selected-tab",
            "reflect": false,
            "defaultValue": "0"
        }
    }; }
    static get events() { return [{
            "method": "calciteTabChange",
            "name": "calciteTabChange",
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
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "selectedTab",
            "methodName": "selectedTabChanged"
        }]; }
    static get listeners() { return [{
            "name": "calciteFocusPreviousTab",
            "method": "focusPreviousTabHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteFocusNextTab",
            "method": "focusNextTabHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteRegisterTabTitle",
            "method": "tabTitleRegistationHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteActivateTab",
            "method": "activateTabHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
