import { TokenTypes } from "./designTokenTypes.js";
import { TokenStudioExtensionsMap } from "./tokenExtensionsTokenStudio.js";
import { CalciteExtensionsMap } from "./tokenExtensionsCalcite.js";

export type SingleGenericToken<T extends TokenTypes, V = string | number, Named extends boolean = true, P = unknown> = {
  type: T;
  value: V;
  rawValue?: V;
  description?: string;
  oldDescription?: string;
  oldValue?: V;
  internal__Parent?: string;
  inheritTypeLevel?: number;
  $extensions?: TokenStudioExtensionsMap & CalciteExtensionsMap;
} & (Named extends true
  ? {
      name: string;
    }
  : {
      name?: string;
    }) &
  P;
