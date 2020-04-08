import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteAccordionItem {
    el: HTMLElement;
    active: boolean;
    /** pass a title for the accordion item */
    itemTitle?: string;
    /** pass a title for the accordion item */
    itemSubtitle?: string;
    calciteAccordionItemKeyEvent: EventEmitter;
    calciteAccordionItemSelected: EventEmitter;
    closeCalciteAccordionItem: EventEmitter;
    registerCalciteAccordionItem: EventEmitter;
    componentDidLoad(): void;
    render(): any;
    keyDownHandler(e: any): void;
    updateActiveItemOnChange(event: CustomEvent): void;
    /** unique id for Accordion item */
    private accordionItemId;
    /** position within parent */
    private itemPosition;
    /** the latest requested item */
    private requestedAccordionItem;
    /** what selection mode is the parent accordion in */
    private selectionMode;
    /** what icon type does the parent accordion specify */
    private iconType;
    /** handle clicks on item header */
    private itemHeaderClickHandler;
    private determineActiveItem;
    private emitRequestedItem;
    private getItemPosition;
}
