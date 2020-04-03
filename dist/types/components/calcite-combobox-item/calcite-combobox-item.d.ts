import { EventEmitter, VNode } from "../../stencil-public-runtime";
export declare class CalciteComboboxItem {
    disabled: boolean;
    parentItem?: HTMLCalciteComboboxItemElement;
    selected: boolean;
    selectedWatchHandler(newValue: boolean): void;
    textLabel: string;
    value: string;
    el: HTMLElement;
    isSelected: boolean;
    isNested: boolean;
    hasDefaultSlot: boolean;
    comboboxItemEl: HTMLElement;
    componentWillLoad(): void;
    /**
     * Emitted whenever the item is selected or unselected.
     * @event calciteComboboxItemChange
     */
    calciteComboboxItemChange: EventEmitter;
    calciteComboboxItemKeyEvent: EventEmitter;
    keyDownHandler(event: any): void;
    /**
     * Used to toggle the selection state. By default this won't trigger an event.
     * The first argument allows the value to be coerced, rather than swapping values.
     */
    toggleSelected(coerce?: boolean): Promise<void>;
    itemClickHandler: (event: MouseEvent) => void;
    getDepth(): boolean;
    renderIcon(scale: any): VNode;
    renderChildren(): VNode;
    render(): VNode;
}
