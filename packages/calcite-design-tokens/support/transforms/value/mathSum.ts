import StyleDictionary, { TransformedToken } from "style-dictionary";

const operatorRegex = new RegExp(/(\d+)\s*([\+\-\*x\/\%])\s*(\d+)/, "g");

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

export function transformValueMathSum(token: TransformedToken): any {
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
}

export function registerValueMathSum(sd: StyleDictionary): void {
  sd.registerTransform({
    name: ValueMathSum,
    transform: transformValueMathSum,
    type: "value",
    filter: (token) => !!Number(token.value) || !!hasOperator(token.value),
  });
}

export const ValueMathSum = "calcite/value/mathSum";
