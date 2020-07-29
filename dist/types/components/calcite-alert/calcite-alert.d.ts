import { EventEmitter } from "../../stencil-public-runtime";
/** Alerts are meant to provide a way to communicate urgent or important information to users, frequently as a result of an action they took in your app. Alerts are positioned
 * at the bottom of the page. Multiple opened alerts will be added to a queue, allowing users to dismiss them in the order they are provided.
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
    /** string to override English close text */
    intlClose: string;
    connectedCallback(): void;
    componentDidLoad(): void;
    watchActive(): void;
    render(): any;
    /** Fired when an alert is closed */
    calciteAlertClose: EventEmitter;
    /** Fired when an alert is opened */
    calciteAlertOpen: EventEmitter;
    /** Fired to sync queue when opened or closed */
    calciteAlertSync: EventEmitter;
    /** Fired when an alert is added to dom - used to receive initial queue */
    calciteAlertRegister: EventEmitter;
    /** focus either the slotted alert-link or the close button */
    setFocus(): Promise<void>;
    /** the list of queued alerts */
    queue: HTMLCalciteAlertElement[];
    /** the count of queued alerts */
    queueLength: number;
    /** is the alert queued */
    queued: boolean;
    /** the close button element */
    private closeButton?;
    /** the slotted alert link child element  */
    private alertLinkEl?;
    /** map dismissal durations */
    private autoDismissDurations;
    /** map icon strings */
    private iconDefaults;
    alertSync(event: CustomEvent): void;
    alertRegister(): void;
    /** emit the opened alert and the queue */
    private openAlert;
    /** close and emit the closed alert and the queue */
    private closeAlert;
    /** determine which alert is active */
    private determineActiveAlert;
    private setIcon;
}
