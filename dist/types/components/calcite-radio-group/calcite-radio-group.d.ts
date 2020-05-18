import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteRadioGroup {
    el: HTMLElement;
    /**
     * The group's name. Gets submitted with the form.
     */
    name: string;
    protected handleNameChange(value: any): void;
    /**
     * The group's selected item.
     */
    selectedItem: HTMLCalciteRadioGroupItemElement;
    protected handleSelectedItemChange<T extends HTMLCalciteRadioGroupItemElement>(newItem: T, oldItem: T): void;
    /** The component's theme. */
    theme: "light" | "dark";
    /** The scale of the radio group */
    scale: "s" | "m" | "l";
    /** specify the appearance style of the radio group, defaults to solid. */
    appearance: "solid" | "outline";
    /** specify the layout of the radio group, defaults to horizontal */
    layout: "horizontal" | "vertical";
    connectedCallback(): void;
    componentDidLoad(): void;
    render(): any;
    protected handleClick(event: MouseEvent): void;
    protected handleSelected(event: Event): void;
    protected handleKeyDown(event: KeyboardEvent): void;
    calciteRadioGroupChange: EventEmitter;
    /** Focuses the selected item. If there is no selection, it focuses the first item. */
    setFocus(): Promise<void>;
    private hiddenInput;
    private hasLoaded;
    private getItems;
    private selectItem;
    private syncWithInputProxy;
}
