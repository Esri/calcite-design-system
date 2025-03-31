import { TransformedToken } from "style-dictionary";
import { NameTransform } from "style-dictionary/types";
import { capitalCase, kebabCase } from "change-case";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

const regex = {
  plusMinus: RegExp("(^[+-])?[0-9A-Za-z\\-]+([+-]$)?", ""),
  camelCase: RegExp("([a-z])([A-Z])", ""),
};

export const transformNamePlusMinus: NameTransform["transform"] = (token) => {
  let { name } = token;

  token.path.forEach((path) => {
    const findSymbol = regex.plusMinus.exec(path);

    if (findSymbol && (findSymbol[1] || findSymbol[2])) {
      const symbol = findSymbol[1] || findSymbol[2];

      let text = findSymbol[0].replace(/(^[+-])|([+-]$)/, "");
      let plusMinus = symbol.includes("+") ? "plus" : "minus";
      let formattedText = text;
      const isCamelCased = regex.camelCase.test(token.name);

      if (isCamelCased) {
        text = capitalCase(text);
        formattedText = capitalCase(formattedText);
        plusMinus = capitalCase(plusMinus);
      } else {
        formattedText = findSymbol[1] ? `-${formattedText}` : `${formattedText}-`;
        text = kebabCase(text);
      }

      name = token.name.replace(text, findSymbol[1] ? `${plusMinus}${formattedText}` : `${formattedText}${plusMinus}`);
    }
  });

  return name;
};

function filterByPlusMinusInPath(token: TransformedToken): boolean {
  return (
    token.type !== "color" &&
    !token.path.includes("container-size") &&
    token.path.some((path) => path.includes("+") || path.includes("-"))
  );
}

export const registerNameIncludePlusMinus: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformNameIncludePlusMinus,
    transform: transformNamePlusMinus,
    type: "name",
    filter: filterByPlusMinusInPath,
  });
};

export const TransformNameIncludePlusMinus = "calcite/transform/name/include-plus-minus";
