import { r as registerInstance, h, H as Host, g as getElement, c as createEvent } from './core-2154eb68.js';
import { S as SPACE, E as ENTER, c as ESCAPE, T as TAB, D as DOWN, U as UP, H as HOME, b as END } from './keys-d0494fa5.js';
import { g as getElementDir, a as getElementTheme, b as getElementProp } from './dom-e9ddd61f.js';
import { g as guid } from './guid-cb609d41.js';
import { c as createProviderConsumer } from './index-9ff8bd5c.js';
var CalciteDropdown = /** @class */ (function () {
    function CalciteDropdown(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
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
        /** created list of dropdown items */
        this.items = [];
        /** keep track of whether the groups have been sorted so we don't re-sort */
        this.sorted = false;
        /** unique id for dropdown */
        /** @internal */
        this.dropdownId = "calcite-dropdown-" + guid();
        this.sortItems = function (items) { return items
            .sort(function (a, b) { return a.position - b.position; })
            .concat.apply([], _this.items.map(function (item) { return item.items; })); };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteDropdown.prototype.connectedCallback = function () {
        // validate props
        var alignment = ["left", "right", "center"];
        if (!alignment.includes(this.alignment))
            this.alignment = "left";
        var theme = ["light", "dark"];
        if (!theme.includes(this.theme))
            this.theme = "light";
        var scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    };
    CalciteDropdown.prototype.componentDidLoad = function () {
        this.trigger = this.el.querySelector("[slot=dropdown-trigger]");
        if (!this.sorted) {
            this.items = this.sortItems(this.items);
            this.sorted = true;
        }
    };
    CalciteDropdown.prototype.render = function () {
        var dir = getElementDir(this.el);
        var expanded = this.active.toString();
        return (h(Host, { dir: dir, active: this.active, id: this.dropdownId }, h("slot", { name: "dropdown-trigger", "aria-haspopup": "true", "aria-expanded": expanded }), h("div", { class: "calcite-dropdown-wrapper", role: "menu" }, h("slot", null))));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteDropdown.prototype.openDropdown = function (e) {
        if (e.target.getAttribute("slot") === "dropdown-trigger") {
            this.openCalciteDropdown(e);
            e.preventDefault();
        }
    };
    CalciteDropdown.prototype.closeCalciteDropdownOnClick = function (e) {
        if (this.active && e.target.offsetParent.id !== this.dropdownId)
            this.closeCalciteDropdown();
    };
    CalciteDropdown.prototype.closeCalciteDropdownOnEvent = function () {
        this.closeCalciteDropdown();
    };
    CalciteDropdown.prototype.keyDownHandler = function (e) {
        if (e.target.getAttribute("slot") === "dropdown-trigger") {
            if (e.target.nodeName !== "BUTTON" &&
                e.target.nodeName !== "CALCITE-BUTTON") {
                switch (e.keyCode) {
                    case SPACE:
                    case ENTER:
                        this.openCalciteDropdown(e);
                        break;
                    case ESCAPE:
                        this.closeCalciteDropdown();
                        break;
                }
            }
            else if (e.keyCode === ESCAPE || (e.shiftKey && e.keyCode === TAB)) {
                this.closeCalciteDropdown();
            }
        }
    };
    CalciteDropdown.prototype.calciteDropdownItemKeyEvent = function (item) {
        var e = item.detail.item;
        // handle edge
        var itemToFocus = e.target.nodeName !== "A" ? e.target : e.target.parentNode;
        var isFirstItem = this.itemIndex(itemToFocus) === 0;
        var isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
        switch (e.keyCode) {
            case TAB:
                if (isLastItem && !e.shiftKey)
                    this.closeCalciteDropdown();
                else if (isFirstItem && e.shiftKey)
                    this.closeCalciteDropdown();
                else if (e.shiftKey)
                    this.focusPrevItem(itemToFocus);
                else
                    this.focusNextItem(itemToFocus);
                break;
            case DOWN:
                this.focusNextItem(itemToFocus);
                break;
            case UP:
                this.focusPrevItem(itemToFocus);
                break;
            case HOME:
                this.focusFirstItem();
                break;
            case END:
                this.focusLastItem();
                break;
        }
    };
    CalciteDropdown.prototype.calciteDropdownMouseover = function (item) {
        var itemToFocus = item.detail.target;
        itemToFocus.focus();
    };
    CalciteDropdown.prototype.registerCalciteDropdownGroup = function (e) {
        var items = {
            items: e.detail.items,
            position: e.detail.position
        };
        this.items.push(items);
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    CalciteDropdown.prototype.closeCalciteDropdown = function () {
        this.active = false;
        this.trigger.focus();
    };
    CalciteDropdown.prototype.focusFirstItem = function () {
        var firstItem = this.items[0];
        this.getFocusableElement(firstItem);
    };
    CalciteDropdown.prototype.focusLastItem = function () {
        var lastItem = this.items[this.items.length - 1];
        this.getFocusableElement(lastItem);
    };
    CalciteDropdown.prototype.focusNextItem = function (e) {
        var index = this.itemIndex(e);
        var nextItem = this.items[index + 1] || this.items[0];
        this.getFocusableElement(nextItem);
    };
    CalciteDropdown.prototype.focusPrevItem = function (e) {
        var index = this.itemIndex(e);
        var prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        this.getFocusableElement(prevItem);
    };
    CalciteDropdown.prototype.itemIndex = function (e) {
        return this.items.indexOf(e);
    };
    CalciteDropdown.prototype.getFocusableElement = function (item) {
        var target = item.attributes.isLink
            ? item.shadowRoot.querySelector("a")
            : item;
        target.focus();
    };
    CalciteDropdown.prototype.openCalciteDropdown = function (e) {
        var _this = this;
        this.active = !this.active;
        // if invoked by key, focus item, and accomodate animation time
        if (!e.detail) {
            setTimeout(function () { return _this.focusFirstItem(); }, 50);
        }
    };
    Object.defineProperty(CalciteDropdown.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteDropdown, "style", {
        get: function () { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-dropdown-background-color:#fff;--calcite-dropdown-border-color:#eaeaea}:host([theme=dark]){--calcite-dropdown-background-color:#2b2b2b;--calcite-dropdown-border-color:#404040}:host{position:relative;display:inline-block}:host([active]) .calcite-dropdown-wrapper{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1;visibility:visible}:host .calcite-dropdown-wrapper{-webkit-transform:translate3d(0,-1.5rem,0);transform:translate3d(0,-1.5rem,0);-webkit-transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;visibility:hidden;opacity:0;display:block;position:absolute;left:0;z-index:200;overflow:auto;width:auto;width:12.5rem;background:var(--calcite-dropdown-background-color);border:1px solid var(--calcite-dropdown-border-color);border-radius:2px;-webkit-box-shadow:0 0 12px 0 rgba(0,0,0,.15);box-shadow:0 0 12px 0 rgba(0,0,0,.15)}:host([alignment=right]) .calcite-dropdown-wrapper,:host([dir=rtl]) .calcite-dropdown-wrapper{right:0;left:unset}:host([dir=rtl][alignment=right]) .calcite-dropdown-wrapper{right:unset;left:0}:host([alignment=center]) .calcite-dropdown-wrapper{right:0;left:0;margin-right:auto;margin-left:auto}"; },
        enumerable: true,
        configurable: true
    });
    return CalciteDropdown;
}());
var DropdownInterface = createProviderConsumer({
    requestedDropdownGroup: "",
    requestedDropdownItem: ""
}, function (subscribe, child) { return (h("context-consumer", { subscribe: subscribe, renderer: child })); });
var CalciteDropdownGroup = /** @class */ (function () {
    function CalciteDropdownGroup(hostRef) {
        registerInstance(this, hostRef);
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
        this.dropdownGroupId = "calcite-dropdown-group-" + guid();
        this.sortItems = function (items) { return items.sort(function (a, b) { return a.position - b.position; }).map(function (a) { return a.item; }); };
        this.calciteDropdownItemHasChanged = createEvent(this, "calciteDropdownItemHasChanged", 7);
        this.registerCalciteDropdownGroup = createEvent(this, "registerCalciteDropdownGroup", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteDropdownGroup.prototype.componentDidLoad = function () {
        this.groupPosition = this.getGroupPosition();
        this.items = this.sortItems(this.items);
        this.registerCalciteDropdownGroup.emit({
            items: this.items,
            position: this.groupPosition
        });
    };
    CalciteDropdownGroup.prototype.render = function () {
        var theme = getElementTheme(this.el);
        var scale = getElementProp(this.el, "scale", "m");
        var dropdownState = {
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem
        };
        var grouptitle = this.grouptitle ? (h("span", { class: "dropdown-title" }, this.grouptitle)) : null;
        return (h(Host, { theme: theme, scale: scale, id: this.dropdownGroupId }, grouptitle, h(DropdownInterface.Provider, { state: dropdownState }, h("slot", null))));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteDropdownGroup.prototype.updateActiveItemOnChange = function (event) {
        this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
        this.calciteDropdownItemHasChanged.emit({
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem
        });
    };
    CalciteDropdownGroup.prototype.registerCalciteDropdownItem = function (e) {
        var item = {
            item: e.detail.item,
            position: e.detail.position
        };
        this.items.push(item);
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    CalciteDropdownGroup.prototype.getGroupPosition = function () {
        return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-dropdown-group"), this.el);
    };
    Object.defineProperty(CalciteDropdownGroup.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteDropdownGroup, "style", {
        get: function () { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-dropdown-group-color:#4a4a4a;--calcite-dropdown-group-border-color:#eaeaea}:host([theme=dark]){--calcite-dropdown-group-color:#bfbfbf;--calcite-dropdown-group-border-color:#404040}:host([scale=s]){--calcite-dropdown-group-padding:0.5rem 0}:host([scale=m]){--calcite-dropdown-group-padding:0.75rem 0}:host([scale=l]){--calcite-dropdown-group-padding:1rem 0}:host .dropdown-title{display:block;margin:0 1rem -1px 1rem;padding:var(--calcite-dropdown-group-padding);border-bottom:1px solid var(--calcite-dropdown-group-border-color);color:var(--calcite-dropdown-group-color);font-weight:600;word-wrap:break-word;cursor:default;font-size:.875rem;line-height:1.5}"; },
        enumerable: true,
        configurable: true
    });
    return CalciteDropdownGroup;
}());
var CalciteDropdownItem = /** @class */ (function () {
    function CalciteDropdownItem(hostRef) {
        registerInstance(this, hostRef);
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
        this.dropdownItemId = "calcite-dropdown-item-" + guid();
        this.calciteDropdownItemKeyEvent = createEvent(this, "calciteDropdownItemKeyEvent", 7);
        this.calciteDropdownItemMouseover = createEvent(this, "calciteDropdownItemMouseover", 7);
        this.calciteDropdownItemSelected = createEvent(this, "calciteDropdownItemSelected", 7);
        this.closeCalciteDropdown = createEvent(this, "closeCalciteDropdown", 7);
        this.registerCalciteDropdownItem = createEvent(this, "registerCalciteDropdownItem", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteDropdownItem.prototype.componentDidLoad = function () {
        this.currentDropdownGroup = this.el.parentElement.id;
        this.itemPosition = this.getItemPosition();
        this.registerCalciteDropdownItem.emit({
            item: this.el,
            position: this.itemPosition
        });
    };
    CalciteDropdownItem.prototype.componentDidUpdate = function () {
        this.determineActiveItem();
    };
    CalciteDropdownItem.prototype.render = function () {
        var dir = getElementDir(this.el);
        var theme = getElementTheme(this.el);
        var scale = getElementProp(this.el, "scale", "m");
        if (!this.href) {
            return (h(Host, { theme: theme, dir: dir, scale: scale, id: this.dropdownItemId, tabindex: "0", role: "menuitem", "aria-selected": this.active ? "true" : "false" }, h("slot", null)));
        }
        else {
            return (h(Host, { theme: theme, dir: dir, scale: scale, id: this.dropdownItemId, tabindex: "0", role: "menuitem", "aria-selected": this.active ? "true" : "false", isLink: true }, h("a", { href: this.href, title: this.linktitle }, h("slot", null))));
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteDropdownItem.prototype.onClick = function (e) {
        this.emitRequestedItem(e);
    };
    CalciteDropdownItem.prototype.onMouseover = function (e) {
        this.calciteDropdownItemMouseover.emit(e);
    };
    CalciteDropdownItem.prototype.keyDownHandler = function (e) {
        switch (e.keyCode) {
            case SPACE:
            case ENTER:
                this.emitRequestedItem(e);
                if (e.path && e.path[0].nodeName === "A")
                    e.click();
                break;
            case ESCAPE:
                this.closeCalciteDropdown.emit();
                break;
            case TAB:
            case UP:
            case DOWN:
            case HOME:
            case END:
                this.calciteDropdownItemKeyEvent.emit({ item: e });
                break;
        }
        e.preventDefault();
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    CalciteDropdownItem.prototype.determineActiveItem = function () {
        if (this.requestedDropdownItem === this.dropdownItemId) {
            this.active = true;
        }
        else if (this.requestedDropdownGroup === this.currentDropdownGroup) {
            this.active = false;
        }
    };
    CalciteDropdownItem.prototype.emitRequestedItem = function (e) {
        this.calciteDropdownItemSelected.emit({
            requestedDropdownItem: e.target.id,
            requestedDropdownGroup: e.target
                .parentElement.id
        });
        this.closeCalciteDropdown.emit();
    };
    CalciteDropdownItem.prototype.getItemPosition = function () {
        var group = this.el.parentElement;
        return Array.prototype.indexOf.call(group.querySelectorAll("calcite-dropdown-item"), this.el);
    };
    Object.defineProperty(CalciteDropdownItem.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteDropdownItem, "style", {
        get: function () { return "\@charset \"UTF-8\";:root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-dropdown-item-color:#4a4a4a;--calcite-dropdown-item-color-hover:#151515;--calcite-dropdown-item-color-active:#151515;--calcite-dropdown-item-background-color-hover:#f3f3f3;--calcite-dropdown-item-background-color-pressed:#eaeaea;--calcite-dropdown-item-dot-active-color:#007ac2}:host([theme=dark]){--calcite-dropdown-item-color:#4a4a4a;--calcite-dropdown-item-color-hover:#fff;--calcite-dropdown-item-color-active:#fff;--calcite-dropdown-item-background-color-hover:#353535;--calcite-dropdown-item-background-color-pressed:#404040;--calcite-dropdown-item-dot-active-color:#00a0ff}:host([scale=s]){--calcite-dropdown-item-padding:0.3rem 1rem 0.3rem 2.25rem}:host([scale=m]){--calcite-dropdown-item-padding:0.5rem 1rem 0.5rem 2.25rem}:host([scale=l]){--calcite-dropdown-item-padding:0.75rem 1rem 0.75rem 2.25rem}:host([dir=rtl][scale=s]){--calcite-dropdown-item-padding:0.3rem 2.25rem 0.3rem 1rem}:host([dir=rtl][scale=m]){--calcite-dropdown-item-padding:0.5rem 2.25rem 0.5rem 1rem}:host([dir=rtl][scale=l]){--calcite-dropdown-item-padding:0.75rem 2.25rem 0.75rem 1rem}:host{display:block;font-size:.875rem;line-height:1.5;color:var(--calcite-dropdown-item-color);-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;padding:var(--calcite-dropdown-item-padding);cursor:pointer;text-decoration:none;outline:none;position:relative}:host(:active),:host(:focus),:host(:hover){background-color:var(--calcite-dropdown-item-background-color-hover);color:var(--calcite-dropdown-item-color-hover);text-decoration:none}:host(:active){background-color:var(--calcite-dropdown-item-background-color-pressed)}:host:before{content:\"•\";position:absolute;left:1rem;opacity:0;color:grey;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}:host(:active):before,:host(:focus):before,:host(:hover):before{opacity:1}:host([dir=rtl]):before{left:unset;right:1rem}:host([active]){color:var(--calcite-dropdown-item-color-active);font-weight:500}:host([active]):before{opacity:1;color:var(--calcite-dropdown-item-dot-active-color)}:host([islink]){padding:0}:host([islink]):before{display:none}:host([islink]) a{display:block;position:relative;padding:var(--calcite-dropdown-item-padding);color:var(--calcite-dropdown-item-color);text-decoration:none;outline:none}:host([islink]) a:before{content:\"•\";position:absolute;left:1rem;opacity:0;color:grey;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}:host([islink]) a:active,:host([islink]) a:focus,:host([islink]) a:hover{background-color:var(--calcite-dropdown-item-background-color-hover);text-decoration:none}:host([islink]) a:active:before,:host([islink]) a:focus:before,:host([islink]) a:hover:before{opacity:1}:host([islink]) a:active{background-color:var(--calcite-dropdown-item-background-color-pressed)}:host([islink][active]) a{color:var(--calcite-dropdown-item-color-active);font-weight:500}:host([islink][active]) a:before{opacity:1;color:var(--calcite-dropdown-item-dot-active-color)}:host([islink][dir=rtl]) a{padding:var(--calcite-dropdown-item-padding)}:host([islink][dir=rtl]) a:before{left:unset;right:1rem}"; },
        enumerable: true,
        configurable: true
    });
    return CalciteDropdownItem;
}());
//--------------------------------------------------------------------------
//
//  Inject Props
//
//--------------------------------------------------------------------------
DropdownInterface.injectProps(CalciteDropdownItem, [
    "requestedDropdownItem",
    "requestedDropdownGroup"
]);
export { CalciteDropdown as calcite_dropdown, CalciteDropdownGroup as calcite_dropdown_group, CalciteDropdownItem as calcite_dropdown_item };
