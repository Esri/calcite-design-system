import { ColorValue, RGB } from "../../interfaces/Color";
import Color from "color";
export declare function rgbToHex(color: RGB): string;
export declare const hexChar: RegExp;
export declare function isValidHex(hex: string): boolean;
export declare function isShorthandHex(hex: string): boolean;
export declare function isLonghandHex(hex: string): boolean;
export declare function normalizeHex(hex: string): string;
export declare function hexToRGB(hex: string): RGB;
export declare enum CSSColorMode {
    HEX = "hex",
    HEXA = "hexa",
    RGB_CSS = "rgb-css",
    RGBA_CSS = "rgba-css",
    HSL_CSS = "hsl-css",
    HSLA_CSS = "hsla-css"
}
export declare enum ObjectColorMode {
    RGB = "rgb",
    RGBA = "rgba",
    HSL = "hsl",
    HSLA = "hsla",
    HSV = "hsv",
    HSVA = "hsva"
}
export declare type SupportedMode = CSSColorMode | ObjectColorMode;
export declare function parseMode(colorValue: ColorValue): SupportedMode | null;
export declare function colorEqual(value1: Color, value2: Color): boolean;
export declare function colorValueEqual(value1: ColorValue, value2: ColorValue, mode: SupportedMode): boolean;
