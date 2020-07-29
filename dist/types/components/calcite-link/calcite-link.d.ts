export declare class CalciteLink {
    el: HTMLElement;
    /** specify the color of the link, defaults to blue */
    color: "blue" | "dark" | "light" | "red";
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    /** optionally pass a href - used to determine if the component should render as a link or an anchor */
    href?: string;
    /** optionally pass an icon to display at the start of a button - accepts calcite ui icon names  */
    iconStart?: string;
    /** optionally pass an icon to display at the end of a button - accepts calcite ui icon names  */
    iconEnd?: string;
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
