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
     * Localized string for place holder to the date picker input.
     */
    placeholder: string;
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
     * Input as Date
     */
    valueAsDate?: Date;
    /**
     * Show no input for only calendar popup
     */
    noCalendarInput?: boolean;
    /**
     * Expand or collapse when calendar does not have input.
     */
    showCalendar: boolean;
    /**
     * Trigger calcite date change when a user changes the date.
     */
    calciteDateChange: EventEmitter;
    observer: MutationObserver;
    /**
     * Active date.
     */
    activeDate: Date;
    onNameChanged(newValue: string): void;
    inputProxy: HTMLInputElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillRender(): void;
    render(): any;
    private setActiveDate;
    private expandCalendar;
    closeCalendar(): void;
    private getMonth;
    private getYear;
    private setMonth;
    private setYear;
    private setDate;
    setupProxyInput(): void;
    syncThisToProxyInput: () => void;
    syncProxyInputToThis: () => void;
    private generateDate;
}
