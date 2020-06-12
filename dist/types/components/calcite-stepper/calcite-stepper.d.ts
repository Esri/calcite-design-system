import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteStepper {
    el: HTMLElement;
    /** specify the theme of stepper, defaults to light */
    theme: "light" | "dark";
    /** specify the scale of stepper, defaults to m */
    scale: "s" | "m" | "l";
    /** optionally display the number next to the step title */
    numbered: boolean;
    /** optionally display a status icon next to the step title */
    icon: boolean;
    /** specify the layout of stepper, defaults to horizontal */
    layout: "horizontal" | "vertical";
    /** @internal */
    requestedContent: HTMLElement[] | HTMLElement;
    contentWatcher(): void;
    calciteStepperItemHasChanged: EventEmitter;
    connectedCallback(): void;
    componentDidLoad(): void;
    render(): any;
    calciteStepperItemKeyEvent(e: CustomEvent): void;
    registerItem(event: CustomEvent): void;
    updateItem(event: CustomEvent): void;
    /** set the next step as active */
    nextStep(): Promise<void>;
    /** set the previous step as active */
    prevStep(): Promise<void>;
    /** set the requested step as active */
    goToStep(num: number): Promise<void>;
    /** set the first step as active */
    startStep(): Promise<void>;
    /** set the last step as active */
    endStep(): Promise<void>;
    /** created list of Stepper items */
    private items;
    /** sorted list of Stepper items */
    private sortedItems;
    /** keep track of the currently active item position */
    private currentPosition;
    /** the referenced content container element */
    private stepperContentContainer;
    private emitChangedItem;
    private focusFirstItem;
    private focusLastItem;
    private focusNextItem;
    private focusPrevItem;
    private itemIndex;
    private focusElement;
    private sortItems;
    private updateContent;
}
