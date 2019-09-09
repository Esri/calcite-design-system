import { EventEmitter } from "../../stencil.core";
export declare class CalciteAlerts {
    el: HTMLElement;
    currentAlert: string;
    active: boolean;
    alertQueue: string[];
    /** emits the ID of the alert to be closed, and the current alertQueue and currentAlert */
    calciteAlertsClose: EventEmitter;
    /** emits the ID of the alert to be opened, and the current alertQueue and currentAlert */
    calciteAlertsOpen: EventEmitter;
    /** Adds the requested alert to the alert queue, if not present */
    updateQueueOnOpen(event: CustomEvent): void;
    /** Closes the requested alert and removes from the queue, or removes from queue if not active */
    updateQueueOnClose(event: CustomEvent): void;
    componentWillUpdate(): void;
    render(): any;
}
