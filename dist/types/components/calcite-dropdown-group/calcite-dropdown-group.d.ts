import { EventEmitter } from "../../stencil.core";
export declare class CalciteDropdownGroup {
    el: HTMLElement;
    requestedDropdownGroup: string;
    requestedDropdownItem: string;
    /** optionally set a group title for display */
    grouptitle?: string;
    calciteDropdownItemHasChanged: EventEmitter;
    registerCalciteDropdownGroup: EventEmitter;
    componentDidLoad(): void;
    render(): any;
    updateActiveItemOnChange(event: CustomEvent): void;
    registerCalciteDropdownItem(e: CustomEvent): void;
    /** created list of dropdown items */
    private items;
    /** @internal */
    private groupPosition;
    /** unique id for dropdown group */
    /** @internal */
    private dropdownGroupId;
    private getGroupPosition;
    private sortItems;
}
