import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteRadioGroupItem {
    el: HTMLElement;
    /** Indicates whether the control is checked. */
    checked: boolean;
    /** optionally pass an icon to display - accepts Calcite UI icon names  */
    icon?: string;
    /** optionally used with icon, select where to position the icon */
    iconPosition?: "start" | "end";
    protected handleCheckedChange(): void;
    /**
     * The control's value.
     */
    value: any | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillLoad(): void;
    render(): any;
    calciteRadioGroupItemChange: EventEmitter;
    private useFallback;
    private inputProxy;
    private mutationObserver;
    private getMutationObserver;
    private syncFromExternalInput;
    private syncToExternalInput;
}
