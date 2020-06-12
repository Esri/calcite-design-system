import { Component, Listen, Prop, Watch, Event, Element, State, h, Host } from "@stencil/core";
import { getSlottedElements } from "../../utils/dom";
export class CalciteTabNav {
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
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        const storageKey = `calcite-tab-nav-${this.storageId}`;
        if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
            this.selectedTab = JSON.parse(localStorage.getItem(storageKey));
            this.calciteTabChange.emit({
                tab: this.selectedTab
            });
        }
    }
    componentWillRender() {
        var _a;
        this.layout = (_a = this.el.closest("calcite-tabs")) === null || _a === void 0 ? void 0 : _a.layout;
    }
    render() {
        return (h(Host, { role: "tablist" },
            h("nav", { class: "tab-nav", ref: el => (this.tabNavEl = el) },
                h("slot", null))));
    }
    componentDidRender() {
        // if every tab title is active select the first tab.
        if (this.tabTitles.length &&
            this.tabTitles.every(title => !title.isActive) &&
            !this.selectedTab) {
            this.tabTitles[0].getTabIdentifier().then(tab => {
                this.calciteTabChange.emit({
                    tab
                });
            });
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Events Listeners
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    focusPreviousTabHandler(e) {
        const currentIndex = this.getIndexOfTabTitle(e.target);
        const previousTab = this.tabTitles[currentIndex - 1] ||
            this.tabTitles[this.tabTitles.length - 1];
        previousTab.focus();
        e.stopPropagation();
        e.preventDefault();
    }
    /**
     * @internal
     */
    focusNextTabHandler(e) {
        const currentIndex = this.getIndexOfTabTitle(e.target);
        const nextTab = this.tabTitles[currentIndex + 1] || this.tabTitles[0];
        nextTab.focus();
        e.stopPropagation();
        e.preventDefault();
    }
    /**
     * @internal
     */
    activateTabHandler(e) {
        if (e.detail.tab) {
            this.selectedTab = e.detail.tab;
        }
        else {
            this.selectedTab = this.getIndexOfTabTitle(e.target);
        }
        e.stopPropagation();
        e.preventDefault();
    }
    /**
     * @internal
     */
    globalTabChangeHandler(e) {
        if (this.syncId &&
            e.target !== this.el &&
            e.target.syncId === this.syncId &&
            this.selectedTab !== e.detail.tab) {
            this.selectedTab = e.detail.tab;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getIndexOfTabTitle(el) {
        return this.tabTitles.indexOf(el);
    }
    get tabTitles() {
        if (this.tabNavEl) {
            return getSlottedElements(this.tabNavEl, "calcite-tab-title");
        }
        return [];
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
                "text": "Name to use when saving selected tab data to localStorage"
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
                "text": "Pass the same string to multiple tab navs to keep them all in sync if one changes"
            },
            "attribute": "sync-id",
            "reflect": false
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
        "selectedTab": {}
    }; }
    static get events() { return [{
            "method": "calciteTabChange",
            "name": "calciteTabChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the active tab changes"
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
            "name": "calciteTabsFocusPrevious",
            "method": "focusPreviousTabHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteTabsFocusNext",
            "method": "focusNextTabHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteTabsActivate",
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
