import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformNameRemoveDefault(token: TransformedToken): string {
  const idx = token.path.findIndex((path) => path === "default");

  if (idx === -1) {
    return token.name;
  } else if (idx === token.path.length - 1) {
    return token.name.replace(/-default$/, "");
  } else {
    return token.name.replace(/default-/, "");
  }
}

export function registerNameRemoveDefault(sd: typeof StyleDictionary): void {
  sd.registerTransform({
    name: NameRemoveDefault,
    transform: transformNameRemoveDefault,
    type: "name",
  });
}

export const NameRemoveDefault = "calcite/name/removeDefault";
