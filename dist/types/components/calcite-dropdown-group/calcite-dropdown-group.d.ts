import { EventEmitter } from "../../stencil-public-runtime";
import { GroupRegistration, ItemRegistration } from "../../interfaces/Dropdown";
export declare class CalciteDropdownGroup {
    el: HTMLElement;
    /** optionally set a group title for display */
    groupTitle?: string;
    /** specify the selection mode - multi (allow any number of (or no) active items), single (allow and require one active item),
     none (no active items), defaults to single */
    selectionMode: "multi" | "single" | "none";
    calciteDropdownItemHasChanged: EventEmitter;
    registerCalciteDropdownGroup: EventEmitter<GroupRegistration>;
    connectedCallback(): void;
    componentDidLoad(): void;
    render(): any;
    registerCalciteDropdownItem(event: CustomEvent<ItemRegistration>): void;
    updateActiveItemOnChange(event: CustomEvent): void;
    /** created list of dropdown items */
    private items;
    /** unique id for dropdown group */
    private dropdownGroupId;
    /** position of group within a dropdown */
    private groupPosition;
    /** the requested group */
    private requestedDropdownGroup;
    /** the requested item */
    private requestedDropdownItem;
    private titleEl;
    private getGroupPosition;
    private sortItems;
}
