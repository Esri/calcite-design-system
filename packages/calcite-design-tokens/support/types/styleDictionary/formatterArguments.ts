import { Named as SdNamed } from "style-dictionary/types/_helpers.js";
import { Format as SdFormat, FormatterArguments as SdFormatterArguments } from "style-dictionary/types/Format.js";

import { Dictionary } from "./dictionary";
import { calledFormatterFunction } from "../../token-transformer/styleDictionary/formatter/utils";
import { PossibleRegistryArgs } from "./registerFunctions";
import { Options } from "./options";
import { PlatformOptions } from "./platform";
import { File } from "./file";

export type FormatterArguments = MappedFormatterArguments & Dictionary & FormatterOptions;

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

export type CalledFormatterFunction = typeof calledFormatterFunction;

export type FormatterRules = {
  prefix?: string;
  commentStyle?: "long" | "short" | "none";
  indentation?: string;
  separator?: string;
  join?: string;
  suffix?: string;
};

export type MappedFormatterArguments = {
  [K in keyof FormattingArgs<typeof calledFormatterFunction>]: FormattingArgs<typeof calledFormatterFunction>[K];
};

export type FormatterConfig = SdNamed<SdFormat> & Required<Pick<PossibleRegistryArgs, "name" | "formatter">>;

export interface FormattingArgs<F> extends SdFormatterArguments, Dictionary {
  dictionary: Dictionary;
  file: File & {
    format: F;
  };
  options: Options;
  platform: PlatformOptions;
}

export type FormatterTypeUnion = "formatter";
