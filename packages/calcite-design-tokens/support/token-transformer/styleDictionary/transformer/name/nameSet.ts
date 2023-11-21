import { Core as StyleDictionary } from "style-dictionary";

import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { transformNamesKebabCase } from "./nameKebabCase.js";
import { transformNamesCamelCase } from "./nameCamelCase.js";
import { transformNamesJoinPath } from "./nameJoinPath.js";
import { createTokenReference } from "../../formatter/utils/createTokenReference.js";
import { Platform } from "../../../../types/platform.js";

export const transformNamesSet: CalledTransformerFunction<string> = (token, args) => {
  const {
    options: { platform },
  } = args;
  const t = {
    ...token,
    name: ["css", "scss", "sass"].includes(platform)
      ? transformNamesKebabCase(token, args)
      : transformNamesCamelCase(token, args),
  };
  return platform === Platform.JS ? transformNamesJoinPath(token, args) : createTokenReference(t, args);
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
