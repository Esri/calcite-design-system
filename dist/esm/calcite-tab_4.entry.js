import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { n as nodeListToArray, c as getSlottedElements, g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
import { g as guid } from './guid-ef96c8c4.js';

const calciteTabCss = ":host([hidden]){display:none}:host([active]) section{display:block}:host{display:none;z-index:1}:host([active]){display:block}section{height:100%;width:100%;display:none}";

const CalciteTab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTabRegister = createEvent(this, "calciteTabRegister", 7);
        this.calciteTabUnregister = createEvent(this, "calciteTabUnregister", 7);
        /**
         * Show this tab
         */
        this.active = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
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
    render() {
        const id = this.el.id || this.guid;
        return (h(Host, { id: id, "aria-labeledby": this.labeledBy, "aria-expanded": this.active.toString(), role: "tabpanel" }, h("section", null, h("slot", null))));
    }
    componentDidLoad() {
        this.calciteTabRegister.emit();
    }
    componentDidUnload() {
        this.calciteTabUnregister.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    tabChangeHandler(event) {
        // to allow `<calcite-tabs>` to be nested we need to make sure this
        // `calciteTabChange` event was actually fired from a title that is a
        // child of the `<calcite-tabs>` that is the a parent of this tab.
        if (event.target.closest("calcite-tabs") !==
            this.el.closest("calcite-tabs")) {
            return;
        }
        if (this.tab) {
            this.active = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then((index) => {
                this.active = index === event.detail.tab;
            });
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Return the index of this tab within the tab array
     */
    async getTabIndex() {
        return Promise.resolve(Array.prototype.indexOf.call(nodeListToArray(this.el.parentElement.children).filter((e) => e.matches("calcite-tab")), this.el));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    updateAriaInfo(tabIds = [], titleIds = []) {
        this.labeledBy = titleIds[tabIds.indexOf(this.el.id)] || null;
        return Promise.resolve();
    }
    get el() { return getElement(this); }
};
CalciteTab.style = calciteTabCss;

const calciteTabNavCss = ":host([hidden]){display:none}:host{z-index:2}.tab-nav{display:-ms-flexbox;display:flex;overflow:auto;-ms-flex-pack:start;justify-content:flex-start;-webkit-overflow-scrolling:touch;padding:4px;margin:-4px}:host([layout=center]) .tab-nav{-ms-flex-pack:center;justify-content:center}";

const CalciteTabNav = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTabChange = createEvent(this, "calciteTabChange", 7);
    }
    selectedTabChanged() {
        if (localStorage &&
            this.storageId &&
            this.selectedTab !== undefined &&
            this.selectedTab !== null) {
            localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTab));
        }
        this.calciteTabChange.emit({
            tab: this.selectedTab,
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
                tab: this.selectedTab,
            });
        }
    }
    componentWillRender() {
        var _a;
        this.layout = (_a = this.el.closest("calcite-tabs")) === null || _a === void 0 ? void 0 : _a.layout;
    }
    render() {
        return (h(Host, { role: "tablist" }, h("nav", { class: "tab-nav", ref: (el) => (this.tabNavEl = el) }, h("slot", null))));
    }
    componentDidRender() {
        // if every tab title is active select the first tab.
        if (this.tabTitles.length &&
            this.tabTitles.every((title) => !title.active) &&
            !this.selectedTab) {
            this.tabTitles[0].getTabIdentifier().then((tab) => {
                this.calciteTabChange.emit({
                    tab,
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "selectedTab": ["selectedTabChanged"]
    }; }
};
CalciteTabNav.style = calciteTabNavCss;

const calciteTabTitleCss = ":host([hidden]){display:none}:host{-ms-flex:0 1 auto;flex:0 1 auto;outline:none;margin-right:1.25rem;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:1.25rem;margin-inline-end:1.25rem}:host-context([dir=rtl]){margin-right:0;margin-left:1.25rem}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([layout=center]){-ms-flex-preferred-size:200px;flex-basis:200px;text-align:center;margin:0 1.25rem}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host(:active) a,:host(:focus) a,:host(:hover) a{outline:none;text-decoration:none;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-border-2)}:host([active]) a{color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue-1);font-weight:500}a{-webkit-box-sizing:border-box;box-sizing:border-box;font-size:0.875rem;line-height:1.5;padding:0.75rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:3px solid transparent;cursor:pointer;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;color:var(--calcite-ui-text-3);outline:none;width:100%;display:block}";

const CalciteTabTitle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTabsActivate = createEvent(this, "calciteTabsActivate", 7);
        this.calciteTabsFocusNext = createEvent(this, "calciteTabsFocusNext", 7);
        this.calciteTabsFocusPrevious = createEvent(this, "calciteTabsFocusPrevious", 7);
        this.calciteTabTitleRegister = createEvent(this, "calciteTabTitleRegister", 7);
        this.calciteTabTitleUnregister = createEvent(this, "calciteTabTitleUnregister", 7);
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
        return (h(Host, { id: id, "aria-controls": this.controls, "aria-expanded": this.active.toString(), role: "tab", tabindex: "0" }, h("a", null, h("slot", null))));
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
    get el() { return getElement(this); }
};
CalciteTabTitle.style = calciteTabTitleCss;

const calciteTabsCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}section{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;overflow:hidden;border-top:1px solid var(--calcite-ui-border-1)}";

const CalciteTabs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Align tab titles to the edge or fully justify them across the tab nav ("center")
         */
        this.layout = "inline";
        //--------------------------------------------------------------------------
        //
        //  Events
        //
        //--------------------------------------------------------------------------
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /**
         * @internal
         *
         * Stores an array of ids of `<calcite-tab-titles>`s to match up ARIA
         * attributes.
         */
        this.titles = [];
        /**
         * @internal
         *
         * Stores an array of ids of `<calcite-tab>`s to match up ARIA attributes.
         */
        this.tabs = [];
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        return (h(Host, null, h("slot", { name: "tab-nav" }), h("section", null, h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     */
    calciteTabTitleRegister(e) {
        this.titles = [...this.titles, e.target];
        this.registryHandler();
        e.stopPropagation();
    }
    /**
     * @internal
     */
    calciteTabTitleUnregister(e) {
        this.titles = this.titles.filter(el => el !== e.target);
        this.registryHandler();
        e.stopPropagation();
    }
    /**
     * @internal
     */
    calciteTabRegister(e) {
        this.tabs = [...this.tabs, e.target];
        this.registryHandler();
        e.stopPropagation();
    }
    /**
     * @internal
     */
    calciteTabUnregister(e) {
        this.tabs = this.tabs.filter(el => el !== e.target);
        this.registryHandler();
        e.stopPropagation();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * @internal
     *
     * Matches up elements from the internal `tabs` and `titles` to automatically
     * update the ARIA attributes and link `<calcite-tab>` and
     * `<calcite-tab-title>` components.
     */
    async registryHandler() {
        var tabIds;
        var titleIds;
        // determine if we are using `tab` based or `index` based tab identifiers.
        if (this.tabs.some(e => e.tab) || this.titles.some(e => e.tab)) {
            // if we are using `tab` based identifiers sort by `tab` to account for
            // possible out of order tabs and get the id of each tab
            tabIds = this.tabs
                .sort((a, b) => a.tab.localeCompare(b.tab))
                .map(e => e.id);
            titleIds = this.titles
                .sort((a, b) => a.tab.localeCompare(b.tab))
                .map(e => e.id);
        }
        else {
            // if we are using index based tabs then the `<calcite-tab>` and
            // `<calcite-tab-title>` might have been rendered out of order so the
            // order of `this.tabs` and `this.titles` might not reflect the DOM state,
            // and might not match each other so we need to get the index of all the
            // tabs and titles in the DOM order to match them up as a source of truth
            const tabDomIndexes = await Promise.all(this.tabs.map(el => el.getTabIndex()));
            const titleDomIndexes = await Promise.all(this.titles.map(el => el.getTabIndex()));
            // once we have the DOM order as a source of truth we can build the
            // matching tabIds and titleIds arrays
            tabIds = tabDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
                ids[indexInDOM] = this.tabs[registryIndex].id;
                return ids;
            }, []);
            titleIds = titleDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
                ids[indexInDOM] = this.titles[registryIndex].id;
                return ids;
            }, []);
        }
        // pass all our new aria information to each `<calcite-tab>` and
        // `<calcite-tab-title>` which will check if they can update their internal
        // `controlled` or `labeledBy` states and re-render if necessary
        this.tabs.forEach(el => el.updateAriaInfo(tabIds, titleIds));
        this.titles.forEach(el => el.updateAriaInfo(tabIds, titleIds));
    }
    get el() { return getElement(this); }
};
CalciteTabs.style = calciteTabsCss;

export { CalciteTab as calcite_tab, CalciteTabNav as calcite_tab_nav, CalciteTabTitle as calcite_tab_title, CalciteTabs as calcite_tabs };
