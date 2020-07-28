import { EventEmitter } from "../../stencil-public-runtime";
/** Notices are intended to be used to present users with important-but-not-crucial contextual tips or copy. Because
 * notices are displayed inline, a common use case is displaying them on page-load to present users with short hints or contextual copy.
 * They are optionally dismissible - useful for keeping track of whether or not a user has dismissed the notice. You can also choose not
 * to display a notice on page load and set the "active" attribute as needed to contextually provide inline messaging to users.
 */
/**
 * @slot notice-title - Title of the notice (optional)
 * @slot notice-message - Main text of the notice
 * @slot notice-link - Optional action to take from the notice (undo, try again, link to page, etc.)
 */
export declare class CalciteNotice {
    el: HTMLCalciteNoticeElement;
    /** Is the notice currently active or not */
    active: boolean;
    /** Color for the notice (will apply to top border and icon) */
    color: "blue" | "green" | "red" | "yellow";
    /** String for the close button. */
    intlClose: string;
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** specify the scale of the notice, defaults to m */
    scale: "s" | "m" | "l";
    /** specify the width of the notice, defaults to m */
    width: "auto" | "half" | "full";
    /** Optionally show a button the user can click to dismiss the notice */
    dismissible?: boolean;
    /** If false, no icon will be shown in the notice */
    icon: boolean;
    connectedCallback(): void;
    componentDidLoad(): void;
    render(): any;
    /** Fired when an notice is closed */
    calciteNoticeClose: EventEmitter;
    /** Fired when an Notice is opened */
    calciteNoticeOpen: EventEmitter;
    /** close the notice emit the `calciteNoticeClose` event - <calcite-notice> listens for this */
    close(): Promise<void>;
    /** open the notice and emit the `calciteNoticeOpen` event - <calcite-notice> listens for this  */
    open(): Promise<void>;
    /** focus the close button, if present and requested */
    setFocus(): Promise<void>;
    /** the close button element */
    private closeButton?;
    /** the notice link child element  */
    private noticeLinkEl?;
    private iconDefaults;
    private setIcon;
}
