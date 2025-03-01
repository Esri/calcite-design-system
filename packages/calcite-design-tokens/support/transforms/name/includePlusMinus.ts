import { TransformedToken } from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

const regex = {
  plusMinus: RegExp("(^[+-])?[0-9A-z\\-]+([+-]$)?", ""),
  camelCase: RegExp("([a-z])([A-Z])", ""),
  kebabCase: RegExp("([a-z])(-)([a-z])", ""),
  scss: /(scss)/,
  css: /(css)/,
  es6: /(es6)/,
};

export function transformNamePlusMinus(token: TransformedToken): string {
  let name = token.name;

  token.path.forEach((path) => {
    const findSymbol = regex.plusMinus.exec(path);

    if (findSymbol && (findSymbol[1] || findSymbol[2])) {
      const symbol = findSymbol[1] || findSymbol[2];

      const text = findSymbol[0].replace(/(^[+-])|([+-]$)/, "");
      let plusMinus = symbol.includes("+") ? "plus" : "minus";
      let formattedText = text;

      if (regex.camelCase.test(token.name)) {
        if (findSymbol[1]) {
          formattedText = `${formattedText[0].toUpperCase()}${formattedText.slice(1)}`;
        } else {
          plusMinus = `${plusMinus[0].toUpperCase()}${plusMinus.slice(1)}`;
        }
      } else {
        formattedText = findSymbol[1] ? `-${formattedText}` : `${formattedText}-`;
      }

      name = token.name.replace(text, findSymbol[1] ? `${plusMinus}${formattedText}` : `${formattedText}${plusMinus}`);
    }
  });

  return name;
}

function filterByPlusMinusInPath(token: TransformedToken): boolean {
  return (
    token.type !== "color" &&
    !token.path.includes("container-size") &&
    token.path.some((path) => path.includes("+") || path.includes("-"))
  );
}

export const registerNameIncludePlusMinus: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformNameIncludePlusMinus,
    transform: transformNamePlusMinus,
    type: "name",
    filter: filterByPlusMinusInPath,
  });
};

export const TransformNameIncludePlusMinus = "calcite/name/includePlusMinus";
