import { EventEmitter, VNode } from "../../stencil-public-runtime";
export declare class CalciteModal {
    el: HTMLElement;
    /** Add the active attribute to open the modal */
    active?: boolean;
    /** Optionally pass a function to run before close */
    beforeClose: (el: HTMLElement) => Promise<void>;
    /** Disables the display a close button within the Modal */
    disableCloseButton?: boolean;
    /** Aria label for the close button */
    intlClose: string;
    /** Prevent the modal from taking up the entire screen on mobile */
    docked: boolean;
    /** Specify an element to focus when the modal is first opened */
    firstFocus?: HTMLElement;
    /** Flag to disable the default close on escape behavior */
    disableEscape?: boolean;
    /** specify the scale of modal, defaults to m */
    scale: "s" | "m" | "l";
    /** Set the width of the modal. Can use stock sizes or pass a number (in pixels) */
    width: "s" | "m" | "l" | number;
    /** Set the modal to always be fullscreen (overrides width) */
    fullscreen: boolean;
    /** Adds a color bar at the top for visual impact,
     * Use color to add importance to destructive/workflow dialogs. */
    color?: "red" | "blue";
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** Background color of modal content */
    backgroundColor: "white" | "grey";
    /** Turn off spacing around the content area slot */
    noPadding?: boolean;
    componentWillLoad(): void;
    render(): any;
    renderCloseButton(): VNode;
    renderStyle(): VNode;
    handleEscape(e: KeyboardEvent): void;
    /** Fired when the modal begins the open animation */
    calciteModalOpen: EventEmitter;
    /** Fired when the modal begins the close animation */
    calciteModalClose: EventEmitter;
    /** Focus first interactive element */
    focusElement(el?: HTMLElement): Promise<void>;
    /** Set the scroll top of the modal content */
    scrollContent(top?: number, left?: number): Promise<void>;
    toggleModal(value: any, oldValue: any): Promise<void>;
    /** Open the modal */
    private open;
    /** Close the modal, first running the `beforeClose` method */
    private close;
    isActive: boolean;
    private previousActiveElement;
    private closeButtonEl;
    private modalContent;
    private focusFirstElement;
    private focusLastElement;
}
