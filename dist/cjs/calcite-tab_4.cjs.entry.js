'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-67746296.js');
const dom = require('./dom-801460f3.js');
const guid = require('./guid-1986fc89.js');
const keys = require('./keys-4806e54f.js');

const CalciteTab = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /**
         * Show this tab
         */
        this.isActive = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /**
         * @internal
         */
        this.guid = `calcite-tab-title-${guid.guid()}`;
        this.calciteTabRegister = core.createEvent(this, "calciteTabRegister", 7);
        this.calciteTabUnregister = core.createEvent(this, "calciteTabUnregister", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const id = this.el.id || this.guid;
        return (core.h(core.Host, { id: id, "aria-labeledby": this.labeledBy, "aria-expanded": this.isActive.toString(), role: "tabpanel" }, core.h("section", null, core.h("slot", null))));
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
            this.isActive = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then(index => {
                this.isActive = index === event.detail.tab;
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
        return Promise.resolve(Array.prototype.indexOf.call(dom.nodeListToArray(this.el.parentElement.children).filter(e => e.matches("calcite-tab")), this.el));
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
    get el() { return core.getElement(this); }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host([is-active]) section{display:block}section{display:none}"; }
};

const CalciteTabNav = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.calciteTabChange = core.createEvent(this, "calciteTabChange", 7);
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
    render() {
        return (core.h(core.Host, { role: "tablist" }, core.h("nav", { class: "tab-nav", ref: el => (this.tabNavEl = el) }, core.h("slot", null))));
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
            return dom.getSlottedElements(this.tabNavEl, "calcite-tab-title");
        }
        return [];
    }
    get el() { return core.getElement(this); }
    static get watchers() { return {
        "selectedTab": ["selectedTabChanged"]
    }; }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}.tab-nav{display:-ms-flexbox;display:flex;-ms-flex-pack:var(--calcite-tabs-layout);justify-content:var(--calcite-tabs-layout);overflow:auto}::slotted(calcite-tab-title){margin-right:var(--calcite-tabs-tab-margin-start);margin-left:var(--calcite-tabs-tab-margin-end)}:host([dir=rtl]) ::slotted(calcite-tab-title){margin-right:var(--calcite-tabs-tab-margin-end);margin-left:var(--calcite-tabs-tab-margin-start)}"; }
};

const CalciteTabTitle = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /**
         * Show this tab title as selected
         */
        this.isActive = false;
        /**
         * @internal
         */
        this.guid = `calcite-tab-title-${guid.guid()}`;
        this.calciteTabsActivate = core.createEvent(this, "calciteTabsActivate", 7);
        this.calciteTabsFocusNext = core.createEvent(this, "calciteTabsFocusNext", 7);
        this.calciteTabsFocusPrevious = core.createEvent(this, "calciteTabsFocusPrevious", 7);
        this.calciteTabTitleRegister = core.createEvent(this, "calciteTabTitleRegister", 7);
        this.calciteTabTitleUnregister = core.createEvent(this, "calciteTabTitleUnregister", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        if (this.tab && this.isActive) {
            this.calciteTabsActivate.emit({
                tab: this.tab
            });
        }
    }
    render() {
        const id = this.el.id || this.guid;
        return (core.h(core.Host, { id: id, "aria-controls": this.controls, "aria-expanded": this.isActive.toString(), role: "tab", tabindex: "0" }, core.h("a", null, core.h("slot", null))));
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
            this.isActive = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then(index => {
                this.isActive = index === event.detail.tab;
            });
        }
    }
    onClick() {
        this.calciteTabsActivate.emit({
            tab: this.tab
        });
    }
    keyDownHandler(e) {
        switch (e.keyCode) {
            case keys.SPACE:
            case keys.ENTER:
                this.calciteTabsActivate.emit({
                    tab: this.tab
                });
                e.preventDefault();
                break;
            case keys.RIGHT:
                if (dom.getElementDir(this.el) === "ltr") {
                    this.calciteTabsFocusNext.emit();
                }
                else {
                    this.calciteTabsFocusPrevious.emit();
                }
                break;
            case keys.LEFT:
                if (dom.getElementDir(this.el) === "ltr") {
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
    get el() { return core.getElement(this); }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{-ms-flex:0 1 var(--calcite-tabs-tab-basis);flex:0 1 var(--calcite-tabs-tab-basis);outline:none}:host(:active) a,:host(:focus) a,:host(:hover) a{outline:none;text-decoration:none;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-border-2)}:host([is-active]) a{color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue);font-weight:500}a{-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.875rem;line-height:1.5;padding:.75rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:3px solid transparent;cursor:pointer;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;color:var(--calcite-ui-text-3);outline:none;width:100%;display:block;text-align:var(--calcite-tabs-tab-text-align)}"; }
};

const CalciteTabs = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Select theme (light or dark)
         */
        this.theme = "light";
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
        const dir = dom.getElementDir(this.el);
        return (core.h(core.Host, { dir: dir }, core.h("div", null, core.h("slot", { name: "tab-nav" }), core.h("section", null, core.h("slot", null)))));
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
    get el() { return core.getElement(this); }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{display:block;--calcite-tabs-layout:flex-start;--calcite-tabs-tab-basis:auto;--calcite-tabs-tab-text-align:start;--calcite-tabs-tab-margin-start:1.25rem;--calcite-tabs-tab-margin-end:0}:host([dir=rtl]){--calcite-tabs-tab-margin-start:0;--calcite-tabs-tab-margin-end:1.25rem}:host([layout=center]){--calcite-tabs-layout:center;--calcite-tabs-tab-basis:200px;--calcite-tabs-tab-text-align:center;--calcite-tabs-tab-margin-start:1.25rem;--calcite-tabs-tab-margin-end:1.25rem}section{border-top:1px solid var(--calcite-ui-border-1)}"; }
};

exports.calcite_tab = CalciteTab;
exports.calcite_tab_nav = CalciteTabNav;
exports.calcite_tab_title = CalciteTabTitle;
exports.calcite_tabs = CalciteTabs;
