import sd, { Core as StyleDictionary } from "style-dictionary";

import { formatTokens } from "./utils/formatTokens.js";
import { formatExtraOutput } from "./utils/formatExtraOutput.js";
import * as prettier from "prettier";

import { CalledFormatterFunction, FormatterConfig } from "../../../types/styleDictionary/formatterArguments.js";

export const formatScssPlatform: CalledFormatterFunction = (args) => {
  const { file, dictionary } = args;
  const { default: tokens, ...extraOutput } = formatTokens(dictionary, args);
  const header = sd.formatHelpers.fileHeader({ file });

  if (Object.keys(extraOutput).length > 0) {
    formatExtraOutput(extraOutput, { ...args.options, header, buildPath: args.platform.buildPath });
  }
  return prettier.format(header + tokens.join(""), { parser: "scss" });
};

export const registerFormatterScss = (sd: StyleDictionary): void => {
  const formatterConfig: FormatterConfig = {
    name: CalciteScss,
    formatter: formatScssPlatform,
  };

  sd.registerFormat(formatterConfig);
};

export const CalciteScss = "calcite/format/scss";
