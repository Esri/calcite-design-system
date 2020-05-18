export declare class CalciteInputMessage {
    el: HTMLElement;
    active: boolean;
    /** specify the appearance type - minimal or default */
    appearance: "default" | "minimal";
    /** optionally display an icon based on status */
    icon: boolean;
    /** specify the scale of the input, defaults to m */
    scale: "s" | "m" | "l";
    /** specify the status of the input field, determines message and icons */
    status: "invalid" | "valid" | "idle";
    /** specify the theme, defaults to light */
    theme: "light" | "dark";
    /** specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) */
    type: "default" | "floating";
    connectedCallback(): void;
    componentWillUpdate(): void;
    render(): any;
    private iconDefaults;
    private iconEl;
    private setIcon;
}
