import { TokenTypographyValue as TsTokenTypographyValue } from "@tokens-studio/types";
import { SingleGenericToken } from "./genericToken.js";
import { ExpandableTokenTypes } from "./designTokenTypes.js";

export type TokenTypographyValue = TsTokenTypographyValue & { fontStyle?: string };

export type SingleTypographyToken<Named extends boolean = false, P = unknown> = SingleGenericToken<
  ExpandableTokenTypes.TYPOGRAPHY,
  TokenTypographyValue | string,
  Named,
  P
>;
