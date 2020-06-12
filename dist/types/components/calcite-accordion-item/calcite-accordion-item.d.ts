import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteAccordionItem {
    el: HTMLElement;
    active: boolean;
    /** pass a title for the accordion item */
    itemTitle?: string;
    /** pass a title for the accordion item */
    itemSubtitle?: string;
    /** optionally pass an icon to display - accepts Calcite UI icon names  */
    icon?: string;
    calciteAccordionItemKeyEvent: EventEmitter;
    calciteAccordionItemSelect: EventEmitter;
    calciteAccordionItemClose: EventEmitter;
    calciteAccordionItemRegister: EventEmitter;
    componentDidLoad(): void;
    render(): any;
    keyDownHandler(e: any): void;
    updateActiveItemOnChange(event: CustomEvent): void;
    /** the containing accordion element */
    private parent;
    /** position within parent */
    private itemPosition;
    /** the latest requested item */
    private requestedAccordionItem;
    /** what selection mode is the parent accordion in */
    private selectionMode;
    /** what icon type does the parent accordion specify */
    private iconType;
    /** what icon position does the parent accordion specify */
    private iconPosition;
    /** the scale of the parent accordion */
    private scale;
    /** handle clicks on item header */
    private itemHeaderClickHandler;
    private determineActiveItem;
    private emitRequestedItem;
    private getItemPosition;
}
