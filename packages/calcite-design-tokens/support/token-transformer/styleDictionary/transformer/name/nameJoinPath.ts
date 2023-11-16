import { Core as StyleDictionary } from "style-dictionary";
import { getJoinedNameFromArray } from "../../../utils/getJoinedNameFromArray.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const transformNamesJoinPath: CalledTransformerFunction<string> = (token) => {
  return getJoinedNameFromArray(token.path);
};

export const registerNameJoinPath = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: nameJoinPath,
    transformer: transformNamesJoinPath,
    type: "name",
  };

  sd.registerTransform(transformerConfig);
};

export const nameJoinPath = "name/calcite/join-path";
