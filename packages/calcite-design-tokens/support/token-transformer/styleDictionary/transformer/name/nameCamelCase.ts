import { Core as StyleDictionary } from "style-dictionary";
import { camelCase } from "change-case";

import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { parseTokenPath } from "../utils/parseTokenPath.js";

export const transformNamesCamelCase: CalledTransformerFunction<string> = (token, args) => {
  const tokenPath = parseTokenPath(token.path);
  let tokenNameInParamCase = camelCase([].concat(args.options?.prefix, tokenPath).join(" "));
  tokenNameInParamCase = tokenNameInParamCase.replaceAll("_", "");

  return tokenNameInParamCase;
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
