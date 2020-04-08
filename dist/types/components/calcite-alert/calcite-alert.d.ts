import { EventEmitter } from "../../stencil-public-runtime";
/** Alerts are meant to provide a way to communicate urgent or important information to users, frequently as a result of an action they took in your app. Alerts are positioned
 * at the bottom of the page. Multiple opened alerts will be added to a queue, allowing users to dismiss them in the order they are provided. You can keep alerts in your DOM or create/open, close/destroy
 * as needed.
 */
/**
 * @slot alert-title - Title of the alert (optional)
 * @slot alert-message - Main text of the alert
 * @slot alert-link - Optional action to take from the alert (undo, try again, link to page, etc.)
 */
export declare class CalciteAlert {
    el: HTMLElement;
    /** Is the alert currently active or not */
    active: boolean;
    /** Close the alert automatically (recommended for passive, non-blocking alerts) */
    autoDismiss: boolean;
    /** Duration of autoDismiss (only used with `autoDismiss`) */
    autoDismissDuration: "fast" | "medium" | "slow";
    /** Color for the alert (will apply to top border and icon) */
    color: "blue" | "green" | "red" | "yellow";
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** specify the scale of the button, defaults to m */
    scale: "s" | "m" | "l";
    /** specify if the alert should display an icon */
    icon: boolean;
    alertOpen(event: CustomEvent): void;
    alertClose(event: CustomEvent): void;
    alertRegister(event: CustomEvent): void;
    connectedCallback(): void;
    componentDidLoad(): void;
    render(): any;
    /** Fired when an alert is closed */
    calciteAlertClose: EventEmitter;
    /** Fired when an alert is opened */
    calciteAlertOpen: EventEmitter;
    /** Fired when an alert is opened */
    calciteAlertSync: EventEmitter;
    /** open alert and emit the opened alert  */
    open(): Promise<void>;
    /** close alert and emit the closed alert */
    close(): Promise<void>;
    /** focus the close button, if present and requested */
    setFocus(): Promise<void>;
    /** a managed list of alerts */
    alertQueue: string[];
    /** a managed list of alerts */
    alertQueueLength: number;
    /** the determined current alert */
    currentAlert: string;
    /** Unique ID for this alert */
    private alertId;
    /** the close button element */
    private closeButton?;
    /** the alert link child element  */
    private alertLinkEl?;
    /** map dismissal durations */
    private autoDismissDurations;
    /** based on the current alert determine which alert is active */
    private determineActiveAlert;
    private iconDefaults;
    private setIcon;
}
