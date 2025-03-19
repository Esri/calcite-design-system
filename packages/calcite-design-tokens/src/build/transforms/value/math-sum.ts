import { ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

const operatorRegex = new RegExp(/(\d+)\s*([+\-*x/%])\s*(\d+)/, "g");

function hasOperator(value: string): RegExpExecArray {
  return operatorRegex.exec(value);
}

function mathSum(value: string): string {
  const operator = hasOperator(value);

  if (operator) {
    switch (operator[2]) {
      case "+":
        return `${Number(operator[1]) + Number(operator[3])}`;
      case "-":
        return `${Number(operator[1]) - Number(operator[3])}`;
      case "*":
      case "x":
        return `${Number(operator[1]) * Number(operator[3])}`;
      case "/":
        return `${Number(operator[1]) / Number(operator[3])}`;
      case "%":
        return `${Number(operator[1]) % Number(operator[3])}`;
      default:
        return value;
    }
  }

  return value;
}

export function isObjectOfStringsOrNumbers(obj: any): obj is Record<string, string | number> {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  for (const key in obj) {
    if (typeof obj[key] !== "string" && typeof obj[key] !== "number") {
      return false;
    }
  }

  return true;
}

export const transformValueMathSum: ValueTransform["transform"] = (token) => {
  if (typeof token.value === "string") {
    return mathSum(token.value);
  } else if (isObjectOfStringsOrNumbers(token.value)) {
    return Object.entries(token.value).reduce((acc, [key, value]) => {
      acc[key] = mathSum(`${value}`);
      return acc;
    }, {});
  } else {
    return token.value;
  }
};

export const registerValueMathSum: RegisterFn = async () => {
  StyleDictionary.registerTransform({
    name: TransformValueMathSum,
    transform: transformValueMathSum,
    transitive: true,
    type: "value",
    filter: (token) => {
      return Number(token.value) === 0 || !!Number(token.value) || !!hasOperator(token.value);
    },
  });
};

export const TransformValueMathSum = "calcite/transform/value/math-sum";
