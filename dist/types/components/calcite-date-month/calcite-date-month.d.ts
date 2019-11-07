import { EventEmitter } from "../../stencil.core";
export declare class CalciteDateMonth {
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
     * Date currently active.
     */
    activeDate: Date;
    /**
     * Minimum date of the calendar below which is disabled.
     */
    min: Date;
    /**
     * Maximum date of the calendar above which is disabled.
     */
    max: Date;
    /**
     * Sun by default
     * 0: Sunday
     * 1: Monday
     * 2: Tuesday
     * 3: Wednesday
     * 4: Thursday
     * 5: Friday
     * 6: Saturday
     */
    startOfWeek: number;
    /**
     * pass the locale in which user wants to show the date.
     */
    locale: string;
    /**
     * Event emitted when user selects the date.
     */
    calciteDateSelect: EventEmitter;
    /**
     * Active date for the user keyboard access.
     */
    calciteActiveDateChange: EventEmitter;
    componentWillUpdate(): void;
    render(): any;
    keyDownHandler(e: KeyboardEvent): void;
    mouseoverHandler(e: any): void;
    private addMonthToActiveDate;
    private addDaysToActiveDate;
    private onSelectDate;
    private isSelectedDate;
    private validateDate;
    private getPrevMonthdays;
    private getNextMonthdays;
    private getLocalizedWeekday;
}
