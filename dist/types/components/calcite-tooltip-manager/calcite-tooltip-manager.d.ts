export declare class CalciteTooltipManager {
    /**
     * CSS Selector to match reference elements for tooltips.
     */
    selector: string;
    el: HTMLCalciteTooltipManagerElement;
    componentDidLoad(): void;
    componentDidUnload(): void;
    toggle: (event: Event, value?: boolean) => void;
    show: (event: Event) => void;
    hide: (event: Event) => void;
    render(): any;
}
