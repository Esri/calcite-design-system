export declare class CalciteDropdown {
    el: HTMLElement;
    active: boolean;
    /** specify the alignment of dropdrown, defaults to left */
    alignment: "left" | "right" | "center";
    /** specify the alignment of dropdrown, defaults to left */
    theme: "light" | "dark";
    /** specify the scale of dropdrown, defaults to m */
    scale: "s" | "m" | "l";
    connectedCallback(): void;
    componentWillUpdate(): void;
    render(): any;
    openDropdown(e: any): void;
    closeCalciteDropdownOnClick(e: any): void;
    closeCalciteDropdownOnEvent(): void;
    keyDownHandler(e: any): void;
    calciteDropdownItemKeyEvent(item: CustomEvent): void;
    registerCalciteDropdownGroup(e: CustomEvent): void;
    /** created list of dropdown items */
    private items;
    /** keep track of whether the groups have been sorted so we don't re-sort */
    private sorted;
    /** unique id for dropdown */
    /** @internal */
    private dropdownId;
    private closeCalciteDropdown;
    private focusFirstItem;
    private focusLastItem;
    private focusNextItem;
    private focusPrevItem;
    private itemIndex;
    private getFocusableElement;
    private openCalciteDropdown;
    private sortItems;
}
