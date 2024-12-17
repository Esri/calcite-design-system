import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformNameIncludePlus(token: TransformedToken): string {
  if (token.isSource && token.path[token.path.length - 1].includes("+")) {
    const scale = token.path[token.path.length - 1].replace("+", "");
    return token.name.replace(scale, `${scale}-plus`);
  }
  return token.name;
}

export function registerNameIncludePlus(sd: typeof StyleDictionary): void {
  sd.registerTransform({
    name: nameIncludePlus,
    transform: transformNameIncludePlus,
    type: "name",
  });
}

export const nameIncludePlus = "calcite/name/includePlus";
