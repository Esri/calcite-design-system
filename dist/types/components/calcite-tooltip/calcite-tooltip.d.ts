import Popper from "popper.js";
import { CalcitePlacement } from "../../utils/popper";
export declare class CalciteTooltip {
    /**
     *  HTMLElement Used to position this component within the a boundary.
     */
    boundariesElement?: HTMLElement | string;
    boundariesElementHandler(): void;
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
     * Reference HTMLElement used to position this component.
     */
    referenceElement: HTMLElement | string;
    referenceElementHandler(): void;
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    el: HTMLCalciteTooltipElement;
    _referenceElement: HTMLElement;
    _boundariesElement: HTMLElement;
    popper: Popper;
    componentDidLoad(): void;
    componentDidUnload(): void;
    reposition(): Promise<void>;
    getId: () => string;
    addReferenceAria: () => void;
    addReferenceListeners: () => void;
    removeReferenceListeners: () => void;
    show: () => void;
    hide: () => void;
    getReferenceElement(): HTMLElement;
    getBoundariesElement(): HTMLElement;
    getModifiers(): Popper.Modifiers;
    createPopper(): void;
    updatePopper(popper: Popper): void;
    destroyPopper(): void;
    render(): any;
}
