import { EventEmitter } from "../../stencil-public-runtime";
import { GroupRegistration, ItemKeyboardEvent } from "../../interfaces/Dropdown";
export declare class CalciteDropdown {
    el: HTMLCalciteDropdownElement;
    active: boolean;
    /** specify the alignment of dropdown, defaults to start */
    alignment: "start" | "center" | "end";
    /** specify the max items to display before showing the scroller, must be greater than 0 **/
    maxItems: number;
    /** specify the theme of the dropdown, defaults to light */
    theme: "light" | "dark";
    /**
     * **read-only** The currently selected items
     *
     * @readonly
     */
    selectedItems: HTMLCalciteDropdownItemElement[];
    /** specify the scale of dropdown, defaults to m */
    scale: "s" | "m" | "l";
    /** specify the width of dropdown, defaults to m */
    width: "s" | "m" | "l";
    /** specify whether the dropdown is opened by hover or click of the trigger element */
    type: "hover" | "click";
    /**
    allow the dropdown to remain open after a selection is made
    if the selection-mode of the selected item's containing group is "none", the dropdown will always close
    */
    disableCloseOnSelect: boolean;
    /** is the dropdown disabled  */
    disabled?: boolean;
    connectedCallback(): void;
    componentDidLoad(): void;
    render(): any;
    /** fires when a dropdown item has been selected or deselected **/
    calciteDropdownSelect: EventEmitter<void>;
    /** fires when a dropdown has been opened **/
    calciteDropdownOpen: EventEmitter<void>;
    /** fires when a dropdown has been closed **/
    calciteDropdownClose: EventEmitter<void>;
    openDropdown(e: any): void;
    closeCalciteDropdownOnClick(e: any): void;
    closeCalciteDropdownOnEvent(): void;
    closeCalciteDropdownOnOpenEvent(e: any): void;
    keyDownHandler(e: any): void;
    mouseoverHandler(): void;
    mouseoffHandler(): void;
    calciteDropdownItemKeyEvent(e: CustomEvent<ItemKeyboardEvent>): void;
    handleItemSelect(event: CustomEvent): void;
    registerCalciteDropdownGroup(e: CustomEvent<GroupRegistration>): void;
    /** created list of dropdown items */
    private items;
    /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
    private maxScrollerHeight;
    /** keep track of whether the groups have been sorted so we don't re-sort */
    private sorted;
    /** trigger element */
    private trigger;
    private updateSelectedItems;
    private getMaxScrollerHeight;
    private closeCalciteDropdown;
    private focusOnFirstActiveOrFirstItem;
    private focusFirstItem;
    private focusLastItem;
    private focusNextItem;
    private focusPrevItem;
    private itemIndex;
    private getFocusableElement;
    private openCalciteDropdown;
}
