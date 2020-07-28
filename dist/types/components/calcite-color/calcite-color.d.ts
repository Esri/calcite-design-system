import { EventEmitter, VNode } from "../../stencil-public-runtime";
import Color from "color";
import { ColorMode, ColorValue, InternalColor } from "../../interfaces/Color";
import { Scale, Theme } from "../../interfaces/common";
export declare class CalciteColor {
    el: HTMLDivElement;
    /**
     * Internal prop for advanced use-cases.
     *
     * @internal
     */
    color: InternalColor;
    handleColorChange(color: Color): void;
    /** Label used for the blue channel */
    intlB: string;
    /** Label used for the blue channel description */
    intlBlue: string;
    /** Label used for the delete color button. */
    intlDeleteColor: string;
    /** Label used for the green channel */
    intlG: string;
    /** Label used for the green channel description */
    intlGreen: string;
    /** Label used for the hue channel */
    intlH: string;
    /** Label used for the HSV mode */
    intlHsv: string;
    /** Label used for the hex input */
    intlHex: string;
    /** Label used for the hue channel description */
    intlHue: string;
    /** Label used for the red channel */
    intlR: string;
    /** Label used for the red channel description */
    intlRed: string;
    /** Label used for the RGB mode */
    intlRgb: string;
    /** Label used for the saturation channel */
    intlS: string;
    /** Label used for the saturation channel description */
    intlSaturation: string;
    /** Label used for the save color button. */
    intlSaveColor: string;
    /** Label used for the saved colors section */
    intlSaved: string;
    /** Label used for the value channel */
    intlV: string;
    /** Label used for the  */
    intlValue: string;
    /**
     * The scale of the color picker.
     */
    scale: Exclude<Scale, "xs" | "xl">;
    handleScaleChange(scale?: Exclude<Scale, "xs" | "xl">): void;
    /**
     * Storage ID for colors.
     */
    storageId: string;
    /**
     * The component's theme.
     */
    theme: Theme;
    /**
     * The color value.
     *
     * This value can be either a {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color|CSS string}
     * a RGB, HSL or HSV object.
     *
     * The type will be preserved as the color is updated.
     */
    value: ColorValue;
    handleValueChange(value: ColorValue, oldValue: ColorValue): void;
    private fieldAndSliderRenderingContext;
    private hexInputNode;
    private hueThumbState;
    private mode;
    private sliderThumbState;
    colorFieldAndSliderInteractive: boolean;
    channelMode: ColorMode;
    channels: [number, number, number];
    dimensions: {
        slider: {
            height: number;
            width: number;
        };
        colorField: {
            height: number;
            width: number;
        };
        thumb: {
            radius: number;
        }; /** Label used for the blue channel description */
    };
    savedColors: string[];
    calciteColorChange: EventEmitter;
    private handleTabActivate;
    private handleHexInputChange;
    private handleSavedColorSelect;
    private handleChannelInput;
    private handleChannelChange;
    private handleSavedColorKeyDown;
    private handleColorFieldAndSliderMouseLeave;
    private handleColorFieldAndSliderMouseEnterOrMove;
    /** Sets focus on the component. */
    setFocus(): Promise<void>;
    componentWillLoad(): void;
    render(): VNode;
    private renderChannelsTabTitle;
    private renderChannelsTab;
    private renderChannel;
    private toValue;
    private getSliderCapSpacing;
    private updateDimensions;
    private deleteColor;
    private saveColor;
    private drawColorFieldAndSlider;
    private drawColorField;
    private setCanvasContextSize;
    private initColorFieldAndSlider;
    private containsPoint;
    private drawActiveColorFieldColor;
    private drawThumb;
    private drawActiveHueSliderColor;
    private drawHueSlider;
    private updateColorFromChannels;
    private updateChannelsFromColor;
    private toChannels;
}
