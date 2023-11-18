import { Options } from "../../../types/styleDictionary/options.js";
import { PossibleRegistryArgs } from "../utils.js";
import { PlatformOptions } from "../../../types/styleDictionary/platform.js";
import { Named as SdNamed } from "style-dictionary/types/_helpers.js";
import { Format as SdFormat, FormatterArguments as SdFormatterArguments } from "style-dictionary/types/Format.js";
import { PlatformFormats, PlatformUnion } from "../../../types/platform.js";
import { CalciteCss } from "./css.js";
import { CalciteJs, CalciteTs } from "./javascript.js";
import { File } from "../../../types/styleDictionary/file.js";
import { CalciteScss } from "./scss.js";
import { Dictionary } from "../../../types/styleDictionary/dictionary.js";

export type FormatterTypeUnion = "formatter";

const formatters: Partial<Record<PlatformFormats, string>> = {
  css: CalciteCss,
  scss: CalciteScss,
  sass: CalciteScss,
  js: CalciteJs,
  es6: "javascript/es6",
  ts: CalciteTs,
  es6Ts: "typescript/module-declarations",
} as const;

export const format = <T extends keyof typeof formatters>(t: T): (typeof formatters)[T] => {
  return formatters[t];
};

export interface FormattingArgs<F> extends SdFormatterArguments, Dictionary {
  dictionary: Dictionary;
  file: File & {
    format: F;
  };
  options: Options;
  platform: PlatformOptions;
}

export type MappedFormatterArguments = {
  [K in keyof FormattingArgs<typeof calledFormatterFunction>]: FormattingArgs<typeof calledFormatterFunction>[K];
};

export type FormatterConfig = SdNamed<SdFormat> & Required<Pick<PossibleRegistryArgs, "name" | "formatter">>;

export declare function calledFormatterFunction(args: MappedFormatterArguments): string;

export type CalledFormatterFunction = typeof calledFormatterFunction;

export type FormatterRules = {
  prefix?: string;
  commentStyle?: "long" | "short" | "none";
  indentation?: string;
  separator?: string;
  join?: string;
  suffix?: string;
};

export type FormatterOptions = {
  file: File;
  /**
   * The options object,
   */
  options: Options;
  /**
   * The platform configuration the format is called in
   */
  platform: PlatformOptions;
};

export type FormatterArguments = MappedFormatterArguments & Dictionary & FormatterOptions;

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
