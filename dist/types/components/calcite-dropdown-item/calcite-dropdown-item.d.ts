import { EventEmitter } from "../../stencil.core";
export declare class CalciteDropdownItem {
    el: HTMLElement;
    active: boolean;
    /** @internal */
    requestedDropdownGroup: string;
    /** @internal */
    requestedDropdownItem: string;
    calciteDropdownItemSelected: EventEmitter;
    calciteDropdownItemKeyEvent: EventEmitter;
    closeCalciteDropdown: EventEmitter;
    registerCalciteDropdownItem: EventEmitter;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    render(): any;
    onClick(e: any): void;
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
