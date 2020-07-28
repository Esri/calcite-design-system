export declare class CalciteLoader {
    el: HTMLElement;
    /** Show the loader */
    active: boolean;
    /** Inline loaders are smaller and will appear to the left of the text */
    inline: boolean;
    /** Speficy the scale of the loader. Defaults to "m" */
    scale: "s" | "m" | "l";
    /** Use indeterminate if finding actual progress value is impossible */
    type: "indeterminate" | "determinate";
    /** Percent complete of 100, only valid for determinate indicators */
    value: number;
    /** Text which should appear under the loading indicator (optional) */
    text: string;
    /** Turn off spacing around the loader */
    noPadding?: boolean;
    connectedCallback(): void;
    render(): any;
    /**
     * Return the proper sizes based on the scale property
     */
    private getSize;
    private getInlineSize;
}
