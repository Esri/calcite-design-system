/* eslint @cspell/spellchecker: 0 */
import {
  SingleBorderRadiusToken,
  SingleFontFamiliesToken,
  SingleBoxShadowToken,
  SingleTextToken,
  SingleBorderWidthToken,
  SingleFontWeightsToken,
  SingleLineHeightsToken,
  SingleLetterSpacingToken,
  SingleFontSizesToken,
  SingleOpacityToken,
  SingleParagraphSpacingToken,
  SingleAssetToken,
  SingleSizingToken,
  SingleDimensionToken,
  SingleCompositionToken,
  SingleBorderToken,
  SingleOtherToken,
  SingleSpacingToken,
  SingleTextCaseToken,
  SingleTextDecorationToken,
  SingleColorToken,
} from "@tokens-studio/types";

import { SingleColorSchemeToken } from "../tokenTypes/colorScheme.js";
import { SingleTypographyToken } from "../tokenTypes/typography.js";

export enum BaseTokenTypes {
  ASSET = "asset",
  BORDERRADIUS = "borderRadius",
  BORDERSTYLE = "borderStyle",
  BORDERWIDTH = "borderWidth",
  COLOR = "color",
  DIMENSION = "dimension",
  FONTFAMILY = "fontFamilies",
  FONTSIZE = "fontSizes",
  FONTSTYLE = "fontStyles",
  FONTWEIGHT = "fontWeights",
  LETTERSPACING = "letterSpacing",
  LINEHEIGHT = "lineHeights",
  OPACITY = "opacity",
  OTHER = "other",
  PARAGRAPHSPACING = "paragraphSpacing",
  SIZING = "sizing",
  SPACING = "spacing",
  STACKING = "stacking",
  TEXT = "text",
  TEXTCASE = "textCase",
  TEXTDECORATION = "textDecoration",
}

export enum ExpandableTokenTypes {
  BORDER = "border",
  BOXSHADOW = "boxShadow",
  SHADOW = "shadow",
  COLORSCHEME = "colorScheme",
  COMPOSITION = "composition",
  TYPOGRAPHY = "typography",
  BREAKPOINT = "breakpoint",
}
export type ExpandableTokenTypesUnion = `${ExpandableTokenTypes}`;
export type BaseTokenTypesUnion = `${BaseTokenTypes}`;

export type TokenTypes = BaseTokenTypesUnion | ExpandableTokenTypesUnion;

export type SingleExpandableToken<Named extends boolean = true, P = unknown> =
  | SingleColorSchemeToken<Named, P>
  | SingleTypographyToken<Named, P>
  | SingleBoxShadowToken<Named, P>
  | SingleBorderToken<Named, P>
  | SingleCompositionToken<Named, P>;

export type SingleBaseToken<Named extends boolean = true, P = unknown> =
  | SingleColorToken<Named, P>
  | SingleBorderRadiusToken<Named, P>
  | SingleTextToken<Named, P>
  | SingleOpacityToken<Named, P>
  | SingleBorderWidthToken<Named, P>
  | SingleFontFamiliesToken<Named, P>
  | SingleFontWeightsToken<Named, P>
  | SingleLineHeightsToken<Named, P>
  | SingleLetterSpacingToken<Named, P>
  | SingleFontSizesToken<Named, P>
  | SingleParagraphSpacingToken<Named, P>
  | SingleTextDecorationToken<Named, P>
  | SingleTextCaseToken<Named, P>
  | SingleSpacingToken<Named, P>
  | SingleOtherToken<Named, P>
  | SingleDimensionToken<Named, P>
  | SingleSizingToken<Named, P>
  | SingleAssetToken<Named, P>;

export type SingleToken<Named extends boolean = true, P = unknown> =
  | SingleBaseToken<Named, P>
  | SingleExpandableToken<Named, P>;

export interface DeepKeyTokenMap<Named extends boolean = true> {
  [key: string]: DeepKeyTokenMap<Named> | SingleToken<Named>;
}

export type TokenTypesObject<T> = { [Type in TokenTypes]?: T };
