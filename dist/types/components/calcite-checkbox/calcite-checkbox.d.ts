import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteCheckbox {
    el: HTMLElement;
    /** True if the checkbox is initially checked */
    checked?: boolean;
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
    /** Emitted when the checkbox checked status changes */
    calciteCheckboxChange: EventEmitter;
    private observer;
    private toggle;
    onClick({ target }: MouseEvent): void;
    keyDownHandler(e: KeyboardEvent): void;
    checkedWatcher(): void;
    private inputProxy;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillRender(): void;
    private readonly indeterminatePath;
    private readonly checkedPath;
    private getPath;
    render(): any;
    private setupProxyInput;
    private syncThisToProxyInput;
    private syncProxyInputToThis;
}
