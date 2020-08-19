import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteSwitch {
    el: HTMLCalciteSwitchElement;
    /** True if the switch is initially on */
    switched?: boolean;
    /** The name of the checkbox input */
    name?: string;
    /** The value of the checkbox input */
    value?: string;
    /** What color the switch should be */
    color: "red" | "blue";
    /** The scale of the switch */
    scale: "s" | "m" | "l";
    /** True if the switch is disabled */
    disabled?: boolean;
    /** The component's theme. */
    theme: "light" | "dark";
    calciteSwitchChange: EventEmitter;
    private observer;
    handleLabelFocus(e: any): void;
    onClick(e: any): void;
    keyDownHandler(e: KeyboardEvent): void;
    switchWatcher(): void;
    private inputProxy;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillRender(): void;
    render(): any;
    private get tabIndex();
    private setupProxyInput;
    private syncThisToProxyInput;
    private syncProxyInputToThis;
    private updateSwitch;
}
