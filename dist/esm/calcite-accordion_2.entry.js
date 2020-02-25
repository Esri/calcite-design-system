import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-30c05663.js';
import { g as getElementDir, b as getElementProp } from './dom-0361c8d2.js';
import { g as guid } from './guid-cb609d41.js';
import { E as END, H as HOME, U as UP, D as DOWN, b as ENTER, S as SPACE } from './keys-1c8b189f.js';

const CalciteAccordion = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /** specify the theme of accordion, defaults to light */
        this.theme = "light";
        /** specify the scale of accordion, defaults to m */
        this.scale = "m";
        /** specify the appearance - default (containing border), or minimal (no containing border), defaults to default */
        this.appearance = "default";
        /** specify the placement of the icon in the header, defaults to end */
        this.iconPosition = "end";
        /** specify the placement of the icon in the header, defaults to end */
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
        /** keep track of the requested item for multi mode */
        this.requestedAccordionItem = "";
        this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map(a => a.item);
        this.calciteAccordionItemHasChanged = createEvent(this, "calciteAccordionItemHasChanged", 7);
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
        let theme = ["light", "dark"];
        if (!theme.includes(this.theme))
            this.theme = "light";
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
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteAccordionItemKeyEvent(e) {
        let item = e.detail.item;
        let itemToFocus = e.target;
        let isFirstItem = this.itemIndex(itemToFocus) === 0;
        let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
        switch (item.keyCode) {
            case DOWN:
                if (isLastItem)
                    this.focusFirstItem();
                else
                    this.focusNextItem(itemToFocus);
                break;
            case UP:
                if (isFirstItem)
                    this.focusLastItem();
                else
                    this.focusPrevItem(itemToFocus);
                break;
            case HOME:
                this.focusFirstItem();
                break;
            case END:
                this.focusLastItem();
                break;
        }
    }
    registerCalciteAccordionItem(e) {
        const item = {
            item: e.target,
            position: e.detail.position
        };
        this.items.push(item);
    }
    updateActiveItemOnChange(event) {
        this.requestedAccordionItem = event.detail.requestedAccordionItem;
        this.calciteAccordionItemHasChanged.emit({
            requestedAccordionItem: this.requestedAccordionItem
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
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host([scale=s]){--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) var(--calcite-accordion-item-spacing-unit);font-size:.8125rem;line-height:1.5}:host([scale=m]){--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) var(--calcite-accordion-item-spacing-unit);font-size:.875rem;line-height:1.5}:host([scale=l]){--calcite-accordion-item-spacing-unit:1.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) var(--calcite-accordion-item-spacing-unit);font-size:.9375rem;line-height:1.5}:host([icon-position=start]){--calcite-accordion-item-flex-direction:row-reverse;--calcite-accordion-item-icon-rotation:90deg;--calcite-accordion-item-active-icon-rotation:180deg;--calcite-accordion-item-icon-rotation-rtl:-90deg;--calcite-accordion-item-active-icon-rotation-rtl:-180deg;--calcite-accordion-item-icon-spacing-start:0;--calcite-accordion-item-icon-spacing-end:var(--calcite-accordion-item-spacing-unit)}:host([icon-position=end]){--calcite-accordion-item-flex-direction:row;--calcite-accordion-item-icon-rotation:-90deg;--calcite-accordion-item-active-icon-rotation:-180deg;--calcite-accordion-item-icon-rotation-rtl:90deg;--calcite-accordion-item-active-icon-rotation-rtl:180deg;--calcite-accordion-item-icon-spacing-start:var(--calcite-accordion-item-spacing-unit);--calcite-accordion-item-icon-spacing-end:0}:host{display:block;position:relative;max-width:100%;border:1px solid var(--calcite-ui-border-2);border-bottom:none;--calcite-accordion-item-border:var(--calcite-ui-border-2);--calcite-accordion-item-background:var(--calcite-ui-foreground)}:host([appearance=minimal]){--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0;border-color:transparent}:host([appearance=transparent]){border-color:transparent;--calcite-accordion-item-border:transparent;--calcite-accordion-item-background:transparent}"; }
};

const CalciteAccordionItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        /** unique id for Accordion item */
        this.accordionItemId = `calcite-accordion-item-${guid()}`;
        /** what selection mode is the parent accordion in */
        this.selectionMode = getElementProp(this.el, "selection-mode", "multi");
        /** what icon type does the parent accordion specify */
        this.iconType = getElementProp(this.el, "icon-type", "chevron");
        /** handle clicks on item header */
        this.itemHeaderClickHander = () => this.emitRequestedItem();
        this.calciteAccordionItemKeyEvent = createEvent(this, "calciteAccordionItemKeyEvent", 7);
        this.calciteAccordionItemSelected = createEvent(this, "calciteAccordionItemSelected", 7);
        this.closeCalciteAccordionItem = createEvent(this, "closeCalciteAccordionItem", 7);
        this.registerCalciteAccordionItem = createEvent(this, "registerCalciteAccordionItem", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        this.itemPosition = this.getItemPosition();
        this.registerCalciteAccordionItem.emit({
            position: this.itemPosition
        });
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, tabindex: "0", "aria-expanded": this.active.toString() }, h("div", { class: "accordion-item-header", onClick: this.itemHeaderClickHander }, h("div", { class: "accordion-item-header-text" }, h("span", { class: "accordion-item-title" }, this.itemTitle), h("span", { class: "accordion-item-subtitle" }, this.itemSubtitle)), h("calcite-icon", { class: "accordion-item-icon", icon: this.iconType === "chevron"
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
            switch (e.keyCode) {
                case SPACE:
                case ENTER:
                    this.emitRequestedItem();
                    e.preventDefault();
                    break;
                case UP:
                case DOWN:
                case HOME:
                case END:
                    this.calciteAccordionItemKeyEvent.emit({ item: e });
                    e.preventDefault();
                    break;
            }
        }
    }
    updateActiveItemOnChange(event) {
        this.requestedAccordionItem = event.detail.requestedAccordionItem;
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
                if (this.accordionItemId === this.requestedAccordionItem)
                    this.active = !this.active;
                break;
            case "single":
                if (this.accordionItemId === this.requestedAccordionItem)
                    this.active = !this.active;
                else
                    this.active = false;
                break;
            case "single-persist":
                this.active = this.accordionItemId === this.requestedAccordionItem;
                break;
        }
    }
    emitRequestedItem() {
        this.calciteAccordionItemSelected.emit({
            requestedAccordionItem: this.accordionItemId
        });
    }
    getItemPosition() {
        const parent = this.el.parentElement;
        return Array.prototype.indexOf.call(parent.querySelectorAll("calcite-accordion-item"), this.el);
    }
    get el() { return getElement(this); }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--calcite-accordion-item-background);color:var(--calcite-ui-text-3);-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out;text-decoration:none;outline:none;position:relative}:host([active]){color:var(--calcite-ui-text-1)}:host([active]) .accordion-item-content{display:block;color:var(--calcite-ui-text-1)}:host([active]) .accordion-item-header{border-bottom-color:transparent}:host .accordion-item-header{display:-ms-flexbox;display:flex;-ms-flex-direction:var(--calcite-accordion-item-flex-direction);flex-direction:var(--calcite-accordion-item-flex-direction);-ms-flex-align:center;align-items:center;cursor:pointer}:host .accordion-item-content,:host .accordion-item-header{padding:var(--calcite-accordion-item-padding);border-bottom:1px solid var(--calcite-accordion-item-border)}:host .accordion-item-header *{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}:host .accordion-item-content{display:none;color:var(--calcite-ui-text-3);padding-top:0}:host .accordion-item-icon{margin-left:var(--calcite-accordion-item-icon-spacing-start);margin-right:var(--calcite-accordion-item-icon-spacing-end);color:var(--calcite-ui-text-3);-webkit-transform:rotate(var(--calcite-accordion-item-icon-rotation));transform:rotate(var(--calcite-accordion-item-icon-rotation))}:host([dir=rtl]) .accordion-item-icon{margin-left:var(--calcite-accordion-item-icon-spacing-end);margin-right:var(--calcite-accordion-item-icon-spacing-start);-webkit-transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl));transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl))}:host([active]) .accordion-item-icon{color:var(--calcite-ui-text-1);-webkit-transform:rotate(var(--calcite-accordion-item-active-icon-rotation));transform:rotate(var(--calcite-accordion-item-active-icon-rotation))}:host([active][dir=rtl]) .accordion-item-icon{-webkit-transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl));transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl))}:host .accordion-item-header-text{margin-right:auto;-ms-flex-direction:column;flex-direction:column;text-align:initial}:host([dir=rtl]) .accordion-item-header-text{margin-left:auto;margin-right:0}:host .accordion-item-subtitle,:host .accordion-item-title{display:-ms-flexbox;display:flex;width:100%}:host .accordion-item-title{color:var(--calcite-ui-text-2)}:host .accordion-item-subtitle{color:var(--calcite-ui-text-3)}:host([dir=rtl]) .accordion-item-title{margin-right:0;margin-left:auto}:host(:focus) .accordion-item-title,:host(:hover) .accordion-item-title{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-subtitle,:host(:hover) .accordion-item-subtitle{color:var(--calcite-ui-text-2)}:host(:active) .accordion-item-title,:host(:focus) .accordion-item-title,:host([active]) .accordion-item-title{color:var(--calcite-ui-text-1);font-weight:500}:host(:active) .accordion-item-subtitle,:host(:focus) .accordion-item-subtitle,:host([active]) .accordion-item-subtitle{color:var(--calcite-ui-text-2)}"; }
};

export { CalciteAccordion as calcite_accordion, CalciteAccordionItem as calcite_accordion_item };
