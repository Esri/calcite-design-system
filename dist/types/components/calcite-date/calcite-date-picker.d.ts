import { EventEmitter } from "../../stencil.core";
export declare class CalciteDatePicker {
    el: HTMLElement;
    /**
     * Value of the form control
     */
    value?: string;
    /**
     * Name of the form control (useful for specifying input/label relationship)
     */
    min?: string;
    /**
     * Value of the form control
     */
    max?: string;
    /**
     * Localized string for previous month.
     */
    prevMonthLabel?: string;
    /**
     * Localized string for next month.
     */
    nextMonthLabel?: string;
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
    startOfWeek?: number;
    /**
     * pass the locale in which user wants to show the date.
     */
    locale?: string;
    /**
     * Trigger calcite date change when a user changes the date.
     */
    calciteDateChange: EventEmitter;
    observer: MutationObserver;
    /**
     * Expanded state of the calander.
     */
    showCalendar: boolean;
    /**
     * Active date.
     */
    activeDate: Date;
    inputProxy: HTMLInputElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillRender(): void;
    render(): any;
    private setActiveDate;
    private expandCalendar;
    private closeCalendar;
    private getMonth;
    private getYear;
    private setMonth;
    private setYear;
    private setDate;
    setupProxyInput(): void;
    syncThisToProxyInput: () => void;
    syncProxyInputToThis: () => void;
}
