export declare class CalciteLink {
    el: HTMLElement;
    /** specify the color of the link, defaults to blue */
    color: "blue" | "dark" | "light" | "red";
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** optionally pass a href - used to determine if the component should render as a link or an anchor */
    href?: string;
    /** optionally pass an icon to display - accepts Calcite UI icon names  */
    icon?: string;
    /** optionally used with icon, select where to position the icon */
    iconPosition?: "start" | "end";
    /** is the link disabled  */
    disabled?: boolean;
    connectedCallback(): void;
    render(): any;
    setFocus(): Promise<void>;
    /** the rendered child element */
    private childEl?;
    /** the node type of the rendered child element */
    private childElType?;
    private getAttributes;
}
