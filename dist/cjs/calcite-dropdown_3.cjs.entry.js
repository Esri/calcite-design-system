'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-01bf3bd6.js');
const keys = require('./keys-4806e54f.js');
const dom = require('./dom-7866810c.js');
const guid = require('./guid-1986fc89.js');
const index$1 = require('./index-9d31ce96.js');

const CalciteDropdown = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** specify the alignment of dropdrown, defaults to left */
        this.alignment = "left";
        /** specify the alignment of dropdrown, defaults to left */
        this.theme = "light";
        /** specify the scale of dropdrown, defaults to m */
        this.scale = "m";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of dropdown items */
        this.items = [];
        /** keep track of whether the groups have been sorted so we don't re-sort */
        this.sorted = false;
        /** unique id for dropdown */
        /** @internal */
        this.dropdownId = `calcite-dropdown-${guid.guid()}`;
        this.sortItems = (items) => items
            .sort((a, b) => a.position - b.position)
            .concat.apply([], this.items.map(item => item.items));
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let alignment = ["left", "right", "center"];
        if (!alignment.includes(this.alignment))
            this.alignment = "left";
        let theme = ["light", "dark"];
        if (!theme.includes(this.theme))
            this.theme = "light";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    componentWillUpdate() {
        if (!this.sorted) {
            this.items = this.sortItems(this.items);
            this.sorted = true;
        }
    }
    render() {
        const dir = dom.getElementDir(this.el);
        const expanded = this.active.toString();
        return (core.h(core.Host, { dir: dir, active: this.active, id: this.dropdownId }, core.h("slot", { name: "dropdown-trigger", "aria-haspopup": "true", "aria-expanded": expanded }), core.h("div", { class: "calcite-dropdown-wrapper", role: "menu" }, core.h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    openDropdown(e) {
        if (e.target.getAttribute("slot") === "dropdown-trigger") {
            this.openCalciteDropdown();
            e.preventDefault();
        }
    }
    closeCalciteDropdownOnClick(e) {
        if (this.active && e.target.offsetParent.id !== this.dropdownId)
            this.closeCalciteDropdown();
    }
    closeCalciteDropdownOnEvent() {
        this.closeCalciteDropdown();
    }
    keyDownHandler(e) {
        if (e.target.getAttribute("slot") === "dropdown-trigger") {
            if (e.target.nodeName !== "BUTTON" &&
                e.target.nodeName !== "CALCITE-BUTTON") {
                switch (e.keyCode) {
                    case keys.SPACE:
                    case keys.ENTER:
                        this.openCalciteDropdown();
                        break;
                    case keys.ESCAPE:
                        this.closeCalciteDropdown();
                        break;
                }
            }
            else if (e.keyCode === keys.ESCAPE || (e.shiftKey && e.keyCode === keys.TAB)) {
                this.closeCalciteDropdown();
            }
        }
    }
    calciteDropdownItemKeyEvent(item) {
        let e = item.detail.item;
        // handle edge
        let itemToFocus = e.target.nodeName !== "A" ? e.target : e.target.parentNode;
        let isFirstItem = this.itemIndex(itemToFocus) === 0;
        let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
        switch (e.keyCode) {
            case keys.TAB:
                if (isLastItem && !e.shiftKey)
                    this.closeCalciteDropdown();
                else if (isFirstItem && e.shiftKey)
                    this.closeCalciteDropdown();
                else if (e.shiftKey)
                    this.focusPrevItem(itemToFocus);
                else
                    this.focusNextItem(itemToFocus);
                break;
            case keys.DOWN:
                this.focusNextItem(itemToFocus);
                break;
            case keys.UP:
                this.focusPrevItem(itemToFocus);
                break;
            case keys.HOME:
                this.focusFirstItem();
                break;
            case keys.END:
                this.focusLastItem();
                break;
        }
        e.preventDefault();
    }
    registerCalciteDropdownGroup(e) {
        const items = {
            items: e.detail.items,
            position: e.detail.position
        };
        this.items.push(items);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    closeCalciteDropdown() {
        this.active = false;
    }
    focusFirstItem() {
        const firstItem = this.items[0];
        const focusableItem = this.getFocusableElement(firstItem);
        focusableItem.focus();
    }
    focusLastItem() {
        const lastItem = this.items[this.items.length - 1];
        const focusableItem = this.getFocusableElement(lastItem);
        focusableItem.focus();
    }
    focusNextItem(e) {
        const index = this.itemIndex(e);
        const nextItem = this.items[index + 1] || this.items[0];
        const focusableItem = this.getFocusableElement(nextItem);
        focusableItem.focus();
    }
    focusPrevItem(e) {
        const index = this.itemIndex(e);
        const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        const focusableItem = this.getFocusableElement(prevItem);
        focusableItem.focus();
    }
    itemIndex(e) {
        return this.items.indexOf(e);
    }
    getFocusableElement(item) {
        return item.attributes.islink ? item.shadowRoot.querySelector("a") : item;
    }
    openCalciteDropdown() {
        this.active = !this.active;
        // time for animation
        setTimeout(() => this.focusFirstItem(), 50);
    }
    get el() { return core.getElement(this); }
    static get style() { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-dropdown-background-color:#fff;--calcite-dropdown-border-color:#dfdfdf}:host([theme=dark]){--calcite-dropdown-background-color:#2b2b2b;--calcite-dropdown-border-color:#404040}:host{position:relative;display:inline-block}:host([active]) .calcite-dropdown-wrapper{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1;visibility:visible}:host .calcite-dropdown-wrapper{-webkit-transform:translate3d(0,-1.5rem,0);transform:translate3d(0,-1.5rem,0);-webkit-transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;visibility:hidden;opacity:0;display:block;position:absolute;left:0;z-index:200;overflow:auto;width:auto;width:12.5rem;background:var(--calcite-dropdown-background-color);border:1px solid var(--calcite-dropdown-border-color);border-radius:2px;-webkit-box-shadow:0 0 12px 0 rgba(0,0,0,.15);box-shadow:0 0 12px 0 rgba(0,0,0,.15)}:host([alignment=right]) .calcite-dropdown-wrapper,:host([dir=rtl]) .calcite-dropdown-wrapper{right:0;left:unset}:host([dir=rtl][alignment=right]) .calcite-dropdown-wrapper{right:unset;left:0}:host([alignment=center]) .calcite-dropdown-wrapper{right:0;left:0;margin-right:auto;margin-left:auto}"; }
};

const DropdownInterface = index$1.createProviderConsumer({
    requestedDropdownGroup: "",
    requestedDropdownItem: ""
}, (subscribe, child) => (core.h("context-consumer", { subscribe: subscribe, renderer: child })));

const CalciteDropdownGroup = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.requestedDropdownGroup = "";
        this.requestedDropdownItem = "";
        /** optionally set a group title for display */
        this.grouptitle = null;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of dropdown items */
        this.items = [];
        /** unique id for dropdown group */
        /** @internal */
        this.dropdownGroupId = `calcite-dropdown-group-${guid.guid()}`;
        this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map(a => a.item);
        this.calciteDropdownItemHasChanged = core.createEvent(this, "calciteDropdownItemHasChanged", 7);
        this.registerCalciteDropdownGroup = core.createEvent(this, "registerCalciteDropdownGroup", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        this.groupPosition = this.getGroupPosition();
        this.items = this.sortItems(this.items);
        this.registerCalciteDropdownGroup.emit({
            items: this.items,
            position: this.groupPosition
        });
    }
    render() {
        const theme = dom.getElementTheme(this.el);
        const scale = dom.getElementProp(this.el, "scale", "m");
        const dropdownState = {
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem
        };
        const grouptitle = this.grouptitle ? (core.h("span", { class: "dropdown-title" }, this.grouptitle)) : null;
        return (core.h(core.Host, { theme: theme, scale: scale, id: this.dropdownGroupId }, grouptitle, core.h(DropdownInterface.Provider, { state: dropdownState }, core.h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    updateActiveItemOnChange(event) {
        this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
        this.calciteDropdownItemHasChanged.emit({
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem
        });
    }
    registerCalciteDropdownItem(e) {
        const item = {
            item: e.detail.item,
            position: e.detail.position
        };
        this.items.push(item);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getGroupPosition() {
        return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-dropdown-group"), this.el);
    }
    get el() { return core.getElement(this); }
    static get style() { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-dropdown-group-color:#4a4a4a;--calcite-dropdown-group-border-color:#eaeaea}:host([theme=dark]){--calcite-dropdown-group-color:#bfbfbf;--calcite-dropdown-group-border-color:#404040}:host([scale=s]){--calcite-dropdown-group-padding:0.5rem 0}:host([scale=m]){--calcite-dropdown-group-padding:0.75rem 0}:host([scale=l]){--calcite-dropdown-group-padding:1rem 0}:host .dropdown-title{display:block;margin:0 1rem -1px 1rem;padding:var(--calcite-dropdown-group-padding);border-bottom:1px solid var(--calcite-dropdown-group-border-color);color:var(--calcite-dropdown-group-color);font-weight:600;word-wrap:break-word;cursor:default;font-size:.875rem;line-height:1.5}"; }
};

const CalciteDropdownItem = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** @internal */
        this.requestedDropdownGroup = "";
        /** @internal */
        this.requestedDropdownItem = "";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** unique id for dropdown item */
        /** @internal */
        this.dropdownItemId = `calcite-dropdown-item-${guid.guid()}`;
        /** id of containing group */
        /** @internal */
        this.currentDropdownGroup = this.el.parentElement.id;
        this.calciteDropdownItemSelected = core.createEvent(this, "calciteDropdownItemSelected", 7);
        this.calciteDropdownItemKeyEvent = core.createEvent(this, "calciteDropdownItemKeyEvent", 7);
        this.closeCalciteDropdown = core.createEvent(this, "closeCalciteDropdown", 7);
        this.registerCalciteDropdownItem = core.createEvent(this, "registerCalciteDropdownItem", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        this.currentDropdownGroup = this.el.parentElement.id;
        this.itemPosition = this.getItemPosition();
        this.registerCalciteDropdownItem.emit({
            item: this.el,
            position: this.itemPosition
        });
    }
    componentDidUpdate() {
        this.determineActiveItem();
    }
    render() {
        const dir = dom.getElementDir(this.el);
        const theme = dom.getElementTheme(this.el);
        const scale = dom.getElementProp(this.el, "scale", "m");
        const selected = this.active ? "true" : null;
        if (!this.href) {
            return (core.h(core.Host, { theme: theme, dir: dir, scale: scale, id: this.dropdownItemId, tabindex: "0", role: "menuitem", "aria-selected": selected }, core.h("slot", null)));
        }
        else {
            return (core.h(core.Host, { theme: theme, dir: dir, scale: scale, id: this.dropdownItemId, tabindex: "0", role: "menuitem", "aria-selected": selected, islink: "true" }, core.h("a", { href: this.href, title: this.linktitle }, core.h("slot", null))));
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick(e) {
        this.emitRequestedItem(e);
    }
    keyDownHandler(e) {
        switch (e.keyCode) {
            case keys.SPACE:
            case keys.ENTER:
                this.emitRequestedItem(e);
                break;
            case keys.ESCAPE:
                this.closeCalciteDropdown.emit();
                break;
            case keys.TAB:
            case keys.UP:
            case keys.DOWN:
            case keys.HOME:
            case keys.END:
                this.calciteDropdownItemKeyEvent.emit({ item: e });
                break;
        }
        e.preventDefault();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    determineActiveItem() {
        if (this.requestedDropdownItem === this.dropdownItemId) {
            this.active = true;
        }
        else if (this.requestedDropdownGroup === this.currentDropdownGroup) {
            this.active = false;
        }
    }
    emitRequestedItem(e) {
        this.calciteDropdownItemSelected.emit({
            requestedDropdownItem: e.target.id,
            requestedDropdownGroup: e.target.parentElement.id
        });
        this.closeCalciteDropdown.emit();
    }
    getItemPosition() {
        return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-dropdown-item"), this.el);
    }
    get el() { return core.getElement(this); }
    static get style() { return "\@charset \"UTF-8\";:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-dropdown-item-color:#4a4a4a;--calcite-dropdown-item-color-hover:#151515;--calcite-dropdown-item-color-active:#151515;--calcite-dropdown-item-background-color-hover:#f3f3f3;--calcite-dropdown-item-background-color-pressed:#eaeaea;--calcite-dropdown-item-dot-active-color:#007ac2}:host([theme=dark]){--calcite-dropdown-item-color:#4a4a4a;--calcite-dropdown-item-color-hover:#fff;--calcite-dropdown-item-color-active:#fff;--calcite-dropdown-item-background-color-hover:#353535;--calcite-dropdown-item-background-color-pressed:#404040;--calcite-dropdown-item-dot-active-color:#00a0ff}:host([scale=s]){--calcite-dropdown-item-padding:0.3rem 1rem 0.3rem 2.25rem}:host([scale=m]){--calcite-dropdown-item-padding:0.5rem 1rem 0.5rem 2.25rem}:host([scale=l]){--calcite-dropdown-item-padding:0.75rem 1rem 0.75rem 2.25rem}:host([dir=rtl][scale=s]){--calcite-dropdown-item-padding:0.3rem 2.25rem 0.3rem 1rem}:host([dir=rtl][scale=m]){--calcite-dropdown-item-padding:0.5rem 2.25rem 0.5rem 1rem}:host([dir=rtl][scale=l]){--calcite-dropdown-item-padding:0.75rem 2.25rem 0.75rem 1rem}:host{display:block;font-size:.875rem;line-height:1.5;color:var(--calcite-dropdown-item-color);-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;padding:var(--calcite-dropdown-item-padding);cursor:pointer;text-decoration:none;outline:none;position:relative}:host(:active),:host(:focus),:host(:hover){background-color:var(--calcite-dropdown-item-background-color-hover);color:var(--calcite-dropdown-item-color-hover);text-decoration:none}:host(:active){background-color:var(--calcite-dropdown-item-background-color-pressed)}:host:before{content:\"•\";position:absolute;left:1rem;opacity:0;color:grey;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}:host(:active):before,:host(:focus):before,:host(:hover):before{opacity:1}:host([dir=rtl]):before{left:unset;right:1rem}:host([active]){color:var(--calcite-dropdown-item-color-active);font-weight:500}:host([active]):before{opacity:1;color:var(--calcite-dropdown-item-dot-active-color)}:host([islink]){padding:0}:host([islink]):before{display:none}:host([islink]) a{display:block;position:relative;padding:var(--calcite-dropdown-item-padding);color:var(--calcite-dropdown-item-color);text-decoration:none;outline:none}:host([islink]) a:before{content:\"•\";position:absolute;left:1rem;opacity:0;color:grey;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}:host([islink]) a:active,:host([islink]) a:focus,:host([islink]) a:hover{background-color:var(--calcite-dropdown-item-background-color-hover);text-decoration:none}:host([islink]) a:active:before,:host([islink]) a:focus:before,:host([islink]) a:hover:before{opacity:1}:host([islink]) a:active{background-color:var(--calcite-dropdown-item-background-color-pressed)}:host([islink][active]) a{color:var(--calcite-dropdown-item-color-active);font-weight:500}:host([islink][active]) a:before{opacity:1;color:var(--calcite-dropdown-item-dot-active-color)}:host([islink][dir=rtl]) a{padding:var(--calcite-dropdown-item-padding)}:host([islink][dir=rtl]) a:before{left:unset;right:1rem}"; }
};
//--------------------------------------------------------------------------
//
//  Inject Props
//
//--------------------------------------------------------------------------
DropdownInterface.injectProps(CalciteDropdownItem, [
    "requestedDropdownItem",
    "requestedDropdownGroup"
]);

exports.calcite_dropdown = CalciteDropdown;
exports.calcite_dropdown_group = CalciteDropdownGroup;
exports.calcite_dropdown_item = CalciteDropdownItem;
