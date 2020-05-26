import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteAccordion {
    el: HTMLElement;
    /** specify the theme of accordion, defaults to light */
    theme: "light" | "dark";
    /** specify the scale of accordion, defaults to m */
    scale: "s" | "m" | "l";
    /** specify the appearance - default (containing border), or minimal (no containing border), defaults to default */
    appearance: "default" | "minimal" | "transparent";
    /** specify the placement of the icon in the header, defaults to end */
    iconPosition: "start" | "end";
    /** specify the type of the icon in the header, defaults to chevron */
    iconType: "chevron" | "caret" | "plus-minus";
    /** specify the selection mode - multi (allow any number of open items), single (allow one open item),
     * or single-persist (allow and require one open item), defaults to multi */
    selectionMode: "multi" | "single" | "single-persist";
    calciteAccordionItemHasChanged: EventEmitter;
    connectedCallback(): void;
    componentDidLoad(): void;
    render(): any;
    calciteAccordionItemKeyEvent(e: CustomEvent): void;
    registerCalciteAccordionItem(e: CustomEvent): void;
    updateActiveItemOnChange(event: CustomEvent): void;
    /** created list of Accordion items */
    private items;
    /** keep track of whether the items have been sorted so we don't re-sort */
    private sorted;
    /** keep track of the requested item for multi mode */
    private requestedAccordionItem;
    private focusFirstItem;
    private focusLastItem;
    private focusNextItem;
    private focusPrevItem;
    private itemIndex;
    private focusElement;
    private sortItems;
}
