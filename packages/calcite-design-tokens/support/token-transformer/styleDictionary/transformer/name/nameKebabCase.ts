import { Core as StyleDictionary } from "style-dictionary";
import { paramCase } from "change-case";

import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { parseTokenPath } from "../utils/parseTokenPath.js";

export const transformNamesKebabCase: CalledTransformerFunction<string> = (token, args) => {
  const tokenPath = parseTokenPath(token.path);
  const tokenNameInParamCase = paramCase([].concat(args.options?.prefix, tokenPath).join(" "));

  return tokenNameInParamCase;
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
