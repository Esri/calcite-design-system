// This file exists because these types were not exported by Style Dictionary but types need to match.

import {
  SingleBorderToken,
  SingleBoxShadowToken,
  SingleCompositionToken,
  SingleToken,
  SingleTypographyToken,
} from '@tokens-studio/types';

export type Expandables =
  | SingleCompositionToken
  | SingleTypographyToken
  | SingleBorderToken
  | SingleBoxShadowToken;

export const expandablesAsStrings = ['composition', 'typography', 'border', 'boxShadow'] as const;
export type ExpandablesAsStrings = typeof expandablesAsStrings[number];

export type ExpandFilter<T extends SingleToken> = (token: T, filePath: string) => boolean;

/**
 * @param {boolean} [typography=false]
 * @param {boolean} [border=false]
 * @param {boolean} [shadow=false]
 * @param {boolean} [composition=true]
 */
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
