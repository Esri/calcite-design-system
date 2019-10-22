import { EventEmitter } from "../../stencil.core";
/** Alerts are not meant to be used inline with content, or be present in view on page load.
 * As such, calcite-alert relies on calcite-alerts for positioning - displaying an alert on its own
 * will lead to unexpected and potentially undesireable results
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
    dismiss: boolean;
    /** Length before autodismissal (only used with `dismiss`) */
    duration: "fast" | "medium" | "slow";
    /** Color for the alert (will apply to top border and icon) */
    color: "blue" | "green" | "red" | "yellow";
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** If false, no icon will be shown in the alert */
    icon: boolean;
    /** Unique ID for this alert */
    /** @internal */
    alertId: string;
    /** @internal */
    currentAlert: string;
    /** @internal */
    queueLength: number;
    /** watch for changes to currentAlert passed from <calcite-alerts> */
    watchCurrentAlert(): void;
    /** Fired when an alert is closed */
    calciteAlertClose: EventEmitter;
    /** Fired when an alert is opened */
    calciteAlertOpen: EventEmitter;
    /** emit the `calciteAlertClose` event - <calcite-alerts> listens for this */
    closeCalciteAlert(): Promise<void>;
    /**  emit the `calciteAlertOpen` event - <calcite-alerts> listens for this  */
    openCalciteAlert(): Promise<void>;
    private durationDefaults;
    private iconDefaults;
    connectedCallback(): void;
    setIcon(): any;
    render(): any;
}
