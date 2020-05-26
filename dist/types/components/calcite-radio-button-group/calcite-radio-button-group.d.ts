export declare class CalciteRadioButtonGroup {
    el: HTMLElement;
    /** The disabled state of the radio button group. */
    disabled: boolean;
    onDisabledChange(): void;
    /** The radio button group's hidden status.  When a radio button group is hidden none of its options are focusable or checkable. */
    hidden: boolean;
    onHiddenChange(): void;
    /** The layout direction of the radio buttons in a group. */
    layout: "horizontal" | "vertical";
    validateLayout(newLayout: string): void;
    /** The name of the radio button group. <code>name</code> must be unique to other radio button group instances. */
    name: string;
    /** Requires that a value is selected for the radio button group before the parent form will submit. */
    required: boolean;
    /** The scale (size) of the radio button group. */
    scale: "s" | "m" | "l";
    validateScale(newScale: string): void;
    /** The color theme of the radio button group. */
    theme: "light" | "dark";
    validateTheme(newTheme: string): void;
    componentWillLoad(): void;
    private passPropsToRadioButtons;
    render(): any;
}
