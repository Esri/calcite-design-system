import { EventEmitter } from "../../stencil.core";
export declare class CalciteDateDay {
    el: HTMLElement;
    /**
     * day of the month to be shown.
     */
    day: number;
    /**
     * Enables tells whether day enabled for the user click.
     */
    enable: boolean;
    /**
     * Selected tells whether day is selected.
     */
    selected: boolean;
    /**
     * Active tells whether day is Actively in focus.
     */
    active: boolean;
    /**
     * When user selects day it emits the event.
     */
    calciteDaySelect: EventEmitter;
    componentWillUpdate(): void;
    render(): any;
    onClick(): void;
    keyDownHandler(e: KeyboardEvent): void;
}
