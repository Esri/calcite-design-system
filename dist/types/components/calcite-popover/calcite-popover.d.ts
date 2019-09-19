import Popper from "popper.js";
export declare class CalcitePopover {
    /**
     * Display and position the component.
     */
    open: boolean;
    openHandler(open: boolean): void;
    /**
     * Determines where the element will be positioned.
     * horizontal: Positioned to the left or right of the referenceElement.
     * vertical: Positioned above or below the referenceElement.
     */
    placement: "horizontal" | "vertical";
    placementHandler(): void;
    /**
     * Reference HTMLElement used to position this component according to the placement property.
     */
    referenceElement: HTMLElement;
    referenceElementHandler(): void;
    /**
     * Offset the position of the popover in the horizontal direction.
     */
    xOffset: number;
    xOffsetHandler(): void;
    /**
     * Offset the position of the popover in the vertical direction.
     */
    yOffset: number;
    yOffsetHandler(): void;
    el: HTMLCalcitePopoverElement;
    popper: Popper;
    componentDidLoad(): void;
    componentDidUnload(): void;
    reposition(): Promise<void>;
    toggle(): Promise<void>;
    destroyPopper(): void;
    render(): any;
}
