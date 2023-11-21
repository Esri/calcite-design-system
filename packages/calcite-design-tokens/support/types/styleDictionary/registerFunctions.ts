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

export interface RegisterTransformer<R = any>
  extends Pick<PossibleRegistryArgs<R>, "name" | "type" | "transformer" | "matcher"> {}

export interface RegisterFormatter<R = any> extends Pick<PossibleRegistryArgs<R>, "formatter" | "name"> {}

export interface RegisterFilter<R = any> extends Pick<PossibleRegistryArgs<R>, "matcher" | "name"> {}
