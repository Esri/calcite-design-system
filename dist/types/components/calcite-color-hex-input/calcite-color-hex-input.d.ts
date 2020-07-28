import { EventEmitter, VNode } from "../../stencil-public-runtime";
import Color from "color";
import { Scale, Theme } from "../../interfaces/common";
export declare class CalciteColorHexInput {
    el: HTMLCalciteColorHexInputElement;
    componentWillLoad(): void;
    /**
     * Label used for the hex input.
     */
    intlHex: string;
    /**
     * The component's scale.
     */
    scale: Exclude<Scale, "xs" | "xl">;
    /**
     * The component's theme.
     */
    theme: Theme;
    /**
     * The hex value.
     */
    value: string;
    handleValueChange(value: string, oldValue: string): void;
    /**
     * Emitted when the hex value changes.
     */
    calciteColorHexInputChange: EventEmitter;
    private onCalciteInputBlur;
    private onInputChange;
    private onInputKeyDown;
    private inputNode;
    /**
     * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
     */
    internalColor: Color;
    render(): VNode;
    /** Sets focus on the component. */
    setFocus(): Promise<void>;
    private formatForInternalInput;
}
