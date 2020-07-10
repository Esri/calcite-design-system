import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteStepperItem {
    el: HTMLElement;
    /** is the step active */
    active: boolean;
    /** has the step been completed */
    complete: boolean;
    /** does the step contain an error that needs to be resolved by the user */
    error: boolean;
    /** is the step disabled and not navigable to by a user */
    disabled: boolean;
    /** pass a title for the stepper item */
    itemTitle?: string;
    /** pass a title for the stepper item */
    itemSubtitle?: string;
    /** pass a title for the stepper item */
    /** @internal */
    layout?: string;
    /** should the items display an icon based on status */
    /** @internal */
    icon: boolean;
    /** optionally display the step number next to the title and subtitle */
    /** @internal */
    numbered: boolean;
    /** the scale of the item */
    /** @internal */
    scale: "s" | "m" | "l";
    disabledWatcher(): void;
    calciteStepperItemKeyEvent: EventEmitter;
    calciteStepperItemSelected: EventEmitter;
    registerCalciteStepperItem: EventEmitter;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    render(): any;
    keyDownHandler(e: any): void;
    updateActiveItemOnChange(event: CustomEvent): void;
    /** position within parent */
    private itemPosition;
    /** the latest requested item position*/
    private activePosition;
    /** the slotted item content */
    private itemContent;
    private setIcon;
    private determineActiveItem;
    private registerStepperItem;
    private emitRequestedItem;
    private getItemContent;
    private getItemPosition;
}
