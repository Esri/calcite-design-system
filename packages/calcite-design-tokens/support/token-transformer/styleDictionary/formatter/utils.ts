import { PlatformFormats, PlatformUnion } from "../../../types/platform.js";
import { FormatterRules, MappedFormatterArguments } from "../../../types/styleDictionary/formatterArguments.js";
import { CalciteCss } from "./css.js";
import { CalciteJs } from "./javascript.js";
import { CalciteScss } from "./scss.js";

const formatters: Partial<Record<PlatformFormats, string>> = {
  css: CalciteCss,
  scss: CalciteScss,
  sass: CalciteScss,
  js: CalciteJs,
  es6: "javascript/es6",
  ts: "typescript/module-declarations",
  es6Ts: "typescript/es6-declarations",
} as const;

export const format = <T extends keyof typeof formatters>(t: T): (typeof formatters)[T] => {
  return formatters[t];
};

export declare function calledFormatterFunction(args: MappedFormatterArguments): string;

export const FormattingRules: Partial<Record<PlatformUnion | "default", FormatterRules>> = {
  default: {
    prefix: "",
    commentStyle: "long",
    indentation: "",
    separator: " =",
    suffix: ";",
  },
  css: {
    prefix: "--",
    commentStyle: "long",
    indentation: "  ",
    separator: ":",
    join: "\n\t",
    suffix: ";",
  },
  sass: {
    prefix: "$",
    commentStyle: "short",
    indentation: "",
    separator: ":",
    join: "\n",
    suffix: ";",
  },
  scss: {
    prefix: "$",
    commentStyle: "short",
    indentation: "",
    separator: ":",
    join: "\n",
    suffix: ";",
  },
};
