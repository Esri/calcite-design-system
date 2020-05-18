import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteLabel {
    el: HTMLElement;
    /** specify the status of the label and any child input / input messages */
    status: "invalid" | "valid" | "idle";
    /** specify the scale of the input, defaults to m */
    scale: "s" | "m" | "l";
    /** specify theme of the label and its any child input / input messages */
    theme: "light" | "dark";
    /** is the wrapped element positioned inline with the label slotted text */
    layout: "inline" | "inline-space-between" | "default";
    connectedCallback(): void;
    componentDidLoad(): void;
    render(): any;
    private slottedContent;
    handleClick(e: any): void;
    calciteLabelSelectedEvent: EventEmitter;
    /** the input requested with the for attribute */
    private requestedInputId;
    /** the slotted content after it has been interpreted */
    private displayedSlottedContent;
    private focusChildEl;
    private handleSlottedContent;
    private emitSelectedItem;
    private getAttributes;
}
