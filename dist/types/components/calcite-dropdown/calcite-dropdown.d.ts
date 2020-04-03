import { GroupRegistration } from "../../interfaces/Dropdown";
export declare class CalciteDropdown {
    el: HTMLElement;
    active: boolean;
    /** specify the alignment of dropdown, defaults to start */
    alignment: "start" | "center" | "end";
    /** specify the max items to display before showing the scroller, must be greater than 0 **/
    maxItems: number;
    /** specify the theme of the dropdown, defaults to light */
    theme: "light" | "dark";
    /** specify the scale of dropdown, defaults to m */
    scale: "s" | "m" | "l";
    /** specify the width of dropdown, defaults to m */
    width: "s" | "m" | "l";
    /** specify whether the dropdown is opened by hover or click of the trigger element */
    type: "hover" | "click";
    connectedCallback(): void;
    componentDidLoad(): void;
    render(): any;
    openDropdown(e: any): void;
    closeCalciteDropdownOnClick(e: any): void;
    closeCalciteDropdownOnEvent(): void;
    keyDownHandler(e: any): void;
    mouseoverHandler(): void;
    mouseoffHandler(): void;
    calciteDropdownItemKeyEvent(item: CustomEvent): void;
    registerCalciteDropdownGroup({ detail: { items, position, titleEl }, }: CustomEvent<GroupRegistration>): void;
    /** created list of dropdown items */
    private items;
    /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
    private maxScrollerHeight;
    /** keep track of whether the groups have been sorted so we don't re-sort */
    private sorted;
    /** trigger element */
    private trigger;
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
