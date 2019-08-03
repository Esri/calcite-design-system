export declare class CalciteButton {
    el: HTMLElement;
    /** specify the color of the button, defaults to blue */
    color: "blue" | "dark" | "light" | "red";
    /** specify the appearance style of the button, defaults to solid. Specifying "inline" will render the component as an anchor */
    appearance: "solid" | "outline" | "clear" | "inline";
    /** specify the scale of the button, defaults to m */
    scale: "xs" | "s" | "m" | "l" | "xl";
    /** specify the width of the button, defaults to auto */
    width: "auto" | "half" | "full";
    /** optionally add a calcite-loader component inline to indicate loading is occuring. You can add and remove this prop depending on status  */
    loading?: boolean;
    /** optionally pass a href - used to determine if the component should render as a button or an anchor */
    href?: string;
    /** optionally pass icon path data to be positioned within the button - pass only raw path data from calcite ui helper  */
    icon?: string;
    /**
     * @internal
     */
    hastext: boolean;
    connectedCallback(): void;
    componentDidLoad(): void;
    getAttributes(): {};
    render(): any;
}
