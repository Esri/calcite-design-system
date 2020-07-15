import { EventEmitter, VNode } from "../../stencil-public-runtime";
interface ItemData {
    label: string;
    value: string;
}
export declare class CalciteCombobox {
    active: boolean;
    disabled: boolean;
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** specify the scale of the combobox, defaults to m */
    scale: "s" | "m" | "l";
    label: string;
    placeholder?: string;
    el: HTMLElement;
    items: HTMLCalciteComboboxItemElement[];
    selectedItems: HTMLCalciteComboboxItemElement[];
    visibleItems: HTMLCalciteComboboxItemElement[];
    textInput: HTMLInputElement;
    data: ItemData[];
    observer: MutationObserver;
    connectedCallback(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    calciteLookupChange: EventEmitter;
    calciteComboboxChipDismiss: EventEmitter;
    calciteComboboxItemChangeHandler(event: CustomEvent<HTMLCalciteComboboxItemElement>): void;
    calciteChipDismissHandler(event: CustomEvent<HTMLCalciteChipElement>): void;
    inputHandler: (event: Event) => void;
    handleInputKeyDown(event: KeyboardEvent): void;
    filterItems: any;
    toggleSelection(item: HTMLCalciteComboboxItemElement, value?: boolean): void;
    getVisibleItems(): HTMLCalciteComboboxItemElement[];
    getSelectedItems(): HTMLCalciteComboboxItemElement[];
    updateItems(): void;
    getData(): ItemData[];
    getItems(): HTMLCalciteComboboxItemElement[];
    calciteComboboxItemKeyEventHandler(event: CustomEvent<{
        event: KeyboardEvent;
        item: HTMLCalciteComboboxItemElement;
    }>): void;
    closeCalciteCombobox(): void;
    focusFirstItem(): void;
    focusLastItem(): void;
    focusNextItem(item: HTMLCalciteComboboxItemElement): void;
    focusPrevItem(item: HTMLCalciteComboboxItemElement): void;
    itemIndex(item: HTMLCalciteComboboxItemElement): number;
    comboboxFocusHandler: (event: Event) => void;
    render(): VNode;
}
export {};
