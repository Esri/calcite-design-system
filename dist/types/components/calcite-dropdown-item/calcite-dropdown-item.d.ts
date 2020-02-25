import { EventEmitter } from "../../stencil.core";
export declare class CalciteDropdownItem {
    el: HTMLElement;
    active: boolean;
    /** pass an optional href to render an anchor around the link items */
    href?: string;
    /** pass an optional title for rendered href */
    linkTitle?: string;
    /** optionally pass an icon to display at the start of an item - accepts calcite ui icon names  */
    iconStart?: string;
    /** optionally pass an icon to display at the end of an item - accepts calcite ui icon names  */
    iconEnd?: string;
    calciteDropdownItemKeyEvent: EventEmitter;
    calciteDropdownItemMouseover: EventEmitter;
    calciteDropdownItemSelected: EventEmitter;
    closeCalciteDropdown: EventEmitter;
    registerCalciteDropdownItem: EventEmitter;
    componentDidLoad(): void;
    render(): any;
    onClick(): void;
    onMouseover(e: any): void;
    keyDownHandler(e: any): void;
    registerCalciteDropdownGroup(event: CustomEvent): void;
    updateActiveItemOnChange(event: CustomEvent): void;
    private dropdownItemId;
    /** position withing group */
    private itemPosition;
    /** id of containing group */
    private currentDropdownGroup;
    /** requested group */
    private requestedDropdownGroup;
    /** requested item */
    private requestedDropdownItem;
    /** what selection mode is the parent dropdown group in */
    private selectionMode;
    private determineActiveItem;
    private emitRequestedItem;
    private getItemPosition;
}
