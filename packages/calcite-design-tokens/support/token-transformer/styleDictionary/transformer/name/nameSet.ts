import { Core as StyleDictionary } from "style-dictionary";

import { setTokenNameByPlatform } from "../../../utils/setTokenNameByPlatform.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const transformNamesSet: CalledTransformerFunction<string> = (token, args) => {
  return token.attributes.platformReference[args.options.platform] || setTokenNameByPlatform(token, args);
};

export const registerNameSet = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: nameSet,
    transformer: transformNamesSet,
    type: "name",
  };

  sd.registerTransform(transformerConfig);
};

export const nameSet = "name/calcite/set";
