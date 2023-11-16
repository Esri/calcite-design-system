import { ExpandOptions as TsExpandOptions } from "@tokens-studio/sd-transforms/dist/TransformOptions";

import { ExpandableTokenTypes, SingleToken } from "../tokenTypes/designTokenTypes.js";

export type ExpandOptions = TsExpandOptions & {
  [ExpandableTokenTypes.COLORSCHEME]: boolean;
  [ExpandableTokenTypes.BOXSHADOW]: boolean;
};

export const expand: ExpandOptions = {
  [ExpandableTokenTypes.BORDER]: true,
  [ExpandableTokenTypes.BOXSHADOW]: true,
  [ExpandableTokenTypes.COLORSCHEME]: true,
  [ExpandableTokenTypes.COMPOSITION]: true,
  [ExpandableTokenTypes.TYPOGRAPHY]: true,
};

export type ExpandFilter<T extends SingleToken> = (token: T, filePath: string) => boolean;
