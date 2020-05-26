import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteChip {
    value: string;
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** specify the scale of the chip, defaults to m */
    scale: "s" | "m" | "l";
    /** specify the color of the button, defaults to blue */
    color: "blue" | "red" | "yellow" | "green" | "grey";
    /** specify the appearance style of the button, defaults to solid. */
    appearance: "solid" | "clear";
    /** optionally pass an icon to display - accepts Calcite UI icon names  */
    icon?: string;
    /** Optionally show a button the user can click to dismiss the chip */
    dismissible?: boolean;
    el: HTMLElement;
    /** Emitted when the dismiss button is clicked */
    calciteChipDismiss: EventEmitter;
    closeClickHandler: (event: MouseEvent) => void;
    connectedCallback(): void;
    render(): any;
}
