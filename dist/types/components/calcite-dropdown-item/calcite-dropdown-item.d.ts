import { EventEmitter } from "../../stencil-public-runtime";
import { ItemRegistration } from "../../interfaces/Dropdown";
export declare class CalciteDropdownItem {
    el: HTMLElement;
    active: boolean;
    /** optionally pass an icon to display at the start of an item - accepts calcite ui icon names  */
    iconStart?: string;
    /** optionally pass an icon to display at the end of an item - accepts calcite ui icon names  */
    iconEnd?: string;
    /** optionally pass a href - used to determine if the component should render as anchor */
    href?: string;
    calciteDropdownItemKeyEvent: EventEmitter;
    calciteDropdownItemSelected: EventEmitter;
    closeCalciteDropdown: EventEmitter;
    registerCalciteDropdownItem: EventEmitter<ItemRegistration>;
    /** Focuses the selected item. */
    setFocus(): Promise<void>;
    componentDidLoad(): void;
    render(): any;
    onClick(): void;
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
    /** if href is requested, track the rendered child link*/
    private childLink;
    private determineActiveItem;
    private emitRequestedItem;
    private getAttributes;
    private getItemPosition;
}
