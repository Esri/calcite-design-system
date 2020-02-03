import { EventEmitter } from "../../stencil.core";
export declare class CalciteDateMonthHeader {
    el: HTMLElement;
    /**
     * Month number starting 0 as January for which the calendar is shown.
     */
    month: number;
    /**
     * Year for which the calendar is shown.
     */
    year: number;
    /**
     * Already selected date.
     */
    selectedDate: Date;
    /**
     * Minimum date of the calendar below which is disabled.
     */
    min: Date;
    /**
     * Maximum date of the calendar above which is disabled.
     */
    max: Date;
    /**
     * pass the locale in which user wants to show the date.
     */
    locale: string;
    /**
     * Localized string for previous month.
     */
    prevMonthLabel: string;
    /**
     * Localized string for next month.
     */
    nextMonthLabel: string;
    /**
     *  Event triggered when user change month.
     */
    calciteMonthChange: EventEmitter;
    /**
     *  Event triggered when user change year.
     */
    calciteYearChange: EventEmitter;
    monthChange(): void;
    yearChange(): void;
    componentWillUpdate(): void;
    render(): any;
    private selectPrevMonth;
    private selectNextMonth;
    private validateYear;
    private validateMonth;
    private onYearChange;
    private getLocalizedMonths;
}
