import { Matcher } from "style-dictionary/types/Matcher.js";

import {
  CalledTransformerFunction,
  TransformerTypeUnion,
} from "../../token-transformer/styleDictionary/transformer/utils.js";
import { CalledFormatterFunction } from "../../token-transformer/styleDictionary/formatter/utils.js";

export interface PossibleRegistryArgs<R = any> {
  name?: string;
  type?: TransformerTypeUnion;
  formatter?: CalledFormatterFunction;
  transformer?: CalledTransformerFunction<R>;
  matcher?: Matcher;
}

export type RegisterTransformer<R = any> = Pick<PossibleRegistryArgs<R>, "name" | "type" | "transformer" | "matcher">;

export type RegisterFormatter<R = any> = Pick<PossibleRegistryArgs<R>, "formatter" | "name">;

export type RegisterFilter<R = any> = Pick<PossibleRegistryArgs<R>, "matcher" | "name">;
