import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { g as getElementDir, f as focusElement, a as getElementProp } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';

const calciteDropdownCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([width=s]){--calcite-dropdown-width:12.5em}:host([width=m]){--calcite-dropdown-width:15em}:host([width=l]){--calcite-dropdown-width:20em}:host([scale=s]){--calcite-dropdown-group-padding:0.5rem 0;--calcite-dropdown-item-padding:0.3rem 1rem 0.3rem 2.25rem}:host([scale=m]){--calcite-dropdown-group-padding:0.75rem 0;--calcite-dropdown-item-padding:0.5rem 1rem 0.5rem 2.25rem}:host([scale=l]){--calcite-dropdown-group-padding:1rem 0;--calcite-dropdown-item-padding:0.75rem 1rem 0.75rem 2.25rem}:host([dir=rtl][scale=s]){--calcite-dropdown-item-padding:0.3rem 2.25rem 0.3rem 1rem}:host([dir=rtl][scale=m]){--calcite-dropdown-item-padding:0.5rem 2.25rem 0.5rem 1rem}:host([dir=rtl][scale=l]){--calcite-dropdown-item-padding:0.75rem 2.25rem 0.75rem 1rem}:host{position:relative;display:inline-block}:host([disabled]){pointer-events:none;opacity:0.4}:host([active]) .calcite-dropdown-wrapper{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);opacity:1;max-height:90vh;overflow-y:auto;visibility:visible;pointer-events:initial}:host .calcite-dropdown-wrapper{-webkit-transform:translate3d(0, -1.5rem, 0);transform:translate3d(0, -1.5rem, 0);-webkit-transition:all 0.15s ease-in-out, max-height 0.15s;transition:all 0.15s ease-in-out, max-height 0.15s;visibility:hidden;opacity:0;display:block;position:absolute;left:0;z-index:200;overflow:hidden;max-height:0;width:auto;width:var(--calcite-dropdown-width);background:var(--calcite-ui-foreground-1);border-radius:var(--calcite-border-radius);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);pointer-events:none}:host([dir=rtl]) .calcite-dropdown-wrapper{right:0;left:unset}:host([alignment=end]) .calcite-dropdown-wrapper{right:0;left:unset}:host([dir=rtl][alignment=end]) .calcite-dropdown-wrapper{right:unset;left:0}:host([alignment=center]) .calcite-dropdown-wrapper{right:0;left:50%;-webkit-transform:translate3d(0, -1.5rem, 0) translateX(-50%);transform:translate3d(0, -1.5rem, 0) translateX(-50%)}:host([alignment=center][active]) .calcite-dropdown-wrapper{-webkit-transform:translate3d(0, 0, 0) translateX(-50%);transform:translate3d(0, 0, 0) translateX(-50%)}:host([alignment=center][dir=rtl]) .calcite-dropdown-wrapper{right:50%;left:0;-webkit-transform:translate3d(0, -1.5rem, 0) translateX(50%);transform:translate3d(0, -1.5rem, 0) translateX(50%)}:host([alignment=center][dir=rtl][active]) .calcite-dropdown-wrapper{-webkit-transform:translate3d(0, 0, 0) translateX(50%);transform:translate3d(0, 0, 0) translateX(50%)}";

const CalciteDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteDropdownSelect = createEvent(this, "calciteDropdownSelect", 7);
        this.calciteDropdownOpen = createEvent(this, "calciteDropdownOpen", 7);
        this.calciteDropdownClose = createEvent(this, "calciteDropdownClose", 7);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** specify the alignment of dropdown, defaults to start */
        this.alignment = "start";
        /** specify the max items to display before showing the scroller, must be greater than 0 **/
        this.maxItems = 0;
        /**
         * **read-only** The currently selected items
         *
         * @readonly
         */
        this.selectedItems = [];
        /** specify the scale of dropdown, defaults to m */
        this.scale = "m";
        /** specify the width of dropdown, defaults to m */
        this.width = "m";
        /** specify whether the dropdown is opened by hover or click of the trigger element */
        this.type = "click";
        /**
        allow the dropdown to remain open after a selection is made
        if the selection-mode of the selected item's containing group is "none", the dropdown will always close
        */
        this.disableCloseOnSelect = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of dropdown items */
        this.items = [];
        /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
        this.maxScrollerHeight = 0;
        /** keep track of whether the groups have been sorted so we don't re-sort */
        this.sorted = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let alignment = ["start", "center", "end"];
        if (!alignment.includes(this.alignment))
            this.alignment = "start";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let width = ["s", "m", "l"];
        if (!width.includes(this.width))
            this.width = "m";
        let type = ["hover", "click"];
        if (!type.includes(this.type))
            this.type = "hover";
    }
    componentDidLoad() {
        this.trigger = this.el.querySelector("[slot=dropdown-trigger]");
        if (!this.sorted) {
            const groups = this.items.sort((a, b) => a.position - b.position);
            this.maxScrollerHeight = this.getMaxScrollerHeight(groups);
            this.items = groups.reduce((items, group) => [...items, ...group.items], []);
            this.sorted = true;
        }
    }
    render() {
        const { maxScrollerHeight } = this;
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, tabIndex: this.disabled ? -1 : null }, h("slot", { name: "dropdown-trigger", "aria-haspopup": "true", "aria-expanded": this.active.toString() }), h("div", { class: "calcite-dropdown-wrapper", role: "menu", style: {
                maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "",
            } }, h("slot", null))));
    }
    openDropdown(e) {
        if (e.target === this.trigger || this.trigger.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            this.openCalciteDropdown();
        }
    }
    closeCalciteDropdownOnClick(e) {
        if (this.active &&
            e.target.nodeName !== "CALCITE-DROPDOWN-ITEM" &&
            e.target.nodeName !== "CALCITE-DROPDOWN-GROUP") {
            this.closeCalciteDropdown();
        }
    }
    closeCalciteDropdownOnEvent() {
        this.closeCalciteDropdown();
    }
    closeCalciteDropdownOnOpenEvent(e) {
        if (e.target !== this.el)
            this.active = false;
    }
    keyDownHandler(e) {
        const key = getKey(e.key);
        if (e.target === this.trigger || this.trigger.contains(e.target)) {
            if (e.target.nodeName !== "BUTTON" &&
                e.target.nodeName !== "CALCITE-BUTTON") {
                switch (key) {
                    case " ":
                    case "Enter":
                        this.openCalciteDropdown();
                        break;
                    case "Escape":
                        this.closeCalciteDropdown();
                        break;
                }
            }
            else if (key === "Escape" || (e.shiftKey && key === "Tab")) {
                this.closeCalciteDropdown();
            }
        }
    }
    mouseoverHandler() {
        if (this.type === "hover") {
            this.openCalciteDropdown();
        }
    }
    mouseoffHandler() {
        if (this.type === "hover") {
            this.closeCalciteDropdown();
        }
    }
    calciteDropdownItemKeyEvent(e) {
        let { keyboardEvent } = e.detail;
        // handle edge
        const target = keyboardEvent.target;
        let itemToFocus = target.nodeName !== "A" ? target : target.parentNode;
        let isFirstItem = this.itemIndex(itemToFocus) === 0;
        let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
        switch (getKey(keyboardEvent.key)) {
            case "Tab":
                if (isLastItem && !keyboardEvent.shiftKey)
                    this.closeCalciteDropdown();
                else if (isFirstItem && keyboardEvent.shiftKey)
                    this.closeCalciteDropdown();
                else if (keyboardEvent.shiftKey)
                    this.focusPrevItem(itemToFocus);
                else
                    this.focusNextItem(itemToFocus);
                break;
            case "ArrowDown":
                this.focusNextItem(itemToFocus);
                break;
            case "ArrowUp":
                this.focusPrevItem(itemToFocus);
                break;
            case "Home":
                this.focusFirstItem();
                break;
            case "End":
                this.focusLastItem();
                break;
        }
        e.stopPropagation();
    }
    handleItemSelect(event) {
        this.updateSelectedItems();
        event.stopPropagation();
        this.calciteDropdownSelect.emit();
        if (!this.disableCloseOnSelect ||
            event.detail.requestedDropdownGroup.selectionMode === "none")
            this.closeCalciteDropdown();
    }
    registerCalciteDropdownGroup(e) {
        const { detail: { items, position, titleEl }, } = e;
        this.items.push({
            items,
            position,
            titleEl,
        });
        e.stopPropagation();
        this.updateSelectedItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    updateSelectedItems() {
        const items = Array.from(this.el.querySelectorAll("calcite-dropdown-item"));
        this.selectedItems = items.filter((item) => item.active);
    }
    getMaxScrollerHeight(groups) {
        const { maxItems } = this;
        let itemsToProcess = 0;
        let maxScrollerHeight = 0;
        groups.forEach((group) => {
            var _a;
            if (maxItems > 0 && itemsToProcess < maxItems) {
                maxScrollerHeight += ((_a = group === null || group === void 0 ? void 0 : group.titleEl) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
                group.items.forEach((item) => {
                    if (itemsToProcess < maxItems) {
                        maxScrollerHeight += item.offsetHeight;
                        itemsToProcess += 1;
                    }
                });
            }
        });
        return maxScrollerHeight;
    }
    closeCalciteDropdown() {
        this.calciteDropdownClose.emit();
        this.active = false;
        focusElement(this.trigger);
    }
    focusOnFirstActiveOrFirstItem() {
        this.getFocusableElement(this.items.find((item) => item.active) || this.items[0]);
    }
    focusFirstItem() {
        const firstItem = this.items[0];
        this.getFocusableElement(firstItem);
    }
    focusLastItem() {
        const lastItem = this.items[this.items.length - 1];
        this.getFocusableElement(lastItem);
    }
    focusNextItem(e) {
        const index = this.itemIndex(e);
        const nextItem = this.items[index + 1] || this.items[0];
        this.getFocusableElement(nextItem);
    }
    focusPrevItem(e) {
        const index = this.itemIndex(e);
        const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        this.getFocusableElement(prevItem);
    }
    itemIndex(e) {
        return this.items.indexOf(e);
    }
    getFocusableElement(item) {
        if (!item) {
            return;
        }
        const target = item.attributes.isLink
            ? item.shadowRoot.querySelector("a")
            : item;
        focusElement(target);
    }
    openCalciteDropdown() {
        this.calciteDropdownOpen.emit();
        this.active = !this.active;
        const animationDelayInMs = 50;
        if (this.active) {
            setTimeout(() => this.focusOnFirstActiveOrFirstItem(), animationDelayInMs);
        }
    }
    get el() { return getElement(this); }
};
CalciteDropdown.style = calciteDropdownCss;

const calciteDropdownGroupCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host-context([scale=s]){--calcite-dropdown-group-padding:0.5rem 0}:host-context([scale=m]){--calcite-dropdown-group-padding:0.75rem 0}:host-context([scale=l]){--calcite-dropdown-group-padding:1rem 0}:host .dropdown-title{display:block;margin:0 1rem -1px 1rem;padding:var(--calcite-dropdown-group-padding);border-bottom:1px solid var(--calcite-ui-border-3);color:var(--calcite-ui-text-2);font-weight:600;word-wrap:break-word;cursor:default;font-size:0.875rem;line-height:1.5}";

const CalciteDropdownGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteDropdownGroupRegister = createEvent(this, "calciteDropdownGroupRegister", 7);
        this.calciteDropdownItemChange = createEvent(this, "calciteDropdownItemChange", 7);
        /** specify the selection mode - multi (allow any number of (or no) active items), single (allow and require one active item),
         none (no active items), defaults to single */
        this.selectionMode = "single";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of dropdown items */
        this.items = [];
        this.titleEl = null;
        this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map((a) => a.item);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let selectionMode = ["multi", "single", "none"];
        if (!selectionMode.includes(this.selectionMode))
            this.selectionMode = "single";
    }
    componentDidLoad() {
        this.groupPosition = this.getGroupPosition();
        this.items = this.sortItems(this.items);
        this.calciteDropdownGroupRegister.emit({
            items: this.items,
            position: this.groupPosition,
            group: this.el,
            titleEl: this.titleEl,
        });
    }
    render() {
        const groupTitle = this.groupTitle ? (h("span", { class: "dropdown-title", ref: (node) => (this.titleEl = node) }, this.groupTitle)) : null;
        return (h(Host, null, groupTitle, h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    registerCalciteDropdownItem(event) {
        const item = event.target;
        if (this.selectionMode === "none") {
            item.active = false;
        }
        this.items.push({
            item,
            position: event.detail.position,
        });
        event.stopPropagation();
    }
    updateActiveItemOnChange(event) {
        this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
        this.calciteDropdownItemChange.emit({
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getGroupPosition() {
        return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-dropdown-group"), this.el);
    }
    get el() { return getElement(this); }
};
CalciteDropdownGroup.style = calciteDropdownGroupCss;

const calciteDropdownItemCss = "@charset \"UTF-8\";:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host-context([scale=s]){--calcite-dropdown-item-padding:0.3rem 1rem 0.3rem 2.25rem}:host-context([scale=m]){--calcite-dropdown-item-padding:0.5rem 1rem 0.5rem 2.25rem}:host-context([scale=l]){--calcite-dropdown-item-padding:0.75rem 1rem 0.75rem 2.25rem}:host-context([dir=rtl][scale=s]){--calcite-dropdown-item-padding:0.3rem 2.25rem 0.3rem 1rem}:host-context([dir=rtl][scale=m]){--calcite-dropdown-item-padding:0.5rem 2.25rem 0.5rem 1rem}:host-context([dir=rtl][scale=l]){--calcite-dropdown-item-padding:0.75rem 2.25rem 0.75rem 1rem}:host{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;font-size:0.875rem;line-height:1.5;color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;padding:var(--calcite-dropdown-item-padding);cursor:pointer;text-decoration:none;outline:none;position:relative}:host:before{content:\"•\";position:absolute;left:1rem;opacity:0;color:var(--calcite-ui-border-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host,:host([islink]) a{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus),:host([islink]) a:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([islink]){padding:0}:host([islink]) a{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;font-size:0.875rem;line-height:1.5;color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;padding:var(--calcite-dropdown-item-padding);cursor:pointer;text-decoration:none;outline:none;position:relative}:host([islink]) a:before{content:\"•\";position:absolute;left:1rem;opacity:0;color:var(--calcite-ui-border-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host(:hover),:host(:active){background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);text-decoration:none}:host(:focus){color:var(--calcite-ui-text-1);text-decoration:none}:host(:active){background-color:var(--calcite-ui-foreground-3)}:host(:hover):before,:host(:active):before,:host(:focus):before{opacity:1}:host([dir=rtl]):before{left:unset;right:1rem}:host([active]:not([selection-mode=none])){color:var(--calcite-ui-text-1);font-weight:500}:host([active]:not([selection-mode=none])):before{opacity:1;color:var(--calcite-ui-blue-1)}:host([active]:not([selection-mode=none])) calcite-icon{color:var(--calcite-ui-blue-1)}:host([selection-mode=multi]):before,:host([selection-mode=none]):before{display:none}:host([selection-mode=none]:not([islink])),:host([selection-mode=none][isLink]) a{padding-left:1rem}:host([dir=rtl][selection-mode=none]:not([islink])),:host([dir=rtl][selection-mode=none][isLink]) a{padding-right:1rem}:host .dropdown-item-check-icon{position:absolute;left:0.8571428571rem;opacity:0;-webkit-transform:scale(0.9);transform:scale(0.9);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([dir=rtl]) .dropdown-item-check-icon{left:unset;right:0.8571428571rem}:host(:hover) .dropdown-item-check-icon{color:var(--calcite-ui-border-1);opacity:1}:host([active]) .dropdown-item-check-icon{color:var(--calcite-ui-blue-1);opacity:1}:host .dropdown-item-icon-start{margin-right:1rem}:host .dropdown-item-icon-end{margin-left:auto;padding-left:1rem}:host([dir=rtl]) calcite-icon{margin-right:0;margin-left:1rem}:host([dir=rtl]) .dropdown-item-icon-start{margin-left:1rem;margin-right:0}:host([dir=rtl]) .dropdown-item-icon-end{margin-right:auto;padding-right:1rem;margin-left:0;padding-left:0}";

const CalciteDropdownItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteDropdownItemSelect = createEvent(this, "calciteDropdownItemSelect", 7);
        this.calciteDropdownItemKeyEvent = createEvent(this, "calciteDropdownItemKeyEvent", 7);
        this.calciteDropdownItemRegister = createEvent(this, "calciteDropdownItemRegister", 7);
        this.calciteDropdownCloseRequest = createEvent(this, "calciteDropdownCloseRequest", 7);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** what selection mode is the parent dropdown group in */
        this.selectionMode = getElementProp(this.el, "selection-mode", "single");
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Focuses the selected item. */
    async setFocus() {
        this.el.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.itemPosition = this.getItemPosition();
        this.calciteDropdownItemRegister.emit({
            position: this.itemPosition,
        });
    }
    render() {
        const attributes = this.getAttributes();
        const dir = getElementDir(this.el);
        const scale = getElementProp(this.el, "scale", "m");
        const iconScale = scale === "s" || scale === "m" ? "s" : "m";
        const iconStartEl = (h("calcite-icon", { class: "dropdown-item-icon-start", icon: this.iconStart, scale: iconScale }));
        const iconEndEl = (h("calcite-icon", { class: "dropdown-item-icon-end", icon: this.iconEnd, scale: iconScale }));
        const slottedContent = this.iconStart && this.iconEnd ? ([iconStartEl, h("slot", null), iconEndEl]) : this.iconStart ? ([iconStartEl, h("slot", null)]) : this.iconEnd ? ([h("slot", null), iconEndEl]) : (h("slot", null));
        const contentEl = !this.href ? (slottedContent) : (h("a", Object.assign({}, attributes, { ref: (el) => (this.childLink = el) }), slottedContent));
        return (h(Host, { dir: dir, tabindex: "0", role: "menuitem", "selection-mode": this.selectionMode, "aria-selected": this.active.toString(), isLink: this.href }, this.selectionMode === "multi" ? (h("calcite-icon", { class: "dropdown-item-check-icon", scale: "s", icon: "check" })) : null, contentEl));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick() {
        this.emitRequestedItem();
    }
    keyDownHandler(e) {
        switch (getKey(e.key)) {
            case " ":
                this.emitRequestedItem();
                if (this.href) {
                    e.preventDefault();
                    this.childLink.click();
                }
                break;
            case "Enter":
                this.emitRequestedItem();
                if (this.href)
                    this.childLink.click();
                break;
            case "Escape":
                this.calciteDropdownCloseRequest.emit();
                break;
            case "Tab":
            case "ArrowUp":
            case "ArrowDown":
            case "Home":
            case "End":
                this.calciteDropdownItemKeyEvent.emit({ keyboardEvent: e });
                break;
        }
        e.preventDefault();
    }
    registerCalciteDropdownGroup(event) {
        this.currentDropdownGroup = event.detail.group;
    }
    updateActiveItemOnChange(event) {
        this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
        this.determineActiveItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    determineActiveItem() {
        switch (this.selectionMode) {
            case "multi":
                if (this.el === this.requestedDropdownItem)
                    this.active = !this.active;
                break;
            case "single":
                if (this.el === this.requestedDropdownItem)
                    this.active = true;
                else if (this.requestedDropdownGroup === this.currentDropdownGroup)
                    this.active = false;
                break;
            case "none":
                this.active = false;
                break;
        }
    }
    emitRequestedItem() {
        this.calciteDropdownItemSelect.emit({
            requestedDropdownItem: this.el,
            requestedDropdownGroup: this.currentDropdownGroup,
        });
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        const props = [
            "icon-start",
            "icon-end",
            "active",
            "hasText",
            "isLink",
            "dir",
            "id",
            "theme",
        ];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    getItemPosition() {
        const group = this.el.closest("calcite-dropdown-group");
        return group
            ? Array.prototype.indexOf.call(group.querySelectorAll("calcite-dropdown-item"), this.el)
            : 1;
    }
    get el() { return getElement(this); }
};
CalciteDropdownItem.style = calciteDropdownItemCss;

export { CalciteDropdown as calcite_dropdown, CalciteDropdownGroup as calcite_dropdown_group, CalciteDropdownItem as calcite_dropdown_item };
