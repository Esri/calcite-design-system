import { Core as StyleDictionary } from "style-dictionary";

import { getKebabCaseFromArray } from "../../../utils/getKebabCaseFromArray.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const transformNamesKebabCase: CalledTransformerFunction<string> = (token, args) => {
  return getKebabCaseFromArray(token.path, args.options.prefix);
};

export const registerNameKebabCase = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: nameKebabCase,
    transformer: transformNamesKebabCase,
    type: "name",
  };

  sd.registerTransform(transformerConfig);
};

export const nameKebabCase = "name/calcite/kebab-case";
