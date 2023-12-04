export enum ColorModifierFormat {
  HEX = "hex",
  HSL = "hsl",
  LCH = "lch",
  P3 = "p3",
  SRGB = "srgb",
}

export type ColorModifierFormatUnion = `${ColorModifierFormat}`;

export interface ColorModifierOptions {
  format: ColorModifierFormatUnion;
}
