export declare class CalciteTooltipManager {
    /**
     * CSS Selector to match reference elements for tooltips.
     */
    selector: string;
    toggle: (event: Event, value?: boolean) => void;
    render(): any;
    mouseEnterShow(event: Event): void;
    mouseLeaveHide(event: Event): void;
    focusShow(event: Event): void;
    blurHide(event: Event): void;
}
