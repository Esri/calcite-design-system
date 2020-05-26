export declare class CalciteButton {
    el: HTMLElement;
    /** specify the color of the button, defaults to blue */
    color: "blue" | "dark" | "light" | "red";
    /** specify the appearance style of the button, defaults to solid. */
    appearance: "solid" | "outline" | "clear" | "transparent";
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** specify the scale of the button, defaults to m */
    scale: "s" | "m" | "l";
    /** specify the width of the button, defaults to auto */
    width: "auto" | "half" | "full";
    /** optionally add a calcite-loader component to the button, disabling interaction.  */
    loading?: boolean;
    /** optionally add a round style to the button  */
    round?: boolean;
    /** optionally add a floating style to the button - this should be positioned fixed or sticky */
    floating?: boolean;
    /** optionally pass a href - used to determine if the component should render as a button or an anchor */
    href?: string;
    /** optionally pass an icon to display - accepts Calcite UI icon names  */
    icon?: string;
    /** optionally used with icon, select where to position the icon */
    iconPosition?: "start" | "end";
    /** is the button disabled  */
    disabled?: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillLoad(): void;
    render(): any;
    setFocus(): Promise<void>;
    /** watches for changing text content **/
    private observer;
    /** if button type is present, assign as prop */
    private type?;
    /** the rendered child element */
    private childEl?;
    /** the node type of the rendered child element */
    private childElType?;
    /** determine if there is slotted text for styling purposes */
    private hasText?;
    private updateHasText;
    private setupTextContentObserver;
    private getAttributes;
    private handleClick;
}
