import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteDateDay {
    el: HTMLElement;
    /** Day of the month to be shown. */
    day: number;
    /** Date is outside of range and can't be selected */
    disabled: boolean;
    /** Date is in the current month. */
    currentMonth: boolean;
    /** Date is the current selected date of the picker */
    selected: boolean;
    /** Date is actively in focus for keyboard navigation */
    active: boolean;
    /** Locale to display the day in */
    locale: string;
    /** specify the scale of the date picker */
    scale: "s" | "m" | "l";
    onClick(): void;
    keyDownHandler(e: KeyboardEvent): void;
    /**
     * Emitted when user selects day
     */
    calciteDaySelect: EventEmitter;
    render(): any;
}
