import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteDatePicker {
    el: HTMLElement;
    /** Selected date */
    value?: string;
    /** Selected date as full date object*/
    valueAsDate?: Date;
    /** Earliest allowed date ("yyyy-mm-dd") */
    min?: string;
    /** Latest allowed date ("yyyy-mm-dd") */
    max?: string;
    /** Expand or collapse when calendar does not have input */
    active: boolean;
    /** Localized string for "previous month" */
    prevMonthLabel?: string;
    /** Localized string for "next month" */
    nextMonthLabel?: string;
    /** BCP 47 language tag for desired language and country format */
    locale?: string;
    /** Show only calendar popup */
    noCalendarInput?: boolean;
    /** specify the scale of the date picker */
    scale: "s" | "m" | "l";
    focusOutHandler(): void;
    /**
     * Blur doesn't fire properly when there is no shadow dom (ege/IE11)
     * Check if the focused element is inside the date picker, if not close
     */
    focusInHandler(e: FocusEvent): void;
    keyDownHandler(e: KeyboardEvent): void;
    /**
     * Trigger calcite date change when a user changes the date.
     */
    calciteDateChange: EventEmitter<Date>;
    /**
     * Active date.
     */
    activeDate: Date;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillRender(): void;
    render(): any;
    private localeData;
    private hasShadow;
    private inputProxy;
    private observer;
    /**
     * Register slotted date input proxy, or create one if not provided
     */
    setupProxyInput(): void;
    /**
     * Update component based on input proxy
     */
    syncThisToProxyInput: () => void;
    /**
     * Update input proxy
     */
    syncProxyInputToThis: () => void;
    /**
     * Set both iso value and date value and update proxy
     */
    private setValue;
    /**
     * Reset active date and close
     */
    private reset;
    /**
     * If inputted string is a valid date, update value/active
     */
    private input;
    /**
     * Clean up invalid date from input on blur
     */
    private blur;
    /**
     * Get an active date using the value, or current date as default
     */
    private getActiveDate;
    /**
     * Find a date from input string
     * return false if date is invalid, or out of range
     */
    private getDateFromInput;
}
