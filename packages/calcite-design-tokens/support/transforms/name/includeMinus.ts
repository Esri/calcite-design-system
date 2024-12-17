import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformNameIncludeMinus(token: TransformedToken): string {
  const hasMinus = token.isSource && token.path.find((el) => el[0] === "-");

  if (hasMinus) {
    const scale = hasMinus.replace("-", "");
    return token.name.replace(scale, `--${scale}`);
  }
  return token.name;
}

export function registerNameIncludeMinus(sd: typeof StyleDictionary): void {
  sd.registerTransform({
    name: nameIncludeMinus,
    transform: transformNameIncludeMinus,
    type: "name",
  });
}

export const nameIncludeMinus = "calcite/name/includeMinus";
