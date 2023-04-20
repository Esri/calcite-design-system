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

export const expandablesAsStringsArr = ['composition', 'typography', 'border', 'boxShadow'];
export type ExpandablesAsStrings = (typeof expandablesAsStringsArr)[number];

export type ExpandFilter<T extends SingleToken> = (token: T, filePath: string) => boolean;

export interface ExpandOptions {
  typography?: boolean | ExpandFilter<SingleTypographyToken>; // default false
  border?: boolean | ExpandFilter<SingleBorderToken>; // default false
  shadow?: boolean | ExpandFilter<SingleBoxShadowToken>; // default false
  composition?: boolean | ExpandFilter<SingleCompositionToken>; // default true
}

export interface TransformOptions {
  expand?: ExpandOptions | false;
  excludeParentKeys?: boolean;
}
