import { EventEmitter } from "../../stencil.core";
export declare class CalciteAlerts {
    el: HTMLElement;
    /**
     * Unique ID for this instance of calcite-alerts
     */
    id: string;
    currentAlert: string;
    active: boolean;
    alertQueue: string[];
    /**
     * @todo document what gets passed to the handler for these events
     */
    calciteAlertsClose: EventEmitter;
    calciteAlertsOpen: EventEmitter;
    /**
     * Adds the requested alert to the alert queue, if not present
     */
    updateQueueOnOpen(event: CustomEvent): void;
    /**
     * Closes the requested alert and removes from the queue
     */
    updateQueueOnClose(event: CustomEvent): void;
    componentWillUpdate(): void;
    render(): any;
}
