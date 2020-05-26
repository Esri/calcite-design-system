export declare class CalciteLoader {
    el: HTMLElement;
    /** Show the loader */
    isActive: boolean;
    /** Inline loaders are smaller and will appear to the left of the text */
    inline: boolean;
    /** Use indeterminate if finding actual progress value is impossible */
    type: "indeterminate" | "determinate";
    /** Percent complete of 100, only valid for determinate indicators */
    value: number;
    /** Text which should appear under the loading indicator (optional) */
    text: string;
    /** Turn off spacing around the loader */
    noPadding?: boolean;
    render(): any;
    /** @internal */
    private guid;
}
