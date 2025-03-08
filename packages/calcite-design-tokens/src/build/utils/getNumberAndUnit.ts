import { TransformedToken } from "style-dictionary/types";

export function getNumberAndUnit(token: TransformedToken): RegExpExecArray {
  return /^(?<number>[\d.]+)(?<unit>[a-z%]*)/g.exec(
    token.value || token.value.value || token.original.value || token.original.value.value,
  );
}
