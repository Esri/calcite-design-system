import { EventEmitter } from "../../stencil.core";
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
    /** The scale of the button */
    scale: "s" | "m" | "l";
    connectedCallback(): void;
    componentDidLoad(): void;
    render(): any;
    protected handleClick(event: MouseEvent): void;
    protected handleSelected(event: Event): void;
    protected handleKeyDown(event: KeyboardEvent): void;
    calciteRadioGroupChange: EventEmitter;
    private hiddenInput;
    private hasLoaded;
    private getItems;
    private selectItem;
    private syncWithInputProxy;
}
