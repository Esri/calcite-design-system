import { Core as StyleDictionary } from "style-dictionary";
import { camelCase } from "change-case";

import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { parseTokenPath } from "../utils/parseTokenPath.js";

export const transformNamesCamelCase: CalledTransformerFunction<string> = (token, args) => {
  const [tokenPath, hasNegativeKey] = parseTokenPath(token.path);
  let tokenNameInParamCase = camelCase([].concat(args.options?.prefix, tokenPath).join(" "));

  if (hasNegativeKey.length > 0) {
    hasNegativeKey.forEach((originalKey) => {
      const paramCasedKey = originalKey.replaceAll("-", "");
      const updatedToken = tokenNameInParamCase.replace(paramCasedKey, originalKey.replaceAll("-", "_"));
      tokenNameInParamCase = updatedToken;
    });
  }

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
