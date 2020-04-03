export declare class CalciteProgress {
    el: HTMLElement;
    /** Use indeterminate if finding actual progress value is impossible */
    type: "indeterminate" | "determinate";
    /** Percent complete of 100 */
    value: number;
    /** Text label for the progress indicator */
    text: string;
    /** Fill bar in the opposite direction */
    reversed: boolean;
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    render(): any;
}
