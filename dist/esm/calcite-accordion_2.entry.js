import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-2154eb68.js';
import { D as DOWN, U as UP, H as HOME, b as END, S as SPACE, E as ENTER } from './keys-d0494fa5.js';
import { g as getElementDir, b as getElementProp } from './dom-e9ddd61f.js';
import { c as chevronLeft16 } from './index-596f4e61.js';
import { C as CalciteIcon } from './CalciteIcon-54458e0b.js';
import { g as guid } from './guid-cb609d41.js';

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
        let appearance = ["default", "minimal"];
        if (!appearance.includes(this.appearance))
            this.appearance = "default";
        let iconPosition = ["start", "end"];
        if (!iconPosition.includes(this.iconPosition))
            this.iconPosition = "end";
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
        return (h(Host, { dir: dir, tabindex: "-1" }, h("slot", null)));
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
    static get style() { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-accordion-border-color:#dfdfdf;--calcite-accordion-item-background-color:#fff;--calcite-accordion-item-color:#6a6a6a;--calcite-accordion-item-color-hover:#4a4a4a;--calcite-accordion-item-color-active:#151515;--calcite-accordion-item-border-color:#dfdfdf;--calcite-accordion-item-hover-icon-fill:#007ac2}:host([theme=dark]){--calcite-accordion-border-color:#404040;--calcite-accordion-item-background-color:#2b2b2b;--calcite-accordion-item-color:#9f9f9f;--calcite-accordion-item-color-hover:#bfbfbf;--calcite-accordion-item-color-active:#fff;--calcite-accordion-item-border-color:#404040;--calcite-accordion-item-hover-icon-fill:#00a0ff}:host([scale=s]){--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) var(--calcite-accordion-item-spacing-unit);font-size:.8125rem;line-height:1.5}:host([scale=m]){--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) var(--calcite-accordion-item-spacing-unit);font-size:.875rem;line-height:1.5}:host([scale=l]){--calcite-accordion-item-spacing-unit:1.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) var(--calcite-accordion-item-spacing-unit);font-size:.9375rem;line-height:1.5}:host([icon-position=start]){--calcite-accordion-item-flex-direction:row-reverse;--calcite-accordion-item-icon-rotation:180deg;--calcite-accordion-item-active-icon-rotation:270deg;--calcite-accordion-item-icon-rotation-rtl:0deg;--calcite-accordion-item-active-icon-rotation-rtl:-90deg;--calcite-accordion-item-icon-spacing-start:0;--calcite-accordion-item-icon-spacing-end:var(--calcite-accordion-item-spacing-unit)}:host([icon-position=end]){--calcite-accordion-item-flex-direction:row;--calcite-accordion-item-icon-rotation:0deg;--calcite-accordion-item-active-icon-rotation:-90deg;--calcite-accordion-item-icon-rotation-rtl:180deg;--calcite-accordion-item-active-icon-rotation-rtl:270deg;--calcite-accordion-item-icon-spacing-start:var(--calcite-accordion-item-spacing-unit);--calcite-accordion-item-icon-spacing-end:0}:host([appearance=minimal]){--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0}:host{display:block;position:relative;max-width:100%;border:1px solid var(--calcite-accordion-border-color);border-bottom:none}:host([appearance=minimal]){border:1px solid transparent}"; }
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
        return (h(Host, { dir: dir, tabindex: "0", "aria-expanded": this.active ? "true" : "false" }, h("div", { class: "accordion-item-header", onClick: this.itemHeaderClickHander }, h("span", { class: "accordion-item-title" }, this.itemTitle), h("div", { class: "accordion-item-icon" }, h(CalciteIcon, { size: "16", path: chevronLeft16 }))), h("div", { class: "accordion-item-content" }, h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
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
    static get style() { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--calcite-accordion-item-background-color);color:var(--calcite-accordion-item-color);-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out;text-decoration:none;outline:none;position:relative}:host([active]){color:var(--calcite-accordion-item-color-active)}:host([active]) .accordion-item-content{display:block}.accordion-item-header{display:-ms-flexbox;display:flex;-ms-flex-direction:var(--calcite-accordion-item-flex-direction);flex-direction:var(--calcite-accordion-item-flex-direction);-ms-flex-align:center;align-items:center;cursor:pointer}.accordion-item-content,.accordion-item-header{padding:var(--calcite-accordion-item-padding);border-bottom:1px solid var(--calcite-accordion-item-border-color);-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}.accordion-item-header *{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-transition:.15s ease-in-out;transition:.15s ease-in-out}.accordion-item-content{display:none}.accordion-item-icon{margin-left:var(--calcite-accordion-item-icon-spacing-start);margin-right:var(--calcite-accordion-item-icon-spacing-end)}.accordion-item-icon svg{fill:var(--calcite-accordion-item-color);-webkit-transform:rotate(var(--calcite-accordion-item-icon-rotation));transform:rotate(var(--calcite-accordion-item-icon-rotation))}:host(:focus) .accordion-item-icon svg,:host(:hover) .accordion-item-icon svg{fill:var(--calcite-accordion-item-hover-icon-fill)}:host([dir=rtl]) .accordion-item-icon{margin-left:var(--calcite-accordion-item-icon-spacing-end);margin-right:var(--calcite-accordion-item-icon-spacing-start)}:host([dir=rtl]) .accordion-item-icon svg{-webkit-transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl));transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl))}:host([active]) .accordion-item-icon svg{fill:var(--calcite-accordion-item-color-active);-webkit-transform:rotate(var(--calcite-accordion-item-active-icon-rotation));transform:rotate(var(--calcite-accordion-item-active-icon-rotation))}:host([active][dir=rtl]) .accordion-item-icon svg{-webkit-transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl));transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl))}.accordion-item-title{margin-right:auto}:host([dir=rtl]) .accordion-item-title{margin-right:0;margin-left:auto}:host(:focus) .accordion-item-title,:host(:hover) .accordion-item-title{color:var(--calcite-accordion-item-color-hover)}:host(:active) .accordion-item-title,:host(:focus) .accordion-item-title,:host([active]) .accordion-item-title{color:var(--calcite-accordion-item-color-active);font-weight:500}"; }
};

export { CalciteAccordion as calcite_accordion, CalciteAccordionItem as calcite_accordion_item };
