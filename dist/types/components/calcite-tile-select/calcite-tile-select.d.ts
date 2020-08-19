export declare class CalciteTileSelect {
    el: HTMLCalciteTileSelectElement;
    /** The checked state of the tile select. */
    checked: boolean;
    /** The description text that appears beneath the heading of the tile. */
    description?: string;
    /** The disabled state of the tile select. */
    disabled: boolean;
    /** The focused state of the tile select. */
    focused: boolean;
    /** The heading text that appears between the icon and description of the tile. */
    heading?: string;
    /** The hidden state of the tile select. */
    hidden: boolean;
    /** The icon that appears at the top of the tile. */
    icon?: string;
    /** The name of the tile select.  This name will appear in form submissions as either a radio or checkbox identifier based on the `type` property. */
    name: string;
    /** The side of the tile that the radio or checkbox appears. */
    showInput: "left" | "right" | "none";
    /** The theme of the tile select. */
    theme: "light" | "dark";
    /** The selection mode of the tile select: radio (single) or checkbox (multiple). */
    type: "radio" | "checkbox";
    /** The value of the tile select.  This value will appear in form submissions when this tile select is checked. */
    value?: string;
    private input;
    calciteCheckboxChangeEvent(event: CustomEvent): void;
    calciteCheckboxFocusedChangeEvent(event: CustomEvent): void;
    calciteRadioButtonChangeEvent(event: CustomEvent): void;
    calciteRadioButtonFocusedChangeEvent(event: CustomEvent): void;
    click(event: MouseEvent): void;
    mouseenter(): void;
    mouseleave(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private renderInput;
    render(): any;
}
