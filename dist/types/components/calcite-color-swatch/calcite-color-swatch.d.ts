import { VNode } from "../../stencil-public-runtime";
import { Scale, Theme } from "../../interfaces/common";
export declare class CalciteColorSwatch {
    /**
     * Used to display whether the swatch is active or not.
     */
    active: boolean;
    /**
     * The color value.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
     */
    color: string;
    handleColorChange(color: string): void;
    /**
     * The component scale.
     */
    scale: Exclude<Scale, "xs" | "xl">;
    /**
     * The component's theme.
     */
    theme: Theme;
    private internalColor;
    componentWillLoad(): void;
    render(): VNode;
}
