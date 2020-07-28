import type Color from "color";
export declare type ColorMode = "rgb" | "hsv";
export declare type InternalColor = Color;
export declare type ColorValue = string | RGB | RGBA | HSV | HSVA | HSL | HSLA;
export interface RGB {
    r: number;
    g: number;
    b: number;
}
export declare type RGBA = RGB & ObjectWithAlpha;
interface ObjectWithAlpha {
    a: number;
}
export interface HSV {
    h: number;
    s: number;
    v: number;
}
export declare type HSVA = HSV & ObjectWithAlpha;
export interface HSL {
    h: number;
    s: number;
    l: number;
}
export declare type HSLA = HSL & ObjectWithAlpha;
export {};
