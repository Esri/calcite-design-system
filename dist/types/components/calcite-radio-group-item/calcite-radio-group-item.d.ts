import { EventEmitter } from "../../stencil-public-runtime";
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
    componentDidLoad(): void;
    render(): any;
    calciteRadioGroupItemChange: EventEmitter;
    private useFallback;
    private inputProxy;
    private mutationObserver;
    private getMutationObserver;
    private syncFromExternalInput;
    private syncToExternalInput;
}
