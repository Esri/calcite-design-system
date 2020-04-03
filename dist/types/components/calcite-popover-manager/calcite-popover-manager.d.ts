export declare class CalcitePopoverManager {
    /**
     * CSS Selector to match reference elements for popovers.
     */
    selector: string;
    el: HTMLCalcitePopoverManagerElement;
    componentDidLoad(): void;
    componentDidUnload(): void;
    toggle: (event: Event) => void;
    render(): any;
}
