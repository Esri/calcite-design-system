import { EventEmitter } from "../../stencil.core";
export declare class CalciteSwitch {
    el: HTMLElement;
    /**
     * True if the control should be switched on
     */
    switched?: boolean;
    /**
     * Name of the form control (useful for specifying input/label relationship)
     */
    name?: string;
    /**
     * Value of the form control
     */
    value?: string;
    /**
     * Color of the switch. Use red to denote destructive settings/actions.
     */
    color?: "red" | "blue";
    /**
     * @todo document what gets passed to the handler for these events
     */
    calciteSwitchChange: EventEmitter;
    private observer;
    onClick(e: any): void;
    keyDownHandler(e: KeyboardEvent): void;
    switchWatcher(): void;
    private inputProxy;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillRender(): void;
    render(): any;
    private setupProxyInput;
    private syncThisToProxyInput;
    private syncProxyInputToThis;
}
