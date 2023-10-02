import { DesignToken } from "style-dictionary/types/DesignToken";

import { Parser } from "expr-eval";
import { parse, reduceExpression } from "postcss-calc-ast-parser";

const mathChars = ["+", "-", "*", "/"];

const parser = new Parser();

function checkIfInsideGroup(expr: string, fullExpr: string): boolean {
  // make sure all regex-specific characters are escaped by backslashes
  const exprEscaped = expr.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  // Reg which checks whether the sub expression is fitted inside of a group ( ) in the full expression
  const reg = new RegExp(`\\(.*?${exprEscaped}.*?\\)`, "g");
  return !!fullExpr.match(reg) || !!expr.match(/\(/g); // <-- latter is needed because an expr piece might be including the opening '(' character
}

/**
 * Taken from sd-transforms because they don't use typescript and missed an edge case in their transform which left me with errors. Consider submitting back to sd-transforms in the future.
 * Checks expressions like: 8 / 4 * 7px 8 * 5px 2 * 4px
 * and divides them into 3 single values:
 * ['8 / 4 * 7px', '8 * 5px', '2 * 4px']
 *
 * It splits everything by " " spaces, then checks in which places
 * there is a space but with no math operater left or right of it,
 * then determines this must mean it's a multi-value separator
 * @param expr
 */
function splitMultiIntoSingleValues(expr: string): string[] {
  const tokens = expr.split(" ");
  const indexes = [] as number[];
  let skipNextIteration = false;
  tokens.forEach((tok, i) => {
    const left = i > 0 ? tokens[i - 1] : "";
    const right = tokens[i + 1] ?? "";

    // conditions under which math expr is valid
    const conditions = [
      mathChars.includes(tok), // current token is a math char
      mathChars.includes(right) && mathChars.includes(left), // left/right are both math chars
      left === "" && mathChars.includes(right), // tail of expr, right is math char
      right === "" && mathChars.includes(left), // head of expr, left is math char
      tokens.length <= 1, // expr is valid if it's a simple 1 token expression
      checkIfInsideGroup(tok, expr) // exprs that aren't math expressions are okay within ( ) groups
    ];

    if (conditions.every((cond) => !cond)) {
      if (!skipNextIteration) {
        indexes.push(i);
        skipNextIteration = true;
      } else {
        skipNextIteration = false;
      }
    }
  });
  if (indexes.length > 0) {
    indexes.push(tokens.length);
    const exprArr = [] as string[];
    let currIndex = 0;
    indexes.forEach((i) => {
      const singleValue = tokens.slice(currIndex, i + 1).join(" ");
      if (singleValue) {
        exprArr.push(singleValue);
      }
      currIndex = i + 1;
    });
    return exprArr;
  }
  return [expr];
}

function parseAndReduce(expr: string): string {
  // We check for px unit, then remove it
  const hasPx = expr.match("px");
  let unitlessExpr = expr.replace(/px/g, "");
  // Remove it here so we can evaluate expressions like 16px + 24px
  const calcParsed = parse(unitlessExpr, { allowInlineCommnets: false });

  // Attempt to reduce the math expression
  const reduced = reduceExpression(calcParsed);
  let unit;

  // E.g. if type is Length, like 4 * 7rem would be 28rem
  if (reduced && reduced.type !== "Number") {
    unitlessExpr = `${reduced.value}`.replace(new RegExp(reduced.unit, "ig"), "");
    unit = reduced.unit;
  }

  // Try to evaluate expression (minus unit) with expr-eval
  let evaluated;
  try {
    evaluated = parser.evaluate(unitlessExpr);
  } catch (ex) {
    return expr;
  }
  // Put back the px unit if needed and if reduced doesn't come with one
  return `${Number.parseFloat(Number(evaluated).toFixed(3))}${unit ?? (hasPx ? "px" : "")}`;
}

function checkAndEvaluateMath(expr: string | number | undefined): string | undefined {
  if (expr === undefined) {
    return `${expr}`;
  }

  const exprs = splitMultiIntoSingleValues(`${expr}`);
  const reducedExprs = exprs.map((_expr) => parseAndReduce(_expr));
  return reducedExprs.join(" ");
}

export function matcher(token: DesignToken): boolean {
  return typeof token.value === "string";
}

export function transformer(token: DesignToken): string {
  return checkAndEvaluateMath(token.value);
}
