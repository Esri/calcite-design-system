import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteModal {
    el: HTMLElement;
    /** Optionally pass a function to run before close */
    beforeClose: (el: HTMLElement) => Promise<void>;
    /** Aria label for the close button */
    closeLabel: string;
    /** Prevent the modal from taking up the entire screen on mobile */
    docked: boolean;
    /** Specify an element to focus when the modal is first opened */
    firstFocus?: HTMLElement;
    /** Flag to disable the default close on escape behavior */
    disableEscape?: boolean;
    /** Set the overall size of the modal */
    size: "small" | "medium" | "large" | "fullscreen";
    /** Adds a color bar at the top for visual impact,
     * Use color to add importance to desctructive/workflow dialogs. */
    color?: "red" | "blue";
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** Turn off spacing around the content area slot */
    noPadding?: boolean;
    render(): any;
    handleEscape(e: KeyboardEvent): void;
    /** Fired when the modal begins the open animation */
    calciteModalOpen: EventEmitter;
    /** Fired when the modal begins the close animation */
    calciteModalClose: EventEmitter;
    /** Open the modal */
    open(): Promise<HTMLElement>;
    /** Close the modal, first running the `beforeClose` method */
    close(): Promise<HTMLElement>;
    /** Focus first interactive element */
    focusElement(el?: HTMLElement): Promise<void>;
    /** Set the scroll top of the modal content */
    scrollContent(top?: number, left?: number): Promise<void>;
    isActive: boolean;
    private previousActiveElement;
    private closeButton;
    private modalContent;
    private focusFirstElement;
    private focusLastElement;
}
