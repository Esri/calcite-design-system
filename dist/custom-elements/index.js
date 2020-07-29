import { attachShadow, createEvent, h, Host, Build, getAssetPath, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath } from '@stencil/core/internal/client';

/**
 * Standardize key property of keyboard event (mostly for ie11)
 */
function getKey(key) {
    const lookup = {
        Up: "ArrowUp",
        Down: "ArrowDown",
        Left: "ArrowLeft",
        Right: "ArrowRight",
        Spacebar: " ",
        Esc: "Escape"
    };
    return lookup[key] || key;
}

const calciteAccordionCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.8125rem;line-height:1.5}:host([scale=m]){--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.875rem;line-height:1.5}:host([scale=l]){--calcite-accordion-item-spacing-unit:1.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.9375rem;line-height:1.5}:host{display:block;position:relative;max-width:100%;border:1px solid var(--calcite-ui-border-2);border-bottom:none;--calcite-accordion-item-border:var(--calcite-ui-border-2);--calcite-accordion-item-background:var(--calcite-ui-foreground-1)}:host([appearance=minimal]){--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0;border-color:transparent}:host([appearance=transparent]){border-color:transparent;--calcite-accordion-item-border:transparent;--calcite-accordion-item-background:transparent}";

const CalciteAccordion = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
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
    get el() { return this; }
    static get style() { return calciteAccordionCss; }
};

// turn a domNodeList into an array
function nodeListToArray(domNodeList) {
    if (Array.isArray(domNodeList)) {
        return domNodeList;
    }
    else {
        return Array.prototype.slice.call(domNodeList);
    }
}
function getElementDir(el) {
    return getElementProp(el, "dir", "ltr");
}
function getElementProp(el, prop, value) {
    const closestWithProp = el.closest(`[${prop}]`);
    return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}
function focusElement(el) {
    if (!el) {
        return;
    }
    typeof el.setFocus === "function" ? el.setFocus() : el.focus();
}
function getSlottedElements(wrapperEl, selector) {
    const slot = wrapperEl.querySelector("slot");
    const elements = slot ? slot.assignedElements() : wrapperEl.children;
    return nodeListToArray(elements).filter((el) => el.matches(selector));
}
function getDescribedByElement(element) {
    const id = element === null || element === void 0 ? void 0 : element.getAttribute("aria-describedby");
    return (id && document.getElementById(id)) || null;
}
function hasLabel(labelEl, el) {
    return labelEl.shadowRoot.contains(el) || labelEl.contains(el);
}

const calciteAccordionItemCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host-context([scale=s]){--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.8125rem;line-height:1.5}:host-context([scale=m]){--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.875rem;line-height:1.5}:host-context([scale=l]){--calcite-accordion-item-spacing-unit:1.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.9375rem;line-height:1.5}:host([icon-position=start]){--calcite-accordion-item-flex-direction:row-reverse;--calcite-accordion-item-icon-rotation:90deg;--calcite-accordion-item-active-icon-rotation:180deg;--calcite-accordion-item-icon-rotation-rtl:-90deg;--calcite-accordion-item-active-icon-rotation-rtl:-180deg;--calcite-accordion-item-icon-spacing-start:0;--calcite-accordion-item-icon-spacing-end:var(\n    --calcite-accordion-item-spacing-unit\n  )}:host([icon-position=end]){--calcite-accordion-item-flex-direction:row;--calcite-accordion-item-icon-rotation:-90deg;--calcite-accordion-item-active-icon-rotation:0deg;--calcite-accordion-item-icon-rotation-rtl:90deg;--calcite-accordion-item-active-icon-rotation-rtl:0deg;--calcite-accordion-item-icon-spacing-start:var(\n    --calcite-accordion-item-spacing-unit\n  );--calcite-accordion-item-icon-spacing-end:0}:host([icon-position=end]:not([icon-type=plus-minus])){--calcite-accordion-item-icon-rotation:0deg;--calcite-accordion-item-active-icon-rotation:180deg;--calcite-accordion-item-icon-rotation-rtl:0deg;--calcite-accordion-item-active-icon-rotation-rtl:-180deg}:host{--calcite-accordion-item-background:var(--calcite-ui-foreground-1)}:host-context([appearance=minimal]){--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0}:host-context([appearance=transparent]){--calcite-accordion-item-border:transparent;--calcite-accordion-item-background:transparent}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--calcite-accordion-item-background);color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;text-decoration:none;position:relative;outline:none;position:relative;--calcite-accordion-item-border:var(--calcite-ui-border-2)}:host .accordion-item-header{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) .accordion-item-header{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([active]){color:var(--calcite-ui-text-1)}:host([active]) .accordion-item-content{display:block;color:var(--calcite-ui-text-1)}:host([active]) .accordion-item-header{border-bottom-color:transparent}:host .accordion-item-header{display:-ms-flexbox;display:flex;-ms-flex-direction:var(--calcite-accordion-item-flex-direction);flex-direction:var(--calcite-accordion-item-flex-direction);-ms-flex-align:center;align-items:center;cursor:pointer}:host .accordion-item-icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;margin-right:var(--calcite-accordion-item-icon-spacing-start);margin-left:var(--calcite-accordion-item-icon-spacing-end);color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([dir=rtl]) .accordion-item-icon{margin-left:var(--calcite-accordion-item-icon-spacing-start);margin-right:var(--calcite-accordion-item-icon-spacing-end)}:host .accordion-item-content,:host .accordion-item-header{padding:var(--calcite-accordion-item-padding);border-bottom:1px solid var(--calcite-accordion-item-border)}:host .accordion-item-header *{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host .accordion-item-content{display:none;color:var(--calcite-ui-text-3);padding-top:0;text-align:initial}:host .accordion-item-expand-icon{margin-left:var(--calcite-accordion-item-icon-spacing-start);margin-right:var(--calcite-accordion-item-icon-spacing-end);color:var(--calcite-ui-text-3);-webkit-transform:rotate(var(--calcite-accordion-item-icon-rotation));transform:rotate(var(--calcite-accordion-item-icon-rotation))}:host([dir=rtl]) .accordion-item-expand-icon{margin-left:var(--calcite-accordion-item-icon-spacing-end);margin-right:var(--calcite-accordion-item-icon-spacing-start);-webkit-transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl));transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl))}:host([active]) .accordion-item-expand-icon{color:var(--calcite-ui-text-1);-webkit-transform:rotate(var(--calcite-accordion-item-active-icon-rotation));transform:rotate(var(--calcite-accordion-item-active-icon-rotation))}:host([active][dir=rtl]) .accordion-item-expand-icon{-webkit-transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl));transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl))}:host .accordion-item-header-text{margin-right:auto;-ms-flex-direction:column;flex-direction:column;-ms-flex:1;flex:1;text-align:initial}:host([dir=rtl]) .accordion-item-header-text{margin-left:auto;margin-right:0}:host .accordion-item-title,:host .accordion-item-subtitle{display:-ms-flexbox;display:flex;width:100%}:host .accordion-item-title{color:var(--calcite-ui-text-2);font-weight:500}:host .accordion-item-subtitle{color:var(--calcite-ui-text-3)}:host([dir=rtl]) .accordion-item-title{margin-right:0;margin-left:auto}:host(:focus) .accordion-item-title,:host(:hover) .accordion-item-title{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-icon,:host(:hover) .accordion-item-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-expand-icon,:host(:hover) .accordion-item-expand-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-subtitle,:host(:hover) .accordion-item-subtitle{color:var(--calcite-ui-text-2)}:host(:focus) .accordion-item-title,:host(:active) .accordion-item-title,:host([active]) .accordion-item-title{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-icon,:host(:active) .accordion-item-icon,:host([active]) .accordion-item-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-expand-icon,:host(:active) .accordion-item-expand-icon,:host([active]) .accordion-item-expand-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-subtitle,:host(:active) .accordion-item-subtitle,:host([active]) .accordion-item-subtitle{color:var(--calcite-ui-text-2)}";

const CalciteAccordionItem = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
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
    get el() { return this; }
    static get style() { return calciteAccordionItemCss; }
};

const TEXT = {
    intlClose: "close"
};

const calciteAlertCss = ":host([hidden]){display:none}:host{--calcite-alert-dismiss-progress-background:rgba(255, 255, 255, 0.8)}:host([theme=dark]){--calcite-alert-dismiss-progress-background:rgba(43, 43, 43, 0.8)}:host([scale=s]){--calcite-alert-width:40em;--calcite-alert-spacing-token-small:0.75rem;--calcite-alert-spacing-token-large:1rem}:host([scale=s]) slot[name=alert-title]::slotted(*),:host([scale=s]) *::slotted([slot=alert-title]){font-size:0.875rem;line-height:1.5}:host([scale=s]) slot[name=alert-message]::slotted(*),:host([scale=s]) *::slotted([slot=alert-message]){font-size:0.8125rem;line-height:1.5}:host([scale=s]) ::slotted(calcite-link){font-size:0.8125rem;line-height:1.5}:host([scale=m]){--calcite-alert-width:50em;--calcite-alert-spacing-token-small:1rem;--calcite-alert-spacing-token-large:1.5rem}:host([scale=m]) slot[name=alert-title]::slotted(*),:host([scale=m]) *::slotted([slot=alert-title]){font-size:0.9375rem;line-height:1.5}:host([scale=m]) slot[name=alert-message]::slotted(*),:host([scale=m]) *::slotted([slot=alert-message]){font-size:0.875rem;line-height:1.5}:host([scale=m]) ::slotted(calcite-link){font-size:0.875rem;line-height:1.5}:host([scale=l]){--calcite-alert-width:60em;--calcite-alert-spacing-token-small:1.2rem;--calcite-alert-spacing-token-large:1.875rem}:host([scale=l]) slot[name=alert-title]::slotted(*),:host([scale=l]) *::slotted([slot=alert-title]){font-size:1rem;line-height:1.5}:host([scale=l]) slot[name=alert-message]::slotted(*),:host([scale=l]) *::slotted([slot=alert-message]){font-size:0.9375rem;line-height:1.5}:host([scale=l]) ::slotted(calcite-link){font-size:0.9375rem;line-height:1.5}:host{display:-ms-flexbox;display:flex;position:fixed;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;pointer-events:none;margin:0 auto;width:var(--calcite-alert-width);max-width:90%;max-height:0;background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:var(--calcite-border-radius);opacity:0;left:0;right:0;bottom:0;pointer-events:none;z-index:101;-webkit-transform:translate3d(0, 1.5rem, 0);transform:translate3d(0, 1.5rem, 0);-webkit-transition:300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;transition:300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;border-top:0px solid transparent}@media only screen and (max-width: 860px){:host{width:100%;max-width:100%;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}}.alert-close{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.alert-close:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([active]:not([queued])){opacity:1;max-height:100%;-webkit-transform:translate3d(0, -1.5rem, 0);transform:translate3d(0, -1.5rem, 0);pointer-events:initial;border-top-width:3px}@media only screen and (max-width: 860px){:host([active]:not([queued])){-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}slot[name=alert-title]::slotted(*),*::slotted([slot=alert-title]){font-size:1rem;line-height:1.5;color:var(--calcite-ui-text-1);margin:0;font-weight:500}slot[name=alert-message]::slotted(*),*::slotted([slot=alert-message]){display:inline;margin:0;margin-right:0.75rem;font-weight:400;font-size:0.9375rem;line-height:1.5;color:var(--calcite-ui-text-2)}:host([dir=rtl]) slot[name=alert-message]::slotted(*),:host([dir=rtl]) *::slotted([slot=alert-message]){margin-right:unset;margin-left:0.75rem}.alert-content{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small) 0}@media only screen and (max-width: 860px){.alert-content{padding:1.5rem}}.alert-content:first-of-type:not(:only-child){padding-left:var(--calcite-alert-spacing-token-large)}.alert-content:only-child{padding:var(--calcite-alert-spacing-token-small)}@media only screen and (max-width: 860px){.alert-content{padding:var(--calcite-alert-spacing-token-large) var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large) 0}}:host([dir=rtl]) .alert-content{padding:var(--calcite-alert-spacing-token-small) 0 var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small)}:host([dir=rtl]) .alert-content:first-of-type:not(:only-child){padding-right:var(--calcite-alert-spacing-token-large)}@media only screen and (max-width: 860px){:host([dir=rtl]) .alert-content{padding:var(--calcite-alert-spacing-token-large) 0 var(--calcite-alert-spacing-token-large) var(--calcite-alert-spacing-token-small)}}.alert-icon{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;padding-top:0;padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-item-align:stretch;align-self:stretch;-ms-flex-align:center;align-items:center}@media only screen and (max-width: 860px){.alert-icon{padding:1.5rem}}.alert-close{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;padding-top:0;padding-bottom:0;-ms-flex-item-align:stretch;align-self:stretch;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;color:var(--calcite-ui-text-3);overflow:hidden;border-radius:0 0 var(--calcite-border-radius) 0}@media only screen and (max-width: 860px){.alert-close{padding:1.5rem}}.alert-close:hover,.alert-close:focus{background-color:var(--calcite-ui-foreground-2)}.alert-close:active{background-color:var(--calcite-ui-foreground-3)}@media only screen and (max-width: 860px){.alert-close{border-radius:0}}:host([dir=rtl]) .alert-close{border-radius:0 0 0 var(--calcite-border-radius)}.alert-queue-count{font-size:0.875rem;line-height:1.5;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around;-ms-flex-item-align:stretch;align-self:stretch;overflow:hidden;width:0;visibility:hidden;font-weight:500;text-align:center;color:var(--calcite-ui-text-2);opacity:0;border-left:0px solid transparent;border-right:0px solid transparent;cursor:default;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;overflow:hidden}.alert-queue-count.active{visibility:visible;opacity:1;padding:0 0.375rem;width:3rem;border-left:1px solid var(--calcite-ui-border-3);border-right:1px solid var(--calcite-ui-border-3)}@media only screen and (max-width: 860px){.alert-queue-count{border-radius:0}}:host([auto-dismiss])>.alert-queue-count{border-right:0px solid transparent}:host([auto-dismiss][dir=rtl])>.alert-queue-count{border-left:0px solid transparent}.alert-dismiss-progress{display:block;position:absolute;left:0;right:0;top:-3px;width:100%;height:3px;z-index:103;overflow:hidden;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.alert-dismiss-progress:after{height:3px;top:0;right:0;display:block;position:absolute;content:\"\";background-color:var(--calcite-alert-dismiss-progress-background);z-index:104}:host([dir=rtl]) .alert-dismiss-progress:after{left:0;right:initial}:host([color=blue]){border-top-color:var(--calcite-ui-blue-1)}:host([color=blue]) .alert-icon{color:var(--calcite-ui-blue-1)}:host([color=red]){border-top-color:var(--calcite-ui-red-1)}:host([color=red]) .alert-icon{color:var(--calcite-ui-red-1)}:host([color=yellow]){border-top-color:var(--calcite-ui-yellow-1)}:host([color=yellow]) .alert-icon{color:var(--calcite-ui-yellow-1)}:host([color=green]){border-top-color:var(--calcite-ui-green-1)}:host([color=green]) .alert-icon{color:var(--calcite-ui-green-1)}:host([auto-dismiss-duration=fast]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 6000ms ease-out;animation:dismissProgress 6000ms ease-out}:host([auto-dismiss-duration=medium]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 10000ms ease-out;animation:dismissProgress 10000ms ease-out}:host([auto-dismiss-duration=slow]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 14000ms ease-out;animation:dismissProgress 14000ms ease-out}@-webkit-keyframes dismissProgress{0%{width:0;opacity:0.8}100%{width:100%;opacity:1}}@keyframes dismissProgress{0%{width:0;opacity:0.8}100%{width:100%;opacity:1}}";

const CalciteAlert = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteAlertClose = createEvent(this, "calciteAlertClose", 7);
        this.calciteAlertOpen = createEvent(this, "calciteAlertOpen", 7);
        this.calciteAlertSync = createEvent(this, "calciteAlertSync", 7);
        this.calciteAlertRegister = createEvent(this, "calciteAlertRegister", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //---------------------------------------------------------------------------
        /** Is the alert currently active or not */
        this.active = false;
        /** Close the alert automatically (recommended for passive, non-blocking alerts) */
        this.autoDismiss = false;
        /** Duration of autoDismiss (only used with `autoDismiss`) */
        this.autoDismissDuration = this
            .autoDismiss
            ? "medium"
            : null;
        /** Color for the alert (will apply to top border and icon) */
        this.color = "blue";
        /** specify the scale of the button, defaults to m */
        this.scale = "m";
        /** specify if the alert should display an icon */
        this.icon = false;
        /** string to override English close text */
        this.intlClose = TEXT.intlClose;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** the list of queued alerts */
        this.queue = [];
        /** the count of queued alerts */
        this.queueLength = 0;
        /** is the alert queued */
        this.queued = false;
        /** map dismissal durations */
        this.autoDismissDurations = {
            slow: 14000,
            medium: 10000,
            fast: 6000
        };
        /** map icon strings */
        this.iconDefaults = {
            green: "checkCircle",
            yellow: "exclamationMarkTriangle",
            red: "exclamationMarkTriangle",
            blue: "lightbulb"
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let colors = ["blue", "red", "green", "yellow"];
        if (!colors.includes(this.color))
            this.color = "blue";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let durations = ["slow", "medium", "fast"];
        if (this.autoDismissDuration !== null && !durations.includes(this.autoDismissDuration)) {
            this.autoDismissDuration = "medium";
        }
        if (this.active && !this.queued)
            this.calciteAlertRegister.emit();
    }
    componentDidLoad() {
        this.alertLinkEl = this.el.querySelectorAll("calcite-link")[0];
    }
    watchActive() {
        if (this.active && !this.queued)
            this.calciteAlertRegister.emit();
        if (!this.active) {
            this.queue = this.queue.filter((e) => e !== this.el);
            this.calciteAlertSync.emit({ queue: this.queue });
        }
    }
    render() {
        const dir = getElementDir(this.el);
        const closeButton = (h("button", { class: "alert-close", type: "button", "aria-label": this.intlClose, onClick: () => this.closeAlert(), ref: (el) => (this.closeButton = el) }, h("calcite-icon", { icon: "x", scale: "m" })));
        const queueCount = (h("div", { class: `${this.queueLength > 1 ? "active " : ""}alert-queue-count` }, "+", this.queueLength > 2 ? this.queueLength - 1 : 1));
        const progress = h("div", { class: "alert-dismiss-progress" });
        const role = this.autoDismiss ? "alert" : "alertdialog";
        const hidden = this.active ? "false" : "true";
        return (h(Host, { active: this.active, queued: this.queued, role: role, dir: dir, "aria-hidden": hidden }, this.icon ? this.setIcon() : null, h("div", { class: "alert-content" }, h("slot", { name: "alert-title" }), h("slot", { name: "alert-message" }), h("slot", { name: "alert-link" })), queueCount, !this.autoDismiss ? closeButton : null, this.active && !this.queued && this.autoDismiss ? progress : null));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** focus either the slotted alert-link or the close button */
    async setFocus() {
        if (!this.closeButton && !this.alertLinkEl)
            return;
        else if (this.alertLinkEl)
            this.alertLinkEl.setFocus();
        else if (this.closeButton)
            this.closeButton.focus();
    }
    // when an alert is opened or closed, update queue and determine active alert
    alertSync(event) {
        if (this.queue !== event.detail.queue) {
            this.queue = event.detail.queue;
        }
        this.queueLength = this.queue.length;
        this.determineActiveAlert();
    }
    // when an alert is first registered, trigger a queue sync to get queue
    alertRegister() {
        if (this.active && !this.queue.includes(this.el)) {
            this.queued = true;
            this.queue.push(this.el);
        }
        this.calciteAlertSync.emit({ queue: this.queue });
        this.determineActiveAlert();
    }
    /** emit the opened alert and the queue */
    openAlert() {
        setTimeout(() => (this.queued = false), 300);
        this.calciteAlertOpen.emit({
            el: this.el,
            queue: this.queue
        });
    }
    /** close and emit the closed alert and the queue */
    closeAlert() {
        this.queued = false;
        this.active = false;
        this.queue = this.queue.filter((e) => e !== this.el);
        this.determineActiveAlert();
        this.calciteAlertSync.emit({ queue: this.queue });
        this.calciteAlertClose.emit({
            el: this.el,
            queue: this.queue
        });
    }
    /** determine which alert is active */
    determineActiveAlert() {
        var _a;
        if (((_a = this.queue) === null || _a === void 0 ? void 0 : _a[0]) === this.el) {
            this.openAlert();
            if (this.autoDismiss) {
                setTimeout(() => this.closeAlert(), this.autoDismissDurations[this.autoDismissDuration]);
            }
        }
        else
            return;
    }
    setIcon() {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "alert-icon" }, h("calcite-icon", { icon: path, scale: "m" })));
    }
    get el() { return this; }
    static get watchers() { return {
        "active": ["watchActive"]
    }; }
    static get style() { return calciteAlertCss; }
};

const calciteButtonCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:inline-block;width:auto;vertical-align:middle;--calcite-button-dark:#404040;--calcite-button-dark-hover:#4a4a4a;--calcite-button-dark-press:#353535;--calcite-button-transparent-hover:rgba(0, 0, 0, 0.05);--calcite-button-transparent-press:rgba(0, 0, 0, 0.08)}:host([theme=dark]){--calcite-button-dark:#404040;--calcite-button-dark-hover:#353535;--calcite-button-dark-press:#4a4a4a;--calcite-button-transparent-hover:rgba(255, 255, 255, 0.05);--calcite-button-transparent-press:rgba(255, 255, 255, 0.08)}:host([round]){border-radius:50px}:host([round]) a,:host([round]) button{border-radius:50px}:host([floating]) a,:host([floating]) button{-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16)}:host([floating]) a:hover,:host([floating]) button:hover{-webkit-box-shadow:0 0 32px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 32px 0 rgba(0, 0, 0, 0.16)}:host([floating]) a:active,:host([floating]) button:active{-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.32);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.32)}:host button,:host a,:host span{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus,:host a:focus,:host span:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host button,:host a,:host span{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:0.375rem 1rem;text-decoration:none;width:100%;height:100%;border-radius:0;border:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-family:inherit;-webkit-appearance:none;cursor:pointer;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:background-color 0.15s ease-in-out, border 0.15s ease-in-out, outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:background-color 0.15s ease-in-out, border 0.15s ease-in-out, outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:background-color 0.15s ease-in-out, border 0.15s ease-in-out, box-shadow 0.15s ease-in-out, outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:background-color 0.15s ease-in-out, border 0.15s ease-in-out, box-shadow 0.15s ease-in-out, outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out, -webkit-box-shadow 0.15s ease-in-out}:host button:hover,:host a:hover,:host span:hover{text-decoration:none}:host([width=auto]){width:auto}:host([width=half]){width:50%}:host([width=full]){width:100%}.calcite-button--icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;line-height:inherit;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([disabled]){pointer-events:none}:host([disabled]) button,:host([disabled]) span,:host([disabled]) a{pointer-events:none;opacity:0.4}:host([hastext]) .calcite-button--icon.icon-start{margin-right:0.5rem}:host([hastext][dir=rtl]) .calcite-button--icon.icon-start{margin-right:0;margin-left:0.5rem}:host([hastext]) .calcite-button--icon.icon-end{margin-left:0.5rem}:host([hastext][dir=rtl]) .calcite-button--icon.icon-end{margin-left:0;margin-right:0.5rem}:host([icon-start][icon-end]) .calcite-button--icon:first-child{margin-right:0.5rem}:host([icon-start][icon-end][dir=rtl]) .calcite-button--icon:first-child{margin-right:0;margin-left:0.5rem}.calcite-button--loader{display:-ms-flexbox;display:flex;position:absolute;top:0;left:0;right:0;bottom:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.calcite-button--loader calcite-loader{margin:0}:host([loading]) button,:host([loading]) a{color:transparent !important;pointer-events:none}:host([loading]) button .calcite-button--icon,:host([loading]) a .calcite-button--icon{opacity:0}:host([appearance=solid][color=blue]) button,:host([appearance=solid][color=blue]) a{color:var(--calcite-ui-foreground-1);background-color:var(--calcite-ui-blue-1);border:1px solid transparent}:host([appearance=solid][color=blue]) button:hover,:host([appearance=solid][color=blue]) button:focus,:host([appearance=solid][color=blue]) a:hover,:host([appearance=solid][color=blue]) a:focus{background-color:var(--calcite-ui-blue-2)}:host([appearance=solid][color=blue]) button:active,:host([appearance=solid][color=blue]) a:active{background-color:var(--calcite-ui-blue-1)}:host([appearance=solid][color=blue]) button .calcite-button--icon,:host([appearance=solid][color=blue]) a .calcite-button--icon{fill:var(--calcite-ui-foreground-1)}:host([appearance=solid][color=blue]) button calcite-loader,:host([appearance=solid][color=blue]) a calcite-loader{color:var(--calcite-ui-foreground-1)}:host([appearance=solid][color=red]) button,:host([appearance=solid][color=red]) a{color:var(--calcite-ui-foreground-1);background-color:var(--calcite-ui-red-1);border:1px solid transparent}:host([appearance=solid][color=red]) button:hover,:host([appearance=solid][color=red]) button:focus,:host([appearance=solid][color=red]) a:hover,:host([appearance=solid][color=red]) a:focus{background-color:var(--calcite-ui-red-2)}:host([appearance=solid][color=red]) button:active,:host([appearance=solid][color=red]) a:active{background-color:var(--calcite-ui-red-1)}:host([appearance=solid][color=red]) button .calcite-button--icon,:host([appearance=solid][color=red]) a .calcite-button--icon{fill:var(--calcite-ui-foreground-1)}:host([appearance=solid][color=red]) button calcite-loader,:host([appearance=solid][color=red]) a calcite-loader{color:var(--calcite-ui-foreground-1)}:host([appearance=solid][color=light]) button,:host([appearance=solid][color=light]) a{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-3);border:1px solid transparent}:host([appearance=solid][color=light]) button:hover,:host([appearance=solid][color=light]) button:focus,:host([appearance=solid][color=light]) a:hover,:host([appearance=solid][color=light]) a:focus{background-color:var(--calcite-ui-foreground-2)}:host([appearance=solid][color=light]) button:active,:host([appearance=solid][color=light]) a:active{background-color:var(--calcite-ui-foreground-3)}:host([appearance=solid][color=light]) button .calcite-button--icon,:host([appearance=solid][color=light]) a .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=solid][color=light]) button calcite-loader,:host([appearance=solid][color=light]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=solid][color=dark]) button,:host([appearance=solid][color=dark]) a{color:#ffffff;background-color:var(--calcite-button-dark);border:1px solid transparent}:host([appearance=solid][color=dark]) button:hover,:host([appearance=solid][color=dark]) button:focus,:host([appearance=solid][color=dark]) a:hover,:host([appearance=solid][color=dark]) a:focus{background-color:var(--calcite-button-dark-hover)}:host([appearance=solid][color=dark]) button:active,:host([appearance=solid][color=dark]) a:active{background-color:var(--calcite-button-dark)}:host([appearance=solid][color=dark]) button .calcite-button--icon,:host([appearance=solid][color=dark]) a .calcite-button--icon{fill:#ffffff}:host([appearance=solid][color=dark]) button calcite-loader,:host([appearance=solid][color=dark]) a calcite-loader{color:#ffffff}:host([appearance=outline][color=blue]:not([floating])) button,:host([appearance=outline][color=blue]:not([floating])) a{color:var(--calcite-ui-blue-3);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=outline][color=blue]:not([floating])) button:hover,:host([appearance=outline][color=blue]:not([floating])) a:hover{border-color:var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-3);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-3)}:host([appearance=outline][color=blue]:not([floating])) button:active,:host([appearance=outline][color=blue]:not([floating])) button:focus,:host([appearance=outline][color=blue]:not([floating])) a:active,:host([appearance=outline][color=blue]:not([floating])) a:focus{color:var(--calcite-ui-blue-3);border-color:var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-3);box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-3)}:host([appearance=outline][color=blue]:not([floating])) button:active .calcite-button--icon,:host([appearance=outline][color=blue]:not([floating])) button:focus .calcite-button--icon,:host([appearance=outline][color=blue]:not([floating])) a:active .calcite-button--icon,:host([appearance=outline][color=blue]:not([floating])) a:focus .calcite-button--icon{fill:var(--calcite-ui-blue-3)}:host([appearance=outline][color=blue]:not([floating])) button .calcite-button--icon,:host([appearance=outline][color=blue]:not([floating])) a .calcite-button--icon{fill:var(--calcite-ui-blue-3)}:host([appearance=outline][color=blue]:not([floating])) button calcite-loader,:host([appearance=outline][color=blue]:not([floating])) a calcite-loader{color:var(--calcite-ui-blue-3)}:host([appearance=outline][color=red]:not([floating])) button,:host([appearance=outline][color=red]:not([floating])) a{color:var(--calcite-ui-red-3);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=outline][color=red]:not([floating])) button:hover,:host([appearance=outline][color=red]:not([floating])) a:hover{border-color:var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-red-3);box-shadow:inset 0 0 0 1px var(--calcite-ui-red-3)}:host([appearance=outline][color=red]:not([floating])) button:active,:host([appearance=outline][color=red]:not([floating])) button:focus,:host([appearance=outline][color=red]:not([floating])) a:active,:host([appearance=outline][color=red]:not([floating])) a:focus{color:var(--calcite-ui-red-3);border-color:var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-red-3);box-shadow:inset 0 0 0 2px var(--calcite-ui-red-3)}:host([appearance=outline][color=red]:not([floating])) button:active .calcite-button--icon,:host([appearance=outline][color=red]:not([floating])) button:focus .calcite-button--icon,:host([appearance=outline][color=red]:not([floating])) a:active .calcite-button--icon,:host([appearance=outline][color=red]:not([floating])) a:focus .calcite-button--icon{fill:var(--calcite-ui-red-3)}:host([appearance=outline][color=red]:not([floating])) button .calcite-button--icon,:host([appearance=outline][color=red]:not([floating])) a .calcite-button--icon{fill:var(--calcite-ui-red-3)}:host([appearance=outline][color=red]:not([floating])) button calcite-loader,:host([appearance=outline][color=red]:not([floating])) a calcite-loader{color:var(--calcite-ui-red-3)}:host([appearance=outline][color=light]:not([floating])) button,:host([appearance=outline][color=light]:not([floating])) a{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=outline][color=light]:not([floating])) button:hover,:host([appearance=outline][color=light]:not([floating])) a:hover{border-color:var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3);box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3)}:host([appearance=outline][color=light]:not([floating])) button:active,:host([appearance=outline][color=light]:not([floating])) button:focus,:host([appearance=outline][color=light]:not([floating])) a:active,:host([appearance=outline][color=light]:not([floating])) a:focus{color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-border-2);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2);box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2)}:host([appearance=outline][color=light]:not([floating])) button:active .calcite-button--icon,:host([appearance=outline][color=light]:not([floating])) button:focus .calcite-button--icon,:host([appearance=outline][color=light]:not([floating])) a:active .calcite-button--icon,:host([appearance=outline][color=light]:not([floating])) a:focus .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=light]:not([floating])) button .calcite-button--icon,:host([appearance=outline][color=light]:not([floating])) a .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=light]:not([floating])) button calcite-loader,:host([appearance=outline][color=light]:not([floating])) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=outline][color=dark]:not([floating])) button,:host([appearance=outline][color=dark]:not([floating])) a{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-1);border:1px solid #404040;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=outline][color=dark]:not([floating])) button:hover,:host([appearance=outline][color=dark]:not([floating])) a:hover{border-color:#404040;-webkit-box-shadow:inset 0 0 0 1px #404040;box-shadow:inset 0 0 0 1px #404040}:host([appearance=outline][color=dark]:not([floating])) button:active,:host([appearance=outline][color=dark]:not([floating])) button:focus,:host([appearance=outline][color=dark]:not([floating])) a:active,:host([appearance=outline][color=dark]:not([floating])) a:focus{color:var(--calcite-ui-text-1);border-color:#4a4a4a;-webkit-box-shadow:inset 0 0 0 2px #4a4a4a;box-shadow:inset 0 0 0 2px #4a4a4a}:host([appearance=outline][color=dark]:not([floating])) button:active .calcite-button--icon,:host([appearance=outline][color=dark]:not([floating])) button:focus .calcite-button--icon,:host([appearance=outline][color=dark]:not([floating])) a:active .calcite-button--icon,:host([appearance=outline][color=dark]:not([floating])) a:focus .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=dark]:not([floating])) button .calcite-button--icon,:host([appearance=outline][color=dark]:not([floating])) a .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=dark]:not([floating])) button calcite-loader,:host([appearance=outline][color=dark]:not([floating])) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=clear][color=blue]:not([floating])) button,:host([appearance=clear][color=blue]:not([floating])) a{color:var(--calcite-ui-blue-3);background-color:transparent;border:1px solid var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=clear][color=blue]:not([floating])) button:hover,:host([appearance=clear][color=blue]:not([floating])) a:hover{border-color:var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-3);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-3)}:host([appearance=clear][color=blue]:not([floating])) button:active,:host([appearance=clear][color=blue]:not([floating])) button:focus,:host([appearance=clear][color=blue]:not([floating])) a:active,:host([appearance=clear][color=blue]:not([floating])) a:focus{color:var(--calcite-ui-blue-3);border-color:var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-3);box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-3)}:host([appearance=clear][color=blue]:not([floating])) button:active .calcite-button--icon,:host([appearance=clear][color=blue]:not([floating])) button:focus .calcite-button--icon,:host([appearance=clear][color=blue]:not([floating])) a:active .calcite-button--icon,:host([appearance=clear][color=blue]:not([floating])) a:focus .calcite-button--icon{fill:var(--calcite-ui-blue-3)}:host([appearance=clear][color=blue]:not([floating])) button .calcite-button--icon,:host([appearance=clear][color=blue]:not([floating])) a .calcite-button--icon{fill:var(--calcite-ui-blue-3)}:host([appearance=clear][color=blue]:not([floating])) button calcite-loader,:host([appearance=clear][color=blue]:not([floating])) a calcite-loader{color:var(--calcite-ui-blue-3)}:host([appearance=clear][color=red]:not([floating])) button,:host([appearance=clear][color=red]:not([floating])) a{color:var(--calcite-ui-red-3);background-color:transparent;border:1px solid var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=clear][color=red]:not([floating])) button:hover,:host([appearance=clear][color=red]:not([floating])) a:hover{border-color:var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-red-3);box-shadow:inset 0 0 0 1px var(--calcite-ui-red-3)}:host([appearance=clear][color=red]:not([floating])) button:active,:host([appearance=clear][color=red]:not([floating])) button:focus,:host([appearance=clear][color=red]:not([floating])) a:active,:host([appearance=clear][color=red]:not([floating])) a:focus{color:var(--calcite-ui-red-3);border-color:var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-red-3);box-shadow:inset 0 0 0 2px var(--calcite-ui-red-3)}:host([appearance=clear][color=red]:not([floating])) button:active .calcite-button--icon,:host([appearance=clear][color=red]:not([floating])) button:focus .calcite-button--icon,:host([appearance=clear][color=red]:not([floating])) a:active .calcite-button--icon,:host([appearance=clear][color=red]:not([floating])) a:focus .calcite-button--icon{fill:var(--calcite-ui-red-3)}:host([appearance=clear][color=red]:not([floating])) button .calcite-button--icon,:host([appearance=clear][color=red]:not([floating])) a .calcite-button--icon{fill:var(--calcite-ui-red-3)}:host([appearance=clear][color=red]:not([floating])) button calcite-loader,:host([appearance=clear][color=red]:not([floating])) a calcite-loader{color:var(--calcite-ui-red-3)}:host([appearance=clear][color=light]:not([floating])) button,:host([appearance=clear][color=light]:not([floating])) a{color:var(--calcite-ui-background);background-color:transparent;border:1px solid var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=clear][color=light]:not([floating])) button:hover,:host([appearance=clear][color=light]:not([floating])) a:hover{border-color:var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3);box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3)}:host([appearance=clear][color=light]:not([floating])) button:active,:host([appearance=clear][color=light]:not([floating])) button:focus,:host([appearance=clear][color=light]:not([floating])) a:active,:host([appearance=clear][color=light]:not([floating])) a:focus{color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-border-2);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2);box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2)}:host([appearance=clear][color=light]:not([floating])) button:active .calcite-button--icon,:host([appearance=clear][color=light]:not([floating])) button:focus .calcite-button--icon,:host([appearance=clear][color=light]:not([floating])) a:active .calcite-button--icon,:host([appearance=clear][color=light]:not([floating])) a:focus .calcite-button--icon{fill:var(--calcite-ui-foreground-1)}:host([appearance=clear][color=light]:not([floating])) button .calcite-button--icon,:host([appearance=clear][color=light]:not([floating])) a .calcite-button--icon{fill:var(--calcite-ui-background)}:host([appearance=clear][color=light]:not([floating])) button calcite-loader,:host([appearance=clear][color=light]:not([floating])) a calcite-loader{color:var(--calcite-ui-background)}:host([appearance=clear][color=dark]:not([floating])) button,:host([appearance=clear][color=dark]:not([floating])) a{color:#151515;background-color:transparent;border:1px solid #404040;-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent}:host([appearance=clear][color=dark]:not([floating])) button:hover,:host([appearance=clear][color=dark]:not([floating])) a:hover{border-color:#404040;-webkit-box-shadow:inset 0 0 0 1px #404040;box-shadow:inset 0 0 0 1px #404040}:host([appearance=clear][color=dark]:not([floating])) button:active,:host([appearance=clear][color=dark]:not([floating])) button:focus,:host([appearance=clear][color=dark]:not([floating])) a:active,:host([appearance=clear][color=dark]:not([floating])) a:focus{color:#151515;border-color:#4a4a4a;-webkit-box-shadow:inset 0 0 0 2px #4a4a4a;box-shadow:inset 0 0 0 2px #4a4a4a}:host([appearance=clear][color=dark]:not([floating])) button:active .calcite-button--icon,:host([appearance=clear][color=dark]:not([floating])) button:focus .calcite-button--icon,:host([appearance=clear][color=dark]:not([floating])) a:active .calcite-button--icon,:host([appearance=clear][color=dark]:not([floating])) a:focus .calcite-button--icon{fill:#151515}:host([appearance=clear][color=dark]:not([floating])) button .calcite-button--icon,:host([appearance=clear][color=dark]:not([floating])) a .calcite-button--icon{fill:#151515}:host([appearance=clear][color=dark]:not([floating])) button calcite-loader,:host([appearance=clear][color=dark]:not([floating])) a calcite-loader{color:#151515}:host([appearance=outline][color=blue]) button,:host([appearance=outline][color=blue]) a{color:var(--calcite-ui-blue-3);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16)}:host([appearance=outline][color=blue]) button:hover,:host([appearance=outline][color=blue]) a:hover{border-color:1px solid var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-3), 0 0 32px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-3), 0 0 32px 0 rgba(0, 0, 0, 0.16)}:host([appearance=outline][color=blue]) button:active,:host([appearance=outline][color=blue]) button:focus,:host([appearance=outline][color=blue]) a:active,:host([appearance=outline][color=blue]) a:focus{color:var(--calcite-ui-blue-3);border-color:var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-3), 0 0 16px 0 rgba(0, 0, 0, 0.32);box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-3), 0 0 16px 0 rgba(0, 0, 0, 0.32)}:host([appearance=outline][color=blue]) button:active .calcite-button--icon,:host([appearance=outline][color=blue]) button:focus .calcite-button--icon,:host([appearance=outline][color=blue]) a:active .calcite-button--icon,:host([appearance=outline][color=blue]) a:focus .calcite-button--icon{fill:var(--calcite-ui-blue-3)}:host([appearance=outline][color=blue]) button .calcite-button--icon,:host([appearance=outline][color=blue]) a .calcite-button--icon{fill:var(--calcite-ui-blue-3)}:host([appearance=outline][color=blue]) button calcite-loader,:host([appearance=outline][color=blue]) a calcite-loader{color:var(--calcite-ui-blue-3)}:host([appearance=outline][color=red]) button,:host([appearance=outline][color=red]) a{color:var(--calcite-ui-red-3);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16)}:host([appearance=outline][color=red]) button:hover,:host([appearance=outline][color=red]) a:hover{border-color:1px solid var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-red-3), 0 0 32px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px var(--calcite-ui-red-3), 0 0 32px 0 rgba(0, 0, 0, 0.16)}:host([appearance=outline][color=red]) button:active,:host([appearance=outline][color=red]) button:focus,:host([appearance=outline][color=red]) a:active,:host([appearance=outline][color=red]) a:focus{color:var(--calcite-ui-red-3);border-color:var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-red-3), 0 0 16px 0 rgba(0, 0, 0, 0.32);box-shadow:inset 0 0 0 2px var(--calcite-ui-red-3), 0 0 16px 0 rgba(0, 0, 0, 0.32)}:host([appearance=outline][color=red]) button:active .calcite-button--icon,:host([appearance=outline][color=red]) button:focus .calcite-button--icon,:host([appearance=outline][color=red]) a:active .calcite-button--icon,:host([appearance=outline][color=red]) a:focus .calcite-button--icon{fill:var(--calcite-ui-red-3)}:host([appearance=outline][color=red]) button .calcite-button--icon,:host([appearance=outline][color=red]) a .calcite-button--icon{fill:var(--calcite-ui-red-3)}:host([appearance=outline][color=red]) button calcite-loader,:host([appearance=outline][color=red]) a calcite-loader{color:var(--calcite-ui-red-3)}:host([appearance=outline][color=light]) button,:host([appearance=outline][color=light]) a{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16)}:host([appearance=outline][color=light]) button:hover,:host([appearance=outline][color=light]) a:hover{border-color:1px solid var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3), 0 0 32px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3), 0 0 32px 0 rgba(0, 0, 0, 0.16)}:host([appearance=outline][color=light]) button:active,:host([appearance=outline][color=light]) button:focus,:host([appearance=outline][color=light]) a:active,:host([appearance=outline][color=light]) a:focus{color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-border-2);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2), 0 0 16px 0 rgba(0, 0, 0, 0.32);box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2), 0 0 16px 0 rgba(0, 0, 0, 0.32)}:host([appearance=outline][color=light]) button:active .calcite-button--icon,:host([appearance=outline][color=light]) button:focus .calcite-button--icon,:host([appearance=outline][color=light]) a:active .calcite-button--icon,:host([appearance=outline][color=light]) a:focus .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=light]) button .calcite-button--icon,:host([appearance=outline][color=light]) a .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=light]) button calcite-loader,:host([appearance=outline][color=light]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=outline][color=dark]) button,:host([appearance=outline][color=dark]) a{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-1);border:1px solid #404040;-webkit-box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16)}:host([appearance=outline][color=dark]) button:hover,:host([appearance=outline][color=dark]) a:hover{border-color:1px solid #404040;-webkit-box-shadow:inset 0 0 0 1px #404040, 0 0 32px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px #404040, 0 0 32px 0 rgba(0, 0, 0, 0.16)}:host([appearance=outline][color=dark]) button:active,:host([appearance=outline][color=dark]) button:focus,:host([appearance=outline][color=dark]) a:active,:host([appearance=outline][color=dark]) a:focus{color:var(--calcite-ui-text-1);border-color:#4a4a4a;-webkit-box-shadow:inset 0 0 0 2px #4a4a4a, 0 0 16px 0 rgba(0, 0, 0, 0.32);box-shadow:inset 0 0 0 2px #4a4a4a, 0 0 16px 0 rgba(0, 0, 0, 0.32)}:host([appearance=outline][color=dark]) button:active .calcite-button--icon,:host([appearance=outline][color=dark]) button:focus .calcite-button--icon,:host([appearance=outline][color=dark]) a:active .calcite-button--icon,:host([appearance=outline][color=dark]) a:focus .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=dark]) button .calcite-button--icon,:host([appearance=outline][color=dark]) a .calcite-button--icon{fill:var(--calcite-ui-text-1)}:host([appearance=outline][color=dark]) button calcite-loader,:host([appearance=outline][color=dark]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=clear][color=blue]) button,:host([appearance=clear][color=blue]) a{color:var(--calcite-ui-blue-3);background-color:transparent;border:1px solid var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16)}:host([appearance=clear][color=blue]) button:hover,:host([appearance=clear][color=blue]) a:hover{border-color:1px solid var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-3), 0 0 32px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-3), 0 0 32px 0 rgba(0, 0, 0, 0.16)}:host([appearance=clear][color=blue]) button:active,:host([appearance=clear][color=blue]) button:focus,:host([appearance=clear][color=blue]) a:active,:host([appearance=clear][color=blue]) a:focus{color:var(--calcite-ui-blue-3);border-color:var(--calcite-ui-blue-3);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-3), 0 0 16px 0 rgba(0, 0, 0, 0.32);box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-3), 0 0 16px 0 rgba(0, 0, 0, 0.32)}:host([appearance=clear][color=blue]) button:active .calcite-button--icon,:host([appearance=clear][color=blue]) button:focus .calcite-button--icon,:host([appearance=clear][color=blue]) a:active .calcite-button--icon,:host([appearance=clear][color=blue]) a:focus .calcite-button--icon{fill:var(--calcite-ui-blue-3)}:host([appearance=clear][color=blue]) button .calcite-button--icon,:host([appearance=clear][color=blue]) a .calcite-button--icon{fill:var(--calcite-ui-blue-3)}:host([appearance=clear][color=blue]) button calcite-loader,:host([appearance=clear][color=blue]) a calcite-loader{color:var(--calcite-ui-blue-3)}:host([appearance=clear][color=red]) button,:host([appearance=clear][color=red]) a{color:var(--calcite-ui-red-3);background-color:transparent;border:1px solid var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16)}:host([appearance=clear][color=red]) button:hover,:host([appearance=clear][color=red]) a:hover{border-color:1px solid var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-red-3), 0 0 32px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px var(--calcite-ui-red-3), 0 0 32px 0 rgba(0, 0, 0, 0.16)}:host([appearance=clear][color=red]) button:active,:host([appearance=clear][color=red]) button:focus,:host([appearance=clear][color=red]) a:active,:host([appearance=clear][color=red]) a:focus{color:var(--calcite-ui-red-3);border-color:var(--calcite-ui-red-3);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-red-3), 0 0 16px 0 rgba(0, 0, 0, 0.32);box-shadow:inset 0 0 0 2px var(--calcite-ui-red-3), 0 0 16px 0 rgba(0, 0, 0, 0.32)}:host([appearance=clear][color=red]) button:active .calcite-button--icon,:host([appearance=clear][color=red]) button:focus .calcite-button--icon,:host([appearance=clear][color=red]) a:active .calcite-button--icon,:host([appearance=clear][color=red]) a:focus .calcite-button--icon{fill:var(--calcite-ui-red-3)}:host([appearance=clear][color=red]) button .calcite-button--icon,:host([appearance=clear][color=red]) a .calcite-button--icon{fill:var(--calcite-ui-red-3)}:host([appearance=clear][color=red]) button calcite-loader,:host([appearance=clear][color=red]) a calcite-loader{color:var(--calcite-ui-red-3)}:host([appearance=clear][color=light]) button,:host([appearance=clear][color=light]) a{color:var(--calcite-ui-background);background-color:transparent;border:1px solid var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16)}:host([appearance=clear][color=light]) button:hover,:host([appearance=clear][color=light]) a:hover{border-color:1px solid var(--calcite-ui-foreground-3);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3), 0 0 32px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3), 0 0 32px 0 rgba(0, 0, 0, 0.16)}:host([appearance=clear][color=light]) button:active,:host([appearance=clear][color=light]) button:focus,:host([appearance=clear][color=light]) a:active,:host([appearance=clear][color=light]) a:focus{color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-border-2);-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2), 0 0 16px 0 rgba(0, 0, 0, 0.32);box-shadow:inset 0 0 0 2px var(--calcite-ui-border-2), 0 0 16px 0 rgba(0, 0, 0, 0.32)}:host([appearance=clear][color=light]) button:active .calcite-button--icon,:host([appearance=clear][color=light]) button:focus .calcite-button--icon,:host([appearance=clear][color=light]) a:active .calcite-button--icon,:host([appearance=clear][color=light]) a:focus .calcite-button--icon{fill:var(--calcite-ui-foreground-1)}:host([appearance=clear][color=light]) button .calcite-button--icon,:host([appearance=clear][color=light]) a .calcite-button--icon{fill:var(--calcite-ui-background)}:host([appearance=clear][color=light]) button calcite-loader,:host([appearance=clear][color=light]) a calcite-loader{color:var(--calcite-ui-background)}:host([appearance=clear][color=dark]) button,:host([appearance=clear][color=dark]) a{color:#151515;background-color:transparent;border:1px solid #404040;-webkit-box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px transparent, 0 0 16px 0 rgba(0, 0, 0, 0.16)}:host([appearance=clear][color=dark]) button:hover,:host([appearance=clear][color=dark]) a:hover{border-color:1px solid #404040;-webkit-box-shadow:inset 0 0 0 1px #404040, 0 0 32px 0 rgba(0, 0, 0, 0.16);box-shadow:inset 0 0 0 1px #404040, 0 0 32px 0 rgba(0, 0, 0, 0.16)}:host([appearance=clear][color=dark]) button:active,:host([appearance=clear][color=dark]) button:focus,:host([appearance=clear][color=dark]) a:active,:host([appearance=clear][color=dark]) a:focus{color:#151515;border-color:#4a4a4a;-webkit-box-shadow:inset 0 0 0 2px #4a4a4a, 0 0 16px 0 rgba(0, 0, 0, 0.32);box-shadow:inset 0 0 0 2px #4a4a4a, 0 0 16px 0 rgba(0, 0, 0, 0.32)}:host([appearance=clear][color=dark]) button:active .calcite-button--icon,:host([appearance=clear][color=dark]) button:focus .calcite-button--icon,:host([appearance=clear][color=dark]) a:active .calcite-button--icon,:host([appearance=clear][color=dark]) a:focus .calcite-button--icon{fill:#151515}:host([appearance=clear][color=dark]) button .calcite-button--icon,:host([appearance=clear][color=dark]) a .calcite-button--icon{fill:#151515}:host([appearance=clear][color=dark]) button calcite-loader,:host([appearance=clear][color=dark]) a calcite-loader{color:#151515}:host([appearance=transparent][color=blue]) button,:host([appearance=transparent][color=blue]) a{color:var(--calcite-ui-blue-3);background-color:transparent}:host([appearance=transparent][color=blue]) button:hover,:host([appearance=transparent][color=blue]) button:focus,:host([appearance=transparent][color=blue]) a:hover,:host([appearance=transparent][color=blue]) a:focus{background-color:var(--calcite-button-transparent-hover)}:host([appearance=transparent][color=blue]) button:active,:host([appearance=transparent][color=blue]) a:active{background-color:var(--calcite-button-transparent-press)}:host([appearance=transparent][color=red]) button,:host([appearance=transparent][color=red]) a{color:var(--calcite-ui-red-3);background-color:transparent}:host([appearance=transparent][color=red]) button:hover,:host([appearance=transparent][color=red]) button:focus,:host([appearance=transparent][color=red]) a:hover,:host([appearance=transparent][color=red]) a:focus{background-color:var(--calcite-button-transparent-hover)}:host([appearance=transparent][color=red]) button:active,:host([appearance=transparent][color=red]) a:active{background-color:var(--calcite-button-transparent-press)}:host([appearance=transparent][color=light]) button,:host([appearance=transparent][color=light]) a{color:var(--calcite-ui-foreground-1);background-color:transparent}:host([appearance=transparent][color=light]) button:hover,:host([appearance=transparent][color=light]) button:focus,:host([appearance=transparent][color=light]) a:hover,:host([appearance=transparent][color=light]) a:focus{background-color:var(--calcite-button-transparent-hover)}:host([appearance=transparent][color=light]) button:active,:host([appearance=transparent][color=light]) a:active{background-color:var(--calcite-button-transparent-press)}:host([appearance=transparent][color=dark]) button,:host([appearance=transparent][color=dark]) a{color:var(--calcite-ui-text-1);background-color:transparent}:host([appearance=transparent][color=dark]) button:hover,:host([appearance=transparent][color=dark]) button:focus,:host([appearance=transparent][color=dark]) a:hover,:host([appearance=transparent][color=dark]) a:focus{background-color:var(--calcite-button-transparent-hover)}:host([appearance=transparent][color=dark]) button:active,:host([appearance=transparent][color=dark]) a:active{background-color:var(--calcite-button-transparent-press)}:host([scale=s][hastext]:not([appearance=transparent])) button,:host([scale=s][hastext]:not([appearance=transparent])) a{padding:7px 12px;font-size:12px;line-height:16px}:host([scale=s][hastext][appearance=transparent]) button,:host([scale=s][hastext][appearance=transparent]) a{padding:8px 12px;font-size:12px;line-height:16px}:host([scale=m][hastext]:not([appearance=transparent])) button,:host([scale=m][hastext]:not([appearance=transparent])) a{padding:13px 20px;font-size:16px;line-height:16px}:host([scale=m][hastext][appearance=transparent]) button,:host([scale=m][hastext][appearance=transparent]) a{padding:14px 20px;font-size:16px;line-height:16px}:host([scale=l][hastext]:not([appearance=transparent])) button,:host([scale=l][hastext]:not([appearance=transparent])) a{padding:15px 24px;font-size:20px;line-height:24px}:host([scale=l][hastext][appearance=transparent]) button,:host([scale=l][hastext][appearance=transparent]) a{padding:16px 24px;font-size:20px;line-height:24px}:host([scale=s]:not([hastext])) button,:host([scale=s]:not([hastext])) a{height:32px;width:32px;font-size:12px}:host([scale=m]:not([hastext])) button,:host([scale=m]:not([hastext])) a{height:44px;width:44px;font-size:16px}:host([scale=l]:not([hastext])) button,:host([scale=l]:not([hastext])) a{height:56px;width:56px;font-size:20px}:host([scale=s][icon-start][icon-end]:not([hastext])) button,:host([scale=s][icon-start][icon-end]:not([hastext])) a{height:32px;width:48px;font-size:12px}:host([scale=m][icon-start][icon-end]:not([hastext])) button,:host([scale=m][icon-start][icon-end]:not([hastext])) a{height:44px;width:66px;font-size:16px}:host([scale=l][icon-start][icon-end]:not([hastext])) button,:host([scale=l][icon-start][icon-end]:not([hastext])) a{height:56px;width:84px;font-size:20px}";

const CalciteButton = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** specify the color of the button, defaults to blue */
        this.color = "blue";
        /** specify the appearance style of the button, defaults to solid. */
        this.appearance = "solid";
        /** specify the scale of the button, defaults to m */
        this.scale = "m";
        /** specify the width of the button, defaults to auto */
        this.width = "auto";
        /** optionally add a calcite-loader component to the button, disabling interaction.  */
        this.loading = false;
        /** optionally add a round style to the button  */
        this.round = false;
        /** optionally add a floating style to the button - this should be positioned fixed or sticky */
        this.floating = false;
        /** the node type of the rendered child element */
        this.childElType = "button";
        /** determine if there is slotted text for styling purposes */
        this.hasText = false;
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        // act on a requested or nearby form based on type
        this.handleClick = (e) => {
            // this.type refers to type attribute, not child element type
            if (this.childElType === "button" && this.type !== "button") {
                const requestedForm = this.el.getAttribute("form");
                const targetForm = requestedForm
                    ? document.getElementsByName(`${requestedForm}`)[0]
                    : this.el.closest("form");
                if (targetForm) {
                    const targetFormSubmitFunction = targetForm.onsubmit;
                    switch (this.type) {
                        case "submit":
                            if (targetFormSubmitFunction)
                                targetFormSubmitFunction();
                            else if (targetForm.checkValidity())
                                targetForm.submit();
                            else
                                targetForm.reportValidity();
                            break;
                        case "reset":
                            targetForm.reset();
                            break;
                    }
                }
                e.preventDefault();
            }
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let appearance = ["solid", "outline", "clear", "transparent"];
        if (!appearance.includes(this.appearance))
            this.appearance = "solid";
        let color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let width = ["auto", "half", "full"];
        if (!width.includes(this.width))
            this.width = "auto";
        this.childElType = this.href ? "a" : "button";
        this.setupTextContentObserver();
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillLoad() {
        if (Build.isBrowser) {
            this.updateHasText();
            const elType = this.el.getAttribute("type");
            this.type = this.childElType === "button" && elType ? elType : "submit";
        }
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const Tag = this.childElType;
        const loader = (h("div", { class: "calcite-button--loader" }, h("calcite-loader", { active: true, inline: true })));
        const iconScale = this.scale === "l" ? "m" : "s";
        const iconStartEl = (h("calcite-icon", { class: "calcite-button--icon icon-start", icon: this.iconStart, scale: iconScale }));
        const iconEndEl = (h("calcite-icon", { class: "calcite-button--icon icon-end", icon: this.iconEnd, scale: iconScale }));
        return (h(Host, { hasText: this.hasText, dir: dir }, h(Tag, Object.assign({}, attributes, { onClick: (e) => this.handleClick(e), disabled: this.disabled, tabIndex: this.disabled ? -1 : null, ref: (el) => (this.childEl = el) }), this.loading ? loader : null, this.iconStart ? iconStartEl : null, h("slot", null), this.iconEnd ? iconEndEl : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    async setFocus() {
        this.childEl.focus();
    }
    updateHasText() {
        this.hasText = this.el.textContent.trim().length > 0;
    }
    setupTextContentObserver() {
        if (Build.isBrowser) {
            this.observer = new MutationObserver(() => {
                this.updateHasText();
            });
            this.observer.observe(this.el, { childList: true, subtree: true });
        }
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = [
            "appearance",
            "color",
            "dir",
            "hasText",
            "icon-start",
            "icon-end",
            "id",
            "loading",
            "scale",
            "slot",
            "width",
            "theme",
        ];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    get el() { return this; }
    static get style() { return calciteButtonCss; }
};

const CSS = {
    container: "container",
    header: "header",
    footer: "footer",
    title: "title",
    subtitle: "subtitle",
    thumbnailWrapper: "thumbnail-wrapper",
    checkboxWrapper: "checkbox-wrapper"
};

const calciteCardCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{max-width:100%}:host .calcite-card-container{display:-ms-flexbox;display:flex;height:100%;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;background-color:var(--calcite-ui-foreground-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;position:relative;border:1px solid var(--calcite-ui-border-2);color:var(--calcite-ui-text-3);-webkit-box-shadow:0 0 0 rgba(0, 0, 0, 0);box-shadow:0 0 0 rgba(0, 0, 0, 0)}:host .calcite-card-container:hover{-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.08);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.08);z-index:1}:host .calcite-card-container:active{-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);z-index:1}:host([loading]) .calcite-card-container *:not(calcite-loader):not(.calcite-card-loader-container){opacity:0;pointer-events:none}:host([loading]) .calcite-card-loader-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:absolute;left:0;right:0;top:0;bottom:0}:host .header,:host .footer{padding:0.75rem;display:-ms-flexbox;display:flex}:host .header{-ms-flex-direction:column;flex-direction:column}:host .footer{padding:0.75rem;-ms-flex-direction:row;flex-direction:row;-ms-flex-line-pack:justify;align-content:space-between;-ms-flex-pack:justify;justify-content:space-between}:host .card-content{padding:0 0.75rem;color:var(--calcite-ui-text-3);font-size:0.875rem;line-height:1.5}:host([selectable]) .calcite-card-container:active{-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16)}:host([selected]) .calcite-card-container{border-color:var(--calcite-ui-blue-1)}slot[name=title]::slotted(*),*::slotted([slot=title]){font-weight:500;color:var(--calcite-ui-text-1);margin:0;font-size:0.9375rem;line-height:1.5}slot[name=subtitle]::slotted(*),*::slotted([slot=subtitle]){font-weight:400;color:var(--calcite-ui-text-2);margin:0;margin-top:0.375rem;font-size:0.875rem;line-height:1.5}slot[name=thumbnail]::slotted(img),img::slotted([slot=thumbnail]){max-width:100%;min-width:100%}slot[name=footer-leading]::slotted(*),*::slotted([slot=footer-leading]){-webkit-margin-end:auto;margin-inline-end:auto;-ms-flex-item-align:center;align-self:center;font-size:0.875rem;line-height:1.5}slot[name=footer-trailing]::slotted(*),*::slotted([slot=footer-trailing]){-ms-flex-item-align:center;align-self:center;font-size:0.875rem;line-height:1.5}:host .thumbnail-wrapper{font-size:0}:host .checkbox-wrapper{position:absolute;top:0.375rem;right:0.375rem;margin:0;padding:0}:host([dir=rtl]) .checkbox-wrapper{left:0.375rem;right:auto}";

const CalciteCard = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteCardSelect = createEvent(this, "calciteCardSelect", 7);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /**  When true, the cards content is waiting to be loaded. This state shows a busy indicator.*/
        this.loading = false;
        /** Indicates whether the card is selected. */
        this.selected = false;
        /** Indicates whether the card is selectable. */
        this.selectable = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("div", { class: "calcite-card-container" }, this.loading ? (h("div", { class: "calcite-card-loader-container" }, h("calcite-loader", { active: true }))) : null, h("section", { class: { [CSS.container]: true }, "aria-busy": this.loading }, this.selectable ? this.renderCheckbox() : null, this.renderThumbnail(), this.renderHeader(), h("div", { class: "card-content" }, h("slot", null)), this.renderFooter()))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    cardSelectClick() {
        this.selectCard();
    }
    cardSelectKeyDown(e) {
        switch (getKey(e.key)) {
            case " ":
            case "Enter":
                this.selectCard();
                e.preventDefault();
                break;
        }
    }
    selectCard() {
        this.selected = !this.selected;
        this.calciteCardSelect.emit();
    }
    renderThumbnail() {
        const hasThumbnail = this.el.querySelector(`[slot=${"thumbnail" /* thumbnail */}]`);
        return hasThumbnail ? (h("div", { class: CSS.thumbnailWrapper }, h("slot", { name: "thumbnail" /* thumbnail */ }))) : null;
    }
    renderCheckbox() {
        return (h("div", { class: CSS.checkboxWrapper, onClick: () => this.cardSelectClick(), onKeyDown: (e) => this.cardSelectKeyDown(e) }, h("calcite-checkbox", { theme: this.theme, checked: this.selected })));
    }
    renderHeader() {
        const title = this.el.querySelector(`[slot=${"title" /* title */}]`);
        const subtitle = this.el.querySelector(`[slot=${"subtitle" /* subtitle */}]`);
        const hasHeader = title || subtitle;
        return hasHeader ? (h("header", { class: CSS.header }, h("slot", { name: "title" /* title */ }), h("slot", { name: "subtitle" /* subtitle */ }))) : null;
    }
    renderFooter() {
        const leadingFooter = this.el.querySelector(`[slot=${"footer-leading" /* footerLeading */}]`);
        const trailingFooter = this.el.querySelector(`[slot=${"footer-trailing" /* footerTrailing */}]`);
        const hasFooter = leadingFooter || trailingFooter;
        return hasFooter ? (h("footer", { class: CSS.footer }, h("slot", { name: "footer-leading" /* footerLeading */ }), h("slot", { name: "footer-trailing" /* footerTrailing */ }))) : null;
    }
    get el() { return this; }
    static get style() { return calciteCardCss; }
};

const calciteCheckboxCss = ":host([hidden]){display:none}:host([scale=s]){--calcite-checkbox-size:12px}:host([scale=m]){--calcite-checkbox-size:16px}:host([scale=l]){--calcite-checkbox-size:20px}::slotted(input){display:none}:host{display:-ms-inline-flexbox;display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;width:var(--calcite-checkbox-size);height:var(--calcite-checkbox-size)}:host .check-svg{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) .check-svg{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host .check-svg{width:var(--calcite-checkbox-size);height:var(--calcite-checkbox-size);overflow:hidden;display:inline-block;background-color:var(--calcite-ui-background);border:1px solid var(--calcite-ui-border-1);fill:var(--calcite-ui-background);pointer-events:none;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;-webkit-box-sizing:border-box;box-sizing:border-box}:host([disabled]){pointer-events:none;cursor:default}:host([disabled]) .check-svg{background-color:var(--calcite-ui-foreground-2)}:host([disabled][checked]) .check-svg,:host([disabled][indeterminate]) .check-svg{background-color:#84c1e8;border-color:#84c1e8}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-ui-blue-1);border-color:var(--calcite-ui-blue-1)}:host(:hover),:host(:focus){outline:none}:host(:hover) .check-svg,:host(:focus) .check-svg{border-color:var(--calcite-ui-blue-1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1)}";

const CalciteCheckbox = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteCheckboxChange = createEvent(this, "calciteCheckboxChange", 7);
        /** True if the checkbox is initially checked */
        this.checked = false;
        /**
         * True if the checkbox is initially indeterminate,
         * which is independent from its checked state
         * https://css-tricks.com/indeterminate-checkboxes/
         * */
        this.indeterminate = false;
        /** The name of the checkbox input */
        this.name = "";
        /** The value of the checkbox input */
        this.value = "";
        /** specify the scale of the checkbox, defaults to m */
        this.scale = "m";
        /** True if the checkbox is disabled */
        this.disabled = false;
        this.toggle = () => {
            if (!this.disabled) {
                this.checked = !this.checked;
                this.indeterminate = false;
            }
        };
        this.indeterminatePath = "M4 7h8v2H4z";
        this.checkedPath = "M12.753 3l-7.319 7.497L3.252 8.31 2 9.373l3.434 3.434L14 4.24z";
        this.getPath = () => this.indeterminate
            ? this.indeterminatePath
            : this.checked
                ? this.checkedPath
                : "";
        this.syncThisToProxyInput = () => {
            this.checked = this.inputProxy.hasAttribute("checked");
            this.name = this.inputProxy.name;
            this.value = this.inputProxy.value;
        };
        this.syncProxyInputToThis = () => {
            this.checked
                ? this.inputProxy.setAttribute("checked", "")
                : this.inputProxy.removeAttribute("checked");
            this.inputProxy.name = this.name;
            this.inputProxy.value = this.value;
        };
    }
    handleLabelFocus(e) {
        if (!this.el.contains(e.detail.interactedEl) &&
            hasLabel(e.detail.labelEl, this.el)) {
            this.toggle();
            this.el.focus();
        }
    }
    onClick({ target }) {
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && target === this.inputProxy) ||
            (!this.el.closest("label") && target === this.el)) {
            this.toggle();
        }
    }
    keyDownHandler(e) {
        const key = getKey(e.key);
        if (key === " " || key === "Enter") {
            e.preventDefault();
            this.toggle();
        }
    }
    checkedWatcher() {
        this.calciteCheckboxChange.emit();
        this.checked
            ? this.inputProxy.setAttribute("checked", "")
            : this.inputProxy.removeAttribute("checked");
    }
    connectedCallback() {
        this.setupProxyInput();
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillRender() {
        this.syncProxyInputToThis();
    }
    render() {
        return (h(Host, { role: "checkbox", "aria-checked": this.checked.toString(), tabindex: this.disabled ? "-1" : "0" }, h("svg", { class: "check-svg", viewBox: "0 0 16 16" }, h("path", { d: this.getPath() })), h("slot", null)));
    }
    setupProxyInput() {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            this.inputProxy.type = "checkbox";
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
        if (Build.isBrowser) {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    }
    get el() { return this; }
    static get watchers() { return {
        "checked": ["checkedWatcher"]
    }; }
    static get style() { return calciteCheckboxCss; }
};

const CSS$1 = {
    close: "close"
};
const TEXT$1 = {
    close: "close"
};

const calciteChipCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{--calcite-chip-transparent-hover:rgba(0, 0, 0, 0.05);--calcite-chip-transparent-press:rgba(0, 0, 0, 0.08)}:host([theme=dark]){--calcite-chip-transparent-hover:rgba(255, 255, 255, 0.05);--calcite-chip-transparent-press:rgba(255, 255, 255, 0.08)}:host([scale=s]){font-size:10px;height:22px;--calcite-chip-spacing-unit-l:8px;--calcite-chip-spacing-unit-s:4px}:host([scale=s]) slot[name=chip-image]::slotted(*){max-height:16px}:host([scale=m]){font-size:12px;height:28px;--calcite-chip-spacing-unit-l:12px;--calcite-chip-spacing-unit-s:6px}:host([scale=m]) slot[name=chip-image]::slotted(*){max-height:22px}:host([scale=l]){font-size:14px;height:40px;--calcite-chip-spacing-unit-l:16px;--calcite-chip-spacing-unit-s:8px}:host([scale=l]) slot[name=chip-image]::slotted(*){max-height:30px}:host{--calcite-chip-button-border-radius:0 50px 50px 0;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;background-color:var(--calcite-ui-foreground-2);border-radius:50px;border:1px solid var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);font-weight:500;cursor:default}:host button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([dir=rtl]){--calcite-chip-button-border-radius:50px 0 0 50px;text-align:right}:host span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l)}:host([dismissible]) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l)}:host([dir=rtl][dismissible]) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s)}:host([icon]:not([dismissible])) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s)}:host([dir=rtl][icon]:not([dismissible])) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l)}:host button{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-item-align:stretch;align-self:stretch;-webkit-appearance:none;background-color:transparent;margin:0;padding:0;border-radius:var(--calcite-chip-button-border-radius);border:none;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;padding:var(--calcite-chip-spacing-unit-s);cursor:pointer;color:var(--calcite-ui-text-1)}:host button:hover,:host button:focus{background-color:var(--calcite-ui-foreground-2);border-color:var(--calcite-ui-foreground-2)}:host button:active{background-color:var(--calcite-ui-foreground-3)}:host slot[name=chip-image]{display:-ms-inline-flexbox;display:inline-flex}:host slot[name=chip-image]::slotted(*){border-radius:50%;height:100%;padding:calc(var(--calcite-chip-spacing-unit-l) / 3)}.calcite-chip--icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0 0 0 var(--calcite-chip-spacing-unit-l);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;border-radius:var(--calcite-chip-button-border-radius)}:host([dir=rtl]) .calcite-chip--icon{margin:0 var(--calcite-chip-spacing-unit-l) 0 0}:host([color=blue][appearance=solid]),:host([color=blue][appearance=solid]) button{border-color:var(--calcite-ui-blue-1);background-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-foreground-1)}:host([color=blue][appearance=solid]):hover,:host([color=blue][appearance=solid]):focus,:host([color=blue][appearance=solid]) button:hover,:host([color=blue][appearance=solid]) button:focus{background-color:var(--calcite-ui-blue-2)}:host([color=blue][appearance=solid]):active,:host([color=blue][appearance=solid]) button:active{background-color:var(--calcite-ui-blue-3)}:host([theme=dark][color=blue][appearance=solid]:not([color=grey])),:host([theme=dark][color=blue][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=blue][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-blue-3);background-color:transparent}:host([color=blue][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-blue-3)}:host([color=blue][appearance=clear]) button:hover,:host([color=blue][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=blue][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=red][appearance=solid]),:host([color=red][appearance=solid]) button{border-color:var(--calcite-ui-red-1);background-color:var(--calcite-ui-red-1);color:var(--calcite-ui-foreground-1)}:host([color=red][appearance=solid]):hover,:host([color=red][appearance=solid]):focus,:host([color=red][appearance=solid]) button:hover,:host([color=red][appearance=solid]) button:focus{background-color:var(--calcite-ui-red-2)}:host([color=red][appearance=solid]):active,:host([color=red][appearance=solid]) button:active{background-color:var(--calcite-ui-red-3)}:host([theme=dark][color=red][appearance=solid]:not([color=grey])),:host([theme=dark][color=red][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=red][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-red-3);background-color:transparent}:host([color=red][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-red-3)}:host([color=red][appearance=clear]) button:hover,:host([color=red][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=red][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=yellow][appearance=solid]),:host([color=yellow][appearance=solid]) button{border-color:var(--calcite-ui-yellow-1);background-color:var(--calcite-ui-yellow-1);color:var(--calcite-ui-text-1)}:host([color=yellow][appearance=solid]):hover,:host([color=yellow][appearance=solid]):focus,:host([color=yellow][appearance=solid]) button:hover,:host([color=yellow][appearance=solid]) button:focus{background-color:var(--calcite-ui-yellow-2)}:host([color=yellow][appearance=solid]):active,:host([color=yellow][appearance=solid]) button:active{background-color:var(--calcite-ui-yellow-3)}:host([theme=dark][color=yellow][appearance=solid]:not([color=grey])),:host([theme=dark][color=yellow][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=yellow][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-yellow-3);background-color:transparent}:host([color=yellow][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-yellow-3)}:host([color=yellow][appearance=clear]) button:hover,:host([color=yellow][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=yellow][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=green][appearance=solid]),:host([color=green][appearance=solid]) button{border-color:var(--calcite-ui-green-1);background-color:var(--calcite-ui-green-1);color:var(--calcite-ui-text-1)}:host([color=green][appearance=solid]):hover,:host([color=green][appearance=solid]):focus,:host([color=green][appearance=solid]) button:hover,:host([color=green][appearance=solid]) button:focus{background-color:var(--calcite-ui-green-2)}:host([color=green][appearance=solid]):active,:host([color=green][appearance=solid]) button:active{background-color:var(--calcite-ui-green-3)}:host([theme=dark][color=green][appearance=solid]:not([color=grey])),:host([theme=dark][color=green][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=green][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-green-3);background-color:transparent}:host([color=green][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-green-3)}:host([color=green][appearance=clear]) button:hover,:host([color=green][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=green][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=grey][appearance=solid]),:host([color=grey][appearance=solid]) button{border-color:var(--calcite-ui-foreground-2);background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host([color=grey][appearance=solid]):hover,:host([color=grey][appearance=solid]):focus,:host([color=grey][appearance=solid]) button:hover,:host([color=grey][appearance=solid]) button:focus{background-color:var(--calcite-ui-foreground-3)}:host([color=grey][appearance=solid]):active,:host([color=grey][appearance=solid]) button:active{background-color:var(--calcite-ui-foreground-3)}:host([theme=dark][color=grey][appearance=solid]:not([color=grey])),:host([theme=dark][color=grey][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=grey][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-foreground-3);background-color:transparent}:host([color=grey][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-text-1)}:host([color=grey][appearance=clear]) button:hover,:host([color=grey][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=grey][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}";

const CalciteChip = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteChipDismiss = createEvent(this, "calciteChipDismiss", 7);
        /** specify the scale of the chip, defaults to m */
        this.scale = "m";
        /** specify the color of the button, defaults to blue */
        this.color = "grey";
        /** specify the appearance style of the button, defaults to solid. */
        this.appearance = "solid";
        /** Optionally show a button the user can click to dismiss the chip */
        this.dismissible = false;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.closeClickHandler = (event) => {
            event.preventDefault();
            this.calciteChipDismiss.emit(this.el);
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let appearance = ["solid", "clear"];
        if (!appearance.includes(this.appearance))
            this.appearance = "solid";
        let color = ["blue", "green", "grey", "yellow", "red"];
        if (!color.includes(this.color))
            this.color = "grey";
    }
    render() {
        const dir = getElementDir(this.el);
        const iconScale = this.scale !== "l" ? "s" : "m";
        const iconEl = (h("calcite-icon", { class: "calcite-chip--icon", icon: this.icon, scale: iconScale }));
        const closeButton = (h("button", { onClick: this.closeClickHandler, class: CSS$1.close, title: TEXT$1.close }, h("calcite-icon", { scale: iconScale, icon: "x" })));
        return (h(Host, { dir: dir }, h("slot", { name: "chip-image" }), this.icon ? iconEl : null, h("span", null, h("slot", null)), this.dismissible ? closeButton : null));
    }
    get el() { return this; }
    static get style() { return calciteChipCss; }
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
    return commonjsRequire();
  }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var colorName = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

var isArrayish = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};

var simpleSwizzle = createCommonjsModule(function (module) {



var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};
});

var colorString = createCommonjsModule(function (module) {
/* MIT license */



var reverseNames = {};

// create a list of reverse color names
for (var name in colorName) {
	if (colorName.hasOwnProperty(name)) {
		reverseNames[colorName[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorName[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = simpleSwizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = simpleSwizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = simpleSwizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = simpleSwizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = simpleSwizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}
});

var conversions = createCommonjsModule(function (module) {
/* MIT license */


// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in colorName) {
	if (colorName.hasOwnProperty(key)) {
		reverseKeywords[colorName[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in colorName) {
		if (colorName.hasOwnProperty(keyword)) {
			var value = colorName[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return colorName[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};
});

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

var route = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

var colorConvert = convert;

var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(colorConvert).forEach(function (model) {
	hashedModelKeys[_slice.call(colorConvert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in colorConvert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (obj == null) { // eslint-disable-line no-eq-null,eqeqeq
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = colorConvert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = colorConvert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = colorConvert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = colorConvert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = colorConvert[this.model].channels;
		var labels = colorConvert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorConvert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	isDark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function () {
		return !this.isDark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		if (!mixinColor || !mixinColor.rgb) {
			throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
		}
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(colorConvert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = colorConvert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(colorConvert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

var color = Color;

const CSS$2 = {
    container: "container",
    controlSection: "control-section",
    hexOptions: "color-hex-options",
    section: "section",
    header: "header",
    control: "control",
    splitSection: "section--split",
    underlinedHeader: "header--underlined",
    colorModeContainer: "color-mode-container",
    colorMode: "color-mode",
    channels: "channels",
    channel: "channel",
    savedColors: "saved-colors",
    savedColorsSection: "saved-colors-section",
    saveColor: "save-color",
    deleteColor: "delete-color",
    savedColorsButtons: "saved-colors-buttons",
    headerHex: "header--hex",
    colorFieldAndSlider: "color-field-and-slider",
    colorFieldAndSliderInteractive: "color-field-and-slider--interactive",
    savedColor: "saved-color"
};
const DEFAULT_COLOR = color("#007AC2");
const DEFAULT_STORAGE_KEY_PREFIX = "calcite-color-";
const RGB_LIMITS = {
    r: 255,
    g: 255,
    b: 255
};
const HSV_LIMITS = {
    h: 360,
    s: 100,
    v: 100
};
const TEXT$2 = {
    b: "B",
    blue: "Blue",
    deleteColor: "Delete color",
    g: "G",
    green: "Green",
    h: "H",
    hsv: "HSV",
    hex: "Hex",
    hue: "Hue",
    r: "R",
    red: "Red",
    rgb: "RGB",
    s: "S",
    saturation: "Saturation",
    saveColor: "Save color",
    saved: "Saved",
    v: "V",
    value: "Value"
};
const DIMENSIONS = {
    s: {
        slider: {
            height: 10,
            width: 156
        },
        colorField: {
            height: 80,
            width: 156
        },
        thumb: {
            radius: 8
        }
    },
    m: {
        slider: {
            height: 14,
            width: 272
        },
        colorField: {
            height: 150,
            width: 272
        },
        thumb: {
            radius: 10
        }
    },
    l: {
        slider: {
            height: 16,
            width: 420
        },
        colorField: {
            height: 200,
            width: 420
        },
        thumb: {
            radius: 12
        }
    }
};

function rgbToHex(color) {
    const { r, g, b } = color;
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
        .toString(16)
        .padStart(2, "0")}`.toLowerCase();
}
const hexChar = /^[0-9A-F]{1}$/i;
const shortHandHex = /^#[0-9A-F]{3}$/i;
const longhandHex = /^#[0-9A-F]{6}$/i;
function isValidHex(hex) {
    return isShorthandHex(hex) || isLonghandHex(hex);
}
function isShorthandHex(hex) {
    return hex && hex.length === 4 && shortHandHex.test(hex);
}
function isLonghandHex(hex) {
    return hex && hex.length === 7 && longhandHex.test(hex);
}
function normalizeHex(hex) {
    hex = hex.toLowerCase();
    if (!hex.startsWith("#")) {
        hex = `#${hex}`;
    }
    if (isShorthandHex(hex)) {
        return rgbToHex(hexToRGB(hex));
    }
    return hex;
}
function hexToRGB(hex) {
    if (!isValidHex(hex)) {
        return null;
    }
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        const [first, second, third] = hex.split("");
        const r = parseInt(`${first}${first}`, 16);
        const g = parseInt(`${second}${second}`, 16);
        const b = parseInt(`${third}${third}`, 16);
        return { r, g, b };
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
}
var CSSColorMode;
(function (CSSColorMode) {
    CSSColorMode["HEX"] = "hex";
    CSSColorMode["HEXA"] = "hexa";
    CSSColorMode["RGB_CSS"] = "rgb-css";
    CSSColorMode["RGBA_CSS"] = "rgba-css";
    CSSColorMode["HSL_CSS"] = "hsl-css";
    CSSColorMode["HSLA_CSS"] = "hsla-css";
})(CSSColorMode || (CSSColorMode = {}));
var ObjectColorMode;
(function (ObjectColorMode) {
    ObjectColorMode["RGB"] = "rgb";
    ObjectColorMode["RGBA"] = "rgba";
    ObjectColorMode["HSL"] = "hsl";
    ObjectColorMode["HSLA"] = "hsla";
    ObjectColorMode["HSV"] = "hsv";
    ObjectColorMode["HSVA"] = "hsva";
})(ObjectColorMode || (ObjectColorMode = {}));
function parseMode(colorValue) {
    if (typeof colorValue === "string") {
        if (colorValue.startsWith("#")) {
            const { length } = colorValue;
            if (length === 4 || length === 7) {
                return CSSColorMode.HEX;
            }
            if (length === 5 || length === 9) {
                return CSSColorMode.HEXA;
            }
        }
        if (colorValue.startsWith("rgba(")) {
            return CSSColorMode.RGBA_CSS;
        }
        if (colorValue.startsWith("rgb(")) {
            return CSSColorMode.RGB_CSS;
        }
        if (colorValue.startsWith("hsl(")) {
            return CSSColorMode.HSL_CSS;
        }
        if (colorValue.startsWith("hsla(")) {
            return CSSColorMode.HSLA_CSS;
        }
    }
    if (typeof colorValue === "object") {
        if (hasChannels(colorValue, "r", "g", "b")) {
            return hasChannels(colorValue, "a") ? ObjectColorMode.RGBA : ObjectColorMode.RGB;
        }
        if (hasChannels(colorValue, "h", "s", "l")) {
            return hasChannels(colorValue, "a") ? ObjectColorMode.HSLA : ObjectColorMode.HSL;
        }
        if (hasChannels(colorValue, "h", "s", "v")) {
            return hasChannels(colorValue, "a") ? ObjectColorMode.HSVA : ObjectColorMode.HSV;
        }
    }
    return null;
}
function hasChannels(colorObject, ...channels) {
    return channels.every((channel) => `${channel}` in colorObject);
}
function colorEqual(value1, value2) {
    return value1.rgbNumber() === value2.rgbNumber();
}

const calciteColorCss = ":host([hidden]){display:none}:host([scale=s]) .container{width:156px}:host([scale=s]) .saved-colors{grid-template-columns:repeat(auto-fill, minmax(20px, 1fr))}:host([scale=s]) .channels{-ms-flex-direction:column;flex-direction:column}:host([scale=s]) .channel{width:100%;margin-bottom:4px}:host([scale=s]) .channel:last-child{margin-bottom:0}:host([scale=m]) .container{width:272px}:host([scale=l]) .container{width:420px}:host([scale=l]) .color-field-and-slider{margin-bottom:-20px}:host([scale=l]) .section{padding:0 16px}:host([scale=l]) .saved-colors-section{padding-top:16px;padding-bottom:16px}:host([scale=l]) .saved-colors{grid-template-columns:repeat(auto-fill, minmax(28px, 1fr));grid-gap:12px;padding-top:16px}:host([scale=l]) .control-section{-ms-flex-wrap:nowrap;flex-wrap:nowrap}:host([scale=l]) .color-hex-options{-ms-flex-preferred-size:33%;flex-basis:33%}:host([scale=l]) .color-mode-container{-ms-flex-preferred-size:63%;flex-basis:63%}:host([scale=l]) .color-hex-options,:host([scale=l]) .color-mode-container{-ms-flex-positive:0;flex-grow:0}:host([appearance=minimal]) .container{border:none}.container{display:inline-block;border:1px solid var(--calcite-ui-border-1);background-color:var(--calcite-ui-foreground-1)}.color-field-and-slider{margin-bottom:-16px}.color-field-and-slider--interactive{cursor:pointer}.control-section{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap}.section{padding:0 12px}.saved-colors-section{padding-top:12px;padding-bottom:12px}.control-section{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.color-hex-options,.section--split{-ms-flex-positive:1;flex-grow:1}.header{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-ui-text-3);font-weight:500;font-size:0.875rem;line-height:1.5}.header.header--underlined{border-bottom:1px solid var(--calcite-ui-border-1)}.header--hex{line-height:1.5;font-size:0.875rem;line-height:1.5;padding:12px 0 15px}.control{margin-top:8px}.channels{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.channel{width:31%}.saved-colors{padding-top:12px;display:-ms-grid;display:grid;grid-template-columns:repeat(auto-fill, minmax(24px, 1fr));grid-gap:8px;width:100%}.saved-colors-buttons{display:-ms-flexbox;display:flex}.saved-color{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;cursor:pointer}.saved-color:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}.saved-color:hover{-webkit-transition:outline-color 100ms ease-in-out;transition:outline-color 100ms ease-in-out;outline:2px solid var(--calcite-ui-border-2);outline-offset:2px}.delete-color{margin:0 8px}";

const CalciteColor = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteColorChange = createEvent(this, "calciteColorChange", 7);
        //--------------------------------------------------------------------------
        //
        //  Public properties
        //
        //--------------------------------------------------------------------------
        /** specify the appearance - default (containing border), or minimal (no containing border) */
        this.appearance = "default";
        /**
         * Internal prop for advanced use-cases.
         *
         * @internal
         */
        this.color = DEFAULT_COLOR;
        /** Label used for the blue channel */
        this.intlB = TEXT$2.b;
        /** Label used for the blue channel description */
        this.intlBlue = TEXT$2.blue;
        /** Label used for the delete color button. */
        this.intlDeleteColor = TEXT$2.deleteColor;
        /** Label used for the green channel */
        this.intlG = TEXT$2.g;
        /** Label used for the green channel description */
        this.intlGreen = TEXT$2.green;
        /** Label used for the hue channel */
        this.intlH = TEXT$2.h;
        /** Label used for the HSV mode */
        this.intlHsv = TEXT$2.hsv;
        /** Label used for the hex input */
        this.intlHex = TEXT$2.hex;
        /** Label used for the hue channel description */
        this.intlHue = TEXT$2.hue;
        /** Label used for the red channel */
        this.intlR = TEXT$2.r;
        /** Label used for the red channel description */
        this.intlRed = TEXT$2.red;
        /** Label used for the RGB mode */
        this.intlRgb = TEXT$2.rgb;
        /** Label used for the saturation channel */
        this.intlS = TEXT$2.s;
        /** Label used for the saturation channel description */
        this.intlSaturation = TEXT$2.saturation;
        /** Label used for the save color button. */
        this.intlSaveColor = TEXT$2.saveColor;
        /** Label used for the saved colors section */
        this.intlSaved = TEXT$2.saved;
        /** Label used for the value channel */
        this.intlV = TEXT$2.v;
        /** Label used for the  */
        this.intlValue = TEXT$2.value;
        /**
         * The scale of the color picker.
         */
        this.scale = "m";
        /**
         * The component's theme.
         */
        this.theme = "light";
        /**
         * The color value.
         *
         * This value can be either a {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color|CSS string}
         * a RGB, HSL or HSV object.
         *
         * The type will be preserved as the color is updated.
         */
        this.value = normalizeHex(DEFAULT_COLOR.hex());
        this.hueThumbState = "idle";
        this.mode = CSSColorMode.HEX;
        this.sliderThumbState = "idle";
        this.colorFieldAndSliderInteractive = false;
        this.channelMode = "rgb";
        this.channels = this.toChannels(DEFAULT_COLOR);
        this.dimensions = DIMENSIONS.m;
        this.savedColors = [];
        this.handleTabActivate = (event) => {
            this.channelMode = event.currentTarget.getAttribute("data-color-mode");
            this.updateChannelsFromColor(this.color);
        };
        this.handleHexInputChange = (event) => {
            event.stopPropagation();
            const { color: color$1 } = this;
            const input = event.target;
            const hex = input.value;
            if (hex !== normalizeHex(color$1.hex())) {
                this.color = color(hex);
            }
        };
        this.handleSavedColorSelect = (event) => {
            const swatch = event.currentTarget;
            this.color = color(swatch.color);
        };
        this.handleChannelInput = (event) => {
            const input = event.target;
            const channelIndex = Number(input.getAttribute("data-channel-index"));
            const limit = this.channelMode === "rgb"
                ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
                : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];
            const clamped = Math.max(0, Math.min(Number(input.value), limit));
            input.value = `${clamped}`;
        };
        this.handleChannelChange = (event) => {
            const input = event.target;
            const channelIndex = Number(input.getAttribute("data-channel-index"));
            const channels = [...this.channels];
            channels[channelIndex] = Number(input.value);
            this.updateColorFromChannels(channels);
        };
        this.handleSavedColorKeyDown = (event) => {
            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                this.handleSavedColorSelect(event);
            }
        };
        this.handleColorFieldAndSliderMouseLeave = () => {
            this.colorFieldAndSliderInteractive = false;
        };
        this.handleColorFieldAndSliderMouseEnterOrMove = ({ offsetY }) => {
            const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height: sliderHeight } } } = this;
            this.colorFieldAndSliderInteractive = offsetY <= colorFieldHeight + sliderHeight;
        };
        this.renderChannelsTabTitle = (channelMode) => {
            const { channelMode: activeChannelMode, intlRgb, intlHsv } = this;
            const active = channelMode === activeChannelMode;
            const label = channelMode === "rgb" ? intlRgb : intlHsv;
            return (h("calcite-tab-title", { active: active, class: CSS$2.colorMode, "data-color-mode": channelMode, onCalciteTabsActivate: this.handleTabActivate }, label));
        };
        this.renderChannelsTab = (channelMode) => {
            const { channelMode: activeChannelMode, channels, intlB, intlBlue, intlG, intlGreen, intlH, intlHue, intlR, intlRed, intlS, intlSaturation, intlV, intlValue } = this;
            const active = channelMode === activeChannelMode;
            const isRgb = channelMode === "rgb";
            const channelLabels = isRgb ? [intlR, intlG, intlB] : [intlH, intlS, intlV];
            const channelAriaLabels = isRgb
                ? [intlRed, intlGreen, intlBlue]
                : [intlHue, intlSaturation, intlValue];
            return (h("calcite-tab", { active: active, class: CSS$2.control }, h("div", { class: CSS$2.channels }, channels.map((channel, index) => this.renderChannel(channel, index, channelLabels[index], channelAriaLabels[index])))));
        };
        this.renderChannel = (value, index, label, ariaLabel) => (h("calcite-input", { "aria-label": ariaLabel, class: CSS$2.channel, "data-channel-index": index, numberButtonType: "none", onInput: this.handleChannelInput, onChange: this.handleChannelChange, prefixText: label, scale: "s", type: "number", value: value.toString() }));
        this.deleteColor = () => {
            const colorToDelete = this.color.hex();
            const inStorage = this.savedColors.indexOf(colorToDelete) > -1;
            if (!inStorage) {
                return;
            }
            const savedColors = this.savedColors.filter((color) => color !== colorToDelete);
            this.savedColors = savedColors;
            const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
            if (this.storageId) {
                localStorage.setItem(storageKey, JSON.stringify(savedColors));
            }
        };
        this.saveColor = () => {
            const colorToSave = this.color.hex();
            const alreadySaved = this.savedColors.indexOf(colorToSave) > -1;
            if (alreadySaved) {
                return;
            }
            const savedColors = [...this.savedColors, colorToSave];
            this.savedColors = savedColors;
            const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
            if (this.storageId) {
                localStorage.setItem(storageKey, JSON.stringify(savedColors));
            }
        };
        this.initColorFieldAndSlider = (canvas) => {
            this.fieldAndSliderRenderingContext = canvas.getContext("2d");
            this.setCanvasContextSize(canvas, {
                width: this.dimensions.colorField.width,
                height: this.dimensions.colorField.height +
                    this.dimensions.slider.height +
                    this.getSliderCapSpacing() * 2
            });
            this.drawColorFieldAndSlider();
            const yWithin = (y) => {
                const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height: sliderHeight } } } = this;
                if (y <= colorFieldHeight) {
                    return "color-field";
                }
                if (y <= colorFieldHeight + sliderHeight) {
                    return "slider";
                }
                return "none";
            };
            const captureColor = (x, y) => {
                const { dimensions: { colorField: { height, width } } } = this;
                const saturation = Math.round((HSV_LIMITS.s / width) * x);
                const value = Math.round((HSV_LIMITS.v / height) * (height - y));
                this.color = this.color.hsv().saturationv(saturation).value(value);
            };
            canvas.addEventListener("mousedown", ({ offsetX, offsetY }) => {
                const region = yWithin(offsetY);
                if (region === "color-field") {
                    this.hueThumbState = "drag";
                    captureColor(offsetX, offsetY);
                }
                else if (region === "slider") {
                    this.sliderThumbState = "drag";
                    captureSliderColor(offsetX);
                }
            });
            canvas.addEventListener("mouseout", () => {
                this.hueThumbState = "idle";
                this.sliderThumbState = "idle";
                this.drawColorFieldAndSlider();
            });
            canvas.addEventListener("mouseup", () => {
                this.hueThumbState = "hover";
                this.sliderThumbState = "hover";
                this.drawColorFieldAndSlider();
            });
            canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
                const region = yWithin(offsetY);
                if (region === "color-field") {
                    const prevHueThumbState = this.hueThumbState;
                    const color = this.color.hsv();
                    const { dimensions: { colorField: { height, width }, thumb: { radius } } } = this;
                    const centerX = Math.round(color.saturationv() / (HSV_LIMITS.s / width));
                    const centerY = Math.round(height - color.value() / (HSV_LIMITS.v / height));
                    const hoveringThumb = this.containsPoint(offsetX, offsetY, centerX, centerY, radius);
                    let transitionedBetweenHoverAndIdle = false;
                    if (prevHueThumbState === "idle" && hoveringThumb) {
                        this.hueThumbState = "hover";
                        transitionedBetweenHoverAndIdle = true;
                    }
                    else if (prevHueThumbState === "hover" && !hoveringThumb) {
                        this.hueThumbState = "idle";
                        transitionedBetweenHoverAndIdle = true;
                    }
                    if (this.hueThumbState !== "drag") {
                        if (transitionedBetweenHoverAndIdle) {
                            // refresh since we won't update color and thus no redraw
                            this.drawColorFieldAndSlider();
                        }
                        return;
                    }
                    captureColor(offsetX, offsetY);
                }
                else if (region === "slider") {
                    const { dimensions: { slider: { height: sliderHeight, width: sliderWidth }, thumb: { radius: thumbRadius } } } = this;
                    const prevSliderThumbState = this.sliderThumbState;
                    const sliderThumbColor = this.color.hsv().saturationv(100).value(100);
                    const sliderThumbCenterX = Math.round(sliderThumbColor.hue() / (360 / sliderWidth));
                    const sliderThumbCenterY = Math.round((sliderHeight + this.getSliderCapSpacing()) / 2);
                    const hoveringSliderThumb = this.containsPoint(offsetX, offsetY, sliderThumbCenterX, sliderThumbCenterY, thumbRadius);
                    let sliderThumbTransitionedBetweenHoverAndIdle = false;
                    if (prevSliderThumbState === "idle" && hoveringSliderThumb) {
                        this.sliderThumbState = "hover";
                        sliderThumbTransitionedBetweenHoverAndIdle = true;
                    }
                    else if (prevSliderThumbState === "hover" && !hoveringSliderThumb) {
                        this.sliderThumbState = "idle";
                        sliderThumbTransitionedBetweenHoverAndIdle = true;
                    }
                    if (this.sliderThumbState !== "drag") {
                        if (sliderThumbTransitionedBetweenHoverAndIdle) {
                            // refresh since we won't update color and thus no redraw
                            this.drawColorFieldAndSlider();
                        }
                        return;
                    }
                    captureSliderColor(offsetX);
                }
            });
            const captureSliderColor = (x) => {
                const { dimensions: { slider: { width } } } = this;
                const hue = (360 / width) * x;
                this.color = this.color.hue(hue);
            };
        };
    }
    handleColorChange(color) {
        this.drawColorFieldAndSlider();
        const value = this.toValue(color);
        this.updateChannelsFromColor(color);
        if (this.mode === "hex" && value === normalizeHex(color.hex()) && this.value === value) {
            return;
        }
        this.value = value;
    }
    handleScaleChange(scale = "m") {
        this.updateDimensions(scale);
    }
    handleValueChange(value, oldValue) {
        const nextMode = parseMode(value);
        if (!nextMode) {
            console.warn(`ignoring invalid color value: ${value}`);
            this.value = oldValue;
            return;
        }
        const modeChanged = this.mode !== nextMode;
        this.mode = nextMode;
        const color$1 = color(value);
        const colorChanged = !colorEqual(color$1, this.color);
        if (modeChanged || colorChanged) {
            if (nextMode === "hex" && color$1.hex() === this.color.hex()) {
                return;
            }
            this.color = color$1;
            this.calciteColorChange.emit();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        focusElement(this.hexInputNode);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
        if (this.storageId && localStorage.getItem(storageKey)) {
            this.savedColors = JSON.parse(localStorage.getItem(storageKey));
        }
        const valueAttr = this.el.getAttribute("value");
        if (valueAttr) {
            this.handleValueChange(valueAttr, this.value);
        }
        this.updateDimensions(this.scale);
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const { color, intlDeleteColor, el, intlHex, intlSaved, intlSaveColor, savedColors, scale, theme } = this;
        const selectedColorInHex = color.hex();
        const hexInputScale = scale !== "s" ? "m" : scale;
        const { colorFieldAndSliderInteractive } = this;
        const elementDir = getElementDir(el);
        return (h("div", { class: CSS$2.container }, h("canvas", { class: {
                [CSS$2.colorFieldAndSlider]: true,
                [CSS$2.colorFieldAndSliderInteractive]: colorFieldAndSliderInteractive
            }, onMouseEnter: this.handleColorFieldAndSliderMouseEnterOrMove, onMouseLeave: this.handleColorFieldAndSliderMouseLeave, onMouseMove: this.handleColorFieldAndSliderMouseEnterOrMove, ref: this.initColorFieldAndSlider }), h("div", { class: { [CSS$2.controlSection]: true, [CSS$2.section]: true } }, h("div", { class: CSS$2.hexOptions }, h("span", { class: {
                [CSS$2.header]: true,
                [CSS$2.headerHex]: true,
                [CSS$2.underlinedHeader]: true
            } }, intlHex), h("calcite-color-hex-input", { class: CSS$2.control, onCalciteColorHexInputChange: this.handleHexInputChange, ref: (node) => (this.hexInputNode = node), scale: hexInputScale, value: selectedColorInHex, theme: theme, dir: elementDir })), h("calcite-tabs", { class: {
                [CSS$2.colorModeContainer]: true,
                [CSS$2.splitSection]: true
            }, dir: elementDir }, h("calcite-tab-nav", { slot: "tab-nav" }, this.renderChannelsTabTitle("rgb"), this.renderChannelsTabTitle("hsv")), this.renderChannelsTab("rgb"), this.renderChannelsTab("hsv"))), h("div", { class: { [CSS$2.savedColorsSection]: true, [CSS$2.section]: true } }, h("div", { class: CSS$2.header }, h("label", null, intlSaved), h("div", { class: CSS$2.savedColorsButtons }, h("calcite-button", { appearance: "transparent", "aria-label": intlDeleteColor, class: CSS$2.deleteColor, color: "dark", iconStart: "minus", onClick: this.deleteColor, scale: scale }), h("calcite-button", { appearance: "transparent", "aria-label": intlSaveColor, class: CSS$2.saveColor, color: "dark", iconStart: "plus", onClick: this.saveColor, scale: scale }))), h("div", { class: CSS$2.savedColors }, [
            ...savedColors.map((color) => (h("calcite-color-swatch", { class: CSS$2.savedColor, color: color, active: selectedColorInHex === color, key: color, onClick: this.handleSavedColorSelect, onKeyDown: this.handleSavedColorKeyDown, scale: scale, tabIndex: 0, theme: theme })))
        ]))));
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    toValue(color) {
        const { mode } = this;
        const hexMode = "hex";
        if (mode.includes(hexMode)) {
            return normalizeHex(color[hexMode]());
        }
        if (mode.includes("-css")) {
            return color[mode.replace("-css", "").replace("a", "")]().string();
        }
        const colorObject = color[mode]().object();
        if (mode.endsWith("a")) {
            // normalize alpha prop
            colorObject.a = colorObject.alpha;
            delete colorObject.alpha;
        }
        return colorObject;
    }
    getSliderCapSpacing() {
        const { dimensions: { slider: { height }, thumb: { radius } } } = this;
        return radius * 2 - height;
    }
    updateDimensions(scale = "m") {
        this.dimensions = DIMENSIONS[scale];
    }
    drawColorFieldAndSlider() {
        if (!this.fieldAndSliderRenderingContext) {
            return;
        }
        this.drawColorField();
        this.drawHueSlider();
    }
    drawColorField() {
        const context = this.fieldAndSliderRenderingContext;
        const { dimensions: { colorField: { height, width } } } = this;
        context.fillStyle = this.color.hsv().saturationv(100).value(100).string();
        context.fillRect(0, 0, width, height);
        const whiteGradient = context.createLinearGradient(0, 0, width, 0);
        whiteGradient.addColorStop(0, "rgba(255,255,255,1)");
        whiteGradient.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = whiteGradient;
        context.fillRect(0, 0, width, height);
        const blackGradient = context.createLinearGradient(0, 0, 0, height);
        blackGradient.addColorStop(0, "rgba(0,0,0,0)");
        blackGradient.addColorStop(1, "rgba(0,0,0,1)");
        context.fillStyle = blackGradient;
        context.fillRect(0, 0, width, height);
        this.drawActiveColorFieldColor();
    }
    setCanvasContextSize(canvas, { height, width }) {
        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        canvas.style.height = `${height}px`;
        canvas.style.width = `${width}px`;
        const context = canvas.getContext("2d");
        context.scale(devicePixelRatio, devicePixelRatio);
    }
    containsPoint(testPointX, testPointY, boundsX, boundsY, boundsRadius) {
        return (Math.pow(testPointX - boundsX, 2) + Math.pow(testPointY - boundsY, 2) <=
            Math.pow(boundsRadius, 2));
    }
    drawActiveColorFieldColor() {
        const color = this.color.hsv();
        const { dimensions: { colorField: { height, width }, thumb: { radius } } } = this;
        const x = color.saturationv() / (HSV_LIMITS.s / width);
        const y = height - color.value() / (HSV_LIMITS.v / height);
        this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, color, this.hueThumbState);
    }
    drawThumb(context, radius, x, y, color, state) {
        const startAngle = 0;
        const endAngle = 2 * Math.PI;
        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle);
        context.shadowBlur = state === "hover" ? 32 : 16;
        context.shadowColor = `rgba(0, 0, 0, ${state === "drag" ? 0.32 : 0.16})`;
        context.fillStyle = "#fff";
        context.fill();
        context.beginPath();
        context.arc(x, y, radius - 3, startAngle, endAngle);
        context.shadowBlur = 0;
        context.shadowColor = "transparent";
        context.fillStyle = color.rgb().string();
        context.fill();
    }
    drawActiveHueSliderColor() {
        const color = this.color.hsv().saturationv(100).value(100);
        const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height, width }, thumb: { radius } } } = this;
        const x = color.hue() / (360 / width);
        const y = height / 2 + colorFieldHeight;
        this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, color, this.sliderThumbState);
    }
    drawHueSlider() {
        const context = this.fieldAndSliderRenderingContext;
        const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height, width } } } = this;
        const gradient = context.createLinearGradient(0, 0, width, 0);
        const hueSliderColorStopKeywords = ["red", "yellow", "lime", "cyan", "blue", "magenta", "red"];
        const offset = 1 / (hueSliderColorStopKeywords.length - 1);
        let currentOffset = 0;
        hueSliderColorStopKeywords.forEach((keyword) => {
            gradient.addColorStop(currentOffset, color(keyword).string());
            currentOffset += offset;
        });
        context.fillStyle = gradient;
        context.clearRect(0, colorFieldHeight, width, height + this.getSliderCapSpacing() * 2);
        context.fillRect(0, colorFieldHeight, width, height);
        this.drawActiveHueSliderColor();
    }
    updateColorFromChannels(channels) {
        this.color = color(channels, this.channelMode);
    }
    updateChannelsFromColor(color) {
        this.channels = this.toChannels(color);
    }
    toChannels(color) {
        const { channelMode } = this;
        return color[channelMode]()
            .array()
            .map((value) => Math.floor(value));
    }
    get el() { return this; }
    static get watchers() { return {
        "color": ["handleColorChange"],
        "scale": ["handleScaleChange"],
        "value": ["handleValueChange"]
    }; }
    static get style() { return calciteColorCss; }
};

const CSS$3 = {
    container: "container",
    preview: "preview",
    input: "input"
};

const calciteColorHexInputCss = ":host([hidden]){display:none}:host{display:block}.container{width:100%;display:-ms-inline-grid;display:inline-grid;-ms-grid-columns:1fr auto;grid-template-columns:1fr auto;-ms-flex-align:center;align-items:center}.preview{-ms-grid-column:2;-ms-grid-column-span:1;grid-column:2/3;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;pointer-events:none;margin:0 6px;z-index:1}.preview,.input{-ms-grid-row:1;grid-row:1}.input{-ms-grid-column:1;-ms-grid-column-span:2;grid-column:1/3;text-transform:uppercase;width:100%}";

const DEFAULT_COLOR$1 = color();
const CalciteColorHexInput = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteColorHexInputChange = createEvent(this, "calciteColorHexInputChange", 7);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Label used for the hex input.
         */
        this.intlHex = TEXT$2.hex;
        /**
         * The component's scale.
         */
        this.scale = "m";
        /**
         * The component's theme.
         */
        this.theme = "light";
        /**
         * The hex value.
         */
        this.value = normalizeHex(DEFAULT_COLOR$1.hex());
        this.onCalciteInputBlur = (event) => {
            const node = event.currentTarget;
            const hex = `#${node.value}`;
            if (isValidHex(hex) && isLonghandHex(hex)) {
                return;
            }
            // manipulating DOM directly since rerender doesn't update input value
            node.value = this.formatForInternalInput(rgbToHex(this.internalColor.object()));
        };
        this.onInputChange = (event) => {
            const node = event.currentTarget;
            const hex = node.value;
            const color = hexToRGB(`#${hex}`);
            if (!color) {
                return;
            }
            this.value = normalizeHex(hex);
            this.calciteColorHexInputChange.emit();
        };
        this.onInputKeyDown = (event) => {
            const { inputNode } = this;
            const { key, altKey, ctrlKey, metaKey } = event;
            const withModifiers = altKey || ctrlKey || metaKey;
            const exceededHexLength = inputNode.value.length >= 6;
            const hasTextSelection = getSelection().type === "Range";
            if (key.length === 1 &&
                !withModifiers &&
                !hasTextSelection &&
                (!hexChar.test(key) || exceededHexLength)) {
                event.preventDefault();
            }
        };
        /**
         * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
         */
        this.internalColor = DEFAULT_COLOR$1;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        const normalized = normalizeHex(this.value);
        if (isValidHex(normalized)) {
            this.internalColor = color(normalized);
            this.value = normalized;
        }
    }
    handleValueChange(value, oldValue) {
        const normalized = normalizeHex(value);
        if (isValidHex(normalized)) {
            const changed = normalized !== normalizeHex(this.internalColor.hex());
            this.internalColor = color(normalized);
            this.value = normalized;
            if (changed) {
                this.calciteColorHexInputChange.emit();
            }
            return;
        }
        this.value = oldValue;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const { el, intlHex, value } = this;
        const hexInputValue = this.formatForInternalInput(value);
        const elementDir = getElementDir(el);
        return (h("div", { class: CSS$3.container }, h("calcite-input", { "aria-label": intlHex, class: CSS$3.input, dir: elementDir, onChange: this.onInputChange, onCalciteInputBlur: this.onCalciteInputBlur, onKeyDown: this.onInputKeyDown, prefixText: "#", ref: (node) => (this.inputNode = node), scale: "s", value: hexInputValue }), h("calcite-color-swatch", { active: true, class: CSS$3.preview, scale: "s", color: `#${hexInputValue}` })));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        focusElement(this.inputNode);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    formatForInternalInput(hex) {
        return hex.replace("#", "");
    }
    get el() { return this; }
    static get watchers() { return {
        "value": ["handleValueChange"]
    }; }
    static get style() { return calciteColorHexInputCss; }
};

const CSS$4 = {
    swatch: "swatch"
};

const calciteColorSwatchCss = ":host([hidden]){display:none}:host{display:-ms-inline-flexbox;display:inline-flex}:host([scale=s]){height:20px;width:20px}:host([scale=m]){height:24px;width:24px}:host([scale=l]){height:28px;width:28px}.swatch{height:inherit;width:inherit;overflow:visible}.swatch rect{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}";

const ACTIVE_BORDER_COLOR = "rgba(0, 0, 0, 0.15)";
const CalciteColorSwatch = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Used to display whether the swatch is active or not.
         */
        this.active = false;
        /**
         * The component scale.
         */
        this.scale = "m";
        /**
         * The component's theme.
         */
        this.theme = "light";
    }
    handleColorChange(color$1) {
        this.internalColor = color(color$1);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.handleColorChange(this.color);
    }
    render() {
        const { internalColor, active, theme } = this;
        const hex = internalColor.hex();
        const borderColor = active
            ? ACTIVE_BORDER_COLOR
            : internalColor[theme === "light" ? "darken" : "whiten"](0.25).hex();
        const borderRadius = active ? "100%" : "0";
        return (h(Host, { "aria-label": hex, title: hex }, h("svg", { class: CSS$4.swatch, xmlns: "http://www.w3.org/2000/svg" }, h("rect", { width: "100%", height: "100%", fill: hex, stroke: borderColor, rx: borderRadius }))));
    }
    static get watchers() { return {
        "color": ["handleColorChange"]
    }; }
    static get style() { return calciteColorSwatchCss; }
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$2;

  return value === proto;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$3.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$1.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$4.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$2.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

/**
 * Iterates over own and inherited enumerable string keyed properties of an
 * object and invokes `iteratee` for each property. The iteratee is invoked
 * with three arguments: (value, key, object). Iteratee functions may exit
 * iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forInRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forIn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
 */
function forIn(object, iteratee) {
  return object == null
    ? object
    : baseFor(object, castFunction(iteratee), keysIn);
}

const filter = (data, value) => {
    const regex = new RegExp(value, "ig");
    if (data.length === 0) {
        console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
    }
    const find = (input, RE) => {
        let found = false;
        forIn(input, (val) => {
            if (typeof val === "function") {
                return;
            }
            if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
                if (find(val, RE)) {
                    found = true;
                }
            }
            else if (RE.test(val)) {
                found = true;
            }
        });
        return found;
    };
    const result = data.filter((item) => {
        return find(item, regex);
    });
    return result;
};

const calciteComboboxCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){font-size:12px;--calcite-combobox-item-spacing-unit-l:12px;--calcite-combobox-item-spacing-unit-s:8px}:host([scale=m]){font-size:14px;--calcite-combobox-item-spacing-unit-l:16px;--calcite-combobox-item-spacing-unit-s:12px}:host([scale=l]){font-size:16px;--calcite-combobox-item-spacing-unit-l:20px;--calcite-combobox-item-spacing-unit-s:16px}:host{display:block;position:relative}[role=combobox]{display:-ms-flexbox;display:flex}input{-ms-flex-positive:1;flex-grow:1;font-size:inherit;font-family:inherit;padding:var(--calcite-combobox-item-spacing-unit-s) var(--calcite-combobox-item-spacing-unit-l);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-border-1);color:1px solid var(--calcite-ui-text-1)}input{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}input:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.list{-webkit-transform:translate3d(0, -1.5rem, 0);transform:translate3d(0, -1.5rem, 0);-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;visibility:hidden;opacity:0;display:block;position:absolute;left:0;z-index:200;overflow:hidden;max-height:0;width:auto;width:var(--calcite-dropdown-width);background:var(--calcite-ui-foreground-1);border-radius:var(--calcite-border-radius);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);pointer-events:none;margin:0;padding:0;right:0}:host([active]) .list{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);opacity:1;max-height:100vh;visibility:visible;pointer-events:initial;overflow-y:scroll}.selections calcite-chip{margin-right:var(--calcite-combobox-item-spacing-unit-s);margin-bottom:var(--calcite-combobox-item-spacing-unit-s)}.selections calcite-chip:last-child{margin-right:0}:host([dir=rtl]) .selections calcite-chip{margin-right:unset;margin-left:var(--calcite-combobox-item-spacing-unit-s)}:host([dir=rtl]) .selections calcite-chip:last-child{margin-left:0}.item{display:block}";

const COMBO_BOX_ITEM = "calcite-combobox-item";
const CalciteCombobox = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteLookupChange = createEvent(this, "calciteLookupChange", 7);
        this.calciteComboboxChipDismiss = createEvent(this, "calciteComboboxChipDismiss", 7);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        this.disabled = false;
        /** specify the scale of the combobox, defaults to m */
        this.scale = "m";
        this.items = [];
        this.selectedItems = [];
        this.visibleItems = [];
        this.textInput = null;
        this.observer = null;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.inputHandler = (event) => {
            const target = event.target;
            this.filterItems(target.value);
        };
        this.filterItems = debounce((value) => {
            const filteredData = filter(this.data, value);
            const values = filteredData.map((item) => item.value);
            this.items.forEach((item) => {
                item.hidden = values.indexOf(item.value) === -1;
                // If item is nested inside another item...
                const { parentItem } = item;
                if (parentItem) {
                    // If the parent item is a match, show me.
                    if (values.indexOf(parentItem.value) !== -1) {
                        item.hidden = false;
                    }
                    // If I am a match, show my parent.
                    if (values.indexOf(item.value) !== -1) {
                        parentItem.hidden = false;
                    }
                }
            });
            this.visibleItems = this.getVisibleItems();
        }, 100);
        this.comboboxFocusHandler = (event) => {
            this.active = event.type === "focusin";
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        if (Build.isBrowser) {
            this.observer = new MutationObserver(this.updateItems);
        }
    }
    componentWillLoad() {
        this.updateItems();
    }
    componentDidLoad() {
        var _a;
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    }
    componentDidUnload() {
        var _a;
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    calciteComboboxItemChangeHandler(event) {
        this.toggleSelection(event.detail);
    }
    calciteChipDismissHandler(event) {
        var _a;
        this.textInput.focus();
        const value = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.value;
        const comboboxItem = this.items.find((item) => item.value === value);
        if (comboboxItem) {
            this.toggleSelection(comboboxItem, false);
        }
    }
    handleInputKeyDown(event) {
        if (event.target === this.textInput) {
            const key = getKey(event.key);
            if (event.shiftKey && key === "Tab") {
                return;
            }
            else if (key === "Escape") {
                this.active = false;
            }
            else if (key === "ArrowDown") {
                this.focusFirstItem();
            }
            else if (key === "ArrowUp") {
                this.focusLastItem();
            }
            else {
                this.active = true;
                this.textInput.focus();
            }
        }
    }
    toggleSelection(item, value = !item.selected) {
        item.selected = value;
        this.selectedItems = this.getSelectedItems();
        this.calciteLookupChange.emit(this.selectedItems);
    }
    getVisibleItems() {
        return this.items.filter((item) => !item.hidden);
    }
    getSelectedItems() {
        return this.items.filter((item) => item.selected);
    }
    updateItems() {
        this.items = this.getItems();
        this.data = this.getData();
        this.selectedItems = this.getSelectedItems();
        this.visibleItems = this.getVisibleItems();
    }
    getData() {
        return this.items.map((item) => ({
            value: item.value,
            label: item.textLabel,
        }));
    }
    getItems() {
        const items = Array.from(this.el.querySelectorAll(COMBO_BOX_ITEM));
        return items
            .filter((item) => !item.disabled)
            .map((item) => {
            const { parentElement } = item;
            item.parentItem = parentElement.matches(COMBO_BOX_ITEM)
                ? parentElement
                : null;
            return item;
        });
    }
    calciteComboboxItemKeyEventHandler(event) {
        const { item, event: keyboardEvent } = event.detail;
        let isFirstItem = this.itemIndex(item) === 0;
        let isLastItem = this.itemIndex(item) === this.items.length - 1;
        const shiftKey = keyboardEvent.shiftKey;
        const keyCode = getKey(keyboardEvent.key);
        switch (keyCode) {
            case "Tab":
                if (isFirstItem && shiftKey)
                    this.closeCalciteCombobox();
                if (isLastItem && !shiftKey)
                    this.closeCalciteCombobox();
                else if (isFirstItem && shiftKey)
                    this.textInput.focus();
                else if (shiftKey)
                    this.focusPrevItem(item);
                else
                    this.focusNextItem(item);
                break;
            case "ArrowDown":
                this.focusNextItem(item);
                break;
            case "ArrowUp":
                this.focusPrevItem(item);
                break;
            case "Home":
                this.focusFirstItem();
                break;
            case "End":
                this.focusLastItem();
                break;
            case "Escape":
                this.closeCalciteCombobox();
                break;
        }
    }
    closeCalciteCombobox() {
        this.textInput.focus();
        this.active = false;
    }
    focusFirstItem() {
        const firstItem = this.items[0];
        firstItem.focus();
    }
    focusLastItem() {
        const lastItem = this.items[this.items.length - 1];
        lastItem.focus();
    }
    focusNextItem(item) {
        const index = this.itemIndex(item);
        const nextItem = this.items[index + 1] || this.items[0];
        nextItem.focus();
    }
    focusPrevItem(item) {
        const index = this.itemIndex(item);
        const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
        prevItem.focus();
    }
    itemIndex(item) {
        return this.items.indexOf(item);
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const dir = getElementDir(this.el);
        const listBoxId = "listbox";
        return (h(Host, { active: this.active, onFocusin: this.comboboxFocusHandler, onFocusout: this.comboboxFocusHandler, dir: dir }, h("div", { class: "selections" }, this.selectedItems.map((item) => {
            return (h("calcite-chip", { key: item.value, scale: this.scale, value: item.value, dir: dir, dismissible: true }, item.textLabel));
        })), h("div", { role: "combobox", "aria-expanded": this.active.toString(), "aria-owns": listBoxId, "aria-haspopup": "listbox" }, h("input", { type: "text", placeholder: this.placeholder, "aria-label": this.label, "aria-autocomplete": "list", "aria-controls": listBoxId, onInput: this.inputHandler, disabled: this.disabled, onKeyDown: (e) => this.handleInputKeyDown(e), ref: (el) => (this.textInput = el) })), h("ul", { id: listBoxId, "aria-label": this.label, role: "listbox", class: { list: true }, "aria-multiselectable": "true" }, h("slot", null))));
    }
    get el() { return this; }
    static get style() { return calciteComboboxCss; }
};

const CSS$5 = {
    icon: "combobox-item-icon",
    label: "combobox-item-label",
    nested: "combobox-item-nested",
    parent: "combobox-item-parent",
    selected: "selected",
    title: "title",
    textContainer: "text-container"
};

const calciteComboboxItemCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=xs]){font-size:10px;--calcite-combobox-item-spacing-unit-l:8px;--calcite-combobox-item-spacing-unit-s:4px}:host([scale=s]){font-size:12px;--calcite-combobox-item-spacing-unit-l:12px;--calcite-combobox-item-spacing-unit-s:8px}:host([scale=m]){font-size:14px;--calcite-combobox-item-spacing-unit-l:16px;--calcite-combobox-item-spacing-unit-s:12px}:host([scale=l]){font-size:16px;--calcite-combobox-item-spacing-unit-l:20px;--calcite-combobox-item-spacing-unit-s:16px}:host([scale=xl]){font-size:18px;--calcite-combobox-item-spacing-unit-l:24px;--calcite-combobox-item-spacing-unit-s:20px}:host,:host ul{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0;padding:0;outline:none}:host .combobox-item-label{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) .combobox-item-label{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host .combobox-item-label{display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;min-width:100%;-ms-flex-align:center;align-items:center;color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;padding:var(--calcite-combobox-item-spacing-unit-s);cursor:pointer;text-decoration:none;position:relative}:host .combobox-item-label .combobox-item-icon{display:-ms-inline-flexbox;display:inline-flex;opacity:0;margin-right:var(--calcite-combobox-item-spacing-unit-s);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;color:var(--calcite-ui-border-1)}:host([dir=rtl]) .combobox-item-label .combobox-item-icon{margin-left:var(--calcite-combobox-item-spacing-unit-l);margin-right:unset}:host .combobox-item-label.combobox-item-nested{padding-left:var(--calcite-combobox-item-spacing-unit-s)}:host .combobox-item-label.combobox-item-nested .combobox-item-icon{padding-left:var(--calcite-combobox-item-spacing-unit-l)}:host([dir=rtl]) .combobox-item-label.combobox-item-nested{padding-right:var(--calcite-combobox-item-spacing-unit-s);padding-left:unset}:host([dir=rtl]) .combobox-item-label.combobox-item-nested .combobox-item-icon{padding-right:var(--calcite-combobox-item-spacing-unit-l);padding-left:unset}:host(:not([disabled])) .combobox-item-label:hover,:host(:not([disabled])) .combobox-item-label:active{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);text-decoration:none;-webkit-box-shadow:none;box-shadow:none}:host(:not([disabled])) .combobox-item-label:hover .combobox-item-icon,:host(:not([disabled])) .combobox-item-label:active .combobox-item-icon{opacity:1}:host(:focus:not([disabled])) .combobox-item-label{color:var(--calcite-ui-text-1);text-decoration:none;-webkit-box-shadow:none;box-shadow:none}:host(:focus:not([disabled])) .combobox-item-label .combobox-item-icon{opacity:1}:host([disabled]) .combobox-item-label:hover .combobox-item-icon{opacity:1}:host([disabled]) .combobox-item-label:hover{cursor:default}:host(:focus){-webkit-box-shadow:none;box-shadow:none}:host .combobox-item-label.selected{color:var(--calcite-ui-text-1);font-weight:500}:host .combobox-item-label.selected .combobox-item-icon{color:var(--calcite-ui-blue-1);opacity:1}";

const CalciteComboboxItem = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteComboboxItemChange = createEvent(this, "calciteComboboxItemChange", 7);
        this.calciteComboboxItemKeyEvent = createEvent(this, "calciteComboboxItemKeyEvent", 7);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /* When true, the item cannot be clicked and is visually muted. */
        this.disabled = false;
        /* Set this to true to pre-select an item. Toggles when an item is checked/unchecked. */
        this.selected = false;
        this.isSelected = this.selected;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.itemClickHandler = (event) => {
            event.preventDefault();
            if (this.disabled) {
                return;
            }
            this.isSelected = !this.isSelected;
            this.calciteComboboxItemChange.emit(this.el);
        };
    }
    selectedWatchHandler(newValue) {
        this.isSelected = newValue;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentWillLoad() {
        this.isNested = this.getDepth();
        this.hasDefaultSlot = this.el.querySelector(":not([slot])") !== null;
    }
    // --------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    // --------------------------------------------------------------------------
    keyDownHandler(event) {
        event.stopPropagation();
        switch (getKey(event.key)) {
            case " ":
            case "Enter":
                this.isSelected = !this.isSelected;
                this.calciteComboboxItemChange.emit(this.el);
                event.preventDefault();
                break;
            case "ArrowUp":
            case "ArrowDown":
            case "Home":
            case "End":
            case "Tab":
            case "Escape":
                this.calciteComboboxItemKeyEvent.emit({
                    event: event,
                    item: this.el,
                });
                event.preventDefault();
                break;
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Used to toggle the selection state. By default this won't trigger an event.
     * The first argument allows the value to be coerced, rather than swapping values.
     */
    async toggleSelected(coerce) {
        if (this.disabled) {
            return;
        }
        this.isSelected = typeof coerce === "boolean" ? coerce : !this.isSelected;
    }
    getDepth() {
        var _a;
        return !!((_a = this.el.parentElement) === null || _a === void 0 ? void 0 : _a.closest("calcite-combobox-item"));
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderIcon(scale) {
        const iconScale = scale !== "l" ? "s" : "m";
        const iconPath = this.disabled ? "circle-disallowed" : "check";
        return h("calcite-icon", { class: CSS$5.icon, scale: iconScale, icon: iconPath });
    }
    renderChildren() {
        if (!this.hasDefaultSlot) {
            return null;
        }
        return (h("ul", null, h("slot", null)));
    }
    render() {
        const classes = {
            [CSS$5.label]: true,
            [CSS$5.selected]: this.isSelected,
            [CSS$5.nested]: this.isNested,
            [CSS$5.parent]: !this.isNested,
        };
        const scale = getElementProp(this.el, "scale", "m");
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, scale: scale, role: "option", "aria-selected": this.isSelected, disabled: this.disabled, tabIndex: this.disabled ? null : 0 }, h("div", { class: classes, onClick: this.itemClickHandler, ref: (el) => (this.comboboxItemEl = el) }, this.renderIcon(scale), h("span", { class: CSS$5.title }, this.textLabel)), this.renderChildren()));
    }
    get el() { return this; }
    static get watchers() { return {
        "selected": ["selectedWatchHandler"]
    }; }
    static get style() { return calciteComboboxItemCss; }
};

/**
 * Date units
 */
var units;
(function (units) {
    units["day"] = "day";
    units["month"] = "month";
    units["year"] = "year";
})(units || (units = {}));
/**
 * Parse date formatting data for a given locale
 */
function getLocaleFormatData(locale) {
    let data = [
        { unit: units.month, num: "11", placeholder: "mm" },
        { unit: units.day, num: "22", placeholder: "dd" },
        { unit: units.year, num: "3333", placeholder: "yyyy" }
    ];
    // create a new localized string from a known date
    let test = new Date(3333, 10, 22).toLocaleDateString(locale);
    const buddhist = test.indexOf("3876") > -1;
    // replace arabic numerals and adjust for buddhist era
    test = replaceArabicNumerals(test).replace("3876", "3333");
    const placeholder = data.reduce((str, d) => str.replace(d.num, d.placeholder), test);
    // given the localized test string, determine the order of day, month, year
    const order = data.sort((a, b) => (test.indexOf(a.num) < test.indexOf(b.num) ? -1 : 1)).map((d) => d.unit);
    const separator = [". ", ".", "-", "/", "/"].find((char) => test.indexOf(char) > -1);
    return {
        order,
        separator,
        buddhist,
        placeholder
    };
}
/**
 * Parse numeric units for day, month, and year from a localized string
 * month starts at 0 (can pass to date constructor)
 */
function parseDateString(str, locale) {
    const { separator, order, buddhist } = getLocaleFormatData(locale);
    const values = replaceArabicNumerals(str)
        .split(separator)
        .filter((part) => part !== separator)
        .map((part) => part.replace(".", ""));
    return {
        day: parseInt(values[order.indexOf(units.day)]),
        month: parseInt(values[order.indexOf(units.month)]) - 1,
        year: parseInt(values[order.indexOf(units.year)]) - (buddhist ? 543 : 0)
    };
}
/**
 * Convert eastern arbic numerals and remove right-to-left control marks
 */
function replaceArabicNumerals(str = "") {
    return str
        .replace(/[\u0660-\u0669]/g, (c) => (c.charCodeAt(0) - 0x0660))
        .replace(/[\u06f0-\u06f9]/g, (c) => (c.charCodeAt(0) - 0x06f0))
        .replace(/[^\x00-\x7F]/g, "");
}
/**
 * Assemble an array of month names for a locale
 */
function getMonths(locale) {
    const date = new Date(0, 0, 1);
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        date.setMonth(i);
        return new Intl.DateTimeFormat(locale, {
            month: "long"
        }).format(date);
    });
}
/**
 * Get localized year name for given locale
 */
function getYear(date, locale) {
    return new Intl.DateTimeFormat(locale, { year: "numeric" }).format(date);
}
/**
 * Generate an array of localized week day names in the correct order
 */
function getLocalizedWeekdays(locale, format = "short") {
    const startWeek = [];
    const endWeek = [];
    const date = new Date();
    for (let w = 1; w < 8; w++) {
        date.setDate(w);
        let day = new Intl.DateTimeFormat(locale, {
            weekday: format
        }).format(date);
        date.getDay() === getFirstDayOfWeek(locale) || startWeek.length > 0 ? startWeek.push(day) : endWeek.push(day);
    }
    return [...startWeek, ...endWeek];
}
/**
 * Find the week starting day for a given locale
 */
function getFirstDayOfWeek(locale) {
    return firstDayOfWeek[locale.slice(0, 2).toUpperCase()] || 0;
}
/**
 * Which day of the week is considered the start in each locale
 * Sunday starting locales have been omitted.
 * https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/weekData.json
 */
const firstDayOfWeek = {
    AD: 1,
    AE: 6,
    AF: 6,
    AI: 1,
    AL: 1,
    AM: 1,
    AN: 1,
    AR: 1,
    AT: 1,
    AX: 1,
    AZ: 1,
    BA: 1,
    BE: 1,
    BG: 1,
    BH: 6,
    BM: 1,
    BN: 1,
    BY: 1,
    CH: 1,
    CL: 1,
    CM: 1,
    CR: 1,
    CY: 1,
    CZ: 1,
    DE: 1,
    DJ: 6,
    DK: 1,
    DZ: 6,
    EC: 1,
    EE: 1,
    EG: 6,
    ES: 1,
    FI: 1,
    FJ: 1,
    FO: 1,
    FR: 1,
    GB: 1,
    GE: 1,
    GF: 1,
    GP: 1,
    GR: 1,
    HR: 1,
    HU: 1,
    IE: 1,
    IQ: 6,
    IR: 6,
    IS: 1,
    IT: 1,
    JO: 6,
    KG: 1,
    KW: 6,
    KZ: 1,
    LB: 1,
    LI: 1,
    LK: 1,
    LT: 1,
    LU: 1,
    LV: 1,
    LY: 6,
    MC: 1,
    MD: 1,
    ME: 1,
    MK: 1,
    MN: 1,
    MQ: 1,
    MV: 5,
    MY: 1,
    NL: 1,
    NO: 1,
    NZ: 1,
    OM: 6,
    PL: 1,
    QA: 6,
    RE: 1,
    RO: 1,
    RS: 1,
    RU: 1,
    SD: 6,
    SE: 1,
    SI: 1,
    SK: 1,
    SM: 1,
    SY: 6,
    TJ: 1,
    TM: 1,
    TR: 1,
    UA: 1,
    UY: 1,
    UZ: 1,
    VA: 1,
    VN: 1,
    XK: 1
};

/**
 * Check if date is within a min and max
 */
function inRange(date, min, max) {
    const time = date.getTime();
    const afterMin = !(min instanceof Date) || time >= min.getTime();
    const beforeMax = !(max instanceof Date) || time <= max.getTime();
    return afterMin && beforeMax;
}
/**
 * Ensures date is within range,
 * returns min or max if out of bounds
 */
function dateFromRange(date, min, max) {
    if (!(date instanceof Date)) {
        return null;
    }
    const time = date.getTime();
    const beforeMin = min instanceof Date && time < min.getTime();
    const afterMax = max instanceof Date && time > max.getTime();
    if (beforeMin) {
        return min;
    }
    if (afterMax) {
        return max;
    }
    return date;
}
/**
 * Parse an iso8601 string (YYYY-mm-dd) into a valid date.
 * TODO: handle time when time of day UI is added
 */
function dateFromISO(iso8601) {
    if (!iso8601 || typeof iso8601 !== "string") {
        return null;
    }
    const d = iso8601.split(/[: T-]/).map(parseFloat);
    const date = new Date(d[0], (d[1] || 1) - 1, d[2] || 1);
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid ISO 8601 date: "${iso8601}"`);
    }
    return date;
}
/**
 * Return first portion of ISO string (YYYY-mm-dd)
 */
function dateToISO(date) {
    if (date instanceof Date) {
        return date.toISOString().split("T")[0];
    }
    return "";
}
/**
 * Check if two dates are the same day, month, year
 */
function sameDate(d1, d2) {
    return (d1 instanceof Date &&
        d2 instanceof Date &&
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear());
}
/**
 * Get a date one month in the past
 */
function prevMonth(date) {
    const month = date.getMonth();
    const nextDate = new Date(date);
    nextDate.setMonth(month - 1);
    // date doesn't exist in new month, use last day
    if (month === nextDate.getMonth()) {
        return new Date(date.getFullYear(), month, 0);
    }
    return nextDate;
}
/**
 * Get a date one month in the future
 */
function nextMonth(date) {
    const month = date.getMonth();
    const nextDate = new Date(date);
    nextDate.setMonth(month + 1);
    // date doesn't exist in new month, use last day
    if ((month + 2) % 7 === nextDate.getMonth() % 7) {
        return new Date(date.getFullYear(), month + 2, 0);
    }
    return nextDate;
}

const TEXT$3 = {
    nextMonth: "next month",
    prevMonth: "previous month",
};

const calciteDateCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:inline-block;vertical-align:top;width:100%;position:relative;overflow:visible}.slot{display:none}:host([scale=s]){max-width:216px}:host([scale=m]){max-width:286px}:host([scale=l]){max-width:398px}.calendar-icon{color:var(--calcite-ui-text-3);position:absolute;top:50%;margin:-8px 0.75rem;pointer-events:none}.calendar-picker-wrapper{position:absolute;top:100%;background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);opacity:0;width:100%;line-height:0;visibility:hidden;overflow:visible;-webkit-transform:translate3d(0, -1.5rem, 0);transform:translate3d(0, -1.5rem, 0);-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;pointer-events:none;z-index:3}.input .calcite-input-wrapper{margin-top:0}:host([active]){background-color:var(--calcite-ui-foreground-1);border-radius:var(--calcite-border-radius);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16)}:host([active]) .calendar-picker-wrapper{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);visibility:visible;pointer-events:initial}:host([active]) .date-input-wrapper{border:1px solid var(--calcite-ui-foreground-1);border-bottom:1px solid var(--calcite-ui-border-3)}:host([no-calendar-input]){-webkit-box-shadow:none;box-shadow:none}:host([no-calendar-input]) .calendar-picker-wrapper{position:static;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);border-radius:none;-webkit-box-shadow:none;box-shadow:none;border:1px solid var(--calcite-ui-border-2)}";

const CalciteDate = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteDateChange = createEvent(this, "calciteDateChange", 7);
        /** Expand or collapse when calendar does not have input */
        this.active = false;
        /** Localized string for "previous month" */
        this.intlPrevMonth = TEXT$3.prevMonth;
        /** Localized string for "next month" */
        this.intlNextMonth = TEXT$3.nextMonth;
        /** BCP 47 language tag for desired language and country format */
        this.locale = "en-US";
        /** Show only calendar popup */
        this.noCalendarInput = false;
        /** specify the scale of the date picker */
        this.scale = "m";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.localeData = getLocaleFormatData(this.locale);
        this.hasShadow = Build.isBrowser && !!document.head.attachShadow;
        /**
         * Update component based on input proxy
         */
        this.syncThisToProxyInput = () => {
            this.min = this.inputProxy.min;
            this.max = this.inputProxy.max;
            const min = dateFromISO(this.min);
            const max = dateFromISO(this.max);
            const date = dateFromISO(this.inputProxy.value);
            this.valueAsDate = dateFromRange(date, min, max);
            this.value = dateToISO(this.valueAsDate);
        };
        /**
         * Update input proxy
         */
        this.syncProxyInputToThis = () => {
            if (this.inputProxy) {
                this.inputProxy.value = this.value || "";
                if (this.min) {
                    this.inputProxy.min = this.min;
                }
                if (this.max) {
                    this.inputProxy.max = this.max;
                }
            }
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    focusOutHandler() {
        this.reset();
    }
    /**
     * Blur doesn't fire properly when there is no shadow dom (ege/IE11)
     * Check if the focused element is inside the date picker, if not close
     */
    focusInHandler(e) {
        if (!this.hasShadow && !this.el.contains(e.srcElement)) {
            this.reset();
        }
    }
    keyDownHandler(e) {
        if (getKey(e.key) === "Escape") {
            this.reset();
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.setupProxyInput();
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillRender() {
        this.syncProxyInputToThis();
    }
    render() {
        const min = dateFromISO(this.min);
        const max = dateFromISO(this.max);
        const date = dateFromRange(this.valueAsDate, min, max);
        const activeDate = this.getActiveDate(date, min, max);
        const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
        const dir = getElementDir(this.el);
        return (h(Host, { role: "application", dir: dir }, h("div", { class: "slot" }, h("slot", null)), !this.noCalendarInput && (h("div", { role: "application" }, h("calcite-input", { type: "text", value: formattedDate, placeholder: this.localeData.placeholder, icon: "calendar", onCalciteInputFocus: () => (this.active = true), onCalciteInputInput: (e) => this.input(e.detail.value), onCalciteInputBlur: (e) => this.blur(e.detail), scale: this.scale, "number-button-type": "none", class: "input" }))), h("div", { class: "calendar-picker-wrapper" }, h("calcite-date-month-header", { activeDate: activeDate, selectedDate: date || new Date(), intlPrevMonth: this.intlPrevMonth, intlNextMonth: this.intlNextMonth, locale: this.locale, min: min, max: max, onCalciteActiveDateChange: (e) => {
                this.activeDate = new Date(e.detail);
            }, dir: dir, scale: this.scale }), h("calcite-date-month", { min: min, max: max, selectedDate: date, activeDate: activeDate, locale: this.locale, onCalciteDateSelect: (e) => {
                this.setValue(new Date(e.detail));
                this.activeDate = new Date(e.detail);
                this.calciteDateChange.emit(new Date(e.detail));
                this.reset();
            }, onCalciteActiveDateChange: (e) => {
                this.activeDate = new Date(e.detail);
            }, dir: dir, scale: this.scale }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Register slotted date input proxy, or create one if not provided
     */
    setupProxyInput() {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            try {
                this.inputProxy.type = "date";
            }
            catch (e) {
                this.inputProxy.type = "text";
            }
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
        if (Build.isBrowser) {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    }
    /**
     * Set both iso value and date value and update proxy
     */
    setValue(date) {
        this.valueAsDate = new Date(date);
        this.value = date.toISOString().split("T")[0];
        this.syncProxyInputToThis();
    }
    /**
     * Reset active date and close
     */
    reset() {
        if (this.valueAsDate) {
            this.activeDate = new Date(this.valueAsDate);
        }
        if (!this.noCalendarInput) {
            this.active = false;
        }
    }
    /**
     * If inputted string is a valid date, update value/active
     */
    input(value) {
        const date = this.getDateFromInput(value);
        if (date) {
            this.setValue(date);
            this.activeDate = date;
            this.calciteDateChange.emit(new Date(date));
        }
    }
    /**
     * Clean up invalid date from input on blur
     */
    blur(target) {
        const date = this.getDateFromInput(target.value);
        if (!date && this.valueAsDate) {
            target.value = this.valueAsDate.toLocaleDateString(this.locale);
        }
    }
    /**
     * Get an active date using the value, or current date as default
     */
    getActiveDate(value, min, max) {
        return (dateFromRange(this.activeDate, min, max) ||
            value ||
            dateFromRange(new Date(), min, max));
    }
    /**
     * Find a date from input string
     * return false if date is invalid, or out of range
     */
    getDateFromInput(value) {
        const { separator } = this.localeData;
        const { day, month, year } = parseDateString(value, this.locale);
        const validDay = day > 0;
        const validMonth = month > -1;
        const date = new Date(year, month, day);
        const validDate = !isNaN(date.getTime());
        const validLength = value.split(separator).filter((c) => c).length > 2;
        const validYear = year.toString().length > 3;
        if (validDay &&
            validMonth &&
            validDate &&
            validLength &&
            validYear &&
            inRange(date, this.min, this.max)) {
            return date;
        }
        return false;
    }
    get el() { return this; }
    static get style() { return calciteDateCss; }
};

const calciteDateDayCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--calcite-ui-text-3);cursor:pointer;width:calc(100% / 7);min-width:0}.day{display:-ms-flexbox;display:flex;border-radius:100%;font-size:0.875rem;line-height:1.5;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;line-height:1;color:var(--calcite-ui-text-3);-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;background:none;-webkit-box-shadow:0 0 0 2px transparent, 0 0 0 0px transparent;box-shadow:0 0 0 2px transparent, 0 0 0 0px transparent;opacity:0.4}.text{margin:1px 0 0 1px}:host([scale=s]){padding:2px 0px}:host([scale=s]) .day{height:27px;width:27px;font-size:12px}:host([scale=m]){padding:4px 4px}:host([scale=m]) .day{height:33px;width:33px;font-size:14px}:host([scale=l]){padding:4px 4px}:host([scale=l]) .day{height:43px;width:43px;font-size:16px}:host([current-month]) .day{opacity:1}:host([disabled]){cursor:default;pointer-events:none;opacity:0.2}:host(:hover) .day,:host([active]) .day{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:focus) .day{-webkit-box-shadow:0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}:host([selected]) .day{background-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-foreground-1);font-weight:500}";

const CalciteDateDay = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteDaySelect = createEvent(this, "calciteDaySelect", 7);
        /** Date is outside of range and can't be selected */
        this.disabled = false;
        /** Date is in the current month. */
        this.currentMonth = false;
        /** Date is the current selected date of the picker */
        this.selected = false;
        /** Date is actively in focus for keyboard navigation */
        this.active = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick() {
        !this.disabled && this.calciteDaySelect.emit();
    }
    keyDownHandler(e) {
        const key = getKey(e.key);
        if (key === " " || key === "Enter") {
            !this.disabled && this.calciteDaySelect.emit();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const intl = new Intl.NumberFormat(this.locale);
        return (h(Host, { role: "gridcell", tabindex: this.selected || this.active ? 0 : -1 }, h("span", { class: "day" }, h("span", { class: "text" }, intl.format(this.day)))));
    }
    get el() { return this; }
    static get style() { return calciteDateDayCss; }
};

const calciteDateMonthCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}.calender{padding-bottom:4px}.week-headers{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;border-top:1px solid var(--calcite-ui-border-3);padding:0 4px}.week-header{color:var(--calcite-ui-text-3);font-weight:600;width:calc(100% / 7);text-align:center}:host([scale=s]) .week-header{font-size:12px;padding:16px 0 16px 0}:host([scale=m]) .week-header{font-size:12px;padding:24px 0 20px 0}:host([scale=l]) .week-header{font-size:14px;padding:32px 0 24px 0}.week-days{outline:none;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;padding:0 3px}";

const CalciteDateMonth = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteDateSelect = createEvent(this, "calciteDateSelect", 7);
        this.calciteActiveDateChange = createEvent(this, "calciteActiveDateChange", 7);
        /** Date currently active.*/
        this.activeDate = new Date();
        /** User's language and region as BCP 47 formatted string. */
        this.locale = "en-US";
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
        const isRTL = this.el.dir === "rtl";
        switch (getKey(e.key)) {
            case "ArrowUp":
                e.preventDefault();
                this.addDays(-7);
                break;
            case "ArrowRight":
                e.preventDefault();
                this.addDays(isRTL ? -1 : 1);
                break;
            case "ArrowDown":
                e.preventDefault();
                this.addDays(7);
                break;
            case "ArrowLeft":
                e.preventDefault();
                this.addDays(isRTL ? 1 : -1);
                break;
            case "PageUp":
                e.preventDefault();
                this.addMonths(-1);
                break;
            case "PageDown":
                e.preventDefault();
                this.addMonths(1);
                break;
            case "Home":
                e.preventDefault();
                this.activeDate.setDate(1);
                this.addDays();
                break;
            case "End":
                e.preventDefault();
                this.activeDate.setDate(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate());
                this.addDays();
                break;
            case "Enter":
            case " ":
                e.preventDefault();
                this.calciteDateSelect.emit(this.activeDate);
                break;
            case "Tab":
                this.activeFocus = false;
        }
    }
    /**
     * Once user is not interacting via keyboard,
     * disable auto focusing of active date
     */
    disableActiveFocus() {
        this.activeFocus = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const month = this.activeDate.getMonth();
        const year = this.activeDate.getFullYear();
        const startOfWeek = getFirstDayOfWeek(this.locale);
        const weekDays = getLocalizedWeekdays(this.locale, this.scale === "s" ? "narrow" : "short");
        const curMonDays = this.getCurrentMonthDays(month, year);
        const prevMonDays = this.getPrevMonthdays(month, year, startOfWeek);
        const nextMonDays = this.getNextMonthDays(month, year, startOfWeek);
        const days = [
            ...prevMonDays.map((day) => {
                const date = new Date(year, month - 1, day);
                return (h("calcite-date-day", { scale: this.scale, day: day, disabled: !inRange(date, this.min, this.max), selected: sameDate(date, this.selectedDate), onCalciteDaySelect: () => this.calciteDateSelect.emit(date), locale: this.locale }));
            }),
            ...curMonDays.map((day) => {
                const date = new Date(year, month, day);
                const active = sameDate(date, this.activeDate);
                return (h("calcite-date-day", { scale: this.scale, day: day, disabled: !inRange(date, this.min, this.max), selected: sameDate(date, this.selectedDate), active: active, onCalciteDaySelect: () => this.calciteDateSelect.emit(date), locale: this.locale, ref: (el) => {
                        // when moving via keyboard, focus must be updated on active date
                        if (active && this.activeFocus) {
                            el === null || el === void 0 ? void 0 : el.focus();
                        }
                    }, "current-month": true }));
            }),
            ...nextMonDays.map((day) => {
                const date = new Date(year, month + 1, day);
                return (h("calcite-date-day", { scale: this.scale, day: day, disabled: !inRange(date, this.min, this.max), selected: sameDate(date, this.selectedDate), onCalciteDaySelect: () => this.calciteDateSelect.emit(date), locale: this.locale }));
            }),
        ];
        const weeks = [];
        for (let i = 0; i < days.length; i += 7) {
            weeks.push(days.slice(i, i + 7));
        }
        return (h(Host, null, h("div", { class: "calender", role: "grid" }, h("div", { class: "week-headers", role: "row" }, weekDays.map((weekday) => (h("span", { class: "week-header", role: "columnheader" }, weekday)))), weeks.map((days) => (h("div", { class: "week-days", role: "row" }, days))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Add n months to the current month
     */
    addMonths(step) {
        const nextDate = new Date(this.activeDate);
        nextDate.setMonth(this.activeDate.getMonth() + step);
        this.calciteActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
        this.activeFocus = true;
    }
    /**
     * Add n days to the current date
     */
    addDays(step = 0) {
        const nextDate = new Date(this.activeDate);
        nextDate.setDate(this.activeDate.getDate() + step);
        this.calciteActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
        this.activeFocus = true;
    }
    /**
     * Get dates for last days of the previous month
     */
    getPrevMonthdays(month, year, startOfWeek) {
        const lastDate = new Date(year, month, 0);
        const date = lastDate.getDate();
        const day = lastDate.getDay();
        const days = [];
        if (day - 6 === startOfWeek) {
            return days;
        }
        for (let i = lastDate.getDay(); i >= startOfWeek; i--) {
            days.push(date - i);
        }
        return days;
    }
    /**
     * Get dates for the current month
     */
    getCurrentMonthDays(month, year) {
        const num = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < num; i++) {
            days.push(i + 1);
        }
        return days;
    }
    /**
     * Get dates for first days of the next month
     */
    getNextMonthDays(month, year, startOfWeek) {
        const endDay = new Date(year, month + 1, 0).getDay();
        const days = [];
        if (endDay === (startOfWeek + 6) % 7) {
            return days;
        }
        for (let i = 0; i < (6 - (endDay - startOfWeek)) % 7; i++) {
            days.push(i + 1);
        }
        return days;
    }
    get el() { return this; }
    static get style() { return calciteDateMonthCss; }
};

const calciteDateMonthHeaderCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}.header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;padding:0 3px}:host([scale=s]) .text{font-size:14px}:host([scale=s]) .chevron{height:38px}:host([scale=m]) .text{font-size:16px}:host([scale=m]) .chevron{height:48px}:host([scale=l]) .text{font-size:18px}:host([scale=l]) .chevron{height:64px}.chevron{color:var(--calcite-ui-text-2);-ms-flex-positive:0;flex-grow:0;width:calc(100% / 7);-webkit-box-sizing:content-box;box-sizing:content-box;outline:none;padding:0 4px;margin:0 -3px;border:none;background-color:var(--calcite-ui-foreground-1);cursor:pointer;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.chevron:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.chevron:hover,.chevron:focus{fill:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-2)}.chevron:active{background-color:var(--calcite-ui-foreground-3)}.chevron[disabled]{pointer-events:none;opacity:0}.text{-ms-flex:1 1 auto;flex:1 1 auto;display:block;line-height:1;margin:auto 0;text-align:center}.month,.year{color:var(--calcite-ui-text-1);background:var(--calcite-ui-foreground-1);font-size:inherit;font-weight:500;margin:0 4px}.year{font-family:inherit;text-align:center;border:none;width:3em;padding:0;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.year:hover{-webkit-transition:outline-color 100ms ease-in-out;transition:outline-color 100ms ease-in-out;outline:2px solid var(--calcite-ui-border-2);outline-offset:2px}.year:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}";

const CalciteDateMonthHeader = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteActiveDateChange = createEvent(this, "calciteActiveDateChange", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const activeMonth = this.activeDate.getMonth();
        const localizedMonth = getMonths(this.locale)[activeMonth];
        const localizedYear = getYear(this.activeDate, this.locale);
        const iconScale = this.scale === "l" ? "m" : "s";
        const dir = getElementDir(this.el);
        const nextMonthDate = dateFromRange(nextMonth(this.activeDate), this.min, this.max);
        const prevMonthDate = dateFromRange(prevMonth(this.activeDate), this.min, this.max);
        return (h(Host, { dir: dir }, h("div", { class: "header", "aria-hidden": "true" }, h("button", { class: "chevron", "aria-label": this.intlPrevMonth, disabled: prevMonthDate.getMonth() === activeMonth, onClick: () => this.calciteActiveDateChange.emit(prevMonthDate) }, h("calcite-icon", { icon: "chevron-left", scale: iconScale, mirrored: true, dir: dir })), h("div", { class: "text" }, h("span", { class: "month", role: "heading" }, localizedMonth), h("input", { class: "year", type: "text", inputmode: "numeric", maxlength: "4", minlength: "4", pattern: "\\d*", value: `${localizedYear.slice(-4)}`, onKeyDown: (event) => this.onYearKey(event), onChange: (event) => this.setYear(event.target.value), ref: (el) => (this.yearInput = el) })), h("button", { class: "chevron", "aria-label": this.intlNextMonth, disabled: nextMonthDate.getMonth() === activeMonth, onClick: () => this.calciteActiveDateChange.emit(nextMonthDate) }, h("calcite-icon", { icon: "chevron-right", scale: iconScale, mirrored: true, dir: dir })))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Increment year on UP/DOWN keys
     */
    onYearKey(e) {
        const year = e.target.value;
        switch (getKey(e.key)) {
            case "ArrowDown":
                e.preventDefault();
                this.setYear(year, -1);
                break;
            case "ArrowUp":
                e.preventDefault();
                this.setYear(year, 1);
                break;
        }
    }
    /**
     * Parse localized year string from input,
     * set to active if in range
     */
    setYear(localizedYear, increment = 0) {
        const { min, max, activeDate, locale, yearInput } = this;
        const parsedYear = parseInt(replaceArabicNumerals(localizedYear));
        const length = parsedYear.toString().length;
        const offset = getLocaleFormatData(locale).buddhist ? 543 : 0;
        const year = isNaN(parsedYear) ? false : parsedYear - offset + increment;
        const inRange = year &&
            (!min || min.getFullYear() <= year) &&
            (!max || max.getFullYear() >= year);
        // if you've supplied a year and it's in range, update active date
        if (year && inRange && length === localizedYear.length && length > 3) {
            const nextDate = new Date(activeDate);
            nextDate.setFullYear(year);
            const inRangeDate = dateFromRange(nextDate, min, max);
            this.calciteActiveDateChange.emit(inRangeDate);
            yearInput.value = getYear(inRangeDate, locale).slice(-4);
        }
        else {
            // leave the current active date and clean up garbage input
            yearInput.value = getYear(activeDate, locale).slice(-4);
        }
    }
    get el() { return this; }
    static get style() { return calciteDateMonthHeaderCss; }
};

const calciteDropdownCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([width=s]){--calcite-dropdown-width:12.5em}:host([width=m]){--calcite-dropdown-width:15em}:host([width=l]){--calcite-dropdown-width:20em}:host([scale=s]){--calcite-dropdown-group-padding:0.5rem 0;--calcite-dropdown-item-padding:0.3rem 1rem 0.3rem 2.25rem}:host([scale=m]){--calcite-dropdown-group-padding:0.75rem 0;--calcite-dropdown-item-padding:0.5rem 1rem 0.5rem 2.25rem}:host([scale=l]){--calcite-dropdown-group-padding:1rem 0;--calcite-dropdown-item-padding:0.75rem 1rem 0.75rem 2.25rem}:host([dir=rtl][scale=s]){--calcite-dropdown-item-padding:0.3rem 2.25rem 0.3rem 1rem}:host([dir=rtl][scale=m]){--calcite-dropdown-item-padding:0.5rem 2.25rem 0.5rem 1rem}:host([dir=rtl][scale=l]){--calcite-dropdown-item-padding:0.75rem 2.25rem 0.75rem 1rem}:host{position:relative;display:inline-block}:host([disabled]){pointer-events:none;opacity:0.4}:host([active]) .calcite-dropdown-wrapper{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);opacity:1;max-height:90vh;overflow-y:auto;visibility:visible;pointer-events:initial}:host .calcite-dropdown-wrapper{-webkit-transform:translate3d(0, -1.5rem, 0);transform:translate3d(0, -1.5rem, 0);-webkit-transition:all 0.15s ease-in-out, max-height 0.15s;transition:all 0.15s ease-in-out, max-height 0.15s;visibility:hidden;opacity:0;display:block;position:absolute;left:0;z-index:200;overflow:hidden;max-height:0;width:auto;width:var(--calcite-dropdown-width);background:var(--calcite-ui-foreground-1);border-radius:var(--calcite-border-radius);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);pointer-events:none}:host([dir=rtl]) .calcite-dropdown-wrapper{right:0;left:unset}:host([alignment=end]) .calcite-dropdown-wrapper{right:0;left:unset}:host([dir=rtl][alignment=end]) .calcite-dropdown-wrapper{right:unset;left:0}:host([alignment=center]) .calcite-dropdown-wrapper{right:0;left:50%;-webkit-transform:translate3d(0, -1.5rem, 0) translateX(-50%);transform:translate3d(0, -1.5rem, 0) translateX(-50%)}:host([alignment=center][active]) .calcite-dropdown-wrapper{-webkit-transform:translate3d(0, 0, 0) translateX(-50%);transform:translate3d(0, 0, 0) translateX(-50%)}:host([alignment=center][dir=rtl]) .calcite-dropdown-wrapper{right:50%;left:0;-webkit-transform:translate3d(0, -1.5rem, 0) translateX(50%);transform:translate3d(0, -1.5rem, 0) translateX(50%)}:host([alignment=center][dir=rtl][active]) .calcite-dropdown-wrapper{-webkit-transform:translate3d(0, 0, 0) translateX(50%);transform:translate3d(0, 0, 0) translateX(50%)}";

const CalciteDropdown = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
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
        /** specify whether the dropdown is opened by hover or click of a trigger element */
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
        this.triggers = Array.from(this.el.querySelectorAll("[slot=dropdown-trigger]"));
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
                maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : ""
            } }, h("slot", null))));
    }
    openDropdown(e) {
        if (this.triggers.includes(e.target) ||
            this.triggers.some((trigger) => trigger.contains(e.target))) {
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
        if (this.triggers.includes(e.target) ||
            this.triggers.some((trigger) => trigger.contains(e.target))) {
            if (e.target.nodeName !== "BUTTON" && e.target.nodeName !== "CALCITE-BUTTON") {
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
        if (!this.disableCloseOnSelect || event.detail.requestedDropdownGroup.selectionMode === "none")
            this.closeCalciteDropdown();
    }
    registerCalciteDropdownGroup(e) {
        const { detail: { items, position, titleEl } } = e;
        this.items.push({
            items,
            position,
            titleEl
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
        focusElement(this.triggers[0]);
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
    get el() { return this; }
    static get style() { return calciteDropdownCss; }
};

const calciteDropdownGroupCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host-context([scale=s]){--calcite-dropdown-group-padding:0.5rem 0}:host-context([scale=m]){--calcite-dropdown-group-padding:0.75rem 0}:host-context([scale=l]){--calcite-dropdown-group-padding:1rem 0}:host .dropdown-title{display:block;margin:0 1rem -1px 1rem;padding:var(--calcite-dropdown-group-padding);border-bottom:1px solid var(--calcite-ui-border-3);color:var(--calcite-ui-text-2);font-weight:600;word-wrap:break-word;cursor:default;font-size:0.875rem;line-height:1.5}";

const CalciteDropdownGroup = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
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
    get el() { return this; }
    static get style() { return calciteDropdownGroupCss; }
};

const calciteDropdownItemCss = "@charset \"UTF-8\";:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host-context([scale=s]){--calcite-dropdown-item-padding:0.3rem 1rem 0.3rem 2.25rem}:host-context([scale=m]){--calcite-dropdown-item-padding:0.5rem 1rem 0.5rem 2.25rem}:host-context([scale=l]){--calcite-dropdown-item-padding:0.75rem 1rem 0.75rem 2.25rem}:host-context([dir=rtl][scale=s]){--calcite-dropdown-item-padding:0.3rem 2.25rem 0.3rem 1rem}:host-context([dir=rtl][scale=m]){--calcite-dropdown-item-padding:0.5rem 2.25rem 0.5rem 1rem}:host-context([dir=rtl][scale=l]){--calcite-dropdown-item-padding:0.75rem 2.25rem 0.75rem 1rem}:host{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;font-size:0.875rem;line-height:1.5;color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;padding:var(--calcite-dropdown-item-padding);cursor:pointer;text-decoration:none;outline:none;position:relative}:host:before{content:\"•\";position:absolute;left:1rem;opacity:0;color:var(--calcite-ui-border-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host,:host([islink]) a{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus),:host([islink]) a:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([islink]){padding:0}:host([islink]) a{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;font-size:0.875rem;line-height:1.5;color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;padding:var(--calcite-dropdown-item-padding);cursor:pointer;text-decoration:none;outline:none;position:relative}:host([islink]) a:before{content:\"•\";position:absolute;left:1rem;opacity:0;color:var(--calcite-ui-border-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host(:hover),:host(:active){background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);text-decoration:none}:host(:focus){color:var(--calcite-ui-text-1);text-decoration:none}:host(:active){background-color:var(--calcite-ui-foreground-3)}:host(:hover):before,:host(:active):before,:host(:focus):before{opacity:1}:host([dir=rtl]):before{left:unset;right:1rem}:host([active]:not([selection-mode=none])){color:var(--calcite-ui-text-1);font-weight:500}:host([active]:not([selection-mode=none])):before{opacity:1;color:var(--calcite-ui-blue-1)}:host([active]:not([selection-mode=none])) calcite-icon{color:var(--calcite-ui-blue-1)}:host([selection-mode=multi]):before,:host([selection-mode=none]):before{display:none}:host([selection-mode=none]:not([islink])),:host([selection-mode=none][isLink]) a{padding-left:1rem}:host([dir=rtl][selection-mode=none]:not([islink])),:host([dir=rtl][selection-mode=none][isLink]) a{padding-right:1rem}:host .dropdown-item-check-icon{position:absolute;left:0.8571428571rem;opacity:0;-webkit-transform:scale(0.9);transform:scale(0.9);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([dir=rtl]) .dropdown-item-check-icon{left:unset;right:0.8571428571rem}:host(:hover) .dropdown-item-check-icon{color:var(--calcite-ui-border-1);opacity:1}:host([active]) .dropdown-item-check-icon{color:var(--calcite-ui-blue-1);opacity:1}:host .dropdown-item-icon-start{margin-right:1rem}:host .dropdown-item-icon-end{margin-left:auto;padding-left:1rem}:host([dir=rtl]) calcite-icon{margin-right:0;margin-left:1rem}:host([dir=rtl]) .dropdown-item-icon-start{margin-left:1rem;margin-right:0}:host([dir=rtl]) .dropdown-item-icon-end{margin-right:auto;padding-right:1rem;margin-left:0;padding-left:0}";

const CalciteDropdownItem = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
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
    get el() { return this; }
    static get style() { return calciteDropdownItemCss; }
};

function gen(counts) {
    return counts
        .map(count => {
        let out = "";
        for (let i = 0; i < count; i++) {
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    })
        .join("-");
}
const guid = () => gen([2, 1, 1, 1, 3]);

/**
 * Math.sign not supported in IE
 */
function sign(x) {
    return x < 0 ? -1 : 1;
}
/**
 * Calculate slope of the tangents
 * uses Steffen interpolation as it's monotonic
 * http://jrwalsh1.github.io/posts/interpolations/
 */
function slope(p0, p1, p2) {
    const dx = p1[0] - p0[0];
    const dx1 = p2[0] - p1[0];
    const dy = p1[1] - p0[1];
    const dy1 = p2[1] - p1[1];
    const m = dy / (dx || (dx1 < 0 && 0));
    const m1 = dy1 / (dx1 || (dx < 0 && 0));
    const p = (m * dx1 + m1 * dx) / (dx + dx1);
    return ((sign(m) + sign(m1)) *
        Math.min(Math.abs(m), Math.abs(m1), 0.5 * Math.abs(p)) || 0);
}
/**
 * Calculate slope for just one tangent (single-sided)
 */
function slopeSingle(p0, p1, m) {
    const dx = p1[0] - p0[0];
    const dy = p1[1] - p0[1];
    return dx ? ((3 * dy) / dx - m) / 2 : m;
}
/**
 * Given two points and their tangent slopes,
 * calculate the bezier handle coordinates and return draw command.
 *
 * Translates Hermite Spline to Beziér curve:
 * stackoverflow.com/questions/42574940/
 */
function bezier(p0, p1, m0, m1, t) {
    const [x0, y0] = p0;
    const [x1, y1] = p1;
    const dx = (x1 - x0) / 3;
    const h1 = t([x0 + dx, y0 + dx * m0]).join(",");
    const h2 = t([x1 - dx, y1 - dx * m1]).join(",");
    const p = t([x1, y1]).join(",");
    return `C ${h1} ${h2} ${p}`;
}
/**
 * Generate a function which will translate a point
 * from the data coordinate space to svg viewbox oriented pixels
 */
function translate({ width, height, min, max, }) {
    const rangeX = max[0] - min[0];
    const rangeY = max[1] - min[1];
    return (point) => {
        const x = (point[0] / rangeX) * width;
        const y = height - (point[1] / rangeY) * height;
        return [x, y];
    };
}
/**
 * Get the min and max values from the dataset
 */
function range(data) {
    const [startX, startY] = data[0];
    const min = [startX, startY];
    const max = [startX, startY];
    return data.reduce(({ min, max }, [x, y]) => ({
        min: [Math.min(min[0], x), Math.min(min[1], y)],
        max: [Math.max(max[0], x), Math.max(max[1], y)],
    }), { min, max });
}
/**
 * Generate drawing commands for an area graph
 * returns a string can can be passed directly to a path element's `d` attribute
 */
function area({ data, min, max, t }) {
    if (data.length === 0) {
        return "";
    }
    // important points for beginning and ending the path
    const [startX, startY] = t(data[0]);
    const [minX, minY] = t(min);
    const [maxX] = t(max);
    // keep track of previous slope/points
    let m;
    let p0;
    let p1;
    // iterate over data points, calculating command for each
    const commands = data.reduce((acc, point, i) => {
        p0 = data[i - 2];
        p1 = data[i - 1];
        if (i > 1) {
            const m1 = slope(p0, p1, point);
            const m0 = m === undefined ? slopeSingle(p0, p1, m1) : m;
            const command = bezier(p0, p1, m0, m1, t);
            m = m1;
            return `${acc} ${command}`;
        }
        return acc;
    }, `M ${minX},${minY} L ${minX},${startY} L ${startX},${startY}`);
    // close the path
    const last = data[data.length - 1];
    const end = bezier(p1, last, m, slopeSingle(p1, last, m), t);
    return `${commands} ${end} L ${maxX},${minY} Z`;
}

const calciteGraphCss = ":host([hidden]){display:none}.svg{fill:currentColor;stroke:transparent;margin:0;padding:0;display:block}";

const CalciteGraph = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Array of tuples describing a single data point ([x, y])
         * These data points should be sorted by x-axis value
         */
        this.data = [];
        /** Width of graph in pixels*/
        this.width = 300;
        /** Width of graph in pixels*/
        this.height = 100;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.maskId = `calcite-graph-mask-${guid()}`;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        const { data, width, height, highlightMax, highlightMin } = this;
        const id = this.maskId;
        // if we have no data, return empty svg
        if (!data || data.length === 0) {
            return (h("svg", { preserveAspectRatio: "none", class: "svg", viewBox: `0 0 ${width} ${height}`, width: width, height: height }));
        }
        const { min, max } = range(data);
        const t = translate({ min, max, width, height });
        const [hMinX] = t([highlightMin, max[1]]);
        const [hMaxX] = t([highlightMax, max[1]]);
        const areaPath = area({ data, min, max, t });
        return (h("svg", { preserveAspectRatio: "none", class: "svg", viewBox: `0 0 ${width} ${height}`, width: width, height: height }, highlightMin !== undefined ? (h("svg", { preserveAspectRatio: "none", class: "svg", viewBox: `0 0 ${width} ${height}`, width: width, height: height }, h("mask", { id: `${id}1`, x: "0%", y: "0%", width: "100%", height: "100%" }, h("path", { fill: "white", d: `
              M 0,0
              L ${hMinX - 1},0
              L ${hMinX - 1},${height}
              L 0,${height}
              Z
            ` })), h("mask", { id: `${id}2`, x: "0%", y: "0%", width: "100%", height: "100%" }, h("path", { fill: "white", d: `
              M ${hMinX + 1},0
              L ${hMaxX - 1},0
              L ${hMaxX - 1},${height}
              L ${hMinX + 1}, ${height}
              Z
            ` })), h("mask", { id: `${id}3`, x: "0%", y: "0%", width: "100%", height: "100%" }, h("path", { fill: "white", d: `
                  M ${hMaxX + 1},0
                  L ${width},0
                  L ${width},${height}
                  L ${hMaxX + 1}, ${height}
                  Z
                ` })), h("path", { d: areaPath, class: "graph-path", mask: `url(#${id}1)` }), h("path", { d: areaPath, class: "graph-path--highlight", mask: `url(#${id}2)` }), h("path", { d: areaPath, class: "graph-path", mask: `url(#${id}3)` }))) : (h("path", { d: areaPath, class: "graph-path" }))));
    }
    get el() { return this; }
    static get style() { return calciteGraphCss; }
};

const CSS$6 = {
    icon: "icon",
    mirrored: "mirrored"
};

/**
 * Icon data cache.
 * Exported for testing purposes.
 * @private
 */
const iconCache = {};
/**
 * Icon request cache.
 * Exported for testing purposes.
 * @private
 */
const requestCache = {};
const scaleToPx = {
    s: 16,
    m: 24,
    l: 32,
};
async function fetchIcon({ icon, scale, }) {
    const size = scaleToPx[scale];
    const name = normalizeIconName(icon);
    const filled = name.charAt(name.length - 1) === "F";
    const iconName = filled ? name.substring(0, name.length - 1) : name;
    const id = `${iconName}${size}${filled ? "F" : ""}`;
    if (iconCache[id]) {
        return iconCache[id];
    }
    if (!requestCache[id]) {
        requestCache[id] = fetch(getAssetPath(`./assets/${id}.json`))
            .then((resp) => resp.json())
            .catch(() => {
            console.error(`"${id}" is not a valid calcite-ui-icon name`);
            return "";
        });
    }
    const path = await requestCache[id];
    iconCache[id] = path;
    return path;
}
/**
 * Normalize the icon name to match the path data module exports.
 * Exported for testing purposes.
 * @private
 */
function normalizeIconName(name) {
    const numberLeadingName = !isNaN(Number(name.charAt(0)));
    const parts = name.split("-");
    if (parts.length === 1) {
        return numberLeadingName ? `i${name}` : name;
    }
    return parts
        .map((part, index) => {
        if (index === 0) {
            return numberLeadingName ? `i${part.toUpperCase()}` : part;
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
    })
        .join("");
}

const calciteIconCss = ":host([hidden]){display:none}:host{display:-ms-inline-flexbox;display:inline-flex}.mirrored{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.svg{display:block}";

const CalciteIcon = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/.
         */
        this.icon = null;
        /**
         * When true, the icon will be mirrored when the element direction is 'rtl'.
         */
        this.mirrored = false;
        /**
         * Icon scale. Can be "s" | "m" | "l".
         */
        this.scale = "m";
        this.visible = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.waitUntilVisible(() => {
            this.visible = true;
            this.loadIconPathData();
        });
    }
    disconnectedCallback() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
        }
    }
    async componentWillLoad() {
        this.loadIconPathData();
    }
    render() {
        const { el, mirrored, pathData, scale, textLabel } = this;
        const dir = getElementDir(el);
        const size = scaleToPx[scale];
        const semantic = !!textLabel;
        const paths = [].concat(pathData || "");
        return (h(Host, { "aria-label": semantic ? textLabel : null, role: semantic ? "img" : null }, h("svg", { class: {
                [CSS$6.mirrored]: dir === "rtl" && mirrored,
                svg: true,
            }, xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", height: size, width: size, viewBox: `0 0 ${size} ${size}` }, paths.map((path) => typeof path === "string" ? (h("path", { d: path })) : (h("path", { d: path.d, opacity: "opacity" in path ? path.opacity : 1 }))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    async loadIconPathData() {
        const { icon, scale, visible } = this;
        if (!Build.isBrowser || !icon || !visible) {
            return;
        }
        this.pathData = await fetchIcon({ icon, scale });
    }
    waitUntilVisible(callback) {
        if (!Build.isBrowser ||
            typeof window === "undefined" ||
            !window.IntersectionObserver) {
            callback();
            return;
        }
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.intersectionObserver.disconnect();
                    this.intersectionObserver = null;
                    callback();
                }
            });
        }, { rootMargin: "50px" });
        this.intersectionObserver.observe(this.el);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "icon": ["loadIconPathData"],
        "scale": ["loadIconPathData"]
    }; }
    static get style() { return calciteIconCss; }
};

const calciteInputCss = ":host([hidden]){display:none}calcite-input[scale=s] textarea,calcite-input[scale=s] input,calcite-input[scale=s] .calcite-input-prefix,calcite-input[scale=s] .calcite-input-suffix{padding:8px;font-size:12px;height:32px}calcite-input[scale=s] textarea{min-height:32px}calcite-input[scale=s] .calcite-input-number-button-wrapper,calcite-input[scale=s] .calcite-input-action-wrapper calcite-button,calcite-input[scale=s] .calcite-input-action-wrapper calcite-button button{height:32px}calcite-input[scale=s] textarea,calcite-input[scale=s] input[type=file]{height:auto}calcite-input[scale=m] textarea,calcite-input[scale=m] input,calcite-input[scale=m] .calcite-input-prefix,calcite-input[scale=m] .calcite-input-suffix{padding:12px;font-size:16px;height:44px}calcite-input[scale=m] textarea{min-height:44px}calcite-input[scale=m] .calcite-input-number-button-wrapper,calcite-input[scale=m] .calcite-input-action-wrapper calcite-button,calcite-input[scale=m] .calcite-input-action-wrapper calcite-button button{height:44px}calcite-input[scale=m] textarea,calcite-input[scale=m] input[type=file]{height:auto}calcite-input[scale=l] textarea,calcite-input[scale=l] input,calcite-input[scale=l] .calcite-input-prefix,calcite-input[scale=l] .calcite-input-suffix{padding:16px;font-size:20px;height:56px}calcite-input[scale=l] textarea{min-height:56px}calcite-input[scale=l] .calcite-input-number-button-wrapper,calcite-input[scale=l] .calcite-input-action-wrapper calcite-button,calcite-input[scale=l] .calcite-input-action-wrapper calcite-button button{height:56px}calcite-input[scale=l] textarea,calcite-input[scale=l] input[type=file]{height:auto}calcite-input[disabled] textarea,calcite-input[disabled] input{pointer-events:none;opacity:0.4}calcite-input textarea,calcite-input input{display:-ms-flexbox;display:flex;position:relative;min-width:20%;max-width:100%;max-height:100%;-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;font-family:inherit;-webkit-transition:150ms ease-in-out, height 0s;transition:150ms ease-in-out, height 0s;-webkit-box-shadow:0 0 0 0 transparent;box-shadow:0 0 0 0 transparent;outline:0;margin:0;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1);font-weight:400}calcite-input input[type=search]::-webkit-search-decoration{-webkit-appearance:none}calcite-input textarea,calcite-input input{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}calcite-input textarea:focus,calcite-input input:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}calcite-input input,calcite-input textarea{color:var(--calcite-ui-text-1);border:1px solid var(--calcite-ui-border-1)}calcite-input input:-ms-input-placeholder,calcite-input textarea:-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}calcite-input input::-ms-input-placeholder,calcite-input textarea::-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}calcite-input input::placeholder,calcite-input input:-ms-input-placeholder,calcite-input input::-ms-input-placeholder,calcite-input textarea::placeholder,calcite-input textarea:-ms-input-placeholder,calcite-input textarea::-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}calcite-input input:focus,calcite-input textarea:focus{border-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-text-1)}calcite-input input[readonly],calcite-input textarea[readonly]{background-color:var(--calcite-ui-background)}calcite-input input[readonly]:focus,calcite-input textarea[readonly]:focus{color:var(--calcite-ui-text-1)}calcite-input calcite-icon{color:var(--calcite-ui-text-1)}calcite-input slot:not[name=input-message]{display:block;margin-bottom:0.375rem;color:var(--calcite-ui-text-2);font-weight:500}calcite-input[icon] input{padding-left:2.25rem}calcite-input[dir=rtl][icon] input{padding-right:2.25rem;padding-left:0.75rem}calcite-input[dir=rtl][icon][scale=l] input{padding-right:3rem;padding-left:0.75rem}calcite-input[icon][scale=l] input{padding-left:3rem}.calcite-input-element-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex:1;flex:1;min-width:20%;position:relative;-ms-flex-order:3;order:3}.calcite-input-icon{display:block;position:absolute;pointer-events:none;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;top:calc(50% - 9px);left:0.75rem;margin:1px auto 0;z-index:1}calcite-input[scale=l] .calcite-input-icon{top:calc(50% - 12px)}calcite-input[dir=rtl] .calcite-input-icon{left:unset;right:0.75rem}input[type=text]::-ms-clear{display:none;width:0;height:0}input[type=text]::-ms-reveal{display:none;width:0;height:0}input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration,input[type=date]::-webkit-clear-button,input[type=time]::-webkit-clear-button{display:none}.calcite-input-clear-button{display:-ms-flexbox;display:flex;-ms-flex-item-align:stretch;align-self:stretch;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;min-height:100%;padding:0 0.75rem;border:1px solid var(--calcite-ui-border-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;pointer-events:initial;background-color:var(--calcite-ui-foreground-1);border-left:none;-ms-flex-order:4;order:4}.calcite-input-clear-button:hover,.calcite-input-clear-button:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input-clear-button:active{background-color:var(--calcite-ui-foreground-3)}.calcite-input-clear-button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.calcite-input-clear-button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.calcite-input-loading{display:block;pointer-events:none;position:absolute;top:1px;left:1px;right:1px}.calcite-input-action-wrapper{display:-ms-flexbox;display:flex;-ms-flex-order:7;order:7}.calcite-input-prefix,.calcite-input-suffix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;height:auto;min-height:100%;word-break:break-word;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;font-weight:500;border:1px solid var(--calcite-ui-border-1);background-color:var(--calcite-ui-background);color:var(--calcite-ui-text-2);line-height:1}.calcite-input-prefix{-ms-flex-order:2;order:2;border-right-width:0px}.calcite-input-suffix{-ms-flex-order:5;order:5;border-left-width:0px}calcite-input[dir=rtl] .calcite-input-prefix{border-right-width:1px;border-left-width:0px}calcite-input[dir=rtl] .calcite-input-suffix{border-left-width:1px;border-right-width:0px}calcite-input[readonly] .calcite-input-number-button-item{pointer-events:none}calcite-input[alignment=start] textarea,calcite-input[alignment=start] input{text-align:left}calcite-input[alignment=end] textarea,calcite-input[alignment=end] input{text-align:right}calcite-input[dir=rtl][alignment=start] textarea,calcite-input[dir=rtl][alignment=start] input{text-align:right}calcite-input[dir=rtl][alignment=end] textarea,calcite-input[dir=rtl][alignment=end] input{text-align:left}calcite-input input[type=number]::-webkit-inner-spin-button,calcite-input input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}calcite-input input[type=number]{-moz-appearance:textfield}.calcite-input-number-button-wrapper{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;box-sizing:border-box;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;pointer-events:none;-ms-flex-order:6;order:6}calcite-input[number-button-type=vertical] .calcite-input-wrapper{-ms-flex-direction:row;flex-direction:row;display:-ms-flexbox;display:flex}calcite-input[number-button-type=vertical] input,calcite-input[number-button-type=vertical] textarea{-ms-flex-order:2;order:2}calcite-input[dir=rtl][number-button-type=horizontal] .calcite-input-number-button-item[data-adjustment=down] calcite-icon{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}calcite-input[dir=rtl][number-button-type=horizontal] .calcite-input-number-button-item[data-adjustment=up] calcite-icon{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up],.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down]{min-height:100%;max-height:100%;-ms-flex-order:1;order:1;-ms-flex-item-align:auto;align-self:auto}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up] calcite-icon,.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down] calcite-icon{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down]{border-left:1px solid var(--calcite-ui-border-1);border-right:0px}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up]{-ms-flex-order:5;order:5}calcite-input[dir=rtl] .calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down]{border-right:1px solid var(--calcite-ui-border-1);border-left:0px}calcite-input[dir=rtl] .calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up]{border-left:1px solid var(--calcite-ui-border-1);border-right:0px}calcite-input[number-button-type=vertical] .calcite-input-number-button-item[data-adjustment=down]{border-top:0}.calcite-input-number-button-item{display:-ms-flexbox;display:flex;-ms-flex-item-align:center;align-self:center;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;max-height:50%;min-height:50%;padding:0 0.75rem;border:1px solid var(--calcite-ui-border-1);-webkit-transition:background-color 0.15s ease-in-out;transition:background-color 0.15s ease-in-out;pointer-events:initial;background-color:var(--calcite-ui-foreground-1);border-left:none}.calcite-input-number-button-item calcite-icon{pointer-events:none;width:14px;height:auto}.calcite-input-number-button-item:hover,.calcite-input-number-button-item:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input-number-button-item:active{background-color:var(--calcite-ui-foreground-3)}calcite-input[dir=rtl][number-button-type=vertical] .calcite-input-number-button-item{border-right:none;border-left:1px solid var(--calcite-ui-border-1)}.calcite-input-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative}calcite-input input::-webkit-calendar-picker-indicator{display:none}calcite-input input[type=date]::-webkit-input-placeholder{visibility:hidden !important}calcite-input textarea::-webkit-resizer{-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;bottom:0;right:0;padding:0 0.375rem}@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.calcite-input-resize-icon-wrapper{display:none}}.calcite-input-resize-icon-wrapper{background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3);position:absolute;z-index:1;bottom:2px;right:2px;pointer-events:none;width:16px;height:16px}.calcite-input-resize-icon-wrapper calcite-icon{bottom:4px;right:4px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}calcite-input[dir=rtl] calcite-input textarea::-webkit-resizer{left:0;right:unset}calcite-input[dir=rtl] .calcite-input-resize-icon{left:10px;right:unset;-webkit-transform:rotate(45deg);transform:rotate(45deg)}calcite-input[type=file] input,calcite-input[type=file] textarea{cursor:pointer;padding:1.5rem;border:1px dashed #d4d4d4;background-color:#f8f8f8;text-align:center}calcite-input[status=invalid] .calcite-input-icon{color:var(--calcite-ui-red-1)}calcite-input[status=valid] .calcite-input-icon{color:var(--calcite-ui-green-1)}calcite-input[status=idle] .calcite-input-icon{color:var(--calcite-ui-text-2)}";

const CalciteInput = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.calciteInputFocus = createEvent(this, "calciteInputFocus", 7);
        this.calciteInputBlur = createEvent(this, "calciteInputBlur", 7);
        this.calciteInputInput = createEvent(this, "calciteInputInput", 7);
        /** specify if the input is in loading state */
        this.loading = false;
        /** specify the alignment of the value of the input */
        this.alignment = "start";
        /** input value */
        this.value = "";
        /** for recognized input types, show an icon if applicable */
        this.icon = false;
        /** specify the input type */
        this.type = "text";
        /** specify the placement of the number buttons */
        this.numberButtonType = "vertical";
        /** is the input required */
        this.required = false;
        /** should the input autofocus */
        this.autofocus = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** keep track of the rendered child type */
        this.childElType = "input";
        /** determine if there is a slotted action for styling purposes */
        this.hasAction = false;
        /** track if the input is clearable */
        this.isClearable = false;
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        /** map icons to colors */
        this.iconTypeDefaults = {
            tel: "phone",
            password: "lock",
            email: "send",
            date: "calendar",
            time: "clock",
            search: "search",
        };
        this.updateNumberValue = (e) => {
            // todo, when dropping ie11 support, refactor to use stepup/stepdown
            // prevent blur and re-focus of input on mousedown
            e.preventDefault();
            if (this.childElType === "input" && this.type === "number") {
                let inputMax = this.maxString ? parseFloat(this.maxString) : null;
                let inputMin = this.minString ? parseFloat(this.minString) : null;
                let inputStep = this.stepString ? parseFloat(this.stepString) : 1;
                let inputVal = this.value && this.value !== "" ? parseFloat(this.value) : 0;
                switch (e.target.dataset.adjustment) {
                    case "up":
                        if ((!inputMax && inputMax !== 0) || inputVal < inputMax)
                            this.childEl.value = (inputVal += inputStep).toString();
                        break;
                    case "down":
                        if ((!inputMin && inputMin !== 0) || inputVal > inputMin)
                            this.childEl.value = (inputVal -= inputStep).toString();
                        break;
                }
                this.value = this.childEl.value.toString();
            }
        };
    }
    /** watcher to update number-to-string for min max */
    minWatcher() {
        this.minString = this.min.toString() || null;
    }
    maxWatcher() {
        this.maxString = this.max.toString() || null;
    }
    stepWatcher() {
        this.maxString = this.max.toString() || null;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let status = ["invalid", "valid", "idle"];
        let foundStatus = getElementProp(this.el, "status", "idle");
        if (!status.includes(this.status))
            this.status = !status.includes(foundStatus) ? "idle" : foundStatus;
        let scale = ["s", "m", "l"];
        let foundScale = getElementProp(this.el, "scale", "m");
        if (!scale.includes(this.scale)) {
            this.scale = !scale.includes(foundScale) ? "m" : foundScale;
        }
        let alignment = ["start", "end"];
        if (!alignment.includes(this.alignment))
            this.alignment = "start";
        let type = [
            "color",
            "date",
            "datetime-local",
            "email",
            "file",
            "image",
            "month",
            "number",
            "password",
            "search",
            "tel",
            "text",
            "textarea",
            "time",
            "url",
            "week",
        ];
        if (!type.includes(this.type))
            this.type = "text";
        let numberButtonType = ["vertical", "horizontal", "none"];
        if (!numberButtonType.includes(this.numberButtonType))
            this.numberButtonType = "vertical";
        // if an icon string is not provided, but icon is true and a default icon is present
        // for the requested type, set that as the icon
        let typesWithIcons = ["date", "email", "password", "search", "tel", "time"];
        this.icon = this.icon
            ? this.icon
            : this.icon !== false && typesWithIcons.includes(this.type)
                ? this.iconTypeDefaults[this.type]
                : false;
        this.determineClearable();
    }
    componentDidLoad() {
        var _a, _b, _c;
        this.minString = (_a = this.min) === null || _a === void 0 ? void 0 : _a.toString();
        this.maxString = (_b = this.max) === null || _b === void 0 ? void 0 : _b.toString();
        this.stepString = (_c = this.step) === null || _c === void 0 ? void 0 : _c.toString();
        this.slottedActionEl = this.el.querySelector("[slot=input-action]");
    }
    componentWillLoad() {
        this.childElType = this.type === "textarea" ? "textarea" : "input";
        this.hasAction = !!this.el.querySelector("[slot=input-action]");
    }
    componentWillUpdate() {
        this.calciteInputInput.emit({
            element: this.childEl,
            value: this.value,
        });
        this.determineClearable();
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const inputClearButton = (h("div", { class: "calcite-input-clear-button", onClick: () => this.clearInputValue() }, h("calcite-icon", { theme: this.theme, icon: "x", scale: "s" })));
        const loader = (h("div", { class: "calcite-input-loading" }, h("calcite-progress", { type: "indeterminate" })));
        const numberButtonClassModifier = this.numberButtonType === "horizontal"
            ? "number-button-item-horizontal"
            : null;
        const numberButtonsHorizontalUp = (h("div", { class: `calcite-input-number-button-item ${numberButtonClassModifier}`, onMouseDown: this.updateNumberValue, "data-adjustment": "up" }, h("calcite-icon", { theme: this.theme, icon: "chevron-up" })));
        const numberButtonsHorizontalDown = (h("div", { class: `calcite-input-number-button-item ${numberButtonClassModifier}`, onMouseDown: this.updateNumberValue, "data-adjustment": "down" }, h("calcite-icon", { theme: this.theme, icon: "chevron-down" })));
        const numberButtonsVertical = (h("div", { class: `calcite-input-number-button-wrapper` }, numberButtonsHorizontalUp, numberButtonsHorizontalDown));
        const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
        const iconEl = (h("calcite-icon", { class: "calcite-input-icon", scale: iconScale, theme: this.theme, icon: this.icon }));
        const inputAction = (h("div", { class: "calcite-input-action-wrapper" }, h("slot", { name: "input-action" })));
        const prefixText = (h("div", { class: "calcite-input-prefix" }, this.prefixText));
        const suffixText = (h("div", { class: "calcite-input-suffix" }, this.suffixText));
        const childEl = this.childElType !== "textarea" ? (h("input", Object.assign({}, attributes, { onBlur: () => this.inputBlurHandler(), onFocus: (e) => this.inputFocusHandler(e), onInput: (e) => this.inputInputHandler(e), type: this.type, min: this.minString, max: this.maxString, step: this.stepString, value: this.value, placeholder: this.placeholder || "", required: this.required ? true : null, autofocus: this.autofocus ? true : null, disabled: this.disabled ? true : null, tabIndex: this.disabled ? -1 : null, ref: (el) => (this.childEl = el) }))) : ([
            h("textarea", Object.assign({}, attributes, { onBlur: () => this.inputBlurHandler(), onFocus: (e) => this.inputFocusHandler(e), onInput: (e) => this.inputInputHandler(e), required: this.required ? true : null, placeholder: this.placeholder || "", autofocus: this.autofocus ? true : null, disabled: this.disabled ? true : null, tabIndex: this.disabled ? -1 : null, ref: (el) => (this.childEl = el) }), h("slot", null)),
            h("div", { class: "calcite-input-resize-icon-wrapper" }, h("calcite-icon", { icon: "chevron-down", scale: "s" })),
        ]);
        return (h(Host, { dir: dir, onClick: (e) => this.inputFocusHandler(e) }, h("div", { class: "calcite-input-wrapper" }, this.type === "number" && this.numberButtonType === "horizontal"
            ? numberButtonsHorizontalDown
            : null, this.prefixText ? prefixText : null, h("div", { class: "calcite-input-element-wrapper" }, childEl, this.isClearable ? inputClearButton : null, this.icon ? iconEl : null, this.loading ? loader : null), this.hasAction ? inputAction : null, this.type === "number" && this.numberButtonType === "vertical"
            ? numberButtonsVertical
            : null, this.suffixText ? suffixText : null, this.type === "number" && this.numberButtonType === "horizontal"
            ? numberButtonsHorizontalUp
            : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleLabelFocus(e) {
        if (e.detail.labelEl.contains(this.el) ||
            e.detail.labelEl.shadowRoot.contains(this.el) ||
            e.detail.requestedInput === this.el.id) {
            this.childEl.focus();
        }
    }
    keyDownHandler(e) {
        if (this.isClearable && getKey(e.key) === "Escape") {
            this.clearInputValue();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** focus the rendered child element */
    async setFocus() {
        var _a;
        (_a = this.childEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    inputInputHandler(e) {
        this.value = e.target.value;
        this.calciteInputInput.emit({
            element: this.childEl,
            value: this.value,
        });
    }
    inputBlurHandler() {
        this.calciteInputBlur.emit({
            element: this.childEl,
            value: this.value,
        });
    }
    inputFocusHandler(e) {
        if (e.target !== this.slottedActionEl)
            this.setFocus();
        this.calciteInputFocus.emit({
            element: this.childEl,
            value: this.value,
        });
    }
    determineClearable() {
        this.isClearable =
            this.type !== "textarea" &&
                (this.clearable ||
                    this.type === "search" ||
                    this.type === "time" ||
                    this.type === "date") &&
                this.value.length > 0;
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = [
            "alignment",
            "dir",
            "clearable",
            "min",
            "max",
            "step",
            "value",
            "icon",
            "loading",
            "prefix-text",
            "scale",
            "status",
            "suffix-text",
            "theme",
            "number-button-type",
        ];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    clearInputValue() {
        this.value = "";
    }
    get el() { return this; }
    static get watchers() { return {
        "min": ["minWatcher"],
        "max": ["maxWatcher"],
        "step": ["stepWatcher"]
    }; }
    static get style() { return calciteInputCss; }
};

const calciteInputMessageCss = ":host([hidden]){display:none}:host([scale=s]){--calcite-input-message-spacing-value:4px}:host([scale=s]) .calcite-input-message-icon{margin-top:-2px}:host([scale=m]){--calcite-input-message-spacing-value:8px}:host([scale=l]){--calcite-input-message-spacing-value:12px}:host{--calcite-input-message-floating-background:rgba(255, 255, 255, 0.96)}:host([theme=dark]){--calcite-input-message-floating-background:rgba(43, 43, 43, 0.96)}:host{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-ui-text-2);font-weight:500;line-height:1.25;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;visibility:hidden;opacity:0;height:0;pointer-events:none}:host([active]){opacity:1;height:auto;visibility:visible;margin-top:var(--calcite-input-message-spacing-value)}:host([type=floating]){-webkit-transform:translate3d(0, -1.5rem, 0);transform:translate3d(0, -1.5rem, 0);background-color:var(--calcite-input-message-floating-background);position:absolute;width:100%;top:100%;left:0;right:0;height:auto;margin-top:-1.5rem;border-radius:var(--calcite-border-radius);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);padding:var(--calcite-input-message-spacing-value);z-index:101}:host([type=floating][active]){-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}.calcite-input-message-icon{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-negative:0;flex-shrink:0;pointer-events:none;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;margin:-1px 0.75rem 0 0;transition:150ms ease-in-out}:host([dir=rtl]) .calcite-input-message-icon{margin:-1px 0 0 0.75rem}:host([status=invalid]) .calcite-input-message-icon{color:var(--calcite-ui-red-1)}:host([status=valid]) .calcite-input-message-icon{color:var(--calcite-ui-green-1)}:host([status=idle]) .calcite-input-message-icon{color:var(--calcite-ui-blue-1)}:host([type=floating][active]){-webkit-animation:floatingMessagePulse 0.5s ease-in-out;animation:floatingMessagePulse 0.5s ease-in-out;-webkit-animation-iteration-count:1;animation-iteration-count:1}@-webkit-keyframes floatingMessagePulse{0%{top:100%}25%{top:110%}50%{top:100%}75%{top:105%}100%{top:100%}}@keyframes floatingMessagePulse{0%{top:100%}25%{top:110%}50%{top:100%}75%{top:105%}100%{top:100%}}";

const CalciteInputMessage = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) */
        this.type = "default";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        // icons for status and validation
        this.iconDefaults = {
            valid: "check-circle",
            invalid: "exclamation-mark-triangle",
            idle: "information",
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let statusOptions = ["invalid", "valid", "idle"];
        if (!statusOptions.includes(this.status))
            this.status = getElementProp(this.el.parentElement, "status", "idle");
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = getElementProp(this.el.parentElement, "scale", "m");
        let type = ["default", "floating"];
        if (!type.includes(this.type))
            this.type = "default";
    }
    componentWillUpdate() {
        this.iconEl = this.setIcon(this.iconDefaults[this.status]);
    }
    render() {
        const dir = getElementDir(this.el);
        this.iconEl = this.setIcon(this.iconDefaults[this.status]);
        return (h(Host, { theme: this.theme, dir: dir }, this.icon ? this.iconEl : null, h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    setIcon(iconName) {
        return (h("calcite-icon", { class: "calcite-input-message-icon", scale: "s", icon: iconName }));
    }
    get el() { return this; }
    static get style() { return calciteInputMessageCss; }
};

const calciteLabelCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]) label{font-size:var(--calcite-label-font-size, 12px);--calcite-label-spacing-value:8px}:host([scale=m]) label{font-size:var(--calcite-label-font-size, 16px);--calcite-label-spacing-value:12px}:host([scale=l]) label{font-size:var(--calcite-label-font-size, 20px);--calcite-label-spacing-value:16px}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:relative;text-align:left}:host([dir=rtl]){text-align:right}:host label{width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;cursor:pointer;margin:0 0 var(--calcite-label-margin-bottom, 1.5rem) 0}:host([layout=inline]) label{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}:host([layout=inline-space-between]) label{-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}:host([layout=default]) label .calcite-label-text{margin-bottom:8px}:host([layout=inline]) .calcite-label-text:first-child,:host([layout=inline-space-between]) .calcite-label-text:first-child{margin-right:0.75rem}:host([layout=inline]) .calcite-label-text:last-child,:host([layout=inline-space-between]) .calcite-label-text:last-child{margin-left:0.75rem}:host([status=invalid]) label{color:var(--calcite-ui-red-1)}:host([status=valid]) label{color:var(--calcite-ui-text-2)}:host([status=idle]) label{color:var(--calcite-ui-text-2)}";

const CalciteLabel = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteLabelFocus = createEvent(this, "calciteLabelFocus", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** specify the status of the label and any child input / input messages */
        this.status = "idle";
        /** specify the scale of the input, defaults to m */
        this.scale = "m";
        /** is the wrapped element positioned inline with the label slotted text */
        this.layout = "default";
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        // emit focus event and focus the requested input if available
        this.handleClick = (event) => {
            this.emitSelectedItem(event.target);
            if (this.requestedFor) {
                focusElement(document.getElementById(this.requestedFor));
            }
            else if (this.el.querySelector("textarea")) {
                this.el.querySelector("textarea").focus();
            }
            else if (this.el.querySelector("input")) {
                this.el.querySelector("input").focus();
            }
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        let status = ["invalid", "valid", "idle"];
        if (!status.includes(this.status))
            this.status = "idle";
        let layout = ["inline", "inline-space-between", "default"];
        if (!layout.includes(this.layout))
            this.layout = "default";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    componentDidLoad() {
        this.requestedFor = this.el.getAttribute("for");
        if (this.layout === "inline" || this.layout === "inline-space-between") {
            this.displayedSlottedContent = this.handleSlottedContent();
            this.slottedContent.innerHTML = "";
            this.displayedSlottedContent.map((item) => {
                this.slottedContent.append(item);
            });
        }
    }
    render() {
        const attributes = this.getAttributes();
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, onClick: this.handleClick }, h("label", Object.assign({}, attributes, { ref: (el) => (this.slottedContent = el) }), h("slot", null))));
    }
    // wrap slotted text nodes in span to handle spacing of inline and inline space between layouts
    handleSlottedContent() {
        let nodeList = [];
        let requestedSlottedContent = this.el.childNodes;
        // iterate over slotted nodes and wrap text nodes in span
        if (requestedSlottedContent) {
            requestedSlottedContent.forEach(function (item) {
                if (item.nodeName === "#text" && item.textContent.trim().length > 0) {
                    const node = document.createElement("span");
                    node.classList.add("calcite-label-text");
                    node.innerHTML = item.textContent.trim();
                    nodeList.push(node);
                }
                else if (item.nodeName !== "#text") {
                    nodeList.push(item);
                }
            });
        }
        return [...Array.from(new Set(nodeList))];
    }
    emitSelectedItem(target) {
        this.calciteLabelFocus.emit({
            labelEl: this.el,
            interactedEl: target,
            requestedInput: this.requestedFor,
        });
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = ["layout", "theme", "scale", "status"];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    get el() { return this; }
    static get style() { return calciteLabelCss; }
};

const calciteLinkCss = ":host([hidden]){display:none}:host{display:inline;--calcite-blue-accessible:#00619b;--calcite-red-accessible:#a82b1e;--calcite-link-blue-underline:rgba(0, 97, 155, 0.4);--calcite-link-red-underline:rgba(168, 43, 30, 0.4)}:host([theme=dark]){--calcite-blue-accessible:#00A0FF;--calcite-red-accessible:#FE583E;--calcite-link-blue-underline:rgba(0, 160, 255, 0.4);--calcite-link-red-underline:rgba(254, 88, 62, 0.4)}:host a,:host span{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;text-decoration:none;border-radius:0;border:none;line-height:inherit;font-size:inherit;font-family:inherit;-webkit-appearance:none;cursor:pointer;text-align:center;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host a:hover,:host span:hover{text-decoration:none}:host a,:host span{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host a:focus,:host span:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.calcite-link--icon{-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([disabled]){pointer-events:none}:host([disabled]) span,:host([disabled]) a{pointer-events:none;opacity:0.4}:host .calcite-link--icon.icon-start{margin-right:0.5rem}:host([dir=rtl]) .calcite-link--icon.icon-start{margin-right:0;margin-left:0.5rem}:host .calcite-link--icon.icon-end{margin-left:0.5rem}:host([dir=rtl]) .calcite-link--icon.icon-end{margin-left:0;margin-right:0.5rem}:host([color=blue]) span,:host([color=blue]) a{display:inline;padding:0;border:none;color:var(--calcite-blue-accessible);line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(var(--calcite-link-blue-underline)), to(var(--calcite-link-blue-underline)));background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-link-blue-underline), var(--calcite-link-blue-underline));background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=blue]) span:hover,:host([color=blue]) span:focus,:host([color=blue]) a:hover,:host([color=blue]) a:focus{color:var(--calcite-ui-blue-1);background-size:100% 1px, 100% 1px}:host([color=blue]) span:hover .calcite-link--icon,:host([color=blue]) span:focus .calcite-link--icon,:host([color=blue]) a:hover .calcite-link--icon,:host([color=blue]) a:focus .calcite-link--icon{fill:var(--calcite-ui-blue-1)}:host([color=blue]) span:active,:host([color=blue]) a:active{color:var(--calcite-blue-accessible);background-size:100% 2px, 100% 2px}:host([color=red]) span,:host([color=red]) a{display:inline;padding:0;border:none;color:var(--calcite-red-accessible);line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(var(--calcite-link-red-underline)), to(var(--calcite-link-red-underline)));background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-link-red-underline), var(--calcite-link-red-underline));background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=red]) span:hover,:host([color=red]) span:focus,:host([color=red]) a:hover,:host([color=red]) a:focus{color:var(--calcite-ui-red-1);background-size:100% 1px, 100% 1px}:host([color=red]) span:hover .calcite-link--icon,:host([color=red]) span:focus .calcite-link--icon,:host([color=red]) a:hover .calcite-link--icon,:host([color=red]) a:focus .calcite-link--icon{fill:var(--calcite-ui-red-1)}:host([color=red]) span:active,:host([color=red]) a:active{color:var(--calcite-red-accessible);background-size:100% 2px, 100% 2px}:host([color=light]) span,:host([color=light]) a{display:inline;padding:0;border:none;color:#f3f3f3;line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(#aaaaaa), to(#aaaaaa));background-image:linear-gradient(currentColor, currentColor), linear-gradient(#aaaaaa, #aaaaaa);background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=light]) span:hover,:host([color=light]) span:focus,:host([color=light]) a:hover,:host([color=light]) a:focus{color:#ffffff;background-size:100% 1px, 100% 1px}:host([color=light]) span:hover .calcite-link--icon,:host([color=light]) span:focus .calcite-link--icon,:host([color=light]) a:hover .calcite-link--icon,:host([color=light]) a:focus .calcite-link--icon{fill:#ffffff}:host([color=light]) span:active,:host([color=light]) a:active{color:#f3f3f3;background-size:100% 2px, 100% 2px}:host([color=dark]) span,:host([color=dark]) a{display:inline;padding:0;border:none;color:#2b2b2b;line-height:inherit;white-space:initial;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;background-color:transparent;position:relative;background-image:-webkit-gradient(linear, left top, left bottom, from(currentColor), to(currentColor)), -webkit-gradient(linear, left top, left bottom, from(#808080), to(#808080));background-image:linear-gradient(currentColor, currentColor), linear-gradient(#808080, #808080);background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;-webkit-transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host([color=dark]) span:hover,:host([color=dark]) span:focus,:host([color=dark]) a:hover,:host([color=dark]) a:focus{color:#404040;background-size:100% 1px, 100% 1px}:host([color=dark]) span:hover .calcite-link--icon,:host([color=dark]) span:focus .calcite-link--icon,:host([color=dark]) a:hover .calcite-link--icon,:host([color=dark]) a:focus .calcite-link--icon{fill:#404040}:host([color=dark]) span:active,:host([color=dark]) a:active{color:#2b2b2b;background-size:100% 2px, 100% 2px}:host([dir=rtl]) span,:host([dir=rtl]) a{background-position:100% 100%, 100% 100%}";

const CalciteLink = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** specify the color of the link, defaults to blue */
        this.color = "blue";
        /** the node type of the rendered child element */
        this.childElType = "span";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
        this.childElType = this.href ? "a" : "span";
    }
    render() {
        const dir = getElementDir(this.el);
        const attributes = this.getAttributes();
        const Tag = this.childElType;
        const role = this.childElType === "span" ? "link" : null;
        const tabIndex = this.disabled
            ? -1
            : this.childElType === "span"
                ? 0
                : null;
        const iconStartEl = (h("calcite-icon", { class: "calcite-link--icon icon-start", icon: this.iconStart, scale: "s" }));
        const iconEndEl = (h("calcite-icon", { class: "calcite-link--icon icon-end", icon: this.iconEnd, scale: "s" }));
        return (h(Host, { dir: dir }, h(Tag, Object.assign({}, attributes, { role: role, tabIndex: tabIndex, ref: (el) => (this.childEl = el) }), this.iconStart ? iconStartEl : null, h("slot", null), this.iconEnd ? iconEndEl : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    async setFocus() {
        this.childEl.focus();
    }
    getAttributes() {
        // spread attributes from the component to rendered child, filtering out props
        let props = ["color", "dir", "icon", "iconPosition", "id", "theme"];
        return Array.from(this.el.attributes)
            .filter((a) => a && !props.includes(a.name))
            .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
    }
    get el() { return this; }
    static get style() { return calciteLinkCss; }
};

const calciteLoaderCss = "@charset \"UTF-8\";:host([hidden]){display:none}:host{-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:relative;display:none;padding-bottom:4rem;padding-top:4rem;margin-left:auto;margin-right:auto;min-height:var(--loader-size);stroke:var(--calcite-ui-blue-1);stroke-width:3;fill:none;opacity:1;-webkit-transform:scale(1, 1);transform:scale(1, 1);animation:loader-color-shift 6s alternate-reverse infinite linear}:host([scale=s]){--loader-size:33px;--loader-size-inline:13px;font-size:0.8125rem;line-height:1.5}:host([scale=s]) .loader__percentage{font-size:0.625rem}:host([scale=m]){--loader-size:57px;--loader-size-inline:17px;font-size:0.875rem;line-height:1.5}:host([scale=m]) .loader__percentage{font-size:0.875rem}:host([scale=l]){--loader-size:81px;--loader-size-inline:21px;font-size:0.9375rem;line-height:1.5}:host([scale=l]) .loader__percentage{font-size:1.25rem}:host([no-padding]){padding-top:0;padding-bottom:0}:host([active]){display:-ms-flexbox;display:flex}.loader__text{display:block;margin-top:calc(var(--loader-size) + 3rem);text-align:center}.loader__percentage{display:block;width:var(--loader-size);position:absolute;top:4rem;left:50%;margin-left:calc(var(--loader-size) / 2 * -1);margin-top:calc(var(--loader-size) / 2);text-align:center;color:var(--calcite-ui-text-1);line-height:0.25;-webkit-transform:scale(1, 1);transform:scale(1, 1)}.loader__svgs{width:var(--loader-size);height:var(--loader-size);position:absolute;top:4rem;left:50%;margin-left:calc(var(--loader-size) / 2 * -1);overflow:visible;opacity:1;-webkit-transform:scale(1, 1);transform:scale(1, 1)}.loader__svg{width:var(--loader-size);height:var(--loader-size);position:absolute;top:0;left:0;overflow:visible;-webkit-transform-origin:center;transform-origin:center;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-name:loader-clockwise;animation-name:loader-clockwise}@supports (display: grid){.loader__svg--1{-webkit-animation-name:loader-offset-1;animation-name:loader-offset-1}.loader__svg--2{-webkit-animation-name:loader-offset-2;animation-name:loader-offset-2}.loader__svg--3{-webkit-animation-name:loader-offset-3;animation-name:loader-offset-3}}:host([type=determinate]){stroke:var(--calcite-ui-border-3);-webkit-animation:none;animation:none}:host([type=determinate]) .loader__svg--3{stroke:var(--calcite-ui-blue-1);stroke-dasharray:157.0795;-webkit-transform:rotate(-90deg);transform:rotate(-90deg);-webkit-animation:none;animation:none;-webkit-transition:all 100ms linear;transition:all 100ms linear}:host([inline]){stroke:currentColor;stroke-width:2;-webkit-animation:none;animation:none;margin:0;padding-bottom:0;padding-top:0;position:relative;height:var(--loader-size-inline);min-height:var(--loader-size-inline);width:var(--loader-size-inline);margin-right:var(--loader-size-inline)/2;vertical-align:-var(--loader-size-inline)/5}:host([inline][dir=rtl]){margin-left:var(--loader-size-inline)/2;margin-right:0}:host([active][inline]){display:inline-block}:host([inline]) .loader__svgs{top:0;left:0;margin:0;width:var(--loader-size-inline);height:var(--loader-size-inline)}:host([inline]) .loader__svg{width:var(--loader-size-inline);height:var(--loader-size-inline)}:host([complete]){opacity:0;-webkit-transform:scale(0.75, 0.75);transform:scale(0.75, 0.75);-webkit-transform-origin:center;transform-origin:center;-webkit-transition:opacity 200ms linear 1000ms, -webkit-transform 200ms linear 1000ms;transition:opacity 200ms linear 1000ms, -webkit-transform 200ms linear 1000ms;transition:opacity 200ms linear 1000ms, transform 200ms linear 1000ms;transition:opacity 200ms linear 1000ms, transform 200ms linear 1000ms, -webkit-transform 200ms linear 1000ms}:host([complete]) .loader__svgs{opacity:0;-webkit-transform:scale(0.75, 0.75);transform:scale(0.75, 0.75);-webkit-transform-origin:center;transform-origin:center;-webkit-transition:opacity 180ms linear 800ms, -webkit-transform 180ms linear 800ms;transition:opacity 180ms linear 800ms, -webkit-transform 180ms linear 800ms;transition:opacity 180ms linear 800ms, transform 180ms linear 800ms;transition:opacity 180ms linear 800ms, transform 180ms linear 800ms, -webkit-transform 180ms linear 800ms}:host([complete]) .loader__percentage{color:var(--calcite-ui-blue-1);-webkit-transform:scale(1.05, 1.05);transform:scale(1.05, 1.05);-webkit-transform-origin:center;transform-origin:center;-webkit-transition:color 200ms linear, -webkit-transform 200ms linear;transition:color 200ms linear, -webkit-transform 200ms linear;transition:color 200ms linear, transform 200ms linear;transition:color 200ms linear, transform 200ms linear, -webkit-transform 200ms linear}.loader__svg--1{stroke-dasharray:28.0499107143% 140.2495535714%;-webkit-animation-duration:0.72s;animation-duration:0.72s}@-webkit-keyframes loader-offset-1{0%{stroke-dasharray:28.0499107143% 252.4491964286%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-84.1497321429%}100%{stroke-dasharray:28.0499107143% 252.4491964286%;stroke-dashoffset:-280.4991071429%}}@keyframes loader-offset-1{0%{stroke-dasharray:28.0499107143% 252.4491964286%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-84.1497321429%}100%{stroke-dasharray:28.0499107143% 252.4491964286%;stroke-dashoffset:-280.4991071429%}}.loader__svg--2{stroke-dasharray:56.0998214286% 140.2495535714%;-webkit-animation-duration:0.96s;animation-duration:0.96s}@-webkit-keyframes loader-offset-2{0%{stroke-dasharray:56.0998214286% 224.3992857143%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-98.1746875%}100%{stroke-dasharray:56.0998214286% 224.3992857143%;stroke-dashoffset:-280.4991071429%}}@keyframes loader-offset-2{0%{stroke-dasharray:56.0998214286% 224.3992857143%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-98.1746875%}100%{stroke-dasharray:56.0998214286% 224.3992857143%;stroke-dashoffset:-280.4991071429%}}.loader__svg--3{stroke-dasharray:14.0249553571% 140.2495535714%;-webkit-animation-duration:1.16s;animation-duration:1.16s}@-webkit-keyframes loader-offset-3{0%{stroke-dasharray:14.0249553571% 266.4741517857%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-77.1372544643%}100%{stroke-dasharray:14.0249553571% 266.4741517857%;stroke-dashoffset:-280.4991071429%}}@keyframes loader-offset-3{0%{stroke-dasharray:14.0249553571% 266.4741517857%;stroke-dashoffset:0}50%{stroke-dasharray:140.2495535714% 140.2495535714%;stroke-dashoffset:-77.1372544643%}100%{stroke-dasharray:14.0249553571% 266.4741517857%;stroke-dashoffset:-280.4991071429%}}@-webkit-keyframes loader-color-shift{0%{stroke:var(--calcite-ui-blue-1)}33%{stroke:var(--calcite-ui-blue-3)}66%{stroke:var(--calcite-ui-blue-2)}100%{stroke:var(--calcite-ui-blue-1)}}@keyframes loader-color-shift{0%{stroke:var(--calcite-ui-blue-1)}33%{stroke:var(--calcite-ui-blue-3)}66%{stroke:var(--calcite-ui-blue-2)}100%{stroke:var(--calcite-ui-blue-1)}}@-webkit-keyframes loader-clockwise{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes loader-clockwise{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}";

const CalciteLoader = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Show the loader */
        this.active = false;
        /** Inline loaders are smaller and will appear to the left of the text */
        this.inline = false;
        /** Speficy the scale of the loader. Defaults to "m" */
        this.scale = "m";
        /** Percent complete of 100, only valid for determinate indicators */
        this.value = 0;
        /** Text which should appear under the loading indicator (optional) */
        this.text = "";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scales = ["s", "m", "l"];
        if (!scales.includes(this.scale))
            this.scale = "m";
        let types = ["indeterminate", "determinate"];
        if (!types.includes(this.type))
            this.type = "indeterminate";
    }
    render() {
        const { el, inline, scale, text, type, value } = this;
        const id = el.id || guid;
        const radiusRatio = 0.45;
        const size = inline ? this.getInlineSize(scale) : this.getSize(scale);
        const radius = size * radiusRatio;
        const viewbox = `0 0 ${size} ${size}`;
        const isDeterminate = type === "determinate";
        const circumference = 2 * radius * Math.PI;
        const progress = (value / 100) * circumference;
        const remaining = circumference - progress;
        const valueNow = Math.floor(value);
        const hostAttributes = {
            "aria-valuenow": valueNow,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            complete: valueNow === 100
        };
        const svgAttributes = { r: radius, cx: size / 2, cy: size / 2 };
        const determinateStyle = { "stroke-dasharray": `${progress} ${remaining}` };
        return (h(Host, Object.assign({ id: id, role: "progressbar" }, (isDeterminate ? hostAttributes : {})), h("div", { class: "loader__svgs" }, h("svg", { viewBox: viewbox, class: "loader__svg loader__svg--1" }, h("circle", Object.assign({}, svgAttributes))), h("svg", { viewBox: viewbox, class: "loader__svg loader__svg--2" }, h("circle", Object.assign({}, svgAttributes))), h("svg", Object.assign({ viewBox: viewbox, class: "loader__svg loader__svg--3" }, (isDeterminate ? { style: determinateStyle } : {})), h("circle", Object.assign({}, svgAttributes)))), text && h("div", { class: "loader__text" }, text), isDeterminate && h("div", { class: "loader__percentage" }, value)));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Return the proper sizes based on the scale property
     */
    getSize(scale) {
        return {
            s: 32,
            m: 56,
            l: 80
        }[scale];
    }
    getInlineSize(scale) {
        return {
            s: 12,
            m: 16,
            l: 20
        }[scale];
    }
    get el() { return this; }
    static get style() { return calciteLoaderCss; }
};

/**
 * Traverses the slots of the open shadowroots and returns all children matching the query.
 * @param {ShadowRoot | HTMLElement} root
 * @param skipNode
 * @param isMatch
 * @param {number} maxDepth
 * @param {number} depth
 * @returns {HTMLElement[]}
 */
function queryShadowRoot(root, skipNode, isMatch, maxDepth = 20, depth = 0) {
    let matches = [];
    // If the depth is above the max depth, abort the searching here.
    if (depth >= maxDepth) {
        return matches;
    }
    // Traverses a slot element
    const traverseSlot = ($slot) => {
        // Only check nodes that are of the type Node.ELEMENT_NODE
        // Read more here https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        const assignedNodes = $slot.assignedNodes().filter(node => node.nodeType === 1);
        if (assignedNodes.length > 0) {
            return queryShadowRoot(assignedNodes[0].parentElement, skipNode, isMatch, maxDepth, depth + 1);
        }
        return [];
    };
    // Go through each child and continue the traversing if necessary
    // Even though the typing says that children can't be undefined, Edge 15 sometimes gives an undefined value.
    // Therefore we fallback to an empty array if it is undefined.
    const children = Array.from(root.children || []);
    for (const $child of children) {
        // Check if the node and its descendants should be skipped
        if (skipNode($child)) {
            continue;
        }
        // If the child matches we always add it
        if (isMatch($child)) {
            matches.push($child);
        }
        if ($child.shadowRoot != null) {
            matches.push(...queryShadowRoot($child.shadowRoot, skipNode, isMatch, maxDepth, depth + 1));
        }
        else if ($child.tagName === "SLOT") {
            matches.push(...traverseSlot($child));
        }
        else {
            matches.push(...queryShadowRoot($child, skipNode, isMatch, maxDepth, depth + 1));
        }
    }
    return matches;
}

/**
 * Returns whether the element is hidden.
 * @param $elem
 */
function isHidden($elem) {
    return $elem.hasAttribute("hidden")
        || ($elem.hasAttribute("aria-hidden") && $elem.getAttribute("aria-hidden") !== "false")
        // A quick and dirty way to check whether the element is hidden.
        // For a more fine-grained check we could use "window.getComputedStyle" but we don't because of bad performance.
        // If the element has visibility set to "hidden" or "collapse", display set to "none" or opacity set to "0" through CSS
        // we won't be able to catch it here. We accept it due to the huge performance benefits.
        || $elem.style.display === `none`
        || $elem.style.opacity === `0`
        || $elem.style.visibility === `hidden`
        || $elem.style.visibility === `collapse`;
}
/**
 * Returns whether the element is disabled.
 * @param $elem
 */
function isDisabled($elem) {
    return $elem.hasAttribute("disabled")
        || ($elem.hasAttribute("aria-disabled") && $elem.getAttribute("aria-disabled") !== "false");
}
/**
 * Determines whether an element is focusable.
 * Read more here: https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus/1600194#1600194
 * Or here: https://stackoverflow.com/questions/18261595/how-to-check-if-a-dom-element-is-focusable
 * @param $elem
 */
function isFocusable($elem) {
    // Discard elements that are removed from the tab order.
    if ($elem.getAttribute("tabindex") === "-1" || isHidden($elem) || isDisabled($elem)) {
        return false;
    }
    return (
    // At this point we know that the element can have focus (eg. won't be -1) if the tabindex attribute exists
    $elem.hasAttribute("tabindex")
        // Anchor tags or area tags with a href set
        || ($elem instanceof HTMLAnchorElement || $elem instanceof HTMLAreaElement) && $elem.hasAttribute("href")
        // Form elements which are not disabled
        || ($elem instanceof HTMLButtonElement
            || $elem instanceof HTMLInputElement
            || $elem instanceof HTMLTextAreaElement
            || $elem instanceof HTMLSelectElement)
        // IFrames
        || $elem instanceof HTMLIFrameElement);
}

let timeouts = new Map();
/**
 * Debounces a callback.
 * @param cb
 * @param ms
 * @param id
 */
function debounce$1(cb, ms, id) {
    // Clear current timeout for id
    const timeout = timeouts.get(id);
    if (timeout != null) {
        window.clearTimeout(timeout);
    }
    // Set new timeout
    timeouts.set(id, window.setTimeout(() => {
        cb();
        timeouts.delete(id);
    }, ms));
}

/**
 * Template for the focus trap.
 */
const template = document.createElement("template");
template.innerHTML = `
	<div id="start"></div>
	<slot></slot>
	<div id="backup"></div>
	<div id="end"></div>
`;
/**
 * Focus trap web component.
 * @slot - Default content.
 */
class FocusTrap extends HTMLElement {
    /**
     * Attaches the shadow root.
     */
    constructor() {
        super();
        // The debounce id is used to distinguish this focus trap from others when debouncing
        this.debounceId = Math.random().toString();
        this._focused = false;
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
        this.focusLastElement = this.focusLastElement.bind(this);
        this.focusFirstElement = this.focusFirstElement.bind(this);
        this.onFocusIn = this.onFocusIn.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
    }
    // Whenever one of these attributes changes we need to render the template again.
    static get observedAttributes() {
        return ["inactive"];
    }
    /**
     * Determines whether the focus trap is active or not.
     * @attr
     */
    get inactive() {
        return this.hasAttribute("inactive");
    }
    set inactive(value) {
        value
            ? this.setAttribute("inactive", "")
            : this.removeAttribute("inactive");
    }
    /**
     * Returns whether the element currently has focus.
     */
    get focused() {
        return this._focused;
    }
    /**
     * Hooks up the element.
     */
    connectedCallback() {
        this.$backup = this.shadowRoot.querySelector("#backup");
        this.$start = this.shadowRoot.querySelector("#start");
        this.$end = this.shadowRoot.querySelector("#end");
        this.$start.addEventListener("focus", this.focusLastElement);
        this.$end.addEventListener("focus", this.focusFirstElement);
        // Focus out is called every time the user tabs around inside the element
        this.addEventListener("focusin", this.onFocusIn);
        this.addEventListener("focusout", this.onFocusOut);
        this.render();
    }
    /**
     * Tears down the element.
     */
    disconnectedCallback() {
        this.$start.removeEventListener("focus", this.focusLastElement);
        this.$end.removeEventListener("focus", this.focusFirstElement);
        this.removeEventListener("focusin", this.onFocusIn);
        this.removeEventListener("focusout", this.onFocusOut);
    }
    /**
     * When the attributes changes we need to re-render the template.
     */
    attributeChangedCallback() {
        this.render();
    }
    /**
     * Focuses the first focusable element in the focus trap.
     */
    focusFirstElement() {
        this.trapFocus();
    }
    /**
     * Focuses the last focusable element in the focus trap.
     */
    focusLastElement() {
        this.trapFocus(true);
    }
    /**
     * Returns a list of the focusable children found within the element.
     */
    getFocusableElements() {
        return queryShadowRoot(this, isHidden, isFocusable);
    }
    /**
     * Focuses on either the last or first focusable element.
     * @param {boolean} trapToEnd
     */
    trapFocus(trapToEnd) {
        if (this.inactive)
            return;
        let focusableChildren = this.getFocusableElements();
        if (focusableChildren.length > 0) {
            if (trapToEnd) {
                focusableChildren[focusableChildren.length - 1].focus();
            }
            else {
                focusableChildren[0].focus();
            }
            this.$backup.setAttribute("tabindex", "-1");
        }
        else {
            // If there are no focusable children we need to focus on the backup
            // to trap the focus. This is a useful behavior if the focus trap is
            // for example used in a dialog and we don't want the user to tab
            // outside the dialog even though there are no focusable children
            // in the dialog.
            this.$backup.setAttribute("tabindex", "0");
            this.$backup.focus();
        }
    }
    /**
     * When the element gains focus this function is called.
     */
    onFocusIn() {
        this.updateFocused(true);
    }
    /**
     * When the element looses its focus this function is called.
     */
    onFocusOut() {
        this.updateFocused(false);
    }
    /**
     * Updates the focused property and updates the view.
     * The update is debounced because the focusin and focusout out
     * might fire multiple times in a row. We only want to render
     * the element once, therefore waiting until the focus is "stable".
     * @param value
     */
    updateFocused(value) {
        debounce$1(() => {
            if (this.focused !== value) {
                this._focused = value;
                this.render();
            }
        }, 0, this.debounceId);
    }
    /**
     * Updates the template.
     */
    render() {
        if (!this.isConnected)
            return;
        this.$start.setAttribute("tabindex", !this.focused || this.inactive ? `-1` : `0`);
        this.$end.setAttribute("tabindex", !this.focused || this.inactive ? `-1` : `0`);
        this.focused
            ? this.setAttribute("focused", "")
            : this.removeAttribute("focused");
    }
}
if (window && window.customElements) {
    window.customElements.define("focus-trap", FocusTrap);
}

const calciteModalCss = ":host([hidden]){display:none}:host{position:fixed;top:0;right:0;bottom:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;overflow-y:hidden;color:var(--calcite-ui-text-2);opacity:0;visibility:hidden !important;-webkit-transition:visibility 0ms linear 300ms, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:visibility 0ms linear 300ms, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);z-index:101;--calcite-modal-title-padding:12px 16px;--calcite-modal-title-text:20px;--calcite-modal-content-padding:16px;--calcite-modal-content-text:16px;--calcite-modal-close-padding:12px;--calcite-modal-footer-padding:12px}:host([scale=s]){--calcite-modal-title-padding:8px 12px;--calcite-modal-title-text:18px;--calcite-modal-content-padding:12px;--calcite-modal-content-text:14px;--calcite-modal-close-padding:8px;--calcite-modal-footer-padding:8px}:host([scale=l]){--calcite-modal-title-padding:16px 20px;--calcite-modal-title-text:26px;--calcite-modal-content-padding:20px;--calcite-modal-content-text:18px;--calcite-modal-close-padding:16px;--calcite-modal-footer-padding:16px}.scrim{position:fixed;top:0;right:0;bottom:0;left:0;display:-ms-flexbox;display:flex;overflow-y:hidden}.modal{-webkit-box-sizing:border-box;box-sizing:border-box;z-index:102;float:none;text-align:left;-webkit-overflow-scrolling:touch;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:row-wrap;flex-wrap:row-wrap;opacity:0;visibility:hidden;pointer-events:none;-webkit-transition:visibility 0ms linear 300ms, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:visibility 0ms linear 300ms, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear 300ms, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear 300ms, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);-webkit-transform:translate3d(0, 20px, 0);transform:translate3d(0, 20px, 0);background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.32);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.32);border-radius:var(--calcite-border-radius);margin:1.5rem;width:100%}.modal__close{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.modal__close.modal__close:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([is-active]){visibility:visible !important;opacity:1;-webkit-transition-delay:0ms;transition-delay:0ms}:host([is-active]) .modal{pointer-events:auto;visibility:visible;opacity:1;-webkit-transition-delay:0ms;transition-delay:0ms;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);-webkit-transition:visibility 0ms linear, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-width 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-height 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:visibility 0ms linear, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-width 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-height 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-width 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-height 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-width 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-height 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88)}:host([dir=rtl]) .modal{text-align:right}.modal__header{background-color:var(--calcite-ui-foreground-1);-ms-flex:0 0 auto;flex:0 0 auto;display:-ms-flexbox;display:flex;max-width:100%;min-width:0;z-index:2;border-bottom:1px solid var(--calcite-ui-border-3);border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.modal__close{padding:var(--calcite-modal-close-padding);margin:0;-ms-flex-order:2;order:2;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:300ms;transition-delay:300ms;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;color:var(--calcite-ui-text-1);outline:none;cursor:pointer;border-radius:0 var(--calcite-border-radius) 0 0}.modal__close calcite-icon{pointer-events:none;vertical-align:-2px}.modal__close:hover,.modal__close:focus{background-color:var(--calcite-ui-foreground-2)}.modal__close:active{background-color:var(--calcite-ui-foreground-3)}:host([dir=rtl]) .modal__close{border-radius:var(--calcite-border-radius) 0 0 0}.modal__title{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--calcite-modal-title-padding);-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-order:1;order:1;min-width:0}slot[name=header]::slotted(*),*::slotted([slot=header]){margin:0;font-weight:400;font-size:var(--calcite-modal-title-text);color:var(--calcite-ui-text-1)}.modal__content{position:relative;padding:0;height:100%;overflow:auto;max-height:calc(100vh - 12rem);overflow-y:auto;display:block;background-color:var(--calcite-ui-foreground-1);-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1}.modal__content--spaced{padding:var(--calcite-modal-content-padding)}slot[name=content]::slotted(*),*::slotted([slot=content]){font-size:var(--calcite-modal-content-text);line-height:1.5}:host([background-color=grey]) .modal__content{background-color:var(--calcite-ui-background)}.modal__footer{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-pack:justify;justify-content:space-between;padding:var(--calcite-modal-footer-padding);margin-top:auto;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:0 0 var(--calcite-border-radius) var(--calcite-border-radius);width:100%;background-color:var(--calcite-ui-foreground-1);border-top:1px solid var(--calcite-ui-border-3);z-index:2}.modal__footer--hide-back .modal__back,.modal__footer--hide-secondary .modal__secondary{display:none}.modal__back{display:block;margin-right:auto}:host([dir=rtl]) .modal__back{margin-left:auto;margin-right:unset}.modal__secondary{display:block;margin:0 0.375rem}slot[name=primary]{display:block}:host([width=small]) .modal{width:auto}:host([width=s]) .modal{max-width:32rem}@media screen and (max-width: 35rem){:host([width=s]) .modal{height:100%;max-height:100%;width:100%;max-width:100%;margin:0;border-radius:0}:host([width=s]) .modal__content{-ms-flex:1 1 auto;flex:1 1 auto;max-height:unset}:host([width=s]) .modal__header,:host([width=s]) .modal__footer{-ms-flex:inherit;flex:inherit}:host([width=s][docked]){-ms-flex-align:end;align-items:flex-end}}:host([width=m]) .modal{max-width:48rem}@media screen and (max-width: 51rem){:host([width=m]) .modal{height:100%;max-height:100%;width:100%;max-width:100%;margin:0;border-radius:0}:host([width=m]) .modal__content{-ms-flex:1 1 auto;flex:1 1 auto;max-height:unset}:host([width=m]) .modal__header,:host([width=m]) .modal__footer{-ms-flex:inherit;flex:inherit}:host([width=m][docked]){-ms-flex-align:end;align-items:flex-end}}:host([width=l]) .modal{max-width:94rem}@media screen and (max-width: 97rem){:host([width=l]) .modal{height:100%;max-height:100%;width:100%;max-width:100%;margin:0;border-radius:0}:host([width=l]) .modal__content{-ms-flex:1 1 auto;flex:1 1 auto;max-height:unset}:host([width=l]) .modal__header,:host([width=l]) .modal__footer{-ms-flex:inherit;flex:inherit}:host([width=l][docked]){-ms-flex-align:end;align-items:flex-end}}:host([fullscreen]){background-color:transparent}:host([fullscreen]) .modal{-webkit-transform:translate3D(0, 20px, 0) scale(0.95);transform:translate3D(0, 20px, 0) scale(0.95);height:100%;max-height:100%;width:100%;max-width:100%;margin:0}:host([fullscreen]) .modal__content{-ms-flex:1 1 auto;flex:1 1 auto;max-height:100%}:host([fullscreen]) .modal__header,:host([fullscreen]) .modal__footer{-ms-flex:inherit;flex:inherit}:host([is-active][fullscreen]) .modal{-webkit-transform:translate3D(0, 0, 0) scale(1);transform:translate3D(0, 0, 0) scale(1)}:host([is-active][fullscreen]) .modal__header{border-radius:0}:host([is-active][fullscreen]) .modal__footer{border-radius:0}:host([docked]) .modal{height:auto !important}:host([docked]) .modal__content{height:auto;-ms-flex:1 1 auto;flex:1 1 auto}@media screen and (max-width: 860px){:host([docked]) .modal{border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}:host([docked]) .modal__close{border-radius:0 var(--calcite-border-radius) 0 0}}@media screen and (max-width: 860px){:host([docked][dir=rtl]) .modal__close{border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}}:host([color=red]) .modal{border-top:4px solid var(--calcite-ui-red-1)}:host([color=blue]) .modal{border-top:4px solid var(--calcite-ui-blue-1)}:host([color=red]) .modal__header,:host([color=blue]) .modal__header{border-radius:var(--calcite-border-radius)}@media screen and (max-width: 860px){slot[name=header]::slotted(*),*::slotted([slot=header]){font-size:1.2019rem;line-height:1.5}}@media screen and (max-width: 860px) and (max-width: 859px){slot[name=header]::slotted(*),*::slotted([slot=header]){font-size:1.1305rem}}@media screen and (max-width: 860px) and (max-width: 479px){slot[name=header]::slotted(*),*::slotted([slot=header]){font-size:1.0625rem}}@media screen and (max-width: 860px){.modal__title{padding:0.375rem 1.0125rem}}@media screen and (max-width: 860px){.modal__close{padding:0.75rem}}@media screen and (max-width: 860px){.modal__content--spaced{padding:1.0125rem}}@media screen and (max-width: 860px){.modal__footer{position:-webkit-sticky;position:sticky;bottom:0}}@media screen and (max-width: 480px){.modal__footer{-ms-flex-direction:column;flex-direction:column}.modal__back,.modal__secondary{margin:0;margin-bottom:0.375rem}}";

const CalciteModal = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteModalOpen = createEvent(this, "calciteModalOpen", 7);
        this.calciteModalClose = createEvent(this, "calciteModalClose", 7);
        /** Optionally pass a function to run before close */
        this.beforeClose = () => Promise.resolve();
        /** Aria label for the close button */
        this.intlClose = "Close";
        /** specify the scale of modal, defaults to m */
        this.scale = "m";
        /** Set the width of the modal. Can use stock sizes or pass a number (in pixels) */
        this.width = "m";
        /** Background color of modal content */
        this.backgroundColor = "white";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        // when modal initially renders, if active was set we need to open as watcher doesn't fire
        if (this.active) {
            this.open();
        }
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, role: "dialog", "aria-modal": "true", "is-active": this.isActive }, h("calcite-scrim", { class: "scrim", theme: "dark" }), this.renderStyle(), h("div", { class: "modal" }, h("div", { "data-focus-fence": "true", tabindex: "0", onFocus: this.focusLastElement.bind(this) }), h("div", { class: "modal__header" }, this.renderCloseButton(), h("header", { class: "modal__title" }, h("slot", { name: "header" }))), h("div", { class: {
                modal__content: true,
                "modal__content--spaced": !this.noPadding
            }, ref: (el) => (this.modalContent = el) }, h("slot", { name: "content" })), this.renderFooter(), h("div", { "data-focus-fence": "true", tabindex: "0", onFocus: this.focusFirstElement.bind(this) }))));
    }
    renderFooter() {
        return this.el.querySelector("[slot=back], [slot=secondary], [slot=primary]") ? (h("div", { class: "modal__footer" }, h("span", { class: "modal__back" }, h("slot", { name: "back" })), h("span", { class: "modal__secondary" }, h("slot", { name: "secondary" })), h("span", { class: "modal__primary" }, h("slot", { name: "primary" })))) : null;
    }
    renderCloseButton() {
        return !this.disableCloseButton ? (h("button", { class: "modal__close", "aria-label": this.intlClose, title: this.intlClose, ref: (el) => (this.closeButtonEl = el), onClick: () => this.close() }, h("calcite-icon", { icon: "x", scale: "l" }))) : null;
    }
    renderStyle() {
        const hasCustomWidth = !isNaN(parseInt(`${this.width}`));
        return hasCustomWidth ? (h("style", null, `
        .modal {
          max-width: ${this.width}px;
        }
        @media screen and (max-width: ${this.width}px) {
          .modal {
            height: 100%;
            max-height: 100%;
            width: 100%;
            max-width: 100%;
            margin: 0;
            border-radius: 0;
          }
          .modal__content {
            flex: 1 1 auto;
            max-height: unset;
          }
          .modal__header,
          .modal__footer {
            flex: inherit;
          }
        }
      `)) : null;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleEscape(e) {
        if (this.active && !this.disableEscape && getKey(e.key) === "Escape") {
            this.beforeClose(this.el).then(() => {
                this.active = false;
            });
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Focus first interactive element */
    async focusElement(el) {
        var _a;
        if (el) {
            el.focus();
            return;
        }
        const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable);
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
        else {
            (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }
    /** Set the scroll top of the modal content */
    async scrollContent(top = 0, left = 0) {
        if (this.modalContent) {
            if (this.modalContent.scrollTo) {
                this.modalContent.scrollTo({ top, left, behavior: "smooth" });
            }
            else {
                this.modalContent.scrollTop = top;
                this.modalContent.scrollLeft = left;
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    async toggleModal(value, oldValue) {
        if (value !== oldValue) {
            if (value) {
                this.open();
            }
            else if (!value) {
                this.close();
            }
        }
    }
    /** Open the modal */
    open() {
        this.previousActiveElement = document.activeElement;
        this.isActive = true;
        // wait for the modal to open, then handle focus.
        setTimeout(() => {
            this.focusElement(this.firstFocus);
            this.calciteModalOpen.emit();
        }, 300);
        document.documentElement.classList.add("overflow-hidden");
    }
    /** Close the modal, first running the `beforeClose` method */
    close() {
        return this.beforeClose(this.el).then(() => {
            var _a;
            this.isActive = false;
            (_a = this.previousActiveElement) === null || _a === void 0 ? void 0 : _a.focus();
            document.documentElement.classList.remove("overflow-hidden");
            setTimeout(() => this.calciteModalClose.emit(), 300);
        });
    }
    focusFirstElement() {
        var _a;
        (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    focusLastElement() {
        var _a;
        const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable).filter((el) => !el.getAttribute("data-focus-fence"));
        if (focusableElements.length > 0) {
            focusableElements[focusableElements.length - 1].focus();
        }
        else {
            (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }
    get el() { return this; }
    static get watchers() { return {
        "active": ["toggleModal"]
    }; }
    static get style() { return calciteModalCss; }
};

const TEXT$4 = {
    close: "Close"
};

const calciteNoticeCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){--calcite-notice-spacing-token-small:0.75rem;--calcite-notice-spacing-token-large:1rem}:host([scale=s]) slot[name=notice-title]::slotted(*),:host([scale=s]) *::slotted([slot=notice-title]){font-size:0.875rem;line-height:1.5}:host([scale=s]) slot[name=notice-message]::slotted(*),:host([scale=s]) *::slotted([slot=notice-message]){font-size:0.8125rem;line-height:1.5}:host([scale=s]) ::slotted(calcite-link){font-size:0.8125rem;line-height:1.5}:host([scale=m]){--calcite-notice-spacing-token-small:1rem;--calcite-notice-spacing-token-large:1.5rem}:host([scale=m]) slot[name=notice-title]::slotted(*),:host([scale=m]) *::slotted([slot=notice-title]){font-size:0.9375rem;line-height:1.5}:host([scale=m]) slot[name=notice-message]::slotted(*),:host([scale=m]) *::slotted([slot=notice-message]){font-size:0.875rem;line-height:1.5}:host([scale=m]) ::slotted(calcite-link){font-size:0.875rem;line-height:1.5}:host([scale=l]){--calcite-notice-spacing-token-small:1.2rem;--calcite-notice-spacing-token-large:1.875rem}:host([scale=l]) slot[name=notice-title]::slotted(*),:host([scale=l]) *::slotted([slot=notice-title]){font-size:1rem;line-height:1.5}:host([scale=l]) slot[name=notice-message]::slotted(*),:host([scale=l]) *::slotted([slot=notice-message]){font-size:0.9375rem;line-height:1.5}:host([scale=l]) ::slotted(calcite-link){font-size:0.9375rem;line-height:1.5}:host([width=auto]){--calcite-notice-width:auto}:host([width=half]){--calcite-notice-width:50%}:host([width=full]){--calcite-notice-width:100%}:host{display:none;text-align:left;margin:0 auto;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--calcite-notice-width);max-height:0;background-color:var(--calcite-ui-foreground-1);opacity:0;pointer-events:none;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;border-left:0px solid;-webkit-box-shadow:0 0 0 0 transparent;box-shadow:0 0 0 0 transparent}.notice-close{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.notice-close:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([dir=rtl]){text-align:right;border-left:none;border-right:0px solid}:host([active]){display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;opacity:1;max-height:100%;pointer-events:initial;border-width:3px;-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.08);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.08)}slot[name=notice-title]::slotted(*),*::slotted([slot=notice-title]){color:var(--calcite-ui-text-1);margin:0;font-weight:500}slot[name=notice-message]::slotted(*),*::slotted([slot=notice-message]){display:inline;margin:0;font-weight:400;margin-right:var(--calcite-notice-spacing-token-small);color:var(--calcite-ui-text-2)}:host([dir=rtl]) slot[name=notice-message]::slotted(*),:host([dir=rtl]) *::slotted([slot=notice-message]){margin-right:0;margin-left:var(--calcite-notice-spacing-token-small)}.notice-content{-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-small) 0}.notice-content:first-of-type:not(:only-child){padding-left:var(--calcite-notice-spacing-token-large)}.notice-content:only-of-type{padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large)}:host([dir=rtl]) .notice-content{padding:var(--calcite-notice-spacing-token-small) 0 var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-small)}:host([dir=rtl]) .notice-content:first-of-type:not(:only-child){padding-right:var(--calcite-notice-spacing-token-large)}:host([dir=rtl]) .notice-content:only-of-type{padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large)}.notice-icon{-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.notice-close{-webkit-box-sizing:border-box;box-sizing:border-box;padding:var(--calcite-notice-spacing-token-small) var(--calcite-notice-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;-ms-flex-item-align:stretch;align-self:stretch;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;color:var(--calcite-ui-text-3)}.notice-close:hover,.notice-close:focus{background-color:var(--calcite-ui-foreground-2)}.notice-close:active{background-color:var(--calcite-ui-foreground-3)}:host([color=blue]){border-color:var(--calcite-ui-blue-1)}:host([color=blue]) .notice-icon{color:var(--calcite-ui-blue-1)}:host([color=red]){border-color:var(--calcite-ui-red-1)}:host([color=red]) .notice-icon{color:var(--calcite-ui-red-1)}:host([color=yellow]){border-color:var(--calcite-ui-yellow-1)}:host([color=yellow]) .notice-icon{color:var(--calcite-ui-yellow-1)}:host([color=green]){border-color:var(--calcite-ui-green-1)}:host([color=green]) .notice-icon{color:var(--calcite-ui-green-1)}";

const CalciteNotice = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteNoticeClose = createEvent(this, "calciteNoticeClose", 7);
        this.calciteNoticeOpen = createEvent(this, "calciteNoticeOpen", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //---------------------------------------------------------------------------
        /** Is the notice currently active or not */
        this.active = false;
        /** Color for the notice (will apply to top border and icon) */
        this.color = "blue";
        /** String for the close button. */
        this.intlClose = TEXT$4.close;
        /** specify the scale of the notice, defaults to m */
        this.scale = "m";
        /** specify the width of the notice, defaults to m */
        this.width = "auto";
        /** Optionally show a button the user can click to dismiss the notice */
        this.dismissible = false;
        /** If false, no icon will be shown in the notice */
        this.icon = false;
        this.iconDefaults = {
            green: "checkCircle",
            yellow: "exclamationMarkTriangle",
            red: "exclamationMarkTriangle",
            blue: "lightbulb"
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let colors = ["blue", "red", "green", "yellow"];
        if (!colors.includes(this.color))
            this.color = "blue";
        let scales = ["s", "m", "l"];
        if (!scales.includes(this.scale))
            this.scale = "m";
        let widths = ["auto", "half", "full"];
        if (!widths.includes(this.width))
            this.width = "auto";
    }
    componentDidLoad() {
        this.noticeLinkEl = this.el.querySelectorAll("calcite-link")[0];
    }
    render() {
        const dir = getElementDir(this.el);
        const closeButton = (h("button", { class: "notice-close", "aria-label": this.intlClose, onClick: () => this.close(), ref: () => this.closeButton }, h("calcite-icon", { icon: "x", scale: "m" })));
        return (h(Host, { active: this.active, dir: dir }, this.icon ? this.setIcon() : null, h("div", { class: "notice-content" }, h("slot", { name: "notice-title" }), h("slot", { name: "notice-message" }), h("slot", { name: "notice-link" })), this.dismissible ? closeButton : null));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** close the notice emit the `calciteNoticeClose` event - <calcite-notice> listens for this */
    async close() {
        this.active = false;
        this.calciteNoticeClose.emit();
    }
    /** open the notice and emit the `calciteNoticeOpen` event - <calcite-notice> listens for this  */
    async open() {
        this.active = true;
        this.calciteNoticeOpen.emit();
    }
    /** focus the close button, if present and requested */
    async setFocus() {
        if (!this.closeButton && !this.noticeLinkEl) {
            return;
        }
        if (this.noticeLinkEl)
            this.noticeLinkEl.setFocus();
        else if (this.closeButton) {
            this.closeButton.focus();
        }
    }
    setIcon() {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "notice-icon" }, h("calcite-icon", { icon: path, scale: "m" })));
    }
    get el() { return this; }
    static get style() { return calciteNoticeCss; }
};

const CSS$7 = {
    page: "page",
    selected: "is-selected",
    previous: "previous",
    next: "next",
    disabled: "is-disabled",
    ellipsis: "ellipsis",
    ellipsisStart: "ellipsis--start",
    ellipsisEnd: "ellipsis--end"
};
const TEXT$5 = {
    nextLabel: "next",
    previousLabel: "previous"
};

const calcitePaginationCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){--calcite-pagination-spacing:4px 8px}:host([scale=s]) .previous,:host([scale=s]) .next,:host([scale=s]) .page{font-size:12px}:host([scale=m]){--calcite-pagination-spacing:8px 12px}:host([scale=m]) .previous,:host([scale=m]) .next,:host([scale=m]) .page{font-size:16px}:host([scale=l]){--calcite-pagination-spacing:12px 16px}:host([scale=l]) .previous,:host([scale=l]) .next,:host([scale=l]) .page{font-size:20px}:host{display:-ms-inline-flexbox;display:inline-flex;-webkit-writing-mode:horizontal-tb;-ms-writing-mode:lr-tb;writing-mode:horizontal-tb}:host button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.previous,.next,.page{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;background-color:transparent;border:none;border-top:3px solid transparent;border-bottom:3px solid transparent;font-family:inherit;font-size:1rem;line-height:1.5;color:var(--calcite-ui-text-3);cursor:pointer}.previous:hover,.next:hover,.page:hover{color:var(--calcite-ui-text-1);-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}.page:hover{border-bottom-color:var(--calcite-ui-border-2)}.page.is-selected{font-weight:500;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue-1)}.previous,.next{padding:var(--calcite-pagination-spacing)}.previous:hover,.next:hover{color:var(--calcite-ui-blue-1);background-color:var(--calcite-ui-foreground-2)}.previous:active,.next:active{background-color:var(--calcite-ui-foreground-3)}.previous.is-disabled,.next.is-disabled{background-color:transparent;pointer-events:none}.previous.is-disabled>calcite-icon,.next.is-disabled>calcite-icon{opacity:0.4}.next{margin-right:0}.page,.ellipsis{padding:var(--calcite-pagination-spacing)}.ellipsis{display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;color:var(--calcite-ui-text-3)}";

const maxPagesDisplayed = 5;
const CalcitePagination = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calcitePaginationUpdate = createEvent(this, "calcitePaginationUpdate", 7);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /** number of items per page */
        this.num = 20;
        /** index of item that should begin the page */
        this.start = 1;
        /** total number of items */
        this.total = 0;
        /** title of the next button */
        this.textLabelNext = TEXT$5.nextLabel;
        /** title of the previous button */
        this.textLabelPrevious = TEXT$5.previousLabel;
        /** The scale of the pagination */
        this.scale = "m";
        this.previousClicked = () => {
            this.previousPage().then();
            this.emitUpdate();
        };
        this.nextClicked = () => {
            this.nextPage();
            this.emitUpdate();
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Go to the next page of results */
    async nextPage() {
        this.start = Math.min(this.getLastStart(), this.start + this.num);
    }
    /** Go to the previous page of results */
    async previousPage() {
        this.start = Math.max(1, this.start - this.num);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    getLastStart() {
        const { total, num } = this;
        const lastStart = total % num === 0 ? total - num : Math.floor(total / num) * num;
        return lastStart + 1;
    }
    showLeftEllipsis() {
        return Math.floor(this.start / this.num) > 3;
    }
    showRightEllipsis() {
        return (this.total - this.start) / this.num > 3;
    }
    emitUpdate() {
        this.calcitePaginationUpdate.emit({
            start: this.start,
            total: this.total,
            num: this.num,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderPages() {
        let lastStart = this.getLastStart();
        let end;
        let nextStart;
        // if we don't need ellipses render the whole set
        if (this.total / this.num <= maxPagesDisplayed) {
            nextStart = 1 + this.num;
            end = lastStart - this.num;
        }
        else {
            // if we're within max pages of page 1
            if (this.start / this.num < maxPagesDisplayed - 1) {
                nextStart = 1 + this.num;
                end = 1 + 4 * this.num;
            }
            else {
                // if we're within max pages of last page
                if (this.start + 3 * this.num >= this.total) {
                    nextStart = lastStart - 4 * this.num;
                    end = lastStart - this.num;
                }
                else {
                    nextStart = this.start - this.num;
                    end = this.start + this.num;
                }
            }
        }
        const pages = [];
        while (nextStart <= end) {
            pages.push(nextStart);
            nextStart = nextStart + this.num;
        }
        return pages.map((page) => this.renderPage(page));
    }
    renderPage(start) {
        const page = Math.floor(start / this.num) + 1;
        return (h("button", { class: {
                [CSS$7.page]: true,
                [CSS$7.selected]: start === this.start,
            }, onClick: () => {
                this.start = start;
                this.emitUpdate();
            } }, page));
    }
    renderLeftEllipsis(iconScale) {
        if (this.total / this.num > maxPagesDisplayed && this.showLeftEllipsis()) {
            return (h("span", { class: `${CSS$7.ellipsis} ${CSS$7.ellipsisStart}` }, h("calcite-icon", { scale: iconScale, icon: "ellipsis" })));
        }
    }
    renderRightEllipsis(iconScale) {
        if (this.total / this.num > maxPagesDisplayed && this.showRightEllipsis()) {
            return (h("span", { class: `${CSS$7.ellipsis} ${CSS$7.ellipsisEnd}` }, h("calcite-icon", { scale: iconScale, icon: "ellipsis" })));
        }
    }
    render() {
        const { total, num, start } = this;
        const iconScale = this.scale === "l" ? "m" : "s";
        return (h(Host, null, h("button", { class: {
                [CSS$7.previous]: true,
                [CSS$7.disabled]: start < num,
            }, "aria-label": this.textLabelPrevious, onClick: this.previousClicked, disabled: start < num }, h("calcite-icon", { scale: iconScale, icon: "chevronLeft" })), this.renderPage(1), this.renderLeftEllipsis(iconScale), this.renderPages(), this.renderRightEllipsis(iconScale), this.renderPage(this.getLastStart()), h("button", { class: {
                [CSS$7.next]: true,
                [CSS$7.disabled]: start + num >= total,
            }, "aria-label": this.textLabelNext, onClick: this.nextClicked, disabled: start + num >= total }, h("calcite-icon", { scale: iconScale, icon: "chevronRight" }))));
    }
    get el() { return this; }
    static get style() { return calcitePaginationCss; }
};

const CSS$8 = {
    container: "container",
    arrow: "arrow",
    imageContainer: "image-container",
    closeButton: "close-button",
    content: "content"
};
const TEXT$6 = {
    close: "Close"
};
const POPOVER_REFERENCE = "data-calcite-popover-reference";
const ARIA_DESCRIBED_BY = "aria-describedby";

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/*:: import type { Window } from '../types'; */

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  return node;
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */


function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe: assume body is always available
  return (isElement(element) ? element.ownerDocument : element.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    // $FlowFixMe: need a better way to handle this...
    element.host || // ShadowRoot detected
    // $FlowFixMe: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the 
reference element's position.
*/

function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = getNodeName(scrollParent) === 'body';
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  var offsetParent = element.offsetParent;

  if (offsetParent) {
    var html = getDocumentElement(offsetParent);

    if (getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && getComputedStyle(html).position !== 'static') {
      return html;
    }
  }

  return offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.

    if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce$2(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign(Object.assign(Object.assign({}, existing), current), {}, {
      options: Object.assign(Object.assign({}, existing.options), current.options),
      data: Object.assign(Object.assign({}, existing.data), current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = element.ownerDocument.body;
  var width = Math.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = Math.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function contains(parent, child) {
  // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
  var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (isShadow) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function rectToClientRect(rect) {
  return Object.assign(Object.assign({}, rect), {}, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = Math.max(rect.top, accRect.top);
    accRect.right = Math.min(rect.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign(Object.assign({}, getFreshSideObject()), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign(Object.assign({}, popperRect), popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce$2(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


const eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


const popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsets(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive;

  var _roundOffsets = roundOffsets(offsets),
      x = _roundOffsets.x,
      y = _roundOffsets.y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
    } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */


    if (placement === top) {
      sideY = bottom;
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right;
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref3) {
  var state = _ref3.state,
      options = _ref3.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false
    })));
  }

  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


const computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


const applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$1,
  requires: ['computeStyles']
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign(Object.assign({}, rects), {}, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


const offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

var hash$1 = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash$1[matched];
  });
}

/*:: type OverflowsMap = { [ComputedPlacement]: number }; */

/*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements; // $FlowFixMe

  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


const flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function within(min, value, max) {
  return Math.max(min, Math.min(value, max));
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign(Object.assign({}, state.rects), {}, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var _preventedOffset = within(_min, _offset, _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


const preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = state.modifiersData[name + "#persistent"].padding;
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$2(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
      _options$padding = options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {

    return;
  }

  state.elements.arrow = arrowElement;
  state.modifiersData[name + "#persistent"] = {
    padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
  };
} // eslint-disable-next-line import/no-unused-modules


const arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$2,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


const hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

function getPlacement(el, placement) {
    const values = ["left", "right"];
    if (getElementDir(el) === "rtl") {
        values.reverse();
    }
    return placement.replace(/leading/gi, values[0]).replace(/trailing/gi, values[1]);
}
function createPopper$1({ referenceEl, el, open, placement, modifiers }) {
    if (!referenceEl || !open) {
        return null;
    }
    return createPopper(referenceEl, el, {
        placement: getPlacement(el, placement),
        modifiers
    });
}
function updatePopper({ el, modifiers, placement: calcitePlacement, popper }) {
    const placement = getPlacement(el, calcitePlacement);
    popper.setOptions({
        modifiers,
        placement
    });
}
function hypotenuse(sideA, sideB) {
    return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}
const visiblePointerSize = 4;
const defaultOffsetDistance = Math.ceil(hypotenuse(visiblePointerSize, visiblePointerSize));

const calcitePopoverCss = ":host([hidden]){display:none}:host{display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}:host([aria-hidden=false]){-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16)}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:\"\";-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top])>.arrow{bottom:-4px}:host([data-popper-placement^=bottom])>.arrow{top:-4px}:host([data-popper-placement^=left])>.arrow{right:-4px}:host([data-popper-placement^=right])>.arrow{left:-4px}.container{border-radius:var(--calcite-border-radius);background:var(--calcite-ui-foreground-1);position:relative;display:-ms-flexbox;display:flex;overflow:hidden;-ms-flex-direction:column;flex-direction:column;color:var(--calcite-ui-text-1)}.content{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:start;align-items:flex-start;line-height:24px}.close-button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.close-button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.close-button{display:block;-ms-flex:0 0 auto;flex:0 0 auto;padding:12px;border:none;border-radius:0 var(--calcite-border-radius) 0 0;color:var(--calcite-ui-text-1);cursor:pointer;background:var(--calcite-ui-foreground-1);z-index:1}.close-button:hover{background:var(--calcite-ui-foreground-2)}.close-button:active{background:var(--calcite-ui-foreground-3)}:host-context([dir=rtl]) .close-button{border-radius:var(--calcite-border-radius) 0 0 0}.image-container{overflow:hidden;max-height:200px;margin:5px}slot[name=image]::slotted(img){height:auto;width:100%;max-height:200px;-o-object-position:50% 50%;object-position:50% 50%;-o-object-fit:cover;object-fit:cover}";

const CalcitePopover = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calcitePopoverClose = createEvent(this, "calcitePopoverClose", 7);
        this.calcitePopoverOpen = createEvent(this, "calcitePopoverOpen", 7);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Display a close button within the Popover.
         */
        this.closeButton = false;
        /**
         * Prevents flipping the popover's placement when it starts to overlap its reference element.
         */
        this.disableFlip = false;
        /**
         * Removes the caret pointer.
         */
        this.disablePointer = false;
        /**
         * Offset the position of the popover away from the reference element.
         */
        this.offsetDistance = defaultOffsetDistance;
        /**
         * Offset the position of the popover along the reference element.
         */
        this.offsetSkidding = 0;
        /**
         * Display and position the component.
         */
        this.open = false;
        /**
         * Determines where the component will be positioned relative to the referenceElement.
         */
        this.placement = "auto";
        /** Text for close button. */
        this.intlClose = TEXT$6.close;
        this._referenceElement = this.getReferenceElement();
        this.guid = `calcite-popover-${guid()}`;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = () => {
            return this.el.id || this.guid;
        };
        this.addReferences = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.setAttribute(POPOVER_REFERENCE, "");
            if (!_referenceElement.hasAttribute(ARIA_DESCRIBED_BY)) {
                _referenceElement.setAttribute(ARIA_DESCRIBED_BY, this.getId());
            }
        };
        this.removeReferences = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.removeAttribute(ARIA_DESCRIBED_BY);
            _referenceElement.removeAttribute(POPOVER_REFERENCE);
        };
        this.hide = () => {
            this.open = false;
        };
    }
    offsetDistanceOffsetHandler() {
        this.reposition();
    }
    offsetSkiddingHandler() {
        this.reposition();
    }
    openHandler(open) {
        if (open) {
            this.createPopper();
            this.calcitePopoverOpen.emit();
        }
        else {
            this.destroyPopper();
            this.calcitePopoverClose.emit();
        }
    }
    placementHandler() {
        this.reposition();
    }
    referenceElementHandler() {
        this.removeReferences();
        this._referenceElement = this.getReferenceElement();
        this.addReferences();
        this.createPopper();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        this.createPopper();
        this.addReferences();
    }
    componentDidUnload() {
        this.removeReferences();
        this.destroyPopper();
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async reposition() {
        const { popper, el, placement } = this;
        const modifiers = this.getModifiers();
        popper
            ? updatePopper({
                el,
                modifiers,
                placement,
                popper
            })
            : this.createPopper();
    }
    async setFocus(focusId) {
        var _a, _b;
        if (focusId === "close-button") {
            (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
            return;
        }
        (_b = this.el) === null || _b === void 0 ? void 0 : _b.focus();
    }
    async toggle(value = !this.open) {
        this.open = value;
    }
    getReferenceElement() {
        const { referenceElement } = this;
        return ((typeof referenceElement === "string"
            ? document.getElementById(referenceElement)
            : referenceElement) || null);
    }
    getModifiers() {
        const { arrowEl, flipPlacements, disableFlip, disablePointer, offsetDistance, offsetSkidding } = this;
        const flipModifier = {
            name: "flip",
            enabled: !disableFlip
        };
        if (flipPlacements) {
            flipModifier.options = {
                fallbackPlacements: flipPlacements
            };
        }
        const arrowModifier = {
            name: "arrow",
            enabled: !disablePointer
        };
        if (arrowEl) {
            arrowModifier.options = {
                element: arrowEl
            };
        }
        const offsetModifier = {
            name: "offset",
            enabled: true,
            options: {
                offset: [offsetSkidding, offsetDistance]
            }
        };
        return [arrowModifier, flipModifier, offsetModifier];
    }
    createPopper() {
        this.destroyPopper();
        const { el, open, placement, _referenceElement: referenceEl } = this;
        const modifiers = this.getModifiers();
        this.popper = createPopper$1({
            el,
            modifiers,
            open,
            placement,
            referenceEl
        });
    }
    destroyPopper() {
        const { popper } = this;
        if (popper) {
            popper.destroy();
        }
        this.popper = null;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderImage() {
        return this.el.querySelector("[slot=image]") ? (h("div", { class: CSS$8.imageContainer }, h("slot", { name: "image" }))) : null;
    }
    renderCloseButton() {
        const { closeButton, intlClose } = this;
        return closeButton ? (h("button", { ref: (closeButtonEl) => (this.closeButtonEl = closeButtonEl), "aria-label": intlClose, title: intlClose, class: { [CSS$8.closeButton]: true }, onClick: this.hide }, h("calcite-icon", { icon: "x", scale: "m" }))) : null;
    }
    render() {
        const { _referenceElement, open, disablePointer } = this;
        const displayed = _referenceElement && open;
        const arrowNode = !disablePointer ? (h("div", { class: CSS$8.arrow, ref: (arrowEl) => (this.arrowEl = arrowEl) })) : null;
        return (h(Host, { role: "dialog", "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, arrowNode, h("div", { class: CSS$8.container }, this.renderImage(), h("div", { class: CSS$8.content }, h("slot", null), this.renderCloseButton()))));
    }
    get el() { return this; }
    static get watchers() { return {
        "offsetDistance": ["offsetDistanceOffsetHandler"],
        "offsetSkidding": ["offsetSkiddingHandler"],
        "open": ["openHandler"],
        "placement": ["placementHandler"],
        "referenceElement": ["referenceElementHandler"]
    }; }
    static get style() { return calcitePopoverCss; }
};

const CalcitePopoverManager = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * CSS Selector to match reference elements for popovers.
         */
        this.selector = `[${POPOVER_REFERENCE}]`;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return h(Host, null);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    closeOpenPopovers(event) {
        const target = event.target;
        const { autoClose, el, selector } = this;
        const popoverSelector = "calcite-popover";
        const isTargetInsidePopover = target.closest(popoverSelector);
        const describedByElement = getDescribedByElement(target.closest(selector));
        if (autoClose && !isTargetInsidePopover) {
            Array.from(document.body.querySelectorAll(popoverSelector))
                .filter((popover) => popover.open && popover !== describedByElement)
                .forEach((popover) => popover.toggle(false));
        }
        if (!el.contains(target)) {
            return;
        }
        if (describedByElement) {
            describedByElement.toggle();
        }
    }
    get el() { return this; }
};

const calciteProgressCss = ":host([hidden]){display:none}:host{position:relative;display:block;width:100%}.track,.bar{position:absolute;top:0;height:2px}.track{background:var(--calcite-ui-border-3);z-index:0;width:100%;overflow:hidden}.bar{background-color:var(--calcite-ui-blue-1);z-index:0}.indeterminate{width:20%;-webkit-animation:looping-progress-bar-ani 2200ms linear infinite;animation:looping-progress-bar-ani 2200ms linear infinite}.reversed{animation-direction:reverse}.text{padding:1.5rem 0 0 0;text-align:center;font-size:0.875rem;line-height:1.5}@-webkit-keyframes looping-progress-bar-ani{0%{-webkit-transform:translate3d(-100%, 0, 0);transform:translate3d(-100%, 0, 0)}50%{width:40%}100%{-webkit-transform:translate3d(600%, 0, 0);transform:translate3d(600%, 0, 0)}}@keyframes looping-progress-bar-ani{0%{-webkit-transform:translate3d(-100%, 0, 0);transform:translate3d(-100%, 0, 0)}50%{width:40%}100%{-webkit-transform:translate3d(600%, 0, 0);transform:translate3d(600%, 0, 0)}}";

const CalciteProgress = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** Use indeterminate if finding actual progress value is impossible */
        this.type = "determinate";
        /** Fraction completed, in the range of 0 - 1.0 */
        this.value = 0;
        /** Text label for the progress indicator */
        this.text = null;
        /** For indeterminate progress bars, reverse the animation direction */
        this.reversed = false;
    }
    render() {
        const isDeterminate = this.type === "determinate";
        const barStyles = isDeterminate ? { width: `${this.value * 100}%` } : {};
        return (h(Host, null, h("div", { class: "track" }, h("div", { class: {
                bar: true,
                indeterminate: this.type === "indeterminate",
                reversed: this.reversed,
            }, style: barStyles })), this.text ? h("div", { class: "text" }, this.text) : null));
    }
    get el() { return this; }
    static get style() { return calciteProgressCss; }
};

const calciteRadioButtonCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:grid;grid-gap:8px;-ms-flex-align:center;align-items:center;cursor:pointer;--calcite-label-margin-bottom:0}:host .radio{border-radius:100%;-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1);cursor:pointer;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out}:host(:hover) .radio{-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-1)}:host([disabled]){cursor:default;opacity:0.4}:host([disabled]) .radio,:host([disabled]) label{cursor:default}:host(:hover[disabled]) .radio{-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1)}:host([scale=s]){grid-template-columns:12px 1fr 4px;grid-template-rows:16px 1fr}:host([scale=s]) .radio{height:12px;min-width:12px;max-width:12px}:host([scale=s][checked]) .radio,:host(:hover[scale=s][checked][disabled]) .radio{-webkit-box-shadow:inset 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 4px var(--calcite-ui-blue-1)}:host([scale=s][focused]) .radio{-webkit-box-shadow:inset 0 0 0 4px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 4px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}:host([scale=m]){grid-template-columns:16px 1fr 4px;grid-template-rows:20px 1fr}:host([scale=m]) .radio{height:16px;min-width:16px;max-width:16px}:host([scale=m][checked]) .radio,:host(:hover[scale=m][checked][disabled]) .radio{-webkit-box-shadow:inset 0 0 0 5px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 5px var(--calcite-ui-blue-1)}:host([scale=m][focused]) .radio{-webkit-box-shadow:inset 0 0 0 5px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 5px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}:host([scale=l]){grid-gap:12px;grid-template-columns:20px 1fr 4px;grid-template-rows:24px 1fr}:host([scale=l]) .radio{height:20px;min-width:20px;max-width:20px}:host([scale=l][checked]) .radio,:host(:hover[scale=l][checked][disabled]) .radio{-webkit-box-shadow:inset 0 0 0 6px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 6px var(--calcite-ui-blue-1)}:host([scale=l][focused]) .radio{-webkit-box-shadow:inset 0 0 0 6px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 6px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}";

const CalciteRadioButton = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteRadioButtonChange = createEvent(this, "calciteRadioButtonChange", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** The checked state of the radio button. */
        this.checked = false;
        /** The disabled state of the radio button. */
        this.disabled = false;
        /** The focused state of the radio button. */
        this.focused = false;
        /** The id attribute of the radio button.  When omitted, a globally unique identifier is used. */
        this.guid = this.el.id || `calcite-radio-button-${guid()}`;
        /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
        this.hidden = false;
        /** Requires that a value is selected for the radio button group before the parent form will submit. */
        this.required = false;
        /** The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
        this.scale = "m";
        /** The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
        this.theme = "light";
    }
    checkedChanged(newChecked, oldChecked) {
        if (newChecked === true && oldChecked === false) {
            this.uncheckOtherRadioButtonsInGroup();
        }
        this.input.checked = newChecked;
        this.calciteRadioButtonChange.emit();
    }
    disabledChanged(disabled) {
        this.input.disabled = disabled;
    }
    focusedChanged(focused) {
        if (focused && !this.el.hasAttribute("hidden")) {
            this.input.focus();
        }
        else {
            this.input.blur();
        }
    }
    hiddenChanged(newHidden) {
        this.input.hidden = newHidden;
    }
    nameChanged(newName) {
        this.input.name = newName;
    }
    requiredChanged(required) {
        this.input.required = required;
    }
    validateScale(newScale) {
        const scales = ["s", "m", "l"];
        if (!scales.includes(newScale))
            this.scale = "m";
    }
    validateTheme(newTheme) {
        const themes = ["light", "dark"];
        if (!themes.includes(newTheme))
            this.theme = "light";
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    checkFirstRadioButton() {
        let radioButtons = document.querySelectorAll(`calcite-radio-button[name=${this.name}]`);
        let firstCheckedRadioButton;
        if (radioButtons && radioButtons.length > 0) {
            radioButtons.forEach((radioButton) => {
                if (firstCheckedRadioButton) {
                    radioButton.checked = false;
                }
                else if (radioButton.checked) {
                    firstCheckedRadioButton = radioButton;
                }
                return radioButton;
            });
        }
    }
    setupTitleAttributeObserver() {
        this.titleAttributeObserver = new MutationObserver(() => {
            this.input.title = this.el.getAttribute("title");
        });
        this.titleAttributeObserver.observe(this.el, {
            attributes: true,
            attributeFilter: ["title"],
        });
    }
    uncheckOtherRadioButtonsInGroup() {
        const otherRadioButtons = document.querySelectorAll(`calcite-radio-button[name=${this.name}]:not([guid="${this.guid}"])`);
        otherRadioButtons.forEach((otherRadioButton) => {
            if (otherRadioButton.checked) {
                otherRadioButton.checked = false;
            }
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    check() {
        if (!this.disabled && !this.hidden) {
            this.uncheckOtherRadioButtonsInGroup();
            this.focused = true;
            this.checked = true;
        }
    }
    onInputBlur() {
        this.focused = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.renderHiddenRadioInput();
        this.setupTitleAttributeObserver();
    }
    componentWillLoad() {
        this.validateScale(this.scale);
        this.validateTheme(this.theme);
        if (this.name) {
            this.checkFirstRadioButton();
        }
    }
    disconnectedCallback() {
        this.input.parentNode.removeChild(this.input);
        this.titleAttributeObserver.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHiddenRadioInput() {
        // Rendering a hidden radio input outside Shadow DOM so it can participate in form submissions
        // @link https://www.hjorthhansen.dev/shadow-dom-form-participation/
        this.input = this.el.ownerDocument.createElement("input");
        this.input.setAttribute("aria-label", this.value || this.guid);
        this.input.checked = this.checked;
        this.input.disabled = this.disabled;
        this.input.hidden = this.hidden;
        this.input.id = this.guid;
        if (this.name) {
            this.input.name = this.name;
        }
        this.input.onfocus = this.check.bind(this);
        this.input.onblur = this.onInputBlur.bind(this);
        // We're using option #3 explained here to hide the radio input without compromising accessibility
        // @link https://blog.bitsrc.io/customise-radio-buttons-without-compromising-accessibility-b03061b5ba93
        // The only difference is we're using "fixed" instead of "absolute" positioning thanks to this StackOverflow:
        // @link https://stackoverflow.com/questions/24299567/radio-button-causes-browser-to-jump-to-the-top/24323870
        this.input.style.opacity = "0";
        this.input.style.position = "fixed";
        this.input.style.zIndex = "-1";
        if (this.value) {
            this.input.value = this.value;
        }
        this.input.required = this.required;
        if (this.el.getAttribute("title")) {
            this.input.title = this.el.getAttribute("title");
        }
        else if (this.name && this.value) {
            this.input.title = `Radio button with name of ${this.name} and value of ${this.value}`;
        }
        else {
            this.input.title = this.guid;
        }
        this.input.type = "radio";
        // This renders the input as a sibling of calcite-radio-button because as it turns out
        // doing appendChild as hjorthhansen suggests doesn't really keep it out of the
        // shadow DOM as far as slot behavior goes.  This is required to render {this.value} as fallback slot content.
        this.el.insertAdjacentElement("afterend", this.input);
    }
    render() {
        return (h(Host, { "aria-checked": this.checked.toString(), "aria-disabled": this.disabled }, h("div", { class: "radio" }), h("calcite-label", { dir: document.documentElement.getAttribute("dir"), scale: this.scale }, h("slot", null, this.value))));
    }
    get el() { return this; }
    static get watchers() { return {
        "checked": ["checkedChanged"],
        "disabled": ["disabledChanged"],
        "focused": ["focusedChanged"],
        "hidden": ["hiddenChanged"],
        "name": ["nameChanged"],
        "required": ["requiredChanged"],
        "scale": ["validateScale"],
        "theme": ["validateTheme"]
    }; }
    static get style() { return calciteRadioButtonCss; }
};

const calciteRadioButtonGroupCss = ":host([hidden]){display:none}:host{max-width:100vw}:host([layout=horizontal]){display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}:host([hidden]){display:none}";

const CalciteRadioButtonGroup = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** The disabled state of the radio button group. */
        this.disabled = false;
        /** The radio button group's hidden status.  When a radio button group is hidden none of its options are focusable or checkable. */
        this.hidden = false;
        /** The layout direction of the radio buttons in a group. */
        this.layout = "horizontal";
        /** Requires that a value is selected for the radio button group before the parent form will submit. */
        this.required = false;
        /** The scale (size) of the radio button group. */
        this.scale = "m";
        /** The color theme of the radio button group. */
        this.theme = "light";
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.passPropsToRadioButtons = () => {
            const radioButtons = this.el.querySelectorAll("calcite-radio-button");
            let firstCheckedRadioButton;
            if (radioButtons.length > 0) {
                radioButtons.forEach((radioButton) => {
                    radioButton.disabled = this.disabled;
                    radioButton.hidden = this.hidden;
                    radioButton.name = this.name;
                    radioButton.required = this.required;
                    radioButton.scale = this.scale;
                    radioButton.theme = this.theme;
                    if (firstCheckedRadioButton) {
                        radioButton.checked = false;
                    }
                    else if (radioButton.checked) {
                        firstCheckedRadioButton = radioButton;
                    }
                    return radioButton;
                });
            }
        };
    }
    onDisabledChange() {
        this.passPropsToRadioButtons();
    }
    onHiddenChange() {
        this.passPropsToRadioButtons();
    }
    validateLayout(newLayout) {
        const layouts = ["horizontal", "vertical"];
        if (!layouts.includes(newLayout)) {
            this.layout = "horizontal";
            this.passPropsToRadioButtons();
        }
    }
    validateScale(newScale) {
        const scales = ["s", "m", "l"];
        if (!scales.includes(newScale)) {
            this.scale = "m";
            this.passPropsToRadioButtons();
        }
    }
    validateTheme(newTheme) {
        const themes = ["light", "dark"];
        if (!themes.includes(newTheme)) {
            this.theme = "light";
            this.passPropsToRadioButtons();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.validateLayout(this.layout);
        this.validateScale(this.scale);
        this.validateTheme(this.theme);
        this.passPropsToRadioButtons();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (h(Host, { role: "radiogroup" }, h("slot", null)));
    }
    get el() { return this; }
    static get watchers() { return {
        "disabled": ["onDisabledChange"],
        "hidden": ["onHiddenChange"],
        "layout": ["validateLayout"],
        "scale": ["validateScale"],
        "theme": ["validateTheme"]
    }; }
    static get style() { return calciteRadioButtonGroupCss; }
};

const calciteRadioGroupCss = ":host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;margin-top:0.25rem}:host([layout=vertical]){-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:start;-ms-flex-item-align:start;align-self:flex-start}:host([width=auto]){width:auto}:host([width=full]){width:100%;display:-ms-flexbox;display:flex}:host([width=full]) ::slotted(calcite-radio-group-item){-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-pack:center;justify-content:center}:host([width=full][layout=vertical]) ::slotted(calcite-radio-group-item){-ms-flex-pack:start;justify-content:start}::slotted(calcite-radio-group-item[checked]),::slotted(calcite-radio-group-item:focus){z-index:0}";

const CalciteRadioGroup = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteRadioGroupChange = createEvent(this, "calciteRadioGroupChange", 7);
        /** specify the appearance style of the radio group, defaults to solid. */
        this.appearance = "solid";
        /** specify the layout of the radio group, defaults to horizontal */
        this.layout = "horizontal";
        /** specify the width of the group, defaults to auto */
        this.width = "auto";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.hiddenInput = (() => {
            const input = document.createElement("input");
            input.type = "hidden";
            this.el.appendChild(input);
            return input;
        })();
    }
    handleNameChange(value) {
        this.hiddenInput.name = value;
    }
    handleSelectedItemChange(newItem, oldItem) {
        if (newItem === oldItem) {
            return;
        }
        const items = this.getItems();
        const match = Array.from(items)
            .filter((item) => item === newItem)
            .pop();
        if (match) {
            this.selectItem(match);
            this.calciteRadioGroupChange.emit();
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = getElementProp(this.el.parentElement, "scale", "m");
        let appearance = ["solid", "outline"];
        if (!appearance.includes(this.appearance))
            this.appearance = "solid";
        let layout = ["horizontal", "vertical"];
        if (!layout.includes(this.layout))
            this.layout = "horizontal";
        let width = ["auto", "full"];
        if (!width.includes(this.width))
            this.width = "auto";
        const items = this.getItems();
        let lastChecked = Array.from(items)
            .filter((item) => item.checked)
            .pop();
        if (lastChecked) {
            this.selectItem(lastChecked);
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
        const { hiddenInput, name } = this;
        if (name) {
            hiddenInput.name = name;
        }
        if (lastChecked) {
            hiddenInput.value = lastChecked.value;
        }
    }
    componentDidLoad() {
        this.hasLoaded = true;
    }
    render() {
        return (h(Host, { role: "radiogroup" }, h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleLabelFocus(e) {
        if (hasLabel(e.detail.labelEl, this.el)) {
            this.setFocus();
        }
    }
    handleClick(event) {
        if (event.target.localName === "calcite-radio-group-item") {
            this.selectItem(event.target);
        }
    }
    handleSelected(event) {
        // only fire after initial setup to prevent semi-infinite loops
        if (this.hasLoaded) {
            event.stopPropagation();
            event.preventDefault();
            this.selectItem(event.target);
        }
    }
    handleKeyDown(event) {
        const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
        const key = getKey(event.key);
        const { el, selectedItem } = this;
        if (keys.indexOf(key) === -1) {
            return;
        }
        let adjustedKey = key;
        if (getElementDir(el) === "rtl") {
            if (key === "ArrowRight") {
                adjustedKey = "ArrowLeft";
            }
            if (key === "ArrowLeft") {
                adjustedKey = "ArrowRight";
            }
        }
        const items = this.getItems();
        let selectedIndex = -1;
        items.forEach((item, index) => {
            if (item === selectedItem) {
                selectedIndex = index;
            }
        });
        switch (adjustedKey) {
            case "ArrowLeft":
            case "ArrowUp":
                event.preventDefault();
                const previous = selectedIndex < 1
                    ? items.item(items.length - 1)
                    : items.item(selectedIndex - 1);
                this.selectItem(previous);
                return;
            case "ArrowRight":
            case "ArrowDown":
                event.preventDefault();
                const next = selectedIndex === -1
                    ? items.item(1)
                    : items.item(selectedIndex + 1) || items.item(0);
                this.selectItem(next);
                return;
            case " ":
                event.preventDefault();
                this.selectItem(event.target);
                return;
            default:
                return;
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Focuses the selected item. If there is no selection, it focuses the first item. */
    async setFocus() {
        var _a;
        (_a = (this.selectedItem || this.getItems()[0])) === null || _a === void 0 ? void 0 : _a.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getItems() {
        return this.el.querySelectorAll("calcite-radio-group-item");
    }
    selectItem(selected) {
        if (selected === this.selectedItem) {
            return;
        }
        const items = this.getItems();
        let match = null;
        items.forEach((item) => {
            const matches = item.value === selected.value;
            if ((matches && !item.checked) || (!matches && item.checked)) {
                item.checked = matches;
            }
            item.tabIndex = matches ? 0 : -1;
            if (matches) {
                match = item;
            }
        });
        this.selectedItem = match;
        this.syncWithInputProxy(match);
        if (Build.isBrowser && match) {
            match.focus();
        }
    }
    syncWithInputProxy(item) {
        this.hiddenInput.value = item ? item.value : "";
    }
    get el() { return this; }
    static get watchers() { return {
        "name": ["handleNameChange"],
        "selectedItem": ["handleSelectedItemChange"]
    }; }
    static get style() { return calciteRadioGroupCss; }
};

const calciteRadioGroupItemCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;-ms-flex-item-align:stretch;align-self:stretch;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3);cursor:pointer;line-height:1.25;margin:0 -1px 0 0;border:1px solid var(--calcite-ui-border-1);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent;-webkit-box-sizing:border-box;box-sizing:border-box;font-weight:400;-webkit-transition:background 0.1s ease-in-out, border-color 0.1s ease-in-out;transition:background 0.1s ease-in-out, border-color 0.1s ease-in-out;cursor:pointer}:host([layout=vertical]){margin:0 0 -1px 0}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host([scale=s]){font-size:0.8125rem;line-height:1.5;padding:0.25rem 0.75rem}:host([scale=m]){font-size:0.9375rem;line-height:1.5;padding:0.4rem 1rem}:host([scale=l]){font-size:1rem;line-height:1.5;padding:0.5rem 1.5rem}:host(:hover){background-color:var(--calcite-ui-foreground-2)}:host(:active){background-color:var(--calcite-ui-foreground-3)}:host([checked]){background-color:var(--calcite-ui-blue-1);border-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-background);cursor:default}:host([appearance=outline][checked]){background-color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-blue-1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);color:var(--calcite-ui-blue-1)}label{pointer-events:none;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}::slotted(input){display:none}.radio-group-item-icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;line-height:inherit;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([icon-position=start]) .radio-group-item-icon{margin-right:0.5rem}:host([icon-position=start][dir=rtl]) .radio-group-item-icon{margin-right:0;margin-left:0.5rem}:host([icon-position=end]) .radio-group-item-icon{margin-left:0.5rem}:host([icon-position=end][dir=rtl]) .radio-group-item-icon{margin-left:0;margin-right:0.5rem}";

const CalciteRadioGroupItem = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteRadioGroupItemChange = createEvent(this, "calciteRadioGroupItemChange", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Indicates whether the control is checked. */
        this.checked = false;
        /** optionally used with icon, select where to position the icon */
        this.iconPosition = "start";
        this.mutationObserver = this.getMutationObserver();
    }
    handleCheckedChange() {
        this.calciteRadioGroupItemChange.emit();
        this.syncToExternalInput();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        let inputProxy = this.el.querySelector(`input[slot="input"]`);
        if (inputProxy) {
            this.value = inputProxy.value;
            this.checked = inputProxy.checked;
            if (Build.isBrowser) {
                this.mutationObserver.observe(inputProxy, { attributes: true });
            }
        }
        this.inputProxy = inputProxy;
        // prop validations
        let iconPosition = ["start", "end"];
        if (this.icon !== null && !iconPosition.includes(this.iconPosition))
            this.iconPosition = "start";
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
    }
    componentWillLoad() {
        // only use default slot content in browsers that support shadow dom
        // or if ie11 has no label provided (#374)
        const label = this.el.querySelector("label");
        this.useFallback = !label || label.textContent === "";
    }
    render() {
        const { checked, useFallback, value } = this;
        const scale = getElementProp(this.el, "scale", "m");
        const appearance = getElementProp(this.el, "appearance", "m");
        const layout = getElementProp(this.el, "layout", "m");
        const iconEl = (h("calcite-icon", { class: "radio-group-item-icon", icon: this.icon, scale: "s" }));
        return (h(Host, { role: "radio", "aria-checked": checked.toString(), scale: scale, appearance: appearance, layout: layout }, h("label", null, this.icon && this.iconPosition === "start" ? iconEl : null, h("slot", null, useFallback ? value : ""), h("slot", { name: "input" }), this.icon && this.iconPosition === "end" ? iconEl : null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getMutationObserver() {
        return (Build.isBrowser &&
            new MutationObserver(() => this.syncFromExternalInput()));
    }
    syncFromExternalInput() {
        if (this.inputProxy) {
            this.value = this.inputProxy.value;
            this.checked = this.inputProxy.checked;
        }
    }
    syncToExternalInput() {
        if (!this.inputProxy) {
            return;
        }
        this.inputProxy.value = this.value;
        if (this.checked) {
            this.inputProxy.setAttribute("checked", "true");
        }
        else {
            this.inputProxy.removeAttribute("checked");
        }
    }
    get el() { return this; }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
    static get style() { return calciteRadioGroupItemCss; }
};

const CSS$9 = {
    scrim: "scrim",
    content: "content",
};

const calciteScrimCss = ":host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;position:relative;pointer-events:none;--calcite-scrim-background:rgba(255, 255, 255, 0.75)}:host([theme=dark]){--calcite-scrim-background:rgba(0, 0, 0, 0.75)}@-webkit-keyframes calcite-scrim-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-scrim-fade-in{0%{opacity:0}100%{opacity:1}}.scrim{-ms-flex-align:center;align-items:center;-webkit-animation:calcite-scrim-fade-in 250ms ease-in-out;animation:calcite-scrim-fade-in 250ms ease-in-out;background-color:var(--calcite-scrim-background);bottom:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;left:0;position:absolute;right:0;top:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}.content{position:relative;z-index:1;color:var(--calcite-ui-text-2)}";

const CalciteScrim = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Determines if the component will have the loader overlay.
         * Otherwise, will render opaque disabled state.
         */
        this.loading = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Method
    //
    // --------------------------------------------------------------------------
    render() {
        const loaderNode = this.loading ? (h("calcite-loader", { active: true })) : null;
        const scrimNode = h("div", { class: CSS$9.scrim }, loaderNode);
        const contentNode = (h("div", { class: CSS$9.content }, h("slot", null)));
        return (h(Host, null, scrimNode, contentNode));
    }
    static get style() { return calciteScrimCss; }
};

const calciteSliderCss = "@charset \"UTF-8\";:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:block;padding:7px 0;margin:7px 0;position:relative}:host([disabled]){opacity:0.4;pointer-events:none}:host([disabled]) .track__range,:host([disabled]) .tick--active{background-color:var(--calcite-ui-text-3)}:host([disabled]) .graph .graph-path--highlight{fill:var(--calcite-ui-text-3)}:host([label-handles]),:host([precise]:not([precise=false])){margin-top:21px}:host([label-ticks]),:host([precise]:not([precise=false])[is-range]){margin-bottom:21px}:host([precise]:not([precise=false])[label-handles]){margin-top:35px}:host([precise]:not([precise=false])[label-handles][is-range]){margin-bottom:35px}.thumb{position:absolute;border:none;background:transparent;cursor:pointer;font-family:inherit;z-index:2;outline:none;padding:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-webkit-transform:translate(7px, -8px);transform:translate(7px, -8px)}.thumb .handle__label{font-size:0.75rem;line-height:1.5;font-weight:500;line-height:1;color:var(--calcite-ui-text-2);margin-bottom:5px}.thumb .handle__label.static,.thumb .handle__label.transformed{opacity:0;position:absolute;top:0;bottom:0}.thumb .handle__label--minValue.hyphen::after{content:\"—\";display:inline-block;width:1em}.thumb .handle{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;height:14px;width:14px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:100%;background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:0 0 0 2px var(--calcite-ui-text-3) inset;box-shadow:0 0 0 2px var(--calcite-ui-text-3) inset;-webkit-transition:border 0.25s ease, background-color 0.25s ease, -webkit-box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, -webkit-box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;transition:border 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, -webkit-box-shadow 0.25s ease}.thumb .handle-extension{width:2px;height:7px;background-color:var(--calcite-ui-text-3)}.thumb:hover .handle{-webkit-box-shadow:0 0 0 3px var(--calcite-ui-blue-1) inset;box-shadow:0 0 0 3px var(--calcite-ui-blue-1) inset}.thumb:hover .handle-extension{background-color:var(--calcite-ui-blue-1)}.thumb:focus .handle{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px;outline-offset:2px}.thumb:focus .handle-extension{background-color:var(--calcite-ui-blue-1)}.thumb--minValue{-webkit-transform:translate(-7px, -8px);transform:translate(-7px, -8px)}:host([label-handles]) .thumb{-webkit-transform:translate(50%, -25px);transform:translate(50%, -25px)}:host([label-handles]) .thumb--minValue{-webkit-transform:translate(-50%, -25px);transform:translate(-50%, -25px)}:host([has-histogram][label-handles]) .thumb{-webkit-transform:translate(50%, -8px);transform:translate(50%, -8px)}:host([has-histogram][label-handles]) .thumb .handle__label{margin-bottom:unset;margin-top:5px}:host([has-histogram][label-handles]) .thumb--minValue{-webkit-transform:translate(-50%, -8px);transform:translate(-50%, -8px)}:host([precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -21px);transform:translate(7px, -21px)}:host([precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-7px, -2px);transform:translate(-7px, -2px)}:host([precise]:not([precise=false])) .thumb--minValue .handle__label{margin-bottom:unset;margin-top:5px}:host([has-histogram][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -2px);transform:translate(7px, -2px)}:host([has-histogram][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([ticks][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -20px);transform:translate(7px, -20px)}:host([ticks][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-7px, -3px);transform:translate(-7px, -3px)}:host([has-histogram][ticks][precise]:not([precise=false])) .thumb{-webkit-transform:translate(7px, -3px);transform:translate(7px, -3px)}:host([has-histogram][ticks][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}:host([label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -38px);transform:translate(50%, -38px)}:host([label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([has-histogram][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -2px);transform:translate(50%, -2px)}:host([has-histogram][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -2px);transform:translate(-50%, -2px)}:host([ticks][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -37px);transform:translate(50%, -37px)}:host([ticks][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}:host([has-histogram][ticks][label-handles][precise]:not([precise=false])) .thumb{-webkit-transform:translate(50%, -3px);transform:translate(50%, -3px)}:host([has-histogram][ticks][label-handles][precise]:not([precise=false])) .thumb--minValue{-webkit-transform:translate(-50%, -3px);transform:translate(-50%, -3px)}.thumb:focus,.thumb--active{z-index:3}.thumb:focus .handle,.thumb--active .handle{background-color:var(--calcite-ui-blue-1);-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16)}.thumb:hover.thumb--precise:after,.thumb:focus.thumb--precise:after,.thumb--active.thumb--precise:after{background-color:var(--calcite-ui-blue-1)}.track{height:2px;border-radius:0;z-index:1;background-color:var(--calcite-ui-border-2);-webkit-transition:all 250ms ease-in;transition:all 250ms ease-in;position:relative}.track__range{position:absolute;top:0;height:2px;background-color:var(--calcite-ui-blue-1)}:host([is-range]) .track__range:hover{cursor:ew-resize}:host([is-range]) .track__range:after{content:\"\";position:absolute;top:-5px;width:100%;height:14px}.tick{position:absolute;top:-2px;width:2px;height:4px;left:var(--calcite-ui-border-1-offset);margin-left:-2px;border:1px solid var(--calcite-ui-foreground-1);background-color:var(--calcite-ui-border-1)}.tick--active{background-color:var(--calcite-ui-blue-1)}.tick__label{position:absolute;font-size:0.75rem;line-height:1.5;font-weight:500;color:var(--calcite-ui-text-2);width:4em;margin:14px -2em;text-align:center;display:block;pointer-events:none}.tick__label--min{left:0;margin:14px -3px;text-align:left;-webkit-transition:opacity 150ms;transition:opacity 150ms}.tick__label--max{left:unset;right:0;margin:14px -3px;text-align:right;-webkit-transition:opacity 50ms;transition:opacity 50ms}:host([has-histogram][label-handles]) .tick__label--min,:host([has-histogram][label-handles]) .tick__label--max{margin:6px -3px;font-weight:300;color:var(--calcite-ui-text-3)}:host([has-histogram][precise]:not([precise=false])) .tick__label--min,:host([has-histogram][precise]:not([precise=false])) .tick__label--max{margin:6px -3px;font-weight:300;color:var(--calcite-ui-text-3)}.graph{width:100%;height:48px;position:relative;color:var(--calcite-ui-foreground-2)}.graph svg{position:absolute;width:100%;height:48px}.graph .graph-path--highlight{fill:var(--calcite-ui-blue-1);opacity:0.25}";

const CalciteSlider = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteSliderUpdate = createEvent(this, "calciteSliderUpdate", 7);
        /** Disable and gray out the slider */
        this.disabled = false;
        /** Minimum selectable value */
        this.min = 0;
        /** Maximum selectable value */
        this.max = 100;
        /** Currently selected number (if single select) */
        this.value = null;
        /** Snap selection along the step interval */
        this.snap = true;
        /** Interval to move on up/down keys */
        this.step = 1;
        /** Indicates if a histogram is present */
        this.hasHistogram = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** @internal */
        this.guid = `calcite-slider-${guid()}`;
        /** @internal */
        this.isRange = false;
        /** @internal */
        this.tickValues = [];
        /** @internal */
        this.activeProp = "value";
        /** @internal */
        this.minMaxValueRange = null;
        /** @internal */
        this.minValueDragRange = null;
        /** @internal */
        this.maxValueDragRange = null;
    }
    histogramWatcher(newHistogram) {
        this.hasHistogram = newHistogram ? true : false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.isRange = !!(this.maxValue || this.maxValue === 0);
        this.tickValues = this.generateTickValues();
        this.value = this.bound(this.value);
        if (this.snap) {
            this.value = this.getClosestStep(this.value);
        }
        if (this.histogram) {
            this.hasHistogram = true;
        }
        this.calciteSliderUpdate.emit();
    }
    componentDidRender() {
        if (this.labelHandles) {
            this.adjustHostObscuredHandleLabel("value");
            if (this.isRange) {
                this.adjustHostObscuredHandleLabel("minValue");
                if (!(this.precise && this.isRange && !this.hasHistogram)) {
                    this.hyphenateCollidingRangeHandleLabels();
                }
            }
        }
        this.hideObscuredBoundingTickLabels();
    }
    render() {
        const id = this.el.id || this.guid;
        const min = this.minValue || this.min;
        const max = this.maxValue || this.value;
        const maxProp = this.isRange ? "maxValue" : "value";
        const value = this[maxProp];
        const left = `${this.getUnitInterval(min) * 100}%`;
        const right = `${100 - this.getUnitInterval(max) * 100}%`;
        const handle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } }, h("div", { class: "handle" })));
        const labeledHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } }, h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("div", { class: "handle" })));
        const histogramLabeledHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
            } }, h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value)));
        const preciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("div", { class: "handle" }), h("div", { class: "handle-extension" })));
        const histogramPreciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" })));
        const labeledPreciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("div", { class: "handle" }), h("div", { class: "handle-extension" })));
        const histogramLabeledPreciseHandle = (h("button", { ref: (el) => (this.maxHandle = el), onFocus: () => (this.activeProp = maxProp), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart(maxProp), onTouchStart: (e) => this.dragStart(maxProp, e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.isRange ? this.maxLabel : this.minLabel, "aria-valuenow": value, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { right }, class: {
                thumb: true,
                "thumb--value": true,
                "thumb--active": this.lastDragProp !== "minMaxValue" && this.dragProp === maxProp,
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--value", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value static", "aria-hidden": "true" }, value ? value.toLocaleString() : value), h("span", { class: "handle__label handle__label--value transformed", "aria-hidden": "true" }, value ? value.toLocaleString() : value)));
        const minHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } }, h("div", { class: "handle" })));
        const minLabeledHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } }, h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("div", { class: "handle" })));
        const minHistogramLabeledHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
            } }, h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString())));
        const minPreciseHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" })));
        const minLabeledPreciseHandle = (h("button", { ref: (el) => (this.minHandle = el), onFocus: () => (this.activeProp = "minValue"), onBlur: () => (this.activeProp = null), onMouseDown: () => this.dragStart("minValue"), onTouchStart: (e) => this.dragStart("minValue", e), role: "slider", "aria-orientation": "horizontal", "aria-label": this.minLabel, "aria-valuenow": this.minValue, "aria-valuemin": this.min, "aria-valuemax": this.max, disabled: this.disabled, style: { left }, class: {
                thumb: true,
                "thumb--minValue": true,
                "thumb--active": this.dragProp === "minValue",
                "thumb--precise": true,
            } }, h("div", { class: "handle-extension" }), h("div", { class: "handle" }), h("span", { class: "handle__label handle__label--minValue", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue static", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString()), h("span", { class: "handle__label handle__label--minValue transformed", "aria-hidden": "true" }, this.minValue && this.minValue.toLocaleString())));
        return (h(Host, { id: id, "is-range": this.isRange }, this.renderGraph(), h("div", { class: "track" }, h("div", { class: "track__range", onMouseDown: () => this.dragStart("minMaxValue"), onTouchStart: (e) => this.dragStart("minMaxValue", e), style: { left, right } }), h("div", { class: "ticks" }, this.tickValues.map((tick) => (h("span", { class: {
                tick: true,
                "tick--active": tick >= min && tick <= max,
            }, style: {
                left: `${this.getUnitInterval(tick) * 100}%`,
            } }, this.renderTickLabel(tick)))))), !this.precise && !this.labelHandles && this.isRange && minHandle, !this.hasHistogram &&
            !this.precise &&
            this.labelHandles &&
            this.isRange &&
            minLabeledHandle, this.precise && !this.labelHandles && this.isRange && minPreciseHandle, this.precise &&
            this.labelHandles &&
            this.isRange &&
            minLabeledPreciseHandle, this.hasHistogram &&
            !this.precise &&
            this.labelHandles &&
            this.isRange &&
            minHistogramLabeledHandle, !this.precise && !this.labelHandles && handle, !this.hasHistogram &&
            !this.precise &&
            this.labelHandles &&
            labeledHandle, !this.hasHistogram &&
            this.precise &&
            !this.labelHandles &&
            preciseHandle, this.hasHistogram &&
            this.precise &&
            !this.labelHandles &&
            histogramPreciseHandle, !this.hasHistogram &&
            this.precise &&
            this.labelHandles &&
            labeledPreciseHandle, this.hasHistogram &&
            !this.precise &&
            this.labelHandles &&
            histogramLabeledHandle, this.hasHistogram &&
            this.precise &&
            this.labelHandles &&
            histogramLabeledPreciseHandle));
    }
    renderGraph() {
        return this.histogram ? (h("div", { class: "graph" }, h("calcite-graph", { width: 300, height: 48, data: this.histogram, highlightMin: this.isRange ? this.minValue : this.min, highlightMax: this.isRange ? this.maxValue : this.value }))) : null;
    }
    renderTickLabel(tick) {
        const isMinTickLabel = tick === this.min;
        const isMaxTickLabel = tick === this.max;
        const tickLabel = (h("span", { class: {
                tick__label: true,
                "tick__label--min": isMinTickLabel,
                "tick__label--max": isMaxTickLabel,
            } }, tick.toLocaleString()));
        if (this.labelTicks && !this.hasHistogram && !this.isRange) {
            return tickLabel;
        }
        if (this.labelTicks &&
            !this.hasHistogram &&
            this.isRange &&
            !this.precise &&
            !this.labelHandles) {
            return tickLabel;
        }
        if (this.labelTicks &&
            !this.hasHistogram &&
            this.isRange &&
            !this.precise &&
            this.labelHandles) {
            return tickLabel;
        }
        if (this.labelTicks &&
            !this.hasHistogram &&
            this.isRange &&
            this.precise &&
            (isMinTickLabel || isMaxTickLabel)) {
            return tickLabel;
        }
        if (this.labelTicks &&
            this.hasHistogram &&
            !this.precise &&
            !this.labelHandles) {
            return tickLabel;
        }
        if (this.labelTicks &&
            this.hasHistogram &&
            this.precise &&
            !this.labelHandles &&
            (isMinTickLabel || isMaxTickLabel)) {
            return tickLabel;
        }
        if (this.labelTicks &&
            this.hasHistogram &&
            !this.precise &&
            this.labelHandles &&
            (isMinTickLabel || isMaxTickLabel)) {
            return tickLabel;
        }
        if (this.labelTicks &&
            this.hasHistogram &&
            this.precise &&
            this.labelHandles &&
            (isMinTickLabel || isMaxTickLabel)) {
            return tickLabel;
        }
        return null;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleLabelFocus(e) {
        if (e.detail.interactedEl !== this.el &&
            hasLabel(e.detail.labelEl, this.el)) {
            this.setFocus();
        }
    }
    keyDownHandler(e) {
        const value = this[this.activeProp];
        switch (getKey(e.key)) {
            case "ArrowUp":
            case "ArrowRight":
                e.preventDefault();
                this[this.activeProp] = this.bound(value + this.step, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case "ArrowDown":
            case "ArrowLeft":
                e.preventDefault();
                this[this.activeProp] = this.bound(value - this.step, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case "PageUp":
                if (this.pageStep) {
                    e.preventDefault();
                    this[this.activeProp] = this.bound(value + this.pageStep, this.activeProp);
                    this.calciteSliderUpdate.emit();
                }
                break;
            case "PageDown":
                if (this.pageStep) {
                    e.preventDefault();
                    this[this.activeProp] = this.bound(value - this.pageStep, this.activeProp);
                    this.calciteSliderUpdate.emit();
                }
                break;
            case "Home":
                e.preventDefault();
                this[this.activeProp] = this.bound(this.min, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
            case "End":
                e.preventDefault();
                this[this.activeProp] = this.bound(this.max, this.activeProp);
                this.calciteSliderUpdate.emit();
                break;
        }
    }
    clickHandler(e) {
        const x = e.clientX || e.pageX;
        const num = this.translate(x);
        let prop = "value";
        if (this.isRange) {
            if (this.lastDragProp === "minMaxValue") {
                prop = "minMaxValue";
            }
            else {
                const closerToMax = Math.abs(this.maxValue - num) < Math.abs(this.minValue - num);
                prop = closerToMax ? "maxValue" : "minValue";
            }
        }
        this[prop] = this.bound(num, prop);
        this.calciteSliderUpdate.emit();
        switch (prop) {
            default:
            case "maxValue":
                this.maxHandle.focus();
                break;
            case "minValue":
                this.minHandle.focus();
                break;
            case "minMaxValue":
                break;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    async setFocus() {
        const handle = this.minHandle ? this.minHandle : this.maxHandle;
        handle.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    generateTickValues() {
        const ticks = [];
        let current = this.min;
        while (this.ticks && current < this.max + this.ticks) {
            ticks.push(current);
            current = current + this.ticks;
        }
        return ticks;
    }
    dragStart(prop, e) {
        if (e) {
            e.preventDefault();
        }
        if (this.dragListener) {
            this.dragEnd();
        }
        this.dragProp = prop;
        this.lastDragProp = this.dragProp;
        this.activeProp = prop;
        this.dragListener = this.dragListener || this.dragUpdate.bind(this);
        document.addEventListener("mousemove", this.dragListener);
        document.addEventListener("touchmove", this.dragListener, {
            capture: false,
        });
        document.addEventListener("mouseup", this.dragEnd.bind(this));
        document.addEventListener("touchend", this.dragEnd.bind(this), false);
        document.addEventListener("touchcancel", this.dragEnd.bind(this));
    }
    dragUpdate(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.dragProp) {
            const value = this.translate(e.clientX || e.pageX);
            if (this.isRange && this.dragProp === "minMaxValue") {
                if (this.minValueDragRange &&
                    this.maxValueDragRange &&
                    this.minMaxValueRange) {
                    const newMinValue = value - this.minValueDragRange;
                    const newMaxValue = value + this.maxValueDragRange;
                    if (newMaxValue <= this.max &&
                        newMinValue >= this.min &&
                        newMaxValue - newMinValue === this.minMaxValueRange) {
                        this.minValue = this.bound(newMinValue, "minValue");
                        this.maxValue = this.bound(newMaxValue, "maxValue");
                    }
                }
                else {
                    this.minValueDragRange = value - this.minValue;
                    this.maxValueDragRange = this.maxValue - value;
                    this.minMaxValueRange = this.maxValue - this.minValue;
                }
            }
            else {
                this[this.dragProp] = this.bound(value, this.dragProp);
            }
            this.calciteSliderUpdate.emit();
        }
    }
    dragEnd() {
        this.dragProp = null;
        document.removeEventListener("mousemove", this.dragListener);
        document.removeEventListener("touchmove", this.dragListener);
        this.minValueDragRange = null;
        this.maxValueDragRange = null;
        this.minMaxValueRange = null;
    }
    /**
     * If number is outside range, constrain to min or max
     * @internal
     */
    bound(num, prop) {
        num = Math.min(num, this.max);
        num = Math.max(num, this.min);
        // ensure that maxValue and minValue don't swap positions
        if (prop === "maxValue") {
            num = Math.max(num, this.minValue);
        }
        if (prop === "minValue") {
            num = Math.min(num, this.maxValue);
        }
        return num;
    }
    /**
     * Translate a pixel position to value along the range
     * @internal
     */
    translate(x) {
        const range = this.max - this.min;
        const { left, width } = this.el.getBoundingClientRect();
        const percent = (x - left) / width;
        let value = this.bound(this.min + range * percent);
        if (this.snap && this.step) {
            value = this.getClosestStep(value);
        }
        return value;
    }
    /**
     * Get closest allowed value along stepped values
     * @internal
     */
    getClosestStep(num) {
        num = this.bound(num);
        if (this.step) {
            const step = Math.round(num / this.step) * this.step;
            num = this.bound(step);
        }
        return num;
    }
    getFontSizeForElement(element) {
        return Number(window
            .getComputedStyle(element)
            .getPropertyValue("font-size")
            .match(/\d+/)[0]);
    }
    /**
     * Get position of value along range as fractional value
     * @return {number} number in the unit interval [0,1]
     * @internal
     */
    getUnitInterval(num) {
        num = this.bound(num);
        const range = this.max - this.min;
        return (num - this.min) / range;
    }
    adjustHostObscuredHandleLabel(name) {
        const label = this.el.shadowRoot.querySelector(`.handle__label--${name}`);
        const labelStatic = this.el.shadowRoot.querySelector(`.handle__label--${name}.static`);
        const labelTransformed = this.el.shadowRoot.querySelector(`.handle__label--${name}.transformed`);
        const labelStaticOffset = this.getHostOffset(labelStatic.getBoundingClientRect().left, labelStatic.getBoundingClientRect().right);
        label.style.transform = `translateX(${labelStaticOffset}px)`;
        labelTransformed.style.transform = `translateX(${labelStaticOffset}px)`;
    }
    hyphenateCollidingRangeHandleLabels() {
        const minValueLabel = this.el.shadowRoot.querySelector(`.handle__label--minValue`);
        const minValueLabelStatic = this.el.shadowRoot.querySelector(`.handle__label--minValue.static`);
        const minValueLabelTransformed = this.el.shadowRoot.querySelector(`.handle__label--minValue.transformed`);
        const minValueLabelStaticHostOffset = this.getHostOffset(minValueLabelStatic.getBoundingClientRect().left, minValueLabelStatic.getBoundingClientRect().right);
        const valueLabel = this.el.shadowRoot.querySelector(`.handle__label--value`);
        const valueLabelStatic = this.el.shadowRoot.querySelector(`.handle__label--value.static`);
        const valueLabelTransformed = this.el.shadowRoot.querySelector(`.handle__label--value.transformed`);
        const valueLabelStaticHostOffset = this.getHostOffset(valueLabelStatic.getBoundingClientRect().left, valueLabelStatic.getBoundingClientRect().right);
        const labelFontSize = this.getFontSizeForElement(minValueLabel);
        const labelTransformedOverlap = this.getRangeLabelOverlap(minValueLabelTransformed, valueLabelTransformed);
        if (labelTransformedOverlap > 0) {
            minValueLabel.classList.add("hyphen");
            if (valueLabelStaticHostOffset === 0 &&
                minValueLabelStaticHostOffset === 0) {
                // Neither handle overlaps the host boundary
                let minValueLabelTranslate = labelTransformedOverlap / 2 - labelFontSize / 2;
                if (Math.sign(minValueLabelTranslate) === -1) {
                    minValueLabelTranslate = Math.abs(minValueLabelTranslate);
                }
                else {
                    minValueLabelTranslate = -minValueLabelTranslate;
                }
                const minValueLabelTransformedHostOffset = this.getHostOffset(minValueLabelTransformed.getBoundingClientRect().left +
                    minValueLabelTranslate -
                    labelFontSize / 2, minValueLabelTransformed.getBoundingClientRect().right +
                    minValueLabelTranslate -
                    labelFontSize / 2);
                let valueLabelTranslate = labelTransformedOverlap / 2;
                const valueLabelTransformedHostOffset = this.getHostOffset(valueLabelTransformed.getBoundingClientRect().left +
                    valueLabelTranslate, valueLabelTransformed.getBoundingClientRect().right +
                    valueLabelTranslate);
                if (minValueLabelTransformedHostOffset !== 0) {
                    minValueLabelTranslate =
                        minValueLabelTranslate + minValueLabelTransformedHostOffset;
                    valueLabelTranslate =
                        valueLabelTranslate + minValueLabelTransformedHostOffset;
                }
                if (valueLabelTransformedHostOffset !== 0) {
                    minValueLabelTranslate =
                        minValueLabelTranslate + valueLabelTransformedHostOffset;
                    valueLabelTranslate =
                        valueLabelTranslate + valueLabelTransformedHostOffset;
                }
                minValueLabel.style.transform = `translateX(${minValueLabelTranslate}px)`;
                minValueLabelTransformed.style.transform = `translateX(${minValueLabelTranslate - labelFontSize / 2}px)`;
                valueLabel.style.transform = `translateX(${valueLabelTranslate}px)`;
                valueLabelTransformed.style.transform = `translateX(${valueLabelTranslate}px)`;
            }
            else if (minValueLabelStaticHostOffset !== 0 &&
                (Math.sign(valueLabelStaticHostOffset) === 0 ||
                    Math.sign(valueLabelStaticHostOffset) === 1)) {
                // minValueLabel overlaps host boundary on the left side
                minValueLabel.style.transform = `translateX(${minValueLabelStaticHostOffset + labelFontSize / 2}px)`;
                valueLabel.style.transform = `translateX(${labelTransformedOverlap + valueLabelStaticHostOffset}px)`;
                valueLabelTransformed.style.transform = `translateX(${labelTransformedOverlap + valueLabelStaticHostOffset}px)`;
            }
            else if (valueLabelStaticHostOffset !== 0) {
                // valueLabel overlaps host boundary on the right side
                let minValueLabelTranslate = Math.abs(minValueLabelStaticHostOffset) +
                    labelTransformedOverlap -
                    labelFontSize / 2;
                if (Math.sign(minValueLabelTranslate) === -1) {
                    minValueLabelTranslate = Math.abs(minValueLabelTranslate);
                }
                else {
                    minValueLabelTranslate = -minValueLabelTranslate;
                }
                minValueLabel.style.transform = `translateX(${minValueLabelTranslate}px)`;
                minValueLabelTransformed.style.transform = `translateX(${minValueLabelTranslate - labelFontSize / 2}px)`;
            }
        }
        else {
            minValueLabel.classList.remove("hyphen");
            minValueLabel.style.transform = `translateX(${minValueLabelStaticHostOffset}px)`;
            minValueLabelTransformed.style.transform = `translateX(${minValueLabelStaticHostOffset}px)`;
            valueLabel.style.transform = `translateX(${valueLabelStaticHostOffset}px)`;
            valueLabelTransformed.style.transform = `translateX(${valueLabelStaticHostOffset}px)`;
        }
    }
    /**
     * Hides bounding tick labels that are obscured by either handle.
     */
    hideObscuredBoundingTickLabels() {
        if (!this.hasHistogram &&
            !this.isRange &&
            !this.labelHandles &&
            !this.precise) {
            return;
        }
        if (!this.hasHistogram &&
            !this.isRange &&
            this.labelHandles &&
            !this.precise) {
            return;
        }
        if (!this.hasHistogram &&
            !this.isRange &&
            !this.labelHandles &&
            this.precise) {
            return;
        }
        if (!this.hasHistogram &&
            !this.isRange &&
            this.labelHandles &&
            this.precise) {
            return;
        }
        if (!this.hasHistogram && this.isRange && !this.precise) {
            return;
        }
        if (this.hasHistogram && !this.precise && !this.labelHandles) {
            return;
        }
        const minHandle = this.el.shadowRoot.querySelector(".thumb--minValue");
        const maxHandle = this.el.shadowRoot.querySelector(".thumb--value");
        const minTickLabel = this.el.shadowRoot.querySelector(".tick__label--min");
        const maxTickLabel = this.el.shadowRoot.querySelector(".tick__label--max");
        if (!minHandle && maxHandle && minTickLabel && maxTickLabel) {
            if (this.isMinTickLabelObscured(minTickLabel, maxHandle)) {
                minTickLabel.style.opacity = "0";
            }
            else {
                minTickLabel.style.opacity = "1";
            }
            if (this.isMaxTickLabelObscured(maxTickLabel, maxHandle)) {
                maxTickLabel.style.opacity = "0";
            }
            else {
                maxTickLabel.style.opacity = "1";
            }
        }
        if (minHandle && maxHandle && minTickLabel && maxTickLabel) {
            if (this.isMinTickLabelObscured(minTickLabel, minHandle) ||
                this.isMinTickLabelObscured(minTickLabel, maxHandle)) {
                minTickLabel.style.opacity = "0";
            }
            else {
                minTickLabel.style.opacity = "1";
            }
            if (this.isMaxTickLabelObscured(maxTickLabel, minHandle) ||
                (this.isMaxTickLabelObscured(maxTickLabel, maxHandle) &&
                    this.hasHistogram)) {
                maxTickLabel.style.opacity = "0";
            }
            else {
                maxTickLabel.style.opacity = "1";
            }
        }
    }
    /**
     * Returns an integer representing the number of pixels to offset on the left or right side based on desired position behavior.
     * @internal
     */
    getHostOffset(leftBounds, rightBounds) {
        const hostBounds = this.el.getBoundingClientRect();
        if (leftBounds + 7 < hostBounds.left) {
            const offset = hostBounds.left - leftBounds - 7;
            return offset;
        }
        if (rightBounds - 7 > hostBounds.right) {
            const offset = -(rightBounds - hostBounds.right) + 7;
            return offset;
        }
        return 0;
    }
    /**
     * Returns an integer representing the number of pixels that the two given span elements are overlapping, taking into account
     * a space in between the two spans equal to the font-size set on them to account for the space needed to render a hyphen.
     * @param minValueLabel
     * @param valueLabel
     */
    getRangeLabelOverlap(minValueLabel, valueLabel) {
        const minValueLabelBounds = minValueLabel.getBoundingClientRect();
        const valueLabelBounds = valueLabel.getBoundingClientRect();
        const minValueLabelFontSize = this.getFontSizeForElement(minValueLabel);
        const rangeLabelOverlap = minValueLabelBounds.right + minValueLabelFontSize - valueLabelBounds.left;
        return rangeLabelOverlap > 0 ? rangeLabelOverlap : 0;
    }
    /**
     * Returns a boolean value representing if the minLabel span element is obscured (being overlapped) by the given handle button element.
     * @param minLabel
     * @param handle
     */
    isMinTickLabelObscured(minLabel, handle) {
        const minLabelBounds = minLabel.getBoundingClientRect();
        const handleBounds = handle.getBoundingClientRect();
        if (handleBounds.left < minLabelBounds.right) {
            return true;
        }
        return false;
    }
    /**
     * Returns a boolean value representing if the maxLabel span element is obscured (being overlapped) by the given handle button element.
     * @param maxLabel
     * @param handle
     */
    isMaxTickLabelObscured(maxLabel, handle) {
        const maxLabelBounds = maxLabel.getBoundingClientRect();
        const handleBounds = handle.getBoundingClientRect();
        if (handleBounds.right > maxLabelBounds.left) {
            return true;
        }
        return false;
    }
    get el() { return this; }
    static get watchers() { return {
        "histogram": ["histogramWatcher"]
    }; }
    static get style() { return calciteSliderCss; }
};

const calciteSplitButtonCss = ":host([hidden]){display:none}:host{--calcite-button-light:#eaeaea;--calcite-button-light-text:#151515;--calcite-button-dark:#404040;--calcite-button-dark-text:#0b0b0b}:host .split-button__container{display:-ms-flexbox;display:flex}:host .split-button__container>calcite-dropdown>calcite-button{height:100%}:host([color=blue]) .split-button__divider-container{background-color:var(--calcite-ui-blue-1)}:host([color=blue]):host([theme=dark]) .split-button__divider{background-color:var(--calcite-button-dark-text)}:host([color=red]) .split-button__divider-container{background-color:var(--calcite-ui-red-1)}:host([color=red]):host([theme=dark]) .split-button__divider{background-color:var(--calcite-button-dark-text)}:host([color=light]) .split-button__divider-container{background-color:var(--calcite-button-light)}:host([color=light]) .split-button__divider{background-color:var(--calcite-button-light-text)}:host([color=dark]) .split-button__divider-container{background-color:var(--calcite-button-dark)}:host([disabled]) .split-button__divider-container{opacity:0.4}:host([disabled]) calcite-dropdown>calcite-button{pointer-events:none}.split-button__divider-container{width:1px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out}.split-button__divider{width:1px;height:66.666%;display:inline-block;background-color:white}";

const CalciteSplitButton = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteSplitButtonPrimaryClick = createEvent(this, "calciteSplitButtonPrimaryClick", 7);
        /** specify the color of the control, defaults to blue */
        this.color = "blue";
        /** specify the scale of the control, defaults to m */
        this.scale = "m";
        /** specify the icon used for the dropdown menu, defaults to chevron */
        this.dropdownIconType = "chevron";
        /** optionally add a calcite-loader component to the control,
          disabling interaction. with the primary button */
        this.loading = false;
        this.calciteSplitButtonPrimaryClickHandler = (e) => this.calciteSplitButtonPrimaryClick.emit(e);
    }
    validateColor() {
        let color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
    }
    validateScale() {
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    validateTheme() {
        let theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
    }
    validateDropdownIconType() {
        let dropdownIconType = ["chevron", "caret", "ellipsis", "overflow"];
        if (!dropdownIconType.includes(this.dropdownIconType))
            this.dropdownIconType = "chevron";
    }
    connectedCallback() {
        this.validateColor();
        this.validateScale();
        this.validateTheme();
        this.validateDropdownIconType();
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("div", { class: "split-button__container" }, h("calcite-button", { dir: dir, "aria-label": this.primaryLabel, color: this.color, scale: this.scale, loading: this.loading, "icon-start": this.primaryIconStart ? this.primaryIconStart : null, "icon-end": this.primaryIconEnd ? this.primaryIconEnd : null, disabled: this.disabled, theme: this.theme, onClick: this.calciteSplitButtonPrimaryClickHandler }, this.primaryText), h("div", { class: "split-button__divider-container" }, h("div", { class: "split-button__divider" })), h("calcite-dropdown", { alignment: "end", dir: dir, theme: this.theme, scale: this.scale, width: this.scale }, h("calcite-button", { dir: dir, "aria-label": this.dropdownLabel, slot: "dropdown-trigger", scale: this.scale, color: this.color, disabled: this.disabled, theme: this.theme, "icon-start": this.dropdownIcon }), h("slot", null)))));
    }
    get dropdownIcon() {
        return this.dropdownIconType === "chevron"
            ? "chevronDown"
            : this.dropdownIconType === "caret"
                ? "caretDown"
                : this.dropdownIconType === "ellipsis"
                    ? "ellipsis"
                    : "handle-vertical";
    }
    get el() { return this; }
    static get watchers() { return {
        "color": ["validateColor"],
        "scale": ["validateScale"],
        "theme": ["validateTheme"],
        "dropdownIconType": ["validateDropdownIconType"]
    }; }
    static get style() { return calciteSplitButtonCss; }
};

const calciteStepperCss = ":host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:stretch;align-items:stretch;width:100%;min-width:100%}:host([layout=vertical]){-ms-flex-direction:column;flex-direction:column;-ms-flex:1 auto auto;flex:1 auto auto}:host .stepper-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;width:100%;min-width:100%}";

const CalciteStepper = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteStepperItemChange = createEvent(this, "calciteStepperItemChange", 7);
        /** specify the scale of stepper, defaults to m */
        this.scale = "m";
        /** optionally display the number next to the step title */
        this.numbered = false;
        /** optionally display a status icon next to the step title */
        this.icon = false;
        /** specify the layout of stepper, defaults to horizontal */
        this.layout = "horizontal";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** created list of Stepper items */
        this.items = [];
        /** sorted list of Stepper items */
        this.sortedItems = [];
    }
    // watch for removal of disabled to register step
    contentWatcher() {
        this.updateContent(this.requestedContent);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let layout = ["horizontal", "vertical"];
        if (!layout.includes(this.layout))
            this.layout = "horizontal";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let numbered = [true, false];
        if (!numbered.includes(this.numbered))
            this.numbered = false;
        let icon = [true, false];
        if (!icon.includes(this.icon))
            this.icon = false;
    }
    componentDidLoad() {
        // if no stepper items are set as active, default to the first one
        if (!this.currentPosition) {
            this.calciteStepperItemChange.emit({
                position: 0,
            });
        }
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("slot", null), this.layout === "horizontal" ? (h("div", { class: "stepper-content", ref: (el) => (this.stepperContentContainer = el) })) : null));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteStepperItemKeyEvent(e) {
        let item = e.detail.item;
        let itemToFocus = e.target;
        let isFirstItem = this.itemIndex(itemToFocus) === 0;
        let isLastItem = this.itemIndex(itemToFocus) === this.sortedItems.length - 1;
        switch (getKey(item.key)) {
            case "ArrowDown":
            case "ArrowRight":
                if (isLastItem)
                    this.focusFirstItem();
                else
                    this.focusNextItem(itemToFocus);
                break;
            case "ArrowUp":
            case "ArrowLeft":
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
    registerItem(event) {
        const item = {
            item: event.target,
            position: event.detail.position,
            content: event.detail.content,
        };
        if (item.content !== null && item.item.active)
            this.requestedContent = [item.content];
        if (!this.items.includes(item))
            this.items.push(item);
        this.sortedItems = this.sortItems();
    }
    updateItem(event) {
        if (event.detail.content)
            this.requestedContent =
                event.detail.content.length > 0
                    ? event.detail.content
                    : [event.detail.content];
        this.currentPosition = event.detail.position;
        this.calciteStepperItemChange.emit({
            position: this.currentPosition,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** set the next step as active */
    async nextStep() {
        this.currentPosition =
            this.currentPosition + 1 < this.items.length
                ? this.currentPosition + 1
                : this.currentPosition;
        this.emitChangedItem();
    }
    /** set the previous step as active */
    async prevStep() {
        this.currentPosition =
            this.currentPosition - 1 >= 0
                ? this.currentPosition - 1
                : this.currentPosition;
        this.emitChangedItem();
    }
    /** set the requested step as active */
    async goToStep(num) {
        this.currentPosition = num - 1;
        this.emitChangedItem();
    }
    /** set the first step as active */
    async startStep() {
        this.currentPosition = 0;
        this.emitChangedItem();
    }
    /** set the last step as active */
    async endStep() {
        this.currentPosition = this.items.length - 1;
        this.emitChangedItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    emitChangedItem() {
        this.calciteStepperItemChange.emit({
            position: this.currentPosition,
        });
    }
    focusFirstItem() {
        const firstItem = this.sortedItems[0];
        this.focusElement(firstItem);
    }
    focusLastItem() {
        const lastItem = this.sortedItems[this.sortedItems.length - 1];
        this.focusElement(lastItem);
    }
    focusNextItem(e) {
        const index = this.itemIndex(e);
        const nextItem = this.sortedItems[index + 1] || this.sortedItems[0];
        this.focusElement(nextItem);
    }
    focusPrevItem(e) {
        const index = this.itemIndex(e);
        const prevItem = this.sortedItems[index - 1] ||
            this.sortedItems[this.sortedItems.length - 1];
        this.focusElement(prevItem);
    }
    itemIndex(e) {
        return this.sortedItems.indexOf(e);
    }
    focusElement(item) {
        const target = item;
        target.focus();
    }
    sortItems() {
        let items = Array.from(this.items)
            .filter((a) => !a.item.disabled)
            .sort((a, b) => a.position - b.position)
            .map((a) => a.item);
        return [...Array.from(new Set(items))];
    }
    updateContent(content) {
        if (this.stepperContentContainer) {
            this.stepperContentContainer.innerHTML = ``;
            this.stepperContentContainer.append(...content);
        }
    }
    get el() { return this; }
    static get watchers() { return {
        "requestedContent": ["contentWatcher"]
    }; }
    static get style() { return calciteStepperCss; }
};

const calciteStepperItemCss = ":host([hidden]){display:none}:host([scale=s]){--calcite-stepper-item-spacing-unit-s:0.1875rem;--calcite-stepper-item-spacing-unit-m:0.375rem;--calcite-stepper-item-spacing-unit-l:0.75rem;font-size:0.875rem;line-height:1.5}:host([scale=m]){--calcite-stepper-item-spacing-unit-s:0.25rem;--calcite-stepper-item-spacing-unit-m:0.5rem;--calcite-stepper-item-spacing-unit-l:1rem;font-size:0.9375rem;line-height:1.5}:host([scale=l]){--calcite-stepper-item-spacing-unit-s:0.375rem;--calcite-stepper-item-spacing-unit-m:0.75rem;--calcite-stepper-item-spacing-unit-l:1.5rem;font-size:1rem;line-height:1.5}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;text-decoration:none;outline:none;position:relative;border-top:3px solid var(--calcite-ui-border-3);cursor:pointer;margin-right:var(--calcite-stepper-item-spacing-unit-l)}:host([dir=rtl]){margin-left:var(--calcite-stepper-item-spacing-unit-l);margin-right:0}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host .stepper-item-header{display:-ms-flexbox;display:flex;-ms-flex-direction:var(--calcite-stepper-item-flex-direction);flex-direction:var(--calcite-stepper-item-flex-direction);-ms-flex-align:start;align-items:flex-start;cursor:pointer}:host .stepper-item-content,:host .stepper-item-header{padding:var(--calcite-stepper-item-spacing-unit-l) var(--calcite-stepper-item-spacing-unit-m);padding-left:0;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;text-align:left}:host([dir=rtl]) .stepper-item-content,:host([dir=rtl]) .stepper-item-header{padding-left:initial;padding-right:0;text-align:right}:host .stepper-item-header *{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host .stepper-item-content{-ms-flex-direction:column;flex-direction:column;width:100%;display:none}:host .stepper-item-icon{margin-right:var(--calcite-stepper-item-spacing-unit-l);margin-top:var(--calcite-stepper-item-spacing-unit-s);color:var(--calcite-ui-text-3);opacity:0.5;height:12px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-item-align:start;align-self:flex-start;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([dir=rtl]) .stepper-item-icon{margin-left:var(--calcite-stepper-item-spacing-unit-l);margin-right:0}:host .stepper-item-header-text{margin-right:auto;-ms-flex-direction:column;flex-direction:column;text-align:initial}:host([dir=rtl]) .stepper-item-header-text{margin-left:auto;margin-right:0}:host .stepper-item-title,:host .stepper-item-subtitle{display:-ms-flexbox;display:flex;width:100%}:host .stepper-item-title{color:var(--calcite-ui-text-2);font-weight:500}:host .stepper-item-subtitle{color:var(--calcite-ui-text-3)}:host([dir=rtl]) .stepper-item-title{margin-right:0;margin-left:auto}:host .stepper-item-number{font-weight:bold;color:var(--calcite-ui-text-3);margin-right:var(--calcite-stepper-item-spacing-unit-l);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([dir=rtl]) .stepper-item-number{margin-left:var(--calcite-stepper-item-spacing-unit-l);margin-right:initial}:host([disabled]){opacity:0.4}:host([disabled]),:host([disabled]) *{cursor:not-allowed;pointer-events:none}:host([complete]){border-top-color:rgba(0, 122, 194, 0.5)}:host([complete]) .stepper-item-icon{color:var(--calcite-ui-blue-1)}:host([error]){border-top-color:var(--calcite-ui-red-1)}:host([error]) .stepper-item-number{color:var(--calcite-ui-red-1)}:host([error]) .stepper-item-icon{color:var(--calcite-ui-red-1);opacity:1}:host(:hover:not([disabled]):not([active])),:host(:focus:not([disabled]):not([active])){border-top-color:rgba(0, 122, 194, 0.75)}:host(:hover:not([disabled]):not([active])) .stepper-item-title,:host(:focus:not([disabled]):not([active])) .stepper-item-title{color:var(--calcite-ui-text-1)}:host(:hover:not([disabled]):not([active])) .stepper-item-subtitle,:host(:focus:not([disabled]):not([active])) .stepper-item-subtitle{color:var(--calcite-ui-text-2)}:host([error]:hover:not([disabled]):not([active])),:host([error]:focus:not([disabled]):not([active])){border-top-color:rgba(216, 48, 32, 0.75)}:host([active]){border-top-color:var(--calcite-ui-blue-1)}:host([active]) .stepper-item-title{color:var(--calcite-ui-text-1)}:host([active]) .stepper-item-subtitle{color:var(--calcite-ui-text-2)}:host([active]) .stepper-item-number{color:var(--calcite-ui-blue-1)}:host([active]) .stepper-item-icon{color:var(--calcite-ui-blue-1);opacity:1}:host([layout=vertical]){-ms-flex:1 1 auto;flex:1 1 auto;border-top:0;border-left:3px solid var(--calcite-ui-border-3);padding:0 0 0 var(--calcite-stepper-item-spacing-unit-l);margin:0 0 var(--calcite-stepper-item-spacing-unit-m) 0}:host([layout=vertical]) .stepper-item-icon{margin:var(--calcite-stepper-item-spacing-unit-m) 0 0 auto;padding-left:var(--calcite-stepper-item-spacing-unit-l);-ms-flex-order:3;order:3}:host([layout=vertical]) .stepper-item-header{padding-right:0}:host([layout=vertical]) .stepper-item-content{padding:0}:host([layout=vertical][active]) .stepper-item-content{display:-ms-flexbox;display:flex}:host([layout=vertical][active]) .stepper-item-content ::slotted(:last-child){margin-bottom:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical][dir=rtl]){border-left:0;border-right:3px solid var(--calcite-ui-border-3);padding:0 var(--calcite-stepper-item-spacing-unit-l) 0 0}:host([layout=vertical][dir=rtl]) .stepper-item-icon{margin:var(--calcite-stepper-item-spacing-unit-m) auto 0 0;padding-left:0;padding-right:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical][dir=rtl]) .stepper-item-header{padding-left:0;padding-right:intial}:host([layout=vertical][complete]){border-color:rgba(0, 122, 194, 0.5)}:host([layout=vertical][error]){border-color:var(--calcite-ui-red-1)}:host([layout=vertical][active]){border-color:var(--calcite-ui-blue-1)}:host([layout=vertical]:hover:not([disabled]):not([active])),:host([layout=vertical]:focus:not([disabled]):not([active])){border-color:rgba(0, 122, 194, 0.75)}:host([layout=vertical][error]:hover:not([disabled]):not([active])),:host([layout=vertical][error]:focus:not([disabled]):not([active])){border-color:rgba(216, 48, 32, 0.75)}";

const CalciteStepperItem = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteStepperItemKeyEvent = createEvent(this, "calciteStepperItemKeyEvent", 7);
        this.calciteStepperItemSelect = createEvent(this, "calciteStepperItemSelect", 7);
        this.calciteStepperItemRegister = createEvent(this, "calciteStepperItemRegister", 7);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /** is the step active */
        this.active = false;
        /** has the step been completed */
        this.complete = false;
        /** does the step contain an error that needs to be resolved by the user */
        this.error = false;
        /** is the step disabled and not navigable to by a user */
        this.disabled = false;
        /** should the items display an icon based on status */
        /** @internal */
        this.icon = false;
        /** optionally display the step number next to the title and subtitle */
        /** @internal */
        this.numbered = false;
        /** the scale of the item */
        /** @internal */
        this.scale = "m";
    }
    // watch for removal of disabled to register step
    disabledWatcher() {
        this.registerStepperItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.icon = getElementProp(this.el, "icon", false);
        this.numbered = getElementProp(this.el, "numbered", false);
        this.layout = getElementProp(this.el, "layout", false);
        this.scale = getElementProp(this.el, "scale", "m");
    }
    componentDidLoad() {
        this.itemPosition = this.getItemPosition();
        this.itemContent = this.getItemContent();
        this.registerStepperItem();
        if (this.active)
            this.emitRequestedItem();
    }
    componentDidUpdate() {
        if (this.active)
            this.emitRequestedItem();
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, tabindex: this.disabled ? null : 0, "aria-expanded": this.active.toString(), onClick: () => this.emitRequestedItem() }, h("div", { class: "stepper-item-header" }, this.icon ? this.setIcon() : null, this.numbered ? (h("div", { class: "stepper-item-number" }, this.getItemPosition() + 1, ".")) : null, h("div", { class: "stepper-item-header-text" }, h("span", { class: "stepper-item-title" }, this.itemTitle), h("span", { class: "stepper-item-subtitle" }, this.itemSubtitle))), h("div", { class: "stepper-item-content" }, h("slot", null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(e) {
        if (!this.disabled && e.target === this.el) {
            switch (getKey(e.key)) {
                case " ":
                case "Enter":
                    this.emitRequestedItem();
                    e.preventDefault();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                case "ArrowLeft":
                case "ArrowRight":
                case "Home":
                case "End":
                    this.calciteStepperItemKeyEvent.emit({ item: e });
                    e.preventDefault();
                    break;
            }
        }
    }
    updateActiveItemOnChange(event) {
        this.activePosition = event.detail.position;
        this.determineActiveItem();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    setIcon() {
        var path = this.active
            ? "circleF"
            : this.error
                ? "exclamationMarkCircleF"
                : this.complete
                    ? "checkCircleF"
                    : "circle";
        return h("calcite-icon", { icon: path, scale: "s", class: "stepper-item-icon" });
    }
    determineActiveItem() {
        this.active = !this.disabled && this.itemPosition === this.activePosition;
    }
    registerStepperItem() {
        this.calciteStepperItemRegister.emit({
            position: this.itemPosition,
            content: this.itemContent,
        });
    }
    emitRequestedItem() {
        if (!this.disabled) {
            this.calciteStepperItemSelect.emit({
                position: this.itemPosition,
                content: this.itemContent,
            });
        }
    }
    getItemContent() {
        var _a;
        // handle ie and edge
        return ((_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("slot")) ? this.el.shadowRoot
            .querySelector("slot")
            .assignedNodes({ flatten: true })
            : this.el.querySelector(".stepper-item-content")
                ? this.el.querySelector(".stepper-item-content")
                : null;
    }
    getItemPosition() {
        const parent = this.el.parentElement;
        return Array.prototype.indexOf.call(parent.querySelectorAll("calcite-stepper-item"), this.el);
    }
    get el() { return this; }
    static get watchers() { return {
        "disabled": ["disabledWatcher"]
    }; }
    static get style() { return calciteStepperItemCss; }
};

const calciteSwitchCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{--calcite-switch-hover-handle-border:var(--calcite-ui-blue-2);--calcite-switch-switched-track-background:var(--calcite-ui-blue-2);--calcite-switch-switched-track-border:var(--calcite-ui-blue-2);--calcite-switch-switched-handle-border:var(--calcite-ui-blue-1);--calcite-switch-switched-hover-track-background:var(--calcite-ui-blue-2);--calcite-switch-switched-hover-track-border:var(--calcite-ui-blue-2);--calcite-switch-switched-hover-handle-border:var(--calcite-ui-blue-3)}:host([color=red]){--calcite-switch-switched-track-background:var(--calcite-ui-red-2);--calcite-switch-switched-track-border:var(--calcite-ui-red-1);--calcite-switch-hover-handle-border:var(--calcite-ui-red-2);--calcite-switch-switched-handle-border:var(--calcite-ui-red-1);--calcite-switch-switched-hover-track-background:var(--calcite-ui-red-1);--calcite-switch-switched-hover-track-border:var(--calcite-ui-red-2);--calcite-switch-switched-hover-handle-border:var(--calcite-ui-red-3)}:host([scale=s]){--calcite-switch-track-width:28px;--calcite-switch-track-height:16px;--calcite-switch-handle-size:14px}:host([scale=m]){--calcite-switch-track-width:36px;--calcite-switch-track-height:20px;--calcite-switch-handle-size:18px}:host([scale=l]){--calcite-switch-track-width:44px;--calcite-switch-track-height:24px;--calcite-switch-handle-size:22px}::slotted(input){display:none}:host{display:inline-block;position:relative;width:auto;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;tap-highlight-color:transparent}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;width:auto}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}.track{position:relative;display:inline-block;vertical-align:top;width:var(--calcite-switch-track-width);height:var(--calcite-switch-track-height);background-color:var(--calcite-ui-foreground-2);border-radius:30px;border:1px solid var(--calcite-ui-border-2);pointer-events:none;-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}.handle{position:absolute;display:block;width:var(--calcite-switch-handle-size);height:var(--calcite-switch-handle-size);top:-1px;left:-1px;right:auto;background-color:var(--calcite-ui-foreground-1);border-radius:30px;border:2px solid var(--calcite-ui-border-4);pointer-events:none;-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}:host(:hover) .track,:host(:focus) .track{background-color:var(--calcite-ui-foreground-3);border-color:var(--calcite-ui-border-1)}:host(:hover) .handle,:host(:focus) .handle{border-color:var(--calcite-switch-hover-handle-border);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-switch-hover-handle-border);box-shadow:inset 0 0 0 1px var(--calcite-switch-hover-handle-border);right:auto}:host([switched]) .track{background-color:var(--calcite-switch-switched-track-background);border-color:var(--calcite-switch-switched-track-border)}:host([switched]) .handle{right:-1px;left:auto;border-color:var(--calcite-switch-switched-handle-border)}:host([switched]:hover) .track{background-color:var(--calcite-switch-switched-hover-track-background);border-color:var(--calcite-switch-switched-hover-track-border)}:host([switched]:hover) .handle{border-color:var(--calcite-switch-switched-hover-handle-border);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-switch-switched-hover-handle-border);box-shadow:inset 0 0 0 1px var(--calcite-switch-switched-hover-handle-border)}:host([dir=rtl]){margin-right:0;margin-left:0.5em}:host([dir=rtl]) .handle{left:auto;right:-1px}:host([dir=rtl][switched]) .handle{right:auto;left:-1px}:host([dir=rtl][switched]:active) .handle,:host([dir=rtl][switched]:focus) .handle{right:auto;left:-1px}";

const CalciteSwitch = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteSwitchChange = createEvent(this, "calciteSwitchChange", 7);
        /** True if the switch is initially on */
        this.switched = false;
        /** The name of the checkbox input */
        this.name = "";
        /** The value of the checkbox input */
        this.value = "";
        /** What color the switch should be */
        this.color = "blue";
        /** The scale of the switch */
        this.scale = "m";
        this.syncThisToProxyInput = () => {
            this.switched = this.inputProxy.hasAttribute("checked");
            this.name = this.inputProxy.name;
            this.value = this.inputProxy.value;
        };
        this.syncProxyInputToThis = () => {
            this.switched
                ? this.inputProxy.setAttribute("checked", "")
                : this.inputProxy.removeAttribute("checked");
            this.inputProxy.setAttribute("name", this.name);
            this.inputProxy.setAttribute("value", this.value);
        };
    }
    handleLabelFocus(e) {
        if (!this.el.contains(e.detail.interactedEl) &&
            hasLabel(e.detail.labelEl, this.el)) {
            this.updateSwitch(event);
            this.el.focus();
        }
        else
            return;
    }
    onClick(e) {
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && e.target === this.inputProxy) ||
            (!this.el.closest("label") && e.target === this.el)) {
            this.updateSwitch(e);
        }
    }
    keyDownHandler(e) {
        const key = getKey(e.key);
        if (key === " " || key === "Enter") {
            this.updateSwitch(e);
        }
    }
    switchWatcher() {
        this.switched
            ? this.inputProxy.setAttribute("checked", "")
            : this.inputProxy.removeAttribute("checked");
    }
    connectedCallback() {
        // prop validations
        let color = ["blue", "red"];
        if (!color.includes(this.color))
            this.color = "blue";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        this.setupProxyInput();
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    componentWillRender() {
        this.syncProxyInputToThis();
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, role: "checkbox", "aria-checked": this.switched.toString(), tabIndex: this.tabIndex }, h("div", { class: "track" }, h("div", { class: "handle" }))));
    }
    get tabIndex() {
        const hasTabIndex = this.el.hasAttribute("tabindex");
        if (hasTabIndex) {
            return Number(this.el.getAttribute("tabindex"));
        }
        return 0;
    }
    setupProxyInput() {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            this.inputProxy.type = "checkbox";
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
        if (Build.isBrowser) {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    }
    updateSwitch(e) {
        e.preventDefault();
        this.switched = !this.switched;
        this.calciteSwitchChange.emit({
            switched: this.switched,
        });
    }
    get el() { return this; }
    static get watchers() { return {
        "switched": ["switchWatcher"]
    }; }
    static get style() { return calciteSwitchCss; }
};

const calciteTabCss = ":host([hidden]){display:none}:host([active]) section{display:block}:host{display:none;z-index:1}:host([active]){display:block}section{height:100%;width:100%;display:none}";

const CalciteTab = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
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
        return (h(Host, { id: id, "aria-labelledby": this.labeledBy, "aria-expanded": this.active.toString(), role: "tabpanel" }, h("section", null, h("slot", null))));
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
        if (event.target.closest("calcite-tabs") !== this.el.closest("calcite-tabs")) {
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
    get el() { return this; }
    static get style() { return calciteTabCss; }
};

const calciteTabNavCss = ":host([hidden]){display:none}:host{z-index:2}.tab-nav{display:-ms-flexbox;display:flex;overflow:auto;-ms-flex-pack:start;justify-content:flex-start;-webkit-overflow-scrolling:touch;padding:4px;margin:-4px}:host([layout=center]) .tab-nav{-ms-flex-pack:center;justify-content:center}";

const CalciteTabNav = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
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
    get el() { return this; }
    static get watchers() { return {
        "selectedTab": ["selectedTabChanged"]
    }; }
    static get style() { return calciteTabNavCss; }
};

const calciteTabTitleCss = ":host([hidden]){display:none}:host{-ms-flex:0 1 auto;flex:0 1 auto;outline:none;margin-right:1.25rem;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:1.25rem;margin-inline-end:1.25rem}:host-context([dir=rtl]){margin-right:0;margin-left:1.25rem}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([layout=center]){-ms-flex-preferred-size:200px;flex-basis:200px;text-align:center;margin:0 1.25rem}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host(:active) a,:host(:focus) a,:host(:hover) a{outline:none;text-decoration:none;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-border-2)}:host([active]) a{color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue-1);font-weight:500}a{-webkit-box-sizing:border-box;box-sizing:border-box;font-size:0.875rem;line-height:1.5;padding:0.75rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:3px solid transparent;cursor:pointer;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;color:var(--calcite-ui-text-3);outline:none;width:100%;display:block}";

const CalciteTabTitle = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
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
    get el() { return this; }
    static get style() { return calciteTabTitleCss; }
};

const calciteTabsCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}section{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;overflow:hidden;border-top:1px solid var(--calcite-ui-border-1)}";

const CalciteTabs = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
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
        this.titles = this.titles.filter((el) => el !== e.target);
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
        this.tabs = this.tabs.filter((el) => el !== e.target);
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
        if (this.tabs.some((e) => e.tab) || this.titles.some((e) => e.tab)) {
            // if we are using `tab` based identifiers sort by `tab` to account for
            // possible out of order tabs and get the id of each tab
            tabIds = this.tabs.sort((a, b) => a.tab.localeCompare(b.tab)).map((e) => e.id);
            titleIds = this.titles.sort((a, b) => a.tab.localeCompare(b.tab)).map((e) => e.id);
        }
        else {
            // if we are using index based tabs then the `<calcite-tab>` and
            // `<calcite-tab-title>` might have been rendered out of order so the
            // order of `this.tabs` and `this.titles` might not reflect the DOM state,
            // and might not match each other so we need to get the index of all the
            // tabs and titles in the DOM order to match them up as a source of truth
            const tabDomIndexes = await Promise.all(this.tabs.map((el) => el.getTabIndex()));
            const titleDomIndexes = await Promise.all(this.titles.map((el) => el.getTabIndex()));
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
        this.tabs.forEach((el) => el.updateAriaInfo(tabIds, titleIds));
        this.titles.forEach((el) => el.updateAriaInfo(tabIds, titleIds));
    }
    get el() { return this; }
    static get style() { return calciteTabsCss; }
};

const CSS$a = {
    container: "container",
    arrow: "arrow"
};
const TOOLTIP_REFERENCE = "data-calcite-tooltip-reference";
const ARIA_DESCRIBED_BY$1 = "aria-describedby";

const calciteTooltipCss = ":host([hidden]){display:none}:host{display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}:host([aria-hidden=false]){-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16)}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:\"\";-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top])>.arrow{bottom:-4px}:host([data-popper-placement^=bottom])>.arrow{top:-4px}:host([data-popper-placement^=left])>.arrow{right:-4px}:host([data-popper-placement^=right])>.arrow{left:-4px}.container{position:relative;border-radius:var(--calcite-border-radius);background:var(--calcite-ui-foreground-1);max-width:300px;max-height:300px;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-direction:column;flex-direction:column;font-weight:500;color:var(--calcite-ui-text-1);padding:12px 16px;overflow:hidden;font-size:0.8125rem;line-height:1.5}:host([theme=dark]) .container{background:var(--calcite-ui-foreground-2)}";

const CalciteTooltip = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Offset the position of the popover away from the reference element.
         */
        this.offsetDistance = defaultOffsetDistance;
        /**
         * Offset the position of the popover along the reference element.
         */
        this.offsetSkidding = 0;
        /**
         * Display and position the component.
         */
        this.open = false;
        /**
         * Determines where the component will be positioned relative to the referenceElement.
         */
        this.placement = "auto";
        this._referenceElement = this.getReferenceElement();
        this.guid = `calcite-tooltip-${guid()}`;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getId = () => {
            return this.el.id || this.guid;
        };
        this.addReferences = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.setAttribute(TOOLTIP_REFERENCE, "");
            if (!_referenceElement.hasAttribute(ARIA_DESCRIBED_BY$1)) {
                _referenceElement.setAttribute(ARIA_DESCRIBED_BY$1, this.getId());
            }
        };
        this.removeReferences = () => {
            const { _referenceElement } = this;
            if (!_referenceElement) {
                return;
            }
            _referenceElement.removeAttribute(ARIA_DESCRIBED_BY$1);
            _referenceElement.removeAttribute(TOOLTIP_REFERENCE);
        };
        this.show = () => {
            this.open = true;
        };
        this.hide = () => {
            this.open = false;
        };
    }
    offsetDistanceOffsetHandler() {
        this.reposition();
    }
    offsetSkiddingHandler() {
        this.reposition();
    }
    openHandler(open) {
        if (open) {
            this.createPopper();
        }
        else {
            this.destroyPopper();
        }
    }
    placementHandler() {
        this.reposition();
    }
    referenceElementHandler() {
        this.removeReferences();
        this._referenceElement = this.getReferenceElement();
        this.addReferences();
        this.createPopper();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        this.addReferences();
        this.createPopper();
    }
    componentDidUnload() {
        this.removeReferences();
        this.destroyPopper();
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async reposition() {
        const { popper, el, placement } = this;
        const modifiers = this.getModifiers();
        popper
            ? updatePopper({
                el,
                modifiers,
                placement,
                popper,
            })
            : this.createPopper();
    }
    getReferenceElement() {
        const { referenceElement } = this;
        return ((typeof referenceElement === "string"
            ? document.getElementById(referenceElement)
            : referenceElement) || null);
    }
    getModifiers() {
        const { arrowEl, offsetDistance, offsetSkidding } = this;
        const arrowModifier = {
            name: "arrow",
            enabled: true,
            options: {
                element: arrowEl,
            },
        };
        const offsetModifier = {
            name: "offset",
            enabled: true,
            options: {
                offset: [offsetSkidding, offsetDistance],
            },
        };
        return [arrowModifier, offsetModifier];
    }
    createPopper() {
        this.destroyPopper();
        const { el, open, placement, _referenceElement: referenceEl } = this;
        const modifiers = this.getModifiers();
        this.popper = createPopper$1({
            el,
            modifiers,
            open,
            placement,
            referenceEl,
        });
    }
    destroyPopper() {
        const { popper } = this;
        if (popper) {
            popper.destroy();
        }
        this.popper = null;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { _referenceElement, open } = this;
        const displayed = _referenceElement && open;
        return (h(Host, { role: "tooltip", "aria-hidden": !displayed ? "true" : "false", id: this.getId() }, h("div", { class: CSS$a.arrow, ref: (arrowEl) => (this.arrowEl = arrowEl) }), h("div", { class: CSS$a.container }, h("slot", null))));
    }
    get el() { return this; }
    static get watchers() { return {
        "offsetDistance": ["offsetDistanceOffsetHandler"],
        "offsetSkidding": ["offsetSkiddingHandler"],
        "open": ["openHandler"],
        "placement": ["placementHandler"],
        "referenceElement": ["referenceElementHandler"]
    }; }
    static get style() { return calciteTooltipCss; }
};

const CalciteTooltipManager = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * CSS Selector to match reference elements for tooltips.
         */
        this.selector = `[${TOOLTIP_REFERENCE}]`;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.toggle = (event, value = true) => {
            const target = event.target;
            const { selector } = this;
            const describedByElement = getDescribedByElement(target.closest(selector));
            if (describedByElement) {
                describedByElement.open = value;
            }
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return h(Host, null);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    mouseEnterShow(event) {
        this.toggle(event, true);
    }
    mouseLeaveHide(event) {
        this.toggle(event, false);
    }
    focusShow(event) {
        this.toggle(event, true);
    }
    blurHide(event) {
        this.toggle(event, false);
    }
};

var TreeSelectionMode;
(function (TreeSelectionMode) {
    TreeSelectionMode["Single"] = "single";
    TreeSelectionMode["Multi"] = "multi";
    TreeSelectionMode["Children"] = "children";
    TreeSelectionMode["MultiChildren"] = "multi-children";
})(TreeSelectionMode || (TreeSelectionMode = {}));

const calciteTreeCss = ":host([hidden]){display:none}:host{display:block;outline:none}";

const CalciteTree = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteTreeSelect = createEvent(this, "calciteTreeSelect", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Display indentation guide lines */
        this.lines = false;
        /** Specify the scale of the tree, defaults to m */
        this.scale = "m";
        /** Customize how tree selection works (single, multi, children, multi-children) */
        this.selectionMode = TreeSelectionMode.Single;
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** @internal If this tree is nested within another tree, set to false */
        this.root = true;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    componentWillRender() {
        const parent = this.el.parentElement.closest("calcite-tree");
        // this.theme = getElementTheme(this.el);
        this.lines = parent ? parent.lines : this.lines;
        this.scale = parent ? parent.scale : this.scale;
        this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
        this.root = parent ? false : true;
    }
    render() {
        return (h(Host, { tabindex: this.root ? "1" : undefined, "aria-role": this.root ? "tree" : undefined, "aria-multiselectable": this.selectionMode === TreeSelectionMode.Multi ||
                this.selectionMode === TreeSelectionMode.MultiChildren }, h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onFocus() {
        if (this.root) {
            const selectedNode = this.el.querySelector("calcite-tree-item[selected]");
            const firstNode = this.el.querySelector("calcite-tree-item");
            (selectedNode || firstNode).focus();
        }
    }
    onClick(e) {
        const target = e.target;
        const childItems = nodeListToArray(target.querySelectorAll("calcite-tree-item"));
        const shouldSelect = this.selectionMode !== null &&
            (!target.hasChildren ||
                (target.hasChildren &&
                    (this.selectionMode === TreeSelectionMode.Children ||
                        this.selectionMode === TreeSelectionMode.MultiChildren)));
        const shouldModifyToCurrentSelection = e.detail.modifyCurrentSelection &&
            (this.selectionMode === TreeSelectionMode.Multi ||
                this.selectionMode === TreeSelectionMode.MultiChildren);
        const shouldSelectChildren = this.selectionMode === TreeSelectionMode.MultiChildren ||
            this.selectionMode === TreeSelectionMode.Children;
        const shouldClearCurrentSelection = !shouldModifyToCurrentSelection &&
            (((this.selectionMode === TreeSelectionMode.Single ||
                this.selectionMode === TreeSelectionMode.Multi) &&
                childItems.length <= 0) ||
                this.selectionMode === TreeSelectionMode.Children ||
                this.selectionMode === TreeSelectionMode.MultiChildren);
        const shouldExpandTarget = this.selectionMode === TreeSelectionMode.Children ||
            this.selectionMode === TreeSelectionMode.MultiChildren;
        if (this.root) {
            const targetItems = [];
            if (shouldSelect) {
                targetItems.push(target);
            }
            if (shouldSelectChildren) {
                childItems.forEach((treeItem) => {
                    targetItems.push(treeItem);
                });
            }
            if (shouldClearCurrentSelection) {
                const selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
                selectedItems.forEach((treeItem) => {
                    if (!targetItems.includes(treeItem)) {
                        treeItem.selected = false;
                    }
                });
            }
            if (shouldExpandTarget && !e.detail.forceToggle) {
                target.expanded = true;
            }
            if (shouldModifyToCurrentSelection) {
                window.getSelection().removeAllRanges();
            }
            if ((shouldModifyToCurrentSelection && target.selected) ||
                (shouldSelectChildren && e.detail.forceToggle)) {
                targetItems.forEach((treeItem) => {
                    treeItem.selected = false;
                });
            }
            else {
                targetItems.forEach((treeItem) => {
                    treeItem.selected = true;
                });
            }
        }
        if (this.root) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.calciteTreeSelect.emit({
            selected: nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected),
        });
    }
    get el() { return this; }
    static get style() { return calciteTreeCss; }
};

const calciteTreeItemCss = "@charset \"UTF-8\";:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:block;color:var(--calcite-tree-text);cursor:pointer;outline:none;font-size:0.875rem;line-height:1.5;max-width:100%;--calcite-tree-text:var(--calcite-ui-text-2);--calcite-tree-text:var(--calcite-ui-text-1);--calcite-tree-text:var(--calcite-ui-text-1);--calcite-tree-chevron:var(--calcite-ui-border-1);--calcite-tree-chevron-hover:var(--calcite-ui-text-3);--calcite-tree-vertical-padding:0.375rem;--calcite-tree-indicator:var(--calcite-ui-border-1);--calcite-tree-indicator-active:var(--calcite-ui-blue-1);--calcite-tree-indicator-first-start:0.1rem;--calcite-tree-indicator-first-end:auto;--calcite-tree-indicator-distance-start:0.15rem;--calcite-tree-indicator-distance-end:auto;--calcite-tree-icon-edge-distance-start:-0.2rem;--calcite-tree-icon-edge-distance-end:0;--calcite-tree-icon-content-distance-start:0.375rem;--calcite-tree-icon-content-distance-end:0;--calcite-tree-indent-start:1.4rem;--calcite-tree-indent-end:0;--calcite-tree-children-indent-start:0.25rem;--calcite-tree-children-indent-end:0;--calcite-tree-children-padding-start:1rem;--calcite-tree-children-padding-end:0;--calcite-tree-line-position-start:0.05rem;--calcite-tree-line-position-end:0;--calcite-tree-parent-line-position-start:-0.95rem;--calcite-tree-parent-line-position-end:0;--calcite-tree-line-width:1px;--calcite-tree-hover-line-width:3px}:host([lines]){--calcite-tree-line:var(--calcite-ui-border-3);--calcite-tree-line-hover:var(--calcite-ui-border-1)}:host([scale=s]){--calcite-tree-hover-line-width:2px;--calcite-tree-vertical-padding:0.1875rem;--calcite-tree-children-indent-start:0rem;--calcite-tree-children-padding-start:0.8rem;--calcite-tree-line-position-start:0.3rem;--calcite-tree-parent-line-position-start:-0.5rem}:host([dir=rtl]){--calcite-tree-indicator-first-start:0;--calcite-tree-indicator-first-end:0.1rem;--calcite-tree-indicator-distance-start:auto;--calcite-tree-indicator-distance-end:0.15rem;--calcite-tree-icon-edge-distance-start:auto;--calcite-tree-icon-edge-distance-end:-0.2rem;--calcite-tree-icon-content-distance-start:0;--calcite-tree-icon-content-distance-end:0.375rem;--calcite-tree-indent-start:0;--calcite-tree-indent-end:1.4rem;--calcite-tree-children-indent-start:0;--calcite-tree-children-indent-end:0.25rem;--calcite-tree-children-padding-start:0;--calcite-tree-children-padding-end:1rem;--calcite-tree-line-position-start:0;--calcite-tree-line-position-end:0.05rem;--calcite-tree-parent-line-position-start:0;--calcite-tree-parent-line-position-end:-0.95rem}:host([dir=rtl][scale=s]){--calcite-tree-children-indent-end:0rem;--calcite-tree-children-padding-end:0.8rem;--calcite-tree-line-position-end:0.3rem;--calcite-tree-parent-line-position-end:-0.5rem}::slotted(*){color:inherit;font-size:0.875rem;line-height:1.5;text-decoration:none !important;word-wrap:break-word;overflow-wrap:break-word;min-width:0;max-width:100%}::slotted(*):hover{text-decoration:none !important}::slotted(a){width:100%;text-decoration:none}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.calcite-tree-children{z-index:1;margin-left:var(--calcite-tree-children-indent-start);margin-right:var(--calcite-tree-children-indent-end);padding-left:var(--calcite-tree-children-padding-start);padding-right:var(--calcite-tree-children-padding-end);position:relative;-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0;overflow:hidden;-webkit-transition:0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;transition:0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;height:0;-webkit-transform-origin:top;transform-origin:top}.calcite-tree-children:after{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;content:\"\";height:100%;width:var(--calcite-tree-line-width);background:var(--calcite-tree-line);left:var(--calcite-tree-line-position-start);right:var(--calcite-tree-line-position-end);top:0;position:absolute}:host([expanded])>.calcite-tree-children{-webkit-transform:scaleY(1);transform:scaleY(1);opacity:1;height:auto}:host([has-children]) .calcite-tree-children:hover:after,:host([has-children]) .calcite-tree-children:focus:after{background:var(--calcite-tree-line-hover)}.calcite-tree-node{display:-ms-flexbox;display:flex;padding:var(--calcite-tree-vertical-padding) 0;padding-left:var(--calcite-tree-indent-start);padding-right:var(--calcite-tree-indent-end);position:relative}.calcite-tree-node:before{content:\"•\";position:absolute;left:var(--calcite-tree-indicator-distance-start);right:var(--calcite-tree-indicator-distance-end);opacity:0;color:var(--calcite-tree-indicator);-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}.calcite-tree-node:after{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;content:\"\";height:100%;width:var(--calcite-tree-line-width);background:var(--calcite-tree-line);left:var(--calcite-tree-parent-line-position-start);right:var(--calcite-tree-parent-line-position-end);top:0;position:absolute}:host([depth=\"1\"])>.calcite-tree-node:after{display:none}:host([has-children])>.calcite-tree-node{padding-left:0;padding-right:0}:host([has-children])>.calcite-tree-node:before{display:none}:host([depth=\"1\"])>.calcite-tree-node:before,:host([depth=\"1\"])>.calcite-tree-children:before{left:var(--calcite-tree-indicator-first-start);right:var(--calcite-tree-indicator-first-end)}.calcite-tree-node:hover:before,:host([selected]) .calcite-tree-node:hover:before,:host(:focus) .calcite-tree-node:before{opacity:1}.calcite-tree-node:hover:after,:host([selected]) .calcite-tree-node:hover:after,:host(:focus) .calcite-tree-node:after{width:var(--calcite-tree-hover-line-width);background:var(--calcite-tree-line-hover);z-index:2}.calcite-tree-node:hover ::slotted(*),:host([selected]) .calcite-tree-node:hover ::slotted(*),:host(:focus) .calcite-tree-node ::slotted(*){color:var(--calcite-tree-text-hover)}.calcite-tree-node:hover .calcite-tree-chevron,:host([selected]) .calcite-tree-node:hover .calcite-tree-chevron,:host(:focus) .calcite-tree-node .calcite-tree-chevron{fill:var(--calcite-tree-chevron-hover)}.calcite-tree-node:hover .calcite-tree-indicator,:host([selected]) .calcite-tree-node:hover .calcite-tree-indicator,:host(:focus) .calcite-tree-node .calcite-tree-indicator{fill:var(--calcite-tree-indicator-hover)}:host([selected])>.calcite-tree-node,:host([selected])>.calcite-tree-node:hover{color:var(--calcite-tree-text-active);font-weight:500}:host([selected])>.calcite-tree-node:before,:host([selected])>.calcite-tree-node:hover:before{opacity:1;color:var(--calcite-tree-indicator-active)}:host([selected])>.calcite-tree-node:after,:host([selected])>.calcite-tree-node:hover:after{background:var(--calcite-ui-blue-1);width:var(--calcite-tree-hover-line-width);z-index:2}:host([selected])>.calcite-tree-node ::slotted(*),:host([selected])>.calcite-tree-node:hover ::slotted(*){color:var(--calcite-tree-text-active)}:host([has-children][expanded])>.calcite-tree-node{color:var(--calcite-tree-text-active);font-weight:500}:host([has-children][expanded])>.calcite-tree-node:after{background:var(--calcite-ui-blue-1)}:host([has-children][expanded])>.calcite-tree-node:before{opacity:1;color:var(--calcite-tree-indicator-active)}:host([has-children][expanded])>.calcite-tree-node ::slotted(*){color:var(--calcite-tree-text-active)}:host([has-children][expanded][selected])>.calcite-tree-node:after{background:var(--calcite-ui-blue-1);width:var(--calcite-tree-hover-line-width);z-index:2}.calcite-tree-chevron{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;-ms-flex:0 0 auto;flex:0 0 auto;position:relative;-ms-flex-item-align:center;align-self:center;left:var(--calcite-tree-icon-edge-distance-start);right:var(--calcite-tree-icon-edge-distance-end);margin-right:var(--calcite-tree-icon-content-distance-start);margin-left:var(--calcite-tree-icon-content-distance-end);-webkit-transform:rotate(0deg);transform:rotate(0deg);fill:var(--calcite-tree-chevron)}:host([dir=rtl]) .calcite-tree-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host(:hover) .calcite-tree-chevron,:host(:focus) .calcite-tree-chevron{fill:var(--calcite-tree-chevron-hover);stroke:var(--calcite-tree-chevron-hover);stroke-width:0.75}:host([expanded])>.calcite-tree-node>.calcite-tree-chevron{-webkit-transform:rotate(90deg);transform:rotate(90deg);fill:var(--calcite-ui-blue-1);stroke-width:0.75;stroke:var(--calcite-ui-blue-1)}";

const CalciteTreeItem = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.calciteTreeItemSelect = createEvent(this, "calciteTreeItemSelect", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Is the item currently selected */
        this.selected = false;
        /** True if the item is in an expanded state */
        this.expanded = false;
        this.iconClickHandler = (event) => {
            event.stopPropagation();
            this.expanded = !this.expanded;
            this.calciteTreeItemSelect.emit({
                modifyCurrentSelection: event.shiftKey,
                forceToggle: true,
            });
        };
        this.childrenClickHandler = (event) => event.stopPropagation();
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** @internal Is the parent of this item expanded? */
        this.parentExpanded = false;
        /** @internal What level of depth is this item at? */
        this.depth = -1;
        /** @internal Does this tree item have a tree inside it? */
        this.hasChildren = null;
    }
    expandedHandler(newValue) {
        if (this.childrenSlotWrapper) {
            const [childTree] = getSlottedElements(this.childrenSlotWrapper, "calcite-tree");
            if (childTree) {
                const items = getSlottedElements(childTree, "calcite-tree-item");
                items.forEach((item) => (item.parentExpanded = newValue));
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillRender() {
        this.hasChildren = !!this.el.querySelector("calcite-tree");
        let parentTree = this.el.closest("calcite-tree");
        this.selectionMode = parentTree.selectionMode;
        this.depth = 0;
        this.scale = (parentTree && parentTree.scale) || "m";
        this.lines = parentTree && parentTree.lines;
        this.el.dir = getElementDir(this.el);
        let nextParentTree;
        while (parentTree) {
            nextParentTree = parentTree.parentElement.closest("calcite-tree");
            if (nextParentTree === parentTree) {
                break;
            }
            else {
                parentTree = nextParentTree;
                this.depth = this.depth + 1;
            }
        }
    }
    render() {
        const icon = this.hasChildren ? (h("calcite-icon", { class: "calcite-tree-chevron", icon: "chevron-right", scale: "s", onClick: this.iconClickHandler, "data-test-id": "icon" })) : null;
        return (h(Host, { tabindex: this.parentExpanded || this.depth === 1 ? "0" : "-1", "aria-role": "treeitem", "aria-hidden": this.parentExpanded || this.depth === 1 ? undefined : "true", "aria-selected": this.selected
                ? "true"
                : this.selectionMode === TreeSelectionMode.Multi ||
                    this.selectionMode === TreeSelectionMode.MultiChildren
                    ? "false"
                    : undefined, "aria-expanded": this.hasChildren ? this.expanded.toString() : undefined }, h("div", { class: "calcite-tree-node", ref: (el) => (this.defaultSlotWrapper = el) }, icon, h("slot", null)), h("div", { class: "calcite-tree-children", "data-test-id": "calcite-tree-children", role: this.hasChildren ? "group" : undefined, ref: (el) => (this.childrenSlotWrapper = el), onClick: this.childrenClickHandler }, h("slot", { name: "children" }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick(e) {
        // Solve for if the item is clicked somewhere outside the slotted anchor.
        // Anchor is triggered anywhere you click
        const [link] = getSlottedElements(this.defaultSlotWrapper, "a");
        if (link && e.composedPath()[0].tagName.toLowerCase() !== "a") {
            const target = link.target === "" ? "_self" : link.target;
            window.open(link.href, target);
        }
        this.expanded = !this.expanded;
        this.calciteTreeItemSelect.emit({
            modifyCurrentSelection: e.shiftKey,
            forceToggle: false,
        });
    }
    keyDownHandler(e) {
        let root;
        switch (getKey(e.key)) {
            case " ":
                this.selected = !this.selected;
                e.preventDefault();
                e.stopPropagation();
                break;
            case "Enter":
                // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
                const link = nodeListToArray(this.el.children).find((e) => e.matches("a"));
                if (link) {
                    link.click();
                    this.selected = true;
                }
                else {
                    this.selected = !this.selected;
                }
                e.preventDefault();
                e.stopPropagation();
                break;
            case "ArrowLeft":
                // When focus is on an open node, closes the node.
                if (this.hasChildren && this.expanded) {
                    this.expanded = false;
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                }
                // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
                const parentItem = this.el.parentElement.closest("calcite-tree-item");
                if (parentItem && (!this.hasChildren || this.expanded === false)) {
                    parentItem.focus();
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                }
                // When focus is on a root node that is also either an end node or a closed node, does nothing.
                break;
            case "ArrowRight":
                // When focus is on a closed node, opens the node; focus does not move.
                if (this.hasChildren && this.expanded === false) {
                    this.expanded = true;
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                }
                // When focus is on a open node, moves focus to the first child node.
                if (this.hasChildren && this.expanded) {
                    this.el.querySelector("calcite-tree-item").focus();
                    break;
                }
                // When focus is on an end node, does nothing.
                break;
            case "ArrowUp":
                const previous = this.el
                    .previousElementSibling;
                if (previous && previous.matches("calcite-tree-item")) {
                    previous.focus();
                }
                break;
            case "ArrowDown":
                const next = this.el.nextElementSibling;
                if (next && next.matches("calcite-tree-item")) {
                    next.focus();
                }
                break;
            case "Home":
                root = this.el.closest("calcite-tree[root]");
                const firstNode = root.querySelector("calcite-tree-item");
                firstNode.focus();
                break;
            case "End":
                root = this.el.closest("calcite-tree[root]");
                let currentNode = root.children[root.children.length - 1]; // last child
                let currentTree = nodeListToArray(currentNode.children).find((e) => e.matches("calcite-tree"));
                while (currentTree) {
                    currentNode = currentTree.children[root.children.length - 1];
                    currentTree = nodeListToArray(currentNode.children).find((e) => e.matches("calcite-tree"));
                }
                currentNode.focus();
                break;
        }
    }
    get el() { return this; }
    static get watchers() { return {
        "expanded": ["expandedHandler"]
    }; }
    static get style() { return calciteTreeItemCss; }
};

const CalciteAccordion$1 = /*@__PURE__*/proxyCustomElement(CalciteAccordion, [1,"calcite-accordion",{"theme":[1537],"scale":[1537],"appearance":[1537],"iconPosition":[1537,"icon-position"],"iconType":[1537,"icon-type"],"selectionMode":[1537,"selection-mode"]},[[0,"calciteAccordionItemKeyEvent","calciteAccordionItemKeyEvent"],[0,"calciteAccordionItemRegister","registerCalciteAccordionItem"],[0,"calciteAccordionItemSelect","updateActiveItemOnChange"]]]);
const CalciteAccordionItem$1 = /*@__PURE__*/proxyCustomElement(CalciteAccordionItem, [1,"calcite-accordion-item",{"active":[1540],"itemTitle":[1,"item-title"],"itemSubtitle":[1,"item-subtitle"],"icon":[513]},[[0,"keydown","keyDownHandler"],[16,"calciteAccordionChange","updateActiveItemOnChange"]]]);
const CalciteAlert$1 = /*@__PURE__*/proxyCustomElement(CalciteAlert, [1,"calcite-alert",{"active":[1540],"autoDismiss":[4,"auto-dismiss"],"autoDismissDuration":[1537,"auto-dismiss-duration"],"color":[1537],"theme":[1537],"scale":[1537],"icon":[4],"intlClose":[1,"intl-close"],"queue":[32],"queueLength":[32],"queued":[32]},[[8,"calciteAlertSync","alertSync"],[8,"calciteAlertRegister","alertRegister"]]]);
const CalciteButton$1 = /*@__PURE__*/proxyCustomElement(CalciteButton, [1,"calcite-button",{"color":[1537],"appearance":[1537],"theme":[1537],"scale":[1537],"width":[1537],"loading":[516],"round":[516],"floating":[516],"href":[513],"iconStart":[513,"icon-start"],"iconEnd":[513,"icon-end"],"disabled":[516],"hasText":[32]}]);
const CalciteCard$1 = /*@__PURE__*/proxyCustomElement(CalciteCard, [1,"calcite-card",{"loading":[516],"selected":[1540],"selectable":[1540],"theme":[1537]}]);
const CalciteCheckbox$1 = /*@__PURE__*/proxyCustomElement(CalciteCheckbox, [1,"calcite-checkbox",{"checked":[1540],"indeterminate":[1540],"name":[1537],"value":[1537],"scale":[1537],"disabled":[516],"theme":[513]},[[8,"calciteLabelFocus","handleLabelFocus"],[0,"click","onClick"],[0,"keydown","keyDownHandler"]]]);
const CalciteChip$1 = /*@__PURE__*/proxyCustomElement(CalciteChip, [1,"calcite-chip",{"value":[1],"theme":[513],"scale":[513],"color":[1537],"appearance":[1537],"icon":[513],"dismissible":[1540]}]);
const CalciteColor$1 = /*@__PURE__*/proxyCustomElement(CalciteColor, [1,"calcite-color",{"appearance":[513],"color":[16],"intlB":[1,"intl-b"],"intlBlue":[1,"intl-blue"],"intlDeleteColor":[1,"intl-delete-color"],"intlG":[1,"intl-g"],"intlGreen":[1,"intl-green"],"intlH":[1,"intl-h"],"intlHsv":[1,"intl-hsv"],"intlHex":[1,"intl-hex"],"intlHue":[1,"intl-hue"],"intlR":[1,"intl-r"],"intlRed":[1,"intl-red"],"intlRgb":[1,"intl-rgb"],"intlS":[1,"intl-s"],"intlSaturation":[1,"intl-saturation"],"intlSaveColor":[1,"intl-save-color"],"intlSaved":[1,"intl-saved"],"intlV":[1,"intl-v"],"intlValue":[1,"intl-value"],"scale":[513],"storageId":[1,"storage-id"],"theme":[513],"value":[1025],"colorFieldAndSliderInteractive":[32],"channelMode":[32],"channels":[32],"dimensions":[32],"savedColors":[32]}]);
const CalciteColorHexInput$1 = /*@__PURE__*/proxyCustomElement(CalciteColorHexInput, [1,"calcite-color-hex-input",{"intlHex":[1,"intl-hex"],"scale":[513],"theme":[513],"value":[1537],"internalColor":[32]}]);
const CalciteColorSwatch$1 = /*@__PURE__*/proxyCustomElement(CalciteColorSwatch, [1,"calcite-color-swatch",{"active":[516],"color":[1],"scale":[513],"theme":[513]}]);
const CalciteCombobox$1 = /*@__PURE__*/proxyCustomElement(CalciteCombobox, [1,"calcite-combobox",{"active":[516],"disabled":[516],"theme":[513],"scale":[1537],"label":[1],"placeholder":[1],"items":[32],"selectedItems":[32],"visibleItems":[32]},[[0,"calciteComboboxItemChange","calciteComboboxItemChangeHandler"],[0,"calciteChipDismiss","calciteChipDismissHandler"],[0,"calciteComboboxItemKeyEvent","calciteComboboxItemKeyEventHandler"]]]);
const CalciteComboboxItem$1 = /*@__PURE__*/proxyCustomElement(CalciteComboboxItem, [1,"calcite-combobox-item",{"disabled":[516],"parentItem":[16],"selected":[516],"textLabel":[513,"text-label"],"value":[513],"isSelected":[32]},[[0,"keydown","keyDownHandler"]]]);
const CalciteDate$1 = /*@__PURE__*/proxyCustomElement(CalciteDate, [1,"calcite-date",{"value":[1537],"valueAsDate":[1040],"min":[1],"max":[1],"active":[516],"intlPrevMonth":[1,"intl-prev-month"],"intlNextMonth":[1,"intl-next-month"],"locale":[1],"noCalendarInput":[4,"no-calendar-input"],"scale":[513],"activeDate":[32]},[[0,"blur","focusOutHandler"],[8,"focusin","focusInHandler"],[0,"keyup","keyDownHandler"]]]);
const CalciteDateDay$1 = /*@__PURE__*/proxyCustomElement(CalciteDateDay, [1,"calcite-date-day",{"day":[2],"disabled":[516],"currentMonth":[516,"current-month"],"selected":[516],"active":[516],"locale":[1],"scale":[513]},[[0,"click","onClick"],[0,"keydown","keyDownHandler"]]]);
const CalciteDateMonth$1 = /*@__PURE__*/proxyCustomElement(CalciteDateMonth, [1,"calcite-date-month",{"selectedDate":[16],"activeDate":[16],"min":[16],"max":[16],"locale":[1],"scale":[513]},[[0,"keydown","keyDownHandler"],[0,"focusout","disableActiveFocus"]]]);
const CalciteDateMonthHeader$1 = /*@__PURE__*/proxyCustomElement(CalciteDateMonthHeader, [1,"calcite-date-month-header",{"selectedDate":[16],"activeDate":[16],"min":[16],"max":[16],"locale":[1],"intlPrevMonth":[1,"intl-prev-month"],"intlNextMonth":[1,"intl-next-month"],"scale":[513]}]);
const CalciteDropdown$1 = /*@__PURE__*/proxyCustomElement(CalciteDropdown, [1,"calcite-dropdown",{"active":[1540],"alignment":[1537],"maxItems":[2,"max-items"],"theme":[1537],"selectedItems":[1040],"scale":[1537],"width":[1537],"type":[1537],"disableCloseOnSelect":[1540,"disable-close-on-select"],"disabled":[516]},[[0,"click","openDropdown"],[8,"click","closeCalciteDropdownOnClick"],[0,"calciteDropdownCloseRequest","closeCalciteDropdownOnEvent"],[8,"calciteDropdownOpen","closeCalciteDropdownOnOpenEvent"],[0,"keydown","keyDownHandler"],[1,"mouseenter","mouseoverHandler"],[1,"mouseleave","mouseoffHandler"],[0,"calciteDropdownItemKeyEvent","calciteDropdownItemKeyEvent"],[0,"calciteDropdownItemSelect","handleItemSelect"],[0,"calciteDropdownGroupRegister","registerCalciteDropdownGroup"]]]);
const CalciteDropdownGroup$1 = /*@__PURE__*/proxyCustomElement(CalciteDropdownGroup, [1,"calcite-dropdown-group",{"groupTitle":[513,"group-title"],"selectionMode":[1537,"selection-mode"]},[[0,"calciteDropdownItemRegister","registerCalciteDropdownItem"],[0,"calciteDropdownItemSelect","updateActiveItemOnChange"]]]);
const CalciteDropdownItem$1 = /*@__PURE__*/proxyCustomElement(CalciteDropdownItem, [1,"calcite-dropdown-item",{"active":[1540],"iconStart":[513,"icon-start"],"iconEnd":[513,"icon-end"],"href":[513]},[[0,"click","onClick"],[0,"keydown","keyDownHandler"],[16,"calciteDropdownGroupRegister","registerCalciteDropdownGroup"],[16,"calciteDropdownItemChange","updateActiveItemOnChange"]]]);
const CalciteGraph$1 = /*@__PURE__*/proxyCustomElement(CalciteGraph, [0,"calcite-graph",{"data":[16],"width":[2],"height":[2],"highlightMin":[2,"highlight-min"],"highlightMax":[2,"highlight-max"]}]);
const CalciteIcon$1 = /*@__PURE__*/proxyCustomElement(CalciteIcon, [1,"calcite-icon",{"icon":[513],"mirrored":[516],"scale":[513],"textLabel":[1,"text-label"],"theme":[513],"pathData":[32],"visible":[32]}]);
const CalciteInput$1 = /*@__PURE__*/proxyCustomElement(CalciteInput, [4,"calcite-input",{"status":[1537],"loading":[1540],"scale":[1537],"alignment":[1537],"value":[1537],"clearable":[516],"step":[514],"min":[514],"max":[514],"prefixText":[1025,"prefix-text"],"suffixText":[1025,"suffix-text"],"icon":[1544],"type":[1537],"numberButtonType":[1537,"number-button-type"],"theme":[1537],"required":[4],"autofocus":[4],"placeholder":[1],"disabled":[516]},[[0,"calciteLabelFocus","handleLabelFocus"],[0,"keydown","keyDownHandler"]]]);
const CalciteInputMessage$1 = /*@__PURE__*/proxyCustomElement(CalciteInputMessage, [1,"calcite-input-message",{"active":[1540],"icon":[516],"scale":[1537],"status":[1537],"theme":[1537],"type":[1537]}]);
const CalciteLabel$1 = /*@__PURE__*/proxyCustomElement(CalciteLabel, [1,"calcite-label",{"status":[1537],"scale":[1537],"theme":[1537],"layout":[1537]}]);
const CalciteLink$1 = /*@__PURE__*/proxyCustomElement(CalciteLink, [1,"calcite-link",{"color":[1537],"theme":[1537],"href":[513],"iconStart":[513,"icon-start"],"iconEnd":[513,"icon-end"],"disabled":[516]}]);
const CalciteLoader$1 = /*@__PURE__*/proxyCustomElement(CalciteLoader, [1,"calcite-loader",{"active":[516],"inline":[516],"scale":[513],"type":[513],"value":[2],"text":[1],"noPadding":[4,"no-padding"]}]);
const CalciteModal$1 = /*@__PURE__*/proxyCustomElement(CalciteModal, [1,"calcite-modal",{"active":[4],"beforeClose":[16],"disableCloseButton":[4,"disable-close-button"],"intlClose":[1,"intl-close"],"docked":[516],"firstFocus":[16],"disableEscape":[4,"disable-escape"],"scale":[513],"width":[520],"fullscreen":[516],"color":[513],"theme":[513],"backgroundColor":[513,"background-color"],"noPadding":[4,"no-padding"],"isActive":[32]},[[8,"keyup","handleEscape"]]]);
const CalciteNotice$1 = /*@__PURE__*/proxyCustomElement(CalciteNotice, [1,"calcite-notice",{"active":[1540],"color":[1537],"intlClose":[1,"intl-close"],"theme":[1537],"scale":[1537],"width":[1537],"dismissible":[1540],"icon":[4]}]);
const CalcitePagination$1 = /*@__PURE__*/proxyCustomElement(CalcitePagination, [1,"calcite-pagination",{"num":[2],"start":[2],"total":[2],"textLabelNext":[1,"text-label-next"],"textLabelPrevious":[1,"text-label-previous"],"theme":[513],"scale":[513]}]);
const CalcitePopover$1 = /*@__PURE__*/proxyCustomElement(CalcitePopover, [1,"calcite-popover",{"closeButton":[516,"close-button"],"disableFlip":[516,"disable-flip"],"disablePointer":[516,"disable-pointer"],"flipPlacements":[16],"offsetDistance":[514,"offset-distance"],"offsetSkidding":[514,"offset-skidding"],"open":[516],"placement":[513],"referenceElement":[1,"reference-element"],"intlClose":[1,"intl-close"],"theme":[513],"_referenceElement":[32]}]);
const CalcitePopoverManager$1 = /*@__PURE__*/proxyCustomElement(CalcitePopoverManager, [0,"calcite-popover-manager",{"selector":[1],"autoClose":[516,"auto-close"]},[[10,"click","closeOpenPopovers"]]]);
const CalciteProgress$1 = /*@__PURE__*/proxyCustomElement(CalciteProgress, [1,"calcite-progress",{"type":[1],"value":[2],"text":[1],"reversed":[4],"theme":[513]}]);
const CalciteRadioButton$1 = /*@__PURE__*/proxyCustomElement(CalciteRadioButton, [1,"calcite-radio-button",{"checked":[1540],"disabled":[516],"focused":[1540],"guid":[1537],"hidden":[516],"name":[513],"required":[516],"scale":[1537],"theme":[1537],"value":[1]},[[0,"click","check"]]]);
const CalciteRadioButtonGroup$1 = /*@__PURE__*/proxyCustomElement(CalciteRadioButtonGroup, [1,"calcite-radio-button-group",{"disabled":[516],"hidden":[516],"layout":[1537],"name":[513],"required":[516],"scale":[1537],"theme":[1537]}]);
const CalciteRadioGroup$1 = /*@__PURE__*/proxyCustomElement(CalciteRadioGroup, [1,"calcite-radio-group",{"name":[1],"selectedItem":[16],"theme":[513],"scale":[513],"appearance":[1537],"layout":[1537],"width":[1537]},[[8,"calciteLabelFocus","handleLabelFocus"],[0,"click","handleClick"],[0,"calciteRadioGroupItemChange","handleSelected"],[0,"keydown","handleKeyDown"]]]);
const CalciteRadioGroupItem$1 = /*@__PURE__*/proxyCustomElement(CalciteRadioGroupItem, [1,"calcite-radio-group-item",{"checked":[1540],"icon":[513],"iconPosition":[1537,"icon-position"],"value":[8],"useFallback":[32]}]);
const CalciteScrim$1 = /*@__PURE__*/proxyCustomElement(CalciteScrim, [1,"calcite-scrim",{"loading":[516],"theme":[1537]}]);
const CalciteSlider$1 = /*@__PURE__*/proxyCustomElement(CalciteSlider, [1,"calcite-slider",{"theme":[513],"disabled":[1540],"min":[1538],"max":[1538],"value":[1538],"minValue":[2,"min-value"],"maxValue":[2,"max-value"],"minLabel":[1,"min-label"],"maxLabel":[1,"max-label"],"snap":[4],"step":[2],"pageStep":[2,"page-step"],"ticks":[2],"labelTicks":[516,"label-ticks"],"labelHandles":[516,"label-handles"],"precise":[4],"histogram":[16],"hasHistogram":[1540,"has-histogram"],"tickValues":[32],"activeProp":[32],"minMaxValueRange":[32],"minValueDragRange":[32],"maxValueDragRange":[32]},[[8,"calciteLabelFocus","handleLabelFocus"],[0,"keydown","keyDownHandler"],[0,"click","clickHandler"]]]);
const CalciteSplitButton$1 = /*@__PURE__*/proxyCustomElement(CalciteSplitButton, [1,"calcite-split-button",{"color":[1537],"theme":[1537],"scale":[1537],"dropdownIconType":[1537,"dropdown-icon-type"],"primaryText":[513,"primary-text"],"primaryIconStart":[513,"primary-icon-start"],"primaryIconEnd":[513,"primary-icon-end"],"primaryLabel":[513,"primary-label"],"dropdownLabel":[513,"dropdown-label"],"loading":[516],"disabled":[516]}]);
const CalciteStepper$1 = /*@__PURE__*/proxyCustomElement(CalciteStepper, [1,"calcite-stepper",{"theme":[1537],"scale":[1537],"numbered":[1540],"icon":[1540],"layout":[1537],"requestedContent":[16]},[[0,"calciteStepperItemKeyEvent","calciteStepperItemKeyEvent"],[0,"calciteStepperItemRegister","registerItem"],[0,"calciteStepperItemSelect","updateItem"]]]);
const CalciteStepperItem$1 = /*@__PURE__*/proxyCustomElement(CalciteStepperItem, [1,"calcite-stepper-item",{"active":[1540],"complete":[1540],"error":[1028],"disabled":[1028],"itemTitle":[1,"item-title"],"itemSubtitle":[1,"item-subtitle"],"layout":[1537],"icon":[1028],"numbered":[1028],"scale":[1537]},[[0,"keydown","keyDownHandler"],[16,"calciteStepperItemChange","updateActiveItemOnChange"]]]);
const CalciteSwitch$1 = /*@__PURE__*/proxyCustomElement(CalciteSwitch, [1,"calcite-switch",{"switched":[1540],"name":[1537],"value":[1537],"color":[1537],"scale":[1537],"theme":[1537]},[[8,"calciteLabelFocus","handleLabelFocus"],[0,"click","onClick"],[0,"keydown","keyDownHandler"]]]);
const CalciteTab$1 = /*@__PURE__*/proxyCustomElement(CalciteTab, [1,"calcite-tab",{"tab":[1537],"active":[1540],"labeledBy":[32]},[[16,"calciteTabChange","tabChangeHandler"]]]);
const CalciteTabNav$1 = /*@__PURE__*/proxyCustomElement(CalciteTabNav, [1,"calcite-tab-nav",{"storageId":[1,"storage-id"],"syncId":[1,"sync-id"],"layout":[1537],"selectedTab":[32]},[[0,"calciteTabsFocusPrevious","focusPreviousTabHandler"],[0,"calciteTabsFocusNext","focusNextTabHandler"],[0,"calciteTabsActivate","activateTabHandler"],[32,"calciteTabChange","globalTabChangeHandler"]]]);
const CalciteTabTitle$1 = /*@__PURE__*/proxyCustomElement(CalciteTabTitle, [1,"calcite-tab-title",{"tab":[1537],"active":[1540],"layout":[1537],"controls":[32]},[[16,"calciteTabChange","tabChangeHandler"],[0,"click","onClick"],[0,"keydown","keyDownHandler"]]]);
const CalciteTabs$1 = /*@__PURE__*/proxyCustomElement(CalciteTabs, [1,"calcite-tabs",{"theme":[513],"layout":[513],"titles":[32],"tabs":[32]},[[0,"calciteTabTitleRegister","calciteTabTitleRegister"],[0,"calciteTabTitleUnregister","calciteTabTitleUnregister"],[0,"calciteTabRegister","calciteTabRegister"],[0,"calciteTabUnregister","calciteTabUnregister"]]]);
const CalciteTooltip$1 = /*@__PURE__*/proxyCustomElement(CalciteTooltip, [1,"calcite-tooltip",{"offsetDistance":[514,"offset-distance"],"offsetSkidding":[514,"offset-skidding"],"open":[516],"placement":[513],"referenceElement":[1,"reference-element"],"theme":[513],"_referenceElement":[32]}]);
const CalciteTooltipManager$1 = /*@__PURE__*/proxyCustomElement(CalciteTooltipManager, [0,"calcite-tooltip-manager",{"selector":[1]},[[3,"mouseenter","mouseEnterShow"],[3,"mouseleave","mouseLeaveHide"],[2,"focus","focusShow"],[2,"blur","blurHide"]]]);
const CalciteTree$1 = /*@__PURE__*/proxyCustomElement(CalciteTree, [1,"calcite-tree",{"lines":[1540],"theme":[1537],"scale":[1537],"selectionMode":[1537,"selection-mode"],"root":[1540]},[[0,"focus","onFocus"],[0,"calciteTreeItemSelect","onClick"]]]);
const CalciteTreeItem$1 = /*@__PURE__*/proxyCustomElement(CalciteTreeItem, [1,"calcite-tree-item",{"selected":[1540],"expanded":[1540],"parentExpanded":[1028,"parent-expanded"],"depth":[1538],"hasChildren":[1540,"has-children"],"lines":[1540],"scale":[1537],"selectionMode":[32]},[[0,"click","onClick"],[0,"keydown","keyDownHandler"]]]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      CalciteAccordion$1,
  CalciteAccordionItem$1,
  CalciteAlert$1,
  CalciteButton$1,
  CalciteCard$1,
  CalciteCheckbox$1,
  CalciteChip$1,
  CalciteColor$1,
  CalciteColorHexInput$1,
  CalciteColorSwatch$1,
  CalciteCombobox$1,
  CalciteComboboxItem$1,
  CalciteDate$1,
  CalciteDateDay$1,
  CalciteDateMonth$1,
  CalciteDateMonthHeader$1,
  CalciteDropdown$1,
  CalciteDropdownGroup$1,
  CalciteDropdownItem$1,
  CalciteGraph$1,
  CalciteIcon$1,
  CalciteInput$1,
  CalciteInputMessage$1,
  CalciteLabel$1,
  CalciteLink$1,
  CalciteLoader$1,
  CalciteModal$1,
  CalciteNotice$1,
  CalcitePagination$1,
  CalcitePopover$1,
  CalcitePopoverManager$1,
  CalciteProgress$1,
  CalciteRadioButton$1,
  CalciteRadioButtonGroup$1,
  CalciteRadioGroup$1,
  CalciteRadioGroupItem$1,
  CalciteScrim$1,
  CalciteSlider$1,
  CalciteSplitButton$1,
  CalciteStepper$1,
  CalciteStepperItem$1,
  CalciteSwitch$1,
  CalciteTab$1,
  CalciteTabNav$1,
  CalciteTabTitle$1,
  CalciteTabs$1,
  CalciteTooltip$1,
  CalciteTooltipManager$1,
  CalciteTree$1,
  CalciteTreeItem$1
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { CalciteAccordion$1 as CalciteAccordion, CalciteAccordionItem$1 as CalciteAccordionItem, CalciteAlert$1 as CalciteAlert, CalciteButton$1 as CalciteButton, CalciteCard$1 as CalciteCard, CalciteCheckbox$1 as CalciteCheckbox, CalciteChip$1 as CalciteChip, CalciteColor$1 as CalciteColor, CalciteColorHexInput$1 as CalciteColorHexInput, CalciteColorSwatch$1 as CalciteColorSwatch, CalciteCombobox$1 as CalciteCombobox, CalciteComboboxItem$1 as CalciteComboboxItem, CalciteDate$1 as CalciteDate, CalciteDateDay$1 as CalciteDateDay, CalciteDateMonth$1 as CalciteDateMonth, CalciteDateMonthHeader$1 as CalciteDateMonthHeader, CalciteDropdown$1 as CalciteDropdown, CalciteDropdownGroup$1 as CalciteDropdownGroup, CalciteDropdownItem$1 as CalciteDropdownItem, CalciteGraph$1 as CalciteGraph, CalciteIcon$1 as CalciteIcon, CalciteInput$1 as CalciteInput, CalciteInputMessage$1 as CalciteInputMessage, CalciteLabel$1 as CalciteLabel, CalciteLink$1 as CalciteLink, CalciteLoader$1 as CalciteLoader, CalciteModal$1 as CalciteModal, CalciteNotice$1 as CalciteNotice, CalcitePagination$1 as CalcitePagination, CalcitePopover$1 as CalcitePopover, CalcitePopoverManager$1 as CalcitePopoverManager, CalciteProgress$1 as CalciteProgress, CalciteRadioButton$1 as CalciteRadioButton, CalciteRadioButtonGroup$1 as CalciteRadioButtonGroup, CalciteRadioGroup$1 as CalciteRadioGroup, CalciteRadioGroupItem$1 as CalciteRadioGroupItem, CalciteScrim$1 as CalciteScrim, CalciteSlider$1 as CalciteSlider, CalciteSplitButton$1 as CalciteSplitButton, CalciteStepper$1 as CalciteStepper, CalciteStepperItem$1 as CalciteStepperItem, CalciteSwitch$1 as CalciteSwitch, CalciteTab$1 as CalciteTab, CalciteTabNav$1 as CalciteTabNav, CalciteTabTitle$1 as CalciteTabTitle, CalciteTabs$1 as CalciteTabs, CalciteTooltip$1 as CalciteTooltip, CalciteTooltipManager$1 as CalciteTooltipManager, CalciteTree$1 as CalciteTree, CalciteTreeItem$1 as CalciteTreeItem, defineCustomElements };
