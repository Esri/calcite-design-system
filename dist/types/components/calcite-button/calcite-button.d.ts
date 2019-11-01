export declare class CalciteButton {
    el: HTMLElement;
    /** specify the color of the button, defaults to blue */
    color: "blue" | "dark" | "light" | "red";
    /** specify the appearance style of the button, defaults to solid. Specifying "inline" will render the component as an anchor */
    appearance: "solid" | "outline" | "clear" | "inline";
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** specify the scale of the button, defaults to m */
    scale: "xs" | "s" | "m" | "l" | "xl";
    /** specify the width of the button, defaults to auto */
    width: "auto" | "half" | "full";
    /** optionally add a calcite-loader component to the button, disabling interaction.  */
    loading?: boolean;
    /** optionally pass a href - used to determine if the component should render as a button or an anchor */
    href?: string;
    /** optionally pass icon path data - pass only raw path data from calcite ui helper  */
    icon?: string;
    /** optionally used with icon, select where to position the icon */
    iconposition?: "start" | "end";
    /** is the button disabled  */
    disabled?: boolean;
    /** @internal */
    /** hastext prop for spacing icon when text is present in slot */
    hasText: boolean;
    /** @internal */
    /** keep track of the rendered child type -  */
    childEl?: "a" | "span" | "button";
    connectedCallback(): void;
    componentWillLoad(): void;
    render(): any;
    /** @internal */
    /** if button type is present, assign as prop */
    private type?;
    private getAttributes;
    private handleClick;
}
