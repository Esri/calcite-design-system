import { Core as StyleDictionary } from "style-dictionary";

import { getCamelCaseFromArray } from "../../../utils/getCamelCaseFromArray.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const transformNamesCamelCase: CalledTransformerFunction<string> = (token, args) => {
  return getCamelCaseFromArray(token.path, args.options.prefix);
};

export const registerNameCamelCase = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: nameCamelCase,
    transformer: transformNamesCamelCase,
    type: "name",
  };

  sd.registerTransform(transformerConfig);
};

export const nameCamelCase = "name/calcite/camel-case";
