import { h, Host } from "@stencil/core";
import { guid } from "../../utils/guid";
export class CalciteTabNav {
    constructor() {
        this.id = `calcite-tab-nav-${guid()}`;
        this.selectedTab = 0;
    }
    selectedTabChanged() {
        if (localStorage &&
            this.storageId &&
            this.selectedTab !== undefined &&
            this.selectedTab !== null) {
            localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTab));
        }
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
        e.target.setControlledBy(this.id);
    }
    activateTabHandler(e) {
        if (e.detail.tab) {
            this.selectedTab = e.detail.tab;
        }
        else {
            this.selectedTab = this.getIndexOfTabTitle(e.target);
        }
    }
    globalTabChangeHandler(e) {
        if (this.syncId &&
            e.target !== this.el &&
            e.target.syncId === this.syncId &&
            this.selectedTab !== e.detail.tab) {
            this.selectedTab = e.detail.tab;
        }
    }
    getIndexOfTabTitle(el) {
        const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
        return Array.prototype.slice.call(tabs).indexOf(el);
    }
    componentWillLoad() {
        if (localStorage &&
            this.storageId &&
            localStorage.getItem(`calcite-tab-nav-${this.storageId}`)) {
            this.selectedTab =
                JSON.parse(localStorage.getItem(`calcite-tab-nav-${this.storageId}`)) ||
                    this.selectedTab;
        }
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
        "storageId": {
            "type": "string",
            "mutable": false,
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
            "attribute": "storage-id",
            "reflect": false
        },
        "syncId": {
            "type": "string",
            "mutable": false,
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
            "attribute": "sync-id",
            "reflect": false
        },
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
            "defaultValue": "`calcite-tab-nav-${guid()}`"
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
        }, {
            "name": "calciteTabChange",
            "method": "globalTabChangeHandler",
            "target": "body",
            "capture": false,
            "passive": false
        }]; }
}
