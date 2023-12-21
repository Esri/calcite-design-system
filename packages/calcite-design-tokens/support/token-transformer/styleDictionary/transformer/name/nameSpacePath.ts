import { Core as StyleDictionary } from "style-dictionary";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { parseTokenPath } from "../utils/parseTokenPath.js";
import { capitalCase } from "change-case";

export const transformNamesSpacePath: CalledTransformerFunction<string> = (token, args) => {
  const tokenPath = parseTokenPath(
    [].concat(args.options?.prefix, token.path).filter((p) => p && p !== args?.options?.prefix),
  );
  let name = capitalCase(tokenPath.join(" "));

  name = name.replaceAll(/Minus\s?/g, "-");
  name = name.replaceAll(/Plus\s?/g, "+");

  return name;
};

export const registerNameSpacePath = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: nameSpacePath,
    transformer: transformNamesSpacePath,
    type: "name",
  };

  sd.registerTransform(transformerConfig);
};

export const nameSpacePath = "name/calcite/space-path";
