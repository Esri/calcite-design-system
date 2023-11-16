import { Matcher } from "style-dictionary/types/Matcher.js";

import { CalledTransformerFunction, TransformerTypeUnion } from "./transformer/utils.js";
import { CalledFormatterFunction } from "./formatter/utils.js";

// Just a list of all the options. We can pick from them later.
export interface PossibleRegistryArgs<R = any> {
  name?: string;
  type?: TransformerTypeUnion;
  formatter?: CalledFormatterFunction;
  transformer?: CalledTransformerFunction<R>;
  matcher?: Matcher;
}
