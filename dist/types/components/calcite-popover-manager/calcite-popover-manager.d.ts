export declare class CalcitePopoverManager {
    el: HTMLCalcitePopoverManagerElement;
    /**
     * CSS Selector to match reference elements for popovers.
     */
    selector: string;
    /**
     * Automatically close popovers when clicking outside of them.
     */
    autoClose?: boolean;
    render(): any;
    closeOpenPopovers(event: Event): void;
}
