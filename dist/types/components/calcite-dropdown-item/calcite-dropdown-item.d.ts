import { EventEmitter } from "../../stencil.core";
export declare class CalciteDropdownItem {
    el: HTMLElement;
    active: boolean;
    /** @internal */
    requestedDropdownGroup: string;
    /** @internal */
    requestedDropdownItem: string;
    /** pass an optional href to render an anchor around the link items */
    href?: string;
    /** pass an optional title for rendered href */
    linktitle?: string;
    calciteDropdownItemKeyEvent: EventEmitter;
    calciteDropdownItemMouseover: EventEmitter;
    calciteDropdownItemSelected: EventEmitter;
    closeCalciteDropdown: EventEmitter;
    registerCalciteDropdownItem: EventEmitter;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    render(): any;
    onClick(e: any): void;
    onMouseover(e: any): void;
    keyDownHandler(e: any): void;
    /** unique id for dropdown item */
    /** @internal */
    private dropdownItemId;
    /** position withing group */
    /** @internal */
    private itemPosition;
    /** id of containing group */
    /** @internal */
    private currentDropdownGroup;
    private determineActiveItem;
    private emitRequestedItem;
    private getItemPosition;
}
