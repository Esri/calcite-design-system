import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteSplitButton {
    el: HTMLElement;
    /** specify the color of the control, defaults to blue */
    color: "blue" | "dark" | "light" | "red";
    /** select theme (light or dark), defaults to light */
    theme: "light" | "dark";
    /** specify the scale of the control, defaults to m */
    scale: "s" | "m" | "l";
    /** specify the icon used for the dropdown menu, defaults to chevron */
    dropdownIconType: "chevron" | "caret" | "ellipsis" | "overflow";
    /** text for primary action button  */
    primaryText: string;
    /** optionally pass an icon to display at the start of the primary button - accepts Calcite UI icon names  */
    primaryIconStart?: string;
    /** optionally pass an icon to display at the end of the primary button - accepts Calcite UI icon names  */
    primaryIconEnd?: string;
    /** optionally pass an aria-label for the primary button */
    primaryLabel?: string;
    /** aria label for overflow button */
    dropdownLabel?: string;
    /** optionally add a calcite-loader component to the control,
      disabling interaction. with the primary button */
    loading?: boolean;
    /** is the control disabled  */
    disabled?: boolean;
    /** fired when the primary button is clicked */
    calciteSplitButtonPrimaryClick: EventEmitter;
    validateColor(): void;
    validateScale(): void;
    validateTheme(): void;
    validateDropdownIconType(): void;
    connectedCallback(): void;
    render(): any;
    private calciteSplitButtonPrimaryClickHandler;
    private get dropdownIcon();
}
