import { ParserOptions } from "style-dictionary/types/Parser.js";
import { DeepKeyTokenMap } from "@tokens-studio/types";
import { expandComposites } from "@tokens-studio/sd-transforms";
// import { expandComposites } from "./expandComposites.js";

export function convertTokenStudioRefSymbol(str: string): string {
  const anyRefThatStartsWith$ = new RegExp(/\$[\w\.\d-]+/gim);
  const matchMinusFirstCharAsStyleDicitonaryRef = (match) => `{${match.slice(1)}}`;
  return str.replace(anyRefThatStartsWith$, matchMinusFirstCharAsStyleDicitonaryRef);
}

export const parse = (options: ParserOptions): DeepKeyTokenMap<false> => {
  const { contents, filePath } = options;
  const obj = JSON.parse(convertTokenStudioRefSymbol(contents));
  const expanded = expandComposites(obj, filePath, {
    expand: { typography: false, shadow: false, composition: true, border: true }
  });
  return expanded || {};
};
