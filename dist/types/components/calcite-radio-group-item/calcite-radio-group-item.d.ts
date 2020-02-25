import { EventEmitter } from "../../stencil.core";
export declare class CalciteRadioGroupItem {
    el: HTMLElement;
    /**
     * Indicates whether the control is checked.
     */
    checked: boolean;
    protected handleCheckedChange(): void;
    /**
     * The control's value.
     */
    value: any | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): any;
    calciteRadioGroupItemChange: EventEmitter;
    private inputProxy;
    private mutationObserver;
    private getMutationObserver;
    private syncFromExternalInput;
    private syncToExternalInput;
}
