import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteChip {
    value: string;
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** specify the scale of the chip, defaults to m */
    scale: "xs" | "s" | "m" | "l" | "xl";
    /** optionally pass an icon to display - accepts Calcite UI icon names  */
    icon?: string;
    el: HTMLElement;
    calciteChipDismiss: EventEmitter;
    closeClickHandler: (event: MouseEvent) => void;
    connectedCallback(): void;
    render(): any;
}
