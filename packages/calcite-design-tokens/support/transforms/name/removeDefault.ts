import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformNameRemoveDefault(token: TransformedToken): string {
  const regex = /(-?default$)|(default-?)/gi;
  const findDefault = regex.exec(token.name);

  if (findDefault) {
    return token.name.replace(findDefault[0], "");
  }

  return token.name;
}

export function registerNameRemoveDefault(sd: typeof StyleDictionary): void {
  sd.registerTransform({
    name: NameRemoveDefault,
    transform: transformNameRemoveDefault,
    type: "name",
  });
}

export const NameRemoveDefault = "calcite/name/removeDefault";
