import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformNameRemoveDefault(token: TransformedToken): string {
  const regex = /(-?default$)|(default-?)/gi;
  const findDefault = regex.exec(token.name);

  if (findDefault) {
    return token.name.replace(findDefault[0], "");
  }

  return token.name;
}

export async function registerNameRemoveDefault(sd: typeof StyleDictionary): Promise<void> {
  sd.registerTransform({
    name: TransformNameRemoveDefault,
    transform: transformNameRemoveDefault,
    type: "name",
  });
}

export const TransformNameRemoveDefault = "calcite/name/removeDefault";
