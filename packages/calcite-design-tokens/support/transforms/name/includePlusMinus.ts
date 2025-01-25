import StyleDictionary, { TransformedToken } from "style-dictionary";

const regex = {
  plusMinus: RegExp("([A-z\-]+)([\+-]*)$", ""),
  camelCase: RegExp("([a-z])([A-Z])", ""),
  kebabCase: RegExp("([a-z])(-)([a-z])", ""),
  scss: /(scss)/,
  css: /(css)/,
  es6: /(es6)/,
};

export function transformNamePlusMinus(token: TransformedToken): string {
  const findSymbol = regex.plusMinus.exec(token.path[token.path.length - 1]);

  if (findSymbol && findSymbol[2].length > 0) {
    const plusMinus = findSymbol[2].includes("+") ? "plus" : "minus";
    return `${token.name}${regex.camelCase.test(token.name) ? `${plusMinus[0].toUpperCase()}${plusMinus.slice(1)}` : `-${plusMinus}`}`;
  }

  return token.name;
}

export function registerNameIncludePlusMinus(sd: typeof StyleDictionary): void {
  sd.registerTransform({
    name: NameIncludePlusMinus,
    transform: transformNamePlusMinus,
    type: "name",
  });
}

export const NameIncludePlusMinus = "calcite/name/includePlusMinus";
