import {
  SingleBorderToken,
  SingleBoxShadowToken,
  SingleCompositionToken,
  SingleToken,
  SingleTypographyToken,
} from "@tokens-studio/types";

/**
 * Copied from https://github.com/tokens-studio/sd-transforms/blob/main/src/TransformOptions.ts
 * This is needed for correct type setting and is not exported by Token Studio SD Transforms.
 */

export type Expandables = SingleCompositionToken | SingleTypographyToken | SingleBorderToken | SingleBoxShadowToken;

export const expandablesAsStringsArr = ["composition", "typography", "border", "boxShadow"];
export type ExpandablesAsStrings = (typeof expandablesAsStringsArr)[number];

export type ExpandFilter<T extends SingleToken> = (token: T, filePath: string) => boolean;

export interface ExpandOptions {
  typography?: boolean | ExpandFilter<SingleTypographyToken>;
  border?: boolean | ExpandFilter<SingleBorderToken>;
  shadow?: boolean | ExpandFilter<SingleBoxShadowToken>;
  composition?: boolean | ExpandFilter<SingleCompositionToken>;
}

export interface TransformOptions {
  expand?: ExpandOptions | false;
  excludeParentKeys?: boolean;
}
