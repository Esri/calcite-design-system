export declare class CalciteProgress {
    el: HTMLElement;
    /** Use indeterminate if finding actual progress value is impossible */
    type: "indeterminate" | "determinate";
    /** Fraction completed, in the range of 0 - 1.0 */
    value: number;
    /** Text label for the progress indicator */
    text: string;
    /** For indeterminate progress bars, reverse the animation direction */
    reversed: boolean;
    /** Select theme (light or dark) */
    theme: "light" | "dark";
    render(): any;
}
