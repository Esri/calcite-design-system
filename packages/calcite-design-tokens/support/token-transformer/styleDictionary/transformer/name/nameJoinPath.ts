import { Core as StyleDictionary } from "style-dictionary";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const transformNamesJoinPath: CalledTransformerFunction<string> = (token, args) => {
  return `${[]
    .concat(args.options?.prefix, token.path)
    .filter((p) => p)
    .join(".")}`;
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
