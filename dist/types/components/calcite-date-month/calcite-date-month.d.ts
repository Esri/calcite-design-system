import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteDateMonth {
    el: HTMLElement;
    /** Already selected date.*/
    selectedDate: Date;
    /** Date currently active.*/
    activeDate: Date;
    /** Minimum date of the calendar below which is disabled.*/
    min: Date;
    /** Maximum date of the calendar above which is disabled.*/
    max: Date;
    /** User's language and region as BCP 47 formatted string. */
    locale: string;
    /** specify the scale of the date picker */
    scale: "s" | "m" | "l";
    /**
     * Event emitted when user selects the date.
     */
    calciteDateSelect: EventEmitter;
    /**
     * Active date for the user keyboard access.
     */
    calciteActiveDateChange: EventEmitter;
    keyDownHandler(e: KeyboardEvent): void;
    /**
     * Once user is not interacting via keyboard,
     * disable auto focusing of active date
     */
    disableActiveFocus(): void;
    render(): any;
    private activeFocus;
    /**
     * Add n months to the current month
     */
    private addMonths;
    /**
     * Add n days to the current date
     */
    private addDays;
    /**
     * Get dates for last days of the previous month
     */
    private getPrevMonthdays;
    /**
     * Get dates for the current month
     */
    private getCurrentMonthDays;
    /**
     * Get dates for first days of the next month
     */
    private getNextMonthDays;
}
