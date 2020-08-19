import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteCheckbox {
    el: HTMLCalciteCheckboxElement;
    /** The checked state of the checkbox. */
    checked?: boolean;
    checkedWatcher(newChecked: boolean): void;
    /** The hovered state of the checkbox. */
    hovered: boolean;
    /** The focused state of the checkbox. */
    focused: boolean;
    focusedChanged(focused: boolean): void;
    /**
     * True if the checkbox is initially indeterminate,
     * which is independent from its checked state
     * https://css-tricks.com/indeterminate-checkboxes/
     * */
    indeterminate?: boolean;
    /** The name of the checkbox input */
    name?: string;
    /** The value of the checkbox input */
    value?: string;
    /** specify the scale of the checkbox, defaults to m */
    scale: "s" | "m" | "l";
    /** True if the checkbox is disabled */
    disabled?: boolean;
    /** Determines what theme to use */
    theme: "light" | "dark";
    private readonly checkedPath;
    private readonly indeterminatePath;
    private input;
    private getPath;
    private toggle;
    /** Emitted when the checkbox checked status changes */
    calciteCheckboxChange: EventEmitter;
    /** Emitted when the checkbox focused state changes */
    calciteCheckboxFocusedChange: EventEmitter;
    handleLabelFocus(e: any): void;
    onClick({ currentTarget, target }: MouseEvent): void;
    keyDownHandler(e: KeyboardEvent): void;
    mouseenter(): void;
    mouseleave(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private renderHiddenCheckboxInput;
    render(): any;
}
