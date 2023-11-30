import { Core as StyleDictionary } from "style-dictionary";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { parseTokenPath } from "../utils/parseTokenPath.js";
import { capitalCase } from "change-case";

export const transformNamesSpacePath: CalledTransformerFunction<string> = (token, args) => {
  const [tokenPath, negNameRef] = parseTokenPath(
    [].concat(args.options?.prefix, token.path).filter((p) => p && p !== args?.options?.prefix)
  );
  let name = capitalCase(tokenPath.join(" "));

  for (let i = 0; i < negNameRef.length; i++) {
    const negName = negNameRef[i];
    const n = negName.slice(1);
    name = name.replace(n, negName);
  }

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
