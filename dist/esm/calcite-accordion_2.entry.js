import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { a as getElementProp, g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';

const calciteAccordionCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.8125rem;line-height:1.5}:host([scale=m]){--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.875rem;line-height:1.5}:host([scale=l]){--calcite-accordion-item-spacing-unit:1.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.9375rem;line-height:1.5}:host{display:block;position:relative;max-width:100%;border:1px solid var(--calcite-ui-border-2);border-bottom:none;--calcite-accordion-item-border:var(--calcite-ui-border-2);--calcite-accordion-item-background:var(--calcite-ui-foreground-1)}:host([appearance=minimal]){--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0;border-color:transparent}:host([appearance=transparent]){border-color:transparent;--calcite-accordion-item-border:transparent;--calcite-accordion-item-background:transparent}";

const CalciteAccordion = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteAccordionChange = createEvent(this, "calciteAccordionChange", 7);
        /** specify the scale of accordion, defaults to m */
        this.scale = "m";
        /** specify the appearance - default (containing border), or minimal (no containing border), defaults to default */
        this.appearance = "default";
        /** specify the placement of the icon in the header, defaults to end */
        this.iconPosition = "end";
        /** specify the type of the icon in the header, defaults to chevron */
        this.iconType = "chevron";
        /** specify the selection mode - multi (allow any number of open items), single (allow one open item),
         * or single-persist (allow and require one open item), defaults to multi */
        this.selectionMode = "multi";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of Accordion items */
        this.items = [];
        /** keep track of whether the items have been sorted so we don't re-sort */
        this.sorted = false;
        this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map((a) => a.item);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let appearance = ["default", "minimal", "transparent"];
        if (!appearance.includes(this.appearance))
            this.appearance = "default";
        let iconPosition = ["start", "end"];
        if (!iconPosition.includes(this.iconPosition))
            this.iconPosition = "end";
        let iconType = ["chevron", "caret", "plus-minus"];
        if (!iconType.includes(this.iconType))
            this.iconType = "chevron";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let selectionMode = ["multi", "single", "single-persist"];
        if (!selectionMode.includes(this.selectionMode))
            this.selectionMode = "multi";
    }
    componentDidLoad() {
        if (!this.sorted) {
            this.items = this.sortItems(this.items);
            this.sorted = true;
        }
    }
    render() {
        return (h(Host, null, h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteAccordionItemKeyEvent(e) {
        const item = e.detail.item;
        const parent = e.detail.parent;
        if (this.el === parent) {
            const key = getKey(item.key);
            let itemToFocus = e.target;
            let isFirstItem = this.itemIndex(itemToFocus) === 0;
            let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
            switch (key) {
                case "ArrowDown":
                    if (isLastItem)
                        this.focusFirstItem();
                    else
                        this.focusNextItem(itemToFocus);
                    break;
                case "ArrowUp":
                    if (isFirstItem)
                        this.focusLastItem();
                    else
                        this.focusPrevItem(itemToFocus);
                    break;
                case "Home":
                    this.focusFirstItem();
                    break;
                case "End":
                    this.focusLastItem();
                    break;
            }
        }
    }
    registerCalciteAccordionItem(e) {
        const item = {
            item: e.target,
            parent: e.detail.parent,
            position: e.detail.position,
        };
        if (this.el === item.parent)
            this.items.push(item);
    }
    updateActiveItemOnChange(event) {
        this.requestedAccordionItem = event.detail.requestedAccordionItem;
        this.calciteAccordionChange.emit({
            requestedAccordionItem: this.requestedAccordionItem,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    focusFirstItem() {
        const firstItem = this.items[0];
        this.focusElement(firstItem);
    }
    focusLastItem() {
        const lastItem = this.items[this.items.length - 1];
        this.focusElement(lastItem);
    }
    focusNextItem(e) {
        const index = this.itemIndex(e);
        const nextItem = this.items[index + 1] || this.items[0];
        this.focusElement(nextItem);
    }
    focusPrevItem(e) {
        const index = this.itemIndex(e);
        const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        this.focusElement(prevItem);
    }
    itemIndex(e) {
        return this.items.indexOf(e);
    }
    focusElement(item) {
        const target = item;
        target.focus();
    }
    get el() { return getElement(this); }
};
CalciteAccordion.style = calciteAccordionCss;

const calciteAccordionItemCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host-context([scale=s]){--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.8125rem;line-height:1.5}:host-context([scale=m]){--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.875rem;line-height:1.5}:host-context([scale=l]){--calcite-accordion-item-spacing-unit:1.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.9375rem;line-height:1.5}:host([icon-position=start]){--calcite-accordion-item-flex-direction:row-reverse;--calcite-accordion-item-icon-rotation:90deg;--calcite-accordion-item-active-icon-rotation:180deg;--calcite-accordion-item-icon-rotation-rtl:-90deg;--calcite-accordion-item-active-icon-rotation-rtl:-180deg;--calcite-accordion-item-icon-spacing-start:0;--calcite-accordion-item-icon-spacing-end:var(\n    --calcite-accordion-item-spacing-unit\n  )}:host([icon-position=end]){--calcite-accordion-item-flex-direction:row;--calcite-accordion-item-icon-rotation:-90deg;--calcite-accordion-item-active-icon-rotation:0deg;--calcite-accordion-item-icon-rotation-rtl:90deg;--calcite-accordion-item-active-icon-rotation-rtl:0deg;--calcite-accordion-item-icon-spacing-start:var(\n    --calcite-accordion-item-spacing-unit\n  );--calcite-accordion-item-icon-spacing-end:0}:host([icon-position=end]:not([icon-type=plus-minus])){--calcite-accordion-item-icon-rotation:0deg;--calcite-accordion-item-active-icon-rotation:180deg;--calcite-accordion-item-icon-rotation-rtl:0deg;--calcite-accordion-item-active-icon-rotation-rtl:-180deg}:host{--calcite-accordion-item-background:var(--calcite-ui-foreground-1)}:host-context([appearance=minimal]){--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0}:host-context([appearance=transparent]){--calcite-accordion-item-border:transparent;--calcite-accordion-item-background:transparent}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--calcite-accordion-item-background);color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;text-decoration:none;position:relative;outline:none;position:relative;--calcite-accordion-item-border:var(--calcite-ui-border-2)}:host .accordion-item-header{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) .accordion-item-header{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([active]){color:var(--calcite-ui-text-1)}:host([active]) .accordion-item-content{display:block;color:var(--calcite-ui-text-1)}:host([active]) .accordion-item-header{border-bottom-color:transparent}:host .accordion-item-header{display:-ms-flexbox;display:flex;-ms-flex-direction:var(--calcite-accordion-item-flex-direction);flex-direction:var(--calcite-accordion-item-flex-direction);-ms-flex-align:center;align-items:center;cursor:pointer}:host .accordion-item-icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;margin-right:var(--calcite-accordion-item-icon-spacing-start);margin-left:var(--calcite-accordion-item-icon-spacing-end);color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([dir=rtl]) .accordion-item-icon{margin-left:var(--calcite-accordion-item-icon-spacing-start);margin-right:var(--calcite-accordion-item-icon-spacing-end)}:host .accordion-item-content,:host .accordion-item-header{padding:var(--calcite-accordion-item-padding);border-bottom:1px solid var(--calcite-accordion-item-border)}:host .accordion-item-header *{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host .accordion-item-content{display:none;color:var(--calcite-ui-text-3);padding-top:0;text-align:initial}:host .accordion-item-expand-icon{margin-left:var(--calcite-accordion-item-icon-spacing-start);margin-right:var(--calcite-accordion-item-icon-spacing-end);color:var(--calcite-ui-text-3);-webkit-transform:rotate(var(--calcite-accordion-item-icon-rotation));transform:rotate(var(--calcite-accordion-item-icon-rotation))}:host([dir=rtl]) .accordion-item-expand-icon{margin-left:var(--calcite-accordion-item-icon-spacing-end);margin-right:var(--calcite-accordion-item-icon-spacing-start);-webkit-transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl));transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl))}:host([active]) .accordion-item-expand-icon{color:var(--calcite-ui-text-1);-webkit-transform:rotate(var(--calcite-accordion-item-active-icon-rotation));transform:rotate(var(--calcite-accordion-item-active-icon-rotation))}:host([active][dir=rtl]) .accordion-item-expand-icon{-webkit-transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl));transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl))}:host .accordion-item-header-text{margin-right:auto;-ms-flex-direction:column;flex-direction:column;-ms-flex:1;flex:1;text-align:initial}:host([dir=rtl]) .accordion-item-header-text{margin-left:auto;margin-right:0}:host .accordion-item-title,:host .accordion-item-subtitle{display:-ms-flexbox;display:flex;width:100%}:host .accordion-item-title{color:var(--calcite-ui-text-2);font-weight:500}:host .accordion-item-subtitle{color:var(--calcite-ui-text-3)}:host([dir=rtl]) .accordion-item-title{margin-right:0;margin-left:auto}:host(:focus) .accordion-item-title,:host(:hover) .accordion-item-title{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-icon,:host(:hover) .accordion-item-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-expand-icon,:host(:hover) .accordion-item-expand-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-subtitle,:host(:hover) .accordion-item-subtitle{color:var(--calcite-ui-text-2)}:host(:focus) .accordion-item-title,:host(:active) .accordion-item-title,:host([active]) .accordion-item-title{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-icon,:host(:active) .accordion-item-icon,:host([active]) .accordion-item-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-expand-icon,:host(:active) .accordion-item-expand-icon,:host([active]) .accordion-item-expand-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-subtitle,:host(:active) .accordion-item-subtitle,:host([active]) .accordion-item-subtitle{color:var(--calcite-ui-text-2)}";

const CalciteAccordionItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteAccordionItemKeyEvent = createEvent(this, "calciteAccordionItemKeyEvent", 7);
        this.calciteAccordionItemSelect = createEvent(this, "calciteAccordionItemSelect", 7);
        this.calciteAccordionItemClose = createEvent(this, "calciteAccordionItemClose", 7);
        this.calciteAccordionItemRegister = createEvent(this, "calciteAccordionItemRegister", 7);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** the containing accordion element */
        this.parent = this.el.parentElement;
        /** what selection mode is the parent accordion in */
        this.selectionMode = getElementProp(this.el, "selection-mode", "multi");
        /** what icon type does the parent accordion specify */
        this.iconType = getElementProp(this.el, "icon-type", "chevron");
        /** what icon position does the parent accordion specify */
        this.iconPosition = getElementProp(this.el, "icon-position", "end");
        /** the scale of the parent accordion */
        this.scale = getElementProp(this.el, "scale", "m");
        /** handle clicks on item header */
        this.itemHeaderClickHandler = () => this.emitRequestedItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        this.itemPosition = this.getItemPosition();
        this.calciteAccordionItemRegister.emit({
            parent: this.parent,
            position: this.itemPosition,
        });
    }
    render() {
        const dir = getElementDir(this.el);
        const iconScale = this.scale !== "l" ? "s" : "m";
        const iconEl = (h("calcite-icon", { class: "accordion-item-icon", icon: this.icon, scale: iconScale }));
        return (h(Host, { tabindex: "0", "aria-expanded": this.active.toString(), dir: dir, "icon-position": this.iconPosition }, h("div", { class: "accordion-item-header", onClick: this.itemHeaderClickHandler }, this.icon ? iconEl : null, h("div", { class: "accordion-item-header-text" }, h("span", { class: "accordion-item-title" }, this.itemTitle), h("span", { class: "accordion-item-subtitle" }, this.itemSubtitle)), h("calcite-icon", { class: "accordion-item-expand-icon", icon: this.iconType === "chevron"
                ? "chevronUp"
                : this.iconType === "caret"
                    ? "caretUp"
                    : this.active
                        ? "minus"
                        : "plus", scale: "s" })), h("div", { class: "accordion-item-content" }, h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
        if (e.target === this.el) {
            switch (getKey(e.key)) {
                case " ":
                case "Enter":
                    this.emitRequestedItem();
                    e.preventDefault();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                case "Home":
                case "End":
                    this.calciteAccordionItemKeyEvent.emit({
                        parent: this.parent,
                        item: e,
                    });
                    e.preventDefault();
                    break;
            }
        }
    }
    updateActiveItemOnChange(event) {
        this.requestedAccordionItem = event.detail
            .requestedAccordionItem;
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
                if (this.el === this.requestedAccordionItem)
                    this.active = !this.active;
                break;
            case "single":
                if (this.el === this.requestedAccordionItem)
                    this.active = !this.active;
                else
                    this.active = false;
                break;
            case "single-persist":
                this.active = this.el === this.requestedAccordionItem;
                break;
        }
    }
    emitRequestedItem() {
        this.calciteAccordionItemSelect.emit({
            requestedAccordionItem: this.el,
        });
    }
    getItemPosition() {
        return Array.prototype.indexOf.call(this.parent.querySelectorAll("calcite-accordion-item"), this.el);
    }
    get el() { return getElement(this); }
};
CalciteAccordionItem.style = calciteAccordionItemCss;

export { CalciteAccordion as calcite_accordion, CalciteAccordionItem as calcite_accordion_item };
