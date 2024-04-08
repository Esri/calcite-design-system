import { SingleBorderToken, SingleBoxShadowToken, SingleCompositionToken } from "@tokens-studio/types";
import { SingleColorSchemeToken } from "../tokenTypes/colorScheme.js";
import { ExpandableTokenTypes, SingleToken } from "./designTokenTypes.js";
import { SingleTypographyToken } from "../tokenTypes/typography.js";

export type ExpandOptions = {
  [ExpandableTokenTypes.TYPOGRAPHY]?: boolean | SingleTypographyToken;
  [ExpandableTokenTypes.BORDER]?: boolean | ExpandFilter<SingleBorderToken>;
  [ExpandableTokenTypes.SHADOW]?: boolean | ExpandFilter<SingleBoxShadowToken>;
  [ExpandableTokenTypes.COMPOSITION]?: boolean | ExpandFilter<SingleCompositionToken>;
  [ExpandableTokenTypes.COLORSCHEME]?: boolean;
  [ExpandableTokenTypes.BOXSHADOW]?: boolean;
};

export const expand: ExpandOptions = {
  [ExpandableTokenTypes.BORDER]: true,
  [ExpandableTokenTypes.BOXSHADOW]: true,
  [ExpandableTokenTypes.COLORSCHEME]: true,
  [ExpandableTokenTypes.COMPOSITION]: true,
  [ExpandableTokenTypes.TYPOGRAPHY]: true,
} as const;

export type ExpandFilter<T extends SingleToken> = (token: T, filePath: string) => boolean;

// This name comes from @token-studio/sd-transforms
// eslint-disable-next-line @cspell/spellchecker
export type Expandables =
  | SingleCompositionToken
  | SingleTypographyToken
  | SingleBorderToken
  | SingleBoxShadowToken
  | SingleColorSchemeToken;

// This name comes from @token-studio/sd-transforms
// eslint-disable-next-line @cspell/spellchecker
export declare const expandablesAsStringsArr: string[];

// This name comes from @token-studio/sd-transforms
// eslint-disable-next-line @cspell/spellchecker
export type ExpandablesAsStrings = (typeof expandablesAsStringsArr)[number];
export interface TransformOptions {
  expand?: ExpandOptions | false;
  excludeParentKeys?: boolean;
}
