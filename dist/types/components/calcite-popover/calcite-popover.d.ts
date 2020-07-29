import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { CalcitePlacement } from "../../utils/popper";
import { StrictModifiers, Placement, Instance as Popper } from "@popperjs/core";
export declare type FocusId = "close-button";
/**
 * @slot image - A slot for adding an image. The image will appear above the other slot content.
 */
export declare class CalcitePopover {
    /**
     * Display a close button within the Popover.
     */
    closeButton: boolean;
    /**
     * Prevents flipping the popover's placement when it starts to overlap its reference element.
     */
    disableFlip: boolean;
    /**
     * Removes the caret pointer.
     */
    disablePointer: boolean;
    /**
     * Defines the available placements that can be used when a flip occurs.
     */
    flipPlacements?: Placement[];
    /**
     * Offset the position of the popover away from the reference element.
     */
    offsetDistance: number;
    offsetDistanceOffsetHandler(): void;
    /**
     * Offset the position of the popover along the reference element.
     */
    offsetSkidding: number;
    offsetSkiddingHandler(): void;
    /**
     * Display and position the component.
     */
    open: boolean;
    openHandler(open: boolean): void;
    /**
     * Determines where the component will be positioned relative to the referenceElement.
     */
    placement: CalcitePlacement;
    placementHandler(): void;
    /**
     * Reference HTMLElement used to position this component according to the placement property.
     */
    referenceElement: HTMLElement | string;
    referenceElementHandler(): void;
    /** Text for close button. */
    intlClose: string;
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    el: HTMLCalcitePopoverElement;
    _referenceElement: HTMLElement;
    popper: Popper;
    arrowEl: HTMLDivElement;
    closeButtonEl: HTMLButtonElement;
    guid: string;
    componentDidLoad(): void;
    componentDidUnload(): void;
    /** Fired when the popover is closed */
    calcitePopoverClose: EventEmitter;
    /** Fired when the popover is opened */
    calcitePopoverOpen: EventEmitter;
    reposition(): Promise<void>;
    setFocus(focusId?: FocusId): Promise<void>;
    toggle(value?: boolean): Promise<void>;
    getId: () => string;
    addReferences: () => void;
    removeReferences: () => void;
    getReferenceElement(): HTMLElement;
    getModifiers(): Partial<StrictModifiers>[];
    createPopper(): void;
    destroyPopper(): void;
    hide: () => void;
    renderImage(): VNode;
    renderCloseButton(): VNode;
    render(): any;
}
